import {
  arcPath,
  polarToCartesian
} from "./chunk-L2ZFJ4GZ.mjs";
import {
  resolveChartAnimation,
  useChartAnimationProgress
} from "./chunk-3R3T3GO2.mjs";
import {
  CHART_THEME_COLORS,
  ChartTooltip
} from "./chunk-L7FCKHCM.mjs";

// src/components/charts/PieChart.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_COLORS = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)",
  "var(--color-accent-sky-10)",
  "var(--color-accent-mint-10)",
  "var(--color-accent-amber-10)"
];
var pieLabelNamePercent = ({ name, percent }) => `${name} (${Math.round(percent)}%)`;
var PieChartComponent = ({
  data,
  innerRadius = 0,
  outerRadius = "80%",
  colors = DEFAULT_COLORS,
  showLabels = false,
  showLabelLine = true,
  paddingAngle = 0,
  startAngle = 0,
  endAngle = 360,
  centerLabel,
  labelFormatter,
  labelPosition = "inside",
  valueFormatter,
  width = "100%",
  height = 300,
  margin = { top: 10, right: 10, left: 10, bottom: 10 },
  showTooltip = true,
  showLegend = true,
  legendPosition = "right",
  theme = "light",
  tooltipFollowPointer = true,
  tooltipAnimation = true,
  chartAnimation = true,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d;
  const animCfg = resolveChartAnimation(chartAnimation, "pie");
  const animKey = useMemo(() => `${data.map((d) => d.value).join(",")}-${data.length}`, [data]);
  const animProgress = useChartAnimationProgress(
    animCfg.enabled,
    animCfg.durationMs,
    animCfg.easing,
    animKey
  );
  const scaleFactor = 0.08 + animProgress * 0.92;
  const themeColors = CHART_THEME_COLORS[theme];
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const chartW = Math.max(200, typeof width === "number" ? width : 400);
  const chartH = Math.max(200, typeof height === "number" ? height : 300);
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : 10,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 10,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 10
  };
  const size = Math.min(chartW - m.left - m.right, chartH - m.top - m.bottom);
  const cx = chartW / 2;
  const cy = chartH / 2;
  const or = typeof outerRadius === "string" && outerRadius.endsWith("%") ? size / 2 * (parseFloat(outerRadius) / 100) : typeof outerRadius === "number" ? outerRadius : size / 2;
  const ir = typeof innerRadius === "string" && innerRadius.endsWith("%") ? size / 2 * (parseFloat(innerRadius) / 100) : typeof innerRadius === "number" ? innerRadius : 0;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const n = data.length;
  const sweep = Math.min(360, Math.abs(endAngle - startAngle)) || 360;
  const dir = endAngle < startAngle ? -1 : 1;
  const totalPaddingDeg = paddingAngle * Math.max(0, n - 1);
  const totalSliceDeg = Math.max(0, sweep - totalPaddingDeg);
  const colorAt = (i) => {
    var _a2, _b2;
    return (_b2 = (_a2 = data[i]) == null ? void 0 : _a2.color) != null ? _b2 : colors[i % colors.length];
  };
  let currentDeg = startAngle;
  const slices = data.map((d, i) => {
    const pct = d.value / total;
    const spanDeg = Math.max(0.5, pct * totalSliceDeg);
    const a = currentDeg;
    const b = currentDeg + dir * spanDeg;
    currentDeg = b + dir * (i < n - 1 ? paddingAngle : 0);
    return {
      ...d,
      startDeg: Math.min(a, b),
      endDeg: Math.max(a, b),
      color: colorAt(i)
    };
  });
  const labelText = (i) => {
    const d = data[i];
    const percent = d.value / total * 100;
    return labelFormatter ? labelFormatter({ name: d.name, value: d.value, percent, index: i }) : `${percent.toFixed(0)}%`;
  };
  const fmtValue = (v, name) => valueFormatter ? valueFormatter(v, name) : String(v);
  const handleSlicePointer = useCallback(
    (e, i) => {
      var _a2, _b2;
      setHovered(i);
      if (!showTooltip || !containerRef.current)
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const slice = data[i];
      const pct = slice.value / total * 100;
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: `${slice.name} (${pct.toFixed(1)}%)`,
        items: [
          {
            name: "Value",
            value: slice.value,
            color: (_b2 = (_a2 = data[i]) == null ? void 0 : _a2.color) != null ? _b2 : colors[i % colors.length],
            displayValue: valueFormatter ? valueFormatter(slice.value, slice.name) : void 0
          }
        ]
      });
    },
    [showTooltip, data, colors, total, valueFormatter]
  );
  const handleMouseLeave = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        minWidth: 280,
        minHeight: 280,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: legendPosition === "left" || legendPosition === "right" ? "stretch" : "center",
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", flex: 1, minHeight: 260, position: "relative" }, children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              width: "100%",
              height: "100%",
              viewBox: `0 0 ${chartW} ${chartH}`,
              preserveAspectRatio: "xMidYMid meet",
              style: { overflow: "visible" },
              onMouseLeave: handleMouseLeave,
              children: /* @__PURE__ */ jsxs("g", { transform: `translate(${cx} ${cy}) scale(${scaleFactor}) translate(${-cx} ${-cy})`, children: [
                slices.map((slice, i) => /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: arcPath(cx, cy, or, slice.startDeg, slice.endDeg, ir),
                    fill: slice.color,
                    stroke: themeColors.tooltipBg,
                    strokeWidth: 2,
                    opacity: hovered !== null && hovered !== i ? 0.5 : 1,
                    onMouseEnter: (e) => handleSlicePointer(e, i),
                    onMouseMove: (e) => handleSlicePointer(e, i),
                    style: { cursor: "pointer" },
                    children: !showTooltip && /* @__PURE__ */ jsxs("title", { children: [
                      slice.name,
                      ": ",
                      fmtValue(slice.value, slice.name),
                      " (",
                      (slice.value / total * 100).toFixed(1),
                      "%)"
                    ] })
                  },
                  i
                )),
                showLabels && labelPosition === "inside" && slices.map((slice, i) => {
                  const midDeg = (slice.startDeg + slice.endDeg) / 2;
                  const labelR = ir + (or - ir) * 0.5;
                  const { x: lx, y: ly } = polarToCartesian(cx, cy, labelR, midDeg);
                  return /* @__PURE__ */ jsx(
                    "text",
                    {
                      x: lx,
                      y: ly,
                      textAnchor: "middle",
                      dominantBaseline: "middle",
                      fontSize: 11,
                      fill: themeColors.tooltipText,
                      opacity: animProgress,
                      style: { pointerEvents: "none" },
                      children: labelText(i)
                    },
                    i
                  );
                }),
                showLabels && labelPosition === "outside" && slices.map((slice, i) => {
                  const midDeg = (slice.startDeg + slice.endDeg) / 2;
                  const p0 = polarToCartesian(cx, cy, or, midDeg);
                  const p1 = polarToCartesian(cx, cy, or + 10, midDeg);
                  const pt = polarToCartesian(cx, cy, or + 14, midDeg);
                  const norm = (midDeg % 360 + 360) % 360;
                  const anchor = norm > 5 && norm < 175 ? "start" : norm > 185 && norm < 355 ? "end" : "middle";
                  return /* @__PURE__ */ jsxs("g", { opacity: animProgress, style: { pointerEvents: "none" }, children: [
                    showLabelLine && /* @__PURE__ */ jsx("line", { x1: p0.x, y1: p0.y, x2: p1.x, y2: p1.y, stroke: slice.color, strokeWidth: 1 }),
                    /* @__PURE__ */ jsx(
                      "text",
                      {
                        x: pt.x,
                        y: pt.y,
                        textAnchor: anchor,
                        dominantBaseline: "middle",
                        fontSize: 11,
                        fill: themeColors.axisText,
                        children: labelText(i)
                      }
                    )
                  ] }, i);
                })
              ] })
            }
          ),
          centerLabel != null && centerLabel !== false && /* @__PURE__ */ jsx(
            "div",
            {
              className: "ds-chart-pie-center",
              style: {
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                pointerEvents: "none",
                color: themeColors.tooltipText
              },
              children: centerLabel
            }
          )
        ] }),
        showTooltip && tooltip && /* @__PURE__ */ jsx(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: legendPosition === "left" ? "flex-start" : legendPosition === "right" ? "flex-end" : "center",
              marginTop: 8,
              fontSize: 12
            },
            children: data.map((d, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  style: {
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    background: colorAt(i)
                  }
                }
              ),
              /* @__PURE__ */ jsxs("span", { style: { color: themeColors.legendText }, children: [
                d.name,
                ": ",
                fmtValue(d.value, d.name)
              ] })
            ] }, d.name))
          }
        )
      ]
    }
  );
};
var PieChart_default = React.memo(PieChartComponent);

export {
  pieLabelNamePercent,
  PieChart_default
};
//# sourceMappingURL=chunk-ZXOATXM7.mjs.map