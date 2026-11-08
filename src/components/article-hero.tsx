import { CoverImage } from "@/components/blog-cover";
import type { BlogCover } from "@/lib/blog-catalog";

/** The article's opening frame. `CoverImage` picks the optimiser or a plain `<img>` by host. */
export function ArticleHero({
  cover,
  remote,
  title,
  intro,
}: {
  cover: BlogCover;
  remote: boolean;
  title: string;
  intro?: string;
}) {
  return (
    <section id="hero" className="p-2 sm:p-3">
      <div className="hero-frame relative isolate flex min-h-[64svh] overflow-hidden rounded-[28px] bg-night-2">
        <div className="hero-media absolute inset-0 -z-20">
          <CoverImage cover={cover} remote={remote} sizes="100vw" eager className="object-cover" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,22,41,0.55)_0%,rgba(6,22,41,0.6)_40%,rgba(6,22,41,0.92)_100%)]"
        />
        <div className="hero-copy flex w-full flex-col justify-end px-5 pt-16 pb-8 sm:px-10 sm:pt-20 sm:pb-10 lg:px-12 lg:pb-12">
          <h1 className="hero-title-editorial hero-title-photo leading-[1.08] font-extrabold tracking-[-0.03em] text-cream lg:max-w-6xl lg:text-balance">
            {title}
          </h1>
          {intro ? (
            <div className="mt-4 flex animate-rise flex-col items-start gap-4 sm:mt-8 sm:gap-6 lg:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <p className="max-w-sm text-sm leading-5 text-cream/70 sm:leading-6 lg:max-w-xl lg:text-[17px] lg:leading-7">
                {intro}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
