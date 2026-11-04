import React, { cloneElement, isValidElement } from "react";

type AnyProps = Record<string, unknown>;

/** React 19 moved `ref` onto props; React 18 keeps it on the element. */
export function getElementRef(element: React.ReactElement): React.Ref<unknown> | undefined {
  const major = parseInt(React.version, 10);
  if (major >= 19) return (element.props as AnyProps).ref as React.Ref<unknown> | undefined;
  return (element as unknown as { ref?: React.Ref<unknown> }).ref;
}

export function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") ref(value);
  else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T>).current = value;
}

/**
 * Merge `slotProps` onto the single child element (Radix-style `asChild`).
 * Event handlers are composed (child first; slot skipped when the child calls preventDefault),
 * className / style are merged, refs are composed. Other slot props win over the child's.
 */
export function renderSlot(
  children: React.ReactNode,
  slotProps: AnyProps,
  ref: React.Ref<HTMLElement> | undefined,
  component: string
): React.ReactElement {
  const child = React.Children.only(children);
  if (!isValidElement(child)) {
    throw new Error(`${component} with asChild expects a single React element child`);
  }
  const childProps = child.props as AnyProps;
  const childRef = getElementRef(child);
  const merged: AnyProps = { ...childProps };

  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    if (slotValue === undefined) continue;
    if (/^on[A-Z]/.test(key) && typeof slotValue === "function" && typeof childValue === "function") {
      merged[key] = (event: { defaultPrevented?: boolean }, ...args: unknown[]) => {
        (childValue as (...a: unknown[]) => void)(event, ...args);
        if (event && event.defaultPrevented) return;
        (slotValue as (...a: unknown[]) => void)(event, ...args);
      };
    } else if (key === "className") {
      merged[key] = [childValue, slotValue].filter(Boolean).join(" ") || undefined;
    } else if (key === "style") {
      merged[key] = { ...(slotValue as object), ...(childValue as object) };
    } else {
      merged[key] = slotValue;
    }
  }

  merged.ref = (node: HTMLElement | null) => {
    setRef(ref, node);
    setRef(childRef as React.Ref<HTMLElement | null>, node);
  };

  return cloneElement(child as React.ReactElement<AnyProps>, merged);
}
