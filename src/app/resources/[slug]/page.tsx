import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/sections";
import { ButtonLink, Container, displayClass, Eyebrow, Section } from "@/components/ui";
import {
  getCareerGuide,
  hasNativeCareerGuidePage,
  nativeCareerGuides,
} from "@/content/career-essentials";
import { GuideMarkdown } from "@/lib/guide-markdown";
import { pageMetadata } from "@/lib/metadata";
import { SITE_ORIGIN } from "@/lib/site";
import { cn } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return nativeCareerGuides().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const guide = getCareerGuide((await params).slug);
  if (!guide || !hasNativeCareerGuidePage(guide)) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.summary,
    path: `/resources/${guide.slug}`,
    type: "article",
    tags: [guide.categoryTitle, "Career Essentials"],
  });
}

export default async function CareerGuidePage({ params }: { params: Promise<Params> }) {
  const guide = getCareerGuide((await params).slug);
  if (!guide || !hasNativeCareerGuidePage(guide)) notFound();

  const path = `/resources/${guide.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}${path}`,
    },
    author: {
      "@type": "Organization",
      name: "IHSAAN",
      url: SITE_ORIGIN,
    },
    publisher: {
      "@type": "Organization",
      name: "IHSAAN",
      url: SITE_ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}/media/blue-logo.webp`,
      },
    },
    inLanguage: "en-GB",
    keywords: ["Career Essentials", guide.categoryTitle, guide.title].join(", "),
  };

  return (
    <>
      <section id="hero" aria-labelledby="guide-title" className="pt-16 pb-10 sm:pt-24 sm:pb-14">
        <Container>
          <p className="text-sm font-medium text-ink/65">
            <Link href="/resources" className="hover:text-ink hover:underline">
              Resources
            </Link>
            <span aria-hidden className="mx-2 text-ink/30">
              /
            </span>
            <span>Career Essentials</span>
          </p>
          <Eyebrow className="mt-8">{guide.categoryTitle}</Eyebrow>
          <h1 id="guide-title" className={cn("mt-4 max-w-4xl text-[2.4rem] leading-[1.05] sm:text-6xl", displayClass)}>
            {guide.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-ink/70">{guide.summary}</p>
        </Container>
      </section>

      <Section labelledBy="guide-body-title" className="pt-0 sm:pt-0">
        <h2 id="guide-body-title" className="sr-only">
          Guide
        </h2>
        <div className="mx-auto max-w-3xl">
          <GuideMarkdown source={guide.bodyMd} />

          <aside className="mt-14 rounded-[22px] bg-surface p-8 ring-1 ring-ink/5">
            <Eyebrow>Career Essentials</Eyebrow>
            <p className="mt-3 text-[15px] leading-7 text-ink/70">
              This guide is part of IHSAAN Career Essentials, free materials for Muslim students building faith-conscious
              careers.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/resources#career-essentials">Career Essentials</ButtonLink>
              <ButtonLink href="/programmes/career-guides" tone="ghost">
                About Career Guides
              </ButtonLink>
            </div>
            {guide.sourceUrl ? (
              <p className="mt-6 text-[13px] leading-6 text-ink/65">
                Earlier draft also available on{" "}
                <a
                  href={guide.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline underline-offset-4"
                >
                  Notion
                </a>
                . This page is the canonical IHSAAN version.
              </p>
            ) : null}
          </aside>
        </div>
      </Section>

      <ClosingCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
