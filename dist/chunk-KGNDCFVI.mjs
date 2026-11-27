/* ucs:component-css */
import "./styles/components/molecules/TimePicker/TimePicker.css";
import {
  FORM_FIELD_CONSUMER_KEY,
  useFormField
} from "./chunk-GJBU4OKB.mjs";

// src/components/molecules/TimePicker/index.tsx
import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";

// src/components/molecules/TimePicker/TimePicker.config.ts
var TIME_PICKER_DEFAULTS = {
  step: 15,
  size: "md",
  clearable: false
};
var TIME_PICKER_LABELS = {
  toggle: "Show times",
  clear: "Clear time",
  listbox: "Times",
  invalid: "Enter a valid time",
  unavailable: "That time is not available"
};
var MINUTES_PER_DAY = 1440;

// src/components/molecules/TimePicker/TimePicker.utils.ts
var pad = (n) => String(n).padStart(2, "0");
function toHHmm(minutes) {
  const m = (minutes % MINUTES_PER_DAY + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
}
function fromHHmm(value) {
  if (!value)
    return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match)
    return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 23 || m > 59)
    return null;
  return h * 60 + m;
}
function normaliseSpaces(s) {
  return s.replace(/[  ]/g, " ");
}
function localeFormat(locale) {
  try {
    const resolved = new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions();
    const cycle = resolved.hourCycle;
    return cycle === "h11" || cycle === "h12" ? 12 : 24;
  } catch (e) {
    return 24;
  }
}
function getPeriodLabels(locale) {
  try {
    const fmt = new Intl.DateTimeFormat(locale, { hour: "numeric", hourCycle: "h12" });
    const part = (h) => {
      var _a;
      return (_a = fmt.formatToParts(new Date(2e3, 0, 1, h)).find((p) => p.type === "dayPeriod")) == null ? void 0 : _a.value;
    };
    const am = part(1);
    const pm = part(13);
    if (am && pm && am !== pm)
      return [normaliseSpaces(am), normaliseSpaces(pm)];
  } catch (e) {
  }
  return ["AM", "PM"];
}
function formatInputText(minutes, format, periods) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (format === 24)
    return `${pad(h)}:${pad(m)}`;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${pad(h12)}:${pad(m)} ${h < 12 ? periods[0] : periods[1]}`;
}
function formatOptionLabel(minutes, format, locale) {
  const date = new Date(2e3, 0, 1, Math.floor(minutes / 60), minutes % 60);
  try {
    return normaliseSpaces(
      new Intl.DateTimeFormat(locale, {
        hour: format === 12 ? "numeric" : "2-digit",
        minute: "2-digit",
        hourCycle: format === 12 ? "h12" : "h23"
      }).format(date)
    );
  } catch (e) {
    return formatInputText(minutes, format, ["AM", "PM"]);
  }
}
function parseTimeText(text, periods) {
  let t = text.trim().toLowerCase();
  if (!t)
    return null;
  let period = null;
  const candidates = [
    [periods[0].toLowerCase(), "am"],
    [periods[1].toLowerCase(), "pm"],
    ["a.m.", "am"],
    ["p.m.", "pm"],
    ["am", "am"],
    ["pm", "pm"],
    ["a", "am"],
    ["p", "pm"]
  ];
  for (const [label, p] of candidates) {
    if (label && t.endsWith(label)) {
      period = p;
      t = t.slice(0, -label.length).trim();
      break;
    }
  }
  let h;
  let m;
  const sep = /^(\d{1,2})[:.](\d{1,2})$/.exec(t);
  if (sep) {
    h = Number(sep[1]);
    m = Number(sep[2]);
  } else if (/^\d{1,4}$/.test(t)) {
    if (t.length <= 2) {
      h = Number(t);
      m = 0;
    } else {
      h = Number(t.slice(0, t.length - 2));
      m = Number(t.slice(-2));
    }
  } else {
    return null;
  }
  if (m > 59)
    return null;
  if (period) {
    if (h < 1 || h > 12)
      return null;
    h = h % 12 + (period === "pm" ? 12 : 0);
  } else if (h > 23) {
    return null;
  }
  return h * 60 + m;
}
function segmentAt(caret, format) {
  if (caret <= 2)
    return "hour";
  if (format === 24 || caret <= 5)
    return "minute";
  return "period";
}
function segmentRange(segment, textLength) {
  if (segment === "hour")
    return [0, 2];
  if (segment === "minute")
    return [3, 5];
  return [6, textLength];
}
function adjustSegment(minutes, segment, delta, step) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (segment === "hour")
    return ((h + delta) % 24 + 24) % 24 * 60 + m;
  if (segment === "period")
    return (minutes + 12 * 60) % MINUTES_PER_DAY;
  const s = Math.min(Math.max(1, Math.round(step)), 60);
  let next = delta > 0 ? (Math.floor(m / s) + 1) * s : (Math.ceil(m / s) - 1) * s;
  if (next >= 60)
    next = 0;
  if (next < 0)
    next = Math.floor(59 / s) * s;
  return h * 60 + next;
}
function isTimeUnavailable(minutes, { min, max, disabledTimes }) {
  if (min !== null && minutes < min)
    return true;
  if (max !== null && minutes > max)
    return true;
  if (!disabledTimes)
    return false;
  const hhmm = toHHmm(minutes);
  return typeof disabledTimes === "function" ? disabledTimes(hhmm) : disabledTimes.includes(hhmm);
}
function buildOptions(step, min, max) {
  const s = Math.max(1, Math.round(step));
  const out = [];
  for (let t = 0; t < MINUTES_PER_DAY; t += s) {
    if (min !== null && t < min)
      continue;
    if (max !== null && t > max)
      break;
    out.push(t);
  }
  return out;
}

// src/components/molecules/TimePicker/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function hasContent(node) {
  return node !== void 0 && node !== null && node !== false && node !== true && node !== "";
}
function ClockGlyph() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 20 20", width: "16", height: "16", fill: "none", "aria-hidden": true, focusable: "false", children: [
    /* @__PURE__ */ jsx("circle", { cx: "10", cy: "10", r: "7.25", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ jsx("path", { d: "M10 6v4.25l2.75 1.75", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function ClearGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "14", height: "14", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
var TimePicker = React.forwardRef(function TimePicker2({
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
}, forwardedRef) {
  var _a;
  const labels = useMemo(() => ({ ...TIME_PICKER_LABELS, ...labelsProp }), [labelsProp]);
  const field = useFormField();
  const reactId = useId().replace(/:/g, "");
  const inputId = (_a = idProp != null ? idProp : field == null ? void 0 : field.id) != null ? _a : `ds-time-picker-${reactId}`;
  const labelId = `ds-time-picker-${reactId}-label`;
  const messageId = `ds-time-picker-${reactId}-message`;
  const listboxId = `ds-time-picker-${reactId}-listbox`;
  const optionId = (t) => `ds-time-picker-${reactId}-opt-${t}`;
  const format = formatProp != null ? formatProp : localeFormat(locale);
  const periods = useMemo(() => getPeriodLabels(locale), [locale]);
  const min = fromHHmm(minProp);
  const max = fromHHmm(maxProp);
  const constraints = useMemo(() => ({ min, max, disabledTimes }), [min, max, disabledTimes]);
  const options = useMemo(() => buildOptions(step, min, max), [step, min, max]);
  const isControlled = valueProp !== void 0;
  const [innerValue, setInnerValue] = useState(() => defaultValue != null ? defaultValue : null);
  const currentValue = isControlled ? valueProp : innerValue;
  const currentMinutes = fromHHmm(currentValue);
  const display = useCallback(
    (minutes) => minutes === null ? "" : formatInputText(minutes, format, periods),
    [format, periods]
  );
  const [text, setText] = useState(() => display(currentMinutes));
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [message, setMessage] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const pendingSegmentRef = useRef(null);
  const setInputRef = useCallback(
    (node) => {
      inputRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  useEffect(() => {
    setText(display(currentMinutes));
  }, [currentMinutes, display]);
  useLayoutEffect(() => {
    const segment = pendingSegmentRef.current;
    const el = inputRef.current;
    if (!segment || !el)
      return;
    pendingSegmentRef.current = null;
    const [start, end] = segmentRange(segment, el.value.length);
    el.setSelectionRange(start, end);
  }, [text]);
  useEffect(() => {
    var _a2;
    if (!open || activeIndex < 0)
      return;
    const el = (_a2 = listRef.current) == null ? void 0 : _a2.children[activeIndex];
    if (el && typeof el.scrollIntoView === "function")
      el.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);
  const interactive = !disabled && !readOnly;
  const unavailable = useCallback((t) => isTimeUnavailable(t, constraints), [constraints]);
  const commit = (minutes) => {
    const next = minutes === null ? null : toHHmm(minutes);
    setMessage(null);
    setText(display(minutes));
    if (next === currentValue)
      return;
    if (!isControlled)
      setInnerValue(next);
    onChange == null ? void 0 : onChange(next);
  };
  const commitText = () => {
    if (text.trim() === "") {
      if (currentValue !== null)
        commit(null);
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
  const firstEnabledIndex = (from, dir) => {
    for (let i = from; i >= 0 && i < options.length; i += dir) {
      if (!unavailable(options[i]))
        return i;
    }
    return -1;
  };
  const openList = () => {
    var _a2;
    if (!interactive || options.length === 0)
      return;
    const typed = (_a2 = parseTimeText(text, periods)) != null ? _a2 : currentMinutes;
    let idx = typed === null ? -1 : options.findIndex((t) => t >= typed);
    if (idx < 0)
      idx = 0;
    const enabled = firstEnabledIndex(idx, 1);
    setActiveIndex(enabled >= 0 ? enabled : firstEnabledIndex(idx, -1));
    setOpen(true);
  };
  const closeList = () => {
    setOpen(false);
    setActiveIndex(-1);
  };
  const pick = (t) => {
    var _a2;
    if (unavailable(t))
      return;
    commit(t);
    closeList();
    (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
  };
  const stepSegment = (el, delta) => {
    var _a2;
    const typed = parseTimeText(text, periods);
    const segment = segmentAt((_a2 = el.selectionStart) != null ? _a2 : 0, format);
    let start = typed != null ? typed : currentMinutes;
    if (start === null) {
      const first = options.find((t) => !unavailable(t));
      if (first === void 0)
        return;
      pendingSegmentRef.current = segment;
      commit(first);
      return;
    }
    for (let i = 0; i < MINUTES_PER_DAY; i += 1) {
      const next = adjustSegment(start, segment, delta, step);
      if (next === (typed != null ? typed : currentMinutes))
        return;
      if (!unavailable(next)) {
        pendingSegmentRef.current = segment;
        commit(next);
        if (display(next) === text) {
          const [s, e] = segmentRange(segment, el.value.length);
          el.setSelectionRange(s, e);
          pendingSegmentRef.current = null;
        }
        return;
      }
      start = next;
    }
  };
  const moveActive = (dir, fromIndex = activeIndex) => {
    let i = fromIndex;
    for (let n = 0; n < options.length; n += 1) {
      i = (i + dir + options.length) % options.length;
      if (!unavailable(options[i])) {
        setActiveIndex(i);
        return;
      }
    }
  };
  const handleKeyDown = (e) => {
    onKeyDown == null ? void 0 : onKeyDown(e);
    if (e.defaultPrevented || e.nativeEvent.isComposing || !interactive)
      return;
    const el = e.currentTarget;
    if (open) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (e.altKey)
            return;
          moveActive(1);
          return;
        case "ArrowUp":
          e.preventDefault();
          if (e.altKey)
            closeList();
          else
            moveActive(-1);
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
          if (activeIndex >= 0)
            pick(options[activeIndex]);
          else {
            commitText();
            closeList();
          }
          return;
        case "Escape":
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
        if (e.altKey && e.key === "ArrowDown")
          openList();
        else
          stepSegment(el, e.key === "ArrowUp" ? 1 : -1);
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
  const handleBlur = (e) => {
    closeList();
    if (interactive)
      commitText();
    onBlur == null ? void 0 : onBlur(e);
  };
  const handleChange = (e) => {
    const next = e.target.value;
    setText(next);
    if (message)
      setMessage(null);
    if (open) {
      const parsed = parseTimeText(next, periods);
      const idx = parsed === null || unavailable(parsed) ? -1 : options.indexOf(parsed);
      setActiveIndex(idx);
    }
  };
  const ownMessage = message != null ? message : !field && hasContent(error) && error !== true ? error : null;
  const describedBy = ariaDescribedByProp != null ? ariaDescribedByProp : [field == null ? void 0 : field.describedBy, ownMessage ? messageId : void 0].filter(Boolean).join(" ") || void 0;
  const invalid = ariaInvalidProp != null ? ariaInvalidProp : (field == null ? void 0 : field.invalid) || message !== null || error === true || hasContent(error) ? true : void 0;
  const required = ariaRequiredProp != null ? ariaRequiredProp : requiredProp || (field == null ? void 0 : field.required) ? true : void 0;
  const showOwnLabel = !field && hasContent(label);
  const showClear = clearable && interactive && currentValue !== null && currentValue !== void 0;
  const activeOption = open && activeIndex >= 0 ? options[activeIndex] : void 0;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: ["ds-time-picker", className].filter(Boolean).join(" "),
      "data-size": size,
      "data-disabled": disabled ? "true" : void 0,
      "data-readonly": readOnly ? "true" : void 0,
      "data-invalid": invalid ? "true" : void 0,
      "data-open": open ? "true" : void 0,
      children: [
        showOwnLabel ? /* @__PURE__ */ jsxs("label", { id: labelId, htmlFor: inputId, className: "ds-time-picker__label", children: [
          label,
          requiredProp ? /* @__PURE__ */ jsx("span", { className: "ds-time-picker__required", "aria-hidden": "true", children: " *" }) : null
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { className: "ds-time-picker__field", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ...rest,
              ref: setInputRef,
              id: inputId,
              type: "text",
              role: "combobox",
              inputMode: "text",
              autoComplete: "off",
              className: "ds-time-picker__input",
              value: text,
              placeholder: placeholder != null ? placeholder : format === 12 ? `hh:mm ${periods[0]}` : "HH:mm",
              disabled,
              readOnly,
              "aria-labelledby": ariaLabelledByProp != null ? ariaLabelledByProp : showOwnLabel ? labelId : void 0,
              "aria-describedby": describedBy,
              "aria-invalid": invalid,
              "aria-required": required,
              "aria-autocomplete": "none",
              "aria-haspopup": "listbox",
              "aria-expanded": open,
              "aria-controls": listboxId,
              "aria-activedescendant": activeOption !== void 0 ? optionId(activeOption) : void 0,
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              onBlur: handleBlur,
              onClick: (e) => {
                onClick == null ? void 0 : onClick(e);
                if (!e.defaultPrevented && !open)
                  openList();
              }
            }
          ),
          showClear ? /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "ds-time-picker__button ds-time-picker__clear",
              "aria-label": labels.clear,
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => {
                var _a2;
                commit(null);
                (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
              },
              children: /* @__PURE__ */ jsx(ClearGlyph, {})
            }
          ) : null,
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "ds-time-picker__button ds-time-picker__toggle",
              "aria-label": labels.toggle,
              "aria-expanded": open,
              "aria-controls": listboxId,
              tabIndex: -1,
              disabled: !interactive,
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => {
                var _a2;
                if (open)
                  closeList();
                else
                  openList();
                (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
              },
              children: /* @__PURE__ */ jsx(ClockGlyph, {})
            }
          ),
          /* @__PURE__ */ jsx(
            "ul",
            {
              ref: listRef,
              id: listboxId,
              role: "listbox",
              "aria-label": labels.listbox,
              className: "ds-time-picker__listbox",
              hidden: !open,
              children: open ? options.map((t, i) => {
                const off = unavailable(t);
                return /* @__PURE__ */ jsx(
                  "li",
                  {
                    id: optionId(t),
                    role: "option",
                    "aria-selected": t === currentMinutes,
                    "aria-disabled": off || void 0,
                    "data-active": i === activeIndex ? "true" : void 0,
                    className: "ds-time-picker__option",
                    onMouseDown: (e) => e.preventDefault(),
                    onMouseEnter: () => {
                      if (!off)
                        setActiveIndex(i);
                    },
                    onClick: () => pick(t),
                    children: formatOptionLabel(t, format, locale)
                  },
                  t
                );
              }) : null
            }
          )
        ] }),
        name !== void 0 ? /* @__PURE__ */ jsx("input", { type: "hidden", name, value: currentValue != null ? currentValue : "" }) : null,
        ownMessage ? /* @__PURE__ */ jsx("p", { id: messageId, className: "ds-time-picker__error", role: message ? "alert" : void 0, children: ownMessage }) : null
      ]
    }
  );
});
TimePicker.displayName = "TimePicker";
TimePicker[FORM_FIELD_CONSUMER_KEY] = true;
var TimePicker_default = TimePicker;

export {
  TimePicker,
  TimePicker_default
};
//# sourceMappingURL=chunk-KGNDCFVI.mjs.map