"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  TabsContentProps,
  TabsContextValue,
  TabsListLayout,
  TabsListProps,
  TabsProps,
  TabsTriggerAlign,
  TabsTriggerLayout,
  TabsTriggerProps,
} from "./Tabs.types";
import "./Tabs.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

function toCssLength(v: number | string | undefined): string | undefined {
  if (v === undefined) return undefined;
  return typeof v === "number" ? `${v}px` : v;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Tabs>`);
  }
  return ctx;
}

export const Tabs = React.memo(function Tabs({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  orientation = "horizontal",
  variant = "line",
  size = "md",
  listLayout = "wrap",
  activationMode = "automatic",
  contentAnimation = "fade",
  dividerColor,
  dividerWidth,
  indicatorColor,
  indicatorWidth,
  inactiveTextColor,
  activeTextColor,
  tabFontSize,
  triggerLayout = "inline",
  triggerAlign = "center",
  id: idProp,
  className,
  children,
  style,
  ...rest
}: TabsProps) {
  const reactId = useId();
  const baseId = idProp ?? `tabs-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== undefined;
  const [inner, setInner] = useState(defaultValue);
  const value = isControlled ? (valueProp as string) : inner;

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) {
        setInner(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const cssVars = useMemo(() => {
    const dw = toCssLength(dividerWidth);
    const iw = toCssLength(indicatorWidth);
    const tf = toCssLength(tabFontSize);
    return {
      ...(dividerColor != null && { "--tabs-divider-color": dividerColor }),
      ...(dw != null && { "--tabs-divider-width": dw }),
      ...(indicatorColor != null && { "--tabs-indicator-color": indicatorColor }),
      ...(iw != null && { "--tabs-indicator-width": iw }),
      ...(inactiveTextColor != null && { "--tabs-text-inactive": inactiveTextColor }),
      ...(activeTextColor != null && { "--tabs-text-active": activeTextColor }),
      ...(tf != null && { "--tabs-font-size": tf }),
    } as React.CSSProperties;
  }, [
    dividerColor,
    dividerWidth,
    indicatorColor,
    indicatorWidth,
    inactiveTextColor,
    activeTextColor,
    tabFontSize,
  ]);

  const ctx = useMemo(
    () => ({
      value,
      setValue,
      baseId,
      orientation,
      variant,
      size,
      listLayout,
      activationMode,
      triggerLayout,
      triggerAlign,
    }),
    [
      value,
      setValue,
      baseId,
      orientation,
      variant,
      size,
      listLayout,
      activationMode,
      triggerLayout,
      triggerAlign,
    ]
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div
        className={cls("ds-tabs", className)}
        data-orientation={orientation}
        data-variant={variant}
        data-size={size}
        data-list-layout={listLayout}
        data-content-animation={contentAnimation}
        data-activation-mode={activationMode}
        data-trigger-layout={triggerLayout}
        data-trigger-align={triggerAlign}
        style={{ ...cssVars, ...style }}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

function getAllTabButtons(listEl: HTMLElement | null): HTMLButtonElement[] {
  if (!listEl) return [];
  return Array.from(listEl.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
}

export const TabsList = React.memo(function TabsList({
  ariaLabel,
  className,
  children,
  onKeyDown,
  ...rest
}: TabsListProps) {
  const ctx = useTabsContext("TabsList");
  const listRef = useRef<HTMLDivElement>(null);
  const [segmentPill, setSegmentPill] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    visible: boolean;
  }>({ left: 0, top: 0, width: 0, height: 0, visible: false });

  const updateSegmentPill = useCallback(() => {
    const list = listRef.current;
    if (!list || ctx.variant !== "segmented") return;
    const active = list.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
    if (!active || active.getAttribute("data-disabled") === "true") {
      setSegmentPill((p) => ({ ...p, visible: false }));
      return;
    }
    const lr = list.getBoundingClientRect();
    const tr = active.getBoundingClientRect();
    setSegmentPill({
      left: tr.left - lr.left,
      top: tr.top - lr.top,
      width: tr.width,
      height: tr.height,
      visible: true,
    });
  }, [ctx.variant]);

  useLayoutEffect(() => {
    updateSegmentPill();
  }, [updateSegmentPill, ctx.value, children]);

  useLayoutEffect(() => {
    if (ctx.variant !== "segmented" || !listRef.current) return;
    const list = listRef.current;
    const ro = new ResizeObserver(() => updateSegmentPill());
    ro.observe(list);
    const onScrollOrResize = () => updateSegmentPill();
    list.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      ro.disconnect();
      list.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [ctx.variant, updateSegmentPill]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

      const tabs = getAllTabButtons(listRef.current);
      if (tabs.length === 0) return;

      const n = tabs.length;
      const active = document.activeElement as HTMLElement | null;
      let idx = tabs.indexOf(active as HTMLButtonElement);
      if (idx < 0) {
        idx = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      }
      if (idx < 0) idx = 0;

      const horizontal = ctx.orientation === "horizontal";
      const forwardKey = horizontal ? "ArrowRight" : "ArrowDown";
      const backKey = horizontal ? "ArrowLeft" : "ArrowUp";

      const focusAt = (i: number) => {
        const t = tabs[i];
        if (!t || t.disabled) return;
        t.focus();
        const v = t.dataset.tabValue;
        if (v && ctx.activationMode === "automatic") ctx.setValue(v);
      };

      const step = (delta: number) => {
        if (n === 0) return;
        let i = idx;
        for (let k = 0; k < n; k++) {
          i = (i + delta + n) % n;
          if (!tabs[i].disabled) {
            focusAt(i);
            return;
          }
        }
      };

      if (e.key === forwardKey) {
        e.preventDefault();
        step(1);
        return;
      }

      if (e.key === backKey) {
        e.preventDefault();
        step(-1);
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        for (let i = 0; i < n; i++) {
          if (!tabs[i].disabled) {
            focusAt(i);
            return;
          }
        }
        return;
      }

      if (e.key === "End") {
        e.preventDefault();
        for (let i = n - 1; i >= 0; i--) {
          if (!tabs[i].disabled) {
            focusAt(i);
            return;
          }
        }
      }
    },
    [ctx, onKeyDown]
  );

  const showSegmentPill = ctx.variant === "segmented";

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation={ctx.orientation}
      data-list-layout={ctx.listLayout}
      className={cls("ds-tabs__list", showSegmentPill && "ds-tabs__list--segmented", className)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {showSegmentPill ? (
        <span
          className="ds-tabs__segment-pill"
          aria-hidden="true"
          style={{
            left: segmentPill.left,
            top: segmentPill.top,
            width: segmentPill.width,
            height: segmentPill.height,
            opacity: segmentPill.visible ? 1 : 0,
          }}
        />
      ) : null}
      {children}
    </div>
  );
});

export const TabsTrigger = React.memo(function TabsTrigger({
  value,
  children,
  icon,
  className,
  disabled = false,
  type = "button",
  triggerLayout: triggerLayoutProp,
  triggerAlign: triggerAlignProp,
  onClick,
  onKeyDown,
  ...rest
}: TabsTriggerProps) {
  const ctx = useTabsContext("TabsTrigger");
  const selected = ctx.value === value;
  const tabId = `${ctx.baseId}-tab-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;
  const triggerLayout: TabsTriggerLayout = triggerLayoutProp ?? ctx.triggerLayout;
  const triggerAlign: TabsTriggerAlign = triggerAlignProp ?? ctx.triggerAlign;

  return (
    <button
      {...rest}
      type={type}
      role="tab"
      id={tabId}
      className={cls("ds-tabs__trigger", icon != null ? "ds-tabs__trigger--with-icon" : undefined, className)}
      data-trigger-layout={triggerLayout}
      data-trigger-align={triggerAlign}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      data-state={selected ? "active" : "inactive"}
      data-tab-value={value}
      data-disabled={disabled ? "true" : undefined}
      disabled={disabled}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.defaultPrevented || disabled) return;
        if (
          ctx.activationMode === "manual" &&
          (e.key === "Enter" || e.key === " " || e.code === "Space")
        ) {
          e.preventDefault();
          ctx.setValue(value);
        }
      }}
      onClick={(e) => {
        onClick?.(e);
        if (!disabled) ctx.setValue(value);
      }}
    >
      {icon != null ? (
        <span className="ds-tabs__trigger-icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="ds-tabs__trigger-text">{children}</span>
    </button>
  );
});

export const TabsContent = React.memo(function TabsContent({
  value,
  children,
  className,
  forceMount = false,
  ...rest
}: TabsContentProps) {
  const ctx = useTabsContext("TabsContent");
  const selected = ctx.value === value;

  if (!forceMount && !selected) {
    return null;
  }

  return (
    <div
      {...rest}
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-tab-${value}`}
      className={cls("ds-tabs__panel", className)}
      data-state={selected ? "active" : "inactive"}
      data-value={value}
      hidden={!selected}
      tabIndex={selected ? 0 : -1}
    >
      {children}
    </div>
  );
});

export default Tabs;

export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsContextValue,
  TabsActivationMode,
  TabsContentAnimation,
} from "./Tabs.types";
export type {
  TabsOrientation,
  TabsVariant,
  TabsSize,
  TabsListLayout,
  TabsTriggerLayout,
  TabsTriggerAlign,
} from "./Tabs.types";
