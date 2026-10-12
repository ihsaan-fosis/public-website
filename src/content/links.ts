type Destination = { readonly href: string; readonly label: string };

/**
 * Approved external destinations, each written once so every page that links to it agrees.
 * Deliberately absent until the owners confirm or repair them: the alumni signup (404 at collection),
 * the membership and professional-network forms, the DCU alumni panel (its end time is disputed)
 * and the hidden opportunities tracker.
 */
export const PUBLIC_DESTINATIONS = {
  eventsCalendar: { href: "https://luma.com/calendar/cal-8amaiM2VigRIqjq", label: "IHSAAN events calendar on Luma" },
  myMuslimMentor: { href: "https://mymuslimmentor.com/", label: "My Muslim Mentor" },
  careerGuides: { href: "https://ihsaannetwork.notion.site/careers-essentials", label: "IHSAAN Careers Essentials guides" },
  haqqathons: { href: "https://haqqathons.com", label: "Haqqathons" },
  civilServiceReflection: {
    href: "https://ihsaanbyfosis.notion.site/ihsaan-reflection-civil-service-summer-internship",
    label: "Civil Service summer internship reflection",
  },
  whatsappCommunityForm: {
    href: "https://docs.google.com/forms/d/e/1FAIpQLSehrwaRiPVkVI3UVq23jv4SZBZ540kC2D-PW84OeUIT9FIu6Q/viewform",
    label: "IHSAAN WhatsApp Community form",
  },
  volunteerOpenings: { href: "https://ihsaannetwork.notion.site/openings", label: "IHSAAN volunteer openings" },
  instagram: { href: "https://www.instagram.com/ihsaan.network/", label: "Instagram" },
  linkedin: { href: "https://www.linkedin.com/company/ihsaan-network/", label: "LinkedIn" },
  tiktok: { href: "https://www.tiktok.com/@ihsaan.network", label: "TikTok" },
  youtube: { href: "https://www.youtube.com/@IHSAAN.network", label: "YouTube" },
  lawSpringWeekAcademy: { href: "https://luma.com/7bhqps51", label: "Law Spring Week Academy on Luma" },
  techSpringWeekAcademy: { href: "https://luma.com/3byu6cfc", label: "Tech Spring Week Academy on Luma" },
  financeSpringWeekAcademy: { href: "https://luma.com/kj5ognal", label: "Finance Spring Week Academy on Luma" },
  irelandCareerConference2026: {
    href: "https://luma.com/hafri5tc",
    label: "IHSAAN Ireland Career Conference 2026 on Luma",
  },
} as const satisfies Record<string, Destination>;

export type DestinationKey = keyof typeof PUBLIC_DESTINATIONS;
