"use client";

import React, { useId, useRef, useState } from "react";
import type { SliderProps, SliderRangeProps, SliderSingleProps } from "./Slider.types";
import "./Slider.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

/**
 * Slider — single value or `range` (two thumbs) on native `<input type="range">`, so keyboard
 * (←/→/↑/↓, PageUp/PageDown, Home/End) and `role="slider"` semantics come from the platform.
 * `valueFormatter` drives both the visible value and `aria-valuetext`.
 */
function Slider(props: SliderProps) {
  const {
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    label,
    ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    showValue = false,
    valueFormatter,
    showMinMax = false,
    size = "md",
    id: idProp,
    name,
    className,
  } = props;

  const reactId = useId().replace(/:/g, "");
  const baseId = idProp ?? `slider-${reactId}`;
  const labelId = `${baseId}-label`;
  const fmt = (v: number) => (valueFormatter ? valueFormatter(v) : String(v));
  const span = max - min || 1;
  const pct = (v: number) => ((clamp(v, min, max) - min) / span) * 100;

  // ---- state (controlled or not) ----
  const isRange = props.range === true;
  const [internal, setInternal] = useState<number | [number, number]>(() => {
    if (isRange) {
      const d = (props as SliderRangeProps).defaultValue ?? [min, max];
      return [clamp(d[0], min, max), clamp(d[1], min, max)];
    }
    return clamp((props as SliderSingleProps).defaultValue ?? min, min, max);
  });
  const current = props.value !== undefined ? props.value : internal;
  const latest = useRef(current);
  latest.current = current;

  const emit = (next: number | [number, number]) => {
    if (props.value === undefined) setInternal(next);
    latest.current = next;
    if (isRange) {
      const p = props as SliderRangeProps;
      p.onValueChange?.(next as [number, number]);
      p.onChange?.(next as [number, number]);
    } else {
      const p = props as SliderSingleProps;
      p.onValueChange?.(next as number);
      p.onChange?.(next as number);
    }
  };
  const commit = () => {
    if (isRange) (props as SliderRangeProps).onValueCommit?.(latest.current as [number, number]);
    else (props as SliderSingleProps).onValueCommit?.(latest.current as number);
  };
  const commitHandlers = {
    onPointerUp: commit,
    onKeyUp: (e: React.KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(e.key)) commit();
    },
  };

  const hasLabel = label != null && label !== false;

  let control: React.ReactNode;
  let valueText: string;

  if (isRange) {
    const [lo, hi] = current as [number, number];
    const thumbLabels = (props as SliderRangeProps).thumbLabels ?? ["Minimum", "Maximum"];
    valueText = `${fmt(lo)} – ${fmt(hi)}`;
    const useLabelledBy = hasLabel || (!ariaLabel && Boolean(ariaLabelledBy));
    const groupLabelId = hasLabel ? labelId : ariaLabelledBy;
    const thumbName = (i: 0 | 1) => (ariaLabel ? `${ariaLabel} ${thumbLabels[i].toLowerCase()}` : thumbLabels[i]);
    const common = {
      type: "range" as const,
      min,
      max,
      step,
      disabled,
      name,
      className: "ucs-slider__input",
      ...commitHandlers,
    };
    control = (
      <>
        <div className="ucs-slider__track" aria-hidden="true">
          <div className="ucs-slider__fill" style={{ left: `${pct(lo)}%`, width: `${Math.max(0, pct(hi) - pct(lo))}%` }} />
        </div>
        <input
          {...common}
          id={`${baseId}-low`}
          value={lo}
          aria-label={useLabelledBy ? undefined : thumbName(0)}
          aria-labelledby={useLabelledBy ? `${groupLabelId} ${baseId}-low-name` : undefined}
          aria-valuetext={fmt(lo)}
          // Lower thumb on top when both sit at max so it stays draggable.
          style={{ zIndex: lo >= max - step / 2 ? 3 : 2 }}
          onChange={(e) => emit([Math.min(Number(e.target.value), hi), hi])}
        />
        <input
          {...common}
          id={`${baseId}-high`}
          value={hi}
          aria-label={useLabelledBy ? undefined : thumbName(1)}
          aria-labelledby={useLabelledBy ? `${groupLabelId} ${baseId}-high-name` : undefined}
          aria-valuetext={fmt(hi)}
          style={{ zIndex: 2 }}
          onChange={(e) => emit([lo, Math.max(Number(e.target.value), lo)])}
        />
        {useLabelledBy && (
          <>
            <span id={`${baseId}-low-name`} hidden>
              {thumbLabels[0]}
            </span>
            <span id={`${baseId}-high-name`} hidden>
              {thumbLabels[1]}
            </span>
          </>
        )}
      </>
    );
  } else {
    const v = current as number;
    valueText = fmt(v);
    control = (
      <>
        <div className="ucs-slider__track" aria-hidden="true">
          <div className="ucs-slider__fill" style={{ left: 0, width: `${pct(v)}%` }} />
        </div>
        <input
          type="range"
          id={baseId}
          className="ucs-slider__input"
          min={min}
          max={max}
          step={step}
          value={v}
          name={name}
          disabled={disabled}
          aria-label={hasLabel ? undefined : ariaLabel ?? (ariaLabelledBy ? undefined : "Value")}
          aria-labelledby={hasLabel || ariaLabel ? undefined : ariaLabelledBy}
          aria-valuetext={valueFormatter ? fmt(v) : undefined}
          onChange={(e) => emit(Number(e.target.value))}
          {...commitHandlers}
        />
      </>
    );
  }

  return (
    <div
      className={cls(
        "ucs-slider",
        `ucs-slider--${size}`,
        isRange && "ucs-slider--range",
        disabled && "ucs-slider--disabled",
        className,
      )}
      role={isRange ? "group" : undefined}
      aria-labelledby={isRange && hasLabel ? labelId : undefined}
      aria-label={isRange && !hasLabel ? ariaLabel : undefined}
    >
      {(hasLabel || showValue) && (
        <div className="ucs-slider__header">
          {hasLabel ? (
            isRange ? (
              <span id={labelId}>{label}</span>
            ) : (
              <label id={labelId} htmlFor={baseId}>
                {label}
              </label>
            )
          ) : (
            <span />
          )}
          {showValue && (
            <output className="ucs-slider__value" htmlFor={isRange ? `${baseId}-low ${baseId}-high` : baseId} aria-live="off">
              {valueText}
            </output>
          )}
        </div>
      )}
      <div className="ucs-slider__control">{control}</div>
      {showMinMax && (
        <div className="ucs-slider__minmax" aria-hidden="true">
          <span>{fmt(min)}</span>
          <span>{fmt(max)}</span>
        </div>
      )}
    </div>
  );
}

Slider.displayName = "Slider";

export default Slider;
export type { SliderProps, SliderSingleProps, SliderRangeProps, SliderSize } from "./Slider.types";
