"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Section, SectionTitle } from "@/components/ui";
import type { ProgrammeHighlight } from "@/content/programmes";
import { cn } from "@/lib/utils";

/**
 * The day as a row of tall stand banners, like the pull-up banners on the exhibition floor. Hover, focus or tap one and
 * it opens to its full width while the others narrow to a vertical label. Below `lg` every banner is open and stacked,
 * so the copy never depends on a pointer.
 *
 * Each photo sits in a layer as wide as an open banner, centred, so opening a banner pulls a curtain back over a still
 * image instead of resizing and re-cropping it every frame. Hover waits a beat before it switches, so a pointer sweeping
 * across the row does not start an animation for every banner it passes.
 */
export function ConferenceBanners({
  title,
  highlights,
}: {
  title: string;
  highlights: readonly (ProgrammeHighlight & { image: string; alt: string })[];
}) {
  const [active, setActive] = useState(0);
  const intent = useRef<number>(0);
  const open = (index: number) => {
    window.clearTimeout(intent.current);
    setActive(index);
  };
  const openOnHover = (index: number) => {
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => setActive(index), 40);
  };
  useEffect(() => () => window.clearTimeout(intent.current), []);
  return (
    <Section labelledBy="day-title" className="pt-0 sm:pt-0">
      <SectionTitle id="day-title">{title}</SectionTitle>
      <div data-reveal>
        <ul
          onMouseLeave={() => window.clearTimeout(intent.current)}
          className="mt-10 grid gap-3 transition-[grid-template-columns] duration-[750ms] ease-[cubic-bezier(0.65,0,0.35,1)] lg:h-[34rem] lg:[grid-template-columns:var(--cols)]"
          style={{ "--cols": highlights.map((_, index) => (index === active ? "5fr" : "1fr")).join(" ") } as CSSProperties}
        >
          {highlights.map((highlight, index) => {
            const isOpen = index === active;
            return (
              <li
                key={highlight.title}
                tabIndex={0}
                onMouseEnter={() => openOnHover(index)}
                onFocus={() => open(index)}
                onClick={() => open(index)}
                className="group relative min-h-[22rem] overflow-hidden rounded-[28px] bg-night-2 outline-offset-4 lg:min-h-0"
              >
                <div className="absolute inset-0 lg:right-auto lg:left-1/2 lg:w-[40rem] lg:-translate-x-1/2">
                  <Image
                    src={highlight.image}
                    alt={highlight.alt}
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className={cn(
                      "object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
                      isOpen ? "lg:scale-100" : "lg:scale-110",
                    )}
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/45 to-night/5"
                />
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 hidden bg-night/55 transition-opacity duration-[750ms] ease-in-out lg:block",
                    isOpen ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-lg font-bold tracking-[-0.02em] whitespace-nowrap text-cream transition-opacity [writing-mode:vertical-rl] rotate-180 lg:block",
                    isOpen ? "opacity-0 duration-150" : "opacity-100 delay-500 duration-300",
                  )}
                >
                  {highlight.title}
                </span>
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-6 transition-[opacity,translate] sm:p-8 lg:w-[28rem] lg:p-8",
                    isOpen ? "opacity-100 duration-500 delay-300 lg:translate-y-0" : "duration-150 lg:translate-y-3 lg:opacity-0",
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
      </div>
    </Section>
  );
}
