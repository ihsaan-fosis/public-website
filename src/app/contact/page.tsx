import type { Metadata } from "next";
import Link from "next/link";
import { Panel } from "@/components/panel";
import { PartnerWall } from "@/components/sections";
import { Eyebrow, PhotoHero, ButtonLink, Section, SectionHeading } from "@/components/ui";
import { COMMUNITY_PARTNERS, CONTACT_EMAIL, PARTNER_TIERS, SOCIAL_LINKS } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact IHSAAN about student programmes, mentoring, volunteering and partnerships across the UK and Ireland.",
  path: "/contact",
  socialDescription: "Get in touch with IHSAAN about programmes, mentoring, volunteering and partnerships.",
});

const ALL_PARTNERS = [...PARTNER_TIERS.flatMap((tier) => tier.partners), ...COMMUNITY_PARTNERS];

export default function ContactPage() {
  return (
    <>
      <PhotoHero image="/media/impact.webp" title="We would love to hear from you." />

      <Section labelledBy="conversation-title">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Panel motif="c" className="min-h-[24rem] rounded-[22px]">
            <h2 id="conversation-title" className="text-3xl font-extrabold tracking-[-0.03em] sm:text-[2.6rem]">
              Start a conversation
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-white/90">
              Email us about partnerships, programmes, mentoring or volunteering. Your message is handled through your
              email provider and is not submitted through this website.
            </p>
            <div className="mt-auto pt-8">
              <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=IHSAAN%20enquiry`} tone="white" external>
                Email IHSAAN
              </ButtonLink>
            </div>
          </Panel>

          <dl className="flex flex-col rounded-[22px] bg-surface px-6 ring-1 ring-ink/5">
            <div className="border-b border-ink/10 py-6">
              <dt>
                <Eyebrow>Email</Eyebrow>
              </dt>
              <dd className="mt-2">
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg font-medium text-ink hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
            <div className="border-b border-ink/10 py-6">
              <dt>
                <Eyebrow>Location</Eyebrow>
              </dt>
              <dd className="mt-2 text-lg font-medium text-ink">UK & Ireland</dd>
            </div>
            <div className="border-b border-ink/10 py-6">
              <dt>
                <Eyebrow>Community and volunteering</Eyebrow>
              </dt>
              <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/ticket#community" className="text-lg font-medium text-ink hover:underline">
                  Join the WhatsApp community
                </Link>
                <Link href="/ticket#volunteer" className="text-lg font-medium text-ink hover:underline">
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
                    className="text-lg font-medium text-ink hover:underline"
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

      <Section labelledBy="network-title" className="pt-0 sm:pt-0">
        <SectionHeading id="network-title" title="Organisations we work with" />
        <div className="mt-10">
          <PartnerWall partners={ALL_PARTNERS} />
        </div>
      </Section>
    </>
  );
}
