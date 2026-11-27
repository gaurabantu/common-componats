// src/components/molecules/Tooltip/Tooltip.config.ts
var TOOLTIP_DEFAULTS = {
  side: "top",
  align: "center",
  delay: 300,
  closeDelay: 100,
  maxWidth: 240,
  variant: "dark"
};
var TOOLTIP_GAP = 8;
var TOOLTIP_VIEWPORT_PADDING = 8;

// src/components/molecules/Tooltip/tooltipPosition.ts
var OPPOSITE = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}
function spaceOn(side, r, vp) {
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
function resolveTooltipSide(preferred, r, width, height, vp) {
  const needed = preferred === "top" || preferred === "bottom" ? height : width;
  const here = spaceOn(preferred, r, vp);
  if (here >= needed)
    return preferred;
  const opposite = OPPOSITE[preferred];
  const there = spaceOn(opposite, r, vp);
  return there >= needed || there > here ? opposite : preferred;
}
function alignOffset(align, start, triggerSize, bubbleSize) {
  if (align === "start")
    return start;
  if (align === "end")
    return start + triggerSize - bubbleSize;
  return start + triggerSize / 2 - bubbleSize / 2;
}
function computeTooltipPosition(r, width, height, preferredSide, align, vp) {
  const side = resolveTooltipSide(preferredSide, r, width, height, vp);
  const pad = TOOLTIP_VIEWPORT_PADDING;
  let top;
  let left;
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

export {
  TOOLTIP_DEFAULTS,
  resolveTooltipSide,
  computeTooltipPosition
};
//# sourceMappingURL=chunk-CS56N245.mjs.map