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

  it("links Impact, Resources, Events and Blog from the explore column", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "Impact" }).getAttribute("href")).toBe("/impact");
    expect(screen.getByRole("link", { name: "Resources" }).getAttribute("href")).toBe("/resources");
    expect(screen.getByRole("link", { name: "Events" }).getAttribute("href")).toBe("/events");
    expect(screen.getByRole("link", { name: "Blog" }).getAttribute("href")).toBe("/blog");
  });

  it("drops the FOSIS programme line and keeps where IHSAAN is based", () => {
    const { container } = render(<SiteFooter />);
    expect(container.textContent).not.toMatch(/national careers programme|FOSIS/);
    expect(screen.getByText("UK & Ireland")).toBeTruthy();
  });

  it("shows the closing wordmark without waiting for a scroll reveal it can never reach on phones", () => {
    const { container } = render(<SiteFooter />);
    const logos = container.querySelectorAll("img[src$='-logo-large.webp']");
    expect(logos).toHaveLength(2);
    logos.forEach((logo) => expect(logo.closest("[data-reveal]")).toBeNull());
  });

  it("renders column labels without purple accent dots", () => {
    const { container } = render(<SiteFooter />);
    expect(container.querySelectorAll(".rounded-full.bg-gradient-to-br").length).toBe(0);
  });

  it("credits the IHSAAN Tech Team and links to their page", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "IHSAAN Tech Team" }).getAttribute("href")).toBe("/tech-team");
  });
});
