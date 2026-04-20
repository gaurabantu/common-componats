"use client";

import React, { useCallback } from "react";
import type { BadgeProps } from "./Badge.types";
import "./Badge.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function DismissIcon() {
  return (
    <svg
      className="ds-badge__dismiss-icon"
      viewBox="0 0 16 16"
      width={16}
      height={16}
      aria-hidden
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 1 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06Z"
      />
    </svg>
  );
}

/**
 * Badge, tag, or chip — compact label with semantic variants and optional dot or dismiss.
 * Use `shape="pill"` for chips, `shape="rounded"` (default) for tags/badges per design system radii.
 */
const Badge = React.memo(function Badge({
  children,
  variant = "neutral",
  tone = "soft",
  shape = "rounded",
  size = "sm",
  elevated = false,
  dot = false,
  icon,
  onDismiss,
  dismissLabel = "Remove",
  className,
  onClick,
  ...rest
}: BadgeProps) {
  const handleDismiss = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onDismiss?.();
    },
    [onDismiss]
  );

  return (
    <span
      className={cls("ds-badge", className)}
      data-variant={variant}
      data-tone={tone}
      data-shape={shape}
      data-size={size}
      data-elevated={elevated ? "true" : undefined}
      onClick={onClick}
      {...rest}
    >
      {dot ? <span className="ds-badge__dot" aria-hidden /> : null}
      {icon ? <span className="ds-badge__icon">{icon}</span> : null}
      <span className="ds-badge__label">{children}</span>
      {onDismiss ? (
        <button
          type="button"
          className="ds-badge__dismiss"
          aria-label={dismissLabel}
          onClick={handleDismiss}
        >
          <DismissIcon />
        </button>
      ) : null}
    </span>
  );
});

export default Badge;

/** Same component — use when naming chips in product copy */
export const Chip = Badge;

/** Same component — use when naming tags in product copy */
export const Tag = Badge;

export type { BadgeProps, BadgeVariant, BadgeTone, BadgeShape, BadgeSize, ChipProps, TagProps } from "./Badge.types";
