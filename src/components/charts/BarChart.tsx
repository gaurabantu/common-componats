"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import type { ChartDataPoint, ChartDataSeries, ChartLayoutProps } from "./Chart.types";
import { CHART_THEME_COLORS } from "./Chart.types";
import { ChartTooltip } from "./ChartTooltip";
import { getValueExtent, scaleLinear } from "./utils";

const DEFAULT_COLORS = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)",
];

export interface BarChartProps extends ChartLayoutProps {
  data: ChartDataPoint[];
  xAxisKey?: string;
  series: ChartDataSeries[];
  colors?: string[];
  layout?: "vertical" | "horizontal";
  barSize?: number;
  barGap?: number;
  barCategoryGap?: number | string;
  radius?: number | [number, number, number, number];
}

const BarChartComponent: React.FC<BarChartProps> = ({
  data,
  xAxisKey = "name",
  series,
  colors = DEFAULT_COLORS,
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
  style = {},
}) => {
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor ?? themeColors.gridColor;
  const containerRef = useRef<HTMLDivElement>(null);
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
  const m = {
    top: margin?.top ?? 10,
    right: margin?.right ?? 20,
    bottom: margin?.bottom ?? 30,
    left: margin?.left ?? 40,
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;

  const catGap =
    typeof barCategoryGap === "string" && barCategoryGap.endsWith("%")
      ? (innerW / Math.max(1, data.length)) * (parseFloat(barCategoryGap) / 100)
      : typeof barCategoryGap === "number"
        ? barCategoryGap
        : 8;

  const groupWidth = innerW / Math.max(1, data.length) - catGap;
  const barCount = series.length;
  const totalBarWidth = barCount * barSize + (barCount - 1) * barGap;
  const barWidth = Math.min(
    barSize,
    Math.max(2, (groupWidth - (barCount - 1) * barGap) / barCount)
  );
  const groupOffset = Math.max(0, (groupWidth - totalBarWidth) / 2);

  const [yMin, yMax] = useMemo(() => getValueExtent(data, series), [data, series]);
  const yScale = useMemo(
    () => scaleLinear([yMin, yMax], [innerH, 0]),
    [yMin, yMax, innerH]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGElement>, idx: number) => {
      if (!showTooltip || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const row = data[idx];
      const label = String(row[xAxisKey] ?? "");
      const items = series.map((s, i) => ({
        name: s.name ?? s.dataKey,
        value: Number(row[s.dataKey]) ?? 0,
        color: s.color ?? colors[i % colors.length],
      }));
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label,
        items,
      });
    },
    [showTooltip, data, series, xAxisKey, colors]
  );

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  const r = Array.isArray(radius) ? radius[0] : radius;

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
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={t}
                x1={m.left}
                y1={m.top + innerH * t}
                x2={m.left + innerW}
                y2={m.top + innerH * t}
              />
            ))}
          </g>
        )}
        {layout === "vertical" &&
          data.map((row, idx) => {
            const groupX =
              m.left +
              (idx / Math.max(1, data.length)) * innerW +
              catGap / 2 +
              groupOffset;
            return series.map((s, si) => {
              const v = Number(row[s.dataKey]) ?? 0;
              const barH = innerH - yScale(v);
              const x = groupX + si * (barWidth + barGap);
              const y = m.top + yScale(v);
              return (
                <g key={`${idx}-${s.dataKey}`}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={Math.max(0, barH)}
                    fill={s.color ?? colors[si % colors.length]}
                    rx={r}
                    ry={r}
                    onMouseMove={(e) => handleMouseMove(e, idx)}
                  />
                </g>
              );
            });
          })}
        {layout === "horizontal" &&
          data.map((row, idx) => {
            const groupY = m.top + ((idx + 0.5) / data.length) * innerH;
            const maxVal = Math.max(...series.map((s) => Number(row[s.dataKey]) ?? 0));
            const barLen = (Number(maxVal) / (yMax - yMin || 1)) * innerW;
            return series.map((s, si) => {
              const v = Number(row[s.dataKey]) ?? 0;
              const len = (v / (yMax - yMin || 1)) * innerW;
              const x = m.left;
              const y = groupY - (barCount * barWidth) / 2 + si * (barWidth + barGap);
              return (
                <rect
                  key={`${idx}-${s.dataKey}`}
                  x={x}
                  y={y}
                  width={len}
                  height={barWidth}
                  fill={s.color ?? colors[si % colors.length]}
                  rx={r}
                  ry={r}
                  onMouseMove={(e) => handleMouseMove(e, idx)}
                />
              );
            });
          })}
        <g fill={themeColors.axisText} fontSize={11} textAnchor="middle">
          {data.map((row, i) => (
            <text
              key={i}
              x={m.left + ((i + 0.5) / Math.max(1, data.length)) * innerW}
              y={m.top + innerH + 16}
            >
              {String(row[xAxisKey] ?? "")}
            </text>
          ))}
        </g>
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
            marginTop: legendPosition === "top" ? 0 : 8,
            marginBottom: legendPosition === "bottom" ? 0 : 8,
            fontSize: 12,
          }}
        >
          {series.map((s, i) => (
            <div key={s.dataKey} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: s.color ?? colors[i % colors.length],
                }}
              />
              <span style={{ color: themeColors.legendText }}>
                {s.name ?? s.dataKey}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(BarChartComponent);
