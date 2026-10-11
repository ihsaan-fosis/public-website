"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GET_INVOLVED, NAV_LINKS } from "@/content/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui";

function isActive(pathname: string, href: string) {
  return !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <>
      <img src="/media/blue-logo.webp" alt="IHSAAN" width={900} height={188} className={cn("dark:hidden", className)} />
      <img
        src="/media/white-logo.webp"
        alt="IHSAAN"
        width={700}
        height={152}
        className={cn("hidden dark:block", className)}
      />
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-page/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-5 sm:px-10">
        <Link href="/" aria-label="IHSAAN home" className="flex h-11 items-center">
          <Wordmark className="h-6 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-xl px-3.5 py-2 text-sm font-semibold tracking-[0.08em] uppercase transition-colors",
                  active ? "bg-ink/10 text-ink" : "text-ink/70 hover:bg-ink/5 hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ButtonLink href={GET_INVOLVED.href} className="max-sm:hidden">
            {GET_INVOLVED.label}
          </ButtonLink>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl text-ink hover:bg-ink/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d={open ? "M6 6l12 12" : "M4 8h16"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="transition-all"
              />
              <path
                d={open ? "M18 6L6 18" : "M4 16h16"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="transition-all"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 top-full grid bg-page transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          open ? "grid-rows-[1fr] border-b border-ink/10" : "grid-rows-[0fr]",
        )}
      >
        <nav id="mobile-nav" aria-label="Mobile primary" className="overflow-hidden" inert={!open}>
          <div className="mx-auto max-w-7xl px-5 pt-2 pb-5 sm:px-10">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${80 + index * 50}ms` : "0ms" }}
                className={cn(
                  "block border-b border-ink/10 py-3.5 text-lg font-semibold tracking-[-0.02em] text-ink transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
                )}
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href={GET_INVOLVED.href} className="mt-4 w-full">
              {GET_INVOLVED.label}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
