import type { Tile2Styles } from "../_styles";
import { cn } from "../../../lib/utils";
export type Tile2Data = {
  description: string;
  name: string;
  placeholder: string;
  type: string;
};
/** A content tile. */
export default function Tile2({ d, styles }: { d: Tile2Data; styles: Tile2Styles }) {
  return (
    <label className={cn("w-full flex relative flex-col justify-start items-start content-start [align-self:start] shrink-0 gap-4.5 cursor-default", styles.className)}>
      <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className2)}>
        <p className="block text-background [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
          {d.description}
        </p>
      </div>
      <div className="w-full flex relative py-3 px-5 rounded-sm items-center shrink-0 overflow-hidden after:content-[''] after:block after:absolute after:inset-0 after:h-[3.1rem] after:rounded-tl-sm">
        <input className="w-full h-6.5 block min-w-0 flex-1 overflow-clip text-background [font-family:'Poppins'] text-base leading-[1.625rem] whitespace-nowrap text-nowrap cursor-text" data-component="input" name={d.name} placeholder={d.placeholder} type={d.type} value="" />
      </div>
    </label>
  );
}
