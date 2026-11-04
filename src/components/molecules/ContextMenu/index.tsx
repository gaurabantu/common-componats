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
import {
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  PopoverContext,
  restoreFocus,
} from "../Popover";
import type { PopoverContextValue } from "../Popover/Popover.types";
import {
  FloatingLayerContext,
  isTopFloatingLayer,
  popFloatingLayer,
  pushFloatingLayer,
  resolveLayerZIndex,
  type LayerZIndex,
} from "../Popover/layering";
import { getMenuItems, handleMenuKeyNavigation } from "../Popover/menuNavigation";
import { renderSlot } from "../Popover/slot";
import { computeContextMenuPosition } from "./contextMenuPosition";
import type {
  ContextMenuContentProps,
  ContextMenuPosition,
  ContextMenuProps,
  ContextMenuTriggerProps,
} from "./ContextMenu.types";
import "./ContextMenu.css";

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

interface ContextMenuContextValue {
  open: boolean;
  /** `restore: false` = focus already moved elsewhere (click outside) — don't steal it back. */
  setOpen: (next: boolean, opts?: { restore?: boolean }) => void;
  position: ContextMenuPosition | undefined;
  setPosition: (p: ContextMenuPosition) => void;
  contentId: string;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  /** Element focused when the menu opened (trigger, grid cell…) — focus returns here. */
  returnFocusRef: React.MutableRefObject<HTMLElement | null>;
  disabled: boolean;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

function useContextMenu(component: string): ContextMenuContextValue {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) throw new Error(`${component} must be used within <ContextMenu>`);
  return ctx;
}

/**
 * ContextMenu — a menu that opens at the pointer.
 *
 * Declarative: wrap a region in `ContextMenuTrigger`; right-click (or Shift+F10 / the Menu key on
 * the focused trigger) opens `ContextMenuContent` at that point. Imperative: omit the trigger and
 * drive `open` + `position` yourself (e.g. a grid that resolves the cell first).
 * Items are the DropdownMenu parts (`ContextMenuItem` = `DropdownMenuItem`, etc.).
 */
export function ContextMenu({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  position: positionProp,
  disabled = false,
}: ContextMenuProps) {
  const base = useId().replace(/:/g, "");
  const contentId = `context-menu-${base}`;
  const isControlled = openProp !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = isControlled ? Boolean(openProp) : innerOpen;
  const [innerPosition, setInnerPosition] = useState<ContextMenuPosition | undefined>(undefined);
  const position = positionProp ?? innerPosition;
  const triggerRef = useRef<HTMLElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const restoreOnCloseRef = useRef(true);
  const prevOpenRef = useRef(false);

  const setOpen = useCallback(
    (next: boolean, opts?: { restore?: boolean }) => {
      if (!next) restoreOnCloseRef.current = opts?.restore !== false;
      if (!isControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  // Remember the invoking element in a layout effect — before the content's passive effect moves
  // focus into the menu.
  useLayoutEffect(() => {
    if (!prevOpenRef.current && open && typeof document !== "undefined") {
      if (!returnFocusRef.current) {
        const active = document.activeElement as HTMLElement | null;
        returnFocusRef.current = active && active !== document.body ? active : triggerRef.current;
      }
      restoreOnCloseRef.current = true;
    }
  }, [open]);

  // Return focus on keyboard / item close (not after a click elsewhere).
  useEffect(() => {
    if (prevOpenRef.current && !open) {
      const target = returnFocusRef.current;
      returnFocusRef.current = null;
      if (restoreOnCloseRef.current) requestAnimationFrame(() => restoreFocus(target));
    }
    prevOpenRef.current = open;
  }, [open]);

  const ctx = useMemo<ContextMenuContextValue>(
    () => ({
      open,
      setOpen,
      position,
      setPosition: setInnerPosition,
      contentId,
      triggerRef,
      returnFocusRef,
      disabled,
    }),
    [open, setOpen, position, contentId, disabled]
  );

  // Menu parts (DropdownMenuItem & co.) read the Popover context — bridge it.
  const anchorRef = returnFocusRef as React.RefObject<HTMLElement | null>;
  const popoverCtx = useMemo<PopoverContextValue>(
    () => ({
      open,
      setOpen: (next: boolean) => setOpen(next),
      triggerId: `${contentId}-trigger`,
      contentId,
      triggerRef,
      anchorRef,
      placement: "bottom-start",
    }),
    [open, setOpen, contentId, anchorRef]
  );

  return (
    <ContextMenuContext.Provider value={ctx}>
      <PopoverContext.Provider value={popoverCtx}>{children}</PopoverContext.Provider>
    </ContextMenuContext.Provider>
  );
}

ContextMenu.displayName = "ContextMenu";

/** Region that opens the menu on right-click, long-press emulation (contextmenu event), Shift+F10 or the Menu key. */
export const ContextMenuTrigger = forwardRef<HTMLElement, ContextMenuTriggerProps>(function ContextMenuTrigger(
  { children, asChild = false, disabled: disabledProp = false, onContextMenu, onKeyDown, ...rest },
  ref
) {
  const ctx = useContextMenu("ContextMenuTrigger");
  const disabled = disabledProp || ctx.disabled;

  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      ctx.triggerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    },
    [ctx.triggerRef, ref]
  );

  const openAt = (point: ContextMenuPosition, invoker: HTMLElement | null) => {
    ctx.setPosition(point);
    const active = typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null;
    ctx.returnFocusRef.current =
      active && active !== document.body && ctx.triggerRef.current?.contains(active)
        ? active
        : invoker ?? ctx.triggerRef.current;
    ctx.setOpen(true);
  };

  const handlers = {
    "data-state": ctx.open ? "open" : "closed",
    "aria-haspopup": "menu" as const,
    onContextMenu: (e: React.MouseEvent<HTMLElement>) => {
      onContextMenu?.(e);
      if (disabled || e.defaultPrevented) return;
      e.preventDefault();
      openAt({ x: e.clientX, y: e.clientY }, e.currentTarget);
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(e);
      if (disabled || e.defaultPrevented) return;
      if ((e.key === "F10" && e.shiftKey) || e.key === "ContextMenu") {
        e.preventDefault();
        const target = (e.target as HTMLElement) ?? e.currentTarget;
        const r = target.getBoundingClientRect();
        openAt({ x: r.left, y: r.bottom }, target);
      }
    },
  };

  if (asChild) {
    return renderSlot(children, { ...rest, ...handlers }, setRefs, "ContextMenuTrigger");
  }
  return (
    <div
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      {...handlers}
      ref={setRefs as React.Ref<HTMLDivElement>}
      className={cls("ds-context-menu__trigger", rest.className)}
    >
      {children}
    </div>
  );
});

/** The menu panel (`role="menu"`), portalled to `<body>` and clamped to the viewport. */
export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(function ContextMenuContent(
  {
    children,
    className,
    zIndex,
    collisionPadding = 8,
    style,
    onKeyDown,
    onMouseDownCapture,
    onContextMenu,
    ...rest
  },
  ref
) {
  const ctx = useContextMenu("ContextMenuContent");
  const { open, setOpen, position, contentId, triggerRef, returnFocusRef } = ctx;
  const contentRef = useRef<HTMLDivElement | null>(null);
  const insideTreeRef = useRef(false);
  const [placement, setPlacement] = useState<{ top: number; left: number; maxHeight: number } | null>(null);
  const [layerZ, setLayerZ] = useState<LayerZIndex>("var(--z-popover, 450)");

  const point = useMemo<ContextMenuPosition>(() => {
    if (position) return position;
    const r = triggerRef.current?.getBoundingClientRect();
    return r ? { x: r.left, y: r.bottom } : { x: 0, y: 0 };
    // `open` re-reads the trigger rect each time the menu opens without an explicit position.
  }, [position, open, triggerRef]);

  const measure = useCallback(() => {
    const panel = contentRef.current;
    if (!panel || typeof window === "undefined") return;
    const next = computeContextMenuPosition(
      point,
      panel.offsetWidth,
      panel.offsetHeight,
      { width: window.innerWidth, height: window.innerHeight },
      collisionPadding
    );
    setPlacement((prev) =>
      prev && prev.top === next.top && prev.left === next.left && prev.maxHeight === next.maxHeight ? prev : next
    );
  }, [point, collisionPadding]);

  useLayoutEffect(() => {
    if (!open) {
      setPlacement(null);
      return;
    }
    measure();
    if (zIndex === undefined) {
      setLayerZ(resolveLayerZIndex(returnFocusRef.current ?? triggerRef.current, undefined));
    }
  }, [open, measure, zIndex, returnFocusRef, triggerRef]);

  // Initial focus: first enabled item (or the panel itself).
  useEffect(() => {
    if (!open) return;
    const panel = contentRef.current;
    if (!panel) return;
    const first = getMenuItems(panel)[0];
    (first ?? panel).focus({ preventScroll: true });
  }, [open]);

  const parentLayerId = useContext(FloatingLayerContext);
  useEffect(() => {
    if (!open) return undefined;
    pushFloatingLayer(contentId, parentLayerId);
    return () => popFloatingLayer(contentId);
  }, [open, contentId, parentLayerId]);

  // Dismissal without a click-catcher element: document listeners only.
  useEffect(() => {
    if (!open) return undefined;
    const isInside = (t: EventTarget | null) => t instanceof Node && !!contentRef.current?.contains(t);
    const onMouseDown = (e: MouseEvent) => {
      const inside = insideTreeRef.current;
      insideTreeRef.current = false;
      if (inside || isInside(e.target)) return;
      setOpen(false, { restore: false });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.isComposing || e.defaultPrevented) return;
      if (!isTopFloatingLayer(contentId)) return;
      e.preventDefault();
      setOpen(false);
    };
    const onScroll = (e: Event) => {
      if (isInside(e.target)) return;
      setOpen(false, { restore: false });
    };
    const onBlurOrResize = () => setOpen(false, { restore: false });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey, true);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onBlurOrResize);
    window.addEventListener("blur", onBlurOrResize);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onBlurOrResize);
      window.removeEventListener("blur", onBlurOrResize);
    };
  }, [open, setOpen, contentId]);

  if (!open || typeof document === "undefined") return null;

  const label =
    rest["aria-label"] ?? (rest["aria-labelledby"] ? undefined : "Context menu");

  return createPortal(
    <div
      {...rest}
      ref={(el) => {
        contentRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      id={contentId}
      role="menu"
      aria-orientation="vertical"
      aria-label={label}
      tabIndex={-1}
      data-state="open"
      data-positioned={placement ? "true" : "false"}
      className={cls("ds-popover__content", "ds-context-menu__content", className)}
      style={{
        position: "fixed",
        top: placement?.top ?? point.y,
        left: placement?.left ?? point.x,
        maxHeight: placement?.maxHeight,
        overflow: "auto",
        zIndex: zIndex ?? layerZ,
        ...style,
      }}
      onMouseDownCapture={(e) => {
        insideTreeRef.current = true;
        onMouseDownCapture?.(e);
      }}
      onContextMenu={(e) => {
        onContextMenu?.(e);
        // Right-click inside the open menu shouldn't show the native menu on top of it.
        e.preventDefault();
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === "Escape") {
          e.preventDefault();
          setOpen(false);
          return;
        }
        if (e.key === "Tab") {
          e.preventDefault();
          setOpen(false);
          return;
        }
        handleMenuKeyNavigation(e);
      }}
    >
      <FloatingLayerContext.Provider value={contentId}>{children}</FloatingLayerContext.Provider>
    </div>,
    document.body
  );
});

/* Menu parts — same components as DropdownMenu, aliased for discoverability. */
export const ContextMenuItem = DropdownMenuItem;
export const ContextMenuCheckboxItem = DropdownMenuCheckboxItem;
export const ContextMenuRadioGroup = DropdownMenuRadioGroup;
export const ContextMenuRadioItem = DropdownMenuRadioItem;
export const ContextMenuLabel = DropdownMenuLabel;
export const ContextMenuSeparator = DropdownMenuSeparator;
export const ContextMenuGroup = DropdownMenuGroup;

export { computeContextMenuPosition } from "./contextMenuPosition";
export type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuPosition,
} from "./ContextMenu.types";

export default ContextMenu;
