import { GLOBALS_UPDATED } from "@storybook/core/core-events";
import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

import { resolveManagerPalette } from "./manager-palettes";
import {
  applyDataTheme,
  managerThemeConfigKey,
  readToolbarTheme,
} from "./theme-bridge";

const BRAND = {
  brandTitle: "Infinia StoryBook",
  brandImage: "/infinia-icon.png",
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

/** Remount manager theme only when toolbar theme identity changes. */
let lastConfigKey: string | null = null;

function syncManagerUi(globals?: Record<string, unknown>): void {
  const toolbarTheme = readToolbarTheme(globals);
  const configKey = managerThemeConfigKey(toolbarTheme);

  applyDataTheme(toolbarTheme);

  if (configKey === lastConfigKey) return;
  lastConfigKey = configKey;

  addons.setConfig({
    theme: buildManagerTheme(toolbarTheme),
  });
}

lastConfigKey = managerThemeConfigKey("light");
applyDataTheme("light");
addons.setConfig({
  theme: buildManagerTheme("light"),
});

addons.register("infinia/manager-theme-sync", (api) => {
  api.on(GLOBALS_UPDATED, (payload: unknown) => {
    if (payload && typeof payload === "object" && "globals" in payload) {
      syncManagerUi((payload as { globals?: Record<string, unknown> }).globals);
      return;
    }
    syncManagerUi(api.getGlobals() as Record<string, unknown>);
  });

  try {
    syncManagerUi(api.getGlobals() as Record<string, unknown>);
  } catch {
    syncManagerUi(undefined);
  }
});
