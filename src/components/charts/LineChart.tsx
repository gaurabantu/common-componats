"use client";

import React, { useCallback, useMemo, useState } from "react";
import type { CartesianAxisProps, ChartDataPoint, ChartDataSeries, ChartLayoutProps, ChartTooltipItem } from "./Chart.types";
import { CHART_THEME_COLORS } from "./Chart.types";
import { AnimatedLineStroke } from "./chartPrimitives";
import { ChartTooltip } from "./ChartTooltip";
import { resolveChartAnimation, useChartAnimationProgress } from "./useChartAnimation";
import { getValueExtent, linePath } from "./utils";
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

export interface LineChartProps extends ChartLayoutProps, CartesianAxisProps {
  data: ChartDataPoint[];
  xAxisKey?: string;
  series: ChartDataSeries[];
  colors?: string[];
  curve?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter";
  dotSize?: number;
  showDots?: boolean;
  strokeWidth?: number;
}

const LineChartComponent: React.FC<LineChartProps> = (props) => {
  const {
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
    () => `${data.length}-${series.map((s) => s.dataKey).join(",")}-${xAxisKey}-${curve}`,
    [data.length, series, xAxisKey, curve],
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

  const leftSeries = axes.hasRight ? seriesOnSide(series, "left") : series;
  const rightSeries = axes.hasRight ? seriesOnSide(series, "right") : [];
  const leftAxis = buildValueAxis(getValueExtent(data, leftSeries), [innerH, 0], axes.showYAxis, yTickCount);
  const rightAxis = axes.hasRight
    ? buildValueAxis(getValueExtent(data, rightSeries), [innerH, 0], axes.showYAxis, yTickCount)
    : leftAxis;
  const yScaleFor = (s: ChartDataSeries) => (s.yAxis === "right" && axes.hasRight ? rightAxis.scale : leftAxis.scale);

  const xScale = (i: number) => (i / Math.max(1, data.length - 1)) * innerW;
  const xPositions = data.map((_, i) => m.left + xScale(i));

  const paths = series.map((s, si) => {
    const ys = yScaleFor(s);
    const points = data.map((d, i) => ({ x: m.left + xScale(i), y: m.top + ys(num(d, s.dataKey)) }));
    return {
      key: s.dataKey,
      path: linePath(points, curve),
      points,
      color: colorOf(s, si),
      width: s.strokeWidth ?? strokeWidth,
      dash: s.strokeDasharray,
    };
  });

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
            {xLabels.slice(0, 6).map((_, i) => {
              const idx = Math.floor((i / 5) * (data.length - 1));
              return <line key={i} x1={m.left + xScale(idx)} y1={m.top} x2={m.left + xScale(idx)} y2={m.top + innerH} />;
            })}
          </g>
        )}
        {paths.map(({ key, path: pathD, points, color, width: sw, dash }) => (
          <g key={key}>
            {dash ? (
              <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={sw}
                strokeDasharray={dash}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={animProgress}
              />
            ) : (
              <AnimatedLineStroke pathD={pathD} progress={animProgress} color={color} strokeWidth={sw} />
            )}
            {showDots &&
              points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={dotSize}
                  fill={color}
                  stroke={themeColors.tooltipBg}
                  strokeWidth={1}
                  opacity={Math.min(1, animProgress * 2.5)}
                />
              ))}
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
            {series.map((s, si) => {
              const row = data[tooltip.activeIndex];
              const cx = m.left + xScale(tooltip.activeIndex);
              const cy = m.top + yScaleFor(s)(num(row, s.dataKey));
              return (
                <circle
                  key={`hit-${s.dataKey}`}
                  cx={cx}
                  cy={cy}
                  r={dotSize + 3}
                  fill={colorOf(s, si)}
                  stroke={themeColors.tooltipBg}
                  strokeWidth={2}
                  opacity={0.95}
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
          items={series.map((s, i) => ({ key: s.dataKey, label: s.name ?? s.dataKey, color: colorOf(s, i), shape: "line" }))}
        />
      )}
    </div>
  );
};

export default React.memo(LineChartComponent);
