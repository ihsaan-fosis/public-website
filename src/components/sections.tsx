import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  CONTACT_EMAIL,
  FAQS,
  GALLERY_PREVIEW,
  GET_INVOLVED,
  INVOLVEMENT_ROUTES,
  OFFERS,
  PARTNER_TIERS,
  type Offer,
  type Partner,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { MarqueeGroup } from "./motion";
import { Container, ButtonLink, revealDelay, Section, SectionHeading, SectionTitle } from "./ui";

/** One list, two layouts: a scannable row list on phones, and from tablet width the tall cards of the pinned rail (globals.css `.hscroll`). */
function OfferSlide({ offer, index }: { offer: Offer; index: number }) {
  return (
    <li className="shrink-0 max-md:border-b max-md:border-ink/10">
      <Link
        href={offer.href}
        className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 py-3 md:relative md:block md:h-[min(62svh,40rem)] md:min-h-[24rem] md:w-[48vw] md:overflow-hidden md:rounded-[28px] md:bg-night-2 md:py-0 lg:w-[34vw]"
      >
        <div className="relative row-span-2 size-[4.75rem] overflow-hidden rounded-2xl bg-night-2 md:absolute md:inset-0 md:size-auto md:rounded-none">
          <Image
            src={offer.photo.src}
            alt={offer.photo.alt}
            fill
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 48vw, 76px"
            className="object-cover transition-transform duration-[1200ms] ease-out md:group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/60 to-night/10 max-md:hidden" />
        <span
          aria-hidden
          className="col-start-2 self-end text-xs tracking-[0.14em] text-ink/45 md:absolute md:top-4 md:right-6 md:text-[7.5rem] md:leading-none md:font-extrabold md:tracking-[-0.06em] md:text-cream/20 md:transition-colors md:duration-700 md:group-hover:text-cream/40"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="col-start-2 self-start md:absolute md:inset-x-0 md:bottom-0 md:p-8">
          <h3 className="text-xl font-medium tracking-[-0.03em] text-ink max-md:mt-0.5 max-md:leading-tight md:text-4xl md:font-extrabold md:tracking-[-0.035em] md:text-cream">
            {offer.title}
          </h3>
        </div>
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="col-start-3 row-span-2 row-start-1 size-5 text-ink/45 transition-transform duration-300 group-hover:translate-x-1 md:hidden"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </Link>
    </li>
  );
}

export function ProgrammesCarousel({ action }: { action?: ReactNode }) {
  return (
    <section
      id="programmes"
      aria-labelledby="programmes-title"
      className="hscroll relative py-14 sm:py-28 md:[--hscroll-length:360svh] lg:[--hscroll-length:300svh]"
    >
      <div className="hscroll-sticky">
        <Container>
          <SectionHeading
            id="programmes-title"
            title="Explore what we offer"
            action={
              <div className="flex flex-wrap gap-3">
                {action}
                <ButtonLink href="/programmes" tone="ghost">
                  All programmes
                </ButtonLink>
              </div>
            }
          />
          <div aria-hidden className="mt-8 h-px w-full bg-ink/10 max-md:hidden">
            <div className="hscroll-progress h-full bg-ink/60" />
          </div>
        </Container>
        <div data-reveal className="hscroll-viewport mt-8 md:mt-10">
          <div className="hscroll-track px-5 sm:px-10 md:w-max xl:px-[calc((100vw-80rem)/2+2.5rem)]">
            <ul aria-label="Programmes" className="flex flex-col border-t border-ink/10 md:flex-row md:gap-6 md:border-t-0">
              {OFFERS.map((offer, index) => (
                <OfferSlide key={offer.title} offer={offer} index={index} />
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
          className="why-reveal-intro absolute inset-0 flex-col items-center justify-between px-5 pt-[14svh] pb-[8svh] text-[clamp(3.5rem,7vw,8rem)] leading-none font-extrabold tracking-[-0.05em] text-ink md:flex-row md:px-3 md:py-0"
        >
          <span className="why-reveal-word-start md:w-[33%] md:pr-[1.5em] md:text-right">Why</span>
          <span className="why-reveal-word-end md:mr-[calc(1.75em+28px)]">?</span>
        </div>
        <div className="why-reveal-frame relative isolate flex h-full min-h-[calc(100svh-1rem)] overflow-hidden rounded-[28px] bg-night-2 sm:min-h-[calc(100svh-1.5rem)]">
          <Image
            src="/media/career-conference-hd.webp"
            alt=""
            fill
            sizes="100vw"
            className="why-reveal-photo -z-20 object-cover"
          />
          <div
            aria-hidden
            className="why-reveal-shade absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,22,41,0.6)_0%,rgba(6,22,41,0.2)_40%,rgba(6,22,41,0.92)_100%)]"
          />
          <div aria-hidden className="why-reveal-logo absolute inset-0 z-10 items-center justify-center bg-ihsaan-blue">
            <img
              src="/media/white-logo-large.webp"
              alt=""
              width={1727}
              height={375}
              loading="lazy"
              className="w-[clamp(12rem,22vw,20rem)]"
            />
          </div>
          <div className="flex w-full flex-col justify-end px-5 pt-[24svh] pb-8 sm:px-10 sm:pt-28 sm:pb-10 lg:px-12 lg:pb-12">
            <h2
              id="why-title"
              className={BAND_TITLE}
            >
              {WHY_LINES.map((line, index) => (
                <span key={line} className="why-reveal-line block">
                  {line}
                  {index < WHY_LINES.length - 1 ? " " : null}
                </span>
              ))}
            </h2>
            <div className={cn("why-reveal-aside", BAND_ROW)}>
              <p className={BAND_INTRO}>
                The word Ihsaan means excellence, striving for the highest standard in everything we do as a form of
                devotion to God. We work across universities in the UK and Ireland.
              </p>
              <ButtonLink href="/about" tone="white">
                Our story
              </ButtonLink>
            </div>
          </div>
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

/** Width / height of each entry in GALLERY_ASPECTS, in the same order. */
const GALLERY_RATIOS = [4 / 5, 1, 4 / 3, 3 / 4] as const;

/**
 * `object-cover` crops a landscape photo to a taller tile, so the browser has to draw it wider than the tile.
 * Size the request for the photo's full width, or it is upscaled and blurs.
 */
function galleryPhotoSizes(photo: { width: number; height: number }, tileRatio: number) {
  const crop = Math.min(2, Math.max(1, photo.width / photo.height / tileRatio));
  return `(min-width: 640px) ${Math.round(33 * crop)}vw, ${Math.round(50 * crop)}vw`;
}

/** Three rows of three, drawn from the preview set so no page shows a photo it uses elsewhere. */
export function GalleryParallax({ action }: { action?: ReactNode }) {
  const columns = GALLERY_DRIFT.map((_, column) => GALLERY_PREVIEW.filter((_, index) => index % GALLERY_DRIFT.length === column));
  return (
    <section aria-labelledby="gallery-title" className="relative overflow-clip py-14 sm:py-28">
      <Container className="relative z-10">
        <SectionHeading id="gallery-title" title="Moments from our programmes" action={action} />
      </Container>
      <div className="mt-14 grid grid-cols-2 gap-3 px-2 sm:grid-cols-3 sm:gap-4 sm:px-3">
        {columns.map((photos, column) => (
          <ul
            key={GALLERY_DRIFT[column].from}
            className={cn("parallax-column flex flex-col gap-3 sm:gap-4", column === 2 && "max-sm:hidden")}
            style={{ "--drift-from": GALLERY_DRIFT[column].from, "--drift-to": GALLERY_DRIFT[column].to } as CSSProperties}
          >
            {photos.map((photo, row) => {
              const shape = (row + column) % GALLERY_ASPECTS.length;
              return (
                <li key={photo.src} className={cn("overflow-hidden rounded-[22px] bg-night-2", GALLERY_ASPECTS[shape])}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    quality={85}
                    sizes={galleryPhotoSizes(photo, GALLERY_RATIOS[shape])}
                    className="parallax-zoom h-full w-full object-cover"
                  />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}

export function InvolvementPanels() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {INVOLVEMENT_ROUTES.map((route, index) => (
        <li key={route.title} data-reveal style={revealDelay(index)}>
          <article className="group relative isolate flex h-full min-h-[28rem] flex-col justify-end overflow-hidden rounded-[28px] bg-night-2 p-6 pt-44 sm:min-h-[34rem] sm:p-8 lg:min-h-[40rem]">
            <Image
              src={route.photo.src}
              alt={route.photo.alt}
              fill
              sizes="(min-width: 1280px) 416px, (min-width: 1024px) 31vw, 100vw"
              className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/70 to-night/10" />
            <span
              aria-hidden
              className="absolute top-4 right-6 text-[5.5rem] leading-none font-extrabold tracking-[-0.06em] text-cream/20 transition-colors duration-700 group-hover:text-cream/40"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-3xl font-extrabold tracking-[-0.035em] text-cream sm:text-4xl">{route.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-cream/80">{route.body}</p>
            <div className="mt-7">
              <ButtonLink href={route.cta.href} external={route.cta.external} tone="white">
                {route.cta.label}
              </ButtonLink>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

function PartnerTile({ partner, decorative = false }: { partner: Partner; decorative?: boolean }) {
  return (
    <div className="flex h-20 w-44 shrink-0 items-center justify-center px-4 sm:h-24 sm:w-56 sm:px-5">
      {/* Most logos ship on opaque white, so blending (not a tile) is what removes the box. */}
      <img
        src={partner.src}
        alt={decorative ? "" : partner.name}
        width={partner.width}
        height={partner.height}
        loading="lazy"
        className="h-12 w-auto max-w-full object-contain mix-blend-multiply sm:h-14 transition-opacity duration-300 dark:opacity-65 dark:mix-blend-screen dark:grayscale dark:invert dark:hover:opacity-100"
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

export function MarqueeRow({ partners, reverse = false }: { partners: readonly Partner[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className={cn(
          "flex w-max animate-marquee bg-page group-hover:[animation-play-state:paused] group-data-[paused]/marquee:[animation-play-state:paused]",
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
    <section aria-labelledby="partners-title" className="relative py-14 sm:py-28">
      <MarqueeGroup
        title={
          <div data-reveal>
            <SectionTitle id="partners-title" className="text-center [&>h2]:mx-auto">
              Professional Backgrounds Across Our Events
            </SectionTitle>
          </div>
        }
      >
        <div data-reveal className="space-y-3">
          {PARTNER_TIERS.map((tier, index) => (
            <div key={tier.name}>
              <h3 className="sr-only">{tier.name}</h3>
              <MarqueeRow partners={tier.partners} reverse={index % 2 === 1} />
            </div>
          ))}
        </div>
      </MarqueeGroup>
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
        <div data-reveal className="lg:sticky lg:top-24 lg:self-start">
          <SectionTitle id="faq-title" className="[&>h2]:text-black dark:[&>h2]:text-ink">
            Frequently asked questions
          </SectionTitle>
          <p className="mt-5 max-w-sm text-base leading-7 text-black/80 dark:text-ink/80">
            Straight answers to the questions students and partners ask us most. Can&apos;t find yours? Email{" "}
            {CONTACT_EMAIL} and the team will get back to you.
          </p>
          <ButtonLink href="/contact" tone="accent" className="mt-8">
            Contact us
          </ButtonLink>
        </div>
        <div data-reveal style={revealDelay(1)} className="border-t border-ihsaan-blue/15">
          {FAQS.map((faq, index) => (
            <details key={faq.question} name="faq" open={index === 0} className="group border-b border-ihsaan-blue/15">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-medium text-black sm:text-xl dark:text-ink transition-colors hover:text-ihsaan-light-blue">
                {faq.question}
                <span
                  aria-hidden
                  className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-ihsaan-blue/10 text-ihsaan-blue transition-all duration-300 group-open:rotate-180 group-open:bg-ihsaan-blue group-open:text-white dark:bg-ihsaan-light-blue/20 dark:text-ihsaan-light-blue dark:group-open:bg-ihsaan-light-blue dark:group-open:text-black before:absolute before:h-px before:w-3 before:bg-current after:absolute after:h-3 after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                />
              </summary>
              <div className="max-w-2xl pr-12 pb-7">
                <p className="text-base leading-7 text-black/80 dark:text-ink/80">{faq.answer}</p>
                {faq.cta ? (
                  <ButtonLink href={faq.cta.href} external={faq.cta.external} tone="accent" size="compact" className="mt-5">
                    {faq.cta.label}
                  </ButtonLink>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** PhotoBand copy follows the photo hero: a large stacked headline bottom-left, then the intro and actions on one row beneath it. */
export const BAND_TITLE =
  "hero-title-editorial hero-title-photo max-sm:text-[9.5vw]! leading-[1.08] font-extrabold tracking-[-0.03em] text-cream lg:max-w-6xl lg:text-balance";
export const BAND_ROW =
  "mt-6 flex flex-col items-start gap-6 sm:mt-8 lg:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:[&>*:not(p)]:shrink-0";
export const BAND_INTRO = "max-w-sm text-[15px] leading-6 text-cream/70 sm:text-sm lg:max-w-xl lg:text-[17px] lg:leading-7";

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
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,22,41,0.55)_0%,rgba(6,22,41,0.6)_40%,rgba(6,22,41,0.92)_100%)]"
        />
        <div className="flex w-full flex-col justify-end px-5 pt-[24svh] pb-8 sm:px-10 sm:pt-20 sm:pb-10 lg:px-12 lg:pb-12">
          {children}
        </div>
      </div>
    </section>
  );
}

const CTA_LINES = ["Start your", "career journey", "with IHSAAN."] as const;

/** Each page closes on its own photograph, so the same photo does not end every route. */
export function ClosingCta({ image = "/media/career-conference-london-hd.webp" }: { image?: string } = {}) {
  return (
    <PhotoBand image={image} labelledBy="cta-title">
      <h2
        id="cta-title"
        className={BAND_TITLE}
      >
        {CTA_LINES.map((line, index) => (
          <span key={line} className="block">
            {line}
            {index < CTA_LINES.length - 1 ? " " : null}
          </span>
        ))}
      </h2>
      <div className={BAND_ROW}>
        <p className={BAND_INTRO}>
          Programmes, mentors and opportunities for Muslim students across the UK and Ireland.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={GET_INVOLVED.href} tone="white">
            Apply now
          </ButtonLink>
          <ButtonLink href="/contact" tone="light-outline">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </PhotoBand>
  );
}
