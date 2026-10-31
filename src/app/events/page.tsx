import type { Metadata } from "next";
import { EventList } from "@/components/event-list";
import { ClosingCta } from "@/components/sections";
import { ButtonLink, PhotoHero, Section, SectionTitle } from "@/components/ui";
import { PUBLIC_EVENTS } from "@/content/events";
import { PUBLIC_DESTINATIONS } from "@/content/links";
import { classifyEvents } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";

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
      <PhotoHero
        image="/media/gallery/careers-evening.webp"
        title="Events."
        intro="Career conferences and student-led academies across the UK and Ireland. Each event opens on Luma, where registration, approval and joining details are managed."
      >
        <ButtonLink href={PUBLIC_DESTINATIONS.eventsCalendar.href} external tone="white">
          View the full IHSAAN calendar
        </ButtonLink>
      </PhotoHero>

      <Section labelledBy="upcoming-title">
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
          <p className="mt-10 max-w-2xl border-t border-ink/10 pt-6 text-[15px] leading-7 text-ink/70">
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

      <ClosingCta image="/media/gallery/careers-fair.webp" />
    </>
  );
}
