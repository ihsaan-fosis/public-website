import { render, screen, within } from "@testing-library/react";
import { CONFERENCE_CITIES, CONFERENCE_SIGNUPS } from "@/content/story";
import AboutPage from "./page";

describe("our story page", () => {
  it("opens with the shared page hero", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Our story." })).toBeTruthy();
  });

  it("states the vision, mission and three values in the supplied wording", () => {
    const { container } = render(<AboutPage />);
    const text = container.textContent ?? "";
    expect(screen.getByRole("heading", { name: "Our vision" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Our mission" })).toBeTruthy();
    expect(text).toContain(
      "We envision a world where every Muslim has the opportunity to fulfil their potential, unlock their dream career, and help build a more ethical society for all.",
    );
    expect(text).toContain(
      "We equip Muslim students with the opportunities and networks to build careers rooted in faith, excellence, and service.",
    );
    expect(screen.getByRole("heading", { name: /^Our values\s*Faith\.\s*Excellence\.\s*Service\.$/ })).toBeTruthy();
    expect(text).toContain("Faith · Imaan");
    expect(text).toContain("Excellence · Ihsaan");
    expect(text).toContain("Service · Khidmah");
    expect(text).toContain("We act with integrity, honesty, and accountability to God and to those we serve.");
    expect(text).toContain("We aim high, take ownership of our work, and keep improving to deliver real impact.");
    expect(text).toContain("We serve students, partners, and each other with respect, generosity, and care.");
  });

  it("names the executive team with their roles", () => {
    render(<AboutPage />);
    const team = screen.getByRole("region", { name: "Meet the executive team" });
    const rows = within(team)
      .getAllByRole("listitem")
      .map((row) => [within(row).getByRole("heading", { level: 3 }).textContent, row.querySelector("p")?.textContent]);
    expect(rows).toEqual([
      ["Samir Sidat", "Chief Executive Officer"],
      ["Eyad Abdelhady", "Co-Chief Operating Officer"],
      ["Musaddiq Iqbal", "Co-Chief Operating Officer"],
      ["Muhammad Islam", "Chief Financial Officer"],
      ["Bushra Abdullah", "Chief People Officer"],
      ["Yusuf Shamsi", "Chief Information Officer"],
    ]);
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
    expect(screen.getByRole("heading", { name: "Grassroots and career-focused" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Programmes built around people" })).toBeTruthy();
    expect(document.body.textContent).toContain("From bootcamps and webinars to conferences and career events");
    expect(document.body.textContent).not.toContain("Our Spring Week Academies are led by students");
    expect(document.body.textContent).not.toMatch(/FOSIS|Federation of Student Islamic Societies/);
    expect(screen.getByRole("link", { name: "Get involved" }).getAttribute("href")).toBe("/ticket");
    expect(screen.getByRole("link", { name: "See upcoming events" }).getAttribute("href")).toBe("/events");
  });
});
