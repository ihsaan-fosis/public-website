import { GALLERY, type Photo } from "./site";

/** A photo already in the gallery, so its alt text and dimensions stay in one place. */
function galleryPhoto(src: string): Photo {
  const photo = GALLERY.find((candidate) => candidate.src === src);
  if (!photo) throw new Error(`Impact page photo is not in GALLERY: ${src}`);
  return photo;
}

export const IMPACT_HERO_IMAGE = "/media/impact-hd.webp";

export type GapStat = { value: string; label: string; note: string; source: string };

export const GAP_STATEMENT =
  "Young British Muslims attain degrees above the national average, but the pipeline breaks after graduation.";

export const GAP_STATS: readonly GapStat[] = [
  {
    value: "20.8%",
    label: "of Muslims aged 16 to 24 hold degrees",
    note: "Attainment has nearly doubled since 2001 and now exceeds the national average.",
    source: "Muslim Council of Britain, Census analysis",
  },
  {
    value: "44%",
    label: "higher unemployment for young Muslims",
    note: "13% of Muslims aged 20 to 24 are unemployed, vs 9% of young people overall.",
    source: "The Guardian, based on ONS Census 2021 analysis",
  },
  {
    value: "40%",
    label: "less likely to reach senior roles",
    note: "Only 6% of Muslims reach senior professional roles, vs 10% overall.",
    source: "Social Mobility Commission (2017)",
  },
];

export type PathwayStep = { title: string; body: string };

/** One end-to-end pathway, ordered from a student's first question to their first offer. */
export const PATHWAY: readonly PathwayStep[] = [
  {
    title: "Career guides",
    body: "Your step-by-step handbook to applications, interviews, assessment centres, and faith at work.",
  },
  {
    title: "Webinars and workshops",
    body: "Online and in-person bootcamps, workshops, and panels to build skills wherever you are.",
  },
  {
    title: "WhatsApp community",
    body: "Join 2,000+ students and professionals sharing opportunities and advice in industry-specific groups.",
  },
  {
    title: "Conferences and hackathons",
    body: "Network with industry professionals at conferences nationwide, and build ethical solutions at hackathons.",
  },
  {
    title: "Insight events",
    body: "Get in the room with top firms: skills workshops, panels, and networking to open doors.",
  },
  {
    title: "MyMuslimMentor",
    body: "One-to-one mentoring from 150+ verified professionals across 15+ industries.",
  },
  {
    title: "Summer internships",
    body: "Direct placement into exclusive summer internships sourced by IHSAAN for Muslim students.",
  },
];

export type FlywheelStage = { title: string; body: string; proof: string; photo: Photo };

export const FLYWHEEL: readonly FlywheelStage[] = [
  {
    title: "Reach",
    body: "Find Muslim students wherever they are. Conferences, hackathons, webinars, career guides, and WhatsApp communities across the UK and Ireland.",
    proof: "~4,000 unique students engaged to date",
    photo: galleryPhoto("/media/gallery/conference-audience.webp"),
  },
  {
    title: "Equip",
    body: "Networks, skills, and direct placements. MyMuslimMentor, corporate insight events, workshops, and exclusive internships.",
    proof: "150+ mentors and 100+ internships across 30+ companies",
    photo: galleryPhoto("/media/gallery/employer-conversations.webp"),
  },
  {
    title: "Return",
    body: "Alumni open doors for the next cohort. The IHSAAN Alumni Network turns successful students into mentors, speakers, referrers, and hiring contacts.",
    proof: "Every returning alumnus makes the next student's journey easier",
    photo: galleryPhoto("/media/gallery/networking-hall.webp"),
  },
];

export type EngagementYear = { label: string; display: string; count: number };

/** Students engaged at events, by academic year. Counts engagements, so the unique total is lower. */
export const ENGAGEMENT: readonly EngagementYear[] = [
  { label: "2024/25", display: "1,500+", count: 1541 },
  { label: "2025/26", display: "4,600+", count: 4600 },
];

export type TractionStat = { label: string; value: string };

export const TRACTION: readonly TractionStat[] = [
  { label: "Unique students engaged in two years", value: "~4,000" },
  { label: "Mentees on MyMuslimMentor since launching in June 2025", value: "1,307" },
  { label: "Verified mentors across 15+ industries", value: "150+" },
  { label: "Internships secured across 30+ companies", value: "100+" },
  { label: "Careers Conferences across the UK and Ireland", value: "6" },
  { label: "University Islamic societies partnered directly", value: "25" },
];

export const TRACTION_CITIES = "London, Birmingham, Manchester, Leeds, Glasgow and Dublin";

/** One outcome, with the programme page where the student's words are shown in full. */
export type Story = { outcome: string; programme: string; attribution: string; href: string };

export const STORIES: readonly Story[] = [
  {
    outcome: "Trainee solicitor role",
    programme: "Glasgow Careers Conference",
    attribution: "Law student, November 2025",
    href: "/programmes/career-conferences",
  },
  {
    outcome: "Spring Week at BNP Paribas",
    programme: "Bulge bracket bank insight event",
    attribution: "Benjamin Jaderi, November 2025",
    href: "/programmes/insight-events",
  },
  {
    outcome: "Internship secured",
    programme: "Roast My CV webinar",
    attribution: "Mahe Chowdury, October 2025",
    href: "/programmes/webinars-workshops",
  },
  {
    outcome: "Civil Service summer internship",
    programme: "Online networking event, mock interview, and Careers Essentials Guide",
    attribution: "Anonymous student, February 2026",
    href: "/programmes/webinars-workshops",
  },
];

export const VOICES_SUMMARY =
  "Real demand on both sides: 30+ organisations have brought on 100+ interns, and 150+ mentors give their time on MyMuslimMentor.";

export const IMPACT_PHOTOS = {
  pathway: galleryPhoto("/media/gallery/careers-fair-hall.webp"),
  stories: galleryPhoto("/media/gallery/conference-selfie.webp"),
  closing: galleryPhoto("/media/gallery/conference-panel.webp"),
} as const;
