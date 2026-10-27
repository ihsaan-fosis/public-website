import { render, screen, within } from "@testing-library/react";
import GetInvolvedPage from "../start/page";

describe("get involved member landing page", () => {
  it("leads with account creation and keeps the professionals route distinct", () => {
    render(<GetInvolvedPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const title = screen.getByRole("heading", { level: 1, name: "Turn your degree into a career." });
    const hero = title.closest("section");
    if (!hero) throw new Error("The member hero is missing");
    const heroLinks = within(hero).getAllByRole("link");
    expect(heroLinks[0]).toHaveAccessibleName("Create your account");
    expect(heroLinks[0]).toHaveAttribute("href", "https://portal.ihsaan.network/sign-up");
    expect(within(hero).getByRole("link", { name: "Professionals and organisations", exact: true }))
      .toHaveAttribute("href", "/professionals");
    const accountLinks = screen.getAllByRole("link", { name: "Create your account", exact: true });
    expect(accountLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of accountLinks) {
      expect(link).toHaveAttribute("href", "https://portal.ihsaan.network/sign-up");
    }
    expect(accountLinks.some((link) => !hero.contains(link))).toBe(true);
  });

  it("offers programme benefits and how it works without the old audience chooser", () => {
    const { container } = render(<GetInvolvedPage />);
    expect(screen.getByRole("heading", { name: "What you get", exact: true })).toBeVisible();
    expect(screen.getByRole("heading", { name: "How it works", exact: true })).toBeVisible();
    expect(screen.queryByRole("combobox")).toBeNull();
    expect(screen.queryByRole("link", { name: "Explore programmes", exact: true })).toBeNull();
    expect(screen.queryByRole("button", { name: "Explore programmes", exact: true })).toBeNull();
    const visible = container.cloneNode(true);
    if (!(visible instanceof HTMLElement)) throw new Error("Missing rendered member page");
    visible.querySelectorAll('[aria-hidden="true"], [hidden], script, style, template').forEach((node) => node.remove());
    expect(visible.textContent).not.toMatch(/membership|filter by audience|show steps for/i);
    for (const name of [
      "Not sure where to start?",
      "Ways to get involved",
      "Good to know before you join",
    ]) {
      expect(screen.queryByRole("heading", { name, exact: true })).toBeNull();
    }
    expect(screen.queryByRole("link", { name: "Contact IHSAAN", exact: true })).toBeNull();
  });
});
