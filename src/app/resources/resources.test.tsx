import { render, screen } from "@testing-library/react";
import {
  CAREER_GUIDES,
  CIVIL_SERVICE_BLOG_PATH,
  CIVIL_SERVICE_GUIDE_SLUG,
  careerGuideHref,
  nativeCareerGuides,
} from "@/content/career-essentials";
import { RESOURCES } from "@/content/resources";
import { NAV_LINKS, RESOURCES_LINK } from "@/content/site";
import sitemap from "../sitemap";
import CareerGuidePage, { generateStaticParams } from "./[slug]/page";
import ResourcesPage from "./page";

describe("resources page", () => {
  it("keeps the guides index out of the header now that Impact has its slot, and links it from the footer set", () => {
    expect(NAV_LINKS.map((link) => link.label)).toEqual(["About", "Programmes", "Impact", "Blog", "Gallery", "Contact"]);
    expect(RESOURCES_LINK).toEqual({ href: "/resources", label: "Resources" });
  });

  it("lists every Career Essentials guide from the member catalog", () => {
    render(<ResourcesPage />);
    expect(CAREER_GUIDES.length).toBeGreaterThanOrEqual(15);
    for (const guide of CAREER_GUIDES) {
      expect(screen.getByRole("heading", { name: guide.title })).toBeTruthy();
      const destination = careerGuideHref(guide);
      const label = destination.external ? "Open guide" : "Read guide";
      const links = screen.getAllByRole("link", { name: label });
      expect(links.some((link) => link.getAttribute("href") === destination.href)).toBe(true);
    }
  });

  it("sends the Civil Service guide to the native blog article", () => {
    expect(careerGuideHref(CAREER_GUIDES.find((guide) => guide.slug === CIVIL_SERVICE_GUIDE_SLUG)!)).toEqual({
      href: CIVIL_SERVICE_BLOG_PATH,
      external: false,
    });
  });

  it("lists partner surfaces without gated destinations", () => {
    expect(RESOURCES.map((resource) => resource.id)).toEqual(["blog"]);
    const { container } = render(<ResourcesPage />);
    expect(container.innerHTML).not.toContain("tally.so");
    expect(container.innerHTML).not.toContain("opportunities-tracker");
    expect(container.innerHTML).not.toContain("fbclid");
  });

  it("publishes the resources index and every native guide in the sitemap", () => {
    const urls = sitemap().map(({ url }) => url);
    expect(urls).toContain("https://ihsaan.network/resources");
    for (const guide of nativeCareerGuides()) {
      expect(urls).toContain(`https://ihsaan.network/resources/${guide.slug}`);
    }
    expect(urls).not.toContain(`https://ihsaan.network/resources/${CIVIL_SERVICE_GUIDE_SLUG}`);
  });
});

describe("career guide pages", () => {
  it("builds static pages only for guides with on-site bodies", () => {
    expect(generateStaticParams()).toEqual(nativeCareerGuides().map(({ slug }) => ({ slug })));
    expect(generateStaticParams().some(({ slug }) => slug === CIVIL_SERVICE_GUIDE_SLUG)).toBe(false);
  });

  it("renders a native guide article with schema and Notion attribution", async () => {
    const guide = nativeCareerGuides()[0];
    const { container } = render(await CareerGuidePage({ params: Promise.resolve({ slug: guide.slug }) }));

    expect(screen.getByRole("heading", { level: 1, name: guide.title })).toBeTruthy();
    expect(container.innerHTML).toContain("\"@type\":\"Article\"");
    expect(container.innerHTML).toContain(`https://ihsaan.network/resources/${guide.slug}`);
    expect(screen.getByRole("link", { name: "Notion" }).getAttribute("href")).toBe(guide.sourceUrl);
    expect(container.innerHTML).not.toContain("fbclid");
  });
});
