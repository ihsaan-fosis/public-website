import type { FeatureCardStyles } from "../_styles";
import { cn } from "../../../lib/utils";
import Counter from "../../components/counter";
export type FeatureCardData = {
  title: string;
  description: string;
};
/** A feature card. */
export default function FeatureCard({ d, styles }: { d: FeatureCardData; styles: FeatureCardStyles }) {
  return (
    <div className="contents min-w-0">
      <div className={cn("block relative shrink-0 md:max-lg:w-[209.3px] md:max-lg:flex-1", styles.className)}>
        <div className="flex relative flex-col justify-center items-start content-start gap-3.5 overflow-clip max-md:items-center max-md:content-center max-md:gap-3">
          <div className="flex relative justify-center items-center content-center shrink-0">
            <div className="block relative shrink-0">
              <h3 className="block opacity-0 [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[4rem] leading-[4.8125rem] tracking-[-1.92px] text-center pointer-events-none">
                {d.title}
              </h3>
              <Counter value={d.title} className="h-full block absolute top-0 inset-x-0 text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[4rem] leading-[4.8125rem] tracking-[-1.92px] text-center max-md:text-[2.125rem] max-md:leading-[2.5625rem] max-md:tracking-[-1.02px] md:max-lg:text-5xl md:max-lg:leading-[3.625rem] md:max-lg:tracking-[-1.44px]" />
            </div>
            <div className="w-[35.3px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-md:w-[1.175rem] md:max-lg:w-[26.5px]">
              <h1 className="block text-color-001 [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[4rem] leading-[4.8125rem] tracking-[-1.92px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-[2.125rem] max-md:leading-[2.5625rem] max-md:tracking-[-1.02px] md:max-lg:text-5xl md:max-lg:leading-[3.625rem] md:max-lg:tracking-[-1.44px]" data-component="heading" dir="auto">
                +
              </h1>
            </div>
          </div>
          <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className2)}>
            <p className="block text-muted [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
              {d.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
