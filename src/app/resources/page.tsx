import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/sections";
import { Eyebrow, PhotoFrame, PhotoHero, revealDelay, Section, SectionHeading } from "@/components/ui";
import { CAREER_GUIDES, careerGuideCategories, careerGuideHref } from "@/content/career-essentials";
import { RESOURCES } from "@/content/resources";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description:
    "Free Career Essentials guides and reflections for Muslim students across the UK and Ireland.",
  path: "/resources",
  socialDescription: "Free Career Essentials guides and career resources from IHSAAN.",
});

const linkClass =
  "mt-4 inline-block text-sm font-semibold text-ink underline underline-offset-4 hover:text-ink/70 max-sm:mt-1 max-sm:inline-flex max-sm:min-h-11 max-sm:items-center";

function GuideLink({ href, external, children }: { href: string; external?: boolean; children: string }) {
  return external ? (
    <a href={href} className={linkClass}>
      {children}
    </a>
  ) : (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

export default function ResourcesPage() {
  const categories = careerGuideCategories();

  return (
    <>
      <PhotoHero
        image="/media/career-guides-hd.webp"
        title="Free resources."
        intro={`${CAREER_GUIDES.length} Career Essentials guides and community reflections you can use anytime. Most guides are published on this site.`}
      />

      <Section id="career-essentials" labelledBy="guides-title" className="scroll-mt-24">
        <SectionHeading
          id="guides-title"
          title="Career Essentials"
          aside="Step-by-step guides for intention, applications, interviews and faith at work. Written for Muslim students navigating the UK job market."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <PhotoFrame src="/media/hackathon-smiles.webp" alt="Hackathon participants smiling and giving thumbs up at their table" sticky />
          <div className="space-y-14">
            {categories.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-28">
                <Eyebrow>{category.title}</Eyebrow>
                <ul className="mt-5 border-t border-ink/10">
                  {category.guides.map((guide, index) => {
                    const destination = careerGuideHref(guide);
                    return (
                      <li
                        key={guide.slug}
                        data-reveal
                        style={revealDelay(index % 3)}
                        className="border-b border-ink/10 py-6"
                      >
                        <h3 className="text-2xl leading-tight font-medium tracking-[-0.03em] text-ink">{guide.title}</h3>
                        <p className="mt-2 max-w-xl text-[15px] leading-7 wrap-anywhere text-ink/70">{guide.summary}</p>
                        <GuideLink href={destination.href} external={destination.external}>
                          {destination.external ? "Open guide" : "Read guide"}
                        </GuideLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <div id="more" className="scroll-mt-28">
              <h2
                id="more-resources-title"
                className="flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-ink/65 uppercase"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-gradient-to-br from-ihsaan-purple to-ihsaan-light-blue" />
                More from IHSAAN
              </h2>
              <ul className="mt-5 border-t border-ink/10">
                {RESOURCES.map((resource) => (
                  <li key={resource.id} id={resource.id} data-reveal className="scroll-mt-28 border-b border-ink/10 py-6">
                    <h3 className="text-2xl leading-tight font-medium tracking-[-0.03em] text-ink">{resource.title}</h3>
                    <p className="mt-2 max-w-xl text-[15px] leading-7 text-ink/70">{resource.body}</p>
                    <GuideLink href={resource.cta.href} external={resource.cta.external}>
                      {resource.cta.label}
                    </GuideLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
