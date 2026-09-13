export type Logo2Data = {
  imgSrc: string;
};
/** A logo. */
export default function Logo2({ d }: { d: Logo2Data }) {
  return (
    <div className="w-10 block relative rounded-[100%] shrink-0 aspect-square after:content-[''] after:block after:absolute after:inset-0 after:w-10 after:h-10 after:rounded-tl-[100%]">
      <div className="w-10 h-full block absolute top-0 rounded-[100%]">
        <img className="w-10 h-10 block rounded-[100%] overflow-clip aspect-[auto_160/160]" data-component="avatar" alt="" height="160" src={d.imgSrc} width="160" />
      </div>
    </div>
  );
}
