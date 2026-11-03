import React from "react";
import type { CSSProperties, ReactElement } from "react";
import type { AlertLive, AlertVariant } from "./Alert.types";

/**
 * Shared variant config for `Alert` and `Toast` — the single place that maps a tone to
 * its icon, colour tokens, and screen-reader prefix. Toast imports from here.
 */

export const ALERT_DEFAULTS = {
  variant: "info" as AlertVariant,
  appearance: "soft" as const,
  live: "off" as AlertLive,
  dismissLabel: "Dismiss",
  srPrefix: true,
};

/** Visually-hidden word read before the message so meaning never depends on colour/icon alone. */
export const ALERT_SR_PREFIX: Record<AlertVariant, string> = {
  info: "Information:",
  success: "Success:",
  warning: "Warning:",
  danger: "Error:",
  neutral: "Note:",
};

/**
 * Colour tokens per tone.
 * - `strong` — icon, outline border, accent bar (non-text, ≥ 3:1)
 * - `fill` — soft background
 * Title text uses `color-mix(strong 80%, --color-text-primary)` in CSS (see Alert.css) because
 * raw `--color-info-strong` on the dark info fill is only 4.21:1.
 */
export const ALERT_TONE_TOKENS: Record<AlertVariant, { strong: string; fill: string }> = {
  info: { strong: "var(--color-info-strong)", fill: "var(--color-info-fill)" },
  success: { strong: "var(--color-success-strong)", fill: "var(--color-success-fill)" },
  warning: { strong: "var(--color-warning-strong)", fill: "var(--color-warning-fill)" },
  danger: { strong: "var(--color-danger-strong)", fill: "var(--color-danger-fill)" },
  neutral: { strong: "var(--color-text-primary)", fill: "var(--color-fill-muted)" },
};

/** CSS custom properties consumed by `.ds-alert` / `.ds-toast` (`--ds-feedback-strong`, `--ds-feedback-fill`). */
export function getToneStyle(variant: AlertVariant): CSSProperties {
  const t = ALERT_TONE_TOKENS[variant];
  return { "--ds-feedback-strong": t.strong, "--ds-feedback-fill": t.fill } as CSSProperties;
}

/** Live-region attributes. `off` → none, so a static alert is not announced on mount. */
export function getLiveProps(
  variant: AlertVariant,
  live: AlertLive,
): { role?: "alert" | "status"; "aria-live"?: "polite" | "assertive" } {
  if (live === "off") return {};
  if (live === "assertive" && (variant === "danger" || variant === "warning")) return { role: "alert" };
  return { role: "status", "aria-live": live };
}

const svgProps = {
  viewBox: "0 0 20 20",
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false",
};

const h = React.createElement;

const ICON_PATHS: Record<AlertVariant, ReactElement[]> = {
  info: [h("circle", { key: "c", cx: 10, cy: 10, r: 7.5 }), h("path", { key: "p", d: "M10 9v4.5M10 6.5v.01" })],
  success: [h("circle", { key: "c", cx: 10, cy: 10, r: 7.5 }), h("path", { key: "p", d: "m6.75 10.25 2.25 2.25 4.25-4.75" })],
  warning: [
    h("path", { key: "t", d: "M8.7 3.4 2.3 14.5a1.5 1.5 0 0 0 1.3 2.25h12.8a1.5 1.5 0 0 0 1.3-2.25L11.3 3.4a1.5 1.5 0 0 0-2.6 0Z" }),
    h("path", { key: "p", d: "M10 8v3.5M10 14v.01" }),
  ],
  danger: [h("circle", { key: "c", cx: 10, cy: 10, r: 7.5 }), h("path", { key: "p", d: "m7.5 7.5 5 5M12.5 7.5l-5 5" })],
  neutral: [h("circle", { key: "c", cx: 10, cy: 10, r: 7.5 }), h("path", { key: "p", d: "M10 6.5v4M10 13.5v.01" })],
};

/** Default decorative icon for a tone (inline SVG, `aria-hidden`). */
export function getAlertIcon(variant: AlertVariant): ReactElement {
  return h("svg", svgProps, ...ICON_PATHS[variant]);
}

/** Close (×) glyph used by the dismiss button of Alert and Toast. */
export function getCloseIcon(): ReactElement {
  return h("svg", { ...svgProps, width: 16, height: 16 }, h("path", { d: "m5.5 5.5 9 9M14.5 5.5l-9 9" }));
}
