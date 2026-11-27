/* ucs:component-css */
import "./styles/components/atoms/ToggleButton/ToggleButton.css";
// src/components/atoms/ToggleButton/index.tsx
import React2, { useCallback, useContext, useState } from "react";

// src/components/atoms/ToggleButton/ToggleGroupContext.ts
import React from "react";
var ToggleGroupContext = React.createContext(null);

// src/components/atoms/ToggleButton/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var ToggleButton = React2.forwardRef(function ToggleButton2({
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  size: sizeProp,
  variant: variantProp,
  icon,
  ariaLabel,
  "aria-label": ariaLabelAttr,
  value,
  children,
  className,
  disabled: disabledProp,
  onClick,
  onFocus,
  tabIndex,
  ...rest
}, ref) {
  var _a, _b;
  const group = useContext(ToggleGroupContext);
  const inGroup = group !== null && value !== void 0;
  const [internal, setInternal] = useState(defaultPressed);
  const pressed = inGroup ? group.isPressed(value) : pressedProp !== void 0 ? pressedProp : internal;
  const size = (_a = sizeProp != null ? sizeProp : group == null ? void 0 : group.size) != null ? _a : "sm";
  const variant = (_b = variantProp != null ? variantProp : group == null ? void 0 : group.variant) != null ? _b : "ghost";
  const disabled = Boolean(disabledProp || (group == null ? void 0 : group.disabled));
  const iconOnly = children === void 0 || children === null || children === false;
  const handleClick = useCallback(
    (e) => {
      onClick == null ? void 0 : onClick(e);
      if (e.defaultPrevented || disabled)
        return;
      if (inGroup) {
        group.toggle(value);
        return;
      }
      const next = !pressed;
      if (pressedProp === void 0)
        setInternal(next);
      onPressedChange == null ? void 0 : onPressedChange(next);
    },
    [onClick, disabled, inGroup, group, value, pressed, pressedProp, onPressedChange]
  );
  const roving = inGroup && group.tabStop !== null;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ...rest,
      ref,
      type: "button",
      "aria-pressed": pressed,
      "aria-label": ariaLabel != null ? ariaLabel : ariaLabelAttr,
      disabled,
      "data-state": pressed ? "on" : "off",
      "data-value": value,
      "data-ucs-toggle-item": inGroup ? "" : void 0,
      tabIndex: roving ? group.tabStop === value ? 0 : -1 : tabIndex,
      onFocus: (e) => {
        if (inGroup)
          group.setTabStop(value);
        onFocus == null ? void 0 : onFocus(e);
      },
      onClick: handleClick,
      className: cls(
        "btn-base ucs-toggle",
        `ucs-toggle--${variant}`,
        iconOnly ? `btn-icon-only-${size}` : `btn-size-${size}`,
        className
      ),
      children: [
        icon ? /* @__PURE__ */ jsx("span", { className: "ucs-toggle__icon", "aria-hidden": "true", children: icon }) : null,
        iconOnly ? null : /* @__PURE__ */ jsx("span", { className: "ucs-toggle__label", children })
      ]
    }
  );
});
ToggleButton.displayName = "ToggleButton";
var ToggleButton_default = ToggleButton;

export {
  ToggleGroupContext,
  ToggleButton_default
};
//# sourceMappingURL=chunk-Y2Y53G35.mjs.map