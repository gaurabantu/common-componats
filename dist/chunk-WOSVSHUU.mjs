/* ucs:component-css */
import "./styles/components/molecules/Form/Form.css";
// src/components/molecules/Form/index.tsx
import React from "react";

// src/components/molecules/Form/Form.config.ts
var FORM_DEFAULTS = {
  layout: "stacked",
  columns: 2,
  maxWidth: 520,
  titleAs: "h1",
  loadingLabel: "Submitting\u2026",
  errorSummaryTitle: "There is a problem",
  autoFocusErrorSummary: true
};
var FORM_BREAKPOINTS = ["base", "sm", "md", "lg"];

// src/components/molecules/Form/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cx(...values) {
  return values.filter(Boolean).join(" ");
}
function columnVars(columns) {
  const vars = {};
  if (typeof columns === "number") {
    const n = Math.max(1, Math.floor(columns) || 1);
    vars["--form-columns"] = n;
    vars["--form-cols-base"] = 1;
    vars["--form-cols-sm"] = n;
    return vars;
  }
  for (const bp of FORM_BREAKPOINTS) {
    const value = columns[bp];
    if (typeof value === "number" && Number.isFinite(value)) {
      vars[`--form-cols-${bp}`] = Math.max(1, Math.floor(value));
    }
  }
  return vars;
}
function collectValues(form) {
  const values = {};
  new FormData(form).forEach((value, key) => {
    const prev = values[key];
    if (prev === void 0)
      values[key] = value;
    else
      values[key] = Array.isArray(prev) ? [...prev, value] : [prev, value];
  });
  return values;
}
var Form = React.forwardRef(function Form2({
  badge,
  title,
  titleAs: TitleTag = FORM_DEFAULTS.titleAs,
  description,
  children,
  actions,
  footer,
  layout = FORM_DEFAULTS.layout,
  columns = FORM_DEFAULTS.columns,
  gap,
  maxWidth = FORM_DEFAULTS.maxWidth,
  onSubmit,
  onSubmitValues,
  loading = false,
  loadingLabel = FORM_DEFAULTS.loadingLabel,
  disabled = false,
  errorSummary,
  errorSummaryTitle = FORM_DEFAULTS.errorSummaryTitle,
  autoFocusErrorSummary = FORM_DEFAULTS.autoFocusErrorSummary,
  classNames,
  styles,
  shellClassName,
  cardClassName,
  contentClassName,
  fieldsClassName,
  shellStyle,
  cardStyle,
  contentStyle,
  fieldsStyle,
  className,
  style,
  ...rest
}, ref) {
  const baseId = React.useId().replace(/:/g, "");
  const summaryTitleId = `ds-form-summary-${baseId}`;
  const summaryRef = React.useRef(null);
  const hasErrors = Boolean(errorSummary && errorSummary.length > 0);
  const errorSignature = hasErrors ? errorSummary.map((e) => e.fieldId).join("|") : "";
  const prevSignatureRef = React.useRef(errorSignature);
  React.useEffect(() => {
    var _a;
    if (prevSignatureRef.current === errorSignature)
      return;
    prevSignatureRef.current = errorSignature;
    if (autoFocusErrorSummary && errorSignature)
      (_a = summaryRef.current) == null ? void 0 : _a.focus();
  }, [errorSignature, autoFocusErrorSummary]);
  const blocked = loading || disabled;
  const handleSubmit = (event) => {
    if (blocked) {
      event.preventDefault();
      return;
    }
    onSubmit == null ? void 0 : onSubmit(event);
    if (onSubmitValues) {
      event.preventDefault();
      onSubmitValues(collectValues(event.currentTarget), event);
    }
  };
  const focusField = (event, fieldId) => {
    const field = typeof document !== "undefined" ? document.getElementById(fieldId) : null;
    if (!field)
      return;
    event.preventDefault();
    if (typeof field.scrollIntoView === "function")
      field.scrollIntoView({ block: "center" });
    field.focus();
  };
  const cardVars = {
    maxWidth,
    ...columnVars(columns),
    ...gap !== void 0 ? { "--form-gap": typeof gap === "number" ? `${gap}px` : gap } : null,
    ...cardStyle,
    ...styles == null ? void 0 : styles.card,
    ...style
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: cx("ds-form-shell", shellClassName, classNames == null ? void 0 : classNames.shell),
      style: { ...shellStyle, ...styles == null ? void 0 : styles.shell },
      children: /* @__PURE__ */ jsxs("div", { className: cx("ds-form-card", cardClassName, classNames == null ? void 0 : classNames.card), style: cardVars, children: [
        (badge || title || description) && /* @__PURE__ */ jsxs("header", { className: "ds-form-header", children: [
          badge && /* @__PURE__ */ jsx("span", { className: "ds-form-badge", children: badge }),
          title && /* @__PURE__ */ jsx(TitleTag, { className: "ds-form-title", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "ds-form-description", children: description })
        ] }),
        /* @__PURE__ */ jsxs(
          "form",
          {
            ...rest,
            ref,
            onSubmit: handleSubmit,
            "aria-busy": loading || void 0,
            "data-loading": loading ? "true" : void 0,
            "data-disabled": disabled ? "true" : void 0,
            className: cx("ds-form-content", contentClassName, classNames == null ? void 0 : classNames.content, className),
            style: { ...contentStyle, ...styles == null ? void 0 : styles.content },
            children: [
              hasErrors && /* @__PURE__ */ jsxs(
                "div",
                {
                  ref: summaryRef,
                  className: "ds-form-error-summary",
                  role: "alert",
                  "aria-labelledby": summaryTitleId,
                  tabIndex: -1,
                  children: [
                    /* @__PURE__ */ jsx("h2", { id: summaryTitleId, className: "ds-form-error-summary__title", children: errorSummaryTitle }),
                    /* @__PURE__ */ jsx("ul", { className: "ds-form-error-summary__list", children: errorSummary.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: `#${item.fieldId}`,
                        className: "ds-form-error-summary__link",
                        onClick: (e) => focusField(e, item.fieldId),
                        children: item.message
                      }
                    ) }, item.fieldId)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("fieldset", { className: "ds-form-fieldset", disabled: blocked, role: "presentation", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: cx(
                    "ds-form-fields",
                    layout === "grid" && "ds-form-fields--grid",
                    fieldsClassName,
                    classNames == null ? void 0 : classNames.fields
                  ),
                  style: { ...fieldsStyle, ...styles == null ? void 0 : styles.fields },
                  children
                }
              ) }),
              (actions || footer) && /*
               * Actions share the form state: `disabled` → native `<fieldset disabled>` (buttons report
               * disabled). `loading` → `aria-disabled` on the group only, so a focused submit Button keeps
               * focus (focus-safe loading, Sprint 4); submit is blocked in `handleSubmit` either way.
               */
              /* @__PURE__ */ jsx(
                "fieldset",
                {
                  className: "ds-form-fieldset ds-form-actions-fieldset",
                  disabled,
                  "aria-disabled": blocked || void 0,
                  "data-state": disabled ? "disabled" : loading ? "loading" : void 0,
                  children: /* @__PURE__ */ jsxs("div", { className: "ds-form-actions", children: [
                    actions,
                    footer
                  ] })
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "ds-form-sr", role: "status", "aria-live": "polite", children: loading ? loadingLabel : "" })
            ]
          }
        )
      ] })
    }
  );
});
Form.displayName = "Form";
var Form_default = Form;

export {
  Form_default
};
//# sourceMappingURL=chunk-WOSVSHUU.mjs.map