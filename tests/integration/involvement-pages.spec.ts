// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

// Exercise the running Next.js HTTP surface without installing a browser runner.
// BASE_URL reuses an explicitly selected server and avoids a second dev-server lock.
const baseUrl = process.env.BASE_URL;
const responses = new Map<string, Promise<{ body: string; status: number; contentType: string | null }>>();
const signup = "https://portal.ihsaan.network/sign-up";
const whatsapp =
  "https://docs.google.com/forms/d/e/1FAIpQLSehrwaRiPVkVI3UVq23jv4SZBZ540kC2D-PW84OeUIT9FIu6Q/viewform";
const professionalForm =
  "https://docs.google.com/forms/d/e/1FAIpQLSdrT7sgjnP6aqgL6qLwcEQZWr_qHHlf9AWa6Qr8ZEr77I9gTQ/viewform";

async function body(path: string, expectedContentType: string) {
  if (!baseUrl) throw new Error("Set BASE_URL to the running IHSAAN public website, for example http://localhost:3000");
  let response = responses.get(path);
  if (!response) {
    response = fetch(new URL(path, baseUrl).href, { signal: AbortSignal.timeout(25_000), redirect: "manual" }).then(async (result) => {
      const raw = await result.text();
      const metadata = { status: result.status, contentType: result.headers.get("content-type") };
      console.info("Public HTTP response", { path, ...metadata, bodyPreview: raw.slice(0, 160) });
      return { ...metadata, body: raw };
    });
    responses.set(path, response);
  }
  const result = await response;
  expect(result.status, `${path}: ${JSON.stringify({ status: result.status, contentType: result.contentType })}`).toBe(200);
  expect(result.contentType, path).toContain(expectedContentType);
  return result.body;
}

async function page(path: string) {
  const html = await body(path, "text/html");
  const parsed = new DOMParser().parseFromString(html, "text/html");
  const fragment = document.createDocumentFragment();
  return fragment.appendChild(document.importNode(parsed.documentElement, true));
}

function visibleText(element: HTMLElement) {
  const copy = element.cloneNode(true);
  if (!(copy instanceof HTMLElement)) throw new Error("Missing rendered content");
  copy.querySelectorAll('[aria-hidden="true"], [hidden], script, style, template, noscript').forEach((node) => node.remove());
  return (copy.textContent ?? "").replace(/\s+/g, " ").trim();
}

function sectionForHeading(root: HTMLElement, name: string) {
  const heading = within(root).getByRole("heading", { name });
  const section = heading.closest("section");
  if (!section) throw new Error(`Missing section for ${name}`);
  return section;
}

const heroTitle = "Turn your degree into a career.";

describe("member landing page over HTTP", () => {
  it("puts account creation first in the hero, with a separate professionals link", async () => {
    const root = await page("/start");
    const main = within(root).getByRole("main");
    expect(within(main).getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const hero = sectionForHeading(main, heroTitle);
    expect(within(hero).getByRole("heading", { level: 1, name: heroTitle })).toHaveAccessibleName(heroTitle);
    const links = within(hero).getAllByRole("link");
    expect(links[0]).toHaveAccessibleName("Create your account");
    expect(links[0]).toHaveAttribute("href", signup);
    expect(links[1]).toHaveAccessibleName("Professionals and organisations");
    expect(within(hero).getByRole("link", { name: "Professionals and organisations" }))
      .toHaveAttribute("href", "/professionals");
  });

  it("repeats the same account destination after the hero", async () => {
    const main = within(await page("/start")).getByRole("main");
    const hero = sectionForHeading(main, heroTitle);
    const links = within(main).getAllByRole("link", { name: "Create your account" });
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) expect(link).toHaveAttribute("href", signup);
    const closing = links.at(-1);
    if (!closing) throw new Error("Missing closing account link");
    expect(hero.contains(closing)).toBe(false);
    expect(hero.compareDocumentPosition(closing) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
  });

  it("lists exactly the six programme benefits below What you get", async () => {
    const main = within(await page("/start")).getByRole("main");
    const section = sectionForHeading(main, "What you get");
    const heading = within(section).getByRole("heading", { name: "What you get" });
    const list = within(section).getByRole("list");
    expect(heading.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(6);
    expect(items.map((item) => within(item).getByRole("heading", { level: 3 }).textContent).sort()).toEqual([
      "Career Conferences",
      "Hackathons",
      "Insight Events",
      "Mentorship",
      "Summer Internship Programme",
      "Webinars & Workshops",
    ]);
  });

  it("leaves volunteering and the WhatsApp application to the professionals page", async () => {
    const main = within(await page("/start")).getByRole("main");
    expect(within(main).queryByRole("heading", { name: "More ways in" })).toBeNull();
    const hrefs = within(main).getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).not.toContain("/volunteer");
    expect(hrefs).not.toContain(whatsapp);
    expect(hrefs).toContain("/professionals");
  });

  it("removes the old chooser, held destinations, home FAQ and contact strip", async () => {
    const root = await page("/start");
    const main = within(root).getByRole("main");
    expect(within(main).getByRole("heading", { level: 1, name: heroTitle })).toHaveAccessibleName(heroTitle);
    expect(within(root).queryByRole("combobox", { hidden: true })).toBeNull();
    expect(within(root).queryByRole("link", { name: "Explore programmes" })).toBeNull();
    expect(within(root).queryByRole("button", { name: "Explore programmes" })).toBeNull();
    const text = visibleText(root);
    expect(text).not.toMatch(/membership|filter by audience|show steps for|Contact IHSAAN/i);
    for (const name of [
      "Not sure where to start?",
      "Ways to get involved",
      "Good to know before you join",
      "What is IHSAAN?",
      "What is the member portal?",
      "Who can get involved?",
      "What programmes does IHSAAN run?",
      "Can I get a mentor?",
      "Do you help students find internships?",
      "Are your resources free?",
      "How can my organisation partner with IHSAAN?",
    ]) expect(text).not.toContain(name);
    for (const link of root.querySelectorAll("a[href]")) {
      expect(link.getAttribute("href")).not.toMatch(/forms\.gle|tally\.so|opportunities-tracker/i);
    }
  });
});

describe("professional landing page over HTTP", () => {
  it("leads with the professional form and a partnership conversation", async () => {
    const main = within(await page("/professionals")).getByRole("main");
    expect(within(main).getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const hero = sectionForHeading(main, "Give back.");
    expect(within(hero).getByRole("heading", { level: 1, name: "Give back." })).toHaveAccessibleName("Give back.");
    const links = within(hero).getAllByRole("link");
    expect(links[0]).toHaveAccessibleName("Join the professional network");
    expect(links[0]).toHaveAttribute("href", professionalForm);
    expect(links[1]).toHaveAccessibleName("Partner with us");
    expect(within(hero).getByRole("link", { name: "Partner with us" })).toHaveAttribute("href", "/contact");
  });

  it.each([
    ["professional", "Professional network", "Join the professional network", professionalForm],
    ["mentor", "Mentor on My Muslim Mentor", "Become a mentor on MMM", "https://mymuslimmentor.com/signup"],
    ["community", "WhatsApp community", "Apply to join the WhatsApp community", whatsapp],
    ["alumni", "Alumni network", "Ask about the alumni network", "/contact"],
    ["volunteer", "Volunteer for IHSAAN", "View volunteer openings", "/volunteer"],
    ["partner", "Partner with IHSAAN", "Partner with us", "/contact"],
  ])("keeps #%s addressable with its own heading and destination", async (id, title, label, href) => {
    const main = within(await page("/professionals")).getByRole("main");
    const items = main.querySelectorAll<HTMLElement>(`#${id}`);
    expect(items).toHaveLength(1);
    const item = items[0];
    expect(item.tagName).toBe("LI");
    expect(within(item).getByRole("heading", { name: title })).toHaveAccessibleName(title);
    expect(within(item).getByRole("link", { name: label })).toHaveAttribute("href", href);
    if (id === "volunteer") expect(visibleText(item)).toMatch(/unpaid/i);
    if (id === "community") expect(visibleText(item)).toMatch(/not an automatic invitation/i);
  });

  it("does not offer portal signup, an audience filter or held destinations", async () => {
    const root = await page("/professionals");
    expect(within(root).getByRole("heading", { level: 1, name: "Give back." })).toHaveAccessibleName("Give back.");
    expect(within(root).queryByRole("combobox", { hidden: true })).toBeNull();
    expect(visibleText(root)).not.toMatch(/membership|filter by audience|show steps for/i);
    for (const link of root.querySelectorAll("a[href]")) {
      expect(link.getAttribute("href")).not.toMatch(/forms\.gle|tally\.so|opportunities-tracker/i);
      expect(link.getAttribute("href")).not.toBe(signup);
    }
  });
});

describe("public discovery over HTTP", () => {
  it("links Professionals from the site footer", async () => {
    const footer = within(await page("/start")).getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "Professionals" })).toHaveAttribute("href", "/professionals");
  });

  it("publishes both landing pages in the sitemap", async () => {
    const xml = await body("/sitemap.xml", "xml");
    const sitemap = new DOMParser().parseFromString(xml, "application/xml");
    const urls = [...sitemap.querySelectorAll("loc")].map((node) => node.textContent);
    expect(urls).toContain("https://ihsaan.network/start");
    expect(urls).toContain("https://ihsaan.network/professionals");
  });

  it("publishes both landing pages in llms.txt", async () => {
    const llms = await body("/llms.txt", "text/plain");
    expect(llms).toContain("- [/start](/start)");
    expect(llms).toContain("- [/professionals](/professionals) Professionals");
  });

  it("gives Professionals its own title and canonical", async () => {
    const professionals = await page("/professionals");
    expect(professionals.querySelector("title")?.textContent).toBe("Professionals | IHSAAN");
    expect(professionals.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://ihsaan.network/professionals");
  });

  it("keeps the member canonical and a description without mentors or partners", async () => {
    const member = await page("/start");
    expect(member.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://ihsaan.network/start");
    const description = member.querySelector('meta[name="description"]')?.getAttribute("content");
    expect(description).toEqual(expect.any(String));
    expect(description).not.toMatch(/mentor|partner/i);
  });
});
