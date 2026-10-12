import { SOCIAL_LINKS } from "@/content/site";

export function GET() {
  return new Response(`# IHSAAN

IHSAAN elevates faith-driven talent. Public site for Muslim students and young professionals across the UK and Ireland.

## Routes

- [/](/) Home
- [/about](/about) Our story
- [/programmes](/programmes) Programmes: career conferences, Faithful Talent, hackathons, mentorship, career guides
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
