import { PUBLIC_DESTINATIONS } from "./links";
import { GET_INVOLVED, type Photo, type Stat } from "./site";

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
  relatedLinks?: readonly ProgrammeAction[];
};

export const PROGRAMME_PAGES: readonly ProgrammePage[] = [
  {
    slug: "career-conferences",
    title: "Career Conferences",
    summary: "Large-scale events connecting Muslim students with leading employers, role models and career pathways.",
    headline: "Meet the employers who want you.",
    intro: "Connecting Muslim students with leading employers, role models and career pathways across the UK and Ireland.",
    image: "/media/career-conference-hd.webp",
    photo: { src: "/media/career-conferences-hd.webp", alt: "Students at an IHSAAN career conference", width: 3840, height: 3275 },
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
    primary: { label: "View upcoming events", href: PUBLIC_DESTINATIONS.eventsCalendar.href, external: true },
    secondary: { label: "Host or sponsor a conference", href: "/contact" },
    relatedLinks: [{ label: "See scheduled IHSAAN events", href: "/events" }],
  },
  {
    slug: "summer-internships",
    title: "Summer Internship Programme",
    summary: "Exclusive summer internships sourced by IHSAAN for Muslim students.",
    headline: "Internships built with you in mind.",
    intro:
      "Not every opportunity is built with Muslim students in mind. That is why we built the IHSAAN Summer Internship Programme for 2026.",
    image: "/media/faithful-talent-hd.webp",
    photo: {
      src: "/media/faithful-talent-hd.webp",
      alt: "Students listening to speakers at an informal IHSAAN session",
      width: 3840,
      height: 2378,
    },
    about: [
      "The IHSAAN Summer Internship Programme offers faith-aligned opportunities across a range of industries, connecting Muslim students to companies where they can grow without compromising their values.",
    ],
    stats: [
      { value: "100+", label: "Internships secured" },
      { value: "30+", label: "Companies" },
    ],
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
    primary: { label: "Partner with the programme", href: "/contact" },
    secondary: { label: "Get involved", href: GET_INVOLVED.href },
  },
  {
    slug: "insight-events",
    title: "Insight Events",
    summary: "Skills workshops, panels and networking that put Muslim students in the room with leading employers.",
    headline: "Get in the room.",
    intro: "Insight events put Muslim students in front of leading employers for skills workshops, panels and networking.",
    image: "/media/gallery/careers-evening.webp",
    photo: {
      src: "/media/gallery/careers-evening.webp",
      alt: "Students at employer stands during an IHSAAN careers evening",
      width: 2000,
      height: 1126,
    },
    about: [
      "Insight Events are corporate events run by IHSAAN. They give students a closer look at leading employers through skills workshops, panels and networking.",
      "Events vary by employer and year, and attending one does not guarantee an internship or a job offer.",
    ],
    stats: [],
    highlightsTitle: "Who takes part",
    highlights: [
      {
        title: "Bulge bracket investment banks",
        body: "An example of the organisations that host or take part in our insight events.",
      },
      {
        title: "Big Four firms",
        body: "An example of the organisations that host or take part in our insight events.",
      },
      {
        title: "The FCA",
        body: "An example of the organisations that host or take part in our insight events.",
      },
    ],
    primary: { label: "See upcoming events", href: "/events" },
    secondary: { label: "Partner with us", href: "/contact" },
  },
  {
    slug: "webinars-workshops",
    title: "Webinars & Workshops",
    summary: "Online panels, speaker events, bootcamps and the Roast My series for CVs, interviews and assessment centres.",
    headline: "Practise before it counts.",
    intro: "Online and in-person sessions that build the skills students need for applications, interviews and assessment centres.",
    image: "/media/gallery/startup-talk.webp",
    photo: {
      src: "/media/gallery/startup-talk.webp",
      alt: "A speaker presenting a startup talk beside an IHSAAN banner",
      width: 2000,
      height: 1500,
    },
    about: [
      "Webinars & Workshops brings together the skills-building sessions IHSAAN runs through the year: online panels, online speaker events, bootcamps and the Roast My series.",
      "Our summer bootcamps and Spring Week Academy sit under this umbrella, alongside other initiatives.",
    ],
    stats: [],
    highlightsTitle: "What we run",
    highlights: [
      {
        title: "Roast My CV",
        body: "A breakout-room session where someone reviews your CV.",
      },
      {
        title: "Roast My Interview",
        body: "Interview practice, which may include a mock interview.",
      },
      {
        title: "Roast My Assessment Centre",
        body: "A mock assessment centre in a team, followed by a presentation and feedback.",
      },
      {
        title: "Online panels and speaker events",
        body: "Professionals share their industries and career paths with students online.",
      },
      {
        title: "Bootcamps",
        body: "Skills-focused bootcamps, including our summer bootcamps.",
      },
    ],
    primary: { label: "See upcoming events", href: "/events" },
    secondary: { label: "Get involved", href: GET_INVOLVED.href },
  },
  {
    slug: "hackathons",
    title: "Hackathons",
    summary: "Weekend hackathons where students build solutions to real community problems.",
    headline: "Build with purpose.",
    intro: "Weekend hackathons for students who want their skills to solve real community problems.",
    image: "/media/hackathon-build-wide.webp",
    photo: {
      src: "/media/hackathon-smiles.webp",
      alt: "Hackathon participants smiling and giving thumbs up at their table",
      width: 1280,
      height: 1600,
    },
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
    primary: { label: "See upcoming events", href: PUBLIC_DESTINATIONS.eventsCalendar.href, external: true },
    secondary: { label: "Become a partner", href: "/contact" },
  },
  {
    slug: "mentorship",
    title: "Mentorship",
    summary: "My Muslim Mentor pairs students with professionals in their field for 1:1 mentorship.",
    headline: "A mentor who understands your journey.",
    intro: "My Muslim Mentor offers 1:1 mentorship with professionals in your field, tailored to your goals.",
    image: "/media/mmm-hd.webp",
    photo: { src: "/media/mmm-hd.webp", alt: "My Muslim Mentor stickers on a purple table", width: 2206, height: 3713 },
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
    primary: { label: "Visit My Muslim Mentor", href: PUBLIC_DESTINATIONS.myMuslimMentor.href, external: true },
    secondary: { label: "Become a mentor", href: PUBLIC_DESTINATIONS.myMuslimMentorSignup.href, external: true },
  },
];

export function getProgrammePage(slug: string): ProgrammePage | undefined {
  return PROGRAMME_PAGES.find((page) => page.slug === slug);
}
