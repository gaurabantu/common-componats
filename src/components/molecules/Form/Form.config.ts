import type { FormColumnBreakpoint } from "./Form.types";

export const FORM_DEFAULTS = {
  layout: "stacked" as const,
  columns: 2,
  maxWidth: 520,
  titleAs: "h1" as const,
  loadingLabel: "Submitting…",
  errorSummaryTitle: "There is a problem",
  autoFocusErrorSummary: true,
};

/** Order matters: mobile-first cascade. Media queries live in `Form.css`. */
export const FORM_BREAKPOINTS: readonly FormColumnBreakpoint[] = ["base", "sm", "md", "lg"];

/** Min-width (px) per breakpoint — documentation mirror of `Form.css`. */
export const FORM_BREAKPOINT_MIN_WIDTH: Record<FormColumnBreakpoint, number> = {
  base: 0,
  sm: 641,
  md: 768,
  lg: 1024,
};
