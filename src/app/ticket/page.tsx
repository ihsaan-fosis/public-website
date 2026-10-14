import type { Metadata } from "next";
import { RouteSwitcher } from "@/components/route-switcher";
import { FaqSection, PhotoBand } from "@/components/sections";
import { PhotoFrame, PhotoHero, ButtonLink, revealDelay, Section, SectionHeading } from "@/components/ui";
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
        intro="Students, professionals and organisations all have a part to play in IHSAAN's work."
      />

      <Section labelledBy="routes-title">
        <SectionHeading id="routes-title" title="Ways to get involved" />
        <div className="mt-12">
          <RouteSwitcher />
        </div>
      </Section>

      <Section labelledBy="actions-title" className="pt-0 sm:pt-0">
        <SectionHeading
          id="actions-title"
          title="Take the next step"
          aside="Some steps open on other websites. Nothing you enter there is submitted through this website."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <PhotoFrame
            src="/media/gallery/student-conversations.webp"
            alt="Students talking between conference sessions"
            sticky
          />
          <ul className="border-t border-ink/10">
            {INVOLVEMENT_ACTIONS.map((action, index) => (
              <li
                key={action.id}
                id={action.id}
                data-reveal
                style={revealDelay(index % 3)}
                className="flex scroll-mt-24 items-baseline gap-6 border-b border-ink/10 py-8"
              >
                <span aria-hidden className="w-6 shrink-0 text-xs text-ink/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">
                    {action.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-[15px] leading-7 text-ink/70">{action.body}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink href={action.cta.href} external={action.cta.external} className="py-3 text-center">
                      {action.cta.label}
                    </ButtonLink>
                    {action.secondary ? (
                      <ButtonLink
                        href={action.secondary.href}
                        external={action.secondary.external}
                        tone="ghost"
                        className="py-3 text-center"
                      >
                        {action.secondary.label}
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <PhotoBand image="/media/gallery/employer-conversations.webp" labelledBy="conversation-title">
        <h2
          id="conversation-title"
          className="hero-title-editorial mt-auto pt-10 leading-[1.08] font-extrabold tracking-[-0.03em] text-cream lg:row-start-3 lg:self-end lg:pt-0"
        >
          <span className="block">Start a</span> <span className="block">conversation.</span>
        </h2>
        <div className="mt-6 flex flex-col items-start gap-6 sm:mt-8 lg:col-start-2 lg:row-start-3 lg:mt-0 lg:self-end">
          <p className="max-w-sm text-sm leading-6 text-cream/70">
            Tell us how you would like to take part. We will direct you to the right programme or partnership route.
          </p>
          <ButtonLink href="/contact" tone="white">
            Contact IHSAAN
          </ButtonLink>
        </div>
      </PhotoBand>

      <FaqSection />
    </>
  );
}
