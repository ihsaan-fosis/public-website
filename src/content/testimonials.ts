/** What students, employers and mentors have said, in their own words. Each one is shown on its programme page, and `/impact` links to it. */
export type Testimonial = {
  text: string;
  /** Who said it. Omitted for an anonymous student. */
  name?: string;
  /** Their role, or the programme and date for an anonymous student. */
  role: string;
  /** A square portrait, shown only where the person agreed to it. */
  photo?: string;
};

export const TESTIMONIALS = {
  glasgowLaw: {
    text: "Whilst speaking to a representative from one of the firms, he had mentioned that his firm currently had postings for a trainee solicitor position… he was able to organise for me an interview for the role, and after 2 rounds of interviews I managed to get the job Alhamdulilah.",
    role: "Law student, November 2025",
  },
  benjamin: {
    text: "Ultimately the real impact was feeling that the door to such careers was no longer a fantasy, nor would it involve some sort of compromise… I employed the teachings and insights from that event, and went on to secure a Spring week at BNP Paribas!",
    name: "Benjamin Jaderi",
    role: "Bulge bracket bank insight event, November 2025",
  },
  mahe: {
    text: "The advice I got played a crucial part in helping me secure an internship in the role I was aiming for. I got to have my CV reviewed 1 to 1 by someone already working in the field I wanted to get into… The feedback was very honest and detailed.",
    name: "Mahe Chowdury",
    role: "Roast My CV webinar, October 2025",
  },
  civilService: {
    text: "I was able to apply the feedback from the mock interview to my real interview… And Alhamdulillah I have secured a place on the civil service summer internship! I also found IHSAAN’s Careers Essentials resources really useful during the whole application process.",
    role: "Anonymous student, February 2026",
  },
  daniyaal: {
    text: "Roast My AC was AMAZING. Beyond being super realistic the feedback was extremely precise and actionable so I could actually boost my odds of securing offers. Aside that all the organisers were generous with their time, which was fantastic for follow-ups. Feels like an unfair advantage.",
    name: "Daniyaal Anawar",
    role: "Roast My AC attendee",
    photo: "/media/testimonials/daniyaal-anawar.webp",
  },
  saqhib: {
    text: "Ihsaan is a valuable service to the community. This year I was lucky enough to secure two interns through the programme. For graduates and under grads it gives opportunities when it appears none exist and for employers we can access enthusiastic, willing often experienced individuals.",
    name: "Saqhib Ali",
    role: "CEO, ZeroPA. Summer Internship Programme employer partner",
  },
  aadam: {
    text: "Being involved with MyMuslimMentor since it launched has been a really rewarding experience. I’ve had almost 10 mentees reach out to me so far… It creates an easy and meaningful way for people to give back… I’ve been fortunate to see some of the people I’ve mentored go on to secure jobs, although the credit is entirely theirs for putting in the work.",
    name: "Aadam Ul Haq",
    role: "GenAI Engineer, NatWest. MyMuslimMentor mentor since launch",
  },
} as const satisfies Record<string, Testimonial>;
