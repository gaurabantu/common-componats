"use client";

/**
 * Shared axis / tick / legend helpers for the native-SVG cartesian charts
 * (LineChart, BarChart, AreaChart, ComposedChart).
 */
import React from "react";
import type {
  CartesianAxisProps,
  ChartDataPoint,
  ChartDataSeries,
  ChartLabelFormatter,
  ChartValueFormatter,
} from "./Chart.types";

const AXIS_FONT_SIZE = 11;
/** Rough glyph width for 11px UI text — used only for auto tick skipping. */
const APPROX_CHAR_W = 6.5;

const defaultNumberFormat =
  typeof Intl !== "undefined" ? new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }) : null;

export function defaultFormatNumber(v: number): string {
  if (!Number.isFinite(v)) return "";
  return defaultNumberFormat ? defaultNumberFormat.format(v) : String(Math.round(v * 100) / 100);
}

/** Numeric value of a datum field (non-numbers → 0). */
export function num(row: ChartDataPoint | undefined, key: string): number {
  const v = row?.[key];
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function niceNum(range: number, round: boolean): number {
  const exp = Math.floor(Math.log10(range));
  const f = range / 10 ** exp;
  let nf: number;
  if (round) nf = f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10;
  else nf = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return nf * 10 ** exp;
}

/** Nice-rounded domain + tick values covering `[min, max]`. */
export function niceTicks(min: number, max: number, count = 5): { domain: [number, number]; ticks: number[] } {
  let lo = Math.min(min, max);
  let hi = Math.max(min, max);
  if (lo === hi) {
    hi = lo === 0 ? 1 : lo + Math.abs(lo) * 0.5;
    if (lo > 0) lo = 0;
  }
  const n = Math.max(2, Math.round(count));
  const step = niceNum(niceNum(hi - lo, false) / (n - 1), true);
  const nLo = Math.floor(lo / step) * step;
  const nHi = Math.ceil(hi / step) * step;
  const ticks: number[] = [];
  // Guard float drift: round each tick to the step's precision.
  const decimals = Math.max(0, -Math.floor(Math.log10(step)) + 1);
  for (let t = nLo; t <= nHi + step / 2; t += step) {
    ticks.push(Number(t.toFixed(decimals)));
  }
  return { domain: [nLo, nHi], ticks };
}

/** Resolved axis / formatter config for a cartesian chart. */
export interface ResolvedAxes {
  showYAxis: boolean;
  hasRight: boolean;
  leftTickFormat: (v: number) => string;
  rightTickFormat: (v: number) => string;
  labelFormat: ChartLabelFormatter | undefined;
  valueFormatter: ChartValueFormatter | undefined;
}

export function resolveAxes(props: CartesianAxisProps, series: ChartDataSeries[]): ResolvedAxes {
  const hasRight = series.some((s) => s.yAxis === "right");
  const vf = props.valueFormatter;
  const leftTickFormat = props.yTickFormatter ?? (vf ? (v: number) => vf(v) : defaultFormatNumber);
  const rightTickFormat = props.rightYTickFormatter ?? leftTickFormat;
  const showYAxis = props.showYAxis ?? (Boolean(vf) || Boolean(props.yTickFormatter) || hasRight);
  return {
    showYAxis,
    hasRight,
    leftTickFormat,
    rightTickFormat,
    labelFormat: props.labelFormatter ?? props.tooltipLabelFormatter,
    valueFormatter: vf,
  };
}

/** Tooltip heading text for a datum. */
export function tooltipLabel(
  row: ChartDataPoint,
  index: number,
  xAxisKey: string,
  labelFormat: ChartLabelFormatter | undefined,
): string {
  const raw = row[xAxisKey];
  return labelFormat ? labelFormat(raw, row, index) : String(raw ?? "");
}

/** Pre-formatted tooltip value text (undefined → tooltip prints the raw number). */
export function tooltipValue(
  vf: ChartValueFormatter | undefined,
  value: number,
  dataKey: string,
): string | undefined {
  return vf ? vf(value, dataKey) : undefined;
}

/**
 * Indices of X ticks to label. `interval` follows recharts: 0 = every tick, 1 = every other, …
 * `"auto"` picks the smallest interval whose labels don't overlap.
 */
export function xTickIndices(
  labels: string[],
  interval: number | "auto" | undefined,
  slotWidth: number,
  angle = 0,
): number[] {
  const n = labels.length;
  if (n === 0) return [];
  let step = 1;
  if (interval === "auto") {
    const maxChars = labels.reduce((m, l) => Math.max(m, l.length), 0);
    const textW = maxChars * APPROX_CHAR_W;
    const rad = (Math.abs(angle) * Math.PI) / 180;
    // Rotated labels occupy ≈ line-height / sin(angle) horizontally (capped at full text width).
    const footprint = rad > 0.05 ? Math.min(textW, (AXIS_FONT_SIZE + 3) / Math.sin(rad)) : textW;
    step = Math.max(1, Math.ceil((footprint + 4) / Math.max(1, slotWidth)));
  } else if (typeof interval === "number" && interval > 0) {
    step = Math.floor(interval) + 1;
  }
  const out: number[] = [];
  for (let i = 0; i < n; i += step) out.push(i);
  return out;
}

/** X tick labels along the bottom of the plot. */
export function XAxisLabels({
  positions,
  labels,
  indices,
  y,
  angle = 0,
  color,
}: {
  positions: number[];
  labels: string[];
  indices: number[];
  y: number;
  angle?: number;
  color: string;
}) {
  const rotated = Math.abs(angle) > 0.01;
  return (
    <g
      className="ds-chart-x-axis"
      fill={color}
      fontSize={AXIS_FONT_SIZE}
      textAnchor={rotated ? (angle < 0 ? "end" : "start") : "middle"}
    >
      {indices.map((i) => {
        const x = positions[i];
        if (x === undefined) return null;
        if (!rotated) {
          return (
            <text key={i} x={x} y={y}>
              {labels[i]}
            </text>
          );
        }
        const ry = y - 6;
        return (
          <text key={i} x={x} y={ry} dy="0.71em" transform={`rotate(${angle} ${x} ${ry})`}>
            {labels[i]}
          </text>
        );
      })}
    </g>
  );
}

/** Y tick labels on the left or right edge of the plot. */
export function YAxisLabels({
  ticks,
  scale,
  x,
  side,
  format,
  color,
}: {
  ticks: number[];
  scale: (v: number) => number;
  x: number;
  side: "left" | "right";
  format: (v: number) => string;
  color: string;
}) {
  return (
    <g
      className={`ds-chart-y-axis ds-chart-y-axis--${side}`}
      fill={color}
      fontSize={AXIS_FONT_SIZE}
      textAnchor={side === "left" ? "end" : "start"}
    >
      {ticks.map((t) => (
        <text key={t} x={side === "left" ? x - 6 : x + 6} y={scale(t)} dominantBaseline="middle">
          {format(t)}
        </text>
      ))}
    </g>
  );
}

/** Legend row shared by the cartesian charts. */
export function ChartLegend({
  items,
  position,
  textColor,
}: {
  items: { key: string; label: string; color: string; shape: "square" | "line" | "band" }[];
  position: "top" | "bottom" | "left" | "right";
  textColor: string;
}) {
  return (
    <div
      className="ds-chart-legend"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        justifyContent: position === "left" ? "flex-start" : position === "right" ? "flex-end" : "center",
        marginTop: position === "top" ? 0 : 8,
        marginBottom: position === "bottom" ? 0 : 8,
        fontSize: 12,
      }}
    >
      {items.map((it) => (
        <div key={it.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            aria-hidden
            style={{
              width: 12,
              height: it.shape === "line" ? 3 : 12,
              borderRadius: 2,
              background: it.color,
              opacity: it.shape === "band" ? 0.35 : 1,
            }}
          />
          <span style={{ color: textColor }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

/** A value axis: relative scale (0 = top of plot) plus labelled ticks (empty when hidden). */
export interface ValueAxis {
  domain: [number, number];
  ticks: number[];
  /** value → y offset inside the plot (0 … innerH), or x offset for horizontal bars. */
  scale: (v: number) => number;
}

/**
 * Build a value axis for `[min, max]`. When the axis is visible the domain is nice-rounded so
 * ticks land on round numbers; when hidden the raw extent is kept (pre-0.0.4 behaviour).
 */
export function buildValueAxis(
  extent: [number, number],
  range: [number, number],
  visible: boolean,
  tickCount = 5,
): ValueAxis {
  let domain: [number, number] = extent;
  let ticks: number[] = [];
  if (visible) {
    const nice = niceTicks(extent[0], extent[1], tickCount);
    domain = nice.domain;
    ticks = nice.ticks;
  }
  const [d0, d1] = domain;
  const span = d1 - d0 || 1;
  const k = (range[1] - range[0]) / span;
  return { domain, ticks, scale: (v: number) => range[0] + (v - d0) * k };
}

/** Series bound to one side. */
export function seriesOnSide(series: ChartDataSeries[], side: "left" | "right"): ChartDataSeries[] {
  return series.filter((s) => (s.yAxis ?? "left") === side);
}
