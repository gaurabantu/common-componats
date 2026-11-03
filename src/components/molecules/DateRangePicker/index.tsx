"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { DayPicker, type Matcher, type Modifiers } from "react-day-picker";
import { useFormField } from "../FormField";
import { FORM_FIELD_CONSUMER_KEY } from "../FormField/FormField.config";
import { OverlayLayerContext, isTopLayer, popLayer, pushLayer } from "../Modal/overlayStack";
import {
  DATE_RANGE_MESSAGES,
  DATE_RANGE_PICKER_DEFAULTS,
  DATE_RANGE_PICKER_NARROW_QUERY,
} from "./DateRangePicker.config";
import {
  clampRange,
  createDateFormatter,
  formatRange,
  fromIsoDay,
  getTabbable,
  isCompleteRange,
  isOutOfBounds,
  isSameDay,
  isSameRange,
  orderRange,
  startOfDay,
  startOfMonth,
} from "./DateRangePicker.utils";
import type { DateRange, DateRangePickerProps, DateRangePreset } from "./DateRangePicker.types";
import "./DateRangePicker.css";

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

function hasContent(node: React.ReactNode): boolean {
  return node !== undefined && node !== null && node !== false && node !== "" && node !== true;
}

/** Latching "changed since first render" flag (same rule as FormField): errors present on load are not announced. */
function useAnnounceOnChange(value: unknown): boolean {
  const initial = useRef(value);
  const changed = useRef(false);
  if (!changed.current && value !== initial.current) changed.current = true;
  return changed.current;
}

function useMediaQuery(query: string, onChange?: (matches: boolean) => void): boolean {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;
    const mql = window.matchMedia(query);
    setMatches(Boolean(mql.matches));
    const handler = (e: MediaQueryListEvent) => {
      onChangeRef.current?.(e.matches);
      setMatches(e.matches);
    };
    if (typeof mql.addEventListener === "function") mql.addEventListener("change", handler);
    else mql.addListener?.(handler);
    return () => {
      if (typeof mql.removeEventListener === "function") mql.removeEventListener("change", handler);
      else mql.removeListener?.(handler);
    };
  }, [query]);
  return matches;
}

function safeDateTimeFormat(locale: string | undefined, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  try {
    return new Intl.DateTimeFormat(locale, options);
  } catch {
    return new Intl.DateTimeFormat(undefined, options);
  }
}

function CalendarGlyph() {
  return (
    <svg className="ds-date-range-picker__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <rect x="3" y="4.5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8.5h14M7 2.75v3.5M13 2.75v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClearGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/**
 * DateRangePicker — button trigger showing the formatted range, opening a popover dialog with
 * optional presets and a react-day-picker range grid (APG date-grid keyboard: arrows, Home/End,
 * PageUp/PageDown, Shift+PageUp/PageDown). First click sets the start, second click completes the
 * range, fires `onChange` and closes; focus always returns to the trigger. Works inside `FormField`.
 *
 * Layout: on desktop the popover renders in-tree under the trigger — avoid `overflow: hidden` ancestors,
 * which clip it (portalling on desktop is a follow-up). At ≤ 640px it is portalled to `<body>` and docked
 * to the viewport bottom, so transformed ancestors (Drawer / Sheet panels) do not reposition it.
 */
export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(function DateRangePicker(
  {
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
  },
  ref,
) {
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
  const triggerId = idProp ?? field?.id ?? `${baseId}-trigger`;
  const ownLabelId = `${baseId}-label`;
  const hiddenNameId = `${baseId}-name`;
  const valueId = `${baseId}-value`;
  const dialogId = `${baseId}-dialog`;
  const errorId = `${baseId}-error`;
  const layerId = `date-range-picker-${reactId}`;
  const parentLayerId = useContext(OverlayLayerContext);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const focusInsideRef = useRef(false);
  const lastFocusDayRef = useRef<string | null>(null);

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<DateRange>(() => defaultValue ?? {});
  const current: DateRange = (isControlled ? valueProp : innerValue) ?? {};

  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;
  const [draft, setDraft] = useState<DateRange | null>(null);
  const [hoverDay, setHoverDay] = useState<Date | null>(null);
  const [month, setMonth] = useState<Date>(() => startOfMonth(current.from ?? new Date()));
  const [announcement, setAnnouncement] = useState("");
  const [align, setAlign] = useState<"start" | "end">("start");
  /** True from opening until a day first takes focus — a grid remount (portal ↔ in-tree) must not re-autofocus. */
  const [autoFocusGrid, setAutoFocusGrid] = useState(false);
  /** Theme / direction of the trigger's subtree, copied onto the portalled popover. */
  const [portalContext, setPortalContext] = useState<{ theme?: string; dir?: string }>({});

  // ≤ 640px → one month. When the switch drops the month that holds focus, show that month instead.
  const narrow = useMediaQuery(DATE_RANGE_PICKER_NARROW_QUERY, (nowNarrow) => {
    if (!openRef.current || !nowNarrow) return;
    const focusedDay = fromIsoDay(lastFocusDayRef.current);
    if (focusedDay && focusInsideRef.current) setMonth(startOfMonth(focusedDay));
  });
  const months = narrow ? 1 : Math.max(1, Math.floor(numberOfMonths));

  const format = useMemo(() => formatProp ?? createDateFormatter(locale), [formatProp, locale]);
  const displayText = formatRange(current, format);

  const commit = useCallback(
    (next: DateRange, message: string) => {
      if (!isControlled) setInnerValue(next);
      onChange?.(next);
      setAnnouncement(message);
    },
    [isControlled, onChange],
  );

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    setDraft(null);
    setHoverDay(null);
    setAlign("start");
    focusInsideRef.current = false;
    lastFocusDayRef.current = null;
    // Focus the trigger while the dialog is still mounted, so focus never falls back to <body>.
    if (restoreFocus) triggerRef.current?.focus({ preventScroll: true });
  }, []);

  const openPopover = () => {
    if (disabled) return;
    let anchor = startOfDay(current.from ?? new Date());
    if (min && anchor.getTime() < startOfDay(min).getTime()) anchor = startOfDay(min);
    if (max && anchor.getTime() > startOfDay(max).getTime()) anchor = startOfDay(max);
    setMonth(startOfMonth(anchor));
    setDraft(null);
    setAutoFocusGrid(true);
    setOpen(true);
  };

  // A disabled picker cannot stay open.
  useEffect(() => {
    if (disabled && open) close(false);
  }, [disabled, open, close]);

  // Shared overlay stack: while open this is the top layer, so an enclosing Modal / Drawer ignores Escape.
  useEffect(() => {
    if (!open) return undefined;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [open, layerId, parentLayerId]);

  // Escape closes (top layer only) and returns focus to the trigger.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing) return;
      if (!isTopLayer(layerId)) return;
      e.preventDefault();
      e.stopPropagation();
      close(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, layerId, close]);

  // Pointer down outside closes. Focus goes where the user clicked; if that leaves nothing focused, back to the trigger.
  const refocusTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(refocusTimerRef.current), []);
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e: PointerEvent | MouseEvent) => {
      const root = rootRef.current;
      if (!root || !(e.target instanceof Node) || root.contains(e.target)) return;
      if (dialogRef.current?.contains(e.target)) return;
      if (!isTopLayer(layerId)) return;
      close(false);
      // Runs after the browser's mousedown focus step; survives this effect's cleanup (open → false).
      clearTimeout(refocusTimerRef.current);
      refocusTimerRef.current = setTimeout(() => {
        const active = document.activeElement;
        if (!active || active === document.body) triggerRef.current?.focus({ preventScroll: true });
      }, 0);
    };
    const type = typeof window !== "undefined" && "PointerEvent" in window ? "pointerdown" : "mousedown";
    document.addEventListener(type, onPointerDown as EventListener, true);
    return () => {
      document.removeEventListener(type, onPointerDown as EventListener, true);
    };
  }, [open, layerId, close]);

  // Copy theme / dir onto the portalled popover so tokens resolve as in the trigger's subtree.
  useLayoutEffect(() => {
    if (!open || !narrow) return;
    const root = rootRef.current;
    const theme = root?.closest("[data-theme]")?.getAttribute("data-theme") ?? undefined;
    const dir = root?.closest("[dir]")?.getAttribute("dir") ?? undefined;
    setPortalContext((prev) => (prev.theme === theme && prev.dir === dir ? prev : { theme, dir }));
  }, [open, narrow]);

  // Keep the popover inside the viewport horizontally (desktop); narrow screens dock it via CSS.
  useLayoutEffect(() => {
    if (!open || narrow || typeof window === "undefined") return;
    const dialog = dialogRef.current;
    const root = rootRef.current;
    if (!dialog || !root) return;
    const rect = dialog.getBoundingClientRect();
    if (rect.width === 0) return;
    if (rect.right > window.innerWidth && root.getBoundingClientRect().right - rect.width >= 0) setAlign("end");
  }, [open, narrow, months]);

  // Responsive switch (2 ↔ 1 month) can unmount the focused day: put focus back on the same day,
  // else the grid's tab stop, else the dialog — never <body>.
  useLayoutEffect(() => {
    if (!open || !focusInsideRef.current) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const active = document.activeElement;
    if (active && active !== document.body && dialog.contains(active)) return;
    const iso = lastFocusDayRef.current;
    const sameDay = iso ? dialog.querySelector<HTMLElement>(`[data-day="${iso}"] button`) : null;
    const tabStop = dialog.querySelector<HTMLElement>(".rdp-day_button[tabindex='0']");
    (sameDay ?? tabStop ?? dialog).focus({ preventScroll: true });
  }, [months, open]);

  const pickDay = (day: Date | undefined) => {
    if (!day || isOutOfBounds(day, min, max)) return;
    if (!draft?.from) {
      const from = startOfDay(day);
      setDraft({ from });
      setAnnouncement(DATE_RANGE_MESSAGES.start(format(from)));
      return;
    }
    const range = orderRange(draft.from, day);
    commit(range, DATE_RANGE_MESSAGES.selected(format(range.from), format(range.to)));
    close(true);
  };

  const pickPreset = (preset: DateRangePreset) => {
    const range = clampRange(preset.range(), min, max);
    if (!range) return;
    commit(range, DATE_RANGE_MESSAGES.preset(preset.label, format(range.from), format(range.to)));
    close(true);
  };

  const clear = () => {
    commit({}, DATE_RANGE_MESSAGES.cleared);
    // The clear button unmounts once the range is empty — move focus first.
    triggerRef.current?.focus({ preventScroll: true });
  };

  const onDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    // The dialog owns Tab. When portalled (narrow), an enclosing Drawer's panel trap would otherwise
    // receive the bubbled React event and pull focus back into the panel.
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

  // ---- react-day-picker wiring (localised captions / labels) ----
  const intl = useMemo(
    () => ({
      caption: safeDateTimeFormat(locale, { month: "long", year: "numeric" }),
      weekdayShort: safeDateTimeFormat(locale, { weekday: "short" }),
      weekdayLong: safeDateTimeFormat(locale, { weekday: "long" }),
      dayFull: safeDateTimeFormat(locale, { dateStyle: "full" }),
    }),
    [locale],
  );

  const formatters = useMemo(
    () => ({
      formatCaption: (m: Date) => intl.caption.format(m),
      formatWeekdayName: (d: Date) => intl.weekdayShort.format(d),
    }),
    [intl],
  );

  const draftFrom = draft?.from;
  const labels = useMemo(
    () => ({
      labelGrid: (m: Date) => intl.caption.format(m),
      labelWeekday: (d: Date) => intl.weekdayLong.format(d),
      labelNext: () => "Go to next month",
      labelPrevious: () => "Go to previous month",
      labelNav: () => "Month navigation",
      labelDayButton: (d: Date, mods: Modifiers) => {
        const parts = [intl.dayFull.format(d)];
        if (mods.today) parts.push("today");
        if (draftFrom) {
          if (isSameDay(d, draftFrom)) parts.push("start of range");
        } else if (mods.range_start && mods.range_end) parts.push("selected");
        else if (mods.range_start) parts.push("start of range");
        else if (mods.range_end) parts.push("end of range");
        else if (mods.range_middle) parts.push("in range");
        else if (mods.selected) parts.push("selected");
        return parts.join(", ");
      },
    }),
    [intl, draftFrom],
  );

  const disabledMatchers = useMemo(() => {
    const list: Matcher[] = [];
    if (min) list.push({ before: startOfDay(min) });
    if (max) list.push({ after: startOfDay(max) });
    return list;
  }, [min, max]);

  const gridSelected = draft?.from
    ? { from: draft.from, to: undefined }
    : current.from
      ? { from: current.from, to: current.to }
      : undefined;

  const preview = draft?.from && hoverDay && !isOutOfBounds(hoverDay, min, max) ? orderRange(draft.from, hoverDay) : null;

  // ---- ARIA wiring (explicit props win over FormField) ----
  const nameSourceId = ariaLabelledByProp
    ? undefined
    : field
      ? field.labelId
      : hasContent(label)
        ? ownLabelId
        : ariaLabel
          ? hiddenNameId
          : undefined;
  const labelledBy = ariaLabelledByProp ?? (nameSourceId ? `${nameSourceId} ${valueId}` : undefined);
  const showOwnError = !field && hasContent(error);
  const announceError = useAnnounceOnChange(showOwnError ? error : null);
  const describedBy =
    ariaDescribedByProp ?? ([field?.describedBy, showOwnError ? errorId : undefined].filter(Boolean).join(" ") || undefined);
  const invalid = ariaInvalidProp ?? (field?.invalid || error === true || hasContent(error) ? true : undefined);
  const showClear = clearable && !disabled && Boolean(current.from || current.to);

  /*
   * ≤ 640px the popover docks to the viewport bottom. It is portalled to <body> there, because a
   * transformed ancestor (Drawer / Sheet panels keep `transform` after their open animation) would
   * otherwise become the containing block of `position: fixed`. React events and focus ownership
   * still flow through the component tree, so an enclosing Drawer treats it as its own content.
   * Desktop stays in-tree (anchored under the trigger).
   */
  const renderPopover = (node: React.ReactElement) =>
    narrow && typeof document !== "undefined" ? createPortal(node, document.body) : node;

  return (
    <div
      {...rest}
      ref={setRootRef}
      className={cls("ds-date-range-picker", className)}
      data-open={open ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
    >
      {!field && hasContent(label) ? (
        <label id={ownLabelId} htmlFor={triggerId} className="ds-date-range-picker__label">
          {label}
          {requiredProp ? (
            <>
              <span className="ds-date-range-picker__required" aria-hidden="true">
                *
              </span>
              <span className="ds-date-range-picker__sr"> required</span>
            </>
          ) : null}
        </label>
      ) : null}
      {!field && !hasContent(label) && ariaLabel ? (
        <span id={hiddenNameId} hidden>
          {ariaLabel}
          {requiredProp ? " required" : ""}
        </span>
      ) : null}
      <div className="ds-date-range-picker__field" data-clearable={showClear ? "true" : undefined}>
        <button
          ref={triggerRef}
          id={triggerId}
          type="button"
          className="ds-date-range-picker__trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? dialogId : undefined}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          disabled={disabled}
          onClick={() => (open ? close(true) : openPopover())}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && !open) {
              e.preventDefault();
              openPopover();
            }
          }}
        >
          <CalendarGlyph />
          <span
            id={valueId}
            className="ds-date-range-picker__value"
            data-placeholder={displayText ? undefined : "true"}
          >
            {displayText ?? placeholder}
          </span>
        </button>
        {showClear ? (
          <button type="button" className="ds-date-range-picker__clear" aria-label={clearLabel} onClick={clear}>
            <ClearGlyph />
          </button>
        ) : null}

        {open ? renderPopover(
          <OverlayLayerContext.Provider value={layerId}>
            <div
              ref={dialogRef}
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label={dialogLabel}
              tabIndex={-1}
              className="ds-date-range-picker__popover"
              data-align={align}
              data-narrow={narrow ? "true" : undefined}
              data-theme={narrow ? portalContext.theme : undefined}
              dir={narrow ? portalContext.dir : undefined}
              onKeyDown={onDialogKeyDown}
              onFocusCapture={(e) => {
                focusInsideRef.current = true;
                if (autoFocusGrid) setAutoFocusGrid(false);
                const cell = e.target instanceof Element ? e.target.closest("[data-day]") : null;
                lastFocusDayRef.current = cell?.getAttribute("data-day") ?? null;
              }}
              onBlurCapture={(e) => {
                const next = e.relatedTarget;
                if (next instanceof Node && dialogRef.current && !dialogRef.current.contains(next)) {
                  focusInsideRef.current = false;
                }
              }}
            >
              {presets?.length ? (
                <div
                  role="group"
                  aria-label={DATE_RANGE_PICKER_DEFAULTS.presetsLabel}
                  className="ds-date-range-picker__presets"
                >
                  {presets.map((preset) => {
                    const range = clampRange(preset.range(), min, max);
                    const active = Boolean(range && isCompleteRange(current) && isSameRange(range, current));
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        className="ds-date-range-picker__preset"
                        aria-pressed={active}
                        disabled={!range}
                        onClick={() => pickPreset(preset)}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
              <DayPicker
                mode="range"
                className="ds-date-range-picker__calendar"
                autoFocus={autoFocusGrid}
                lang={locale}
                numberOfMonths={months}
                month={month}
                onMonthChange={setMonth}
                startMonth={min ? startOfMonth(min) : undefined}
                endMonth={max ? startOfMonth(max) : undefined}
                weekStartsOn={weekStartsOn}
                disabled={disabledMatchers}
                selected={gridSelected}
                onSelect={(_range, triggerDate) => pickDay(triggerDate)}
                onDayMouseEnter={(d) => setHoverDay(d)}
                onDayFocus={(d) => setHoverDay(d)}
                modifiers={{ preview: preview ?? [] }}
                modifiersClassNames={{ preview: "ds-date-range-picker__day--preview" }}
                formatters={formatters}
                labels={labels}
              />
            </div>
          </OverlayLayerContext.Provider>,
        ) : null}
      </div>
      {showOwnError ? (
        <p id={errorId} className="ds-date-range-picker__error" role={announceError ? "alert" : undefined}>
          {error}
        </p>
      ) : null}
      <span className="ds-date-range-picker__sr" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </div>
  );
});

DateRangePicker.displayName = "DateRangePicker";
/** Tells FormField this control wires itself via `useFormField()` (no cloneElement injection). */
(DateRangePicker as unknown as Record<string, unknown>)[FORM_FIELD_CONSUMER_KEY] = true;

export default DateRangePicker;
export { DEFAULT_RANGE_PRESETS, createDefaultRangePresets } from "./DateRangePicker.utils";
export type {
  DateRange,
  CompleteDateRange,
  DateRangePreset,
  DateRangePickerProps,
  DateRangeWeekStart,
} from "./DateRangePicker.types";
