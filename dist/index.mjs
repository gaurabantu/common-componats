import {
  AreaChart_default,
  ComposedChart_default
} from "./chunk-YBKFG5DW.mjs";
import {
  AppShell,
  AppSidebar,
  AppTopbar_default,
  Avatar_default,
  DashboardShell_default,
  mergeSidebarTokensStyle,
  mergeTopbarTokensStyle,
  readAppSidebarPersist,
  writeAppSidebarPersist
} from "./chunk-WXJGE3UE.mjs";
import {
  ALERT_SR_PREFIX,
  Alert_default,
  Badge_default,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card_default,
  Chip,
  Combobox,
  DataTable_default,
  EmptyState,
  ErrorAnimation,
  ErrorState,
  FEEDBACK_ANIMATIONS,
  FeedbackState,
  FilterBar_default,
  Grid,
  GridItem,
  IconBox_default,
  InfoAnimation,
  NoDataAnimation,
  NoSearchResultsAnimation,
  OfflineAnimation,
  OfflineBanner,
  Pagination_default,
  StatCard_default,
  SuccessAnimation,
  Tag,
  escapeCsvCell,
  getAlertIcon,
  getCloseIcon,
  getItemRange,
  getPageCount,
  getPaginationRange,
  getToneStyle,
  toCsv
} from "./chunk-GLLY7LT7.mjs";
import {
  BarChart_default,
  ChartTooltip,
  LineChart_default,
  PieChart_default,
  pieLabelNamePercent
} from "./chunk-4PYPCMFJ.mjs";
import {
  DEFAULT_TOOLTIP_Z,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  FloatingLayerContext,
  Listbox,
  ListboxOption,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverContext,
  PopoverTrigger,
  computePopoverPosition,
  getAncestorZIndex,
  getMenuItems,
  handleMenuKeyNavigation,
  isTopFloatingLayer,
  popFloatingLayer,
  pushFloatingLayer,
  renderSlot,
  resolveLayerZIndex,
  restoreFocus
} from "./chunk-HACL7N2G.mjs";
import {
  Checkbox_default,
  FORM_FIELD_CONSUMER_KEY,
  FormField,
  Select_default,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
  Table_default,
  TextView_default,
  useFormField
} from "./chunk-ZKSRRLCO.mjs";
import {
  Button_default,
  Icon_default,
  TextInputSearch_default,
  TextInput_default,
  close_default,
  error_default,
  getSanitizeText,
  isSafeHref
} from "./chunk-EHTTS7LB.mjs";

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
  const { width: tw, height: th, padding: pad3, thumb: thumbSize } = s.track;
  const thumbTravel = tw - thumbSize - pad3 * 2;
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
      left: pad3,
      top: pad3,
      width: thumbSize,
      height: thumbSize,
      borderRadius: "50%",
      backgroundColor: COLORS.thumb,
      boxShadow: "var(--shadow-thumb, 0 1px 3px rgba(0, 0, 0, 0.2))",
      transform: `translateX(${thumbX}px)`,
      transition: "transform 160ms ease"
    }),
    [pad3, thumbSize, thumbX]
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

// src/components/atoms/ToggleButton/index.tsx
import React3, { useCallback as useCallback2, useContext, useState as useState2 } from "react";

// src/components/atoms/ToggleButton/ToggleGroupContext.ts
import React2 from "react";
var ToggleGroupContext = React2.createContext(null);

// src/components/atoms/ToggleButton/index.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function cls2(...parts) {
  return parts.filter(Boolean).join(" ");
}
var ToggleButton = React3.forwardRef(function ToggleButton2({
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
  const [internal, setInternal] = useState2(defaultPressed);
  const pressed = inGroup ? group.isPressed(value) : pressedProp !== void 0 ? pressedProp : internal;
  const size = (_a = sizeProp != null ? sizeProp : group == null ? void 0 : group.size) != null ? _a : "sm";
  const variant = (_b = variantProp != null ? variantProp : group == null ? void 0 : group.variant) != null ? _b : "ghost";
  const disabled = Boolean(disabledProp || (group == null ? void 0 : group.disabled));
  const iconOnly = children === void 0 || children === null || children === false;
  const handleClick = useCallback2(
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
  return /* @__PURE__ */ jsxs2(
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
      className: cls2(
        "btn-base ucs-toggle",
        `ucs-toggle--${variant}`,
        iconOnly ? `btn-icon-only-${size}` : `btn-size-${size}`,
        className
      ),
      children: [
        icon ? /* @__PURE__ */ jsx2("span", { className: "ucs-toggle__icon", "aria-hidden": "true", children: icon }) : null,
        iconOnly ? null : /* @__PURE__ */ jsx2("span", { className: "ucs-toggle__label", children })
      ]
    }
  );
});
ToggleButton.displayName = "ToggleButton";
var ToggleButton_default = ToggleButton;

// src/components/molecules/ToggleGroup/index.tsx
import { Children, isValidElement, useCallback as useCallback3, useMemo as useMemo2, useRef, useState as useState3 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
function cls3(...parts) {
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
  const [internal, setInternal] = useState3(() => toArray(props.defaultValue));
  const selected = controlled ? toArray(props.value) : internal;
  const itemValues = useMemo2(() => {
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
  const [focused, setFocused] = useState3(null);
  const tabStop = !rovingFocus ? null : focused && itemValues.includes(focused) ? focused : (_b = (_a = selected.find((v) => itemValues.includes(v))) != null ? _a : itemValues[0]) != null ? _b : null;
  const commit = useCallback3(
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
  const ctx = useMemo2(
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
  return /* @__PURE__ */ jsx3(ToggleGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx3(
    "div",
    {
      ref: rootRef,
      id,
      role: "group",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "data-orientation": orientation,
      "data-type": type,
      className: cls3("ucs-toggle-group", className),
      onKeyDown,
      children: items ? items.map((it) => /* @__PURE__ */ jsx3(
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

// src/components/atoms/Slider/index.tsx
import { useId as useId2, useRef as useRef2, useState as useState4 } from "react";
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function cls4(...parts) {
  return parts.filter(Boolean).join(" ");
}
function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}
function Slider(props) {
  var _a;
  const {
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    label,
    ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    showValue = false,
    valueFormatter,
    showMinMax = false,
    size = "md",
    id: idProp,
    name,
    className
  } = props;
  const reactId = useId2().replace(/:/g, "");
  const baseId = idProp != null ? idProp : `slider-${reactId}`;
  const labelId = `${baseId}-label`;
  const fmt = (v) => valueFormatter ? valueFormatter(v) : String(v);
  const span = max - min || 1;
  const pct = (v) => (clamp(v, min, max) - min) / span * 100;
  const isRange = props.range === true;
  const [internal, setInternal] = useState4(() => {
    var _a2, _b;
    if (isRange) {
      const d = (_a2 = props.defaultValue) != null ? _a2 : [min, max];
      return [clamp(d[0], min, max), clamp(d[1], min, max)];
    }
    return clamp((_b = props.defaultValue) != null ? _b : min, min, max);
  });
  const current = props.value !== void 0 ? props.value : internal;
  const latest = useRef2(current);
  latest.current = current;
  const emit = (next) => {
    var _a2, _b, _c, _d;
    if (props.value === void 0)
      setInternal(next);
    latest.current = next;
    if (isRange) {
      const p = props;
      (_a2 = p.onValueChange) == null ? void 0 : _a2.call(p, next);
      (_b = p.onChange) == null ? void 0 : _b.call(p, next);
    } else {
      const p = props;
      (_c = p.onValueChange) == null ? void 0 : _c.call(p, next);
      (_d = p.onChange) == null ? void 0 : _d.call(p, next);
    }
  };
  const commit = () => {
    var _a2, _b;
    if (isRange)
      (_a2 = props.onValueCommit) == null ? void 0 : _a2.call(props, latest.current);
    else
      (_b = props.onValueCommit) == null ? void 0 : _b.call(props, latest.current);
  };
  const commitHandlers = {
    onPointerUp: commit,
    onKeyUp: (e) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(e.key))
        commit();
    }
  };
  const hasLabel = label != null && label !== false;
  let control;
  let valueText;
  if (isRange) {
    const [lo, hi] = current;
    const thumbLabels = (_a = props.thumbLabels) != null ? _a : ["Minimum", "Maximum"];
    valueText = `${fmt(lo)} \u2013 ${fmt(hi)}`;
    const useLabelledBy = hasLabel || !ariaLabel && Boolean(ariaLabelledBy);
    const groupLabelId = hasLabel ? labelId : ariaLabelledBy;
    const thumbName = (i) => ariaLabel ? `${ariaLabel} ${thumbLabels[i].toLowerCase()}` : thumbLabels[i];
    const common = {
      type: "range",
      min,
      max,
      step,
      disabled,
      name,
      className: "ucs-slider__input",
      ...commitHandlers
    };
    control = /* @__PURE__ */ jsxs3(Fragment, { children: [
      /* @__PURE__ */ jsx4("div", { className: "ucs-slider__track", "aria-hidden": "true", children: /* @__PURE__ */ jsx4("div", { className: "ucs-slider__fill", style: { left: `${pct(lo)}%`, width: `${Math.max(0, pct(hi) - pct(lo))}%` } }) }),
      /* @__PURE__ */ jsx4(
        "input",
        {
          ...common,
          id: `${baseId}-low`,
          value: lo,
          "aria-label": useLabelledBy ? void 0 : thumbName(0),
          "aria-labelledby": useLabelledBy ? `${groupLabelId} ${baseId}-low-name` : void 0,
          "aria-valuetext": fmt(lo),
          style: { zIndex: lo >= max - step / 2 ? 3 : 2 },
          onChange: (e) => emit([Math.min(Number(e.target.value), hi), hi])
        }
      ),
      /* @__PURE__ */ jsx4(
        "input",
        {
          ...common,
          id: `${baseId}-high`,
          value: hi,
          "aria-label": useLabelledBy ? void 0 : thumbName(1),
          "aria-labelledby": useLabelledBy ? `${groupLabelId} ${baseId}-high-name` : void 0,
          "aria-valuetext": fmt(hi),
          style: { zIndex: 2 },
          onChange: (e) => emit([lo, Math.max(Number(e.target.value), lo)])
        }
      ),
      useLabelledBy && /* @__PURE__ */ jsxs3(Fragment, { children: [
        /* @__PURE__ */ jsx4("span", { id: `${baseId}-low-name`, hidden: true, children: thumbLabels[0] }),
        /* @__PURE__ */ jsx4("span", { id: `${baseId}-high-name`, hidden: true, children: thumbLabels[1] })
      ] })
    ] });
  } else {
    const v = current;
    valueText = fmt(v);
    control = /* @__PURE__ */ jsxs3(Fragment, { children: [
      /* @__PURE__ */ jsx4("div", { className: "ucs-slider__track", "aria-hidden": "true", children: /* @__PURE__ */ jsx4("div", { className: "ucs-slider__fill", style: { left: 0, width: `${pct(v)}%` } }) }),
      /* @__PURE__ */ jsx4(
        "input",
        {
          type: "range",
          id: baseId,
          className: "ucs-slider__input",
          min,
          max,
          step,
          value: v,
          name,
          disabled,
          "aria-label": hasLabel ? void 0 : ariaLabel != null ? ariaLabel : ariaLabelledBy ? void 0 : "Value",
          "aria-labelledby": hasLabel || ariaLabel ? void 0 : ariaLabelledBy,
          "aria-valuetext": valueFormatter ? fmt(v) : void 0,
          onChange: (e) => emit(Number(e.target.value)),
          ...commitHandlers
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: cls4(
        "ucs-slider",
        `ucs-slider--${size}`,
        isRange && "ucs-slider--range",
        disabled && "ucs-slider--disabled",
        className
      ),
      role: isRange ? "group" : void 0,
      "aria-labelledby": isRange && hasLabel ? labelId : void 0,
      "aria-label": isRange && !hasLabel ? ariaLabel : void 0,
      children: [
        (hasLabel || showValue) && /* @__PURE__ */ jsxs3("div", { className: "ucs-slider__header", children: [
          hasLabel ? isRange ? /* @__PURE__ */ jsx4("span", { id: labelId, children: label }) : /* @__PURE__ */ jsx4("label", { id: labelId, htmlFor: baseId, children: label }) : /* @__PURE__ */ jsx4("span", {}),
          showValue && /* @__PURE__ */ jsx4("output", { className: "ucs-slider__value", htmlFor: isRange ? `${baseId}-low ${baseId}-high` : baseId, "aria-live": "off", children: valueText })
        ] }),
        /* @__PURE__ */ jsx4("div", { className: "ucs-slider__control", children: control }),
        showMinMax && /* @__PURE__ */ jsxs3("div", { className: "ucs-slider__minmax", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx4("span", { children: fmt(min) }),
          /* @__PURE__ */ jsx4("span", { children: fmt(max) })
        ] })
      ]
    }
  );
}
Slider.displayName = "Slider";
var Slider_default = Slider;

// src/components/molecules/ColorPicker/index.tsx
import { useEffect, useId as useId3, useMemo as useMemo3, useRef as useRef3, useState as useState5 } from "react";

// src/components/molecules/ColorPicker/colorUtils.ts
function normalizeHex(input) {
  if (typeof input !== "string")
    return null;
  const s = input.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(s))
    return `#${s[0]}${s[0]}${s[1]}${s[1]}${s[2]}${s[2]}`;
  if (/^[0-9a-f]{6}$/.test(s))
    return `#${s}`;
  return null;
}
function cssColorToHex(css) {
  const hex = normalizeHex(css);
  if (hex)
    return hex;
  const m = css.trim().match(/^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/i);
  if (!m)
    return null;
  return `#${[m[1], m[2], m[3]].map((c) => Math.min(255, Number(c)).toString(16).padStart(2, "0")).join("")}`;
}
function resolveTokenHex(token, el = typeof document !== "undefined" ? document.documentElement : null) {
  if (!el || typeof getComputedStyle === "undefined")
    return null;
  const raw = getComputedStyle(el).getPropertyValue(token);
  return raw ? cssColorToHex(raw) : null;
}
var DEFAULT_COLOR_PICKER_PALETTE = [
  { value: "#0d0d0d", label: "Black", token: "--color-brand-primary" },
  { value: "#5e5e5e", label: "Dark grey", token: "--color-text-secondary" },
  { value: "#8a8a8a", label: "Grey", token: "--color-border-default" },
  { value: "#e0e0e0", label: "Light grey", token: "--color-mist-80" },
  { value: "#ffffff", label: "White", token: "--color-bg-surface" },
  { value: "#ff4d00", label: "Brand orange", token: "--color-brand-secondary" },
  { value: "#002475", label: "Navy", token: "--color-brand-link" },
  { value: "#28a745", label: "Success green", token: "--color-state-success" },
  { value: "#ffc107", label: "Warning yellow", token: "--color-state-warning" },
  { value: "#dc3545", label: "Error red", token: "--color-state-error" },
  { value: "#5b36a3", label: "Lavender", token: "--color-accent-lavender-fg" },
  { value: "#1a6bb5", label: "Sky", token: "--color-accent-sky-fg" },
  { value: "#1a7a4f", label: "Mint", token: "--color-accent-mint-fg" },
  { value: "#8a6d00", label: "Amber", token: "--color-accent-amber-fg" },
  { value: "#a3293d", label: "Rose", token: "--color-accent-rose-fg" },
  { value: "#b9a7ff", label: "Lavender medium", token: "--color-accent-lavender-40" },
  { value: "#a0d2ff", label: "Sky medium", token: "--color-accent-sky-40" },
  { value: "#a0e7c4", label: "Mint medium", token: "--color-accent-mint-40" },
  { value: "#ffd966", label: "Amber medium", token: "--color-accent-amber-40" },
  { value: "#ffb3bd", label: "Rose medium", token: "--color-accent-rose-40" },
  { value: "#eee7ff", label: "Lavender light", token: "--color-accent-lavender-10" },
  { value: "#e6f2ff", label: "Sky light", token: "--color-accent-sky-10" },
  { value: "#e9fff4", label: "Mint light", token: "--color-accent-mint-10" },
  { value: "#fff6dd", label: "Amber light", token: "--color-accent-amber-10" },
  { value: "#ffe9ec", label: "Rose light", token: "--color-accent-rose-10" }
];

// src/components/molecules/ColorPicker/index.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function cls5(...parts) {
  return parts.filter(Boolean).join(" ");
}
function inkFor(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16 & 255, n >> 8 & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.4 ? "#0d0d0d" : "#ffffff";
}
function ColorPicker({
  value: valueProp,
  defaultValue,
  onChange,
  onValueChange,
  palette,
  columns,
  showHexInput = true,
  showNativePicker = false,
  resolveTokens = false,
  label,
  ariaLabel = "Colour",
  swatchSize = "md",
  disabled = false,
  id: idProp,
  name,
  className
}) {
  const reactId = useId3().replace(/:/g, "");
  const baseId = idProp != null ? idProp : `color-picker-${reactId}`;
  const labelId = `${baseId}-label`;
  const hexId = `${baseId}-hex`;
  const errId = `${baseId}-hex-error`;
  const [internal, setInternal] = useState5(() => normalizeHex(defaultValue));
  const value = valueProp !== void 0 ? normalizeHex(valueProp) : internal;
  const baseSwatches = useMemo3(
    () => (palette != null ? palette : DEFAULT_COLOR_PICKER_PALETTE).map((p) => typeof p === "string" ? { value: p } : p).map((p) => {
      var _a;
      return { ...p, value: (_a = normalizeHex(p.value)) != null ? _a : p.value };
    }).filter((p) => normalizeHex(p.value) !== null),
    [palette]
  );
  const [resolved, setResolved] = useState5(null);
  useEffect(() => {
    if (!resolveTokens) {
      setResolved(null);
      return;
    }
    setResolved(baseSwatches.map((s) => {
      var _a;
      return s.token ? { ...s, value: (_a = resolveTokenHex(s.token)) != null ? _a : s.value } : s;
    }));
  }, [baseSwatches, resolveTokens]);
  const swatches = resolveTokens && resolved || baseSwatches;
  const cols = Math.max(1, columns != null ? columns : palette ? 8 : 5);
  const emit = (hex) => {
    if (valueProp === void 0)
      setInternal(hex);
    onChange == null ? void 0 : onChange(hex);
    onValueChange == null ? void 0 : onValueChange(hex);
  };
  const selectedIdx = swatches.findIndex((s) => s.value === value);
  const [focusIdx, setFocusIdx] = useState5(null);
  const tabIdx = focusIdx != null ? focusIdx : selectedIdx >= 0 ? selectedIdx : 0;
  const btnRefs = useRef3([]);
  const move = (to) => {
    var _a;
    const i = Math.max(0, Math.min(swatches.length - 1, to));
    setFocusIdx(i);
    (_a = btnRefs.current[i]) == null ? void 0 : _a.focus();
    emit(swatches[i].value);
  };
  const onSwatchKey = (e, i) => {
    let to = null;
    switch (e.key) {
      case "ArrowRight":
        to = (i + 1) % swatches.length;
        break;
      case "ArrowLeft":
        to = (i - 1 + swatches.length) % swatches.length;
        break;
      case "ArrowDown":
        to = i + cols < swatches.length ? i + cols : i;
        break;
      case "ArrowUp":
        to = i - cols >= 0 ? i - cols : i;
        break;
      case "Home":
        to = 0;
        break;
      case "End":
        to = swatches.length - 1;
        break;
      case " ":
      case "Enter":
        e.preventDefault();
        emit(swatches[i].value);
        return;
      default:
        return;
    }
    e.preventDefault();
    move(to);
  };
  const [draft, setDraft] = useState5(value != null ? value : "");
  const [invalid, setInvalid] = useState5(false);
  const editing = useRef3(false);
  useEffect(() => {
    if (!editing.current) {
      setDraft(value != null ? value : "");
      setInvalid(false);
    }
  }, [value]);
  const commitDraft = () => {
    const hex = normalizeHex(draft);
    if (hex) {
      setInvalid(false);
      setDraft(hex);
      if (hex !== value)
        emit(hex);
    } else if (draft.trim() === "") {
      setInvalid(false);
      setDraft(value != null ? value : "");
    } else {
      setInvalid(true);
    }
  };
  const hasLabel = label != null && label !== false;
  return /* @__PURE__ */ jsxs4("div", { className: cls5("ucs-color-picker", `ucs-color-picker--${swatchSize}`, className), id: baseId, children: [
    hasLabel && /* @__PURE__ */ jsx5("span", { id: labelId, className: "ucs-color-picker__label", children: label }),
    name ? /* @__PURE__ */ jsx5("input", { type: "hidden", name, value: value != null ? value : "" }) : null,
    /* @__PURE__ */ jsx5(
      "div",
      {
        role: "radiogroup",
        "aria-labelledby": hasLabel ? labelId : void 0,
        "aria-label": hasLabel ? void 0 : ariaLabel,
        "aria-disabled": disabled || void 0,
        className: "ucs-color-picker__grid",
        style: { ["--ucs-cols"]: cols },
        children: swatches.map((s, i) => {
          var _a;
          const checked = i === selectedIdx;
          const swatchName = (_a = s.label) != null ? _a : s.value;
          return /* @__PURE__ */ jsx5(
            "button",
            {
              ref: (el) => {
                btnRefs.current[i] = el;
              },
              type: "button",
              role: "radio",
              "aria-checked": checked,
              "aria-label": swatchName,
              title: s.label ? `${s.label} (${s.value})` : s.value,
              tabIndex: i === tabIdx ? 0 : -1,
              disabled,
              className: "ucs-color-picker__swatch",
              style: { backgroundColor: s.value },
              "data-value": s.value,
              onClick: () => {
                setFocusIdx(i);
                emit(s.value);
              },
              onFocus: () => setFocusIdx(i),
              onKeyDown: (e) => onSwatchKey(e, i),
              children: checked && /* @__PURE__ */ jsx5("svg", { className: "ucs-color-picker__check", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ jsx5("path", { d: "M3 8.5l3 3 7-7", fill: "none", stroke: inkFor(s.value), strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) })
            },
            `${s.value}-${i}`
          );
        })
      }
    ),
    (showHexInput || showNativePicker) && /* @__PURE__ */ jsxs4("div", { className: "ucs-color-picker__row", children: [
      /* @__PURE__ */ jsx5("span", { className: "ucs-color-picker__preview", "aria-hidden": "true", style: { backgroundColor: value != null ? value : "transparent" } }),
      showHexInput && /* @__PURE__ */ jsx5(
        "input",
        {
          id: hexId,
          type: "text",
          className: "ucs-color-picker__hex",
          inputMode: "text",
          autoComplete: "off",
          spellCheck: false,
          maxLength: 7,
          placeholder: "#rrggbb",
          "aria-label": hasLabel ? void 0 : `${ariaLabel} hex value`,
          "aria-labelledby": hasLabel ? `${labelId} ${hexId}-name` : void 0,
          "aria-invalid": invalid || void 0,
          "aria-describedby": invalid ? errId : void 0,
          disabled,
          value: draft,
          onFocus: () => {
            editing.current = true;
          },
          onChange: (e) => {
            const next = e.target.value;
            setDraft(next);
            const s = next.trim().replace(/^#/, "");
            if (/^[0-9a-fA-F]{6}$/.test(s)) {
              setInvalid(false);
              const hex = `#${s.toLowerCase()}`;
              if (hex !== value)
                emit(hex);
            }
          },
          onBlur: () => {
            editing.current = false;
            commitDraft();
          },
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitDraft();
            } else if (e.key === "Escape") {
              setDraft(value != null ? value : "");
              setInvalid(false);
            }
          }
        }
      ),
      hasLabel && showHexInput && /* @__PURE__ */ jsx5("span", { id: `${hexId}-name`, hidden: true, children: "hex value" }),
      showNativePicker && /* @__PURE__ */ jsx5(
        "input",
        {
          type: "color",
          className: "ucs-color-picker__native",
          "aria-label": `${typeof label === "string" ? label : ariaLabel} custom colour`,
          disabled,
          value: value != null ? value : "#000000",
          onChange: (e) => {
            const hex = normalizeHex(e.target.value);
            if (hex)
              emit(hex);
          }
        }
      )
    ] }),
    invalid && /* @__PURE__ */ jsx5("span", { id: errId, className: "ucs-color-picker__error", role: "alert", children: "Enter a hex colour like #1a6bb5" })
  ] });
}
ColorPicker.displayName = "ColorPicker";
var ColorPicker_default = ColorPicker;

// src/components/atoms/RadioGroup/RadioGroup.config.ts
var defaultRadioColorClass = "";
var defaultLabelColorClass = "title-2";

// src/components/atoms/RadioGroup/RadioGroup.utils.ts
function cls6(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/atoms/RadioGroup/index.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var RadioButton = ({
  label,
  subLabel,
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
  radioColorClass = defaultRadioColorClass,
  labelColorClass = defaultLabelColorClass,
  itemMarginClass,
  tabIndex,
  shape = "default",
  rounded = "3",
  withShadow = false
}) => {
  const isBox = shape === "box";
  const id = `${name}-${value}`;
  const colors = {
    brand: "var(--color-control-checked-border, var(--color-brand-primary))",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    bgSurface: "var(--color-bg-surface)",
    borderDefault: "var(--color-border-default)",
    accentLavender: "var(--color-selected-bg, var(--color-accent-lavender-10))",
    shadow: "var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08))"
  };
  const roundedStyle = rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px";
  const wrapperStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    width: isBox ? "100%" : void 0,
    minWidth: isBox ? "160px" : void 0,
    padding: isBox ? "12px" : 0,
    border: isBox ? `1.5px solid ${checked ? colors.brand : colors.borderDefault}` : "none",
    borderRadius: isBox ? roundedStyle : void 0,
    backgroundColor: isBox ? checked ? colors.accentLavender : colors.bgSurface : "transparent",
    boxShadow: isBox && withShadow && !disabled ? colors.shadow : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? "none" : "auto",
    ...isBox ? {
      transition: "border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.2s ease"
    } : {}
  };
  const labelStyle = {
    color: disabled ? colors.textSecondary : colors.textPrimary,
    lineHeight: 1.5,
    whiteSpace: "normal",
    wordBreak: "break-word"
  };
  return /* @__PURE__ */ jsxs5(
    "label",
    {
      htmlFor: id,
      className: cls6("ucs-cc-radio-root", itemMarginClass),
      style: wrapperStyle,
      children: [
        /* @__PURE__ */ jsx6(
          "input",
          {
            id,
            type: "radio",
            name,
            value,
            checked,
            disabled,
            onChange,
            tabIndex,
            className: "peer ucs-cc-radio-native"
          }
        ),
        /* @__PURE__ */ jsx6(
          "span",
          {
            "aria-hidden": "true",
            className: cls6("ucs-cc-radio-face", radioColorClass),
            children: /* @__PURE__ */ jsx6("span", { className: "ucs-cc-radio-dot" })
          }
        ),
        /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx6(
            "span",
            {
              className: cls6(labelColorClass),
              style: labelStyle,
              children: label
            }
          ),
          subLabel && /* @__PURE__ */ jsx6(
            TextView_default,
            {
              as: "small",
              style: {
                marginTop: 4,
                color: colors.textSecondary,
                fontStyle: "italic"
              },
              children: subLabel
            }
          )
        ] })
      ]
    }
  );
};
var RadioGroup = ({
  options,
  name,
  selectedValue,
  onChange,
  layout = "vertical",
  columns = 3,
  minWidth = "160px",
  gap = "12px",
  radioColorClass,
  labelColorClass,
  ariaLabelledBy
}) => {
  const labelledById = ariaLabelledBy != null ? ariaLabelledBy : `${name}-label`;
  const fixedGridStyle = layout === "grid" ? {
    display: "grid",
    gap,
    gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`
  } : {};
  const autoGridStyle = layout === "grid-auto" ? {
    display: "grid",
    gap,
    gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`
  } : {};
  const finalStyle = {
    display: layout === "vertical" ? "flex" : layout === "horizontal" ? "flex" : void 0,
    flexDirection: layout === "vertical" ? "column" : layout === "horizontal" ? "row" : void 0,
    alignItems: layout === "horizontal" ? "flex-start" : void 0,
    gap: layout === "horizontal" ? gap : void 0,
    ...fixedGridStyle,
    ...autoGridStyle
  };
  const itemMarginClass = "";
  const hasCheckedValue = options.some((opt) => opt.value === selectedValue);
  const firstEnabledIndex = options.findIndex((opt) => !opt.disabled);
  return /* @__PURE__ */ jsxs5(
    "fieldset",
    {
      className: "",
      style: finalStyle,
      "aria-labelledby": labelledById,
      children: [
        /* @__PURE__ */ jsx6("legend", { id: labelledById, className: "visually-hidden", children: name }),
        options.map((opt, index) => {
          var _a;
          const isChecked = selectedValue === opt.value;
          let tabIndex = -1;
          if (isChecked) {
            tabIndex = 0;
          } else if (!hasCheckedValue && index === firstEnabledIndex) {
            tabIndex = 0;
          }
          return /* @__PURE__ */ jsx6(
            RadioButton,
            {
              name,
              label: opt.label,
              subLabel: opt.subLabel,
              value: opt.value,
              checked: isChecked,
              onChange: () => onChange(opt.value),
              radioColorClass,
              labelColorClass,
              itemMarginClass,
              shape: opt.shape,
              rounded: opt.rounded,
              withShadow: opt.withShadow,
              disabled: (_a = opt.disabled) != null ? _a : false,
              tabIndex
            },
            opt.value
          );
        })
      ]
    }
  );
};
var RadioGroup_default = RadioGroup;

// src/components/molecules/Form/index.tsx
import React7 from "react";

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
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
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
var Form = React7.forwardRef(function Form2({
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
  const baseId = React7.useId().replace(/:/g, "");
  const summaryTitleId = `ds-form-summary-${baseId}`;
  const summaryRef = React7.useRef(null);
  const hasErrors = Boolean(errorSummary && errorSummary.length > 0);
  const errorSignature = hasErrors ? errorSummary.map((e) => e.fieldId).join("|") : "";
  const prevSignatureRef = React7.useRef(errorSignature);
  React7.useEffect(() => {
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
  return /* @__PURE__ */ jsx7(
    "section",
    {
      className: cx("ds-form-shell", shellClassName, classNames == null ? void 0 : classNames.shell),
      style: { ...shellStyle, ...styles == null ? void 0 : styles.shell },
      children: /* @__PURE__ */ jsxs6("div", { className: cx("ds-form-card", cardClassName, classNames == null ? void 0 : classNames.card), style: cardVars, children: [
        (badge || title || description) && /* @__PURE__ */ jsxs6("header", { className: "ds-form-header", children: [
          badge && /* @__PURE__ */ jsx7("span", { className: "ds-form-badge", children: badge }),
          title && /* @__PURE__ */ jsx7(TitleTag, { className: "ds-form-title", children: title }),
          description && /* @__PURE__ */ jsx7("p", { className: "ds-form-description", children: description })
        ] }),
        /* @__PURE__ */ jsxs6(
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
              hasErrors && /* @__PURE__ */ jsxs6(
                "div",
                {
                  ref: summaryRef,
                  className: "ds-form-error-summary",
                  role: "alert",
                  "aria-labelledby": summaryTitleId,
                  tabIndex: -1,
                  children: [
                    /* @__PURE__ */ jsx7("h2", { id: summaryTitleId, className: "ds-form-error-summary__title", children: errorSummaryTitle }),
                    /* @__PURE__ */ jsx7("ul", { className: "ds-form-error-summary__list", children: errorSummary.map((item) => /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(
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
              /* @__PURE__ */ jsx7("fieldset", { className: "ds-form-fieldset", disabled: blocked, role: "presentation", children: /* @__PURE__ */ jsx7(
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
              /* @__PURE__ */ jsx7(
                "fieldset",
                {
                  className: "ds-form-fieldset ds-form-actions-fieldset",
                  disabled,
                  "aria-disabled": blocked || void 0,
                  "data-state": disabled ? "disabled" : loading ? "loading" : void 0,
                  children: /* @__PURE__ */ jsxs6("div", { className: "ds-form-actions", children: [
                    actions,
                    footer
                  ] })
                }
              ),
              /* @__PURE__ */ jsx7("span", { className: "ds-form-sr", role: "status", "aria-live": "polite", children: loading ? loadingLabel : "" })
            ]
          }
        )
      ] })
    }
  );
});
Form.displayName = "Form";
var Form_default = Form;

// src/components/molecules/Breadcrumb/index.tsx
import React8, {
  Children as Children2,
  cloneElement,
  createContext,
  isValidElement as isValidElement2,
  useCallback as useCallback4,
  useContext as useContext2,
  useEffect as useEffect2,
  useMemo as useMemo4,
  useRef as useRef4,
  useState as useState6
} from "react";

// src/components/molecules/Breadcrumb/Breadcrumb.config.ts
var BREADCRUMB_DEFAULTS = {
  ariaLabel: "Breadcrumb",
  separator: "slash",
  size: "sm",
  itemsBeforeCollapse: 1,
  itemsAfterCollapse: 1,
  responsiveCollapse: true
};
var BREADCRUMB_NARROW_QUERY = "(max-width: 640px)";
var BREADCRUMB_NARROW_MAX_ITEMS = 3;
var defaultExpandLabel = (hiddenCount) => `Show ${hiddenCount} more`;

// src/components/molecules/Breadcrumb/Breadcrumb.utils.ts
function getCollapseRange(total, maxItems, itemsBefore, itemsAfter) {
  const before = Math.max(0, Math.floor(itemsBefore));
  const after = Math.max(0, Math.floor(itemsAfter));
  const none = { collapsed: false, before: total, after: 0, hidden: 0 };
  if (maxItems === void 0 || !Number.isFinite(maxItems) || total <= maxItems)
    return none;
  if (before + after >= total)
    return none;
  return { collapsed: true, before, after, hidden: total - before - after };
}

// src/components/molecules/Breadcrumb/index.tsx
import { Fragment as Fragment2, jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function cls7(...parts) {
  return parts.filter(Boolean).join(" ");
}
function isDev() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
var BreadcrumbContext = createContext(null);
function useMatchMedia(query, enabled) {
  const [matches, setMatches] = useState6(false);
  useEffect2(() => {
    var _a;
    if (!enabled || typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setMatches(false);
      return;
    }
    const mql = window.matchMedia(query);
    const update = () => setMatches(Boolean(mql.matches));
    update();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    (_a = mql.addListener) == null ? void 0 : _a.call(mql, update);
    return () => {
      var _a2;
      return (_a2 = mql.removeListener) == null ? void 0 : _a2.call(mql, update);
    };
  }, [query, enabled]);
  return matches;
}
function SeparatorSlot() {
  const ctx = useContext2(BreadcrumbContext);
  if ((ctx == null ? void 0 : ctx.separatorNode) === null || (ctx == null ? void 0 : ctx.separatorNode) === void 0)
    return null;
  return /* @__PURE__ */ jsx8("span", { className: "ds-breadcrumb__separator", "aria-hidden": "true", children: ctx.separatorNode });
}
var BreadcrumbImpl = React8.forwardRef(function Breadcrumb({
  ariaLabel = BREADCRUMB_DEFAULTS.ariaLabel,
  separator = BREADCRUMB_DEFAULTS.separator,
  size = BREADCRUMB_DEFAULTS.size,
  items,
  maxItems,
  itemsBeforeCollapse = BREADCRUMB_DEFAULTS.itemsBeforeCollapse,
  itemsAfterCollapse = BREADCRUMB_DEFAULTS.itemsAfterCollapse,
  responsiveCollapse = BREADCRUMB_DEFAULTS.responsiveCollapse,
  expandLabel = defaultExpandLabel,
  onExpand,
  renderLink,
  className,
  children,
  ...rest
}, ref) {
  const isBuiltIn = separator === "slash" || separator === "chevron";
  const isNone = separator === null || separator === false;
  const separatorAttr = isBuiltIn ? separator : isNone ? "none" : "custom";
  const separatorNode = isBuiltIn || isNone ? null : separator;
  const ctx = useMemo4(
    () => ({ separatorNode, renderLink }),
    [separatorNode, renderLink]
  );
  useEffect2(() => {
    if (isDev() && items && Children2.count(children) > 0) {
      console.warn("[Breadcrumb] Both `items` and `children` were passed \u2014 `children` is ignored.");
    }
  }, [items, children]);
  const segments = useMemo4(() => {
    if (items) {
      const anyCurrent = items.some((item) => item.current === true);
      return items.map((item, i) => {
        var _a, _b;
        return /* @__PURE__ */ jsx8(
          BreadcrumbItem2,
          {
            href: item.href,
            icon: item.icon,
            current: (_b = item.current) != null ? _b : !anyCurrent && i === items.length - 1,
            renderLink: item.renderLink,
            linkProps: item.linkProps,
            children: item.label
          },
          (_a = item.key) != null ? _a : `bc-${i}`
        );
      });
    }
    return Children2.toArray(children);
  }, [items, children]);
  const total = segments.length;
  const narrow = useMatchMedia(BREADCRUMB_NARROW_QUERY, responsiveCollapse);
  const [expandedFor, setExpandedFor] = useState6(null);
  const expanded = expandedFor === total;
  const range = expanded ? getCollapseRange(total, void 0, 0, 0) : narrow ? getCollapseRange(
    total,
    Math.min(maxItems != null ? maxItems : Number.POSITIVE_INFINITY, BREADCRUMB_NARROW_MAX_ITEMS),
    Math.min(itemsBeforeCollapse, 1),
    Math.min(itemsAfterCollapse, 1)
  ) : getCollapseRange(total, maxItems, itemsBeforeCollapse, itemsAfterCollapse);
  const listRef = useRef4(null);
  const focusIndexRef = useRef4(null);
  const handleExpand = useCallback4(() => {
    focusIndexRef.current = range.before;
    setExpandedFor(total);
    onExpand == null ? void 0 : onExpand();
  }, [range.before, total, onExpand]);
  useEffect2(() => {
    var _a;
    const index = focusIndexRef.current;
    if (index === null || !expanded)
      return;
    focusIndexRef.current = null;
    const li = (_a = listRef.current) == null ? void 0 : _a.children[index];
    if (!li)
      return;
    const target = li.querySelector("a[href], button, [tabindex]");
    if (target) {
      target.focus();
    } else {
      li.setAttribute("tabindex", "-1");
      li.focus();
    }
  }, [expanded]);
  const visible = range.collapsed ? [
    ...segments.slice(0, range.before),
    /* @__PURE__ */ jsxs7("li", { className: "ds-breadcrumb__item ds-breadcrumb__item--ellipsis", children: [
      /* @__PURE__ */ jsx8(
        "button",
        {
          type: "button",
          className: "ds-breadcrumb__ellipsis",
          "aria-label": expandLabel(range.hidden),
          onClick: handleExpand,
          children: /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", children: "\u2026" })
        }
      ),
      /* @__PURE__ */ jsx8(SeparatorSlot, {})
    ] }, "__bc-ellipsis"),
    ...segments.slice(total - range.after)
  ] : segments;
  return /* @__PURE__ */ jsx8(BreadcrumbContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx8(
    "nav",
    {
      ref,
      "aria-label": ariaLabel,
      className: cls7("ds-breadcrumb", className),
      "data-separator": separatorAttr,
      "data-size": size,
      "data-collapsed": range.collapsed ? "true" : void 0,
      ...rest,
      children: /* @__PURE__ */ jsx8("ol", { ref: listRef, className: "ds-breadcrumb__list", children: visible })
    }
  ) });
});
BreadcrumbImpl.displayName = "Breadcrumb";
var Breadcrumb2 = React8.memo(BreadcrumbImpl);
Breadcrumb2.displayName = "Breadcrumb";
var BreadcrumbItemImpl = React8.forwardRef(
  function BreadcrumbItem({ href, current, icon, children, className, linkProps, asChild = false, renderLink, ...liRest }, ref) {
    const ctx = useContext2(BreadcrumbContext);
    const linkRenderer = renderLink != null ? renderLink : ctx == null ? void 0 : ctx.renderLink;
    const content = icon ? /* @__PURE__ */ jsxs7(Fragment2, { children: [
      /* @__PURE__ */ jsx8("span", { className: "ds-breadcrumb__icon", "aria-hidden": "true", children: icon }),
      /* @__PURE__ */ jsx8("span", { className: "ds-breadcrumb__label", children })
    ] }) : children;
    if (asChild && isValidElement2(children)) {
      const child = children;
      const isCurrent2 = current != null ? current : false;
      const childHref = child.props.href;
      const childSafe = typeof childHref !== "string" || isSafeHref(childHref);
      return /* @__PURE__ */ jsxs7(
        "li",
        {
          ref,
          className: cls7("ds-breadcrumb__item", isCurrent2 && "ds-breadcrumb__item--current", className),
          ...liRest,
          children: [
            childSafe ? cloneElement(child, {
              ...linkProps,
              className: cls7(
                "ds-breadcrumb__link",
                isCurrent2 && "ds-breadcrumb__link--current",
                child.props.className
              ),
              ...isCurrent2 ? { "aria-current": "page" } : {}
            }) : /* @__PURE__ */ jsx8("span", { className: "ds-breadcrumb__text ds-breadcrumb__text--plain", children: child.props.children }),
            /* @__PURE__ */ jsx8(SeparatorSlot, {})
          ]
        }
      );
    }
    const hasHref = typeof href === "string" && href.length > 0;
    const safeHref2 = hasHref && isSafeHref(href) ? href : void 0;
    if (hasHref && !safeHref2 && isDev()) {
      console.warn(
        `[BreadcrumbItem] Refused unsafe href ${JSON.stringify(href)} \u2014 rendering text instead.`
      );
    }
    const isCurrent = current != null ? current : !hasHref;
    const renderAnchor = (linkClass, ariaCurrent) => {
      if (linkRenderer && safeHref2) {
        return linkRenderer({
          href: safeHref2,
          className: linkClass,
          "aria-current": ariaCurrent,
          children: content
        });
      }
      return /* @__PURE__ */ jsx8("a", { href: safeHref2, className: linkClass, "aria-current": ariaCurrent, ...linkProps, children: content });
    };
    if (safeHref2 && !isCurrent) {
      return /* @__PURE__ */ jsxs7("li", { ref, className: cls7("ds-breadcrumb__item", className), ...liRest, children: [
        renderAnchor(cls7("ds-breadcrumb__link", icon ? "ds-breadcrumb__link--icon" : void 0)),
        /* @__PURE__ */ jsx8(SeparatorSlot, {})
      ] });
    }
    if (!isCurrent) {
      return /* @__PURE__ */ jsxs7("li", { ref, className: cls7("ds-breadcrumb__item", className), ...liRest, children: [
        /* @__PURE__ */ jsx8("span", { className: "ds-breadcrumb__text ds-breadcrumb__text--plain", children: content }),
        /* @__PURE__ */ jsx8(SeparatorSlot, {})
      ] });
    }
    return /* @__PURE__ */ jsxs7(
      "li",
      {
        ref,
        className: cls7("ds-breadcrumb__item", "ds-breadcrumb__item--current", className),
        "aria-current": "page",
        ...liRest,
        children: [
          safeHref2 ? renderAnchor(
            cls7(
              "ds-breadcrumb__link",
              "ds-breadcrumb__link--current",
              icon ? "ds-breadcrumb__link--icon" : void 0
            ),
            "page"
          ) : /* @__PURE__ */ jsx8("span", { className: "ds-breadcrumb__text", children: content }),
          /* @__PURE__ */ jsx8(SeparatorSlot, {})
        ]
      }
    );
  }
);
BreadcrumbItemImpl.displayName = "BreadcrumbItem";
var BreadcrumbItem2 = React8.memo(BreadcrumbItemImpl);
BreadcrumbItem2.displayName = "BreadcrumbItem";

// src/components/molecules/Tabs/index.tsx
import React9, {
  createContext as createContext2,
  useCallback as useCallback5,
  useContext as useContext3,
  useId as useId4,
  useLayoutEffect,
  useMemo as useMemo5,
  useRef as useRef5,
  useState as useState7
} from "react";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function cls8(...parts) {
  return parts.filter(Boolean).join(" ");
}
function toCssLength(v) {
  if (v === void 0)
    return void 0;
  return typeof v === "number" ? `${v}px` : v;
}
var TabsContext = createContext2(null);
function useTabsContext(component) {
  const ctx = useContext3(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Tabs>`);
  }
  return ctx;
}
var Tabs = React9.memo(function Tabs2({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  orientation = "horizontal",
  variant = "line",
  size = "md",
  listLayout = "wrap",
  activationMode = "automatic",
  contentAnimation = "fade",
  dividerColor,
  dividerWidth,
  indicatorColor,
  indicatorWidth,
  inactiveTextColor,
  activeTextColor,
  tabFontSize,
  triggerLayout = "inline",
  triggerAlign = "center",
  id: idProp,
  className,
  children,
  style,
  ...rest
}) {
  const reactId = useId4();
  const baseId = idProp != null ? idProp : `tabs-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState7(defaultValue);
  const value = isControlled ? valueProp : inner;
  const setValue = useCallback5(
    (next) => {
      if (!isControlled) {
        setInner(next);
      }
      onValueChange == null ? void 0 : onValueChange(next);
    },
    [isControlled, onValueChange]
  );
  const cssVars = useMemo5(() => {
    const dw = toCssLength(dividerWidth);
    const iw = toCssLength(indicatorWidth);
    const tf = toCssLength(tabFontSize);
    return {
      ...dividerColor != null && { "--tabs-divider-color": dividerColor },
      ...dw != null && { "--tabs-divider-width": dw },
      ...indicatorColor != null && { "--tabs-indicator-color": indicatorColor },
      ...iw != null && { "--tabs-indicator-width": iw },
      ...inactiveTextColor != null && { "--tabs-text-inactive": inactiveTextColor },
      ...activeTextColor != null && { "--tabs-text-active": activeTextColor },
      ...tf != null && { "--tabs-font-size": tf }
    };
  }, [
    dividerColor,
    dividerWidth,
    indicatorColor,
    indicatorWidth,
    inactiveTextColor,
    activeTextColor,
    tabFontSize
  ]);
  const ctx = useMemo5(
    () => ({
      value,
      setValue,
      baseId,
      orientation,
      variant,
      size,
      listLayout,
      activationMode,
      triggerLayout,
      triggerAlign
    }),
    [
      value,
      setValue,
      baseId,
      orientation,
      variant,
      size,
      listLayout,
      activationMode,
      triggerLayout,
      triggerAlign
    ]
  );
  return /* @__PURE__ */ jsx9(TabsContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx9(
    "div",
    {
      className: cls8("ds-tabs", className),
      "data-orientation": orientation,
      "data-variant": variant,
      "data-size": size,
      "data-list-layout": listLayout,
      "data-content-animation": contentAnimation,
      "data-activation-mode": activationMode,
      "data-trigger-layout": triggerLayout,
      "data-trigger-align": triggerAlign,
      style: { ...cssVars, ...style },
      ...rest,
      children
    }
  ) });
});
function getAllTabButtons(listEl) {
  if (!listEl)
    return [];
  return Array.from(listEl.querySelectorAll('[role="tab"]'));
}
var TabsList = React9.memo(function TabsList2({
  ariaLabel,
  className,
  children,
  onKeyDown,
  ...rest
}) {
  const ctx = useTabsContext("TabsList");
  const listRef = useRef5(null);
  const [segmentPill, setSegmentPill] = useState7({ left: 0, top: 0, width: 0, height: 0, visible: false });
  const updateSegmentPill = useCallback5(() => {
    const list = listRef.current;
    if (!list || ctx.variant !== "segmented")
      return;
    const active2 = list.querySelector('[role="tab"][aria-selected="true"]');
    if (!active2 || active2.getAttribute("data-disabled") === "true") {
      setSegmentPill((p) => ({ ...p, visible: false }));
      return;
    }
    const lr = list.getBoundingClientRect();
    const tr = active2.getBoundingClientRect();
    setSegmentPill({
      left: tr.left - lr.left,
      top: tr.top - lr.top,
      width: tr.width,
      height: tr.height,
      visible: true
    });
  }, [ctx.variant]);
  useLayoutEffect(() => {
    updateSegmentPill();
  }, [updateSegmentPill, ctx.value, children]);
  useLayoutEffect(() => {
    if (ctx.variant !== "segmented" || !listRef.current)
      return;
    const list = listRef.current;
    const ro = new ResizeObserver(() => updateSegmentPill());
    ro.observe(list);
    const onScrollOrResize = () => updateSegmentPill();
    list.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      ro.disconnect();
      list.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [ctx.variant, updateSegmentPill]);
  const handleKeyDown = useCallback5(
    (e) => {
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      const tabs = getAllTabButtons(listRef.current);
      if (tabs.length === 0)
        return;
      const n = tabs.length;
      const active2 = document.activeElement;
      let idx = tabs.indexOf(active2);
      if (idx < 0) {
        idx = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      }
      if (idx < 0)
        idx = 0;
      const horizontal = ctx.orientation === "horizontal";
      const forwardKey = horizontal ? "ArrowRight" : "ArrowDown";
      const backKey = horizontal ? "ArrowLeft" : "ArrowUp";
      const focusAt = (i) => {
        const t = tabs[i];
        if (!t || t.disabled)
          return;
        t.focus();
        const v = t.dataset.tabValue;
        if (v && ctx.activationMode === "automatic")
          ctx.setValue(v);
      };
      const step = (delta) => {
        if (n === 0)
          return;
        let i = idx;
        for (let k = 0; k < n; k++) {
          i = (i + delta + n) % n;
          if (!tabs[i].disabled) {
            focusAt(i);
            return;
          }
        }
      };
      if (e.key === forwardKey) {
        e.preventDefault();
        step(1);
        return;
      }
      if (e.key === backKey) {
        e.preventDefault();
        step(-1);
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        for (let i = 0; i < n; i++) {
          if (!tabs[i].disabled) {
            focusAt(i);
            return;
          }
        }
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        for (let i = n - 1; i >= 0; i--) {
          if (!tabs[i].disabled) {
            focusAt(i);
            return;
          }
        }
      }
    },
    [ctx, onKeyDown]
  );
  const showSegmentPill = ctx.variant === "segmented";
  return /* @__PURE__ */ jsxs8(
    "div",
    {
      ref: listRef,
      role: "tablist",
      "aria-label": ariaLabel,
      "aria-orientation": ctx.orientation,
      "data-list-layout": ctx.listLayout,
      className: cls8("ds-tabs__list", showSegmentPill && "ds-tabs__list--segmented", className),
      onKeyDown: handleKeyDown,
      ...rest,
      children: [
        showSegmentPill ? /* @__PURE__ */ jsx9(
          "span",
          {
            className: "ds-tabs__segment-pill",
            "aria-hidden": "true",
            style: {
              left: segmentPill.left,
              top: segmentPill.top,
              width: segmentPill.width,
              height: segmentPill.height,
              opacity: segmentPill.visible ? 1 : 0
            }
          }
        ) : null,
        children
      ]
    }
  );
});
var TabsTrigger = React9.memo(function TabsTrigger2({
  value,
  children,
  icon,
  className,
  disabled = false,
  type = "button",
  triggerLayout: triggerLayoutProp,
  triggerAlign: triggerAlignProp,
  onClick,
  onKeyDown,
  ...rest
}) {
  const ctx = useTabsContext("TabsTrigger");
  const selected = ctx.value === value;
  const tabId = `${ctx.baseId}-tab-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;
  const triggerLayout = triggerLayoutProp != null ? triggerLayoutProp : ctx.triggerLayout;
  const triggerAlign = triggerAlignProp != null ? triggerAlignProp : ctx.triggerAlign;
  return /* @__PURE__ */ jsxs8(
    "button",
    {
      ...rest,
      type,
      role: "tab",
      id: tabId,
      className: cls8("ds-tabs__trigger", icon != null ? "ds-tabs__trigger--with-icon" : void 0, className),
      "data-trigger-layout": triggerLayout,
      "data-trigger-align": triggerAlign,
      "aria-selected": selected,
      "aria-controls": selected ? panelId : void 0,
      tabIndex: selected ? 0 : -1,
      "data-state": selected ? "active" : "inactive",
      "data-tab-value": value,
      "data-disabled": disabled ? "true" : void 0,
      disabled,
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.defaultPrevented || disabled)
          return;
        if (ctx.activationMode === "manual" && (e.key === "Enter" || e.key === " " || e.code === "Space")) {
          e.preventDefault();
          ctx.setValue(value);
        }
      },
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        if (!disabled)
          ctx.setValue(value);
      },
      children: [
        icon != null ? /* @__PURE__ */ jsx9("span", { className: "ds-tabs__trigger-icon", "aria-hidden": true, children: icon }) : null,
        /* @__PURE__ */ jsx9("span", { className: "ds-tabs__trigger-text", children })
      ]
    }
  );
});
var TabsContent = React9.memo(function TabsContent2({
  value,
  children,
  className,
  forceMount = false,
  ...rest
}) {
  const ctx = useTabsContext("TabsContent");
  const selected = ctx.value === value;
  if (!forceMount && !selected) {
    return null;
  }
  return /* @__PURE__ */ jsx9(
    "div",
    {
      ...rest,
      role: "tabpanel",
      id: `${ctx.baseId}-panel-${value}`,
      "aria-labelledby": `${ctx.baseId}-tab-${value}`,
      className: cls8("ds-tabs__panel", className),
      "data-state": selected ? "active" : "inactive",
      "data-value": value,
      hidden: !selected,
      tabIndex: selected ? 0 : -1,
      children
    }
  );
});

// src/components/molecules/Accordion/index.tsx
import React10, {
  createContext as createContext3,
  useCallback as useCallback6,
  useContext as useContext4,
  useId as useId5,
  useMemo as useMemo6,
  useRef as useRef6,
  useState as useState8
} from "react";
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
function cls9(...parts) {
  return parts.filter(Boolean).join(" ");
}
var AccordionContext = createContext3(null);
function useAccordionContext(component) {
  const ctx = useContext4(AccordionContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Accordion>`);
  }
  return ctx;
}
var AccordionItemContext = createContext3(null);
function useAccordionItemContext(component) {
  const ctx = useContext4(AccordionItemContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <AccordionItem>`);
  }
  return ctx;
}
function normalizeSingleValue(v) {
  if (v === void 0)
    return void 0;
  if (Array.isArray(v))
    return v[0];
  return v;
}
function normalizeMultipleValue(v) {
  if (v === void 0)
    return [];
  if (Array.isArray(v))
    return v;
  return [v];
}
var Accordion = React10.memo(function Accordion2({
  children,
  type = "single",
  collapsible = true,
  value: valueProp,
  defaultValue,
  onValueChange,
  variant = "default",
  motion = "default",
  density = "default",
  className,
  ...rest
}) {
  const reactId = useId5();
  const baseId = `accordion-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState8(() => {
    if (defaultValue !== void 0)
      return defaultValue;
    if (type === "multiple")
      return [];
    return void 0;
  });
  const value = isControlled ? valueProp : inner;
  const valueRef = useRef6(value);
  valueRef.current = value;
  const setValue = useCallback6(
    (next) => {
      if (!isControlled) {
        setInner(next);
      }
      onValueChange == null ? void 0 : onValueChange(next);
    },
    [isControlled, onValueChange]
  );
  const isOpen = useCallback6(
    (itemValue) => {
      if (type === "single") {
        return normalizeSingleValue(value) === itemValue;
      }
      return normalizeMultipleValue(value).includes(itemValue);
    },
    [type, value]
  );
  const toggle = useCallback6(
    (itemValue) => {
      const v = valueRef.current;
      if (type === "single") {
        const current = normalizeSingleValue(v);
        if (current === itemValue) {
          if (collapsible)
            setValue(void 0);
        } else {
          setValue(itemValue);
        }
      } else {
        const arr = [...normalizeMultipleValue(v)];
        const i = arr.indexOf(itemValue);
        if (i >= 0) {
          arr.splice(i, 1);
        } else {
          arr.push(itemValue);
        }
        setValue(arr);
      }
    },
    [type, collapsible, setValue]
  );
  const ctx = useMemo6(
    () => ({
      type,
      collapsible,
      isOpen,
      toggle,
      baseId,
      variant,
      motion,
      density
    }),
    [type, collapsible, isOpen, toggle, baseId, variant, motion, density]
  );
  return /* @__PURE__ */ jsx10(AccordionContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx10(
    "div",
    {
      className: cls9("ds-accordion", className),
      "data-variant": variant,
      "data-motion": motion,
      "data-density": density,
      "data-orientation": "vertical",
      ...rest,
      children
    }
  ) });
});
var AccordionItem = React10.memo(function AccordionItem2({
  value,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const acc = useAccordionContext("AccordionItem");
  const reactId = useId5();
  const safe = String(value).replace(/[^a-zA-Z0-9_-]/g, "-");
  const suffix = `${acc.baseId}-${safe}-${reactId.replace(/:/g, "")}`;
  const itemCtx = useMemo6(
    () => ({
      value,
      disabled,
      triggerId: `${suffix}-trigger`,
      contentId: `${suffix}-content`
    }),
    [value, disabled, suffix]
  );
  return /* @__PURE__ */ jsx10(AccordionItemContext.Provider, { value: itemCtx, children: /* @__PURE__ */ jsx10(
    "div",
    {
      className: cls9("ds-accordion__item", className),
      "data-disabled": disabled ? "true" : void 0,
      "data-state": acc.isOpen(value) ? "open" : "closed",
      ...rest,
      children
    }
  ) });
});
function ChevronIcon() {
  return /* @__PURE__ */ jsx10("svg", { className: "ds-accordion__chevron", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx10(
    "path",
    {
      d: "M6 9l6 6 6-6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
var AccordionTrigger = React10.memo(function AccordionTrigger2({
  children,
  className,
  onClick,
  ...rest
}) {
  const acc = useAccordionContext("AccordionTrigger");
  const item = useAccordionItemContext("AccordionTrigger");
  const open = acc.isOpen(item.value) && !item.disabled;
  return /* @__PURE__ */ jsxs9(
    "button",
    {
      ...rest,
      type: "button",
      id: item.triggerId,
      className: cls9("ds-accordion__trigger", className),
      "aria-expanded": open,
      "aria-controls": item.contentId,
      "data-state": open ? "open" : "closed",
      "data-disabled": item.disabled ? "true" : void 0,
      disabled: item.disabled,
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        if (e.defaultPrevented || item.disabled)
          return;
        acc.toggle(item.value);
      },
      children: [
        /* @__PURE__ */ jsx10("span", { className: "ds-accordion__trigger-label", children }),
        /* @__PURE__ */ jsx10(ChevronIcon, {})
      ]
    }
  );
});
var useInertLayoutEffect = typeof window !== "undefined" ? React10.useLayoutEffect : React10.useEffect;
var AccordionContent = React10.memo(function AccordionContent2({
  children,
  className,
  forceMount = false,
  ...rest
}) {
  const acc = useAccordionContext("AccordionContent");
  const item = useAccordionItemContext("AccordionContent");
  const open = acc.isOpen(item.value);
  const animated = acc.motion === "default";
  const hidden = !open;
  const useInertWhenClosed = hidden && animated;
  const outerRef = useRef6(null);
  useInertLayoutEffect(() => {
    const el = outerRef.current;
    if (!el)
      return;
    if (useInertWhenClosed)
      el.setAttribute("inert", "");
    else
      el.removeAttribute("inert");
  }, [useInertWhenClosed]);
  const keepMounted = animated || forceMount || open;
  if (!keepMounted) {
    return null;
  }
  return /* @__PURE__ */ jsx10(
    "div",
    {
      ...rest,
      ref: outerRef,
      className: cls9("ds-accordion__content-outer", className),
      "data-state": open ? "open" : "closed",
      "data-animated": animated ? "true" : void 0,
      id: item.contentId,
      role: "region",
      "aria-labelledby": item.triggerId,
      "aria-hidden": hidden ? true : void 0,
      hidden: hidden && !forceMount && !animated ? true : void 0,
      children: /* @__PURE__ */ jsx10("div", { className: "ds-accordion__content-inner", children: /* @__PURE__ */ jsx10(
        "div",
        {
          className: "ds-accordion__content-body",
          "data-force-hidden": forceMount && hidden && !animated ? "true" : void 0,
          children
        }
      ) })
    }
  );
});

// src/components/molecules/ButtonGroup/index.tsx
import React11, {
  Children as Children3,
  cloneElement as cloneElement2,
  createContext as createContext4,
  isValidElement as isValidElement3,
  useContext as useContext5,
  useMemo as useMemo7
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
import { jsx as jsx11 } from "react/jsx-runtime";
var ButtonGroupContext = createContext4(null);
function useButtonGroup(component) {
  const ctx = useContext5(ButtonGroupContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <ButtonGroup>`);
  }
  return ctx;
}
function cls10(...parts) {
  return parts.filter(Boolean).join(" ");
}
function augmentChildren(children, ctx) {
  return Children3.map(Children3.toArray(children), (child) => {
    if (!isValidElement3(child))
      return child;
    if (child.type === Button_default) {
      const el = child;
      const next = {
        className: cls10("ds-button-group__segment", el.props.className)
      };
      if (el.props.size === void 0 && ctx.size !== void 0)
        next.size = ctx.size;
      if (el.props.variant === void 0 && ctx.variant !== void 0)
        next.variant = ctx.variant;
      if (el.props.disabled === void 0 && ctx.disabled)
        next.disabled = true;
      return cloneElement2(el, next);
    }
    return child;
  });
}
function useButtonGroupContext() {
  return useContext5(ButtonGroupContext);
}
var ButtonGroupImpl = React11.forwardRef(function ButtonGroup({
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
  const parent = useContext5(ButtonGroupContext);
  const effectiveSize = size != null ? size : parent == null ? void 0 : parent.size;
  const effectiveVariant = variant != null ? variant : parent == null ? void 0 : parent.variant;
  const effectiveDisabled = Boolean(disabled != null ? disabled : BUTTON_GROUP_DEFAULTS.disabled) || Boolean(parent == null ? void 0 : parent.disabled);
  const ctx = useMemo7(
    () => ({
      orientation,
      attached,
      size: effectiveSize,
      variant: effectiveVariant,
      disabled: effectiveDisabled
    }),
    [orientation, attached, effectiveSize, effectiveVariant, effectiveDisabled]
  );
  return /* @__PURE__ */ jsx11(ButtonGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx11(
    "div",
    {
      ref,
      role: "group",
      className: cls10("ds-button-group", className),
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
var ButtonGroup2 = React11.memo(ButtonGroupImpl);
ButtonGroup2.displayName = "ButtonGroup";
var ButtonGroupSeparator = React11.memo(function ButtonGroupSeparator2({
  orientation: orientationProp,
  className,
  ...rest
}) {
  const { orientation: parentOrientation } = useButtonGroup("ButtonGroupSeparator");
  const orientation = orientationProp != null ? orientationProp : parentOrientation === "horizontal" ? "vertical" : "horizontal";
  return /* @__PURE__ */ jsx11(
    "div",
    {
      role: "separator",
      "aria-orientation": orientation === "vertical" ? "vertical" : "horizontal",
      className: cls10("ds-button-group__separator", className),
      "data-orientation": orientation,
      ...rest
    }
  );
});
var ButtonGroupText = React11.memo(function ButtonGroupText2({
  children,
  className,
  asChild = false,
  ...rest
}) {
  if (asChild && isValidElement3(children)) {
    const ch = children;
    const childProps = ch.props;
    return cloneElement2(ch, {
      ...rest,
      ...childProps,
      className: cls10("ds-button-group__text", childProps.className, className)
    });
  }
  return /* @__PURE__ */ jsx11("span", { className: cls10("ds-button-group__text", className), ...rest, children });
});

// src/components/molecules/Stepper/index.tsx
import React12, {
  createContext as createContext5,
  useCallback as useCallback7,
  useContext as useContext6,
  useId as useId6,
  useMemo as useMemo8,
  useState as useState9
} from "react";
import { jsx as jsx12, jsxs as jsxs10 } from "react/jsx-runtime";
function cls11(...parts) {
  return parts.filter(Boolean).join(" ");
}
function clampPct(n) {
  if (Number.isNaN(n))
    return 0;
  return Math.min(100, Math.max(0, n));
}
function defaultProgressPercent(activeIndex, stepCount) {
  if (stepCount <= 1)
    return 100;
  return clampPct(activeIndex / (stepCount - 1) * 100);
}
var StepperContext = createContext5(null);
function useStepperContext(component) {
  const ctx = useContext6(StepperContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Stepper>`);
  }
  return ctx;
}
function isStepperStep(el) {
  return React12.isValidElement(el) && el.type.displayName === "StepperStep";
}
var Stepper = React12.memo(function Stepper2({
  children,
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  linear = false,
  ariaLabel = "Steps",
  size = "md",
  scrollable = false,
  trackMode = "continuous",
  progressValue: progressValueProp,
  appearance = "default",
  className,
  ...rest
}) {
  const reactId = useId6();
  const baseId = `stepper-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState9(defaultValue);
  const activeIndex = isControlled ? valueProp : inner;
  const steps = useMemo8(
    () => React12.Children.toArray(children).filter(isStepperStep),
    [children]
  );
  const stepCount = steps.length;
  const setActiveIndex = useCallback7(
    (next) => {
      if (stepCount === 0)
        return;
      const clamped = Math.max(0, Math.min(stepCount - 1, next));
      if (!isControlled) {
        setInner(clamped);
      }
      onValueChange == null ? void 0 : onValueChange(clamped);
    },
    [isControlled, onValueChange, stepCount]
  );
  const safeIndex = stepCount > 0 ? Math.min(Math.max(activeIndex, 0), stepCount - 1) : 0;
  const progressPct = useMemo8(() => {
    if (progressValueProp !== void 0) {
      return clampPct(progressValueProp);
    }
    return defaultProgressPercent(safeIndex, stepCount);
  }, [progressValueProp, safeIndex, stepCount]);
  const ctx = useMemo8(
    () => ({
      activeIndex,
      setActiveIndex,
      stepCount,
      linear,
      baseId,
      size,
      trackMode,
      appearance
    }),
    [activeIndex, setActiveIndex, stepCount, linear, baseId, size, trackMode, appearance]
  );
  const showContinuousTrack = trackMode === "continuous";
  const showSegmentTint = trackMode === "segments";
  return /* @__PURE__ */ jsx12(StepperContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx12(
    "nav",
    {
      className: cls11("ds-stepper", scrollable && "ds-stepper--scroll", className),
      "aria-label": ariaLabel,
      "data-size": size,
      "data-track-mode": trackMode,
      "data-appearance": appearance,
      style: {
        "--stepper-progress-pct": `${progressPct}%`,
        "--stepper-count": String(stepCount),
        /* Grid column count (markers + gaps): line runs between 1st & last marker centers */
        "--stepper-total-cols": String(Math.max(1, stepCount * 2 - 1))
      },
      ...rest,
      children: stepCount === 0 ? null : /* @__PURE__ */ jsxs10(
        "div",
        {
          className: "ds-stepper__grid",
          style: { gridTemplateColumns: `repeat(${stepCount * 2 - 1}, minmax(0, 1fr))` },
          children: [
            /* @__PURE__ */ jsx12("div", { className: "ds-stepper__track-shell", style: { gridColumn: "1 / -1", gridRow: 1 }, children: showContinuousTrack ? /* @__PURE__ */ jsxs10("div", { className: "ds-stepper__track-inset", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsx12("div", { className: "ds-stepper__track-line ds-stepper__track-line--bg" }),
              /* @__PURE__ */ jsx12("div", { className: "ds-stepper__track-line ds-stepper__track-line--fill" })
            ] }) : null }),
            steps.map((step, index) => {
              const colMarker = index * 2 + 1;
              const colGap = index * 2 + 2;
              const isLast = index === stepCount - 1;
              return /* @__PURE__ */ jsxs10(React12.Fragment, { children: [
                /* @__PURE__ */ jsx12("div", { className: "ds-stepper__cell ds-stepper__cell--marker", style: { gridColumn: colMarker, gridRow: 1 }, children: React12.cloneElement(step, {
                  stepIndex: index,
                  stepPart: "marker"
                }) }),
                /* @__PURE__ */ jsx12("div", { className: "ds-stepper__cell ds-stepper__cell--label", style: { gridColumn: colMarker, gridRow: 2 }, children: React12.cloneElement(step, {
                  stepIndex: index,
                  stepPart: "text"
                }) }),
                !isLast ? /* @__PURE__ */ jsx12(
                  "div",
                  {
                    className: cls11(
                      "ds-stepper__gap",
                      showSegmentTint && index < safeIndex && "ds-stepper__gap--complete"
                    ),
                    style: { gridColumn: colGap, gridRow: 1 },
                    "aria-hidden": "true"
                  }
                ) : null
              ] }, `${baseId}-s-${index}`);
            })
          ]
        }
      )
    }
  ) });
});
var StepperStep = React12.memo(function StepperStep2({
  label,
  description,
  disabled = false,
  className,
  stepIndex: stepIndexProp,
  stepPart = "marker",
  icon,
  markerText,
  showCheckWhenComplete = true,
  onClick,
  ...rest
}) {
  const ctx = useStepperContext("StepperStep");
  const index = stepIndexProp != null ? stepIndexProp : 0;
  const labelId = `${ctx.baseId}-step-${index}-heading`;
  const state2 = index < ctx.activeIndex ? "complete" : index === ctx.activeIndex ? "current" : "upcoming";
  const blockedByLinear = ctx.linear && index > ctx.activeIndex;
  const isDisabled = Boolean(disabled || blockedByLinear);
  const handleMarkerClick = (e) => {
    onClick == null ? void 0 : onClick(e);
    if (e.defaultPrevented || isDisabled)
      return;
    ctx.setActiveIndex(index);
  };
  const handleLabelClick = (e) => {
    const ev = e;
    onClick == null ? void 0 : onClick(ev);
    if (e.defaultPrevented || isDisabled)
      return;
    ctx.setActiveIndex(index);
  };
  const showCheck = state2 === "complete" && showCheckWhenComplete;
  const markerContent = showCheck ? /* @__PURE__ */ jsx12("svg", { className: "ds-stepper__check", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx12(
    "path",
    {
      d: "M13.5 4.5L6.5 11.5L3 8",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) : icon != null ? /* @__PURE__ */ jsx12("span", { className: "ds-stepper__marker-icon-wrap", children: icon }) : markerText != null ? /* @__PURE__ */ jsx12("span", { className: "ds-stepper__marker-inner", children: markerText }) : /* @__PURE__ */ jsx12("span", { className: "ds-stepper__marker-inner", children: index + 1 });
  if (stepPart === "text") {
    return /* @__PURE__ */ jsxs10(
      "div",
      {
        id: labelId,
        className: cls11("ds-stepper__label-block", className),
        "data-state": state2,
        "data-interactive": !isDisabled ? "true" : void 0,
        onClick: handleLabelClick,
        children: [
          /* @__PURE__ */ jsx12("span", { className: "ds-stepper__label", children: label }),
          description != null && description !== false ? /* @__PURE__ */ jsx12("span", { className: "ds-stepper__description", children: description }) : null
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs10(
    "button",
    {
      ...rest,
      type: "button",
      "aria-labelledby": `${labelId}-pos ${labelId}`,
      disabled: isDisabled,
      className: cls11("ds-stepper__marker-btn", className),
      "data-state": state2,
      "aria-current": state2 === "current" ? "step" : void 0,
      onClick: handleMarkerClick,
      children: [
        /* @__PURE__ */ jsx12("span", { id: `${labelId}-pos`, className: "ds-stepper__sr", children: `Step ${index + 1} of ${ctx.stepCount}${state2 === "complete" ? ", completed" : ""}:` }),
        /* @__PURE__ */ jsx12("span", { className: "ds-stepper__marker", "aria-hidden": "true", children: markerContent })
      ]
    }
  );
});
StepperStep.displayName = "StepperStep";

// src/components/molecules/FileUpload/index.tsx
import React13, { useCallback as useCallback9, useId as useId7, useRef as useRef8, useState as useState11 } from "react";

// src/components/molecules/FileUpload/useFilePicker.ts
import { useCallback as useCallback8, useMemo as useMemo9, useRef as useRef7, useState as useState10 } from "react";

// src/components/molecules/FileUpload/fileUploadSecurity.ts
var DEFAULT_SCAN_BYTES = 256 * 1024;
var SQL_INJECTION_LIKE = [
  /\bUNION\s+(ALL\s+)?SELECT\b/i,
  /\bDROP\s+TABLE\b/i,
  /\bOR\s+['"]?\d+['"]?\s*=\s*['"]?\d+/i,
  /\bEXEC(\s+|\()\s*(xp_|sp_)/i,
  /;\s*--/,
  /('|"|`)\s*;\s*(DROP|DELETE|TRUNCATE|ALTER|EXEC)\b/i
];
var SCRIPT_LIKE = [/<script\b/i, /javascript\s*:/i, /on\w+\s*=\s*["'][^"']*["']/i];
function normalizeExt(ext) {
  const t = ext.trim().toLowerCase();
  return t.startsWith(".") ? t : `.${t}`;
}
function parseAcceptString(accept) {
  if (!accept || !accept.trim())
    return { extensions: [], mimes: [] };
  const extensions = [];
  const mimes = [];
  for (const raw of accept.split(",")) {
    const p = raw.trim().toLowerCase();
    if (!p)
      continue;
    if (p.startsWith("."))
      extensions.push(normalizeExt(p));
    else if (p.includes("/"))
      mimes.push(p);
  }
  return { extensions, mimes };
}
function validateFilename(name) {
  if (!name || !name.trim())
    return "Invalid file name.";
  const base = name.replace(/^.*[/\\]/, "");
  if (base !== name)
    return "File name cannot contain path segments.";
  if (/[\0\x00-\x08\x0b\x0c\x0e-\x1f]/.test(name))
    return "File name contains invalid characters.";
  if (name.includes(".."))
    return "Invalid file name.";
  if (name.length > 240)
    return "File name is too long.";
  return null;
}
function getExtension(filename) {
  const base = filename.replace(/^.*[/\\]/, "");
  const i = base.lastIndexOf(".");
  if (i <= 0)
    return "";
  return normalizeExt(base.slice(i));
}
function detectFileKindFromBuffer(buffer) {
  const u = new Uint8Array(buffer.slice(0, Math.min(32, buffer.byteLength)));
  if (u.length < 4)
    return "unknown";
  if (u[0] === 37 && u[1] === 80 && u[2] === 68 && u[3] === 70)
    return "pdf";
  if (u.length >= 8 && u[0] === 137 && u[1] === 80 && u[2] === 78 && u[3] === 71 && u[4] === 13 && u[5] === 10 && u[6] === 26 && u[7] === 10) {
    return "png";
  }
  if (u[0] === 255 && u[1] === 216 && u[2] === 255)
    return "jpeg";
  if (u.length >= 6 && u[0] === 71 && u[1] === 73 && u[2] === 70 && u[3] === 56)
    return "gif";
  if (u.length >= 12 && u[0] === 82 && u[1] === 73 && u[2] === 70 && u[3] === 70 && u[8] === 87 && u[9] === 69 && u[10] === 66 && u[11] === 80) {
    return "webp";
  }
  if (u[0] === 80 && u[1] === 75 && (u[2] === 3 || u[2] === 5 || u[2] === 7))
    return "zip";
  const head = new TextDecoder("utf-8", { fatal: false }).decode(u.slice(0, Math.min(256, u.length)));
  const trimmed = head.trimStart().toLowerCase();
  const lower = head.toLowerCase();
  if (trimmed.startsWith("<svg") || trimmed.startsWith("<?xml") && lower.includes("<svg"))
    return "svg";
  return "unknown";
}
var KIND_TO_MIMES = {
  pdf: ["application/pdf"],
  png: ["image/png"],
  jpeg: ["image/jpeg", "image/jpg"],
  gif: ["image/gif"],
  webp: ["image/webp"],
  svg: ["image/svg+xml"],
  zip: [
    "application/zip",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ],
  unknown: []
};
var EXT_TO_KIND = {
  ".pdf": "pdf",
  ".png": "png",
  ".jpg": "jpeg",
  ".jpeg": "jpeg",
  ".gif": "gif",
  ".webp": "webp",
  ".svg": "svg",
  ".zip": "zip",
  ".docx": "zip",
  ".xlsx": "zip"
};
function mimeMatchesDeclared(mime, declared) {
  const d = declared.toLowerCase().trim();
  const m = mime.toLowerCase().trim();
  if (!d || !m)
    return true;
  if (d === "*/*")
    return true;
  if (d.endsWith("/*")) {
    const prefix = d.slice(0, -1);
    return m.startsWith(prefix);
  }
  return m === d;
}
function extensionAllowed(ext, allowed) {
  if (allowed.length === 0)
    return true;
  const e = normalizeExt(ext);
  return allowed.some((a) => normalizeExt(a) === e);
}
function mimeInAllowlist(mime, allowed) {
  if (allowed.length === 0)
    return true;
  const m = mime.toLowerCase().trim();
  return allowed.some((a) => mimeMatchesDeclared(m, a));
}
function kindMatchesMimeAllowlist(kind, allowedMimeTypes) {
  if (allowedMimeTypes.length === 0)
    return true;
  if (kind === "unknown")
    return false;
  const expectedMimes = KIND_TO_MIMES[kind];
  return expectedMimes.some((m) => mimeInAllowlist(m, allowedMimeTypes));
}
function scanBufferForSuspiciousPatterns(buf, includeScript) {
  const slice = buf.byteLength > DEFAULT_SCAN_BYTES ? buf.slice(0, DEFAULT_SCAN_BYTES) : buf;
  const text = new TextDecoder("utf-8", { fatal: false }).decode(slice);
  for (const re of SQL_INJECTION_LIKE) {
    if (re.test(text))
      return "File content matched a blocked SQL-like pattern.";
  }
  if (includeScript) {
    for (const re of SCRIPT_LIKE) {
      if (re.test(text))
        return "File content matched a blocked script-like pattern.";
    }
  }
  return null;
}
async function validateFileSecurity(file, options) {
  var _a, _b, _c;
  const fnErr = validateFilename(file.name);
  if (fnErr)
    return fnErr;
  const fromAccept = parseAcceptString(options.accept);
  const allowedExtensions = ((_a = options.allowedExtensions) == null ? void 0 : _a.length) ? options.allowedExtensions.map(normalizeExt) : fromAccept.extensions;
  const allowedMimeTypes = ((_b = options.allowedMimeTypes) == null ? void 0 : _b.length) ? options.allowedMimeTypes.map((m) => m.toLowerCase().trim()) : fromAccept.mimes;
  const hasRestriction = allowedExtensions.length > 0 || allowedMimeTypes.length > 0;
  const verifyMagic = options.verifyMagicBytes !== false && (hasRestriction || options.verifyMagicBytes === true);
  const scanContent = options.scanPdfForSqlInjection === true;
  const ext = getExtension(file.name);
  if (hasRestriction) {
    if (allowedExtensions.length > 0 && !extensionAllowed(ext, allowedExtensions)) {
      return `\u201C${file.name}\u201D has a type that is not allowed.`;
    }
    if (file.type && allowedMimeTypes.length > 0 && !mimeInAllowlist(file.type, allowedMimeTypes)) {
      return `\u201C${file.name}\u201D does not match an allowed file type.`;
    }
  }
  if (!(verifyMagic && hasRestriction || scanContent)) {
    return null;
  }
  const maxScan = Math.min((_c = options.maxScanBytes) != null ? _c : DEFAULT_SCAN_BYTES, DEFAULT_SCAN_BYTES * 4);
  const head = await file.slice(0, maxScan).arrayBuffer();
  if (head.byteLength === 0)
    return "File is empty.";
  const kind = detectFileKindFromBuffer(head);
  if (verifyMagic && hasRestriction) {
    if (kind === "unknown") {
      return `\u201C${file.name}\u201D could not be verified as a supported file format.`;
    }
    if (allowedExtensions.length > 0 && ext) {
      const expectedKind = EXT_TO_KIND[ext];
      if (expectedKind && expectedKind !== kind) {
        return `\u201C${file.name}\u201D content does not match its extension (possible spoofing).`;
      }
    }
    if (allowedMimeTypes.length > 0 && !kindMatchesMimeAllowlist(kind, allowedMimeTypes)) {
      return `\u201C${file.name}\u201D content does not match an allowed type (MIME / magic bytes).`;
    }
  }
  if (scanContent && kind === "pdf") {
    const sqlErr = scanBufferForSuspiciousPatterns(head, false);
    if (sqlErr)
      return `\u201C${file.name}\u201D: ${sqlErr}`;
  }
  if (scanContent && kind === "svg") {
    const xssErr = scanBufferForSuspiciousPatterns(head, true);
    if (xssErr)
      return `\u201C${file.name}\u201D: ${xssErr}`;
  }
  return null;
}
async function validateFilesSecurity(files, options) {
  for (const f of files) {
    const err = await validateFileSecurity(f, options);
    if (err)
      return err;
  }
  return null;
}

// src/components/molecules/FileUpload/useFilePicker.ts
function toArray2(list) {
  if (!list || list.length === 0)
    return [];
  return Array.from(list);
}
function formatLimit(maxSizeBytes) {
  return maxSizeBytes >= 1024 * 1024 ? `${(maxSizeBytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(maxSizeBytes / 1024))} KB`;
}
function useFilePicker(options = {}) {
  var _a, _b;
  const {
    accept,
    multiple = false,
    disabled = false,
    name,
    maxFiles,
    maxSizeBytes,
    allowedExtensions,
    allowedMimeTypes,
    verifyMagicBytes,
    scanPdfForSqlInjection = false,
    maxScanBytes,
    capture,
    onFiles,
    onError,
    clearInputAfterSelect = true
  } = options;
  const inputRef = useRef7(null);
  const [error, setError] = useState10(null);
  const parsedAccept = useMemo9(() => parseAcceptString(accept), [accept]);
  const hasAllowlist = ((_a = allowedExtensions == null ? void 0 : allowedExtensions.length) != null ? _a : 0) > 0 || ((_b = allowedMimeTypes == null ? void 0 : allowedMimeTypes.length) != null ? _b : 0) > 0 || parsedAccept.extensions.length > 0 || parsedAccept.mimes.length > 0;
  const securityOptions = useMemo9(
    () => ({
      accept,
      allowedExtensions,
      allowedMimeTypes,
      verifyMagicBytes: verifyMagicBytes !== void 0 ? verifyMagicBytes : hasAllowlist,
      scanPdfForSqlInjection,
      maxScanBytes
    }),
    [accept, allowedExtensions, allowedMimeTypes, verifyMagicBytes, hasAllowlist, scanPdfForSqlInjection, maxScanBytes]
  );
  const validateSync = useCallback8(
    (files) => {
      if (files.length === 0)
        return null;
      if (multiple && maxFiles != null && files.length > maxFiles) {
        return `You can upload at most ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`;
      }
      if (!multiple && files.length > 1)
        return "Only one file is allowed.";
      if (maxSizeBytes != null) {
        for (const f of files) {
          if (f.size > maxSizeBytes)
            return `\u201C${f.name}\u201D is larger than ${formatLimit(maxSizeBytes)}.`;
        }
      }
      return null;
    },
    [maxFiles, maxSizeBytes, multiple]
  );
  const handleFiles = useCallback8(
    async (list) => {
      const files = toArray2(list);
      const fail = (msg) => {
        setError(msg);
        onError == null ? void 0 : onError(msg);
        if (clearInputAfterSelect && inputRef.current)
          inputRef.current.value = "";
        return false;
      };
      const syncErr = validateSync(files);
      if (syncErr)
        return fail(syncErr);
      const secErr = await validateFilesSecurity(files, securityOptions);
      if (secErr)
        return fail(secErr);
      setError(null);
      onFiles == null ? void 0 : onFiles(files);
      if (clearInputAfterSelect && inputRef.current)
        inputRef.current.value = "";
      return true;
    },
    [clearInputAfterSelect, onError, onFiles, securityOptions, validateSync]
  );
  const onChange = useCallback8(
    (e) => {
      void handleFiles(e.target.files);
    },
    [handleFiles]
  );
  const open = useCallback8(() => {
    var _a2;
    if (disabled)
      return;
    (_a2 = inputRef.current) == null ? void 0 : _a2.click();
  }, [disabled]);
  const clearError = useCallback8(() => setError(null), []);
  const captureValue = capture === true ? "user" : capture === false || capture == null ? void 0 : capture;
  const inputProps = useMemo9(
    () => ({
      ref: inputRef,
      type: "file",
      accept,
      multiple,
      disabled,
      name,
      ...captureValue ? { capture: captureValue } : {},
      hidden: true,
      tabIndex: -1,
      "aria-hidden": true,
      onChange
    }),
    [accept, multiple, disabled, name, captureValue, onChange]
  );
  return { open, inputProps, inputRef, error, clearError, handleFiles };
}

// src/components/molecules/FileUpload/index.tsx
import { Fragment as Fragment3, jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
function cls12(...parts) {
  return parts.filter(Boolean).join(" ");
}
function SmallUploadIcon() {
  return /* @__PURE__ */ jsx13("svg", { width: 16, height: 16, viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx13(
    "path",
    {
      fill: "currentColor",
      d: "M18 15v3H6v-3H4v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3h-2ZM7 9l5-5.5L17 9h-4v4H7V9Z"
    }
  ) });
}
function DefaultUploadIcon() {
  return /* @__PURE__ */ jsx13("svg", { width: 40, height: 40, viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx13(
    "path",
    {
      fill: "currentColor",
      d: "M18 15v3H6v-3H4v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3h-2ZM7 9l5-5.5L17 9h-4v4H7V9Z"
    }
  ) });
}
var FileUpload = React13.memo(function FileUpload2({
  label,
  description,
  errorMessage,
  name,
  accept,
  multiple = false,
  disabled = false,
  required = false,
  maxFiles,
  maxSizeBytes,
  allowedExtensions,
  allowedMimeTypes,
  verifyMagicBytes,
  scanPdfForSqlInjection = false,
  maxScanBytes,
  capture,
  onFilesChange,
  onError,
  clearInputAfterSelect = true,
  size = "md",
  icon,
  id: idProp,
  className,
  variant = "dropzone",
  buttonVariant = "outlineSecondary",
  buttonSize = "md",
  buttonProps,
  ...rest
}) {
  var _a;
  const reactId = useId7();
  const baseId = idProp != null ? idProp : `file-upload-${reactId.replace(/:/g, "")}`;
  const isButton = variant === "button";
  const inputId = isButton ? `${baseId}-input` : baseId;
  const descId = `${baseId}-desc`;
  const errId = `${baseId}-err`;
  const dragDepth = useRef8(0);
  const [dragging, setDragging] = useState11(false);
  const picker = useFilePicker({
    accept,
    multiple,
    disabled,
    name,
    maxFiles,
    maxSizeBytes,
    allowedExtensions,
    allowedMimeTypes,
    verifyMagicBytes,
    scanPdfForSqlInjection,
    maxScanBytes,
    capture,
    onFiles: onFilesChange,
    onError,
    clearInputAfterSelect
  });
  const { hidden: _hidden, tabIndex: _tabIndex, "aria-hidden": _ariaHidden, ...visibleInputProps } = picker.inputProps;
  const { handleFiles } = picker;
  const showError = (_a = errorMessage != null ? errorMessage : picker.error) != null ? _a : void 0;
  const describedBy = cls12(description && descId, showError && errId) || void 0;
  const onDragEnter = useCallback9((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled)
      return;
    dragDepth.current += 1;
    setDragging(true);
  }, [disabled]);
  const onDragLeave = useCallback9((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled)
      return;
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setDragging(false);
    }
  }, [disabled]);
  const onDragOver = useCallback9((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      e.dataTransfer.dropEffect = "copy";
    }
  }, [disabled]);
  const onDrop = useCallback9(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragDepth.current = 0;
      setDragging(false);
      if (disabled)
        return;
      void handleFiles(e.dataTransfer.files);
    },
    [handleFiles, disabled]
  );
  const messages = /* @__PURE__ */ jsxs11(Fragment3, { children: [
    isButton && description ? /* @__PURE__ */ jsx13("p", { id: descId, className: "ds-file-upload__description", children: description }) : null,
    showError ? /* @__PURE__ */ jsx13("p", { id: errId, className: "ds-file-upload__error", role: "alert", children: showError }) : null
  ] });
  if (isButton) {
    return /* @__PURE__ */ jsxs11(
      "div",
      {
        className: cls12("ds-file-upload", "ds-file-upload--button", className),
        "data-size": size,
        "data-variant": "button",
        "data-error": showError ? "true" : void 0,
        "data-disabled": disabled ? "true" : void 0,
        ...rest,
        children: [
          /* @__PURE__ */ jsx13("input", { ...picker.inputProps, id: inputId, required }),
          /* @__PURE__ */ jsx13(
            Button_default,
            {
              type: "button",
              variant: buttonVariant,
              size: buttonSize,
              ...buttonProps,
              id: baseId,
              disabled,
              onClick: picker.open,
              "aria-describedby": describedBy,
              "aria-invalid": showError ? true : void 0,
              icon: icon === null ? void 0 : icon === void 0 ? /* @__PURE__ */ jsx13(SmallUploadIcon, {}) : icon,
              children: label
            }
          ),
          messages
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      className: cls12("ds-file-upload", className),
      "data-size": size,
      "data-dragging": dragging ? "true" : void 0,
      "data-error": showError ? "true" : void 0,
      "data-disabled": disabled ? "true" : void 0,
      ...rest,
      children: [
        /* @__PURE__ */ jsx13(
          "input",
          {
            ...visibleInputProps,
            id: inputId,
            className: "ds-file-upload__input",
            required,
            "aria-invalid": showError ? true : void 0,
            "aria-describedby": describedBy,
            "aria-required": required || void 0
          }
        ),
        /* @__PURE__ */ jsx13(
          "div",
          {
            className: "ds-file-upload__zone",
            "data-disabled": disabled ? "true" : void 0,
            onDragEnter,
            onDragLeave,
            onDragOver,
            onDrop,
            children: /* @__PURE__ */ jsxs11("label", { htmlFor: inputId, className: "ds-file-upload__label", children: [
              icon !== null ? /* @__PURE__ */ jsx13("span", { className: "ds-file-upload__icon", children: icon === void 0 ? /* @__PURE__ */ jsx13(DefaultUploadIcon, {}) : icon }) : null,
              /* @__PURE__ */ jsx13("span", { children: label }),
              description ? /* @__PURE__ */ jsx13("p", { id: descId, className: "ds-file-upload__description", children: description }) : null
            ] })
          }
        ),
        messages
      ]
    }
  );
});
var FileUpload_default = FileUpload;
var Dropzone = FileUpload;

// src/components/molecules/ContextMenu/index.tsx
import {
  createContext as createContext6,
  forwardRef,
  useCallback as useCallback10,
  useContext as useContext7,
  useEffect as useEffect3,
  useId as useId8,
  useLayoutEffect as useLayoutEffect2,
  useMemo as useMemo10,
  useRef as useRef9,
  useState as useState12
} from "react";
import { createPortal } from "react-dom";

// src/components/molecules/ContextMenu/contextMenuPosition.ts
function computeContextMenuPosition(point, width, height, viewport, padding = 8) {
  const maxW = Math.max(0, viewport.width - padding * 2);
  const maxH = Math.max(0, viewport.height - padding * 2);
  const w = Math.min(width, maxW);
  const h = Math.min(height, maxH);
  let left = point.x;
  if (left + w > viewport.width - padding)
    left = point.x - w;
  let top = point.y;
  if (top + h > viewport.height - padding)
    top = point.y - h;
  left = Math.min(Math.max(left, padding), viewport.width - padding - w);
  top = Math.min(Math.max(top, padding), viewport.height - padding - h);
  return { top, left, maxHeight: maxH };
}

// src/components/molecules/ContextMenu/index.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
function cls13(...parts) {
  return parts.filter(Boolean).join(" ");
}
var ContextMenuContext = createContext6(null);
function useContextMenu(component) {
  const ctx = useContext7(ContextMenuContext);
  if (!ctx)
    throw new Error(`${component} must be used within <ContextMenu>`);
  return ctx;
}
function ContextMenu({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  position: positionProp,
  disabled = false
}) {
  const base = useId8().replace(/:/g, "");
  const contentId = `context-menu-${base}`;
  const isControlled = openProp !== void 0;
  const [innerOpen, setInnerOpen] = useState12(defaultOpen);
  const open = isControlled ? Boolean(openProp) : innerOpen;
  const [innerPosition, setInnerPosition] = useState12(void 0);
  const position = positionProp != null ? positionProp : innerPosition;
  const triggerRef = useRef9(null);
  const returnFocusRef = useRef9(null);
  const restoreOnCloseRef = useRef9(true);
  const prevOpenRef = useRef9(false);
  const setOpen = useCallback10(
    (next, opts) => {
      if (!next)
        restoreOnCloseRef.current = (opts == null ? void 0 : opts.restore) !== false;
      if (!isControlled)
        setInnerOpen(next);
      onOpenChange == null ? void 0 : onOpenChange(next);
    },
    [isControlled, onOpenChange]
  );
  useLayoutEffect2(() => {
    if (!prevOpenRef.current && open && typeof document !== "undefined") {
      if (!returnFocusRef.current) {
        const active2 = document.activeElement;
        returnFocusRef.current = active2 && active2 !== document.body ? active2 : triggerRef.current;
      }
      restoreOnCloseRef.current = true;
    }
  }, [open]);
  useEffect3(() => {
    if (prevOpenRef.current && !open) {
      const target = returnFocusRef.current;
      returnFocusRef.current = null;
      if (restoreOnCloseRef.current)
        requestAnimationFrame(() => restoreFocus(target));
    }
    prevOpenRef.current = open;
  }, [open]);
  const ctx = useMemo10(
    () => ({
      open,
      setOpen,
      position,
      setPosition: setInnerPosition,
      contentId,
      triggerRef,
      returnFocusRef,
      disabled
    }),
    [open, setOpen, position, contentId, disabled]
  );
  const anchorRef = returnFocusRef;
  const popoverCtx = useMemo10(
    () => ({
      open,
      setOpen: (next) => setOpen(next),
      triggerId: `${contentId}-trigger`,
      contentId,
      triggerRef,
      anchorRef,
      placement: "bottom-start"
    }),
    [open, setOpen, contentId, anchorRef]
  );
  return /* @__PURE__ */ jsx14(ContextMenuContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx14(PopoverContext.Provider, { value: popoverCtx, children }) });
}
ContextMenu.displayName = "ContextMenu";
var ContextMenuTrigger = forwardRef(function ContextMenuTrigger2({ children, asChild = false, disabled: disabledProp = false, onContextMenu, onKeyDown, ...rest }, ref) {
  const ctx = useContextMenu("ContextMenuTrigger");
  const disabled = disabledProp || ctx.disabled;
  const setRefs = useCallback10(
    (el) => {
      ctx.triggerRef.current = el;
      if (typeof ref === "function")
        ref(el);
      else if (ref)
        ref.current = el;
    },
    [ctx.triggerRef, ref]
  );
  const openAt = (point, invoker) => {
    var _a;
    ctx.setPosition(point);
    const active2 = typeof document !== "undefined" ? document.activeElement : null;
    ctx.returnFocusRef.current = active2 && active2 !== document.body && ((_a = ctx.triggerRef.current) == null ? void 0 : _a.contains(active2)) ? active2 : invoker != null ? invoker : ctx.triggerRef.current;
    ctx.setOpen(true);
  };
  const handlers = {
    "data-state": ctx.open ? "open" : "closed",
    "aria-haspopup": "menu",
    onContextMenu: (e) => {
      onContextMenu == null ? void 0 : onContextMenu(e);
      if (disabled || e.defaultPrevented)
        return;
      e.preventDefault();
      openAt({ x: e.clientX, y: e.clientY }, e.currentTarget);
    },
    onKeyDown: (e) => {
      var _a;
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (disabled || e.defaultPrevented)
        return;
      if (e.key === "F10" && e.shiftKey || e.key === "ContextMenu") {
        e.preventDefault();
        const target = (_a = e.target) != null ? _a : e.currentTarget;
        const r = target.getBoundingClientRect();
        openAt({ x: r.left, y: r.bottom }, target);
      }
    }
  };
  if (asChild) {
    return renderSlot(children, { ...rest, ...handlers }, setRefs, "ContextMenuTrigger");
  }
  return /* @__PURE__ */ jsx14(
    "div",
    {
      ...rest,
      ...handlers,
      ref: setRefs,
      className: cls13("ds-context-menu__trigger", rest.className),
      children
    }
  );
});
var ContextMenuContent = forwardRef(function ContextMenuContent2({
  children,
  className,
  zIndex,
  collisionPadding = 8,
  style,
  onKeyDown,
  onMouseDownCapture,
  onContextMenu,
  ...rest
}, ref) {
  var _a, _b, _c;
  const ctx = useContextMenu("ContextMenuContent");
  const { open, setOpen, position, contentId, triggerRef, returnFocusRef } = ctx;
  const contentRef = useRef9(null);
  const insideTreeRef = useRef9(false);
  const [placement, setPlacement] = useState12(null);
  const [layerZ, setLayerZ] = useState12("var(--z-popover, 450)");
  const point = useMemo10(() => {
    var _a2;
    if (position)
      return position;
    const r = (_a2 = triggerRef.current) == null ? void 0 : _a2.getBoundingClientRect();
    return r ? { x: r.left, y: r.bottom } : { x: 0, y: 0 };
  }, [position, open, triggerRef]);
  const measure = useCallback10(() => {
    const panel = contentRef.current;
    if (!panel || typeof window === "undefined")
      return;
    const next = computeContextMenuPosition(
      point,
      panel.offsetWidth,
      panel.offsetHeight,
      { width: window.innerWidth, height: window.innerHeight },
      collisionPadding
    );
    setPlacement(
      (prev) => prev && prev.top === next.top && prev.left === next.left && prev.maxHeight === next.maxHeight ? prev : next
    );
  }, [point, collisionPadding]);
  useLayoutEffect2(() => {
    var _a2;
    if (!open) {
      setPlacement(null);
      return;
    }
    measure();
    if (zIndex === void 0) {
      setLayerZ(resolveLayerZIndex((_a2 = returnFocusRef.current) != null ? _a2 : triggerRef.current, void 0));
    }
  }, [open, measure, zIndex, returnFocusRef, triggerRef]);
  useEffect3(() => {
    if (!open)
      return;
    const panel = contentRef.current;
    if (!panel)
      return;
    const first = getMenuItems(panel)[0];
    (first != null ? first : panel).focus({ preventScroll: true });
  }, [open]);
  const parentLayerId = useContext7(FloatingLayerContext);
  useEffect3(() => {
    if (!open)
      return void 0;
    pushFloatingLayer(contentId, parentLayerId);
    return () => popFloatingLayer(contentId);
  }, [open, contentId, parentLayerId]);
  useEffect3(() => {
    if (!open)
      return void 0;
    const isInside = (t) => {
      var _a2;
      return t instanceof Node && !!((_a2 = contentRef.current) == null ? void 0 : _a2.contains(t));
    };
    const onMouseDown = (e) => {
      const inside = insideTreeRef.current;
      insideTreeRef.current = false;
      if (inside || isInside(e.target))
        return;
      setOpen(false, { restore: false });
    };
    const onKey = (e) => {
      if (e.key !== "Escape" || e.isComposing || e.defaultPrevented)
        return;
      if (!isTopFloatingLayer(contentId))
        return;
      e.preventDefault();
      setOpen(false);
    };
    const onScroll = (e) => {
      if (isInside(e.target))
        return;
      setOpen(false, { restore: false });
    };
    const onBlurOrResize = () => setOpen(false, { restore: false });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey, true);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onBlurOrResize);
    window.addEventListener("blur", onBlurOrResize);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onBlurOrResize);
      window.removeEventListener("blur", onBlurOrResize);
    };
  }, [open, setOpen, contentId]);
  if (!open || typeof document === "undefined")
    return null;
  const label = (_a = rest["aria-label"]) != null ? _a : rest["aria-labelledby"] ? void 0 : "Context menu";
  return createPortal(
    /* @__PURE__ */ jsx14(
      "div",
      {
        ...rest,
        ref: (el) => {
          contentRef.current = el;
          if (typeof ref === "function")
            ref(el);
          else if (ref)
            ref.current = el;
        },
        id: contentId,
        role: "menu",
        "aria-orientation": "vertical",
        "aria-label": label,
        tabIndex: -1,
        "data-state": "open",
        "data-positioned": placement ? "true" : "false",
        className: cls13("ds-popover__content", "ds-context-menu__content", className),
        style: {
          position: "fixed",
          top: (_b = placement == null ? void 0 : placement.top) != null ? _b : point.y,
          left: (_c = placement == null ? void 0 : placement.left) != null ? _c : point.x,
          maxHeight: placement == null ? void 0 : placement.maxHeight,
          overflow: "auto",
          zIndex: zIndex != null ? zIndex : layerZ,
          ...style
        },
        onMouseDownCapture: (e) => {
          insideTreeRef.current = true;
          onMouseDownCapture == null ? void 0 : onMouseDownCapture(e);
        },
        onContextMenu: (e) => {
          onContextMenu == null ? void 0 : onContextMenu(e);
          e.preventDefault();
        },
        onKeyDown: (e) => {
          onKeyDown == null ? void 0 : onKeyDown(e);
          if (e.defaultPrevented)
            return;
          if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
            return;
          }
          if (e.key === "Tab") {
            e.preventDefault();
            setOpen(false);
            return;
          }
          handleMenuKeyNavigation(e);
        },
        children: /* @__PURE__ */ jsx14(FloatingLayerContext.Provider, { value: contentId, children })
      }
    ),
    document.body
  );
});
var ContextMenuItem = DropdownMenuItem;
var ContextMenuCheckboxItem = DropdownMenuCheckboxItem;
var ContextMenuRadioGroup = DropdownMenuRadioGroup;
var ContextMenuRadioItem = DropdownMenuRadioItem;
var ContextMenuLabel = DropdownMenuLabel;
var ContextMenuSeparator = DropdownMenuSeparator;
var ContextMenuGroup = DropdownMenuGroup;

// src/components/atoms/TextArea/index.tsx
import { useId as useId9, useState as useState13, useEffect as useEffect4, forwardRef as forwardRef2 } from "react";

// src/components/atoms/TextArea/TextArea.config.ts
var defaultConfig = {
  defaultRows: 3,
  /** No limit by default — pass `maxLength` to cap input (0.0.4: was 500, which silently truncated). */
  defaultMaxLength: void 0,
  defaultRemoveChars: "/<>@#",
  /** Only applies when `sanitize` is true (sanitize is off by default, so text is never altered implicitly). */
  defaultRemoveEmojis: true,
  defaultNormalizeAccents: true,
  defaultToCase: ""
};
var TextArea_config_default = defaultConfig;

// src/components/atoms/TextArea/TextArea.utils.ts
function sanitizeValue(value, opts) {
  if (!opts)
    return value;
  const { removeChars, removeEmojis, normalizeAccents, toCase } = opts;
  let out = value != null ? value : "";
  try {
    out = getSanitizeText(out, removeChars != null ? removeChars : "", !!removeEmojis, !!normalizeAccents);
  } catch (err) {
    out = value;
  }
  if (toCase === "U")
    out = out.toUpperCase();
  else if (toCase === "L")
    out = out.toLowerCase();
  else if (toCase === "C")
    out = out.charAt(0).toUpperCase() + out.slice(1);
  return out;
}

// src/components/atoms/TextArea/index.tsx
import { jsx as jsx15, jsxs as jsxs12 } from "react/jsx-runtime";
var TextArea = forwardRef2(function TextArea2({
  label,
  size = "",
  className = "",
  containerClass = "",
  rows = TextArea_config_default.defaultRows,
  maxLength = TextArea_config_default.defaultMaxLength,
  fullWidth = true,
  helperText,
  errorMessage,
  showCount = false,
  status,
  resize = "vertical",
  rounded = "4",
  sanitize = false,
  removeChars = TextArea_config_default.defaultRemoveChars,
  removeEmojis = TextArea_config_default.defaultRemoveEmojis,
  normalizeAccents = TextArea_config_default.defaultNormalizeAccents,
  toCase = TextArea_config_default.defaultToCase,
  value,
  defaultValue,
  onChange,
  ariaLabel,
  disabled = false,
  id: idProp,
  ...props
}, ref) {
  var _a;
  const generatedId = useId9();
  const textareaId = idProp != null ? idProp : generatedId;
  const [internalValue, setInternalValue] = useState13((_a = value != null ? value : defaultValue) != null ? _a : "");
  useEffect4(() => {
    if (typeof value === "string" && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);
  const handleChange = (e) => {
    var _a2;
    let val = (_a2 = e.target.value) != null ? _a2 : "";
    if (sanitize) {
      val = sanitizeValue(val, {
        removeChars,
        removeEmojis,
        normalizeAccents,
        toCase
      });
    } else if (toCase) {
      if (toCase === "U")
        val = val.toUpperCase();
      else if (toCase === "L")
        val = val.toLowerCase();
      else if (toCase === "C")
        val = val.charAt(0).toUpperCase() + val.slice(1);
    }
    setInternalValue(val);
    onChange == null ? void 0 : onChange(val, e);
  };
  const resolvedStatus = status != null ? status : errorMessage ? "error" : void 0;
  const currentLength = internalValue.length;
  const footerMessage = errorMessage != null ? errorMessage : helperText;
  const footerMessageColor = resolvedStatus === "error" ? "var(--color-state-error)" : resolvedStatus === "warning" ? "var(--color-state-warning)" : resolvedStatus === "success" ? "var(--color-state-success)" : "var(--color-text-secondary)";
  const minHeight = size === "lg" ? 128 : size === "sm" ? 96 : 112;
  const paddingX = size === "lg" ? 16 : size === "sm" ? 12 : 14;
  const paddingY = size === "lg" ? 12 : size === "sm" ? 8 : 10;
  const fontSize = size === "sm" ? "var(--text-small-size, 12px)" : "var(--text-body-size, 16px)";
  const resizeValue = resize === "horizontal" ? "horizontal" : resize === "both" ? "both" : resize === "none" ? "none" : "vertical";
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error)" : resolvedStatus === "warning" ? "var(--color-state-warning)" : resolvedStatus === "success" ? "var(--color-state-success)" : "var(--color-border-default)";
  const wrapperStyle = {
    width: fullWidth ? "100%" : "auto",
    display: fullWidth ? "block" : "inline-block"
  };
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: "var(--color-text-primary)",
    fontSize: "var(--text-secondary-size, 14px)",
    fontWeight: 500,
    lineHeight: 1.5
  };
  const textareaStyle = {
    display: "block",
    width: "100%",
    minWidth: 0,
    minHeight,
    padding: `${paddingY}px ${paddingX}px`,
    boxSizing: "border-box",
    resize: resizeValue,
    borderRadius: rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px",
    border: `1.5px solid ${borderColor}`,
    background: disabled ? "var(--color-bg-page)" : "var(--color-bg-surface)",
    color: disabled ? "var(--color-text-secondary)" : "var(--color-text-primary)",
    outline: "none",
    fontSize,
    lineHeight: 1.5,
    transition: "border-color 150ms, background-color 150ms"
  };
  const footerRowStyle = {
    marginTop: 8,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12
  };
  const footerTextStyle = {
    margin: 0,
    color: footerMessageColor,
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  const countStyle = {
    margin: 0,
    flexShrink: 0,
    color: "var(--color-text-secondary)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  return /* @__PURE__ */ jsxs12("div", { className: containerClass, style: wrapperStyle, children: [
    label && /* @__PURE__ */ jsx15("label", { htmlFor: textareaId, style: labelStyle, children: label }),
    /* @__PURE__ */ jsx15(
      "textarea",
      {
        ref,
        id: textareaId,
        className,
        style: textareaStyle,
        value: internalValue,
        rows,
        maxLength,
        onChange: handleChange,
        "aria-invalid": resolvedStatus === "error",
        "aria-label": label ? void 0 : ariaLabel,
        disabled,
        ...props
      }
    ),
    (footerMessage || showCount) && /* @__PURE__ */ jsxs12("div", { style: footerRowStyle, children: [
      /* @__PURE__ */ jsx15("span", { style: footerTextStyle, children: footerMessage }),
      showCount && /* @__PURE__ */ jsx15("span", { style: countStyle, children: maxLength != null ? `${currentLength} / ${maxLength}` : currentLength })
    ] })
  ] });
});
TextArea.displayName = "TextArea";
var TextArea_default = TextArea;

// src/components/atoms/ProgressBar/index.tsx
import React16 from "react";

// src/components/atoms/ProgressBar/ProgressBar.config.ts
var DEFAULT_COLOR = "var(--color-brand-primary)";
var DEFAULT_HEIGHT = "1rem";
var DEFAULT_WIDTH = "100%";
var DEFAULT_ARIA_LABEL = "Progress";
var DEFAULT_TYPE = "line";
var DEFAULT_SIZE = "lg";
var SIZE_DIMENSIONS = {
  xs: 32,
  sm: 45,
  md: 70,
  lg: 90
};

// src/components/atoms/ProgressBar/ProgressBar.utils.ts
var computePercentage = ({
  value,
  stepCount,
  formCount
}) => {
  if (formCount && stepCount) {
    return Math.min(100, stepCount / formCount * 100);
  }
  return value;
};
var clamp2 = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
var calculateCircumference = (radius) => 2 * Math.PI * radius;

// src/components/atoms/ProgressBar/index.tsx
import { jsx as jsx16, jsxs as jsxs13 } from "react/jsx-runtime";
var ProgressBar = ({
  value,
  type = DEFAULT_TYPE,
  customColor = DEFAULT_COLOR,
  gradient,
  trackColor,
  striped = false,
  animated = false,
  animation = "smooth",
  showLabel = true,
  label,
  size = DEFAULT_SIZE,
  className = "",
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  ariaLabel = DEFAULT_ARIA_LABEL,
  stepCount,
  formCount,
  showValue = true,
  strokeWidth,
  rounded = true
}) => {
  const computedPct = computePercentage({ value, stepCount, formCount });
  const pct = clamp2(computedPct);
  const visualFill = gradient || customColor;
  const trackFill = trackColor || "var(--color-bg-page)";
  const resolvedAnimation = animation !== "smooth" ? animation : animated ? "pulse" : "smooth";
  const [animatedWidth, setAnimatedWidth] = React16.useState(0);
  React16.useEffect(() => {
    if (type === "line") {
      const timer = setTimeout(() => setAnimatedWidth(pct), 50);
      return () => clearTimeout(timer);
    }
  }, [pct, type]);
  if (type === "line") {
    const lineTrackStyle = {
      height,
      background: trackFill,
      borderRadius: rounded ? 9999 : 6
    };
    const lineFillStyle = {
      width: `${animatedWidth}%`,
      height: "100%",
      background: visualFill,
      borderRadius: rounded ? 9999 : 6,
      transition: resolvedAnimation === "none" ? "none" : "width 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease",
      position: "relative",
      overflow: "hidden"
    };
    const showStripeOverlay = striped || resolvedAnimation === "stripes-flow";
    return /* @__PURE__ */ jsxs13(
      "div",
      {
        className: `progress-bar-reduce-motion ${className}`.trim(),
        style: { width },
        role: "progressbar",
        "aria-valuenow": Math.round(pct),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": ariaLabel,
        children: [
          /* @__PURE__ */ jsxs13(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: showLabel || showValue ? 8 : 0
              },
              children: [
                showLabel && label ? /* @__PURE__ */ jsx16(
                  "span",
                  {
                    style: {
                      color: "var(--color-text-primary)",
                      fontSize: "var(--text-small-size, 12px)",
                      fontWeight: 600,
                      lineHeight: 1.5
                    },
                    children: label
                  }
                ) : /* @__PURE__ */ jsx16("span", {}),
                showValue && /* @__PURE__ */ jsxs13(
                  "span",
                  {
                    style: {
                      color: "var(--color-text-secondary)",
                      fontSize: "var(--text-small-size, 12px)",
                      lineHeight: 1.5
                    },
                    children: [
                      Math.round(pct),
                      "%"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx16(
            "div",
            {
              style: {
                ...lineTrackStyle,
                position: "relative",
                overflow: "hidden",
                width: "100%"
              },
              children: /* @__PURE__ */ jsx16(
                "div",
                {
                  className: "progress-bar-fill",
                  style: {
                    ...lineFillStyle,
                    opacity: resolvedAnimation === "pulse" ? 0.92 : 1,
                    animation: resolvedAnimation === "pulse" ? "progress-pulse 1.4s ease-in-out infinite" : void 0
                  },
                  children: showStripeOverlay && /* @__PURE__ */ jsx16(
                    "span",
                    {
                      className: "progress-bar-stripes",
                      style: {
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, rgba(255,255,255,0.28) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.28) 75%, transparent 75%, transparent)",
                        backgroundSize: "16px 16px",
                        animation: resolvedAnimation === "stripes-flow" ? "progress-stripes 0.8s linear infinite" : void 0
                      }
                    }
                  )
                }
              )
            }
          )
        ]
      }
    );
  }
  const dims = SIZE_DIMENSIONS[size] || 50;
  const effectiveStrokeWidth = strokeWidth != null ? strokeWidth : Math.max(4, Math.round(dims * 0.1));
  const radius = (dims - effectiveStrokeWidth - 4) / 2;
  const circumference = calculateCircumference(radius);
  const [animatedOffset, setAnimatedOffset] = React16.useState(circumference);
  React16.useEffect(() => {
    const newOffset = circumference * (1 - pct / 100);
    const timer = setTimeout(() => setAnimatedOffset(newOffset), 50);
    return () => clearTimeout(timer);
  }, [pct, circumference]);
  const getFontSize = () => {
    if (size === "xs")
      return "14px";
    if (size === "sm")
      return "16px";
    if (size === "md")
      return "20px";
    if (size === "lg")
      return "24px";
    return void 0;
  };
  const fontSize = getFontSize();
  const circleId = React16.useId();
  return /* @__PURE__ */ jsxs13(
    "div",
    {
      className: `progress-bar-reduce-motion ${className}`.trim(),
      style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
      role: "progressbar",
      "aria-valuenow": Math.round(pct),
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": ariaLabel,
      children: [
        /* @__PURE__ */ jsxs13(
          "div",
          {
            style: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: dims, height: dims },
            children: [
              /* @__PURE__ */ jsxs13("svg", { width: dims, height: dims, className: "block", children: [
                gradient && /* @__PURE__ */ jsx16("defs", { children: /* @__PURE__ */ jsxs13("linearGradient", { id: `progress-gradient-${circleId}`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                  /* @__PURE__ */ jsx16("stop", { offset: "0%", stopColor: "var(--color-state-info)" }),
                  /* @__PURE__ */ jsx16("stop", { offset: "100%", stopColor: "var(--color-accent-lavender-40)" })
                ] }) }),
                /* @__PURE__ */ jsx16(
                  "circle",
                  {
                    cx: dims / 2,
                    cy: dims / 2,
                    r: radius,
                    strokeWidth: effectiveStrokeWidth,
                    style: { stroke: trackFill, fill: "none" }
                  }
                ),
                /* @__PURE__ */ jsx16(
                  "circle",
                  {
                    className: "progress-bar-circle-stroke",
                    cx: dims / 2,
                    cy: dims / 2,
                    r: radius,
                    strokeWidth: effectiveStrokeWidth,
                    style: {
                      stroke: gradient ? `url(#progress-gradient-${circleId})` : customColor,
                      strokeDasharray: circumference,
                      strokeDashoffset: animatedOffset,
                      strokeLinecap: rounded ? "round" : "butt",
                      fill: "none",
                      transition: resolvedAnimation === "none" ? "none" : "stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: "rotate(-90deg)",
                      transformOrigin: "center",
                      filter: resolvedAnimation === "pulse" ? "drop-shadow(0 0 6px var(--color-progress-glow, rgba(59, 130, 246, 0.35)))" : void 0
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx16(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "var(--color-text-primary)",
                    fontWeight: 700,
                    lineHeight: 1,
                    fontSize: fontSize || 16
                  },
                  children: showValue ? `${Math.round(pct)}%` : stepCount !== void 0 ? stepCount : Math.round(pct)
                }
              )
            ]
          }
        ),
        showLabel && label && /* @__PURE__ */ jsx16(
          "div",
          {
            style: {
              color: "var(--color-text-secondary)",
              fontSize: "var(--text-small-size, 12px)",
              textAlign: "center",
              lineHeight: 1.5
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsx16("style", { children: `
        @keyframes progress-pulse {
          0%, 100% { opacity: 0.86; }
          50% { opacity: 1; }
        }
        @keyframes progress-stripes {
          from { background-position: 0 0; }
          to { background-position: 16px 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .progress-bar-reduce-motion .progress-bar-fill,
          .progress-bar-reduce-motion .progress-bar-stripes,
          .progress-bar-reduce-motion .progress-bar-circle-stroke {
            animation: none !important;
            transition: none !important;
          }
        }
      ` })
      ]
    }
  );
};
var ProgressBar_default = ProgressBar;

// src/components/atoms/GradientText/index.tsx
import React17 from "react";
import { jsx as jsx17 } from "react/jsx-runtime";
var defaultGradient = "linear-gradient(135deg, var(--color-brand-primary) 0%, var(--color-brand-secondary) 100%)";
var GradientText = React17.memo(function GradientText2({
  children,
  as: Component = "span",
  gradient = defaultGradient,
  fallbackColor = "var(--color-brand-primary)",
  className = "",
  style
}) {
  return /* @__PURE__ */ jsx17(
    Component,
    {
      className,
      style: {
        display: "inline-block",
        color: fallbackColor,
        backgroundImage: gradient,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style
      },
      children
    }
  );
});
var GradientText_default = GradientText;

// src/components/atoms/ToolTip/index.tsx
import React19, { useCallback as useCallback12, useEffect as useEffect6, useRef as useRef11, useState as useState15 } from "react";

// src/components/molecules/Tooltip/index.tsx
import React18, {
  cloneElement as cloneElement3,
  isValidElement as isValidElement4,
  useCallback as useCallback11,
  useEffect as useEffect5,
  useId as useId10,
  useLayoutEffect as useLayoutEffect3,
  useRef as useRef10,
  useState as useState14
} from "react";
import { createPortal as createPortal2 } from "react-dom";

// src/components/molecules/Tooltip/Tooltip.config.ts
var TOOLTIP_DEFAULTS = {
  side: "top",
  align: "center",
  delay: 300,
  closeDelay: 100,
  maxWidth: 240,
  variant: "dark"
};
var TOOLTIP_GAP = 8;
var TOOLTIP_VIEWPORT_PADDING = 8;

// src/components/molecules/Tooltip/tooltipPosition.ts
var OPPOSITE = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
function clamp3(value, min, max) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}
function spaceOn(side, r, vp) {
  switch (side) {
    case "top":
      return r.top - TOOLTIP_GAP - TOOLTIP_VIEWPORT_PADDING;
    case "bottom":
      return vp.height - r.bottom - TOOLTIP_GAP - TOOLTIP_VIEWPORT_PADDING;
    case "left":
      return r.left - TOOLTIP_GAP - TOOLTIP_VIEWPORT_PADDING;
    case "right":
      return vp.width - r.right - TOOLTIP_GAP - TOOLTIP_VIEWPORT_PADDING;
  }
}
function resolveTooltipSide(preferred, r, width, height, vp) {
  const needed = preferred === "top" || preferred === "bottom" ? height : width;
  const here = spaceOn(preferred, r, vp);
  if (here >= needed)
    return preferred;
  const opposite = OPPOSITE[preferred];
  const there = spaceOn(opposite, r, vp);
  return there >= needed || there > here ? opposite : preferred;
}
function alignOffset(align, start, triggerSize, bubbleSize) {
  if (align === "start")
    return start;
  if (align === "end")
    return start + triggerSize - bubbleSize;
  return start + triggerSize / 2 - bubbleSize / 2;
}
function computeTooltipPosition(r, width, height, preferredSide, align, vp) {
  const side = resolveTooltipSide(preferredSide, r, width, height, vp);
  const pad3 = TOOLTIP_VIEWPORT_PADDING;
  let top;
  let left;
  if (side === "top" || side === "bottom") {
    top = side === "top" ? r.top - TOOLTIP_GAP - height : r.bottom + TOOLTIP_GAP;
    left = alignOffset(align, r.left, r.width, width);
    left = clamp3(left, pad3, vp.width - pad3 - width);
    top = clamp3(top, pad3, vp.height - pad3 - height);
  } else {
    left = side === "left" ? r.left - TOOLTIP_GAP - width : r.right + TOOLTIP_GAP;
    top = alignOffset(align, r.top, r.height, height);
    top = clamp3(top, pad3, vp.height - pad3 - height);
    left = clamp3(left, pad3, vp.width - pad3 - width);
  }
  return { top: Math.round(top), left: Math.round(left), side };
}

// src/components/molecules/Tooltip/index.tsx
import { Fragment as Fragment4, jsx as jsx18, jsxs as jsxs14 } from "react/jsx-runtime";
function cls14(...parts) {
  return parts.filter(Boolean).join(" ");
}
function compose(theirs, ours) {
  return (event) => {
    theirs == null ? void 0 : theirs(event);
    ours(event);
  };
}
function setRef(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref && typeof ref === "object")
    ref.current = value;
}
function getElementRef(element) {
  const major = parseInt(React18.version, 10);
  if (major >= 19)
    return element.props.ref;
  return element.ref;
}
var useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect3 : useEffect5;
var Tooltip = React18.forwardRef(function Tooltip2({
  children,
  content,
  side = TOOLTIP_DEFAULTS.side,
  align = TOOLTIP_DEFAULTS.align,
  delay = TOOLTIP_DEFAULTS.delay,
  closeDelay = TOOLTIP_DEFAULTS.closeDelay,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  maxWidth = TOOLTIP_DEFAULTS.maxWidth,
  variant = TOOLTIP_DEFAULTS.variant,
  zIndex,
  className,
  style,
  id: idProp,
  onPointerEnter: onBubblePointerEnter,
  onPointerLeave: onBubblePointerLeave,
  ...rest
}, forwardedRef) {
  var _a, _b, _c;
  const reactId = useId10();
  const tooltipId = idProp != null ? idProp : `ds-tooltip-${reactId.replace(/:/g, "")}`;
  const isControlled = openProp !== void 0;
  const [innerOpen, setInnerOpen] = useState14(defaultOpen);
  const open = !disabled && (isControlled ? Boolean(openProp) : innerOpen);
  const [mounted, setMounted] = useState14(false);
  const [position, setPosition] = useState14(null);
  const [autoZ, setAutoZ] = useState14(void 0);
  const triggerRef = useRef10(null);
  const bubbleRef = useRef10(null);
  const openTimer = useRef10(null);
  const closeTimer = useRef10(null);
  const hoveringRef = useRef10(false);
  const focusedRef = useRef10(false);
  const openRef = useRef10(open);
  openRef.current = open;
  useEffect5(() => setMounted(true), []);
  const clearTimers = useCallback11(() => {
    if (openTimer.current)
      clearTimeout(openTimer.current);
    if (closeTimer.current)
      clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);
  useEffect5(() => clearTimers, [clearTimers]);
  const setOpen = useCallback11(
    (next) => {
      if (disabled && next)
        return;
      if (next === openRef.current)
        return;
      if (!isControlled)
        setInnerOpen(next);
      onOpenChange == null ? void 0 : onOpenChange(next);
    },
    [disabled, isControlled, onOpenChange]
  );
  const scheduleOpen = useCallback11(
    (ms) => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      if (openRef.current)
        return;
      if (ms <= 0) {
        if (openTimer.current)
          clearTimeout(openTimer.current);
        openTimer.current = null;
        setOpen(true);
        return;
      }
      if (openTimer.current)
        return;
      openTimer.current = setTimeout(() => {
        openTimer.current = null;
        setOpen(true);
      }, ms);
    },
    [setOpen]
  );
  const scheduleClose = useCallback11(
    (ms) => {
      if (hoveringRef.current || focusedRef.current)
        return;
      if (openTimer.current) {
        clearTimeout(openTimer.current);
        openTimer.current = null;
      }
      if (closeTimer.current)
        clearTimeout(closeTimer.current);
      const run = () => {
        closeTimer.current = null;
        if (!hoveringRef.current && !focusedRef.current)
          setOpen(false);
      };
      if (ms <= 0)
        run();
      else
        closeTimer.current = setTimeout(run, ms);
    },
    [setOpen]
  );
  useEffect5(() => {
    if (!open)
      return void 0;
    const onKeyDown = (event) => {
      if (event.key !== "Escape" || event.isComposing)
        return;
      event.preventDefault();
      event.stopPropagation();
      clearTimers();
      setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, clearTimers, setOpen]);
  const updatePosition = useCallback11(() => {
    const trigger2 = triggerRef.current;
    const bubble2 = bubbleRef.current;
    if (!trigger2 || !bubble2 || typeof window === "undefined")
      return;
    const r = trigger2.getBoundingClientRect();
    const next = computeTooltipPosition(
      r,
      bubble2.offsetWidth,
      bubble2.offsetHeight,
      side,
      align,
      { width: window.innerWidth, height: window.innerHeight }
    );
    setPosition(
      (prev) => prev && prev.top === next.top && prev.left === next.left && prev.side === next.side ? prev : next
    );
  }, [side, align]);
  useIsoLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return void 0;
    }
    updatePosition();
    if (zIndex === void 0) {
      const z = resolveLayerZIndex(triggerRef.current, void 0, "--z-tooltip-top", DEFAULT_TOOLTIP_Z);
      setAutoZ(typeof z === "number" ? z : void 0);
    }
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition, content, zIndex]);
  const child = React18.Children.only(children);
  if (!isValidElement4(child))
    return null;
  const childProps = child.props;
  const childRef = getElementRef(child);
  const describedBy = disabled ? childProps["aria-describedby"] : cls14(childProps["aria-describedby"], tooltipId) || void 0;
  const trigger = cloneElement3(child, {
    ref: (node) => {
      triggerRef.current = node;
      setRef(childRef, node);
    },
    "aria-describedby": describedBy,
    onPointerEnter: compose(
      childProps.onPointerEnter,
      (event) => {
        var _a2;
        if (event.pointerType === "touch")
          return;
        triggerRef.current = (_a2 = event.currentTarget) != null ? _a2 : triggerRef.current;
        hoveringRef.current = true;
        scheduleOpen(delay);
      }
    ),
    onPointerLeave: compose(
      childProps.onPointerLeave,
      (event) => {
        if (event.pointerType === "touch")
          return;
        hoveringRef.current = false;
        scheduleClose(closeDelay);
      }
    ),
    onFocus: compose(childProps.onFocus, (event) => {
      var _a2;
      triggerRef.current = (_a2 = event.currentTarget) != null ? _a2 : triggerRef.current;
      focusedRef.current = true;
      scheduleOpen(0);
    }),
    onBlur: compose(childProps.onBlur, () => {
      focusedRef.current = false;
      scheduleClose(hoveringRef.current ? closeDelay : 0);
    })
  });
  const maxWidthValue = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  const bubble = mounted && !disabled ? createPortal2(
    /* @__PURE__ */ jsx18(
      "div",
      {
        ref: (node) => {
          bubbleRef.current = node;
          setRef(forwardedRef, node);
        },
        ...rest,
        id: tooltipId,
        role: "tooltip",
        hidden: !open,
        className: cls14("ds-tooltip", className),
        "data-variant": variant,
        "data-side": (_a = position == null ? void 0 : position.side) != null ? _a : side,
        "data-align": align,
        "data-state": open ? "open" : "closed",
        "data-positioned": position ? "true" : "false",
        style: {
          ...zIndex !== void 0 ? { zIndex } : autoZ !== void 0 ? { zIndex: autoZ } : null,
          ...style,
          top: (_b = position == null ? void 0 : position.top) != null ? _b : 0,
          left: (_c = position == null ? void 0 : position.left) != null ? _c : 0,
          ["--ds-tooltip-max-width"]: maxWidthValue
        },
        onPointerEnter: (event) => {
          onBubblePointerEnter == null ? void 0 : onBubblePointerEnter(event);
          hoveringRef.current = true;
          if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
          }
        },
        onPointerLeave: (event) => {
          onBubblePointerLeave == null ? void 0 : onBubblePointerLeave(event);
          hoveringRef.current = false;
          scheduleClose(closeDelay);
        },
        children: content
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ jsxs14(Fragment4, { children: [
    trigger,
    bubble
  ] });
});
Tooltip.displayName = "Tooltip";
var Tooltip_default = Tooltip;

// src/components/atoms/ToolTip/TooltipIcon.config.ts
var defaultTooltipOptions = {
  placement: "auto",
  delay: 60,
  closeDelay: 80,
  size: 16,
  color: "currentColor",
  maxWidth: 240,
  variant: "dark"
};
var PLACEMENT_TO_SIDE = {
  auto: "top",
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right"
};

// src/assets/tooltip-icon.svg
var tooltip_icon_default = 'data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M7.2 12H8.8V7.2H7.2V12ZM8 5.6C8.22667 5.6 8.4168 5.5232 8.5704 5.3696C8.72347 5.21653 8.8 5.02667 8.8 4.8C8.8 4.57333 8.72347 4.3832 8.5704 4.2296C8.4168 4.07653 8.22667 4 8 4C7.77333 4 7.58347 4.07653 7.4304 4.2296C7.2768 4.3832 7.2 4.57333 7.2 4.8C7.2 5.02667 7.2768 5.21653 7.4304 5.3696C7.58347 5.5232 7.77333 5.6 8 5.6ZM8 16C6.89333 16 5.85333 15.7899 4.88 15.3696C3.90667 14.9499 3.06 14.38 2.34 13.66C1.62 12.94 1.05013 12.0933 0.6304 11.12C0.210133 10.1467 0 9.10667 0 8C0 6.89333 0.210133 5.85333 0.6304 4.88C1.05013 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.04987 4.88 0.6296C5.85333 0.209867 6.89333 0 8 0C9.10667 0 10.1467 0.209867 11.12 0.6296C12.0933 1.04987 12.94 1.62 13.66 2.34C14.38 3.06 14.9499 3.90667 15.3696 4.88C15.7899 5.85333 16 6.89333 16 8C16 9.10667 15.7899 10.1467 15.3696 11.12C14.9499 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.9499 11.12 15.3696C10.1467 15.7899 9.10667 16 8 16ZM8 14.4C9.78667 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78667 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78667 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78667 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z" fill="%23666666"/>%0A</svg>%0A';

// src/components/atoms/ToolTip/index.tsx
import { jsx as jsx19, jsxs as jsxs15 } from "react/jsx-runtime";
function cls15(...parts) {
  return parts.filter(Boolean).join(" ");
}
function setRef2(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref && typeof ref === "object")
    ref.current = value;
}
function renderTooltipMedia(media) {
  if (!media)
    return null;
  if (React19.isValidElement(media))
    return media;
  if (typeof media !== "string" && !(typeof media === "object" && media !== null && ("src" in media || "default" in media))) {
    return null;
  }
  return /* @__PURE__ */ jsx19(Icon_default, { src: media, width: 16, height: 16, decorative: true, preserveColors: true });
}
var ToolTip = React19.forwardRef(function ToolTip2({
  tooltipText,
  content,
  children,
  tooltipContentIcon,
  placement = defaultTooltipOptions.placement,
  delay = defaultTooltipOptions.delay,
  closeDelay = defaultTooltipOptions.closeDelay,
  size = defaultTooltipOptions.size,
  color = defaultTooltipOptions.color,
  iconToolTip = tooltip_icon_default,
  className = "",
  maxWidth = defaultTooltipOptions.maxWidth,
  variant = defaultTooltipOptions.variant,
  zIndex,
  style,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onKeyDown,
  role,
  ...rest
}, forwardedRef) {
  var _a, _b;
  const [open, setOpenState] = useState15(false);
  const [layerZ, setLayerZ] = useState15(`var(--z-tooltip-top, ${DEFAULT_TOOLTIP_Z})`);
  const triggerRef = useRef11(null);
  const timerRef = useRef11(null);
  const pointerSeenRef = useRef11(false);
  const clearTimer = () => {
    if (timerRef.current)
      clearTimeout(timerRef.current);
    timerRef.current = null;
  };
  useEffect6(() => clearTimer, []);
  const setOpen = useCallback12(
    (next) => {
      clearTimer();
      if (next && zIndex === void 0) {
        setLayerZ(resolveLayerZIndex(triggerRef.current, void 0, "--z-tooltip-top", DEFAULT_TOOLTIP_Z));
      }
      setOpenState(next);
    },
    [zIndex]
  );
  const handleMouseEnter = (event) => {
    onMouseEnter == null ? void 0 : onMouseEnter(event);
    if (pointerSeenRef.current)
      return;
    clearTimer();
    timerRef.current = setTimeout(() => setOpen(true), delay);
  };
  const handleMouseLeave = (event) => {
    onMouseLeave == null ? void 0 : onMouseLeave(event);
    if (pointerSeenRef.current)
      return;
    clearTimer();
    timerRef.current = setTimeout(() => setOpen(false), closeDelay);
  };
  const handlePointerEnter = (event) => {
    pointerSeenRef.current = true;
    onPointerEnter == null ? void 0 : onPointerEnter(event);
  };
  const handleKeyDown = (event) => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (event.defaultPrevented)
      return;
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      setOpen(!open);
    }
  };
  const body = /* @__PURE__ */ jsxs15("span", { className: "ds-tooltip-icon__body", "data-has-media": tooltipContentIcon ? "true" : void 0, children: [
    renderTooltipMedia(tooltipContentIcon),
    /* @__PURE__ */ jsx19("span", { children: content != null ? content : tooltipText })
  ] });
  return /* @__PURE__ */ jsx19(
    Tooltip_default,
    {
      content: body,
      open,
      onOpenChange: setOpen,
      side: (_a = PLACEMENT_TO_SIDE[placement]) != null ? _a : "top",
      delay,
      closeDelay,
      maxWidth,
      variant,
      zIndex: zIndex != null ? zIndex : layerZ,
      children: /* @__PURE__ */ jsx19(
        "span",
        {
          ...rest,
          ref: (node) => {
            triggerRef.current = node;
            setRef2(forwardedRef, node);
          },
          className: cls15("ds-tooltip-icon", className),
          style: { color, ...style },
          role: role != null ? role : "button",
          "aria-label": tooltipText,
          tabIndex: (_b = rest.tabIndex) != null ? _b : 0,
          onKeyDown: handleKeyDown,
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onPointerEnter: handlePointerEnter,
          children: children || /* @__PURE__ */ jsx19(Icon_default, { src: iconToolTip, width: size, height: size, decorative: true })
        }
      )
    }
  );
});
ToolTip.displayName = "ToolTip";
var ToolTip_default = ToolTip;

// src/components/atoms/DatePicker/index.tsx
import { useCallback as useCallback13, useEffect as useEffect8, useId as useId11, useMemo as useMemo12, useRef as useRef13, useState as useState17 } from "react";
import { createPortal as createPortal3 } from "react-dom";

// src/components/atoms/DatePicker/DatePicker.config.ts
var defaultDatePickerOptions = {
  /** Default format for display and onChange output. Input accepts YYYY-MM-DD, DD/MM/YYYY, MMDDYYYY, etc. */
  dateFormat: "DD-MM-YYYY",
  placeholder: "Select date",
  startPlaceholder: "Start date",
  endPlaceholder: "End date",
  size: "md",
  variant: "outlined",
  rounded: "4",
  rangeSeparator: "to"
};

// src/components/atoms/DatePicker/DatePicker.utils.ts
var isValidDate = (dateStr, format = "MM/DD/YYYY") => {
  if (!dateStr || dateStr.trim() === "") {
    return false;
  }
  const cleanStr = dateStr.replace(/[^\d/\-.]/g, "").trim();
  const separators = ["/", "-", "."];
  let parts = [];
  let foundSeparator = "";
  for (const sep of separators) {
    if (cleanStr.includes(sep)) {
      parts = cleanStr.split(sep);
      foundSeparator = sep;
      break;
    }
  }
  if (!foundSeparator && cleanStr.length >= 6) {
    const formatUpper2 = format.toUpperCase();
    if ((formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM-DD-YYYY" || formatUpper2 === "MM.DD.YYYY") && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 2),
        // month
        cleanStr.substring(2, 4),
        // day
        cleanStr.substring(4, 8)
        // year
      ];
    } else if ((formatUpper2 === "DD/MM/YYYY" || formatUpper2 === "DD-MM-YYYY" || formatUpper2 === "DD.MM.YYYY") && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 2),
        // day
        cleanStr.substring(2, 4),
        // month
        cleanStr.substring(4, 8)
        // year
      ];
    } else if ((formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM-DD-YYYY" || formatUpper2 === "MM.DD.YYYY") && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 2),
        // month
        cleanStr.substring(2, 4),
        // day
        cleanStr.substring(4, 8)
        // year
      ];
    } else if (formatUpper2 === "YYYY-MM-DD" && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 4),
        // year
        cleanStr.substring(4, 6),
        // month
        cleanStr.substring(6, 8)
        // day
      ];
    } else if (cleanStr.length === 6) {
      if (formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM/DD/YY") {
        parts = [
          cleanStr.substring(0, 2),
          // month
          cleanStr.substring(2, 4),
          // day
          cleanStr.substring(4, 6)
          // year (2-digit)
        ];
      } else if (formatUpper2 === "DD/MM/YYYY" || formatUpper2 === "DD/MM/YY") {
        parts = [
          cleanStr.substring(0, 2),
          // day
          cleanStr.substring(2, 4),
          // month
          cleanStr.substring(4, 6)
          // year (2-digit)
        ];
      }
    }
  }
  if (parts.length !== 3) {
    return false;
  }
  const formatUpper = format.toUpperCase();
  let month, day, year;
  try {
    if (formatUpper === "MM/DD/YYYY" || formatUpper === "MM-DD-YYYY" || formatUpper === "MM.DD.YYYY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "DD/MM/YYYY" || formatUpper === "DD-MM-YYYY" || formatUpper === "DD.MM.YYYY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "YYYY/MM/DD" || formatUpper === "YYYY-MM-DD" || formatUpper === "YYYY.MM.DD") {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else if (formatUpper === "MM/DD/YY" || formatUpper === "MM-DD-YY" || formatUpper === "MM.DD.YY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else if (formatUpper === "DD/MM/YY" || formatUpper === "DD-MM-YY" || formatUpper === "DD.MM.YY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      const isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      daysInMonth[1] = isLeapYear ? 29 : 28;
    }
    if (day < 1 || day > daysInMonth[month - 1]) {
      return false;
    }
    if (formatUpper.includes("YYYY")) {
      if (year < 1e3 || year > 9999) {
        return false;
      }
      const yearStr = formatUpper.startsWith("YYYY") ? parts[0] : parts[2];
      if (yearStr.length !== 4) {
        return false;
      }
    } else if (formatUpper.includes("YY")) {
      if (year < 1900 || year > 2099) {
        return false;
      }
    }
    const date = new Date(year, month - 1, day);
    const isValid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    return isValid;
  } catch (error) {
    return false;
  }
};
var formatDateString = (dateStr, fromFormat = "MM/DD/YYYY", toFormat = "DD-MM-YYYY") => {
  if (!dateStr || !isValidDate(dateStr, fromFormat)) {
    return dateStr;
  }
  try {
    const cleanStr = dateStr.replace(/[^\d/\-.]/g, "").trim();
    const separators = ["/", "-", "."];
    let parts = [];
    for (const sep of separators) {
      if (cleanStr.includes(sep)) {
        parts = cleanStr.split(sep);
        break;
      }
    }
    if (parts.length === 1 && cleanStr.length === 8) {
      const fromUpper2 = fromFormat.toUpperCase();
      if (fromUpper2 === "MM/DD/YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (fromUpper2 === "DD/MM/YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (fromUpper2 === "YYYY-MM-DD") {
        parts = [cleanStr.substring(0, 4), cleanStr.substring(4, 6), cleanStr.substring(6, 8)];
      }
    }
    if (parts.length !== 3) {
      return dateStr;
    }
    let month, day, year;
    const fromUpper = fromFormat.toUpperCase();
    if (fromUpper === "MM/DD/YYYY" || fromUpper === "MM-DD-YYYY" || fromUpper === "MM.DD.YYYY") {
      month = parts[0];
      day = parts[1];
      year = parts[2];
    } else if (fromUpper === "DD/MM/YYYY" || fromUpper === "DD-MM-YYYY" || fromUpper === "DD.MM.YYYY") {
      day = parts[0];
      month = parts[1];
      year = parts[2];
    } else if (fromUpper === "YYYY/MM/DD" || fromUpper === "YYYY-MM-DD" || fromUpper === "YYYY.MM.DD") {
      year = parts[0];
      month = parts[1];
      day = parts[2];
    } else if (fromUpper === "MM/DD/YY" || fromUpper === "MM-DD-YY" || fromUpper === "MM.DD.YY") {
      month = parts[0];
      day = parts[1];
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? `20${parts[2].padStart(2, "0")}` : `19${parts[2].padStart(2, "0")}`;
    } else if (fromUpper === "DD/MM/YY" || fromUpper === "DD-MM-YY" || fromUpper === "DD.MM.YY") {
      day = parts[0];
      month = parts[1];
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? `20${parts[2].padStart(2, "0")}` : `19${parts[2].padStart(2, "0")}`;
    } else {
      month = parts[0];
      day = parts[1];
      year = parts[2];
    }
    month = month.padStart(2, "0");
    day = day.padStart(2, "0");
    if (year.length === 2) {
      const shortYear = parseInt(year, 10);
      year = shortYear < 50 ? `20${year}` : `19${year}`;
    }
    const toUpper = (toFormat || "DD-MM-YYYY").trim().toUpperCase();
    if (toUpper === "MM/DD/YYYY") {
      return `${month}/${day}/${year}`;
    } else if (toUpper === "DD/MM/YYYY") {
      return `${day}/${month}/${year}`;
    } else if (toUpper === "YYYY-MM-DD") {
      return `${year}-${month}-${day}`;
    } else if (toUpper === "MM-DD-YYYY") {
      return `${month}-${day}-${year}`;
    } else if (toUpper === "DD-MM-YYYY") {
      return `${day}-${month}-${year}`;
    } else if (toUpper === "DD.MM.YYYY") {
      return `${day}.${month}.${year}`;
    } else if (toUpper === "MM.DD.YYYY") {
      return `${month}.${day}.${year}`;
    } else if (toUpper === "YYYY/MM/DD") {
      return `${year}/${month}/${day}`;
    } else if (toUpper === "MMMM DD, YYYY") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${monthName} ${parseInt(day, 10)}, ${year}`;
    } else if (toUpper === "DD MMMM YYYY") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${parseInt(day, 10)} ${monthName} ${year}`;
    } else if (toUpper === "DD MMM YYYY") {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${parseInt(day, 10)} ${monthName} ${year}`;
    } else if (toUpper === "MM/DD/YY") {
      const shortYear = year.substring(2);
      return `${month}/${day}/${shortYear}`;
    } else if (toUpper === "DD/MM/YY") {
      const shortYear = year.substring(2);
      return `${day}/${month}/${shortYear}`;
    } else if (toUpper === "DD-MM-YY") {
      const shortYear = year.substring(2);
      return `${day}-${month}-${shortYear}`;
    } else if (toUpper === "MM-DD-YY") {
      const shortYear = year.substring(2);
      return `${month}-${day}-${shortYear}`;
    }
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateStr;
  }
};
var parseFlexible8DigitDate = (digits, preferredFormat = "MM/DD/YYYY") => {
  if (!digits || digits.replace(/\D/g, "").length !== 8)
    return null;
  const d = digits.replace(/\D/g, "");
  const yyyyFirst = d.substring(0, 4);
  const dd = d.substring(0, 2);
  const mm = d.substring(2, 4);
  const yyyy = d.substring(4, 8);
  const yearFirst = parseInt(yyyyFirst, 10);
  const isLikelyYYYYMMDD = yearFirst >= 1900 && yearFirst <= 2100;
  if (isLikelyYYYYMMDD) {
    const asYYYYMMDD = `${yyyyFirst}-${d.substring(4, 6)}-${d.substring(6, 8)}`;
    if (isValidDate(asYYYYMMDD, "YYYY-MM-DD")) {
      return parseDate(asYYYYMMDD, "YYYY-MM-DD");
    }
  }
  const asDDMM = `${dd}/${mm}/${yyyy}`;
  const asMMDD = `${mm}/${dd}/${yyyy}`;
  const validDDMM = isValidDate(asDDMM, "DD/MM/YYYY");
  const validMMDD = isValidDate(asMMDD, "MM/DD/YYYY");
  const pref = preferredFormat.toUpperCase();
  if (pref.includes("DD") && pref.indexOf("DD") < pref.indexOf("MM")) {
    if (validDDMM)
      return parseDate(asDDMM, "DD/MM/YYYY");
    if (validMMDD)
      return parseDate(asMMDD, "MM/DD/YYYY");
  } else {
    if (validMMDD)
      return parseDate(asMMDD, "MM/DD/YYYY");
    if (validDDMM)
      return parseDate(asDDMM, "DD/MM/YYYY");
  }
  return null;
};
var parseFlexible6DigitDate = (digits, preferredFormat = "MM/DD/YYYY") => {
  if (!digits || digits.replace(/\D/g, "").length !== 6)
    return null;
  const d = digits.replace(/\D/g, "");
  const p1 = d.substring(0, 2);
  const p2 = d.substring(2, 4);
  const yy = d.substring(4, 6);
  const str = `${p1}/${p2}/${yy}`;
  const validDDMM = isValidDate(str, "DD/MM/YY");
  const validMMDD = isValidDate(str, "MM/DD/YY");
  const pref = preferredFormat.toUpperCase();
  if (pref.includes("DD") && pref.indexOf("DD") < pref.indexOf("MM")) {
    if (validDDMM)
      return parseDate(str, "DD/MM/YY");
    if (validMMDD)
      return parseDate(str, "MM/DD/YY");
  } else {
    if (validMMDD)
      return parseDate(str, "MM/DD/YY");
    if (validDDMM)
      return parseDate(str, "DD/MM/YY");
  }
  return null;
};
var parseFlexibleDate = (input, preferredFormat = "MM/DD/YYYY") => {
  const trimmed = input.trim().replace(/[^\d/\-.]/g, "");
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length === 8) {
    const r = parseFlexible8DigitDate(trimmed, preferredFormat);
    if (r)
      return r;
  }
  if (digitsOnly.length === 6) {
    const r = parseFlexible6DigitDate(trimmed, preferredFormat);
    if (r)
      return r;
  }
  if (isValidDate(trimmed, preferredFormat)) {
    return parseDate(trimmed, preferredFormat);
  }
  if (isValidDate(trimmed, "YYYY-MM-DD")) {
    return parseDate(trimmed, "YYYY-MM-DD");
  }
  if (isValidDate(trimmed, "DD/MM/YYYY")) {
    return parseDate(trimmed, "DD/MM/YYYY");
  }
  if (isValidDate(trimmed, "MM/DD/YYYY")) {
    return parseDate(trimmed, "MM/DD/YYYY");
  }
  return null;
};
var parseDate = (dateStr, format = "MM/DD/YYYY") => {
  if (!isValidDate(dateStr, format)) {
    return null;
  }
  try {
    const cleanStr = dateStr.replace(/[^\d/\-.]/g, "").trim();
    const separators = ["/", "-", "."];
    let parts = [];
    for (const sep of separators) {
      if (cleanStr.includes(sep)) {
        parts = cleanStr.split(sep);
        break;
      }
    }
    if (parts.length === 1 && cleanStr.length === 8) {
      const formatUpper2 = format.toUpperCase();
      if (formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM-DD-YYYY" || formatUpper2 === "MM.DD.YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (formatUpper2 === "DD/MM/YYYY" || formatUpper2 === "DD-MM-YYYY" || formatUpper2 === "DD.MM.YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (formatUpper2 === "YYYY-MM-DD") {
        parts = [cleanStr.substring(0, 4), cleanStr.substring(4, 6), cleanStr.substring(6, 8)];
      }
    }
    if (parts.length !== 3) {
      return null;
    }
    let month, day, year;
    const formatUpper = format.toUpperCase();
    if (formatUpper === "MM/DD/YYYY" || formatUpper === "MM-DD-YYYY" || formatUpper === "MM.DD.YYYY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "DD/MM/YYYY" || formatUpper === "DD-MM-YYYY" || formatUpper === "DD.MM.YYYY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "YYYY/MM/DD" || formatUpper === "YYYY-MM-DD" || formatUpper === "YYYY.MM.DD") {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else if (formatUpper === "MM/DD/YY" || formatUpper === "MM-DD-YY" || formatUpper === "MM.DD.YY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else if (formatUpper === "DD/MM/YY" || formatUpper === "DD-MM-YY" || formatUpper === "DD.MM.YY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
    return new Date(year, month - 1, day);
  } catch (error) {
    return null;
  }
};
var isDateInRange = (dateStr, minDate, maxDate, format = "MM/DD/YYYY") => {
  const date = parseDate(dateStr, format);
  if (!date)
    return false;
  if (minDate) {
    const min = parseDate(minDate, format);
    if (min && date < min)
      return false;
  }
  if (maxDate) {
    const max = parseDate(maxDate, format);
    if (max && date > max)
      return false;
  }
  return true;
};
var normalizeDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
var isSameDay = (a, b) => {
  if (!a || !b)
    return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};
var isBeforeDay = (a, b) => {
  if (!a || !b)
    return false;
  return normalizeDate(a).getTime() < normalizeDate(b).getTime();
};
var isAfterDay = (a, b) => {
  if (!a || !b)
    return false;
  return normalizeDate(a).getTime() > normalizeDate(b).getTime();
};
var isBetweenDays = (target, start, end) => {
  if (!target || !start || !end)
    return false;
  const time = normalizeDate(target).getTime();
  const startTime = normalizeDate(start).getTime();
  const endTime = normalizeDate(end).getTime();
  return time > startTime && time < endTime;
};
var addMonths = (date, months) => {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
};
var startOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
var MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var getMonthOptions = () => {
  return MONTH_NAMES.map((name, index) => ({ value: index, label: name }));
};
var getYearOptions = (centerYear, range = 50) => {
  const start = centerYear - range;
  const end = centerYear + range;
  const years = [];
  for (let y = start; y <= end; y++) {
    years.push({ value: y, label: String(y) });
  }
  return years;
};
var formatDateForDisplay = (date, format = "DD-MM-YYYY") => {
  if (!date)
    return "";
  const resolvedFormat = (format || "DD-MM-YYYY").trim() || "DD-MM-YYYY";
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");
  return formatDateString(`${yyyy}-${mm}-${dd}`, "YYYY-MM-DD", resolvedFormat);
};
var getCalendarDays = (month) => {
  const firstOfMonth = startOfMonth(month);
  const firstWeekday = firstOfMonth.getDay();
  const days = [];
  for (let index = 0; index < 42; index += 1) {
    const dayOffset = index - firstWeekday;
    const date = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), 1 + dayOffset);
    days.push({
      date,
      inCurrentMonth: date.getMonth() === firstOfMonth.getMonth()
    });
  }
  return days;
};

// src/components/molecules/Calendar/index.tsx
import { useEffect as useEffect7, useMemo as useMemo11, useRef as useRef12, useState as useState16 } from "react";

// src/components/molecules/Calendar/Calendar.config.ts
var defaultCalendarOptions = {
  firstDayOfWeek: 0,
  // Sunday
  fullWidth: true,
  showWeekNumbers: false,
  mode: "single",
  animation: "slide",
  cellHoverAnimation: true,
  /** shadcn-like: bordered card, no heavy shadow */
  variant: "outlined",
  elevation: "none",
  bordered: true,
  hoverable: false,
  size: "md"
};
var getElevationShadow = (elevation) => {
  switch (elevation) {
    case "none":
      return "none";
    case "sm":
      return "var(--shadow-sm)";
    case "lg":
      return "var(--shadow-lg)";
    case "md":
    default:
      return "var(--shadow-md)";
  }
};
var resolveElevation = (elevation, variant) => {
  if (elevation !== void 0)
    return elevation;
  switch (variant) {
    case "elevated":
      return "md";
    case "filled":
      return "sm";
    case "outlined":
    default:
      return "none";
  }
};
var defaultTheme = {
  // Interaction-state roles (tokens.css): theme accent in every theme; Infinia pins the previous
  // primary-button fill / 8% mix / on-primary text, so it renders unchanged.
  primary: "var(--color-day-selected-bg, var(--button-primary-default-bg))",
  primaryHover: "var(--color-day-hover-bg, color-mix(in srgb, var(--button-primary-default-bg) 8%, transparent))",
  primaryText: "var(--color-day-selected-fg, var(--color-text-on-primary))",
  rangeBackground: "var(--color-accent-sky-10)",
  todayBackground: "var(--color-accent-amber-10)",
  todayRing: "color-mix(in srgb, var(--color-state-warning) 50%, transparent)",
  text: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textDisabled: "var(--color-text-disabled)",
  background: "var(--color-bg-surface)",
  border: "var(--color-border-default)",
  selectBorder: "var(--color-border-default)",
  focusRing: "color-mix(in srgb, var(--color-focus-ring) 25%, transparent)",
  padding: 12,
  gap: 2,
  cellSize: 36,
  borderRadius: 8,
  cellRadius: 6,
  navButtonSize: 28,
  cellFontSize: 14,
  weekdayFontSize: 11,
  fontFamily: "var(--font-family), system-ui, sans-serif",
  maxWidth: 320
};
var sizeOverrides = {
  sm: {
    padding: 12,
    gap: 4,
    cellSize: 32,
    borderRadius: 12,
    cellRadius: 8,
    navButtonSize: 28,
    cellFontSize: 12,
    weekdayFontSize: 10,
    maxWidth: 280
  },
  md: {},
  lg: {
    padding: 24,
    gap: 8,
    cellSize: 48,
    borderRadius: 20,
    cellRadius: 12,
    navButtonSize: 44,
    cellFontSize: 16,
    weekdayFontSize: 12,
    maxWidth: 380
  }
};
var getResolvedTheme = (theme, size) => {
  const sizeTheme = size ? sizeOverrides[size] : {};
  return {
    ...defaultTheme,
    ...sizeTheme,
    ...theme
  };
};
var toCssValue = (v) => {
  if (v === void 0)
    return void 0;
  return typeof v === "number" ? `${v}px` : String(v);
};
var themeToCssVars = (theme) => {
  const vars = {};
  if (theme.primary)
    vars["--cal-primary"] = theme.primary;
  if (theme.primaryHover)
    vars["--cal-primary-hover"] = theme.primaryHover;
  if (theme.primaryText)
    vars["--cal-primary-text"] = theme.primaryText;
  if (theme.rangeBackground)
    vars["--cal-range-bg"] = theme.rangeBackground;
  if (theme.todayBackground)
    vars["--cal-today-bg"] = theme.todayBackground;
  if (theme.todayRing)
    vars["--cal-today-ring"] = theme.todayRing;
  if (theme.text)
    vars["--cal-text"] = theme.text;
  if (theme.textSecondary)
    vars["--cal-text-secondary"] = theme.textSecondary;
  if (theme.textDisabled)
    vars["--cal-text-disabled"] = theme.textDisabled;
  if (theme.background)
    vars["--cal-bg"] = theme.background;
  if (theme.border)
    vars["--cal-border"] = theme.border;
  if (theme.selectBorder)
    vars["--cal-select-border"] = theme.selectBorder;
  if (theme.focusRing)
    vars["--cal-focus-ring"] = theme.focusRing;
  if (theme.padding !== void 0)
    vars["--cal-padding"] = toCssValue(theme.padding);
  if (theme.gap !== void 0)
    vars["--cal-gap"] = toCssValue(theme.gap);
  if (theme.cellSize !== void 0) {
    const cs = toCssValue(theme.cellSize);
    vars["--cal-cell-size"] = cs;
    vars["--cell-size"] = cs;
  }
  if (theme.borderRadius !== void 0)
    vars["--cal-radius"] = toCssValue(theme.borderRadius);
  if (theme.cellRadius !== void 0)
    vars["--cal-cell-radius"] = toCssValue(theme.cellRadius);
  if (theme.navButtonSize !== void 0)
    vars["--cal-nav-size"] = toCssValue(theme.navButtonSize);
  if (theme.cellFontSize !== void 0)
    vars["--cal-cell-font"] = toCssValue(theme.cellFontSize);
  if (theme.weekdayFontSize !== void 0)
    vars["--cal-weekday-font"] = toCssValue(theme.weekdayFontSize);
  if (theme.fontFamily)
    vars["--cal-font"] = theme.fontFamily;
  if (theme.maxWidth !== void 0)
    vars["--cal-max-width"] = toCssValue(theme.maxWidth);
  if (theme.boxShadow)
    vars["--cal-shadow"] = theme.boxShadow;
  return vars;
};

// src/components/molecules/Calendar/Calendar.utils.ts
var WEEKDAY_LABELS_SUNDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var WEEKDAY_LABELS_MONDAY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var getWeekdayLabels = (firstDayOfWeek) => {
  return firstDayOfWeek === 1 ? WEEKDAY_LABELS_MONDAY : WEEKDAY_LABELS_SUNDAY;
};
var getCalendarDaysWithFirstDay = (month, firstDayOfWeek) => {
  if (firstDayOfWeek === 0)
    return getCalendarDays(month);
  const firstOfMonth = startOfMonth(month);
  const firstWeekday = firstOfMonth.getDay();
  const startOffset = (firstWeekday - 1 + 7) % 7;
  const result = [];
  for (let i = 0; i < 42; i++) {
    const dayOffset = i - startOffset;
    const date = new Date(
      firstOfMonth.getFullYear(),
      firstOfMonth.getMonth(),
      1 + dayOffset
    );
    result.push({
      date,
      inCurrentMonth: date.getMonth() === firstOfMonth.getMonth()
    });
  }
  return result;
};
var getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 864e5 + 1) / 7);
};

// src/components/molecules/Calendar/index.tsx
import { jsx as jsx20, jsxs as jsxs16 } from "react/jsx-runtime";
function ChevronLeft({ size = 16 }) {
  return /* @__PURE__ */ jsx20("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx20(
    "path",
    {
      d: "M15 18l-6-6 6-6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function ChevronRight({ size = 16 }) {
  return /* @__PURE__ */ jsx20("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx20(
    "path",
    {
      d: "M9 18l6-6-6-6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function ChevronDownSmall({ size = 14 }) {
  return /* @__PURE__ */ jsx20("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx20(
    "path",
    {
      d: "M5 7.5L10 12.5L15 7.5",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
var pad2 = (n) => String(n).padStart(2, "0");
var toDayKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
var toMonthKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
var shiftMonthClamped = (d, delta) => {
  const target = new Date(d.getFullYear(), d.getMonth() + delta, 1);
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), last));
};
var Calendar = ({
  month: monthProp,
  hideNavigation = false,
  captionLayout = "menus",
  value,
  onChange,
  defaultValue,
  minDate,
  maxDate,
  disabled = false,
  readOnly = false,
  showWeekNumbers = defaultCalendarOptions.showWeekNumbers,
  fullWidth = defaultCalendarOptions.fullWidth,
  className = "",
  dateCellRender,
  onMonthChange,
  onYearChange,
  firstDayOfWeek = defaultCalendarOptions.firstDayOfWeek,
  mode = defaultCalendarOptions.mode,
  rangeValue,
  onRangeChange,
  disabledDate,
  animation = defaultCalendarOptions.animation,
  cellHoverAnimation = defaultCalendarOptions.cellHoverAnimation,
  variant = defaultCalendarOptions.variant,
  elevation: elevationProp,
  bordered = defaultCalendarOptions.bordered,
  hoverable = defaultCalendarOptions.hoverable,
  radius,
  size = defaultCalendarOptions.size,
  theme: themeProp,
  style: styleProp,
  styles: stylesProp
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
  const [isHovered, setIsHovered] = useState16(false);
  const resolvedElevation = resolveElevation(elevationProp, variant);
  const boxShadow = (_a = themeProp == null ? void 0 : themeProp.boxShadow) != null ? _a : hoverable && isHovered ? getElevationShadow("lg") : getElevationShadow(resolvedElevation);
  const theme = useMemo11(
    () => getResolvedTheme(themeProp, size),
    [themeProp, size]
  );
  const cssVars = useMemo11(() => themeToCssVars(theme), [theme]);
  const isControlled = value !== void 0;
  const isRangeControlled = rangeValue !== void 0;
  const minParsed = useMemo11(() => {
    var _a2;
    if (!minDate)
      return null;
    if (minDate instanceof Date)
      return minDate;
    return (_a2 = parseDate(minDate, "YYYY-MM-DD")) != null ? _a2 : parseDate(minDate, "MM/DD/YYYY");
  }, [minDate]);
  const maxParsed = useMemo11(() => {
    var _a2;
    if (!maxDate)
      return null;
    if (maxDate instanceof Date)
      return maxDate;
    return (_a2 = parseDate(maxDate, "YYYY-MM-DD")) != null ? _a2 : parseDate(maxDate, "MM/DD/YYYY");
  }, [maxDate]);
  const [internalValue, setInternalValue] = useState16(
    defaultValue != null ? defaultValue : null
  );
  const [internalRange, setInternalRange] = useState16([null, null]);
  const selectedDate = isControlled ? value : internalValue;
  const selectedRange = isRangeControlled ? rangeValue : internalRange;
  const isMonthControlled = monthProp !== void 0;
  const [internalMonth, setInternalMonth] = useState16(
    () => startOfMonth(
      monthProp || selectedDate || selectedRange[0] || selectedRange[1] || /* @__PURE__ */ new Date()
    )
  );
  const visibleMonth = isMonthControlled ? startOfMonth(monthProp) : internalMonth;
  const goToMonth = (next) => {
    const m = startOfMonth(next);
    if (!isMonthControlled) {
      setInternalMonth(m);
    }
    onMonthChange == null ? void 0 : onMonthChange(m);
  };
  useEffect7(() => {
    if (isMonthControlled)
      return;
    const anchor = selectedDate || selectedRange[0] || selectedRange[1] || /* @__PURE__ */ new Date();
    setInternalMonth(startOfMonth(anchor));
  }, [isMonthControlled, selectedDate, selectedRange[0], selectedRange[1]]);
  const calendarDays = useMemo11(
    () => getCalendarDaysWithFirstDay(visibleMonth, firstDayOfWeek),
    [visibleMonth, firstDayOfWeek]
  );
  const rootRef = useRef12(null);
  const [focusedDate, setFocusedDate] = useState16(null);
  const pendingFocusRef = useRef12(null);
  const weekdayLabels = useMemo11(
    () => getWeekdayLabels(firstDayOfWeek),
    [firstDayOfWeek]
  );
  const monthOptions = getMonthOptions();
  const centerYear = visibleMonth.getFullYear();
  const yearOptions = getYearOptions(centerYear);
  const isDisabledDate = (date) => {
    if (disabled || readOnly)
      return false;
    if (minParsed && isBeforeDay(date, minParsed))
      return true;
    if (maxParsed && isAfterDay(date, maxParsed))
      return true;
    if (disabledDate == null ? void 0 : disabledDate(date))
      return true;
    return false;
  };
  const handleDateSelect = (date) => {
    if (isDisabledDate(date))
      return;
    if (readOnly || disabled)
      return;
    if (mode === "single") {
      const next = date;
      if (!isControlled)
        setInternalValue(next);
      onChange == null ? void 0 : onChange(next);
      return;
    }
    const [start, end] = selectedRange;
    if (!start || start && end) {
      const next = [date, null];
      if (!isRangeControlled)
        setInternalRange(next);
      onRangeChange == null ? void 0 : onRangeChange(next);
    } else if (isBeforeDay(date, start)) {
      const next = [date, start];
      if (!isRangeControlled)
        setInternalRange(next);
      onRangeChange == null ? void 0 : onRangeChange(next);
    } else {
      const next = [start, date];
      if (!isRangeControlled)
        setInternalRange(next);
      onRangeChange == null ? void 0 : onRangeChange(next);
    }
  };
  const handleMonthChange = (monthIndex) => {
    isInitialMountRef.current = false;
    const next = new Date(visibleMonth.getFullYear(), monthIndex, 1);
    slideDirectionRef.current = next.getTime() > visibleMonth.getTime() ? "next" : "prev";
    goToMonth(next);
  };
  const handleYearChange = (year) => {
    isInitialMountRef.current = false;
    const next = new Date(year, visibleMonth.getMonth(), 1);
    slideDirectionRef.current = next.getTime() > visibleMonth.getTime() ? "next" : "prev";
    goToMonth(next);
    onYearChange == null ? void 0 : onYearChange(next);
  };
  const slideDirectionRef = useRef12("next");
  const isInitialMountRef = useRef12(true);
  const [captionPick, setCaptionPick] = useState16(null);
  const captionMenusRef = useRef12(null);
  const monthShortLabels = useMemo11(
    () => Array.from(
      { length: 12 },
      (_, m) => new Date(2024, m, 1).toLocaleDateString(void 0, { month: "short" })
    ),
    []
  );
  const visibleMonthTime = visibleMonth.getTime();
  useEffect7(() => {
    setCaptionPick(null);
  }, [visibleMonthTime]);
  useEffect7(() => {
    if (!captionPick)
      return;
    const onPointerDown = (e) => {
      var _a2;
      if ((_a2 = captionMenusRef.current) == null ? void 0 : _a2.contains(e.target))
        return;
      setCaptionPick(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape")
        setCaptionPick(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [captionPick]);
  const handlePrevMonth = () => {
    isInitialMountRef.current = false;
    slideDirectionRef.current = "prev";
    goToMonth(addMonths(visibleMonth, -1));
  };
  const handleNextMonth = () => {
    isInitialMountRef.current = false;
    slideDirectionRef.current = "next";
    goToMonth(addMonths(visibleMonth, 1));
  };
  const today = /* @__PURE__ */ new Date();
  const [rangeStart, rangeEnd] = selectedRange;
  const isInVisibleMonth = (d) => !!d && d.getMonth() === visibleMonth.getMonth() && d.getFullYear() === visibleMonth.getFullYear();
  const tabbableKey = (() => {
    const candidates = [focusedDate, selectedDate, rangeStart, rangeEnd, today];
    const hit = candidates.find((d) => isInVisibleMonth(d) && !isDisabledDate(d));
    if (hit)
      return toDayKey(hit);
    const firstEnabled = calendarDays.find((d) => d.inCurrentMonth && !isDisabledDate(d.date));
    return firstEnabled ? toDayKey(firstEnabled.date) : toDayKey(visibleMonth);
  })();
  useEffect7(() => {
    var _a2;
    const pending = pendingFocusRef.current;
    if (!pending)
      return;
    const el = (_a2 = rootRef.current) == null ? void 0 : _a2.querySelector(`[data-date="${pending.key}"]`);
    if (el) {
      pendingFocusRef.current = null;
      el.focus();
    } else if (pending.month === toMonthKey(visibleMonth)) {
      pendingFocusRef.current = null;
    }
  });
  const focusDay = (target) => {
    setFocusedDate(target);
    pendingFocusRef.current = { key: toDayKey(target), month: toMonthKey(target) };
    if (!isInVisibleMonth(target)) {
      isInitialMountRef.current = false;
      slideDirectionRef.current = target.getTime() > visibleMonth.getTime() ? "next" : "prev";
      goToMonth(target);
    }
  };
  const handleDayKeyDown = (from, e) => {
    const y = from.getFullYear();
    const m = from.getMonth();
    const d = from.getDate();
    const weekOffset = (from.getDay() - firstDayOfWeek + 7) % 7;
    let next;
    let step = 0;
    switch (e.key) {
      case "ArrowLeft":
        step = -1;
        next = new Date(y, m, d - 1);
        break;
      case "ArrowRight":
        step = 1;
        next = new Date(y, m, d + 1);
        break;
      case "ArrowUp":
        step = -7;
        next = new Date(y, m, d - 7);
        break;
      case "ArrowDown":
        step = 7;
        next = new Date(y, m, d + 7);
        break;
      case "Home":
        next = new Date(y, m, d - weekOffset);
        break;
      case "End":
        next = new Date(y, m, d + 6 - weekOffset);
        break;
      case "PageUp":
        next = shiftMonthClamped(from, e.shiftKey ? -12 : -1);
        break;
      case "PageDown":
        next = shiftMonthClamped(from, e.shiftKey ? 12 : 1);
        break;
      default:
        return;
    }
    e.preventDefault();
    for (let i = 0; step !== 0 && isDisabledDate(next) && i < 42; i++) {
      next = new Date(next.getFullYear(), next.getMonth(), next.getDate() + step);
    }
    if (isDisabledDate(next))
      return;
    focusDay(next);
  };
  const animClass = animation === "none" || isInitialMountRef.current ? "" : animation === "slide" ? slideDirectionRef.current === "prev" ? "calendar-anim-slide-prev" : "calendar-anim-slide-next" : animation === "fade" ? "calendar-anim-fade" : animation === "scale" ? "calendar-anim-scale" : "";
  const resolvedRadius = radius !== void 0 ? typeof radius === "number" ? `${radius}px` : radius : (_b = theme.borderRadius) != null ? _b : 16;
  const resolvedBackground = variant === "filled" ? "var(--color-bg-page)" : (_c = theme.background) != null ? _c : "var(--color-bg-surface)";
  const containerStyle = {
    ...cssVars,
    width: fullWidth ? "100%" : "auto",
    maxWidth: (_d = theme.maxWidth) != null ? _d : 336,
    padding: (_e = theme.padding) != null ? _e : 20,
    borderRadius: resolvedRadius,
    border: bordered ? `1px solid ${(_f = theme.border) != null ? _f : "var(--color-border-soft, rgba(153, 153, 153, 0.3))"}` : "1px solid transparent",
    background: resolvedBackground,
    boxShadow: (_g = theme.boxShadow) != null ? _g : boxShadow,
    fontFamily: theme.fontFamily,
    overflow: captionLayout === "menus" ? "visible" : "hidden",
    transition: "box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease",
    transform: hoverable && isHovered ? "translateY(-2px)" : "translateY(0)",
    ...stylesProp == null ? void 0 : stylesProp.root,
    ...styleProp
  };
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 8,
    ...stylesProp == null ? void 0 : stylesProp.header
  };
  const navButtonStyle = {
    width: (_h = theme.navButtonSize) != null ? _h : 36,
    height: (_i = theme.navButtonSize) != null ? _i : 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: (_j = theme.cellRadius) != null ? _j : 10,
    background: "transparent",
    color: (_k = theme.text) != null ? _k : "var(--color-text-primary)",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 20,
    fontWeight: 500,
    ...stylesProp == null ? void 0 : stylesProp.navButton
  };
  const selectStyle = {
    flex: 1,
    padding: "8px 12px",
    border: `1px solid ${(_l = theme.selectBorder) != null ? _l : "var(--color-border-soft, rgba(0, 0, 0, 0.1))"}`,
    borderRadius: (_m = theme.cellRadius) != null ? _m : 10,
    fontSize: (_n = theme.cellFontSize) != null ? _n : 14,
    fontWeight: 600,
    color: (_o = theme.text) != null ? _o : "var(--color-text-primary)",
    backgroundColor: (_p = theme.background) != null ? _p : "var(--color-bg-surface)",
    cursor: disabled ? "not-allowed" : "pointer",
    ...stylesProp == null ? void 0 : stylesProp.select
  };
  const gridGap = (_q = theme.gap) != null ? _q : 6;
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: showWeekNumbers ? "28px repeat(7, minmax(0, 1fr))" : "repeat(7, minmax(0, 1fr))",
    gap: gridGap
  };
  const weekdayGridStyle = {
    display: "grid",
    gridTemplateColumns: showWeekNumbers ? "28px repeat(7, minmax(0, 1fr))" : "repeat(7, minmax(0, 1fr))",
    gap: gridGap
  };
  const weekdayHeaderStyle = {
    textAlign: "center",
    fontSize: (_r = theme.weekdayFontSize) != null ? _r : 11,
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    color: (_s = theme.textSecondary) != null ? _s : "var(--color-text-secondary)",
    padding: "10px 0",
    ...stylesProp == null ? void 0 : stylesProp.weekday
  };
  const cellBaseStyle = {
    minHeight: "var(--cell-size, 2.25rem)",
    width: "var(--cell-size, 2.25rem)",
    minWidth: "var(--cell-size, 2.25rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: (_t = theme.cellRadius) != null ? _t : 10,
    fontSize: (_u = theme.cellFontSize) != null ? _u : 14,
    cursor: "default",
    ...stylesProp == null ? void 0 : stylesProp.cell
  };
  const captionLabel = visibleMonth.toLocaleDateString(void 0, {
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxs16(
    "div",
    {
      ref: rootRef,
      className: `calendar-root calendar-root--variant-${variant} ${captionLayout === "label" ? "calendar-root--caption-label" : ""} ${captionLayout === "menus" ? "calendar-root--caption-menus" : ""} ${className}`.trim(),
      style: containerStyle,
      onMouseEnter: () => hoverable && setIsHovered(true),
      onMouseLeave: () => hoverable && setIsHovered(false),
      children: [
        !hideNavigation && /* @__PURE__ */ jsxs16("div", { style: headerStyle, children: [
          /* @__PURE__ */ jsx20(
            "button",
            {
              type: "button",
              onClick: handlePrevMonth,
              disabled,
              style: navButtonStyle,
              className: "calendar-nav-btn",
              "aria-label": "Previous month",
              children: /* @__PURE__ */ jsx20(ChevronLeft, {})
            }
          ),
          captionLayout === "label" ? /* @__PURE__ */ jsx20(
            "div",
            {
              className: "calendar-caption-label",
              style: {
                flex: 1,
                minWidth: 0,
                textAlign: "center",
                fontSize: (_v = theme.cellFontSize) != null ? _v : 14,
                fontWeight: 600,
                color: (_w = theme.text) != null ? _w : "var(--color-text-primary)"
              },
              children: captionLabel
            }
          ) : captionLayout === "menus" ? /* @__PURE__ */ jsxs16(
            "div",
            {
              ref: captionMenusRef,
              style: { display: "flex", gap: 8, flex: 1, minWidth: 0, position: "relative" },
              children: [
                /* @__PURE__ */ jsxs16("div", { style: { flex: "1.25 1 0", minWidth: 0, position: "relative" }, children: [
                  /* @__PURE__ */ jsxs16(
                    "button",
                    {
                      type: "button",
                      disabled: disabled || readOnly,
                      className: "calendar-caption-btn",
                      "aria-haspopup": "dialog",
                      "aria-expanded": captionPick === "month",
                      "aria-label": "Choose month",
                      onClick: () => {
                        if (disabled || readOnly)
                          return;
                        setCaptionPick((p) => p === "month" ? null : "month");
                      },
                      children: [
                        /* @__PURE__ */ jsx20("span", { children: monthShortLabels[visibleMonth.getMonth()] }),
                        /* @__PURE__ */ jsx20(ChevronDownSmall, {})
                      ]
                    }
                  ),
                  captionPick === "month" && /* @__PURE__ */ jsx20(
                    "div",
                    {
                      className: "calendar-caption-popup calendar-caption-popup--month",
                      role: "dialog",
                      "aria-label": "Month",
                      children: /* @__PURE__ */ jsx20("div", { className: "calendar-month-grid", children: monthShortLabels.map((lbl, m) => {
                        const selected = m === visibleMonth.getMonth();
                        return /* @__PURE__ */ jsx20(
                          "button",
                          {
                            type: "button",
                            className: selected ? "calendar-month-grid__btn is-selected" : "calendar-month-grid__btn",
                            onClick: () => {
                              handleMonthChange(m);
                              setCaptionPick(null);
                            },
                            children: lbl
                          },
                          m
                        );
                      }) })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs16("div", { style: { flex: "1 1 0", minWidth: 0, position: "relative" }, children: [
                  /* @__PURE__ */ jsxs16(
                    "button",
                    {
                      type: "button",
                      disabled: disabled || readOnly,
                      className: "calendar-caption-btn",
                      "aria-haspopup": "dialog",
                      "aria-expanded": captionPick === "year",
                      "aria-label": "Choose year",
                      onClick: () => {
                        if (disabled || readOnly)
                          return;
                        setCaptionPick((p) => p === "year" ? null : "year");
                      },
                      children: [
                        /* @__PURE__ */ jsx20("span", { children: visibleMonth.getFullYear() }),
                        /* @__PURE__ */ jsx20(ChevronDownSmall, {})
                      ]
                    }
                  ),
                  captionPick === "year" && /* @__PURE__ */ jsx20(
                    "div",
                    {
                      className: "calendar-caption-popup calendar-caption-popup--year",
                      role: "dialog",
                      "aria-label": "Year",
                      children: /* @__PURE__ */ jsx20("div", { className: "calendar-year-list", children: yearOptions.map((opt) => {
                        const selected = opt.value === visibleMonth.getFullYear();
                        return /* @__PURE__ */ jsx20(
                          "button",
                          {
                            type: "button",
                            className: selected ? "calendar-year-list__btn is-selected" : "calendar-year-list__btn",
                            onClick: () => {
                              handleYearChange(opt.value);
                              setCaptionPick(null);
                            },
                            children: opt.label
                          },
                          opt.value
                        );
                      }) })
                    }
                  )
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxs16("div", { style: { display: "flex", gap: 8, flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsx20(
              "select",
              {
                value: visibleMonth.getMonth(),
                onChange: (e) => handleMonthChange(parseInt(e.target.value, 10)),
                disabled,
                style: selectStyle,
                className: "calendar-select",
                "aria-label": "Select month",
                children: monthOptions.map((opt) => /* @__PURE__ */ jsx20("option", { value: opt.value, children: opt.label }, opt.value))
              }
            ),
            /* @__PURE__ */ jsx20(
              "select",
              {
                value: visibleMonth.getFullYear(),
                onChange: (e) => handleYearChange(parseInt(e.target.value, 10)),
                disabled,
                style: selectStyle,
                className: "calendar-select",
                "aria-label": "Select year",
                children: yearOptions.map((opt) => /* @__PURE__ */ jsx20("option", { value: opt.value, children: opt.label }, opt.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsx20(
            "button",
            {
              type: "button",
              onClick: handleNextMonth,
              disabled,
              style: navButtonStyle,
              className: "calendar-nav-btn",
              "aria-label": "Next month",
              children: /* @__PURE__ */ jsx20(ChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxs16("div", { style: weekdayGridStyle, children: [
          showWeekNumbers && /* @__PURE__ */ jsx20("div", { style: weekdayHeaderStyle, "aria-hidden": "true", children: "#" }),
          weekdayLabels.map((label) => /* @__PURE__ */ jsx20("div", { style: weekdayHeaderStyle, children: label }, label))
        ] }),
        /* @__PURE__ */ jsx20(
          "div",
          {
            className: animClass,
            children: Array.from({ length: 6 }, (_, rowIdx) => {
              var _a2, _b2;
              const rowDays = calendarDays.slice(rowIdx * 7, (rowIdx + 1) * 7);
              const firstDayOfRow = rowDays[0];
              const weekNum = firstDayOfRow ? getWeekNumber(firstDayOfRow.date) : null;
              return /* @__PURE__ */ jsxs16("div", { style: gridStyle, children: [
                showWeekNumbers && /* @__PURE__ */ jsx20(
                  "div",
                  {
                    style: {
                      ...cellBaseStyle,
                      fontSize: (_a2 = theme.weekdayFontSize) != null ? _a2 : 11,
                      color: (_b2 = theme.textSecondary) != null ? _b2 : "var(--color-text-secondary)"
                    },
                    children: weekNum
                  }
                ),
                rowDays.map((day) => {
                  var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2;
                  const isSelected = mode === "single" ? isSameDay(day.date, selectedDate) : isSameDay(day.date, rangeStart) || isSameDay(day.date, rangeEnd);
                  const isInRange = mode === "range" && rangeStart && rangeEnd && isBetweenDays(day.date, rangeStart, rangeEnd);
                  const isToday = isSameDay(day.date, today);
                  const isDisabled = isDisabledDate(day.date);
                  const isSelectable = !disabled && !readOnly && !isDisabled;
                  const cellStyle = {
                    ...cellBaseStyle,
                    cursor: isSelectable ? "pointer" : "default",
                    color: isDisabled ? (_a3 = theme.textDisabled) != null ? _a3 : "var(--color-text-disabled)" : !day.inCurrentMonth ? (_b3 = theme.textSecondary) != null ? _b3 : "var(--color-text-secondary)" : isSelected ? (_c2 = theme.primaryText) != null ? _c2 : "var(--button-primary-default-text)" : (_d2 = theme.text) != null ? _d2 : "var(--color-text-primary)",
                    background: isSelected ? (_e2 = theme.primary) != null ? _e2 : "var(--button-primary-default-bg)" : isInRange ? (_f2 = theme.rangeBackground) != null ? _f2 : "var(--color-accent-sky-10)" : isToday ? (_g2 = theme.todayBackground) != null ? _g2 : "var(--color-accent-amber-10)" : "transparent",
                    fontWeight: isSelected ? 700 : isToday ? 600 : 500,
                    boxShadow: isToday && !isSelected ? `inset 0 0 0 2px ${(_h2 = theme.todayRing) != null ? _h2 : "var(--color-today-ring, rgba(245, 158, 11, 0.5))"}` : void 0
                  };
                  return /* @__PURE__ */ jsx20(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleDateSelect(day.date),
                      disabled: isDisabled,
                      style: cellStyle,
                      className: `calendar-cell ${!day.inCurrentMonth ? "calendar-cell--outside" : ""} ${isSelectable && cellHoverAnimation ? "calendar-cell--hoverable" : ""}`,
                      "aria-label": day.date.toLocaleDateString(),
                      "aria-pressed": isSelected,
                      "aria-current": isToday ? "date" : void 0,
                      "aria-disabled": disabled || readOnly ? true : void 0,
                      "data-outside": !day.inCurrentMonth ? "true" : void 0,
                      "data-date": toDayKey(day.date),
                      tabIndex: toDayKey(day.date) === tabbableKey ? 0 : -1,
                      onFocus: () => setFocusedDate(day.date),
                      onKeyDown: (e) => handleDayKeyDown(day.date, e),
                      children: dateCellRender ? dateCellRender(day.date) : day.date.getDate()
                    },
                    day.date.toISOString()
                  );
                })
              ] }, rowIdx);
            })
          },
          visibleMonth.getFullYear() + "-" + visibleMonth.getMonth()
        )
      ]
    }
  );
};
var Calendar_default = Calendar;

// src/components/atoms/DatePicker/index.tsx
import { jsx as jsx21, jsxs as jsxs17 } from "react/jsx-runtime";
function splitRangeValue(value) {
  const parts = value.split(/\s+(?:-|to)\s+/i);
  return [parts[0] || "", parts[1] || ""];
}
function resolveRadius(rounded) {
  switch (rounded) {
    case "0":
      return 0;
    case "1":
      return "var(--radius-xs, 2px)";
    case "2":
      return "var(--radius-sm, 3px)";
    case "3":
      return "var(--radius-base, 4px)";
    case "4":
      return "var(--radius-md, 6px)";
    case "5":
      return "var(--radius-lg, 8px)";
    default:
      return 9999;
  }
}
var DatePicker = ({
  value = "",
  onChange,
  label,
  placeholder = defaultDatePickerOptions.placeholder,
  startPlaceholder = defaultDatePickerOptions.startPlaceholder,
  endPlaceholder = defaultDatePickerOptions.endPlaceholder,
  range = false,
  className = "",
  helperText,
  disabled = false,
  dateFormat: dateFormatProp = defaultDatePickerOptions.dateFormat,
  minDate,
  maxDate,
  validate,
  onValidate,
  error,
  required = false,
  fullWidth = true,
  size = defaultDatePickerOptions.size,
  rounded = defaultDatePickerOptions.rounded,
  variant = defaultDatePickerOptions.variant,
  status,
  rangeSeparator = defaultDatePickerOptions.rangeSeparator,
  id: idProp,
  name,
  ariaLabel
}) => {
  var _a;
  const dateFormat = (dateFormatProp || defaultDatePickerOptions.dateFormat).trim() || defaultDatePickerOptions.dateFormat;
  const reactId = useId11();
  const formField = useFormField();
  const field = range ? null : formField;
  const inputId = (_a = idProp != null ? idProp : field == null ? void 0 : field.id) != null ? _a : reactId;
  const labelId = `${inputId}-label`;
  const helperId = `${inputId}-helper`;
  const wrapperRef = useRef13(null);
  const toggleRef = useRef13(null);
  const popoverRef = useRef13(null);
  const [internalError, setInternalError] = useState17("");
  const [isOpen, setIsOpen] = useState17(false);
  const [isPortalReady, setIsPortalReady] = useState17(false);
  const [isDesktopRangeLayout, setIsDesktopRangeLayout] = useState17(false);
  const [popoverStyle, setPopoverStyle] = useState17({});
  const initialRangeValues = useMemo12(() => splitRangeValue(value), [value]);
  const initialParsedSingle = useMemo12(() => parseFlexibleDate(value, dateFormat), [value, dateFormat]);
  const initialParsedStart = useMemo12(() => parseFlexibleDate(initialRangeValues[0], dateFormat), [initialRangeValues[0], dateFormat]);
  const initialParsedEnd = useMemo12(() => parseFlexibleDate(initialRangeValues[1], dateFormat), [initialRangeValues[1], dateFormat]);
  const [startDate, setStartDate] = useState17(() => initialParsedStart);
  const [endDate, setEndDate] = useState17(() => initialParsedEnd);
  const [singleDate, setSingleDate] = useState17(() => initialParsedSingle);
  const [visibleMonth, setVisibleMonth] = useState17(
    () => startOfMonth(initialParsedStart || initialParsedEnd || initialParsedSingle || /* @__PURE__ */ new Date())
  );
  const [inputText, setInputText] = useState17(
    () => range ? "" : initialParsedSingle ? formatDateForDisplay(initialParsedSingle, dateFormat) : value || ""
  );
  const [rangeStartInput, setRangeStartInput] = useState17(
    () => range ? initialParsedStart ? formatDateForDisplay(initialParsedStart, dateFormat) : initialRangeValues[0] || "" : ""
  );
  const [rangeEndInput, setRangeEndInput] = useState17(
    () => range ? initialParsedEnd ? formatDateForDisplay(initialParsedEnd, dateFormat) : initialRangeValues[1] || "" : ""
  );
  useEffect8(() => {
    if (range) {
      const [nextStart, nextEnd] = splitRangeValue(value);
      const parsedStart = parseFlexibleDate(nextStart, dateFormat);
      const parsedEnd = parseFlexibleDate(nextEnd, dateFormat);
      setStartDate(parsedStart);
      setEndDate(parsedEnd);
      setVisibleMonth(startOfMonth(parsedStart || parsedEnd || /* @__PURE__ */ new Date()));
      setRangeStartInput(parsedStart ? formatDateForDisplay(parsedStart, dateFormat) : nextStart || "");
      setRangeEndInput(parsedEnd ? formatDateForDisplay(parsedEnd, dateFormat) : nextEnd || "");
    } else {
      const parsedSingle = parseFlexibleDate(value, dateFormat);
      setSingleDate(parsedSingle);
      setVisibleMonth(startOfMonth(parsedSingle || /* @__PURE__ */ new Date()));
      setInputText(parsedSingle ? formatDateForDisplay(parsedSingle, dateFormat) : value || "");
    }
  }, [dateFormat, range, value]);
  useEffect8(() => {
    setIsPortalReady(true);
  }, []);
  const closePopover = useCallback13(() => {
    var _a2, _b;
    const active2 = typeof document !== "undefined" ? document.activeElement : null;
    const focusInside = !!active2 && !!((_a2 = popoverRef.current) == null ? void 0 : _a2.contains(active2));
    setIsOpen(false);
    if (focusInside)
      (_b = toggleRef.current) == null ? void 0 : _b.focus();
  }, []);
  useEffect8(() => {
    if (!isOpen || typeof document === "undefined")
      return void 0;
    const onKeyDown = (e) => {
      var _a2, _b;
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing)
        return;
      const target = e.target;
      const inside = !!target && (!!((_a2 = wrapperRef.current) == null ? void 0 : _a2.contains(target)) || !!((_b = popoverRef.current) == null ? void 0 : _b.contains(target)));
      if (!inside)
        return;
      e.preventDefault();
      e.stopPropagation();
      closePopover();
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [isOpen, closePopover]);
  const updatePopoverPosition = useCallback13(() => {
    const anchorEl = wrapperRef.current;
    if (!anchorEl || typeof window === "undefined")
      return;
    const rect = anchorEl.getBoundingClientRect();
    const viewportPadding = 8;
    const gap = 8;
    const desktop = window.innerWidth >= 920;
    setIsDesktopRangeLayout(desktop);
    const estimatedWidth = range ? desktop ? 620 : Math.min(360, window.innerWidth - viewportPadding * 2) : Math.min(340, window.innerWidth - viewportPadding * 2);
    const width = Math.min(estimatedWidth, window.innerWidth - viewportPadding * 2);
    const estimatedHeight = range ? desktop ? 430 : 760 : 430;
    const left = Math.min(
      Math.max(viewportPadding, rect.left),
      window.innerWidth - width - viewportPadding
    );
    const placeAbove = rect.bottom + gap + estimatedHeight > window.innerHeight - viewportPadding && rect.top - gap - estimatedHeight > viewportPadding;
    const top = placeAbove ? Math.max(viewportPadding, rect.top - estimatedHeight - gap) : rect.bottom + gap;
    setPopoverStyle({
      position: "fixed",
      top,
      left,
      width,
      maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
      maxHeight: `calc(100vh - ${viewportPadding * 2}px)`,
      overflow: "auto",
      // Portaled to <body>: lift above the dialog/drawer the field sits in (host modals
      // commonly use z 9999+), otherwise the calendar opens hidden behind it.
      zIndex: Math.max(1400, getAncestorZIndex(anchorEl) + 1)
    });
  }, [range]);
  useEffect8(() => {
    if (!isOpen)
      return;
    updatePopoverPosition();
    const handleWindowChange = () => updatePopoverPosition();
    const handleOutsidePress = (event) => {
      var _a2, _b;
      const target = event.target;
      const isInTrigger = (_a2 = wrapperRef.current) == null ? void 0 : _a2.contains(target);
      const isInPopover = (_b = popoverRef.current) == null ? void 0 : _b.contains(target);
      if (!isInTrigger && !isInPopover)
        setIsOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key === "Escape")
        closePopover();
    };
    window.addEventListener("resize", handleWindowChange);
    window.addEventListener("scroll", handleWindowChange, true);
    document.addEventListener("mousedown", handleOutsidePress);
    document.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("resize", handleWindowChange);
      window.removeEventListener("scroll", handleWindowChange, true);
      document.removeEventListener("mousedown", handleOutsidePress);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, updatePopoverPosition, closePopover]);
  const currentSize = {
    sm: { minHeight: "var(--button-height-sm)", paddingX: 10, fontSize: "var(--text-small-size, 12px)" },
    md: { minHeight: "var(--button-height-lg)", paddingX: 12, fontSize: "var(--text-body-size, 16px)" },
    lg: { minHeight: 48, paddingX: 16, fontSize: "var(--text-body-size, 16px)" }
  }[size];
  const resolvedStatus = status != null ? status : error ? "error" : void 0;
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error)" : resolvedStatus === "warning" ? "var(--color-state-warning)" : resolvedStatus === "success" ? "var(--color-state-success)" : "var(--color-border-default)";
  const shellStyle = {
    width: fullWidth ? "100%" : "auto",
    display: fullWidth ? "block" : "inline-block"
  };
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: disabled ? "var(--color-text-secondary)" : "var(--color-text-primary)",
    fontSize: "var(--text-secondary-size, 14px)",
    fontWeight: 500,
    lineHeight: 1.5
  };
  const fieldBaseStyle = variant === "filled" ? {
    minHeight: currentSize.minHeight,
    backgroundColor: "var(--color-bg-page)",
    border: `1.5px solid ${borderColor}`,
    borderRadius: resolveRadius(rounded)
  } : variant === "underlined" ? {
    minHeight: currentSize.minHeight,
    backgroundColor: "transparent",
    border: "0 solid transparent",
    borderBottom: `1.5px solid ${borderColor}`,
    borderRadius: 0
  } : {
    minHeight: currentSize.minHeight,
    backgroundColor: "var(--color-bg-surface)",
    border: `1.5px solid ${borderColor}`,
    borderRadius: resolveRadius(rounded)
  };
  const inputStyle = {
    width: "100%",
    minWidth: 0,
    height: currentSize.minHeight,
    padding: `0 ${currentSize.paddingX}px`,
    border: "none",
    outline: "none",
    background: "transparent",
    color: disabled ? "var(--color-text-secondary)" : "var(--color-text-primary)",
    fontSize: currentSize.fontSize,
    lineHeight: 1.5,
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none"
  };
  const helperMessage = error || internalError || helperText;
  const showsError = Boolean(error || internalError);
  const fieldA11y = {
    "aria-describedby": [helperMessage ? helperId : void 0, field == null ? void 0 : field.describedBy].filter(Boolean).join(" ") || void 0,
    "aria-invalid": showsError || resolvedStatus === "error" || (field == null ? void 0 : field.invalid) ? true : void 0,
    "aria-required": required || (field == null ? void 0 : field.required) ? true : void 0
  };
  const helperStyle = {
    marginTop: 8,
    marginBottom: 0,
    color: resolvedStatus === "error" ? "var(--color-state-error)" : "var(--color-text-secondary)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  const emitValue = (nextStart, nextEnd) => {
    const formattedStart = formatDateForDisplay(nextStart, dateFormat);
    const formattedEnd = formatDateForDisplay(nextEnd, dateFormat);
    const result = range ? [formattedStart, formattedEnd].filter(Boolean).join(` ${rangeSeparator} `) : formattedStart;
    let nextError = "";
    let isValid = true;
    if (required && !result) {
      nextError = "Date is required";
      isValid = false;
    } else if (result) {
      if (range) {
        const [rawStart, rawEnd] = splitRangeValue(result);
        if (rawStart && !parseFlexibleDate(rawStart, dateFormat)) {
          nextError = "Invalid start date";
          isValid = false;
        } else if (rawEnd && !parseFlexibleDate(rawEnd, dateFormat)) {
          nextError = "Invalid end date";
          isValid = false;
        } else if (rawStart && rawEnd && isAfterDay(parseDate(rawStart, dateFormat), parseDate(rawEnd, dateFormat))) {
          nextError = "End date should be after start date";
          isValid = false;
        }
      } else if (!parseFlexibleDate(result, dateFormat)) {
        nextError = "Invalid date";
        isValid = false;
      }
      if (isValid && minDate && !isDateInRange(result.split(` ${rangeSeparator} `)[0], minDate, void 0, dateFormat)) {
        nextError = "Selected date is before the minimum date";
        isValid = false;
      }
      if (isValid && maxDate && !isDateInRange(result.split(` ${rangeSeparator} `)[0], void 0, maxDate, dateFormat)) {
        nextError = "Selected date is after the maximum date";
        isValid = false;
      }
      if (isValid && validate && !validate(result)) {
        nextError = "Invalid date";
        isValid = false;
      }
    }
    setInternalError(nextError);
    onValidate == null ? void 0 : onValidate(isValid);
    if (isValid) {
      onChange == null ? void 0 : onChange(result);
    } else if (!result) {
      onChange == null ? void 0 : onChange("");
    }
  };
  const minParsedDate = parseDate(minDate || "", dateFormat);
  const maxParsedDate = parseDate(maxDate || "", dateFormat);
  const isDisabledDate = (date) => {
    if (minParsedDate && isBeforeDay(date, minParsedDate))
      return true;
    if (maxParsedDate && isAfterDay(date, maxParsedDate))
      return true;
    return false;
  };
  const applyTypedDate = (text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      setSingleDate(null);
      setInputText("");
      emitValue(null);
      return;
    }
    const parsed = parseFlexibleDate(trimmed, dateFormat);
    if (parsed) {
      setSingleDate(parsed);
      setInputText(formatDateForDisplay(parsed, dateFormat));
      setVisibleMonth(startOfMonth(parsed));
      emitValue(parsed);
    }
  };
  const handleSingleInputChange = (e) => {
    const newVal = e.target.value;
    setInputText(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    const digitCount = trimmed.replace(/[/\-.]/g, "").length;
    const fmtUpper = dateFormat.toUpperCase();
    const isCompleteLength = fmtUpper.includes("YYYY") && digitCount >= 8 || fmtUpper.includes("YY") && !fmtUpper.includes("YYYY") && digitCount >= 6;
    if (isCompleteLength) {
      const parsed = parseFlexibleDate(trimmed, dateFormat);
      if (parsed)
        applyTypedDate(trimmed);
    }
  };
  const applyTypedRange = (startText, endText) => {
    const startTrimmed = startText.trim();
    const endTrimmed = endText.trim();
    if (!startTrimmed && !endTrimmed) {
      setStartDate(null);
      setEndDate(null);
      setRangeStartInput("");
      setRangeEndInput("");
      emitValue(null, null);
      return;
    }
    const parsedStart = startTrimmed ? parseFlexibleDate(startTrimmed, dateFormat) : null;
    const parsedEnd = endTrimmed ? parseFlexibleDate(endTrimmed, dateFormat) : null;
    if (parsedStart) {
      setStartDate(parsedStart);
      setRangeStartInput(formatDateForDisplay(parsedStart, dateFormat));
      setVisibleMonth(startOfMonth(parsedStart));
    }
    if (parsedEnd) {
      setEndDate(parsedEnd);
      setRangeEndInput(formatDateForDisplay(parsedEnd, dateFormat));
    }
    emitValue(parsedStart, parsedEnd);
  };
  const getDigitCount = (str) => str.replace(/[^\d]/g, "").length;
  const formatUpper = dateFormat.toUpperCase();
  const completeLength = formatUpper.includes("YYYY") ? 8 : 6;
  const handleRangeStartChange = (e) => {
    const newVal = e.target.value;
    setRangeStartInput(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    if (getDigitCount(trimmed) >= completeLength && parseFlexibleDate(trimmed, dateFormat)) {
      applyTypedRange(trimmed, rangeEndInput.trim());
    }
  };
  const handleRangeEndChange = (e) => {
    const newVal = e.target.value;
    setRangeEndInput(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    if (getDigitCount(trimmed) >= completeLength && parseFlexibleDate(trimmed, dateFormat)) {
      applyTypedRange(rangeStartInput.trim(), trimmed);
    }
  };
  const handleCalendarRangeChange = (next) => {
    const [a, b] = next;
    setStartDate(a);
    setEndDate(b);
    if (a)
      setRangeStartInput(formatDateForDisplay(a, dateFormat));
    if (b)
      setRangeEndInput(formatDateForDisplay(b, dateFormat));
    else
      setRangeEndInput("");
    emitValue(a != null ? a : null, b != null ? b : null);
    if (a && b) {
      closePopover();
    }
  };
  const navButtonStyle = {
    width: 28,
    height: 28,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "var(--radius-sm, 6px)",
    background: "transparent",
    color: "var(--color-text-primary)",
    cursor: disabled ? "not-allowed" : "pointer",
    flexShrink: 0
  };
  const triggerShellStyle = {
    ...fieldBaseStyle,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    cursor: disabled ? "not-allowed" : "text",
    padding: `0 ${currentSize.paddingX}px`,
    boxSizing: "border-box"
  };
  const popoverPanelStyle = {
    ...popoverStyle,
    padding: 0,
    borderRadius: "var(--radius-md, 8px)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-bg-surface)",
    boxShadow: "var(--shadow-popover, 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 10px 24px -4px rgba(15, 23, 42, 0.1))",
    transformOrigin: "top left",
    opacity: 1,
    transition: "opacity 150ms ease-out, transform 150ms ease-out"
  };
  const rangeCalendarsStyle = {
    display: "grid",
    gridTemplateColumns: isDesktopRangeLayout ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)",
    gap: 16,
    alignItems: "start"
  };
  if (range) {
    return /* @__PURE__ */ jsxs17("div", { className, style: shellStyle, ref: wrapperRef, children: [
      label && /* @__PURE__ */ jsx21("label", { id: labelId, style: labelStyle, children: label }),
      /* @__PURE__ */ jsxs17("div", { style: triggerShellStyle, children: [
        /* @__PURE__ */ jsx21(
          "input",
          {
            type: "text",
            value: rangeStartInput,
            onChange: handleRangeStartChange,
            onFocus: () => {
              if (!disabled)
                setIsOpen(true);
            },
            onBlur: () => applyTypedRange(rangeStartInput, rangeEndInput),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                applyTypedRange(rangeStartInput, rangeEndInput);
                setIsOpen(false);
              }
            },
            placeholder: startPlaceholder,
            disabled,
            readOnly: disabled,
            "aria-label": label ? `${label}, ${startPlaceholder}` : startPlaceholder,
            ...fieldA11y,
            style: {
              ...inputStyle,
              flex: 1,
              minWidth: 0,
              border: "none",
              background: "transparent",
              cursor: disabled ? "not-allowed" : "text"
            }
          }
        ),
        /* @__PURE__ */ jsx21("span", { style: { color: "var(--color-text-secondary)", fontSize: 14, flexShrink: 0 }, children: rangeSeparator }),
        /* @__PURE__ */ jsx21(
          "input",
          {
            type: "text",
            value: rangeEndInput,
            onChange: handleRangeEndChange,
            onFocus: () => {
              if (!disabled)
                setIsOpen(true);
            },
            onBlur: () => applyTypedRange(rangeStartInput, rangeEndInput),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                applyTypedRange(rangeStartInput, rangeEndInput);
                setIsOpen(false);
              }
            },
            placeholder: endPlaceholder,
            disabled,
            readOnly: disabled,
            "aria-label": label ? `${label}, ${endPlaceholder}` : endPlaceholder,
            ...fieldA11y,
            style: {
              ...inputStyle,
              flex: 1,
              minWidth: 0,
              border: "none",
              background: "transparent",
              cursor: disabled ? "not-allowed" : "text"
            }
          }
        ),
        /* @__PURE__ */ jsx21(
          "button",
          {
            type: "button",
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              flexShrink: 0,
              padding: 0,
              border: "none",
              borderRadius: "var(--radius-sm, 6px)",
              background: "transparent",
              color: "var(--color-text-secondary)",
              cursor: disabled ? "not-allowed" : "pointer"
            },
            onClick: () => !disabled && setIsOpen((prev) => !prev),
            onMouseDown: (e) => e.preventDefault(),
            ref: toggleRef,
            "aria-haspopup": "dialog",
            "aria-expanded": isOpen,
            "aria-label": "Open calendar",
            disabled,
            children: /* @__PURE__ */ jsxs17("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsx21("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
              /* @__PURE__ */ jsx21("path", { d: "M3 10h18", stroke: "currentColor", strokeWidth: "1.5" }),
              /* @__PURE__ */ jsx21("path", { d: "M8 3v4M16 3v4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
            ] })
          }
        )
      ] }),
      isPortalReady && isOpen && createPortal3(
        /* @__PURE__ */ jsx21(
          "div",
          {
            ref: popoverRef,
            role: "dialog",
            "aria-label": "Choose date range",
            "aria-modal": "false",
            style: popoverPanelStyle,
            children: /* @__PURE__ */ jsxs17("div", { style: { padding: 12 }, children: [
              /* @__PURE__ */ jsxs17(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    gap: 8
                  },
                  children: [
                    /* @__PURE__ */ jsx21(
                      "button",
                      {
                        type: "button",
                        style: navButtonStyle,
                        className: "calendar-nav-btn",
                        onClick: () => setVisibleMonth(addMonths(visibleMonth, -1)),
                        disabled,
                        "aria-label": "Previous month",
                        children: /* @__PURE__ */ jsx21("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx21("path", { d: "M15 18l-6-6 6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                      }
                    ),
                    /* @__PURE__ */ jsxs17(
                      "span",
                      {
                        style: {
                          flex: 1,
                          textAlign: "center",
                          fontSize: "var(--text-secondary-size, 14px)",
                          fontWeight: 600,
                          color: "var(--color-text-primary)"
                        },
                        children: [
                          visibleMonth.toLocaleDateString(void 0, { month: "long", year: "numeric" }),
                          " \u2013 ",
                          addMonths(visibleMonth, 1).toLocaleDateString(void 0, { month: "long", year: "numeric" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx21(
                      "button",
                      {
                        type: "button",
                        style: navButtonStyle,
                        className: "calendar-nav-btn",
                        onClick: () => setVisibleMonth(addMonths(visibleMonth, 1)),
                        disabled,
                        "aria-label": "Next month",
                        children: /* @__PURE__ */ jsx21("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx21("path", { d: "M9 18l6-6-6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs17("div", { style: rangeCalendarsStyle, children: [
                /* @__PURE__ */ jsx21(
                  Calendar_default,
                  {
                    mode: "range",
                    rangeValue: [startDate, endDate],
                    onRangeChange: handleCalendarRangeChange,
                    month: visibleMonth,
                    onMonthChange: setVisibleMonth,
                    hideNavigation: true,
                    captionLayout: "label",
                    minDate: minParsedDate != null ? minParsedDate : void 0,
                    maxDate: maxParsedDate != null ? maxParsedDate : void 0,
                    disabledDate: isDisabledDate,
                    disabled,
                    variant: "outlined",
                    elevation: "none",
                    bordered: false,
                    animation: "none",
                    fullWidth: true,
                    styles: { root: { padding: 8 } }
                  }
                ),
                /* @__PURE__ */ jsx21(
                  Calendar_default,
                  {
                    mode: "range",
                    rangeValue: [startDate, endDate],
                    onRangeChange: handleCalendarRangeChange,
                    month: addMonths(visibleMonth, 1),
                    onMonthChange: (d) => setVisibleMonth(addMonths(d, -1)),
                    hideNavigation: true,
                    captionLayout: "label",
                    minDate: minParsedDate != null ? minParsedDate : void 0,
                    maxDate: maxParsedDate != null ? maxParsedDate : void 0,
                    disabledDate: isDisabledDate,
                    disabled,
                    variant: "outlined",
                    elevation: "none",
                    bordered: false,
                    animation: "none",
                    fullWidth: true,
                    styles: { root: { padding: 8 } }
                  }
                )
              ] })
            ] })
          }
        ),
        document.body
      ),
      helperMessage && /* @__PURE__ */ jsx21("p", { id: helperId, style: helperStyle, role: showsError ? "alert" : void 0, children: helperMessage })
    ] });
  }
  return /* @__PURE__ */ jsxs17("div", { className, style: shellStyle, ref: wrapperRef, children: [
    label && /* @__PURE__ */ jsx21("label", { htmlFor: inputId, style: labelStyle, children: label }),
    /* @__PURE__ */ jsxs17("div", { style: triggerShellStyle, children: [
      /* @__PURE__ */ jsx21(
        "input",
        {
          id: inputId,
          type: "text",
          value: inputText,
          onChange: handleSingleInputChange,
          onFocus: () => !disabled && setIsOpen(true),
          onBlur: () => applyTypedDate(inputText),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              applyTypedDate(inputText);
              setIsOpen(false);
            }
          },
          placeholder,
          disabled,
          readOnly: disabled,
          name,
          "aria-label": ariaLabel != null ? ariaLabel : label || field ? void 0 : placeholder,
          ...fieldA11y,
          style: {
            ...inputStyle,
            flex: 1,
            minWidth: 0,
            border: "none",
            background: "transparent",
            cursor: disabled ? "not-allowed" : "text"
          }
        }
      ),
      /* @__PURE__ */ jsx21(
        "button",
        {
          type: "button",
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            flexShrink: 0,
            padding: 0,
            border: "none",
            borderRadius: "var(--radius-sm, 6px)",
            background: "transparent",
            color: "var(--color-text-secondary)",
            cursor: disabled ? "not-allowed" : "pointer"
          },
          onClick: () => !disabled && setIsOpen((prev) => !prev),
          onMouseDown: (e) => e.preventDefault(),
          ref: toggleRef,
          "aria-haspopup": "dialog",
          "aria-expanded": isOpen,
          "aria-label": "Open calendar",
          disabled,
          children: /* @__PURE__ */ jsxs17("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx21("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
            /* @__PURE__ */ jsx21("path", { d: "M3 10h18", stroke: "currentColor", strokeWidth: "1.5" }),
            /* @__PURE__ */ jsx21("path", { d: "M8 3v4M16 3v4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
          ] })
        }
      )
    ] }),
    isPortalReady && isOpen && createPortal3(
      /* @__PURE__ */ jsx21(
        "div",
        {
          ref: popoverRef,
          role: "dialog",
          "aria-label": "Choose date",
          "aria-modal": "false",
          style: popoverPanelStyle,
          children: /* @__PURE__ */ jsx21(
            Calendar_default,
            {
              value: singleDate,
              onChange: (d) => {
                if (!d)
                  return;
                setSingleDate(d);
                setInputText(formatDateForDisplay(d, dateFormat));
                emitValue(d);
                closePopover();
              },
              month: visibleMonth,
              onMonthChange: setVisibleMonth,
              captionLayout: "label",
              minDate: minParsedDate != null ? minParsedDate : void 0,
              maxDate: maxParsedDate != null ? maxParsedDate : void 0,
              disabledDate: isDisabledDate,
              disabled,
              variant: "outlined",
              elevation: "none",
              bordered: false,
              animation: "none",
              fullWidth: true,
              styles: { root: { padding: 12 } }
            }
          )
        }
      ),
      document.body
    ),
    helperMessage && /* @__PURE__ */ jsx21("p", { id: helperId, style: helperStyle, role: showsError ? "alert" : void 0, children: helperMessage })
  ] });
};
DatePicker[FORM_FIELD_CONSUMER_KEY] = true;
var DatePicker_default = DatePicker;

// src/components/atoms/OtpBox/index.tsx
import {
  forwardRef as forwardRef3,
  useCallback as useCallback14,
  useEffect as useEffect9,
  useId as useId12,
  useImperativeHandle,
  useRef as useRef14,
  useState as useState18
} from "react";

// src/components/atoms/OtpBox/OtpBox.config.ts
var OTP_BOX_DEFAULTS = {
  length: 6,
  type: "numeric",
  variant: "boxes",
  size: "md",
  mask: false,
  showValidation: true,
  incompleteMessage: "Please enter correct OTP",
  ariaLabel: "One-time code",
  maskChar: "\u2022"
};
var OTP_BOX_REJECT = {
  numeric: /\D/g,
  alphabet: /[^a-zA-Z]/g,
  alphanumeric: /[^a-zA-Z0-9]/g
};
var OTP_BOX_INPUT_MODE = {
  numeric: "numeric",
  alphabet: "text",
  alphanumeric: "text"
};
var OTP_BOX_PATTERN = {
  numeric: "\\d*",
  alphabet: "[a-zA-Z]*",
  alphanumeric: "[a-zA-Z0-9]*"
};

// src/components/atoms/OtpBox/OtpBox.utils.ts
function filterOtp(type, raw) {
  return raw.replace(OTP_BOX_REJECT[type], "");
}
function toCells(value, length) {
  return Array.from({ length }, (_, i) => value.charAt(i));
}
function defaultCellLabel(type, index, length) {
  return `${type === "numeric" ? "Digit" : "Character"} ${index + 1} of ${length}`;
}

// src/components/atoms/OtpBox/index.tsx
import { jsx as jsx22, jsxs as jsxs18 } from "react/jsx-runtime";
var OtpBox = forwardRef3(function OtpBox2({
  length = OTP_BOX_DEFAULTS.length,
  mask = OTP_BOX_DEFAULTS.mask,
  value,
  defaultValue,
  type = OTP_BOX_DEFAULTS.type,
  variant = OTP_BOX_DEFAULTS.variant,
  size = OTP_BOX_DEFAULTS.size,
  onChange,
  onComplete,
  autoFocus = false,
  name,
  id,
  label,
  ariaLabel = OTP_BOX_DEFAULTS.ariaLabel,
  getCellLabel,
  error = "",
  showValidation = OTP_BOX_DEFAULTS.showValidation,
  incompleteMessage = OTP_BOX_DEFAULTS.incompleteMessage,
  required = false,
  disabled = false,
  className = "",
  containerClass = ""
}, ref) {
  const generatedId = useId12();
  const baseId = id != null ? id : `otp-${generatedId}`;
  const labelId = `${baseId}-label`;
  const errorId = `${baseId}-error`;
  const cellId = (i) => `${baseId}-${i}`;
  const [cells, setCells] = useState18(
    () => {
      var _a;
      return toCells(filterOtp(type, (_a = value != null ? value : defaultValue) != null ? _a : ""), length);
    }
  );
  const cellsRef = useRef14(cells);
  cellsRef.current = cells;
  const [focusWithin, setFocusWithin] = useState18(false);
  const [touched, setTouched] = useState18(false);
  const rootRef = useRef14(null);
  const inputRef = useRef14(null);
  const boxRefs = useRef14([]);
  const joined = cells.join("");
  useEffect9(() => {
    const current = cellsRef.current;
    const source = value !== void 0 ? filterOtp(type, value) : current.join("");
    if (current.length !== length || source !== current.join("")) {
      const next = toCells(source, length);
      cellsRef.current = next;
      setCells(next);
    }
  }, [value, length, type]);
  const commit = useCallback14(
    (next) => {
      const prevValue = cellsRef.current.join("");
      cellsRef.current = next;
      setCells(next);
      const nextValue = next.join("");
      if (nextValue === prevValue)
        return;
      onChange == null ? void 0 : onChange(nextValue);
      if (nextValue.length === length && next.every(Boolean))
        onComplete == null ? void 0 : onComplete(nextValue);
    },
    [length, onChange, onComplete]
  );
  const focusCell = (index) => {
    const target = boxRefs.current[Math.max(0, Math.min(index, length - 1))];
    target == null ? void 0 : target.focus();
  };
  const isBoxes = variant === "boxes";
  useImperativeHandle(
    ref,
    () => ({
      focus: (index) => {
        var _a;
        if (!isBoxes) {
          (_a = inputRef.current) == null ? void 0 : _a.focus();
          return;
        }
        const firstEmpty = cellsRef.current.findIndex((c) => !c);
        focusCell(index != null ? index : firstEmpty === -1 ? length - 1 : firstEmpty);
      },
      clear: () => {
        var _a;
        commit(toCells("", length));
        if (isBoxes)
          focusCell(0);
        else
          (_a = inputRef.current) == null ? void 0 : _a.focus();
      },
      getValue: () => cellsRef.current.join("")
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isBoxes, length, commit]
  );
  const distribute = (start, chars) => {
    if (!chars)
      return;
    const from = chars.length >= length ? 0 : start;
    const next = cellsRef.current.slice();
    for (let k = 0; k < chars.length && from + k < length; k += 1)
      next[from + k] = chars.charAt(k);
    commit(next);
    focusCell(Math.min(from + chars.length, length - 1));
  };
  const isIncomplete = joined.length > 0 && joined.length < length;
  const lengthError = showValidation && isIncomplete && touched && !focusWithin ? incompleteMessage : "";
  const displayError = error || lengthError;
  const showError = !!displayError;
  const handleFocus = () => setFocusWithin(true);
  const handleBlur = (e) => {
    var _a;
    const next = e.relatedTarget;
    if (next && ((_a = rootRef.current) == null ? void 0 : _a.contains(next)))
      return;
    setFocusWithin(false);
    setTouched(true);
  };
  const handleBoxChange = (index, e) => {
    const prev = cellsRef.current[index];
    const filtered = filterOtp(type, e.target.value);
    if (filtered.length === 0) {
      const next2 = cellsRef.current.slice();
      next2[index] = "";
      commit(next2);
      return;
    }
    let char = null;
    if (filtered.length === 1)
      char = filtered;
    else if (filtered.length === 2 && prev && filtered.indexOf(prev) !== -1) {
      char = filtered.charAt(0) === prev ? filtered.charAt(1) : filtered.charAt(0);
    }
    if (char === null) {
      distribute(index, filtered);
      return;
    }
    const next = cellsRef.current.slice();
    next[index] = char;
    commit(next);
    if (index < length - 1)
      focusCell(index + 1);
  };
  const handleBoxKeyDown = (index, e) => {
    const current = cellsRef.current;
    switch (e.key) {
      case "Backspace": {
        e.preventDefault();
        const next = current.slice();
        if (current[index]) {
          next[index] = "";
          commit(next);
        } else if (index > 0) {
          next[index - 1] = "";
          commit(next);
          focusCell(index - 1);
        }
        return;
      }
      case "Delete": {
        e.preventDefault();
        if (current[index]) {
          const next = current.slice();
          next[index] = "";
          commit(next);
        }
        return;
      }
      case "ArrowLeft":
        e.preventDefault();
        focusCell(index - 1);
        return;
      case "ArrowRight":
        e.preventDefault();
        focusCell(index + 1);
        return;
      case "Home":
        e.preventDefault();
        focusCell(0);
        return;
      case "End":
        e.preventDefault();
        focusCell(length - 1);
        return;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && current[index] === e.key && filterOtp(type, e.key) === e.key) {
          e.preventDefault();
          if (index < length - 1)
            focusCell(index + 1);
        }
    }
  };
  const handleBoxPaste = (index, e) => {
    e.preventDefault();
    distribute(index, filterOtp(type, e.clipboardData.getData("text")));
  };
  const handleSingleChange = (e) => {
    var _a;
    const inputValue = e.target.value;
    const otpValue = cellsRef.current.join("");
    const cursorPos = (_a = e.target.selectionStart) != null ? _a : inputValue.length;
    let newValue = otpValue;
    if (mask) {
      const prevLength = otpValue.length;
      const newLength = inputValue.length;
      if (newLength > prevLength) {
        const addedStart = cursorPos - (newLength - prevLength);
        const added = filterOtp(type, inputValue.slice(addedStart, cursorPos));
        newValue = otpValue.slice(0, addedStart) + added + otpValue.slice(addedStart);
      } else if (newLength < prevLength) {
        const deleteCount = prevLength - newLength;
        newValue = otpValue.slice(0, cursorPos) + otpValue.slice(cursorPos + deleteCount);
      }
      setTimeout(() => {
        var _a2;
        return (_a2 = inputRef.current) == null ? void 0 : _a2.setSelectionRange(cursorPos, cursorPos);
      }, 0);
    } else {
      newValue = filterOtp(type, inputValue);
    }
    commit(toCells(newValue.slice(0, length), length));
  };
  const handleSinglePaste = (e) => {
    e.preventDefault();
    const pasted = filterOtp(type, e.clipboardData.getData("text"));
    if (pasted)
      commit(toCells(pasted.slice(0, length), length));
  };
  const rootClasses = [
    "otp-box-root",
    `otp-box--${variant}`,
    size !== "md" && `otp-box--${size}`,
    showError && "otp-box--error",
    disabled && "otp-box--disabled",
    containerClass,
    className
  ].filter(Boolean).join(" ");
  const inputMode = OTP_BOX_INPUT_MODE[type];
  const pattern = mask ? void 0 : OTP_BOX_PATTERN[type];
  const describedBy = showError ? errorId : void 0;
  const errorNode = showError ? /* @__PURE__ */ jsxs18("div", { id: errorId, className: "otp-box-error", role: "alert", children: [
    /* @__PURE__ */ jsx22(Icon_default, { src: error_default, width: 14, height: 14, color: "var(--color-danger-strong)", decorative: true }),
    /* @__PURE__ */ jsx22("span", { children: displayError })
  ] }) : null;
  const hiddenInput = name ? /* @__PURE__ */ jsx22("input", { type: "hidden", name, value: joined, disabled }) : null;
  if (isBoxes) {
    return /* @__PURE__ */ jsx22("div", { ref: rootRef, className: rootClasses, "data-disabled": disabled || void 0, children: /* @__PURE__ */ jsxs18("div", { className: "otp-box-wrapper", children: [
      label && /* @__PURE__ */ jsx22("label", { id: labelId, htmlFor: cellId(0), className: "otp-box-label", children: label }),
      /* @__PURE__ */ jsx22(
        "div",
        {
          className: "otp-box-cells",
          role: "group",
          "aria-labelledby": label ? labelId : void 0,
          "aria-label": label ? void 0 : ariaLabel,
          "aria-describedby": describedBy,
          onFocus: handleFocus,
          onBlur: handleBlur,
          children: cells.map((char, i) => /* @__PURE__ */ jsx22(
            "input",
            {
              ref: (el) => {
                boxRefs.current[i] = el;
              },
              id: cellId(i),
              type: "text",
              inputMode,
              pattern,
              value: mask && char ? OTP_BOX_DEFAULTS.maskChar : char,
              onChange: (e) => handleBoxChange(i, e),
              onKeyDown: (e) => handleBoxKeyDown(i, e),
              onPaste: (e) => handleBoxPaste(i, e),
              onFocus: (e) => e.currentTarget.select(),
              disabled,
              autoFocus: autoFocus && i === 0,
              "aria-label": getCellLabel ? getCellLabel(i, length) : defaultCellLabel(type, i, length),
              "aria-invalid": showError || void 0,
              "aria-required": required || void 0,
              "aria-describedby": describedBy,
              autoComplete: i === 0 ? "one-time-code" : "off",
              autoCorrect: "off",
              autoCapitalize: "off",
              spellCheck: false,
              className: "otp-box-cell"
            },
            i
          ))
        }
      ),
      hiddenInput,
      errorNode
    ] }) });
  }
  return /* @__PURE__ */ jsx22("div", { ref: rootRef, className: rootClasses, "data-disabled": disabled || void 0, children: /* @__PURE__ */ jsxs18("div", { className: "otp-box-wrapper", children: [
    label && /* @__PURE__ */ jsx22("label", { id: labelId, htmlFor: baseId, className: "otp-box-label", children: label }),
    /* @__PURE__ */ jsx22(
      "input",
      {
        ref: inputRef,
        id: baseId,
        type: "text",
        maxLength: length,
        value: mask ? OTP_BOX_DEFAULTS.maskChar.repeat(joined.length) : joined,
        onChange: handleSingleChange,
        onPaste: handleSinglePaste,
        onFocus: handleFocus,
        onBlur: handleBlur,
        disabled,
        autoFocus,
        inputMode,
        pattern,
        "aria-label": label ? void 0 : ariaLabel,
        "aria-invalid": showError || void 0,
        "aria-required": required || void 0,
        "aria-describedby": describedBy,
        autoComplete: "one-time-code",
        autoCorrect: "off",
        autoCapitalize: "off",
        placeholder: Array(length).fill("\xB7").join(" "),
        spellCheck: false,
        className: "otp-box-input"
      }
    ),
    hiddenInput,
    errorNode
  ] }) });
});
OtpBox.displayName = "OtpBox";
var OtpBox_default = OtpBox;

// src/components/atoms/Divider/index.tsx
import { jsx as jsx23, jsxs as jsxs19 } from "react/jsx-runtime";
var Divider = ({
  className = "",
  orientation = "horizontal",
  length,
  thickness = "1px",
  color = "var(--color-border-subtle, var(--color-mist-60))",
  variant = "solid",
  align = "center",
  textPosition = "center",
  margin = "12px 0",
  inset = 0,
  style: customStyle,
  children
}) => {
  const resolvedOrientation = orientation === "row" || orientation === "column" ? orientation === "row" ? "horizontal" : "vertical" : orientation;
  const isVertical = resolvedOrientation === "vertical";
  const resolvedThickness = typeof thickness === "number" ? `${thickness}px` : thickness;
  const resolvedInset = typeof inset === "number" ? `${inset}px` : inset;
  if (isVertical) {
    const verticalStyle = {
      display: "inline-block",
      width: resolvedThickness,
      minWidth: resolvedThickness,
      alignSelf: "stretch",
      height: length || "100%",
      backgroundColor: color,
      margin,
      borderRadius: 9999,
      ...customStyle
    };
    return /* @__PURE__ */ jsx23(
      "div",
      {
        role: "separator",
        "aria-orientation": "vertical",
        className,
        style: verticalStyle
      }
    );
  }
  const borderStyle = variant === "dashed" ? "dashed" : variant === "dotted" ? "dotted" : "solid";
  const lineStyle = {
    borderTop: `${resolvedThickness} ${borderStyle} ${color}`,
    borderBottom: "none",
    minWidth: 0,
    flex: 1
  };
  if (!children) {
    const finalStyle = {
      width: length || "100%",
      borderTop: `${resolvedThickness} ${borderStyle} ${color}`,
      margin,
      marginLeft: resolvedInset,
      marginRight: resolvedInset,
      boxSizing: "border-box",
      ...customStyle
    };
    return /* @__PURE__ */ jsx23(
      "div",
      {
        role: "separator",
        "aria-orientation": "horizontal",
        className,
        style: finalStyle
      }
    );
  }
  const startFlex = align === "start" ? 0.2 : align === "end" ? 0.8 : 1;
  const endFlex = align === "start" ? 0.8 : align === "end" ? 0.2 : 1;
  const contentStyle = {
    flexShrink: 0,
    color: "var(--color-text-secondary)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5,
    whiteSpace: "nowrap"
  };
  const lineBorder = `${resolvedThickness} ${borderStyle} ${color}`;
  if (textPosition === "above") {
    return /* @__PURE__ */ jsxs19(
      "div",
      {
        role: "separator",
        "aria-orientation": "horizontal",
        className,
        style: {
          display: "flex",
          flexDirection: "column",
          width: length || "100%",
          margin,
          marginLeft: resolvedInset,
          marginRight: resolvedInset,
          boxSizing: "border-box",
          ...customStyle
        },
        children: [
          /* @__PURE__ */ jsx23("span", { style: { width: "100%", borderTop: lineBorder } }),
          /* @__PURE__ */ jsx23("span", { style: { ...contentStyle, marginTop: 8 }, children })
        ]
      }
    );
  }
  if (textPosition === "below") {
    return /* @__PURE__ */ jsxs19(
      "div",
      {
        role: "separator",
        "aria-orientation": "horizontal",
        className,
        style: {
          display: "flex",
          flexDirection: "column",
          width: length || "100%",
          margin,
          marginLeft: resolvedInset,
          marginRight: resolvedInset,
          boxSizing: "border-box",
          ...customStyle
        },
        children: [
          /* @__PURE__ */ jsx23("span", { style: { ...contentStyle, marginBottom: 8 }, children }),
          /* @__PURE__ */ jsx23("span", { style: { width: "100%", borderTop: lineBorder } })
        ]
      }
    );
  }
  const contentWrapperStyle = {
    display: "flex",
    alignItems: "center",
    width: length || "100%",
    minWidth: 0,
    gap: 12,
    margin,
    marginLeft: resolvedInset,
    marginRight: resolvedInset,
    boxSizing: "border-box",
    ...customStyle
  };
  return /* @__PURE__ */ jsxs19(
    "div",
    {
      role: "separator",
      "aria-orientation": "horizontal",
      className,
      style: contentWrapperStyle,
      children: [
        /* @__PURE__ */ jsx23("span", { style: { ...lineStyle, flex: startFlex } }),
        /* @__PURE__ */ jsx23("span", { style: contentStyle, children }),
        /* @__PURE__ */ jsx23("span", { style: { ...lineStyle, flex: endFlex } })
      ]
    }
  );
};
var Divider_default = Divider;

// src/components/molecules/Modal/index.tsx
import { useCallback as useCallback15, useContext as useContext8, useEffect as useEffect10, useId as useId13, useRef as useRef15, useState as useState19 } from "react";
import { createPortal as createPortal4 } from "react-dom";

// src/components/molecules/Modal/Modal.config.ts
var defaultModalOptions = {
  size: "md",
  animation: "fade",
  /** Matches DESIGN_SYSTEM §18 `--duration-normal` (modals/dropdowns) */
  animationDuration: 300,
  closeAfterTransition: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  showCancel: true,
  /** Body scrolls; header + footer fixed (the original behaviour) */
  scrollBehavior: "inside",
  /** Matches `tokens.css` `--z-modal` */
  zIndex: 400
};
var modalSizeMap = {
  sm: "modal-sm",
  md: "",
  lg: "modal-lg",
  xl: "modal-xl",
  xxl: "modal-xxl",
  fullscreen: "modal-fullscreen"
};
var modalSizeWidths = {
  sm: "400px",
  md: "480px",
  lg: "560px",
  xl: "800px",
  xxl: "min(1140px, 90vw)",
  fullscreen: "100%"
};

// src/components/molecules/Modal/bodyScrollLock.ts
var depth = 0;
var scrollY = 0;
function acquireBodyScrollLock() {
  if (depth === 0) {
    scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  depth += 1;
}
function releaseBodyScrollLock() {
  depth = Math.max(0, depth - 1);
  if (depth === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    window.scrollTo(0, scrollY);
  }
}

// src/components/molecules/Modal/overlayStack.ts
import { createContext as createContext7 } from "react";
var stack = [];
var OverlayLayerContext = createContext7(void 0);
function pushLayer(id, parentId) {
  stack = stack.filter((layer2) => layer2.id !== id);
  const layer = { id, parentId };
  const firstChild = stack.findIndex((l) => isDescendantOf(l, id));
  if (firstChild === -1)
    stack.push(layer);
  else
    stack.splice(firstChild, 0, layer);
}
function popLayer(id) {
  stack = stack.filter((layer) => layer.id !== id);
}
function isTopLayer(id) {
  return stack.length > 0 && stack[stack.length - 1].id === id;
}
function isDescendantOf(layer, ancestorId) {
  var _a;
  let parentId = layer.parentId;
  const seen = /* @__PURE__ */ new Set();
  while (parentId && !seen.has(parentId)) {
    if (parentId === ancestorId)
      return true;
    seen.add(parentId);
    parentId = (_a = stack.find((l) => l.id === parentId)) == null ? void 0 : _a.parentId;
  }
  return false;
}

// src/components/molecules/Modal/closeGuard.ts
function runGuardedClose(guard, proceed, pendingRef, isActive = () => true) {
  if (pendingRef.current)
    return;
  if (!guard) {
    proceed();
    return;
  }
  let result;
  try {
    result = guard();
  } catch (e) {
    return;
  }
  if (result && typeof result.then === "function") {
    pendingRef.current = true;
    result.then(
      (ok) => {
        pendingRef.current = false;
        if (ok !== false && isActive())
          proceed();
      },
      () => {
        pendingRef.current = false;
      }
    );
    return;
  }
  if (result !== false)
    proceed();
}

// src/components/molecules/Modal/index.tsx
import { Fragment as Fragment5, jsx as jsx24, jsxs as jsxs20 } from "react/jsx-runtime";
function createAutoFocusEvent(type) {
  return new Event(type, { cancelable: true });
}
function Modal({
  isOpen,
  onClose,
  title,
  ariaLabel,
  description,
  headerActions,
  onBeforeClose,
  bodyScroll = true,
  bodyClassName,
  animate = true,
  rootProps,
  children,
  onConfirm,
  confirmText = "Confirm",
  confirmDisabled = false,
  confirmLoading = false,
  cancelText = "Cancel",
  showCancel = true,
  hideFooter = false,
  footer,
  size = defaultModalOptions.size,
  id = "dynamicModal",
  showCloseButton = defaultModalOptions.showCloseButton,
  isStackedBackground = false,
  zIndex = defaultModalOptions.zIndex,
  titleIcon,
  titleIconSize,
  animation = defaultModalOptions.animation,
  animationDuration = defaultModalOptions.animationDuration,
  closeAfterTransition = defaultModalOptions.closeAfterTransition,
  closeOnBackdropClick = defaultModalOptions.closeOnBackdropClick,
  closeOnEscape = defaultModalOptions.closeOnEscape,
  className = "",
  hideHeader = false,
  initialFocusRef,
  scrollBehavior = defaultModalOptions.scrollBehavior,
  fullscreenOnMobile = false,
  onOpenAutoFocus,
  onCloseAutoFocus,
  confirmButtonVariant = "primary",
  confirmButtonColor,
  confirmButtonBackground,
  confirmButtonBorder,
  cancelButtonVariant = "outlineSecondary",
  cancelButtonColor,
  cancelButtonBackground,
  cancelButtonBorder,
  ...restProps
}) {
  var _a, _b;
  const [isExiting, setIsExiting] = useState19(false);
  const exitTimeoutRef = useRef15(null);
  const dialogRef = useRef15(null);
  const layerId = useId13();
  const parentLayerId = useContext8(OverlayLayerContext);
  const initialFocusRefRef = useRef15(initialFocusRef);
  initialFocusRefRef.current = initialFocusRef;
  const onOpenAutoFocusRef = useRef15(onOpenAutoFocus);
  onOpenAutoFocusRef.current = onOpenAutoFocus;
  const onCloseAutoFocusRef = useRef15(onCloseAutoFocus);
  onCloseAutoFocusRef.current = onCloseAutoFocus;
  const effectiveAnimation = animate ? animation : "none";
  const isFullscreen = size === "fullscreen";
  const sizeClass = (_a = modalSizeMap[size]) != null ? _a : "";
  const animClass = effectiveAnimation !== "none" ? `modal-dialog--${effectiveAnimation}` : "";
  const onBeforeCloseRef = useRef15(onBeforeClose);
  onBeforeCloseRef.current = onBeforeClose;
  const guardPendingRef = useRef15(false);
  const isOpenRef = useRef15(isOpen);
  isOpenRef.current = isOpen;
  useEffect10(() => {
    if (isOpen) {
      setIsExiting(false);
    } else {
      setIsExiting(false);
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
    }
  }, [isOpen]);
  useEffect10(() => {
    if (!isOpen)
      return void 0;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [isOpen]);
  useEffect10(() => {
    if (!isOpen)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [isOpen, layerId, parentLayerId]);
  const performClose = useCallback15(() => {
    if (exitTimeoutRef.current)
      return;
    if (closeAfterTransition && effectiveAnimation !== "none") {
      setIsExiting(true);
      exitTimeoutRef.current = setTimeout(() => {
        onClose();
        exitTimeoutRef.current = null;
      }, animationDuration);
    } else {
      onClose();
    }
  }, [closeAfterTransition, effectiveAnimation, animationDuration, onClose]);
  const handleClose = useCallback15(() => {
    if (exitTimeoutRef.current)
      return;
    runGuardedClose(onBeforeCloseRef.current, performClose, guardPendingRef, () => isOpenRef.current);
  }, [performClose]);
  useEffect10(() => {
    return () => {
      if (exitTimeoutRef.current)
        clearTimeout(exitTimeoutRef.current);
    };
  }, []);
  useEffect10(() => {
    const handleEscape = (e) => {
      if (e.key !== "Escape" || !isOpen || e.defaultPrevented || !isTopLayer(layerId))
        return;
      e.preventDefault();
      e.stopPropagation();
      if (closeOnEscape)
        handleClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose, closeOnEscape, layerId]);
  useEffect10(() => {
    if (!isOpen)
      return;
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable2 = () => Array.from(dialog.querySelectorAll(focusableSelector)).filter(
      (el) => el.getAttribute("aria-hidden") !== "true" && el.offsetParent !== null
    );
    const previouslyFocused = document.activeElement;
    const focusInitial = () => {
      var _a2, _b2;
      const openEvent = createAutoFocusEvent("modal.openAutoFocus");
      (_a2 = onOpenAutoFocusRef.current) == null ? void 0 : _a2.call(onOpenAutoFocusRef, openEvent);
      if (openEvent.defaultPrevented)
        return;
      const preferred = (_b2 = initialFocusRefRef.current) == null ? void 0 : _b2.current;
      if (preferred) {
        preferred.focus();
        return;
      }
      const focusable = getFocusable2();
      const first = focusable[0];
      if (first)
        first.focus();
      else
        dialog.focus();
    };
    const frame = requestAnimationFrame(focusInitial);
    const handleKeyDown = (e) => {
      if (e.key !== "Tab")
        return;
      const focusable = getFocusable2();
      if (focusable.length === 0)
        return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    dialog.addEventListener("keydown", handleKeyDown);
    return () => {
      var _a2;
      cancelAnimationFrame(frame);
      dialog.removeEventListener("keydown", handleKeyDown);
      const closeEvent = createAutoFocusEvent("modal.closeAutoFocus");
      (_a2 = onCloseAutoFocusRef.current) == null ? void 0 : _a2.call(onCloseAutoFocusRef, closeEvent);
      if (!closeEvent.defaultPrevented && previouslyFocused && previouslyFocused !== document.body && previouslyFocused.isConnected && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [isOpen]);
  if (!isOpen)
    return null;
  const backdropZIndex = isStackedBackground ? zIndex - 2 : zIndex;
  const dialogZIndex = isStackedBackground ? zIndex - 1 : zIndex + 1;
  const handleBackdropClick = closeOnBackdropClick ? () => {
    if (isTopLayer(layerId))
      handleClose();
  } : void 0;
  const scrollOutside = scrollBehavior === "outside";
  const hasDescription = !hideHeader && description != null && description !== false;
  const descriptionId = `${id}Description`;
  const handleConfirm = () => {
    if (confirmLoading || confirmDisabled)
      return;
    onConfirm == null ? void 0 : onConfirm();
  };
  const rootClassName = [
    "modal",
    scrollOutside ? "modal--scroll-outside" : "",
    fullscreenOnMobile ? "modal--fullscreen-mobile" : "",
    isFullscreen ? "modal--fullscreen" : ""
  ].filter(Boolean).join(" ");
  const directDataAttrs = {};
  for (const [key, value] of Object.entries(restProps)) {
    if (key.startsWith("data-"))
      directDataAttrs[key] = value;
  }
  const { className: rootExtraClassName, ...rootRest } = rootProps != null ? rootProps : {};
  const labelledById = !hideHeader && !ariaLabel ? `${id}Label` : void 0;
  const modalContent = /* @__PURE__ */ jsx24(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs20(
    "div",
    {
      ...directDataAttrs,
      ...rootRest,
      className: ["modal-root", rootExtraClassName].filter(Boolean).join(" "),
      children: [
        !isStackedBackground && /* @__PURE__ */ jsx24(
          "div",
          {
            className: `modal-backdrop ${isExiting ? "modal-backdrop--exiting" : "modal-backdrop--entering"}`,
            style: {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "var(--color-bg-overlay, rgba(0, 0, 0, 0.5))",
              zIndex: backdropZIndex,
              pointerEvents: "auto"
            },
            onClick: handleBackdropClick,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx24(
          "div",
          {
            ref: dialogRef,
            className: rootClassName,
            id,
            tabIndex: -1,
            "aria-labelledby": labelledById,
            "aria-label": ariaLabel || void 0,
            "aria-describedby": hasDescription ? descriptionId : void 0,
            "data-scroll-behavior": scrollBehavior,
            "aria-modal": "true",
            role: "dialog",
            style: {
              boxSizing: "border-box",
              display: "flex",
              // "outside": top-align + auto margins so tall dialogs scroll from their top edge instead of clipping.
              alignItems: scrollOutside ? "flex-start" : "center",
              justifyContent: "center",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100dvw",
              height: "100dvh",
              zIndex: dialogZIndex,
              padding: isFullscreen ? 0 : "1rem",
              overflowX: "hidden",
              overflowY: scrollOutside ? "auto" : "hidden",
              pointerEvents: "auto"
            },
            onClick: !isStackedBackground ? handleBackdropClick : void 0,
            children: /* @__PURE__ */ jsx24(
              "div",
              {
                className: [
                  "modal-dialog",
                  sizeClass,
                  animClass,
                  animate ? "" : "modal-dialog--static",
                  isExiting ? "modal-dialog--exiting" : "modal-dialog--entering"
                ].filter(Boolean).join(" "),
                style: {
                  boxSizing: "border-box",
                  margin: scrollOutside ? "auto" : 0,
                  maxHeight: isFullscreen ? "100dvh" : scrollOutside ? "none" : "calc(100dvh - 2rem)",
                  ...isFullscreen ? { height: scrollOutside ? void 0 : "100dvh", minHeight: "100dvh" } : null,
                  width: "100%",
                  maxWidth: (_b = modalSizeWidths[size]) != null ? _b : "480px",
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  pointerEvents: "auto",
                  animationDuration: `${animationDuration}ms`
                },
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxs20(
                  "div",
                  {
                    className: `modal-content ${className}`.trim(),
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 1 auto",
                      minHeight: 0,
                      maxHeight: scrollOutside ? "none" : "100%",
                      overflow: "hidden",
                      background: "var(--color-bg-surface)",
                      borderRadius: isFullscreen ? 0 : "var(--radius-lg, 8px)",
                      boxShadow: isFullscreen ? "none" : "var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.12))"
                    },
                    children: [
                      !hideHeader && /* @__PURE__ */ jsxs20(
                        "div",
                        {
                          className: "modal-header",
                          style: {
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "1rem",
                            flexShrink: 0,
                            padding: "1rem 1.25rem",
                            borderBottom: "1px solid var(--color-border-subtle, var(--color-mist-60))"
                          },
                          children: [
                            /* @__PURE__ */ jsxs20("div", { className: "modal-heading", style: { flex: 1, minWidth: 0 }, children: [
                              /* @__PURE__ */ jsxs20(
                                "span",
                                {
                                  id: `${id}Label`,
                                  className: "modal-title fw-semibold",
                                  style: { display: "block", fontSize: "1.125rem", color: "var(--color-text-primary)" },
                                  children: [
                                    titleIcon && /* @__PURE__ */ jsx24(
                                      Icon_default,
                                      {
                                        src: titleIcon,
                                        width: titleIconSize != null ? titleIconSize : 24,
                                        height: titleIconSize != null ? titleIconSize : 24,
                                        className: "me-2",
                                        preserveColors: true
                                      }
                                    ),
                                    title
                                  ]
                                }
                              ),
                              hasDescription && /* @__PURE__ */ jsx24("div", { id: descriptionId, className: "modal-description", children: description })
                            ] }),
                            headerActions != null && headerActions !== false && /* @__PURE__ */ jsx24(
                              "div",
                              {
                                className: "modal-header-actions",
                                style: { display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 },
                                children: headerActions
                              }
                            ),
                            showCloseButton && /* @__PURE__ */ jsx24(
                              Button_default,
                              {
                                variant: "link",
                                onClick: handleClose,
                                icon: close_default,
                                size: "sm",
                                style: { flexShrink: 0, marginTop: "-0.25rem" },
                                "aria-label": "Close dialog"
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx24(
                        "div",
                        {
                          className: ["modal-body", bodyScroll ? "" : "modal-body--fixed", bodyClassName].filter(Boolean).join(" "),
                          "data-body-scroll": bodyScroll ? void 0 : "false",
                          style: {
                            overflowY: !bodyScroll ? "hidden" : scrollOutside ? "visible" : "auto",
                            overflowX: "hidden",
                            flex: 1,
                            minHeight: 0,
                            padding: "1rem 1.25rem",
                            ...bodyScroll ? null : { display: "flex", flexDirection: "column" }
                          },
                          children
                        }
                      ),
                      !hideFooter && (footer != null || onConfirm) && /* @__PURE__ */ jsx24(
                        "div",
                        {
                          className: "modal-footer",
                          style: {
                            flexShrink: 0,
                            display: "flex",
                            gap: "0.75rem",
                            justifyContent: "flex-end",
                            flexWrap: "wrap",
                            padding: "1rem 1.25rem",
                            borderTop: "1px solid var(--color-border-subtle, var(--color-mist-60))"
                          },
                          children: footer != null ? footer : /* @__PURE__ */ jsxs20(Fragment5, { children: [
                            showCancel && /* @__PURE__ */ jsx24(
                              Button_default,
                              {
                                variant: cancelButtonVariant,
                                size: "md",
                                onClick: handleClose,
                                textColor: cancelButtonColor,
                                backgroundColor: cancelButtonBackground,
                                borderColor: cancelButtonBorder,
                                children: cancelText
                              }
                            ),
                            /* @__PURE__ */ jsx24(
                              Button_default,
                              {
                                variant: confirmButtonVariant,
                                size: confirmButtonVariant === "primary" ? "lg" : "md",
                                onClick: handleConfirm,
                                disabled: confirmDisabled,
                                loading: confirmLoading,
                                "aria-busy": confirmLoading || void 0,
                                textColor: confirmButtonColor,
                                backgroundColor: confirmButtonBackground,
                                borderColor: confirmButtonBorder,
                                children: confirmText
                              }
                            )
                          ] })
                        }
                      )
                    ]
                  }
                )
              }
            )
          }
        )
      ]
    }
  ) });
  return typeof document !== "undefined" ? createPortal4(modalContent, document.body) : null;
}

// src/components/molecules/AlertDialog/AlertDialog.config.ts
var alertDialogVariantConfig = {
  info: {
    icon: "\u2139",
    iconColor: "var(--color-state-info)",
    bgColor: "color-mix(in srgb, var(--color-state-info) 10%, transparent)"
  },
  success: {
    icon: "\u2713",
    iconColor: "var(--color-state-success)",
    bgColor: "color-mix(in srgb, var(--color-state-success) 10%, transparent)"
  },
  warning: {
    icon: "\u26A0",
    iconColor: "var(--color-state-warning)",
    bgColor: "color-mix(in srgb, var(--color-state-warning) 10%, transparent)"
  },
  error: {
    icon: "\u2715",
    iconColor: "var(--color-state-error)",
    bgColor: "color-mix(in srgb, var(--color-state-error) 10%, transparent)"
  }
};

// src/components/molecules/AlertDialog/AlertDialogIcons.tsx
import { jsx as jsx25, jsxs as jsxs21 } from "react/jsx-runtime";
var iconSize = 56;
function SuccessIconSvg({
  animated,
  color = "var(--color-state-success)",
  bgColor = "color-mix(in srgb, var(--color-state-success) 10%, transparent)"
}) {
  return /* @__PURE__ */ jsxs21(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--success" : "",
      children: [
        /* @__PURE__ */ jsx25("circle", { cx: "28", cy: "28", r: "26", fill: bgColor }),
        /* @__PURE__ */ jsx25(
          "path",
          {
            className: animated ? "alert-dialog-checkmark" : "",
            d: "M16 28l8 8 16-16",
            stroke: color,
            strokeWidth: "3",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none"
          }
        )
      ]
    }
  );
}
function ErrorIconSvg({
  animated,
  color = "var(--color-state-error)",
  bgColor = "color-mix(in srgb, var(--color-state-error) 10%, transparent)"
}) {
  return /* @__PURE__ */ jsxs21(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--error" : "",
      children: [
        /* @__PURE__ */ jsx25("circle", { cx: "28", cy: "28", r: "26", fill: bgColor }),
        /* @__PURE__ */ jsx25("path", { d: "M28 18v14", stroke: color, strokeWidth: "3", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx25("circle", { cx: "28", cy: "38", r: "2.5", fill: color })
      ]
    }
  );
}
function WarningIconSvg({
  animated,
  color = "var(--color-state-warning)",
  bgColor = "color-mix(in srgb, var(--color-state-warning) 10%, transparent)"
}) {
  return /* @__PURE__ */ jsxs21(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--warning" : "",
      children: [
        /* @__PURE__ */ jsx25(
          "path",
          {
            d: "M28 12L44 42H12L28 12z",
            fill: bgColor,
            stroke: color,
            strokeWidth: "2",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx25("path", { d: "M28 22v10", stroke: color, strokeWidth: "2.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx25("circle", { cx: "28", cy: "38", r: "2", fill: color })
      ]
    }
  );
}

// src/components/molecules/AlertDialog/index.tsx
import { jsx as jsx26, jsxs as jsxs22 } from "react/jsx-runtime";
function VariantIcon({
  variant,
  animated
}) {
  const config2 = alertDialogVariantConfig[variant];
  const color = config2.iconColor;
  const bgColor = config2.bgColor;
  if (variant === "success") {
    return /* @__PURE__ */ jsx26(SuccessIconSvg, { animated, color, bgColor });
  }
  if (variant === "error") {
    return /* @__PURE__ */ jsx26(ErrorIconSvg, { animated, color, bgColor });
  }
  if (variant === "warning") {
    return /* @__PURE__ */ jsx26(WarningIconSvg, { animated, color, bgColor });
  }
  return /* @__PURE__ */ jsx26(
    "span",
    {
      className: animated ? "alert-dialog-icon--animated" : "",
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: config2.bgColor,
        color: config2.iconColor,
        fontSize: 24
      },
      children: config2.icon
    }
  );
}
function AlertDialog({
  isOpen,
  onClose,
  title,
  description,
  variant = "info",
  iconAnimated = true,
  icon: customIcon,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  showCancel = false,
  destructive = false,
  confirmDisabled = false,
  size = "md",
  closeOnBackdropClick,
  closeOnEscape = true,
  zIndex = 400,
  confirmButtonVariant,
  confirmButtonColor,
  confirmButtonBackground,
  confirmButtonBorder,
  cancelButtonVariant = "outlineSecondary",
  cancelButtonColor,
  cancelButtonBackground,
  cancelButtonBorder
}) {
  const allowBackdropDismiss = closeOnBackdropClick != null ? closeOnBackdropClick : !destructive;
  const sizeMap = { sm: "sm", md: "md", lg: "lg" };
  const handleConfirm = () => {
    onConfirm == null ? void 0 : onConfirm();
    onClose();
  };
  const handleCancel = () => {
    onCancel == null ? void 0 : onCancel();
    onClose();
  };
  return /* @__PURE__ */ jsx26(
    Modal,
    {
      isOpen,
      onClose,
      title: "",
      size: sizeMap[size],
      hideFooter: true,
      hideHeader: true,
      showCloseButton: false,
      closeOnBackdropClick: allowBackdropDismiss,
      closeOnEscape,
      zIndex,
      animation: "scale",
      children: /* @__PURE__ */ jsxs22(
        "div",
        {
          className: "alert-dialog-content",
          role: "alertdialog",
          "aria-labelledby": "alert-dialog-title",
          "aria-describedby": "alert-dialog-desc",
          children: [
            /* @__PURE__ */ jsx26("div", { style: { marginBottom: "1.25rem", display: "flex", justifyContent: "center" }, children: customIcon != null ? customIcon : /* @__PURE__ */ jsx26(VariantIcon, { variant, animated: iconAnimated }) }),
            /* @__PURE__ */ jsx26(
              "h2",
              {
                id: "alert-dialog-title",
                style: {
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary)"
                },
                children: title
              }
            ),
            description && /* @__PURE__ */ jsx26(
              "p",
              {
                id: "alert-dialog-desc",
                style: {
                  margin: "0.5rem 0 1.25rem",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.5
                },
                children: description
              }
            ),
            /* @__PURE__ */ jsxs22("div", { className: "alert-dialog-actions", children: [
              showCancel && /* @__PURE__ */ jsx26(
                Button_default,
                {
                  variant: cancelButtonVariant,
                  size: "md",
                  onClick: handleCancel,
                  textColor: cancelButtonColor,
                  backgroundColor: cancelButtonBackground,
                  borderColor: cancelButtonBorder,
                  children: cancelText
                }
              ),
              /* @__PURE__ */ jsx26(
                Button_default,
                {
                  variant: confirmButtonVariant != null ? confirmButtonVariant : destructive ? "outlinePrimary" : "primary",
                  size: destructive ? "md" : "lg",
                  onClick: handleConfirm,
                  disabled: confirmDisabled,
                  textColor: confirmButtonColor,
                  backgroundColor: confirmButtonBackground,
                  borderColor: confirmButtonBorder,
                  children: confirmText
                }
              )
            ] })
          ]
        }
      )
    }
  );
}

// src/components/atoms/Hyperlink/index.tsx
import React25 from "react";

// src/components/atoms/Hyperlink/Hyperlink.config.ts
var HYPERLINK_DEFAULTS = {
  href: "#",
  variant: "default",
  size: "md",
  newTabLabel: "(opens in new tab)"
};
var HYPERLINK_DEFAULT_UNDERLINE = {
  default: "hover",
  subtle: "hover",
  inline: "always",
  standalone: "hover"
};

// src/components/atoms/Hyperlink/Hyperlink.slot.tsx
import React24, { cloneElement as cloneElement4, isValidElement as isValidElement5 } from "react";
function getElementRef2(element) {
  const major = parseInt(React24.version, 10);
  if (major >= 19)
    return element.props.ref;
  return element.ref;
}
function setRef3(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref && typeof ref === "object")
    ref.current = value;
}
function renderLinkSlot(children, slotProps, ref, options) {
  const child = React24.Children.only(children);
  if (!isValidElement5(child)) {
    throw new Error("Hyperlink with asChild expects a single React element child");
  }
  const childProps = child.props;
  const childRef = getElementRef2(child);
  const merged = { ...childProps };
  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    if (slotValue === void 0)
      continue;
    if (/^on[A-Z]/.test(key) && typeof slotValue === "function") {
      merged[key] = typeof childValue === "function" ? (event, ...args) => {
        childValue(event, ...args);
        if (event && event.defaultPrevented)
          return;
        slotValue(event, ...args);
      } : slotValue;
    } else if (key === "className") {
      merged[key] = [childValue, slotValue].filter(Boolean).join(" ") || void 0;
    } else if (key === "style") {
      merged[key] = { ...slotValue, ...childValue };
    } else if (childValue === void 0) {
      merged[key] = slotValue;
    }
  }
  const finalProps = options.finalize(merged);
  finalProps.ref = (node) => {
    setRef3(ref, node);
    setRef3(childRef, node);
  };
  delete finalProps.children;
  return cloneElement4(
    child,
    finalProps,
    options.renderChildren(childProps.children)
  );
}

// src/components/atoms/Hyperlink/Hyperlink.utils.ts
var cls16 = (...classes) => classes.filter(Boolean).join(" ");

// src/components/atoms/Hyperlink/index.tsx
import { Fragment as Fragment6, jsx as jsx27, jsxs as jsxs23 } from "react/jsx-runtime";
function sanitizeHref(href) {
  if (href === void 0 || href === null)
    return void 0;
  if (typeof href === "string")
    return isSafeHref(href) ? href : void 0;
  if (typeof href === "object") {
    const url = href;
    for (const key of ["href", "pathname"]) {
      const v = url[key];
      if (typeof v === "string" && !isSafeHref(v))
        return void 0;
    }
    if (typeof url.protocol === "string") {
      const protocol = url.protocol.endsWith(":") ? url.protocol : `${url.protocol}:`;
      if (!isSafeHref(`${protocol}//placeholder.invalid/`))
        return void 0;
    }
    return href;
  }
  return void 0;
}
function mergeRel(rel, secure) {
  const tokens = typeof rel === "string" ? rel.split(/\s+/).filter(Boolean) : [];
  if (secure)
    tokens.push("noopener", "noreferrer");
  const unique = tokens.filter((t, i) => tokens.indexOf(t) === i);
  return unique.length ? unique.join(" ") : void 0;
}
function ExternalIcon() {
  return /* @__PURE__ */ jsx27("span", { className: "ds-hyperlink__icon ds-hyperlink__icon--external", "aria-hidden": "true", children: /* @__PURE__ */ jsx27("svg", { viewBox: "0 0 16 16", width: "1em", height: "1em", fill: "none", focusable: "false", children: /* @__PURE__ */ jsx27(
    "path",
    {
      d: "M9 2.5h4.5V7M13.5 2.5 7 9M11.5 9.5v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) });
}
var Hyperlink = React25.forwardRef(function Hyperlink2({
  children,
  href,
  variant = HYPERLINK_DEFAULTS.variant,
  underline,
  size,
  leadingIcon,
  trailingIcon,
  openInNewTab = false,
  external,
  disabled = false,
  asChild = false,
  newTabLabel = HYPERLINK_DEFAULTS.newTabLabel,
  className,
  target,
  rel,
  onClick,
  ...rest
}, ref) {
  const childTarget = asChild && React25.isValidElement(children) ? children.props.target : void 0;
  const isNewTab = openInNewTab || target === "_blank" || childTarget === "_blank";
  const isExternal = external != null ? external : isNewTab;
  const resolvedUnderline = underline != null ? underline : HYPERLINK_DEFAULT_UNDERLINE[variant];
  const resolvedSize = size != null ? size : variant === "inline" ? void 0 : HYPERLINK_DEFAULTS.size;
  const renderContent = (text) => /* @__PURE__ */ jsxs23(Fragment6, { children: [
    leadingIcon ? /* @__PURE__ */ jsx27("span", { className: "ds-hyperlink__icon", "aria-hidden": "true", children: leadingIcon }) : null,
    text,
    trailingIcon ? /* @__PURE__ */ jsx27("span", { className: "ds-hyperlink__icon", "aria-hidden": "true", children: trailingIcon }) : null,
    isExternal && !disabled ? /* @__PURE__ */ jsx27(ExternalIcon, {}) : null,
    isNewTab && !disabled ? /* @__PURE__ */ jsx27("span", { className: "ds-hyperlink__sr-only", children: ` ${newTabLabel}` }) : null
  ] });
  const swallowClick = (event) => {
    event.preventDefault();
  };
  const visualProps = {
    className: cls16("ds-hyperlink", className),
    "data-variant": variant,
    "data-underline": resolvedUnderline,
    "data-size": resolvedSize,
    "data-disabled": disabled ? "" : void 0,
    "data-external": isExternal ? "" : void 0
  };
  const enforce = (props, keepHrefWhenDisabled) => {
    const next = { ...props };
    next.href = sanitizeHref(next.href);
    if (disabled) {
      if (!keepHrefWhenDisabled)
        next.href = void 0;
      next.target = void 0;
      next.rel = void 0;
      next.role = "link";
      next["aria-disabled"] = true;
      next.tabIndex = -1;
      next.onClick = swallowClick;
    } else {
      next.target = isNewTab ? "_blank" : next.target;
      next.rel = mergeRel(next.rel, isExternal || isNewTab);
    }
    return next;
  };
  if (asChild) {
    return renderLinkSlot(
      children,
      { ...rest, ...visualProps, href, target, rel, onClick },
      ref,
      {
        renderChildren: renderContent,
        // Router links (e.g. Next.js <Link>) require `href`; keep it when disabled — clicks and focus are still blocked.
        finalize: (merged) => enforce(merged, true)
      }
    );
  }
  const anchorProps = enforce(
    { ...rest, ...visualProps, href: href != null ? href : HYPERLINK_DEFAULTS.href, target, rel, onClick },
    false
  );
  return /* @__PURE__ */ jsx27("a", { ref, ...anchorProps, children: renderContent(children) });
});
Hyperlink.displayName = "Hyperlink";
var Hyperlink_default = Hyperlink;

// src/components/molecules/List/index.tsx
import React26 from "react";

// src/components/molecules/List/List.config.ts
var LIST_DEFAULTS = {
  divided: true,
  bordered: false,
  size: "md"
};

// src/components/molecules/List/index.tsx
import { jsx as jsx28, jsxs as jsxs24 } from "react/jsx-runtime";
function cls17(...parts) {
  return parts.filter(Boolean).join(" ");
}
var List = React26.forwardRef(function List2({
  children,
  divided = LIST_DEFAULTS.divided,
  bordered = LIST_DEFAULTS.bordered,
  size = LIST_DEFAULTS.size,
  ordered = false,
  className,
  ...rest
}, ref) {
  const Tag2 = ordered ? "ol" : "ul";
  return /* @__PURE__ */ jsx28(
    Tag2,
    {
      ref,
      className: cls17("ds-list", className),
      "data-divided": divided ? "true" : "false",
      "data-bordered": bordered ? "true" : "false",
      "data-size": size,
      ...rest,
      children
    }
  );
});
var ListItem = React26.forwardRef(function ListItem2({
  leading,
  title,
  href,
  target,
  badge,
  description,
  meta,
  action,
  selected = false,
  disabled = false,
  className,
  ...rest
}, ref) {
  const titleNode = href && !disabled && isSafeHref(href) ? /* @__PURE__ */ jsx28(
    "a",
    {
      className: "ds-list-item__link",
      href,
      target,
      rel: target === "_blank" ? "noopener noreferrer" : void 0,
      children: title
    }
  ) : title;
  return /* @__PURE__ */ jsxs24(
    "li",
    {
      ref,
      className: cls17("ds-list-item", className),
      "data-selected": selected ? "true" : void 0,
      "data-disabled": disabled ? "true" : void 0,
      "aria-current": selected ? "true" : void 0,
      "aria-disabled": disabled ? "true" : void 0,
      ...rest,
      children: [
        leading ? /* @__PURE__ */ jsx28("span", { className: "ds-list-item__leading", children: leading }) : null,
        /* @__PURE__ */ jsxs24("div", { className: "ds-list-item__body", children: [
          /* @__PURE__ */ jsxs24("div", { className: "ds-list-item__heading", children: [
            /* @__PURE__ */ jsx28("span", { className: "ds-list-item__title", children: titleNode }),
            badge
          ] }),
          description ? /* @__PURE__ */ jsx28("p", { className: "ds-list-item__description", children: description }) : null
        ] }),
        meta || action ? /* @__PURE__ */ jsxs24("div", { className: "ds-list-item__trail", children: [
          meta ? /* @__PURE__ */ jsx28("span", { className: "ds-list-item__meta", children: meta }) : null,
          action
        ] }) : null
      ]
    }
  );
});
List.displayName = "List";
ListItem.displayName = "ListItem";

// src/components/molecules/CodeBlock/index.tsx
import React27, { useCallback as useCallback16, useEffect as useEffect11, useMemo as useMemo13, useRef as useRef16, useState as useState20 } from "react";

// src/components/molecules/CodeBlock/CodeBlock.config.ts
var CODE_BLOCK_DEFAULTS = {
  tone: "dark",
  showCopy: true,
  copyLabel: "Copy code",
  copiedLabel: "Copied",
  /** How long the "Copied" state stays visible (ms). */
  copiedResetMs: 2e3
};

// src/components/molecules/CodeBlock/CodeBlock.utils.ts
async function copyText(text) {
  var _a;
  try {
    if (typeof navigator !== "undefined" && ((_a = navigator.clipboard) == null ? void 0 : _a.writeText)) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {
  }
  if (typeof document === "undefined")
    return false;
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (e) {
    ok = false;
  }
  document.body.removeChild(area);
  return ok;
}
function normalizeCode(code) {
  return code.replace(/^\s*\n/, "").replace(/\n\s*$/, "");
}

// src/components/molecules/CodeBlock/index.tsx
import { jsx as jsx29, jsxs as jsxs25 } from "react/jsx-runtime";
function CopyIcon({ copied }) {
  return copied ? /* @__PURE__ */ jsx29("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx29("path", { d: "m3.5 8.5 3 3 6-7", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) }) : /* @__PURE__ */ jsxs25("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, focusable: "false", children: [
    /* @__PURE__ */ jsx29("rect", { x: "5.5", y: "5.5", width: "8", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1.4" }),
    /* @__PURE__ */ jsx29("path", { d: "M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5", stroke: "currentColor", strokeWidth: "1.4" })
  ] });
}
var CodeBlock = React27.forwardRef(function CodeBlock2({
  code,
  language,
  title,
  tone = CODE_BLOCK_DEFAULTS.tone,
  showCopy = CODE_BLOCK_DEFAULTS.showCopy,
  copyLabel = CODE_BLOCK_DEFAULTS.copyLabel,
  copiedLabel = CODE_BLOCK_DEFAULTS.copiedLabel,
  onCopy,
  showLineNumbers = false,
  wrap = false,
  maxHeight,
  className,
  ...rest
}, ref) {
  const text = useMemo13(() => normalizeCode(code), [code]);
  const [copied, setCopied] = useState20(false);
  const timer = useRef16(null);
  useEffect11(
    () => () => {
      if (timer.current)
        clearTimeout(timer.current);
    },
    []
  );
  const handleCopy = useCallback16(async () => {
    const ok = await copyText(text);
    if (!ok)
      return;
    setCopied(true);
    onCopy == null ? void 0 : onCopy(text);
    if (timer.current)
      clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), CODE_BLOCK_DEFAULTS.copiedResetMs);
  }, [text, onCopy]);
  const hasHeader = Boolean(title || language);
  const copyButton = showCopy ? /* @__PURE__ */ jsxs25(
    "button",
    {
      type: "button",
      className: ["ds-code__copy", hasHeader ? "" : "ds-code__floating-copy"].filter(Boolean).join(" "),
      "aria-label": copied ? copiedLabel : copyLabel,
      "data-copied": copied ? "true" : void 0,
      onClick: handleCopy,
      children: [
        /* @__PURE__ */ jsx29(CopyIcon, { copied }),
        hasHeader ? /* @__PURE__ */ jsx29("span", { "aria-hidden": true, children: copied ? copiedLabel : "Copy" }) : null
      ]
    }
  ) : null;
  const lines = showLineNumbers ? text.split("\n") : null;
  const resolvedMaxHeight = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
  return /* @__PURE__ */ jsxs25(
    "div",
    {
      ref,
      className: ["ds-code", className].filter(Boolean).join(" "),
      "data-tone": tone,
      "data-wrap": wrap ? "true" : void 0,
      "data-floating-copy": !hasHeader && showCopy ? "true" : void 0,
      ...rest,
      children: [
        hasHeader ? /* @__PURE__ */ jsxs25("div", { className: "ds-code__header", children: [
          /* @__PURE__ */ jsx29("span", { className: "ds-code__title", children: title }),
          language ? /* @__PURE__ */ jsx29("span", { className: "ds-code__lang", children: language }) : null,
          copyButton
        ] }) : null,
        /* @__PURE__ */ jsxs25("div", { className: "ds-code__body", children: [
          /* @__PURE__ */ jsx29(
            "pre",
            {
              className: "ds-code__pre",
              tabIndex: 0,
              style: resolvedMaxHeight ? { maxHeight: resolvedMaxHeight } : void 0,
              "aria-label": typeof title === "string" ? title : language ? `${language} code` : "Code",
              children: /* @__PURE__ */ jsx29("code", { children: lines ? lines.map((line, i) => /* @__PURE__ */ jsxs25("span", { className: "ds-code__line", children: [
                /* @__PURE__ */ jsx29("span", { className: "ds-code__ln", "aria-hidden": true, children: i + 1 }),
                line || " "
              ] }, i)) : text })
            }
          ),
          !hasHeader ? copyButton : null
        ] }),
        /* @__PURE__ */ jsx29("span", { className: "ds-code__status", role: "status", "aria-live": "polite", children: copied ? copiedLabel : "" })
      ]
    }
  );
});
CodeBlock.displayName = "CodeBlock";
var CodeBlock_default = CodeBlock;

// src/components/molecules/Toast/index.tsx
import React28, { createContext as createContext8, useCallback as useCallback17, useContext as useContext9, useEffect as useEffect12, useMemo as useMemo14, useRef as useRef17, useState as useState21 } from "react";
import { createPortal as createPortal5 } from "react-dom";

// src/components/molecules/Toast/Toast.config.ts
var TOAST_DEFAULTS = {
  position: "bottom-right",
  max: 3,
  duration: 5e3,
  dismissible: true,
  variant: "info",
  label: "Notifications",
  dismissLabel: "Dismiss"
};
var TOAST_HOTKEY = "F8";
var TOAST_EXIT_MS = 200;

// src/components/molecules/Toast/Toast.utils.ts
function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function")
    return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function isDocumentHidden() {
  return typeof document !== "undefined" && document.visibilityState === "hidden";
}
var counter = 0;
function nextToastId() {
  counter += 1;
  return `toast-${counter}`;
}

// src/components/molecules/Toast/index.tsx
import { jsx as jsx30, jsxs as jsxs26 } from "react/jsx-runtime";
var Toast = React28.forwardRef(function Toast2({
  title,
  description,
  variant = TOAST_DEFAULTS.variant,
  action,
  dismissible = TOAST_DEFAULTS.dismissible,
  onDismiss,
  dismissLabel = TOAST_DEFAULTS.dismissLabel,
  srPrefix = true,
  className,
  style,
  ...rest
}, ref) {
  const live = variant === "danger" ? { role: "alert", "aria-atomic": "true" } : {};
  return /* @__PURE__ */ jsxs26(
    "div",
    {
      ref,
      className: ["ds-toast", className].filter(Boolean).join(" "),
      "data-variant": variant,
      style: { ...getToneStyle(variant), ...style },
      ...live,
      ...rest,
      children: [
        /* @__PURE__ */ jsx30("span", { className: "ds-toast__icon", "aria-hidden": "true", children: getAlertIcon(variant) }),
        /* @__PURE__ */ jsxs26("div", { className: "ds-toast__body", children: [
          /* @__PURE__ */ jsxs26("p", { className: "ds-toast__title", children: [
            srPrefix ? /* @__PURE__ */ jsxs26("span", { className: "ds-alert__sr", children: [
              ALERT_SR_PREFIX[variant],
              " "
            ] }) : null,
            title
          ] }),
          description ? /* @__PURE__ */ jsx30("div", { className: "ds-toast__description", children: description }) : null,
          action ? /* @__PURE__ */ jsx30("div", { className: "ds-toast__action", children: /* @__PURE__ */ jsx30(Button_default, { size: "sm", variant: "outlineSecondary", onClick: action.onClick, children: action.label }) }) : null
        ] }),
        dismissible && onDismiss ? /* @__PURE__ */ jsx30("button", { type: "button", className: "ds-toast__dismiss", "aria-label": dismissLabel, onClick: onDismiss, children: getCloseIcon() }) : null
      ]
    }
  );
});
Toast.displayName = "Toast";
var ToastContext = createContext8(null);
function useToast() {
  const ctx = useContext9(ToastContext);
  if (!ctx)
    throw new Error("useToast must be used within a <ToastProvider>.");
  return ctx;
}
function ToastItem({ record, defaultDuration, documentHidden, dismissLabel, onClose }) {
  var _a;
  const { id, title, description, variant, action, dismissible = TOAST_DEFAULTS.dismissible, closing } = record;
  const [hovered, setHovered] = useState21(false);
  const [focusWithin, setFocusWithin] = useState21(false);
  const remaining = useRef17((_a = record.duration) != null ? _a : action ? Infinity : defaultDuration);
  const paused = hovered || focusWithin || documentHidden || closing;
  useEffect12(() => {
    if (paused || !Number.isFinite(remaining.current))
      return void 0;
    const startedAt = Date.now();
    const timer = setTimeout(() => onClose(id), Math.max(0, remaining.current));
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - startedAt;
    };
  }, [paused, id, onClose]);
  const close = useCallback17(() => onClose(id), [id, onClose]);
  return /* @__PURE__ */ jsx30(
    Toast,
    {
      title,
      description,
      variant,
      dismissible,
      dismissLabel,
      onDismiss: close,
      action: action ? { label: action.label, onClick: () => {
        action.onClick();
        close();
      } } : void 0,
      tabIndex: 0,
      "data-toast-id": id,
      "data-state": closing ? "closed" : "open",
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocusWithin(true),
      onBlur: (e) => {
        if (!e.currentTarget.contains(e.relatedTarget))
          setFocusWithin(false);
      },
      onKeyDown: (e) => {
        if (e.key === "Escape" && dismissible) {
          e.stopPropagation();
          close();
        }
      }
    }
  );
}
function ToastProvider({
  children,
  position = TOAST_DEFAULTS.position,
  max = TOAST_DEFAULTS.max,
  duration = TOAST_DEFAULTS.duration,
  label = TOAST_DEFAULTS.label,
  dismissLabel = TOAST_DEFAULTS.dismissLabel
}) {
  const [records, setRecords] = useState21([]);
  const [mounted, setMounted] = useState21(false);
  const [documentHidden, setDocumentHidden] = useState21(false);
  const regionRef = useRef17(null);
  const restoreFocusRef = useRef17(null);
  const exitTimers = useRef17(/* @__PURE__ */ new Map());
  useEffect12(() => {
    setMounted(true);
    setDocumentHidden(isDocumentHidden());
    const onVisibility = () => setDocumentHidden(isDocumentHidden());
    document.addEventListener("visibilitychange", onVisibility);
    const timers = exitTimers.current;
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);
  const remove = useCallback17((id) => {
    exitTimers.current.delete(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);
  const moveFocusFrom = useCallback17((id) => {
    var _a;
    const region = regionRef.current;
    if (!region || typeof document === "undefined")
      return;
    const items = Array.from(region.querySelectorAll("[data-toast-id]")).filter(
      (el2) => el2.dataset.state !== "closed" || el2.dataset.toastId === id
    );
    const index = items.findIndex((el2) => el2.dataset.toastId === id);
    const el = items[index];
    if (!el || !el.contains(document.activeElement))
      return;
    const next = (_a = items[index + 1]) != null ? _a : items[index - 1];
    if (next) {
      next.focus();
      return;
    }
    const restore = restoreFocusRef.current;
    if (restore && restore !== document.body && document.contains(restore)) {
      restore.focus();
      if (document.activeElement === restore)
        return;
    }
    region.focus();
  }, []);
  const close = useCallback17(
    (id) => {
      moveFocusFrom(id);
      setRecords((prev) => prev.map((r) => r.id === id && !r.closing ? { ...r, closing: true } : r));
      if (exitTimers.current.has(id))
        return;
      if (prefersReducedMotion()) {
        remove(id);
      } else {
        exitTimers.current.set(id, setTimeout(() => remove(id), TOAST_EXIT_MS));
      }
    },
    [moveFocusFrom, remove]
  );
  const toast = useCallback17((options) => {
    var _a;
    const id = (_a = options.id) != null ? _a : nextToastId();
    const pending = exitTimers.current.get(id);
    if (pending) {
      clearTimeout(pending);
      exitTimers.current.delete(id);
    }
    setRecords((prev) => {
      const existing = prev.find((r) => r.id === id);
      if (existing) {
        return prev.map((r) => r.id === id ? { ...options, id, version: r.version + 1, closing: false } : r);
      }
      return [...prev, { ...options, id, version: 0, closing: false }];
    });
    return id;
  }, []);
  const recordsRef = useRef17(records);
  recordsRef.current = records;
  const dismissAll = useCallback17(() => {
    recordsRef.current.forEach((r) => {
      if (!r.closing)
        close(r.id);
    });
  }, [close]);
  const value = useMemo14(() => ({ toast, dismiss: close, dismissAll }), [toast, close, dismissAll]);
  const hasToasts = records.length > 0;
  useEffect12(() => {
    if (!hasToasts)
      return void 0;
    const onKeyDown = (e) => {
      if (e.key !== TOAST_HOTKEY || !regionRef.current)
        return;
      e.preventDefault();
      const active2 = document.activeElement;
      if (active2 && !regionRef.current.contains(active2))
        restoreFocusRef.current = active2;
      regionRef.current.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [hasToasts]);
  const visible = records.slice(0, Math.max(1, max));
  return /* @__PURE__ */ jsxs26(ToastContext.Provider, { value, children: [
    children,
    mounted ? createPortal5(
      /* @__PURE__ */ jsx30(
        "section",
        {
          ref: regionRef,
          className: "ds-toast-region",
          "aria-label": label,
          "aria-live": "polite",
          "aria-relevant": "additions",
          "data-overlay-allow": "",
          tabIndex: -1,
          onFocus: (e) => {
            const from = e.relatedTarget;
            if (from && !e.currentTarget.contains(from))
              restoreFocusRef.current = from;
          },
          "data-position": position,
          "data-empty": hasToasts ? void 0 : "true",
          children: visible.map((record) => /* @__PURE__ */ jsx30(
            ToastItem,
            {
              record,
              defaultDuration: duration,
              documentHidden,
              dismissLabel,
              onClose: close
            },
            `${record.id}-${record.version}`
          ))
        }
      ),
      document.body
    ) : null
  ] });
}
ToastProvider.displayName = "ToastProvider";
var Toast_default = Toast;

// src/components/molecules/Drawer/index.tsx
import React29, { useCallback as useCallback18, useContext as useContext10, useEffect as useEffect13, useId as useId14, useRef as useRef18, useState as useState22 } from "react";
import { createPortal as createPortal6 } from "react-dom";

// src/components/molecules/Drawer/Drawer.config.ts
var DRAWER_DEFAULTS = {
  side: "right",
  size: "md",
  showCloseButton: true,
  closeLabel: "Close",
  closeOnBackdropClick: true,
  closeOnEscape: true,
  modal: true,
  returnFocus: true
};
var DRAWER_WIDTHS = {
  sm: "20rem",
  md: "25rem",
  lg: "35rem",
  xl: "50rem",
  full: "100vw"
};
var DRAWER_HEIGHTS = {
  sm: "15rem",
  md: "22.5rem",
  lg: "30rem",
  xl: "40rem",
  full: "100dvh"
};
var DRAWER_EXIT_FALLBACK_MS = 320;
var BOTTOM_SHEET_DEFAULTS = {
  handleLabel: "Resize sheet",
  defaultSnap: 0
};
var SHEET_DRAG_SLOP_PX = 6;
var SHEET_DISMISS_DISTANCE_RATIO = 0.25;
var SHEET_DISMISS_VELOCITY = 0.5;
var SHEET_FLICK_MIN_PX = 24;

// src/components/molecules/Drawer/Drawer.utils.ts
var FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable='false'])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");
function getFocusable(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.closest("[hidden], [inert], [aria-hidden='true']")
  );
}
function trapTabKey(e, container) {
  if (e.key !== "Tab")
    return false;
  const focusable = getFocusable(container);
  if (focusable.length === 0) {
    e.preventDefault();
    container.focus();
    return true;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active2 = document.activeElement;
  const inside = active2 instanceof Node && container.contains(active2);
  if (e.shiftKey && (active2 === first || active2 === container || !inside)) {
    e.preventDefault();
    last.focus();
    return true;
  }
  if (!e.shiftKey && (active2 === last || !inside)) {
    e.preventDefault();
    first.focus();
    return true;
  }
  return false;
}
function resolveSnapPx(point, viewportHeight, rootFontSize = 16) {
  var _a;
  const match = /^\s*(-?\d*\.?\d+)\s*(%|px|rem|em|[dsl]?vh)?\s*$/.exec(point);
  if (!match)
    return Number.NaN;
  const n = Number(match[1]);
  const unit = (_a = match[2]) != null ? _a : "px";
  if (unit === "%" || unit.endsWith("vh"))
    return n / 100 * viewportHeight;
  if (unit === "rem" || unit === "em")
    return n * rootFontSize;
  return n;
}
function nearestSnapIndex(height, snapPx) {
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  snapPx.forEach((px, i) => {
    if (Number.isNaN(px))
      return;
    const d = Math.abs(px - height);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

// src/components/molecules/Drawer/index.tsx
import { jsx as jsx31, jsxs as jsxs27 } from "react/jsx-runtime";
function CloseGlyph() {
  return /* @__PURE__ */ jsx31("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx31(
    "path",
    {
      d: "M4 4l8 8M12 4l-8 8",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.75",
      strokeLinecap: "round"
    }
  ) });
}
var Drawer = React29.forwardRef(function Drawer2({
  open,
  onOpenChange,
  side = DRAWER_DEFAULTS.side,
  size = DRAWER_DEFAULTS.size,
  title,
  description,
  headerActions,
  onBeforeClose,
  bodyScroll = true,
  bodyClassName,
  children,
  footer,
  showCloseButton = DRAWER_DEFAULTS.showCloseButton,
  closeLabel = DRAWER_DEFAULTS.closeLabel,
  closeOnBackdropClick = DRAWER_DEFAULTS.closeOnBackdropClick,
  closeOnEscape = DRAWER_DEFAULTS.closeOnEscape,
  modal = DRAWER_DEFAULTS.modal,
  initialFocusRef,
  returnFocus = DRAWER_DEFAULTS.returnFocus,
  className,
  id,
  handle = false,
  handleLabel = BOTTOM_SHEET_DEFAULTS.handleLabel,
  swipeToDismiss,
  snapPoints,
  defaultSnap = BOTTOM_SHEET_DEFAULTS.defaultSnap,
  snap: snapProp,
  onSnapChange
}, forwardedRef) {
  const autoId = useId14();
  const layerId = `drawer-${autoId}`;
  const parentLayerId = useContext10(OverlayLayerContext);
  const baseId = id != null ? id : `ds-drawer-${autoId.replace(/:/g, "")}`;
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const panelRef = useRef18(null);
  const bodyRef = useRef18(null);
  const lastFocusedRef = useRef18(null);
  const ownedFocusTargetRef = useRef18(null);
  const onOpenChangeRef = useRef18(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  const returnFocusRef = useRef18(returnFocus);
  returnFocusRef.current = returnFocus;
  const initialFocusRefRef = useRef18(initialFocusRef);
  initialFocusRefRef.current = initialFocusRef;
  const [present, setPresent] = useState22(open);
  if (open && !present)
    setPresent(true);
  const [bodyScrollable, setBodyScrollable] = useState22(false);
  const isSheet = side === "bottom";
  const snapList = isSheet && snapPoints && snapPoints.length > 0 ? snapPoints : null;
  const showHandle = isSheet && handle;
  const canSwipe = showHandle && (swipeToDismiss != null ? swipeToDismiss : handle);
  const clampSnap = (i) => snapList ? Math.min(Math.max(0, Math.round(i)), snapList.length - 1) : 0;
  const [innerSnap, setInnerSnap] = useState22(() => clampSnap(defaultSnap));
  const [prevOpen, setPrevOpen] = useState22(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open)
      setInnerSnap(clampSnap(defaultSnap));
  }
  const snapIndex = clampSnap(snapProp != null ? snapProp : innerSnap);
  const [snapAnnouncement, setSnapAnnouncement] = useState22("");
  const dragRef = useRef18(null);
  const suppressHandleClickRef = useRef18(false);
  const setPanelRef = useCallback18(
    (node) => {
      panelRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  const onBeforeCloseRef = useRef18(onBeforeClose);
  onBeforeCloseRef.current = onBeforeClose;
  const guardPendingRef = useRef18(false);
  const openRef = useRef18(open);
  openRef.current = open;
  const requestClose = useCallback18(() => {
    runGuardedClose(
      onBeforeCloseRef.current,
      () => onOpenChangeRef.current(false),
      guardPendingRef,
      () => openRef.current
    );
  }, []);
  useEffect13(() => {
    if (open || !present)
      return void 0;
    const panel = panelRef.current;
    const animationName = panel && typeof window !== "undefined" ? window.getComputedStyle(panel).animationName : "";
    if (!animationName || animationName === "none") {
      setPresent(false);
      return void 0;
    }
    const timer = setTimeout(() => setPresent(false), DRAWER_EXIT_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [open, present]);
  useEffect13(() => {
    if (!open)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [open, layerId, parentLayerId]);
  useEffect13(() => {
    if (!open || !modal)
      return void 0;
    const onFocusIn = (e) => {
      var _a;
      const panel = panelRef.current;
      const target = e.target;
      if (!panel || !(target instanceof Node))
        return;
      if (panel.contains(target)) {
        ownedFocusTargetRef.current = null;
        lastFocusedRef.current = target;
        return;
      }
      const owned = ownedFocusTargetRef.current === target;
      ownedFocusTargetRef.current = null;
      if (owned)
        return;
      if (!isTopLayer(layerId))
        return;
      const allowed = target instanceof Element ? target : target.parentElement;
      if (allowed == null ? void 0 : allowed.closest("[data-overlay-allow]"))
        return;
      const fallback = lastFocusedRef.current && panel.contains(lastFocusedRef.current) ? lastFocusedRef.current : (_a = getFocusable(panel)[0]) != null ? _a : panel;
      fallback.focus({ preventScroll: true });
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [open, modal, layerId]);
  useEffect13(() => {
    var _a, _b, _c;
    if (!open)
      return void 0;
    const previous = typeof document !== "undefined" ? document.activeElement : null;
    const panel = panelRef.current;
    if (panel) {
      panel.style.translate = "";
      const target = (_c = (_b = (_a = initialFocusRefRef.current) == null ? void 0 : _a.current) != null ? _b : getFocusable(panel).find((el) => !el.hasAttribute("data-drawer-handle"))) != null ? _c : panel;
      target.focus({ preventScroll: true });
    }
    return () => {
      if (returnFocusRef.current && previous && previous !== document.body && previous.isConnected && typeof previous.focus === "function") {
        previous.focus({ preventScroll: true });
      }
    };
  }, [open]);
  useEffect13(() => {
    if (!open || !modal)
      return void 0;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [open, modal]);
  useEffect13(() => {
    if (!open || !closeOnEscape)
      return void 0;
    const onKeyDown = (e) => {
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing)
        return;
      if (!isTopLayer(layerId))
        return;
      e.preventDefault();
      e.stopPropagation();
      requestClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeOnEscape, requestClose, layerId]);
  useEffect13(() => {
    const body = bodyRef.current;
    if (!present || !body)
      return void 0;
    const measure = () => setBodyScrollable(body.scrollHeight > body.clientHeight + 1);
    measure();
    if (typeof ResizeObserver === "undefined")
      return void 0;
    const observer = new ResizeObserver(measure);
    observer.observe(body);
    Array.from(body.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [present, children]);
  if (!present || typeof document === "undefined")
    return null;
  const state2 = open ? "open" : "closed";
  const extent = snapList ? snapList[snapIndex] : side === "left" || side === "right" ? DRAWER_WIDTHS[size] : DRAWER_HEIGHTS[size];
  const changeSnap = (next) => {
    var _a;
    if (!snapList)
      return;
    const target = clampSnap(next);
    (_a = panelRef.current) == null ? void 0 : _a.style.setProperty("--ds-drawer-extent", snapList[target]);
    if (target === snapIndex)
      return;
    if (snapProp === void 0)
      setInnerSnap(target);
    setSnapAnnouncement(`${handleLabel}: ${snapList[target]}`);
    onSnapChange == null ? void 0 : onSnapChange(target, snapList[target]);
  };
  const resetDragOffset = () => {
    const panel = panelRef.current;
    if (panel)
      panel.style.translate = "";
  };
  const swipeDismiss = () => {
    requestClose();
    setTimeout(() => {
      if (openRef.current)
        resetDragOffset();
    }, DRAWER_EXIT_FALLBACK_MS);
  };
  const handlePointerDown = (e) => {
    var _a, _b;
    if (!open || !canSwipe && !snapList)
      return;
    if (e.pointerType === "mouse" && e.button !== 0)
      return;
    const panel = panelRef.current;
    if (!panel)
      return;
    dragRef.current = {
      pointerId: e.pointerId,
      startY: e.clientY,
      startTime: typeof performance !== "undefined" ? performance.now() : Date.now(),
      startHeight: panel.getBoundingClientRect().height,
      startSnap: snapIndex,
      moved: false
    };
    (_b = (_a = e.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a, e.pointerId);
  };
  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    const panel = panelRef.current;
    if (!drag || !panel || e.pointerId !== drag.pointerId)
      return;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.abs(dy) < SHEET_DRAG_SLOP_PX)
      return;
    drag.moved = true;
    panel.dataset.dragging = "true";
    if (snapList) {
      const vh = window.innerHeight;
      const px = snapList.map((p) => resolveSnapPx(p, vh)).filter((n) => !Number.isNaN(n));
      const minPx = px.length ? Math.min(...px) : drag.startHeight;
      const maxPx = px.length ? Math.max(...px) : drag.startHeight;
      const wanted = drag.startHeight - dy;
      const height = Math.min(Math.max(wanted, minPx), maxPx);
      panel.style.setProperty("--ds-drawer-extent", `${height}px`);
      panel.style.translate = canSwipe && wanted < minPx ? `0 ${minPx - wanted}px` : "";
    } else {
      panel.style.translate = `0 ${Math.max(0, dy)}px`;
    }
  };
  const endDrag = (e, cancelled) => {
    var _a, _b;
    const drag = dragRef.current;
    const panel = panelRef.current;
    if (!drag || e.pointerId !== drag.pointerId)
      return;
    dragRef.current = null;
    if ((_b = (_a = e.currentTarget).hasPointerCapture) == null ? void 0 : _b.call(_a, e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
    if (!panel || !drag.moved)
      return;
    delete panel.dataset.dragging;
    suppressHandleClickRef.current = true;
    const dy = cancelled ? 0 : e.clientY - drag.startY;
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const velocity = dy / Math.max(1, now - drag.startTime);
    const flickDown = dy >= SHEET_FLICK_MIN_PX && velocity > SHEET_DISMISS_VELOCITY;
    const flickUp = -dy >= SHEET_FLICK_MIN_PX && -velocity > SHEET_DISMISS_VELOCITY;
    if (snapList) {
      const vh = window.innerHeight;
      const px = snapList.map((p) => resolveSnapPx(p, vh));
      const valid = px.filter((n) => !Number.isNaN(n));
      const minPx = valid.length ? Math.min(...valid) : drag.startHeight;
      const wanted = drag.startHeight - dy;
      const overshoot = minPx - wanted;
      if (canSwipe && overshoot > 0 && (overshoot > minPx * SHEET_DISMISS_DISTANCE_RATIO || flickDown)) {
        swipeDismiss();
        return;
      }
      let target = nearestSnapIndex(wanted, px);
      if (target === drag.startSnap && flickDown)
        target = drag.startSnap - 1;
      if (target === drag.startSnap && flickUp)
        target = drag.startSnap + 1;
      resetDragOffset();
      changeSnap(target);
      return;
    }
    if (canSwipe && (dy > drag.startHeight * SHEET_DISMISS_DISTANCE_RATIO || flickDown)) {
      swipeDismiss();
      return;
    }
    resetDragOffset();
  };
  const handleHandleClick = () => {
    if (suppressHandleClickRef.current) {
      suppressHandleClickRef.current = false;
      return;
    }
    if (snapList)
      changeSnap((snapIndex + 1) % snapList.length);
  };
  const handleHandleKeyDown = (e) => {
    if (!snapList)
      return;
    const last = snapList.length - 1;
    const next = e.key === "ArrowUp" || e.key === "ArrowRight" ? Math.min(last, snapIndex + 1) : e.key === "ArrowDown" || e.key === "ArrowLeft" ? Math.max(0, snapIndex - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null)
      return;
    e.preventDefault();
    changeSnap(next);
  };
  const gestureHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: (e) => endDrag(e, false),
    onPointerCancel: (e) => endDrag(e, true)
  };
  const handlePanelKeyDown = (e) => {
    if (modal && panelRef.current)
      trapTabKey(e.nativeEvent, panelRef.current);
  };
  const handleAnimationEnd = (e) => {
    if (!open && e.target === e.currentTarget)
      setPresent(false);
  };
  return createPortal6(
    /* @__PURE__ */ jsx31(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs27(
      "div",
      {
        className: "ds-drawer-root",
        "data-modal": modal ? "true" : "false",
        onFocusCapture: (e) => {
          ownedFocusTargetRef.current = e.target;
        },
        children: [
          modal ? /* @__PURE__ */ jsx31(
            "div",
            {
              className: "ds-drawer__backdrop",
              "data-state": state2,
              "aria-hidden": "true",
              onMouseDown: (e) => e.preventDefault(),
              onClick: closeOnBackdropClick && open ? () => {
                if (isTopLayer(layerId))
                  requestClose();
              } : void 0
            }
          ) : null,
          /* @__PURE__ */ jsxs27(
            "div",
            {
              ref: setPanelRef,
              id: baseId,
              role: "dialog",
              "aria-modal": modal ? true : void 0,
              "aria-labelledby": titleId,
              "aria-describedby": description != null ? descriptionId : void 0,
              tabIndex: -1,
              className: ["ds-drawer", className].filter(Boolean).join(" "),
              "data-side": side,
              "data-size": size,
              "data-state": state2,
              "data-handle": showHandle ? "true" : void 0,
              "data-snap": snapList ? snapIndex : void 0,
              style: { "--ds-drawer-extent": extent },
              onKeyDown: handlePanelKeyDown,
              onAnimationEnd: handleAnimationEnd,
              children: [
                showHandle && snapList ? /* @__PURE__ */ jsx31(
                  "button",
                  {
                    type: "button",
                    className: "ds-drawer__handle",
                    "data-drawer-handle": "",
                    "aria-label": handleLabel,
                    "aria-keyshortcuts": "ArrowUp ArrowDown Home End",
                    onClick: handleHandleClick,
                    onKeyDown: handleHandleKeyDown,
                    ...gestureHandlers,
                    children: /* @__PURE__ */ jsx31("span", { className: "ds-drawer__handle-bar", "aria-hidden": "true" })
                  }
                ) : showHandle ? (
                  // Pointer-only grip (swipe-to-dismiss); keyboard users close with the X button or Escape.
                  /* @__PURE__ */ jsx31("div", { className: "ds-drawer__handle", "data-drawer-handle": "", "aria-hidden": "true", ...gestureHandlers, children: /* @__PURE__ */ jsx31("span", { className: "ds-drawer__handle-bar" }) })
                ) : null,
                showHandle && snapList ? /* @__PURE__ */ jsx31("span", { className: "ds-drawer__sr", role: "status", "aria-live": "polite", "aria-atomic": "true", children: snapAnnouncement }) : null,
                /* @__PURE__ */ jsxs27("div", { className: "ds-drawer__header", children: [
                  /* @__PURE__ */ jsxs27("div", { className: "ds-drawer__heading", children: [
                    /* @__PURE__ */ jsx31("h2", { id: titleId, className: "ds-drawer__title", children: title }),
                    description != null ? /* @__PURE__ */ jsx31("div", { id: descriptionId, className: "ds-drawer__description", children: description }) : null
                  ] }),
                  headerActions != null && headerActions !== false ? /* @__PURE__ */ jsx31("div", { className: "ds-drawer__header-actions", children: headerActions }) : null,
                  showCloseButton ? /* @__PURE__ */ jsx31(
                    "button",
                    {
                      type: "button",
                      className: "ds-drawer__close",
                      "aria-label": closeLabel,
                      onClick: requestClose,
                      children: /* @__PURE__ */ jsx31(CloseGlyph, {})
                    }
                  ) : null
                ] }),
                /* @__PURE__ */ jsx31(
                  "div",
                  {
                    ref: bodyRef,
                    className: ["ds-drawer__body", bodyClassName].filter(Boolean).join(" "),
                    tabIndex: bodyScroll && bodyScrollable ? 0 : void 0,
                    "data-scrollable": bodyScroll && bodyScrollable ? "true" : void 0,
                    "data-body-scroll": bodyScroll ? void 0 : "false",
                    children
                  }
                ),
                footer != null ? /* @__PURE__ */ jsx31("div", { className: "ds-drawer__footer", children: footer }) : null
              ]
            }
          )
        ]
      }
    ) }),
    document.body
  );
});
Drawer.displayName = "Drawer";
var Sheet = Drawer;
var BottomSheet = React29.forwardRef(function BottomSheet2({ handle = true, ...props }, ref) {
  return /* @__PURE__ */ jsx31(Drawer, { ...props, handle, side: "bottom", ref });
});
BottomSheet.displayName = "BottomSheet";
var Drawer_default = Drawer;

// src/components/molecules/TagInput/index.tsx
import React30, { useCallback as useCallback19, useId as useId15, useMemo as useMemo15, useRef as useRef19, useState as useState23 } from "react";

// src/components/molecules/TagInput/TagInput.config.ts
var TAG_INPUT_DEFAULTS = {
  size: "md",
  allowDuplicates: false,
  addOnBlur: false,
  delimiters: [","]
};
var TAG_INPUT_CHIP_SIZE = {
  sm: "sm",
  md: "sm",
  lg: "md"
};
var TAG_INPUT_LABELS = {
  remove: (tag) => `Remove ${tag}`,
  added: (tag) => `Added ${tag}`,
  removed: (tag) => `Removed ${tag}`,
  duplicate: (tag) => `"${tag}" is already added`,
  maxReached: (max) => `You can add up to ${max} tags`,
  list: "Selected tags",
  suggestions: "Suggestions"
};
var TAG_INPUT_PASTE_SEPARATORS = ["\n", "\r", "	"];

// src/components/molecules/TagInput/TagInput.utils.ts
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&");
}
function splitTags(text, separators) {
  const seps = separators.filter((s) => s.length > 0);
  if (seps.length === 0)
    return text.trim() ? [text.trim()] : [];
  const re = new RegExp(seps.map(escapeRegExp).join("|"), "g");
  return text.split(re).map((p) => p.trim()).filter(Boolean);
}
function containsSeparator(text, separators) {
  return separators.some((s) => s.length > 0 && text.includes(s));
}
function filterSuggestions(suggestions, query, tags, allowDuplicates) {
  const q = query.trim().toLowerCase();
  if (!q)
    return [];
  return suggestions.filter(
    (s) => s.toLowerCase().includes(q) && (allowDuplicates || !tags.includes(s))
  );
}
function splitPending(text, separators) {
  var _a;
  const seps = separators.filter((s) => s.length > 0);
  if (seps.length === 0)
    return { complete: [], tail: text };
  const pieces = text.split(new RegExp(seps.map(escapeRegExp).join("|"), "g"));
  const tail = ((_a = pieces.pop()) != null ? _a : "").trimStart();
  return { complete: pieces.map((p) => p.trim()).filter(Boolean), tail };
}

// src/components/molecules/TagInput/index.tsx
import { jsx as jsx32, jsxs as jsxs28 } from "react/jsx-runtime";
function hasContent(node) {
  return node !== void 0 && node !== null && node !== false && node !== true && node !== "";
}
var TagInput = React30.forwardRef(function TagInput2({
  value: valueProp,
  defaultValue,
  onChange,
  onInputChange,
  maxTags,
  allowDuplicates = TAG_INPUT_DEFAULTS.allowDuplicates,
  validate,
  suggestions,
  delimiters = TAG_INPUT_DEFAULTS.delimiters,
  addOnBlur = TAG_INPUT_DEFAULTS.addOnBlur,
  placeholder,
  disabled = false,
  readOnly = false,
  size = TAG_INPUT_DEFAULTS.size,
  label,
  error,
  required: requiredProp,
  name,
  id: idProp,
  labels: labelsProp,
  className,
  ...rest
}, ref) {
  var _a;
  const {
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    "aria-required": ariaRequiredProp,
    "aria-label": ariaLabelProp,
    "aria-labelledby": ariaLabelledByProp,
    ...rootRest
  } = rest;
  const labels = useMemo15(() => ({ ...TAG_INPUT_LABELS, ...labelsProp }), [labelsProp]);
  const field = useFormField();
  const reactId = useId15().replace(/:/g, "");
  const inputId = (_a = idProp != null ? idProp : field == null ? void 0 : field.id) != null ? _a : `ds-tag-input-${reactId}`;
  const labelId = `ds-tag-input-${reactId}-label`;
  const messageId = `ds-tag-input-${reactId}-message`;
  const listboxId = `ds-tag-input-${reactId}-listbox`;
  const optionId = (i) => `ds-tag-input-${reactId}-option-${i}`;
  const isControlled = valueProp !== void 0;
  const [innerTags, setInnerTags] = useState23(() => defaultValue != null ? defaultValue : []);
  const tags = isControlled ? valueProp : innerTags;
  const tagsRef = useRef19(tags);
  tagsRef.current = tags;
  const [text, setText] = useState23("");
  const [message, setMessage] = useState23(null);
  const [announcement, setAnnouncement] = useState23("");
  const [listOpen, setListOpen] = useState23(false);
  const [activeIndex, setActiveIndex] = useState23(-1);
  const inputRef = useRef19(null);
  const listRef = useRef19(null);
  const interactive = !disabled && !readOnly;
  const atLimit = maxTags !== void 0 && tags.length >= maxTags;
  const hasSuggestions = suggestions !== void 0;
  const filtered = useMemo15(
    () => hasSuggestions ? filterSuggestions(suggestions != null ? suggestions : [], text, tags, allowDuplicates) : [],
    [hasSuggestions, suggestions, text, tags, allowDuplicates]
  );
  const showList = hasSuggestions && listOpen && interactive && filtered.length > 0;
  const announce = useCallback19((msg) => setAnnouncement(msg), []);
  const commit = useCallback19(
    (next) => {
      if (!isControlled)
        setInnerTags(next);
      tagsRef.current = next;
      onChange == null ? void 0 : onChange(next);
    },
    [isControlled, onChange]
  );
  const addTags = useCallback19(
    (candidates) => {
      let next = [...tagsRef.current];
      const rejected = [];
      const added = [];
      let firstError = null;
      for (const raw of candidates) {
        const tag = raw.trim();
        if (!tag)
          continue;
        let reason = null;
        if (maxTags !== void 0 && next.length >= maxTags)
          reason = labels.maxReached(maxTags);
        else if (!allowDuplicates && next.includes(tag))
          reason = labels.duplicate(tag);
        else if (validate) {
          const result = validate(tag, next);
          if (result !== true)
            reason = result;
        }
        if (reason !== null) {
          rejected.push(tag);
          if (firstError === null)
            firstError = reason;
        } else {
          next = [...next, tag];
          added.push(tag);
        }
      }
      if (added.length > 0) {
        commit(next);
        announce(added.map(labels.added).join(", "));
      }
      setMessage(firstError);
      return { rejected, error: firstError };
    },
    [allowDuplicates, announce, commit, labels, maxTags, validate]
  );
  const removeAt = useCallback19(
    (index) => {
      const current = tagsRef.current;
      const tag = current[index];
      if (tag === void 0)
        return;
      commit(current.filter((_, i) => i !== index));
      setMessage(null);
      announce(labels.removed(tag));
    },
    [announce, commit, labels]
  );
  const updateText = (next) => {
    setText(next);
    onInputChange == null ? void 0 : onInputChange(next);
  };
  const commitText = (raw) => {
    const parts = splitTags(raw, [...delimiters, ...TAG_INPUT_PASTE_SEPARATORS]);
    if (parts.length === 0) {
      updateText("");
      return;
    }
    const { rejected } = addTags(parts);
    updateText(rejected.join(delimiters[0] ? `${delimiters[0]} ` : " "));
  };
  const focusChip = (index) => {
    var _a2, _b;
    const items = (_a2 = listRef.current) == null ? void 0 : _a2.querySelectorAll("[data-tag-index]");
    const target = (_b = items == null ? void 0 : items[index]) == null ? void 0 : _b.querySelector("button");
    target == null ? void 0 : target.focus();
  };
  const handleChange = (e) => {
    const next = e.target.value;
    if (containsSeparator(next, delimiters)) {
      const { complete, tail } = splitPending(next, delimiters);
      const { rejected } = addTags(complete);
      const remaining = [...rejected, tail.trimStart()].filter(Boolean);
      updateText(remaining.join(delimiters[0] ? `${delimiters[0]} ` : " "));
    } else {
      updateText(next);
      if (message)
        setMessage(null);
    }
    setListOpen(true);
    setActiveIndex(-1);
  };
  const handlePaste = (e) => {
    var _a2, _b;
    const pasted = e.clipboardData.getData("text");
    if (!containsSeparator(pasted, [...delimiters, ...TAG_INPUT_PASTE_SEPARATORS]))
      return;
    e.preventDefault();
    const el = e.currentTarget;
    const start = (_a2 = el.selectionStart) != null ? _a2 : text.length;
    const end = (_b = el.selectionEnd) != null ? _b : text.length;
    commitText(text.slice(0, start) + pasted + text.slice(end));
    setListOpen(false);
  };
  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing)
      return;
    const el = e.currentTarget;
    switch (e.key) {
      case "ArrowDown":
        if (!hasSuggestions)
          return;
        e.preventDefault();
        setListOpen(true);
        if (filtered.length > 0)
          setActiveIndex((i) => (i + 1) % filtered.length);
        return;
      case "ArrowUp":
        if (!showList)
          return;
        e.preventDefault();
        setActiveIndex((i) => i <= 0 ? filtered.length - 1 : i - 1);
        return;
      case "Enter": {
        if (showList && activeIndex >= 0 && filtered[activeIndex] !== void 0) {
          e.preventDefault();
          const { rejected } = addTags([filtered[activeIndex]]);
          if (rejected.length === 0)
            updateText("");
          setActiveIndex(-1);
          setListOpen(false);
          return;
        }
        if (text.trim()) {
          e.preventDefault();
          commitText(text);
          setListOpen(false);
        }
        return;
      }
      case "Escape":
        if (showList) {
          e.preventDefault();
          e.stopPropagation();
          setListOpen(false);
          setActiveIndex(-1);
        }
        return;
      case "Backspace":
        if (text === "" && tags.length > 0 && interactive) {
          e.preventDefault();
          removeAt(tags.length - 1);
        }
        return;
      case "ArrowLeft":
        if (el.selectionStart === 0 && el.selectionEnd === 0 && tags.length > 0 && !disabled) {
          e.preventDefault();
          focusChip(tags.length - 1);
        }
        return;
      default:
    }
  };
  const handleBlur = () => {
    setListOpen(false);
    setActiveIndex(-1);
    if (addOnBlur && interactive && text.trim())
      commitText(text);
  };
  const handleChipKeyDown = (index) => (e) => {
    var _a2, _b;
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        focusChip(Math.max(0, index - 1));
        return;
      case "ArrowRight":
        e.preventDefault();
        if (index >= tags.length - 1)
          (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
        else
          focusChip(index + 1);
        return;
      case "Home":
        e.preventDefault();
        focusChip(0);
        return;
      case "End":
        e.preventDefault();
        (_b = inputRef.current) == null ? void 0 : _b.focus();
        return;
      case "Backspace":
      case "Delete": {
        if (!interactive)
          return;
        e.preventDefault();
        const remaining = tags.length - 1;
        removeAt(index);
        requestAnimationFrame(() => {
          var _a3;
          if (remaining === 0)
            (_a3 = inputRef.current) == null ? void 0 : _a3.focus();
          else if (e.key === "Backspace" && index > 0)
            focusChip(index - 1);
          else if (index < remaining)
            focusChip(index);
          else
            focusChip(remaining - 1);
        });
        return;
      }
      default:
    }
  };
  const handleRemoveClick = (index) => {
    removeAt(index);
    requestAnimationFrame(() => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    });
  };
  const pickSuggestion = (s) => {
    var _a2;
    const { rejected } = addTags([s]);
    if (rejected.length === 0)
      updateText("");
    setListOpen(false);
    setActiveIndex(-1);
    (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
  };
  const ownMessage = message != null ? message : !field && hasContent(error) && error !== true ? error : null;
  const describedBy = ariaDescribedByProp != null ? ariaDescribedByProp : [field == null ? void 0 : field.describedBy, ownMessage ? messageId : void 0].filter(Boolean).join(" ") || void 0;
  const invalid = ariaInvalidProp != null ? ariaInvalidProp : (field == null ? void 0 : field.invalid) || message !== null || error === true || hasContent(error) ? true : void 0;
  const required = ariaRequiredProp != null ? ariaRequiredProp : requiredProp || (field == null ? void 0 : field.required) ? true : void 0;
  const showOwnLabel = !field && hasContent(label);
  const inputLabelledBy = ariaLabelledByProp != null ? ariaLabelledByProp : showOwnLabel ? labelId : void 0;
  const chipSize = TAG_INPUT_CHIP_SIZE[size];
  const activeOptionId = showList && activeIndex >= 0 ? optionId(activeIndex) : void 0;
  return /* @__PURE__ */ jsxs28(
    "div",
    {
      ref,
      className: ["ds-tag-input", className].filter(Boolean).join(" "),
      "data-size": size,
      "data-disabled": disabled ? "true" : void 0,
      "data-readonly": readOnly ? "true" : void 0,
      "data-invalid": invalid ? "true" : void 0,
      ...rootRest,
      children: [
        showOwnLabel ? /* @__PURE__ */ jsxs28("label", { id: labelId, htmlFor: inputId, className: "ds-tag-input__label", children: [
          label,
          requiredProp ? /* @__PURE__ */ jsx32("span", { className: "ds-tag-input__required", "aria-hidden": "true", children: " *" }) : null
        ] }) : null,
        /* @__PURE__ */ jsxs28(
          "div",
          {
            className: "ds-tag-input__field",
            onMouseDown: (e) => {
              var _a2;
              if (e.target === e.currentTarget && !disabled) {
                e.preventDefault();
                (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
              }
            },
            children: [
              tags.length > 0 ? /* @__PURE__ */ jsx32("ul", { ref: listRef, className: "ds-tag-input__chips", "aria-label": labels.list, children: tags.map((tag, index) => /* @__PURE__ */ jsx32(
                "li",
                {
                  className: "ds-tag-input__chip",
                  "data-tag-index": index,
                  onKeyDown: handleChipKeyDown(index),
                  children: /* @__PURE__ */ jsx32(
                    Badge_default,
                    {
                      variant: "neutral",
                      tone: "soft",
                      shape: "pill",
                      size: chipSize,
                      onDismiss: interactive ? () => handleRemoveClick(index) : void 0,
                      dismissLabel: labels.remove(tag),
                      children: tag
                    }
                  )
                },
                `${tag}-${index}`
              )) }) : null,
              /* @__PURE__ */ jsx32(
                "input",
                {
                  ref: inputRef,
                  id: inputId,
                  type: "text",
                  className: "ds-tag-input__input",
                  value: text,
                  placeholder: atLimit ? void 0 : placeholder,
                  disabled,
                  readOnly,
                  autoComplete: "off",
                  enterKeyHint: "enter",
                  "aria-label": ariaLabelProp,
                  "aria-labelledby": inputLabelledBy,
                  "aria-describedby": describedBy,
                  "aria-invalid": invalid,
                  "aria-required": required,
                  role: hasSuggestions ? "combobox" : void 0,
                  "aria-autocomplete": hasSuggestions ? "list" : void 0,
                  "aria-expanded": hasSuggestions ? showList : void 0,
                  "aria-controls": hasSuggestions ? listboxId : void 0,
                  "aria-activedescendant": activeOptionId,
                  onChange: handleChange,
                  onPaste: handlePaste,
                  onKeyDown: handleKeyDown,
                  onBlur: handleBlur,
                  onFocus: () => setListOpen(true)
                }
              ),
              hasSuggestions ? /* @__PURE__ */ jsx32(
                "ul",
                {
                  id: listboxId,
                  role: "listbox",
                  "aria-label": labels.suggestions,
                  className: "ds-tag-input__listbox",
                  hidden: !showList,
                  children: showList ? filtered.map((s, i) => /* @__PURE__ */ jsx32(
                    "li",
                    {
                      id: optionId(i),
                      role: "option",
                      "aria-selected": i === activeIndex,
                      className: "ds-tag-input__option",
                      "data-active": i === activeIndex ? "true" : void 0,
                      onMouseDown: (e) => e.preventDefault(),
                      onMouseEnter: () => setActiveIndex(i),
                      onClick: () => pickSuggestion(s),
                      children: s
                    },
                    s
                  )) : null
                }
              ) : null
            ]
          }
        ),
        name !== void 0 ? /* @__PURE__ */ jsx32("input", { type: "hidden", name, value: tags.join(",") }) : null,
        ownMessage ? /* @__PURE__ */ jsx32(
          "p",
          {
            id: messageId,
            className: "ds-tag-input__error",
            role: message ? "alert" : void 0,
            children: ownMessage
          }
        ) : null,
        /* @__PURE__ */ jsx32("span", { className: "ds-tag-input__sr", role: "status", "aria-live": "polite", "aria-atomic": "true", children: announcement })
      ]
    }
  );
});
TagInput.displayName = "TagInput";
TagInput[FORM_FIELD_CONSUMER_KEY] = true;
var TagInput_default = TagInput;

// src/components/molecules/TimePicker/index.tsx
import React31, { useCallback as useCallback20, useEffect as useEffect14, useId as useId16, useLayoutEffect as useLayoutEffect4, useMemo as useMemo16, useRef as useRef20, useState as useState24 } from "react";

// src/components/molecules/TimePicker/TimePicker.config.ts
var TIME_PICKER_DEFAULTS = {
  step: 15,
  size: "md",
  clearable: false
};
var TIME_PICKER_LABELS = {
  toggle: "Show times",
  clear: "Clear time",
  listbox: "Times",
  invalid: "Enter a valid time",
  unavailable: "That time is not available"
};
var MINUTES_PER_DAY = 1440;

// src/components/molecules/TimePicker/TimePicker.utils.ts
var pad = (n) => String(n).padStart(2, "0");
function toHHmm(minutes) {
  const m = (minutes % MINUTES_PER_DAY + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
}
function fromHHmm(value) {
  if (!value)
    return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match)
    return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 23 || m > 59)
    return null;
  return h * 60 + m;
}
function normaliseSpaces(s) {
  return s.replace(/[  ]/g, " ");
}
function localeFormat(locale) {
  try {
    const resolved = new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions();
    const cycle = resolved.hourCycle;
    return cycle === "h11" || cycle === "h12" ? 12 : 24;
  } catch (e) {
    return 24;
  }
}
function getPeriodLabels(locale) {
  try {
    const fmt = new Intl.DateTimeFormat(locale, { hour: "numeric", hourCycle: "h12" });
    const part = (h) => {
      var _a;
      return (_a = fmt.formatToParts(new Date(2e3, 0, 1, h)).find((p) => p.type === "dayPeriod")) == null ? void 0 : _a.value;
    };
    const am = part(1);
    const pm = part(13);
    if (am && pm && am !== pm)
      return [normaliseSpaces(am), normaliseSpaces(pm)];
  } catch (e) {
  }
  return ["AM", "PM"];
}
function formatInputText(minutes, format, periods) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (format === 24)
    return `${pad(h)}:${pad(m)}`;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${pad(h12)}:${pad(m)} ${h < 12 ? periods[0] : periods[1]}`;
}
function formatOptionLabel(minutes, format, locale) {
  const date = new Date(2e3, 0, 1, Math.floor(minutes / 60), minutes % 60);
  try {
    return normaliseSpaces(
      new Intl.DateTimeFormat(locale, {
        hour: format === 12 ? "numeric" : "2-digit",
        minute: "2-digit",
        hourCycle: format === 12 ? "h12" : "h23"
      }).format(date)
    );
  } catch (e) {
    return formatInputText(minutes, format, ["AM", "PM"]);
  }
}
function parseTimeText(text, periods) {
  let t = text.trim().toLowerCase();
  if (!t)
    return null;
  let period = null;
  const candidates = [
    [periods[0].toLowerCase(), "am"],
    [periods[1].toLowerCase(), "pm"],
    ["a.m.", "am"],
    ["p.m.", "pm"],
    ["am", "am"],
    ["pm", "pm"],
    ["a", "am"],
    ["p", "pm"]
  ];
  for (const [label, p] of candidates) {
    if (label && t.endsWith(label)) {
      period = p;
      t = t.slice(0, -label.length).trim();
      break;
    }
  }
  let h;
  let m;
  const sep = /^(\d{1,2})[:.](\d{1,2})$/.exec(t);
  if (sep) {
    h = Number(sep[1]);
    m = Number(sep[2]);
  } else if (/^\d{1,4}$/.test(t)) {
    if (t.length <= 2) {
      h = Number(t);
      m = 0;
    } else {
      h = Number(t.slice(0, t.length - 2));
      m = Number(t.slice(-2));
    }
  } else {
    return null;
  }
  if (m > 59)
    return null;
  if (period) {
    if (h < 1 || h > 12)
      return null;
    h = h % 12 + (period === "pm" ? 12 : 0);
  } else if (h > 23) {
    return null;
  }
  return h * 60 + m;
}
function segmentAt(caret, format) {
  if (caret <= 2)
    return "hour";
  if (format === 24 || caret <= 5)
    return "minute";
  return "period";
}
function segmentRange(segment, textLength) {
  if (segment === "hour")
    return [0, 2];
  if (segment === "minute")
    return [3, 5];
  return [6, textLength];
}
function adjustSegment(minutes, segment, delta, step) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (segment === "hour")
    return ((h + delta) % 24 + 24) % 24 * 60 + m;
  if (segment === "period")
    return (minutes + 12 * 60) % MINUTES_PER_DAY;
  const s = Math.min(Math.max(1, Math.round(step)), 60);
  let next = delta > 0 ? (Math.floor(m / s) + 1) * s : (Math.ceil(m / s) - 1) * s;
  if (next >= 60)
    next = 0;
  if (next < 0)
    next = Math.floor(59 / s) * s;
  return h * 60 + next;
}
function isTimeUnavailable(minutes, { min, max, disabledTimes }) {
  if (min !== null && minutes < min)
    return true;
  if (max !== null && minutes > max)
    return true;
  if (!disabledTimes)
    return false;
  const hhmm = toHHmm(minutes);
  return typeof disabledTimes === "function" ? disabledTimes(hhmm) : disabledTimes.includes(hhmm);
}
function buildOptions(step, min, max) {
  const s = Math.max(1, Math.round(step));
  const out = [];
  for (let t = 0; t < MINUTES_PER_DAY; t += s) {
    if (min !== null && t < min)
      continue;
    if (max !== null && t > max)
      break;
    out.push(t);
  }
  return out;
}

// src/components/molecules/TimePicker/index.tsx
import { jsx as jsx33, jsxs as jsxs29 } from "react/jsx-runtime";
function hasContent2(node) {
  return node !== void 0 && node !== null && node !== false && node !== true && node !== "";
}
function ClockGlyph() {
  return /* @__PURE__ */ jsxs29("svg", { viewBox: "0 0 20 20", width: "16", height: "16", fill: "none", "aria-hidden": true, focusable: "false", children: [
    /* @__PURE__ */ jsx33("circle", { cx: "10", cy: "10", r: "7.25", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ jsx33("path", { d: "M10 6v4.25l2.75 1.75", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function ClearGlyph() {
  return /* @__PURE__ */ jsx33("svg", { viewBox: "0 0 16 16", width: "14", height: "14", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx33("path", { d: "M4 4l8 8M12 4l-8 8", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
var TimePicker = React31.forwardRef(function TimePicker2({
  value: valueProp,
  defaultValue,
  onChange,
  format: formatProp,
  step = TIME_PICKER_DEFAULTS.step,
  min: minProp,
  max: maxProp,
  disabledTimes,
  clearable = TIME_PICKER_DEFAULTS.clearable,
  locale,
  size = TIME_PICKER_DEFAULTS.size,
  label,
  error,
  name,
  labels: labelsProp,
  className,
  id: idProp,
  disabled = false,
  readOnly = false,
  required: requiredProp,
  placeholder,
  onKeyDown,
  onBlur,
  onClick,
  "aria-describedby": ariaDescribedByProp,
  "aria-invalid": ariaInvalidProp,
  "aria-required": ariaRequiredProp,
  "aria-labelledby": ariaLabelledByProp,
  ...rest
}, forwardedRef) {
  var _a;
  const labels = useMemo16(() => ({ ...TIME_PICKER_LABELS, ...labelsProp }), [labelsProp]);
  const field = useFormField();
  const reactId = useId16().replace(/:/g, "");
  const inputId = (_a = idProp != null ? idProp : field == null ? void 0 : field.id) != null ? _a : `ds-time-picker-${reactId}`;
  const labelId = `ds-time-picker-${reactId}-label`;
  const messageId = `ds-time-picker-${reactId}-message`;
  const listboxId = `ds-time-picker-${reactId}-listbox`;
  const optionId = (t) => `ds-time-picker-${reactId}-opt-${t}`;
  const format = formatProp != null ? formatProp : localeFormat(locale);
  const periods = useMemo16(() => getPeriodLabels(locale), [locale]);
  const min = fromHHmm(minProp);
  const max = fromHHmm(maxProp);
  const constraints = useMemo16(() => ({ min, max, disabledTimes }), [min, max, disabledTimes]);
  const options = useMemo16(() => buildOptions(step, min, max), [step, min, max]);
  const isControlled = valueProp !== void 0;
  const [innerValue, setInnerValue] = useState24(() => defaultValue != null ? defaultValue : null);
  const currentValue = isControlled ? valueProp : innerValue;
  const currentMinutes = fromHHmm(currentValue);
  const display = useCallback20(
    (minutes) => minutes === null ? "" : formatInputText(minutes, format, periods),
    [format, periods]
  );
  const [text, setText] = useState24(() => display(currentMinutes));
  const [open, setOpen] = useState24(false);
  const [activeIndex, setActiveIndex] = useState24(-1);
  const [message, setMessage] = useState24(null);
  const inputRef = useRef20(null);
  const listRef = useRef20(null);
  const pendingSegmentRef = useRef20(null);
  const setInputRef = useCallback20(
    (node) => {
      inputRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  useEffect14(() => {
    setText(display(currentMinutes));
  }, [currentMinutes, display]);
  useLayoutEffect4(() => {
    const segment = pendingSegmentRef.current;
    const el = inputRef.current;
    if (!segment || !el)
      return;
    pendingSegmentRef.current = null;
    const [start, end] = segmentRange(segment, el.value.length);
    el.setSelectionRange(start, end);
  }, [text]);
  useEffect14(() => {
    var _a2;
    if (!open || activeIndex < 0)
      return;
    const el = (_a2 = listRef.current) == null ? void 0 : _a2.children[activeIndex];
    if (el && typeof el.scrollIntoView === "function")
      el.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);
  const interactive = !disabled && !readOnly;
  const unavailable = useCallback20((t) => isTimeUnavailable(t, constraints), [constraints]);
  const commit = (minutes) => {
    const next = minutes === null ? null : toHHmm(minutes);
    setMessage(null);
    setText(display(minutes));
    if (next === currentValue)
      return;
    if (!isControlled)
      setInnerValue(next);
    onChange == null ? void 0 : onChange(next);
  };
  const commitText = () => {
    if (text.trim() === "") {
      if (currentValue !== null)
        commit(null);
      return true;
    }
    const parsed = parseTimeText(text, periods);
    if (parsed === null) {
      setMessage(labels.invalid);
      return false;
    }
    if (unavailable(parsed)) {
      setMessage(labels.unavailable);
      return false;
    }
    commit(parsed);
    return true;
  };
  const firstEnabledIndex = (from, dir) => {
    for (let i = from; i >= 0 && i < options.length; i += dir) {
      if (!unavailable(options[i]))
        return i;
    }
    return -1;
  };
  const openList = () => {
    var _a2;
    if (!interactive || options.length === 0)
      return;
    const typed = (_a2 = parseTimeText(text, periods)) != null ? _a2 : currentMinutes;
    let idx = typed === null ? -1 : options.findIndex((t) => t >= typed);
    if (idx < 0)
      idx = 0;
    const enabled = firstEnabledIndex(idx, 1);
    setActiveIndex(enabled >= 0 ? enabled : firstEnabledIndex(idx, -1));
    setOpen(true);
  };
  const closeList = () => {
    setOpen(false);
    setActiveIndex(-1);
  };
  const pick = (t) => {
    var _a2;
    if (unavailable(t))
      return;
    commit(t);
    closeList();
    (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
  };
  const stepSegment = (el, delta) => {
    var _a2;
    const typed = parseTimeText(text, periods);
    const segment = segmentAt((_a2 = el.selectionStart) != null ? _a2 : 0, format);
    let start = typed != null ? typed : currentMinutes;
    if (start === null) {
      const first = options.find((t) => !unavailable(t));
      if (first === void 0)
        return;
      pendingSegmentRef.current = segment;
      commit(first);
      return;
    }
    for (let i = 0; i < MINUTES_PER_DAY; i += 1) {
      const next = adjustSegment(start, segment, delta, step);
      if (next === (typed != null ? typed : currentMinutes))
        return;
      if (!unavailable(next)) {
        pendingSegmentRef.current = segment;
        commit(next);
        if (display(next) === text) {
          const [s, e] = segmentRange(segment, el.value.length);
          el.setSelectionRange(s, e);
          pendingSegmentRef.current = null;
        }
        return;
      }
      start = next;
    }
  };
  const moveActive = (dir, fromIndex = activeIndex) => {
    let i = fromIndex;
    for (let n = 0; n < options.length; n += 1) {
      i = (i + dir + options.length) % options.length;
      if (!unavailable(options[i])) {
        setActiveIndex(i);
        return;
      }
    }
  };
  const handleKeyDown = (e) => {
    onKeyDown == null ? void 0 : onKeyDown(e);
    if (e.defaultPrevented || e.nativeEvent.isComposing || !interactive)
      return;
    const el = e.currentTarget;
    if (open) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (e.altKey)
            return;
          moveActive(1);
          return;
        case "ArrowUp":
          e.preventDefault();
          if (e.altKey)
            closeList();
          else
            moveActive(-1);
          return;
        case "Home":
          e.preventDefault();
          setActiveIndex(firstEnabledIndex(0, 1));
          return;
        case "End":
          e.preventDefault();
          setActiveIndex(firstEnabledIndex(options.length - 1, -1));
          return;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0)
            pick(options[activeIndex]);
          else {
            commitText();
            closeList();
          }
          return;
        case "Escape":
          e.preventDefault();
          e.stopPropagation();
          closeList();
          return;
        default:
          return;
      }
    }
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        e.preventDefault();
        if (e.altKey && e.key === "ArrowDown")
          openList();
        else
          stepSegment(el, e.key === "ArrowUp" ? 1 : -1);
        return;
      case "Enter":
        if (text.trim() !== "" || currentValue !== null) {
          e.preventDefault();
          commitText();
        }
        return;
      default:
    }
  };
  const handleBlur = (e) => {
    closeList();
    if (interactive)
      commitText();
    onBlur == null ? void 0 : onBlur(e);
  };
  const handleChange = (e) => {
    const next = e.target.value;
    setText(next);
    if (message)
      setMessage(null);
    if (open) {
      const parsed = parseTimeText(next, periods);
      const idx = parsed === null || unavailable(parsed) ? -1 : options.indexOf(parsed);
      setActiveIndex(idx);
    }
  };
  const ownMessage = message != null ? message : !field && hasContent2(error) && error !== true ? error : null;
  const describedBy = ariaDescribedByProp != null ? ariaDescribedByProp : [field == null ? void 0 : field.describedBy, ownMessage ? messageId : void 0].filter(Boolean).join(" ") || void 0;
  const invalid = ariaInvalidProp != null ? ariaInvalidProp : (field == null ? void 0 : field.invalid) || message !== null || error === true || hasContent2(error) ? true : void 0;
  const required = ariaRequiredProp != null ? ariaRequiredProp : requiredProp || (field == null ? void 0 : field.required) ? true : void 0;
  const showOwnLabel = !field && hasContent2(label);
  const showClear = clearable && interactive && currentValue !== null && currentValue !== void 0;
  const activeOption = open && activeIndex >= 0 ? options[activeIndex] : void 0;
  return /* @__PURE__ */ jsxs29(
    "div",
    {
      className: ["ds-time-picker", className].filter(Boolean).join(" "),
      "data-size": size,
      "data-disabled": disabled ? "true" : void 0,
      "data-readonly": readOnly ? "true" : void 0,
      "data-invalid": invalid ? "true" : void 0,
      "data-open": open ? "true" : void 0,
      children: [
        showOwnLabel ? /* @__PURE__ */ jsxs29("label", { id: labelId, htmlFor: inputId, className: "ds-time-picker__label", children: [
          label,
          requiredProp ? /* @__PURE__ */ jsx33("span", { className: "ds-time-picker__required", "aria-hidden": "true", children: " *" }) : null
        ] }) : null,
        /* @__PURE__ */ jsxs29("div", { className: "ds-time-picker__field", children: [
          /* @__PURE__ */ jsx33(
            "input",
            {
              ...rest,
              ref: setInputRef,
              id: inputId,
              type: "text",
              role: "combobox",
              inputMode: "text",
              autoComplete: "off",
              className: "ds-time-picker__input",
              value: text,
              placeholder: placeholder != null ? placeholder : format === 12 ? `hh:mm ${periods[0]}` : "HH:mm",
              disabled,
              readOnly,
              "aria-labelledby": ariaLabelledByProp != null ? ariaLabelledByProp : showOwnLabel ? labelId : void 0,
              "aria-describedby": describedBy,
              "aria-invalid": invalid,
              "aria-required": required,
              "aria-autocomplete": "none",
              "aria-haspopup": "listbox",
              "aria-expanded": open,
              "aria-controls": listboxId,
              "aria-activedescendant": activeOption !== void 0 ? optionId(activeOption) : void 0,
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              onBlur: handleBlur,
              onClick: (e) => {
                onClick == null ? void 0 : onClick(e);
                if (!e.defaultPrevented && !open)
                  openList();
              }
            }
          ),
          showClear ? /* @__PURE__ */ jsx33(
            "button",
            {
              type: "button",
              className: "ds-time-picker__button ds-time-picker__clear",
              "aria-label": labels.clear,
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => {
                var _a2;
                commit(null);
                (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
              },
              children: /* @__PURE__ */ jsx33(ClearGlyph, {})
            }
          ) : null,
          /* @__PURE__ */ jsx33(
            "button",
            {
              type: "button",
              className: "ds-time-picker__button ds-time-picker__toggle",
              "aria-label": labels.toggle,
              "aria-expanded": open,
              "aria-controls": listboxId,
              tabIndex: -1,
              disabled: !interactive,
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => {
                var _a2;
                if (open)
                  closeList();
                else
                  openList();
                (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
              },
              children: /* @__PURE__ */ jsx33(ClockGlyph, {})
            }
          ),
          /* @__PURE__ */ jsx33(
            "ul",
            {
              ref: listRef,
              id: listboxId,
              role: "listbox",
              "aria-label": labels.listbox,
              className: "ds-time-picker__listbox",
              hidden: !open,
              children: open ? options.map((t, i) => {
                const off = unavailable(t);
                return /* @__PURE__ */ jsx33(
                  "li",
                  {
                    id: optionId(t),
                    role: "option",
                    "aria-selected": t === currentMinutes,
                    "aria-disabled": off || void 0,
                    "data-active": i === activeIndex ? "true" : void 0,
                    className: "ds-time-picker__option",
                    onMouseDown: (e) => e.preventDefault(),
                    onMouseEnter: () => {
                      if (!off)
                        setActiveIndex(i);
                    },
                    onClick: () => pick(t),
                    children: formatOptionLabel(t, format, locale)
                  },
                  t
                );
              }) : null
            }
          )
        ] }),
        name !== void 0 ? /* @__PURE__ */ jsx33("input", { type: "hidden", name, value: currentValue != null ? currentValue : "" }) : null,
        ownMessage ? /* @__PURE__ */ jsx33("p", { id: messageId, className: "ds-time-picker__error", role: message ? "alert" : void 0, children: ownMessage }) : null
      ]
    }
  );
});
TimePicker.displayName = "TimePicker";
TimePicker[FORM_FIELD_CONSUMER_KEY] = true;
var TimePicker_default = TimePicker;

// src/components/molecules/Menu/index.tsx
import {
  createContext as createContext9,
  forwardRef as forwardRef4,
  useCallback as useCallback21,
  useContext as useContext11,
  useEffect as useEffect15,
  useId as useId17,
  useLayoutEffect as useLayoutEffect5,
  useMemo as useMemo17,
  useRef as useRef21,
  useState as useState25
} from "react";
import { createPortal as createPortal7 } from "react-dom";

// src/components/atoms/Kbd/index.tsx
import React32 from "react";

// src/components/atoms/Kbd/Kbd.config.ts
var KBD_DEFAULTS = {
  size: "sm",
  platform: "auto",
  separator: "+"
};
var same = (display, spoken, aria) => ({
  mac: [display, spoken],
  other: [display, spoken],
  aria: { mac: aria, other: aria }
});
var KBD_KEY_MAP = {
  mod: { mac: ["\u2318", "Command"], other: ["Ctrl", "Control"], aria: { mac: "Meta", other: "Control" } },
  cmd: { mac: ["\u2318", "Command"], other: ["Win", "Windows"], aria: { mac: "Meta", other: "Meta" } },
  meta: { mac: ["\u2318", "Command"], other: ["Win", "Windows"], aria: { mac: "Meta", other: "Meta" } },
  ctrl: { mac: ["\u2303", "Control"], other: ["Ctrl", "Control"], aria: { mac: "Control", other: "Control" } },
  control: { mac: ["\u2303", "Control"], other: ["Ctrl", "Control"], aria: { mac: "Control", other: "Control" } },
  alt: { mac: ["\u2325", "Option"], other: ["Alt", "Alt"], aria: { mac: "Alt", other: "Alt" } },
  option: { mac: ["\u2325", "Option"], other: ["Alt", "Alt"], aria: { mac: "Alt", other: "Alt" } },
  shift: { mac: ["\u21E7", "Shift"], other: ["Shift", "Shift"], aria: { mac: "Shift", other: "Shift" } },
  enter: same("\u21B5", "Enter", "Enter"),
  return: same("\u21B5", "Enter", "Enter"),
  esc: same("Esc", "Escape", "Escape"),
  escape: same("Esc", "Escape", "Escape"),
  tab: same("Tab", "Tab", "Tab"),
  space: same("Space", "Space", "Space"),
  backspace: same("\u232B", "Backspace", "Backspace"),
  delete: same("Del", "Delete", "Delete"),
  up: same("\u2191", "Up arrow", "ArrowUp"),
  arrowup: same("\u2191", "Up arrow", "ArrowUp"),
  down: same("\u2193", "Down arrow", "ArrowDown"),
  arrowdown: same("\u2193", "Down arrow", "ArrowDown"),
  left: same("\u2190", "Left arrow", "ArrowLeft"),
  arrowleft: same("\u2190", "Left arrow", "ArrowLeft"),
  right: same("\u2192", "Right arrow", "ArrowRight"),
  arrowright: same("\u2192", "Right arrow", "ArrowRight"),
  home: same("Home", "Home", "Home"),
  end: same("End", "End", "End"),
  pageup: same("PgUp", "Page up", "PageUp"),
  pagedown: same("PgDn", "Page down", "PageDown")
};

// src/components/atoms/Kbd/Kbd.utils.ts
import { useSyncExternalStore } from "react";
function detectIsMac() {
  var _a;
  if (typeof navigator === "undefined")
    return false;
  const nav = navigator;
  const platform = ((_a = nav.userAgentData) == null ? void 0 : _a.platform) || nav.platform || nav.userAgent || "";
  return /mac|iphone|ipad|ipod/i.test(platform);
}
var noopSubscribe = () => () => {
};
function useIsMac(platform = "auto") {
  const detected = useSyncExternalStore(noopSubscribe, detectIsMac, () => false);
  if (platform === "mac")
    return true;
  if (platform === "other")
    return false;
  return detected;
}
function resolveKey(key, isMac) {
  const def = KBD_KEY_MAP[key.trim().toLowerCase()];
  if (def) {
    const [display2, spoken] = isMac ? def.mac : def.other;
    return { display: display2, spoken, aria: isMac ? def.aria.mac : def.aria.other };
  }
  const raw = key.trim();
  const display = raw.length === 1 ? raw.toUpperCase() : raw;
  return { display, spoken: display, aria: display };
}
function formatShortcut(keys, isMac) {
  const parts = keys.map((k) => resolveKey(k, isMac).display);
  return isMac ? parts.join("") : parts.join("+");
}
function toAriaKeyShortcuts(keys, isMac) {
  return keys.map((k) => resolveKey(k, isMac).aria).join("+");
}

// src/components/atoms/Kbd/index.tsx
import { Fragment as Fragment7, jsx as jsx34, jsxs as jsxs30 } from "react/jsx-runtime";
var Kbd = React32.forwardRef(function Kbd2({
  keys,
  children,
  separator = KBD_DEFAULTS.separator,
  size = KBD_DEFAULTS.size,
  platform = KBD_DEFAULTS.platform,
  className,
  ...rest
}, ref) {
  const isMac = useIsMac(platform);
  const classes = ["ds-kbd", className].filter(Boolean).join(" ");
  if (!keys || keys.length === 0) {
    return /* @__PURE__ */ jsx34("kbd", { ref, className: classes, "data-size": size, ...rest, children: /* @__PURE__ */ jsx34("span", { className: "ds-kbd__key ds-kbd__key--single", children }) });
  }
  return /* @__PURE__ */ jsx34(
    "kbd",
    {
      ref,
      className: classes,
      "data-size": size,
      "data-combo": keys.length > 1 ? "true" : void 0,
      "data-platform": isMac ? "mac" : "other",
      "data-shortcut": toAriaKeyShortcuts(keys, isMac),
      ...rest,
      children: keys.map((key, index) => {
        const label = resolveKey(key, isMac);
        const needsSpokenName = label.spoken !== label.display;
        return /* @__PURE__ */ jsxs30(React32.Fragment, { children: [
          index > 0 && separator !== "" && separator != null ? /* @__PURE__ */ jsx34("span", { className: "ds-kbd__sep", "aria-hidden": "true", children: separator }) : null,
          /* @__PURE__ */ jsx34("kbd", { className: "ds-kbd__key", children: needsSpokenName ? /* @__PURE__ */ jsxs30(Fragment7, { children: [
            /* @__PURE__ */ jsx34("span", { "aria-hidden": "true", children: label.display }),
            /* @__PURE__ */ jsxs30("span", { className: "ds-kbd__sr", children: [
              " ",
              label.spoken,
              " "
            ] })
          ] }) : /* @__PURE__ */ jsxs30(Fragment7, { children: [
            label.display,
            /* @__PURE__ */ jsx34("span", { className: "ds-kbd__sr", children: " " })
          ] }) })
        ] }, `${key}-${index}`);
      })
    }
  );
});
Kbd.displayName = "Kbd";
var Kbd_default = Kbd;

// src/components/molecules/Menu/Menu.config.ts
var MENU_DEFAULTS = {
  placement: "bottom-start",
  loop: true,
  variant: "default"
};
var SUBMENU_OPEN_DELAY = 100;
var TYPEAHEAD_TIMEOUT = 500;
var SUBMENU_OVERLAP = 4;
var MENU_ROW_ROLES = ["menuitem", "menuitemcheckbox", "menuitemradio"];

// src/components/molecules/Menu/Menu.utils.ts
var ENABLED_ROW_SELECTOR = MENU_ROW_ROLES.map((r) => `[role="${r}"]:not([aria-disabled="true"])`).join(", ");
function getEnabledMenuItems(panel) {
  if (!panel)
    return [];
  return Array.from(panel.querySelectorAll(ENABLED_ROW_SELECTOR));
}
function getItemText(el) {
  var _a, _b;
  const explicit = el.getAttribute("data-text-value");
  if (explicit)
    return explicit.trim().toLowerCase();
  const label = (_a = el.querySelector(".ds-menu__label-text")) != null ? _a : el;
  return ((_b = label.textContent) != null ? _b : "").trim().toLowerCase();
}
function findTypeaheadIndex(items, buffer, current) {
  if (!buffer || items.length === 0)
    return -1;
  const query = buffer.toLowerCase();
  const repeated = query.split("").every((ch) => ch === query[0]);
  const search = repeated ? query[0] : query;
  const start = repeated ? current + 1 : Math.max(current, 0);
  for (let step = 0; step < items.length; step += 1) {
    const index = (start + step) % items.length;
    if (getItemText(items[index]).startsWith(search))
      return index;
  }
  return -1;
}
function isPrintableKey(e) {
  return e.key.length === 1 && e.key !== " " && !e.ctrlKey && !e.metaKey && !e.altKey;
}

// src/components/molecules/Menu/index.tsx
import { Fragment as Fragment8, jsx as jsx35, jsxs as jsxs31 } from "react/jsx-runtime";
function cls18(...parts) {
  return parts.filter(Boolean).join(" ");
}
function useStableId(prefix) {
  return `${prefix}-${useId17().replace(/:/g, "")}`;
}
var MenuRootContext = createContext9(null);
var MenuLevelContext = createContext9(null);
var MenuSubContext = createContext9(null);
var MenuRadioContext = createContext9(null);
function useMenuRoot(component) {
  const ctx = useContext11(MenuRootContext);
  if (!ctx)
    throw new Error(`${component} must be used within <Menu>`);
  return ctx;
}
function setRef4(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref && typeof ref === "object")
    ref.current = value;
}
function focusEdge(panel, edge) {
  if (!panel || edge === "none")
    return;
  const items = getEnabledMenuItems(panel);
  const target = edge === "last" ? items[items.length - 1] : items[0];
  (target != null ? target : panel).focus({ preventScroll: true });
}
function Menu({ children, open: openProp, defaultOpen = false, onOpenChange }) {
  const triggerId = useStableId("ds-menu-trigger");
  const contentId = useStableId("ds-menu-content");
  const triggerRef = useRef21(null);
  const intentRef = useRef21("first");
  const isControlled = openProp !== void 0;
  const [inner, setInner] = useState25(defaultOpen);
  const open = isControlled ? Boolean(openProp) : inner;
  const prevOpen = useRef21(open);
  const setOpen = useCallback21(
    (next, intent = "first") => {
      intentRef.current = intent;
      if (!isControlled)
        setInner(next);
      onOpenChange == null ? void 0 : onOpenChange(next);
    },
    [isControlled, onOpenChange]
  );
  const close = useCallback21(
    (reason) => {
      var _a;
      if (reason !== "outside")
        (_a = triggerRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
      setOpen(false);
    },
    [setOpen]
  );
  useEffect15(() => {
    if (prevOpen.current && !open && typeof window !== "undefined") {
      const el = triggerRef.current;
      const id = window.requestAnimationFrame(() => {
        const active2 = document.activeElement;
        if (el && el.isConnected && (!active2 || active2 === document.body))
          el.focus({ preventScroll: true });
      });
      prevOpen.current = open;
      return () => window.cancelAnimationFrame(id);
    }
    prevOpen.current = open;
    return void 0;
  }, [open]);
  const value = useMemo17(
    () => ({ open, setOpen, close, triggerId, contentId, triggerRef, intentRef }),
    [open, setOpen, close, triggerId, contentId]
  );
  return /* @__PURE__ */ jsx35(MenuRootContext.Provider, { value, children });
}
var MenuTrigger = forwardRef4(function MenuTrigger2({ children, asChild = false, onClick, onKeyDown, type = "button", className, ...rest }, ref) {
  var _a;
  const ctx = useMenuRoot("MenuTrigger");
  const setRefs = useCallback21(
    (el) => {
      ctx.triggerRef.current = el;
      setRef4(ref, el);
    },
    [ctx.triggerRef, ref]
  );
  const triggerProps = {
    ...rest,
    id: (_a = rest.id) != null ? _a : ctx.triggerId,
    "aria-haspopup": "menu",
    "aria-expanded": ctx.open,
    "aria-controls": ctx.open ? ctx.contentId : void 0,
    "data-state": ctx.open ? "open" : "closed",
    onClick: (e) => {
      onClick == null ? void 0 : onClick(e);
      if (e.defaultPrevented)
        return;
      ctx.setOpen(!ctx.open, "first");
    },
    onKeyDown: (e) => {
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        ctx.setOpen(true, "first");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        ctx.setOpen(true, "last");
      }
    }
  };
  if (asChild) {
    return renderSlot(children, { ...triggerProps, className }, setRefs, "MenuTrigger");
  }
  return /* @__PURE__ */ jsx35("button", { ...triggerProps, ref: setRefs, type, className: cls18("ds-menu__trigger", className), children });
});
function MenuPanel({
  kind,
  panelId,
  labelledById,
  anchorRef,
  intentRef,
  placement = MENU_DEFAULTS.placement,
  onClose,
  loop = MENU_DEFAULTS.loop,
  zIndex,
  children,
  className,
  style,
  onKeyDown,
  onMouseDownCapture,
  ...rest
}) {
  var _a;
  const root = useMenuRoot("MenuContent");
  const panelRef = useRef21(null);
  const insideTreeRef = useRef21(false);
  const typeahead = useRef21({ buffer: "" });
  const [openSubId, setOpenSubId] = useState25(null);
  const [layerZ, setLayerZ] = useState25("var(--z-popover, 450)");
  const [pos, setPos] = useState25({
    top: 0,
    left: 0
  });
  const parentLayerId = useContext11(FloatingLayerContext);
  const onCloseRef = useRef21(onClose);
  onCloseRef.current = onClose;
  const updatePosition = useCallback21(() => {
    const anchor = anchorRef.current;
    const panel2 = panelRef.current;
    if (!anchor || !panel2 || typeof window === "undefined")
      return;
    const r = anchor.getBoundingClientRect();
    const w = panel2.offsetWidth || 160;
    const h = panel2.offsetHeight || 80;
    if (kind === "root") {
      const res2 = computePopoverPosition(r, w, h, placement);
      setPos({ top: res2.top, left: res2.left, maxHeight: res2.maxHeight, side: res2.top < r.top ? "top" : "bottom" });
      return;
    }
    const vp = { width: window.innerWidth, height: window.innerHeight };
    const res = computeTooltipPosition(r, w, h, "right", "start", vp);
    const left = res.side === "right" ? res.left - SUBMENU_OVERLAP * 3 : res.side === "left" ? res.left + SUBMENU_OVERLAP * 3 : res.left;
    setPos({ top: res.top - SUBMENU_OVERLAP, left, maxHeight: vp.height - 16, side: res.side });
  }, [anchorRef, kind, placement]);
  useLayoutEffect5(() => {
    setLayerZ(resolveLayerZIndex(anchorRef.current, zIndex));
    updatePosition();
    const id = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(id);
  }, [anchorRef, zIndex, updatePosition]);
  useEffect15(() => {
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [updatePosition]);
  useEffect15(() => {
    pushFloatingLayer(panelId, parentLayerId);
    return () => popFloatingLayer(panelId);
  }, [panelId, parentLayerId]);
  useEffect15(() => {
    const onKey = (e) => {
      if (e.key !== "Escape" || e.isComposing || e.defaultPrevented)
        return;
      if (!isTopFloatingLayer(panelId))
        return;
      e.preventDefault();
      onCloseRef.current("escape");
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [panelId]);
  useEffect15(() => {
    if (kind !== "root")
      return void 0;
    const onDown = (e) => {
      var _a2, _b;
      const inside = insideTreeRef.current;
      insideTreeRef.current = false;
      if (inside)
        return;
      const t = e.target;
      if (((_a2 = anchorRef.current) == null ? void 0 : _a2.contains(t)) || ((_b = panelRef.current) == null ? void 0 : _b.contains(t)))
        return;
      onCloseRef.current("outside");
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [kind, anchorRef]);
  useEffect15(() => {
    focusEdge(panelRef.current, intentRef.current);
    const ta = typeahead.current;
    return () => {
      if (ta.timer)
        clearTimeout(ta.timer);
    };
  }, [intentRef]);
  const handleKeyDown = (e) => {
    onKeyDown == null ? void 0 : onKeyDown(e);
    if (e.defaultPrevented)
      return;
    const panel2 = panelRef.current;
    if (!panel2 || e.target.closest('[role="menu"]') !== panel2)
      return;
    const items = getEnabledMenuItems(panel2);
    const current = items.indexOf(document.activeElement);
    const focusAt = (i) => {
      var _a2;
      return (_a2 = items[i]) == null ? void 0 : _a2.focus({ preventScroll: false });
    };
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (items.length === 0)
          return;
        const next = current < 0 ? 0 : current + 1;
        focusAt(next >= items.length ? loop ? 0 : items.length - 1 : next);
        return;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (items.length === 0)
          return;
        const prev = current < 0 ? items.length - 1 : current - 1;
        focusAt(prev < 0 ? loop ? items.length - 1 : 0 : prev);
        return;
      }
      case "Home":
      case "PageUp":
        e.preventDefault();
        focusAt(0);
        return;
      case "End":
      case "PageDown":
        e.preventDefault();
        focusAt(items.length - 1);
        return;
      case "Tab":
        e.preventDefault();
        root.close("tab");
        return;
      case "ArrowLeft":
        if (kind === "sub") {
          e.preventDefault();
          onClose("arrow");
        }
        return;
      default: {
        if (!isPrintableKey(e))
          return;
        const t = e.target;
        if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
          return;
        const ta = typeahead.current;
        ta.buffer += e.key;
        if (ta.timer)
          clearTimeout(ta.timer);
        ta.timer = setTimeout(() => {
          ta.buffer = "";
        }, TYPEAHEAD_TIMEOUT);
        const match = findTypeaheadIndex(items, ta.buffer, current);
        if (match >= 0) {
          e.preventDefault();
          focusAt(match);
        }
      }
    }
  };
  const levelValue = useMemo17(() => ({ openSubId, setOpenSubId }), [openSubId]);
  const ariaLabel = rest["aria-label"];
  const panel = /* @__PURE__ */ jsx35(
    "div",
    {
      ...rest,
      ref: panelRef,
      id: panelId,
      role: "menu",
      "aria-orientation": "vertical",
      "aria-labelledby": ariaLabel ? rest["aria-labelledby"] : (_a = rest["aria-labelledby"]) != null ? _a : labelledById,
      tabIndex: -1,
      className: cls18("ds-menu", kind === "sub" && "ds-menu--sub", className),
      "data-side": pos.side,
      style: {
        position: "fixed",
        top: pos.top,
        left: pos.left,
        maxHeight: pos.maxHeight,
        zIndex: zIndex != null ? zIndex : layerZ,
        ...style
      },
      onMouseDownCapture: (e) => {
        insideTreeRef.current = true;
        onMouseDownCapture == null ? void 0 : onMouseDownCapture(e);
      },
      onKeyDown: handleKeyDown,
      children: /* @__PURE__ */ jsx35(FloatingLayerContext.Provider, { value: panelId, children: /* @__PURE__ */ jsx35(MenuLevelContext.Provider, { value: levelValue, children }) })
    }
  );
  if (typeof document === "undefined")
    return null;
  return createPortal7(panel, document.body);
}
function MenuContent({ placement = MENU_DEFAULTS.placement, ...props }) {
  const root = useMenuRoot("MenuContent");
  if (!root.open)
    return null;
  return /* @__PURE__ */ jsx35(
    MenuPanel,
    {
      ...props,
      kind: "root",
      panelId: root.contentId,
      labelledById: root.triggerId,
      anchorRef: root.triggerRef,
      intentRef: root.intentRef,
      placement,
      onClose: root.close
    }
  );
}
var CheckIndicator = /* @__PURE__ */ jsx35("svg", { viewBox: "0 0 16 16", width: "14", height: "14", focusable: "false", children: /* @__PURE__ */ jsx35("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
var RadioIndicator = /* @__PURE__ */ jsx35("svg", { viewBox: "0 0 16 16", width: "14", height: "14", focusable: "false", children: /* @__PURE__ */ jsx35("circle", { cx: "8", cy: "8", r: "3.5", fill: "currentColor" }) });
var ChevronRight2 = /* @__PURE__ */ jsx35("svg", { viewBox: "0 0 16 16", width: "14", height: "14", focusable: "false", children: /* @__PURE__ */ jsx35("path", { d: "M6 3.5L10.5 8 6 12.5", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
var MenuRow = forwardRef4(function MenuRow2({
  children,
  itemRole,
  checked,
  indicator,
  sub,
  trailing,
  onActivate,
  variant = MENU_DEFAULTS.variant,
  disabled = false,
  icon,
  description,
  shortcut,
  textValue,
  href,
  target,
  rel,
  className,
  onClick,
  onKeyDown,
  onPointerMove,
  onFocus,
  ...rest
}, ref) {
  const level = useContext11(MenuLevelContext);
  const isMac = useIsMac("auto");
  const keys = Array.isArray(shortcut) && shortcut.every((k) => typeof k === "string") ? shortcut : null;
  const linkHref = href && !disabled && isSafeHref(href) ? href : void 0;
  const isCheckable = itemRole !== "menuitem";
  const typeaheadText = textValue != null ? textValue : typeof children === "string" ? children : void 0;
  const common = {
    ...rest,
    role: itemRole,
    tabIndex: -1,
    "aria-disabled": disabled || void 0,
    "aria-checked": isCheckable ? Boolean(checked) : void 0,
    "aria-haspopup": sub ? "menu" : void 0,
    "aria-expanded": sub ? sub.open : void 0,
    "aria-controls": sub && sub.open ? sub.contentId : void 0,
    "aria-keyshortcuts": keys ? toAriaKeyShortcuts(keys, isMac) : void 0,
    id: sub ? sub.triggerId : rest.id,
    "data-text-value": typeaheadText,
    "data-variant": variant,
    "data-disabled": disabled ? "true" : void 0,
    "data-state": isCheckable ? checked ? "checked" : "unchecked" : sub ? sub.open ? "open" : "closed" : void 0,
    className: cls18("ds-menu__item", className),
    onClick: (e) => {
      onClick == null ? void 0 : onClick(e);
      if (e.defaultPrevented)
        return;
      if (disabled) {
        e.preventDefault();
        return;
      }
      onActivate(e);
    },
    onKeyDown: (e) => {
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!disabled)
          e.currentTarget.click();
      }
    },
    onPointerMove: (e) => {
      onPointerMove == null ? void 0 : onPointerMove(e);
      if (e.pointerType === "touch" || disabled)
        return;
      if (document.activeElement !== e.currentTarget)
        e.currentTarget.focus({ preventScroll: true });
    },
    onFocus: (e) => {
      onFocus == null ? void 0 : onFocus(e);
      if (level && level.openSubId && level.openSubId !== (sub == null ? void 0 : sub.id))
        level.setOpenSubId(null);
    }
  };
  const body = /* @__PURE__ */ jsxs31(Fragment8, { children: [
    isCheckable ? /* @__PURE__ */ jsx35("span", { className: "ds-menu__indicator", "aria-hidden": "true", children: checked ? indicator : null }) : null,
    icon != null ? /* @__PURE__ */ jsx35("span", { className: "ds-menu__icon", "aria-hidden": "true", children: icon }) : null,
    /* @__PURE__ */ jsxs31("span", { className: "ds-menu__label", children: [
      /* @__PURE__ */ jsx35("span", { className: "ds-menu__label-text", children }),
      description != null ? /* @__PURE__ */ jsx35("span", { className: "ds-menu__description", children: description }) : null
    ] }),
    shortcut != null ? /* @__PURE__ */ jsx35("span", { className: "ds-menu__shortcut", "aria-hidden": "true", children: keys ? /* @__PURE__ */ jsx35(Kbd_default, { keys, size: "sm" }) : shortcut }) : null,
    trailing
  ] });
  if (linkHref) {
    return /* @__PURE__ */ jsx35(
      "a",
      {
        ...common,
        ref,
        href: linkHref,
        target,
        rel: target === "_blank" ? cls18(rel, "noopener noreferrer") : rel,
        children: body
      }
    );
  }
  return /* @__PURE__ */ jsx35("div", { ...common, ref, children: body });
});
var MenuItem = forwardRef4(function MenuItem2({ onSelect, closeOnSelect = true, ...rest }, ref) {
  const root = useMenuRoot("MenuItem");
  return /* @__PURE__ */ jsx35(
    MenuRow,
    {
      ...rest,
      ref,
      itemRole: "menuitem",
      onActivate: (e) => {
        onSelect == null ? void 0 : onSelect(e);
        if (closeOnSelect && !e.defaultPrevented)
          root.close("select");
      }
    }
  );
});
var MenuCheckboxItem = forwardRef4(function MenuCheckboxItem2({ checked: checkedProp, defaultChecked = false, onCheckedChange, onSelect, closeOnSelect = false, ...rest }, ref) {
  const root = useMenuRoot("MenuCheckboxItem");
  const isControlled = checkedProp !== void 0;
  const [inner, setInner] = useState25(defaultChecked);
  const checked = isControlled ? Boolean(checkedProp) : inner;
  return /* @__PURE__ */ jsx35(
    MenuRow,
    {
      ...rest,
      ref,
      itemRole: "menuitemcheckbox",
      checked,
      indicator: CheckIndicator,
      onActivate: (e) => {
        const next = !checked;
        if (!isControlled)
          setInner(next);
        onCheckedChange == null ? void 0 : onCheckedChange(next);
        onSelect == null ? void 0 : onSelect(e);
        if (closeOnSelect && !e.defaultPrevented)
          root.close("select");
      }
    }
  );
});
var MenuRadioGroup = forwardRef4(function MenuRadioGroup2({ children, value: valueProp, defaultValue, onValueChange, label, ...rest }, ref) {
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState25(defaultValue);
  const value = isControlled ? valueProp : inner;
  const setValue = useCallback21(
    (v) => {
      if (!isControlled)
        setInner(v);
      onValueChange == null ? void 0 : onValueChange(v);
    },
    [isControlled, onValueChange]
  );
  const ctx = useMemo17(() => ({ value, setValue }), [value, setValue]);
  return /* @__PURE__ */ jsx35(MenuRadioContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx35(MenuGroup, { ...rest, ref, label, children }) });
});
var MenuRadioItem = forwardRef4(function MenuRadioItem2({ value, onSelect, closeOnSelect = false, ...rest }, ref) {
  const root = useMenuRoot("MenuRadioItem");
  const group = useContext11(MenuRadioContext);
  if (!group)
    throw new Error("MenuRadioItem must be used within <MenuRadioGroup>");
  return /* @__PURE__ */ jsx35(
    MenuRow,
    {
      ...rest,
      ref,
      itemRole: "menuitemradio",
      checked: group.value === value,
      indicator: RadioIndicator,
      onActivate: (e) => {
        group.setValue(value);
        onSelect == null ? void 0 : onSelect(e);
        if (closeOnSelect && !e.defaultPrevented)
          root.close("select");
      }
    }
  );
});
var MenuGroup = forwardRef4(function MenuGroup2({ children, label, className, ...rest }, ref) {
  const labelId = useStableId("ds-menu-group");
  return /* @__PURE__ */ jsxs31(
    "div",
    {
      ...rest,
      ref,
      role: "group",
      "aria-labelledby": label != null ? labelId : rest["aria-labelledby"],
      className: cls18("ds-menu__group", className),
      children: [
        label != null ? /* @__PURE__ */ jsx35(MenuLabel, { id: labelId, children: label }) : null,
        children
      ]
    }
  );
});
var MenuLabel = forwardRef4(function MenuLabel2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx35("div", { ...rest, ref, className: cls18("ds-menu__group-label", className) });
});
var MenuSeparator = forwardRef4(function MenuSeparator2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx35("div", { ...rest, ref, role: "separator", "aria-orientation": "horizontal", className: cls18("ds-menu__separator", className) });
});
function MenuSub({ children }) {
  const level = useContext11(MenuLevelContext);
  if (!level)
    throw new Error("MenuSub must be used within <MenuContent> or <MenuSubContent>");
  const id = useStableId("ds-menu-sub");
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;
  const triggerRef = useRef21(null);
  const intentRef = useRef21("first");
  const open = level.openSubId === id;
  const { setOpenSubId } = level;
  const setOpen = useCallback21(
    (next, intent = "first") => {
      intentRef.current = intent;
      setOpenSubId((current) => next ? id : current === id ? null : current);
    },
    [id, setOpenSubId]
  );
  const value = useMemo17(
    () => ({ id, open, setOpen, triggerId, contentId, triggerRef, intentRef }),
    [id, open, setOpen, triggerId, contentId]
  );
  return /* @__PURE__ */ jsx35(MenuSubContext.Provider, { value, children });
}
var MenuSubTrigger = forwardRef4(function MenuSubTrigger2({ onKeyDown, onPointerEnter, onPointerLeave, disabled = false, ...rest }, ref) {
  const sub = useContext11(MenuSubContext);
  if (!sub)
    throw new Error("MenuSubTrigger must be used within <MenuSub>");
  const timer = useRef21(void 0);
  useEffect15(() => () => clearTimeout(timer.current), []);
  const openWithFocus = () => {
    if (sub.open)
      focusEdge(document.getElementById(sub.contentId), "first");
    else
      sub.setOpen(true, "first");
  };
  return /* @__PURE__ */ jsx35(
    MenuRow,
    {
      ...rest,
      ref: (el) => {
        sub.triggerRef.current = el;
        setRef4(ref, el);
      },
      disabled,
      itemRole: "menuitem",
      sub: { id: sub.id, open: sub.open, contentId: sub.contentId, triggerId: sub.triggerId },
      trailing: /* @__PURE__ */ jsx35("span", { className: "ds-menu__chevron", "aria-hidden": "true", children: ChevronRight2 }),
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.defaultPrevented || disabled)
          return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          openWithFocus();
        }
      },
      onPointerEnter: (e) => {
        onPointerEnter == null ? void 0 : onPointerEnter(e);
        if (disabled || e.pointerType === "touch")
          return;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => sub.setOpen(true, "none"), SUBMENU_OPEN_DELAY);
      },
      onPointerLeave: (e) => {
        onPointerLeave == null ? void 0 : onPointerLeave(e);
        clearTimeout(timer.current);
      },
      onActivate: (e) => {
        const keyboard = e.nativeEvent.detail === 0;
        if (keyboard)
          openWithFocus();
        else
          sub.setOpen(true, "none");
      }
    }
  );
});
function MenuSubContent(props) {
  const sub = useContext11(MenuSubContext);
  if (!sub)
    throw new Error("MenuSubContent must be used within <MenuSub>");
  if (!sub.open)
    return null;
  return /* @__PURE__ */ jsx35(
    MenuPanel,
    {
      ...props,
      kind: "sub",
      panelId: sub.contentId,
      labelledById: sub.triggerId,
      anchorRef: sub.triggerRef,
      intentRef: sub.intentRef,
      onClose: (reason) => {
        var _a;
        sub.setOpen(false);
        if (reason === "escape" || reason === "arrow")
          (_a = sub.triggerRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
      }
    }
  );
}
Menu.displayName = "Menu";
MenuTrigger.displayName = "MenuTrigger";
MenuContent.displayName = "MenuContent";
MenuItem.displayName = "MenuItem";
MenuCheckboxItem.displayName = "MenuCheckboxItem";
MenuRadioGroup.displayName = "MenuRadioGroup";
MenuRadioItem.displayName = "MenuRadioItem";
MenuGroup.displayName = "MenuGroup";
MenuLabel.displayName = "MenuLabel";
MenuSeparator.displayName = "MenuSeparator";
MenuSub.displayName = "MenuSub";
MenuSubTrigger.displayName = "MenuSubTrigger";
MenuSubContent.displayName = "MenuSubContent";

// src/components/atoms/AvatarGroup/index.tsx
import React34 from "react";

// src/components/atoms/AvatarGroup/AvatarGroup.config.ts
var AVATAR_GROUP_DEFAULTS = {
  max: 4,
  size: "md",
  spacing: "normal"
};
var AVATAR_GROUP_SIZE_PX = { xs: 24, sm: 32, md: 40, lg: 48 };
var AVATAR_GROUP_MAX_SPOKEN_NAMES = 10;
function resolveAvatarSize(size) {
  return typeof size === "number" ? size : AVATAR_GROUP_SIZE_PX[size];
}
function overflowLabel(hiddenCount, hiddenNames) {
  const base = `Show ${hiddenCount} more`;
  if (hiddenNames.length === 0)
    return base;
  const spoken = hiddenNames.slice(0, AVATAR_GROUP_MAX_SPOKEN_NAMES);
  const rest = hiddenCount - spoken.length;
  return `${base}: ${spoken.join(", ")}${rest > 0 ? ` and ${rest} other${rest === 1 ? "" : "s"}` : ""}`;
}

// src/components/atoms/AvatarGroup/index.tsx
import { jsx as jsx36, jsxs as jsxs32 } from "react/jsx-runtime";
function cls19(...parts) {
  return parts.filter(Boolean).join(" ");
}
function fromItems(items) {
  return items.map(({ id, ...props }, index) => {
    var _a;
    return {
      key: id != null ? id : index,
      name: (_a = props.name) != null ? _a : props.alt || void 0,
      props
    };
  });
}
function fromChildren(children) {
  return React34.Children.toArray(children).filter((child) => React34.isValidElement(child)).map((child, index) => {
    var _a, _b;
    const props = child.props;
    return { key: (_a = child.key) != null ? _a : index, name: (_b = props.name) != null ? _b : props.alt || void 0, props };
  });
}
var AvatarGroup = React34.forwardRef(function AvatarGroup2({
  items,
  children,
  max = AVATAR_GROUP_DEFAULTS.max,
  total,
  size = AVATAR_GROUP_DEFAULTS.size,
  spacing = AVATAR_GROUP_DEFAULTS.spacing,
  label,
  onOverflowClick,
  renderOverflow,
  className,
  style,
  ...rest
}, ref) {
  var _a, _b;
  const people = children != null ? fromChildren(children) : fromItems(items != null ? items : []);
  const px = resolveAvatarSize(size);
  const limit = Math.max(0, Math.floor(max));
  const visible = people.slice(0, limit);
  const hidden = people.slice(limit);
  const totalCount = Math.max(total != null ? total : people.length, people.length);
  const hiddenCount = totalCount - visible.length;
  const hiddenNames = hidden.map((p) => p.name).filter((n) => Boolean(n));
  const chipLabel = overflowLabel(hiddenCount, hiddenNames);
  const groupLabel = rest["aria-labelledby"] ? rest["aria-label"] : (_b = (_a = rest["aria-label"]) != null ? _a : label) != null ? _b : `${totalCount} ${totalCount === 1 ? "person" : "people"}`;
  const renderAvatar = (person, avatarSize) => {
    var _a2;
    return /* @__PURE__ */ jsx36(Avatar_default, { ...person.props, size: avatarSize, status: (_a2 = person.props.status) != null ? _a2 : "none" });
  };
  const chipContent = renderOverflow ? renderOverflow(hiddenCount) : `+${hiddenCount}`;
  let chip = null;
  if (hiddenCount > 0) {
    if (onOverflowClick) {
      chip = /* @__PURE__ */ jsx36("button", { type: "button", className: "ds-avatar-group__overflow", "aria-label": chipLabel, onClick: onOverflowClick, children: /* @__PURE__ */ jsx36("span", { "aria-hidden": "true", children: chipContent }) });
    } else if (hidden.length === 0) {
      chip = /* @__PURE__ */ jsx36(
        "span",
        {
          className: "ds-avatar-group__overflow",
          "data-static": "true",
          role: "img",
          "aria-label": `${hiddenCount} more ${hiddenCount === 1 ? "person" : "people"}`,
          children: /* @__PURE__ */ jsx36("span", { "aria-hidden": "true", children: chipContent })
        }
      );
    } else {
      chip = /* @__PURE__ */ jsxs32(Popover, { placement: "bottom-start", children: [
        /* @__PURE__ */ jsx36(PopoverTrigger, { className: "ds-avatar-group__overflow", "aria-label": chipLabel, hasPopup: "dialog", children: /* @__PURE__ */ jsx36("span", { "aria-hidden": "true", children: chipContent }) }),
        /* @__PURE__ */ jsx36(
          PopoverContent,
          {
            showPointer: false,
            "aria-label": `${hiddenCount} more ${hiddenCount === 1 ? "person" : "people"}`,
            className: "ds-avatar-group__popover",
            children: /* @__PURE__ */ jsxs32("ul", { className: "ds-avatar-group__list", tabIndex: 0, children: [
              hidden.map((person) => {
                var _a2;
                return /* @__PURE__ */ jsxs32("li", { className: "ds-avatar-group__list-item", children: [
                  /* @__PURE__ */ jsx36("span", { "aria-hidden": "true", className: "ds-avatar-group__list-avatar", children: renderAvatar(person, 24) }),
                  /* @__PURE__ */ jsx36("span", { className: "ds-avatar-group__list-name", children: (_a2 = person.name) != null ? _a2 : "Unnamed" })
                ] }, person.key);
              }),
              hiddenCount > hidden.length ? /* @__PURE__ */ jsx36("li", { className: "ds-avatar-group__list-item ds-avatar-group__list-more", children: `and ${hiddenCount - hidden.length} more` }) : null
            ] })
          }
        )
      ] });
    }
  }
  return /* @__PURE__ */ jsxs32(
    "div",
    {
      ...rest,
      ref,
      role: "group",
      "aria-label": groupLabel,
      className: cls19("ds-avatar-group", className),
      "data-spacing": spacing,
      style: { ["--ag-size"]: `${px}px`, ...style },
      children: [
        visible.map(
          (person) => person.name ? /* @__PURE__ */ jsx36("span", { className: "ds-avatar-group__item", role: "img", "aria-label": person.name, children: /* @__PURE__ */ jsx36("span", { "aria-hidden": "true", className: "ds-avatar-group__avatar", children: renderAvatar(person, px) }) }, person.key) : /* @__PURE__ */ jsx36("span", { className: "ds-avatar-group__item", "aria-hidden": "true", children: /* @__PURE__ */ jsx36("span", { className: "ds-avatar-group__avatar", children: renderAvatar(person, px) }) }, person.key)
        ),
        chip
      ]
    }
  );
});
AvatarGroup.displayName = "AvatarGroup";
var AvatarGroup_default = AvatarGroup;

// src/components/atoms/Rating/index.tsx
import React35, { useId as useId18, useState as useState26 } from "react";

// src/components/atoms/Rating/Rating.config.ts
var RATING_DEFAULTS = {
  max: 5,
  precision: 1,
  size: "md",
  label: "Rating"
};
function defaultRatingLabel(value) {
  return `${value} star${value === 1 ? "" : "s"}`;
}
function readOnlyRatingLabel(value, max) {
  return `${value} out of ${max} stars`;
}
function roundRating(value, precision, max) {
  if (!Number.isFinite(value))
    return 0;
  const rounded = Math.round(value / precision) * precision;
  return Math.min(Math.max(rounded, 0), max);
}
function iconFill(index, value) {
  const diff = value - (index - 1);
  if (diff >= 1)
    return "full";
  if (diff >= 0.5)
    return "half";
  return "empty";
}

// src/components/atoms/Rating/index.tsx
import { jsx as jsx37, jsxs as jsxs33 } from "react/jsx-runtime";
function cls20(...parts) {
  return parts.filter(Boolean).join(" ");
}
var StarShape = /* @__PURE__ */ jsx37("svg", { viewBox: "0 0 24 24", focusable: "false", className: "ds-rating__shape", children: /* @__PURE__ */ jsx37(
  "path",
  {
    d: "M12 2.8l2.83 5.74 6.33.92-4.58 4.46 1.08 6.3L12 17.25l-5.66 2.97 1.08-6.3-4.58-4.46 6.33-.92L12 2.8z",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }
) });
var Rating = React35.forwardRef(function Rating2({
  value: valueProp,
  defaultValue,
  onChange,
  max = RATING_DEFAULTS.max,
  precision = RATING_DEFAULTS.precision,
  readOnly = false,
  disabled = false,
  size = RATING_DEFAULTS.size,
  icon,
  emptyIcon,
  name: nameProp,
  getLabelText = defaultRatingLabel,
  label,
  required = false,
  className,
  onMouseLeave,
  ...rest
}, ref) {
  var _a, _b, _c, _d;
  const autoName = `ds-rating-${useId18().replace(/:/g, "")}`;
  const name = nameProp != null ? nameProp : autoName;
  const count = Math.max(1, Math.floor(max));
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState26(defaultValue != null ? defaultValue : 0);
  const value = isControlled ? valueProp != null ? valueProp : 0 : inner;
  const [hover, setHover] = useState26(null);
  const shown = roundRating(readOnly || disabled ? value : hover != null ? hover : value, precision, count);
  const filledIcon = icon != null ? icon : StarShape;
  const outlineIcon = (_a = emptyIcon != null ? emptyIcon : icon) != null ? _a : StarShape;
  const renderIcon = (index) => {
    const fill = iconFill(index, shown);
    return /* @__PURE__ */ jsxs33("span", { className: "ds-rating__icon", "data-fill": fill, "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx37("span", { className: "ds-rating__layer ds-rating__layer--empty", children: outlineIcon }),
      /* @__PURE__ */ jsx37("span", { className: "ds-rating__layer ds-rating__layer--filled", children: filledIcon })
    ] });
  };
  const indices = Array.from({ length: count }, (_, i) => i + 1);
  const rootClass = cls20("ds-rating", className);
  if (readOnly) {
    return /* @__PURE__ */ jsx37(
      "div",
      {
        ...rest,
        ref,
        role: "img",
        "aria-label": (_b = rest["aria-label"]) != null ? _b : readOnlyRatingLabel(shown, count),
        className: rootClass,
        "data-size": size,
        "data-readonly": "true",
        onMouseLeave,
        children: indices.map((i) => /* @__PURE__ */ jsx37("span", { className: "ds-rating__item", children: renderIcon(i) }, i))
      }
    );
  }
  const steps = (i) => precision === 0.5 ? [i - 0.5, i] : [i];
  const stepId = (step) => `${name}-${String(step).replace(".", "_")}`;
  const stepFromPointer = (e, i) => {
    if (precision !== 0.5)
      return i;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width)
      return i;
    const rtl = typeof window !== "undefined" && window.getComputedStyle(e.currentTarget).direction === "rtl";
    const x = (e.clientX - rect.left) / rect.width;
    const startHalf = rtl ? x > 0.5 : x < 0.5;
    return startHalf ? i - 0.5 : i;
  };
  return /* @__PURE__ */ jsx37(
    "div",
    {
      ...rest,
      ref,
      role: "radiogroup",
      "aria-label": rest["aria-labelledby"] ? rest["aria-label"] : (_d = (_c = rest["aria-label"]) != null ? _c : label) != null ? _d : RATING_DEFAULTS.label,
      "aria-disabled": disabled || void 0,
      "aria-required": required || void 0,
      className: rootClass,
      "data-size": size,
      "data-disabled": disabled ? "true" : void 0,
      onMouseLeave: (e) => {
        setHover(null);
        onMouseLeave == null ? void 0 : onMouseLeave(e);
      },
      children: indices.map((i) => /* @__PURE__ */ jsxs33("span", { className: "ds-rating__item", "data-precision": precision, children: [
        renderIcon(i),
        steps(i).map((step) => /* @__PURE__ */ jsx37(
          "input",
          {
            id: stepId(step),
            className: "ds-rating__input",
            type: "radio",
            name,
            value: step,
            checked: value === step,
            disabled,
            required,
            "aria-label": getLabelText(step),
            onChange: (e) => {
              if (!isControlled)
                setInner(step);
              onChange == null ? void 0 : onChange(step, e);
            }
          },
          step
        )),
        /* @__PURE__ */ jsx37(
          "span",
          {
            className: "ds-rating__hit",
            "aria-hidden": "true",
            onPointerMove: (e) => {
              if (!disabled && e.pointerType !== "touch")
                setHover(stepFromPointer(e, i));
            },
            onMouseEnter: (e) => {
              if (!disabled)
                setHover(stepFromPointer(e, i));
            },
            onClick: (e) => {
              if (disabled)
                return;
              const input = document.getElementById(stepId(stepFromPointer(e, i)));
              if (!input)
                return;
              input.focus({ preventScroll: true });
              input.click();
            }
          }
        )
      ] }, i))
    }
  );
});
Rating.displayName = "Rating";
var Rating_default = Rating;

// src/components/molecules/Timeline/index.tsx
import React36, { createContext as createContext10, useContext as useContext12 } from "react";

// src/components/molecules/Timeline/Timeline.config.ts
var TIMELINE_DEFAULTS = {
  orientation: "vertical",
  align: "start",
  size: "md",
  status: "neutral",
  pendingTitle: "In progress",
  pendingLabel: "Pending"
};
var TIMELINE_STATUS_LABELS = {
  neutral: "",
  primary: "",
  success: "Success",
  warning: "Warning",
  danger: "Error",
  info: "Information"
};
function defaultFormatTimestamp(date) {
  try {
    return new Intl.DateTimeFormat(void 0, { dateStyle: "medium", timeStyle: "short" }).format(date);
  } catch (e) {
    return date.toISOString();
  }
}

// src/components/molecules/Timeline/index.tsx
import { jsx as jsx38, jsxs as jsxs34 } from "react/jsx-runtime";
function cls21(...parts) {
  return parts.filter(Boolean).join(" ");
}
var TimelineFormatContext = createContext10(defaultFormatTimestamp);
function resolveTimestamp(timestamp, format) {
  if (timestamp === void 0 || timestamp === null || timestamp === "")
    return {};
  if (typeof timestamp === "string")
    return { dateTime: timestamp, label: timestamp };
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  if (Number.isNaN(date.getTime()))
    return {};
  return { dateTime: date.toISOString(), label: format(date) };
}
var TimelineItem = React36.forwardRef(function TimelineItem2({
  title,
  description,
  timestamp,
  timestampLabel,
  icon,
  status = TIMELINE_DEFAULTS.status,
  statusLabel,
  pending = false,
  formatTimestamp,
  className,
  ...rest
}, ref) {
  const inheritedFormat = useContext12(TimelineFormatContext);
  const { dateTime, label } = resolveTimestamp(timestamp, formatTimestamp != null ? formatTimestamp : inheritedFormat);
  const srStatus = pending ? TIMELINE_DEFAULTS.pendingLabel : statusLabel !== void 0 ? statusLabel : TIMELINE_STATUS_LABELS[status];
  return /* @__PURE__ */ jsxs34(
    "li",
    {
      ref,
      className: cls21("ds-timeline-item", className),
      "data-status": status,
      "data-pending": pending ? "true" : void 0,
      "data-has-icon": icon != null ? "true" : void 0,
      ...rest,
      children: [
        /* @__PURE__ */ jsx38("span", { className: "ds-timeline-item__marker", "aria-hidden": "true", children: /* @__PURE__ */ jsx38("span", { className: "ds-timeline-item__dot", children: icon }) }),
        /* @__PURE__ */ jsxs34("div", { className: "ds-timeline-item__content", children: [
          dateTime || timestampLabel != null ? /* @__PURE__ */ jsx38("time", { className: "ds-timeline-item__time", dateTime, children: timestampLabel != null ? timestampLabel : label }) : null,
          /* @__PURE__ */ jsxs34("div", { className: "ds-timeline-item__title", children: [
            title,
            srStatus ? /* @__PURE__ */ jsx38("span", { className: "ds-timeline__sr", children: `, ${srStatus}` }) : null
          ] }),
          description != null ? /* @__PURE__ */ jsx38("div", { className: "ds-timeline-item__description", children: description }) : null
        ] })
      ]
    }
  );
});
var Timeline = React36.forwardRef(function Timeline2({
  items,
  children,
  orientation = TIMELINE_DEFAULTS.orientation,
  align = TIMELINE_DEFAULTS.align,
  size = TIMELINE_DEFAULTS.size,
  pending,
  formatTimestamp = defaultFormatTimestamp,
  label,
  className,
  ...rest
}, ref) {
  var _a;
  const horizontal = orientation === "horizontal";
  const pendingTitle = pending === true ? TIMELINE_DEFAULTS.pendingTitle : pending;
  const ariaLabel = (_a = rest["aria-label"]) != null ? _a : label;
  const list = /* @__PURE__ */ jsxs34(
    "ol",
    {
      ...rest,
      ref,
      "aria-label": ariaLabel,
      className: "ds-timeline__list",
      children: [
        items == null ? void 0 : items.map(({ id, ...item }, index) => /* @__PURE__ */ jsx38(TimelineItem, { ...item }, id != null ? id : index)),
        children,
        pending ? /* @__PURE__ */ jsx38(TimelineItem, { title: pendingTitle, pending: true }) : null
      ]
    }
  );
  return /* @__PURE__ */ jsx38(TimelineFormatContext.Provider, { value: formatTimestamp, children: /* @__PURE__ */ jsx38(
    "div",
    {
      className: cls21("ds-timeline", className),
      "data-orientation": orientation,
      "data-align": align,
      "data-size": size,
      role: horizontal ? "region" : void 0,
      "aria-label": horizontal ? ariaLabel != null ? ariaLabel : "Timeline" : void 0,
      tabIndex: horizontal ? 0 : void 0,
      children: list
    }
  ) });
});
Timeline.displayName = "Timeline";
TimelineItem.displayName = "TimelineItem";

// src/components/atoms/Spinner/index.tsx
import React37 from "react";

// src/components/atoms/Spinner/Spinner.config.ts
var SPINNER_DEFAULTS = {
  size: "md",
  tone: "current",
  variant: "ring",
  speed: "normal",
  delay: 0,
  label: "Loading",
  decorative: false
};
var SPINNER_SEGMENTS = 3;

// src/components/atoms/Spinner/index.tsx
import { jsx as jsx39, jsxs as jsxs35 } from "react/jsx-runtime";
function useDelayElapsed(delay) {
  const [elapsed, setElapsed] = React37.useState(() => !(delay > 0));
  React37.useEffect(() => {
    if (!(delay > 0)) {
      setElapsed(true);
      return void 0;
    }
    setElapsed(false);
    const timer = setTimeout(() => setElapsed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return elapsed;
}
var Spinner = React37.forwardRef(function Spinner2({
  size = SPINNER_DEFAULTS.size,
  tone = SPINNER_DEFAULTS.tone,
  variant = SPINNER_DEFAULTS.variant,
  thickness,
  speed = SPINNER_DEFAULTS.speed,
  delay = SPINNER_DEFAULTS.delay,
  label = SPINNER_DEFAULTS.label,
  decorative = SPINNER_DEFAULTS.decorative,
  className,
  ...rest
}, ref) {
  const visible = useDelayElapsed(delay);
  if (!visible)
    return null;
  return /* @__PURE__ */ jsxs35(
    "span",
    {
      ref,
      className: ["ds-spinner", className].filter(Boolean).join(" "),
      "data-size": size,
      "data-tone": tone,
      "data-variant": variant,
      "data-thickness": thickness,
      "data-speed": speed,
      role: decorative ? void 0 : "status",
      "aria-hidden": decorative ? true : void 0,
      ...rest,
      children: [
        variant === "ring" ? /* @__PURE__ */ jsx39("span", { className: "ds-spinner__ring", "aria-hidden": "true" }) : /* @__PURE__ */ jsx39("span", { className: `ds-spinner__${variant}`, "aria-hidden": "true", children: Array.from({ length: SPINNER_SEGMENTS }, (_, i) => /* @__PURE__ */ jsx39("span", { className: "ds-spinner__segment" }, i)) }),
        decorative ? null : /* @__PURE__ */ jsx39("span", { className: "ds-spinner__label", children: label })
      ]
    }
  );
});
Spinner.displayName = "Spinner";
var Spinner_default = Spinner;

// src/components/molecules/LoadingOverlay/index.tsx
import React38, { useCallback as useCallback22, useEffect as useEffect16, useRef as useRef22 } from "react";
import { createPortal as createPortal8 } from "react-dom";

// src/components/molecules/LoadingOverlay/LoadingOverlay.config.ts
var LOADING_OVERLAY_DEFAULTS = {
  visible: true,
  fullScreen: false,
  blocking: true,
  ariaLabel: "Loading",
  backdrop: "surface",
  blockingSpinnerSize: "lg",
  veilSpinnerSize: "sm"
};

// src/components/molecules/LoadingOverlay/index.tsx
import { jsx as jsx40, jsxs as jsxs36 } from "react/jsx-runtime";
var LoadingOverlay = React38.forwardRef(function LoadingOverlay2({
  visible = LOADING_OVERLAY_DEFAULTS.visible,
  fullScreen = LOADING_OVERLAY_DEFAULTS.fullScreen,
  blocking = LOADING_OVERLAY_DEFAULTS.blocking,
  label,
  ariaLabel = LOADING_OVERLAY_DEFAULTS.ariaLabel,
  spinnerSize,
  backdrop = LOADING_OVERLAY_DEFAULTS.backdrop,
  zIndex,
  className,
  style,
  children,
  ...rest
}, forwardedRef) {
  const rootRef = useRef22(null);
  const setRootRef = useCallback22(
    (node) => {
      rootRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  useEffect16(() => {
    var _a;
    if (!visible || !blocking || fullScreen)
      return void 0;
    const parent = (_a = rootRef.current) == null ? void 0 : _a.parentElement;
    if (!parent)
      return void 0;
    const previous = parent.getAttribute("aria-busy");
    parent.setAttribute("aria-busy", "true");
    return () => {
      if (previous == null)
        parent.removeAttribute("aria-busy");
      else
        parent.setAttribute("aria-busy", previous);
    };
  }, [visible, blocking, fullScreen]);
  if (!visible)
    return null;
  const hasLabel = label != null && label !== false && label !== "";
  const size = spinnerSize != null ? spinnerSize : blocking ? LOADING_OVERLAY_DEFAULTS.blockingSpinnerSize : LOADING_OVERLAY_DEFAULTS.veilSpinnerSize;
  const overlay = /* @__PURE__ */ jsx40(
    "div",
    {
      ...rest,
      ref: setRootRef,
      className: ["ds-loading-overlay", className].filter(Boolean).join(" "),
      "data-blocking": blocking ? "true" : "false",
      "data-fullscreen": fullScreen ? "true" : "false",
      "data-backdrop": backdrop,
      style: {
        ...zIndex != null ? { "--ds-loading-overlay-z": zIndex } : null,
        ...style
      },
      children: /* @__PURE__ */ jsxs36("div", { className: "ds-loading-overlay__content", role: "status", "aria-live": "polite", children: [
        /* @__PURE__ */ jsx40(Spinner_default, { size, tone: "primary", decorative: true }),
        hasLabel ? /* @__PURE__ */ jsx40("span", { className: "ds-loading-overlay__label", children: label }) : /* @__PURE__ */ jsx40("span", { className: "sr-only", children: ariaLabel }),
        children
      ] })
    }
  );
  if (fullScreen) {
    return typeof document !== "undefined" ? createPortal8(overlay, document.body) : null;
  }
  return overlay;
});
LoadingOverlay.displayName = "LoadingOverlay";
var LoadingOverlay_default = LoadingOverlay;

// src/components/atoms/Skeleton/index.tsx
import React39 from "react";

// src/components/atoms/Skeleton/Skeleton.config.ts
var SKELETON_DEFAULTS = {
  shape: "text",
  lines: 1,
  animated: true,
  groupLabel: "Loading content"
};
var SKELETON_LAST_LINE_WIDTH = "60%";

// src/components/atoms/Skeleton/index.tsx
import { jsx as jsx41, jsxs as jsxs37 } from "react/jsx-runtime";
function cls22(...parts) {
  return parts.filter(Boolean).join(" ");
}
function toCss(value) {
  if (value === void 0 || value === null)
    return void 0;
  return typeof value === "number" ? `${value}px` : value;
}
var Skeleton = React39.forwardRef(function Skeleton2({
  shape = SKELETON_DEFAULTS.shape,
  lines = SKELETON_DEFAULTS.lines,
  width,
  height,
  radius,
  animated = SKELETON_DEFAULTS.animated,
  className,
  style,
  ...rest
}, ref) {
  var _a;
  const w = toCss(width);
  const h = (_a = toCss(height)) != null ? _a : shape === "circle" ? w : void 0;
  const blockStyle = {
    ...w !== void 0 ? { width: w } : null,
    ...h !== void 0 ? { height: h } : null,
    ...radius !== void 0 ? { borderRadius: toCss(radius) } : null
  };
  const lineCount = shape === "text" ? Math.max(1, Math.floor(lines || 1)) : 1;
  if (lineCount > 1) {
    return /* @__PURE__ */ jsx41(
      "span",
      {
        ref,
        className: cls22("ds-skeleton-lines", className),
        "aria-hidden": "true",
        style,
        ...rest,
        children: Array.from({ length: lineCount }, (_, i) => /* @__PURE__ */ jsx41(
          "span",
          {
            className: "ds-skeleton",
            "data-shape": "text",
            "data-animated": animated ? "true" : "false",
            style: i === lineCount - 1 ? { ...blockStyle, width: SKELETON_LAST_LINE_WIDTH } : blockStyle
          },
          i
        ))
      }
    );
  }
  return /* @__PURE__ */ jsx41(
    "span",
    {
      ref,
      className: cls22("ds-skeleton", className),
      "data-shape": shape,
      "data-animated": animated ? "true" : "false",
      "aria-hidden": "true",
      style: { ...blockStyle, ...style },
      ...rest
    }
  );
});
Skeleton.displayName = "Skeleton";
var SkeletonGroup = React39.forwardRef(function SkeletonGroup2({ label = SKELETON_DEFAULTS.groupLabel, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs37(
    "div",
    {
      ref,
      role: "status",
      className: cls22("ds-skeleton-group", className),
      ...rest,
      children: [
        /* @__PURE__ */ jsx41("span", { className: "ds-skeleton-group__label", children: label }),
        children
      ]
    }
  );
});
SkeletonGroup.displayName = "SkeletonGroup";
var Skeleton_default = Skeleton;

// src/components/molecules/PageHeader/index.tsx
import React40, { useEffect as useEffect17, useLayoutEffect as useLayoutEffect6, useRef as useRef23, useState as useState27 } from "react";

// src/components/molecules/PageHeader/PageHeader.config.ts
var PAGE_HEADER_DEFAULTS = {
  titleAs: "h1",
  maxVisibleActions: 2,
  moreActionsLabel: "More actions"
};
var PAGE_HEADER_COMPACT_QUERY = "(max-width: 640px)";
var PAGE_HEADER_SECONDARY_BUTTON = { variant: "outlineSecondary", size: "md" };
var PAGE_HEADER_MORE_TRIGGER_CLASS = "btn-base btn-outline-secondary btn-size-md btn-rounded-md";

// src/components/molecules/PageHeader/index.tsx
import { jsx as jsx42, jsxs as jsxs38 } from "react/jsx-runtime";
function cls23(...parts) {
  return parts.filter(Boolean).join(" ");
}
function useMatchMedia2(query, onBeforeChange) {
  const beforeRef = useRef23(onBeforeChange);
  beforeRef.current = onBeforeChange;
  const get = () => typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState27(false);
  useEffect17(() => {
    var _a;
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return;
    const mql = window.matchMedia(query);
    const onChange = () => {
      var _a2;
      (_a2 = beforeRef.current) == null ? void 0 : _a2.call(beforeRef, mql.matches);
      setMatches(mql.matches);
    };
    setMatches(get());
    if (typeof mql.addEventListener === "function")
      mql.addEventListener("change", onChange);
    else
      (_a = mql.addListener) == null ? void 0 : _a.call(mql, onChange);
    return () => {
      var _a2;
      if (typeof mql.removeEventListener === "function")
        mql.removeEventListener("change", onChange);
      else
        (_a2 = mql.removeListener) == null ? void 0 : _a2.call(mql, onChange);
    };
  }, [query]);
  return matches;
}
function safeHref(href) {
  return href && isSafeHref(href) ? href : void 0;
}
var MoreIcon = /* @__PURE__ */ jsxs38("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: [
  /* @__PURE__ */ jsx42("circle", { cx: "3.5", cy: "8", r: "1.4", fill: "currentColor" }),
  /* @__PURE__ */ jsx42("circle", { cx: "8", cy: "8", r: "1.4", fill: "currentColor" }),
  /* @__PURE__ */ jsx42("circle", { cx: "12.5", cy: "8", r: "1.4", fill: "currentColor" })
] });
var PageHeader = React40.forwardRef(function PageHeader2({
  title,
  titleAs = PAGE_HEADER_DEFAULTS.titleAs,
  description,
  breadcrumb,
  status,
  meta,
  primaryAction,
  secondaryActions,
  maxVisibleActions = PAGE_HEADER_DEFAULTS.maxVisibleActions,
  moreActionsLabel = PAGE_HEADER_DEFAULTS.moreActionsLabel,
  tabs,
  className,
  ...rest
}, ref) {
  const actionsRef = useRef23(null);
  const moreRef = useRef23(null);
  const pendingFocus = useRef23(null);
  const compact = useMatchMedia2(PAGE_HEADER_COMPACT_QUERY, (next) => {
    var _a;
    if (typeof document === "undefined")
      return;
    const active2 = document.activeElement;
    if (!active2 || !((_a = actionsRef.current) == null ? void 0 : _a.contains(active2)))
      return;
    if (next && active2.closest(".ds-page-header__secondary"))
      pendingFocus.current = "more";
    else if (!next && active2 === moreRef.current)
      pendingFocus.current = "inline";
  });
  const [menuOpen, setMenuOpen] = useState27(false);
  useLayoutEffect6(() => {
    var _a, _b, _c;
    const pending = pendingFocus.current;
    pendingFocus.current = null;
    if (!pending)
      return;
    if (pending === "more") {
      (_a = moreRef.current) == null ? void 0 : _a.focus();
      return;
    }
    const trigger = moreRef.current;
    if (trigger && trigger.isConnected && document.activeElement === trigger)
      return;
    (_c = (_b = actionsRef.current) == null ? void 0 : _b.querySelector(".ds-page-header__secondary")) == null ? void 0 : _c.focus();
  }, [compact]);
  const actions = secondaryActions != null ? secondaryActions : [];
  const inlineCount = compact ? 0 : Math.max(0, Math.floor(maxVisibleActions));
  const inline = actions.slice(0, inlineCount);
  const overflow = actions.slice(inlineCount);
  const hasActions = actions.length > 0 || Boolean(primaryAction);
  const Heading = titleAs;
  const renderInline = (action, index) => {
    const href = action.disabled ? void 0 : safeHref(action.href);
    const common = {
      variant: PAGE_HEADER_SECONDARY_BUTTON.variant,
      size: PAGE_HEADER_SECONDARY_BUTTON.size,
      icon: action.icon,
      disabled: action.disabled,
      className: "ds-page-header__secondary"
    };
    if (href) {
      return /* @__PURE__ */ jsx42(
        Button_default,
        {
          ...common,
          href,
          onClick: action.onClick,
          children: action.label
        },
        `${action.label}-${index}`
      );
    }
    return /* @__PURE__ */ jsx42(
      Button_default,
      {
        ...common,
        type: "button",
        onClick: action.onClick,
        children: action.label
      },
      `${action.label}-${index}`
    );
  };
  const renderMenuItem = (action, index) => {
    const key = `${action.label}-${index}`;
    const iconNode = action.icon ? /* @__PURE__ */ jsx42(Icon_default, { src: action.icon, width: 16, height: 16, className: "ds-dropdown-menu__icon" }) : null;
    const href = action.disabled ? void 0 : safeHref(action.href);
    if (href) {
      return /* @__PURE__ */ jsx42(
        "a",
        {
          role: "menuitem",
          href,
          className: "ds-dropdown-menu__item ds-page-header__menu-link",
          onClick: (e) => {
            var _a;
            (_a = action.onClick) == null ? void 0 : _a.call(action, e);
            setMenuOpen(false);
          },
          children: /* @__PURE__ */ jsxs38("span", { className: "ds-dropdown-menu__item-inner", children: [
            iconNode,
            action.label
          ] })
        },
        key
      );
    }
    return /* @__PURE__ */ jsxs38(
      DropdownMenuItem,
      {
        disabled: action.disabled,
        onClick: (e) => {
          var _a;
          return (_a = action.onClick) == null ? void 0 : _a.call(action, e);
        },
        children: [
          iconNode,
          action.label
        ]
      },
      key
    );
  };
  return /* @__PURE__ */ jsxs38(
    "div",
    {
      ref,
      className: cls23("ds-page-header", className),
      "data-has-tabs": tabs ? "true" : void 0,
      "data-compact": compact ? "true" : void 0,
      ...rest,
      children: [
        breadcrumb ? /* @__PURE__ */ jsx42("div", { className: "ds-page-header__breadcrumb", children: breadcrumb }) : null,
        /* @__PURE__ */ jsxs38("div", { className: "ds-page-header__main", children: [
          /* @__PURE__ */ jsxs38("div", { className: "ds-page-header__heading", children: [
            /* @__PURE__ */ jsxs38("div", { className: "ds-page-header__title-row", children: [
              /* @__PURE__ */ jsx42(Heading, { className: "ds-page-header__title", children: title }),
              status ? /* @__PURE__ */ jsx42("span", { className: "ds-page-header__status", children: status }) : null
            ] }),
            description ? /* @__PURE__ */ jsx42("p", { className: "ds-page-header__description", children: description }) : null,
            meta ? /* @__PURE__ */ jsx42("div", { className: "ds-page-header__meta", children: meta }) : null
          ] }),
          hasActions ? /* @__PURE__ */ jsxs38("div", { ref: actionsRef, className: "ds-page-header__actions", children: [
            inline.map(renderInline),
            overflow.length > 0 ? /* @__PURE__ */ jsxs38(DropdownMenu, { open: menuOpen, onOpenChange: setMenuOpen, placement: "bottom-end", children: [
              /* @__PURE__ */ jsxs38(DropdownMenuTrigger, { ref: moreRef, className: cls23(PAGE_HEADER_MORE_TRIGGER_CLASS, "ds-page-header__more"), children: [
                MoreIcon,
                /* @__PURE__ */ jsx42("span", { className: "ds-page-header__more-label", children: moreActionsLabel })
              ] }),
              /* @__PURE__ */ jsx42(DropdownMenuContent, { children: overflow.map(renderMenuItem) })
            ] }) : null,
            primaryAction ? /* @__PURE__ */ jsx42("span", { className: "ds-page-header__primary", children: primaryAction }) : null
          ] }) : null
        ] }),
        tabs ? /* @__PURE__ */ jsx42("div", { className: "ds-page-header__tabs", children: tabs }) : null
      ]
    }
  );
});
PageHeader.displayName = "PageHeader";

// src/components/molecules/SegmentedControl/index.tsx
import React41, { useCallback as useCallback23, useEffect as useEffect18, useLayoutEffect as useLayoutEffect7, useRef as useRef24, useState as useState28 } from "react";

// src/components/molecules/SegmentedControl/SegmentedControl.config.ts
var SEGMENTED_CONTROL_DEFAULTS = {
  size: "md",
  fullWidth: false
};
var SEGMENTED_CONTROL_SIZES = ["sm", "md"];

// src/components/molecules/SegmentedControl/index.tsx
import { jsx as jsx43, jsxs as jsxs39 } from "react/jsx-runtime";
function isDev2() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
function isTextLabel(label) {
  return typeof label === "string" && label.trim().length > 0 || typeof label === "number";
}
var useIsoLayoutEffect2 = typeof window !== "undefined" ? useLayoutEffect7 : useEffect18;
var SegmentedControl = React41.forwardRef(function SegmentedControl2({
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
  const [inner, setInner] = useState28(defaultValue);
  const selected = isControlled ? valueProp : inner;
  const rootRef = useRef24(null);
  const itemRefs = useRef24([]);
  const focusWithin = useRef24(false);
  const [box, setBox] = useState28(null);
  const setRootRef = useCallback23(
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
  const warned = useRef24(/* @__PURE__ */ new Set());
  useEffect18(() => {
    if (!isDev2())
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
  const measure = useCallback23(() => {
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
  useIsoLayoutEffect2(() => {
    measure();
  }, [measure, options, size, fullWidth]);
  useEffect18(() => {
    if (typeof ResizeObserver === "undefined" || !rootRef.current)
      return void 0;
    const ro = new ResizeObserver(() => measure());
    ro.observe(rootRef.current);
    itemRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [measure, options.length]);
  useEffect18(() => {
    var _a;
    if (!focusWithin.current || typeof document === "undefined")
      return;
    const active2 = document.activeElement;
    if (active2 && active2 !== document.body)
      return;
    if (tabStop >= 0)
      (_a = itemRefs.current[tabStop]) == null ? void 0 : _a.focus();
    else
      focusWithin.current = false;
  }, [tabStop, disabled, options]);
  return /* @__PURE__ */ jsxs39(
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
        /* @__PURE__ */ jsx43(
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
          return /* @__PURE__ */ jsxs39(
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
                opt.icon ? /* @__PURE__ */ jsx43("span", { className: "ds-segmented__icon", "aria-hidden": "true", children: opt.icon }) : null,
                opt.label !== null && opt.label !== void 0 && opt.label !== false ? /* @__PURE__ */ jsx43("span", { className: "ds-segmented__label", "aria-hidden": name && iconOnly ? "true" : void 0, children: opt.label }) : null
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

// src/components/molecules/Wizard/index.tsx
import React42, { useCallback as useCallback24, useEffect as useEffect19, useId as useId19, useLayoutEffect as useLayoutEffect8, useRef as useRef25, useState as useState29 } from "react";

// src/components/molecules/Wizard/Wizard.config.ts
var WIZARD_DEFAULTS = {
  defaultActiveStep: 0,
  linear: true,
  showReview: false,
  reviewTitle: "Review",
  backLabel: "Back",
  nextLabel: "Next",
  finishLabel: "Finish",
  editLabel: "Edit",
  optionalLabel: "Optional",
  loadingLabel: "Submitting\u2026",
  validationTitle: "Check this step",
  validationMessage: "Some information on this step is missing or invalid.",
  headingLevel: 2,
  stepperAriaLabel: "Progress"
};
var defaultStepCounter = (current, total) => `Step ${current} of ${total}`;
function toValidationError(result) {
  if (result === void 0 || result === true)
    return null;
  if (result === false)
    return "";
  if (typeof result === "string")
    return result;
  return null;
}
async function runValidator(validate) {
  if (!validate)
    return null;
  try {
    return toValidationError(await validate());
  } catch (e) {
    return "";
  }
}

// src/components/molecules/Wizard/index.tsx
import { Fragment as Fragment9, jsx as jsx44, jsxs as jsxs40 } from "react/jsx-runtime";
var useIsoLayoutEffect3 = typeof window !== "undefined" ? useLayoutEffect8 : useEffect19;
function isDev3() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
var Wizard = React42.forwardRef(function Wizard2({
  steps,
  activeStep: activeStepProp,
  defaultActiveStep = WIZARD_DEFAULTS.defaultActiveStep,
  onStepChange,
  onComplete,
  linear = WIZARD_DEFAULTS.linear,
  showReview = WIZARD_DEFAULTS.showReview,
  reviewTitle = WIZARD_DEFAULTS.reviewTitle,
  reviewDescription,
  backLabel = WIZARD_DEFAULTS.backLabel,
  nextLabel = WIZARD_DEFAULTS.nextLabel,
  finishLabel = WIZARD_DEFAULTS.finishLabel,
  editLabel = WIZARD_DEFAULTS.editLabel,
  optionalLabel = WIZARD_DEFAULTS.optionalLabel,
  loading: loadingProp,
  loadingLabel = WIZARD_DEFAULTS.loadingLabel,
  validationTitle = WIZARD_DEFAULTS.validationTitle,
  validationMessage = WIZARD_DEFAULTS.validationMessage,
  formatStepCounter = defaultStepCounter,
  headingLevel = WIZARD_DEFAULTS.headingLevel,
  stepperAriaLabel = WIZARD_DEFAULTS.stepperAriaLabel,
  className,
  ...rest
}, ref) {
  const baseId = `ds-wizard-${useId19().replace(/:/g, "")}`;
  const total = steps.length + (showReview ? 1 : 0);
  const reviewIndex = showReview ? steps.length : -1;
  const lastIndex = Math.max(0, total - 1);
  const isControlled = activeStepProp !== void 0;
  const [inner, setInner] = useState29(defaultActiveStep);
  const rawActive = isControlled ? activeStepProp : inner;
  const active2 = Math.min(Math.max(0, rawActive), lastIndex);
  const isReview = active2 === reviewIndex;
  const isLast = active2 === lastIndex;
  const [furthest, setFurthest] = useState29(active2);
  const [error, setError] = useState29(null);
  const [validating, setValidating] = useState29(false);
  const [focusTick, setFocusTick] = useState29(0);
  const [internalLoading, setInternalLoading] = useState29(false);
  const loading = loadingProp !== void 0 ? loadingProp : internalLoading;
  const headingRef = useRef25(null);
  const footerRef = useRef25(null);
  const runId = useRef25(0);
  const pending = useRef25(false);
  const errorSeq = useRef25(0);
  const mounted = useRef25(false);
  const activeRef = useRef25(active2);
  activeRef.current = active2;
  useEffect19(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect19(() => {
    setFurthest((f) => active2 > f ? active2 : f);
  }, [active2]);
  const prevActive = useRef25(active2);
  useIsoLayoutEffect3(() => {
    var _a;
    if (prevActive.current === active2)
      return;
    prevActive.current = active2;
    (_a = headingRef.current) == null ? void 0 : _a.focus();
  }, [active2]);
  useIsoLayoutEffect3(() => {
    var _a;
    if (focusTick > 0)
      (_a = headingRef.current) == null ? void 0 : _a.focus();
  }, [focusTick]);
  const prevLoading = useRef25(loading);
  useIsoLayoutEffect3(() => {
    var _a, _b;
    if (loading && !prevLoading.current && typeof document !== "undefined") {
      const ae = document.activeElement;
      if (!ae || ae === document.body || ((_a = footerRef.current) == null ? void 0 : _a.contains(ae)))
        (_b = headingRef.current) == null ? void 0 : _b.focus();
    }
    prevLoading.current = loading;
  }, [loading]);
  const goTo = useCallback24(
    (index) => {
      const next = Math.min(Math.max(0, index), lastIndex);
      setError(null);
      if (next === active2)
        return;
      if (!isControlled)
        setInner(next);
      onStepChange == null ? void 0 : onStepChange(next);
    },
    [active2, isControlled, lastIndex, onStepChange]
  );
  const fail = (index, message) => {
    errorSeq.current += 1;
    if (index !== active2)
      goTo(index);
    else
      setFocusTick((t) => t + 1);
    setError({ index, message: message || validationMessage, key: errorSeq.current });
  };
  const validateRange = async (from, to) => {
    var _a;
    for (let i = from; i < Math.min(to, steps.length); i += 1) {
      const message = await runValidator((_a = steps[i]) == null ? void 0 : _a.validate);
      if (message !== null)
        return { index: i, message };
    }
    return null;
  };
  const guarded = async (from, to, onValid) => {
    if (pending.current)
      return;
    pending.current = true;
    const id = ++runId.current;
    const startedAt = active2;
    setValidating(true);
    try {
      const failure = await validateRange(from, to);
      if (!mounted.current || id !== runId.current || startedAt !== activeRef.current)
        return;
      if (failure)
        fail(failure.index, failure.message);
      else
        onValid();
    } finally {
      pending.current = false;
      if (mounted.current)
        setValidating(false);
    }
  };
  const finish = () => guarded(0, steps.length, () => {
    setError(null);
    const result = onComplete == null ? void 0 : onComplete();
    const isThenable = !!result && typeof result.then === "function";
    if (!isThenable || loadingProp !== void 0)
      return;
    setInternalLoading(true);
    const settle = () => {
      if (mounted.current)
        setInternalLoading(false);
    };
    result.then(settle, (err) => {
      settle();
      if (isDev3()) {
        console.error("[Wizard] onComplete rejected \u2014 handle errors inside onComplete.", err);
      }
    });
  });
  const handleNext = () => {
    if (loading)
      return;
    if (isLast) {
      void finish();
      return;
    }
    void guarded(active2, active2 + 1, () => goTo(active2 + 1));
  };
  const handleBack = () => {
    if (loading || active2 === 0)
      return;
    runId.current += 1;
    goTo(active2 - 1);
  };
  const handleStepper = (index) => {
    if (loading || index === active2)
      return;
    if (index < active2 || !linear) {
      runId.current += 1;
      goTo(index);
      return;
    }
    if (index > furthest)
      return;
    void guarded(active2, index, () => goTo(index));
  };
  if (total === 0) {
    return /* @__PURE__ */ jsx44("div", { ref, className: ["ds-wizard", className].filter(Boolean).join(" "), ...rest });
  }
  const Heading = `h${headingLevel}`;
  const headingId = `${baseId}-heading`;
  const descId = `${baseId}-desc`;
  const current = isReview ? null : steps[active2];
  const title = isReview ? reviewTitle : current == null ? void 0 : current.title;
  const description = isReview ? reviewDescription : current == null ? void 0 : current.description;
  const hasDescription = description !== void 0 && description !== null && description !== false;
  const showError = error !== null && error.index === active2;
  const stepperDescription = (s) => {
    if (!s.optional)
      return s.description;
    return s.description ? /* @__PURE__ */ jsxs40(Fragment9, { children: [
      s.description,
      /* @__PURE__ */ jsxs40("span", { className: "ds-wizard__optional", children: [
        " \xB7 ",
        optionalLabel
      ] })
    ] }) : /* @__PURE__ */ jsx44("span", { className: "ds-wizard__optional", children: optionalLabel });
  };
  return /* @__PURE__ */ jsxs40(
    "div",
    {
      ref,
      className: ["ds-wizard", className].filter(Boolean).join(" "),
      "data-step": active2,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs40(
          Stepper,
          {
            className: "ds-wizard__stepper",
            value: active2,
            onValueChange: handleStepper,
            linear: false,
            ariaLabel: stepperAriaLabel,
            scrollable: total > 5,
            children: [
              steps.map((s, i) => /* @__PURE__ */ jsx44(
                StepperStep,
                {
                  label: s.title,
                  description: stepperDescription(s),
                  disabled: linear && i > furthest || loading
                },
                s.id
              )),
              showReview ? /* @__PURE__ */ jsx44(
                StepperStep,
                {
                  label: reviewTitle,
                  disabled: linear && reviewIndex > furthest || loading
                },
                `${baseId}-review`
              ) : null
            ]
          }
        ),
        /* @__PURE__ */ jsxs40(
          "div",
          {
            className: "ds-wizard__panel",
            role: "group",
            "aria-labelledby": headingId,
            "aria-describedby": hasDescription ? descId : void 0,
            "aria-busy": validating || loading || void 0,
            children: [
              /* @__PURE__ */ jsxs40(Heading, { ref: headingRef, id: headingId, tabIndex: -1, className: "ds-wizard__heading", children: [
                /* @__PURE__ */ jsx44("span", { className: "ds-wizard__counter", children: formatStepCounter(active2 + 1, total) }),
                /* @__PURE__ */ jsx44("span", { className: "ds-wizard__title", children: title })
              ] }),
              hasDescription ? /* @__PURE__ */ jsx44("p", { id: descId, className: "ds-wizard__description", children: description }) : null,
              showError ? /* @__PURE__ */ jsx44(Alert_default, { className: "ds-wizard__alert", variant: "danger", live: "assertive", title: validationTitle, children: error.message }, error.key) : null,
              steps.map((s, i) => /* @__PURE__ */ jsx44("div", { className: "ds-wizard__content", hidden: i !== active2, "data-step-id": s.id, children: s.content }, s.id)),
              isReview ? /* @__PURE__ */ jsx44("ol", { className: "ds-wizard__review", children: steps.map((s, i) => /* @__PURE__ */ jsxs40("li", { className: "ds-wizard__review-item", children: [
                /* @__PURE__ */ jsxs40("div", { className: "ds-wizard__review-text", children: [
                  /* @__PURE__ */ jsxs40("span", { className: "ds-wizard__review-title", children: [
                    s.title,
                    s.optional ? /* @__PURE__ */ jsxs40("span", { className: "ds-wizard__optional", children: [
                      " \xB7 ",
                      optionalLabel
                    ] }) : null
                  ] }),
                  s.summary !== void 0 && s.summary !== null ? /* @__PURE__ */ jsx44("div", { className: "ds-wizard__review-summary", children: s.summary }) : null
                ] }),
                /* @__PURE__ */ jsxs40(Button_default, { variant: "link", size: "sm", onClick: () => goTo(i), disabled: loading, children: [
                  editLabel,
                  " ",
                  /* @__PURE__ */ jsx44("span", { className: "sr-only", children: s.title })
                ] })
              ] }, s.id)) }) : null
            ]
          }
        ),
        /* @__PURE__ */ jsxs40("div", { ref: footerRef, className: "ds-wizard__footer", children: [
          active2 > 0 ? /* @__PURE__ */ jsx44(Button_default, { variant: "outlineSecondary", onClick: handleBack, disabled: loading, "data-wizard-action": "back", children: backLabel }) : null,
          /* @__PURE__ */ jsx44("div", { className: "ds-wizard__footer-end", children: /* @__PURE__ */ jsx44(
            Button_default,
            {
              variant: "primary",
              onClick: handleNext,
              loading: isLast && loading,
              "data-wizard-action": isLast ? "finish" : "next",
              children: isLast ? finishLabel : nextLabel
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx44("div", { className: "sr-only", role: "status", "aria-live": "polite", children: loading ? loadingLabel : "" })
      ]
    }
  );
});
Wizard.displayName = "Wizard";
var Wizard_default = Wizard;

// src/components/molecules/CommandPalette/index.tsx
import React43, { useCallback as useCallback25, useContext as useContext13, useEffect as useEffect20, useId as useId20, useMemo as useMemo18, useRef as useRef26, useState as useState30 } from "react";
import { createPortal as createPortal9 } from "react-dom";

// src/components/molecules/CommandPalette/CommandPalette.config.ts
var COMMAND_PALETTE_DEFAULTS = {
  placeholder: "Type a command or search\u2026",
  emptyState: "No results found.",
  searchDebounceMs: 200,
  shouldFilter: true,
  hotkey: ["mod", "k"],
  enableHotkey: true,
  allowInInputs: false,
  closeOnSelect: true,
  returnFocus: true,
  ariaLabel: "Command palette",
  inputLabel: "Search commands",
  listLabel: "Commands",
  closeLabel: "Close",
  loadingLabel: "Loading results\u2026",
  announceDelayMs: 500,
  showFooter: true
};
function defaultResultsLabel(count) {
  if (count === 0)
    return "No results";
  return count === 1 ? "1 result" : `${count} results`;
}
var COMMAND_SCORES = {
  labelExact: 120,
  labelPrefix: 100,
  labelWordStart: 70,
  labelSubstring: 40,
  keywordExact: 60,
  keywordPrefix: 50,
  keywordSubstring: 20,
  descriptionWordStart: 15,
  descriptionSubstring: 8
};

// src/components/molecules/CommandPalette/CommandPalette.utils.ts
function normalizeText(value) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}
function tokenize(query) {
  const normalized = normalizeText(query);
  return normalized ? normalized.split(" ") : [];
}
function matchesWordStart(text, token) {
  let from = text.indexOf(token, 1);
  while (from > 0) {
    if (/[\s\-_/.:,()[\]]/.test(text[from - 1]))
      return true;
    from = text.indexOf(token, from + 1);
  }
  return false;
}
function scoreLabel(label, token) {
  if (label.startsWith(token))
    return COMMAND_SCORES.labelPrefix;
  if (matchesWordStart(label, token))
    return COMMAND_SCORES.labelWordStart;
  if (label.includes(token))
    return COMMAND_SCORES.labelSubstring;
  return 0;
}
function scoreKeyword(keyword, token) {
  if (keyword === token)
    return COMMAND_SCORES.keywordExact;
  if (keyword.startsWith(token))
    return COMMAND_SCORES.keywordPrefix;
  if (keyword.includes(token))
    return COMMAND_SCORES.keywordSubstring;
  return 0;
}
function scoreDescription(description, token) {
  if (description.startsWith(token) || matchesWordStart(description, token))
    return COMMAND_SCORES.descriptionWordStart;
  if (description.includes(token))
    return COMMAND_SCORES.descriptionSubstring;
  return 0;
}
function scoreItem(item, query) {
  var _a;
  const tokens = tokenize(query);
  if (tokens.length === 0)
    return 1;
  const label = normalizeText(item.label);
  const keywords = ((_a = item.keywords) != null ? _a : []).map(normalizeText).filter(Boolean);
  const description = item.description ? normalizeText(item.description) : "";
  let total = 0;
  for (const token of tokens) {
    let best = scoreLabel(label, token);
    for (const keyword of keywords)
      best = Math.max(best, scoreKeyword(keyword, token));
    if (description)
      best = Math.max(best, scoreDescription(description, token));
    if (best === 0)
      return 0;
    total += best;
  }
  if (label === tokens.join(" "))
    total += COMMAND_SCORES.labelExact;
  return total;
}
function optionKey(groupId, itemId) {
  return `${groupId}::${itemId}`;
}
function listGroups(groups, keyPrefix = "") {
  return groups.filter((group) => group.items.length > 0).map((group) => ({
    group,
    options: group.items.map((item) => ({
      key: keyPrefix + optionKey(group.id, item.id),
      groupId: group.id,
      item,
      score: 0
    }))
  }));
}
function rankGroups(groups, query) {
  if (tokenize(query).length === 0)
    return listGroups(groups);
  const ranked = [];
  groups.forEach((group, index) => {
    const options = [];
    group.items.forEach((item, order) => {
      const score = scoreItem(item, query);
      if (score > 0)
        options.push({ key: optionKey(group.id, item.id), groupId: group.id, item, score, order });
    });
    if (options.length === 0)
      return;
    options.sort((a, b) => b.score - a.score || a.order - b.order);
    ranked.push({
      group,
      options: options.map(({ order: _order, ...rest }) => rest),
      best: options[0].score,
      index
    });
  });
  ranked.sort((a, b) => b.best - a.best || a.index - b.index);
  return ranked.map(({ group, options }) => ({ group, options }));
}
function flattenOptions(groups) {
  return groups.flatMap((g) => g.options);
}
function toDomId(value) {
  return value.replace(/[^A-Za-z0-9_-]/g, (ch) => `_${ch.charCodeAt(0).toString(16)}`);
}
function isEditableTarget(target) {
  if (!target || typeof target.closest !== "function")
    return false;
  const el = target;
  if (el.isContentEditable)
    return true;
  if (el.closest("[contenteditable]:not([contenteditable='false'])"))
    return true;
  const tag = el.tagName;
  if (tag === "TEXTAREA" || tag === "SELECT")
    return true;
  if (tag === "INPUT") {
    const type = (el.type || "text").toLowerCase();
    return !["button", "submit", "reset", "checkbox", "radio", "range", "color", "file", "image"].includes(type);
  }
  return false;
}
var MODIFIERS = /* @__PURE__ */ new Set(["mod", "ctrl", "control", "meta", "cmd", "alt", "option", "shift"]);
function matchesHotkey(event, hotkey, isMac) {
  const parts = hotkey.map((k) => k.trim().toLowerCase()).filter(Boolean);
  const key = parts.find((p) => !MODIFIERS.has(p));
  if (!key)
    return false;
  let ctrl = false;
  let meta = false;
  let alt = false;
  let shift = false;
  for (const p of parts) {
    if (p === "mod") {
      if (isMac)
        meta = true;
      else
        ctrl = true;
    } else if (p === "ctrl" || p === "control")
      ctrl = true;
    else if (p === "meta" || p === "cmd")
      meta = true;
    else if (p === "alt" || p === "option")
      alt = true;
    else if (p === "shift")
      shift = true;
  }
  if (event.ctrlKey !== ctrl || event.metaKey !== meta || event.altKey !== alt || event.shiftKey !== shift) {
    return false;
  }
  const eventKey = (event.key || "").toLowerCase();
  if (eventKey === key)
    return true;
  const code = event.code || "";
  if (key.length === 1 && /[a-z]/.test(key))
    return code === `Key${key.toUpperCase()}`;
  if (key.length === 1 && /[0-9]/.test(key))
    return code === `Digit${key}`;
  return false;
}

// src/components/molecules/CommandPalette/index.tsx
import { jsx as jsx45, jsxs as jsxs41 } from "react/jsx-runtime";
function SearchGlyph() {
  return /* @__PURE__ */ jsxs41("svg", { viewBox: "0 0 20 20", width: "18", height: "18", "aria-hidden": true, focusable: "false", children: [
    /* @__PURE__ */ jsx45("circle", { cx: "9", cy: "9", r: "5.5", fill: "none", stroke: "currentColor", strokeWidth: "1.75" }),
    /* @__PURE__ */ jsx45("path", { d: "M13.2 13.2 17 17", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" })
  ] });
}
function CloseGlyph2() {
  return /* @__PURE__ */ jsx45("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx45("path", { d: "M4 4l8 8M12 4l-8 8", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
var NO_GROUPS = [];
var CommandPalette = React43.forwardRef(function CommandPalette2({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  groups,
  recent,
  placeholder = COMMAND_PALETTE_DEFAULTS.placeholder,
  emptyState = COMMAND_PALETTE_DEFAULTS.emptyState,
  onSearch,
  searchDebounceMs = COMMAND_PALETTE_DEFAULTS.searchDebounceMs,
  loading = false,
  shouldFilter = COMMAND_PALETTE_DEFAULTS.shouldFilter,
  hotkey = COMMAND_PALETTE_DEFAULTS.hotkey,
  enableHotkey = COMMAND_PALETTE_DEFAULTS.enableHotkey,
  allowInInputs = COMMAND_PALETTE_DEFAULTS.allowInInputs,
  closeOnSelect = COMMAND_PALETTE_DEFAULTS.closeOnSelect,
  returnFocus = COMMAND_PALETTE_DEFAULTS.returnFocus,
  ariaLabel = COMMAND_PALETTE_DEFAULTS.ariaLabel,
  inputLabel = COMMAND_PALETTE_DEFAULTS.inputLabel,
  listLabel = COMMAND_PALETTE_DEFAULTS.listLabel,
  closeLabel = COMMAND_PALETTE_DEFAULTS.closeLabel,
  loadingLabel = COMMAND_PALETTE_DEFAULTS.loadingLabel,
  resultsLabel = defaultResultsLabel,
  announceDelayMs = COMMAND_PALETTE_DEFAULTS.announceDelayMs,
  showFooter = COMMAND_PALETTE_DEFAULTS.showFooter,
  className,
  id
}, forwardedRef) {
  var _a;
  const autoId = useId20();
  const layerId = `command-palette-${autoId}`;
  const parentLayerId = useContext13(OverlayLayerContext);
  const baseId = id != null ? id : `ds-command-palette-${autoId.replace(/[^A-Za-z0-9_-]/g, "")}`;
  const inputId = `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;
  const isMac = useIsMac();
  const isControlled = openProp !== void 0;
  const [internalOpen, setInternalOpen] = useState30(defaultOpen);
  const isOpen = isControlled ? !!openProp : internalOpen;
  const isOpenRef = useRef26(isOpen);
  isOpenRef.current = isOpen;
  const onOpenChangeRef = useRef26(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  const setOpen = useCallback25(
    (next) => {
      var _a2;
      if (!isControlled)
        setInternalOpen(next);
      (_a2 = onOpenChangeRef.current) == null ? void 0 : _a2.call(onOpenChangeRef, next);
    },
    [isControlled]
  );
  const setOpenRef = useRef26(setOpen);
  setOpenRef.current = setOpen;
  const panelRef = useRef26(null);
  const inputRef = useRef26(null);
  const listboxRef = useRef26(null);
  const lastFocusedRef = useRef26(null);
  const ownedFocusTargetRef = useRef26(null);
  const returnFocusRef = useRef26(returnFocus);
  returnFocusRef.current = returnFocus;
  const hotkeyRef = useRef26(hotkey);
  hotkeyRef.current = hotkey;
  const allowInInputsRef = useRef26(allowInInputs);
  allowInInputsRef.current = allowInInputs;
  const onSearchRef = useRef26(onSearch);
  onSearchRef.current = onSearch;
  const pendingSelectRef = useRef26(null);
  const [selectTick, setSelectTick] = useState30(0);
  const setPanelRef = useCallback25(
    (node) => {
      panelRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  const [query, setQuery] = useState30("");
  const [activeKey, setActiveKey] = useState30(null);
  const [remoteGroups, setRemoteGroups] = useState30(NO_GROUPS);
  const [searching, setSearching] = useState30(false);
  const hasOnSearch = typeof onSearch === "function";
  useEffect20(() => {
    if (isOpen)
      return;
    setQuery("");
    setActiveKey(null);
    setRemoteGroups(NO_GROUPS);
    setSearching(false);
  }, [isOpen]);
  useEffect20(() => {
    if (!isOpen || !hasOnSearch)
      return void 0;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      const search = onSearchRef.current;
      if (!search)
        return;
      let result;
      try {
        result = search(query, { signal: controller.signal });
      } catch (e) {
        setRemoteGroups(NO_GROUPS);
        setSearching(false);
        return;
      }
      if (result && typeof result.then === "function") {
        setSearching(true);
        result.then(
          (value) => {
            if (controller.signal.aborted)
              return;
            setRemoteGroups(Array.isArray(value) ? value : NO_GROUPS);
            setSearching(false);
          },
          () => {
            if (controller.signal.aborted)
              return;
            setRemoteGroups(NO_GROUPS);
            setSearching(false);
          }
        );
      } else {
        setRemoteGroups(Array.isArray(result) ? result : NO_GROUPS);
        setSearching(false);
      }
    }, searchDebounceMs);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [isOpen, hasOnSearch, query, searchDebounceMs]);
  const isLoading = loading || searching;
  const hasQuery = query.trim().length > 0;
  const rankedGroups = useMemo18(() => {
    const showRecent = !hasQuery && recent && recent.items.length > 0;
    const local = shouldFilter ? rankGroups(groups, query) : listGroups(groups);
    return [
      ...showRecent && recent ? listGroups([recent], "recent:") : [],
      ...local,
      ...listGroups(remoteGroups, "remote:")
    ];
  }, [groups, recent, query, hasQuery, shouldFilter, remoteGroups]);
  const options = useMemo18(() => flattenOptions(rankedGroups), [rankedGroups]);
  const enabledOptions = useMemo18(() => options.filter((o) => !o.item.disabled), [options]);
  const activeOption = (_a = enabledOptions.find((o) => o.key === activeKey)) != null ? _a : enabledOptions[0];
  const optionDomId = (key) => `${baseId}-option-${toDomId(key)}`;
  const activeDomId = activeOption ? optionDomId(activeOption.key) : void 0;
  useEffect20(() => {
    if (!isOpen || !activeDomId)
      return;
    const el = typeof document !== "undefined" ? document.getElementById(activeDomId) : null;
    if (el && typeof el.scrollIntoView === "function")
      el.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeDomId]);
  const resultsLabelRef = useRef26(resultsLabel);
  resultsLabelRef.current = resultsLabel;
  const pendingMessage = !isOpen ? "" : isLoading ? loadingLabel : hasQuery ? resultsLabelRef.current(options.length) : "";
  const [announcement, setAnnouncement] = useState30("");
  useEffect20(() => {
    if (!isOpen) {
      setAnnouncement("");
      return void 0;
    }
    const timer = setTimeout(() => setAnnouncement(pendingMessage), announceDelayMs);
    return () => clearTimeout(timer);
  }, [isOpen, pendingMessage, query, announceDelayMs]);
  useEffect20(() => {
    if (!enableHotkey || typeof document === "undefined")
      return void 0;
    const onKeyDown = (e) => {
      var _a2, _b;
      if (e.defaultPrevented || e.isComposing || e.repeat)
        return;
      if (!matchesHotkey(e, hotkeyRef.current, detectIsMac()))
        return;
      const target = (_a2 = typeof e.composedPath === "function" ? e.composedPath()[0] : null) != null ? _a2 : e.target;
      const insidePalette = target instanceof Node && !!((_b = panelRef.current) == null ? void 0 : _b.contains(target));
      if (!insidePalette && !allowInInputsRef.current && isEditableTarget(target))
        return;
      if (isOpenRef.current) {
        if (!isTopLayer(layerId))
          return;
        e.preventDefault();
        setOpenRef.current(false);
      } else {
        e.preventDefault();
        setOpenRef.current(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [enableHotkey, layerId]);
  useEffect20(() => {
    if (!isOpen)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [isOpen, layerId, parentLayerId]);
  useEffect20(() => {
    if (!isOpen)
      return void 0;
    const onFocusIn = (e) => {
      var _a2;
      const panel = panelRef.current;
      const target = e.target;
      if (!panel || !(target instanceof Node))
        return;
      if (panel.contains(target)) {
        ownedFocusTargetRef.current = null;
        lastFocusedRef.current = target;
        return;
      }
      const owned = ownedFocusTargetRef.current === target;
      ownedFocusTargetRef.current = null;
      if (owned)
        return;
      if (!isTopLayer(layerId))
        return;
      const allowed = target instanceof Element ? target : target.parentElement;
      if (allowed == null ? void 0 : allowed.closest("[data-overlay-allow]"))
        return;
      const fallback = lastFocusedRef.current && panel.contains(lastFocusedRef.current) ? lastFocusedRef.current : (_a2 = inputRef.current) != null ? _a2 : panel;
      fallback.focus({ preventScroll: true });
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [isOpen, layerId]);
  useEffect20(() => {
    var _a2, _b;
    if (!isOpen)
      return void 0;
    const previous = typeof document !== "undefined" ? document.activeElement : null;
    const panel = panelRef.current;
    (_b = (_a2 = inputRef.current) != null ? _a2 : panel) == null ? void 0 : _b.focus({ preventScroll: true });
    return () => {
      if (!returnFocusRef.current || !previous || previous === document.body)
        return;
      if (!previous.isConnected || typeof previous.focus !== "function")
        return;
      const active2 = document.activeElement;
      const focusLost = !active2 || active2 === document.body || panel != null && panel.contains(active2);
      if (focusLost)
        previous.focus({ preventScroll: true });
    };
  }, [isOpen]);
  useEffect20(() => {
    if (!isOpen)
      return void 0;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [isOpen]);
  useEffect20(() => {
    if (!isOpen)
      return void 0;
    const onKeyDown = (e) => {
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing)
        return;
      if (!isTopLayer(layerId))
        return;
      e.preventDefault();
      e.stopPropagation();
      setOpenRef.current(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, layerId]);
  useEffect20(() => {
    const item = pendingSelectRef.current;
    if (!item)
      return;
    pendingSelectRef.current = null;
    item.onSelect(item);
  }, [selectTick]);
  const selectOption = (option) => {
    if (!option || option.item.disabled)
      return;
    if (closeOnSelect) {
      pendingSelectRef.current = option.item;
      setSelectTick((n) => n + 1);
      setOpen(false);
    } else {
      option.item.onSelect(option.item);
    }
  };
  const moveActive = (to) => {
    const count = enabledOptions.length;
    if (count === 0)
      return;
    const current = activeOption ? enabledOptions.indexOf(activeOption) : -1;
    let index = 0;
    if (to === "first")
      index = 0;
    else if (to === "last")
      index = count - 1;
    else if (to === "next")
      index = current < 0 ? 0 : (current + 1) % count;
    else
      index = current < 0 ? count - 1 : (current - 1 + count) % count;
    setActiveKey(enabledOptions[index].key);
  };
  const handleInputKeyDown = (e) => {
    if (e.nativeEvent.isComposing)
      return;
    const plain = !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveActive("next");
        break;
      case "ArrowUp":
        e.preventDefault();
        moveActive("prev");
        break;
      case "Home":
        if (!plain || enabledOptions.length === 0)
          return;
        e.preventDefault();
        moveActive("first");
        break;
      case "End":
        if (!plain || enabledOptions.length === 0)
          return;
        e.preventDefault();
        moveActive("last");
        break;
      case "Enter":
        if (!activeOption)
          return;
        e.preventDefault();
        selectOption(activeOption);
        break;
      default:
        break;
    }
  };
  if (!isOpen || typeof document === "undefined")
    return null;
  const hasOptions = options.length > 0;
  const showEmpty = !hasOptions && !isLoading;
  return createPortal9(
    /* @__PURE__ */ jsx45(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs41(
      "div",
      {
        className: "ds-command-palette-root",
        onFocusCapture: (e) => {
          ownedFocusTargetRef.current = e.target;
        },
        children: [
          /* @__PURE__ */ jsx45(
            "div",
            {
              className: "ds-command-palette__backdrop",
              "aria-hidden": "true",
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => {
                if (isTopLayer(layerId))
                  setOpen(false);
              }
            }
          ),
          /* @__PURE__ */ jsxs41(
            "div",
            {
              ref: setPanelRef,
              id: baseId,
              role: "dialog",
              "aria-modal": "true",
              "aria-label": ariaLabel,
              tabIndex: -1,
              className: ["ds-command-palette", className].filter(Boolean).join(" "),
              onKeyDown: (e) => {
                if (panelRef.current)
                  trapTabKey(e.nativeEvent, panelRef.current);
              },
              children: [
                /* @__PURE__ */ jsxs41("div", { className: "ds-command-palette__search", children: [
                  /* @__PURE__ */ jsx45("span", { className: "ds-command-palette__search-icon", children: /* @__PURE__ */ jsx45(SearchGlyph, {}) }),
                  /* @__PURE__ */ jsx45(
                    "input",
                    {
                      ref: inputRef,
                      id: inputId,
                      className: "ds-command-palette__input",
                      type: "text",
                      role: "combobox",
                      "aria-label": inputLabel,
                      "aria-expanded": hasOptions,
                      "aria-controls": listboxId,
                      "aria-autocomplete": "list",
                      "aria-activedescendant": activeDomId,
                      autoComplete: "off",
                      autoCorrect: "off",
                      autoCapitalize: "off",
                      spellCheck: false,
                      enterKeyHint: "go",
                      placeholder,
                      value: query,
                      onChange: (e) => {
                        setQuery(e.target.value);
                        setActiveKey(null);
                      },
                      onKeyDown: handleInputKeyDown
                    }
                  ),
                  /* @__PURE__ */ jsx45(
                    "button",
                    {
                      type: "button",
                      className: "ds-command-palette__close",
                      "aria-label": closeLabel,
                      onClick: () => setOpen(false),
                      children: /* @__PURE__ */ jsx45(CloseGlyph2, {})
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs41("div", { className: "ds-command-palette__body", children: [
                  /* @__PURE__ */ jsx45(
                    "div",
                    {
                      ref: listboxRef,
                      id: listboxId,
                      role: "listbox",
                      "aria-label": listLabel,
                      "aria-busy": isLoading || void 0,
                      className: "ds-command-palette__list",
                      hidden: !hasOptions,
                      children: rankedGroups.map(({ group, options: groupOptions }, groupIndex) => {
                        const headingId = `${baseId}-group-${groupIndex}-${toDomId(group.id)}`;
                        return /* @__PURE__ */ jsxs41(
                          "div",
                          {
                            role: "group",
                            "aria-labelledby": headingId,
                            className: "ds-command-palette__group",
                            children: [
                              /* @__PURE__ */ jsx45("div", { role: "presentation", id: headingId, className: "ds-command-palette__group-label", children: group.label }),
                              groupOptions.map((option) => {
                                const { item } = option;
                                const active2 = (activeOption == null ? void 0 : activeOption.key) === option.key;
                                return /* @__PURE__ */ jsxs41(
                                  "div",
                                  {
                                    id: optionDomId(option.key),
                                    role: "option",
                                    "aria-selected": active2,
                                    "aria-disabled": item.disabled ? true : void 0,
                                    "aria-keyshortcuts": item.shortcut && item.shortcut.length > 0 ? toAriaKeyShortcuts(item.shortcut, isMac) : void 0,
                                    "data-active": active2 ? "true" : void 0,
                                    className: "ds-command-palette__option",
                                    onMouseDown: (e) => e.preventDefault(),
                                    onMouseMove: () => {
                                      if (!item.disabled && !active2)
                                        setActiveKey(option.key);
                                    },
                                    onClick: () => selectOption(option),
                                    children: [
                                      item.icon != null ? /* @__PURE__ */ jsx45("span", { className: "ds-command-palette__option-icon", "aria-hidden": "true", children: item.icon }) : null,
                                      /* @__PURE__ */ jsxs41("span", { className: "ds-command-palette__option-text", children: [
                                        /* @__PURE__ */ jsx45("span", { className: "ds-command-palette__option-label", children: item.label }),
                                        item.description ? /* @__PURE__ */ jsx45("span", { className: "ds-command-palette__option-description", children: item.description }) : null
                                      ] }),
                                      item.shortcut && item.shortcut.length > 0 ? /* @__PURE__ */ jsx45(Kbd_default, { keys: item.shortcut, className: "ds-command-palette__option-kbd", "aria-hidden": "true" }) : null
                                    ]
                                  },
                                  option.key
                                );
                              })
                            ]
                          },
                          `${groupIndex}-${group.id}`
                        );
                      })
                    }
                  ),
                  isLoading ? /* @__PURE__ */ jsxs41("div", { className: "ds-command-palette__loading", "aria-hidden": "true", children: [
                    /* @__PURE__ */ jsx45(Spinner_default, { size: "xs", tone: "muted", decorative: true }),
                    /* @__PURE__ */ jsx45("span", { children: loadingLabel })
                  ] }) : null,
                  showEmpty ? /* @__PURE__ */ jsx45("div", { className: "ds-command-palette__empty", children: emptyState }) : null
                ] }),
                showFooter ? /* @__PURE__ */ jsxs41("div", { className: "ds-command-palette__footer", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsxs41("span", { className: "ds-command-palette__hint", children: [
                    /* @__PURE__ */ jsx45(Kbd_default, { keys: ["up"] }),
                    /* @__PURE__ */ jsx45(Kbd_default, { keys: ["down"] }),
                    /* @__PURE__ */ jsx45("span", { children: "to navigate" })
                  ] }),
                  /* @__PURE__ */ jsxs41("span", { className: "ds-command-palette__hint", children: [
                    /* @__PURE__ */ jsx45(Kbd_default, { keys: ["enter"] }),
                    /* @__PURE__ */ jsx45("span", { children: "to select" })
                  ] }),
                  /* @__PURE__ */ jsxs41("span", { className: "ds-command-palette__hint", children: [
                    /* @__PURE__ */ jsx45(Kbd_default, { keys: ["esc"] }),
                    /* @__PURE__ */ jsx45("span", { children: "to close" })
                  ] })
                ] }) : null,
                /* @__PURE__ */ jsx45("div", { className: "ds-command-palette__sr", role: "status", "aria-live": "polite", "aria-atomic": "true", children: announcement })
              ]
            }
          )
        ]
      }
    ) }),
    document.body
  );
});
CommandPalette.displayName = "CommandPalette";
var CommandPalette_default = CommandPalette;

// src/components/atoms/NumberInput/index.tsx
import React44, { useCallback as useCallback26, useEffect as useEffect21, useId as useId21, useMemo as useMemo19, useRef as useRef27, useState as useState31 } from "react";

// src/components/atoms/NumberInput/NumberInput.config.ts
var NUMBER_INPUT_DEFAULTS = {
  step: 1,
  size: "md",
  showSteppers: true,
  allowNegative: true,
  clampOnBlur: true,
  incrementLabel: "Increase",
  decrementLabel: "Decrease"
};
var NUMBER_INPUT_LARGE_STEP = 10;
var NUMBER_INPUT_REPEAT_DELAY_MS = 400;
var NUMBER_INPUT_REPEAT_INTERVAL_MS = 60;

// src/components/atoms/NumberInput/NumberInput.utils.ts
var MINUS_CHARS = ["-", "\u2212", "\u2012", "\u2013", "\uFE63", "\uFF0D"];
var SPACE_RE = /[\s   ‎‏؜]/g;
function escapeRegExp2(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function safeNumberFormat(locale, options) {
  try {
    return new Intl.NumberFormat(locale, options);
  } catch (e) {
    try {
      return new Intl.NumberFormat(locale);
    } catch (e2) {
      return new Intl.NumberFormat();
    }
  }
}
function affixOptions(options) {
  if (!options)
    return {};
  const { style, currency, currencyDisplay, currencySign, unit, unitDisplay } = options;
  return { style, currency, currencyDisplay, currencySign, unit, unitDisplay };
}
var infoCache = /* @__PURE__ */ new Map();
function getNumberLocaleInfo(locale, options) {
  const key = `${locale != null ? locale : ""}|${JSON.stringify(options != null ? options : {})}`;
  const cached = infoCache.get(key);
  if (cached)
    return cached;
  const parts = safeNumberFormat(locale, {
    ...affixOptions(options),
    useGrouping: true,
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).formatToParts(-12345675e-1);
  let group = ",";
  let decimal = ".";
  let minus = "-";
  const literals = /* @__PURE__ */ new Set();
  for (const p of parts) {
    if (p.type === "group")
      group = p.value;
    else if (p.type === "decimal")
      decimal = p.value;
    else if (p.type === "minusSign")
      minus = p.value;
    else if (p.type === "currency" || p.type === "percentSign" || p.type === "unit" || p.type === "literal") {
      const v = p.value.replace(SPACE_RE, "").replace(/[()+]/g, "");
      if (v && !MINUS_CHARS.includes(v))
        literals.add(v);
    }
  }
  const intGroups = safeNumberFormat(locale, { useGrouping: true, maximumFractionDigits: 0 }).formatToParts(1234567890).filter((p) => p.type === "integer").map((p) => p.value.length);
  const primaryGroupSize = intGroups.length > 1 ? intGroups[intGroups.length - 1] : 3;
  const secondaryGroupSize = intGroups.length > 2 ? intGroups[intGroups.length - 2] : primaryGroupSize;
  if ((options == null ? void 0 : options.style) === "percent")
    literals.add("%");
  if ((options == null ? void 0 : options.style) === "currency" && options.currency)
    literals.add(options.currency.toUpperCase());
  const plain = safeNumberFormat(locale, { useGrouping: false, maximumFractionDigits: 0 });
  const digits = Array.from({ length: 10 }, (_, i) => plain.format(i));
  const compact = [];
  if ((options == null ? void 0 : options.notation) === "compact") {
    const cf = safeNumberFormat(locale, {
      notation: "compact",
      compactDisplay: options.compactDisplay,
      maximumFractionDigits: 0
    });
    const seen = /* @__PURE__ */ new Set();
    for (let exp = 3; exp <= 15; exp += 1) {
      const p = cf.formatToParts(10 ** exp);
      const suffix = p.filter((x) => x.type === "compact").map((x) => x.value.replace(SPACE_RE, "")).join("");
      const intText = p.filter((x) => x.type === "integer").map((x) => x.value).join("");
      const intValue = Number(
        intText.split("").map((ch) => {
          const i = digits.indexOf(ch);
          return i >= 0 ? String(i) : ch;
        }).join("")
      );
      if (!suffix || seen.has(suffix) || !intValue)
        continue;
      seen.add(suffix);
      compact.push({ suffix, multiplier: 10 ** exp / intValue });
    }
    compact.sort((a, b) => b.suffix.length - a.suffix.length);
  }
  const info = {
    group,
    decimal,
    minus,
    digits,
    literals: Array.from(literals).sort((a, b) => b.length - a.length),
    compact,
    percent: (options == null ? void 0 : options.style) === "percent",
    primaryGroupSize,
    secondaryGroupSize
  };
  infoCache.set(key, info);
  return info;
}
function cleanFloat(n) {
  return Number.isFinite(n) ? Number(n.toPrecision(15)) : n;
}
var GROUP_TOKEN = "\0";
var DIGIT_RUN = "[0-9]";
function parseLocaleNumber(text, locale, options) {
  const info = getNumberLocaleInfo(locale, options);
  if (text.replace(SPACE_RE, "") === "")
    return null;
  let s = text.split("").map((ch) => {
    const i = info.digits.indexOf(ch);
    return i >= 0 ? String(i) : ch;
  }).join("");
  const groupIsSpace = info.group.replace(SPACE_RE, "") === "";
  const groupIsApostrophe = /^['’]$/.test(info.group);
  if (groupIsSpace) {
    s = s.trim().replace(/([0-9])[\s\u00A0\u202F\u2009]+(?=[0-9])/g, `$1${GROUP_TOKEN}`);
  } else if (groupIsApostrophe) {
    s = s.replace(/['’]/g, GROUP_TOKEN);
  } else if (info.group !== info.decimal) {
    s = s.split(info.group).join(GROUP_TOKEN);
  }
  s = s.replace(SPACE_RE, "");
  let multiplier = 1;
  for (const { suffix, multiplier: mul } of info.compact) {
    const re = new RegExp(`${escapeRegExp2(suffix)}(?=[)\\-\u2212]?$)`, "i");
    if (re.test(s)) {
      multiplier = mul;
      s = s.replace(re, "");
      break;
    }
  }
  for (const lit of info.literals) {
    if (lit === info.decimal)
      continue;
    s = s.split(lit).join("");
  }
  s = s.replace(/%/g, "");
  let negative = false;
  const paren = /^\((.*)\)$/.exec(s);
  if (paren) {
    negative = true;
    s = paren[1];
  }
  for (const m of /* @__PURE__ */ new Set([info.minus, ...MINUS_CHARS]))
    s = s.split(m).join("-");
  const signMatch = /^([-+]?)(.*?)(-?)$/.exec(s);
  if (signMatch[1] === "-" || signMatch[3] === "-") {
    if (negative || signMatch[1] === "-" && signMatch[3] === "-")
      return Number.NaN;
    negative = true;
  }
  s = signMatch[2];
  if (/[-+()]/.test(s))
    return Number.NaN;
  const decimal = info.decimal;
  let intPart = s;
  let fracPart = null;
  const decIdx = s.indexOf(decimal);
  if (decIdx >= 0) {
    intPart = s.slice(0, decIdx);
    fracPart = s.slice(decIdx + decimal.length);
  } else if (decimal !== "." && info.group !== "." && s.includes(".")) {
    const i = s.indexOf(".");
    intPart = s.slice(0, i);
    fracPart = s.slice(i + 1);
  }
  if (fracPart !== null && !new RegExp(`^${DIGIT_RUN}*$`).test(fracPart))
    return Number.NaN;
  if (intPart.includes(GROUP_TOKEN)) {
    const groups = intPart.split(GROUP_TOKEN);
    const allDigits = groups.every((g) => new RegExp(`^${DIGIT_RUN}+$`).test(g));
    if (!allDigits)
      return Number.NaN;
    const last = groups[groups.length - 1];
    if (groups.length === 2 && fracPart === null && last.length >= 1 && last.length <= 2) {
      fracPart = last;
      intPart = groups[0];
    } else {
      const { primaryGroupSize: p, secondaryGroupSize: q } = info;
      const middle = groups.slice(1, -1);
      const ok = last.length === p && middle.every((g) => g.length === q) && groups[0].length >= 1 && groups[0].length <= (groups.length > 2 ? q : Math.max(p, q));
      if (!ok)
        return Number.NaN;
      intPart = groups.join("");
    }
  }
  if (!new RegExp(`^${DIGIT_RUN}*$`).test(intPart))
    return Number.NaN;
  if (intPart === "" && (fracPart === null || fracPart === ""))
    return Number.NaN;
  let n = Number(`${intPart || "0"}.${fracPart || "0"}`) * multiplier;
  if (info.percent)
    n /= 100;
  n = cleanFloat(n);
  return negative ? -n : n;
}
function isNegativeInput(text, locale, options) {
  const n = parseLocaleNumber(text, locale, options);
  return n !== null && !Number.isNaN(n) && (n < 0 || Object.is(n, -0));
}
function formatLocaleNumber(value, locale, options, precision) {
  const opts = { ...options };
  if (precision !== void 0) {
    opts.minimumFractionDigits = precision;
    opts.maximumFractionDigits = precision;
  }
  try {
    return new Intl.NumberFormat(locale, opts).format(value);
  } catch (e) {
    return String(value);
  }
}
function formatForEditing(value, locale, options, precision) {
  const shown = (options == null ? void 0 : options.style) === "percent" ? cleanFloat(value * 100) : value;
  return safeNumberFormat(locale, {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: precision !== void 0 ? precision : 20
  }).format(shown);
}
function countDecimals(n) {
  var _a, _b, _c, _d;
  if (!Number.isFinite(n))
    return 0;
  const s = String(n);
  const exp = /e-(\d+)$/i.exec(s);
  if (exp) {
    const mantissa = s.split(/e/i)[0];
    const frac = (_b = (_a = mantissa.split(".")[1]) == null ? void 0 : _a.length) != null ? _b : 0;
    return frac + Number(exp[1]);
  }
  return (_d = (_c = s.split(".")[1]) == null ? void 0 : _c.length) != null ? _d : 0;
}
function roundToPrecision(n, precision) {
  if (precision === void 0 || !Number.isFinite(n))
    return n;
  const f = 10 ** precision;
  return cleanFloat(Math.round(cleanFloat(n * f)) / f);
}
function clamp4(n, min, max) {
  let v = n;
  if (min !== void 0 && v < min)
    v = min;
  if (max !== void 0 && v > max)
    v = max;
  return v;
}
function stepValue(value, { step, direction, multiplier = 1, min, max, precision }) {
  if (value === null || !Number.isFinite(value))
    return roundToPrecision(clamp4(0, min, max), precision);
  const delta = step * multiplier * direction;
  const decimals = Math.min(20, Math.max(countDecimals(step), countDecimals(value), precision != null ? precision : 0));
  const next = Number((value + delta).toFixed(decimals));
  return clamp4(roundToPrecision(next, precision), min, max);
}

// src/components/atoms/NumberInput/index.tsx
import { jsx as jsx46, jsxs as jsxs42 } from "react/jsx-runtime";
function cls24(...parts) {
  return parts.filter(Boolean).join(" ");
}
function hasContent3(node) {
  return node !== void 0 && node !== null && node !== false && node !== "" && node !== true;
}
function useAnnounceOnChange(value) {
  const initial = useRef27(value);
  const changed = useRef27(false);
  if (!changed.current && value !== initial.current)
    changed.current = true;
  return changed.current;
}
function MinusGlyph() {
  return /* @__PURE__ */ jsx46("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx46("path", { d: "M3.5 8h9", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
function PlusGlyph() {
  return /* @__PURE__ */ jsx46("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx46("path", { d: "M3.5 8h9M8 3.5v9", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
var NumberInput = React44.forwardRef(function NumberInput2({
  value: valueProp,
  defaultValue,
  onChange,
  min: minProp,
  max,
  step = NUMBER_INPUT_DEFAULTS.step,
  precision,
  locale,
  formatOptions,
  prefix,
  suffix,
  showSteppers = NUMBER_INPUT_DEFAULTS.showSteppers,
  allowNegative = NUMBER_INPUT_DEFAULTS.allowNegative,
  clampOnBlur = NUMBER_INPUT_DEFAULTS.clampOnBlur,
  label,
  error,
  size = NUMBER_INPUT_DEFAULTS.size,
  disabled = false,
  readOnly = false,
  incrementLabel = NUMBER_INPUT_DEFAULTS.incrementLabel,
  decrementLabel = NUMBER_INPUT_DEFAULTS.decrementLabel,
  className,
  style,
  id: idProp,
  name,
  onFocus,
  onBlur,
  onKeyDown,
  "aria-describedby": ariaDescribedByProp,
  "aria-invalid": ariaInvalidProp,
  "aria-required": ariaRequiredProp,
  "aria-labelledby": ariaLabelledByProp,
  ...rest
}, forwardedRef) {
  var _a, _b;
  const field = useFormField();
  const reactId = useId21().replace(/[^a-zA-Z0-9_-]/g, "");
  const inputId = (_a = idProp != null ? idProp : field == null ? void 0 : field.id) != null ? _a : `ds-number-input-${reactId}`;
  const labelId = `ds-number-input-${reactId}-label`;
  const errorId = `ds-number-input-${reactId}-error`;
  const min = allowNegative ? minProp : Math.max(minProp != null ? minProp : 0, 0);
  const optionsKey = JSON.stringify(formatOptions != null ? formatOptions : {});
  const options = useMemo19(() => JSON.parse(optionsKey), [optionsKey]);
  const isControlled = valueProp !== void 0;
  const [innerValue, setInnerValue] = useState31(defaultValue != null ? defaultValue : null);
  const current = isControlled ? valueProp != null ? valueProp : null : innerValue;
  const currentRef = useRef27(current);
  currentRef.current = current;
  const [focused, setFocused] = useState31(false);
  const focusedRef = useRef27(false);
  const [editText, setEditText] = useState31("");
  const editTextRef = useRef27("");
  const setEdit = (t) => {
    editTextRef.current = t;
    setEditText(t);
  };
  const inputRef = useRef27(null);
  const setInputRef = useCallback26(
    (node) => {
      inputRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  const toEdit = useCallback26(
    (v) => v === null ? "" : formatForEditing(v, locale, options, precision),
    [locale, options, precision]
  );
  const setValue = useCallback26(
    (next) => {
      if (Object.is(next, currentRef.current))
        return false;
      currentRef.current = next;
      if (!isControlled)
        setInnerValue(next);
      onChange == null ? void 0 : onChange(next);
      return true;
    },
    [isControlled, onChange]
  );
  useEffect21(() => {
    if (!focusedRef.current)
      return;
    if (parseLocaleNumber(editTextRef.current, locale, options) !== current)
      setEdit(toEdit(current));
  }, [current, locale, options, toEdit]);
  const baseValue = () => {
    if (focusedRef.current) {
      const parsed = parseLocaleNumber(editTextRef.current, locale, options);
      if (parsed === null || !Number.isNaN(parsed))
        return parsed;
    }
    return currentRef.current;
  };
  const canStep = (direction) => {
    if (disabled || readOnly)
      return false;
    const v = currentRef.current;
    if (v === null)
      return true;
    if (direction > 0)
      return max === void 0 || v < max;
    return min === void 0 || v > min;
  };
  const stepBy = (direction, multiplier = 1) => {
    if (disabled || readOnly)
      return false;
    const next = stepValue(baseValue(), { step, direction, multiplier, min, max, precision });
    const changed = setValue(next);
    if (focusedRef.current)
      setEdit(toEdit(next));
    return changed;
  };
  const isRejected = (text) => {
    const parsed = parseLocaleNumber(text, locale, options);
    if (parsed === null)
      return false;
    if (!Number.isNaN(parsed))
      return !allowNegative && isNegativeInput(text, locale, options);
    const trimmed = text.trim();
    const head = trimmed.slice(0, -1);
    const lastIsDigit = /\p{Nd}$/u.test(trimmed);
    const headOk = (t) => {
      const n = parseLocaleNumber(t, locale, options);
      return n === null || !Number.isNaN(n);
    };
    if (!lastIsDigit && headOk(head))
      return false;
    if (trimmed.startsWith("(") && !trimmed.includes(")") && headOk(`${trimmed})`))
      return false;
    return true;
  };
  const commit = () => {
    const text = editTextRef.current;
    const parsed = parseLocaleNumber(text, locale, options);
    let next;
    if (parsed !== null && Number.isNaN(parsed))
      next = currentRef.current;
    else if (!allowNegative && isNegativeInput(text, locale, options))
      next = clampOnBlur ? min != null ? min : 0 : currentRef.current;
    else
      next = parsed;
    if (next !== null && Object.is(next, -0))
      next = 0;
    if (next !== null && clampOnBlur)
      next = clamp4(roundToPrecision(next, precision), min, max);
    setValue(next);
    return next;
  };
  const holdTimer = useRef27(void 0);
  const repeatTimer = useRef27(void 0);
  const stopRepeat = useCallback26(() => {
    clearTimeout(holdTimer.current);
    clearInterval(repeatTimer.current);
    holdTimer.current = void 0;
    repeatTimer.current = void 0;
  }, []);
  useEffect21(() => stopRepeat, [stopRepeat]);
  const stepByRef = useRef27(stepBy);
  stepByRef.current = stepBy;
  const startRepeat = (direction) => {
    stopRepeat();
    if (!stepByRef.current(direction))
      return;
    holdTimer.current = setTimeout(() => {
      repeatTimer.current = setInterval(() => {
        if (!stepByRef.current(direction))
          stopRepeat();
      }, NUMBER_INPUT_REPEAT_INTERVAL_MS);
    }, NUMBER_INPUT_REPEAT_DELAY_MS);
    window.addEventListener("pointerup", stopRepeat, { once: true });
    window.addEventListener("pointercancel", stopRepeat, { once: true });
  };
  const stepperHandlers = (direction) => ({
    onPointerDown: (e) => {
      var _a2;
      if (e.button !== 0)
        return;
      e.preventDefault();
      if (document.activeElement !== inputRef.current)
        (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
      startRepeat(direction);
    },
    onPointerUp: stopRepeat,
    onPointerLeave: stopRepeat,
    onPointerCancel: stopRepeat,
    // Assistive-tech / keyboard activation (no pointer sequence): one step.
    onClick: (e) => {
      if (e.detail === 0)
        stepBy(direction);
    }
  });
  const handleFocus = (e) => {
    focusedRef.current = true;
    setFocused(true);
    if (!readOnly)
      setEdit(toEdit(currentRef.current));
    onFocus == null ? void 0 : onFocus(e);
  };
  const handleBlur = (e) => {
    stopRepeat();
    if (!readOnly && !disabled)
      commit();
    focusedRef.current = false;
    setFocused(false);
    onBlur == null ? void 0 : onBlur(e);
  };
  const handleChange = (e) => {
    if (readOnly || disabled)
      return;
    const text = e.target.value;
    setEdit(text);
    const parsed = parseLocaleNumber(text, locale, options);
    if (parsed === null)
      setValue(null);
    else if (!Number.isNaN(parsed) && !(!allowNegative && isNegativeInput(text, locale, options))) {
      setValue(Object.is(parsed, -0) ? 0 : parsed);
    }
  };
  const handleKeyDown = (e) => {
    onKeyDown == null ? void 0 : onKeyDown(e);
    if (e.defaultPrevented || disabled || readOnly)
      return;
    const large = NUMBER_INPUT_LARGE_STEP;
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        stepBy(1, e.shiftKey ? large : 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        stepBy(-1, e.shiftKey ? large : 1);
        break;
      case "PageUp":
        e.preventDefault();
        stepBy(1, large);
        break;
      case "PageDown":
        e.preventDefault();
        stepBy(-1, large);
        break;
      case "Home":
        if (min !== void 0) {
          e.preventDefault();
          setValue(min);
          setEdit(toEdit(min));
        }
        break;
      case "End":
        if (max !== void 0) {
          e.preventDefault();
          setValue(max);
          setEdit(toEdit(max));
        }
        break;
      case "Enter": {
        const next = commit();
        setEdit(toEdit(next));
        break;
      }
      default:
        break;
    }
  };
  const formatted = current === null ? "" : formatLocaleNumber(current, locale, options, precision);
  const shownText = focused && !readOnly ? editText : formatted;
  const affixText = (n) => typeof n === "string" || typeof n === "number" ? String(n) : "";
  const valueText = current === null ? void 0 : [affixText(prefix), formatted, affixText(suffix)].filter(Boolean).join(" ");
  const showOwnError = !field && hasContent3(error);
  const announceError = useAnnounceOnChange(showOwnError ? error : null);
  const describedBy = ariaDescribedByProp != null ? ariaDescribedByProp : [field == null ? void 0 : field.describedBy, showOwnError ? errorId : void 0].filter(Boolean).join(" ") || void 0;
  const textRejected = focused && !readOnly && isRejected(editText);
  const invalid = ariaInvalidProp != null ? ariaInvalidProp : (field == null ? void 0 : field.invalid) || error === true || hasContent3(error) || textRejected ? true : void 0;
  const required = ariaRequiredProp != null ? ariaRequiredProp : (field == null ? void 0 : field.required) ? true : void 0;
  const labelledBy = ariaLabelledByProp != null ? ariaLabelledByProp : void 0;
  return /* @__PURE__ */ jsxs42(
    "div",
    {
      className: cls24("ds-number-input", className),
      style,
      "data-size": size,
      "data-disabled": disabled ? "true" : void 0,
      "data-readonly": readOnly ? "true" : void 0,
      "data-invalid": invalid ? "true" : void 0,
      children: [
        !field && hasContent3(label) ? /* @__PURE__ */ jsx46("label", { id: labelId, htmlFor: inputId, className: "ds-number-input__label", children: label }) : null,
        /* @__PURE__ */ jsxs42(
          "div",
          {
            className: "ds-number-input__field",
            onPointerDown: (e) => {
              var _a2;
              const t = e.target;
              if (disabled || t === inputRef.current || t.closest("button"))
                return;
              e.preventDefault();
              (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
            },
            children: [
              prefix != null ? /* @__PURE__ */ jsx46("span", { className: "ds-number-input__affix", "data-slot": "prefix", "aria-hidden": "true", children: prefix }) : null,
              /* @__PURE__ */ jsx46(
                "input",
                {
                  ...rest,
                  ref: setInputRef,
                  id: inputId,
                  type: "text",
                  inputMode: "decimal",
                  role: "spinbutton",
                  autoComplete: (_b = rest.autoComplete) != null ? _b : "off",
                  className: "ds-number-input__input",
                  value: shownText,
                  disabled,
                  readOnly,
                  "aria-readonly": readOnly || void 0,
                  "aria-valuenow": current != null ? current : void 0,
                  "aria-valuemin": min,
                  "aria-valuemax": max,
                  "aria-valuetext": valueText,
                  "aria-labelledby": labelledBy,
                  "aria-describedby": describedBy,
                  "aria-invalid": invalid,
                  "aria-required": required,
                  onFocus: handleFocus,
                  onBlur: handleBlur,
                  onChange: handleChange,
                  onKeyDown: handleKeyDown
                }
              ),
              suffix != null ? /* @__PURE__ */ jsx46("span", { className: "ds-number-input__affix", "data-slot": "suffix", "aria-hidden": "true", children: suffix }) : null,
              showSteppers ? /* @__PURE__ */ jsxs42("span", { className: "ds-number-input__steppers", children: [
                /* @__PURE__ */ jsx46(
                  "button",
                  {
                    type: "button",
                    tabIndex: -1,
                    className: "ds-number-input__stepper",
                    "aria-label": decrementLabel,
                    "aria-controls": inputId,
                    disabled: !canStep(-1),
                    ...stepperHandlers(-1),
                    children: /* @__PURE__ */ jsx46(MinusGlyph, {})
                  }
                ),
                /* @__PURE__ */ jsx46(
                  "button",
                  {
                    type: "button",
                    tabIndex: -1,
                    className: "ds-number-input__stepper",
                    "aria-label": incrementLabel,
                    "aria-controls": inputId,
                    disabled: !canStep(1),
                    ...stepperHandlers(1),
                    children: /* @__PURE__ */ jsx46(PlusGlyph, {})
                  }
                )
              ] }) : null
            ]
          }
        ),
        name ? /* @__PURE__ */ jsx46("input", { type: "hidden", name, value: current != null ? current : "", disabled }) : null,
        showOwnError ? /* @__PURE__ */ jsx46("p", { id: errorId, className: "ds-number-input__error", role: announceError ? "alert" : void 0, children: error }) : null
      ]
    }
  );
});
NumberInput.displayName = "NumberInput";
NumberInput[FORM_FIELD_CONSUMER_KEY] = true;
var NumberInput_default = NumberInput;

// src/components/molecules/DateRangePicker/index.tsx
import React45, {
  useCallback as useCallback27,
  useContext as useContext14,
  useEffect as useEffect22,
  useId as useId22,
  useLayoutEffect as useLayoutEffect9,
  useMemo as useMemo20,
  useRef as useRef28,
  useState as useState32
} from "react";
import { createPortal as createPortal10 } from "react-dom";
import { DayPicker } from "react-day-picker";

// src/components/molecules/DateRangePicker/DateRangePicker.config.ts
var DATE_RANGE_PICKER_DEFAULTS = {
  numberOfMonths: 2,
  placeholder: "Select date range",
  dialogLabel: "Choose date range",
  clearLabel: "Clear dates",
  presetsLabel: "Presets",
  weekStartsOn: 0,
  clearable: false,
  disabled: false
};
var DATE_RANGE_PICKER_NARROW_QUERY = "(max-width: 640px)";
var DATE_RANGE_SEPARATOR = " \u2013 ";
var DATE_RANGE_MESSAGES = {
  start: (from) => `Start date ${from}. Select an end date.`,
  selected: (from, to) => `Selected ${from} to ${to}.`,
  preset: (label, from, to) => `${label}: ${from} to ${to}.`,
  cleared: "Dates cleared."
};

// src/components/molecules/DateRangePicker/DateRangePicker.utils.ts
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addDays(d, days) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
}
function startOfMonth2(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function startOfQuarter(d) {
  return new Date(d.getFullYear(), Math.floor(d.getMonth() / 3) * 3, 1);
}
function startOfYear(d) {
  return new Date(d.getFullYear(), 0, 1);
}
function isSameDay2(a, b) {
  if (!a || !b)
    return a === b;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isSameRange(a, b) {
  return isSameDay2(a == null ? void 0 : a.from, b == null ? void 0 : b.from) && isSameDay2(a == null ? void 0 : a.to, b == null ? void 0 : b.to);
}
function isCompleteRange(r) {
  return Boolean((r == null ? void 0 : r.from) && (r == null ? void 0 : r.to));
}
function orderRange(a, b) {
  const x = startOfDay(a);
  const y = startOfDay(b);
  return x.getTime() <= y.getTime() ? { from: x, to: y } : { from: y, to: x };
}
function clampRange(range, min, max) {
  let { from, to } = orderRange(range.from, range.to);
  const lo = min ? startOfDay(min) : void 0;
  const hi = max ? startOfDay(max) : void 0;
  if (lo && to.getTime() < lo.getTime())
    return null;
  if (hi && from.getTime() > hi.getTime())
    return null;
  if (lo && from.getTime() < lo.getTime())
    from = lo;
  if (hi && to.getTime() > hi.getTime())
    to = hi;
  return { from, to };
}
function isOutOfBounds(d, min, max) {
  const t = startOfDay(d).getTime();
  return Boolean(min && t < startOfDay(min).getTime() || max && t > startOfDay(max).getTime());
}
function createDateFormatter(locale) {
  let fmt;
  try {
    fmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  } catch (e) {
    fmt = new Intl.DateTimeFormat(void 0, { dateStyle: "medium" });
  }
  return (d) => fmt.format(d);
}
function formatRange(range, format) {
  if (!(range == null ? void 0 : range.from) && !(range == null ? void 0 : range.to))
    return null;
  const from = range.from ? format(range.from) : "\u2026";
  const to = range.to ? format(range.to) : "\u2026";
  if (range.from && range.to && isSameDay2(range.from, range.to))
    return from;
  return `${from}${DATE_RANGE_SEPARATOR}${to}`;
}
function createDefaultRangePresets(now = () => /* @__PURE__ */ new Date()) {
  const today = () => startOfDay(now());
  return [
    { label: "Today", range: () => ({ from: today(), to: today() }) },
    { label: "Last 7 days", range: () => ({ from: addDays(today(), -6), to: today() }) },
    { label: "Last 30 days", range: () => ({ from: addDays(today(), -29), to: today() }) },
    { label: "This month", range: () => ({ from: startOfMonth2(today()), to: today() }) },
    { label: "This quarter", range: () => ({ from: startOfQuarter(today()), to: today() }) },
    { label: "Year to date", range: () => ({ from: startOfYear(today()), to: today() }) }
  ];
}
var DEFAULT_RANGE_PRESETS = createDefaultRangePresets();
function fromIsoDay(s) {
  const m = s ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(s) : null;
  if (!m)
    return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}
var TABBABLE = "a[href], button:not([disabled]), input:not([disabled]):not([type='hidden']), select:not([disabled]), textarea:not([disabled]), [tabindex]";
function getTabbable(container) {
  return Array.from(container.querySelectorAll(TABBABLE)).filter(
    (el) => el.tabIndex >= 0 && el.getAttribute("tabindex") !== "-1" && !el.closest("[hidden], [inert]")
  );
}

// src/components/molecules/DateRangePicker/index.tsx
import { Fragment as Fragment10, jsx as jsx47, jsxs as jsxs43 } from "react/jsx-runtime";
function cls25(...parts) {
  return parts.filter(Boolean).join(" ");
}
function hasContent4(node) {
  return node !== void 0 && node !== null && node !== false && node !== "" && node !== true;
}
function useAnnounceOnChange2(value) {
  const initial = useRef28(value);
  const changed = useRef28(false);
  if (!changed.current && value !== initial.current)
    changed.current = true;
  return changed.current;
}
function useMediaQuery(query, onChange) {
  const onChangeRef = useRef28(onChange);
  onChangeRef.current = onChange;
  const [matches, setMatches] = useState32(
    () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(query).matches
  );
  useEffect22(() => {
    var _a;
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return void 0;
    const mql = window.matchMedia(query);
    setMatches(Boolean(mql.matches));
    const handler = (e) => {
      var _a2;
      (_a2 = onChangeRef.current) == null ? void 0 : _a2.call(onChangeRef, e.matches);
      setMatches(e.matches);
    };
    if (typeof mql.addEventListener === "function")
      mql.addEventListener("change", handler);
    else
      (_a = mql.addListener) == null ? void 0 : _a.call(mql, handler);
    return () => {
      var _a2;
      if (typeof mql.removeEventListener === "function")
        mql.removeEventListener("change", handler);
      else
        (_a2 = mql.removeListener) == null ? void 0 : _a2.call(mql, handler);
    };
  }, [query]);
  return matches;
}
function safeDateTimeFormat(locale, options) {
  try {
    return new Intl.DateTimeFormat(locale, options);
  } catch (e) {
    return new Intl.DateTimeFormat(void 0, options);
  }
}
function CalendarGlyph() {
  return /* @__PURE__ */ jsxs43("svg", { className: "ds-date-range-picker__icon", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ jsx47("rect", { x: "3", y: "4.5", width: "14", height: "12", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx47("path", { d: "M3 8.5h14M7 2.75v3.5M13 2.75v3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function ClearGlyph2() {
  return /* @__PURE__ */ jsx47("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx47("path", { d: "M4 4l8 8M12 4l-8 8", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
var DateRangePicker = React45.forwardRef(function DateRangePicker2({
  value: valueProp,
  defaultValue,
  onChange,
  presets,
  min,
  max,
  numberOfMonths = DATE_RANGE_PICKER_DEFAULTS.numberOfMonths,
  label,
  ariaLabel,
  placeholder = DATE_RANGE_PICKER_DEFAULTS.placeholder,
  format: formatProp,
  locale,
  weekStartsOn = DATE_RANGE_PICKER_DEFAULTS.weekStartsOn,
  clearable = DATE_RANGE_PICKER_DEFAULTS.clearable,
  disabled = DATE_RANGE_PICKER_DEFAULTS.disabled,
  error,
  dialogLabel = DATE_RANGE_PICKER_DEFAULTS.dialogLabel,
  clearLabel = DATE_RANGE_PICKER_DEFAULTS.clearLabel,
  id: idProp,
  required: requiredProp = false,
  className,
  ...restProps
}, ref) {
  var _a, _b;
  const {
    "aria-labelledby": ariaLabelledByProp,
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    // `aria-required` is not allowed on a button (axe aria-allowed-attr): dropped; "required" lives in the label.
    "aria-required": _ariaRequiredIgnored,
    ...rest
  } = restProps;
  const field = useFormField();
  const reactId = useId22().replace(/[^a-zA-Z0-9_-]/g, "");
  const baseId = `ds-drp-${reactId}`;
  const triggerId = (_a = idProp != null ? idProp : field == null ? void 0 : field.id) != null ? _a : `${baseId}-trigger`;
  const ownLabelId = `${baseId}-label`;
  const hiddenNameId = `${baseId}-name`;
  const valueId = `${baseId}-value`;
  const dialogId = `${baseId}-dialog`;
  const errorId = `${baseId}-error`;
  const layerId = `date-range-picker-${reactId}`;
  const parentLayerId = useContext14(OverlayLayerContext);
  const rootRef = useRef28(null);
  const triggerRef = useRef28(null);
  const dialogRef = useRef28(null);
  const focusInsideRef = useRef28(false);
  const lastFocusDayRef = useRef28(null);
  const setRootRef = useCallback27(
    (node) => {
      rootRef.current = node;
      if (typeof ref === "function")
        ref(node);
      else if (ref)
        ref.current = node;
    },
    [ref]
  );
  const isControlled = valueProp !== void 0;
  const [innerValue, setInnerValue] = useState32(() => defaultValue != null ? defaultValue : {});
  const current = (_b = isControlled ? valueProp : innerValue) != null ? _b : {};
  const [open, setOpen] = useState32(false);
  const openRef = useRef28(open);
  openRef.current = open;
  const [draft, setDraft] = useState32(null);
  const [hoverDay, setHoverDay] = useState32(null);
  const [month, setMonth] = useState32(() => {
    var _a2;
    return startOfMonth2((_a2 = current.from) != null ? _a2 : /* @__PURE__ */ new Date());
  });
  const [announcement, setAnnouncement] = useState32("");
  const [align, setAlign] = useState32("start");
  const [autoFocusGrid, setAutoFocusGrid] = useState32(false);
  const [portalContext, setPortalContext] = useState32({});
  const narrow = useMediaQuery(DATE_RANGE_PICKER_NARROW_QUERY, (nowNarrow) => {
    if (!openRef.current || !nowNarrow)
      return;
    const focusedDay = fromIsoDay(lastFocusDayRef.current);
    if (focusedDay && focusInsideRef.current)
      setMonth(startOfMonth2(focusedDay));
  });
  const months = narrow ? 1 : Math.max(1, Math.floor(numberOfMonths));
  const format = useMemo20(() => formatProp != null ? formatProp : createDateFormatter(locale), [formatProp, locale]);
  const displayText = formatRange(current, format);
  const commit = useCallback27(
    (next, message) => {
      if (!isControlled)
        setInnerValue(next);
      onChange == null ? void 0 : onChange(next);
      setAnnouncement(message);
    },
    [isControlled, onChange]
  );
  const close = useCallback27((restoreFocus2) => {
    var _a2;
    setOpen(false);
    setDraft(null);
    setHoverDay(null);
    setAlign("start");
    focusInsideRef.current = false;
    lastFocusDayRef.current = null;
    if (restoreFocus2)
      (_a2 = triggerRef.current) == null ? void 0 : _a2.focus({ preventScroll: true });
  }, []);
  const openPopover = () => {
    var _a2;
    if (disabled)
      return;
    let anchor = startOfDay((_a2 = current.from) != null ? _a2 : /* @__PURE__ */ new Date());
    if (min && anchor.getTime() < startOfDay(min).getTime())
      anchor = startOfDay(min);
    if (max && anchor.getTime() > startOfDay(max).getTime())
      anchor = startOfDay(max);
    setMonth(startOfMonth2(anchor));
    setDraft(null);
    setAutoFocusGrid(true);
    setOpen(true);
  };
  useEffect22(() => {
    if (disabled && open)
      close(false);
  }, [disabled, open, close]);
  useEffect22(() => {
    if (!open)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [open, layerId, parentLayerId]);
  useEffect22(() => {
    if (!open)
      return void 0;
    const onKeyDown = (e) => {
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing)
        return;
      if (!isTopLayer(layerId))
        return;
      e.preventDefault();
      e.stopPropagation();
      close(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, layerId, close]);
  const refocusTimerRef = useRef28(void 0);
  useEffect22(() => () => clearTimeout(refocusTimerRef.current), []);
  useEffect22(() => {
    if (!open)
      return void 0;
    const onPointerDown = (e) => {
      var _a2;
      const root = rootRef.current;
      if (!root || !(e.target instanceof Node) || root.contains(e.target))
        return;
      if ((_a2 = dialogRef.current) == null ? void 0 : _a2.contains(e.target))
        return;
      if (!isTopLayer(layerId))
        return;
      close(false);
      clearTimeout(refocusTimerRef.current);
      refocusTimerRef.current = setTimeout(() => {
        var _a3;
        const active2 = document.activeElement;
        if (!active2 || active2 === document.body)
          (_a3 = triggerRef.current) == null ? void 0 : _a3.focus({ preventScroll: true });
      }, 0);
    };
    const type = typeof window !== "undefined" && "PointerEvent" in window ? "pointerdown" : "mousedown";
    document.addEventListener(type, onPointerDown, true);
    return () => {
      document.removeEventListener(type, onPointerDown, true);
    };
  }, [open, layerId, close]);
  useLayoutEffect9(() => {
    var _a2, _b2, _c, _d;
    if (!open || !narrow)
      return;
    const root = rootRef.current;
    const theme = (_b2 = (_a2 = root == null ? void 0 : root.closest("[data-theme]")) == null ? void 0 : _a2.getAttribute("data-theme")) != null ? _b2 : void 0;
    const dir = (_d = (_c = root == null ? void 0 : root.closest("[dir]")) == null ? void 0 : _c.getAttribute("dir")) != null ? _d : void 0;
    setPortalContext((prev) => prev.theme === theme && prev.dir === dir ? prev : { theme, dir });
  }, [open, narrow]);
  useLayoutEffect9(() => {
    if (!open || narrow || typeof window === "undefined")
      return;
    const dialog = dialogRef.current;
    const root = rootRef.current;
    if (!dialog || !root)
      return;
    const rect = dialog.getBoundingClientRect();
    if (rect.width === 0)
      return;
    if (rect.right > window.innerWidth && root.getBoundingClientRect().right - rect.width >= 0)
      setAlign("end");
  }, [open, narrow, months]);
  useLayoutEffect9(() => {
    var _a2;
    if (!open || !focusInsideRef.current)
      return;
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    const active2 = document.activeElement;
    if (active2 && active2 !== document.body && dialog.contains(active2))
      return;
    const iso = lastFocusDayRef.current;
    const sameDay = iso ? dialog.querySelector(`[data-day="${iso}"] button`) : null;
    const tabStop = dialog.querySelector(".rdp-day_button[tabindex='0']");
    ((_a2 = sameDay != null ? sameDay : tabStop) != null ? _a2 : dialog).focus({ preventScroll: true });
  }, [months, open]);
  const pickDay = (day) => {
    if (!day || isOutOfBounds(day, min, max))
      return;
    if (!(draft == null ? void 0 : draft.from)) {
      const from = startOfDay(day);
      setDraft({ from });
      setAnnouncement(DATE_RANGE_MESSAGES.start(format(from)));
      return;
    }
    const range = orderRange(draft.from, day);
    commit(range, DATE_RANGE_MESSAGES.selected(format(range.from), format(range.to)));
    close(true);
  };
  const pickPreset = (preset) => {
    const range = clampRange(preset.range(), min, max);
    if (!range)
      return;
    commit(range, DATE_RANGE_MESSAGES.preset(preset.label, format(range.from), format(range.to)));
    close(true);
  };
  const clear = () => {
    var _a2;
    commit({}, DATE_RANGE_MESSAGES.cleared);
    (_a2 = triggerRef.current) == null ? void 0 : _a2.focus({ preventScroll: true });
  };
  const onDialogKeyDown = (e) => {
    if (e.key !== "Tab" || !dialogRef.current)
      return;
    e.stopPropagation();
    const tabbable = getTabbable(dialogRef.current);
    if (tabbable.length === 0) {
      e.preventDefault();
      dialogRef.current.focus();
      return;
    }
    const first = tabbable[0];
    const last = tabbable[tabbable.length - 1];
    const active2 = document.activeElement;
    if (e.shiftKey && (active2 === first || active2 === dialogRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active2 === last) {
      e.preventDefault();
      first.focus();
    }
  };
  const intl = useMemo20(
    () => ({
      caption: safeDateTimeFormat(locale, { month: "long", year: "numeric" }),
      weekdayShort: safeDateTimeFormat(locale, { weekday: "short" }),
      weekdayLong: safeDateTimeFormat(locale, { weekday: "long" }),
      dayFull: safeDateTimeFormat(locale, { dateStyle: "full" })
    }),
    [locale]
  );
  const formatters = useMemo20(
    () => ({
      formatCaption: (m) => intl.caption.format(m),
      formatWeekdayName: (d) => intl.weekdayShort.format(d)
    }),
    [intl]
  );
  const draftFrom = draft == null ? void 0 : draft.from;
  const labels = useMemo20(
    () => ({
      labelGrid: (m) => intl.caption.format(m),
      labelWeekday: (d) => intl.weekdayLong.format(d),
      labelNext: () => "Go to next month",
      labelPrevious: () => "Go to previous month",
      labelNav: () => "Month navigation",
      labelDayButton: (d, mods) => {
        const parts = [intl.dayFull.format(d)];
        if (mods.today)
          parts.push("today");
        if (draftFrom) {
          if (isSameDay2(d, draftFrom))
            parts.push("start of range");
        } else if (mods.range_start && mods.range_end)
          parts.push("selected");
        else if (mods.range_start)
          parts.push("start of range");
        else if (mods.range_end)
          parts.push("end of range");
        else if (mods.range_middle)
          parts.push("in range");
        else if (mods.selected)
          parts.push("selected");
        return parts.join(", ");
      }
    }),
    [intl, draftFrom]
  );
  const disabledMatchers = useMemo20(() => {
    const list = [];
    if (min)
      list.push({ before: startOfDay(min) });
    if (max)
      list.push({ after: startOfDay(max) });
    return list;
  }, [min, max]);
  const gridSelected = (draft == null ? void 0 : draft.from) ? { from: draft.from, to: void 0 } : current.from ? { from: current.from, to: current.to } : void 0;
  const preview = (draft == null ? void 0 : draft.from) && hoverDay && !isOutOfBounds(hoverDay, min, max) ? orderRange(draft.from, hoverDay) : null;
  const nameSourceId = ariaLabelledByProp ? void 0 : field ? field.labelId : hasContent4(label) ? ownLabelId : ariaLabel ? hiddenNameId : void 0;
  const labelledBy = ariaLabelledByProp != null ? ariaLabelledByProp : nameSourceId ? `${nameSourceId} ${valueId}` : void 0;
  const showOwnError = !field && hasContent4(error);
  const announceError = useAnnounceOnChange2(showOwnError ? error : null);
  const describedBy = ariaDescribedByProp != null ? ariaDescribedByProp : [field == null ? void 0 : field.describedBy, showOwnError ? errorId : void 0].filter(Boolean).join(" ") || void 0;
  const invalid = ariaInvalidProp != null ? ariaInvalidProp : (field == null ? void 0 : field.invalid) || error === true || hasContent4(error) ? true : void 0;
  const showClear = clearable && !disabled && Boolean(current.from || current.to);
  const renderPopover = (node) => narrow && typeof document !== "undefined" ? createPortal10(node, document.body) : node;
  return /* @__PURE__ */ jsxs43(
    "div",
    {
      ...rest,
      ref: setRootRef,
      className: cls25("ds-date-range-picker", className),
      "data-open": open ? "true" : void 0,
      "data-disabled": disabled ? "true" : void 0,
      "data-invalid": invalid ? "true" : void 0,
      children: [
        !field && hasContent4(label) ? /* @__PURE__ */ jsxs43("label", { id: ownLabelId, htmlFor: triggerId, className: "ds-date-range-picker__label", children: [
          label,
          requiredProp ? /* @__PURE__ */ jsxs43(Fragment10, { children: [
            /* @__PURE__ */ jsx47("span", { className: "ds-date-range-picker__required", "aria-hidden": "true", children: "*" }),
            /* @__PURE__ */ jsx47("span", { className: "ds-date-range-picker__sr", children: " required" })
          ] }) : null
        ] }) : null,
        !field && !hasContent4(label) && ariaLabel ? /* @__PURE__ */ jsxs43("span", { id: hiddenNameId, hidden: true, children: [
          ariaLabel,
          requiredProp ? " required" : ""
        ] }) : null,
        /* @__PURE__ */ jsxs43("div", { className: "ds-date-range-picker__field", "data-clearable": showClear ? "true" : void 0, children: [
          /* @__PURE__ */ jsxs43(
            "button",
            {
              ref: triggerRef,
              id: triggerId,
              type: "button",
              className: "ds-date-range-picker__trigger",
              "aria-haspopup": "dialog",
              "aria-expanded": open,
              "aria-controls": open ? dialogId : void 0,
              "aria-labelledby": labelledBy,
              "aria-describedby": describedBy,
              "aria-invalid": invalid,
              disabled,
              onClick: () => open ? close(true) : openPopover(),
              onKeyDown: (e) => {
                if (e.key === "ArrowDown" && !open) {
                  e.preventDefault();
                  openPopover();
                }
              },
              children: [
                /* @__PURE__ */ jsx47(CalendarGlyph, {}),
                /* @__PURE__ */ jsx47(
                  "span",
                  {
                    id: valueId,
                    className: "ds-date-range-picker__value",
                    "data-placeholder": displayText ? void 0 : "true",
                    children: displayText != null ? displayText : placeholder
                  }
                )
              ]
            }
          ),
          showClear ? /* @__PURE__ */ jsx47("button", { type: "button", className: "ds-date-range-picker__clear", "aria-label": clearLabel, onClick: clear, children: /* @__PURE__ */ jsx47(ClearGlyph2, {}) }) : null,
          open ? renderPopover(
            /* @__PURE__ */ jsx47(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs43(
              "div",
              {
                ref: dialogRef,
                id: dialogId,
                role: "dialog",
                "aria-modal": "true",
                "aria-label": dialogLabel,
                tabIndex: -1,
                className: "ds-date-range-picker__popover",
                "data-align": align,
                "data-narrow": narrow ? "true" : void 0,
                "data-theme": narrow ? portalContext.theme : void 0,
                dir: narrow ? portalContext.dir : void 0,
                onKeyDown: onDialogKeyDown,
                onFocusCapture: (e) => {
                  var _a2;
                  focusInsideRef.current = true;
                  if (autoFocusGrid)
                    setAutoFocusGrid(false);
                  const cell = e.target instanceof Element ? e.target.closest("[data-day]") : null;
                  lastFocusDayRef.current = (_a2 = cell == null ? void 0 : cell.getAttribute("data-day")) != null ? _a2 : null;
                },
                onBlurCapture: (e) => {
                  const next = e.relatedTarget;
                  if (next instanceof Node && dialogRef.current && !dialogRef.current.contains(next)) {
                    focusInsideRef.current = false;
                  }
                },
                children: [
                  (presets == null ? void 0 : presets.length) ? /* @__PURE__ */ jsx47(
                    "div",
                    {
                      role: "group",
                      "aria-label": DATE_RANGE_PICKER_DEFAULTS.presetsLabel,
                      className: "ds-date-range-picker__presets",
                      children: presets.map((preset) => {
                        const range = clampRange(preset.range(), min, max);
                        const active2 = Boolean(range && isCompleteRange(current) && isSameRange(range, current));
                        return /* @__PURE__ */ jsx47(
                          "button",
                          {
                            type: "button",
                            className: "ds-date-range-picker__preset",
                            "aria-pressed": active2,
                            disabled: !range,
                            onClick: () => pickPreset(preset),
                            children: preset.label
                          },
                          preset.label
                        );
                      })
                    }
                  ) : null,
                  /* @__PURE__ */ jsx47(
                    DayPicker,
                    {
                      mode: "range",
                      className: "ds-date-range-picker__calendar",
                      autoFocus: autoFocusGrid,
                      lang: locale,
                      numberOfMonths: months,
                      month,
                      onMonthChange: setMonth,
                      startMonth: min ? startOfMonth2(min) : void 0,
                      endMonth: max ? startOfMonth2(max) : void 0,
                      weekStartsOn,
                      disabled: disabledMatchers,
                      selected: gridSelected,
                      onSelect: (_range, triggerDate) => pickDay(triggerDate),
                      onDayMouseEnter: (d) => setHoverDay(d),
                      onDayFocus: (d) => setHoverDay(d),
                      modifiers: { preview: preview != null ? preview : [] },
                      modifiersClassNames: { preview: "ds-date-range-picker__day--preview" },
                      formatters,
                      labels
                    }
                  )
                ]
              }
            ) })
          ) : null
        ] }),
        showOwnError ? /* @__PURE__ */ jsx47("p", { id: errorId, className: "ds-date-range-picker__error", role: announceError ? "alert" : void 0, children: error }) : null,
        /* @__PURE__ */ jsx47("span", { className: "ds-date-range-picker__sr", "aria-live": "polite", "aria-atomic": "true", children: announcement })
      ]
    }
  );
});
DateRangePicker.displayName = "DateRangePicker";
DateRangePicker[FORM_FIELD_CONSUMER_KEY] = true;
var DateRangePicker_default = DateRangePicker;

// src/theme/themeController.ts
var BUILT_IN_THEMES = [
  { id: "classic", label: "Classic", mode: "light", dataTheme: null, pair: "dark", family: "Governance", description: "Noir CTA, blue interaction (tokens.css :root)" },
  { id: "blue", label: "Blue", mode: "light", dataTheme: "blue", pair: "dark", family: "Governance" },
  { id: "dark", label: "Dark", mode: "dark", dataTheme: "dark", pair: "classic", family: "Governance" },
  { id: "green", label: "Green", mode: "light", dataTheme: "green", pair: "dark", family: "Governance" },
  { id: "mist", label: "Ion mist", mode: "light", dataTheme: "mist", pair: "dark", family: "Governance" },
  { id: "custom", label: "Custom (rose)", mode: "light", dataTheme: "custom", pair: "dark", family: "Governance" },
  { id: "blue-mist", label: "Blue + mist", mode: "light", dataTheme: "blue-mist", pair: "dark", family: "Governance" },
  { id: "green-mist", label: "Green + mist", mode: "light", dataTheme: "green-mist", pair: "dark", family: "Governance" },
  { id: "infinia-light", label: "Infinia light", mode: "light", dataTheme: "infinia-light", pair: "infinia-dark", family: "Infinia", description: "Xalion Forma UI v1.1.0 \u2014 white, black, #FFD400" },
  { id: "infinia-dark", label: "Infinia dark", mode: "dark", dataTheme: "infinia-dark", pair: "infinia-light", family: "Infinia", description: "Xalion Forma UI v1.1.0 \u2014 dark" }
];
var SYSTEM_THEME = "system";
var registry = new Map(BUILT_IN_THEMES.map((t) => [t.id, t]));
var listeners = /* @__PURE__ */ new Set();
var config = {
  defaultTheme: "classic",
  storageKey: "ucs-theme",
  system: { light: "classic", dark: "dark" },
  syncMetaThemeColor: true
};
var preference = "classic";
var state = null;
var mediaQuery = null;
var detachMedia = null;
var hasDom = () => typeof document !== "undefined";
function rootEl() {
  if (config.root)
    return config.root;
  return hasDom() ? document.documentElement : null;
}
function isAllowed(id) {
  if (id === SYSTEM_THEME)
    return !config.allowed || config.allowed.includes(SYSTEM_THEME);
  if (!registry.has(id))
    return false;
  return !config.allowed || config.allowed.includes(id);
}
function prefersDark() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function")
    return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function resolve(pref) {
  var _a, _b;
  const id = pref === SYSTEM_THEME ? prefersDark() ? config.system.dark : config.system.light : pref;
  return (_b = (_a = registry.get(id)) != null ? _a : registry.get(config.defaultTheme)) != null ? _b : registry.get("classic");
}
function readStored() {
  if (!config.storageKey || typeof window === "undefined")
    return null;
  try {
    return window.localStorage.getItem(config.storageKey);
  } catch (e) {
    return null;
  }
}
function writeStored(value) {
  if (!config.storageKey || typeof window === "undefined")
    return;
  try {
    window.localStorage.setItem(config.storageKey, value);
  } catch (e) {
  }
}
function syncMeta(root) {
  if (!config.syncMetaThemeColor || !hasDom())
    return;
  const value = getComputedStyle(root).getPropertyValue("--color-bg-surface").trim();
  if (!value)
    return;
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = value;
}
function buildState() {
  const theme = resolve(preference);
  const themes = [...registry.values()].filter((t) => !config.allowed || config.allowed.includes(t.id));
  return { preference, theme, mode: theme.mode, themes, systemAllowed: isAllowed(SYSTEM_THEME) };
}
function apply() {
  state = buildState();
  const root = rootEl();
  if (root) {
    if (state.theme.dataTheme)
      root.setAttribute("data-theme", state.theme.dataTheme);
    else
      root.removeAttribute("data-theme");
    root.style.colorScheme = state.theme.mode;
    syncMeta(root);
  }
  listeners.forEach((l) => l(state));
}
function watchSystem() {
  detachMedia == null ? void 0 : detachMedia();
  detachMedia = null;
  if (preference !== SYSTEM_THEME || typeof window === "undefined" || typeof window.matchMedia !== "function")
    return;
  mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => apply();
  mediaQuery.addEventListener("change", onChange);
  detachMedia = () => mediaQuery == null ? void 0 : mediaQuery.removeEventListener("change", onChange);
}
function initTheme(options = {}) {
  var _a, _b, _c;
  config = {
    defaultTheme: (_a = options.defaultTheme) != null ? _a : "classic",
    storageKey: options.storageKey === void 0 ? "ucs-theme" : options.storageKey,
    system: (_b = options.system) != null ? _b : { light: "classic", dark: "dark" },
    syncMetaThemeColor: (_c = options.syncMetaThemeColor) != null ? _c : true,
    root: options.root,
    allowed: options.allowed
  };
  const stored = readStored();
  preference = stored && isAllowed(stored) ? stored : config.defaultTheme;
  watchSystem();
  apply();
  return state;
}
function setTheme(next, opts = {}) {
  if (!isAllowed(next))
    return getThemeState();
  preference = next;
  if (opts.persist !== false)
    writeStored(next);
  watchSystem();
  apply();
  return state;
}
function getToggleTarget() {
  var _a, _b;
  const current = getThemeState().theme;
  const id = (_a = current.pair) != null ? _a : current.mode === "dark" ? config.system.light : config.system.dark;
  if (!isAllowed(id))
    return null;
  return (_b = registry.get(id)) != null ? _b : null;
}
function toggleThemeMode(opts = {}) {
  const target = getToggleTarget();
  return target ? setTheme(target.id, opts) : getThemeState();
}
function getThemeState() {
  if (!state)
    state = buildState();
  return state;
}
function subscribeTheme(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function registerTheme(def) {
  registry.set(def.id, def);
  state = null;
  if (preference === def.id)
    apply();
}
function getThemes() {
  return [...registry.values()];
}

// src/theme/themedTitles.ts
var PARKED = "data-ucs-title";
var TIP_ID = "ucs-title-tip";
var active = null;
function enableThemedTitles(options = {}) {
  var _a;
  if (typeof document === "undefined")
    return () => {
    };
  active == null ? void 0 : active();
  const delay = (_a = options.delay) != null ? _a : 400;
  const exclude = options.exclude;
  const tip = document.createElement("div");
  tip.id = TIP_ID;
  tip.className = "ucs-title-tip";
  tip.setAttribute("role", "tooltip");
  tip.hidden = true;
  document.body.appendChild(tip);
  let owner = null;
  let timer = null;
  let prevDescribedBy = null;
  const restore = () => {
    if (timer)
      clearTimeout(timer);
    timer = null;
    tip.hidden = true;
    if (!owner)
      return;
    const text = owner.getAttribute(PARKED);
    if (text !== null && !owner.hasAttribute("title"))
      owner.setAttribute("title", text);
    owner.removeAttribute(PARKED);
    if (prevDescribedBy)
      owner.setAttribute("aria-describedby", prevDescribedBy);
    else
      owner.removeAttribute("aria-describedby");
    owner = null;
    prevDescribedBy = null;
  };
  const place = (x, y, below) => {
    const pad3 = 8;
    const { innerWidth: vw, innerHeight: vh } = window;
    const r = tip.getBoundingClientRect();
    let left = Math.min(Math.max(pad3, x), vw - r.width - pad3);
    let top = below;
    if (top + r.height + pad3 > vh)
      top = y - r.height - 8;
    left = Math.max(pad3, left);
    tip.style.left = `${left}px`;
    tip.style.top = `${Math.max(pad3, top)}px`;
  };
  const claim = (el, show) => {
    if (owner === el)
      return;
    restore();
    const text = el.getAttribute("title");
    if (!text || !text.trim())
      return;
    owner = el;
    el.setAttribute(PARKED, text);
    el.removeAttribute("title");
    prevDescribedBy = el.getAttribute("aria-describedby");
    el.setAttribute("aria-describedby", prevDescribedBy ? `${prevDescribedBy} ${TIP_ID}` : TIP_ID);
    tip.textContent = text;
    timer = setTimeout(() => {
      tip.hidden = false;
      show();
    }, delay);
  };
  const target = (node) => {
    if (!(node instanceof Element))
      return null;
    const el = node.closest("[title]");
    if (!el || el === tip)
      return null;
    if (exclude && el.closest(exclude))
      return null;
    return el;
  };
  const onOver = (e) => {
    if (e.pointerType === "touch")
      return;
    const el = target(e.target);
    if (!el)
      return;
    const { clientX, clientY } = e;
    claim(el, () => place(clientX, clientY, clientY + 18));
  };
  const onOut = (e) => {
    if (!owner)
      return;
    const to = e.relatedTarget;
    if (to instanceof Node && owner.contains(to))
      return;
    restore();
  };
  const onFocus = (e) => {
    const el = target(e.target);
    if (!el)
      return;
    claim(el, () => {
      const r = el.getBoundingClientRect();
      place(r.left, r.top, r.bottom + 6);
    });
  };
  const onBlur = () => restore();
  const onKey = (e) => {
    if (e.key === "Escape")
      restore();
  };
  const onDismiss = () => restore();
  document.addEventListener("pointerover", onOver, true);
  document.addEventListener("pointerout", onOut, true);
  document.addEventListener("focusin", onFocus, true);
  document.addEventListener("focusout", onBlur, true);
  document.addEventListener("keydown", onKey, true);
  document.addEventListener("pointerdown", onDismiss, true);
  window.addEventListener("scroll", onDismiss, true);
  const dispose = () => {
    restore();
    document.removeEventListener("pointerover", onOver, true);
    document.removeEventListener("pointerout", onOut, true);
    document.removeEventListener("focusin", onFocus, true);
    document.removeEventListener("focusout", onBlur, true);
    document.removeEventListener("keydown", onKey, true);
    document.removeEventListener("pointerdown", onDismiss, true);
    window.removeEventListener("scroll", onDismiss, true);
    tip.remove();
    if (active === dispose)
      active = null;
  };
  active = dispose;
  return dispose;
}

// src/theme/ThemeProvider.tsx
import { useMemo as useMemo21, useState as useState33, useSyncExternalStore as useSyncExternalStore2 } from "react";
import { Fragment as Fragment11, jsx as jsx48, jsxs as jsxs44 } from "react/jsx-runtime";
function useTheme() {
  const state2 = useSyncExternalStore2(subscribeTheme, getThemeState, getThemeState);
  return useMemo21(
    () => ({
      ...state2,
      setTheme: (next) => void setTheme(next),
      toggleMode: () => void toggleThemeMode(),
      toggleTarget: getToggleTarget()
    }),
    [state2]
  );
}
function ThemeProvider({ children, ...config2 }) {
  useState33(() => initTheme(config2));
  return /* @__PURE__ */ jsx48(Fragment11, { children });
}
function ThemePicker({
  themes,
  includeSystem = false,
  systemLabel = "System",
  onThemeChange,
  label = "Theme",
  placeholder = "",
  ...selectProps
}) {
  const state2 = useTheme();
  const options = useMemo21(() => {
    const list = themes ? themes.map((id) => state2.themes.find((t) => t.id === id)).filter((t) => !!t) : state2.themes;
    const opts = list.map((t) => ({ label: t.label, value: t.id }));
    if (includeSystem && state2.systemAllowed)
      opts.unshift({ label: systemLabel, value: SYSTEM_THEME });
    return opts;
  }, [themes, includeSystem, systemLabel, state2.themes, state2.systemAllowed]);
  return /* @__PURE__ */ jsx48(
    Select_default,
    {
      ...selectProps,
      label,
      placeholder,
      options,
      value: state2.preference,
      onValueChange: (value) => {
        const next = setTheme(value);
        onThemeChange == null ? void 0 : onThemeChange(next);
      }
    }
  );
}
var SunGlyph = /* @__PURE__ */ jsxs44(Fragment11, { children: [
  /* @__PURE__ */ jsx48("circle", { cx: "12", cy: "12", r: "4" }),
  /* @__PURE__ */ jsx48("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })
] });
var MoonGlyph = /* @__PURE__ */ jsx48("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" });
function ThemeModeIcon({ size = 20, show = "action", ...svgProps }) {
  const { mode } = useTheme();
  const sun = show === "action" ? mode === "dark" : mode === "light";
  return /* @__PURE__ */ jsx48(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      focusable: "false",
      "data-theme-icon": sun ? "sun" : "moon",
      ...svgProps,
      children: sun ? SunGlyph : MoonGlyph
    }
  );
}
function ThemeToggle({
  size = "md",
  getLabel = (m) => m === "dark" ? "Switch to dark theme" : "Switch to light theme",
  className,
  onToggle
}) {
  const { toggleTarget } = useTheme();
  if (!toggleTarget)
    return null;
  const label = getLabel(toggleTarget.mode);
  return /* @__PURE__ */ jsx48(
    Button_default,
    {
      variant: "ghost",
      size,
      className,
      ariaLabel: label,
      title: label,
      icon: /* @__PURE__ */ jsx48(ThemeModeIcon, {}),
      onClick: () => {
        const next = toggleThemeMode();
        onToggle == null ? void 0 : onToggle(next);
      }
    }
  );
}
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert_default as Alert,
  AlertDialog,
  AppShell,
  AppSidebar,
  AppTopbar_default as AppTopbar,
  AreaChart_default as AreaChart,
  AvatarGroup_default as AvatarGroup,
  Avatar_default as Avtar,
  BUILT_IN_THEMES,
  Badge_default as Badge,
  BarChart_default as BarChart,
  BottomSheet,
  Breadcrumb2 as Breadcrumb,
  BreadcrumbItem2 as BreadcrumbItem,
  Button_default as Button,
  ButtonGroup2 as ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Calendar_default as Calendar,
  Card_default as Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartTooltip,
  Checkbox_default as CheckBox,
  Chip,
  CodeBlock_default as CodeBlock,
  ColorPicker_default as ColorPicker,
  Combobox,
  CommandPalette_default as CommandPalette,
  ComposedChart_default as ComposedChart,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DEFAULT_COLOR_PICKER_PALETTE,
  DEFAULT_RANGE_PRESETS,
  DashboardShell_default as DashboardShell,
  DataTable_default as DataTable,
  DatePicker_default as DatePicker,
  DateRangePicker_default as DateRangePicker,
  Divider_default as Divider,
  Drawer_default as Drawer,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Dropzone,
  EmptyState,
  ErrorAnimation,
  ErrorState,
  FEEDBACK_ANIMATIONS,
  FeedbackState,
  FileUpload_default as FileUpload,
  FilterBar_default as FilterBar,
  Form_default as Form,
  FormField,
  GradientText_default as GradientText,
  Grid,
  GridItem,
  Hyperlink_default as Hyperlink,
  Icon_default as Icon,
  IconBox_default as IconBox,
  InfoAnimation,
  TextInput_default as Input,
  TextInputSearch_default as InputSearch,
  Kbd_default as Kbd,
  LineChart_default as LineChart,
  List,
  ListItem,
  Listbox,
  ListboxOption,
  LoadingOverlay_default as LoadingOverlay,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
  Modal,
  NoDataAnimation,
  NoSearchResultsAnimation,
  NumberInput_default as NumberInput,
  OfflineAnimation,
  OfflineBanner,
  OtpBox_default as OtpBox,
  PageHeader,
  Pagination_default as Pagination,
  PieChart_default as PieChart,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  ProgressBar_default as ProgressBar,
  RadioGroup_default as RadioGroup,
  Rating_default as Rating,
  SEGMENTED_CONTROL_DEFAULTS,
  SEGMENTED_CONTROL_SIZES,
  SYSTEM_THEME,
  SegmentedControl_default as SegmentedControl,
  Select_default as Select,
  Sheet,
  Skeleton_default as Skeleton,
  SkeletonGroup,
  Slider_default as Slider,
  Spinner_default as Spinner,
  StatCard_default as StatCard,
  Stepper,
  StepperStep,
  SuccessAnimation,
  Switch_default as Switch,
  Table_default as Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  TagInput_default as TagInput,
  TextArea_default as TextArea,
  TextView_default as TextView,
  ThemeModeIcon,
  ThemePicker,
  ThemeProvider,
  ThemeToggle,
  TimePicker_default as TimePicker,
  Timeline,
  TimelineItem,
  Toast_default as Toast,
  ToastProvider,
  ToggleButton_default as ToggleButton,
  ToggleGroup_default as ToggleGroup,
  ToolTip_default as ToolTip,
  Tooltip,
  WIZARD_DEFAULTS,
  Wizard_default as Wizard,
  computeContextMenuPosition,
  createDefaultRangePresets,
  detectFileKindFromBuffer,
  detectIsMac,
  enableThemedTitles,
  escapeCsvCell,
  formatLocaleNumber,
  formatShortcut,
  getItemRange,
  getPageCount,
  getPaginationRange,
  getThemeState,
  getThemes,
  getToggleTarget,
  initTheme,
  mergeSidebarTokensStyle,
  mergeTopbarTokensStyle,
  normalizeHex,
  parseAcceptString,
  parseLocaleNumber,
  pieLabelNamePercent,
  readAppSidebarPersist,
  registerTheme,
  setTheme,
  subscribeTheme,
  toAriaKeyShortcuts,
  toCsv,
  toggleThemeMode,
  useButtonGroupContext,
  useFilePicker,
  useFormField,
  useTheme,
  useToast,
  validateFileSecurity,
  validateFilename,
  validateFilesSecurity,
  writeAppSidebarPersist
};
//# sourceMappingURL=index.mjs.map