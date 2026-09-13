"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

type CounterProps = {
  /** Final value, e.g. "500", "50,000", "$99". */
  value: string;
  className?: string;
};

const PARTS = /^(\D*)(\d[\d,]*)(\D*)$/;

/** Critically damped spring rate: 90% at ~0.49s, settled at ~1.1s (measured from the source). */
const OMEGA = 8;

/**
 * Counts up to `value` on first scroll into view. The captured markup parked
 * the number at 0 with the final value hidden behind it for width reservation,
 * so the rollout is rebuilt here as a critically damped spring. Progress is
 * derived from elapsed time rather than frame deltas so the profile holds at
 * any frame rate.
 */
export default function Counter({ value, className }: CounterProps) {
  const parts = PARTS.exec(value);
  const prefix = parts ? parts[1] : "";
  const suffix = parts ? parts[3] : "";
  const target = parts ? Number(parts[2].replace(/,/g, "")) : 0;

  const ref = useRef<HTMLHeadingElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      return;
    }

    let raf = 0;
    let start = 0;

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      const progress = 1 - (1 + OMEGA * t) * Math.exp(-OMEGA * t);
      if (progress > 0.999) {
        setCurrent(target);
        return;
      }
      setCurrent(Math.round(target * progress));
      raf = requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        start = performance.now();
        raf = requestAnimationFrame(frame);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <h3
      ref={ref}
      className={cn("[font-variant-numeric:tabular-nums]", className)}
      data-component="heading"
    >
      {prefix}
      {current.toLocaleString("en-US")}
      {suffix}
    </h3>
  );
}
