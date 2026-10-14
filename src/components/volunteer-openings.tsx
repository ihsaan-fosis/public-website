"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { revealDelay } from "@/components/ui";
import { VOLUNTEER_APPLICATION_FORM_URL, VOLUNTEER_OPENINGS } from "@/content/volunteer";

const DOT = (
  <span aria-hidden className="mx-2 text-ink/30">
    ·
  </span>
);

export function VolunteerOpenings() {
  return (
    <ul className="mt-12 border-t border-ink/10">
      {VOLUNTEER_OPENINGS.map((opening, index) => (
        <li key={opening.slug} data-reveal style={revealDelay(index % 3)} className="border-b border-ink/10">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="group flex w-full cursor-pointer flex-col gap-3 py-8 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
              >
                <span className="flex items-baseline gap-6">
                  <span aria-hidden className="w-6 shrink-0 text-xs text-ink/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-2xl leading-tight font-medium tracking-[-0.03em] text-ink transition-colors group-hover:text-ihsaan-light-blue sm:text-3xl">
                      {opening.title}
                    </span>
                    <span className="mt-2 block text-sm text-ink/65">
                      {opening.team}
                      {DOT}
                      {opening.availability}
                      {DOT}
                      {opening.location}
                    </span>
                  </span>
                </span>
                <span className="pl-12 text-xs font-bold tracking-[0.14em] text-ink/55 uppercase sm:pl-0">
                  Apply
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader className="shrink-0 border-b border-ink/10 px-6 py-4 pr-14">
                <DialogTitle>{opening.title}</DialogTitle>
                <DialogDescription>
                  {opening.availability}
                  {" · "}
                  {opening.location}
                  {" · "}
                  Unpaid volunteer role
                </DialogDescription>
              </DialogHeader>
              <div className="min-h-0 px-6 py-4">
                <iframe
                  src={VOLUNTEER_APPLICATION_FORM_URL}
                  title={`${opening.title} application form`}
                  className="h-[min(39rem,calc(100dvh-9rem))] w-full border-0"
                />
              </div>
            </DialogContent>
          </Dialog>
        </li>
      ))}
    </ul>
  );
}
