"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";
import type {
  StepperContextValue,
  StepperProps,
  StepperStepProps,
  StepperTrackMode,
} from "./Stepper.types";
import "./Stepper.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function clampPct(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

function defaultProgressPercent(activeIndex: number, stepCount: number): number {
  if (stepCount <= 1) return 100;
  return clampPct((activeIndex / (stepCount - 1)) * 100);
}

const StepperContext = createContext<StepperContextValue | null>(null);

function useStepperContext(component: string): StepperContextValue {
  const ctx = useContext(StepperContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Stepper>`);
  }
  return ctx;
}

function isStepperStep(el: React.ReactNode): el is React.ReactElement<StepperStepProps> {
  return React.isValidElement(el) && (el.type as { displayName?: string }).displayName === "StepperStep";
}

export const Stepper = React.memo(function Stepper({
  children,
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  linear = false,
  ariaLabel = "Steps",
  size = "md",
  scrollable = false,
  trackMode = "continuous",
  progressValue: progressValueProp,
  appearance = "default",
  className,
  ...rest
}: StepperProps) {
  const reactId = useId();
  const baseId = `stepper-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const activeIndex = isControlled ? (valueProp as number) : inner;

  const steps = useMemo(
    () => React.Children.toArray(children).filter(isStepperStep),
    [children]
  );
  const stepCount = steps.length;

  const setActiveIndex = useCallback(
    (next: number) => {
      if (stepCount === 0) return;
      const clamped = Math.max(0, Math.min(stepCount - 1, next));
      if (!isControlled) {
        setInner(clamped);
      }
      onValueChange?.(clamped);
    },
    [isControlled, onValueChange, stepCount]
  );

  const safeIndex = stepCount > 0 ? Math.min(Math.max(activeIndex, 0), stepCount - 1) : 0;

  const progressPct = useMemo(() => {
    if (progressValueProp !== undefined) {
      return clampPct(progressValueProp);
    }
    return defaultProgressPercent(safeIndex, stepCount);
  }, [progressValueProp, safeIndex, stepCount]);

  const ctx = useMemo(
    () => ({
      activeIndex,
      setActiveIndex,
      stepCount,
      linear,
      baseId,
      size,
      trackMode,
      appearance,
    }),
    [activeIndex, setActiveIndex, stepCount, linear, baseId, size, trackMode, appearance]
  );

  const showContinuousTrack = trackMode === "continuous";
  const showSegmentTint = trackMode === "segments";

  return (
    <StepperContext.Provider value={ctx}>
      <nav
        className={cls("ds-stepper", scrollable && "ds-stepper--scroll", className)}
        aria-label={ariaLabel}
        data-size={size}
        data-track-mode={trackMode}
        data-appearance={appearance}
        style={
          {
            "--stepper-progress-pct": `${progressPct}%`,
            "--stepper-count": String(stepCount),
            /* Grid column count (markers + gaps): line runs between 1st & last marker centers */
            "--stepper-total-cols": String(Math.max(1, stepCount * 2 - 1)),
          } as React.CSSProperties
        }
        {...rest}
      >
        {stepCount === 0 ? null : (
          <div
            className="ds-stepper__grid"
            style={{ gridTemplateColumns: `repeat(${stepCount * 2 - 1}, minmax(0, 1fr))` }}
          >
            <div className="ds-stepper__track-shell" style={{ gridColumn: "1 / -1", gridRow: 1 }}>
              {showContinuousTrack ? (
                <div className="ds-stepper__track-inset" aria-hidden="true">
                  <div className="ds-stepper__track-line ds-stepper__track-line--bg" />
                  <div className="ds-stepper__track-line ds-stepper__track-line--fill" />
                </div>
              ) : null}
            </div>

            {steps.map((step, index) => {
              const colMarker = index * 2 + 1;
              const colGap = index * 2 + 2;
              const isLast = index === stepCount - 1;
              return (
                <React.Fragment key={`${baseId}-s-${index}`}>
                  <div className="ds-stepper__cell ds-stepper__cell--marker" style={{ gridColumn: colMarker, gridRow: 1 }}>
                    {React.cloneElement(step, {
                      stepIndex: index,
                      stepPart: "marker",
                      "aria-posinset": index + 1,
                      "aria-setsize": stepCount,
                    })}
                  </div>
                  <div className="ds-stepper__cell ds-stepper__cell--label" style={{ gridColumn: colMarker, gridRow: 2 }}>
                    {React.cloneElement(step, {
                      stepIndex: index,
                      stepPart: "text",
                    })}
                  </div>
                  {!isLast ? (
                    <div
                      className={cls(
                        "ds-stepper__gap",
                        showSegmentTint && index < safeIndex && "ds-stepper__gap--complete"
                      )}
                      style={{ gridColumn: colGap, gridRow: 1 }}
                      aria-hidden="true"
                    />
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </nav>
    </StepperContext.Provider>
  );
});

export const StepperStep = React.memo(function StepperStep({
  label,
  description,
  disabled = false,
  className,
  stepIndex: stepIndexProp,
  stepPart = "marker",
  icon,
  markerText,
  showCheckWhenComplete = true,
  onClick,
  ...rest
}: StepperStepProps) {
  const ctx = useStepperContext("StepperStep");
  const index = stepIndexProp ?? 0;
  const labelId = `${ctx.baseId}-step-${index}-heading`;

  const state =
    index < ctx.activeIndex ? "complete" : index === ctx.activeIndex ? "current" : "upcoming";

  const blockedByLinear = ctx.linear && index > ctx.activeIndex;
  const isDisabled = Boolean(disabled || blockedByLinear);

  const handleMarkerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || isDisabled) return;
    ctx.setActiveIndex(index);
  };

  const handleLabelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const ev = e as unknown as React.MouseEvent<HTMLButtonElement>;
    onClick?.(ev);
    if (e.defaultPrevented || isDisabled) return;
    ctx.setActiveIndex(index);
  };

  const showCheck =
    state === "complete" && showCheckWhenComplete;

  const markerContent = showCheck ? (
    <svg className="ds-stepper__check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.5 4.5L6.5 11.5L3 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : icon != null ? (
    <span className="ds-stepper__marker-icon-wrap">{icon}</span>
  ) : markerText != null ? (
    <span className="ds-stepper__marker-inner">{markerText}</span>
  ) : (
    <span className="ds-stepper__marker-inner">{index + 1}</span>
  );

  if (stepPart === "text") {
    return (
      <div
        id={labelId}
        className={cls("ds-stepper__label-block", className)}
        data-state={state}
        data-interactive={!isDisabled ? "true" : undefined}
        onClick={handleLabelClick}
      >
        <span className="ds-stepper__label">{label}</span>
        {description != null && description !== false ? (
          <span className="ds-stepper__description">{description}</span>
        ) : null}
      </div>
    );
  }

  return (
    <button
      {...rest}
      type="button"
      aria-labelledby={labelId}
      disabled={isDisabled}
      className={cls("ds-stepper__marker-btn", className)}
      data-state={state}
      aria-current={state === "current" ? "step" : undefined}
      onClick={handleMarkerClick}
    >
      <span className="ds-stepper__marker" aria-hidden="true">
        {markerContent}
      </span>
    </button>
  );
});

StepperStep.displayName = "StepperStep";

export default Stepper;

export type {
  StepperAppearance,
  StepperProps,
  StepperStepProps,
  StepperContextValue,
  StepperSize,
  StepperTrackMode,
} from "./Stepper.types";
