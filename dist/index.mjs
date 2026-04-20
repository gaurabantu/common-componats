import {
  AreaChart_default,
  BarChart_default,
  ChartTooltip,
  LineChart_default,
  PieChart_default
} from "./chunk-4T2FFCBO.mjs";
import {
  AppShell,
  AppSidebar,
  AppTopbar_default,
  Avatar_default,
  Button_default,
  DashboardShell_default,
  mergeSidebarTokensStyle,
  mergeTopbarTokensStyle,
  readAppSidebarPersist,
  writeAppSidebarPersist
} from "./chunk-G6PBIJP2.mjs";
import {
  Checkbox_default,
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
  TextView_default
} from "./chunk-NTBSW3TQ.mjs";
import {
  Icon_default,
  TextInputSearch_default,
  TextInput_default,
  close_default,
  error_default,
  getSanitizeText
} from "./chunk-2PE7SU3L.mjs";

// src/components/atoms/Switch/index.tsx
import React, { useCallback, useId, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
var COLORS = {
  trackOff: "var(--color-mist-80, #e0e0e0)",
  trackOn: "var(--color-theme-primary, var(--color-brand-primary, #0d0d0d))",
  thumb: "var(--color-bg-surface, #ffffff)",
  border: "var(--color-border-default, #999999)",
  text: "var(--color-text-primary, #0d0d0d)",
  textMuted: "var(--color-text-secondary, #757575)"
};
var SIZE_STYLES = {
  sm: {
    track: { width: 40, height: 22, padding: 2, thumb: 18 },
    hitPadding: 8
  },
  md: {
    track: { width: 48, height: 28, padding: 3, thumb: 22 },
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
var defaultRadioColorClass = "accent-primary";
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
    brand: "var(--color-brand-primary, #0D0D0D)",
    textPrimary: "var(--color-text-primary, #0D0D0D)",
    textSecondary: "var(--color-text-secondary, #757575)",
    bgSurface: "var(--color-bg-surface, #FFFFFF)",
    borderDefault: "var(--color-border-default, #999999)",
    accentLavender: "var(--color-accent-lavender-10, #EEE7FF)",
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
    pointerEvents: disabled ? "none" : "auto"
  };
  const inputStyle = {
    flexShrink: 0,
    width: 16,
    height: 16,
    margin: "2px 0 0 0",
    accentColor: colors.brand,
    cursor: disabled ? "not-allowed" : "pointer"
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
      className: cls3(itemMarginClass),
      style: wrapperStyle,
      children: [
        /* @__PURE__ */ jsx3(
          "input",
          {
            id,
            className: cls3(radioColorClass),
            type: "radio",
            name,
            value,
            checked,
            disabled,
            onChange,
            tabIndex,
            style: inputStyle
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
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--space-4) var(--space-2)",
    boxSizing: "border-box",
    ...shellStyle
  };
  const resolvedCardStyle = {
    width: "100%",
    maxWidth,
    borderRadius: "var(--radius-card)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-bg-surface, #FFFFFF)",
    boxShadow: "var(--shadow-lg)",
    padding: "var(--space-4)",
    boxSizing: "border-box",
    ...cardStyle,
    ...style
  };
  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "var(--space-1) var(--space-2)",
    borderRadius: 9999,
    background: "var(--color-accent-lavender-10, #EEE7FF)",
    color: "var(--color-brand-link, #002475)",
    fontSize: "var(--text-small-size)",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase"
  };
  const titleStyle = {
    margin: "var(--space-3) 0 var(--space-1)",
    color: "var(--color-text-primary, #0D0D0D)",
    fontSize: "clamp(var(--text-h2-size), 4vw, var(--text-h1-size))",
    lineHeight: "var(--text-h1-line-height)",
    fontWeight: 800
  };
  const descriptionStyle = {
    margin: 0,
    color: "var(--color-text-secondary, #757575)",
    fontSize: "var(--text-body-size)",
    lineHeight: "var(--text-body-line-height)"
  };
  const resolvedContentStyle = {
    marginTop: "var(--space-4)",
    display: "flex",
    flexDirection: "column",
    gap,
    ...contentStyle
  };
  const resolvedFieldsStyle = layout === "grid" ? {
    display: "grid",
    gridTemplateColumns: `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
    gap,
    alignItems: "start",
    ...fieldsStyle
  } : {
    display: "flex",
    flexDirection: "column",
    gap,
    ...fieldsStyle
  };
  const resolvedActionsStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-2)"
  };
  return /* @__PURE__ */ jsx4("section", { className: cx(shellClassName), style: resolvedShellStyle, children: /* @__PURE__ */ jsxs4(
    "div",
    {
      className: cx(cardClassName),
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
            className: cx(contentClassName, className),
            style: resolvedContentStyle,
            children: [
              /* @__PURE__ */ jsx4("div", { className: cx(fieldsClassName), style: resolvedFieldsStyle, children }),
              (actions || footer) && /* @__PURE__ */ jsxs4("div", { style: resolvedActionsStyle, children: [
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
      "aria-controls": panelId,
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
      motion
    }),
    [type, collapsible, isOpen, toggle, baseId, variant, motion]
  );
  return /* @__PURE__ */ jsx8(AccordionContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx8(
    "div",
    {
      className: cls6("ds-accordion", className),
      "data-variant": variant,
      "data-motion": motion,
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
                  stepPart: "marker",
                  "aria-posinset": index + 1,
                  "aria-setsize": stepCount
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
  return /* @__PURE__ */ jsx10(
    "button",
    {
      ...rest,
      type: "button",
      "aria-labelledby": labelId,
      disabled: isDisabled,
      className: cls8("ds-stepper__marker-btn", className),
      "data-state": state,
      "aria-current": state === "current" ? "step" : void 0,
      onClick: handleMarkerClick,
      children: /* @__PURE__ */ jsx10("span", { className: "ds-stepper__marker", "aria-hidden": "true", children: markerContent })
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

// src/components/molecules/Popover/index.tsx
import React9, {
  createContext as createContext5,
  forwardRef,
  useCallback as useCallback7,
  useContext as useContext5,
  useEffect,
  useId as useId6,
  useLayoutEffect as useLayoutEffect2,
  useMemo as useMemo7,
  useRef as useRef4,
  useState as useState6
} from "react";
import { createPortal } from "react-dom";

// src/components/molecules/Popover/popoverPosition.ts
var GAP = 8;
var VIEWPORT = 8;
function computePopoverPosition(triggerRect, contentWidth, contentHeight, placement) {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;
  const cw = Math.min(contentWidth, vw - VIEWPORT * 2);
  const ch = Math.min(contentHeight, vh - VIEWPORT * 2);
  let top;
  let left;
  const placeBottom = placement.startsWith("bottom");
  const alignEnd = placement.endsWith("end");
  if (placeBottom) {
    top = triggerRect.bottom + GAP;
    if (top + ch > vh - VIEWPORT) {
      const above = triggerRect.top - GAP - ch;
      if (above >= VIEWPORT) {
        top = above;
      } else {
        top = Math.max(VIEWPORT, vh - VIEWPORT - ch);
      }
    }
  } else {
    top = triggerRect.top - GAP - ch;
    if (top < VIEWPORT) {
      const below = triggerRect.bottom + GAP;
      if (below + ch <= vh - VIEWPORT) {
        top = below;
      } else {
        top = VIEWPORT;
      }
    }
  }
  if (alignEnd) {
    left = triggerRect.right - cw;
  } else {
    left = triggerRect.left;
  }
  left = Math.min(Math.max(left, VIEWPORT), vw - VIEWPORT - cw);
  return {
    top,
    left,
    width: cw,
    maxHeight: Math.min(ch, vh - VIEWPORT * 2)
  };
}

// src/components/molecules/Popover/index.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
function cls10(...parts) {
  return parts.filter(Boolean).join(" ");
}
var PopoverContext = createContext5(null);
function usePopoverContext(component) {
  const ctx = useContext5(PopoverContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Popover> or <DropdownMenu>`);
  }
  return ctx;
}
var Popover = React9.memo(function Popover2({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start"
}) {
  const reactId = useId6();
  const base = reactId.replace(/:/g, "");
  const triggerId = `popover-trigger-${base}`;
  const contentId = `popover-content-${base}`;
  const triggerRef = useRef4(null);
  const isControlled = openProp !== void 0;
  const [innerOpen, setInnerOpen] = useState6(defaultOpen);
  const open = isControlled ? Boolean(openProp) : innerOpen;
  const prevOpenRef = useRef4(false);
  const setOpen = useCallback7(
    (next) => {
      if (!isControlled) {
        setInnerOpen(next);
      }
      onOpenChange == null ? void 0 : onOpenChange(next);
    },
    [isControlled, onOpenChange]
  );
  useEffect(() => {
    if (prevOpenRef.current && !open && triggerRef.current) {
      requestAnimationFrame(() => {
        var _a;
        return (_a = triggerRef.current) == null ? void 0 : _a.focus();
      });
    }
    prevOpenRef.current = open;
  }, [open]);
  const ctx = useMemo7(
    () => ({
      open,
      setOpen,
      triggerId,
      contentId,
      triggerRef,
      placement
    }),
    [open, setOpen, triggerId, contentId, placement]
  );
  return /* @__PURE__ */ jsx12(PopoverContext.Provider, { value: ctx, children });
});
var PopoverTrigger = forwardRef(function PopoverTrigger2({ children, className, hasPopup = "dialog", type = "button", onClick, ...rest }, ref) {
  const ctx = usePopoverContext("PopoverTrigger");
  const open = ctx.open;
  const setRefs = useCallback7(
    (el) => {
      ctx.triggerRef.current = el;
      if (typeof ref === "function")
        ref(el);
      else if (ref)
        ref.current = el;
    },
    [ctx.triggerRef, ref]
  );
  return /* @__PURE__ */ jsx12(
    "button",
    {
      ...rest,
      ref: setRefs,
      type,
      id: ctx.triggerId,
      className: cls10(className),
      "aria-expanded": open,
      "aria-controls": ctx.contentId,
      "aria-haspopup": hasPopup,
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        ctx.setOpen(!open);
      },
      children
    }
  );
});
var ARROW_EDGE_PAD = 12;
var PopoverContent = React9.memo(function PopoverContent2({
  children,
  className,
  role: roleProp,
  onKeyDown,
  style,
  showPointer = false,
  ...rest
}) {
  const ctx = usePopoverContext("PopoverContent");
  const contentRef = useRef4(null);
  const [pos, setPos] = useState6({
    top: 0,
    left: 0
  });
  const updatePosition = useCallback7(() => {
    var _a;
    const trigger = ctx.triggerRef.current;
    const panel = contentRef.current;
    if (!trigger || !panel || typeof window === "undefined")
      return;
    const tr = trigger.getBoundingClientRect();
    const cw = Math.max(panel.offsetWidth || 200, 200);
    const ch = Math.max(panel.offsetHeight || 80, 80);
    const result = computePopoverPosition(tr, cw, ch, ctx.placement);
    if (!showPointer) {
      setPos(result);
      return;
    }
    const below = result.top >= tr.bottom - 4;
    const triggerCx = tr.left + tr.width / 2;
    const panelW = (_a = result.width) != null ? _a : cw;
    const arrowX = Math.min(
      Math.max(triggerCx - result.left, ARROW_EDGE_PAD),
      panelW - ARROW_EDGE_PAD
    );
    setPos({
      ...result,
      arrowEdge: below ? "top" : "bottom",
      arrowX
    });
  }, [ctx.placement, ctx.triggerRef, showPointer]);
  useLayoutEffect2(() => {
    if (!ctx.open)
      return;
    updatePosition();
    const id = requestAnimationFrame(() => updatePosition());
    return () => cancelAnimationFrame(id);
  }, [ctx.open, updatePosition]);
  useEffect(() => {
    if (!ctx.open)
      return;
    const onResize = () => updatePosition();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [ctx.open, updatePosition]);
  useEffect(() => {
    if (!ctx.open)
      return;
    const onDocMouse = (e) => {
      var _a, _b;
      const t = e.target;
      if (((_a = ctx.triggerRef.current) == null ? void 0 : _a.contains(t)) || ((_b = contentRef.current) == null ? void 0 : _b.contains(t)))
        return;
      ctx.setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape")
        ctx.setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouse);
      document.removeEventListener("keydown", onKey);
    };
  }, [ctx]);
  useEffect(() => {
    if (!ctx.open || !contentRef.current)
      return;
    const el = contentRef.current.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    el == null ? void 0 : el.focus();
  }, [ctx.open]);
  const role = roleProp != null ? roleProp : "dialog";
  if (!ctx.open)
    return null;
  const pointerStyle = showPointer && pos.arrowX != null ? { ["--popover-arrow-x"]: `${pos.arrowX}px` } : void 0;
  const content = /* @__PURE__ */ jsx12(
    "div",
    {
      ...rest,
      ref: contentRef,
      id: ctx.contentId,
      role: role === "none" ? void 0 : role,
      "aria-modal": role === "dialog" ? false : void 0,
      "aria-labelledby": ctx.triggerId,
      className: cls10(
        "ds-popover__content",
        showPointer && "ds-popover__content--with-pointer",
        className
      ),
      "data-arrow-edge": showPointer ? pos.arrowEdge : void 0,
      tabIndex: -1,
      style: {
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        maxHeight: showPointer ? void 0 : pos.maxHeight,
        overflow: showPointer ? "visible" : "auto",
        zIndex: "var(--z-dropdown, 100)",
        ...pointerStyle,
        ...style
      },
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.key === "Escape")
          ctx.setOpen(false);
      },
      children: showPointer ? /* @__PURE__ */ jsx12("div", { className: "ds-popover__content-scroll", style: { maxHeight: pos.maxHeight }, children }) : children
    }
  );
  if (typeof document === "undefined")
    return null;
  return createPortal(content, document.body);
});
var DropdownMenu = Popover;
var DropdownMenuTrigger = forwardRef(
  function DropdownMenuTrigger2(props, ref) {
    return /* @__PURE__ */ jsx12(PopoverTrigger, { ...props, ref, hasPopup: "menu" });
  }
);
var DropdownMenuContent = React9.memo(function DropdownMenuContent2({
  children,
  className,
  onKeyDown,
  ...rest
}) {
  const handleMenuKeyDown = useCallback7(
    (e) => {
      var _a;
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End")
        return;
      const root = e.currentTarget;
      const items = Array.from(root.querySelectorAll('[role="menuitem"]:not([disabled])'));
      if (items.length === 0)
        return;
      const i = items.indexOf(document.activeElement);
      let next = i;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        next = i < 0 ? 0 : (i + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        next = i < 0 ? items.length - 1 : (i - 1 + items.length) % items.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = items.length - 1;
      }
      (_a = items[next]) == null ? void 0 : _a.focus();
    },
    [onKeyDown]
  );
  return /* @__PURE__ */ jsx12(
    PopoverContent,
    {
      ...rest,
      role: "menu",
      "aria-orientation": "vertical",
      className,
      onKeyDown: handleMenuKeyDown,
      children
    }
  );
});
var DropdownMenuItem = React9.memo(function DropdownMenuItem2({
  children,
  className,
  onSelect,
  variant = "default",
  disabled = false,
  onClick,
  type = "button",
  ...rest
}) {
  const ctx = usePopoverContext("DropdownMenuItem");
  return /* @__PURE__ */ jsx12(
    "button",
    {
      ...rest,
      type,
      role: "menuitem",
      disabled,
      className: cls10(
        "ds-dropdown-menu__item",
        variant === "danger" && "ds-dropdown-menu__item--danger",
        className
      ),
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        if (disabled)
          return;
        onSelect == null ? void 0 : onSelect();
        ctx.setOpen(false);
      },
      children
    }
  );
});

// src/components/atoms/TextArea/index.tsx
import { useId as useId7, useState as useState7, useEffect as useEffect2 } from "react";

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
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
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
  const textareaId = useId7();
  const [internalValue, setInternalValue] = useState7((_a = value != null ? value : defaultValue) != null ? _a : "");
  useEffect2(() => {
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
  const footerMessageColor = resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : resolvedStatus === "warning" ? "var(--color-state-warning, #FFC107)" : resolvedStatus === "success" ? "var(--color-state-success, #28A745)" : "var(--color-text-secondary, #757575)";
  const minHeight = size === "lg" ? 128 : size === "sm" ? 96 : 112;
  const paddingX = size === "lg" ? 16 : size === "sm" ? 12 : 14;
  const paddingY = size === "lg" ? 12 : size === "sm" ? 8 : 10;
  const fontSize = size === "sm" ? "var(--text-small-size, 12px)" : "var(--text-body-size, 16px)";
  const resizeValue = resize === "horizontal" ? "horizontal" : resize === "both" ? "both" : resize === "none" ? "none" : "vertical";
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : resolvedStatus === "warning" ? "var(--color-state-warning, #FFC107)" : resolvedStatus === "success" ? "var(--color-state-success, #28A745)" : "var(--color-border-default, #999999)";
  const wrapperStyle = {
    width: fullWidth ? "100%" : "auto",
    display: fullWidth ? "block" : "inline-block"
  };
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: "var(--color-text-primary, #0D0D0D)",
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
    background: disabled ? "var(--color-bg-page, #F3F4F6)" : "var(--color-bg-surface, #FFFFFF)",
    color: disabled ? "var(--color-text-secondary, #757575)" : "var(--color-text-primary, #0D0D0D)",
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
    color: "var(--color-text-secondary, #757575)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  return /* @__PURE__ */ jsxs9("div", { className: containerClass, style: wrapperStyle, children: [
    label && /* @__PURE__ */ jsx13("label", { htmlFor: textareaId, style: labelStyle, children: label }),
    /* @__PURE__ */ jsx13(
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
      /* @__PURE__ */ jsx13("span", { style: footerTextStyle, children: footerMessage }),
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
import React11 from "react";

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
import { jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
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
  const trackFill = trackColor || "var(--color-bg-page, #F3F4F6)";
  const resolvedAnimation = animation !== "smooth" ? animation : animated ? "pulse" : "smooth";
  const [animatedWidth, setAnimatedWidth] = React11.useState(0);
  React11.useEffect(() => {
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
                showLabel && label ? /* @__PURE__ */ jsx14(
                  "span",
                  {
                    style: {
                      color: "var(--color-text-primary, #0D0D0D)",
                      fontSize: "var(--text-small-size, 12px)",
                      fontWeight: 600,
                      lineHeight: 1.5
                    },
                    children: label
                  }
                ) : /* @__PURE__ */ jsx14("span", {}),
                showValue && /* @__PURE__ */ jsxs10(
                  "span",
                  {
                    style: {
                      color: "var(--color-text-secondary, #757575)",
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
          /* @__PURE__ */ jsx14(
            "div",
            {
              style: {
                ...lineTrackStyle,
                position: "relative",
                overflow: "hidden",
                width: "100%"
              },
              children: /* @__PURE__ */ jsx14(
                "div",
                {
                  className: "progress-bar-fill",
                  style: {
                    ...lineFillStyle,
                    opacity: resolvedAnimation === "pulse" ? 0.92 : 1,
                    animation: resolvedAnimation === "pulse" ? "progress-pulse 1.4s ease-in-out infinite" : void 0
                  },
                  children: showStripeOverlay && /* @__PURE__ */ jsx14(
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
  const [animatedOffset, setAnimatedOffset] = React11.useState(circumference);
  React11.useEffect(() => {
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
  const circleId = React11.useId();
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
                gradient && /* @__PURE__ */ jsx14("defs", { children: /* @__PURE__ */ jsxs10("linearGradient", { id: `progress-gradient-${circleId}`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                  /* @__PURE__ */ jsx14("stop", { offset: "0%", stopColor: "#60A5FA" }),
                  /* @__PURE__ */ jsx14("stop", { offset: "100%", stopColor: "#8B5CF6" })
                ] }) }),
                /* @__PURE__ */ jsx14(
                  "circle",
                  {
                    cx: dims / 2,
                    cy: dims / 2,
                    r: radius,
                    strokeWidth: effectiveStrokeWidth,
                    style: { stroke: trackFill, fill: "none" }
                  }
                ),
                /* @__PURE__ */ jsx14(
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
              /* @__PURE__ */ jsx14(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "var(--color-text-primary, #0D0D0D)",
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
        showLabel && label && /* @__PURE__ */ jsx14(
          "div",
          {
            style: {
              color: "var(--color-text-secondary, #757575)",
              fontSize: "var(--text-small-size, 12px)",
              textAlign: "center",
              lineHeight: 1.5
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsx14("style", { children: `
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
import React12 from "react";
import { jsx as jsx15 } from "react/jsx-runtime";
var defaultGradient = "linear-gradient(135deg, var(--color-brand-primary, #0d0d0d) 0%, var(--color-brand-secondary, #10b981) 100%)";
var GradientText = React12.memo(function GradientText2({
  children,
  as: Component = "span",
  gradient = defaultGradient,
  fallbackColor = "var(--color-brand-primary, #0d0d0d)",
  className = "",
  style
}) {
  return /* @__PURE__ */ jsx15(
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
import React13, { useEffect as useEffect3, useId as useId8, useRef as useRef5, useState as useState8 } from "react";

// src/components/atoms/ToolTip/TooltipIcon.config.ts
var defaultTooltipOptions = {
  placement: "top",
  delay: 60,
  size: 16,
  color: "currentColor"
};

// src/assets/tooltip-icon.svg
var tooltip_icon_default = 'data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M7.2 12H8.8V7.2H7.2V12ZM8 5.6C8.22667 5.6 8.4168 5.5232 8.5704 5.3696C8.72347 5.21653 8.8 5.02667 8.8 4.8C8.8 4.57333 8.72347 4.3832 8.5704 4.2296C8.4168 4.07653 8.22667 4 8 4C7.77333 4 7.58347 4.07653 7.4304 4.2296C7.2768 4.3832 7.2 4.57333 7.2 4.8C7.2 5.02667 7.2768 5.21653 7.4304 5.3696C7.58347 5.5232 7.77333 5.6 8 5.6ZM8 16C6.89333 16 5.85333 15.7899 4.88 15.3696C3.90667 14.9499 3.06 14.38 2.34 13.66C1.62 12.94 1.05013 12.0933 0.6304 11.12C0.210133 10.1467 0 9.10667 0 8C0 6.89333 0.210133 5.85333 0.6304 4.88C1.05013 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.04987 4.88 0.6296C5.85333 0.209867 6.89333 0 8 0C9.10667 0 10.1467 0.209867 11.12 0.6296C12.0933 1.04987 12.94 1.62 13.66 2.34C14.38 3.06 14.9499 3.90667 15.3696 4.88C15.7899 5.85333 16 6.89333 16 8C16 9.10667 15.7899 10.1467 15.3696 11.12C14.9499 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.9499 11.12 15.3696C10.1467 15.7899 9.10667 16 8 16ZM8 14.4C9.78667 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78667 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78667 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78667 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z" fill="%23666666"/>%0A</svg>%0A';

// src/components/atoms/ToolTip/index.tsx
import { jsx as jsx16, jsxs as jsxs11 } from "react/jsx-runtime";
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
  const tooltipId = useId8();
  const triggerRef = useRef5(null);
  const openTimerRef = useRef5(null);
  const closeTimerRef = useRef5(null);
  const [isOpen, setIsOpen] = useState8(false);
  const clearTimers = () => {
    if (openTimerRef.current)
      clearTimeout(openTimerRef.current);
    if (closeTimerRef.current)
      clearTimeout(closeTimerRef.current);
    openTimerRef.current = null;
    closeTimerRef.current = null;
  };
  useEffect3(() => {
    return () => {
      clearTimers();
    };
  }, []);
  const showTooltip = () => {
    clearTimers();
    openTimerRef.current = setTimeout(() => setIsOpen(true), delay);
  };
  const hideTooltip = () => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => setIsOpen(false), closeDelay);
  };
  const placementStyleMap = {
    top: {
      bottom: `calc(100% + 10px)`,
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: `calc(100% + 10px)`,
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: `calc(100% + 10px)`,
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: `calc(100% + 10px)`,
      top: "50%",
      transform: "translateY(-50%)"
    }
  };
  const arrowStyleMap = {
    top: {
      left: "50%",
      top: "100%",
      transform: "translateX(-50%)",
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent",
      borderTop: "6px solid currentColor"
    },
    bottom: {
      left: "50%",
      bottom: "100%",
      transform: "translateX(-50%)",
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent",
      borderBottom: "6px solid currentColor"
    },
    left: {
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderTop: "6px solid transparent",
      borderBottom: "6px solid transparent",
      borderLeft: "6px solid currentColor"
    },
    right: {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderTop: "6px solid transparent",
      borderBottom: "6px solid transparent",
      borderRight: "6px solid currentColor"
    }
  };
  const tooltipBackground = variant === "light" ? "var(--color-bg-surface, #FFFFFF)" : "var(--color-text-primary, #0D0D0D)";
  const tooltipForeground = variant === "light" ? "var(--color-text-primary, #0D0D0D)" : "var(--color-bg-surface, #FFFFFF)";
  const tooltipBorder = variant === "light" ? "1px solid rgba(153, 153, 153, 0.3)" : "1px solid transparent";
  const renderTooltipMedia = () => {
    if (!tooltipContentIcon)
      return null;
    if (React13.isValidElement(tooltipContentIcon)) {
      return tooltipContentIcon;
    }
    if (typeof tooltipContentIcon !== "string" && !(typeof tooltipContentIcon === "object" && tooltipContentIcon !== null && ("src" in tooltipContentIcon || "default" in tooltipContentIcon))) {
      return null;
    }
    return /* @__PURE__ */ jsx16(
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
        children || /* @__PURE__ */ jsx16(
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
            id: `tooltip-${tooltipId}`,
            role: "tooltip",
            style: {
              position: "absolute",
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
              ...placementStyleMap[placement]
            },
            children: [
              /* @__PURE__ */ jsx16(
                "span",
                {
                  style: {
                    position: "absolute",
                    width: 0,
                    height: 0,
                    color: tooltipBackground,
                    ...arrowStyleMap[placement]
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
                    /* @__PURE__ */ jsx16("span", { children: content != null ? content : tooltipText })
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
import React14, {
  createContext as createContext6,
  forwardRef as forwardRef2,
  useContext as useContext6,
  useMemo as useMemo8
} from "react";
import { jsx as jsx17, jsxs as jsxs12 } from "react/jsx-runtime";
var CardContext = createContext6(null);
function useCardContext(component) {
  const ctx = useContext6(CardContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Card>`);
  }
  return ctx;
}
function cls11(...parts) {
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
  return React14.Children.toArray(children).some((child) => {
    if (!React14.isValidElement(child))
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
var CardRoot = forwardRef2(function Card({
  title,
  subtitle,
  extra,
  cover,
  actions,
  actionsAlign = "left",
  footer,
  bordered: _legacyBordered = true,
  hoverable = false,
  variant = "outlined",
  elevation,
  selected = false,
  padding: paddingProp,
  radius = "var(--radius-lg)",
  size = "default",
  style,
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  ...rest
}, ref) {
  const [isHovered, setIsHovered] = React14.useState(false);
  const resolvedVariant = normalizeVariant(variant);
  const isIndicatorCard = resolvedVariant === "withIndicator";
  const isElevated = resolvedVariant === "elevated" || isIndicatorCard;
  const paddingVar = paddingProp !== void 0 ? toCssSize2(paddingProp, "24px") : size === "sm" ? "var(--space-2)" : "var(--space-3)";
  const resolvedRadius = toCssSize2(radius, "8px");
  const resolvedElevation = elevation != null ? elevation : isElevated ? "sm" : "none";
  const showBorder = resolvedVariant === "bordered";
  const boxShadowResolved = showBorder ? "var(--shadow-none)" : isElevated ? getShadow(resolvedElevation, isHovered, Boolean(hoverable) && isElevated) : "var(--shadow-none)";
  const borderSpec = showBorder ? "1px solid var(--color-border-default)" : "1px solid transparent";
  const compound = hasCompoundStructure(children);
  const ctxValue = useMemo8(
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
    boxShadow: boxShadowResolved,
    transition: "box-shadow 180ms ease, transform 180ms ease",
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
        cover && /* @__PURE__ */ jsx17("div", { children: cover }),
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
                title && /* @__PURE__ */ jsx17(
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
                subtitle && /* @__PURE__ */ jsx17(
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
              extra && /* @__PURE__ */ jsx17("div", { style: { flexShrink: 0 }, children: extra })
            ]
          }
        ),
        children && /* @__PURE__ */ jsx17(
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
        actions && /* @__PURE__ */ jsx17("div", { style: actionsStyle, children: actions }),
        footer && /* @__PURE__ */ jsx17(
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
  const inner = compound ? /* @__PURE__ */ jsx17(CardContext.Provider, { value: ctxValue, children: /* @__PURE__ */ jsx17("div", { className: "card-inner--compound", children }) }) : mainColumn;
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      ref,
      ...rest,
      style: outerStyle,
      className: cls11(
        compound && "card-root",
        compound && size === "sm" && "card-root--sm",
        className
      ),
      "data-card-variant": resolvedVariant,
      "data-card-size": compound ? size : void 0,
      "data-selected": showIndicator ? "true" : void 0,
      onMouseEnter: (event) => {
        setIsHovered(true);
        onMouseEnter == null ? void 0 : onMouseEnter(event);
      },
      onMouseLeave: (event) => {
        setIsHovered(false);
        onMouseLeave == null ? void 0 : onMouseLeave(event);
      },
      children: [
        showIndicator && /* @__PURE__ */ jsx17(
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
var CardHeader = forwardRef2(function CardHeader2({ className, ...rest }, ref) {
  useCardContext("CardHeader");
  return /* @__PURE__ */ jsx17("div", { ref, className: cls11("card-header", className), ...rest });
});
CardHeader.displayName = "CardHeader";
var CardTitle = forwardRef2(function CardTitle2({ as: Comp = "h3", className, ...rest }, ref) {
  useCardContext("CardTitle");
  return /* @__PURE__ */ jsx17(Comp, { ref, className: cls11("card-title", className), ...rest });
});
CardTitle.displayName = "CardTitle";
var CardDescription = forwardRef2(
  function CardDescription2({ as: Comp = "p", className, ...rest }, ref) {
    useCardContext("CardDescription");
    return /* @__PURE__ */ jsx17(Comp, { ref, className: cls11("card-description", className), ...rest });
  }
);
CardDescription.displayName = "CardDescription";
var CardAction = forwardRef2(function CardAction2({ className, ...rest }, ref) {
  useCardContext("CardAction");
  return /* @__PURE__ */ jsx17("div", { ref, className: cls11("card-action", className), ...rest });
});
CardAction.displayName = "CardAction";
var CardContent = forwardRef2(function CardContent2({ className, noPadding, ...rest }, ref) {
  useCardContext("CardContent");
  return /* @__PURE__ */ jsx17(
    "div",
    {
      ref,
      className: cls11(
        "card-content",
        noPadding && "card-content--no-padding",
        className
      ),
      ...rest
    }
  );
});
CardContent.displayName = "CardContent";
var CardFooter = forwardRef2(function CardFooter2({ className, borderTop = true, ...rest }, ref) {
  useCardContext("CardFooter");
  return /* @__PURE__ */ jsx17(
    "div",
    {
      ref,
      className: cls11(
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
import { useCallback as useCallback8, useEffect as useEffect5, useId as useId9, useMemo as useMemo10, useRef as useRef7, useState as useState10 } from "react";
import { createPortal as createPortal2 } from "react-dom";

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
import { useEffect as useEffect4, useMemo as useMemo9, useRef as useRef6, useState as useState9 } from "react";

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
      return "var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08))";
    case "lg":
      return "var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.12))";
    case "md":
    default:
      return "var(--shadow-md, 0 4px 16px rgba(0, 0, 0, 0.10))";
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
  primary: "var(--button-primary-default-bg, #2563EB)",
  primaryHover: "rgba(37, 99, 235, 0.08)",
  primaryText: "#FFFFFF",
  rangeBackground: "var(--color-accent-sky-10, #E6F2FF)",
  todayBackground: "var(--color-accent-amber-10, #FFF6DD)",
  todayRing: "rgba(245, 158, 11, 0.5)",
  text: "var(--color-text-primary, #0D0D0D)",
  textSecondary: "var(--color-text-secondary, #6B7280)",
  textDisabled: "#B0B0B0",
  background: "var(--color-bg-surface, #FFFFFF)",
  border: "var(--color-border-default, #e5e7eb)",
  selectBorder: "var(--color-border-default, #e5e7eb)",
  focusRing: "rgba(37, 99, 235, 0.25)",
  padding: 12,
  gap: 2,
  cellSize: 36,
  borderRadius: 8,
  cellRadius: 6,
  navButtonSize: 28,
  cellFontSize: 14,
  weekdayFontSize: 11,
  fontFamily: 'var(--font-family, "Inter"), system-ui, sans-serif',
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
import { jsx as jsx18, jsxs as jsxs13 } from "react/jsx-runtime";
function ChevronLeft({ size = 16 }) {
  return /* @__PURE__ */ jsx18("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx18(
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
  return /* @__PURE__ */ jsx18("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx18(
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
var Calendar = ({
  month: monthProp,
  hideNavigation = false,
  captionLayout = "dropdown",
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
  const [isHovered, setIsHovered] = useState9(false);
  const resolvedElevation = resolveElevation(elevationProp, variant);
  const boxShadow = (_a = themeProp == null ? void 0 : themeProp.boxShadow) != null ? _a : hoverable && isHovered ? getElevationShadow("lg") : getElevationShadow(resolvedElevation);
  const theme = useMemo9(
    () => getResolvedTheme(themeProp, size),
    [themeProp, size]
  );
  const cssVars = useMemo9(() => themeToCssVars(theme), [theme]);
  const isControlled = value !== void 0;
  const isRangeControlled = rangeValue !== void 0;
  const minParsed = useMemo9(() => {
    var _a2;
    if (!minDate)
      return null;
    if (minDate instanceof Date)
      return minDate;
    return (_a2 = parseDate(minDate, "YYYY-MM-DD")) != null ? _a2 : parseDate(minDate, "MM/DD/YYYY");
  }, [minDate]);
  const maxParsed = useMemo9(() => {
    var _a2;
    if (!maxDate)
      return null;
    if (maxDate instanceof Date)
      return maxDate;
    return (_a2 = parseDate(maxDate, "YYYY-MM-DD")) != null ? _a2 : parseDate(maxDate, "MM/DD/YYYY");
  }, [maxDate]);
  const [internalValue, setInternalValue] = useState9(
    defaultValue != null ? defaultValue : null
  );
  const [internalRange, setInternalRange] = useState9([null, null]);
  const selectedDate = isControlled ? value : internalValue;
  const selectedRange = isRangeControlled ? rangeValue : internalRange;
  const isMonthControlled = monthProp !== void 0;
  const [internalMonth, setInternalMonth] = useState9(
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
  useEffect4(() => {
    if (isMonthControlled)
      return;
    const anchor = selectedDate || selectedRange[0] || selectedRange[1] || /* @__PURE__ */ new Date();
    setInternalMonth(startOfMonth(anchor));
  }, [isMonthControlled, selectedDate, selectedRange[0], selectedRange[1]]);
  const calendarDays = useMemo9(
    () => getCalendarDaysWithFirstDay(visibleMonth, firstDayOfWeek),
    [visibleMonth, firstDayOfWeek]
  );
  const weekdayLabels = useMemo9(
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
  const slideDirectionRef = useRef6("next");
  const isInitialMountRef = useRef6(true);
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
  const resolvedBackground = variant === "filled" ? "var(--color-bg-page, #F3F4F6)" : (_c = theme.background) != null ? _c : "var(--color-bg-surface, #FFFFFF)";
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
    overflow: "hidden",
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
    color: (_k = theme.text) != null ? _k : "var(--color-text-primary, #0D0D0D)",
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
    color: (_o = theme.text) != null ? _o : "var(--color-text-primary, #0D0D0D)",
    backgroundColor: (_p = theme.background) != null ? _p : "var(--color-bg-surface, #FFFFFF)",
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
    color: (_s = theme.textSecondary) != null ? _s : "var(--color-text-secondary, #6B7280)",
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
      className: `calendar-root calendar-root--variant-${variant} ${captionLayout === "label" ? "calendar-root--caption-label" : ""} ${className}`.trim(),
      style: containerStyle,
      onMouseEnter: () => hoverable && setIsHovered(true),
      onMouseLeave: () => hoverable && setIsHovered(false),
      children: [
        !hideNavigation && /* @__PURE__ */ jsxs13("div", { style: headerStyle, children: [
          /* @__PURE__ */ jsx18(
            "button",
            {
              type: "button",
              onClick: handlePrevMonth,
              disabled,
              style: navButtonStyle,
              className: "calendar-nav-btn",
              "aria-label": "Previous month",
              children: /* @__PURE__ */ jsx18(ChevronLeft, {})
            }
          ),
          captionLayout === "label" ? /* @__PURE__ */ jsx18(
            "div",
            {
              className: "calendar-caption-label",
              style: {
                flex: 1,
                minWidth: 0,
                textAlign: "center",
                fontSize: (_v = theme.cellFontSize) != null ? _v : 14,
                fontWeight: 600,
                color: (_w = theme.text) != null ? _w : "var(--color-text-primary, #0D0D0D)"
              },
              children: captionLabel
            }
          ) : /* @__PURE__ */ jsxs13("div", { style: { display: "flex", gap: 8, flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsx18(
              "select",
              {
                value: visibleMonth.getMonth(),
                onChange: (e) => handleMonthChange(parseInt(e.target.value, 10)),
                disabled,
                style: selectStyle,
                className: "calendar-select",
                "aria-label": "Select month",
                children: monthOptions.map((opt) => /* @__PURE__ */ jsx18("option", { value: opt.value, children: opt.label }, opt.value))
              }
            ),
            /* @__PURE__ */ jsx18(
              "select",
              {
                value: visibleMonth.getFullYear(),
                onChange: (e) => handleYearChange(parseInt(e.target.value, 10)),
                disabled,
                style: selectStyle,
                className: "calendar-select",
                "aria-label": "Select year",
                children: yearOptions.map((opt) => /* @__PURE__ */ jsx18("option", { value: opt.value, children: opt.label }, opt.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsx18(
            "button",
            {
              type: "button",
              onClick: handleNextMonth,
              disabled,
              style: navButtonStyle,
              className: "calendar-nav-btn",
              "aria-label": "Next month",
              children: /* @__PURE__ */ jsx18(ChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxs13("div", { style: weekdayGridStyle, children: [
          showWeekNumbers && /* @__PURE__ */ jsx18("div", { style: weekdayHeaderStyle, "aria-hidden": "true", children: "#" }),
          weekdayLabels.map((label) => /* @__PURE__ */ jsx18("div", { style: weekdayHeaderStyle, children: label }, label))
        ] }),
        /* @__PURE__ */ jsx18(
          "div",
          {
            className: animClass,
            children: Array.from({ length: 6 }, (_, rowIdx) => {
              var _a2, _b2;
              const rowDays = calendarDays.slice(rowIdx * 7, (rowIdx + 1) * 7);
              const firstDayOfRow = rowDays[0];
              const weekNum = firstDayOfRow ? getWeekNumber(firstDayOfRow.date) : null;
              return /* @__PURE__ */ jsxs13("div", { style: gridStyle, children: [
                showWeekNumbers && /* @__PURE__ */ jsx18(
                  "div",
                  {
                    style: {
                      ...cellBaseStyle,
                      fontSize: (_a2 = theme.weekdayFontSize) != null ? _a2 : 11,
                      color: (_b2 = theme.textSecondary) != null ? _b2 : "var(--color-text-secondary, #757575)"
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
                    color: isDisabled ? (_a3 = theme.textDisabled) != null ? _a3 : "#B0B0B0" : !day.inCurrentMonth ? (_b3 = theme.textSecondary) != null ? _b3 : "#9CA3AF" : isSelected ? (_c2 = theme.primaryText) != null ? _c2 : "#FFFFFF" : (_d2 = theme.text) != null ? _d2 : "var(--color-text-primary, #0D0D0D)",
                    background: isSelected ? (_e2 = theme.primary) != null ? _e2 : "var(--button-primary-default-bg, #2563EB)" : isInRange ? (_f2 = theme.rangeBackground) != null ? _f2 : "var(--color-accent-sky-10, #E6F2FF)" : isToday ? (_g2 = theme.todayBackground) != null ? _g2 : "var(--color-accent-amber-10, #FFF6DD)" : "transparent",
                    fontWeight: isSelected ? 700 : isToday ? 600 : 500,
                    boxShadow: isToday && !isSelected ? `inset 0 0 0 2px ${(_h2 = theme.todayRing) != null ? _h2 : "rgba(245, 158, 11, 0.5)"}` : void 0
                  };
                  return /* @__PURE__ */ jsx18(
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
import { jsx as jsx19, jsxs as jsxs14 } from "react/jsx-runtime";
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
  rangeSeparator = defaultDatePickerOptions.rangeSeparator
}) => {
  const dateFormat = (dateFormatProp || defaultDatePickerOptions.dateFormat).trim() || defaultDatePickerOptions.dateFormat;
  const inputId = useId9();
  const wrapperRef = useRef7(null);
  const popoverRef = useRef7(null);
  const [internalError, setInternalError] = useState10("");
  const [isOpen, setIsOpen] = useState10(false);
  const [isPortalReady, setIsPortalReady] = useState10(false);
  const [isDesktopRangeLayout, setIsDesktopRangeLayout] = useState10(false);
  const [popoverStyle, setPopoverStyle] = useState10({});
  const initialRangeValues = useMemo10(() => splitRangeValue(value), [value]);
  const initialParsedSingle = useMemo10(() => parseFlexibleDate(value, dateFormat), [value, dateFormat]);
  const initialParsedStart = useMemo10(() => parseFlexibleDate(initialRangeValues[0], dateFormat), [initialRangeValues[0], dateFormat]);
  const initialParsedEnd = useMemo10(() => parseFlexibleDate(initialRangeValues[1], dateFormat), [initialRangeValues[1], dateFormat]);
  const [startDate, setStartDate] = useState10(() => initialParsedStart);
  const [endDate, setEndDate] = useState10(() => initialParsedEnd);
  const [singleDate, setSingleDate] = useState10(() => initialParsedSingle);
  const [visibleMonth, setVisibleMonth] = useState10(
    () => startOfMonth(initialParsedStart || initialParsedEnd || initialParsedSingle || /* @__PURE__ */ new Date())
  );
  const [inputText, setInputText] = useState10(
    () => range ? "" : initialParsedSingle ? formatDateForDisplay(initialParsedSingle, dateFormat) : value || ""
  );
  const [rangeStartInput, setRangeStartInput] = useState10(
    () => range ? initialParsedStart ? formatDateForDisplay(initialParsedStart, dateFormat) : initialRangeValues[0] || "" : ""
  );
  const [rangeEndInput, setRangeEndInput] = useState10(
    () => range ? initialParsedEnd ? formatDateForDisplay(initialParsedEnd, dateFormat) : initialRangeValues[1] || "" : ""
  );
  useEffect5(() => {
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
  useEffect5(() => {
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
      zIndex: 1400
    });
  }, [range]);
  useEffect5(() => {
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
    sm: { minHeight: 36, paddingX: 12, fontSize: "var(--text-small-size, 12px)" },
    md: { minHeight: 44, paddingX: 14, fontSize: "var(--text-body-size, 16px)" },
    lg: { minHeight: 48, paddingX: 16, fontSize: "var(--text-body-size, 16px)" }
  }[size];
  const resolvedStatus = status != null ? status : error ? "error" : void 0;
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : resolvedStatus === "warning" ? "var(--color-state-warning, #FFC107)" : resolvedStatus === "success" ? "var(--color-state-success, #28A745)" : "var(--color-border-default, #999999)";
  const shellStyle = {
    width: fullWidth ? "100%" : "auto",
    display: fullWidth ? "block" : "inline-block"
  };
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: disabled ? "var(--color-text-secondary, #757575)" : "var(--color-text-primary, #0D0D0D)",
    fontSize: "var(--text-secondary-size, 14px)",
    fontWeight: 500,
    lineHeight: 1.5
  };
  const fieldBaseStyle = variant === "filled" ? {
    minHeight: currentSize.minHeight,
    backgroundColor: "var(--color-bg-page, #F3F4F6)",
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
    backgroundColor: "var(--color-bg-surface, #FFFFFF)",
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
    color: disabled ? "var(--color-text-secondary, #757575)" : "var(--color-text-primary, #0D0D0D)",
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
    color: resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : "var(--color-text-secondary, #757575)",
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
    color: "var(--color-text-primary, #0D0D0D)",
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
    border: "1px solid var(--color-border-default, #e5e7eb)",
    background: "var(--color-bg-surface, #FFFFFF)",
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
  if (range) {
    return /* @__PURE__ */ jsxs14("div", { className, style: shellStyle, ref: wrapperRef, children: [
      label && /* @__PURE__ */ jsx19("label", { style: labelStyle, children: label }),
      /* @__PURE__ */ jsxs14("div", { style: triggerShellStyle, children: [
        /* @__PURE__ */ jsx19(
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
        /* @__PURE__ */ jsx19("span", { style: { color: "var(--color-text-secondary, #757575)", fontSize: 14, flexShrink: 0 }, children: rangeSeparator }),
        /* @__PURE__ */ jsx19(
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
        /* @__PURE__ */ jsx19(
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
              color: "var(--color-text-secondary, #757575)",
              cursor: disabled ? "not-allowed" : "pointer"
            },
            onClick: () => !disabled && setIsOpen((prev) => !prev),
            onMouseDown: (e) => e.preventDefault(),
            "aria-label": "Open calendar",
            disabled,
            children: /* @__PURE__ */ jsxs14("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
              /* @__PURE__ */ jsx19("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
              /* @__PURE__ */ jsx19("path", { d: "M3 10h18", stroke: "currentColor", strokeWidth: "1.5" }),
              /* @__PURE__ */ jsx19("path", { d: "M8 3v4M16 3v4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
            ] })
          }
        )
      ] }),
      isPortalReady && isOpen && createPortal2(
        /* @__PURE__ */ jsx19(
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
                    /* @__PURE__ */ jsx19(
                      "button",
                      {
                        type: "button",
                        style: navButtonStyle,
                        className: "calendar-nav-btn",
                        onClick: () => setVisibleMonth(addMonths(visibleMonth, -1)),
                        disabled,
                        "aria-label": "Previous month",
                        children: /* @__PURE__ */ jsx19("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx19("path", { d: "M15 18l-6-6 6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
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
                          color: "var(--color-text-primary, #0D0D0D)"
                        },
                        children: [
                          visibleMonth.toLocaleDateString(void 0, { month: "long", year: "numeric" }),
                          " \u2013 ",
                          addMonths(visibleMonth, 1).toLocaleDateString(void 0, { month: "long", year: "numeric" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx19(
                      "button",
                      {
                        type: "button",
                        style: navButtonStyle,
                        className: "calendar-nav-btn",
                        onClick: () => setVisibleMonth(addMonths(visibleMonth, 1)),
                        disabled,
                        "aria-label": "Next month",
                        children: /* @__PURE__ */ jsx19("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx19("path", { d: "M9 18l6-6-6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs14("div", { style: rangeCalendarsStyle, children: [
                /* @__PURE__ */ jsx19(
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
                /* @__PURE__ */ jsx19(
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
      helperMessage && /* @__PURE__ */ jsx19("p", { style: helperStyle, children: helperMessage })
    ] });
  }
  return /* @__PURE__ */ jsxs14("div", { className, style: shellStyle, ref: wrapperRef, children: [
    label && /* @__PURE__ */ jsx19("label", { htmlFor: inputId, style: labelStyle, children: label }),
    /* @__PURE__ */ jsxs14("div", { style: triggerShellStyle, children: [
      /* @__PURE__ */ jsx19(
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
      /* @__PURE__ */ jsx19(
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
            color: "var(--color-text-secondary, #757575)",
            cursor: disabled ? "not-allowed" : "pointer"
          },
          onClick: () => !disabled && setIsOpen((prev) => !prev),
          onMouseDown: (e) => e.preventDefault(),
          "aria-label": "Open calendar",
          disabled,
          children: /* @__PURE__ */ jsxs14("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx19("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
            /* @__PURE__ */ jsx19("path", { d: "M3 10h18", stroke: "currentColor", strokeWidth: "1.5" }),
            /* @__PURE__ */ jsx19("path", { d: "M8 3v4M16 3v4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
          ] })
        }
      )
    ] }),
    isPortalReady && isOpen && createPortal2(
      /* @__PURE__ */ jsx19(
        "div",
        {
          ref: popoverRef,
          role: "dialog",
          "aria-label": "Choose date",
          "aria-modal": "false",
          style: popoverPanelStyle,
          children: /* @__PURE__ */ jsx19(
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
    helperMessage && /* @__PURE__ */ jsx19("p", { style: helperStyle, children: helperMessage })
  ] });
};
var DatePicker_default = DatePicker;

// src/components/atoms/OtpBox/index.tsx
import { useState as useState11, useId as useId10, useEffect as useEffect6, useRef as useRef8 } from "react";
import { jsx as jsx20, jsxs as jsxs15 } from "react/jsx-runtime";
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
  const [otpValue, setOtpValue] = useState11(value);
  const inputRef = useRef8(null);
  const boxRefs = useRef8([]);
  const inputId = useId10();
  useEffect6(() => {
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
  const boxSize = size === "sm" ? 36 : size === "lg" ? 48 : 40;
  const boxFont = size === "sm" ? 18 : size === "lg" ? 26 : 22;
  const boxGap = size === "sm" ? 8 : size === "lg" ? 12 : 10;
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
    return /* @__PURE__ */ jsx20("div", { className: rootClasses, "data-disabled": disabled || void 0, children: /* @__PURE__ */ jsxs15("div", { className: "otp-box-wrapper", children: [
      label && /* @__PURE__ */ jsx20("label", { htmlFor: inputId, className: "otp-box-label", children: label }),
      /* @__PURE__ */ jsx20(
        "div",
        {
          className: "otp-box-cells",
          style: {
            display: "flex",
            gap: `${boxGap}px`,
            flexWrap: "nowrap",
            width: "fit-content"
          },
          children: Array.from({ length }).map((_, i) => {
            var _a;
            return /* @__PURE__ */ jsx20(
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
                  width: boxSize,
                  height: boxSize,
                  minWidth: boxSize,
                  minHeight: boxSize,
                  maxWidth: boxSize,
                  maxHeight: boxSize,
                  padding: 0,
                  margin: 0,
                  textAlign: "center",
                  lineHeight: `${boxSize - 4}px`,
                  fontSize: boxFont,
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
        /* @__PURE__ */ jsx20(Icon_default, { src: error_default, width: 14, height: 14, color: "var(--color-state-error)" }),
        displayError
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx20("div", { className: rootClasses, "data-disabled": disabled || void 0, children: /* @__PURE__ */ jsxs15("div", { className: "otp-box-wrapper", children: [
    label && /* @__PURE__ */ jsx20("label", { htmlFor: inputId, className: "otp-box-label", children: label }),
    /* @__PURE__ */ jsx20(
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
      /* @__PURE__ */ jsx20(Icon_default, { src: error_default, width: 14, height: 14, color: "var(--color-state-error)" }),
      displayError
    ] })
  ] }) });
};
var OtpBox_default = OtpBox;

// src/components/atoms/Divider/index.tsx
import { jsx as jsx21, jsxs as jsxs16 } from "react/jsx-runtime";
var Divider = ({
  className = "",
  orientation = "horizontal",
  length,
  thickness = "1px",
  color = "var(--color-border-subtle, var(--color-mist-60, #ededed))",
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
    return /* @__PURE__ */ jsx21(
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
    return /* @__PURE__ */ jsx21(
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
    color: "var(--color-text-secondary, #757575)",
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
          /* @__PURE__ */ jsx21("span", { style: { width: "100%", borderTop: lineBorder } }),
          /* @__PURE__ */ jsx21("span", { style: { ...contentStyle, marginTop: 8 }, children })
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
          /* @__PURE__ */ jsx21("span", { style: { ...contentStyle, marginBottom: 8 }, children }),
          /* @__PURE__ */ jsx21("span", { style: { width: "100%", borderTop: lineBorder } })
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
        /* @__PURE__ */ jsx21("span", { style: { ...lineStyle, flex: startFlex } }),
        /* @__PURE__ */ jsx21("span", { style: contentStyle, children }),
        /* @__PURE__ */ jsx21("span", { style: { ...lineStyle, flex: endFlex } })
      ]
    }
  );
};
var Divider_default = Divider;

// src/components/molecules/Combobox/index.tsx
import React18, { useCallback as useCallback9, useEffect as useEffect7, useId as useId11, useMemo as useMemo11, useState as useState12 } from "react";
import { jsx as jsx22, jsxs as jsxs17 } from "react/jsx-runtime";
function cls12(...parts) {
  return parts.filter(Boolean).join(" ");
}
function flattenOptions(options, groups) {
  if (groups == null ? void 0 : groups.length)
    return groups.flatMap((g) => g.options);
  return options != null ? options : [];
}
function ChevronDown() {
  return /* @__PURE__ */ jsx22("svg", { className: "ds-combobox__chevron", viewBox: "0 0 20 20", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx22("path", { d: "M5 7.5L10 12.5L15 7.5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
var Combobox = React18.memo(function Combobox2({
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
  ...rest
}) {
  const reactId = useId11();
  const base = reactId.replace(/:/g, "");
  const listboxId = `ds-combobox-lb-${base}`;
  const searchId = `ds-combobox-search-${base}`;
  const labelId = `ds-combobox-lbl-${base}`;
  const isControlled = valueProp !== void 0;
  const [open, setOpen] = useState12(false);
  const [search, setSearch] = useState12("");
  useEffect7(() => {
    if (!open)
      setSearch("");
  }, [open]);
  const [innerValue, setInnerValue] = useState12(() => {
    if (defaultValue !== void 0)
      return defaultValue;
    return multiple ? [] : "";
  });
  const selected = isControlled ? valueProp : innerValue;
  const allOptions = useMemo11(() => flattenOptions(options, groups), [options, groups]);
  const useGroups = Boolean(groups == null ? void 0 : groups.length);
  const filteredFlat = useMemo11(() => {
    const base2 = options != null ? options : [];
    const q = search.trim().toLowerCase();
    if (!searchable || !q)
      return base2;
    return base2.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, search, searchable]);
  const filteredGroups = useMemo11(() => {
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
  const displayTrigger = useMemo11(() => {
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
  const sizeStyles = useMemo11(() => {
    const map = {
      sm: { minH: 36, font: "var(--text-small-size, 12px)" },
      md: { minH: 44, font: "var(--text-body-size, 16px)" },
      lg: { minH: 48, font: "var(--text-body-size, 16px)" }
    };
    return map[size];
  }, [size]);
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : "var(--color-border-default, #999999)";
  const renderOptionRow = (opt) => {
    const sel = isSelected(opt.value);
    return /* @__PURE__ */ jsxs17(
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
          opt.icon ? /* @__PURE__ */ jsx22("span", { className: "ds-combobox__option-icon", children: opt.icon }) : null,
          /* @__PURE__ */ jsx22("span", { className: "ds-combobox__option-label", children: opt.label }),
          multiple && sel ? /* @__PURE__ */ jsx22("svg", { className: "ds-combobox__check", viewBox: "0 0 16 16", "aria-hidden": true, children: /* @__PURE__ */ jsx22(
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
  return /* @__PURE__ */ jsxs17(
    "div",
    {
      ...rest,
      id: idProp,
      className: cls12("ds-combobox", className),
      style: {
        width: fullWidth ? "100%" : "auto",
        display: fullWidth ? "block" : "inline-block",
        ...style
      },
      "data-open": open ? "true" : "false",
      "data-disabled": disabled ? "true" : "false",
      "data-status": resolvedStatus,
      children: [
        /* @__PURE__ */ jsxs17(Popover, { open, onOpenChange: setOpen, placement: "bottom-start", children: [
          label ? /* @__PURE__ */ jsx22("div", { id: labelId, className: "ds-combobox__label", children: label }) : null,
          /* @__PURE__ */ jsxs17(
            PopoverTrigger,
            {
              type: "button",
              role: "combobox",
              disabled,
              className: "ds-combobox__trigger",
              "aria-labelledby": label ? labelId : void 0,
              "aria-label": label ? void 0 : placeholder != null ? placeholder : "Select option",
              hasPopup: "listbox",
              "aria-expanded": open,
              "aria-controls": listboxId,
              style: {
                "--combobox-min-h": `${sizeStyles.minH}px`,
                "--combobox-font-size": sizeStyles.font,
                "--combobox-border": borderColor
              },
              children: [
                /* @__PURE__ */ jsxs17("span", { className: "ds-combobox__trigger-inner", children: [
                  displayTrigger.icon ? /* @__PURE__ */ jsx22("span", { className: "ds-combobox__trigger-icon", children: displayTrigger.icon }) : null,
                  /* @__PURE__ */ jsx22(
                    "span",
                    {
                      className: cls12(
                        "ds-combobox__trigger-label",
                        displayTrigger.placeholder && "ds-combobox__trigger-label--placeholder"
                      ),
                      children: displayTrigger.text
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx22(ChevronDown, {})
              ]
            }
          ),
          /* @__PURE__ */ jsx22(
            PopoverContent,
            {
              role: "none",
              className: "ds-combobox__popover",
              style: listMinWidth != null ? { minWidth: listMinWidth } : void 0,
              children: /* @__PURE__ */ jsxs17("div", { className: "ds-combobox__panel", children: [
                searchable ? /* @__PURE__ */ jsx22(
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
                !hasList ? /* @__PURE__ */ jsx22("div", { className: "ds-combobox__empty", role: "status", children: "No results" }) : useGroups && filteredGroups ? /* @__PURE__ */ jsx22(
                  "div",
                  {
                    id: listboxId,
                    className: "ds-combobox__listbox",
                    role: "listbox",
                    "aria-multiselectable": multiple,
                    "aria-label": label != null ? label : "Options",
                    children: filteredGroups.map((g) => /* @__PURE__ */ jsxs17(React18.Fragment, { children: [
                      /* @__PURE__ */ jsx22("div", { className: "ds-combobox__group-label", role: "presentation", children: g.label }),
                      g.options.map((opt) => renderOptionRow(opt))
                    ] }, g.label))
                  }
                ) : /* @__PURE__ */ jsx22(
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
        helperMessage ? /* @__PURE__ */ jsx22("p", { className: "ds-combobox__helper", role: error ? "alert" : void 0, children: helperMessage }) : null
      ]
    }
  );
});
Combobox.displayName = "Combobox";

// src/components/molecules/Modal/index.tsx
import { useCallback as useCallback10, useEffect as useEffect8, useRef as useRef9, useState as useState13 } from "react";
import { createPortal as createPortal3 } from "react-dom";

// src/components/molecules/Modal/Modal.config.ts
var defaultModalOptions = {
  size: "md",
  animation: "fade",
  animationDuration: 225,
  closeAfterTransition: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  showCancel: true,
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

// src/components/molecules/Modal/index.tsx
import { jsx as jsx23, jsxs as jsxs18 } from "react/jsx-runtime";
function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirm",
  confirmDisabled = false,
  cancelText = "Cancel",
  showCancel = true,
  hideFooter = false,
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
  const [isExiting, setIsExiting] = useState13(false);
  const exitTimeoutRef = useRef9(null);
  const dialogRef = useRef9(null);
  const sizeClass = (_a = modalSizeMap[size]) != null ? _a : "";
  const animClass = animation !== "none" ? `modal-dialog--${animation}` : "";
  useEffect8(() => {
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
  useEffect8(() => {
    if (!isOpen)
      return void 0;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [isOpen]);
  const handleClose = useCallback10(() => {
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
  useEffect8(() => {
    return () => {
      if (exitTimeoutRef.current)
        clearTimeout(exitTimeoutRef.current);
    };
  }, []);
  useEffect8(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && showCloseButton && closeOnEscape) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose, showCloseButton, closeOnEscape]);
  useEffect8(() => {
    if (!isOpen)
      return;
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(dialog.querySelectorAll(focusableSelector)).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
    dialog.focus();
    const handleKeyDown = (e) => {
      if (e.key !== "Tab")
        return;
      const focusable = getFocusable();
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
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);
  if (!isOpen)
    return null;
  const backdropZIndex = isStackedBackground ? zIndex - 2 : zIndex;
  const dialogZIndex = isStackedBackground ? zIndex - 1 : zIndex + 1;
  const handleBackdropClick = closeOnBackdropClick && showCloseButton ? handleClose : void 0;
  const modalContent = /* @__PURE__ */ jsxs18("div", { className: "modal-root", children: [
    !isStackedBackground && /* @__PURE__ */ jsx23(
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
    /* @__PURE__ */ jsx23(
      "div",
      {
        ref: dialogRef,
        className: "modal",
        id,
        tabIndex: -1,
        "aria-labelledby": !hideHeader ? `${id}Label` : void 0,
        "aria-modal": "true",
        role: "dialog",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: dialogZIndex,
          padding: "1rem",
          overflow: "hidden",
          pointerEvents: "auto"
        },
        onClick: !isStackedBackground ? handleBackdropClick : void 0,
        children: /* @__PURE__ */ jsx23(
          "div",
          {
            className: `modal-dialog ${sizeClass} ${animClass} ${isExiting ? "modal-dialog--exiting" : "modal-dialog--entering"}`,
            style: {
              margin: 0,
              maxHeight: "calc(100vh - 2rem)",
              width: "100%",
              maxWidth: (_b = modalSizeWidths[size]) != null ? _b : "480px",
              display: "flex",
              flexDirection: "column",
              pointerEvents: "auto",
              animationDuration: `${animationDuration}ms`
            },
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxs18(
              "div",
              {
                className: `modal-content ${className}`.trim(),
                style: {
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "100%",
                  overflow: "hidden",
                  background: "var(--color-bg-surface, #fff)",
                  borderRadius: "var(--radius-lg, 8px)",
                  boxShadow: "var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.12))"
                },
                children: [
                  !hideHeader && /* @__PURE__ */ jsxs18(
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
                        /* @__PURE__ */ jsxs18(
                          "span",
                          {
                            id: `${id}Label`,
                            className: "modal-title fw-semibold",
                            style: { flex: 1, fontSize: "1.125rem", color: "var(--color-text-primary, #333)" },
                            children: [
                              titleIcon && /* @__PURE__ */ jsx23(
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
                        showCloseButton && /* @__PURE__ */ jsx23(
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
                  /* @__PURE__ */ jsx23(
                    "div",
                    {
                      className: "modal-body",
                      style: {
                        overflowY: "auto",
                        overflowX: "hidden",
                        flex: 1,
                        minHeight: 0,
                        padding: "1rem 1.25rem"
                      },
                      children
                    }
                  ),
                  !hideFooter && onConfirm && /* @__PURE__ */ jsxs18(
                    "div",
                    {
                      className: "modal-footer",
                      style: {
                        flexShrink: 0,
                        display: "flex",
                        gap: "0.75rem",
                        justifyContent: "flex-end",
                        padding: "1rem 1.25rem",
                        borderTop: "1px solid var(--color-border-subtle, var(--color-mist-60))"
                      },
                      children: [
                        showCancel && /* @__PURE__ */ jsx23(
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
                        /* @__PURE__ */ jsx23(
                          Button_default,
                          {
                            variant: confirmButtonVariant,
                            size: confirmButtonVariant === "primary" ? "lg" : "md",
                            onClick: onConfirm,
                            disabled: confirmDisabled,
                            textColor: confirmButtonColor,
                            backgroundColor: confirmButtonBackground,
                            borderColor: confirmButtonBorder,
                            children: confirmText
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            )
          }
        )
      }
    )
  ] });
  return typeof document !== "undefined" ? createPortal3(modalContent, document.body) : null;
}

// src/components/molecules/AlertDialog/AlertDialog.config.ts
var alertDialogVariantConfig = {
  info: {
    icon: "\u2139",
    iconColor: "#0ea5e9",
    bgColor: "rgba(14, 165, 233, 0.1)"
  },
  success: {
    icon: "\u2713",
    iconColor: "#22c55e",
    bgColor: "rgba(34, 197, 94, 0.1)"
  },
  warning: {
    icon: "\u26A0",
    iconColor: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)"
  },
  error: {
    icon: "\u2715",
    iconColor: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)"
  }
};

// src/components/molecules/AlertDialog/AlertDialogIcons.tsx
import { jsx as jsx24, jsxs as jsxs19 } from "react/jsx-runtime";
var iconSize = 56;
function SuccessIconSvg({ animated, color = "#22c55e" }) {
  return /* @__PURE__ */ jsxs19(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--success" : "",
      children: [
        /* @__PURE__ */ jsx24("circle", { cx: "28", cy: "28", r: "26", fill: `${color}20` }),
        /* @__PURE__ */ jsx24(
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
function ErrorIconSvg({ animated, color = "#ef4444" }) {
  return /* @__PURE__ */ jsxs19(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--error" : "",
      children: [
        /* @__PURE__ */ jsx24("circle", { cx: "28", cy: "28", r: "26", fill: `${color}20` }),
        /* @__PURE__ */ jsx24("path", { d: "M28 18v14", stroke: color, strokeWidth: "3", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx24("circle", { cx: "28", cy: "38", r: "2.5", fill: color })
      ]
    }
  );
}
function WarningIconSvg({ animated, color = "#f59e0b" }) {
  return /* @__PURE__ */ jsxs19(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--warning" : "",
      children: [
        /* @__PURE__ */ jsx24(
          "path",
          {
            d: "M28 12L44 42H12L28 12z",
            fill: `${color}20`,
            stroke: color,
            strokeWidth: "2",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx24("path", { d: "M28 22v10", stroke: color, strokeWidth: "2.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx24("circle", { cx: "28", cy: "38", r: "2", fill: color })
      ]
    }
  );
}

// src/components/molecules/AlertDialog/index.tsx
import { jsx as jsx25, jsxs as jsxs20 } from "react/jsx-runtime";
function VariantIcon({
  variant,
  animated
}) {
  const config = alertDialogVariantConfig[variant];
  const color = config.iconColor;
  if (variant === "success") {
    return /* @__PURE__ */ jsx25(SuccessIconSvg, { animated, color });
  }
  if (variant === "error") {
    return /* @__PURE__ */ jsx25(ErrorIconSvg, { animated, color });
  }
  if (variant === "warning") {
    return /* @__PURE__ */ jsx25(WarningIconSvg, { animated, color });
  }
  return /* @__PURE__ */ jsx25(
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
  closeOnBackdropClick = true,
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
  const sizeMap = { sm: "sm", md: "md", lg: "lg" };
  const handleConfirm = () => {
    onConfirm == null ? void 0 : onConfirm();
    onClose();
  };
  const handleCancel = () => {
    onCancel == null ? void 0 : onCancel();
    onClose();
  };
  return /* @__PURE__ */ jsx25(
    Modal,
    {
      isOpen,
      onClose,
      title: "",
      size: sizeMap[size],
      hideFooter: true,
      hideHeader: true,
      showCloseButton: false,
      closeOnBackdropClick,
      closeOnEscape,
      zIndex,
      animation: "scale",
      children: /* @__PURE__ */ jsxs20(
        "div",
        {
          role: "alertdialog",
          "aria-labelledby": "alert-dialog-title",
          "aria-describedby": "alert-dialog-desc",
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0.5rem 0"
          },
          children: [
            /* @__PURE__ */ jsx25("div", { style: { marginBottom: "1.25rem", display: "flex", justifyContent: "center" }, children: customIcon != null ? customIcon : /* @__PURE__ */ jsx25(VariantIcon, { variant, animated: iconAnimated }) }),
            /* @__PURE__ */ jsx25(
              "h2",
              {
                id: "alert-dialog-title",
                style: {
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary, #333)"
                },
                children: title
              }
            ),
            description && /* @__PURE__ */ jsx25(
              "p",
              {
                id: "alert-dialog-desc",
                style: {
                  margin: "0.5rem 0 1.25rem",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-secondary, #666)",
                  lineHeight: 1.5
                },
                children: description
              }
            ),
            /* @__PURE__ */ jsxs20(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "center",
                  flexWrap: "wrap"
                },
                children: [
                  showCancel && /* @__PURE__ */ jsx25(
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
                  /* @__PURE__ */ jsx25(
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
                ]
              }
            )
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
var cls13 = (...classes) => classes.filter(Boolean).join(" ");

// src/components/atoms/Hyperlink/index.tsx
import { jsx as jsx26 } from "react/jsx-runtime";
var Hyperlink = ({
  children,
  href = "#",
  disabled = false,
  className = "",
  openInNewTab = false
}) => {
  return /* @__PURE__ */ jsx26(
    "a",
    {
      href: disabled ? void 0 : href,
      className: cls13(
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
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
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
  Combobox,
  DashboardShell_default as DashboardShell,
  DatePicker_default as DatePicker,
  Divider_default as Divider,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Dropzone,
  FileUpload_default as FileUpload,
  Form,
  GradientText_default as GradientText,
  Grid,
  GridItem,
  Hyperlink_default as Hyperlink,
  Icon_default as Icon,
  TextInput_default as Input,
  TextInputSearch_default as InputSearch,
  LineChart_default as LineChart,
  Modal,
  OtpBox_default as OtpBox,
  PieChart_default as PieChart,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProgressBar_default as ProgressBar,
  RadioGroup_default as RadioGroup,
  Select_default as Select,
  Stepper,
  StepperStep,
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
  ToolTip_default as ToolTip,
  detectFileKindFromBuffer,
  mergeSidebarTokensStyle,
  mergeTopbarTokensStyle,
  parseAcceptString,
  readAppSidebarPersist,
  validateFileSecurity,
  validateFilename,
  validateFilesSecurity,
  writeAppSidebarPersist
};
//# sourceMappingURL=index.mjs.map