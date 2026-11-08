import type { Metadata } from "next";

export const DEFAULT_TITLE = "IHSAAN | Faith. Excellence. Service.";

/** A link-preview image. Size it when known, so previews can lay out before the image loads. */
export type ShareImage = { src: string; alt: string; width?: number; height?: number };

const DEFAULT_IMAGE: ShareImage = {
  src: "/media/hero-poster.webp",
  alt: "A speaker presenting in front of IHSAAN's social media QR codes",
  width: 1280,
  height: 720,
};

type PageMeta = {
  /** Omit on the homepage so the layout's default title applies. */
  title?: string;
  description: string;
  path: string;
  /** Shorter copy for link previews; defaults to `description`. */
  socialDescription?: string;
  image?: ShareImage;
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
      images: [
        {
          url: image.src,
          alt: image.alt,
          ...(image.width && image.height ? { width: image.width, height: image.height } : {}),
        },
      ],
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
      images: [image.src],
    },
  };
}

/** BreadcrumbList JSON-LD from Home down to the current page, each step given by its site path. */
export function breadcrumbJsonLd(origin: string, trail: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${origin}${path}`,
    })),
  };
}
