import React from "react";
import type { Preview } from "@storybook/react";
/**
 * Tailwind + tokens — required for `DashboardShell`, `AppTopbar`, and stories using `className` presets
 * (`text-h1`, `bg-surface`, spacing scale, etc.). `globals.css` already imports `tokens.css`.
 */
import "../app/globals.css";
import "./preview.css";
import { addons, useEffect as useStorybookEffect } from "@storybook/preview-api";
import { GLOBALS_UPDATED, SET_GLOBALS } from "@storybook/core/core-events";
import { ThemedDocsContainer } from "./docs-container";
import {
  applyDataTheme,
  isDarkToolbarTheme,
  readStoredTheme,
  readThemeFromSearch,
  readToolbarTheme,
  storeTheme,
} from "./theme-bridge";

/**
 * Apply theme to the preview document: `data-theme` (token contract) + `color-scheme` (native
 * scrollbars / form controls follow dark themes), and remember it for the next visit.
 */
function applyPreviewTheme(toolbarTheme: string): void {
  applyDataTheme(toolbarTheme);
  document.documentElement.style.colorScheme = isDarkToolbarTheme(toolbarTheme) ? "dark" : "light";
  storeTheme(toolbarTheme);
}

/**
 * Initial theme: the iframe URL carries `globals=` when the manager URL does; otherwise use the
 * remembered choice. Seeds `initialGlobals.theme` so the manager toolbar, every story and every
 * Docs/MDX page start on the same theme after a reload — and paints it before React mounts.
 */
const initialTheme = readThemeFromSearch(window.location.search) ?? readStoredTheme() ?? "light";
applyDataTheme(initialTheme);
document.documentElement.style.colorScheme = isDarkToolbarTheme(initialTheme) ? "dark" : "light";

/**
 * Docs-only (MDX) pages have no story decorator, so the Theme toolbar would not reach them.
 * Listen on the preview channel and apply `data-theme` for every page type.
 */
const previewChannel = addons.getChannel();
const syncThemeFromGlobals = (payload: unknown) => {
  const globals = (payload as { globals?: Record<string, unknown> } | undefined)?.globals;
  if (!globals || typeof globals.theme !== "string") return;
  applyPreviewTheme(readToolbarTheme(globals));
};
previewChannel.on(SET_GLOBALS, syncThemeFromGlobals);
previewChannel.on(GLOBALS_UPDATED, syncThemeFromGlobals);

/**
 * Same `data-theme` bridge as consumer apps — see `docs/design-system/THEMES.md`.
 *
 * Uses Storybook's decorator hook (`useEffect` from `@storybook/preview-api`) and returns the
 * story element directly. It must NOT define a wrapper component inside the decorator: a new
 * component type per render made React remount the whole story on every theme change, which
 * dropped keyboard focus to <body> and reset component state (VERDICT-sprint5 L item 6).
 */
function withTheme(Story: React.ComponentType, context: { globals: { theme?: string } }) {
  const theme = context.globals.theme ?? "light";
  useStorybookEffect(() => {
    applyPreviewTheme(theme);
  }, [theme]);
  return <Story />;
}

const preview: Preview = {
  /**
   * Storybook 8 a11y: automatic axe runs via `experimental_afterEach` unless BOTH are set:
   * - `parameters.a11y` (manual / test off), AND
   * - `globals.a11y.manual` (toolbar). Defaults ship with `globals.a11y.manual: false`, so clicks
   *   could still trigger heavy axe runs and freeze the iframe. See addon-a11y `preview.mjs`.
   */
  initialGlobals: {
    theme: initialTheme,
    a11y: {
      manual: true,
    },
  },
  globalTypes: {
    theme: {
      description:
        'Sets data-theme on <html> — classic (none), blue, dark, green, mist, custom, blue-mist, green-mist, infinia-light, infinia-dark (tokens.css)',
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Classic (default)", icon: "sun" },
          { value: "blue", title: "Blue (explicit)", icon: "circle" },
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "green", title: "Green accents", icon: "graphline" },
          { value: "mist", title: "Ion mist", icon: "grid" },
          { value: "custom", title: "Custom (rose)", icon: "heart" },
          { value: "blue-mist", title: "Blue + mist", icon: "bookmark" },
          { value: "green-mist", title: "Green + mist", icon: "component" },
          { value: "infinia-light", title: "Infinia (Forma) light", icon: "sun" },
          { value: "infinia-dark", title: "Infinia (Forma) dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    /** Limit action log depth so rapid clicks do not grow the panel unbounded. */
    actions: { argTypesRegex: "^on[A-Z].*", depth: 20 },
    /**
     * addon-a11y: disable automatic axe in afterEach (`test: "off"`). Use the Accessibility panel
     * “Run” control when you want a check. `manual` alone is not enough if globals default to false.
     */
    a11y: {
      manual: true,
      test: "off",
    },
    controls: {
      sort: "requiredFirst",
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "padded",
    /**
     * Docs pages (autodocs + MDX) use Storybook's own emotion theme, which defaults to light.
     * `ThemedDocsContainer` swaps it per toolbar theme; `preview.css` pins docs surfaces to tokens.
     */
    docs: {
      container: ThemedDocsContainer,
    },
    /**
     * Canvas background — values are CSS variables, never a fixed colour, so the canvas follows
     * the active theme (surface in light themes, dark surface in dark themes).
     */
    backgrounds: {
      default: "surface",
      values: [
        { name: "governance-page", value: "var(--color-bg-page)" },
        { name: "surface", value: "var(--color-bg-surface)" },
        { name: "mist-60", value: "var(--color-mist-60)" },
      ],
    },
    /**
     * Do not set `defaultViewport` to a fixed 1440px width: the Docs tab embeds the preview and a
     * very wide iframe + Autodocs ArgsTable can make the page unresponsive on typical laptops.
     * Pick **Desktop 1440** from the viewport toolbar when you need it.
     */
    viewport: {
      viewports: {
        mobile375: {
          name: "Mobile 375",
          styles: { width: "375px", height: "667px" },
          type: "mobile",
        },
        tablet768: {
          name: "Tablet 768",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop1440: {
          name: "Desktop 1440",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
      },
    },
    /**
     * Use declarative `order` only — a `function` sort breaks `storybook build` (index cannot serialize it).
     * Order: Introduction → Dashboard → Atoms → Molecules → rest (alphabetically within each group).
     */
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Overview",
          ["Dashboard", "Components", "Welcome", "Getting Started", "Downloads", "Roadmap", "Release Notes"],
          "Foundations",
          ["Colors", "Typography", "Spacing & Layout", "Shape & Elevation", "Motion & Layers", "Themes", "All Tokens"],
          "Governance",
          ["Accessibility", "Composition Rules", "Quality Checklist"],
          "Design System",
          ["Theme showcase", ["Dashboard", "*"], ["Atoms", "*"], ["Molecules", "*"]],
        ],
        locales: "en-US",
      },
    },
  },
};

export default preview;
