export const CONTACT_EMAIL = "ihsaan@fosis.org.uk";

export const MISSION =
  "We equip Muslim students across the UK and Ireland with mentorship, networks, and career pathways.";

export const TAGLINE =
  "IHSAAN empowers Muslim students with opportunities, mentorship, and networks for God-conscious careers.";

export type NavLink = { href: string; label: string };

export const NAV_LINKS: readonly NavLink[] = [
  { href: "/about", label: "Our story" },
  { href: "/programmes", label: "Programmes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const GET_INVOLVED: NavLink = { href: "/ticket", label: "Get involved" };

export const SOCIAL_LINKS: readonly NavLink[] = [
  { href: "https://www.instagram.com/ihsaan.network/", label: "Instagram" },
  { href: "https://www.linkedin.com/company/ihsaan-network/", label: "LinkedIn" },
];

export const LEGAL_LINKS: readonly NavLink[] = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms and conditions" },
];

export type Photo = { src: string; alt: string; width: number; height: number };

export type Stat = { value: string; label: string };

export const STATS: readonly Stat[] = [
  { value: "500+", label: "Conference signups" },
  { value: "50,000", label: "Hackathon participants" },
  { value: "200", label: "Programmes & attendees" },
];


export const FACTS: readonly Stat[] = [
  ...STATS,
  { value: "Free", label: "Career guides" },
  { value: "Weekly", label: "Opportunities Tracker updates" },
  { value: "UK & IE", label: "Where we work" },
];

export type Programme = { slug: string; title: string; eyebrow: string; photo: Photo };

export const PROGRAMMES: readonly Programme[] = [
  {
    slug: "career-conferences",
    title: "Career Conferences",
    eyebrow: "Flagship events",
    photo: { src: "/media/career-conferences.webp", alt: "Students at an IHSAAN career conference", width: 1800, height: 1536 },
  },
  {
    slug: "faithful-talent",
    title: "Faithful Talent",
    eyebrow: "Internships",
    photo: { src: "/media/faithful-talent.webp", alt: "Faithful Talent interns at an IHSAAN session", width: 1800, height: 1114 },
  },
  {
    slug: "hackathons",
    title: "Hackathons",
    eyebrow: "Build with purpose",
    photo: { src: "/media/haqqathons.webp", alt: "Participants building at an IHSAAN hackathon", width: 1800, height: 1646 },
  },
  {
    slug: "mentorship",
    title: "Mentorship",
    eyebrow: "1:1 mentors",
    photo: { src: "/media/mmm.webp", alt: "My Muslim Mentor stickers on a purple table", width: 1500, height: 2524 },
  },
  {
    slug: "opportunities-tracker",
    title: "Opportunities",
    eyebrow: "Jobs & placements",
    photo: { src: "/media/opp-tracker.webp", alt: "Students working together on a laptop", width: 1600, height: 2168 },
  },
  {
    slug: "career-guides",
    title: "Career Guides",
    eyebrow: "Resources",
    photo: { src: "/media/career-guides.webp", alt: "A board of IHSAAN career guides", width: 1800, height: 1748 },
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

export type Motif = "a" | "b" | "c";

export type InvolvementRoute = {
  title: string;
  body: string;
  points: readonly string[];
  motif: Motif;
  cta: NavLink;
  photo: Photo;
};

export const INVOLVEMENT_ROUTES: readonly InvolvementRoute[] = [
  {
    title: "Students",
    body: "Join career conferences, hackathons and internship programmes, and use free career guides and opportunities.",
    points: ["Career guides & resources", "Professional networks", "Faith-conscious support", "Skills workshops"],
    motif: "a",
    cta: { href: "/programmes", label: "Explore programmes" },
    photo: { src: "/media/career-conferences.webp", alt: "Students at an IHSAAN career conference", width: 1800, height: 1536 },
  },
  {
    title: "Professionals",
    body: "Volunteer your experience, mentor emerging Muslim talent or contribute as a speaker and role model.",
    points: ["Mentor emerging talent", "Speak at programmes", "Volunteer your experience"],
    motif: "b",
    cta: { href: "/contact", label: "Offer your time" },
    photo: { src: "/media/mmm.webp", alt: "My Muslim Mentor stickers on a purple table", width: 1500, height: 2524 },
  },
  {
    title: "Organisations",
    body: "Partner with IHSAAN to host or sponsor programmes, share opportunities and connect with faith-driven talent.",
    points: ["Employer access", "Faith-aligned roles", "Mentorship network", "Dedicated programme support"],
    motif: "c",
    cta: { href: "/contact", label: "Partner with us" },
    photo: { src: "/media/impact.webp", alt: "Students networking at an IHSAAN event", width: 2560, height: 1430 },
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
      "Yes. All our Career Guides are free to access, and the Opportunities Tracker is free to browse. New guides are released regularly and shared across our social channels.",
  },
  {
    question: "How often is the Opportunities Tracker updated?",
    answer:
      "Our team manually curates and verifies every listing, prioritising quality over quantity. The tracker is updated weekly and shared across our social media channels.",
  },
  {
    question: "Where does IHSAAN run its programmes?",
    answer:
      "Across the UK and Ireland. Career conferences are held at universities and venues nationwide, and our hackathons have run in multiple cities with 340+ participants across four events.",
  },
  {
    question: "How can my organisation partner with IHSAAN?",
    answer:
      "Partnership routes include sponsoring or hosting a career conference, providing mentors through our mentorship programmes, sharing internships and graduate roles via the Opportunities Tracker, and co-delivering workshops, panels or skills sessions.",
  },
];

export const GALLERY: readonly Photo[] = [
  { src: "/media/gallery/conference-panel.webp", alt: "Students in a lecture theatre watching a panel at an IHSAAN career conference", width: 2000, height: 1126 },
  { src: "/media/gallery/hackathon-team.webp", alt: "A hackathon team smiling beside their project on a laptop", width: 2000, height: 1336 },
  { src: "/media/gallery/employer-stands.webp", alt: "Students meeting employers at the KPMG Network of Women stand", width: 2000, height: 1126 },
  { src: "/media/gallery/startup-talk.webp", alt: "A speaker presenting a startup talk beside an IHSAAN banner", width: 2000, height: 1500 },
  { src: "/media/gallery/careers-fair.webp", alt: "A student speaking with an employer at a careers fair", width: 1400, height: 2488 },
  { src: "/media/gallery/networking-hall.webp", alt: "Students networking in the hall at an IHSAAN career conference", width: 2560, height: 1442 },
  { src: "/media/gallery/hackathon-laptop.webp", alt: "A hackathon participant working on a laptop", width: 2000, height: 1336 },
  { src: "/media/gallery/manchester-foyer.webp", alt: "Students gathering in a University of Manchester foyer", width: 2000, height: 1126 },
  { src: "/media/gallery/student-conversations.webp", alt: "Students talking between conference sessions", width: 2000, height: 1126 },
  { src: "/media/gallery/conference-audience.webp", alt: "An audience listening at an IHSAAN career conference", width: 2560, height: 1706 },
  { src: "/media/gallery/hackathon-coding.webp", alt: "Participants coding on laptops at an IHSAAN hackathon", width: 2000, height: 1334 },
  { src: "/media/gallery/careers-evening.webp", alt: "Students at employer stands during an IHSAAN careers evening", width: 2000, height: 1126 },
  { src: "/media/gallery/employer-pitch.webp", alt: "A Redwood Founders representative talking with a student at their stand", width: 2000, height: 1500 },
  { src: "/media/gallery/conference-selfie.webp", alt: "Students taking a group selfie at a careers fair", width: 1400, height: 1866 },
  { src: "/media/gallery/employer-conversations.webp", alt: "Students in conversation at employer tables", width: 2000, height: 1500 },
  { src: "/media/gallery/careers-fair-hall.webp", alt: "A busy hall of employer stands at an IHSAAN careers fair", width: 1400, height: 1866 },
  { src: "/media/gallery/networking-overhead.webp", alt: "An overhead view of students queuing to meet employers", width: 1400, height: 1866 },
  { src: "/media/photo-collage.webp", alt: "A collage of moments from IHSAAN programmes", width: 1400, height: 1050 },
  { src: "/media/career-conference.webp", alt: "Audience at an IHSAAN career conference", width: 2560, height: 1442 },
  { src: "/media/haqqathons.webp", alt: "Participants building at an IHSAAN hackathon", width: 1800, height: 1646 },
  { src: "/media/impact.webp", alt: "Students networking at an IHSAAN event", width: 2560, height: 1430 },
  { src: "/media/faithful-talent.webp", alt: "Faithful Talent interns at an IHSAAN session", width: 1800, height: 1114 },
  { src: "/media/opp-tracker.webp", alt: "Students working together on a laptop", width: 1600, height: 2168 },
  { src: "/media/mmm.webp", alt: "My Muslim Mentor stickers on a purple table", width: 1500, height: 2524 },
  { src: "/media/career-conferences.webp", alt: "Students at an IHSAAN career conference", width: 1800, height: 1536 },
  { src: "/media/impact-wide.webp", alt: "A wide view of an IHSAAN programme", width: 2560, height: 900 },
];
