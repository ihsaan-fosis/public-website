import type { FeatureCardStyles } from "../_styles";
import { cn } from "../../../lib/utils";
export type FeatureCardData = {
  description: string;
  title: string;
};
/** A feature card. */
export default function FeatureCard({ d, styles }: { d: FeatureCardData; styles: FeatureCardStyles }) {
  return (
    <div className="flex relative flex-col justify-center items-start content-start shrink-0 gap-0.5">
      <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className)}>
        <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base leading-[1.625rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
          {d.description}
        </p>
      </div>
      <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className2)}>
        <h6 className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-xl leading-6 tracking-[-0.6px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-base max-md:leading-[1.1875rem] max-md:tracking-[-0.48px] md:max-lg:text-lg md:max-lg:leading-[1.375rem] md:max-lg:tracking-[-0.54px]" data-component="heading" dir="auto">
          {d.title}
        </h6>
      </div>
    </div>
  );
}
