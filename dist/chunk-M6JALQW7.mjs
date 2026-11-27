// src/components/molecules/Popover/layering.ts
import { createContext } from "react";
var DEFAULT_POPOVER_Z = 450;
var DEFAULT_TOOLTIP_Z = 600;
function getAncestorZIndex(el) {
  if (!el || typeof window === "undefined" || typeof window.getComputedStyle !== "function")
    return 0;
  let max = 0;
  let node = el;
  while (node && node !== document.body && node !== document.documentElement) {
    let raw = "";
    try {
      raw = window.getComputedStyle(node).zIndex;
    } catch (e) {
      raw = "";
    }
    if (!raw && node instanceof HTMLElement)
      raw = node.style.zIndex;
    const z = parseInt(raw, 10);
    if (Number.isFinite(z) && z > max)
      max = z;
    node = node.parentElement;
  }
  return max;
}
function readZToken(tokenName, fallback) {
  if (typeof window === "undefined" || typeof document === "undefined")
    return fallback;
  try {
    const raw = window.getComputedStyle(document.documentElement).getPropertyValue(tokenName);
    const z = parseInt(raw, 10);
    return Number.isFinite(z) ? z : fallback;
  } catch (e) {
    return fallback;
  }
}
function resolveLayerZIndex(anchor, explicit, tokenName = "--z-popover", fallback = DEFAULT_POPOVER_Z) {
  if (explicit !== void 0 && explicit !== null && explicit !== "")
    return explicit;
  const tokenValue = `var(${tokenName}, ${fallback})`;
  const ancestorZ = getAncestorZIndex(anchor);
  if (ancestorZ <= 0)
    return tokenValue;
  const tokenZ = readZToken(tokenName, fallback);
  return ancestorZ + 1 > tokenZ ? ancestorZ + 1 : tokenValue;
}
var floatingStack = [];
var FloatingLayerContext = createContext(null);
function pushFloatingLayer(id, parent = null) {
  popFloatingLayer(id);
  floatingStack.push({ id, parent });
}
function popFloatingLayer(id) {
  const i = floatingStack.findIndex((e) => e.id === id);
  if (i >= 0)
    floatingStack.splice(i, 1);
}
function isTopFloatingLayer(id) {
  if (floatingStack.length === 0)
    return true;
  const parents = new Set(floatingStack.map((e) => e.parent));
  const leaves = floatingStack.filter((e) => !parents.has(e.id));
  const top = leaves[leaves.length - 1];
  return !top || top.id === id;
}

export {
  DEFAULT_POPOVER_Z,
  DEFAULT_TOOLTIP_Z,
  getAncestorZIndex,
  resolveLayerZIndex,
  FloatingLayerContext,
  pushFloatingLayer,
  popFloatingLayer,
  isTopFloatingLayer
};
//# sourceMappingURL=chunk-M6JALQW7.mjs.map