import type { Metadata } from "next";
import { InvolvementActions } from "@/components/involvement-actions";
import { PhotoHero, Section, SectionHeading } from "@/components/ui";
import { GET_INVOLVED } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Get Involved",
  description:
    "Join IHSAAN as a student, mentor, volunteer or partner and help Muslim talent build meaningful, faith-conscious careers.",
  path: GET_INVOLVED.href,
  socialDescription: "Join IHSAAN as a student, mentor, volunteer or partner.",
});

export default function GetInvolvedPage() {
  return (
    <>
      <PhotoHero
        image="/media/career-conference-hd.webp"
        title="Get involved."
        intro="Whether you are a student, a professional or an organisation, there is a concrete step you can take with IHSAAN today."
      />

      <Section labelledBy="actions-title">
        <SectionHeading
          id="actions-title"
          title="Take the next step"
          aside="Some steps open on other websites. Nothing you enter there is submitted through this website."
        />
        <InvolvementActions />
      </Section>
    </>
  );
}
