import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PhotoHero, revealDelay, Section, SectionTitle } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact IHSAAN about student programmes, mentoring, volunteering and partnerships across the UK and Ireland.",
  path: "/contact",
  socialDescription: "Get in touch with IHSAAN about programmes, mentoring, volunteering and partnerships.",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string | string[] }>;
}) {
  const params = await searchParams;
  const topic = typeof params.topic === "string" ? params.topic : undefined;

  return (
    <>
      <PhotoHero image="/media/impact.webp" title="We would love to hear from you." />

      <Section labelledBy="conversation-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div data-reveal>
            <SectionTitle id="conversation-title" compact>
              Start a conversation
            </SectionTitle>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-ink/70">
              Ask about partnerships, programmes, mentoring or volunteering, or tell us what is on your mind. Pick a
              topic and your message goes straight to the IHSAAN team.
            </p>
          </div>
          <div data-reveal style={revealDelay(1)}>
            <ContactForm defaultQueryType={topic} />
          </div>
        </div>
      </Section>
    </>
  );
}
