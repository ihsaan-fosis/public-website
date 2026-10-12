import { PUBLIC_DESTINATIONS } from "./links";
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
    id: "my-muslim-mentor",
    title: "My Muslim Mentor",
    body: "Book time with a mentor through My Muslim Mentor, the mentoring surface IHSAAN points students toward.",
    motif: "c",
    cta: {
      href: PUBLIC_DESTINATIONS.myMuslimMentor.href,
      label: "Visit My Muslim Mentor",
      external: true,
    },
    related: { href: "/programmes/mentorship", label: "About mentorship" },
  },
  {
    id: "haqqathons",
    title: "Haqqathons",
    body: "Faith-conscious hackathons where Muslim students build, ship and meet collaborators. Event details live on Haqqathons.",
    motif: "a",
    cta: { href: PUBLIC_DESTINATIONS.haqqathons.href, label: "Visit Haqqathons", external: true },
    related: { href: "/programmes/hackathons", label: "About hackathons" },
  },
];
