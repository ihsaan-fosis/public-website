import type { MediaCardStyles } from "../_styles";
import { cn } from "../../../lib/utils";
import Counter from "../../components/counter";
export type MediaCardData = {
  title: string;
  title2: string;
  title3: string;
};
/** A card with media + heading. */
export default function MediaCard({ d, styles }: { d: MediaCardData; styles: MediaCardStyles }) {
  return (
    <div className="w-300 h-[27.45rem] flex sticky top-25 z-1 justify-center items-center content-center shrink-0 overflow-clip max-md:w-[20.9375rem] max-md:h-[55.6625rem] max-md:flex-col md:max-lg:w-177 md:max-lg:h-[37.7375rem]">
      <div className={cn("w-[74.5%] flex relative p-10 rounded-[20px] justify-center items-center content-center grow shrink-0 basis-0 gap-10 overflow-clip max-md:w-full max-md:p-5 max-lg:flex-col max-lg:items-start max-lg:content-start max-lg:gap-7.5 max-md:grow-[initial] max-md:basis-[initial] md:max-lg:w-3/5 md:max-lg:p-6", styles.className)}>
        <div className="w-[30.9125rem] flex relative flex-col justify-center items-start content-start grow shrink-0 basis-0 gap-10.5 overflow-clip max-md:w-[18.4375rem] max-md:items-center max-md:content-center max-lg:gap-6 max-lg:grow-[initial] max-lg:basis-[initial] md:max-lg:w-[23.475rem]">
          <div className="flex relative max-w-90 flex-col justify-center items-start content-start shrink-0 gap-3.5 overflow-clip max-md:items-center max-md:content-center max-lg:max-w-none">
            <div className="w-[10.9375rem] block relative shrink-0 overflow-clip aspect-[5.46875/1]">
              <div className="w-[10.9375rem] h-full block absolute top-0">
                <img className="w-full h-8 block overflow-clip object-contain aspect-[auto_176/32]" data-component="image" alt="Logo" height="32" src="/assets/cloned/svg/864afdbe2cc1.svg" width="176" />
              </div>
            </div>
            <div className="contents min-w-0">
              <div className="flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word]">
                <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base leading-[1.625rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-center" dir="auto">
                  Partnership access with student talent, programme visibility, and community impact.
                </p>
              </div>
            </div>
          </div>
          <div className="contents min-w-0">
            <div className="w-full block relative max-w-100 rounded-[10px] shrink-0 overflow-clip aspect-[1.81818/1] max-lg:aspect-[1.8836/1] max-lg:max-w-none">
              <div className="h-full block absolute top-0 inset-x-0 rounded-[10px]">
                <img className="w-full h-55 block rounded-[10px] overflow-clip object-cover aspect-[auto_1200/660] max-md:h-[9.8125rem] md:max-lg:h-[12.4375rem]" data-component="image" alt="Image" height="660" src="/assets/cloned/images/bee07d728783.webp" srcSet="/assets/cloned/images/7ee2942d6394.webp 512w, /assets/cloned/images/5eeb186a6eee.webp 1024w, /assets/cloned/images/bee07d728783.webp 1200w" width="1200" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[34%] flex relative flex-col justify-between items-end content-end self-stretch shrink-0 overflow-clip max-lg:w-full max-lg:justify-center max-md:items-center max-md:content-center max-lg:gap-6 max-lg:[align-self:initial] md:max-lg:items-start md:max-lg:content-start">
          <div className="flex relative flex-col justify-center items-end content-end shrink-0 gap-7.5 overflow-clip max-md:items-center max-md:content-center max-lg:gap-4 md:max-lg:items-start md:max-lg:content-start">
            <div className="w-[17.275rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-md:w-[8.875rem] md:max-lg:w-[12.775rem]">
              <h2 className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-5xl leading-[3.625rem] tracking-[-1.44px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-[1.5625rem] max-md:leading-7.5 max-md:tracking-[-1px] md:max-lg:text-4xl md:max-lg:leading-[2.6875rem]" data-component="heading" dir="auto">
                UK · IE
              </h2>
            </div>
            <div className="flex relative flex-col justify-center items-end content-end shrink-0 gap-3 overflow-clip max-md:items-center max-md:content-center">
              <div className="w-16 flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[0.875rem] font-semibold uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                  Partner path
                </p>
              </div>
              <div className="block relative shrink-0">
                <div className="contents">
                  <h3 className="block opacity-0 [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[2.5rem] leading-12 tracking-[-1.2px] text-center pointer-events-none">
                    {d.title}
                  </h3>
                  <Counter value={d.title} className={cn("h-12 block absolute text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[2.5rem] leading-12 tracking-[-1.2px] text-center", styles.className2)} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex relative flex-col justify-start items-end content-end shrink-0 gap-4 max-md:items-center max-md:content-center md:max-lg:items-start md:max-lg:content-start">
            <div className="contents min-w-0">
              <div className="w-full flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word]">
                <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 text-right uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-center md:max-lg:text-left" dir="auto">
                  UK & Ireland
                </p>
              </div>
            </div>
            <div className="w-[6.9125rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
              <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                IHSAAN, 2026
              </p>
            </div>
          </div>
        </div>
        <div className="w-px h-[27.325rem] block absolute top-px left-[55.6625rem] z-1 min-w-0 shrink-0 max-md:w-[20.8125rem] max-md:h-px max-md:top-[33.675rem] max-md:left-px md:max-lg:h-[37.6125rem] md:max-lg:left-[26.4125rem]">
          <div className="contents">
            <div className="h-[27.325rem] block relative overflow-hidden max-md:h-px md:max-lg:h-[37.6125rem]" aria-label="Dotted divider" role="img">
              <svg className="w-px h-[27.3125rem] block overflow-hidden max-md:w-[20.8125rem] max-md:h-px md:max-lg:h-150.5" data-component="image" aria-hidden="true" height="100%" viewBox="0 0 10 100" width="100%" preserveAspectRatio="none" focusable="false" fill="currentColor">
                <line x1="5" y1="0" x2="5" y2="100" stroke="var(--token-1dfd736c-b13f-4cf0-98cf-8cb076809793, rgb(18, 0, 26))" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 4" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={cn("w-[25.5%] flex relative py-10 px-9 rounded-[20px] flex-col justify-between items-center content-center self-stretch shrink-0 overflow-clip max-md:w-full max-md:p-5 max-md:justify-center max-md:gap-5 max-md:[align-self:initial] md:max-lg:w-2/5 md:max-lg:p-6", styles.className3)}>
        <div className="flex relative flex-col justify-center items-center content-center shrink-0 gap-5 overflow-clip max-md:gap-4">
          <div className="w-48 flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-md:w-[7.5rem] md:max-lg:w-[9.75rem]">
            <h4 className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[2rem] leading-[2.375rem] tracking-[-0.96px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-xl max-md:leading-6 max-md:tracking-[-0.6px] md:max-lg:text-[1.625rem] md:max-lg:leading-[1.9375rem] md:max-lg:tracking-[-0.78px]" data-component="heading" dir="auto">
              Partner path
            </h4>
          </div>
          <div className="flex relative py-[0.5625rem] px-5 rounded-[10px] justify-center items-center content-center shrink-0 gap-5 overflow-clip after:content-[''] after:block after:absolute after:inset-0 after:w-[14.775rem] after:h-[4.35rem] after:rounded-tl-[10px] max-md:after:h-[4.05rem] md:max-lg:after:h-[4.2rem]">
            <div className="flex relative flex-col justify-center items-start content-start shrink-0 gap-0.5">
              <div className="w-[32.5px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base leading-[1.625rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                  Entr.
                </p>
              </div>
              <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className4)}>
                <h6 className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-xl leading-6 tracking-[-0.6px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-base max-md:leading-[1.1875rem] max-md:tracking-[-0.48px] md:max-lg:text-lg md:max-lg:leading-[1.375rem] md:max-lg:tracking-[-0.54px]" data-component="heading" dir="auto">
                  {d.title2}
                </h6>
              </div>
            </div>
            <div className="flex relative flex-col justify-center items-start content-start shrink-0 gap-0.5">
              <div className="w-[31.3px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base leading-[1.625rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                  Sec.
                </p>
              </div>
              <div className={cn("flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap", styles.className5)}>
                <h6 className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-xl leading-6 tracking-[-0.6px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-base max-md:leading-[1.1875rem] max-md:tracking-[-0.48px] md:max-lg:text-lg md:max-lg:leading-[1.375rem] md:max-lg:tracking-[-0.54px]" data-component="heading" dir="auto">
                  {d.title3}
                </h6>
              </div>
            </div>
            <div className="flex relative flex-col justify-center items-start content-start shrink-0 gap-0.5">
              <div className="w-[34.5px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base leading-[1.625rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                  Row.
                </p>
              </div>
              <div className="w-[33.9px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-md:w-[1.6875rem] md:max-lg:w-[30.5px]">
                <h6 className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-xl leading-6 tracking-[-0.6px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-base max-md:leading-[1.1875rem] max-md:tracking-[-0.48px] md:max-lg:text-lg md:max-lg:leading-[1.375rem] md:max-lg:tracking-[-0.54px]" data-component="heading" dir="auto">
                  03
                </h6>
              </div>
            </div>
            <div className="flex relative flex-col justify-center items-start content-start shrink-0 gap-0.5">
              <div className="w-[2.375rem] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base leading-[1.625rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                  Seat.
                </p>
              </div>
              <div className="w-8 flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap max-md:w-[1.6125rem] md:max-lg:w-[1.8125rem]">
                <h6 className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-xl leading-6 tracking-[-0.6px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-base max-md:leading-[1.1875rem] max-md:tracking-[-0.48px] md:max-lg:text-lg md:max-lg:leading-[1.375rem] md:max-lg:tracking-[-0.54px]" data-component="heading" dir="auto">
                  22
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="flex relative pt-5 flex-col justify-center items-center content-center shrink-0 gap-7.5 overflow-clip max-md:gap-6 max-md:pt-0">
          <div className="w-28 block relative shrink-0 overflow-clip aspect-square">
            <div className="w-28 h-full block absolute top-0">
              <img className="w-full h-28 block overflow-clip object-contain aspect-[auto_112/112]" data-component="image" alt="QR Code" height="112" src="/assets/cloned/svg/5bc38c204f88.svg" width="112" />
            </div>
          </div>
          <div className="contents min-w-0">
            <div className="block relative shrink-0">
              <a className="w-[221.3px] h-12.5 flex relative py-[0.9375rem] pr-[0.9375rem] pl-6 rounded-[100px] justify-center items-center content-center gap-8.5 overflow-clip text-primary bg-background cursor-pointer after:content-[''] after:block after:absolute after:inset-0 after:w-[221.3px] after:h-12.5 after:rounded-tl-[100px]" data-component="link" href="https://framer.link/dnCWCme" rel="noopener">
                <div className="w-10 h-10 block absolute top-[0.3125rem] right-[0.3125rem] z-0 min-w-0 rounded-[100px] shrink-0 overflow-clip bg-accent" />
                <div className="w-[128.3px] flex relative flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                  <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-[0.875rem] font-semibold uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                    Get involved
                  </p>
                </div>
                <div className="flex relative flex-col justify-center items-center content-center shrink-0 gap-2.5 overflow-clip">
                  <div className="w-5 block relative shrink-0 aspect-square bg-background" style={{ maskImage: "url(\"data:image/svg+xml,<svg display=\\\"block\\\" role=\\\"presentation\\\" viewBox=\\\"0 0 20 20\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path d=\\\"M 1.167 10.833 L 0 9.667 L 8 1.667 L 0.833 1.667 L 0.833 0 L 10.833 0 L 10.833 10 L 9.167 10 L 9.167 2.833 Z\\\" fill=\\\"var(--otv0lo, var(--token-1dfd736c-b13f-4cf0-98cf-8cb076809793, var(--accent)))\\\" height=\\\"10.83333px\\\" id=\\\"b5vLd0zz_\\\" transform=\\\"translate(4.167 4.167)\\\" width=\\\"10.83337px\\\"/></svg>\"), none" }} />
                  <div className="w-5 h-full block absolute top-6 -left-6 z-1 min-w-0 shrink-0 aspect-square bg-background" style={{ maskImage: "url(\"data:image/svg+xml,<svg display=\\\"block\\\" role=\\\"presentation\\\" viewBox=\\\"0 0 20 20\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path d=\\\"M 1.167 10.833 L 0 9.667 L 8 1.667 L 0.833 1.667 L 0.833 0 L 10.833 0 L 10.833 10 L 9.167 10 L 9.167 2.833 Z\\\" fill=\\\"var(--otv0lo, var(--token-1dfd736c-b13f-4cf0-98cf-8cb076809793, var(--accent)))\\\" height=\\\"10.83333px\\\" id=\\\"b5vLd0zz_\\\" transform=\\\"translate(4.167 4.167)\\\" width=\\\"10.83337px\\\"/></svg>\"), none" }} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
