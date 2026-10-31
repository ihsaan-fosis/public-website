"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Section, SectionTitle } from "@/components/ui";
import type { ProgrammeHighlight } from "@/content/programmes";
import { cn } from "@/lib/utils";

/**
 * The day as a row of tall stand banners, like the pull-up banners on the exhibition floor. Hover, focus or tap one and
 * it opens to its full width while the others narrow to a vertical label. Below `lg` every banner is open and stacked,
 * so the copy never depends on a pointer.
 */
export function ConferenceBanners({
  title,
  highlights,
}: {
  title: string;
  highlights: readonly (ProgrammeHighlight & { image: string; alt: string })[];
}) {
  const [active, setActive] = useState(0);
  return (
    <Section labelledBy="day-title" className="pt-0 sm:pt-0">
      <SectionTitle id="day-title">{title}</SectionTitle>
      <ul
        data-reveal
        className="mt-10 grid gap-3 transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:h-[34rem] lg:[grid-template-columns:var(--cols)]"
        style={{ "--cols": highlights.map((_, index) => (index === active ? "5fr" : "1fr")).join(" ") } as CSSProperties}
      >
        {highlights.map((highlight, index) => {
          const open = index === active;
          return (
            <li
              key={highlight.title}
              tabIndex={0}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className="group relative min-h-[22rem] overflow-hidden rounded-[28px] bg-night-2 outline-offset-4 lg:min-h-0"
            >
              <Image
                src={highlight.image}
                alt={highlight.alt}
                fill
                sizes={open ? "(min-width: 1024px) 660px, 100vw" : "(min-width: 1024px) 140px, 100vw"}
                className={cn(
                  "object-cover transition duration-700 ease-out",
                  open ? "lg:scale-100 lg:brightness-100" : "lg:scale-110 lg:brightness-[0.55]",
                )}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/45 to-night/5"
              />
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-lg font-bold tracking-[-0.02em] whitespace-nowrap text-cream transition-opacity duration-500 [writing-mode:vertical-rl] rotate-180 lg:block",
                  open ? "opacity-0 delay-0" : "opacity-100 delay-300",
                )}
              >
                {highlight.title}
              </span>
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 p-6 transition-opacity duration-500 sm:p-8 lg:w-[28rem] lg:p-8",
                  open ? "opacity-100 delay-300" : "lg:opacity-0 lg:delay-0",
                )}
              >
                <h3 className="text-3xl leading-[1.05] font-extrabold tracking-[-0.035em] text-cream sm:text-4xl lg:text-5xl">
                  {highlight.title}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-7 text-cream/80">{highlight.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
