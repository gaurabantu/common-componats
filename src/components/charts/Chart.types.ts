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
  className?: string;
  style?: React.CSSProperties;
}

/** Theme-based colors for tooltip, legend, axis, grid */
export const CHART_THEME_COLORS = {
  light: {
    tooltipBg: "var(--color-bg-surface, #fff)",
    tooltipBorder: "var(--color-border-default, #e5e7eb)",
    tooltipText: "var(--color-text-primary, #0d0d0d)",
    legendText: "var(--color-text-secondary, #757575)",
    axisText: "var(--color-text-secondary, #757575)",
    gridColor: "var(--color-border-default, #e5e7eb)",
  },
  dark: {
    tooltipBg: "var(--chart-tooltip-bg, #141b2d)",
    tooltipBorder: "var(--chart-tooltip-border, #2a3548)",
    tooltipText: "var(--chart-tooltip-text, #e8edf5)",
    legendText: "var(--chart-legend-text, #8b9bb4)",
    axisText: "var(--chart-axis-text, #8b9bb4)",
    gridColor: "var(--chart-grid-color, #2a3548)",
  },
};

/** Default color palette (design system tokens) */
export const CHART_COLORS = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)",
  "var(--color-accent-sky-10, #E6F2FF)",
  "var(--color-accent-mint-10, #E9FFF4)",
  "var(--color-accent-amber-10, #FFF6DD)",
];
