/**
 * Guard: every dark theme must redefine the neutral fill scales. Anything a dark block leaves out
 * falls back to the light `:root` value — e.g. a Table header on `--color-mist-40` turns white.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(__dirname, "tokens.css"), "utf8");

/** Merged declarations of every rule whose selector targets `[data-theme="<id>"]` (later wins). */
function block(id: string): Record<string, string> {
  const out: Record<string, string> = {};
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const rule of noComments.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!rule[1].includes(`[data-theme="${id}"]`)) continue;
    for (const m of rule[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  }
  return out;
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

const FILLS = ["--color-mist-20", "--color-mist-40", "--color-mist-60", "--color-mist-80", "--color-mist-100"];

describe.each(["dark", "infinia-dark"])("%s theme neutral fills", (id) => {
  const decls = block(id);
  it.each(FILLS)("%s is defined and dark", (token) => {
    const value = decls[token];
    expect(value, `${token} missing in ${id} — it would fall back to a light :root fill`).toBeDefined();
    expect(value).toMatch(/^#[0-9a-f]{6}$/i);
    expect(luminance(value)).toBeLessThan(0.1);
  });
});

describe("classic scope", () => {
  it("the default palette can be re-applied on a nested element via [data-theme=\"classic\"]", () => {
    expect(css).toMatch(/:root,\s*\[data-theme="classic"\]\s*\{/);
  });
});
