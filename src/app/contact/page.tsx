import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow, PhotoHero, revealDelay, Section, SectionTitle } from "@/components/ui";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact IHSAAN about student programmes, mentoring, volunteering and partnerships across the UK and Ireland.",
  path: "/contact",
  socialDescription: "Get in touch with IHSAAN about programmes, mentoring, volunteering and partnerships.",
});

export default function ContactPage() {
  return (
    <>
      <PhotoHero image="/media/impact.webp" title="We would love to hear from you." />

      <Section labelledBy="conversation-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div data-reveal>
            <SectionTitle id="conversation-title">Start a conversation</SectionTitle>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-ink/70">
              Ask about partnerships, programmes, mentoring or volunteering, or tell us what is on your mind. Pick a
              topic and your message goes straight to the IHSAAN team.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <dl data-reveal style={revealDelay(1)} className="flex flex-col border-t border-ink/10">
            <div className="border-b border-ink/10 py-6">
              <dt>
                <Eyebrow>Email</Eyebrow>
              </dt>
              <dd className="mt-2">
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-xl font-medium tracking-[-0.02em] text-ink hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
            <div className="border-b border-ink/10 py-6">
              <dt>
                <Eyebrow>Location</Eyebrow>
              </dt>
              <dd className="mt-2 text-xl font-medium tracking-[-0.02em] text-ink">UK & Ireland</dd>
            </div>
            <div className="border-b border-ink/10 py-6">
              <dt>
                <Eyebrow>Community and volunteering</Eyebrow>
              </dt>
              <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/ticket#community" className="text-xl font-medium tracking-[-0.02em] text-ink hover:underline">
                  Join the WhatsApp community
                </Link>
                <Link href="/ticket#volunteer" className="text-xl font-medium tracking-[-0.02em] text-ink hover:underline">
                  Volunteer with IHSAAN
                </Link>
              </dd>
            </div>
            <div className="border-b border-ink/10 py-6">
              <dt>
                <Eyebrow>Follow</Eyebrow>
              </dt>
              <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-medium tracking-[-0.02em] text-ink hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </dd>
            </div>
            <div className="py-6 text-[13px] leading-6 text-ink/65">
              <dt className="sr-only">Privacy</dt>
              <dd>
                Read our{" "}
                <Link href="/privacy" className="text-ink underline">
                  privacy policy
                </Link>{" "}
                before sending personal information.
              </dd>
            </div>
          </dl>
        </div>
      </Section>
    </>
  );
}
