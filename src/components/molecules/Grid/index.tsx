"use client";

import React from "react";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: number | string;
  minItemWidth?: number | string;
  alignItems?: React.CSSProperties["alignItems"];
  justifyItems?: React.CSSProperties["justifyItems"];
  autoFit?: boolean;
  fullWidth?: boolean;
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  rowSpan?: number;
}

function toCssSize(value: number | string | undefined, fallback: string): string {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

export function GridItem({
  span = 1,
  rowSpan = 1,
  style,
  children,
  ...rest
}: GridItemProps) {
  return (
    <div
      {...rest}
      style={{
        minWidth: 0,
        gridColumn: `span ${Math.max(1, span)} / span ${Math.max(1, span)}`,
        gridRow: `span ${Math.max(1, rowSpan)} / span ${Math.max(1, rowSpan)}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Grid({
  columns = 2,
  gap = 16,
  minItemWidth = 240,
  alignItems = "stretch",
  justifyItems = "stretch",
  autoFit = false,
  fullWidth = true,
  style,
  children,
  ...rest
}: GridProps) {
  const gapValue = toCssSize(gap, "16px");
  const minWidthValue = toCssSize(minItemWidth, "240px");

  return (
    <div
      {...rest}
      style={{
        display: "grid",
        width: fullWidth ? "100%" : "auto",
        minWidth: 0,
        gap: gapValue,
        alignItems,
        justifyItems,
        gridTemplateColumns: autoFit
          ? `repeat(auto-fit, minmax(${minWidthValue}, 1fr))`
          : `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
