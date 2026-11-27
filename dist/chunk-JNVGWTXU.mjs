/* ucs:component-css */
import "./styles/components/molecules/Alert/Alert.css";
import {
  ALERT_DEFAULTS,
  ALERT_SR_PREFIX,
  getAlertIcon,
  getCloseIcon,
  getLiveProps,
  getToneStyle
} from "./chunk-E3YWTVAO.mjs";

// src/components/molecules/Alert/index.tsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Alert = React.forwardRef(function Alert2({
  variant = ALERT_DEFAULTS.variant,
  appearance = ALERT_DEFAULTS.appearance,
  title,
  children,
  icon,
  hideIcon = false,
  action,
  onDismiss,
  dismissLabel = ALERT_DEFAULTS.dismissLabel,
  compact = false,
  live = ALERT_DEFAULTS.live,
  srPrefix = ALERT_DEFAULTS.srPrefix,
  className,
  style,
  ...rest
}, ref) {
  const prefix = srPrefix ? /* @__PURE__ */ jsxs("span", { className: "ds-alert__sr", children: [
    ALERT_SR_PREFIX[variant],
    " "
  ] }) : null;
  const hasTitle = title !== void 0 && title !== null && title !== false;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: ["ds-alert", className].filter(Boolean).join(" "),
      "data-variant": variant,
      "data-appearance": appearance,
      "data-compact": compact ? "true" : void 0,
      style: { ...getToneStyle(variant), ...style },
      ...getLiveProps(variant, live),
      ...rest,
      children: [
        hideIcon ? null : /* @__PURE__ */ jsx("span", { className: "ds-alert__icon", "aria-hidden": "true", children: icon != null ? icon : getAlertIcon(variant) }),
        /* @__PURE__ */ jsxs("div", { className: "ds-alert__body", children: [
          hasTitle ? /* @__PURE__ */ jsxs("p", { className: "ds-alert__title", children: [
            prefix,
            title
          ] }) : null,
          children ? /* @__PURE__ */ jsxs("div", { className: "ds-alert__description", children: [
            hasTitle ? null : prefix,
            children
          ] }) : null
        ] }),
        action || onDismiss ? /* @__PURE__ */ jsxs("div", { className: "ds-alert__actions", children: [
          action ? /* @__PURE__ */ jsx("div", { className: "ds-alert__action", children: action }) : null,
          onDismiss ? /* @__PURE__ */ jsx("button", { type: "button", className: "ds-alert__dismiss", "aria-label": dismissLabel, onClick: onDismiss, children: getCloseIcon() }) : null
        ] }) : null
      ]
    }
  );
});
Alert.displayName = "Alert";
var Alert_default = Alert;

export {
  Alert_default
};
//# sourceMappingURL=chunk-JNVGWTXU.mjs.map