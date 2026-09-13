import type { LogoStyles } from "../_styles";
import { cn } from "../../../lib/utils";
export type LogoData = {
  imgSrc: string;
};
/** A logo. */
export default function Logo({ d, styles }: { d: LogoData; styles: LogoStyles }) {
  return (
    <div className={cn("box-content w-64 h-64 block absolute", styles.className)}>
      <img className="box-content w-64 h-64 inline overflow-clip" data-component="image" alt="" role="presentation" src={d.imgSrc} />
    </div>
  );
}
