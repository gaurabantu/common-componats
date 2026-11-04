import type React from "react";

/** Single data point for Cartesian charts (Line, Bar, Area) */
export interface ChartDataPoint {
  [key: string]: string | number | undefined;
}

/** Data series config: which keys to plot and their display options */
export interface ChartDataSeries {
  dataKey: string;
  name?: string;
  color?: string;
  strokeWidth?: number;
  /**
   * Which Y axis this series is plotted against (Line / Area / Bar / Composed).
   * Any `"right"` series turns on a second, independently scaled Y axis on the right.
   * @default "left"
   */
  yAxis?: ChartYAxisSide;
  /** SVG dash pattern for line strokes, e.g. `"5 5"` (Line / Composed line series). */
  strokeDasharray?: string;
}

/** Y axis a series is bound to. */
export type ChartYAxisSide = "left" | "right";

/** Formats a numeric value (Y tick or tooltip value). `dataKey` is set for tooltip values. */
export type ChartValueFormatter = (value: number, dataKey?: string) => string;

/** Formats an X-axis tick from the raw `xAxisKey` value of the datum. */
export type ChartXTickFormatter = (value: string | number | undefined, index: number) => string;

/** Formats the tooltip heading from the raw `xAxisKey` value of the hovered datum. */
export type ChartLabelFormatter = (
  value: string | number | undefined,
  datum: ChartDataPoint,
  index: number,
) => string;

/**
 * Axis / formatting props shared by the cartesian charts (Line, Bar, Area, Composed).
 * All optional; omitting them keeps the pre-0.0.4 rendering.
 */
export interface CartesianAxisProps {
  /**
   * Formats Y-axis tick labels **and** tooltip values (`(value, dataKey) => string`).
   * Passing it turns the Y axis on (see `showYAxis`).
   */
  valueFormatter?: ChartValueFormatter;
  /** Y tick labels only (left axis); overrides `valueFormatter` for ticks. */
  yTickFormatter?: (value: number) => string;
  /** Right Y axis tick labels (dual-axis charts). Falls back to `yTickFormatter` → `valueFormatter`. */
  rightYTickFormatter?: (value: number) => string;
  /** Formats X tick labels from the raw `xAxisKey` value. */
  xTickFormatter?: ChartXTickFormatter;
  /** Formats the tooltip heading. Defaults to the raw `xAxisKey` value. */
  labelFormatter?: ChartLabelFormatter;
  /** Alias of `labelFormatter` (recharts naming). `labelFormatter` wins when both are set. */
  tooltipLabelFormatter?: ChartLabelFormatter;
  /**
   * Rotation of X tick labels in degrees (e.g. `-45`). Rotated labels are end-anchored at the
   * tick; increase `margin.bottom` (≈ 60) so they are not clipped. @default 0
   */
  xTickAngle?: number;
  /**
   * Show every (n+1)-th X tick label — recharts `interval` semantics: `0` = all, `1` = every other.
   * `"auto"` skips labels so they don't overlap at the chart width. @default 0
   */
  xTickInterval?: number | "auto";
  /**
   * Render Y-axis tick labels. Defaults to `true` when `valueFormatter` / `yTickFormatter` is set
   * or a series uses `yAxis: "right"`, otherwise `false` (pre-0.0.4 look).
   */
  showYAxis?: boolean;
  /** Approximate number of Y ticks (nice-rounded). @default 5 */
  yTickCount?: number;
}

/** Chart theme for light/dark backgrounds */
export type ChartTheme = "light" | "dark";

/** Single row in a cartesian chart tooltip */
export interface ChartTooltipItem {
  name: string;
  value: number;
  color: string;
  /** Pre-formatted value text; rendered instead of `value` when set. */
  displayValue?: string;
}

/** Easing presets for chart entrance (CSS-like names; implemented in `useChartAnimation.ts`). */
export type ChartEasingPreset = "linear" | "ease-in" | "ease-out" | "ease-in-out" | "default";

/**
 * Optional entrance animation (line stroke draw, area fill fade, bar grow, pie scale).
 * Respects `prefers-reduced-motion` in the browser.
 */
export interface ChartAnimationConfig {
  /** @default true */
  enabled?: boolean;
  /** Duration in milliseconds @default ~750 line/area/pie, ~600 bar */
  durationMs?: number;
  easing?: ChartEasingPreset;
  /** Bar chart: grow bars in sequence (left to right) */
  barStagger?: boolean;
}

/** `true` = default animation; `false` = off; object = fine-tune */
export type ChartAnimationOption = boolean | ChartAnimationConfig;

/** Shared chart layout props */
export interface ChartLayoutProps {
  width?: number | string;
  height?: number | string;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  showGrid?: boolean;
  gridColor?: string;
  showTooltip?: boolean;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  /** Theme for tooltip, legend, axis labels. Use "dark" on dark surfaces. */
  theme?: ChartTheme;
  /**
   * Tooltip follows the pointer with edge clamping (no centered jump).
   * @default true
   */
  tooltipFollowPointer?: boolean;
  /**
   * Fade/slide-in and smooth position transitions.
   * @default true
   */
  tooltipAnimation?: boolean;
  /**
   * Vertical crosshair + highlighted points at the active x (Line / Area only).
   * @default true
   */
  showCrosshair?: boolean;
  /**
   * Entrance animation: stroke draw (line / area outline), fill fade (area), bar grow, pie donut scale-out.
   * `true` = defaults; `false` = static; passes design tokens timings via `{ durationMs, easing }`.
   * Honors `prefers-reduced-motion`.
   */
  chartAnimation?: ChartAnimationOption;
  className?: string;
  style?: React.CSSProperties;
}

/** Theme-based colors for tooltip, legend, axis, grid */
export const CHART_THEME_COLORS = {
  light: {
    tooltipBg: "var(--color-bg-surface)",
    tooltipBorder: "var(--color-border-default)",
    tooltipText: "var(--color-text-primary)",
    legendText: "var(--color-text-secondary)",
    axisText: "var(--color-text-secondary)",
    gridColor: "var(--color-border-default)",
  },
  dark: {
    tooltipBg: "var(--color-bg-surface)",
    tooltipBorder: "var(--color-border-default)",
    tooltipText: "var(--color-text-primary)",
    legendText: "var(--color-text-secondary)",
    axisText: "var(--color-text-secondary)",
    gridColor: "var(--color-border-subtle)",
  },
};

/** Default color palette (design system tokens) */
export const CHART_COLORS = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)",
  "var(--color-accent-sky-10)",
  "var(--color-accent-mint-10)",
  "var(--color-accent-amber-10)",
];
