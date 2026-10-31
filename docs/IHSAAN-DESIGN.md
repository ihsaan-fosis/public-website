---
version: "alpha"
name: "IHSAAN"
description: "IHSAAN brand colours, Poppins typography, and public website component rules."
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

# IHSAAN design reference

Source: the supplied 10-page IHSAAN Brand Guidelines, September 2026.
Sections 1 to 8 distinguish source rules from product interpretations.
Section 9 describes the public website and overrides the UI interpretations in
sections 5 to 7. Website additions are not approved core brand standards.

## 1. Brand character

The brand guide uses white or IHSAAN Blue backgrounds, left-aligned content,
bold Poppins headings, thin blue rules, small uppercase labels, and open space.
The guide has little ornament and no visible shadows.

The logo combines a mountain with a winding path or river.
It is a brand identifier, not a repeated decoration.
Purple and light blue support the primary IHSAAN Blue.

## 2. Brand colours

The palette has these values:

| Colour | Hex | RGB | CMYK | Role |
| --- | --- | --- | --- | --- |
| IHSAAN Blue | `#0A3463` | `10, 52, 99` | `90, 47, 0, 61` | Primary colour, headings, rules, actions, and brand panels. |
| IHSAAN Purple | `#65408A` | `101, 64, 138` | `27, 54, 0, 46` | Supporting accent and secondary emphasis. |
| IHSAAN Light Blue | `#4C78B8` | `76, 120, 184` | `59, 35, 0, 28` | Supporting accent and lighter sections. |
| Black | `#000000` | `0, 0, 0` | `0, 0, 0, 100` | Text colour named on page 10 of the source. |
| White | `#FFFFFF` | Standard white | Not specified | Backgrounds, text, and logos on IHSAAN Blue. |

### Unresolved text-colour conflict

Page 10 defines Black `#000000` for text. Page 8 prohibits plain black on white.
The machine-readable token above follows page 10's explicit palette value.
The brand owner still needs to resolve the contradiction.
The conflict is not an approved exception.

### Source colour pairings

The guide permits these pairings, subject to the text-colour conflict:

- IHSAAN Blue with white text or the white logo.
- White with IHSAAN Blue headings or logo and black body text.
- IHSAAN Purple with white text.
- IHSAAN Light Blue with black text.
- A light background with the Nearly Black mountain mark.

The guide provides no numeric value for the Nearly Black logo variant.

### Contrast reference

These ratios derive from the supplied hex values:

| Foreground and background | Contrast | WCAG result |
| --- | ---: | --- |
| White on IHSAAN Blue | `12.47:1` | AAA for normal text. |
| White on IHSAAN Purple | `7.91:1` | AAA for normal text. |
| White on IHSAAN Light Blue | `4.48:1` | Below AA for normal text. Suitable only for large text. |
| Black on white | `21.00:1` | AAA for normal text. |
| Black on IHSAAN Light Blue | `4.69:1` | AA for normal text. |
| Black on IHSAAN Purple | `2.65:1` | Below AA. White is the text pairing on purple. |
| IHSAAN Blue on IHSAAN Light Blue | `2.78:1` | Below AA. Not a text pairing. |
| IHSAAN Blue on IHSAAN Purple | `1.58:1` | Below AA. Not a text pairing. |

The source defines no success, warning, error, or information colours.
Such colours are product additions, not source values.
Their use requires a product need and less visual emphasis than IHSAAN Blue.

## 3. Typography

Poppins is the brand typeface. The source presents Regular, Medium, and Bold
and specifies ExtraBold for primary headings.
The web font stack is:

```css
font-family: "Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

The source defines this hierarchy:

| Role | Size | Weight |
| --- | ---: | ---: |
| Primary heading | `34px` | ExtraBold `800` |
| Subheading | `20px` | Bold `700` |
| Body | Maximum `13px` | Regular `400` |
| Supporting emphasis | `13px` | Medium `500` |

The source prohibits bold body copy and body sizes above `13px` in brand
compositions. Accessibility-sensitive product interfaces can use larger body
text while retaining Poppins Regular and the hierarchy.

Headings are compact and heavier than body text.
Explanatory copy uses sentence case.
Short navigation labels, section labels, and metadata can use uppercase.
The source defines no line heights or letter spacing.
Legibility, rather than extreme spacing, determines those product choices.

## 4. Logo rules

The complete wordmark is the default identifier.
Its custom letterforms are artwork, not text recreated with Poppins or another
font. The mountain symbol is part of the wordmark.

The guide approves three mountain-mark variants:

- IHSAAN Blue on a light background.
- White on IHSAAN Blue.
- Nearly Black on a light background, without a supplied hex value.

The logo remains complete, opaque, correctly coloured, and undistorted.
The guide prohibits stretching, compression, skewing, warping, opacity changes,
unapproved colours, and cropping.

The source supplies no clear-space measurements, minimum size, monochrome print
specification, or downloadable asset set. Exact values for those gaps are not
official brand rules.

## 5. UI interpretations of the brand guide

The source is a brand guide, not a UI specification.
These interpretations describe brand-led product work.
Section 9 replaces them for this public website.

| Element | Interpretation |
| --- | --- |
| Primary action | IHSAAN Blue fill, white Poppins Bold or Medium text. |
| Secondary action | White fill, IHSAAN Blue text, thin blue border. |
| Accent action | Occasional purple fill with white text. Blue remains the dominant action. |
| Containers | White backgrounds, open space, thin blue dividers, and occasional purple or light-blue accents. |
| Brand panel | Occasional full IHSAAN Blue panel for an introduction, action, or section change. |
| Navigation | White or IHSAAN Blue background, complete wordmark, short Poppins Medium or Bold labels. |
| Active navigation | IHSAAN Blue, an underline, or a filled treatment. |
| Inputs | White fields and the defined text token, subject to the source conflict. Blue indicates focus and selection. |
| Labels | Short and visually stronger than helper text. |

These interpretations exclude dense card grids, decorative frames, glass
effects, gradients, glow, and heavy shadows. The source defines no corner radius.
A product's selected radius remains consistent within that product.
Accessible error and success colours require separate product definitions.

## 6. Layout interpretations

The source uses a left-aligned editorial layout with thin horizontal rules.
Headings and logos have open space around them.
Secondary labels remain smaller than the main heading or content group.

Responsive layouts preserve the hierarchy and stack content before columns
become cramped. The full wordmark remains uncropped.
The mountain mark replaces it only when the full wordmark cannot fit.
Touch targets follow platform accessibility guidance, not a measurement from
the source guide.

## 7. Stitch generation reference

These descriptions summarize the brand interpretations, not the public website:

| Aspect | Reference description |
| --- | --- |
| Palette | IHSAAN Blue `#0A3463`, purple `#65408A`, light blue `#4C78B8`, black `#000000`, and white `#FFFFFF`. |
| Type | Poppins, compact ExtraBold headings, and Regular body copy. |
| Structure | Left alignment, thin navy rules, open space, and flat backgrounds. |
| Brand landing page | White background, full blue wordmark, a 34px heading, 13px body copy, thin rules, and one navy action. |
| Information dashboard | White backgrounds, compact navy navigation, left alignment, and blue controls with supporting accents. |
| Campaign panel | Full-width IHSAAN Blue, white ExtraBold heading and copy, the approved white mountain mark, and a white action. |

Neon, glossy, glass-like, playful, or heavily decorated treatments are outside
these interpretations. Additional colours, tints, and gradients require an
explicit product need. The unapproved cream and nearly-black values from the
2025 palette are not new brand tokens.

## 8. Source limits

The supplied guide defines logo variants, logo misuse rules, Poppins weights,
three core type sizes, and named palette colours.
It does not define spacing tokens, grid dimensions, breakpoints, corner radii,
shadows, motion, icons, photography, illustrations, minimum logo size, or logo
clear space.

Product additions remain separate from the source rules.
They require brand-owner approval before they become core brand standards.
The unresolved black-on-white conflict remains visible rather than becoming
an invented official rule.

## 9. Public website design

`src/app/page.tsx` is the reference implementation for public pages.
The website retains Poppins, the brand palette, and logo rules from sections
2 to 4. This section replaces the UI interpretations in sections 5 to 7.
Section 9.11 records departures that still need brand-owner approval.

### 9.1 Page structure

The public website uses photographs in inset, rounded frames, large headings,
thin rules, and scroll-driven motion. Off-white sections alternate with dark
photo frames. Copy over photographs is cream on a navy shade.
Lavender appears in small accents, such as the full stop in a hero title.
Photo shades have no purple wash.

An owner decision dated 14 October 2026 separates this style from the member
portal at `portal.ihsaan.network`.
Public pages exclude flat brand-colour panels, raised text boxes,
boxed lists, dashboard stat tiles, and card-like tables.

New public work has no eyebrows. An eyebrow is a small, uppercase or tracked
label set above a heading, with or without a dot. Do not add `Eyebrow` or copy
its styling. A title is either the heading itself or `sr-only` when a statement
carries the section. The `Eyebrow` uses already in the footer, resources, and
`EventList` are legacy. Remove them when you next change those surfaces.
The member portal's purple, white, and sky motif panels do not belong here.

Text lists sit directly on the page background under thin rules.
An item without its own photograph can share a section with one `PhotoFrame`.
The white partner-logo tiles in `PartnerWall` are an exception because the logos
need a light background.

### 9.2 Colour tokens

`src/app/globals.css` defines the tokens. Components use those tokens, not
additional hex values.
`data-theme="light"` or `data-theme="dark"` on `<html>` selects these values:

| Tailwind class | Light | Dark | Role |
| --- | --- | --- | --- |
| `bg-page` | `#f6f4f0` | `#061629` | Page and section background. |
| `bg-surface` | `#ffffff` | `#0b2240` | Reserved. Public pages exclude raised text boxes. |
| `bg-surface-2` | `#ece7f2` | `#142c52` | Second raised tone. |
| `text-ink` | `#0a1a33` | `#f4f1ea` | Text and lines. |
| `bg-accent` | `#65408a` | `#e1d7eb` | Small active states, such as the open FAQ button and skip link. |
| `text-accent-ink` | `#ffffff` | `#061629` | Text on `accent`. |

Fixed tokens keep photographs consistent in both themes:

| Token | Value | Role |
| --- | --- | --- |
| `night` | `#061629` | Photo shade and dark overlays. |
| `night-2` | `#0b2240` | Frame background while a photograph loads. |
| `cream` | `#f4f1ea` | Copy on photographs. |
| `ihsaan-lavender` | `#e1d7eb` | Hero full stops and the dark-theme rule accent. |
| `ihsaan-sky` | `#4c76af` | Reserved member-portal motif C value, not used on public pages. |

`ihsaan-blue`, `ihsaan-purple`, and `ihsaan-light-blue` retain their brand roles.
Opacity classes derive muted tones from `ink` on the page or `cream` on photos:

| Class | Use |
| --- | --- |
| `text-ink` | Titles, labels, and links. |
| `text-ink/75` | Articles and legal copy. |
| `text-ink/70` | Leads and card copy. |
| `text-ink/65` | Asides, metadata, and fine print. The lowest readable-text step. |
| `text-ink/45` and lower | Decoration, including list numerals. |
| `border-ink/10` | Row dividers. |
| `bg-ink/15` | Thin dividers. |
| `ring-ink/25` | Ghost-button outline. |
| `ring-ink/5` | Partner-logo tile outline. |
| `text-cream/70` to `text-cream/90` | Intro and card copy over a photo shade. |
| `text-cream/20` | Large decorative numerals. |

Brand-coloured elements need `dark:` variants.
The theme tokens handle the other colour changes.

### 9.3 Type scale

All website text uses Poppins. Headings are heavy and tightly spaced.
Labels are small, bold, uppercase, and widely spaced. Body copy is Regular.

| Role | Classes or size | Component or use |
| --- | --- | --- |
| Frame title | `.hero-title-editorial`, `font-extrabold`, `leading-[1.08]`, `tracking-[-0.03em]`, `text-cream`, `clamp(2.25rem, 4.4vw, 4rem)` | `PhotoHero`, `ImpactStory`, `ClosingCta`. |
| Statement | `text-3xl sm:text-5xl lg:text-[3.5rem]` with `displayClass` | Home promise. |
| Text-hero title | `text-[2.4rem] leading-[1.05] sm:text-6xl` with `displayClass` | A page without a photo hero. |
| Section title | `text-[2rem] leading-[1.05] sm:text-5xl` with `displayClass` | `SectionHeading`, `SectionTitle`. |
| Compact section title | `text-[1.75rem] leading-[1.1] sm:text-4xl` with `displayClass` | `SectionTitle compact`, article subheadings. |
| Photo-card title | `text-3xl sm:text-4xl font-extrabold tracking-[-0.035em] text-cream` | Photo cards. |
| Editorial-list title | `text-2xl sm:text-3xl leading-tight font-medium tracking-[-0.03em] text-ink`, up to `sm:text-[2.6rem]` for short names | Text list rows. |
| Reading copy | `text-[15px] leading-7` | Paragraphs and card bodies. |
| Short copy | `text-sm leading-6` | Hero intros, asides, and photo-card copy. |
| Fine print | `text-[13px] leading-6 text-ink/65` | Notes and disclaimers. |
| Label above a heading (legacy) | `text-[11px] font-bold tracking-[0.18em] uppercase` | `Eyebrow`. Do not use in new work (section 9.1). |
| Button label | `text-[12.5px] font-bold tracking-[0.14em] uppercase` | `ButtonLink`. |
| Decorative numeral | `text-[5.5rem] sm:text-[7.5rem] font-extrabold tracking-[-0.06em] text-cream/20` | Numbered photo cards. |

`displayClass` in `src/components/ui.tsx` is
`font-extrabold tracking-[-0.035em] text-ink`.
Large headings on the page background use it.
Below 40rem, `.hero-title-editorial` uses `min(3.5rem, 14vw)`.
At 64rem and above, `PhotoHero` adds `.hero-title-photo` with
`clamp(3.5rem, 5vw, 5.5rem)`.
Its intro also differs from the short-copy row: 15px by default, `text-sm` at
`sm`, and 17px with `lg:leading-7` at `lg`.
Titles use sentence case. Short frame titles end with a full stop.
`PhotoHero` colours each full stop lavender and breaks the line after it.

### 9.4 Layout and spacing

`Container` uses `max-w-7xl px-5 sm:px-10`.
Reading columns use `max-w-3xl` inside it. There is no second page-level width.
Frames sit outside `Container` in a `p-2 sm:p-3` gutter.
Their copy uses `px-5 sm:px-10 lg:px-12` and sits at the bottom left.
On `lg` screens, the intro and actions share a row below the title.
The intro stays left, and the actions sit right.

Blocks use these spacing values:

| Block | Padding |
| --- | --- |
| Default `Section` | `py-20 sm:py-28` |
| Statement | `py-24 sm:py-36` |
| Text hero | `pt-16 pb-10 sm:pt-24 sm:pb-14` |
| Continuation of the previous section | `className="pt-0 sm:pt-0"` |

Heading-to-content gaps are `mt-12` for grids, `mt-10` for lists, and `mt-14`
for media walls.
The radius scale is:

| Radius | Use |
| --- | --- |
| `rounded-[28px]` | Frames and tall photo cards. |
| `rounded-[22px]` | Grid photo cards and gallery tiles. |
| `rounded-2xl` | Small tiles, including partner logos. |
| `rounded-xl` | Buttons and navigation items. |
| `rounded-full` | Badges and circular controls. |

Photo-card grids use `gap-4`.
They start at one column, become `sm:grid-cols-2` or `md:grid-cols-2`, and reach
`lg:grid-cols-3`. Two-part layouts stack on phones and use these wide-screen grids:

- `lg:grid-cols-[0.8fr_1.2fr]` in `FaqSection`.
- `lg:grid-cols-[1.2fr_1fr]` when the right column contains unboxed statistics.
- `lg:grid-cols-[0.8fr_1fr]` for a photograph beside an editorial list.

Text and blocks are left aligned. Frame actions and section-heading asides can
move right on wide screens.

### 9.5 Components and patterns

These components and source patterns define the public pages:

| Component or pattern | Source | Contract |
| --- | --- | --- |
| Photo hero | `PhotoHero` in `src/components/ui.tsx` | Opens most pages. `tall` is for home only. A short title, optional one- or two-sentence `intro`, and at most two action children. |
| Text hero | `src/app/resources/[slug]/page.tsx`, `LegalPage` | Opens a page without its own photo. Left-aligned `h1`, a 15px lead at `text-ink/70`, and at most one action. Breadcrumbs, `Eyebrow`, and metadata are optional. |
| Statement | `ScrollWords` in `src/components/motion.tsx` | One promise sentence inside an `h2`, at most once per page. |
| Section heading | `SectionHeading` in `src/components/ui.tsx` | Full-width title with optional one-sentence `aside` and button `action`. |
| Section title | `SectionTitle` in `src/components/ui.tsx` | Narrow-column title or title inside a `data-reveal` wrapper. `compact` applies beside other content. |
| Photo card | `InvolvementPanels`, `OfferSlide`, programme cards, blog cards | An item with its own photo. Filled image, `from-night/95 via-night/60 to-night/10` shade, top-right numeral, cream title, and `white` button. |
| Editorial list | `TeamChapter`, programme highlights, `/start`, `/resources`, `EventList` in `src/components/event-list.tsx` | Unboxed rows with `border-t` on the list, `border-b` on each row, `border-ink/10`, and staggered `data-reveal`. Optional `text-ink/45` numerals. |
| Photo frame | `PhotoFrame` in `src/components/ui.tsx` | A tall photo beside an editorial list in a `lg:grid-cols-[0.8fr_1fr]` split. `sticky` keeps the photo visible beside a long list. |
| Statement with opening frame | `PurposeChapter` in `src/components/story.tsx` | A statement followed by a full-width `.story-slit` photo frame with cream copy. |
| FAQ | `FaqSection` in `src/components/sections.tsx` | Expandable `details` rows under thin rules. |
| Pinned sequence | `ImpactStory`, `ProgrammesCarousel`, `MapChapter` | A section whose content changes while it stays in view during scroll. At most one per page. |
| Media wall | `GalleryParallax`, `PartnersSection`, `PartnerWall` | Photo or logo groups. Logos keep colour in light mode and use grayscale at 65% opacity in dark mode. |
| Photo band | `PhotoBand`, `ClosingCta` in `src/components/sections.tsx` | A photo frame within the page or a closing action. |

Photo-backed content uses a photo hero when an image is available.
Components keep their shared styling rather than receiving a page-specific design.

### 9.6 Buttons and links

`ButtonLink` styles navigation actions.
`external` applies to off-site and `mailto:` links.
Labels are short and uppercase, with no arrows or icons.
Non-link controls share `buttonClassName` from `src/components/ui.tsx`.

| Tone | Use |
| --- | --- |
| `accent` | Default primary action on the page background. Blue in light mode, light blue with black text in dark mode. |
| `light-outline` | Secondary action in a photo frame or band. |
| `white` | Primary action in a photo hero, dark photo card, or photo band. |
| `ghost` | Secondary action on the page background. |
| `solid` | Standalone action in a text column, such as the FAQ contact link. |

Action groups contain at most two buttons, primary first, in a
`flex flex-wrap gap-3` row. `size="compact"` is reserved for the header.
Inline links use `font-medium text-ink underline underline-offset-4`.
List links can use `hover:underline` instead of a permanent underline.

### 9.7 Motion and fallback behavior

Motion is slow and optional. Every effect has a static fallback.
The implementation uses these patterns:

| Pattern | Behavior |
| --- | --- |
| Entrance | `data-reveal` lets `RevealObserver` fade and lift content on entry. Siblings use `style={revealDelay(index % 3)}`. |
| Shared photo hover | `PhotoFrame` and the shared offer cards scale images to 110% over 1200ms with `ease-out`. |
| Card hover | Cards can lift by `-translate-y-1` to `-translate-y-1.5`. |
| Button hover | Buttons lift by 2px with a soft shadow. |
| Scroll-driven motion | `.parallax-zoom`, `.parallax-column`, and `hero-*` use CSS scroll timelines under `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`. |

The motion contract has these constraints:

- Content renders without JavaScript. Hidden reveal states apply only under `.js`.
- Under `prefers-reduced-motion: reduce`, content shows the end state.
- Looped video and marquees have pause controls under WCAG 2.2.2.
- Logo motion can wipe or move the logo, but does not change its opacity.
- Invisible content cannot receive keyboard focus.
  `.why-reveal-aside:focus-within` is a source example.

### 9.8 Light and dark themes

The layout's pre-paint script selects the stored or system theme.
`ThemeToggle` in the footer changes it.
Theme tokens update page colours. Frames and photo copy keep their fixed tones.
Brand-coloured elements have dark variants, including the light-blue `accent`
button. Public pages support both themes.

### 9.9 Page patterns

Pages combine the components in section 9.5.
A photo frame normally opens and closes a page, with text sections between them.
Reading pages and conversion pages have the exceptions below.

| Page type | Examples | Pattern |
| --- | --- | --- |
| Landing | `/` | Tall photo hero with two actions, statement, `ImpactStory`, `ProgrammesCarousel`, photo cards, media walls, FAQ, closing action. |
| Index | `/programmes`, `/blog`, `/resources`, `/gallery` | Photo hero, section heading, photo cards or an editorial list beside a sticky photo, optional supporting section, closing action. |
| Detail | `/programmes/[slug]` | Photo hero, split introduction with optional unboxed statistics, highlights beside a photo, optional events and quote, related links, closing action. |
| Story | `/about` | Photo hero, vision statement, mission over an opening photo frame, photo cards, values photo band, pinned map, team list beside a photo, closing frame. |
| Conversion | `/start`, `/contact` | Photo hero, unboxed contact columns or next steps beside a photo, short closing line. No repeated home audience switcher, FAQ, partners, or closing photo band. |
| Listing | `/events` | Photo hero with one action, `SectionTitle` per group, `EventList`, fine print, closing action. |
| Article | `/blog/[slug]`, `/resources/[slug]` | Photo hero when a photo exists, otherwise text hero. A `max-w-3xl` column with 15px `text-ink/75` copy, breadcrumb, optional `Eyebrow`, metadata, lead, contents, author sections, and closing action. Rules use `border-ink/10`. |
| Utility | `/privacy`, `/terms` | `LegalPage`, text hero with date, and `max-w-3xl` ruled sections. No closing action. |
| Error | 404 | `PhotoHero` with `lcp={false}` and two actions. No extra sections. |

### 9.10 Page acceptance criteria

Public pages meet these criteria:

- One `h1`, in a `PhotoHero` or text hero.
- Section titles from `SectionHeading`, `SectionTitle`, or `displayClass`, using
  the sizes in section 9.3.
- Colours from section 9.2 and fixed tones over photos.
- Radii from section 9.4.
- Button-styled links from `ButtonLink`, with tones from section 9.6.
- Content reveals and new motion that meet section 9.7.
- A `ClosingCta` or page-specific `PhotoBand` on pages that direct visitors onward,
  except the conversion-page pattern's short closing line.
- No horizontal scroll at 390px or 1440px, in either theme or with reduced motion.
- No member-portal motif panels, raised text cards, or boxed lists.
- No eyebrows above headings (section 9.1).

### 9.11 Departures from the brand guide

These website choices require brand-owner sign-off before becoming core standards:

| Choice | Difference from the source |
| --- | --- |
| Body size | Reading copy is 15px and short copy is 14px, above the 13px maximum. The accessibility exception is recorded in section 3. |
| Heading size | Wide-screen headings exceed 34px. |
| Page colours | The page uses off-white `#f6f4f0` and a navy dark theme with cream text, rather than pure white. The cream resembles the superseded 2025 palette. |
| Gradients and shadows | Navy photo gradients and soft button-hover shadows are website additions. No resting shadows or blurred colour backgrounds sit behind sections. |

### 9.12 Recorded implementation differences

As recorded in October 2026, the text hero is duplicated in
`src/app/resources/[slug]/page.tsx` and `LegalPage` at different title sizes.
A shared text-hero component does not yet define those pages.

The home page renders both `ImpactStory` and `ProgrammesCarousel`.
That implementation conflicts with the recorded one-pinned-sequence limit in
section 9.5. The intended limit is unresolved.
