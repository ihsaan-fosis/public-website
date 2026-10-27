import Image from "next/image";
import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections";
import { PhotoHero, revealDelay, Section } from "@/components/ui";
import { GALLERY } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Programme Gallery",
  description:
    "See IHSAAN career conferences, hackathons and student programmes supporting Muslim talent across the UK and Ireland.",
  path: "/gallery",
  socialDescription: "Explore IHSAAN career conferences, hackathons and student programmes.",
});

export default function GalleryPage() {
  return (
    <>
      <PhotoHero
        image="/media/impact-wide.webp"
        title="Programme gallery."
        intro="Moments from our career conferences, hackathons, internships and mentoring programmes."
      />
      <Section>
        <h2 className="sr-only">Photos</h2>
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY.map((photo, index) => (
            <li
              key={photo.src}
              data-reveal
              style={revealDelay(index % 3)}
              className="group mb-4 break-inside-avoid overflow-hidden rounded-[22px]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                quality={85}
                sizes="(min-width: 1280px) 384px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                className="h-auto w-full transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </Section>
      <ClosingCta />
    </>
  );
}
