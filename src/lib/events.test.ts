import type { PublicEvent } from "@/content/events";
import { classifyEvents, eventPhase, formatEventSchedule } from "./events";

function event(overrides: Partial<PublicEvent> = {}): PublicEvent {
  return {
    id: "academy",
    destination: "lawSpringWeekAcademy",
    title: "Academy",
    summary: "A session.",
    start: "2026-10-13T19:00:00+01:00",
    end: "2026-10-13T20:00:00+01:00",
    timeZone: "Europe/London",
    kind: "academy",
    location: "Online",
    status: "scheduled",
    ...overrides,
  };
}

describe("eventPhase", () => {
  it.each([
    ["2026-10-13T18:59:59.999+01:00", "upcoming"],
    ["2026-10-13T19:00:00+01:00", "ongoing"],
    ["2026-10-13T19:59:59.999+01:00", "ongoing"],
    ["2026-10-13T20:00:00+01:00", "ended"],
    ["2026-10-14T09:00:00+01:00", "ended"],
  ])("classifies %s as %s", (now, phase) => {
    expect(eventPhase(event(), new Date(now))).toBe(phase);
  });

  it.each(["2026-10-01T00:00:00Z", "2026-10-13T19:30:00+01:00", "2026-11-01T00:00:00Z"])(
    "keeps a cancelled event cancelled at %s",
    (now) => {
      expect(eventPhase(event({ status: "cancelled" }), new Date(now))).toBe("cancelled");
    },
  );

  it("compares instants, not wall clock text, across offsets", () => {
    // 20:00 in Dublin on 24 October is 19:00 UTC, so the event has not started at 18:30 UTC.
    const dublin = event({ start: "2026-10-24T20:00:00+01:00", end: "2026-10-24T22:00:00+01:00", timeZone: "Europe/Dublin" });
    expect(eventPhase(dublin, new Date("2026-10-24T18:30:00Z"))).toBe("upcoming");
    expect(eventPhase(dublin, new Date("2026-10-24T19:00:00Z"))).toBe("ongoing");
  });
});

describe("classifyEvents", () => {
  const later = event({ id: "later", start: "2026-10-18T19:00:00+01:00", end: "2026-10-18T20:00:00+01:00" });
  const earlier = event({ id: "earlier", start: "2026-10-12T17:00:00+01:00", end: "2026-10-12T18:00:00+01:00" });
  const tieB = event({ id: "b-tie", start: "2026-10-15T19:00:00+01:00", end: "2026-10-15T20:00:00+01:00" });
  const tieA = event({ id: "a-tie", start: "2026-10-15T19:00:00+01:00", end: "2026-10-15T20:00:00+01:00" });

  it("orders by start instant, then id, and labels each event for the supplied clock", () => {
    const result = classifyEvents([later, tieB, earlier, tieA], new Date("2026-10-12T17:30:00+01:00"));
    expect(result.map(({ event: { id }, phase }) => `${id}:${phase}`)).toEqual([
      "earlier:ongoing",
      "a-tie:upcoming",
      "b-tie:upcoming",
      "later:upcoming",
    ]);
  });

  it("does not mutate its input", () => {
    const input = [later, earlier];
    classifyEvents(input, new Date("2026-10-12T00:00:00Z"));
    expect(input.map(({ id }) => id)).toEqual(["later", "earlier"]);
  });

  it("returns an empty list for no events", () => {
    expect(classifyEvents([], new Date("2026-10-12T00:00:00Z"))).toEqual([]);
  });
});

describe("formatEventSchedule", () => {
  it("shows British Summer Time for a London event in October", () => {
    expect(formatEventSchedule(event())).toBe("Tuesday 13 October 2026, 19:00 to 20:00 BST");
  });

  it("switches to GMT after the clocks go back on 25 October 2026", () => {
    const afterChange = event({ start: "2026-10-26T19:00:00Z", end: "2026-10-26T20:00:00Z" });
    expect(formatEventSchedule(afterChange)).toBe("Monday 26 October 2026, 19:00 to 20:00 GMT");
  });

  it("uses the Irish abbreviation for a Dublin event", () => {
    const dublin = event({ start: "2026-10-24T11:00:00+01:00", end: "2026-10-24T15:00:00+01:00", timeZone: "Europe/Dublin" });
    expect(formatEventSchedule(dublin)).toBe("Saturday 24 October 2026, 11:00 to 15:00 IST");
  });

  it("uses GMT for a Dublin event in winter", () => {
    const winter = event({ start: "2026-12-10T18:00:00Z", end: "2026-12-10T20:00:00Z", timeZone: "Europe/Dublin" });
    expect(formatEventSchedule(winter)).toBe("Thursday 10 December 2026, 18:00 to 20:00 GMT");
  });

  it("names both zones when an event straddles the clocks going forward on 29 March 2026", () => {
    const straddle = event({ start: "2026-03-29T00:30:00Z", end: "2026-03-29T02:30:00Z" });
    expect(formatEventSchedule(straddle)).toBe("Sunday 29 March 2026, 00:30 GMT to 03:30 BST");
  });

  it("names the end date when an event crosses midnight", () => {
    const overnight = event({ start: "2026-11-06T22:00:00Z", end: "2026-11-07T01:00:00Z" });
    expect(formatEventSchedule(overnight)).toBe("Friday 6 November 2026, 22:00 to Saturday 7 November 2026, 01:00 GMT");
  });
});
