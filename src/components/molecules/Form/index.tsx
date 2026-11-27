"use client";

import React from "react";
import { FORM_BREAKPOINTS, FORM_DEFAULTS } from "./Form.config";
import type { FormColumns, FormProps, FormSubmitValues } from "./Form.types";
import "./Form.css";

export type {
  FormProps,
  FormLayout,
  FormColumns,
  FormColumnBreakpoint,
  FormResponsiveColumns,
  FormErrorSummaryItem,
  FormSlot,
  FormClassNames,
  FormStyles,
  FormSubmitValues,
  FormTitleElement,
} from "./Form.types";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type CssVars = React.CSSProperties & Record<`--${string}`, string | number>;

/** Column count → CSS custom properties consumed by `.ds-form-fields--grid`. */
function columnVars(columns: FormColumns): CssVars {
  const vars: CssVars = {};
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

function collectValues(form: HTMLFormElement): FormSubmitValues {
  const values: FormSubmitValues = {};
  new FormData(form).forEach((value, key) => {
    const prev = values[key];
    if (prev === undefined) values[key] = value;
    else values[key] = Array.isArray(prev) ? [...prev, value] : [prev, value];
  });
  return values;
}

/**
 * Form — card-shell form with header, responsive field grid, actions, a WCAG 3.3.1 error summary,
 * and loading / disabled states that disable every field via `<fieldset disabled>`.
 *
 * Note (legacy): `className` is applied to the `<form>` element and `style` to the card.
 */
const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
  {
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
  },
  ref,
) {
  const baseId = React.useId().replace(/:/g, "");
  const summaryTitleId = `ds-form-summary-${baseId}`;
  const summaryRef = React.useRef<HTMLDivElement>(null);
  const hasErrors = Boolean(errorSummary && errorSummary.length > 0);
  const errorSignature = hasErrors ? errorSummary!.map((e) => e.fieldId).join("|") : "";
  /** Previous signature — StrictMode-safe (double effect run on mount sees no change). */
  const prevSignatureRef = React.useRef(errorSignature);

  React.useEffect(() => {
    if (prevSignatureRef.current === errorSignature) return;
    prevSignatureRef.current = errorSignature;
    if (autoFocusErrorSummary && errorSignature) summaryRef.current?.focus();
  }, [errorSignature, autoFocusErrorSummary]);

  const blocked = loading || disabled;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (blocked) {
      event.preventDefault();
      return;
    }
    onSubmit?.(event);
    if (onSubmitValues) {
      event.preventDefault();
      onSubmitValues(collectValues(event.currentTarget), event);
    }
  };

  const focusField = (event: React.MouseEvent<HTMLAnchorElement>, fieldId: string) => {
    const field = typeof document !== "undefined" ? document.getElementById(fieldId) : null;
    if (!field) return;
    event.preventDefault();
    if (typeof field.scrollIntoView === "function") field.scrollIntoView({ block: "center" });
    field.focus();
  };

  const cardVars: CssVars = {
    maxWidth,
    ...columnVars(columns),
    ...(gap !== undefined ? { "--form-gap": typeof gap === "number" ? `${gap}px` : gap } : null),
    ...cardStyle,
    ...styles?.card,
    ...style,
  };

  return (
    <section
      className={cx("ds-form-shell", shellClassName, classNames?.shell)}
      style={{ ...shellStyle, ...styles?.shell }}
    >
      <div className={cx("ds-form-card", cardClassName, classNames?.card)} style={cardVars}>
        {(badge || title || description) && (
          <header className="ds-form-header">
            {badge && <span className="ds-form-badge">{badge}</span>}
            {title && <TitleTag className="ds-form-title">{title}</TitleTag>}
            {description && <p className="ds-form-description">{description}</p>}
          </header>
        )}

        <form
          {...rest}
          ref={ref}
          onSubmit={handleSubmit}
          aria-busy={loading || undefined}
          data-loading={loading ? "true" : undefined}
          data-disabled={disabled ? "true" : undefined}
          className={cx("ds-form-content", contentClassName, classNames?.content, className)}
          style={{ ...contentStyle, ...styles?.content }}
        >
          {hasErrors && (
            <div
              ref={summaryRef}
              className="ds-form-error-summary"
              role="alert"
              aria-labelledby={summaryTitleId}
              tabIndex={-1}
            >
              <h2 id={summaryTitleId} className="ds-form-error-summary__title">
                {errorSummaryTitle}
              </h2>
              <ul className="ds-form-error-summary__list">
                {errorSummary!.map((item) => (
                  <li key={item.fieldId}>
                    <a
                      href={`#${item.fieldId}`}
                      className="ds-form-error-summary__link"
                      onClick={(e) => focusField(e, item.fieldId)}
                    >
                      {item.message}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <fieldset className="ds-form-fieldset" disabled={blocked} role="presentation">
            <div
              className={cx(
                "ds-form-fields",
                layout === "grid" && "ds-form-fields--grid",
                fieldsClassName,
                classNames?.fields,
              )}
              style={{ ...fieldsStyle, ...styles?.fields }}
            >
              {children}
            </div>
          </fieldset>
          {(actions || footer) && (
            /*
             * Actions share the form state: `disabled` → native `<fieldset disabled>` (buttons report
             * disabled). `loading` → `aria-disabled` on the group only, so a focused submit Button keeps
             * focus (focus-safe loading, Sprint 4); submit is blocked in `handleSubmit` either way.
             */
            <fieldset
              className="ds-form-fieldset ds-form-actions-fieldset"
              disabled={disabled}
              aria-disabled={blocked || undefined}
              data-state={disabled ? "disabled" : loading ? "loading" : undefined}
            >
              <div className="ds-form-actions">
                {actions}
                {footer}
              </div>
            </fieldset>
          )}
          <span className="ds-form-sr" role="status" aria-live="polite">
            {loading ? loadingLabel : ""}
          </span>
        </form>
      </div>
    </section>
  );
});

Form.displayName = "Form";

export default Form;
