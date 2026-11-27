import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";

/** `vertical` (default) stacks events; `horizontal` scrolls sideways and collapses to vertical ≤ 640px. */
export type TimelineOrientation = "vertical" | "horizontal";

/** `start` keeps every event on one side of the rail; `alternate` zig-zags (collapses to `start` ≤ 640px). */
export type TimelineAlign = "start" | "alternate";

/**
 * Marker tone. Colour is never the only carrier: non-neutral tones add a visually-hidden status
 * word (override with `statusLabel`).
 */
export type TimelineStatus = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

export type TimelineSize = "sm" | "md";

/** One event, for the data-driven `items` API. */
export interface TimelineItemData {
  /** Stable React key. Falls back to the index. */
  id?: string | number;
  title: ReactNode;
  description?: ReactNode;
  /**
   * When the event happened. `Date` / epoch ms render a `<time dateTime="ISO">` with a localised
   * label (`formatTimestamp`); a string is used as the machine-readable `dateTime` and shown as-is.
   */
  timestamp?: Date | number | string;
  /** Visible text for the timestamp (overrides the formatted value; `dateTime` is kept). */
  timestampLabel?: ReactNode;
  /** Icon drawn inside the marker (decorative — the title carries the meaning). */
  icon?: ReactNode;
  status?: TimelineStatus;
  /** Screen-reader status word. Defaults per tone (e.g. "Success"); `""` suppresses it. */
  statusLabel?: string;
}

export interface TimelineItemProps
  extends Omit<LiHTMLAttributes<HTMLLIElement>, "title">,
    Omit<TimelineItemData, "id"> {
  /** Renders the "in progress" marker (pulsing ring, reduced-motion safe) and a hidden "Pending" word. */
  pending?: boolean;
  /** Formatter used for `Date` / number timestamps. Inherited from `Timeline` when omitted. */
  formatTimestamp?: (date: Date) => string;
}

export interface TimelineProps extends Omit<HTMLAttributes<HTMLOListElement>, "children"> {
  /** Data API. `children` (`TimelineItem`s) are rendered after `items` when both are given. */
  items?: TimelineItemData[];
  children?: ReactNode;
  orientation?: TimelineOrientation;
  align?: TimelineAlign;
  size?: TimelineSize;
  /**
   * Append a trailing "in progress" event. `true` uses the default title ("In progress");
   * pass a node to customise it.
   */
  pending?: boolean | ReactNode;
  /** Default formatter for `Date` / number timestamps (`Intl.DateTimeFormat`, medium date + short time). */
  formatTimestamp?: (date: Date) => string;
  /**
   * Accessible name for the list (and, when horizontal, for the keyboard-scrollable region).
   * Prefer this or `aria-labelledby`.
   */
  label?: string;
}
