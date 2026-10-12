import type { Motif, NavLink } from "./site";

/**
 * Partner and community surfaces shown alongside Career Essentials guides.
 * Guide articles themselves live in career-essentials.ts.
 */
export type Resource = {
  id: string;
  title: string;
  body: string;
  motif: Motif;
  cta: NavLink & { external?: boolean };
  related?: NavLink;
};

export const RESOURCES: readonly Resource[] = [
  {
    id: "blog",
    title: "IHSAAN blog",
    body: "Community reflections and writing published on this site, including the Civil Service internship account.",
    motif: "b",
    cta: { href: "/blog", label: "Browse the blog" },
  },
  {
    id: "mentoring",
    title: "Mentoring",
    body: "A mentoring hub is coming soon. Until then, start with My Muslim Mentor or the mentorship programme overview.",
    motif: "c",
    cta: { href: "/mentoring", label: "Open mentoring hub" },
    related: { href: "/programmes/mentorship", label: "About mentorship" },
  },
  {
    id: "haqqathons",
    title: "Haqqathons",
    body: "A Haqqathons hub is coming soon. Until then, open live events on Haqqathons or the hackathons programme overview.",
    motif: "a",
    cta: { href: "/haqqathons", label: "Open Haqqathons hub" },
    related: { href: "/programmes/hackathons", label: "About hackathons" },
  },
];
