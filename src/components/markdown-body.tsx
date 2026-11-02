import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { displayClass } from "@/components/ui";

/**
 * Markdown rendering for article bodies written in the member portal.
 *
 * The portal stores Markdown, not HTML, and this renderer keeps that promise: it only builds
 * React elements it knows about, so raw HTML in a body is text, and a link is only a link when
 * it resolves to http, https, mailto, tel, or a site path. Anything else - `javascript:`,
 * `data:`, a protocol-relative `//host` - is rendered as plain text.
 */

type Block =
  | { kind: "heading"; level: number; text: string; id: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: readonly string[] }
  | { kind: "quote"; blocks: readonly Block[] }
  | { kind: "code"; text: string };

const ALLOWED_ABSOLUTE = /^(?:https?:\/\/|mailto:|tel:)/i;

/**
 * Resolve a Markdown destination to somewhere this site will send a reader.
 * Scheme-relative `//host` is refused as well as script-bearing schemes.
 */
function safeHref(raw: string): string | undefined {
  const href = raw.trim();
  if (!href) return undefined;
  if (href.startsWith("//")) return undefined;
  if (href.startsWith("/")) return href;
  return ALLOWED_ABSOLUTE.test(href) ? href : undefined;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Inline spans: links, bold, italic, and code. Input is never interpreted as HTML. */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*]+)\*|_([^_]+)_|`([^`]+)`/g;
  let last = 0;
  let index = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${index++}`;
    const [, linkLabel, linkHref, bold, boldAlt, italic, italicAlt, code] = match;

    if (linkLabel !== undefined && linkHref !== undefined) {
      const href = safeHref(linkHref);
      // An unsafe destination keeps its words and loses the link.
      nodes.push(
        href ? (
          <a
            key={key}
            href={href}
            className="font-medium text-ink underline underline-offset-4"
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {linkLabel}
          </a>
        ) : (
          linkLabel
        ),
      );
    } else if (bold !== undefined || boldAlt !== undefined) {
      nodes.push(
        <strong key={key} className="font-semibold text-ink">
          {bold ?? boldAlt}
        </strong>,
      );
    } else if (italic !== undefined || italicAlt !== undefined) {
      nodes.push(
        <em key={key} className="italic">
          {italic ?? italicAlt}
        </em>,
      );
    } else if (code !== undefined) {
      nodes.push(
        <code key={key} className="rounded bg-ink/5 px-1 py-0.5 text-[13px]">
          {code}
        </code>,
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Parse into a small block tree. Blockquotes recurse; everything else is flat. */
function parseBlocks(lines: readonly string[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const body: string[] = [];
      i += 1;
      while (i < lines.length && !(lines[i] ?? "").trim().startsWith("```")) {
        body.push(lines[i] ?? "");
        i += 1;
      }
      i += 1;
      blocks.push({ kind: "code", text: body.join("\n") });
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (heading) {
      const text = (heading[2] ?? "").trim();
      if (text) blocks.push({ kind: "heading", level: heading[1]?.length ?? 2, text, id: slugify(text) });
      i += 1;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quoted: string[] = [];
      while (i < lines.length && /^>\s?/.test((lines[i] ?? "").trim())) {
        quoted.push((lines[i] ?? "").trim().replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push({ kind: "quote", blocks: parseBlocks(quoted) });
      continue;
    }

    const ordered = /^\d+[.)]\s+/.test(trimmed);
    if (ordered || /^[-*+]\s+/.test(trimmed)) {
      const itemPattern = ordered ? /^\d+[.)]\s+/ : /^[-*+]\s+/;
      const items: string[] = [];
      while (i < lines.length && itemPattern.test((lines[i] ?? "").trim())) {
        items.push((lines[i] ?? "").trim().replace(itemPattern, ""));
        i += 1;
      }
      blocks.push({ kind: "list", ordered, items });
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length) {
      const current = (lines[i] ?? "").trim();
      if (!current || /^(#{1,4})\s|^>\s?|^[-*+]\s|^\d+[.)]\s|^```/.test(current)) break;
      paragraph.push(current);
      i += 1;
    }
    blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

function blockNodes(blocks: readonly Block[], inQuote = false): ReactNode[] {
  return blocks.map((block, index) => {
    const key = `${inQuote ? "q" : "b"}-${index}`;
    switch (block.kind) {
      case "heading": {
        const Tag = block.level <= 2 ? "h2" : "h3";
        return (
          <Tag
            key={key}
            id={block.id}
            className={cn(
              "scroll-mt-28",
              block.level <= 2 ? "text-[1.75rem] leading-[1.1] sm:text-4xl" : "text-xl sm:text-2xl",
              displayClass,
              index > 0 && "mt-12",
            )}
          >
            {renderInline(block.text, key)}
          </Tag>
        );
      }
      case "paragraph":
        return (
          <p key={key} className={cn("text-[15px] leading-7 text-ink/75", index > 0 && "mt-5")}>
            {renderInline(block.text, key)}
          </p>
        );
      case "list": {
        const Tag = block.ordered ? "ol" : "ul";
        return (
          <Tag
            key={key}
            className={cn(
              "mt-5 space-y-2 pl-5 text-[15px] leading-7 text-ink/75",
              block.ordered ? "list-decimal" : "list-disc",
            )}
          >
            {block.items.map((item, itemIndex) => (
              <li key={`${key}-${itemIndex}`}>{renderInline(item, `${key}-${itemIndex}`)}</li>
            ))}
          </Tag>
        );
      }
      case "quote":
        return (
          <blockquote key={key} className="mt-5 border-l-2 border-ink/20 pl-5 [&>*:first-child]:mt-0">
            {blockNodes(block.blocks, true)}
          </blockquote>
        );
      case "code":
        return (
          <pre key={key} className="mt-5 overflow-x-auto rounded-2xl bg-ink/5 p-4 text-[13px] leading-6 text-ink">
            <code>{block.text}</code>
          </pre>
        );
    }
  });
}

/** Heading anchors for the article's contents list, in document order. */
export function markdownHeadings(source: string): readonly { id: string; text: string }[] {
  return parseBlocks(source.split(/\r?\n/))
    .flatMap((block) => (block.kind === "heading" && block.level <= 2 ? [{ id: block.id, text: block.text }] : []))
    .filter((heading, index, all) => all.findIndex((candidate) => candidate.id === heading.id) === index);
}

export function MarkdownBody({ source }: { source: string }) {
  return <div>{blockNodes(parseBlocks(source.split(/\r?\n/)))}</div>;
}
