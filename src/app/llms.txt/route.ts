import { MISSION, SOCIAL_LINKS, TAGLINE } from "@/content/site";

export function GET() {
  return new Response(`# IHSAAN

IHSAAN: ${TAGLINE} ${MISSION} Public site for Muslim students and young professionals across the UK and Ireland.

## Routes

- [/](/) Home
- [/about](/about) Our story
- [/programmes](/programmes) Programmes: career conferences, summer internships, insight events, webinars and workshops, hackathons, mentorship
- [/impact](/impact) Impact: reach, results, how success is measured and the 2045 vision
- [/blog](/blog) Blog: community reflections and writing
- [/blog/civil-service-summer-internship](/blog/civil-service-summer-internship) Civil Service summer internship reflection
- [/gallery](/gallery) Gallery
- [/contact](/contact) Contact
- [/start](/start) Get started
- [/professionals](/professionals) Professionals
- [/volunteer](/volunteer) Volunteer openings
- [/tech-team](/tech-team) IHSAAN Tech Team
- [/privacy](/privacy) Privacy policy
- [/terms](/terms) Terms and conditions

## Contact

ihsaan@fosis.org.uk
https://ihsaan.network
${SOCIAL_LINKS.map(({ href }) => href).join("\n")}
`, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
