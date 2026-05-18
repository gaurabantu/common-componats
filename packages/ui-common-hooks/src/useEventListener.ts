import { RefObject, useEffect, useRef } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

type EventMap<T extends EventTarget> =
  T extends Window
    ? WindowEventMap
    : T extends Document
      ? DocumentEventMap
      : T extends HTMLElement
        ? HTMLElementEventMap
        : Record<string, Event>;

/**
 * Attach a typed event listener to any `EventTarget` — `window`, `document`,
 * a ref element, or a custom target — with automatic cleanup.
 *
 * @example
 * // Window-level keyboard shortcut
 * useEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
 *
 * @example
 * // Element-level scroll
 * const ref = useRef<HTMLDivElement>(null);
 * useEventListener("scroll", handleScroll, ref);
 */
export function useEventListener<
  K extends string,
  T extends EventTarget = Window,
>(
  eventName: K,
  handler: (event: T extends Window ? WindowEventMap[keyof WindowEventMap] : Event) => void,
  elementRef?: RefObject<T> | T | null,
  options?: boolean | AddEventListenerOptions
): void {
  const handlerRef = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const target: EventTarget | null =
      elementRef == null
        ? typeof window !== "undefined"
          ? window
          : null
        : "current" in (elementRef as RefObject<T>)
          ? (elementRef as RefObject<T>).current
          : (elementRef as T);

    if (!target) return;

    const listener = (event: Event) =>
      (handlerRef.current as (e: Event) => void)(event);

    target.addEventListener(eventName, listener, options);
    return () => target.removeEventListener(eventName, listener, options);
  }, [eventName, elementRef, options]);
}
