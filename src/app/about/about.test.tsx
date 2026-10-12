import { render, screen } from "@testing-library/react";
import { MISSION, TAGLINE } from "@/content/site";
import { CONFERENCE_CITIES, CONFERENCE_SIGNUPS } from "@/content/story";
import AboutPage from "./page";

describe("our story page", () => {
  it("opens with the shared page hero", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Our story." })).toBeTruthy();
  });

  it("does not repeat the home page mission, promise or tagline", () => {
    const { container } = render(<AboutPage />);
    const text = container.textContent ?? "";
    expect(text).not.toContain(MISSION);
    expect(text).not.toContain(TAGLINE);
    expect(text).not.toContain("equal access to the mentorship, networks and opportunities");
    expect(text).not.toContain("The word Ihsaan means excellence");
  });

  it("totals conference signups per city from the career conferences programme page", () => {
    expect(CONFERENCE_SIGNUPS).toBe(2158);
    expect(CONFERENCE_CITIES.map(({ city, visits, signups }) => [city, visits, signups])).toEqual([
      ["Birmingham", 2, 386],
      ["London", 2, 960],
      ["Manchester", 2, 355],
      ["Dublin", 1, 150],
      ["Glasgow", 1, 164],
      ["Leeds", 1, 143],
    ]);
  });

  it("describes the conference route for screen readers", () => {
    render(<AboutPage />);
    expect(screen.getByRole("img", { name: /Map of the UK and Ireland/ }).textContent).toContain("Glasgow");
    expect(screen.getByText(/Leeds, 3 Feb 2026, 143 signups/)).toBeTruthy();
  });

  it("tells who IHSAAN is and closes with a way to get involved", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: "Who we are" })).toBeTruthy();
    expect(screen.getByText(/national careers programme of the Federation of Student Islamic Societies/)).toBeTruthy();
    expect(screen.getByRole("link", { name: "Get involved" }).getAttribute("href")).toBe("/ticket");
    expect(screen.getByRole("link", { name: "See upcoming events" }).getAttribute("href")).toBe("/events");
  });
});
