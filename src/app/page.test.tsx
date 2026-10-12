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

  it("does not show template prices or the placeholder event schedule", () => {
    const { container } = render(<Home />);
    expect(container.textContent).not.toMatch(/\$99|\$249|Check-In|Opening Keynote/);
  });
});
