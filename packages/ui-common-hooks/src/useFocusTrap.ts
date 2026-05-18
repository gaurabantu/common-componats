import { useEffect, useLayoutEffect, useRef } from "react";
import type * as React from "react";

const FOCUS_SELECTOR = [
  "a[href]",
  'input:not([disabled]):not([type="hidden"])',
  "textarea:not([disabled])",
  "button:not([disabled])",
  "select:not([disabled])",
  "[contenteditable]",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function isVisible(element: HTMLElement) {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

function visibleFocusChildren(root: HTMLElement) {
  const nodes = Array.from(root.querySelectorAll(FOCUS_SELECTOR)).filter(
    (candidate): candidate is HTMLElement =>
      candidate instanceof HTMLElement &&
      !candidate.closest("[data-focus-trap-skip]") &&
      isVisible(candidate)
  );
  return nodes;
}

function trapTabbing(event: KeyboardEvent, container: HTMLElement) {
  if (event.key !== "Tab") return;
  const doc = container.ownerDocument;
  const focusables = visibleFocusChildren(container);
  const active = doc.activeElement as HTMLElement | null;

  if (!focusables.length) {
    if (!container.hasAttribute("tabindex")) container.setAttribute("tabindex", "-1");
    event.preventDefault();
    container.focus();
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const index = active ? focusables.indexOf(active) : -1;

  if (!active || container === active || index === -1) {
    event.preventDefault();
    const target = event.shiftKey ? last : first;
    target.focus?.();
    return;
  }

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus?.();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus?.();
  }
}

export interface UseFocusTrapOptions {
  active: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  autoFocusFirst?: boolean;
  restoreFocus?: boolean;
}

/**
 * Focus scope for modal shells — keeps `Tab` / `Shift+Tab` within `containerRef`.
 * Use `[data-focus-trap-skip]` on decorative portals if they mount inside container but shouldn’t steal focus cues.
 *
 * Compose with {@link useDismissableLayer} for Escape/outside-dismiss semantics (`Modal`, `Popover`, menus).
 */
export function useFocusTrap(options: UseFocusTrapOptions): void {
  const { active, containerRef, autoFocusFirst = true, restoreFocus = true } = options;

  const previousActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (active && typeof document !== "undefined") {
      previousActive.current = document.activeElement as HTMLElement | null;
    }
  }, [active]);

  useLayoutEffect(() => {
    if (!active) return undefined;
    const container = containerRef.current;
    if (!(container instanceof HTMLElement)) return undefined;

    const doc = container.ownerDocument ?? document;

    const root = container;

    function onKeyDown(event: KeyboardEvent) {
      trapTabbing(event, root);
    }

    doc.addEventListener("keydown", onKeyDown, false);

    if (autoFocusFirst)
      queueMicrotask(() => {
        const picks = visibleFocusChildren(container);
        (picks[0] ?? container).focus?.();
      });

    return () => {
      doc.removeEventListener("keydown", onKeyDown, false);

      const previous = previousActive.current;

      const shouldRestore =
        restoreFocus &&
        !!previous?.focus &&
        previous.isConnected &&
        typeof doc !== "undefined";

      queueMicrotask(() => {
        if (shouldRestore) previous?.focus?.();
      });
    };
  }, [active, autoFocusFirst, containerRef, restoreFocus]);
}
