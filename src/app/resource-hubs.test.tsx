import { render, screen } from "@testing-library/react";
import { RESOURCE_HUBS } from "@/content/resource-hubs";
import { RESOURCE_NAV_LINKS } from "@/content/site";
import sitemap from "./sitemap";
import HaqqathonsPage from "./haqqathons/page";
import MentoringPage from "./mentoring/page";

describe("resource hub placeholders", () => {
  it("registers mentoring and haqqathons in the Resources nav", () => {
    expect(RESOURCE_NAV_LINKS).toEqual(
      expect.arrayContaining([
        { href: "/mentoring", label: "Mentoring" },
        { href: "/haqqathons", label: "Haqqathons" },
      ]),
    );
  });

  it.each(RESOURCE_HUBS)("renders a coming-soon hub for $title with live partner links", (hub) => {
    const Page = hub.slug === "mentoring" ? MentoringPage : HaqqathonsPage;
    render(<Page />);

    expect(screen.getByRole("heading", { name: "This hub is still being built" })).toBeTruthy();
    expect(screen.getByText("Coming soon")).toBeTruthy();
    expect(screen.getByRole("link", { name: hub.partner.label }).getAttribute("href")).toBe(hub.partner.href);
    expect(screen.getByRole("link", { name: hub.programme.label }).getAttribute("href")).toBe(hub.programme.href);
  });

  it("publishes both hub routes in the sitemap", () => {
    const urls = sitemap().map(({ url }) => url);
    for (const hub of RESOURCE_HUBS) {
      expect(urls).toContain(`https://ihsaan.network${hub.path}`);
    }
  });
});
