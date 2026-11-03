"use client";

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useFormField } from "../../molecules/FormField";
import { FORM_FIELD_CONSUMER_KEY } from "../../molecules/FormField/FormField.config";
import {
  NUMBER_INPUT_DEFAULTS,
  NUMBER_INPUT_LARGE_STEP,
  NUMBER_INPUT_REPEAT_DELAY_MS,
  NUMBER_INPUT_REPEAT_INTERVAL_MS,
} from "./NumberInput.config";
import {
  clamp,
  formatForEditing,
  formatLocaleNumber,
  isNegativeInput,
  parseLocaleNumber,
  roundToPrecision,
  stepValue,
} from "./NumberInput.utils";
import type { NumberInputProps } from "./NumberInput.types";
import "./NumberInput.css";

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

function hasContent(node: React.ReactNode): boolean {
  return node !== undefined && node !== null && node !== false && node !== "" && node !== true;
}

/** Latching "changed since first render" flag (FormField rule): errors present on load are not announced. */
function useAnnounceOnChange(value: unknown): boolean {
  const initial = useRef(value);
  const changed = useRef(false);
  if (!changed.current && value !== initial.current) changed.current = true;
  return changed.current;
}

function MinusGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M3.5 8h9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function PlusGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M3.5 8h9M8 3.5v9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}


/**
 * NumberInput — locale-aware numeric field with `role="spinbutton"` semantics. A text input
 * (`inputMode="decimal"`) shows the formatted value when blurred and a plain editable number when
 * focused. ArrowUp/Down ±step (Shift ×10), PageUp/Down ×10, Home/End → min/max, Enter commits.
 * Optional − / + steppers (press and hold repeats). Works inside `FormField`.
 */
export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    value: valueProp,
    defaultValue,
    onChange,
    min: minProp,
    max,
    step = NUMBER_INPUT_DEFAULTS.step,
    precision,
    locale,
    formatOptions,
    prefix,
    suffix,
    showSteppers = NUMBER_INPUT_DEFAULTS.showSteppers,
    allowNegative = NUMBER_INPUT_DEFAULTS.allowNegative,
    clampOnBlur = NUMBER_INPUT_DEFAULTS.clampOnBlur,
    label,
    error,
    size = NUMBER_INPUT_DEFAULTS.size,
    disabled = false,
    readOnly = false,
    incrementLabel = NUMBER_INPUT_DEFAULTS.incrementLabel,
    decrementLabel = NUMBER_INPUT_DEFAULTS.decrementLabel,
    className,
    style,
    id: idProp,
    name,
    onFocus,
    onBlur,
    onKeyDown,
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    "aria-required": ariaRequiredProp,
    "aria-labelledby": ariaLabelledByProp,
    ...rest
  },
  forwardedRef,
) {
  const field = useFormField();
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const inputId = idProp ?? field?.id ?? `ds-number-input-${reactId}`;
  const labelId = `ds-number-input-${reactId}-label`;
  const errorId = `ds-number-input-${reactId}-error`;

  const min = allowNegative ? minProp : Math.max(minProp ?? 0, 0);

  // Stable key so an inline `formatOptions={{...}}` object does not re-memo every render.
  const optionsKey = JSON.stringify(formatOptions ?? {});
  const options = useMemo<Intl.NumberFormatOptions>(() => JSON.parse(optionsKey), [optionsKey]);

  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<number | null>(defaultValue ?? null);
  const current = isControlled ? (valueProp ?? null) : innerValue;
  const currentRef = useRef(current);
  currentRef.current = current;

  const [focused, setFocused] = useState(false);
  const focusedRef = useRef(false);
  const [editText, setEditText] = useState("");
  const editTextRef = useRef("");
  const setEdit = (t: string) => {
    editTextRef.current = t;
    setEditText(t);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  const toEdit = useCallback(
    (v: number | null) => (v === null ? "" : formatForEditing(v, locale, options, precision)),
    [locale, options, precision],
  );

  const setValue = useCallback(
    (next: number | null) => {
      if (Object.is(next, currentRef.current)) return false;
      currentRef.current = next;
      if (!isControlled) setInnerValue(next);
      onChange?.(next);
      return true;
    },
    [isControlled, onChange],
  );

  // External value changes while focused (e.g. a reset button) refresh the edit text unless it already matches.
  useEffect(() => {
    if (!focusedRef.current) return;
    if (parseLocaleNumber(editTextRef.current, locale, options) !== current) setEdit(toEdit(current));
  }, [current, locale, options, toEdit]);

  const baseValue = (): number | null => {
    if (focusedRef.current) {
      const parsed = parseLocaleNumber(editTextRef.current, locale, options);
      if (parsed === null || !Number.isNaN(parsed)) return parsed;
    }
    return currentRef.current;
  };

  const canStep = (direction: 1 | -1): boolean => {
    if (disabled || readOnly) return false;
    const v = currentRef.current;
    if (v === null) return true;
    if (direction > 0) return max === undefined || v < max;
    return min === undefined || v > min;
  };

  const stepBy = (direction: 1 | -1, multiplier = 1): boolean => {
    if (disabled || readOnly) return false;
    const next = stepValue(baseValue(), { step, direction, multiplier, min, max, precision });
    const changed = setValue(next);
    if (focusedRef.current) setEdit(toEdit(next));
    return changed;
  };

  /**
   * Text the parser rejects, or a negative when negatives are not allowed. Incomplete prefixes the user
   * is still typing ("-", "1,", "(5") are not flagged.
   */
  const isRejected = (text: string): boolean => {
    const parsed = parseLocaleNumber(text, locale, options);
    if (parsed === null) return false;
    if (!Number.isNaN(parsed)) return !allowNegative && isNegativeInput(text, locale, options);
    const trimmed = text.trim();
    const head = trimmed.slice(0, -1);
    const lastIsDigit = /\p{Nd}$/u.test(trimmed);
    const headOk = (t: string) => {
      const n = parseLocaleNumber(t, locale, options);
      return n === null || !Number.isNaN(n);
    };
    if (!lastIsDigit && headOk(head)) return false;
    if (trimmed.startsWith("(") && !trimmed.includes(")") && headOk(`${trimmed})`)) return false;
    return true;
  };

  /** Blur / Enter: invalid text reverts; a rejected negative clamps to the lower bound (no sign flip). */
  const commit = () => {
    const text = editTextRef.current;
    const parsed = parseLocaleNumber(text, locale, options);
    let next: number | null;
    if (parsed !== null && Number.isNaN(parsed)) next = currentRef.current;
    else if (!allowNegative && isNegativeInput(text, locale, options)) next = clampOnBlur ? (min ?? 0) : currentRef.current;
    else next = parsed;
    if (next !== null && Object.is(next, -0)) next = 0;
    if (next !== null && clampOnBlur) next = clamp(roundToPrecision(next, precision), min, max);
    setValue(next);
    return next;
  };

  // ---- press-and-hold repeat ----
  const holdTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const repeatTimer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const stopRepeat = useCallback(() => {
    clearTimeout(holdTimer.current);
    clearInterval(repeatTimer.current);
    holdTimer.current = undefined;
    repeatTimer.current = undefined;
  }, []);
  useEffect(() => stopRepeat, [stopRepeat]);
  const stepByRef = useRef(stepBy);
  stepByRef.current = stepBy;

  const startRepeat = (direction: 1 | -1) => {
    stopRepeat();
    if (!stepByRef.current(direction)) return;
    holdTimer.current = setTimeout(() => {
      repeatTimer.current = setInterval(() => {
        if (!stepByRef.current(direction)) stopRepeat();
      }, NUMBER_INPUT_REPEAT_INTERVAL_MS);
    }, NUMBER_INPUT_REPEAT_DELAY_MS);
    // Release anywhere (the button may become disabled at a bound and stop receiving pointer events).
    window.addEventListener("pointerup", stopRepeat, { once: true });
    window.addEventListener("pointercancel", stopRepeat, { once: true });
  };

  const stepperHandlers = (direction: 1 | -1) => ({
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0) return;
      // Keep focus in the input (the steppers are not tab stops; arrows are the keyboard path).
      e.preventDefault();
      if (document.activeElement !== inputRef.current) inputRef.current?.focus();
      startRepeat(direction);
    },
    onPointerUp: stopRepeat,
    onPointerLeave: stopRepeat,
    onPointerCancel: stopRepeat,
    // Assistive-tech / keyboard activation (no pointer sequence): one step.
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.detail === 0) stepBy(direction);
    },
  });

  // ---- input handlers ----
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    focusedRef.current = true;
    setFocused(true);
    if (!readOnly) setEdit(toEdit(currentRef.current));
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    stopRepeat();
    if (!readOnly && !disabled) commit();
    focusedRef.current = false;
    setFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly || disabled) return;
    // Rejected text is kept as typed (aria-invalid) and never reaches onChange.
    const text = e.target.value;
    setEdit(text);
    const parsed = parseLocaleNumber(text, locale, options);
    if (parsed === null) setValue(null);
    else if (!Number.isNaN(parsed) && !(!allowNegative && isNegativeInput(text, locale, options))) {
      setValue(Object.is(parsed, -0) ? 0 : parsed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || disabled || readOnly) return;
    const large = NUMBER_INPUT_LARGE_STEP;
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        stepBy(1, e.shiftKey ? large : 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        stepBy(-1, e.shiftKey ? large : 1);
        break;
      case "PageUp":
        e.preventDefault();
        stepBy(1, large);
        break;
      case "PageDown":
        e.preventDefault();
        stepBy(-1, large);
        break;
      case "Home":
        if (min !== undefined) {
          e.preventDefault();
          setValue(min);
          setEdit(toEdit(min));
        }
        break;
      case "End":
        if (max !== undefined) {
          e.preventDefault();
          setValue(max);
          setEdit(toEdit(max));
        }
        break;
      case "Enter": {
        const next = commit();
        setEdit(toEdit(next));
        break;
      }
      default:
        break;
    }
  };

  // ---- display + ARIA ----
  const formatted = current === null ? "" : formatLocaleNumber(current, locale, options, precision);
  const shownText = focused && !readOnly ? editText : formatted;
  const affixText = (n: React.ReactNode) => (typeof n === "string" || typeof n === "number" ? String(n) : "");
  const valueText =
    current === null ? undefined : [affixText(prefix), formatted, affixText(suffix)].filter(Boolean).join(" ");

  const showOwnError = !field && hasContent(error);
  const announceError = useAnnounceOnChange(showOwnError ? error : null);
  const describedBy =
    ariaDescribedByProp ?? ([field?.describedBy, showOwnError ? errorId : undefined].filter(Boolean).join(" ") || undefined);
  const textRejected = focused && !readOnly && isRejected(editText);
  const invalid =
    ariaInvalidProp ?? (field?.invalid || error === true || hasContent(error) || textRejected ? true : undefined);
  const required = ariaRequiredProp ?? (field?.required ? true : undefined);
  const labelledBy = ariaLabelledByProp ?? undefined;

  return (
    <div
      className={cls("ds-number-input", className)}
      style={style}
      data-size={size}
      data-disabled={disabled ? "true" : undefined}
      data-readonly={readOnly ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
    >
      {!field && hasContent(label) ? (
        <label id={labelId} htmlFor={inputId} className="ds-number-input__label">
          {label}
        </label>
      ) : null}
      <div
        className="ds-number-input__field"
        onPointerDown={(e) => {
          // Clicking the prefix / suffix / padding focuses the input.
          const t = e.target as HTMLElement;
          if (disabled || t === inputRef.current || t.closest("button")) return;
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        {prefix != null ? (
          <span className="ds-number-input__affix" data-slot="prefix" aria-hidden="true">
            {prefix}
          </span>
        ) : null}
        <input
          {...rest}
          ref={setInputRef}
          id={inputId}
          type="text"
          inputMode="decimal"
          role="spinbutton"
          autoComplete={rest.autoComplete ?? "off"}
          className="ds-number-input__input"
          value={shownText}
          disabled={disabled}
          readOnly={readOnly}
          aria-readonly={readOnly || undefined}
          aria-valuenow={current ?? undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={valueText}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          aria-required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {suffix != null ? (
          <span className="ds-number-input__affix" data-slot="suffix" aria-hidden="true">
            {suffix}
          </span>
        ) : null}
        {showSteppers ? (
          <span className="ds-number-input__steppers">
            <button
              type="button"
              tabIndex={-1}
              className="ds-number-input__stepper"
              aria-label={decrementLabel}
              aria-controls={inputId}
              disabled={!canStep(-1)}
              {...stepperHandlers(-1)}
            >
              <MinusGlyph />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="ds-number-input__stepper"
              aria-label={incrementLabel}
              aria-controls={inputId}
              disabled={!canStep(1)}
              {...stepperHandlers(1)}
            >
              <PlusGlyph />
            </button>
          </span>
        ) : null}
      </div>
      {name ? <input type="hidden" name={name} value={current ?? ""} disabled={disabled} /> : null}
      {showOwnError ? (
        <p id={errorId} className="ds-number-input__error" role={announceError ? "alert" : undefined}>
          {error}
        </p>
      ) : null}
    </div>
  );
});

NumberInput.displayName = "NumberInput";
/** Tells FormField this control wires itself via `useFormField()` (no cloneElement injection). */
(NumberInput as unknown as Record<string, unknown>)[FORM_FIELD_CONSUMER_KEY] = true;

export default NumberInput;
export {
  parseLocaleNumber,
  formatLocaleNumber,
  formatForEditing,
  getNumberLocaleInfo,
  stepValue,
} from "./NumberInput.utils";
export type { NumberInputProps, NumberInputSize } from "./NumberInput.types";
