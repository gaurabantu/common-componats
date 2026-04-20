"use client";

import React, {
  createContext,
  forwardRef,
  useContext,
  useMemo,
} from "react";
import type {
  CardActionProps,
  CardContentProps,
  CardContextValue,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
  CardVariantName,
} from "./Card.types";
import "./Card.css";

export type { CardProps, CardVariantName } from "./Card.types";
export type {
  CardSize,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardActionProps,
  CardContentProps,
  CardFooterProps,
} from "./Card.types";

const CardContext = createContext<CardContextValue | null>(null);

function useCardContext(component: string): CardContextValue {
  const ctx = useContext(CardContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Card>`);
  }
  return ctx;
}

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function getDisplayName(type: unknown): string | undefined {
  if (typeof type === "function") {
    const fn = type as { displayName?: string; name?: string };
    return fn.displayName || fn.name;
  }
  if (typeof type === "object" && type !== null && "displayName" in type) {
    return String((type as { displayName?: string }).displayName);
  }
  return undefined;
}

function hasCompoundStructure(children: React.ReactNode): boolean {
  return React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) return false;
    const name = getDisplayName(child.type);
    return (
      name === "CardHeader" ||
      name === "CardContent" ||
      name === "CardFooter"
    );
  });
}

function toCssSize(value: number | string | undefined, fallback: string): string {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

function normalizeVariant(v: CardVariantName | undefined): "bordered" | "elevated" | "withIndicator" {
  if (v === "outlined" || v === "filled") return "bordered";
  if (v === "elevated") return "elevated";
  if (v === "withIndicator") return "withIndicator";
  return "bordered";
}

function getShadow(
  elevation: CardProps["elevation"],
  hover: boolean,
  hoverable: boolean,
): string {
  const tier = elevation ?? "md";
  if (tier === "none") return "none";
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

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
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
  },
  ref,
) {
  const [isHovered, setIsHovered] = React.useState(false);
  const resolvedVariant = normalizeVariant(variant);
  const isIndicatorCard = resolvedVariant === "withIndicator";
  const isElevated = resolvedVariant === "elevated" || isIndicatorCard;

  const paddingVar =
    paddingProp !== undefined
      ? toCssSize(paddingProp, "24px")
      : size === "sm"
        ? "var(--space-2)"
        : "var(--space-3)";

  const resolvedRadius = toCssSize(radius, "8px");

  const resolvedElevation: CardProps["elevation"] =
    elevation ?? (isElevated ? "sm" : "none");

  const showBorder = resolvedVariant === "bordered";

  const boxShadowResolved = showBorder
    ? "var(--shadow-none)"
    : isElevated
      ? getShadow(resolvedElevation, isHovered, Boolean(hoverable) && isElevated)
      : "var(--shadow-none)";

  const borderSpec: React.CSSProperties["border"] = showBorder
    ? "1px solid var(--color-border-default)"
    : "1px solid transparent";

  const compound = hasCompoundStructure(children);

  const ctxValue = useMemo<CardContextValue>(
    () => ({
      size,
      paddingCss: paddingVar,
    }),
    [size, paddingVar],
  );

  const outerStyle: React.CSSProperties = {
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
    ...(compound ? ({ "--card-padding": paddingVar } as React.CSSProperties) : {}),
    ...style,
  };

  const showIndicator = isIndicatorCard && selected;

  const bodyPaddingStyle: React.CSSProperties = {
    padding: paddingVar,
    flex: 1,
    minWidth: 0,
  };

  const actionsStyle: React.CSSProperties = {
    padding: paddingVar,
    paddingTop: "var(--space-2)",
    borderTop: "1px solid var(--color-border-subtle, var(--color-mist-60))",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "var(--space-2)",
    justifyContent:
      actionsAlign === "right"
        ? "flex-end"
        : actionsAlign === "center"
          ? "center"
          : actionsAlign === "between"
            ? "space-between"
            : "flex-start",
  };

  const mainColumn = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0,
      }}
    >
      {cover && <div>{cover}</div>}

      {(title || subtitle || extra) && (
        <div
          style={{
            ...bodyPaddingStyle,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--space-2)",
            paddingBottom: children || actions || footer ? "var(--space-2)" : paddingVar,
          }}
        >
          <div style={{ minWidth: 0 }}>
            {title && (
              <div
                style={{
                  color: "var(--color-text-primary)",
                  fontSize: "var(--text-h4-size)",
                  fontWeight: "var(--text-h4-weight)",
                  lineHeight: 1.4,
                }}
              >
                {title}
              </div>
            )}
            {subtitle && (
              <div
                style={{
                  marginTop: "var(--space-0)",
                  color: "var(--color-text-secondary)",
                  fontSize: "var(--text-secondary-size)",
                  lineHeight: 1.5,
                }}
              >
                {subtitle}
              </div>
            )}
          </div>
          {extra && <div style={{ flexShrink: 0 }}>{extra}</div>}
        </div>
      )}

      {children && (
        <div
          style={{
            ...bodyPaddingStyle,
            paddingTop: title || subtitle || extra ? 0 : paddingVar,
            color: "var(--color-text-primary)",
          }}
        >
          {children}
        </div>
      )}

      {actions && <div style={actionsStyle}>{actions}</div>}

      {footer && (
        <div
          style={{
            padding: paddingVar,
            paddingTop: actions ? 0 : "var(--space-2)",
            color: "var(--color-text-secondary)",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );

  const inner = compound ? (
    <CardContext.Provider value={ctxValue}>
      <div className="card-inner--compound">{children}</div>
    </CardContext.Provider>
  ) : (
    mainColumn
  );

  return (
    <div
      ref={ref}
      {...rest}
      style={outerStyle}
      className={cls(
        compound && "card-root",
        compound && size === "sm" && "card-root--sm",
        className,
      )}
      data-card-variant={resolvedVariant}
      data-card-size={compound ? size : undefined}
      data-selected={showIndicator ? "true" : undefined}
      onMouseEnter={(event) => {
        setIsHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setIsHovered(false);
        onMouseLeave?.(event);
      }}
    >
      {showIndicator && (
        <div
          aria-hidden
          style={{
            width: "var(--size-indicator-bar, 4px)",
            flexShrink: 0,
            alignSelf: "stretch",
            background: "var(--color-accent-lavender-40)",
            borderRadius: "var(--radius-xs) 0 0 var(--radius-xs)",
          }}
        />
      )}
      {inner}
    </div>
  );
});

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, ...rest },
  ref,
) {
  useCardContext("CardHeader");
  return <div ref={ref} className={cls("card-header", className)} {...rest} />;
});
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { as: Comp = "h3", className, ...rest },
  ref,
) {
  useCardContext("CardTitle");
  return <Comp ref={ref as never} className={cls("card-title", className)} {...rest} />;
});
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ as: Comp = "p", className, ...rest }, ref) {
    useCardContext("CardDescription");
    return <Comp ref={ref as never} className={cls("card-description", className)} {...rest} />;
  },
);
CardDescription.displayName = "CardDescription";

export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(function CardAction(
  { className, ...rest },
  ref,
) {
  useCardContext("CardAction");
  return <div ref={ref} className={cls("card-action", className)} {...rest} />;
});
CardAction.displayName = "CardAction";

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  { className, noPadding, ...rest },
  ref,
) {
  useCardContext("CardContent");
  return (
    <div
      ref={ref}
      className={cls(
        "card-content",
        noPadding && "card-content--no-padding",
        className,
      )}
      {...rest}
    />
  );
});
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, borderTop = true, ...rest },
  ref,
) {
  useCardContext("CardFooter");
  return (
    <div
      ref={ref}
      className={cls(
        "card-footer",
        borderTop ? "card-footer--border" : "card-footer--no-border",
        className,
      )}
      {...rest}
    />
  );
});
CardFooter.displayName = "CardFooter";

const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Content: CardContent,
  Footer: CardFooter,
});

export default Card;
