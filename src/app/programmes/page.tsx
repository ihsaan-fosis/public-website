import Image from "next/image";
import type { Metadata } from "next";
import { ClosingCta, PartnersSection } from "@/components/sections";
import { ButtonLink, PhotoHero, revealDelay, Section, SectionHeading } from "@/components/ui";
import { PROGRAMME_PAGES } from "@/content/programmes";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Programmes",
  description:
    "Career conferences, internships, insight events, workshops, hackathons and mentorship for Muslim students across the UK and Ireland.",
  path: "/programmes",
  socialDescription: "Everything IHSAAN offers Muslim students and young professionals across the UK and Ireland.",
});

export default function ProgrammesPage() {
  return (
    <>
      <PhotoHero
        image="/media/impact-wide.webp"
        title="Explore what we offer."
        intro="Six ways IHSAAN connects Muslim students and young professionals with employers, mentors and opportunities."
      />

      <Section labelledBy="all-programmes-title">
        <SectionHeading
          id="all-programmes-title"
          title="Find your starting point"
          aside="Conferences, internships, insight events, workshops, hackathons and mentorship. Pick the path that fits where you are now."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMME_PAGES.map((programme, index) => (
            <li key={programme.slug} data-reveal style={revealDelay(index % 3)}>
              <article className="group relative isolate flex h-full min-h-[34rem] flex-col justify-end overflow-hidden rounded-[28px] bg-night-2 p-6 sm:p-8 lg:min-h-[40rem]">
                <Image
                  src={programme.photo.src}
                  alt={programme.photo.alt}
                  fill
                  sizes="(min-width: 1280px) 416px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/60 to-night/10" />
                <span
                  aria-hidden
                  className="absolute top-4 right-6 text-[5.5rem] leading-none font-extrabold tracking-[-0.06em] text-cream/20 transition-colors duration-700 group-hover:text-cream/40 sm:text-[7.5rem]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-3xl font-extrabold tracking-[-0.035em] text-cream sm:text-4xl">{programme.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-cream/80">{programme.summary}</p>
                <div className="mt-7">
                  <ButtonLink href={`/programmes/${programme.slug}`} tone="white">
                    Learn more
                  </ButtonLink>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <PartnersSection />

      <ClosingCta image="/media/gallery/hackathon-long-table.webp" />
    </>
  );
}
