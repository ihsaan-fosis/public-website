import type { ReactNode } from "react";
import type { Motif } from "@/content/site";
import { cn } from "@/lib/utils";

// Motif art is ported from the member platform (src/components/member/panels.tsx)
// so cards read the same on both sites. Shadows are dropped per IHSAAN-DESIGN.md.

function FullBleedArt({ viewBox, children }: { viewBox: string; children: ReactNode }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </div>
  );
}

function DesignAArt() {
  return (
    <FullBleedArt viewBox="0 0 1010 660">
      <path d="M 1010 65 L 1010 190 L 580 660 L 515 660 Z" fill="#E1D7EB" />
      <path d="M 1010 190 L 1010 340 L 790 560 L 715 485 Z" fill="#8F74A8" />
      <path d="M 940 410 L 1000 470 L 810 660 L 660 660 Z" fill="#D3C5DF" />
      <path d="M 1010 515 L 1010 630 L 980 660 L 865 660 Z" fill="#8F74A8" />
    </FullBleedArt>
  );
}

function DesignBArt() {
  return (
    <FullBleedArt viewBox="0 0 865 405">
      <path d="M 865 0 L 865 145 L 480 405 L 390 405 Z" fill="#F4EFF9" />
      <path d="M 670 250 L 730 310 L 630 405 L 520 405 Z" fill="#9479AD" />
      <path d="M 865 145 L 865 190 L 695 360 L 670 335 Z" fill="#B5A7C6" />
      <path d="M 865 265 L 865 305 L 765 405 L 695 405 Z" fill="#9479AD" />
      <path d="M 830 290 L 850 310 L 755 405 L 720 405 Z" fill="#C4B9D1" />
    </FullBleedArt>
  );
}

function DesignCArt() {
  return (
    <FullBleedArt viewBox="0 0 1550 600">
      <path d="M 0 460 L 950 600 L 0 600 Z" fill="#D6E5F7" />
      <path d="M 1550 275 L 1550 600 L 945 600 Z" fill="#7CA9E9" />
    </FullBleedArt>
  );
}

const MOTIFS: Record<Motif, { shell: string; art: () => ReactNode }> = {
  a: { shell: "bg-ihsaan-purple text-white", art: DesignAArt },
  b: { shell: "border border-ihsaan-purple/25 bg-white text-black", art: DesignBArt },
  c: { shell: "border-[3px] border-[#D8E6F8] bg-ihsaan-sky text-white", art: DesignCArt },
};

export function Panel({
  motif,
  children,
  className,
  art = true,
}: {
  motif: Motif;
  children: ReactNode;
  className?: string;
  art?: boolean;
}) {
  const { shell, art: Art } = MOTIFS[motif];
  return (
    <div className={cn("relative isolate overflow-hidden rounded-2xl", shell, className)}>
      {art ? <Art /> : null}
      <div className="relative flex h-full flex-col p-7 sm:p-8">{children}</div>
    </div>
  );
}

export function isDarkMotif(motif: Motif) {
  return motif !== "b";
}
