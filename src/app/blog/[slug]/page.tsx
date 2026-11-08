import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/components/article-hero";
import { MarkdownBody, markdownHeadings } from "@/components/markdown-body";
import { ClosingCta } from "@/components/sections";
import { PhotoHero, Section } from "@/components/ui";
import { getPublishedBlogArticle, getPublishedBlogSlugs } from "@/lib/blog-catalog";
import { pageMetadata } from "@/lib/metadata";
import { SITE_ORIGIN } from "@/lib/site";

type Params = { slug: string };

/**
 * Posts are created and withdrawn in the member portal, so this route cannot be limited to a
 * build-time slug list. `dynamicParams` stays at its default so a slug published after the build
 * resolves, and the route reads the current article per request rather than a cached copy. The
 * build still pre-lists today's published slugs through `generateStaticParams`.
 */
export const dynamic = "force-dynamic";

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const post = await getPublishedBlogArticle((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    image: post.cover?.src,
    type: "article",
    publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    authors: [post.authorName],
    tags: post.tags,
  });
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const post = await getPublishedBlogArticle((await params).slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const contents = markdownHeadings(post.bodyMd);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    // Absolute already when the cover came from the portal; site-relative when it is ours.
    ...(post.cover ? { image: [new URL(post.cover.src, SITE_ORIGIN).toString()] } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}${path}`,
    },
    author: {
      "@type": "Person",
      name: post.authorName,
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
    ...(post.publishedAt ? { datePublished: new Date(post.publishedAt).toISOString() } : {}),
    inLanguage: "en-GB",
    keywords: post.tags.join(", "),
  };

  return (
    <>
      {post.cover ? (
        <ArticleHero cover={post.cover} remote={post.coverIsRemote} title={post.title} intro={post.summary} />
      ) : (
        <PhotoHero image="/media/faithful-talent-hd.webp" title={post.title} intro={post.summary} />
      )}

      <Section labelledBy="article-body-title">
        <h2 id="article-body-title" className="sr-only">
          Article
        </h2>
        <article className="mx-auto max-w-3xl lg:max-w-5xl">
          <div className="lg:grid lg:grid-cols-[14rem_minmax(0,48rem)] lg:items-start lg:gap-x-12 xl:grid-cols-[15rem_minmax(0,48rem)] xl:gap-x-16">
            <div className="lg:col-start-2">
              <p className="text-sm font-medium text-ink/65">
                <Link href="/blog" className="hover:text-ink hover:underline">
                  Blog
                </Link>
                <span aria-hidden className="mx-2 text-ink/30">
                  /
                </span>
                <span>Article</span>
              </p>
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink/65">
                <div>
                  <dt className="sr-only">Author</dt>
                  <dd className="font-medium text-ink">By {post.authorName}</dd>
                </div>
                {post.publishedAt ? (
                  <div>
                    <dt className="sr-only">Published</dt>
                    <dd>
                      <time dateTime={new Date(post.publishedAt).toISOString()}>
                        {dateFormat.format(post.publishedAt)}
                      </time>
                    </dd>
                  </div>
                ) : null}
                {post.tags.length > 0 ? (
                  <div>
                    <dt className="sr-only">Tags</dt>
                    <dd>{post.tags.join(" · ")}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            {contents.length > 0 ? (
              <nav
                aria-label="Article sections"
                className="mt-12 border-t border-ink/10 pt-8 lg:col-start-1 lg:row-span-2 lg:mt-0 lg:border-t-0 lg:pt-0 lg:sticky lg:top-24 lg:self-start"
              >
                <p className="text-sm font-medium text-ink">In this article</p>
                <ol className="mt-4 space-y-2.5 text-sm text-ink/80">
                  {contents.map((section, index) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="font-medium hover:text-ink hover:underline">
                        <span className="mr-2 text-ink/65">{String(index + 1).padStart(2, "0")}</span>
                        {section.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            <div className="lg:col-start-2">
              <div className="mt-4 border-t border-ink/10 pt-10 lg:mt-12">
                <MarkdownBody source={post.bodyMd} />
              </div>

              <aside className="mt-12 border-t border-ink/10 pt-10">
                <p className="text-sm text-ink/65">Author</p>
                <p className="mt-3 text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">
                  {post.authorName}
                </p>
              </aside>

              <p className="mt-10 text-[13px] leading-6 text-ink/65">
                <Link href="/blog" className="font-medium text-ink underline underline-offset-4">
                  Back to all writing
                </Link>
              </p>
            </div>
          </div>
        </article>
      </Section>

      <ClosingCta image="/media/gallery/students-at-work.webp" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
