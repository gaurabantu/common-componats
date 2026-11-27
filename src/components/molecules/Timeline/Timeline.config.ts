import type { TimelineAlign, TimelineOrientation, TimelineSize, TimelineStatus } from "./Timeline.types";

export const TIMELINE_DEFAULTS: {
  orientation: TimelineOrientation;
  align: TimelineAlign;
  size: TimelineSize;
  status: TimelineStatus;
  pendingTitle: string;
  pendingLabel: string;
} = {
  orientation: "vertical",
  align: "start",
  size: "md",
  status: "neutral",
  pendingTitle: "In progress",
  pendingLabel: "Pending",
};

export const TIMELINE_ORIENTATIONS: readonly TimelineOrientation[] = ["vertical", "horizontal"] as const;
export const TIMELINE_ALIGNS: readonly TimelineAlign[] = ["start", "alternate"] as const;
export const TIMELINE_SIZES: readonly TimelineSize[] = ["sm", "md"] as const;
export const TIMELINE_STATUSES: readonly TimelineStatus[] = [
  "neutral",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;

/** Visually-hidden status word per tone, so colour is never the only signal (WCAG 1.4.1). */
export const TIMELINE_STATUS_LABELS: Record<TimelineStatus, string> = {
  neutral: "",
  primary: "",
  success: "Success",
  warning: "Warning",
  danger: "Error",
  info: "Information",
};

/** Default timestamp formatter: medium date + short time in the user's locale. */
export function defaultFormatTimestamp(date: Date): string {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
  } catch {
    return date.toISOString();
  }
}
