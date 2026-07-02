/**
 * Canonical theme bridge — shared by Storybook preview (`.storybook/preview.tsx`) and
 * manager (`.storybook/manager.ts`).
 *
 * **Design system rule (consumer apps):** import `tokens.css` once, set `data-theme` on
 * `<html>`. Components read `--color-*` tokens only. No JS theme objects, no hex in app code.
 *
 * **Storybook preview iframe** uses this bridge exactly like a consumer app.
 *
 * **Storybook manager shell** also sets `data-theme` here, then applies a separate hex adapter
 * (`.storybook/manager-palettes.ts`) only where Storybook's `create()` API cannot accept CSS vars.
 */

/** Toolbar values in `.storybook/preview.tsx` globalTypes.theme */
export type ToolbarTheme =
  | "light"
  | "blue"
  | "dark"
  | "green"
  | "mist"
  | "custom"
  | "blue-mist"
  | "green-mist";

export const TOOLBAR_THEMES: readonly ToolbarTheme[] = [
  "light",
  "blue",
  "dark",
  "green",
  "mist",
  "custom",
  "blue-mist",
  "green-mist",
] as const;

/**
 * Maps Storybook toolbar → `data-theme` on `<html>`.
 * `light` = classic default → **omit** attribute (matches `:root` in tokens.css).
 */
export function toolbarThemeToDataTheme(toolbarTheme: string): ToolbarTheme | null {
  if (toolbarTheme === "light") return null;
  if ((TOOLBAR_THEMES as readonly string[]).includes(toolbarTheme)) {
    return toolbarTheme as ToolbarTheme;
  }
  return null;
}

/** Apply Governance theme to a document root (preview iframe or manager tab). */
export function applyDataTheme(
  toolbarTheme: string,
  root: HTMLElement = document.documentElement,
): void {
  const dataTheme = toolbarThemeToDataTheme(toolbarTheme);
  if (dataTheme === null) root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", dataTheme);
}

export function readToolbarTheme(globals: Record<string, unknown> | undefined): string {
  const t = globals?.theme;
  return typeof t === "string" && t.length ? t : "light";
}

/** Storybook manager `create({ base })` — only `dark` uses SB dark math. */
export function storybookChromeBase(toolbarTheme: string): "light" | "dark" {
  return toolbarTheme === "dark" ? "dark" : "light";
}

export function isMistSurfaceFamily(toolbarTheme: string): boolean {
  return (
    toolbarTheme === "mist" ||
    toolbarTheme === "blue-mist" ||
    toolbarTheme === "green-mist"
  );
}

/** Cache key for manager hex adapter — remount only when structure or SB base changes. */
export function managerThemeConfigKey(toolbarTheme: string): string {
  return `${storybookChromeBase(toolbarTheme)}:${isMistSurfaceFamily(toolbarTheme) ? "mist" : "classic"}:${toolbarThemeToDataTheme(toolbarTheme) ?? "light"}`;
}
