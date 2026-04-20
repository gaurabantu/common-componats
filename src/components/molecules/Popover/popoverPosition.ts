export type PopoverPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

const GAP = 8;
const VIEWPORT = 8;

export interface PopoverPositionResult {
  top: number;
  left: number;
  width?: number;
  maxHeight?: number;
}

/**
 * Fixed positioning for popover panel relative to trigger rect (viewport coordinates).
 */
export function computePopoverPosition(
  triggerRect: DOMRect,
  contentWidth: number,
  contentHeight: number,
  placement: PopoverPlacement
): PopoverPositionResult {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;

  const cw = Math.min(contentWidth, vw - VIEWPORT * 2);
  const ch = Math.min(contentHeight, vh - VIEWPORT * 2);

  let top: number;
  let left: number;

  const placeBottom = placement.startsWith("bottom");
  const alignEnd = placement.endsWith("end");

  if (placeBottom) {
    top = triggerRect.bottom + GAP;
    if (top + ch > vh - VIEWPORT) {
      const above = triggerRect.top - GAP - ch;
      if (above >= VIEWPORT) {
        top = above;
      } else {
        top = Math.max(VIEWPORT, vh - VIEWPORT - ch);
      }
    }
  } else {
    top = triggerRect.top - GAP - ch;
    if (top < VIEWPORT) {
      const below = triggerRect.bottom + GAP;
      if (below + ch <= vh - VIEWPORT) {
        top = below;
      } else {
        top = VIEWPORT;
      }
    }
  }

  if (alignEnd) {
    left = triggerRect.right - cw;
  } else {
    left = triggerRect.left;
  }

  left = Math.min(Math.max(left, VIEWPORT), vw - VIEWPORT - cw);

  return {
    top,
    left,
    width: cw,
    maxHeight: Math.min(ch, vh - VIEWPORT * 2),
  };
}
