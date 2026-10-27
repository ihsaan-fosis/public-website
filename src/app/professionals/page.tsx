import type { Metadata } from "next";
import { InvolvementActions } from "@/components/involvement-actions";
import { ButtonLink, PhotoHero, Section, SectionHeading } from "@/components/ui";
import { ORGANISATION_ACTIONS, PROFESSIONAL_ACTIONS, PROFESSIONALS_LINK } from "@/content/site";
import { PUBLIC_DESTINATIONS } from "@/content/links";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Professionals",
  description:
    "Mentor Muslim students, join the IHSAAN professional network, volunteer or partner with IHSAAN as an organisation.",
  path: PROFESSIONALS_LINK.href,
  socialDescription: "Mentor, volunteer or partner with IHSAAN.",
});

export default function ProfessionalsPage() {
  return (
    <>
      <PhotoHero
        image="/media/mmm-hd.webp"
        title="Give back."
        intro="Share your experience with Muslim students, or bring your organisation alongside IHSAAN."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={PUBLIC_DESTINATIONS.professionalNetworkForm.href} external tone="white">
            Join the professional network
          </ButtonLink>
          <ButtonLink href="/contact" tone="light-outline">
            Partner with us
          </ButtonLink>
        </div>
      </PhotoHero>

      <Section labelledBy="professionals-title">
        <SectionHeading
          id="professionals-title"
          title="For professionals"
          aside="Some steps open on other websites. Nothing you enter there is submitted through this website."
        />
        <InvolvementActions
          actions={PROFESSIONAL_ACTIONS}
          photo={{ src: "/media/gallery/student-conversations.webp", alt: "Students talking between conference sessions" }}
        />
      </Section>

      <Section labelledBy="organisations-title" className="pt-0 sm:pt-0">
        <SectionHeading id="organisations-title" title="For organisations" />
        <InvolvementActions
          actions={ORGANISATION_ACTIONS}
          photo={{ src: "/media/impact-hd.webp", alt: "Students networking at an IHSAAN event" }}
        />
      </Section>
    </>
  );
}
