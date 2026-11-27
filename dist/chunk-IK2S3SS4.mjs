/* ucs:component-css */
import "./styles/components/molecules/Stepper/Stepper.css";
// src/components/molecules/Stepper/index.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function clampPct(n) {
  if (Number.isNaN(n))
    return 0;
  return Math.min(100, Math.max(0, n));
}
function defaultProgressPercent(activeIndex, stepCount) {
  if (stepCount <= 1)
    return 100;
  return clampPct(activeIndex / (stepCount - 1) * 100);
}
var StepperContext = createContext(null);
function useStepperContext(component) {
  const ctx = useContext(StepperContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Stepper>`);
  }
  return ctx;
}
function isStepperStep(el) {
  return React.isValidElement(el) && el.type.displayName === "StepperStep";
}
var Stepper = React.memo(function Stepper2({
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
}) {
  const reactId = useId();
  const baseId = `stepper-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState(defaultValue);
  const activeIndex = isControlled ? valueProp : inner;
  const steps = useMemo(
    () => React.Children.toArray(children).filter(isStepperStep),
    [children]
  );
  const stepCount = steps.length;
  const setActiveIndex = useCallback(
    (next) => {
      if (stepCount === 0)
        return;
      const clamped = Math.max(0, Math.min(stepCount - 1, next));
      if (!isControlled) {
        setInner(clamped);
      }
      onValueChange == null ? void 0 : onValueChange(clamped);
    },
    [isControlled, onValueChange, stepCount]
  );
  const safeIndex = stepCount > 0 ? Math.min(Math.max(activeIndex, 0), stepCount - 1) : 0;
  const progressPct = useMemo(() => {
    if (progressValueProp !== void 0) {
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
      appearance
    }),
    [activeIndex, setActiveIndex, stepCount, linear, baseId, size, trackMode, appearance]
  );
  const showContinuousTrack = trackMode === "continuous";
  const showSegmentTint = trackMode === "segments";
  return /* @__PURE__ */ jsx(StepperContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(
    "nav",
    {
      className: cls("ds-stepper", scrollable && "ds-stepper--scroll", className),
      "aria-label": ariaLabel,
      "data-size": size,
      "data-track-mode": trackMode,
      "data-appearance": appearance,
      style: {
        "--stepper-progress-pct": `${progressPct}%`,
        "--stepper-count": String(stepCount),
        /* Grid column count (markers + gaps): line runs between 1st & last marker centers */
        "--stepper-total-cols": String(Math.max(1, stepCount * 2 - 1))
      },
      ...rest,
      children: stepCount === 0 ? null : /* @__PURE__ */ jsxs(
        "div",
        {
          className: "ds-stepper__grid",
          style: { gridTemplateColumns: `repeat(${stepCount * 2 - 1}, minmax(0, 1fr))` },
          children: [
            /* @__PURE__ */ jsx("div", { className: "ds-stepper__track-shell", style: { gridColumn: "1 / -1", gridRow: 1 }, children: showContinuousTrack ? /* @__PURE__ */ jsxs("div", { className: "ds-stepper__track-inset", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsx("div", { className: "ds-stepper__track-line ds-stepper__track-line--bg" }),
              /* @__PURE__ */ jsx("div", { className: "ds-stepper__track-line ds-stepper__track-line--fill" })
            ] }) : null }),
            steps.map((step, index) => {
              const colMarker = index * 2 + 1;
              const colGap = index * 2 + 2;
              const isLast = index === stepCount - 1;
              return /* @__PURE__ */ jsxs(React.Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: "ds-stepper__cell ds-stepper__cell--marker", style: { gridColumn: colMarker, gridRow: 1 }, children: React.cloneElement(step, {
                  stepIndex: index,
                  stepPart: "marker"
                }) }),
                /* @__PURE__ */ jsx("div", { className: "ds-stepper__cell ds-stepper__cell--label", style: { gridColumn: colMarker, gridRow: 2 }, children: React.cloneElement(step, {
                  stepIndex: index,
                  stepPart: "text"
                }) }),
                !isLast ? /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cls(
                      "ds-stepper__gap",
                      showSegmentTint && index < safeIndex && "ds-stepper__gap--complete"
                    ),
                    style: { gridColumn: colGap, gridRow: 1 },
                    "aria-hidden": "true"
                  }
                ) : null
              ] }, `${baseId}-s-${index}`);
            })
          ]
        }
      )
    }
  ) });
});
var StepperStep = React.memo(function StepperStep2({
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
}) {
  const ctx = useStepperContext("StepperStep");
  const index = stepIndexProp != null ? stepIndexProp : 0;
  const labelId = `${ctx.baseId}-step-${index}-heading`;
  const state = index < ctx.activeIndex ? "complete" : index === ctx.activeIndex ? "current" : "upcoming";
  const blockedByLinear = ctx.linear && index > ctx.activeIndex;
  const isDisabled = Boolean(disabled || blockedByLinear);
  const handleMarkerClick = (e) => {
    onClick == null ? void 0 : onClick(e);
    if (e.defaultPrevented || isDisabled)
      return;
    ctx.setActiveIndex(index);
  };
  const handleLabelClick = (e) => {
    const ev = e;
    onClick == null ? void 0 : onClick(ev);
    if (e.defaultPrevented || isDisabled)
      return;
    ctx.setActiveIndex(index);
  };
  const showCheck = state === "complete" && showCheckWhenComplete;
  const markerContent = showCheck ? /* @__PURE__ */ jsx("svg", { className: "ds-stepper__check", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M13.5 4.5L6.5 11.5L3 8",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) : icon != null ? /* @__PURE__ */ jsx("span", { className: "ds-stepper__marker-icon-wrap", children: icon }) : markerText != null ? /* @__PURE__ */ jsx("span", { className: "ds-stepper__marker-inner", children: markerText }) : /* @__PURE__ */ jsx("span", { className: "ds-stepper__marker-inner", children: index + 1 });
  if (stepPart === "text") {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        id: labelId,
        className: cls("ds-stepper__label-block", className),
        "data-state": state,
        "data-interactive": !isDisabled ? "true" : void 0,
        onClick: handleLabelClick,
        children: [
          /* @__PURE__ */ jsx("span", { className: "ds-stepper__label", children: label }),
          description != null && description !== false ? /* @__PURE__ */ jsx("span", { className: "ds-stepper__description", children: description }) : null
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ...rest,
      type: "button",
      "aria-labelledby": `${labelId}-pos ${labelId}`,
      disabled: isDisabled,
      className: cls("ds-stepper__marker-btn", className),
      "data-state": state,
      "aria-current": state === "current" ? "step" : void 0,
      onClick: handleMarkerClick,
      children: [
        /* @__PURE__ */ jsx("span", { id: `${labelId}-pos`, className: "ds-stepper__sr", children: `Step ${index + 1} of ${ctx.stepCount}${state === "complete" ? ", completed" : ""}:` }),
        /* @__PURE__ */ jsx("span", { className: "ds-stepper__marker", "aria-hidden": "true", children: markerContent })
      ]
    }
  );
});
StepperStep.displayName = "StepperStep";
var Stepper_default = Stepper;

export {
  Stepper,
  StepperStep,
  Stepper_default
};
//# sourceMappingURL=chunk-IK2S3SS4.mjs.map