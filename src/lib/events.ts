import type { PublicEvent } from "@/content/events";

export type EventPhase = "upcoming" | "ongoing" | "ended" | "cancelled";

export type ClassifiedEvent = { event: PublicEvent; phase: EventPhase };

export function eventPhase({ start, end, status }: PublicEvent, now: Date): EventPhase {
  if (status === "cancelled") return "cancelled";
  const time = now.getTime();
  if (time < Date.parse(start)) return "upcoming";
  return time < Date.parse(end) ? "ongoing" : "ended";
}

export function classifyEvents(events: readonly PublicEvent[], now: Date): ClassifiedEvent[] {
  return events
    .map((event) => ({ event, phase: eventPhase(event, now) }))
    .sort((a, b) => Date.parse(a.event.start) - Date.parse(b.event.start) || a.event.id.localeCompare(b.event.id));
}

/** Irish abbreviations differ from British ones in summer (IST, not BST), so the zone name uses the event's own locale. */
const ZONE_LOCALE = { "Europe/London": "en-GB", "Europe/Dublin": "en-IE" } as const;

function dateLabel(date: Date, timeZone: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "long", day: "numeric", month: "long", year: "numeric" })
      .formatToParts(date)
      .map(({ type, value }) => [type, value]),
  );
  return `${parts.weekday} ${parts.day} ${parts.month} ${parts.year}`;
}

function timeLabel(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
}

export function formatEventSchedule({ start, end, timeZone }: PublicEvent): string {
  const from = new Date(start);
  const to = new Date(end);
  const zoneName = (date: Date) =>
    new Intl.DateTimeFormat(ZONE_LOCALE[timeZone], { timeZone, timeZoneName: "short" })
      .formatToParts(date)
      .find(({ type }) => type === "timeZoneName")?.value;
  const startZone = zoneName(from);
  const endZone = zoneName(to);
  const startDay = dateLabel(from, timeZone);
  const endDay = dateLabel(to, timeZone);
  // An event that straddles a clock change names both zones so neither time is read in the wrong one.
  const startText = `${startDay}, ${timeLabel(from, timeZone)}${startZone === endZone ? "" : ` ${startZone}`}`;
  const endText = `${startDay === endDay ? "" : `${endDay}, `}${timeLabel(to, timeZone)} ${endZone}`;
  return `${startText} to ${endText}`;
}
