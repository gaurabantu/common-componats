import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
/**
 * Tailwind + tokens — required for `DashboardShell`, `AppTopbar`, and stories using `className` presets
 * (`text-h1`, `bg-surface`, spacing scale, etc.). `globals.css` already imports `tokens.css`.
 */
import "../app/globals.css";
import "./preview.css";
import { applyDataTheme } from "./theme-bridge";

/** Same `data-theme` bridge as consumer apps — see `docs/design-system/THEMES.md`. */
function withTheme(Story: React.ComponentType, context: { globals: { theme?: string } }) {
  const theme = context.globals.theme ?? "light";
  const Bridge = () => {
    useEffect(() => {
      applyDataTheme(theme);
    }, [theme]);
    return <Story />;
  };
  return <Bridge />;
}

const preview: Preview = {
  /**
   * Storybook 8 a11y: automatic axe runs via `experimental_afterEach` unless BOTH are set:
   * - `parameters.a11y` (manual / test off), AND
   * - `globals.a11y.manual` (toolbar). Defaults ship with `globals.a11y.manual: false`, so clicks
   *   could still trigger heavy axe runs and freeze the iframe. See addon-a11y `preview.mjs`.
   */
  initialGlobals: {
    a11y: {
      manual: true,
    },
  },
  globalTypes: {
    theme: {
      description:
        'Sets data-theme on <html> — classic (none), blue, dark, green, mist, custom, blue-mist, green-mist (tokens.css)',
      defaultValue: "light",
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
    /** Default white canvas improves contrast for secondary text vs gray page (Lighthouse). */
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
          "Design System",
          ["Introduction", "Theme showcase", ["Dashboard", "*"], ["Atoms", "*"], ["Molecules", "*"]],
        ],
        locales: "en-US",
      },
    },
  },
};

export default preview;
