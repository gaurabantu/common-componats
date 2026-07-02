import type { CalendarTheme } from "./Calendar.types";

import type { CalendarElevation, CalendarVariant } from "./Calendar.types";

export const defaultCalendarOptions = {
  firstDayOfWeek: 0 as 0 | 1, // Sunday
  fullWidth: true,
  showWeekNumbers: false,
  mode: "single" as const,
  animation: "slide" as const,
  cellHoverAnimation: true,
  /** shadcn-like: bordered card, no heavy shadow */
  variant: "outlined" as CalendarVariant,
  elevation: "none" as CalendarElevation,
  bordered: true,
  hoverable: false,
  size: "md" as const,
};

/** Card-like elevation shadows (matches Card component) */
export const getElevationShadow = (elevation: CalendarElevation): string => {
  switch (elevation) {
    case "none":
      return "none";
    case "sm":
      return "var(--shadow-sm)";
    case "lg":
      return "var(--shadow-lg)";
    case "md":
    default:
      return "var(--shadow-md)";
  }
};

/** Resolve elevation from variant when not explicitly set */
export const resolveElevation = (
  elevation: CalendarElevation | undefined,
  variant: CalendarVariant
): CalendarElevation => {
  if (elevation !== undefined) return elevation;
  switch (variant) {
    case "elevated":
      return "md";
    case "filled":
      return "sm";
    case "outlined":
    default:
      return "none";
  }
};

export const defaultTheme: CalendarTheme = {
  primary: "var(--button-primary-default-bg)",
  primaryHover: "color-mix(in srgb, var(--button-primary-default-bg) 8%, transparent)",
  primaryText: "var(--color-text-on-primary)",
  rangeBackground: "var(--color-accent-sky-10)",
  todayBackground: "var(--color-accent-amber-10)",
  todayRing: "color-mix(in srgb, var(--color-state-warning) 50%, transparent)",
  text: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textDisabled: "var(--color-text-disabled)",
  background: "var(--color-bg-surface)",
  border: "var(--color-border-default)",
  selectBorder: "var(--color-border-default)",
  focusRing: "color-mix(in srgb, var(--color-focus-ring) 25%, transparent)",
  padding: 12,
  gap: 2,
  cellSize: 36,
  borderRadius: 8,
  cellRadius: 6,
  navButtonSize: 28,
  cellFontSize: 14,
  weekdayFontSize: 11,
  fontFamily: "var(--font-family), system-ui, sans-serif",
  maxWidth: 320,
};

const sizeOverrides: Record<"sm" | "md" | "lg", Partial<CalendarTheme>> = {
  sm: {
    padding: 12,
    gap: 4,
    cellSize: 32,
    borderRadius: 12,
    cellRadius: 8,
    navButtonSize: 28,
    cellFontSize: 12,
    weekdayFontSize: 10,
    maxWidth: 280,
  },
  md: {},
  lg: {
    padding: 24,
    gap: 8,
    cellSize: 48,
    borderRadius: 20,
    cellRadius: 12,
    navButtonSize: 44,
    cellFontSize: 16,
    weekdayFontSize: 12,
    maxWidth: 380,
  },
};

export const getResolvedTheme = (
  theme?: Partial<CalendarTheme>,
  size?: "sm" | "md" | "lg"
): CalendarTheme => {
  const sizeTheme = size ? sizeOverrides[size] : {};
  return {
    ...defaultTheme,
    ...sizeTheme,
    ...theme,
  };

};

export const toCssValue = (v: number | string | undefined): string | undefined => {
  if (v === undefined) return undefined;
  return typeof v === "number" ? `${v}px` : String(v);
};

/** Converts theme to CSS custom properties for the root element */
export const themeToCssVars = (theme: CalendarTheme): Record<string, string> => {
  const vars: Record<string, string> = {};
  if (theme.primary) vars["--cal-primary"] = theme.primary;
  if (theme.primaryHover) vars["--cal-primary-hover"] = theme.primaryHover;
  if (theme.primaryText) vars["--cal-primary-text"] = theme.primaryText;
  if (theme.rangeBackground) vars["--cal-range-bg"] = theme.rangeBackground;
  if (theme.todayBackground) vars["--cal-today-bg"] = theme.todayBackground;
  if (theme.todayRing) vars["--cal-today-ring"] = theme.todayRing;
  if (theme.text) vars["--cal-text"] = theme.text;
  if (theme.textSecondary) vars["--cal-text-secondary"] = theme.textSecondary;
  if (theme.textDisabled) vars["--cal-text-disabled"] = theme.textDisabled;
  if (theme.background) vars["--cal-bg"] = theme.background;
  if (theme.border) vars["--cal-border"] = theme.border;
  if (theme.selectBorder) vars["--cal-select-border"] = theme.selectBorder;
  if (theme.focusRing) vars["--cal-focus-ring"] = theme.focusRing;
  if (theme.padding !== undefined) vars["--cal-padding"] = toCssValue(theme.padding)!;
  if (theme.gap !== undefined) vars["--cal-gap"] = toCssValue(theme.gap)!;
  if (theme.cellSize !== undefined) {
    const cs = toCssValue(theme.cellSize)!;
    vars["--cal-cell-size"] = cs;
    vars["--cell-size"] = cs;
  }
  if (theme.borderRadius !== undefined) vars["--cal-radius"] = toCssValue(theme.borderRadius)!;
  if (theme.cellRadius !== undefined) vars["--cal-cell-radius"] = toCssValue(theme.cellRadius)!;
  if (theme.navButtonSize !== undefined) vars["--cal-nav-size"] = toCssValue(theme.navButtonSize)!;
  if (theme.cellFontSize !== undefined) vars["--cal-cell-font"] = toCssValue(theme.cellFontSize)!;
  if (theme.weekdayFontSize !== undefined) vars["--cal-weekday-font"] = toCssValue(theme.weekdayFontSize)!;
  if (theme.fontFamily) vars["--cal-font"] = theme.fontFamily;
  if (theme.maxWidth !== undefined) vars["--cal-max-width"] = toCssValue(theme.maxWidth)!;
  if (theme.boxShadow) vars["--cal-shadow"] = theme.boxShadow;
  return vars;
};
