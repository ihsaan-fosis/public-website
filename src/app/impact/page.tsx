import type { Metadata } from "next";
import {
  FlywheelChapter,
  GapChapter,
  GovernanceChapter,
  ImpactClosing,
  MeasureChapter,
  PathwayChapter,
  StoriesChapter,
  TractionChapter,
  VisionChapter,
  VoicesBand,
} from "@/components/impact";
import { ButtonLink, PhotoHero } from "@/components/ui";
import { IMPACT_HERO_IMAGE } from "@/content/impact";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our Impact",
  description:
    "How IHSAAN closes the gap from education to employment for Muslim students across the UK and Ireland: reach, results, how we measure success and where we are headed.",
  path: "/impact",
  socialDescription: "About 4,000 Muslim students engaged in two years. See IHSAAN's impact and how we measure it.",
});

export default function ImpactPage() {
  return (
    <>
      <PhotoHero
        image={IMPACT_HERO_IMAGE}
        title="Our impact."
        intro="Closing the gap from education to employment. About 4,000 Muslim students engaged in two years, and a model built to compound."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Partner with us</ButtonLink>
          <ButtonLink href="/programmes" tone="light-outline">
            Our programmes
          </ButtonLink>
        </div>
      </PhotoHero>
      <GapChapter />
      <PathwayChapter />
      <FlywheelChapter />
      <TractionChapter />
      <StoriesChapter />
      <VoicesBand />
      <MeasureChapter />
      <GovernanceChapter />
      <VisionChapter />
      <ImpactClosing />
    </>
  );
}
