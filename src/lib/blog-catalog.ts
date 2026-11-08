import "server-only";

import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { cache } from "react";
import { z } from "zod";
import { PRODUCTION_ORIGIN } from "./site";

/**
 * The published blog catalogue, read once per request by the blog routes, the sitemap and
 * llms.txt. The member portal owns the posts; this module only ever calls the two public,
 * read-only queries and decodes what comes back.
 *
 * This module is server-only: it is imported by server components and route handlers, and it
 * reads a deployment URL from the server environment. The `server-only` marker above turns that
 * into a bundling error if a client component ever imports it, so a `CONVEX_URL` read cannot be
 * dragged into a browser bundle. Next resolves the marker itself; the integration test config
 * maps it to Next's compiled empty module, which is the same resolution the server build uses.
 *
 * The portal is the only source. `CONVEX_URL` must be set for any post to appear: when it is
 * unset the catalogue is empty and every article route answers 404. An empty catalogue means
 * nothing is published. A failed or malformed response throws instead, so an outage answers 500
 * rather than a 404 or a sitemap without its posts, and a withdrawn post is never served from a
 * stale copy.
 */

const FETCH_TIMEOUT_MS = 3000;

/** `listPublished` omits the body, so the index never downloads full articles. */
const listPublished = makeFunctionReference<"query", Record<string, never>, unknown>("blogPosts:listPublished");
const getPublished = makeFunctionReference<"query", { slug: string }, unknown>("blogPosts:getPublished");

/** Covers are an absolute https address or nothing, never a data URI. */
const httpsUrl = z.url({ protocol: /^https$/ });

/**
 * The slug the portal stores: lowercase words joined by single hyphens. Anything else would put a
 * broken or ambiguous address in the index, the sitemap, `llms.txt` and the JSON-LD, so a response
 * carrying one is refused rather than published.
 */
const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

/**
 * Epoch milliseconds a page can actually format. `Date` only holds ±8.64e15 ms, and
 * `toISOString()` throws outside that range, so an absurd number from the backend would take down
 * the whole route instead of one field. The portal already rejects non-finite values; this also
 * covers the range, because the page is the last place the number is trusted.
 */
const MAX_DATE_MS = 8.64e15;
const publishedAtSchema = z.number().min(-MAX_DATE_MS).max(MAX_DATE_MS).nullish();

const summarySchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  summary: z.string(),
  authorName: z.string(),
  tags: z.array(z.string()),
  imageUrl: httpsUrl.nullish(),
  imageAlt: z.string().nullish(),
  publishedAt: publishedAtSchema,
});

const articleSchema = summarySchema.extend({ bodyMd: z.string() });

const listSchema = z.array(summarySchema);

export type BlogCover = { src: string; alt: string };

export type BlogPostSummary = {
  slug: string;
  title: string;
  summary: string;
  authorName: string;
  tags: readonly string[];
  cover?: BlogCover;
  /** True when the cover is on another host, which is never sent through the image optimiser. */
  coverIsRemote: boolean;
  publishedAt?: number;
};

export type BlogPostArticle = BlogPostSummary & { bodyMd: string };

function configuredUrl(): string | undefined {
  const url = process.env.CONVEX_URL?.trim();
  return url ? url : undefined;
}

/** One client per read, with a bounded request so a slow deployment cannot hold a page open. */
function client(url: string): ConvexHttpClient {
  return new ConvexHttpClient(url, {
    fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) }),
  });
}

/**
 * A cover under this site's own `/media/` is served as a site-relative path, so it goes through
 * `next/image` like every other first-party photo. Anything else stays an absolute remote address.
 */
function coverOf(
  src: string | null | undefined,
  alt: string | null | undefined,
): Pick<BlogPostSummary, "cover" | "coverIsRemote"> {
  if (!src) return { coverIsRemote: false };
  const url = new URL(src);
  const ownMedia = url.origin === PRODUCTION_ORIGIN && url.pathname.startsWith("/media/") && !url.search && !url.hash;
  return { cover: { src: ownMedia ? url.pathname : src, alt: alt?.trim() ?? "" }, coverIsRemote: !ownMedia };
}

async function load(what: string, read: () => Promise<unknown>): Promise<unknown> {
  try {
    return await read();
  } catch (error) {
    throw new Error(`Could not load ${what} from Convex.`, { cause: error });
  }
}

function parse<T>(schema: z.ZodType<T>, value: unknown, what: string): T {
  const parsed = schema.safeParse(value);
  if (!parsed.success) throw new Error(`${what} had an unexpected shape.`, { cause: parsed.error });
  return parsed.data;
}

function summaryOf(post: z.infer<typeof summarySchema>): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    authorName: post.authorName,
    tags: post.tags,
    ...coverOf(post.imageUrl, post.imageAlt),
    ...(post.publishedAt ? { publishedAt: post.publishedAt } : {}),
  };
}

/**
 * Published posts, newest first: exactly what the portal returns. An unconfigured site has no
 * posts, and an empty list stands as "nothing is published".
 */
export async function getPublishedBlogSummaries(): Promise<readonly BlogPostSummary[]> {
  const url = configuredUrl();
  if (!url) return [];
  const response = await load("published blog posts", () => client(url).query(listPublished, {}));
  return parse(listSchema, response, "Published blog list").map(summaryOf);
}

/**
 * One published article, or `null` so the route can answer with a 404. Memoised per request, so
 * the page and its metadata share one read and one snapshot.
 */
export const getPublishedBlogArticle = cache(async (slug: string): Promise<BlogPostArticle | null> => {
  const url = configuredUrl();
  if (!url) return null;
  const response = await load("the published blog article", () => client(url).query(getPublished, { slug }));
  // `getPublished` answers `null` for a slug that was never published, or that has been
  // withdrawn. That is an ordinary miss and the route answers 404, so it is not an error.
  if (response === null || response === undefined) return null;
  const post = parse(articleSchema, response, "Published blog article");
  return { ...summaryOf(post), bodyMd: post.bodyMd };
});

/** Slugs for the sitemap, llms.txt and the article route's fallback parameters. */
export async function getPublishedBlogSlugs(): Promise<readonly string[]> {
  return (await getPublishedBlogSummaries()).map((post) => post.slug);
}
