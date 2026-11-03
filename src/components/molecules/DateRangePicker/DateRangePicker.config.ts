import type { DateRangeWeekStart } from "./DateRangePicker.types";

export const DATE_RANGE_PICKER_DEFAULTS: {
  numberOfMonths: number;
  placeholder: string;
  dialogLabel: string;
  clearLabel: string;
  presetsLabel: string;
  weekStartsOn: DateRangeWeekStart;
  clearable: boolean;
  disabled: boolean;
} = {
  numberOfMonths: 2,
  placeholder: "Select date range",
  dialogLabel: "Choose date range",
  clearLabel: "Clear dates",
  presetsLabel: "Presets",
  weekStartsOn: 0,
  clearable: false,
  disabled: false,
};

/** At or below this width the popover shows one month and docks to the bottom of the viewport. */
export const DATE_RANGE_PICKER_NARROW_QUERY = "(max-width: 640px)";

/** Separator between the two dates in the trigger (en dash). */
export const DATE_RANGE_SEPARATOR = " – ";

/** Announcement strings (polite live region). */
export const DATE_RANGE_MESSAGES = {
  start: (from: string) => `Start date ${from}. Select an end date.`,
  selected: (from: string, to: string) => `Selected ${from} to ${to}.`,
  preset: (label: string, from: string, to: string) => `${label}: ${from} to ${to}.`,
  cleared: "Dates cleared.",
} as const;
