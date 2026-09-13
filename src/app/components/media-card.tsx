export type MediaCardData = {
  imgSrc: string;
  description: string;
  title: string;
};
/** A card with media + heading. */
export default function MediaCard({ d }: { d: MediaCardData }) {
  return (
    <div className="contents min-w-0">
      <div className="w-full h-109 block relative [align-self:start] shrink-0 max-md:h-[25.8125rem] max-md:[align-self:initial] md:max-lg:h-[392.3px]">
        <div className="h-full flex relative rounded-[10px] flex-col justify-end items-center content-center gap-4.5 overflow-clip cursor-pointer max-lg:[cursor:inherit]">
          <div className="w-full block relative z-0 shrink-0 overflow-clip aspect-[1.05405/1]">
            <div className="h-full block absolute top-0 inset-x-0">
              <img className="w-full h-92.5 block overflow-clip object-cover aspect-[auto_396/400] max-md:h-79.5 md:max-lg:h-[20.5625rem]" data-component="image" alt="Programmes Image" height="400" src={d.imgSrc} width="396" />
            </div>
          </div>
          <div className="w-97.5 flex relative z-1 flex-col justify-start items-start content-start shrink-0 gap-2 max-md:w-[20.9375rem] md:max-lg:w-[346.5px]">
            <div className="w-97.5 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[20.9375rem] md:max-lg:w-[346.5px]">
              <p className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                {d.description}
              </p>
            </div>
            <div className="w-97.5 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-[20.9375rem] md:max-lg:w-[346.5px]">
              <h6 className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-xl leading-6 tracking-[-0.6px] uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-base max-md:leading-[1.1875rem] max-md:tracking-[-0.48px] md:max-lg:text-lg md:max-lg:leading-[1.375rem] md:max-lg:tracking-[-0.54px]" data-component="heading" dir="auto">
                {d.title}
              </h6>
            </div>
          </div>
          <div className="h-4 min-h-4 flex absolute top-7.5 inset-x-7.5 min-w-0 justify-start items-center content-center shrink-0 gap-2.5 overflow-clip max-lg:top-6 max-lg:inset-x-6">
            <div className="w-[5.25rem] h-full flex absolute top-10 z-1 opacity-0 min-w-0 justify-center items-center content-center shrink-0 gap-[0.1875rem] max-lg:top-0 max-lg:opacity-[initial]">
              <div className="w-[1.5375rem] flex relative z-1 flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                <p className="block text-background [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                  <a className="inline max-lg:cursor-pointer" data-component="link" href="https://facebook.com/" rel="noopener" target="_blank">
                    {"FB "}
                  </a>
                </p>
              </div>
              <div className="w-[6.5px] flex relative z-1 flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                <p className="block text-background [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                  /
                </p>
              </div>
              <div className="w-[13.3px] flex relative z-1 flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                <p className="block text-background [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                  <a className="inline max-lg:cursor-pointer" data-component="link" href="https://linkedin.com/" rel="noopener" target="_blank">
                    LI
                  </a>
                </p>
              </div>
              <div className="w-[6.5px] flex relative z-1 flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                <p className="block text-background [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                  /
                </p>
              </div>
              <div className="w-[21.1px] flex relative z-1 flex-col justify-start shrink-0 whitespace-pre text-nowrap">
                <p className="block text-background [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
                  <a className="inline max-lg:cursor-pointer" data-component="link" href="https://youtube.com/" rel="noopener" target="_blank">
                    YT
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
