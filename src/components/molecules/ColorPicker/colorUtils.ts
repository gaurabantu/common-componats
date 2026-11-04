import type { ColorPickerSwatch } from "./ColorPicker.types";

/**
 * Normalise a hex colour to lowercase `#rrggbb`. Accepts `#rgb`, `rgb`, `#rrggbb`, `rrggbb`
 * (surrounding whitespace ignored). Returns `null` for anything else.
 */
export function normalizeHex(input: string | null | undefined): string | null {
  if (typeof input !== "string") return null;
  const s = input.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(s)) return `#${s[0]}${s[0]}${s[1]}${s[1]}${s[2]}${s[2]}`;
  if (/^[0-9a-f]{6}$/.test(s)) return `#${s}`;
  return null;
}

/** Convert a CSS colour string (`#hex` or `rgb()/rgba()`) to `#rrggbb`, else `null`. */
export function cssColorToHex(css: string): string | null {
  const hex = normalizeHex(css);
  if (hex) return hex;
  const m = css.trim().match(/^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/i);
  if (!m) return null;
  return `#${[m[1], m[2], m[3]].map((c) => Math.min(255, Number(c)).toString(16).padStart(2, "0")).join("")}`;
}

/** Read a design token's current value as hex (browser only); `null` if unavailable. */
export function resolveTokenHex(token: string, el: Element | null = typeof document !== "undefined" ? document.documentElement : null): string | null {
  if (!el || typeof getComputedStyle === "undefined") return null;
  const raw = getComputedStyle(el).getPropertyValue(token);
  return raw ? cssColorToHex(raw) : null;
}

/**
 * Default swatches — the design-system colour tokens (light-theme values).
 * Rows of 5: neutrals · brand & state · accent foregrounds · accent 40 · accent 10.
 */
export const DEFAULT_COLOR_PICKER_PALETTE: ColorPickerSwatch[] = [
  { value: "#0d0d0d", label: "Black", token: "--color-brand-primary" },
  { value: "#5e5e5e", label: "Dark grey", token: "--color-text-secondary" },
  { value: "#8a8a8a", label: "Grey", token: "--color-border-default" },
  { value: "#e0e0e0", label: "Light grey", token: "--color-mist-80" },
  { value: "#ffffff", label: "White", token: "--color-bg-surface" },

  { value: "#ff4d00", label: "Brand orange", token: "--color-brand-secondary" },
  { value: "#002475", label: "Navy", token: "--color-brand-link" },
  { value: "#28a745", label: "Success green", token: "--color-state-success" },
  { value: "#ffc107", label: "Warning yellow", token: "--color-state-warning" },
  { value: "#dc3545", label: "Error red", token: "--color-state-error" },

  { value: "#5b36a3", label: "Lavender", token: "--color-accent-lavender-fg" },
  { value: "#1a6bb5", label: "Sky", token: "--color-accent-sky-fg" },
  { value: "#1a7a4f", label: "Mint", token: "--color-accent-mint-fg" },
  { value: "#8a6d00", label: "Amber", token: "--color-accent-amber-fg" },
  { value: "#a3293d", label: "Rose", token: "--color-accent-rose-fg" },

  { value: "#b9a7ff", label: "Lavender medium", token: "--color-accent-lavender-40" },
  { value: "#a0d2ff", label: "Sky medium", token: "--color-accent-sky-40" },
  { value: "#a0e7c4", label: "Mint medium", token: "--color-accent-mint-40" },
  { value: "#ffd966", label: "Amber medium", token: "--color-accent-amber-40" },
  { value: "#ffb3bd", label: "Rose medium", token: "--color-accent-rose-40" },

  { value: "#eee7ff", label: "Lavender light", token: "--color-accent-lavender-10" },
  { value: "#e6f2ff", label: "Sky light", token: "--color-accent-sky-10" },
  { value: "#e9fff4", label: "Mint light", token: "--color-accent-mint-10" },
  { value: "#fff6dd", label: "Amber light", token: "--color-accent-amber-10" },
  { value: "#ffe9ec", label: "Rose light", token: "--color-accent-rose-10" },
];
