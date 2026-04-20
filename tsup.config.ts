// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.tsx",
    charts: "src/entries/charts.ts",
    shell: "src/entries/shell.ts",
    table: "src/entries/table.ts",
  },
  tsconfig: "tsconfig.build.json",
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  esbuildOptions: (options) => {
    options.loader = {
      ...options.loader,
      ".svg": "dataurl", // This inlines SVGs as base64 data URLs
    };
  },
});