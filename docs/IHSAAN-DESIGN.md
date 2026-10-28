---
version: "alpha"
name: "IHSAAN"
description: "A calm, disciplined visual identity built around deep IHSAAN Blue, purple and light-blue accents, generous whitespace, and the Poppins type family."
colors:
  primary: "#0A3463"
  text: "#000000"
  purple: "#65408A"
  light-blue: "#4C78B8"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Poppins"
    fontSize: "34px"
    fontWeight: 800
  heading:
    fontFamily: "Poppins"
    fontSize: "20px"
    fontWeight: 700
  body:
    fontFamily: "Poppins"
    fontSize: "13px"
    fontWeight: 400
  body-medium:
    fontFamily: "Poppins"
    fontSize: "13px"
    fontWeight: 500
components:
  brand-panel:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
  light-panel:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
  purple-panel:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.white}"
  light-blue-panel:
    backgroundColor: "{colors.light-blue}"
    textColor: "{colors.text}"
  primary-action:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
---

# Design System: IHSAAN

**Source:** IHSAAN Brand Guidelines, September 2026
**Status:** Extracted from the supplied 10-page brand guide. UI-specific guidance is identified as a conservative translation where the source is silent.
**Website:** Sections 1 to 8 describe the brand. Section 9 describes how the public website applies it, using the home page as the reference. For any public page, build from section 9.

## 1. Visual Theme & Atmosphere

IHSAAN should feel trustworthy, purposeful, calm, and established. The identity relies on a restrained palette, bold geometric typography, strong horizontal structure, and generous open space. It should not feel decorative, playful, glossy, or visually crowded.

The mountain and winding path or river in the logo suggest direction, aspiration, and a journey toward a clear goal. Use the mark as a focused brand signature rather than as a repeated decorative motif. Deep IHSAAN Blue provides authority and confidence. IHSAAN Purple and IHSAAN Light Blue extend the system with two supporting accents.

The source guide uses:

- Large areas of uninterrupted white or IHSAAN Blue.
- Strong left alignment.
- Bold, compact headings.
- Thin blue horizontal rules.
- Small uppercase labels and metadata.
- Minimal ornament and no visible shadow language.

## 2. Color Palette & Roles

### Primary Foundation

| Token | Value | Source values | Role |
| --- | --- | --- | --- |
| IHSAAN Blue | `#0A3463` | RGB `10, 52, 99`; CMYK `90, 47, 0, 61` | Primary brand color, major headings, rules, key actions, full-bleed brand panels |
| White | `#FFFFFF` | Standard white | Text and logo on IHSAAN Blue, clean page backgrounds |

### Supporting Brand Colors

| Token | Value | Source values | Role |
| --- | --- | --- | --- |
| IHSAAN Purple | `#65408A` | RGB `101, 64, 138`; CMYK `27, 54, 0, 46` | Supporting accent, secondary emphasis, or distinct branded section |
| IHSAAN Light Blue | `#4C78B8` | RGB `76, 120, 184`; CMYK `59, 35, 0, 28` | Supporting accent, informational emphasis, or lighter branded section |

### Typography & Text Hierarchy

| Token | Value | Source values | Role |
| --- | --- | --- | --- |
| Black | `#000000` | RGB `0, 0, 0`; CMYK `0, 0, 0, 100` | Text color named by the September 2026 palette |

The updated guide contains a source conflict. Page 10 explicitly defines Black `#000000` as the text color, while page 8 still says never to use plain black against a white background. This file uses the newer explicit palette value as the machine-readable text token, but the contradiction should be resolved by the brand owner before final production use.

### Approved Color Pairings

- IHSAAN Blue background with white text or the white logo.
- White background with IHSAAN Blue headings or logo and black body text, subject to the source conflict above.
- IHSAAN Purple background with white text.
- IHSAAN Light Blue background with black text.
- Light background with the approved Nearly Black mountain-mark variant. The updated guide does not provide a numeric color value for this logo treatment.

### Accessibility

The following contrast ratios are derived from the supplied hex values:

| Foreground and background | Contrast | WCAG guidance |
| --- | ---: | --- |
| White on IHSAAN Blue | `12.47:1` | Passes AAA for normal text |
| White on IHSAAN Purple | `7.91:1` | Passes AAA for normal text |
| White on IHSAAN Light Blue | `4.48:1` | Fails AA narrowly for normal text; use only for large text |
| Black on white | `21.00:1` | Passes AAA for normal text |
| Black on IHSAAN Light Blue | `4.69:1` | Passes AA for normal text |
| Black on IHSAAN Purple | `2.65:1` | Fails AA; use white on purple instead |
| IHSAAN Blue on IHSAAN Light Blue | `2.78:1` | Fails AA; do not use for text |
| IHSAAN Blue on IHSAAN Purple | `1.58:1` | Fails AA; do not use for text |

No success, warning, error, or informational colors are defined in the source. Add them only when a product requires them, and keep them visually subordinate to IHSAAN Blue.

## 3. Typography Rules

### Font Family

Use **Poppins** throughout the brand system. The guide explicitly presents Regular, Medium, and Bold weights, and specifies ExtraBold for primary headers.

Recommended web font stack:

```css
font-family: "Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Hierarchy & Weights

| Role | Size | Weight | Use |
| --- | ---: | ---: | --- |
| Primary header | `34px` | ExtraBold `800` | Page titles and major section titles |
| Subheading | `20px` | Bold `700` | Section headings and important grouped content |
| Body | Maximum `13px` | Regular `400` | Paragraphs, descriptions, and explanatory copy |
| Supporting emphasis | `13px` | Medium `500` | Short labels or restrained emphasis |

The source explicitly states that body copy should not be bold and should not exceed `13px`. Treat that as a rule for brand-led compositions. For accessibility-sensitive product interfaces, use a larger body size when necessary while preserving Poppins Regular and the same hierarchy.

### Typographic Character

- Use compact, assertive headings with clear weight contrast.
- Use sentence case for explanatory copy.
- Uppercase is appropriate for short navigational labels, section markers, and metadata.
- Keep body text light in visual weight and comfortably spaced.
- Use the defined text token consistently, while noting the unresolved black-on-white conflict in the source guide.

Line heights and letter spacing are not defined in the source. Use legible defaults and avoid extreme tracking.

## 4. Logo System

### Primary Logo

Use the complete IHSAAN wordmark as the default brand identifier. The letterforms are custom and must be treated as artwork, not recreated with Poppins or another font. The mountain symbol is integrated into the wordmark.

### Mountain Mark Variations

The guide provides three approved mountain-mark treatments:

1. IHSAAN Blue mark on a light background.
2. White mark on an IHSAAN Blue background for visibility.
3. Nearly Black mark on a light background for a neutral treatment. No hex value is supplied for this variant in the updated palette.

### Logo Misuse

Never:

- Stretch, compress, skew, or warp the logo.
- Change the logo opacity.
- Alter the approved logo colors.
- Crop any part of the logo.

Clear-space rules, minimum sizes, monochrome print specifications, and downloadable logo assets are not supplied in the source. Do not invent exact measurements for them.

## 5. Component Stylings

The source is a brand guide rather than a UI component specification. The following rules are conservative translations for Stitch and product design, not additional source requirements. For the public website, section 9 replaces sections 5 to 7.

### Buttons

- Primary action: IHSAAN Blue fill with white Poppins Bold or Medium text.
- Secondary action: white fill with IHSAAN Blue text and a thin IHSAAN Blue border.
- Optional accent action: IHSAAN Purple fill with white text. Use sparingly so the primary blue action remains dominant.
- Keep button styling clean and flat. Avoid gradients, glass effects, glow, or heavy shadows.
- The source defines no corner radius. Choose one restrained radius for the product and apply it consistently.

### Cards & Content Containers

- Prefer white surfaces with strong whitespace.
- Use IHSAAN Purple and IHSAAN Light Blue as supporting sections or accents, not as replacements for the primary blue identity.
- Use thin IHSAAN Blue dividers or borders where structure is needed.
- Avoid dense card grids, heavy elevation, and ornamental framing.
- Use a full IHSAAN Blue panel sparingly for introductions, calls to action, or major section transitions.

### Navigation

- Use a clean white or IHSAAN Blue navigation bar.
- Keep the full wordmark visible and undistorted.
- Use short Poppins Medium or Bold labels.
- Show active state through IHSAAN Blue, an underline, or a simple filled treatment.

### Inputs & Forms

- Use white fields with black text, subject to the source conflict documented above.
- Use IHSAAN Blue for focus rings, selected states, and primary controls.
- Labels should be concise and visually stronger than helper text.
- Error and success colors must be introduced accessibly because they are not defined by the source palette.

## 6. Layout Principles

### Grid & Structure

The guide uses a disciplined editorial layout. Align primary content to a clear left edge, separate sections with thin horizontal rules, and reserve broad empty areas around major headings or the logo.

### Whitespace Strategy

Whitespace is a core brand element. Use fewer, stronger elements instead of filling the canvas. Major headings should have enough surrounding space to feel deliberate and authoritative.

### Alignment & Visual Balance

- Favor left-aligned text and content blocks.
- Use full-width horizontal rules to anchor headers and footers.
- Keep secondary labels small and unobtrusive.
- Balance large open fields with one dominant heading, logo, or content group.

### Responsive Behavior & Touch

- Preserve hierarchy and whitespace as screens narrow.
- Stack content before reducing it to cramped columns.
- Keep the full wordmark uncropped. Switch to the mountain mark only when the available space genuinely cannot support the wordmark.
- Product touch targets should follow platform accessibility guidance even though the source guide does not specify them.

## 7. Design System Notes for Stitch Generation

### Language to Use

Use prompt language such as:

- "Calm, authoritative, spacious, and purpose-led."
- "Deep institutional navy with restrained purple and light-blue accents."
- "Poppins typography with compact ExtraBold headings and light Regular body copy."
- "Editorial alignment, thin navy rules, minimal ornament, and generous whitespace."
- "Flat surfaces with no gradients or heavy shadows."

Avoid prompt language such as:

- Neon, playful, bubbly, maximalist, glossy, glassmorphic, highly decorative, or colorful.
- Dense dashboards with many competing accents.
- Unapproved cream or nearly-black colors carried over from the superseded 2025 palette.

### Color References

- "IHSAAN Blue `#0A3463`"
- "IHSAAN Purple `#65408A`"
- "IHSAAN Light Blue `#4C78B8`"
- "Black `#000000`"
- "White `#FFFFFF`"

Do not ask Stitch to invent additional brand blues, purples, tints, or gradients unless the product requirement explicitly needs them.

### Component Prompts

1. **Brand landing page:** "Create a spacious IHSAAN landing page with a white background, the full blue wordmark, a 34px Poppins ExtraBold headline in `#0A3463`, 13px Poppins Regular body text in `#000000`, thin navy dividers, and one solid navy call-to-action button. Add small, restrained accents in IHSAAN Purple `#65408A` and IHSAAN Light Blue `#4C78B8`. Use no gradients or heavy shadows."

2. **Information dashboard:** "Create a calm IHSAAN dashboard using white surfaces, Poppins typography, a compact navy sidebar, strong left alignment, thin navy separators, and generous whitespace. Use `#0A3463` for navigation, headings, focus states, and primary actions; `#4C78B8` for restrained informational emphasis; and `#65408A` for occasional secondary emphasis."

3. **Campaign panel:** "Create a full-width IHSAAN Blue `#0A3463` campaign panel with a large white Poppins ExtraBold heading, concise white copy, the approved white mountain mark, and a simple white action. Keep the composition minimal and spacious."

### Incremental Iteration

When refining a generated screen:

1. Correct the palette and logo treatment first.
2. Correct Poppins weights and the `34px`, `20px`, and `13px` hierarchy.
3. Increase whitespace and simplify crowded regions.
4. Replace decorative effects with flat surfaces and thin rules.
5. Check that body copy uses the defined Black `#000000` text token, while keeping the documented source conflict visible for brand-owner review.
6. Verify that the logo is complete, opaque, correctly colored, and undistorted.

## 8. Source Fidelity & Known Gaps

The supplied guide defines the logo variants, four logo misuse rules, the Poppins family, three core type sizes, and four named palette colors: IHSAAN Blue, Black, IHSAAN Purple, and IHSAAN Light Blue. It does not define spacing tokens, grid dimensions, responsive breakpoints, corner radii, shadows, motion, iconography, photography, illustration style, minimum logo size, or logo clear space. It also retains a Nearly Black logo variation without publishing its numeric color value.

The guide currently contradicts itself on body text: page 8 rejects plain black against white, while page 10 defines `#000000` as Black for text. This unresolved conflict is part of the source and must not be hidden or silently rewritten as an official rule.

Preserve these gaps rather than presenting invented values as official IHSAAN standards. Any product-level additions should be documented separately and approved before becoming part of the core brand system.

## 9. Website Design Language

The home page (`src/app/page.tsx`) is the reference implementation for every public page on ihsaan.network. This section records its system so that any page type, from a programme landing page to a privacy policy, reads as part of the same site. The values below are product-level additions, as section 8 requires. They are not brand-owner approved standards.

Sections 2 to 4 still apply: the palette, the logo rules, and Poppins. Where this section differs from sections 5 to 7, this section wins for the website. Section 9.11 lists the deliberate departures from the brand guide.

### 9.1 Character

The site is cinematic and editorial. Inset, rounded photo frames carry a navy shade and one large, tight headline. A warm off-white page sits between the frames, with hairline rules, small uppercase labels, and plenty of space. Motion is slow and tied to scroll.

Every page alternates two surfaces:

- **Frames.** Dark photo panels with cream copy. They open and close a page and mark its big moments.
- **Sections.** Calm themed sections on `bg-page` that carry the detail.

Brand colour appears as small, deliberate marks rather than large fills: the lavender full stop in a hero title. Photo shades stay navy, with no purple wash. Compose pages from the blocks in section 9.5. Do not restyle a block for one page.

**Public pages are photo and motion led, not member platform styled.** Owner decision, 14 October 2026. Every public page takes its look from the home page: photographs in rounded frames and cards, large tight headlines, and slow scroll-driven motion (statements that light up word by word, frames that open or zoom, pinned sequences). The member platform aesthetic belongs to `portal.ihsaan.network` only. Do not use it on public pages. That means:

- No flat brand-colour blocks. The purple, white, and sky motif panels (`Panel`) are member platform components.
- No boxed content. Text-led content does not sit in raised `bg-surface` boxes, card grids, or boxed lists.
- No dashboard patterns, such as stat tiles in boxes, form-like rows, or tables of cards.

Put text-led content on the page surface (a statement, or an editorial list under hairline rules), or over a photograph (a frame, photo band, or photo card). Where an item has no photo of its own, pair the whole section with one photograph. `Panel` was removed from this repo in October 2026; the only remaining white tiles are the partner logos in `PartnerWall`, which need a light ground.

### 9.2 Colour tokens

All tokens live in `src/app/globals.css`. Do not add hex values in components.

Theme tokens flip with `data-theme` on `<html>`:

| Tailwind class | Light | Dark | Role |
| --- | --- | --- | --- |
| `bg-page` | `#f6f4f0` | `#061629` | Page and section background |
| `bg-surface` | `#ffffff` | `#0b2240` | Reserved. Public pages do not use raised boxes (section 9.1) |
| `bg-surface-2` | `#ece7f2` | `#142c52` | Second raised tone |
| `text-ink` | `#0a1a33` | `#f4f1ea` | Foreground text and lines |
| `bg-accent` | `#65408a` | `#e1d7eb` | Small active states (open FAQ button, skip link) |
| `text-accent-ink` | `#ffffff` | `#061629` | Text on `accent` |

Fixed tones do not flip. Photos look the same in both themes, so copy on a photo uses these tones:

| Tailwind class | Value | Role |
| --- | --- | --- |
| `night` | `#061629` | Photo shade and dark overlays |
| `night-2` | `#0b2240` | Frame background while a photo loads |
| `cream` | `#f4f1ea` | Headlines and copy on photos |
| `ihsaan-lavender` | `#e1d7eb` | Full stops in hero titles, dark-theme rule accent |
| `ihsaan-sky` | `#4c76af` | Member platform motif C only. Not used on public pages |

The brand colours `ihsaan-blue`, `ihsaan-purple`, and `ihsaan-light-blue` keep their section 2 roles.

Opacity steps derive every muted tone from `ink` (on the page) or `cream` (on photos):

| Step | Use |
| --- | --- |
| `text-ink` | Titles, labels, links |
| `text-ink/75` | Long reading copy (articles, legal text) |
| `text-ink/70` | Leads and card copy |
| `text-ink/65` | Asides, metadata, and fine print. This is the lowest step for readable text. |
| `text-ink/45` and lower | Decoration only, such as list numerals |
| `border-ink/10` | Dividers between rows |
| `bg-ink/15` | Hairlines and soft dividers |
| `ring-ink/25` | Ghost button outline |
| `ring-ink/5` | Outline around a partner logo tile |
| `text-cream/70` to `/90` | Intro and card copy on a photo shade |
| `text-cream/20` | Giant numerals on photo cards |

Use `dark:` variants only on brand-coloured elements. The theme tokens handle everything else.

### 9.3 Type scale

Poppins at every size. Headlines are heavy and tightly tracked. Labels are small, bold, uppercase, and widely tracked. Body copy stays Regular.

| Role | Classes | Where |
| --- | --- | --- |
| Frame title | `.hero-title-editorial`, `font-extrabold`, `leading-[1.08]`, `tracking-[-0.03em]`, `text-cream`. The size is `clamp(2.25rem, 4.4vw, 4rem)`. | `PhotoHero`, `ImpactStory`, `ClosingCta` |
| Statement | `text-3xl sm:text-5xl lg:text-[3.5rem]` with `displayClass` | Promise block on home |
| Text-hero title | `text-[2.4rem] leading-[1.05] sm:text-6xl` with `displayClass` | Pages without a photo hero |
| Section title | `text-[2rem] leading-[1.05] sm:text-5xl` with `displayClass` | `SectionHeading`, `SectionTitle` |
| Compact section title | `text-[1.75rem] leading-[1.1] sm:text-4xl` with `displayClass` | `SectionTitle compact`, article subheads |
| Card title on a photo | `text-3xl sm:text-4xl font-extrabold tracking-[-0.035em] text-cream` | Photo cards |
| Editorial list title | `text-2xl sm:text-3xl leading-tight font-medium tracking-[-0.03em] text-ink`, up to `sm:text-[2.6rem]` for short names | Rows in an editorial list |
| Reading copy | `text-[15px] leading-7` | Paragraphs, card bodies |
| Short copy | `text-sm leading-6` | Hero intros, asides, photo-card copy |
| Fine print | `text-[13px] leading-6 text-ink/65` | Notes under lists, disclaimers |
| Eyebrow | `Eyebrow`: `text-[11px] font-bold tracking-[0.18em] uppercase`, with a purple to light-blue dot | Labels above titles and lists |
| Button label | `text-[12.5px] font-bold tracking-[0.14em] uppercase` | `ButtonLink` |
| Giant numeral | `text-[5.5rem] sm:text-[7.5rem] font-extrabold tracking-[-0.06em] text-cream/20` | Numbered photo cards |

`displayClass` (`src/components/ui.tsx`) is `font-extrabold tracking-[-0.035em] text-ink`. Use it for every large headline on the page surface.

Write titles in sentence case. A frame title is short and ends with a full stop ("Get involved.", "Our story."). `PhotoHero` colours each full stop lavender and breaks the line after it.

### 9.4 Layout, spacing, and shape

**Width.** Wrap page content in `Container` (`max-w-7xl px-5 sm:px-10`). Narrow reading columns go inside it at `max-w-3xl`. Do not set another page-level max width.

**Frames.** A frame sits in a `p-2 sm:p-3` gutter, outside `Container`, so it almost touches the viewport edge. Its copy uses `px-5 sm:px-10 lg:px-12` padding, anchored bottom left. On `lg` screens, the intro and actions move into a right-hand column aligned to the title's baseline.

**Vertical rhythm.**

| Block | Padding |
| --- | --- |
| `Section` (default) | `py-20 sm:py-28` |
| Statement | `py-24 sm:py-36` |
| Text hero | `pt-16 pb-10 sm:pt-24 sm:pb-14` |
| A section that continues the previous one | Add `className="pt-0 sm:pt-0"` |

Between a heading block and its content, use `mt-12` for grids, `mt-10` for lists, and `mt-14` for media walls.

**Radius scale.**

| Radius | Use |
| --- | --- |
| `rounded-[28px]` | Frames and tall photo cards |
| `rounded-[22px]` | Grid photo cards, gallery tiles |
| `rounded-2xl` | Small tiles, such as the partner wall |
| `rounded-xl` | Buttons and navigation items |
| `rounded-full` | Badges, chips, and round icon controls |

**Grids.** Card grids use `gap-4` and step from 1 column to `sm:grid-cols-2` or `md:grid-cols-2`, then `lg:grid-cols-3`. A two-part split puts the title column on the left (`lg:grid-cols-[0.8fr_1.2fr]` in `FaqSection`, `lg:grid-cols-[1.2fr_1fr]` when the right side is unboxed stats, `lg:grid-cols-[0.8fr_1fr]` for a photo frame beside an editorial list). Everything stacks to one column on phones.

**Alignment.** Text and blocks are left aligned. Only frame actions and section-heading asides move right on wide screens.

### 9.5 Building blocks

Each block below exists in code. Reuse the component when there is one. When a block is a pattern rather than a component, copy the classes from the source named here.

| Block | Source | Use it for |
| --- | --- | --- |
| Photo hero | `PhotoHero` in `ui.tsx` | The opening of most pages. Pass `tall` only on home. Give it a short title, an optional one or two sentence `intro`, and at most two buttons as `children`. |
| Text hero | Inline in `src/app/resources/[slug]/page.tsx` and in `LegalPage` | The opening of a reading or utility page with no photo of its own. Use a photo hero whenever the page has a photo. Left-aligned `h1`, a 15px lead at `text-ink/70`, and at most one action. Breadcrumbs, an `Eyebrow`, and metadata are optional. |
| Statement | `ScrollWords` in `motion.tsx`, inside an `h2` | One sentence that states a page's promise. At most one per page. |
| Section heading | `SectionHeading` in `ui.tsx` | Every full-width section title. Takes an optional `aside` (one sentence) and `action` (buttons). |
| Section title | `SectionTitle` in `ui.tsx` | A title in a narrow column or inside an existing `data-reveal` wrapper. Pass `compact` beside other content. |
| Photo card | `InvolvementPanels` and `OfferSlide` in `sections.tsx`, programme cards on `/programmes`, post cards on `/blog` | A list item that has its own photo. Image fill, `from-night/95 via-night/60 to-night/10` shade, giant numeral top right, cream title, `white` button. |
| Editorial list | `TeamChapter` in `story.tsx`, highlights on `/programmes/[slug]`, next steps on `/start`, guides on `/resources`, `EventList` in `event-list.tsx` | Text-led items on the page surface: no box, rows under `border-ink/10` hairlines (`border-t` on the list, `border-b` on each row), editorial list titles from section 9.3, optional small `text-ink/45` numerals, `data-reveal` with a stagger. Pair it with one `PhotoFrame` in a `lg:grid-cols-[0.8fr_1fr]` split. |
| Photo frame | `PhotoFrame` in `ui.tsx` | The tall photo beside an editorial list. Pass `sticky` when the list is long so the photo stays in view. |
| Statement with opening frame | `PurposeChapter` in `story.tsx` | A statement, then a full-width frame that opens from a slit (`.story-slit`) with copy set over the photo in cream. |
| FAQ | `FaqSection` in `sections.tsx` | Questions and answers as `details` rows under hairline rules. Reuse the pattern for any expandable list. |
| Pinned sequence | `ImpactStory`, `ProgrammesCarousel` (`sections.tsx`), `MapChapter` (`story.tsx`) | A signature scroll moment. Use at most one per page. |
| Media wall | `GalleryParallax`, `PartnersSection`, `PartnerWall` in `sections.tsx` | Photos or logos in bulk. Logos keep their colour and blend into the page in the light theme. In the dark theme they fall back to grayscale at 65% opacity. |
| Photo band | `PhotoBand` and `ClosingCta` in `sections.tsx` | A frame inside the page and the closing call to action. |

### 9.6 Buttons and links

Use `ButtonLink` for every button-styled link. Pass `external` for off-site and `mailto:` links. Labels are short and uppercase, with no arrows or icons.

| Tone | Use |
| --- | --- |
| `accent` (default) | The primary action on the page surface. Blue in light mode, light blue with black text in dark mode. |
| `light-outline` | The secondary action in a frame or photo band |
| `white` | The primary action inside a photo hero, dark photo card, or photo band |
| `ghost` | A secondary action on the page surface, such as "View events" beside "All programmes" |
| `solid` | A standalone action in a text column, such as "Ask us anything" in the FAQ |

Put at most two buttons in a group, primary first, in a `flex flex-wrap gap-3` row. `size="compact"` is for the header only.

Style inline links as `font-medium text-ink underline underline-offset-4`. Links in a list can use `hover:underline` instead of a permanent underline.

### 9.7 Motion

Motion is quiet, slow, and optional. Every effect has a static fallback.

- **Entrances.** Add `data-reveal` to a content block. `RevealObserver` (mounted in the layout) fades and lifts it when it scrolls into view. Stagger siblings with `style={revealDelay(index % 3)}`.
- **Hover.** Photos scale to 110% over 1200ms `ease-out`. Cards may lift by `-translate-y-1` to `-translate-y-1.5`. Buttons lift by 2px with a soft shadow.
- **Scroll-driven.** `.parallax-zoom`, `.parallax-column`, and the `hero-*` classes in `globals.css` run on CSS scroll timelines. They apply only under `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`.

Follow these constraints for any new motion:

1. Content must render without JavaScript. Hide elements only under the `.js` class.
2. Under `prefers-reduced-motion: reduce`, render the end state.
3. Give anything that loops (video, marquee) a pause control (WCAG 2.2.2).
4. Never animate logo opacity. Wipe or move the logo instead.
5. Keep keyboard focus off invisible content. See `.why-reveal-aside:focus-within`.

### 9.8 Light and dark themes

Every page supports both themes. The layout's pre-paint script picks the stored or system theme, and the footer's `ThemeToggle` switches it.

- Build with theme tokens, and the page flips correctly with no extra work.
- Frames, photo cards, and photo bands look the same in both themes because they use the fixed tones.
- Brand-coloured elements need a dark variant. The `accent` button turns light blue.
- Check each new page in both themes before shipping.

### 9.9 Page recipes

Each recipe follows the home page's rhythm: a frame opens the page, calm sections carry the detail, and a frame closes it. Start from the recipe closest to the page, then add, remove, or reorder blocks from section 9.5. A page with a new purpose combines recipes rather than inventing a new block.

| Page type | Examples | Recipe |
| --- | --- | --- |
| Landing | `/` | Tall photo hero with two actions, statement, pinned sequence, sections with photo cards and media walls, FAQ, closing CTA |
| Index | `/programmes`, `/blog`, `/resources`, `/gallery` | Photo hero with intro, `SectionHeading` with an aside, photo cards when items have photos, otherwise an editorial list beside a sticky `PhotoFrame`, optional supporting section such as partners, closing CTA |
| Detail | `/programmes/[slug]` | Photo hero with intro and one or two actions, a split section (title and copy left, unboxed stats right when there are any), highlights as an editorial list beside a `PhotoFrame`, optional events as an editorial list, quote, and related links, closing CTA |
| Story | `/about` | Photo hero, a statement with an opening frame (vision, then mission over the photo), photo cards, a photo band (values), one pinned sequence (the map), an editorial list beside a photo (team), closing frame |
| Conversion | `/start`, `/contact` | Photo hero, then either the contact options as an unboxed two-column split or next steps as an editorial list beside a `PhotoFrame`, and a short light closing line. Keep the audience switcher, FAQ, partners and closing photo band on the home page; do not repeat them here. |
| Listing | `/events` | Photo hero with one action, one `SectionTitle` per group, an editorial list per group (`EventList`), a fine-print note, closing CTA |
| Article | `/blog/[slug]`, `/resources/[slug]` | Photo hero when the article has a photo (blog posts), otherwise a text hero (guides). A `max-w-3xl` reading column at 15px `text-ink/75` that opens with the breadcrumb, `Eyebrow`, and metadata, a larger unboxed lead, contents and author sections split by `border-ink/10` rules, closing CTA |
| Utility | `/privacy`, `/terms` | `LegalPage`: text hero with the updated date, `max-w-3xl` ruled sections. No closing CTA. |
| Error | 404 | `PhotoHero` with `lcp={false}` and two actions, nothing else |

### 9.10 New page checklist

Before shipping a page, confirm each point:

1. The page opens with a `PhotoHero` or a text hero and has exactly one `h1`.
2. Every section title uses `SectionHeading`, `SectionTitle`, or `displayClass` at a size from section 9.3.
3. Colours come from section 9.2 only, and copy on photos uses the fixed tones.
4. Radii come from the scale in section 9.4.
5. Every button is a `ButtonLink` with a tone from section 9.6.
6. Content blocks carry `data-reveal`, and any new motion meets the section 9.7 constraints.
7. A page that sends visitors onward ends with `ClosingCta` or a page-specific `PhotoBand`.
8. The page has no horizontal scroll at 390px and 1440px, in both themes and with reduced motion.
9. The page uses no member platform blocks: no motif panels and no boxed surface cards or lists (section 9.1).

### 9.11 Departures from the brand guide

The website departs from sections 3 and 5 in four places. Each needs brand-owner sign-off before it becomes part of the core system.

- **Body size.** Reading copy is 15px and short copy is 14px, above the 13px maximum. Section 3 allows larger body text for accessibility-sensitive interfaces.
- **Headline size.** Titles scale well past 34px on wide screens.
- **Off-white page and dark theme.** The page uses `#f6f4f0` rather than pure white, and a navy dark theme with cream text. The cream tone resembles the superseded 2025 palette that section 7 warns against.
- **Gradients and shadow.** Photo shades use plain navy gradients, and buttons show a soft shadow on hover. No surface has a resting shadow. No blurred colour blobs behind sections.

### 9.12 Known drift (October 2026)

These pages do not yet match sections 9.1 to 9.10. Fix them in separate changes.

- The text hero is copied between `/resources/[slug]` and `LegalPage` at different title sizes. A shared component would keep them in step.
