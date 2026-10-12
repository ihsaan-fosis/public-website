import type { Metadata } from "next";
import { EventList } from "@/components/event-list";
import { ButtonLink, Container, displayClass, Glow, Section, SectionTitle } from "@/components/ui";
import { PUBLIC_EVENTS } from "@/content/events";
import { PUBLIC_DESTINATIONS } from "@/content/links";
import { classifyEvents } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description:
    "IHSAAN career conferences and student-led academies across the UK and Ireland, with the full events calendar.",
  path: "/events",
  socialDescription: "Find IHSAAN career conferences, academies and the full events calendar.",
});

// Phases depend on the current time, so each request classifies the events instead of freezing them at build time.
export const dynamic = "force-dynamic";

export default function EventsPage() {
  const events = classifyEvents(PUBLIC_EVENTS, new Date());
  const current = events.filter(({ phase }) => phase === "upcoming" || phase === "ongoing");
  const finished = events.filter(({ phase }) => phase === "ended" || phase === "cancelled");

  return (
    <>
      <section id="hero" aria-labelledby="events-title" className="relative isolate pt-16 pb-12 sm:pt-24 sm:pb-16">
        <Glow className="opacity-50" />
        <Container>
          <h1 id="events-title" className={cn("max-w-3xl text-[2.6rem] leading-[1.02] sm:text-6xl", displayClass)}>
            Events.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-7 text-ink/70">
            Career conferences and student-led academies across the UK and Ireland. Each event opens on Luma, where
            registration, approval and joining details are managed.
          </p>
          <div className="mt-8">
            <ButtonLink href={PUBLIC_DESTINATIONS.eventsCalendar.href} external className="py-3 text-center">
              View the full IHSAAN calendar
            </ButtonLink>
          </div>
        </Container>
      </section>

      <Section labelledBy="upcoming-title" className="pt-0 sm:pt-0">
        <SectionTitle id="upcoming-title">Upcoming events</SectionTitle>
        {current.length > 0 ? (
          <>
            <div className="mt-10">
              <EventList items={current} label="Upcoming events" />
            </div>
            <p className="mt-6 max-w-2xl text-[13px] leading-6 text-ink/65">
              Luma handles registration. Some events need host approval, so a registration request does not guarantee
              a place.
            </p>
          </>
        ) : (
          <p className="mt-10 max-w-2xl rounded-[22px] bg-surface p-8 text-[15px] leading-7 text-ink/70 ring-1 ring-ink/5">
            No upcoming events are listed here. Check the IHSAAN calendar for the latest schedule.
          </p>
        )}
      </Section>

      {finished.length > 0 ? (
        <Section labelledBy="past-title" className="pt-0 sm:pt-0">
          <SectionTitle id="past-title">Past and cancelled events</SectionTitle>
          <div className="mt-10">
            <EventList items={finished} label="Past and cancelled events" />
          </div>
        </Section>
      ) : null}
    </>
  );
}
