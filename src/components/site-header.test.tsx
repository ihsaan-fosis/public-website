import { render, screen, within } from "@testing-library/react";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("SiteHeader", () => {
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
