import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist", "**/*.stories.*"],
  },
  resolve: {
    alias: {
      "ui-pan-validators/validators": path.resolve(__dirname, ".storybook/mocks/ui-pan-validators-validators.js"),
      "ui-pan-validators/mask": path.resolve(__dirname, ".storybook/mocks/ui-pan-validators-mask.js"),
      "ui-pan-validators": path.resolve(__dirname, ".storybook/mocks/ui-pan-validators.js"),
    },
  },
});
