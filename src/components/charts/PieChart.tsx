"use client";

import React, { useCallback, useRef, useState } from "react";
import type { ChartLayoutProps } from "./Chart.types";
import { CHART_THEME_COLORS } from "./Chart.types";
import { ChartTooltip } from "./ChartTooltip";
import { arcPath, polarToCartesian } from "./utils";

const DEFAULT_COLORS = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)",
  "var(--color-accent-sky-10, #E6F2FF)",
  "var(--color-accent-mint-10, #E9FFF4)",
  "var(--color-accent-amber-10, #FFF6DD)",
];

export interface PieChartDataPoint {
  name: string;
  value: number;
}

export interface PieChartProps extends Omit<ChartLayoutProps, "showGrid"> {
  data: PieChartDataPoint[];
  innerRadius?: number | string;
  outerRadius?: number | string;
  colors?: string[];
  showLabels?: boolean;
  showLabelLine?: boolean;
  paddingAngle?: number;
}

const PieChartComponent: React.FC<PieChartProps> = ({
  data,
  innerRadius = 0,
  outerRadius = "80%",
  colors = DEFAULT_COLORS,
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
  style = {},
}) => {
  const themeColors = CHART_THEME_COLORS[theme];
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{
    pointerX: number;
    pointerY: number;
    cw: number;
    ch: number;
    label: string;
    items: { name: string; value: number; color: string }[];
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
  const totalPaddingDeg = paddingAngle * Math.max(0, n - 1);
  const totalSliceDeg = 360 - totalPaddingDeg;
  const startAngleOffset = 0; // 0° = 12 o'clock in polarToCartesian

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
      color: colors[i % colors.length],
    };
  });

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
            color: colors[i % colors.length],
          },
        ],
      });
    },
    [showTooltip, data, colors, total]
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
      <div style={{ display: "flex", alignItems: "center", flex: 1, minHeight: 260 }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${chartW} ${chartH}`}
          preserveAspectRatio="xMidYMid meet"
          onMouseLeave={handleMouseLeave}
        >
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
                  {slice.name}: {slice.value} ({((slice.value / total) * 100).toFixed(1)}%)
                </title>
              )}
            </path>
          ))}
          {showLabels &&
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
                  style={{ pointerEvents: "none" }}
                >
                  {((slice.value / total) * 100).toFixed(0)}%
                </text>
              );
            })}
        </svg>
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
                  background: colors[i % colors.length],
                }}
              />
              <span style={{ color: themeColors.legendText }}>
                {d.name}: {d.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(PieChartComponent);
