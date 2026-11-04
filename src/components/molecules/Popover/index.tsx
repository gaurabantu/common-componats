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
  DropdownMenuCheckboxItemProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  ListboxOptionProps,
  ListboxProps,
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverContextValue,
  PopoverProps,
  PopoverTriggerProps,
} from "./Popover.types";
import { computePopoverPosition } from "./popoverPosition";
import {
  FloatingLayerContext,
  isTopFloatingLayer,
  popFloatingLayer,
  pushFloatingLayer,
  resolveLayerZIndex,
  type LayerZIndex,
} from "./layering";
import { handleMenuKeyNavigation, LISTBOX_OPTION_SELECTOR } from "./menuNavigation";
import { renderSlot } from "./slot";
import { useRipple } from "../../common/useRipple";
import "./Popover.css";

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** Inline-start padding for an indent level (base row padding + one spacing step per level). */
export function indentStyle(
  indent: number | undefined,
  style?: React.CSSProperties
): React.CSSProperties | undefined {
  if (!indent || indent <= 0) return style;
  return {
    paddingInlineStart: `calc(0.75rem + ${Math.floor(indent)} * var(--space-2, 16px))`,
    ...style,
  };
}

/**
 * Shared by Popover, DropdownMenu and ContextMenu — menu parts (items, labels, separators,
 * checkbox / radio items) work inside any root that provides it.
 */
export const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Popover>, <DropdownMenu> or <ContextMenu>`);
  }
  return ctx;
}

/** Focus `el` only when focus has not already moved somewhere meaningful (body / the closed panel). */
export function restoreFocus(el: HTMLElement | null | undefined) {
  if (!el || typeof document === "undefined" || !el.isConnected) return;
  const active = document.activeElement;
  if (active && active !== document.body && active !== document.documentElement && active.isConnected) return;
  el.focus();
}

export const Popover = React.memo(function Popover({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  anchorRef: anchorRefProp,
}: PopoverProps) {
  const reactId = useId();
  const base = reactId.replace(/:/g, "");
  const triggerId = `popover-trigger-${base}`;
  const contentId = `popover-content-${base}`;
  const triggerRef = useRef<HTMLElement | null>(null);
  const innerAnchorRef = useRef<HTMLElement | null>(null);
  const anchorRef = anchorRefProp ?? innerAnchorRef;
  const isControlled = openProp !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = isControlled ? Boolean(openProp) : innerOpen;
  const prevOpenRef = useRef(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInnerOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  // Capture the invoking element before PopoverContent's passive effect moves focus inside.
  useLayoutEffect(() => {
    if (!prevOpenRef.current && open && typeof document !== "undefined") {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
    }
  }, [open]);

  useEffect(() => {
    if (prevOpenRef.current && !open) {
      const target = triggerRef.current ?? returnFocusRef.current;
      requestAnimationFrame(() => restoreFocus(target));
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
      anchorRef,
      placement,
    }),
    [open, setOpen, triggerId, contentId, anchorRef, placement]
  );

  return <PopoverContext.Provider value={ctx}>{children}</PopoverContext.Provider>;
});

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(function PopoverTrigger(
  { children, className, hasPopup = "dialog", type = "button", onClick, asChild = false, ...rest },
  ref
) {
  const ctx = usePopoverContext("PopoverTrigger");
  const open = ctx.open;

  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      ctx.triggerRef.current = el;
      if (typeof ref === "function") ref(el as HTMLButtonElement | null);
      else if (ref) ref.current = el as HTMLButtonElement | null;
    },
    [ctx.triggerRef, ref]
  );

  if (asChild) {
    return renderSlot(
      children,
      {
        ...rest,
        className,
        id: ctx.triggerId,
        "aria-expanded": open,
        "aria-controls": open ? ctx.contentId : undefined,
        "aria-haspopup": hasPopup,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          ctx.setOpen(!open);
        },
      },
      setRefs,
      "PopoverTrigger"
    );
  }

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

/**
 * Positioning anchor other than the trigger (e.g. the whole field around an icon trigger,
 * or a grid cell). Renders a `<div>`, or merges onto its child with `asChild`.
 */
export const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>(function PopoverAnchor(
  { children, asChild = false, ...rest },
  ref
) {
  const ctx = usePopoverContext("PopoverAnchor");
  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      (ctx.anchorRef as React.MutableRefObject<HTMLElement | null>).current = el;
      if (typeof ref === "function") ref(el as HTMLDivElement | null);
      else if (ref) ref.current = el as HTMLDivElement | null;
    },
    [ctx.anchorRef, ref]
  );
  if (asChild) return renderSlot(children, rest, setRefs, "PopoverAnchor");
  return (
    <div {...rest} ref={setRefs}>
      {children}
    </div>
  );
});

const ARROW_EDGE_PAD = 12;

export const PopoverContent = React.memo(function PopoverContent({
  children,
  className,
  role: roleProp,
  onKeyDown,
  onMouseDownCapture,
  style,
  showPointer = true,
  zIndex,
  ...rest
}: PopoverContentProps) {
  const ctx = usePopoverContext("PopoverContent");
  const contentRef = useRef<HTMLDivElement>(null);
  /** Set by a mousedown that started inside this panel's React tree (incl. nested portals). */
  const insideTreeRef = useRef(false);
  const [layerZ, setLayerZ] = useState<LayerZIndex>("var(--z-popover, 450)");
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

  const { anchorRef, triggerRef, setOpen } = ctx;
  const getAnchor = useCallback(
    () => anchorRef.current ?? triggerRef.current,
    [anchorRef, triggerRef]
  );

  const updatePosition = useCallback(() => {
    const anchor = getAnchor();
    const panel = contentRef.current;
    if (!anchor || !panel || typeof window === "undefined") return;
    const tr = anchor.getBoundingClientRect();
    // Natural width (CSS min-width sets the floor) so short menus stay compact.
    const cw = panel.offsetWidth || 140;
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
  }, [ctx.placement, getAnchor, showPointer]);

  // Default layer: --z-popover, lifted above whatever stacked overlay the anchor lives in.
  useLayoutEffect(() => {
    if (!ctx.open || zIndex !== undefined) return;
    setLayerZ(resolveLayerZIndex(getAnchor(), undefined));
  }, [ctx.open, zIndex, getAnchor]);

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

  const layerId = ctx.contentId;
  const parentLayerId = useContext(FloatingLayerContext);
  useEffect(() => {
    if (!ctx.open) return undefined;
    pushFloatingLayer(layerId, parentLayerId);
    return () => popFloatingLayer(layerId);
  }, [ctx.open, layerId, parentLayerId]);

  useEffect(() => {
    if (!ctx.open) return;
    const onDocMouse = (e: MouseEvent) => {
      const inside = insideTreeRef.current;
      insideTreeRef.current = false;
      if (inside) return;
      const t = e.target as Node;
      if (
        triggerRef.current?.contains(t) ||
        anchorRef.current?.contains(t) ||
        contentRef.current?.contains(t)
      ) {
        return;
      }
      setOpen(false);
    };
    // Capture phase + preventDefault: an enclosing Modal / Drawer (which ignore handled Escapes)
    // stays open — one press closes one layer.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.isComposing || e.defaultPrevented) return;
      if (!isTopFloatingLayer(layerId)) return;
      e.preventDefault();
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouse);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDocMouse);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [ctx.open, setOpen, triggerRef, anchorRef, layerId]);

  useEffect(() => {
    if (!ctx.open || !contentRef.current) return;
    const el = contentRef.current.querySelector<HTMLElement>(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    el?.focus();
  }, [ctx.open]);

  const role = roleProp ?? "dialog";

  if (!ctx.open) return null;

  const pointerStyle =
    showPointer && pos.arrowX != null
      ? ({ ["--popover-arrow-x" as string]: `${pos.arrowX}px` } as React.CSSProperties)
      : undefined;

  const labelledBy =
    rest["aria-labelledby"] ?? (rest["aria-label"] || !triggerRef.current ? undefined : ctx.triggerId);

  const content = (
    <div
      {...rest}
      ref={contentRef}
      id={ctx.contentId}
      role={role === "none" ? undefined : role}
      aria-modal={role === "dialog" ? false : undefined}
      aria-labelledby={labelledBy}
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
        zIndex: zIndex ?? layerZ,
        ...pointerStyle,
        ...style,
      }}
      onMouseDownCapture={(e) => {
        insideTreeRef.current = true;
        onMouseDownCapture?.(e);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Escape" && !e.defaultPrevented) {
          e.preventDefault();
          setOpen(false);
        }
      }}
    >
      <FloatingLayerContext.Provider value={layerId}>
        {showPointer ? (
          <div className="ds-popover__content-scroll" style={{ maxHeight: pos.maxHeight }}>
            {children}
          </div>
        ) : (
          children
        )}
      </FloatingLayerContext.Provider>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
});

/* ============================================================================================
 * DropdownMenu
 * ========================================================================================== */

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
  showPointer = false,
  onKeyDown,
  ...rest
}: Omit<PopoverContentProps, "role">) {
  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      handleMenuKeyNavigation(e);
    },
    [onKeyDown]
  );

  return (
    <PopoverContent
      {...rest}
      showPointer={showPointer}
      role="menu"
      aria-orientation="vertical"
      className={className}
      onKeyDown={handleMenuKeyDown}
    >
      {children}
    </PopoverContent>
  );
});

interface MenuRowInternalProps extends Omit<DropdownMenuItemProps, "onSelect" | "closeOnSelect"> {
  itemRole: "menuitem" | "menuitemcheckbox" | "menuitemradio";
  checked?: boolean;
  indicator?: React.ReactNode;
  onActivate: () => void;
}

/** Shared row renderer for plain / checkbox / radio menu items. */
const MenuRow = forwardRef<HTMLButtonElement, MenuRowInternalProps>(function MenuRow(
  {
    children,
    className,
    variant = "default",
    disabled = false,
    ripple = true,
    onClick,
    type = "button",
    onPointerDown,
    icon,
    description,
    shortcut,
    indent = 0,
    itemRole,
    checked,
    indicator,
    onActivate,
    style,
    ...rest
  },
  ref
) {
  const rippleEnabled = ripple !== false && !disabled;
  const rippleApi = useRipple(rippleEnabled);
  const isCheckable = itemRole !== "menuitem";

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      role={itemRole}
      aria-checked={isCheckable ? Boolean(checked) : undefined}
      disabled={disabled}
      data-state={isCheckable ? (checked ? "checked" : "unchecked") : undefined}
      style={indentStyle(indent, style)}
      className={cls(
        "ds-dropdown-menu__item",
        variant === "danger" && "ds-dropdown-menu__item--danger",
        description != null && "ds-dropdown-menu__item--with-description",
        rippleEnabled && "ucs-ripple-parent",
        className
      )}
      onPointerDown={(e) => {
        rippleApi.onPointerDown(e);
        onPointerDown?.(e);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (disabled) return;
        onActivate();
      }}
    >
      {rippleApi.RippleOverlay}
      <span className="ds-dropdown-menu__item-inner">
        {isCheckable ? (
          <span className="ds-dropdown-menu__indicator" aria-hidden="true">
            {checked ? indicator : null}
          </span>
        ) : null}
        {icon != null ? (
          <span className="ds-dropdown-menu__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {description != null ? (
          <span className="ds-dropdown-menu__item-text">
            <span className="ds-dropdown-menu__item-label">{children}</span>
            <span className="ds-dropdown-menu__item-description">{description}</span>
          </span>
        ) : (
          children
        )}
        {shortcut != null ? (
          <span className="ds-dropdown-menu__item-shortcut" aria-hidden="true">
            {shortcut}
          </span>
        ) : null}
      </span>
    </button>
  );
});

const CheckIndicator = (
  <svg viewBox="0 0 16 16" width="14" height="14" focusable="false">
    <path
      d="M3.5 8.5l3 3 6-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RadioIndicator = (
  <svg viewBox="0 0 16 16" width="14" height="14" focusable="false">
    <circle cx="8" cy="8" r="3.5" fill="currentColor" />
  </svg>
);

export const DropdownMenuItem = React.memo(
  forwardRef<HTMLButtonElement, DropdownMenuItemProps>(function DropdownMenuItem(
    { onSelect, closeOnSelect = true, ...rest },
    ref
  ) {
    const ctx = usePopoverContext("DropdownMenuItem");
    return (
      <MenuRow
        {...rest}
        ref={ref}
        itemRole="menuitem"
        onActivate={() => {
          onSelect?.();
          if (closeOnSelect) ctx.setOpen(false);
        }}
      />
    );
  })
);

/** Toggle row (`role="menuitemcheckbox"`). Keeps the menu open by default. */
export const DropdownMenuCheckboxItem = React.memo(
  forwardRef<HTMLButtonElement, DropdownMenuCheckboxItemProps>(function DropdownMenuCheckboxItem(
    {
      checked: checkedProp,
      defaultChecked = false,
      onCheckedChange,
      onSelect,
      closeOnSelect = false,
      ...rest
    },
    ref
  ) {
    const ctx = usePopoverContext("DropdownMenuCheckboxItem");
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
        onActivate={() => {
          const next = !checked;
          if (!isControlled) setInner(next);
          onCheckedChange?.(next);
          onSelect?.();
          if (closeOnSelect) ctx.setOpen(false);
        }}
      />
    );
  })
);

interface RadioGroupContextValue {
  value: string | undefined;
  setValue: (v: string) => void;
}
const DropdownRadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/** `role="group"` wrapper; `label` renders a `DropdownMenuLabel` that names the group. */
export const DropdownMenuGroup = forwardRef<HTMLDivElement, DropdownMenuGroupProps>(function DropdownMenuGroup(
  { children, label, className, ...rest },
  ref
) {
  const labelId = `ds-menu-group-${useId().replace(/:/g, "")}`;
  return (
    <div
      {...rest}
      ref={ref}
      role="group"
      aria-labelledby={label != null ? labelId : rest["aria-labelledby"]}
      className={cls("ds-dropdown-menu__group", className)}
    >
      {label != null ? <DropdownMenuLabel id={labelId}>{label}</DropdownMenuLabel> : null}
      {children}
    </div>
  );
});

/** Single-choice group for `DropdownMenuRadioItem`s (`role="group"`). */
export const DropdownMenuRadioGroup = forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(
  function DropdownMenuRadioGroup(
    { children, value: valueProp, defaultValue, onValueChange, label, ...rest },
    ref
  ) {
    const isControlled = valueProp !== undefined;
    const [inner, setInner] = useState(defaultValue);
    const value = isControlled ? valueProp : inner;
    const setValue = useCallback(
      (v: string) => {
        if (!isControlled) setInner(v);
        onValueChange?.(v);
      },
      [isControlled, onValueChange]
    );
    const ctxValue = useMemo(() => ({ value, setValue }), [value, setValue]);
    return (
      <DropdownRadioGroupContext.Provider value={ctxValue}>
        <DropdownMenuGroup {...rest} ref={ref} label={label}>
          {children}
        </DropdownMenuGroup>
      </DropdownRadioGroupContext.Provider>
    );
  }
);

/** Choice row (`role="menuitemradio"`) — must be inside `DropdownMenuRadioGroup`. */
export const DropdownMenuRadioItem = React.memo(
  forwardRef<HTMLButtonElement, DropdownMenuRadioItemProps>(function DropdownMenuRadioItem(
    { value, onSelect, closeOnSelect = false, ...rest },
    ref
  ) {
    const ctx = usePopoverContext("DropdownMenuRadioItem");
    const group = useContext(DropdownRadioGroupContext);
    if (!group) throw new Error("DropdownMenuRadioItem must be used within <DropdownMenuRadioGroup>");
    return (
      <MenuRow
        {...rest}
        ref={ref}
        itemRole="menuitemradio"
        checked={group.value === value}
        indicator={RadioIndicator}
        onActivate={() => {
          group.setValue(value);
          onSelect?.();
          if (closeOnSelect) ctx.setOpen(false);
        }}
      />
    );
  })
);

/** Non-interactive heading row inside a menu. */
export const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(function DropdownMenuLabel(
  { children, className, indent = 0, style, ...rest },
  ref
) {
  return (
    <div
      {...rest}
      ref={ref}
      className={cls("ds-dropdown-menu__label", className)}
      style={indentStyle(indent, style)}
    >
      {children}
    </div>
  );
});

/** Horizontal rule between menu sections (`role="separator"`). */
export const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  function DropdownMenuSeparator({ className, ...rest }, ref) {
    return (
      <div
        {...rest}
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cls("ds-dropdown-menu__separator", className)}
      />
    );
  }
);

/* ============================================================================================
 * Listbox / ListboxOption — menu-row look for selection lists outside DropdownMenu
 * ========================================================================================== */

/**
 * `role="listbox"` container with roving focus (ArrowUp/Down, Home/End, typeahead) over its
 * `ListboxOption`s. Selection state is owned by the caller (`selected` on each option).
 */
export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(function Listbox(
  { children, className, multiple = false, onKeyDown, onFocus, ...rest },
  ref
) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Roving tabindex: exactly one option (focused, else selected, else first enabled) is tabbable.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const options = Array.from(root.querySelectorAll<HTMLElement>(LISTBOX_OPTION_SELECTOR));
    if (options.length === 0) return;
    const current = options.find((o) => o.getAttribute("tabindex") === "0");
    const target =
      current ?? options.find((o) => o.getAttribute("aria-selected") === "true") ?? options[0];
    for (const o of options) o.setAttribute("tabindex", o === target ? "0" : "-1");
  });

  return (
    <div
      {...rest}
      ref={(el) => {
        rootRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      role="listbox"
      aria-multiselectable={multiple || undefined}
      className={cls("ds-listbox", className)}
      onFocus={(e) => {
        onFocus?.(e);
        const root = rootRef.current;
        const t = e.target as HTMLElement;
        if (!root || t.getAttribute("role") !== "option") return;
        for (const o of Array.from(root.querySelectorAll<HTMLElement>('[role="option"]'))) {
          o.setAttribute("tabindex", o === t ? "0" : "-1");
        }
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        handleMenuKeyNavigation(e, LISTBOX_OPTION_SELECTOR);
      }}
    >
      {children}
    </div>
  );
});

/** Menu-row styled option: selected, disabled, secondary text, icon, trailing slot, indent level. */
export const ListboxOption = forwardRef<HTMLDivElement, ListboxOptionProps>(function ListboxOption(
  {
    children,
    className,
    selected = false,
    disabled = false,
    description,
    icon,
    trailing,
    indent = 0,
    onSelect,
    role = "option",
    onClick,
    onKeyDown,
    style,
    ...rest
  },
  ref
) {
  const activate = () => {
    if (!disabled) onSelect?.();
  };
  return (
    <div
      tabIndex={-1}
      {...rest}
      ref={ref}
      role={role}
      aria-selected={role === "menuitem" ? undefined : selected}
      aria-disabled={disabled || undefined}
      data-selected={selected ? "true" : undefined}
      style={indentStyle(indent, style)}
      className={cls(
        "ds-dropdown-menu__item",
        "ds-listbox__option",
        selected && "ds-listbox__option--selected",
        description != null && "ds-dropdown-menu__item--with-description",
        className
      )}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) activate();
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
    >
      <span className="ds-dropdown-menu__item-inner">
        {icon != null ? (
          <span className="ds-dropdown-menu__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className="ds-dropdown-menu__item-text">
          <span className="ds-dropdown-menu__item-label">{children}</span>
          {description != null ? (
            <span className="ds-dropdown-menu__item-description">{description}</span>
          ) : null}
        </span>
        {trailing != null ? <span className="ds-dropdown-menu__item-shortcut">{trailing}</span> : null}
      </span>
    </div>
  );
});

export default Popover;

export type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverContextValue,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuGroupProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  ListboxProps,
  ListboxOptionProps,
} from "./Popover.types";
export type { PopoverPlacement } from "./popoverPosition";
export {
  resolveLayerZIndex,
  getAncestorZIndex,
  pushFloatingLayer,
  popFloatingLayer,
  isTopFloatingLayer,
  DEFAULT_POPOVER_Z,
  DEFAULT_TOOLTIP_Z,
} from "./layering";
export type { LayerZIndex } from "./layering";
export { handleMenuKeyNavigation } from "./menuNavigation";
