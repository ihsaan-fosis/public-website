import type { LogoStyles } from "../_styles";
import { cn } from "../../../lib/utils";
export type LogoData = {
  height: string;
  imgSrc: string;
  srcSet: string;
  width: string;
};
/** A logo. */
export default function Logo({ d, styles }: { d: LogoData; styles: LogoStyles }) {
  return (
    <li className="hidden 2xl:list-item 2xl:relative 2xl:shrink-0" aria-hidden="true">
      <div className="hidden 2xl:w-100 2xl:block 2xl:relative 2xl:rounded-[10px] 2xl:shrink-0 2xl:overflow-clip 2xl:aspect-[0.869565/1]">
        <div className="hidden 2xl:w-100 2xl:h-full 2xl:block 2xl:absolute 2xl:top-0 2xl:rounded-[10px]">
          <img className={cn("hidden 2xl:w-full 2xl:h-115 2xl:block 2xl:rounded-[10px] 2xl:overflow-clip 2xl:object-cover", styles.className)} alt="Image" height={d.height} sizes="400px" src={d.imgSrc} srcSet={d.srcSet} width={d.width} />
        </div>
      </div>
    </li>
  );
}
