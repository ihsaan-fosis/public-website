import type { Metadata } from "next";
import Link from "next/link";
import { isDarkMotif, Panel } from "@/components/panel";
import { ClosingCta } from "@/components/sections";
import { ButtonLink, Eyebrow, PhotoHero, revealDelay, Section, SectionHeading } from "@/components/ui";
import { CAREER_GUIDES, careerGuideCategories, careerGuideHref } from "@/content/career-essentials";
import { RESOURCES } from "@/content/resources";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description:
    "Free Career Essentials guides, reflections, mentoring and hackathon resources for Muslim students across the UK and Ireland.",
  path: "/resources",
  socialDescription: "Free Career Essentials guides and career resources from IHSAAN.",
});

export default function ResourcesPage() {
  const categories = careerGuideCategories();

  return (
    <>
      <PhotoHero
        image="/media/career-guides.webp"
        title="Free resources."
        intro={`${CAREER_GUIDES.length} Career Essentials guides plus mentoring and community surfaces you can use anytime. Most guides are published on this site.`}
      />

      <Section id="career-essentials" labelledBy="guides-title" className="scroll-mt-24">
        <SectionHeading
          id="guides-title"
          title="Career Essentials"
          aside="Step-by-step guides for intention, applications, interviews and faith at work. Written for Muslim students navigating the UK job market."
        />
        <div className="mt-12 space-y-14">
          {categories.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-28">
              <Eyebrow>{category.title}</Eyebrow>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {category.guides.map((guide, index) => {
                  const destination = careerGuideHref(guide);
                  return (
                    <li key={guide.slug} data-reveal style={revealDelay(index % 2)}>
                      <article className="flex h-full flex-col rounded-[22px] bg-surface p-7 ring-1 ring-ink/5 sm:p-8">
                        <h3 className="text-xl font-bold tracking-[-0.02em] text-ink">
                          {destination.external ? (
                            guide.title
                          ) : (
                            <Link href={destination.href} className="hover:underline">
                              {guide.title}
                            </Link>
                          )}
                        </h3>
                        <p className="mt-3 flex-1 text-[15px] leading-7 text-ink/70">{guide.summary}</p>
                        <div className="mt-6">
                          <ButtonLink href={destination.href} external={destination.external} tone="accent">
                            {destination.external ? "Open guide" : "Read guide"}
                          </ButtonLink>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="more-resources-title">
        <SectionHeading
          id="more-resources-title"
          title="More from IHSAAN"
          aside="Reflections on this site, plus partner surfaces for mentoring and hackathons."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((resource, index) => {
            const dark = isDarkMotif(resource.motif);
            return (
              <li
                key={resource.id}
                id={resource.id}
                data-reveal
                style={revealDelay(index % 3)}
                className="scroll-mt-28"
              >
                <Panel
                  motif={resource.motif}
                  className="h-full min-h-[18rem] rounded-[22px] transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <h3
                    className={cn(
                      "text-2xl font-bold tracking-[-0.02em]",
                      dark ? "text-white" : "text-ihsaan-purple",
                    )}
                  >
                    {resource.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 max-w-[28rem] text-[15px] leading-7",
                      dark ? "text-white/90" : "text-black/75",
                    )}
                  >
                    {resource.body}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                    <ButtonLink
                      href={resource.cta.href}
                      external={resource.cta.external}
                      tone={dark ? "white" : "accent"}
                    >
                      {resource.cta.label}
                    </ButtonLink>
                    {resource.related ? (
                      <Link
                        href={resource.related.href}
                        className={cn(
                          "text-sm font-medium underline-offset-4 hover:underline",
                          dark ? "text-white/85" : "text-ihsaan-purple",
                        )}
                      >
                        {resource.related.label}
                      </Link>
                    ) : null}
                  </div>
                </Panel>
              </li>
            );
          })}
        </ul>
      </Section>

      <ClosingCta />
    </>
  );
}
