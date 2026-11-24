import type { Metadata } from "next";
import {
  FlywheelChapter,
  GapChapter,
  ImpactClosing,
  PathwayChapter,
  StoriesChapter,
  TractionChapter,
} from "@/components/impact";
import { ButtonLink, PhotoHero } from "@/components/ui";
import { IMPACT_HERO_IMAGE } from "@/content/impact";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our Impact",
  description:
    "How IHSAAN closes the gap from education to employment for Muslim students across the UK and Ireland: reach, results, and where the work is headed.",
  path: "/impact",
  socialDescription: "Student engagement tripled in a year. See IHSAAN's impact.",
});

export default function ImpactPage() {
  return (
    <>
      <PhotoHero
        image={IMPACT_HERO_IMAGE}
        title="Our impact."
        intro="Student engagement tripled in a year. About 4,000 Muslim students engaged in two years, and a model built to compound."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" tone="white">Partner with us</ButtonLink>
          <ButtonLink href="/programmes" tone="light-outline">
            Our programmes
          </ButtonLink>
        </div>
      </PhotoHero>
      <TractionChapter />
      <GapChapter />
      <PathwayChapter />
      <FlywheelChapter />
      <StoriesChapter />
      <ImpactClosing />
    </>
  );
}
