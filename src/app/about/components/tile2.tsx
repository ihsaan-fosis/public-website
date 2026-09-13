import type { Tile2Styles } from "../_styles";
import { cn } from "../../../lib/utils";
export type Tile2Data = {
  style: string;
  description: string;
};
/** A content tile. */
export default function Tile2({ d, styles }: { d: Tile2Data; styles: Tile2Styles }) {
  return (
    <div className="contents min-w-0">
      <div className="block relative shrink-0">
        <div className="flex relative justify-center items-center content-center gap-2.5">
          <div className="w-6 block relative shrink-0 aspect-square bg-color-003" style={d.style} />
          <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className)}>
            <p className="block text-background [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
              {d.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
