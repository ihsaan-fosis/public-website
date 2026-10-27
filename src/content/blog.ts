import { PUBLIC_DESTINATIONS } from "./links";

export type BlogAuthor = {
  name: string;
  linkedin?: string;
  email?: string;
};

export type BlogSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
};

/**
 * Native blog posts hosted on ihsaan.network for crawlable, on-brand article pages.
 * Body copy is adapted from the published IHSAAN Notion reflection.
 */
export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date when known. Omitted rather than guessed. */
  published?: string;
  author: BlogAuthor;
  tags: readonly string[];
  image: { src: string; alt: string };
  /** Short note shown above the body when relevant to applicants. */
  lead?: string;
  intro: readonly string[];
  sections: readonly BlogSection[];
  closing: readonly string[];
  /** Optional original host, kept as attribution only. Canonical stays on this site. */
  originalSource?: { href: string; label: string };
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "civil-service-summer-internship",
    title: "Civil Service summer internship reflection",
    summary:
      "Aleena’s first-hand account of the Civil Service Fast Stream Summer Internship Programme: applying, assessing, interviewing, and learning how policy, faith and service meet in practice.",
    author: {
      name: "Aleena Tayub",
      linkedin: "https://www.linkedin.com/in/aleena-tayub-3138bb263",
      email: "aleenatayub@gmail.com",
    },
    tags: ["Reflections and insights", "Civil Service", "Public sector"],
    image: {
      src: "/media/faithful-talent-hd.webp",
      alt: "IHSAAN students in a programme session",
    },
    lead: "Sections on applying, the online assessment and the interview are especially useful if you are preparing an application.",
    intro: [
      "Assalamu alaykum. My name is Aleena, and this is my story from the Civil Service Summer Internship Programme, a short but eye-opening introduction to life in government and policy.",
    ],
    sections: [
      {
        id: "applying",
        title: "Applying for the SIP",
        paragraphs: [
          "I have always been motivated by a desire to understand and stand against injustice, guided by the Qur’anic principle to “stand firm for justice” (4:135). That drive led me to study Politics, Philosophy and Law and sparked my interest in how policy operates in practice.",
          "In my first year, I came across the Civil Service Fast Stream Summer Internship Programme, which immediately caught my attention. I wanted to gain real experience of how policy operates internally, so I set a notification to apply when applications opened the following year.",
          "The process began online. The form was simple enough: choose a location and three work areas.",
          "For location, I picked London. I wanted to experience being close to debates in the Commons and Lords, as well as the Supreme Court. I will also admit that I was ready for a break from the Midlands.",
          "For my ranked schemes, I chose Policy first, then Diplomatic and Development, and finally Project Management. When I submitted the form, I did not know that this small decision would become such a huge opportunity for growth and insight.",
        ],
      },
      {
        id: "online-assessment",
        title: "The online assessment",
        paragraphs: [
          "After applying, I was invited to complete an online assessment. It is untimed, but trust me, you will still want a quiet room, plenty of time and a proper calculator. I only had my phone calculator, as I did not expect any maths, which was not my brightest idea.",
          "Most of the test focused on how you would respond to workplace situations or approach decisions and case studies. I tried to keep the Civil Service core values in mind for every answer: integrity, honesty, objectivity and impartiality.",
        ],
      },
      {
        id: "interview",
        title: "The interview",
        paragraphs: [
          "When I, surprisingly, reached the interview stage, I was emailed in advance with the four behaviours I would be assessed on: Learner, Efficient, Improver and Explainer. To prepare, I spoke to people who had done the internship by connecting with them on LinkedIn, especially those from my university.",
          "Using their advice, I made a preparation document with examples for each behaviour using the STAR method to plan my answers. While I had little professional experience, this preparation meant I could provide specific examples I had demonstrated through society roles, my studies, volunteering and part-time work. It taught me that it is not always about what you have done or which companies you have worked with, but how you reflect on and present your experiences meaningfully.",
          "The interview was online and audio only. You might think that would make it easier, but I somehow started with, “Hi, it is great to see you,” when I could not, in fact, see the interviewer. Thankfully, it broke the ice.",
          "The interviewer was kind and genuinely interested. We found common ground in challenges I had faced at university that he related to from his own time studying. By the end, I felt I had an honest conversation rather than a test.",
          "After the interview came the hardest part, waiting. It took a few months to hear back, and as someone who loves to overprepare and overthink, not being in control was tough. I made dua in almost every sajdah that Allah would grant me this opportunity if it was truly good for me.",
          "When the offer email finally came through, I had to reread it several times to make sure it was real.",
          "I later found out which department I would be placed in. I will be honest, the Department for Work and Pensions was not my first choice, but I reminded myself that Allah knows best. Once I arrived, I realised how perfectly it suited me. I would be working to support people in overcoming financial barriers to employment and, in turn, reducing child poverty.",
        ],
      },
      {
        id: "first-week",
        title: "The first week",
        paragraphs: [
          "My first week included a visit to a Jobcentre, where I shadowed Work Coach meetings and saw policy in practice. I also heard about Midlife MOT sessions, which help people over 50 think about work, health and money. I found the idea fascinating and reached out to a G7 from the 50 Plus Team to learn more.",
          "He gave me access to several private sector pilot reports I could analyse in my downtime. The department had contracted three pilots to launch programmes in the 50 Plus space for work, wellbeing and wealth. That time quickly became one of the most interesting parts of my internship.",
        ],
      },
      {
        id: "taking-ownership",
        title: "Taking ownership",
        paragraphs: [
          "My main role was in the Flexible Support Fund and Upfront Childcare Costs policies, both designed to remove barriers to work.",
          "I joined the team at an interesting time, as we were working closely with consultants on technical improvements. Many of my team members, as well as colleagues from surrounding teams, were based in different offices, so my first couple of weeks focused on meeting and speaking to as many people as possible, both in the office and online, to understand their roles and how our work connected. Everyone was incredibly welcoming and open to discussing their policy areas, which created space for me to get involved in a range of different projects.",
          "Most of the early meetings with consultants felt like a different language to me, but I made sure to take everything in and use that time to absorb as much as I could.",
          "When priorities later shifted and the consultancy work came to an end, I saw the policy stripped back to its core, where our team had to navigate which levers we could realistically pull to make progress. Around this time, I began contributing more directly. I had been supporting a senior colleague in the Lead Carer Policy Team on a report, where I incorporated recent quantitative findings from new journal messaging data collected at Jobcentres. While working through the data, I noticed overlaps between Lead Carer appointments and our own Childcare Policy. I brought this connection forward in meetings and was trusted to take it forward between the teams, setting up a collaborative meeting before I left.",
          "As a student, that level of autonomy was fulfilling and motivating. It meant a lot to leave behind a lasting link that could strengthen future policy work.",
          "When my manager later moved departments, the dynamic changed. During one particular week, when many of my team were on their non-working days, I was sent No.10 Childcare slides to edit. I had to think on my feet and quickly contact relevant teams for collaborative input across policy areas while representing our own independently.",
          "That week was different from the slower pace I had grown used to. The sudden responsibility and urgency pushed me to adapt quickly. Although it was intimidating at first, it gave me confidence in my ability to manage pressure calmly and stay organised when things moved fast.",
        ],
      },
      {
        id: "curiosity-to-contribution",
        title: "From curiosity to contribution",
        paragraphs: [
          "The 50 Plus project I had started earlier kept growing. I organised data into spreadsheets, analysed contracts and identified patterns that I thought might help improve future delivery. I eventually pulled everything together into a short presentation, hoping it might be useful for the team, although I was not sure how relevant my observations would be.",
          "A few days later there was a ministerial reshuffle, and one of the new priorities announced was improving relationships with employers, the exact focus of my presentation. I was asked to upload and share it with the wider team, and during the discussion that followed, someone mentioned they had not realised I was an intern. That moment stayed with me. It reminded me that experience matters less than effort, sincerity and intention.",
        ],
      },
      {
        id: "faith-dialogue",
        title: "Faith, dialogue and representation",
        paragraphs: [
          "As I grew closer to my managers and spent more time in social settings, conversations about faith came up naturally. Many of them had their own ideas, perceptions or questions about Islam. These moments opened unexpected doors for interfaith dialogue that I had not anticipated.",
          "I found myself able to explain how my work ethic, compassion and drive to serve others came directly from my faith. As a visibly Muslim woman wearing the hijab, I also had the opportunity to share my personal story of choosing to wear it young and on my own terms, even though in my culture it is something many women adopt later in life.",
          "Those conversations were both a responsibility and a blessing. They allowed me to represent Islam accurately and warmly, but they also made me reflect more deeply on my own relationship with Allah.",
        ],
      },
      {
        id: "faith-everyday",
        title: "Finding faith in the everyday",
        paragraphs: [
          "There were plenty of moments when things moved slowly, and I had to remind myself to be patient. Policy work takes time. Faith helped me find calm in those moments.",
          "Ihsaan means striving for excellence in everything you do, knowing that Allah sees your effort even when no one else does. It became a quiet goal for me, whether I was writing a briefing or fixing a spreadsheet. When my intention was right, even ordinary tasks felt meaningful.",
        ],
      },
      {
        id: "pathways-to-work",
        title: "Pathways to Work",
        paragraphs: [
          "I also volunteered to review consultation responses for the Pathways to Work Green Paper on the Personal Independence Payment (PIP) scheme. While I had often heard about PIP eligibility changes in the news, reading the individual, emotionally charged consultation responses was something else entirely. I gave each one the time and attention it deserved, carefully recording and categorising concerns in spreadsheets to ensure people’s voices were accurately represented.",
          "The experience drove home just how personal and transformative policy can be, and how no policy decision can ever be taken lightly. Although I could not directly change anything myself, knowing I was part of an effort to represent people’s lived experiences was something I was proud to do.",
        ],
      },
      {
        id: "small-things",
        title: "The small things",
        paragraphs: [
          "Beyond the main projects, I set up a Star of the Week scheme with another intern to celebrate colleagues and managed the Menopause Policy inbox while their team was away. Both helped me connect with the wider team and make day-to-day work a little more positive for those around me.",
        ],
      },
      {
        id: "faith-growth",
        title: "Faith, growth and perspective",
        paragraphs: [
          "Looking back, the internship was a journey of growth, gratitude and perspective. I learned more about policy, people and purpose than I ever expected. Some days were fast-paced and full of discovery, others were slower and required patience. Each one taught me something valuable about how impact is built, quietly, collaboratively and with intention.",
          "Being offered an extension was deeply meaningful to me. It felt like a reminder that when you work sincerely, Allah opens doors you could never have planned for.",
          "Faith guided my approach in subtle ways, shaping how I treated others, managed pressure and approached my work with care. That understanding of ihsaan (striving for excellence with sincerity) stayed with me throughout the experience, even when it was not something I was consciously thinking about.",
          "To anyone thinking of applying for the Civil Service Summer Internship, bring your curiosity, your humour and your values. You will learn, grow and discover how much quiet intention can shape the way you work and who you become.",
          "May your work be sincere, your intentions pure and your path filled with purpose. (Ameen)",
        ],
      },
    ],
    closing: [
      "If you have questions about the internship journey described here, you are welcome to connect with Aleena through the links below.",
    ],
    originalSource: {
      href: PUBLIC_DESTINATIONS.civilServiceReflection.href,
      label: "Original reflection on Notion",
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
