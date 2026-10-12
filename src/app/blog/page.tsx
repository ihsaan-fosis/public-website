import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/sections";
import { ButtonLink, Eyebrow, PhotoHero, revealDelay, Section, SectionHeading } from "@/components/ui";
import { BLOG_POSTS } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Reflections and writing from the IHSAAN community for Muslim students building faith-conscious careers across the UK and Ireland.",
  path: "/blog",
  socialDescription: "Reflections and writing from the IHSAAN community.",
});

export default function BlogPage() {
  return (
    <>
      <PhotoHero
        image="/media/faithful-talent.webp"
        title="Blog."
        intro="Reflections and writing from the IHSAAN community. Each piece is published on this site so students can read it without leaving ihsaan.network."
      />

      <Section labelledBy="posts-title">
        <SectionHeading
          id="posts-title"
          title="Latest writing"
          aside="Full articles live on IHSAAN. New pieces are added as they are published."
        />
        <ul className="mt-12 grid gap-4">
          {BLOG_POSTS.map((post, index) => (
            <li
              key={post.slug}
              data-reveal
              style={revealDelay(index % 3)}
              className="flex flex-col rounded-[22px] bg-surface p-8 ring-1 ring-ink/5 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:p-10"
            >
              <div className="max-w-2xl">
                <Eyebrow>{post.tags[0] ?? "Reflection"}</Eyebrow>
                <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm font-medium text-ink/65">By {post.author.name}</p>
                <p className="mt-3 text-[15px] leading-7 text-ink/70">{post.summary}</p>
              </div>
              <div className="mt-8 flex shrink-0 flex-wrap items-center gap-4 sm:mt-0">
                <ButtonLink href={`/blog/${post.slug}`}>Read article</ButtonLink>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-[13px] leading-6 text-ink/65">
          Looking for guides and tools instead?{" "}
          <Link href="/resources" className="font-medium text-ink underline underline-offset-4">
            Browse free resources
          </Link>
          .
        </p>
      </Section>

      <ClosingCta />
    </>
  );
}
