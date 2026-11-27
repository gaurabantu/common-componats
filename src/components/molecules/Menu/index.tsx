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
import Kbd, { toAriaKeyShortcuts, useIsMac } from "../../atoms/Kbd";
import { computePopoverPosition } from "../Popover/popoverPosition";
import {
  FloatingLayerContext,
  isTopFloatingLayer,
  popFloatingLayer,
  pushFloatingLayer,
  resolveLayerZIndex,
  type LayerZIndex,
} from "../Popover/layering";
import { renderSlot } from "../Popover/slot";
import { computeTooltipPosition } from "../Tooltip/tooltipPosition";
import { isSafeHref } from "../../../utils/safeHref";
import { MENU_DEFAULTS, SUBMENU_OPEN_DELAY, SUBMENU_OVERLAP, TYPEAHEAD_TIMEOUT } from "./Menu.config";
import { findTypeaheadIndex, getEnabledMenuItems, isPrintableKey } from "./Menu.utils";
import type {
  MenuCheckboxItemProps,
  MenuContentProps,
  MenuFocusIntent,
  MenuGroupProps,
  MenuItemProps,
  MenuLabelProps,
  MenuPlacement,
  MenuProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuSelectEvent,
  MenuSeparatorProps,
  MenuSubContentProps,
  MenuSubProps,
  MenuSubTriggerProps,
  MenuTriggerProps,
} from "./Menu.types";
import "./Menu.css";

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

function useStableId(prefix: string): string {
  return `${prefix}-${useId().replace(/:/g, "")}`;
}

type CloseReason = "escape" | "select" | "tab" | "outside" | "arrow";

/* ============================================================================================
 * Contexts
 * ========================================================================================== */

interface MenuRootContextValue {
  open: boolean;
  setOpen: (next: boolean, intent?: MenuFocusIntent) => void;
  /** Close the whole menu tree; returns focus to the trigger unless the user clicked elsewhere. */
  close: (reason: CloseReason) => void;
  triggerId: string;
  contentId: string;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  intentRef: React.MutableRefObject<MenuFocusIntent>;
}

/** Per-panel state: which submenu (if any) is open at this level. */
interface MenuLevelContextValue {
  openSubId: string | null;
  setOpenSubId: React.Dispatch<React.SetStateAction<string | null>>;
}

interface MenuSubContextValue {
  id: string;
  open: boolean;
  setOpen: (next: boolean, intent?: MenuFocusIntent) => void;
  triggerId: string;
  contentId: string;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  intentRef: React.MutableRefObject<MenuFocusIntent>;
}

const MenuRootContext = createContext<MenuRootContextValue | null>(null);
const MenuLevelContext = createContext<MenuLevelContextValue | null>(null);
const MenuSubContext = createContext<MenuSubContextValue | null>(null);
const MenuRadioContext = createContext<{ value: string | undefined; setValue: (v: string) => void } | null>(null);

function useMenuRoot(component: string): MenuRootContextValue {
  const ctx = useContext(MenuRootContext);
  if (!ctx) throw new Error(`${component} must be used within <Menu>`);
  return ctx;
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") ref(value);
  else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T>).current = value;
}

function focusEdge(panel: HTMLElement | null, edge: MenuFocusIntent) {
  if (!panel || edge === "none") return;
  const items = getEnabledMenuItems(panel);
  const target = edge === "last" ? items[items.length - 1] : items[0];
  (target ?? panel).focus({ preventScroll: true });
}

/* ============================================================================================
 * Menu (root) + MenuTrigger
 * ========================================================================================== */

/**
 * Menu — APG menu-button pattern. Compose `MenuTrigger` + `MenuContent` with `MenuItem`,
 * `MenuCheckboxItem`, `MenuRadioGroup`/`MenuRadioItem`, `MenuGroup`, `MenuLabel`, `MenuSeparator`
 * and nested `MenuSub` / `MenuSubTrigger` / `MenuSubContent`.
 */
export function Menu({ children, open: openProp, defaultOpen = false, onOpenChange }: MenuProps) {
  const triggerId = useStableId("ds-menu-trigger");
  const contentId = useStableId("ds-menu-content");
  const triggerRef = useRef<HTMLElement | null>(null);
  const intentRef = useRef<MenuFocusIntent>("first");
  const isControlled = openProp !== undefined;
  const [inner, setInner] = useState(defaultOpen);
  const open = isControlled ? Boolean(openProp) : inner;
  const prevOpen = useRef(open);

  const setOpen = useCallback(
    (next: boolean, intent: MenuFocusIntent = "first") => {
      intentRef.current = intent;
      if (!isControlled) setInner(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const close = useCallback(
    (reason: CloseReason) => {
      if (reason !== "outside") triggerRef.current?.focus({ preventScroll: true });
      setOpen(false);
    },
    [setOpen],
  );

  // Fallback restore (e.g. outside click on a non-focusable area left focus on <body>).
  useEffect(() => {
    if (prevOpen.current && !open && typeof window !== "undefined") {
      const el = triggerRef.current;
      const id = window.requestAnimationFrame(() => {
        const active = document.activeElement;
        if (el && el.isConnected && (!active || active === document.body)) el.focus({ preventScroll: true });
      });
      prevOpen.current = open;
      return () => window.cancelAnimationFrame(id);
    }
    prevOpen.current = open;
    return undefined;
  }, [open]);

  const value = useMemo<MenuRootContextValue>(
    () => ({ open, setOpen, close, triggerId, contentId, triggerRef, intentRef }),
    [open, setOpen, close, triggerId, contentId],
  );

  return <MenuRootContext.Provider value={value}>{children}</MenuRootContext.Provider>;
}

/** Button that opens the menu: click / Enter / Space / ArrowDown → first item, ArrowUp → last item. */
export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(function MenuTrigger(
  { children, asChild = false, onClick, onKeyDown, type = "button", className, ...rest },
  ref,
) {
  const ctx = useMenuRoot("MenuTrigger");
  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      ctx.triggerRef.current = el;
      setRef(ref as React.Ref<HTMLElement | null>, el);
    },
    [ctx.triggerRef, ref],
  );

  const triggerProps = {
    ...rest,
    id: rest.id ?? ctx.triggerId,
    "aria-haspopup": "menu" as const,
    "aria-expanded": ctx.open,
    "aria-controls": ctx.open ? ctx.contentId : undefined,
    "data-state": ctx.open ? "open" : "closed",
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      ctx.setOpen(!ctx.open, "first");
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        ctx.setOpen(true, "first");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        ctx.setOpen(true, "last");
      }
    },
  };

  if (asChild) {
    return renderSlot(children, { ...triggerProps, className }, setRefs, "MenuTrigger");
  }

  return (
    <button {...triggerProps} ref={setRefs} type={type} className={cls("ds-menu__trigger", className)}>
      {children}
    </button>
  );
});

/* ============================================================================================
 * Panel (shared by MenuContent and MenuSubContent)
 * ========================================================================================== */

interface MenuPanelProps extends Omit<MenuContentProps, "placement"> {
  kind: "root" | "sub";
  panelId: string;
  labelledById: string;
  anchorRef: React.MutableRefObject<HTMLElement | null>;
  intentRef: React.MutableRefObject<MenuFocusIntent>;
  placement?: MenuPlacement;
  onClose: (reason: CloseReason) => void;
}

function MenuPanel({
  kind,
  panelId,
  labelledById,
  anchorRef,
  intentRef,
  placement = MENU_DEFAULTS.placement,
  onClose,
  loop = MENU_DEFAULTS.loop,
  zIndex,
  children,
  className,
  style,
  onKeyDown,
  onMouseDownCapture,
  ...rest
}: MenuPanelProps) {
  const root = useMenuRoot("MenuContent");
  const panelRef = useRef<HTMLDivElement>(null);
  const insideTreeRef = useRef(false);
  const typeahead = useRef<{ buffer: string; timer?: ReturnType<typeof setTimeout> }>({ buffer: "" });
  const [openSubId, setOpenSubId] = useState<string | null>(null);
  const [layerZ, setLayerZ] = useState<LayerZIndex>("var(--z-popover, 450)");
  const [pos, setPos] = useState<{ top: number; left: number; maxHeight?: number; side?: string }>({
    top: 0,
    left: 0,
  });
  const parentLayerId = useContext(FloatingLayerContext);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const panel = panelRef.current;
    if (!anchor || !panel || typeof window === "undefined") return;
    const r = anchor.getBoundingClientRect();
    const w = panel.offsetWidth || 160;
    const h = panel.offsetHeight || 80;
    if (kind === "root") {
      const res = computePopoverPosition(r, w, h, placement);
      setPos({ top: res.top, left: res.left, maxHeight: res.maxHeight, side: res.top < r.top ? "top" : "bottom" });
      return;
    }
    const vp = { width: window.innerWidth, height: window.innerHeight };
    const res = computeTooltipPosition(r, w, h, "right", "start", vp);
    const left =
      res.side === "right" ? res.left - SUBMENU_OVERLAP * 3 : res.side === "left" ? res.left + SUBMENU_OVERLAP * 3 : res.left;
    setPos({ top: res.top - SUBMENU_OVERLAP, left, maxHeight: vp.height - 16, side: res.side });
  }, [anchorRef, kind, placement]);

  useLayoutEffect(() => {
    setLayerZ(resolveLayerZIndex(anchorRef.current, zIndex));
    updatePosition();
    const id = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(id);
  }, [anchorRef, zIndex, updatePosition]);

  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [updatePosition]);

  // Floating-layer stack: one Escape closes only the innermost open menu.
  useEffect(() => {
    pushFloatingLayer(panelId, parentLayerId);
    return () => popFloatingLayer(panelId);
  }, [panelId, parentLayerId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.isComposing || e.defaultPrevented) return;
      if (!isTopFloatingLayer(panelId)) return;
      // Capture phase + preventDefault: a host Modal / Drawer ignores the handled Escape.
      e.preventDefault();
      onCloseRef.current("escape");
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [panelId]);

  // Outside press closes the whole tree (root only — submenu presses bubble to the root through portals).
  useEffect(() => {
    if (kind !== "root") return undefined;
    const onDown = (e: MouseEvent) => {
      const inside = insideTreeRef.current;
      insideTreeRef.current = false;
      if (inside) return;
      const t = e.target as Node;
      if (anchorRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      onCloseRef.current("outside");
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [kind, anchorRef]);

  useEffect(() => {
    focusEdge(panelRef.current, intentRef.current);
    const ta = typeahead.current;
    return () => {
      if (ta.timer) clearTimeout(ta.timer);
    };
  }, [intentRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const panel = panelRef.current;
    // Keys from a submenu bubble here through the portal — only handle our own rows.
    if (!panel || (e.target as HTMLElement).closest('[role="menu"]') !== panel) return;
    const items = getEnabledMenuItems(panel);
    const current = items.indexOf(document.activeElement as HTMLElement);
    const focusAt = (i: number) => items[i]?.focus({ preventScroll: false });

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        if (items.length === 0) return;
        const next = current < 0 ? 0 : current + 1;
        focusAt(next >= items.length ? (loop ? 0 : items.length - 1) : next);
        return;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (items.length === 0) return;
        const prev = current < 0 ? items.length - 1 : current - 1;
        focusAt(prev < 0 ? (loop ? items.length - 1 : 0) : prev);
        return;
      }
      case "Home":
      case "PageUp":
        e.preventDefault();
        focusAt(0);
        return;
      case "End":
      case "PageDown":
        e.preventDefault();
        focusAt(items.length - 1);
        return;
      case "Tab":
        // Menus are not tab stops: Tab closes the whole menu and returns focus to the trigger.
        e.preventDefault();
        root.close("tab");
        return;
      case "ArrowLeft":
        if (kind === "sub") {
          e.preventDefault();
          onClose("arrow");
        }
        return;
      default: {
        if (!isPrintableKey(e)) return;
        const t = e.target as HTMLElement;
        if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;
        const ta = typeahead.current;
        ta.buffer += e.key;
        if (ta.timer) clearTimeout(ta.timer);
        ta.timer = setTimeout(() => {
          ta.buffer = "";
        }, TYPEAHEAD_TIMEOUT);
        const match = findTypeaheadIndex(items, ta.buffer, current);
        if (match >= 0) {
          e.preventDefault();
          focusAt(match);
        }
      }
    }
  };

  const levelValue = useMemo(() => ({ openSubId, setOpenSubId }), [openSubId]);
  const ariaLabel = rest["aria-label"];

  const panel = (
    <div
      {...rest}
      ref={panelRef}
      id={panelId}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={ariaLabel ? rest["aria-labelledby"] : (rest["aria-labelledby"] ?? labelledById)}
      tabIndex={-1}
      className={cls("ds-menu", kind === "sub" && "ds-menu--sub", className)}
      data-side={pos.side}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        maxHeight: pos.maxHeight,
        zIndex: zIndex ?? layerZ,
        ...style,
      }}
      onMouseDownCapture={(e) => {
        insideTreeRef.current = true;
        onMouseDownCapture?.(e);
      }}
      onKeyDown={handleKeyDown}
    >
      <FloatingLayerContext.Provider value={panelId}>
        <MenuLevelContext.Provider value={levelValue}>{children}</MenuLevelContext.Provider>
      </FloatingLayerContext.Provider>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(panel, document.body);
}

/** The menu panel (`role="menu"`), portalled to `document.body`, positioned against the trigger with flip. */
export function MenuContent({ placement = MENU_DEFAULTS.placement, ...props }: MenuContentProps) {
  const root = useMenuRoot("MenuContent");
  if (!root.open) return null;
  return (
    <MenuPanel
      {...props}
      kind="root"
      panelId={root.contentId}
      labelledById={root.triggerId}
      anchorRef={root.triggerRef}
      intentRef={root.intentRef}
      placement={placement}
      onClose={root.close}
    />
  );
}

/* ============================================================================================
 * Rows
 * ========================================================================================== */

const CheckIndicator = (
  <svg viewBox="0 0 16 16" width="14" height="14" focusable="false">
    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RadioIndicator = (
  <svg viewBox="0 0 16 16" width="14" height="14" focusable="false">
    <circle cx="8" cy="8" r="3.5" fill="currentColor" />
  </svg>
);

const ChevronRight = (
  <svg viewBox="0 0 16 16" width="14" height="14" focusable="false">
    <path d="M6 3.5L10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface MenuRowProps extends Omit<MenuItemProps, "onSelect" | "closeOnSelect"> {
  itemRole: "menuitem" | "menuitemcheckbox" | "menuitemradio";
  checked?: boolean;
  indicator?: React.ReactNode;
  /** Sub-trigger wiring. */
  sub?: { id: string; open: boolean; contentId: string; triggerId: string };
  trailing?: React.ReactNode;
  onActivate: (event: MenuSelectEvent) => void;
}

const MenuRow = forwardRef<HTMLElement, MenuRowProps>(function MenuRow(
  {
    children,
    itemRole,
    checked,
    indicator,
    sub,
    trailing,
    onActivate,
    variant = MENU_DEFAULTS.variant,
    disabled = false,
    icon,
    description,
    shortcut,
    textValue,
    href,
    target,
    rel,
    className,
    onClick,
    onKeyDown,
    onPointerMove,
    onFocus,
    ...rest
  },
  ref,
) {
  const level = useContext(MenuLevelContext);
  const isMac = useIsMac("auto");
  const keys = Array.isArray(shortcut) && shortcut.every((k) => typeof k === "string") ? (shortcut as string[]) : null;
  const linkHref = href && !disabled && isSafeHref(href) ? href : undefined;
  const isCheckable = itemRole !== "menuitem";
  const typeaheadText = textValue ?? (typeof children === "string" ? children : undefined);

  const common = {
    ...rest,
    role: itemRole,
    tabIndex: -1,
    "aria-disabled": disabled || undefined,
    "aria-checked": isCheckable ? Boolean(checked) : undefined,
    "aria-haspopup": sub ? ("menu" as const) : undefined,
    "aria-expanded": sub ? sub.open : undefined,
    "aria-controls": sub && sub.open ? sub.contentId : undefined,
    "aria-keyshortcuts": keys ? toAriaKeyShortcuts(keys, isMac) : undefined,
    id: sub ? sub.triggerId : rest.id,
    "data-text-value": typeaheadText,
    "data-variant": variant,
    "data-disabled": disabled ? "true" : undefined,
    "data-state": isCheckable ? (checked ? "checked" : "unchecked") : sub ? (sub.open ? "open" : "closed") : undefined,
    className: cls("ds-menu__item", className),
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      onClick?.(e as React.MouseEvent<never>);
      if (e.defaultPrevented) return;
      if (disabled) {
        e.preventDefault();
        return;
      }
      onActivate(e);
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(e as React.KeyboardEvent<never>);
      if (e.defaultPrevented) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!disabled) e.currentTarget.click();
      }
    },
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      onPointerMove?.(e as React.PointerEvent<never>);
      if (e.pointerType === "touch" || disabled) return;
      if (document.activeElement !== e.currentTarget) e.currentTarget.focus({ preventScroll: true });
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      onFocus?.(e as React.FocusEvent<never>);
      // Moving to another row closes a sibling submenu.
      if (level && level.openSubId && level.openSubId !== sub?.id) level.setOpenSubId(null);
    },
  };

  const body = (
    <>
      {isCheckable ? (
        <span className="ds-menu__indicator" aria-hidden="true">
          {checked ? indicator : null}
        </span>
      ) : null}
      {icon != null ? (
        <span className="ds-menu__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="ds-menu__label">
        <span className="ds-menu__label-text">{children}</span>
        {description != null ? <span className="ds-menu__description">{description}</span> : null}
      </span>
      {shortcut != null ? (
        <span className="ds-menu__shortcut" aria-hidden="true">
          {keys ? <Kbd keys={keys} size="sm" /> : shortcut}
        </span>
      ) : null}
      {trailing}
    </>
  );

  if (linkHref) {
    return (
      <a
        {...(common as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={linkHref}
        target={target}
        rel={target === "_blank" ? cls(rel, "noopener noreferrer") : rel}
      >
        {body}
      </a>
    );
  }

  return (
    <div {...(common as React.HTMLAttributes<HTMLDivElement>)} ref={ref as React.Ref<HTMLDivElement>}>
      {body}
    </div>
  );
});

/** Action row (`role="menuitem"`). `href` renders a link row. */
export const MenuItem = forwardRef<HTMLElement, MenuItemProps>(function MenuItem(
  { onSelect, closeOnSelect = true, ...rest },
  ref,
) {
  const root = useMenuRoot("MenuItem");
  return (
    <MenuRow
      {...rest}
      ref={ref}
      itemRole="menuitem"
      onActivate={(e) => {
        onSelect?.(e);
        if (closeOnSelect && !e.defaultPrevented) root.close("select");
      }}
    />
  );
});

/** Toggle row (`role="menuitemcheckbox"`). Keeps the menu open by default. */
export const MenuCheckboxItem = forwardRef<HTMLElement, MenuCheckboxItemProps>(function MenuCheckboxItem(
  { checked: checkedProp, defaultChecked = false, onCheckedChange, onSelect, closeOnSelect = false, ...rest },
  ref,
) {
  const root = useMenuRoot("MenuCheckboxItem");
  const isControlled = checkedProp !== undefined;
  const [inner, setInner] = useState(defaultChecked);
  const checked = isControlled ? Boolean(checkedProp) : inner;
  return (
    <MenuRow
      {...rest}
      ref={ref}
      itemRole="menuitemcheckbox"
      checked={checked}
      indicator={CheckIndicator}
      onActivate={(e) => {
        const next = !checked;
        if (!isControlled) setInner(next);
        onCheckedChange?.(next);
        onSelect?.(e);
        if (closeOnSelect && !e.defaultPrevented) root.close("select");
      }}
    />
  );
});

/** Single-choice group (`role="group"`) for `MenuRadioItem`s. */
export const MenuRadioGroup = forwardRef<HTMLDivElement, MenuRadioGroupProps>(function MenuRadioGroup(
  { children, value: valueProp, defaultValue, onValueChange, label, ...rest },
  ref,
) {
  const isControlled = valueProp !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const value = isControlled ? valueProp : inner;
  const setValue = useCallback(
    (v: string) => {
      if (!isControlled) setInner(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange],
  );
  const ctx = useMemo(() => ({ value, setValue }), [value, setValue]);
  return (
    <MenuRadioContext.Provider value={ctx}>
      <MenuGroup {...rest} ref={ref} label={label}>
        {children}
      </MenuGroup>
    </MenuRadioContext.Provider>
  );
});

/** Choice row (`role="menuitemradio"`) inside `MenuRadioGroup`. Keeps the menu open by default. */
export const MenuRadioItem = forwardRef<HTMLElement, MenuRadioItemProps>(function MenuRadioItem(
  { value, onSelect, closeOnSelect = false, ...rest },
  ref,
) {
  const root = useMenuRoot("MenuRadioItem");
  const group = useContext(MenuRadioContext);
  if (!group) throw new Error("MenuRadioItem must be used within <MenuRadioGroup>");
  return (
    <MenuRow
      {...rest}
      ref={ref}
      itemRole="menuitemradio"
      checked={group.value === value}
      indicator={RadioIndicator}
      onActivate={(e) => {
        group.setValue(value);
        onSelect?.(e);
        if (closeOnSelect && !e.defaultPrevented) root.close("select");
      }}
    />
  );
});

/** `role="group"`; `label` renders a `MenuLabel` that names the group. */
export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(function MenuGroup(
  { children, label, className, ...rest },
  ref,
) {
  const labelId = useStableId("ds-menu-group");
  return (
    <div
      {...rest}
      ref={ref}
      role="group"
      aria-labelledby={label != null ? labelId : rest["aria-labelledby"]}
      className={cls("ds-menu__group", className)}
    >
      {label != null ? <MenuLabel id={labelId}>{label}</MenuLabel> : null}
      {children}
    </div>
  );
});

/** Non-interactive heading row. */
export const MenuLabel = forwardRef<HTMLDivElement, MenuLabelProps>(function MenuLabel({ className, ...rest }, ref) {
  return <div {...rest} ref={ref} className={cls("ds-menu__group-label", className)} />;
});

/** Divider between sections (`role="separator"`). */
export const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(function MenuSeparator(
  { className, ...rest },
  ref,
) {
  return (
    <div {...rest} ref={ref} role="separator" aria-orientation="horizontal" className={cls("ds-menu__separator", className)} />
  );
});

/* ============================================================================================
 * Submenus
 * ========================================================================================== */

/** Wraps a `MenuSubTrigger` + `MenuSubContent` pair. Only one submenu per level is open at a time. */
export function MenuSub({ children }: MenuSubProps) {
  const level = useContext(MenuLevelContext);
  if (!level) throw new Error("MenuSub must be used within <MenuContent> or <MenuSubContent>");
  const id = useStableId("ds-menu-sub");
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;
  const triggerRef = useRef<HTMLElement | null>(null);
  const intentRef = useRef<MenuFocusIntent>("first");
  const open = level.openSubId === id;
  const { setOpenSubId } = level;

  const setOpen = useCallback(
    (next: boolean, intent: MenuFocusIntent = "first") => {
      intentRef.current = intent;
      setOpenSubId((current) => (next ? id : current === id ? null : current));
    },
    [id, setOpenSubId],
  );

  const value = useMemo(
    () => ({ id, open, setOpen, triggerId, contentId, triggerRef, intentRef }),
    [id, open, setOpen, triggerId, contentId],
  );
  return <MenuSubContext.Provider value={value}>{children}</MenuSubContext.Provider>;
}

/** Row that opens a submenu: ArrowRight / Enter / Space (focus first child), or hover. */
export const MenuSubTrigger = forwardRef<HTMLElement, MenuSubTriggerProps>(function MenuSubTrigger(
  { onKeyDown, onPointerEnter, onPointerLeave, disabled = false, ...rest },
  ref,
) {
  const sub = useContext(MenuSubContext);
  if (!sub) throw new Error("MenuSubTrigger must be used within <MenuSub>");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const openWithFocus = () => {
    if (sub.open) focusEdge(document.getElementById(sub.contentId), "first");
    else sub.setOpen(true, "first");
  };

  return (
    <MenuRow
      {...rest}
      ref={(el: HTMLElement | null) => {
        sub.triggerRef.current = el;
        setRef(ref as React.Ref<HTMLElement | null>, el);
      }}
      disabled={disabled}
      itemRole="menuitem"
      sub={{ id: sub.id, open: sub.open, contentId: sub.contentId, triggerId: sub.triggerId }}
      trailing={
        <span className="ds-menu__chevron" aria-hidden="true">
          {ChevronRight}
        </span>
      }
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented || disabled) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          openWithFocus();
        }
      }}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        if (disabled || e.pointerType === "touch") return;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => sub.setOpen(true, "none"), SUBMENU_OPEN_DELAY);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        clearTimeout(timer.current);
      }}
      onActivate={(e) => {
        // Keyboard (Enter / Space → synthetic click, detail 0) moves focus in; a pointer click just opens.
        const keyboard = (e.nativeEvent as MouseEvent).detail === 0;
        if (keyboard) openWithFocus();
        else sub.setOpen(true, "none");
      }}
    />
  );
});

/** Submenu panel; opens beside its trigger (flips to the other side when there is no room). */
export function MenuSubContent(props: MenuSubContentProps) {
  const sub = useContext(MenuSubContext);
  if (!sub) throw new Error("MenuSubContent must be used within <MenuSub>");
  if (!sub.open) return null;
  return (
    <MenuPanel
      {...props}
      kind="sub"
      panelId={sub.contentId}
      labelledById={sub.triggerId}
      anchorRef={sub.triggerRef}
      intentRef={sub.intentRef}
      onClose={(reason) => {
        sub.setOpen(false);
        if (reason === "escape" || reason === "arrow") sub.triggerRef.current?.focus({ preventScroll: true });
      }}
    />
  );
}

/* ============================================================================================
 * Display names, aliases, exports
 * ========================================================================================== */

Menu.displayName = "Menu";
MenuTrigger.displayName = "MenuTrigger";
MenuContent.displayName = "MenuContent";
MenuItem.displayName = "MenuItem";
MenuCheckboxItem.displayName = "MenuCheckboxItem";
MenuRadioGroup.displayName = "MenuRadioGroup";
MenuRadioItem.displayName = "MenuRadioItem";
MenuGroup.displayName = "MenuGroup";
MenuLabel.displayName = "MenuLabel";
MenuSeparator.displayName = "MenuSeparator";
MenuSub.displayName = "MenuSub";
MenuSubTrigger.displayName = "MenuSubTrigger";
MenuSubContent.displayName = "MenuSubContent";

/**
 * `DropdownMenu*` aliases of the Menu parts (import from this module). The package barrel already
 * exports a different `DropdownMenu` (Popover-based) under these names — do not mix the two families.
 */
export {
  Menu as DropdownMenu,
  MenuTrigger as DropdownMenuTrigger,
  MenuContent as DropdownMenuContent,
  MenuItem as DropdownMenuItem,
  MenuCheckboxItem as DropdownMenuCheckboxItem,
  MenuRadioGroup as DropdownMenuRadioGroup,
  MenuRadioItem as DropdownMenuRadioItem,
  MenuGroup as DropdownMenuGroup,
  MenuLabel as DropdownMenuLabel,
  MenuSeparator as DropdownMenuSeparator,
  MenuSub as DropdownMenuSub,
  MenuSubTrigger as DropdownMenuSubTrigger,
  MenuSubContent as DropdownMenuSubContent,
};

export default Menu;
export type {
  MenuProps,
  MenuTriggerProps,
  MenuContentProps,
  MenuItemProps,
  MenuItemVariant,
  MenuCheckboxItemProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuGroupProps,
  MenuLabelProps,
  MenuSeparatorProps,
  MenuSubProps,
  MenuSubTriggerProps,
  MenuSubContentProps,
  MenuPlacement,
  MenuSelectEvent,
  MenuFocusIntent,
} from "./Menu.types";
