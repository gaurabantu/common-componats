import type { HTMLAttributes, ReactNode } from "react";

/**
 * - `text` — one or more line bars (use `lines`; the last line is 60% wide)
 * - `rect` — block placeholder (media, cards, charts)
 * - `circle` — avatar / icon placeholder
 */
export type SkeletonShape = "text" | "rect" | "circle";

/** A number is treated as px; a string is used as-is (`"50%"`, `"12rem"`, `"var(--space-8)"`). */
export type SkeletonDimension = number | string;

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** @default "text" */
  shape?: SkeletonShape;
  /** Number of line bars (only for `shape="text"`). The last one renders at 60% width. @default 1 */
  lines?: number;
  /** Width of the block (or of every full line). Defaults: text/rect `100%`, circle `40px`. */
  width?: SkeletonDimension;
  /** Height of the block (or of each line). Defaults: text `0.875em`, rect `var(--space-8)`, circle = width. */
  height?: SkeletonDimension;
  /** Corner radius override. Defaults: text `--radius-sm`, rect `--radius-md`, circle 50%. */
  radius?: SkeletonDimension;
  /** Shimmer animation (always off under `prefers-reduced-motion`). @default true */
  animated?: boolean;
}

/**
 * `role="status"` wrapper. Does not set `aria-busy` itself — put `aria-busy="true"` on the
 * container whose content is loading.
 */
export interface SkeletonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Announced once for the whole loading region (visually hidden). @default "Loading content" */
  label?: string;
  children?: ReactNode;
}
