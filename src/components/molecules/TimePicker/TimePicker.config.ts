import type { TimePickerLabels, TimePickerSize } from "./TimePicker.types";

export const TIME_PICKER_DEFAULTS: { step: number; size: TimePickerSize; clearable: boolean } = {
  step: 15,
  size: "md",
  clearable: false,
};

export const TIME_PICKER_SIZES: readonly TimePickerSize[] = ["sm", "md", "lg"] as const;

export const TIME_PICKER_LABELS: TimePickerLabels = {
  toggle: "Show times",
  clear: "Clear time",
  listbox: "Times",
  invalid: "Enter a valid time",
  unavailable: "That time is not available",
};

export const MINUTES_PER_DAY = 1440;
