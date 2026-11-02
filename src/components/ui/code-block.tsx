import * as React from "react"
import { cn } from "@/lib/utils"

type CodeTone = "keyword" | "string" | "comment" | "plain" | "caret"

/** One highlighted run of text. Tokens are plain data, so no HTML is injected. */
export type CodeToken = { text: string; tone?: CodeTone }

const TONES: Record<CodeTone, string> = {
  keyword: "font-bold text-cream",
  string: "text-cream",
  comment: "text-cream/60",
  plain: "text-cream/80",
  caret: "",
}

function CodeBlock({
  filename,
  language,
  lines,
  activeLines,
  lineNumbers = true,
  className,
}: {
  filename: string
  language: string
  lines: readonly (readonly CodeToken[])[]
  /** Zero-based line numbers to highlight, such as the line a scroll step refers to. */
  activeLines?: readonly number[]
  /** Off for terminal output, where lines have no numbers. */
  lineNumbers?: boolean
  className?: string
}) {
  return (
    <figure
      data-slot="code-block"
      className={cn("overflow-hidden rounded-[22px] bg-night-2 text-cream", className)}
    >
      <figcaption className="flex items-center justify-between gap-4 border-b border-cream/10 px-5 py-3 font-mono text-[11px] font-bold tracking-[0.08em]">
        <span className="text-cream/80">{filename}</span>
        <span className="text-cream/60">{language}</span>
      </figcaption>
      {/* Focusable so keyboard users can scroll a long line inside the block. */}
      <pre tabIndex={0} className="overflow-x-auto py-5 font-mono text-[13px] leading-7 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cream">
        <code className="grid min-w-max">
          {lines.map((line, index) => (
            <span
              key={index}
              data-active={activeLines?.includes(index) || undefined}
              className="code-line flex border-l-2 border-transparent px-[18px] transition-colors duration-500 data-[active]:border-ihsaan-light-blue data-[active]:bg-ihsaan-light-blue/25"
              style={{ "--i": index } as React.CSSProperties}>
              {lineNumbers ? (
                <span aria-hidden className="w-8 shrink-0 text-cream/40 select-none">
                  {index + 1}
                </span>
              ) : null}
              <span>
                {line.map((token, tokenIndex) =>
                  token.tone === "caret" ? (
                    <span
                      key={tokenIndex}
                      aria-hidden
                      className="sprint-caret inline-block h-[1.1em] w-[0.6ch] translate-y-[0.2em] bg-ihsaan-light-blue"
                    />
                  ) : (
                    <span key={tokenIndex} className={TONES[token.tone ?? "plain"]}>
                      {token.text}
                    </span>
                  ),
                )}
                {line.length === 0 ? " " : null}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}

export { CodeBlock }
