"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/entries/openui.ts
var openui_exports = {};
__export(openui_exports, {
  ActionButton: () => ActionButton,
  Alert: () => Alert3,
  Badge: () => Badge3,
  BarChart: () => BarChart,
  Card: () => Card3,
  DataTable: () => DataTable2,
  Grid: () => Grid2,
  LineChart: () => LineChart,
  PieChart: () => PieChart,
  Renderer: () => import_react_lang3.Renderer,
  Stack: () => Stack,
  StatCard: () => StatCard3,
  designSystemLibrary: () => designSystemLibrary,
  openuiComponents: () => openuiComponents
});
module.exports = __toCommonJS(openui_exports);
var import_react_lang2 = require("@openuidev/react-lang");
var import_react_lang3 = require("@openuidev/react-lang");

// src/openui/components.tsx
var import_react34 = __toESM(require("react"));
var import_v4 = require("zod/v4");
var import_react_lang = require("@openuidev/react-lang");

// src/components/molecules/StatCard/index.tsx
var import_react3 = __toESM(require("react"));

// src/components/molecules/Card/index.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
var CardContext = (0, import_react.createContext)(null);
function useCardContext(component) {
  const ctx = (0, import_react.useContext)(CardContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Card>`);
  }
  return ctx;
}
function cls(...parts) {
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
  return import_react.default.Children.toArray(children).some((child) => {
    if (!import_react.default.isValidElement(child))
      return false;
    const name = getDisplayName(child.type);
    return name === "CardHeader" || name === "CardContent" || name === "CardFooter";
  });
}
function toCssSize(value, fallback) {
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
var CardRoot = (0, import_react.forwardRef)(function Card({
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
  const [isHovered, setIsHovered] = import_react.default.useState(false);
  const resolvedVariant = normalizeVariant(variant);
  const isIndicatorCard = resolvedVariant === "withIndicator";
  const isElevated = resolvedVariant === "elevated" || isIndicatorCard;
  const paddingVar = paddingProp !== void 0 ? toCssSize(paddingProp, "24px") : size === "sm" ? "var(--space-2)" : "var(--space-3)";
  const resolvedRadius = toCssSize(radius, "8px");
  const resolvedElevation = elevation != null ? elevation : isElevated ? "sm" : "none";
  const showBorder = resolvedVariant === "bordered";
  const showSelectedOutline = showBorder && selected;
  const actsAsButton = interactive && Boolean(onClick) && roleProp === void 0;
  const boxShadowResolved = showBorder ? "var(--shadow-none)" : isElevated ? getShadow(resolvedElevation, isHovered, Boolean(hoverable) && isElevated) : "var(--shadow-none)";
  const borderSpec = showSelectedOutline ? "1px solid var(--color-text-primary)" : showBorder ? "1px solid var(--color-border-default)" : "1px solid transparent";
  const compound = hasCompoundStructure(children);
  const ctxValue = (0, import_react.useMemo)(
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
  const mainColumn = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0
      },
      children: [
        cover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: cover }),
        (title || subtitle || extra) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { minWidth: 0 }, children: [
                title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
              extra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flexShrink: 0 }, children: extra })
            ]
          }
        ),
        children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: actionsStyle, children: actions }),
        footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  const inner = compound ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContext.Provider, { value: ctxValue, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "card-inner--compound", children }) }) : mainColumn;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref,
      ...rest,
      style: outerStyle,
      className: cls(
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
        showIndicator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var CardHeader = (0, import_react.forwardRef)(function CardHeader2({ className, ...rest }, ref) {
  useCardContext("CardHeader");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref, className: cls("card-header", className), ...rest });
});
CardHeader.displayName = "CardHeader";
var CardTitle = (0, import_react.forwardRef)(function CardTitle2({ as: Comp = "h3", className, ...rest }, ref) {
  useCardContext("CardTitle");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, { ref, className: cls("card-title", className), ...rest });
});
CardTitle.displayName = "CardTitle";
var CardDescription = (0, import_react.forwardRef)(
  function CardDescription2({ as: Comp = "p", className, ...rest }, ref) {
    useCardContext("CardDescription");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, { ref, className: cls("card-description", className), ...rest });
  }
);
CardDescription.displayName = "CardDescription";
var CardAction = (0, import_react.forwardRef)(function CardAction2({ className, ...rest }, ref) {
  useCardContext("CardAction");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref, className: cls("card-action", className), ...rest });
});
CardAction.displayName = "CardAction";
var CardContent = (0, import_react.forwardRef)(function CardContent2({ className, noPadding, ...rest }, ref) {
  useCardContext("CardContent");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref,
      className: cls(
        "card-content",
        noPadding && "card-content--no-padding",
        className
      ),
      ...rest
    }
  );
});
CardContent.displayName = "CardContent";
var CardFooter = (0, import_react.forwardRef)(function CardFooter2({ className, borderTop = true, ...rest }, ref) {
  useCardContext("CardFooter");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref,
      className: cls(
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

// src/components/atoms/IconBox/index.tsx
var import_react2 = __toESM(require("react"));

// src/components/atoms/IconBox/IconBox.config.ts
var ICON_BOX_DEFAULTS = {
  tone: "neutral",
  size: "md",
  shape: "rounded"
};

// src/components/atoms/IconBox/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var IconBox = import_react2.default.memo(function IconBox2({
  children,
  tone: tone2 = ICON_BOX_DEFAULTS.tone,
  size = ICON_BOX_DEFAULTS.size,
  shape = ICON_BOX_DEFAULTS.shape,
  label,
  className,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "span",
    {
      className: ["ds-icon-box", className].filter(Boolean).join(" "),
      "data-tone": tone2,
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
var import_jsx_runtime3 = require("react/jsx-runtime");
function TrendArrow({ trend }) {
  if (trend === "neutral") {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { viewBox: "0 0 12 12", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M2 6h8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { viewBox: "0 0 12 12", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var StatCard = import_react3.default.forwardRef(function StatCard2({
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Card_default, { ref, size, ...cardProps, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ds-stat", "data-size": size, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "ds-stat__top", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "ds-stat__label", children: label }),
      icon ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconBox_default, { tone: iconTone, size: size === "sm" ? "sm" : "md", children: icon }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "ds-stat__value", children: [
      value,
      unit ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "ds-stat__unit", children: unit }) : null
    ] }),
    delta ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "ds-stat__delta", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "ds-stat__delta-value", "data-tone": deltaTone, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TrendArrow, { trend }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "ds-stat__sr", children: [
          STAT_TREND_LABEL[trend],
          " "
        ] }),
        delta.value
      ] }),
      delta.label ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: delta.label }) : null
    ] }) : null,
    description ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "ds-stat__description", children: description }) : null,
    footer ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "ds-stat__footer", children: footer }) : null
  ] }) });
});
StatCard.displayName = "StatCard";
var StatCard_default = StatCard;

// src/components/molecules/DataTable/index.tsx
var import_react25 = __toESM(require("react"));

// src/components/molecules/Table/Table.tsx
var import_react14 = require("react");

// src/components/atoms/Select/index.tsx
var import_react5 = require("react");

// src/components/atoms/Select/Select.config.ts
var defaultSelectOptions = {
  placeholder: "Select an option",
  liveSearch: false,
  customClass: "",
  showIcons: true
  // NEW: default to show icons
};
var selectHeightTokens = {
  sm: "var(--button-height-sm)",
  md: "var(--button-height-lg)",
  lg: "3rem"
};
function isPickerOpenKey(event) {
  if (event.key === " " || event.key === "Spacebar" || event.key === "F4")
    return true;
  return event.altKey && (event.key === "ArrowDown" || event.key === "ArrowUp");
}
var selectStatusTokens = {
  error: "var(--color-danger-strong)",
  warning: "var(--color-warning-strong)",
  success: "var(--color-success-strong)"
};

// src/components/molecules/FormField/index.tsx
var import_react4 = __toESM(require("react"));

// src/components/molecules/FormField/FormField.config.ts
var FORM_FIELD_DEFAULTS = {
  layout: "vertical",
  optionalLabel: "(optional)"
};
var FORM_FIELD_REQUIRED_SR_TEXT = "required";
var FORM_FIELD_CONSUMER_KEY = "__dsFormFieldConsumer";
var FORM_FIELD_LABELABLE_SELECTOR = 'input:not([type="hidden"]), select, textarea, button, meter, output, progress';

// src/components/molecules/FormField/index.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function cls2(...parts) {
  return parts.filter(Boolean).join(" ");
}
function hasContent(node) {
  return node !== void 0 && node !== null && node !== false && node !== "";
}
var LABELABLE_TAGS = /* @__PURE__ */ new Set(["input", "select", "textarea", "button", "meter", "output", "progress"]);
var FormFieldContext = (0, import_react4.createContext)(null);
function useFormField() {
  return (0, import_react4.useContext)(FormFieldContext);
}
function useAnnounceOnChange(value) {
  const initial = (0, import_react4.useRef)(value);
  const changed = (0, import_react4.useRef)(false);
  if (!changed.current && value !== initial.current)
    changed.current = true;
  return changed.current;
}
function isDev() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
function isFormFieldConsumer(type) {
  return Boolean(type && (typeof type === "object" || typeof type === "function") && type[FORM_FIELD_CONSUMER_KEY]);
}
var FormField = import_react4.default.forwardRef(function FormField2({
  label,
  htmlFor,
  hint,
  error,
  required = false,
  optional = false,
  counter,
  layout = FORM_FIELD_DEFAULTS.layout,
  group = false,
  hideLabel = false,
  children,
  className,
  ...rest
}, ref) {
  var _a, _b;
  const reactId = (0, import_react4.useId)().replace(/[^a-zA-Z0-9_-]/g, "");
  const child = import_react4.default.isValidElement(children) && children.type !== import_react4.default.Fragment ? children : null;
  const childProps = (_a = child == null ? void 0 : child.props) != null ? _a : {};
  const childId = typeof childProps.id === "string" && childProps.id ? childProps.id : void 0;
  const controlId = (_b = htmlFor != null ? htmlFor : childId) != null ? _b : `form-field-${reactId}`;
  const labelId = `${controlId}-label`;
  const showHint = hasContent(hint);
  const showError = hasContent(error);
  const hintId = showHint ? `${controlId}-hint` : void 0;
  const errorId = showError ? `${controlId}-error` : void 0;
  const counterId = counter ? `${controlId}-counter` : void 0;
  const describedBy = [hintId, errorId, counterId].filter(Boolean).join(" ") || void 0;
  const invalid = showError;
  const overLimit = counter ? counter.value > counter.max : false;
  const announceError = useAnnounceOnChange(error);
  const ctx = (0, import_react4.useMemo)(
    () => ({ id: controlId, labelId, hintId, errorId, counterId, describedBy, invalid, required, group }),
    [controlId, labelId, hintId, errorId, counterId, describedBy, invalid, required, group]
  );
  const controlRef = (0, import_react4.useRef)(null);
  (0, import_react4.useEffect)(() => {
    var _a2;
    if (!isDev() || group)
      return;
    const root = controlRef.current;
    if (!root)
      return;
    const target = Array.from(root.querySelectorAll("[id]")).find((el) => el.id === controlId);
    const labelled = (_a2 = target == null ? void 0 : target.matches(FORM_FIELD_LABELABLE_SELECTOR)) != null ? _a2 : false;
    const byLabelledBy = Array.from(root.querySelectorAll("[aria-labelledby]")).some(
      (el) => {
        var _a3;
        return ((_a3 = el.getAttribute("aria-labelledby")) != null ? _a3 : "").split(/\s+/).includes(labelId);
      }
    );
    if (!labelled && !byLabelledBy) {
      console.warn(
        `[FormField] No labelable focusable element with id="${controlId}" (and no aria-labelledby="${labelId}") was found inside the field, so the label is not associated with the control. Use Input / TextArea / Select / Combobox / a native control, or wire a custom control with useFormField().`
      );
    }
  }, [controlId, labelId, group]);
  const isCompositeWrapper = htmlFor !== void 0 && child !== null && typeof child.type === "string" && !LABELABLE_TAGS.has(child.type);
  let control = children;
  if (child && !group && !isCompositeWrapper && !isFormFieldConsumer(child.type)) {
    const inject = {};
    if (childProps.id === void 0)
      inject.id = controlId;
    if (childProps["aria-describedby"] === void 0 && describedBy)
      inject["aria-describedby"] = describedBy;
    if (childProps["aria-invalid"] === void 0 && invalid)
      inject["aria-invalid"] = true;
    if (childProps["aria-required"] === void 0 && required)
      inject["aria-required"] = true;
    control = Object.keys(inject).length > 0 ? import_react4.default.cloneElement(child, inject) : child;
  }
  const LabelTag = group ? "span" : "label";
  const optionalText = !required && optional ? typeof optional === "string" ? optional : FORM_FIELD_DEFAULTS.optionalLabel : null;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FormFieldContext.Provider, { value: ctx, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      ref,
      className: cls2("ds-form-field", className),
      "data-layout": layout,
      "data-invalid": invalid ? "true" : void 0,
      "data-group": group ? "true" : void 0,
      "data-hide-label": hideLabel ? "true" : void 0,
      ...group ? { role: "group", "aria-labelledby": labelId, "aria-describedby": describedBy } : {},
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "ds-form-field__label-col", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          LabelTag,
          {
            id: labelId,
            htmlFor: group ? void 0 : controlId,
            className: "ds-form-field__label",
            children: [
              label,
              required ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "ds-form-field__required", "aria-hidden": "true", children: "*" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "sr-only", children: [
                  " ",
                  FORM_FIELD_REQUIRED_SR_TEXT
                ] })
              ] }) : null,
              optionalText ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "ds-form-field__optional", children: optionalText }) : null
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "ds-form-field__control-col", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ref: controlRef, className: "ds-form-field__control", children: control }),
          showHint || showError || counter ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "ds-form-field__messages", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "ds-form-field__texts", children: [
              showHint ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { id: hintId, className: "ds-form-field__hint", children: hint }) : null,
              showError ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { id: errorId, className: "ds-form-field__error", role: announceError ? "alert" : void 0, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
                  "svg",
                  {
                    className: "ds-form-field__error-icon",
                    viewBox: "0 0 16 16",
                    "aria-hidden": "true",
                    focusable: "false",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "8", cy: "8", r: "6.25", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M8 4.75v3.75", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "8", cy: "11", r: "0.9", fill: "currentColor" })
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: error })
              ] }) : null
            ] }),
            counter ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { id: counterId, className: "ds-form-field__counter", "data-over": overLimit ? "true" : void 0, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { "aria-hidden": "true", children: [
                counter.value,
                "/",
                counter.max
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "sr-only", children: [
                counter.value,
                " of ",
                counter.max,
                overLimit ? `, ${counter.value - counter.max} over the limit` : ""
              ] })
            ] }) : null
          ] }) : null,
          counter ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "sr-only", "aria-live": "polite", children: overLimit ? `Limit of ${counter.max} exceeded` : "" }) : null
        ] })
      ]
    }
  ) });
});
FormField.displayName = "FormField";

// src/components/atoms/Select/index.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var getOptionDataAttributes = (option) => {
  const dataAttrs = {};
  if (option.icon) {
    dataAttrs["data-icon"] = typeof option.icon === "string" ? option.icon : "custom-icon";
  }
  if (option.iconPosition) {
    dataAttrs["data-icon-position"] = option.iconPosition;
  }
  return dataAttrs;
};
var renderOptionContent = (option, showIcons = true) => {
  if (!showIcons || !option.icon) {
    return option.label;
  }
  const iconElement = typeof option.icon === "string" ? option.icon + " " : option.icon;
  if (option.iconPosition === "right") {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
      option.label,
      " ",
      iconElement
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    iconElement,
    " ",
    option.label
  ] });
};
function findOptionInSelect(value, options, groups) {
  if (groups == null ? void 0 : groups.length) {
    for (const g of groups) {
      const o = g.options.find((opt) => opt.value === value);
      if (o)
        return o;
    }
    return void 0;
  }
  return options == null ? void 0 : options.find((opt) => opt.value === value);
}
var Select = (0, import_react5.forwardRef)((props, ref) => {
  const {
    label,
    options = [],
    groups,
    placeholder = defaultSelectOptions.placeholder,
    customClass = defaultSelectOptions.customClass,
    className = "",
    error,
    helperText,
    id,
    showIcons = defaultSelectOptions.showIcons,
    onValueChange,
    onChange,
    value,
    fullWidth = true,
    size = "md",
    rounded = "4",
    status,
    allowPlaceholderSelection = true,
    animatedChevron = true,
    required,
    style,
    onMouseDown,
    onKeyDown,
    onBlur,
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    "aria-required": ariaRequiredProp,
    liveSearch: _liveSearch,
    ...rest
  } = props;
  const field = useFormField();
  const generatedId = (0, import_react5.useId)();
  const selectId = id || (field == null ? void 0 : field.id) || generatedId;
  const messageId = `${selectId}-message`;
  const useGroups = Boolean(groups && groups.length > 0);
  const [pickerOpen, setPickerOpen] = (0, import_react5.useState)(false);
  const pickerOpenRef = (0, import_react5.useRef)(false);
  const setOpen = (next) => {
    if (pickerOpenRef.current === next)
      return;
    pickerOpenRef.current = next;
    setPickerOpen(next);
  };
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = findOptionInSelect(selectedValue, options, groups);
    setOpen(false);
    onChange == null ? void 0 : onChange(event);
    onValueChange == null ? void 0 : onValueChange(selectedValue, selectedOption);
  };
  const handleMouseDown = (event) => {
    onMouseDown == null ? void 0 : onMouseDown(event);
    if (!event.defaultPrevented && event.button === 0 && !event.currentTarget.disabled)
      setOpen(true);
  };
  const handleKeyDown = (event) => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    setOpen(!event.defaultPrevented && isPickerOpenKey(event));
  };
  const handleBlur = (event) => {
    setOpen(false);
    onBlur == null ? void 0 : onBlur(event);
  };
  const isDisabled = rest.disabled;
  const resolvedStatus = error ? "error" : status;
  const helperMessage = error || helperText;
  const errorShown = Boolean(error);
  const initialError = (0, import_react5.useRef)(error);
  const errorChanged = (0, import_react5.useRef)(false);
  if (!errorChanged.current && error !== initialError.current)
    errorChanged.current = true;
  const describedBy = [ariaDescribedByProp != null ? ariaDescribedByProp : field == null ? void 0 : field.describedBy, helperMessage ? messageId : void 0].filter(Boolean).join(" ") || void 0;
  const ariaInvalid = ariaInvalidProp != null ? ariaInvalidProp : errorShown || resolvedStatus === "error" || Boolean(field == null ? void 0 : field.invalid);
  const ariaRequired = ariaRequiredProp != null ? ariaRequiredProp : (field == null ? void 0 : field.required) && !required ? true : void 0;
  const isInvalid = ariaInvalid === true || ariaInvalid === "true" || resolvedStatus === "error";
  const visualStatus = isInvalid ? "error" : resolvedStatus;
  const statusToken = visualStatus ? selectStatusTokens[visualStatus] : void 0;
  const borderColor = statusToken != null ? statusToken : "var(--color-border-default)";
  const footerColor = resolvedStatus ? selectStatusTokens[resolvedStatus] : "var(--color-text-secondary)";
  const sizeConfig = {
    sm: { minHeight: selectHeightTokens.sm, paddingX: 10, fontSize: "var(--text-small-size, 12px)" },
    md: { minHeight: selectHeightTokens.md, paddingX: 12, fontSize: "var(--text-body-size, 16px)" },
    lg: { minHeight: selectHeightTokens.lg, paddingX: 16, fontSize: "var(--text-body-size, 16px)" }
  };
  const currentSize = sizeConfig[size];
  const radiusValue = rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px";
  const wrapperStyle = fullWidth ? void 0 : { width: "auto", display: "inline-block" };
  const wrapperClass = [customClass, fullWidth ? "ds-select-root--full" : ""].filter(Boolean).join(" ");
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: isDisabled ? "var(--color-text-secondary)" : "var(--color-text-primary)",
    fontSize: "var(--text-secondary-size, 14px)",
    fontWeight: 500,
    lineHeight: 1.5,
    cursor: isDisabled ? "not-allowed" : "default"
  };
  const selectStyle = {
    display: "block",
    width: "100%",
    minWidth: 0,
    minHeight: currentSize.minHeight,
    padding: `0 ${currentSize.paddingX + 18}px 0 ${currentSize.paddingX}px`,
    boxSizing: "border-box",
    borderRadius: radiusValue,
    border: `1.5px solid ${borderColor}`,
    backgroundColor: isDisabled ? "var(--color-bg-page)" : "var(--color-bg-surface)",
    color: isDisabled ? "var(--color-text-secondary)" : "var(--color-text-primary)",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    fontSize: currentSize.fontSize,
    lineHeight: 1.5,
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "border-color 150ms, background-color 150ms"
  };
  const helperStyle = {
    marginTop: 8,
    marginBottom: 0,
    color: footerColor,
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: wrapperClass || void 0, style: wrapperStyle, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { htmlFor: selectId, style: labelStyle, children: [
      label,
      required ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "ds-select__required", "aria-hidden": "true", children: "*" }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "div",
      {
        className: `ucs-select-shell${animatedChevron !== false ? " ucs-select-shell--chevron-animated" : " ds-select-shell--chevron-static"}`,
        "data-open": animatedChevron !== false && pickerOpen ? "true" : void 0,
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "select",
          {
            ref,
            id: selectId,
            className: className ? `ds-select ${className}` : "ds-select",
            "data-size": size,
            "data-invalid": isInvalid ? "true" : void 0,
            "data-status": visualStatus,
            style: style ? { ...selectStyle, ...style } : selectStyle,
            "aria-invalid": ariaInvalid,
            "aria-describedby": describedBy,
            "aria-required": ariaRequired,
            required,
            value,
            ...rest,
            onChange: handleChange,
            onMouseDown: handleMouseDown,
            onKeyDown: handleKeyDown,
            onBlur: handleBlur,
            children: [
              placeholder && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "", disabled: !allowPlaceholderSelection, children: placeholder }),
              useGroups ? groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("optgroup", { label: group.label, children: group.options.map((opt, index) => {
                var _a;
                const dataAttributes = getOptionDataAttributes(opt);
                return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "option",
                  {
                    value: opt.value,
                    disabled: opt.disabled,
                    ...dataAttributes,
                    children: renderOptionContent(opt, showIcons)
                  },
                  `${group.label}-${(_a = opt.value) != null ? _a : "no-value"}-${opt.label}-${index}`
                );
              }) }, group.label)) : options.map((opt, index) => {
                var _a;
                const dataAttributes = getOptionDataAttributes(opt);
                return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "option",
                  {
                    value: opt.value,
                    disabled: opt.disabled,
                    ...dataAttributes,
                    children: renderOptionContent(opt, showIcons)
                  },
                  `${(_a = opt.value) != null ? _a : "no-value"}-${opt.label}-${index}`
                );
              })
            ]
          }
        )
      }
    ),
    helperMessage && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "p",
      {
        id: messageId,
        className: "ds-select__message",
        "data-status": resolvedStatus,
        role: errorShown && errorChanged.current ? "alert" : void 0,
        style: helperStyle,
        children: helperMessage
      }
    )
  ] });
});
Select.displayName = "Select";
Select[FORM_FIELD_CONSUMER_KEY] = true;
var Select_default = Select;

// src/components/atoms/TextView/index.tsx
var import_react6 = __toESM(require("react"));

// src/components/atoms/TextView/TextView.config.ts
var variantClassMap = {
  h1: "tv-h1",
  h2: "tv-h2",
  h3: "tv-h3",
  h4: "tv-h4",
  body: "tv-body",
  secondary: "tv-secondary",
  small: "tv-small",
  micro: "tv-micro"
};
var fontSizeClassMap = {
  h1: "tv-h1",
  h2: "tv-h2",
  h3: "tv-h3",
  h4: "tv-h4",
  body: "tv-body",
  secondary: "tv-secondary",
  small: "tv-small",
  micro: "tv-micro"
};
var fontWeightClassMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold"
};
var lineHeightClassMap = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose"
};
var letterSpacingClassMap = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest"
};
var defaultTagByVariant = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "span",
  secondary: "span",
  small: "small",
  micro: "small"
};
var colorClassMap = {
  primary: "tv-color-primary",
  secondary: "tv-color-secondary",
  hint: "tv-color-secondary",
  disabled: "tv-color-secondary",
  success: "tv-color-success",
  warning: "tv-color-warning",
  error: "tv-color-error",
  inherit: ""
};
var alignClassMap = {
  left: "text-start",
  center: "text-center",
  right: "text-end",
  justify: "text-justify"
};
var transformClassMap = {
  none: "normal-case",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize"
};
var decorationClassMap = {
  none: "no-underline",
  underline: "underline",
  "line-through": "line-through"
};

// src/components/atoms/TextView/TextView.utils.ts
var cls3 = (...classes) => classes.filter(Boolean).join(" ");

// src/components/atoms/TextView/index.tsx
var SEMANTIC_COLORS = [
  "primary",
  "secondary",
  "hint",
  "disabled",
  "success",
  "warning",
  "error",
  "inherit"
];
function isSemanticColor(color) {
  return SEMANTIC_COLORS.includes(color);
}
function isTokenFontSize(v) {
  return typeof v === "string" && v in fontSizeClassMap;
}
function isTokenFontWeight(v) {
  return typeof v === "string" && v in fontWeightClassMap;
}
var TextView = import_react6.default.memo(function TextView2({
  as,
  children,
  variant = "body",
  color = "primary",
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  align = "left",
  transform = "none",
  decoration = "none",
  className = "",
  truncate = false,
  style,
  ...restProps
}) {
  const resolvedVariant = variant;
  const fallbackTag = defaultTagByVariant[resolvedVariant] || "span";
  const Component = as || fallbackTag;
  const useFontSizeStyle = typeof fontSize === "string" && fontSize.length > 0 && !isTokenFontSize(fontSize);
  const sizeClass = isTokenFontSize(fontSize) ? fontSizeClassMap[fontSize] : variantClassMap[resolvedVariant];
  const useFontWeightStyle = typeof fontWeight === "number" || typeof fontWeight === "string" && fontWeight.length > 0 && !isTokenFontWeight(fontWeight);
  const weightClass = isTokenFontWeight(fontWeight) ? fontWeightClassMap[fontWeight] : "";
  const useColorStyle = typeof color === "string" && color.length > 0 && !isSemanticColor(color);
  const colorClass = !useColorStyle && color ? colorClassMap[color] : "";
  const finalClassName = cls3(
    "font-sans",
    sizeClass,
    weightClass,
    lineHeight && lineHeightClassMap[lineHeight],
    letterSpacing && letterSpacingClassMap[letterSpacing],
    colorClass,
    alignClassMap[align],
    transformClassMap[transform],
    decorationClassMap[decoration],
    truncate && "truncate",
    className
  );
  const finalStyle = useColorStyle || useFontSizeStyle || useFontWeightStyle ? {
    ...style,
    ...useColorStyle ? { color } : null,
    ...useFontSizeStyle ? { fontSize } : null,
    ...useFontWeightStyle ? { fontWeight } : null
  } : style;
  return import_react6.default.createElement(
    Component,
    { className: finalClassName, style: finalStyle, ...restProps },
    children
  );
});
var TextView_default = TextView;

// src/components/atoms/TextInputSearch/index.tsx
var import_react11 = __toESM(require("react"));

// src/components/atoms/Icon/index.tsx
var import_react7 = __toESM(require("react"));
var import_jsx_runtime6 = require("react/jsx-runtime");
function resolveSrc(src) {
  if (typeof src === "string")
    return src;
  if (import_react7.default.isValidElement(src))
    return null;
  if (typeof src === "object" && src !== null) {
    if ("src" in src && typeof src.src === "string")
      return src.src;
    if ("default" in src && typeof src.default === "string")
      return src.default;
  }
  return null;
}
function isSvgSource(url) {
  const u = url.toLowerCase();
  return u.includes(".svg") || url.startsWith("data:image/svg+xml");
}
function cssUrl(href) {
  return `url(${JSON.stringify(href)})`;
}
var Icon = import_react7.default.memo(function Icon2({
  src,
  alt = "",
  color = "currentColor",
  width = 16,
  height = 16,
  className = "",
  style = {},
  preserveColors = false,
  decorative,
  title,
  ...rest
}) {
  const resolvedSrc = resolveSrc(src);
  const isDecorative = decorative != null ? decorative : !alt;
  const wrapperStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: typeof width === "number" ? width : width,
    height: typeof height === "number" ? height : height,
    verticalAlign: "middle",
    lineHeight: 0,
    flexShrink: 0,
    ...style
  };
  const wrapperProps = {
    className,
    style: wrapperStyle,
    role: isDecorative ? void 0 : "img",
    "aria-hidden": isDecorative ? true : void 0,
    "aria-label": isDecorative ? void 0 : alt,
    title: typeof title === "string" ? title : alt || void 0,
    ...rest
  };
  if (import_react7.default.isValidElement(src)) {
    const size = width;
    const sizeHeight = height != null ? height : width;
    const childProps = src.props;
    const childStyle = (childProps == null ? void 0 : childProps.style) || {};
    const mergedStyle = {
      width: size,
      height: sizeHeight,
      color: !preserveColors ? color : void 0,
      ...childStyle
    };
    const child = import_react7.default.cloneElement(src, {
      width: size,
      height: sizeHeight,
      style: mergedStyle
    });
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { ...wrapperProps, children: child });
  }
  if (!resolvedSrc) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { ...wrapperProps });
  }
  const isSvg = isSvgSource(resolvedSrc);
  if (isSvg && !preserveColors) {
    const maskRef = cssUrl(resolvedSrc);
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "span",
      {
        ...wrapperProps,
        style: {
          ...wrapperStyle,
          display: "inline-block",
          backgroundColor: color,
          WebkitMaskImage: maskRef,
          maskImage: maskRef,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain"
        }
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { ...wrapperProps, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "img",
    {
      src: resolvedSrc,
      alt: isDecorative ? "" : alt,
      width: typeof width === "number" ? width : void 0,
      height: typeof height === "number" ? height : void 0,
      style: { width, height, objectFit: "contain", display: "block" },
      loading: "lazy",
      decoding: "async"
    }
  ) });
});
var Icon_default = Icon;

// src/components/atoms/TextInput/TextInput.tsx
var import_react8 = require("react");

// src/utils/uiPanValidators.ts
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
var PAN_REGEX = /^[A-Z]{5}\d{4}[A-Z]$/;
var AADHAAR_REGEX = /^\d{12}$/;
var TAN_REGEX = /^[A-Z]{4}\d{5}[A-Z]$/;
var PASSPORT_REGEX = /^[A-Z][1-9]\d{6}$/i;
var PINCODE_REGEX = /^\d{6}$/;
var ENTITY_NAME_REGEX = /^[A-Za-z0-9 .,&()'/-]{2,100}$/;
function toDigits(value) {
  return (value != null ? value : "").replace(/\D/g, "");
}
function isValidEmail(value) {
  return EMAIL_REGEX.test((value != null ? value : "").trim());
}
function isMobile(value, isdCode = "+91") {
  const digits = toDigits(value);
  if (isdCode === "+91") {
    return /^[6-9]\d{9}$/.test(digits);
  }
  return /^\d{6,15}$/.test(digits);
}
function isPanNumber(value) {
  return PAN_REGEX.test((value != null ? value : "").trim().toUpperCase());
}
function isAadhaar(value) {
  return AADHAAR_REGEX.test(toDigits(value));
}
function isAlphanumeric(value) {
  return /^[A-Za-z0-9 ]+$/.test((value != null ? value : "").trim());
}
function isNumeric(value) {
  return /^\d+$/.test((value != null ? value : "").trim());
}
function isPincode(value) {
  return PINCODE_REGEX.test(toDigits(value));
}
function isAlphabetic(value) {
  return /^[A-Za-z ]+$/.test((value != null ? value : "").trim());
}
function isAcknowledgementNumber(value) {
  return /^[A-Z0-9]{8,20}$/.test((value != null ? value : "").trim().toUpperCase());
}
function isTAN(value) {
  return TAN_REGEX.test((value != null ? value : "").trim().toUpperCase());
}
function isIndianPassport(value) {
  return PASSPORT_REGEX.test((value != null ? value : "").trim().toUpperCase());
}
function isIndianTIN(value) {
  return /^[A-Z0-9]{8,20}$/.test((value != null ? value : "").trim().toUpperCase());
}
function isValidSTDCode(value) {
  return /^0?\d{2,5}$/.test(toDigits(value));
}
function isValidLandlineNumber(value) {
  return /^\d{6,11}$/.test(toDigits(value));
}
function isEntityName(value) {
  return ENTITY_NAME_REGEX.test((value != null ? value : "").trim());
}
var Masker = class {
  constructor(visibleCount = 4, options = {}) {
    var _a, _b;
    this.visibleCount = Math.max(0, visibleCount);
    this.options = {
      maskChar: (_a = options.maskChar) != null ? _a : "*",
      maskFrom: (_b = options.maskFrom) != null ? _b : "start",
      maskPattern: options.maskPattern
    };
  }
  maskString(value) {
    const input = value != null ? value : "";
    if (!input)
      return "";
    if (input.length <= this.visibleCount)
      return input;
    const maskLength = input.length - this.visibleCount;
    const masked = this.options.maskChar.repeat(maskLength);
    if (this.options.maskFrom === "end") {
      return `${input.slice(0, this.visibleCount)}${masked}`;
    }
    return `${masked}${input.slice(-this.visibleCount)}`;
  }
};

// src/components/atoms/TextInput/TextInput.config.ts
var HEADER_SEARCH_LAYOUT = {
  /**
   * Tier heights mirror `Select` sm/md/lg `minHeight` (--button-height-sm / --button-height-lg / 3rem) so filter rows align in Storybook
   * and apps without ad-hoc pixel tweaks.
   */
  sm: {
    shellMinHeight: 32,
    shellMinHeightToken: "var(--button-height-sm)",
    horizontalPadding: 9,
    prefixAddonPadding: 7,
    suffixPadLeft: 7,
    suffixPadRight: 3,
    inputLineHeight: 1.35,
    decorativeTrailingSearchIcon: 14,
    clearIconSize: 11,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 24,
    integratedIconPadX: 9
  },
  md: {
    shellMinHeight: 40,
    shellMinHeightToken: "var(--button-height-lg)",
    horizontalPadding: 12,
    prefixAddonPadding: 9,
    suffixPadLeft: 10,
    suffixPadRight: 4,
    inputLineHeight: 1.35,
    decorativeTrailingSearchIcon: 16,
    clearIconSize: 12,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 32,
    integratedIconPadX: 11
  },
  lg: {
    shellMinHeight: 48,
    shellMinHeightToken: "3rem",
    horizontalPadding: 12,
    prefixAddonPadding: 9,
    suffixPadLeft: 10,
    suffixPadRight: 4,
    inputLineHeight: 1.38,
    decorativeTrailingSearchIcon: 17,
    clearIconSize: 12,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 40,
    integratedIconPadX: 12
  }
};

// src/components/atoms/TextInput/TextInput.utils.ts
function roundedToCssCorner(rounded) {
  const r = rounded != null ? rounded : "3";
  if (r === "0")
    return 0;
  if (r === "1")
    return "var(--radius-xs, 2px)";
  if (r === "2")
    return "var(--radius-sm, 3px)";
  if (r === "3")
    return "var(--radius-base, 4px)";
  if (r === "4")
    return "var(--radius-md, 6px)";
  if (r === "5")
    return "var(--radius-lg, 8px)";
  return "9999px";
}

// src/assets/visibility_on.svg
var visibility_on_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_2141_81048" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_2141_81048)">%0A<path d="M9.0022 11.5577C9.85208 11.5577 10.5739 11.2603 11.1676 10.6654C11.7614 10.0706 12.0583 9.34819 12.0583 8.49831C12.0583 7.64844 11.7608 6.92662 11.166 6.33287C10.5711 5.73912 9.8487 5.44225 8.99883 5.44225C8.14895 5.44225 7.42714 5.73969 6.83339 6.33456C6.23964 6.92944 5.94277 7.65181 5.94277 8.50169C5.94277 9.35156 6.2402 10.0734 6.83508 10.6671C7.42995 11.2609 8.15233 11.5577 9.0022 11.5577ZM9.00052 10.525C8.43802 10.525 7.95989 10.3281 7.56614 9.93438C7.17239 9.54063 6.97552 9.0625 6.97552 8.5C6.97552 7.9375 7.17239 7.45938 7.56614 7.06563C7.95989 6.67188 8.43802 6.475 9.00052 6.475C9.56302 6.475 10.0411 6.67188 10.4349 7.06563C10.8286 7.45938 11.0255 7.9375 11.0255 8.5C11.0255 9.0625 10.8286 9.54063 10.4349 9.93438C10.0411 10.3281 9.56302 10.525 9.00052 10.525ZM9.00052 13.75C7.42164 13.75 5.97764 13.3288 4.66852 12.4864C3.35939 11.6442 2.31445 10.5361 1.5337 9.16206C1.4712 9.05431 1.42552 8.94575 1.39664 8.83638C1.36789 8.727 1.35352 8.61475 1.35352 8.49963C1.35352 8.3845 1.36789 8.27237 1.39664 8.16325C1.42552 8.05412 1.4712 7.94569 1.5337 7.83794C2.31445 6.46394 3.35939 5.35581 4.66852 4.51356C5.97764 3.67119 7.42164 3.25 9.00052 3.25C10.5794 3.25 12.0234 3.67119 13.3325 4.51356C14.6416 5.35581 15.6866 6.46394 16.4673 7.83794C16.5298 7.94569 16.5755 8.05425 16.6044 8.16362C16.6331 8.273 16.6475 8.38525 16.6475 8.50037C16.6475 8.6155 16.6331 8.72762 16.6044 8.83675C16.5755 8.94587 16.5298 9.05431 16.4673 9.16206C15.6866 10.5361 14.6416 11.6442 13.3325 12.4864C12.0234 13.3288 10.5794 13.75 9.00052 13.75ZM9.00052 12.625C10.413 12.625 11.7099 12.2531 12.8911 11.5094C14.0724 10.7656 14.9755 9.7625 15.6005 8.5C14.9755 7.2375 14.0724 6.23438 12.8911 5.49062C11.7099 4.74687 10.413 4.375 9.00052 4.375C7.58802 4.375 6.29114 4.74687 5.10989 5.49062C3.92864 6.23438 3.02552 7.2375 2.40052 8.5C3.02552 9.7625 3.92864 10.7656 5.10989 11.5094C6.29114 12.2531 7.58802 12.625 9.00052 12.625Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/assets/visibility_off.svg
var visibility_off_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_8283_202257" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_8283_202257)">%0A<path d="M11.1601 6.46375C11.4649 6.76862 11.7004 7.13906 11.8668 7.57506C12.0332 8.01119 12.0961 8.44894 12.0556 8.88831C12.0556 9.03256 12.0037 9.15469 11.9 9.25469C11.7961 9.35469 11.6721 9.40469 11.5278 9.40469C11.3836 9.40469 11.2614 9.35469 11.1614 9.25469C11.0614 9.15469 11.0114 9.03256 11.0114 8.88831C11.0596 8.55856 11.0324 8.24606 10.9301 7.95081C10.8277 7.65569 10.6702 7.40187 10.4577 7.18937C10.2452 6.97687 9.989 6.81556 9.689 6.70544C9.389 6.59531 9.07262 6.56669 8.73987 6.61956C8.59562 6.62444 8.47112 6.57612 8.36637 6.47462C8.2615 6.37325 8.20669 6.25044 8.20194 6.10619C8.19706 5.96194 8.24344 5.83737 8.34106 5.7325C8.43869 5.62775 8.55962 5.573 8.70387 5.56825C9.14037 5.51825 9.57906 5.57519 10.0199 5.73906C10.4608 5.90306 10.8409 6.14462 11.1601 6.46375ZM9.00238 4.4965C8.736 4.4965 8.47469 4.5095 8.21844 4.5355C7.96219 4.56137 7.70712 4.60412 7.45325 4.66375C7.29362 4.6965 7.14988 4.67369 7.022 4.59531C6.89412 4.51694 6.80619 4.40419 6.75819 4.25706C6.71006 4.10519 6.72594 3.96075 6.80581 3.82375C6.88556 3.68675 7.00137 3.60187 7.15325 3.56912C7.45525 3.497 7.76031 3.44606 8.06844 3.41631C8.37669 3.38644 8.688 3.3715 9.00238 3.3715C10.6139 3.3715 12.0942 3.79025 13.4433 4.62775C14.7923 5.46525 15.8298 6.59844 16.5556 8.02731C16.6056 8.12244 16.6419 8.21831 16.6646 8.31494C16.6872 8.41156 16.6985 8.51375 16.6985 8.6215C16.6985 8.72925 16.6891 8.83144 16.6704 8.92806C16.6516 9.02469 16.6173 9.12056 16.5673 9.21569C16.3375 9.69644 16.0582 10.1447 15.7293 10.5606C15.4004 10.9765 15.0384 11.3585 14.6431 11.7066C14.5269 11.8105 14.394 11.8535 14.2445 11.8356C14.0949 11.8179 13.972 11.7431 13.8759 11.6114C13.7798 11.4796 13.7399 11.3383 13.7563 11.1874C13.7726 11.0364 13.8389 10.909 13.9552 10.8051C14.2937 10.4984 14.6024 10.1631 14.8813 9.79919C15.1601 9.43519 15.4005 9.04262 15.6024 8.6215C14.9774 7.359 14.0743 6.35587 12.893 5.61212C11.7118 4.86837 10.4149 4.4965 9.00238 4.4965ZM9.00238 13.8715C7.4235 13.8715 5.97638 13.4496 4.661 12.6059C3.34563 11.7621 2.3 10.6508 1.52413 9.27194C1.46163 9.17681 1.41594 9.07344 1.38706 8.96181C1.35819 8.85031 1.34375 8.73687 1.34375 8.6215C1.34375 8.50612 1.35625 8.39456 1.38125 8.28681C1.40625 8.17919 1.45 8.07394 1.5125 7.97106C1.79138 7.46144 2.10725 6.97606 2.46012 6.51494C2.813 6.05394 3.21875 5.64075 3.67738 5.27537L1.98406 3.57044C1.88031 3.45894 1.82912 3.3265 1.8305 3.17312C1.832 3.01975 1.88706 2.88875 1.99569 2.78013C2.10431 2.6715 2.23606 2.61719 2.39094 2.61719C2.54569 2.61719 2.67738 2.6715 2.786 2.78013L15.2188 15.2129C15.3226 15.3167 15.3777 15.4453 15.3839 15.5986C15.3902 15.7519 15.3351 15.8868 15.2188 16.0032C15.1101 16.1118 14.9784 16.1661 14.8235 16.1661C14.6688 16.1661 14.5371 16.1118 14.4284 16.0032L11.789 13.3868C11.3466 13.5579 10.892 13.6815 10.4251 13.7575C9.95837 13.8335 9.48413 13.8715 9.00238 13.8715ZM4.46788 6.06569C4.02838 6.40519 3.63338 6.78906 3.28288 7.21731C2.93238 7.64569 2.63888 8.11375 2.40237 8.6215C3.02737 9.884 3.9305 10.8871 5.11175 11.6309C6.293 12.3746 7.58988 12.7465 9.00238 12.7465C9.3245 12.7465 9.64156 12.7249 9.95356 12.6816C10.2656 12.6384 10.5754 12.5716 10.8832 12.4812L9.93406 11.509C9.78219 11.5754 9.6305 11.6203 9.479 11.6438C9.32763 11.6674 9.16875 11.6792 9.00238 11.6792C8.15138 11.6792 7.429 11.3824 6.83525 10.7886C6.2415 10.1949 5.94462 9.4725 5.94462 8.6215C5.94462 8.45512 5.95762 8.29625 5.98362 8.14487C6.00962 7.99337 6.05337 7.84169 6.11487 7.68981L4.46788 6.06569Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/assets/error.svg
var error_default = 'data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_992_11734" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">%0A<rect width="16" height="16" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_992_11734)">%0A<path d="M8.00065 11.334C8.18954 11.334 8.34798 11.27 8.47598 11.142C8.60354 11.0144 8.66732 10.8562 8.66732 10.6673C8.66732 10.4784 8.60354 10.32 8.47598 10.192C8.34798 10.0644 8.18954 10.0007 8.00065 10.0007C7.81176 10.0007 7.65354 10.0644 7.52598 10.192C7.39798 10.32 7.33398 10.4784 7.33398 10.6673C7.33398 10.8562 7.39798 11.0144 7.52598 11.142C7.65354 11.27 7.81176 11.334 8.00065 11.334ZM7.33398 8.66732H8.66732V4.66732H7.33398V8.66732ZM8.00065 14.6673C7.07843 14.6673 6.21176 14.4922 5.40065 14.142C4.58954 13.7922 3.88398 13.3173 3.28398 12.7173C2.68398 12.1173 2.2091 11.4118 1.85932 10.6006C1.5091 9.78954 1.33398 8.92287 1.33398 8.00065C1.33398 7.07843 1.5091 6.21176 1.85932 5.40065C2.2091 4.58954 2.68398 3.88398 3.28398 3.28398C3.88398 2.68398 4.58954 2.20887 5.40065 1.85865C6.21176 1.50887 7.07843 1.33398 8.00065 1.33398C8.92287 1.33398 9.78954 1.50887 10.6006 1.85865C11.4118 2.20887 12.1173 2.68398 12.7173 3.28398C13.3173 3.88398 13.7922 4.58954 14.142 5.40065C14.4922 6.21176 14.6673 7.07843 14.6673 8.00065C14.6673 8.92287 14.4922 9.78954 14.142 10.6006C13.7922 11.4118 13.3173 12.1173 12.7173 12.7173C12.1173 13.3173 11.4118 13.7922 10.6006 14.142C9.78954 14.4922 8.92287 14.6673 8.00065 14.6673ZM8.00065 13.334C9.48954 13.334 10.7507 12.8173 11.784 11.784C12.8173 10.7507 13.334 9.48954 13.334 8.00065C13.334 6.51176 12.8173 5.25065 11.784 4.21732C10.7507 3.18398 9.48954 2.66732 8.00065 2.66732C6.51176 2.66732 5.25065 3.18398 4.21732 4.21732C3.18398 5.25065 2.66732 6.51176 2.66732 8.00065C2.66732 9.48954 3.18398 10.7507 4.21732 11.784C5.25065 12.8173 6.51176 13.334 8.00065 13.334Z" fill="%23D4362E"/>%0A</g>%0A</svg>%0A';

// src/assets/success.svg
var success_default = 'data:image/svg+xml,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M6.66667 13.3333C5.74444 13.3333 4.87778 13.1582 4.06667 12.808C3.25556 12.4582 2.55 11.9833 1.95 11.3833C1.35 10.7833 0.875111 10.0778 0.525333 9.26667C0.175111 8.45555 0 7.58889 0 6.66667C0 5.74444 0.175111 4.87778 0.525333 4.06667C0.875111 3.25556 1.35 2.55 1.95 1.95C2.55 1.35 3.25556 0.874889 4.06667 0.524667C4.87778 0.174889 5.74444 0 6.66667 0C7.38889 0 8.07222 0.105555 8.71667 0.316667C9.36111 0.527778 9.95555 0.822222 10.5 1.2L9.53333 2.18333C9.11111 1.91667 8.66111 1.70822 8.18333 1.558C7.70555 1.40822 7.2 1.33333 6.66667 1.33333C5.18889 1.33333 3.93067 1.85267 2.892 2.89133C1.85289 3.93044 1.33333 5.18889 1.33333 6.66667C1.33333 8.14444 1.85289 9.40289 2.892 10.442C3.93067 11.4807 5.18889 12 6.66667 12C8.14444 12 9.40289 11.4807 10.442 10.442C11.4807 9.40289 12 8.14444 12 6.66667C12 6.46667 11.9889 6.26667 11.9667 6.06667C11.9444 5.86667 11.9111 5.67222 11.8667 5.48333L12.95 4.4C13.0722 4.75556 13.1667 5.12222 13.2333 5.5C13.3 5.87778 13.3333 6.26667 13.3333 6.66667C13.3333 7.58889 13.1582 8.45555 12.808 9.26667C12.4582 10.0778 11.9833 10.7833 11.3833 11.3833C10.7833 11.9833 10.0778 12.4582 9.26667 12.808C8.45555 13.1582 7.58889 13.3333 6.66667 13.3333ZM5.73333 9.73333L2.9 6.9L3.83333 5.96667L5.73333 7.86667L12.4 1.18333L13.3333 2.11667L5.73333 9.73333Z" fill="%233C9718"/>%0A</svg>%0A';

// src/assets/close.svg
var close_default = 'data:image/svg+xml,<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M6.34425 7.398L1.27125 12.4713C1.13275 12.6096 0.958667 12.6804 0.749 12.6838C0.5395 12.6869 0.36225 12.6161 0.21725 12.4713C0.0724167 12.3263 0 12.1506 0 11.9443C0 11.7379 0.0724167 11.5623 0.21725 11.4173L5.2905 6.34425L0.21725 1.27125C0.0789167 1.13275 0.00808339 0.958667 0.00475006 0.749001C0.00158339 0.539501 0.0724167 0.36225 0.21725 0.21725C0.36225 0.0724167 0.537917 0 0.74425 0C0.950583 0 1.12625 0.0724167 1.27125 0.21725L6.34425 5.2905L11.4173 0.21725C11.5558 0.0789167 11.7298 0.00808339 11.9395 0.00475006C12.149 0.00158339 12.3263 0.0724167 12.4713 0.21725C12.6161 0.36225 12.6885 0.537917 12.6885 0.74425C12.6885 0.950584 12.6161 1.12625 12.4713 1.27125L7.398 6.34425L12.4713 11.4173C12.6096 11.5558 12.6804 11.7298 12.6838 11.9395C12.6869 12.149 12.6161 12.3263 12.4713 12.4713C12.3263 12.6161 12.1506 12.6885 11.9443 12.6885C11.7379 12.6885 11.5623 12.6161 11.4173 12.4713L6.34425 7.398Z" fill="%23212121"/>%0A</svg>%0A';

// src/assets/search.svg
var search_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_7433_74974" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_7433_74974)">%0A<path d="M7.14894 11.7119C5.86819 11.7119 4.78356 11.2677 3.89506 10.3794C3.00669 9.49087 2.5625 8.40625 2.5625 7.1255C2.5625 5.84475 3.00669 4.76012 3.89506 3.87162C4.78356 2.98325 5.86819 2.53906 7.14894 2.53906C8.42969 2.53906 9.51431 2.98325 10.4028 3.87162C11.2912 4.76012 11.7354 5.84475 11.7354 7.1255C11.7354 7.66112 11.6455 8.17269 11.4657 8.66019C11.2859 9.14769 11.0459 9.57169 10.7459 9.93219L15.0614 14.2477C15.1653 14.3514 15.2184 14.4819 15.2208 14.6392C15.2232 14.7964 15.1701 14.9294 15.0614 15.038C14.9528 15.1466 14.8211 15.2009 14.6662 15.2009C14.5114 15.2009 14.3797 15.1466 14.2711 15.038L9.95563 10.7225C9.58063 11.0321 9.14937 11.2744 8.66187 11.4494C8.17437 11.6244 7.67006 11.7119 7.14894 11.7119ZM7.14894 10.5871C8.11531 10.5871 8.93381 10.2517 9.60444 9.581C10.2752 8.91037 10.6106 8.09187 10.6106 7.1255C10.6106 6.15912 10.2752 5.34062 9.60444 4.67C8.93381 3.99925 8.11531 3.66387 7.14894 3.66387C6.18256 3.66387 5.36406 3.99925 4.69344 4.67C4.02269 5.34062 3.68731 6.15912 3.68731 7.1255C3.68731 8.09187 4.02269 8.91037 4.69344 9.581C5.36406 10.2517 6.18256 10.5871 7.14894 10.5871Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/components/atoms/TextInput/TextInput.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var pxToRem = (px) => `${px / 16}rem`;
var TextInput = (0, import_react8.forwardRef)(({
  id: idProp,
  label = "",
  type = "text",
  placeholder,
  validation = "none",
  required = false,
  value,
  defaultValue,
  onChange,
  onErrorChange,
  onVerifiedChange,
  errorMessage = "",
  maxLength,
  fullWidth = true,
  disabled = false,
  borderColorClass = "",
  className = "",
  rounded = "3",
  ariaLabel,
  pattern,
  showVerifiedStatus = false,
  isVerified = false,
  mask = false,
  maskOptions = {},
  showToggleIcon = false,
  disableClipboard = false,
  toggleIcon = visibility_on_default,
  toggleOffIcon = visibility_off_default,
  errorIcon = error_default,
  verifiedIcon = success_default,
  toggleIconSize = 18,
  statusIconSize = 16,
  isdCode = "+91",
  allowClear = false,
  onClear,
  prefix,
  suffix,
  showCount = false,
  onPressEnter,
  status: statusProp,
  variant = "outlined",
  trailingRail = "default",
  size = "md",
  autoCorrection = false,
  spellCheck: spellCheckProp,
  autoCorrect: autoCorrectProp,
  autoCapitalize: autoCapitalizeProp,
  inputClassName,
  inputStyle,
  style: styleProp,
  ...rest
}, ref) => {
  var _a, _b, _c;
  const isControlled = value !== void 0;
  const initialValue = (_a = isControlled ? value : defaultValue) != null ? _a : "";
  const [error, setError] = (0, import_react8.useState)(null);
  const [verified, setVerified] = (0, import_react8.useState)(isVerified);
  const [showValue, setShowValue] = (0, import_react8.useState)(false);
  const [displayValue, setDisplayValue] = (0, import_react8.useState)(initialValue);
  const [isFocused, setIsFocused] = (0, import_react8.useState)(false);
  const actualValueRef = (0, import_react8.useRef)(initialValue);
  const inputRef = (0, import_react8.useRef)(null);
  (0, import_react8.useImperativeHandle)(ref, () => inputRef.current, []);
  const validationFunctions = {
    name: isAlphabetic,
    email: isValidEmail,
    mobile: (val) => isMobile(val, isdCode),
    businessPID: isPanNumber,
    businessAID: isAadhaar,
    businessTAN: (val) => isTAN(val.toUpperCase()),
    acknowledgementNumber: (val) => isAcknowledgementNumber(val.toUpperCase()),
    businessPassport: isIndianPassport,
    businessTIN: isIndianTIN,
    stdCode: isValidSTDCode,
    landline: isValidLandlineNumber,
    alphanumeric: isAlphanumeric,
    numeric: isNumeric,
    pincode: isPincode,
    entityName: isEntityName
  };
  const reactId = (0, import_react8.useId)();
  const inputId = (idProp == null ? void 0 : idProp.trim()) ? idProp : `text-input-${reactId}`;
  (0, import_react8.useEffect)(() => {
    const next = (isControlled ? value : actualValueRef.current) || "";
    actualValueRef.current = next;
    updateDisplayValue(next);
  }, [value]);
  (0, import_react8.useEffect)(() => {
    setVerified(isVerified);
  }, [isVerified]);
  (0, import_react8.useEffect)(() => {
    if (errorMessage && actualValueRef.current) {
      setError(errorMessage);
    } else if (!errorMessage) {
      setError(null);
    }
  }, [errorMessage]);
  const resolvedMaxLength = (0, import_react8.useMemo)(() => {
    if (maxLength !== void 0)
      return maxLength;
    switch (validation) {
      case "name":
        return 50;
      case "email":
        return 100;
      case "mobile": {
        if (isdCode === "+91") {
          return 10;
        }
        return 15;
      }
      case "businessPID":
        return 10;
      case "businessAID":
        return 12;
      case "businessTAN":
        return 10;
      case "businessPassport":
        return 8;
      case "businessTIN":
        return 20;
      case "acknowledgementNumber":
        return 20;
      case "stdCode":
        return 8;
      case "landline":
        return 15;
      case "numeric":
        return 200;
      case "alphanumeric":
        return 500;
      case "pincode":
        return 6;
      case "headerSearch":
        return 200;
      default:
        return 255;
    }
  }, [maxLength, validation, isdCode]);
  const maskValue = (val) => {
    if (!mask || !val)
      return val;
    try {
      const masker = new Masker(4, {
        maskChar: "*",
        maskFrom: "start",
        maskPattern: [1, 1],
        ...maskOptions
      });
      const maskedString = masker.maskString(val);
      if (validation === "businessAID") {
        return formatAadhaarDisplay(maskedString);
      }
      return maskedString;
    } catch (error2) {
      console.warn("Masking failed, showing plain text");
      return val;
    }
  };
  const normalizeSpaces = (value2) => {
    return value2.replace(/\s{2,}/g, " ");
  };
  const updateDisplayValue = (val) => {
    if (mask && !showValue && val) {
      setDisplayValue(maskValue(val));
    } else {
      setDisplayValue(formatDisplayValue(val));
    }
  };
  const removeAllSpaces = (input) => {
    return input.replace(/\s/g, "");
  };
  const trimSpaces = (input) => {
    return input.trim();
  };
  const formatAadhaarDisplay = (val) => {
    const cleaned = removeAllSpaces(val);
    if (cleaned.length <= 4)
      return cleaned;
    if (cleaned.length <= 8)
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)}`;
  };
  const formatDisplayValue = (val) => {
    if (validation === "custom") {
      return val;
    }
    if (validation === "headerSearch") {
      return val;
    }
    const cleaned = removeAllSpaces(val);
    if (validation === "mobile") {
      return cleaned.toUpperCase();
    }
    if (validation === "businessAID") {
      return formatAadhaarDisplay(cleaned);
    }
    if (validation === "businessPID") {
      return cleaned.toUpperCase();
    }
    if (validation === "businessTIN") {
      return cleaned.toUpperCase();
    }
    if (validation === "businessTAN") {
      return cleaned.toUpperCase();
    }
    if (validation === "acknowledgementNumber") {
      return cleaned.toUpperCase();
    }
    if (validation === "stdCode" || validation === "landline") {
      return cleaned;
    }
    if (validation === "pincode") {
      return cleaned;
    }
    if (validation === "numeric") {
      return cleaned;
    }
    if (validation === "email") {
      return trimSpaces(val);
    }
    if (validation === "name") {
      return normalizeSpaces(val);
    }
    if (validation === "alphanumeric") {
      return normalizeSpaces(val);
    }
    if (validation === "entityName") {
      return val;
    }
    return trimSpaces(val);
  };
  const resolvePattern = (pattern2) => {
    if (!pattern2)
      return null;
    if (pattern2 instanceof RegExp)
      return pattern2;
    try {
      return new RegExp(pattern2);
    } catch (e) {
      console.warn("Invalid regex pattern:", pattern2);
      return null;
    }
  };
  const validateInput = (val) => {
    if (validation === "none" || validation === "headerSearch")
      return null;
    let cleanedVal = val;
    if (validation === "custom") {
      cleanedVal = trimSpaces(val);
    } else {
      cleanedVal = removeAllSpaces(val);
    }
    if (cleanedVal === "")
      return null;
    let isValid = false;
    const validatorFn = validationFunctions[validation];
    if (validatorFn) {
      if (validation === "entityName") {
        isValid = validatorFn(val);
      } else {
        isValid = validatorFn(cleanedVal);
      }
      if (!isValid) {
        if (validation === "mobile") {
          if (isdCode === "+91") {
            return errorMessage || "Invalid mobile number";
          } else {
            return errorMessage || "Invalid mobile number";
          }
        }
        if (validation === "businessAID")
          return errorMessage || "Invalid Aadhaar format";
        if (validation === "businessPID")
          return errorMessage || "Invalid PAN format";
        if (validation === "businessTAN")
          return errorMessage || "Invalid TAN format";
        if (validation === "businessPassport")
          return errorMessage || "Invalid Passport format";
        if (validation === "businessTIN")
          return errorMessage || "Invalid TIN format";
        if (validation === "acknowledgementNumber")
          return errorMessage || "Invalid Acknowledgement Number format";
        if (validation === "stdCode")
          return errorMessage || "Invalid STD code";
        if (validation === "landline")
          return errorMessage || "Invalid landline number";
        if (validation === "entityName")
          return errorMessage || "Invalid Entity Name";
        return errorMessage || `Invalid ${validation} format`;
      }
    } else if (validation === "custom" && pattern) {
      const regex = resolvePattern(pattern);
      if (!regex)
        return "Invalid pattern";
      isValid = regex.test(cleanedVal);
      if (!isValid)
        return errorMessage || "Invalid format";
    } else {
      return null;
    }
    if (showVerifiedStatus && isValid && cleanedVal !== "") {
      setVerified(true);
      onVerifiedChange == null ? void 0 : onVerifiedChange(true);
    } else if (showVerifiedStatus && !isValid) {
      setVerified(false);
      onVerifiedChange == null ? void 0 : onVerifiedChange(false);
    }
    return null;
  };
  const handleClipboardEvents = (e) => {
    if (disableClipboard) {
      e.preventDefault();
      return false;
    }
    return true;
  };
  const handleContextMenu = (e) => {
    if (disableClipboard) {
      e.preventDefault();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onPressEnter == null ? void 0 : onPressEnter(e);
    }
    if (disableClipboard) {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed) {
        const key = e.key.toLowerCase();
        if (key === "c" || key === "x" || key === "v") {
          e.preventDefault();
        }
      }
      if (e.key === "F10" || e.shiftKey && e.key === "F10") {
        e.preventDefault();
      }
    }
  };
  const handleClear = (e) => {
    var _a2;
    e.preventDefault();
    e.stopPropagation();
    if (disabled)
      return;
    actualValueRef.current = "";
    setDisplayValue("");
    setError(null);
    setShowValue(false);
    onChange == null ? void 0 : onChange("");
    onErrorChange == null ? void 0 : onErrorChange(null);
    onClear == null ? void 0 : onClear();
    (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
  };
  const handleChange = (e) => {
    if (disabled)
      return;
    let inputValue = e.target.value;
    if (mask && !showValue) {
      const currentActual = actualValueRef.current;
      const currentDisplay = displayValue;
      const inputWithoutSpaces = removeAllSpaces(inputValue);
      const currentWithoutSpaces = removeAllSpaces(currentDisplay);
      if (inputWithoutSpaces.length < currentWithoutSpaces.length) {
        const newActual = currentActual.slice(0, inputWithoutSpaces.length);
        actualValueRef.current = newActual;
        updateDisplayValue(newActual);
        onChange == null ? void 0 : onChange(newActual);
      } else if (inputWithoutSpaces.length > currentWithoutSpaces.length) {
        const newChars = inputWithoutSpaces.slice(currentWithoutSpaces.length);
        if ((validation === "mobile" || validation === "businessAID" || validation === "pincode" || validation === "numeric" || validation === "stdCode" || validation === "landline") && !/^\d+$/.test(newChars)) {
          return;
        }
        const newActual = (currentActual + newChars).slice(0, resolvedMaxLength);
        actualValueRef.current = newActual;
        updateDisplayValue(newActual);
        onChange == null ? void 0 : onChange(newActual);
      }
    } else {
      let cleanedInput = inputValue;
      if (validation === "name") {
        cleanedInput = normalizeSpaces(cleanedInput);
      } else if (validation === "alphanumeric" || validation === "none") {
        cleanedInput = normalizeSpaces(cleanedInput);
      } else if (validation === "headerSearch") {
        cleanedInput = inputValue;
      } else if (validation === "custom") {
        cleanedInput = inputValue;
      } else {
        cleanedInput = removeAllSpaces(cleanedInput);
      }
      if (validation === "headerSearch" && pattern) {
        const charRe = resolvePattern(pattern);
        if (charRe && cleanedInput) {
          cleanedInput = Array.from(cleanedInput).filter((ch) => charRe.test(ch)).join("");
        }
      }
      if ((validation === "businessAID" || validation === "pincode" || validation === "numeric" || validation === "stdCode" || validation === "landline") && cleanedInput && !/^\d+$/.test(cleanedInput)) {
        return;
      }
      if (validation === "businessTIN") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput))
          return;
        cleanedInput = cleanedInput.toUpperCase();
      }
      if (validation === "businessTAN") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput))
          return;
        cleanedInput = cleanedInput.toUpperCase();
      }
      if (validation === "acknowledgementNumber") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput))
          return;
        cleanedInput = cleanedInput.toUpperCase();
      }
      if (validation === "alphanumeric" && cleanedInput && !isAlphanumeric(cleanedInput)) {
        return;
      }
      if (validation === "entityName") {
        cleanedInput = inputValue;
      }
      const actualValue = cleanedInput.slice(0, resolvedMaxLength);
      const formattedDisplayValue = formatDisplayValue(actualValue);
      actualValueRef.current = actualValue;
      setDisplayValue(formattedDisplayValue);
      onChange == null ? void 0 : onChange(actualValue);
    }
    if (showVerifiedStatus && verified) {
      setVerified(false);
      onVerifiedChange == null ? void 0 : onVerifiedChange(false);
    }
    const err = validateInput(actualValueRef.current);
    setError(err);
    onErrorChange == null ? void 0 : onErrorChange(err);
  };
  const handleToggleVisibility = () => {
    const newShowValue = !showValue;
    setShowValue(newShowValue);
    if (newShowValue) {
      const formattedValue = formatDisplayValue(actualValueRef.current);
      setDisplayValue(formattedValue);
    } else {
      setDisplayValue(maskValue(actualValueRef.current));
    }
  };
  const handleBlur = () => {
    setIsFocused(false);
    let actualValue = actualValueRef.current;
    if (validation === "name") {
      const normalized = normalizeSpaces(actualValueRef.current).trim();
      actualValueRef.current = normalized;
      setDisplayValue(normalized);
      actualValue = normalized;
      onChange == null ? void 0 : onChange(normalized);
    }
    if (validation === "custom") {
      const trimmed = actualValueRef.current.trim();
      actualValueRef.current = trimmed;
      setDisplayValue(trimmed);
      actualValue = trimmed;
      onChange == null ? void 0 : onChange(trimmed);
    }
    const err = validateInput(actualValue);
    setError(err);
    onErrorChange == null ? void 0 : onErrorChange(err);
    if (mask && !showValue) {
      setDisplayValue(maskValue(actualValue));
    } else {
      setDisplayValue(formatDisplayValue(actualValue));
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const roundedStyle = roundedToCssCorner(rounded);
  const getInputType = () => {
    if (showValue)
      return "text";
    if (type === "password" && showToggleIcon)
      return "password";
    return type;
  };
  const hasValue = ((_b = displayValue == null ? void 0 : displayValue.trim()) != null ? _b : "") !== "";
  const resolvedStatus = statusProp != null ? statusProp : error ? "error" : verified ? "success" : void 0;
  const baseSizeTokens = {
    sm: {
      minHeight: "var(--button-height-sm)",
      horizontalPadding: "0.625rem",
      addonPadding: "0.5rem",
      fontSize: "var(--text-small-size)"
    },
    md: {
      minHeight: "var(--button-height-lg)",
      horizontalPadding: "0.75rem",
      addonPadding: "0.625rem",
      fontSize: "var(--text-body-size)"
    },
    lg: {
      minHeight: "3rem",
      horizontalPadding: "0.875rem",
      addonPadding: "0.75rem",
      fontSize: "var(--text-body-size)"
    }
  };
  const isHeaderSearchRail = validation === "headerSearch";
  const isIntegratedRail = trailingRail === "integrated" && isHeaderSearchRail;
  const hdr = isHeaderSearchRail ? HEADER_SEARCH_LAYOUT[size] : void 0;
  const fieldMetrics = hdr ? {
    minHeight: hdr.shellMinHeightToken,
    horizontalPadding: pxToRem(hdr.horizontalPadding),
    addonPadding: baseSizeTokens[size].addonPadding,
    fontSize: baseSizeTokens[size].fontSize,
    inputLineHeight: hdr.inputLineHeight,
    suffixPadLeft: pxToRem(hdr.suffixPadLeft),
    suffixPadRight: pxToRem(hdr.suffixPadRight),
    prefixPadLR: pxToRem(hdr.prefixAddonPadding),
    clearIconPx: pxToRem(hdr.clearIconSize),
    clearPadX: pxToRem(hdr.clearHitPaddingX),
    decorativeTrailingPx: pxToRem(hdr.decorativeTrailingSearchIcon)
  } : {
    minHeight: baseSizeTokens[size].minHeight,
    horizontalPadding: baseSizeTokens[size].horizontalPadding,
    addonPadding: baseSizeTokens[size].addonPadding,
    fontSize: baseSizeTokens[size].fontSize,
    inputLineHeight: 1.5,
    suffixPadLeft: baseSizeTokens[size].addonPadding,
    suffixPadRight: baseSizeTokens[size].addonPadding,
    prefixPadLR: baseSizeTokens[size].addonPadding,
    clearIconPx: 14,
    clearPadX: baseSizeTokens[size].addonPadding,
    decorativeTrailingPx: 16
  };
  const shouldShowToggle = showToggleIcon && type === "password";
  const colors = {
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    bgSurface: "var(--color-bg-surface)",
    bgPage: "var(--color-bg-page)",
    borderDefault: "var(--color-border-default)",
    stateError: "var(--color-state-error)",
    stateWarning: "var(--color-state-warning)",
    stateSuccess: "var(--color-state-success)"
  };
  const resolvedBorderColor = resolvedStatus === "error" ? colors.stateError : resolvedStatus === "warning" ? colors.stateWarning : resolvedStatus === "success" ? colors.stateSuccess : isFocused ? "var(--button-primary-focus-ring)" : colors.borderDefault;
  const wrapperStyle = variant === "filled" ? {
    minHeight: fieldMetrics.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: colors.bgPage,
    border: `1.5px solid ${resolvedBorderColor}`
  } : variant === "borderless" ? {
    minHeight: fieldMetrics.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: "transparent",
    border: "1px solid transparent"
  } : variant === "underlined" ? {
    minHeight: fieldMetrics.minHeight,
    borderRadius: 0,
    boxSizing: "border-box",
    backgroundColor: "transparent",
    border: "0 solid transparent",
    borderBottomWidth: 1.5,
    borderBottomColor: resolvedBorderColor
  } : {
    minHeight: fieldMetrics.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: colors.bgSurface,
    border: `1.5px solid ${resolvedBorderColor}`
  };
  const resolvedSuffix = suffix !== void 0 ? suffix : type === "search" ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    Icon_default,
    {
      src: search_default,
      alt: "",
      width: fieldMetrics.decorativeTrailingPx,
      height: fieldMetrics.decorativeTrailingPx
    }
  ) : null;
  const hasRightAddons = Boolean(resolvedSuffix || allowClear && hasValue && !disabled || shouldShowToggle);
  const charCount = (_c = displayValue == null ? void 0 : displayValue.length) != null ? _c : 0;
  const countMax = validation === "businessAID" ? resolvedMaxLength + 2 : resolvedMaxLength;
  const fieldWrapperStyle = {
    ...wrapperStyle,
    ...isHeaderSearchRail ? { maxHeight: fieldMetrics.minHeight } : {},
    display: "grid",
    alignItems: "stretch",
    overflow: "hidden",
    width: fullWidth ? "100%" : "auto",
    gridTemplateColumns: `${prefix ? "auto " : ""}minmax(0, 1fr)${hasRightAddons ? " auto" : ""}`,
    transition: "border-color 150ms, box-shadow 150ms, background-color 150ms",
    ...isIntegratedRail ? { gap: 0 } : {},
    ...isIntegratedRail ? {
      "--ucs-textfield-outer-radius": roundedStyle === 0 ? "0" : roundedStyle
    } : {}
  };
  const suffixPadLeft = isIntegratedRail ? 0 : fieldMetrics.suffixPadLeft;
  const suffixPadRight = isIntegratedRail ? 0 : fieldMetrics.suffixPadRight;
  const inputElementStyle = {
    height: fieldMetrics.minHeight,
    fontSize: fieldMetrics.fontSize,
    lineHeight: fieldMetrics.inputLineHeight,
    boxSizing: "border-box",
    display: "block",
    width: "100%",
    minWidth: 0,
    margin: 0,
    border: "none",
    outline: "none",
    boxShadow: "none",
    borderRadius: 0,
    background: "transparent",
    appearance: "none",
    WebkitAppearance: "none",
    color: colors.textPrimary,
    caretColor: colors.textPrimary,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: prefix ? 0 : fieldMetrics.horizontalPadding,
    paddingRight: hasRightAddons ? 0 : fieldMetrics.horizontalPadding
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: `${fullWidth ? "w-full" : "inline-block"} ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "label",
      {
        htmlFor: inputId,
        className: "block text-[length:var(--text-secondary-size)] font-medium text-[var(--color-text-primary)] mb-2",
        style: {
          color: disabled ? colors.textSecondary : colors.textPrimary,
          cursor: disabled ? "not-allowed" : void 0
        },
        children: [
          label,
          required && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-[var(--color-state-error)] ml-0.5", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "div",
      {
        className: [
          disabled ? "opacity-50 cursor-not-allowed" : "",
          borderColorClass,
          isIntegratedRail ? "ucs-text-input-field--integrated-rail" : ""
        ].filter(Boolean).join(" "),
        style: fieldWrapperStyle,
        children: [
          prefix && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "stretch",
                flexShrink: 0,
                color: colors.textSecondary,
                paddingLeft: fieldMetrics.prefixPadLR,
                paddingRight: fieldMetrics.prefixPadLR
              },
              children: prefix
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "input",
            {
              ref: inputRef,
              id: inputId,
              type: getInputType(),
              disabled,
              value: displayValue,
              onChange: handleChange,
              onFocus: handleFocus,
              onBlur: handleBlur,
              onCopy: handleClipboardEvents,
              onCut: handleClipboardEvents,
              onPaste: handleClipboardEvents,
              onContextMenu: handleContextMenu,
              onKeyDown: handleKeyDown,
              maxLength: validation === "businessAID" ? resolvedMaxLength + 2 : resolvedMaxLength,
              "aria-label": ariaLabel || label,
              "aria-invalid": resolvedStatus === "error",
              "aria-required": required,
              placeholder,
              className: [
                "disabled:cursor-not-allowed",
                getInputType() === "search" ? "ucs-text-input--search" : "",
                inputClassName
              ].filter(Boolean).join(" "),
              ...rest,
              style: styleProp || inputStyle ? { ...inputElementStyle, ...styleProp, ...inputStyle } : inputElementStyle,
              spellCheck: spellCheckProp != null ? spellCheckProp : autoCorrection ? true : false,
              autoCorrect: autoCorrectProp != null ? autoCorrectProp : autoCorrection ? "on" : "off",
              autoCapitalize: autoCapitalizeProp != null ? autoCapitalizeProp : autoCorrection ? void 0 : "none"
            }
          ),
          hasRightAddons && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: isIntegratedRail ? "stretch" : "center",
                alignSelf: "stretch",
                flexShrink: 0,
                height: "100%",
                ...isIntegratedRail ? { minHeight: fieldMetrics.minHeight } : {}
              },
              children: (() => {
                const suffixJsx = resolvedSuffix ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "stretch",
                      flexShrink: 0,
                      color: colors.textSecondary,
                      paddingLeft: suffixPadLeft,
                      paddingRight: suffixPadRight
                    },
                    children: resolvedSuffix
                  }
                ) : null;
                const clearJsx = allowClear && hasValue && !disabled ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: handleClear,
                    className: "shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                    style: {
                      all: "unset",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      minWidth: isHeaderSearchRail ? pxToRem(isIntegratedRail ? 28 : 26) : fieldMetrics.minHeight,
                      paddingLeft: fieldMetrics.clearPadX,
                      paddingRight: fieldMetrics.clearPadX,
                      boxSizing: "border-box",
                      cursor: "pointer",
                      color: "inherit",
                      flexShrink: 0
                    },
                    "aria-label": "Clear",
                    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { src: close_default, alt: "", height: fieldMetrics.clearIconPx, width: fieldMetrics.clearIconPx, "aria-hidden": true })
                  }
                ) : null;
                const toggleJsx = shouldShowToggle ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: handleToggleVisibility,
                    className: "shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                    style: {
                      all: "unset",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      minWidth: fieldMetrics.minHeight,
                      paddingLeft: fieldMetrics.addonPadding,
                      paddingRight: fieldMetrics.addonPadding,
                      boxSizing: "border-box",
                      cursor: "pointer",
                      color: "inherit",
                      flexShrink: 0
                    },
                    "aria-label": showValue ? "Hide value" : "Show value",
                    tabIndex: disabled ? -1 : 0,
                    disabled,
                    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                      Icon_default,
                      {
                        src: showValue ? toggleOffIcon : toggleIcon,
                        alt: showValue ? "Hide" : "Show",
                        height: toggleIconSize,
                        width: toggleIconSize
                      }
                    )
                  }
                ) : null;
                if (isIntegratedRail) {
                  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
                    clearJsx,
                    suffixJsx,
                    toggleJsx
                  ] });
                }
                return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
                  suffixJsx,
                  clearJsx,
                  toggleJsx
                ] });
              })()
            }
          )
        ]
      }
    ),
    (showCount || showVerifiedStatus || error) && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 12,
          marginTop: 6,
          flexWrap: "wrap"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                minWidth: 0
              },
              children: [
                showVerifiedStatus && verified && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "var(--text-small-size, 12px)",
                      color: colors.stateSuccess
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { src: verifiedIcon, alt: "", height: statusIconSize, width: statusIconSize, "aria-hidden": true }),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: "Verified" })
                    ]
                  }
                ),
                error && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "var(--text-small-size, 12px)",
                      color: colors.stateError
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon_default, { src: errorIcon, alt: "", height: statusIconSize, width: statusIconSize, "aria-hidden": true }),
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: error })
                    ]
                  }
                )
              ]
            }
          ),
          showCount && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "span",
            {
              style: {
                fontSize: "var(--text-small-size, 12px)",
                color: colors.textSecondary,
                flexShrink: 0
              },
              children: [
                charCount,
                " / ",
                countMax
              ]
            }
          )
        ]
      }
    )
  ] });
});
var TextInput_default = TextInput;

// src/components/atoms/Button/index.tsx
var import_react10 = __toESM(require("react"));

// src/components/common/useRipple.tsx
var import_react9 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
function useRipple(enabled) {
  const [bursts, setBursts] = (0, import_react9.useState)([]);
  const seq = (0, import_react9.useRef)(0);
  const timersRef = (0, import_react9.useRef)([]);
  (0, import_react9.useEffect)(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);
  const onPointerDown = (0, import_react9.useCallback)(
    (e) => {
      if (!enabled)
        return;
      if (e.button !== 0)
        return;
      const rect = e.currentTarget.getBoundingClientRect();
      const id = ++seq.current;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setBursts((b) => [...b, { id, x, y }]);
      const t = window.setTimeout(() => {
        setBursts((b) => b.filter((k) => k.id !== id));
      }, 550);
      timersRef.current.push(t);
    },
    [enabled]
  );
  const RippleOverlay = bursts.length === 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "ucs-ripple-layer", "aria-hidden": "true", children: bursts.map((b) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "ucs-ripple-wave", style: { left: b.x, top: b.y } }, b.id)) });
  return { onPointerDown, RippleOverlay };
}

// src/components/atoms/Button/Button.config.ts
var variantClasses = {
  default: "btn-primary",
  primary: "btn-primary",
  secondary: "btn-secondary",
  outlinePrimary: "btn-outline-primary",
  outlineSecondary: "btn-outline-secondary",
  success: "btn-success",
  danger: "btn-danger",
  warning: "btn-warning",
  link: "btn-link",
  ghost: "btn-ghost"
};
var sizeClasses = {
  xxs: "btn-size-xxs",
  xs: "btn-size-xs",
  sm: "btn-size-sm",
  md: "btn-size-md",
  lg: "btn-size-lg"
};
var textSizeClasses = {
  sm: "btn-text-size-sm",
  md: "btn-text-size-md",
  lg: "btn-text-size-lg"
};
var iconOnlySizeClasses = {
  xxs: "btn-icon-only-xxs",
  xs: "btn-icon-only-xs",
  sm: "btn-icon-only-sm",
  md: "btn-icon-only-md",
  lg: "btn-icon-only-lg"
};
var radiusClass = "btn-rounded-md";
var defaultIconWithLabelSizeBySize = {
  xxs: { width: "0.625rem", height: "0.625rem" },
  xs: { width: "0.75rem", height: "0.75rem" },
  sm: { width: "0.8125rem", height: "0.8125rem" },
  md: { width: "0.875rem", height: "0.875rem" },
  lg: { width: "1rem", height: "1rem" }
};
var defaultIconOnlySizeBySize = {
  xxs: { width: "0.6875rem", height: "0.6875rem" },
  xs: { width: "0.8125rem", height: "0.8125rem" },
  sm: { width: "1rem", height: "1rem" },
  md: { width: "1.125rem", height: "1.125rem" },
  lg: { width: "1.5rem", height: "1.5rem" }
};
var defaultIconConfig = {
  width: defaultIconWithLabelSizeBySize.lg.width,
  height: defaultIconWithLabelSizeBySize.lg.height,
  color: "currentColor"
};

// src/utils/safeHref.ts
var SAFE_PROTOCOLS = /* @__PURE__ */ new Set(["http:", "https:", "mailto:", "tel:"]);
function isSafeHref(href) {
  try {
    const url = new URL(href, "https://relative.invalid/");
    return SAFE_PROTOCOLS.has(url.protocol);
  } catch (e) {
    return false;
  }
}

// src/components/atoms/Button/index.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function isDev2() {
  var _a;
  const env = (_a = globalThis.process) == null ? void 0 : _a.env;
  return (env == null ? void 0 : env.NODE_ENV) !== "production";
}
var ANCHOR_ONLY_ATTRS = ["target", "rel", "download", "hrefLang", "ping", "referrerPolicy", "media"];
var VALID_VARIANTS = [
  "default",
  "primary",
  "secondary",
  "outlinePrimary",
  "outlineSecondary",
  "success",
  "danger",
  "warning",
  "link",
  "ghost"
];
function getVariantClass(v) {
  if (v === void 0 || v === null || v === "")
    return variantClasses.primary;
  if (VALID_VARIANTS.includes(v))
    return variantClasses[v];
  return variantClasses.primary;
}
var ButtonImpl = import_react10.default.forwardRef(function Button({
  children,
  variant = "primary",
  variantClass,
  size = "lg",
  width,
  height,
  rounded,
  classOverrides = {},
  borderColor,
  backgroundColor,
  textColor,
  gradient,
  gradientHover,
  gradientActive,
  textSize,
  icon,
  iconPosition = "left",
  iconWidth,
  iconHeight,
  iconColor,
  iconGap = 8,
  fullWidth = false,
  block = false,
  loading = false,
  className = "",
  ariaLabel,
  preserveIconColor = false,
  ripple = true,
  expandOnHover = false,
  unstyled = false,
  loadingText = "Loading",
  href,
  ...rest
}, ref) {
  var _a, _b, _c, _d;
  const hasText = !!children && (typeof children === "string" ? children.trim().length > 0 : import_react10.default.Children.count(children) > 0);
  const isIconOnly = !!icon && !hasText;
  const isExpandable = expandOnHover && !!icon && hasText;
  const variantClassNames = getVariantClass(variant);
  const resolvedVariant = variant == null || variant === "" ? "primary" : variant;
  const dsVariant = VALID_VARIANTS.includes(resolvedVariant) ? resolvedVariant : "primary";
  const sizeKey = (size != null ? size : "lg") in sizeClasses ? size : "lg";
  const sizeClassNames = isIconOnly ? (_a = iconOnlySizeClasses[sizeKey]) != null ? _a : iconOnlySizeClasses.lg : (_b = sizeClasses[sizeKey]) != null ? _b : sizeClasses.lg;
  const textSizeClassNames = textSize && textSize in textSizeClasses ? textSizeClasses[textSize] : "";
  const restAria = rest;
  const hasExplicitName = !!(ariaLabel || restAria["aria-label"] || restAria["aria-labelledby"]);
  const computedAriaLabel = (_c = ariaLabel != null ? ariaLabel : restAria["aria-label"]) != null ? _c : isIconOnly && !restAria["aria-labelledby"] ? "Button" : void 0;
  const unsafeHref = href != null && !isSafeHref(href);
  const linkHref = href != null && !unsafeHref ? href : void 0;
  import_react10.default.useEffect(() => {
    if (!isDev2())
      return;
    if (isIconOnly && !hasExplicitName) {
      console.warn(
        '[Button] Icon-only button has no accessible name. Pass `ariaLabel` (e.g. ariaLabel="Close"); falling back to "Button".'
      );
    }
  }, [isIconOnly, hasExplicitName]);
  import_react10.default.useEffect(() => {
    if (!isDev2() || !unsafeHref)
      return;
    console.warn(
      `[Button] Refused unsafe href ${JSON.stringify(href)} (only http, https, mailto, tel, relative and # links are allowed). Rendering a <button> instead.`
    );
  }, [unsafeHref, href]);
  const loadingId = import_react10.default.useId();
  const styleOverrides = {};
  if (backgroundColor)
    styleOverrides.backgroundColor = backgroundColor;
  if (borderColor)
    styleOverrides.borderColor = borderColor;
  if (textColor)
    styleOverrides.color = textColor;
  if (width !== void 0)
    styleOverrides.width = typeof width === "number" ? `${width}px` : width;
  if (height !== void 0)
    styleOverrides.height = typeof height === "number" ? `${height}px` : height;
  if (gradient) {
    styleOverrides["--button-gradient-bg"] = gradient;
    styleOverrides["--button-gradient-hover-bg"] = gradientHover || gradient;
    styleOverrides["--button-gradient-active-bg"] = gradientActive || gradientHover || gradient;
  }
  const baseClass = unstyled ? ["btn-unstyled", loading ? "btn-loading" : "", className].filter(Boolean).join(" ") : [
    "btn-base",
    variantClassNames,
    sizeClassNames,
    textSizeClassNames,
    loading ? "btn-loading" : "",
    gradient ? "btn-gradient" : "",
    variantClass != null ? variantClass : "",
    (_d = classOverrides.variant) != null ? _d : "",
    rounded !== void 0 ? `btn-rounded-${rounded}` : radiusClass,
    fullWidth || block ? "btn-full-width" : "",
    isExpandable ? "btn-expand-on-hover" : "",
    className
  ].filter(Boolean).join(" ");
  const iconSizeDefaults = isIconOnly ? defaultIconOnlySizeBySize[sizeKey] : defaultIconWithLabelSizeBySize[sizeKey];
  const finalIconWidth = iconWidth != null ? iconWidth : iconSizeDefaults.width;
  const finalIconHeight = iconHeight != null ? iconHeight : iconSizeDefaults.height;
  if (isExpandable) {
    const iconW = typeof finalIconWidth === "number" ? `${finalIconWidth}px` : finalIconWidth;
    styleOverrides["--btn-expand-pad"] = `calc((var(--button-height-${sizeKey}) - ${iconW}) / 2 - 1.5px)`;
    styleOverrides["--btn-expand-pad-open"] = `var(--button-padding-x-${sizeKey})`;
  }
  const gapPx = Math.min(16, Math.max(0, iconGap));
  const gapSnap = [0, 4, 8, 12, 16].reduce((a, b) => Math.abs(b - gapPx) < Math.abs(a - gapPx) ? b : a);
  const iconGapClass = !hasText || isExpandable || gapSnap === 8 ? "" : iconPosition === "left" ? `btn-icon-gap-right-${gapSnap}` : `btn-icon-gap-left-${gapSnap}`;
  const renderIcon = () => {
    if (!icon)
      return null;
    const wrapperClass = [
      hasText && iconPosition === "left" && "btn-icon-left",
      hasText && iconPosition === "right" && "btn-icon-right",
      iconGapClass
    ].filter(Boolean).join(" ");
    if (loading) {
      const dim = (v) => typeof v === "number" ? `${v}px` : v;
      return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        "span",
        {
          className: ["btn-spinner-slot", wrapperClass].filter(Boolean).join(" "),
          style: { width: dim(finalIconWidth), height: dim(finalIconHeight) },
          "aria-hidden": "true",
          children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "btn-spinner", "aria-hidden": "true" })
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: wrapperClass || void 0, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      Icon_default,
      {
        src: icon,
        width: finalIconWidth,
        height: finalIconHeight,
        preserveColors: preserveIconColor,
        color: iconColor || "currentColor",
        className: "btn-icon-inner"
      }
    ) });
  };
  const hasOverrides = Object.keys(styleOverrides).length > 0;
  const { style: restStyle, onPointerDown: restOnPointerDown, ...restWithoutStyle } = rest;
  const mergedStyle = hasOverrides ? { ...restStyle, ...styleOverrides } : restStyle;
  const content = /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    loading && !icon && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "btn-spinner", "aria-hidden": "true" }),
    icon && iconPosition === "left" && renderIcon(),
    isExpandable ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "btn-expand-label", children }) : children,
    icon && iconPosition === "right" && renderIcon(),
    loading && // Referenced by aria-describedby: the name stays the label ("Save"), the state is described ("Loading").
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { id: loadingId, className: "sr-only", "aria-hidden": "true", children: loadingText })
  ] });
  const nativeDisabled = Boolean(rest.disabled);
  const isDisabled = nativeDisabled || loading;
  const ariaBusy = loading ? true : restAria["aria-busy"];
  const describedBy = [restAria["aria-describedby"], loading ? loadingId : void 0].filter(Boolean).join(" ") || void 0;
  const rippleEnabled = ripple !== false && !isDisabled && !unstyled;
  const rippleApi = useRipple(rippleEnabled);
  const pointerDown = (e) => {
    rippleApi.onPointerDown(e);
    restOnPointerDown == null ? void 0 : restOnPointerDown(e);
  };
  const innerClass = [
    "btn-ripple-inner",
    fullWidth || block ? "btn-ripple-inner--full" : ""
  ].filter(Boolean).join(" ");
  const surfaceClass = rippleEnabled ? `${baseClass} ucs-ripple-parent`.trim() : baseClass;
  const body = rippleEnabled ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    rippleApi.RippleOverlay,
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: innerClass, children: content })
  ] }) : content;
  if (linkHref !== void 0) {
    const { onClick, rel, ...linkRest } = restWithoutStyle;
    const finalRel = rel != null ? rel : linkRest.target === "_blank" ? "noopener noreferrer" : void 0;
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "a",
      {
        ...linkRest,
        ref,
        href: nativeDisabled ? void 0 : linkHref,
        rel: finalRel,
        className: surfaceClass,
        style: mergedStyle,
        "aria-label": computedAriaLabel != null ? computedAriaLabel : void 0,
        "aria-disabled": isDisabled || void 0,
        "aria-busy": ariaBusy,
        "aria-describedby": describedBy,
        "data-variant": dsVariant,
        "data-raw-variant": variant,
        onPointerDown: rippleEnabled ? pointerDown : restOnPointerDown,
        onClick: (e) => {
          if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick == null ? void 0 : onClick(e);
        },
        children: body
      }
    );
  }
  const buttonRest = { ...restWithoutStyle };
  if (isExpandable && buttonRest.title == null && typeof children === "string")
    buttonRest.title = children;
  if (unsafeHref)
    for (const attr of ANCHOR_ONLY_ATTRS)
      delete buttonRest[attr];
  const { onClick: buttonOnClick, ...buttonAttrs } = buttonRest;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "button",
    {
      ...unsafeHref ? { type: "button" } : null,
      ...buttonAttrs,
      ref,
      className: surfaceClass,
      style: mergedStyle,
      disabled: nativeDisabled,
      "aria-label": computedAriaLabel != null ? computedAriaLabel : void 0,
      "aria-disabled": loading && !nativeDisabled ? true : buttonAttrs["aria-disabled"],
      "aria-busy": ariaBusy,
      "aria-describedby": describedBy,
      "data-variant": dsVariant,
      "data-raw-variant": variant,
      onPointerDown: rippleEnabled ? pointerDown : restOnPointerDown,
      onClick: (e) => {
        if (loading) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        buttonOnClick == null ? void 0 : buttonOnClick(e);
      },
      children: body
    }
  );
});
var Button2 = import_react10.default.memo(ButtonImpl);
Button2.displayName = "Button";
ButtonImpl.displayName = "Button";
var Button_default = Button2;

// src/components/atoms/TextInputSearch/TextInputSearch.utils.ts
function railButtonSize(inputSize) {
  switch (inputSize) {
    case "lg":
      return "sm";
    case "md":
      return "xs";
    default:
      return "xxs";
  }
}

// src/components/atoms/TextInputSearch/index.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var pxToRem2 = (px) => `${px / 16}rem`;
function railKey(inputSize) {
  if (inputSize === "lg")
    return "lg";
  if (inputSize === "md")
    return "md";
  return "sm";
}
var SEARCH_SHELL_ROUNDED = "3";
var TextInputSearch = import_react11.default.forwardRef(function TextInputSearch2({
  id = "search",
  leftIcon = search_default,
  leftIconHeight,
  leftIconWidth,
  leftIconColor = "var(--color-text-primary)",
  placeholder = "Search...",
  value = "",
  onChange = () => {
  },
  onSearch,
  errorMessage = "",
  size = "sm",
  fullWidth = true,
  disabled = false,
  className = "",
  containerClassName = "text-input-search-wrapper",
  containerStyle = {},
  ariaLabel = "Search input",
  showClearButton,
  showSearchButton = false,
  searchButtonDisplay = "icon",
  searchButtonIcon,
  searchButtonIconWidth,
  searchButtonIconHeight,
  searchButtonAriaLabel,
  searchButtonLabel = "Search",
  searchActionButtonProps,
  suffix,
  trailingRail: trailingRailProp,
  pattern,
  autoCorrection = false,
  autoComplete = "off"
}, ref) {
  var _a, _b, _c, _d, _e;
  const errorId = `${id}-error`;
  const labelId = `${id}-label`;
  const resolvedSize = size || "sm";
  const hdr = HEADER_SEARCH_LAYOUT[railKey(resolvedSize)];
  const allowClearResolved = showClearButton !== void 0 ? showClearButton : !showSearchButton;
  const handleSearch = () => {
    if (disabled)
      return;
    onSearch == null ? void 0 : onSearch(value);
  };
  const {
    variant = "primary",
    size: actionSizeProp,
    rounded,
    icon: btnIconPass,
    iconWidth: btnIconWidthProp,
    iconHeight: btnIconHeightProp,
    iconColor: btnIconColorProp,
    ariaLabel: btnAriaPass,
    className: actionClassName,
    children: btnChildren,
    ripple = true,
    style: userSearchActionStyles,
    ...restSearchActionBtn
  } = searchActionButtonProps != null ? searchActionButtonProps : {};
  const mergedRounded = rounded != null ? rounded : "3";
  const trailingRailResolved = trailingRailProp != null ? trailingRailProp : showSearchButton && suffix === void 0 ? "integrated" : "default";
  const useIntegratedRail = trailingRailResolved === "integrated";
  const displayIconSrc = searchButtonDisplay === "icon" ? (_a = btnIconPass != null ? btnIconPass : searchButtonIcon) != null ? _a : search_default : btnIconPass;
  const iconInset = Math.round(hdr.searchActionInsetHeight * 0.48);
  const iw = (_b = btnIconWidthProp != null ? btnIconWidthProp : searchButtonIconWidth) != null ? _b : pxToRem2(iconInset);
  const ih = (_c = btnIconHeightProp != null ? btnIconHeightProp : searchButtonIconHeight) != null ? _c : iw;
  const prefixIconSize = leftIconHeight != null ? leftIconHeight : pxToRem2(Math.round(hdr.shellMinHeight * 0.42));
  const prefixIconWidth = leftIconWidth != null ? leftIconWidth : prefixIconSize;
  const iconOnlyName = searchButtonDisplay === "icon" ? (_d = btnAriaPass != null ? btnAriaPass : searchButtonAriaLabel) != null ? _d : searchButtonLabel : void 0;
  const trailingCorner = roundedToCssCorner(SEARCH_SHELL_ROUNDED);
  const mergedActionStyle = useIntegratedRail ? {
    ...userSearchActionStyles && typeof userSearchActionStyles === "object" ? userSearchActionStyles : {},
    alignSelf: "stretch",
    height: "100%",
    minHeight: hdr.shellMinHeightToken,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: trailingCorner,
    borderBottomRightRadius: trailingCorner,
    boxSizing: "border-box",
    ...searchButtonDisplay === "icon" ? {
      paddingLeft: pxToRem2(hdr.integratedIconPadX),
      paddingRight: pxToRem2(hdr.integratedIconPadX)
    } : {}
  } : {
    ...userSearchActionStyles && typeof userSearchActionStyles === "object" ? userSearchActionStyles : {},
    height: pxToRem2(hdr.searchActionInsetHeight),
    minHeight: 0,
    alignSelf: "center",
    boxSizing: "border-box"
  };
  if (searchButtonDisplay === "icon") {
    mergedActionStyle.minWidth = 0;
  }
  const suffixForInput = suffix !== void 0 ? suffix : showSearchButton ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "span",
    {
      className: useIntegratedRail ? "ucs-search-input__integrated-action-slot inline-flex h-full min-h-0 shrink-0 items-stretch self-stretch" : "ucs-search-input__integrated-action-slot inline-flex shrink-0 items-center",
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        Button_default,
        {
          ...restSearchActionBtn,
          type: "button",
          variant,
          size: actionSizeProp != null ? actionSizeProp : railButtonSize(resolvedSize),
          rounded: useIntegratedRail ? "0" : mergedRounded,
          disabled,
          ripple,
          onClick: handleSearch,
          style: mergedActionStyle,
          className: ["ucs-search-input__inline-action shrink-0", actionClassName].filter(Boolean).join(" "),
          icon: (searchButtonDisplay === "icon" || btnIconPass) && displayIconSrc ? displayIconSrc : void 0,
          iconWidth: (searchButtonDisplay === "icon" || btnIconPass) && displayIconSrc ? iw : void 0,
          iconHeight: (searchButtonDisplay === "icon" || btnIconPass) && displayIconSrc ? ih : void 0,
          iconColor: btnIconColorProp,
          ariaLabel: searchButtonDisplay === "icon" ? iconOnlyName : (_e = btnAriaPass != null ? btnAriaPass : searchButtonAriaLabel) != null ? _e : void 0,
          children: searchButtonDisplay === "text" ? btnChildren != null ? btnChildren : searchButtonLabel : void 0
        }
      )
    }
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    "div",
    {
      className: [containerClassName.trim(), fullWidth ? "ds-input-search--full" : ""].filter(Boolean).join(" "),
      style: {
        ...fullWidth ? null : { width: "auto" },
        ...containerStyle
      },
      role: "search",
      "aria-labelledby": labelId,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("label", { id: labelId, htmlFor: id, className: "visually-hidden", children: ariaLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          TextInput_default,
          {
            ref,
            id,
            type: "search",
            placeholder,
            validation: "headerSearch",
            pattern,
            autoCorrection,
            autoComplete,
            value,
            onChange,
            errorMessage,
            size: resolvedSize,
            fullWidth,
            disabled,
            variant: "outlined",
            rounded: SEARCH_SHELL_ROUNDED,
            allowClear: allowClearResolved,
            prefix: leftIcon ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              Icon_default,
              {
                src: leftIcon,
                height: prefixIconSize,
                width: prefixIconWidth,
                color: leftIconColor,
                "aria-hidden": "true"
              }
            ) : void 0,
            suffix: suffixForInput,
            onPressEnter: handleSearch,
            ariaLabel,
            "aria-invalid": !!errorMessage,
            "aria-describedby": errorMessage ? errorId : void 0,
            className,
            trailingRail: trailingRailResolved
          }
        ),
        errorMessage && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { id: errorId, role: "alert", className: "visually-hidden", children: errorMessage })
      ]
    }
  );
});
TextInputSearch.displayName = "TextInputSearch";
var TextInputSearch_default = TextInputSearch;

// src/components/molecules/Table/Table.config.ts
var tableConfig = {
  default: {
    table: "table-base table-layout-auto",
    thead: {
      primary: "table-thead table-thead-theme-primary",
      secondary: "table-thead table-thead-theme-primary",
      light: "table-thead table-thead-theme-light",
      dark: "table-thead table-thead-theme-dark",
      success: "table-thead table-thead-theme-primary",
      warning: "table-thead table-thead-theme-light",
      danger: "table-thead table-thead-theme-primary",
      info: "table-thead table-thead-theme-light"
    },
    th: "",
    td: "",
    striped: "table-striped",
    hover: "table-hover",
    compact: {
      th: "table-compact",
      td: "table-compact"
    }
  }
};

// src/components/molecules/Table/Table.utils.ts
var cls4 = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// src/components/atoms/Checkbox/index.tsx
var import_react12 = __toESM(require("react"));

// src/components/atoms/Checkbox/Checkbox.config.ts
var defaultCheckboxColorClass = "";
var defaultLabelColorClass = "text-body text-text-primary cursor-pointer";
var defaultCheckboxInputLabelSpacing = "";
var CHECKBOX_DEFAULTS = {
  size: "md"
};

// src/components/atoms/Checkbox/Checkbox.utils.ts
function cls5(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/atoms/Checkbox/index.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react12.useLayoutEffect : import_react12.useEffect;
var CheckboxGlyph = () => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("svg", { className: "ucs-cc-checkbox-check", "aria-hidden": true, viewBox: "0 0 12 12", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { className: "ucs-cc-checkbox-checkpath", d: "M2.75 6.05 L5.15 9.05 L9.95 3.25" }) });
var DashGlyph = () => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("svg", { className: "ucs-cc-checkbox-dash", "aria-hidden": true, viewBox: "0 0 12 12", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { className: "ucs-cc-checkbox-dashpath", d: "M3 6 H9" }) });
var CheckboxBase = import_react12.default.forwardRef(function Checkbox({
  label,
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
  indeterminate = false,
  description,
  size = CHECKBOX_DEFAULTS.size,
  error,
  required = false,
  id,
  checkboxColorClass = defaultCheckboxColorClass,
  labelColorClass = defaultLabelColorClass,
  inputLabelSpacingClass = defaultCheckboxInputLabelSpacing,
  className = "",
  shape = "default",
  rounded = "3",
  withShadow = false,
  ariaLabel,
  ariaLabelledBy,
  hideLabel = false,
  "aria-label": ariaLabelAttr,
  "aria-labelledby": ariaLabelledByAttr,
  "aria-describedby": ariaDescribedByAttr,
  ...nativeProps
}, forwardedRef) {
  const generatedId = (0, import_react12.useId)();
  const checkboxId = id != null ? id : `ucs-cb-${generatedId}`;
  const labelId = `${checkboxId}-label`;
  const descriptionId = description ? `${checkboxId}-description` : void 0;
  const errorId = error ? `${checkboxId}-error` : void 0;
  const describedBy = [ariaDescribedByAttr, descriptionId, errorId].filter(Boolean).join(" ") || void 0;
  const hasVisibleLabel = label !== void 0 && label !== null && label !== false && !(typeof label === "string" && label.trim().length === 0);
  const resolvedAriaLabel = ariaLabel != null ? ariaLabel : ariaLabelAttr;
  const resolvedAriaLabelledBy = ariaLabelledBy != null ? ariaLabelledBy : ariaLabelledByAttr;
  const inputRef = (0, import_react12.useRef)(null);
  const setRefs = (0, import_react12.useCallback)(
    (node) => {
      inputRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current)
      inputRef.current.indeterminate = indeterminate;
  });
  const colors = {
    brand: "var(--color-control-checked-border, var(--color-brand-primary))",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    bgSurface: "var(--color-bg-surface)",
    borderDefault: "var(--color-border-default)",
    accentLavender: "var(--color-selected-bg, var(--color-accent-lavender-10))",
    shadow: "var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08))"
  };
  const isOn = checked || indeterminate;
  const roundedStyle = rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px";
  const wrapperStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--space-1, 8px)",
    width: shape === "box" ? "100%" : "auto",
    padding: shape === "box" ? "12px" : 0,
    border: shape === "box" ? `1.5px solid ${error ? "var(--color-danger-strong)" : isOn ? colors.brand : colors.borderDefault}` : "none",
    borderRadius: shape === "box" ? roundedStyle : void 0,
    backgroundColor: shape === "box" ? isOn ? colors.accentLavender : colors.bgSurface : "transparent",
    boxShadow: shape === "box" && withShadow && !disabled ? colors.shadow : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    userSelect: "none",
    pointerEvents: disabled ? "none" : "auto",
    ...shape === "box" ? {
      transition: "border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.2s ease"
    } : {}
  };
  const labelStyle = {
    color: disabled ? colors.textSecondary : colors.textPrimary,
    lineHeight: 1.5,
    cursor: disabled ? "not-allowed" : "pointer"
  };
  const labelNode = /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    "span",
    {
      id: labelId,
      className: cls5("ucs-cc-checkbox-label", labelColorClass, hideLabel && "sr-only"),
      style: labelStyle,
      "aria-hidden": !hasVisibleLabel ? true : void 0,
      children: [
        label,
        required && hasVisibleLabel ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "ucs-cc-checkbox-required", "aria-hidden": "true", children: "*" }) : null
      ]
    }
  );
  const control = /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    "label",
    {
      htmlFor: checkboxId,
      className: cls5("ucs-cc-checkbox-root", className),
      style: wrapperStyle,
      "data-size": size,
      "data-hide-label": hideLabel ? "true" : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          "input",
          {
            ...nativeProps,
            ref: setRefs,
            type: "checkbox",
            id: checkboxId,
            name,
            value,
            checked,
            disabled,
            required: required || void 0,
            onChange,
            readOnly: onChange ? void 0 : true,
            "aria-label": !hasVisibleLabel && resolvedAriaLabel ? resolvedAriaLabel : void 0,
            "aria-labelledby": hasVisibleLabel ? labelId : !resolvedAriaLabel && resolvedAriaLabelledBy ? resolvedAriaLabelledBy : void 0,
            "aria-describedby": describedBy,
            "aria-invalid": error ? true : void 0,
            "data-indeterminate": indeterminate ? "true" : void 0,
            className: "peer ucs-cc-checkbox-native"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
          "span",
          {
            "aria-hidden": "true",
            className: cls5(
              "ucs-cc-checkbox-face",
              shape === "default" ? checkboxColorClass : "",
              inputLabelSpacingClass
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(CheckboxGlyph, {}),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(DashGlyph, {})
            ]
          }
        ),
        description ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "ucs-cc-checkbox-text", children: [
          labelNode,
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { id: descriptionId, className: "ucs-cc-checkbox-description", children: description })
        ] }) : labelNode
      ]
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "ucs-cc-checkbox-field", "data-size": size, "data-shape": shape, children: [
    control,
    error ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { id: errorId, className: "ucs-cc-checkbox-error", role: "alert", children: error }) : null
  ] });
});
CheckboxBase.displayName = "Checkbox";
var Checkbox2 = import_react12.default.memo(CheckboxBase);
Checkbox2.displayName = "Checkbox";
var Checkbox_default = Checkbox2;

// src/components/molecules/Table/parts/TableHeader.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function TableHeader({
  expandable,
  selectionMode,
  allSelected,
  visibleColumns,
  sortState,
  onSort,
  onSelectAll,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("thead", { className, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("tr", { children: [
    expandable && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { scope: "col", style: { width: 40 }, "aria-label": "Expand" }),
    selectionMode === "multiple" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { scope: "col", style: { width: 48 }, "aria-label": "Select all", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      Checkbox_default,
      {
        name: "table-select-all",
        value: "all",
        label: "",
        ariaLabel: "Select all rows",
        checked: allSelected,
        onChange: (e) => onSelectAll(e.target.checked)
      }
    ) }),
    selectionMode === "single" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { scope: "col", style: { width: 48 }, "aria-label": "Select" }),
    visibleColumns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
      "th",
      {
        scope: "col",
        className: cls4(
          col.align === "center" && "text-center",
          col.align === "right" && "text-end",
          col.sortable && "table-sortable"
        ),
        style: {
          width: typeof col.width === "number" ? `${col.width}px` : col.width,
          minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
        },
        tabIndex: col.sortable ? 0 : void 0,
        onClick: () => col.sortable && onSort(col.key),
        onKeyDown: (e) => {
          if (!col.sortable)
            return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSort(col.key);
          }
        },
        "aria-sort": col.sortable && sortState.key === col.key ? sortState.dir === "asc" ? "ascending" : sortState.dir === "desc" ? "descending" : "none" : void 0,
        children: [
          col.headerRender ? col.headerRender(col) : col.header,
          col.sortable && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "table-sort-icon", "aria-hidden": true, children: sortState.key !== col.key || !sortState.dir ? " \u2195" : sortState.dir === "asc" ? " \u25B2" : " \u25BC" })
        ]
      },
      col.key
    ))
  ] }) });
}

// src/components/molecules/Table/parts/TableRow.tsx
var import_react13 = __toESM(require("react"));

// src/components/molecules/Table/parts/TableCell.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function TableCell({ align = "left", children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "td",
    {
      className: cls4(
        align === "center" && "text-center",
        align === "right" && "text-end"
      ),
      children
    }
  );
}

// src/components/molecules/Table/parts/TableRow.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
function TableRow({
  row: row2,
  rowIndex,
  rowKeyValue,
  selectionMode,
  selected,
  expandable,
  isExpanded,
  visibleColumns,
  onRowClick,
  onToggleSelect,
  onToggleExpand,
  hover = true,
  renderCell
}) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_react13.default.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      "tr",
      {
        className: cls4(selected && "table-row-selected"),
        onClick: () => {
          onRowClick == null ? void 0 : onRowClick(row2, rowIndex);
          if (selectionMode === "single")
            onToggleSelect(rowKeyValue, row2);
        },
        style: { cursor: hover || onRowClick ? "pointer" : void 0 },
        children: [
          expandable && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("td", { style: { width: 40 }, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "button",
            {
              type: "button",
              className: cls4("table-expand-btn", isExpanded && "table-expand-btn-expanded"),
              "aria-expanded": isExpanded,
              "aria-label": isExpanded ? "Collapse row details" : "Expand row details",
              onClick: (e) => {
                e.stopPropagation();
                onToggleExpand(rowKeyValue);
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "table-expand-btn-icon", "aria-hidden": true, children: "\u25B6" })
            }
          ) }),
          selectionMode === "multiple" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("td", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            Checkbox_default,
            {
              name: "table-row",
              value: rowKeyValue,
              label: "",
              ariaLabel: `Select row ${String((_b = row2[(_a = visibleColumns[0]) == null ? void 0 : _a.key]) != null ? _b : rowKeyValue)}`,
              checked: selected,
              onChange: () => onToggleSelect(rowKeyValue, row2)
            }
          ) }),
          selectionMode === "single" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("td", { className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "input",
            {
              type: "radio",
              name: "table-row-select",
              checked: selected,
              onChange: () => onToggleSelect(rowKeyValue, row2),
              onClick: (e) => e.stopPropagation(),
              "aria-label": `Select row ${String((_d = row2[(_c = visibleColumns[0]) == null ? void 0 : _c.key]) != null ? _d : rowKeyValue)}`
            }
          ) }),
          visibleColumns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(TableCell, { align: col.align, children: renderCell(col, row2, rowIndex) }, col.key))
        ]
      }
    ),
    expandable && isExpanded && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("tr", { className: "table-expanded-row", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      "td",
      {
        colSpan: visibleColumns.length + (selectionMode !== "none" ? 1 : 0) + (expandable ? 1 : 0),
        children: expandable.expandedRowRender(row2, rowIndex)
      }
    ) })
  ] });
}

// src/components/molecules/Table/Table.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function getRowKey(row2, index, rowKey) {
  var _a, _b;
  if (typeof rowKey === "function")
    return rowKey(row2, index);
  if (rowKey && row2 && typeof row2 === "object" && rowKey in row2) {
    const v = row2[rowKey];
    return String(v != null ? v : index);
  }
  const r = row2;
  return String((_b = (_a = r == null ? void 0 : r.id) != null ? _a : r == null ? void 0 : r.key) != null ? _b : index);
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
function defaultSorter(a, b, sortType = "auto") {
  if (a == null && b == null)
    return 0;
  if (a == null)
    return 1;
  if (b == null)
    return -1;
  const shouldUseNumericSort = sortType === "number" || sortType === "auto" && isNumericLike(a) && isNumericLike(b);
  if (shouldUseNumericSort) {
    return toNumber(a) - toNumber(b);
  }
  return String(a).localeCompare(String(b));
}
function TableInner({
  columns,
  data,
  rowKey = "id",
  selectionMode = "none",
  selectedRowKeys,
  selectedRow,
  onSelectionChange,
  onRowSelect,
  onRowClick,
  expandable,
  searchable = true,
  searchPlaceholder = "Search...",
  searchProps,
  searchColumns,
  toolbar,
  toolbarLeft,
  toolbarRight,
  pagination = true,
  loading = false,
  loadingVariant = "overlay",
  loadingRows = 6,
  emptyText = "No data",
  emptyComponent,
  striped = true,
  bordered = false,
  verticalDivider = false,
  hover = true,
  compact = false,
  headerColor = "light",
  customHeaderClass,
  stickyHeader = false,
  scroll,
  className = "",
  footer,
  showSearch,
  size = "md",
  tableLayout = "auto",
  variant = "default",
  theme = "light"
}) {
  var _a, _b, _c, _d;
  const config = tableConfig.default;
  const [searchValue, setSearchValue] = (0, import_react14.useState)("");
  const [sortState, setSortState] = (0, import_react14.useState)({ key: "", dir: null });
  const [currentPage, setCurrentPage] = (0, import_react14.useState)(1);
  const paginationConfig = typeof pagination === "object" ? pagination : {};
  const pageSizeOptions = (_a = paginationConfig.pageSizeOptions) != null ? _a : [5, 10, 15, 25, 50];
  const [itemsPerPage, setItemsPerPage] = (0, import_react14.useState)((_b = paginationConfig.pageSize) != null ? _b : 10);
  const selectedSet = (0, import_react14.useMemo)(() => {
    const keys = selectedRowKeys != null ? selectedRowKeys : selectedRow;
    if (!keys)
      return /* @__PURE__ */ new Set();
    const arr = Array.isArray(keys) ? keys : [keys];
    return new Set(arr);
  }, [selectedRowKeys, selectedRow]);
  const expandedSet = (0, import_react14.useMemo)(() => {
    if (!(expandable == null ? void 0 : expandable.expandedRowKeys))
      return /* @__PURE__ */ new Set();
    return new Set(expandable.expandedRowKeys);
  }, [expandable == null ? void 0 : expandable.expandedRowKeys]);
  const visibleColumns = (0, import_react14.useMemo)(() => columns.filter((c) => !c.hidden), [columns]);
  const filteredData = (0, import_react14.useMemo)(() => {
    if (!searchValue.trim())
      return data;
    const lower = searchValue.toLowerCase();
    const keysToSearch = (searchColumns == null ? void 0 : searchColumns.length) ? searchColumns : visibleColumns.map((c) => c.key);
    return data.filter(
      (row2) => keysToSearch.some((k) => {
        const v = row2[k];
        return String(v != null ? v : "").toLowerCase().includes(lower);
      })
    );
  }, [data, searchValue, searchColumns, visibleColumns]);
  const sortedData = (0, import_react14.useMemo)(() => {
    var _a2;
    if (!sortState.key || !sortState.dir)
      return filteredData;
    const col = visibleColumns.find((c) => c.key === sortState.key);
    if (!(col == null ? void 0 : col.sortable))
      return filteredData;
    const sorter = (_a2 = col.sorter) != null ? _a2 : (a, b) => {
      var _a3;
      return defaultSorter(
        a[col.key],
        b[col.key],
        (_a3 = col.sortType) != null ? _a3 : "auto"
      );
    };
    const sorted = [...filteredData].sort((a, b) => {
      const v = sorter(a, b, col.key);
      return sortState.dir === "asc" ? v : -v;
    });
    return sorted;
  }, [filteredData, sortState, visibleColumns]);
  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination ? sortedData.slice(startIndex, startIndex + itemsPerPage) : sortedData;
  (0, import_react14.useEffect)(() => {
    setCurrentPage((p) => p > totalPages ? totalPages : p < 1 ? 1 : p);
  }, [totalPages]);
  const handleSort = (0, import_react14.useCallback)(
    (key) => {
      const col = visibleColumns.find((c) => c.key === key);
      if (!(col == null ? void 0 : col.sortable))
        return;
      setSortState((prev) => ({
        key,
        dir: prev.key !== key ? "asc" : prev.dir === "asc" ? "desc" : prev.dir === "desc" ? null : "asc"
      }));
    },
    [visibleColumns]
  );
  const handleSelectRow = (0, import_react14.useCallback)(
    (key, row2) => {
      if (selectionMode === "single") {
        const keys = [key];
        onSelectionChange == null ? void 0 : onSelectionChange(keys, [row2]);
        onRowSelect == null ? void 0 : onRowSelect(key);
      } else if (selectionMode === "multiple") {
        const newSet = new Set(selectedSet);
        if (newSet.has(key))
          newSet.delete(key);
        else
          newSet.add(key);
        const keys = Array.from(newSet);
        const rows = data.filter((r) => keys.includes(getRowKey(r, data.indexOf(r), rowKey)));
        onSelectionChange == null ? void 0 : onSelectionChange(keys, rows);
      }
    },
    [selectionMode, selectedSet, data, rowKey, onSelectionChange, onRowSelect]
  );
  const handleSelectAll = (0, import_react14.useCallback)(
    (checked) => {
      if (selectionMode !== "multiple")
        return;
      const keys = checked ? paginatedData.map((r, i) => getRowKey(r, startIndex + i, rowKey)) : [];
      const rows = checked ? paginatedData : [];
      onSelectionChange == null ? void 0 : onSelectionChange(keys, rows);
    },
    [selectionMode, paginatedData, startIndex, rowKey, onSelectionChange]
  );
  const allSelected = selectionMode === "multiple" && paginatedData.length > 0 && paginatedData.every((r, i) => selectedSet.has(getRowKey(r, startIndex + i, rowKey)));
  const handleExpand = (0, import_react14.useCallback)(
    (key) => {
      if (!(expandable == null ? void 0 : expandable.onExpandedRowsChange))
        return;
      const newSet = new Set(expandedSet);
      if (newSet.has(key))
        newSet.delete(key);
      else
        newSet.add(key);
      expandable.onExpandedRowsChange(Array.from(newSet));
    },
    [expandable, expandedSet]
  );
  const getHeaderClass = () => customHeaderClass || config.thead[headerColor] || config.thead.light;
  const renderCell = (column, row2, rowIndex) => {
    if (column.render) {
      const val2 = row2[column.key];
      return column.render(val2, row2, rowIndex);
    }
    const val = row2[column.key];
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TextView_default, { as: "span", children: val != null ? String(val) : "" });
  };
  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++)
        pages.push(i);
    } else {
      pages.push(1);
      if (currentPage <= 4) {
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++)
          pages.push(i);
        pages.push("...");
      } else if (currentPage >= totalPages - 3) {
        pages.push("...");
        for (let i = Math.max(2, totalPages - 4); i <= totalPages; i++)
          pages.push(i);
      } else {
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pages.push(i);
        pages.push("...");
      }
      if (totalPages > 1 && !pages.includes(totalPages))
        pages.push(totalPages);
    }
    return pages;
  };
  const shouldUseSkeleton = loading && loadingVariant === "skeleton";
  const showLoadingOverlay = loading && loadingVariant !== "skeleton";
  const extraColumnsCount = (expandable ? 1 : 0) + (selectionMode !== "none" ? 1 : 0);
  const tableInlineStyle = (scroll == null ? void 0 : scroll.x) ? { minWidth: typeof scroll.x === "number" ? `${scroll.x}px` : scroll.x } : void 0;
  const tableContent = /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    "table",
    {
      className: cls4(
        config.table,
        tableLayout === "fixed" && "table-layout-fixed",
        variant === "minimal" && "table-variant-minimal",
        (bordered || variant === "bordered") && "table-bordered",
        verticalDivider && "table-vertical-divider",
        stickyHeader && "table-sticky-header",
        striped && config.striped,
        hover && config.hover,
        compact && "table-compact",
        size === "sm" && "table-size-sm",
        size === "lg" && "table-size-lg",
        className
      ),
      style: tableInlineStyle,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          TableHeader,
          {
            expandable: Boolean(expandable),
            selectionMode,
            allSelected,
            visibleColumns,
            sortState,
            onSort: handleSort,
            onSelectAll: handleSelectAll,
            className: getHeaderClass()
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("tbody", { className: "table-tbody", children: shouldUseSkeleton ? Array.from({ length: Math.max(1, loadingRows) }).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("tr", { className: "table-skeleton-row", "aria-hidden": "true", children: Array.from({ length: visibleColumns.length + extraColumnsCount }).map((__, cellIdx) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "table-skeleton-line" }) }, `table-skeleton-cell-${idx}-${cellIdx}`)) }, `table-skeleton-row-${idx}`)) : paginatedData.map((row2, idx) => {
          const rk = getRowKey(row2, startIndex + idx, rowKey);
          return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            TableRow,
            {
              row: row2,
              rowIndex: startIndex + idx,
              rowKeyValue: rk,
              selectionMode,
              selected: selectedSet.has(rk),
              expandable,
              isExpanded: expandedSet.has(rk),
              visibleColumns,
              onRowClick,
              onToggleSelect: handleSelectRow,
              onToggleExpand: handleExpand,
              hover,
              renderCell
            },
            rk
          );
        }) }),
        footer && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("tr", { children: footer }) })
      ]
    }
  );
  const showSearchBar = searchable && showSearch !== false;
  const showPagination = Boolean(pagination) && totalItems > 0;
  const searchMaxWidth = (_c = searchProps == null ? void 0 : searchProps.maxWidth) != null ? _c : 280;
  const searchSize = (_d = searchProps == null ? void 0 : searchProps.size) != null ? _d : "sm";
  const searchBar = showSearchBar && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { style: { marginBottom: 0, maxWidth: typeof searchMaxWidth === "number" ? `${searchMaxWidth}px` : searchMaxWidth, flex: toolbarRight ? "0 1 auto" : "1 1 auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    TextInputSearch_default,
    {
      leftIcon: search_default,
      leftIconHeight: 18,
      leftIconWidth: 18,
      placeholder: searchPlaceholder,
      value: searchValue,
      onChange: setSearchValue,
      size: searchSize,
      fullWidth: true,
      showClearButton: searchProps == null ? void 0 : searchProps.showClearButton,
      showSearchButton: searchProps == null ? void 0 : searchProps.showSearchButton,
      searchButtonDisplay: searchProps == null ? void 0 : searchProps.searchButtonDisplay,
      searchActionButtonProps: searchProps == null ? void 0 : searchProps.searchActionButtonProps
    }
  ) });
  const leftContent = toolbarLeft != null ? toolbarLeft : showSearchBar ? searchBar : null;
  const hasToolbar = toolbar || leftContent || toolbarRight;
  const toolbarContent = toolbar != null ? toolbar : hasToolbar ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "table-toolbar", children: [
    leftContent && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "table-toolbar-left", children: leftContent }),
    toolbarRight && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "table-toolbar-right", children: toolbarRight })
  ] }) : null;
  const wrapperClass = cls4("table-wrapper", theme === "dark" && "table-theme-dark");
  const scrollWrapperStyle = (scroll == null ? void 0 : scroll.y) ? {
    maxHeight: typeof scroll.y === "number" ? `${scroll.y}px` : scroll.y,
    overflowY: "auto",
    overflowX: "auto"
  } : { overflowX: "auto" };
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: wrapperClass, style: { position: "relative" }, "aria-busy": loading, children: [
    toolbarContent,
    showLoadingOverlay && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "div",
      {
        className: "table-loading-overlay",
        role: "status",
        "aria-live": "polite",
        "aria-busy": "true",
        children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TextView_default, { children: "Loading..." })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "div",
      {
        className: cls4(stickyHeader && "table-scroll-body", "table-scroll-wrapper"),
        style: scrollWrapperStyle,
        role: "region",
        "aria-label": "Data table",
        children: sortedData.length === 0 && !loading ? emptyComponent != null ? emptyComponent : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "table-empty", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TextView_default, { as: "p", children: emptyText }) }) : tableContent
      }
    ),
    showPagination && totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "table-pagination", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "table-pagination-nav", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "button",
          {
            type: "button",
            className: "table-pagination-btn",
            onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
            disabled: currentPage === 1,
            "aria-label": "Previous page",
            children: "\u2039"
          }
        ),
        renderPageNumbers().map(
          (page, i) => page === "..." ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "table-pagination-ellipsis", children: "\u2026" }, `ellipsis-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            "button",
            {
              type: "button",
              className: cls4(
                "table-pagination-page",
                currentPage === page && "active"
              ),
              onClick: () => setCurrentPage(page),
              children: page
            },
            page
          )
        ),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "button",
          {
            type: "button",
            className: "table-pagination-btn",
            onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
            disabled: currentPage === totalPages,
            "aria-label": "Next page",
            children: "\u203A"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TextView_default, { as: "small", style: { color: "var(--color-text-secondary)" }, children: "Show" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { style: { minWidth: 70 }, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          Select_default,
          {
            options: pageSizeOptions.map((n) => ({ label: String(n), value: String(n) })),
            value: String(itemsPerPage),
            size: "sm",
            onValueChange: (v) => {
              setItemsPerPage(Number(v));
              setCurrentPage(1);
            }
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(TextView_default, { as: "small", style: { color: "var(--color-text-secondary)" }, children: [
          "of ",
          totalItems,
          " ",
          totalItems === 1 ? "item" : "items"
        ] })
      ] })
    ] })
  ] });
}
function Table(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(TableInner, { ...props });
}

// src/components/molecules/Table/TablePrimitives.tsx
var import_react15 = require("react");
var import_jsx_runtime16 = require("react/jsx-runtime");
var TableRoot = (0, import_react15.forwardRef)(function TableRoot2({
  className,
  containerClassName,
  scroll = true,
  stickyHeader = false,
  stickyFirstColumn = false,
  maxHeight,
  flush = false,
  children,
  ...rest
}, ref) {
  const table = /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "table",
    {
      ref,
      className: cls4(
        "table-ui",
        stickyHeader && "table-ui--sticky-header",
        stickyFirstColumn && "table-ui--sticky-first-col",
        className
      ),
      ...rest,
      children
    }
  );
  if (!scroll)
    return table;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "div",
    {
      className: cls4("table-ui-wrap", flush && "table-ui-wrap--flush", containerClassName),
      style: maxHeight !== void 0 ? { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight, overflowY: "auto" } : void 0,
      children: table
    }
  );
});
TableRoot.displayName = "TableRoot";
var TableCaption = (0, import_react15.forwardRef)(
  function TableCaption2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("caption", { ref, className: cls4("table-ui-caption", className), ...rest });
  }
);
TableCaption.displayName = "TableCaption";
var TableHeader2 = (0, import_react15.forwardRef)(
  function TableHeader3({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("thead", { ref, className: cls4("table-ui-thead", className), ...rest });
  }
);
TableHeader2.displayName = "TableHeader";
var TableBody = (0, import_react15.forwardRef)(function TableBody2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("tbody", { ref, className: cls4("table-ui-tbody", className), ...rest });
});
TableBody.displayName = "TableBody";
var TableFooter = (0, import_react15.forwardRef)(
  function TableFooter2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("tfoot", { ref, className: cls4("table-ui-tfoot", className), ...rest });
  }
);
TableFooter.displayName = "TableFooter";
var TableRow2 = (0, import_react15.forwardRef)(function TableRow3({ className, selected, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "tr",
    {
      ref,
      className: cls4("table-ui-tr", selected && "table-ui-tr--selected", className),
      "aria-selected": selected === void 0 ? void 0 : selected,
      "data-state": selected ? "selected" : void 0,
      ...rest
    }
  );
});
TableRow2.displayName = "TableRow";
var TableHead = (0, import_react15.forwardRef)(function TableHead2({ className, scope = "col", casing = "upper", wrap = false, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "th",
    {
      ref,
      className: cls4(
        "table-ui-th",
        casing === "none" && "table-ui-th--casing-none",
        wrap && "table-ui-th--wrap",
        className
      ),
      scope,
      ...rest
    }
  );
});
TableHead.displayName = "TableHead";
var TableCell2 = (0, import_react15.forwardRef)(function TableCell3({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("td", { ref, className: cls4("table-ui-td", className), ...rest });
});
TableCell2.displayName = "TableCell";

// src/components/molecules/Table/index.tsx
var Table2 = Object.assign(Table, {
  Root: TableRoot,
  Caption: TableCaption,
  Header: TableHeader2,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow2,
  Head: TableHead,
  Cell: TableCell2
});
var Table_default = Table2;

// src/components/molecules/FilterBar/index.tsx
var import_react21 = __toESM(require("react"));

// src/components/atoms/Badge/index.tsx
var import_react16 = __toESM(require("react"));
var import_jsx_runtime17 = require("react/jsx-runtime");
function cls6(...parts) {
  return parts.filter(Boolean).join(" ");
}
function DismissIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    "svg",
    {
      className: "ds-badge__dismiss-icon",
      viewBox: "0 0 16 16",
      width: 16,
      height: 16,
      "aria-hidden": true,
      focusable: "false",
      children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        "path",
        {
          fill: "currentColor",
          d: "M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 1 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06Z"
        }
      )
    }
  );
}
var Badge = import_react16.default.memo(function Badge2({
  children,
  variant = "neutral",
  tone: tone2 = "soft",
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
  const handleDismiss = (0, import_react16.useCallback)(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDismiss == null ? void 0 : onDismiss();
    },
    [onDismiss]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    "span",
    {
      className: cls6("ds-badge", className),
      "data-variant": variant,
      "data-tone": tone2,
      "data-shape": shape,
      "data-size": size,
      "data-elevated": elevated ? "true" : void 0,
      onClick,
      ...rest,
      children: [
        dot ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "ds-badge__dot", "aria-hidden": true }) : null,
        icon ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "ds-badge__icon", children: icon }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "ds-badge__label", children }),
        onDismiss ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          "button",
          {
            type: "button",
            className: "ds-badge__dismiss",
            "aria-label": dismissLabel,
            onClick: handleDismiss,
            children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(DismissIcon, {})
          }
        ) : null
      ]
    }
  );
});
var Badge_default = Badge;

// src/components/molecules/Combobox/index.tsx
var import_react20 = __toESM(require("react"));

// src/components/molecules/Popover/index.tsx
var import_react19 = __toESM(require("react"));
var import_react_dom = require("react-dom");

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

// src/components/molecules/Popover/layering.ts
var import_react17 = require("react");
var DEFAULT_POPOVER_Z = 450;
function getAncestorZIndex(el) {
  if (!el || typeof window === "undefined" || typeof window.getComputedStyle !== "function")
    return 0;
  let max = 0;
  let node = el;
  while (node && node !== document.body && node !== document.documentElement) {
    let raw = "";
    try {
      raw = window.getComputedStyle(node).zIndex;
    } catch (e) {
      raw = "";
    }
    if (!raw && node instanceof HTMLElement)
      raw = node.style.zIndex;
    const z2 = parseInt(raw, 10);
    if (Number.isFinite(z2) && z2 > max)
      max = z2;
    node = node.parentElement;
  }
  return max;
}
function readZToken(tokenName, fallback) {
  if (typeof window === "undefined" || typeof document === "undefined")
    return fallback;
  try {
    const raw = window.getComputedStyle(document.documentElement).getPropertyValue(tokenName);
    const z2 = parseInt(raw, 10);
    return Number.isFinite(z2) ? z2 : fallback;
  } catch (e) {
    return fallback;
  }
}
function resolveLayerZIndex(anchor, explicit, tokenName = "--z-popover", fallback = DEFAULT_POPOVER_Z) {
  if (explicit !== void 0 && explicit !== null && explicit !== "")
    return explicit;
  const tokenValue = `var(${tokenName}, ${fallback})`;
  const ancestorZ = getAncestorZIndex(anchor);
  if (ancestorZ <= 0)
    return tokenValue;
  const tokenZ = readZToken(tokenName, fallback);
  return ancestorZ + 1 > tokenZ ? ancestorZ + 1 : tokenValue;
}
var floatingStack = [];
var FloatingLayerContext = (0, import_react17.createContext)(null);
function pushFloatingLayer(id, parent = null) {
  popFloatingLayer(id);
  floatingStack.push({ id, parent });
}
function popFloatingLayer(id) {
  const i = floatingStack.findIndex((e) => e.id === id);
  if (i >= 0)
    floatingStack.splice(i, 1);
}
function isTopFloatingLayer(id) {
  if (floatingStack.length === 0)
    return true;
  const parents = new Set(floatingStack.map((e) => e.parent));
  const leaves2 = floatingStack.filter((e) => !parents.has(e.id));
  const top = leaves2[leaves2.length - 1];
  return !top || top.id === id;
}

// src/components/molecules/Popover/menuNavigation.ts
var MENU_ITEM_SELECTOR = [
  '[role="menuitem"]',
  '[role="menuitemcheckbox"]',
  '[role="menuitemradio"]'
].map((r) => `${r}:not([disabled]):not([aria-disabled="true"])`).join(", ");
var LISTBOX_OPTION_SELECTOR = '[role="option"]:not([aria-disabled="true"])';
function getMenuItems(root, selector = MENU_ITEM_SELECTOR) {
  return Array.from(root.querySelectorAll(selector));
}
function handleMenuKeyNavigation(e, selector = MENU_ITEM_SELECTOR) {
  var _a, _b;
  const root = e.currentTarget;
  const items = getMenuItems(root, selector);
  if (items.length === 0)
    return false;
  const i = items.indexOf(document.activeElement);
  let next = -1;
  switch (e.key) {
    case "ArrowDown":
      next = i < 0 ? 0 : (i + 1) % items.length;
      break;
    case "ArrowUp":
      next = i < 0 ? items.length - 1 : (i - 1 + items.length) % items.length;
      break;
    case "Home":
      next = 0;
      break;
    case "End":
      next = items.length - 1;
      break;
    default: {
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey || e.key === " ")
        return false;
      const t = e.target;
      if (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT") {
        return false;
      }
      const ch = e.key.toLowerCase();
      for (let step = 1; step <= items.length; step += 1) {
        const candidate = items[(Math.max(i, -1) + step + items.length) % items.length];
        if (((_a = candidate.textContent) != null ? _a : "").trim().toLowerCase().startsWith(ch)) {
          next = items.indexOf(candidate);
          break;
        }
      }
      if (next < 0)
        return false;
    }
  }
  e.preventDefault();
  (_b = items[next]) == null ? void 0 : _b.focus();
  return true;
}

// src/components/molecules/Popover/slot.tsx
var import_react18 = __toESM(require("react"));
function getElementRef(element) {
  const major = parseInt(import_react18.default.version, 10);
  if (major >= 19)
    return element.props.ref;
  return element.ref;
}
function setRef(ref, value) {
  if (typeof ref === "function")
    ref(value);
  else if (ref && typeof ref === "object")
    ref.current = value;
}
function renderSlot(children, slotProps, ref, component) {
  const child = import_react18.default.Children.only(children);
  if (!(0, import_react18.isValidElement)(child)) {
    throw new Error(`${component} with asChild expects a single React element child`);
  }
  const childProps = child.props;
  const childRef = getElementRef(child);
  const merged = { ...childProps };
  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    if (slotValue === void 0)
      continue;
    if (/^on[A-Z]/.test(key) && typeof slotValue === "function" && typeof childValue === "function") {
      merged[key] = (event, ...args) => {
        childValue(event, ...args);
        if (event && event.defaultPrevented)
          return;
        slotValue(event, ...args);
      };
    } else if (key === "className") {
      merged[key] = [childValue, slotValue].filter(Boolean).join(" ") || void 0;
    } else if (key === "style") {
      merged[key] = { ...slotValue, ...childValue };
    } else {
      merged[key] = slotValue;
    }
  }
  merged.ref = (node) => {
    setRef(ref, node);
    setRef(childRef, node);
  };
  return (0, import_react18.cloneElement)(child, merged);
}

// src/components/molecules/Popover/index.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function cls7(...parts) {
  return parts.filter(Boolean).join(" ");
}
function indentStyle(indent, style) {
  if (!indent || indent <= 0)
    return style;
  return {
    paddingInlineStart: `calc(0.75rem + ${Math.floor(indent)} * var(--space-2, 16px))`,
    ...style
  };
}
var PopoverContext = (0, import_react19.createContext)(null);
function usePopoverContext(component) {
  const ctx = (0, import_react19.useContext)(PopoverContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Popover>, <DropdownMenu> or <ContextMenu>`);
  }
  return ctx;
}
function restoreFocus(el) {
  if (!el || typeof document === "undefined" || !el.isConnected)
    return;
  const active = document.activeElement;
  if (active && active !== document.body && active !== document.documentElement && active.isConnected)
    return;
  el.focus();
}
var Popover = import_react19.default.memo(function Popover2({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  anchorRef: anchorRefProp
}) {
  const reactId = (0, import_react19.useId)();
  const base = reactId.replace(/:/g, "");
  const triggerId = `popover-trigger-${base}`;
  const contentId = `popover-content-${base}`;
  const triggerRef = (0, import_react19.useRef)(null);
  const innerAnchorRef = (0, import_react19.useRef)(null);
  const anchorRef = anchorRefProp != null ? anchorRefProp : innerAnchorRef;
  const isControlled = openProp !== void 0;
  const [innerOpen, setInnerOpen] = (0, import_react19.useState)(defaultOpen);
  const open = isControlled ? Boolean(openProp) : innerOpen;
  const prevOpenRef = (0, import_react19.useRef)(false);
  const returnFocusRef = (0, import_react19.useRef)(null);
  const setOpen = (0, import_react19.useCallback)(
    (next) => {
      if (!isControlled) {
        setInnerOpen(next);
      }
      onOpenChange == null ? void 0 : onOpenChange(next);
    },
    [isControlled, onOpenChange]
  );
  (0, import_react19.useLayoutEffect)(() => {
    if (!prevOpenRef.current && open && typeof document !== "undefined") {
      returnFocusRef.current = document.activeElement;
    }
  }, [open]);
  (0, import_react19.useEffect)(() => {
    var _a;
    if (prevOpenRef.current && !open) {
      const target = (_a = triggerRef.current) != null ? _a : returnFocusRef.current;
      requestAnimationFrame(() => restoreFocus(target));
    }
    prevOpenRef.current = open;
  }, [open]);
  const ctx = (0, import_react19.useMemo)(
    () => ({
      open,
      setOpen,
      triggerId,
      contentId,
      triggerRef,
      anchorRef,
      placement
    }),
    [open, setOpen, triggerId, contentId, anchorRef, placement]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(PopoverContext.Provider, { value: ctx, children });
});
var PopoverTrigger = (0, import_react19.forwardRef)(function PopoverTrigger2({ children, className, hasPopup = "dialog", type = "button", onClick, asChild = false, ...rest }, ref) {
  const ctx = usePopoverContext("PopoverTrigger");
  const open = ctx.open;
  const setRefs = (0, import_react19.useCallback)(
    (el) => {
      ctx.triggerRef.current = el;
      if (typeof ref === "function")
        ref(el);
      else if (ref)
        ref.current = el;
    },
    [ctx.triggerRef, ref]
  );
  if (asChild) {
    return renderSlot(
      children,
      {
        ...rest,
        className,
        id: ctx.triggerId,
        "aria-expanded": open,
        "aria-controls": open ? ctx.contentId : void 0,
        "aria-haspopup": hasPopup,
        onClick: (e) => {
          onClick == null ? void 0 : onClick(e);
          if (e.defaultPrevented)
            return;
          ctx.setOpen(!open);
        }
      },
      setRefs,
      "PopoverTrigger"
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "button",
    {
      ...rest,
      ref: setRefs,
      type,
      id: ctx.triggerId,
      className: cls7(className),
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
var PopoverAnchor = (0, import_react19.forwardRef)(function PopoverAnchor2({ children, asChild = false, ...rest }, ref) {
  const ctx = usePopoverContext("PopoverAnchor");
  const setRefs = (0, import_react19.useCallback)(
    (el) => {
      ctx.anchorRef.current = el;
      if (typeof ref === "function")
        ref(el);
      else if (ref)
        ref.current = el;
    },
    [ctx.anchorRef, ref]
  );
  if (asChild)
    return renderSlot(children, rest, setRefs, "PopoverAnchor");
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { ...rest, ref: setRefs, children });
});
var ARROW_EDGE_PAD = 12;
var PopoverContent = import_react19.default.memo(function PopoverContent2({
  children,
  className,
  role: roleProp,
  onKeyDown,
  onMouseDownCapture,
  style,
  showPointer = true,
  zIndex,
  ...rest
}) {
  var _a;
  const ctx = usePopoverContext("PopoverContent");
  const contentRef = (0, import_react19.useRef)(null);
  const insideTreeRef = (0, import_react19.useRef)(false);
  const [layerZ, setLayerZ] = (0, import_react19.useState)("var(--z-popover, 450)");
  const [pos, setPos] = (0, import_react19.useState)({
    top: 0,
    left: 0
  });
  const { anchorRef, triggerRef, setOpen } = ctx;
  const getAnchor = (0, import_react19.useCallback)(
    () => {
      var _a2;
      return (_a2 = anchorRef.current) != null ? _a2 : triggerRef.current;
    },
    [anchorRef, triggerRef]
  );
  const updatePosition = (0, import_react19.useCallback)(() => {
    var _a2;
    const anchor = getAnchor();
    const panel = contentRef.current;
    if (!anchor || !panel || typeof window === "undefined")
      return;
    const tr = anchor.getBoundingClientRect();
    const cw = panel.offsetWidth || 140;
    const ch = Math.max(panel.offsetHeight || 80, 80);
    const result = computePopoverPosition(tr, cw, ch, ctx.placement);
    if (!showPointer) {
      setPos(result);
      return;
    }
    const below = result.top >= tr.bottom - 4;
    const triggerCx = tr.left + tr.width / 2;
    const panelW = (_a2 = result.width) != null ? _a2 : cw;
    const arrowX = Math.min(
      Math.max(triggerCx - result.left, ARROW_EDGE_PAD),
      panelW - ARROW_EDGE_PAD
    );
    setPos({
      ...result,
      arrowEdge: below ? "top" : "bottom",
      arrowX
    });
  }, [ctx.placement, getAnchor, showPointer]);
  (0, import_react19.useLayoutEffect)(() => {
    if (!ctx.open || zIndex !== void 0)
      return;
    setLayerZ(resolveLayerZIndex(getAnchor(), void 0));
  }, [ctx.open, zIndex, getAnchor]);
  (0, import_react19.useLayoutEffect)(() => {
    if (!ctx.open)
      return;
    updatePosition();
    const id = requestAnimationFrame(() => updatePosition());
    return () => cancelAnimationFrame(id);
  }, [ctx.open, updatePosition]);
  (0, import_react19.useEffect)(() => {
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
  const layerId = ctx.contentId;
  const parentLayerId = (0, import_react19.useContext)(FloatingLayerContext);
  (0, import_react19.useEffect)(() => {
    if (!ctx.open)
      return void 0;
    pushFloatingLayer(layerId, parentLayerId);
    return () => popFloatingLayer(layerId);
  }, [ctx.open, layerId, parentLayerId]);
  (0, import_react19.useEffect)(() => {
    if (!ctx.open)
      return;
    const onDocMouse = (e) => {
      var _a2, _b, _c;
      const inside = insideTreeRef.current;
      insideTreeRef.current = false;
      if (inside)
        return;
      const t = e.target;
      if (((_a2 = triggerRef.current) == null ? void 0 : _a2.contains(t)) || ((_b = anchorRef.current) == null ? void 0 : _b.contains(t)) || ((_c = contentRef.current) == null ? void 0 : _c.contains(t))) {
        return;
      }
      setOpen(false);
    };
    const onKey = (e) => {
      if (e.key !== "Escape" || e.isComposing || e.defaultPrevented)
        return;
      if (!isTopFloatingLayer(layerId))
        return;
      e.preventDefault();
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouse);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDocMouse);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [ctx.open, setOpen, triggerRef, anchorRef, layerId]);
  (0, import_react19.useEffect)(() => {
    if (!ctx.open || !contentRef.current)
      return;
    const el = contentRef.current.querySelector(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    el == null ? void 0 : el.focus();
  }, [ctx.open]);
  const role = roleProp != null ? roleProp : "dialog";
  if (!ctx.open)
    return null;
  const pointerStyle = showPointer && pos.arrowX != null ? { ["--popover-arrow-x"]: `${pos.arrowX}px` } : void 0;
  const labelledBy = (_a = rest["aria-labelledby"]) != null ? _a : rest["aria-label"] || !triggerRef.current ? void 0 : ctx.triggerId;
  const content = /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "div",
    {
      ...rest,
      ref: contentRef,
      id: ctx.contentId,
      role: role === "none" ? void 0 : role,
      "aria-modal": role === "dialog" ? false : void 0,
      "aria-labelledby": labelledBy,
      className: cls7(
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
        zIndex: zIndex != null ? zIndex : layerZ,
        ...pointerStyle,
        ...style
      },
      onMouseDownCapture: (e) => {
        insideTreeRef.current = true;
        onMouseDownCapture == null ? void 0 : onMouseDownCapture(e);
      },
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.key === "Escape" && !e.defaultPrevented) {
          e.preventDefault();
          setOpen(false);
        }
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(FloatingLayerContext.Provider, { value: layerId, children: showPointer ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "ds-popover__content-scroll", style: { maxHeight: pos.maxHeight }, children }) : children })
    }
  );
  if (typeof document === "undefined")
    return null;
  return (0, import_react_dom.createPortal)(content, document.body);
});
var DropdownMenuTrigger = (0, import_react19.forwardRef)(
  function DropdownMenuTrigger2(props, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(PopoverTrigger, { ...props, ref, hasPopup: "menu" });
  }
);
var DropdownMenuContent = import_react19.default.memo(function DropdownMenuContent2({
  children,
  className,
  showPointer = false,
  onKeyDown,
  ...rest
}) {
  const handleMenuKeyDown = (0, import_react19.useCallback)(
    (e) => {
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      handleMenuKeyNavigation(e);
    },
    [onKeyDown]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    PopoverContent,
    {
      ...rest,
      showPointer,
      role: "menu",
      "aria-orientation": "vertical",
      className,
      onKeyDown: handleMenuKeyDown,
      children
    }
  );
});
var MenuRow = (0, import_react19.forwardRef)(function MenuRow2({
  children,
  className,
  variant = "default",
  disabled = false,
  ripple = true,
  onClick,
  type = "button",
  onPointerDown,
  icon,
  description,
  shortcut,
  indent = 0,
  itemRole,
  checked,
  indicator,
  onActivate,
  style,
  ...rest
}, ref) {
  const rippleEnabled = ripple !== false && !disabled;
  const rippleApi = useRipple(rippleEnabled);
  const isCheckable = itemRole !== "menuitem";
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    "button",
    {
      ...rest,
      ref,
      type,
      role: itemRole,
      "aria-checked": isCheckable ? Boolean(checked) : void 0,
      disabled,
      "data-state": isCheckable ? checked ? "checked" : "unchecked" : void 0,
      style: indentStyle(indent, style),
      className: cls7(
        "ds-dropdown-menu__item",
        variant === "danger" && "ds-dropdown-menu__item--danger",
        description != null && "ds-dropdown-menu__item--with-description",
        rippleEnabled && "ucs-ripple-parent",
        className
      ),
      onPointerDown: (e) => {
        rippleApi.onPointerDown(e);
        onPointerDown == null ? void 0 : onPointerDown(e);
      },
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        if (disabled)
          return;
        onActivate();
      },
      children: [
        rippleApi.RippleOverlay,
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { className: "ds-dropdown-menu__item-inner", children: [
          isCheckable ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ds-dropdown-menu__indicator", "aria-hidden": "true", children: checked ? indicator : null }) : null,
          icon != null ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ds-dropdown-menu__icon", "aria-hidden": "true", children: icon }) : null,
          description != null ? /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { className: "ds-dropdown-menu__item-text", children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ds-dropdown-menu__item-label", children }),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ds-dropdown-menu__item-description", children: description })
          ] }) : children,
          shortcut != null ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ds-dropdown-menu__item-shortcut", "aria-hidden": "true", children: shortcut }) : null
        ] })
      ]
    }
  );
});
var CheckIndicator = /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", { viewBox: "0 0 16 16", width: "14", height: "14", focusable: "false", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
  "path",
  {
    d: "M3.5 8.5l3 3 6-7",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }
) });
var RadioIndicator = /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("svg", { viewBox: "0 0 16 16", width: "14", height: "14", focusable: "false", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("circle", { cx: "8", cy: "8", r: "3.5", fill: "currentColor" }) });
var DropdownMenuItem = import_react19.default.memo(
  (0, import_react19.forwardRef)(function DropdownMenuItem2({ onSelect, closeOnSelect = true, ...rest }, ref) {
    const ctx = usePopoverContext("DropdownMenuItem");
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      MenuRow,
      {
        ...rest,
        ref,
        itemRole: "menuitem",
        onActivate: () => {
          onSelect == null ? void 0 : onSelect();
          if (closeOnSelect)
            ctx.setOpen(false);
        }
      }
    );
  })
);
var DropdownMenuCheckboxItem = import_react19.default.memo(
  (0, import_react19.forwardRef)(function DropdownMenuCheckboxItem2({
    checked: checkedProp,
    defaultChecked = false,
    onCheckedChange,
    onSelect,
    closeOnSelect = false,
    ...rest
  }, ref) {
    const ctx = usePopoverContext("DropdownMenuCheckboxItem");
    const isControlled = checkedProp !== void 0;
    const [inner, setInner] = (0, import_react19.useState)(defaultChecked);
    const checked = isControlled ? Boolean(checkedProp) : inner;
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      MenuRow,
      {
        ...rest,
        ref,
        itemRole: "menuitemcheckbox",
        checked,
        indicator: CheckIndicator,
        onActivate: () => {
          const next = !checked;
          if (!isControlled)
            setInner(next);
          onCheckedChange == null ? void 0 : onCheckedChange(next);
          onSelect == null ? void 0 : onSelect();
          if (closeOnSelect)
            ctx.setOpen(false);
        }
      }
    );
  })
);
var DropdownRadioGroupContext = (0, import_react19.createContext)(null);
var DropdownMenuGroup = (0, import_react19.forwardRef)(function DropdownMenuGroup2({ children, label, className, ...rest }, ref) {
  const labelId = `ds-menu-group-${(0, import_react19.useId)().replace(/:/g, "")}`;
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    "div",
    {
      ...rest,
      ref,
      role: "group",
      "aria-labelledby": label != null ? labelId : rest["aria-labelledby"],
      className: cls7("ds-dropdown-menu__group", className),
      children: [
        label != null ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(DropdownMenuLabel, { id: labelId, children: label }) : null,
        children
      ]
    }
  );
});
var DropdownMenuRadioGroup = (0, import_react19.forwardRef)(
  function DropdownMenuRadioGroup2({ children, value: valueProp, defaultValue, onValueChange, label, ...rest }, ref) {
    const isControlled = valueProp !== void 0;
    const [inner, setInner] = (0, import_react19.useState)(defaultValue);
    const value = isControlled ? valueProp : inner;
    const setValue = (0, import_react19.useCallback)(
      (v) => {
        if (!isControlled)
          setInner(v);
        onValueChange == null ? void 0 : onValueChange(v);
      },
      [isControlled, onValueChange]
    );
    const ctxValue = (0, import_react19.useMemo)(() => ({ value, setValue }), [value, setValue]);
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(DropdownRadioGroupContext.Provider, { value: ctxValue, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(DropdownMenuGroup, { ...rest, ref, label, children }) });
  }
);
var DropdownMenuRadioItem = import_react19.default.memo(
  (0, import_react19.forwardRef)(function DropdownMenuRadioItem2({ value, onSelect, closeOnSelect = false, ...rest }, ref) {
    const ctx = usePopoverContext("DropdownMenuRadioItem");
    const group = (0, import_react19.useContext)(DropdownRadioGroupContext);
    if (!group)
      throw new Error("DropdownMenuRadioItem must be used within <DropdownMenuRadioGroup>");
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      MenuRow,
      {
        ...rest,
        ref,
        itemRole: "menuitemradio",
        checked: group.value === value,
        indicator: RadioIndicator,
        onActivate: () => {
          group.setValue(value);
          onSelect == null ? void 0 : onSelect();
          if (closeOnSelect)
            ctx.setOpen(false);
        }
      }
    );
  })
);
var DropdownMenuLabel = (0, import_react19.forwardRef)(function DropdownMenuLabel2({ children, className, indent = 0, style, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "div",
    {
      ...rest,
      ref,
      className: cls7("ds-dropdown-menu__label", className),
      style: indentStyle(indent, style),
      children
    }
  );
});
var DropdownMenuSeparator = (0, import_react19.forwardRef)(
  function DropdownMenuSeparator2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
      "div",
      {
        ...rest,
        ref,
        role: "separator",
        "aria-orientation": "horizontal",
        className: cls7("ds-dropdown-menu__separator", className)
      }
    );
  }
);
var Listbox = (0, import_react19.forwardRef)(function Listbox2({ children, className, multiple = false, onKeyDown, onFocus, ...rest }, ref) {
  const rootRef = (0, import_react19.useRef)(null);
  (0, import_react19.useLayoutEffect)(() => {
    var _a;
    const root = rootRef.current;
    if (!root)
      return;
    const options = Array.from(root.querySelectorAll(LISTBOX_OPTION_SELECTOR));
    if (options.length === 0)
      return;
    const current = options.find((o) => o.getAttribute("tabindex") === "0");
    const target = (_a = current != null ? current : options.find((o) => o.getAttribute("aria-selected") === "true")) != null ? _a : options[0];
    for (const o of options)
      o.setAttribute("tabindex", o === target ? "0" : "-1");
  });
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "div",
    {
      ...rest,
      ref: (el) => {
        rootRef.current = el;
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      role: "listbox",
      "aria-multiselectable": multiple || void 0,
      className: cls7("ds-listbox", className),
      onFocus: (e) => {
        onFocus == null ? void 0 : onFocus(e);
        const root = rootRef.current;
        const t = e.target;
        if (!root || t.getAttribute("role") !== "option")
          return;
        for (const o of Array.from(root.querySelectorAll('[role="option"]'))) {
          o.setAttribute("tabindex", o === t ? "0" : "-1");
        }
      },
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.defaultPrevented)
          return;
        handleMenuKeyNavigation(e, LISTBOX_OPTION_SELECTOR);
      },
      children
    }
  );
});
var ListboxOption = (0, import_react19.forwardRef)(function ListboxOption2({
  children,
  className,
  selected = false,
  disabled = false,
  description,
  icon,
  trailing,
  indent = 0,
  onSelect,
  role = "option",
  onClick,
  onKeyDown,
  style,
  ...rest
}, ref) {
  const activate = () => {
    if (!disabled)
      onSelect == null ? void 0 : onSelect();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "div",
    {
      tabIndex: -1,
      ...rest,
      ref,
      role,
      "aria-selected": role === "menuitem" ? void 0 : selected,
      "aria-disabled": disabled || void 0,
      "data-selected": selected ? "true" : void 0,
      style: indentStyle(indent, style),
      className: cls7(
        "ds-dropdown-menu__item",
        "ds-listbox__option",
        selected && "ds-listbox__option--selected",
        description != null && "ds-dropdown-menu__item--with-description",
        className
      ),
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        if (!e.defaultPrevented)
          activate();
      },
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.defaultPrevented)
          return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { className: "ds-dropdown-menu__item-inner", children: [
        icon != null ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ds-dropdown-menu__icon", "aria-hidden": "true", children: icon }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { className: "ds-dropdown-menu__item-text", children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ds-dropdown-menu__item-label", children }),
          description != null ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ds-dropdown-menu__item-description", children: description }) : null
        ] }),
        trailing != null ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "ds-dropdown-menu__item-shortcut", children: trailing }) : null
      ] })
    }
  );
});

// src/components/molecules/Combobox/index.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function cls8(...parts) {
  return parts.filter(Boolean).join(" ");
}
function flattenOptions(options, groups) {
  if (groups == null ? void 0 : groups.length)
    return groups.flatMap((g) => g.options);
  return options != null ? options : [];
}
function ChevronDown() {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("svg", { className: "ds-combobox__chevron", viewBox: "0 0 20 20", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("path", { d: "M5 7.5L10 12.5L15 7.5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
var Combobox = import_react20.default.memo(function Combobox2({
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
  const triggerRef = (0, import_react20.useRef)(null);
  const fieldControlId = field == null ? void 0 : field.id;
  (0, import_react20.useLayoutEffect)(() => {
    const el = triggerRef.current;
    if (!el || !fieldControlId)
      return;
    const original = el.id;
    el.id = fieldControlId;
    return () => {
      el.id = original;
    };
  }, [fieldControlId]);
  const reactId = (0, import_react20.useId)();
  const base = reactId.replace(/:/g, "");
  const listboxId = `ds-combobox-lb-${base}`;
  const searchId = `ds-combobox-search-${base}`;
  const labelId = `ds-combobox-lbl-${base}`;
  const isControlled = valueProp !== void 0;
  const [open, setOpen] = (0, import_react20.useState)(false);
  const [search, setSearch] = (0, import_react20.useState)("");
  (0, import_react20.useEffect)(() => {
    if (!open)
      setSearch("");
  }, [open]);
  const [innerValue, setInnerValue] = (0, import_react20.useState)(() => {
    if (defaultValue !== void 0)
      return defaultValue;
    return multiple ? [] : "";
  });
  const selected = isControlled ? valueProp : innerValue;
  const allOptions = (0, import_react20.useMemo)(() => flattenOptions(options, groups), [options, groups]);
  const useGroups = Boolean(groups == null ? void 0 : groups.length);
  const filteredFlat = (0, import_react20.useMemo)(() => {
    const base2 = options != null ? options : [];
    const q = search.trim().toLowerCase();
    if (!searchable || !q)
      return base2;
    return base2.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, search, searchable]);
  const filteredGroups = (0, import_react20.useMemo)(() => {
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
  const setValue = (0, import_react20.useCallback)(
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
  const displayTrigger = (0, import_react20.useMemo)(() => {
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
  const sizeStyles = (0, import_react20.useMemo)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
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
          opt.icon ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "ds-combobox__option-icon", children: opt.icon }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "ds-combobox__option-label", children: opt.label }),
          multiple && sel ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("svg", { className: "ds-combobox__check", viewBox: "0 0 16 16", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
    "div",
    {
      ...rest,
      id: field && idProp === field.id ? void 0 : idProp,
      className: cls8("ds-combobox", className),
      style: {
        width: fullWidth ? "100%" : "auto",
        display: fullWidth ? "block" : "inline-block",
        ...style
      },
      "data-open": open ? "true" : "false",
      "data-disabled": disabled ? "true" : "false",
      "data-status": resolvedStatus,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(Popover, { open, onOpenChange: setOpen, placement: "bottom-start", children: [
          label ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { id: labelId, className: "ds-combobox__label", children: label }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
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
                /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("span", { className: "ds-combobox__trigger-inner", children: [
                  displayTrigger.icon ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "ds-combobox__trigger-icon", children: displayTrigger.icon }) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                    "span",
                    {
                      className: cls8(
                        "ds-combobox__trigger-label",
                        displayTrigger.placeholder && "ds-combobox__trigger-label--placeholder"
                      ),
                      children: displayTrigger.text
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(ChevronDown, {})
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
            PopoverContent,
            {
              role: "none",
              showPointer: false,
              className: "ds-combobox__popover",
              style: listMinWidth != null ? { minWidth: listMinWidth } : void 0,
              children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "ds-combobox__panel", children: [
                searchable ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
                !hasList ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "ds-combobox__empty", role: "status", children: "No results" }) : useGroups && filteredGroups ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                  "div",
                  {
                    id: listboxId,
                    className: "ds-combobox__listbox",
                    role: "listbox",
                    "aria-multiselectable": multiple,
                    "aria-label": label != null ? label : "Options",
                    children: filteredGroups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_react20.default.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "ds-combobox__group-label", role: "presentation", children: g.label }),
                      g.options.map((opt) => renderOptionRow(opt))
                    ] }, g.label))
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
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
        helperMessage ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { className: "ds-combobox__helper", role: error ? "alert" : void 0, children: helperMessage }) : null
      ]
    }
  );
});
Combobox.displayName = "Combobox";
Combobox[FORM_FIELD_CONSUMER_KEY] = true;
var Combobox_default = Combobox;

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
var import_jsx_runtime20 = require("react/jsx-runtime");
function cls9(...parts) {
  return parts.filter(Boolean).join(" ");
}
function useMediaQuery(query) {
  const [matches, setMatches] = (0, import_react21.useState)(false);
  (0, import_react21.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("svg", { className: "ds-filter-bar__more-icon", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("path", { d: "M3 5h14M6 10h8M8.5 15h3", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) });
}
var FilterBar = import_react21.default.forwardRef(function FilterBar2({
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
  const base = (0, import_react21.useId)().replace(/:/g, "");
  const searchId = `ds-filter-bar-search-${base}`;
  const rootRef = (0, import_react21.useRef)(null);
  const chipsRef = (0, import_react21.useRef)(null);
  const narrow = useMediaQuery(FILTER_BAR_COLLAPSE_QUERY);
  const [moreOpen, setMoreOpen] = (0, import_react21.useState)(false);
  const valueRef = (0, import_react21.useRef)(value);
  valueRef.current = value;
  const onChangeRef = (0, import_react21.useRef)(onChange);
  onChangeRef.current = onChange;
  const [draft, setDraft] = (0, import_react21.useState)((_a = value.search) != null ? _a : "");
  const lastCommitted = (0, import_react21.useRef)((_b = value.search) != null ? _b : "");
  const timerRef = (0, import_react21.useRef)(null);
  const clearTimer = (0, import_react21.useCallback)(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  (0, import_react21.useEffect)(() => clearTimer, [clearTimer]);
  (0, import_react21.useEffect)(() => {
    var _a2;
    const external = (_a2 = value.search) != null ? _a2 : "";
    if (external !== lastCommitted.current) {
      lastCommitted.current = external;
      clearTimer();
      setDraft(external);
    }
  }, [value.search, clearTimer]);
  const commitSearch = (0, import_react21.useCallback)(
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
  const [pendingChipFocus, setPendingChipFocus] = (0, import_react21.useState)(null);
  (0, import_react21.useLayoutEffect)(() => {
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
  const triggerRef = (0, import_react21.useRef)(null);
  const lastFocus = (0, import_react21.useRef)(null);
  const restoreFilterId = (0, import_react21.useRef)(null);
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
  const prevNarrow = (0, import_react21.useRef)(narrow);
  (0, import_react21.useLayoutEffect)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "ds-filter-bar__control", "data-type": f.type, "data-filter-id": f.id, children: f.type === "multi" ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
  const renderOverflow = (f) => f.type === "multi" ? /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("fieldset", { className: "ds-filter-bar__fieldset", children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("legend", { className: "ds-filter-bar__legend", children: f.label }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "ds-filter-bar__checks", children: f.options.map((o) => {
      const selected = toValueList(value.filters[f.id]);
      const checked = selected.includes(o.value);
      return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
  ] }, f.id) : /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "ds-filter-bar__panel-field", children: renderSelect(f, true) }, f.id);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    "div",
    {
      ref: setRootRef,
      role: "group",
      "aria-label": labels.group,
      tabIndex: -1,
      className: cls9("ds-filter-bar", className),
      "data-narrow": narrow ? "true" : "false",
      "data-show-labels": showLabels ? "true" : "false",
      onFocus: trackFocus,
      onBlur: trackBlur,
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "ds-filter-bar__row", children: [
          searchable ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "ds-filter-bar__search", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
          inlineFilters.length > 0 || overflowFilters.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "ds-filter-bar__filters", children: [
            inlineFilters.map(renderInline),
            overflowFilters.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(Popover, { open: moreOpen, onOpenChange: setMoreOpen, placement: "bottom-end", children: [
              /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(PopoverTrigger, { ref: triggerRef, className: "ds-filter-bar__more", "data-active": overflowActive > 0 ? "true" : void 0, children: [
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(FilterIcon, {}),
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { children: triggerText }),
                overflowActive > 0 ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "ds-filter-bar__more-count", "aria-hidden": "true", children: overflowActive }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "visually-hidden", children: labels.activeInOverflow(overflowActive) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(PopoverContent, { showPointer: false, className: "ds-filter-bar__panel", children: [
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "ds-filter-bar__panel-body", children: overflowFilters.map(renderOverflow) }),
                /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "ds-filter-bar__panel-footer", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Button_default, { type: "button", variant: "outlineSecondary", size: "md", onClick: () => setMoreOpen(false), children: labels.done }) })
              ] })
            ] }) : null
          ] }) : null,
          extra ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "ds-filter-bar__extra", children: extra }) : null
        ] }),
        chips.length > 0 || anyActive ? /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "ds-filter-bar__summary", children: [
          chips.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("ul", { ref: chipsRef, className: "ds-filter-bar__chips", "aria-label": labels.activeFilters, children: chips.map((chip, i) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("li", { className: "ds-filter-bar__chip", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
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
          anyActive ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Button_default, { type: "button", variant: "ghost", size: "md", className: "ds-filter-bar__clear", onClick: clearAll, children: labels.clearAll }) : null
        ] }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "ds-filter-bar__count", "aria-live": "polite", "aria-atomic": "true", children: typeof resultCount === "number" ? labels.resultCount(resultCount) : "" })
      ]
    }
  );
});
FilterBar.displayName = "FilterBar";
var FilterBar_default = FilterBar;

// src/components/molecules/Pagination/index.tsx
var import_react22 = __toESM(require("react"));

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
var SAFE_PROTOCOLS2 = /* @__PURE__ */ new Set(["http:", "https:"]);
function isSafePageHref(href) {
  if (typeof href !== "string" || href.trim() === "")
    return false;
  try {
    return SAFE_PROTOCOLS2.has(new URL(href, "https://relative.invalid/").protocol);
  } catch (e) {
    return false;
  }
}

// src/components/molecules/Pagination/index.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
function cls10(...parts) {
  return parts.filter(Boolean).join(" ");
}
var Chevron = ({ direction, double = false }) => /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
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
    children: direction === "left" ? /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_jsx_runtime21.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: double ? "M8.5 4 4.5 8l4 4" : "M10 4 6 8l4 4" }),
      double ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: "M12.5 4 8.5 8l4 4" }) : null
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(import_jsx_runtime21.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: double ? "M7.5 4l4 4-4 4" : "M6 4l4 4-4 4" }),
      double ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: "M3.5 4l4 4-4 4" }) : null
    ] })
  }
);
var Pagination = import_react22.default.forwardRef(function Pagination2({
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
  const sizeSelectId = (0, import_react22.useId)();
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
      control = /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("a", { ...common, href, children: content });
    } else if (getPageHref && (disabled || atBoundary)) {
      control = /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("a", { ...common, role: "link", "aria-disabled": "true", children: content });
    } else {
      control = /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("li", { className: "ds-pagination__item", "data-kind": kind, children: control }, kind === "page" ? `page-${target}` : kind);
  };
  const isFirst = current <= 1;
  const isLast = current >= count;
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
    "nav",
    {
      ref,
      "aria-label": ariaLabel,
      className: cls10("ds-pagination", className),
      "data-size": size,
      "data-compact": compact ? "true" : "false",
      "data-disabled": disabled ? "true" : void 0,
      ...rest,
      children: [
        totalContent !== null ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("p", { className: "ds-pagination__total", "aria-live": "polite", "aria-atomic": "true", children: totalContent }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("ul", { className: "ds-pagination__list", children: [
          showFirstLast && !compact ? renderControl("first", 1, labels.first, /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Chevron, { direction: "left", double: true }), { atBoundary: isFirst }) : null,
          showPrevNext ? renderControl("prev", current - 1, labels.previous, /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Chevron, { direction: "left" }), { atBoundary: isFirst }) : null,
          items.map(
            (item) => item.type === "page" ? renderControl("page", item.page, labels.page(item.page), item.page, { isCurrent: item.page === current }) : /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("li", { className: "ds-pagination__item ds-pagination__ellipsis", "data-kind": "ellipsis", children: [
              /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { "aria-hidden": "true", children: "\u2026" }),
              /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "ds-pagination__sr", children: labels.ellipsis(item.from, item.to) })
            ] }, item.key)
          ),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            "li",
            {
              className: "ds-pagination__item ds-pagination__status",
              "data-kind": "status",
              "aria-live": totalContent === null ? "polite" : void 0,
              "aria-atomic": totalContent === null ? true : void 0,
              children: labels.status(current, count)
            }
          ),
          showPrevNext ? renderControl("next", current + 1, labels.next, /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Chevron, { direction: "right" }), { atBoundary: isLast }) : null,
          showFirstLast && !compact ? renderControl("last", count, labels.last, /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Chevron, { direction: "right", double: true }), { atBoundary: isLast }) : null
        ] }),
        pageSizeOptions && pageSizeOptions.length > 0 && onPageSizeChange ? /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "ds-pagination__size", children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("label", { htmlFor: sizeSelectId, className: "ds-pagination__size-label", children: labels.pageSize }),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
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

// src/components/molecules/FeedbackStates/EmptyState.tsx
var import_react23 = require("react");

// src/components/molecules/FeedbackStates/feedbackState.classes.ts
function feedbackCls(...chunks) {
  return chunks.filter(Boolean).join(" ");
}

// src/components/molecules/FeedbackStates/EmptyState.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
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
  tone: tone2 = "neutral",
  "aria-live": ariaLive = "polite",
  "data-testid": testId
}) {
  const titleId = (0, import_react23.useId)();
  const descId = (0, import_react23.useId)();
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    "section",
    {
      className: feedbackCls(
        "ds-feedback-shell",
        `ds-feedback-shell--${size}`,
        compact && "ds-feedback-shell--compact",
        align === "start" && "ds-feedback-shell--align-start",
        tone2 !== "neutral" && `ds-feedback-shell--tone-${tone2}`,
        className
      ),
      role,
      "aria-live": ariaLive,
      "aria-labelledby": titleId,
      "aria-describedby": description ? descId : void 0,
      "data-testid": testId != null ? testId : "feedback-empty-state",
      children: [
        image ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "ds-feedback-image", children: image }) : null,
        icon ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "span",
          {
            className: "ds-feedback-icon",
            "aria-hidden": iconLabel ? void 0 : "true",
            "aria-label": iconLabel,
            role: iconLabel ? "img" : void 0,
            children: icon
          }
        ) : null,
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TextView_default, { as: "h3", variant: "h4", id: titleId, children: title }),
        description ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TextView_default, { as: "p", variant: "body", color: "secondary", id: descId, children: description }) : null,
        action ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "ds-feedback-actions", children: action }) : null,
        extra ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "ds-feedback-extra", children: extra }) : null
      ]
    }
  );
}

// src/components/molecules/FeedbackStates/ErrorState.tsx
var import_react24 = require("react");
var import_jsx_runtime23 = require("react/jsx-runtime");
function DefaultErrorIcon({ tone: tone2 }) {
  if (tone2 === "warning") {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M12 2L2 20h20L12 2z", stroke: "currentColor", strokeWidth: "1.75", strokeLinejoin: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M12 9v5M12 16.5v.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
    ] });
  }
  if (tone2 === "info") {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M12 8v.5M12 11v5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
    ] });
  }
  if (tone2 === "success") {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M8 12l3 3 5-5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("path", { d: "M12 8v5M12 15.5v.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
function toneClass(tone2) {
  if (tone2 === "neutral")
    return "ds-feedback-shell--tone-neutral";
  if (tone2 === "info")
    return "ds-feedback-shell--tone-info";
  if (tone2 === "success")
    return "ds-feedback-shell--tone-success";
  if (tone2 === "warning")
    return "ds-feedback-shell--tone-warning";
  if (tone2 === "danger")
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
  tone: tone2 = "danger",
  compact = false,
  size = "md",
  align = "center",
  "aria-live": ariaLive,
  role,
  "data-testid": testId
}) {
  const resolvedRole = role != null ? role : details || onRetry ? "alert" : "status";
  const resolvedAriaLive = ariaLive != null ? ariaLive : resolvedRole === "alert" ? "assertive" : "polite";
  const titleId = (0, import_react24.useId)();
  const descId = (0, import_react24.useId)();
  const detailBody = details == null ? null : typeof details === "string" || typeof details === "number" || typeof details === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("pre", { className: "ds-feedback-detail", children: String(details) }) : details instanceof Error ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("pre", { className: "ds-feedback-detail", children: details.message }) : /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "ds-feedback-detail", children: details });
  const resolvedIcon = !hideIcon ? icon != null ? icon : /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(DefaultErrorIcon, { tone: tone2 }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
    "section",
    {
      className: feedbackCls(
        "ds-feedback-shell",
        `ds-feedback-shell--${size}`,
        compact && "ds-feedback-shell--compact",
        align === "start" && "ds-feedback-shell--align-start",
        toneClass(tone2),
        className
      ),
      role: resolvedRole,
      "aria-live": resolvedAriaLive,
      "aria-labelledby": titleId,
      "aria-describedby": description ? descId : void 0,
      "data-testid": testId != null ? testId : "feedback-error-state",
      children: [
        image ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "ds-feedback-image", children: image }) : null,
        resolvedIcon ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "ds-feedback-icon ds-feedback-icon--status", children: resolvedIcon }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TextView_default, { as: "h3", variant: "h4", id: titleId, children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TextView_default, { as: "p", variant: "body", color: "secondary", id: descId, children: description }),
        detailBody,
        onRetry ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "ds-feedback-actions", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(Button_default, { variant: "outlinePrimary", type: "button", onClick: () => onRetry(), size: compact ? "sm" : "md", children: retryLabel }) }) : null,
        extra ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "ds-feedback-extra", children: extra }) : null
      ]
    }
  );
}

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
function resolveRowKey(row2, rowKey) {
  var _a;
  if (typeof rowKey === "function")
    return rowKey(row2);
  return String((_a = row2[rowKey]) != null ? _a : "");
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
function defaultRowFilter(row2, value, searchKeys) {
  var _a, _b;
  const q = ((_a = value.search) != null ? _a : "").trim().toLowerCase();
  if (q && !searchKeys.some((k) => cellText(row2[k]).toLowerCase().includes(q)))
    return false;
  for (const [id, v] of Object.entries((_b = value.filters) != null ? _b : {})) {
    const wanted = toValueList(v);
    if (wanted.length === 0)
      continue;
    const cell2 = row2[id];
    const have = Array.isArray(cell2) ? cell2.map((c) => String(c)) : [cell2 == null ? "" : String(cell2)];
    if (!wanted.some((w) => have.includes(w)))
      return false;
  }
  return true;
}
function isNumericLike2(value) {
  if (typeof value === "number")
    return Number.isFinite(value);
  if (typeof value !== "string")
    return false;
  const trimmed = value.trim();
  if (!trimmed)
    return false;
  return Number.isFinite(Number(trimmed));
}
function toNumber2(value) {
  return typeof value === "number" ? value : Number(String(value).trim());
}
function compareValues(a, b, sortType = "auto") {
  if (a == null && b == null)
    return 0;
  if (a == null)
    return 1;
  if (b == null)
    return -1;
  const numeric = sortType === "number" || sortType === "auto" && isNumericLike2(a) && isNumericLike2(b);
  if (numeric)
    return toNumber2(a) - toNumber2(b);
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
    (row2) => columns.map((c) => escapeCsvCell(c.csvValue ? c.csvValue(row2) : row2[c.key])).join(",")
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
var import_jsx_runtime24 = require("react/jsx-runtime");
function cls11(...parts) {
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
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("svg", { className: "ds-data-table__tool-icon", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("rect", { x: "3", y: "4", width: "14", height: "12", rx: "1.5", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M8 4v12M12 4v12", stroke: "currentColor", strokeWidth: "1.6" })
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
  const base = (0, import_react25.useId)().replace(/:/g, "");
  const captionId = `ds-data-table-caption-${base}`;
  const tableHostRef = (0, import_react25.useRef)(null);
  const serverMode = typeof pagination === "object" && pagination !== null;
  const paged = pagination !== false;
  const getKey = (0, import_react25.useCallback)((row2) => resolveRowKey(row2, rowKey), [rowKey]);
  const [innerFilter, setInnerFilter] = (0, import_react25.useState)((_a = filterBar == null ? void 0 : filterBar.defaultValue) != null ? _a : EMPTY_FILTER_VALUE);
  const filterValue = (_b = filterBar == null ? void 0 : filterBar.value) != null ? _b : innerFilter;
  const filtersActive = Boolean(filterBar) && hasActiveFilterValue(filterValue);
  const [clientPage, setClientPage] = (0, import_react25.useState)(1);
  const [clientPageSize, setClientPageSize] = (0, import_react25.useState)(defaultPageSize);
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
  const [innerVisibility, setInnerVisibility] = (0, import_react25.useState)(() => initialVisibility(columns));
  const visibility = (0, import_react25.useMemo)(() => {
    const seeded = initialVisibility(columns);
    const source = visibilityControlled ? columnVisibility : innerVisibility;
    for (const key of Object.keys(seeded))
      if (key in source)
        seeded[key] = Boolean(source[key]);
    return seeded;
  }, [columns, columnVisibility, innerVisibility, visibilityControlled]);
  const isVisible = (c) => c.hideable === false ? true : visibility[c.key] !== false;
  const tableColumns = (0, import_react25.useMemo)(
    () => columns.map((c) => ({ ...c, hidden: c.hideable === false ? false : visibility[c.key] === false })),
    [columns, visibility]
  );
  const visibleColumns = (0, import_react25.useMemo)(() => tableColumns.filter((c) => !c.hidden), [tableColumns]);
  const setColumnVisible = (key, visible) => {
    const next = { ...visibility, [key]: visible };
    if (!visibilityControlled)
      setInnerVisibility(next);
    onColumnVisibilityChange == null ? void 0 : onColumnVisibilityChange(next);
  };
  const [sort, setSort] = (0, import_react25.useState)(NO_SORT);
  const sortRef = (0, import_react25.useRef)(sort);
  sortRef.current = sort;
  (0, import_react25.useEffect)(() => {
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
  const filteredRows = (0, import_react25.useMemo)(() => {
    if (serverMode || !hasFilterBar)
      return data;
    const searchKeys = visibleColumns.map((c) => c.key);
    return data.filter((row2) => filterFn ? filterFn(row2, filterValue) : defaultRowFilter(row2, filterValue, searchKeys));
  }, [serverMode, hasFilterBar, data, filterFn, filterValue, visibleColumns]);
  const sortColumn = visibleColumns.find((c) => c.key === sort.key);
  const orderedRows = (0, import_react25.useMemo)(
    () => serverMode ? filteredRows : sortRows(filteredRows, sortColumn, sort.direction),
    [serverMode, filteredRows, sortColumn, sort.direction]
  );
  const total = serverMode ? pagination.total : orderedRows.length;
  const pageSize = serverMode ? pagination.pageSize : clientPageSize;
  const pageCount = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  const page = serverMode ? pagination.page : Math.min(Math.max(1, clientPage), pageCount);
  (0, import_react25.useEffect)(() => {
    if (!serverMode && clientPage !== page)
      setClientPage(page);
  }, [serverMode, clientPage, page]);
  const pageRows = (0, import_react25.useMemo)(() => {
    if (serverMode || !paged)
      return orderedRows;
    const start = (page - 1) * pageSize;
    return orderedRows.slice(start, start + pageSize);
  }, [serverMode, paged, orderedRows, page, pageSize]);
  const [innerSelection, setInnerSelection] = (0, import_react25.useState)([]);
  const selection = selectedRowKeys != null ? selectedRowKeys : innerSelection;
  const [selectionNote, setSelectionNote] = (0, import_react25.useState)("");
  const noteSeen = (0, import_react25.useRef)(false);
  const noteConsumed = (0, import_react25.useRef)(false);
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
  (0, import_react25.useEffect)(() => {
    if (!loading && noteConsumed.current && selectionNote)
      setSelectionNote("");
  }, [loading, selectionNote]);
  (0, import_react25.useEffect)(() => {
    if (!selectionNote)
      return;
    const t = setTimeout(() => setSelectionNote(""), SELECTION_NOTE_MS);
    return () => clearTimeout(t);
  }, [selectionNote]);
  const rowCache = (0, import_react25.useRef)(/* @__PURE__ */ new Map());
  for (const row2 of data)
    rowCache.current.set(getKey(row2), row2);
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
  const markupWarned = (0, import_react25.useRef)(false);
  (0, import_react25.useLayoutEffect)(() => {
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
  const [columnsOpen, setColumnsOpen] = (0, import_react25.useState)(false);
  const columnMenu = columnVisibility ? /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(Popover, { open: columnsOpen, onOpenChange: setColumnsOpen, placement: "bottom-end", children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(PopoverTrigger, { className: "ds-data-table__tool", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(ColumnsIcon, {}),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { children: labels.columns })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(PopoverContent, { showPointer: false, className: "ds-data-table__menu", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("fieldset", { className: "ds-data-table__fieldset", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("legend", { className: "ds-data-table__legend", children: labels.columnsLegend }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "ds-data-table__checks", children: columns.map((c) => {
        const checked = isVisible(c);
        const locked = c.hideable === false || checked && visibleColumns.length <= 1;
        return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
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
  const exportButton = exportOptions ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Button_default, { type: "button", variant: "outlineSecondary", size: "lg", onClick: handleExport, disabled: loading, children: (_d = exportOptions.label) != null ? _d : labels.exportCsv }, "export") : null;
  const toolItems = [filterBar == null ? void 0 : filterBar.extra, toolbarRight, columnMenu, exportButton].filter(Boolean);
  const tools = toolItems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_jsx_runtime24.Fragment, { children: toolItems.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_react25.default.Fragment, { children: n }, i)) }) : void 0;
  const clearFilters = () => handleFilterChange({ ...filterValue, search: "", filters: {} });
  const emptyNode = filtersActive ? noResultsState != null ? noResultsState : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    EmptyState,
    {
      compact: true,
      title: labels.noResultsTitle,
      description: labels.noResultsDescription,
      action: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Button_default, { type: "button", variant: "outlineSecondary", size: "md", onClick: clearFilters, children: labels.clearFilters })
    }
  ) : emptyState != null ? emptyState : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(EmptyState, { compact: true, title: labels.emptyTitle, description: labels.emptyDescription });
  const paginationLabel = paginationAriaLabel != null ? paginationAriaLabel : typeof caption === "string" && caption.trim() ? `${caption} pagination` : labels.pagination;
  const showPagination = paged && !error && total > 0;
  const lastResultCount = (0, import_react25.useRef)(void 0);
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
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
    "div",
    {
      ref: setRootRef,
      className: cls11("ds-data-table", className),
      "data-loading": loading ? "true" : void 0,
      "data-error": error ? "true" : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { id: captionId, className: cls11("ds-data-table__caption", hideCaption && "visually-hidden"), children: caption }),
        filterBar ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          FilterBar_default,
          {
            ...filterBarRest,
            value: filterValue,
            onChange: handleFilterChange,
            resultCount: filterResultCount != null ? filterResultCount : error ? void 0 : loading ? lastResultCount.current : total,
            extra: tools
          }
        ) : tools ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "ds-data-table__toolbar", children: tools }) : null,
        selectable ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "ds-data-table__bulk-slot", "data-active": selection.length > 0 ? "true" : "false", children: selection.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "ds-data-table__bulk", role: "group", "aria-label": labels.bulkActions, children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "ds-data-table__bulk-count", children: labels.selectedCount(selection.length) }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "ds-data-table__bulk-sep", "aria-hidden": "true", children: "\xB7" }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
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
          bulkActions && bulkActions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "ds-data-table__bulk-actions", children: bulkActions.map((action) => {
            var _a2;
            return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
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
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "ds-data-table__bulk-hint", children: labels.bulkHint }) }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "visually-hidden", "aria-live": "polite", "aria-atomic": "true", children: loading ? loadingLiveText : selectable && selection.length > 0 ? labels.selectionStatus(selection.length) : liveSelectionNote }),
        error ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "ds-data-table__state", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          ErrorState,
          {
            compact: true,
            title: (_e = error.title) != null ? _e : labels.errorTitle,
            description: (_f = error.description) != null ? _f : labels.errorDescription,
            onRetry: error.onRetry
          }
        ) }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
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
            children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
              Table_default,
              {
                ...tableRest,
                expandable,
                className: tableClassName,
                columns: tableColumns,
                data: pageRows,
                rowKey: (row2) => getKey(row2),
                selectionMode: selectable ? "multiple" : "none",
                selectedRowKeys: selection,
                onSelectionChange: (keys) => handleTableSelection(keys),
                searchable: false,
                pagination: false,
                loading,
                loadingVariant: "skeleton",
                loadingRows,
                emptyComponent: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "ds-data-table__state", children: emptyNode })
              }
            )
          }
        ),
        showPagination ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
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
var DataTable = import_react25.default.forwardRef(DataTableInner);
DataTable.displayName = "DataTable";
var DataTable_default = DataTable;

// src/components/molecules/Alert/index.tsx
var import_react27 = __toESM(require("react"));

// src/components/molecules/Alert/Alert.config.ts
var import_react26 = __toESM(require("react"));
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
var h = import_react26.default.createElement;
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
var import_jsx_runtime25 = require("react/jsx-runtime");
var Alert = import_react27.default.forwardRef(function Alert2({
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
  const prefix = srPrefix ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("span", { className: "ds-alert__sr", children: [
    ALERT_SR_PREFIX[variant],
    " "
  ] }) : null;
  const hasTitle = title !== void 0 && title !== null && title !== false;
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
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
        hideIcon ? null : /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "ds-alert__icon", "aria-hidden": "true", children: icon != null ? icon : getAlertIcon(variant) }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "ds-alert__body", children: [
          hasTitle ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("p", { className: "ds-alert__title", children: [
            prefix,
            title
          ] }) : null,
          children ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "ds-alert__description", children: [
            hasTitle ? null : prefix,
            children
          ] }) : null
        ] }),
        action || onDismiss ? /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "ds-alert__actions", children: [
          action ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "ds-alert__action", children: action }) : null,
          onDismiss ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("button", { type: "button", className: "ds-alert__dismiss", "aria-label": dismissLabel, onClick: onDismiss, children: getCloseIcon() }) : null
        ] }) : null
      ]
    }
  );
});
Alert.displayName = "Alert";
var Alert_default = Alert;

// src/components/molecules/Grid/index.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
function toCssSize2(value, fallback) {
  if (value === void 0)
    return fallback;
  return typeof value === "number" ? `${value}px` : value;
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
  const gapValue = toCssSize2(gap, "16px");
  const minWidthValue = toCssSize2(minItemWidth, "240px");
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
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

// src/components/charts/BarChart.tsx
var import_react30 = __toESM(require("react"));

// src/components/charts/Chart.types.ts
var CHART_THEME_COLORS = {
  light: {
    tooltipBg: "var(--color-bg-surface)",
    tooltipBorder: "var(--color-border-default)",
    tooltipText: "var(--color-text-primary)",
    legendText: "var(--color-text-secondary)",
    axisText: "var(--color-text-secondary)",
    gridColor: "var(--color-border-default)"
  },
  dark: {
    tooltipBg: "var(--color-bg-surface)",
    tooltipBorder: "var(--color-border-default)",
    tooltipText: "var(--color-text-primary)",
    legendText: "var(--color-text-secondary)",
    axisText: "var(--color-text-secondary)",
    gridColor: "var(--color-border-subtle)"
  }
};

// src/components/charts/ChartTooltip.tsx
var import_react28 = __toESM(require("react"));
var import_jsx_runtime27 = require("react/jsx-runtime");
function cls12(...parts) {
  return parts.filter(Boolean).join(" ");
}
var ChartTooltip = import_react28.default.memo(function ChartTooltip2({
  theme,
  open,
  pointerX,
  pointerY,
  containerWidth,
  containerHeight,
  label,
  items,
  animation = true,
  followPointer = true
}) {
  const themeColors = CHART_THEME_COLORS[theme];
  const ref = (0, import_react28.useRef)(null);
  const [pos, setPos] = (0, import_react28.useState)({ left: 0, top: 0 });
  const [enter, setEnter] = (0, import_react28.useState)(false);
  (0, import_react28.useLayoutEffect)(() => {
    if (!open || !ref.current)
      return;
    const el = ref.current;
    const tw = el.offsetWidth;
    const th = el.offsetHeight;
    const pad = 8;
    const gap = 12;
    let left = pointerX + gap;
    let top = pointerY + gap;
    if (followPointer) {
      if (left + tw > containerWidth - pad) {
        left = pointerX - tw - gap;
      }
      if (top + th > containerHeight - pad) {
        top = pointerY - th - gap;
      }
      if (left < pad)
        left = pad;
      if (top < pad)
        top = pad;
    }
    left = Math.max(pad, Math.min(left, Math.max(pad, containerWidth - tw - pad)));
    top = Math.max(pad, Math.min(top, Math.max(pad, containerHeight - th - pad)));
    setPos({ left, top });
  }, [
    open,
    pointerX,
    pointerY,
    containerWidth,
    containerHeight,
    followPointer,
    label,
    items.length
  ]);
  import_react28.default.useEffect(() => {
    if (!open) {
      setEnter(false);
      return;
    }
    setEnter(false);
    const id = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(id);
  }, [open]);
  if (!open)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
    "div",
    {
      ref,
      role: "tooltip",
      "data-chart-theme": theme,
      className: cls12(
        "ds-chart-tooltip",
        animation && "ds-chart-tooltip--motion",
        animation && enter && "ds-chart-tooltip--enter"
      ),
      style: {
        left: pos.left,
        top: pos.top,
        background: themeColors.tooltipBg,
        border: `1px solid ${themeColors.tooltipBorder}`,
        color: themeColors.tooltipText
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          "div",
          {
            className: "ds-chart-tooltip__label",
            style: {
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: themeColors.tooltipBorder
            },
            children: label
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "ds-chart-tooltip__rows", children: items.map((item, i) => {
          var _a;
          return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "ds-chart-tooltip__row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "ds-chart-tooltip__dot", style: { background: item.color }, "aria-hidden": true }),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "ds-chart-tooltip__name", style: { color: themeColors.legendText }, children: item.name }),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "ds-chart-tooltip__value", children: (_a = item.displayValue) != null ? _a : item.value })
          ] }, `${item.name}-${i}`);
        }) })
      ]
    }
  );
});

// src/components/charts/useChartAnimation.ts
var import_react29 = require("react");
var DEFAULT_MS_LINE = 800;
var DEFAULT_MS_BAR = 650;
var DEFAULT_MS_PIE = 750;
function resolveChartAnimation(option, kind) {
  var _a, _b;
  const base = kind === "bar" ? DEFAULT_MS_BAR : kind === "pie" ? DEFAULT_MS_PIE : DEFAULT_MS_LINE;
  if (option === false) {
    return { enabled: false, durationMs: base, easing: "ease-out", barStagger: false };
  }
  if (option === true || option === void 0) {
    return { enabled: true, durationMs: base, easing: "ease-out", barStagger: false };
  }
  const obj = option;
  return {
    enabled: obj.enabled !== false,
    durationMs: (_a = obj.durationMs) != null ? _a : base,
    easing: (_b = obj.easing) != null ? _b : "ease-out",
    barStagger: obj.barStagger === true
  };
}
function chartEase(t, preset) {
  const x = Math.min(1, Math.max(0, t));
  switch (preset) {
    case "linear":
      return x;
    case "ease-in":
      return x * x * x;
    case "ease-out":
      return 1 - (1 - x) ** 3;
    case "ease-in-out":
      return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
    case "default":
    default:
      return 1 - (1 - x) ** 3;
  }
}
function usePrefersReducedMotion() {
  const [reduced, setReduced] = (0, import_react29.useState)(false);
  (0, import_react29.useEffect)(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}
function useChartAnimationProgress(enabled, durationMs, easing, resetKey) {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = (0, import_react29.useState)(() => !enabled || reduced ? 1 : 0);
  (0, import_react29.useEffect)(() => {
    if (!enabled || reduced) {
      setProgress(1);
      return;
    }
    setProgress(0);
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / Math.max(16, durationMs));
      setProgress(chartEase(t, easing));
      if (t < 1)
        raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, reduced, durationMs, easing, resetKey]);
  return reduced ? 1 : progress;
}
function barProgressForIndex(global, index, total, stagger) {
  if (!stagger || total <= 1)
    return global;
  const w = 0.55;
  const start = total > 1 ? index / (total - 1) * w : 0;
  if (global <= start)
    return 0;
  return Math.min(1, (global - start) / (1 - start));
}

// src/components/charts/cartesian.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
var AXIS_FONT_SIZE = 11;
var APPROX_CHAR_W = 6.5;
var defaultNumberFormat = typeof Intl !== "undefined" ? new Intl.NumberFormat(void 0, { maximumFractionDigits: 2 }) : null;
function defaultFormatNumber(v) {
  if (!Number.isFinite(v))
    return "";
  return defaultNumberFormat ? defaultNumberFormat.format(v) : String(Math.round(v * 100) / 100);
}
function num(row2, key) {
  const v = row2 == null ? void 0 : row2[key];
  if (typeof v === "number")
    return Number.isFinite(v) ? v : 0;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}
function niceNum(range2, round) {
  const exp = Math.floor(Math.log10(range2));
  const f = range2 / 10 ** exp;
  let nf;
  if (round)
    nf = f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10;
  else
    nf = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return nf * 10 ** exp;
}
function niceTicks(min, max, count = 5) {
  let lo = Math.min(min, max);
  let hi = Math.max(min, max);
  if (lo === hi) {
    hi = lo === 0 ? 1 : lo + Math.abs(lo) * 0.5;
    if (lo > 0)
      lo = 0;
  }
  const n = Math.max(2, Math.round(count));
  const step = niceNum(niceNum(hi - lo, false) / (n - 1), true);
  const nLo = Math.floor(lo / step) * step;
  const nHi = Math.ceil(hi / step) * step;
  const ticks = [];
  const decimals = Math.max(0, -Math.floor(Math.log10(step)) + 1);
  for (let t = nLo; t <= nHi + step / 2; t += step) {
    ticks.push(Number(t.toFixed(decimals)));
  }
  return { domain: [nLo, nHi], ticks };
}
function resolveAxes(props, series2) {
  var _a, _b, _c, _d;
  const hasRight = series2.some((s) => s.yAxis === "right");
  const vf = props.valueFormatter;
  const leftTickFormat = (_a = props.yTickFormatter) != null ? _a : vf ? (v) => vf(v) : defaultFormatNumber;
  const rightTickFormat = (_b = props.rightYTickFormatter) != null ? _b : leftTickFormat;
  const showYAxis = (_c = props.showYAxis) != null ? _c : Boolean(vf) || Boolean(props.yTickFormatter) || hasRight;
  return {
    showYAxis,
    hasRight,
    leftTickFormat,
    rightTickFormat,
    labelFormat: (_d = props.labelFormatter) != null ? _d : props.tooltipLabelFormatter,
    valueFormatter: vf
  };
}
function tooltipLabel(row2, index, xAxisKey, labelFormat) {
  const raw = row2[xAxisKey];
  return labelFormat ? labelFormat(raw, row2, index) : String(raw != null ? raw : "");
}
function tooltipValue(vf, value, dataKey) {
  return vf ? vf(value, dataKey) : void 0;
}
function xTickIndices(labels, interval, slotWidth, angle = 0) {
  const n = labels.length;
  if (n === 0)
    return [];
  let step = 1;
  if (interval === "auto") {
    const maxChars = labels.reduce((m, l) => Math.max(m, l.length), 0);
    const textW = maxChars * APPROX_CHAR_W;
    const rad = Math.abs(angle) * Math.PI / 180;
    const footprint = rad > 0.05 ? Math.min(textW, (AXIS_FONT_SIZE + 3) / Math.sin(rad)) : textW;
    step = Math.max(1, Math.ceil((footprint + 4) / Math.max(1, slotWidth)));
  } else if (typeof interval === "number" && interval > 0) {
    step = Math.floor(interval) + 1;
  }
  const out = [];
  for (let i = 0; i < n; i += step)
    out.push(i);
  return out;
}
function XAxisLabels({
  positions,
  labels,
  indices,
  y,
  angle = 0,
  color
}) {
  const rotated = Math.abs(angle) > 0.01;
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    "g",
    {
      className: "ds-chart-x-axis",
      fill: color,
      fontSize: AXIS_FONT_SIZE,
      textAnchor: rotated ? angle < 0 ? "end" : "start" : "middle",
      children: indices.map((i) => {
        const x = positions[i];
        if (x === void 0)
          return null;
        if (!rotated) {
          return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("text", { x, y, children: labels[i] }, i);
        }
        const ry = y - 6;
        return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("text", { x, y: ry, dy: "0.71em", transform: `rotate(${angle} ${x} ${ry})`, children: labels[i] }, i);
      })
    }
  );
}
function YAxisLabels({
  ticks,
  scale,
  x,
  side,
  format,
  color
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    "g",
    {
      className: `ds-chart-y-axis ds-chart-y-axis--${side}`,
      fill: color,
      fontSize: AXIS_FONT_SIZE,
      textAnchor: side === "left" ? "end" : "start",
      children: ticks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("text", { x: side === "left" ? x - 6 : x + 6, y: scale(t), dominantBaseline: "middle", children: format(t) }, t))
    }
  );
}
function ChartLegend({
  items,
  position,
  textColor
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
    "div",
    {
      className: "ds-chart-legend",
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        justifyContent: position === "left" ? "flex-start" : position === "right" ? "flex-end" : "center",
        marginTop: position === "top" ? 0 : 8,
        marginBottom: position === "bottom" ? 0 : 8,
        fontSize: 12
      },
      children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
          "span",
          {
            "aria-hidden": true,
            style: {
              width: 12,
              height: it.shape === "line" ? 3 : 12,
              borderRadius: 2,
              background: it.color,
              opacity: it.shape === "band" ? 0.35 : 1
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { style: { color: textColor }, children: it.label })
      ] }, it.key))
    }
  );
}
function buildValueAxis(extent, range2, visible, tickCount = 5) {
  let domain = extent;
  let ticks = [];
  if (visible) {
    const nice = niceTicks(extent[0], extent[1], tickCount);
    domain = nice.domain;
    ticks = nice.ticks;
  }
  const [d0, d1] = domain;
  const span = d1 - d0 || 1;
  const k = (range2[1] - range2[0]) / span;
  return { domain, ticks, scale: (v) => range2[0] + (v - d0) * k };
}
function seriesOnSide(series2, side) {
  return series2.filter((s) => {
    var _a;
    return ((_a = s.yAxis) != null ? _a : "left") === side;
  });
}

// src/components/charts/BarChart.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
var DEFAULT_COLORS = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)"
];
function valueExtent(data, series2, stacked) {
  let lo = 0;
  let hi = 0;
  for (const row2 of data) {
    if (stacked) {
      let pos = 0;
      let neg = 0;
      for (const s of series2) {
        const v = num(row2, s.dataKey);
        if (v >= 0)
          pos += v;
        else
          neg += v;
      }
      hi = Math.max(hi, pos);
      lo = Math.min(lo, neg);
    } else {
      for (const s of series2) {
        const v = num(row2, s.dataKey);
        hi = Math.max(hi, v);
        lo = Math.min(lo, v);
      }
    }
  }
  if (lo === hi)
    hi = lo + 1;
  return [lo, hi];
}
var BarChartComponent = (props) => {
  var _a, _b, _c, _d;
  const {
    data,
    xAxisKey = "name",
    series: series2,
    colors = DEFAULT_COLORS,
    layout = "vertical",
    orientation,
    barSize = 24,
    barGap = 4,
    barCategoryGap = "10%",
    radius = 4,
    stacked = false,
    getBarColor,
    colorKey,
    width = "100%",
    height = 300,
    margin,
    showGrid = true,
    gridColor,
    showTooltip = true,
    showLegend = true,
    legendPosition = "bottom",
    theme = "light",
    tooltipFollowPointer = true,
    tooltipAnimation = true,
    chartAnimation = true,
    className = "",
    style = {},
    xTickAngle = 0,
    xTickInterval = 0,
    yTickCount = 5,
    xTickFormatter
  } = props;
  const horizontal = orientation ? orientation === "horizontal-bars" : layout === "horizontal";
  const axisSeries = horizontal ? series2.map((s) => ({ ...s, yAxis: "left" })) : series2;
  const axes = resolveAxes(props, axisSeries);
  const animCfg = resolveChartAnimation(chartAnimation, "bar");
  const animKey = (0, import_react30.useMemo)(
    () => `${data.length}-${series2.map((s) => s.dataKey).join(",")}-${xAxisKey}-${horizontal}-${stacked}`,
    [data.length, series2, xAxisKey, horizontal, stacked]
  );
  const animProgress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const containerRef = (0, import_react30.useRef)(null);
  const [tooltip, setTooltip] = (0, import_react30.useState)(null);
  const w = typeof width === "number" ? width : 400;
  const h2 = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : axes.hasRight && axes.showYAxis ? 48 : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h2 - m.top - m.bottom;
  const n = Math.max(1, data.length);
  const sideOf = (s) => axes.hasRight && s.yAxis === "right" ? "right" : "left";
  const valueRange = horizontal ? [0, innerW] : [innerH, 0];
  const leftAxis = buildValueAxis(
    valueExtent(data, axes.hasRight ? axisSeries.filter((s) => sideOf(s) === "left") : axisSeries, stacked),
    valueRange,
    axes.showYAxis,
    yTickCount
  );
  const rightAxis = axes.hasRight ? buildValueAxis(valueExtent(data, axisSeries.filter((s) => sideOf(s) === "right"), stacked), valueRange, axes.showYAxis, yTickCount) : leftAxis;
  const scaleFor = (s) => sideOf(s) === "right" ? rightAxis.scale : leftAxis.scale;
  const bandLen = horizontal ? innerH : innerW;
  const slot = bandLen / n;
  const catGap = typeof barCategoryGap === "string" && barCategoryGap.endsWith("%") ? slot * (parseFloat(barCategoryGap) / 100) : typeof barCategoryGap === "number" ? barCategoryGap : 8;
  const groupWidth = slot - catGap;
  const stackSides = axes.hasRight ? ["left", "right"] : ["left"];
  const barsPerGroup = stacked ? stackSides.length : series2.length;
  const barWidth = Math.min(barSize, Math.max(2, (groupWidth - (barsPerGroup - 1) * barGap) / Math.max(1, barsPerGroup)));
  const totalBarWidth = barsPerGroup * barWidth + (barsPerGroup - 1) * barGap;
  const colorOf = (row2, idx, s, si) => {
    var _a2;
    const custom = getBarColor == null ? void 0 : getBarColor(row2, idx, s.dataKey);
    if (custom)
      return custom;
    if (colorKey) {
      const c = row2[colorKey];
      if (typeof c === "string" && c)
        return c;
    }
    return (_a2 = s.color) != null ? _a2 : colors[si % colors.length];
  };
  const rects = [];
  data.forEach((row2, idx) => {
    const growth = animCfg.barStagger ? barProgressForIndex(animProgress, idx, n, true) : animProgress;
    const groupStart = idx * slot + (slot - totalBarWidth) / 2;
    const cumPos = { left: 0, right: 0 };
    const cumNeg = { left: 0, right: 0 };
    series2.forEach((s, si) => {
      const v = num(row2, s.dataKey);
      const side = sideOf(s);
      let v0 = 0;
      let v1 = v;
      let pos = si;
      if (stacked) {
        pos = stackSides.indexOf(side);
        if (v >= 0) {
          v0 = cumPos[side];
          cumPos[side] += v;
        } else {
          v0 = cumNeg[side];
          cumNeg[side] += v;
        }
        v1 = v0 + v;
      }
      const sc = scaleFor(s);
      const a = sc(v0 * growth);
      const b = sc(v1 * growth);
      const offset = groupStart + pos * (barWidth + barGap);
      const fill = colorOf(row2, idx, s, si);
      if (horizontal) {
        rects.push({ key: `${idx}-${s.dataKey}`, x: m.left + Math.min(a, b), y: m.top + offset, w: Math.abs(b - a), h: barWidth, fill, idx });
      } else {
        rects.push({ key: `${idx}-${s.dataKey}`, x: m.left + offset, y: m.top + Math.min(a, b), w: barWidth, h: Math.abs(b - a), fill, idx });
      }
    });
  });
  const categoryLabels = (0, import_react30.useMemo)(
    () => data.map((d, i) => {
      var _a2;
      return xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String((_a2 = d[xAxisKey]) != null ? _a2 : "");
    }),
    [data, xAxisKey, xTickFormatter]
  );
  const { valueFormatter, labelFormat } = axes;
  const handleMouseMove = (0, import_react30.useCallback)(
    (e, idx) => {
      if (!showTooltip || !containerRef.current)
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const row2 = data[idx];
      const items = series2.map((s, i) => {
        var _a2;
        const v = num(row2, s.dataKey);
        const custom = getBarColor == null ? void 0 : getBarColor(row2, idx, s.dataKey);
        const keyed = colorKey && typeof row2[colorKey] === "string" ? row2[colorKey] : void 0;
        return {
          name: (_a2 = s.name) != null ? _a2 : s.dataKey,
          value: v,
          color: custom || keyed || s.color || colors[i % colors.length],
          displayValue: tooltipValue(valueFormatter, v, s.dataKey)
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row2, idx, xAxisKey, labelFormat),
        items
      });
    },
    [showTooltip, data, series2, xAxisKey, colors, getBarColor, colorKey, valueFormatter, labelFormat]
  );
  const handleMouseLeave = (0, import_react30.useCallback)(() => setTooltip(null), []);
  const r = Array.isArray(radius) ? radius[0] : radius;
  const bandCenters = data.map((_, i) => (horizontal ? m.top : m.left) + (i + 0.5) * slot);
  const tickIdx = horizontal ? data.map((_, i) => i) : xTickIndices(categoryLabels, xTickInterval, slot, xTickAngle);
  const gridLines = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => (horizontal ? innerW : innerH) * t);
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
    "div",
    {
      ref: containerRef,
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h2,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h2}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: gridLines.map(
                (g) => horizontal ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("line", { x1: m.left + g, y1: m.top, x2: m.left + g, y2: m.top + innerH }, g) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("line", { x1: m.left, y1: m.top + g, x2: m.left + innerW, y2: m.top + g }, g)
              ) }),
              showTooltip && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("g", { className: "ds-chart-bar-bands", fill: "transparent", children: data.map(
                (_, idx) => horizontal ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("rect", { x: m.left, y: m.top + idx * slot, width: innerW, height: slot, onMouseMove: (e) => handleMouseMove(e, idx) }, idx) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("rect", { x: m.left + idx * slot, y: m.top, width: slot, height: innerH, onMouseMove: (e) => handleMouseMove(e, idx) }, idx)
              ) }),
              rects.map((b) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                "rect",
                {
                  x: b.x,
                  y: b.y,
                  width: Math.max(0, b.w),
                  height: Math.max(0, b.h),
                  fill: b.fill,
                  rx: r,
                  ry: r,
                  "data-testid": "ds-chart-bar",
                  onMouseMove: (e) => handleMouseMove(e, b.idx)
                },
                b.key
              )),
              horizontal ? /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_jsx_runtime29.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("g", { className: "ds-chart-category-axis", fill: themeColors.axisText, fontSize: 11, textAnchor: "end", children: data.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("text", { x: m.left - 6, y: bandCenters[i], dominantBaseline: "middle", children: categoryLabels[i] }, i)) }),
                axes.showYAxis && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("g", { className: "ds-chart-value-axis", fill: themeColors.axisText, fontSize: 11, textAnchor: "middle", children: leftAxis.ticks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("text", { x: m.left + leftAxis.scale(t), y: m.top + innerH + 16, children: axes.leftTickFormat(t) }, t)) })
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_jsx_runtime29.Fragment, { children: [
                axes.showYAxis && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                  YAxisLabels,
                  {
                    ticks: leftAxis.ticks,
                    scale: (v) => m.top + leftAxis.scale(v),
                    x: m.left,
                    side: "left",
                    format: axes.leftTickFormat,
                    color: themeColors.axisText
                  }
                ),
                axes.showYAxis && axes.hasRight && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                  YAxisLabels,
                  {
                    ticks: rightAxis.ticks,
                    scale: (v) => m.top + rightAxis.scale(v),
                    x: m.left + innerW,
                    side: "right",
                    format: axes.rightTickFormat,
                    color: themeColors.axisText
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                  XAxisLabels,
                  {
                    positions: bandCenters,
                    labels: categoryLabels,
                    indices: tickIdx,
                    y: m.top + innerH + 16,
                    angle: xTickAngle,
                    color: themeColors.axisText
                  }
                )
              ] })
            ]
          }
        ),
        showTooltip && tooltip && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          ChartLegend,
          {
            position: legendPosition,
            textColor: themeColors.legendText,
            items: series2.map((s, i) => {
              var _a2, _b2;
              return { key: s.dataKey, label: (_a2 = s.name) != null ? _a2 : s.dataKey, color: (_b2 = s.color) != null ? _b2 : colors[i % colors.length], shape: "square" };
            })
          }
        )
      ]
    }
  );
};
var BarChart_default = import_react30.default.memo(BarChartComponent);

// src/components/charts/LineChart.tsx
var import_react32 = __toESM(require("react"));

// src/components/charts/chartPrimitives.tsx
var import_react31 = require("react");
var import_jsx_runtime30 = require("react/jsx-runtime");
function AnimatedLineStroke({
  pathD,
  progress,
  color,
  strokeWidth
}) {
  const ref = (0, import_react31.useRef)(null);
  const [length, setLength] = (0, import_react31.useState)(0);
  (0, import_react31.useLayoutEffect)(() => {
    const el = ref.current;
    if (!el || !pathD) {
      setLength(0);
      return;
    }
    try {
      setLength(el.getTotalLength());
    } catch (e) {
      setLength(0);
    }
  }, [pathD]);
  const len = length || 1;
  const offset = len * (1 - progress);
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    "path",
    {
      ref,
      d: pathD,
      fill: "none",
      stroke: color,
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeDasharray: len,
      strokeDashoffset: offset
    }
  );
}

// src/components/charts/utils.ts
function getValueExtent(data, series2, stacked = false) {
  let min = Infinity;
  let max = -Infinity;
  if (stacked) {
    min = 0;
    for (const row2 of data) {
      let sum = 0;
      for (const s of series2) {
        const v = row2[s.dataKey];
        sum += typeof v === "number" ? v : 0;
      }
      if (sum > max)
        max = sum;
    }
  } else {
    for (const row2 of data) {
      for (const s of series2) {
        const v = row2[s.dataKey];
        if (typeof v === "number") {
          const n = v;
          if (n < min)
            min = n;
          if (n > max)
            max = n;
        }
      }
    }
  }
  if (min === Infinity)
    min = 0;
  if (max === -Infinity)
    max = 100;
  if (min === max)
    max = min + 1;
  return [min, max];
}
function linePath(points, curve) {
  if (points.length === 0)
    return "";
  if (points.length === 1)
    return `M ${points[0].x} ${points[0].y}`;
  if (curve === "linear") {
    return points.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`).join(" ");
  }
  if (curve === "step" || curve === "stepBefore" || curve === "stepAfter") {
    const parts = [`M ${points[0].x} ${points[0].y}`];
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      if (curve === "step") {
        const midX = (prev.x + curr.x) / 2;
        parts.push(`L ${midX} ${prev.y}`);
        parts.push(`L ${midX} ${curr.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      } else if (curve === "stepBefore") {
        parts.push(`L ${curr.x} ${prev.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      } else {
        parts.push(`L ${prev.x} ${curr.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      }
    }
    return parts.join(" ");
  }
  const d = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 1; i < points.length; i++) {
    const p0 = points[Math.max(0, i - 2)];
    const p1 = points[i - 1];
    const p2 = points[i];
    const p3 = points[Math.min(points.length - 1, i + 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`);
  }
  return d.join(" ");
}
function degToRad(deg) {
  return deg * Math.PI / 180;
}
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = degToRad(angleDeg - 90);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arcPath(cx, cy, r, startAngleDeg, endAngleDeg, innerRadius = 0) {
  const span = endAngleDeg - startAngleDeg;
  if (span <= 0)
    return "";
  const start = polarToCartesian(cx, cy, r, startAngleDeg);
  const end = polarToCartesian(cx, cy, r, endAngleDeg);
  const largeArc = span >= 180 ? 1 : 0;
  const sweep = 1;
  if (innerRadius <= 0) {
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y} Z`;
  }
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngleDeg);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngleDeg);
  const innerLargeArc = span >= 180 ? 1 : 0;
  return `M ${innerStart.x} ${innerStart.y} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y} L ${innerEnd.x} ${innerEnd.y} A ${innerRadius} ${innerRadius} 0 ${innerLargeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
}

// src/components/charts/LineChart.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
var DEFAULT_COLORS2 = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)"
];
var LineChartComponent = (props) => {
  var _a, _b, _c, _d;
  const {
    data,
    xAxisKey = "name",
    series: series2,
    colors = DEFAULT_COLORS2,
    curve = "monotone",
    dotSize = 4,
    showDots = true,
    strokeWidth = 2,
    width = "100%",
    height = 300,
    margin,
    showGrid = true,
    gridColor,
    showTooltip = true,
    showLegend = true,
    legendPosition = "bottom",
    theme = "light",
    tooltipFollowPointer = true,
    tooltipAnimation = true,
    showCrosshair = true,
    chartAnimation = true,
    className = "",
    style = {},
    xTickAngle = 0,
    xTickInterval = 0,
    yTickCount = 5,
    xTickFormatter
  } = props;
  const axes = resolveAxes(props, series2);
  const animCfg = resolveChartAnimation(chartAnimation, "line");
  const animKey = (0, import_react32.useMemo)(
    () => `${data.length}-${series2.map((s) => s.dataKey).join(",")}-${xAxisKey}-${curve}`,
    [data.length, series2, xAxisKey, curve]
  );
  const animProgress = useChartAnimationProgress(animCfg.enabled, animCfg.durationMs, animCfg.easing, animKey);
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const [tooltip, setTooltip] = (0, import_react32.useState)(null);
  const w = typeof width === "number" ? width : 400;
  const h2 = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : axes.hasRight && axes.showYAxis ? 48 : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h2 - m.top - m.bottom;
  const colorOf = (s, i) => {
    var _a2;
    return (_a2 = s.color) != null ? _a2 : colors[i % colors.length];
  };
  const xLabels = (0, import_react32.useMemo)(
    () => data.map((d, i) => {
      var _a2;
      return xTickFormatter ? xTickFormatter(d[xAxisKey], i) : String((_a2 = d[xAxisKey]) != null ? _a2 : "");
    }),
    [data, xAxisKey, xTickFormatter]
  );
  const leftSeries = axes.hasRight ? seriesOnSide(series2, "left") : series2;
  const rightSeries = axes.hasRight ? seriesOnSide(series2, "right") : [];
  const leftAxis = buildValueAxis(getValueExtent(data, leftSeries), [innerH, 0], axes.showYAxis, yTickCount);
  const rightAxis = axes.hasRight ? buildValueAxis(getValueExtent(data, rightSeries), [innerH, 0], axes.showYAxis, yTickCount) : leftAxis;
  const yScaleFor = (s) => s.yAxis === "right" && axes.hasRight ? rightAxis.scale : leftAxis.scale;
  const xScale = (i) => i / Math.max(1, data.length - 1) * innerW;
  const xPositions = data.map((_, i) => m.left + xScale(i));
  const paths = series2.map((s, si) => {
    var _a2;
    const ys = yScaleFor(s);
    const points = data.map((d, i) => ({ x: m.left + xScale(i), y: m.top + ys(num(d, s.dataKey)) }));
    return {
      key: s.dataKey,
      path: linePath(points, curve),
      points,
      color: colorOf(s, si),
      width: (_a2 = s.strokeWidth) != null ? _a2 : strokeWidth,
      dash: s.strokeDasharray
    };
  });
  const { valueFormatter, labelFormat } = axes;
  const handleMouseMove = (0, import_react32.useCallback)(
    (e) => {
      if (!showTooltip || data.length === 0)
        return;
      const rect = e.currentTarget.getBoundingClientRect();
      const scaleX = rect.width > 0 ? w / rect.width : 1;
      const x = (e.clientX - rect.left) * scaleX - m.left;
      const idx = Math.round(x / innerW * (data.length - 1));
      const clamped = Math.max(0, Math.min(idx, data.length - 1));
      const row2 = data[clamped];
      const items = series2.map((s, i) => {
        var _a2, _b2;
        const v = num(row2, s.dataKey);
        return {
          name: (_a2 = s.name) != null ? _a2 : s.dataKey,
          value: v,
          color: (_b2 = s.color) != null ? _b2 : colors[i % colors.length],
          displayValue: tooltipValue(valueFormatter, v, s.dataKey)
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: tooltipLabel(row2, clamped, xAxisKey, labelFormat),
        items,
        activeIndex: clamped
      });
    },
    [showTooltip, data, series2, xAxisKey, colors, innerW, m.left, w, valueFormatter, labelFormat]
  );
  const handleMouseLeave = (0, import_react32.useCallback)(() => setTooltip(null), []);
  const gridYs = axes.showYAxis ? leftAxis.ticks.map((t) => leftAxis.scale(t)) : [0.25, 0.5, 0.75].map((t) => innerH * t);
  const tickIdx = xTickIndices(xLabels, xTickInterval, innerW / Math.max(1, data.length - 1), xTickAngle);
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
    "div",
    {
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h2,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h2}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: [
                gridYs.map((gy) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("line", { x1: m.left, y1: m.top + gy, x2: m.left + innerW, y2: m.top + gy }, gy)),
                xLabels.slice(0, 6).map((_, i) => {
                  const idx = Math.floor(i / 5 * (data.length - 1));
                  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("line", { x1: m.left + xScale(idx), y1: m.top, x2: m.left + xScale(idx), y2: m.top + innerH }, i);
                })
              ] }),
              paths.map(({ key, path: pathD, points, color, width: sw, dash }) => /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("g", { children: [
                dash ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  "path",
                  {
                    d: pathD,
                    fill: "none",
                    stroke: color,
                    strokeWidth: sw,
                    strokeDasharray: dash,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    opacity: animProgress
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(AnimatedLineStroke, { pathD, progress: animProgress, color, strokeWidth: sw }),
                showDots && points.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  "circle",
                  {
                    cx: p.x,
                    cy: p.y,
                    r: dotSize,
                    fill: color,
                    stroke: themeColors.tooltipBg,
                    strokeWidth: 1,
                    opacity: Math.min(1, animProgress * 2.5)
                  },
                  i
                ))
              ] }, key)),
              showTooltip && showCrosshair && tooltip !== null && data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("g", { className: "ds-chart-crosshair", pointerEvents: "none", children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  "line",
                  {
                    x1: m.left + xScale(tooltip.activeIndex),
                    y1: m.top,
                    x2: m.left + xScale(tooltip.activeIndex),
                    y2: m.top + innerH,
                    stroke: themeColors.gridColor,
                    strokeWidth: 1,
                    strokeDasharray: "4 6",
                    opacity: 0.85
                  }
                ),
                series2.map((s, si) => {
                  const row2 = data[tooltip.activeIndex];
                  const cx = m.left + xScale(tooltip.activeIndex);
                  const cy = m.top + yScaleFor(s)(num(row2, s.dataKey));
                  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                    "circle",
                    {
                      cx,
                      cy,
                      r: dotSize + 3,
                      fill: colorOf(s, si),
                      stroke: themeColors.tooltipBg,
                      strokeWidth: 2,
                      opacity: 0.95
                    },
                    `hit-${s.dataKey}`
                  );
                })
              ] }),
              axes.showYAxis && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                YAxisLabels,
                {
                  ticks: leftAxis.ticks,
                  scale: (v) => m.top + leftAxis.scale(v),
                  x: m.left,
                  side: "left",
                  format: axes.leftTickFormat,
                  color: themeColors.axisText
                }
              ),
              axes.showYAxis && axes.hasRight && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                YAxisLabels,
                {
                  ticks: rightAxis.ticks,
                  scale: (v) => m.top + rightAxis.scale(v),
                  x: m.left + innerW,
                  side: "right",
                  format: axes.rightTickFormat,
                  color: themeColors.axisText
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                XAxisLabels,
                {
                  positions: xPositions,
                  labels: xLabels,
                  indices: tickIdx,
                  y: m.top + innerH + 16,
                  angle: xTickAngle,
                  color: themeColors.axisText
                }
              )
            ]
          }
        ),
        showTooltip && tooltip && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          ChartLegend,
          {
            position: legendPosition,
            textColor: themeColors.legendText,
            items: series2.map((s, i) => {
              var _a2;
              return { key: s.dataKey, label: (_a2 = s.name) != null ? _a2 : s.dataKey, color: colorOf(s, i), shape: "line" };
            })
          }
        )
      ]
    }
  );
};
var LineChart_default = import_react32.default.memo(LineChartComponent);

// src/components/charts/PieChart.tsx
var import_react33 = __toESM(require("react"));
var import_jsx_runtime32 = require("react/jsx-runtime");
var DEFAULT_COLORS3 = [
  "var(--button-primary-default-bg)",
  "var(--color-state-success)",
  "var(--color-state-warning)",
  "var(--color-state-error)",
  "var(--color-accent-lavender-40)",
  "var(--color-accent-sky-10)",
  "var(--color-accent-mint-10)",
  "var(--color-accent-amber-10)"
];
var PieChartComponent = ({
  data,
  innerRadius = 0,
  outerRadius = "80%",
  colors = DEFAULT_COLORS3,
  showLabels = false,
  showLabelLine = true,
  paddingAngle = 0,
  startAngle = 0,
  endAngle = 360,
  centerLabel,
  labelFormatter,
  labelPosition = "inside",
  valueFormatter,
  width = "100%",
  height = 300,
  margin = { top: 10, right: 10, left: 10, bottom: 10 },
  showTooltip = true,
  showLegend = true,
  legendPosition = "right",
  theme = "light",
  tooltipFollowPointer = true,
  tooltipAnimation = true,
  chartAnimation = true,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d;
  const animCfg = resolveChartAnimation(chartAnimation, "pie");
  const animKey = (0, import_react33.useMemo)(() => `${data.map((d) => d.value).join(",")}-${data.length}`, [data]);
  const animProgress = useChartAnimationProgress(
    animCfg.enabled,
    animCfg.durationMs,
    animCfg.easing,
    animKey
  );
  const scaleFactor = 0.08 + animProgress * 0.92;
  const themeColors = CHART_THEME_COLORS[theme];
  const containerRef = (0, import_react33.useRef)(null);
  const [hovered, setHovered] = (0, import_react33.useState)(null);
  const [tooltip, setTooltip] = (0, import_react33.useState)(null);
  const w = typeof width === "number" ? width : 400;
  const h2 = typeof height === "number" ? height : 300;
  const chartW = Math.max(200, typeof width === "number" ? width : 400);
  const chartH = Math.max(200, typeof height === "number" ? height : 300);
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : 10,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 10,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 10
  };
  const size = Math.min(chartW - m.left - m.right, chartH - m.top - m.bottom);
  const cx = chartW / 2;
  const cy = chartH / 2;
  const or = typeof outerRadius === "string" && outerRadius.endsWith("%") ? size / 2 * (parseFloat(outerRadius) / 100) : typeof outerRadius === "number" ? outerRadius : size / 2;
  const ir = typeof innerRadius === "string" && innerRadius.endsWith("%") ? size / 2 * (parseFloat(innerRadius) / 100) : typeof innerRadius === "number" ? innerRadius : 0;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const n = data.length;
  const sweep = Math.min(360, Math.abs(endAngle - startAngle)) || 360;
  const dir = endAngle < startAngle ? -1 : 1;
  const totalPaddingDeg = paddingAngle * Math.max(0, n - 1);
  const totalSliceDeg = Math.max(0, sweep - totalPaddingDeg);
  const colorAt = (i) => {
    var _a2, _b2;
    return (_b2 = (_a2 = data[i]) == null ? void 0 : _a2.color) != null ? _b2 : colors[i % colors.length];
  };
  let currentDeg = startAngle;
  const slices = data.map((d, i) => {
    const pct = d.value / total;
    const spanDeg = Math.max(0.5, pct * totalSliceDeg);
    const a = currentDeg;
    const b = currentDeg + dir * spanDeg;
    currentDeg = b + dir * (i < n - 1 ? paddingAngle : 0);
    return {
      ...d,
      startDeg: Math.min(a, b),
      endDeg: Math.max(a, b),
      color: colorAt(i)
    };
  });
  const labelText = (i) => {
    const d = data[i];
    const percent = d.value / total * 100;
    return labelFormatter ? labelFormatter({ name: d.name, value: d.value, percent, index: i }) : `${percent.toFixed(0)}%`;
  };
  const fmtValue = (v, name) => valueFormatter ? valueFormatter(v, name) : String(v);
  const handleSlicePointer = (0, import_react33.useCallback)(
    (e, i) => {
      var _a2, _b2;
      setHovered(i);
      if (!showTooltip || !containerRef.current)
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const slice = data[i];
      const pct = slice.value / total * 100;
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: `${slice.name} (${pct.toFixed(1)}%)`,
        items: [
          {
            name: "Value",
            value: slice.value,
            color: (_b2 = (_a2 = data[i]) == null ? void 0 : _a2.color) != null ? _b2 : colors[i % colors.length],
            displayValue: valueFormatter ? valueFormatter(slice.value, slice.name) : void 0
          }
        ]
      });
    },
    [showTooltip, data, colors, total, valueFormatter]
  );
  const handleMouseLeave = (0, import_react33.useCallback)(() => {
    setHovered(null);
    setTooltip(null);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
    "div",
    {
      ref: containerRef,
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h2,
        minWidth: 280,
        minHeight: 280,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: legendPosition === "left" || legendPosition === "right" ? "stretch" : "center",
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { style: { display: "flex", alignItems: "center", flex: 1, minHeight: 260, position: "relative" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
            "svg",
            {
              width: "100%",
              height: "100%",
              viewBox: `0 0 ${chartW} ${chartH}`,
              preserveAspectRatio: "xMidYMid meet",
              style: { overflow: "visible" },
              onMouseLeave: handleMouseLeave,
              children: /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("g", { transform: `translate(${cx} ${cy}) scale(${scaleFactor}) translate(${-cx} ${-cy})`, children: [
                slices.map((slice, i) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
                  "path",
                  {
                    d: arcPath(cx, cy, or, slice.startDeg, slice.endDeg, ir),
                    fill: slice.color,
                    stroke: themeColors.tooltipBg,
                    strokeWidth: 2,
                    opacity: hovered !== null && hovered !== i ? 0.5 : 1,
                    onMouseEnter: (e) => handleSlicePointer(e, i),
                    onMouseMove: (e) => handleSlicePointer(e, i),
                    style: { cursor: "pointer" },
                    children: !showTooltip && /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("title", { children: [
                      slice.name,
                      ": ",
                      fmtValue(slice.value, slice.name),
                      " (",
                      (slice.value / total * 100).toFixed(1),
                      "%)"
                    ] })
                  },
                  i
                )),
                showLabels && labelPosition === "inside" && slices.map((slice, i) => {
                  const midDeg = (slice.startDeg + slice.endDeg) / 2;
                  const labelR = ir + (or - ir) * 0.5;
                  const { x: lx, y: ly } = polarToCartesian(cx, cy, labelR, midDeg);
                  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
                    "text",
                    {
                      x: lx,
                      y: ly,
                      textAnchor: "middle",
                      dominantBaseline: "middle",
                      fontSize: 11,
                      fill: themeColors.tooltipText,
                      opacity: animProgress,
                      style: { pointerEvents: "none" },
                      children: labelText(i)
                    },
                    i
                  );
                }),
                showLabels && labelPosition === "outside" && slices.map((slice, i) => {
                  const midDeg = (slice.startDeg + slice.endDeg) / 2;
                  const p0 = polarToCartesian(cx, cy, or, midDeg);
                  const p1 = polarToCartesian(cx, cy, or + 10, midDeg);
                  const pt = polarToCartesian(cx, cy, or + 14, midDeg);
                  const norm = (midDeg % 360 + 360) % 360;
                  const anchor = norm > 5 && norm < 175 ? "start" : norm > 185 && norm < 355 ? "end" : "middle";
                  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("g", { opacity: animProgress, style: { pointerEvents: "none" }, children: [
                    showLabelLine && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("line", { x1: p0.x, y1: p0.y, x2: p1.x, y2: p1.y, stroke: slice.color, strokeWidth: 1 }),
                    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
                      "text",
                      {
                        x: pt.x,
                        y: pt.y,
                        textAnchor: anchor,
                        dominantBaseline: "middle",
                        fontSize: 11,
                        fill: themeColors.axisText,
                        children: labelText(i)
                      }
                    )
                  ] }, i);
                })
              ] })
            }
          ),
          centerLabel != null && centerLabel !== false && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
            "div",
            {
              className: "ds-chart-pie-center",
              style: {
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                pointerEvents: "none",
                color: themeColors.tooltipText
              },
              children: centerLabel
            }
          )
        ] }),
        showTooltip && tooltip && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: legendPosition === "left" ? "flex-start" : legendPosition === "right" ? "flex-end" : "center",
              marginTop: 8,
              fontSize: 12
            },
            children: data.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
                "span",
                {
                  style: {
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    background: colorAt(i)
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("span", { style: { color: themeColors.legendText }, children: [
                d.name,
                ": ",
                fmtValue(d.value, d.name)
              ] })
            ] }, d.name))
          }
        )
      ]
    }
  );
};
var PieChart_default = import_react33.default.memo(PieChartComponent);

// src/openui/components.tsx
var import_jsx_runtime33 = require("react/jsx-runtime");
var tone = import_v4.z.enum(["neutral", "primary", "success", "warning", "danger", "info"]);
var cell = import_v4.z.union([import_v4.z.string(), import_v4.z.number(), import_v4.z.null()]);
var row = import_v4.z.record(import_v4.z.string(), cell);
var series = import_v4.z.array(import_v4.z.object({ dataKey: import_v4.z.string(), name: import_v4.z.string().optional() }));
var StatCard3 = (0, import_react_lang.defineComponent)({
  name: "StatCard",
  description: "One KPI figure: label, formatted value, optional change vs a prior period.",
  props: import_v4.z.object({
    label: import_v4.z.string(),
    value: import_v4.z.string(),
    unit: import_v4.z.string().optional(),
    change: import_v4.z.string().optional(),
    trend: import_v4.z.enum(["up", "down", "neutral"]).optional(),
    changeLabel: import_v4.z.string().optional(),
    description: import_v4.z.string().optional()
  }),
  component: ({ props }) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
    StatCard_default,
    {
      label: props.label,
      value: props.value,
      unit: props.unit,
      description: props.description,
      delta: props.change ? { value: props.change, trend: props.trend, label: props.changeLabel } : void 0
    }
  )
});
var DataTable2 = (0, import_react_lang.defineComponent)({
  name: "DataTable",
  description: "A table of records. columns: key + header (align right for amounts); rows: objects keyed by column key.",
  props: import_v4.z.object({
    caption: import_v4.z.string(),
    columns: import_v4.z.array(
      import_v4.z.object({ key: import_v4.z.string(), header: import_v4.z.string(), align: import_v4.z.enum(["left", "center", "right"]).optional() })
    ),
    rows: import_v4.z.array(row)
  }),
  component: ({ props }) => {
    var _a, _b;
    const data = ((_a = props.rows) != null ? _a : []).map((r, i) => ({ ...r, __rowKey: String(i) }));
    const columns = ((_b = props.columns) != null ? _b : []).map((c) => ({ ...c, sortable: true }));
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(DataTable_default, { caption: props.caption, columns, data, rowKey: "__rowKey" });
  }
});
var BarChart = (0, import_react_lang.defineComponent)({
  name: "BarChart",
  description: "Compare values across categories. data: one object per category; xKey names the category field.",
  props: import_v4.z.object({
    data: import_v4.z.array(row),
    xKey: import_v4.z.string(),
    series,
    horizontal: import_v4.z.boolean().optional()
  }),
  component: ({ props }) => {
    var _a, _b, _c;
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
      BarChart_default,
      {
        data: toChartData(props.data),
        xAxisKey: props.xKey,
        series: (_a = props.series) != null ? _a : [],
        layout: props.horizontal ? "horizontal" : "vertical",
        height: 280,
        showLegend: ((_c = (_b = props.series) == null ? void 0 : _b.length) != null ? _c : 0) > 1
      }
    );
  }
});
var LineChart = (0, import_react_lang.defineComponent)({
  name: "LineChart",
  description: "A trend over time (periods on the x axis). data: one object per period; xKey names the period field.",
  props: import_v4.z.object({ data: import_v4.z.array(row), xKey: import_v4.z.string(), series }),
  component: ({ props }) => {
    var _a, _b, _c;
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
      LineChart_default,
      {
        data: toChartData(props.data),
        xAxisKey: props.xKey,
        series: (_a = props.series) != null ? _a : [],
        height: 280,
        showLegend: ((_c = (_b = props.series) == null ? void 0 : _b.length) != null ? _c : 0) > 1
      }
    );
  }
});
var PieChart = (0, import_react_lang.defineComponent)({
  name: "PieChart",
  description: "Share of a whole (few slices). data: name + numeric value per slice.",
  props: import_v4.z.object({ data: import_v4.z.array(import_v4.z.object({ name: import_v4.z.string(), value: import_v4.z.number() })), donut: import_v4.z.boolean().optional() }),
  component: ({ props }) => {
    var _a;
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(PieChart_default, { data: (_a = props.data) != null ? _a : [], innerRadius: props.donut ? "55%" : 0, height: 280, showLegend: true });
  }
});
var Alert3 = (0, import_react_lang.defineComponent)({
  name: "Alert",
  description: "A short status message: info, success, warning (needs attention) or danger (error / blocked).",
  props: import_v4.z.object({
    variant: import_v4.z.enum(["info", "success", "warning", "danger", "neutral"]),
    message: import_v4.z.string(),
    title: import_v4.z.string().optional()
  }),
  component: ({ props }) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Alert_default, { variant: props.variant, title: props.title, children: props.message })
});
var Badge3 = (0, import_react_lang.defineComponent)({
  name: "Badge",
  description: "A small status label, e.g. Open / Locked / Approved.",
  props: import_v4.z.object({ text: import_v4.z.string(), variant: tone.optional() }),
  component: ({ props }) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Badge_default, { variant: props.variant, children: props.text })
});
var ActionButton = (0, import_react_lang.defineComponent)({
  name: "ActionButton",
  description: "A button that sends `message` back to the assistant as the user's next request (e.g. 'Drill into entity E100').",
  props: import_v4.z.object({
    label: import_v4.z.string(),
    message: import_v4.z.string(),
    variant: import_v4.z.enum(["primary", "secondary", "outlineSecondary"]).optional()
  }),
  component: function ActionButtonRenderer({ props }) {
    var _a;
    const trigger = (0, import_react_lang.useTriggerAction)();
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Button_default, { type: "button", size: "sm", variant: (_a = props.variant) != null ? _a : "outlineSecondary", onClick: () => trigger(props.message), children: props.label });
  }
});
var leaves = [StatCard3, DataTable2, BarChart, LineChart, PieChart, Alert3, Badge3, ActionButton];
var leafRef = import_v4.z.union(leaves.map((c) => c.ref));
var Card3 = (0, import_react_lang.defineComponent)({
  name: "Card",
  description: "A titled panel grouping related content (a KPI set, a table, a chart and its note).",
  props: import_v4.z.object({ children: import_v4.z.array(leafRef), title: import_v4.z.string().optional(), subtitle: import_v4.z.string().optional() }),
  component: ({ props, renderNode }) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Card_default, { title: props.title, subtitle: props.subtitle, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-3)" }, children: renderChildren(props.children, renderNode) }) })
});
var panelRef = import_v4.z.union([...leaves.map((c) => c.ref), Card3.ref]);
var Grid2 = (0, import_react_lang.defineComponent)({
  name: "Grid",
  description: "Side-by-side layout: `columns` equal columns (2\u20134), e.g. a row of StatCards.",
  props: import_v4.z.object({ columns: import_v4.z.number().int().min(1).max(4), children: import_v4.z.array(panelRef) }),
  component: ({ props, renderNode }) => {
    var _a;
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(Grid, { columns: (_a = props.columns) != null ? _a : 2, gap: "var(--space-4)", children: renderChildren(props.children, renderNode) });
  }
});
var Stack = (0, import_react_lang.defineComponent)({
  name: "Stack",
  description: "The answer's root: its children top to bottom.",
  props: import_v4.z.object({
    children: import_v4.z.array(import_v4.z.union([...leaves.map((c) => c.ref), Card3.ref, Grid2.ref]))
  }),
  component: ({ props, renderNode }) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-4)", minWidth: 0 }, children: renderChildren(props.children, renderNode) })
});
function renderChildren(children, renderNode) {
  if (!Array.isArray(children))
    return renderNode(children);
  return children.map((child, i) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(import_react34.default.Fragment, { children: renderNode(child) }, i));
}
function toChartData(rows) {
  return (rows != null ? rows : []).map((r) => {
    const out = {};
    for (const [k, v] of Object.entries(r)) {
      if (v == null)
        continue;
      const n = typeof v === "string" ? Number(v.replace(/,/g, "")) : v;
      out[k] = typeof v === "string" && Number.isNaN(n) ? v : n;
    }
    return out;
  });
}
var openuiComponents = { Stack, Grid: Grid2, Card: Card3, ...Object.fromEntries(leaves.map((c) => [c.name, c])) };

// src/entries/openui.ts
var designSystemLibrary = (0, import_react_lang2.createLibrary)({
  id: "ui-common-components",
  root: "Stack",
  components: [Stack, Grid2, Card3, StatCard3, DataTable2, BarChart, LineChart, PieChart, Alert3, Badge3, ActionButton],
  componentGroups: [
    { name: "Layout", components: ["Stack", "Grid", "Card"], notes: ["Stack is the root. Grid for side-by-side KPIs or charts."] },
    { name: "Figures", components: ["StatCard", "DataTable"] },
    { name: "Charts", components: ["BarChart", "LineChart", "PieChart"] },
    { name: "Status & actions", components: ["Alert", "Badge", "ActionButton"] }
  ]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionButton,
  Alert,
  Badge,
  BarChart,
  Card,
  DataTable,
  Grid,
  LineChart,
  PieChart,
  Renderer,
  Stack,
  StatCard,
  designSystemLibrary,
  openuiComponents
});
//# sourceMappingURL=openui.js.map