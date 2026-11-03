"use client";

import React from "react";
import {
  ALERT_DEFAULTS,
  ALERT_SR_PREFIX,
  getAlertIcon,
  getCloseIcon,
  getLiveProps,
  getToneStyle,
} from "./Alert.config";
import type { AlertProps } from "./Alert.types";
import "./Alert.css";

/**
 * Alert — inline, persistent message for pages and forms. Static by default (`live="off"`):
 * set `live` only when the alert appears in response to a user action and must be announced.
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
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
  },
  ref,
) {
  const prefix = srPrefix ? <span className="ds-alert__sr">{ALERT_SR_PREFIX[variant]} </span> : null;
  const hasTitle = title !== undefined && title !== null && title !== false;

  return (
    <div
      ref={ref}
      className={["ds-alert", className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-appearance={appearance}
      data-compact={compact ? "true" : undefined}
      style={{ ...getToneStyle(variant), ...style }}
      {...getLiveProps(variant, live)}
      {...rest}
    >
      {hideIcon ? null : (
        <span className="ds-alert__icon" aria-hidden="true">
          {icon ?? getAlertIcon(variant)}
        </span>
      )}
      <div className="ds-alert__body">
        {hasTitle ? (
          <p className="ds-alert__title">
            {prefix}
            {title}
          </p>
        ) : null}
        {children ? (
          <div className="ds-alert__description">
            {hasTitle ? null : prefix}
            {children}
          </div>
        ) : null}
      </div>
      {action || onDismiss ? (
        <div className="ds-alert__actions">
          {action ? <div className="ds-alert__action">{action}</div> : null}
          {onDismiss ? (
            <button type="button" className="ds-alert__dismiss" aria-label={dismissLabel} onClick={onDismiss}>
              {getCloseIcon()}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});

Alert.displayName = "Alert";

export default Alert;
export type { AlertProps, AlertVariant, AlertAppearance, AlertLive } from "./Alert.types";
export { ALERT_SR_PREFIX, ALERT_TONE_TOKENS, getAlertIcon, getLiveProps, getToneStyle } from "./Alert.config";
