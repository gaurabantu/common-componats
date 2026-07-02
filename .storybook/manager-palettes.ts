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
  appBorderColor: "#999999",
  textColor: "#0d0d0d",
  textMutedColor: "#757575",
  textInverseColor: "#ffffff",
  barBg: "#ffffff",
  barTextColor: "#0d0d0d",
  barHoverColor: "#757575",
  barSelectedColor: "#2563eb",
  colorPrimary: "#2563eb",
  colorSecondary: "#757575",
  inputBg: "#ffffff",
  inputBorder: "#999999",
  inputTextColor: "#0d0d0d",
  buttonBg: "#ffffff",
  buttonBorder: "#999999",
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
  appBorderColor: "#4b5563",
  textColor: "#f3f4f6",
  textMutedColor: "#9ca3af",
  textInverseColor: "#ffffff",
  barBg: "#111827",
  barTextColor: "#f3f4f6",
  barHoverColor: "#9ca3af",
  barSelectedColor: "#3b82f6",
  colorPrimary: "#3b82f6",
  colorSecondary: "#9ca3af",
  inputBg: "#1f2937",
  inputBorder: "#4b5563",
  inputTextColor: "#f3f4f6",
  buttonBg: "#1f2937",
  buttonBorder: "#4b5563",
  booleanBg: "#374151",
  booleanSelectedBg: "#3b82f6",
};

/** tokens.css §42 interaction accents — `--color-theme-primary` per named theme */
const ACCENT_PRIMARY: Partial<Record<ToolbarTheme, string>> = {
  green: "#15803d",
  custom: "#e11d48",
  "blue-mist": "#1a56db",
  "green-mist": "#15803d",
};

export function resolveManagerPalette(toolbarTheme: string): ManagerPalette {
  if (toolbarTheme === "dark") return DARK;

  const base =
    toolbarTheme === "mist" ||
    toolbarTheme === "blue-mist" ||
    toolbarTheme === "green-mist"
      ? LIGHT_MIST
      : LIGHT_CLASSIC;

  const accent =
    ACCENT_PRIMARY[toolbarTheme as ToolbarTheme] ?? base.colorPrimary;

  return {
    ...base,
    colorPrimary: accent,
    barSelectedColor: accent,
    booleanSelectedBg: accent,
  };
}
