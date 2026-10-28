---
last_mapped: 2026-10-28
---

# Codebase map

This map describes the checkout, not the deployed site.
The public website uses Next.js 16 App Router, React 19, TypeScript, Tailwind
CSS 4, Bun, Vitest, and Oxlint.

The member portal is separate. Its repository is `ihsaan-fosis/member-platform`.
This repository has no member authentication, Clerk, or Convex runtime.

## Routes

Public routes have these entry points:

| Route | Source |
| --- | --- |
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/programmes` | `src/app/programmes/page.tsx` |
| `/programmes/[slug]` | `src/app/programmes/[slug]/page.tsx` |
| `/gallery` | `src/app/gallery/page.tsx` |
| `/impact` | `src/app/impact/page.tsx` |
| `/resources` | `src/app/resources/page.tsx` |
| `/resources/[slug]` | `src/app/resources/[slug]/page.tsx` |
| `/blog` | `src/app/blog/page.tsx` |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` |
| `/events` | `src/app/events/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |
| `/start` | `src/app/start/page.tsx` |
| `/professionals` | `src/app/professionals/page.tsx` |
| `/volunteer` | `src/app/volunteer/page.tsx` |
| `/tech-team` | `src/app/tech-team/page.tsx` |
| `/privacy`, `/terms` | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| `/404` | `src/app/404/page.tsx` |
| Unmatched routes | `src/app/not-found.tsx` |
| `/api/contact` | `src/app/api/contact/route.ts` |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/llms.txt/route.ts` |

`PROGRAMME_PAGES` supplies the programme slugs: `career-conferences`,
`summer-internships`, `insight-events`, `webinars-workshops`, `hackathons`, and
`mentorship`. The programme route sets `dynamicParams = false`.

## Redirects

`next.config.mjs` defines these redirects:

| Source | Destination |
| --- | --- |
| `www.ihsaan.network` | The same path on `https://ihsaan.network` |
| `/pages/*.html` | The matching destination in `LEGACY_PAGES` |
| `/programmes/opportunities-tracker` | `/programmes`, temporarily |
| `/get-involved` | `/start`, temporarily |
| `/ticket` | `/start` |
| `/programmes/faithful-talent` | `/programmes/summer-internships` |
| `/programmes/career-guides` | `/resources` |
| `/haqqathons` | `/programmes/hackathons` |
| `/mentoring` | `/programmes/mentorship` |

`src/content/legacy-routes.mjs` supplies the shared legacy map.
The server uses the page entries. `LegacyHashRedirect` uses the fragment map
for old homepage URLs.

## Content modules

Shared text, records, and destinations live in these modules:

| Path | Contents |
| --- | --- |
| `src/content/site.ts` | Navigation, mission, facts, programme cards, partners, involvement links, FAQs, and gallery records. |
| `src/content/programmes.ts` | Copy and records for programme detail pages. |
| `src/content/impact.ts` | Impact copy and figures from the IHSAAN Partnership Proposal 2026/27. Photos resolve through `GALLERY`. |
| `src/content/story.ts` | Organisation copy, team profiles, and conference-route data. |
| `src/content/resources.ts` | Approved free-resource destinations. |
| `src/content/career-essentials.ts`, `src/content/career-essentials.catalog.json` | Career guide content. |
| `src/content/blog.ts` | Blog index and article content. |
| `src/content/links.ts` | Shared external destinations. |
| `src/content/events.ts` | Scheduled public events. |
| `src/content/volunteer.ts`, `src/content/tech-team.ts` | Volunteer openings and tech-team profiles. |

## Shared UI

The main shared components have these responsibilities:

| Path | Responsibility |
| --- | --- |
| `src/app/layout.tsx` | Poppins, metadata base, theme initialization, skip link, header, footer, `RevealObserver`, and Organization JSON-LD. |
| `src/app/page.tsx` | The video hero, `ScrollWords`, impact story, programmes, involvement links, partners, gallery, FAQ, closing action, and `LegacyHashRedirect`. |
| `src/components/ui.tsx` | `Container`, `Section`, `SectionTitle`, `SectionHeading`, `Eyebrow`, `ButtonLink`, `PhotoHero`, `PhotoFrame`, `displayClass`, and `revealDelay`. |
| `src/components/ui/` | Radix-based dialog and select components. |
| `src/components/sections.tsx` | Shared programme, impact, involvement, partner, gallery, FAQ, and photo sections. |
| `src/components/story.tsx`, `src/components/impact.tsx` | About and impact page sections. |
| `src/components/contact-form.tsx` | Client contact form and Turnstile widget. |
| `src/components/event-list.tsx` | Event list. |
| `src/components/volunteer-openings.tsx` | Volunteer role list and Tally application dialog. |
| `src/components/route-switcher.tsx`, `src/components/involvement-actions.tsx` | Member and professional next steps. |
| `src/components/site-header.tsx`, `src/components/site-footer.tsx` | Floating navigation, mobile menu, and footer. |
| `src/components/motion.tsx` | `RevealObserver`, `CountUp`, `ScrollWords`, `ThemeToggle`, `HeroVideo`, and `MarqueeGroup`. |
| `src/components/legacy-hash-redirect.tsx` | Client redirects for legacy homepage fragments. |
| `src/components/legal-page.tsx`, `src/components/not-found-content.tsx` | Legal page layout and the 404 body. |

`src/app/globals.css` defines Tailwind, brand tokens, theme tokens, photo tones,
and motion. `data-theme` on `<html>` selects the theme before the page paints.
The [design reference](IHSAAN-DESIGN.md) defines public-page layout rules.

## Server helpers and configuration

These files define shared behavior and deployment settings:

| Path | Responsibility |
| --- | --- |
| `src/lib/site.ts` | `SITE_ORIGIN` and `INDEXABLE`. Production canonicals use the apex domain. `VERCEL_ENV` controls indexing. |
| `src/lib/metadata.ts` | `pageMetadata()` and `DEFAULT_TITLE` for page, Open Graph, and Twitter metadata. |
| `src/lib/contact.ts`, `src/lib/turnstile.ts` | Contact schema, plain-text email construction, challenge verification, and hostname checks. |
| `src/lib/events.ts`, `src/lib/guide-markdown.tsx` | Event dates and guide markdown rendering. |
| `src/lib/utils.ts` | The `cn` class helper. |
| `next.config.mjs` | Redirects, image patterns, security headers, Content Security Policy, and OpenNext development initialization. |
| `open-next.config.ts`, `wrangler.jsonc` | Worker build target, prerendered asset cache, and runtime bindings. Custom-domain routes are empty. |
| `oxlint.config.mjs`, `tools/oxlint/` | Oxlint, anti-slop rules, and shadcn lint rules. |
| `public/media/`, `public/partners/`, `public/icons/` | Photographs, video, logos, partner marks, and icons. |
| `public/blue-icon.svg`, `public/icon-dark.svg` | Theme-specific favicons. |

The contact route validates input, limits request bodies, verifies Turnstile,
and sends email through Resend. The [environment reference](ENVIRONMENT.md)
describes its configuration.

## Existing verification files

The repository includes these checks, among others:

| Path | Coverage |
| --- | --- |
| `src/app/seo.test.ts` | Sitemap, robots, metadata origins, and indexing. |
| `src/app/page.test.tsx` | Home page rendering. |
| `src/app/programmes/programmes.test.tsx` | Programme pages and route parameters. |
| `src/components/legacy-hash-redirect.test.tsx` | Fragment redirects. |
| `src/components/motion.test.tsx` | Motion helpers. |
| `src/components/site-header.test.tsx`, `src/components/site-footer.test.tsx` | Header and footer. |
| `src/test/setup.ts` | Shared Vitest setup. |
| `tests/integration/` | Contact security and HTTP checks against a running app. |

The [contributor guide](CONTRIBUTING.md#verify-the-change) defines the procedure
and the E2E-first policy for new coverage.

## Package scripts

`package.json` defines these scripts:

| Command | Behavior |
| --- | --- |
| `bun run dev` | Starts Next.js with Turbopack on port 3000. |
| `bun run build` | Builds the production Next.js app. |
| `bun run start` | Serves the production build. |
| `bun run test` | Runs Vitest in watch mode. |
| `bun run test:run` | Runs Vitest once. |
| `bun run test:integration` | Runs the integration configuration. HTTP checks require `BASE_URL` and a running server. |
| `bun run lint`, `bun run lint:oxlint` | Runs Oxlint with the repository rules. |
| `bun run preview` | Builds and previews the OpenNext Worker locally. |
| `bun run deploy` | Builds and deploys the Worker. Deployment is restricted to approved maintainer operations. |

## Known limits

These constraints affect changes and verification:

- The Content Security Policy allows Turnstile scripts, connections, and frames,
  plus Tally frames. Other third-party embeds need an explicit review.
- `images.localPatterns` permits optimization only under `/media/**`.
  Partner logos under `/partners/` are outside that pattern.
- Restoring the hidden tracker requires consistent content, route, and redirect
  changes.
- Empty Worker domain routes do not establish live hosting.
- Contact credentials can trigger real email delivery.
- Local agent files are ignored. Shared documentation is separate from those files.

## Source inventory

The following command lists tracked source, test, and public asset paths:

```bash
git ls-files src tests public
```

`package.json` is the source for script names and dependency versions.
The [contributor guide](CONTRIBUTING.md#maintain-shared-documentation) covers
updates to this map and the other guides.
