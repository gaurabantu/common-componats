"use client";

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Stepper, StepperStep } from "../Stepper";
import Alert from "../Alert";
import Button from "../../atoms/Button";
import { WIZARD_DEFAULTS, defaultStepCounter, runValidator } from "./Wizard.config";
import type { WizardProps } from "./Wizard.types";
import "./Wizard.css";

/** Focus moves in the same commit as the step change (no frame where focus sits on a stale node). */
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function isDev(): boolean {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env?.NODE_ENV !== "production";
}

interface WizardError {
  index: number;
  message: React.ReactNode;
  /** Remounts the Alert so a repeated failure is announced again. */
  key: number;
}

/**
 * Wizard — multi-step flow: `Stepper` (progress) + step panel + footer actions.
 * Moving to a step focuses its heading; a validation failure shows an assertive danger `Alert`
 * and focuses the heading. Exactly one primary action (Next or Finish) per footer.
 */
const Wizard = React.forwardRef<HTMLDivElement, WizardProps>(function Wizard(
  {
    steps,
    activeStep: activeStepProp,
    defaultActiveStep = WIZARD_DEFAULTS.defaultActiveStep,
    onStepChange,
    onComplete,
    linear = WIZARD_DEFAULTS.linear,
    showReview = WIZARD_DEFAULTS.showReview,
    reviewTitle = WIZARD_DEFAULTS.reviewTitle,
    reviewDescription,
    backLabel = WIZARD_DEFAULTS.backLabel,
    nextLabel = WIZARD_DEFAULTS.nextLabel,
    finishLabel = WIZARD_DEFAULTS.finishLabel,
    editLabel = WIZARD_DEFAULTS.editLabel,
    optionalLabel = WIZARD_DEFAULTS.optionalLabel,
    loading: loadingProp,
    loadingLabel = WIZARD_DEFAULTS.loadingLabel,
    validationTitle = WIZARD_DEFAULTS.validationTitle,
    validationMessage = WIZARD_DEFAULTS.validationMessage,
    formatStepCounter = defaultStepCounter,
    headingLevel = WIZARD_DEFAULTS.headingLevel,
    stepperAriaLabel = WIZARD_DEFAULTS.stepperAriaLabel,
    className,
    ...rest
  },
  ref,
) {
  const baseId = `ds-wizard-${useId().replace(/:/g, "")}`;
  const total = steps.length + (showReview ? 1 : 0);
  const reviewIndex = showReview ? steps.length : -1;
  const lastIndex = Math.max(0, total - 1);

  const isControlled = activeStepProp !== undefined;
  const [inner, setInner] = useState(defaultActiveStep);
  const rawActive = isControlled ? (activeStepProp as number) : inner;
  const active = Math.min(Math.max(0, rawActive), lastIndex);
  const isReview = active === reviewIndex;
  const isLast = active === lastIndex;

  const [furthest, setFurthest] = useState(active);
  const [error, setError] = useState<WizardError | null>(null);
  const [validating, setValidating] = useState(false);
  const [focusTick, setFocusTick] = useState(0);
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = loadingProp !== undefined ? loadingProp : internalLoading;

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const runId = useRef(0);
  const pending = useRef(false);
  const errorSeq = useRef(0);
  const mounted = useRef(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    setFurthest((f) => (active > f ? active : f));
  }, [active]);

  /* Focus management: the step heading receives focus whenever the step changes or validation fails. */
  const prevActive = useRef(active);
  useIsoLayoutEffect(() => {
    if (prevActive.current === active) return; // not on mount (StrictMode-safe)
    prevActive.current = active;
    headingRef.current?.focus();
  }, [active]);

  useIsoLayoutEffect(() => {
    if (focusTick > 0) headingRef.current?.focus();
  }, [focusTick]);

  /* Finish going busy disables the button (native `disabled`), which would drop focus — keep it on the heading. */
  const prevLoading = useRef(loading);
  useIsoLayoutEffect(() => {
    if (loading && !prevLoading.current && typeof document !== "undefined") {
      const ae = document.activeElement;
      if (!ae || ae === document.body || footerRef.current?.contains(ae)) headingRef.current?.focus();
    }
    prevLoading.current = loading;
  }, [loading]);

  const goTo = useCallback(
    (index: number) => {
      const next = Math.min(Math.max(0, index), lastIndex);
      setError(null);
      if (next === active) return;
      if (!isControlled) setInner(next);
      onStepChange?.(next);
    },
    [active, isControlled, lastIndex, onStepChange],
  );

  const fail = (index: number, message: string) => {
    errorSeq.current += 1;
    if (index !== active) goTo(index);
    else setFocusTick((t) => t + 1);
    setError({ index, message: message || validationMessage, key: errorSeq.current });
  };

  /** Validates content steps [from, to) in order; returns the first failure or null. */
  const validateRange = async (from: number, to: number): Promise<{ index: number; message: string } | null> => {
    for (let i = from; i < Math.min(to, steps.length); i += 1) {
      const message = await runValidator(steps[i]?.validate);
      if (message !== null) return { index: i, message };
    }
    return null;
  };

  /** Serialises async validation; ignores stale results (unmount, or the step changed meanwhile). */
  const guarded = async (from: number, to: number, onValid: () => void) => {
    if (pending.current) return;
    pending.current = true;
    const id = ++runId.current;
    const startedAt = active;
    setValidating(true);
    try {
      const failure = await validateRange(from, to);
      if (!mounted.current || id !== runId.current || startedAt !== activeRef.current) return;
      if (failure) fail(failure.index, failure.message);
      else onValid();
    } finally {
      pending.current = false;
      if (mounted.current) setValidating(false);
    }
  };

  const finish = () =>
    guarded(0, steps.length, () => {
      setError(null);
      const result = onComplete?.();
      const isThenable =
        !!result && typeof (result as Promise<unknown>).then === "function";
      if (!isThenable || loadingProp !== undefined) return;
      setInternalLoading(true);
      const settle = () => {
        if (mounted.current) setInternalLoading(false);
      };
      (result as Promise<unknown>).then(settle, (err: unknown) => {
        settle();
        if (isDev()) {
          // eslint-disable-next-line no-console
          console.error("[Wizard] onComplete rejected — handle errors inside onComplete.", err);
        }
      });
    });

  const handleNext = () => {
    if (loading) return;
    if (isLast) {
      void finish();
      return;
    }
    void guarded(active, active + 1, () => goTo(active + 1));
  };

  const handleBack = () => {
    if (loading || active === 0) return;
    runId.current += 1; // drop any in-flight validation
    goTo(active - 1);
  };

  const handleStepper = (index: number) => {
    if (loading || index === active) return;
    if (index < active || !linear) {
      runId.current += 1;
      goTo(index);
      return;
    }
    if (index > furthest) return;
    void guarded(active, index, () => goTo(index));
  };

  if (total === 0) {
    return <div ref={ref} className={["ds-wizard", className].filter(Boolean).join(" ")} {...rest} />;
  }

  const Heading = `h${headingLevel}` as "h2";
  const headingId = `${baseId}-heading`;
  const descId = `${baseId}-desc`;
  const current = isReview ? null : steps[active];
  const title = isReview ? reviewTitle : current?.title;
  const description = isReview ? reviewDescription : current?.description;
  const hasDescription = description !== undefined && description !== null && description !== false;
  const showError = error !== null && error.index === active;

  const stepperDescription = (s: { description?: React.ReactNode; optional?: boolean }) => {
    if (!s.optional) return s.description;
    return s.description ? (
      <>
        {s.description}
        <span className="ds-wizard__optional"> · {optionalLabel}</span>
      </>
    ) : (
      <span className="ds-wizard__optional">{optionalLabel}</span>
    );
  };

  return (
    <div
      ref={ref}
      className={["ds-wizard", className].filter(Boolean).join(" ")}
      data-step={active}
      {...rest}
    >
      <Stepper
        className="ds-wizard__stepper"
        value={active}
        onValueChange={handleStepper}
        linear={false}
        ariaLabel={stepperAriaLabel}
        scrollable={total > 5}
      >
        {steps.map((s, i) => (
          <StepperStep
            key={s.id}
            label={s.title}
            description={stepperDescription(s)}
            disabled={(linear && i > furthest) || loading}
          />
        ))}
        {showReview ? (
          <StepperStep
            key={`${baseId}-review`}
            label={reviewTitle}
            disabled={(linear && reviewIndex > furthest) || loading}
          />
        ) : null}
      </Stepper>

      <div
        className="ds-wizard__panel"
        role="group"
        aria-labelledby={headingId}
        aria-describedby={hasDescription ? descId : undefined}
        aria-busy={validating || loading || undefined}
      >
        <Heading ref={headingRef} id={headingId} tabIndex={-1} className="ds-wizard__heading">
          <span className="ds-wizard__counter">{formatStepCounter(active + 1, total)}</span>
          <span className="ds-wizard__title">{title}</span>
        </Heading>
        {hasDescription ? (
          <p id={descId} className="ds-wizard__description">
            {description}
          </p>
        ) : null}

        {showError ? (
          <Alert key={error.key} className="ds-wizard__alert" variant="danger" live="assertive" title={validationTitle}>
            {error.message}
          </Alert>
        ) : null}

        {steps.map((s, i) => (
          <div key={s.id} className="ds-wizard__content" hidden={i !== active} data-step-id={s.id}>
            {s.content}
          </div>
        ))}

        {isReview ? (
          <ol className="ds-wizard__review">
            {steps.map((s, i) => (
              <li key={s.id} className="ds-wizard__review-item">
                <div className="ds-wizard__review-text">
                  <span className="ds-wizard__review-title">
                    {s.title}
                    {s.optional ? <span className="ds-wizard__optional"> · {optionalLabel}</span> : null}
                  </span>
                  {s.summary !== undefined && s.summary !== null ? (
                    <div className="ds-wizard__review-summary">{s.summary}</div>
                  ) : null}
                </div>
                <Button variant="link" size="sm" onClick={() => goTo(i)} disabled={loading}>
                  {editLabel}{" "}
                  <span className="sr-only">{s.title}</span>
                </Button>
              </li>
            ))}
          </ol>
        ) : null}
      </div>

      <div ref={footerRef} className="ds-wizard__footer">
        {active > 0 ? (
          <Button variant="outlineSecondary" onClick={handleBack} disabled={loading} data-wizard-action="back">
            {backLabel}
          </Button>
        ) : null}
        <div className="ds-wizard__footer-end">
          <Button
            variant="primary"
            onClick={handleNext}
            loading={isLast && loading}
            data-wizard-action={isLast ? "finish" : "next"}
          >
            {isLast ? finishLabel : nextLabel}
          </Button>
        </div>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {loading ? loadingLabel : ""}
      </div>
    </div>
  );
});

Wizard.displayName = "Wizard";

export { Wizard };
export default Wizard;
export type { WizardProps, WizardStep, WizardValidationResult, WizardHeadingLevel } from "./Wizard.types";
export { WIZARD_DEFAULTS } from "./Wizard.config";
