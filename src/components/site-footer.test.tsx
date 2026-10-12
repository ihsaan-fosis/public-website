import { render, screen } from "@testing-library/react";
import { SiteFooter } from "./site-footer";

describe("SiteFooter", () => {
  it.each([
    ["Instagram", "https://www.instagram.com/ihsaan.network/"],
    ["LinkedIn", "https://www.linkedin.com/company/ihsaan-network/"],
    ["TikTok", "https://www.tiktok.com/@ihsaan.network"],
    ["YouTube", "https://www.youtube.com/@IHSAAN.network"],
  ])("links %s with an accessible name, a visible icon and safe new-tab attributes", (name, href) => {
    render(<SiteFooter />);
    const link = screen.getByRole("link", { name });
    expect(link.getAttribute("href")).toBe(href);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link.querySelector("svg") !== null || (link.textContent ?? "").trim() === name).toBe(true);
  });

  it("links Events from the explore column", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "Events" }).getAttribute("href")).toBe("/events");
  });

  it("shows the closing wordmark without waiting for a scroll reveal it can never reach on phones", () => {
    const { container } = render(<SiteFooter />);
    const logos = container.querySelectorAll("img[src$='-logo-large.webp']");
    expect(logos).toHaveLength(2);
    logos.forEach((logo) => expect(logo.closest("[data-reveal]")).toBeNull());
  });
});
