"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  AccordionContentProps,
  AccordionContextValue,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./Accordion.types";
import "./Accordion.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(component: string): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Accordion>`);
  }
  return ctx;
}

interface AccordionItemContextValue {
  value: string;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext(component: string): AccordionItemContextValue {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <AccordionItem>`);
  }
  return ctx;
}

function normalizeSingleValue(v: string | string[] | undefined): string | undefined {
  if (v === undefined) return undefined;
  if (Array.isArray(v)) return v[0];
  return v;
}

function normalizeMultipleValue(v: string | string[] | undefined): string[] {
  if (v === undefined) return [];
  if (Array.isArray(v)) return v;
  return [v];
}

export const Accordion = React.memo(function Accordion({
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
}: AccordionProps) {
  const reactId = useId();
  const baseId = `accordion-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== undefined;
  const [inner, setInner] = useState<string | string[] | undefined>(() => {
    if (defaultValue !== undefined) return defaultValue;
    if (type === "multiple") return [];
    return undefined;
  });

  const value = isControlled ? valueProp : inner;
  const valueRef = useRef(value);
  valueRef.current = value;

  const setValue = useCallback(
    (next: string | string[] | undefined) => {
      if (!isControlled) {
        setInner(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const isOpen = useCallback(
    (itemValue: string) => {
      if (type === "single") {
        return normalizeSingleValue(value) === itemValue;
      }
      return normalizeMultipleValue(value).includes(itemValue);
    },
    [type, value]
  );

  const toggle = useCallback(
    (itemValue: string) => {
      const v = valueRef.current;
      if (type === "single") {
        const current = normalizeSingleValue(v);
        if (current === itemValue) {
          if (collapsible) setValue(undefined);
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

  const ctx = useMemo(
    () =>
      ({
        type,
        collapsible,
        isOpen,
        toggle,
        baseId,
        variant,
        motion,
      }) satisfies AccordionContextValue,
    [type, collapsible, isOpen, toggle, baseId, variant, motion]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div
        className={cls("ds-accordion", className)}
        data-variant={variant}
        data-motion={motion}
        data-orientation="vertical"
        {...rest}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

export const AccordionItem = React.memo(function AccordionItem({
  value,
  disabled = false,
  className,
  children,
  ...rest
}: AccordionItemProps) {
  const acc = useAccordionContext("AccordionItem");
  const reactId = useId();
  const safe = String(value).replace(/[^a-zA-Z0-9_-]/g, "-");
  const suffix = `${acc.baseId}-${safe}-${reactId.replace(/:/g, "")}`;
  const itemCtx = useMemo(
    () => ({
      value,
      disabled,
      triggerId: `${suffix}-trigger`,
      contentId: `${suffix}-content`,
    }),
    [value, disabled, suffix]
  );

  return (
    <AccordionItemContext.Provider value={itemCtx}>
      <div
        className={cls("ds-accordion__item", className)}
        data-disabled={disabled ? "true" : undefined}
        data-state={acc.isOpen(value) ? "open" : "closed"}
        {...rest}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});

function ChevronIcon() {
  return (
    <svg className="ds-accordion__chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const AccordionTrigger = React.memo(function AccordionTrigger({
  children,
  className,
  onClick,
  ...rest
}: AccordionTriggerProps) {
  const acc = useAccordionContext("AccordionTrigger");
  const item = useAccordionItemContext("AccordionTrigger");
  const open = acc.isOpen(item.value) && !item.disabled;

  return (
    <button
      {...rest}
      type="button"
      id={item.triggerId}
      className={cls("ds-accordion__trigger", className)}
      aria-expanded={open}
      aria-controls={item.contentId}
      data-state={open ? "open" : "closed"}
      data-disabled={item.disabled ? "true" : undefined}
      disabled={item.disabled}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || item.disabled) return;
        acc.toggle(item.value);
      }}
    >
      <span className="ds-accordion__trigger-label">{children}</span>
      <ChevronIcon />
    </button>
  );
});

export const AccordionContent = React.memo(function AccordionContent({
  children,
  className,
  forceMount = false,
  ...rest
}: AccordionContentProps) {
  const acc = useAccordionContext("AccordionContent");
  const item = useAccordionItemContext("AccordionContent");
  const open = acc.isOpen(item.value);
  const animated = acc.motion === "default";

  /** Animated mode keeps panels mounted so height can transition on close; `hidden` would break CSS grid animation. */
  const keepMounted = animated || forceMount || open;
  if (!keepMounted) {
    return null;
  }

  const hidden = !open;
  const useInertWhenClosed = hidden && animated;

  return (
    <div
      {...rest}
      className={cls("ds-accordion__content-outer", className)}
      data-state={open ? "open" : "closed"}
      data-animated={animated ? "true" : undefined}
      id={item.contentId}
      role="region"
      aria-labelledby={item.triggerId}
      aria-hidden={hidden ? true : undefined}
      hidden={hidden && !forceMount && !animated ? true : undefined}
      inert={useInertWhenClosed ? true : undefined}
    >
      <div className="ds-accordion__content-inner">
        <div
          className="ds-accordion__content-body"
          data-force-hidden={forceMount && hidden && !animated ? "true" : undefined}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

export default Accordion;

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionContextValue,
  AccordionType,
  AccordionVariant,
  AccordionMotion,
} from "./Accordion.types";
