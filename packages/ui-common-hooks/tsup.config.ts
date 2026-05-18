import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/index.ts" },
  tsconfig: "tsconfig.build.json",
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react"],
});
