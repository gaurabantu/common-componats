"use client";

import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { TOOLTIP_DEFAULTS } from "./Tooltip.config";
import { computeTooltipPosition } from "./tooltipPosition";
import { DEFAULT_TOOLTIP_Z, resolveLayerZIndex, type LayerZIndex } from "../Popover/layering";
import type { TooltipProps, TooltipSide } from "./Tooltip.types";
import "./Tooltip.css";

export type {
  TooltipAlign,
  TooltipProps,
  TooltipSide,
  TooltipVariant,
} from "./Tooltip.types";
export { computeTooltipPosition, resolveTooltipSide } from "./tooltipPosition";

type AnyProps = Record<string, unknown>;
type Handler<E> = ((event: E) => void) | undefined;

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function compose<E>(theirs: Handler<E>, ours: (event: E) => void) {
  return (event: E) => {
    theirs?.(event);
    ours(event);
  };
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") ref(value);
  else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T>).current = value;
}

/** React 19 moved `ref` onto props; React 18 keeps it on the element. */
function getElementRef(element: React.ReactElement): React.Ref<unknown> | undefined {
  const major = parseInt(React.version, 10);
  if (major >= 19) return (element.props as AnyProps).ref as React.Ref<unknown> | undefined;
  return (element as unknown as { ref?: React.Ref<unknown> }).ref;
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Tooltip — supplementary description for any focusable trigger.
 *
 * WCAG 1.4.13: opens on hover **and** keyboard focus; Escape dismisses without moving focus or
 * pointer; the bubble itself is hoverable (pointer can move onto it); it stays open until hover and
 * focus have both left or the user dismisses it. `role="tooltip"` + `aria-describedby` on the trigger.
 * Not for interactive content — use `Popover` for links/buttons inside the overlay.
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  {
    children,
    content,
    side = TOOLTIP_DEFAULTS.side,
    align = TOOLTIP_DEFAULTS.align,
    delay = TOOLTIP_DEFAULTS.delay,
    closeDelay = TOOLTIP_DEFAULTS.closeDelay,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    maxWidth = TOOLTIP_DEFAULTS.maxWidth,
    variant = TOOLTIP_DEFAULTS.variant,
    zIndex,
    className,
    style,
    id: idProp,
    onPointerEnter: onBubblePointerEnter,
    onPointerLeave: onBubblePointerLeave,
    ...rest
  },
  forwardedRef,
) {
  const reactId = useId();
  const tooltipId = idProp ?? `ds-tooltip-${reactId.replace(/:/g, "")}`;
  const isControlled = openProp !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = !disabled && (isControlled ? Boolean(openProp) : innerOpen);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number; side: TooltipSide } | null>(null);
  /** Auto layer (only set when the trigger sits inside something stacked above --z-tooltip-top). */
  const [autoZ, setAutoZ] = useState<LayerZIndex | undefined>(undefined);

  const triggerRef = useRef<HTMLElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveringRef = useRef(false);
  const focusedRef = useRef(false);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => setMounted(true), []);

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (disabled && next) return;
      if (next === openRef.current) return;
      if (!isControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [disabled, isControlled, onOpenChange],
  );

  const scheduleOpen = useCallback(
    (ms: number) => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      if (openRef.current) return;
      if (ms <= 0) {
        if (openTimer.current) clearTimeout(openTimer.current);
        openTimer.current = null;
        setOpen(true);
        return;
      }
      if (openTimer.current) return;
      openTimer.current = setTimeout(() => {
        openTimer.current = null;
        setOpen(true);
      }, ms);
    },
    [setOpen],
  );

  /** Close only when neither hover nor focus keeps the tooltip alive (1.4.13 persistent). */
  const scheduleClose = useCallback(
    (ms: number) => {
      // Still hovered or focused elsewhere on the trigger/bubble: nothing to close.
      if (hoveringRef.current || focusedRef.current) return;
      if (openTimer.current) {
        clearTimeout(openTimer.current);
        openTimer.current = null;
      }
      if (closeTimer.current) clearTimeout(closeTimer.current);
      const run = () => {
        closeTimer.current = null;
        if (!hoveringRef.current && !focusedRef.current) setOpen(false);
      };
      if (ms <= 0) run();
      else closeTimer.current = setTimeout(run, ms);
    },
    [setOpen],
  );

  // Escape dismisses from anywhere without moving focus or requiring pointer movement (1.4.13 dismissable).
  // Capture phase + stopPropagation so only the top-most layer (this tooltip) is dismissed — an
  // enclosing Modal/Drawer stays open on the same key press.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.isComposing) return;
      event.preventDefault();
      event.stopPropagation();
      clearTimers();
      setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, clearTimers, setOpen]);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const bubble = bubbleRef.current;
    if (!trigger || !bubble || typeof window === "undefined") return;
    const r = trigger.getBoundingClientRect();
    const next = computeTooltipPosition(
      r,
      bubble.offsetWidth,
      bubble.offsetHeight,
      side,
      align,
      { width: window.innerWidth, height: window.innerHeight },
    );
    setPosition((prev) =>
      prev && prev.top === next.top && prev.left === next.left && prev.side === next.side ? prev : next,
    );
  }, [side, align]);

  useIsoLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      return undefined;
    }
    updatePosition();
    if (zIndex === undefined) {
      const z = resolveLayerZIndex(triggerRef.current, undefined, "--z-tooltip-top", DEFAULT_TOOLTIP_Z);
      setAutoZ(typeof z === "number" ? z : undefined);
    }
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition, content, zIndex]);

  const child = React.Children.only(children);
  if (!isValidElement(child)) return null;
  const childProps = child.props as AnyProps;
  const childRef = getElementRef(child);

  const describedBy = disabled
    ? (childProps["aria-describedby"] as string | undefined)
    : cls(childProps["aria-describedby"] as string | undefined, tooltipId) || undefined;

  const trigger = cloneElement(child as React.ReactElement<AnyProps>, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      setRef(childRef, node);
    },
    "aria-describedby": describedBy,
    onPointerEnter: compose<React.PointerEvent>(
      childProps.onPointerEnter as Handler<React.PointerEvent>,
      (event) => {
        if (event.pointerType === "touch") return;
        // Fallback for triggers that do not forward refs (e.g. React 18 + non-forwardRef components).
        triggerRef.current = (event.currentTarget as HTMLElement) ?? triggerRef.current;
        hoveringRef.current = true;
        scheduleOpen(delay);
      },
    ),
    onPointerLeave: compose<React.PointerEvent>(
      childProps.onPointerLeave as Handler<React.PointerEvent>,
      (event) => {
        if (event.pointerType === "touch") return;
        hoveringRef.current = false;
        scheduleClose(closeDelay);
      },
    ),
    onFocus: compose<React.FocusEvent>(childProps.onFocus as Handler<React.FocusEvent>, (event) => {
      triggerRef.current = (event.currentTarget as HTMLElement) ?? triggerRef.current;
      focusedRef.current = true;
      scheduleOpen(0);
    }),
    onBlur: compose<React.FocusEvent>(childProps.onBlur as Handler<React.FocusEvent>, () => {
      focusedRef.current = false;
      scheduleClose(hoveringRef.current ? closeDelay : 0);
    }),
  });

  const maxWidthValue = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;

  const bubble =
    mounted && !disabled
      ? createPortal(
          <div
            ref={(node) => {
              bubbleRef.current = node;
              setRef(forwardedRef, node);
            }}
            {...rest}
            id={tooltipId}
            role="tooltip"
            hidden={!open}
            className={cls("ds-tooltip", className)}
            data-variant={variant}
            data-side={position?.side ?? side}
            data-align={align}
            data-state={open ? "open" : "closed"}
            data-positioned={position ? "true" : "false"}
            style={{
              ...(zIndex !== undefined ? { zIndex } : autoZ !== undefined ? { zIndex: autoZ } : null),
              ...style,
              top: position?.top ?? 0,
              left: position?.left ?? 0,
              ["--ds-tooltip-max-width" as string]: maxWidthValue,
            }}
            onPointerEnter={(event) => {
              onBubblePointerEnter?.(event);
              hoveringRef.current = true;
              if (closeTimer.current) {
                clearTimeout(closeTimer.current);
                closeTimer.current = null;
              }
            }}
            onPointerLeave={(event) => {
              onBubblePointerLeave?.(event);
              hoveringRef.current = false;
              scheduleClose(closeDelay);
            }}
          >
            {content}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {trigger}
      {bubble}
    </>
  );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
