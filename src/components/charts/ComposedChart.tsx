"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import type { CartesianAxisProps, ChartDataPoint, ChartDataSeries, ChartLayoutProps, ChartTooltipItem } from "./Chart.types";
import { CHART_COLORS, CHART_THEME_COLORS } from "./Chart.types";
import { AnimatedLineStroke } from "./chartPrimitives";
import { ChartTooltip } from "./ChartTooltip";
import { resolveChartAnimation, useChartAnimationProgress } from "./useChartAnimation";
import { linePath } from "./utils";
import {
  ChartLegend,
  XAxisLabels,
  YAxisLabels,
  buildValueAxis,
  num,
  resolveAxes,
  tooltipLabel,
  xTickIndices,
} from "./cartesian";

type Curve = "linear" | "monotone" | "step" | "stepBefore" | "stepAfter";

/** How a ComposedChart series is drawn. */
export type ComposedSeriesType = "bar" | "line" | "area" | "range";

export interface ComposedChartSeries extends ChartDataSeries {
  /**
   * - `bar` — grouped (or `stackedBars`) bars
   * - `line` — line (use `strokeDasharray` for dashed)
   * - `area` — filled area down to the zero line
   * - `range` — confidence / min–max band filled **between `dataKey` (lower) and `upperDataKey` (upper)**
   */
  type: ComposedSeriesType;
  /** `range` only: datum key of the upper bound (`dataKey` is the lower bound). */
  upperDataKey?: string;
  /** Fill opacity for `area` (default 0.3) and `range` (default 0.2) series. */
  fillOpacity?: number;
  /** Per-series curve for `line` / `area` / `range` (defaults to the chart `curve`). */
  curve?: Curve;
  /** Dots on `line` series (defaults to the chart `showDots`). */
  showDots?: boolean;
}

export interface ComposedChartProps extends ChartLayoutProps, CartesianAxisProps {
  data: ChartDataPoint[];
  xAxisKey?: string;
  series: ComposedChartSeries[];
  colors?: string[];
  curve?: Curve;
  /** @default true */
  showDots?: boolean;
  dotSize?: number;
  strokeWidth?: number;
  barSize?: number;
  barGap?: number;
  barCategoryGap?: number | string;
  radius?: number;
  /** Stack all `bar` series that share an axis. */
  stackedBars?: boolean;
}

const ComposedChartComponent: React.FC<ComposedChartProps> = (props) => {
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
    xTickFormatter,
  } = props;

  const axes = resolveAxes(props, series);
  const animCfg = resolveChartAnimation(chartAnimation, "line");
  const animKey = useMemo(
    () => `${data.length}-${series.map((s) => `${s.type}:${s.dataKey}`).join(",")}-${xAxisKey}`,
    [data.length, series, xAxisKey],
  );
  const progress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);

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
    activeIndex: number;
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
  const slot = innerW / n;
  const centers = data.map((_, i) => m.left + (i + 0.5) * slot);

  const sideOf = (s: ComposedChartSeries): "left" | "right" => (axes.hasRight && s.yAxis === "right" ? "right" : "left");
  const colorOf = (s: ComposedChartSeries, i: number) => s.color ?? colors[i % colors.length];

  const extentFor = (side: "left" | "right"): [number, number] => {
    let lo = Infinity;
    let hi = -Infinity;
    const ss = series.filter((s) => sideOf(s) === side);
    if (ss.length === 0) return [0, 1];
    const push = (v: number) => {
      if (v < lo) lo = v;
      if (v > hi) hi = v;
    };
    if (ss.some((s) => s.type === "bar" || s.type === "area")) push(0);
    for (const row of data) {
      let pos = 0;
      let neg = 0;
      for (const s of ss) {
        const v = num(row, s.dataKey);
        if (s.type === "bar" && stackedBars) {
          if (v >= 0) pos += v;
          else neg += v;
        } else push(v);
        if (s.type === "range" && s.upperDataKey) push(num(row, s.upperDataKey));
      }
      if (stackedBars) {
        push(pos);
        push(neg);
      }
    }
    if (lo === Infinity) return [0, 1];
    if (lo === hi) hi = lo + 1;
    return [lo, hi];
  };

  const leftAxis = buildValueAxis(extentFor("left"), [innerH, 0], axes.showYAxis, yTickCount);
  const rightAxis = axes.hasRight ? buildValueAxis(extentFor("right"), [innerH, 0], axes.showYAxis, yTickCount) : leftAxis;
  const axisOf = (s: ComposedChartSeries) => (sideOf(s) === "right" ? rightAxis : leftAxis);
  const yOf = (s: ComposedChartSeries, v: number) => m.top + axisOf(s).scale(v);
  const zeroY = (s: ComposedChartSeries) => {
    const [d0, d1] = axisOf(s).domain;
    return yOf(s, Math.min(Math.max(0, d0), d1));
  };

  // ---- bars ----
  const barSeries = series.map((s, i) => ({ s, i })).filter(({ s }) => s.type === "bar");
  const stackSides = Array.from(new Set(barSeries.map(({ s }) => sideOf(s))));
  const barsPerGroup = stackedBars ? stackSides.length : barSeries.length;
  const catGap =
    typeof barCategoryGap === "string" && barCategoryGap.endsWith("%")
      ? slot * (parseFloat(barCategoryGap) / 100)
      : typeof barCategoryGap === "number"
        ? barCategoryGap
        : 8;
  const barWidth = Math.min(barSize, Math.max(2, (slot - catGap - (barsPerGroup - 1) * barGap) / Math.max(1, barsPerGroup)));
  const totalBarWidth = barsPerGroup * barWidth + Math.max(0, barsPerGroup - 1) * barGap;
  const bars: { key: string; idx: number; x: number; y: number; w: number; h: number; fill: string }[] = [];
  data.forEach((row, idx) => {
    const cumPos: Record<string, number> = {};
    const cumNeg: Record<string, number> = {};
    barSeries.forEach(({ s, i }, bi) => {
      const v = num(row, s.dataKey);
      const side = sideOf(s);
      let v0 = 0;
      let pos = bi;
      if (stackedBars) {
        pos = stackSides.indexOf(side);
        if (v >= 0) {
          v0 = cumPos[side] ?? 0;
          cumPos[side] = v0 + v;
        } else {
          v0 = cumNeg[side] ?? 0;
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
        fill: colorOf(s, i),
      });
    });
  });

  const pts = (s: ComposedChartSeries, key: string) => data.map((row, i) => ({ x: centers[i], y: yOf(s, num(row, key)) }));

  const xLabels = useMemo(
    () => data.map((d, i) => (xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String(d[xAxisKey] ?? ""))),
    [data, xAxisKey, xTickFormatter],
  );

  const { valueFormatter, labelFormat } = axes;
  const fmt = useCallback(
    (v: number, key: string) => (valueFormatter ? valueFormatter(v, key) : undefined),
    [valueFormatter],
  );

  const handleMove = useCallback(
    (e: React.MouseEvent<SVGElement>, idx: number) => {
      if (!showTooltip || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const row = data[idx];
      const items: ChartTooltipItem[] = series.map((s, i) => {
        const v = num(row, s.dataKey);
        if (s.type === "range" && s.upperDataKey) {
          const hi = num(row, s.upperDataKey);
          return {
            name: s.name ?? `${s.dataKey}–${s.upperDataKey}`,
            value: v,
            color: colorOf(s, i),
            displayValue: `${fmt(v, s.dataKey) ?? v} – ${fmt(hi, s.upperDataKey) ?? hi}`,
          };
        }
        return { name: s.name ?? s.dataKey, value: v, color: colorOf(s, i), displayValue: fmt(v, s.dataKey) };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row, idx, xAxisKey, labelFormat),
        items,
        activeIndex: idx,
      });
    },
    // colorOf is derived from series/colors
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showTooltip, data, series, colors, xAxisKey, labelFormat, fmt],
  );

  const gridYs = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => innerH * t);
  const tickIdx = xTickIndices(xLabels, xTickInterval, slot, xTickAngle);

  const ordered = (type: ComposedSeriesType) => series.map((s, i) => ({ s, i })).filter(({ s }) => s.type === type);

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
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet" onMouseLeave={() => setTooltip(null)}>
        {showGrid && (
          <g stroke={gridStroke} strokeDasharray="3 3" strokeOpacity={0.6}>
            {gridYs.map((gy) => (
              <line key={gy} x1={m.left} y1={m.top + gy} x2={m.left + innerW} y2={m.top + gy} />
            ))}
          </g>
        )}
        {showTooltip && (
          <g fill="transparent">
            {data.map((_, idx) => (
              <rect key={idx} x={m.left + idx * slot} y={m.top} width={slot} height={innerH} onMouseMove={(e) => handleMove(e, idx)} />
            ))}
          </g>
        )}
        {ordered("range").map(({ s, i }) => {
          if (!s.upperDataKey) return null;
          const c = s.curve ?? curve;
          const upper = pts(s, s.upperDataKey);
          const lower = pts(s, s.dataKey);
          const upperD = linePath(upper, c);
          const lowerRev = linePath([...lower].reverse(), c).replace(/^M/, "L");
          return (
            <path
              key={`range-${s.dataKey}`}
              data-series-type="range"
              d={`${upperD} ${lowerRev} Z`}
              fill={colorOf(s, i)}
              fillOpacity={(s.fillOpacity ?? 0.2) * progress}
              stroke="none"
              pointerEvents="none"
            />
          );
        })}
        {ordered("area").map(({ s, i }) => {
          const c = s.curve ?? curve;
          const p = pts(s, s.dataKey);
          if (p.length === 0) return null;
          const base = zeroY(s);
          const d = `${linePath(p, c)} L ${p[p.length - 1].x} ${base} L ${p[0].x} ${base} Z`;
          return (
            <g key={`area-${s.dataKey}`} data-series-type="area" pointerEvents="none">
              <path d={d} fill={colorOf(s, i)} fillOpacity={(s.fillOpacity ?? 0.3) * progress} stroke="none" />
              <AnimatedLineStroke pathD={linePath(p, c)} progress={progress} color={colorOf(s, i)} strokeWidth={s.strokeWidth ?? strokeWidth} />
            </g>
          );
        })}
        {bars.map((b) => (
            <rect
              key={b.key}
              data-series-type="bar"
              x={b.x}
              y={b.y}
              width={b.w}
              height={Math.max(0, b.h)}
              fill={b.fill}
              rx={radius}
              ry={radius}
              onMouseMove={(e) => handleMove(e, b.idx)}
            />
        ))}
        {ordered("line").map(({ s, i }) => {
          const p = pts(s, s.dataKey);
          const d = linePath(p, s.curve ?? curve);
          const color = colorOf(s, i);
          const sw = s.strokeWidth ?? strokeWidth;
          return (
            <g key={`line-${s.dataKey}`} data-series-type="line" pointerEvents="none">
              {s.strokeDasharray ? (
                <path d={d} fill="none" stroke={color} strokeWidth={sw} strokeDasharray={s.strokeDasharray} opacity={progress} />
              ) : (
                <AnimatedLineStroke pathD={d} progress={progress} color={color} strokeWidth={sw} />
              )}
              {(s.showDots ?? showDots) &&
                p.map((pt, k) => (
                  <circle key={k} cx={pt.x} cy={pt.y} r={dotSize} fill={color} stroke={themeColors.tooltipBg} strokeWidth={1} opacity={Math.min(1, progress * 2.5)} />
                ))}
            </g>
          );
        })}
        {showTooltip && showCrosshair && tooltip !== null && data.length > 0 && (
          <g className="ds-chart-crosshair" pointerEvents="none">
            <line
              x1={centers[tooltip.activeIndex]}
              y1={m.top}
              x2={centers[tooltip.activeIndex]}
              y2={m.top + innerH}
              stroke={themeColors.gridColor}
              strokeWidth={1}
              strokeDasharray="4 6"
              opacity={0.85}
            />
            {series.map((s, i) =>
              s.type === "line" || s.type === "area" ? (
                <circle
                  key={`hit-${s.dataKey}`}
                  cx={centers[tooltip.activeIndex]}
                  cy={yOf(s, num(data[tooltip.activeIndex], s.dataKey))}
                  r={dotSize + 3}
                  fill={colorOf(s, i)}
                  stroke={themeColors.tooltipBg}
                  strokeWidth={2}
                />
              ) : null,
            )}
          </g>
        )}
        {axes.showYAxis && (
          <YAxisLabels ticks={leftAxis.ticks} scale={(v) => m.top + leftAxis.scale(v)} x={m.left} side="left" format={axes.leftTickFormat} color={themeColors.axisText} />
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
        <XAxisLabels positions={centers} labels={xLabels} indices={tickIdx} y={m.top + innerH + 16} angle={xTickAngle} color={themeColors.axisText} />
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
          items={series.map((s, i) => ({
            key: `${s.type}-${s.dataKey}`,
            label: s.name ?? s.dataKey,
            color: colorOf(s, i),
            shape: s.type === "line" ? "line" : s.type === "range" ? "band" : "square",
          }))}
        />
      )}
    </div>
  );
};

/**
 * Mixed bar + line + area chart with optional dual Y axes and range (confidence) bands —
 * the native-SVG counterpart of recharts `ComposedChart`.
 */
const ComposedChart = React.memo(ComposedChartComponent);
ComposedChart.displayName = "ComposedChart";
export default ComposedChart;
