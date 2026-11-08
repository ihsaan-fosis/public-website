// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { MISSION } from "../../src/content/site";
import { PROGRAMME_PAGES } from "../../src/content/programmes";

const baseUrl = process.env.BASE_URL;
const responses = new Map<string, Promise<string>>();

async function body(route: string, type = "text/html") {
  if (!baseUrl) throw new Error("Set BASE_URL to the running IHSAAN server");
  let pending = responses.get(route);
  if (!pending) {
    pending = fetch(new URL(route, baseUrl), { redirect: "manual", signal: AbortSignal.timeout(25_000) }).then(async (response) => {
      const raw = await response.text();
      const contentType = response.headers.get("content-type");
      console.info("Structured data HTTP response", { route, status: response.status, contentType, bodyPreview: raw.slice(0, 160) });
      expect(response.status, route).toBe(200);
      expect(contentType, route).toContain(type);
      return raw;
    });
    responses.set(route, pending);
  }
  return pending;
}

async function page(route: string) {
  return new DOMParser().parseFromString(await body(route), "text/html");
}

function schemas(document: Document) {
  return [...document.querySelectorAll('script[type="application/ld+json"]')]
    .flatMap((script) => JSON.parse(script.textContent ?? "null"))
    .flatMap((schema) => schema?.["@graph"] ?? [schema]);
}

describe("structured data over public HTTP", () => {
  it("identifies the Organization with mission and public contact, without an invented address", async () => {
    const organization = schemas(await page("/")).find((schema) => schema?.["@type"] === "Organization");
    expect(organization, "Organization JSON-LD").toBeDefined();
    expect.soft(organization?.["@id"]).toBe("https://ihsaan.network/#organization");
    expect.soft(organization?.description).toBe(MISSION);
    expect.soft([organization?.contactPoint].flat()).toContainEqual(expect.objectContaining({
      "@type": "ContactPoint",
      email: "ihsaan@fosis.org.uk",
      url: "https://ihsaan.network/contact",
    }));
    expect(organization).not.toHaveProperty("address");
  });

  it.each(PROGRAMME_PAGES)("publishes a three-level breadcrumb for $title", async ({ slug, title }) => {
    const breadcrumb = schemas(await page(`/programmes/${slug}`)).find((schema) => schema?.["@type"] === "BreadcrumbList");
    expect(breadcrumb, `BreadcrumbList for ${slug}`).toBeDefined();
    expect(breadcrumb?.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ihsaan.network/" },
      { "@type": "ListItem", position: 2, name: "Programmes", item: "https://ihsaan.network/programmes" },
      { "@type": "ListItem", position: 3, name: title, item: `https://ihsaan.network/programmes/${slug}` },
    ]);
  });

  it.each([
    { route: "/", image: "/media/hero-poster.webp", width: "1280", height: "720" },
    { route: "/programmes/career-conferences", image: "/media/career-conferences-hd.webp", width: "3840", height: "3275" },
  ])("publishes correct social image dimensions and alt on $route", async ({ route, image, width, height }) => {
    const document = await page(route);
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe(`https://ihsaan.network${image}`);
    expect.soft(document.querySelector('meta[property="og:image:width"]')?.getAttribute("content")).toBe(width);
    expect.soft(document.querySelector('meta[property="og:image:height"]')?.getAttribute("content")).toBe(height);
    expect.soft(document.querySelector('meta[property="og:image:alt"]')?.getAttribute("content")?.trim()).toBeTruthy();
  });

  it("omits ignored sitemap hints and uses the exact home canonical", async () => {
    const xml = await body("/sitemap.xml", "xml");
    const sitemap = new DOMParser().parseFromString(xml, "application/xml");
    expect(sitemap.querySelector("parsererror")).toBeNull();
    expect.soft(sitemap.querySelectorAll("changefreq, priority")).toHaveLength(0);
    const locations = [...sitemap.querySelectorAll("loc")].map((node) => node.textContent);
    expect.soft(locations).toContain("https://ihsaan.network");
    expect.soft(locations).not.toContain("https://ihsaan.network/");
    const staticEntries = [...sitemap.querySelectorAll("url")].filter((entry) =>
      !entry.querySelector("loc")?.textContent?.startsWith("https://ihsaan.network/blog/"));
    expect(staticEntries.length).toBeGreaterThan(0);
    for (const entry of staticEntries) {
      expect(entry.querySelector("lastmod"), entry.querySelector("loc")?.textContent ?? "static URL").toBeNull();
    }
  });
});
