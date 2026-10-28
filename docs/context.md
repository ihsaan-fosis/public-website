# Product context

## Purpose

Public face of IHSAAN on the official domain **https://ihsaan.network**.

The site explains who IHSAAN is, surfaces programmes and opportunities for Muslim students and young professionals across the UK and Ireland, and routes people into the right next step (get involved, contact, programme CTAs, or the member portal).

It is not the member product. Member login, programme ops, mentoring workflows, and internal data live in `ihsaan-fosis/member-platform`.

## Domain

| Environment | URL |
|-------------|-----|
| Production | `https://ihsaan.network` |
| Member portal | `https://portal.ihsaan.network` (separate deployment of `member-platform`, linked as "Member portal") |
| Local | `http://localhost:3000` |

Set `NEXT_PUBLIC_APP_URL` for local/preview. Production builds always publish the apex canonical via `src/lib/site.ts` so a localhost or preview origin cannot leak into metadata. Prefer apex; `www.ihsaan.network` permanently redirects to apex in `next.config.mjs`.

## Users

- Prospective students and young professionals discovering IHSAAN
- Parents, university partners, employers, and funders evaluating the organisation
- Alumni and volunteers looking for public information
- Search engines, social previews, and AI crawlers (SEO / Open Graph / `llms.txt`)

## Product scope

Public surfaces in this repo:

- Home and brand story
- Programmes index and detail pages for conferences, internships, insight events,
  webinars and workshops, hackathons, and mentorship
- Events, gallery, impact, resources, and blog pages
- About, contact, member entry (`/start`), professionals, volunteer openings,
  and the tech team
- Privacy and terms
- Clear CTAs into applications, contact, or the member portal
- SEO-friendly pages, sitemap, robots, Organization JSON-LD, and `llms.txt` on `ihsaan.network`
- Legacy URL compatibility for the previous `/pages/*.html` and homepage-hash structure

Out of scope here: authenticated member dashboards, private data, admin tooling, Clerk/Convex runtime integration.

## Brand

Visual identity lives in [IHSAAN-DESIGN.md](IHSAAN-DESIGN.md). Sections 1 to 8
record the brand guide. Section 9 records the public website's editorial,
photo-led design. Use Poppins, the existing tokens, photo frames, and unboxed
text sections. Do not copy member-portal panels or dashboard layouts. Theme
tokens change with `data-theme`; photo overlay tones stay fixed.

## Delivery principles

- Ship a focused public site. Content and clarity over feature count.
- Keep the public/member boundary clean. Shared design language is fine; shared auth data is not by default.
- Treat analytics and third-party embeds as opt-in and CSP-aware.
- Document decisions that change IA, domain, or integration with the member platform.
- Prefer content edits in `src/content/*` over hard-coded page copy when the text is shared.
- Submit contributions through PRs. Maintainers own merges, secrets, and releases.

## Current state

The codebase includes an editorial home with a hero video, programme detail
pages, member-portal entry points, legacy URL redirects, and production SEO
metadata. The opportunities tracker remains hidden behind a redirect to
`/programmes`. `/get-involved` and `/ticket` redirect to `/start`.

The repository targets Cloudflare Workers through OpenNext. The current
`wrangler.jsonc` has no custom-domain routes. Confirm the active deployment and
DNS before any release. Repository configuration alone is not proof that this
Worker serves `ihsaan.network`.

## Change boundaries

Confirm launch copy, destination ownership, and any restored programme surfaces
with the team. Keep content, redirects, and discovery routes consistent. Do not
add authentication or member-platform data to this public site as part of a
content change. See [the contributor guide](../CONTRIBUTING.md).
