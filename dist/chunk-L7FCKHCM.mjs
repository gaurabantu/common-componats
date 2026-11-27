/* ucs:component-css */
import "./styles/components/charts/ChartTooltip.css";
// src/components/charts/ChartTooltip.tsx
import React, { useLayoutEffect, useRef, useState } from "react";

// src/components/charts/Chart.types.ts
var CHART_THEME_COLORS = {
  light: {
    tooltipBg: "var(--color-bg-surface)",
    tooltipBorder: "var(--color-border-default)",
    tooltipText: "var(--color-text-primary)",
    legendText: "var(--color-text-secondary)",
    axisText: "var(--color-text-secondary)",
    gridColor: "var(--color-border-default)"
  },
  dark: {
    tooltipBg: "var(--color-bg-surface)",
    tooltipBorder: "var(--color-border-default)",
    tooltipText: "var(--color-text-primary)",
    legendText: "var(--color-text-secondary)",
    axisText: "var(--color-text-secondary)",
    gridColor: "var(--color-border-subtle)"
  }
};
var CHART_COLORS = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)",
  "var(--color-accent-sky-10)",
  "var(--color-accent-mint-10)",
  "var(--color-accent-amber-10)"
];

// src/components/charts/ChartTooltip.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var ChartTooltip = React.memo(function ChartTooltip2({
  theme,
  open,
  pointerX,
  pointerY,
  containerWidth,
  containerHeight,
  label,
  items,
  animation = true,
  followPointer = true
}) {
  const themeColors = CHART_THEME_COLORS[theme];
  const ref = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [enter, setEnter] = useState(false);
  useLayoutEffect(() => {
    if (!open || !ref.current)
      return;
    const el = ref.current;
    const tw = el.offsetWidth;
    const th = el.offsetHeight;
    const pad = 8;
    const gap = 12;
    let left = pointerX + gap;
    let top = pointerY + gap;
    if (followPointer) {
      if (left + tw > containerWidth - pad) {
        left = pointerX - tw - gap;
      }
      if (top + th > containerHeight - pad) {
        top = pointerY - th - gap;
      }
      if (left < pad)
        left = pad;
      if (top < pad)
        top = pad;
    }
    left = Math.max(pad, Math.min(left, Math.max(pad, containerWidth - tw - pad)));
    top = Math.max(pad, Math.min(top, Math.max(pad, containerHeight - th - pad)));
    setPos({ left, top });
  }, [
    open,
    pointerX,
    pointerY,
    containerWidth,
    containerHeight,
    followPointer,
    label,
    items.length
  ]);
  React.useEffect(() => {
    if (!open) {
      setEnter(false);
      return;
    }
    setEnter(false);
    const id = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(id);
  }, [open]);
  if (!open)
    return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      role: "tooltip",
      "data-chart-theme": theme,
      className: cls(
        "ds-chart-tooltip",
        animation && "ds-chart-tooltip--motion",
        animation && enter && "ds-chart-tooltip--enter"
      ),
      style: {
        left: pos.left,
        top: pos.top,
        background: themeColors.tooltipBg,
        border: `1px solid ${themeColors.tooltipBorder}`,
        color: themeColors.tooltipText
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "ds-chart-tooltip__label",
            style: {
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: themeColors.tooltipBorder
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "ds-chart-tooltip__rows", children: items.map((item, i) => {
          var _a;
          return /* @__PURE__ */ jsxs("div", { className: "ds-chart-tooltip__row", children: [
            /* @__PURE__ */ jsx("span", { className: "ds-chart-tooltip__dot", style: { background: item.color }, "aria-hidden": true }),
            /* @__PURE__ */ jsx("span", { className: "ds-chart-tooltip__name", style: { color: themeColors.legendText }, children: item.name }),
            /* @__PURE__ */ jsx("span", { className: "ds-chart-tooltip__value", children: (_a = item.displayValue) != null ? _a : item.value })
          ] }, `${item.name}-${i}`);
        }) })
      ]
    }
  );
});

export {
  CHART_THEME_COLORS,
  CHART_COLORS,
  ChartTooltip
};
//# sourceMappingURL=chunk-L7FCKHCM.mjs.map