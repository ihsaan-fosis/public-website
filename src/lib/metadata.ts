import type { Metadata } from "next";

export const DEFAULT_TITLE = "IHSAAN | Faith. Excellence. Service.";

const DEFAULT_IMAGE = "/media/hero-poster.webp";

type PageMeta = {
  /** Omit on the homepage so the layout's default title applies. */
  title?: string;
  description: string;
  path: string;
  /** Shorter copy for link previews; defaults to `description`. */
  socialDescription?: string;
  image?: string;
  /** Defaults to website. Use article for native blog posts. */
  type?: "website" | "article";
  publishedTime?: string;
  authors?: readonly string[];
  tags?: readonly string[];
};

/**
 * Next replaces nested `openGraph` and `twitter` objects instead of merging them,
 * so every page gets the full set here rather than inheriting a partial one from the layout.
 */
export function pageMetadata({
  title,
  description,
  path,
  socialDescription = description,
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime,
  authors,
  tags,
}: PageMeta): Metadata {
  const socialTitle = title ? `${title} | IHSAAN` : DEFAULT_TITLE;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: "IHSAAN",
      locale: "en_GB",
      title: socialTitle,
      description: socialDescription,
      url: path,
      images: [image],
      ...(type === "article"
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(authors?.length ? { authors: [...authors] } : {}),
            ...(tags?.length ? { tags: [...tags] } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
  };
}
