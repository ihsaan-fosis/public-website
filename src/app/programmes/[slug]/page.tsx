import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta, PartnerWall } from "@/components/sections";
import { MapChapter } from "@/components/story";
import { displayClass, PhotoFrame, PhotoHero, ButtonLink, revealDelay, Section, SectionHeading, SectionTitle } from "@/components/ui";
import { PROGRAMME_PAGES, getProgrammePage } from "@/content/programmes";
import { MEMBER_PORTAL_SIGNUP } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return PROGRAMME_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = getProgrammePage((await params).slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.summary, path: `/programmes/${page.slug}`, image: page.image });
}

export default async function ProgrammePage({ params }: { params: Promise<Params> }) {
  const page = getProgrammePage((await params).slug);
  if (!page) notFound();

  const others = PROGRAMME_PAGES.filter((programme) => programme.slug !== page.slug);

  return (
    <>
      <PhotoHero image={page.image} title={page.headline} intro={page.intro}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={page.primary.href} external={page.primary.external} tone="white">
            {page.primary.label}
          </ButtonLink>
          {page.secondary ? (
            <ButtonLink href={page.secondary.href} external={page.secondary.external} tone="light-outline">
              {page.secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </PhotoHero>

      <Section labelledBy="about-title">
        <div className={cn("grid gap-10", page.stats.length > 0 && "lg:grid-cols-[1.2fr_1fr] lg:gap-16")}>
          <div data-reveal>
            <SectionTitle id="about-title">{page.title}</SectionTitle>
            <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-7 text-ink/70">
              {page.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          {page.stats.length > 0 ? (
            <dl data-reveal style={revealDelay(1)} className="self-end border-t border-ink/10">
              {page.stats.map((stat) => (
                <div key={stat.label} className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-5">
                  <dt className="text-sm text-ink/65">{stat.label}</dt>
                  <dd className="text-3xl font-medium tracking-[-0.03em] text-ink sm:text-[2.6rem]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Section>

      {page.conferenceMap ? <MapChapter /> : null}

      <Section labelledBy="highlights-title" className="pt-0 sm:pt-0">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <PhotoFrame src={page.photo.src} alt={page.photo.alt} sticky />
          <div className="flex flex-col justify-center">
            <SectionTitle id="highlights-title">{page.highlightsTitle}</SectionTitle>
            <ol className="mt-10 border-t border-ink/10">
              {page.highlights.map((highlight, index) => (
                <li
                  key={highlight.title}
                  data-reveal
                  style={revealDelay(index % 3)}
                  className="flex items-baseline gap-6 border-b border-ink/10 py-6"
                >
                  <span aria-hidden className="w-6 shrink-0 text-xs text-ink/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">
                      {highlight.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-7 text-ink/70">{highlight.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {page.portalInvite ? (
        <Section labelledBy="portal-title" className="pt-0 sm:pt-0">
          <div data-reveal className="grid gap-8 border-y border-ink/10 py-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <SectionTitle id="portal-title">{page.portalInvite.title}</SectionTitle>
              <p className="mt-6 max-w-xl text-[15px] leading-7 text-ink/70">{page.portalInvite.body}</p>
            </div>
            <div>
              <ButtonLink href={MEMBER_PORTAL_SIGNUP.href} external>
                {page.portalInvite.label}
              </ButtonLink>
            </div>
          </div>
        </Section>
      ) : null}

      {page.events && page.eventsTitle ? (
        <Section labelledBy="events-title" className="pt-0 sm:pt-0">
          <SectionTitle id="events-title">{page.eventsTitle}</SectionTitle>
          <ul className="mt-10 border-t border-ink/10">
            {page.events.map((event, index) => (
              <li
                key={`${event.date}-${event.place}`}
                data-reveal
                style={revealDelay(index % 3)}
                className="grid gap-2 border-b border-ink/10 py-6 sm:grid-cols-[8rem_1fr] sm:items-baseline sm:gap-8"
              >
                <span className="text-sm text-ink/65">{event.date}</span>
                <div>
                  <p className="text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">{event.place}</p>
                  <p className="mt-2 max-w-2xl text-[15px] leading-7 text-ink/70">{event.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {page.partners && page.partnersTitle ? (
        <Section labelledBy="partners-title" className="pt-0 sm:pt-0">
          <SectionTitle id="partners-title">{page.partnersTitle}</SectionTitle>
          <div className="mt-10">
            <PartnerWall partners={page.partners} />
          </div>
        </Section>
      ) : null}

      {page.quote ? (
        <Section labelledBy="quote-title" className="pt-0 sm:pt-0">
          <h2 id="quote-title" className="sr-only">
            From an attendee
          </h2>
          <figure data-reveal className="max-w-4xl">
            <blockquote className={`text-2xl leading-[1.25] sm:text-4xl ${displayClass}`}>
              &ldquo;{page.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-ink/65">{page.quote.source}</figcaption>
          </figure>
        </Section>
      ) : null}

      <Section labelledBy="more-title" className="pt-0 sm:pt-0">
        <SectionHeading
          id="more-title"
          title="Other programmes"
          action={
            <div>
              <ButtonLink href="/programmes" tone="ghost">
                All programmes
              </ButtonLink>
            </div>
          }
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((programme, index) => (
            <li key={programme.slug} data-reveal style={revealDelay(index % 3)}>
              <Link
                href={`/programmes/${programme.slug}`}
                className="group relative isolate flex h-full min-h-[17rem] flex-col justify-end overflow-hidden rounded-[22px] bg-night-2 p-6 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent sm:min-h-[19rem]"
              >
                <Image
                  src={programme.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 416px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/55 to-night/10" />
                <span
                  aria-hidden
                  className="absolute top-3 right-5 text-[5.5rem] leading-none font-extrabold tracking-[-0.06em] text-cream/20 transition-colors duration-700 group-hover:text-cream/40"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-extrabold tracking-[-0.035em] text-cream sm:text-3xl">{programme.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingCta />
    </>
  );
}
