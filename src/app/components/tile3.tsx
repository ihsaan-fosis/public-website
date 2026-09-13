export type Tile3Data = {
  description: string;
};
/** A content tile. */
export default function Tile3({ d }: { d: Tile3Data }) {
  return (
    <div className="hidden max-md:w-full max-md:block max-md:relative max-md:shrink-0">
      <div className="hidden max-md:w-[18.4375rem] max-md:flex max-md:relative max-md:justify-start max-md:items-start max-md:content-start max-md:gap-2.5">
        <div className="hidden max-md:w-5 max-md:block max-md:relative max-md:shrink-0 max-md:aspect-square max-md:bg-background" />
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
