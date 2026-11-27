"use client";

import React, { createContext, useContext } from "react";
import { TIMELINE_DEFAULTS, TIMELINE_STATUS_LABELS, defaultFormatTimestamp } from "./Timeline.config";
import type { TimelineItemProps, TimelineProps } from "./Timeline.types";
import "./Timeline.css";

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

const TimelineFormatContext = createContext<(date: Date) => string>(defaultFormatTimestamp);

/** Resolve `timestamp` into a machine-readable `dateTime` and a visible label. */
function resolveTimestamp(
  timestamp: TimelineItemProps["timestamp"],
  format: (date: Date) => string,
): { dateTime?: string; label?: string } {
  if (timestamp === undefined || timestamp === null || timestamp === "") return {};
  if (typeof timestamp === "string") return { dateTime: timestamp, label: timestamp };
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  if (Number.isNaN(date.getTime())) return {};
  return { dateTime: date.toISOString(), label: format(date) };
}

/**
 * TimelineItem — one event: marker (+ optional icon) on the rail, then timestamp, title and
 * description. Use inside `Timeline`.
 */
export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(function TimelineItem(
  {
    title,
    description,
    timestamp,
    timestampLabel,
    icon,
    status = TIMELINE_DEFAULTS.status,
    statusLabel,
    pending = false,
    formatTimestamp,
    className,
    ...rest
  },
  ref,
) {
  const inheritedFormat = useContext(TimelineFormatContext);
  const { dateTime, label } = resolveTimestamp(timestamp, formatTimestamp ?? inheritedFormat);
  const srStatus = pending
    ? TIMELINE_DEFAULTS.pendingLabel
    : statusLabel !== undefined
      ? statusLabel
      : TIMELINE_STATUS_LABELS[status];

  return (
    <li
      ref={ref}
      className={cls("ds-timeline-item", className)}
      data-status={status}
      data-pending={pending ? "true" : undefined}
      data-has-icon={icon != null ? "true" : undefined}
      {...rest}
    >
      <span className="ds-timeline-item__marker" aria-hidden="true">
        <span className="ds-timeline-item__dot">{icon}</span>
      </span>
      <div className="ds-timeline-item__content">
        {dateTime || timestampLabel != null ? (
          <time className="ds-timeline-item__time" dateTime={dateTime}>
            {timestampLabel ?? label}
          </time>
        ) : null}
        <div className="ds-timeline-item__title">
          {title}
          {srStatus ? <span className="ds-timeline__sr">{`, ${srStatus}`}</span> : null}
        </div>
        {description != null ? <div className="ds-timeline-item__description">{description}</div> : null}
      </div>
    </li>
  );
});

/**
 * Timeline — ordered list (`<ol>`) of events with timestamps (`<time dateTime>`), status-toned
 * markers, `vertical` / `horizontal` orientation (horizontal scrolls, collapses to vertical
 * ≤ 640px) and `start` / `alternate` alignment. Data-driven via `items`, or compose `TimelineItem`s.
 */
export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  {
    items,
    children,
    orientation = TIMELINE_DEFAULTS.orientation,
    align = TIMELINE_DEFAULTS.align,
    size = TIMELINE_DEFAULTS.size,
    pending,
    formatTimestamp = defaultFormatTimestamp,
    label,
    className,
    ...rest
  },
  ref,
) {
  const horizontal = orientation === "horizontal";
  const pendingTitle = pending === true ? TIMELINE_DEFAULTS.pendingTitle : pending;
  const ariaLabel = rest["aria-label"] ?? label;

  const list = (
    <ol
      {...rest}
      ref={ref}
      aria-label={ariaLabel}
      className="ds-timeline__list"
    >
      {items?.map(({ id, ...item }, index) => <TimelineItem key={id ?? index} {...item} />)}
      {children}
      {pending ? <TimelineItem title={pendingTitle} pending /> : null}
    </ol>
  );

  return (
    <TimelineFormatContext.Provider value={formatTimestamp}>
      <div
        className={cls("ds-timeline", className)}
        data-orientation={orientation}
        data-align={align}
        data-size={size}
        // Horizontal timelines scroll: keep the region keyboard-reachable (WCAG 2.1.1, axe scrollable-region-focusable).
        role={horizontal ? "region" : undefined}
        aria-label={horizontal ? (ariaLabel ?? "Timeline") : undefined}
        tabIndex={horizontal ? 0 : undefined}
      >
        {list}
      </div>
    </TimelineFormatContext.Provider>
  );
});

Timeline.displayName = "Timeline";
TimelineItem.displayName = "TimelineItem";

export default Timeline;
export type {
  TimelineProps,
  TimelineItemProps,
  TimelineItemData,
  TimelineOrientation,
  TimelineAlign,
  TimelineStatus,
  TimelineSize,
} from "./Timeline.types";
