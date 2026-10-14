import Image from "next/image";
import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HeroVideo, type HeroVideoSources } from "./motion";

export function Container({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn("mx-auto w-full max-w-7xl px-5 sm:px-10", className)}>
      {children}
    </div>
  );
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

const TITLE_SIZE = "max-w-3xl text-[2rem] leading-[1.05] sm:text-5xl";

/** `compact` is for titles in a narrow column beside other content. */
export function SectionTitle({
  id,
  children,
  compact = false,
  className,
}: {
  id: string;
  children: ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 id={id} className={cn(compact ? "text-[1.75rem] leading-[1.1] sm:text-4xl" : TITLE_SIZE, displayClass)}>
        {children}
      </h2>
    </div>
  );
}

export function SectionHeading({
  id,
  title,
  aside,
  action,
}: {
  id: string;
  title: ReactNode;
  aside?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div data-reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <h2 id={id} className={cn(TITLE_SIZE, displayClass)}>
        {title}
      </h2>
      {aside ? <p className="max-w-xs text-sm leading-6 text-ink/65">{aside}</p> : null}
      {action}
    </div>
  );
}

/** The tall photo beside an editorial list. `sticky` keeps it in view while a long list scrolls past on large screens. */
export function PhotoFrame({ src, alt, sticky = false }: { src: string; alt: string; sticky?: boolean }) {
  return (
    <div className={cn(sticky && "lg:sticky lg:top-24 lg:self-start")}>
      <div
        data-reveal
        className="group relative aspect-[4/5] overflow-hidden rounded-[28px] bg-night-2 max-lg:aspect-[4/3]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 533px, (min-width: 1024px) 42vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
      </div>
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
  "inline-flex items-center justify-center rounded-xl font-bold uppercase ring-1 transition-[translate,scale,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgb(0_0_0/0.22)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent active:translate-y-0 active:scale-[0.98] active:shadow-none";

type ButtonSize = "default" | "compact";

const BUTTON_SIZES: Record<ButtonSize, string> = {
  default: "min-h-[52px] px-8 text-[12.5px] tracking-[0.14em]",
  compact: "min-h-9 px-4 text-[11px] tracking-[0.12em]",
};

/** Button styling for non-link controls such as form submits, so they match `ButtonLink`. */
export function buttonClassName({
  tone = "accent",
  size = "default",
  className,
}: {
  tone?: ButtonTone;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(BUTTON_BASE, BUTTON_SIZES[size], BUTTON_TONES[tone], className);
}

export function ButtonLink({
  href,
  children,
  tone = "accent",
  size = "default",
  external = false,
  className,
  scroll,
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
  scroll?: boolean;
}) {
  const classes = buttonClassName({ tone, size, className });
  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} scroll={scroll} className={classes}>
      {children}
    </Link>
  );
}

/** Inset, rounded full-bleed photo frame: a stacked headline anchored bottom-left, with the intro above the actions set to its right on large screens so the media stays the focus. */
export function PhotoHero({
  image,
  video,
  title,
  intro,
  children,
  tall = false,
  lcp = true,
  id = "hero",
}: {
  image: string;
  video?: HeroVideoSources;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  tall?: boolean;
  /** The hero is the page's largest paint, so it loads first. Pass false where the hero is not the page's LCP. */
  lcp?: boolean;
  /** Optional section id. Defaults to `hero` so in-page anchors can target the page top. */
  id?: string;
}) {
  const words = title.split(" ");
  return (
    <section id={id} className="p-2 sm:p-3">
      <div
        className={cn(
          "hero-frame relative isolate flex overflow-hidden rounded-[28px] bg-night-2",
          // 64px is the sticky header (h-16), 1rem and 1.5rem the section's p-2 and sm:p-3 gutters.
          tall ? "min-h-[calc(100svh-64px-1rem)] sm:min-h-[calc(100svh-64px-1.5rem)]" : "min-h-[64svh]",
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
        <div className="hero-copy flex w-full flex-col justify-end px-5 pt-16 pb-8 sm:px-10 sm:pt-20 sm:pb-10 lg:px-12 lg:pb-12 lg:grid lg:grid-cols-[1fr_auto] lg:content-end lg:items-end lg:gap-x-12">
          <h1 aria-label={title} className="hero-title-editorial leading-[1.08] font-extrabold tracking-[-0.03em] text-cream">
            {words.map((word, index) => {
              const endsSentence = word.endsWith(".");
              return (
                <Fragment key={`${word}-${index}`}>
                  <span aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <span className="inline-block animate-rise" style={{ animationDelay: `${150 + index * 90}ms` }}>
                      {endsSentence ? (
                        <>
                          {word.slice(0, -1)}
                          <span className="text-ihsaan-lavender">.</span>
                        </>
                      ) : (
                        word
                      )}
                    </span>
                  </span>
                  {index === words.length - 1 ? null : endsSentence ? <br aria-hidden /> : " "}
                </Fragment>
              );
            })}
          </h1>
          <div
            className="mt-6 flex animate-rise flex-col items-start gap-6 sm:mt-8 lg:mt-0"
            style={{ animationDelay: `${300 + words.length * 90}ms` }}
          >
            {intro ? <p className="max-w-sm text-sm leading-6 text-cream/70">{intro}</p> : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
