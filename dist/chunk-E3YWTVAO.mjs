// src/components/molecules/Alert/Alert.config.ts
import React from "react";
var ALERT_DEFAULTS = {
  variant: "info",
  appearance: "soft",
  live: "off",
  dismissLabel: "Dismiss",
  srPrefix: true
};
var ALERT_SR_PREFIX = {
  info: "Information:",
  success: "Success:",
  warning: "Warning:",
  danger: "Error:",
  neutral: "Note:"
};
var ALERT_TONE_TOKENS = {
  info: { strong: "var(--color-info-strong)", fill: "var(--color-info-fill)" },
  success: { strong: "var(--color-success-strong)", fill: "var(--color-success-fill)" },
  warning: { strong: "var(--color-warning-strong)", fill: "var(--color-warning-fill)" },
  danger: { strong: "var(--color-danger-strong)", fill: "var(--color-danger-fill)" },
  neutral: { strong: "var(--color-text-primary)", fill: "var(--color-fill-muted)" }
};
function getToneStyle(variant) {
  const t = ALERT_TONE_TOKENS[variant];
  return { "--ds-feedback-strong": t.strong, "--ds-feedback-fill": t.fill };
}
function getLiveProps(variant, live) {
  if (live === "off")
    return {};
  if (live === "assertive" && (variant === "danger" || variant === "warning"))
    return { role: "alert" };
  return { role: "status", "aria-live": live };
}
var svgProps = {
  viewBox: "0 0 20 20",
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false"
};
var h = React.createElement;
var ICON_PATHS = {
  info: [h("circle", { key: "c", cx: 10, cy: 10, r: 7.5 }), h("path", { key: "p", d: "M10 9v4.5M10 6.5v.01" })],
  success: [h("circle", { key: "c", cx: 10, cy: 10, r: 7.5 }), h("path", { key: "p", d: "m6.75 10.25 2.25 2.25 4.25-4.75" })],
  warning: [
    h("path", { key: "t", d: "M8.7 3.4 2.3 14.5a1.5 1.5 0 0 0 1.3 2.25h12.8a1.5 1.5 0 0 0 1.3-2.25L11.3 3.4a1.5 1.5 0 0 0-2.6 0Z" }),
    h("path", { key: "p", d: "M10 8v3.5M10 14v.01" })
  ],
  danger: [h("circle", { key: "c", cx: 10, cy: 10, r: 7.5 }), h("path", { key: "p", d: "m7.5 7.5 5 5M12.5 7.5l-5 5" })],
  neutral: [h("circle", { key: "c", cx: 10, cy: 10, r: 7.5 }), h("path", { key: "p", d: "M10 6.5v4M10 13.5v.01" })]
};
function getAlertIcon(variant) {
  return h("svg", svgProps, ...ICON_PATHS[variant]);
}
function getCloseIcon() {
  return h("svg", { ...svgProps, width: 16, height: 16 }, h("path", { d: "m5.5 5.5 9 9M14.5 5.5l-9 9" }));
}

export {
  ALERT_DEFAULTS,
  ALERT_SR_PREFIX,
  ALERT_TONE_TOKENS,
  getToneStyle,
  getLiveProps,
  getAlertIcon,
  getCloseIcon
};
//# sourceMappingURL=chunk-E3YWTVAO.mjs.map