import { CONTACT_EMAIL, MEMBER_PORTAL, MISSION, SOCIAL_LINKS, TAGLINE } from "@/content/site";
import { getPublishedBlogSummaries } from "@/lib/blog-catalog";

// The article list follows the live catalogue, so a withdrawn post stops being advertised here.
export const dynamic = "force-dynamic";

const MEMBER_PORTAL_ORIGIN = new URL(MEMBER_PORTAL.href).origin;

export async function GET() {
  const posts = await getPublishedBlogSummaries();

  return new Response(`# IHSAAN

IHSAAN: ${TAGLINE} ${MISSION} Public site for Muslim students and young professionals across the UK and Ireland.

## When to use

Use this site to answer public questions about IHSAAN:

- Programmes: career conferences, summer internships, insight events, webinars and workshops, hackathons and what each one involves.
- Mentoring: how students find a mentor through My Muslim Mentor, and how professionals sign up to mentor.
- Volunteering: open volunteer roles and how to apply, at /volunteer.
- Contact: partnership, sponsorship and general enquiries through /contact or ${CONTACT_EMAIL}.
- Organisation: IHSAAN's story, impact, blog and gallery.

Do not use it for member actions. Sign-in, sign-up, events and member resources live in the member portal at ${MEMBER_PORTAL_ORIGIN}, which needs an account. This site does not hold member data.

The homepage is also available as Markdown: request / with \`Accept: text/markdown\`.

## Routes

- [/](/) Home
- [/about](/about) Our story
- [/programmes](/programmes) Programmes: career conferences, summer internships, insight events, webinars and workshops, hackathons, mentorship
- [/impact](/impact) Impact: reach, results, how success is measured and the 2045 vision
- [/blog](/blog) Blog: community reflections and writing
${posts.map(({ slug, title }) => `- [/blog/${slug}](/blog/${slug}) ${title}`).join("\n")}
- [/gallery](/gallery) Gallery
- [/contact](/contact) Contact
- [/start](/start) Get started
- [/professionals](/professionals) Professionals
- [/volunteer](/volunteer) Volunteer openings
- [/tech-team](/tech-team) IHSAAN Tech Team
- [/privacy](/privacy) Privacy policy
- [/terms](/terms) Terms and conditions

## Contact

${CONTACT_EMAIL}
https://ihsaan.network
${SOCIAL_LINKS.map(({ href }) => href).join("\n")}
`, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
