"use client";

import React, { useCallback, useMemo, useState } from "react";
import type { ChartDataPoint, ChartDataSeries, ChartLayoutProps } from "./Chart.types";
import { CHART_THEME_COLORS } from "./Chart.types";
import { ChartTooltip } from "./ChartTooltip";
import { getValueExtent, scaleLinear, linePath, areaPath } from "./utils";

const DEFAULT_COLORS = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)",
];

export interface AreaChartProps extends ChartLayoutProps {
  data: ChartDataPoint[];
  xAxisKey?: string;
  series: ChartDataSeries[];
  colors?: string[];
  stacked?: boolean;
  curve?: "linear" | "monotone" | "step" | "stepBefore" | "stepAfter";
  strokeWidth?: number;
}

const AreaChartComponent: React.FC<AreaChartProps> = ({
  data,
  xAxisKey = "name",
  series,
  colors = DEFAULT_COLORS,
  stacked = false,
  curve = "monotone",
  strokeWidth = 2,
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
  showCrosshair = true,
  className = "",
  style = {},
}) => {
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor ?? themeColors.gridColor;
  const [tooltip, setTooltip] = useState<{
    pointerX: number;
    pointerY: number;
    cw: number;
    ch: number;
    label: string;
    items: { name: string; value: number; color: string }[];
    activeIndex: number;
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

  const [yMin, yMax] = useMemo(
    () => getValueExtent(data, series, stacked),
    [data, series, stacked]
  );

  const xScale = useMemo(
    () => scaleLinear([0, Math.max(1, data.length - 1)], [0, innerW]),
    [data.length, innerW]
  );
  const yScale = useMemo(
    () => scaleLinear([yMin, yMax], [innerH, 0]),
    [yMin, yMax, innerH]
  );

  const finalPaths = useMemo(() => {
    if (stacked) {
      const cum: number[] = new Array(data.length).fill(0);
      return series.map((s, si) => {
        const basePoints = data.map((_, i) => ({
          x: m.left + xScale(i),
          y: si === 0 ? m.top + innerH : m.top + yScale(cum[i]),
        }));
        const topPoints = data.map((row, i) => {
          const v = Number(row[s.dataKey]) ?? 0;
          cum[i] += v;
          return { x: m.left + xScale(i), y: m.top + yScale(cum[i]) };
        });
        const areaD =
          "M " +
          topPoints.map((p) => `${p.x} ${p.y}`).join(" L ") +
          " L " +
          [...basePoints].reverse().map((p) => `${p.x} ${p.y}`).join(" L ") +
          " Z";
        return {
          areaPath: areaD,
          linePath: linePath(topPoints, curve),
          points: topPoints,
          color: s.color ?? colors[si % colors.length],
          name: s.name ?? s.dataKey,
        };
      });
    }

    return series.map((s, si) => {
      const points = data
        .map((d, i) => {
          const v = d[s.dataKey];
          const num = typeof v === "number" ? v : 0;
          return { x: m.left + xScale(i), y: m.top + yScale(num) };
        })
        .filter((p) => !Number.isNaN(p.y));
      const baseY = m.top + innerH;
      return {
        areaPath: areaPath(points, baseY, curve),
        linePath: linePath(points, curve),
        points,
        color: s.color ?? colors[si % colors.length],
        name: s.name ?? s.dataKey,
      };
    });
  }, [data, series, colors, stacked, curve, xScale, yScale, m, innerH]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!showTooltip) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - m.left;
      const idx = Math.round((x / innerW) * (data.length - 1));
      const clamped = Math.max(0, Math.min(idx, data.length - 1));
      const row = data[clamped];
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
        activeIndex: clamped,
      });
    },
    [showTooltip, data, series, xAxisKey, colors, innerW, m.left]
  );

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

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
        {finalPaths.map(({ areaPath: ap, linePath: lp, color, name }) => (
          <g key={name}>
            <path
              d={ap}
              fill={color}
              fillOpacity={stacked ? 0.8 : 0.3}
              stroke="none"
            />
            <path
              d={lp}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
            {stacked
              ? finalPaths.map(({ points, color, name }) => {
                  const p = points[tooltip.activeIndex];
                  if (!p) return null;
                  return (
                    <circle
                      key={`hit-${name}`}
                      cx={p.x}
                      cy={p.y}
                      r={6}
                      fill={color}
                      stroke={themeColors.tooltipBg}
                      strokeWidth={2}
                      opacity={0.95}
                    />
                  );
                })
              : series.map((s, si) => {
                  const row = data[tooltip.activeIndex];
                  const num = Number(row[s.dataKey]) ?? 0;
                  const cx = m.left + xScale(tooltip.activeIndex);
                  const cy = m.top + yScale(num);
                  const color = s.color ?? colors[si % colors.length];
                  return (
                    <circle
                      key={`hit-${s.dataKey}`}
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill={color}
                      stroke={themeColors.tooltipBg}
                      strokeWidth={2}
                      opacity={0.95}
                    />
                  );
                })}
          </g>
        )}
        <g fill={themeColors.axisText} fontSize={11} textAnchor="middle">
          {data.map((row, i) => (
            <text key={i} x={m.left + xScale(i)} y={m.top + innerH + 16}>
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

export default React.memo(AreaChartComponent);
