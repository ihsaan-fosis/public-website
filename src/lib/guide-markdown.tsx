import type { ReactNode } from "react";
import Link from "next/link";

/** Strip emoji / pictographs from display text. */
function stripEmojis(text: string): string {
  return text
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\uFE0F/g, "")
    .replace(/\u200D/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/ ?\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\{#[\w-]+\}/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function headingId(raw: string): { text: string; id: string } {
  const explicit = raw.match(/^(.*?)\s*\{#([\w-]+)\}\s*$/);
  if (explicit) {
    return { text: explicit[1].trim(), id: explicit[2] };
  }
  const text = raw.trim();
  return { text, id: slugify(text) };
}

function flattenBoldSpans(block: string): string {
  // Only join **bold** within one blank-line block so an unclosed
  // opener cannot swallow later headings/lists.
  let out = block.replace(/\*\*([\s\S]*?)\*\*/g, (_full, inner: string) => {
    const flat = inner
      .replace(/^(\s*>\s*)+/gm, "")
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return flat ? `**${flat}**` : "";
  });

  // Drop leftover orphan ** markers (Notion often leaves unclosed openers).
  out = out
    .split("\n")
    .map((line) => {
      const parts = line.split("**");
      if (parts.length % 2 === 1) return line; // even marker count = paired
      // Odd count: drop the last orphan opener/closer.
      return parts.slice(0, -1).join("**") + parts[parts.length - 1];
    })
    .join("\n");

  return out.replace(/^\s*\*\*\s*$/gm, "");
}

/** Collapse multiline **bold** and drop media leftovers / orphan markers. */
export function normalizeMarkdown(source: string): string {
  let text = stripEmojis(source).replace(/\r\n/g, "\n");

  text = text
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (/\.(mp3|mp4|wav|m4a|ogg)(\s|$)/i.test(trimmed)) return "";
      if (!trimmed.startsWith(">")) return line;
      const body = trimmed.replace(/^(\s*>\s*)+/, "").trim();
      if (!body || body === "**" || body === "*") return "";
      return `> ${body}`;
    })
    .join("\n");

  text = text
    .split(/\n{2,}/)
    .map((block) => flattenBoldSpans(block))
    .join("\n\n");

  return text.replace(/\n{3,}/g, "\n\n").trim();
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Links, bold, italic, code. Bold before italic so ** is not eaten as *.
  const pattern =
    /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(_([^_]+)_)|(`([^`]+)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const key = `${keyPrefix}-${i++}`;
    if (match[1]) {
      const href = match[3];
      const label = match[2];
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={key} href={href} className="text-ihsaan-blue underline">
            {label}
          </Link>,
        );
      } else {
        nodes.push(
          <a
            key={key}
            href={href}
            className="text-ihsaan-blue underline"
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            {label}
          </a>,
        );
      }
    } else if (match[4]) {
      nodes.push(
        <strong key={key} className="font-semibold text-ihsaan-blue">
          {match[5].trim()}
        </strong>,
      );
    } else if (match[6] || match[8]) {
      nodes.push(
        <em key={key} className="italic">
          {(match[7] ?? match[9]).trim()}
        </em>,
      );
    } else if (match[10]) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-ihsaan-blue/5 px-1 py-0.5 text-[13px]"
        >
          {match[11]}
        </code>,
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes;
}

function headingClass(level: number) {
  if (level === 1) {
    return "font-heading text-[34px] font-extrabold leading-tight text-ihsaan-blue";
  }
  if (level === 2) {
    return "mt-10 font-heading text-[22px] font-bold text-ihsaan-blue";
  }
  if (level === 3) {
    return "mt-8 font-heading text-[17px] font-bold text-ihsaan-blue";
  }
  return "mt-6 font-heading text-[15px] font-bold text-ihsaan-blue";
}

function renderHeading(
  level: number,
  raw: string,
  key: number,
  compact = false,
): ReactNode | null {
  const { text, id } = headingId(raw);
  if (!text.replace(/[*_`]/g, "").trim()) return null;
  const Tag =
    level === 1 ? "h1" : level === 2 ? "h2" : level === 3 ? "h3" : "h4";
  return (
    <Tag
      key={key}
      id={id}
      className={
        compact
          ? "font-heading text-[15px] font-bold text-ihsaan-blue"
          : headingClass(level)
      }
    >
      {renderInline(text, `h-${key}`)}
    </Tag>
  );
}

function parseTable(rows: string[]): ReactNode {
  const cells = rows.map((row) =>
    row
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim()),
  );
  const header = cells[0] ?? [];
  const body = cells.slice(2); // skip header + separator

  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-b border-ihsaan-blue/20">
            {header.map((cell) => (
              <th
                key={cell}
                className="px-3 py-2 font-heading font-bold text-ihsaan-blue"
              >
                {renderInline(cell, `th-${cell}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-ihsaan-blue/10">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2 align-top text-ink/75">
                  {renderInline(cell, `td-${rowIndex}-${cellIndex}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderQuoteInterior(
  quoteLines: string[],
  keyPrefix: string,
): ReactNode[] {
  const cleaned = quoteLines
    .map((line) => line.replace(/^(\s*>\s*)+/, "").trim())
    .filter(
      (line) =>
        Boolean(line) &&
        line !== "**" &&
        line !== "*" &&
        !/\.(mp3|mp4|wav|m4a|ogg)$/i.test(line),
    );

  const nodes: ReactNode[] = [];
  let i = 0;
  let localKey = 0;

  while (i < cleaned.length) {
    const line = cleaned[i]!;
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      const node = renderHeading(
        heading[1].length,
        heading[2],
        localKey++,
        true,
      );
      if (node) nodes.push(node);
      i += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const items: string[] = [];
      while (
        i < cleaned.length &&
        (ordered ? /^\d+\.\s+/.test(cleaned[i]!) : /^[-*]\s+/.test(cleaned[i]!))
      ) {
        items.push(
          cleaned[i]!.replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, ""),
        );
        i += 1;
      }
      const ListTag = ordered ? "ol" : "ul";
      nodes.push(
        <ListTag
          key={`${keyPrefix}-list-${localKey++}`}
          className={
            ordered
              ? "my-3 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-ink/75"
              : "my-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-ink/75"
          }
        >
          {items.map((item, index) => (
            <li key={index}>
              {renderInline(item, `${keyPrefix}-qli-${localKey}-${index}`)}
            </li>
          ))}
        </ListTag>,
      );
      continue;
    }

    const para: string[] = [];
    while (
      i < cleaned.length &&
      cleaned[i] &&
      !/^(#{1,4})\s+/.test(cleaned[i]!) &&
      !/^[-*]\s+/.test(cleaned[i]!) &&
      !/^\d+\.\s+/.test(cleaned[i]!)
    ) {
      para.push(cleaned[i]!);
      i += 1;
    }
    if (para.length > 0) {
      const text = para
        .join(" ")
        .replace(/\s+/g, " ")
        .replace(/\*\*\s+/g, "**")
        .replace(/\s+\*\*/g, "**")
        .trim();
      if (text) {
        nodes.push(
          <p
            key={`${keyPrefix}-p-${localKey++}`}
            className="mt-3 text-[15px] leading-7 text-ink/75 first:mt-0"
          >
            {renderInline(text, `${keyPrefix}-pi-${localKey}`)}
          </p>,
        );
      }
    }
  }

  return nodes;
}

/** Minimal markdown renderer for Career Essentials guide bodies. */
export function GuideMarkdown({ source }: { source: string }) {
  const lines = normalizeMarkdown(source).split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i]!;

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.trim() === "---") {
      i += 1;
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      const node = renderHeading(heading[1].length, heading[2], key++);
      if (node) blocks.push(node);
      i += 1;
      continue;
    }

    if (line.trim().startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i]!.trim().startsWith(">")) {
        quoteLines.push(lines[i]!);
        i += 1;
      }
      const interior = renderQuoteInterior(quoteLines, `q-${key}`);
      if (interior.length > 0) {
        blocks.push(
          <blockquote
            key={key++}
            className="my-6 border-l-2 border-ihsaan-blue/30 pl-5 text-[15px] leading-7 text-ink/75"
          >
            {interior}
          </blockquote>,
        );
      }
      continue;
    }

    if (line.trim().startsWith("|")) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i]!.trim().startsWith("|")) {
        tableRows.push(lines[i]!);
        i += 1;
      }
      blocks.push(<div key={key++}>{parseTable(tableRows)}</div>);
      continue;
    }

    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const items: string[] = [];
      while (
        i < lines.length &&
        (ordered ? /^\d+\.\s+/.test(lines[i]!) : /^[-*]\s+/.test(lines[i]!))
      ) {
        items.push(lines[i]!.replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, ""));
        i += 1;
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(
        <ListTag
          key={key++}
          className={
            ordered
              ? "my-4 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-ink/75"
              : "my-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-ink/75"
          }
        >
          {items.map((item, index) => (
            <li key={index}>{renderInline(item, `li-${key}-${index}`)}</li>
          ))}
        </ListTag>,
      );
      continue;
    }

    // Skip leftover image markdown (covers live outside the body).
    if (/^!\[[^\]]*\]\([^)]+\)\s*$/.test(line.trim())) {
      i += 1;
      continue;
    }

    const paragraph: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i]!.trim() &&
      !lines[i]!.startsWith("#") &&
      lines[i]!.trim() !== "---" &&
      !lines[i]!.trim().startsWith(">") &&
      !lines[i]!.trim().startsWith("|") &&
      !/^[-*]\s+/.test(lines[i]!) &&
      !/^\d+\.\s+/.test(lines[i]!)
    ) {
      paragraph.push(lines[i]!);
      i += 1;
    }
    blocks.push(
      <p
        key={key++}
        className="mt-4 text-[15px] leading-7 text-ink/75"
      >
        {renderInline(paragraph.join(" "), `p-${key}`)}
      </p>,
    );
  }

  return <article className="max-w-3xl">{blocks}</article>;
}
