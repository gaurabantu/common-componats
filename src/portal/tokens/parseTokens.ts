/**
 * Parses `tokens.css` text into token declarations so portal pages are generated from the
 * shipped file (no hand-copied values that drift).
 */

export interface TokenDecl {
  name: string;
  /** Raw declared value (may contain `var(--…)`). */
  value: string;
  /** Nearest preceding comment inside the block (section heading), if any. */
  section?: string;
}

export interface TokenBlock {
  selector: string;
  /** `data-theme` values this block targets; empty for the base `:root`. */
  themes: string[];
  tokens: TokenDecl[];
}

export type TokenCategory =
  | "color"
  | "typography"
  | "spacing"
  | "radius"
  | "shadow"
  | "border"
  | "motion"
  | "z-index"
  | "opacity"
  | "size"
  | "component";

export type ColorGroup =
  | "theme"
  | "brand"
  | "text"
  | "surface"
  | "border"
  | "state"
  | "accent"
  | "palette"
  | "other";

const BLOCK_RE = /([^{}]+)\{([^{}]*)\}/g;
const DECL_RE = /\/\*([\s\S]*?)\*\/|(--[\w-]+)\s*:\s*([^;]+);/g;
const THEME_RE = /\[data-theme="([\w-]+)"\]/g;

function cleanComment(raw: string): string {
  return raw
    .replace(/^\*+/, "")
    .split("\n")
    .map((l) => l.replace(/^\s*\*\s?/, "").trim())
    .filter(Boolean)
    .join(" ")
    .slice(0, 140);
}

/** All `:root` / `[data-theme]` blocks with their custom-property declarations. */
export function parseTokenBlocks(css: string): TokenBlock[] {
  const blocks: TokenBlock[] = [];
  // Comments may contain literal braces (e.g. "`:root { --font-family: … }`") — neutralise them
  // so they cannot split a block; the comment text itself is kept for section headings.
  const source = css
    .replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[{}]/g, " "))
    .replace(/^\s*@import[^;]+;/gm, ""); // real at-rules only — comments may mention "@import"
  for (const match of source.matchAll(BLOCK_RE)) {
    const selector = match[1].replace(/\/\*[\s\S]*?\*\//g, "").trim();
    if (!selector.includes(":root") && !selector.includes("[data-theme")) continue;
    const tokens: TokenDecl[] = [];
    let section: string | undefined;
    for (const d of match[2].matchAll(DECL_RE)) {
      if (d[1] !== undefined) {
        section = cleanComment(d[1]) || section;
        continue;
      }
      tokens.push({ name: d[2], value: d[3].trim().replace(/\s+/g, " "), section });
    }
    if (!tokens.length) continue;
    const themes = [...selector.matchAll(THEME_RE)].map((m) => m[1]);
    blocks.push({ selector, themes: [...new Set(themes)], tokens });
  }
  return blocks;
}

/**
 * Base tokens — every `:root` block that does not target a named theme (classic default),
 * merged in source order (later declarations win, like the cascade).
 */
export function baseTokens(css: string): TokenDecl[] {
  const map = new Map<string, TokenDecl>();
  for (const block of parseTokenBlocks(css)) {
    const isBase = block.themes.length === 0 || block.themes.includes("blue");
    if (!isBase) continue;
    for (const t of block.tokens) map.set(t.name, t);
  }
  return [...map.values()];
}

/** Named `data-theme` values declared in the file, in source order. */
export function themeNames(css: string): string[] {
  const names = new Set<string>();
  for (const block of parseTokenBlocks(css)) block.themes.forEach((t) => names.add(t));
  return [...names];
}

/** Which themes override a token (for the "Themable" badge). */
export function themeOverrides(css: string): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const block of parseTokenBlocks(css)) {
    const named = block.themes.filter((t) => t !== "blue");
    if (!named.length) continue;
    for (const t of block.tokens) {
      const list = map.get(t.name) ?? [];
      named.forEach((n) => !list.includes(n) && list.push(n));
      map.set(t.name, list);
    }
  }
  return map;
}

export function categorize(name: string): TokenCategory {
  if (name.startsWith("--color-")) return "color";
  if (/^--(text|font|leading)-/.test(name)) return "typography";
  if (/^--(space|layout|grid)-/.test(name)) return "spacing";
  if (name.startsWith("--radius-")) return "radius";
  if (name.startsWith("--shadow-")) return "shadow";
  if (name.startsWith("--border-")) return "border";
  if (/^--(duration|easing)-/.test(name)) return "motion";
  if (name.startsWith("--z-")) return "z-index";
  if (name.startsWith("--opacity-")) return "opacity";
  if (name.startsWith("--size-")) return "size";
  return "component";
}

export function colorGroup(name: string): ColorGroup {
  if (name.startsWith("--color-theme-")) return "theme";
  if (name.startsWith("--color-brand-")) return "brand";
  if (name.startsWith("--color-text-")) return "text";
  if (/^--color-(bg|surface|fill|interactive)-/.test(name)) return "surface";
  if (/^--color-(border|focus)-/.test(name)) return "border";
  if (/^--color-(state|danger|success|info|warning)-/.test(name)) return "state";
  if (name.startsWith("--color-accent-")) return "accent";
  if (/^--color-(noir|ash|mist)-/.test(name)) return "palette";
  return "other";
}

export function groupBy<T, K extends string>(items: T[], key: (item: T) => K): Record<K, T[]> {
  const out = {} as Record<K, T[]>;
  for (const item of items) {
    const k = key(item);
    (out[k] ??= []).push(item);
  }
  return out;
}

/** `var(--a)` / `var(--a, fallback)` → `--a` (first reference) for alias display. */
export function aliasOf(value: string): string | null {
  const m = value.match(/^var\((--[\w-]+)/);
  return m ? m[1] : null;
}
