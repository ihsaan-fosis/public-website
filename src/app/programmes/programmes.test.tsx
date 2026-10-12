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

  it("keeps the opportunities tracker hidden", () => {
    expect(PROGRAMME_PAGES.map((page) => page.slug)).not.toContain("opportunities-tracker");
    expect(sitemap().map(({ url }) => url)).not.toContain("https://ihsaan.network/programmes/opportunities-tracker");
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

  describe("destination links", () => {
    async function renderProgramme(slug: string) {
      return render(await ProgrammePage({ params: Promise.resolve({ slug }) }));
    }

    function href(name: string) {
      return screen.getByRole("link", { name }).getAttribute("href");
    }

    it("adds Haqqathons to the hackathons page beside its calendar and partnership actions", async () => {
      await renderProgramme("hackathons");
      expect(href("Visit Haqqathons")).toBe("https://haqqathons.com");
      expect(href("See upcoming events")).toBe("https://luma.com/calendar/cal-8amaiM2VigRIqjq");
      expect(href("Become a partner")).toBe("/contact");
    });

    it("adds the Civil Service reflection to career guides on the native blog without losing the guides or Instagram", async () => {
      const { container } = await renderProgramme("career-guides");
      expect(href("Read a Civil Service internship reflection")).toBe("/blog/civil-service-summer-internship");
      expect(href("Browse Career Essentials")).toBe("/resources");
      expect(href("Follow for new guides")).toBe("https://www.instagram.com/ihsaan.network/");
      expect(container.innerHTML).not.toContain("fbclid");
    });

    it("keeps My Muslim Mentor on the mentorship page", async () => {
      await renderProgramme("mentorship");
      expect(href("Visit My Muslim Mentor")).toBe("https://mymuslimmentor.com/");
      expect(href("Become a mentor")).toBe("/contact");
    });

    it("points the conferences page at the events route without inline scheduled cards", async () => {
      await renderProgramme("career-conferences");
      expect(href("See scheduled IHSAAN events")).toBe("/events");
      expect(href("View upcoming events")).toBe("https://luma.com/calendar/cal-8amaiM2VigRIqjq");
      expect(href("Host or sponsor a conference")).toBe("/contact");
      expect(screen.queryByText(/Spring Week Academy|Career Conference 2026/)).toBeNull();
    });

    it("adds no related links section where a programme has none", async () => {
      await renderProgramme("faithful-talent");
      expect(screen.getByRole("heading", { level: 2, name: "Faithful Talent" })).toBeTruthy();
      expect(screen.queryByRole("heading", { name: "Related links" })).toBeNull();
    });
  });

  it("lists every programme page in the sitemap", () => {
    const urls = sitemap().map(({ url }) => url);
    expect(urls).toContain("https://ihsaan.network/programmes");
    for (const { slug } of PROGRAMME_PAGES) expect(urls).toContain(`https://ihsaan.network/programmes/${slug}`);
  });
});
