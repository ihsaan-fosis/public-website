/**
 * The previous site served each section at `/pages/<page>.html` and as the homepage fragment `#<page>`.
 * Plain JS so `next.config.mjs` can import it for server redirects; the browser maps fragments.
 * Keep these for at least a year after launch.
 *
 * @type {readonly { page: string; destination: string; permanent: boolean }[]}
 */
export const LEGACY_PAGES = [
  { page: "home", destination: "/", permanent: true },
  { page: "who-we-are", destination: "/about", permanent: true },
  { page: "get-involved", destination: "/get-involved", permanent: true },
  { page: "career-conferences", destination: "/programmes/career-conferences", permanent: true },
  { page: "faithful-talent", destination: "/programmes/summer-internships", permanent: true },
  { page: "haqqathons", destination: "/programmes/hackathons", permanent: true },
  { page: "career-guides", destination: "/resources", permanent: true },
  // The tracker is hidden for now; temporary so the old URL can point back to it later.
  { page: "opportunities-tracker", destination: "/programmes", permanent: false },
];
