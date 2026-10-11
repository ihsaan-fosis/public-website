import type { Metadata } from "next";
import { RouteSwitcher } from "@/components/route-switcher";
import { FaqSection, InvolvementCards } from "@/components/sections";
import { PhotoHero, ButtonLink, Section, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join IHSAAN as a student, mentor, volunteer or partner and help Muslim talent build meaningful, faith-conscious careers.",
  alternates: { canonical: "/ticket" },
  openGraph: {
    title: "Get Involved | IHSAAN",
    description: "Join IHSAAN as a student, mentor, volunteer or partner.",
    url: "/ticket",
  },
};

export default function GetInvolvedPage() {
  return (
    <>
      <PhotoHero
        image="/media/career-conference.webp"
        badge="Build with us"
        title="Get involved."
        intro="Students, professionals and organisations all have a part to play in elevating faith-driven talent."
      />

      <Section labelledBy="routes-title">
        <SectionHeading id="routes-title" eyebrow="Join IHSAAN" title="Ways to get involved" />
        <div className="mt-12">
          <RouteSwitcher />
        </div>
      </Section>

      <Section labelledBy="cards-title" className="pt-0 sm:pt-0">
        <h2 id="cards-title" className="sr-only">
          What each route offers
        </h2>
        <InvolvementCards />
      </Section>

      <Section labelledBy="conversation-title" className="pt-0 sm:pt-0">
        <div className="flex flex-col gap-8 rounded-[22px] bg-surface p-8 ring-1 ring-ink/5 sm:p-12 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="conversation-title"
            eyebrow="Not sure where you fit?"
            title="Start a conversation"
            aside="Tell us how you would like to take part. We will direct you to the right programme or partnership route."
          />
          <ButtonLink href="/contact" className="shrink-0">
            Contact IHSAAN
          </ButtonLink>
        </div>
      </Section>

      <FaqSection />
    </>
  );
}
