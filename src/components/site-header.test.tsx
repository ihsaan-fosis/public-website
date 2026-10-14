import { fireEvent, render, screen, within } from "@testing-library/react";
import { SiteHeader } from "./site-header";

const route = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));

describe("SiteHeader", () => {
  beforeEach(() => {
    route.pathname = "/";
    window.history.replaceState(null, "", "/");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.history.replaceState(null, "", "/");
  });

  it.each(["/", "/about", "/programmes/career-conferences", "/gallery", "/contact", "/get-involved"])(
    "keeps the wordmark pointing to the top of home from %s",
    (pathname) => {
      route.pathname = pathname;
      render(<SiteHeader />);
      expect(screen.getByRole("link", { name: "IHSAAN home" })).toHaveAttribute("href", "/");
    },
  );

  it.each(["/", "/about", "/programmes", "/impact", "/blog", "/gallery", "/contact"])(
    "targets the top of each destination in both menus from %s",
    (pathname) => {
      route.pathname = pathname;
      render(<SiteHeader />);
      for (const name of ["Primary", "Mobile primary"]) {
        const nav = screen.getByRole("navigation", { name, hidden: true });
        for (const [label, href] of [
          ["About", "/about"],
          ["Programmes", "/programmes"],
          ["Impact", "/impact"],
          ["Blog", "/blog"],
          ["Gallery", "/gallery"],
          ["Contact", "/contact"],
        ] as const) {
          expect(within(nav).getByRole("link", { name: label, hidden: true })).toHaveAttribute("href", href);
        }
      }
      expect(screen.getAllByRole("link", { name: "Get involved", hidden: true }).map((link) => link.getAttribute("href")))
        .toEqual(["/get-involved", "/get-involved"]);
    },
  );

  it("shows Impact and Blog as plain links with no dropdown, and Resources only in the footer", () => {
    render(<SiteHeader />);
    const desktop = screen.getByRole("navigation", { name: "Primary" });
    expect(within(desktop).getByRole("link", { name: "Impact" })).toHaveAttribute("href", "/impact");
    expect(within(desktop).getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(within(desktop).queryByRole("button", { name: "Impact menu" })).toBeNull();
    expect(within(desktop).queryByRole("button", { name: "Blog menu" })).toBeNull();
    expect(within(desktop).queryByRole("link", { name: "Resources" })).toBeNull();
    expect(within(desktop).queryByRole("button", { name: "Resources menu" })).toBeNull();
  });

  it("exposes each programme under the Programmes dropdown on desktop and in the mobile menu", () => {
    render(<SiteHeader />);

    const expected = [
      ["Career Conferences", "/programmes/career-conferences"],
      ["Hackathons", "/programmes/hackathons"],
      ["Insight Events", "/programmes/insight-events"],
      ["Mentorship", "/programmes/mentorship"],
      ["Summer Internship Programme", "/programmes/summer-internships"],
      ["Webinars & Workshops", "/programmes/webinars-workshops"],
    ] as const;

    const desktop = screen.getByRole("navigation", { name: "Primary" });
    fireEvent.click(within(desktop).getByRole("button", { name: "Programmes menu" }));
    for (const [label, href] of expected) {
      expect(within(desktop).getByRole("menuitem", { name: label })).toHaveAttribute("href", href);
    }
    expect(within(desktop).queryByRole("menuitem", { name: "All programmes" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const mobile = screen.getByRole("navigation", { name: "Mobile primary" });
    fireEvent.click(within(mobile).getByRole("button", { name: "Show Programmes links" }));
    for (const [label, href] of expected) {
      expect(within(mobile).getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
  });

  it("keeps the programmes overview link active from a detail page and marks the open child", () => {
    route.pathname = "/programmes/career-conferences";
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "Programmes" })).toHaveAttribute("href", "/programmes");
    expect(within(nav).getByRole("link", { name: "Programmes" })).toHaveAttribute("aria-current", "page");
    fireEvent.click(within(nav).getByRole("button", { name: "Programmes menu" }));
    expect(within(nav).getByRole("menuitem", { name: "Career Conferences" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it.each([
    ["/", "IHSAAN home"],
    ["/about", "About"],
    ["/programmes", "Programmes"],
    ["/impact", "Impact"],
    ["/blog", "Blog"],
    ["/gallery", "Gallery"],
    ["/contact", "Contact"],
    ["/get-involved", "Get involved"],
  ])("scrolls to the exact page top when re-clicking %s", (pathname, name) => {
    route.pathname = pathname;
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<SiteHeader />);
    const links = screen.getAllByRole("link", { name, hidden: true });
    for (const link of links) {
      fireEvent.click(link.firstElementChild ?? link);
    }
    expect(scrollTo).toHaveBeenCalledTimes(links.length);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
  });

  it.each(["metaKey", "ctrlKey", "shiftKey", "altKey"])("preserves modified clicks with %s", (modifier) => {
    route.pathname = "/about";
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    fireEvent.click(within(nav).getByRole("link", { name: "About" }), { [modifier]: true });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("resets the viewport after arriving at the destination page", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    const { rerender } = render(<SiteHeader />);
    expect(scrollTo).not.toHaveBeenCalled();

    const nav = screen.getByRole("navigation", { name: "Primary" });
    fireEvent.click(within(nav).getByRole("link", { name: "About" }));
    expect(scrollTo).not.toHaveBeenCalled();
    window.history.replaceState(null, "", "/about");
    route.pathname = "/about";
    rerender(<SiteHeader />);
    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
    expect(window.location.hash).toBe("");

    scrollTo.mockClear();
    route.pathname = "/";
    rerender(<SiteHeader />);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("leaves other section anchors alone", () => {
    window.history.replaceState(null, "", "/#programmes");
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<SiteHeader />);
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("links to the student portal subdomain beside Get involved, on desktop and in the mobile menu", () => {
    const { container } = render(<SiteHeader />);
    const header = container.querySelector("header")!;
    const portalLinks = within(header).getAllByRole("link", { name: "Student portal", hidden: true });
    expect(portalLinks.map((link) => link.getAttribute("href"))).toEqual([
      "https://portal.ihsaan.network/sign-in",
      "https://portal.ihsaan.network/sign-in",
    ]);
    expect(screen.getAllByRole("link", { name: "Get involved", hidden: true })).toHaveLength(2);
  });
});
