"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { cn } from "@/lib/utils";

function canObserve() {
  return "IntersectionObserver" in window;
}

function prefersReducedMotion() {
  return "matchMedia" in window && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Adds `is-visible` to every `[data-reveal]` element as it enters the viewport. Mounted once in the layout. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    if (!canObserve()) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

const NUMBER = /^(\D*)(\d[\d,]*)(.*)$/;

/** Counts a numeric value up from zero when it scrolls into view. Non-numeric values render as-is. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const parts = NUMBER.exec(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!parts || !node || !canObserve() || prefersReducedMotion()) return;
    const [, prefix, digits, suffix] = parts;
    const target = Number(digits.replace(/,/g, ""));
    const format = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-GB")}${suffix}`;
    let frame = 0;
    setDisplay(format(0));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          setDisplay(format(target * (1 - Math.pow(1 - t, 4))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </span>
  );
}

/** Words brighten one by one as the block scrolls through the viewport. Unlit words stay at 4.5:1 contrast so the text is always readable. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    let frame = 0;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const raw = (viewport * 0.85 - rect.top) / (rect.height + viewport * 0.35);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const lit = progress * words.length;
  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="transition-opacity duration-300"
          style={{ opacity: index < lit ? 1 : 0.65 }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

type Theme = "light" | "dark";

/** Flips `data-theme` on <html> and remembers the choice. The initial value is set before paint in the layout. */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the toggle still works for this visit.
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative flex size-10 items-center justify-center rounded-xl text-ink transition-colors hover:bg-ink/10",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="size-[18px] transition-transform duration-500 dark:rotate-90 dark:scale-0"
      >
        <path
          d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="absolute size-[18px] scale-0 -rotate-90 transition-transform duration-500 dark:scale-100 dark:rotate-0"
      >
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

/**
 * The hero's background video and slow zoom, with a control to pause both (WCAG 2.2.2).
 * Muted autoplay is allowed by WCAG; 2.2.2 only requires a pause control. Playback starts from
 * script rather than the `autoPlay` attribute so reduced-motion visitors keep the poster and
 * never download the video. Mobile browsers often reject the first `play()` while `preload="none"`,
 * so motion-ok visitors bump preload and retry once data is ready.
 */
export type HeroVideoSources = {
  src: string;
  /** Centre crop of `src` for portrait phones, where `object-cover` only shows that slice anyway. */
  portraitSrc: string;
};

export function HeroVideo({ video, poster }: { video: HeroVideoSources; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // The poster is the first paint of the hero (and its LCP) until the video starts, so fetch it early.
  preload(poster, { as: "image", fetchPriority: "high" });

  // Blocked autoplay rejects; the poster stays and the control offers Play.
  const play = (media: HTMLVideoElement) => Promise.resolve(media.play()).catch(() => undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const cleanups: Array<() => void> = [];

    const tryPlay = () => {
      if (cancelled || prefersReducedMotion()) return;
      // `preload="none"` leaves nothing buffered; iOS/Safari often reject that first play().
      if (el.preload === "none") el.preload = "auto";
      void Promise.resolve(el.play()).catch(() => {
        if (cancelled || prefersReducedMotion()) return;
        const retry = () => {
          if (!cancelled && !prefersReducedMotion()) void play(el);
        };
        el.addEventListener("loadeddata", retry, { once: true });
        cleanups.push(() => el.removeEventListener("loadeddata", retry));
        if (el.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) el.load();
      });
    };

    tryPlay();

    if (!("matchMedia" in window)) {
      return () => {
        cancelled = true;
        cleanups.forEach((fn) => fn());
      };
    }

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) el.pause();
      else tryPlay();
    };
    query.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      query.removeEventListener("change", onChange);
    };
  }, []);

  const toggle = () => {
    const media = ref.current;
    if (!media) return;
    if (media.paused) play(media);
    else media.pause();
  };

  return (
    <>
      <div className="hero-media absolute inset-0 -z-20">
        <div className={cn("h-full w-full animate-kenburns", !playing && "[animation-play-state:paused]")}>
          <video
            ref={ref}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            poster={poster}
            aria-hidden
          >
            <source src={video.portraitSrc} type="video/mp4" media="(max-width: 767px) and (orientation: portrait)" />
            <source src={video.src} type="video/mp4" />
          </video>
        </div>
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute top-4 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-night/50 text-cream ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-night/70 sm:top-auto sm:right-6 sm:bottom-6"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="size-3" fill="currentColor">
          {playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13a.5.5 0 0 0 .77.42l10-6.5a.5.5 0 0 0 0-.84l-10-6.5A.5.5 0 0 0 8 5.5Z" />}
        </svg>
      </button>
    </>
  );
}

/** Wraps the partner marquees with one control that pauses every row. Reduced motion already renders them static. */
export function MarqueeGroup({ children, className }: { children: ReactNode; className?: string }) {
  const [paused, setPaused] = useState(false);

  return (
    <div data-paused={paused || undefined} className={cn("group/marquee", className)}>
      {children}
      <div className="mx-auto flex w-full max-w-7xl justify-end px-5 pt-3 motion-reduce:hidden sm:px-10">
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          className="inline-flex min-h-10 items-center rounded-full px-4 text-xs font-medium text-ink ring-1 ring-ink/25 transition-colors hover:bg-ink/5"
        >
          {paused ? "Play partner logos" : "Pause partner logos"}
        </button>
      </div>
    </div>
  );
}
