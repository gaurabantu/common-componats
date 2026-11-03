import { TOOLTIP_GAP, TOOLTIP_VIEWPORT_PADDING } from "./Tooltip.config";
import type { TooltipAlign, TooltipPositionResult, TooltipSide } from "./Tooltip.types";

export interface TriggerRect {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface Viewport {
  width: number;
  height: number;
}

const OPPOSITE: Record<TooltipSide, TooltipSide> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

/** Free space between the trigger edge and the viewport edge on a given side. */
function spaceOn(side: TooltipSide, r: TriggerRect, vp: Viewport): number {
  switch (side) {
    case "top":
      return r.top - TOOLTIP_GAP - TOOLTIP_VIEWPORT_PADDING;
    case "bottom":
      return vp.height - r.bottom - TOOLTIP_GAP - TOOLTIP_VIEWPORT_PADDING;
    case "left":
      return r.left - TOOLTIP_GAP - TOOLTIP_VIEWPORT_PADDING;
    case "right":
      return vp.width - r.right - TOOLTIP_GAP - TOOLTIP_VIEWPORT_PADDING;
  }
}

/**
 * Resolve the side: keep the preferred side when the bubble fits; otherwise flip to the
 * opposite side when it fits there (or simply has more room).
 */
export function resolveTooltipSide(
  preferred: TooltipSide,
  r: TriggerRect,
  width: number,
  height: number,
  vp: Viewport,
): TooltipSide {
  const needed = preferred === "top" || preferred === "bottom" ? height : width;
  const here = spaceOn(preferred, r, vp);
  if (here >= needed) return preferred;
  const opposite = OPPOSITE[preferred];
  const there = spaceOn(opposite, r, vp);
  return there >= needed || there > here ? opposite : preferred;
}

function alignOffset(
  align: TooltipAlign,
  start: number,
  triggerSize: number,
  bubbleSize: number,
): number {
  if (align === "start") return start;
  if (align === "end") return start + triggerSize - bubbleSize;
  return start + triggerSize / 2 - bubbleSize / 2;
}

/**
 * Fixed-position coordinates (viewport space) for a tooltip bubble of `width`×`height`
 * next to `r`. Flips on the main axis, clamps on the cross axis.
 */
export function computeTooltipPosition(
  r: TriggerRect,
  width: number,
  height: number,
  preferredSide: TooltipSide,
  align: TooltipAlign,
  vp: Viewport,
): TooltipPositionResult {
  const side = resolveTooltipSide(preferredSide, r, width, height, vp);
  const pad = TOOLTIP_VIEWPORT_PADDING;
  let top: number;
  let left: number;

  if (side === "top" || side === "bottom") {
    top = side === "top" ? r.top - TOOLTIP_GAP - height : r.bottom + TOOLTIP_GAP;
    left = alignOffset(align, r.left, r.width, width);
    left = clamp(left, pad, vp.width - pad - width);
    top = clamp(top, pad, vp.height - pad - height);
  } else {
    left = side === "left" ? r.left - TOOLTIP_GAP - width : r.right + TOOLTIP_GAP;
    top = alignOffset(align, r.top, r.height, height);
    top = clamp(top, pad, vp.height - pad - height);
    left = clamp(left, pad, vp.width - pad - width);
  }

  return { top: Math.round(top), left: Math.round(left), side };
}
