---
last_mapped: 2026-10-28
---

# Codebase map

## System overview

Public marketing site for IHSAAN at [ihsaan.network](https://ihsaan.network). Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Bun, Vitest, Oxlint.

Public routes include home, programmes, about, gallery, impact, events, resources,
blog, contact, member entry, professionals, volunteer openings, the tech team,
and legal pages. SEO routes expose `sitemap.xml`, `robots.txt`, and `llms.txt`.
Light and dark themes use `data-theme` on `<html>`. Follow section 9 of
[IHSAAN-DESIGN.md](IHSAAN-DESIGN.md) for the public site's photo-led editorial
layout. Member-portal panels are not public-site components.

Sibling product: private member portal at `ihsaan-fosis/member-platform` (`https://portal.ihsaan.network`). This repo is public content only. No auth, Convex, or Clerk in the live tree.

Repository: `ihsaan-fosis/public-website`. Run project commands from its root.

## Directory guide

| Path | Role |
|------|------|
| `src/app/` | App Router routes and SEO entry points |
| `src/app/layout.tsx` | Root chrome: Poppins, metadata base, theme boot script, skip link, header/footer, `RevealObserver`, Organization JSON-LD |
| `src/app/page.tsx` | Home: editorial video hero, promise `ScrollWords`, impact story, programmes carousel, involvement panels, partners, gallery parallax, FAQ, closing CTA. Mounts `LegacyHashRedirect` |
| `src/app/` page directories | Public routes. `/start` links to portal signup; `/professionals` serves professional and organisation enquiries; `/volunteer` opens unpaid-role applications through Tally; `/impact` tells the results story; `/resources` lists free guides. |
| `src/app/api/contact/route.ts` | Contact submission API with schema validation, a body-size limit, Turnstile verification, and Resend delivery |
| `src/app/programmes/` | Index + `[slug]` detail pages. `dynamicParams = false`; slugs from `PROGRAMME_PAGES` |
| `src/app/sitemap.ts`, `robots.ts`, `llms.txt/route.ts` | Machine-readable discovery. Production-only indexing via `INDEXABLE` |
| `src/app/globals.css` | Tailwind 4, brand tokens, theme tokens (`page`/`surface`/`ink`/`accent`), photo tones (`night`/`cream`), motion keyframes, scroll-reveal |
| `src/app/seo.test.ts`, `page.test.tsx`, `programmes/programmes.test.tsx` | Route and SEO regression tests |
| `src/content/site.ts` | Nav, mission/tagline, facts, programme cards, offers, partners, involvement routes, FAQs, gallery |
| `src/content/impact.ts` | Copy and figures for `/impact`, taken from the IHSAAN Partnership Proposal 2026/27 deck. Photos resolve through `GALLERY` |
| `src/content/resources.ts` | Free materials listed on `/resources` (approved Linktree Career Support destinations only) |
| `src/content/blog.ts` | Blog index and article content |
| `src/content/career-essentials.ts`, `src/content/career-essentials.catalog.json` | Career guide content for `/resources/[slug]` |
| `src/content/links.ts`, `src/content/events.ts` | Shared external destinations and scheduled public events |
| `src/content/story.ts` | Story copy, team profiles, and conference-route data |
| `src/content/volunteer.ts`, `src/content/tech-team.ts` | Volunteer openings and tech-team profiles |
| `src/content/programmes.ts` | Full copy for each `/programmes/[slug]` page |
| `src/content/legacy-routes.mjs` | Shared legacy page map for server redirects and client hash redirects (plain JS so `next.config.mjs` can import it) |
| `src/components/ui.tsx` | Shared UI: `Container`, `Section`, `SectionTitle`, `SectionHeading`, `Eyebrow`, `ButtonLink`, `PhotoHero`, `PhotoFrame`, `displayClass`, `revealDelay` |
| `src/components/ui/` | Radix-based dialog and select components |
| `src/components/story.tsx`, `src/components/impact.tsx` | About and impact page chapters |
| `src/components/contact-form.tsx`, `src/components/event-list.tsx`, `src/components/volunteer-openings.tsx` | Contact form, event list, and volunteer application interactions |
| `src/components/sections.tsx` | Shared blocks: facts, programmes carousel, impact story, gallery parallax, involvement cards/panels, partners, FAQ, photo band, closing CTA |
| `src/components/route-switcher.tsx`, `src/components/involvement-actions.tsx` | Member and professional next steps |
| `src/components/site-header.tsx`, `site-footer.tsx` | Floating capsule nav (mobile menu client) and footer with large wordmark |
| `src/components/motion.tsx` | Client motion: `RevealObserver`, `CountUp`, `ScrollWords`, `ThemeToggle`, `HeroVideo`, `MarqueeGroup` |
| `src/components/legacy-hash-redirect.tsx` | Client map of old `/#section` hashes to current routes |
| `src/components/legal-page.tsx`, `not-found-content.tsx` | Legal shell and 404 body |
| `src/lib/site.ts` | `SITE_ORIGIN` locks production canonicals to the apex. `INDEXABLE` is false when `VERCEL_ENV` is set to a value other than `production`. |
| `src/lib/contact.ts`, `src/lib/turnstile.ts` | Contact schema, plain-text email construction, and challenge verification with hostname checks |
| `src/lib/events.ts`, `src/lib/guide-markdown.tsx` | Event dates and guide markdown rendering |
| `src/lib/metadata.ts` | `pageMetadata()` and `DEFAULT_TITLE` so every page gets full Open Graph / Twitter objects |
| `src/lib/utils.ts` | `cn` class merge |
| `src/test/setup.ts` | Vitest setup |
| `tests/integration/` | Contact security integration and running-app HTTP checks |
| `public/media`, `public/partners`, `public/icons` | Photos, hero video/poster, logos, partner marks |
| `public/blue-icon.svg`, `public/icon-dark.svg` | Theme-aware favicons |
| `next.config.mjs` | Apex and legacy redirects, hidden tracker redirect, local image patterns, security headers, CSP, and OpenNext development initialization |
| `open-next.config.ts`, `wrangler.jsonc` | Worker build target, prerendered asset cache, and runtime bindings. Custom-domain routes are currently empty. |
| `oxlint.config.mjs`, `tools/oxlint/` | Oxlint + anti-slop / shadcn lint wiring |
| `docs/IHSAAN-DESIGN.md` | Visual system source of truth |
| `docs/context.md` | Product purpose, domain, scope |
| `docs/README.md`, `docs/CONTRIBUTING.md` | Documentation index and contribution workflow |
| `docs/SECURITY-AUDIT.md` | Dated security findings and operational follow-ups, not current verification |

## Routes

| Route | Source |
|-------|--------|
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/programmes` | `src/app/programmes/page.tsx` |
| `/programmes/[slug]` | career-conferences, summer-internships, insight-events, webinars-workshops, hackathons, mentorship |
| `/gallery` | `src/app/gallery/page.tsx` |
| `/impact` | `src/app/impact/page.tsx`, chapters in `src/components/impact.tsx` |
| `/resources` | `src/app/resources/page.tsx` |
| `/resources/[slug]` | `src/app/resources/[slug]/page.tsx` |
| `/blog` | `src/app/blog/page.tsx` |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` |
| `/events` | `src/app/events/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |
| `/start` | Get started |
| `/professionals` | Professionals |
| `/volunteer` | Volunteer openings index |
| `/tech-team` | Tech-team profiles |
| `/privacy`, `/terms` | Legal |
| `/404`, `not-found` | Not found |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | SEO / AI discovery |
| `/pages/*.html` (legacy) | 301/302 via `LEGACY_PAGES` in `next.config.mjs` |
| `/programmes/opportunities-tracker` | Temporary redirect to `/programmes` |
| `/get-involved`, `/ticket` | Redirects to `/start` |
| `/programmes/faithful-talent`, `/programmes/career-guides` | Redirects to `/programmes/summer-internships` and `/resources` |
| `/haqqathons`, `/mentoring` | Redirects to the hackathons and mentorship programme pages |

## Key workflows

1. **Copy change:** edit the owning module in `src/content/`. Shared site and programme copy live in `site.ts` and `programmes.ts`.
2. **New section:** compose from `ui.tsx`, `sections.tsx`, and the page chapters. Use photo frames and editorial lists, not member-portal panels.
3. **New public route:** add the route with `pageMetadata`, link from navigation or relevant CTAs, and update discovery routes. Verify behavior through E2E or justified integration coverage.
4. **Metadata / SEO:** never hand-roll partial `openGraph` on a page. Always use `pageMetadata`. Canonical origin comes from `SITE_ORIGIN` (apex in production builds).
5. **Theme:** `layout.tsx` sets `data-theme` before paint from `localStorage.theme` or system preference. Use `ink` / `page` / `surface` / `accent` for theme-flipping UI. Use `cream` / `night` only on photo overlays.
6. **Legacy URLs:** add entries to `src/content/legacy-routes.mjs` (covers both server `/pages/*.html` redirects and client hash redirects).
7. **Local loop:** use `bun run dev`, then the relevant checks, `bun run test:run`, and `bun run lint`. Stop the development server before `bun run build`.

## Tests

| File | Covers |
|------|--------|
| `src/app/seo.test.ts` | sitemap, robots, metadata origin / indexability expectations |
| `src/app/page.test.tsx` | home smoke |
| `src/app/programmes/programmes.test.tsx` | programme pages / params |
| `src/components/legacy-hash-redirect.test.tsx` | hash → route map |
| `src/components/motion.test.tsx` | motion helpers |
| `src/components/site-header.test.tsx`, `site-footer.test.tsx` | chrome |

## Known risks

- CSP in `next.config.mjs` allows Turnstile scripts, connections, and frames, plus Tally frames. Other third-party embeds require an explicit CSP review.
- `images.localPatterns` only allows `/media/**`. Partner logos under `/partners` are not next/image-optimised paths by default.
- Opportunities tracker programme is hidden (temporary redirect). Restoring it needs content, route, and redirect cleanup together.
- Do not confuse this repo with `member-platform`. Shared design language only; no shared auth or data by default.
- Worker custom-domain routes are empty. Verify hosting and DNS before releases.
- Contact provider keys can trigger real email delivery. Leave them unset for routine local work.
- Local agent files are ignored. Do not force-add them to documentation PRs.

## Keep this map current

Update this map when a route, module boundary, or shared workflow changes.
Check paths with `git ls-files src tests public` and scripts with `package.json`.
The map describes the checkout, not the currently deployed site.
