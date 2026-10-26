import { PUBLIC_DESTINATIONS } from "./links";

export const CONTACT_EMAIL = "ihsaan@fosis.org.uk";

export const TAGLINE = "Faith. Excellence. Service.";

export const VISION =
  "We envision a world where every Muslim has the opportunity to fulfil their potential, unlock their dream career, and help build a more ethical society for all.";

export const MISSION =
  "We equip Muslim students with the opportunities and networks to build careers rooted in faith, excellence, and service.";

export type NavLink = { href: string; label: string };

/** Top-level chrome item. Optional `children` render as a dropdown. */
export type NavItem = NavLink & { children?: readonly NavLink[] };

/** Programme detail pages in the Programmes dropdown. Overview stays on the parent link. */
export const PROGRAMME_NAV_LINKS: readonly NavLink[] = [
  { href: "/programmes/career-conferences", label: "Career Conferences" },
  { href: "/programmes/hackathons", label: "Hackathons" },
  { href: "/programmes/insight-events", label: "Insight Events" },
  { href: "/programmes/mentorship", label: "Mentorship" },
  { href: "/programmes/summer-internships", label: "Summer Internship Programme" },
  { href: "/programmes/webinars-workshops", label: "Webinars & Workshops" },
];

export const NAV_LINKS: readonly NavItem[] = [
  { href: "/about", label: "About" },
  {
    href: "/programmes",
    label: "Programmes",
    children: PROGRAMME_NAV_LINKS,
  },
  { href: "/impact", label: "Impact" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const GET_INVOLVED: NavLink = { href: "/get-involved", label: "Get involved" };

/** Kept out of `NAV_LINKS` so the primary row stays readable beside the wordmark and CTAs. */
export const EVENTS_LINK: NavLink = { href: "/events", label: "Events" };

/** Guides stay reachable from the footer; Blog is a top-level header link. */
export const RESOURCES_LINK: NavLink = { href: "/resources", label: "Resources" };

export const MEMBER_PORTAL: NavLink = { href: "https://portal.ihsaan.network/sign-in", label: "Student portal" };

export const MEMBER_PORTAL_SIGNUP: NavLink = {
  href: "https://portal.ihsaan.network/sign-up",
  label: "Start your career journey",
};

export const SOCIAL_LINKS: readonly NavLink[] = (["instagram", "linkedin", "tiktok", "youtube"] as const).map(
  (key) => PUBLIC_DESTINATIONS[key],
);

export const LEGAL_LINKS: readonly NavLink[] = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms and conditions" },
];

export type ActionLink = NavLink & { external?: boolean };

export type Photo = { src: string; alt: string; width: number; height: number };

export type Stat = { value: string; label: string };

export type Programme = { slug: string; title: string; photo: Photo };

export const PROGRAMMES: readonly Programme[] = [
  {
    slug: "career-conferences",
    title: "Career Conferences",
    photo: { src: "/media/career-conferences.webp", alt: "Students at an IHSAAN career conference", width: 1800, height: 1536 },
  },
  {
    slug: "summer-internships",
    title: "Summer Internship Programme",
    photo: { src: "/media/faithful-talent.webp", alt: "Students listening to speakers at an informal IHSAAN session", width: 1800, height: 1114 },
  },
  {
    slug: "insight-events",
    title: "Insight Events",
    photo: { src: "/media/gallery/careers-evening.webp", alt: "Students at employer stands during an IHSAAN careers evening", width: 2000, height: 1126 },
  },
  {
    slug: "webinars-workshops",
    title: "Webinars & Workshops",
    photo: { src: "/media/gallery/startup-talk.webp", alt: "A speaker presenting a startup talk beside an IHSAAN banner", width: 2000, height: 1500 },
  },
  {
    slug: "hackathons",
    title: "Hackathons",
    photo: { src: "/media/hackathon-smiles.webp", alt: "Hackathon participants smiling and giving thumbs up at their table", width: 1280, height: 1600 },
  },
  {
    slug: "mentorship",
    title: "Mentorship",
    photo: { src: "/media/mmm.webp", alt: "My Muslim Mentor stickers on a purple table", width: 1500, height: 2524 },
  },
];

export type Offer = { href: string; title: string; photo: Photo };

export const OFFERS: readonly Offer[] = [
  ...PROGRAMMES.map(({ slug, title, photo }) => ({ href: `/programmes/${slug}`, title, photo })),
  {
    href: MEMBER_PORTAL.href,
    title: "Member Portal",
    photo: { src: "/media/opp-tracker.webp", alt: "Students working together on a laptop", width: 1600, height: 2168 },
  },
];

export type Partner = { name: string; src: string; width: number; height: number };

export type PartnerTier = { name: string; partners: readonly Partner[] };

export const PARTNER_TIERS: readonly PartnerTier[] = [
  {
    name: "Diamond partners",
    partners: [
      { name: "Accenture", src: "/partners/accenture.webp", width: 207, height: 40 },
      { name: "PwC", src: "/partners/PWC.webp", width: 66, height: 50 },
      { name: "Cube Network", src: "/partners/CubeNetwork.webp", width: 132, height: 30 },
      { name: "Wahed", src: "/partners/Wahed.webp", width: 214, height: 40 },
      { name: "Deen Developers", src: "/partners/DeenDeveleopers.webp", width: 100, height: 40 },
      { name: "My Fridays", src: "/partners/My-Fridays.webp", width: 144, height: 34 },
      { name: "Greentech", src: "/partners/Greentech.webp", width: 104, height: 40 },
    ],
  },
  {
    name: "Gold partners",
    partners: [
      { name: "SMBF", src: "/partners/SMBF.webp", width: 178, height: 34 },
      { name: "MIPP", src: "/partners/MIPP.webp", width: 80, height: 50 },
      { name: "MIRE", src: "/partners/MIRE.webp", width: 215, height: 30 },
      { name: "Muslims at Amazon", src: "/partners/MuslimsatAmazon.webp", width: 191, height: 30 },
      { name: "MTF Finance", src: "/partners/MTF-Finance.webp", width: 168, height: 40 },
      { name: "Rail", src: "/partners/Rail.webp", width: 195, height: 34 },
      { name: "Wharf Sisters", src: "/partners/WharfSisters.webp", width: 189, height: 34 },
    ],
  },
];

export const COMMUNITY_PARTNERS: readonly Partner[] = [
  { name: "Association of Muslim Engineers", src: "/partners/AOME.png", width: 400, height: 254 },
  { name: "Emerald", src: "/partners/Emerald.webp", width: 400, height: 152 },
  { name: "Hogan Lovells", src: "/partners/HoganLovells.png", width: 1280, height: 1280 },
  { name: "KPMG", src: "/partners/KPMC.png", width: 399, height: 159 },
  { name: "MC", src: "/partners/MC.webp", width: 800, height: 800 },
];

export type InvolvementRoute = {
  title: string;
  body: string;
  points: readonly string[];
  /** Destinations listed with the route instead of `points` when it has more than one way in. */
  links?: readonly ActionLink[];
  cta: ActionLink;
  photo: Photo;
};

export const INVOLVEMENT_ROUTES: readonly InvolvementRoute[] = [
  {
    title: "Students",
    body: "Join career conferences, hackathons and internship programmes, and use free career guides.",
    points: ["Career guides & resources", "Professional networks", "Faith-conscious support", "Skills workshops"],
    cta: { href: "/programmes", label: "Explore programmes" },
    photo: { src: "/media/career-conferences.webp", alt: "Students at an IHSAAN career conference", width: 1800, height: 1536 },
  },
  {
    title: "Professionals",
    body: "Join the IHSAAN professional network, mentor Muslim students on My Muslim Mentor and stay connected through the alumni network and WhatsApp community.",
    points: [],
    links: [
      { href: PUBLIC_DESTINATIONS.myMuslimMentorSignup.href, label: "Become a mentor on MMM", external: true },
      { href: `${GET_INVOLVED.href}#alumni`, label: "Join the alumni network" },
      { href: PUBLIC_DESTINATIONS.whatsappCommunityForm.href, label: "Join the WhatsApp community", external: true },
    ],
    cta: { href: PUBLIC_DESTINATIONS.professionalNetworkForm.href, label: "Offer your time", external: true },
    photo: { src: "/media/mmm.webp", alt: "My Muslim Mentor stickers on a purple table", width: 1500, height: 2524 },
  },
  {
    title: "Organisations",
    body: "Partner with IHSAAN to host or sponsor programmes, share opportunities and meet Muslim students and graduates.",
    points: ["Employer access", "Faith-aligned roles", "Mentorship network", "Dedicated programme support"],
    cta: { href: "/contact", label: "Partner with us" },
    photo: { src: "/media/impact.webp", alt: "Students networking at an IHSAAN event", width: 2560, height: 1430 },
  },
];

export type InvolvementAudience = "students" | "professionals" | "organisations";

export const INVOLVEMENT_AUDIENCES: readonly { value: InvolvementAudience | "all"; label: string }[] = [
  { value: "all", label: "Everyone" },
  { value: "students", label: "Students" },
  { value: "professionals", label: "Professionals" },
  { value: "organisations", label: "Organisations" },
];

export type InvolvementAction = {
  id: "programmes" | "professional" | "mentor" | "community" | "alumni" | "volunteer" | "partner";
  title: string;
  body: string;
  audiences: readonly InvolvementAudience[];
  cta: ActionLink;
  secondary?: ActionLink;
};

export const INVOLVEMENT_ACTIONS: readonly InvolvementAction[] = [
  {
    id: "programmes",
    title: "Programmes for students",
    body: "Students can join career conferences, hackathons, internships, insight events and skills sessions across the UK and Ireland.",
    audiences: ["students"],
    cta: { href: "/programmes", label: "Explore programmes" },
  },
  {
    id: "professional",
    title: "Professional network",
    body: "Professionals can offer their time by joining the IHSAAN professional network and its sector-specific chats through a short Google Form. The form opens on Google Forms, not on this website.",
    audiences: ["professionals"],
    cta: { href: PUBLIC_DESTINATIONS.professionalNetworkForm.href, label: "Join the professional network", external: true },
  },
  {
    id: "mentor",
    title: "Mentor on My Muslim Mentor",
    body: "Professionals can mentor Muslim students through My Muslim Mentor. Sign up on the My Muslim Mentor website to register as a mentor. Its sign-up and booking happen there, not on this website.",
    audiences: ["professionals"],
    cta: { href: PUBLIC_DESTINATIONS.myMuslimMentorSignup.href, label: "Become a mentor on MMM", external: true },
  },
  {
    id: "community",
    title: "WhatsApp community",
    body: "Apply to join the IHSAAN WhatsApp community through a short Google Form. Submitting the form is a request to join, not an automatic invitation, and admission is handled separately by IHSAAN. The form opens on Google Forms, not on this website.",
    audiences: ["students", "professionals"],
    cta: { href: PUBLIC_DESTINATIONS.whatsappCommunityForm.href, label: "Apply to join the WhatsApp community", external: true },
  },
  {
    id: "alumni",
    title: "Alumni network",
    body: "Alumni who want to stay connected with IHSAAN can get in touch and ask how to take part in the alumni network.",
    audiences: ["professionals"],
    cta: { href: "/contact", label: "Ask about the alumni network" },
  },
  {
    id: "volunteer",
    title: "Volunteer for IHSAAN",
    body: "Volunteer roles with IHSAAN are unpaid. Browse open roles, read each description, and apply on this website.",
    audiences: ["students", "professionals", "organisations"],
    cta: { href: "/volunteer", label: "View volunteer openings" },
  },
  {
    id: "partner",
    title: "Partner with IHSAAN",
    body: "Organisations can host or sponsor programmes, share opportunities and meet Muslim students and graduates through a partnership conversation with the team.",
    audiences: ["organisations"],
    cta: { href: "/contact", label: "Partner with us" },
  },
];

export type FaqItem = { question: string; answer: string };

export const FAQS: readonly FaqItem[] = [
  {
    question: "What is IHSAAN?",
    answer:
      "IHSAAN was founded with a simple but powerful belief: every Muslim student deserves equal access to the mentorship, networks and opportunities needed to build a meaningful career. The word Ihsaan means excellence, striving for the highest standard in everything we do as a form of devotion to God. We work across universities in the UK and Ireland.",
  },
  {
    question: "Who can get involved?",
    answer:
      "Everyone. Students can join our career conferences, hackathons and internship programme; professionals can volunteer or become mentors; and organisations can partner with us.",
  },
  {
    question: "Are your resources free?",
    answer:
      "Yes. All our Career Guides are free to access. New guides are released regularly and shared across our social channels.",
  },
  {
    question: "Where does IHSAAN run its programmes?",
    answer:
      "Across the UK and Ireland. Career conferences are held at universities and venues nationwide, and our hackathons have run in Manchester and Dublin.",
  },
  {
    question: "How can my organisation partner with IHSAAN?",
    answer:
      "Partnership routes include sponsoring or hosting a career conference, providing mentors through our mentorship programmes, sharing internships and graduate roles with our community, and co-delivering workshops, panels or skills sessions.",
  },
];

export const GALLERY: readonly Photo[] = [
  { src: "/media/gallery/conference-panel.webp", alt: "Students in a lecture theatre watching a panel at an IHSAAN career conference", width: 2000, height: 1126 },
  { src: "/media/gallery/hackathon-team.webp", alt: "A hackathon team smiling beside their project on a laptop", width: 2000, height: 1336 },
  { src: "/media/gallery/hackathon-smiles.webp", alt: "Hackathon participants smiling and giving thumbs up at their table", width: 2000, height: 1333 },
  { src: "/media/gallery/employer-stands.webp", alt: "Students meeting employers at the KPMG Network of Women stand", width: 2000, height: 1126 },
  { src: "/media/gallery/startup-talk.webp", alt: "A speaker presenting a startup talk beside an IHSAAN banner", width: 2000, height: 1500 },
  { src: "/media/gallery/hackathon-mentor.webp", alt: "A mentor leaning in to help a team during the hackathon", width: 2000, height: 1333 },
  { src: "/media/gallery/careers-fair.webp", alt: "A student speaking with an employer at a careers fair", width: 1400, height: 2488 },
  { src: "/media/gallery/networking-hall.webp", alt: "Students networking in the hall at an IHSAAN career conference", width: 2560, height: 1442 },
  { src: "/media/gallery/hackathon-table.webp", alt: "Three students coding together at a shared hackathon table", width: 2000, height: 1333 },
  { src: "/media/gallery/manchester-foyer.webp", alt: "Students gathering in a University of Manchester foyer", width: 2000, height: 1126 },
  { src: "/media/gallery/hackathon-focus.webp", alt: "A team of three focused on laptops by the windows", width: 2000, height: 1333 },
  { src: "/media/gallery/student-conversations.webp", alt: "Students talking between conference sessions", width: 2000, height: 1126 },
  { src: "/media/gallery/conference-audience.webp", alt: "An audience listening at an IHSAAN career conference", width: 2560, height: 1706 },
  { src: "/media/gallery/hackathon-discussion.webp", alt: "Students discussing their idea around a laptop", width: 2000, height: 1333 },
  { src: "/media/gallery/careers-evening.webp", alt: "Students at employer stands during an IHSAAN careers evening", width: 2000, height: 1126 },
  { src: "/media/gallery/hackathon-partners.webp", alt: "Participants coding beside a partner organisation banner", width: 2000, height: 1333 },
  { src: "/media/gallery/employer-pitch.webp", alt: "A Redwood Founders representative talking with a student at their stand", width: 2000, height: 1500 },
  { src: "/media/gallery/hackathon-collab.webp", alt: "Two participants reviewing something on a phone together", width: 2000, height: 1333 },
  { src: "/media/gallery/conference-selfie.webp", alt: "Students taking a group selfie at a careers fair", width: 1400, height: 1866 },
  { src: "/media/gallery/hackathon-talk.webp", alt: "Audience watching a partner talk in the heritage hall", width: 2000, height: 1126 },
  { src: "/media/gallery/employer-conversations.webp", alt: "Students in conversation at employer tables", width: 2000, height: 1500 },
  { src: "/media/gallery/careers-fair-hall.webp", alt: "A busy hall of employer stands at an IHSAAN careers fair", width: 1400, height: 1866 },
  { src: "/media/gallery/networking-overhead.webp", alt: "An overhead view of students queuing to meet employers", width: 1400, height: 1866 },
  { src: "/media/gallery/hackathon-hall.webp", alt: "The heritage hall during a hackathon presentation", width: 977, height: 1600 },
  { src: "/media/photo-collage.webp", alt: "A collage of moments from IHSAAN programmes", width: 1400, height: 1050 },
  { src: "/media/career-conference.webp", alt: "Audience at an IHSAAN career conference", width: 2560, height: 1442 },
  { src: "/media/hackathon-smiles.webp", alt: "Hackathon participants smiling and giving thumbs up at their table", width: 1280, height: 1600 },
  { src: "/media/impact.webp", alt: "Students networking at an IHSAAN event", width: 2560, height: 1430 },
  { src: "/media/faithful-talent.webp", alt: "Students listening to speakers at an informal IHSAAN session", width: 1800, height: 1114 },
  { src: "/media/opp-tracker.webp", alt: "Students working together on a laptop", width: 1600, height: 2168 },
  { src: "/media/mmm.webp", alt: "My Muslim Mentor stickers on a purple table", width: 1500, height: 2524 },
  { src: "/media/career-conferences.webp", alt: "Students at an IHSAAN career conference", width: 1800, height: 1536 },
  { src: "/media/impact-wide.webp", alt: "A wide view of an IHSAAN programme", width: 2560, height: 900 },
];
