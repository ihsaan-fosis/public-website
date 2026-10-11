import Link from "next/link";
import type { ReactNode } from "react";
import { GET_INVOLVED, LEGAL_LINKS, NAV_LINKS, SOCIAL_LINKS } from "@/content/site";
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

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-ink/10 pt-20">
      <Glow className="opacity-70" />
      <Container>
        <div className="grid gap-10 pb-14 sm:grid-cols-3">
          <FooterColumn title="Explore">
            {[...NAV_LINKS, GET_INVOLVED].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Follow">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Based in">
            <li>UK & Ireland</li>
            <li>A national careers programme of FOSIS</li>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-3 text-xs text-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} IHSAAN. All rights reserved.</p>
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
      <div data-reveal className="mx-auto mt-10 max-w-7xl px-5 pb-6 sm:px-10">
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
