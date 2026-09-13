import type { Tile8Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type Tile8Data = {
  href: string;
  target?: string;
  description: string;
};
/** A content tile. */
export default function Tile8({ d, styles }: { d: Tile8Data; styles: Tile8Styles }) {
  return (
    <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className)}>
      <p className="block text-background [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base leading-[1.625rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
        <a className="inline cursor-pointer" data-component="link" href={d.href} rel="noopener" target={d.target}>
          {d.description}
        </a>
      </p>
    </div>
  );
}
