import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClosingCta } from "@/components/sections";
import { ButtonLink, PhotoHero, revealDelay, Section, SectionHeading } from "@/components/ui";
import { BLOG_POSTS, readingMinutes, type BlogPost } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Reflections and writing from the IHSAAN community for Muslim students building faith-conscious careers across the UK and Ireland.",
  path: "/blog",
  socialDescription: "Reflections and writing from the IHSAAN community.",
});

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** Author, date when known, and reading time on one line. */
function Byline({ post }: { post: BlogPost }) {
  return (
    <p className="text-sm font-medium text-ink/65">
      <span className="text-ink">By {post.author.name}</span>
      {post.published ? (
        <>
          <span aria-hidden className="mx-2 text-ink/30">
            /
          </span>
          <time dateTime={post.published}>{dateFormat.format(new Date(post.published))}</time>
        </>
      ) : null}
      <span aria-hidden className="mx-2 text-ink/30">
        /
      </span>
      <span>{readingMinutes(post)} min read</span>
    </p>
  );
}

function Cover({ post, sizes, className }: { post: BlogPost; sizes: string; className: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      tabIndex={-1}
      aria-hidden
      className={`group relative block overflow-hidden bg-night-2 ${className}`}
    >
      <Image
        src={post.image.src}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
    </Link>
  );
}

/** The newest piece, set large beside its cover as the page's lead story. */
function LeadPost({ post }: { post: BlogPost }) {
  return (
    <article data-reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
      <Cover post={post} sizes="(min-width: 1280px) 640px, (min-width: 1024px) 55vw, 100vw" className="aspect-[4/3] rounded-[28px]" />
      <div>
        <h3 className="text-3xl leading-[1.08] font-extrabold tracking-[-0.035em] text-ink sm:text-5xl">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <div className="mt-5">
          <Byline post={post} />
        </div>
        <p className="mt-5 max-w-xl text-[15px] leading-7 text-ink/75">{post.summary}</p>
        <p className="mt-5 text-sm text-ink/65">{post.tags.join(" · ")}</p>
        <div className="mt-8">
          <ButtonLink href={`/blog/${post.slug}`}>Read article</ButtonLink>
        </div>
      </div>
    </article>
  );
}

/** Older pieces as unboxed rows: text on the left, a small cover on the right. */
function PostRow({ post, index }: { post: BlogPost; index: number }) {
  return (
    <li data-reveal style={revealDelay(index % 3)} className="border-b border-ink/10 py-8">
      <article className="grid gap-5 sm:grid-cols-[1fr_14rem] sm:items-center sm:gap-10">
        <div>
          <h3 className="text-2xl leading-tight font-extrabold tracking-[-0.03em] text-ink sm:text-3xl">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h3>
          <div className="mt-3">
            <Byline post={post} />
          </div>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-ink/75">{post.summary}</p>
        </div>
        <Cover post={post} sizes="224px" className="aspect-[4/3] rounded-[22px] max-sm:order-first" />
      </article>
    </li>
  );
}

export default function BlogPage() {
  const [lead, ...earlier] = BLOG_POSTS;

  return (
    <>
      <PhotoHero
        image="/media/gallery/students-collaborating.webp"
        title="Blog."
        intro="Reflections and writing from the IHSAAN community. Each piece is published on this site so students can read it without leaving ihsaan.network."
      />

      <Section labelledBy="posts-title">
        <SectionHeading
          id="posts-title"
          title="Latest writing"
          aside="Full articles live on IHSAAN. New pieces are added as they are published."
        />
        {lead ? (
          <div className="mt-12">
            <LeadPost post={lead} />
          </div>
        ) : null}
        {earlier.length > 0 ? (
          <ul className="mt-16 border-t border-ink/10">
            {earlier.map((post, index) => (
              <PostRow key={post.slug} post={post} index={index} />
            ))}
          </ul>
        ) : null}
      </Section>

      <ClosingCta image="/media/gallery/hackathon-discussion.webp" />
    </>
  );
}
