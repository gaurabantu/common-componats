"use client";

import React, { useId } from "react";

import Button from "../../atoms/Button";
import TextView from "../../atoms/TextView";

import { feedbackCls } from "./feedbackState.classes";
import "./FeedbackStates.css";
import type { ErrorStateProps, FeedbackVisualTone } from "./FeedbackStates.types";

// Default icon per tone — simple SVG inline so no external dep is needed.
function DefaultErrorIcon({ tone }: { tone: FeedbackVisualTone }) {
  if (tone === "warning") {
    return (
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="ds-feedback-status-icon">
        <path d="M12 2L2 20h20L12 2z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M12 9v5M12 16.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (tone === "info") {
    return (
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="ds-feedback-status-icon">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 8v.5M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (tone === "success") {
    return (
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="ds-feedback-status-icon">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // neutral / danger
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="ds-feedback-status-icon">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 8v5M12 15.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function toneClass(tone: FeedbackVisualTone): string | false {
  if (tone === "neutral") return "ds-feedback-shell--tone-neutral";
  if (tone === "info") return "ds-feedback-shell--tone-info";
  if (tone === "success") return "ds-feedback-shell--tone-success";
  if (tone === "warning") return "ds-feedback-shell--tone-warning";
  if (tone === "danger") return "ds-feedback-shell--danger";
  return false;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again later. If the problem continues, contact support.",
  image,
  icon,
  hideIcon = false,
  details,
  retryLabel = "Try again",
  onRetry,
  extra,
  className,
  tone = "danger",
  compact = false,
  size = "md",
  align = "center",
  "aria-live": ariaLive,
  role,
  "data-testid": testId,
}: ErrorStateProps) {
  const resolvedRole = role ?? (details || onRetry ? "alert" : "status");
  const resolvedAriaLive = ariaLive ?? (resolvedRole === "alert" ? "assertive" : "polite");

  const titleId = useId();
  const descId = useId();

  const detailBody =
    details == null
      ? null
      : typeof details === "string" ||
          typeof details === "number" ||
          typeof details === "boolean"
        ? <pre className="ds-feedback-detail">{String(details)}</pre>
        : details instanceof Error
          ? <pre className="ds-feedback-detail">{details.message}</pre>
          : <div className="ds-feedback-detail">{details}</div>;

  const resolvedIcon = !hideIcon ? (icon ?? <DefaultErrorIcon tone={tone} />) : null;

  return (
    <section
      className={feedbackCls(
        "ds-feedback-shell",
        `ds-feedback-shell--${size}`,
        compact && "ds-feedback-shell--compact",
        align === "start" && "ds-feedback-shell--align-start",
        toneClass(tone),
        className
      )}
      role={resolvedRole}
      aria-live={resolvedAriaLive}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      data-testid={testId ?? "feedback-error-state"}
    >
      {image ? <div className="ds-feedback-image">{image}</div> : null}
      {resolvedIcon ? (
        <span className="ds-feedback-icon ds-feedback-icon--status">{resolvedIcon}</span>
      ) : null}
      <TextView as="h3" variant="h4" id={titleId}>
        {title}
      </TextView>
      <TextView as="p" variant="body" color="secondary" id={descId}>
        {description}
      </TextView>

      {detailBody}

      {onRetry ? (
        <div className="ds-feedback-actions">
          <Button variant="outlinePrimary" type="button" onClick={() => onRetry()} size={compact ? "sm" : "md"}>
            {retryLabel}
          </Button>
        </div>
      ) : null}
      {extra ? <div className="ds-feedback-extra">{extra}</div> : null}
    </section>
  );
}
