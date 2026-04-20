import type { HTMLAttributes, ReactNode } from "react";

export type StepperSize = "sm" | "md";

/** Background line: `continuous` = single fill %; `segments` = per-gap tint only; `none` = neutral gaps only. */
export type StepperTrackMode = "none" | "continuous" | "segments";

/**
 * Visual weight of the stem (connector) and marker.
 * - `default` — standard track and circles
 * - `emphasized` — thicker stem, softer gradient fill, slightly stronger current-step ring
 */
export type StepperAppearance = "default" | "emphasized";

export interface StepperContextValue {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  stepCount: number;
  linear: boolean;
  baseId: string;
  size: StepperSize;
  trackMode: StepperTrackMode;
  appearance: StepperAppearance;
}

export interface StepperProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Current step index (0-based). Controlled mode when set. */
  value?: number;
  /** Initial step when uncontrolled. */
  defaultValue?: number;
  onValueChange?: (index: number) => void;
  /**
   * When true, steps ahead of the current step are not navigable by clicking
   * (use app-level “Next” to advance). Previous steps remain clickable.
   */
  linear?: boolean;
  /** Nav landmark label for screen readers. */
  ariaLabel?: string;
  size?: StepperSize;
  /** On wide viewports, allow horizontal scroll when there are many steps (narrow min-width per step). */
  scrollable?: boolean;
  /**
   * How the track between steps is drawn.
   * - `continuous`: one baseline + fill width by completion (see `progressValue`).
   * - `segments`: tint each gap when the step before it is complete.
   * - `none`: neutral gaps only (no completion tint).
   */
  trackMode?: StepperTrackMode;
  /**
   * Completion amount for the continuous track, `0–100`.
   * Default: derived from the active index — `(activeIndex / (stepCount - 1)) * 100`, or `100` when there is one step.
   */
  progressValue?: number;
  /**
   * Heavier stem + marker treatment (gradient fill, thicker track).
   * @default "default"
   */
  appearance?: StepperAppearance;
}

export interface StepperStepProps extends Omit<HTMLAttributes<HTMLButtonElement>, "type"> {
  /** Primary label for the step. */
  label: ReactNode;
  /** Optional supporting text under the label. */
  description?: ReactNode;
  /** Disables this step’s control. */
  disabled?: boolean;
  /**
   * Centered inside the round marker for **current** and **upcoming** steps (and for **complete**
   * when `showCheckWhenComplete={false}`). Use for pictograms (e.g. preview eye).
   */
  icon?: ReactNode;
  /**
   * Text or number inside the marker when `icon` is not set (e.g. `"A"`, `"2"`).
   * If omitted, the default is `stepIndex + 1`.
   */
  markerText?: ReactNode;
  /**
   * When `true` (default), completed steps show a checkmark; set `false` to keep `icon` / `markerText` when complete.
   */
  showCheckWhenComplete?: boolean;
  /**
   * @internal Injected by `<Stepper>` when using compound children.
   */
  stepIndex?: number;
  /**
   * @internal `marker` = circle control only; `text` = label block below the track (aligned under the same column).
   */
  stepPart?: "marker" | "text";
}
