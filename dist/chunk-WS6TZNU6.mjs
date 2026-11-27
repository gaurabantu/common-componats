import {
  areaPath,
  getValueExtent,
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
  seriesOnSide,
  tooltipLabel,
  tooltipValue,
  xTickIndices
} from "./chunk-SEUD4RWC.mjs";
import {
  CHART_THEME_COLORS,
  ChartTooltip
} from "./chunk-L7FCKHCM.mjs";

// src/components/charts/AreaChart.tsx
import React, { useCallback, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_COLORS = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)"
];
var AreaChartComponent = (props) => {
  var _a, _b, _c, _d;
  const {
    data,
    xAxisKey = "name",
    series,
    colors = DEFAULT_COLORS,
    stacked = false,
    curve = "monotone",
    strokeWidth = 2,
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
  const axisSeries = stacked ? series.map((s) => ({ ...s, yAxis: "left" })) : series;
  const axes = resolveAxes(props, axisSeries);
  const animCfg = resolveChartAnimation(chartAnimation, "area");
  const animKey = useMemo(
    () => `${data.length}-${series.map((s) => s.dataKey).join(",")}-${xAxisKey}-${stacked}-${curve}`,
    [data.length, series, xAxisKey, stacked, curve]
  );
  const animProgress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
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
  const colorOf = (s, i) => {
    var _a2;
    return (_a2 = s.color) != null ? _a2 : colors[i % colors.length];
  };
  const xLabels = useMemo(
    () => data.map((d, i) => {
      var _a2;
      return xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String((_a2 = d[xAxisKey]) != null ? _a2 : "");
    }),
    [data, xAxisKey, xTickFormatter]
  );
  const leftSeries = axes.hasRight ? seriesOnSide(axisSeries, "left") : series;
  const rightSeries = axes.hasRight ? seriesOnSide(axisSeries, "right") : [];
  const leftAxis = buildValueAxis(getValueExtent(data, leftSeries, stacked), [innerH, 0], axes.showYAxis, yTickCount);
  const rightAxis = axes.hasRight ? buildValueAxis(getValueExtent(data, rightSeries), [innerH, 0], axes.showYAxis, yTickCount) : leftAxis;
  const yScaleFor = (s) => !stacked && s.yAxis === "right" && axes.hasRight ? rightAxis.scale : leftAxis.scale;
  const xScale = (i) => i / Math.max(1, data.length - 1) * innerW;
  const xPositions = data.map((_, i) => m.left + xScale(i));
  const finalPaths = (() => {
    if (stacked) {
      const cum = new Array(data.length).fill(0);
      return series.map((s, si) => {
        const basePoints = data.map((_, i) => ({
          x: m.left + xScale(i),
          y: si === 0 ? m.top + innerH : m.top + leftAxis.scale(cum[i])
        }));
        const topPoints = data.map((row, i) => {
          cum[i] += num(row, s.dataKey);
          return { x: m.left + xScale(i), y: m.top + leftAxis.scale(cum[i]) };
        });
        const areaD = "M " + topPoints.map((p) => `${p.x} ${p.y}`).join(" L ") + " L " + [...basePoints].reverse().map((p) => `${p.x} ${p.y}`).join(" L ") + " Z";
        return { key: s.dataKey, areaPath: areaD, linePath: linePath(topPoints, curve), points: topPoints, color: colorOf(s, si) };
      });
    }
    return series.map((s, si) => {
      const ys = yScaleFor(s);
      const points = data.map((d, i) => ({ x: m.left + xScale(i), y: m.top + ys(num(d, s.dataKey)) }));
      const baseY = m.top + innerH;
      return {
        key: s.dataKey,
        areaPath: areaPath(points, baseY, curve),
        linePath: linePath(points, curve),
        points,
        color: colorOf(s, si)
      };
    });
  })();
  const { valueFormatter, labelFormat } = axes;
  const handleMouseMove = useCallback(
    (e) => {
      if (!showTooltip || data.length === 0)
        return;
      const rect = e.currentTarget.getBoundingClientRect();
      const scaleX = rect.width > 0 ? w / rect.width : 1;
      const x = (e.clientX - rect.left) * scaleX - m.left;
      const idx = Math.round(x / innerW * (data.length - 1));
      const clamped = Math.max(0, Math.min(idx, data.length - 1));
      const row = data[clamped];
      const items = series.map((s, i) => {
        var _a2, _b2;
        const v = num(row, s.dataKey);
        return {
          name: (_a2 = s.name) != null ? _a2 : s.dataKey,
          value: v,
          color: (_b2 = s.color) != null ? _b2 : colors[i % colors.length],
          displayValue: tooltipValue(valueFormatter, v, s.dataKey)
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row, clamped, xAxisKey, labelFormat),
        items,
        activeIndex: clamped
      });
    },
    [showTooltip, data, series, xAxisKey, colors, innerW, m.left, w, valueFormatter, labelFormat]
  );
  const handleMouseLeave = useCallback(() => setTooltip(null), []);
  const gridYs = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => innerH * t);
  const tickIdx = xTickIndices(xLabels, xTickInterval, innerW / Math.max(1, data.length - 1), xTickAngle);
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsxs(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ jsx("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: gridYs.map((gy) => /* @__PURE__ */ jsx("line", { x1: m.left, y1: m.top + gy, x2: m.left + innerW, y2: m.top + gy }, gy)) }),
              finalPaths.map(({ key, areaPath: ap, linePath: lp, color }) => /* @__PURE__ */ jsxs("g", { children: [
                /* @__PURE__ */ jsx("path", { d: ap, fill: color, fillOpacity: (stacked ? 0.8 : 0.3) * animProgress, stroke: "none" }),
                /* @__PURE__ */ jsx(AnimatedLineStroke, { pathD: lp, progress: animProgress, color, strokeWidth })
              ] }, key)),
              showTooltip && showCrosshair && tooltip !== null && data.length > 0 && /* @__PURE__ */ jsxs("g", { className: "ds-chart-crosshair", pointerEvents: "none", children: [
                /* @__PURE__ */ jsx(
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
                finalPaths.map(({ key, points, color }) => {
                  const p = points[tooltip.activeIndex];
                  if (!p)
                    return null;
                  return /* @__PURE__ */ jsx(
                    "circle",
                    {
                      cx: p.x,
                      cy: p.y,
                      r: 6,
                      fill: color,
                      stroke: themeColors.tooltipBg,
                      strokeWidth: 2,
                      opacity: 0.92 * animProgress
                    },
                    `hit-${key}`
                  );
                })
              ] }),
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
                  positions: xPositions,
                  labels: xLabels,
                  indices: tickIdx,
                  y: m.top + innerH + 16,
                  angle: xTickAngle,
                  color: themeColors.axisText
                }
              )
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
              var _a2;
              return { key: s.dataKey, label: (_a2 = s.name) != null ? _a2 : s.dataKey, color: colorOf(s, i), shape: "square" };
            })
          }
        )
      ]
    }
  );
};
var AreaChart_default = React.memo(AreaChartComponent);

export {
  AreaChart_default
};
//# sourceMappingURL=chunk-WS6TZNU6.mjs.map