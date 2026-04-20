export const defaultDatePickerOptions = {
  /** Default format for display and onChange output. Input accepts YYYY-MM-DD, DD/MM/YYYY, MMDDYYYY, etc. */
  dateFormat: "DD-MM-YYYY",
  placeholder: "Select date",
  startPlaceholder: "Start date",
  endPlaceholder: "End date",
  size: "md" as const,
  variant: "outlined" as const,
  rounded: "4" as const,
  rangeSeparator: "to",
};
