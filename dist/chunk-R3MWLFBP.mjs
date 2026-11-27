// src/components/molecules/Drawer/Drawer.utils.ts
var FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable='false'])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");
function getFocusable(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.closest("[hidden], [inert], [aria-hidden='true']")
  );
}
function trapTabKey(e, container) {
  if (e.key !== "Tab")
    return false;
  const focusable = getFocusable(container);
  if (focusable.length === 0) {
    e.preventDefault();
    container.focus();
    return true;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  const inside = active instanceof Node && container.contains(active);
  if (e.shiftKey && (active === first || active === container || !inside)) {
    e.preventDefault();
    last.focus();
    return true;
  }
  if (!e.shiftKey && (active === last || !inside)) {
    e.preventDefault();
    first.focus();
    return true;
  }
  return false;
}
function resolveSnapPx(point, viewportHeight, rootFontSize = 16) {
  var _a;
  const match = /^\s*(-?\d*\.?\d+)\s*(%|px|rem|em|[dsl]?vh)?\s*$/.exec(point);
  if (!match)
    return Number.NaN;
  const n = Number(match[1]);
  const unit = (_a = match[2]) != null ? _a : "px";
  if (unit === "%" || unit.endsWith("vh"))
    return n / 100 * viewportHeight;
  if (unit === "rem" || unit === "em")
    return n * rootFontSize;
  return n;
}
function nearestSnapIndex(height, snapPx) {
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  snapPx.forEach((px, i) => {
    if (Number.isNaN(px))
      return;
    const d = Math.abs(px - height);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

export {
  getFocusable,
  trapTabKey,
  resolveSnapPx,
  nearestSnapIndex
};
//# sourceMappingURL=chunk-R3MWLFBP.mjs.map