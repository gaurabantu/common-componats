"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import type { ChartLayoutProps, ChartTooltipItem } from "./Chart.types";
import { CHART_THEME_COLORS } from "./Chart.types";
import { ChartTooltip } from "./ChartTooltip";
import { resolveChartAnimation, useChartAnimationProgress } from "./useChartAnimation";
import { arcPath, polarToCartesian } from "./utils";

const DEFAULT_COLORS = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)",
  "var(--color-accent-sky-10)",
  "var(--color-accent-mint-10)",
  "var(--color-accent-amber-10)",
];

export interface PieChartDataPoint {
  name: string;
  value: number;
  /** Per-slice colour; overrides `colors[i]`. */
  color?: string;
}

/** Slice info passed to `PieChartProps.labelFormatter`. */
export interface PieLabelInfo {
  name: string;
  value: number;
  /** Share of the total, 0–100. */
  percent: number;
  index: number;
}

/** Ready-made slice label: `"Name (42%)"`. */
export const pieLabelNamePercent = ({ name, percent }: PieLabelInfo): string =>
  `${name} (${Math.round(percent)}%)`;

export interface PieChartProps extends Omit<ChartLayoutProps, "showGrid"> {
  data: PieChartDataPoint[];
  innerRadius?: number | string;
  outerRadius?: number | string;
  colors?: string[];
  showLabels?: boolean;
  showLabelLine?: boolean;
  paddingAngle?: number;
  /**
   * Where the sweep starts, in degrees. **Library convention: 0° = 12 o'clock, increasing
   * clockwise** (recharts uses 0° = 3 o'clock counter-clockwise). Semi-donut gauge:
   * `startAngle={-90} endAngle={90}`. @default 0
   */
  startAngle?: number;
  /** Where the sweep ends (same convention). `endAngle < startAngle` sweeps counter-clockwise. @default 360 */
  endAngle?: number;
  /** Content centred over the chart (e.g. a total inside a donut). Not interactive. */
  centerLabel?: React.ReactNode;
  /**
   * Text for each slice label when `showLabels` is on. Default `"42%"`.
   * Use `pieLabelNamePercent` for `"Name (42%)"`.
   */
  labelFormatter?: (slice: PieLabelInfo) => string;
  /** `"inside"` (default) centres labels in the ring; `"outside"` draws them beyond the rim (with `showLabelLine`). */
  labelPosition?: "inside" | "outside";
  /** Formats slice values in the tooltip and legend (`(value, name) => string`). */
  valueFormatter?: (value: number, name?: string) => string;
}

const PieChartComponent: React.FC<PieChartProps> = ({
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
  style = {},
}) => {
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
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
  const chartW = Math.max(200, typeof width === "number" ? width : 400);
  const chartH = Math.max(200, typeof height === "number" ? height : 300);
  const m = {
    top: margin?.top ?? 10,
    right: margin?.right ?? 10,
    bottom: margin?.bottom ?? 10,
    left: margin?.left ?? 10,
  };
  const size = Math.min(chartW - m.left - m.right, chartH - m.top - m.bottom);
  const cx = chartW / 2;
  const cy = chartH / 2;

  const or =
    typeof outerRadius === "string" && outerRadius.endsWith("%")
      ? (size / 2) * (parseFloat(outerRadius) / 100)
      : typeof outerRadius === "number"
        ? outerRadius
        : size / 2;
  const ir =
    typeof innerRadius === "string" && innerRadius.endsWith("%")
      ? (size / 2) * (parseFloat(innerRadius) / 100)
      : typeof innerRadius === "number"
        ? innerRadius
        : 0;

  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const n = data.length;
  const sweep = Math.min(360, Math.abs(endAngle - startAngle)) || 360;
  const dir = endAngle < startAngle ? -1 : 1;
  const totalPaddingDeg = paddingAngle * Math.max(0, n - 1);
  const totalSliceDeg = Math.max(0, sweep - totalPaddingDeg);
  const colorAt = (i: number) => data[i]?.color ?? colors[i % colors.length];

  let currentDeg = startAngle; // 0° = 12 o'clock in polarToCartesian
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
      color: colorAt(i),
    };
  });
  const labelText = (i: number) => {
    const d = data[i];
    const percent = (d.value / total) * 100;
    return labelFormatter
      ? labelFormatter({ name: d.name, value: d.value, percent, index: i })
      : `${percent.toFixed(0)}%`;
  };
  const fmtValue = (v: number, name: string) => (valueFormatter ? valueFormatter(v, name) : String(v));

  const handleSlicePointer = useCallback(
    (e: React.MouseEvent, i: number) => {
      setHovered(i);
      if (!showTooltip || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const slice = data[i];
      const pct = (slice.value / total) * 100;
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
            color: data[i]?.color ?? colors[i % colors.length],
            displayValue: valueFormatter ? valueFormatter(slice.value, slice.name) : undefined,
          },
        ],
      });
    },
    [showTooltip, data, colors, total, valueFormatter]
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        minWidth: 280,
        minHeight: 280,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: legendPosition === "left" || legendPosition === "right" ? "stretch" : "center",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flex: 1, minHeight: 260, position: "relative" }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${chartW} ${chartH}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: "visible" }}
          onMouseLeave={handleMouseLeave}
        >
          <g transform={`translate(${cx} ${cy}) scale(${scaleFactor}) translate(${-cx} ${-cy})`}>
            {slices.map((slice, i) => (
              <path
                key={i}
                d={arcPath(cx, cy, or, slice.startDeg, slice.endDeg, ir)}
                fill={slice.color}
                stroke={themeColors.tooltipBg}
                strokeWidth={2}
                opacity={hovered !== null && hovered !== i ? 0.5 : 1}
                onMouseEnter={(e) => handleSlicePointer(e, i)}
                onMouseMove={(e) => handleSlicePointer(e, i)}
                style={{ cursor: "pointer" }}
              >
                {!showTooltip && (
                  <title>
                    {slice.name}: {fmtValue(slice.value, slice.name)} ({((slice.value / total) * 100).toFixed(1)}%)
                  </title>
                )}
              </path>
            ))}
            {showLabels &&
              labelPosition === "inside" &&
              slices.map((slice, i) => {
                const midDeg = (slice.startDeg + slice.endDeg) / 2;
                const labelR = ir + (or - ir) * 0.5;
                const { x: lx, y: ly } = polarToCartesian(cx, cy, labelR, midDeg);
                return (
                  <text
                    key={i}
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={11}
                    fill={themeColors.tooltipText}
                    opacity={animProgress}
                    style={{ pointerEvents: "none" }}
                  >
                    {labelText(i)}
                  </text>
                );
              })}
            {showLabels &&
              labelPosition === "outside" &&
              slices.map((slice, i) => {
                const midDeg = (slice.startDeg + slice.endDeg) / 2;
                const p0 = polarToCartesian(cx, cy, or, midDeg);
                const p1 = polarToCartesian(cx, cy, or + 10, midDeg);
                const pt = polarToCartesian(cx, cy, or + 14, midDeg);
                const norm = ((midDeg % 360) + 360) % 360;
                const anchor = norm > 5 && norm < 175 ? "start" : norm > 185 && norm < 355 ? "end" : "middle";
                return (
                  <g key={i} opacity={animProgress} style={{ pointerEvents: "none" }}>
                    {showLabelLine && (
                      <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke={slice.color} strokeWidth={1} />
                    )}
                    <text
                      x={pt.x}
                      y={pt.y}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      fontSize={11}
                      fill={themeColors.axisText}
                    >
                      {labelText(i)}
                    </text>
                  </g>
                );
              })}
          </g>
        </svg>
        {centerLabel != null && centerLabel !== false && (
          <div
            className="ds-chart-pie-center"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              pointerEvents: "none",
              color: themeColors.tooltipText,
            }}
          >
            {centerLabel}
          </div>
        )}
      </div>
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent:
              legendPosition === "left"
                ? "flex-start"
                : legendPosition === "right"
                  ? "flex-end"
                  : "center",
            marginTop: 8,
            fontSize: 12,
          }}
        >
          {data.map((d, i) => (
            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: colorAt(i),
                }}
              />
              <span style={{ color: themeColors.legendText }}>
                {d.name}: {fmtValue(d.value, d.name)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(PieChartComponent);
