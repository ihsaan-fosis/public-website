import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { CountUp } from "@/components/motion";
import { BAND_INTRO, BAND_ROW, BAND_TITLE, GalleryParallax, PhotoBand } from "@/components/sections";
import { StickySignUp } from "@/components/sticky-signup";
import { ButtonLink, PhotoHero, Section, SectionHeading, revealDelay } from "@/components/ui";
import { TRACTION } from "@/content/impact";
import { GET_INVOLVED, MEMBER_PORTAL_SIGNUP, PROFESSIONALS_LINK, PROGRAMMES, type Photo } from "@/content/site";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Get Started",
  description:
    "Create your IHSAAN account to join career conferences, hackathons, internships, insight events and workshops for Muslim students.",
  path: GET_INVOLVED.href,
  socialDescription: "Create your IHSAAN account and start your career journey.",
});

const SIGN_UP_LABEL = "Create your account";

const PROOF_LABELS = [
  "Unique students engaged in two years",
  "Verified mentors across 15+ industries",
  "Internships secured across 30+ companies",
  "University Islamic societies partnered directly",
];
const PROOF = PROOF_LABELS.map((label) => {
  const stat = TRACTION.find((candidate) => candidate.label === label);
  if (!stat) throw new Error(`Missing traction stat: ${label}`);
  return stat;
});

const STEPS = ["Create your account", "Pick a programme", "Show up and grow"] as const;

function PhotoTile({
  photo,
  index,
  className,
  children,
}: {
  photo: Photo;
  index: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <li data-reveal style={revealDelay(index % 3)} className="h-full">
      <article
        className={cn(
          "group relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[22px] bg-night-2 p-6 pt-44 sm:min-h-[26rem] sm:p-7",
          className,
        )}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
          className="-z-20 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/55 to-night/5 transition-colors duration-700 group-hover:via-ihsaan-purple/60" />
        <span
          aria-hidden
          className="absolute top-3 right-5 text-[5.5rem] leading-none font-extrabold tracking-[-0.06em] text-cream/20 transition-colors duration-700 group-hover:text-cream/40"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {children}
      </article>
    </li>
  );
}

export default function GetStartedPage() {
  return (
    <div>
      <PhotoHero
        image="/media/career-conference-hd.webp"
        title="Turn your degree into a career."
        intro="Join IHSAAN's community of Muslim students and graduates."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={MEMBER_PORTAL_SIGNUP.href} external tone="white">
            {SIGN_UP_LABEL}
          </ButtonLink>
          <ButtonLink href={PROFESSIONALS_LINK.href} tone="light-outline">
            Professionals and organisations
          </ButtonLink>
        </div>
      </PhotoHero>

      <Section labelledBy="proof-title" className="py-12 sm:py-16">
        <h2 id="proof-title" className="sr-only">
          IHSAAN in numbers
        </h2>
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF.map((stat, index) => (
            <div key={stat.label} data-reveal style={revealDelay(index)} className="stat-rule flex flex-col pt-5">
              <dt className="order-2 mt-3 text-[13px] leading-6 text-ink/65">{stat.label}</dt>
              <dd className="order-1 text-5xl font-extrabold tracking-[-0.045em] text-ink sm:text-7xl">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section labelledBy="benefits-title" className="pt-0 sm:pt-0">
        <SectionHeading id="benefits-title" title="What you get" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMMES.map((programme, index) => (
            <PhotoTile key={programme.slug} photo={programme.photo} index={index}>
              <h3 className="text-3xl font-extrabold tracking-[-0.035em] text-cream sm:text-4xl">{programme.title}</h3>
            </PhotoTile>
          ))}
        </ul>
      </Section>

      <Section labelledBy="steps-title" className="pt-0 sm:pt-0">
        <SectionHeading id="steps-title" title="How it works" />
        <ol className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {STEPS.map((step, index) => (
            <li key={step} data-reveal style={revealDelay(index)} className="stat-rule pt-6">
              <span
                aria-hidden
                className="block text-[7rem] leading-none font-extrabold tracking-[-0.06em] text-ink/15 sm:text-[9rem]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-3xl leading-tight font-extrabold tracking-[-0.035em] text-ink sm:text-4xl">
                {step}
              </h3>
              {index === 0 ? (
                <div className="mt-6">
                  <ButtonLink href={MEMBER_PORTAL_SIGNUP.href} external>
                    {SIGN_UP_LABEL}
                  </ButtonLink>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </Section>

      <GalleryParallax
        action={
          <ButtonLink href={MEMBER_PORTAL_SIGNUP.href} external>
            {SIGN_UP_LABEL}
          </ButtonLink>
        }
      />

      <PhotoBand image="/media/gallery/conference-audience.webp" labelledBy="join-cta-title">
        <h2 id="join-cta-title" className={BAND_TITLE}>
          <span className="block">Ready to start?</span>
        </h2>
        <div className={BAND_ROW}>
          <p className={BAND_INTRO}>Create your account and choose where to begin.</p>
          <div className="flex flex-col items-start gap-4">
            <ButtonLink href={MEMBER_PORTAL_SIGNUP.href} external tone="white">
              {SIGN_UP_LABEL}
            </ButtonLink>
            <a href={PROFESSIONALS_LINK.href} className="text-sm font-medium text-cream/80 underline underline-offset-4">
              Professional or organisation? Start here
            </a>
          </div>
        </div>
      </PhotoBand>
      <StickySignUp />
    </div>
  );
}
