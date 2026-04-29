"use client";

import React from "react";
import "./Form.css";

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
    ...shellStyle,
  };

  const resolvedCardStyle: React.CSSProperties & Record<string, string | number> = {
    maxWidth,
    "--form-gap": typeof gap === "number" ? `${gap}px` : gap,
    "--form-columns": Math.max(1, columns),
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
    ...contentStyle,
  };

  const resolvedFieldsStyle: React.CSSProperties = { ...fieldsStyle };

  return (
    <section className={cx("ds-form-shell", shellClassName)} style={resolvedShellStyle}>
      <div
        className={cx("ds-form-card", cardClassName)}
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
          className={cx("ds-form-content", contentClassName, className)}
          style={resolvedContentStyle}
        >
          <div
            className={cx(
              "ds-form-fields",
              layout === "grid" && "ds-form-fields--grid",
              fieldsClassName
            )}
            style={resolvedFieldsStyle}
          >
            {children}
          </div>
          {(actions || footer) && (
            <div className="ds-form-actions">
              {actions}
              {footer}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
