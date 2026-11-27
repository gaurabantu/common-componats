/* ucs:component-css */
import "./styles/components/molecules/DateRangePicker/DateRangePicker.css";
import {
  OverlayLayerContext,
  isTopLayer,
  popLayer,
  pushLayer
} from "./chunk-FPB2PMES.mjs";
import {
  FORM_FIELD_CONSUMER_KEY,
  useFormField
} from "./chunk-GJBU4OKB.mjs";

// src/components/molecules/DateRangePicker/index.tsx
import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";

// src/components/molecules/DateRangePicker/DateRangePicker.config.ts
var DATE_RANGE_PICKER_DEFAULTS = {
  numberOfMonths: 2,
  placeholder: "Select date range",
  dialogLabel: "Choose date range",
  clearLabel: "Clear dates",
  presetsLabel: "Presets",
  weekStartsOn: 0,
  clearable: false,
  disabled: false
};
var DATE_RANGE_PICKER_NARROW_QUERY = "(max-width: 640px)";
var DATE_RANGE_SEPARATOR = " \u2013 ";
var DATE_RANGE_MESSAGES = {
  start: (from) => `Start date ${from}. Select an end date.`,
  selected: (from, to) => `Selected ${from} to ${to}.`,
  preset: (label, from, to) => `${label}: ${from} to ${to}.`,
  cleared: "Dates cleared."
};

// src/components/molecules/DateRangePicker/DateRangePicker.utils.ts
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addDays(d, days) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
}
function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function startOfQuarter(d) {
  return new Date(d.getFullYear(), Math.floor(d.getMonth() / 3) * 3, 1);
}
function startOfYear(d) {
  return new Date(d.getFullYear(), 0, 1);
}
function isSameDay(a, b) {
  if (!a || !b)
    return a === b;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isSameRange(a, b) {
  return isSameDay(a == null ? void 0 : a.from, b == null ? void 0 : b.from) && isSameDay(a == null ? void 0 : a.to, b == null ? void 0 : b.to);
}
function isCompleteRange(r) {
  return Boolean((r == null ? void 0 : r.from) && (r == null ? void 0 : r.to));
}
function orderRange(a, b) {
  const x = startOfDay(a);
  const y = startOfDay(b);
  return x.getTime() <= y.getTime() ? { from: x, to: y } : { from: y, to: x };
}
function clampRange(range, min, max) {
  let { from, to } = orderRange(range.from, range.to);
  const lo = min ? startOfDay(min) : void 0;
  const hi = max ? startOfDay(max) : void 0;
  if (lo && to.getTime() < lo.getTime())
    return null;
  if (hi && from.getTime() > hi.getTime())
    return null;
  if (lo && from.getTime() < lo.getTime())
    from = lo;
  if (hi && to.getTime() > hi.getTime())
    to = hi;
  return { from, to };
}
function isOutOfBounds(d, min, max) {
  const t = startOfDay(d).getTime();
  return Boolean(min && t < startOfDay(min).getTime() || max && t > startOfDay(max).getTime());
}
function createDateFormatter(locale) {
  let fmt;
  try {
    fmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  } catch (e) {
    fmt = new Intl.DateTimeFormat(void 0, { dateStyle: "medium" });
  }
  return (d) => fmt.format(d);
}
function formatRange(range, format) {
  if (!(range == null ? void 0 : range.from) && !(range == null ? void 0 : range.to))
    return null;
  const from = range.from ? format(range.from) : "\u2026";
  const to = range.to ? format(range.to) : "\u2026";
  if (range.from && range.to && isSameDay(range.from, range.to))
    return from;
  return `${from}${DATE_RANGE_SEPARATOR}${to}`;
}
function createDefaultRangePresets(now = () => /* @__PURE__ */ new Date()) {
  const today = () => startOfDay(now());
  return [
    { label: "Today", range: () => ({ from: today(), to: today() }) },
    { label: "Last 7 days", range: () => ({ from: addDays(today(), -6), to: today() }) },
    { label: "Last 30 days", range: () => ({ from: addDays(today(), -29), to: today() }) },
    { label: "This month", range: () => ({ from: startOfMonth(today()), to: today() }) },
    { label: "This quarter", range: () => ({ from: startOfQuarter(today()), to: today() }) },
    { label: "Year to date", range: () => ({ from: startOfYear(today()), to: today() }) }
  ];
}
var DEFAULT_RANGE_PRESETS = createDefaultRangePresets();
function fromIsoDay(s) {
  const m = s ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(s) : null;
  if (!m)
    return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}
var TABBABLE = "a[href], button:not([disabled]), input:not([disabled]):not([type='hidden']), select:not([disabled]), textarea:not([disabled]), [tabindex]";
function getTabbable(container) {
  return Array.from(container.querySelectorAll(TABBABLE)).filter(
    (el) => el.tabIndex >= 0 && el.getAttribute("tabindex") !== "-1" && !el.closest("[hidden], [inert]")
  );
}

// src/components/molecules/DateRangePicker/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
function useMediaQuery(query, onChange) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(query).matches
  );
  useEffect(() => {
    var _a;
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return void 0;
    const mql = window.matchMedia(query);
    setMatches(Boolean(mql.matches));
    const handler = (e) => {
      var _a2;
      (_a2 = onChangeRef.current) == null ? void 0 : _a2.call(onChangeRef, e.matches);
      setMatches(e.matches);
    };
    if (typeof mql.addEventListener === "function")
      mql.addEventListener("change", handler);
    else
      (_a = mql.addListener) == null ? void 0 : _a.call(mql, handler);
    return () => {
      var _a2;
      if (typeof mql.removeEventListener === "function")
        mql.removeEventListener("change", handler);
      else
        (_a2 = mql.removeListener) == null ? void 0 : _a2.call(mql, handler);
    };
  }, [query]);
  return matches;
}
function safeDateTimeFormat(locale, options) {
  try {
    return new Intl.DateTimeFormat(locale, options);
  } catch (e) {
    return new Intl.DateTimeFormat(void 0, options);
  }
}
function CalendarGlyph() {
  return /* @__PURE__ */ jsxs("svg", { className: "ds-date-range-picker__icon", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ jsx("rect", { x: "3", y: "4.5", width: "14", height: "12", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M3 8.5h14M7 2.75v3.5M13 2.75v3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function ClearGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
var DateRangePicker = React.forwardRef(function DateRangePicker2({
  value: valueProp,
  defaultValue,
  onChange,
  presets,
  min,
  max,
  numberOfMonths = DATE_RANGE_PICKER_DEFAULTS.numberOfMonths,
  label,
  ariaLabel,
  placeholder = DATE_RANGE_PICKER_DEFAULTS.placeholder,
  format: formatProp,
  locale,
  weekStartsOn = DATE_RANGE_PICKER_DEFAULTS.weekStartsOn,
  clearable = DATE_RANGE_PICKER_DEFAULTS.clearable,
  disabled = DATE_RANGE_PICKER_DEFAULTS.disabled,
  error,
  dialogLabel = DATE_RANGE_PICKER_DEFAULTS.dialogLabel,
  clearLabel = DATE_RANGE_PICKER_DEFAULTS.clearLabel,
  id: idProp,
  required: requiredProp = false,
  className,
  ...restProps
}, ref) {
  var _a, _b;
  const {
    "aria-labelledby": ariaLabelledByProp,
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    // `aria-required` is not allowed on a button (axe aria-allowed-attr): dropped; "required" lives in the label.
    "aria-required": _ariaRequiredIgnored,
    ...rest
  } = restProps;
  const field = useFormField();
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const baseId = `ds-drp-${reactId}`;
  const triggerId = (_a = idProp != null ? idProp : field == null ? void 0 : field.id) != null ? _a : `${baseId}-trigger`;
  const ownLabelId = `${baseId}-label`;
  const hiddenNameId = `${baseId}-name`;
  const valueId = `${baseId}-value`;
  const dialogId = `${baseId}-dialog`;
  const errorId = `${baseId}-error`;
  const layerId = `date-range-picker-${reactId}`;
  const parentLayerId = useContext(OverlayLayerContext);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const focusInsideRef = useRef(false);
  const lastFocusDayRef = useRef(null);
  const setRootRef = useCallback(
    (node) => {
      rootRef.current = node;
      if (typeof ref === "function")
        ref(node);
      else if (ref)
        ref.current = node;
    },
    [ref]
  );
  const isControlled = valueProp !== void 0;
  const [innerValue, setInnerValue] = useState(() => defaultValue != null ? defaultValue : {});
  const current = (_b = isControlled ? valueProp : innerValue) != null ? _b : {};
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;
  const [draft, setDraft] = useState(null);
  const [hoverDay, setHoverDay] = useState(null);
  const [month, setMonth] = useState(() => {
    var _a2;
    return startOfMonth((_a2 = current.from) != null ? _a2 : /* @__PURE__ */ new Date());
  });
  const [announcement, setAnnouncement] = useState("");
  const [align, setAlign] = useState("start");
  const [autoFocusGrid, setAutoFocusGrid] = useState(false);
  const [portalContext, setPortalContext] = useState({});
  const narrow = useMediaQuery(DATE_RANGE_PICKER_NARROW_QUERY, (nowNarrow) => {
    if (!openRef.current || !nowNarrow)
      return;
    const focusedDay = fromIsoDay(lastFocusDayRef.current);
    if (focusedDay && focusInsideRef.current)
      setMonth(startOfMonth(focusedDay));
  });
  const months = narrow ? 1 : Math.max(1, Math.floor(numberOfMonths));
  const format = useMemo(() => formatProp != null ? formatProp : createDateFormatter(locale), [formatProp, locale]);
  const displayText = formatRange(current, format);
  const commit = useCallback(
    (next, message) => {
      if (!isControlled)
        setInnerValue(next);
      onChange == null ? void 0 : onChange(next);
      setAnnouncement(message);
    },
    [isControlled, onChange]
  );
  const close = useCallback((restoreFocus) => {
    var _a2;
    setOpen(false);
    setDraft(null);
    setHoverDay(null);
    setAlign("start");
    focusInsideRef.current = false;
    lastFocusDayRef.current = null;
    if (restoreFocus)
      (_a2 = triggerRef.current) == null ? void 0 : _a2.focus({ preventScroll: true });
  }, []);
  const openPopover = () => {
    var _a2;
    if (disabled)
      return;
    let anchor = startOfDay((_a2 = current.from) != null ? _a2 : /* @__PURE__ */ new Date());
    if (min && anchor.getTime() < startOfDay(min).getTime())
      anchor = startOfDay(min);
    if (max && anchor.getTime() > startOfDay(max).getTime())
      anchor = startOfDay(max);
    setMonth(startOfMonth(anchor));
    setDraft(null);
    setAutoFocusGrid(true);
    setOpen(true);
  };
  useEffect(() => {
    if (disabled && open)
      close(false);
  }, [disabled, open, close]);
  useEffect(() => {
    if (!open)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [open, layerId, parentLayerId]);
  useEffect(() => {
    if (!open)
      return void 0;
    const onKeyDown = (e) => {
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing)
        return;
      if (!isTopLayer(layerId))
        return;
      e.preventDefault();
      e.stopPropagation();
      close(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, layerId, close]);
  const refocusTimerRef = useRef(void 0);
  useEffect(() => () => clearTimeout(refocusTimerRef.current), []);
  useEffect(() => {
    if (!open)
      return void 0;
    const onPointerDown = (e) => {
      var _a2;
      const root = rootRef.current;
      if (!root || !(e.target instanceof Node) || root.contains(e.target))
        return;
      if ((_a2 = dialogRef.current) == null ? void 0 : _a2.contains(e.target))
        return;
      if (!isTopLayer(layerId))
        return;
      close(false);
      clearTimeout(refocusTimerRef.current);
      refocusTimerRef.current = setTimeout(() => {
        var _a3;
        const active = document.activeElement;
        if (!active || active === document.body)
          (_a3 = triggerRef.current) == null ? void 0 : _a3.focus({ preventScroll: true });
      }, 0);
    };
    const type = typeof window !== "undefined" && "PointerEvent" in window ? "pointerdown" : "mousedown";
    document.addEventListener(type, onPointerDown, true);
    return () => {
      document.removeEventListener(type, onPointerDown, true);
    };
  }, [open, layerId, close]);
  useLayoutEffect(() => {
    var _a2, _b2, _c, _d;
    if (!open || !narrow)
      return;
    const root = rootRef.current;
    const theme = (_b2 = (_a2 = root == null ? void 0 : root.closest("[data-theme]")) == null ? void 0 : _a2.getAttribute("data-theme")) != null ? _b2 : void 0;
    const dir = (_d = (_c = root == null ? void 0 : root.closest("[dir]")) == null ? void 0 : _c.getAttribute("dir")) != null ? _d : void 0;
    setPortalContext((prev) => prev.theme === theme && prev.dir === dir ? prev : { theme, dir });
  }, [open, narrow]);
  useLayoutEffect(() => {
    if (!open || narrow || typeof window === "undefined")
      return;
    const dialog = dialogRef.current;
    const root = rootRef.current;
    if (!dialog || !root)
      return;
    const rect = dialog.getBoundingClientRect();
    if (rect.width === 0)
      return;
    if (rect.right > window.innerWidth && root.getBoundingClientRect().right - rect.width >= 0)
      setAlign("end");
  }, [open, narrow, months]);
  useLayoutEffect(() => {
    var _a2;
    if (!open || !focusInsideRef.current)
      return;
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    const active = document.activeElement;
    if (active && active !== document.body && dialog.contains(active))
      return;
    const iso = lastFocusDayRef.current;
    const sameDay = iso ? dialog.querySelector(`[data-day="${iso}"] button`) : null;
    const tabStop = dialog.querySelector(".rdp-day_button[tabindex='0']");
    ((_a2 = sameDay != null ? sameDay : tabStop) != null ? _a2 : dialog).focus({ preventScroll: true });
  }, [months, open]);
  const pickDay = (day) => {
    if (!day || isOutOfBounds(day, min, max))
      return;
    if (!(draft == null ? void 0 : draft.from)) {
      const from = startOfDay(day);
      setDraft({ from });
      setAnnouncement(DATE_RANGE_MESSAGES.start(format(from)));
      return;
    }
    const range = orderRange(draft.from, day);
    commit(range, DATE_RANGE_MESSAGES.selected(format(range.from), format(range.to)));
    close(true);
  };
  const pickPreset = (preset) => {
    const range = clampRange(preset.range(), min, max);
    if (!range)
      return;
    commit(range, DATE_RANGE_MESSAGES.preset(preset.label, format(range.from), format(range.to)));
    close(true);
  };
  const clear = () => {
    var _a2;
    commit({}, DATE_RANGE_MESSAGES.cleared);
    (_a2 = triggerRef.current) == null ? void 0 : _a2.focus({ preventScroll: true });
  };
  const onDialogKeyDown = (e) => {
    if (e.key !== "Tab" || !dialogRef.current)
      return;
    e.stopPropagation();
    const tabbable = getTabbable(dialogRef.current);
    if (tabbable.length === 0) {
      e.preventDefault();
      dialogRef.current.focus();
      return;
    }
    const first = tabbable[0];
    const last = tabbable[tabbable.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === dialogRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };
  const intl = useMemo(
    () => ({
      caption: safeDateTimeFormat(locale, { month: "long", year: "numeric" }),
      weekdayShort: safeDateTimeFormat(locale, { weekday: "short" }),
      weekdayLong: safeDateTimeFormat(locale, { weekday: "long" }),
      dayFull: safeDateTimeFormat(locale, { dateStyle: "full" })
    }),
    [locale]
  );
  const formatters = useMemo(
    () => ({
      formatCaption: (m) => intl.caption.format(m),
      formatWeekdayName: (d) => intl.weekdayShort.format(d)
    }),
    [intl]
  );
  const draftFrom = draft == null ? void 0 : draft.from;
  const labels = useMemo(
    () => ({
      labelGrid: (m) => intl.caption.format(m),
      labelWeekday: (d) => intl.weekdayLong.format(d),
      labelNext: () => "Go to next month",
      labelPrevious: () => "Go to previous month",
      labelNav: () => "Month navigation",
      labelDayButton: (d, mods) => {
        const parts = [intl.dayFull.format(d)];
        if (mods.today)
          parts.push("today");
        if (draftFrom) {
          if (isSameDay(d, draftFrom))
            parts.push("start of range");
        } else if (mods.range_start && mods.range_end)
          parts.push("selected");
        else if (mods.range_start)
          parts.push("start of range");
        else if (mods.range_end)
          parts.push("end of range");
        else if (mods.range_middle)
          parts.push("in range");
        else if (mods.selected)
          parts.push("selected");
        return parts.join(", ");
      }
    }),
    [intl, draftFrom]
  );
  const disabledMatchers = useMemo(() => {
    const list = [];
    if (min)
      list.push({ before: startOfDay(min) });
    if (max)
      list.push({ after: startOfDay(max) });
    return list;
  }, [min, max]);
  const gridSelected = (draft == null ? void 0 : draft.from) ? { from: draft.from, to: void 0 } : current.from ? { from: current.from, to: current.to } : void 0;
  const preview = (draft == null ? void 0 : draft.from) && hoverDay && !isOutOfBounds(hoverDay, min, max) ? orderRange(draft.from, hoverDay) : null;
  const nameSourceId = ariaLabelledByProp ? void 0 : field ? field.labelId : hasContent(label) ? ownLabelId : ariaLabel ? hiddenNameId : void 0;
  const labelledBy = ariaLabelledByProp != null ? ariaLabelledByProp : nameSourceId ? `${nameSourceId} ${valueId}` : void 0;
  const showOwnError = !field && hasContent(error);
  const announceError = useAnnounceOnChange(showOwnError ? error : null);
  const describedBy = ariaDescribedByProp != null ? ariaDescribedByProp : [field == null ? void 0 : field.describedBy, showOwnError ? errorId : void 0].filter(Boolean).join(" ") || void 0;
  const invalid = ariaInvalidProp != null ? ariaInvalidProp : (field == null ? void 0 : field.invalid) || error === true || hasContent(error) ? true : void 0;
  const showClear = clearable && !disabled && Boolean(current.from || current.to);
  const renderPopover = (node) => narrow && typeof document !== "undefined" ? createPortal(node, document.body) : node;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...rest,
      ref: setRootRef,
      className: cls("ds-date-range-picker", className),
      "data-open": open ? "true" : void 0,
      "data-disabled": disabled ? "true" : void 0,
      "data-invalid": invalid ? "true" : void 0,
      children: [
        !field && hasContent(label) ? /* @__PURE__ */ jsxs("label", { id: ownLabelId, htmlFor: triggerId, className: "ds-date-range-picker__label", children: [
          label,
          requiredProp ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "ds-date-range-picker__required", "aria-hidden": "true", children: "*" }),
            /* @__PURE__ */ jsx("span", { className: "ds-date-range-picker__sr", children: " required" })
          ] }) : null
        ] }) : null,
        !field && !hasContent(label) && ariaLabel ? /* @__PURE__ */ jsxs("span", { id: hiddenNameId, hidden: true, children: [
          ariaLabel,
          requiredProp ? " required" : ""
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { className: "ds-date-range-picker__field", "data-clearable": showClear ? "true" : void 0, children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              ref: triggerRef,
              id: triggerId,
              type: "button",
              className: "ds-date-range-picker__trigger",
              "aria-haspopup": "dialog",
              "aria-expanded": open,
              "aria-controls": open ? dialogId : void 0,
              "aria-labelledby": labelledBy,
              "aria-describedby": describedBy,
              "aria-invalid": invalid,
              disabled,
              onClick: () => open ? close(true) : openPopover(),
              onKeyDown: (e) => {
                if (e.key === "ArrowDown" && !open) {
                  e.preventDefault();
                  openPopover();
                }
              },
              children: [
                /* @__PURE__ */ jsx(CalendarGlyph, {}),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    id: valueId,
                    className: "ds-date-range-picker__value",
                    "data-placeholder": displayText ? void 0 : "true",
                    children: displayText != null ? displayText : placeholder
                  }
                )
              ]
            }
          ),
          showClear ? /* @__PURE__ */ jsx("button", { type: "button", className: "ds-date-range-picker__clear", "aria-label": clearLabel, onClick: clear, children: /* @__PURE__ */ jsx(ClearGlyph, {}) }) : null,
          open ? renderPopover(
            /* @__PURE__ */ jsx(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs(
              "div",
              {
                ref: dialogRef,
                id: dialogId,
                role: "dialog",
                "aria-modal": "true",
                "aria-label": dialogLabel,
                tabIndex: -1,
                className: "ds-date-range-picker__popover",
                "data-align": align,
                "data-narrow": narrow ? "true" : void 0,
                "data-theme": narrow ? portalContext.theme : void 0,
                dir: narrow ? portalContext.dir : void 0,
                onKeyDown: onDialogKeyDown,
                onFocusCapture: (e) => {
                  var _a2;
                  focusInsideRef.current = true;
                  if (autoFocusGrid)
                    setAutoFocusGrid(false);
                  const cell = e.target instanceof Element ? e.target.closest("[data-day]") : null;
                  lastFocusDayRef.current = (_a2 = cell == null ? void 0 : cell.getAttribute("data-day")) != null ? _a2 : null;
                },
                onBlurCapture: (e) => {
                  const next = e.relatedTarget;
                  if (next instanceof Node && dialogRef.current && !dialogRef.current.contains(next)) {
                    focusInsideRef.current = false;
                  }
                },
                children: [
                  (presets == null ? void 0 : presets.length) ? /* @__PURE__ */ jsx(
                    "div",
                    {
                      role: "group",
                      "aria-label": DATE_RANGE_PICKER_DEFAULTS.presetsLabel,
                      className: "ds-date-range-picker__presets",
                      children: presets.map((preset) => {
                        const range = clampRange(preset.range(), min, max);
                        const active = Boolean(range && isCompleteRange(current) && isSameRange(range, current));
                        return /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            className: "ds-date-range-picker__preset",
                            "aria-pressed": active,
                            disabled: !range,
                            onClick: () => pickPreset(preset),
                            children: preset.label
                          },
                          preset.label
                        );
                      })
                    }
                  ) : null,
                  /* @__PURE__ */ jsx(
                    DayPicker,
                    {
                      mode: "range",
                      className: "ds-date-range-picker__calendar",
                      autoFocus: autoFocusGrid,
                      lang: locale,
                      numberOfMonths: months,
                      month,
                      onMonthChange: setMonth,
                      startMonth: min ? startOfMonth(min) : void 0,
                      endMonth: max ? startOfMonth(max) : void 0,
                      weekStartsOn,
                      disabled: disabledMatchers,
                      selected: gridSelected,
                      onSelect: (_range, triggerDate) => pickDay(triggerDate),
                      onDayMouseEnter: (d) => setHoverDay(d),
                      onDayFocus: (d) => setHoverDay(d),
                      modifiers: { preview: preview != null ? preview : [] },
                      modifiersClassNames: { preview: "ds-date-range-picker__day--preview" },
                      formatters,
                      labels
                    }
                  )
                ]
              }
            ) })
          ) : null
        ] }),
        showOwnError ? /* @__PURE__ */ jsx("p", { id: errorId, className: "ds-date-range-picker__error", role: announceError ? "alert" : void 0, children: error }) : null,
        /* @__PURE__ */ jsx("span", { className: "ds-date-range-picker__sr", "aria-live": "polite", "aria-atomic": "true", children: announcement })
      ]
    }
  );
});
DateRangePicker.displayName = "DateRangePicker";
DateRangePicker[FORM_FIELD_CONSUMER_KEY] = true;
var DateRangePicker_default = DateRangePicker;

export {
  createDefaultRangePresets,
  DEFAULT_RANGE_PRESETS,
  DateRangePicker,
  DateRangePicker_default
};
//# sourceMappingURL=chunk-KUPKQRR6.mjs.map