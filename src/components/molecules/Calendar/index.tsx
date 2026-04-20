"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { CalendarProps } from "./Calendar.types";
import {
  defaultCalendarOptions,
  getElevationShadow,
  getResolvedTheme,
  resolveElevation,
  themeToCssVars,
} from "./Calendar.config";
import "./Calendar.css";
import {
  addMonths,
  getCalendarDaysWithFirstDay,
  getMonthOptions,
  getWeekdayLabels,
  getWeekNumber,
  getYearOptions,
  isAfterDay,
  isBeforeDay,
  isBetweenDays,
  isSameDay,
  startOfMonth,
} from "./Calendar.utils";
import { parseDate } from "../../atoms/DatePicker/DatePicker.utils";

function ChevronLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Calendar: React.FC<CalendarProps> = ({
  month: monthProp,
  hideNavigation = false,
  captionLayout = "dropdown",
  value,
  onChange,
  defaultValue,
  minDate,
  maxDate,
  disabled = false,
  readOnly = false,
  showWeekNumbers = defaultCalendarOptions.showWeekNumbers,
  fullWidth = defaultCalendarOptions.fullWidth,
  className = "",
  dateCellRender,
  onMonthChange,
  onYearChange,
  firstDayOfWeek = defaultCalendarOptions.firstDayOfWeek,
  mode = defaultCalendarOptions.mode,
  rangeValue,
  onRangeChange,
  disabledDate,
  animation = defaultCalendarOptions.animation,
  cellHoverAnimation = defaultCalendarOptions.cellHoverAnimation,
  variant = defaultCalendarOptions.variant,
  elevation: elevationProp,
  bordered = defaultCalendarOptions.bordered,
  hoverable = defaultCalendarOptions.hoverable,
  radius,
  size = defaultCalendarOptions.size,
  theme: themeProp,
  style: styleProp,
  styles: stylesProp,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const resolvedElevation = resolveElevation(elevationProp, variant);
  const boxShadow = themeProp?.boxShadow ?? (hoverable && isHovered ? getElevationShadow("lg") : getElevationShadow(resolvedElevation));
  const theme = useMemo(
    () => getResolvedTheme(themeProp, size),
    [themeProp, size]
  );
  const cssVars = useMemo(() => themeToCssVars(theme), [theme]);
  const isControlled = value !== undefined;
  const isRangeControlled = rangeValue !== undefined;

  const minParsed = useMemo(() => {
    if (!minDate) return null;
    if (minDate instanceof Date) return minDate;
    return parseDate(minDate, "YYYY-MM-DD") ?? parseDate(minDate, "MM/DD/YYYY");
  }, [minDate]);
  const maxParsed = useMemo(() => {
    if (!maxDate) return null;
    if (maxDate instanceof Date) return maxDate;
    return parseDate(maxDate, "YYYY-MM-DD") ?? parseDate(maxDate, "MM/DD/YYYY");
  }, [maxDate]);

  const [internalValue, setInternalValue] = useState<Date | null>(
    defaultValue ?? null
  );
  const [internalRange, setInternalRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const selectedDate = isControlled ? value : internalValue;
  const selectedRange = isRangeControlled ? rangeValue! : internalRange;

  const isMonthControlled = monthProp !== undefined;

  const [internalMonth, setInternalMonth] = useState<Date>(() =>
    startOfMonth(
      monthProp ||
        selectedDate ||
        selectedRange[0] ||
        selectedRange[1] ||
        new Date()
    )
  );

  const visibleMonth = isMonthControlled ? startOfMonth(monthProp) : internalMonth;

  const goToMonth = (next: Date) => {
    const m = startOfMonth(next);
    if (!isMonthControlled) {
      setInternalMonth(m);
    }
    onMonthChange?.(m);
  };

  useEffect(() => {
    if (isMonthControlled) return;
    const anchor = selectedDate || selectedRange[0] || selectedRange[1] || new Date();
    setInternalMonth(startOfMonth(anchor));
  }, [isMonthControlled, selectedDate, selectedRange[0], selectedRange[1]]);

  const calendarDays = useMemo(
    () => getCalendarDaysWithFirstDay(visibleMonth, firstDayOfWeek),
    [visibleMonth, firstDayOfWeek]
  );

  const weekdayLabels = useMemo(
    () => getWeekdayLabels(firstDayOfWeek),
    [firstDayOfWeek]
  );

  const monthOptions = getMonthOptions();
  const centerYear = visibleMonth.getFullYear();
  const yearOptions = getYearOptions(centerYear);

  const isDisabledDate = (date: Date): boolean => {
    if (disabled || readOnly) return false;
    if (minParsed && isBeforeDay(date, minParsed)) return true;
    if (maxParsed && isAfterDay(date, maxParsed)) return true;
    if (disabledDate?.(date)) return true;
    return false;
  };

  const handleDateSelect = (date: Date) => {
    if (isDisabledDate(date)) return;
    if (readOnly || disabled) return;

    if (mode === "single") {
      const next = date;
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
      return;
    }

    // Range mode
    const [start, end] = selectedRange;
    if (!start || (start && end)) {
      const next: [Date | null, Date | null] = [date, null];
      if (!isRangeControlled) setInternalRange(next);
      onRangeChange?.(next);
    } else if (isBeforeDay(date, start)) {
      const next: [Date | null, Date | null] = [date, start];
      if (!isRangeControlled) setInternalRange(next);
      onRangeChange?.(next);
    } else {
      const next: [Date | null, Date | null] = [start, date];
      if (!isRangeControlled) setInternalRange(next);
      onRangeChange?.(next);
    }
  };

  const handleMonthChange = (monthIndex: number) => {
    isInitialMountRef.current = false;
    const next = new Date(visibleMonth.getFullYear(), monthIndex, 1);
    slideDirectionRef.current = next.getTime() > visibleMonth.getTime() ? "next" : "prev";
    goToMonth(next);
  };

  const handleYearChange = (year: number) => {
    isInitialMountRef.current = false;
    const next = new Date(year, visibleMonth.getMonth(), 1);
    slideDirectionRef.current = next.getTime() > visibleMonth.getTime() ? "next" : "prev";
    goToMonth(next);
    onYearChange?.(next);
  };

  const slideDirectionRef = useRef<"prev" | "next">("next");
  const isInitialMountRef = useRef(true);

  const handlePrevMonth = () => {
    isInitialMountRef.current = false;
    slideDirectionRef.current = "prev";
    goToMonth(addMonths(visibleMonth, -1));
  };

  const handleNextMonth = () => {
    isInitialMountRef.current = false;
    slideDirectionRef.current = "next";
    goToMonth(addMonths(visibleMonth, 1));
  };

  const today = new Date();
  const [rangeStart, rangeEnd] = selectedRange;

  const animClass =
    animation === "none" || isInitialMountRef.current
      ? ""
      : animation === "slide"
        ? slideDirectionRef.current === "prev"
          ? "calendar-anim-slide-prev"
          : "calendar-anim-slide-next"
        : animation === "fade"
          ? "calendar-anim-fade"
          : animation === "scale"
            ? "calendar-anim-scale"
            : "";

  const resolvedRadius = radius !== undefined
    ? (typeof radius === "number" ? `${radius}px` : radius)
    : (theme.borderRadius ?? 16);
  const resolvedBackground =
    variant === "filled"
      ? "var(--color-bg-page, #F3F4F6)"
      : (theme.background ?? "var(--color-bg-surface, #FFFFFF)");

  const containerStyle: React.CSSProperties = {
    ...cssVars,
    width: fullWidth ? "100%" : "auto",
    maxWidth: theme.maxWidth ?? 336,
    padding: theme.padding ?? 20,
    borderRadius: resolvedRadius,
    border: bordered ? `1px solid ${theme.border ?? "rgba(153, 153, 153, 0.3)"}` : "1px solid transparent",
    background: resolvedBackground,
    boxShadow: theme.boxShadow ?? boxShadow,
    fontFamily: theme.fontFamily,
    overflow: "hidden",
    transition: "box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease",
    transform: hoverable && isHovered ? "translateY(-2px)" : "translateY(0)",
    ...stylesProp?.root,
    ...styleProp,
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 8,
    ...stylesProp?.header,
  };

  const navButtonStyle: React.CSSProperties = {
    width: theme.navButtonSize ?? 36,
    height: theme.navButtonSize ?? 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: theme.cellRadius ?? 10,
    background: "transparent",
    color: theme.text ?? "var(--color-text-primary, #0D0D0D)",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 20,
    fontWeight: 500,
    ...stylesProp?.navButton,
  };

  const selectStyle: React.CSSProperties = {
    flex: 1,
    padding: "8px 12px",
    border: `1px solid ${theme.selectBorder ?? "rgba(0,0,0,0.1)"}`,
    borderRadius: theme.cellRadius ?? 10,
    fontSize: theme.cellFontSize ?? 14,
    fontWeight: 600,
    color: theme.text ?? "var(--color-text-primary, #0D0D0D)",
    backgroundColor: theme.background ?? "var(--color-bg-surface, #FFFFFF)",
    cursor: disabled ? "not-allowed" : "pointer",
    ...stylesProp?.select,
  };

  const gridGap = theme.gap ?? 6;
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: showWeekNumbers
      ? "28px repeat(7, minmax(0, 1fr))"
      : "repeat(7, minmax(0, 1fr))",
    gap: gridGap,
  };

  const weekdayGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: showWeekNumbers
      ? "28px repeat(7, minmax(0, 1fr))"
      : "repeat(7, minmax(0, 1fr))",
    gap: gridGap,
  };

  const weekdayHeaderStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: theme.weekdayFontSize ?? 11,
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    color: theme.textSecondary ?? "var(--color-text-secondary, #6B7280)",
    padding: "10px 0",
    ...stylesProp?.weekday,
  };

  const cellBaseStyle: React.CSSProperties = {
    minHeight: "var(--cell-size, 2.25rem)",
    width: "var(--cell-size, 2.25rem)",
    minWidth: "var(--cell-size, 2.25rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: theme.cellRadius ?? 10,
    fontSize: theme.cellFontSize ?? 14,
    cursor: "default",
    ...stylesProp?.cell,
  };

  const captionLabel = visibleMonth.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className={`calendar-root calendar-root--variant-${variant} ${captionLayout === "label" ? "calendar-root--caption-label" : ""} ${className}`.trim()}
      style={containerStyle}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
    >
      {/* Header: prev | caption | next — or month/year dropdowns */}
      {!hideNavigation && (
      <div style={headerStyle}>
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={disabled}
          style={navButtonStyle}
          className="calendar-nav-btn"
          aria-label="Previous month"
        >
          <ChevronLeft />
        </button>
        {captionLayout === "label" ? (
          <div
            className="calendar-caption-label"
            style={{
              flex: 1,
              minWidth: 0,
              textAlign: "center",
              fontSize: theme.cellFontSize ?? 14,
              fontWeight: 600,
              color: theme.text ?? "var(--color-text-primary, #0D0D0D)",
            }}
          >
            {captionLabel}
          </div>
        ) : (
        <div style={{ display: "flex", gap: 8, flex: 1, minWidth: 0 }}>
          <select
            value={visibleMonth.getMonth()}
            onChange={(e) => handleMonthChange(parseInt(e.target.value, 10))}
            disabled={disabled}
            style={selectStyle}
            className="calendar-select"
            aria-label="Select month"
          >
            {monthOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={visibleMonth.getFullYear()}
            onChange={(e) => handleYearChange(parseInt(e.target.value, 10))}
            disabled={disabled}
            style={selectStyle}
            className="calendar-select"
            aria-label="Select year"
          >
            {yearOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        )}
        <button
          type="button"
          onClick={handleNextMonth}
          disabled={disabled}
          style={navButtonStyle}
          className="calendar-nav-btn"
          aria-label="Next month"
        >
          <ChevronRight />
        </button>
      </div>
      )}

      {/* Weekday headers */}
      <div style={weekdayGridStyle}>
        {showWeekNumbers && (
          <div style={weekdayHeaderStyle} aria-hidden="true">
            #
          </div>
        )}
        {weekdayLabels.map((label) => (
          <div key={label} style={weekdayHeaderStyle}>
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid - 6 rows of 7 days. With week numbers: prepend week number per row */}
      <div
        key={visibleMonth.getFullYear() + "-" + visibleMonth.getMonth()}
        className={animClass}
      >
      {Array.from({ length: 6 }, (_, rowIdx) => {
        const rowDays = calendarDays.slice(rowIdx * 7, (rowIdx + 1) * 7);
        const firstDayOfRow = rowDays[0];
        const weekNum = firstDayOfRow ? getWeekNumber(firstDayOfRow.date) : null;

        return (
          <div key={rowIdx} style={gridStyle}>
            {showWeekNumbers && (
              <div
                style={{
                  ...cellBaseStyle,
                  fontSize: theme.weekdayFontSize ?? 11,
                  color: theme.textSecondary ?? "var(--color-text-secondary, #757575)",
                }}
              >
                {weekNum}
              </div>
            )}
            {rowDays.map((day) => {
          const isSelected =
            mode === "single"
              ? isSameDay(day.date, selectedDate)
              : isSameDay(day.date, rangeStart) ||
                isSameDay(day.date, rangeEnd);
          const isInRange =
            mode === "range" &&
            rangeStart &&
            rangeEnd &&
            isBetweenDays(day.date, rangeStart, rangeEnd);
          const isToday = isSameDay(day.date, today);
          const isDisabled = isDisabledDate(day.date);
          const isSelectable = !disabled && !readOnly && !isDisabled;

          const cellStyle: React.CSSProperties = {
            ...cellBaseStyle,
            cursor: isSelectable ? "pointer" : "default",
            color: isDisabled
              ? (theme.textDisabled ?? "#B0B0B0")
              : !day.inCurrentMonth
                ? (theme.textSecondary ?? "#9CA3AF")
                : isSelected
                  ? (theme.primaryText ?? "#FFFFFF")
                  : (theme.text ?? "var(--color-text-primary, #0D0D0D)"),
            background: isSelected
              ? (theme.primary ?? "var(--button-primary-default-bg, #2563EB)")
              : isInRange
                ? (theme.rangeBackground ?? "var(--color-accent-sky-10, #E6F2FF)")
                : isToday
                  ? (theme.todayBackground ?? "var(--color-accent-amber-10, #FFF6DD)")
                  : "transparent",
            fontWeight: isSelected ? 700 : isToday ? 600 : 500,
            boxShadow: isToday && !isSelected
              ? `inset 0 0 0 2px ${theme.todayRing ?? "rgba(245, 158, 11, 0.5)"}`
              : undefined,
          };

              return (
                <button
                  key={day.date.toISOString()}
                  type="button"
                  onClick={() => handleDateSelect(day.date)}
                  disabled={isDisabled}
                  style={cellStyle}
                  className={`calendar-cell ${!day.inCurrentMonth ? "calendar-cell--outside" : ""} ${isSelectable && cellHoverAnimation ? "calendar-cell--hoverable" : ""}`}
                  aria-label={day.date.toLocaleDateString()}
                  aria-selected={isSelected}
                  data-outside={!day.inCurrentMonth ? "true" : undefined}
                >
                  {dateCellRender ? (
                    dateCellRender(day.date)
                  ) : (
                    day.date.getDate()
                  )}
                </button>
              );
            })}
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Calendar;
