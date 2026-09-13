"use client";

import { useState } from "react";
import { cn } from "../../lib/utils";

export type FaqItem = {
  question: string;
  answer?: string;
};

/** Captured state glyphs: a plus while closed, a minus while open. */
const PLUS_ICON =
  "url(\"data:image/svg+xml,<svg display=\\\"block\\\" id=\\\"3702657386\\\" role=\\\"presentation\\\" viewBox=\\\"0 0 20 20\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path d=\\\"M 5 6.667 L 0 6.667 L 0 5 L 5 5 L 5 0 L 6.667 0 L 6.667 5 L 11.667 5 L 11.667 6.667 L 6.667 6.667 L 6.667 11.667 L 5 11.667 Z\\\" fill=\\\"var(--otv0lo, var(--token-1dfd736c-b13f-4cf0-98cf-8cb076809793, var(--accent)))\\\" height=\\\"11.666666666666668px\\\" id=\\\"phDK3zlCH\\\" transform=\\\"translate(4.167 4.167)\\\" width=\\\"11.666666666666668px\\\"/></svg>\"), none";
const MINUS_ICON =
  "url(\"data:image/svg+xml,<svg display=\\\"block\\\" id=\\\"3310691654\\\" role=\\\"presentation\\\" viewBox=\\\"0 0 20 20\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path d=\\\"M 0 1.667 L 0 0 L 10 0 L 10 1.667 Z\\\" fill=\\\"var(--otv0lo, var(--token-1dfd736c-b13f-4cf0-98cf-8cb076809793, var(--accent)))\\\" height=\\\"1.666666666666666px\\\" id=\\\"OqUjjrRgF\\\" transform=\\\"translate(5 9.167)\\\" width=\\\"10px\\\"/></svg>\"), none";

/**
 * FAQ disclosure list. The capture froze the first row open and the rest shut
 * with no behaviour attached, so the accordion is rebuilt here: one row open at
 * a time, like the source.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <>
      {items.map((item, i) => {
        const isOpen = i === open;
        const panelId = `faq-panel-${i}`;

        return (
          <div key={panelId} className="w-full block relative shrink-0">
            <div
              className="flex relative py-[1.4375rem] pr-5 pl-[1.4375rem] rounded-[10px] flex-col justify-center items-start content-start overflow-clip cursor-pointer after:content-[''] after:block after:absolute after:inset-0 after:rounded-[10px] after:border after:border-clr-7"
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <div className="w-full flex relative justify-center items-start content-start shrink-0 gap-5">
                <div className="w-120.5 flex relative flex-col justify-start grow shrink-0 basis-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:w-62 md:max-lg:w-[34.5625rem]">
                  <h6
                    className="block text-accent [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-xl leading-6 tracking-[-0.6px] text-left uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:text-base max-md:leading-[1.1875rem] max-md:tracking-[-0.48px] md:max-lg:text-lg md:max-lg:leading-[1.375rem] md:max-lg:tracking-[-0.54px]"
                    data-component="heading"
                    dir="auto"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={item.answer ? panelId : undefined}
                      className="cursor-pointer uppercase"
                    >
                      {item.question}
                    </button>
                  </h6>
                </div>
                <div
                  className={cn(
                    "w-6 block relative shrink-0 aspect-square bg-accent transition-transform duration-300",
                    isOpen ? "rotate-0" : "rotate-90",
                  )}
                  style={{ maskImage: isOpen ? MINUS_ICON : PLUS_ICON }}
                />
              </div>
              {item.answer ? (
                <div
                  id={panelId}
                  className={cn(
                    "w-full grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="w-full max-w-126.5 flex relative flex-col justify-start shrink-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] pt-3.5">
                      <p
                        className="block text-muted [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base leading-[1.625rem] [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']"
                        dir="auto"
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
}
