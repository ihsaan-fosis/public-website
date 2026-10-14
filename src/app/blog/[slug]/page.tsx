import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/sections";
import { ButtonLink, displayClass, Eyebrow, PhotoHero, Section } from "@/components/ui";
import { BLOG_POSTS, getBlogPost } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";
import { SITE_ORIGIN } from "@/lib/site";
import { cn } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    image: post.image.src,
    type: "article",
    publishedTime: post.published,
    authors: [post.author.name],
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image: [`${SITE_ORIGIN}${post.image.src}`],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}${path}`,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.linkedin ? { sameAs: [post.author.linkedin] } : {}),
      ...(post.author.email ? { email: post.author.email } : {}),
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
    ...(post.published ? { datePublished: post.published } : {}),
    inLanguage: "en-GB",
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <PhotoHero image={post.image.src} title={post.title} intro={post.summary} />

      <Section labelledBy="article-body-title">
        <h2 id="article-body-title" className="sr-only">
          Article
        </h2>
        <article className="mx-auto max-w-3xl">
          <p className="text-sm font-medium text-ink/65">
            <Link href="/blog" className="hover:text-ink hover:underline">
              Blog
            </Link>
            <span aria-hidden className="mx-2 text-ink/30">
              /
            </span>
            <span>Article</span>
          </p>
          <Eyebrow className="mt-6">{post.tags[0] ?? "Reflection"}</Eyebrow>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink/65">
            <div>
              <dt className="sr-only">Author</dt>
              <dd className="font-medium text-ink">By {post.author.name}</dd>
            </div>
            {post.published ? (
              <div>
                <dt className="sr-only">Published</dt>
                <dd>
                  <time dateTime={post.published}>
                    {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
                      new Date(post.published),
                    )}
                  </time>
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="sr-only">Tags</dt>
              <dd>{post.tags.join(" · ")}</dd>
            </div>
          </dl>

          {post.lead ? (
            <p className="mt-10 text-xl leading-[1.5] font-medium tracking-[-0.01em] text-ink">{post.lead}</p>
          ) : null}

          <div className="mt-10 space-y-5 text-[15px] leading-7 text-ink/75">
            {post.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <nav aria-label="Article sections" className="mt-12 border-t border-ink/10 pt-8">
            <p className="text-[11px] font-bold tracking-[0.18em] text-ink/65 uppercase">In this article</p>
            <ol className="mt-4 space-y-2.5 text-sm text-ink/80">
              {post.sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="font-medium hover:text-ink hover:underline">
                    <span className="mr-2 text-ink/45">{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-4 divide-y divide-ink/10 border-t border-ink/10">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 py-10">
                <h2 className={cn("text-[1.75rem] leading-[1.1] sm:text-4xl", displayClass)}>{section.title}</h2>
                <div className="mt-5 space-y-4 text-[15px] leading-7 text-ink/75">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-4 space-y-4 border-t border-ink/10 pt-10 text-[15px] leading-7 text-ink/75">
            {post.closing.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="mt-12 border-t border-ink/10 pt-10">
            <Eyebrow>Author</Eyebrow>
            <p className="mt-3 text-2xl font-bold tracking-[-0.02em] text-ink">{post.author.name}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {post.author.linkedin ? (
                <ButtonLink href={post.author.linkedin} external>
                  Connect on LinkedIn
                </ButtonLink>
              ) : null}
              {post.author.email ? (
                <ButtonLink href={`mailto:${post.author.email}`} external tone="ghost">
                  {`Email ${post.author.name.split(" ")[0]}`}
                </ButtonLink>
              ) : null}
            </div>
            {post.originalSource ? (
              <p className="mt-6 text-[13px] leading-6 text-ink/65">
                First published as{" "}
                <a
                  href={post.originalSource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline underline-offset-4"
                >
                  {post.originalSource.label}
                </a>
                . This page is the canonical IHSAAN version.
              </p>
            ) : null}
          </aside>

          <p className="mt-10 text-[13px] leading-6 text-ink/65">
            <Link href="/blog" className="font-medium text-ink underline underline-offset-4">
              Back to all writing
            </Link>
            {" · "}
            <Link href="/resources" className="font-medium text-ink underline underline-offset-4">
              Free resources
            </Link>
          </p>
        </article>
      </Section>

      <ClosingCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
