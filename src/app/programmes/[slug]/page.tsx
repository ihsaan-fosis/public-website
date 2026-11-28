import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HackathonEvents, HackathonIntro, HackathonPartners, HackathonStatement, HackathonWall } from "@/components/hackathon";
import { HackathonRecap } from "@/components/hackathon-recap";
import { ConferenceDay, ConferenceIntro, ConferenceOutcome, ConferenceWall } from "@/components/conference";
import Image from "next/image";
import { ClosingCta } from "@/components/sections";
import { MapChapter } from "@/components/story";
import { displayClass, PhotoFrame, PhotoHero, ButtonLink, revealDelay, Section, SectionTitle } from "@/components/ui";
import { PROGRAMME_PAGES, getProgrammePage } from "@/content/programmes";
import { MEMBER_PORTAL_SIGNUP } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { SITE_ORIGIN } from "@/lib/site";
import { cn } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return PROGRAMME_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = getProgrammePage((await params).slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description ?? page.summary, path: `/programmes/${page.slug}`, image: page.image });
}

const INTRO_PHOTO = {
  src: "/media/hackathon-manchester.webp",
  alt: "The heritage hall at the Manchester hackathon, a partner's brief on the projector above rows of students",
};

export default async function ProgrammePage({ params }: { params: Promise<Params> }) {
  const page = getProgrammePage((await params).slug);
  if (!page) notFound();

  const breadcrumb = breadcrumbJsonLd(SITE_ORIGIN, [
    { name: "Programmes", path: "/programmes" },
    { name: page.title, path: `/programmes/${page.slug}` },
  ]);
  const isHackathon = page.slug === "hackathons";
  const isConference = page.slug === "career-conferences";

  return (
    <>
      <PhotoHero image={page.image.src} title={page.headline} intro={page.intro}>
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

      {isHackathon ? (
        <HackathonIntro title={page.title} about={page.about} stats={page.stats} photo={INTRO_PHOTO} />
      ) : isConference ? (
        <ConferenceIntro title={page.title} about={page.about} />
      ) : (
        <Section labelledBy="about-title">
          <div className={cn("grid gap-10", (page.stats.length > 0 || page.aboutPhoto) && "lg:grid-cols-[1.2fr_1fr] lg:gap-16")}>
            <div data-reveal>
              <SectionTitle id="about-title">{page.title}</SectionTitle>
              <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-7 text-ink/70">
                {page.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            {page.stats.length > 0 ? (
              <div data-reveal style={revealDelay(1)} className="self-end">
                <dl className="border-t border-ink/10">
                  {page.stats.map((stat) => (
                    <div key={stat.label} className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-5">
                      <dt className="max-w-[16rem] text-sm leading-6 text-ink/65">{stat.label}</dt>
                      <dd className="text-3xl font-medium tracking-[-0.03em] text-ink sm:text-[2.6rem]">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
                {page.statsNote ? <p className="mt-4 text-[13px] leading-6 text-ink/65">{page.statsNote}</p> : null}
              </div>
            ) : page.aboutPhoto ? (
              <PhotoFrame src={page.aboutPhoto.src} alt={page.aboutPhoto.alt} />
            ) : null}
          </div>
        </Section>
      )}

      {page.conferenceMap ? <MapChapter /> : null}

      {isHackathon ? (
        <>
          <HackathonStatement />
          <HackathonWall />
        </>
      ) : isConference ? (
        <ConferenceDay title={page.highlightsTitle} highlights={page.highlights} />
      ) : (
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
      )}

      {isConference ? (
        <>
          <ConferenceOutcome />
          <ConferenceWall />
        </>
      ) : null}

      {page.examples && page.examplesTitle ? (
        <Section labelledBy="examples-title" className="pt-0 sm:pt-0">
          <SectionTitle id="examples-title">{page.examplesTitle}</SectionTitle>
          <ul className="mt-10 border-t border-ink/10">
            {page.examples.map((person, index) => (
              <li
                key={person.name}
                data-reveal
                style={revealDelay(index % 3)}
                className="grid gap-2 border-b border-ink/10 py-6 sm:grid-cols-[minmax(0,2fr)_3fr] sm:items-baseline sm:gap-8"
              >
                <p className="text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">{person.name}</p>
                <p className="text-[15px] leading-7 text-ink/70">{person.role}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

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
        isHackathon ? (
          <HackathonEvents title={page.eventsTitle} events={page.events}>
            <HackathonRecap />
          </HackathonEvents>
        ) : (
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
        )
      ) : null}

      {isHackathon && page.partners && page.partnersTitle ? (
        <HackathonPartners title={page.partnersTitle} partners={page.partners} />
      ) : null}

      {page.quotes && page.quotes.length > 0 ? (
        <Section labelledBy="quote-title" className="pt-0 sm:pt-0">
          <h2 id="quote-title" className="sr-only">
            What people say
          </h2>
          <div className="max-w-4xl space-y-14">
            {page.quotes.map((quote) => (
              <figure key={quote.text} data-reveal>
                <blockquote
                  className={cn(
                    "leading-[1.25]",
                    quote.text.length > 220 ? "text-xl sm:text-3xl" : "text-2xl sm:text-4xl",
                    displayClass,
                  )}
                >
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-4">
                  {quote.photo ? (
                    <Image src={quote.photo} alt="" width={96} height={96} className="size-12 rounded-full object-cover" />
                  ) : null}
                  <span className="text-sm text-ink/65">
                    {quote.name ? <span className="block font-medium text-ink">{quote.name}</span> : null}
                    {quote.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      <ClosingCta image={page.closingImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
