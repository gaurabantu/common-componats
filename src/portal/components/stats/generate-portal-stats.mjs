#!/usr/bin/env node
/**
 * Build-time generator for the Storybook portal (Overview/Dashboard + Overview/Components).
 *
 * Writes `src/portal/components/stats/portal-stats.json` with figures the portal cannot compute in
 * the browser — every number comes from the repository, nothing is typed in by hand:
 *   - tests        `vitest run --reporter=json` totals (skipped with --skip-tests: previous totals kept)
 *   - library      component folders per layer + runtime exports of `src/index.tsx` (TypeScript AST)
 *   - hooks        runtime `use*` exports of `packages/ui-common-hooks/src/index.ts`
 *   - growth       the same library counts at the last commit of each `package.json` version (git)
 *   - props        own members of every `*Props` interface named in `src/portal/data.ts` (`props: "…"`)
 *
 * Usage (repo root):  node src/portal/components/stats/generate-portal-stats.mjs [--skip-tests]
 * Re-run after adding components or tests; commit the JSON with the change.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../../../..");
const OUT = path.join(HERE, "portal-stats.json");
const skipTests = process.argv.includes("--skip-tests");

const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");
const git = (...args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

/* ---------------- library shape ---------------- */

/** Atoms / molecules are one folder per component; charts are one module each in `charts/index.ts`. */
const FOLDER_LAYERS = ["atoms", "molecules"];
const chartCount = (indexSource) => [...indexSource.matchAll(/export \{ default as \w+ \}/g)].length;

/** Component folders that contain files (git does not track empty folders, so neither do we). */
function countDirs(dir) {
  if (!existsSync(dir)) return 0;
  return readdirSync(dir).filter((n) => {
    const p = path.join(dir, n);
    return statSync(p).isDirectory() && readdirSync(p).length > 0;
  }).length;
}

/** Runtime (non-type) export names of a barrel source. */
function runtimeExportNames(source) {
  const sf = ts.createSourceFile("index.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const names = new Set();
  for (const st of sf.statements) {
    if (!ts.isExportDeclaration(st) || st.isTypeOnly) continue;
    if (st.exportClause && ts.isNamedExports(st.exportClause)) {
      for (const el of st.exportClause.elements) if (!el.isTypeOnly) names.add(el.name.text);
    }
  }
  return names;
}
const runtimeExports = (source) => runtimeExportNames(source).size;

function libraryAt(readFile, listDirs) {
  const components = {};
  for (const layer of FOLDER_LAYERS) components[layer] = listDirs(`src/components/${layer}`);
  components.charts = chartCount(readFile("src/components/charts/index.ts"));
  const barrel = readFile("src/index.tsx");
  return { components, runtimeExports: barrel ? runtimeExports(barrel) : 0 };
}

const current = libraryAt(
  (p) => (existsSync(path.join(ROOT, p)) ? readFileSync(path.join(ROOT, p), "utf8") : ""),
  (p) => countDirs(path.join(ROOT, p)),
);

/** Hooks = runtime `use*` exports of the ui-common-hooks barrel. */
const hookNames = [
  ...runtimeExportNames(readFileSync(path.join(ROOT, "packages/ui-common-hooks/src/index.ts"), "utf8")),
].filter((n) => /^use[A-Z]/.test(n));
const hooks = hookNames.length;

/* ---------------- growth across releases (git) ---------------- */

function growth() {
  const commits = git("log", "--format=%H %ad", "--date=short", "--", "package.json").trim().split("\n");
  const byVersion = new Map(); // version -> newest commit carrying it (log is newest first)
  for (const line of commits) {
    const [sha, date] = line.split(" ");
    let version;
    try {
      version = JSON.parse(git("show", `${sha}:package.json`)).version;
    } catch {
      continue;
    }
    if (!byVersion.has(version)) byVersion.set(version, { sha, date });
  }
  const rows = [];
  for (const [version, { sha, date }] of byVersion) {
    const lib = libraryAt(
      (p) => {
        try {
          return git("show", `${sha}:${p}`);
        } catch {
          return "";
        }
      },
      (p) => {
        try {
          return git("ls-tree", "-d", "--name-only", `${sha}:${p}`).split("\n").filter(Boolean).length;
        } catch {
          return 0;
        }
      },
    );
    rows.push({ version, date, commit: sha.slice(0, 7), ...lib });
  }
  rows.reverse(); // oldest first

  // A commit that moved package.json to a LOWER version than an earlier release (an accidental
  // downgrade) is not a release — drop it so the x-axis always reads in release order.
  const semver = (v) => v.split(/[.-]/).slice(0, 3).map(Number);
  const lower = (a, b) => {
    const [x, y] = [semver(a), semver(b)];
    for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] < y[i];
    return false;
  };
  let highest = null;
  for (let i = 0; i < rows.length; i++) {
    if (highest && lower(rows[i].version, highest)) rows.splice(i--, 1);
    else highest = rows[i].version;
  }

  // The release being prepared: the working-tree package.json version is usually bumped before it is
  // committed, so git alone would leave the chart one release behind. Count it from the working tree.
  const pkgVersion = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
  const workingTree = { version: pkgVersion, date: new Date().toISOString().slice(0, 10), commit: "working tree", ...current };
  const last = rows[rows.length - 1];
  if (!last || last.version !== pkgVersion) {
    rows.push(workingTree);
  } else if (JSON.stringify({ ...last, version: 0, date: 0, commit: 0 }) !== JSON.stringify({ ...workingTree, version: 0, date: 0, commit: 0 })) {
    rows[rows.length - 1] = workingTree; // same version, newer uncommitted counts
  }
  return rows;
}

/* ---------------- tests (vitest JSON reporter) ---------------- */

function runTests() {
  const dir = mkdtempSync(path.join(tmpdir(), "portal-stats-"));
  const file = path.join(dir, "vitest.json");
  try {
    try {
      execFileSync("npx", ["vitest", "run", "--reporter=json", `--outputFile=${file}`], {
        cwd: ROOT,
        stdio: ["ignore", "ignore", "inherit"],
        maxBuffer: 256 * 1024 * 1024,
      });
    } catch {
      /* non-zero exit on failures — the JSON still records them */
    }
    const r = JSON.parse(readFileSync(file, "utf8"));
    return {
      files: r.testResults.length,
      total: r.numTotalTests,
      passed: r.numPassedTests,
      failed: r.numFailedTests,
      runAt: new Date(r.startTime).toISOString().slice(0, 10),
      command: "npx vitest run",
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/* ---------------- props of the interfaces the gallery shows ---------------- */

function wantedInterfaces() {
  const data = readFileSync(path.join(ROOT, "src/portal/data.ts"), "utf8");
  return new Set([...data.matchAll(/props:\s*"(\w+)"/g)].map((m) => m[1]));
}

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = path.join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(n) && !/\.(test|stories)\.tsx?$/.test(n)) out.push(p);
  }
  return out;
}

const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const squash = (s) => s.replace(/\s+/g, " ").trim();

function jsDocOf(node, sf) {
  const ranges = ts.getLeadingCommentRanges(sf.text, node.pos) ?? [];
  const doc = ranges.map((r) => sf.text.slice(r.pos, r.end)).filter((c) => c.startsWith("/**")).pop();
  if (!doc) return { text: "", deprecated: false };
  const body = doc
    .replace(/^\/\*\*|\*\/$/g, "")
    .split("\n")
    .map((l) => l.replace(/^\s*\*\s?/, ""))
    .join(" ");
  const deprecated = /@deprecated/.test(body);
  const text = squash(body.split(/\s@\w+/)[0]).replace(/`/g, "");
  const first = text.match(/^.*?[.!?](\s|$)/)?.[0] ?? text;
  return { text: clip(first.trim(), 160), deprecated };
}

function extractProps() {
  const wanted = wantedInterfaces();
  const unions = new Map(); // alias name -> string literal values
  const decls = new Map(); // interface / type-alias name -> { node, sf, file } (first declaration wins)
  for (const file of walk(path.join(ROOT, "src/components"))) {
    const sf = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
    for (const st of sf.statements) {
      if (ts.isTypeAliasDeclaration(st) && ts.isUnionTypeNode(st.type)) {
        const lits = st.type.types
          .filter((t) => ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal))
          .map((t) => t.literal.text);
        if (lits.length && lits.length === st.type.types.length) unions.set(st.name.text, lits);
      }
      if ((ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st)) && !decls.has(st.name.text)) {
        decls.set(st.name.text, { node: st, sf, file });
      }
    }
  }

  const propOf = (m, sf, from) => {
    const typeText = m.type ? squash(m.type.getText(sf)) : "unknown";
    const isStr = (t) => ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal);
    const literalValues = !m.type
      ? []
      : ts.isUnionTypeNode(m.type)
        ? m.type.types.filter(isStr).map((t) => t.literal.text)
        : isStr(m.type)
          ? [m.type.literal.text]
          : [];
    const values = literalValues.length ? literalValues : unions.get(typeText) ?? [];
    const doc = jsDocOf(m, sf);
    return {
      name: m.name.getText(sf),
      type: clip(typeText, 90),
      required: !m.questionToken,
      ...(from ? { from } : {}),
      ...(doc.text ? { doc: doc.text } : {}),
      ...(doc.deprecated ? { deprecated: true } : {}),
      ...(values.length ? { values } : {}),
    };
  };

  /** Name of a library type referenced by `X`, `Omit<X, …>` or `Pick<X, …>` (React / DOM types are skipped). */
  const refName = (typeNode) => {
    if (!typeNode) return null;
    const expr = ts.isExpressionWithTypeArguments(typeNode) ? typeNode.expression : ts.isTypeReferenceNode(typeNode) ? typeNode.typeName : null;
    if (!expr) return null;
    const name = expr.getText();
    if ((name === "Omit" || name === "Pick") && typeNode.typeArguments?.[0]) return refName(typeNode.typeArguments[0]);
    return decls.has(name) ? name : null;
  };

  /** Own members first, then inherited library members (one entry per prop name), max depth 3. */
  const collect = (name, depth, from, seen, out) => {
    const d = decls.get(name);
    if (!d || depth > 3 || seen.has(name)) return;
    seen.add(name);
    const { node, sf } = d;
    const addMembers = (members) => {
      for (const m of members) {
        if (!ts.isPropertySignature(m) || !m.name) continue;
        const key = m.name.getText(sf);
        const next = propOf(m, sf, from);
        const prev = out.get(key);
        if (!prev) out.set(key, next);
        else if (prev.values && next.values) {
          // Discriminated unions (e.g. FeedbackStateProps.variant): merge the literal values.
          prev.values = [...new Set([...prev.values, ...next.values])];
          prev.type = clip(prev.values.map((v) => JSON.stringify(v)).join(" | "), 90);
        }
      }
    };
    const visitType = (t) => {
      if (ts.isTypeLiteralNode(t)) addMembers(t.members);
      else if (ts.isUnionTypeNode(t) || ts.isIntersectionTypeNode(t)) t.types.forEach(visitType);
      else if (ts.isParenthesizedTypeNode(t)) visitType(t.type);
      else {
        const r = refName(t);
        if (r) collect(r, depth + 1, depth === 0 && !from ? null : from ?? r, seen, out);
      }
    };
    if (ts.isInterfaceDeclaration(node)) {
      addMembers(node.members);
      for (const h of node.heritageClauses ?? []) {
        for (const t of h.types) {
          const r = refName(t);
          if (r) collect(r, depth + 1, from ?? r, seen, out);
        }
      }
    } else {
      visitType(node.type);
    }
  };

  const out = {};
  for (const name of wanted) {
    const d = decls.get(name);
    if (!d) continue;
    const props = new Map();
    collect(name, 0, null, new Set(), props);
    const ext = ts.isInterfaceDeclaration(d.node)
      ? (d.node.heritageClauses ?? []).flatMap((h) => h.types.map((t) => clip(squash(t.getText(d.sf)), 60)))
      : [];
    out[name] = { file: rel(d.file), extends: ext, props: [...props.values()] };
  }
  const missing = [...wanted].filter((w) => !out[w]);
  return { interfaces: out, missing };
}

/* ---------------- write ---------------- */

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const tests = skipTests ? previous.tests ?? null : runTests();
const { interfaces, missing } = extractProps();

const stats = {
  $comment: "Generated by src/portal/components/stats/generate-portal-stats.mjs — do not edit by hand.",
  generatedAt: new Date().toISOString().slice(0, 10),
  tests,
  library: { ...current, hooks },
  growth: growth(),
  props: interfaces,
};

writeFileSync(OUT, `${JSON.stringify(stats, null, 1)}\n`);
console.log(
  `portal-stats: tests ${tests ? `${tests.passed}/${tests.total}` : "n/a"}, ` +
    `components ${JSON.stringify(current.components)}, exports ${current.runtimeExports}, hooks ${hooks}, ` +
    `${stats.growth.length} versions, ${Object.keys(interfaces).length} props interfaces` +
    (missing.length ? ` (missing: ${missing.join(", ")})` : ""),
);
