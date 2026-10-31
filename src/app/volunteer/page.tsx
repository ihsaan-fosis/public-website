import type { Metadata } from "next";
import { PhotoHero, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { VolunteerOpenings } from "@/components/volunteer-openings";
import { VOLUNTEER_INTRO } from "@/content/volunteer";
import { pageMetadata } from "@/lib/metadata";
import { getVolunteerOpenings } from "@/lib/volunteer-roles";

export const metadata: Metadata = pageMetadata({
  title: "Volunteer openings",
  description:
    "Explore unpaid volunteer openings with IHSAAN across the UK and Ireland, then apply for a role on this website.",
  path: "/volunteer",
  socialDescription: "Volunteer with IHSAAN. Explore open roles and apply on this website.",
});

// Roles come from the member platform, so each request reads the current board instead of freezing it at build time.
export const dynamic = "force-dynamic";

export default async function VolunteerOpeningsPage() {
  const openings = await getVolunteerOpenings();
  return (
    <>
      <PhotoHero
        image="/media/gallery/hackathon-partners.webp"
        title="Volunteer with IHSAAN."
        intro={VOLUNTEER_INTRO.unpaidNote}
      >
        <ButtonLink href="#openings" tone="white">View open roles</ButtonLink>
      </PhotoHero>

      <Section id="openings" labelledBy="openings-title" className="scroll-mt-24">
        <SectionHeading
          id="openings-title"
          title="Open positions"
          aside={
            <>
              <span className="font-semibold text-ink">{openings.length}</span> open{" "}
              {openings.length === 1 ? "role" : "roles"}
            </>
          }
        />

        <VolunteerOpenings openings={openings} />
      </Section>
    </>
  );
}
