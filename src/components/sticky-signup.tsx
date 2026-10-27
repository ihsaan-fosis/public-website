"use client";

import { useEffect, useState } from "react";
import { MEMBER_PORTAL_SIGNUP } from "@/content/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui";

/** Keeps the sign-up button in reach once the hero has scrolled away, and steps aside over the closing band and the footer. */
export function StickySignUp({ label = "Create your account" }: { label?: string }) {
  const [covered, setCovered] = useState(true);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const targets = [
      document.getElementById("hero"),
      document.querySelector('[aria-labelledby="join-cta-title"]'),
      document.querySelector("footer"),
    ].filter((target): target is Element => target !== null);
    const inView = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target);
        else inView.delete(entry.target);
      }
      setCovered(inView.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const visible = !covered;

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "fixed inset-x-4 bottom-4 z-40 transition-[opacity,translate] duration-500 ease-out sm:inset-x-auto sm:right-6 sm:bottom-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ButtonLink href={MEMBER_PORTAL_SIGNUP.href} external className="shadow-[0_8px_24px_rgb(0_0_0/0.28)]">
        {label}
      </ButtonLink>
    </div>
  );
}
