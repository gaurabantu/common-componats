/* ucs:component-css */
import "./styles/components/molecules/Card/Card.css";
// src/components/molecules/Card/index.tsx
import React, {
  createContext,
  forwardRef,
  useContext,
  useMemo
} from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var CardContext = createContext(null);
function useCardContext(component) {
  const ctx = useContext(CardContext);
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
  return React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child))
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
  const [isHovered, setIsHovered] = React.useState(false);
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
  const ctxValue = useMemo(
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
  const mainColumn = /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0
      },
      children: [
        cover && /* @__PURE__ */ jsx("div", { children: cover }),
        (title || subtitle || extra) && /* @__PURE__ */ jsxs(
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
              /* @__PURE__ */ jsxs("div", { style: { minWidth: 0 }, children: [
                title && /* @__PURE__ */ jsx(
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
                subtitle && /* @__PURE__ */ jsx(
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
              extra && /* @__PURE__ */ jsx("div", { style: { flexShrink: 0 }, children: extra })
            ]
          }
        ),
        children && /* @__PURE__ */ jsx(
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
        actions && /* @__PURE__ */ jsx("div", { style: actionsStyle, children: actions }),
        footer && /* @__PURE__ */ jsx(
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
  const inner = compound ? /* @__PURE__ */ jsx(CardContext.Provider, { value: ctxValue, children: /* @__PURE__ */ jsx("div", { className: "card-inner--compound", children }) }) : mainColumn;
  return /* @__PURE__ */ jsxs(
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
        showIndicator && /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx("div", { ref, className: cls("card-header", className), ...rest });
});
CardHeader.displayName = "CardHeader";
var CardTitle = forwardRef(function CardTitle2({ as: Comp = "h3", className, ...rest }, ref) {
  useCardContext("CardTitle");
  return /* @__PURE__ */ jsx(Comp, { ref, className: cls("card-title", className), ...rest });
});
CardTitle.displayName = "CardTitle";
var CardDescription = forwardRef(
  function CardDescription2({ as: Comp = "p", className, ...rest }, ref) {
    useCardContext("CardDescription");
    return /* @__PURE__ */ jsx(Comp, { ref, className: cls("card-description", className), ...rest });
  }
);
CardDescription.displayName = "CardDescription";
var CardAction = forwardRef(function CardAction2({ className, ...rest }, ref) {
  useCardContext("CardAction");
  return /* @__PURE__ */ jsx("div", { ref, className: cls("card-action", className), ...rest });
});
CardAction.displayName = "CardAction";
var CardContent = forwardRef(function CardContent2({ className, noPadding, ...rest }, ref) {
  useCardContext("CardContent");
  return /* @__PURE__ */ jsx(
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
var CardFooter = forwardRef(function CardFooter2({ className, borderTop = true, ...rest }, ref) {
  useCardContext("CardFooter");
  return /* @__PURE__ */ jsx(
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

export {
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  Card_default
};
//# sourceMappingURL=chunk-KTZ2QCMF.mjs.map