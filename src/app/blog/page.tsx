import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClosingCta } from "@/components/sections";
import { ButtonLink, PhotoHero, revealDelay, Section, SectionHeading } from "@/components/ui";
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
        image="/media/gallery/student-conversations.webp"
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
            <li key={post.slug} data-reveal style={revealDelay(index % 3)}>
              <article className="group relative isolate flex h-full min-h-[34rem] flex-col justify-end overflow-hidden rounded-[28px] bg-night-2 p-6 sm:p-8 lg:min-h-[40rem]">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  sizes="100vw"
                  className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/60 to-night/10" />
                <span
                  aria-hidden
                  className="absolute top-4 right-6 text-[5.5rem] leading-none font-extrabold tracking-[-0.06em] text-cream/20 transition-colors duration-700 group-hover:text-cream/40 sm:text-[7.5rem]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="max-w-3xl text-3xl font-extrabold tracking-[-0.035em] text-cream sm:text-4xl">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm font-medium text-cream/80">By {post.author.name}</p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-cream/80">{post.summary}</p>
                <div className="mt-7">
                  <ButtonLink href={`/blog/${post.slug}`} tone="white">
                    Read article
                  </ButtonLink>
                </div>
              </article>
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

      <ClosingCta image="/media/gallery/startup-talk.webp" />
    </>
  );
}
