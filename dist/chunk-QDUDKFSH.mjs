/* ucs:component-css */
import "./styles/components/molecules/SegmentedControl/SegmentedControl.css";
// src/components/molecules/SegmentedControl/index.tsx
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

// src/components/molecules/SegmentedControl/SegmentedControl.config.ts
var SEGMENTED_CONTROL_DEFAULTS = {
  size: "md",
  fullWidth: false
};
var SEGMENTED_CONTROL_SIZES = ["sm", "md"];

// src/components/molecules/SegmentedControl/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function isDev() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
function isTextLabel(label) {
  return typeof label === "string" && label.trim().length > 0 || typeof label === "number";
}
var useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
var SegmentedControl = React.forwardRef(function SegmentedControl2({
  options,
  value: valueProp,
  defaultValue,
  onValueChange,
  size = SEGMENTED_CONTROL_DEFAULTS.size,
  fullWidth = SEGMENTED_CONTROL_DEFAULTS.fullWidth,
  ariaLabel,
  disabled = false,
  className,
  onFocus,
  onBlur,
  ...rest
}, ref) {
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState(defaultValue);
  const selected = isControlled ? valueProp : inner;
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const focusWithin = useRef(false);
  const [box, setBox] = useState(null);
  const setRootRef = useCallback(
    (node) => {
      rootRef.current = node;
      if (typeof ref === "function")
        ref(node);
      else if (ref)
        ref.current = node;
    },
    [ref]
  );
  const isEnabled = (i) => !disabled && !!options[i] && !options[i].disabled;
  const selectedIndex = options.findIndex((o) => o.value === selected);
  const firstEnabled = options.findIndex((_, i) => isEnabled(i));
  const tabStop = selectedIndex >= 0 && isEnabled(selectedIndex) ? selectedIndex : firstEnabled;
  const select = (i) => {
    const opt = options[i];
    if (!opt || !isEnabled(i))
      return;
    if (opt.value === selected)
      return;
    if (!isControlled)
      setInner(opt.value);
    onValueChange == null ? void 0 : onValueChange(opt.value);
  };
  const moveTo = (i) => {
    var _a;
    (_a = itemRefs.current[i]) == null ? void 0 : _a.focus();
    select(i);
  };
  const step = (from, dir) => {
    const n = options.length;
    for (let k = 1; k <= n; k += 1) {
      const i = ((from + dir * k) % n + n) % n;
      if (isEnabled(i))
        return i;
    }
    return from;
  };
  const handleKeyDown = (e, index) => {
    const rtl = typeof window !== "undefined" && rootRef.current ? window.getComputedStyle(rootRef.current).direction === "rtl" : false;
    let target = -1;
    switch (e.key) {
      case "ArrowRight":
        target = step(index, rtl ? -1 : 1);
        break;
      case "ArrowLeft":
        target = step(index, rtl ? 1 : -1);
        break;
      case "ArrowDown":
        target = step(index, 1);
        break;
      case "ArrowUp":
        target = step(index, -1);
        break;
      case "Home":
        target = firstEnabled;
        break;
      case "End": {
        for (let i = options.length - 1; i >= 0; i -= 1) {
          if (isEnabled(i)) {
            target = i;
            break;
          }
        }
        break;
      }
      default:
        return;
    }
    e.preventDefault();
    if (target >= 0)
      moveTo(target);
  };
  const warned = useRef(/* @__PURE__ */ new Set());
  useEffect(() => {
    if (!isDev())
      return;
    options.forEach((o) => {
      if (isTextLabel(o.label) || o.ariaLabel && o.ariaLabel.trim() || warned.current.has(o.value))
        return;
      warned.current.add(o.value);
      console.warn(
        `[SegmentedControl] option "${o.value}" has a non-text label and no \`ariaLabel\`; the radio has no reliable accessible name.`
      );
    });
  }, [options]);
  const measure = useCallback(() => {
    const el = selectedIndex >= 0 ? itemRefs.current[selectedIndex] : null;
    if (!el || el.offsetWidth === 0) {
      setBox(null);
      return;
    }
    setBox((prev) => {
      const next = { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
      return prev && prev.x === next.x && prev.y === next.y && prev.w === next.w && prev.h === next.h ? prev : next;
    });
  }, [selectedIndex]);
  useIsoLayoutEffect(() => {
    measure();
  }, [measure, options, size, fullWidth]);
  useEffect(() => {
    if (typeof ResizeObserver === "undefined" || !rootRef.current)
      return void 0;
    const ro = new ResizeObserver(() => measure());
    ro.observe(rootRef.current);
    itemRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [measure, options.length]);
  useEffect(() => {
    var _a;
    if (!focusWithin.current || typeof document === "undefined")
      return;
    const active = document.activeElement;
    if (active && active !== document.body)
      return;
    if (tabStop >= 0)
      (_a = itemRefs.current[tabStop]) == null ? void 0 : _a.focus();
    else
      focusWithin.current = false;
  }, [tabStop, disabled, options]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setRootRef,
      role: "radiogroup",
      "aria-label": ariaLabel,
      "aria-disabled": disabled || void 0,
      className: ["ds-segmented", className].filter(Boolean).join(" "),
      "data-size": size,
      "data-full-width": fullWidth ? "true" : void 0,
      "data-indicator-ready": box ? "true" : void 0,
      onFocus: (e) => {
        focusWithin.current = true;
        onFocus == null ? void 0 : onFocus(e);
      },
      onBlur: (e) => {
        const next = e.relatedTarget;
        const inside = !!next && e.currentTarget.contains(next);
        const disabledNow = e.target.disabled === true;
        if (!inside && !disabledNow)
          focusWithin.current = false;
        onBlur == null ? void 0 : onBlur(e);
      },
      ...rest,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "ds-segmented__indicator",
            "aria-hidden": "true",
            style: box ? {
              "--ds-seg-x": `${box.x}px`,
              "--ds-seg-y": `${box.y}px`,
              "--ds-seg-w": `${box.w}px`,
              "--ds-seg-h": `${box.h}px`
            } : void 0
          }
        ),
        options.map((opt, i) => {
          const checked = i === selectedIndex;
          const enabled = isEnabled(i);
          const iconOnly = !isTextLabel(opt.label);
          const name = opt.ariaLabel && opt.ariaLabel.trim() ? opt.ariaLabel : void 0;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              ref: (node) => {
                itemRefs.current[i] = node;
              },
              type: "button",
              role: "radio",
              "aria-checked": checked,
              "aria-label": name,
              tabIndex: i === tabStop ? 0 : -1,
              disabled: !enabled,
              className: "ds-segmented__item",
              "data-state": checked ? "on" : "off",
              "data-icon-only": iconOnly ? "true" : void 0,
              onClick: () => select(i),
              onKeyDown: (e) => handleKeyDown(e, i),
              children: [
                opt.icon ? /* @__PURE__ */ jsx("span", { className: "ds-segmented__icon", "aria-hidden": "true", children: opt.icon }) : null,
                opt.label !== null && opt.label !== void 0 && opt.label !== false ? /* @__PURE__ */ jsx("span", { className: "ds-segmented__label", "aria-hidden": name && iconOnly ? "true" : void 0, children: opt.label }) : null
              ]
            },
            opt.value
          );
        })
      ]
    }
  );
});
SegmentedControl.displayName = "SegmentedControl";
var SegmentedControl_default = SegmentedControl;

export {
  SEGMENTED_CONTROL_DEFAULTS,
  SEGMENTED_CONTROL_SIZES,
  SegmentedControl,
  SegmentedControl_default
};
//# sourceMappingURL=chunk-QDUDKFSH.mjs.map