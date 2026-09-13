"use client";

import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

const LINKS = [
  { href: "/about", label: "Our story" },
  { href: "/#speakers", label: "Programmes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-5 lg:px-7.5 lg:pt-6">
      <nav
        aria-label="Primary"
        className={cn(
          "w-full max-w-300 rounded-[100px] px-5 py-3 transition-all duration-300 lg:px-7.5 lg:py-4",
          scrolled || open
            ? "bg-[#041426]/90 shadow-[0_8px_32px_rgba(4,20,38,0.45)] backdrop-blur-md"
            : "bg-white/10 backdrop-blur-md",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="/" aria-label="IHSAAN home" className="shrink-0">
            <img
              src="/media/white-logo.webp"
              alt="IHSAAN"
              width={172}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-[Poppins,sans-serif] text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:text-[#8FB4E3]"
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#8FB4E3] transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </a>
            ))}
          </div>

          <a
            href="/contact"
            className="group hidden items-center gap-3 rounded-[100px] bg-white py-1.5 pl-6 pr-1.5 font-[Poppins,sans-serif] text-sm font-semibold uppercase text-[#0A3463] transition-colors duration-300 hover:bg-[#E8DFF0] lg:flex"
          >
            Get involved
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A3463] text-white transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M5.8 14.2 14.2 5.8M6.7 5.8h7.5v7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-white/10 lg:hidden"
          >
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-transform duration-300",
                open && "translate-y-[4px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-transform duration-300",
                open && "-translate-y-[4px] -rotate-45",
              )}
            />
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-1 pb-3 pt-4 lg:hidden">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-[Poppins,sans-serif] text-sm font-semibold uppercase text-white transition-colors duration-200 hover:bg-white/10 hover:text-[#8FB4E3]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-[100px] bg-white px-6 py-3 text-center font-[Poppins,sans-serif] text-sm font-semibold uppercase text-[#0A3463]"
            >
              Get involved
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
