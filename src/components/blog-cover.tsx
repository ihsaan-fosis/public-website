import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BlogCover } from "@/lib/blog-catalog";

/**
 * A post cover, from either source the portal can return.
 *
 * Covers under this site's `/media/` go through `next/image`. Covers on another host are not
 * listed in the site's image configuration, so they are served directly instead of being sent
 * through the optimiser it would reject.
 */
export function CoverImage({
  cover,
  remote,
  sizes,
  className,
  alt,
  eager = false,
}: {
  cover: BlogCover;
  remote: boolean;
  sizes: string;
  className?: string;
  /** Override the stored alt text, such as an empty string inside a decorative link. */
  alt?: string;
  eager?: boolean;
}) {
  const altText = alt ?? cover.alt;
  if (remote) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- the deployment host is not an optimiser source.
      <img
        src={cover.src}
        alt={altText}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <Image
      src={cover.src}
      alt={altText}
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      className={className}
    />
  );
}
