import type { Metadata } from "next";
import { PhotoHero, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { VolunteerOpenings } from "@/components/volunteer-openings";
import { VOLUNTEER_INTRO } from "@/content/volunteer";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Volunteer openings",
  description:
    "Explore unpaid volunteer openings with IHSAAN across the UK and Ireland, then apply for a role on this website.",
  path: "/volunteer",
  socialDescription: "Volunteer with IHSAAN. Explore open roles and apply on this website.",
});

export default function VolunteerOpeningsPage() {
  return (
    <>
      <PhotoHero
        image="/media/gallery/student-conversations.webp"
        title="Volunteer with IHSAAN."
        intro={VOLUNTEER_INTRO.unpaidNote}
      >
        <ButtonLink href="#openings">View open roles</ButtonLink>
      </PhotoHero>

      <Section id="openings" labelledBy="openings-title" className="scroll-mt-24">
        <SectionHeading
          id="openings-title"
          title="Open positions"
          aside={VOLUNTEER_INTRO.positionsIntro}
        />
        <p data-reveal className="mt-8 max-w-2xl text-sm leading-6 text-ink/65">
          {VOLUNTEER_INTRO.responseNote}
        </p>
        <p data-reveal className="mt-3 max-w-2xl text-sm leading-6 text-ink/65">
          {VOLUNTEER_INTRO.unpaidNote}
        </p>

        <VolunteerOpenings />
      </Section>
    </>
  );
}
