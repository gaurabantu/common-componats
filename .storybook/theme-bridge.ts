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
  | "green-mist"
  | "infinia-light"
  | "infinia-dark";

export const TOOLBAR_THEMES: readonly ToolbarTheme[] = [
  "light",
  "blue",
  "dark",
  "green",
  "mist",
  "custom",
  "blue-mist",
  "green-mist",
  "infinia-light",
  "infinia-dark",
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

/** Storybook manager `create({ base })` — `dark` and `infinia-dark` use SB dark math. */
export function storybookChromeBase(toolbarTheme: string): "light" | "dark" {
  return toolbarTheme === "dark" || toolbarTheme === "infinia-dark" ? "dark" : "light";
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

/** Themes whose surfaces are dark — drive `color-scheme` and the docs/manager dark base. */
export function isDarkToolbarTheme(toolbarTheme: string): boolean {
  return storybookChromeBase(toolbarTheme) === "dark";
}

export function isToolbarTheme(value: unknown): value is ToolbarTheme {
  return typeof value === "string" && (TOOLBAR_THEMES as readonly string[]).includes(value);
}

/**
 * Persistence — the last toolbar theme survives reload / opening a URL without `globals=`.
 * Namespaced key (GitHub Pages shares one origin across a user's project sites). Storage is
 * untrusted input: only whitelisted theme ids are ever returned. All access is try/catch
 * (Safari private mode, sandboxed iframes and disabled storage throw on access).
 */
export const THEME_STORAGE_KEY = "ui-common-components:storybook-theme";

export function readStoredTheme(): ToolbarTheme | null {
  try {
    const v = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isToolbarTheme(v) ? v : null;
  } catch {
    return null;
  }
}

export function storeTheme(toolbarTheme: string): void {
  if (!isToolbarTheme(toolbarTheme)) return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, toolbarTheme);
  } catch {
    /* storage unavailable — theme still applies for this session */
  }
}

/**
 * Read `theme` from Storybook's URL globals (`?globals=theme:dark;a11y.manual:!true`).
 * Returns null when absent or not a known theme id.
 */
export function readThemeFromSearch(search: string): ToolbarTheme | null {
  try {
    const globals = new URLSearchParams(search).get("globals");
    if (!globals) return null;
    for (const pair of globals.split(";")) {
      const [k, v] = pair.split(":");
      if (k === "theme" && isToolbarTheme(v)) return v;
    }
  } catch {
    /* malformed URL — ignore */
  }
  return null;
}
