export type Tile3Data = {
  description: string;
};
/** Mobile feature row for the student path card. */
export default function Tile3({ d }: { d: Tile3Data }) {
  return (
    <div className="hidden max-md:w-full max-md:block max-md:relative max-md:shrink-0">
      <div className="hidden max-md:w-[18.4375rem] max-md:flex max-md:relative max-md:justify-start max-md:items-start max-md:content-start max-md:gap-2.5">
        <div
          className="hidden max-md:w-5 max-md:block max-md:relative max-md:shrink-0 max-md:aspect-square max-md:bg-background"
          style={{
            maskImage:
              "url(\"data:image/svg+xml,<svg display=\\\"block\\\" role=\\\"presentation\\\" viewBox=\\\"0 0 20 20\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path d=\\\"M 7.167 12.167 L 13.042 6.292 L 11.875 5.125 L 7.167 9.833 L 4.792 7.458 L 3.625 8.625 Z M 8.333 16.667 C 7.181 16.667 6.097 16.448 5.083 16.01 C 4.069 15.573 3.188 14.979 2.438 14.229 C 1.688 13.479 1.094 12.597 0.656 11.583 C 0.219 10.569 0 9.486 0 8.333 C 0 7.181 0.219 6.097 0.656 5.083 C 1.094 4.069 1.688 3.188 2.438 2.438 C 3.188 1.688 4.069 1.094 5.083 0.656 C 6.097 0.219 7.181 0 8.333 0 C 9.486 0 10.569 0.219 11.583 0.656 C 12.597 1.094 13.479 1.688 14.229 2.438 C 14.979 3.188 15.573 4.069 16.01 5.083 C 16.448 6.097 16.667 7.181 16.667 8.333 C 16.667 9.486 16.448 10.569 16.01 11.583 C 15.573 12.597 14.979 13.479 14.229 14.229 C 13.479 14.979 12.597 15.573 11.583 16.01 C 10.569 16.448 9.486 16.667 8.333 16.667 Z\\\" fill=\\\"black\\\" height=\\\"16.66671px\\\" width=\\\"16.66663px\\\" transform=\\\"translate(1.667 1.667)\\\"/></svg>\"), none",
          }}
        />
        <div className="hidden max-md:w-[16.5625rem] max-md:flex max-md:relative max-md:pt-0.5 max-md:justify-center max-md:items-center max-md:content-center max-md:grow max-md:shrink-0 max-md:basis-0 max-md:gap-2.5">
          <div className="hidden max-md:w-[16.5625rem] max-md:flex max-md:relative max-md:flex-col max-md:justify-start max-md:grow max-md:shrink-0 max-md:basis-0 max-md:whitespace-pre-wrap max-md:[word-break:break-word] max-md:[overflow-wrap:break-word]">
            <p className="hidden max-md:block max-md:text-background max-md:[font-family:'Poppins',_'Poppins_Placeholder',_sans-serif] max-md:text-base max-md:font-medium max-md:leading-4 max-md:uppercase max-md:[font-feature-settings:'blwf',_'cv03',_'cv04',_'cv09',_'cv11']" dir="auto">
              {d.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
