import { PROGRAMMES, type Photo } from "./site";

/** The programme's own photo, so alt text and dimensions stay in one place. */
function programmePhoto(slug: string): Photo {
  const programme = PROGRAMMES.find((candidate) => candidate.slug === slug);
  if (!programme) throw new Error(`Answer photo is not a programme: ${slug}`);
  return programme.photo;
}

/** The ring for the first figure in `GAP_STATS` (impact.ts): a share out of 100. */
export type RingData = { muslim: number; description: string };

export const DEGREE_RING: RingData = {
  muslim: 20.8,
  description: "20.8% of Muslims aged 16 to 24 hold degrees, above the national average",
};

/** The second and third figures in `GAP_STATS` are relative gaps, so they have no ring. These are their short labels. */
export const GAP_LABELS = ["higher unemployment", "less likely to reach senior roles"] as const;

export type Answer = { title: string; value: string; proof: string; photo: Photo };

/** What IHSAAN does about each figure in `GAP_STATS` (impact.ts), in the same order. */
export const ANSWERS: readonly Answer[] = [
  {
    title: "Get in the room",
    value: "6",
    proof: "Careers Conferences across the UK and Ireland",
    photo: programmePhoto("career-conferences"),
  },
  {
    title: "Land the first role",
    value: "100+",
    proof: "internships secured across 30+ companies",
    photo: programmePhoto("summer-internships"),
  },
  {
    title: "Grow with a mentor",
    value: "150+",
    proof: "verified mentors across 15+ industries",
    photo: programmePhoto("mentorship"),
  },
];
