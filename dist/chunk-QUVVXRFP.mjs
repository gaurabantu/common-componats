import {
  Calendar_default,
  addMonths,
  formatDateForDisplay,
  isAfterDay,
  isBeforeDay,
  isDateInRange,
  parseDate,
  parseFlexibleDate,
  startOfMonth
} from "./chunk-7KXTIFH2.mjs";
import {
  FORM_FIELD_CONSUMER_KEY,
  useFormField
} from "./chunk-GJBU4OKB.mjs";
import {
  getAncestorZIndex
} from "./chunk-M6JALQW7.mjs";

// src/components/atoms/DatePicker/index.tsx
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

// src/components/atoms/DatePicker/DatePicker.config.ts
var defaultDatePickerOptions = {
  /** Default format for display and onChange output. Input accepts YYYY-MM-DD, DD/MM/YYYY, MMDDYYYY, etc. */
  dateFormat: "DD-MM-YYYY",
  placeholder: "Select date",
  startPlaceholder: "Start date",
  endPlaceholder: "End date",
  size: "md",
  variant: "outlined",
  rounded: "4",
  rangeSeparator: "to"
};

// src/components/atoms/DatePicker/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function splitRangeValue(value) {
  const parts = value.split(/\s+(?:-|to)\s+/i);
  return [parts[0] || "", parts[1] || ""];
}
function resolveRadius(rounded) {
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
var DatePicker = ({
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
  ariaLabel
}) => {
  var _a;
  const dateFormat = (dateFormatProp || defaultDatePickerOptions.dateFormat).trim() || defaultDatePickerOptions.dateFormat;
  const reactId = useId();
  const formField = useFormField();
  const field = range ? null : formField;
  const inputId = (_a = idProp != null ? idProp : field == null ? void 0 : field.id) != null ? _a : reactId;
  const labelId = `${inputId}-label`;
  const helperId = `${inputId}-helper`;
  const wrapperRef = useRef(null);
  const toggleRef = useRef(null);
  const popoverRef = useRef(null);
  const [internalError, setInternalError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPortalReady, setIsPortalReady] = useState(false);
  const [isDesktopRangeLayout, setIsDesktopRangeLayout] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState({});
  const initialRangeValues = useMemo(() => splitRangeValue(value), [value]);
  const initialParsedSingle = useMemo(() => parseFlexibleDate(value, dateFormat), [value, dateFormat]);
  const initialParsedStart = useMemo(() => parseFlexibleDate(initialRangeValues[0], dateFormat), [initialRangeValues[0], dateFormat]);
  const initialParsedEnd = useMemo(() => parseFlexibleDate(initialRangeValues[1], dateFormat), [initialRangeValues[1], dateFormat]);
  const [startDate, setStartDate] = useState(() => initialParsedStart);
  const [endDate, setEndDate] = useState(() => initialParsedEnd);
  const [singleDate, setSingleDate] = useState(() => initialParsedSingle);
  const [visibleMonth, setVisibleMonth] = useState(
    () => startOfMonth(initialParsedStart || initialParsedEnd || initialParsedSingle || /* @__PURE__ */ new Date())
  );
  const [inputText, setInputText] = useState(
    () => range ? "" : initialParsedSingle ? formatDateForDisplay(initialParsedSingle, dateFormat) : value || ""
  );
  const [rangeStartInput, setRangeStartInput] = useState(
    () => range ? initialParsedStart ? formatDateForDisplay(initialParsedStart, dateFormat) : initialRangeValues[0] || "" : ""
  );
  const [rangeEndInput, setRangeEndInput] = useState(
    () => range ? initialParsedEnd ? formatDateForDisplay(initialParsedEnd, dateFormat) : initialRangeValues[1] || "" : ""
  );
  useEffect(() => {
    if (range) {
      const [nextStart, nextEnd] = splitRangeValue(value);
      const parsedStart = parseFlexibleDate(nextStart, dateFormat);
      const parsedEnd = parseFlexibleDate(nextEnd, dateFormat);
      setStartDate(parsedStart);
      setEndDate(parsedEnd);
      setVisibleMonth(startOfMonth(parsedStart || parsedEnd || /* @__PURE__ */ new Date()));
      setRangeStartInput(parsedStart ? formatDateForDisplay(parsedStart, dateFormat) : nextStart || "");
      setRangeEndInput(parsedEnd ? formatDateForDisplay(parsedEnd, dateFormat) : nextEnd || "");
    } else {
      const parsedSingle = parseFlexibleDate(value, dateFormat);
      setSingleDate(parsedSingle);
      setVisibleMonth(startOfMonth(parsedSingle || /* @__PURE__ */ new Date()));
      setInputText(parsedSingle ? formatDateForDisplay(parsedSingle, dateFormat) : value || "");
    }
  }, [dateFormat, range, value]);
  useEffect(() => {
    setIsPortalReady(true);
  }, []);
  const closePopover = useCallback(() => {
    var _a2, _b;
    const active = typeof document !== "undefined" ? document.activeElement : null;
    const focusInside = !!active && !!((_a2 = popoverRef.current) == null ? void 0 : _a2.contains(active));
    setIsOpen(false);
    if (focusInside)
      (_b = toggleRef.current) == null ? void 0 : _b.focus();
  }, []);
  useEffect(() => {
    if (!isOpen || typeof document === "undefined")
      return void 0;
    const onKeyDown = (e) => {
      var _a2, _b;
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing)
        return;
      const target = e.target;
      const inside = !!target && (!!((_a2 = wrapperRef.current) == null ? void 0 : _a2.contains(target)) || !!((_b = popoverRef.current) == null ? void 0 : _b.contains(target)));
      if (!inside)
        return;
      e.preventDefault();
      e.stopPropagation();
      closePopover();
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [isOpen, closePopover]);
  const updatePopoverPosition = useCallback(() => {
    const anchorEl = wrapperRef.current;
    if (!anchorEl || typeof window === "undefined")
      return;
    const rect = anchorEl.getBoundingClientRect();
    const viewportPadding = 8;
    const gap = 8;
    const desktop = window.innerWidth >= 920;
    setIsDesktopRangeLayout(desktop);
    const estimatedWidth = range ? desktop ? 620 : Math.min(360, window.innerWidth - viewportPadding * 2) : Math.min(340, window.innerWidth - viewportPadding * 2);
    const width = Math.min(estimatedWidth, window.innerWidth - viewportPadding * 2);
    const estimatedHeight = range ? desktop ? 430 : 760 : 430;
    const left = Math.min(
      Math.max(viewportPadding, rect.left),
      window.innerWidth - width - viewportPadding
    );
    const placeAbove = rect.bottom + gap + estimatedHeight > window.innerHeight - viewportPadding && rect.top - gap - estimatedHeight > viewportPadding;
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
      zIndex: Math.max(1400, getAncestorZIndex(anchorEl) + 1)
    });
  }, [range]);
  useEffect(() => {
    if (!isOpen)
      return;
    updatePopoverPosition();
    const handleWindowChange = () => updatePopoverPosition();
    const handleOutsidePress = (event) => {
      var _a2, _b;
      const target = event.target;
      const isInTrigger = (_a2 = wrapperRef.current) == null ? void 0 : _a2.contains(target);
      const isInPopover = (_b = popoverRef.current) == null ? void 0 : _b.contains(target);
      if (!isInTrigger && !isInPopover)
        setIsOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key === "Escape")
        closePopover();
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
    lg: { minHeight: 48, paddingX: 16, fontSize: "var(--text-body-size, 16px)", toggle: 40, icon: 18 }
  }[size];
  const resolvedStatus = status != null ? status : error ? "error" : void 0;
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error)" : resolvedStatus === "warning" ? "var(--color-state-warning)" : resolvedStatus === "success" ? "var(--color-state-success)" : "var(--color-border-default)";
  const shellStyle = {
    width: fullWidth ? "100%" : "auto",
    display: fullWidth ? "block" : "inline-block"
  };
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: disabled ? "var(--color-text-secondary)" : "var(--color-text-primary)",
    fontSize: "var(--text-secondary-size, 14px)",
    fontWeight: 500,
    lineHeight: 1.5
  };
  const fieldBaseStyle = variant === "filled" ? {
    minHeight: currentSize.minHeight,
    backgroundColor: "var(--color-bg-page)",
    border: `1.5px solid ${borderColor}`,
    borderRadius: resolveRadius(rounded)
  } : variant === "underlined" ? {
    minHeight: currentSize.minHeight,
    backgroundColor: "transparent",
    border: "0 solid transparent",
    borderBottom: `1.5px solid ${borderColor}`,
    borderRadius: 0
  } : {
    minHeight: currentSize.minHeight,
    backgroundColor: "var(--color-bg-surface)",
    border: `1.5px solid ${borderColor}`,
    borderRadius: resolveRadius(rounded)
  };
  const inputStyle = {
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
    color: disabled ? "var(--color-text-secondary)" : "var(--color-text-primary)",
    fontSize: currentSize.fontSize,
    lineHeight: 1.5,
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none"
  };
  const helperMessage = error || internalError || helperText;
  const showsError = Boolean(error || internalError);
  const fieldA11y = {
    "aria-describedby": [helperMessage ? helperId : void 0, field == null ? void 0 : field.describedBy].filter(Boolean).join(" ") || void 0,
    "aria-invalid": showsError || resolvedStatus === "error" || (field == null ? void 0 : field.invalid) ? true : void 0,
    "aria-required": required || (field == null ? void 0 : field.required) ? true : void 0
  };
  const helperStyle = {
    marginTop: 8,
    marginBottom: 0,
    color: resolvedStatus === "error" ? "var(--color-state-error)" : "var(--color-text-secondary)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  const emitValue = (nextStart, nextEnd) => {
    const formattedStart = formatDateForDisplay(nextStart, dateFormat);
    const formattedEnd = formatDateForDisplay(nextEnd, dateFormat);
    const result = range ? [formattedStart, formattedEnd].filter(Boolean).join(` ${rangeSeparator} `) : formattedStart;
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
        } else if (rawStart && rawEnd && isAfterDay(parseDate(rawStart, dateFormat), parseDate(rawEnd, dateFormat))) {
          nextError = "End date should be after start date";
          isValid = false;
        }
      } else if (!parseFlexibleDate(result, dateFormat)) {
        nextError = "Invalid date";
        isValid = false;
      }
      if (isValid && minDate && !isDateInRange(result.split(` ${rangeSeparator} `)[0], minDate, void 0, dateFormat)) {
        nextError = "Selected date is before the minimum date";
        isValid = false;
      }
      if (isValid && maxDate && !isDateInRange(result.split(` ${rangeSeparator} `)[0], void 0, maxDate, dateFormat)) {
        nextError = "Selected date is after the maximum date";
        isValid = false;
      }
      if (isValid && validate && !validate(result)) {
        nextError = "Invalid date";
        isValid = false;
      }
    }
    setInternalError(nextError);
    onValidate == null ? void 0 : onValidate(isValid);
    if (isValid) {
      onChange == null ? void 0 : onChange(result);
    } else if (!result) {
      onChange == null ? void 0 : onChange("");
    }
  };
  const minParsedDate = parseDate(minDate || "", dateFormat);
  const maxParsedDate = parseDate(maxDate || "", dateFormat);
  const isDisabledDate = (date) => {
    if (minParsedDate && isBeforeDay(date, minParsedDate))
      return true;
    if (maxParsedDate && isAfterDay(date, maxParsedDate))
      return true;
    return false;
  };
  const applyTypedDate = (text) => {
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
  const handleSingleInputChange = (e) => {
    const newVal = e.target.value;
    setInputText(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    const digitCount = trimmed.replace(/[/\-.]/g, "").length;
    const fmtUpper = dateFormat.toUpperCase();
    const isCompleteLength = fmtUpper.includes("YYYY") && digitCount >= 8 || fmtUpper.includes("YY") && !fmtUpper.includes("YYYY") && digitCount >= 6;
    if (isCompleteLength) {
      const parsed = parseFlexibleDate(trimmed, dateFormat);
      if (parsed)
        applyTypedDate(trimmed);
    }
  };
  const applyTypedRange = (startText, endText) => {
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
  const getDigitCount = (str) => str.replace(/[^\d]/g, "").length;
  const formatUpper = dateFormat.toUpperCase();
  const completeLength = formatUpper.includes("YYYY") ? 8 : 6;
  const handleRangeStartChange = (e) => {
    const newVal = e.target.value;
    setRangeStartInput(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    if (getDigitCount(trimmed) >= completeLength && parseFlexibleDate(trimmed, dateFormat)) {
      applyTypedRange(trimmed, rangeEndInput.trim());
    }
  };
  const handleRangeEndChange = (e) => {
    const newVal = e.target.value;
    setRangeEndInput(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    if (getDigitCount(trimmed) >= completeLength && parseFlexibleDate(trimmed, dateFormat)) {
      applyTypedRange(rangeStartInput.trim(), trimmed);
    }
  };
  const handleCalendarRangeChange = (next) => {
    const [a, b] = next;
    setStartDate(a);
    setEndDate(b);
    if (a)
      setRangeStartInput(formatDateForDisplay(a, dateFormat));
    if (b)
      setRangeEndInput(formatDateForDisplay(b, dateFormat));
    else
      setRangeEndInput("");
    emitValue(a != null ? a : null, b != null ? b : null);
    if (a && b) {
      closePopover();
    }
  };
  const navButtonStyle = {
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
    flexShrink: 0
  };
  const triggerShellStyle = {
    ...fieldBaseStyle,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    cursor: disabled ? "not-allowed" : "text",
    padding: `0 ${currentSize.paddingX}px`,
    boxSizing: "border-box"
  };
  const popoverPanelStyle = {
    ...popoverStyle,
    padding: 0,
    borderRadius: "var(--radius-md, 8px)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-bg-surface)",
    boxShadow: "var(--shadow-popover, 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 10px 24px -4px rgba(15, 23, 42, 0.1))",
    transformOrigin: "top left",
    opacity: 1,
    transition: "opacity 150ms ease-out, transform 150ms ease-out"
  };
  const rangeCalendarsStyle = {
    display: "grid",
    gridTemplateColumns: isDesktopRangeLayout ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)",
    gap: 16,
    alignItems: "start"
  };
  if (range) {
    return /* @__PURE__ */ jsxs("div", { className, style: shellStyle, ref: wrapperRef, children: [
      label && /* @__PURE__ */ jsx("label", { id: labelId, style: labelStyle, children: label }),
      /* @__PURE__ */ jsxs("div", { style: triggerShellStyle, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: rangeStartInput,
            onChange: handleRangeStartChange,
            onFocus: () => {
              if (!disabled)
                setIsOpen(true);
            },
            onBlur: () => applyTypedRange(rangeStartInput, rangeEndInput),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                applyTypedRange(rangeStartInput, rangeEndInput);
                setIsOpen(false);
              }
            },
            placeholder: startPlaceholder,
            disabled,
            readOnly: disabled,
            "aria-label": label ? `${label}, ${startPlaceholder}` : startPlaceholder,
            ...fieldA11y,
            style: {
              ...inputStyle,
              flex: 1,
              minWidth: 0,
              border: "none",
              background: "transparent",
              cursor: disabled ? "not-allowed" : "text"
            }
          }
        ),
        /* @__PURE__ */ jsx("span", { style: { color: "var(--color-text-secondary)", fontSize: 14, flexShrink: 0 }, children: rangeSeparator }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: rangeEndInput,
            onChange: handleRangeEndChange,
            onFocus: () => {
              if (!disabled)
                setIsOpen(true);
            },
            onBlur: () => applyTypedRange(rangeStartInput, rangeEndInput),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                applyTypedRange(rangeStartInput, rangeEndInput);
                setIsOpen(false);
              }
            },
            placeholder: endPlaceholder,
            disabled,
            readOnly: disabled,
            "aria-label": label ? `${label}, ${endPlaceholder}` : endPlaceholder,
            ...fieldA11y,
            style: {
              ...inputStyle,
              flex: 1,
              minWidth: 0,
              border: "none",
              background: "transparent",
              cursor: disabled ? "not-allowed" : "text"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            style: {
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
              cursor: disabled ? "not-allowed" : "pointer"
            },
            onClick: () => !disabled && setIsOpen((prev) => !prev),
            onMouseDown: (e) => e.preventDefault(),
            ref: toggleRef,
            "aria-haspopup": "dialog",
            "aria-expanded": isOpen,
            "aria-label": "Open calendar",
            disabled,
            children: /* @__PURE__ */ jsxs("svg", { width: currentSize.icon, height: currentSize.icon, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsx("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
              /* @__PURE__ */ jsx("path", { d: "M3 10h18", stroke: "currentColor", strokeWidth: "1.5" }),
              /* @__PURE__ */ jsx("path", { d: "M8 3v4M16 3v4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
            ] })
          }
        )
      ] }),
      isPortalReady && isOpen && createPortal(
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: popoverRef,
            role: "dialog",
            "aria-label": "Choose date range",
            "aria-modal": "false",
            style: popoverPanelStyle,
            children: /* @__PURE__ */ jsxs("div", { style: { padding: 12 }, children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    gap: 8
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        style: navButtonStyle,
                        className: "calendar-nav-btn",
                        onClick: () => setVisibleMonth(addMonths(visibleMonth, -1)),
                        disabled,
                        "aria-label": "Previous month",
                        children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M15 18l-6-6 6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "span",
                      {
                        style: {
                          flex: 1,
                          textAlign: "center",
                          fontSize: "var(--text-secondary-size, 14px)",
                          fontWeight: 600,
                          color: "var(--color-text-primary)"
                        },
                        children: [
                          visibleMonth.toLocaleDateString(void 0, { month: "long", year: "numeric" }),
                          " \u2013 ",
                          addMonths(visibleMonth, 1).toLocaleDateString(void 0, { month: "long", year: "numeric" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        style: navButtonStyle,
                        className: "calendar-nav-btn",
                        onClick: () => setVisibleMonth(addMonths(visibleMonth, 1)),
                        disabled,
                        "aria-label": "Next month",
                        children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M9 18l6-6-6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { style: rangeCalendarsStyle, children: [
                /* @__PURE__ */ jsx(
                  Calendar_default,
                  {
                    mode: "range",
                    rangeValue: [startDate, endDate],
                    onRangeChange: handleCalendarRangeChange,
                    month: visibleMonth,
                    onMonthChange: setVisibleMonth,
                    hideNavigation: true,
                    captionLayout: "label",
                    minDate: minParsedDate != null ? minParsedDate : void 0,
                    maxDate: maxParsedDate != null ? maxParsedDate : void 0,
                    disabledDate: isDisabledDate,
                    disabled,
                    variant: "outlined",
                    elevation: "none",
                    bordered: false,
                    animation: "none",
                    fullWidth: true,
                    styles: { root: { padding: 8 } }
                  }
                ),
                /* @__PURE__ */ jsx(
                  Calendar_default,
                  {
                    mode: "range",
                    rangeValue: [startDate, endDate],
                    onRangeChange: handleCalendarRangeChange,
                    month: addMonths(visibleMonth, 1),
                    onMonthChange: (d) => setVisibleMonth(addMonths(d, -1)),
                    hideNavigation: true,
                    captionLayout: "label",
                    minDate: minParsedDate != null ? minParsedDate : void 0,
                    maxDate: maxParsedDate != null ? maxParsedDate : void 0,
                    disabledDate: isDisabledDate,
                    disabled,
                    variant: "outlined",
                    elevation: "none",
                    bordered: false,
                    animation: "none",
                    fullWidth: true,
                    styles: { root: { padding: 8 } }
                  }
                )
              ] })
            ] })
          }
        ),
        document.body
      ),
      helperMessage && /* @__PURE__ */ jsx("p", { id: helperId, style: helperStyle, role: showsError ? "alert" : void 0, children: helperMessage })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className, style: shellStyle, ref: wrapperRef, children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: inputId, style: labelStyle, children: label }),
    /* @__PURE__ */ jsxs("div", { style: triggerShellStyle, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: inputId,
          type: "text",
          value: inputText,
          onChange: handleSingleInputChange,
          onFocus: () => !disabled && setIsOpen(true),
          onBlur: () => applyTypedDate(inputText),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              applyTypedDate(inputText);
              setIsOpen(false);
            }
          },
          placeholder,
          disabled,
          readOnly: disabled,
          name,
          "aria-label": ariaLabel != null ? ariaLabel : label || field ? void 0 : placeholder,
          ...fieldA11y,
          style: {
            ...inputStyle,
            flex: 1,
            minWidth: 0,
            border: "none",
            background: "transparent",
            cursor: disabled ? "not-allowed" : "text"
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          style: {
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
            cursor: disabled ? "not-allowed" : "pointer"
          },
          onClick: () => !disabled && setIsOpen((prev) => !prev),
          onMouseDown: (e) => e.preventDefault(),
          ref: toggleRef,
          "aria-haspopup": "dialog",
          "aria-expanded": isOpen,
          "aria-label": "Open calendar",
          disabled,
          children: /* @__PURE__ */ jsxs("svg", { width: currentSize.icon, height: currentSize.icon, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
            /* @__PURE__ */ jsx("path", { d: "M3 10h18", stroke: "currentColor", strokeWidth: "1.5" }),
            /* @__PURE__ */ jsx("path", { d: "M8 3v4M16 3v4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
          ] })
        }
      )
    ] }),
    isPortalReady && isOpen && createPortal(
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: popoverRef,
          role: "dialog",
          "aria-label": "Choose date",
          "aria-modal": "false",
          style: popoverPanelStyle,
          children: /* @__PURE__ */ jsx(
            Calendar_default,
            {
              value: singleDate,
              onChange: (d) => {
                if (!d)
                  return;
                setSingleDate(d);
                setInputText(formatDateForDisplay(d, dateFormat));
                emitValue(d);
                closePopover();
              },
              month: visibleMonth,
              onMonthChange: setVisibleMonth,
              captionLayout: "label",
              minDate: minParsedDate != null ? minParsedDate : void 0,
              maxDate: maxParsedDate != null ? maxParsedDate : void 0,
              disabledDate: isDisabledDate,
              disabled,
              variant: "outlined",
              elevation: "none",
              bordered: false,
              animation: "none",
              fullWidth: true,
              styles: { root: { padding: 12 } }
            }
          )
        }
      ),
      document.body
    ),
    helperMessage && /* @__PURE__ */ jsx("p", { id: helperId, style: helperStyle, role: showsError ? "alert" : void 0, children: helperMessage })
  ] });
};
DatePicker[FORM_FIELD_CONSUMER_KEY] = true;
var DatePicker_default = DatePicker;

export {
  DatePicker_default
};
//# sourceMappingURL=chunk-QUVVXRFP.mjs.map