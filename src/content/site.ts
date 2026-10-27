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

export const MEMBER_PORTAL: NavLink = { href: "https://portal.ihsaan.network/sign-in", label: "Member portal" };

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
    photo: { src: "/media/career-conferences-hd.webp", alt: "Students at an IHSAAN career conference", width: 3840, height: 3275 },
  },
  {
    slug: "summer-internships",
    title: "Summer Internship Programme",
    photo: { src: "/media/faithful-talent-hd.webp", alt: "Students listening to speakers at an informal IHSAAN session", width: 3840, height: 2378 },
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
    photo: { src: "/media/mmm-hd.webp", alt: "My Muslim Mentor stickers on a purple table", width: 2206, height: 3713 },
  },
];

export type Offer = { href: string; title: string; photo: Photo };

export const OFFERS: readonly Offer[] = [
  ...PROGRAMMES.map(({ slug, title, photo }) => ({ href: `/programmes/${slug}`, title, photo })),
  {
    href: MEMBER_PORTAL.href,
    title: "Member Portal",
    photo: { src: "/media/opp-tracker-hd.webp", alt: "Students working together on a laptop", width: 2741, height: 3713 },
  },
];

export type Partner = { name: string; src: string; width: number; height: number };

export type PartnerTier = { name: string; partners: readonly Partner[] };

export const PARTNER_TIERS: readonly PartnerTier[] = [
  {
    name: "Diamond partners",
    partners: [
      { name: "Accenture", src: "/partners/accenture.webp", width: 219, height: 61 },
      { name: "PwC", src: "/partners/PWC.webp", width: 500, height: 245 },
      { name: "Cube Network", src: "/partners/CubeNetwork.webp", width: 225, height: 220 },
      { name: "Wahed", src: "/partners/Wahed.webp", width: 388, height: 70 },
      { name: "Deen Developers", src: "/partners/DeenDeveleopers.webp", width: 311, height: 156 },
      { name: "My Fridays", src: "/partners/My-Fridays.webp", width: 400, height: 103 },
      { name: "Greentech", src: "/partners/Greentech.webp", width: 381, height: 97 },
    ],
  },
  {
    name: "Gold partners",
    partners: [
      { name: "SMBF", src: "/partners/SMBF.webp", width: 360, height: 124 },
      { name: "MIPP", src: "/partners/MIPP.webp", width: 200, height: 200 },
      { name: "MIRE", src: "/partners/MIRE.webp", width: 352, height: 149 },
      { name: "Muslims at Amazon", src: "/partners/MuslimsatAmazon.webp", width: 123, height: 107 },
      { name: "MTF Finance", src: "/partners/MTF-Finance.webp", width: 400, height: 170 },
      { name: "Rail", src: "/partners/Rail.webp", width: 225, height: 225 },
      { name: "Wharf Sisters", src: "/partners/WharfSisters.webp", width: 298, height: 92 },
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
    photo: { src: "/media/career-conferences-hd.webp", alt: "Students at an IHSAAN career conference", width: 3840, height: 3275 },
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
    photo: { src: "/media/mmm-hd.webp", alt: "My Muslim Mentor stickers on a purple table", width: 2206, height: 3713 },
  },
  {
    title: "Organisations",
    body: "Partner with IHSAAN to host or sponsor programmes, share opportunities and meet Muslim students and graduates.",
    points: ["Employer access", "Faith-aligned roles", "Mentorship network", "Dedicated programme support"],
    cta: { href: "/contact", label: "Partner with us" },
    photo: { src: "/media/impact-hd.webp", alt: "Students networking at an IHSAAN event", width: 3840, height: 2145 },
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

export type FaqItem = { question: string; answer: string; cta?: ActionLink };

export const FAQS: readonly FaqItem[] = [
  {
    question: "What is IHSAAN?",
    answer:
      "IHSAAN began with a simple belief: every Muslim student deserves equal access to the mentorship, networks and opportunities needed to build a meaningful career. The word Ihsaan means excellence, and we treat striving for the highest standard as a form of devotion to God. Today we work with students across universities in the UK and Ireland.",
  },
  {
    question: "What is the member portal?",
    answer:
      "The member portal is IHSAAN's digital home for members. Once you have an account, you can browse and sign up for events, connect with mentoring, read member resources and keep your details in one place, rather than filling in separate forms each time. Where they are available, you can also follow opportunities and applications there. This website stays open to everyone, and the portal is where you sign in to take part. To get started, choose Member portal in the menu to sign in, or create an account from our home page.",
    cta: { label: "Open the member portal", href: MEMBER_PORTAL.href, external: true },
  },
  {
    question: "Who can get involved?",
    answer:
      "Whatever your stage, there is a place for you. Students can join our career conferences, hackathons and internship programme. Professionals can mentor students or volunteer their time, and organisations can partner with us to host, sponsor or share opportunities. Our Get involved page walks through each route.",
    cta: { label: "Get involved", href: GET_INVOLVED.href },
  },
  {
    question: "What programmes does IHSAAN run?",
    answer:
      "We run six programmes: Career Conferences, Hackathons, Insight Events, Mentorship, the Summer Internship Programme, and Webinars and Workshops. Together they cover meeting employers, building skills, finding a mentor and gaining real experience, so you can start with whichever fits where you are right now.",
    cta: { label: "Explore programmes", href: "/programmes" },
  },
  {
    question: "Can I get a mentor?",
    answer:
      "Yes. Through My Muslim Mentor we offer 1:1 mentorship with professionals in your field, tailored to your goals. Since launching in June 2025 it has supported 1,307 mentees, with 140+ verified mentors across 15+ industries. If you are a working professional and would like to give back, you can sign up as a mentor there too.",
    cta: { label: "Visit My Muslim Mentor", href: PUBLIC_DESTINATIONS.myMuslimMentor.href, external: true },
  },
  {
    question: "Do you help students find internships?",
    answer:
      "We do. Through the IHSAAN Summer Internship Programme we work with employers who are actively opening internship pathways for Muslim talent, and for 2026 that meant 100+ internships secured across 30+ companies. Our insight events are a good way to get in front of employers too, though attending one does not guarantee an internship or a job offer.",
    cta: { label: "Explore the internship programme", href: "/programmes/summer-internships" },
  },
  {
    question: "Are your resources free?",
    answer:
      "Yes. Every one of our Career Guides is free to read, and we release new ones regularly. We share them on our social channels as they come out, so follow us there to hear first.",
  },
  {
    question: "How can my organisation partner with IHSAAN?",
    answer:
      "There are several ways, and we are happy to talk through what would suit you best. You can sponsor or host a career conference, provide mentors through our mentorship programmes, share internships and graduate roles with our community, or co-deliver workshops, panels and skills sessions. Get in touch through our contact page and we will take it from there.",
    cta: { label: "Partner with us", href: "/contact" },
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
  { src: "/media/gallery/networking-hall.webp", alt: "Students networking in the hall at an IHSAAN career conference", width: 3840, height: 2162 },
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
  { src: "/media/photo-collage-hd.png", alt: "A collage of moments from IHSAAN programmes", width: 1440, height: 1080 },
  { src: "/media/career-conference-hd.webp", alt: "Audience at an IHSAAN career conference", width: 3840, height: 2162 },
  { src: "/media/hackathon-smiles.webp", alt: "Hackathon participants smiling and giving thumbs up at their table", width: 1280, height: 1600 },
  { src: "/media/impact-hd.webp", alt: "Students networking at an IHSAAN event", width: 3840, height: 2145 },
  { src: "/media/faithful-talent-hd.webp", alt: "Students listening to speakers at an informal IHSAAN session", width: 3840, height: 2378 },
  { src: "/media/opp-tracker-hd.webp", alt: "Students working together on a laptop", width: 2741, height: 3713 },
  { src: "/media/mmm-hd.webp", alt: "My Muslim Mentor stickers on a purple table", width: 2206, height: 3713 },
  { src: "/media/career-conferences-hd.webp", alt: "Students at an IHSAAN career conference", width: 3840, height: 3275 },
  { src: "/media/impact-wide.webp", alt: "A wide view of an IHSAAN programme", width: 2560, height: 900 },
];
