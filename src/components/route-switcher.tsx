"use client";

import Image from "next/image";
import { useState } from "react";
import { INVOLVEMENT_ROUTES } from "@/content/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui";

export function RouteSwitcher() {
  const [active, setActive] = useState(0);
  const current = INVOLVEMENT_ROUTES[active];

  return (
    <div data-reveal className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-night-2 max-lg:aspect-[4/3]">
        {INVOLVEMENT_ROUTES.map((route, index) => (
          <Image
            key={route.title}
            src={route.photo.src}
            alt={route.photo.alt}
            fill
            sizes="(min-width: 1280px) 533px, (min-width: 1024px) 42vw, 100vw"
            className={cn(
              "object-cover transition-all duration-700 ease-out",
              index === active ? "scale-100 opacity-100" : "scale-110 opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-6 pt-20">
          <p key={current.title} className="max-w-sm animate-rise text-sm leading-6 text-cream/90">
            {current.body}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <ul className="border-t border-ink/10">
          {INVOLVEMENT_ROUTES.map((route, index) => (
            <li key={route.title} className="border-b border-ink/10">
              <button
                type="button"
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className="flex w-full items-baseline gap-6 py-5 text-left"
              >
                <span className={cn("w-6 text-xs transition-colors", index === active ? "text-ink" : "text-ink/65")}>{String(index + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "text-3xl font-medium tracking-[-0.03em] transition-all duration-300 sm:text-[2.6rem]",
                    index === active ? "translate-x-3 text-ink" : "text-ink/65 hover:text-ink",
                  )}
                >
                  {route.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {current.points.length ? (
          <ul key={current.title} className="mt-8 flex animate-rise flex-wrap gap-2">
            {current.points.map((point) => (
              <li key={point} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs text-ink/80">
                {point}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-8">
          <ButtonLink href={current.cta.href} external={current.cta.external}>
            {current.cta.label}
          </ButtonLink>
        </div>
        {current.links ? (
          <ul
            key={`${current.title}-links`}
            aria-label={`More ways in for ${current.title.toLowerCase()}`}
            className="mt-8 animate-rise border-t border-ink/10"
          >
            {current.links.map((link) => (
              <li key={link.href} className="border-b border-ink/10">
                <a
                  href={link.href}
                  className="block py-4 text-[15px] font-semibold text-ink hover:underline hover:underline-offset-4"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
