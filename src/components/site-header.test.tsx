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

  it.each(["/", "/about", "/programmes/career-conferences", "/gallery", "/contact", "/ticket"])(
    "keeps the wordmark pointing to the top of home from %s",
    (pathname) => {
      route.pathname = pathname;
      render(<SiteHeader />);
      expect(screen.getByRole("link", { name: "IHSAAN home" })).toHaveAttribute("href", "/");
    },
  );

  it.each(["/", "/about", "/programmes", "/resources", "/gallery", "/contact"])(
    "targets the top of each destination in both menus from %s",
    (pathname) => {
      route.pathname = pathname;
      render(<SiteHeader />);
      for (const name of ["Primary", "Mobile primary"]) {
        const nav = screen.getByRole("navigation", { name, hidden: true });
        for (const [label, href] of [
          ["About", "/about"],
          ["Programmes", "/programmes"],
          ["Resources", "/resources"],
          ["Gallery", "/gallery"],
          ["Contact", "/contact"],
        ] as const) {
          expect(within(nav).getByRole("link", { name: label, hidden: true })).toHaveAttribute("href", href);
        }
      }
      expect(screen.getAllByRole("link", { name: "Get involved", hidden: true }).map((link) => link.getAttribute("href")))
        .toEqual(["/ticket", "/ticket"]);
    },
  );

  it("exposes each resource type under the Resources dropdown on desktop and in the mobile menu", () => {
    render(<SiteHeader />);

    const expected = [
      ["Career Essentials", "/resources#career-essentials"],
      ["Blog", "/blog"],
      ["Mentoring", "/resources#my-muslim-mentor"],
      ["Haqqathons", "/resources#haqqathons"],
    ] as const;

    const desktop = screen.getByRole("navigation", { name: "Primary" });
    fireEvent.click(within(desktop).getByRole("button", { name: "Resources menu" }));
    for (const [label, href] of expected) {
      expect(within(desktop).getByRole("menuitem", { name: label })).toHaveAttribute("href", href);
    }
    expect(within(desktop).queryByRole("menuitem", { name: "All resources" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const mobile = screen.getByRole("navigation", { name: "Mobile primary" });
    fireEvent.click(within(mobile).getByRole("button", { name: "Show Resources links" }));
    for (const [label, href] of expected) {
      expect(within(mobile).getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
  });

  it("keeps Resources active while reading the blog", () => {
    route.pathname = "/blog";
    render(<SiteHeader />);
    const desktop = screen.getByRole("navigation", { name: "Primary" });
    fireEvent.click(within(desktop).getByRole("button", { name: "Resources menu" }));
    expect(within(desktop).getByRole("menuitem", { name: "Blog" })).toHaveAttribute("aria-current", "page");
  });

  it("keeps the programmes link targeting its overview from a detail page", () => {
    route.pathname = "/programmes/career-conferences";
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(within(nav).getByRole("link", { name: "Programmes" })).toHaveAttribute("href", "/programmes");
    expect(within(nav).getByRole("link", { name: "Programmes" })).toHaveAttribute("aria-current", "page");
  });

  it.each([
    ["/", "IHSAAN home"],
    ["/about", "About"],
    ["/programmes", "Programmes"],
    ["/resources", "Resources"],
    ["/blog", "Blog"],
    ["/gallery", "Gallery"],
    ["/contact", "Contact"],
    ["/ticket", "Get involved"],
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
      "https://portal.ihsaan.network",
      "https://portal.ihsaan.network",
    ]);
    expect(screen.getAllByRole("link", { name: "Get involved", hidden: true })).toHaveLength(2);
  });
});
