export type LogoData = {
  imgSrc: string;
  srcSet: string;
};
/** A logo. */
export default function Logo({ d }: { d: LogoData }) {
  return (
    <div className="contents min-w-0">
      <div className="w-full block relative rounded-[10px] [align-self:start] shrink-0 overflow-clip aspect-[0.95/1] max-md:[align-self:initial]">
        <div className="h-full block absolute top-0 inset-x-0 rounded-[10px]">
          <img className="w-full h-150 block rounded-[10px] overflow-clip object-cover aspect-[auto_1710/1800] max-md:h-[22.0625rem] md:max-lg:h-90" data-component="image" alt="Gallery" height="1800" sizes="max((min(max(100vw - 60px, 1px), 1200px) - 60px) / 2, 50px)" src={d.imgSrc} srcSet={d.srcSet} width="1710" />
        </div>
      </div>
    </div>
  );
}
