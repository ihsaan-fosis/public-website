export type VolunteerOpening = {
  slug: string;
  title: string;
  team: string;
  availability: string;
  location: string;
};

/** Fallback roles for the openings board, used when the member platform's `CONVEX_URL` is unset or unreachable. Live roles come from `getVolunteerOpenings` in `src/lib/volunteer-roles.ts`. Each opens the Tally application form in a modal. */
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
  unpaidNote: "We are a volunteer-led organisation, so all positions are unpaid.",
} as const;
