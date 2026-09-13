import type { FeatureCardStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type FeatureCardData = {
  title: string;
};
/** A feature card. */
export default function FeatureCard({ d, styles }: { d: FeatureCardData; styles: FeatureCardStyles }) {
  return (
    <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className)}>
      <h1 className="block text-background font-extrabold [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[6.25rem] leading-27.5 tracking-[-3px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-[2.5rem] max-md:leading-11 max-md:tracking-[-2.4px] md:max-lg:text-6xl md:max-lg:leading-16.5 md:max-lg:tracking-[-1.8px]" data-component="heading" dir="auto">
        {d.title}
      </h1>
    </div>
  );
}
