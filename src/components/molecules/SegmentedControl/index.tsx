"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SEGMENTED_CONTROL_DEFAULTS } from "./SegmentedControl.config";
import type { SegmentedControlProps } from "./SegmentedControl.types";
import "./SegmentedControl.css";

function isDev(): boolean {
  const env = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env;
  return env?.NODE_ENV !== "production";
}

/** A label that can name the radio on its own (non-empty string or a number). */
function isTextLabel(label: React.ReactNode): boolean {
  return (typeof label === "string" && label.trim().length > 0) || typeof label === "number";
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface IndicatorBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * SegmentedControl — single-choice toggle group (APG radio group).
 * `role="radiogroup"` + `role="radio"` / `aria-checked`, roving tabindex; arrow keys move focus
 * **and** select, Home / End jump to the first / last enabled option. A sliding indicator marks the
 * selection (no animation under `prefers-reduced-motion`; `Highlight` fill + outline in forced colours).
 */
const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
  {
    options,
    value: valueProp,
    defaultValue,
    onValueChange,
    size = SEGMENTED_CONTROL_DEFAULTS.size,
    fullWidth = SEGMENTED_CONTROL_DEFAULTS.fullWidth,
    ariaLabel,
    disabled = false,
    className,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const isControlled = valueProp !== undefined;
  const [inner, setInner] = useState<string | undefined>(defaultValue);
  const selected = isControlled ? valueProp : inner;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusWithin = useRef(false);
  const [box, setBox] = useState<IndicatorBox | null>(null);

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const isEnabled = (i: number) => !disabled && !!options[i] && !options[i].disabled;
  const selectedIndex = options.findIndex((o) => o.value === selected);
  const firstEnabled = options.findIndex((_, i) => isEnabled(i));
  /** Roving tab stop: the selected option if enabled, otherwise the first enabled option. */
  const tabStop = selectedIndex >= 0 && isEnabled(selectedIndex) ? selectedIndex : firstEnabled;

  const select = (i: number) => {
    const opt = options[i];
    if (!opt || !isEnabled(i)) return;
    if (opt.value === selected) return;
    if (!isControlled) setInner(opt.value);
    onValueChange?.(opt.value);
  };

  const moveTo = (i: number) => {
    itemRefs.current[i]?.focus();
    select(i);
  };

  const step = (from: number, dir: 1 | -1): number => {
    const n = options.length;
    for (let k = 1; k <= n; k += 1) {
      const i = (((from + dir * k) % n) + n) % n;
      if (isEnabled(i)) return i;
    }
    return from;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const rtl =
      typeof window !== "undefined" && rootRef.current
        ? window.getComputedStyle(rootRef.current).direction === "rtl"
        : false;
    let target = -1;
    switch (e.key) {
      case "ArrowRight":
        target = step(index, rtl ? -1 : 1);
        break;
      case "ArrowLeft":
        target = step(index, rtl ? 1 : -1);
        break;
      case "ArrowDown":
        target = step(index, 1);
        break;
      case "ArrowUp":
        target = step(index, -1);
        break;
      case "Home":
        target = firstEnabled;
        break;
      case "End": {
        for (let i = options.length - 1; i >= 0; i -= 1) {
          if (isEnabled(i)) {
            target = i;
            break;
          }
        }
        break;
      }
      default:
        return;
    }
    e.preventDefault();
    if (target >= 0) moveTo(target);
  };

  /* Dev-only: icon-only options (non-text label) must carry an `ariaLabel`. Warn once per value. */
  const warned = useRef(new Set<string>());
  useEffect(() => {
    if (!isDev()) return;
    options.forEach((o) => {
      if (isTextLabel(o.label) || (o.ariaLabel && o.ariaLabel.trim()) || warned.current.has(o.value)) return;
      warned.current.add(o.value);
      // eslint-disable-next-line no-console
      console.warn(
        `[SegmentedControl] option "${o.value}" has a non-text label and no \`ariaLabel\`; the radio has no reliable accessible name.`,
      );
    });
  }, [options]);

  /* Sliding indicator geometry — measured from the selected segment; re-measured on resize. */
  const measure = useCallback(() => {
    const el = selectedIndex >= 0 ? itemRefs.current[selectedIndex] : null;
    if (!el || el.offsetWidth === 0) {
      setBox(null);
      return;
    }
    setBox((prev) => {
      const next = { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
      return prev && prev.x === next.x && prev.y === next.y && prev.w === next.w && prev.h === next.h ? prev : next;
    });
  }, [selectedIndex]);

  useIsoLayoutEffect(() => {
    measure();
  }, [measure, options, size, fullWidth]);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined" || !rootRef.current) return undefined;
    const ro = new ResizeObserver(() => measure());
    ro.observe(rootRef.current);
    itemRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [measure, options.length]);

  /* Focus is never lost: if the focused option becomes disabled, hand focus to the new tab stop. */
  useEffect(() => {
    if (!focusWithin.current || typeof document === "undefined") return;
    const active = document.activeElement;
    if (active && active !== document.body) return;
    if (tabStop >= 0) itemRefs.current[tabStop]?.focus();
    else focusWithin.current = false;
  }, [tabStop, disabled, options]);

  return (
    <div
      ref={setRootRef}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={["ds-segmented", className].filter(Boolean).join(" ")}
      data-size={size}
      data-full-width={fullWidth ? "true" : undefined}
      data-indicator-ready={box ? "true" : undefined}
      onFocus={(e) => {
        focusWithin.current = true;
        onFocus?.(e);
      }}
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null;
        const inside = !!next && e.currentTarget.contains(next);
        // A segment that blurs because it was just disabled keeps the flag so focus can be rescued.
        const disabledNow = (e.target as unknown as HTMLButtonElement).disabled === true;
        if (!inside && !disabledNow) focusWithin.current = false;
        onBlur?.(e);
      }}
      {...rest}
    >
      <span
        className="ds-segmented__indicator"
        aria-hidden="true"
        style={
          box
            ? ({
                "--ds-seg-x": `${box.x}px`,
                "--ds-seg-y": `${box.y}px`,
                "--ds-seg-w": `${box.w}px`,
                "--ds-seg-h": `${box.h}px`,
              } as React.CSSProperties)
            : undefined
        }
      />
      {options.map((opt, i) => {
        const checked = i === selectedIndex;
        const enabled = isEnabled(i);
        const iconOnly = !isTextLabel(opt.label);
        const name = opt.ariaLabel && opt.ariaLabel.trim() ? opt.ariaLabel : undefined;
        return (
          <button
            key={opt.value}
            ref={(node) => {
              itemRefs.current[i] = node;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={name}
            tabIndex={i === tabStop ? 0 : -1}
            disabled={!enabled}
            className="ds-segmented__item"
            data-state={checked ? "on" : "off"}
            data-icon-only={iconOnly ? "true" : undefined}
            onClick={() => select(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            {opt.icon ? (
              <span className="ds-segmented__icon" aria-hidden="true">
                {opt.icon}
              </span>
            ) : null}
            {opt.label !== null && opt.label !== undefined && opt.label !== false ? (
              <span className="ds-segmented__label" aria-hidden={name && iconOnly ? "true" : undefined}>
                {opt.label}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
});

SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };
export default SegmentedControl;
export type { SegmentedControlProps, SegmentedControlOption, SegmentedControlSize } from "./SegmentedControl.types";
export { SEGMENTED_CONTROL_DEFAULTS, SEGMENTED_CONTROL_SIZES } from "./SegmentedControl.config";
