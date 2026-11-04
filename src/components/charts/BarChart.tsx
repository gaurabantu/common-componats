"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import type { CartesianAxisProps, ChartDataPoint, ChartDataSeries, ChartLayoutProps, ChartTooltipItem } from "./Chart.types";
import { CHART_THEME_COLORS } from "./Chart.types";
import { ChartTooltip } from "./ChartTooltip";
import { resolveChartAnimation, barProgressForIndex, useChartAnimationProgress } from "./useChartAnimation";
import {
  ChartLegend,
  XAxisLabels,
  YAxisLabels,
  buildValueAxis,
  num,
  resolveAxes,
  tooltipLabel,
  tooltipValue,
  xTickIndices,
} from "./cartesian";

const DEFAULT_COLORS = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)",
];

/** Unambiguous bar direction (see `BarChartProps.orientation`). */
export type BarChartOrientation = "vertical-bars" | "horizontal-bars";

export interface BarChartProps extends ChartLayoutProps, CartesianAxisProps {
  data: ChartDataPoint[];
  xAxisKey?: string;
  series: ChartDataSeries[];
  colors?: string[];
  /**
   * Bar direction — **library semantics, the opposite of recharts' `layout`**:
   * - `"vertical"` (default) = vertical bars / columns, categories along the X axis
   *   (recharts `layout="horizontal"`).
   * - `"horizontal"` = horizontal bars, categories down the left edge
   *   (recharts `layout="vertical"`).
   *
   * Prefer the unambiguous `orientation` prop; when both are set `orientation` wins.
   */
  layout?: "vertical" | "horizontal";
  /**
   * Unambiguous alias of `layout`: `"vertical-bars"` = columns (categories on X),
   * `"horizontal-bars"` = bars growing left→right (categories on Y). Wins over `layout`.
   */
  orientation?: BarChartOrientation;
  barSize?: number;
  barGap?: number;
  barCategoryGap?: number | string;
  radius?: number | [number, number, number, number];
  /**
   * Stack series on top of each other (positive values up, negatives down).
   * With dual axes, left- and right-axis series form two side-by-side stacks.
   */
  stacked?: boolean;
  /**
   * Per-bar colour (recharts `<Cell>` equivalent). Return `undefined` to fall back to
   * `colorKey` → `series.color` → `colors`.
   */
  getBarColor?: (datum: ChartDataPoint, index: number, dataKey: string) => string | undefined;
  /**
   * Name of a datum field holding a per-bar colour (e.g. `"fill"` or `"color"`).
   * Used when `getBarColor` is not set or returns `undefined`.
   */
  colorKey?: string;
}

type BarRect = { key: string; x: number; y: number; w: number; h: number; fill: string; idx: number };

function valueExtent(
  data: ChartDataPoint[],
  series: ChartDataSeries[],
  stacked: boolean,
): [number, number] {
  let lo = 0;
  let hi = 0;
  for (const row of data) {
    if (stacked) {
      let pos = 0;
      let neg = 0;
      for (const s of series) {
        const v = num(row, s.dataKey);
        if (v >= 0) pos += v;
        else neg += v;
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
  if (lo === hi) hi = lo + 1;
  return [lo, hi];
}

const BarChartComponent: React.FC<BarChartProps> = (props) => {
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
    xTickFormatter,
  } = props;

  const horizontal = orientation ? orientation === "horizontal-bars" : layout === "horizontal";
  // Dual axes are supported for vertical bars only.
  const axisSeries = horizontal ? series.map((s) => ({ ...s, yAxis: "left" as const })) : series;
  const axes = resolveAxes(props, axisSeries);

  const animCfg = resolveChartAnimation(chartAnimation, "bar");
  const animKey = useMemo(
    () => `${data.length}-${series.map((s) => s.dataKey).join(",")}-${xAxisKey}-${horizontal}-${stacked}`,
    [data.length, series, xAxisKey, horizontal, stacked],
  );
  const animProgress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);

  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor ?? themeColors.gridColor;
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    pointerX: number;
    pointerY: number;
    cw: number;
    ch: number;
    label: string;
    items: ChartTooltipItem[];
  } | null>(null);

  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: margin?.top ?? 10,
    right: margin?.right ?? (axes.hasRight && axes.showYAxis ? 48 : 20),
    bottom: margin?.bottom ?? 30,
    left: margin?.left ?? 40,
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const n = Math.max(1, data.length);

  const sideOf = (s: ChartDataSeries): "left" | "right" => (axes.hasRight && s.yAxis === "right" ? "right" : "left");

  // Value axes (always include 0 so bars grow from the zero line).
  const valueRange: [number, number] = horizontal ? [0, innerW] : [innerH, 0];
  const leftAxis = buildValueAxis(
    valueExtent(data, axes.hasRight ? axisSeries.filter((s) => sideOf(s) === "left") : axisSeries, stacked),
    valueRange,
    axes.showYAxis,
    yTickCount,
  );
  const rightAxis = axes.hasRight
    ? buildValueAxis(valueExtent(data, axisSeries.filter((s) => sideOf(s) === "right"), stacked), valueRange, axes.showYAxis, yTickCount)
    : leftAxis;
  const scaleFor = (s: ChartDataSeries) => (sideOf(s) === "right" ? rightAxis.scale : leftAxis.scale);

  // Band geometry along the category axis.
  const bandLen = horizontal ? innerH : innerW;
  const slot = bandLen / n;
  const catGap =
    typeof barCategoryGap === "string" && barCategoryGap.endsWith("%")
      ? slot * (parseFloat(barCategoryGap) / 100)
      : typeof barCategoryGap === "number"
        ? barCategoryGap
        : 8;
  const groupWidth = slot - catGap;
  // Bars per category: one per series, or one per stack (axis side) when stacked.
  const stackSides: ("left" | "right")[] = axes.hasRight ? ["left", "right"] : ["left"];
  const barsPerGroup = stacked ? stackSides.length : series.length;
  const barWidth = Math.min(barSize, Math.max(2, (groupWidth - (barsPerGroup - 1) * barGap) / Math.max(1, barsPerGroup)));
  const totalBarWidth = barsPerGroup * barWidth + (barsPerGroup - 1) * barGap;

  const colorOf = (row: ChartDataPoint, idx: number, s: ChartDataSeries, si: number): string => {
    const custom = getBarColor?.(row, idx, s.dataKey);
    if (custom) return custom;
    if (colorKey) {
      const c = row[colorKey];
      if (typeof c === "string" && c) return c;
    }
    return s.color ?? colors[si % colors.length];
  };

  const rects: BarRect[] = [];
  data.forEach((row, idx) => {
    const growth = animCfg.barStagger ? barProgressForIndex(animProgress, idx, n, true) : animProgress;
    const groupStart = idx * slot + (slot - totalBarWidth) / 2;
    const cumPos: Record<string, number> = { left: 0, right: 0 };
    const cumNeg: Record<string, number> = { left: 0, right: 0 };
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
      if (horizontal) {
        rects.push({ key: `${idx}-${s.dataKey}`, x: m.left + Math.min(a, b), y: m.top + offset, w: Math.abs(b - a), h: barWidth, fill, idx });
      } else {
        rects.push({ key: `${idx}-${s.dataKey}`, x: m.left + offset, y: m.top + Math.min(a, b), w: barWidth, h: Math.abs(b - a), fill, idx });
      }
    });
  });

  const categoryLabels = useMemo(
    () => data.map((d, i) => (xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String(d[xAxisKey] ?? ""))),
    [data, xAxisKey, xTickFormatter],
  );

  const { valueFormatter, labelFormat } = axes;
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGElement>, idx: number) => {
      if (!showTooltip || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const row = data[idx];
      const items = series.map((s, i) => {
        const v = num(row, s.dataKey);
        const custom = getBarColor?.(row, idx, s.dataKey);
        const keyed = colorKey && typeof row[colorKey] === "string" ? (row[colorKey] as string) : undefined;
        return {
          name: s.name ?? s.dataKey,
          value: v,
          color: custom || keyed || s.color || colors[i % colors.length],
          displayValue: tooltipValue(valueFormatter, v, s.dataKey),
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row, idx, xAxisKey, labelFormat),
        items,
      });
    },
    [showTooltip, data, series, xAxisKey, colors, getBarColor, colorKey, valueFormatter, labelFormat],
  );

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  const r = Array.isArray(radius) ? radius[0] : radius;
  const bandCenters = data.map((_, i) => (horizontal ? m.top : m.left) + (i + 0.5) * slot);
  const tickIdx = horizontal ? data.map((_, i) => i) : xTickIndices(categoryLabels, xTickInterval, slot, xTickAngle);

  const gridLines = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => (horizontal ? innerW : innerH) * t);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        position: "relative",
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid meet"
        onMouseLeave={handleMouseLeave}
      >
        {showGrid && (
          <g stroke={gridStroke} strokeDasharray="3 3" strokeOpacity={0.6}>
            {gridLines.map((g) =>
              horizontal ? (
                <line key={g} x1={m.left + g} y1={m.top} x2={m.left + g} y2={m.top + innerH} />
              ) : (
                <line key={g} x1={m.left} y1={m.top + g} x2={m.left + innerW} y2={m.top + g} />
              ),
            )}
          </g>
        )}
        {showTooltip && (
          <g className="ds-chart-bar-bands" fill="transparent">
            {data.map((_, idx) =>
              horizontal ? (
                <rect key={idx} x={m.left} y={m.top + idx * slot} width={innerW} height={slot} onMouseMove={(e) => handleMouseMove(e, idx)} />
              ) : (
                <rect key={idx} x={m.left + idx * slot} y={m.top} width={slot} height={innerH} onMouseMove={(e) => handleMouseMove(e, idx)} />
              ),
            )}
          </g>
        )}
        {rects.map((b) => (
          <rect
            key={b.key}
            x={b.x}
            y={b.y}
            width={Math.max(0, b.w)}
            height={Math.max(0, b.h)}
            fill={b.fill}
            rx={r}
            ry={r}
            data-testid="ds-chart-bar"
            onMouseMove={(e) => handleMouseMove(e, b.idx)}
          />
        ))}
        {horizontal ? (
          <>
            <g className="ds-chart-category-axis" fill={themeColors.axisText} fontSize={11} textAnchor="end">
              {data.map((_, i) => (
                <text key={i} x={m.left - 6} y={bandCenters[i]} dominantBaseline="middle">
                  {categoryLabels[i]}
                </text>
              ))}
            </g>
            {axes.showYAxis && (
              <g className="ds-chart-value-axis" fill={themeColors.axisText} fontSize={11} textAnchor="middle">
                {leftAxis.ticks.map((t) => (
                  <text key={t} x={m.left + leftAxis.scale(t)} y={m.top + innerH + 16}>
                    {axes.leftTickFormat(t)}
                  </text>
                ))}
              </g>
            )}
          </>
        ) : (
          <>
            {axes.showYAxis && (
              <YAxisLabels
                ticks={leftAxis.ticks}
                scale={(v) => m.top + leftAxis.scale(v)}
                x={m.left}
                side="left"
                format={axes.leftTickFormat}
                color={themeColors.axisText}
              />
            )}
            {axes.showYAxis && axes.hasRight && (
              <YAxisLabels
                ticks={rightAxis.ticks}
                scale={(v) => m.top + rightAxis.scale(v)}
                x={m.left + innerW}
                side="right"
                format={axes.rightTickFormat}
                color={themeColors.axisText}
              />
            )}
            <XAxisLabels
              positions={bandCenters}
              labels={categoryLabels}
              indices={tickIdx}
              y={m.top + innerH + 16}
              angle={xTickAngle}
              color={themeColors.axisText}
            />
          </>
        )}
      </svg>
      {showTooltip && tooltip && (
        <ChartTooltip
          theme={theme}
          open
          pointerX={tooltip.pointerX}
          pointerY={tooltip.pointerY}
          containerWidth={tooltip.cw}
          containerHeight={tooltip.ch}
          label={tooltip.label}
          items={tooltip.items}
          animation={tooltipAnimation}
          followPointer={tooltipFollowPointer}
        />
      )}
      {showLegend && (
        <ChartLegend
          position={legendPosition}
          textColor={themeColors.legendText}
          items={series.map((s, i) => ({ key: s.dataKey, label: s.name ?? s.dataKey, color: s.color ?? colors[i % colors.length], shape: "square" }))}
        />
      )}
    </div>
  );
};

export default React.memo(BarChartComponent);
