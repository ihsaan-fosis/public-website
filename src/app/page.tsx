import { LegacyHashRedirect } from "@/components/legacy-hash-redirect";
import { ScrollWords } from "@/components/motion";
import {
  ClosingCta,
  FaqSection,
  GalleryParallax,
  ImpactStory,
  InvolvementPanels,
  PartnersSection,
  ProgrammesCarousel,
} from "@/components/sections";
import { Container, displayClass, Glow, PhotoHero, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { GET_INVOLVED, MISSION } from "@/content/site";

const PROMISE =
  "Every Muslim student deserves equal access to the mentorship, networks and opportunities needed to build a meaningful career.";

export default function Home() {
  return (
    <>
      <LegacyHashRedirect />
      <PhotoHero
        tall
        editorial
        image="/media/hero-poster.webp"
        video={{ src: "/media/hero-video.mp4", portraitSrc: "/media/hero-video-mobile.mp4" }}
        title="Faith. Excellence. Service."
        intro={MISSION}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={GET_INVOLVED.href}>{GET_INVOLVED.label}</ButtonLink>
          <ButtonLink href="/programmes" tone="light-outline">
            Explore programmes
          </ButtonLink>
        </div>
      </PhotoHero>

      <section aria-labelledby="promise-title" className="relative py-24 sm:py-36">
        <Container>
          <h2
            id="promise-title"
            className={`max-w-5xl text-3xl leading-[1.15] sm:text-5xl sm:leading-[1.1] lg:text-[3.5rem] ${displayClass}`}
          >
            <ScrollWords text={PROMISE} />
          </h2>
        </Container>
      </section>

      <ImpactStory />

      <ProgrammesCarousel />

      <Section labelledBy="routes-title" className="isolate">
        <Glow className="opacity-50" />
        <SectionHeading
          id="routes-title"
          title="Find your place at IHSAAN"
          aside="Students, professionals and organisations all have a part to play in elevating faith-driven talent."
        />
        <div className="mt-12">
          <InvolvementPanels />
        </div>
      </Section>

      <PartnersSection />

      <GalleryParallax
        action={
          <ButtonLink href="/gallery" tone="ghost">
            View the gallery
          </ButtonLink>
        }
      />

      <FaqSection />

      <ClosingCta />
    </>
  );
}
