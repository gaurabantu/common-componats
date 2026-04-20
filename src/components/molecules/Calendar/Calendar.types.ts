export type CalendarAnimation = "none" | "slide" | "fade" | "scale";

export type CalendarSize = "sm" | "md" | "lg";

/** Card-like elevation levels */
export type CalendarElevation = "none" | "sm" | "md" | "lg";

/** Visual variant aligned with Card component */
export type CalendarVariant = "outlined" | "elevated" | "filled";

/** Theme tokens for dynamic styling. All values are optional; defaults apply when omitted. */
export interface CalendarTheme {
  /** Primary/accent color (selected date, nav hover) */
  primary?: string;
  /** Primary hover state */
  primaryHover?: string;
  /** Text color on primary background */
  primaryText?: string;
  /** Range highlight background */
  rangeBackground?: string;
  /** Today highlight background */
  todayBackground?: string;
  /** Today ring/border color */
  todayRing?: string;
  /** Main text color */
  text?: string;
  /** Secondary text (weekdays, other month) */
  textSecondary?: string;
  /** Disabled text color */
  textDisabled?: string;
  /** Calendar background */
  background?: string;
  /** Border color */
  border?: string;
  /** Select/dropdown border */
  selectBorder?: string;
  /** Focus ring color */
  focusRing?: string;
  /** Container padding (px) */
  padding?: number | string;
  /** Gap between cells (px) */
  gap?: number | string;
  /** Cell min height (px) */
  cellSize?: number | string;
  /** Container border radius (px) */
  borderRadius?: number | string;
  /** Cell border radius (px) */
  cellRadius?: number | string;
  /** Nav button size (px) */
  navButtonSize?: number | string;
  /** Font size for cells */
  cellFontSize?: number | string;
  /** Font size for weekday headers */
  weekdayFontSize?: number | string;
  /** Font family */
  fontFamily?: string;
  /** Max width (px or string) */
  maxWidth?: number | string;
  /** Box shadow (overrides elevation when set) */
  boxShadow?: string;
}

export type CalendarCaptionLayout = "label" | "dropdown";

export interface CalendarProps {
  /**
   * Controlled visible month (first day of month). Pair with `onMonthChange`.
   * When omitted, month follows selection or internal state.
   */
  month?: Date;
  /**
   * Hide caption row navigation and month/year controls (use when embedding in a parent that provides nav).
   */
  hideNavigation?: boolean;
  /**
   * Month/year presentation: centered label with chevrons (shadcn-like) or dropdown selects.
   * @default "dropdown"
   */
  captionLayout?: CalendarCaptionLayout;
  /** Selected date (controlled) */
  value?: Date | null;
  /** Callback when date is selected */
  onChange?: (date: Date | null) => void;
  /** Default selected date (uncontrolled) */
  defaultValue?: Date | null;
  /** Minimum selectable date */
  minDate?: Date | string;
  /** Maximum selectable date */
  maxDate?: Date | string;
  /** Disable the calendar */
  disabled?: boolean;
  /** Read-only mode (no selection) */
  readOnly?: boolean;
  /** Show week numbers in the first column */
  showWeekNumbers?: boolean;
  /** Full width calendar */
  fullWidth?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Custom render for each date cell */
  dateCellRender?: (date: Date) => React.ReactNode;
  /** Callback when visible month changes */
  onMonthChange?: (date: Date) => void;
  /** Callback when visible year changes */
  onYearChange?: (date: Date) => void;
  /** First day of week: 0 = Sunday, 1 = Monday */
  firstDayOfWeek?: 0 | 1;
  /** Enable date range selection */
  mode?: "single" | "range";
  /** Selected range (for range mode) */
  rangeValue?: [Date | null, Date | null];
  /** Callback when range changes (for range mode) */
  onRangeChange?: (range: [Date | null, Date | null]) => void;
  /** Disable specific dates */
  disabledDate?: (date: Date) => boolean;
  /** Month transition animation: none | slide | fade | scale */
  animation?: CalendarAnimation;
  /** Enable cell hover animations */
  cellHoverAnimation?: boolean;
  /** Visual variant: outlined | elevated | filled (Card-like) */
  variant?: CalendarVariant;
  /** Elevation: none | sm | md | lg (Card-like) */
  elevation?: CalendarElevation;
  /** Show border */
  bordered?: boolean;
  /** Lift on hover (Card-like) */
  hoverable?: boolean;
  /** Border radius (px or string). Overrides theme.borderRadius when set. */
  radius?: number | string;
  /** Size: sm | md | lg */
  size?: CalendarSize;
  /** Theme overrides for colors, spacing, radii, etc. */
  theme?: Partial<CalendarTheme>;
  /** Additional inline styles for root element */
  style?: React.CSSProperties;
  /** Per-part style overrides */
  styles?: {
    root?: React.CSSProperties;
    header?: React.CSSProperties;
    navButton?: React.CSSProperties;
    select?: React.CSSProperties;
    weekday?: React.CSSProperties;
    cell?: React.CSSProperties;
  };
}
