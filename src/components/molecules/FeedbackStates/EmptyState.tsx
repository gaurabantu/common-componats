"use client";

import React, { useId } from "react";

import TextView from "../../atoms/TextView";

import { feedbackCls } from "./feedbackState.classes";
import "./FeedbackStates.css";
import type { EmptyStateProps } from "./FeedbackStates.types";

export default function EmptyState({
  title,
  description,
  icon,
  iconLabel,
  image,
  action,
  extra,
  className,
  role = "status",
  compact = false,
  size = "md",
  align = "center",
  tone = "neutral",
  "aria-live": ariaLive = "polite",
  "data-testid": testId,
}: EmptyStateProps) {
  const titleId = useId();
  const descId = useId();

  return (
    <section
      className={feedbackCls(
        "ds-feedback-shell",
        `ds-feedback-shell--${size}`,
        compact && "ds-feedback-shell--compact",
        align === "start" && "ds-feedback-shell--align-start",
        tone !== "neutral" && `ds-feedback-shell--tone-${tone}`,
        className
      )}
      role={role}
      aria-live={ariaLive}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      data-testid={testId ?? "feedback-empty-state"}
    >
      {image ? <div className="ds-feedback-image">{image}</div> : null}
      {icon ? (
        <span
          className="ds-feedback-icon"
          aria-hidden={iconLabel ? undefined : "true"}
          aria-label={iconLabel}
          role={iconLabel ? "img" : undefined}
        >
          {icon}
        </span>
      ) : null}
      <TextView as="h3" variant="h4" id={titleId}>
        {title}
      </TextView>
      {description ? (
        <TextView as="p" variant="body" color="secondary" id={descId}>
          {description}
        </TextView>
      ) : null}
      {action ? <div className="ds-feedback-actions">{action}</div> : null}
      {extra ? <div className="ds-feedback-extra">{extra}</div> : null}
    </section>
  );
}
