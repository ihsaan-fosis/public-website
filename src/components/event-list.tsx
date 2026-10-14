import { PUBLIC_DESTINATIONS } from "@/content/links";
import type { EventKind } from "@/content/events";
import { formatEventSchedule, type ClassifiedEvent, type EventPhase } from "@/lib/events";
import { ButtonLink, Eyebrow, revealDelay } from "./ui";

const KIND_LABEL: Record<EventKind, string> = { academy: "Academy", conference: "Conference" };

const PHASE_BADGE: Partial<Record<EventPhase, string>> = {
  ongoing: "Happening now",
  ended: "Ended",
  cancelled: "Cancelled",
};

export function EventList({ items, label }: { items: readonly ClassifiedEvent[]; label: string }) {
  return (
    <ul aria-label={label} className="border-t border-ink/10">
      {items.map(({ event, phase }, index) => {
        const badge = PHASE_BADGE[phase];
        return (
          <li
            key={event.id}
            data-reveal
            style={revealDelay(index % 3)}
            className="grid gap-6 border-b border-ink/10 py-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{KIND_LABEL[event.kind]}</Eyebrow>
                {badge ? (
                  <span className="rounded-full border border-ink/25 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] text-ink uppercase">
                    {badge}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-3 text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">{event.title}</h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink/70">{event.summary}</p>
              <dl className="mt-5 grid gap-x-6 gap-y-1 text-sm text-ink/75 sm:grid-cols-[4.5rem_1fr]">
                <dt className="text-ink/65">When</dt>
                <dd>
                  <time dateTime={event.start}>{formatEventSchedule(event)}</time>
                </dd>
                <dt className="text-ink/65">Where</dt>
                <dd>{event.location}</dd>
              </dl>
            </div>
            {phase === "cancelled" ? (
              <p className="max-w-[16rem] text-sm leading-6 text-ink/65">This event has been cancelled.</p>
            ) : (
              <ButtonLink
                href={PUBLIC_DESTINATIONS[event.destination].href}
                external
                tone={phase === "ended" ? "ghost" : "accent"}
              >
                {phase === "ended" ? "View past event" : "View event on Luma"}
                <span className="sr-only">: {event.title}</span>
              </ButtonLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}
