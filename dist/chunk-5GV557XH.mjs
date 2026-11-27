/* ucs:component-css */
import "./styles/components/molecules/ToggleGroup/ToggleGroup.css";
import {
  ToggleButton_default,
  ToggleGroupContext
} from "./chunk-Y2Y53G35.mjs";

// src/components/molecules/ToggleGroup/index.tsx
import { Children, isValidElement, useCallback, useMemo, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function toArray(v) {
  if (Array.isArray(v))
    return v;
  return v ? [v] : [];
}
function ToggleGroup(props) {
  var _a, _b, _c;
  const {
    items,
    children,
    ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    size = "sm",
    variant = "ghost",
    disabled = false,
    orientation = "horizontal",
    rovingFocus = true,
    className,
    id,
    type
  } = props;
  const controlled = props.value !== void 0;
  const [internal, setInternal] = useState(() => toArray(props.defaultValue));
  const selected = controlled ? toArray(props.value) : internal;
  const itemValues = useMemo(() => {
    if (items)
      return items.filter((i) => !i.disabled).map((i) => i.value);
    const out = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child) && typeof child.props.value === "string" && !child.props.disabled) {
        out.push(child.props.value);
      }
    });
    return out;
  }, [items, children]);
  const [focused, setFocused] = useState(null);
  const tabStop = !rovingFocus ? null : focused && itemValues.includes(focused) ? focused : (_b = (_a = selected.find((v) => itemValues.includes(v))) != null ? _a : itemValues[0]) != null ? _b : null;
  const commit = useCallback(
    (next) => {
      var _a2, _b2, _c2;
      if (!controlled)
        setInternal(next);
      if (type === "single") {
        (_b2 = props.onValueChange) == null ? void 0 : _b2.call(props, (_a2 = next[0]) != null ? _a2 : null);
      } else {
        (_c2 = props.onValueChange) == null ? void 0 : _c2.call(props, next);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [controlled, type, props.onValueChange]
  );
  const allowDeselect = type === "single" ? (_c = props.allowDeselect) != null ? _c : true : true;
  const ctx = useMemo(
    () => ({
      isPressed: (v) => selected.includes(v),
      toggle: (v) => {
        const on = selected.includes(v);
        if (type === "single") {
          if (on) {
            if (allowDeselect)
              commit([]);
          } else
            commit([v]);
        } else {
          commit(on ? selected.filter((x) => x !== v) : [...selected, v]);
        }
      },
      size,
      variant,
      disabled,
      tabStop,
      setTabStop: setFocused
    }),
    [selected, type, allowDeselect, commit, size, variant, disabled, tabStop]
  );
  const rootRef = useRef(null);
  const onKeyDown = (e) => {
    if (!rovingFocus || !rootRef.current)
      return;
    const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    if (![prevKey, nextKey, "Home", "End"].includes(e.key))
      return;
    const buttons = Array.from(
      rootRef.current.querySelectorAll("button[data-ucs-toggle-item]:not(:disabled)")
    );
    if (buttons.length === 0)
      return;
    const current = buttons.indexOf(document.activeElement);
    let next = current;
    if (e.key === "Home")
      next = 0;
    else if (e.key === "End")
      next = buttons.length - 1;
    else if (e.key === nextKey)
      next = (current + 1) % buttons.length;
    else
      next = (current - 1 + buttons.length) % buttons.length;
    e.preventDefault();
    buttons[next].focus();
  };
  return /* @__PURE__ */ jsx(ToggleGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: rootRef,
      id,
      role: "group",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "data-orientation": orientation,
      "data-type": type,
      className: cls("ucs-toggle-group", className),
      onKeyDown,
      children: items ? items.map((it) => /* @__PURE__ */ jsx(
        ToggleButton_default,
        {
          value: it.value,
          icon: it.icon,
          ariaLabel: it.ariaLabel,
          disabled: it.disabled,
          title: it.title,
          children: it.label
        },
        it.value
      )) : children
    }
  ) });
}
ToggleGroup.displayName = "ToggleGroup";
var ToggleGroup_default = ToggleGroup;

export {
  ToggleGroup_default
};
//# sourceMappingURL=chunk-5GV557XH.mjs.map