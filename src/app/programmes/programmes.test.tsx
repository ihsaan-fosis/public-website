import { render, screen } from "@testing-library/react";
import { PROGRAMME_PAGES } from "@/content/programmes";
import { NAV_LINKS, PROGRAMMES } from "@/content/site";
import sitemap from "../sitemap";
import ProgrammesPage from "./page";
import ProgrammePage, { generateStaticParams } from "./[slug]/page";

describe("programme pages", () => {
  it("points the Programmes nav link at its own page with a child per programme", () => {
    const programmes = NAV_LINKS.find((link) => link.label === "Programmes");
    expect(programmes?.href).toBe("/programmes");
    const byHref = (a: { href: string }, b: { href: string }) => a.href.localeCompare(b.href);
    expect([...(programmes?.children ?? [])].sort(byHref)).toEqual(
      PROGRAMMES.map(({ slug, title }) => ({ href: `/programmes/${slug}`, label: title })).sort(byHref),
    );
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
    const { container } = render(<ProgrammesPage />);
    for (const { slug, title } of PROGRAMME_PAGES) {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeTruthy();
      expect(container.querySelector(`a[href="/programmes/${slug}"]`)).toBeTruthy();
    }
  });

  it("lists every other programme as a photo card link on a detail page, without repeating the current one", async () => {
    const { container } = render(await ProgrammePage({ params: Promise.resolve({ slug: "hackathons" }) }));
    const section = container.querySelector("section[aria-labelledby='more-title']")!;
    const hrefs = [...section.querySelectorAll("li a")].map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual(
      PROGRAMME_PAGES.filter(({ slug }) => slug !== "hackathons").map(({ slug }) => `/programmes/${slug}`),
    );
    expect(screen.getByRole("link", { name: "All programmes" }).getAttribute("href")).toBe("/programmes");
  });

  it("renders a detail page with its headline and call to action", async () => {
    render(await ProgrammePage({ params: Promise.resolve({ slug: "career-conferences" }) }));
    expect(screen.getByRole("heading", { level: 1 }).getAttribute("aria-label")).toBe("Meet the employers who want you.");
    expect(screen.getByRole("link", { name: /View upcoming events/ })).toBeTruthy();
  });

  it("describes the conference route on a screen-reader map", async () => {
    render(await ProgrammePage({ params: Promise.resolve({ slug: "career-conferences" }) }));
    expect(screen.getByRole("img", { name: /Map of the UK and Ireland/ }).textContent).toContain("Glasgow");
    expect(screen.getByText(/Leeds, 3 Feb 2026, 143 signups/)).toBeTruthy();
  });

  describe("destination links", () => {
    async function renderProgramme(slug: string) {
      return render(await ProgrammePage({ params: Promise.resolve({ slug }) }));
    }

    function href(name: string) {
      return screen.getByRole("link", { name }).getAttribute("href");
    }

    it("keeps the hackathons page on IHSAAN's own events and partnership actions, without the external Haqqathons site", async () => {
      const { container } = await renderProgramme("hackathons");
      expect(href("See upcoming events")).toBe("https://luma.com/calendar/cal-8amaiM2VigRIqjq");
      expect(href("Become a partner")).toBe("/contact");
      expect(container.innerHTML).not.toContain("haqqathons.com");
      expect(screen.queryByRole("heading", { name: "Related links" })).toBeNull();
      expect(screen.getByText(/British Muslim Heritage Centre, Manchester/)).toBeTruthy();
      expect(screen.getByText("Dublin")).toBeTruthy();
    });

    it("keeps My Muslim Mentor on the mentorship page", async () => {
      await renderProgramme("mentorship");
      expect(href("Visit My Muslim Mentor")).toBe("https://mymuslimmentor.com/");
      expect(href("Become a mentor")).toBe("https://mymuslimmentor.com/signup");
    });

    it("points the conferences page at the events route without inline scheduled cards", async () => {
      await renderProgramme("career-conferences");
      expect(screen.queryByRole("link", { name: "See scheduled IHSAAN events" })).toBeNull();
      expect(href("View upcoming events")).toBe("https://luma.com/calendar/cal-8amaiM2VigRIqjq");
      expect(href("Host or sponsor a conference")).toBe("/contact");
      expect(screen.queryByText(/Spring Week Academy|Career Conference 2026/)).toBeNull();
    });

    it("adds no related links section where a programme has none", async () => {
      await renderProgramme("summer-internships");
      expect(screen.getByRole("heading", { level: 2, name: "Summer Internship Programme" })).toBeTruthy();
      expect(screen.queryByRole("heading", { name: "Related links" })).toBeNull();
    });

    it("shows only the internship figures the impact page also publishes, with no unsourced role count", async () => {
      const { container } = await renderProgramme("summer-internships");
      expect(container.textContent).toContain("100+");
      expect(container.textContent).toContain("30+");
      expect(container.textContent).not.toContain("50+");
      expect(container.textContent).not.toContain("Faithful Talent");
    });

    it("names insight-event examples by category only, without firms or guarantees", async () => {
      const { container } = await renderProgramme("insight-events");
      for (const category of ["Bulge bracket investment banks", "Big Four firms", "The FCA"]) {
        expect(screen.getByRole("heading", { name: category })).toBeTruthy();
      }
      expect(container.textContent).toContain("does not guarantee an internship or a job offer");
      expect(container.textContent).not.toMatch(/Goldman|Morgan|Barclays|Deloitte|PwC|KPMG|EY|Ernst/);
      expect(href("See upcoming events")).toBe("/events");
    });

    it("describes every Roast My format and files Spring Week Academy under Webinars & Workshops", async () => {
      await renderProgramme("webinars-workshops");
      for (const format of ["Roast My CV", "Roast My Interview", "Roast My Assessment Centre", "Online panels and speaker events", "Bootcamps"]) {
        expect(screen.getByRole("heading", { name: format })).toBeTruthy();
      }
      expect(screen.getByText("Interview practice, which may include a mock interview.")).toBeTruthy();
      expect(screen.getByText(/Spring Week Academy/)).toBeTruthy();
      expect(href("See upcoming events")).toBe("/events");
    });
  });

  it("lists every programme page in the sitemap", () => {
    const urls = sitemap().map(({ url }) => url);
    expect(urls).toContain("https://ihsaan.network/programmes");
    for (const { slug } of PROGRAMME_PAGES) expect(urls).toContain(`https://ihsaan.network/programmes/${slug}`);
  });
});
