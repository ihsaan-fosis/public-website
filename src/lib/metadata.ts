import type { Metadata } from "next";

export const DEFAULT_TITLE = "IHSAAN | Elevating Faith-Driven Talent";

const DEFAULT_IMAGE = "/media/hero-poster.webp";

type PageMeta = {
  /** Omit on the homepage so the layout's default title applies. */
  title?: string;
  description: string;
  path: string;
  /** Shorter copy for link previews; defaults to `description`. */
  socialDescription?: string;
  image?: string;
};

/**
 * Next replaces nested `openGraph` and `twitter` objects instead of merging them,
 * so every page gets the full set here rather than inheriting a partial one from the layout.
 */
export function pageMetadata({ title, description, path, socialDescription = description, image = DEFAULT_IMAGE }: PageMeta): Metadata {
  const socialTitle = title ? `${title} | IHSAAN` : DEFAULT_TITLE;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "IHSAAN",
      locale: "en_GB",
      title: socialTitle,
      description: socialDescription,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
  };
}
