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
import { CountUp } from "./motion";
import { BAND_INTRO, BAND_ROW, BAND_TITLE, PhotoBand } from "./sections";
import {
  ButtonLink,
  Container,
  displayClass,
  revealDelay,
  Section,
  SectionHeading,
  SectionTitle,
} from "./ui";

/** Inline custom properties for the scroll-driven keyframes in globals.css (`Story page`). */
function vars(values: Record<`--${string}`, string>): CSSProperties {
  return values as CSSProperties;
}

/** Where small photo pills sit in the vision: after the word at each index, with a photo that is decoration only. */
const VISION_PILLS: Record<number, string> = {
  2: "/media/gallery/hackathon-team.webp",
  13: "/media/gallery/hackathon-mentor.webp",
  21: "/media/gallery/employer-pitch.webp",
};

/** Words that sharpen out of a blur as the statement scrolls in, like a lens finding focus (`.story-focus-word`), with photo pills set between them. */
function FocusWords({ text }: { text: string }) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <span key={`${word}-${index}`}>
      <span className="story-focus-word" style={vars({ "--p": String(index / words.length) })}>
        {word}
      </span>
      {index < words.length - 1 ? " " : ""}
      {VISION_PILLS[index] ? (
        <span
          aria-hidden
          className="story-pill relative mr-[0.26em] inline-block h-[0.78em] w-[1.9em] translate-y-[0.04em] overflow-hidden rounded-full bg-night-2 align-baseline"
          style={vars({ "--p": String(index / words.length) })}
        >
          <Image src={VISION_PILLS[index]} alt="" fill sizes="160px" className="object-cover" />
        </span>
      ) : null}
    </span>
  ));
}

/** Words that rise out of a mask once the photo frame has opened (`.story-word`). Words from `brightFrom` on are the emphasis. */
function RisingWords({ text, brightFrom = 0 }: { text: string; brightFrom?: number }) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <span key={`${word}-${index}`} className={index < brightFrom ? "text-cream/70" : undefined}>
      <span className="story-word-mask">
        <span className="story-word" style={vars({ "--p": String(index / words.length) })}>
          {word}
        </span>
      </span>
      {index < words.length - 1 ? " " : ""}
    </span>
  ));
}

/**
 * The vision comes into focus word by word with three photo pills set into the line. The mission is a photo frame that
 * opens from a narrow window as it scrolls in, its words rising once it is open, with the three values at full
 * strength so it hands over to them. Both stay in the normal flow, so the page keeps its section, frame, section
 * rhythm, and both read as plain text and a plain frame where scroll timelines are unsupported.
 */
export function PurposeChapter() {
  return (
    <>
      <Section labelledBy="vision-title" className="pt-6 pb-16 sm:pt-10 sm:pb-28">
        <h2 id="vision-title" className="text-sm text-ink/65">
          Our vision
        </h2>
        <p
          className={cn(
            "story-vision mt-6 max-w-6xl text-[2rem] leading-[1.18] sm:text-6xl sm:leading-[1.14] lg:text-[4.5rem] lg:leading-[1.1]",
            displayClass,
          )}
        >
          <FocusWords text={VISION} />
        </p>
      </Section>
      <div className="story-mission">
        <PhotoBand image="/media/gallery/employer-conversations.webp" labelledBy="mission-title">
          <h2 id="mission-title" className="text-sm text-cream/75">
            Our mission
          </h2>
          <p className="mt-5 max-w-5xl text-3xl leading-[1.12] font-extrabold tracking-[-0.035em] text-cream sm:text-5xl lg:text-[3.75rem]">
            <RisingWords text={MISSION} brightFrom={MISSION.split(" ").indexOf("faith,")} />
          </p>
        </PhotoBand>
      </div>
    </>
  );
}

/**
 * The three values are the tagline, so the heading spells it out. Each word starts as an outline and fills in solid as it
 * scrolls to the middle of the screen. Side by side each word sits level with its meaning
 * (the heading and the list share three subgrid rows); on a phone the tagline stacks first and each meaning names itself.
 */
export function ValuesChapter() {
  return (
    <Section labelledBy="values-title">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
        <div className="grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_repeat(3,auto)]">
          <h2
            id="values-title"
            className={cn(displayClass, "lg:row-span-4 lg:grid lg:grid-rows-subgrid")}
          >
            <span className="mb-8 block text-sm font-normal tracking-normal text-ink/65 lg:mb-0 lg:pb-10">Our values</span>
            {VALUES.map((value, index) => (
              <span
                key={value.name}
                data-reveal
                style={revealDelay(index)}
                className="block text-5xl leading-[1.1] sm:text-6xl lg:border-t lg:border-ink/10 lg:py-7 lg:pr-12 lg:text-[3.75rem]"
              >
                <span className="relative inline-block">
                  <span className="story-fill-base">
                    {value.name}
                    <span className="sr-only">.</span>
                  </span>
                  <span aria-hidden className="story-fill-solid">
                    {value.name}
                  </span>
                </span>{" "}
              </span>
            ))}
          </h2>
          <ul className="mt-10 lg:col-start-2 lg:row-span-3 lg:row-start-2 lg:mt-0 lg:grid lg:grid-rows-subgrid">
            {VALUES.map((value, index) => (
              <li
                key={value.name}
                data-reveal
                style={revealDelay(index)}
                className="border-t border-ink/10 py-6 lg:flex lg:flex-col lg:justify-center lg:py-7"
              >
                <p className="text-[11px] font-bold tracking-[0.18em] text-ink uppercase">
                  {value.name} · {value.term}
                </p>
                <p className="mt-2 max-w-md text-[15px] leading-7 text-ink/70">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div
          data-reveal
          className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-night-2 sm:aspect-[16/9] lg:aspect-auto lg:min-h-[28rem]"
        >
          <div aria-hidden className="parallax-zoom absolute inset-0">
            <Image
              src="/media/gallery/conference-selfie.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/** One list of names set large under hairline rules, like the route list on Get involved, each led by a portrait. */
export function TeamChapter() {
  return (
    <Section labelledBy="team-title">
      <SectionTitle id="team-title">Meet the executive team</SectionTitle>
      <ul className="mt-10 border-t border-ink/10">
        {EXECUTIVE_TEAM.map((member, index) => (
          <li
            key={member.name}
            data-reveal
            style={revealDelay(index)}
            className="flex items-center gap-5 border-b border-ink/10 py-4 sm:gap-8 sm:py-5"
          >
            <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-ink/5 sm:size-24">
              {member.portrait ? (
                <Image src={member.portrait} alt="" fill sizes="96px" className="object-cover" />
              ) : (
                <span aria-hidden className="flex size-full items-center justify-center text-lg font-medium text-ink/55 sm:text-2xl">
                  {member.name.split(" ").map((part) => part[0]).join("")}
                </span>
              )}
            </div>
            <div className="md:flex md:flex-1 md:items-center md:justify-between md:gap-8">
              <h3 className="text-3xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-[2.6rem]">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-ink/65 md:mt-0 md:text-base">{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Who IHSAAN is, as an editorial list under hairlines: the beat, what it means, and a small photo of it. */
export function WhoChapter() {
  return (
    <Section labelledBy="who-title">
      <SectionHeading id="who-title" title="Who we are" />
      <ul className="mt-12 border-t border-ink/10">
        {WHO_WE_ARE.map((beat, index) => (
          <li
            key={beat.title}
            data-reveal
            style={revealDelay(index)}
            className="group grid items-center gap-5 border-b border-ink/10 py-7 sm:py-9 lg:grid-cols-[1fr_1fr_15rem] lg:gap-12"
          >
            <h3 className="max-w-lg text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl lg:text-[2.1rem]">
              {beat.title}
            </h3>
            <p className="max-w-md text-[15px] leading-7 text-ink/70">{beat.body}</p>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-night-2 lg:aspect-[4/3]">
              <Image
                src={beat.photo.src}
                alt={beat.photo.alt}
                fill
                sizes="(min-width: 1024px) 240px, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
            </div>
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
