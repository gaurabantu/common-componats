"use client";

import React, { createContext, useContext, useEffect, useId, useMemo, useRef } from "react";
import {
  FORM_FIELD_CONSUMER_KEY,
  FORM_FIELD_DEFAULTS,
  FORM_FIELD_LABELABLE_SELECTOR,
  FORM_FIELD_REQUIRED_SR_TEXT,
} from "./FormField.config";
import type { FormFieldContextValue, FormFieldProps } from "./FormField.types";
import "./FormField.css";

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

function hasContent(node: React.ReactNode): boolean {
  return node !== undefined && node !== null && node !== false && node !== "";
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/**
 * Read the ids / state of the enclosing `FormField` so a custom control can wire
 * `id`, `aria-labelledby`, `aria-describedby`, `aria-invalid` and `aria-required` itself.
 * Returns `null` outside a `FormField` (controls stay usable stand-alone).
 */
export function useFormField(): FormFieldContextValue | null {
  return useContext(FormFieldContext);
}

/**
 * Error is announced (`role="alert"`) only once it differs from its first-render value, so a form
 * that loads with server-side errors does not interrupt the page read-out. Decided during render
 * (latching ref, idempotent under StrictMode) so the role and the new text land in the same commit.
 */
function useAnnounceOnChange(value: React.ReactNode): boolean {
  const initial = useRef(value);
  const changed = useRef(false);
  if (!changed.current && value !== initial.current) changed.current = true;
  return changed.current;
}

function isDev(): boolean {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env?.NODE_ENV !== "production";
}

function isFormFieldConsumer(type: unknown): boolean {
  return Boolean(type && (typeof type === "object" || typeof type === "function") &&
    (type as Record<string, unknown>)[FORM_FIELD_CONSUMER_KEY]);
}

/**
 * FormField — label · control · hint · error · counter, with the ARIA wiring done for you.
 * Pass exactly one control as `children`; it receives `id`, `aria-describedby`, `aria-invalid`
 * and `aria-required` unless it already sets them. Custom controls can read the ids via `useFormField()`.
 *
 * Supported children: `Input`, `TextArea`, `Select`, `Combobox` (wires itself from `useFormField()`),
 * native `input` / `select` / `textarea`, and custom controls that read `useFormField()`.
 * In development a `console.warn` fires when, after mount, neither a labelable element carries the
 * field id nor a descendant references the label via `aria-labelledby`.
 *
 * Intentional, beyond the Sprint 2 brief: when `counter` is set its id is added to `aria-describedby`
 * (after hint and error) so "12 of 100" is read on focus; going over the limit is announced once
 * through a separate polite live region.
 */
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  {
    label,
    htmlFor,
    hint,
    error,
    required = false,
    optional = false,
    counter,
    layout = FORM_FIELD_DEFAULTS.layout,
    children,
    className,
    ...rest
  },
  ref,
) {
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const child = React.isValidElement(children) && children.type !== React.Fragment ? children : null;
  const childProps = (child?.props ?? {}) as Record<string, unknown>;
  const childId = typeof childProps.id === "string" && childProps.id ? (childProps.id as string) : undefined;

  const controlId = htmlFor ?? childId ?? `form-field-${reactId}`;
  const labelId = `${controlId}-label`;
  const showHint = hasContent(hint);
  const showError = hasContent(error);
  const hintId = showHint ? `${controlId}-hint` : undefined;
  const errorId = showError ? `${controlId}-error` : undefined;
  const counterId = counter ? `${controlId}-counter` : undefined;
  const describedBy = [hintId, errorId, counterId].filter(Boolean).join(" ") || undefined;
  const invalid = showError;
  const overLimit = counter ? counter.value > counter.max : false;

  const announceError = useAnnounceOnChange(error);

  const ctx = useMemo<FormFieldContextValue>(
    () => ({ id: controlId, labelId, hintId, errorId, counterId, describedBy, invalid, required }),
    [controlId, labelId, hintId, errorId, counterId, describedBy, invalid, required],
  );

  const controlRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isDev()) return;
    const root = controlRef.current;
    if (!root) return;
    const target = Array.from(root.querySelectorAll<HTMLElement>("[id]")).find((el) => el.id === controlId);
    const labelled = target?.matches(FORM_FIELD_LABELABLE_SELECTOR) ?? false;
    const byLabelledBy = Array.from(root.querySelectorAll<HTMLElement>("[aria-labelledby]")).some((el) =>
      (el.getAttribute("aria-labelledby") ?? "").split(/\s+/).includes(labelId),
    );
    if (!labelled && !byLabelledBy) {
      console.warn(
        `[FormField] No labelable focusable element with id="${controlId}" (and no aria-labelledby="${labelId}") ` +
          "was found inside the field, so the label is not associated with the control. Use Input / TextArea / " +
          "Select / Combobox / a native control, or wire a custom control with useFormField().",
      );
    }
  }, [controlId, labelId]);

  let control: React.ReactNode = children;
  if (child && !isFormFieldConsumer(child.type)) {
    const inject: Record<string, unknown> = {};
    if (childProps.id === undefined) inject.id = controlId;
    if (childProps["aria-describedby"] === undefined && describedBy) inject["aria-describedby"] = describedBy;
    if (childProps["aria-invalid"] === undefined && invalid) inject["aria-invalid"] = true;
    if (childProps["aria-required"] === undefined && required) inject["aria-required"] = true;
    control = Object.keys(inject).length > 0 ? React.cloneElement(child, inject) : child;
  }

  const optionalText =
    !required && optional ? (typeof optional === "string" ? optional : FORM_FIELD_DEFAULTS.optionalLabel) : null;

  return (
    <FormFieldContext.Provider value={ctx}>
      <div
        ref={ref}
        className={cls("ds-form-field", className)}
        data-layout={layout}
        data-invalid={invalid ? "true" : undefined}
        {...rest}
      >
        <div className="ds-form-field__label-col">
          <label id={labelId} htmlFor={controlId} className="ds-form-field__label">
            {label}
            {required ? (
              <>
                <span className="ds-form-field__required" aria-hidden="true">
                  *
                </span>
                <span className="sr-only"> {FORM_FIELD_REQUIRED_SR_TEXT}</span>
              </>
            ) : null}
            {optionalText ? <span className="ds-form-field__optional">{optionalText}</span> : null}
          </label>
        </div>
        <div className="ds-form-field__control-col">
          <div ref={controlRef} className="ds-form-field__control">
            {control}
          </div>
          {showHint || showError || counter ? (
            <div className="ds-form-field__messages">
              <div className="ds-form-field__texts">
                {showHint ? (
                  <p id={hintId} className="ds-form-field__hint">
                    {hint}
                  </p>
                ) : null}
                {showError ? (
                  <p id={errorId} className="ds-form-field__error" role={announceError ? "alert" : undefined}>
                    <svg
                      className="ds-form-field__error-icon"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 4.75v3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="8" cy="11" r="0.9" fill="currentColor" />
                    </svg>
                    <span>{error}</span>
                  </p>
                ) : null}
              </div>
              {counter ? (
                <span id={counterId} className="ds-form-field__counter" data-over={overLimit ? "true" : undefined}>
                  <span aria-hidden="true">
                    {counter.value}/{counter.max}
                  </span>
                  <span className="sr-only">
                    {counter.value} of {counter.max}
                    {overLimit ? `, ${counter.value - counter.max} over the limit` : ""}
                  </span>
                </span>
              ) : null}
            </div>
          ) : null}
          {counter ? (
            <span className="sr-only" aria-live="polite">
              {overLimit ? `Limit of ${counter.max} exceeded` : ""}
            </span>
          ) : null}
        </div>
      </div>
    </FormFieldContext.Provider>
  );
});

FormField.displayName = "FormField";

export default FormField;
export type { FormFieldProps, FormFieldLayout, FormFieldCounter, FormFieldContextValue } from "./FormField.types";
