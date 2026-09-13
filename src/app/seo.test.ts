import robots from "./robots";
import sitemap from "./sitemap";

const ORIGIN = "https://ihsaan.network";

describe("technical SEO routes", () => {
  it("publishes only canonical, indexable sitemap URLs", () => {
    const urls = sitemap().map(({ url }) => url);

    expect(urls).toContain(`${ORIGIN}/`);
    expect(urls).toContain(`${ORIGIN}/privacy`);
    expect(urls).toContain(`${ORIGIN}/terms`);
    expect(urls).not.toContain(`${ORIGIN}/404`);
    expect(urls.every((url) => url.startsWith(ORIGIN))).toBe(true);
  });

  it("advertises the canonical sitemap and excludes the vanity 404 route", () => {
    const result = robots();

    expect(result.sitemap).toBe(`${ORIGIN}/sitemap.xml`);
    expect(result.rules).toMatchObject({ allow: "/", disallow: "/404" });
  });
});
