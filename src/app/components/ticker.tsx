"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";

type TickerProps = {
  className?: string;
  /** Horizontal speed in px/s, matching the source ticker. */
  speed?: number;
  children: ReactNode;
};

/**
 * Continuous horizontal marquee. The captured markup froze one animation frame
 * as a static translate, so the item list is echoed once and the row is driven
 * by rAF at the source speed, wrapping by the measured width of one set.
 * Like the source, the offset wraps within [-distance - inset, -inset), where
 * inset is the row's distance from the viewport edge, so the viewport's left
 * edge is covered from the first frame.
 */
export default function Ticker({ className, speed = 60, children }: TickerProps) {
  const list = useRef<HTMLUListElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const el = list.current;
    if (!el || items.length === 0) return;

    const first = el.children[0] as HTMLElement | undefined;
    const echo = el.children[items.length] as HTMLElement | undefined;
    if (!first || !echo) return;

    let distance = 0;
    let inset = 0;
    let offset = 0;

    const render = () => {
      if (distance <= 0) return;
      while (offset >= -inset) offset -= distance;
      while (offset < -inset - distance) offset += distance;
      el.style.transform = `translateX(${offset}px)`;
    };
    // offsetLeft and the parent's box ignore the list's own transform.
    const measure = () => {
      distance = echo.offsetLeft - first.offsetLeft;
      inset = Math.max(el.parentElement?.getBoundingClientRect().left ?? 0, 0);
      render();
    };
    measure();
    window.addEventListener("resize", measure);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("resize", measure);
    }

    let last = performance.now();
    let visible = true;
    let raf = 0;

    const frame = (now: number) => {
      // Exact elapsed time, so the speed does not depend on the frame rate.
      const dt = Math.max((now - last) / 1000, 0);
      last = now;
      if (visible) {
        offset -= speed * dt;
        render();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = performance.now();
    });
    // The list's own box is translated off-screen, so watch its parent.
    observer.observe(el.parentElement ?? el);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length, speed]);

  return (
    <ul ref={list} className={className}>
      {items}
      {items.map((item, i) =>
        isValidElement(item) ? (
          cloneElement(item as ReactElement<Record<string, unknown>>, {
            key: `ticker-echo-${i}`,
            "aria-hidden": "true",
          })
        ) : (
          <li key={`ticker-echo-${i}`} aria-hidden="true" />
        ),
      )}
    </ul>
  );
}
