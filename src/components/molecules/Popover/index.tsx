"use client";

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type {
  DropdownMenuItemProps,
  PopoverContentProps,
  PopoverContextValue,
  PopoverProps,
  PopoverTriggerProps,
} from "./Popover.types";
import { computePopoverPosition } from "./popoverPosition";
import "./Popover.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Popover> or <DropdownMenu>`);
  }
  return ctx;
}

export const Popover = React.memo(function Popover({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
}: PopoverProps) {
  const reactId = useId();
  const base = reactId.replace(/:/g, "");
  const triggerId = `popover-trigger-${base}`;
  const contentId = `popover-content-${base}`;
  const triggerRef = useRef<HTMLElement | null>(null);
  const isControlled = openProp !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = isControlled ? Boolean(openProp) : innerOpen;
  const prevOpenRef = useRef(false);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInnerOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  useEffect(() => {
    if (prevOpenRef.current && !open && triggerRef.current) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
    prevOpenRef.current = open;
  }, [open]);

  const ctx = useMemo(
    () => ({
      open,
      setOpen,
      triggerId,
      contentId,
      triggerRef,
      placement,
    }),
    [open, setOpen, triggerId, contentId, placement]
  );

  return <PopoverContext.Provider value={ctx}>{children}</PopoverContext.Provider>;
});

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(function PopoverTrigger(
  { children, className, hasPopup = "dialog", type = "button", onClick, ...rest },
  ref
) {
  const ctx = usePopoverContext("PopoverTrigger");
  const open = ctx.open;

  const setRefs = useCallback(
    (el: HTMLButtonElement | null) => {
      ctx.triggerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ctx.triggerRef, ref]
  );

  return (
    <button
      {...rest}
      ref={setRefs}
      type={type}
      id={ctx.triggerId}
      className={cls(className)}
      aria-expanded={open}
      aria-controls={ctx.contentId}
      aria-haspopup={hasPopup}
      onClick={(e) => {
        onClick?.(e);
        ctx.setOpen(!open);
      }}
    >
      {children}
    </button>
  );
});

const ARROW_EDGE_PAD = 12;

export const PopoverContent = React.memo(function PopoverContent({
  children,
  className,
  role: roleProp,
  onKeyDown,
  style,
  showPointer = false,
  ...rest
}: PopoverContentProps) {
  const ctx = usePopoverContext("PopoverContent");
  const contentRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    width?: number;
    maxHeight?: number;
    arrowEdge?: "top" | "bottom";
    arrowX?: number;
  }>({
    top: 0,
    left: 0,
  });

  const updatePosition = useCallback(() => {
    const trigger = ctx.triggerRef.current;
    const panel = contentRef.current;
    if (!trigger || !panel || typeof window === "undefined") return;
    const tr = trigger.getBoundingClientRect();
    const cw = Math.max(panel.offsetWidth || 200, 200);
    const ch = Math.max(panel.offsetHeight || 80, 80);
    const result = computePopoverPosition(tr, cw, ch, ctx.placement);
    if (!showPointer) {
      setPos(result);
      return;
    }
    const below = result.top >= tr.bottom - 4;
    const triggerCx = tr.left + tr.width / 2;
    const panelW = result.width ?? cw;
    const arrowX = Math.min(
      Math.max(triggerCx - result.left, ARROW_EDGE_PAD),
      panelW - ARROW_EDGE_PAD
    );
    setPos({
      ...result,
      arrowEdge: below ? "top" : "bottom",
      arrowX,
    });
  }, [ctx.placement, ctx.triggerRef, showPointer]);

  useLayoutEffect(() => {
    if (!ctx.open) return;
    updatePosition();
    const id = requestAnimationFrame(() => updatePosition());
    return () => cancelAnimationFrame(id);
  }, [ctx.open, updatePosition]);

  useEffect(() => {
    if (!ctx.open) return;
    const onResize = () => updatePosition();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [ctx.open, updatePosition]);

  useEffect(() => {
    if (!ctx.open) return;
    const onDocMouse = (e: MouseEvent) => {
      const t = e.target as Node;
      if (ctx.triggerRef.current?.contains(t) || contentRef.current?.contains(t)) return;
      ctx.setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouse);
      document.removeEventListener("keydown", onKey);
    };
  }, [ctx]);

  useEffect(() => {
    if (!ctx.open || !contentRef.current) return;
    const el = contentRef.current.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    el?.focus();
  }, [ctx.open]);

  const role = roleProp ?? "dialog";

  if (!ctx.open) return null;

  const pointerStyle =
    showPointer && pos.arrowX != null
      ? ({ ["--popover-arrow-x" as string]: `${pos.arrowX}px` } as React.CSSProperties)
      : undefined;

  const content = (
    <div
      {...rest}
      ref={contentRef}
      id={ctx.contentId}
      role={role === "none" ? undefined : role}
      aria-modal={role === "dialog" ? false : undefined}
      aria-labelledby={ctx.triggerId}
      className={cls(
        "ds-popover__content",
        showPointer && "ds-popover__content--with-pointer",
        className
      )}
      data-arrow-edge={showPointer ? pos.arrowEdge : undefined}
      tabIndex={-1}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        maxHeight: showPointer ? undefined : pos.maxHeight,
        overflow: showPointer ? "visible" : "auto",
        zIndex: "var(--z-dropdown, 100)",
        ...pointerStyle,
        ...style,
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Escape") ctx.setOpen(false);
      }}
    >
      {showPointer ? (
        <div className="ds-popover__content-scroll" style={{ maxHeight: pos.maxHeight }}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
});

/** Same root as `Popover` — use for action menus (Delete, Resend, …). */
export const DropdownMenu = Popover;

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, Omit<PopoverTriggerProps, "hasPopup">>(
  function DropdownMenuTrigger(props, ref) {
    return <PopoverTrigger {...props} ref={ref} hasPopup="menu" />;
  }
);

export const DropdownMenuContent = React.memo(function DropdownMenuContent({
  children,
  className,
  onKeyDown,
  ...rest
}: Omit<PopoverContentProps, "role">) {
  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End") return;

      const root = e.currentTarget;
      const items = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not([disabled])'));
      if (items.length === 0) return;
      const i = items.indexOf(document.activeElement as HTMLButtonElement);
      let next = i;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        next = i < 0 ? 0 : (i + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        next = i < 0 ? items.length - 1 : (i - 1 + items.length) % items.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = items.length - 1;
      }
      items[next]?.focus();
    },
    [onKeyDown]
  );

  return (
    <PopoverContent
      {...rest}
      role="menu"
      aria-orientation="vertical"
      className={className}
      onKeyDown={handleMenuKeyDown}
    >
      {children}
    </PopoverContent>
  );
});

export const DropdownMenuItem = React.memo(function DropdownMenuItem({
  children,
  className,
  onSelect,
  variant = "default",
  disabled = false,
  onClick,
  type = "button",
  ...rest
}: DropdownMenuItemProps) {
  const ctx = usePopoverContext("DropdownMenuItem");

  return (
    <button
      {...rest}
      type={type}
      role="menuitem"
      disabled={disabled}
      className={cls(
        "ds-dropdown-menu__item",
        variant === "danger" && "ds-dropdown-menu__item--danger",
        className
      )}
      onClick={(e) => {
        onClick?.(e);
        if (disabled) return;
        onSelect?.();
        ctx.setOpen(false);
      }}
    >
      {children}
    </button>
  );
});

export default Popover;

export type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  DropdownMenuItemProps,
} from "./Popover.types";
export type { PopoverPlacement } from "./popoverPosition";
