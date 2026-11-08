import {
  CONTACT_EMAIL,
  FAQS,
  GET_INVOLVED,
  INVOLVEMENT_ROUTES,
  MEMBER_PORTAL,
  MEMBER_PORTAL_SIGNUP,
  MISSION,
  NAV_LINKS,
  OFFERS,
  PARTNER_TIERS,
  PROFESSIONALS_LINK,
  SOCIAL_LINKS,
  TAGLINE,
  VISION,
} from "../content/site";
import { PRODUCTION_ORIGIN } from "./site";

function link(label: string, href: string): string {
  return `[${label}](${new URL(href, PRODUCTION_ORIGIN).href})`;
}

function section(title: string, ...lines: readonly string[]): string {
  return [`## ${title}`, ...lines].join("\n\n");
}

/** The homepage as Markdown, built from the same content the HTML page renders. */
export function homeMarkdown(): string {
  return [
    `# ${TAGLINE}`,
    MISSION,
    [link(MEMBER_PORTAL_SIGNUP.label, GET_INVOLVED.href), link("Are you a professional?", PROFESSIONALS_LINK.href)]
      .map((item) => `- ${item}`)
      .join("\n"),
    section("Our vision", VISION),
    section(
      "Explore what we offer",
      OFFERS.map((offer) => `- ${link(offer.title, offer.href)}`).join("\n"),
      link("All programmes", "/programmes"),
    ),
    section(
      "Find your place at IHSAAN",
      "Students, professionals and organisations all have a part to play in IHSAAN's work.",
      ...INVOLVEMENT_ROUTES.map((route) => `### ${route.title}\n\n${route.body}\n\n${link(route.cta.label, route.cta.href)}`),
    ),
    section(
      "Professional Backgrounds Across Our Events",
      ...PARTNER_TIERS.map((tier) => `### ${tier.name}\n\n${tier.partners.map(({ name }) => `- ${name}`).join("\n")}`),
    ),
    section("Moments from our programmes", link("View the gallery", "/gallery")),
    section(
      "Frequently asked questions",
      ...FAQS.map((faq) => [`### ${faq.question}`, faq.answer, ...(faq.cta ? [link(faq.cta.label, faq.cta.href)] : [])].join("\n\n")),
    ),
    section(
      "Start your career journey with IHSAAN.",
      "Programmes, mentors and opportunities for Muslim students across the UK and Ireland.",
      `- ${link("Apply now", GET_INVOLVED.href)}\n- ${link("Contact us", "/contact")}`,
    ),
    section(
      "Site",
      [...NAV_LINKS, MEMBER_PORTAL].map(({ label, href }) => `- ${link(label, href)}`).join("\n"),
      `Email: ${CONTACT_EMAIL}`,
      SOCIAL_LINKS.map(({ label, href }) => `- ${link(label, href)}`).join("\n"),
    ),
  ].join("\n\n") + "\n";
}

/** A Markdown 404 body that points an agent back to the site's indexes. */
export function notFoundMarkdown(pathname: string): string {
  return [
    "# Page not found",
    `There is no page at \`${pathname}\` on the IHSAAN website.`,
    [link("Home", "/"), link("Sitemap", "/sitemap.xml"), link("llms.txt", "/llms.txt")].map((item) => `- ${item}`).join("\n"),
  ].join("\n\n") + "\n";
}
