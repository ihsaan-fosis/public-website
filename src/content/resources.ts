import type { NavLink } from "./site";

/**
 * Partner and community surfaces shown alongside Career Essentials guides.
 * Guide articles themselves live in career-essentials.ts.
 */
export type Resource = {
  id: string;
  title: string;
  body: string;
  cta: NavLink & { external?: boolean };
};

export const RESOURCES: readonly Resource[] = [
  {
    id: "blog",
    title: "IHSAAN blog",
    body: "Community reflections and writing published on this site, including the Civil Service internship account.",
    cta: { href: "/blog", label: "Browse the blog" },
  },
];
