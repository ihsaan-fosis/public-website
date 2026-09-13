"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

const LINKS = [
  { href: "/about", label: "Our story" },
  { href: "/#programmes", label: "Programmes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const tone = compact ? "text-[#0A3463]" : "text-white";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-10 z-50 flex justify-center px-4 md:px-[60px]">
      <div
        className={cn(
          "pointer-events-auto relative grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-[50px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          compact
            ? "max-w-[1200px] bg-white/90 py-1.5 pr-1.5 pl-5 shadow-[0_4px_24px_rgba(10,52,99,0.12)] backdrop-blur-[5px]"
            : "max-w-[1440px] bg-transparent p-0 shadow-none",
        )}
      >
        <Link href="/" className="flex h-[50px] items-center justify-self-start" aria-label="IHSAAN home">
          <img
            src={compact ? "/media/blue-logo.webp" : "/media/white-logo.webp"}
            alt="IHSAAN"
            width={184}
            height={40}
            className="h-10 w-auto object-contain object-left max-md:h-8"
          />
        </Link>

        <nav className="hidden items-center gap-[30px] justify-self-center min-[1180px]:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("font-[Poppins,sans-serif] text-lg hover:opacity-70", tone)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="col-start-3 flex items-center justify-end gap-3 justify-self-end">
          <Link
            href="/contact"
            className="ihsaan-evenco-cta group relative flex h-[50px] items-center overflow-hidden rounded-[30px] bg-[#0A3463] py-[15px] pl-[30px] pr-[5px] font-[Poppins,sans-serif] text-lg text-white max-md:hidden"
          >
            <span className="ihsaan-evenco-label relative z-[1]" aria-hidden={false}>
              Get involved
            </span>
            <span className="ihsaan-evenco-bg" aria-hidden />
            <span className="relative z-[1] ml-[34px] flex size-10 items-center justify-center overflow-hidden rounded-full">
              <svg
                className="ihsaan-evenco-arrow ihsaan-evenco-arrow-1"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5.8 14.2 14.2 5.8M6.7 5.8h7.5v7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                className="ihsaan-evenco-arrow ihsaan-evenco-arrow-2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5.8 14.2 14.2 5.8M6.7 5.8h7.5v7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
          <button
            type="button"
            className={cn(
              "flex size-[50px] items-center justify-center rounded-full hover:opacity-70 min-[1180px]:hidden",
              tone,
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            className="absolute top-[calc(100%+10px)] right-0 left-0 flex flex-col gap-1 rounded-[28px] bg-white/95 p-4 backdrop-blur-[5px] min-[1180px]:hidden"
            aria-label="Mobile primary"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2 font-[Poppins,sans-serif] text-lg text-[#0A3463] hover:bg-black/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-1 rounded-[30px] bg-[#0A3463] px-5 py-3 text-center font-[Poppins,sans-serif] text-lg text-white"
              onClick={() => setOpen(false)}
            >
              Get involved
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
