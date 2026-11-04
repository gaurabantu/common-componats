import type { ContextMenuPosition } from "./ContextMenu.types";

export interface ContextMenuPlacement {
  top: number;
  left: number;
  maxHeight: number;
}

/**
 * Place a menu of `width` x `height` at `point`, flipping to the left / above the point when it
 * would overflow, then clamping inside the viewport (minus `padding`).
 */
export function computeContextMenuPosition(
  point: ContextMenuPosition,
  width: number,
  height: number,
  viewport: { width: number; height: number },
  padding = 8
): ContextMenuPlacement {
  const maxW = Math.max(0, viewport.width - padding * 2);
  const maxH = Math.max(0, viewport.height - padding * 2);
  const w = Math.min(width, maxW);
  const h = Math.min(height, maxH);

  let left = point.x;
  if (left + w > viewport.width - padding) left = point.x - w;
  let top = point.y;
  if (top + h > viewport.height - padding) top = point.y - h;

  left = Math.min(Math.max(left, padding), viewport.width - padding - w);
  top = Math.min(Math.max(top, padding), viewport.height - padding - h);

  return { top, left, maxHeight: maxH };
}
