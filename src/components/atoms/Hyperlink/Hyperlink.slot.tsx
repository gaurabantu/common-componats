import React, { cloneElement, isValidElement } from "react";

type AnyProps = Record<string, unknown>;

/** React 19 moved `ref` onto props; React 18 keeps it on the element. */
function getElementRef(element: React.ReactElement): React.Ref<unknown> | undefined {
  const major = parseInt(React.version, 10);
  if (major >= 19) return (element.props as AnyProps).ref as React.Ref<unknown> | undefined;
  return (element as unknown as { ref?: React.Ref<unknown> }).ref;
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") ref(value);
  else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T>).current = value;
}

/**
 * Merge Hyperlink props onto its single child (Radix-style `asChild`), local to the atom so atoms
 * never import from molecules.
 * - Handlers compose: child's runs first; ours is skipped if the child called `preventDefault`.
 * - `className` concatenates, `style` merges (child wins per key), refs compose.
 * - Any other prop: the child's own value wins (it is the more specific caller), except keys listed
 *   in `force`, which always take the slot value (used for security / disabled enforcement).
 * - `renderChildren` receives the child's original children and returns the decorated content.
 */
export function renderLinkSlot(
  children: React.ReactNode,
  slotProps: AnyProps,
  ref: React.Ref<HTMLAnchorElement> | undefined,
  options: {
    renderChildren: (childChildren: React.ReactNode) => React.ReactNode;
    finalize: (merged: AnyProps) => AnyProps;
  },
): React.ReactElement {
  const child = React.Children.only(children);
  if (!isValidElement(child)) {
    throw new Error("Hyperlink with asChild expects a single React element child");
  }
  const childProps = child.props as AnyProps;
  const childRef = getElementRef(child);
  const merged: AnyProps = { ...childProps };

  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    if (slotValue === undefined) continue;
    if (/^on[A-Z]/.test(key) && typeof slotValue === "function") {
      merged[key] =
        typeof childValue === "function"
          ? (event: { defaultPrevented?: boolean }, ...args: unknown[]) => {
              (childValue as (...a: unknown[]) => void)(event, ...args);
              if (event && event.defaultPrevented) return;
              (slotValue as (...a: unknown[]) => void)(event, ...args);
            }
          : slotValue;
    } else if (key === "className") {
      merged[key] = [childValue, slotValue].filter(Boolean).join(" ") || undefined;
    } else if (key === "style") {
      merged[key] = { ...(slotValue as object), ...(childValue as object) };
    } else if (childValue === undefined) {
      merged[key] = slotValue;
    }
  }

  const finalProps = options.finalize(merged);
  finalProps.ref = (node: HTMLAnchorElement | null) => {
    setRef(ref, node);
    setRef(childRef as React.Ref<HTMLAnchorElement | null>, node);
  };
  delete finalProps.children;

  return cloneElement(
    child as React.ReactElement<AnyProps>,
    finalProps,
    options.renderChildren(childProps.children as React.ReactNode),
  );
}
