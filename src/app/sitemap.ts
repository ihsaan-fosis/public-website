import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "../content/blog";
import { nativeCareerGuides } from "../content/career-essentials";
import { PROGRAMME_PAGES } from "../content/programmes";
import { RESOURCE_HUBS } from "../content/resource-hubs";
import { SITE_ORIGIN } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
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
    url: SITE_ORIGIN + "/events",
    changeFrequency: "weekly",
    priority: 0.7,
  },
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
    url: SITE_ORIGIN + "/resources",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  ...nativeCareerGuides().map(({ slug }) => ({
    url: `${SITE_ORIGIN}/resources/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })),
  {
    url: SITE_ORIGIN + "/blog",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  ...BLOG_POSTS.map(({ slug }) => ({
    url: `${SITE_ORIGIN}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })),
  ...RESOURCE_HUBS.map(({ path }) => ({
    url: `${SITE_ORIGIN}${path}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  })),
  {
    url: SITE_ORIGIN + "/gallery",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: SITE_ORIGIN + "/ticket",
    changeFrequency: "weekly",
    priority: 0.7,
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
