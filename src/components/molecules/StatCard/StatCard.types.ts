import type { ReactNode } from "react";
import type { CardProps } from "../Card/Card.types";

export type StatTrend = "up" | "down" | "neutral";

export interface StatDelta {
  /** Change value as displayed, e.g. `"+12%"` or `"3 new"`. */
  value: ReactNode;
  /** Direction — drives the arrow and tone. Meaning is also carried by text, never colour alone. */
  trend?: StatTrend;
  /** Context after the value, e.g. `"vs last release"`. */
  label?: ReactNode;
  /** Set when "down" is good (e.g. bundle size, error rate). Swaps success/danger tones. */
  invert?: boolean;
}

export interface StatCardProps
  extends Omit<CardProps, "title" | "subtitle" | "extra" | "children"> {
  /** Metric name, e.g. "Components". */
  label: ReactNode;
  /** Headline value, e.g. `36` or `"270+"`. */
  value: ReactNode;
  /** Optional unit rendered beside the value in a lighter weight (e.g. `"KB"`). */
  unit?: ReactNode;
  /** Leading icon element; wrapped in an `IconBox`. */
  icon?: ReactNode;
  /** `IconBox` tone for the icon. @default "neutral" */
  iconTone?: "neutral" | "strong" | "primary" | "success" | "warning" | "danger" | "info";
  /** Trend / change line. */
  delta?: StatDelta;
  /** Supporting sentence under the value. */
  description?: ReactNode;
  /** Optional trailing area (link, sparkline, action). */
  footer?: ReactNode;
}
