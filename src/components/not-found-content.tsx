import { PhotoHero, ButtonLink } from "./ui";

export function NotFoundContent() {
  return (
    <PhotoHero
      image="/media/impact-wide.webp"
      // Next ships the not-found boundary with every page, so its hero must not compete with the real page's LCP.
      lcp={false}
      badge="404"
      title="This page could not be found."
      intro="The link may be out of date, or the page may have moved."
    >
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/contact" tone="light-outline">
          Contact us
        </ButtonLink>
      </div>
    </PhotoHero>
  );
}
