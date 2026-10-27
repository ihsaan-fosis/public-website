import Image from "next/image";
import type { CSSProperties } from "react";
import { EVENTS_LINK, GET_INVOLVED, MISSION, VISION } from "@/content/site";
import {
  CONFERENCE_CITIES,
  CONFERENCE_ROUTE,
  CONFERENCE_SIGNUPS,
  EXECUTIVE_TEAM,
  MAP_DOTS,
  MAP_SIZE,
  ROUTE_PATH,
  VALUES,
  WHO_WE_ARE,
} from "@/content/story";
import { cn } from "@/lib/utils";
import { CountUp, ScrollWords } from "./motion";
import { BAND_INTRO, BAND_ROW, BAND_TITLE, PhotoBand } from "./sections";
import {
  ButtonLink,
  Container,
  displayClass,
  PhotoFrame,
  revealDelay,
  Section,
  SectionHeading,
  SectionTitle,
} from "./ui";

/** Inline custom properties for the scroll-driven keyframes in globals.css (`Story page`). */
function vars(values: Record<`--${string}`, string>): CSSProperties {
  return values as CSSProperties;
}

/** The vision as the scroll-lit statement, then the mission over a panorama that opens out of a thin slit beneath it. */
export function PurposeChapter() {
  return (
    <section aria-labelledby="vision-title" className="relative py-16 sm:py-36">
      <Container>
        <h2 id="vision-title" className="story-rise text-sm text-ink/65">
          Our vision
        </h2>
        <p
          className={cn(
            "story-rise mt-5 max-w-5xl text-3xl leading-[1.15] sm:text-5xl sm:leading-[1.1] lg:text-[3.5rem]",
            displayClass,
          )}
        >
          <ScrollWords text={VISION} />
        </p>
      </Container>
      <div className="story-slit relative isolate mx-2 mt-16 flex min-h-[80svh] overflow-hidden rounded-[28px] bg-night-2 sm:mx-3 sm:mt-24">
        <Image
          src="/media/impact-wide.webp"
          alt="A wide view of students at an IHSAAN programme"
          fill
          sizes="100vw"
          className="story-slit-photo -z-20 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/55 to-night/10" />
        <div className="mt-auto w-full px-5 pt-16 pb-8 sm:px-10 sm:pb-10 lg:px-12 lg:pb-12">
          <h2 className="text-sm text-cream/70">Our mission</h2>
          <p className="mt-4 max-w-4xl text-2xl leading-[1.15] font-extrabold tracking-[-0.03em] text-cream sm:text-4xl lg:text-5xl">
            {MISSION}
          </p>
        </div>
      </div>
    </section>
  );
}

/** The three values are the tagline, so the frame title spells it out and the meanings sit beside it. */
export function ValuesChapter() {
  return (
    <PhotoBand image="/media/gallery/conference-panel.webp" labelledBy="values-title">
      <h2
        id="values-title"
        className={BAND_TITLE}
      >
        <span className="mb-6 block text-sm font-normal tracking-normal text-cream/70">Our values</span>
        {VALUES.map((value) => (
          <span key={value.name} className="block">
            {value.name}
            <span className="text-ihsaan-lavender">.</span>{" "}
          </span>
        ))}
      </h2>
      <ul className="mt-8 grid max-w-sm gap-6 sm:mt-10 lg:mt-8 lg:max-w-none lg:grid-cols-3 lg:gap-12">
        {VALUES.map((value) => (
          <li key={value.name}>
            <p className="text-[11px] font-bold tracking-[0.18em] text-cream uppercase">
              {value.name} · {value.term}
            </p>
            <p className="mt-2 text-sm leading-6 text-cream/75">{value.body}</p>
          </li>
        ))}
      </ul>
    </PhotoBand>
  );
}

/** Names set large under hairline rules beside a photo, like the route list on Get involved. No portraits yet. */
export function TeamChapter() {
  return (
    <Section labelledBy="team-title">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
        <PhotoFrame src="/media/gallery/startup-talk.webp" alt="A speaker presenting a startup talk beside an IHSAAN banner" />
        <div className="flex flex-col justify-center">
          <SectionTitle id="team-title">Meet the executive team</SectionTitle>
          <ul className="mt-10 border-t border-ink/10">
            {EXECUTIVE_TEAM.map((member, index) => (
              <li
                key={member.name}
                data-reveal
                style={revealDelay(index)}
                className="flex items-baseline gap-6 border-b border-ink/10 py-5"
              >
                <span aria-hidden className="w-6 shrink-0 text-xs text-ink/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-3xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-[2.6rem]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink/65">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/** Who IHSAAN is, in three photo panels built like the home page's involvement panels. */
export function WhoChapter() {
  return (
    <Section labelledBy="who-title">
      <SectionHeading id="who-title" title="Who we are" />
      <ul className="mt-12 grid gap-4 lg:grid-cols-3">
        {WHO_WE_ARE.map((beat, index) => (
          <li key={beat.title} data-reveal style={revealDelay(index)}>
            <article className="group relative isolate flex h-full min-h-[28rem] flex-col justify-end overflow-hidden rounded-[28px] bg-night-2 p-6 sm:p-8 lg:min-h-[36rem]">
              <Image
                src={beat.photo.src}
                alt={beat.photo.alt}
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
              <h3 className="text-3xl font-extrabold tracking-[-0.035em] text-cream sm:text-4xl">{beat.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-cream/80">{beat.body}</p>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Which side of each city its label sits, so close neighbours (Leeds and Manchester) never collide. */
const LABEL_SIDE: Record<string, "left" | "right"> = {
  Birmingham: "left",
  Dublin: "left",
  Glasgow: "right",
  Leeds: "right",
  London: "right",
  Manchester: "left",
};

function formatMonth(date: string) {
  return date.split(" ").slice(1).join(" ");
}

/** A dot-matrix map of the islands; the conference route draws itself city by city as you scroll. */
export function MapChapter() {
  const first = CONFERENCE_ROUTE[0];
  const last = CONFERENCE_ROUTE.at(-1);
  return (
    <section aria-labelledby="map-title" className="story-map relative">
      <div className="story-map-stage">
        <Container className="grid items-center gap-10 py-14 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-10">
          <div>
            <SectionTitle id="map-title">From one campus to the next</SectionTitle>
            <p className="mt-6 max-w-md text-sm leading-6 text-ink/65">
              Every stop is a new room of students and employers, and several cities have hosted us more than once.
            </p>
            <dl className="mt-10 grid max-w-md grid-cols-3 border-t border-ink/15">
              <div className="border-r border-ink/15 py-5 pr-4">
                <dt className="text-xs text-ink/65">Signups</dt>
                <dd className="mt-1 text-2xl font-medium tracking-[-0.02em] text-ink">
                  <CountUp value={CONFERENCE_SIGNUPS.toLocaleString("en-GB")} />
                </dd>
              </div>
              <div className="border-r border-ink/15 px-4 py-5">
                <dt className="text-xs text-ink/65">Conferences</dt>
                <dd className="mt-1 text-2xl font-medium tracking-[-0.02em] text-ink">
                  <CountUp value={String(CONFERENCE_ROUTE.length)} />
                </dd>
              </div>
              <div className="py-5 pl-4">
                <dt className="text-xs text-ink/65">Cities</dt>
                <dd className="mt-1 text-2xl font-medium tracking-[-0.02em] text-ink">
                  <CountUp value={String(CONFERENCE_CITIES.length)} />
                </dd>
              </div>
            </dl>
            {first && last ? (
              <p className="mt-4 text-xs text-ink/60">
                Career conference signups, {formatMonth(first.date)} to {formatMonth(last.date)}.
              </p>
            ) : null}
          </div>
          <figure className="story-map-figure relative mx-auto w-full max-w-[34rem]">
            <svg
              viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`}
              role="img"
              aria-labelledby="map-caption"
              className="mx-auto h-auto max-h-[calc(100svh-64px-6rem)] w-full overflow-visible"
            >
              <g className="fill-ink/15">
                {MAP_DOTS.map(({ x, y }) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} />
                ))}
              </g>
              <path
                d={ROUTE_PATH}
                pathLength={1}
                fill="none"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="story-route stroke-ihsaan-purple dark:stroke-ihsaan-lavender"
              />
              {CONFERENCE_CITIES.map((city) => {
                const right = LABEL_SIDE[city.city] !== "left";
                return (
                  <g key={city.city} className="story-city" style={vars({ "--p": city.reached.toFixed(3) })}>
                    <circle cx={city.x} cy={city.y} r={20} className="story-city-ring fill-ihsaan-light-blue/25" />
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={9}
                      className="fill-ihsaan-blue stroke-page stroke-[3] dark:fill-ihsaan-light-blue"
                    />
                    <text
                      x={city.x + (right ? 22 : -22)}
                      y={city.y - 4}
                      textAnchor={right ? "start" : "end"}
                      className="fill-ink text-[26px] font-bold"
                    >
                      {city.city}
                    </text>
                    <text
                      x={city.x + (right ? 22 : -22)}
                      y={city.y + 24}
                      textAnchor={right ? "start" : "end"}
                      className="fill-ink/65 text-[20px]"
                    >
                      {city.signups.toLocaleString("en-GB")} signups
                    </text>
                  </g>
                );
              })}
            </svg>
            <figcaption id="map-caption" className="sr-only">
              Map of the UK and Ireland showing IHSAAN career conferences in date order:{" "}
              {CONFERENCE_ROUTE.map((stop) => `${stop.city}, ${stop.date}, ${stop.signups} signups`).join("; ")}.
            </figcaption>
          </figure>
        </Container>
      </div>
    </section>
  );
}

const CONTINUES_LINES = ["The story", "continues", "with you."] as const;

/** The close, built like the home closing call to action. */
export function StoryContinues() {
  return (
    <PhotoBand image="/media/gallery/student-conversations.webp" labelledBy="continues-title">
      <h2
        id="continues-title"
        className={BAND_TITLE}
      >
        {CONTINUES_LINES.map((line, index) => (
          <span key={line} className="block">
            {line}
            {index < CONTINUES_LINES.length - 1 ? " " : null}
          </span>
        ))}
      </h2>
      <div className={BAND_ROW}>
        <p className={BAND_INTRO}>
          Come to an event, join the community or help us run the next one.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={GET_INVOLVED.href} tone="white">
            {GET_INVOLVED.label}
          </ButtonLink>
          <ButtonLink href={EVENTS_LINK.href} tone="light-outline">
            See upcoming events
          </ButtonLink>
        </div>
      </div>
    </PhotoBand>
  );
}
