import type { HTMLAttributes, ReactNode } from "react";

/**
 * Result of a step validator.
 * - `true` — valid, the wizard may continue
 * - `false` — invalid, shows the default `validationMessage`
 * - `string` — invalid, the string is shown as the error message (empty string → default message)
 */
export type WizardValidationResult = boolean | string;

export interface WizardStep {
  /** Stable id (React key + DOM id suffix). */
  id: string;
  /** Step title — Stepper label and the step's focusable heading. */
  title: ReactNode;
  /** Supporting text under the title (Stepper + panel). */
  description?: ReactNode;
  /** Marks the step "Optional" in the Stepper and review list. */
  optional?: boolean;
  /** The step body (usually `FormField`s). */
  content: ReactNode;
  /** Runs before leaving the step forward (Next, forward Stepper jump, Finish). May be async. */
  validate?: () => WizardValidationResult | Promise<WizardValidationResult>;
  /** Optional summary shown under the title on the review step. */
  summary?: ReactNode;
}

export type WizardHeadingLevel = 2 | 3 | 4;

export interface WizardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  steps: WizardStep[];
  /** Active step index (controlled). The review step, when shown, is index `steps.length`. */
  activeStep?: number;
  /** Initial step when uncontrolled. @default 0 */
  defaultActiveStep?: number;
  /** Fires with the index the wizard wants to move to. */
  onStepChange?: (index: number) => void;
  /**
   * Fires after every step validated on Finish. If it returns a Promise and `loading` is not
   * passed, the wizard manages the busy state itself until the Promise settles (a rejection
   * clears it too — handle errors inside `onComplete`, e.g. by showing an `Alert`).
   */
  onComplete?: () => void | Promise<unknown>;
  /** When true, steps ahead of the furthest reached step are not navigable from the Stepper. @default true */
  linear?: boolean;
  /** Append an automatic review step listing every step title with an "Edit" link. */
  showReview?: boolean;
  /** @default "Review" */
  reviewTitle?: ReactNode;
  /** Intro copy on the review step. */
  reviewDescription?: ReactNode;
  /** @default "Back" */
  backLabel?: ReactNode;
  /** @default "Next" */
  nextLabel?: ReactNode;
  /** @default "Finish" */
  finishLabel?: ReactNode;
  /** Visible text of the review "Edit" links (the step title is appended for screen readers). @default "Edit" */
  editLabel?: ReactNode;
  /** @default "Optional" */
  optionalLabel?: ReactNode;
  /**
   * Finish is busy (spinner + disabled). Focus moves to the step heading so it is not lost.
   * Controlled — when set (even `false`) it takes precedence over the internal Promise-driven state.
   */
  loading?: boolean;
  /** Announced politely while `loading`. @default "Submitting…" */
  loadingLabel?: string;
  /** Title of the validation-error Alert. @default "Check this step" */
  validationTitle?: ReactNode;
  /** Message when a validator returns `false` (or throws). @default "Some information on this step is missing or invalid." */
  validationMessage?: ReactNode;
  /** Visible "Step x of y" eyebrow above the heading (also read with it). */
  formatStepCounter?: (current: number, total: number) => ReactNode;
  /** Heading level of the step title. @default 2 */
  headingLevel?: WizardHeadingLevel;
  /** Accessible name of the Stepper nav landmark. @default "Progress" */
  stepperAriaLabel?: string;
}
