/**
 * Storybook manager hex adapter — NOT used by consumer apps.
 *
 * Storybook's `@storybook/theming/create()` passes every color through `polished` (opacify,
 * darken, …). Polished cannot parse CSS variables → error #5 → white screen.
 *
 * **Canonical theming** remains `src/design-system/tokens.css` + `data-theme` on `<html>`.
 * Hex values here are a **snapshot adapter** for Storybook's JS API only. When tokens change,
 * update the matching block in `tokens.css` AND this file (see THEMES.md § Storybook layers).
 *
 * Preview iframe + all shipped components use CSS tokens directly — no adapter needed.
 */

import type { ToolbarTheme } from "./theme-bridge";

export type ManagerPalette = {
  sbBase: "light" | "dark";
  appBg: string;
  appContentBg: string;
  appPreviewBg: string;
  appBorderColor: string;
  textColor: string;
  textMutedColor: string;
  textInverseColor: string;
  barBg: string;
  barTextColor: string;
  barHoverColor: string;
  barSelectedColor: string;
  colorPrimary: string;
  colorSecondary: string;
  inputBg: string;
  inputBorder: string;
  inputTextColor: string;
  buttonBg: string;
  buttonBorder: string;
  booleanBg: string;
  booleanSelectedBg: string;
};

/** tokens.css — `:root` / `[data-theme="blue"]` structural + blue accent */
export const LIGHT_CLASSIC: ManagerPalette = {
  sbBase: "light",
  appBg: "#e0e0e0",
  appContentBg: "#ffffff",
  appPreviewBg: "#e0e0e0",
  appBorderColor: "#8a8a8a",
  textColor: "#0d0d0d",
  textMutedColor: "#5e5e5e",
  textInverseColor: "#ffffff",
  barBg: "#ffffff",
  barTextColor: "#0d0d0d",
  barHoverColor: "#5e5e5e",
  barSelectedColor: "#2563eb",
  colorPrimary: "#2563eb",
  colorSecondary: "#5e5e5e",
  inputBg: "#ffffff",
  inputBorder: "#8a8a8a",
  inputTextColor: "#0d0d0d",
  buttonBg: "#ffffff",
  buttonBorder: "#8a8a8a",
  booleanBg: "#ededed",
  booleanSelectedBg: "#2563eb",
};

/** tokens.css — mist / blue-mist / green-mist surfaces */
export const LIGHT_MIST: ManagerPalette = {
  ...LIGHT_CLASSIC,
  appBg: "#ededed",
  appContentBg: "#fafafa",
  appPreviewBg: "#ededed",
  barBg: "#f5f5f5",
  booleanBg: "#e8e8e8",
};

/** tokens.css — `[data-theme="dark"]` */
export const DARK: ManagerPalette = {
  sbBase: "dark",
  appBg: "#111827",
  appContentBg: "#1f2937",
  appPreviewBg: "#111827",
  appBorderColor: "#717a86",
  textColor: "#f3f4f6",
  textMutedColor: "#a8b0bb",
  textInverseColor: "#ffffff",
  barBg: "#111827",
  barTextColor: "#f3f4f6",
  barHoverColor: "#a8b0bb",
  barSelectedColor: "#60a5fa",
  colorPrimary: "#3b82f6",
  colorSecondary: "#a8b0bb",
  inputBg: "#1f2937",
  inputBorder: "#717a86",
  inputTextColor: "#f3f4f6",
  buttonBg: "#1f2937",
  buttonBorder: "#717a86",
  booleanBg: "#374151",
  booleanSelectedBg: "#2563eb",
};

/** tokens.css — `[data-theme="infinia-light"]` (Forma UI v1.1.0) */
export const INFINIA_LIGHT: ManagerPalette = {
  sbBase: "light",
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e5e5e5",
  textColor: "#111111",
  textMutedColor: "#454545",
  textInverseColor: "#111111",
  barBg: "#ffffff",
  barTextColor: "#111111",
  barHoverColor: "#6b5900",
  barSelectedColor: "#6b5900",
  colorPrimary: "#ffd400",
  colorSecondary: "#6b5900",
  inputBg: "#ffffff",
  inputBorder: "#bdbdbd",
  inputTextColor: "#111111",
  buttonBg: "#ffffff",
  buttonBorder: "#bdbdbd",
  booleanBg: "#f5f5f5",
  booleanSelectedBg: "#ffd400",
};

/** tokens.css — `[data-theme="infinia-dark"]` (Forma UI v1.1.0) */
export const INFINIA_DARK: ManagerPalette = {
  sbBase: "dark",
  appBg: "#111111",
  appContentBg: "#191919",
  appPreviewBg: "#111111",
  appBorderColor: "#363636",
  textColor: "#ffffff",
  textMutedColor: "#d0d0d0",
  textInverseColor: "#111111",
  barBg: "#191919",
  barTextColor: "#ffffff",
  barHoverColor: "#ffd400",
  barSelectedColor: "#ffd400",
  colorPrimary: "#ffd400",
  colorSecondary: "#ffd400",
  inputBg: "#191919",
  inputBorder: "#5b5b5b",
  inputTextColor: "#ffffff",
  buttonBg: "#191919",
  buttonBorder: "#5b5b5b",
  booleanBg: "#202020",
  booleanSelectedBg: "#ffd400",
};

/**
 * Per-theme selection accent for the 8 non-Infinia themes (Infinia palettes above are final —
 * do not route them through this table).
 *
 * Storybook paints the **selected sidebar row** with `colorSecondary` and fixed white text
 * (`theme.color.lightest`), the active toolbar/tab with `barSelectedColor`, toolbar hover with
 * `barHoverColor` and boolean toggles with `booleanSelectedBg`. Each theme therefore needs its
 * own accent here, otherwise the base palette's neutral grey (or a previously-mounted theme) shows.
 *
 * - `selected`: sidebar selected-row fill. White text on it must be ≥ 4.5:1.
 * - `bar`: active toolbar item / tab text + underline on `barBg`. Must be ≥ 4.5:1 on `barBg`.
 * - `primary`: `--color-theme-primary` for that theme (tokens.css), used for colorPrimary.
 * Contrast (white on selected / bar on barBg) is asserted in `src/portal/components/storybookTheme.test.ts`.
 */
type ThemeAccent = { selected: string; bar: string; primary: string };

export const THEME_ACCENTS: Record<
  Exclude<ToolbarTheme, "infinia-light" | "infinia-dark">,
  ThemeAccent
> = {
  /** :root / blue — --color-theme-primary #2563eb (white 5.17:1) */
  light: { selected: "#2563eb", bar: "#2563eb", primary: "#2563eb" },
  blue: { selected: "#2563eb", bar: "#2563eb", primary: "#2563eb" },
  /** mist inherits the blue accent on mist surfaces */
  mist: { selected: "#2563eb", bar: "#2563eb", primary: "#2563eb" },
  /** green — #15803d (white 5.02:1) */
  green: { selected: "#15803d", bar: "#15803d", primary: "#15803d" },
  "green-mist": { selected: "#15803d", bar: "#15803d", primary: "#15803d" },
  /** custom (rose) — #e11d48 (white 4.70:1) */
  custom: { selected: "#e11d48", bar: "#e11d48", primary: "#e11d48" },
  /** blue-mist — #1a56db */
  "blue-mist": { selected: "#1a56db", bar: "#1a56db", primary: "#1a56db" },
  /**
   * dark — primary #3b82f6 only reaches 3.68:1 under white text, so the selected row uses the
   * theme's own hover step #2563eb (5.17:1); active bar text uses the focus blue #60a5fa on #111827.
   */
  dark: { selected: "#2563eb", bar: "#60a5fa", primary: "#3b82f6" },
};

export function resolveManagerPalette(toolbarTheme: string): ManagerPalette {
  if (toolbarTheme === "infinia-light") return INFINIA_LIGHT;
  if (toolbarTheme === "infinia-dark") return INFINIA_DARK;

  const key = (toolbarTheme in THEME_ACCENTS ? toolbarTheme : "light") as keyof typeof THEME_ACCENTS;
  const base =
    key === "dark"
      ? DARK
      : key === "mist" || key === "blue-mist" || key === "green-mist"
        ? LIGHT_MIST
        : LIGHT_CLASSIC;
  const accent = THEME_ACCENTS[key];

  return {
    ...base,
    colorPrimary: accent.primary,
    colorSecondary: accent.selected,
    barSelectedColor: accent.bar,
    barHoverColor: accent.bar,
    booleanSelectedBg: accent.selected,
  };
}
