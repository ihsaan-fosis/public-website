import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    <p className={cn("flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-ink/55 uppercase", className)}>
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
      {aside ? <p className="max-w-xs text-sm leading-6 text-ink/60">{aside}</p> : null}
      {action}
    </div>
  );
}

type ButtonTone = "accent" | "light-outline" | "ghost" | "solid" | "white";

/** Flat rounded-rectangle buttons (rounded-xl, a step down from the 22px panels): no gradients, glass, glow or arrows (docs/IHSAAN-DESIGN.md). */
const BUTTON_TONES: Record<ButtonTone, string> = {
  accent: "bg-accent text-accent-ink ring-1 ring-accent hover:opacity-90",
  "light-outline": "text-cream ring-1 ring-cream/50 hover:bg-cream/10 hover:ring-cream",
  ghost: "text-ink ring-1 ring-ink/25 hover:bg-ink/5 hover:ring-ink/50",
  solid: "bg-ink text-page ring-1 ring-ink hover:opacity-90",
  white: "bg-white text-night ring-1 ring-white hover:bg-cream hover:ring-cream",
};

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
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center rounded-xl px-6 text-sm font-medium tracking-[-0.01em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-px",
    BUTTON_TONES[tone],
    className,
  );
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

/** Soft purple and light-blue light that drifts behind a section. */
export function Glow({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute -top-24 -left-32 size-[34rem] animate-float rounded-full bg-ihsaan-purple/20 blur-[110px] dark:bg-ihsaan-purple/35" />
      <div className="absolute -right-24 bottom-0 size-[30rem] animate-float rounded-full bg-ihsaan-light-blue/20 blur-[110px] [animation-delay:-4s] dark:bg-ihsaan-light-blue/30" />
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
}: {
  image: string;
  video?: string;
  badge: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  tall?: boolean;
}) {
  const words = title.split(" ");
  return (
    <section className="p-2 sm:p-3">
      <div
        className={cn(
          "hero-frame relative isolate flex overflow-hidden rounded-[28px] bg-night-2",
          tall ? "min-h-[92svh]" : "min-h-[64svh]",
        )}
      >
        <div className="hero-media absolute inset-0 -z-20">
          <div className="h-full w-full animate-kenburns">
            {video ? (
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={image}
                src={video}
                aria-hidden
              />
            ) : (
              <img src={image} alt="" className="h-full w-full object-cover" />
            )}
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,22,41,0.45)_0%,rgba(6,22,41,0.1)_40%,rgba(6,22,41,0.92)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_90%_100%,rgba(101,64,138,0.55),transparent_70%)]"
        />
        <Container className="hero-copy flex flex-col justify-end pt-36 pb-12 sm:pb-16">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium text-cream ring-1 ring-white/15 backdrop-blur">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-ihsaan-lavender/70" />
                <span className="relative size-2 rounded-full bg-ihsaan-lavender" />
              </span>
              {badge}
            </span>
          </div>
          <h1
            aria-label={title}
            className="mt-6 max-w-5xl text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.04em] text-cream sm:text-7xl lg:text-[5.5rem]"
          >
            {words.map((word, index) => (
              <span key={`${word}-${index}`} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="inline-block animate-rise" style={{ animationDelay: `${150 + index * 90}ms` }}>
                  {word}
                </span>
                {index < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
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
        </Container>
      </div>
    </section>
  );
}
