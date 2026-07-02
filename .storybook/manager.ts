import { GLOBALS_UPDATED } from "@storybook/core/core-events";
import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

/** Matches Toolbar “Theme” in `preview.tsx` globalTypes.theme */
export type ToolbarTheme =
  | "light"
  | "blue"
  | "dark"
  | "green"
  | "mist"
  | "custom"
  | "blue-mist"
  | "green-mist";

const BRAND = {
  brandTitle: "Infinia StoryBook",
  brandImage: "/infinia-icon.png",
  brandTarget: "_self",
} as const;

function applyDataTheme(theme: string): void {
  const root = document.documentElement;
  if (theme === "light") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
}

/**
 * Storybook manager chrome tinted with Governance tokens (`tokens.css` on `<html>`).
 * `--color-*` values change when `data-theme` matches preview / apps.
 */
function buildManagerTheme(sbBase: "light" | "dark") {
  return create({
    base: sbBase,
    ...BRAND,
    fontBase: "var(--font-family)",
    fontCode:
      'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    appBg: "var(--color-bg-page)",
    appContentBg: "var(--color-bg-surface)",
    appPreviewBg: "var(--color-bg-page)",
    appBorderColor: "var(--color-border-default)",
    textColor: "var(--color-text-primary)",
    textMutedColor: "var(--color-text-secondary)",
    textInverseColor: "var(--color-theme-text)",
    barBg: "var(--color-bg-sidebar)",
    barTextColor: "var(--color-text-primary)",
    barHoverColor: "var(--color-text-secondary)",
    barSelectedColor: "var(--color-theme-primary)",
    colorPrimary: "var(--color-theme-primary)",
    colorSecondary: "var(--color-text-secondary)",
    inputBg: "var(--color-bg-surface)",
    inputBorder: "var(--color-border-default)",
    inputTextColor: "var(--color-text-primary)",
    buttonBg: "var(--color-bg-surface)",
    buttonBorder: "var(--color-border-default)",
    booleanBg: "var(--color-surface-mist)",
    booleanSelectedBg: "var(--color-theme-primary)",
  });
}

/** Only `dark` uses Storybook dark math; accent themes stay light base with token swaps */
function storybookChromeBase(theme: string): "light" | "dark" {
  return theme === "dark" ? "dark" : "light";
}

function readToolbarTheme(globals: Record<string, unknown> | undefined): string {
  const t = globals?.theme;
  return typeof t === "string" && t.length ? t : "light";
}

function syncManagerUi(globals?: Record<string, unknown>): void {
  const toolbarTheme = readToolbarTheme(globals);
  applyDataTheme(toolbarTheme);
  addons.setConfig({
    theme: buildManagerTheme(storybookChromeBase(toolbarTheme)),
  });
}

/** First paint before preview emits globals — classic light Governance */
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
