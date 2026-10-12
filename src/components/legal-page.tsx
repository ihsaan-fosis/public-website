import type { ReactNode } from "react";
import { Container, displayClass } from "./ui";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28">
      <h1 className={`text-4xl sm:text-6xl ${displayClass}`}>{title}</h1>
      <p className="mt-4 text-sm text-ink/65">Last updated: {updated}</p>
      <div className="mt-14 max-w-3xl divide-y divide-ink/10 border-t border-ink/10 text-[15px] leading-7 text-ink/75 [&_a]:text-ink [&_a]:underline [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_li]:mt-2 [&_p]:mt-3 [&_section]:py-8 [&_strong]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </Container>
  );
}
