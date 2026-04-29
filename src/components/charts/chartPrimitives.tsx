"use client";

import React, { useLayoutEffect, useRef, useState } from "react";

/** Stroke draw-in for SVG line paths */
export function AnimatedLineStroke({
  pathD,
  progress,
  color,
  strokeWidth,
}: {
  pathD: string;
  progress: number;
  color: string;
  strokeWidth: number;
}) {
  const ref = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !pathD) {
      setLength(0);
      return;
    }
    try {
      setLength(el.getTotalLength());
    } catch {
      setLength(0);
    }
  }, [pathD]);

  const len = length || 1;
  const offset = len * (1 - progress);

  return (
    <path
      ref={ref}
      d={pathD}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={len}
      strokeDashoffset={offset}
    />
  );
}
