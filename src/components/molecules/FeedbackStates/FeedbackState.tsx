"use client";

import React from "react";

import EmptyState from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { OfflineBanner } from "./OfflineBanner";

import type { EmptyStateProps, ErrorStateProps, FeedbackStateProps, OfflineBannerProps } from "./FeedbackStates.types";

/**
 * Variant-driven molecule — mirrors the `Card` / `Button` pattern in this kit.
 *
 * | variant   | delegates to  | default tone        |
 * |-----------|---------------|---------------------|
 * | "empty"   | `EmptyState`  | neutral             |
 * | "success" | `EmptyState`  | success (auto-icon) |
 * | "info"    | `EmptyState`  | info    (auto-icon) |
 * | "error"   | `ErrorState`  | danger  (auto-icon) |
 * | "offline" | `OfflineBanner` | warning            |
 *
 * Prefer dedicated imports (`EmptyState`, `ErrorState`, …) for explicit JSX; prefer
 * `FeedbackState variant="…"` for phase-machine switches from `useAsyncContentPhase`.
 */
export function FeedbackState(props: FeedbackStateProps) {
  if (props.variant === "empty") {
    const { variant: _omit, ...rest } = props;
    return <EmptyState {...(rest as EmptyStateProps)} />;
  }

  if (props.variant === "success") {
    const { variant: _omit, ...rest } = props;
    return (
      <EmptyState
        tone="success"
        icon={
          <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-success-strong)" }}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
            <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
        {...(rest as EmptyStateProps)}
      />
    );
  }

  if (props.variant === "info") {
    const { variant: _omit, ...rest } = props;
    return (
      <EmptyState
        tone="info"
        icon={
          <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: "var(--color-info-strong)" }}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
            <path d="M12 8v.5M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        }
        {...(rest as EmptyStateProps)}
      />
    );
  }

  if (props.variant === "error") {
    const { variant: _omit, ...rest } = props;
    return <ErrorState {...(rest as ErrorStateProps)} />;
  }

  if (props.variant === "offline") {
    const { variant: _omit, ...rest } = props;
    return <OfflineBanner {...(rest as OfflineBannerProps)} />;
  }

  const _exhaustive: never = props;
  return _exhaustive;
}
