"use client";
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { DatePickerProps } from "./DatePicker.types";
import { defaultDatePickerOptions } from "./DatePicker.config";
import {
  addMonths,
  formatDateForDisplay,
  isAfterDay,
  isBeforeDay,
  isDateInRange,
  parseDate,
  parseFlexibleDate,
  startOfMonth,
} from "./DatePicker.utils";
import Calendar from "../../molecules/Calendar";
import { useFormField } from "../../molecules/FormField";
import { FORM_FIELD_CONSUMER_KEY } from "../../molecules/FormField/FormField.config";
import { getAncestorZIndex } from "../../molecules/Popover/layering";

function splitRangeValue(value: string): [string, string] {
  const parts = value.split(/\s+(?:-|to)\s+/i);
  return [parts[0] || "", parts[1] || ""];
}

function resolveRadius(rounded: NonNullable<DatePickerProps["rounded"]>): string | number {
  switch (rounded) {
    case "0":
      return 0;
    case "1":
      return "var(--radius-xs, 2px)";
    case "2":
      return "var(--radius-sm, 3px)";
    case "3":
      return "var(--radius-base, 4px)";
    case "4":
      return "var(--radius-md, 6px)";
    case "5":
      return "var(--radius-lg, 8px)";
    default:
      return 9999;
  }
}

const DatePicker: React.FC<DatePickerProps> = ({
  value = "",
  onChange,
  label,
  placeholder = defaultDatePickerOptions.placeholder,
  startPlaceholder = defaultDatePickerOptions.startPlaceholder,
  endPlaceholder = defaultDatePickerOptions.endPlaceholder,
  range = false,
  className = "",
  helperText,
  disabled = false,
  dateFormat: dateFormatProp = defaultDatePickerOptions.dateFormat,
  minDate,
  maxDate,
  validate,
  onValidate,
  error,
  required = false,
  fullWidth = true,
  size = defaultDatePickerOptions.size,
  rounded = defaultDatePickerOptions.rounded,
  variant = defaultDatePickerOptions.variant,
  status,
  rangeSeparator = defaultDatePickerOptions.rangeSeparator,
  id: idProp,
  name,
  ariaLabel,
}) => {
  const dateFormat = (dateFormatProp || defaultDatePickerOptions.dateFormat).trim() || defaultDatePickerOptions.dateFormat;
  const reactId = useId();
  /** Enclosing FormField (single mode only — range mode renders its own labelled pair). */
  const formField = useFormField();
  const field = range ? null : formField;
  const inputId = idProp ?? field?.id ?? reactId;
  const labelId = `${inputId}-label`;
  const helperId = `${inputId}-helper`;
  const wrapperRef = useRef<HTMLDivElement>(null);
  /** Calendar toggle — focus returns here when the popover closes with focus inside it. */
  const toggleRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [internalError, setInternalError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPortalReady, setIsPortalReady] = useState(false);
  const [isDesktopRangeLayout, setIsDesktopRangeLayout] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
  const initialRangeValues = useMemo(() => splitRangeValue(value), [value]);
  const initialParsedSingle = useMemo(() => parseFlexibleDate(value, dateFormat), [value, dateFormat]);
  const initialParsedStart = useMemo(() => parseFlexibleDate(initialRangeValues[0], dateFormat), [initialRangeValues[0], dateFormat]);
  const initialParsedEnd = useMemo(() => parseFlexibleDate(initialRangeValues[1], dateFormat), [initialRangeValues[1], dateFormat]);

  const [startDate, setStartDate] = useState<Date | null>(() => initialParsedStart);
  const [endDate, setEndDate] = useState<Date | null>(() => initialParsedEnd);
  const [singleDate, setSingleDate] = useState<Date | null>(() => initialParsedSingle);
  const [visibleMonth, setVisibleMonth] = useState<Date>(
    () => startOfMonth(initialParsedStart || initialParsedEnd || initialParsedSingle || new Date())
  );
  const [inputText, setInputText] = useState(() =>
    range ? "" : (initialParsedSingle ? formatDateForDisplay(initialParsedSingle, dateFormat) : (value || ""))
  );
  const [rangeStartInput, setRangeStartInput] = useState(() =>
    range ? (initialParsedStart ? formatDateForDisplay(initialParsedStart, dateFormat) : (initialRangeValues[0] || "")) : ""
  );
  const [rangeEndInput, setRangeEndInput] = useState(() =>
    range ? (initialParsedEnd ? formatDateForDisplay(initialParsedEnd, dateFormat) : (initialRangeValues[1] || "")) : ""
  );

  useEffect(() => {
    if (range) {
      const [nextStart, nextEnd] = splitRangeValue(value);
      const parsedStart = parseFlexibleDate(nextStart, dateFormat);
      const parsedEnd = parseFlexibleDate(nextEnd, dateFormat);
      setStartDate(parsedStart);
      setEndDate(parsedEnd);
      setVisibleMonth(startOfMonth(parsedStart || parsedEnd || new Date()));
      setRangeStartInput(parsedStart ? formatDateForDisplay(parsedStart, dateFormat) : (nextStart || ""));
      setRangeEndInput(parsedEnd ? formatDateForDisplay(parsedEnd, dateFormat) : (nextEnd || ""));
    } else {
      const parsedSingle = parseFlexibleDate(value, dateFormat);
      setSingleDate(parsedSingle);
      setVisibleMonth(startOfMonth(parsedSingle || new Date()));
      setInputText(parsedSingle ? formatDateForDisplay(parsedSingle, dateFormat) : (value || ""));
    }
  }, [dateFormat, range, value]);

  useEffect(() => {
    setIsPortalReady(true);
  }, []);

  /** Close; if focus was inside the (portaled) popover, return it to the toggle so it is not lost to <body>. */
  const closePopover = useCallback(() => {
    const active = typeof document !== "undefined" ? document.activeElement : null;
    const focusInside = !!active && !!popoverRef.current?.contains(active);
    setIsOpen(false);
    if (focusInside) toggleRef.current?.focus();
  }, []);

  /**
   * Escape closes only the calendar (one press = one layer). Capture phase + preventDefault so an
   * enclosing Modal / Drawer, which skips handled (defaultPrevented) Escapes, stays open.
   */
  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing) return;
      const target = e.target as Node | null;
      const inside = !!target && (!!wrapperRef.current?.contains(target) || !!popoverRef.current?.contains(target));
      if (!inside) return;
      e.preventDefault();
      e.stopPropagation();
      closePopover();
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [isOpen, closePopover]);

  const updatePopoverPosition = useCallback(() => {
    const anchorEl = wrapperRef.current;
    if (!anchorEl || typeof window === "undefined") return;

    const rect = anchorEl.getBoundingClientRect();
    const viewportPadding = 8;
    const gap = 8;
    const desktop = window.innerWidth >= 920;
    setIsDesktopRangeLayout(desktop);

    const estimatedWidth = range
      ? (desktop ? 620 : Math.min(360, window.innerWidth - viewportPadding * 2))
      : Math.min(340, window.innerWidth - viewportPadding * 2);
    const width = Math.min(estimatedWidth, window.innerWidth - viewportPadding * 2);
    const estimatedHeight = range ? (desktop ? 430 : 760) : 430;

    const left = Math.min(
      Math.max(viewportPadding, rect.left),
      window.innerWidth - width - viewportPadding
    );
    const placeAbove = rect.bottom + gap + estimatedHeight > window.innerHeight - viewportPadding &&
      rect.top - gap - estimatedHeight > viewportPadding;
    const top = placeAbove ? Math.max(viewportPadding, rect.top - estimatedHeight - gap) : rect.bottom + gap;

    setPopoverStyle({
      position: "fixed",
      top,
      left,
      width,
      maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
      maxHeight: `calc(100vh - ${viewportPadding * 2}px)`,
      overflow: "auto",
      // Portaled to <body>: lift above the dialog/drawer the field sits in (host modals
      // commonly use z 9999+), otherwise the calendar opens hidden behind it.
      zIndex: Math.max(1400, getAncestorZIndex(anchorEl) + 1),
    });
  }, [range]);

  useEffect(() => {
    if (!isOpen) return;
    updatePopoverPosition();

    const handleWindowChange = () => updatePopoverPosition();
    const handleOutsidePress = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInTrigger = wrapperRef.current?.contains(target);
      const isInPopover = popoverRef.current?.contains(target);
      if (!isInTrigger && !isInPopover) setIsOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopover();
    };

    window.addEventListener("resize", handleWindowChange);
    window.addEventListener("scroll", handleWindowChange, true);
    document.addEventListener("mousedown", handleOutsidePress);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", handleWindowChange);
      window.removeEventListener("scroll", handleWindowChange, true);
      document.removeEventListener("mousedown", handleOutsidePress);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, updatePopoverPosition, closePopover]);

  const currentSize = {
    // `toggle` = calendar button box. It must fit inside the field: a fixed 36px button made every
    // `sm` picker ~39px tall, taller than the Select / Input it sits next to. 24px+ keeps WCAG 2.5.8.
    sm: { minHeight: "var(--button-height-sm)", paddingX: 10, fontSize: "var(--text-small-size, 12px)", toggle: 24, icon: 16 },
    md: { minHeight: "var(--button-height-lg)", paddingX: 12, fontSize: "var(--text-body-size, 16px)", toggle: 36, icon: 18 },
    lg: { minHeight: 48, paddingX: 16, fontSize: "var(--text-body-size, 16px)", toggle: 40, icon: 18 },
  }[size];

  const resolvedStatus = status ?? (error ? "error" : undefined);
  const borderColor =
    resolvedStatus === "error"
      ? "var(--color-state-error)"
      : resolvedStatus === "warning"
        ? "var(--color-state-warning)"
        : resolvedStatus === "success"
          ? "var(--color-state-success)"
          : "var(--color-border-default)";

  const shellStyle: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    display: fullWidth ? "block" : "inline-block",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: 8,
    color: disabled
      ? "var(--color-text-secondary)"
      : "var(--color-text-primary)",
    fontSize: "var(--text-secondary-size, 14px)",
    fontWeight: 500,
    lineHeight: 1.5,
  };

  const fieldBaseStyle: React.CSSProperties =
    variant === "filled"
      ? {
          minHeight: currentSize.minHeight,
          backgroundColor: "var(--color-bg-page)",
          border: `1.5px solid ${borderColor}`,
          borderRadius: resolveRadius(rounded),
        }
      : variant === "underlined"
        ? {
            minHeight: currentSize.minHeight,
            backgroundColor: "transparent",
            border: "0 solid transparent",
            borderBottom: `1.5px solid ${borderColor}`,
            borderRadius: 0,
          }
        : {
            minHeight: currentSize.minHeight,
            backgroundColor: "var(--color-bg-surface)",
            border: `1.5px solid ${borderColor}`,
            borderRadius: resolveRadius(rounded),
          };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    minWidth: 0,
    // The input always sits inside a padded, bordered shell (triggerShellStyle), which owns the
    // height and the side padding. A full-height input with its own padding made the field 3px
    // taller than a Select of the same size and indented the text twice (paddingX × 2).
    height: "auto",
    alignSelf: "stretch",
    padding: 0,
    border: "none",
    outline: "none",
    background: "transparent",
    color: disabled
      ? "var(--color-text-secondary)"
      : "var(--color-text-primary)",
    fontSize: currentSize.fontSize,
    lineHeight: 1.5,
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
  };

  const helperMessage = error || internalError || helperText;
  const showsError = Boolean(error || internalError);
  /** Shared a11y wiring for every text input (single + both range ends). */
  const fieldA11y = {
    "aria-describedby": [helperMessage ? helperId : undefined, field?.describedBy].filter(Boolean).join(" ") || undefined,
    "aria-invalid": showsError || resolvedStatus === "error" || field?.invalid ? true : undefined,
    "aria-required": required || field?.required ? true : undefined,
  } as const;
  const helperStyle: React.CSSProperties = {
    marginTop: 8,
    marginBottom: 0,
    color:
      resolvedStatus === "error"
        ? "var(--color-state-error)"
        : "var(--color-text-secondary)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5,
  };

  const emitValue = (nextStart?: Date | null, nextEnd?: Date | null) => {
    const formattedStart = formatDateForDisplay(nextStart, dateFormat);
    const formattedEnd = formatDateForDisplay(nextEnd, dateFormat);
    const result = range
      ? [formattedStart, formattedEnd].filter(Boolean).join(` ${rangeSeparator} `)
      : formattedStart;

    let nextError = "";
    let isValid = true;

    if (required && !result) {
      nextError = "Date is required";
      isValid = false;
    } else if (result) {
      if (range) {
        const [rawStart, rawEnd] = splitRangeValue(result);
        if (rawStart && !parseFlexibleDate(rawStart, dateFormat)) {
          nextError = "Invalid start date";
          isValid = false;
        } else if (rawEnd && !parseFlexibleDate(rawEnd, dateFormat)) {
          nextError = "Invalid end date";
          isValid = false;
        } else if (
          rawStart &&
          rawEnd &&
          isAfterDay(parseDate(rawStart, dateFormat), parseDate(rawEnd, dateFormat))
        ) {
          nextError = "End date should be after start date";
          isValid = false;
        }
      } else if (!parseFlexibleDate(result, dateFormat)) {
        nextError = "Invalid date";
        isValid = false;
      }

      if (isValid && minDate && !isDateInRange(result.split(` ${rangeSeparator} `)[0], minDate, undefined, dateFormat)) {
        nextError = "Selected date is before the minimum date";
        isValid = false;
      }

      if (isValid && maxDate && !isDateInRange(result.split(` ${rangeSeparator} `)[0], undefined, maxDate, dateFormat)) {
        nextError = "Selected date is after the maximum date";
        isValid = false;
      }

      if (isValid && validate && !validate(result)) {
        nextError = "Invalid date";
        isValid = false;
      }
    }

    setInternalError(nextError);
    onValidate?.(isValid);

    if (isValid) {
      onChange?.(result);
    } else if (!result) {
      onChange?.("");
    }
  };
  const minParsedDate = parseDate(minDate || "", dateFormat);
  const maxParsedDate = parseDate(maxDate || "", dateFormat);

  const isDisabledDate = (date: Date) => {
    if (minParsedDate && isBeforeDay(date, minParsedDate)) return true;
    if (maxParsedDate && isAfterDay(date, maxParsedDate)) return true;
    return false;
  };

  const applyTypedDate = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      setSingleDate(null);
      setInputText("");
      emitValue(null);
      return;
    }
    const parsed = parseFlexibleDate(trimmed, dateFormat);
    if (parsed) {
      setSingleDate(parsed);
      setInputText(formatDateForDisplay(parsed, dateFormat));
      setVisibleMonth(startOfMonth(parsed));
      emitValue(parsed);
    }
  };

  const handleSingleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputText(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    const digitCount = trimmed.replace(/[/\-.]/g, "").length;
    const fmtUpper = dateFormat.toUpperCase();
    const isCompleteLength =
      (fmtUpper.includes("YYYY") && digitCount >= 8) ||
      (fmtUpper.includes("YY") && !fmtUpper.includes("YYYY") && digitCount >= 6);
    if (isCompleteLength) {
      const parsed = parseFlexibleDate(trimmed, dateFormat);
      if (parsed) applyTypedDate(trimmed);
    }
  };

  const applyTypedRange = (startText: string, endText: string) => {
    const startTrimmed = startText.trim();
    const endTrimmed = endText.trim();
    if (!startTrimmed && !endTrimmed) {
      setStartDate(null);
      setEndDate(null);
      setRangeStartInput("");
      setRangeEndInput("");
      emitValue(null, null);
      return;
    }
    const parsedStart = startTrimmed ? parseFlexibleDate(startTrimmed, dateFormat) : null;
    const parsedEnd = endTrimmed ? parseFlexibleDate(endTrimmed, dateFormat) : null;
    if (parsedStart) {
      setStartDate(parsedStart);
      setRangeStartInput(formatDateForDisplay(parsedStart, dateFormat));
      setVisibleMonth(startOfMonth(parsedStart));
    }
    if (parsedEnd) {
      setEndDate(parsedEnd);
      setRangeEndInput(formatDateForDisplay(parsedEnd, dateFormat));
    }
    emitValue(parsedStart, parsedEnd);
  };

  const getDigitCount = (str: string) => str.replace(/[^\d]/g, "").length;
  const formatUpper = dateFormat.toUpperCase();
  const completeLength = formatUpper.includes("YYYY") ? 8 : 6;

  const handleRangeStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setRangeStartInput(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    if (getDigitCount(trimmed) >= completeLength && parseFlexibleDate(trimmed, dateFormat)) {
      applyTypedRange(trimmed, rangeEndInput.trim());
    }
  };

  const handleRangeEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setRangeEndInput(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    if (getDigitCount(trimmed) >= completeLength && parseFlexibleDate(trimmed, dateFormat)) {
      applyTypedRange(rangeStartInput.trim(), trimmed);
    }
  };

  const handleCalendarRangeChange = (next: [Date | null, Date | null]) => {
    const [a, b] = next;
    setStartDate(a);
    setEndDate(b);
    if (a) setRangeStartInput(formatDateForDisplay(a, dateFormat));
    if (b) setRangeEndInput(formatDateForDisplay(b, dateFormat));
    else setRangeEndInput("");
    emitValue(a ?? null, b ?? null);
    if (a && b) {
      closePopover();
    }
  };

  const navButtonStyle: React.CSSProperties = {
    width: 28,
    height: 28,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "var(--radius-sm, 6px)",
    background: "transparent",
    color: "var(--color-text-primary)",
    cursor: disabled ? "not-allowed" : "pointer",
    flexShrink: 0,
  };

  const triggerShellStyle: React.CSSProperties = {
    ...fieldBaseStyle,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    cursor: disabled ? "not-allowed" : "text",
    padding: `0 ${currentSize.paddingX}px`,
    boxSizing: "border-box",
  };

  const popoverPanelStyle: React.CSSProperties = {
    ...popoverStyle,
    padding: 0,
    borderRadius: "var(--radius-md, 8px)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-bg-surface)",
    boxShadow:
      "var(--shadow-popover, 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 10px 24px -4px rgba(15, 23, 42, 0.1))",
    transformOrigin: "top left",
    opacity: 1,
    transition: "opacity 150ms ease-out, transform 150ms ease-out",
  };

  const rangeCalendarsStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isDesktopRangeLayout ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)",
    gap: 16,
    alignItems: "start",
  };

  if (range) {
    return (
      <div className={className} style={shellStyle} ref={wrapperRef}>
        {label && <label id={labelId} style={labelStyle}>{label}</label>}
        <div style={triggerShellStyle}>
          <input
            type="text"
            value={rangeStartInput}
            onChange={handleRangeStartChange}
            onFocus={() => {
              if (!disabled) setIsOpen(true);
            }}
            onBlur={() => applyTypedRange(rangeStartInput, rangeEndInput)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyTypedRange(rangeStartInput, rangeEndInput);
                setIsOpen(false);
              }
            }}
            placeholder={startPlaceholder}
            disabled={disabled}
            readOnly={disabled}
            aria-label={label ? `${label}, ${startPlaceholder}` : startPlaceholder}
            {...fieldA11y}
            style={{
              ...inputStyle,
              flex: 1,
              minWidth: 0,
              border: "none",
              background: "transparent",
              cursor: disabled ? "not-allowed" : "text",
            }}
          />
          <span style={{ color: "var(--color-text-secondary)", fontSize: 14, flexShrink: 0 }}>
            {rangeSeparator}
          </span>
          <input
            type="text"
            value={rangeEndInput}
            onChange={handleRangeEndChange}
            onFocus={() => {
              if (!disabled) setIsOpen(true);
            }}
            onBlur={() => applyTypedRange(rangeStartInput, rangeEndInput)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applyTypedRange(rangeStartInput, rangeEndInput);
                setIsOpen(false);
              }
            }}
            placeholder={endPlaceholder}
            disabled={disabled}
            readOnly={disabled}
            aria-label={label ? `${label}, ${endPlaceholder}` : endPlaceholder}
            {...fieldA11y}
            style={{
              ...inputStyle,
              flex: 1,
              minWidth: 0,
              border: "none",
              background: "transparent",
              cursor: disabled ? "not-allowed" : "text",
            }}
          />
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: currentSize.toggle,
              height: currentSize.toggle,
              flexShrink: 0,
              padding: 0,
              border: "none",
              borderRadius: "var(--radius-sm, 6px)",
              background: "transparent",
              color: "var(--color-text-secondary)",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
            onClick={() => !disabled && setIsOpen((prev) => !prev)}
            onMouseDown={(e) => e.preventDefault()}
            ref={toggleRef}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-label="Open calendar"
            disabled={disabled}
          >
            <svg width={currentSize.icon} height={currentSize.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {isPortalReady && isOpen && createPortal(
          <div
            ref={popoverRef}
            role="dialog"
            aria-label="Choose date range"
            aria-modal="false"
            style={popoverPanelStyle}
          >
            <div style={{ padding: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  gap: 8,
                }}
              >
                <button
                  type="button"
                  style={navButtonStyle}
                  className="calendar-nav-btn"
                  onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
                  disabled={disabled}
                  aria-label="Previous month"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: "var(--text-secondary-size, 14px)",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {visibleMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                  {" – "}
                  {addMonths(visibleMonth, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                </span>
                <button
                  type="button"
                  style={navButtonStyle}
                  className="calendar-nav-btn"
                  onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
                  disabled={disabled}
                  aria-label="Next month"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div style={rangeCalendarsStyle}>
                <Calendar
                  mode="range"
                  rangeValue={[startDate, endDate]}
                  onRangeChange={handleCalendarRangeChange}
                  month={visibleMonth}
                  onMonthChange={setVisibleMonth}
                  hideNavigation
                  captionLayout="label"
                  minDate={minParsedDate ?? undefined}
                  maxDate={maxParsedDate ?? undefined}
                  disabledDate={isDisabledDate}
                  disabled={disabled}
                  variant="outlined"
                  elevation="none"
                  bordered={false}
                  animation="none"
                  fullWidth
                  styles={{ root: { padding: 8 } }}
                />
                <Calendar
                  mode="range"
                  rangeValue={[startDate, endDate]}
                  onRangeChange={handleCalendarRangeChange}
                  month={addMonths(visibleMonth, 1)}
                  onMonthChange={(d) => setVisibleMonth(addMonths(d, -1))}
                  hideNavigation
                  captionLayout="label"
                  minDate={minParsedDate ?? undefined}
                  maxDate={maxParsedDate ?? undefined}
                  disabledDate={isDisabledDate}
                  disabled={disabled}
                  variant="outlined"
                  elevation="none"
                  bordered={false}
                  animation="none"
                  fullWidth
                  styles={{ root: { padding: 8 } }}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
        {helperMessage && (
          <p id={helperId} style={helperStyle} role={showsError ? "alert" : undefined}>
            {helperMessage}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={className} style={shellStyle} ref={wrapperRef}>
      {label && <label htmlFor={inputId} style={labelStyle}>{label}</label>}
      <div style={triggerShellStyle}>
        <input
          id={inputId}
          type="text"
          value={inputText}
          onChange={handleSingleInputChange}
          onFocus={() => !disabled && setIsOpen(true)}
          onBlur={() => applyTypedDate(inputText)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              applyTypedDate(inputText);
              setIsOpen(false);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={disabled}
          name={name}
          // Visible <label htmlFor> (own or FormField's) names the field; aria-label would override it (WCAG 2.5.3 / 4.1.2).
          aria-label={ariaLabel ?? (label || field ? undefined : placeholder)}
          {...fieldA11y}
          style={{
            ...inputStyle,
            flex: 1,
            minWidth: 0,
            border: "none",
            background: "transparent",
            cursor: disabled ? "not-allowed" : "text",
          }}
        />
        <button
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: currentSize.toggle,
            height: currentSize.toggle,
            flexShrink: 0,
            padding: 0,
            border: "none",
            borderRadius: "var(--radius-sm, 6px)",
            background: "transparent",
            color: "var(--color-text-secondary)",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          onMouseDown={(e) => e.preventDefault()}
          ref={toggleRef}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Open calendar"
          disabled={disabled}
        >
          <svg width={currentSize.icon} height={currentSize.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {isPortalReady && isOpen && createPortal(
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Choose date"
          aria-modal="false"
          style={popoverPanelStyle}
        >
          <Calendar
            value={singleDate}
            onChange={(d) => {
              if (!d) return;
              setSingleDate(d);
              setInputText(formatDateForDisplay(d, dateFormat));
              emitValue(d);
              closePopover();
            }}
            month={visibleMonth}
            onMonthChange={setVisibleMonth}
            captionLayout="label"
            minDate={minParsedDate ?? undefined}
            maxDate={maxParsedDate ?? undefined}
            disabledDate={isDisabledDate}
            disabled={disabled}
            variant="outlined"
            elevation="none"
            bordered={false}
            animation="none"
            fullWidth
            styles={{ root: { padding: 12 } }}
          />
        </div>,
        document.body
      )}
      {helperMessage && (
        <p id={helperId} style={helperStyle} role={showsError ? "alert" : undefined}>
          {helperMessage}
        </p>
      )}
    </div>
  );
};

/** Tells FormField this control wires itself via `useFormField()` (no cloneElement injection). */
(DatePicker as unknown as Record<string, unknown>)[FORM_FIELD_CONSUMER_KEY] = true;

export default DatePicker;