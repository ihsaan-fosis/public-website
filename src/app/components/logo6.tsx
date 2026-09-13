import type { Logo6Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type Logo6Data = {
  height: string;
  imgSrc: string;
  width: string;
};
/** A logo. */
export default function Logo6({ d, styles }: { d: Logo6Data; styles: Logo6Styles }) {
  return (
    <div className="contents min-w-0">
      <div className={cn("w-73 block relative max-w-73 grow shrink-0 basis-0 max-md:w-[20.9375rem] max-lg:max-w-none max-md:grow-[initial] max-md:basis-[initial] md:max-lg:w-[229.3px]", styles.className)}>
        <div className={cn("flex relative max-w-full py-12.5 px-8 rounded-[10px] justify-center items-center content-center gap-2.5 overflow-clip max-lg:py-8 max-lg:max-w-none", styles.className2)}>
          <div className={cn("block relative shrink-0 overflow-clip", styles.className3)}>
            <div className="h-full block absolute top-0 inset-x-0">
              <img className={cn("w-full block overflow-clip object-contain", styles.className4)} data-component="image" alt="Logo" height={d.height} src={d.imgSrc} width={d.width} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
