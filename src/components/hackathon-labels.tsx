import type { ReactNode } from "react";

export const CODE_LABEL = "font-mono text-[11px] font-bold tracking-[0.08em] text-ink/65";

const KEYWORD = "text-ihsaan-blue dark:text-ihsaan-light-blue";

/** "Past events" becomes `past_events`, the way a Python function would be named. */
function snakeCase(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

/**
 * A section title written as a Python function, with its description printed in the body:
 *
 *     def hackathons():
 *         print("A hackathon is ...")
 *
 * The heading keeps the plain title as its accessible name, so the code styling is decoration only.
 */
export function PyHeading({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  /** The description, shown as a `print` call in the function body. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2
        id={id}
        aria-label={title}
        className="font-mono text-[clamp(1.1rem,4.2vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.03em] break-words text-ink"
      >
        <span aria-hidden>
          <span className={KEYWORD}>def </span>
          {snakeCase(title)}
          <span className="text-ink/45">()</span>:
        </span>
      </h2>
      {children ? (
        <div className="mt-5 max-w-xl space-y-4 border-l border-ink/15 pl-5 font-mono text-[13px] leading-6 text-ink/70 sm:pl-6">
          <p>
            <span aria-hidden className={KEYWORD}>
              print
            </span>
            <span aria-hidden className="text-ink/45">
              (
            </span>
            <span aria-hidden>&quot;</span>
            {children}
            <span aria-hidden>&quot;</span>
            <span aria-hidden className="text-ink/45">
              )
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
