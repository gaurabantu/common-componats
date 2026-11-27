/* ucs:component-css */
import "./styles/components/molecules/FormField/FormField.css";
// src/components/molecules/FormField/index.tsx
import React, { createContext, useContext, useEffect, useId, useMemo, useRef } from "react";

// src/components/molecules/FormField/FormField.config.ts
var FORM_FIELD_DEFAULTS = {
  layout: "vertical",
  optionalLabel: "(optional)"
};
var FORM_FIELD_REQUIRED_SR_TEXT = "required";
var FORM_FIELD_CONSUMER_KEY = "__dsFormFieldConsumer";
var FORM_FIELD_LABELABLE_SELECTOR = 'input:not([type="hidden"]), select, textarea, button, meter, output, progress';

// src/components/molecules/FormField/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function hasContent(node) {
  return node !== void 0 && node !== null && node !== false && node !== "";
}
var LABELABLE_TAGS = /* @__PURE__ */ new Set(["input", "select", "textarea", "button", "meter", "output", "progress"]);
var FormFieldContext = createContext(null);
function useFormField() {
  return useContext(FormFieldContext);
}
function useAnnounceOnChange(value) {
  const initial = useRef(value);
  const changed = useRef(false);
  if (!changed.current && value !== initial.current)
    changed.current = true;
  return changed.current;
}
function isDev() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
function isFormFieldConsumer(type) {
  return Boolean(type && (typeof type === "object" || typeof type === "function") && type[FORM_FIELD_CONSUMER_KEY]);
}
var FormField = React.forwardRef(function FormField2({
  label,
  htmlFor,
  hint,
  error,
  required = false,
  optional = false,
  counter,
  layout = FORM_FIELD_DEFAULTS.layout,
  group = false,
  hideLabel = false,
  children,
  className,
  ...rest
}, ref) {
  var _a, _b;
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const child = React.isValidElement(children) && children.type !== React.Fragment ? children : null;
  const childProps = (_a = child == null ? void 0 : child.props) != null ? _a : {};
  const childId = typeof childProps.id === "string" && childProps.id ? childProps.id : void 0;
  const controlId = (_b = htmlFor != null ? htmlFor : childId) != null ? _b : `form-field-${reactId}`;
  const labelId = `${controlId}-label`;
  const showHint = hasContent(hint);
  const showError = hasContent(error);
  const hintId = showHint ? `${controlId}-hint` : void 0;
  const errorId = showError ? `${controlId}-error` : void 0;
  const counterId = counter ? `${controlId}-counter` : void 0;
  const describedBy = [hintId, errorId, counterId].filter(Boolean).join(" ") || void 0;
  const invalid = showError;
  const overLimit = counter ? counter.value > counter.max : false;
  const announceError = useAnnounceOnChange(error);
  const ctx = useMemo(
    () => ({ id: controlId, labelId, hintId, errorId, counterId, describedBy, invalid, required, group }),
    [controlId, labelId, hintId, errorId, counterId, describedBy, invalid, required, group]
  );
  const controlRef = useRef(null);
  useEffect(() => {
    var _a2;
    if (!isDev() || group)
      return;
    const root = controlRef.current;
    if (!root)
      return;
    const target = Array.from(root.querySelectorAll("[id]")).find((el) => el.id === controlId);
    const labelled = (_a2 = target == null ? void 0 : target.matches(FORM_FIELD_LABELABLE_SELECTOR)) != null ? _a2 : false;
    const byLabelledBy = Array.from(root.querySelectorAll("[aria-labelledby]")).some(
      (el) => {
        var _a3;
        return ((_a3 = el.getAttribute("aria-labelledby")) != null ? _a3 : "").split(/\s+/).includes(labelId);
      }
    );
    if (!labelled && !byLabelledBy) {
      console.warn(
        `[FormField] No labelable focusable element with id="${controlId}" (and no aria-labelledby="${labelId}") was found inside the field, so the label is not associated with the control. Use Input / TextArea / Select / Combobox / a native control, or wire a custom control with useFormField().`
      );
    }
  }, [controlId, labelId, group]);
  const isCompositeWrapper = htmlFor !== void 0 && child !== null && typeof child.type === "string" && !LABELABLE_TAGS.has(child.type);
  let control = children;
  if (child && !group && !isCompositeWrapper && !isFormFieldConsumer(child.type)) {
    const inject = {};
    if (childProps.id === void 0)
      inject.id = controlId;
    if (childProps["aria-describedby"] === void 0 && describedBy)
      inject["aria-describedby"] = describedBy;
    if (childProps["aria-invalid"] === void 0 && invalid)
      inject["aria-invalid"] = true;
    if (childProps["aria-required"] === void 0 && required)
      inject["aria-required"] = true;
    control = Object.keys(inject).length > 0 ? React.cloneElement(child, inject) : child;
  }
  const LabelTag = group ? "span" : "label";
  const optionalText = !required && optional ? typeof optional === "string" ? optional : FORM_FIELD_DEFAULTS.optionalLabel : null;
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cls("ds-form-field", className),
      "data-layout": layout,
      "data-invalid": invalid ? "true" : void 0,
      "data-group": group ? "true" : void 0,
      "data-hide-label": hideLabel ? "true" : void 0,
      ...group ? { role: "group", "aria-labelledby": labelId, "aria-describedby": describedBy } : {},
      ...rest,
      children: [
        /* @__PURE__ */ jsx("div", { className: "ds-form-field__label-col", children: /* @__PURE__ */ jsxs(
          LabelTag,
          {
            id: labelId,
            htmlFor: group ? void 0 : controlId,
            className: "ds-form-field__label",
            children: [
              label,
              required ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: "ds-form-field__required", "aria-hidden": "true", children: "*" }),
                /* @__PURE__ */ jsxs("span", { className: "sr-only", children: [
                  " ",
                  FORM_FIELD_REQUIRED_SR_TEXT
                ] })
              ] }) : null,
              optionalText ? /* @__PURE__ */ jsx("span", { className: "ds-form-field__optional", children: optionalText }) : null
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "ds-form-field__control-col", children: [
          /* @__PURE__ */ jsx("div", { ref: controlRef, className: "ds-form-field__control", children: control }),
          showHint || showError || counter ? /* @__PURE__ */ jsxs("div", { className: "ds-form-field__messages", children: [
            /* @__PURE__ */ jsxs("div", { className: "ds-form-field__texts", children: [
              showHint ? /* @__PURE__ */ jsx("p", { id: hintId, className: "ds-form-field__hint", children: hint }) : null,
              showError ? /* @__PURE__ */ jsxs("p", { id: errorId, className: "ds-form-field__error", role: announceError ? "alert" : void 0, children: [
                /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    className: "ds-form-field__error-icon",
                    viewBox: "0 0 16 16",
                    "aria-hidden": "true",
                    focusable: "false",
                    children: [
                      /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "6.25", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
                      /* @__PURE__ */ jsx("path", { d: "M8 4.75v3.75", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
                      /* @__PURE__ */ jsx("circle", { cx: "8", cy: "11", r: "0.9", fill: "currentColor" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: error })
              ] }) : null
            ] }),
            counter ? /* @__PURE__ */ jsxs("span", { id: counterId, className: "ds-form-field__counter", "data-over": overLimit ? "true" : void 0, children: [
              /* @__PURE__ */ jsxs("span", { "aria-hidden": "true", children: [
                counter.value,
                "/",
                counter.max
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "sr-only", children: [
                counter.value,
                " of ",
                counter.max,
                overLimit ? `, ${counter.value - counter.max} over the limit` : ""
              ] })
            ] }) : null
          ] }) : null,
          counter ? /* @__PURE__ */ jsx("span", { className: "sr-only", "aria-live": "polite", children: overLimit ? `Limit of ${counter.max} exceeded` : "" }) : null
        ] })
      ]
    }
  ) });
});
FormField.displayName = "FormField";
var FormField_default = FormField;

export {
  FORM_FIELD_CONSUMER_KEY,
  useFormField,
  FormField,
  FormField_default
};
//# sourceMappingURL=chunk-GJBU4OKB.mjs.map