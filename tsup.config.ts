// tsup.config.ts
import { globSync } from "node:fs";
import { defineConfig, type Options } from "tsup";

/**
 * Public entry points (package.json "exports"). Both formats build these.
 */
const publicEntries: Record<string, string> = {
  index: "src/index.tsx",
  charts: "src/entries/charts.ts",
  shell: "src/entries/shell.ts",
  table: "src/entries/table.ts",
  // AI entry (OpenUI). @openuidev/react-lang + zod are dependencies, kept external.
  openui: "src/entries/openui.ts",
};

/**
 * Tree-shaking entries (ESM only). Each component becomes its own entry so that,
 * with `splitting`, its code lands in its own chunk instead of one giant index.mjs.
 * The bundler in the consuming app can then drop every chunk the app never imports
 * (package.json "sideEffects" marks all JS as side-effect free).
 *
 * Keys keep the atoms/ and molecules/ folder because atoms/ToolTip and
 * molecules/Tooltip would otherwise collide on case-insensitive file systems.
 */
const notStoryOrTest = (f: string) => !/\.(stories|test)\.tsx?$/.test(f);
const componentEntries: Record<string, string> = {};
for (const file of globSync("src/components/{atoms,molecules}/*/index.tsx")) {
  componentEntries[file.split("/").slice(2, 4).join("/")] = file;
}
for (const file of globSync("src/components/charts/*.tsx").filter(notStoryOrTest)) {
  componentEntries[`charts/${file.split("/")[3].replace(/\.tsx$/, "")}`] = file;
}
componentEntries.theme = "src/theme/index.ts";

const shared: Options = {
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
  // `npm run build` runs `clean` first; two configs cleaning in parallel would race.
  clean: false,
  esbuildOptions: (options) => {
    options.loader = {
      ...options.loader,
      ".svg": "dataurl", // This inlines SVGs as base64 data URLs
    };
  },
};

export default defineConfig([
  // ESM — what bundlers (Next.js, Vite, webpack) use. Split per component for tree-shaking.
  // `scripts/inject-component-css.mjs` runs afterwards and wires each chunk to its own CSS.
  {
    ...shared,
    entry: { ...publicEntries, ...componentEntries },
    format: ["esm"],
    splitting: true,
    metafile: true,
    dts: false,
    onSuccess: "node scripts/inject-component-css.mjs",
  },
  // CJS — for require() consumers (Jest, Node). Single bundle per public entry, as before.
  // Also emits the .d.ts files. CSS is emitted by the ESM build only.
  {
    ...shared,
    entry: publicEntries,
    format: ["cjs"],
    dts: true,
    loader: { ".css": "empty" },
  },
]);
