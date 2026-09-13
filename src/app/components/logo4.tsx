import type { Logo4Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type Logo4Data = {
  height: string;
  imgSrc: string;
  width: string;
};
/** A logo. */
export default function Logo4({ d, styles }: { d: Logo4Data; styles: Logo4Styles }) {
  return (
    <div className="contents min-w-0">
      <div className={cn("w-73 block relative max-w-73 grow shrink-0 basis-0 max-md:w-[20.9375rem] max-lg:max-w-none max-lg:grow-[initial] max-lg:basis-[initial] md:max-lg:w-[21.8125rem] md:max-lg:[align-self:start]", styles.className)}>
        <div className={cn("flex relative max-w-full py-12.5 px-8 rounded-[10px] justify-center items-center content-center gap-2.5 overflow-clip max-lg:py-8 max-lg:max-w-none", styles.className2)}>
          <div className={cn("block relative shrink-0 overflow-clip", styles.className3)}>
            <div className={cn("h-full block absolute top-0", styles.className4)}>
              <img className={cn("w-full block overflow-clip object-contain", styles.className5)} data-component="image" alt="Logo" height={d.height} src={d.imgSrc} width={d.width} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
