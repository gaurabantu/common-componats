/* ucs:component-css */
import "./styles/components/molecules/Wizard/Wizard.css";
import {
  Stepper,
  StepperStep
} from "./chunk-IK2S3SS4.mjs";
import {
  Alert_default
} from "./chunk-JNVGWTXU.mjs";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";

// src/components/molecules/Wizard/index.tsx
import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

// src/components/molecules/Wizard/Wizard.config.ts
var WIZARD_DEFAULTS = {
  defaultActiveStep: 0,
  linear: true,
  showReview: false,
  reviewTitle: "Review",
  backLabel: "Back",
  nextLabel: "Next",
  finishLabel: "Finish",
  editLabel: "Edit",
  optionalLabel: "Optional",
  loadingLabel: "Submitting\u2026",
  validationTitle: "Check this step",
  validationMessage: "Some information on this step is missing or invalid.",
  headingLevel: 2,
  stepperAriaLabel: "Progress"
};
var defaultStepCounter = (current, total) => `Step ${current} of ${total}`;
function toValidationError(result) {
  if (result === void 0 || result === true)
    return null;
  if (result === false)
    return "";
  if (typeof result === "string")
    return result;
  return null;
}
async function runValidator(validate) {
  if (!validate)
    return null;
  try {
    return toValidationError(await validate());
  } catch (e) {
    return "";
  }
}

// src/components/molecules/Wizard/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
function isDev() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
var Wizard = React.forwardRef(function Wizard2({
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
}, ref) {
  const baseId = `ds-wizard-${useId().replace(/:/g, "")}`;
  const total = steps.length + (showReview ? 1 : 0);
  const reviewIndex = showReview ? steps.length : -1;
  const lastIndex = Math.max(0, total - 1);
  const isControlled = activeStepProp !== void 0;
  const [inner, setInner] = useState(defaultActiveStep);
  const rawActive = isControlled ? activeStepProp : inner;
  const active = Math.min(Math.max(0, rawActive), lastIndex);
  const isReview = active === reviewIndex;
  const isLast = active === lastIndex;
  const [furthest, setFurthest] = useState(active);
  const [error, setError] = useState(null);
  const [validating, setValidating] = useState(false);
  const [focusTick, setFocusTick] = useState(0);
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = loadingProp !== void 0 ? loadingProp : internalLoading;
  const headingRef = useRef(null);
  const footerRef = useRef(null);
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
    setFurthest((f) => active > f ? active : f);
  }, [active]);
  const prevActive = useRef(active);
  useIsoLayoutEffect(() => {
    var _a;
    if (prevActive.current === active)
      return;
    prevActive.current = active;
    (_a = headingRef.current) == null ? void 0 : _a.focus();
  }, [active]);
  useIsoLayoutEffect(() => {
    var _a;
    if (focusTick > 0)
      (_a = headingRef.current) == null ? void 0 : _a.focus();
  }, [focusTick]);
  const prevLoading = useRef(loading);
  useIsoLayoutEffect(() => {
    var _a, _b;
    if (loading && !prevLoading.current && typeof document !== "undefined") {
      const ae = document.activeElement;
      if (!ae || ae === document.body || ((_a = footerRef.current) == null ? void 0 : _a.contains(ae)))
        (_b = headingRef.current) == null ? void 0 : _b.focus();
    }
    prevLoading.current = loading;
  }, [loading]);
  const goTo = useCallback(
    (index) => {
      const next = Math.min(Math.max(0, index), lastIndex);
      setError(null);
      if (next === active)
        return;
      if (!isControlled)
        setInner(next);
      onStepChange == null ? void 0 : onStepChange(next);
    },
    [active, isControlled, lastIndex, onStepChange]
  );
  const fail = (index, message) => {
    errorSeq.current += 1;
    if (index !== active)
      goTo(index);
    else
      setFocusTick((t) => t + 1);
    setError({ index, message: message || validationMessage, key: errorSeq.current });
  };
  const validateRange = async (from, to) => {
    var _a;
    for (let i = from; i < Math.min(to, steps.length); i += 1) {
      const message = await runValidator((_a = steps[i]) == null ? void 0 : _a.validate);
      if (message !== null)
        return { index: i, message };
    }
    return null;
  };
  const guarded = async (from, to, onValid) => {
    if (pending.current)
      return;
    pending.current = true;
    const id = ++runId.current;
    const startedAt = active;
    setValidating(true);
    try {
      const failure = await validateRange(from, to);
      if (!mounted.current || id !== runId.current || startedAt !== activeRef.current)
        return;
      if (failure)
        fail(failure.index, failure.message);
      else
        onValid();
    } finally {
      pending.current = false;
      if (mounted.current)
        setValidating(false);
    }
  };
  const finish = () => guarded(0, steps.length, () => {
    setError(null);
    const result = onComplete == null ? void 0 : onComplete();
    const isThenable = !!result && typeof result.then === "function";
    if (!isThenable || loadingProp !== void 0)
      return;
    setInternalLoading(true);
    const settle = () => {
      if (mounted.current)
        setInternalLoading(false);
    };
    result.then(settle, (err) => {
      settle();
      if (isDev()) {
        console.error("[Wizard] onComplete rejected \u2014 handle errors inside onComplete.", err);
      }
    });
  });
  const handleNext = () => {
    if (loading)
      return;
    if (isLast) {
      void finish();
      return;
    }
    void guarded(active, active + 1, () => goTo(active + 1));
  };
  const handleBack = () => {
    if (loading || active === 0)
      return;
    runId.current += 1;
    goTo(active - 1);
  };
  const handleStepper = (index) => {
    if (loading || index === active)
      return;
    if (index < active || !linear) {
      runId.current += 1;
      goTo(index);
      return;
    }
    if (index > furthest)
      return;
    void guarded(active, index, () => goTo(index));
  };
  if (total === 0) {
    return /* @__PURE__ */ jsx("div", { ref, className: ["ds-wizard", className].filter(Boolean).join(" "), ...rest });
  }
  const Heading = `h${headingLevel}`;
  const headingId = `${baseId}-heading`;
  const descId = `${baseId}-desc`;
  const current = isReview ? null : steps[active];
  const title = isReview ? reviewTitle : current == null ? void 0 : current.title;
  const description = isReview ? reviewDescription : current == null ? void 0 : current.description;
  const hasDescription = description !== void 0 && description !== null && description !== false;
  const showError = error !== null && error.index === active;
  const stepperDescription = (s) => {
    if (!s.optional)
      return s.description;
    return s.description ? /* @__PURE__ */ jsxs(Fragment, { children: [
      s.description,
      /* @__PURE__ */ jsxs("span", { className: "ds-wizard__optional", children: [
        " \xB7 ",
        optionalLabel
      ] })
    ] }) : /* @__PURE__ */ jsx("span", { className: "ds-wizard__optional", children: optionalLabel });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: ["ds-wizard", className].filter(Boolean).join(" "),
      "data-step": active,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs(
          Stepper,
          {
            className: "ds-wizard__stepper",
            value: active,
            onValueChange: handleStepper,
            linear: false,
            ariaLabel: stepperAriaLabel,
            scrollable: total > 5,
            children: [
              steps.map((s, i) => /* @__PURE__ */ jsx(
                StepperStep,
                {
                  label: s.title,
                  description: stepperDescription(s),
                  disabled: linear && i > furthest || loading
                },
                s.id
              )),
              showReview ? /* @__PURE__ */ jsx(
                StepperStep,
                {
                  label: reviewTitle,
                  disabled: linear && reviewIndex > furthest || loading
                },
                `${baseId}-review`
              ) : null
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "ds-wizard__panel",
            role: "group",
            "aria-labelledby": headingId,
            "aria-describedby": hasDescription ? descId : void 0,
            "aria-busy": validating || loading || void 0,
            children: [
              /* @__PURE__ */ jsxs(Heading, { ref: headingRef, id: headingId, tabIndex: -1, className: "ds-wizard__heading", children: [
                /* @__PURE__ */ jsx("span", { className: "ds-wizard__counter", children: formatStepCounter(active + 1, total) }),
                /* @__PURE__ */ jsx("span", { className: "ds-wizard__title", children: title })
              ] }),
              hasDescription ? /* @__PURE__ */ jsx("p", { id: descId, className: "ds-wizard__description", children: description }) : null,
              showError ? /* @__PURE__ */ jsx(Alert_default, { className: "ds-wizard__alert", variant: "danger", live: "assertive", title: validationTitle, children: error.message }, error.key) : null,
              steps.map((s, i) => /* @__PURE__ */ jsx("div", { className: "ds-wizard__content", hidden: i !== active, "data-step-id": s.id, children: s.content }, s.id)),
              isReview ? /* @__PURE__ */ jsx("ol", { className: "ds-wizard__review", children: steps.map((s, i) => /* @__PURE__ */ jsxs("li", { className: "ds-wizard__review-item", children: [
                /* @__PURE__ */ jsxs("div", { className: "ds-wizard__review-text", children: [
                  /* @__PURE__ */ jsxs("span", { className: "ds-wizard__review-title", children: [
                    s.title,
                    s.optional ? /* @__PURE__ */ jsxs("span", { className: "ds-wizard__optional", children: [
                      " \xB7 ",
                      optionalLabel
                    ] }) : null
                  ] }),
                  s.summary !== void 0 && s.summary !== null ? /* @__PURE__ */ jsx("div", { className: "ds-wizard__review-summary", children: s.summary }) : null
                ] }),
                /* @__PURE__ */ jsxs(Button_default, { variant: "link", size: "sm", onClick: () => goTo(i), disabled: loading, children: [
                  editLabel,
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: s.title })
                ] })
              ] }, s.id)) }) : null
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { ref: footerRef, className: "ds-wizard__footer", children: [
          active > 0 ? /* @__PURE__ */ jsx(Button_default, { variant: "outlineSecondary", onClick: handleBack, disabled: loading, "data-wizard-action": "back", children: backLabel }) : null,
          /* @__PURE__ */ jsx("div", { className: "ds-wizard__footer-end", children: /* @__PURE__ */ jsx(
            Button_default,
            {
              variant: "primary",
              onClick: handleNext,
              loading: isLast && loading,
              "data-wizard-action": isLast ? "finish" : "next",
              children: isLast ? finishLabel : nextLabel
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "sr-only", role: "status", "aria-live": "polite", children: loading ? loadingLabel : "" })
      ]
    }
  );
});
Wizard.displayName = "Wizard";
var Wizard_default = Wizard;

export {
  WIZARD_DEFAULTS,
  Wizard,
  Wizard_default
};
//# sourceMappingURL=chunk-VQ3XUAIC.mjs.map