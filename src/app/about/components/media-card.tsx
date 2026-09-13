import type { MediaCardStyles } from "../_styles";
import { cn } from "../../../lib/utils";
export type MediaCardData = {
  title: string;
  description: string;
  height: string;
  imgSrc: string;
  srcSet: string;
};
/** A card with media + heading. */
export default function MediaCard({ d, styles }: { d: MediaCardData; styles: MediaCardStyles }) {
  return (
    <div className="contents min-w-0">
      <div className={cn("w-95 block relative grow shrink-0 basis-0 max-md:w-[20.9375rem] max-lg:grow-[initial] max-lg:basis-[initial] md:max-lg:[align-self:start]", styles.className)}>
        <div className={cn("flex relative p-7.5 rounded-[10px] flex-col items-start content-start overflow-clip max-md:p-5 max-md:gap-8 md:max-lg:p-6", styles.className2)}>
          <div className={cn("w-80 flex relative flex-col justify-center items-start content-start shrink-0 gap-3 overflow-clip max-md:w-[18.4375rem]", styles.className3)}>
            <div className={cn("w-80 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[18.4375rem]", styles.className4)}>
              <h5 className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-2xl leading-[1.8125rem] tracking-[-0.72px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-lg max-md:leading-[1.375rem] max-md:tracking-[-0.54px] md:max-lg:text-[1.1875rem] md:max-lg:leading-[1.4375rem] md:max-lg:tracking-[-0.57px]" data-component="heading" dir="auto">
                {d.title}
              </h5>
            </div>
            <div className={cn("w-80 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[18.4375rem]", styles.className5)}>
              <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base leading-[1.625rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                {d.description}
              </p>
            </div>
          </div>
          <div className="w-full block relative rounded-md shrink-0 overflow-clip aspect-[1.6/1]">
            <div className="h-full block absolute top-0 inset-x-0 rounded-md">
              <img className={cn("w-full h-50 block rounded-md overflow-clip object-cover", styles.className6)} data-component="image" alt="Image" height={d.height} sizes="calc(max((min(max(100vw - 60px, 1px), 1200px) - 60px) / 3, 1px) - 60px)" src={d.imgSrc} srcSet={d.srcSet} width="960" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
