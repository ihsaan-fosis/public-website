import { render, screen, within } from "@testing-library/react";
import Home from "./page";

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace: vi.fn() }), usePathname: () => "/" }));

describe("Home", () => {
  it("leads with the IHSAAN headline and a route into getting involved", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).getAttribute("aria-label")).toBe("Faith. Excellence. Service.");
    expect(screen.getAllByRole("link", { name: /Get involved/ })[0].getAttribute("href")).toBe("/ticket");
  });

  it("lists the five programmes and the member portal under the #programmes anchor", () => {
    render(<Home />);
    const programmes = screen.getByRole("region", { name: "Explore what we offer" });
    expect(programmes.id).toBe("programmes");
    const titles = within(programmes)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual([
      "Career Conferences",
      "Faithful Talent",
      "Hackathons",
      "Mentorship",
      "Career Guides",
      "Member Portal",
    ]);
    expect(within(programmes).getByRole("link", { name: /Member Portal/ }).getAttribute("href")).toBe(
      "https://portal.ihsaan.network",
    );
  });

  it("shows every way to get involved with its own call to action, without interaction", () => {
    render(<Home />);
    const routes = screen.getByRole("region", { name: "Find your place at IHSAAN" });
    const titles = within(routes)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual(["Students", "Professionals", "Organisations"]);
    const ctas = ["Explore programmes", "Offer your time", "Partner with us"].map((name) =>
      within(routes).getByRole("link", { name }).getAttribute("href"),
    );
    expect(ctas).toEqual(["/programmes", "/contact", "/contact"]);
  });

  it("offers an evergreen route to events instead of a dated schedule", () => {
    const { container } = render(<Home />);
    expect(screen.getByRole("link", { name: "View events" }).getAttribute("href")).toBe("/events");
    expect(container.textContent).not.toMatch(/Spring Week Academy|Career Conference 2026/);
  });

  it("does not show template prices or the placeholder event schedule", () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toMatch(/\$99|\$249|Check-In|Opening Keynote/);
  });
});
