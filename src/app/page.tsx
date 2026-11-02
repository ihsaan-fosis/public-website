import { LegacyHashRedirect } from "@/components/legacy-hash-redirect";
import { ScrollWords } from "@/components/motion";
import {
  ClosingCta,
  FaqSection,
  GalleryParallax,
  InvolvementPanels,
  PartnersSection,
  ProgrammesCarousel,
} from "@/components/sections";
import { Container, displayClass, PhotoHero, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { GET_INVOLVED, MEMBER_PORTAL_SIGNUP, MISSION, PROFESSIONALS_LINK, TAGLINE, VISION } from "@/content/site";
import { SITE_ORIGIN } from "@/lib/site";

// Google reads the site name shown above search results from WebSite data on the homepage.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "IHSAAN",
  alternateName: ["IHSAAN Network"],
  url: `${SITE_ORIGIN}/`,
};

export default function Home() {
  return (
    <>
      <LegacyHashRedirect />
      <PhotoHero
        tall
        image="/media/hero-poster.webp"
        video={{ src: "/media/hero-video.mp4", portraitSrc: "/media/hero-video-mobile.mp4" }}
        title={TAGLINE}
        intro={MISSION}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={GET_INVOLVED.href} tone="white">
            {MEMBER_PORTAL_SIGNUP.label}
          </ButtonLink>
          <ButtonLink href={PROFESSIONALS_LINK.href} tone="light-outline">
            Are you a professional?
          </ButtonLink>
        </div>
      </PhotoHero>

      <section aria-labelledby="vision-title" className="relative py-16 sm:py-36">
        <Container>
          <h2
            id="vision-title"
            className={`max-w-5xl text-3xl leading-[1.15] sm:text-5xl sm:leading-[1.1] lg:text-[3.5rem] ${displayClass}`}
          >
            <ScrollWords text={VISION} />
          </h2>
        </Container>
      </section>

      <ProgrammesCarousel
        action={
          <ButtonLink href={GET_INVOLVED.href} tone="ghost">
            View events
          </ButtonLink>
        }
      />

      <Section labelledBy="routes-title">
        <SectionHeading
          id="routes-title"
          title="Find your place at IHSAAN"
          aside="Students, professionals and organisations all have a part to play in IHSAAN's work."
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

      <ClosingCta image="/media/career-conference-london-hd.webp" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
