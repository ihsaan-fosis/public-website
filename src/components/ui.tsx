import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HeroVideo, type HeroVideoSources } from "./motion";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-10", className)}>{children}</div>;
}

export function Section({
  children,
  id,
  labelledBy,
  className,
}: {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

/** Stagger helper for `data-reveal` children. */
export function revealDelay(index: number): CSSProperties {
  const style: CSSProperties & { "--reveal-delay": string } = { "--reveal-delay": `${index * 90}ms` };
  return style;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-ink/65 uppercase", className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-gradient-to-br from-ihsaan-purple to-ihsaan-light-blue" />
      {children}
    </p>
  );
}

export const displayClass = "font-extrabold tracking-[-0.035em] text-ink";

export function SectionHeading({
  id,
  eyebrow,
  title,
  aside,
  action,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div data-reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className={cn("mt-3 text-3xl leading-[1.1] sm:text-[2.6rem]", displayClass)}>
          {title}
        </h2>
      </div>
      {aside ? <p className="max-w-xs text-sm leading-6 text-ink/65">{aside}</p> : null}
      {action}
    </div>
  );
}

type ButtonTone = "accent" | "light-outline" | "ghost" | "solid" | "white";

/** Flat rounded-rectangle buttons (rounded-xl, a step down from the 22px panels): no gradients, glass, glow or arrows (docs/IHSAAN-DESIGN.md). */
const BUTTON_TONES: Record<ButtonTone, string> = {
  accent: "bg-ihsaan-blue text-white ring-ihsaan-blue dark:bg-ihsaan-light-blue dark:text-black dark:ring-ihsaan-light-blue",
  "light-outline": "text-cream ring-cream/50",
  ghost: "text-ink ring-ink/25",
  solid: "bg-ink text-page ring-ink",
  white: "bg-white text-night ring-white",
};

const BUTTON_BASE =
  "inline-flex min-h-[52px] items-center justify-center rounded-xl px-8 text-[12.5px] font-bold uppercase tracking-[0.14em] ring-1 transition-[translate,scale,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgb(0_0_0/0.22)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent active:translate-y-0 active:scale-[0.98] active:shadow-none";

export function ButtonLink({
  href,
  children,
  tone = "accent",
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  external?: boolean;
  className?: string;
}) {
  const classes = cn(BUTTON_BASE, BUTTON_TONES[tone], className);
  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Soft purple and light-blue light behind a section. */
export function Glow({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute -top-24 -left-32 size-[34rem] rounded-full bg-ihsaan-purple/20 blur-[110px] dark:bg-ihsaan-purple/35" />
      <div className="absolute -right-24 bottom-0 size-[30rem] rounded-full bg-ihsaan-light-blue/20 blur-[110px] dark:bg-ihsaan-light-blue/30" />
    </div>
  );
}

/** Inset, rounded full-bleed photo frame with an animated headline anchored bottom-left. */
export function PhotoHero({
  image,
  video,
  badge,
  title,
  intro,
  children,
  tall = false,
  editorial = false,
  lcp = true,
}: {
  image: string;
  video?: HeroVideoSources;
  badge?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  tall?: boolean;
  /** A restrained stacked headline, with the intro above the actions set to its right on large screens so the media stays the focus. */
  editorial?: boolean;
  /** The hero is the page's largest paint, so it loads first. Pass false where the hero is not the page's LCP. */
  lcp?: boolean;
}) {
  const words = title.split(" ");
  return (
    <section className="p-2 sm:p-3">
      <div
        className={cn(
          "hero-frame relative isolate flex overflow-hidden rounded-[28px] bg-night-2",
          // 65px is the sticky header (h-16 plus its border), 1rem and 1.5rem the section's p-2 and sm:p-3 gutters.
          tall ? "min-h-[calc(100svh-65px-1rem)] sm:min-h-[calc(100svh-65px-1.5rem)]" : "min-h-[64svh]",
        )}
      >
        {video ? (
          <HeroVideo video={video} poster={image} />
        ) : (
          <div className="hero-media absolute inset-0 -z-20">
            <Image
              src={image}
              alt=""
              fill
              sizes="100vw"
              loading={lcp ? "eager" : "lazy"}
              fetchPriority={lcp ? "high" : "auto"}
              className="object-cover"
            />
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,22,41,0.55)_0%,rgba(6,22,41,0.6)_40%,rgba(6,22,41,0.92)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_90%_100%,rgba(101,64,138,0.55),transparent_70%)]"
        />
        <Container
          className={cn(
            "hero-copy flex flex-col justify-end pb-12 sm:pb-16",
            editorial ? "pt-16 sm:pt-20 lg:grid lg:grid-cols-[1fr_auto] lg:content-end lg:items-end lg:gap-x-12" : "pt-36",
          )}
        >
          {badge ? (
            <div className={cn("animate-rise", editorial && "lg:col-span-2")}>
              <span className="inline-flex items-center gap-2 rounded-full bg-night/55 px-3 py-1.5 text-xs font-medium text-cream ring-1 ring-white/15 backdrop-blur">
                <span aria-hidden className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-ihsaan-lavender/70" style={{ animationIterationCount: 3 }} />
                  <span className="relative size-2 rounded-full bg-ihsaan-lavender" />
                </span>
                {badge}
              </span>
            </div>
          ) : null}
          <h1
            aria-label={title}
            className={cn(
              "font-extrabold text-cream",
              editorial
                ? "hero-title-editorial mt-5 leading-[1.08] tracking-[-0.03em]"
                : "mt-6 max-w-5xl text-[2.6rem] leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-[5.5rem]",
            )}
          >
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                aria-hidden
                className={cn("overflow-hidden pb-[0.08em] align-bottom", editorial ? "block" : "inline-block")}
              >
                <span className="inline-block animate-rise" style={{ animationDelay: `${150 + index * 90}ms` }}>
                  {editorial && word.endsWith(".") ? (
                    <>
                      {word.slice(0, -1)}
                      <span className="text-ihsaan-lavender">.</span>
                    </>
                  ) : (
                    word
                  )}
                </span>
                {index < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          {editorial ? (
            <div
              className="mt-6 flex animate-rise flex-col items-start gap-6 sm:mt-8 lg:mt-0"
              style={{ animationDelay: `${300 + words.length * 90}ms` }}
            >
              {intro ? <p className="max-w-sm text-sm leading-6 text-cream/70">{intro}</p> : null}
              {children}
            </div>
          ) : (
            <>
              {intro ? (
                <p
                  className="mt-6 max-w-xl animate-rise text-[15px] leading-7 text-cream/80"
                  style={{ animationDelay: `${300 + words.length * 90}ms` }}
                >
                  {intro}
                </p>
              ) : null}
              {children ? (
                <div className="animate-rise" style={{ animationDelay: `${420 + words.length * 90}ms` }}>
                  {children}
                </div>
              ) : null}
            </>
          )}
        </Container>
      </div>
    </section>
  );
}
