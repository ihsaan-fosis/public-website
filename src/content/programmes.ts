import type { Photo, Stat } from "./site";

export type ProgrammeAction = { label: string; href: string; external?: boolean };

export type ProgrammeHighlight = { title: string; body: string };

export type ProgrammeEvent = { date: string; place: string; detail: string };

export type ProgrammePage = {
  slug: string;
  title: string;
  /** One sentence for the programmes index and metadata. */
  summary: string;
  /** Hero headline. */
  headline: string;
  intro: string;
  image: string;
  photo: Photo;
  about: readonly string[];
  stats: readonly Stat[];
  highlightsTitle: string;
  highlights: readonly ProgrammeHighlight[];
  eventsTitle?: string;
  events?: readonly ProgrammeEvent[];
  quote?: { text: string; source: string };
  primary: ProgrammeAction;
  secondary?: ProgrammeAction;
};

const INSTAGRAM = "https://www.instagram.com/ihsaan.network/";

export const PROGRAMME_PAGES: readonly ProgrammePage[] = [
  {
    slug: "career-conferences",
    title: "Career Conferences",
    summary: "Large-scale events connecting Muslim students with leading employers, role models and career pathways.",
    headline: "Meet the employers who want you.",
    intro: "Connecting Muslim students with leading employers, role models and career pathways across the UK and Ireland.",
    image: "/media/career-conference.webp",
    photo: { src: "/media/career-conferences.webp", alt: "Students at an IHSAAN career conference", width: 1800, height: 1536 },
    about: [
      "Our career conferences are the IHSAAN flagship programme: large-scale, professionally organised events that bring Muslim students face to face with employers, industry leaders and successful professionals.",
      "Held at universities and venues across the UK and Ireland, they give students the chance to explore career paths, attend skills workshops and build the networks that will shape their futures.",
    ],
    stats: [],
    highlightsTitle: "What to expect",
    highlights: [
      { title: "Keynote talks", body: "Professionals across finance, law, technology, healthcare, consulting and more." },
      {
        title: "Employer exhibition stands",
        body: "Discover roles, internships and graduate schemes directly from employers.",
      },
      {
        title: "Panel discussions",
        body: "Insights on navigating faith and career, social mobility and different industries.",
      },
      { title: "Practical workshops", body: "CVs, interviews, networking, personal branding and other career skills." },
      {
        title: "Networking sessions",
        body: "Meet professionals who understand the unique journey of Muslim graduates.",
      },
    ],
    eventsTitle: "Conference signups",
    events: [
      { date: "15 Oct 2024", place: "Birmingham", detail: "286 signups" },
      { date: "6 Nov 2024", place: "London", detail: "458 signups" },
      { date: "5 Dec 2024", place: "Manchester", detail: "183 signups" },
      { date: "30 Oct 2025", place: "Dublin", detail: "150 signups" },
      { date: "27 Nov 2025", place: "Glasgow", detail: "164 signups" },
      { date: "3 Dec 2025", place: "Birmingham", detail: "100 signups" },
      { date: "10 Dec 2025", place: "London", detail: "502 signups" },
      { date: "3 Feb 2026", place: "Leeds", detail: "143 signups" },
      { date: "26 Mar 2026", place: "Manchester", detail: "172 signups" },
    ],
    primary: { label: "View upcoming events", href: "https://luma.com/calendar/cal-8amaiM2VigRIqjq", external: true },
    secondary: { label: "Host or sponsor a conference", href: "/contact" },
  },
  {
    slug: "faithful-talent",
    title: "Faithful Talent",
    summary: "The IHSAAN Summer Internship Programme, connecting Muslim students to faith-aligned employers.",
    headline: "Internships built with you in mind.",
    intro:
      "Not every opportunity is built with Muslim students in mind. That is why we built the IHSAAN Summer Internship Programme for 2026.",
    image: "/media/faithful-talent.webp",
    photo: { src: "/media/faithful-talent.webp", alt: "Faithful Talent interns at an IHSAAN session", width: 1800, height: 1114 },
    about: [
      "Faithful Talent is our Summer Internship Programme: faith-aligned opportunities across a range of industries, connecting Muslim students to companies where they can grow without compromising their values.",
    ],
    stats: [],
    highlightsTitle: "The 2026 programme",
    highlights: [
      {
        title: "Employers",
        body: "Students were introduced to employers actively opening internship pathways for Muslim talent.",
      },
      {
        title: "Roles",
        body: "The programme brought together opportunities across a range of industries, disciplines and career interests.",
      },
      {
        title: "Placements",
        body: "Internship places gave students a clearer route into experience that matched both ambition and values.",
      },
    ],
    primary: { label: "Partner with Faithful Talent", href: "/contact" },
    secondary: { label: "Get involved", href: "/ticket" },
  },
  {
    slug: "hackathons",
    title: "Hackathons",
    summary: "Weekend hackathons where students build solutions to real community problems.",
    headline: "Build with purpose.",
    intro: "Weekend hackathons for students who want their skills to solve real community problems.",
    image: "/media/haqqathons.webp",
    photo: { src: "/media/haqqathons.webp", alt: "Participants building at an IHSAAN hackathon", width: 1800, height: 1646 },
    about: [
      "A hackathon is a focused sprint where teams turn real-world problems into working ideas. Over a weekend, participants form teams, learn from mentors, prototype a solution and pitch it to partners who can help take it further.",
    ],
    stats: [],
    highlightsTitle: "How it works",
    highlights: [
      { title: "Form a team", body: "Students work in teams to prototype practical solutions for real community challenges." },
      { title: "Learn from mentors", body: "Mentors support participants from early ideas through to final pitches." },
      { title: "Pitch to partners", body: "Teams present to partners who can help take the strongest ideas further." },
    ],
    eventsTitle: "Past events",
    events: [
      {
        date: "2026",
        place: "British Muslim Heritage Centre, Manchester",
        detail: "90+ participants. Collaborated with 5 partner organisations including AFH, ZeroPa, Redwood, Medology and the local council.",
      },
      {
        date: "2026",
        place: "Dublin",
        detail: "35+ participants. Expanded the IHSAAN hackathon programme in Ireland.",
      },
    ],
    quote: {
      text: "The hackathon was an incredible experience. I learned so much from the people around me, got hands on experience with the latest AI tools and loved seeing participants build solutions to real world problems.",
      source: "Attendee, Dublin Hackathon, 2026",
    },
    primary: { label: "See upcoming events", href: "https://luma.com/calendar/cal-8amaiM2VigRIqjq", external: true },
    secondary: { label: "Become a partner", href: "/contact" },
  },
  {
    slug: "mentorship",
    title: "Mentorship",
    summary: "My Muslim Mentor pairs students with professionals in their field for 1:1 mentorship.",
    headline: "A mentor who understands your journey.",
    intro: "My Muslim Mentor offers 1:1 mentorship with professionals in your field, tailored to your goals.",
    image: "/media/mmm.webp",
    photo: { src: "/media/mmm.webp", alt: "My Muslim Mentor stickers on a purple table", width: 1500, height: 2524 },
    about: [
      "Our mentorship programmes connect working professionals with Muslim students who are navigating their career journeys.",
      "Professionals share their experience, open doors and help shape the next generation of leaders. Students get guidance from someone who has been where they want to go.",
    ],
    stats: [],
    highlightsTitle: "Who it is for",
    highlights: [
      {
        title: "Students and graduates",
        body: "Get 1:1 mentorship with professionals in your field, tailored to your goals.",
      },
      {
        title: "Working professionals",
        body: "Share your experience, mentor emerging Muslim talent and help students navigate their careers.",
      },
    ],
    primary: { label: "Visit My Muslim Mentor", href: "https://mymuslimmentor.com/", external: true },
    secondary: { label: "Become a mentor", href: "/contact" },
  },
  {
    slug: "career-guides",
    title: "Career Guides",
    summary: "Free, step-by-step guides written for Muslim students navigating the UK job market.",
    headline: "The role you want, step by step.",
    intro: "Practical, step-by-step resources to help you land the role you want.",
    image: "/media/career-guides.webp",
    photo: { src: "/media/career-guides.webp", alt: "A board of IHSAAN career guides", width: 1800, height: 1748 },
    about: [
      "Our Career Guides are free, in-depth resources written specifically for Muslim students navigating the UK job market. Whether you are writing your first CV, preparing for an assessment centre or deciding between career paths, these guides give you the practical knowledge and confidence to take the next step.",
      "All our guides are free to access. New guides are released regularly and shared across our social media channels.",
    ],
    stats: [],
    highlightsTitle: "Topics covered",
    highlights: [
      { title: "CVs and cover letters", body: "How to stand out to recruiters." },
      { title: "Interview preparation", body: "Competency-based, behavioural and technical interview tips." },
      { title: "Assessment centres", body: "What to expect and how to prepare." },
      { title: "Networking", body: "Building professional relationships authentically." },
      { title: "Industry overviews", body: "Breaking into finance, law, tech, consulting and the public sector." },
      { title: "Faith at work", body: "Practical advice on prayer, dress and workplace culture." },
    ],
    primary: { label: "Access the guides", href: "https://ihsaannetwork.notion.site/careers-essentials", external: true },
    secondary: { label: "Follow for new guides", href: INSTAGRAM, external: true },
  },
];

export function getProgrammePage(slug: string): ProgrammePage | undefined {
  return PROGRAMME_PAGES.find((page) => page.slug === slug);
}
