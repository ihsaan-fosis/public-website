import { render, screen, within } from "@testing-library/react";
import EventsPage from "./page";

const CALENDAR = "https://luma.com/calendar/cal-8amaiM2VigRIqjq";

function renderAt(now: string) {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(now));
  return render(<EventsPage />);
}

function titles(listName: string) {
  return within(screen.getByRole("list", { name: listName }))
    .getAllByRole("heading", { level: 3 })
    .map((heading) => heading.textContent);
}

afterEach(() => {
  vi.useRealTimers();
});

describe("events page", () => {
  it("lists upcoming events chronologically with their own Luma pages and schedules", () => {
    const { container } = renderAt("2026-10-12T09:00:00Z");

    expect(titles("Upcoming events")).toEqual([
      "Tech Spring Week Academy",
      "Law Spring Week Academy",
      "Finance Spring Week Academy",
      "IHSAAN Ireland Career Conference 2026",
    ]);
    const hrefs = within(screen.getByRole("list", { name: "Upcoming events" }))
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual([
      "https://luma.com/3byu6cfc",
      "https://luma.com/7bhqps51",
      "https://luma.com/kj5ognal",
      "https://luma.com/hafri5tc",
    ]);
    expect(screen.getByText("Monday 12 October 2026, 17:00 to 18:00 BST")).toBeTruthy();
    expect(screen.getByText("Saturday 24 October 2026, 11:00 to 15:00 IST")).toBeTruthy();
    expect(screen.getByText("TU Dublin, Grangegorman, Dublin 7")).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Past and cancelled events" })).toBeNull();
    expect(container.innerHTML).not.toContain("fbclid");
  });

  it("keeps the full calendar one clean link away", () => {
    renderAt("2026-10-12T09:00:00Z");
    expect(screen.getByRole("link", { name: "View the full IHSAAN calendar" }).getAttribute("href")).toBe(CALENDAR);
  });

  it("holds the DCU alumni panel until its end time is confirmed", () => {
    const { container } = renderAt("2026-10-12T09:00:00Z");
    expect(container.textContent).not.toMatch(/DCU|Alumni Panel/);
    expect(container.innerHTML).not.toContain("403kel6v");
  });

  it("marks an event happening now and does not promise registration or entry", () => {
    const { container } = renderAt("2026-10-12T16:30:00Z");
    const tech = screen.getByText("Tech Spring Week Academy").closest("li")!;
    expect(within(tech).getByText("Happening now")).toBeTruthy();
    expect(container.textContent).toMatch(/does not guarantee a place/);
    expect(container.textContent).not.toMatch(/registration is open|free to attend|guaranteed/i);
  });

  it("moves an event to the past list at its exact end, with a past-event link instead of registration", () => {
    renderAt("2026-10-12T17:00:00Z");

    expect(titles("Upcoming events")).toEqual([
      "Law Spring Week Academy",
      "Finance Spring Week Academy",
      "IHSAAN Ireland Career Conference 2026",
    ]);
    expect(titles("Past and cancelled events")).toEqual(["Tech Spring Week Academy"]);
    const past = within(screen.getByRole("list", { name: "Past and cancelled events" }));
    expect(past.getByRole("link", { name: /View past event/ }).getAttribute("href")).toBe("https://luma.com/3byu6cfc");
    expect(past.queryByRole("link", { name: /View event on Luma/ })).toBeNull();
  });

  it("shows the empty state and keeps the calendar once every event has ended", () => {
    renderAt("2026-10-25T00:00:00Z");

    expect(
      screen.getByText("No upcoming events are listed here. Check the IHSAAN calendar for the latest schedule."),
    ).toBeTruthy();
    expect(screen.queryByRole("list", { name: "Upcoming events" })).toBeNull();
    expect(screen.queryByRole("link", { name: /View event on Luma/ })).toBeNull();
    expect(screen.getAllByRole("link", { name: /View past event/ })).toHaveLength(4);
    expect(screen.getByRole("link", { name: "View the full IHSAAN calendar" }).getAttribute("href")).toBe(CALENDAR);
  });
});
