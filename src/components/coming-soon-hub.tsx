import Link from "next/link";
import { ClosingCta } from "@/components/sections";
import { ButtonLink, Eyebrow, PhotoHero, Section } from "@/components/ui";
import type { ResourceHub } from "@/content/resource-hubs";

export function ComingSoonHub({ hub }: { hub: ResourceHub }) {
  return (
    <>
      <PhotoHero image={hub.image} title={hub.heroTitle} intro={hub.summary} />

      <Section labelledBy="coming-soon-title">
        <div className="mx-auto max-w-3xl rounded-[22px] bg-surface p-8 ring-1 ring-ink/5 sm:p-12">
          <Eyebrow>Coming soon</Eyebrow>
          <h2 id="coming-soon-title" className="mt-4 text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
            This hub is still being built
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-ink/70">{hub.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={hub.partner.href} external>
              {hub.partner.label}
            </ButtonLink>
            <ButtonLink href={hub.programme.href} tone="ghost">
              {hub.programme.label}
            </ButtonLink>
          </div>
          <p className="mt-8 text-[13px] leading-6 text-ink/65">
            Looking for free guides instead?{" "}
            <Link href="/resources#career-essentials" className="font-medium text-ink underline underline-offset-4">
              Browse Career Essentials
            </Link>
            {" · "}
            <Link href="/resources" className="font-medium text-ink underline underline-offset-4">
              All resources
            </Link>
          </p>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
