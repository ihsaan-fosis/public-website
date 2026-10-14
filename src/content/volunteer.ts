export type VolunteerOpening = {
  slug: string;
  title: string;
  team: string;
  availability: string;
  location: string;
};

/** Open volunteer roles currently listed on the public openings board. Each opens the Tally application form in a modal. */
export const VOLUNTEER_OPENINGS: readonly VolunteerOpening[] = [
  {
    slug: "general-application",
    title: "General Application",
    team: "General",
    availability: "3-4 hours per week",
    location: "Remote UK / IE",
  },
];

export const VOLUNTEER_APPLICATION_FORM_URL =
  "https://tally.so/embed/XxBvde?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

export const VOLUNTEER_INTRO = {
  positionsIntro:
    "Explore the open positions below, organised by team. Choose a role to read the description and apply.",
  responseNote:
    "Due to the large number of applications we receive, we are unable to respond to everyone individually. If you do not hear back from us within three weeks, it means we have decided to move forward with other candidates. We truly appreciate your interest and the time you took to apply.",
  unpaidNote: "We are a volunteer-led organisation, so all positions are unpaid.",
} as const;
