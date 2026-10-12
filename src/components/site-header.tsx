"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { GET_INVOLVED, MEMBER_PORTAL, NAV_LINKS, type NavItem } from "@/content/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "./ui";

function isActive(pathname: string, href: string) {
  return !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));
}

function itemIsActive(pathname: string, item: NavItem) {
  if (isActive(pathname, item.href)) return true;
  return item.children?.some((child) => isActive(pathname, child.href)) ?? false;
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

const navLinkClass =
  "relative rounded-xl px-3.5 py-2 text-sm whitespace-nowrap font-semibold tracking-[0.08em] uppercase transition-colors";

function DesktopNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const children = item.children;
  const active = itemIsActive(pathname, item);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!children?.length) {
    return (
      <Link
        href={item.href}
        scroll={false}
        aria-current={active ? "page" : undefined}
        className={cn(navLinkClass, active ? "bg-ink/10 text-ink" : "text-ink/70 hover:bg-ink/5 hover:text-ink")}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={cn(
          navLinkClass,
          "inline-flex items-center gap-0.5",
          active || open ? "bg-ink/10 text-ink" : "text-ink/70 hover:bg-ink/5 hover:text-ink",
        )}
      >
        <Link
          href={item.href}
          scroll={false}
          aria-current={isActive(pathname, item.href) ? "page" : undefined}
          className="px-1"
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={menuId}
          aria-label={`${item.label} menu`}
          className="rounded-lg p-1 hover:bg-ink/10"
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className={cn("transition-transform", open && "rotate-180")}>
            <path d="M2 3.5L5 6.5L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div
        id={menuId}
        role="menu"
        aria-label={item.label}
        hidden={!open}
        className={cn(
          "absolute top-full left-0 z-50 min-w-[15rem] pt-2",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <ul className="rounded-2xl bg-page p-2 ring-1 ring-ink/10">
          {children.map((child) => {
            const childActive = isActive(pathname, child.href);
            return (
              <li key={`${child.href}-${child.label}`} role="none">
                <Link
                  role="menuitem"
                  href={child.href}
                  scroll={false}
                  aria-current={childActive ? "page" : undefined}
                  className={cn(
                    "block rounded-xl px-3.5 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-colors",
                    childActive ? "bg-ink/10 text-ink" : "text-ink/75 hover:bg-ink/5 hover:text-ink",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const scrollTarget = useRef<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  useEffect(() => {
    if (scrollTarget.current !== pathname) return;
    scrollTarget.current = null;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
    <header
      className="sticky top-0 z-50 border-b border-ink/10 bg-page/90 backdrop-blur-xl"
      onClickCapture={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target instanceof Element ? event.target.closest("a") : null;
        if (!(link instanceof HTMLAnchorElement)) return;
        if (link.origin !== window.location.origin || link.hash || link.target === "_blank") return;
        if (link.pathname === pathname) {
          if (link.search === window.location.search && !window.location.hash) event.preventDefault();
          scrollTarget.current = null;
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        } else {
          scrollTarget.current = link.pathname;
        }
        setOpen(false);
      }}
    >
      <div className="flex h-16 w-full items-center justify-between gap-3 px-5 sm:px-10">
        <Link href="/" scroll={false} aria-label="IHSAAN home" className="flex h-11 items-center">
          <Wordmark className="h-6 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((item) => (
            <DesktopNavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={MEMBER_PORTAL.href}
            external
            tone="ghost"
            size="compact"
            className="whitespace-nowrap max-sm:hidden"
          >
            {MEMBER_PORTAL.label}
          </ButtonLink>
          <ButtonLink
            href={GET_INVOLVED.href}
            scroll={false}
            size="compact"
            className="whitespace-nowrap max-sm:hidden"
          >
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
          <div className="w-full px-5 pt-2 pb-5 sm:px-10">
            {NAV_LINKS.map((item, index) => {
              const children = item.children;
              const delay = open ? `${80 + index * 50}ms` : "0ms";
              const showChildren = Boolean(children?.length) && (expanded === item.href || itemIsActive(pathname, item));

              if (!children?.length) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    scroll={false}
                    onClick={() => setOpen(false)}
                    style={{ transitionDelay: delay }}
                    className={cn(
                      "block border-b border-ink/10 py-3.5 text-lg font-semibold tracking-[-0.02em] text-ink transition-all duration-500",
                      open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.href}
                  style={{ transitionDelay: delay }}
                  className={cn(
                    "border-b border-ink/10 transition-all duration-500",
                    open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      scroll={false}
                      onClick={() => setOpen(false)}
                      className="flex-1 py-3.5 text-lg font-semibold tracking-[-0.02em] text-ink"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className="flex size-10 items-center justify-center rounded-xl text-ink hover:bg-ink/10"
                      aria-expanded={showChildren}
                      aria-controls={`mobile-sub-${item.href.slice(1)}`}
                      aria-label={`${showChildren ? "Hide" : "Show"} ${item.label} links`}
                      onClick={() => setExpanded((value) => (value === item.href ? null : item.href))}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 10 10"
                        aria-hidden
                        className={cn("transition-transform", showChildren && "rotate-180")}
                      >
                        <path
                          d="M2 3.5L5 6.5L8 3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <ul
                    id={`mobile-sub-${item.href.slice(1)}`}
                    hidden={!showChildren}
                    className="space-y-1 pb-3 pl-3"
                  >
                    {children.map((child) => (
                      <li key={`${child.href}-${child.label}`}>
                        <Link
                          href={child.href}
                          scroll={false}
                          onClick={() => setOpen(false)}
                          className="block rounded-xl px-3 py-2 text-base font-medium text-ink/75 hover:bg-ink/5 hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <ButtonLink href={MEMBER_PORTAL.href} external tone="ghost" className="mt-4 w-full">
              {MEMBER_PORTAL.label}
            </ButtonLink>
            <ButtonLink href={GET_INVOLVED.href} scroll={false} className="mt-2 w-full">
              {GET_INVOLVED.label}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
