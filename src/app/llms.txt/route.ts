import { nativeCareerGuides } from "@/content/career-essentials";
import { SOCIAL_LINKS } from "@/content/site";

export function GET() {
  const guideLines = nativeCareerGuides()
    .map((guide) => `- [/resources/${guide.slug}](/resources/${guide.slug}) ${guide.title}`)
    .join("\n");

  return new Response(`# IHSAAN

IHSAAN elevates faith-driven talent. Public site for Muslim students and young professionals across the UK and Ireland.

## Routes

- [/](/) Home
- [/about](/about) Our story
- [/programmes](/programmes) Programmes: career conferences, Faithful Talent, hackathons, mentorship, career guides
- [/resources](/resources) Resources: free Career Essentials guides, reflections, mentoring and hackathon surfaces
${guideLines}
- [/blog](/blog) Blog: community reflections and writing
- [/blog/civil-service-summer-internship](/blog/civil-service-summer-internship) Civil Service summer internship reflection
- [/mentoring](/mentoring) Mentoring hub (coming soon)
- [/haqqathons](/haqqathons) Haqqathons hub (coming soon)
- [/events](/events) Events: upcoming career conferences and academies, with the full events calendar
- [/gallery](/gallery) Gallery
- [/contact](/contact) Contact
- [/ticket](/ticket) Get involved
- [/privacy](/privacy) Privacy policy
- [/terms](/terms) Terms and conditions

## Contact

ihsaan@fosis.org.uk
https://ihsaan.network
${SOCIAL_LINKS.map(({ href }) => href).join("\n")}
`, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
