import { PUBLIC_DESTINATIONS } from "./links";
import type { NavLink } from "./site";

/**
 * Resource-type hub pages under the Resources nav.
 * Full on-site content is still being built; these pages are honest placeholders
 * with working outbound links to the live partner surfaces.
 */
export type ResourceHub = {
  slug: "mentoring" | "haqqathons";
  path: `/${string}`;
  navLabel: string;
  title: string;
  heroTitle: string;
  summary: string;
  body: string;
  image: string;
  programme: NavLink;
  partner: NavLink & { external: true };
};

export const RESOURCE_HUBS: readonly ResourceHub[] = [
  {
    slug: "mentoring",
    path: "/mentoring",
    navLabel: "Mentoring",
    title: "Mentoring",
    heroTitle: "Mentoring.",
    summary:
      "Guidance for Muslim students seeking mentors and professionals ready to give time back. A fuller mentoring hub is on the way.",
    body: "This page will gather mentoring routes, FAQs and how to join as a mentee or mentor. Until then, book through My Muslim Mentor or read the programme overview.",
    image: "/media/mmm.webp",
    programme: { href: "/programmes/mentorship", label: "Mentorship programme" },
    partner: {
      href: PUBLIC_DESTINATIONS.myMuslimMentor.href,
      label: "Visit My Muslim Mentor",
      external: true,
    },
  },
  {
    slug: "haqqathons",
    path: "/haqqathons",
    navLabel: "Haqqathons",
    title: "Haqqathons",
    heroTitle: "Haqqathons.",
    summary:
      "Faith-conscious hackathons where Muslim students build, ship and meet collaborators. Event details and a fuller hub are coming to this site.",
    body: "This page will list upcoming builds, past highlights and how teams join. Until then, use Haqqathons for live events or the hackathons programme page for the overview.",
    image: "/media/haqqathons.webp",
    programme: { href: "/programmes/hackathons", label: "Hackathons programme" },
    partner: {
      href: PUBLIC_DESTINATIONS.haqqathons.href,
      label: "Visit Haqqathons",
      external: true,
    },
  },
];

export function getResourceHub(slug: string): ResourceHub | undefined {
  return RESOURCE_HUBS.find((hub) => hub.slug === slug);
}
