import type { HTMLAttributes, ReactNode } from "react";

/** A (possibly partial) date range. Dates are calendar days (local midnight). */
export interface DateRange {
  from?: Date;
  to?: Date;
}

/** A complete range returned by a preset. */
export interface CompleteDateRange {
  from: Date;
  to: Date;
}

/** Quick-pick shortcut shown beside the calendar. `range` is evaluated lazily (on render / click). */
export interface DateRangePreset {
  label: string;
  range: () => CompleteDateRange;
}

/** First day of the week in the calendar grid: 0 = Sunday, 1 = Monday. */
export type DateRangeWeekStart = 0 | 1;

export interface DateRangePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "placeholder"> {
  /** Controlled range. Pass `{}` for "no range"; `undefined` makes the picker uncontrolled. */
  value?: DateRange;
  /** Initial range when uncontrolled. */
  defaultValue?: DateRange;
  /**
   * Fires with a **complete** range (`{ from, to }`) when the second day is picked or a preset is chosen,
   * and with `{}` when the range is cleared. The in-progress first click is kept internally.
   */
  onChange?: (range: DateRange) => void;
  /** Quick picks (e.g. `DEFAULT_RANGE_PRESETS`). Presets are clamped to `min` / `max`; fully out-of-range ones are disabled. */
  presets?: DateRangePreset[];
  /** Earliest selectable day. */
  min?: Date;
  /** Latest selectable day. */
  max?: Date;
  /** Months shown side by side. Always 1 at ≤ 640px. @default 2 */
  numberOfMonths?: number;
  /** Visible label (outside a `FormField`; inside one, the field label is used). */
  label?: ReactNode;
  /** Accessible name when there is no visible label (and no enclosing `FormField`). */
  ariaLabel?: string;
  /** Trigger text when no range is selected. @default "Select date range" */
  placeholder?: string;
  /** Formats one day for the trigger and announcements. Default: `Intl.DateTimeFormat(locale, { dateStyle: "medium" })`. */
  format?: (date: Date) => string;
  /** BCP 47 locale for the default formatter, calendar captions, weekday names and day labels. */
  locale?: string;
  /** @default 0 (Sunday) */
  weekStartsOn?: DateRangeWeekStart;
  /** Shows a "Clear dates" button when a range is selected. @default false */
  clearable?: boolean;
  /** @default false */
  disabled?: boolean;
  /**
   * Error state. A string / node is rendered under the trigger (outside a `FormField`) and linked via
   * `aria-describedby`; `true` only sets `aria-invalid`. Inside a `FormField`, use the field's `error`.
   */
  error?: ReactNode;
  /** Accessible name of the popover dialog. @default "Choose date range" */
  dialogLabel?: string;
  /** Accessible name of the clear button. @default "Clear dates" */
  clearLabel?: string;
  /**
   * Marks the picker required in its own label (visible `*` + screen-reader "required"). Inside a
   * `FormField`, use the field's `required` instead. `aria-required` is never set: it is not allowed
   * on the trigger `<button>`.
   */
  required?: boolean;
  /** Id of the trigger button. Inside a `FormField` the field id is used unless this is set. */
  id?: string;
}
