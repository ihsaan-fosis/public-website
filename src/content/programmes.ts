import { PUBLIC_DESTINATIONS } from "./links";
import { GET_INVOLVED, type CarouselPartner, type Photo, type Stat } from "./site";
import { TESTIMONIALS, type Testimonial } from "./testimonials";

export type ProgrammeAction = { label: string; href: string; external?: boolean };

export type ProgrammeHighlight = {
  title: string;
  body: string;
  /** A gallery photograph set beside the highlight. */
  image?: string;
};

/** A person and what they do, for the mentors a programme page names. */
export type ProgrammePerson = { name: string; role: string };

export type ProgrammeEvent = {
  date: string;
  place: string;
  detail: string;
  /** A headline number for the event, shown large beside it. */
  figure?: { value: string; label: string };
};

export type ProgrammePage = {
  slug: string;
  title: string;
  /** One sentence for the programmes index and metadata. */
  summary: string;
  /** A longer search description, where the summary is too short for one. */
  description?: string;
  /** Hero headline. */
  headline: string;
  intro: string;
  /** The hero photograph, also the page's link-preview image. */
  image: Photo;
  /** The photograph behind the closing call to action, which no other page repeats. */
  closingImage: string;
  photo: Photo;
  /** A photograph set beside the about text, for a page with no `stats` to put there. */
  aboutPhoto?: Photo;
  about: readonly string[];
  stats: readonly Stat[];
  /** Where a figure in `stats` comes from, set small beneath the list. */
  statsNote?: string;
  highlightsTitle: string;
  highlights: readonly ProgrammeHighlight[];
  eventsTitle?: string;
  events?: readonly ProgrammeEvent[];
  /** Real people's words about this programme, each with a name or an anonymous label, shown in this order. */
  quotes?: readonly Testimonial[];
  examplesTitle?: string;
  /** Named examples, such as mentors on the platform, shown as an unboxed list. */
  examples?: readonly ProgrammePerson[];
  partnersTitle?: string;
  partners?: readonly CarouselPartner[];
  primary: ProgrammeAction;
  secondary?: ProgrammeAction;
  /** Show the conference signups map, which reads the events below. */
  conferenceMap?: boolean;
  /** Invite visitors to join the member portal, where this programme's opportunities are released. */
  portalInvite?: { title: string; body: string; label: string };
};

export const PROGRAMME_PAGES: readonly ProgrammePage[] = [
  {
    slug: "career-conferences",
    title: "Career Conferences",
    summary: "Large-scale events connecting Muslim students with leading employers, role models and career pathways.",
    headline: "Meet the employers who want you.",
    intro: "Connecting Muslim students with leading employers, role models and career pathways across the UK and Ireland.",
    image: { src: "/media/career-conferences-hd.webp", alt: "Students at an IHSAAN career conference", width: 3840, height: 3275 },
    closingImage: "/media/gallery/careers-fair-hall.webp",
    photo: { src: "/media/gallery/conference-hall-wide.webp", alt: "A lecture theatre of students at an IHSAAN career conference", width: 1928, height: 2560 },
    about: [
      "Our career conferences are the IHSAAN flagship programme: large-scale, professionally organised events that bring Muslim students face to face with employers, industry leaders and successful professionals.",
      "Held at universities and venues across the UK and Ireland, they give students the chance to explore career paths, attend skills workshops and build the networks that will shape their futures.",
    ],
    stats: [],
    conferenceMap: true,
    highlightsTitle: "What to expect",
    highlights: [
      {
        title: "Keynote talks",
        body: "Inspiring professionals at the top of their fields share how they built successful careers and what ihsaan looks like at work.",
        image: "/media/gallery/conference-audience.webp",
      },
      {
        title: "Exhibition stalls",
        body: "Three kinds of stall: employers such as Muslim businesses, charities and SMEs; professional networks, including firm Muslim networks; and industry professionals sharing their own experience of a sector.",
        image: "/media/gallery/conference-stalls-hall.webp",
      },
      {
        title: "Panel discussions",
        body: "Professionals talk about ihsaan in the workplace and what it takes to reach success in your career.",
        image: "/media/gallery/conference-lecture-panel.webp",
      },
      {
        title: "Practical workshops",
        body: "Often specific to an industry, such as accounting, tech or law, covering CVs, interviews, networking and personal branding.",
        image: "/media/gallery/conference-workshop-brief.webp",
      },
      {
        title: "Networking sessions",
        body: "Meet professionals who are working in the roles you want to reach, and ask how they got there.",
        image: "/media/gallery/conference-hall-networking.webp",
      },
    ],
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
  },
  {
    slug: "summer-internships",
    title: "Summer Internship Programme",
    summary: "Exclusive summer internships sourced by IHSAAN for Muslim students.",
    description:
      "IHSAAN's Summer Internship Programme connects Muslim students with faith-aligned internships. For 2026 it secured 100+ internships across 30+ companies.",
    headline: "Internships built with you in mind.",
    intro:
      "Not every opportunity is built with Muslim students in mind. That is why we built the IHSAAN Summer Internship Programme for 2026.",
    image: { src: "/media/gallery/employer-stands.webp", alt: "Employer stands and students at an IHSAAN careers fair", width: 2000, height: 1126 },
    closingImage: "/media/gallery/students-studying.webp",
    photo: {
      src: "/media/gallery/students-at-work.webp",
      alt: "Students working together at an IHSAAN programme session",
      width: 2560,
      height: 1707,
    },
    about: [
      "IHSAAN helped create these internships with the firms, and the places were exclusive to IHSAAN's students. They were built to be faith-aligned and span a range of industries, so students can grow without compromising their values.",
    ],
    stats: [
      { value: "100+", label: "Internships secured" },
      { value: "30+", label: "Companies" },
      { value: "78%", label: "Would not have got their internship without the programme" },
    ],
    statsNote: "Source: IHSAAN Summer Internship Programme survey.",
    highlightsTitle: "The 2026 programme",
    highlights: [
      {
        title: "Employers",
        body: "IHSAAN worked with employers to open internship places that were exclusive to our students.",
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
    quotes: [TESTIMONIALS.saqhib],
    primary: { label: "Partner with the programme", href: "/contact" },
    secondary: { label: "Get started", href: GET_INVOLVED.href },
  },
  {
    slug: "insight-events",
    title: "Insight Events",
    summary: "Skills workshops, panels and networking that put Muslim students in the room with leading employers.",
    headline: "Get in the room.",
    intro: "Insight events put Muslim students in front of leading employers for skills workshops, panels and networking.",
    image: { src: "/media/gallery/insight-event-presenting.webp", alt: "An IHSAAN speaker presenting to students seated at round tables at an employer insight event", width: 2000, height: 1125 },
    closingImage: "/media/gallery/insight-event-audience.webp",
    photo: {
      src: "/media/gallery/insight-event-panel-room.webp",
      alt: "Students gathered around tables listening to an employer panel at an insight event",
      width: 1500,
      height: 2000,
    },
    aboutPhoto: {
      src: "/media/gallery/insight-event-panel.webp",
      alt: "A panel of four employer professionals speaking to students at an insight event",
      width: 1500,
      height: 2000,
    },
    about: [
      "Insight Events are corporate events run by IHSAAN. They give students a closer look at a leading employer and the people who work there.",
      "The panel brings together professionals at different levels of seniority. They talk about their roles, how they got there and what the firm looks for.",
      "In the hands-on application workshops, students practise interviews, assessment centres and elevator pitches, and get feedback on how they did.",
      "Networking puts students in conversation with professionals from across the firm. Events may also include an HR talk or an introduction from the firm's Muslim network.",
      "Events vary by employer and year, and attending one does not guarantee an internship or a job offer.",
    ],
    stats: [],
    highlightsTitle: "Who takes part",
    highlights: [
      {
        title: "Bulge bracket investment banks",
        body: "The largest global banks open their doors to our students with panels, application workshops and networking.",
      },
      {
        title: "Big Four firms",
        body: "Leading accounting and consulting firms host students and share what a career with them involves.",
      },
      {
        title: "Public sector",
        body: "Public bodies host or take part in our insight events. One example is the FCA.",
      },
    ],
    quotes: [TESTIMONIALS.benjamin],
    primary: { label: "See upcoming events", href: GET_INVOLVED.href },
    secondary: { label: "Partner with us", href: "/contact" },
  },
  {
    slug: "webinars-workshops",
    title: "Webinars & Workshops",
    summary: "Online panels, speaker events, bootcamps and the Roast My series for CVs, interviews and assessment centres.",
    headline: "Practise before it counts.",
    intro: "Online and in-person sessions that build the skills students need for applications, interviews and assessment centres.",
    image: { src: "/media/gallery/workshop-tables.webp", alt: "Professionals and students working together at tables", width: 2560, height: 1707 },
    closingImage: "/media/gallery/heritage-hall-audience.webp",
    photo: {
      src: "/media/gallery/workshop-audience.webp",
      alt: "Students watching a talk in an IHSAAN event hall",
      width: 2560,
      height: 1707,
    },
    about: [
      "Webinars & Workshops brings together the skills-building sessions IHSAAN runs through the year: online panels, online speaker events, bootcamps and the Roast My series.",
      "Every session is practical. You prepare, practise with professionals who work in the field, and leave with feedback you can use in your next application.",
      "Our summer bootcamps and Spring Week Academy sit under this umbrella, alongside other initiatives.",
    ],
    stats: [],
    highlightsTitle: "What we run",
    highlights: [
      {
        title: "Roast My CV",
        body: "A breakout-room session where someone working in your field reviews your CV with you, one to one.",
      },
      {
        title: "Roast My Interview",
        body: "Interview practice with a professional, which may include a mock interview and feedback on how it went.",
      },
      {
        title: "Roast My Assessment Centre",
        body: "A realistic mock assessment centre in a team, followed by a presentation and precise feedback you can act on.",
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
    quotes: [TESTIMONIALS.civilService, TESTIMONIALS.daniyaal, TESTIMONIALS.mahe],
    primary: { label: "See upcoming events", href: GET_INVOLVED.href },
    secondary: { label: "Get started", href: GET_INVOLVED.href },
  },
  {
    slug: "hackathons",
    title: "Hackathons",
    summary: "Weekend hackathons where students build solutions to real community problems.",
    description:
      "Weekend hackathons where Muslim students form teams, learn from mentors, prototype solutions to real community problems and pitch them to partners.",
    headline: "Build with purpose.",
    intro: "Weekend hackathons for students who want their skills to solve real community problems.",
    image: { src: "/media/gallery/hackathon-coding-focus.webp", alt: "A student coding on a laptop with teammates working beside him at an IHSAAN hackathon", width: 2000, height: 1333 },
    closingImage: "/media/gallery/hackathon-rows.webp",
    photo: {
      src: "/media/gallery/hackathon-bench.webp",
      alt: "Two hackathon participants smiling together on a bench",
      width: 1707,
      height: 2560,
    },
    about: [
      "A hackathon is a focused sprint where teams turn real-world problems into working ideas. Over a weekend, participants form teams, learn from mentors, prototype a solution and pitch it to partners who can help take it further.",
    ],
    stats: [
      { value: "125+", label: "Participants in 2026" },
      { value: "5", label: "Partner organisations in Manchester" },
      { value: "2", label: "Cities in 2026" },
    ],
    highlightsTitle: "How it works",
    highlights: [
      { title: "Form a team", body: "Students join teams to take on real community challenges." },
      { title: "Build a prototype", body: "Teams turn a real-world problem into a working idea over the weekend." },
      { title: "Learn from mentors", body: "Mentors support participants from early ideas through to final pitches." },
      { title: "Pitch to partners", body: "Teams present to partners who can help take the strongest ideas further." },
    ],
    eventsTitle: "Past events",
    events: [
      {
        date: "2026",
        place: "British Muslim Heritage Centre, Manchester",
        detail: "Collaborated with 5 partner organisations including AFH, ZeroPa, Redwood, Medology and the local council.",
        figure: { value: "90+", label: "participants" },
      },
      {
        date: "2026",
        place: "Dublin",
        detail: "Expanded the IHSAAN hackathon programme in Ireland.",
        figure: { value: "35+", label: "participants" },
      },
    ],
    partnersTitle: "Our hackathon partners",
    partners: [
      { name: "ZeroPa", href: "https://zeropa.co.uk/", src: "/partners/zeropa.png", width: 552, height: 133 },
      { name: "Action For Humanity", href: "https://actionforhumanity.org/", src: "/partners/action_for_humanity.png", width: 419, height: 168 },
      { name: "Redwood Founders", href: "https://redwoodfounders.org/", src: "/partners/redwood_founders.png", width: 200, height: 200, opaque: true },
      { name: "Medology", href: "https://www.medology.co.uk/", src: "/partners/medology.png", width: 1379, height: 258 },
      { name: "Cur8 Capital", href: "https://cur8.capital/", src: "/partners/cur8_capital.png", width: 464, height: 263 },
      { name: "Manchester City Council", href: "https://www.manchester.gov.uk/", src: "/partners/manchester_city_council.png", width: 552, height: 106 },
    ],
    quotes: [
      {
        text: "The hackathon was an incredible experience. I learned so much from the people around me, got hands on experience with the latest AI tools and loved seeing participants build solutions to real world problems.",
        role: "Attendee, Dublin Hackathon, 2026",
      },
    ],
    primary: { label: "See upcoming events", href: PUBLIC_DESTINATIONS.eventsCalendar.href, external: true },
    secondary: { label: "Become a partner", href: "/contact" },
  },
  {
    slug: "mentorship",
    title: "Mentorship",
    summary: "My Muslim Mentor pairs students with professionals in their field for 1:1 mentorship.",
    description:
      "My Muslim Mentor pairs Muslim students with professionals in their field for 1:1 mentorship, with 150+ verified mentors across 15+ industries.",
    headline: "A mentor who understands your journey.",
    intro: "My Muslim Mentor offers 1:1 mentorship with professionals in your field, tailored to your goals.",
    image: { src: "/media/mmm-hd.webp", alt: "My Muslim Mentor stickers on a purple table", width: 2206, height: 3713 },
    closingImage: "/media/gallery/students-collaborating.webp",
    photo: { src: "/media/gallery/employer-pitch.webp", alt: "A Redwood Founders representative talking one to one with a student", width: 2000, height: 1500 },
    about: [
      "Our mentorship programmes connect working professionals with Muslim students who are navigating their career journeys.",
      "Professionals share their experience, open doors and help shape the next generation of leaders. Students get guidance from someone who has been where they want to go.",
      "On My Muslim Mentor, students browse verified mentors in their field, then message them or book a free 1:1 call.",
    ],
    stats: [
      { value: "150+", label: "Mentors" },
      { value: "15+", label: "Industries" },
    ],
    highlightsTitle: "Three ways to work with a mentor",
    highlights: [
      {
        title: "CV review",
        body: "Have someone working in the industry you want to enter go through your CV and tell you what to change.",
      },
      {
        title: "Mock interview",
        body: "Practise with a professional and get honest feedback before the real thing.",
      },
      {
        title: "Coffee chat or text Q&A",
        body: "A short virtual coffee chat, or a text Q&A if you prefer to write, to ask what the job is really like.",
      },
    ],
    examplesTitle: "Some of our mentors",
    examples: [
      { name: "Hassan Muhamed", role: "Senior Auditor, National Audit Office" },
      { name: "Zeerak Aziz", role: "Data Engineering Consultant, Made Tech" },
      { name: "Bilal Malik", role: "Diplomat, Foreign, Commonwealth and Development Office" },
      { name: "Saada Alkateb", role: "Clinical Pharmacist, Circle Health Hospital" },
      { name: "Shahmeer Amir", role: "Audit and Assurance Associate, Deloitte" },
    ],
    quotes: [TESTIMONIALS.aadam],
    primary: { label: "Visit My Muslim Mentor", href: PUBLIC_DESTINATIONS.myMuslimMentor.href, external: true },
    secondary: { label: "Become a mentor", href: PUBLIC_DESTINATIONS.myMuslimMentorSignup.href, external: true },
  },
];

export function getProgrammePage(slug: string): ProgrammePage | undefined {
  return PROGRAMME_PAGES.find((page) => page.slug === slug);
}
