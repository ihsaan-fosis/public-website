import type { Logo5Styles } from "../_styles";
import { cn } from "../../lib/utils";
export type Logo5Data = {
  height: string;
  imgSrc: string;
  width: string;
};
/** A logo. */
export default function Logo5({ d, styles }: { d: Logo5Data; styles: Logo5Styles }) {
  return (
    <div className="contents min-w-0">
      <div className="w-73 block relative max-w-73 grow shrink-0 basis-0 max-md:w-[20.9375rem] max-lg:max-w-none max-md:grow-[initial] max-md:basis-[initial] md:max-lg:w-[229.3px]">
        <div className={cn("flex relative max-w-full py-12.5 px-8 rounded-[10px] justify-center items-center content-center gap-2.5 overflow-clip max-lg:py-8 max-lg:max-w-none", styles.className)}>
          <div className={cn("h-10 block relative shrink-0 overflow-clip max-lg:h-[2.1875rem]", styles.className2)}>
            <div className="h-full block absolute top-0 inset-x-0">
              <img className={cn("w-full h-10 block overflow-clip object-contain max-lg:h-[2.1875rem]", styles.className3)} data-component="image" alt="Logo" height={d.height} src={d.imgSrc} width={d.width} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
