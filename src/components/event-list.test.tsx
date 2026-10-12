import { render, screen, within } from "@testing-library/react";
import type { PublicEvent } from "@/content/events";
import { classifyEvents } from "@/lib/events";
import { EventList } from "./event-list";

const law: PublicEvent = {
  id: "law",
  destination: "lawSpringWeekAcademy",
  title: "Law Spring Week Academy",
  summary: "A student-led look inside the legal world.",
  start: "2026-10-13T19:00:00+01:00",
  end: "2026-10-13T20:00:00+01:00",
  timeZone: "Europe/London",
  kind: "academy",
  location: "Online",
  status: "scheduled",
};

function renderAt(now: string, overrides: Partial<PublicEvent> = {}) {
  render(<EventList label="Events" items={classifyEvents([{ ...law, ...overrides }], new Date(now))} />);
  return within(screen.getByRole("listitem"));
}

describe("EventList", () => {
  it("links an upcoming event to its Luma page with its schedule and format", () => {
    const card = renderAt("2026-10-12T09:00:00Z");
    expect(card.getByRole("heading", { level: 3 }).textContent).toBe("Law Spring Week Academy");
    expect(card.getByRole("link", { name: "View event on Luma: Law Spring Week Academy" }).getAttribute("href")).toBe(
      "https://luma.com/7bhqps51",
    );
    expect(card.getByText("Tuesday 13 October 2026, 19:00 to 20:00 BST").getAttribute("datetime")).toBe(
      "2026-10-13T19:00:00+01:00",
    );
    expect(card.getByText("Online")).toBeTruthy();
    expect(card.getByText("Academy")).toBeTruthy();
  });

  it("marks an ongoing event as happening now", () => {
    const card = renderAt("2026-10-13T18:30:00Z");
    expect(card.getByText("Happening now")).toBeTruthy();
    expect(card.getByRole("link", { name: /View event on Luma/ })).toBeTruthy();
  });

  it("offers an ended event as a past event, not a registration", () => {
    const card = renderAt("2026-10-13T19:00:00Z");
    expect(card.getByText("Ended")).toBeTruthy();
    expect(card.getByRole("link", { name: "View past event: Law Spring Week Academy" }).getAttribute("href")).toBe(
      "https://luma.com/7bhqps51",
    );
    expect(card.queryByRole("link", { name: /View event on Luma/ })).toBeNull();
  });

  it("shows a cancelled event without any link", () => {
    const card = renderAt("2026-10-01T09:00:00Z", { status: "cancelled" });
    expect(card.getByText("Cancelled")).toBeTruthy();
    expect(card.getByText("This event has been cancelled.")).toBeTruthy();
    expect(card.queryByRole("link")).toBeNull();
  });
});
