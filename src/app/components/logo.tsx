import type { LogoStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type LogoData = {
  ariaposinset: string;
  style: string;
  height: string;
  imgSrc: string;
  srcSet: string;
  width: string;
  height2: string;
  imgSrc2: string;
  srcSet2: string;
  width2: string;
};
/** A logo. */
export default function Logo({ d, styles, "aria-hidden": ariaHidden }: { d: LogoData; styles: LogoStyles; "aria-hidden"?: boolean }) {
  return (
    <li className="list-item relative shrink-0" aria-hidden={ariaHidden ?? "false"} aria-posinset={d.ariaposinset} aria-setsize="5">
      <div className="flex relative z-0 rounded-2xl justify-center items-center content-center shrink-0 gap-2.5 overflow-clip aspect-square" style={d.style}>
        <div className="contents min-w-0 max-md:w-40 max-md:h-40 max-md:block max-md:relative max-md:z-1 max-md:grow max-md:shrink-0 max-md:basis-0 max-md:gap-2.5 max-md:overflow-clip">
          <div className="w-[26.9375rem] h-[26.9375rem] block relative inset-0 z-1 grow shrink-0 basis-0 gap-2.5 overflow-clip max-md:w-40 max-md:h-40 max-md:absolute max-md:right-auto max-md:bottom-auto max-md:z-[initial] max-md:grow-[initial] max-md:shrink-[initial] max-md:basis-[initial] max-md:gap-[initial] max-md:[overflow-x:initial] max-md:[overflow-y:initial] md:max-lg:w-70 md:max-lg:h-70">
            <img className={cn("hidden max-md:w-full max-md:h-40 max-md:block max-md:overflow-clip max-md:object-cover", styles.className)} alt={"Image\n"} height={d.height} sizes="160px" src={d.imgSrc} srcSet={d.srcSet} width={d.width} />
            <div className="h-full block absolute top-0 inset-x-0 max-md:hidden">
              <img className={cn("w-full h-[26.9375rem] block overflow-clip object-cover max-md:hidden md:max-lg:h-70", styles.className2)} data-component="image" alt={"Image\n"} height={d.height2} sizes="431px" src={d.imgSrc2} srcSet={d.srcSet2} width={d.width2} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
