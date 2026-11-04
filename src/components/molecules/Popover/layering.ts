import { createContext } from "react";

/**
 * Overlay layering helpers shared by Popover, DropdownMenu, ContextMenu and the tooltips.
 *
 * Default layers come from tokens.css (`--z-popover`, `--z-tooltip-top`), which sit above the
 * library's own Drawer (`--z-drawer`) and Modal (`--z-modal`). Host apps often stack their own
 * overlays far higher (z 1000–10000+), so when no explicit `zIndex` is passed the floating layer
 * also lifts itself one step above the highest z-index found on its anchor's ancestors — a menu
 * opened from inside any dialog renders on top of that dialog by default.
 */

/** Fallback for `--z-popover` when tokens.css is not loaded. Above `--z-modal` (400). */
export const DEFAULT_POPOVER_Z = 450;
/** Fallback for `--z-tooltip-top` when tokens.css is not loaded. */
export const DEFAULT_TOOLTIP_Z = 600;

export type LayerZIndex = number | string;

/** Highest numeric z-index on `el` and its ancestors (0 when none is set). */
export function getAncestorZIndex(el: Element | null | undefined): number {
  if (!el || typeof window === "undefined" || typeof window.getComputedStyle !== "function") return 0;
  let max = 0;
  let node: Element | null = el;
  while (node && node !== document.body && node !== document.documentElement) {
    let raw = "";
    try {
      raw = window.getComputedStyle(node).zIndex;
    } catch {
      raw = "";
    }
    if (!raw && node instanceof HTMLElement) raw = node.style.zIndex;
    const z = parseInt(raw, 10);
    if (Number.isFinite(z) && z > max) max = z;
    node = node.parentElement;
  }
  return max;
}

/** Reads a numeric CSS custom property from :root, or `fallback` when missing / unparsable. */
export function readZToken(tokenName: string, fallback: number): number {
  if (typeof window === "undefined" || typeof document === "undefined") return fallback;
  try {
    const raw = window.getComputedStyle(document.documentElement).getPropertyValue(tokenName);
    const z = parseInt(raw, 10);
    return Number.isFinite(z) ? z : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Resolve the z-index for a floating layer.
 * - `explicit` wins when provided (number or any CSS value such as `"var(--my-z)"`).
 * - Otherwise the token layer (`var(--token, fallback)`), lifted to `ancestorZ + 1` when the
 *   anchor lives inside something stacked higher than the token.
 */
export function resolveLayerZIndex(
  anchor: Element | null | undefined,
  explicit: LayerZIndex | undefined,
  tokenName = "--z-popover",
  fallback = DEFAULT_POPOVER_Z
): LayerZIndex {
  if (explicit !== undefined && explicit !== null && explicit !== "") return explicit;
  const tokenValue = `var(${tokenName}, ${fallback})`;
  const ancestorZ = getAncestorZIndex(anchor);
  if (ancestorZ <= 0) return tokenValue;
  const tokenZ = readZToken(tokenName, fallback);
  return ancestorZ + 1 > tokenZ ? ancestorZ + 1 : tokenValue;
}

/* ---------------------------------------------------------------------------------------------
 * Floating-layer stack: with nested popovers / menus, one Escape press closes only the top one.
 * Layers record their parent (from FloatingLayerContext) so nesting wins over mount order —
 * children's effects run before their parents', so push order alone is not enough.
 * ------------------------------------------------------------------------------------------- */
interface FloatingEntry {
  id: string;
  parent: string | null;
}
const floatingStack: FloatingEntry[] = [];

/** Id of the floating layer a component renders inside (null at the top level). */
export const FloatingLayerContext = createContext<string | null>(null);

export function pushFloatingLayer(id: string, parent: string | null = null): void {
  popFloatingLayer(id);
  floatingStack.push({ id, parent });
}

export function popFloatingLayer(id: string): void {
  const i = floatingStack.findIndex((e) => e.id === id);
  if (i >= 0) floatingStack.splice(i, 1);
}

/** Top = an open layer with no open descendants, and the most recently opened such layer. */
export function isTopFloatingLayer(id: string): boolean {
  if (floatingStack.length === 0) return true;
  const parents = new Set(floatingStack.map((e) => e.parent));
  const leaves = floatingStack.filter((e) => !parents.has(e.id));
  const top = leaves[leaves.length - 1];
  return !top || top.id === id;
}
