import type { ReactNode } from "react";
import type { WizardHeadingLevel, WizardValidationResult } from "./Wizard.types";

export const WIZARD_DEFAULTS = {
  defaultActiveStep: 0,
  linear: true,
  showReview: false,
  reviewTitle: "Review",
  backLabel: "Back",
  nextLabel: "Next",
  finishLabel: "Finish",
  editLabel: "Edit",
  optionalLabel: "Optional",
  loadingLabel: "Submitting…",
  validationTitle: "Check this step",
  validationMessage: "Some information on this step is missing or invalid.",
  headingLevel: 2 as WizardHeadingLevel,
  stepperAriaLabel: "Progress",
} as const;

export const defaultStepCounter = (current: number, total: number): ReactNode => `Step ${current} of ${total}`;

/** Normalises a validator result: `null` = valid, otherwise the message to show (`""` = default). */
export function toValidationError(result: WizardValidationResult | undefined | void): string | null {
  if (result === undefined || result === true) return null;
  if (result === false) return "";
  if (typeof result === "string") return result;
  return null;
}

/** Runs a validator (sync or async); a throw / rejection counts as invalid with the default message. */
export async function runValidator(
  validate: (() => WizardValidationResult | Promise<WizardValidationResult>) | undefined,
): Promise<string | null> {
  if (!validate) return null;
  try {
    return toValidationError(await validate());
  } catch {
    return "";
  }
}
