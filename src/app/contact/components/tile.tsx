import type { TileStyles } from "../_styles";
import { cn } from "../../../lib/utils";
export type TileData = {
  href: string;
  description: string;
};
/** A content tile. */
export default function Tile({ d, styles }: { d: TileData; styles: TileStyles }) {
  return (
    <div className={cn("hidden max-lg:block max-lg:relative max-lg:shrink-0", styles.className)}>
      <a className="hidden max-lg:flex max-lg:relative max-lg:justify-center max-lg:items-center max-lg:content-center max-lg:gap-[0.3125rem] max-lg:overflow-clip max-lg:text-primary max-lg:cursor-pointer" href={d.href}>
        <div className="hidden max-lg:w-px max-lg:h-px max-lg:block max-lg:absolute max-lg:bottom-0 max-lg:-left-px max-lg:z-1 max-lg:min-w-0 max-lg:shrink-0 max-lg:bg-color-001" />
        <div className={cn("hidden max-lg:flex max-lg:relative max-lg:flex-col max-lg:justify-start max-lg:shrink-0 max-lg:whitespace-pre max-lg:text-nowrap", styles.className2)}>
          <p className="hidden max-lg:block max-lg:text-background max-lg:[font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] max-lg:text-[0.875rem] max-lg:font-semibold max-lg:uppercase max-lg:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
            {d.description}
          </p>
        </div>
      </a>
    </div>
  );
}
