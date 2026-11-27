# Package notes

Internal dependency reference for library maintainers.

## Covers

- peer dependencies expected in consuming apps
- build / Storybook / test tooling
- why specific packages exist in `package.json`
- build output and the tree-shaking rules every new component must follow

For consumers installing the library, start with [`../../README.md`](../../README.md) instead of this file.

## Build output and tree-shaking (maintainers + AI authoring agents)

`npm run build` = `rimraf dist` → `tsup` (two configs in `tsup.config.ts`) → `scripts/inject-component-css.mjs`.

| Output | Built from | Used by |
|--------|------------|---------|
| `dist/*.mjs` + `dist/chunk-*.mjs` | **ESM, split per component** (`splitting: true`; one entry per component) | Bundlers (Next.js, Vite, webpack) via `exports.import` |
| `dist/styles/**.css` | Each component's own CSS, imported from the chunk that holds the component | Loaded automatically, tree-shaken with the JS |
| `dist/index.js`, `charts.js`, `shell.js`, `table.js`, `openui.js` | **CJS**, one bundle per public entry, no CSS imports | `require()` (Jest, Node) via `exports.require` |
| `dist/*.d.ts` | CJS config (`dts: true`) | Types |
| `dist/index.css`, `charts.css`, … | Full stylesheet per public entry | Fallback for toolchains that can't load CSS from `node_modules` |

Result: `import { Button } from "ui-common-components"` costs ~11 KB (JS + CSS) instead of ~630 KB.

### Rules when adding or changing a component

1. **Location decides the split.** These globs become their own entry automatically (see `componentEntries` in `tsup.config.ts`):
   `src/components/atoms/*/index.tsx`, `src/components/molecules/*/index.tsx`, `src/components/charts/*.tsx`, `src/theme/index.ts`.
   A new exported module **outside** these globs lands inside `index.mjs`; if it has any top-level side effect
   (`X.displayName = …`, `X[KEY] = true`, `new Map(...)`, unannotated `forwardRef`/`memo`/`createContext` calls)
   every consumer ships it. Add it to `componentEntries` instead.
2. **Import a component's CSS from the component module itself** (`import "./Name.css"` in `Name/index.tsx` or
   a file it imports). Never import component CSS from `src/index.tsx` or `src/entries/*` — CSS imported there
   is attached to the barrel and loads for every consumer.
3. **Keep `"sideEffects": ["**/*.css"]` in `package.json`.** It tells bundlers all JS is droppable but CSS
   imports are not. `"sideEffects": false` would silently strip every component's styles.
4. **Never reference build file names** (`chunk-XXXX.mjs`) in code or docs — they are content-hashed.
5. **Public entry points** are only the `exports` in `package.json`. A new subpath needs an entry in
   `publicEntries` (both formats) **and** an `exports` block.
6. **Verify after `npm run build`:** the log must print
   `[inject-component-css] N CSS files → dist/styles, wired into M chunks`, and `dist/index.mjs` must stay
   small (~12 KB, re-exports only). If `index.mjs` grows, rule 1 was broken.

### Known consumer caveat

The ESM files import `.css`, so plain Node cannot `import` them (`ERR_UNKNOWN_FILE_EXTENSION`). Bundlers are
fine; `require()` uses the CJS build. Consumer apps on Vitest need
`test.server.deps.inline: ["ui-common-components"]`.
