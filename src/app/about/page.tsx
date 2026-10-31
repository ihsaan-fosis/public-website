import type { Metadata } from "next";
import {
  PurposeChapter,
  StoryContinues,
  TeamChapter,
  ValuesChapter,
  WhoChapter,
} from "@/components/story";
import { PhotoHero } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description:
    "Discover how IHSAAN helps Muslim students across the UK and Ireland access mentorship, networks and faith-conscious career opportunities.",
  path: "/about",
  socialDescription: "IHSAAN unlocks Muslim student talent through mentorship, networks and career opportunities.",
});

export default function AboutPage() {
  return (
    <>
      <PhotoHero
        image="/media/gallery/networking-hall.webp"
        title="Our story."
        intro="Empowering Muslim excellence. Here is who stands behind IHSAAN, and what we stand for."
      />
      <WhoChapter />
      <PurposeChapter />
      <ValuesChapter />
      <TeamChapter />
      <StoryContinues />
    </>
  );
}
