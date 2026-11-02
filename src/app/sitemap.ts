import type { MetadataRoute } from "next";
import { PROGRAMME_PAGES } from "../content/programmes";
import { getPublishedBlogSlugs } from "../lib/blog-catalog";
import { SITE_ORIGIN } from "../lib/site";

// Article URLs come from the live catalogue, so a post published or withdrawn in the member
// portal changes this file on the next request instead of waiting for a rebuild.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getPublishedBlogSlugs();

  return [
    {
      url: SITE_ORIGIN + "/",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: SITE_ORIGIN + "/programmes",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...PROGRAMME_PAGES.map(({ slug }) => ({
      url: `${SITE_ORIGIN}/programmes/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    {
      url: SITE_ORIGIN + "/about",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: SITE_ORIGIN + "/contact",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: SITE_ORIGIN + "/impact",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: SITE_ORIGIN + "/blog",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogSlugs.map((slug) => ({
      url: `${SITE_ORIGIN}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: SITE_ORIGIN + "/gallery",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: SITE_ORIGIN + "/start",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: SITE_ORIGIN + "/professionals",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: SITE_ORIGIN + "/volunteer",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: SITE_ORIGIN + "/tech-team",
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: SITE_ORIGIN + "/privacy",
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: SITE_ORIGIN + "/terms",
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
