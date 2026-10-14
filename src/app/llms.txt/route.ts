import { nativeCareerGuides } from "@/content/career-essentials";
import { MISSION, SOCIAL_LINKS, TAGLINE } from "@/content/site";

export function GET() {
  const guideLines = nativeCareerGuides()
    .map((guide) => `- [/resources/${guide.slug}](/resources/${guide.slug}) ${guide.title}`)
    .join("\n");

  return new Response(`# IHSAAN

IHSAAN: ${TAGLINE} ${MISSION} Public site for Muslim students and young professionals across the UK and Ireland.

## Routes

- [/](/) Home
- [/about](/about) Our story
- [/programmes](/programmes) Programmes: career conferences, summer internships, insight events, webinars and workshops, hackathons, mentorship
- [/impact](/impact) Impact: reach, results, how success is measured and the 2045 vision
- [/resources](/resources) Resources: free Career Essentials guides and reflections
${guideLines}
- [/blog](/blog) Blog: community reflections and writing
- [/blog/civil-service-summer-internship](/blog/civil-service-summer-internship) Civil Service summer internship reflection
- [/events](/events) Events: upcoming career conferences and academies, with the full events calendar
- [/gallery](/gallery) Gallery
- [/contact](/contact) Contact
- [/get-involved](/get-involved) Get involved
- [/volunteer](/volunteer) Volunteer openings
- [/privacy](/privacy) Privacy policy
- [/terms](/terms) Terms and conditions

## Contact

ihsaan@fosis.org.uk
https://ihsaan.network
${SOCIAL_LINKS.map(({ href }) => href).join("\n")}
`, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
