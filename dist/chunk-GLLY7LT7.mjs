import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "./chunk-HACL7N2G.mjs";
import {
  Checkbox_default,
  FORM_FIELD_CONSUMER_KEY,
  Select_default,
  Table_default,
  TextView_default,
  useFormField
} from "./chunk-ZKSRRLCO.mjs";
import {
  Button_default,
  TextInputSearch_default
} from "./chunk-EHTTS7LB.mjs";

// src/components/atoms/Badge/index.tsx
import React, { useCallback } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function DismissIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: "ds-badge__dismiss-icon",
      viewBox: "0 0 16 16",
      width: 16,
      height: 16,
      "aria-hidden": true,
      focusable: "false",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 1 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06Z"
        }
      )
    }
  );
}
var Badge = React.memo(function Badge2({
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
  const handleDismiss = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDismiss == null ? void 0 : onDismiss();
    },
    [onDismiss]
  );
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: cls("ds-badge", className),
      "data-variant": variant,
      "data-tone": tone,
      "data-shape": shape,
      "data-size": size,
      "data-elevated": elevated ? "true" : void 0,
      onClick,
      ...rest,
      children: [
        dot ? /* @__PURE__ */ jsx("span", { className: "ds-badge__dot", "aria-hidden": true }) : null,
        icon ? /* @__PURE__ */ jsx("span", { className: "ds-badge__icon", children: icon }) : null,
        /* @__PURE__ */ jsx("span", { className: "ds-badge__label", children }),
        onDismiss ? /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "ds-badge__dismiss",
            "aria-label": dismissLabel,
            onClick: handleDismiss,
            children: /* @__PURE__ */ jsx(DismissIcon, {})
          }
        ) : null
      ]
    }
  );
});
var Badge_default = Badge;
var Chip = Badge;
var Tag = Badge;

// src/components/molecules/Grid/index.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx2(
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
  return /* @__PURE__ */ jsx2(
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

// src/components/molecules/Card/index.tsx
import React2, {
  createContext,
  forwardRef,
  useContext,
  useMemo
} from "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var CardContext = createContext(null);
function useCardContext(component) {
  const ctx = useContext(CardContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Card>`);
  }
  return ctx;
}
function cls2(...parts) {
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
  return React2.Children.toArray(children).some((child) => {
    if (!React2.isValidElement(child))
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
  const [isHovered, setIsHovered] = React2.useState(false);
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
  const mainColumn = /* @__PURE__ */ jsxs2(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0
      },
      children: [
        cover && /* @__PURE__ */ jsx3("div", { children: cover }),
        (title || subtitle || extra) && /* @__PURE__ */ jsxs2(
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
              /* @__PURE__ */ jsxs2("div", { style: { minWidth: 0 }, children: [
                title && /* @__PURE__ */ jsx3(
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
                subtitle && /* @__PURE__ */ jsx3(
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
              extra && /* @__PURE__ */ jsx3("div", { style: { flexShrink: 0 }, children: extra })
            ]
          }
        ),
        children && /* @__PURE__ */ jsx3(
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
        actions && /* @__PURE__ */ jsx3("div", { style: actionsStyle, children: actions }),
        footer && /* @__PURE__ */ jsx3(
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
  const inner = compound ? /* @__PURE__ */ jsx3(CardContext.Provider, { value: ctxValue, children: /* @__PURE__ */ jsx3("div", { className: "card-inner--compound", children }) }) : mainColumn;
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      ref,
      ...rest,
      style: outerStyle,
      className: cls2(
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
        showIndicator && /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsx3("div", { ref, className: cls2("card-header", className), ...rest });
});
CardHeader.displayName = "CardHeader";
var CardTitle = forwardRef(function CardTitle2({ as: Comp = "h3", className, ...rest }, ref) {
  useCardContext("CardTitle");
  return /* @__PURE__ */ jsx3(Comp, { ref, className: cls2("card-title", className), ...rest });
});
CardTitle.displayName = "CardTitle";
var CardDescription = forwardRef(
  function CardDescription2({ as: Comp = "p", className, ...rest }, ref) {
    useCardContext("CardDescription");
    return /* @__PURE__ */ jsx3(Comp, { ref, className: cls2("card-description", className), ...rest });
  }
);
CardDescription.displayName = "CardDescription";
var CardAction = forwardRef(function CardAction2({ className, ...rest }, ref) {
  useCardContext("CardAction");
  return /* @__PURE__ */ jsx3("div", { ref, className: cls2("card-action", className), ...rest });
});
CardAction.displayName = "CardAction";
var CardContent = forwardRef(function CardContent2({ className, noPadding, ...rest }, ref) {
  useCardContext("CardContent");
  return /* @__PURE__ */ jsx3(
    "div",
    {
      ref,
      className: cls2(
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
  return /* @__PURE__ */ jsx3(
    "div",
    {
      ref,
      className: cls2(
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

// src/components/molecules/FeedbackStates/EmptyState.tsx
import { useId } from "react";

// src/components/molecules/FeedbackStates/feedbackState.classes.ts
function feedbackCls(...chunks) {
  return chunks.filter(Boolean).join(" ");
}

// src/components/molecules/FeedbackStates/EmptyState.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
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
  const titleId = useId();
  const descId = useId();
  return /* @__PURE__ */ jsxs3(
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
        image ? /* @__PURE__ */ jsx4("div", { className: "ds-feedback-image", children: image }) : null,
        icon ? /* @__PURE__ */ jsx4(
          "span",
          {
            className: "ds-feedback-icon",
            "aria-hidden": iconLabel ? void 0 : "true",
            "aria-label": iconLabel,
            role: iconLabel ? "img" : void 0,
            children: icon
          }
        ) : null,
        /* @__PURE__ */ jsx4(TextView_default, { as: "h3", variant: "h4", id: titleId, children: title }),
        description ? /* @__PURE__ */ jsx4(TextView_default, { as: "p", variant: "body", color: "secondary", id: descId, children: description }) : null,
        action ? /* @__PURE__ */ jsx4("div", { className: "ds-feedback-actions", children: action }) : null,
        extra ? /* @__PURE__ */ jsx4("div", { className: "ds-feedback-extra", children: extra }) : null
      ]
    }
  );
}

// src/components/molecules/FeedbackStates/ErrorState.tsx
import { useId as useId2 } from "react";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function DefaultErrorIcon({ tone }) {
  if (tone === "warning") {
    return /* @__PURE__ */ jsxs4("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ jsx5("path", { d: "M12 2L2 20h20L12 2z", stroke: "currentColor", strokeWidth: "1.75", strokeLinejoin: "round" }),
      /* @__PURE__ */ jsx5("path", { d: "M12 9v5M12 16.5v.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
    ] });
  }
  if (tone === "info") {
    return /* @__PURE__ */ jsxs4("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
      /* @__PURE__ */ jsx5("path", { d: "M12 8v.5M12 11v5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
    ] });
  }
  if (tone === "success") {
    return /* @__PURE__ */ jsxs4("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
      /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
      /* @__PURE__ */ jsx5("path", { d: "M8 12l3 3 5-5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
    ] });
  }
  return /* @__PURE__ */ jsxs4("svg", { "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "ds-feedback-status-icon", children: [
    /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
    /* @__PURE__ */ jsx5("path", { d: "M12 8v5M12 15.5v.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
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
  const titleId = useId2();
  const descId = useId2();
  const detailBody = details == null ? null : typeof details === "string" || typeof details === "number" || typeof details === "boolean" ? /* @__PURE__ */ jsx5("pre", { className: "ds-feedback-detail", children: String(details) }) : details instanceof Error ? /* @__PURE__ */ jsx5("pre", { className: "ds-feedback-detail", children: details.message }) : /* @__PURE__ */ jsx5("div", { className: "ds-feedback-detail", children: details });
  const resolvedIcon = !hideIcon ? icon != null ? icon : /* @__PURE__ */ jsx5(DefaultErrorIcon, { tone }) : null;
  return /* @__PURE__ */ jsxs4(
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
        image ? /* @__PURE__ */ jsx5("div", { className: "ds-feedback-image", children: image }) : null,
        resolvedIcon ? /* @__PURE__ */ jsx5("span", { className: "ds-feedback-icon ds-feedback-icon--status", children: resolvedIcon }) : null,
        /* @__PURE__ */ jsx5(TextView_default, { as: "h3", variant: "h4", id: titleId, children: title }),
        /* @__PURE__ */ jsx5(TextView_default, { as: "p", variant: "body", color: "secondary", id: descId, children: description }),
        detailBody,
        onRetry ? /* @__PURE__ */ jsx5("div", { className: "ds-feedback-actions", children: /* @__PURE__ */ jsx5(Button_default, { variant: "outlinePrimary", type: "button", onClick: () => onRetry(), size: compact ? "sm" : "md", children: retryLabel }) }) : null,
        extra ? /* @__PURE__ */ jsx5("div", { className: "ds-feedback-extra", children: extra }) : null
      ]
    }
  );
}

// src/components/molecules/FeedbackStates/OfflineBanner.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var DefaultOfflineIcon = () => /* @__PURE__ */ jsx6(
  "svg",
  {
    "aria-hidden": "true",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    className: "ds-offline-banner__icon",
    children: /* @__PURE__ */ jsx6(
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
  const showLeadingIcon = leadingIcon !== void 0 ? leadingIcon : /* @__PURE__ */ jsx6(DefaultOfflineIcon, {});
  if (image) {
    return /* @__PURE__ */ jsxs5(
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
          /* @__PURE__ */ jsx6("div", { className: "ds-feedback-image", children: image }),
          /* @__PURE__ */ jsx6(TextView_default, { as: "p", variant: "body", children: /* @__PURE__ */ jsx6("strong", { children: headline }) }),
          message ? /* @__PURE__ */ jsx6(TextView_default, { as: "p", variant: "small", color: "secondary", children: message }) : null,
          onRetry || onDismiss ? /* @__PURE__ */ jsxs5("div", { className: "ds-feedback-actions", children: [
            onRetry ? /* @__PURE__ */ jsx6(Button_default, { variant: "outlinePrimary", type: "button", size: "md", onClick: () => onRetry == null ? void 0 : onRetry(), children: actionLabel }) : null,
            onDismiss ? /* @__PURE__ */ jsx6(Button_default, { variant: "ghost", type: "button", size: "md", onClick: () => onDismiss == null ? void 0 : onDismiss(), children: dismissLabel }) : null
          ] }) : null
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs5(
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
        showLeadingIcon ? /* @__PURE__ */ jsx6("span", { className: "ds-offline-banner__icon-wrap", children: showLeadingIcon }) : null,
        /* @__PURE__ */ jsxs5("div", { className: "ds-offline-banner__body", children: [
          /* @__PURE__ */ jsx6(TextView_default, { as: "p", variant: "body", children: /* @__PURE__ */ jsx6("strong", { children: headline }) }),
          message ? /* @__PURE__ */ jsx6(TextView_default, { as: "p", variant: "small", color: "secondary", children: message }) : null
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "ds-offline-banner__actions", children: [
          onRetry ? /* @__PURE__ */ jsx6(Button_default, { variant: "outlineSecondary", type: "button", size: "sm", onClick: () => onRetry == null ? void 0 : onRetry(), children: actionLabel }) : null,
          onDismiss ? /* @__PURE__ */ jsx6(
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
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function FeedbackState(props) {
  if (props.variant === "empty") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx7(EmptyState, { ...rest });
  }
  if (props.variant === "success") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx7(
      EmptyState,
      {
        tone: "success",
        icon: /* @__PURE__ */ jsxs6("svg", { "aria-hidden": "true", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", style: { color: "var(--color-success-strong)" }, children: [
          /* @__PURE__ */ jsx7("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
          /* @__PURE__ */ jsx7("path", { d: "M8 12l3 3 5-5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
        ] }),
        ...rest
      }
    );
  }
  if (props.variant === "info") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx7(
      EmptyState,
      {
        tone: "info",
        icon: /* @__PURE__ */ jsxs6("svg", { "aria-hidden": "true", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", style: { color: "var(--color-info-strong)" }, children: [
          /* @__PURE__ */ jsx7("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.75" }),
          /* @__PURE__ */ jsx7("path", { d: "M12 8v.5M12 11v5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
        ] }),
        ...rest
      }
    );
  }
  if (props.variant === "error") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx7(ErrorState, { ...rest });
  }
  if (props.variant === "offline") {
    const { variant: _omit, ...rest } = props;
    return /* @__PURE__ */ jsx7(OfflineBanner, { ...rest });
  }
  const _exhaustive = props;
  return _exhaustive;
}

// src/components/molecules/FeedbackStates/FeedbackStates.animations.tsx
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function NoDataAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs7(
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
        /* @__PURE__ */ jsx8("style", { children: `
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
        /* @__PURE__ */ jsx8("ellipse", { cx: "60", cy: "108", rx: "28", ry: "5", fill: "currentColor", opacity: "0.08" }),
        /* @__PURE__ */ jsxs7("g", { className: "fb-tray-group", children: [
          /* @__PURE__ */ jsx8("rect", { x: "18", y: "50", width: "84", height: "48", rx: "10", fill: "var(--color-fill-muted)", stroke: "var(--color-border-subtle)", strokeWidth: "2.5" }),
          /* @__PURE__ */ jsx8("path", { d: "M18 72 Q18 50 60 50 Q102 50 102 72", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", fill: "none" }),
          /* @__PURE__ */ jsx8("path", { d: "M60 34 L60 56M53 49 L60 56 L67 49", stroke: "var(--color-text-secondary)", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ jsx8("line", { x1: "32", y1: "78", x2: "62", y2: "78", className: "fb-line-1", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx8("line", { x1: "32", y1: "86", x2: "54", y2: "86", className: "fb-line-2", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx8("line", { x1: "32", y1: "94", x2: "48", y2: "94", className: "fb-line-3", stroke: "var(--color-border-subtle)", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx8("circle", { cx: "82", cy: "78", r: "3", fill: "var(--color-border-subtle)", className: "fb-dot-1" }),
          /* @__PURE__ */ jsx8("circle", { cx: "91", cy: "78", r: "3", fill: "var(--color-border-subtle)", className: "fb-dot-2" }),
          /* @__PURE__ */ jsx8("circle", { cx: "100", cy: "78", r: "3", fill: "var(--color-border-subtle)", className: "fb-dot-3" })
        ] })
      ]
    }
  );
}
function NoSearchResultsAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs7(
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
        /* @__PURE__ */ jsx8("style", { children: `
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
        /* @__PURE__ */ jsx8("ellipse", { cx: "60", cy: "110", rx: "24", ry: "4", fill: "currentColor", opacity: "0.07" }),
        /* @__PURE__ */ jsxs7("g", { className: "fb-lens", children: [
          /* @__PURE__ */ jsx8("circle", { cx: "52", cy: "52", r: "26", fill: "var(--color-fill-muted)", stroke: "var(--color-border-subtle)", strokeWidth: "3" }),
          /* @__PURE__ */ jsx8("line", { x1: "70", y1: "70", x2: "94", y2: "94", stroke: "var(--color-border-subtle)", strokeWidth: "5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsxs7("g", { className: "fb-x-mark", children: [
            /* @__PURE__ */ jsx8("line", { x1: "43", y1: "43", x2: "61", y2: "61", stroke: "var(--color-danger-strong)", strokeWidth: "3", strokeLinecap: "round" }),
            /* @__PURE__ */ jsx8("line", { x1: "61", y1: "43", x2: "43", y2: "61", stroke: "var(--color-danger-strong)", strokeWidth: "3", strokeLinecap: "round" })
          ] })
        ] })
      ]
    }
  );
}
function ErrorAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs7(
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
        /* @__PURE__ */ jsx8("style", { children: `
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
        /* @__PURE__ */ jsx8(
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
        /* @__PURE__ */ jsxs7("g", { className: "fb-shield-g", children: [
          /* @__PURE__ */ jsx8(
            "path",
            {
              d: "M60 18 L92 32 L92 62 Q92 84 60 100 Q28 84 28 62 L28 32 Z",
              fill: "var(--color-danger-fill)",
              stroke: "var(--color-danger-strong)",
              strokeWidth: "2.5",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx8("line", { x1: "60", y1: "44", x2: "60", y2: "65", stroke: "var(--color-danger-strong)", strokeWidth: "4", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx8("circle", { cx: "60", cy: "75", r: "3", fill: "var(--color-danger-strong)" })
        ] })
      ]
    }
  );
}
function OfflineAnimation({ size = 120, className, "aria-hidden": ariaHidden = "true" }) {
  return /* @__PURE__ */ jsxs7(
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
        /* @__PURE__ */ jsx8("style", { children: `
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
        /* @__PURE__ */ jsx8(
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
        /* @__PURE__ */ jsx8(
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
        /* @__PURE__ */ jsx8(
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
        /* @__PURE__ */ jsx8("circle", { className: "fb-wifi-dot", cx: "60", cy: "92", r: "4.5", fill: "var(--color-border-subtle)" }),
        /* @__PURE__ */ jsx8(
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
  return /* @__PURE__ */ jsxs7(
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
        /* @__PURE__ */ jsx8("style", { children: `
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
        /* @__PURE__ */ jsxs7("g", { className: "fb-success-g", children: [
          /* @__PURE__ */ jsx8("circle", { cx: "60", cy: "60", r: "34", fill: "var(--color-success-fill)" }),
          /* @__PURE__ */ jsx8(
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
          /* @__PURE__ */ jsx8(
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
  return /* @__PURE__ */ jsxs7(
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
        /* @__PURE__ */ jsx8("style", { children: `
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
        /* @__PURE__ */ jsxs7("g", { className: "fb-info-g", children: [
          /* @__PURE__ */ jsx8("circle", { cx: "60", cy: "60", r: "34", fill: "var(--color-info-fill)", stroke: "var(--color-info-strong)", strokeWidth: "2.5" }),
          /* @__PURE__ */ jsx8(
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
          /* @__PURE__ */ jsx8("circle", { cx: "60", cy: "43", r: "3.5", fill: "var(--color-info-strong)", className: "fb-i-dot" })
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
import React5, { useCallback as useCallback2, useEffect, useId as useId3, useLayoutEffect, useMemo as useMemo2, useRef, useState } from "react";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function cls3(...parts) {
  return parts.filter(Boolean).join(" ");
}
function flattenOptions(options, groups) {
  if (groups == null ? void 0 : groups.length)
    return groups.flatMap((g) => g.options);
  return options != null ? options : [];
}
function ChevronDown() {
  return /* @__PURE__ */ jsx9("svg", { className: "ds-combobox__chevron", viewBox: "0 0 20 20", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx9("path", { d: "M5 7.5L10 12.5L15 7.5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
var Combobox = React5.memo(function Combobox2({
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
  const triggerRef = useRef(null);
  const fieldControlId = field == null ? void 0 : field.id;
  useLayoutEffect(() => {
    const el = triggerRef.current;
    if (!el || !fieldControlId)
      return;
    const original = el.id;
    el.id = fieldControlId;
    return () => {
      el.id = original;
    };
  }, [fieldControlId]);
  const reactId = useId3();
  const base = reactId.replace(/:/g, "");
  const listboxId = `ds-combobox-lb-${base}`;
  const searchId = `ds-combobox-search-${base}`;
  const labelId = `ds-combobox-lbl-${base}`;
  const isControlled = valueProp !== void 0;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (!open)
      setSearch("");
  }, [open]);
  const [innerValue, setInnerValue] = useState(() => {
    if (defaultValue !== void 0)
      return defaultValue;
    return multiple ? [] : "";
  });
  const selected = isControlled ? valueProp : innerValue;
  const allOptions = useMemo2(() => flattenOptions(options, groups), [options, groups]);
  const useGroups = Boolean(groups == null ? void 0 : groups.length);
  const filteredFlat = useMemo2(() => {
    const base2 = options != null ? options : [];
    const q = search.trim().toLowerCase();
    if (!searchable || !q)
      return base2;
    return base2.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, search, searchable]);
  const filteredGroups = useMemo2(() => {
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
  const setValue = useCallback2(
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
  const displayTrigger = useMemo2(() => {
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
  const sizeStyles = useMemo2(() => {
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
    return /* @__PURE__ */ jsxs8(
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
          opt.icon ? /* @__PURE__ */ jsx9("span", { className: "ds-combobox__option-icon", children: opt.icon }) : null,
          /* @__PURE__ */ jsx9("span", { className: "ds-combobox__option-label", children: opt.label }),
          multiple && sel ? /* @__PURE__ */ jsx9("svg", { className: "ds-combobox__check", viewBox: "0 0 16 16", "aria-hidden": true, children: /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsxs8(
    "div",
    {
      ...rest,
      id: field && idProp === field.id ? void 0 : idProp,
      className: cls3("ds-combobox", className),
      style: {
        width: fullWidth ? "100%" : "auto",
        display: fullWidth ? "block" : "inline-block",
        ...style
      },
      "data-open": open ? "true" : "false",
      "data-disabled": disabled ? "true" : "false",
      "data-status": resolvedStatus,
      children: [
        /* @__PURE__ */ jsxs8(Popover, { open, onOpenChange: setOpen, placement: "bottom-start", children: [
          label ? /* @__PURE__ */ jsx9("div", { id: labelId, className: "ds-combobox__label", children: label }) : null,
          /* @__PURE__ */ jsxs8(
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
                /* @__PURE__ */ jsxs8("span", { className: "ds-combobox__trigger-inner", children: [
                  displayTrigger.icon ? /* @__PURE__ */ jsx9("span", { className: "ds-combobox__trigger-icon", children: displayTrigger.icon }) : null,
                  /* @__PURE__ */ jsx9(
                    "span",
                    {
                      className: cls3(
                        "ds-combobox__trigger-label",
                        displayTrigger.placeholder && "ds-combobox__trigger-label--placeholder"
                      ),
                      children: displayTrigger.text
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx9(ChevronDown, {})
              ]
            }
          ),
          /* @__PURE__ */ jsx9(
            PopoverContent,
            {
              role: "none",
              showPointer: false,
              className: "ds-combobox__popover",
              style: listMinWidth != null ? { minWidth: listMinWidth } : void 0,
              children: /* @__PURE__ */ jsxs8("div", { className: "ds-combobox__panel", children: [
                searchable ? /* @__PURE__ */ jsx9(
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
                !hasList ? /* @__PURE__ */ jsx9("div", { className: "ds-combobox__empty", role: "status", children: "No results" }) : useGroups && filteredGroups ? /* @__PURE__ */ jsx9(
                  "div",
                  {
                    id: listboxId,
                    className: "ds-combobox__listbox",
                    role: "listbox",
                    "aria-multiselectable": multiple,
                    "aria-label": label != null ? label : "Options",
                    children: filteredGroups.map((g) => /* @__PURE__ */ jsxs8(React5.Fragment, { children: [
                      /* @__PURE__ */ jsx9("div", { className: "ds-combobox__group-label", role: "presentation", children: g.label }),
                      g.options.map((opt) => renderOptionRow(opt))
                    ] }, g.label))
                  }
                ) : /* @__PURE__ */ jsx9(
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
        helperMessage ? /* @__PURE__ */ jsx9("p", { className: "ds-combobox__helper", role: error ? "alert" : void 0, children: helperMessage }) : null
      ]
    }
  );
});
Combobox.displayName = "Combobox";
Combobox[FORM_FIELD_CONSUMER_KEY] = true;
var Combobox_default = Combobox;

// src/components/atoms/IconBox/index.tsx
import React6 from "react";

// src/components/atoms/IconBox/IconBox.config.ts
var ICON_BOX_DEFAULTS = {
  tone: "neutral",
  size: "md",
  shape: "rounded"
};

// src/components/atoms/IconBox/index.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var IconBox = React6.memo(function IconBox2({
  children,
  tone = ICON_BOX_DEFAULTS.tone,
  size = ICON_BOX_DEFAULTS.size,
  shape = ICON_BOX_DEFAULTS.shape,
  label,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsx10(
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

// src/components/molecules/StatCard/index.tsx
import React7 from "react";

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
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
function TrendArrow({ trend }) {
  if (trend === "neutral") {
    return /* @__PURE__ */ jsx11("svg", { viewBox: "0 0 12 12", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx11("path", { d: "M2 6h8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
  }
  return /* @__PURE__ */ jsx11("svg", { viewBox: "0 0 12 12", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx11(
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
var StatCard = React7.forwardRef(function StatCard2({
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
  return /* @__PURE__ */ jsx11(Card_default, { ref, size, ...cardProps, children: /* @__PURE__ */ jsxs9("div", { className: "ds-stat", "data-size": size, children: [
    /* @__PURE__ */ jsxs9("div", { className: "ds-stat__top", children: [
      /* @__PURE__ */ jsx11("p", { className: "ds-stat__label", children: label }),
      icon ? /* @__PURE__ */ jsx11(IconBox_default, { tone: iconTone, size: size === "sm" ? "sm" : "md", children: icon }) : null
    ] }),
    /* @__PURE__ */ jsxs9("p", { className: "ds-stat__value", children: [
      value,
      unit ? /* @__PURE__ */ jsx11("span", { className: "ds-stat__unit", children: unit }) : null
    ] }),
    delta ? /* @__PURE__ */ jsxs9("span", { className: "ds-stat__delta", children: [
      /* @__PURE__ */ jsxs9("span", { className: "ds-stat__delta-value", "data-tone": deltaTone, children: [
        /* @__PURE__ */ jsx11(TrendArrow, { trend }),
        /* @__PURE__ */ jsxs9("span", { className: "ds-stat__sr", children: [
          STAT_TREND_LABEL[trend],
          " "
        ] }),
        delta.value
      ] }),
      delta.label ? /* @__PURE__ */ jsx11("span", { children: delta.label }) : null
    ] }) : null,
    description ? /* @__PURE__ */ jsx11("p", { className: "ds-stat__description", children: description }) : null,
    footer ? /* @__PURE__ */ jsx11("div", { className: "ds-stat__footer", children: footer }) : null
  ] }) });
});
StatCard.displayName = "StatCard";
var StatCard_default = StatCard;

// src/components/molecules/Alert/index.tsx
import React9 from "react";

// src/components/molecules/Alert/Alert.config.ts
import React8 from "react";
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
var h = React8.createElement;
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
import { jsx as jsx12, jsxs as jsxs10 } from "react/jsx-runtime";
var Alert = React9.forwardRef(function Alert2({
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
  const prefix = srPrefix ? /* @__PURE__ */ jsxs10("span", { className: "ds-alert__sr", children: [
    ALERT_SR_PREFIX[variant],
    " "
  ] }) : null;
  const hasTitle = title !== void 0 && title !== null && title !== false;
  return /* @__PURE__ */ jsxs10(
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
        hideIcon ? null : /* @__PURE__ */ jsx12("span", { className: "ds-alert__icon", "aria-hidden": "true", children: icon != null ? icon : getAlertIcon(variant) }),
        /* @__PURE__ */ jsxs10("div", { className: "ds-alert__body", children: [
          hasTitle ? /* @__PURE__ */ jsxs10("p", { className: "ds-alert__title", children: [
            prefix,
            title
          ] }) : null,
          children ? /* @__PURE__ */ jsxs10("div", { className: "ds-alert__description", children: [
            hasTitle ? null : prefix,
            children
          ] }) : null
        ] }),
        action || onDismiss ? /* @__PURE__ */ jsxs10("div", { className: "ds-alert__actions", children: [
          action ? /* @__PURE__ */ jsx12("div", { className: "ds-alert__action", children: action }) : null,
          onDismiss ? /* @__PURE__ */ jsx12("button", { type: "button", className: "ds-alert__dismiss", "aria-label": dismissLabel, onClick: onDismiss, children: getCloseIcon() }) : null
        ] }) : null
      ]
    }
  );
});
Alert.displayName = "Alert";
var Alert_default = Alert;

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
import React10, { useId as useId4 } from "react";

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

// src/components/molecules/Pagination/index.tsx
import { Fragment, jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
function cls4(...parts) {
  return parts.filter(Boolean).join(" ");
}
var Chevron = ({ direction, double = false }) => /* @__PURE__ */ jsx13(
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
    children: direction === "left" ? /* @__PURE__ */ jsxs11(Fragment, { children: [
      /* @__PURE__ */ jsx13("path", { d: double ? "M8.5 4 4.5 8l4 4" : "M10 4 6 8l4 4" }),
      double ? /* @__PURE__ */ jsx13("path", { d: "M12.5 4 8.5 8l4 4" }) : null
    ] }) : /* @__PURE__ */ jsxs11(Fragment, { children: [
      /* @__PURE__ */ jsx13("path", { d: double ? "M7.5 4l4 4-4 4" : "M6 4l4 4-4 4" }),
      double ? /* @__PURE__ */ jsx13("path", { d: "M3.5 4l4 4-4 4" }) : null
    ] })
  }
);
var Pagination = React10.forwardRef(function Pagination2({
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
  const sizeSelectId = useId4();
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
      control = /* @__PURE__ */ jsx13("a", { ...common, href, children: content });
    } else if (getPageHref && (disabled || atBoundary)) {
      control = /* @__PURE__ */ jsx13("a", { ...common, role: "link", "aria-disabled": "true", children: content });
    } else {
      control = /* @__PURE__ */ jsx13(
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
    return /* @__PURE__ */ jsx13("li", { className: "ds-pagination__item", "data-kind": kind, children: control }, kind === "page" ? `page-${target}` : kind);
  };
  const isFirst = current <= 1;
  const isLast = current >= count;
  return /* @__PURE__ */ jsxs11(
    "nav",
    {
      ref,
      "aria-label": ariaLabel,
      className: cls4("ds-pagination", className),
      "data-size": size,
      "data-compact": compact ? "true" : "false",
      "data-disabled": disabled ? "true" : void 0,
      ...rest,
      children: [
        totalContent !== null ? /* @__PURE__ */ jsx13("p", { className: "ds-pagination__total", "aria-live": "polite", "aria-atomic": "true", children: totalContent }) : null,
        /* @__PURE__ */ jsxs11("ul", { className: "ds-pagination__list", children: [
          showFirstLast && !compact ? renderControl("first", 1, labels.first, /* @__PURE__ */ jsx13(Chevron, { direction: "left", double: true }), { atBoundary: isFirst }) : null,
          showPrevNext ? renderControl("prev", current - 1, labels.previous, /* @__PURE__ */ jsx13(Chevron, { direction: "left" }), { atBoundary: isFirst }) : null,
          items.map(
            (item) => item.type === "page" ? renderControl("page", item.page, labels.page(item.page), item.page, { isCurrent: item.page === current }) : /* @__PURE__ */ jsxs11("li", { className: "ds-pagination__item ds-pagination__ellipsis", "data-kind": "ellipsis", children: [
              /* @__PURE__ */ jsx13("span", { "aria-hidden": "true", children: "\u2026" }),
              /* @__PURE__ */ jsx13("span", { className: "ds-pagination__sr", children: labels.ellipsis(item.from, item.to) })
            ] }, item.key)
          ),
          /* @__PURE__ */ jsx13(
            "li",
            {
              className: "ds-pagination__item ds-pagination__status",
              "data-kind": "status",
              "aria-live": totalContent === null ? "polite" : void 0,
              "aria-atomic": totalContent === null ? true : void 0,
              children: labels.status(current, count)
            }
          ),
          showPrevNext ? renderControl("next", current + 1, labels.next, /* @__PURE__ */ jsx13(Chevron, { direction: "right" }), { atBoundary: isLast }) : null,
          showFirstLast && !compact ? renderControl("last", count, labels.last, /* @__PURE__ */ jsx13(Chevron, { direction: "right", double: true }), { atBoundary: isLast }) : null
        ] }),
        pageSizeOptions && pageSizeOptions.length > 0 && onPageSizeChange ? /* @__PURE__ */ jsxs11("div", { className: "ds-pagination__size", children: [
          /* @__PURE__ */ jsx13("label", { htmlFor: sizeSelectId, className: "ds-pagination__size-label", children: labels.pageSize }),
          /* @__PURE__ */ jsx13(
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

// src/components/molecules/FilterBar/index.tsx
import React11, { useCallback as useCallback3, useEffect as useEffect2, useId as useId5, useLayoutEffect as useLayoutEffect2, useRef as useRef2, useState as useState2 } from "react";

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
import { jsx as jsx14, jsxs as jsxs12 } from "react/jsx-runtime";
function cls5(...parts) {
  return parts.filter(Boolean).join(" ");
}
function useMediaQuery(query) {
  const [matches, setMatches] = useState2(false);
  useEffect2(() => {
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
  return /* @__PURE__ */ jsx14("svg", { className: "ds-filter-bar__more-icon", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx14("path", { d: "M3 5h14M6 10h8M8.5 15h3", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) });
}
var FilterBar = React11.forwardRef(function FilterBar2({
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
  const base = useId5().replace(/:/g, "");
  const searchId = `ds-filter-bar-search-${base}`;
  const rootRef = useRef2(null);
  const chipsRef = useRef2(null);
  const narrow = useMediaQuery(FILTER_BAR_COLLAPSE_QUERY);
  const [moreOpen, setMoreOpen] = useState2(false);
  const valueRef = useRef2(value);
  valueRef.current = value;
  const onChangeRef = useRef2(onChange);
  onChangeRef.current = onChange;
  const [draft, setDraft] = useState2((_a = value.search) != null ? _a : "");
  const lastCommitted = useRef2((_b = value.search) != null ? _b : "");
  const timerRef = useRef2(null);
  const clearTimer = useCallback3(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  useEffect2(() => clearTimer, [clearTimer]);
  useEffect2(() => {
    var _a2;
    const external = (_a2 = value.search) != null ? _a2 : "";
    if (external !== lastCommitted.current) {
      lastCommitted.current = external;
      clearTimer();
      setDraft(external);
    }
  }, [value.search, clearTimer]);
  const commitSearch = useCallback3(
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
  const [pendingChipFocus, setPendingChipFocus] = useState2(null);
  useLayoutEffect2(() => {
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
  const triggerRef = useRef2(null);
  const lastFocus = useRef2(null);
  const restoreFilterId = useRef2(null);
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
  const prevNarrow = useRef2(narrow);
  useLayoutEffect2(() => {
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
    return /* @__PURE__ */ jsx14(
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
    return /* @__PURE__ */ jsx14("div", { className: "ds-filter-bar__control", "data-type": f.type, "data-filter-id": f.id, children: f.type === "multi" ? /* @__PURE__ */ jsx14(
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
  const renderOverflow = (f) => f.type === "multi" ? /* @__PURE__ */ jsxs12("fieldset", { className: "ds-filter-bar__fieldset", children: [
    /* @__PURE__ */ jsx14("legend", { className: "ds-filter-bar__legend", children: f.label }),
    /* @__PURE__ */ jsx14("div", { className: "ds-filter-bar__checks", children: f.options.map((o) => {
      const selected = toValueList(value.filters[f.id]);
      const checked = selected.includes(o.value);
      return /* @__PURE__ */ jsx14(
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
  ] }, f.id) : /* @__PURE__ */ jsx14("div", { className: "ds-filter-bar__panel-field", children: renderSelect(f, true) }, f.id);
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      ref: setRootRef,
      role: "group",
      "aria-label": labels.group,
      tabIndex: -1,
      className: cls5("ds-filter-bar", className),
      "data-narrow": narrow ? "true" : "false",
      "data-show-labels": showLabels ? "true" : "false",
      onFocus: trackFocus,
      onBlur: trackBlur,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs12("div", { className: "ds-filter-bar__row", children: [
          searchable ? /* @__PURE__ */ jsx14("div", { className: "ds-filter-bar__search", children: /* @__PURE__ */ jsx14(
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
          inlineFilters.length > 0 || overflowFilters.length > 0 ? /* @__PURE__ */ jsxs12("div", { className: "ds-filter-bar__filters", children: [
            inlineFilters.map(renderInline),
            overflowFilters.length > 0 ? /* @__PURE__ */ jsxs12(Popover, { open: moreOpen, onOpenChange: setMoreOpen, placement: "bottom-end", children: [
              /* @__PURE__ */ jsxs12(PopoverTrigger, { ref: triggerRef, className: "ds-filter-bar__more", "data-active": overflowActive > 0 ? "true" : void 0, children: [
                /* @__PURE__ */ jsx14(FilterIcon, {}),
                /* @__PURE__ */ jsx14("span", { children: triggerText }),
                overflowActive > 0 ? /* @__PURE__ */ jsx14("span", { className: "ds-filter-bar__more-count", "aria-hidden": "true", children: overflowActive }) : null,
                /* @__PURE__ */ jsx14("span", { className: "visually-hidden", children: labels.activeInOverflow(overflowActive) })
              ] }),
              /* @__PURE__ */ jsxs12(PopoverContent, { showPointer: false, className: "ds-filter-bar__panel", children: [
                /* @__PURE__ */ jsx14("div", { className: "ds-filter-bar__panel-body", children: overflowFilters.map(renderOverflow) }),
                /* @__PURE__ */ jsx14("div", { className: "ds-filter-bar__panel-footer", children: /* @__PURE__ */ jsx14(Button_default, { type: "button", variant: "outlineSecondary", size: "md", onClick: () => setMoreOpen(false), children: labels.done }) })
              ] })
            ] }) : null
          ] }) : null,
          extra ? /* @__PURE__ */ jsx14("div", { className: "ds-filter-bar__extra", children: extra }) : null
        ] }),
        chips.length > 0 || anyActive ? /* @__PURE__ */ jsxs12("div", { className: "ds-filter-bar__summary", children: [
          chips.length > 0 ? /* @__PURE__ */ jsx14("ul", { ref: chipsRef, className: "ds-filter-bar__chips", "aria-label": labels.activeFilters, children: chips.map((chip, i) => /* @__PURE__ */ jsx14("li", { className: "ds-filter-bar__chip", children: /* @__PURE__ */ jsxs12(
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
          anyActive ? /* @__PURE__ */ jsx14(Button_default, { type: "button", variant: "ghost", size: "md", className: "ds-filter-bar__clear", onClick: clearAll, children: labels.clearAll }) : null
        ] }) : null,
        /* @__PURE__ */ jsx14("p", { className: "ds-filter-bar__count", "aria-live": "polite", "aria-atomic": "true", children: typeof resultCount === "number" ? labels.resultCount(resultCount) : "" })
      ]
    }
  );
});
FilterBar.displayName = "FilterBar";
var FilterBar_default = FilterBar;

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
import React12, { useCallback as useCallback4, useEffect as useEffect3, useId as useId6, useLayoutEffect as useLayoutEffect3, useMemo as useMemo3, useRef as useRef3, useState as useState3 } from "react";

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

// src/components/molecules/DataTable/index.tsx
import { Fragment as Fragment2, jsx as jsx15, jsxs as jsxs13 } from "react/jsx-runtime";
function cls6(...parts) {
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
  return /* @__PURE__ */ jsxs13("svg", { className: "ds-data-table__tool-icon", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ jsx15("rect", { x: "3", y: "4", width: "14", height: "12", rx: "1.5", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ jsx15("path", { d: "M8 4v12M12 4v12", stroke: "currentColor", strokeWidth: "1.6" })
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
  const base = useId6().replace(/:/g, "");
  const captionId = `ds-data-table-caption-${base}`;
  const tableHostRef = useRef3(null);
  const serverMode = typeof pagination === "object" && pagination !== null;
  const paged = pagination !== false;
  const getKey = useCallback4((row) => resolveRowKey(row, rowKey), [rowKey]);
  const [innerFilter, setInnerFilter] = useState3((_a = filterBar == null ? void 0 : filterBar.defaultValue) != null ? _a : EMPTY_FILTER_VALUE);
  const filterValue = (_b = filterBar == null ? void 0 : filterBar.value) != null ? _b : innerFilter;
  const filtersActive = Boolean(filterBar) && hasActiveFilterValue(filterValue);
  const [clientPage, setClientPage] = useState3(1);
  const [clientPageSize, setClientPageSize] = useState3(defaultPageSize);
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
  const [innerVisibility, setInnerVisibility] = useState3(() => initialVisibility(columns));
  const visibility = useMemo3(() => {
    const seeded = initialVisibility(columns);
    const source = visibilityControlled ? columnVisibility : innerVisibility;
    for (const key of Object.keys(seeded))
      if (key in source)
        seeded[key] = Boolean(source[key]);
    return seeded;
  }, [columns, columnVisibility, innerVisibility, visibilityControlled]);
  const isVisible = (c) => c.hideable === false ? true : visibility[c.key] !== false;
  const tableColumns = useMemo3(
    () => columns.map((c) => ({ ...c, hidden: c.hideable === false ? false : visibility[c.key] === false })),
    [columns, visibility]
  );
  const visibleColumns = useMemo3(() => tableColumns.filter((c) => !c.hidden), [tableColumns]);
  const setColumnVisible = (key, visible) => {
    const next = { ...visibility, [key]: visible };
    if (!visibilityControlled)
      setInnerVisibility(next);
    onColumnVisibilityChange == null ? void 0 : onColumnVisibilityChange(next);
  };
  const [sort, setSort] = useState3(NO_SORT);
  const sortRef = useRef3(sort);
  sortRef.current = sort;
  useEffect3(() => {
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
  const filteredRows = useMemo3(() => {
    if (serverMode || !hasFilterBar)
      return data;
    const searchKeys = visibleColumns.map((c) => c.key);
    return data.filter((row) => filterFn ? filterFn(row, filterValue) : defaultRowFilter(row, filterValue, searchKeys));
  }, [serverMode, hasFilterBar, data, filterFn, filterValue, visibleColumns]);
  const sortColumn = visibleColumns.find((c) => c.key === sort.key);
  const orderedRows = useMemo3(
    () => serverMode ? filteredRows : sortRows(filteredRows, sortColumn, sort.direction),
    [serverMode, filteredRows, sortColumn, sort.direction]
  );
  const total = serverMode ? pagination.total : orderedRows.length;
  const pageSize = serverMode ? pagination.pageSize : clientPageSize;
  const pageCount = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  const page = serverMode ? pagination.page : Math.min(Math.max(1, clientPage), pageCount);
  useEffect3(() => {
    if (!serverMode && clientPage !== page)
      setClientPage(page);
  }, [serverMode, clientPage, page]);
  const pageRows = useMemo3(() => {
    if (serverMode || !paged)
      return orderedRows;
    const start = (page - 1) * pageSize;
    return orderedRows.slice(start, start + pageSize);
  }, [serverMode, paged, orderedRows, page, pageSize]);
  const [innerSelection, setInnerSelection] = useState3([]);
  const selection = selectedRowKeys != null ? selectedRowKeys : innerSelection;
  const [selectionNote, setSelectionNote] = useState3("");
  const noteSeen = useRef3(false);
  const noteConsumed = useRef3(false);
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
  useEffect3(() => {
    if (!loading && noteConsumed.current && selectionNote)
      setSelectionNote("");
  }, [loading, selectionNote]);
  useEffect3(() => {
    if (!selectionNote)
      return;
    const t = setTimeout(() => setSelectionNote(""), SELECTION_NOTE_MS);
    return () => clearTimeout(t);
  }, [selectionNote]);
  const rowCache = useRef3(/* @__PURE__ */ new Map());
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
  const markupWarned = useRef3(false);
  useLayoutEffect3(() => {
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
  const [columnsOpen, setColumnsOpen] = useState3(false);
  const columnMenu = columnVisibility ? /* @__PURE__ */ jsxs13(Popover, { open: columnsOpen, onOpenChange: setColumnsOpen, placement: "bottom-end", children: [
    /* @__PURE__ */ jsxs13(PopoverTrigger, { className: "ds-data-table__tool", children: [
      /* @__PURE__ */ jsx15(ColumnsIcon, {}),
      /* @__PURE__ */ jsx15("span", { children: labels.columns })
    ] }),
    /* @__PURE__ */ jsx15(PopoverContent, { showPointer: false, className: "ds-data-table__menu", children: /* @__PURE__ */ jsxs13("fieldset", { className: "ds-data-table__fieldset", children: [
      /* @__PURE__ */ jsx15("legend", { className: "ds-data-table__legend", children: labels.columnsLegend }),
      /* @__PURE__ */ jsx15("div", { className: "ds-data-table__checks", children: columns.map((c) => {
        const checked = isVisible(c);
        const locked = c.hideable === false || checked && visibleColumns.length <= 1;
        return /* @__PURE__ */ jsx15(
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
  const exportButton = exportOptions ? /* @__PURE__ */ jsx15(Button_default, { type: "button", variant: "outlineSecondary", size: "lg", onClick: handleExport, disabled: loading, children: (_d = exportOptions.label) != null ? _d : labels.exportCsv }, "export") : null;
  const toolItems = [filterBar == null ? void 0 : filterBar.extra, toolbarRight, columnMenu, exportButton].filter(Boolean);
  const tools = toolItems.length > 0 ? /* @__PURE__ */ jsx15(Fragment2, { children: toolItems.map((n, i) => /* @__PURE__ */ jsx15(React12.Fragment, { children: n }, i)) }) : void 0;
  const clearFilters = () => handleFilterChange({ ...filterValue, search: "", filters: {} });
  const emptyNode = filtersActive ? noResultsState != null ? noResultsState : /* @__PURE__ */ jsx15(
    EmptyState,
    {
      compact: true,
      title: labels.noResultsTitle,
      description: labels.noResultsDescription,
      action: /* @__PURE__ */ jsx15(Button_default, { type: "button", variant: "outlineSecondary", size: "md", onClick: clearFilters, children: labels.clearFilters })
    }
  ) : emptyState != null ? emptyState : /* @__PURE__ */ jsx15(EmptyState, { compact: true, title: labels.emptyTitle, description: labels.emptyDescription });
  const paginationLabel = paginationAriaLabel != null ? paginationAriaLabel : typeof caption === "string" && caption.trim() ? `${caption} pagination` : labels.pagination;
  const showPagination = paged && !error && total > 0;
  const lastResultCount = useRef3(void 0);
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
  return /* @__PURE__ */ jsxs13(
    "div",
    {
      ref: setRootRef,
      className: cls6("ds-data-table", className),
      "data-loading": loading ? "true" : void 0,
      "data-error": error ? "true" : void 0,
      children: [
        /* @__PURE__ */ jsx15("div", { id: captionId, className: cls6("ds-data-table__caption", hideCaption && "visually-hidden"), children: caption }),
        filterBar ? /* @__PURE__ */ jsx15(
          FilterBar_default,
          {
            ...filterBarRest,
            value: filterValue,
            onChange: handleFilterChange,
            resultCount: filterResultCount != null ? filterResultCount : error ? void 0 : loading ? lastResultCount.current : total,
            extra: tools
          }
        ) : tools ? /* @__PURE__ */ jsx15("div", { className: "ds-data-table__toolbar", children: tools }) : null,
        selectable ? /* @__PURE__ */ jsx15("div", { className: "ds-data-table__bulk-slot", "data-active": selection.length > 0 ? "true" : "false", children: selection.length > 0 ? /* @__PURE__ */ jsxs13("div", { className: "ds-data-table__bulk", role: "group", "aria-label": labels.bulkActions, children: [
          /* @__PURE__ */ jsx15("span", { className: "ds-data-table__bulk-count", children: labels.selectedCount(selection.length) }),
          /* @__PURE__ */ jsx15("span", { className: "ds-data-table__bulk-sep", "aria-hidden": "true", children: "\xB7" }),
          /* @__PURE__ */ jsx15(
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
          bulkActions && bulkActions.length > 0 ? /* @__PURE__ */ jsx15("div", { className: "ds-data-table__bulk-actions", children: bulkActions.map((action) => {
            var _a2;
            return /* @__PURE__ */ jsx15(
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
        ] }) : /* @__PURE__ */ jsx15("p", { className: "ds-data-table__bulk-hint", children: labels.bulkHint }) }) : null,
        /* @__PURE__ */ jsx15("p", { className: "visually-hidden", "aria-live": "polite", "aria-atomic": "true", children: loading ? loadingLiveText : selectable && selection.length > 0 ? labels.selectionStatus(selection.length) : liveSelectionNote }),
        error ? /* @__PURE__ */ jsx15("div", { className: "ds-data-table__state", children: /* @__PURE__ */ jsx15(
          ErrorState,
          {
            compact: true,
            title: (_e = error.title) != null ? _e : labels.errorTitle,
            description: (_f = error.description) != null ? _f : labels.errorDescription,
            onRetry: error.onRetry
          }
        ) }) : /* @__PURE__ */ jsx15(
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
            children: /* @__PURE__ */ jsx15(
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
                emptyComponent: /* @__PURE__ */ jsx15("div", { className: "ds-data-table__state", children: emptyNode })
              }
            )
          }
        ),
        showPagination ? /* @__PURE__ */ jsx15(
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
var DataTable = React12.forwardRef(DataTableInner);
DataTable.displayName = "DataTable";
var DataTable_default = DataTable;

export {
  Badge_default,
  Chip,
  Tag,
  GridItem,
  Grid,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  Card_default,
  EmptyState,
  ErrorState,
  OfflineBanner,
  FeedbackState,
  NoDataAnimation,
  NoSearchResultsAnimation,
  ErrorAnimation,
  OfflineAnimation,
  SuccessAnimation,
  InfoAnimation,
  FEEDBACK_ANIMATIONS,
  Combobox,
  IconBox_default,
  StatCard_default,
  ALERT_SR_PREFIX,
  getToneStyle,
  getAlertIcon,
  getCloseIcon,
  Alert_default,
  getPageCount,
  getItemRange,
  getPaginationRange,
  Pagination_default,
  FilterBar_default,
  escapeCsvCell,
  toCsv,
  DataTable_default
};
//# sourceMappingURL=chunk-GLLY7LT7.mjs.map