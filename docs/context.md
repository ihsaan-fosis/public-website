# Product context

## Purpose and audience

The public website explains IHSAAN's work and connects Muslim students and
young professionals with programmes across the UK and Ireland.
It also gives parents, university partners, employers, funders, alumni, and
volunteers public information about the organisation.

Visitors can explore programmes, find resources, contact the team, and continue
to an application or the member portal. Search engines and other crawlers receive
metadata, a sitemap, Organization JSON-LD, and `llms.txt`.

## Public site and member portal

The public site and the member portal are separate applications:

| Application | Repository | Domain |
| --- | --- | --- |
| Public website | `ihsaan-fosis/public-website` | `https://ihsaan.network` |
| Member portal | `ihsaan-fosis/member-platform` | `https://portal.ihsaan.network` |

Member login, programme operations, mentoring workflows, and private data belong
to the member portal. The public site has no authenticated dashboard, admin
tools, or Clerk or Convex runtime.

The applications share brand guidance, not authentication or private data.
This separation keeps public content changes independent of member workflows.

## Public content

The website includes these areas:

- Home, the organisation's story, impact, and gallery.
- Programme pages for conferences, internships, insight events, webinars and
  workshops, hackathons, and mentorship.
- Events, blog articles, and career resources.
- Member entry at `/start`, professional enquiries, volunteer openings, and the
  tech team.
- Contact, privacy, and terms.
- Links to external applications and the member portal.
- Compatibility redirects for legacy pages and homepage fragments.

Shared copy and destinations live in `src/content/`.
The opportunities tracker is hidden through a redirect to `/programmes`.
`/get-involved` and `/ticket` redirect to `/start`.

## Domains and deployment

The production canonical origin is `https://ihsaan.network`.
`src/lib/site.ts` fixes that origin for production builds, regardless of
`NEXT_PUBLIC_APP_URL`. `next.config.mjs` redirects `www` to the apex domain.
Local development uses `http://localhost:3000`.

The repository targets Cloudflare Workers through OpenNext.
`wrangler.jsonc` currently has no custom-domain routes.
The checkout therefore does not establish which deployment serves the public
domain. The [maintainer procedure](MAINTAINERS.md) separates release approval
and live verification from local development.

## Visual identity

The [design reference](IHSAAN-DESIGN.md) distinguishes the brand guide from
website-specific choices. Sections 1 to 8 record the brand source and its gaps.
Section 9 describes the public website.

Public pages use Poppins, photographs in rounded frames, large headings, and
text lists separated by thin rules. They do not use the member portal's
coloured panels or dashboard layouts. Theme tokens change between light and
dark mode. Photo overlays keep fixed colours.

## Change constraints

The project prioritizes clear public content over a larger feature set.
Content changes do not introduce member authentication or private data.
Shared text belongs in content modules rather than repeated page markup.
Analytics and third-party embeds require an explicit decision and a review of
the Content Security Policy.

Changes to navigation structure, domains, or member-platform integration need a
recorded decision. Launch copy, destination ownership, and restored programme
pages require team confirmation. Content, redirects, and discovery routes must
remain consistent.

The [contributor workflow](CONTRIBUTING.md) uses PRs.
Maintainers own merges, secrets, and releases.
