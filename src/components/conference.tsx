import Image from "next/image";
import type { CSSProperties } from "react";
import { ConferenceBanners } from "@/components/conference-day";
import { revealDelay, Section, SectionTitle } from "@/components/ui";
import { STORIES } from "@/content/impact";
import type { ProgrammeHighlight } from "@/content/programmes";
import { GALLERY } from "@/content/site";
import { cn } from "@/lib/utils";

function galleryPhoto(src: string) {
  return GALLERY.find((item) => item.src === src);
}

const PHRASE = "face to face";

/**
 * A calm opening after the hero's noise: the promise at reading size in a narrow column, with "face to face" and what
 * follows in heavy weight, and one tall photograph of an employer meeting students running off the right edge of the
 * screen. The text column follows the page container's left edge, so it lines up with every other section.
 */
export function ConferenceIntro({ title, about }: { title: string; about: readonly string[] }) {
  const [promise, ...rest] = about;
  const split = promise.indexOf(PHRASE);
  const photo = galleryPhoto("/media/gallery/employer-stands.webp");
  return (
    <section
      aria-labelledby="about-title"
      className="relative [container-type:inline-size] py-14 sm:py-28"
      style={{ "--edge": "max(1.25rem, calc((100cqw - 80rem) / 2 + 2.5rem))" } as CSSProperties}
    >
      <h2 id="about-title" className="sr-only">
        {title}
      </h2>
      <div className="grid gap-10 sm:[--edge:max(2.5rem,calc((100cqw-80rem)/2+2.5rem))] lg:grid-cols-[calc(var(--edge)+30rem)_minmax(0,1fr)] lg:items-center lg:gap-16">
        <div data-reveal className="px-5 sm:px-10 lg:pr-0 lg:pl-[var(--edge)]">
          <p className="max-w-[30rem] text-2xl leading-[1.3] font-medium tracking-[-0.02em] text-ink/70 sm:text-[1.75rem]">
            {split > 0 ? promise.slice(0, split) : null}
            <strong className="font-extrabold tracking-[-0.03em] text-ink">{split > 0 ? promise.slice(split) : promise}</strong>
          </p>
          <div className="mt-8 max-w-[30rem] space-y-4 border-t border-ink/15 pt-6 text-[15px] leading-7 text-ink/70">
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        {photo ? (
          <div
            data-reveal
            style={revealDelay(1)}
            className="group relative ml-5 aspect-[4/5] overflow-hidden rounded-l-[28px] bg-night-2 sm:ml-10 lg:ml-0 lg:aspect-auto lg:h-[min(44rem,86svh)]"
          >
            <div className="parallax-zoom absolute inset-0">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-[58%_50%] transition-transform duration-[1600ms] ease-out group-hover:scale-105"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** Joins each highlight to its gallery photograph so the client component receives plain data. */
export function ConferenceDay({ title, highlights }: { title: string; highlights: readonly ProgrammeHighlight[] }) {
  const items = highlights.flatMap((highlight) => {
    const photo = highlight.image ? galleryPhoto(highlight.image) : undefined;
    return photo ? [{ ...highlight, image: photo.src, alt: photo.alt }] : [];
  });
  return <ConferenceBanners title={title} highlights={items} />;
}

/** The phrases where the story turns. Each gets a highlighter pass as it scrolls into view. */
const MARKS = ["trainee solicitor position", "organise for me an interview for the role", "I managed to get the job"] as const;

function markUp(quote: string) {
  return quote
    .split(new RegExp(`(${MARKS.join("|")})`))
    .map((part, index) => (index % 2 === 1 ? <mark key={part} className="conf-mark">{part}</mark> : part));
}

/**
 * A conversation that became a job, as a page to read. The student's words are set large on the page background with a
 * highlighter that sweeps across the three phrases where it turns, while the title and the way into the other stories
 * stay in view beside it. Without scroll timelines the highlights are simply there.
 */
export function ConferenceOutcome() {
  const story = STORIES.find((entry) => entry.programme === "Glasgow Careers Conference");
  if (!story) return null;
  return (
    <Section labelledBy="outcome-title">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle id="outcome-title">
            <span className="block">It starts with</span>
            <span className="block">a conversation.</span>
          </SectionTitle>
          <p className="mt-6 max-w-xs text-sm leading-6 text-ink/65">
            {story.outcome}. {story.attribution}, {story.programme}.
          </p>
        </div>
        <figure>
          <blockquote className="text-2xl leading-[1.4] font-semibold tracking-[-0.02em] text-ink/60 sm:text-4xl sm:leading-[1.35] lg:text-[2.5rem]">
            &ldquo;{markUp(story.quote)}&rdquo;
          </blockquote>
        </figure>
      </div>
    </Section>
  );
}

type Print = { src: string; place: string; scatter: { x: string; y: string; r: string } };

/** Seven prints on a four by five grid. Each starts knocked off true by its own offset and straightens as it scrolls in. */
const PRINTS: readonly Print[] = [
  { src: "/media/gallery/london-conference-2024.webp", place: "sm:col-start-1 sm:row-start-1 sm:col-span-2 sm:row-span-2 col-span-2 row-span-2", scatter: { x: "-1.5rem", y: "1.5rem", r: "-3deg" } },
  { src: "/media/gallery/conference-selfie.webp", place: "sm:col-start-3 sm:row-start-1 sm:row-span-3 row-span-2", scatter: { x: "1rem", y: "-1.5rem", r: "2.5deg" } },
  { src: "/media/gallery/manchester-conference-2026.webp", place: "sm:col-start-4 sm:row-start-1 sm:row-span-2 row-span-2", scatter: { x: "1.5rem", y: "1rem", r: "-2deg" } },
  { src: "/media/gallery/networking-overhead.webp", place: "sm:col-start-1 sm:row-start-3 sm:row-span-3 row-span-2", scatter: { x: "-1rem", y: "2.5rem", r: "3deg" } },
  { src: "/media/gallery/conference-audience-side.webp", place: "sm:col-start-2 sm:row-start-3 sm:row-span-3 row-span-2", scatter: { x: "0.5rem", y: "3rem", r: "-2.5deg" } },
  { src: "/media/gallery/conference-hall-wide.webp", place: "sm:col-start-3 sm:row-start-4 sm:row-span-2 row-span-2", scatter: { x: "-1rem", y: "3rem", r: "-3deg" } },
  { src: "/media/gallery/conference-audience.webp", place: "sm:col-start-4 sm:row-start-3 sm:row-span-3 row-span-2", scatter: { x: "1rem", y: "2rem", r: "2deg" } },
];

/** A tangle of prints that tidies itself into a mosaic as it scrolls into view. */
export function ConferenceWall() {
  return (
    <section aria-labelledby="wall-title" className="relative overflow-x-clip py-14 sm:py-28">
      <h2 id="wall-title" className="sr-only">
        Inside our career conferences
      </h2>
      <div className="grid auto-rows-[9rem] grid-cols-2 gap-3 px-2 sm:auto-rows-[10rem] sm:grid-cols-4 sm:gap-4 sm:px-3">
        {PRINTS.map((print) => {
          const photo = galleryPhoto(print.src);
          if (!photo) return null;
          return (
            <div
              key={print.src}
              className={cn("conf-settle group relative overflow-hidden rounded-[22px] bg-night-2", print.place)}
              style={{ "--x": print.scatter.x, "--y": print.scatter.y, "--r": print.scatter.r } as CSSProperties}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
