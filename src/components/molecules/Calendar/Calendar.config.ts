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
      return "var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08))";
    case "lg":
      return "var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.12))";
    case "md":
    default:
      return "var(--shadow-md, 0 4px 16px rgba(0, 0, 0, 0.10))";
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
  primary: "var(--button-primary-default-bg, #2563EB)",
  primaryHover: "rgba(37, 99, 235, 0.08)",
  primaryText: "#FFFFFF",
  rangeBackground: "var(--color-accent-sky-10, #E6F2FF)",
  todayBackground: "var(--color-accent-amber-10, #FFF6DD)",
  todayRing: "rgba(245, 158, 11, 0.5)",
  text: "var(--color-text-primary, #0D0D0D)",
  textSecondary: "var(--color-text-secondary, #6B7280)",
  textDisabled: "#B0B0B0",
  background: "var(--color-bg-surface, #FFFFFF)",
  border: "var(--color-border-default, #e5e7eb)",
  selectBorder: "var(--color-border-default, #e5e7eb)",
  focusRing: "rgba(37, 99, 235, 0.25)",
  padding: 12,
  gap: 2,
  cellSize: 36,
  borderRadius: 8,
  cellRadius: 6,
  navButtonSize: 28,
  cellFontSize: 14,
  weekdayFontSize: 11,
  fontFamily: 'var(--font-family, "Inter"), system-ui, sans-serif',
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
