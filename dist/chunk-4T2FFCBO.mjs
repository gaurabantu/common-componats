// src/components/charts/Chart.types.ts
var CHART_THEME_COLORS = {
  light: {
    tooltipBg: "var(--color-bg-surface, #fff)",
    tooltipBorder: "var(--color-border-default, #e5e7eb)",
    tooltipText: "var(--color-text-primary, #0d0d0d)",
    legendText: "var(--color-text-secondary, #757575)",
    axisText: "var(--color-text-secondary, #757575)",
    gridColor: "var(--color-border-default, #e5e7eb)"
  },
  dark: {
    tooltipBg: "var(--chart-tooltip-bg, #141b2d)",
    tooltipBorder: "var(--chart-tooltip-border, #2a3548)",
    tooltipText: "var(--chart-tooltip-text, #e8edf5)",
    legendText: "var(--chart-legend-text, #8b9bb4)",
    axisText: "var(--chart-axis-text, #8b9bb4)",
    gridColor: "var(--chart-grid-color, #2a3548)"
  }
};
var CHART_COLORS = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)",
  "var(--color-accent-sky-10, #E6F2FF)",
  "var(--color-accent-mint-10, #E9FFF4)",
  "var(--color-accent-amber-10, #FFF6DD)"
];

// src/components/charts/ChartTooltip.tsx
import React, { useLayoutEffect, useRef, useState } from "react";
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
        /* @__PURE__ */ jsx("div", { className: "ds-chart-tooltip__rows", children: items.map((item) => /* @__PURE__ */ jsxs("div", { className: "ds-chart-tooltip__row", children: [
          /* @__PURE__ */ jsx("span", { className: "ds-chart-tooltip__dot", style: { background: item.color }, "aria-hidden": true }),
          /* @__PURE__ */ jsx("span", { className: "ds-chart-tooltip__name", style: { color: themeColors.legendText }, children: item.name }),
          /* @__PURE__ */ jsx("span", { className: "ds-chart-tooltip__value", children: item.value })
        ] }, item.name)) })
      ]
    }
  );
});

// src/components/charts/LineChart.tsx
import React2, { useCallback, useMemo, useState as useState2 } from "react";

// src/components/charts/utils.ts
function getValueExtent(data, series, stacked = false) {
  let min = Infinity;
  let max = -Infinity;
  if (stacked) {
    min = 0;
    for (const row of data) {
      let sum = 0;
      for (const s of series) {
        const v = row[s.dataKey];
        sum += typeof v === "number" ? v : 0;
      }
      if (sum > max)
        max = sum;
    }
  } else {
    for (const row of data) {
      for (const s of series) {
        const v = row[s.dataKey];
        if (typeof v === "number") {
          const n = v;
          if (n < min)
            min = n;
          if (n > max)
            max = n;
        }
      }
    }
  }
  if (min === Infinity)
    min = 0;
  if (max === -Infinity)
    max = 100;
  if (min === max)
    max = min + 1;
  return [min, max];
}
function scaleLinear(domain, range) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const k = (r1 - r0) / (d1 - d0);
  return (v) => r0 + (v - d0) * k;
}
function linePath(points, curve) {
  if (points.length === 0)
    return "";
  if (points.length === 1)
    return `M ${points[0].x} ${points[0].y}`;
  if (curve === "linear") {
    return points.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`).join(" ");
  }
  if (curve === "step" || curve === "stepBefore" || curve === "stepAfter") {
    const parts = [`M ${points[0].x} ${points[0].y}`];
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      if (curve === "step") {
        const midX = (prev.x + curr.x) / 2;
        parts.push(`L ${midX} ${prev.y}`);
        parts.push(`L ${midX} ${curr.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      } else if (curve === "stepBefore") {
        parts.push(`L ${curr.x} ${prev.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      } else {
        parts.push(`L ${prev.x} ${curr.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      }
    }
    return parts.join(" ");
  }
  const d = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 1; i < points.length; i++) {
    const p0 = points[Math.max(0, i - 2)];
    const p1 = points[i - 1];
    const p2 = points[i];
    const p3 = points[Math.min(points.length - 1, i + 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`);
  }
  return d.join(" ");
}
function areaPath(points, baseY, curve) {
  if (points.length === 0)
    return "";
  const line = linePath(points, curve);
  const close = `L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;
  return line + " " + close;
}
function degToRad(deg) {
  return deg * Math.PI / 180;
}
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = degToRad(angleDeg - 90);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arcPath(cx, cy, r, startAngleDeg, endAngleDeg, innerRadius = 0) {
  const span = endAngleDeg - startAngleDeg;
  if (span <= 0)
    return "";
  const start = polarToCartesian(cx, cy, r, startAngleDeg);
  const end = polarToCartesian(cx, cy, r, endAngleDeg);
  const largeArc = span >= 180 ? 1 : 0;
  const sweep = 1;
  if (innerRadius <= 0) {
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y} Z`;
  }
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngleDeg);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngleDeg);
  const innerLargeArc = span >= 180 ? 1 : 0;
  return `M ${innerStart.x} ${innerStart.y} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y} L ${innerEnd.x} ${innerEnd.y} A ${innerRadius} ${innerRadius} 0 ${innerLargeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
}

// src/components/charts/LineChart.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var DEFAULT_COLORS = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)"
];
var LineChartComponent = ({
  data,
  xAxisKey = "name",
  series,
  colors = DEFAULT_COLORS,
  curve = "monotone",
  dotSize = 4,
  showDots = true,
  strokeWidth = 2,
  width = "100%",
  height = 300,
  margin = { top: 10, right: 20, left: 40, bottom: 30 },
  showGrid = true,
  gridColor,
  showTooltip = true,
  showLegend = true,
  legendPosition = "bottom",
  theme = "light",
  tooltipFollowPointer = true,
  tooltipAnimation = true,
  showCrosshair = true,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d;
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const [tooltip, setTooltip] = useState2(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const xLabels = useMemo(() => data.map((d) => {
    var _a2;
    return String((_a2 = d[xAxisKey]) != null ? _a2 : "");
  }), [data, xAxisKey]);
  const [yMin, yMax] = useMemo(() => getValueExtent(data, series), [data, series]);
  const xScale = useMemo(
    () => scaleLinear([0, Math.max(1, data.length - 1)], [0, innerW]),
    [data.length, innerW]
  );
  const yScale = useMemo(
    () => scaleLinear([yMin, yMax], [innerH, 0]),
    [yMin, yMax, innerH]
  );
  const paths = useMemo(() => {
    return series.map((s, si) => {
      var _a2, _b2;
      const points = data.map((d, i) => {
        const v = d[s.dataKey];
        const num = typeof v === "number" ? v : 0;
        return { x: m.left + xScale(i), y: m.top + yScale(num) };
      }).filter((p) => !Number.isNaN(p.y));
      return { path: linePath(points, curve), points, color: (_a2 = s.color) != null ? _a2 : colors[si % colors.length], name: (_b2 = s.name) != null ? _b2 : s.dataKey };
    });
  }, [data, series, colors, curve, xScale, yScale, m]);
  const handleMouseMove = useCallback(
    (e) => {
      var _a2;
      if (!showTooltip)
        return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - m.left;
      const idx = Math.round(x / innerW * (data.length - 1));
      const clamped = Math.max(0, Math.min(idx, data.length - 1));
      const row = data[clamped];
      const label = String((_a2 = row[xAxisKey]) != null ? _a2 : "");
      const items = series.map((s, i) => {
        var _a3, _b2, _c2;
        return {
          name: (_a3 = s.name) != null ? _a3 : s.dataKey,
          value: (_b2 = Number(row[s.dataKey])) != null ? _b2 : 0,
          color: (_c2 = s.color) != null ? _c2 : colors[i % colors.length]
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label,
        items,
        activeIndex: clamped
      });
    },
    [showTooltip, data, series, xAxisKey, colors, innerW, m.left]
  );
  const handleMouseLeave = useCallback(() => setTooltip(null), []);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs2(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ jsxs2("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: [
                [0.25, 0.5, 0.75].map((t) => /* @__PURE__ */ jsx2(
                  "line",
                  {
                    x1: m.left,
                    y1: m.top + innerH * t,
                    x2: m.left + innerW,
                    y2: m.top + innerH * t
                  },
                  t
                )),
                xLabels.slice(0, 6).map((_, i) => {
                  const idx = Math.floor(i / 5 * (data.length - 1));
                  return /* @__PURE__ */ jsx2(
                    "line",
                    {
                      x1: m.left + xScale(idx),
                      y1: m.top,
                      x2: m.left + xScale(idx),
                      y2: m.top + innerH
                    },
                    i
                  );
                })
              ] }),
              paths.map(({ path, points, color, name }) => /* @__PURE__ */ jsxs2("g", { children: [
                /* @__PURE__ */ jsx2(
                  "path",
                  {
                    d: path,
                    fill: "none",
                    stroke: color,
                    strokeWidth,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                showDots && points.map((p, i) => /* @__PURE__ */ jsx2(
                  "circle",
                  {
                    cx: p.x,
                    cy: p.y,
                    r: dotSize,
                    fill: color,
                    stroke: themeColors.tooltipBg,
                    strokeWidth: 1
                  },
                  i
                ))
              ] }, name)),
              showTooltip && showCrosshair && tooltip !== null && data.length > 0 && /* @__PURE__ */ jsxs2("g", { className: "ds-chart-crosshair", pointerEvents: "none", children: [
                /* @__PURE__ */ jsx2(
                  "line",
                  {
                    x1: m.left + xScale(tooltip.activeIndex),
                    y1: m.top,
                    x2: m.left + xScale(tooltip.activeIndex),
                    y2: m.top + innerH,
                    stroke: themeColors.gridColor,
                    strokeWidth: 1,
                    strokeDasharray: "4 6",
                    opacity: 0.85
                  }
                ),
                series.map((s, si) => {
                  var _a2, _b2;
                  const row = data[tooltip.activeIndex];
                  const num = (_a2 = Number(row[s.dataKey])) != null ? _a2 : 0;
                  const cx = m.left + xScale(tooltip.activeIndex);
                  const cy = m.top + yScale(num);
                  const color = (_b2 = s.color) != null ? _b2 : colors[si % colors.length];
                  return /* @__PURE__ */ jsx2(
                    "circle",
                    {
                      cx,
                      cy,
                      r: dotSize + 3,
                      fill: color,
                      stroke: themeColors.tooltipBg,
                      strokeWidth: 2,
                      opacity: 0.95
                    },
                    `hit-${s.dataKey}`
                  );
                })
              ] }),
              /* @__PURE__ */ jsx2("g", { fill: themeColors.axisText, fontSize: 11, textAnchor: "middle", children: xLabels.map((label, i) => /* @__PURE__ */ jsx2(
                "text",
                {
                  x: m.left + xScale(i),
                  y: m.top + innerH + 16,
                  children: label
                },
                i
              )) })
            ]
          }
        ),
        showTooltip && tooltip && /* @__PURE__ */ jsx2(
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
        showLegend && /* @__PURE__ */ jsx2(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: legendPosition === "left" ? "flex-start" : legendPosition === "right" ? "flex-end" : "center",
              marginTop: legendPosition === "top" ? 0 : 8,
              marginBottom: legendPosition === "bottom" ? 0 : 8,
              fontSize: 12
            },
            children: series.map((s, i) => {
              var _a2, _b2;
              return /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                /* @__PURE__ */ jsx2(
                  "span",
                  {
                    style: {
                      width: 12,
                      height: 3,
                      borderRadius: 2,
                      background: (_a2 = s.color) != null ? _a2 : colors[i % colors.length]
                    }
                  }
                ),
                /* @__PURE__ */ jsx2("span", { style: { color: themeColors.legendText }, children: (_b2 = s.name) != null ? _b2 : s.dataKey })
              ] }, s.dataKey);
            })
          }
        )
      ]
    }
  );
};
var LineChart_default = React2.memo(LineChartComponent);

// src/components/charts/BarChart.tsx
import React3, { useCallback as useCallback2, useMemo as useMemo2, useRef as useRef2, useState as useState3 } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var DEFAULT_COLORS2 = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)"
];
var BarChartComponent = ({
  data,
  xAxisKey = "name",
  series,
  colors = DEFAULT_COLORS2,
  layout = "vertical",
  barSize = 24,
  barGap = 4,
  barCategoryGap = "10%",
  radius = 4,
  width = "100%",
  height = 300,
  margin = { top: 10, right: 20, left: 40, bottom: 30 },
  showGrid = true,
  gridColor,
  showTooltip = true,
  showLegend = true,
  legendPosition = "bottom",
  theme = "light",
  tooltipFollowPointer = true,
  tooltipAnimation = true,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d;
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const containerRef = useRef2(null);
  const [tooltip, setTooltip] = useState3(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const catGap = typeof barCategoryGap === "string" && barCategoryGap.endsWith("%") ? innerW / Math.max(1, data.length) * (parseFloat(barCategoryGap) / 100) : typeof barCategoryGap === "number" ? barCategoryGap : 8;
  const groupWidth = innerW / Math.max(1, data.length) - catGap;
  const barCount = series.length;
  const totalBarWidth = barCount * barSize + (barCount - 1) * barGap;
  const barWidth = Math.min(
    barSize,
    Math.max(2, (groupWidth - (barCount - 1) * barGap) / barCount)
  );
  const groupOffset = Math.max(0, (groupWidth - totalBarWidth) / 2);
  const [yMin, yMax] = useMemo2(() => getValueExtent(data, series), [data, series]);
  const yScale = useMemo2(
    () => scaleLinear([yMin, yMax], [innerH, 0]),
    [yMin, yMax, innerH]
  );
  const handleMouseMove = useCallback2(
    (e, idx) => {
      var _a2;
      if (!showTooltip || !containerRef.current)
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const row = data[idx];
      const label = String((_a2 = row[xAxisKey]) != null ? _a2 : "");
      const items = series.map((s, i) => {
        var _a3, _b2, _c2;
        return {
          name: (_a3 = s.name) != null ? _a3 : s.dataKey,
          value: (_b2 = Number(row[s.dataKey])) != null ? _b2 : 0,
          color: (_c2 = s.color) != null ? _c2 : colors[i % colors.length]
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label,
        items
      });
    },
    [showTooltip, data, series, xAxisKey, colors]
  );
  const handleMouseLeave = useCallback2(() => setTooltip(null), []);
  const r = Array.isArray(radius) ? radius[0] : radius;
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      ref: containerRef,
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs3(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ jsx3("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: [0.25, 0.5, 0.75].map((t) => /* @__PURE__ */ jsx3(
                "line",
                {
                  x1: m.left,
                  y1: m.top + innerH * t,
                  x2: m.left + innerW,
                  y2: m.top + innerH * t
                },
                t
              )) }),
              layout === "vertical" && data.map((row, idx) => {
                const groupX = m.left + idx / Math.max(1, data.length) * innerW + catGap / 2 + groupOffset;
                return series.map((s, si) => {
                  var _a2, _b2;
                  const v = (_a2 = Number(row[s.dataKey])) != null ? _a2 : 0;
                  const barH = innerH - yScale(v);
                  const x = groupX + si * (barWidth + barGap);
                  const y = m.top + yScale(v);
                  return /* @__PURE__ */ jsx3("g", { children: /* @__PURE__ */ jsx3(
                    "rect",
                    {
                      x,
                      y,
                      width: barWidth,
                      height: Math.max(0, barH),
                      fill: (_b2 = s.color) != null ? _b2 : colors[si % colors.length],
                      rx: r,
                      ry: r,
                      onMouseMove: (e) => handleMouseMove(e, idx)
                    }
                  ) }, `${idx}-${s.dataKey}`);
                });
              }),
              layout === "horizontal" && data.map((row, idx) => {
                const groupY = m.top + (idx + 0.5) / data.length * innerH;
                const maxVal = Math.max(...series.map((s) => {
                  var _a2;
                  return (_a2 = Number(row[s.dataKey])) != null ? _a2 : 0;
                }));
                const barLen = Number(maxVal) / (yMax - yMin || 1) * innerW;
                return series.map((s, si) => {
                  var _a2, _b2;
                  const v = (_a2 = Number(row[s.dataKey])) != null ? _a2 : 0;
                  const len = v / (yMax - yMin || 1) * innerW;
                  const x = m.left;
                  const y = groupY - barCount * barWidth / 2 + si * (barWidth + barGap);
                  return /* @__PURE__ */ jsx3(
                    "rect",
                    {
                      x,
                      y,
                      width: len,
                      height: barWidth,
                      fill: (_b2 = s.color) != null ? _b2 : colors[si % colors.length],
                      rx: r,
                      ry: r,
                      onMouseMove: (e) => handleMouseMove(e, idx)
                    },
                    `${idx}-${s.dataKey}`
                  );
                });
              }),
              /* @__PURE__ */ jsx3("g", { fill: themeColors.axisText, fontSize: 11, textAnchor: "middle", children: data.map((row, i) => {
                var _a2;
                return /* @__PURE__ */ jsx3(
                  "text",
                  {
                    x: m.left + (i + 0.5) / Math.max(1, data.length) * innerW,
                    y: m.top + innerH + 16,
                    children: String((_a2 = row[xAxisKey]) != null ? _a2 : "")
                  },
                  i
                );
              }) })
            ]
          }
        ),
        showTooltip && tooltip && /* @__PURE__ */ jsx3(
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
        showLegend && /* @__PURE__ */ jsx3(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: legendPosition === "left" ? "flex-start" : legendPosition === "right" ? "flex-end" : "center",
              marginTop: legendPosition === "top" ? 0 : 8,
              marginBottom: legendPosition === "bottom" ? 0 : 8,
              fontSize: 12
            },
            children: series.map((s, i) => {
              var _a2, _b2;
              return /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                /* @__PURE__ */ jsx3(
                  "span",
                  {
                    style: {
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      background: (_a2 = s.color) != null ? _a2 : colors[i % colors.length]
                    }
                  }
                ),
                /* @__PURE__ */ jsx3("span", { style: { color: themeColors.legendText }, children: (_b2 = s.name) != null ? _b2 : s.dataKey })
              ] }, s.dataKey);
            })
          }
        )
      ]
    }
  );
};
var BarChart_default = React3.memo(BarChartComponent);

// src/components/charts/PieChart.tsx
import React4, { useCallback as useCallback3, useRef as useRef3, useState as useState4 } from "react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var DEFAULT_COLORS3 = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)",
  "var(--color-accent-sky-10, #E6F2FF)",
  "var(--color-accent-mint-10, #E9FFF4)",
  "var(--color-accent-amber-10, #FFF6DD)"
];
var PieChartComponent = ({
  data,
  innerRadius = 0,
  outerRadius = "80%",
  colors = DEFAULT_COLORS3,
  showLabels = false,
  showLabelLine = true,
  paddingAngle = 0,
  width = "100%",
  height = 300,
  margin = { top: 10, right: 10, left: 10, bottom: 10 },
  showTooltip = true,
  showLegend = true,
  legendPosition = "right",
  theme = "light",
  tooltipFollowPointer = true,
  tooltipAnimation = true,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d;
  const themeColors = CHART_THEME_COLORS[theme];
  const containerRef = useRef3(null);
  const [hovered, setHovered] = useState4(null);
  const [tooltip, setTooltip] = useState4(null);
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
  const totalPaddingDeg = paddingAngle * Math.max(0, n - 1);
  const totalSliceDeg = 360 - totalPaddingDeg;
  const startAngleOffset = 0;
  let currentDeg = startAngleOffset;
  const slices = data.map((d, i) => {
    const pct = d.value / total;
    const spanDeg = Math.max(0.5, pct * totalSliceDeg);
    const startDeg = currentDeg;
    currentDeg += spanDeg + (i < n - 1 ? paddingAngle : 0);
    return {
      ...d,
      startDeg,
      endDeg: startDeg + spanDeg,
      color: colors[i % colors.length]
    };
  });
  const handleSlicePointer = useCallback3(
    (e, i) => {
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
            color: colors[i % colors.length]
          }
        ]
      });
    },
    [showTooltip, data, colors, total]
  );
  const handleMouseLeave = useCallback3(() => {
    setHovered(null);
    setTooltip(null);
  }, []);
  return /* @__PURE__ */ jsxs4(
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
        /* @__PURE__ */ jsx4("div", { style: { display: "flex", alignItems: "center", flex: 1, minHeight: 260 }, children: /* @__PURE__ */ jsxs4(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${chartW} ${chartH}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseLeave: handleMouseLeave,
            children: [
              slices.map((slice, i) => /* @__PURE__ */ jsx4(
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
                  children: !showTooltip && /* @__PURE__ */ jsxs4("title", { children: [
                    slice.name,
                    ": ",
                    slice.value,
                    " (",
                    (slice.value / total * 100).toFixed(1),
                    "%)"
                  ] })
                },
                i
              )),
              showLabels && slices.map((slice, i) => {
                const midDeg = (slice.startDeg + slice.endDeg) / 2;
                const labelR = ir + (or - ir) * 0.5;
                const { x: lx, y: ly } = polarToCartesian(cx, cy, labelR, midDeg);
                return /* @__PURE__ */ jsxs4(
                  "text",
                  {
                    x: lx,
                    y: ly,
                    textAnchor: "middle",
                    dominantBaseline: "middle",
                    fontSize: 11,
                    fill: themeColors.tooltipText,
                    style: { pointerEvents: "none" },
                    children: [
                      (slice.value / total * 100).toFixed(0),
                      "%"
                    ]
                  },
                  i
                );
              })
            ]
          }
        ) }),
        showTooltip && tooltip && /* @__PURE__ */ jsx4(
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
        showLegend && /* @__PURE__ */ jsx4(
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
            children: data.map((d, i) => /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
              /* @__PURE__ */ jsx4(
                "span",
                {
                  style: {
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    background: colors[i % colors.length]
                  }
                }
              ),
              /* @__PURE__ */ jsxs4("span", { style: { color: themeColors.legendText }, children: [
                d.name,
                ": ",
                d.value
              ] })
            ] }, d.name))
          }
        )
      ]
    }
  );
};
var PieChart_default = React4.memo(PieChartComponent);

// src/components/charts/AreaChart.tsx
import React5, { useCallback as useCallback4, useMemo as useMemo3, useState as useState5 } from "react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var DEFAULT_COLORS4 = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)"
];
var AreaChartComponent = ({
  data,
  xAxisKey = "name",
  series,
  colors = DEFAULT_COLORS4,
  stacked = false,
  curve = "monotone",
  strokeWidth = 2,
  width = "100%",
  height = 300,
  margin = { top: 10, right: 20, left: 40, bottom: 30 },
  showGrid = true,
  gridColor,
  showTooltip = true,
  showLegend = true,
  legendPosition = "bottom",
  theme = "light",
  tooltipFollowPointer = true,
  tooltipAnimation = true,
  showCrosshair = true,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d;
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const [tooltip, setTooltip] = useState5(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const [yMin, yMax] = useMemo3(
    () => getValueExtent(data, series, stacked),
    [data, series, stacked]
  );
  const xScale = useMemo3(
    () => scaleLinear([0, Math.max(1, data.length - 1)], [0, innerW]),
    [data.length, innerW]
  );
  const yScale = useMemo3(
    () => scaleLinear([yMin, yMax], [innerH, 0]),
    [yMin, yMax, innerH]
  );
  const finalPaths = useMemo3(() => {
    if (stacked) {
      const cum = new Array(data.length).fill(0);
      return series.map((s, si) => {
        var _a2, _b2;
        const basePoints = data.map((_, i) => ({
          x: m.left + xScale(i),
          y: si === 0 ? m.top + innerH : m.top + yScale(cum[i])
        }));
        const topPoints = data.map((row, i) => {
          var _a3;
          const v = (_a3 = Number(row[s.dataKey])) != null ? _a3 : 0;
          cum[i] += v;
          return { x: m.left + xScale(i), y: m.top + yScale(cum[i]) };
        });
        const areaD = "M " + topPoints.map((p) => `${p.x} ${p.y}`).join(" L ") + " L " + [...basePoints].reverse().map((p) => `${p.x} ${p.y}`).join(" L ") + " Z";
        return {
          areaPath: areaD,
          linePath: linePath(topPoints, curve),
          points: topPoints,
          color: (_a2 = s.color) != null ? _a2 : colors[si % colors.length],
          name: (_b2 = s.name) != null ? _b2 : s.dataKey
        };
      });
    }
    return series.map((s, si) => {
      var _a2, _b2;
      const points = data.map((d, i) => {
        const v = d[s.dataKey];
        const num = typeof v === "number" ? v : 0;
        return { x: m.left + xScale(i), y: m.top + yScale(num) };
      }).filter((p) => !Number.isNaN(p.y));
      const baseY = m.top + innerH;
      return {
        areaPath: areaPath(points, baseY, curve),
        linePath: linePath(points, curve),
        points,
        color: (_a2 = s.color) != null ? _a2 : colors[si % colors.length],
        name: (_b2 = s.name) != null ? _b2 : s.dataKey
      };
    });
  }, [data, series, colors, stacked, curve, xScale, yScale, m, innerH]);
  const handleMouseMove = useCallback4(
    (e) => {
      var _a2;
      if (!showTooltip)
        return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - m.left;
      const idx = Math.round(x / innerW * (data.length - 1));
      const clamped = Math.max(0, Math.min(idx, data.length - 1));
      const row = data[clamped];
      const label = String((_a2 = row[xAxisKey]) != null ? _a2 : "");
      const items = series.map((s, i) => {
        var _a3, _b2, _c2;
        return {
          name: (_a3 = s.name) != null ? _a3 : s.dataKey,
          value: (_b2 = Number(row[s.dataKey])) != null ? _b2 : 0,
          color: (_c2 = s.color) != null ? _c2 : colors[i % colors.length]
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label,
        items,
        activeIndex: clamped
      });
    },
    [showTooltip, data, series, xAxisKey, colors, innerW, m.left]
  );
  const handleMouseLeave = useCallback4(() => setTooltip(null), []);
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ jsxs5(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ jsx5("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: [0.25, 0.5, 0.75].map((t) => /* @__PURE__ */ jsx5(
                "line",
                {
                  x1: m.left,
                  y1: m.top + innerH * t,
                  x2: m.left + innerW,
                  y2: m.top + innerH * t
                },
                t
              )) }),
              finalPaths.map(({ areaPath: ap, linePath: lp, color, name }) => /* @__PURE__ */ jsxs5("g", { children: [
                /* @__PURE__ */ jsx5(
                  "path",
                  {
                    d: ap,
                    fill: color,
                    fillOpacity: stacked ? 0.8 : 0.3,
                    stroke: "none"
                  }
                ),
                /* @__PURE__ */ jsx5(
                  "path",
                  {
                    d: lp,
                    fill: "none",
                    stroke: color,
                    strokeWidth,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              ] }, name)),
              showTooltip && showCrosshair && tooltip !== null && data.length > 0 && /* @__PURE__ */ jsxs5("g", { className: "ds-chart-crosshair", pointerEvents: "none", children: [
                /* @__PURE__ */ jsx5(
                  "line",
                  {
                    x1: m.left + xScale(tooltip.activeIndex),
                    y1: m.top,
                    x2: m.left + xScale(tooltip.activeIndex),
                    y2: m.top + innerH,
                    stroke: themeColors.gridColor,
                    strokeWidth: 1,
                    strokeDasharray: "4 6",
                    opacity: 0.85
                  }
                ),
                stacked ? finalPaths.map(({ points, color, name }) => {
                  const p = points[tooltip.activeIndex];
                  if (!p)
                    return null;
                  return /* @__PURE__ */ jsx5(
                    "circle",
                    {
                      cx: p.x,
                      cy: p.y,
                      r: 6,
                      fill: color,
                      stroke: themeColors.tooltipBg,
                      strokeWidth: 2,
                      opacity: 0.95
                    },
                    `hit-${name}`
                  );
                }) : series.map((s, si) => {
                  var _a2, _b2;
                  const row = data[tooltip.activeIndex];
                  const num = (_a2 = Number(row[s.dataKey])) != null ? _a2 : 0;
                  const cx = m.left + xScale(tooltip.activeIndex);
                  const cy = m.top + yScale(num);
                  const color = (_b2 = s.color) != null ? _b2 : colors[si % colors.length];
                  return /* @__PURE__ */ jsx5(
                    "circle",
                    {
                      cx,
                      cy,
                      r: 6,
                      fill: color,
                      stroke: themeColors.tooltipBg,
                      strokeWidth: 2,
                      opacity: 0.95
                    },
                    `hit-${s.dataKey}`
                  );
                })
              ] }),
              /* @__PURE__ */ jsx5("g", { fill: themeColors.axisText, fontSize: 11, textAnchor: "middle", children: data.map((row, i) => {
                var _a2;
                return /* @__PURE__ */ jsx5("text", { x: m.left + xScale(i), y: m.top + innerH + 16, children: String((_a2 = row[xAxisKey]) != null ? _a2 : "") }, i);
              }) })
            ]
          }
        ),
        showTooltip && tooltip && /* @__PURE__ */ jsx5(
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
        showLegend && /* @__PURE__ */ jsx5(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: legendPosition === "left" ? "flex-start" : legendPosition === "right" ? "flex-end" : "center",
              marginTop: legendPosition === "top" ? 0 : 8,
              marginBottom: legendPosition === "bottom" ? 0 : 8,
              fontSize: 12
            },
            children: series.map((s, i) => {
              var _a2, _b2;
              return /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                /* @__PURE__ */ jsx5(
                  "span",
                  {
                    style: {
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      background: (_a2 = s.color) != null ? _a2 : colors[i % colors.length]
                    }
                  }
                ),
                /* @__PURE__ */ jsx5("span", { style: { color: themeColors.legendText }, children: (_b2 = s.name) != null ? _b2 : s.dataKey })
              ] }, s.dataKey);
            })
          }
        )
      ]
    }
  );
};
var AreaChart_default = React5.memo(AreaChartComponent);

export {
  CHART_THEME_COLORS,
  CHART_COLORS,
  ChartTooltip,
  LineChart_default,
  BarChart_default,
  PieChart_default,
  AreaChart_default
};
//# sourceMappingURL=chunk-4T2FFCBO.mjs.map