import {
  linePath
} from "./chunk-L2ZFJ4GZ.mjs";
import {
  AnimatedLineStroke
} from "./chunk-XFSVRNJR.mjs";
import {
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
  xTickIndices
} from "./chunk-SEUD4RWC.mjs";
import {
  CHART_COLORS,
  CHART_THEME_COLORS,
  ChartTooltip
} from "./chunk-L7FCKHCM.mjs";

// src/components/charts/ComposedChart.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var ComposedChartComponent = (props) => {
  var _a, _b, _c, _d;
  const {
    data,
    xAxisKey = "name",
    series,
    colors = CHART_COLORS,
    curve = "monotone",
    showDots = true,
    dotSize = 3,
    strokeWidth = 2,
    barSize = 24,
    barGap = 4,
    barCategoryGap = "10%",
    radius = 4,
    stackedBars = false,
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
    showCrosshair = true,
    chartAnimation = true,
    className = "",
    style = {},
    xTickAngle = 0,
    xTickInterval = 0,
    yTickCount = 5,
    xTickFormatter
  } = props;
  const axes = resolveAxes(props, series);
  const animCfg = resolveChartAnimation(chartAnimation, "line");
  const animKey = useMemo(
    () => `${data.length}-${series.map((s) => `${s.type}:${s.dataKey}`).join(",")}-${xAxisKey}`,
    [data.length, series, xAxisKey]
  );
  const progress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);
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
  const slot = innerW / n;
  const centers = data.map((_, i) => m.left + (i + 0.5) * slot);
  const sideOf = (s) => axes.hasRight && s.yAxis === "right" ? "right" : "left";
  const colorOf = (s, i) => {
    var _a2;
    return (_a2 = s.color) != null ? _a2 : colors[i % colors.length];
  };
  const extentFor = (side) => {
    let lo = Infinity;
    let hi = -Infinity;
    const ss = series.filter((s) => sideOf(s) === side);
    if (ss.length === 0)
      return [0, 1];
    const push = (v) => {
      if (v < lo)
        lo = v;
      if (v > hi)
        hi = v;
    };
    if (ss.some((s) => s.type === "bar" || s.type === "area"))
      push(0);
    for (const row of data) {
      let pos = 0;
      let neg = 0;
      for (const s of ss) {
        const v = num(row, s.dataKey);
        if (s.type === "bar" && stackedBars) {
          if (v >= 0)
            pos += v;
          else
            neg += v;
        } else
          push(v);
        if (s.type === "range" && s.upperDataKey)
          push(num(row, s.upperDataKey));
      }
      if (stackedBars) {
        push(pos);
        push(neg);
      }
    }
    if (lo === Infinity)
      return [0, 1];
    if (lo === hi)
      hi = lo + 1;
    return [lo, hi];
  };
  const leftAxis = buildValueAxis(extentFor("left"), [innerH, 0], axes.showYAxis, yTickCount);
  const rightAxis = axes.hasRight ? buildValueAxis(extentFor("right"), [innerH, 0], axes.showYAxis, yTickCount) : leftAxis;
  const axisOf = (s) => sideOf(s) === "right" ? rightAxis : leftAxis;
  const yOf = (s, v) => m.top + axisOf(s).scale(v);
  const zeroY = (s) => {
    const [d0, d1] = axisOf(s).domain;
    return yOf(s, Math.min(Math.max(0, d0), d1));
  };
  const barSeries = series.map((s, i) => ({ s, i })).filter(({ s }) => s.type === "bar");
  const stackSides = Array.from(new Set(barSeries.map(({ s }) => sideOf(s))));
  const barsPerGroup = stackedBars ? stackSides.length : barSeries.length;
  const catGap = typeof barCategoryGap === "string" && barCategoryGap.endsWith("%") ? slot * (parseFloat(barCategoryGap) / 100) : typeof barCategoryGap === "number" ? barCategoryGap : 8;
  const barWidth = Math.min(barSize, Math.max(2, (slot - catGap - (barsPerGroup - 1) * barGap) / Math.max(1, barsPerGroup)));
  const totalBarWidth = barsPerGroup * barWidth + Math.max(0, barsPerGroup - 1) * barGap;
  const bars = [];
  data.forEach((row, idx) => {
    const cumPos = {};
    const cumNeg = {};
    barSeries.forEach(({ s, i }, bi) => {
      var _a2, _b2;
      const v = num(row, s.dataKey);
      const side = sideOf(s);
      let v0 = 0;
      let pos = bi;
      if (stackedBars) {
        pos = stackSides.indexOf(side);
        if (v >= 0) {
          v0 = (_a2 = cumPos[side]) != null ? _a2 : 0;
          cumPos[side] = v0 + v;
        } else {
          v0 = (_b2 = cumNeg[side]) != null ? _b2 : 0;
          cumNeg[side] = v0 + v;
        }
      }
      const a = yOf(s, v0 * progress);
      const b = yOf(s, (v0 + v) * progress);
      bars.push({
        key: `${idx}-${s.dataKey}`,
        idx,
        x: m.left + idx * slot + (slot - totalBarWidth) / 2 + pos * (barWidth + barGap),
        y: Math.min(a, b),
        w: barWidth,
        h: Math.abs(b - a),
        fill: colorOf(s, i)
      });
    });
  });
  const pts = (s, key) => data.map((row, i) => ({ x: centers[i], y: yOf(s, num(row, key)) }));
  const xLabels = useMemo(
    () => data.map((d, i) => {
      var _a2;
      return xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String((_a2 = d[xAxisKey]) != null ? _a2 : "");
    }),
    [data, xAxisKey, xTickFormatter]
  );
  const { valueFormatter, labelFormat } = axes;
  const fmt = useCallback(
    (v, key) => valueFormatter ? valueFormatter(v, key) : void 0,
    [valueFormatter]
  );
  const handleMove = useCallback(
    (e, idx) => {
      if (!showTooltip || !containerRef.current)
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const row = data[idx];
      const items = series.map((s, i) => {
        var _a2, _b2, _c2, _d2;
        const v = num(row, s.dataKey);
        if (s.type === "range" && s.upperDataKey) {
          const hi = num(row, s.upperDataKey);
          return {
            name: (_a2 = s.name) != null ? _a2 : `${s.dataKey}\u2013${s.upperDataKey}`,
            value: v,
            color: colorOf(s, i),
            displayValue: `${(_b2 = fmt(v, s.dataKey)) != null ? _b2 : v} \u2013 ${(_c2 = fmt(hi, s.upperDataKey)) != null ? _c2 : hi}`
          };
        }
        return { name: (_d2 = s.name) != null ? _d2 : s.dataKey, value: v, color: colorOf(s, i), displayValue: fmt(v, s.dataKey) };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row, idx, xAxisKey, labelFormat),
        items,
        activeIndex: idx
      });
    },
    // colorOf is derived from series/colors
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showTooltip, data, series, colors, xAxisKey, labelFormat, fmt]
  );
  const gridYs = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => innerH * t);
  const tickIdx = xTickIndices(xLabels, xTickInterval, slot, xTickAngle);
  const ordered = (type) => series.map((s, i) => ({ s, i })).filter(({ s }) => s.type === type);
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
        /* @__PURE__ */ jsxs("svg", { width: "100%", height: "100%", viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: "xMidYMid meet", onMouseLeave: () => setTooltip(null), children: [
          showGrid && /* @__PURE__ */ jsx("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: gridYs.map((gy) => /* @__PURE__ */ jsx("line", { x1: m.left, y1: m.top + gy, x2: m.left + innerW, y2: m.top + gy }, gy)) }),
          showTooltip && /* @__PURE__ */ jsx("g", { fill: "transparent", children: data.map((_, idx) => /* @__PURE__ */ jsx("rect", { x: m.left + idx * slot, y: m.top, width: slot, height: innerH, onMouseMove: (e) => handleMove(e, idx) }, idx)) }),
          ordered("range").map(({ s, i }) => {
            var _a2, _b2;
            if (!s.upperDataKey)
              return null;
            const c = (_a2 = s.curve) != null ? _a2 : curve;
            const upper = pts(s, s.upperDataKey);
            const lower = pts(s, s.dataKey);
            const upperD = linePath(upper, c);
            const lowerRev = linePath([...lower].reverse(), c).replace(/^M/, "L");
            return /* @__PURE__ */ jsx(
              "path",
              {
                "data-series-type": "range",
                d: `${upperD} ${lowerRev} Z`,
                fill: colorOf(s, i),
                fillOpacity: ((_b2 = s.fillOpacity) != null ? _b2 : 0.2) * progress,
                stroke: "none",
                pointerEvents: "none"
              },
              `range-${s.dataKey}`
            );
          }),
          ordered("area").map(({ s, i }) => {
            var _a2, _b2, _c2;
            const c = (_a2 = s.curve) != null ? _a2 : curve;
            const p = pts(s, s.dataKey);
            if (p.length === 0)
              return null;
            const base = zeroY(s);
            const d = `${linePath(p, c)} L ${p[p.length - 1].x} ${base} L ${p[0].x} ${base} Z`;
            return /* @__PURE__ */ jsxs("g", { "data-series-type": "area", pointerEvents: "none", children: [
              /* @__PURE__ */ jsx("path", { d, fill: colorOf(s, i), fillOpacity: ((_b2 = s.fillOpacity) != null ? _b2 : 0.3) * progress, stroke: "none" }),
              /* @__PURE__ */ jsx(AnimatedLineStroke, { pathD: linePath(p, c), progress, color: colorOf(s, i), strokeWidth: (_c2 = s.strokeWidth) != null ? _c2 : strokeWidth })
            ] }, `area-${s.dataKey}`);
          }),
          bars.map((b) => /* @__PURE__ */ jsx(
            "rect",
            {
              "data-series-type": "bar",
              x: b.x,
              y: b.y,
              width: b.w,
              height: Math.max(0, b.h),
              fill: b.fill,
              rx: radius,
              ry: radius,
              onMouseMove: (e) => handleMove(e, b.idx)
            },
            b.key
          )),
          ordered("line").map(({ s, i }) => {
            var _a2, _b2, _c2;
            const p = pts(s, s.dataKey);
            const d = linePath(p, (_a2 = s.curve) != null ? _a2 : curve);
            const color = colorOf(s, i);
            const sw = (_b2 = s.strokeWidth) != null ? _b2 : strokeWidth;
            return /* @__PURE__ */ jsxs("g", { "data-series-type": "line", pointerEvents: "none", children: [
              s.strokeDasharray ? /* @__PURE__ */ jsx("path", { d, fill: "none", stroke: color, strokeWidth: sw, strokeDasharray: s.strokeDasharray, opacity: progress }) : /* @__PURE__ */ jsx(AnimatedLineStroke, { pathD: d, progress, color, strokeWidth: sw }),
              ((_c2 = s.showDots) != null ? _c2 : showDots) && p.map((pt, k) => /* @__PURE__ */ jsx("circle", { cx: pt.x, cy: pt.y, r: dotSize, fill: color, stroke: themeColors.tooltipBg, strokeWidth: 1, opacity: Math.min(1, progress * 2.5) }, k))
            ] }, `line-${s.dataKey}`);
          }),
          showTooltip && showCrosshair && tooltip !== null && data.length > 0 && /* @__PURE__ */ jsxs("g", { className: "ds-chart-crosshair", pointerEvents: "none", children: [
            /* @__PURE__ */ jsx(
              "line",
              {
                x1: centers[tooltip.activeIndex],
                y1: m.top,
                x2: centers[tooltip.activeIndex],
                y2: m.top + innerH,
                stroke: themeColors.gridColor,
                strokeWidth: 1,
                strokeDasharray: "4 6",
                opacity: 0.85
              }
            ),
            series.map(
              (s, i) => s.type === "line" || s.type === "area" ? /* @__PURE__ */ jsx(
                "circle",
                {
                  cx: centers[tooltip.activeIndex],
                  cy: yOf(s, num(data[tooltip.activeIndex], s.dataKey)),
                  r: dotSize + 3,
                  fill: colorOf(s, i),
                  stroke: themeColors.tooltipBg,
                  strokeWidth: 2
                },
                `hit-${s.dataKey}`
              ) : null
            )
          ] }),
          axes.showYAxis && /* @__PURE__ */ jsx(YAxisLabels, { ticks: leftAxis.ticks, scale: (v) => m.top + leftAxis.scale(v), x: m.left, side: "left", format: axes.leftTickFormat, color: themeColors.axisText }),
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
          /* @__PURE__ */ jsx(XAxisLabels, { positions: centers, labels: xLabels, indices: tickIdx, y: m.top + innerH + 16, angle: xTickAngle, color: themeColors.axisText })
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
          ChartLegend,
          {
            position: legendPosition,
            textColor: themeColors.legendText,
            items: series.map((s, i) => {
              var _a2;
              return {
                key: `${s.type}-${s.dataKey}`,
                label: (_a2 = s.name) != null ? _a2 : s.dataKey,
                color: colorOf(s, i),
                shape: s.type === "line" ? "line" : s.type === "range" ? "band" : "square"
              };
            })
          }
        )
      ]
    }
  );
};
var ComposedChart = React.memo(ComposedChartComponent);
ComposedChart.displayName = "ComposedChart";
var ComposedChart_default = ComposedChart;

export {
  ComposedChart_default
};
//# sourceMappingURL=chunk-WOKGRJOB.mjs.map