#!/usr/bin/env node
/**
 * Copies distributable assets into `.storybook/downloads/` (served at `downloads/` by Storybook
 * `staticDirs`) and writes `manifest.json` with version, size, and SHA-256 for the Downloads page.
 *
 * Runs automatically before `npm run storybook` and `npm run build-storybook`.
 * Missing sources are skipped with a warning (e.g. `dist/index.css` before the first `npm run build`).
 */
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, ".storybook", "downloads");

const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const hooksPkgPath = path.join(root, "packages", "ui-common-hooks", "package.json");
const hooksPkg = existsSync(hooksPkgPath) ? JSON.parse(readFileSync(hooksPkgPath, "utf8")) : { version: "0.0.0" };
const tokensVersion = (readFileSync(path.join(root, "src/design-system/tokens.css"), "utf8").match(/Version:\s*([\d.]+)/) || [])[1] || "—";

/** Newest tarball for a package prefix (root first, then docs/). */
function findTarball(prefix) {
  for (const dir of [root, path.join(root, "docs")]) {
    if (!existsSync(dir)) continue;
    const hits = readdirSync(dir)
      .filter((f) => f.startsWith(`${prefix}-`) && f.endsWith(".tgz"))
      .sort((a, b) => statSync(path.join(dir, b)).mtimeMs - statSync(path.join(dir, a)).mtimeMs);
    if (hits.length) return path.join(dir, hits[0]);
  }
  return null;
}

const versionFromTarball = (file, fallback) => (file ? path.basename(file).replace(/^.*-(\d[\w.-]*)\.tgz$/, "$1") : fallback);

const componentsTgz = findTarball("ui-common-components");
const hooksTgz = findTarball("ui-common-hooks");

const assets = [
  {
    id: "tokens",
    name: "tokens.css",
    kind: "css",
    version: tokensVersion,
    description: "All design tokens — colour, type, spacing, radius, elevation, motion and 8 themes. Import once at the app root.",
    source: path.join(root, "src/design-system/tokens.css"),
  },
  {
    id: "components",
    name: componentsTgz ? path.basename(componentsTgz) : `ui-common-components-${pkg.version}.tgz`,
    kind: "package",
    version: versionFromTarball(componentsTgz, pkg.version),
    description: "Component library — ESM + CJS + TypeScript types, tokens, Tailwind preset and docs. Installs without a registry.",
    source: componentsTgz,
  },
  {
    id: "hooks",
    name: hooksTgz ? path.basename(hooksTgz) : `ui-common-hooks-${hooksPkg.version}.tgz`,
    kind: "package",
    version: versionFromTarball(hooksTgz, hooksPkg.version),
    description: "Companion hooks package — 26 typed hooks for async phases, overlays, tables, gestures and more.",
    source: hooksTgz,
  },
  {
    id: "css",
    name: "index.css",
    kind: "css",
    version: pkg.version,
    description: "Compiled component stylesheet (molecules such as AppSidebar / AppTopbar). Import after tokens.css.",
    source: path.join(root, "dist/index.css"),
  },
  {
    id: "preset",
    name: "tailwind.preset.js",
    kind: "js",
    version: pkg.version,
    description: "Tailwind preset mapping utilities (bg-surface, text-h2, gap-3 …) to the same tokens.",
    source: path.join(root, "tailwind.preset.js"),
  },
];

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const manifest = { generatedAt: new Date().toISOString(), library: pkg.name, assets: [] };

for (const asset of assets) {
  const { source, ...meta } = asset;
  if (!source || !existsSync(source)) {
    console.warn(`[downloads] skipped ${asset.name} — source not found`);
    manifest.assets.push({ ...meta, available: false });
    continue;
  }
  const buf = readFileSync(source);
  copyFileSync(source, path.join(outDir, asset.name));
  manifest.assets.push({
    ...meta,
    available: true,
    file: `downloads/${asset.name}`,
    bytes: buf.length,
    sha256: createHash("sha256").update(buf).digest("hex"),
  });
}

writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`[downloads] ${manifest.assets.filter((a) => a.available).length}/${assets.length} assets → .storybook/downloads`);
