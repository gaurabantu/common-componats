import {
  CURRENT_STORY_WAS_SET,
  GLOBALS_UPDATED,
  SET_GLOBALS,
  STORY_CHANGED,
} from "@storybook/core/core-events";
import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

import { resolveManagerPalette } from "./manager-palettes";
import {
  applyDataTheme,
  isDarkToolbarTheme,
  readStoredTheme,
  readThemeFromSearch,
  readToolbarTheme,
  storeTheme,
} from "./theme-bridge";

const BRAND = {
  brandTitle: "Infinia Design System",
  /** Relative — the static build is served under a GitHub Pages sub-path (`/<repo>/`). */
  brandImage: "./infinia-icon.png",
  brandTarget: "_self",
} as const;

const FONT_BASE =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const FONT_CODE =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

/**
 * Storybook manager JS theme — hex adapter only (see manager-palettes.ts).
 * Token-driven chrome overrides live in `.storybook/brand/infinia-manager-brand.css`.
 */
function buildManagerTheme(toolbarTheme: string) {
  const palette = resolveManagerPalette(toolbarTheme);
  return create({
    base: palette.sbBase,
    ...BRAND,
    fontBase: FONT_BASE,
    fontCode: FONT_CODE,
    appBg: palette.appBg,
    appContentBg: palette.appContentBg,
    appPreviewBg: palette.appPreviewBg,
    appBorderColor: palette.appBorderColor,
    textColor: palette.textColor,
    textMutedColor: palette.textMutedColor,
    textInverseColor: palette.textInverseColor,
    barBg: palette.barBg,
    barTextColor: palette.barTextColor,
    barHoverColor: palette.barHoverColor,
    barSelectedColor: palette.barSelectedColor,
    colorPrimary: palette.colorPrimary,
    colorSecondary: palette.colorSecondary,
    inputBg: palette.inputBg,
    inputBorder: palette.inputBorder,
    inputTextColor: palette.inputTextColor,
    buttonBg: palette.buttonBg,
    buttonBorder: palette.buttonBorder,
    booleanBg: palette.booleanBg,
    booleanSelectedBg: palette.booleanSelectedBg,
  });
}

/**
 * Re-create the manager theme whenever the toolbar theme id changes. Keyed on the theme id itself
 * (not a structural family key) so every theme gets its own accent — a coarser key let a
 * previously-mounted palette (e.g. Infinia's olive selection) survive a switch.
 */
let lastTheme: string | null = null;

function applyManagerTheme(toolbarTheme: string): void {
  applyDataTheme(toolbarTheme);
  document.documentElement.style.colorScheme = isDarkToolbarTheme(toolbarTheme) ? "dark" : "light";
  if (toolbarTheme === lastTheme) return;
  lastTheme = toolbarTheme;
  addons.setConfig({ theme: buildManagerTheme(toolbarTheme) });
}

function syncManagerUi(globals?: Record<string, unknown>): void {
  const toolbarTheme = readToolbarTheme(globals);
  storeTheme(toolbarTheme);
  applyManagerTheme(toolbarTheme);
}

/**
 * First paint: URL `globals=theme:x` wins, else the remembered theme, else classic. The preview
 * seeds `initialGlobals.theme` from the same storage key, so SET_GLOBALS confirms this choice.
 */
applyManagerTheme(readThemeFromSearch(window.location.search) ?? readStoredTheme() ?? "light");

addons.register("infinia/manager-theme-sync", (api) => {
  const onGlobals = (payload: unknown) => {
    if (payload && typeof payload === "object" && "globals" in payload) {
      syncManagerUi((payload as { globals?: Record<string, unknown> }).globals);
      return;
    }
    syncManagerUi(api.getGlobals() as Record<string, unknown>);
  };
  api.on(SET_GLOBALS, onGlobals);
  api.on(GLOBALS_UPDATED, onGlobals);
});

/**
 * Landing page: the Dashboard renders full width with no sidebar (user direction 2026-11-26).
 * The sidebar returns on every other page — reached via the Dashboard's "Get started" /
 * "Browse components" CTAs. The toolbar stays so the Theme picker is always available.
 */
const LANDING_IDS = new Set(["overview-dashboard--docs"]);

addons.register("infinia/landing-layout", (api) => {
  let lastLanding: boolean | null = null;
  const sync = () => {
    const storyId = api.getUrlState()?.storyId;
    // `/` with no path resolves to the first entry (the Dashboard) — treat it as landing too.
    const landing = !storyId || LANDING_IDS.has(storyId);
    if (landing === lastLanding) return;
    lastLanding = landing;
    api.toggleNav(!landing);
  };
  api.on(CURRENT_STORY_WAS_SET, sync);
  api.on(STORY_CHANGED, sync);
  window.addEventListener("popstate", sync);
  sync();
});
