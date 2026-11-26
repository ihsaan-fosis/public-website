import { PROGRAMMES, type Photo } from "./site";

/** The programme's own photo, so alt text and dimensions stay in one place. */
function programmePhoto(slug: string): Photo {
  const programme = PROGRAMMES.find((candidate) => candidate.slug === slug);
  if (!programme) throw new Error(`Answer photo is not a programme: ${slug}`);
  return programme.photo;
}

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
