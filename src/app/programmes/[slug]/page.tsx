import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HackathonEvents, HackathonIntro, HackathonPartners, HackathonStatement, HackathonWall } from "@/components/hackathon";
import { ClosingCta, PartnerWall } from "@/components/sections";
import { MapChapter } from "@/components/story";
import { displayClass, PhotoFrame, PhotoHero, ButtonLink, revealDelay, Section, SectionTitle } from "@/components/ui";
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

const INTRO_PHOTO = {
  src: "/media/hackathon-manchester.webp",
  alt: "The heritage hall at the Manchester hackathon, a partner's brief on the projector above rows of students",
};

export default async function ProgrammePage({ params }: { params: Promise<Params> }) {
  const page = getProgrammePage((await params).slug);
  if (!page) notFound();

  const isHackathon = page.slug === "hackathons";

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

      {isHackathon ? (
        <HackathonIntro title={page.title} about={page.about} stats={page.stats} photo={INTRO_PHOTO} />
      ) : (
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
      )}

      {page.conferenceMap ? <MapChapter /> : null}

      {isHackathon ? (
        <>
          <HackathonStatement />
          <HackathonWall />
        </>
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
          <HackathonEvents title={page.eventsTitle} events={page.events} />
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

      {page.partners && page.partnersTitle ? (
        isHackathon ? (
          <HackathonPartners title={page.partnersTitle} partners={page.partners} />
        ) : (
          <Section labelledBy="partners-title" className="pt-0 sm:pt-0">
            <SectionTitle id="partners-title">{page.partnersTitle}</SectionTitle>
            <div className="mt-10">
              <PartnerWall partners={page.partners} />
            </div>
          </Section>
        )
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

      <ClosingCta image={isHackathon ? "/media/gallery/hackathon-rows.webp" : undefined} />
    </>
  );
}
