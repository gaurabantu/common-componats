/* ucs:component-css */
import "./styles/components/molecules/ButtonGroup/ButtonGroup.css";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";

// src/components/molecules/ButtonGroup/index.tsx
import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useMemo
} from "react";

// src/components/molecules/ButtonGroup/ButtonGroup.config.ts
var BUTTON_GROUP_DEFAULTS = {
  orientation: "horizontal",
  // Joined segments were the only layout before `attached` existed — keep it the default.
  attached: true,
  disabled: false,
  fullWidth: false
};

// src/components/molecules/ButtonGroup/index.tsx
import { jsx } from "react/jsx-runtime";
var ButtonGroupContext = createContext(null);
function useButtonGroup(component) {
  const ctx = useContext(ButtonGroupContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <ButtonGroup>`);
  }
  return ctx;
}
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function augmentChildren(children, ctx) {
  return Children.map(Children.toArray(children), (child) => {
    if (!isValidElement(child))
      return child;
    if (child.type === Button_default) {
      const el = child;
      const next = {
        className: cls("ds-button-group__segment", el.props.className)
      };
      if (el.props.size === void 0 && ctx.size !== void 0)
        next.size = ctx.size;
      if (el.props.variant === void 0 && ctx.variant !== void 0)
        next.variant = ctx.variant;
      if (el.props.disabled === void 0 && ctx.disabled)
        next.disabled = true;
      return cloneElement(el, next);
    }
    return child;
  });
}
function useButtonGroupContext() {
  return useContext(ButtonGroupContext);
}
var ButtonGroupImpl = React.forwardRef(function ButtonGroup({
  children,
  orientation = BUTTON_GROUP_DEFAULTS.orientation,
  attached = BUTTON_GROUP_DEFAULTS.attached,
  size,
  variant,
  disabled,
  fullWidth = BUTTON_GROUP_DEFAULTS.fullWidth,
  className,
  ...rest
}, ref) {
  const parent = useContext(ButtonGroupContext);
  const effectiveSize = size != null ? size : parent == null ? void 0 : parent.size;
  const effectiveVariant = variant != null ? variant : parent == null ? void 0 : parent.variant;
  const effectiveDisabled = Boolean(disabled != null ? disabled : BUTTON_GROUP_DEFAULTS.disabled) || Boolean(parent == null ? void 0 : parent.disabled);
  const ctx = useMemo(
    () => ({
      orientation,
      attached,
      size: effectiveSize,
      variant: effectiveVariant,
      disabled: effectiveDisabled
    }),
    [orientation, attached, effectiveSize, effectiveVariant, effectiveDisabled]
  );
  return /* @__PURE__ */ jsx(ButtonGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      className: cls("ds-button-group", className),
      "data-orientation": orientation,
      "data-attached": attached ? "true" : "false",
      "data-full-width": fullWidth ? "true" : void 0,
      "aria-disabled": effectiveDisabled ? true : void 0,
      ...rest,
      children: augmentChildren(children, ctx)
    }
  ) });
});
ButtonGroupImpl.displayName = "ButtonGroup";
var ButtonGroup2 = React.memo(ButtonGroupImpl);
ButtonGroup2.displayName = "ButtonGroup";
var ButtonGroupSeparator = React.memo(function ButtonGroupSeparator2({
  orientation: orientationProp,
  className,
  ...rest
}) {
  const { orientation: parentOrientation } = useButtonGroup("ButtonGroupSeparator");
  const orientation = orientationProp != null ? orientationProp : parentOrientation === "horizontal" ? "vertical" : "horizontal";
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "separator",
      "aria-orientation": orientation === "vertical" ? "vertical" : "horizontal",
      className: cls("ds-button-group__separator", className),
      "data-orientation": orientation,
      ...rest
    }
  );
});
var ButtonGroupText = React.memo(function ButtonGroupText2({
  children,
  className,
  asChild = false,
  ...rest
}) {
  if (asChild && isValidElement(children)) {
    const ch = children;
    const childProps = ch.props;
    return cloneElement(ch, {
      ...rest,
      ...childProps,
      className: cls("ds-button-group__text", childProps.className, className)
    });
  }
  return /* @__PURE__ */ jsx("span", { className: cls("ds-button-group__text", className), ...rest, children });
});
var ButtonGroup_default = ButtonGroup2;

export {
  useButtonGroupContext,
  ButtonGroup2 as ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  ButtonGroup_default
};
//# sourceMappingURL=chunk-KVZBBE5O.mjs.map