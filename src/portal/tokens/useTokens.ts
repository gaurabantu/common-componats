import { useEffect, useLayoutEffect, useMemo, useState, type RefObject } from "react";
import tokensCss from "../../design-system/tokens.css?raw";
import { baseTokens, parseTokenBlocks, themeNames, themeOverrides, type TokenDecl } from "./parseTokens";

/** Parsed once per page load from the shipped `tokens.css`. */
export const TOKENS_CSS: string = tokensCss;
export const BASE_TOKENS: TokenDecl[] = baseTokens(tokensCss);
export const THEME_OVERRIDES = themeOverrides(tokensCss);
export const THEME_NAMES = themeNames(tokensCss);
export const TOKEN_COUNT = new Set(parseTokenBlocks(tokensCss).flatMap((b) => b.tokens.map((t) => t.name))).size;
export const TOKENS_VERSION = (tokensCss.match(/Version:\s*([\d.]+)/) || [])[1] ?? "—";

export function tokensByPrefix(...prefixes: string[]): TokenDecl[] {
  return BASE_TOKENS.filter((t) => prefixes.some((p) => t.name.startsWith(p)));
}

/** Re-renders whenever `data-theme` changes on `<html>` (Storybook Theme toolbar). */
export function useThemeKey(): string {
  const read = () =>
    typeof document === "undefined" ? "light" : document.documentElement.getAttribute("data-theme") ?? "light";
  const [key, setKey] = useState(read);
  useEffect(() => {
    const obs = new MutationObserver(() => setKey(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return key;
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Resolved (computed) values for custom properties on `scope` (or `<html>`), refreshed on theme change.
 * `extraKey` lets callers force a refresh when a scoped `data-theme` changes.
 */
export function useResolvedTokens(
  names: string[],
  scope?: RefObject<HTMLElement | null>,
  extraKey?: string,
): Record<string, string> {
  const themeKey = useThemeKey();
  const signature = useMemo(() => names.join("|"), [names]);
  const [values, setValues] = useState<Record<string, string>>({});
  useIsoLayoutEffect(() => {
    const el = scope?.current ?? document.documentElement;
    const cs = getComputedStyle(el);
    const next: Record<string, string> = {};
    for (const n of names) next[n] = cs.getPropertyValue(n).trim();
    setValues(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, themeKey, extraKey]);
  return values;
}

/* ---------- Colour maths (WCAG relative luminance) ---------- */

export function parseColor(input: string): [number, number, number] | null {
  const v = input.trim().toLowerCase();
  let m = v.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let hex = m[1];
    if (hex.length === 3 || hex.length === 4) hex = hex.split("").map((c) => c + c).join("");
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
  }
  m = v.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1].split(/[\s,/]+/).filter(Boolean).slice(0, 3).map(Number);
    if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) return parts as [number, number, number];
  }
  return null;
}

/** Normalise any CSS colour the browser understands to rgb() via a probe element. */
export function toRgb(color: string): [number, number, number] | null {
  const direct = parseColor(color);
  if (direct || typeof document === "undefined") return direct;
  const probe = document.createElement("span");
  probe.style.color = color;
  document.body.appendChild(probe);
  const out = parseColor(getComputedStyle(probe).color);
  probe.remove();
  return out;
}

function luminance([r, g, b]: [number, number, number]): number {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function contrastRatio(fg: string, bg: string): number | null {
  const a = toRgb(fg);
  const b = toRgb(bg);
  if (!a || !b) return null;
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
