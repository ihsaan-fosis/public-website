import type { Metadata } from "next";
import Link from "next/link";
import { CoverImage } from "@/components/blog-cover";
import { ClosingCta } from "@/components/sections";
import { ButtonLink, PhotoHero, revealDelay, Section, SectionHeading } from "@/components/ui";
import { getPublishedBlogSummaries, type BlogPostSummary } from "@/lib/blog-catalog";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Reflections and writing from the IHSAAN community for Muslim students building faith-conscious careers across the UK and Ireland.",
  path: "/blog",
  socialDescription: "Reflections and writing from the IHSAAN community.",
});

// Published posts change in the member portal, so each request reads the current catalogue
// rather than freezing it at build time. That is what lets a newly published slug appear and an
// unpublished one disappear without a redeploy.
export const dynamic = "force-dynamic";

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** Author, and date when known. */
function Byline({ post }: { post: BlogPostSummary }) {
  return (
    <p className="text-sm font-medium text-ink/65">
      <span className="text-ink">By {post.authorName}</span>
      {post.publishedAt ? (
        <>
          <span aria-hidden className="mx-2 text-ink/30">
            /
          </span>
          <time dateTime={new Date(post.publishedAt).toISOString()}>{dateFormat.format(post.publishedAt)}</time>
        </>
      ) : null}
    </p>
  );
}

function Cover({ post, sizes, className }: { post: BlogPostSummary; sizes: string; className: string }) {
  if (!post.cover) return null;
  return (
    <Link
      href={`/blog/${post.slug}`}
      tabIndex={-1}
      aria-hidden
      className={`group relative block overflow-hidden bg-night-2 ${className}`}
    >
      <CoverImage
        cover={post.cover}
        remote={post.coverIsRemote}
        alt=""
        sizes={sizes}
        className="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
    </Link>
  );
}

/** The newest piece, set large beside its cover as the page's lead story. */
function LeadPost({ post }: { post: BlogPostSummary }) {
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
        {post.tags.length > 0 ? <p className="mt-5 text-sm text-ink/65">{post.tags.join(" · ")}</p> : null}
        <div className="mt-8">
          <ButtonLink href={`/blog/${post.slug}`}>Read article</ButtonLink>
        </div>
      </div>
    </article>
  );
}

/** Older pieces as unboxed rows: text on the left, a small cover on the right. */
function PostRow({ post, index }: { post: BlogPostSummary; index: number }) {
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

export default async function BlogPage() {
  const posts = await getPublishedBlogSummaries();
  const [lead, ...earlier] = posts;

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
        ) : (
          <p className="mt-12 max-w-xl text-[15px] leading-7 text-ink/75">
            Nothing is published yet. New writing appears here as soon as it goes live.
          </p>
        )}
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
