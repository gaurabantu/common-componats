"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import type { ChartTheme, ChartTooltipItem } from "./Chart.types";
import { CHART_THEME_COLORS } from "./Chart.types";
import "./ChartTooltip.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

export interface ChartTooltipProps {
  theme: ChartTheme;
  open: boolean;
  pointerX: number;
  pointerY: number;
  containerWidth: number;
  containerHeight: number;
  label: string;
  items: ChartTooltipItem[];
  animation?: boolean;
  followPointer?: boolean;
}

export const ChartTooltip = React.memo(function ChartTooltip({
  theme,
  open,
  pointerX,
  pointerY,
  containerWidth,
  containerHeight,
  label,
  items,
  animation = true,
  followPointer = true,
}: ChartTooltipProps) {
  const themeColors = CHART_THEME_COLORS[theme];
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [enter, setEnter] = useState(false);

  useLayoutEffect(() => {
    if (!open || !ref.current) return;
    const el = ref.current;
    const tw = el.offsetWidth;
    const th = el.offsetHeight;
    const pad = 8;
    const gap = 12;
    let left = pointerX + gap;
    let top = pointerY + gap;
    if (followPointer) {
      if (left + tw > containerWidth - pad) {
        left = pointerX - tw - gap;
      }
      if (top + th > containerHeight - pad) {
        top = pointerY - th - gap;
      }
      if (left < pad) left = pad;
      if (top < pad) top = pad;
    }
    left = Math.max(pad, Math.min(left, Math.max(pad, containerWidth - tw - pad)));
    top = Math.max(pad, Math.min(top, Math.max(pad, containerHeight - th - pad)));
    setPos({ left, top });
  }, [
    open,
    pointerX,
    pointerY,
    containerWidth,
    containerHeight,
    followPointer,
    label,
    items.length,
  ]);

  React.useEffect(() => {
    if (!open) {
      setEnter(false);
      return;
    }
    setEnter(false);
    const id = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="tooltip"
      data-chart-theme={theme}
      className={cls(
        "ds-chart-tooltip",
        animation && "ds-chart-tooltip--motion",
        animation && enter && "ds-chart-tooltip--enter"
      )}
      style={{
        left: pos.left,
        top: pos.top,
        background: themeColors.tooltipBg,
        border: `1px solid ${themeColors.tooltipBorder}`,
        color: themeColors.tooltipText,
      }}
    >
      <div
        className="ds-chart-tooltip__label"
        style={{
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: themeColors.tooltipBorder,
        }}
      >
        {label}
      </div>
      <div className="ds-chart-tooltip__rows">
        {items.map((item) => (
          <div key={item.name} className="ds-chart-tooltip__row">
            <span className="ds-chart-tooltip__dot" style={{ background: item.color }} aria-hidden />
            <span className="ds-chart-tooltip__name" style={{ color: themeColors.legendText }}>
              {item.name}
            </span>
            <span className="ds-chart-tooltip__value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
