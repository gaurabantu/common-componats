import {
  barProgressForIndex,
  resolveChartAnimation,
  useChartAnimationProgress
} from "./chunk-3R3T3GO2.mjs";
import {
  ChartLegend,
  XAxisLabels,
  YAxisLabels,
  buildValueAxis,
  num,
  resolveAxes,
  tooltipLabel,
  tooltipValue,
  xTickIndices
} from "./chunk-SEUD4RWC.mjs";
import {
  CHART_THEME_COLORS,
  ChartTooltip
} from "./chunk-L7FCKHCM.mjs";

// src/components/charts/BarChart.tsx
import React, { useCallback, useId, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_COLORS = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)"
];
var STACK_GAP = 2;
function valueExtent(data, series, stacked) {
  let lo = 0;
  let hi = 0;
  for (const row of data) {
    if (stacked) {
      let pos = 0;
      let neg = 0;
      for (const s of series) {
        const v = num(row, s.dataKey);
        if (v >= 0)
          pos += v;
        else
          neg += v;
      }
      hi = Math.max(hi, pos);
      lo = Math.min(lo, neg);
    } else {
      for (const s of series) {
        const v = num(row, s.dataKey);
        hi = Math.max(hi, v);
        lo = Math.min(lo, v);
      }
    }
  }
  if (lo === hi)
    hi = lo + 1;
  return [lo, hi];
}
var BarChartComponent = (props) => {
  var _a, _b, _c, _d;
  const {
    data,
    xAxisKey = "name",
    series,
    colors = DEFAULT_COLORS,
    layout = "vertical",
    orientation,
    barSize = 24,
    barGap = 4,
    barCategoryGap = "10%",
    radius = 4,
    stacked = false,
    getBarColor,
    colorKey,
    width = "100%",
    height = 300,
    margin,
    showGrid = true,
    gridColor,
    showTooltip = true,
    showLegend = true,
    legendPosition = "bottom",
    theme = "light",
    tooltipFollowPointer = true,
    tooltipAnimation = true,
    chartAnimation = true,
    className = "",
    style = {},
    xTickAngle = 0,
    xTickInterval = 0,
    yTickCount = 5,
    xTickFormatter
  } = props;
  const horizontal = orientation ? orientation === "horizontal-bars" : layout === "horizontal";
  const axisSeries = horizontal ? series.map((s) => ({ ...s, yAxis: "left" })) : series;
  const axes = resolveAxes(props, axisSeries);
  const animCfg = resolveChartAnimation(chartAnimation, "bar");
  const animKey = useMemo(
    () => `${data.length}-${series.map((s) => s.dataKey).join(",")}-${xAxisKey}-${horizontal}-${stacked}`,
    [data.length, series, xAxisKey, horizontal, stacked]
  );
  const animProgress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : axes.hasRight && axes.showYAxis ? 48 : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const n = Math.max(1, data.length);
  const sideOf = (s) => axes.hasRight && s.yAxis === "right" ? "right" : "left";
  const valueRange = horizontal ? [0, innerW] : [innerH, 0];
  const leftAxis = buildValueAxis(
    valueExtent(data, axes.hasRight ? axisSeries.filter((s) => sideOf(s) === "left") : axisSeries, stacked),
    valueRange,
    axes.showYAxis,
    yTickCount
  );
  const rightAxis = axes.hasRight ? buildValueAxis(valueExtent(data, axisSeries.filter((s) => sideOf(s) === "right"), stacked), valueRange, axes.showYAxis, yTickCount) : leftAxis;
  const scaleFor = (s) => sideOf(s) === "right" ? rightAxis.scale : leftAxis.scale;
  const bandLen = horizontal ? innerH : innerW;
  const slot = bandLen / n;
  const catGap = typeof barCategoryGap === "string" && barCategoryGap.endsWith("%") ? slot * (parseFloat(barCategoryGap) / 100) : typeof barCategoryGap === "number" ? barCategoryGap : 8;
  const groupWidth = slot - catGap;
  const stackSides = axes.hasRight ? ["left", "right"] : ["left"];
  const barsPerGroup = stacked ? stackSides.length : series.length;
  const barWidth = Math.min(barSize, Math.max(2, (groupWidth - (barsPerGroup - 1) * barGap) / Math.max(1, barsPerGroup)));
  const totalBarWidth = barsPerGroup * barWidth + (barsPerGroup - 1) * barGap;
  const colorOf = (row, idx, s, si) => {
    var _a2;
    const custom = getBarColor == null ? void 0 : getBarColor(row, idx, s.dataKey);
    if (custom)
      return custom;
    if (colorKey) {
      const c = row[colorKey];
      if (typeof c === "string" && c)
        return c;
    }
    return (_a2 = s.color) != null ? _a2 : colors[si % colors.length];
  };
  const rects = [];
  data.forEach((row, idx) => {
    const growth = animCfg.barStagger ? barProgressForIndex(animProgress, idx, n, true) : animProgress;
    const groupStart = idx * slot + (slot - totalBarWidth) / 2;
    const cumPos = { left: 0, right: 0 };
    const cumNeg = { left: 0, right: 0 };
    series.forEach((s, si) => {
      const v = num(row, s.dataKey);
      const side = sideOf(s);
      let v0 = 0;
      let v1 = v;
      let pos = si;
      if (stacked) {
        pos = stackSides.indexOf(side);
        if (v >= 0) {
          v0 = cumPos[side];
          cumPos[side] += v;
        } else {
          v0 = cumNeg[side];
          cumNeg[side] += v;
        }
        v1 = v0 + v;
      }
      const sc = scaleFor(s);
      const a = sc(v0 * growth);
      const b = sc(v1 * growth);
      const offset = groupStart + pos * (barWidth + barGap);
      const fill = colorOf(row, idx, s, si);
      const negative = v < 0;
      const group = stacked ? `${idx}-${side}-${negative ? "n" : "p"}` : `${idx}-${s.dataKey}`;
      const gap = stacked && v0 !== 0 && Math.abs(b - a) > STACK_GAP * 2 ? STACK_GAP : 0;
      if (horizontal) {
        const dir = negative ? "left" : "right";
        const x0 = m.left + Math.min(a, b) + (dir === "right" ? gap : 0);
        rects.push({ key: `${idx}-${s.dataKey}`, x: x0, y: m.top + offset, w: Math.max(0, Math.abs(b - a) - gap), h: barWidth, fill, idx, group, dir });
      } else {
        const dir = negative ? "down" : "up";
        const y0 = m.top + Math.min(a, b);
        const hh = Math.max(0, Math.abs(b - a) - gap);
        rects.push({ key: `${idx}-${s.dataKey}`, x: m.left + offset, y: dir === "down" ? y0 + gap : y0, w: barWidth, h: hh, fill, idx, group, dir });
      }
    });
  });
  const categoryLabels = useMemo(
    () => data.map((d, i) => {
      var _a2;
      return xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String((_a2 = d[xAxisKey]) != null ? _a2 : "");
    }),
    [data, xAxisKey, xTickFormatter]
  );
  const { valueFormatter, labelFormat } = axes;
  const handleMouseMove = useCallback(
    (e, idx) => {
      if (!showTooltip || !containerRef.current)
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const row = data[idx];
      const items = series.map((s, i) => {
        var _a2;
        const v = num(row, s.dataKey);
        const custom = getBarColor == null ? void 0 : getBarColor(row, idx, s.dataKey);
        const keyed = colorKey && typeof row[colorKey] === "string" ? row[colorKey] : void 0;
        return {
          name: (_a2 = s.name) != null ? _a2 : s.dataKey,
          value: v,
          color: custom || keyed || s.color || colors[i % colors.length],
          displayValue: tooltipValue(valueFormatter, v, s.dataKey)
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row, idx, xAxisKey, labelFormat),
        items
      });
    },
    [showTooltip, data, series, xAxisKey, colors, getBarColor, colorKey, valueFormatter, labelFormat]
  );
  const handleMouseLeave = useCallback(() => setTooltip(null), []);
  const r = Array.isArray(radius) ? radius[0] : radius;
  const clipUid = `ds-bar-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const clips = useMemo(() => {
    if (!(r > 0))
      return [];
    const byGroup = /* @__PURE__ */ new Map();
    rects.forEach((b) => {
      const g = byGroup.get(b.group);
      if (!g)
        byGroup.set(b.group, { x0: b.x, y0: b.y, x1: b.x + b.w, y1: b.y + b.h, dir: b.dir });
      else {
        g.x0 = Math.min(g.x0, b.x);
        g.y0 = Math.min(g.y0, b.y);
        g.x1 = Math.max(g.x1, b.x + b.w);
        g.y1 = Math.max(g.y1, b.y + b.h);
      }
    });
    return Array.from(byGroup.entries()).map(([group, g], i) => {
      let { x0, y0, x1, y1 } = g;
      if (g.dir === "up")
        y1 += r;
      else if (g.dir === "down")
        y0 -= r;
      else if (g.dir === "right")
        x0 -= r;
      else
        x1 += r;
      return { group, id: `${clipUid}-b${i}`, x: x0, y: y0, w: Math.max(0, x1 - x0), h: Math.max(0, y1 - y0) };
    });
  }, [rects.map((b) => `${b.group}:${b.x},${b.y},${b.w},${b.h}`).join("|"), r, clipUid]);
  const clipOf = useMemo(() => new Map(clips.map((c) => [c.group, c.id])), [clips]);
  const bandCenters = data.map((_, i) => (horizontal ? m.top : m.left) + (i + 0.5) * slot);
  const tickIdx = horizontal ? data.map((_, i) => i) : xTickIndices(categoryLabels, xTickInterval, slot, xTickAngle);
  const gridLines = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => (horizontal ? innerW : innerH) * t);
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsxs(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ jsx("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: gridLines.map(
                (g) => horizontal ? /* @__PURE__ */ jsx("line", { x1: m.left + g, y1: m.top, x2: m.left + g, y2: m.top + innerH }, g) : /* @__PURE__ */ jsx("line", { x1: m.left, y1: m.top + g, x2: m.left + innerW, y2: m.top + g }, g)
              ) }),
              showTooltip && /* @__PURE__ */ jsx("g", { className: "ds-chart-bar-bands", fill: "transparent", children: data.map(
                (_, idx) => horizontal ? /* @__PURE__ */ jsx("rect", { x: m.left, y: m.top + idx * slot, width: innerW, height: slot, onMouseMove: (e) => handleMouseMove(e, idx) }, idx) : /* @__PURE__ */ jsx("rect", { x: m.left + idx * slot, y: m.top, width: slot, height: innerH, onMouseMove: (e) => handleMouseMove(e, idx) }, idx)
              ) }),
              clips.length > 0 && /* @__PURE__ */ jsx("defs", { children: clips.map((c) => /* @__PURE__ */ jsx("clipPath", { id: c.id, children: /* @__PURE__ */ jsx("rect", { x: c.x, y: c.y, width: c.w, height: c.h, rx: r, ry: r }) }, c.id)) }),
              rects.map((b) => /* @__PURE__ */ jsx(
                "rect",
                {
                  x: b.x,
                  y: b.y,
                  width: Math.max(0, b.w),
                  height: Math.max(0, b.h),
                  fill: b.fill,
                  clipPath: clipOf.has(b.group) ? `url(#${clipOf.get(b.group)})` : void 0,
                  "data-testid": "ds-chart-bar",
                  onMouseMove: (e) => handleMouseMove(e, b.idx)
                },
                b.key
              )),
              horizontal ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("g", { className: "ds-chart-category-axis", fill: themeColors.axisText, fontSize: 11, textAnchor: "end", children: data.map((_, i) => /* @__PURE__ */ jsx("text", { x: m.left - 6, y: bandCenters[i], dominantBaseline: "middle", children: categoryLabels[i] }, i)) }),
                axes.showYAxis && /* @__PURE__ */ jsx("g", { className: "ds-chart-value-axis", fill: themeColors.axisText, fontSize: 11, textAnchor: "middle", children: leftAxis.ticks.map((t) => /* @__PURE__ */ jsx("text", { x: m.left + leftAxis.scale(t), y: m.top + innerH + 16, children: axes.leftTickFormat(t) }, t)) })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                axes.showYAxis && /* @__PURE__ */ jsx(
                  YAxisLabels,
                  {
                    ticks: leftAxis.ticks,
                    scale: (v) => m.top + leftAxis.scale(v),
                    x: m.left,
                    side: "left",
                    format: axes.leftTickFormat,
                    color: themeColors.axisText
                  }
                ),
                axes.showYAxis && axes.hasRight && /* @__PURE__ */ jsx(
                  YAxisLabels,
                  {
                    ticks: rightAxis.ticks,
                    scale: (v) => m.top + rightAxis.scale(v),
                    x: m.left + innerW,
                    side: "right",
                    format: axes.rightTickFormat,
                    color: themeColors.axisText
                  }
                ),
                /* @__PURE__ */ jsx(
                  XAxisLabels,
                  {
                    positions: bandCenters,
                    labels: categoryLabels,
                    indices: tickIdx,
                    y: m.top + innerH + 16,
                    angle: xTickAngle,
                    color: themeColors.axisText
                  }
                )
              ] })
            ]
          }
        ),
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
          ChartLegend,
          {
            position: legendPosition,
            textColor: themeColors.legendText,
            items: series.map((s, i) => {
              var _a2, _b2;
              return { key: s.dataKey, label: (_a2 = s.name) != null ? _a2 : s.dataKey, color: (_b2 = s.color) != null ? _b2 : colors[i % colors.length], shape: "square" };
            })
          }
        )
      ]
    }
  );
};
var BarChart_default = React.memo(BarChartComponent);

export {
  BarChart_default
};
//# sourceMappingURL=chunk-JPM3XGJO.mjs.map