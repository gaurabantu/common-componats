/* ucs:component-css */
import "./styles/components/atoms/Switch/Switch.css";
// src/components/atoms/Switch/index.tsx
import React, { useCallback, useId, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var COLORS = {
  trackOff: "var(--color-mist-80)",
  trackOn: "var(--color-theme-primary, var(--color-brand-primary))",
  thumb: "var(--color-bg-surface)",
  border: "var(--color-border-default)",
  text: "var(--color-text-primary)",
  textMuted: "var(--color-text-secondary)"
};
var SIZE_STYLES = {
  sm: {
    track: { width: 34, height: 20, padding: 2, thumb: 16 },
    hitPadding: 6
  },
  md: {
    track: { width: 40, height: 22, padding: 2, thumb: 18 },
    hitPadding: 8
  }
};
var SwitchBase = React.forwardRef(function Switch({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  id: idProp,
  name,
  value = "on",
  uncheckedValue = "off",
  label,
  labelPosition = "end",
  "aria-label": ariaLabel,
  className,
  switchClassName,
  size = "md",
  hideLabel = false,
  onClick,
  style: styleProp,
  ...nativeProps
}, ref) {
  const reactId = useId();
  const switchId = idProp != null ? idProp : `switch-${reactId.replace(/:/g, "")}`;
  const labelId = `${switchId}-label`;
  const isControlled = checkedProp !== void 0;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? Boolean(checkedProp) : internalChecked;
  const setChecked = useCallback(
    (next) => {
      if (!isControlled) {
        setInternalChecked(next);
      }
      onCheckedChange == null ? void 0 : onCheckedChange(next);
    },
    [isControlled, onCheckedChange]
  );
  const toggle = useCallback(
    (e) => {
      onClick == null ? void 0 : onClick(e);
      if (disabled || e.defaultPrevented)
        return;
      setChecked(!checked);
    },
    [checked, disabled, onClick, setChecked]
  );
  const s = SIZE_STYLES[size];
  const { width: tw, height: th, padding: pad, thumb: thumbSize } = s.track;
  const thumbTravel = tw - thumbSize - pad * 2;
  const thumbX = checked ? thumbTravel : 0;
  const hasVisibleLabel = label != null && label !== false;
  const trackStyle = useMemo(
    () => ({
      position: "relative",
      width: tw,
      height: th,
      borderRadius: 9999,
      backgroundColor: checked ? COLORS.trackOn : COLORS.trackOff,
      border: `1px solid ${checked ? "transparent" : COLORS.border}`,
      transition: "background-color 160ms ease, border-color 160ms ease",
      flexShrink: 0
    }),
    [checked, th, tw]
  );
  const thumbStyle = useMemo(
    () => ({
      position: "absolute",
      left: pad,
      top: pad,
      width: thumbSize,
      height: thumbSize,
      borderRadius: "50%",
      backgroundColor: COLORS.thumb,
      boxShadow: "var(--shadow-thumb, 0 1px 3px rgba(0, 0, 0, 0.2))",
      transform: `translateX(${thumbX}px)`,
      transition: "transform 160ms ease"
    }),
    [pad, thumbSize, thumbX]
  );
  const buttonStyle = useMemo(
    () => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: s.hitPadding,
      margin: 0,
      minWidth: tw + s.hitPadding * 2,
      minHeight: th + s.hitPadding * 2,
      border: "none",
      background: "transparent",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      borderRadius: "var(--radius-lg, 8px)",
      boxSizing: "border-box"
    }),
    [disabled, s.hitPadding, th, tw]
  );
  const labelStyle = hideLabel ? {} : {
    color: disabled ? COLORS.textMuted : COLORS.text,
    fontSize: "var(--text-body-size, 16px)",
    lineHeight: 1.5,
    userSelect: "none",
    cursor: disabled ? "not-allowed" : "pointer"
  };
  const switchEl = /* @__PURE__ */ jsx(
    "button",
    {
      ...nativeProps,
      ref,
      type: "button",
      id: switchId,
      role: "switch",
      "aria-checked": checked,
      "aria-disabled": disabled,
      disabled,
      "aria-label": hasVisibleLabel ? void 0 : ariaLabel != null ? ariaLabel : "Toggle",
      className: cls("ucs-switch__control", switchClassName),
      style: styleProp ? { ...buttonStyle, ...styleProp } : buttonStyle,
      onClick: toggle,
      "data-state": checked ? "checked" : "unchecked",
      "data-disabled": disabled ? "" : void 0,
      children: /* @__PURE__ */ jsx("span", { "aria-hidden": true, style: trackStyle, children: /* @__PURE__ */ jsx("span", { style: thumbStyle }) })
    }
  );
  const labelEl = hasVisibleLabel ? /* @__PURE__ */ jsx(
    "label",
    {
      id: labelId,
      htmlFor: switchId,
      style: labelStyle,
      className: hideLabel ? "ucs-switch__label ucs-switch__label--hidden" : "ucs-switch__label",
      children: label
    }
  ) : null;
  const rowStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2, 8px)",
    maxWidth: "100%"
  };
  return /* @__PURE__ */ jsxs("div", { className: cls("ucs-switch", className), style: rowStyle, "data-hide-label": hideLabel ? "true" : void 0, children: [
    name ? /* @__PURE__ */ jsx("input", { type: "hidden", name, value: checked ? value : uncheckedValue, readOnly: true, "aria-hidden": true }) : null,
    hasVisibleLabel && labelPosition === "start" ? labelEl : null,
    switchEl,
    hasVisibleLabel && labelPosition === "end" ? labelEl : null
  ] });
});
SwitchBase.displayName = "Switch";
var Switch2 = React.memo(SwitchBase);
Switch2.displayName = "Switch";
var Switch_default = Switch2;

export {
  Switch_default
};
//# sourceMappingURL=chunk-JRGTFSWH.mjs.map