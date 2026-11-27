/* ucs:component-css */
import "./styles/components/atoms/NumberInput/NumberInput.css";
import {
  FORM_FIELD_CONSUMER_KEY,
  useFormField
} from "./chunk-GJBU4OKB.mjs";

// src/components/atoms/NumberInput/index.tsx
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

// src/components/atoms/NumberInput/NumberInput.config.ts
var NUMBER_INPUT_DEFAULTS = {
  step: 1,
  size: "md",
  showSteppers: true,
  allowNegative: true,
  clampOnBlur: true,
  incrementLabel: "Increase",
  decrementLabel: "Decrease"
};
var NUMBER_INPUT_LARGE_STEP = 10;
var NUMBER_INPUT_REPEAT_DELAY_MS = 400;
var NUMBER_INPUT_REPEAT_INTERVAL_MS = 60;

// src/components/atoms/NumberInput/NumberInput.utils.ts
var MINUS_CHARS = ["-", "\u2212", "\u2012", "\u2013", "\uFE63", "\uFF0D"];
var SPACE_RE = /[\s   ‎‏؜]/g;
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function safeNumberFormat(locale, options) {
  try {
    return new Intl.NumberFormat(locale, options);
  } catch (e) {
    try {
      return new Intl.NumberFormat(locale);
    } catch (e2) {
      return new Intl.NumberFormat();
    }
  }
}
function affixOptions(options) {
  if (!options)
    return {};
  const { style, currency, currencyDisplay, currencySign, unit, unitDisplay } = options;
  return { style, currency, currencyDisplay, currencySign, unit, unitDisplay };
}
var infoCache = /* @__PURE__ */ new Map();
function getNumberLocaleInfo(locale, options) {
  const key = `${locale != null ? locale : ""}|${JSON.stringify(options != null ? options : {})}`;
  const cached = infoCache.get(key);
  if (cached)
    return cached;
  const parts = safeNumberFormat(locale, {
    ...affixOptions(options),
    useGrouping: true,
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).formatToParts(-12345675e-1);
  let group = ",";
  let decimal = ".";
  let minus = "-";
  const literals = /* @__PURE__ */ new Set();
  for (const p of parts) {
    if (p.type === "group")
      group = p.value;
    else if (p.type === "decimal")
      decimal = p.value;
    else if (p.type === "minusSign")
      minus = p.value;
    else if (p.type === "currency" || p.type === "percentSign" || p.type === "unit" || p.type === "literal") {
      const v = p.value.replace(SPACE_RE, "").replace(/[()+]/g, "");
      if (v && !MINUS_CHARS.includes(v))
        literals.add(v);
    }
  }
  const intGroups = safeNumberFormat(locale, { useGrouping: true, maximumFractionDigits: 0 }).formatToParts(1234567890).filter((p) => p.type === "integer").map((p) => p.value.length);
  const primaryGroupSize = intGroups.length > 1 ? intGroups[intGroups.length - 1] : 3;
  const secondaryGroupSize = intGroups.length > 2 ? intGroups[intGroups.length - 2] : primaryGroupSize;
  if ((options == null ? void 0 : options.style) === "percent")
    literals.add("%");
  if ((options == null ? void 0 : options.style) === "currency" && options.currency)
    literals.add(options.currency.toUpperCase());
  const plain = safeNumberFormat(locale, { useGrouping: false, maximumFractionDigits: 0 });
  const digits = Array.from({ length: 10 }, (_, i) => plain.format(i));
  const compact = [];
  if ((options == null ? void 0 : options.notation) === "compact") {
    const cf = safeNumberFormat(locale, {
      notation: "compact",
      compactDisplay: options.compactDisplay,
      maximumFractionDigits: 0
    });
    const seen = /* @__PURE__ */ new Set();
    for (let exp = 3; exp <= 15; exp += 1) {
      const p = cf.formatToParts(10 ** exp);
      const suffix = p.filter((x) => x.type === "compact").map((x) => x.value.replace(SPACE_RE, "")).join("");
      const intText = p.filter((x) => x.type === "integer").map((x) => x.value).join("");
      const intValue = Number(
        intText.split("").map((ch) => {
          const i = digits.indexOf(ch);
          return i >= 0 ? String(i) : ch;
        }).join("")
      );
      if (!suffix || seen.has(suffix) || !intValue)
        continue;
      seen.add(suffix);
      compact.push({ suffix, multiplier: 10 ** exp / intValue });
    }
    compact.sort((a, b) => b.suffix.length - a.suffix.length);
  }
  const info = {
    group,
    decimal,
    minus,
    digits,
    literals: Array.from(literals).sort((a, b) => b.length - a.length),
    compact,
    percent: (options == null ? void 0 : options.style) === "percent",
    primaryGroupSize,
    secondaryGroupSize
  };
  infoCache.set(key, info);
  return info;
}
function cleanFloat(n) {
  return Number.isFinite(n) ? Number(n.toPrecision(15)) : n;
}
var GROUP_TOKEN = "\0";
var DIGIT_RUN = "[0-9]";
function parseLocaleNumber(text, locale, options) {
  const info = getNumberLocaleInfo(locale, options);
  if (text.replace(SPACE_RE, "") === "")
    return null;
  let s = text.split("").map((ch) => {
    const i = info.digits.indexOf(ch);
    return i >= 0 ? String(i) : ch;
  }).join("");
  const groupIsSpace = info.group.replace(SPACE_RE, "") === "";
  const groupIsApostrophe = /^['’]$/.test(info.group);
  if (groupIsSpace) {
    s = s.trim().replace(/([0-9])[\s\u00A0\u202F\u2009]+(?=[0-9])/g, `$1${GROUP_TOKEN}`);
  } else if (groupIsApostrophe) {
    s = s.replace(/['’]/g, GROUP_TOKEN);
  } else if (info.group !== info.decimal) {
    s = s.split(info.group).join(GROUP_TOKEN);
  }
  s = s.replace(SPACE_RE, "");
  let multiplier = 1;
  for (const { suffix, multiplier: mul } of info.compact) {
    const re = new RegExp(`${escapeRegExp(suffix)}(?=[)\\-\u2212]?$)`, "i");
    if (re.test(s)) {
      multiplier = mul;
      s = s.replace(re, "");
      break;
    }
  }
  for (const lit of info.literals) {
    if (lit === info.decimal)
      continue;
    s = s.split(lit).join("");
  }
  s = s.replace(/%/g, "");
  let negative = false;
  const paren = /^\((.*)\)$/.exec(s);
  if (paren) {
    negative = true;
    s = paren[1];
  }
  for (const m of /* @__PURE__ */ new Set([info.minus, ...MINUS_CHARS]))
    s = s.split(m).join("-");
  const signMatch = /^([-+]?)(.*?)(-?)$/.exec(s);
  if (signMatch[1] === "-" || signMatch[3] === "-") {
    if (negative || signMatch[1] === "-" && signMatch[3] === "-")
      return Number.NaN;
    negative = true;
  }
  s = signMatch[2];
  if (/[-+()]/.test(s))
    return Number.NaN;
  const decimal = info.decimal;
  let intPart = s;
  let fracPart = null;
  const decIdx = s.indexOf(decimal);
  if (decIdx >= 0) {
    intPart = s.slice(0, decIdx);
    fracPart = s.slice(decIdx + decimal.length);
  } else if (decimal !== "." && info.group !== "." && s.includes(".")) {
    const i = s.indexOf(".");
    intPart = s.slice(0, i);
    fracPart = s.slice(i + 1);
  }
  if (fracPart !== null && !new RegExp(`^${DIGIT_RUN}*$`).test(fracPart))
    return Number.NaN;
  if (intPart.includes(GROUP_TOKEN)) {
    const groups = intPart.split(GROUP_TOKEN);
    const allDigits = groups.every((g) => new RegExp(`^${DIGIT_RUN}+$`).test(g));
    if (!allDigits)
      return Number.NaN;
    const last = groups[groups.length - 1];
    if (groups.length === 2 && fracPart === null && last.length >= 1 && last.length <= 2) {
      fracPart = last;
      intPart = groups[0];
    } else {
      const { primaryGroupSize: p, secondaryGroupSize: q } = info;
      const middle = groups.slice(1, -1);
      const ok = last.length === p && middle.every((g) => g.length === q) && groups[0].length >= 1 && groups[0].length <= (groups.length > 2 ? q : Math.max(p, q));
      if (!ok)
        return Number.NaN;
      intPart = groups.join("");
    }
  }
  if (!new RegExp(`^${DIGIT_RUN}*$`).test(intPart))
    return Number.NaN;
  if (intPart === "" && (fracPart === null || fracPart === ""))
    return Number.NaN;
  let n = Number(`${intPart || "0"}.${fracPart || "0"}`) * multiplier;
  if (info.percent)
    n /= 100;
  n = cleanFloat(n);
  return negative ? -n : n;
}
function isNegativeInput(text, locale, options) {
  const n = parseLocaleNumber(text, locale, options);
  return n !== null && !Number.isNaN(n) && (n < 0 || Object.is(n, -0));
}
function formatLocaleNumber(value, locale, options, precision) {
  const opts = { ...options };
  if (precision !== void 0) {
    opts.minimumFractionDigits = precision;
    opts.maximumFractionDigits = precision;
  }
  try {
    return new Intl.NumberFormat(locale, opts).format(value);
  } catch (e) {
    return String(value);
  }
}
function formatForEditing(value, locale, options, precision) {
  const shown = (options == null ? void 0 : options.style) === "percent" ? cleanFloat(value * 100) : value;
  return safeNumberFormat(locale, {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: precision !== void 0 ? precision : 20
  }).format(shown);
}
function countDecimals(n) {
  var _a, _b, _c, _d;
  if (!Number.isFinite(n))
    return 0;
  const s = String(n);
  const exp = /e-(\d+)$/i.exec(s);
  if (exp) {
    const mantissa = s.split(/e/i)[0];
    const frac = (_b = (_a = mantissa.split(".")[1]) == null ? void 0 : _a.length) != null ? _b : 0;
    return frac + Number(exp[1]);
  }
  return (_d = (_c = s.split(".")[1]) == null ? void 0 : _c.length) != null ? _d : 0;
}
function roundToPrecision(n, precision) {
  if (precision === void 0 || !Number.isFinite(n))
    return n;
  const f = 10 ** precision;
  return cleanFloat(Math.round(cleanFloat(n * f)) / f);
}
function clamp(n, min, max) {
  let v = n;
  if (min !== void 0 && v < min)
    v = min;
  if (max !== void 0 && v > max)
    v = max;
  return v;
}
function stepValue(value, { step, direction, multiplier = 1, min, max, precision }) {
  if (value === null || !Number.isFinite(value))
    return roundToPrecision(clamp(0, min, max), precision);
  const delta = step * multiplier * direction;
  const decimals = Math.min(20, Math.max(countDecimals(step), countDecimals(value), precision != null ? precision : 0));
  const next = Number((value + delta).toFixed(decimals));
  return clamp(roundToPrecision(next, precision), min, max);
}

// src/components/atoms/NumberInput/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function hasContent(node) {
  return node !== void 0 && node !== null && node !== false && node !== "" && node !== true;
}
function useAnnounceOnChange(value) {
  const initial = useRef(value);
  const changed = useRef(false);
  if (!changed.current && value !== initial.current)
    changed.current = true;
  return changed.current;
}
function MinusGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "M3.5 8h9", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
function PlusGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "M3.5 8h9M8 3.5v9", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
var NumberInput = React.forwardRef(function NumberInput2({
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
}, forwardedRef) {
  var _a, _b;
  const field = useFormField();
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const inputId = (_a = idProp != null ? idProp : field == null ? void 0 : field.id) != null ? _a : `ds-number-input-${reactId}`;
  const labelId = `ds-number-input-${reactId}-label`;
  const errorId = `ds-number-input-${reactId}-error`;
  const min = allowNegative ? minProp : Math.max(minProp != null ? minProp : 0, 0);
  const optionsKey = JSON.stringify(formatOptions != null ? formatOptions : {});
  const options = useMemo(() => JSON.parse(optionsKey), [optionsKey]);
  const isControlled = valueProp !== void 0;
  const [innerValue, setInnerValue] = useState(defaultValue != null ? defaultValue : null);
  const current = isControlled ? valueProp != null ? valueProp : null : innerValue;
  const currentRef = useRef(current);
  currentRef.current = current;
  const [focused, setFocused] = useState(false);
  const focusedRef = useRef(false);
  const [editText, setEditText] = useState("");
  const editTextRef = useRef("");
  const setEdit = (t) => {
    editTextRef.current = t;
    setEditText(t);
  };
  const inputRef = useRef(null);
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
  const toEdit = useCallback(
    (v) => v === null ? "" : formatForEditing(v, locale, options, precision),
    [locale, options, precision]
  );
  const setValue = useCallback(
    (next) => {
      if (Object.is(next, currentRef.current))
        return false;
      currentRef.current = next;
      if (!isControlled)
        setInnerValue(next);
      onChange == null ? void 0 : onChange(next);
      return true;
    },
    [isControlled, onChange]
  );
  useEffect(() => {
    if (!focusedRef.current)
      return;
    if (parseLocaleNumber(editTextRef.current, locale, options) !== current)
      setEdit(toEdit(current));
  }, [current, locale, options, toEdit]);
  const baseValue = () => {
    if (focusedRef.current) {
      const parsed = parseLocaleNumber(editTextRef.current, locale, options);
      if (parsed === null || !Number.isNaN(parsed))
        return parsed;
    }
    return currentRef.current;
  };
  const canStep = (direction) => {
    if (disabled || readOnly)
      return false;
    const v = currentRef.current;
    if (v === null)
      return true;
    if (direction > 0)
      return max === void 0 || v < max;
    return min === void 0 || v > min;
  };
  const stepBy = (direction, multiplier = 1) => {
    if (disabled || readOnly)
      return false;
    const next = stepValue(baseValue(), { step, direction, multiplier, min, max, precision });
    const changed = setValue(next);
    if (focusedRef.current)
      setEdit(toEdit(next));
    return changed;
  };
  const isRejected = (text) => {
    const parsed = parseLocaleNumber(text, locale, options);
    if (parsed === null)
      return false;
    if (!Number.isNaN(parsed))
      return !allowNegative && isNegativeInput(text, locale, options);
    const trimmed = text.trim();
    const head = trimmed.slice(0, -1);
    const lastIsDigit = /\p{Nd}$/u.test(trimmed);
    const headOk = (t) => {
      const n = parseLocaleNumber(t, locale, options);
      return n === null || !Number.isNaN(n);
    };
    if (!lastIsDigit && headOk(head))
      return false;
    if (trimmed.startsWith("(") && !trimmed.includes(")") && headOk(`${trimmed})`))
      return false;
    return true;
  };
  const commit = () => {
    const text = editTextRef.current;
    const parsed = parseLocaleNumber(text, locale, options);
    let next;
    if (parsed !== null && Number.isNaN(parsed))
      next = currentRef.current;
    else if (!allowNegative && isNegativeInput(text, locale, options))
      next = clampOnBlur ? min != null ? min : 0 : currentRef.current;
    else
      next = parsed;
    if (next !== null && Object.is(next, -0))
      next = 0;
    if (next !== null && clampOnBlur)
      next = clamp(roundToPrecision(next, precision), min, max);
    setValue(next);
    return next;
  };
  const holdTimer = useRef(void 0);
  const repeatTimer = useRef(void 0);
  const stopRepeat = useCallback(() => {
    clearTimeout(holdTimer.current);
    clearInterval(repeatTimer.current);
    holdTimer.current = void 0;
    repeatTimer.current = void 0;
  }, []);
  useEffect(() => stopRepeat, [stopRepeat]);
  const stepByRef = useRef(stepBy);
  stepByRef.current = stepBy;
  const startRepeat = (direction) => {
    stopRepeat();
    if (!stepByRef.current(direction))
      return;
    holdTimer.current = setTimeout(() => {
      repeatTimer.current = setInterval(() => {
        if (!stepByRef.current(direction))
          stopRepeat();
      }, NUMBER_INPUT_REPEAT_INTERVAL_MS);
    }, NUMBER_INPUT_REPEAT_DELAY_MS);
    window.addEventListener("pointerup", stopRepeat, { once: true });
    window.addEventListener("pointercancel", stopRepeat, { once: true });
  };
  const stepperHandlers = (direction) => ({
    onPointerDown: (e) => {
      var _a2;
      if (e.button !== 0)
        return;
      e.preventDefault();
      if (document.activeElement !== inputRef.current)
        (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
      startRepeat(direction);
    },
    onPointerUp: stopRepeat,
    onPointerLeave: stopRepeat,
    onPointerCancel: stopRepeat,
    // Assistive-tech / keyboard activation (no pointer sequence): one step.
    onClick: (e) => {
      if (e.detail === 0)
        stepBy(direction);
    }
  });
  const handleFocus = (e) => {
    focusedRef.current = true;
    setFocused(true);
    if (!readOnly)
      setEdit(toEdit(currentRef.current));
    onFocus == null ? void 0 : onFocus(e);
  };
  const handleBlur = (e) => {
    stopRepeat();
    if (!readOnly && !disabled)
      commit();
    focusedRef.current = false;
    setFocused(false);
    onBlur == null ? void 0 : onBlur(e);
  };
  const handleChange = (e) => {
    if (readOnly || disabled)
      return;
    const text = e.target.value;
    setEdit(text);
    const parsed = parseLocaleNumber(text, locale, options);
    if (parsed === null)
      setValue(null);
    else if (!Number.isNaN(parsed) && !(!allowNegative && isNegativeInput(text, locale, options))) {
      setValue(Object.is(parsed, -0) ? 0 : parsed);
    }
  };
  const handleKeyDown = (e) => {
    onKeyDown == null ? void 0 : onKeyDown(e);
    if (e.defaultPrevented || disabled || readOnly)
      return;
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
        if (min !== void 0) {
          e.preventDefault();
          setValue(min);
          setEdit(toEdit(min));
        }
        break;
      case "End":
        if (max !== void 0) {
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
  const formatted = current === null ? "" : formatLocaleNumber(current, locale, options, precision);
  const shownText = focused && !readOnly ? editText : formatted;
  const affixText = (n) => typeof n === "string" || typeof n === "number" ? String(n) : "";
  const valueText = current === null ? void 0 : [affixText(prefix), formatted, affixText(suffix)].filter(Boolean).join(" ");
  const showOwnError = !field && hasContent(error);
  const announceError = useAnnounceOnChange(showOwnError ? error : null);
  const describedBy = ariaDescribedByProp != null ? ariaDescribedByProp : [field == null ? void 0 : field.describedBy, showOwnError ? errorId : void 0].filter(Boolean).join(" ") || void 0;
  const textRejected = focused && !readOnly && isRejected(editText);
  const invalid = ariaInvalidProp != null ? ariaInvalidProp : (field == null ? void 0 : field.invalid) || error === true || hasContent(error) || textRejected ? true : void 0;
  const required = ariaRequiredProp != null ? ariaRequiredProp : (field == null ? void 0 : field.required) ? true : void 0;
  const labelledBy = ariaLabelledByProp != null ? ariaLabelledByProp : void 0;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cls("ds-number-input", className),
      style,
      "data-size": size,
      "data-disabled": disabled ? "true" : void 0,
      "data-readonly": readOnly ? "true" : void 0,
      "data-invalid": invalid ? "true" : void 0,
      children: [
        !field && hasContent(label) ? /* @__PURE__ */ jsx("label", { id: labelId, htmlFor: inputId, className: "ds-number-input__label", children: label }) : null,
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "ds-number-input__field",
            onPointerDown: (e) => {
              var _a2;
              const t = e.target;
              if (disabled || t === inputRef.current || t.closest("button"))
                return;
              e.preventDefault();
              (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
            },
            children: [
              prefix != null ? /* @__PURE__ */ jsx("span", { className: "ds-number-input__affix", "data-slot": "prefix", "aria-hidden": "true", children: prefix }) : null,
              /* @__PURE__ */ jsx(
                "input",
                {
                  ...rest,
                  ref: setInputRef,
                  id: inputId,
                  type: "text",
                  inputMode: "decimal",
                  role: "spinbutton",
                  autoComplete: (_b = rest.autoComplete) != null ? _b : "off",
                  className: "ds-number-input__input",
                  value: shownText,
                  disabled,
                  readOnly,
                  "aria-readonly": readOnly || void 0,
                  "aria-valuenow": current != null ? current : void 0,
                  "aria-valuemin": min,
                  "aria-valuemax": max,
                  "aria-valuetext": valueText,
                  "aria-labelledby": labelledBy,
                  "aria-describedby": describedBy,
                  "aria-invalid": invalid,
                  "aria-required": required,
                  onFocus: handleFocus,
                  onBlur: handleBlur,
                  onChange: handleChange,
                  onKeyDown: handleKeyDown
                }
              ),
              suffix != null ? /* @__PURE__ */ jsx("span", { className: "ds-number-input__affix", "data-slot": "suffix", "aria-hidden": "true", children: suffix }) : null,
              showSteppers ? /* @__PURE__ */ jsxs("span", { className: "ds-number-input__steppers", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    tabIndex: -1,
                    className: "ds-number-input__stepper",
                    "aria-label": decrementLabel,
                    "aria-controls": inputId,
                    disabled: !canStep(-1),
                    ...stepperHandlers(-1),
                    children: /* @__PURE__ */ jsx(MinusGlyph, {})
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    tabIndex: -1,
                    className: "ds-number-input__stepper",
                    "aria-label": incrementLabel,
                    "aria-controls": inputId,
                    disabled: !canStep(1),
                    ...stepperHandlers(1),
                    children: /* @__PURE__ */ jsx(PlusGlyph, {})
                  }
                )
              ] }) : null
            ]
          }
        ),
        name ? /* @__PURE__ */ jsx("input", { type: "hidden", name, value: current != null ? current : "", disabled }) : null,
        showOwnError ? /* @__PURE__ */ jsx("p", { id: errorId, className: "ds-number-input__error", role: announceError ? "alert" : void 0, children: error }) : null
      ]
    }
  );
});
NumberInput.displayName = "NumberInput";
NumberInput[FORM_FIELD_CONSUMER_KEY] = true;
var NumberInput_default = NumberInput;

export {
  getNumberLocaleInfo,
  parseLocaleNumber,
  formatLocaleNumber,
  formatForEditing,
  stepValue,
  NumberInput,
  NumberInput_default
};
//# sourceMappingURL=chunk-UK5GSUUX.mjs.map