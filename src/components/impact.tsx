import Image from "next/image";
import { GET_INVOLVED, MISSION } from "@/content/site";
import {
  ENGAGEMENT,
  FLYWHEEL,
  GAP_QUOTE,
  GAP_STATEMENT,
  GAP_STATS,
  IMPACT_PHOTOS,
  PATHWAY,
  STORIES,
  TRACTION,
  TRACTION_CITIES,
  VOICES,
  VOICES_SUMMARY,
} from "@/content/impact";
import { cn } from "@/lib/utils";
import { CountUp, ScrollWords } from "./motion";
import { PhotoBand } from "./sections";
import {
  ButtonLink,
  displayClass,
  Eyebrow,
  PhotoFrame,
  revealDelay,
  Section,
  SectionHeading,
  SectionTitle,
} from "./ui";

const FRAME_TITLE =
  "hero-title-editorial mt-auto pt-10 leading-[1.08] font-extrabold tracking-[-0.03em] text-cream lg:row-start-3 lg:self-end lg:pt-0";

/** The gap the work sits in: one scroll-lit statement, the three figures behind it, and the report's own words. */
export function GapChapter() {
  return (
    <Section labelledBy="gap-title" className="py-24 sm:py-36">
      <p className="text-sm text-ink/65">The problem</p>
      <h2
        id="gap-title"
        className={cn("mt-5 max-w-5xl text-3xl leading-[1.15] sm:text-5xl sm:leading-[1.1] lg:text-[3.5rem]", displayClass)}
      >
        <ScrollWords text={GAP_STATEMENT} />
      </h2>
      <ul className="mt-16 border-t border-ink/10">
        {GAP_STATS.map((stat, index) => (
          <li
            key={stat.value}
            data-reveal
            style={revealDelay(index)}
            className="grid gap-3 border-b border-ink/10 py-8 sm:grid-cols-[11rem_1fr] sm:gap-10"
          >
            <p className="text-5xl leading-none font-medium tracking-[-0.04em] text-ink sm:text-6xl">{stat.value}</p>
            <div>
              <h3 className="text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">
                {stat.label}
              </h3>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-ink/70">{stat.note}</p>
              <p className="mt-2 text-[13px] leading-6 text-ink/65">Source: {stat.source}</p>
            </div>
          </li>
        ))}
      </ul>
      <figure data-reveal className="mt-14 max-w-4xl">
        <blockquote className={cn("text-2xl leading-[1.25] sm:text-4xl", displayClass)}>
          &ldquo;{GAP_QUOTE.text}&rdquo;
        </blockquote>
        <figcaption className="mt-5 text-sm text-ink/65">{GAP_QUOTE.source}</figcaption>
      </figure>
    </Section>
  );
}

/** The mission, then the seven steps from a first question to a first offer beside one photograph. */
export function PathwayChapter() {
  return (
    <Section labelledBy="pathway-title" className="pt-0 sm:pt-0">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
        <PhotoFrame src={IMPACT_PHOTOS.pathway.src} alt={IMPACT_PHOTOS.pathway.alt} sticky />
        <div>
          <div data-reveal>
            <Eyebrow>Our model</Eyebrow>
            <SectionTitle id="pathway-title" className="mt-5">
              One pathway from first question to first offer
            </SectionTitle>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-ink/70">
              IHSAAN works exactly in the gap between education and employment. {MISSION}
            </p>
          </div>
          <ol className="mt-10 border-t border-ink/10">
            {PATHWAY.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                style={revealDelay(index % 3)}
                className="flex items-baseline gap-6 border-b border-ink/10 py-6"
              >
                <span aria-hidden className="w-6 shrink-0 text-xs text-ink/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-[15px] leading-7 text-ink/70">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/** Reach, equip, return as three photo cards, built like the home page's involvement panels. */
export function FlywheelChapter() {
  return (
    <Section labelledBy="flywheel-title" className="pt-0 sm:pt-0">
      <SectionHeading
        id="flywheel-title"
        title="Reach. Equip. Return."
        aside="Rooted in faith, excellence and service. Each student we equip opens doors for the next."
      />
      <ul className="mt-12 grid gap-4 lg:grid-cols-3">
        {FLYWHEEL.map((stage, index) => (
          <li key={stage.title} data-reveal style={revealDelay(index)}>
            <article className="group relative isolate flex h-full min-h-[28rem] flex-col justify-end overflow-hidden rounded-[28px] bg-night-2 p-6 sm:p-8 lg:min-h-[36rem]">
              <Image
                src={stage.photo.src}
                alt={stage.photo.alt}
                fill
                sizes="(min-width: 1280px) 416px, (min-width: 1024px) 31vw, 100vw"
                className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/70 to-night/10 transition-colors duration-700 group-hover:via-ihsaan-purple/60" />
              <span
                aria-hidden
                className="absolute top-4 right-6 text-[5.5rem] leading-none font-extrabold tracking-[-0.06em] text-cream/20 transition-colors duration-700 group-hover:text-cream/40"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-3xl font-extrabold tracking-[-0.035em] text-cream sm:text-4xl">{stage.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-cream/80">{stage.body}</p>
              <p className="mt-5 max-w-sm border-t border-cream/20 pt-4 text-sm leading-6 font-bold text-cream">
                {stage.proof}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const LARGEST_YEAR = Math.max(...ENGAGEMENT.map((year) => year.count));

/** Year-on-year growth as two ruled rows with a thin bar each, beside the headline figures as an unboxed list. */
export function TractionChapter() {
  return (
    <Section labelledBy="traction-title" className="pt-0 sm:pt-0">
      <SectionHeading
        id="traction-title"
        title="Student engagement tripled in a year"
        aside="A proven model, not a pilot. Funding scales what already works."
      />
      <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div data-reveal>
          <Eyebrow>Students engaged at events, by academic year</Eyebrow>
          <ul className="mt-6 border-t border-ink/10">
            {ENGAGEMENT.map((year) => (
              <li key={year.label} className="border-b border-ink/10 py-7">
                <div className="flex items-baseline justify-between gap-6">
                  <p className="text-sm text-ink/65">{year.label}</p>
                  <p className="text-4xl font-medium tracking-[-0.03em] text-ink sm:text-[2.6rem]">
                    <CountUp value={year.display} />
                  </p>
                </div>
                <div aria-hidden className="mt-5 h-1.5 w-full rounded-full bg-ink/15">
                  <div
                    className="h-full rounded-full bg-ihsaan-blue dark:bg-ihsaan-light-blue"
                    style={{ width: `${(year.count / LARGEST_YEAR) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-md text-[13px] leading-6 text-ink/65">
            Annual figures count engagements across events. About 4,000 is the number of unique students across both
            years.
          </p>
        </div>
        <div data-reveal style={revealDelay(1)}>
          <dl className="border-t border-ink/10">
            {TRACTION.map((stat) => (
              <div key={stat.label} className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-5">
                <dt className="max-w-[16rem] text-sm leading-6 text-ink/65">{stat.label}</dt>
                <dd className="text-3xl font-medium tracking-[-0.03em] text-ink sm:text-[2.6rem]">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[13px] leading-6 text-ink/65">Conferences: {TRACTION_CITIES}.</p>
        </div>
      </div>
    </Section>
  );
}

/** Four outcomes as an editorial list beside one photograph, each led by what the student secured. */
export function StoriesChapter() {
  return (
    <Section labelledBy="stories-title" className="pt-0 sm:pt-0">
      <SectionHeading
        id="stories-title"
        title="From programmes to offers"
        aside="Students are turning IHSAAN programmes into offers, from trainee solicitor roles to Spring Weeks."
      />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <ol className="border-t border-ink/10">
          {STORIES.map((story, index) => (
            <li key={story.outcome} data-reveal style={revealDelay(index % 3)} className="border-b border-ink/10 py-8">
              <p className="text-[11px] font-bold tracking-[0.18em] text-ink/65 uppercase">{story.programme}</p>
              <h3 className="mt-3 text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">
                {story.outcome}
              </h3>
              <figure className="mt-5">
                <blockquote className="max-w-xl text-[15px] leading-7 text-ink/75">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm text-ink/65">{story.attribution}</figcaption>
              </figure>
            </li>
          ))}
        </ol>
        <PhotoFrame src={IMPACT_PHOTOS.stories.src} alt={IMPACT_PHOTOS.stories.alt} sticky />
      </div>
    </Section>
  );
}

/** Employer and mentor voices as large pull quotes beside one photograph. */
export function VoicesBand() {
  return (
    <Section labelledBy="voices-title" className="pt-0 sm:pt-0">
      <SectionHeading
        id="voices-title"
        title="Employers hire. Mentors give back."
        aside="From the people who open doors and give their time."
      />
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <div>
          <ol className="border-t border-ink/10">
            {VOICES.map((voice, index) => (
              <li
                key={voice.name}
                data-reveal
                style={revealDelay(index)}
                className="border-b border-ink/10 py-10"
              >
                <figure>
                  <blockquote
                    className={cn(
                      "max-w-3xl text-2xl leading-[1.3] tracking-[-0.02em] text-ink sm:text-[2rem] sm:leading-[1.25]",
                      displayClass,
                    )}
                  >
                    &ldquo;{voice.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="text-[11px] font-bold tracking-[0.18em] text-ink uppercase">{voice.name}</p>
                    <p className="mt-1 max-w-md text-sm leading-6 text-ink/65">{voice.role}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-[13px] leading-6 text-ink/65">{VOICES_SUMMARY}</p>
        </div>
        <PhotoFrame src={IMPACT_PHOTOS.voices.src} alt={IMPACT_PHOTOS.voices.alt} sticky />
      </div>
    </Section>
  );
}

const CLOSING_LINES = ["Let's close", "the gap", "together."] as const;

/** The close, built like the home closing call to action, with the proposal's contact. */
export function ImpactClosing() {
  return (
    <PhotoBand image={IMPACT_PHOTOS.closing.src} labelledBy="impact-cta-title">
      <h2 id="impact-cta-title" className={FRAME_TITLE}>
        {CLOSING_LINES.map((line, index) => (
          <span key={line} className="block">
            {line}
            {index < CLOSING_LINES.length - 1 ? " " : null}
          </span>
        ))}
      </h2>
      <div className="mt-6 flex flex-col items-start gap-6 sm:mt-8 lg:col-start-2 lg:row-start-3 lg:mt-0 lg:self-end">
        <p className="max-w-sm text-sm leading-6 text-cream/70">
          Partner with IHSAAN, mentor a student or bring your organisation to the next conference. Samir Sidat, Chief
          Executive Officer:{" "}
          <a href="mailto:ceo.ihsaan@fosis.org.uk" className="font-medium text-cream underline underline-offset-4">
            ceo.ihsaan@fosis.org.uk
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Partner with us</ButtonLink>
          <ButtonLink href={GET_INVOLVED.href} tone="light-outline">
            Get involved
          </ButtonLink>
        </div>
      </div>
    </PhotoBand>
  );
}
