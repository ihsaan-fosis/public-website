import type { MetadataRoute } from "next";
import { PROGRAMME_PAGES } from "../content/programmes";
import { getPublishedBlogSummaries } from "../lib/blog-catalog";
import { SITE_ORIGIN } from "../lib/site";

// Article URLs come from the live catalogue, so a post published or withdrawn in the member
// portal changes this file on the next request instead of waiting for a rebuild.
export const dynamic = "force-dynamic";

/**
 * Google ignores `changefreq` and `priority`, and trusts `lastmod` only when it is accurate, so
 * only articles carry a date: their publication time. Static pages have no reliable one.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedBlogSummaries();
  const page = (path: string) => ({ url: SITE_ORIGIN + path });

  return [
    // The bare origin, matching the homepage canonical.
    { url: SITE_ORIGIN },
    page("/programmes"),
    ...PROGRAMME_PAGES.map(({ slug }) => page(`/programmes/${slug}`)),
    page("/about"),
    page("/contact"),
    page("/impact"),
    page("/blog"),
    ...posts.map(({ slug, publishedAt }) => ({
      ...page(`/blog/${slug}`),
      ...(publishedAt ? { lastModified: new Date(publishedAt) } : {}),
    })),
    page("/gallery"),
    page("/start"),
    page("/professionals"),
    page("/volunteer"),
    page("/tech-team"),
    page("/privacy"),
    page("/terms"),
  ];
}
