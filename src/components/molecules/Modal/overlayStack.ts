import { createContext } from "react";

/**
 * Shared overlay layer stack (Modal, Drawer). Only the top layer may handle Escape and
 * backdrop dismissal, so one Escape closes one layer — the innermost first.
 *
 * Nesting: a layer rendered inside another layer's React subtree passes that layer's id as
 * `parentId` (read from `OverlayLayerContext`). React runs child effects before parent effects,
 * so when both open in the same commit the child is pushed first; the parent is then inserted
 * below it instead of on top.
 */

interface Layer {
  id: string;
  parentId?: string;
}

let stack: Layer[] = [];

/** Id of the nearest enclosing overlay layer (undefined at the top level). */
export const OverlayLayerContext = createContext<string | undefined>(undefined);

export function pushLayer(id: string, parentId?: string): void {
  stack = stack.filter((layer) => layer.id !== id);
  const layer: Layer = { id, parentId };
  const firstChild = stack.findIndex((l) => isDescendantOf(l, id));
  if (firstChild === -1) stack.push(layer);
  else stack.splice(firstChild, 0, layer);
}

export function popLayer(id: string): void {
  stack = stack.filter((layer) => layer.id !== id);
}

export function isTopLayer(id: string): boolean {
  return stack.length > 0 && stack[stack.length - 1].id === id;
}

/** Test helper — current stack ids, bottom to top. */
export function getLayerIds(): string[] {
  return stack.map((layer) => layer.id);
}

function isDescendantOf(layer: Layer, ancestorId: string): boolean {
  let parentId = layer.parentId;
  const seen = new Set<string>();
  while (parentId && !seen.has(parentId)) {
    if (parentId === ancestorId) return true;
    seen.add(parentId);
    parentId = stack.find((l) => l.id === parentId)?.parentId;
  }
  return false;
}
