import type { Metadata } from "next";
import { RouteSwitcher } from "@/components/route-switcher";
import { FaqSection, InvolvementCards } from "@/components/sections";
import { PhotoHero, ButtonLink, revealDelay, Section, SectionHeading } from "@/components/ui";
import { INVOLVEMENT_ACTIONS } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Get Involved",
  description:
    "Join IHSAAN as a student, mentor, volunteer or partner and help Muslim talent build meaningful, faith-conscious careers.",
  path: "/ticket",
  socialDescription: "Join IHSAAN as a student, mentor, volunteer or partner.",
});

export default function GetInvolvedPage() {
  return (
    <>
      <PhotoHero
        image="/media/career-conference.webp"
        title="Get involved."
        intro="Students, professionals and organisations all have a part to play in elevating faith-driven talent."
      />

      <Section labelledBy="routes-title">
        <SectionHeading id="routes-title" title="Ways to get involved" />
        <div className="mt-12">
          <RouteSwitcher />
        </div>
      </Section>

      <Section labelledBy="cards-title" className="pt-0 sm:pt-0">
        <h2 id="cards-title" className="sr-only">
          What each route offers
        </h2>
        <InvolvementCards />
      </Section>

      <Section labelledBy="actions-title" className="pt-0 sm:pt-0">
        <SectionHeading
          id="actions-title"
          title="Take the next step"
          aside="Some steps open on other websites. Nothing you enter there is submitted through this website."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {INVOLVEMENT_ACTIONS.map((action, index) => (
            <li
              key={action.id}
              id={action.id}
              data-reveal
              style={revealDelay(index % 2)}
              className="flex scroll-mt-24 flex-col rounded-[22px] bg-surface p-8 ring-1 ring-ink/5"
            >
              <h3 className="text-2xl font-bold tracking-[-0.02em] text-ink">{action.title}</h3>
              <p className="mt-3 max-w-lg text-[15px] leading-7 text-ink/70">{action.body}</p>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <ButtonLink href={action.cta.href} external={action.cta.external} className="py-3 text-center">
                  {action.cta.label}
                </ButtonLink>
                {action.secondary ? (
                  <ButtonLink href={action.secondary.href} external={action.secondary.external} tone="ghost" className="py-3 text-center">
                    {action.secondary.label}
                  </ButtonLink>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="conversation-title" className="pt-0 sm:pt-0">
        <div className="flex flex-col gap-8 rounded-[22px] bg-surface p-8 ring-1 ring-ink/5 sm:p-12 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="conversation-title"
            title="Start a conversation"
            aside="Tell us how you would like to take part. We will direct you to the right programme or partnership route."
          />
          <ButtonLink href="/contact" className="shrink-0">
            Contact IHSAAN
          </ButtonLink>
        </div>
      </Section>

      <FaqSection />
    </>
  );
}
