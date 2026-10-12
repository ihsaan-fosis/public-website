import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Panel } from "@/components/panel";
import { ClosingCta } from "@/components/sections";
import { displayClass, Glow, PhotoHero, ButtonLink, revealDelay, Section, SectionTitle } from "@/components/ui";
import { PROGRAMME_PAGES, getProgrammePage } from "@/content/programmes";
import type { Motif } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

type Params = { slug: string };

const MOTIFS: readonly Motif[] = ["a", "b", "c"];

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
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={page.primary.href} external={page.primary.external}>
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
        <div className={cn("grid gap-10", page.stats.length > 0 && "lg:grid-cols-[1.2fr_1fr]")}>
          <div data-reveal>
            <SectionTitle id="about-title">{page.title}</SectionTitle>
            <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-7 text-ink/70">
              {page.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          {page.stats.length > 0 ? (
            <div data-reveal style={revealDelay(1)}>
              <Panel motif="a" art={false} className="h-full rounded-[22px]">
                <dl>
                  {page.stats.map((stat) => (
                    <div key={stat.label} className="flex items-baseline justify-between gap-4 border-b border-white/15 py-4">
                      <dt className="text-[13px] text-white/75">{stat.label}</dt>
                      <dd className="text-2xl font-medium tracking-[-0.02em] text-white">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </Panel>
            </div>
          ) : null}
        </div>
      </Section>

      <section aria-labelledby="highlights-title" className="relative isolate pb-20 sm:pb-28">
        <Glow className="opacity-50" />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-10">
          <SectionTitle id="highlights-title">{page.highlightsTitle}</SectionTitle>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.highlights.map((highlight, index) => {
              const motif = MOTIFS[index % MOTIFS.length];
              const dark = motif !== "b";
              return (
                <li key={highlight.title} data-reveal style={revealDelay(index % 3)}>
                  <Panel motif={motif} className="h-full min-h-56 rounded-[22px]">
                    <h3
                      className={cn(
                        "text-xl font-bold tracking-[-0.02em]",
                        dark ? "text-white" : "text-ihsaan-purple",
                      )}
                    >
                      {highlight.title}
                    </h3>
                    <p className={cn("mt-3 max-w-[22rem] text-[15px] leading-7", dark ? "text-white/90" : "text-black/75")}>
                      {highlight.body}
                    </p>
                  </Panel>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {page.events && page.eventsTitle ? (
        <Section labelledBy="events-title" className="pt-0 sm:pt-0">
          <SectionTitle id="events-title">{page.eventsTitle}</SectionTitle>
          <ul className="mt-10 divide-y divide-ink/10 rounded-[22px] bg-surface px-6 ring-1 ring-ink/5 sm:px-8">
            {page.events.map((event) => (
              <li
                key={`${event.date}-${event.place}`}
                data-reveal
                className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="text-sm text-ink/65">{event.date}</span>
                <span className="text-lg font-medium tracking-[-0.02em] text-ink">{event.place}</span>
                <span className="text-sm text-ink/65 sm:max-w-md sm:text-right">{event.detail}</span>
              </li>
            ))}
          </ul>
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
        <SectionTitle id="more-title">Other programmes</SectionTitle>
        <ul className="mt-10 flex flex-wrap gap-3">
          {others.map((programme) => (
            <li key={programme.slug}>
              <Link
                href={`/programmes/${programme.slug}`}
                className="inline-flex min-h-12 items-center rounded-xl px-6 text-sm font-medium text-ink ring-1 ring-ink/25 transition-colors hover:bg-ink/5 hover:ring-ink/50"
              >
                {programme.title}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/programmes"
              className="inline-flex min-h-12 items-center px-3 text-sm font-medium text-ink/65 underline underline-offset-4 hover:text-ink"
            >
              All programmes
            </Link>
          </li>
        </ul>
      </Section>

      <ClosingCta />
    </>
  );
}
