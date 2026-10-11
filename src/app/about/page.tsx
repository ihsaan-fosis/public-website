import type { Metadata } from "next";
import { ClosingCta, FactsCard, PartnersSection, ProgrammesCarousel } from "@/components/sections";
import { ScrollWords } from "@/components/motion";
import { Container, displayClass, Eyebrow, Glow, PhotoHero, revealDelay, Section } from "@/components/ui";
import { MISSION } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Discover how IHSAAN helps Muslim students across the UK and Ireland access mentorship, networks and faith-conscious career opportunities.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Our Story | IHSAAN",
    description: "IHSAAN unlocks Muslim student talent through mentorship, networks and career opportunities.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PhotoHero image="/media/gallery/networking-hall.webp" badge="Our story" title="Why IHSAAN exists." intro={MISSION} />

      <section aria-labelledby="belief-title" className="relative isolate pt-24 sm:pt-36">
        <Glow className="opacity-60" />
        <Container>
          <Eyebrow>Founded on a belief</Eyebrow>
          <h2
            id="belief-title"
            className={`mt-5 max-w-4xl text-3xl leading-[1.15] sm:text-5xl sm:leading-[1.1] ${displayClass}`}
          >
            <ScrollWords text="Every Muslim student deserves equal access to the mentorship, networks and opportunities needed to build a meaningful career." />
          </h2>
        </Container>
      </section>

      <Section labelledBy="who-title">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1.1fr]">
          <div data-reveal className="py-2 lg:pr-6">
            <Eyebrow>Who we are</Eyebrow>
            <h2 id="who-title" className={`mt-3 text-3xl leading-[1.1] ${displayClass}`}>
              The national careers programme of FOSIS.
            </h2>
            <div className="mt-5 max-w-sm space-y-4 text-sm leading-6 text-ink/65">
              <p>
                IHSAAN is the national careers programme of the Federation of Student Islamic Societies (FOSIS). We work
                across universities in the UK and Ireland.
              </p>
              <p>
                The word Ihsaan means excellence, striving for the highest standard in everything we do as a form of
                devotion to God.
              </p>
            </div>
          </div>
          <div data-reveal style={revealDelay(1)} className="group relative min-h-[26rem] overflow-hidden rounded-[22px] bg-night-2">
            <img
              src="/media/faithful-talent.webp"
              alt="Faithful Talent interns at an IHSAAN session"
              width={1800}
              height={1114}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
            />
          </div>
          <div data-reveal style={revealDelay(2)}>
            <FactsCard />
          </div>
        </div>
      </Section>

      <ProgrammesCarousel />

      <PartnersSection />

      <ClosingCta />
    </>
  );
}
