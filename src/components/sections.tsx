import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  CONTACT_EMAIL,
  FACTS,
  FAQS,
  GALLERY,
  GET_INVOLVED,
  INVOLVEMENT_ROUTES,
  PARTNER_TIERS,
  PROGRAMMES,
  type Partner,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { CountUp } from "./motion";
import { isDarkMotif, Panel } from "./panel";
import { Container, displayClass, Eyebrow, ButtonLink, revealDelay, Section, SectionHeading } from "./ui";

export function FactsCard({ footnote }: { footnote?: string }) {
  return (
    <Panel motif="a" art={false} className="h-full rounded-[22px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 -z-10 size-72 rounded-full bg-ihsaan-light-blue/50 blur-3xl"
      />
      <dl>
        {FACTS.map((fact) => (
          <div key={fact.label} className="flex items-baseline justify-between gap-4 border-b border-white/15 py-3.5">
            <dt className="text-[13px] text-white/75">{fact.label}</dt>
            <dd className="text-xl font-medium tracking-[-0.02em] text-white">
              <CountUp value={fact.value} />
            </dd>
          </div>
        ))}
      </dl>
      {footnote ? <p className="mt-8 max-w-[16rem] text-sm font-medium text-white">{footnote}</p> : null}
    </Panel>
  );
}

function ProgrammeSlide({ programme, index }: { programme: (typeof PROGRAMMES)[number]; index: number }) {
  return (
    <li className="shrink-0">
      <Link
        href={`/programmes/${programme.slug}`}
        className="group relative block h-[min(62svh,40rem)] min-h-[24rem] w-[82vw] overflow-hidden rounded-[28px] bg-night-2 sm:w-[48vw] lg:w-[34vw]"
      >
        <img
          src={programme.photo.src}
          alt={programme.photo.alt}
          width={programme.photo.width}
          height={programme.photo.height}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/25 to-night/10 transition-colors duration-700 group-hover:via-ihsaan-purple/45" />
        <span
          aria-hidden
          className="absolute top-4 right-6 text-[5.5rem] leading-none font-extrabold tracking-[-0.06em] text-cream/20 transition-colors duration-700 group-hover:text-cream/40 sm:text-[7.5rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="text-[11px] font-bold tracking-[0.18em] text-cream/70 uppercase">{programme.eyebrow}</p>
          <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-cream sm:text-4xl">{programme.title}</h3>
          <span className="mt-5 flex items-center gap-3 text-sm font-medium text-cream/85">
            <span aria-hidden className="h-px w-8 bg-cream/60 transition-all duration-500 group-hover:w-16 group-hover:bg-cream" />
            Explore programme
          </span>
        </div>
      </Link>
    </li>
  );
}

/** Vertical scroll drives a pinned horizontal rail on wide screens (globals.css `.hscroll`); phones swipe natively. */
export function ProgrammesCarousel() {
  return (
    <section
      id="programmes"
      aria-labelledby="programmes-title"
      className="hscroll relative py-20 sm:py-28 md:[--hscroll-length:360svh] lg:[--hscroll-length:300svh]"
    >
      <div className="hscroll-sticky">
        <Container>
          <SectionHeading
            id="programmes-title"
            eyebrow="Our programmes"
            title="Explore what we offer"
            action={
              <ButtonLink href="/programmes" tone="ghost">
                All programmes
              </ButtonLink>
            }
          />
          <div aria-hidden className="mt-8 h-px w-full bg-ink/10">
            <div className="hscroll-progress h-full bg-ink/60" />
          </div>
        </Container>
        <div data-reveal className="hscroll-viewport mt-10">
          <div className="hscroll-track w-max px-5 sm:px-10 xl:px-[calc((100vw-80rem)/2+2.5rem)]">
            <ul aria-label="Programmes" className="flex gap-4 sm:gap-6">
              {PROGRAMMES.map((programme, index) => (
                <ProgrammeSlide key={programme.title} programme={programme} index={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const WHY_LINES = ["Excellence,", "as a form of", "devotion."] as const;

/**
 * Pinned scroll sequence (globals.css `.why-reveal`): the logo panel opens into a full-bleed photo and parts
 * the words either side of it, then the story rises over it. Static full-bleed panel otherwise.
 */
export function ImpactStory() {
  return (
    <section aria-labelledby="why-title" className="why-reveal relative">
      <div className="why-reveal-sticky relative p-2 sm:p-3">
        <div
          aria-hidden
          className="why-reveal-intro absolute inset-0 flex-col items-center justify-between px-5 pt-[14svh] pb-[8svh] text-[clamp(3.5rem,7vw,8rem)] leading-none font-extrabold tracking-[-0.05em] text-ink md:flex-row md:px-10 md:py-0"
        >
          <span className="why-reveal-word-start">Why</span>
          <span className="why-reveal-word-end">Ihsaan</span>
        </div>
        <div className="why-reveal-frame relative isolate flex h-full min-h-[calc(100svh-1rem)] overflow-hidden rounded-[28px] bg-night-2 sm:min-h-[calc(100svh-1.5rem)]">
          <img
            src="/media/career-conference.webp"
            alt=""
            width={2560}
            height={1442}
            loading="lazy"
            className="why-reveal-photo absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="why-reveal-shade absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,22,41,0.6)_0%,rgba(6,22,41,0.2)_40%,rgba(6,22,41,0.92)_100%),radial-gradient(60%_60%_at_0%_100%,rgba(101,64,138,0.6),transparent_70%)]"
          />
          <div aria-hidden className="why-reveal-logo absolute inset-0 z-10 items-center justify-center bg-ihsaan-blue">
            <img
              src="/media/white-logo-large.webp"
              alt=""
              width={1727}
              height={375}
              className="w-[clamp(12rem,22vw,20rem)]"
            />
          </div>
          <Container className="flex flex-col pt-24 pb-10 sm:pt-28 sm:pb-14 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr_auto] lg:gap-x-10">
            <p className="why-reveal-eyebrow text-[11px] font-bold tracking-[0.18em] text-cream/70 uppercase lg:col-span-6">
              Why IHSAAN
            </p>
            <h2
              id="why-title"
              className="mt-auto pt-10 text-[2.75rem] leading-[0.95] font-extrabold tracking-[-0.05em] text-cream sm:text-7xl lg:col-span-8 lg:row-start-3 lg:self-end lg:pt-0 lg:text-[7rem]"
            >
              {WHY_LINES.map((line, index) => (
                <span key={line} className="why-reveal-line block">
                  {line}
                  {index < WHY_LINES.length - 1 ? " " : null}
                </span>
              ))}
            </h2>
            <div className="why-reveal-aside mt-6 lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:mt-0 lg:self-end">
              <p className="max-w-sm text-[15px] leading-7 text-cream/80">
                The word Ihsaan means excellence, striving for the highest standard in everything we do as a form of
                devotion to God. We work across universities in the UK and Ireland.
              </p>
              <ButtonLink href="/about" tone="white" className="mt-6">
                Our story
              </ButtonLink>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

/** Columns drift at different speeds as the section scrolls past (globals.css `.parallax-column`). */
const GALLERY_DRIFT = [
  { from: "4%", to: "-4%" },
  { from: "12%", to: "-12%" },
  { from: "8%", to: "-8%" },
] as const;

/** Every column gets each aspect once, so the columns end level whatever the source photo shapes. */
const GALLERY_ASPECTS = ["aspect-[4/5]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]"] as const;

/** Four rows of three; the full set lives on /gallery. */
const GALLERY_PREVIEW = GALLERY.slice(0, 12);

export function GalleryParallax({ action }: { action?: ReactNode }) {
  const columns = GALLERY_DRIFT.map((_, column) => GALLERY_PREVIEW.filter((_, index) => index % GALLERY_DRIFT.length === column));
  return (
    <section aria-labelledby="gallery-title" className="relative overflow-clip py-20 sm:py-28">
      <Container className="relative z-10">
        <SectionHeading id="gallery-title" eyebrow="Event gallery" title="Moments from our programmes" action={action} />
      </Container>
      <div className="mt-14 grid grid-cols-2 gap-3 px-2 sm:grid-cols-3 sm:gap-4 sm:px-3">
        {columns.map((photos, column) => (
          <ul
            key={GALLERY_DRIFT[column].from}
            className={cn("parallax-column flex flex-col gap-3 sm:gap-4", column === 2 && "max-sm:hidden")}
            style={{ "--drift-from": GALLERY_DRIFT[column].from, "--drift-to": GALLERY_DRIFT[column].to } as CSSProperties}
          >
            {photos.map((photo, row) => (
              <li
                key={photo.src}
                className={cn(
                  "overflow-hidden rounded-[22px] bg-night-2",
                  GALLERY_ASPECTS[(row + column) % GALLERY_ASPECTS.length],
                )}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="parallax-zoom h-full w-full object-cover"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

export function InvolvementCards() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {INVOLVEMENT_ROUTES.map((route, index) => {
        const dark = isDarkMotif(route.motif);
        return (
          <li key={route.title} data-reveal style={revealDelay(index)}>
            <Panel
              motif={route.motif}
              className="h-full min-h-[26rem] rounded-[22px] transition-transform duration-500 hover:-translate-y-1.5"
            >
              <h3 className={cn("text-2xl font-bold tracking-[-0.02em]", dark ? "text-white" : "text-ihsaan-purple")}>
                {route.title}
              </h3>
              <p className={cn("mt-3 max-w-[22rem] text-[15px] leading-7", dark ? "text-white/90" : "text-black/75")}>
                {route.body}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {route.points.map((point) => (
                  <li
                    key={point}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs",
                      dark ? "border-white/30 text-white" : "border-ihsaan-purple/25 text-ihsaan-purple",
                    )}
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <ButtonLink href={route.cta.href} tone={dark ? "white" : "accent"}>
                  {route.cta.label}
                </ButtonLink>
              </div>
            </Panel>
          </li>
        );
      })}
    </ul>
  );
}

function PartnerTile({ partner, decorative = false }: { partner: Partner; decorative?: boolean }) {
  return (
    <div className="flex h-24 w-52 shrink-0 items-center justify-center px-6">
      {/* Most logos ship on opaque white, so blending (not a tile) is what removes the box. */}
      <img
        src={partner.src}
        alt={decorative ? "" : partner.name}
        width={partner.width}
        height={partner.height}
        loading="lazy"
        className="max-h-11 w-auto max-w-full object-contain opacity-65 mix-blend-multiply grayscale transition-opacity duration-300 hover:opacity-100 dark:mix-blend-screen dark:invert"
      />
    </div>
  );
}

/** Each half must be wider than the viewport, or the track runs out before the loop wraps and leaves a gap. */
const MARQUEE_COPIES_PER_HALF = 3;

function MarqueeHalf({ partners, decorative }: { partners: readonly Partner[]; decorative: boolean }) {
  return (
    <div aria-hidden={decorative || undefined} className="flex shrink-0 gap-3 pr-3">
      {Array.from({ length: MARQUEE_COPIES_PER_HALF }, (_, copy) =>
        partners.map((partner) => (
          <PartnerTile key={`${copy}-${partner.name}`} partner={partner} decorative={decorative || copy > 0} />
        )),
      )}
    </div>
  );
}

function MarqueeRow({ partners, reverse = false }: { partners: readonly Partner[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className={cn(
          "flex w-max animate-marquee bg-page group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        <MarqueeHalf partners={partners} decorative={false} />
        <MarqueeHalf partners={partners} decorative />
      </div>
    </div>
  );
}

export function PartnersSection() {
  return (
    <section aria-labelledby="partners-title" className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="partners-title"
          eyebrow="Partners & employers"
          title="Organisations backing faith-driven talent"
          aside="Our diamond and gold partners open doors through conferences, mentoring and roles."
        />
      </Container>
      <div data-reveal className="mt-12 space-y-3">
        {PARTNER_TIERS.map((tier, index) => (
          <div key={tier.name}>
            <h3 className="sr-only">{tier.name}</h3>
            <MarqueeRow partners={tier.partners} reverse={index % 2 === 1} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function PartnerWall({ partners }: { partners: readonly Partner[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {partners.map((partner, index) => (
        <li
          key={partner.name}
          data-reveal
          style={revealDelay(index % 5)}
          className="flex h-24 items-center justify-center rounded-2xl bg-white px-5 ring-1 ring-ink/5 transition-transform duration-300 hover:-translate-y-1"
        >
          <img
            src={partner.src}
            alt={partner.name}
            width={partner.width}
            height={partner.height}
            loading="lazy"
            className="max-h-11 w-auto max-w-[85%] object-contain"
          />
        </li>
      ))}
    </ul>
  );
}

export function FaqSection() {
  return (
    <Section labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 id="faq-title" className={cn("mt-3 text-3xl leading-[1.1] sm:text-[2.6rem]", displayClass)}>
            Good to know before you join
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-ink/60">
            Something else on your mind? Email {CONTACT_EMAIL} and the team will get back to you.
          </p>
          <ButtonLink href="/contact" tone="solid" className="mt-8">
            Ask us anything
          </ButtonLink>
        </div>
        <div data-reveal style={revealDelay(1)} className="border-t border-ink/10">
          {FAQS.map((faq, index) => (
            <details key={faq.question} name="faq" open={index === 0} className="group border-b border-ink/10">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-[15px] font-medium text-ink transition-colors hover:text-ihsaan-light-blue">
                {faq.question}
                <span
                  aria-hidden
                  className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-ink/5 transition-all duration-300 group-open:rotate-180 group-open:bg-accent group-open:text-accent-ink before:absolute before:h-px before:w-3 before:bg-current after:absolute after:h-3 after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-2xl pr-12 pb-6 text-sm leading-7 text-ink/65">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** Inset full-bleed photo band for the closing call to action. */
export function PhotoBand({
  image,
  children,
  labelledBy,
}: {
  image: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section aria-labelledby={labelledBy} className="p-2 sm:p-3">
      <div
        data-reveal
        className="group relative isolate flex min-h-[70svh] overflow-hidden rounded-[28px] bg-night-2"
      >
        <div aria-hidden className="parallax-zoom absolute inset-0 -z-20">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-night/60" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_50%_100%,rgba(101,64,138,0.6),transparent_70%)]"
        />
        <Container className="flex flex-col items-center justify-center py-16 text-center">{children}</Container>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <PhotoBand image="/media/gallery/conference-audience.webp" labelledBy="cta-title">
      <p className="text-[11px] font-bold tracking-[0.18em] text-cream/70 uppercase">Your career journey starts here</p>
      <h2
        id="cta-title"
        className="mt-4 max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-[-0.035em] text-cream sm:text-6xl"
      >
        Start your career journey with IHSAAN.
      </h2>
      <p className="mt-5 max-w-md text-[15px] leading-7 text-cream/80">
        Programmes, mentors and opportunities for Muslim students across the UK and Ireland.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href={GET_INVOLVED.href}>
          Apply now
        </ButtonLink>
        <ButtonLink href="/contact" tone="light-outline">
          Contact us
        </ButtonLink>
      </div>
    </PhotoBand>
  );
}
