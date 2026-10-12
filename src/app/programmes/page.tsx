import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta, PartnersSection } from "@/components/sections";
import { Container, displayClass, Eyebrow, PhotoHero, revealDelay, Section } from "@/components/ui";
import { PROGRAMME_PAGES } from "@/content/programmes";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Programmes",
  description:
    "Career conferences, internships, hackathons, mentorship and career guides for Muslim students across the UK and Ireland.",
  path: "/programmes",
  socialDescription: "Everything IHSAAN offers Muslim students and young professionals across the UK and Ireland.",
});

export default function ProgrammesPage() {
  return (
    <>
      <PhotoHero
        image="/media/impact-wide.webp"
        badge="Our programmes"
        title="Explore what we offer."
        intro="Five ways IHSAAN connects Muslim students and young professionals with employers, mentors and opportunities."
      />

      <Section labelledBy="all-programmes-title">
        <Container className="px-0 sm:px-0">
          <Eyebrow>All programmes</Eyebrow>
          <h2 id="all-programmes-title" className={`mt-3 text-3xl leading-[1.1] sm:text-[2.6rem] ${displayClass}`}>
            Find your starting point
          </h2>
        </Container>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMME_PAGES.map((programme, index) => (
            <li key={programme.slug} data-reveal style={revealDelay(index % 3)}>
              <Link
                href={`/programmes/${programme.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] bg-night-2"
              >
                <Image
                  src={programme.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 384px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/60 to-transparent transition-colors duration-500 group-hover:via-ihsaan-purple/60" />
                <span className="absolute top-4 left-4 rounded-full bg-night/60 px-2.5 py-1 text-[11px] font-medium text-cream ring-1 ring-white/20 backdrop-blur">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs text-cream/90">{programme.eyebrow}</p>
                  <h3 className="mt-1 text-2xl font-bold tracking-[-0.02em] text-cream">{programme.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-cream/90">{programme.summary}</p>
                  <span className="mt-5 inline-flex min-h-10 items-center rounded-xl bg-cream px-4 text-sm font-medium text-night transition-colors group-hover:bg-white">
                    Learn more
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <PartnersSection />

      <ClosingCta />
    </>
  );
}
