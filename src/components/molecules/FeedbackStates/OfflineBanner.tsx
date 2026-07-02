"use client";

import React from "react";

import Button from "../../atoms/Button";
import TextView from "../../atoms/TextView";

import { feedbackCls } from "./feedbackState.classes";
import "./FeedbackStates.css";
import type { OfflineBannerProps } from "./FeedbackStates.types";

const DefaultOfflineIcon = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="ds-offline-banner__icon"
  >
    <path
      d="M1 1l22 22M9.9 4.24A10 10 0 0119.07 8.77M5 5a10 10 0 00-.29 14.71M10.73 10.73A5 5 0 0114.35 13M7.05 7.05A5 5 0 005 11.37M12 20h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function bannerToneClass(tone: OfflineBannerProps["tone"]): string {
  return tone === "neutral" ? "ds-offline-banner--neutral" : "ds-offline-banner--warning";
}

export function OfflineBanner({
  headline = "No internet connection.",
  message = "Check your connection and try again.",
  leadingIcon,
  image,
  actionLabel = "Retry",
  onRetry,
  onDismiss,
  dismissLabel = "Dismiss",
  className,
  sticky,
  tone = "warning",
  compact = false,
  role = "status",
}: OfflineBannerProps) {
  const showLeadingIcon = leadingIcon !== undefined ? leadingIcon : <DefaultOfflineIcon />;

  // When an image slot is provided the banner expands to a centred "full panel"
  // mode (same shell as EmptyState). Otherwise it stays the slim horizontal bar.
  if (image) {
    return (
      <section
        className={feedbackCls(
          "ds-feedback-shell",
          "ds-feedback-shell--md",
          compact && "ds-feedback-shell--compact",
          tone === "warning" ? "ds-feedback-shell--tone-warning" : "ds-feedback-shell--tone-neutral",
          className
        )}
        role={role}
        aria-live="polite"
        aria-atomic="true"
        data-testid="feedback-offline-banner"
      >
        <div className="ds-feedback-image">{image}</div>
        <TextView as="p" variant="body">
          <strong>{headline}</strong>
        </TextView>
        {message ? (
          <TextView as="p" variant="small" color="secondary">{message}</TextView>
        ) : null}
        {onRetry || onDismiss ? (
          <div className="ds-feedback-actions">
            {onRetry ? (
              <Button variant="outlinePrimary" type="button" size="md" onClick={() => onRetry?.()}>
                {actionLabel}
              </Button>
            ) : null}
            {onDismiss ? (
              <Button variant="ghost" type="button" size="md" onClick={() => onDismiss?.()}>
                {dismissLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <aside
      className={feedbackCls(
        "ds-offline-banner",
        bannerToneClass(tone),
        compact && "ds-offline-banner--compact",
        sticky && "ds-offline-banner--sticky",
        className
      )}
      role={role}
      aria-live="polite"
      aria-atomic="true"
      data-testid="feedback-offline-banner"
    >
      {showLeadingIcon ? (
        <span className="ds-offline-banner__icon-wrap">{showLeadingIcon}</span>
      ) : null}

      <div className="ds-offline-banner__body">
        <TextView as="p" variant="body">
          <strong>{headline}</strong>
        </TextView>
        {message ? (
          <TextView as="p" variant="small" color="secondary">
            {message}
          </TextView>
        ) : null}
      </div>

      <div className="ds-offline-banner__actions">
        {onRetry ? (
          <Button variant="outlineSecondary" type="button" size="sm" onClick={() => onRetry?.()}>
            {actionLabel}
          </Button>
        ) : null}
        {onDismiss ? (
          <button
            type="button"
            onClick={() => onDismiss?.()}
            aria-label={dismissLabel}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "var(--radius-control)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "var(--color-text-secondary)",
              fontSize: 14,
            }}
          >
            ✕
          </button>
        ) : null}
      </div>
    </aside>
  );
}
