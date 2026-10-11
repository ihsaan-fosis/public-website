import { render, screen } from "@testing-library/react";
import { PROGRAMME_PAGES } from "@/content/programmes";
import { NAV_LINKS, PROGRAMMES } from "@/content/site";
import sitemap from "../sitemap";
import ProgrammesPage from "./page";
import ProgrammePage, { generateStaticParams } from "./[slug]/page";

describe("programme pages", () => {
  it("points the Programmes nav link at its own page", () => {
    expect(NAV_LINKS.find((link) => link.label === "Programmes")?.href).toBe("/programmes");
  });

  it("has a detail page for every home-page programme", () => {
    expect(PROGRAMMES.map((programme) => programme.slug)).toEqual(PROGRAMME_PAGES.map((page) => page.slug));
    expect(generateStaticParams()).toHaveLength(PROGRAMMES.length);
  });

  it("links every programme from the index", () => {
    render(<ProgrammesPage />);
    for (const { slug, title } of PROGRAMME_PAGES) {
      const link = screen.getByRole("link", { name: new RegExp(title) });
      expect(link.getAttribute("href")).toBe(`/programmes/${slug}`);
    }
  });

  it("renders a detail page with its headline and call to action", async () => {
    render(await ProgrammePage({ params: Promise.resolve({ slug: "career-conferences" }) }));
    expect(screen.getByRole("heading", { level: 1 }).getAttribute("aria-label")).toBe("Meet the employers who want you.");
    expect(screen.getByRole("link", { name: /View upcoming events/ })).toBeTruthy();
  });

  it("lists every programme page in the sitemap", () => {
    const urls = sitemap().map(({ url }) => url);
    expect(urls).toContain("https://ihsaan.network/programmes");
    for (const { slug } of PROGRAMME_PAGES) expect(urls).toContain(`https://ihsaan.network/programmes/${slug}`);
  });
});
