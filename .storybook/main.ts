import type { StorybookConfig } from "@storybook/react-webpack5";
import type { Configuration } from "webpack";

/** GitHub project Pages (`https://<user>.github.io/<repo>/`) needs asset URLs under `/<repo>/`. Storybook 8 webpack has no `--base`; CI sets `STORYBOOK_BASE_PATH`. */
function previewPublicPath(): string | undefined {
  const raw = process.env.STORYBOOK_BASE_PATH?.trim();
  if (!raw) return undefined;
  const withSlash = raw.endsWith("/") ? raw : `${raw}/`;
  return withSlash.startsWith("/") ? withSlash : `/${withSlash}`;
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  /**
   * Perf (dev server “hangs” / slow first compile):
   * - `ts-loader` + `transpileOnly` is required here so `import type` and TS in stories parse correctly.
   * - `experimentalFileCaching` speeds ts-loader incremental builds.
   * - Webpack `filesystem` cache speeds rebuilds after the first run.
   * - `reactDocgen: "react-docgen"` is lighter than full `react-docgen-typescript` on large trees.
   * Avoid running `npm run dev` (tsup `--watch`) alongside Storybook — both compete for CPU/IO.
   * Accessibility: `preview.tsx` sets `parameters.a11y.manual` so axe-core does not run after every story
   * (large DOM + axe can freeze the tab). Run checks from Storybook’s Accessibility panel when needed.
   */
  typescript: {
    reactDocgen: "react-docgen",
  },
  webpackFinal: async (cfg) => {
    const base = previewPublicPath();
    if (base) {
      const w = cfg as Configuration;
      w.output = w.output ?? {};
      w.output.publicPath = base;
    }

    cfg.resolve = cfg.resolve ?? {};
    cfg.resolve.extensions = [...(cfg.resolve.extensions ?? []), ".ts", ".tsx"];

    cfg.module = cfg.module ?? { rules: [] };
    cfg.module.rules = cfg.module.rules ?? [];
    cfg.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader"),
          options: { transpileOnly: true, experimentalFileCaching: true },
        },
      ],
      exclude: /node_modules/,
    });

    cfg.cache = { type: "filesystem" };

    return cfg;
  },
};

export default config;
