"use client";

import React from "react";

export interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "title"> {
  badge?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  layout?: "stacked" | "grid";
  columns?: number;
  gap?: number;
  maxWidth?: number | string;
  shellClassName?: string;
  cardClassName?: string;
  contentClassName?: string;
  fieldsClassName?: string;
  shellStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  fieldsStyle?: React.CSSProperties;
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function Form({
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
}: FormProps) {
  const resolvedShellStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--space-4) var(--space-2)",
    boxSizing: "border-box",
    ...shellStyle,
  };

  const resolvedCardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth,
    borderRadius: "var(--radius-card)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-bg-surface, #FFFFFF)",
    boxShadow: "var(--shadow-lg)",
    padding: "var(--space-4)",
    boxSizing: "border-box",
    ...cardStyle,
    ...style,
  };

  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "var(--space-1) var(--space-2)",
    borderRadius: 9999,
    background: "var(--color-accent-lavender-10, #EEE7FF)",
    color: "var(--color-brand-link, #002475)",
    fontSize: "var(--text-small-size)",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  };

  const titleStyle: React.CSSProperties = {
    margin: "var(--space-3) 0 var(--space-1)",
    color: "var(--color-text-primary, #0D0D0D)",
    fontSize: "clamp(var(--text-h2-size), 4vw, var(--text-h1-size))",
    lineHeight: "var(--text-h1-line-height)",
    fontWeight: 800,
  };

  const descriptionStyle: React.CSSProperties = {
    margin: 0,
    color: "var(--color-text-secondary, #757575)",
    fontSize: "var(--text-body-size)",
    lineHeight: "var(--text-body-line-height)",
  };

  const resolvedContentStyle: React.CSSProperties = {
    marginTop: "var(--space-4)",
    display: "flex",
    flexDirection: "column",
    gap,
    ...contentStyle,
  };

  const resolvedFieldsStyle: React.CSSProperties =
    layout === "grid"
      ? {
          display: "grid",
          gridTemplateColumns: `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
          gap,
          alignItems: "start",
          ...fieldsStyle,
        }
      : {
          display: "flex",
          flexDirection: "column",
          gap,
          ...fieldsStyle,
        };

  const resolvedActionsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-2)",
  };

  return (
    <section className={cx(shellClassName)} style={resolvedShellStyle}>
      <div
        className={cx(cardClassName)}
        style={resolvedCardStyle}
      >
        {(badge || title || description) && (
          <header>
            {badge && <span style={badgeStyle}>{badge}</span>}
            {title && <h1 style={titleStyle}>{title}</h1>}
            {description && <p style={descriptionStyle}>{description}</p>}
          </header>
        )}

        <form
          {...rest}
          className={cx(contentClassName, className)}
          style={resolvedContentStyle}
        >
          <div className={cx(fieldsClassName)} style={resolvedFieldsStyle}>
            {children}
          </div>
          {(actions || footer) && (
            <div style={resolvedActionsStyle}>
              {actions}
              {footer}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
