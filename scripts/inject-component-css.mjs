#!/usr/bin/env node
/**
 * Per-component CSS for the split ESM build (runs after tsup, see tsup.config.ts).
 *
 * esbuild pulls every `import "./X.css"` out of the JS and merges it into one CSS file
 * per entry (dist/index.css). That forces apps to load the styles of every component.
 * This script restores the imports so CSS is tree-shaken together with the JS:
 *
 *   1. Reads the esbuild metafile to find which CSS sources each ESM chunk's modules import.
 *   2. Writes each CSS source once to dist/styles/<path under src>.css (autoprefixed, as before).
 *   3. Prepends `import "./styles/....css";` to the chunk that holds those modules.
 *      An app that never imports the component never loads the chunk, and so never loads its CSS.
 *   4. Removes the CSS files esbuild produced for the per-component entries (unused) and the metafile.
 *
 * dist/index.css, charts.css, shell.css, table.css and openui.css are kept for apps that
 * still import the full stylesheet.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative } from "node:path";
import autoprefixer from "autoprefixer";
import postcss from "postcss";

const DIST = "dist";
const METAFILE = join(DIST, "metafile-esm.json");
const STYLES_DIR = "styles";
const MARKER = "/* ucs:component-css */";
const KEEP_ENTRY_CSS = new Set(["index", "charts", "shell", "table", "openui"]);

if (!existsSync(METAFILE)) {
  console.error(`[inject-component-css] ${METAFILE} not found — is "metafile: true" set on the ESM build?`);
  process.exit(1);
}

const meta = JSON.parse(readFileSync(METAFILE, "utf8"));
const processor = postcss([autoprefixer]);
const written = new Set();
const toPosix = (p) => p.split("\\").join("/");

/** CSS sources imported by one source module, in import order. */
function cssImportsOf(input) {
  return (meta.inputs[input]?.imports ?? [])
    .map((imp) => toPosix(imp.path))
    .filter((p) => p.endsWith(".css") && meta.inputs[p]);
}

/** Write src/a/b/X.css → dist/styles/a/b/X.css once; return the dist path. */
async function emitCss(source) {
  const target = join(DIST, STYLES_DIR, toPosix(source).replace(/^src\//, ""));
  if (!written.has(target)) {
    const css = readFileSync(source, "utf8");
    const result = await processor.process(css, { from: source, to: target });
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, result.css);
    written.add(target);
  }
  return target;
}

let chunksWired = 0;
for (const [outFile, output] of Object.entries(meta.outputs)) {
  if (!outFile.endsWith(".mjs")) continue;

  const cssSources = [];
  for (const input of Object.keys(output.inputs)) {
    for (const css of cssImportsOf(input)) if (!cssSources.includes(css)) cssSources.push(css);
  }
  if (cssSources.length === 0) continue;

  const code = readFileSync(outFile, "utf8");
  if (code.includes(MARKER)) continue; // already wired (watch-mode rerun)

  const importLines = [];
  for (const source of cssSources) {
    const target = await emitCss(source);
    let spec = posix.normalize(toPosix(relative(dirname(outFile), target)));
    if (!spec.startsWith(".")) spec = `./${spec}`;
    importLines.push(`import "${spec}";`);
  }
  const header = [MARKER, ...importLines];
  writeFileSync(outFile, `${header.join("\n")}\n${code}`);

  // Keep the source map aligned: every prepended line is an empty mapping line.
  const mapFile = `${outFile}.map`;
  if (existsSync(mapFile)) {
    const map = JSON.parse(readFileSync(mapFile, "utf8"));
    map.mappings = ";".repeat(header.length) + map.mappings;
    writeFileSync(mapFile, JSON.stringify(map));
  }
  chunksWired++;
}

// CSS bundles esbuild wrote for the per-component entries (dist/atoms/X.css, …) are not referenced.
for (const outFile of Object.keys(meta.outputs)) {
  if (!/\.css(\.map)?$/.test(outFile)) continue;
  const entryName = toPosix(relative(DIST, outFile)).replace(/\.css(\.map)?$/, "");
  if (!KEEP_ENTRY_CSS.has(entryName)) rmSync(outFile, { force: true });
}
rmSync(METAFILE, { force: true });

console.log(`[inject-component-css] ${written.size} CSS files → ${DIST}/${STYLES_DIR}, wired into ${chunksWired} chunks`);
