import { fireEvent, render, screen, within } from "@testing-library/react";
import { RouteSwitcher } from "./route-switcher";

const PROFESSIONAL_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSdrT7sgjnP6aqgL6qLwcEQZWr_qHHlf9AWa6Qr8ZEr77I9gTQ/viewform";

describe("RouteSwitcher", () => {
  it("keeps Professionals selected while the pointer or focus passes Organisations on the way to its call to action", () => {
    render(<RouteSwitcher />);
    const professionals = screen.getByRole("button", { name: /Professionals/ });
    const organisations = screen.getByRole("button", { name: /Organisations/ });

    fireEvent.click(professionals);
    fireEvent.mouseEnter(organisations);
    fireEvent.mouseOver(organisations);
    fireEvent.focus(organisations);

    expect(professionals).toHaveAttribute("aria-pressed", "true");
    expect(organisations).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("link", { name: "Offer your time" })).toHaveAttribute("href", PROFESSIONAL_FORM);
  });

  it("offers the three professional routes with their own destinations", () => {
    render(<RouteSwitcher />);
    fireEvent.click(screen.getByRole("button", { name: /Professionals/ }));
    const routes = screen.getByRole("list", { name: "More ways in for professionals" });
    expect(
      within(routes)
        .getAllByRole("link")
        .map((link) => [link.textContent, link.getAttribute("href")]),
    ).toEqual([
      ["Become a mentor on MMM", "https://mymuslimmentor.com/signup"],
      ["Join the alumni network", "/get-involved#alumni"],
      [
        "Join the WhatsApp community",
        "https://docs.google.com/forms/d/e/1FAIpQLSehrwaRiPVkVI3UVq23jv4SZBZ540kC2D-PW84OeUIT9FIu6Q/viewform",
      ],
    ]);
  });

  it("switches route only when a route is chosen", () => {
    render(<RouteSwitcher />);
    fireEvent.click(screen.getByRole("button", { name: /Organisations/ }));
    expect(screen.getByRole("link", { name: "Partner with us" })).toHaveAttribute("href", "/contact");
    expect(screen.queryByRole("link", { name: "Offer your time" })).toBeNull();
  });
});
