import { ButtonLink, PhotoFrame } from "@/components/ui";
import type { InvolvementAction } from "@/content/site";

export function InvolvementActions({
  actions,
  photo,
}: {
  actions: readonly InvolvementAction[];
  photo: { src: string; alt: string };
}) {
  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
      <PhotoFrame src={photo.src} alt={photo.alt} sticky />
      <ul className="border-t border-ink/10">
        {actions.map((action, index) => (
          <li
            key={action.id}
            id={action.id}
            className="flex scroll-mt-24 items-baseline gap-6 border-b border-ink/10 py-8"
          >
            <span aria-hidden className="w-6 shrink-0 text-xs text-ink/45">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-2xl leading-tight font-medium tracking-[-0.03em] text-ink sm:text-3xl">
                {action.title}
              </h3>
              <p className="mt-3 max-w-lg text-[15px] leading-7 text-ink/70">{action.body}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={action.cta.href} external={action.cta.external} className="py-3 text-center">
                  {action.cta.label}
                </ButtonLink>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
