import {
  AreaChart_default,
  BarChart_default,
  ChartTooltip,
  LineChart_default,
  PieChart_default
} from "./chunk-LJRR4P7R.mjs";
import {
  AppShell,
  AppSidebar,
  AppTopbar_default,
  Avatar_default,
  DashboardShell_default,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  mergeSidebarTokensStyle,
  mergeTopbarTokensStyle,
  readAppSidebarPersist,
  writeAppSidebarPersist
} from "./chunk-OAPTBFQP.mjs";
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
} from "./chunk-2BLR2LGS.mjs";
import {
  Button_default,
  Icon_default,
  TextInputSearch_default,
  TextInput_default,
  close_default,
  error_default,
  getSanitizeText,
  isSafeHref
} from "./chunk-AKKWQ6RK.mjs";

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
var Switch = React.memo(function Switch2({
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
  size = "md"
}) {
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
  const toggle = useCallback(() => {
    if (disabled)
      return;
    setChecked(!checked);
  }, [checked, disabled, setChecked]);
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
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
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
  const labelStyle = {
    color: disabled ? COLORS.textMuted : COLORS.text,
    fontSize: "var(--text-body-size, 16px)",
    lineHeight: 1.5,
    userSelect: "none",
    cursor: disabled ? "not-allowed" : "pointer"
  };
  const switchEl = /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      id: switchId,
      role: "switch",
      "aria-checked": checked,
      "aria-disabled": disabled,
      disabled,
      "aria-label": hasVisibleLabel ? void 0 : ariaLabel != null ? ariaLabel : "Toggle",
      className: cls("ucs-switch__control", switchClassName),
      style: buttonStyle,
      onClick: toggle,
      "data-state": checked ? "checked" : "unchecked",
      "data-disabled": disabled ? "" : void 0,
      children: /* @__PURE__ */ jsx("span", { "aria-hidden": true, style: trackStyle, children: /* @__PURE__ */ jsx("span", { style: thumbStyle }) })
    }
  );
  const labelEl = hasVisibleLabel ? /* @__PURE__ */ jsx("label", { id: labelId, htmlFor: switchId, style: labelStyle, children: label }) : null;
  const rowStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2, 8px)",
    maxWidth: "100%"
  };
  return /* @__PURE__ */ jsxs("div", { className: cls("ucs-switch", className), style: rowStyle, children: [
    name ? /* @__PURE__ */ jsx("input", { type: "hidden", name, value: checked ? value : uncheckedValue, readOnly: true, "aria-hidden": true }) : null,
    hasVisibleLabel && labelPosition === "start" ? labelEl : null,
    switchEl,
    hasVisibleLabel && labelPosition === "end" ? labelEl : null
  ] });
});
Switch.displayName = "Switch";
var Switch_default = Switch;

// src/components/atoms/Badge/index.tsx
import React2, { useCallback as useCallback2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function cls2(...parts) {
  return parts.filter(Boolean).join(" ");
}
function DismissIcon() {
  return /* @__PURE__ */ jsx2(
    "svg",
    {
      className: "ds-badge__dismiss-icon",
      viewBox: "0 0 16 16",
      width: 16,
      height: 16,
      "aria-hidden": true,
      focusable: "false",
      children: /* @__PURE__ */ jsx2(
        "path",
        {
          fill: "currentColor",
          d: "M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 1 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06Z"
        }
      )
    }
  );
}
var Badge = React2.memo(function Badge2({
  children,
  variant = "neutral",
  tone = "soft",
  shape = "rounded",
  size = "sm",
  elevated = false,
  dot = false,
  icon,
  onDismiss,
  dismissLabel = "Remove",
  className,
  onClick,
  ...rest
}) {
  const handleDismiss = useCallback2(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDismiss == null ? void 0 : onDismiss();
    },
    [onDismiss]
  );
  return /* @__PURE__ */ jsxs2(
    "span",
    {
      className: cls2("ds-badge", className),
      "data-variant": variant,
      "data-tone": tone,
      "data-shape": shape,
      "data-size": size,
      "data-elevated": elevated ? "true" : void 0,
      onClick,
      ...rest,
      children: [
        dot ? /* @__PURE__ */ jsx2("span", { className: "ds-badge__dot", "aria-hidden": true }) : null,
        icon ? /* @__PURE__ */ jsx2("span", { className: "ds-badge__icon", children: icon }) : null,
        /* @__PURE__ */ jsx2("span", { className: "ds-badge__label", children }),
        onDismiss ? /* @__PURE__ */ jsx2(
          "button",
          {
            type: "button",
            className: "ds-badge__dismiss",
            "aria-label": dismissLabel,
            onClick: handleDismiss,
            children: /* @__PURE__ */ jsx2(DismissIcon, {})
          }
        ) : null
      ]
    }
  );
});
var Badge_default = Badge;
var Chip = Badge;
var Tag = Badge;

// src/components/atoms/RadioGroup/RadioGroup.config.ts
var defaultRadioColorClass = "";
var defaultLabelColorClass = "title-2";

// src/components/atoms/RadioGroup/RadioGroup.utils.ts
function cls3(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/atoms/RadioGroup/index.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
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
    brand: "var(--color-brand-primary)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    bgSurface: "var(--color-bg-surface)",
    borderDefault: "var(--color-border-default)",
    accentLavender: "var(--color-accent-lavender-10)",
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
  return /* @__PURE__ */ jsxs3(
    "label",
    {
      htmlFor: id,
      className: cls3("ucs-cc-radio-root", itemMarginClass),
      style: wrapperStyle,
      children: [
        /* @__PURE__ */ jsx3(
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
        /* @__PURE__ */ jsx3(
          "span",
          {
            "aria-hidden": "true",
            className: cls3("ucs-cc-radio-face", radioColorClass),
            children: /* @__PURE__ */ jsx3("span", { className: "ucs-cc-radio-dot" })
          }
        ),
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx3(
            "span",
            {
              className: cls3(labelColorClass),
              style: labelStyle,
              children: label
            }
          ),
          subLabel && /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsxs3(
    "fieldset",
    {
      className: "",
      style: finalStyle,
      "aria-labelledby": labelledById,
      children: [
        /* @__PURE__ */ jsx3("legend", { id: labelledById, className: "visually-hidden", children: name }),
        options.map((opt, index) => {
          var _a;
          const isChecked = selectedValue === opt.value;
          let tabIndex = -1;
          if (isChecked) {
            tabIndex = 0;
          } else if (!hasCheckedValue && index === firstEnabledIndex) {
            tabIndex = 0;
          }
          return /* @__PURE__ */ jsx3(
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
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function cx(...values) {
  return values.filter(Boolean).join(" ");
}
function Form({
  badge,
  title,
  description,
  children,
  actions,
  footer,
  layout = "stacked",
  columns = 2,
  gap = 18,
  maxWidth = 520,
  shellClassName = "",
  cardClassName = "",
  contentClassName = "",
  fieldsClassName = "",
  shellStyle,
  cardStyle,
  contentStyle,
  fieldsStyle,
  className = "",
  style,
  ...rest
}) {
  const resolvedShellStyle = {
    ...shellStyle
  };
  const resolvedCardStyle = {
    maxWidth,
    "--form-gap": typeof gap === "number" ? `${gap}px` : gap,
    "--form-columns": Math.max(1, columns),
    ...cardStyle,
    ...style
  };
  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "var(--space-1) var(--space-2)",
    borderRadius: 9999,
    background: "var(--color-accent-lavender-10)",
    color: "var(--color-brand-link)",
    fontSize: "var(--text-small-size)",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase"
  };
  const titleStyle = {
    margin: "var(--space-3) 0 var(--space-1)",
    color: "var(--color-text-primary)",
    fontSize: "clamp(var(--text-h2-size), 4vw, var(--text-h1-size))",
    lineHeight: "var(--text-h1-line-height)",
    fontWeight: 800
  };
  const descriptionStyle = {
    margin: 0,
    color: "var(--color-text-secondary)",
    fontSize: "var(--text-body-size)",
    lineHeight: "var(--text-body-line-height)"
  };
  const resolvedContentStyle = {
    ...contentStyle
  };
  const resolvedFieldsStyle = { ...fieldsStyle };
  return /* @__PURE__ */ jsx4("section", { className: cx("ds-form-shell", shellClassName), style: resolvedShellStyle, children: /* @__PURE__ */ jsxs4(
    "div",
    {
      className: cx("ds-form-card", cardClassName),
      style: resolvedCardStyle,
      children: [
        (badge || title || description) && /* @__PURE__ */ jsxs4("header", { children: [
          badge && /* @__PURE__ */ jsx4("span", { style: badgeStyle, children: badge }),
          title && /* @__PURE__ */ jsx4("h1", { style: titleStyle, children: title }),
          description && /* @__PURE__ */ jsx4("p", { style: descriptionStyle, children: description })
        ] }),
        /* @__PURE__ */ jsxs4(
          "form",
          {
            ...rest,
            className: cx("ds-form-content", contentClassName, className),
            style: resolvedContentStyle,
            children: [
              /* @__PURE__ */ jsx4(
                "div",
                {
                  className: cx(
                    "ds-form-fields",
                    layout === "grid" && "ds-form-fields--grid",
                    fieldsClassName
                  ),
                  style: resolvedFieldsStyle,
                  children
                }
              ),
              (actions || footer) && /* @__PURE__ */ jsxs4("div", { className: "ds-form-actions", children: [
                actions,
                footer
              ] })
            ]
          }
        )
      ]
    }
  ) });
}

// src/components/molecules/Grid/index.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function toCssSize(value, fallback) {
  if (value === void 0)
    return fallback;
  return typeof value === "number" ? `${value}px` : value;
}
function GridItem({
  span = 1,
  rowSpan = 1,
  style,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      ...rest,
      style: {
        minWidth: 0,
        gridColumn: `span ${Math.max(1, span)} / span ${Math.max(1, span)}`,
        gridRow: `span ${Math.max(1, rowSpan)} / span ${Math.max(1, rowSpan)}`,
        ...style
      },
      children
    }
  );
}
function Grid({
  columns = 2,
  gap = 16,
  minItemWidth = 240,
  alignItems = "stretch",
  justifyItems = "stretch",
  autoFit = false,
  fullWidth = true,
  style,
  children,
  ...rest
}) {
  const gapValue = toCssSize(gap, "16px");
  const minWidthValue = toCssSize(minItemWidth, "240px");
  return /* @__PURE__ */ jsx5(
    "div",
    {
      ...rest,
      style: {
        display: "grid",
        width: fullWidth ? "100%" : "auto",
        minWidth: 0,
        gap: gapValue,
        alignItems,
        justifyItems,
        gridTemplateColumns: autoFit ? `repeat(auto-fit, minmax(${minWidthValue}, 1fr))` : `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
        ...style
      },
      children
    }
  );
}

// src/components/molecules/Breadcrumb/index.tsx
import React3 from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
function cls4(...parts) {
  return parts.filter(Boolean).join(" ");
}
var Breadcrumb = React3.memo(function Breadcrumb2({
  ariaLabel = "Breadcrumb",
  separator = "slash",
  size = "sm",
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx6(
    "nav",
    {
      "aria-label": ariaLabel,
      className: cls4("ds-breadcrumb", className),
      "data-separator": separator,
      "data-size": size,
      ...rest,
      children: /* @__PURE__ */ jsx6("ol", { className: "ds-breadcrumb__list", children })
    }
  );
});
var BreadcrumbItem = React3.memo(function BreadcrumbItem2({
  href,
  current = false,
  children,
  className,
  linkProps,
  ...liRest
}) {
  const hasHref = typeof href === "string" && href.length > 0;
  const isNavigable = hasHref && !current;
  if (isNavigable) {
    return /* @__PURE__ */ jsx6("li", { className: cls4("ds-breadcrumb__item", className), ...liRest, children: /* @__PURE__ */ jsx6("a", { href, className: "ds-breadcrumb__link", ...linkProps, children }) });
  }
  return /* @__PURE__ */ jsx6(
    "li",
    {
      className: cls4("ds-breadcrumb__item", "ds-breadcrumb__item--current", className),
      "aria-current": "page",
      ...liRest,
      children: hasHref ? /* @__PURE__ */ jsx6(
        "a",
        {
          href,
          className: "ds-breadcrumb__link ds-breadcrumb__link--current",
          "aria-current": "page",
          ...linkProps,
          children
        }
      ) : /* @__PURE__ */ jsx6("span", { className: "ds-breadcrumb__text", children })
    }
  );
});

// src/components/molecules/Tabs/index.tsx
import React4, {
  createContext,
  useCallback as useCallback3,
  useContext,
  useId as useId2,
  useLayoutEffect,
  useMemo as useMemo2,
  useRef,
  useState as useState2
} from "react";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
function cls5(...parts) {
  return parts.filter(Boolean).join(" ");
}
function toCssLength(v) {
  if (v === void 0)
    return void 0;
  return typeof v === "number" ? `${v}px` : v;
}
var TabsContext = createContext(null);
function useTabsContext(component) {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Tabs>`);
  }
  return ctx;
}
var Tabs = React4.memo(function Tabs2({
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
  const reactId = useId2();
  const baseId = idProp != null ? idProp : `tabs-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState2(defaultValue);
  const value = isControlled ? valueProp : inner;
  const setValue = useCallback3(
    (next) => {
      if (!isControlled) {
        setInner(next);
      }
      onValueChange == null ? void 0 : onValueChange(next);
    },
    [isControlled, onValueChange]
  );
  const cssVars = useMemo2(() => {
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
  const ctx = useMemo2(
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
  return /* @__PURE__ */ jsx7(TabsContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx7(
    "div",
    {
      className: cls5("ds-tabs", className),
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
var TabsList = React4.memo(function TabsList2({
  ariaLabel,
  className,
  children,
  onKeyDown,
  ...rest
}) {
  const ctx = useTabsContext("TabsList");
  const listRef = useRef(null);
  const [segmentPill, setSegmentPill] = useState2({ left: 0, top: 0, width: 0, height: 0, visible: false });
  const updateSegmentPill = useCallback3(() => {
    const list = listRef.current;
    if (!list || ctx.variant !== "segmented")
      return;
    const active = list.querySelector('[role="tab"][aria-selected="true"]');
    if (!active || active.getAttribute("data-disabled") === "true") {
      setSegmentPill((p) => ({ ...p, visible: false }));
      return;
    }
    const lr = list.getBoundingClientRect();
    const tr = active.getBoundingClientRect();
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
  const handleKeyDown = useCallback3(
    (e) => {
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      const tabs = getAllTabButtons(listRef.current);
      if (tabs.length === 0)
        return;
      const n = tabs.length;
      const active = document.activeElement;
      let idx = tabs.indexOf(active);
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
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      ref: listRef,
      role: "tablist",
      "aria-label": ariaLabel,
      "aria-orientation": ctx.orientation,
      "data-list-layout": ctx.listLayout,
      className: cls5("ds-tabs__list", showSegmentPill && "ds-tabs__list--segmented", className),
      onKeyDown: handleKeyDown,
      ...rest,
      children: [
        showSegmentPill ? /* @__PURE__ */ jsx7(
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
var TabsTrigger = React4.memo(function TabsTrigger2({
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
  return /* @__PURE__ */ jsxs5(
    "button",
    {
      ...rest,
      type,
      role: "tab",
      id: tabId,
      className: cls5("ds-tabs__trigger", icon != null ? "ds-tabs__trigger--with-icon" : void 0, className),
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
        icon != null ? /* @__PURE__ */ jsx7("span", { className: "ds-tabs__trigger-icon", "aria-hidden": true, children: icon }) : null,
        /* @__PURE__ */ jsx7("span", { className: "ds-tabs__trigger-text", children })
      ]
    }
  );
});
var TabsContent = React4.memo(function TabsContent2({
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
  return /* @__PURE__ */ jsx7(
    "div",
    {
      ...rest,
      role: "tabpanel",
      id: `${ctx.baseId}-panel-${value}`,
      "aria-labelledby": `${ctx.baseId}-tab-${value}`,
      className: cls5("ds-tabs__panel", className),
      "data-state": selected ? "active" : "inactive",
      "data-value": value,
      hidden: !selected,
      tabIndex: selected ? 0 : -1,
      children
    }
  );
});

// src/components/molecules/Accordion/index.tsx
import React5, {
  createContext as createContext2,
  useCallback as useCallback4,
  useContext as useContext2,
  useId as useId3,
  useMemo as useMemo3,
  useRef as useRef2,
  useState as useState3
} from "react";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
function cls6(...parts) {
  return parts.filter(Boolean).join(" ");
}
var AccordionContext = createContext2(null);
function useAccordionContext(component) {
  const ctx = useContext2(AccordionContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Accordion>`);
  }
  return ctx;
}
var AccordionItemContext = createContext2(null);
function useAccordionItemContext(component) {
  const ctx = useContext2(AccordionItemContext);
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
var Accordion = React5.memo(function Accordion2({
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
  const reactId = useId3();
  const baseId = `accordion-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState3(() => {
    if (defaultValue !== void 0)
      return defaultValue;
    if (type === "multiple")
      return [];
    return void 0;
  });
  const value = isControlled ? valueProp : inner;
  const valueRef = useRef2(value);
  valueRef.current = value;
  const setValue = useCallback4(
    (next) => {
      if (!isControlled) {
        setInner(next);
      }
      onValueChange == null ? void 0 : onValueChange(next);
    },
    [isControlled, onValueChange]
  );
  const isOpen = useCallback4(
    (itemValue) => {
      if (type === "single") {
        return normalizeSingleValue(value) === itemValue;
      }
      return normalizeMultipleValue(value).includes(itemValue);
    },
    [type, value]
  );
  const toggle = useCallback4(
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
        const arr = normalizeMultipleValue(v);
        const i = arr.indexOf(itemValue);
        if (i >= 0) {
          arr.splice(i, 1);
        } else {
          arr.push(itemValue);
        }
        setValue([...arr]);
      }
    },
    [type, collapsible, setValue]
  );
  const ctx = useMemo3(
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
  return /* @__PURE__ */ jsx8(AccordionContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx8(
    "div",
    {
      className: cls6("ds-accordion", className),
      "data-variant": variant,
      "data-motion": motion,
      "data-density": density,
      "data-orientation": "vertical",
      ...rest,
      children
    }
  ) });
});
var AccordionItem = React5.memo(function AccordionItem2({
  value,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const acc = useAccordionContext("AccordionItem");
  const reactId = useId3();
  const safe = String(value).replace(/[^a-zA-Z0-9_-]/g, "-");
  const suffix = `${acc.baseId}-${safe}-${reactId.replace(/:/g, "")}`;
  const itemCtx = useMemo3(
    () => ({
      value,
      disabled,
      triggerId: `${suffix}-trigger`,
      contentId: `${suffix}-content`
    }),
    [value, disabled, suffix]
  );
  return /* @__PURE__ */ jsx8(AccordionItemContext.Provider, { value: itemCtx, children: /* @__PURE__ */ jsx8(
    "div",
    {
      className: cls6("ds-accordion__item", className),
      "data-disabled": disabled ? "true" : void 0,
      "data-state": acc.isOpen(value) ? "open" : "closed",
      ...rest,
      children
    }
  ) });
});
function ChevronIcon() {
  return /* @__PURE__ */ jsx8("svg", { className: "ds-accordion__chevron", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx8(
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
var AccordionTrigger = React5.memo(function AccordionTrigger2({
  children,
  className,
  onClick,
  ...rest
}) {
  const acc = useAccordionContext("AccordionTrigger");
  const item = useAccordionItemContext("AccordionTrigger");
  const open = acc.isOpen(item.value) && !item.disabled;
  return /* @__PURE__ */ jsxs6(
    "button",
    {
      ...rest,
      type: "button",
      id: item.triggerId,
      className: cls6("ds-accordion__trigger", className),
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
        /* @__PURE__ */ jsx8("span", { className: "ds-accordion__trigger-label", children }),
        /* @__PURE__ */ jsx8(ChevronIcon, {})
      ]
    }
  );
});
var AccordionContent = React5.memo(function AccordionContent2({
  children,
  className,
  forceMount = false,
  ...rest
}) {
  const acc = useAccordionContext("AccordionContent");
  const item = useAccordionItemContext("AccordionContent");
  const open = acc.isOpen(item.value);
  const animated = acc.motion === "default";
  const keepMounted = animated || forceMount || open;
  if (!keepMounted) {
    return null;
  }
  const hidden = !open;
  const useInertWhenClosed = hidden && animated;
  return /* @__PURE__ */ jsx8(
    "div",
    {
      ...rest,
      className: cls6("ds-accordion__content-outer", className),
      "data-state": open ? "open" : "closed",
      "data-animated": animated ? "true" : void 0,
      id: item.contentId,
      role: "region",
      "aria-labelledby": item.triggerId,
      "aria-hidden": hidden ? true : void 0,
      hidden: hidden && !forceMount && !animated ? true : void 0,
      inert: useInertWhenClosed ? true : void 0,
      children: /* @__PURE__ */ jsx8("div", { className: "ds-accordion__content-inner", children: /* @__PURE__ */ jsx8(
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
import React6, {
  Children,
  cloneElement,
  createContext as createContext3,
  isValidElement,
  useContext as useContext3,
  useMemo as useMemo4
} from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var ButtonGroupContext = createContext3(null);
function useButtonGroup(component) {
  const ctx = useContext3(ButtonGroupContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <ButtonGroup>`);
  }
  return ctx;
}
function cls7(...parts) {
  return parts.filter(Boolean).join(" ");
}
function augmentChildren(children) {
  return Children.map(Children.toArray(children), (child) => {
    if (!isValidElement(child))
      return child;
    if (child.type === Button_default) {
      const el = child;
      return cloneElement(el, {
        className: cls7("ds-button-group__segment", el.props.className)
      });
    }
    return child;
  });
}
var ButtonGroup = React6.memo(function ButtonGroup2({
  children,
  orientation = "horizontal",
  className,
  ...rest
}) {
  const ctx = useMemo4(() => ({ orientation }), [orientation]);
  return /* @__PURE__ */ jsx9(ButtonGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx9(
    "div",
    {
      role: "group",
      className: cls7("ds-button-group", className),
      "data-orientation": orientation,
      ...rest,
      children: augmentChildren(children)
    }
  ) });
});
var ButtonGroupSeparator = React6.memo(function ButtonGroupSeparator2({
  orientation: orientationProp,
  className,
  ...rest
}) {
  const { orientation: parentOrientation } = useButtonGroup("ButtonGroupSeparator");
  const orientation = orientationProp != null ? orientationProp : parentOrientation === "horizontal" ? "vertical" : "horizontal";
  return /* @__PURE__ */ jsx9(
    "div",
    {
      role: "separator",
      "aria-orientation": orientation === "vertical" ? "vertical" : "horizontal",
      className: cls7("ds-button-group__separator", className),
      "data-orientation": orientation,
      ...rest
    }
  );
});
var ButtonGroupText = React6.memo(function ButtonGroupText2({
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
      className: cls7("ds-button-group__text", childProps.className, className)
    });
  }
  return /* @__PURE__ */ jsx9("span", { className: cls7("ds-button-group__text", className), ...rest, children });
});

// src/components/molecules/Stepper/index.tsx
import React7, {
  createContext as createContext4,
  useCallback as useCallback5,
  useContext as useContext4,
  useId as useId4,
  useMemo as useMemo5,
  useState as useState4
} from "react";
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
function cls8(...parts) {
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
var StepperContext = createContext4(null);
function useStepperContext(component) {
  const ctx = useContext4(StepperContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Stepper>`);
  }
  return ctx;
}
function isStepperStep(el) {
  return React7.isValidElement(el) && el.type.displayName === "StepperStep";
}
var Stepper = React7.memo(function Stepper2({
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
  const reactId = useId4();
  const baseId = `stepper-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = useState4(defaultValue);
  const activeIndex = isControlled ? valueProp : inner;
  const steps = useMemo5(
    () => React7.Children.toArray(children).filter(isStepperStep),
    [children]
  );
  const stepCount = steps.length;
  const setActiveIndex = useCallback5(
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
  const progressPct = useMemo5(() => {
    if (progressValueProp !== void 0) {
      return clampPct(progressValueProp);
    }
    return defaultProgressPercent(safeIndex, stepCount);
  }, [progressValueProp, safeIndex, stepCount]);
  const ctx = useMemo5(
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
  return /* @__PURE__ */ jsx10(StepperContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx10(
    "nav",
    {
      className: cls8("ds-stepper", scrollable && "ds-stepper--scroll", className),
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
      children: stepCount === 0 ? null : /* @__PURE__ */ jsxs7(
        "div",
        {
          className: "ds-stepper__grid",
          style: { gridTemplateColumns: `repeat(${stepCount * 2 - 1}, minmax(0, 1fr))` },
          children: [
            /* @__PURE__ */ jsx10("div", { className: "ds-stepper__track-shell", style: { gridColumn: "1 / -1", gridRow: 1 }, children: showContinuousTrack ? /* @__PURE__ */ jsxs7("div", { className: "ds-stepper__track-inset", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsx10("div", { className: "ds-stepper__track-line ds-stepper__track-line--bg" }),
              /* @__PURE__ */ jsx10("div", { className: "ds-stepper__track-line ds-stepper__track-line--fill" })
            ] }) : null }),
            steps.map((step, index) => {
              const colMarker = index * 2 + 1;
              const colGap = index * 2 + 2;
              const isLast = index === stepCount - 1;
              return /* @__PURE__ */ jsxs7(React7.Fragment, { children: [
                /* @__PURE__ */ jsx10("div", { className: "ds-stepper__cell ds-stepper__cell--marker", style: { gridColumn: colMarker, gridRow: 1 }, children: React7.cloneElement(step, {
                  stepIndex: index,
                  stepPart: "marker"
                }) }),
                /* @__PURE__ */ jsx10("div", { className: "ds-stepper__cell ds-stepper__cell--label", style: { gridColumn: colMarker, gridRow: 2 }, children: React7.cloneElement(step, {
                  stepIndex: index,
                  stepPart: "text"
                }) }),
                !isLast ? /* @__PURE__ */ jsx10(
                  "div",
                  {
                    className: cls8(
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
var StepperStep = React7.memo(function StepperStep2({
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
  const state = index < ctx.activeIndex ? "complete" : index === ctx.activeIndex ? "current" : "upcoming";
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
  const showCheck = state === "complete" && showCheckWhenComplete;
  const markerContent = showCheck ? /* @__PURE__ */ jsx10("svg", { className: "ds-stepper__check", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx10(
    "path",
    {
      d: "M13.5 4.5L6.5 11.5L3 8",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) : icon != null ? /* @__PURE__ */ jsx10("span", { className: "ds-stepper__marker-icon-wrap", children: icon }) : markerText != null ? /* @__PURE__ */ jsx10("span", { className: "ds-stepper__marker-inner", children: markerText }) : /* @__PURE__ */ jsx10("span", { className: "ds-stepper__marker-inner", children: index + 1 });
  if (stepPart === "text") {
    return /* @__PURE__ */ jsxs7(
      "div",
      {
        id: labelId,
        className: cls8("ds-stepper__label-block", className),
        "data-state": state,
        "data-interactive": !isDisabled ? "true" : void 0,
        onClick: handleLabelClick,
        children: [
          /* @__PURE__ */ jsx10("span", { className: "ds-stepper__label", children: label }),
          description != null && description !== false ? /* @__PURE__ */ jsx10("span", { className: "ds-stepper__description", children: description }) : null
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs7(
    "button",
    {
      ...rest,
      type: "button",
      "aria-labelledby": `${labelId}-pos ${labelId}`,
      disabled: isDisabled,
      className: cls8("ds-stepper__marker-btn", className),
      "data-state": state,
      "aria-current": state === "current" ? "step" : void 0,
      onClick: handleMarkerClick,
      children: [
        /* @__PURE__ */ jsx10("span", { id: `${labelId}-pos`, className: "ds-stepper__sr", children: `Step ${index + 1} of ${ctx.stepCount}${state === "complete" ? ", completed" : ""}:` }),
        /* @__PURE__ */ jsx10("span", { className: "ds-stepper__marker", "aria-hidden": "true", children: markerContent })
      ]
    }
  );
});
StepperStep.displayName = "StepperStep";

// src/components/molecules/FileUpload/index.tsx
import React8, { useCallback as useCallback6, useId as useId5, useMemo as useMemo6, useRef as useRef3, useState as useState5 } from "react";

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

// src/components/molecules/FileUpload/index.tsx
import { jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
function cls9(...parts) {
  return parts.filter(Boolean).join(" ");
}
function fileListToArray(list) {
  if (!list || list.length === 0)
    return [];
  return Array.from(list);
}
function DefaultUploadIcon() {
  return /* @__PURE__ */ jsx11("svg", { width: 40, height: 40, viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx11(
    "path",
    {
      fill: "currentColor",
      d: "M18 15v3H6v-3H4v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3h-2ZM7 9l5-5.5L17 9h-4v4H7V9Z"
    }
  ) });
}
var FileUpload = React8.memo(function FileUpload2({
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
  ...rest
}) {
  var _a, _b, _c;
  const reactId = useId5();
  const inputId = idProp != null ? idProp : `file-upload-${reactId.replace(/:/g, "")}`;
  const descId = `${inputId}-desc`;
  const errId = `${inputId}-err`;
  const inputRef = useRef3(null);
  const dragDepth = useRef3(0);
  const [dragging, setDragging] = useState5(false);
  const [internalError, setInternalError] = useState5(null);
  const showError = (_a = errorMessage != null ? errorMessage : internalError) != null ? _a : void 0;
  const describedBy = cls9(description && descId, showError && errId) || void 0;
  const parsedAccept = useMemo6(() => parseAcceptString(accept), [accept]);
  const hasAllowlist = ((_b = allowedExtensions == null ? void 0 : allowedExtensions.length) != null ? _b : 0) > 0 || ((_c = allowedMimeTypes == null ? void 0 : allowedMimeTypes.length) != null ? _c : 0) > 0 || parsedAccept.extensions.length > 0 || parsedAccept.mimes.length > 0;
  const securityOptions = useMemo6(
    () => ({
      accept,
      allowedExtensions,
      allowedMimeTypes,
      verifyMagicBytes: verifyMagicBytes !== void 0 ? verifyMagicBytes : hasAllowlist ? true : false,
      scanPdfForSqlInjection,
      maxScanBytes
    }),
    [
      accept,
      allowedExtensions,
      allowedMimeTypes,
      verifyMagicBytes,
      hasAllowlist,
      scanPdfForSqlInjection,
      maxScanBytes
    ]
  );
  const validateSync = useCallback6(
    (files) => {
      if (files.length === 0)
        return null;
      if (multiple && maxFiles != null && files.length > maxFiles) {
        return `You can upload at most ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`;
      }
      if (!multiple && files.length > 1) {
        return "Only one file is allowed.";
      }
      if (maxSizeBytes != null) {
        for (const f of files) {
          if (f.size > maxSizeBytes) {
            const limit = maxSizeBytes >= 1024 * 1024 ? `${(maxSizeBytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(maxSizeBytes / 1024))} KB`;
            return `\u201C${f.name}\u201D is larger than ${limit}.`;
          }
        }
      }
      return null;
    },
    [maxFiles, maxSizeBytes, multiple]
  );
  const commitFiles = useCallback6(
    async (files) => {
      const syncErr = validateSync(files);
      if (syncErr) {
        setInternalError(syncErr);
        onError == null ? void 0 : onError(syncErr);
        return;
      }
      const secErr = await validateFilesSecurity(files, securityOptions);
      if (secErr) {
        setInternalError(secErr);
        onError == null ? void 0 : onError(secErr);
        return;
      }
      setInternalError(null);
      onFilesChange == null ? void 0 : onFilesChange(files);
      if (clearInputAfterSelect && inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [clearInputAfterSelect, onError, onFilesChange, securityOptions, validateSync]
  );
  const handleInputChange = useCallback6(
    (e) => {
      const files = fileListToArray(e.target.files);
      void commitFiles(files);
    },
    [commitFiles]
  );
  const onDragEnter = useCallback6((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled)
      return;
    dragDepth.current += 1;
    setDragging(true);
  }, [disabled]);
  const onDragLeave = useCallback6((e) => {
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
  const onDragOver = useCallback6((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      e.dataTransfer.dropEffect = "copy";
    }
  }, [disabled]);
  const onDrop = useCallback6(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragDepth.current = 0;
      setDragging(false);
      if (disabled)
        return;
      const files = fileListToArray(e.dataTransfer.files);
      void commitFiles(files);
    },
    [commitFiles, disabled]
  );
  const captureProp = capture === true ? { capture: "user" } : capture === false ? {} : capture != null ? { capture } : {};
  return /* @__PURE__ */ jsxs8(
    "div",
    {
      className: cls9("ds-file-upload", className),
      "data-size": size,
      "data-dragging": dragging ? "true" : void 0,
      "data-error": showError ? "true" : void 0,
      "data-disabled": disabled ? "true" : void 0,
      ...rest,
      children: [
        /* @__PURE__ */ jsx11(
          "input",
          {
            ref: inputRef,
            id: inputId,
            name,
            type: "file",
            className: "ds-file-upload__input",
            accept,
            multiple,
            disabled,
            required,
            "aria-invalid": showError ? true : void 0,
            "aria-describedby": describedBy,
            "aria-required": required || void 0,
            onChange: handleInputChange,
            ...captureProp
          }
        ),
        /* @__PURE__ */ jsx11(
          "div",
          {
            className: "ds-file-upload__zone",
            "data-disabled": disabled ? "true" : void 0,
            onDragEnter,
            onDragLeave,
            onDragOver,
            onDrop,
            children: /* @__PURE__ */ jsxs8("label", { htmlFor: inputId, className: "ds-file-upload__label", children: [
              icon !== null ? /* @__PURE__ */ jsx11("span", { className: "ds-file-upload__icon", children: icon === void 0 ? /* @__PURE__ */ jsx11(DefaultUploadIcon, {}) : icon }) : null,
              /* @__PURE__ */ jsx11("span", { children: label }),
              description ? /* @__PURE__ */ jsx11("p", { id: descId, className: "ds-file-upload__description", children: description }) : null
            ] })
          }
        ),
        showError ? /* @__PURE__ */ jsx11("p", { id: errId, className: "ds-file-upload__error", role: "alert", children: showError }) : null
      ]
    }
  );
});
var FileUpload_default = FileUpload;
var Dropzone = FileUpload;

// src/components/atoms/TextArea/index.tsx
import { useId as useId6, useState as useState6, useEffect } from "react";

// src/components/atoms/TextArea/TextArea.config.ts
var defaultConfig = {
  defaultRows: 3,
  defaultMaxLength: 500,
  defaultRemoveChars: "/<>@#",
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
import { jsx as jsx12, jsxs as jsxs9 } from "react/jsx-runtime";
var TextArea = ({
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
  ...props
}) => {
  var _a;
  const textareaId = useId6();
  const [internalValue, setInternalValue] = useState6((_a = value != null ? value : defaultValue) != null ? _a : "");
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs9("div", { className: containerClass, style: wrapperStyle, children: [
    label && /* @__PURE__ */ jsx12("label", { htmlFor: textareaId, style: labelStyle, children: label }),
    /* @__PURE__ */ jsx12(
      "textarea",
      {
        id: textareaId,
        className,
        style: textareaStyle,
        value: internalValue,
        rows,
        maxLength,
        onChange: handleChange,
        "aria-invalid": resolvedStatus === "error",
        "aria-label": label ? void 0 : ariaLabel,
        ...props
      }
    ),
    (footerMessage || showCount) && /* @__PURE__ */ jsxs9("div", { style: footerRowStyle, children: [
      /* @__PURE__ */ jsx12("span", { style: footerTextStyle, children: footerMessage }),
      showCount && /* @__PURE__ */ jsxs9("span", { style: countStyle, children: [
        currentLength,
        " / ",
        maxLength
      ] })
    ] })
  ] });
};
var TextArea_default = TextArea;

// src/components/atoms/ProgressBar/index.tsx
import React10 from "react";

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
var clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
var calculateCircumference = (radius) => 2 * Math.PI * radius;

// src/components/atoms/ProgressBar/index.tsx
import { jsx as jsx13, jsxs as jsxs10 } from "react/jsx-runtime";
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
  const pct = clamp(computedPct);
  const visualFill = gradient || customColor;
  const trackFill = trackColor || "var(--color-bg-page)";
  const resolvedAnimation = animation !== "smooth" ? animation : animated ? "pulse" : "smooth";
  const [animatedWidth, setAnimatedWidth] = React10.useState(0);
  React10.useEffect(() => {
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
    return /* @__PURE__ */ jsxs10(
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
          /* @__PURE__ */ jsxs10(
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
                showLabel && label ? /* @__PURE__ */ jsx13(
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
                ) : /* @__PURE__ */ jsx13("span", {}),
                showValue && /* @__PURE__ */ jsxs10(
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
          /* @__PURE__ */ jsx13(
            "div",
            {
              style: {
                ...lineTrackStyle,
                position: "relative",
                overflow: "hidden",
                width: "100%"
              },
              children: /* @__PURE__ */ jsx13(
                "div",
                {
                  className: "progress-bar-fill",
                  style: {
                    ...lineFillStyle,
                    opacity: resolvedAnimation === "pulse" ? 0.92 : 1,
                    animation: resolvedAnimation === "pulse" ? "progress-pulse 1.4s ease-in-out infinite" : void 0
                  },
                  children: showStripeOverlay && /* @__PURE__ */ jsx13(
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
  const [animatedOffset, setAnimatedOffset] = React10.useState(circumference);
  React10.useEffect(() => {
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
  const circleId = React10.useId();
  return /* @__PURE__ */ jsxs10(
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
        /* @__PURE__ */ jsxs10(
          "div",
          {
            style: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: dims, height: dims },
            children: [
              /* @__PURE__ */ jsxs10("svg", { width: dims, height: dims, className: "block", children: [
                gradient && /* @__PURE__ */ jsx13("defs", { children: /* @__PURE__ */ jsxs10("linearGradient", { id: `progress-gradient-${circleId}`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                  /* @__PURE__ */ jsx13("stop", { offset: "0%", stopColor: "var(--color-state-info)" }),
                  /* @__PURE__ */ jsx13("stop", { offset: "100%", stopColor: "var(--color-accent-lavender-40)" })
                ] }) }),
                /* @__PURE__ */ jsx13(
                  "circle",
                  {
                    cx: dims / 2,
                    cy: dims / 2,
                    r: radius,
                    strokeWidth: effectiveStrokeWidth,
                    style: { stroke: trackFill, fill: "none" }
                  }
                ),
                /* @__PURE__ */ jsx13(
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
                      filter: resolvedAnimation === "pulse" ? "drop-shadow(0 0 6px rgba(59,130,246,0.35))" : void 0
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx13(
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
        showLabel && label && /* @__PURE__ */ jsx13(
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
        /* @__PURE__ */ jsx13("style", { children: `
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
import React11 from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var defaultGradient = "linear-gradient(135deg, var(--color-brand-primary) 0%, var(--color-brand-secondary) 100%)";
var GradientText = React11.memo(function GradientText2({
  children,
  as: Component = "span",
  gradient = defaultGradient,
  fallbackColor = "var(--color-brand-primary)",
  className = "",
  style
}) {
  return /* @__PURE__ */ jsx14(
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
import React12, { useCallback as useCallback7, useEffect as useEffect2, useId as useId7, useLayoutEffect as useLayoutEffect2, useRef as useRef4, useState as useState7 } from "react";

// src/components/atoms/ToolTip/TooltipIcon.config.ts
var defaultTooltipOptions = {
  placement: "auto",
  delay: 60,
  size: 16,
  color: "currentColor"
};

// src/assets/tooltip-icon.svg
var tooltip_icon_default = 'data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M7.2 12H8.8V7.2H7.2V12ZM8 5.6C8.22667 5.6 8.4168 5.5232 8.5704 5.3696C8.72347 5.21653 8.8 5.02667 8.8 4.8C8.8 4.57333 8.72347 4.3832 8.5704 4.2296C8.4168 4.07653 8.22667 4 8 4C7.77333 4 7.58347 4.07653 7.4304 4.2296C7.2768 4.3832 7.2 4.57333 7.2 4.8C7.2 5.02667 7.2768 5.21653 7.4304 5.3696C7.58347 5.5232 7.77333 5.6 8 5.6ZM8 16C6.89333 16 5.85333 15.7899 4.88 15.3696C3.90667 14.9499 3.06 14.38 2.34 13.66C1.62 12.94 1.05013 12.0933 0.6304 11.12C0.210133 10.1467 0 9.10667 0 8C0 6.89333 0.210133 5.85333 0.6304 4.88C1.05013 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.04987 4.88 0.6296C5.85333 0.209867 6.89333 0 8 0C9.10667 0 10.1467 0.209867 11.12 0.6296C12.0933 1.04987 12.94 1.62 13.66 2.34C14.38 3.06 14.9499 3.90667 15.3696 4.88C15.7899 5.85333 16 6.89333 16 8C16 9.10667 15.7899 10.1467 15.3696 11.12C14.9499 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.9499 11.12 15.3696C10.1467 15.7899 9.10667 16 8 16ZM8 14.4C9.78667 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78667 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78667 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78667 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z" fill="%23666666"/>%0A</svg>%0A';

// src/components/atoms/ToolTip/index.tsx
import { jsx as jsx15, jsxs as jsxs11 } from "react/jsx-runtime";
var VIEWPORT_PADDING = 8;
var TOOLTIP_GAP = 10;
var ARROW_SIZE = 6;
function clamp2(value, min, max) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}
var TooltipIcon = ({
  tooltipText,
  content,
  children,
  tooltipContentIcon,
  placement = defaultTooltipOptions.placement,
  delay = defaultTooltipOptions.delay,
  closeDelay = 80,
  size = 16,
  color = defaultTooltipOptions.color,
  iconToolTip = tooltip_icon_default,
  className = "",
  maxWidth = 240,
  variant = "dark",
  ...rest
}) => {
  const tooltipId = useId7();
  const triggerRef = useRef4(null);
  const tooltipRef = useRef4(null);
  const openTimerRef = useRef4(null);
  const closeTimerRef = useRef4(null);
  const [isOpen, setIsOpen] = useState7(false);
  const [isPositioned, setIsPositioned] = useState7(false);
  const [resolvedPlacement, setResolvedPlacement] = useState7("top");
  const [floatingStyle, setFloatingStyle] = useState7({
    top: 0,
    left: 0
  });
  const [arrowStyle, setArrowStyle] = useState7({});
  const tooltipBackground = variant === "light" ? "var(--color-bg-surface)" : "var(--color-text-primary)";
  const tooltipForeground = variant === "light" ? "var(--color-text-primary)" : "var(--color-bg-surface)";
  const tooltipBorder = variant === "light" ? "1px solid rgba(153, 153, 153, 0.3)" : "1px solid transparent";
  const clearTimers = () => {
    if (openTimerRef.current)
      clearTimeout(openTimerRef.current);
    if (closeTimerRef.current)
      clearTimeout(closeTimerRef.current);
    openTimerRef.current = null;
    closeTimerRef.current = null;
  };
  useEffect2(() => {
    return () => {
      clearTimers();
    };
  }, []);
  const showTooltip = () => {
    clearTimers();
    openTimerRef.current = setTimeout(() => {
      setIsPositioned(false);
      setIsOpen(true);
    }, delay);
  };
  const hideTooltip = () => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => setIsOpen(false), closeDelay);
  };
  const getArrowStyle = useCallback7((nextPlacement, tooltipLeft, tooltipTop, tooltipWidth, tooltipHeight, triggerRect) => {
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top + triggerRect.height / 2;
    const arrowX = clamp2(triggerCenterX - tooltipLeft, ARROW_SIZE + 2, tooltipWidth - ARROW_SIZE - 2);
    const arrowY = clamp2(triggerCenterY - tooltipTop, ARROW_SIZE + 2, tooltipHeight - ARROW_SIZE - 2);
    const base = {
      position: "absolute",
      width: 0,
      height: 0,
      color: tooltipBackground
    };
    if (nextPlacement === "top") {
      return {
        ...base,
        left: arrowX,
        top: "100%",
        transform: "translateX(-50%)",
        borderLeft: `${ARROW_SIZE}px solid transparent`,
        borderRight: `${ARROW_SIZE}px solid transparent`,
        borderTop: `${ARROW_SIZE}px solid currentColor`
      };
    }
    if (nextPlacement === "bottom") {
      return {
        ...base,
        left: arrowX,
        bottom: "100%",
        transform: "translateX(-50%)",
        borderLeft: `${ARROW_SIZE}px solid transparent`,
        borderRight: `${ARROW_SIZE}px solid transparent`,
        borderBottom: `${ARROW_SIZE}px solid currentColor`
      };
    }
    if (nextPlacement === "left") {
      return {
        ...base,
        left: "100%",
        top: arrowY,
        transform: "translateY(-50%)",
        borderTop: `${ARROW_SIZE}px solid transparent`,
        borderBottom: `${ARROW_SIZE}px solid transparent`,
        borderLeft: `${ARROW_SIZE}px solid currentColor`
      };
    }
    return {
      ...base,
      right: "100%",
      top: arrowY,
      transform: "translateY(-50%)",
      borderTop: `${ARROW_SIZE}px solid transparent`,
      borderBottom: `${ARROW_SIZE}px solid transparent`,
      borderRight: `${ARROW_SIZE}px solid currentColor`
    };
  }, [tooltipBackground]);
  const updatePosition = useCallback7(() => {
    var _a;
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip || typeof window === "undefined")
      return;
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const spaces = {
      top: triggerRect.top,
      bottom: viewportHeight - triggerRect.bottom,
      left: triggerRect.left,
      right: viewportWidth - triggerRect.right
    };
    const fits = {
      top: spaces.top >= tooltipRect.height + TOOLTIP_GAP + VIEWPORT_PADDING,
      bottom: spaces.bottom >= tooltipRect.height + TOOLTIP_GAP + VIEWPORT_PADDING,
      left: spaces.left >= tooltipRect.width + TOOLTIP_GAP + VIEWPORT_PADDING,
      right: spaces.right >= tooltipRect.width + TOOLTIP_GAP + VIEWPORT_PADDING
    };
    const order = ["top", "bottom", "right", "left"];
    const nextPlacement = placement === "auto" ? (_a = order.find((side) => fits[side])) != null ? _a : order.reduce((best, side) => spaces[side] > spaces[best] ? side : best, "top") : placement;
    let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
    let top = triggerRect.top - tooltipRect.height - TOOLTIP_GAP;
    if (nextPlacement === "bottom") {
      top = triggerRect.bottom + TOOLTIP_GAP;
    } else if (nextPlacement === "left") {
      left = triggerRect.left - tooltipRect.width - TOOLTIP_GAP;
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
    } else if (nextPlacement === "right") {
      left = triggerRect.right + TOOLTIP_GAP;
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
    }
    left = clamp2(left, VIEWPORT_PADDING, viewportWidth - tooltipRect.width - VIEWPORT_PADDING);
    top = clamp2(top, VIEWPORT_PADDING, viewportHeight - tooltipRect.height - VIEWPORT_PADDING);
    setResolvedPlacement(nextPlacement);
    setFloatingStyle({ top, left });
    setArrowStyle(getArrowStyle(nextPlacement, left, top, tooltipRect.width, tooltipRect.height, triggerRect));
    setIsPositioned(true);
  }, [getArrowStyle, placement]);
  useLayoutEffect2(() => {
    if (!isOpen)
      return;
    updatePosition();
  }, [isOpen, updatePosition, content, tooltipText, maxWidth]);
  useEffect2(() => {
    if (!isOpen)
      return void 0;
    const onChange = () => updatePosition();
    window.addEventListener("resize", onChange);
    window.addEventListener("scroll", onChange, true);
    return () => {
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onChange, true);
    };
  }, [isOpen, updatePosition]);
  const renderTooltipMedia = () => {
    if (!tooltipContentIcon)
      return null;
    if (React12.isValidElement(tooltipContentIcon)) {
      return tooltipContentIcon;
    }
    if (typeof tooltipContentIcon !== "string" && !(typeof tooltipContentIcon === "object" && tooltipContentIcon !== null && ("src" in tooltipContentIcon || "default" in tooltipContentIcon))) {
      return null;
    }
    return /* @__PURE__ */ jsx15(
      Icon_default,
      {
        src: tooltipContentIcon,
        width: 16,
        height: 16,
        decorative: true,
        preserveColors: true
      }
    );
  };
  return /* @__PURE__ */ jsxs11(
    "span",
    {
      ref: triggerRef,
      className,
      style: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
        color
      },
      "aria-label": tooltipText,
      "aria-describedby": isOpen ? `tooltip-${tooltipId}` : void 0,
      tabIndex: 0,
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
      onFocus: showTooltip,
      onBlur: hideTooltip,
      ...rest,
      children: [
        children || /* @__PURE__ */ jsx15(
          Icon_default,
          {
            src: iconToolTip,
            width: size,
            height: size,
            decorative: true
          }
        ),
        isOpen && /* @__PURE__ */ jsxs11(
          "span",
          {
            ref: tooltipRef,
            id: `tooltip-${tooltipId}`,
            role: "tooltip",
            style: {
              position: "fixed",
              zIndex: 50,
              maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
              minWidth: 120,
              padding: "10px 12px",
              borderRadius: 8,
              background: tooltipBackground,
              color: tooltipForeground,
              border: tooltipBorder,
              boxShadow: "var(--shadow-md, 0 4px 16px rgba(0, 0, 0, 0.10))",
              fontSize: "var(--text-small-size, 12px)",
              lineHeight: 1.5,
              top: floatingStyle.top,
              left: floatingStyle.left,
              visibility: isPositioned ? "visible" : "hidden"
            },
            children: [
              /* @__PURE__ */ jsx15(
                "span",
                {
                  style: {
                    ...arrowStyle
                  }
                }
              ),
              /* @__PURE__ */ jsxs11(
                "span",
                {
                  style: {
                    display: "flex",
                    alignItems: "flex-start",
                    gap: tooltipContentIcon ? 8 : 0
                  },
                  children: [
                    renderTooltipMedia(),
                    /* @__PURE__ */ jsx15("span", { children: content != null ? content : tooltipText })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
};
var ToolTip_default = TooltipIcon;

// src/components/molecules/Card/index.tsx
import React13, {
  createContext as createContext5,
  forwardRef,
  useContext as useContext5,
  useMemo as useMemo7
} from "react";
import { jsx as jsx16, jsxs as jsxs12 } from "react/jsx-runtime";
var CardContext = createContext5(null);
function useCardContext(component) {
  const ctx = useContext5(CardContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Card>`);
  }
  return ctx;
}
function cls10(...parts) {
  return parts.filter(Boolean).join(" ");
}
function getDisplayName(type) {
  if (typeof type === "function") {
    const fn = type;
    return fn.displayName || fn.name;
  }
  if (typeof type === "object" && type !== null && "displayName" in type) {
    return String(type.displayName);
  }
  return void 0;
}
function hasCompoundStructure(children) {
  return React13.Children.toArray(children).some((child) => {
    if (!React13.isValidElement(child))
      return false;
    const name = getDisplayName(child.type);
    return name === "CardHeader" || name === "CardContent" || name === "CardFooter";
  });
}
function toCssSize2(value, fallback) {
  if (value === void 0)
    return fallback;
  return typeof value === "number" ? `${value}px` : value;
}
function normalizeVariant(v) {
  if (v === "outlined" || v === "filled")
    return "bordered";
  if (v === "elevated")
    return "elevated";
  if (v === "withIndicator")
    return "withIndicator";
  return "bordered";
}
function getShadow(elevation, hover, hoverable) {
  const tier = elevation != null ? elevation : "md";
  if (tier === "none")
    return "none";
  if (hoverable && hover) {
    return tier === "sm" ? "var(--shadow-md)" : "var(--shadow-lg)";
  }
  switch (tier) {
    case "sm":
      return "var(--shadow-sm)";
    case "lg":
      return "var(--shadow-lg)";
    case "md":
    default:
      return "var(--shadow-md)";
  }
}
var CardRoot = forwardRef(function Card({
  title,
  subtitle,
  extra,
  cover,
  actions,
  actionsAlign = "left",
  footer,
  bordered: _legacyBordered = true,
  hoverable = false,
  variant = "bordered",
  elevation,
  selected: selectedProp,
  interactive = false,
  padding: paddingProp,
  radius = "var(--radius-lg)",
  size = "default",
  style,
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
  role: roleProp,
  tabIndex: tabIndexProp,
  ...rest
}, ref) {
  const selected = selectedProp != null ? selectedProp : false;
  const [isHovered, setIsHovered] = React13.useState(false);
  const resolvedVariant = normalizeVariant(variant);
  const isIndicatorCard = resolvedVariant === "withIndicator";
  const isElevated = resolvedVariant === "elevated" || isIndicatorCard;
  const paddingVar = paddingProp !== void 0 ? toCssSize2(paddingProp, "24px") : size === "sm" ? "var(--space-2)" : "var(--space-3)";
  const resolvedRadius = toCssSize2(radius, "8px");
  const resolvedElevation = elevation != null ? elevation : isElevated ? "sm" : "none";
  const showBorder = resolvedVariant === "bordered";
  const showSelectedOutline = showBorder && selected;
  const actsAsButton = interactive && Boolean(onClick) && roleProp === void 0;
  const boxShadowResolved = showBorder ? "var(--shadow-none)" : isElevated ? getShadow(resolvedElevation, isHovered, Boolean(hoverable) && isElevated) : "var(--shadow-none)";
  const borderSpec = showSelectedOutline ? "1px solid var(--color-text-primary)" : showBorder ? "1px solid var(--color-border-default)" : "1px solid transparent";
  const compound = hasCompoundStructure(children);
  const ctxValue = useMemo7(
    () => ({
      size,
      paddingCss: paddingVar
    }),
    [size, paddingVar]
  );
  const outerStyle = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "hidden",
    borderRadius: resolvedRadius,
    border: borderSpec,
    background: "var(--color-bg-surface)",
    boxShadow: showSelectedOutline ? "inset 0 0 0 1px var(--color-text-primary)" : boxShadowResolved,
    transition: "box-shadow var(--duration-fast) var(--easing-default), transform var(--duration-fast) var(--easing-default)",
    transform: hoverable && isHovered && isElevated ? "translateY(-1px)" : "translateY(0)",
    ...compound ? { "--card-padding": paddingVar } : {},
    ...style
  };
  const showIndicator = isIndicatorCard && selected;
  const bodyPaddingStyle = {
    padding: paddingVar,
    flex: 1,
    minWidth: 0
  };
  const actionsStyle = {
    padding: paddingVar,
    paddingTop: "var(--space-2)",
    borderTop: "1px solid var(--color-border-subtle, var(--color-mist-60))",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "var(--space-2)",
    justifyContent: actionsAlign === "right" ? "flex-end" : actionsAlign === "center" ? "center" : actionsAlign === "between" ? "space-between" : "flex-start"
  };
  const mainColumn = /* @__PURE__ */ jsxs12(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0
      },
      children: [
        cover && /* @__PURE__ */ jsx16("div", { children: cover }),
        (title || subtitle || extra) && /* @__PURE__ */ jsxs12(
          "div",
          {
            style: {
              ...bodyPaddingStyle,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "var(--space-2)",
              paddingBottom: children || actions || footer ? "var(--space-2)" : paddingVar
            },
            children: [
              /* @__PURE__ */ jsxs12("div", { style: { minWidth: 0 }, children: [
                title && /* @__PURE__ */ jsx16(
                  "div",
                  {
                    style: {
                      color: "var(--color-text-primary)",
                      fontSize: "var(--text-h4-size)",
                      fontWeight: "var(--text-h4-weight)",
                      lineHeight: 1.4
                    },
                    children: title
                  }
                ),
                subtitle && /* @__PURE__ */ jsx16(
                  "div",
                  {
                    style: {
                      marginTop: "var(--space-0)",
                      color: "var(--color-text-secondary)",
                      fontSize: "var(--text-secondary-size)",
                      lineHeight: 1.5
                    },
                    children: subtitle
                  }
                )
              ] }),
              extra && /* @__PURE__ */ jsx16("div", { style: { flexShrink: 0 }, children: extra })
            ]
          }
        ),
        children && /* @__PURE__ */ jsx16(
          "div",
          {
            style: {
              ...bodyPaddingStyle,
              paddingTop: title || subtitle || extra ? 0 : paddingVar,
              color: "var(--color-text-primary)"
            },
            children
          }
        ),
        actions && /* @__PURE__ */ jsx16("div", { style: actionsStyle, children: actions }),
        footer && /* @__PURE__ */ jsx16(
          "div",
          {
            style: {
              padding: paddingVar,
              paddingTop: actions ? 0 : "var(--space-2)",
              color: "var(--color-text-secondary)"
            },
            children: footer
          }
        )
      ]
    }
  );
  const inner = compound ? /* @__PURE__ */ jsx16(CardContext.Provider, { value: ctxValue, children: /* @__PURE__ */ jsx16("div", { className: "card-inner--compound", children }) }) : mainColumn;
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      ref,
      ...rest,
      style: outerStyle,
      className: cls10(
        compound && "card-root",
        compound && size === "sm" && "card-root--sm",
        className
      ),
      "data-card-variant": resolvedVariant,
      "data-card-size": compound ? size : void 0,
      "data-selected": showIndicator ? "true" : void 0,
      "data-card-hoverable": Boolean(hoverable && isElevated) ? "true" : void 0,
      "data-card-interactive": interactive ? "true" : void 0,
      "data-card-selected": selected ? "true" : void 0,
      role: actsAsButton ? "button" : roleProp,
      tabIndex: actsAsButton ? tabIndexProp != null ? tabIndexProp : 0 : tabIndexProp,
      "aria-pressed": actsAsButton && selectedProp !== void 0 ? selectedProp : rest["aria-pressed"],
      onClick,
      onKeyDown: (event) => {
        onKeyDown == null ? void 0 : onKeyDown(event);
        if (event.defaultPrevented || !actsAsButton)
          return;
        if (event.target !== event.currentTarget)
          return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.currentTarget.click();
        }
      },
      onMouseEnter: (event) => {
        setIsHovered(true);
        onMouseEnter == null ? void 0 : onMouseEnter(event);
      },
      onMouseLeave: (event) => {
        setIsHovered(false);
        onMouseLeave == null ? void 0 : onMouseLeave(event);
      },
      children: [
        showIndicator && /* @__PURE__ */ jsx16(
          "div",
          {
            "aria-hidden": true,
            style: {
              width: "var(--size-indicator-bar, 4px)",
              flexShrink: 0,
              alignSelf: "stretch",
              background: "var(--color-accent-lavender-40)",
              borderRadius: "var(--radius-xs) 0 0 var(--radius-xs)"
            }
          }
        ),
        inner
      ]
    }
  );
});
var CardHeader = forwardRef(function CardHeader2({ className, ...rest }, ref) {
  useCardContext("CardHeader");
  return /* @__PURE__ */ jsx16("div", { ref, className: cls10("card-header", className), ...rest });
});
CardHeader.displayName = "CardHeader";
var CardTitle = forwardRef(function CardTitle2({ as: Comp = "h3", className, ...rest }, ref) {
  useCardContext("CardTitle");
  return /* @__PURE__ */ jsx16(Comp, { ref, className: cls10("card-title", className), ...rest });
});
CardTitle.displayName = "CardTitle";
var CardDescription = forwardRef(
  function CardDescription2({ as: Comp = "p", className, ...rest }, ref) {
    useCardContext("CardDescription");
    return /* @__PURE__ */ jsx16(Comp, { ref, className: cls10("card-description", className), ...rest });
  }
);
CardDescription.displayName = "CardDescription";
var CardAction = forwardRef(function CardAction2({ className, ...rest }, ref) {
  useCardContext("CardAction");
  return /* @__PURE__ */ jsx16("div", { ref, className: cls10("card-action", className), ...rest });
});
CardAction.displayName = "CardAction";
var CardContent = forwardRef(function CardContent2({ className, noPadding, ...rest }, ref) {
  useCardContext("CardContent");
  return /* @__PURE__ */ jsx16(
    "div",
    {
      ref,
      className: cls10(
        "card-content",
        noPadding && "card-content--no-padding",
        className
      ),
      ...rest
    }
  );
});
CardContent.displayName = "CardContent";
var CardFooter = forwardRef(function CardFooter2({ className, borderTop = true, ...rest }, ref) {
  useCardContext("CardFooter");
  return /* @__PURE__ */ jsx16(
    "div",
    {
      ref,
      className: cls10(
        "card-footer",
        borderTop ? "card-footer--border" : "card-footer--no-border",
        className
      ),
      ...rest
    }
  );
});
CardFooter.displayName = "CardFooter";
var Card2 = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Content: CardContent,
  Footer: CardFooter
});
var Card_default = Card2;

// src/components/atoms/DatePicker/index.tsx
import { useCallback as useCallback8, useEffect as useEffect4, useId as useId8, useMemo as useMemo9, useRef as useRef6, useState as useState9 } from "react";
import { createPortal } from "react-dom";

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
      const yearStr = parts[2];
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
var getYearOptions = (centerYear, range2 = 50) => {
  const start = centerYear - range2;
  const end = centerYear + range2;
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
import { useEffect as useEffect3, useMemo as useMemo8, useRef as useRef5, useState as useState8 } from "react";

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
  primary: "var(--button-primary-default-bg)",
  primaryHover: "color-mix(in srgb, var(--button-primary-default-bg) 8%, transparent)",
  primaryText: "var(--color-text-on-primary)",
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
import { jsx as jsx17, jsxs as jsxs13 } from "react/jsx-runtime";
function ChevronLeft({ size = 16 }) {
  return /* @__PURE__ */ jsx17("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx17(
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
  return /* @__PURE__ */ jsx17("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx17(
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
  return /* @__PURE__ */ jsx17("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx17(
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
  const [isHovered, setIsHovered] = useState8(false);
  const resolvedElevation = resolveElevation(elevationProp, variant);
  const boxShadow = (_a = themeProp == null ? void 0 : themeProp.boxShadow) != null ? _a : hoverable && isHovered ? getElevationShadow("lg") : getElevationShadow(resolvedElevation);
  const theme = useMemo8(
    () => getResolvedTheme(themeProp, size),
    [themeProp, size]
  );
  const cssVars = useMemo8(() => themeToCssVars(theme), [theme]);
  const isControlled = value !== void 0;
  const isRangeControlled = rangeValue !== void 0;
  const minParsed = useMemo8(() => {
    var _a2;
    if (!minDate)
      return null;
    if (minDate instanceof Date)
      return minDate;
    return (_a2 = parseDate(minDate, "YYYY-MM-DD")) != null ? _a2 : parseDate(minDate, "MM/DD/YYYY");
  }, [minDate]);
  const maxParsed = useMemo8(() => {
    var _a2;
    if (!maxDate)
      return null;
    if (maxDate instanceof Date)
      return maxDate;
    return (_a2 = parseDate(maxDate, "YYYY-MM-DD")) != null ? _a2 : parseDate(maxDate, "MM/DD/YYYY");
  }, [maxDate]);
  const [internalValue, setInternalValue] = useState8(
    defaultValue != null ? defaultValue : null
  );
  const [internalRange, setInternalRange] = useState8([null, null]);
  const selectedDate = isControlled ? value : internalValue;
  const selectedRange = isRangeControlled ? rangeValue : internalRange;
  const isMonthControlled = monthProp !== void 0;
  const [internalMonth, setInternalMonth] = useState8(
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
  useEffect3(() => {
    if (isMonthControlled)
      return;
    const anchor = selectedDate || selectedRange[0] || selectedRange[1] || /* @__PURE__ */ new Date();
    setInternalMonth(startOfMonth(anchor));
  }, [isMonthControlled, selectedDate, selectedRange[0], selectedRange[1]]);
  const calendarDays = useMemo8(
    () => getCalendarDaysWithFirstDay(visibleMonth, firstDayOfWeek),
    [visibleMonth, firstDayOfWeek]
  );
  const weekdayLabels = useMemo8(
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
  const slideDirectionRef = useRef5("next");
  const isInitialMountRef = useRef5(true);
  const [captionPick, setCaptionPick] = useState8(null);
  const captionMenusRef = useRef5(null);
  const monthShortLabels = useMemo8(
    () => Array.from(
      { length: 12 },
      (_, m) => new Date(2024, m, 1).toLocaleDateString(void 0, { month: "short" })
    ),
    []
  );
  useEffect3(() => {
    setCaptionPick(null);
  }, [visibleMonth]);
  useEffect3(() => {
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
  const animClass = animation === "none" || isInitialMountRef.current ? "" : animation === "slide" ? slideDirectionRef.current === "prev" ? "calendar-anim-slide-prev" : "calendar-anim-slide-next" : animation === "fade" ? "calendar-anim-fade" : animation === "scale" ? "calendar-anim-scale" : "";
  const resolvedRadius = radius !== void 0 ? typeof radius === "number" ? `${radius}px` : radius : (_b = theme.borderRadius) != null ? _b : 16;
  const resolvedBackground = variant === "filled" ? "var(--color-bg-page)" : (_c = theme.background) != null ? _c : "var(--color-bg-surface)";
  const containerStyle = {
    ...cssVars,
    width: fullWidth ? "100%" : "auto",
    maxWidth: (_d = theme.maxWidth) != null ? _d : 336,
    padding: (_e = theme.padding) != null ? _e : 20,
    borderRadius: resolvedRadius,
    border: bordered ? `1px solid ${(_f = theme.border) != null ? _f : "rgba(153, 153, 153, 0.3)"}` : "1px solid transparent",
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
    border: `1px solid ${(_l = theme.selectBorder) != null ? _l : "rgba(0,0,0,0.1)"}`,
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
  return /* @__PURE__ */ jsxs13(
    "div",
    {
      className: `calendar-root calendar-root--variant-${variant} ${captionLayout === "label" ? "calendar-root--caption-label" : ""} ${captionLayout === "menus" ? "calendar-root--caption-menus" : ""} ${className}`.trim(),
      style: containerStyle,
      onMouseEnter: () => hoverable && setIsHovered(true),
      onMouseLeave: () => hoverable && setIsHovered(false),
      children: [
        !hideNavigation && /* @__PURE__ */ jsxs13("div", { style: headerStyle, children: [
          /* @__PURE__ */ jsx17(
            "button",
            {
              type: "button",
              onClick: handlePrevMonth,
              disabled,
              style: navButtonStyle,
              className: "calendar-nav-btn",
              "aria-label": "Previous month",
              children: /* @__PURE__ */ jsx17(ChevronLeft, {})
            }
          ),
          captionLayout === "label" ? /* @__PURE__ */ jsx17(
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
          ) : captionLayout === "menus" ? /* @__PURE__ */ jsxs13(
            "div",
            {
              ref: captionMenusRef,
              style: { display: "flex", gap: 8, flex: 1, minWidth: 0, position: "relative" },
              children: [
                /* @__PURE__ */ jsxs13("div", { style: { flex: "1.25 1 0", minWidth: 0, position: "relative" }, children: [
                  /* @__PURE__ */ jsxs13(
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
                        /* @__PURE__ */ jsx17("span", { children: monthShortLabels[visibleMonth.getMonth()] }),
                        /* @__PURE__ */ jsx17(ChevronDownSmall, {})
                      ]
                    }
                  ),
                  captionPick === "month" && /* @__PURE__ */ jsx17(
                    "div",
                    {
                      className: "calendar-caption-popup calendar-caption-popup--month",
                      role: "dialog",
                      "aria-label": "Month",
                      children: /* @__PURE__ */ jsx17("div", { className: "calendar-month-grid", children: monthShortLabels.map((lbl, m) => {
                        const selected = m === visibleMonth.getMonth();
                        return /* @__PURE__ */ jsx17(
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
                /* @__PURE__ */ jsxs13("div", { style: { flex: "1 1 0", minWidth: 0, position: "relative" }, children: [
                  /* @__PURE__ */ jsxs13(
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
                        /* @__PURE__ */ jsx17("span", { children: visibleMonth.getFullYear() }),
                        /* @__PURE__ */ jsx17(ChevronDownSmall, {})
                      ]
                    }
                  ),
                  captionPick === "year" && /* @__PURE__ */ jsx17(
                    "div",
                    {
                      className: "calendar-caption-popup calendar-caption-popup--year",
                      role: "dialog",
                      "aria-label": "Year",
                      children: /* @__PURE__ */ jsx17("div", { className: "calendar-year-list", children: yearOptions.map((opt) => {
                        const selected = opt.value === visibleMonth.getFullYear();
                        return /* @__PURE__ */ jsx17(
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
          ) : /* @__PURE__ */ jsxs13("div", { style: { display: "flex", gap: 8, flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsx17(
              "select",
              {
                value: visibleMonth.getMonth(),
                onChange: (e) => handleMonthChange(parseInt(e.target.value, 10)),
                disabled,
                style: selectStyle,
                className: "calendar-select",
                "aria-label": "Select month",
                children: monthOptions.map((opt) => /* @__PURE__ */ jsx17("option", { value: opt.value, children: opt.label }, opt.value))
              }
            ),
            /* @__PURE__ */ jsx17(
              "select",
              {
                value: visibleMonth.getFullYear(),
                onChange: (e) => handleYearChange(parseInt(e.target.value, 10)),
                disabled,
                style: selectStyle,
                className: "calendar-select",
                "aria-label": "Select year",
                children: yearOptions.map((opt) => /* @__PURE__ */ jsx17("option", { value: opt.value, children: opt.label }, opt.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsx17(
            "button",
            {
              type: "button",
              onClick: handleNextMonth,
              disabled,
              style: navButtonStyle,
              className: "calendar-nav-btn",
              "aria-label": "Next month",
              children: /* @__PURE__ */ jsx17(ChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxs13("div", { style: weekdayGridStyle, children: [
          showWeekNumbers && /* @__PURE__ */ jsx17("div", { style: weekdayHeaderStyle, "aria-hidden": "true", children: "#" }),
          weekdayLabels.map((label) => /* @__PURE__ */ jsx17("div", { style: weekdayHeaderStyle, children: label }, label))
        ] }),
        /* @__PURE__ */ jsx17(
          "div",
          {
            className: animClass,
            children: Array.from({ length: 6 }, (_, rowIdx) => {
              var _a2, _b2;
              const rowDays = calendarDays.slice(rowIdx * 7, (rowIdx + 1) * 7);
              const firstDayOfRow = rowDays[0];
              const weekNum = firstDayOfRow ? getWeekNumber(firstDayOfRow.date) : null;
              return /* @__PURE__ */ jsxs13("div", { style: gridStyle, children: [
                showWeekNumbers && /* @__PURE__ */ jsx17(
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
                    color: isDisabled ? (_a3 = theme.textDisabled) != null ? _a3 : "var(--color-text-disabled)" : !day.inCurrentMonth ? (_b3 = theme.textSecondary) != null ? _b3 : "var(--color-text-secondary)" : isSelected ? (_c2 = theme.primaryText) != null ? _c2 : "var(--color-text-on-primary)" : (_d2 = theme.text) != null ? _d2 : "var(--color-text-primary)",
                    background: isSelected ? (_e2 = theme.primary) != null ? _e2 : "var(--button-primary-default-bg)" : isInRange ? (_f2 = theme.rangeBackground) != null ? _f2 : "var(--color-accent-sky-10)" : isToday ? (_g2 = theme.todayBackground) != null ? _g2 : "var(--color-accent-amber-10)" : "transparent",
                    fontWeight: isSelected ? 700 : isToday ? 600 : 500,
                    boxShadow: isToday && !isSelected ? `inset 0 0 0 2px ${(_h2 = theme.todayRing) != null ? _h2 : "rgba(245, 158, 11, 0.5)"}` : void 0
                  };
                  return /* @__PURE__ */ jsx17(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleDateSelect(day.date),
                      disabled: isDisabled,
                      style: cellStyle,
                      className: `calendar-cell ${!day.inCurrentMonth ? "calendar-cell--outside" : ""} ${isSelectable && cellHoverAnimation ? "calendar-cell--hoverable" : ""}`,
                      "aria-label": day.date.toLocaleDateString(),
                      "aria-selected": isSelected,
                      "data-outside": !day.inCurrentMonth ? "true" : void 0,
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
import { jsx as jsx18, jsxs as jsxs14 } from "react/jsx-runtime";
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
  range: range2 = false,
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
  rangeSeparator = defaultDatePickerOptions.rangeSeparator
}) => {
  const dateFormat = (dateFormatProp || defaultDatePickerOptions.dateFormat).trim() || defaultDatePickerOptions.dateFormat;
  const inputId = useId8();
  const wrapperRef = useRef6(null);
  const popoverRef = useRef6(null);
  const [internalError, setInternalError] = useState9("");
  const [isOpen, setIsOpen] = useState9(false);
  const [isPortalReady, setIsPortalReady] = useState9(false);
  const [isDesktopRangeLayout, setIsDesktopRangeLayout] = useState9(false);
  const [popoverStyle, setPopoverStyle] = useState9({});
  const initialRangeValues = useMemo9(() => splitRangeValue(value), [value]);
  const initialParsedSingle = useMemo9(() => parseFlexibleDate(value, dateFormat), [value, dateFormat]);
  const initialParsedStart = useMemo9(() => parseFlexibleDate(initialRangeValues[0], dateFormat), [initialRangeValues[0], dateFormat]);
  const initialParsedEnd = useMemo9(() => parseFlexibleDate(initialRangeValues[1], dateFormat), [initialRangeValues[1], dateFormat]);
  const [startDate, setStartDate] = useState9(() => initialParsedStart);
  const [endDate, setEndDate] = useState9(() => initialParsedEnd);
  const [singleDate, setSingleDate] = useState9(() => initialParsedSingle);
  const [visibleMonth, setVisibleMonth] = useState9(
    () => startOfMonth(initialParsedStart || initialParsedEnd || initialParsedSingle || /* @__PURE__ */ new Date())
  );
  const [inputText, setInputText] = useState9(
    () => range2 ? "" : initialParsedSingle ? formatDateForDisplay(initialParsedSingle, dateFormat) : value || ""
  );
  const [rangeStartInput, setRangeStartInput] = useState9(
    () => range2 ? initialParsedStart ? formatDateForDisplay(initialParsedStart, dateFormat) : initialRangeValues[0] || "" : ""
  );
  const [rangeEndInput, setRangeEndInput] = useState9(
    () => range2 ? initialParsedEnd ? formatDateForDisplay(initialParsedEnd, dateFormat) : initialRangeValues[1] || "" : ""
  );
  useEffect4(() => {
    if (range2) {
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
  }, [dateFormat, range2, value]);
  useEffect4(() => {
    setIsPortalReady(true);
  }, []);
  const updatePopoverPosition = useCallback8(() => {
    const anchorEl = wrapperRef.current;
    if (!anchorEl || typeof window === "undefined")
      return;
    const rect = anchorEl.getBoundingClientRect();
    const viewportPadding = 8;
    const gap = 8;
    const desktop = window.innerWidth >= 920;
    setIsDesktopRangeLayout(desktop);
    const estimatedWidth = range2 ? desktop ? 620 : Math.min(360, window.innerWidth - viewportPadding * 2) : Math.min(340, window.innerWidth - viewportPadding * 2);
    const width = Math.min(estimatedWidth, window.innerWidth - viewportPadding * 2);
    const estimatedHeight = range2 ? desktop ? 430 : 760 : 430;
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
      zIndex: 1400
    });
  }, [range2]);
  useEffect4(() => {
    if (!isOpen)
      return;
    updatePopoverPosition();
    const handleWindowChange = () => updatePopoverPosition();
    const handleOutsidePress = (event) => {
      var _a, _b;
      const target = event.target;
      const isInTrigger = (_a = wrapperRef.current) == null ? void 0 : _a.contains(target);
      const isInPopover = (_b = popoverRef.current) == null ? void 0 : _b.contains(target);
      if (!isInTrigger && !isInPopover)
        setIsOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key === "Escape")
        setIsOpen(false);
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
  }, [isOpen, updatePopoverPosition]);
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
    const result = range2 ? [formattedStart, formattedEnd].filter(Boolean).join(` ${rangeSeparator} `) : formattedStart;
    let nextError = "";
    let isValid = true;
    if (required && !result) {
      nextError = "Date is required";
      isValid = false;
    } else if (result) {
      if (range2) {
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
      setIsOpen(false);
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
    boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 10px 24px -4px rgba(15, 23, 42, 0.1)",
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
  if (range2) {
    return /* @__PURE__ */ jsxs14("div", { className, style: shellStyle, ref: wrapperRef, children: [
      label && /* @__PURE__ */ jsx18("label", { style: labelStyle, children: label }),
      /* @__PURE__ */ jsxs14("div", { style: triggerShellStyle, children: [
        /* @__PURE__ */ jsx18(
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
                e.target.blur();
              }
            },
            placeholder: startPlaceholder,
            disabled,
            readOnly: disabled,
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
        /* @__PURE__ */ jsx18("span", { style: { color: "var(--color-text-secondary)", fontSize: 14, flexShrink: 0 }, children: rangeSeparator }),
        /* @__PURE__ */ jsx18(
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
                e.target.blur();
              }
            },
            placeholder: endPlaceholder,
            disabled,
            readOnly: disabled,
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
        /* @__PURE__ */ jsx18(
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
            "aria-label": "Open calendar",
            disabled,
            children: /* @__PURE__ */ jsxs14("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsx18("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
              /* @__PURE__ */ jsx18("path", { d: "M3 10h18", stroke: "currentColor", strokeWidth: "1.5" }),
              /* @__PURE__ */ jsx18("path", { d: "M8 3v4M16 3v4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
            ] })
          }
        )
      ] }),
      isPortalReady && isOpen && createPortal(
        /* @__PURE__ */ jsx18(
          "div",
          {
            ref: popoverRef,
            role: "dialog",
            "aria-label": "Choose date range",
            "aria-modal": "false",
            style: popoverPanelStyle,
            children: /* @__PURE__ */ jsxs14("div", { style: { padding: 12 }, children: [
              /* @__PURE__ */ jsxs14(
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
                    /* @__PURE__ */ jsx18(
                      "button",
                      {
                        type: "button",
                        style: navButtonStyle,
                        className: "calendar-nav-btn",
                        onClick: () => setVisibleMonth(addMonths(visibleMonth, -1)),
                        disabled,
                        "aria-label": "Previous month",
                        children: /* @__PURE__ */ jsx18("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx18("path", { d: "M15 18l-6-6 6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                      }
                    ),
                    /* @__PURE__ */ jsxs14(
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
                    /* @__PURE__ */ jsx18(
                      "button",
                      {
                        type: "button",
                        style: navButtonStyle,
                        className: "calendar-nav-btn",
                        onClick: () => setVisibleMonth(addMonths(visibleMonth, 1)),
                        disabled,
                        "aria-label": "Next month",
                        children: /* @__PURE__ */ jsx18("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx18("path", { d: "M9 18l6-6-6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs14("div", { style: rangeCalendarsStyle, children: [
                /* @__PURE__ */ jsx18(
                  Calendar_default,
                  {
                    mode: "range",
                    rangeValue: [startDate, endDate],
                    onRangeChange: handleCalendarRangeChange,
                    month: visibleMonth,
                    onMonthChange: setVisibleMonth,
                    hideNavigation: true,
                    captionLayout: "label",
                    minDate,
                    maxDate,
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
                /* @__PURE__ */ jsx18(
                  Calendar_default,
                  {
                    mode: "range",
                    rangeValue: [startDate, endDate],
                    onRangeChange: handleCalendarRangeChange,
                    month: addMonths(visibleMonth, 1),
                    onMonthChange: (d) => setVisibleMonth(addMonths(d, -1)),
                    hideNavigation: true,
                    captionLayout: "label",
                    minDate,
                    maxDate,
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
      helperMessage && /* @__PURE__ */ jsx18("p", { style: helperStyle, children: helperMessage })
    ] });
  }
  return /* @__PURE__ */ jsxs14("div", { className, style: shellStyle, ref: wrapperRef, children: [
    label && /* @__PURE__ */ jsx18("label", { htmlFor: inputId, style: labelStyle, children: label }),
    /* @__PURE__ */ jsxs14("div", { style: triggerShellStyle, children: [
      /* @__PURE__ */ jsx18(
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
              e.target.blur();
            }
          },
          placeholder,
          disabled,
          readOnly: disabled,
          "aria-label": placeholder,
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
      /* @__PURE__ */ jsx18(
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
          "aria-label": "Open calendar",
          disabled,
          children: /* @__PURE__ */ jsxs14("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx18("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
            /* @__PURE__ */ jsx18("path", { d: "M3 10h18", stroke: "currentColor", strokeWidth: "1.5" }),
            /* @__PURE__ */ jsx18("path", { d: "M8 3v4M16 3v4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
          ] })
        }
      )
    ] }),
    isPortalReady && isOpen && createPortal(
      /* @__PURE__ */ jsx18(
        "div",
        {
          ref: popoverRef,
          role: "dialog",
          "aria-label": "Choose date",
          "aria-modal": "false",
          style: popoverPanelStyle,
          children: /* @__PURE__ */ jsx18(
            Calendar_default,
            {
              value: singleDate,
              onChange: (d) => {
                if (!d)
                  return;
                setSingleDate(d);
                setInputText(formatDateForDisplay(d, dateFormat));
                emitValue(d);
                setIsOpen(false);
              },
              month: visibleMonth,
              onMonthChange: setVisibleMonth,
              captionLayout: "label",
              minDate,
              maxDate,
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
    helperMessage && /* @__PURE__ */ jsx18("p", { style: helperStyle, children: helperMessage })
  ] });
};
var DatePicker_default = DatePicker;

// src/components/atoms/OtpBox/index.tsx
import { useState as useState10, useId as useId9, useEffect as useEffect5, useRef as useRef7 } from "react";
import { jsx as jsx19, jsxs as jsxs15 } from "react/jsx-runtime";
var OtpBox = ({
  length = 6,
  mask = false,
  value = "",
  type = "numeric",
  variant = "boxes",
  size = "md",
  onChange,
  className = "",
  containerClass = "",
  disabled = false,
  label,
  error = "",
  showValidation = true
}) => {
  const [otpValue, setOtpValue] = useState10(value);
  const inputRef = useRef7(null);
  const boxRefs = useRef7([]);
  const inputId = useId9();
  useEffect5(() => {
    if (value !== otpValue) {
      setOtpValue(value);
    }
  }, [value]);
  const filterInput = (val) => {
    switch (type) {
      case "numeric":
        return val.replace(/\D/g, "");
      case "alphabet":
        return val.replace(/[^a-zA-Z]/g, "");
      case "alphanumeric":
        return val.replace(/[^a-zA-Z0-9]/g, "");
      default:
        return val;
    }
  };
  const updateValue = (newVal) => {
    const limited = newVal.slice(0, length);
    setOtpValue(limited);
    onChange == null ? void 0 : onChange(limited);
  };
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const cursorPos = e.target.selectionStart || 0;
    if (mask) {
      const prevLength = otpValue.length;
      const newLength = inputValue.length;
      let newValue = otpValue;
      if (newLength > prevLength) {
        const addedChars = inputValue.slice(cursorPos - (newLength - prevLength), cursorPos);
        const filteredChars = filterInput(addedChars);
        const beforeCursor = otpValue.slice(0, cursorPos - (newLength - prevLength));
        const afterCursor = otpValue.slice(cursorPos - (newLength - prevLength));
        newValue = beforeCursor + filteredChars + afterCursor;
      } else if (newLength < prevLength) {
        const deleteCount = prevLength - newLength;
        const beforeCursor = otpValue.slice(0, cursorPos);
        const afterCursor = otpValue.slice(cursorPos + deleteCount);
        newValue = beforeCursor + afterCursor;
      }
      newValue = newValue.slice(0, length);
      updateValue(newValue);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(cursorPos, cursorPos);
        }
      }, 0);
    } else {
      const val = filterInput(inputValue);
      updateValue(val.slice(0, length));
    }
  };
  const handleBoxChange = (index, e) => {
    var _a, _b;
    const val = filterInput(e.target.value);
    if (val.length > 1) {
      const pasted = val.slice(0, length);
      updateValue(pasted);
      const nextIdx = Math.min(index + pasted.length, length - 1);
      (_a = boxRefs.current[nextIdx]) == null ? void 0 : _a.focus();
      return;
    }
    const char = val.slice(-1);
    if (char) {
      const arr = [...otpValue.split(""), ""];
      arr[index] = char;
      const newVal = arr.join("").slice(0, length);
      updateValue(newVal);
      if (index < length - 1)
        (_b = boxRefs.current[index + 1]) == null ? void 0 : _b.focus();
    } else {
      const arr = otpValue.split("");
      arr[index] = "";
      updateValue(arr.join(""));
    }
  };
  const handleBoxKeyDown = (index, e) => {
    var _a, _b, _c;
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      e.preventDefault();
      const arr = otpValue.split("");
      arr[index - 1] = "";
      updateValue(arr.join(""));
      (_a = boxRefs.current[index - 1]) == null ? void 0 : _a.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      (_b = boxRefs.current[index - 1]) == null ? void 0 : _b.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      (_c = boxRefs.current[index + 1]) == null ? void 0 : _c.focus();
    }
  };
  const handleBoxPaste = (e) => {
    var _a;
    e.preventDefault();
    const pasted = filterInput(e.clipboardData.getData("text")).slice(0, length);
    updateValue(pasted);
    const nextIndex = Math.min(pasted.length, length - 1);
    (_a = boxRefs.current[nextIndex]) == null ? void 0 : _a.focus();
  };
  const isIncomplete = otpValue.length > 0 && otpValue.length < length;
  const lengthError = showValidation && isIncomplete ? "Please enter correct OTP" : "";
  const displayError = error || lengthError;
  const showError = !!displayError;
  const getInputMode = () => {
    switch (type) {
      case "numeric":
        return "numeric";
      default:
        return "text";
    }
  };
  const getPattern = () => {
    switch (type) {
      case "numeric":
        return "\\d*";
      case "alphabet":
        return "[a-zA-Z]*";
      case "alphanumeric":
        return "[a-zA-Z0-9]*";
      default:
        return void 0;
    }
  };
  const displayValue = mask ? "\u2022".repeat(otpValue.length) : otpValue;
  const rootClasses = [
    "otp-box-root",
    `otp-box--${variant}`,
    size !== "md" && `otp-box--${size}`,
    showError && "otp-box--error",
    disabled && "otp-box--disabled",
    containerClass,
    className
  ].filter(Boolean).join(" ");
  if (variant === "boxes") {
    return /* @__PURE__ */ jsx19("div", { className: rootClasses, "data-disabled": disabled || void 0, children: /* @__PURE__ */ jsxs15("div", { className: "otp-box-wrapper", children: [
      label && /* @__PURE__ */ jsx19("label", { htmlFor: inputId, className: "otp-box-label", children: label }),
      /* @__PURE__ */ jsx19(
        "div",
        {
          className: "otp-box-cells",
          children: Array.from({ length }).map((_, i) => {
            var _a;
            return /* @__PURE__ */ jsx19(
              "input",
              {
                ref: (el) => {
                  boxRefs.current[i] = el;
                },
                type: "text",
                inputMode: getInputMode(),
                maxLength: 1,
                value: mask ? otpValue[i] ? "\u2022" : "" : (_a = otpValue[i]) != null ? _a : "",
                onChange: (e) => handleBoxChange(i, e),
                onKeyDown: (e) => handleBoxKeyDown(i, e),
                onPaste: handleBoxPaste,
                disabled,
                placeholder: "",
                "aria-label": `Digit ${i + 1} of ${length}`,
                "aria-invalid": showError,
                "aria-describedby": showError ? `error-${inputId}` : void 0,
                autoComplete: "one-time-code",
                spellCheck: false,
                className: "otp-box-cell",
                style: {
                  padding: 0,
                  margin: 0,
                  textAlign: "center",
                  fontWeight: 700,
                  boxSizing: "border-box",
                  flexShrink: 0
                }
              },
              i
            );
          })
        }
      ),
      showError && /* @__PURE__ */ jsxs15("div", { id: `error-${inputId}`, className: "otp-box-error", role: "alert", children: [
        /* @__PURE__ */ jsx19(Icon_default, { src: error_default, width: 14, height: 14, color: "var(--color-state-error)" }),
        displayError
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx19("div", { className: rootClasses, "data-disabled": disabled || void 0, children: /* @__PURE__ */ jsxs15("div", { className: "otp-box-wrapper", children: [
    label && /* @__PURE__ */ jsx19("label", { htmlFor: inputId, className: "otp-box-label", children: label }),
    /* @__PURE__ */ jsx19(
      "input",
      {
        ref: inputRef,
        id: inputId,
        type: "text",
        maxLength: length,
        value: displayValue,
        onChange: handleChange,
        disabled,
        inputMode: getInputMode(),
        pattern: getPattern(),
        "aria-invalid": showError,
        "aria-describedby": showError ? `error-${inputId}` : void 0,
        autoComplete: "one-time-code",
        placeholder: Array(length).fill("\xB7").join(" "),
        spellCheck: false,
        className: "otp-box-input"
      }
    ),
    showError && /* @__PURE__ */ jsxs15("div", { id: `error-${inputId}`, className: "otp-box-error", role: "alert", children: [
      /* @__PURE__ */ jsx19(Icon_default, { src: error_default, width: 14, height: 14, color: "var(--color-state-error)" }),
      displayError
    ] })
  ] }) });
};
var OtpBox_default = OtpBox;

// src/components/atoms/Divider/index.tsx
import { jsx as jsx20, jsxs as jsxs16 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsx20(
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
    return /* @__PURE__ */ jsx20(
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
    return /* @__PURE__ */ jsxs16(
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
          /* @__PURE__ */ jsx20("span", { style: { width: "100%", borderTop: lineBorder } }),
          /* @__PURE__ */ jsx20("span", { style: { ...contentStyle, marginTop: 8 }, children })
        ]
      }
    );
  }
  if (textPosition === "below") {
    return /* @__PURE__ */ jsxs16(
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
          /* @__PURE__ */ jsx20("span", { style: { ...contentStyle, marginBottom: 8 }, children }),
          /* @__PURE__ */ jsx20("span", { style: { width: "100%", borderTop: lineBorder } })
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
  return /* @__PURE__ */ jsxs16(
    "div",
    {
      role: "separator",
      "aria-orientation": "horizontal",
      className,
      style: contentWrapperStyle,
      children: [
        /* @__PURE__ */ jsx20("span", { style: { ...lineStyle, flex: startFlex } }),
        /* @__PURE__ */ jsx20("span", { style: contentStyle, children }),
        /* @__PURE__ */ jsx20("span", { style: { ...lineStyle, flex: endFlex } })
      ]
    }
  );
};
var Divider_default = Divider;

// src/components/molecules/FeedbackStates/EmptyState.tsx
import { useId as useId10 } from "react";

// src/components/molecules/FeedbackStates/feedbackState.classes.ts
function feedbackCls(...chunks) {
  return chunks.filter(Boolean).join(" ");
}

// src/components/molecules/FeedbackStates/EmptyState.tsx
import { jsx as jsx21, jsxs as jsxs17 } from "react/jsx-runtime";
function EmptyState({
  title,
  description,
  icon,
  iconLabel,
  image,
  action,
  extra,
  className,
  role = "status",
  compact = false,
  size = "md",
  align = "center",
  tone = "neutral",
  "aria-live": ariaLive = "polite",
  "data-testid": testId
}) {
  const titleId = useId10();
  const descId = useId10();
  return /* @__PURE__ */ jsxs17(
    "section",
    {
      className: feedbackCls(
        "ds-feedback-shell",
        `ds-feedback-shell--${size}`,
        compact && "ds-feedback-shell--compact",
        align === "start" && "ds-feedback-shell--align-start",
        tone !== "neutral" && `ds-feedback-shell--tone-${tone}`,
        className
      ),
      role,
      "aria-live": ariaLive,
      "aria-labelledby": titleId,
      "aria-describedby": description ? descId : void 0,
      "data-testid": testId != null ? testId : "feedback-empty-state",
      children: [
        image ? /* @__PURE__ */ jsx21("div", { className: "ds-feedback-image", children: image }) : null,
        icon ? /* @__PURE__ */ jsx21(
          "span",
          {
            className: "ds-feedback-icon",
            "aria-hidden": iconLabel ? void 0 : "true",
            "aria-label": iconLabel,
            role: iconLabel ? "img" : void 0,
            children: icon
          }
        ) : null,
        /* @__PURE__ */ jsx21(TextView_default, { as: "h3", variant: "h4", id: titleId, children: title }),
        description ? /* @__PURE__ */ jsx21(TextView_default, { as: "p", variant: "body", color: "secondary", id: descId, children: description }) : null,
        action ? /* @__PURE__ */ jsx21("div", { className: "ds-feedback-actions", children: action }) : null,
        extra ? /* @__PURE__ */ jsx21("div", { className: "ds-feedback-extra", children: extra }) : null
      ]
    }
  );
}

// src/components/molecules/FeedbackStates/ErrorState.tsx
import { useId as useId11 } from "react";
import { jsx as jsx22, jsxs as jsxs18 } from "react/jsx-runtime";
function DefaultErrorIcon({ tone }) {
  if (tone === "warning") {
    return /* @__PURE__ */ jsxs18("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ jsx22("path", { d: "M12 2L2 20h20L12 2z", stroke: "currentColor", strokeWidth: "1.75", strokeLinejoin: "round" }),
      /* @__PURE__ */ jsx22("path", { d: "M12 9v5M12 16.5v.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
    ] });
  }
  if (tone === "info") {
    return /* @__PURE__ */ jsxs18("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ jsx22("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
      /* @__PURE__ */ jsx22("path", { d: "M12 8v.5M12 11v5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
    ] });
  }
  if (tone === "success") {
    return /* @__PURE__ */ jsxs18("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ jsx22("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
      /* @__PURE__ */ jsx22("path", { d: "M8 12l3 3 5-5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
    ] });
  }
  return /* @__PURE__ */ jsxs18("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
    /* @__PURE__ */ jsx22("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
    /* @__PURE__ */ jsx22("path", { d: "M12 8v5M12 15.5v.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function toneClass(tone) {
  if (tone === "neutral")
    return "ds-feedback-shell--tone-neutral";
  if (tone === "info")
    return "ds-feedback-shell--tone-info";
  if (tone === "success")
    return "ds-feedback-shell--tone-success";
  if (tone === "warning")
    return "ds-feedback-shell--tone-warning";
  if (tone === "danger")
    return "ds-feedback-shell--danger";
  return false;
}
function ErrorState({
  title = "Something went wrong",
  description = "Please try again later. If the problem continues, contact support.",
  image,
  icon,
  hideIcon = false,
  details,
  retryLabel = "Try again",
  onRetry,
  extra,
  className,
  tone = "danger",
  compact = false,
  size = "md",
  align = "center",
  "aria-live": ariaLive,
  role,
  "data-testid": testId
}) {
  const resolvedRole = role != null ? role : details || onRetry ? "alert" : "status";
  const resolvedAriaLive = ariaLive != null ? ariaLive : resolvedRole === "alert" ? "assertive" : "polite";
  const titleId = useId11();
  const descId = useId11();
  const detailBody = details == null ? null : typeof details === "string" || typeof details === "number" || typeof details === "boolean" ? /* @__PURE__ */ jsx22("pre", { className: "ds-feedback-detail", children: String(details) }) : details instanceof Error ? /* @__PURE__ */ jsx22("pre", { className: "ds-feedback-detail", children: details.message }) : /* @__PURE__ */ jsx22("div", { className: "ds-feedback-detail", children: details });
  const resolvedIcon = !hideIcon ? icon != null ? icon : /* @__PURE__ */ jsx22(DefaultErrorIcon, { tone }) : null;
  return /* @__PURE__ */ jsxs18(
    "section",
    {
      className: feedbackCls(
        "ds-feedback-shell",
        `ds-feedback-shell--${size}`,
        compact && "ds-feedback-shell--compact",
        align === "start" && "ds-feedback-shell--align-start",
        toneClass(tone),
        className
      ),
      role: resolvedRole,
      "aria-live": resolvedAriaLive,
      "aria-labelledby": titleId,
      "aria-describedby": description ? descId : void 0,
      "data-testid": testId != null ? testId : "feedback-error-state",
      children: [
        image ? /* @__PURE__ */ jsx22("div", { className: "ds-feedback-image", children: image }) : null,
        resolvedIcon ? /* @__PURE__ */ jsx22("span", { className: "ds-feedback-icon ds-feedback-icon--status", children: resolvedIcon }) : null,
        /* @__PURE__ */ jsx22(TextView_default, { as: "h3", variant: "h4", id: titleId, children: title }),
        /* @__PURE__ */ jsx22(TextView_default, { as: "p", variant: "body", color: "secondary", id: descId, children: description }),
        detailBody,
        onRetry ? /* @__PURE__ */ jsx22("div", { className: "ds-feedback-actions", children: /* @__PURE__ */ jsx22(Button_default, { variant: "outlinePrimary", type: "button", onClick: () => onRetry(), size: compact ? "sm" : "md", children: retryLabel }) }) : null,
        extra ? /* @__PURE__ */ jsx22("div", { className: "ds-feedback-extra", children: extra }) : null
      ]
    }
  );
}

// src/components/molecules/FeedbackStates/OfflineBanner.tsx
import { jsx as jsx23, jsxs as jsxs19 } from "react/jsx-runtime";
var DefaultOfflineIcon = () => /* @__PURE__ */ jsx23(
  "svg",
  {
    "aria-hidden": "true",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    className: "ds-offline-banner__icon",
    children: /* @__PURE__ */ jsx23(
      "path",
      {
        d: "M1 1l22 22M9.9 4.24A10 10 0 0119.07 8.77M5 5a10 10 0 00-.29 14.71M10.73 10.73A5 5 0 0114.35 13M7.05 7.05A5 5 0 005 11.37M12 20h.01",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
function bannerToneClass(tone) {
  return tone === "neutral" ? "ds-offline-banner--neutral" : "ds-offline-banner--warning";
}
function OfflineBanner({
  headline = "No internet connection.",
  message = "Check your connection and try again.",
  leadingIcon,
  image,
  actionLabel = "Retry",
  onRetry,
  onDismiss,
  dismissLabel = "Dismiss",
  className,
  sticky,
  tone = "warning",
  compact = false,
  role = "status"
}) {
  const showLeadingIcon = leadingIcon !== void 0 ? leadingIcon : /* @__PURE__ */ jsx23(DefaultOfflineIcon, {});
  if (image) {
    return /* @__PURE__ */ jsxs19(
      "section",
      {
        className: feedbackCls(
          "ds-feedback-shell",
          "ds-feedback-shell--md",
          compact && "ds-feedback-shell--compact",
          tone === "warning" ? "ds-feedback-shell--tone-warning" : "ds-feedback-shell--tone-neutral",
          className
        ),
        role,
        "aria-live": "polite",
        "aria-atomic": "true",
        "data-testid": "feedback-offline-banner",
        children: [
          /* @__PURE__ */ jsx23("div", { className: "ds-feedback-image", children: image }),
          /* @__PURE__ */ jsx23(TextView_default, { as: "p", variant: "body", children: /* @__PURE__ */ jsx23("strong", { children: headline }) }),
          message ? /* @__PURE__ */ jsx23(TextView_default, { as: "p", variant: "small", color: "secondary", children: message }) : null,
          onRetry || onDismiss ? /* @__PURE__ */ jsxs19("div", { className: "ds-feedback-actions", children: [
            onRetry ? /* @__PURE__ */ jsx23(Button_default, { variant: "outlinePrimary", type: "button", size: "md", onClick: () => onRetry == null ? void 0 : onRetry(), children: actionLabel }) : null,
            onDismiss ? /* @__PURE__ */ jsx23(Button_default, { variant: "ghost", type: "button", size: "md", onClick: () => onDismiss == null ? void 0 : onDismiss(), children: dismissLabel }) : null
          ] }) : null
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs19(
    "aside",
    {
      className: feedbackCls(
        "ds-offline-banner",
        bannerToneClass(tone),
        compact && "ds-offline-banner--compact",
        sticky && "ds-offline-banner--sticky",
        className
      ),
      role,
      "aria-live": "polite",
      "aria-atomic": "true",
      "data-testid": "feedback-offline-banner",
      children: [
        showLeadingIcon ? /* @__PURE__ */ jsx23("span", { className: "ds-offline-banner__icon-wrap", children: showLeadingIcon }) : null,
        /* @__PURE__ */ jsxs19("div", { className: "ds-offline-banner__body", children: [
          /* @__PURE__ */ jsx23(TextView_default, { as: "p", variant: "body", children: /* @__PURE__ */ jsx23("strong", { children: headline }) }),
          message ? /* @__PURE__ */ jsx23(TextView_default, { as: "p", variant: "small", color: "secondary", children: message }) : null
        ] }),
        /* @__PURE__ */ jsxs19("div", { className: "ds-offline-banner__actions", children: [
          onRetry ? /* @__PURE__ */ jsx23(Button_default, { variant: "outlineSecondary", type: "button", size: "sm", onClick: () => onRetry == null ? void 0 : onRetry(), children: actionLabel }) : null,
          onDismiss ? /* @__PURE__ */ jsx23(
            "button",
            {
              type: "button",
              onClick: () => onDismiss == null ? void 0 : onDismiss(),
              "aria-label": dismissLabel,
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "var(--radius-control)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "var(--color-text-secondary)",
                fontSize: 14
              },
              children: "\u2715"
            }
          ) : null
        ] })
      ]
    }
  );
}

// src/components/molecules/FeedbackStates/FeedbackState.tsx
import { jsx as jsx24, jsxs as jsxs20 } from "react/jsx-runtime";
function FeedbackState(props) {
  if (props.variant === "empty") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx24(EmptyState, { ...rest });
  }
  if (props.variant === "success") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx24(
      EmptyState,
      {
        tone: "success",
        icon: /* @__PURE__ */ jsxs20("svg", { "aria-hidden": "true", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", style: { color: "var(--color-success-strong)" }, children: [
          /* @__PURE__ */ jsx24("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
          /* @__PURE__ */ jsx24("path", { d: "M8 12l3 3 5-5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
        ] }),
        ...rest
      }
    );
  }
  if (props.variant === "info") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx24(
      EmptyState,
      {
        tone: "info",
        icon: /* @__PURE__ */ jsxs20("svg", { "aria-hidden": "true", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", style: { color: "var(--color-info-strong)" }, children: [
          /* @__PURE__ */ jsx24("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
          /* @__PURE__ */ jsx24("path", { d: "M12 8v.5M12 11v5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
        ] }),
        ...rest
      }
    );
  }
  if (props.variant === "error") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx24(ErrorState, { ...rest });
  }
  if (props.variant === "offline") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx24(OfflineBanner, { ...rest });
  }
  const _exhaustive = props;
  return _exhaustive;
}

// src/components/molecules/FeedbackStates/FeedbackStates.animations.tsx
import { jsx as jsx25, jsxs as jsxs21 } from "react/jsx-runtime";
function NoDataAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs21(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx25("style", { children: `
        @keyframes fb-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fb-fade-in-line {
          from { stroke-dashoffset: 30; opacity: 0; }
          to   { stroke-dashoffset: 0;  opacity: 1; }
        }
        @keyframes fb-blink-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .fb-tray-group { animation: fb-float 3s ease-in-out infinite; transform-origin: center; }
        .fb-line-1 { stroke-dasharray: 30; animation: fb-fade-in-line 0.6s 0.3s both ease-out; }
        .fb-line-2 { stroke-dasharray: 22; animation: fb-fade-in-line 0.6s 0.5s both ease-out; }
        .fb-line-3 { stroke-dasharray: 16; animation: fb-fade-in-line 0.6s 0.7s both ease-out; }
        .fb-dot-1 { animation: fb-blink-dot 1.8s 0s infinite; }
        .fb-dot-2 { animation: fb-blink-dot 1.8s 0.3s infinite; }
        .fb-dot-3 { animation: fb-blink-dot 1.8s 0.6s infinite; }
      ` }),
        /* @__PURE__ */ jsx25("ellipse", { cx: "60", cy: "108", rx: "28", ry: "5", fill: "currentColor", opacity: "0.08" }),
        /* @__PURE__ */ jsxs21("g", { className: "fb-tray-group", children: [
          /* @__PURE__ */ jsx25("rect", { x: "18", y: "50", width: "84", height: "48", rx: "10", fill: "var(--color-fill-muted)", stroke: "var(--color-border-subtle)", strokeWidth: "2.5" }),
          /* @__PURE__ */ jsx25("path", { d: "M18 72 Q18 50 60 50 Q102 50 102 72", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", fill: "none" }),
          /* @__PURE__ */ jsx25("path", { d: "M60 34 L60 56M53 49 L60 56 L67 49", stroke: "var(--color-text-secondary)", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx25("line", { x1: "32", y1: "78", x2: "62", y2: "78", className: "fb-line-1", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx25("line", { x1: "32", y1: "86", x2: "54", y2: "86", className: "fb-line-2", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx25("line", { x1: "32", y1: "94", x2: "48", y2: "94", className: "fb-line-3", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx25("circle", { cx: "82", cy: "78", r: "3", fill: "var(--color-border-subtle)", className: "fb-dot-1" }),
          /* @__PURE__ */ jsx25("circle", { cx: "91", cy: "78", r: "3", fill: "var(--color-border-subtle)", className: "fb-dot-2" }),
          /* @__PURE__ */ jsx25("circle", { cx: "100", cy: "78", r: "3", fill: "var(--color-border-subtle)", className: "fb-dot-3" })
        ] })
      ]
    }
  );
}
function NoSearchResultsAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs21(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx25("style", { children: `
        @keyframes fb-search-rock {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes fb-x-pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .fb-lens { animation: fb-search-rock 2.4s ease-in-out infinite; transform-origin: 52px 52px; }
        .fb-x-mark { animation: fb-x-pop 0.45s 0.2s both cubic-bezier(.34,1.56,.64,1); transform-origin: 52px 52px; }
      ` }),
        /* @__PURE__ */ jsx25("ellipse", { cx: "60", cy: "110", rx: "24", ry: "4", fill: "currentColor", opacity: "0.07" }),
        /* @__PURE__ */ jsxs21("g", { className: "fb-lens", children: [
          /* @__PURE__ */ jsx25("circle", { cx: "52", cy: "52", r: "26", fill: "var(--color-fill-muted)", stroke: "var(--color-border-subtle)", strokeWidth: "3" }),
          /* @__PURE__ */ jsx25("line", { x1: "70", y1: "70", x2: "94", y2: "94", stroke: "var(--color-border-subtle)", strokeWidth: "5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsxs21("g", { className: "fb-x-mark", children: [
            /* @__PURE__ */ jsx25("line", { x1: "43", y1: "43", x2: "61", y2: "61", stroke: "var(--color-danger-strong)", strokeWidth: "3", strokeLinecap: "round" }),
            /* @__PURE__ */ jsx25("line", { x1: "61", y1: "43", x2: "43", y2: "61", stroke: "var(--color-danger-strong)", strokeWidth: "3", strokeLinecap: "round" })
          ] })
        ] })
      ]
    }
  );
}
function ErrorAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs21(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx25("style", { children: `
        @keyframes fb-shield-pulse {
          0%, 100% { transform: scale(1); }
          45% { transform: scale(1.06); }
          55% { transform: scale(1.06); }
        }
        @keyframes fb-ring-expand {
          0%   { r: 38; opacity: 0.4; }
          100% { r: 54; opacity: 0; }
        }
        .fb-shield-g { animation: fb-shield-pulse 2.2s ease-in-out infinite; transform-origin: 60px 58px; }
        .fb-ring-anim { animation: fb-ring-expand 2.2s ease-out infinite; }
      ` }),
        /* @__PURE__ */ jsx25(
          "circle",
          {
            cx: "60",
            cy: "58",
            r: "38",
            className: "fb-ring-anim",
            fill: "none",
            stroke: "var(--color-danger-strong)",
            strokeWidth: "2"
          }
        ),
        /* @__PURE__ */ jsxs21("g", { className: "fb-shield-g", children: [
          /* @__PURE__ */ jsx25(
            "path",
            {
              d: "M60 18 L92 32 L92 62 Q92 84 60 100 Q28 84 28 62 L28 32 Z",
              fill: "var(--color-danger-fill)",
              stroke: "var(--color-danger-strong)",
              strokeWidth: "2.5",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx25("line", { x1: "60", y1: "44", x2: "60", y2: "65", stroke: "var(--color-danger-strong)", strokeWidth: "4", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx25("circle", { cx: "60", cy: "75", r: "3", fill: "var(--color-danger-strong)" })
        ] })
      ]
    }
  );
}
function OfflineAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs21(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx25("style", { children: `
        @keyframes fb-arc-fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; }
        }
        @keyframes fb-slash-draw {
          from { stroke-dashoffset: 90; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fb-dot-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .fb-arc-3 { animation: fb-arc-fade 2s 0.0s ease-in-out infinite; }
        .fb-arc-2 { animation: fb-arc-fade 2s 0.25s ease-in-out infinite; }
        .fb-arc-1 { animation: fb-arc-fade 2s 0.5s ease-in-out infinite; }
        .fb-slash { stroke-dasharray: 90; animation: fb-slash-draw 0.5s 0.1s both ease-out; }
        .fb-wifi-dot { animation: fb-dot-bounce 1.6s ease-in-out infinite; transform-origin: 60px 92px; }
      ` }),
        /* @__PURE__ */ jsx25(
          "path",
          {
            className: "fb-arc-3",
            d: "M22 58 Q22 26 60 26 Q98 26 98 58",
            stroke: "var(--color-border-subtle)",
            strokeWidth: "5",
            strokeLinecap: "round",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsx25(
          "path",
          {
            className: "fb-arc-2",
            d: "M35 70 Q35 46 60 46 Q85 46 85 70",
            stroke: "var(--color-border-subtle)",
            strokeWidth: "5",
            strokeLinecap: "round",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsx25(
          "path",
          {
            className: "fb-arc-1",
            d: "M48 82 Q48 66 60 66 Q72 66 72 82",
            stroke: "var(--color-border-subtle)",
            strokeWidth: "5",
            strokeLinecap: "round",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsx25("circle", { className: "fb-wifi-dot", cx: "60", cy: "92", r: "4.5", fill: "var(--color-border-subtle)" }),
        /* @__PURE__ */ jsx25(
          "line",
          {
            className: "fb-slash",
            x1: "24",
            y1: "96",
            x2: "96",
            y2: "24",
            stroke: "var(--color-danger-strong)",
            strokeWidth: "4",
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
}
function SuccessAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs21(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx25("style", { children: `
        @keyframes fb-circle-draw {
          from { stroke-dashoffset: 220; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fb-check-draw {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fb-success-pop {
          0%   { transform: scale(0.85); }
          60%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .fb-success-g { animation: fb-success-pop 0.5s 0.1s both cubic-bezier(.34,1.56,.64,1); transform-origin: 60px 60px; }
        .fb-circle-draw { stroke-dasharray: 220; animation: fb-circle-draw 0.55s 0s both ease-out; }
        .fb-check-draw  { stroke-dasharray: 60;  animation: fb-check-draw  0.4s 0.4s both ease-out; }
      ` }),
        /* @__PURE__ */ jsxs21("g", { className: "fb-success-g", children: [
          /* @__PURE__ */ jsx25("circle", { cx: "60", cy: "60", r: "34", fill: "var(--color-success-fill)" }),
          /* @__PURE__ */ jsx25(
            "circle",
            {
              cx: "60",
              cy: "60",
              r: "34",
              className: "fb-circle-draw",
              stroke: "var(--color-success-strong)",
              strokeWidth: "3",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsx25(
            "path",
            {
              d: "M42 60 l14 14 l22-22",
              className: "fb-check-draw",
              stroke: "var(--color-success-strong)",
              strokeWidth: "4.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        ] })
      ]
    }
  );
}
function InfoAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs21(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 120 120",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: ["ds-feedback-illustration", className].filter(Boolean).join(" "),
      "aria-hidden": ariaHidden,
      style: { overflow: "visible" },
      children: [
        /* @__PURE__ */ jsx25("style", { children: `
        @keyframes fb-info-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.85; }
        }
        @keyframes fb-i-dot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .fb-info-g { animation: fb-info-pulse 2.5s ease-in-out infinite; transform-origin: 60px 60px; }
        .fb-i-dot   { animation: fb-i-dot 2.5s ease-in-out infinite; transform-origin: 60px 40px; }
      ` }),
        /* @__PURE__ */ jsxs21("g", { className: "fb-info-g", children: [
          /* @__PURE__ */ jsx25("circle", { cx: "60", cy: "60", r: "34", fill: "var(--color-info-fill)", stroke: "var(--color-info-strong)", strokeWidth: "2.5" }),
          /* @__PURE__ */ jsx25(
            "line",
            {
              x1: "60",
              y1: "54",
              x2: "60",
              y2: "76",
              stroke: "var(--color-info-strong)",
              strokeWidth: "5",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsx25("circle", { cx: "60", cy: "43", r: "3.5", fill: "var(--color-info-strong)", className: "fb-i-dot" })
        ] })
      ]
    }
  );
}
var FEEDBACK_ANIMATIONS = {
  empty: NoDataAnimation,
  "no-search": NoSearchResultsAnimation,
  error: ErrorAnimation,
  offline: OfflineAnimation,
  success: SuccessAnimation,
  info: InfoAnimation
};

// src/components/molecules/Combobox/index.tsx
import React19, { useCallback as useCallback9, useEffect as useEffect6, useId as useId12, useLayoutEffect as useLayoutEffect3, useMemo as useMemo10, useRef as useRef8, useState as useState11 } from "react";
import { jsx as jsx26, jsxs as jsxs22 } from "react/jsx-runtime";
function cls11(...parts) {
  return parts.filter(Boolean).join(" ");
}
function flattenOptions(options, groups) {
  if (groups == null ? void 0 : groups.length)
    return groups.flatMap((g) => g.options);
  return options != null ? options : [];
}
function ChevronDown() {
  return /* @__PURE__ */ jsx26("svg", { className: "ds-combobox__chevron", viewBox: "0 0 20 20", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx26("path", { d: "M5 7.5L10 12.5L15 7.5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
var Combobox = React19.memo(function Combobox2({
  label,
  options,
  groups,
  searchable = false,
  searchPlaceholder = "Search\u2026",
  multiple = false,
  placeholder = "Select\u2026",
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled = false,
  error,
  helperText,
  fullWidth = true,
  size = "md",
  className,
  id: idProp,
  listMinWidth,
  style,
  ...restProps
}) {
  const field = useFormField();
  const {
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    "aria-required": ariaRequiredProp,
    ...restWithoutAria
  } = restProps;
  const rest = field ? restWithoutAria : restProps;
  const triggerRef = useRef8(null);
  const fieldControlId = field == null ? void 0 : field.id;
  useLayoutEffect3(() => {
    const el = triggerRef.current;
    if (!el || !fieldControlId)
      return;
    const original = el.id;
    el.id = fieldControlId;
    return () => {
      el.id = original;
    };
  }, [fieldControlId]);
  const reactId = useId12();
  const base = reactId.replace(/:/g, "");
  const listboxId = `ds-combobox-lb-${base}`;
  const searchId = `ds-combobox-search-${base}`;
  const labelId = `ds-combobox-lbl-${base}`;
  const isControlled = valueProp !== void 0;
  const [open, setOpen] = useState11(false);
  const [search, setSearch] = useState11("");
  useEffect6(() => {
    if (!open)
      setSearch("");
  }, [open]);
  const [innerValue, setInnerValue] = useState11(() => {
    if (defaultValue !== void 0)
      return defaultValue;
    return multiple ? [] : "";
  });
  const selected = isControlled ? valueProp : innerValue;
  const allOptions = useMemo10(() => flattenOptions(options, groups), [options, groups]);
  const useGroups = Boolean(groups == null ? void 0 : groups.length);
  const filteredFlat = useMemo10(() => {
    const base2 = options != null ? options : [];
    const q = search.trim().toLowerCase();
    if (!searchable || !q)
      return base2;
    return base2.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, search, searchable]);
  const filteredGroups = useMemo10(() => {
    if (!(groups == null ? void 0 : groups.length))
      return null;
    const q = search.trim().toLowerCase();
    if (!searchable || !q)
      return groups;
    return groups.map((g) => ({
      ...g,
      options: g.options.filter(
        (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
      )
    })).filter((g) => g.options.length > 0);
  }, [groups, search, searchable]);
  const setValue = useCallback9(
    (next) => {
      if (!isControlled) {
        setInnerValue(next);
      }
      const opts = flattenOptions(options, groups);
      if (multiple && Array.isArray(next)) {
        const picked = next.map((v) => opts.find((o) => o.value === v)).filter(Boolean);
        onValueChange == null ? void 0 : onValueChange(next, picked);
      } else if (!multiple && typeof next === "string") {
        const one = opts.find((o) => o.value === next);
        onValueChange == null ? void 0 : onValueChange(next, one);
      }
    },
    [isControlled, multiple, onValueChange, options, groups]
  );
  const toggleMulti = (opt) => {
    if (opt.disabled || disabled)
      return;
    const cur = Array.isArray(selected) ? [...selected] : [];
    const i = cur.indexOf(opt.value);
    if (i >= 0)
      cur.splice(i, 1);
    else
      cur.push(opt.value);
    setValue(cur);
  };
  const pickSingle = (opt) => {
    if (opt.disabled || disabled)
      return;
    setValue(opt.value);
    setOpen(false);
    setSearch("");
  };
  const isSelected = (v) => {
    if (multiple && Array.isArray(selected))
      return selected.includes(v);
    if (!multiple && typeof selected === "string")
      return selected === v;
    return false;
  };
  const displayTrigger = useMemo10(() => {
    var _a, _b, _c;
    if (multiple && Array.isArray(selected)) {
      if (selected.length === 0)
        return { text: placeholder, placeholder: true, icon: null };
      const labels = selected.map((v) => {
        var _a2, _b2;
        return (_b2 = (_a2 = allOptions.find((o) => o.value === v)) == null ? void 0 : _a2.label) != null ? _b2 : v;
      });
      const firstIcon = (_a = allOptions.find((o) => o.value === selected[0])) == null ? void 0 : _a.icon;
      return {
        text: labels.join(", "),
        placeholder: false,
        icon: selected.length === 1 ? firstIcon : null
      };
    }
    const s = typeof selected === "string" ? selected : "";
    if (!s)
      return { text: placeholder, placeholder: true, icon: null };
    const opt = allOptions.find((o) => o.value === s);
    return { text: (_b = opt == null ? void 0 : opt.label) != null ? _b : s, placeholder: false, icon: (_c = opt == null ? void 0 : opt.icon) != null ? _c : null };
  }, [allOptions, multiple, placeholder, selected]);
  const hasList = useGroups && filteredGroups ? filteredGroups.some((g) => g.options.length > 0) : filteredFlat.length > 0;
  const resolvedStatus = error ? "error" : void 0;
  const helperMessage = error != null ? error : helperText;
  const sizeStyles = useMemo10(() => {
    const map = {
      sm: { minH: "var(--button-height-sm)", font: "var(--text-small-size, 12px)" },
      md: { minH: "var(--button-height-lg)", font: "var(--text-body-size, 16px)" },
      lg: { minH: "3rem", font: "var(--text-body-size, 16px)" }
    };
    return map[size];
  }, [size]);
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error)" : "var(--color-border-default)";
  const renderOptionRow = (opt) => {
    const sel = isSelected(opt.value);
    return /* @__PURE__ */ jsxs22(
      "button",
      {
        type: "button",
        role: "option",
        id: `${listboxId}-opt-${opt.value}`,
        "aria-selected": sel,
        "data-selected": sel ? "true" : "false",
        disabled: disabled || opt.disabled,
        className: "ds-combobox__option",
        onClick: () => multiple ? toggleMulti(opt) : pickSingle(opt),
        children: [
          opt.icon ? /* @__PURE__ */ jsx26("span", { className: "ds-combobox__option-icon", children: opt.icon }) : null,
          /* @__PURE__ */ jsx26("span", { className: "ds-combobox__option-label", children: opt.label }),
          multiple && sel ? /* @__PURE__ */ jsx26("svg", { className: "ds-combobox__check", viewBox: "0 0 16 16", "aria-hidden": true, children: /* @__PURE__ */ jsx26(
            "path",
            {
              d: "M13.5 4.5L6.5 11.5L3 8",
              stroke: "currentColor",
              strokeWidth: "2",
              fill: "none",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) }) : null
        ]
      },
      opt.value
    );
  };
  return /* @__PURE__ */ jsxs22(
    "div",
    {
      ...rest,
      id: field && idProp === field.id ? void 0 : idProp,
      className: cls11("ds-combobox", className),
      style: {
        width: fullWidth ? "100%" : "auto",
        display: fullWidth ? "block" : "inline-block",
        ...style
      },
      "data-open": open ? "true" : "false",
      "data-disabled": disabled ? "true" : "false",
      "data-status": resolvedStatus,
      children: [
        /* @__PURE__ */ jsxs22(Popover, { open, onOpenChange: setOpen, placement: "bottom-start", children: [
          label ? /* @__PURE__ */ jsx26("div", { id: labelId, className: "ds-combobox__label", children: label }) : null,
          /* @__PURE__ */ jsxs22(
            PopoverTrigger,
            {
              type: "button",
              role: "combobox",
              disabled,
              className: "ds-combobox__trigger",
              ref: triggerRef,
              "aria-labelledby": label ? labelId : field == null ? void 0 : field.labelId,
              "aria-label": label || field ? void 0 : placeholder != null ? placeholder : "Select option",
              ...field ? {
                "aria-describedby": ariaDescribedByProp != null ? ariaDescribedByProp : field.describedBy,
                "aria-invalid": ariaInvalidProp != null ? ariaInvalidProp : field.invalid || error ? true : void 0,
                "aria-required": ariaRequiredProp != null ? ariaRequiredProp : field.required || void 0
              } : {},
              hasPopup: "listbox",
              "aria-expanded": open,
              "aria-controls": listboxId,
              style: {
                "--combobox-min-h": sizeStyles.minH,
                "--combobox-font-size": sizeStyles.font,
                "--combobox-border": borderColor
              },
              children: [
                /* @__PURE__ */ jsxs22("span", { className: "ds-combobox__trigger-inner", children: [
                  displayTrigger.icon ? /* @__PURE__ */ jsx26("span", { className: "ds-combobox__trigger-icon", children: displayTrigger.icon }) : null,
                  /* @__PURE__ */ jsx26(
                    "span",
                    {
                      className: cls11(
                        "ds-combobox__trigger-label",
                        displayTrigger.placeholder && "ds-combobox__trigger-label--placeholder"
                      ),
                      children: displayTrigger.text
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx26(ChevronDown, {})
              ]
            }
          ),
          /* @__PURE__ */ jsx26(
            PopoverContent,
            {
              role: "none",
              showPointer: false,
              className: "ds-combobox__popover",
              style: listMinWidth != null ? { minWidth: listMinWidth } : void 0,
              children: /* @__PURE__ */ jsxs22("div", { className: "ds-combobox__panel", children: [
                searchable ? /* @__PURE__ */ jsx26(
                  "input",
                  {
                    id: searchId,
                    type: "search",
                    className: "ds-combobox__search",
                    placeholder: searchPlaceholder,
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    onKeyDown: (e) => e.stopPropagation(),
                    "aria-label": searchPlaceholder,
                    "aria-controls": listboxId,
                    autoComplete: "off"
                  }
                ) : null,
                !hasList ? /* @__PURE__ */ jsx26("div", { className: "ds-combobox__empty", role: "status", children: "No results" }) : useGroups && filteredGroups ? /* @__PURE__ */ jsx26(
                  "div",
                  {
                    id: listboxId,
                    className: "ds-combobox__listbox",
                    role: "listbox",
                    "aria-multiselectable": multiple,
                    "aria-label": label != null ? label : "Options",
                    children: filteredGroups.map((g) => /* @__PURE__ */ jsxs22(React19.Fragment, { children: [
                      /* @__PURE__ */ jsx26("div", { className: "ds-combobox__group-label", role: "presentation", children: g.label }),
                      g.options.map((opt) => renderOptionRow(opt))
                    ] }, g.label))
                  }
                ) : /* @__PURE__ */ jsx26(
                  "div",
                  {
                    id: listboxId,
                    className: "ds-combobox__listbox",
                    role: "listbox",
                    "aria-multiselectable": multiple,
                    "aria-label": label != null ? label : "Options",
                    children: filteredFlat.map((opt) => renderOptionRow(opt))
                  }
                )
              ] })
            }
          )
        ] }),
        helperMessage ? /* @__PURE__ */ jsx26("p", { className: "ds-combobox__helper", role: error ? "alert" : void 0, children: helperMessage }) : null
      ]
    }
  );
});
Combobox.displayName = "Combobox";
Combobox[FORM_FIELD_CONSUMER_KEY] = true;
var Combobox_default = Combobox;

// src/components/molecules/Modal/index.tsx
import { useCallback as useCallback10, useContext as useContext6, useEffect as useEffect7, useId as useId13, useRef as useRef9, useState as useState12 } from "react";
import { createPortal as createPortal2 } from "react-dom";

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
  xxl: "modal-xxl"
};
var modalSizeWidths = {
  sm: "400px",
  md: "480px",
  lg: "560px",
  xl: "800px",
  xxl: "min(1140px, 90vw)"
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
import { createContext as createContext6 } from "react";
var stack = [];
var OverlayLayerContext = createContext6(void 0);
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

// src/components/molecules/Modal/index.tsx
import { Fragment, jsx as jsx27, jsxs as jsxs23 } from "react/jsx-runtime";
function createAutoFocusEvent(type) {
  return new Event(type, { cancelable: true });
}
function Modal({
  isOpen,
  onClose,
  title,
  description,
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
  cancelButtonBorder
}) {
  var _a, _b;
  const [isExiting, setIsExiting] = useState12(false);
  const exitTimeoutRef = useRef9(null);
  const dialogRef = useRef9(null);
  const layerId = useId13();
  const parentLayerId = useContext6(OverlayLayerContext);
  const initialFocusRefRef = useRef9(initialFocusRef);
  initialFocusRefRef.current = initialFocusRef;
  const onOpenAutoFocusRef = useRef9(onOpenAutoFocus);
  onOpenAutoFocusRef.current = onOpenAutoFocus;
  const onCloseAutoFocusRef = useRef9(onCloseAutoFocus);
  onCloseAutoFocusRef.current = onCloseAutoFocus;
  const sizeClass = (_a = modalSizeMap[size]) != null ? _a : "";
  const animClass = animation !== "none" ? `modal-dialog--${animation}` : "";
  useEffect7(() => {
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
  useEffect7(() => {
    if (!isOpen)
      return void 0;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [isOpen]);
  useEffect7(() => {
    if (!isOpen)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [isOpen, layerId, parentLayerId]);
  const handleClose = useCallback10(() => {
    if (exitTimeoutRef.current)
      return;
    if (closeAfterTransition && animation !== "none") {
      setIsExiting(true);
      exitTimeoutRef.current = setTimeout(() => {
        onClose();
        exitTimeoutRef.current = null;
      }, animationDuration);
    } else {
      onClose();
    }
  }, [closeAfterTransition, animation, animationDuration, onClose]);
  useEffect7(() => {
    return () => {
      if (exitTimeoutRef.current)
        clearTimeout(exitTimeoutRef.current);
    };
  }, []);
  useEffect7(() => {
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
  useEffect7(() => {
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
    fullscreenOnMobile ? "modal--fullscreen-mobile" : ""
  ].filter(Boolean).join(" ");
  const modalContent = /* @__PURE__ */ jsx27(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs23("div", { className: "modal-root", children: [
    !isStackedBackground && /* @__PURE__ */ jsx27(
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
    /* @__PURE__ */ jsx27(
      "div",
      {
        ref: dialogRef,
        className: rootClassName,
        id,
        tabIndex: -1,
        "aria-labelledby": !hideHeader ? `${id}Label` : void 0,
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
          padding: "1rem",
          overflowX: "hidden",
          overflowY: scrollOutside ? "auto" : "hidden",
          pointerEvents: "auto"
        },
        onClick: !isStackedBackground ? handleBackdropClick : void 0,
        children: /* @__PURE__ */ jsx27(
          "div",
          {
            className: `modal-dialog ${sizeClass} ${animClass} ${isExiting ? "modal-dialog--exiting" : "modal-dialog--entering"}`,
            style: {
              boxSizing: "border-box",
              margin: scrollOutside ? "auto" : 0,
              maxHeight: scrollOutside ? "none" : "calc(100dvh - 2rem)",
              width: "100%",
              maxWidth: (_b = modalSizeWidths[size]) != null ? _b : "480px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              pointerEvents: "auto",
              animationDuration: `${animationDuration}ms`
            },
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxs23(
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
                  borderRadius: "var(--radius-lg, 8px)",
                  boxShadow: "var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.12))"
                },
                children: [
                  !hideHeader && /* @__PURE__ */ jsxs23(
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
                        /* @__PURE__ */ jsxs23("div", { className: "modal-heading", style: { flex: 1, minWidth: 0 }, children: [
                          /* @__PURE__ */ jsxs23(
                            "span",
                            {
                              id: `${id}Label`,
                              className: "modal-title fw-semibold",
                              style: { display: "block", fontSize: "1.125rem", color: "var(--color-text-primary)" },
                              children: [
                                titleIcon && /* @__PURE__ */ jsx27(
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
                          hasDescription && /* @__PURE__ */ jsx27("p", { id: descriptionId, className: "modal-description", children: description })
                        ] }),
                        showCloseButton && /* @__PURE__ */ jsx27(
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
                  /* @__PURE__ */ jsx27(
                    "div",
                    {
                      className: "modal-body",
                      style: {
                        overflowY: scrollOutside ? "visible" : "auto",
                        overflowX: "hidden",
                        flex: 1,
                        minHeight: 0,
                        padding: "1rem 1.25rem"
                      },
                      children
                    }
                  ),
                  !hideFooter && (footer != null || onConfirm) && /* @__PURE__ */ jsx27(
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
                      children: footer != null ? footer : /* @__PURE__ */ jsxs23(Fragment, { children: [
                        showCancel && /* @__PURE__ */ jsx27(
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
                        /* @__PURE__ */ jsx27(
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
  ] }) });
  return typeof document !== "undefined" ? createPortal2(modalContent, document.body) : null;
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
import { jsx as jsx28, jsxs as jsxs24 } from "react/jsx-runtime";
var iconSize = 56;
function SuccessIconSvg({
  animated,
  color = "var(--color-state-success)",
  bgColor = "color-mix(in srgb, var(--color-state-success) 10%, transparent)"
}) {
  return /* @__PURE__ */ jsxs24(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--success" : "",
      children: [
        /* @__PURE__ */ jsx28("circle", { cx: "28", cy: "28", r: "26", fill: bgColor }),
        /* @__PURE__ */ jsx28(
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
  return /* @__PURE__ */ jsxs24(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--error" : "",
      children: [
        /* @__PURE__ */ jsx28("circle", { cx: "28", cy: "28", r: "26", fill: bgColor }),
        /* @__PURE__ */ jsx28("path", { d: "M28 18v14", stroke: color, strokeWidth: "3", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx28("circle", { cx: "28", cy: "38", r: "2.5", fill: color })
      ]
    }
  );
}
function WarningIconSvg({
  animated,
  color = "var(--color-state-warning)",
  bgColor = "color-mix(in srgb, var(--color-state-warning) 10%, transparent)"
}) {
  return /* @__PURE__ */ jsxs24(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--warning" : "",
      children: [
        /* @__PURE__ */ jsx28(
          "path",
          {
            d: "M28 12L44 42H12L28 12z",
            fill: bgColor,
            stroke: color,
            strokeWidth: "2",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx28("path", { d: "M28 22v10", stroke: color, strokeWidth: "2.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx28("circle", { cx: "28", cy: "38", r: "2", fill: color })
      ]
    }
  );
}

// src/components/molecules/AlertDialog/index.tsx
import { jsx as jsx29, jsxs as jsxs25 } from "react/jsx-runtime";
function VariantIcon({
  variant,
  animated
}) {
  const config = alertDialogVariantConfig[variant];
  const color = config.iconColor;
  const bgColor = config.bgColor;
  if (variant === "success") {
    return /* @__PURE__ */ jsx29(SuccessIconSvg, { animated, color, bgColor });
  }
  if (variant === "error") {
    return /* @__PURE__ */ jsx29(ErrorIconSvg, { animated, color, bgColor });
  }
  if (variant === "warning") {
    return /* @__PURE__ */ jsx29(WarningIconSvg, { animated, color, bgColor });
  }
  return /* @__PURE__ */ jsx29(
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
        backgroundColor: config.bgColor,
        color: config.iconColor,
        fontSize: 24
      },
      children: config.icon
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
  return /* @__PURE__ */ jsx29(
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
      children: /* @__PURE__ */ jsxs25(
        "div",
        {
          className: "alert-dialog-content",
          role: "alertdialog",
          "aria-labelledby": "alert-dialog-title",
          "aria-describedby": "alert-dialog-desc",
          children: [
            /* @__PURE__ */ jsx29("div", { style: { marginBottom: "1.25rem", display: "flex", justifyContent: "center" }, children: customIcon != null ? customIcon : /* @__PURE__ */ jsx29(VariantIcon, { variant, animated: iconAnimated }) }),
            /* @__PURE__ */ jsx29(
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
            description && /* @__PURE__ */ jsx29(
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
            /* @__PURE__ */ jsxs25("div", { className: "alert-dialog-actions", children: [
              showCancel && /* @__PURE__ */ jsx29(
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
              /* @__PURE__ */ jsx29(
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

// src/components/atoms/Hyperlink/Hyperlink.config.ts
var defaultLinkColor = "var(--color-brand-link)";
var hyperlinkBaseClass = "font-sans text-body text-[var(--color-brand-link)] no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary-focus-ring)] cursor-pointer";

// src/components/atoms/Hyperlink/Hyperlink.utils.ts
var cls12 = (...classes) => classes.filter(Boolean).join(" ");

// src/components/atoms/Hyperlink/index.tsx
import { jsx as jsx30 } from "react/jsx-runtime";
var Hyperlink = ({
  children,
  href = "#",
  disabled = false,
  className = "",
  openInNewTab = false
}) => {
  return /* @__PURE__ */ jsx30(
    "a",
    {
      href: disabled ? void 0 : href,
      className: cls12(
        hyperlinkBaseClass,
        disabled && "disabled",
        className
      ),
      style: { color: defaultLinkColor },
      target: openInNewTab ? "_blank" : "_self",
      rel: openInNewTab ? "noopener noreferrer" : "",
      onClick: (e) => disabled && e.preventDefault(),
      children
    }
  );
};
var Hyperlink_default = Hyperlink;

// src/components/atoms/IconBox/index.tsx
import React21 from "react";

// src/components/atoms/IconBox/IconBox.config.ts
var ICON_BOX_DEFAULTS = {
  tone: "neutral",
  size: "md",
  shape: "rounded"
};

// src/components/atoms/IconBox/index.tsx
import { jsx as jsx31 } from "react/jsx-runtime";
var IconBox = React21.memo(function IconBox2({
  children,
  tone = ICON_BOX_DEFAULTS.tone,
  size = ICON_BOX_DEFAULTS.size,
  shape = ICON_BOX_DEFAULTS.shape,
  label,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsx31(
    "span",
    {
      className: ["ds-icon-box", className].filter(Boolean).join(" "),
      "data-tone": tone,
      "data-size": size,
      "data-shape": shape,
      role: label ? "img" : void 0,
      "aria-label": label,
      "aria-hidden": label ? void 0 : true,
      ...rest,
      children
    }
  );
});
var IconBox_default = IconBox;

// src/components/molecules/List/index.tsx
import React22 from "react";

// src/components/molecules/List/List.config.ts
var LIST_DEFAULTS = {
  divided: true,
  bordered: false,
  size: "md"
};

// src/components/molecules/List/index.tsx
import { jsx as jsx32, jsxs as jsxs26 } from "react/jsx-runtime";
function cls13(...parts) {
  return parts.filter(Boolean).join(" ");
}
var List = React22.forwardRef(function List2({
  children,
  divided = LIST_DEFAULTS.divided,
  bordered = LIST_DEFAULTS.bordered,
  size = LIST_DEFAULTS.size,
  ordered = false,
  className,
  ...rest
}, ref) {
  const Tag2 = ordered ? "ol" : "ul";
  return /* @__PURE__ */ jsx32(
    Tag2,
    {
      ref,
      className: cls13("ds-list", className),
      "data-divided": divided ? "true" : "false",
      "data-bordered": bordered ? "true" : "false",
      "data-size": size,
      ...rest,
      children
    }
  );
});
var ListItem = React22.forwardRef(function ListItem2({
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
  const titleNode = href && !disabled && isSafeHref(href) ? /* @__PURE__ */ jsx32(
    "a",
    {
      className: "ds-list-item__link",
      href,
      target,
      rel: target === "_blank" ? "noopener noreferrer" : void 0,
      children: title
    }
  ) : title;
  return /* @__PURE__ */ jsxs26(
    "li",
    {
      ref,
      className: cls13("ds-list-item", className),
      "data-selected": selected ? "true" : void 0,
      "data-disabled": disabled ? "true" : void 0,
      "aria-current": selected ? "true" : void 0,
      "aria-disabled": disabled ? "true" : void 0,
      ...rest,
      children: [
        leading ? /* @__PURE__ */ jsx32("span", { className: "ds-list-item__leading", children: leading }) : null,
        /* @__PURE__ */ jsxs26("div", { className: "ds-list-item__body", children: [
          /* @__PURE__ */ jsxs26("div", { className: "ds-list-item__heading", children: [
            /* @__PURE__ */ jsx32("span", { className: "ds-list-item__title", children: titleNode }),
            badge
          ] }),
          description ? /* @__PURE__ */ jsx32("p", { className: "ds-list-item__description", children: description }) : null
        ] }),
        meta || action ? /* @__PURE__ */ jsxs26("div", { className: "ds-list-item__trail", children: [
          meta ? /* @__PURE__ */ jsx32("span", { className: "ds-list-item__meta", children: meta }) : null,
          action
        ] }) : null
      ]
    }
  );
});
List.displayName = "List";
ListItem.displayName = "ListItem";

// src/components/molecules/StatCard/index.tsx
import React23 from "react";

// src/components/molecules/StatCard/StatCard.config.ts
var STAT_TREND_LABEL = {
  up: "Increased",
  down: "Decreased",
  neutral: "No change"
};
var STAT_CARD_DEFAULTS = {
  iconTone: "neutral"
};

// src/components/molecules/StatCard/index.tsx
import { jsx as jsx33, jsxs as jsxs27 } from "react/jsx-runtime";
function TrendArrow({ trend }) {
  if (trend === "neutral") {
    return /* @__PURE__ */ jsx33("svg", { viewBox: "0 0 12 12", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx33("path", { d: "M2 6h8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
  }
  return /* @__PURE__ */ jsx33("svg", { viewBox: "0 0 12 12", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx33(
    "path",
    {
      d: trend === "up" ? "M6 10V2M2.5 5.5 6 2l3.5 3.5" : "M6 2v8M2.5 6.5 6 10l3.5-3.5",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
var StatCard = React23.forwardRef(function StatCard2({
  label,
  value,
  unit,
  icon,
  iconTone = STAT_CARD_DEFAULTS.iconTone,
  delta,
  description,
  footer,
  size = "default",
  ...cardProps
}, ref) {
  var _a;
  const trend = (_a = delta == null ? void 0 : delta.trend) != null ? _a : "neutral";
  const deltaTone = trend === "neutral" ? "neutral" : trend === "up" !== Boolean(delta == null ? void 0 : delta.invert) ? "success" : "danger";
  return /* @__PURE__ */ jsx33(Card_default, { ref, size, ...cardProps, children: /* @__PURE__ */ jsxs27("div", { className: "ds-stat", "data-size": size, children: [
    /* @__PURE__ */ jsxs27("div", { className: "ds-stat__top", children: [
      /* @__PURE__ */ jsx33("p", { className: "ds-stat__label", children: label }),
      icon ? /* @__PURE__ */ jsx33(IconBox_default, { tone: iconTone, size: size === "sm" ? "sm" : "md", children: icon }) : null
    ] }),
    /* @__PURE__ */ jsxs27("p", { className: "ds-stat__value", children: [
      value,
      unit ? /* @__PURE__ */ jsx33("span", { className: "ds-stat__unit", children: unit }) : null
    ] }),
    delta ? /* @__PURE__ */ jsxs27("span", { className: "ds-stat__delta", children: [
      /* @__PURE__ */ jsxs27("span", { className: "ds-stat__delta-value", "data-tone": deltaTone, children: [
        /* @__PURE__ */ jsx33(TrendArrow, { trend }),
        /* @__PURE__ */ jsxs27("span", { className: "ds-stat__sr", children: [
          STAT_TREND_LABEL[trend],
          " "
        ] }),
        delta.value
      ] }),
      delta.label ? /* @__PURE__ */ jsx33("span", { children: delta.label }) : null
    ] }) : null,
    description ? /* @__PURE__ */ jsx33("p", { className: "ds-stat__description", children: description }) : null,
    footer ? /* @__PURE__ */ jsx33("div", { className: "ds-stat__footer", children: footer }) : null
  ] }) });
});
StatCard.displayName = "StatCard";
var StatCard_default = StatCard;

// src/components/molecules/CodeBlock/index.tsx
import React24, { useCallback as useCallback11, useEffect as useEffect8, useMemo as useMemo11, useRef as useRef10, useState as useState13 } from "react";

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
import { jsx as jsx34, jsxs as jsxs28 } from "react/jsx-runtime";
function CopyIcon({ copied }) {
  return copied ? /* @__PURE__ */ jsx34("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx34("path", { d: "m3.5 8.5 3 3 6-7", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) }) : /* @__PURE__ */ jsxs28("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": true, focusable: "false", children: [
    /* @__PURE__ */ jsx34("rect", { x: "5.5", y: "5.5", width: "8", height: "8", rx: "1.5", stroke: "currentColor", strokeWidth: "1.4" }),
    /* @__PURE__ */ jsx34("path", { d: "M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5", stroke: "currentColor", strokeWidth: "1.4" })
  ] });
}
var CodeBlock = React24.forwardRef(function CodeBlock2({
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
  const text = useMemo11(() => normalizeCode(code), [code]);
  const [copied, setCopied] = useState13(false);
  const timer = useRef10(null);
  useEffect8(
    () => () => {
      if (timer.current)
        clearTimeout(timer.current);
    },
    []
  );
  const handleCopy = useCallback11(async () => {
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
  const copyButton = showCopy ? /* @__PURE__ */ jsxs28(
    "button",
    {
      type: "button",
      className: ["ds-code__copy", hasHeader ? "" : "ds-code__floating-copy"].filter(Boolean).join(" "),
      "aria-label": copied ? copiedLabel : copyLabel,
      "data-copied": copied ? "true" : void 0,
      onClick: handleCopy,
      children: [
        /* @__PURE__ */ jsx34(CopyIcon, { copied }),
        hasHeader ? /* @__PURE__ */ jsx34("span", { "aria-hidden": true, children: copied ? copiedLabel : "Copy" }) : null
      ]
    }
  ) : null;
  const lines = showLineNumbers ? text.split("\n") : null;
  const resolvedMaxHeight = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
  return /* @__PURE__ */ jsxs28(
    "div",
    {
      ref,
      className: ["ds-code", className].filter(Boolean).join(" "),
      "data-tone": tone,
      "data-wrap": wrap ? "true" : void 0,
      "data-floating-copy": !hasHeader && showCopy ? "true" : void 0,
      ...rest,
      children: [
        hasHeader ? /* @__PURE__ */ jsxs28("div", { className: "ds-code__header", children: [
          /* @__PURE__ */ jsx34("span", { className: "ds-code__title", children: title }),
          language ? /* @__PURE__ */ jsx34("span", { className: "ds-code__lang", children: language }) : null,
          copyButton
        ] }) : null,
        /* @__PURE__ */ jsxs28("div", { className: "ds-code__body", children: [
          /* @__PURE__ */ jsx34(
            "pre",
            {
              className: "ds-code__pre",
              tabIndex: 0,
              style: resolvedMaxHeight ? { maxHeight: resolvedMaxHeight } : void 0,
              "aria-label": typeof title === "string" ? title : language ? `${language} code` : "Code",
              children: /* @__PURE__ */ jsx34("code", { children: lines ? lines.map((line, i) => /* @__PURE__ */ jsxs28("span", { className: "ds-code__line", children: [
                /* @__PURE__ */ jsx34("span", { className: "ds-code__ln", "aria-hidden": true, children: i + 1 }),
                line || " "
              ] }, i)) : text })
            }
          ),
          !hasHeader ? copyButton : null
        ] }),
        /* @__PURE__ */ jsx34("span", { className: "ds-code__status", role: "status", "aria-live": "polite", children: copied ? copiedLabel : "" })
      ]
    }
  );
});
CodeBlock.displayName = "CodeBlock";
var CodeBlock_default = CodeBlock;

// src/components/molecules/Alert/index.tsx
import React26 from "react";

// src/components/molecules/Alert/Alert.config.ts
import React25 from "react";
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
var h = React25.createElement;
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

// src/components/molecules/Alert/index.tsx
import { jsx as jsx35, jsxs as jsxs29 } from "react/jsx-runtime";
var Alert = React26.forwardRef(function Alert2({
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
  const prefix = srPrefix ? /* @__PURE__ */ jsxs29("span", { className: "ds-alert__sr", children: [
    ALERT_SR_PREFIX[variant],
    " "
  ] }) : null;
  const hasTitle = title !== void 0 && title !== null && title !== false;
  return /* @__PURE__ */ jsxs29(
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
        hideIcon ? null : /* @__PURE__ */ jsx35("span", { className: "ds-alert__icon", "aria-hidden": "true", children: icon != null ? icon : getAlertIcon(variant) }),
        /* @__PURE__ */ jsxs29("div", { className: "ds-alert__body", children: [
          hasTitle ? /* @__PURE__ */ jsxs29("p", { className: "ds-alert__title", children: [
            prefix,
            title
          ] }) : null,
          children ? /* @__PURE__ */ jsxs29("div", { className: "ds-alert__description", children: [
            hasTitle ? null : prefix,
            children
          ] }) : null
        ] }),
        action || onDismiss ? /* @__PURE__ */ jsxs29("div", { className: "ds-alert__actions", children: [
          action ? /* @__PURE__ */ jsx35("div", { className: "ds-alert__action", children: action }) : null,
          onDismiss ? /* @__PURE__ */ jsx35("button", { type: "button", className: "ds-alert__dismiss", "aria-label": dismissLabel, onClick: onDismiss, children: getCloseIcon() }) : null
        ] }) : null
      ]
    }
  );
});
Alert.displayName = "Alert";
var Alert_default = Alert;

// src/components/molecules/Toast/index.tsx
import React27, { createContext as createContext7, useCallback as useCallback12, useContext as useContext7, useEffect as useEffect9, useMemo as useMemo12, useRef as useRef11, useState as useState14 } from "react";
import { createPortal as createPortal3 } from "react-dom";

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
import { jsx as jsx36, jsxs as jsxs30 } from "react/jsx-runtime";
var Toast = React27.forwardRef(function Toast2({
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
  return /* @__PURE__ */ jsxs30(
    "div",
    {
      ref,
      className: ["ds-toast", className].filter(Boolean).join(" "),
      "data-variant": variant,
      style: { ...getToneStyle(variant), ...style },
      ...live,
      ...rest,
      children: [
        /* @__PURE__ */ jsx36("span", { className: "ds-toast__icon", "aria-hidden": "true", children: getAlertIcon(variant) }),
        /* @__PURE__ */ jsxs30("div", { className: "ds-toast__body", children: [
          /* @__PURE__ */ jsxs30("p", { className: "ds-toast__title", children: [
            srPrefix ? /* @__PURE__ */ jsxs30("span", { className: "ds-alert__sr", children: [
              ALERT_SR_PREFIX[variant],
              " "
            ] }) : null,
            title
          ] }),
          description ? /* @__PURE__ */ jsx36("div", { className: "ds-toast__description", children: description }) : null,
          action ? /* @__PURE__ */ jsx36("div", { className: "ds-toast__action", children: /* @__PURE__ */ jsx36(Button_default, { size: "sm", variant: "outlineSecondary", onClick: action.onClick, children: action.label }) }) : null
        ] }),
        dismissible && onDismiss ? /* @__PURE__ */ jsx36("button", { type: "button", className: "ds-toast__dismiss", "aria-label": dismissLabel, onClick: onDismiss, children: getCloseIcon() }) : null
      ]
    }
  );
});
Toast.displayName = "Toast";
var ToastContext = createContext7(null);
function useToast() {
  const ctx = useContext7(ToastContext);
  if (!ctx)
    throw new Error("useToast must be used within a <ToastProvider>.");
  return ctx;
}
function ToastItem({ record, defaultDuration, documentHidden, dismissLabel, onClose }) {
  var _a;
  const { id, title, description, variant, action, dismissible = TOAST_DEFAULTS.dismissible, closing } = record;
  const [hovered, setHovered] = useState14(false);
  const [focusWithin, setFocusWithin] = useState14(false);
  const remaining = useRef11((_a = record.duration) != null ? _a : action ? Infinity : defaultDuration);
  const paused = hovered || focusWithin || documentHidden || closing;
  useEffect9(() => {
    if (paused || !Number.isFinite(remaining.current))
      return void 0;
    const startedAt = Date.now();
    const timer = setTimeout(() => onClose(id), Math.max(0, remaining.current));
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - startedAt;
    };
  }, [paused, id, onClose]);
  const close = useCallback12(() => onClose(id), [id, onClose]);
  return /* @__PURE__ */ jsx36(
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
  const [records, setRecords] = useState14([]);
  const [mounted, setMounted] = useState14(false);
  const [documentHidden, setDocumentHidden] = useState14(false);
  const regionRef = useRef11(null);
  const restoreFocusRef = useRef11(null);
  const exitTimers = useRef11(/* @__PURE__ */ new Map());
  useEffect9(() => {
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
  const remove = useCallback12((id) => {
    exitTimers.current.delete(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);
  const moveFocusFrom = useCallback12((id) => {
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
  const close = useCallback12(
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
  const toast = useCallback12((options) => {
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
  const recordsRef = useRef11(records);
  recordsRef.current = records;
  const dismissAll = useCallback12(() => {
    recordsRef.current.forEach((r) => {
      if (!r.closing)
        close(r.id);
    });
  }, [close]);
  const value = useMemo12(() => ({ toast, dismiss: close, dismissAll }), [toast, close, dismissAll]);
  const hasToasts = records.length > 0;
  useEffect9(() => {
    if (!hasToasts)
      return void 0;
    const onKeyDown = (e) => {
      if (e.key !== TOAST_HOTKEY || !regionRef.current)
        return;
      e.preventDefault();
      const active = document.activeElement;
      if (active && !regionRef.current.contains(active))
        restoreFocusRef.current = active;
      regionRef.current.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [hasToasts]);
  const visible = records.slice(0, Math.max(1, max));
  return /* @__PURE__ */ jsxs30(ToastContext.Provider, { value, children: [
    children,
    mounted ? createPortal3(
      /* @__PURE__ */ jsx36(
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
          children: visible.map((record) => /* @__PURE__ */ jsx36(
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
import React28, { useCallback as useCallback13, useContext as useContext8, useEffect as useEffect10, useId as useId14, useRef as useRef12, useState as useState15 } from "react";
import { createPortal as createPortal4 } from "react-dom";

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
  const active = document.activeElement;
  const inside = active instanceof Node && container.contains(active);
  if (e.shiftKey && (active === first || active === container || !inside)) {
    e.preventDefault();
    last.focus();
    return true;
  }
  if (!e.shiftKey && (active === last || !inside)) {
    e.preventDefault();
    first.focus();
    return true;
  }
  return false;
}

// src/components/molecules/Drawer/index.tsx
import { jsx as jsx37, jsxs as jsxs31 } from "react/jsx-runtime";
function CloseGlyph() {
  return /* @__PURE__ */ jsx37("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx37(
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
var Drawer = React28.forwardRef(function Drawer2({
  open,
  onOpenChange,
  side = DRAWER_DEFAULTS.side,
  size = DRAWER_DEFAULTS.size,
  title,
  description,
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
  id
}, forwardedRef) {
  const autoId = useId14();
  const layerId = `drawer-${autoId}`;
  const parentLayerId = useContext8(OverlayLayerContext);
  const baseId = id != null ? id : `ds-drawer-${autoId.replace(/:/g, "")}`;
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;
  const panelRef = useRef12(null);
  const bodyRef = useRef12(null);
  const lastFocusedRef = useRef12(null);
  const ownedFocusTargetRef = useRef12(null);
  const onOpenChangeRef = useRef12(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  const returnFocusRef = useRef12(returnFocus);
  returnFocusRef.current = returnFocus;
  const initialFocusRefRef = useRef12(initialFocusRef);
  initialFocusRefRef.current = initialFocusRef;
  const [present, setPresent] = useState15(open);
  if (open && !present)
    setPresent(true);
  const [bodyScrollable, setBodyScrollable] = useState15(false);
  const setPanelRef = useCallback13(
    (node) => {
      panelRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  const requestClose = useCallback13(() => onOpenChangeRef.current(false), []);
  useEffect10(() => {
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
  useEffect10(() => {
    if (!open)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [open, layerId, parentLayerId]);
  useEffect10(() => {
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
  useEffect10(() => {
    var _a, _b, _c;
    if (!open)
      return void 0;
    const previous = typeof document !== "undefined" ? document.activeElement : null;
    const panel = panelRef.current;
    if (panel) {
      const target = (_c = (_b = (_a = initialFocusRefRef.current) == null ? void 0 : _a.current) != null ? _b : getFocusable(panel)[0]) != null ? _c : panel;
      target.focus({ preventScroll: true });
    }
    return () => {
      if (returnFocusRef.current && previous && previous !== document.body && previous.isConnected && typeof previous.focus === "function") {
        previous.focus({ preventScroll: true });
      }
    };
  }, [open]);
  useEffect10(() => {
    if (!open || !modal)
      return void 0;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [open, modal]);
  useEffect10(() => {
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
  useEffect10(() => {
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
  const state = open ? "open" : "closed";
  const extent = side === "left" || side === "right" ? DRAWER_WIDTHS[size] : DRAWER_HEIGHTS[size];
  const handlePanelKeyDown = (e) => {
    if (modal && panelRef.current)
      trapTabKey(e.nativeEvent, panelRef.current);
  };
  const handleAnimationEnd = (e) => {
    if (!open && e.target === e.currentTarget)
      setPresent(false);
  };
  return createPortal4(
    /* @__PURE__ */ jsx37(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs31(
      "div",
      {
        className: "ds-drawer-root",
        "data-modal": modal ? "true" : "false",
        onFocusCapture: (e) => {
          ownedFocusTargetRef.current = e.target;
        },
        children: [
          modal ? /* @__PURE__ */ jsx37(
            "div",
            {
              className: "ds-drawer__backdrop",
              "data-state": state,
              "aria-hidden": "true",
              onMouseDown: (e) => e.preventDefault(),
              onClick: closeOnBackdropClick && open ? () => {
                if (isTopLayer(layerId))
                  requestClose();
              } : void 0
            }
          ) : null,
          /* @__PURE__ */ jsxs31(
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
              "data-state": state,
              style: { "--ds-drawer-extent": extent },
              onKeyDown: handlePanelKeyDown,
              onAnimationEnd: handleAnimationEnd,
              children: [
                /* @__PURE__ */ jsxs31("div", { className: "ds-drawer__header", children: [
                  /* @__PURE__ */ jsxs31("div", { className: "ds-drawer__heading", children: [
                    /* @__PURE__ */ jsx37("h2", { id: titleId, className: "ds-drawer__title", children: title }),
                    description != null ? /* @__PURE__ */ jsx37("p", { id: descriptionId, className: "ds-drawer__description", children: description }) : null
                  ] }),
                  showCloseButton ? /* @__PURE__ */ jsx37(
                    "button",
                    {
                      type: "button",
                      className: "ds-drawer__close",
                      "aria-label": closeLabel,
                      onClick: requestClose,
                      children: /* @__PURE__ */ jsx37(CloseGlyph, {})
                    }
                  ) : null
                ] }),
                /* @__PURE__ */ jsx37(
                  "div",
                  {
                    ref: bodyRef,
                    className: "ds-drawer__body",
                    tabIndex: bodyScrollable ? 0 : void 0,
                    "data-scrollable": bodyScrollable ? "true" : void 0,
                    children
                  }
                ),
                footer != null ? /* @__PURE__ */ jsx37("div", { className: "ds-drawer__footer", children: footer }) : null
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
var Drawer_default = Drawer;

// src/components/atoms/Spinner/index.tsx
import React29 from "react";

// src/components/atoms/Spinner/Spinner.config.ts
var SPINNER_DEFAULTS = {
  size: "md",
  tone: "current",
  label: "Loading",
  decorative: false
};

// src/components/atoms/Spinner/index.tsx
import { jsx as jsx38, jsxs as jsxs32 } from "react/jsx-runtime";
var Spinner = React29.forwardRef(function Spinner2({
  size = SPINNER_DEFAULTS.size,
  tone = SPINNER_DEFAULTS.tone,
  label = SPINNER_DEFAULTS.label,
  decorative = SPINNER_DEFAULTS.decorative,
  className,
  ...rest
}, ref) {
  return /* @__PURE__ */ jsxs32(
    "span",
    {
      ref,
      className: ["ds-spinner", className].filter(Boolean).join(" "),
      "data-size": size,
      "data-tone": tone,
      role: decorative ? void 0 : "status",
      "aria-hidden": decorative ? true : void 0,
      ...rest,
      children: [
        /* @__PURE__ */ jsx38("span", { className: "ds-spinner__ring", "aria-hidden": "true" }),
        decorative ? null : /* @__PURE__ */ jsx38("span", { className: "ds-spinner__label", children: label })
      ]
    }
  );
});
Spinner.displayName = "Spinner";
var Spinner_default = Spinner;

// src/components/atoms/Skeleton/index.tsx
import React30 from "react";

// src/components/atoms/Skeleton/Skeleton.config.ts
var SKELETON_DEFAULTS = {
  shape: "text",
  lines: 1,
  animated: true,
  groupLabel: "Loading content"
};
var SKELETON_LAST_LINE_WIDTH = "60%";

// src/components/atoms/Skeleton/index.tsx
import { jsx as jsx39, jsxs as jsxs33 } from "react/jsx-runtime";
function cls14(...parts) {
  return parts.filter(Boolean).join(" ");
}
function toCss(value) {
  if (value === void 0 || value === null)
    return void 0;
  return typeof value === "number" ? `${value}px` : value;
}
var Skeleton = React30.forwardRef(function Skeleton2({
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
  const h2 = (_a = toCss(height)) != null ? _a : shape === "circle" ? w : void 0;
  const blockStyle = {
    ...w !== void 0 ? { width: w } : null,
    ...h2 !== void 0 ? { height: h2 } : null,
    ...radius !== void 0 ? { borderRadius: toCss(radius) } : null
  };
  const lineCount = shape === "text" ? Math.max(1, Math.floor(lines || 1)) : 1;
  if (lineCount > 1) {
    return /* @__PURE__ */ jsx39(
      "span",
      {
        ref,
        className: cls14("ds-skeleton-lines", className),
        "aria-hidden": "true",
        style,
        ...rest,
        children: Array.from({ length: lineCount }, (_, i) => /* @__PURE__ */ jsx39(
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
  return /* @__PURE__ */ jsx39(
    "span",
    {
      ref,
      className: cls14("ds-skeleton", className),
      "data-shape": shape,
      "data-animated": animated ? "true" : "false",
      "aria-hidden": "true",
      style: { ...blockStyle, ...style },
      ...rest
    }
  );
});
Skeleton.displayName = "Skeleton";
var SkeletonGroup = React30.forwardRef(function SkeletonGroup2({ label = SKELETON_DEFAULTS.groupLabel, className, children, ...rest }, ref) {
  return /* @__PURE__ */ jsxs33(
    "div",
    {
      ref,
      role: "status",
      className: cls14("ds-skeleton-group", className),
      ...rest,
      children: [
        /* @__PURE__ */ jsx39("span", { className: "ds-skeleton-group__label", children: label }),
        children
      ]
    }
  );
});
SkeletonGroup.displayName = "SkeletonGroup";
var Skeleton_default = Skeleton;

// src/components/molecules/Pagination/index.tsx
import React31, { useId as useId15 } from "react";

// src/components/molecules/Pagination/Pagination.config.ts
var PAGINATION_DEFAULTS = {
  siblingCount: 1,
  boundaryCount: 1,
  showFirstLast: false,
  showPrevNext: true,
  size: "md",
  compact: false,
  disabled: false,
  ariaLabel: "Pagination"
};
var PAGINATION_LABELS = {
  previous: "Previous page",
  next: "Next page",
  first: "First page",
  last: "Last page",
  page: (page) => `Page ${page}`,
  ellipsis: (from, to) => from === to ? `Page ${from} not shown` : `Pages ${from} to ${to} not shown`,
  status: (page, pageCount) => pageCount === 0 ? "No pages" : `Page ${page} of ${pageCount}`,
  total: ({ from, to, total }) => total === 0 ? "No results" : `Showing ${from}\u2013${to} of ${total}`,
  pageSize: "Rows per page"
};

// src/components/molecules/Pagination/Pagination.utils.ts
function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i += 1)
    out.push(i);
  return out;
}
function toInt(value, fallback) {
  return typeof value === "number" && Number.isFinite(value) ? Math.floor(value) : fallback;
}
function getPageCount(totalItems, pageSize) {
  const total = Math.max(0, toInt(totalItems, 0));
  const size = toInt(pageSize, 0);
  if (total === 0 || size < 1)
    return 0;
  return Math.ceil(total / size);
}
function clampPage(page, pageCount) {
  const count = Math.max(0, toInt(pageCount, 0));
  if (count === 0)
    return 0;
  return Math.min(Math.max(1, toInt(page, 1)), count);
}
function getItemRange(page, pageSize, totalItems) {
  const total = Math.max(0, toInt(totalItems, 0));
  const size = Math.max(1, toInt(pageSize, 1));
  const current = clampPage(page, Math.ceil(total / size));
  if (total === 0 || current === 0)
    return { from: 0, to: 0, total };
  const from = (current - 1) * size + 1;
  return { from, to: Math.min(current * size, total), total };
}
function getPaginationRange({
  page,
  pageCount,
  siblingCount = 1,
  boundaryCount = 1
}) {
  const count = Math.max(0, toInt(pageCount, 0));
  if (count === 0)
    return [];
  const current = clampPage(page, count);
  const siblings = Math.max(0, toInt(siblingCount, 1));
  const boundary = Math.max(0, toInt(boundaryCount, 1));
  const startPages = range(1, Math.min(boundary, count));
  const endPages = range(Math.max(count - boundary + 1, boundary + 1), count);
  const siblingsStart = Math.max(
    Math.min(current - siblings, count - boundary - siblings * 2 - 1),
    boundary + 2
  );
  const siblingsEnd = Math.min(
    Math.max(current + siblings, boundary + siblings * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );
  const pages = [...startPages];
  if (siblingsStart > boundary + 2) {
    pages.push("start-ellipsis");
  } else if (boundary + 1 < count - boundary) {
    pages.push(boundary + 1);
  }
  pages.push(...range(siblingsStart, siblingsEnd));
  if (siblingsEnd < count - boundary - 1) {
    pages.push("end-ellipsis");
  } else if (count - boundary > boundary) {
    pages.push(count - boundary);
  }
  pages.push(...endPages);
  const seen = /* @__PURE__ */ new Set();
  const items = [];
  pages.forEach((entry, index) => {
    if (typeof entry === "number") {
      if (entry < 1 || entry > count || seen.has(entry))
        return;
      seen.add(entry);
      items.push({ type: "page", page: entry });
      return;
    }
    const prev = pages[index - 1];
    const next = pages[index + 1];
    const from = typeof prev === "number" ? prev + 1 : 1;
    const to = typeof next === "number" ? next - 1 : count;
    if (to >= from)
      items.push({ type: "ellipsis", key: entry, from, to });
  });
  return items;
}
var SAFE_PROTOCOLS = /* @__PURE__ */ new Set(["http:", "https:"]);
function isSafePageHref(href) {
  if (typeof href !== "string" || href.trim() === "")
    return false;
  try {
    return SAFE_PROTOCOLS.has(new URL(href, "https://relative.invalid/").protocol);
  } catch (e) {
    return false;
  }
}

// src/components/molecules/Pagination/index.tsx
import { Fragment as Fragment2, jsx as jsx40, jsxs as jsxs34 } from "react/jsx-runtime";
function cls15(...parts) {
  return parts.filter(Boolean).join(" ");
}
var Chevron = ({ direction, double = false }) => /* @__PURE__ */ jsx40(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
    children: direction === "left" ? /* @__PURE__ */ jsxs34(Fragment2, { children: [
      /* @__PURE__ */ jsx40("path", { d: double ? "M8.5 4 4.5 8l4 4" : "M10 4 6 8l4 4" }),
      double ? /* @__PURE__ */ jsx40("path", { d: "M12.5 4 8.5 8l4 4" }) : null
    ] }) : /* @__PURE__ */ jsxs34(Fragment2, { children: [
      /* @__PURE__ */ jsx40("path", { d: double ? "M7.5 4l4 4-4 4" : "M6 4l4 4-4 4" }),
      double ? /* @__PURE__ */ jsx40("path", { d: "M3.5 4l4 4-4 4" }) : null
    ] })
  }
);
var Pagination = React31.forwardRef(function Pagination2({
  page,
  pageCount,
  totalItems,
  pageSize,
  onPageChange,
  siblingCount = PAGINATION_DEFAULTS.siblingCount,
  boundaryCount = PAGINATION_DEFAULTS.boundaryCount,
  showFirstLast = PAGINATION_DEFAULTS.showFirstLast,
  showPrevNext = PAGINATION_DEFAULTS.showPrevNext,
  pageSizeOptions,
  onPageSizeChange,
  showTotal,
  size = PAGINATION_DEFAULTS.size,
  compact = PAGINATION_DEFAULTS.compact,
  disabled = PAGINATION_DEFAULTS.disabled,
  ariaLabel = PAGINATION_DEFAULTS.ariaLabel,
  getPageHref,
  labels: labelsProp,
  className,
  ...rest
}, ref) {
  const labels = { ...PAGINATION_LABELS, ...labelsProp };
  const sizeSelectId = useId15();
  const count = typeof pageCount === "number" && Number.isFinite(pageCount) ? Math.max(0, Math.floor(pageCount)) : getPageCount(totalItems, pageSize);
  const current = clampPage(page, count);
  const items = compact ? [] : getPaginationRange({ page: current, pageCount: count, siblingCount, boundaryCount });
  const hasTotal = Boolean(showTotal) && typeof totalItems === "number";
  const range2 = hasTotal ? getItemRange(current, pageSize != null ? pageSize : Math.max(1, totalItems), totalItems) : null;
  const totalContent = range2 && showTotal ? typeof showTotal === "function" ? showTotal(range2) : labels.total(range2) : null;
  const go = (target, event) => {
    if (disabled || target < 1 || target > count || target === current) {
      if (disabled || target < 1 || target > count)
        event.preventDefault();
      return;
    }
    onPageChange == null ? void 0 : onPageChange(target, event);
  };
  const renderControl = (kind, target, label, content, { isCurrent = false, atBoundary = false } = {}) => {
    const common = {
      className: "ds-pagination__control",
      "aria-label": label,
      "aria-current": isCurrent ? "page" : void 0,
      onClick: (event) => go(target, event)
    };
    const href = getPageHref && !disabled && !atBoundary ? getPageHref(target) : void 0;
    let control;
    if (getPageHref && isSafePageHref(href)) {
      control = /* @__PURE__ */ jsx40("a", { ...common, href, children: content });
    } else if (getPageHref && (disabled || atBoundary)) {
      control = /* @__PURE__ */ jsx40("a", { ...common, role: "link", "aria-disabled": "true", children: content });
    } else {
      control = /* @__PURE__ */ jsx40(
        "button",
        {
          ...common,
          type: "button",
          disabled,
          "aria-disabled": !disabled && atBoundary ? true : void 0,
          children: content
        }
      );
    }
    return /* @__PURE__ */ jsx40("li", { className: "ds-pagination__item", "data-kind": kind, children: control }, kind === "page" ? `page-${target}` : kind);
  };
  const isFirst = current <= 1;
  const isLast = current >= count;
  return /* @__PURE__ */ jsxs34(
    "nav",
    {
      ref,
      "aria-label": ariaLabel,
      className: cls15("ds-pagination", className),
      "data-size": size,
      "data-compact": compact ? "true" : "false",
      "data-disabled": disabled ? "true" : void 0,
      ...rest,
      children: [
        totalContent !== null ? /* @__PURE__ */ jsx40("p", { className: "ds-pagination__total", "aria-live": "polite", "aria-atomic": "true", children: totalContent }) : null,
        /* @__PURE__ */ jsxs34("ul", { className: "ds-pagination__list", children: [
          showFirstLast && !compact ? renderControl("first", 1, labels.first, /* @__PURE__ */ jsx40(Chevron, { direction: "left", double: true }), { atBoundary: isFirst }) : null,
          showPrevNext ? renderControl("prev", current - 1, labels.previous, /* @__PURE__ */ jsx40(Chevron, { direction: "left" }), { atBoundary: isFirst }) : null,
          items.map(
            (item) => item.type === "page" ? renderControl("page", item.page, labels.page(item.page), item.page, { isCurrent: item.page === current }) : /* @__PURE__ */ jsxs34("li", { className: "ds-pagination__item ds-pagination__ellipsis", "data-kind": "ellipsis", children: [
              /* @__PURE__ */ jsx40("span", { "aria-hidden": "true", children: "\u2026" }),
              /* @__PURE__ */ jsx40("span", { className: "ds-pagination__sr", children: labels.ellipsis(item.from, item.to) })
            ] }, item.key)
          ),
          /* @__PURE__ */ jsx40(
            "li",
            {
              className: "ds-pagination__item ds-pagination__status",
              "data-kind": "status",
              "aria-live": totalContent === null ? "polite" : void 0,
              "aria-atomic": totalContent === null ? true : void 0,
              children: labels.status(current, count)
            }
          ),
          showPrevNext ? renderControl("next", current + 1, labels.next, /* @__PURE__ */ jsx40(Chevron, { direction: "right" }), { atBoundary: isLast }) : null,
          showFirstLast && !compact ? renderControl("last", count, labels.last, /* @__PURE__ */ jsx40(Chevron, { direction: "right", double: true }), { atBoundary: isLast }) : null
        ] }),
        pageSizeOptions && pageSizeOptions.length > 0 && onPageSizeChange ? /* @__PURE__ */ jsxs34("div", { className: "ds-pagination__size", children: [
          /* @__PURE__ */ jsx40("label", { htmlFor: sizeSelectId, className: "ds-pagination__size-label", children: labels.pageSize }),
          /* @__PURE__ */ jsx40(
            Select_default,
            {
              id: sizeSelectId,
              size,
              fullWidth: false,
              placeholder: "",
              animatedChevron: false,
              disabled,
              value: String(pageSize != null ? pageSize : pageSizeOptions[0]),
              options: pageSizeOptions.map((n) => ({ label: String(n), value: String(n) })),
              onValueChange: (value) => onPageSizeChange(Number(value))
            }
          )
        ] }) : null
      ]
    }
  );
});
Pagination.displayName = "Pagination";
var Pagination_default = Pagination;

// src/components/molecules/Tooltip/index.tsx
import React32, {
  cloneElement as cloneElement2,
  isValidElement as isValidElement2,
  useCallback as useCallback14,
  useEffect as useEffect11,
  useId as useId16,
  useLayoutEffect as useLayoutEffect4,
  useRef as useRef13,
  useState as useState16
} from "react";
import { createPortal as createPortal5 } from "react-dom";

// src/components/molecules/Tooltip/Tooltip.config.ts
var TOOLTIP_DEFAULTS = {
  side: "top",
  align: "center",
  delay: 300,
  closeDelay: 100,
  maxWidth: 240,
  variant: "dark"
};
var TOOLTIP_GAP2 = 8;
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
      return r.top - TOOLTIP_GAP2 - TOOLTIP_VIEWPORT_PADDING;
    case "bottom":
      return vp.height - r.bottom - TOOLTIP_GAP2 - TOOLTIP_VIEWPORT_PADDING;
    case "left":
      return r.left - TOOLTIP_GAP2 - TOOLTIP_VIEWPORT_PADDING;
    case "right":
      return vp.width - r.right - TOOLTIP_GAP2 - TOOLTIP_VIEWPORT_PADDING;
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
  const pad = TOOLTIP_VIEWPORT_PADDING;
  let top;
  let left;
  if (side === "top" || side === "bottom") {
    top = side === "top" ? r.top - TOOLTIP_GAP2 - height : r.bottom + TOOLTIP_GAP2;
    left = alignOffset(align, r.left, r.width, width);
    left = clamp3(left, pad, vp.width - pad - width);
    top = clamp3(top, pad, vp.height - pad - height);
  } else {
    left = side === "left" ? r.left - TOOLTIP_GAP2 - width : r.right + TOOLTIP_GAP2;
    top = alignOffset(align, r.top, r.height, height);
    top = clamp3(top, pad, vp.height - pad - height);
    left = clamp3(left, pad, vp.width - pad - width);
  }
  return { top: Math.round(top), left: Math.round(left), side };
}

// src/components/molecules/Tooltip/index.tsx
import { Fragment as Fragment3, jsx as jsx41, jsxs as jsxs35 } from "react/jsx-runtime";
function cls16(...parts) {
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
  const major = parseInt(React32.version, 10);
  if (major >= 19)
    return element.props.ref;
  return element.ref;
}
var useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect4 : useEffect11;
var Tooltip = React32.forwardRef(function Tooltip2({
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
  className,
  style,
  id: idProp,
  onPointerEnter: onBubblePointerEnter,
  onPointerLeave: onBubblePointerLeave,
  ...rest
}, forwardedRef) {
  var _a, _b, _c;
  const reactId = useId16();
  const tooltipId = idProp != null ? idProp : `ds-tooltip-${reactId.replace(/:/g, "")}`;
  const isControlled = openProp !== void 0;
  const [innerOpen, setInnerOpen] = useState16(defaultOpen);
  const open = !disabled && (isControlled ? Boolean(openProp) : innerOpen);
  const [mounted, setMounted] = useState16(false);
  const [position, setPosition] = useState16(null);
  const triggerRef = useRef13(null);
  const bubbleRef = useRef13(null);
  const openTimer = useRef13(null);
  const closeTimer = useRef13(null);
  const hoveringRef = useRef13(false);
  const focusedRef = useRef13(false);
  const openRef = useRef13(open);
  openRef.current = open;
  useEffect11(() => setMounted(true), []);
  const clearTimers = useCallback14(() => {
    if (openTimer.current)
      clearTimeout(openTimer.current);
    if (closeTimer.current)
      clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);
  useEffect11(() => clearTimers, [clearTimers]);
  const setOpen = useCallback14(
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
  const scheduleOpen = useCallback14(
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
  const scheduleClose = useCallback14(
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
  useEffect11(() => {
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
  const updatePosition = useCallback14(() => {
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
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition, content]);
  const child = React32.Children.only(children);
  if (!isValidElement2(child))
    return null;
  const childProps = child.props;
  const childRef = getElementRef(child);
  const describedBy = disabled ? childProps["aria-describedby"] : cls16(childProps["aria-describedby"], tooltipId) || void 0;
  const trigger = cloneElement2(child, {
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
  const bubble = mounted && !disabled ? createPortal5(
    /* @__PURE__ */ jsx41(
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
        className: cls16("ds-tooltip", className),
        "data-variant": variant,
        "data-side": (_a = position == null ? void 0 : position.side) != null ? _a : side,
        "data-align": align,
        "data-state": open ? "open" : "closed",
        "data-positioned": position ? "true" : "false",
        style: {
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
  return /* @__PURE__ */ jsxs35(Fragment3, { children: [
    trigger,
    bubble
  ] });
});
Tooltip.displayName = "Tooltip";

// src/components/molecules/PageHeader/index.tsx
import React33, { useEffect as useEffect12, useLayoutEffect as useLayoutEffect5, useRef as useRef14, useState as useState17 } from "react";

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
import { jsx as jsx42, jsxs as jsxs36 } from "react/jsx-runtime";
function cls17(...parts) {
  return parts.filter(Boolean).join(" ");
}
function useMatchMedia(query, onBeforeChange) {
  const beforeRef = useRef14(onBeforeChange);
  beforeRef.current = onBeforeChange;
  const get = () => typeof window !== "undefined" && typeof window.matchMedia === "function" ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState17(false);
  useEffect12(() => {
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
var MoreIcon = /* @__PURE__ */ jsxs36("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: [
  /* @__PURE__ */ jsx42("circle", { cx: "3.5", cy: "8", r: "1.4", fill: "currentColor" }),
  /* @__PURE__ */ jsx42("circle", { cx: "8", cy: "8", r: "1.4", fill: "currentColor" }),
  /* @__PURE__ */ jsx42("circle", { cx: "12.5", cy: "8", r: "1.4", fill: "currentColor" })
] });
var PageHeader = React33.forwardRef(function PageHeader2({
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
  const actionsRef = useRef14(null);
  const moreRef = useRef14(null);
  const pendingFocus = useRef14(null);
  const compact = useMatchMedia(PAGE_HEADER_COMPACT_QUERY, (next) => {
    var _a;
    if (typeof document === "undefined")
      return;
    const active = document.activeElement;
    if (!active || !((_a = actionsRef.current) == null ? void 0 : _a.contains(active)))
      return;
    if (next && active.closest(".ds-page-header__secondary"))
      pendingFocus.current = "more";
    else if (!next && active === moreRef.current)
      pendingFocus.current = "inline";
  });
  const [menuOpen, setMenuOpen] = useState17(false);
  useLayoutEffect5(() => {
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
          children: /* @__PURE__ */ jsxs36("span", { className: "ds-dropdown-menu__item-inner", children: [
            iconNode,
            action.label
          ] })
        },
        key
      );
    }
    return /* @__PURE__ */ jsxs36(
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
  return /* @__PURE__ */ jsxs36(
    "div",
    {
      ref,
      className: cls17("ds-page-header", className),
      "data-has-tabs": tabs ? "true" : void 0,
      "data-compact": compact ? "true" : void 0,
      ...rest,
      children: [
        breadcrumb ? /* @__PURE__ */ jsx42("div", { className: "ds-page-header__breadcrumb", children: breadcrumb }) : null,
        /* @__PURE__ */ jsxs36("div", { className: "ds-page-header__main", children: [
          /* @__PURE__ */ jsxs36("div", { className: "ds-page-header__heading", children: [
            /* @__PURE__ */ jsxs36("div", { className: "ds-page-header__title-row", children: [
              /* @__PURE__ */ jsx42(Heading, { className: "ds-page-header__title", children: title }),
              status ? /* @__PURE__ */ jsx42("span", { className: "ds-page-header__status", children: status }) : null
            ] }),
            description ? /* @__PURE__ */ jsx42("p", { className: "ds-page-header__description", children: description }) : null,
            meta ? /* @__PURE__ */ jsx42("div", { className: "ds-page-header__meta", children: meta }) : null
          ] }),
          hasActions ? /* @__PURE__ */ jsxs36("div", { ref: actionsRef, className: "ds-page-header__actions", children: [
            inline.map(renderInline),
            overflow.length > 0 ? /* @__PURE__ */ jsxs36(DropdownMenu, { open: menuOpen, onOpenChange: setMenuOpen, placement: "bottom-end", children: [
              /* @__PURE__ */ jsxs36(DropdownMenuTrigger, { ref: moreRef, className: cls17(PAGE_HEADER_MORE_TRIGGER_CLASS, "ds-page-header__more"), children: [
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

// src/components/molecules/FilterBar/index.tsx
import React34, { useCallback as useCallback15, useEffect as useEffect13, useId as useId17, useLayoutEffect as useLayoutEffect6, useRef as useRef15, useState as useState18 } from "react";

// src/components/molecules/FilterBar/FilterBar.config.ts
var FILTER_BAR_DEFAULTS = {
  searchable: true,
  searchPlaceholder: "Search\u2026",
  searchDebounceMs: 250,
  maxInlineFilters: 3,
  moreFilters: true,
  showLabels: false
};
var FILTER_BAR_COLLAPSE_QUERY = "(max-width: 768px)";
var FILTER_BAR_LABELS = {
  group: "Filters",
  search: "Search",
  clearAll: "Clear all",
  moreFilters: "More filters",
  filters: "Filters",
  activeInOverflow: (count) => count > 0 ? `, ${count} active` : "",
  activeFilters: "Active filters",
  removeFilter: (filterLabel, optionLabel) => `Remove filter ${filterLabel}: ${optionLabel}`,
  resultCount: (count) => count === 1 ? "1 result" : `${count} results`,
  done: "Done"
};

// src/components/molecules/FilterBar/FilterBar.utils.ts
function toValueList(value) {
  if (Array.isArray(value))
    return value.filter((v) => v !== "");
  return value ? [value] : [];
}
function isFilterActive(value) {
  return toValueList(value).length > 0;
}
function countActiveFilters(filters, value) {
  return filters.reduce((n, f) => n + (isFilterActive(value.filters[f.id]) ? 1 : 0), 0);
}
function hasActiveFilterValue(value) {
  var _a, _b;
  if (!value)
    return false;
  if (((_a = value.search) != null ? _a : "").trim() !== "")
    return true;
  return Object.values((_b = value.filters) != null ? _b : {}).some(isFilterActive);
}
function getActiveChips(filters, value) {
  return filters.flatMap(
    (f) => toValueList(value.filters[f.id]).map((v) => {
      var _a, _b;
      return {
        filterId: f.id,
        filterLabel: f.label,
        value: v,
        optionLabel: (_b = (_a = f.options.find((o) => o.value === v)) == null ? void 0 : _a.label) != null ? _b : v
      };
    })
  );
}
function setFilterValue(filters, id, next) {
  const out = { ...filters };
  if (isFilterActive(next))
    out[id] = next;
  else
    delete out[id];
  return out;
}
function removeFilterValue(filters, filter, value) {
  if (filter.type === "multi") {
    return setFilterValue(filters, filter.id, toValueList(filters[filter.id]).filter((v) => v !== value));
  }
  return setFilterValue(filters, filter.id, "");
}

// src/components/molecules/FilterBar/index.tsx
import { jsx as jsx43, jsxs as jsxs37 } from "react/jsx-runtime";
function cls18(...parts) {
  return parts.filter(Boolean).join(" ");
}
function useMediaQuery(query) {
  const [matches, setMatches] = useState18(false);
  useEffect13(() => {
    var _a;
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return;
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
  }, [query]);
  return matches;
}
function FilterIcon() {
  return /* @__PURE__ */ jsx43("svg", { className: "ds-filter-bar__more-icon", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx43("path", { d: "M3 5h14M6 10h8M8.5 15h3", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) });
}
var FilterBar = React34.forwardRef(function FilterBar2({
  value,
  onChange,
  filters = [],
  searchable = FILTER_BAR_DEFAULTS.searchable,
  searchPlaceholder = FILTER_BAR_DEFAULTS.searchPlaceholder,
  searchDebounceMs = FILTER_BAR_DEFAULTS.searchDebounceMs,
  resultCount,
  extra,
  maxInlineFilters = FILTER_BAR_DEFAULTS.maxInlineFilters,
  moreFilters = FILTER_BAR_DEFAULTS.moreFilters,
  showLabels = FILTER_BAR_DEFAULTS.showLabels,
  labels: labelsProp,
  className,
  ...rest
}, ref) {
  var _a, _b;
  const labels = { ...FILTER_BAR_LABELS, ...labelsProp };
  const base = useId17().replace(/:/g, "");
  const searchId = `ds-filter-bar-search-${base}`;
  const rootRef = useRef15(null);
  const chipsRef = useRef15(null);
  const narrow = useMediaQuery(FILTER_BAR_COLLAPSE_QUERY);
  const [moreOpen, setMoreOpen] = useState18(false);
  const valueRef = useRef15(value);
  valueRef.current = value;
  const onChangeRef = useRef15(onChange);
  onChangeRef.current = onChange;
  const [draft, setDraft] = useState18((_a = value.search) != null ? _a : "");
  const lastCommitted = useRef15((_b = value.search) != null ? _b : "");
  const timerRef = useRef15(null);
  const clearTimer = useCallback15(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  useEffect13(() => clearTimer, [clearTimer]);
  useEffect13(() => {
    var _a2;
    const external = (_a2 = value.search) != null ? _a2 : "";
    if (external !== lastCommitted.current) {
      lastCommitted.current = external;
      clearTimer();
      setDraft(external);
    }
  }, [value.search, clearTimer]);
  const commitSearch = useCallback15(
    (text) => {
      var _a2;
      clearTimer();
      lastCommitted.current = text;
      if (text === ((_a2 = valueRef.current.search) != null ? _a2 : ""))
        return;
      onChangeRef.current({ ...valueRef.current, search: text });
    },
    [clearTimer]
  );
  const handleDraft = (text) => {
    setDraft(text);
    clearTimer();
    if (text === "" || searchDebounceMs <= 0) {
      commitSearch(text);
      return;
    }
    timerRef.current = setTimeout(() => commitSearch(text), searchDebounceMs);
  };
  const setFilter = (id, next) => {
    var _a2;
    const current = valueRef.current;
    onChangeRef.current({ ...current, filters: setFilterValue((_a2 = current.filters) != null ? _a2 : {}, id, next) });
  };
  const chips = getActiveChips(filters, value);
  const anyActive = hasActiveFilterValue({ ...value, search: draft });
  const [pendingChipFocus, setPendingChipFocus] = useState18(null);
  useLayoutEffect6(() => {
    var _a2, _b2, _c;
    if (pendingChipFocus === null)
      return;
    const buttons = (_a2 = chipsRef.current) == null ? void 0 : _a2.querySelectorAll(".ds-badge__dismiss");
    const target = (_c = (_b2 = buttons && buttons.length > 0 ? buttons[Math.min(pendingChipFocus, buttons.length - 1)] : null) != null ? _b2 : document.getElementById(searchId)) != null ? _c : rootRef.current;
    target == null ? void 0 : target.focus();
    setPendingChipFocus(null);
  }, [pendingChipFocus, searchId]);
  const dismissChip = (index) => {
    var _a2;
    const chip = chips[index];
    const filter = filters.find((f) => f.id === chip.filterId);
    if (!filter)
      return;
    const current = valueRef.current;
    onChangeRef.current({ ...current, filters: removeFilterValue((_a2 = current.filters) != null ? _a2 : {}, filter, chip.value) });
    setPendingChipFocus(index);
  };
  const clearAll = () => {
    clearTimer();
    setDraft("");
    lastCommitted.current = "";
    onChangeRef.current({ ...valueRef.current, search: searchable ? "" : valueRef.current.search, filters: {} });
    setPendingChipFocus(0);
  };
  const setRootRef = (el) => {
    rootRef.current = el;
    if (typeof ref === "function")
      ref(el);
    else if (ref)
      ref.current = el;
  };
  const triggerRef = useRef15(null);
  const lastFocus = useRef15(null);
  const restoreFilterId = useRef15(null);
  const trackFocus = (e) => {
    var _a2;
    const target = e.target;
    if (triggerRef.current && triggerRef.current.contains(target)) {
      lastFocus.current = { kind: "trigger" };
      return;
    }
    const id = (_a2 = target.closest("[data-filter-id]")) == null ? void 0 : _a2.dataset.filterId;
    lastFocus.current = id ? { kind: "filter", id } : null;
    if (id)
      restoreFilterId.current = null;
  };
  const trackBlur = (e) => {
    var _a2;
    const next = e.relatedTarget;
    if (next && !((_a2 = rootRef.current) == null ? void 0 : _a2.contains(next)))
      lastFocus.current = null;
  };
  const prevNarrow = useRef15(narrow);
  useLayoutEffect6(() => {
    var _a2, _b2, _c;
    if (prevNarrow.current === narrow)
      return;
    prevNarrow.current = narrow;
    const root = rootRef.current;
    const active = document.activeElement;
    const focusLost = !active || active === document.body || !(root == null ? void 0 : root.contains(active));
    const last = lastFocus.current;
    if (narrow && (last == null ? void 0 : last.kind) === "filter" && focusLost) {
      restoreFilterId.current = last.id;
      (_a2 = triggerRef.current) == null ? void 0 : _a2.focus();
    } else if (!narrow && (last == null ? void 0 : last.kind) === "trigger" && (focusLost || active === triggerRef.current)) {
      const id = restoreFilterId.current;
      const scopes = Array.from((_b2 = root == null ? void 0 : root.querySelectorAll("[data-filter-id]")) != null ? _b2 : []);
      const scope = (_c = scopes.find((el) => el.dataset.filterId === id)) != null ? _c : scopes[0];
      const control = scope == null ? void 0 : scope.querySelector("select, button, input");
      if (control) {
        control.focus();
        restoreFilterId.current = null;
      }
    }
  }, [narrow]);
  const maxInline = Math.max(0, Math.floor(maxInlineFilters));
  const inlineFilters = !moreFilters ? filters : narrow ? [] : filters.slice(0, maxInline);
  const overflowFilters = !moreFilters ? [] : narrow ? filters : filters.slice(maxInline);
  const overflowActive = countActiveFilters(overflowFilters, value);
  const triggerText = inlineFilters.length === 0 ? labels.filters : labels.moreFilters;
  const renderSelect = (f, visibleLabel) => {
    var _a2, _b2;
    return /* @__PURE__ */ jsx43(
      Select_default,
      {
        id: `ds-filter-bar-${base}-${f.id}`,
        label: visibleLabel ? f.label : void 0,
        "aria-label": visibleLabel ? void 0 : f.label,
        size: "md",
        fullWidth: true,
        animatedChevron: false,
        placeholder: (_a2 = f.placeholder) != null ? _a2 : `${f.label}: All`,
        allowPlaceholderSelection: true,
        options: f.options,
        value: (_b2 = toValueList(value.filters[f.id])[0]) != null ? _b2 : "",
        onValueChange: (v) => setFilter(f.id, v)
      }
    );
  };
  const renderInline = (f) => {
    var _a2;
    return /* @__PURE__ */ jsx43("div", { className: "ds-filter-bar__control", "data-type": f.type, "data-filter-id": f.id, children: f.type === "multi" ? /* @__PURE__ */ jsx43(
      Combobox_default,
      {
        multiple: true,
        size: "md",
        label: f.label,
        placeholder: (_a2 = f.placeholder) != null ? _a2 : `${f.label}: All`,
        searchable: f.searchable,
        options: f.options,
        value: toValueList(value.filters[f.id]),
        onValueChange: (v) => setFilter(f.id, Array.isArray(v) ? v : [v])
      }
    ) : renderSelect(f, showLabels) }, f.id);
  };
  const renderOverflow = (f) => f.type === "multi" ? /* @__PURE__ */ jsxs37("fieldset", { className: "ds-filter-bar__fieldset", children: [
    /* @__PURE__ */ jsx43("legend", { className: "ds-filter-bar__legend", children: f.label }),
    /* @__PURE__ */ jsx43("div", { className: "ds-filter-bar__checks", children: f.options.map((o) => {
      const selected = toValueList(value.filters[f.id]);
      const checked = selected.includes(o.value);
      return /* @__PURE__ */ jsx43(
        Checkbox_default,
        {
          id: `ds-filter-bar-${base}-${f.id}-${o.value}`,
          name: `ds-filter-bar-${base}-${f.id}`,
          value: o.value,
          label: o.label,
          checked,
          disabled: o.disabled,
          onChange: () => setFilter(f.id, checked ? selected.filter((v) => v !== o.value) : [...selected, o.value])
        },
        o.value
      );
    }) })
  ] }, f.id) : /* @__PURE__ */ jsx43("div", { className: "ds-filter-bar__panel-field", children: renderSelect(f, true) }, f.id);
  return /* @__PURE__ */ jsxs37(
    "div",
    {
      ref: setRootRef,
      role: "group",
      "aria-label": labels.group,
      tabIndex: -1,
      className: cls18("ds-filter-bar", className),
      "data-narrow": narrow ? "true" : "false",
      "data-show-labels": showLabels ? "true" : "false",
      onFocus: trackFocus,
      onBlur: trackBlur,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs37("div", { className: "ds-filter-bar__row", children: [
          searchable ? /* @__PURE__ */ jsx43("div", { className: "ds-filter-bar__search", children: /* @__PURE__ */ jsx43(
            TextInputSearch_default,
            {
              id: searchId,
              ariaLabel: labels.search,
              placeholder: searchPlaceholder,
              value: draft,
              onChange: handleDraft,
              onSearch: (text) => commitSearch(text),
              showClearButton: true,
              size: "md",
              fullWidth: true
            }
          ) }) : null,
          inlineFilters.length > 0 || overflowFilters.length > 0 ? /* @__PURE__ */ jsxs37("div", { className: "ds-filter-bar__filters", children: [
            inlineFilters.map(renderInline),
            overflowFilters.length > 0 ? /* @__PURE__ */ jsxs37(Popover, { open: moreOpen, onOpenChange: setMoreOpen, placement: "bottom-end", children: [
              /* @__PURE__ */ jsxs37(PopoverTrigger, { ref: triggerRef, className: "ds-filter-bar__more", "data-active": overflowActive > 0 ? "true" : void 0, children: [
                /* @__PURE__ */ jsx43(FilterIcon, {}),
                /* @__PURE__ */ jsx43("span", { children: triggerText }),
                overflowActive > 0 ? /* @__PURE__ */ jsx43("span", { className: "ds-filter-bar__more-count", "aria-hidden": "true", children: overflowActive }) : null,
                /* @__PURE__ */ jsx43("span", { className: "visually-hidden", children: labels.activeInOverflow(overflowActive) })
              ] }),
              /* @__PURE__ */ jsxs37(PopoverContent, { showPointer: false, className: "ds-filter-bar__panel", children: [
                /* @__PURE__ */ jsx43("div", { className: "ds-filter-bar__panel-body", children: overflowFilters.map(renderOverflow) }),
                /* @__PURE__ */ jsx43("div", { className: "ds-filter-bar__panel-footer", children: /* @__PURE__ */ jsx43(Button_default, { type: "button", variant: "outlineSecondary", size: "md", onClick: () => setMoreOpen(false), children: labels.done }) })
              ] })
            ] }) : null
          ] }) : null,
          extra ? /* @__PURE__ */ jsx43("div", { className: "ds-filter-bar__extra", children: extra }) : null
        ] }),
        chips.length > 0 || anyActive ? /* @__PURE__ */ jsxs37("div", { className: "ds-filter-bar__summary", children: [
          chips.length > 0 ? /* @__PURE__ */ jsx43("ul", { ref: chipsRef, className: "ds-filter-bar__chips", "aria-label": labels.activeFilters, children: chips.map((chip, i) => /* @__PURE__ */ jsx43("li", { className: "ds-filter-bar__chip", children: /* @__PURE__ */ jsxs37(
            Badge_default,
            {
              shape: "pill",
              size: "md",
              variant: "neutral",
              tone: "soft",
              onDismiss: () => dismissChip(i),
              dismissLabel: labels.removeFilter(chip.filterLabel, chip.optionLabel),
              children: [
                chip.filterLabel,
                ": ",
                chip.optionLabel
              ]
            }
          ) }, `${chip.filterId}-${chip.value}`)) }) : null,
          anyActive ? /* @__PURE__ */ jsx43(Button_default, { type: "button", variant: "ghost", size: "md", className: "ds-filter-bar__clear", onClick: clearAll, children: labels.clearAll }) : null
        ] }) : null,
        /* @__PURE__ */ jsx43("p", { className: "ds-filter-bar__count", "aria-live": "polite", "aria-atomic": "true", children: typeof resultCount === "number" ? labels.resultCount(resultCount) : "" })
      ]
    }
  );
});
FilterBar.displayName = "FilterBar";
var FilterBar_default = FilterBar;

// src/components/molecules/DataTable/index.tsx
import React35, { useCallback as useCallback16, useEffect as useEffect14, useId as useId18, useLayoutEffect as useLayoutEffect7, useMemo as useMemo13, useRef as useRef16, useState as useState19 } from "react";

// src/components/molecules/DataTable/DataTable.config.ts
var DATA_TABLE_DEFAULTS = {
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50],
  loadingRows: 5,
  hideCaption: false,
  bulkActionVariant: "outlineSecondary",
  exportFilename: "export"
};
var DATA_TABLE_LABELS = {
  selectedCount: (count) => `${count} selected`,
  selectionStatus: (count) => count === 0 ? "Selection cleared" : count === 1 ? "1 row selected" : `${count} rows selected`,
  clearSelection: "Clear",
  clearSelectionAria: "Clear selection",
  bulkActions: "Bulk actions",
  bulkHint: "Select rows to apply bulk actions",
  exportCsv: "Export CSV",
  columns: "Columns",
  columnsLegend: "Show columns",
  loading: "Loading\u2026",
  emptyTitle: "No data yet",
  emptyDescription: "Records will appear here once they are created.",
  noResultsTitle: "No matching results",
  noResultsDescription: "Try a different search or remove some filters.",
  clearFilters: "Clear filters",
  errorTitle: "Couldn't load data",
  errorDescription: "Something went wrong while loading this table. Try again.",
  pagination: "Table pagination"
};

// src/components/molecules/DataTable/DataTable.utils.ts
function resolveRowKey(row, rowKey) {
  var _a;
  if (typeof rowKey === "function")
    return rowKey(row);
  return String((_a = row[rowKey]) != null ? _a : "");
}
function cellText(value) {
  if (value == null)
    return "";
  if (Array.isArray(value))
    return value.map(cellText).join(" ");
  if (value instanceof Date)
    return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  return String(value);
}
function defaultRowFilter(row, value, searchKeys) {
  var _a, _b;
  const q = ((_a = value.search) != null ? _a : "").trim().toLowerCase();
  if (q && !searchKeys.some((k) => cellText(row[k]).toLowerCase().includes(q)))
    return false;
  for (const [id, v] of Object.entries((_b = value.filters) != null ? _b : {})) {
    const wanted = toValueList(v);
    if (wanted.length === 0)
      continue;
    const cell = row[id];
    const have = Array.isArray(cell) ? cell.map((c) => String(c)) : [cell == null ? "" : String(cell)];
    if (!wanted.some((w) => have.includes(w)))
      return false;
  }
  return true;
}
function isNumericLike(value) {
  if (typeof value === "number")
    return Number.isFinite(value);
  if (typeof value !== "string")
    return false;
  const trimmed = value.trim();
  if (!trimmed)
    return false;
  return Number.isFinite(Number(trimmed));
}
function toNumber(value) {
  return typeof value === "number" ? value : Number(String(value).trim());
}
function compareValues(a, b, sortType = "auto") {
  if (a == null && b == null)
    return 0;
  if (a == null)
    return 1;
  if (b == null)
    return -1;
  const numeric = sortType === "number" || sortType === "auto" && isNumericLike(a) && isNumericLike(b);
  if (numeric)
    return toNumber(a) - toNumber(b);
  return String(a).localeCompare(String(b));
}
function nextSortDirection(prevKey, prevDir, key) {
  if (prevKey !== key)
    return "asc";
  if (prevDir === "asc")
    return "desc";
  if (prevDir === "desc")
    return null;
  return "asc";
}
function sortRows(rows, column, direction) {
  var _a;
  if (!column || !column.sortable || !direction)
    return rows;
  const sorter = (_a = column.sorter) != null ? _a : (a, b) => {
    var _a2;
    return compareValues(a[column.key], b[column.key], (_a2 = column.sortType) != null ? _a2 : "auto");
  };
  return [...rows].sort((a, b) => {
    const v = sorter(a, b, column.key);
    return direction === "asc" ? v : -v;
  });
}
function mergePageSelection(prev, keys, pageKeys) {
  const page = new Set(pageKeys);
  const next = new Set(keys.filter((k) => page.has(k)));
  const kept = prev.filter((k) => !page.has(k));
  return [...kept, ...pageKeys.filter((k) => next.has(k))];
}
var FORMULA_TRIGGER = /^[=+\-@\t\r\uFF1D\uFF0B\uFF0D\uFF20]/;
function stringifyCsvValue(value) {
  var _a;
  if (value == null)
    return "";
  if (value instanceof Date)
    return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  if (Array.isArray(value))
    return value.map(stringifyCsvValue).join("; ");
  if (typeof value === "object") {
    try {
      return (_a = JSON.stringify(value)) != null ? _a : "";
    } catch (e) {
      return "";
    }
  }
  return String(value);
}
var SEPARATED_TRIGGER = /([;\uFF1B])(?=[\s"]*[=+\-@\t\r\uFF1D\uFF0B\uFF0D\uFF20])/g;
function hasFormulaTrigger(text) {
  return FORMULA_TRIGGER.test(text);
}
function neutralizeSeparatedTriggers(text) {
  return text.replace(SEPARATED_TRIGGER, "$1'");
}
function escapeCsvCell(value) {
  let text = stringifyCsvValue(value);
  const isNumber = typeof value === "number" || typeof value === "bigint";
  if (!isNumber) {
    if (hasFormulaTrigger(text))
      text = `'${text}`;
    text = neutralizeSeparatedTriggers(text);
  }
  if (/[",;\r\n]/.test(text))
    text = `"${text.replace(/"/g, '""')}"`;
  return text;
}
function csvHeaderText(column) {
  if (typeof column.csvHeader === "string")
    return column.csvHeader;
  const header = column.header;
  if (typeof header === "string" || typeof header === "number")
    return String(header);
  return column.key;
}
function toCsv(columns, rows) {
  const header = columns.map((c) => escapeCsvCell(csvHeaderText(c))).join(",");
  const lines = rows.map(
    (row) => columns.map((c) => escapeCsvCell(c.csvValue ? c.csvValue(row) : row[c.key])).join(",")
  );
  return [header, ...lines].join("\r\n");
}
function sanitizeCsvFilename(name, fallback = "export") {
  const cleaned = (name != null ? name : "").replace(/[\u202A-\u202E\u2066-\u2069]/g, "").replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_").trim();
  const base = cleaned.replace(/^\.+/, "") || fallback;
  return /\.csv$/i.test(base) ? base : `${base}.csv`;
}
function downloadCsv(csv, filename) {
  if (typeof document === "undefined" || typeof URL === "undefined" || typeof URL.createObjectURL !== "function") {
    return false;
  }
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  return true;
}
function findMissingTableMarkup(host, { selectable, hasRows }) {
  const missing = [];
  if (!host.querySelector(".table-wrapper"))
    missing.push(".table-wrapper");
  if (!host.querySelector(".table-scroll-wrapper"))
    missing.push(".table-scroll-wrapper");
  if (hasRows) {
    if (!host.querySelector("table thead th"))
      missing.push("table thead th");
    if (selectable && !host.querySelector('thead input[type="checkbox"]'))
      missing.push('thead input[type="checkbox"]');
  }
  return missing;
}

// src/components/molecules/DataTable/index.tsx
import { Fragment as Fragment4, jsx as jsx44, jsxs as jsxs38 } from "react/jsx-runtime";
function cls19(...parts) {
  return parts.filter(Boolean).join(" ");
}
var EMPTY_FILTER_VALUE = { search: "", filters: {} };
var SELECTION_NOTE_MS = 1500;
function isDevelopment() {
  var _a;
  return typeof process !== "undefined" && ((_a = process.env) == null ? void 0 : _a.NODE_ENV) !== "production";
}
var NO_SORT = { key: "", direction: null };
function ColumnsIcon() {
  return /* @__PURE__ */ jsxs38("svg", { className: "ds-data-table__tool-icon", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ jsx44("rect", { x: "3", y: "4", width: "14", height: "12", rx: "1.5", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ jsx44("path", { d: "M8 4v12M12 4v12", stroke: "currentColor", strokeWidth: "1.6" })
  ] });
}
function initialVisibility(columns) {
  const out = {};
  for (const c of columns)
    out[c.key] = !c.hidden;
  return out;
}
function DataTableInner({
  caption,
  hideCaption = DATA_TABLE_DEFAULTS.hideCaption,
  columns,
  data,
  rowKey,
  loading = false,
  error,
  emptyState,
  noResultsState,
  filterBar,
  filterFn,
  pagination,
  defaultPageSize = DATA_TABLE_DEFAULTS.defaultPageSize,
  pageSizeOptions = DATA_TABLE_DEFAULTS.pageSizeOptions,
  paginationAriaLabel,
  selectable = false,
  preserveSelectionOnFilter = false,
  selectedRowKeys,
  onSelectionChange,
  bulkActions,
  columnVisibility,
  onColumnVisibilityChange,
  exportCsv,
  toolbarRight,
  onSortChange,
  className,
  tableClassName,
  labels: labelsProp,
  loadingRows = DATA_TABLE_DEFAULTS.loadingRows,
  expandable,
  ...tableRest
}, ref) {
  var _a, _b, _c, _d, _e, _f, _g;
  const labels = { ...DATA_TABLE_LABELS, ...labelsProp };
  const base = useId18().replace(/:/g, "");
  const captionId = `ds-data-table-caption-${base}`;
  const tableHostRef = useRef16(null);
  const serverMode = typeof pagination === "object" && pagination !== null;
  const paged = pagination !== false;
  const getKey = useCallback16((row) => resolveRowKey(row, rowKey), [rowKey]);
  const [innerFilter, setInnerFilter] = useState19((_a = filterBar == null ? void 0 : filterBar.defaultValue) != null ? _a : EMPTY_FILTER_VALUE);
  const filterValue = (_b = filterBar == null ? void 0 : filterBar.value) != null ? _b : innerFilter;
  const filtersActive = Boolean(filterBar) && hasActiveFilterValue(filterValue);
  const [clientPage, setClientPage] = useState19(1);
  const [clientPageSize, setClientPageSize] = useState19(defaultPageSize);
  const handleFilterChange = (next) => {
    var _a2;
    if ((filterBar == null ? void 0 : filterBar.value) === void 0)
      setInnerFilter(next);
    if (!preserveSelectionOnFilter && selection.length > 0) {
      commitSelection([]);
      raiseSelectionNote(labels.selectionStatus(0));
    }
    (_a2 = filterBar == null ? void 0 : filterBar.onChange) == null ? void 0 : _a2.call(filterBar, next);
    setClientPage(1);
  };
  const visibilityControlled = typeof columnVisibility === "object" && columnVisibility !== null;
  const [innerVisibility, setInnerVisibility] = useState19(() => initialVisibility(columns));
  const visibility = useMemo13(() => {
    const seeded = initialVisibility(columns);
    const source = visibilityControlled ? columnVisibility : innerVisibility;
    for (const key of Object.keys(seeded))
      if (key in source)
        seeded[key] = Boolean(source[key]);
    return seeded;
  }, [columns, columnVisibility, innerVisibility, visibilityControlled]);
  const isVisible = (c) => c.hideable === false ? true : visibility[c.key] !== false;
  const tableColumns = useMemo13(
    () => columns.map((c) => ({ ...c, hidden: c.hideable === false ? false : visibility[c.key] === false })),
    [columns, visibility]
  );
  const visibleColumns = useMemo13(() => tableColumns.filter((c) => !c.hidden), [tableColumns]);
  const setColumnVisible = (key, visible) => {
    const next = { ...visibility, [key]: visible };
    if (!visibilityControlled)
      setInnerVisibility(next);
    onColumnVisibilityChange == null ? void 0 : onColumnVisibilityChange(next);
  };
  const [sort, setSort] = useState19(NO_SORT);
  const sortRef = useRef16(sort);
  sortRef.current = sort;
  useEffect14(() => {
    if (error)
      setSort(NO_SORT);
  }, [error]);
  const headerOffset = (expandable ? 1 : 0) + (selectable ? 1 : 0);
  const handleHeaderActivation = (target) => {
    var _a2, _b2;
    const host = tableHostRef.current;
    if (!host || !(target instanceof Element))
      return;
    const th = target.closest("th");
    const thead = th == null ? void 0 : th.closest("thead");
    if (!th || !thead || thead.closest("table") !== host.querySelector("table"))
      return;
    const index = Array.prototype.indexOf.call((_b2 = (_a2 = th.parentElement) == null ? void 0 : _a2.children) != null ? _b2 : [], th) - headerOffset;
    const column = visibleColumns[index];
    if (!(column == null ? void 0 : column.sortable))
      return;
    const prev = sortRef.current;
    const next = { key: column.key, direction: nextSortDirection(prev.key, prev.direction, column.key) };
    sortRef.current = next;
    setSort(next);
    if (!serverMode)
      setClientPage(1);
    onSortChange == null ? void 0 : onSortChange(next);
  };
  const hasFilterBar = Boolean(filterBar);
  const filteredRows = useMemo13(() => {
    if (serverMode || !hasFilterBar)
      return data;
    const searchKeys = visibleColumns.map((c) => c.key);
    return data.filter((row) => filterFn ? filterFn(row, filterValue) : defaultRowFilter(row, filterValue, searchKeys));
  }, [serverMode, hasFilterBar, data, filterFn, filterValue, visibleColumns]);
  const sortColumn = visibleColumns.find((c) => c.key === sort.key);
  const orderedRows = useMemo13(
    () => serverMode ? filteredRows : sortRows(filteredRows, sortColumn, sort.direction),
    [serverMode, filteredRows, sortColumn, sort.direction]
  );
  const total = serverMode ? pagination.total : orderedRows.length;
  const pageSize = serverMode ? pagination.pageSize : clientPageSize;
  const pageCount = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  const page = serverMode ? pagination.page : Math.min(Math.max(1, clientPage), pageCount);
  useEffect14(() => {
    if (!serverMode && clientPage !== page)
      setClientPage(page);
  }, [serverMode, clientPage, page]);
  const pageRows = useMemo13(() => {
    if (serverMode || !paged)
      return orderedRows;
    const start = (page - 1) * pageSize;
    return orderedRows.slice(start, start + pageSize);
  }, [serverMode, paged, orderedRows, page, pageSize]);
  const [innerSelection, setInnerSelection] = useState19([]);
  const selection = selectedRowKeys != null ? selectedRowKeys : innerSelection;
  const [selectionNote, setSelectionNote] = useState19("");
  const noteSeen = useRef16(false);
  const noteConsumed = useRef16(false);
  const raiseSelectionNote = (text) => {
    noteSeen.current = false;
    noteConsumed.current = false;
    setSelectionNote(text);
  };
  let loadingLiveText = labels.loading;
  let liveSelectionNote = "";
  if (selectionNote) {
    if (loading) {
      if (!noteSeen.current)
        loadingLiveText = `${selectionNote}. ${labels.loading}`;
      noteSeen.current = true;
      noteConsumed.current = true;
    } else if (!noteConsumed.current) {
      liveSelectionNote = selectionNote;
      noteSeen.current = true;
    }
  }
  useEffect14(() => {
    if (!loading && noteConsumed.current && selectionNote)
      setSelectionNote("");
  }, [loading, selectionNote]);
  useEffect14(() => {
    if (!selectionNote)
      return;
    const t = setTimeout(() => setSelectionNote(""), SELECTION_NOTE_MS);
    return () => clearTimeout(t);
  }, [selectionNote]);
  const rowCache = useRef16(/* @__PURE__ */ new Map());
  for (const row of data)
    rowCache.current.set(getKey(row), row);
  if (rowCache.current.size > data.length + selection.length * 2 + 100) {
    const keep = /* @__PURE__ */ new Set([...selection, ...data.map(getKey)]);
    for (const k of Array.from(rowCache.current.keys()))
      if (!keep.has(k))
        rowCache.current.delete(k);
  }
  const commitSelection = (keys) => {
    if (keys.length > 0)
      setSelectionNote("");
    if (selectedRowKeys === void 0)
      setInnerSelection(keys);
    const rows = keys.map((k) => rowCache.current.get(k)).filter((r) => r !== void 0);
    onSelectionChange == null ? void 0 : onSelectionChange(keys, rows);
  };
  const pageKeys = pageRows.map(getKey);
  const handleTableSelection = (keys) => {
    commitSelection(mergePageSelection(selection, keys, pageKeys));
  };
  const clearSelection = () => {
    commitSelection([]);
  };
  const clearSelectionAndFocus = () => {
    clearSelection();
    requestAnimationFrame(() => {
      var _a2, _b2;
      (_b2 = (_a2 = tableHostRef.current) == null ? void 0 : _a2.querySelector('thead input[type="checkbox"]')) == null ? void 0 : _b2.focus();
    });
  };
  const selectedRows = selection.map((k) => rowCache.current.get(k)).filter((r) => r !== void 0);
  const tableOwnsScroll = Boolean((_c = tableRest.scroll) == null ? void 0 : _c.y);
  const markupWarned = useRef16(false);
  useLayoutEffect7(() => {
    var _a2;
    const host = tableHostRef.current;
    if (!host)
      return;
    const region = host.querySelector(".table-scroll-wrapper");
    if (region) {
      if (tableOwnsScroll) {
        region.setAttribute("role", "region");
        region.removeAttribute("aria-label");
        region.setAttribute("aria-labelledby", captionId);
        region.setAttribute("tabindex", "0");
        region.classList.add("ds-data-table__inner-scroll");
      } else {
        region.setAttribute("role", "presentation");
        region.removeAttribute("aria-label");
        region.removeAttribute("aria-labelledby");
        region.removeAttribute("tabindex");
        region.classList.remove("ds-data-table__inner-scroll");
      }
    }
    (_a2 = region == null ? void 0 : region.querySelector("table")) == null ? void 0 : _a2.setAttribute("aria-labelledby", captionId);
    const selectAll = host.querySelector('thead input[type="checkbox"]');
    if (selectAll) {
      const selected = new Set(selection);
      const onPage = pageKeys.filter((k) => selected.has(k)).length;
      const mixed = selection.length > 0 && pageKeys.length > 0 && onPage < pageKeys.length;
      selectAll.indeterminate = mixed;
      if (mixed)
        selectAll.setAttribute("data-indeterminate", "true");
      else
        selectAll.removeAttribute("data-indeterminate");
    }
    if (!markupWarned.current && isDevelopment()) {
      const missing = findMissingTableMarkup(host, { selectable, hasRows: !loading && pageRows.length > 0 });
      if (missing.length > 0) {
        markupWarned.current = true;
        console.warn(
          `[DataTable] Table markup changed \u2014 selectors not found: ${missing.join(", ")}. Caption naming, the scroll region, select-all indeterminate or the sort mirror may be broken.`
        );
      }
    }
  });
  const exportOptions = exportCsv === true ? {} : exportCsv && typeof exportCsv === "object" ? exportCsv : null;
  const handleExport = () => {
    var _a2;
    if (!exportOptions)
      return;
    const cols = visibleColumns.filter((c) => c.exportable !== false);
    const csv = toCsv(cols, orderedRows);
    const fallback = typeof caption === "string" && caption.trim() ? caption : DATA_TABLE_DEFAULTS.exportFilename;
    const filename = sanitizeCsvFilename((_a2 = exportOptions.filename) != null ? _a2 : fallback, DATA_TABLE_DEFAULTS.exportFilename);
    if (exportOptions.onExport)
      exportOptions.onExport(csv, filename);
    else
      downloadCsv(csv, filename);
  };
  const [columnsOpen, setColumnsOpen] = useState19(false);
  const columnMenu = columnVisibility ? /* @__PURE__ */ jsxs38(Popover, { open: columnsOpen, onOpenChange: setColumnsOpen, placement: "bottom-end", children: [
    /* @__PURE__ */ jsxs38(PopoverTrigger, { className: "ds-data-table__tool", children: [
      /* @__PURE__ */ jsx44(ColumnsIcon, {}),
      /* @__PURE__ */ jsx44("span", { children: labels.columns })
    ] }),
    /* @__PURE__ */ jsx44(PopoverContent, { showPointer: false, className: "ds-data-table__menu", children: /* @__PURE__ */ jsxs38("fieldset", { className: "ds-data-table__fieldset", children: [
      /* @__PURE__ */ jsx44("legend", { className: "ds-data-table__legend", children: labels.columnsLegend }),
      /* @__PURE__ */ jsx44("div", { className: "ds-data-table__checks", children: columns.map((c) => {
        const checked = isVisible(c);
        const locked = c.hideable === false || checked && visibleColumns.length <= 1;
        return /* @__PURE__ */ jsx44(
          Checkbox_default,
          {
            id: `ds-data-table-${base}-col-${c.key}`,
            name: `ds-data-table-${base}-columns`,
            value: c.key,
            label: c.header,
            checked,
            disabled: locked,
            onChange: () => setColumnVisible(c.key, !checked)
          },
          c.key
        );
      }) })
    ] }) })
  ] }, "columns") : null;
  const exportButton = exportOptions ? /* @__PURE__ */ jsx44(Button_default, { type: "button", variant: "outlineSecondary", size: "lg", onClick: handleExport, disabled: loading, children: (_d = exportOptions.label) != null ? _d : labels.exportCsv }, "export") : null;
  const toolItems = [filterBar == null ? void 0 : filterBar.extra, toolbarRight, columnMenu, exportButton].filter(Boolean);
  const tools = toolItems.length > 0 ? /* @__PURE__ */ jsx44(Fragment4, { children: toolItems.map((n, i) => /* @__PURE__ */ jsx44(React35.Fragment, { children: n }, i)) }) : void 0;
  const clearFilters = () => handleFilterChange({ ...filterValue, search: "", filters: {} });
  const emptyNode = filtersActive ? noResultsState != null ? noResultsState : /* @__PURE__ */ jsx44(
    EmptyState,
    {
      compact: true,
      title: labels.noResultsTitle,
      description: labels.noResultsDescription,
      action: /* @__PURE__ */ jsx44(Button_default, { type: "button", variant: "outlineSecondary", size: "md", onClick: clearFilters, children: labels.clearFilters })
    }
  ) : emptyState != null ? emptyState : /* @__PURE__ */ jsx44(EmptyState, { compact: true, title: labels.emptyTitle, description: labels.emptyDescription });
  const paginationLabel = paginationAriaLabel != null ? paginationAriaLabel : typeof caption === "string" && caption.trim() ? `${caption} pagination` : labels.pagination;
  const showPagination = paged && !error && total > 0;
  const lastResultCount = useRef16(void 0);
  if (!loading && !error)
    lastResultCount.current = total;
  const setRootRef = (el) => {
    if (typeof ref === "function")
      ref(el);
    else if (ref)
      ref.current = el;
  };
  const {
    extra: _filterExtra,
    value: _fv,
    onChange: _fc,
    defaultValue: _fd,
    resultCount: filterResultCount,
    ...filterBarRest
  } = filterBar != null ? filterBar : {};
  return /* @__PURE__ */ jsxs38(
    "div",
    {
      ref: setRootRef,
      className: cls19("ds-data-table", className),
      "data-loading": loading ? "true" : void 0,
      "data-error": error ? "true" : void 0,
      children: [
        /* @__PURE__ */ jsx44("div", { id: captionId, className: cls19("ds-data-table__caption", hideCaption && "visually-hidden"), children: caption }),
        filterBar ? /* @__PURE__ */ jsx44(
          FilterBar_default,
          {
            ...filterBarRest,
            value: filterValue,
            onChange: handleFilterChange,
            resultCount: filterResultCount != null ? filterResultCount : error ? void 0 : loading ? lastResultCount.current : total,
            extra: tools
          }
        ) : tools ? /* @__PURE__ */ jsx44("div", { className: "ds-data-table__toolbar", children: tools }) : null,
        selectable ? /* @__PURE__ */ jsx44("div", { className: "ds-data-table__bulk-slot", "data-active": selection.length > 0 ? "true" : "false", children: selection.length > 0 ? /* @__PURE__ */ jsxs38("div", { className: "ds-data-table__bulk", role: "group", "aria-label": labels.bulkActions, children: [
          /* @__PURE__ */ jsx44("span", { className: "ds-data-table__bulk-count", children: labels.selectedCount(selection.length) }),
          /* @__PURE__ */ jsx44("span", { className: "ds-data-table__bulk-sep", "aria-hidden": "true", children: "\xB7" }),
          /* @__PURE__ */ jsx44(
            Button_default,
            {
              type: "button",
              variant: "ghost",
              size: "lg",
              ariaLabel: labels.clearSelectionAria,
              onClick: clearSelectionAndFocus,
              children: labels.clearSelection
            }
          ),
          bulkActions && bulkActions.length > 0 ? /* @__PURE__ */ jsx44("div", { className: "ds-data-table__bulk-actions", children: bulkActions.map((action) => {
            var _a2;
            return /* @__PURE__ */ jsx44(
              Button_default,
              {
                type: "button",
                size: "lg",
                variant: (_a2 = action.variant) != null ? _a2 : DATA_TABLE_DEFAULTS.bulkActionVariant,
                disabled: action.disabled,
                onClick: () => action.onClick(selectedRows, { clearSelection }),
                children: action.label
              },
              action.label
            );
          }) }) : null
        ] }) : /* @__PURE__ */ jsx44("p", { className: "ds-data-table__bulk-hint", children: labels.bulkHint }) }) : null,
        /* @__PURE__ */ jsx44("p", { className: "visually-hidden", "aria-live": "polite", "aria-atomic": "true", children: loading ? loadingLiveText : selectable && selection.length > 0 ? labels.selectionStatus(selection.length) : liveSelectionNote }),
        error ? /* @__PURE__ */ jsx44("div", { className: "ds-data-table__state", children: /* @__PURE__ */ jsx44(
          ErrorState,
          {
            compact: true,
            title: (_e = error.title) != null ? _e : labels.errorTitle,
            description: (_f = error.description) != null ? _f : labels.errorDescription,
            onRetry: error.onRetry
          }
        ) }) : /* @__PURE__ */ jsx44(
          "div",
          {
            ref: tableHostRef,
            className: "ds-data-table__table",
            role: tableOwnsScroll ? void 0 : "region",
            "aria-labelledby": tableOwnsScroll ? void 0 : captionId,
            tabIndex: tableOwnsScroll ? void 0 : 0,
            "data-scroll-owner": tableOwnsScroll ? "table" : "self",
            onClick: (e) => handleHeaderActivation(e.target),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ")
                handleHeaderActivation(e.target);
            },
            children: /* @__PURE__ */ jsx44(
              Table_default,
              {
                ...tableRest,
                expandable,
                className: tableClassName,
                columns: tableColumns,
                data: pageRows,
                rowKey: (row) => getKey(row),
                selectionMode: selectable ? "multiple" : "none",
                selectedRowKeys: selection,
                onSelectionChange: (keys) => handleTableSelection(keys),
                searchable: false,
                pagination: false,
                loading,
                loadingVariant: "skeleton",
                loadingRows,
                emptyComponent: /* @__PURE__ */ jsx44("div", { className: "ds-data-table__state", children: emptyNode })
              }
            )
          }
        ),
        showPagination ? /* @__PURE__ */ jsx44(
          Pagination_default,
          {
            className: "ds-data-table__pagination",
            ariaLabel: paginationLabel,
            page,
            pageSize,
            totalItems: total,
            showTotal: true,
            disabled: loading,
            onPageChange: (next) => {
              if (serverMode)
                pagination.onPageChange(next);
              else
                setClientPage(next);
            },
            pageSizeOptions: serverMode ? (_g = pagination.pageSizeOptions) != null ? _g : pageSizeOptions : pageSizeOptions,
            onPageSizeChange: serverMode ? pagination.onPageSizeChange : (n) => {
              setClientPageSize(n);
              setClientPage(1);
            }
          }
        ) : null
      ]
    }
  );
}
var DataTable = React35.forwardRef(DataTableInner);
DataTable.displayName = "DataTable";
var DataTable_default = DataTable;

// src/components/molecules/SegmentedControl/index.tsx
import React36, { useCallback as useCallback17, useEffect as useEffect15, useLayoutEffect as useLayoutEffect8, useRef as useRef17, useState as useState20 } from "react";

// src/components/molecules/SegmentedControl/SegmentedControl.config.ts
var SEGMENTED_CONTROL_DEFAULTS = {
  size: "md",
  fullWidth: false
};
var SEGMENTED_CONTROL_SIZES = ["sm", "md"];

// src/components/molecules/SegmentedControl/index.tsx
import { jsx as jsx45, jsxs as jsxs39 } from "react/jsx-runtime";
function isDev() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
function isTextLabel(label) {
  return typeof label === "string" && label.trim().length > 0 || typeof label === "number";
}
var useIsoLayoutEffect2 = typeof window !== "undefined" ? useLayoutEffect8 : useEffect15;
var SegmentedControl = React36.forwardRef(function SegmentedControl2({
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
  const [inner, setInner] = useState20(defaultValue);
  const selected = isControlled ? valueProp : inner;
  const rootRef = useRef17(null);
  const itemRefs = useRef17([]);
  const focusWithin = useRef17(false);
  const [box, setBox] = useState20(null);
  const setRootRef = useCallback17(
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
  const warned = useRef17(/* @__PURE__ */ new Set());
  useEffect15(() => {
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
  const measure = useCallback17(() => {
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
  useEffect15(() => {
    if (typeof ResizeObserver === "undefined" || !rootRef.current)
      return void 0;
    const ro = new ResizeObserver(() => measure());
    ro.observe(rootRef.current);
    itemRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [measure, options.length]);
  useEffect15(() => {
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
        /* @__PURE__ */ jsx45(
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
                opt.icon ? /* @__PURE__ */ jsx45("span", { className: "ds-segmented__icon", "aria-hidden": "true", children: opt.icon }) : null,
                opt.label !== null && opt.label !== void 0 && opt.label !== false ? /* @__PURE__ */ jsx45("span", { className: "ds-segmented__label", "aria-hidden": name && iconOnly ? "true" : void 0, children: opt.label }) : null
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
import React37, { useCallback as useCallback18, useEffect as useEffect16, useId as useId19, useLayoutEffect as useLayoutEffect9, useRef as useRef18, useState as useState21 } from "react";

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
import { Fragment as Fragment5, jsx as jsx46, jsxs as jsxs40 } from "react/jsx-runtime";
var useIsoLayoutEffect3 = typeof window !== "undefined" ? useLayoutEffect9 : useEffect16;
function isDev2() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
var Wizard = React37.forwardRef(function Wizard2({
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
  const [inner, setInner] = useState21(defaultActiveStep);
  const rawActive = isControlled ? activeStepProp : inner;
  const active = Math.min(Math.max(0, rawActive), lastIndex);
  const isReview = active === reviewIndex;
  const isLast = active === lastIndex;
  const [furthest, setFurthest] = useState21(active);
  const [error, setError] = useState21(null);
  const [validating, setValidating] = useState21(false);
  const [focusTick, setFocusTick] = useState21(0);
  const [internalLoading, setInternalLoading] = useState21(false);
  const loading = loadingProp !== void 0 ? loadingProp : internalLoading;
  const headingRef = useRef18(null);
  const footerRef = useRef18(null);
  const runId = useRef18(0);
  const pending = useRef18(false);
  const errorSeq = useRef18(0);
  const mounted = useRef18(false);
  const activeRef = useRef18(active);
  activeRef.current = active;
  useEffect16(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect16(() => {
    setFurthest((f) => active > f ? active : f);
  }, [active]);
  const prevActive = useRef18(active);
  useIsoLayoutEffect3(() => {
    var _a;
    if (prevActive.current === active)
      return;
    prevActive.current = active;
    (_a = headingRef.current) == null ? void 0 : _a.focus();
  }, [active]);
  useIsoLayoutEffect3(() => {
    var _a;
    if (focusTick > 0)
      (_a = headingRef.current) == null ? void 0 : _a.focus();
  }, [focusTick]);
  const prevLoading = useRef18(loading);
  useIsoLayoutEffect3(() => {
    var _a, _b;
    if (loading && !prevLoading.current && typeof document !== "undefined") {
      const ae = document.activeElement;
      if (!ae || ae === document.body || ((_a = footerRef.current) == null ? void 0 : _a.contains(ae)))
        (_b = headingRef.current) == null ? void 0 : _b.focus();
    }
    prevLoading.current = loading;
  }, [loading]);
  const goTo = useCallback18(
    (index) => {
      const next = Math.min(Math.max(0, index), lastIndex);
      setError(null);
      if (next === active)
        return;
      if (!isControlled)
        setInner(next);
      onStepChange == null ? void 0 : onStepChange(next);
    },
    [active, isControlled, lastIndex, onStepChange]
  );
  const fail = (index, message) => {
    errorSeq.current += 1;
    if (index !== active)
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
    const startedAt = active;
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
      if (isDev2()) {
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
    void guarded(active, active + 1, () => goTo(active + 1));
  };
  const handleBack = () => {
    if (loading || active === 0)
      return;
    runId.current += 1;
    goTo(active - 1);
  };
  const handleStepper = (index) => {
    if (loading || index === active)
      return;
    if (index < active || !linear) {
      runId.current += 1;
      goTo(index);
      return;
    }
    if (index > furthest)
      return;
    void guarded(active, index, () => goTo(index));
  };
  if (total === 0) {
    return /* @__PURE__ */ jsx46("div", { ref, className: ["ds-wizard", className].filter(Boolean).join(" "), ...rest });
  }
  const Heading = `h${headingLevel}`;
  const headingId = `${baseId}-heading`;
  const descId = `${baseId}-desc`;
  const current = isReview ? null : steps[active];
  const title = isReview ? reviewTitle : current == null ? void 0 : current.title;
  const description = isReview ? reviewDescription : current == null ? void 0 : current.description;
  const hasDescription = description !== void 0 && description !== null && description !== false;
  const showError = error !== null && error.index === active;
  const stepperDescription = (s) => {
    if (!s.optional)
      return s.description;
    return s.description ? /* @__PURE__ */ jsxs40(Fragment5, { children: [
      s.description,
      /* @__PURE__ */ jsxs40("span", { className: "ds-wizard__optional", children: [
        " \xB7 ",
        optionalLabel
      ] })
    ] }) : /* @__PURE__ */ jsx46("span", { className: "ds-wizard__optional", children: optionalLabel });
  };
  return /* @__PURE__ */ jsxs40(
    "div",
    {
      ref,
      className: ["ds-wizard", className].filter(Boolean).join(" "),
      "data-step": active,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs40(
          Stepper,
          {
            className: "ds-wizard__stepper",
            value: active,
            onValueChange: handleStepper,
            linear: false,
            ariaLabel: stepperAriaLabel,
            scrollable: total > 5,
            children: [
              steps.map((s, i) => /* @__PURE__ */ jsx46(
                StepperStep,
                {
                  label: s.title,
                  description: stepperDescription(s),
                  disabled: linear && i > furthest || loading
                },
                s.id
              )),
              showReview ? /* @__PURE__ */ jsx46(
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
                /* @__PURE__ */ jsx46("span", { className: "ds-wizard__counter", children: formatStepCounter(active + 1, total) }),
                /* @__PURE__ */ jsx46("span", { className: "ds-wizard__title", children: title })
              ] }),
              hasDescription ? /* @__PURE__ */ jsx46("p", { id: descId, className: "ds-wizard__description", children: description }) : null,
              showError ? /* @__PURE__ */ jsx46(Alert_default, { className: "ds-wizard__alert", variant: "danger", live: "assertive", title: validationTitle, children: error.message }, error.key) : null,
              steps.map((s, i) => /* @__PURE__ */ jsx46("div", { className: "ds-wizard__content", hidden: i !== active, "data-step-id": s.id, children: s.content }, s.id)),
              isReview ? /* @__PURE__ */ jsx46("ol", { className: "ds-wizard__review", children: steps.map((s, i) => /* @__PURE__ */ jsxs40("li", { className: "ds-wizard__review-item", children: [
                /* @__PURE__ */ jsxs40("div", { className: "ds-wizard__review-text", children: [
                  /* @__PURE__ */ jsxs40("span", { className: "ds-wizard__review-title", children: [
                    s.title,
                    s.optional ? /* @__PURE__ */ jsxs40("span", { className: "ds-wizard__optional", children: [
                      " \xB7 ",
                      optionalLabel
                    ] }) : null
                  ] }),
                  s.summary !== void 0 && s.summary !== null ? /* @__PURE__ */ jsx46("div", { className: "ds-wizard__review-summary", children: s.summary }) : null
                ] }),
                /* @__PURE__ */ jsxs40(Button_default, { variant: "link", size: "sm", onClick: () => goTo(i), disabled: loading, children: [
                  editLabel,
                  " ",
                  /* @__PURE__ */ jsx46("span", { className: "sr-only", children: s.title })
                ] })
              ] }, s.id)) }) : null
            ]
          }
        ),
        /* @__PURE__ */ jsxs40("div", { ref: footerRef, className: "ds-wizard__footer", children: [
          active > 0 ? /* @__PURE__ */ jsx46(Button_default, { variant: "outlineSecondary", onClick: handleBack, disabled: loading, "data-wizard-action": "back", children: backLabel }) : null,
          /* @__PURE__ */ jsx46("div", { className: "ds-wizard__footer-end", children: /* @__PURE__ */ jsx46(
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
        /* @__PURE__ */ jsx46("div", { className: "sr-only", role: "status", "aria-live": "polite", children: loading ? loadingLabel : "" })
      ]
    }
  );
});
Wizard.displayName = "Wizard";
var Wizard_default = Wizard;

// src/components/atoms/Kbd/index.tsx
import React38 from "react";

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
import { Fragment as Fragment6, jsx as jsx47, jsxs as jsxs41 } from "react/jsx-runtime";
var Kbd = React38.forwardRef(function Kbd2({
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
    return /* @__PURE__ */ jsx47("kbd", { ref, className: classes, "data-size": size, ...rest, children: /* @__PURE__ */ jsx47("span", { className: "ds-kbd__key ds-kbd__key--single", children }) });
  }
  return /* @__PURE__ */ jsx47(
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
        return /* @__PURE__ */ jsxs41(React38.Fragment, { children: [
          index > 0 && separator !== "" && separator != null ? /* @__PURE__ */ jsx47("span", { className: "ds-kbd__sep", "aria-hidden": "true", children: separator }) : null,
          /* @__PURE__ */ jsx47("kbd", { className: "ds-kbd__key", children: needsSpokenName ? /* @__PURE__ */ jsxs41(Fragment6, { children: [
            /* @__PURE__ */ jsx47("span", { "aria-hidden": "true", children: label.display }),
            /* @__PURE__ */ jsxs41("span", { className: "ds-kbd__sr", children: [
              " ",
              label.spoken,
              " "
            ] })
          ] }) : /* @__PURE__ */ jsxs41(Fragment6, { children: [
            label.display,
            /* @__PURE__ */ jsx47("span", { className: "ds-kbd__sr", children: " " })
          ] }) })
        ] }, `${key}-${index}`);
      })
    }
  );
});
Kbd.displayName = "Kbd";
var Kbd_default = Kbd;

// src/components/molecules/CommandPalette/index.tsx
import React39, { useCallback as useCallback19, useContext as useContext9, useEffect as useEffect17, useId as useId20, useMemo as useMemo14, useRef as useRef19, useState as useState22 } from "react";
import { createPortal as createPortal6 } from "react-dom";

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
function flattenOptions2(groups) {
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
import { jsx as jsx48, jsxs as jsxs42 } from "react/jsx-runtime";
function SearchGlyph() {
  return /* @__PURE__ */ jsxs42("svg", { viewBox: "0 0 20 20", width: "18", height: "18", "aria-hidden": true, focusable: "false", children: [
    /* @__PURE__ */ jsx48("circle", { cx: "9", cy: "9", r: "5.5", fill: "none", stroke: "currentColor", strokeWidth: "1.75" }),
    /* @__PURE__ */ jsx48("path", { d: "M13.2 13.2 17 17", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" })
  ] });
}
function CloseGlyph2() {
  return /* @__PURE__ */ jsx48("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx48("path", { d: "M4 4l8 8M12 4l-8 8", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
var NO_GROUPS = [];
var CommandPalette = React39.forwardRef(function CommandPalette2({
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
  const parentLayerId = useContext9(OverlayLayerContext);
  const baseId = id != null ? id : `ds-command-palette-${autoId.replace(/[^A-Za-z0-9_-]/g, "")}`;
  const inputId = `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;
  const isMac = useIsMac();
  const isControlled = openProp !== void 0;
  const [internalOpen, setInternalOpen] = useState22(defaultOpen);
  const isOpen = isControlled ? !!openProp : internalOpen;
  const isOpenRef = useRef19(isOpen);
  isOpenRef.current = isOpen;
  const onOpenChangeRef = useRef19(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  const setOpen = useCallback19(
    (next) => {
      var _a2;
      if (!isControlled)
        setInternalOpen(next);
      (_a2 = onOpenChangeRef.current) == null ? void 0 : _a2.call(onOpenChangeRef, next);
    },
    [isControlled]
  );
  const setOpenRef = useRef19(setOpen);
  setOpenRef.current = setOpen;
  const panelRef = useRef19(null);
  const inputRef = useRef19(null);
  const listboxRef = useRef19(null);
  const lastFocusedRef = useRef19(null);
  const ownedFocusTargetRef = useRef19(null);
  const returnFocusRef = useRef19(returnFocus);
  returnFocusRef.current = returnFocus;
  const hotkeyRef = useRef19(hotkey);
  hotkeyRef.current = hotkey;
  const allowInInputsRef = useRef19(allowInInputs);
  allowInInputsRef.current = allowInInputs;
  const onSearchRef = useRef19(onSearch);
  onSearchRef.current = onSearch;
  const pendingSelectRef = useRef19(null);
  const [selectTick, setSelectTick] = useState22(0);
  const setPanelRef = useCallback19(
    (node) => {
      panelRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  const [query, setQuery] = useState22("");
  const [activeKey, setActiveKey] = useState22(null);
  const [remoteGroups, setRemoteGroups] = useState22(NO_GROUPS);
  const [searching, setSearching] = useState22(false);
  const hasOnSearch = typeof onSearch === "function";
  useEffect17(() => {
    if (isOpen)
      return;
    setQuery("");
    setActiveKey(null);
    setRemoteGroups(NO_GROUPS);
    setSearching(false);
  }, [isOpen]);
  useEffect17(() => {
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
  const rankedGroups = useMemo14(() => {
    const showRecent = !hasQuery && recent && recent.items.length > 0;
    const local = shouldFilter ? rankGroups(groups, query) : listGroups(groups);
    return [
      ...showRecent && recent ? listGroups([recent], "recent:") : [],
      ...local,
      ...listGroups(remoteGroups, "remote:")
    ];
  }, [groups, recent, query, hasQuery, shouldFilter, remoteGroups]);
  const options = useMemo14(() => flattenOptions2(rankedGroups), [rankedGroups]);
  const enabledOptions = useMemo14(() => options.filter((o) => !o.item.disabled), [options]);
  const activeOption = (_a = enabledOptions.find((o) => o.key === activeKey)) != null ? _a : enabledOptions[0];
  const optionDomId = (key) => `${baseId}-option-${toDomId(key)}`;
  const activeDomId = activeOption ? optionDomId(activeOption.key) : void 0;
  useEffect17(() => {
    if (!isOpen || !activeDomId)
      return;
    const el = typeof document !== "undefined" ? document.getElementById(activeDomId) : null;
    if (el && typeof el.scrollIntoView === "function")
      el.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeDomId]);
  const resultsLabelRef = useRef19(resultsLabel);
  resultsLabelRef.current = resultsLabel;
  const pendingMessage = !isOpen ? "" : isLoading ? loadingLabel : hasQuery ? resultsLabelRef.current(options.length) : "";
  const [announcement, setAnnouncement] = useState22("");
  useEffect17(() => {
    if (!isOpen) {
      setAnnouncement("");
      return void 0;
    }
    const timer = setTimeout(() => setAnnouncement(pendingMessage), announceDelayMs);
    return () => clearTimeout(timer);
  }, [isOpen, pendingMessage, query, announceDelayMs]);
  useEffect17(() => {
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
  useEffect17(() => {
    if (!isOpen)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [isOpen, layerId, parentLayerId]);
  useEffect17(() => {
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
  useEffect17(() => {
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
      const active = document.activeElement;
      const focusLost = !active || active === document.body || panel != null && panel.contains(active);
      if (focusLost)
        previous.focus({ preventScroll: true });
    };
  }, [isOpen]);
  useEffect17(() => {
    if (!isOpen)
      return void 0;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [isOpen]);
  useEffect17(() => {
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
  useEffect17(() => {
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
  return createPortal6(
    /* @__PURE__ */ jsx48(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs42(
      "div",
      {
        className: "ds-command-palette-root",
        onFocusCapture: (e) => {
          ownedFocusTargetRef.current = e.target;
        },
        children: [
          /* @__PURE__ */ jsx48(
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
          /* @__PURE__ */ jsxs42(
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
                /* @__PURE__ */ jsxs42("div", { className: "ds-command-palette__search", children: [
                  /* @__PURE__ */ jsx48("span", { className: "ds-command-palette__search-icon", children: /* @__PURE__ */ jsx48(SearchGlyph, {}) }),
                  /* @__PURE__ */ jsx48(
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
                  /* @__PURE__ */ jsx48(
                    "button",
                    {
                      type: "button",
                      className: "ds-command-palette__close",
                      "aria-label": closeLabel,
                      onClick: () => setOpen(false),
                      children: /* @__PURE__ */ jsx48(CloseGlyph2, {})
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs42("div", { className: "ds-command-palette__body", children: [
                  /* @__PURE__ */ jsx48(
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
                        return /* @__PURE__ */ jsxs42(
                          "div",
                          {
                            role: "group",
                            "aria-labelledby": headingId,
                            className: "ds-command-palette__group",
                            children: [
                              /* @__PURE__ */ jsx48("div", { role: "presentation", id: headingId, className: "ds-command-palette__group-label", children: group.label }),
                              groupOptions.map((option) => {
                                const { item } = option;
                                const active = (activeOption == null ? void 0 : activeOption.key) === option.key;
                                return /* @__PURE__ */ jsxs42(
                                  "div",
                                  {
                                    id: optionDomId(option.key),
                                    role: "option",
                                    "aria-selected": active,
                                    "aria-disabled": item.disabled ? true : void 0,
                                    "aria-keyshortcuts": item.shortcut && item.shortcut.length > 0 ? toAriaKeyShortcuts(item.shortcut, isMac) : void 0,
                                    "data-active": active ? "true" : void 0,
                                    className: "ds-command-palette__option",
                                    onMouseDown: (e) => e.preventDefault(),
                                    onMouseMove: () => {
                                      if (!item.disabled && !active)
                                        setActiveKey(option.key);
                                    },
                                    onClick: () => selectOption(option),
                                    children: [
                                      item.icon != null ? /* @__PURE__ */ jsx48("span", { className: "ds-command-palette__option-icon", "aria-hidden": "true", children: item.icon }) : null,
                                      /* @__PURE__ */ jsxs42("span", { className: "ds-command-palette__option-text", children: [
                                        /* @__PURE__ */ jsx48("span", { className: "ds-command-palette__option-label", children: item.label }),
                                        item.description ? /* @__PURE__ */ jsx48("span", { className: "ds-command-palette__option-description", children: item.description }) : null
                                      ] }),
                                      item.shortcut && item.shortcut.length > 0 ? /* @__PURE__ */ jsx48(Kbd_default, { keys: item.shortcut, className: "ds-command-palette__option-kbd", "aria-hidden": "true" }) : null
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
                  isLoading ? /* @__PURE__ */ jsxs42("div", { className: "ds-command-palette__loading", "aria-hidden": "true", children: [
                    /* @__PURE__ */ jsx48(Spinner_default, { size: "xs", tone: "muted", decorative: true }),
                    /* @__PURE__ */ jsx48("span", { children: loadingLabel })
                  ] }) : null,
                  showEmpty ? /* @__PURE__ */ jsx48("div", { className: "ds-command-palette__empty", children: emptyState }) : null
                ] }),
                showFooter ? /* @__PURE__ */ jsxs42("div", { className: "ds-command-palette__footer", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsxs42("span", { className: "ds-command-palette__hint", children: [
                    /* @__PURE__ */ jsx48(Kbd_default, { keys: ["up"] }),
                    /* @__PURE__ */ jsx48(Kbd_default, { keys: ["down"] }),
                    /* @__PURE__ */ jsx48("span", { children: "to navigate" })
                  ] }),
                  /* @__PURE__ */ jsxs42("span", { className: "ds-command-palette__hint", children: [
                    /* @__PURE__ */ jsx48(Kbd_default, { keys: ["enter"] }),
                    /* @__PURE__ */ jsx48("span", { children: "to select" })
                  ] }),
                  /* @__PURE__ */ jsxs42("span", { className: "ds-command-palette__hint", children: [
                    /* @__PURE__ */ jsx48(Kbd_default, { keys: ["esc"] }),
                    /* @__PURE__ */ jsx48("span", { children: "to close" })
                  ] })
                ] }) : null,
                /* @__PURE__ */ jsx48("div", { className: "ds-command-palette__sr", role: "status", "aria-live": "polite", "aria-atomic": "true", children: announcement })
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
import React40, { useCallback as useCallback20, useEffect as useEffect18, useId as useId21, useMemo as useMemo15, useRef as useRef20, useState as useState23 } from "react";

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
function escapeRegExp(s) {
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
    const re = new RegExp(`${escapeRegExp(suffix)}(?=[)\\-\u2212]?$)`, "i");
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
import { jsx as jsx49, jsxs as jsxs43 } from "react/jsx-runtime";
function cls20(...parts) {
  return parts.filter(Boolean).join(" ");
}
function hasContent(node) {
  return node !== void 0 && node !== null && node !== false && node !== "" && node !== true;
}
function useAnnounceOnChange(value) {
  const initial = useRef20(value);
  const changed = useRef20(false);
  if (!changed.current && value !== initial.current)
    changed.current = true;
  return changed.current;
}
function MinusGlyph() {
  return /* @__PURE__ */ jsx49("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx49("path", { d: "M3.5 8h9", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
function PlusGlyph() {
  return /* @__PURE__ */ jsx49("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx49("path", { d: "M3.5 8h9M8 3.5v9", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
var NumberInput = React40.forwardRef(function NumberInput2({
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
  const options = useMemo15(() => JSON.parse(optionsKey), [optionsKey]);
  const isControlled = valueProp !== void 0;
  const [innerValue, setInnerValue] = useState23(defaultValue != null ? defaultValue : null);
  const current = isControlled ? valueProp != null ? valueProp : null : innerValue;
  const currentRef = useRef20(current);
  currentRef.current = current;
  const [focused, setFocused] = useState23(false);
  const focusedRef = useRef20(false);
  const [editText, setEditText] = useState23("");
  const editTextRef = useRef20("");
  const setEdit = (t) => {
    editTextRef.current = t;
    setEditText(t);
  };
  const inputRef = useRef20(null);
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
  const toEdit = useCallback20(
    (v) => v === null ? "" : formatForEditing(v, locale, options, precision),
    [locale, options, precision]
  );
  const setValue = useCallback20(
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
  useEffect18(() => {
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
  const holdTimer = useRef20(void 0);
  const repeatTimer = useRef20(void 0);
  const stopRepeat = useCallback20(() => {
    clearTimeout(holdTimer.current);
    clearInterval(repeatTimer.current);
    holdTimer.current = void 0;
    repeatTimer.current = void 0;
  }, []);
  useEffect18(() => stopRepeat, [stopRepeat]);
  const stepByRef = useRef20(stepBy);
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
  const showOwnError = !field && hasContent(error);
  const announceError = useAnnounceOnChange(showOwnError ? error : null);
  const describedBy = ariaDescribedByProp != null ? ariaDescribedByProp : [field == null ? void 0 : field.describedBy, showOwnError ? errorId : void 0].filter(Boolean).join(" ") || void 0;
  const textRejected = focused && !readOnly && isRejected(editText);
  const invalid = ariaInvalidProp != null ? ariaInvalidProp : (field == null ? void 0 : field.invalid) || error === true || hasContent(error) || textRejected ? true : void 0;
  const required = ariaRequiredProp != null ? ariaRequiredProp : (field == null ? void 0 : field.required) ? true : void 0;
  const labelledBy = ariaLabelledByProp != null ? ariaLabelledByProp : void 0;
  return /* @__PURE__ */ jsxs43(
    "div",
    {
      className: cls20("ds-number-input", className),
      style,
      "data-size": size,
      "data-disabled": disabled ? "true" : void 0,
      "data-readonly": readOnly ? "true" : void 0,
      "data-invalid": invalid ? "true" : void 0,
      children: [
        !field && hasContent(label) ? /* @__PURE__ */ jsx49("label", { id: labelId, htmlFor: inputId, className: "ds-number-input__label", children: label }) : null,
        /* @__PURE__ */ jsxs43(
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
              prefix != null ? /* @__PURE__ */ jsx49("span", { className: "ds-number-input__affix", "data-slot": "prefix", "aria-hidden": "true", children: prefix }) : null,
              /* @__PURE__ */ jsx49(
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
              suffix != null ? /* @__PURE__ */ jsx49("span", { className: "ds-number-input__affix", "data-slot": "suffix", "aria-hidden": "true", children: suffix }) : null,
              showSteppers ? /* @__PURE__ */ jsxs43("span", { className: "ds-number-input__steppers", children: [
                /* @__PURE__ */ jsx49(
                  "button",
                  {
                    type: "button",
                    tabIndex: -1,
                    className: "ds-number-input__stepper",
                    "aria-label": decrementLabel,
                    "aria-controls": inputId,
                    disabled: !canStep(-1),
                    ...stepperHandlers(-1),
                    children: /* @__PURE__ */ jsx49(MinusGlyph, {})
                  }
                ),
                /* @__PURE__ */ jsx49(
                  "button",
                  {
                    type: "button",
                    tabIndex: -1,
                    className: "ds-number-input__stepper",
                    "aria-label": incrementLabel,
                    "aria-controls": inputId,
                    disabled: !canStep(1),
                    ...stepperHandlers(1),
                    children: /* @__PURE__ */ jsx49(PlusGlyph, {})
                  }
                )
              ] }) : null
            ]
          }
        ),
        name ? /* @__PURE__ */ jsx49("input", { type: "hidden", name, value: current != null ? current : "", disabled }) : null,
        showOwnError ? /* @__PURE__ */ jsx49("p", { id: errorId, className: "ds-number-input__error", role: announceError ? "alert" : void 0, children: error }) : null
      ]
    }
  );
});
NumberInput.displayName = "NumberInput";
NumberInput[FORM_FIELD_CONSUMER_KEY] = true;
var NumberInput_default = NumberInput;

// src/components/molecules/DateRangePicker/index.tsx
import React41, {
  useCallback as useCallback21,
  useContext as useContext10,
  useEffect as useEffect19,
  useId as useId22,
  useLayoutEffect as useLayoutEffect10,
  useMemo as useMemo16,
  useRef as useRef21,
  useState as useState24
} from "react";
import { createPortal as createPortal7 } from "react-dom";
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
function clampRange(range2, min, max) {
  let { from, to } = orderRange(range2.from, range2.to);
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
function formatRange(range2, format) {
  if (!(range2 == null ? void 0 : range2.from) && !(range2 == null ? void 0 : range2.to))
    return null;
  const from = range2.from ? format(range2.from) : "\u2026";
  const to = range2.to ? format(range2.to) : "\u2026";
  if (range2.from && range2.to && isSameDay2(range2.from, range2.to))
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
import { Fragment as Fragment7, jsx as jsx50, jsxs as jsxs44 } from "react/jsx-runtime";
function cls21(...parts) {
  return parts.filter(Boolean).join(" ");
}
function hasContent2(node) {
  return node !== void 0 && node !== null && node !== false && node !== "" && node !== true;
}
function useAnnounceOnChange2(value) {
  const initial = useRef21(value);
  const changed = useRef21(false);
  if (!changed.current && value !== initial.current)
    changed.current = true;
  return changed.current;
}
function useMediaQuery2(query, onChange) {
  const onChangeRef = useRef21(onChange);
  onChangeRef.current = onChange;
  const [matches, setMatches] = useState24(
    () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(query).matches
  );
  useEffect19(() => {
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
  return /* @__PURE__ */ jsxs44("svg", { className: "ds-date-range-picker__icon", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ jsx50("rect", { x: "3", y: "4.5", width: "14", height: "12", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx50("path", { d: "M3 8.5h14M7 2.75v3.5M13 2.75v3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function ClearGlyph() {
  return /* @__PURE__ */ jsx50("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx50("path", { d: "M4 4l8 8M12 4l-8 8", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
var DateRangePicker = React41.forwardRef(function DateRangePicker2({
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
  const parentLayerId = useContext10(OverlayLayerContext);
  const rootRef = useRef21(null);
  const triggerRef = useRef21(null);
  const dialogRef = useRef21(null);
  const focusInsideRef = useRef21(false);
  const lastFocusDayRef = useRef21(null);
  const setRootRef = useCallback21(
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
  const [innerValue, setInnerValue] = useState24(() => defaultValue != null ? defaultValue : {});
  const current = (_b = isControlled ? valueProp : innerValue) != null ? _b : {};
  const [open, setOpen] = useState24(false);
  const openRef = useRef21(open);
  openRef.current = open;
  const [draft, setDraft] = useState24(null);
  const [hoverDay, setHoverDay] = useState24(null);
  const [month, setMonth] = useState24(() => {
    var _a2;
    return startOfMonth2((_a2 = current.from) != null ? _a2 : /* @__PURE__ */ new Date());
  });
  const [announcement, setAnnouncement] = useState24("");
  const [align, setAlign] = useState24("start");
  const [autoFocusGrid, setAutoFocusGrid] = useState24(false);
  const [portalContext, setPortalContext] = useState24({});
  const narrow = useMediaQuery2(DATE_RANGE_PICKER_NARROW_QUERY, (nowNarrow) => {
    if (!openRef.current || !nowNarrow)
      return;
    const focusedDay = fromIsoDay(lastFocusDayRef.current);
    if (focusedDay && focusInsideRef.current)
      setMonth(startOfMonth2(focusedDay));
  });
  const months = narrow ? 1 : Math.max(1, Math.floor(numberOfMonths));
  const format = useMemo16(() => formatProp != null ? formatProp : createDateFormatter(locale), [formatProp, locale]);
  const displayText = formatRange(current, format);
  const commit = useCallback21(
    (next, message) => {
      if (!isControlled)
        setInnerValue(next);
      onChange == null ? void 0 : onChange(next);
      setAnnouncement(message);
    },
    [isControlled, onChange]
  );
  const close = useCallback21((restoreFocus) => {
    var _a2;
    setOpen(false);
    setDraft(null);
    setHoverDay(null);
    setAlign("start");
    focusInsideRef.current = false;
    lastFocusDayRef.current = null;
    if (restoreFocus)
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
  useEffect19(() => {
    if (disabled && open)
      close(false);
  }, [disabled, open, close]);
  useEffect19(() => {
    if (!open)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [open, layerId, parentLayerId]);
  useEffect19(() => {
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
  const refocusTimerRef = useRef21(void 0);
  useEffect19(() => () => clearTimeout(refocusTimerRef.current), []);
  useEffect19(() => {
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
        const active = document.activeElement;
        if (!active || active === document.body)
          (_a3 = triggerRef.current) == null ? void 0 : _a3.focus({ preventScroll: true });
      }, 0);
    };
    const type = typeof window !== "undefined" && "PointerEvent" in window ? "pointerdown" : "mousedown";
    document.addEventListener(type, onPointerDown, true);
    return () => {
      document.removeEventListener(type, onPointerDown, true);
    };
  }, [open, layerId, close]);
  useLayoutEffect10(() => {
    var _a2, _b2, _c, _d;
    if (!open || !narrow)
      return;
    const root = rootRef.current;
    const theme = (_b2 = (_a2 = root == null ? void 0 : root.closest("[data-theme]")) == null ? void 0 : _a2.getAttribute("data-theme")) != null ? _b2 : void 0;
    const dir = (_d = (_c = root == null ? void 0 : root.closest("[dir]")) == null ? void 0 : _c.getAttribute("dir")) != null ? _d : void 0;
    setPortalContext((prev) => prev.theme === theme && prev.dir === dir ? prev : { theme, dir });
  }, [open, narrow]);
  useLayoutEffect10(() => {
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
  useLayoutEffect10(() => {
    var _a2;
    if (!open || !focusInsideRef.current)
      return;
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    const active = document.activeElement;
    if (active && active !== document.body && dialog.contains(active))
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
    const range2 = orderRange(draft.from, day);
    commit(range2, DATE_RANGE_MESSAGES.selected(format(range2.from), format(range2.to)));
    close(true);
  };
  const pickPreset = (preset) => {
    const range2 = clampRange(preset.range(), min, max);
    if (!range2)
      return;
    commit(range2, DATE_RANGE_MESSAGES.preset(preset.label, format(range2.from), format(range2.to)));
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
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === dialogRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };
  const intl = useMemo16(
    () => ({
      caption: safeDateTimeFormat(locale, { month: "long", year: "numeric" }),
      weekdayShort: safeDateTimeFormat(locale, { weekday: "short" }),
      weekdayLong: safeDateTimeFormat(locale, { weekday: "long" }),
      dayFull: safeDateTimeFormat(locale, { dateStyle: "full" })
    }),
    [locale]
  );
  const formatters = useMemo16(
    () => ({
      formatCaption: (m) => intl.caption.format(m),
      formatWeekdayName: (d) => intl.weekdayShort.format(d)
    }),
    [intl]
  );
  const draftFrom = draft == null ? void 0 : draft.from;
  const labels = useMemo16(
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
  const disabledMatchers = useMemo16(() => {
    const list = [];
    if (min)
      list.push({ before: startOfDay(min) });
    if (max)
      list.push({ after: startOfDay(max) });
    return list;
  }, [min, max]);
  const gridSelected = (draft == null ? void 0 : draft.from) ? { from: draft.from, to: void 0 } : current.from ? { from: current.from, to: current.to } : void 0;
  const preview = (draft == null ? void 0 : draft.from) && hoverDay && !isOutOfBounds(hoverDay, min, max) ? orderRange(draft.from, hoverDay) : null;
  const nameSourceId = ariaLabelledByProp ? void 0 : field ? field.labelId : hasContent2(label) ? ownLabelId : ariaLabel ? hiddenNameId : void 0;
  const labelledBy = ariaLabelledByProp != null ? ariaLabelledByProp : nameSourceId ? `${nameSourceId} ${valueId}` : void 0;
  const showOwnError = !field && hasContent2(error);
  const announceError = useAnnounceOnChange2(showOwnError ? error : null);
  const describedBy = ariaDescribedByProp != null ? ariaDescribedByProp : [field == null ? void 0 : field.describedBy, showOwnError ? errorId : void 0].filter(Boolean).join(" ") || void 0;
  const invalid = ariaInvalidProp != null ? ariaInvalidProp : (field == null ? void 0 : field.invalid) || error === true || hasContent2(error) ? true : void 0;
  const showClear = clearable && !disabled && Boolean(current.from || current.to);
  const renderPopover = (node) => narrow && typeof document !== "undefined" ? createPortal7(node, document.body) : node;
  return /* @__PURE__ */ jsxs44(
    "div",
    {
      ...rest,
      ref: setRootRef,
      className: cls21("ds-date-range-picker", className),
      "data-open": open ? "true" : void 0,
      "data-disabled": disabled ? "true" : void 0,
      "data-invalid": invalid ? "true" : void 0,
      children: [
        !field && hasContent2(label) ? /* @__PURE__ */ jsxs44("label", { id: ownLabelId, htmlFor: triggerId, className: "ds-date-range-picker__label", children: [
          label,
          requiredProp ? /* @__PURE__ */ jsxs44(Fragment7, { children: [
            /* @__PURE__ */ jsx50("span", { className: "ds-date-range-picker__required", "aria-hidden": "true", children: "*" }),
            /* @__PURE__ */ jsx50("span", { className: "ds-date-range-picker__sr", children: " required" })
          ] }) : null
        ] }) : null,
        !field && !hasContent2(label) && ariaLabel ? /* @__PURE__ */ jsxs44("span", { id: hiddenNameId, hidden: true, children: [
          ariaLabel,
          requiredProp ? " required" : ""
        ] }) : null,
        /* @__PURE__ */ jsxs44("div", { className: "ds-date-range-picker__field", "data-clearable": showClear ? "true" : void 0, children: [
          /* @__PURE__ */ jsxs44(
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
                /* @__PURE__ */ jsx50(CalendarGlyph, {}),
                /* @__PURE__ */ jsx50(
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
          showClear ? /* @__PURE__ */ jsx50("button", { type: "button", className: "ds-date-range-picker__clear", "aria-label": clearLabel, onClick: clear, children: /* @__PURE__ */ jsx50(ClearGlyph, {}) }) : null,
          open ? renderPopover(
            /* @__PURE__ */ jsx50(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs44(
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
                  (presets == null ? void 0 : presets.length) ? /* @__PURE__ */ jsx50(
                    "div",
                    {
                      role: "group",
                      "aria-label": DATE_RANGE_PICKER_DEFAULTS.presetsLabel,
                      className: "ds-date-range-picker__presets",
                      children: presets.map((preset) => {
                        const range2 = clampRange(preset.range(), min, max);
                        const active = Boolean(range2 && isCompleteRange(current) && isSameRange(range2, current));
                        return /* @__PURE__ */ jsx50(
                          "button",
                          {
                            type: "button",
                            className: "ds-date-range-picker__preset",
                            "aria-pressed": active,
                            disabled: !range2,
                            onClick: () => pickPreset(preset),
                            children: preset.label
                          },
                          preset.label
                        );
                      })
                    }
                  ) : null,
                  /* @__PURE__ */ jsx50(
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
        showOwnError ? /* @__PURE__ */ jsx50("p", { id: errorId, className: "ds-date-range-picker__error", role: announceError ? "alert" : void 0, children: error }) : null,
        /* @__PURE__ */ jsx50("span", { className: "ds-date-range-picker__sr", "aria-live": "polite", "aria-atomic": "true", children: announcement })
      ]
    }
  );
});
DateRangePicker.displayName = "DateRangePicker";
DateRangePicker[FORM_FIELD_CONSUMER_KEY] = true;
var DateRangePicker_default = DateRangePicker;
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
  Avatar_default as Avtar,
  Badge_default as Badge,
  BarChart_default as BarChart,
  Breadcrumb,
  BreadcrumbItem,
  Button_default as Button,
  ButtonGroup,
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
  Combobox,
  CommandPalette_default as CommandPalette,
  DEFAULT_RANGE_PRESETS,
  DashboardShell_default as DashboardShell,
  DataTable_default as DataTable,
  DatePicker_default as DatePicker,
  DateRangePicker_default as DateRangePicker,
  Divider_default as Divider,
  Drawer_default as Drawer,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Dropzone,
  EmptyState,
  ErrorAnimation,
  ErrorState,
  FEEDBACK_ANIMATIONS,
  FeedbackState,
  FileUpload_default as FileUpload,
  FilterBar_default as FilterBar,
  Form,
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
  PopoverContent,
  PopoverTrigger,
  ProgressBar_default as ProgressBar,
  RadioGroup_default as RadioGroup,
  SEGMENTED_CONTROL_DEFAULTS,
  SEGMENTED_CONTROL_SIZES,
  SegmentedControl_default as SegmentedControl,
  Select_default as Select,
  Sheet,
  Skeleton_default as Skeleton,
  SkeletonGroup,
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
  TextArea_default as TextArea,
  TextView_default as TextView,
  Toast_default as Toast,
  ToastProvider,
  ToolTip_default as ToolTip,
  Tooltip,
  WIZARD_DEFAULTS,
  Wizard_default as Wizard,
  createDefaultRangePresets,
  detectFileKindFromBuffer,
  detectIsMac,
  escapeCsvCell,
  formatLocaleNumber,
  formatShortcut,
  getItemRange,
  getPageCount,
  getPaginationRange,
  mergeSidebarTokensStyle,
  mergeTopbarTokensStyle,
  parseAcceptString,
  parseLocaleNumber,
  readAppSidebarPersist,
  toAriaKeyShortcuts,
  toCsv,
  useFormField,
  useToast,
  validateFileSecurity,
  validateFilename,
  validateFilesSecurity,
  writeAppSidebarPersist
};
//# sourceMappingURL=index.mjs.map