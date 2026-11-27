"use client";

import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFormField } from "../FormField";
import { FORM_FIELD_CONSUMER_KEY } from "../FormField/FormField.config";
import { MINUTES_PER_DAY, TIME_PICKER_DEFAULTS, TIME_PICKER_LABELS } from "./TimePicker.config";
import {
  adjustSegment,
  buildOptions,
  formatInputText,
  formatOptionLabel,
  fromHHmm,
  getPeriodLabels,
  isTimeUnavailable,
  localeFormat,
  parseTimeText,
  segmentAt,
  segmentRange,
  toHHmm,
} from "./TimePicker.utils";
import type { TimePickerProps, TimePickerSegment } from "./TimePicker.types";
import "./TimePicker.css";

function hasContent(node: React.ReactNode): boolean {
  return node !== undefined && node !== null && node !== false && node !== true && node !== "";
}

function ClockGlyph() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden focusable="false">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 6v4.25l2.75 1.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClearGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden focusable="false">
      <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/**
 * TimePicker — a text box with APG combobox semantics and a listbox of times. Type a time ("9:30 pm",
 * "2130"), pick one from the list (Alt+ArrowDown or the clock button), or press ArrowUp / ArrowDown on the
 * hour, minute or AM/PM segment under the caret. The value is always a 24-hour `"HH:mm"` string.
 * Option labels come from `Intl.DateTimeFormat`. Inside a `FormField` it reads the field id and state.
 */
const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(function TimePicker(
  {
    value: valueProp,
    defaultValue,
    onChange,
    format: formatProp,
    step = TIME_PICKER_DEFAULTS.step,
    min: minProp,
    max: maxProp,
    disabledTimes,
    clearable = TIME_PICKER_DEFAULTS.clearable,
    locale,
    size = TIME_PICKER_DEFAULTS.size,
    label,
    error,
    name,
    labels: labelsProp,
    className,
    id: idProp,
    disabled = false,
    readOnly = false,
    required: requiredProp,
    placeholder,
    onKeyDown,
    onBlur,
    onClick,
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    "aria-required": ariaRequiredProp,
    "aria-labelledby": ariaLabelledByProp,
    ...rest
  },
  forwardedRef,
) {
  const labels = useMemo(() => ({ ...TIME_PICKER_LABELS, ...labelsProp }), [labelsProp]);
  const field = useFormField();
  const reactId = useId().replace(/:/g, "");
  const inputId = idProp ?? field?.id ?? `ds-time-picker-${reactId}`;
  const labelId = `ds-time-picker-${reactId}-label`;
  const messageId = `ds-time-picker-${reactId}-message`;
  const listboxId = `ds-time-picker-${reactId}-listbox`;
  const optionId = (t: number) => `ds-time-picker-${reactId}-opt-${t}`;

  const format = formatProp ?? localeFormat(locale);
  const periods = useMemo(() => getPeriodLabels(locale), [locale]);
  const min = fromHHmm(minProp);
  const max = fromHHmm(maxProp);
  const constraints = useMemo(() => ({ min, max, disabledTimes }), [min, max, disabledTimes]);
  const options = useMemo(() => buildOptions(step, min, max), [step, min, max]);

  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<string | null>(() => defaultValue ?? null);
  const currentValue = isControlled ? valueProp : innerValue;
  const currentMinutes = fromHHmm(currentValue);

  const display = useCallback(
    (minutes: number | null) => (minutes === null ? "" : formatInputText(minutes, format, periods)),
    [format, periods],
  );

  const [text, setText] = useState(() => display(currentMinutes));
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [message, setMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pendingSegmentRef = useRef<TimePickerSegment | null>(null);

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  // Re-format the box whenever the value (or display format) changes from outside or after a commit.
  useEffect(() => {
    setText(display(currentMinutes));
  }, [currentMinutes, display]);

  // Keep the edited segment selected after ArrowUp / ArrowDown re-formats the text.
  useLayoutEffect(() => {
    const segment = pendingSegmentRef.current;
    const el = inputRef.current;
    if (!segment || !el) return;
    pendingSegmentRef.current = null;
    const [start, end] = segmentRange(segment, el.value.length);
    el.setSelectionRange(start, end);
  }, [text]);

  // Scroll the active option into view.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const interactive = !disabled && !readOnly;
  const unavailable = useCallback((t: number) => isTimeUnavailable(t, constraints), [constraints]);

  const commit = (minutes: number | null) => {
    const next = minutes === null ? null : toHHmm(minutes);
    setMessage(null);
    setText(display(minutes));
    if (next === currentValue) return;
    if (!isControlled) setInnerValue(next);
    onChange?.(next);
  };

  /** Parse and commit typed text. Returns false when the text was rejected (message shown). */
  const commitText = (): boolean => {
    if (text.trim() === "") {
      if (currentValue !== null) commit(null);
      return true;
    }
    const parsed = parseTimeText(text, periods);
    if (parsed === null) {
      setMessage(labels.invalid);
      return false;
    }
    if (unavailable(parsed)) {
      setMessage(labels.unavailable);
      return false;
    }
    commit(parsed);
    return true;
  };

  const firstEnabledIndex = (from: number, dir: 1 | -1): number => {
    for (let i = from; i >= 0 && i < options.length; i += dir) {
      if (!unavailable(options[i])) return i;
    }
    return -1;
  };

  const openList = () => {
    if (!interactive || options.length === 0) return;
    const typed = parseTimeText(text, periods) ?? currentMinutes;
    let idx = typed === null ? -1 : options.findIndex((t) => t >= typed);
    if (idx < 0) idx = 0;
    const enabled = firstEnabledIndex(idx, 1);
    setActiveIndex(enabled >= 0 ? enabled : firstEnabledIndex(idx, -1));
    setOpen(true);
  };

  const closeList = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const pick = (t: number) => {
    if (unavailable(t)) return;
    commit(t);
    closeList();
    inputRef.current?.focus();
  };

  /** ArrowUp / ArrowDown on the segment under the caret, skipping unavailable times. */
  const stepSegment = (el: HTMLInputElement, delta: 1 | -1) => {
    const typed = parseTimeText(text, periods);
    const segment = segmentAt(el.selectionStart ?? 0, format);
    let start = typed ?? currentMinutes;
    if (start === null) {
      const first = options.find((t) => !unavailable(t));
      if (first === undefined) return;
      pendingSegmentRef.current = segment;
      commit(first);
      return;
    }
    for (let i = 0; i < MINUTES_PER_DAY; i += 1) {
      const next = adjustSegment(start, segment, delta, step);
      if (next === (typed ?? currentMinutes)) return; // full cycle, nothing available
      if (!unavailable(next)) {
        pendingSegmentRef.current = segment;
        commit(next);
        if (display(next) === text) {
          // Same text (no re-render of `text`), select the segment directly.
          const [s, e] = segmentRange(segment, el.value.length);
          el.setSelectionRange(s, e);
          pendingSegmentRef.current = null;
        }
        return;
      }
      start = next;
    }
  };

  const moveActive = (dir: 1 | -1, fromIndex = activeIndex) => {
    let i = fromIndex;
    for (let n = 0; n < options.length; n += 1) {
      i = (i + dir + options.length) % options.length;
      if (!unavailable(options[i])) {
        setActiveIndex(i);
        return;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || e.nativeEvent.isComposing || !interactive) return;
    const el = e.currentTarget;
    if (open) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (e.altKey) return;
          moveActive(1);
          return;
        case "ArrowUp":
          e.preventDefault();
          if (e.altKey) closeList();
          else moveActive(-1);
          return;
        case "Home":
          e.preventDefault();
          setActiveIndex(firstEnabledIndex(0, 1));
          return;
        case "End":
          e.preventDefault();
          setActiveIndex(firstEnabledIndex(options.length - 1, -1));
          return;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0) pick(options[activeIndex]);
          else {
            commitText();
            closeList();
          }
          return;
        case "Escape":
          // Handled here so an enclosing Drawer / Modal does not also close.
          e.preventDefault();
          e.stopPropagation();
          closeList();
          return;
        default:
          return;
      }
    }
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        e.preventDefault();
        if (e.altKey && e.key === "ArrowDown") openList();
        else stepSegment(el, e.key === "ArrowUp" ? 1 : -1);
        return;
      case "Enter":
        if (text.trim() !== "" || currentValue !== null) {
          e.preventDefault();
          commitText();
        }
        return;
      default:
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    closeList();
    if (interactive) commitText();
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setText(next);
    if (message) setMessage(null);
    if (open) {
      // Typing while the list is open: highlight the exact match, otherwise nothing, so Enter commits the text.
      const parsed = parseTimeText(next, periods);
      const idx = parsed === null || unavailable(parsed) ? -1 : options.indexOf(parsed);
      setActiveIndex(idx);
    }
  };

  // ── ARIA wiring ───────────────────────────────────────────────────────────
  const ownMessage = message ?? (!field && hasContent(error) && error !== true ? error : null);
  const describedBy =
    ariaDescribedByProp ??
    ([field?.describedBy, ownMessage ? messageId : undefined].filter(Boolean).join(" ") || undefined);
  const invalid =
    ariaInvalidProp ?? (field?.invalid || message !== null || error === true || hasContent(error) ? true : undefined);
  const required = ariaRequiredProp ?? (requiredProp || field?.required ? true : undefined);
  const showOwnLabel = !field && hasContent(label);
  const showClear = clearable && interactive && currentValue !== null && currentValue !== undefined;
  const activeOption = open && activeIndex >= 0 ? options[activeIndex] : undefined;

  return (
    <div
      className={["ds-time-picker", className].filter(Boolean).join(" ")}
      data-size={size}
      data-disabled={disabled ? "true" : undefined}
      data-readonly={readOnly ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      data-open={open ? "true" : undefined}
    >
      {showOwnLabel ? (
        <label id={labelId} htmlFor={inputId} className="ds-time-picker__label">
          {label}
          {requiredProp ? (
            <span className="ds-time-picker__required" aria-hidden="true">
              {" *"}
            </span>
          ) : null}
        </label>
      ) : null}
      <div className="ds-time-picker__field">
        <input
          {...rest}
          ref={setInputRef}
          id={inputId}
          type="text"
          role="combobox"
          inputMode="text"
          autoComplete="off"
          className="ds-time-picker__input"
          value={text}
          placeholder={placeholder ?? (format === 12 ? `hh:mm ${periods[0]}` : "HH:mm")}
          disabled={disabled}
          readOnly={readOnly}
          aria-labelledby={ariaLabelledByProp ?? (showOwnLabel ? labelId : undefined)}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          aria-required={required}
          aria-autocomplete="none"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={activeOption !== undefined ? optionId(activeOption) : undefined}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onClick={(e) => {
            onClick?.(e);
            if (!e.defaultPrevented && !open) openList();
          }}
        />
        {showClear ? (
          <button
            type="button"
            className="ds-time-picker__button ds-time-picker__clear"
            aria-label={labels.clear}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              commit(null);
              inputRef.current?.focus();
            }}
          >
            <ClearGlyph />
          </button>
        ) : null}
        <button
          type="button"
          className="ds-time-picker__button ds-time-picker__toggle"
          aria-label={labels.toggle}
          aria-expanded={open}
          aria-controls={listboxId}
          // Not a separate tab stop: the combobox owns the keyboard (Alt+ArrowDown opens the list).
          tabIndex={-1}
          disabled={!interactive}
          // Keep focus in the text box so its blur does not close the list we are toggling.
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (open) closeList();
            else openList();
            inputRef.current?.focus();
          }}
        >
          <ClockGlyph />
        </button>
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={labels.listbox}
          className="ds-time-picker__listbox"
          hidden={!open}
        >
          {open
            ? options.map((t, i) => {
                const off = unavailable(t);
                return (
                  <li
                    key={t}
                    id={optionId(t)}
                    role="option"
                    aria-selected={t === currentMinutes}
                    aria-disabled={off || undefined}
                    data-active={i === activeIndex ? "true" : undefined}
                    className="ds-time-picker__option"
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => {
                      if (!off) setActiveIndex(i);
                    }}
                    onClick={() => pick(t)}
                  >
                    {formatOptionLabel(t, format, locale)}
                  </li>
                );
              })
            : null}
        </ul>
      </div>
      {name !== undefined ? <input type="hidden" name={name} value={currentValue ?? ""} /> : null}
      {ownMessage ? (
        <p id={messageId} className="ds-time-picker__error" role={message ? "alert" : undefined}>
          {ownMessage}
        </p>
      ) : null}
    </div>
  );
});

TimePicker.displayName = "TimePicker";

/** Tells FormField this control wires itself via `useFormField()` (no cloneElement injection). */
(TimePicker as unknown as Record<string, unknown>)[FORM_FIELD_CONSUMER_KEY] = true;

export { TimePicker };
export default TimePicker;
export type {
  TimePickerProps,
  TimePickerSize,
  TimePickerFormat,
  TimePickerSegment,
  TimePickerLabels,
} from "./TimePicker.types";
