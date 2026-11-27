/** Escape a string for use inside a RegExp character class / alternation. */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&");
}

/** Split `text` on any of `separators`; parts are trimmed, empty parts dropped. */
export function splitTags(text: string, separators: string[]): string[] {
  const seps = separators.filter((s) => s.length > 0);
  if (seps.length === 0) return text.trim() ? [text.trim()] : [];
  const re = new RegExp(seps.map(escapeRegExp).join("|"), "g");
  return text
    .split(re)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** True when `text` contains at least one of `separators`. */
export function containsSeparator(text: string, separators: string[]): boolean {
  return separators.some((s) => s.length > 0 && text.includes(s));
}

/** Case-insensitive "contains" filter that hides already-added tags unless duplicates are allowed. */
export function filterSuggestions(
  suggestions: string[],
  query: string,
  tags: string[],
  allowDuplicates: boolean,
): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return suggestions.filter(
    (s) => s.toLowerCase().includes(q) && (allowDuplicates || !tags.includes(s)),
  );
}

/**
 * Split typed text on `separators`: every part before the last separator is a complete tag; the text
 * after it is still being typed (`tail`, leading whitespace dropped).
 */
export function splitPending(text: string, separators: string[]): { complete: string[]; tail: string } {
  const seps = separators.filter((s) => s.length > 0);
  if (seps.length === 0) return { complete: [], tail: text };
  const pieces = text.split(new RegExp(seps.map(escapeRegExp).join("|"), "g"));
  const tail = (pieces.pop() ?? "").trimStart();
  return { complete: pieces.map((p) => p.trim()).filter(Boolean), tail };
}
