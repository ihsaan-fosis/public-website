import { PROGRAMMES, type Photo } from "./site";

/** The programme's own photo, so alt text and dimensions stay in one place. */
function programmePhoto(slug: string): Photo {
  const programme = PROGRAMMES.find((candidate) => candidate.slug === slug);
  if (!programme) throw new Error(`Answer photo is not a programme: ${slug}`);
  return programme.photo;
}

/** What each ring shows for the matching figure in `GAP_STATS` (impact.ts), as a percentage of 100. `overall` is the benchmark inside the ring. */
export type RingData = { muslim: number; overall?: number; description: string };

export const RINGS: readonly [RingData, RingData, RingData] = [
  {
    muslim: 20.8,
    description: "20.8% of Muslims aged 16 to 24 hold degrees, above the national average",
  },
  {
    muslim: 13,
    overall: 9,
    description: "13% of Muslims aged 20 to 24 are unemployed, against 9% of young people overall",
  },
  {
    muslim: 6,
    overall: 10,
    description: "6% of Muslims reach senior professional roles, against 10% overall",
  },
];

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
    value: "140+",
    proof: "verified mentors across 15+ industries",
    photo: programmePhoto("mentorship"),
  },
];
