import type { FeatureCard2Styles } from "../_styles";
import { cn } from "../../lib/utils";
import Counter from "./counter";
export type FeatureCard2Data = {
  title: string;
  description: string;
};
/** A feature card. */
export default function FeatureCard2({ d, styles }: { d: FeatureCard2Data; styles: FeatureCard2Styles }) {
  return (
    <div className={cn("w-full flex relative flex-col justify-center items-center content-center shrink-0 gap-2.5 overflow-clip", styles.className)}>
      <div className="contents min-w-0">
        <div className="w-full block relative shrink-0">
          <div className="flex relative flex-col justify-center items-start content-start gap-3.5 overflow-clip max-md:gap-3">
            <div className="flex relative justify-center items-center content-center shrink-0">
              <div className="block relative shrink-0">
                <h3 className="block opacity-0 [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[2.5rem] leading-12 tracking-[-1.2px] text-center pointer-events-none">
                  {d.title}
                </h3>
                <Counter value={d.title} className="h-full block absolute top-0 inset-x-0 text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[2.5rem] leading-12 tracking-[-1.2px] text-center max-md:text-2xl max-md:leading-[1.8125rem] max-md:tracking-[-0.72px] md:max-lg:text-[1.75rem] md:max-lg:leading-[2.125rem] md:max-lg:tracking-[-0.84px]" />
              </div>
              <div className="w-[1.375rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-md:w-[13.3px] md:max-lg:w-[15.5px]">
                <h3 className="block text-color-002 [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[2.5rem] leading-12 tracking-[-1.2px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-2xl max-md:leading-[1.8125rem] max-md:tracking-[-0.72px] md:max-lg:text-[1.75rem] md:max-lg:leading-[2.125rem] md:max-lg:tracking-[-0.84px]" data-component="heading" dir="auto">
                  +
                </h3>
              </div>
            </div>
            <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className2)}>
              <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                {d.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
