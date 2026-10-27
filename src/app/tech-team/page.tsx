import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections";
import { PhotoHero, revealDelay, Section, SectionHeading } from "@/components/ui";
import { TECH_TEAM, type TechTeamMember } from "@/content/tech-team";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "IHSAAN Tech Team",
  description:
    "Meet the IHSAAN Tech Team - the people who build and maintain the public site and digital products.",
  path: "/tech-team",
  socialDescription: "Meet the people who build IHSAAN's digital products.",
});

const nameClass =
  "text-[2.75rem] leading-[1.05] font-extrabold tracking-[-0.035em] text-ink sm:text-7xl lg:text-[5.5rem]";

function MemberName({ member }: { member: TechTeamMember }) {
  if (member.href) {
    return (
      <a
        href={member.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <h3
          className={cn(
            nameClass,
            "underline decoration-ink/25 decoration-[3px] underline-offset-[0.14em] transition-colors duration-300 group-hover:text-ihsaan-purple group-hover:decoration-current dark:group-hover:text-ihsaan-lavender",
          )}
        >
          {member.name}
        </h3>
        <span
          aria-hidden
          className="rounded-full px-3 py-1.5 text-[11px] font-bold tracking-[0.18em] text-ink uppercase ring-1 ring-ink/25 transition-colors duration-300 group-hover:bg-ink group-hover:text-page"
        >
          Website
        </span>
      </a>
    );
  }

  return <h3 className={nameClass}>{member.name}</h3>;
}

export default function TechTeamPage() {
  return (
    <>
      <PhotoHero
        image="/media/gallery/hackathon-laptop.webp"
        title="IHSAAN Tech Team."
        intro="The people who design, build and look after IHSAAN's websites and digital tools."
      />

      <Section labelledBy="tech-team-title">
        <SectionHeading id="tech-team-title" title="The builders" />
        <ul className="mt-12 flex flex-wrap gap-x-12 gap-y-4 sm:gap-y-6">
          {TECH_TEAM.map((member, index) => (
            <li key={member.name} data-reveal style={revealDelay(index % 5)}>
              <MemberName member={member} />
            </li>
          ))}
        </ul>
      </Section>

      <ClosingCta />
    </>
  );
}
