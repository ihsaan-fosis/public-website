import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { ANSWERS, RINGS, type RingData } from "@/content/challenge-answer";
import { GAP_STATS } from "@/content/impact";
import { CountUp } from "./motion";
import { Container, displayClass, revealDelay } from "./ui";

/** The problem as three ring charts, then IHSAAN's answer: two sections that share one three-column grid. */
export function ChallengeAnswer() {
  return (
    <>
      <StudentChallenges />
      <IhsaanAnswer />
    </>
  );
}

/** A figure set inside its own sentence, so the number reads as part of the claim instead of a stat tile. */
function Figure({ value, children }: { value: string; children: ReactNode }) {
  return (
    <>
      <CountUp value={value} className="font-extrabold" /> {children}
    </>
  );
}

/**
 * Share of a whole, drawn as rings from 12 o'clock: the outer ring is the Muslim figure and the inner ring, where there
 * is one, is the overall benchmark. Both sweep in once the station reveals (globals.css `.ring-arc`).
 */
function RingChart({ ring }: { ring: RingData }) {
  const { muslim, overall } = ring;
  return (
    <div className="relative size-40">
      <svg viewBox="0 0 120 120" role="img" aria-label={ring.description} className="size-full -rotate-90">
        <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" className="stroke-ink/10" />
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          pathLength="100"
          className="ring-arc stroke-ihsaan-light-blue"
          style={{ "--v": muslim } as CSSProperties}
        />
        {overall === undefined ? null : (
          <>
            <circle cx="60" cy="60" r="38" fill="none" strokeWidth="10" className="stroke-ink/10" />
            <circle
              cx="60"
              cy="60"
              r="38"
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              pathLength="100"
              className="ring-arc ring-arc-inner stroke-ink/55"
              style={{ "--v": overall } as CSSProperties}
            />
          </>
        )}
      </svg>
      <span aria-hidden className="absolute inset-0 flex items-center justify-center text-xl font-extrabold tracking-[-0.03em] text-ink">
        <CountUp value={`${muslim}%`} />
      </span>
    </div>
  );
}

/**
 * The problem: three figures, each a ring chart over its own sentence.
 */
function StudentChallenges() {
  return (
    <section
      aria-labelledby="challenges-title"
      className="relative py-20 sm:py-28"
    >
      <Container>
        <h2
          id="challenges-title"
          data-reveal
          className={`max-w-5xl text-3xl leading-[1.15] sm:text-5xl sm:leading-[1.1] lg:text-[3.5rem] ${displayClass}`}
        >
          Degrees are up. Doors are still closed.
        </h2>
        <ol className="mt-14 grid gap-x-12 gap-y-14 sm:mt-20 lg:grid-cols-3">
          {GAP_STATS.map((stat, index) => (
            <li key={stat.value} data-reveal style={revealDelay(index)} className="ring-station">
              <RingChart ring={RINGS[index]} />
              <p className="mt-6 max-w-sm text-2xl leading-[1.2] font-medium tracking-[-0.03em] text-ink sm:text-[1.75rem]">
                <Figure value={stat.value}>{stat.label}.</Figure>
              </p>
              <p className="mt-4 text-[13px] leading-6 text-ink/65">Source: {stat.source}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/**
 * The answer, as the gap closing: three photo tiles, one per answer, start as small windows spread apart and open out
 * into one tight row as you scroll (globals.css `.tile-frame`). Only the window moves, never the text, so type stays crisp. Stacked on phones. Without motion the row is already closed.
 */
function IhsaanAnswer() {
  return (
    <section aria-labelledby="answer-title" className="relative overflow-clip pb-20 sm:pb-28">
      <Container>
        <h2
          id="answer-title"
          data-reveal
          className={`max-w-5xl text-3xl leading-[1.15] sm:text-5xl sm:leading-[1.1] lg:text-[3.5rem] ${displayClass}`}
        >
          IHSAAN closes the gap<span className="text-ihsaan-light-blue">.</span>
        </h2>

        <ol className="tiles mt-12 grid gap-3 sm:mt-16 lg:grid-cols-3">
          {ANSWERS.map((answer, index) => (
            <li
              key={answer.title}
              className={`relative aspect-[4/3] lg:aspect-[3/4] ${
                index === 0 ? "tile-left" : index === ANSWERS.length - 1 ? "tile-right" : ""
              }`}
            >
              <div className="tile-frame group absolute inset-0 overflow-hidden rounded-[22px] bg-night-2">
                <Image
                  src={answer.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/60 to-night/10" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="text-3xl font-extrabold tracking-[-0.035em] text-cream sm:text-4xl lg:text-[1.75rem] xl:text-3xl">
                    {answer.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-cream/80">
                    <CountUp value={answer.value} className="font-extrabold text-cream" /> {answer.proof}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
