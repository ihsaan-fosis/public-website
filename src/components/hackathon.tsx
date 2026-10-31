import Image from "next/image";
import type { CSSProperties } from "react";
import { CODE_LABEL, PyHeading } from "@/components/hackathon-labels";
import { CountUp, MarqueeGroup, ScrollWords } from "@/components/motion";
import { MarqueeRow } from "@/components/sections";
import { Container, displayClass, revealDelay, Section } from "@/components/ui";
import type { ProgrammeEvent } from "@/content/programmes";
import { GALLERY, type Partner, type Stat } from "@/content/site";
import { cn } from "@/lib/utils";

/** The opening, set like a magazine spread: the title, the explanation and the year's numbers on the left, a tall photograph on the right. */
export function HackathonIntro({
  title,
  about,
  stats,
  photo,
}: {
  title: string;
  about: readonly string[];
  stats: readonly Stat[];
  photo: { src: string; alt: string };
}) {
  return (
    <Section labelledBy="about-title">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <div data-reveal>
            <PyHeading id="about-title" title={title}>
              {about.join(" ")}
            </PyHeading>
          </div>
          <dl className="mt-14 grid grid-cols-3 gap-x-4 sm:gap-x-8 lg:mt-20">
            {stats.map((stat, index) => (
              <div key={stat.label} data-reveal style={revealDelay(index)} className="border-t border-ink/15 pt-4">
                <dd className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.06em] text-ink">
                  <CountUp value={stat.value} />
                </dd>
                <dt className="mt-3 text-[13px] leading-5 text-ink/65">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div data-reveal style={revealDelay(2)} className="group relative aspect-[4/5] overflow-hidden rounded-[28px] bg-night-2 lg:aspect-auto lg:min-h-[36rem]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1280px) 460px, (min-width: 1024px) 40vw, 100vw"
            className="parallax-zoom object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
          <p aria-hidden className="absolute bottom-5 left-5 font-mono text-[11px] font-bold tracking-[0.08em] text-cream/90">
            {"> manchester_2026"}
          </p>
        </div>
      </div>
    </Section>
  );
}

/** One line of the statement: lit words with a small photograph set inline, in the manner of an editorial headline. */
function StatementLine({ before, photo, after, caret = false }: { before: string; photo: string; after: string; caret?: boolean }) {
  return (
    <span className="block">
      <ScrollWords text={before} />{" "}
      <span
        aria-hidden
        className="relative mx-[0.08em] inline-block h-[0.78em] w-[1.6em] translate-y-[0.04em] overflow-hidden rounded-full bg-night-2 align-baseline"
      >
        <Image src={photo} alt="" fill sizes="160px" className="object-cover" />
      </span>{" "}
      <ScrollWords text={after} />
      {caret ? (
        <span aria-hidden className="sprint-caret ml-2 inline-block h-[0.8em] w-[0.1em] translate-y-[0.06em] bg-ihsaan-blue dark:bg-ihsaan-light-blue" />
      ) : null}
    </span>
  );
}

/** The promise as three giant lines on the page, each with a photograph inline and a terminal caret at the end. */
export function HackathonStatement() {
  return (
    <section aria-labelledby="sprint-statement" className="relative py-16 sm:py-36">
      <Container>
        <h2
          id="sprint-statement"
          className={`text-[clamp(2.6rem,8.2vw,8rem)] leading-[1.02] tracking-[-0.04em] ${displayClass}`}
        >
          <StatementLine before="Form a" photo="/media/gallery/hackathon-team.webp" after="team." />
          <StatementLine before="Build a" photo="/media/gallery/hackathon-coding.webp" after="prototype." />
          <StatementLine before="Pitch it to" photo="/media/gallery/hackathon-partners.webp" after="partners." caret />
        </h2>
      </Container>
    </section>
  );
}

const DRIFT = [
  { from: "0rem", to: "-5rem" },
  { from: "-4rem", to: "2rem" },
  { from: "0rem", to: "-6rem" },
] as const;

const WALL = [
  ["/media/gallery/hackathon-coding-closeup.webp", "/media/gallery/hackathon-bench.webp", "/media/gallery/hackathon-partners.webp"],
  ["/media/gallery/hackathon-three.webp", "/media/gallery/hackathon-mentor.webp", "/media/gallery/hackathon-hall.webp"],
  ["/media/gallery/hackathon-long-table.webp", "/media/gallery/hackathon-team.webp", "/media/hackathon-smiles.webp"],
] as const;

const WALL_LABELS = ["build", "pair", "test", "debug", "review", "demo", "commit", "ship", "merge"] as const;

/** Photographs from the room in three columns of three that drift at different speeds as the page scrolls. */
export function HackathonWall() {
  let tile = 0;
  return (
    <section aria-labelledby="wall-title" className="relative overflow-clip py-14 sm:py-28">
      <h2 id="wall-title" className="sr-only">
        Inside our hackathons
      </h2>
      <div className="grid grid-cols-2 gap-3 px-2 sm:grid-cols-3 sm:gap-4 sm:px-3">
        {WALL.map((column, columnIndex) => (
          <ul
            key={column[0]}
            className={cn("parallax-column flex flex-col gap-3 sm:gap-4", columnIndex === 2 && "max-sm:hidden")}
            style={{ "--drift-from": DRIFT[columnIndex].from, "--drift-to": DRIFT[columnIndex].to } as CSSProperties}
          >
            {column.map((src) => {
              const photo = GALLERY.find((entry) => entry.src === src);
              const label = WALL_LABELS[tile++];
              if (!photo) return null;
              return (
                <li key={src} className="group relative overflow-hidden rounded-[22px] bg-night-2">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className={cn(
                      "parallax-zoom w-full object-cover",
                      photo.height > photo.width ? "aspect-[3/4]" : "aspect-[4/3]",
                    )}
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                  <p aria-hidden className="absolute bottom-4 left-5 font-mono text-[11px] font-bold tracking-[0.08em] text-cream/90">
                    {`${String(tile).padStart(2, "0")}_${label}`}
                  </p>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}

/** Past events as a build log. Each event's headline number is set large on the right. */
export function HackathonEvents({ title, events }: { title: string; events: readonly ProgrammeEvent[] }) {
  return (
    <Section labelledBy="events-title" className="pt-0 sm:pt-0">
      <PyHeading id="events-title" title={title} />
      <ul className="mt-10 border-t border-ink/10">
        {events.map((event, index) => (
          <li
            key={`${event.date}-${event.place}`}
            data-reveal
            style={revealDelay(index % 3)}
            className="group grid gap-4 border-b border-ink/10 py-8 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-12"
          >
            <div>
              <span className={CODE_LABEL}>
                <span aria-hidden className="mr-1.5 inline-block text-ihsaan-blue transition-transform duration-500 group-hover:translate-x-1 dark:text-ihsaan-light-blue">
                  {">"}
                </span>
                {event.date}
              </span>
              <p className="mt-3 text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">{event.place}</p>
              <p className="mt-2 max-w-2xl text-[15px] leading-7 text-ink/70">{event.detail}</p>
            </div>
            {event.figure ? (
              <p className="sm:text-right">
                <span className="block text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] font-extrabold tracking-[-0.06em] text-ink">
                  <CountUp value={event.figure.value} />
                </span>
                <span className="mt-2 block text-sm text-ink/65">{event.figure.label}</span>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Partners as a slow marquee of logos with one pause control, the same treatment as the home page. */
export function HackathonPartners({ title, partners }: { title: string; partners: readonly Partner[] }) {
  return (
    <section aria-labelledby="partners-title" className="relative pb-14 sm:pb-28">
      <MarqueeGroup
        title={
          <div data-reveal>
            <PyHeading id="partners-title" title={title} className="text-center" />
          </div>
        }
      >
        <div data-reveal>
          <MarqueeRow partners={partners} />
        </div>
        <p aria-hidden className={cn(CODE_LABEL, "mt-8 text-center")}>
          {`> ${partners.length} partners connected`}
        </p>
      </MarqueeGroup>
    </section>
  );
}
