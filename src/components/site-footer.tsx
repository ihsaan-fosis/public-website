import Link from "next/link";
import type { ReactNode } from "react";
import { BLOG_LINK, EVENTS_LINK, GET_INVOLVED, LEGAL_LINKS, NAV_LINKS, SOCIAL_LINKS } from "@/content/site";
import { ThemeToggle } from "./motion";
import { Container, Eyebrow, Glow } from "./ui";

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <Eyebrow>{title}</Eyebrow>
      <ul className="mt-4 space-y-2.5 text-sm text-ink/75">{children}</ul>
    </div>
  );
}

const linkClass = "inline-block transition-transform duration-300 hover:translate-x-1 hover:text-ink";

const socialIconClass = "size-5";

function SocialIcon({ label }: { label: string }) {
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={socialIconClass} fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={socialIconClass} fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.28v1.56h.05c.46-.87 1.57-1.79 3.23-1.79 3.45 0 4.09 2.27 4.09 5.23v6.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
      </svg>
    );
  }

  if (label === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={socialIconClass} fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (label === "TikTok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={socialIconClass} fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    );
  }

  return <span className="text-sm">{label}</span>;
}

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-ink/10 pt-20">
      <Glow className="opacity-70" />
      <Container>
        <div className="grid gap-10 pb-14 sm:grid-cols-3">
          <FooterColumn title="Explore">
            {[...NAV_LINKS, BLOG_LINK, EVENTS_LINK, GET_INVOLVED].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <div>
            <Eyebrow>Follow</Eyebrow>
            <ul className="mt-4 flex items-center gap-4 text-ink/75">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex transition-colors duration-300 hover:text-ink"
                  >
                    <SocialIcon label={link.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <FooterColumn title="Based in">
            <li>UK & Ireland</li>
            <li>A national careers programme of FOSIS</li>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-3 text-xs text-ink/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} IHSAAN. All rights reserved. Made by{" "}
            <a
              href="https://mikhailwijanarko.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              @mikhailbuilds
            </a>
          </p>
          <div className="flex items-center gap-6">
            <nav aria-label="Legal" className="flex gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </Container>
      <div className="mx-auto mt-10 max-w-7xl px-5 pb-6 sm:px-10">
        <img
          src="/media/blue-logo-large.webp"
          alt=""
          width={2339}
          height={487}
          loading="lazy"
          className="w-full dark:hidden"
        />
        <img
          src="/media/white-logo-large.webp"
          alt=""
          width={1727}
          height={375}
          loading="lazy"
          className="hidden w-full dark:block"
        />
      </div>
    </footer>
  );
}
