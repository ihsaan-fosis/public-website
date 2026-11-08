// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { PROGRAMME_PAGES } from "../../src/content/programmes";

// Full HTTP checks: no internal modules or third-party transport are mocked.
const baseUrl = process.env.BASE_URL;
const pages = new Map<string, Promise<Document>>();

async function page(route: string) {
  if (!baseUrl) throw new Error("Set BASE_URL to the running IHSAAN server");
  let pending = pages.get(route);
  if (!pending) {
    pending = fetch(new URL(route, baseUrl), { redirect: "manual", signal: AbortSignal.timeout(25_000) }).then(async (response) => {
      const html = await response.text();
      const contentType = response.headers.get("content-type");
      console.info("SEO copy HTTP response", { route, status: response.status, contentType, bodyPreview: html.slice(0, 160) });
      expect(response.status, route).toBe(200);
      expect(contentType, route).toContain("text/html");
      return new DOMParser().parseFromString(html, "text/html");
    });
    pages.set(route, pending);
  }
  return pending;
}

function linkText(link: Element) {
  const copy = link.cloneNode(true);
  if (!(copy instanceof Element)) throw new Error("Missing programme link");
  copy.querySelectorAll('[aria-hidden="true"], [hidden], script, style, template, noscript').forEach((node) => node.remove());
  return (copy.textContent ?? "").replace(/\s+/g, " ").trim();
}

describe("SEO copy on the public HTTP surface", () => {
  it("renders exactly six programme card destinations", async () => {
    const document = await page("/programmes");
    expect(document.querySelectorAll('main article a[href^="/programmes/"]')).toHaveLength(6);
  });

  it.each(PROGRAMME_PAGES)("names $title inside its programme card link", async ({ slug, title }) => {
    const document = await page("/programmes");
    const links = document.querySelectorAll(`main article a[href="/programmes/${slug}"]`);
    expect(links).toHaveLength(1);
    expect(linkText(links[0]), `Visible link text for /programmes/${slug}`).toContain(title);
  });

  it("uses Tech Team | IHSAAN without repeating the brand", async () => {
    expect((await page("/tech-team")).querySelector("title")?.textContent).toBe("Tech Team | IHSAAN");
  });

  it.each([
    "/programmes/summer-internships",
    "/programmes/hackathons",
    "/programmes/mentorship",
    "/terms",
  ])("gives %s a description between 120 and 160 characters", async (route) => {
    const description = (await page(route)).querySelector('meta[name="description"]')?.getAttribute("content");
    expect(description, route).toBeTruthy();
    expect(description?.length, route).toBeGreaterThanOrEqual(120);
    expect(description?.length, route).toBeLessThanOrEqual(160);
  });
});
