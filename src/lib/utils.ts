export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Flags each space-separated word of `text` that belongs to one of `phrases`, ignoring case and punctuation. */
export function keyWordFlags(text: string, phrases: readonly string[]) {
  const words = text.split(" ").map((word) => word.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase());
  const flags = words.map(() => false);
  for (const phrase of phrases) {
    const target = phrase.toLowerCase().split(" ");
    for (let start = 0; start + target.length <= words.length; start += 1) {
      if (target.every((part, offset) => words[start + offset] === part)) {
        target.forEach((_, offset) => (flags[start + offset] = true));
      }
    }
  }
  return flags;
}
