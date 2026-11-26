/**
 * COMPLIANCE_REVIEWS (src/portal/data.ts) is a hand summary of `_fleet/VERDICT-*.md`. These tests
 * re-read every cited line so the dashboard cannot drift from what the reviewer actually wrote.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { COMPLIANCE_DIMENSIONS, COMPLIANCE_REVIEWS } from "../data";

const ROOT = path.resolve(__dirname, "../../..");
const LABEL = { a11y: "Accessibility", security: "Security", responsive: "Responsiveness" } as const;

/** `file:7-8` / `file:5,11` / `file:14` → the cited lines (1-based). */
function cited(ref: string): { file: string; lines: string[] } {
  const [file, spec] = ref.split(":");
  const text = readFileSync(path.join(ROOT, file), "utf8").split("\n");
  const nums = spec.split(",").flatMap((part) => {
    const [a, b] = part.split("-").map(Number);
    return b ? Array.from({ length: b - a + 1 }, (_, i) => a + i) : [a];
  });
  return { file, lines: nums.map((n) => text[n - 1] ?? "") };
}

/** Outcome of `dimension` on a line: "Accessibility **FAIL**" or a table cell in column order. */
function outcomeOn(line: string, dim: keyof typeof LABEL): "pass" | "fail" | null {
  const label = line.match(new RegExp(`${LABEL[dim]}\\s*\\**\\s*(PASS|FAIL)`, "i"));
  if (label) return label[1].toLowerCase() as "pass" | "fail";
  if (line.trim().startsWith("|")) {
    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
    const idx = { a11y: 1, security: 2, responsive: 3 }[dim];
    const m = cells[idx]?.match(/PASS|FAIL/i);
    if (m) return m[0].toLowerCase() as "pass" | "fail";
  }
  return null;
}

describe("COMPLIANCE_REVIEWS cites real verdict lines", () => {
  const dims = COMPLIANCE_DIMENSIONS.map((d) => d.id);

  it.each(COMPLIANCE_REVIEWS.map((r) => [r.id, r] as const))("%s — files exist", (_id, r) => {
    expect(existsSync(path.join(ROOT, r.file))).toBe(true);
    expect(r.source.startsWith(r.file)).toBe(true);
    expect(r.testsSource.startsWith(r.file)).toBe(true);
  });

  it.each(COMPLIANCE_REVIEWS.map((r) => [r.id, r] as const))("%s — a FAIL in the first round is written in a cited line", (_id, r) => {
    const { lines } = cited(r.source);
    for (const d of dims) {
      const seen = lines.map((l) => outcomeOn(l, d)).filter(Boolean);
      if (r.firstRound[d] === "fail") expect(seen, `${r.id} ${d}`).toContain("fail");
      else expect(seen, `${r.id} ${d}`).not.toContain("fail");
    }
  });

  it.each(COMPLIANCE_REVIEWS.map((r) => [r.id, r] as const))("%s — the cited lines carry a FINAL / final-iteration PASS", (_id, r) => {
    const { lines } = cited(r.source);
    const finalLine = lines.find((l) => /FINAL/.test(l));
    expect(finalLine, r.source).toBeDefined();
    expect(finalLine).toMatch(/PASS/);
    expect(finalLine).not.toMatch(/\bFAIL\b/);
    for (const d of dims) expect(r.final[d]).toBe("pass");
  });

  it.each(COMPLIANCE_REVIEWS.map((r) => [r.id, r] as const))("%s — test count is the vitest total on the cited line", (_id, r) => {
    const { lines } = cited(r.testsSource);
    expect(lines[0]).toMatch(/vitest run/);
    expect(lines[0]).toContain(`**${r.testsAtFinal} passed`);
  });

  it("rounds are 1–3 (the fleet loop allows at most 3 review iterations)", () => {
    for (const r of COMPLIANCE_REVIEWS) expect(r.rounds).toBeGreaterThanOrEqual(1);
    for (const r of COMPLIANCE_REVIEWS) expect(r.rounds).toBeLessThanOrEqual(3);
  });
});
