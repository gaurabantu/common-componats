"use client";

import React from "react";
import { SPINNER_DEFAULTS, SPINNER_SEGMENTS } from "./Spinner.config";
import type { SpinnerProps } from "./Spinner.types";
import "./Spinner.css";

/** Renders `false` until `delay` ms have elapsed (immediately `true` when `delay <= 0`). */
function useDelayElapsed(delay: number): boolean {
  const [elapsed, setElapsed] = React.useState(() => !(delay > 0));
  React.useEffect(() => {
    if (!(delay > 0)) {
      setElapsed(true);
      return undefined;
    }
    setElapsed(false);
    const timer = setTimeout(() => setElapsed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return elapsed;
}

/**
 * Spinner — indeterminate loading indicator.
 * Announces `label` through a `role="status"` region; pass `decorative` when the
 * surrounding control already exposes the busy state (e.g. inside a loading Button).
 * `variant` picks ring / dots / bars; `delay` suppresses the flash for fast requests.
 */
const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  {
    size = SPINNER_DEFAULTS.size,
    tone = SPINNER_DEFAULTS.tone,
    variant = SPINNER_DEFAULTS.variant,
    thickness,
    speed = SPINNER_DEFAULTS.speed,
    delay = SPINNER_DEFAULTS.delay,
    label = SPINNER_DEFAULTS.label,
    decorative = SPINNER_DEFAULTS.decorative,
    className,
    ...rest
  },
  ref,
) {
  const visible = useDelayElapsed(delay);
  if (!visible) return null;

  return (
    <span
      ref={ref}
      className={["ds-spinner", className].filter(Boolean).join(" ")}
      data-size={size}
      data-tone={tone}
      data-variant={variant}
      data-thickness={thickness}
      data-speed={speed}
      role={decorative ? undefined : "status"}
      aria-hidden={decorative ? true : undefined}
      {...rest}
    >
      {variant === "ring" ? (
        <span className="ds-spinner__ring" aria-hidden="true" />
      ) : (
        <span className={`ds-spinner__${variant}`} aria-hidden="true">
          {Array.from({ length: SPINNER_SEGMENTS }, (_, i) => (
            <span key={i} className="ds-spinner__segment" />
          ))}
        </span>
      )}
      {decorative ? null : <span className="ds-spinner__label">{label}</span>}
    </span>
  );
});

Spinner.displayName = "Spinner";

export default Spinner;
export type {
  SpinnerProps,
  SpinnerSize,
  SpinnerTone,
  SpinnerVariant,
  SpinnerThickness,
  SpinnerSpeed,
} from "./Spinner.types";
