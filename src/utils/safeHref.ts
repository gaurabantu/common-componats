const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Allow http(s), mailto, tel, relative and hash links — blocks `javascript:`, `data:`, `vbscript:` …
 * Parses with the WHATWG URL parser (the same rules browsers use), so tab / newline / control-character
 * obfuscation such as "java\tscript:" cannot slip through a string check.
 * Shared by `List`, `PageHeader` (via List) and `Button`.
 */
export function isSafeHref(href: string): boolean {
  try {
    const url = new URL(href, "https://relative.invalid/");
    return SAFE_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}
