import { GALLERY, type Photo } from "./site";

/** A photo already in the gallery, so its alt text and dimensions stay in one place. */
function galleryPhoto(src: string): Photo {
  const photo = GALLERY.find((candidate) => candidate.src === src);
  if (!photo) throw new Error(`Impact page photo is not in GALLERY: ${src}`);
  return photo;
}

export const IMPACT_HERO_IMAGE = "/media/impact.webp";

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

export const GAP_QUOTE = {
  text: "Muslims are excluded, discriminated against, or failed, at all stages of their transition from education to employment.",
  source: "Social Mobility Commission report, 2017",
};

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
    body: "One-to-one mentoring from 140+ verified professionals across 15+ industries.",
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
    proof: "140+ mentors and 100+ internships across 30+ companies",
    photo: galleryPhoto("/media/gallery/employer-conversations.webp"),
  },
  {
    title: "Return",
    body: "Alumni open doors for the next cohort. The IHSAAN Alumni Network turns successful students into mentors, speakers, referrers, and hiring contacts.",
    proof: "Every returning alumnus makes the next student's journey easier",
    photo: galleryPhoto("/media/gallery/student-conversations.webp"),
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
  { label: "Verified mentors across 15+ industries", value: "140+" },
  { label: "Internships secured across 30+ companies", value: "100+" },
  { label: "Careers Conferences across the UK and Ireland", value: "6" },
  { label: "University Islamic societies partnered directly", value: "25" },
];

export const TRACTION_CITIES = "London, Birmingham, Manchester, Leeds, Glasgow and Dublin";

export type Story = { outcome: string; programme: string; quote: string; attribution: string };

export const STORIES: readonly Story[] = [
  {
    outcome: "Trainee solicitor role",
    programme: "Glasgow Careers Conference",
    quote:
      "Whilst speaking to a representative from one of the firms, he had mentioned that his firm currently had postings for a trainee solicitor position… he was able to organise for me an interview for the role, and after 2 rounds of interviews I managed to get the job Alhamdulilah.",
    attribution: "Law student, November 2025",
  },
  {
    outcome: "Spring Week at BNP Paribas",
    programme: "Deutsche Bank Muslim Network Insight Event",
    quote:
      "Ultimately the real impact was feeling that the door to such careers was no longer a fantasy, nor would it involve some sort of compromise… I employed the teachings and insights from that event, and went on to secure a Spring week at BNP Paribas!",
    attribution: "Benjamin Jaderi, November 2025",
  },
  {
    outcome: "Internship secured",
    programme: "Roast My CV webinar",
    quote:
      "The advice I got played a crucial part in helping me secure an internship in the role I was aiming for. I got to have my CV reviewed 1 to 1 by someone already working in the field I wanted to get into… The feedback was very honest and detailed.",
    attribution: "Mahe Chowdury, October 2025",
  },
  {
    outcome: "Civil Service summer internship",
    programme: "Online networking event, mock interview, and Careers Essentials Guide",
    quote:
      "I was able to apply the feedback from the mock interview to my real interview… And Alhamdulillah I have secured a place on the civil service summer internship! I also found IHSAAN’s Careers Essentials resources really useful during the whole application process.",
    attribution: "Anonymous student, February 2026",
  },
];

export type Voice = { name: string; role: string; quote: string };

export const VOICES: readonly Voice[] = [
  {
    name: "Saqhib Ali",
    role: "CEO, ZeroPA. Summer Internship Programme employer partner",
    quote:
      "Ihsaan is a valuable service to the community. This year I was lucky enough to secure two interns through the programme. For graduates and under grads it gives opportunities when it appears none exist and for employers we can access enthusiastic, willing often experienced individuals.",
  },
  {
    name: "Aadam Ul Haq",
    role: "GenAI Engineer, NatWest. MyMuslimMentor mentor since launch",
    quote:
      "Being involved with MyMuslimMentor since it launched has been a really rewarding experience. I’ve had almost 10 mentees reach out to me so far… It creates an easy and meaningful way for people to give back… I’ve been fortunate to see some of the people I’ve mentored go on to secure jobs, although the credit is entirely theirs for putting in the work.",
  },
];

export const VOICES_SUMMARY =
  "Real demand on both sides: 30+ organisations have brought on 100+ interns, and 143 mentors give their time on MyMuslimMentor.";

export type MeasureStage = { name: string; when: string; change: string; measures: readonly string[] };

export const MEASURE_STAGES: readonly MeasureStage[] = [
  {
    name: "Outputs",
    when: "Every programme",
    change: "What we deliver to students",
    measures: [
      "Mentors and mentoring hours",
      "Conferences, webinars, workshops, hackathons, and insight days delivered",
      "Internships secured and alumni network members",
    ],
  },
  {
    name: "Capacity",
    when: "Short term",
    change: "Students gain skills, networks, and awareness",
    measures: [
      "% reporting improved skills",
      "% reporting stronger professional networks",
      "% more aware of roles and pathways",
    ],
  },
  {
    name: "Behaviour",
    when: "Medium term",
    change: "Students act on what they have gained",
    measures: [
      "Applications submitted to competitive roles",
      "New professional connections made",
      "Further IHSAAN programmes taken up",
    ],
  },
  {
    name: "Outcomes",
    when: "Long term",
    change: "Students progress into opportunities",
    measures: [
      "Internship and job offers secured",
      "Progression into leadership roles",
      "Alumni who go on to give back",
    ],
  },
  {
    name: "Impact",
    when: "Vision",
    change: "Every Muslim can unlock their dream career",
    measures: ["Muslim representation in professional and senior roles, tracked against national data"],
  },
];

export const EVIDENCE_SOURCES: readonly { title: string; body: string }[] = [
  { title: "Programme records", body: "Every event, mentor hour, and placement is logged." },
  { title: "IHSAAN impact survey", body: "Students report changes in skills, behaviour, and outcomes." },
  { title: "National data", body: "Benchmarked against ONS and Social Mobility Commission figures." },
];

export const MEASURE_NOTE =
  "We also test the assumptions behind each step, such as students acting on new skills and employers continuing to open routes in.";

export type VisionColumn = { label: string; title: string; points: readonly string[] };

export const VISION_2045_STATEMENT = "By 2045, every Muslim student can reach a career, and each generation lifts the next.";

export const VISION_2045: readonly VisionColumn[] = [
  {
    label: "Proven today",
    title: "2024 to 2026",
    points: [
      "~4,000 students engaged nationwide",
      "143 mentors on MyMuslimMentor",
      "100+ internships across 30+ companies",
      "First paid role: MyMuslimMentor Lead",
      "Engagement tripled in a year",
    ],
  },
  {
    label: "Next 12 months",
    title: "Build the capacity to scale",
    points: [
      "Second paid role: Head of Operations",
      "Reach new cities with conferences and events",
      "Expand and develop the Alumni Network",
      "Track outcomes at every stage",
    ],
  },
  {
    label: "By 2045",
    title: "Every Muslim student can reach a career",
    points: [
      "Every Muslim student in the UK and Ireland has access to guidance, mentorship, and networks",
      "10,000+ interns launched into professional careers",
      "2,000+ mentors giving back",
      "Muslims proportionally represented across leading professions",
    ],
  },
];

export const VISION_2045_NOTE =
  "Designed to compound: as alumni mentor, refer, and give back, each cohort strengthens the next.";

export const IMPACT_PHOTOS = {
  pathway: galleryPhoto("/media/gallery/careers-fair-hall.webp"),
  stories: galleryPhoto("/media/gallery/conference-selfie.webp"),
  voices: galleryPhoto("/media/gallery/employer-stands.webp"),
  closing: galleryPhoto("/media/gallery/careers-evening.webp"),
} as const;
