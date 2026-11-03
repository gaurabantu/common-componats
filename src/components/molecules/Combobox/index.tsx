"use client";

import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { useFormField } from "../FormField";
import { FORM_FIELD_CONSUMER_KEY } from "../FormField/FormField.config";
import type { ComboboxGroup, ComboboxOption, ComboboxProps } from "./Combobox.types";
import "./Combobox.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function flattenOptions(options: ComboboxOption[] | undefined, groups: ComboboxGroup[] | undefined): ComboboxOption[] {
  if (groups?.length) return groups.flatMap((g) => g.options);
  return options ?? [];
}

function ChevronDown() {
  return (
    <svg className="ds-combobox__chevron" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const Combobox = React.memo(function Combobox({
  label,
  options,
  groups,
  searchable = false,
  searchPlaceholder = "Search…",
  multiple = false,
  placeholder = "Select…",
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
}: ComboboxProps) {
  /*
   * Inside a FormField: the field id, label, description and state go on the focusable
   * role="combobox" trigger instead of the wrapper. Explicit props still win. Outside a field,
   * nothing changes (aria-* in `rest` keep landing on the wrapper as before).
   */
  const field = useFormField();
  const {
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    "aria-required": ariaRequiredProp,
    ...restWithoutAria
  } = restProps as typeof restProps & {
    "aria-describedby"?: string;
    "aria-invalid"?: React.AriaAttributes["aria-invalid"];
    "aria-required"?: React.AriaAttributes["aria-required"];
  };
  const rest = field ? restWithoutAria : restProps;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const fieldControlId = field?.id;
  useLayoutEffect(() => {
    // PopoverTrigger owns its `id` prop (it is the popover's anchor id), so the field id is applied
    // to the DOM node directly; React leaves it alone because the prop value never changes.
    const el = triggerRef.current;
    if (!el || !fieldControlId) return;
    const original = el.id;
    el.id = fieldControlId;
    return () => {
      el.id = original;
    };
  }, [fieldControlId]);
  const reactId = useId();
  const base = reactId.replace(/:/g, "");
  const listboxId = `ds-combobox-lb-${base}`;
  const searchId = `ds-combobox-search-${base}`;
  const labelId = `ds-combobox-lbl-${base}`;
  const isControlled = valueProp !== undefined;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const [innerValue, setInnerValue] = useState<string | string[]>(() => {
    if (defaultValue !== undefined) return defaultValue;
    return multiple ? [] : "";
  });

  const selected = isControlled ? valueProp! : innerValue;

  const allOptions = useMemo(() => flattenOptions(options, groups), [options, groups]);
  const useGroups = Boolean(groups?.length);

  const filteredFlat = useMemo(() => {
    const base = options ?? [];
    const q = search.trim().toLowerCase();
    if (!searchable || !q) return base;
    return base.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, search, searchable]);

  const filteredGroups = useMemo(() => {
    if (!groups?.length) return null;
    const q = search.trim().toLowerCase();
    if (!searchable || !q) return groups;
    return groups
      .map((g) => ({
        ...g,
        options: g.options.filter(
          (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.options.length > 0);
  }, [groups, search, searchable]);

  const setValue = useCallback(
    (next: string | string[]) => {
      if (!isControlled) {
        setInnerValue(next);
      }
      const opts = flattenOptions(options, groups);
      if (multiple && Array.isArray(next)) {
        const picked = next.map((v) => opts.find((o) => o.value === v)).filter(Boolean) as ComboboxOption[];
        onValueChange?.(next, picked);
      } else if (!multiple && typeof next === "string") {
        const one = opts.find((o) => o.value === next);
        onValueChange?.(next, one);
      }
    },
    [isControlled, multiple, onValueChange, options, groups]
  );

  const toggleMulti = (opt: ComboboxOption) => {
    if (opt.disabled || disabled) return;
    const cur = Array.isArray(selected) ? [...selected] : [];
    const i = cur.indexOf(opt.value);
    if (i >= 0) cur.splice(i, 1);
    else cur.push(opt.value);
    setValue(cur);
  };

  const pickSingle = (opt: ComboboxOption) => {
    if (opt.disabled || disabled) return;
    setValue(opt.value);
    setOpen(false);
    setSearch("");
  };

  const isSelected = (v: string): boolean => {
    if (multiple && Array.isArray(selected)) return selected.includes(v);
    if (!multiple && typeof selected === "string") return selected === v;
    return false;
  };

  const displayTrigger = useMemo(() => {
    if (multiple && Array.isArray(selected)) {
      if (selected.length === 0) return { text: placeholder, placeholder: true, icon: null as React.ReactNode };
      const labels = selected.map((v) => allOptions.find((o) => o.value === v)?.label ?? v);
      const firstIcon = allOptions.find((o) => o.value === selected[0])?.icon;
      return {
        text: labels.join(", "),
        placeholder: false,
        icon: selected.length === 1 ? firstIcon : null,
      };
    }
    const s = typeof selected === "string" ? selected : "";
    if (!s) return { text: placeholder, placeholder: true, icon: null as React.ReactNode };
    const opt = allOptions.find((o) => o.value === s);
    return { text: opt?.label ?? s, placeholder: false, icon: opt?.icon ?? null };
  }, [allOptions, multiple, placeholder, selected]);

  const hasList =
    useGroups && filteredGroups
      ? filteredGroups.some((g) => g.options.length > 0)
      : filteredFlat.length > 0;

  const resolvedStatus = error ? "error" : undefined;
  const helperMessage = error ?? helperText;

  const sizeStyles = useMemo(() => {
    const map = {
      sm: { minH: "var(--button-height-sm)", font: "var(--text-small-size, 12px)" },
      md: { minH: "var(--button-height-lg)", font: "var(--text-body-size, 16px)" },
      lg: { minH: "3rem", font: "var(--text-body-size, 16px)" },
    } as const;
    return map[size];
  }, [size]);

  const borderColor =
    resolvedStatus === "error"
      ? "var(--color-state-error)"
      : "var(--color-border-default)";

  const renderOptionRow = (opt: ComboboxOption) => {
    const sel = isSelected(opt.value);
    return (
      <button
        key={opt.value}
        type="button"
        role="option"
        id={`${listboxId}-opt-${opt.value}`}
        aria-selected={sel}
        data-selected={sel ? "true" : "false"}
        disabled={disabled || opt.disabled}
        className="ds-combobox__option"
        onClick={() => (multiple ? toggleMulti(opt) : pickSingle(opt))}
      >
        {opt.icon ? <span className="ds-combobox__option-icon">{opt.icon}</span> : null}
        <span className="ds-combobox__option-label">{opt.label}</span>
        {multiple && sel ? (
          <svg className="ds-combobox__check" viewBox="0 0 16 16" aria-hidden>
            <path
              d="M13.5 4.5L6.5 11.5L3 8"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </button>
    );
  };

  return (
    <div
      {...rest}
      id={field && idProp === field.id ? undefined : idProp}
      className={cls("ds-combobox", className)}
      style={{
        width: fullWidth ? "100%" : "auto",
        display: fullWidth ? "block" : "inline-block",
        ...style,
      }}
      data-open={open ? "true" : "false"}
      data-disabled={disabled ? "true" : "false"}
      data-status={resolvedStatus}
    >
      <Popover open={open} onOpenChange={setOpen} placement="bottom-start">
        {label ? (
          <div id={labelId} className="ds-combobox__label">
            {label}
          </div>
        ) : null}
        <PopoverTrigger
          type="button"
          role="combobox"
          disabled={disabled}
          className="ds-combobox__trigger"
          ref={triggerRef}
          aria-labelledby={label ? labelId : field?.labelId}
          aria-label={label || field ? undefined : placeholder ?? "Select option"}
          {...(field
            ? {
                "aria-describedby": ariaDescribedByProp ?? field.describedBy,
                "aria-invalid": ariaInvalidProp ?? (field.invalid || error ? true : undefined),
                "aria-required": ariaRequiredProp ?? (field.required || undefined),
              }
            : {})}
          hasPopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          style={
            {
              "--combobox-min-h": sizeStyles.minH,
              "--combobox-font-size": sizeStyles.font,
              "--combobox-border": borderColor,
            } as React.CSSProperties
          }
        >
          <span className="ds-combobox__trigger-inner">
            {displayTrigger.icon ? (
              <span className="ds-combobox__trigger-icon">{displayTrigger.icon}</span>
            ) : null}
            <span
              className={cls(
                "ds-combobox__trigger-label",
                displayTrigger.placeholder && "ds-combobox__trigger-label--placeholder"
              )}
            >
              {displayTrigger.text}
            </span>
          </span>
          <ChevronDown />
        </PopoverTrigger>

        <PopoverContent
          role="none"
          showPointer={false}
          className="ds-combobox__popover"
          style={listMinWidth != null ? { minWidth: listMinWidth } : undefined}
        >
          <div className="ds-combobox__panel">
            {searchable ? (
              <input
                id={searchId}
                type="search"
                className="ds-combobox__search"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                aria-label={searchPlaceholder}
                aria-controls={listboxId}
                autoComplete="off"
              />
            ) : null}

            {!hasList ? (
              <div className="ds-combobox__empty" role="status">
                No results
              </div>
            ) : useGroups && filteredGroups ? (
              <div
                id={listboxId}
                className="ds-combobox__listbox"
                role="listbox"
                aria-multiselectable={multiple}
                aria-label={label ?? "Options"}
              >
                {filteredGroups.map((g) => (
                  <React.Fragment key={g.label}>
                    <div className="ds-combobox__group-label" role="presentation">
                      {g.label}
                    </div>
                    {g.options.map((opt) => renderOptionRow(opt))}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div
                id={listboxId}
                className="ds-combobox__listbox"
                role="listbox"
                aria-multiselectable={multiple}
                aria-label={label ?? "Options"}
              >
                {filteredFlat.map((opt) => renderOptionRow(opt))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {helperMessage ? (
        <p className="ds-combobox__helper" role={error ? "alert" : undefined}>
          {helperMessage}
        </p>
      ) : null}
    </div>
  );
});

Combobox.displayName = "Combobox";
/** Tells FormField this control wires itself via `useFormField()` (no cloneElement injection). */
(Combobox as unknown as Record<string, unknown>)[FORM_FIELD_CONSUMER_KEY] = true;

export default Combobox;
