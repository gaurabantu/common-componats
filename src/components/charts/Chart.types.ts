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
}

/** Chart theme for light/dark backgrounds */
export type ChartTheme = "light" | "dark";

/** Single row in a cartesian chart tooltip */
export interface ChartTooltipItem {
  name: string;
  value: number;
  color: string;
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
