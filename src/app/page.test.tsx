import { render, screen, within } from "@testing-library/react";
import Home from "./page";

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace: vi.fn() }), usePathname: () => "/" }));

describe("Home", () => {
  it("leads with the IHSAAN headline and a route into getting involved", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 }).getAttribute("aria-label")).toBe("Faith. Excellence. Service.");
    expect(document.getElementById("hero")).not.toBeNull();
    expect(screen.getAllByRole("link", { name: /Get involved/ })[0].getAttribute("href")).toBe("/get-involved");
  });

  it("lists the six programmes and the member portal under the #programmes anchor", () => {
    render(<Home />);
    const programmes = screen.getByRole("region", { name: "Explore what we offer" });
    expect(programmes.id).toBe("programmes");
    const titles = within(programmes)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual([
      "Career Conferences",
      "Summer Internship Programme",
      "Insight Events",
      "Webinars & Workshops",
      "Hackathons",
      "Mentorship",
      "Member Portal",
    ]);
    expect(within(programmes).getByRole("link", { name: /Member Portal/ }).getAttribute("href")).toBe(
      "https://portal.ihsaan.network/sign-in",
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
    expect(ctas).toEqual([
      "/programmes",
      "https://docs.google.com/forms/d/e/1FAIpQLSdrT7sgjnP6aqgL6qLwcEQZWr_qHHlf9AWa6Qr8ZEr77I9gTQ/viewform",
      "/contact",
    ]);
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

  it("names the site IHSAAN for search results", () => {
    const { container } = render(<Home />);
    const website = JSON.parse(container.querySelector('script[type="application/ld+json"]')?.textContent ?? "{}");
    expect(website).toMatchObject({ "@type": "WebSite", name: "IHSAAN", url: "https://ihsaan.network/" });
  });
});
