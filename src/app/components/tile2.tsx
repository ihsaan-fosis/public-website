export type Tile2Data = {
  description: string;
};
/** A content tile. */
export default function Tile2({ d }: { d: Tile2Data }) {
  return (
    <div className="w-full block relative shrink-0 max-md:hidden">
      <div className="flex relative justify-start items-start content-start gap-2.5 max-md:hidden">
        <div className="w-5 block relative shrink-0 aspect-square bg-background max-md:hidden" style={{ maskImage: "url(\"data:image/svg+xml,<svg display=\\\"block\\\" id=\\\"2091386307\\\" role=\\\"presentation\\\" viewBox=\\\"0 0 20 20\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path d=\\\"M 7.167 12.167 L 13.042 6.292 L 11.875 5.125 L 7.167 9.833 L 4.792 7.458 L 3.625 8.625 Z M 8.333 16.667 C 7.181 16.667 6.097 16.448 5.083 16.01 C 4.069 15.573 3.188 14.979 2.438 14.229 C 1.688 13.479 1.094 12.597 0.656 11.583 C 0.219 10.569 0 9.486 0 8.333 C 0 7.181 0.219 6.097 0.656 5.083 C 1.094 4.069 1.688 3.188 2.438 2.438 C 3.188 1.688 4.069 1.094 5.083 0.656 C 6.097 0.219 7.181 0 8.333 0 C 9.486 0 10.569 0.219 11.583 0.656 C 12.597 1.094 13.479 1.688 14.229 2.438 C 14.979 3.188 15.573 4.069 16.01 5.083 C 16.448 6.097 16.667 7.181 16.667 8.333 C 16.667 9.486 16.448 10.569 16.01 11.583 C 15.573 12.597 14.979 13.479 14.229 14.229 C 13.479 14.979 12.597 15.573 11.583 16.01 C 10.569 16.448 9.486 16.667 8.333 16.667 Z\\\" fill=\\\"var(--otv0lo, var(--token-1dfd736c-b13f-4cf0-98cf-8cb076809793, var(--accent)))\\\" height=\\\"16.666710000000002px\\\" id=\\\"mUuQP6IZ4\\\" transform=\\\"translate(1.667 1.667)\\\" width=\\\"16.66663px\\\"/></svg>\"), none" }} />
        <div className="w-[89.5%] flex relative pt-0.5 justify-center items-center content-center grow shrink-0 basis-0 gap-2.5 max-md:hidden md:max-lg:w-[93%]">
          <div className="w-62.5 flex relative flex-col justify-start grow shrink-0 basis-0 whitespace-pre-wrap [word-break:break-word] [overflow-wrap:break-word] max-md:hidden md:max-lg:w-97.5">
            <p className="block text-background [font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] text-base font-medium leading-4 uppercase [font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11'] max-md:hidden" dir="auto">
              {d.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
