"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ColorPickerProps, ColorPickerSwatch } from "./ColorPicker.types";
import { DEFAULT_COLOR_PICKER_PALETTE, normalizeHex, resolveTokenHex } from "./colorUtils";
import "./ColorPicker.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** Check-mark ink that contrasts with the swatch itself (depends on the swatch data, not the theme). */
function inkFor(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.4 ? "#0d0d0d" : "#ffffff";
}

/**
 * Colour picker — swatch grid (radio-group semantics, arrow-key navigation), hex text field and
 * optional native picker. **Value is always a hex string** (`#rrggbb`, lowercase).
 */
function ColorPicker({
  value: valueProp,
  defaultValue,
  onChange,
  onValueChange,
  palette,
  columns,
  showHexInput = true,
  showNativePicker = false,
  resolveTokens = false,
  label,
  ariaLabel = "Colour",
  swatchSize = "md",
  disabled = false,
  id: idProp,
  name,
  className,
}: ColorPickerProps) {
  const reactId = useId().replace(/:/g, "");
  const baseId = idProp ?? `color-picker-${reactId}`;
  const labelId = `${baseId}-label`;
  const hexId = `${baseId}-hex`;
  const errId = `${baseId}-hex-error`;

  const [internal, setInternal] = useState<string | null>(() => normalizeHex(defaultValue));
  const value = valueProp !== undefined ? normalizeHex(valueProp) : internal;

  const baseSwatches = useMemo<ColorPickerSwatch[]>(
    () =>
      (palette ?? DEFAULT_COLOR_PICKER_PALETTE)
        .map((p) => (typeof p === "string" ? { value: p } : p))
        .map((p) => ({ ...p, value: normalizeHex(p.value) ?? p.value }))
        .filter((p) => normalizeHex(p.value) !== null),
    [palette],
  );
  const [resolved, setResolved] = useState<ColorPickerSwatch[] | null>(null);
  useEffect(() => {
    if (!resolveTokens) {
      setResolved(null);
      return;
    }
    setResolved(baseSwatches.map((s) => (s.token ? { ...s, value: resolveTokenHex(s.token) ?? s.value } : s)));
  }, [baseSwatches, resolveTokens]);
  const swatches = (resolveTokens && resolved) || baseSwatches;

  const cols = Math.max(1, columns ?? (palette ? 8 : 5));

  const emit = (hex: string) => {
    if (valueProp === undefined) setInternal(hex);
    onChange?.(hex);
    onValueChange?.(hex);
  };

  // ---- swatch radiogroup (roving tabindex) ----
  const selectedIdx = swatches.findIndex((s) => s.value === value);
  const [focusIdx, setFocusIdx] = useState<number | null>(null);
  const tabIdx = focusIdx ?? (selectedIdx >= 0 ? selectedIdx : 0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (to: number) => {
    const i = Math.max(0, Math.min(swatches.length - 1, to));
    setFocusIdx(i);
    btnRefs.current[i]?.focus();
    emit(swatches[i].value); // radio pattern: selection follows focus
  };

  const onSwatchKey = (e: React.KeyboardEvent, i: number) => {
    let to: number | null = null;
    switch (e.key) {
      case "ArrowRight":
        to = (i + 1) % swatches.length;
        break;
      case "ArrowLeft":
        to = (i - 1 + swatches.length) % swatches.length;
        break;
      case "ArrowDown":
        to = i + cols < swatches.length ? i + cols : i;
        break;
      case "ArrowUp":
        to = i - cols >= 0 ? i - cols : i;
        break;
      case "Home":
        to = 0;
        break;
      case "End":
        to = swatches.length - 1;
        break;
      case " ":
      case "Enter":
        e.preventDefault();
        emit(swatches[i].value);
        return;
      default:
        return;
    }
    e.preventDefault();
    move(to);
  };

  // ---- hex field ----
  const [draft, setDraft] = useState(value ?? "");
  const [invalid, setInvalid] = useState(false);
  const editing = useRef(false);
  useEffect(() => {
    if (!editing.current) {
      setDraft(value ?? "");
      setInvalid(false);
    }
  }, [value]);

  const commitDraft = () => {
    const hex = normalizeHex(draft);
    if (hex) {
      setInvalid(false);
      setDraft(hex);
      if (hex !== value) emit(hex);
    } else if (draft.trim() === "") {
      setInvalid(false);
      setDraft(value ?? "");
    } else {
      setInvalid(true);
    }
  };

  const hasLabel = label != null && label !== false;

  return (
    <div className={cls("ucs-color-picker", `ucs-color-picker--${swatchSize}`, className)} id={baseId}>
      {hasLabel && (
        <span id={labelId} className="ucs-color-picker__label">
          {label}
        </span>
      )}
      {name ? <input type="hidden" name={name} value={value ?? ""} /> : null}
      <div
        role="radiogroup"
        aria-labelledby={hasLabel ? labelId : undefined}
        aria-label={hasLabel ? undefined : ariaLabel}
        aria-disabled={disabled || undefined}
        className="ucs-color-picker__grid"
        style={{ ["--ucs-cols" as string]: cols } as React.CSSProperties}
      >
        {swatches.map((s, i) => {
          const checked = i === selectedIdx;
          const swatchName = s.label ?? s.value;
          return (
            <button
              key={`${s.value}-${i}`}
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={swatchName}
              title={s.label ? `${s.label} (${s.value})` : s.value}
              tabIndex={i === tabIdx ? 0 : -1}
              disabled={disabled}
              className="ucs-color-picker__swatch"
              style={{ backgroundColor: s.value }}
              data-value={s.value}
              onClick={() => {
                setFocusIdx(i);
                emit(s.value);
              }}
              onFocus={() => setFocusIdx(i)}
              onKeyDown={(e) => onSwatchKey(e, i)}
            >
              {checked && (
                <svg className="ucs-color-picker__check" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8.5l3 3 7-7" fill="none" stroke={inkFor(s.value)} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      {(showHexInput || showNativePicker) && (
        <div className="ucs-color-picker__row">
          <span className="ucs-color-picker__preview" aria-hidden="true" style={{ backgroundColor: value ?? "transparent" }} />
          {showHexInput && (
            <input
              id={hexId}
              type="text"
              className="ucs-color-picker__hex"
              inputMode="text"
              autoComplete="off"
              spellCheck={false}
              maxLength={7}
              placeholder="#rrggbb"
              aria-label={hasLabel ? undefined : `${ariaLabel} hex value`}
              aria-labelledby={hasLabel ? `${labelId} ${hexId}-name` : undefined}
              aria-invalid={invalid || undefined}
              aria-describedby={invalid ? errId : undefined}
              disabled={disabled}
              value={draft}
              onFocus={() => {
                editing.current = true;
              }}
              onChange={(e) => {
                const next = e.target.value;
                setDraft(next);
                const s = next.trim().replace(/^#/, "");
                // Emit live once a full 6-digit hex is typed.
                if (/^[0-9a-fA-F]{6}$/.test(s)) {
                  setInvalid(false);
                  const hex = `#${s.toLowerCase()}`;
                  if (hex !== value) emit(hex);
                }
              }}
              onBlur={() => {
                editing.current = false;
                commitDraft();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitDraft();
                } else if (e.key === "Escape") {
                  setDraft(value ?? "");
                  setInvalid(false);
                }
              }}
            />
          )}
          {hasLabel && showHexInput && (
            <span id={`${hexId}-name`} hidden>
              hex value
            </span>
          )}
          {showNativePicker && (
            <input
              type="color"
              className="ucs-color-picker__native"
              aria-label={`${typeof label === "string" ? label : ariaLabel} custom colour`}
              disabled={disabled}
              value={value ?? "#000000"}
              onChange={(e) => {
                const hex = normalizeHex(e.target.value);
                if (hex) emit(hex);
              }}
            />
          )}
        </div>
      )}
      {invalid && (
        <span id={errId} className="ucs-color-picker__error" role="alert">
          Enter a hex colour like #1a6bb5
        </span>
      )}
    </div>
  );
}

ColorPicker.displayName = "ColorPicker";

export default ColorPicker;
export { DEFAULT_COLOR_PICKER_PALETTE, normalizeHex } from "./colorUtils";
export type { ColorPickerProps, ColorPickerSwatch, ColorPickerSwatchSize } from "./ColorPicker.types";
