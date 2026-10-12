import type { DestinationKey } from "./links";

export type EventKind = "academy" | "conference";

export type PublicEvent = {
  id: string;
  destination: DestinationKey;
  title: string;
  summary: string;
  start: string;
  end: string;
  timeZone: "Europe/London" | "Europe/Dublin";
  kind: EventKind;
  location: string;
  status: "scheduled" | "cancelled";
};

/** Schedules were rechecked against each Luma page's structured data on 12 October 2026. */
export const PUBLIC_EVENTS: readonly PublicEvent[] = [
  {
    id: "tech-spring-week-academy-2026-10-12",
    destination: "techSpringWeekAcademy",
    title: "Tech Spring Week Academy",
    summary:
      "Students already building careers in tech explain what roles involve, how to succeed in projects and which role could fit your strengths.",
    start: "2026-10-12T17:00:00+01:00",
    end: "2026-10-12T18:00:00+01:00",
    timeZone: "Europe/London",
    kind: "academy",
    location: "Online",
    status: "scheduled",
  },
  {
    id: "law-spring-week-academy-2026-10-13",
    destination: "lawSpringWeekAcademy",
    title: "Law Spring Week Academy",
    summary:
      "A student-led look inside the legal world, with real case scenarios to help you decide whether law is the right path.",
    start: "2026-10-13T19:00:00+01:00",
    end: "2026-10-13T20:00:00+01:00",
    timeZone: "Europe/London",
    kind: "academy",
    location: "Online",
    status: "scheduled",
  },
  {
    id: "finance-spring-week-academy-2026-10-18",
    destination: "financeSpringWeekAcademy",
    title: "Finance Spring Week Academy",
    summary:
      "A session run by students with finance experience on how the industry actually operates and what it takes to get in.",
    start: "2026-10-18T19:00:00+01:00",
    end: "2026-10-18T20:00:00+01:00",
    timeZone: "Europe/London",
    kind: "academy",
    location: "Online",
    status: "scheduled",
  },
  {
    id: "ireland-career-conference-2026-10-24",
    destination: "irelandCareerConference2026",
    title: "IHSAAN Ireland Career Conference 2026",
    summary:
      "Muslim students, graduates and professionals from across Ireland meet speakers, professionals and employers through keynotes, industry panels and practical workshops.",
    start: "2026-10-24T11:00:00+01:00",
    end: "2026-10-24T15:00:00+01:00",
    timeZone: "Europe/Dublin",
    kind: "conference",
    location: "TU Dublin, Grangegorman, Dublin 7",
    status: "scheduled",
  },
];
