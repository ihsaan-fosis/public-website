"use client";

import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { buttonClassName, revealDelay } from "@/components/ui";
import { VOLUNTEER_APPLICATION_FORM_URL, type VolunteerOpening } from "@/content/volunteer";
import { cn } from "@/lib/utils";

const ROLE_TYPE = "Unpaid volunteer";

/** One grid for the column labels and every row, so the columns line up on wide screens. */
const BOARD_ROW = "lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_8rem] lg:items-center lg:gap-8";

function RowDetail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="flex gap-3 text-[15px] leading-6 text-ink/75">
      <span className="w-28 shrink-0 text-ink/65 lg:sr-only">{label}</span>
      <span>{children}</span>
    </span>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-ink/65">{label}</dt>
      <dd className="mt-0.5 font-medium text-ink">{children}</dd>
    </div>
  );
}

export function VolunteerOpenings({ openings }: { openings: readonly VolunteerOpening[] }) {
  if (openings.length === 0) {
    return (
      <p data-reveal className="mt-10 max-w-xl border-t border-ink/10 pt-8 text-[15px] leading-7 text-ink/70">
        No volunteer roles are open right now. Check back soon.
      </p>
    );
  }

  return (
    <div className="mt-10">
      <div
        aria-hidden
        className={cn(
          "hidden border-y border-ink/10 py-3 text-[11px] font-bold tracking-[0.14em] text-ink/65 uppercase",
          BOARD_ROW,
        )}
      >
        <span>Role</span>
        <span>Commitment</span>
        <span>Location</span>
        <span>Type</span>
        <span />
      </div>

      <ul aria-label="Open volunteer roles" className="max-lg:border-t max-lg:border-ink/10">
        {openings.map((opening, index) => (
          <li key={opening.slug} data-reveal style={revealDelay(index % 3)} className="border-b border-ink/10">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "group grid w-full cursor-pointer gap-5 py-8 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    BOARD_ROW,
                  )}
                >
                  <span className="min-w-0">
                    <span className="block text-2xl leading-tight font-medium tracking-[-0.03em] text-ink transition-colors group-hover:text-ihsaan-light-blue sm:text-3xl">
                      {opening.title}
                    </span>
                    <span className="mt-2 block text-sm text-ink/65">{opening.team}</span>
                  </span>
                  <RowDetail label="Commitment">{opening.availability}</RowDetail>
                  <RowDetail label="Location">{opening.location}</RowDetail>
                  <span className="flex items-center gap-3 text-[15px] leading-6 text-ink/75">
                    <span className="w-28 shrink-0 text-ink/65 lg:sr-only">Type</span>
                    <span className="rounded-full border border-ink/25 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] whitespace-nowrap text-ink uppercase">
                      {ROLE_TYPE}
                    </span>
                  </span>
                  <span className={buttonClassName({ tone: "accent" })}>
                    Apply
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader className="shrink-0 border-b border-ink/10 px-6 py-4 pr-14">
                  <DialogTitle>{opening.title}</DialogTitle>
                  <DialogDescription>Complete the form to apply for this role. All positions are unpaid.</DialogDescription>
                </DialogHeader>
                <div className="grid min-h-0 gap-6 overflow-y-auto px-6 py-4 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-8">
                  <dl className="grid grid-cols-2 content-start gap-x-4 gap-y-3 text-sm leading-6 lg:grid-cols-1">
                    <Fact label="Team">{opening.team}</Fact>
                    <Fact label="Commitment">{opening.availability}</Fact>
                    <Fact label="Location">{opening.location}</Fact>
                    <Fact label="Type">{ROLE_TYPE}</Fact>
                  </dl>
                  <iframe
                    src={VOLUNTEER_APPLICATION_FORM_URL}
                    title={`${opening.title} application form`}
                    className="h-[min(39rem,calc(100dvh-12rem))] w-full border-0"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </div>
  );
}
