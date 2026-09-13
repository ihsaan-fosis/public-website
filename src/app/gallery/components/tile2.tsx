import type { Tile2Styles } from "../_styles";
import { cn } from "../../../lib/utils";
export type Tile2Data = {
  href: string;
  description: string;
};
/** A content tile. */
export default function Tile2({ d, styles }: { d: Tile2Data; styles: Tile2Styles }) {
  return (
    <div className={cn("block relative shrink-0", styles.className)}>
      <a className="h-[1.6rem] flex relative justify-center items-center content-center gap-[0.3125rem] overflow-clip text-primary cursor-pointer" data-component="link" href={d.href} rel="noopener" target="_blank">
        <div className="w-px h-px block absolute bottom-0 -left-px z-1 min-w-0 shrink-0 bg-color-001" />
        <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className2)}>
          <p className="block text-background [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base leading-[1.625rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
            {d.description}
          </p>
        </div>
      </a>
    </div>
  );
}
