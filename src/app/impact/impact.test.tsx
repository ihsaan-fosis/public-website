import { render, screen } from "@testing-library/react";
import { ENGAGEMENT, GAP_STATEMENT, STORIES, TRACTION, VOICES_SUMMARY } from "@/content/impact";
import ImpactPage, { metadata } from "./page";

describe("impact page", () => {
  it("opens with one page title and routes visitors to partner or explore", () => {
    render(<ImpactPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "Our impact." })).toBeTruthy();
    expect(screen.getAllByRole("link", { name: "Partner with us" }).map((link) => link.getAttribute("href"))).toEqual([
      "/contact",
      "/contact",
    ]);
    expect(screen.getByRole("link", { name: "Our programmes" }).getAttribute("href")).toBe("/programmes");
  });

  it("states the gap as one scroll statement and leaves the figures to About", () => {
    const { container } = render(<ImpactPage />);
    expect(container.textContent).toContain(GAP_STATEMENT);
    expect(container.textContent).not.toContain("Source:");
  });

  it("reports growth and the headline traction figures", () => {
    render(<ImpactPage />);
    const growth = screen.getByRole("heading", { name: "Student engagement tripled in a year" });
    expect(growth).toBeTruthy();
    expect(ENGAGEMENT.map((year) => [year.label, year.display])).toEqual([
      ["2024/25", "1,500+"],
      ["2025/26", "4,600+"],
    ]);
    expect(TRACTION.map((stat) => stat.value)).toEqual(["~4,000", "1,307", "150+", "100+", "6", "25"]);
    expect(document.body.textContent).toContain("About 4,000 Muslim students engaged in two years");
  });

  it("shows every outcome story with a link to its programme page", () => {
    render(<ImpactPage />);
    for (const story of STORIES) {
      expect(screen.getByRole("heading", { name: story.outcome })).toBeTruthy();
      expect(document.body.textContent).toContain(story.attribution);
      expect(document.querySelector(`a[href="${story.href}"]`)).toBeTruthy();
    }
    expect(document.body.textContent).toContain(VOICES_SUMMARY);
    expect(screen.queryByRole("heading", { name: "Employers hire. Mentors give back." })).toBeNull();
  });

  it("omits the measurement framework and 2045 vision chapters", () => {
    render(<ImpactPage />);
    expect(screen.queryByRole("heading", { name: "We measure every stage, from activity to impact" })).toBeNull();
    expect(screen.queryByRole("heading", { name: /By 2045, every Muslim student can reach a career/ })).toBeNull();
    expect(document.body.textContent).not.toContain("Every pound of funding is accountable");
    expect(document.body.textContent).not.toContain("2045 vision");
  });

  it("leaves the team and governance to the about page", () => {
    render(<ImpactPage />);
    expect(screen.queryByRole("heading", { name: /Team and governance|executive team|Key risks/ })).toBeNull();
    expect(document.body.textContent).not.toContain("Company number");
  });

  it("ends with the proposal contact", () => {
    render(<ImpactPage />);
    expect(screen.getByRole("link", { name: "ceo.ihsaan@fosis.org.uk" }).getAttribute("href")).toBe(
      "mailto:ceo.ihsaan@fosis.org.uk",
    );
  });

  it("uses no em or en dashes in its copy", () => {
    const { container } = render(<ImpactPage />);
    for (const code of [8211, 8212]) expect(container.textContent).not.toContain(String.fromCharCode(code));
  });

  it("has its own canonical and social title", () => {
    expect(metadata.alternates?.canonical).toBe("/impact");
    expect(metadata.title).toBe("Our Impact");
  });
});
