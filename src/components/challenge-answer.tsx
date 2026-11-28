import Image from "next/image";
import { ANSWERS } from "@/content/challenge-answer";
import { GAP_QUOTE, GAP_STATEMENT, GAP_STATS } from "@/content/impact";
import { CountUp, ScrollWords } from "./motion";
import { Container, displayClass, revealDelay } from "./ui";

/** The problem as three figures, then IHSAAN's answer: two sections that share one three-column grid. */
export function ChallengeAnswer() {
  return (
    <>
      <StudentChallenges />
      <IhsaanAnswer />
    </>
  );
}

/** A relative gap has no whole to draw from, so each figure stands alone as the lead of its own stat. */
function GapFigure({ value }: { value: string }) {
  return (
    <CountUp value={value} className="block text-8xl leading-none font-extrabold tracking-[-0.05em] text-ihsaan-light-blue" />
  );
}

/**
 * The problem: three figures, each with its claim, the comparison behind it, and its source, then the quote that names the pattern.
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
          {GAP_STATEMENT}
        </h2>
        <ol className="mt-14 grid gap-x-12 gap-y-14 sm:mt-20 lg:grid-cols-3 lg:gap-y-0">
          {GAP_STATS.map((stat, index) => (
            <li key={stat.value} data-reveal style={revealDelay(index)} className="lg:row-span-4 lg:grid lg:grid-rows-subgrid">
              {/* Subgrid rows keep the figure, claim, comparison and source on shared lines across the three columns. */}
              <GapFigure value={stat.value} />
              <p className="mt-6 max-w-sm text-2xl leading-[1.2] font-medium tracking-[-0.03em] text-ink sm:text-[1.75rem]">
                {stat.label}.
              </p>
              <p className="mt-4 max-w-sm text-base leading-7 text-ink/80">{stat.note}</p>
              <p className="mt-4 text-[13px] leading-6 text-ink/65">Source: {stat.source}</p>
            </li>
          ))}
        </ol>
        <figure className="mt-20 sm:mt-32">
          <blockquote
            className={`text-[clamp(2.1rem,5.4vw,5.25rem)] leading-[1.06] tracking-[-0.04em] ${displayClass}`}
          >
            <ScrollWords text={`\u201C${GAP_QUOTE.text}\u201D`} />
          </blockquote>
          <figcaption className="mt-8 text-sm leading-6 text-ink/65 sm:text-base">{GAP_QUOTE.source}</figcaption>
        </figure>
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
          IHSAAN closes the gap
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
