"use client";

import React from "react";
import { SPINNER_DEFAULTS } from "./Spinner.config";
import type { SpinnerProps } from "./Spinner.types";
import "./Spinner.css";

/**
 * Spinner — indeterminate loading indicator.
 * Announces `label` through a `role="status"` region; pass `decorative` when the
 * surrounding control already exposes the busy state (e.g. inside a loading Button).
 */
const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  {
    size = SPINNER_DEFAULTS.size,
    tone = SPINNER_DEFAULTS.tone,
    label = SPINNER_DEFAULTS.label,
    decorative = SPINNER_DEFAULTS.decorative,
    className,
    ...rest
  },
  ref,
) {
  return (
    <span
      ref={ref}
      className={["ds-spinner", className].filter(Boolean).join(" ")}
      data-size={size}
      data-tone={tone}
      role={decorative ? undefined : "status"}
      aria-hidden={decorative ? true : undefined}
      {...rest}
    >
      <span className="ds-spinner__ring" aria-hidden="true" />
      {decorative ? null : <span className="ds-spinner__label">{label}</span>}
    </span>
  );
});

Spinner.displayName = "Spinner";

export default Spinner;
export type { SpinnerProps, SpinnerSize, SpinnerTone } from "./Spinner.types";
