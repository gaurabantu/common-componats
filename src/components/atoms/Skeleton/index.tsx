"use client";

import React from "react";
import { SKELETON_DEFAULTS, SKELETON_LAST_LINE_WIDTH } from "./Skeleton.config";
import type { SkeletonDimension, SkeletonGroupProps, SkeletonProps } from "./Skeleton.types";
import "./Skeleton.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function toCss(value: SkeletonDimension | undefined): string | undefined {
  if (value === undefined || value === null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

/**
 * Skeleton — placeholder shape shown while content loads. Always `aria-hidden`;
 * wrap a set of skeletons in `SkeletonGroup` so assistive tech hears one "Loading content".
 */
export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  {
    shape = SKELETON_DEFAULTS.shape,
    lines = SKELETON_DEFAULTS.lines,
    width,
    height,
    radius,
    animated = SKELETON_DEFAULTS.animated,
    className,
    style,
    ...rest
  },
  ref,
) {
  const w = toCss(width);
  const h = toCss(height) ?? (shape === "circle" ? w : undefined);
  const blockStyle: React.CSSProperties = {
    ...(w !== undefined ? { width: w } : null),
    ...(h !== undefined ? { height: h } : null),
    ...(radius !== undefined ? { borderRadius: toCss(radius) } : null),
  };
  const lineCount = shape === "text" ? Math.max(1, Math.floor(lines || 1)) : 1;

  if (lineCount > 1) {
    return (
      <span
        ref={ref}
        className={cls("ds-skeleton-lines", className)}
        aria-hidden="true"
        style={style}
        {...rest}
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <span
            key={i}
            className="ds-skeleton"
            data-shape="text"
            data-animated={animated ? "true" : "false"}
            style={i === lineCount - 1 ? { ...blockStyle, width: SKELETON_LAST_LINE_WIDTH } : blockStyle}
          />
        ))}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={cls("ds-skeleton", className)}
      data-shape={shape}
      data-animated={animated ? "true" : "false"}
      aria-hidden="true"
      style={{ ...blockStyle, ...style }}
      {...rest}
    />
  );
});

Skeleton.displayName = "Skeleton";

/**
 * SkeletonGroup — a `role="status"` region that announces `label` around one or more
 * `Skeleton` blocks. It deliberately does NOT set `aria-busy` on itself (that would silence
 * the announcement). Consumers set `aria-busy="true"` on the content container being loaded,
 * e.g. `<section aria-busy={loading}>{loading ? <SkeletonGroup /> : content}</section>`.
 */
export const SkeletonGroup = React.forwardRef<HTMLDivElement, SkeletonGroupProps>(function SkeletonGroup(
  { label = SKELETON_DEFAULTS.groupLabel, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      className={cls("ds-skeleton-group", className)}
      {...rest}
    >
      <span className="ds-skeleton-group__label">{label}</span>
      {children}
    </div>
  );
});

SkeletonGroup.displayName = "SkeletonGroup";

export default Skeleton;
export type {
  SkeletonProps,
  SkeletonGroupProps,
  SkeletonShape,
  SkeletonDimension,
} from "./Skeleton.types";
