"use client";

import React, { useCallback, useMemo, useState } from "react";
import type { CartesianAxisProps, ChartDataPoint, ChartDataSeries, ChartLayoutProps, ChartTooltipItem } from "./Chart.types";
import { CHART_THEME_COLORS } from "./Chart.types";
import { AnimatedLineStroke } from "./chartPrimitives";
import { ChartTooltip } from "./ChartTooltip";
import { resolveChartAnimation, useChartAnimationProgress } from "./useChartAnimation";
import { getValueExtent, linePath, areaPath } from "./utils";
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
  xTickIndices,
} from "./cartesian";

const DEFAULT_COLORS = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)",
];

export interface AreaChartProps extends ChartLayoutProps, CartesianAxisProps {
  data: ChartDataPoint[];
  xAxisKey?: string;
  series: ChartDataSeries[];
  colors?: string[];
  /** Stack all series on the left axis (`yAxis: "right"` is ignored while stacked). */
  stacked?: boolean;
  curve?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter";
  strokeWidth?: number;
}

const AreaChartComponent: React.FC<AreaChartProps> = (props) => {
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
    xTickFormatter,
  } = props;

  // While stacked, everything lives on the left axis.
  const axisSeries = stacked ? series.map((s) => ({ ...s, yAxis: "left" as const })) : series;
  const axes = resolveAxes(props, axisSeries);

  const animCfg = resolveChartAnimation(chartAnimation, "area");
  const animKey = useMemo(
    () => `${data.length}-${series.map((s) => s.dataKey).join(",")}-${xAxisKey}-${stacked}-${curve}`,
    [data.length, series, xAxisKey, stacked, curve],
  );
  const animProgress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);

  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor ?? themeColors.gridColor;
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

  const colorOf = (s: ChartDataSeries, i: number) => s.color ?? colors[i % colors.length];

  const xLabels = useMemo(
    () => data.map((d, i) => (xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String(d[xAxisKey] ?? ""))),
    [data, xAxisKey, xTickFormatter],
  );

  const leftSeries = axes.hasRight ? seriesOnSide(axisSeries, "left") : series;
  const rightSeries = axes.hasRight ? seriesOnSide(axisSeries, "right") : [];
  const leftAxis = buildValueAxis(getValueExtent(data, leftSeries, stacked), [innerH, 0], axes.showYAxis, yTickCount);
  const rightAxis = axes.hasRight
    ? buildValueAxis(getValueExtent(data, rightSeries), [innerH, 0], axes.showYAxis, yTickCount)
    : leftAxis;
  const yScaleFor = (s: ChartDataSeries) =>
    !stacked && s.yAxis === "right" && axes.hasRight ? rightAxis.scale : leftAxis.scale;

  const xScale = (i: number) => (i / Math.max(1, data.length - 1)) * innerW;
  const xPositions = data.map((_, i) => m.left + xScale(i));

  const finalPaths = (() => {
    if (stacked) {
      const cum: number[] = new Array(data.length).fill(0);
      return series.map((s, si) => {
        const basePoints = data.map((_, i) => ({
          x: m.left + xScale(i),
          y: si === 0 ? m.top + innerH : m.top + leftAxis.scale(cum[i]),
        }));
        const topPoints = data.map((row, i) => {
          cum[i] += num(row, s.dataKey);
          return { x: m.left + xScale(i), y: m.top + leftAxis.scale(cum[i]) };
        });
        const areaD =
          "M " +
          topPoints.map((p) => `${p.x} ${p.y}`).join(" L ") +
          " L " +
          [...basePoints].reverse().map((p) => `${p.x} ${p.y}`).join(" L ") +
          " Z";
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
        color: colorOf(s, si),
      };
    });
  })();

  const { valueFormatter, labelFormat } = axes;
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!showTooltip || data.length === 0) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const scaleX = rect.width > 0 ? w / rect.width : 1;
      const x = (e.clientX - rect.left) * scaleX - m.left;
      const idx = Math.round((x / innerW) * (data.length - 1));
      const clamped = Math.max(0, Math.min(idx, data.length - 1));
      const row = data[clamped];
      const items = series.map((s, i) => {
        const v = num(row, s.dataKey);
        return {
          name: s.name ?? s.dataKey,
          value: v,
          color: s.color ?? colors[i % colors.length],
          displayValue: tooltipValue(valueFormatter, v, s.dataKey),
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row, clamped, xAxisKey, labelFormat),
        items,
        activeIndex: clamped,
      });
    },
    [showTooltip, data, series, xAxisKey, colors, innerW, m.left, w, valueFormatter, labelFormat],
  );

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  const gridYs = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => innerH * t);
  const tickIdx = xTickIndices(xLabels, xTickInterval, innerW / Math.max(1, data.length - 1), xTickAngle);

  return (
    <div
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
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {showGrid && (
          <g stroke={gridStroke} strokeDasharray="3 3" strokeOpacity={0.6}>
            {gridYs.map((gy) => (
              <line key={gy} x1={m.left} y1={m.top + gy} x2={m.left + innerW} y2={m.top + gy} />
            ))}
          </g>
        )}
        {finalPaths.map(({ key, areaPath: ap, linePath: lp, color }) => (
          <g key={key}>
            <path d={ap} fill={color} fillOpacity={(stacked ? 0.8 : 0.3) * animProgress} stroke="none" />
            <AnimatedLineStroke pathD={lp} progress={animProgress} color={color} strokeWidth={strokeWidth} />
          </g>
        ))}
        {showTooltip && showCrosshair && tooltip !== null && data.length > 0 && (
          <g className="ds-chart-crosshair" pointerEvents="none">
            <line
              x1={m.left + xScale(tooltip.activeIndex)}
              y1={m.top}
              x2={m.left + xScale(tooltip.activeIndex)}
              y2={m.top + innerH}
              stroke={themeColors.gridColor}
              strokeWidth={1}
              strokeDasharray="4 6"
              opacity={0.85}
            />
            {finalPaths.map(({ key, points, color }) => {
              const p = points[tooltip.activeIndex];
              if (!p) return null;
              return (
                <circle
                  key={`hit-${key}`}
                  cx={p.x}
                  cy={p.y}
                  r={6}
                  fill={color}
                  stroke={themeColors.tooltipBg}
                  strokeWidth={2}
                  opacity={0.92 * animProgress}
                />
              );
            })}
          </g>
        )}
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
          positions={xPositions}
          labels={xLabels}
          indices={tickIdx}
          y={m.top + innerH + 16}
          angle={xTickAngle}
          color={themeColors.axisText}
        />
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
          items={series.map((s, i) => ({ key: s.dataKey, label: s.name ?? s.dataKey, color: colorOf(s, i), shape: "square" }))}
        />
      )}
    </div>
  );
};

export default React.memo(AreaChartComponent);
