"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../atoms/Button";
import { ALERT_SR_PREFIX, getAlertIcon, getCloseIcon, getToneStyle } from "../Alert/Alert.config";
import { TOAST_DEFAULTS, TOAST_EXIT_MS, TOAST_HOTKEY } from "./Toast.config";
import { isDocumentHidden, nextToastId, prefersReducedMotion } from "./Toast.utils";
import type { ToastContextValue, ToastOptions, ToastProps, ToastProviderProps } from "./Toast.types";
import "../Alert/Alert.css";
import "./Toast.css";

/* -------------------------------------------------------------------------------------------------
 * Toast — presentational
 * -----------------------------------------------------------------------------------------------*/

/**
 * Toast — a single transient notification card. Usually rendered by `ToastProvider` via
 * `useToast().toast(...)`; exported for static previews and custom stacks.
 * Announcement: non-danger toasts carry no live role — they are announced by the always-mounted
 * polite region in `ToastProvider` (a live region must exist before content is inserted into it).
 * `danger` toasts are `role="alert"`: alert insertion is announced reliably on its own and, being its
 * own (assertive) live root, it is not re-announced by the polite ancestor.
 * A standalone `Toast` outside the provider is therefore silent unless it is `danger`.
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    title,
    description,
    variant = TOAST_DEFAULTS.variant,
    action,
    dismissible = TOAST_DEFAULTS.dismissible,
    onDismiss,
    dismissLabel = TOAST_DEFAULTS.dismissLabel,
    srPrefix = true,
    className,
    style,
    ...rest
  },
  ref,
) {
  const live = variant === "danger" ? { role: "alert" as const, "aria-atomic": "true" as const } : {};
  return (
    <div
      ref={ref}
      className={["ds-toast", className].filter(Boolean).join(" ")}
      data-variant={variant}
      style={{ ...getToneStyle(variant), ...style }}
      {...live}
      {...rest}
    >
      <span className="ds-toast__icon" aria-hidden="true">
        {getAlertIcon(variant)}
      </span>
      <div className="ds-toast__body">
        <p className="ds-toast__title">
          {srPrefix ? <span className="ds-alert__sr">{ALERT_SR_PREFIX[variant]} </span> : null}
          {title}
        </p>
        {description ? <div className="ds-toast__description">{description}</div> : null}
        {action ? (
          <div className="ds-toast__action">
            <Button size="sm" variant="outlineSecondary" onClick={action.onClick}>
              {action.label}
            </Button>
          </div>
        ) : null}
      </div>
      {dismissible && onDismiss ? (
        <button type="button" className="ds-toast__dismiss" aria-label={dismissLabel} onClick={onDismiss}>
          {getCloseIcon()}
        </button>
      ) : null}
    </div>
  );
});

Toast.displayName = "Toast";

/* -------------------------------------------------------------------------------------------------
 * Provider + hook
 * -----------------------------------------------------------------------------------------------*/

interface ToastRecord extends ToastOptions {
  id: string;
  /** Bumped on update so the item remounts and restarts its timer. */
  version: number;
  closing: boolean;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** Access `toast`, `dismiss`, `dismissAll`. Must be called under `ToastProvider`. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a <ToastProvider>.");
  return ctx;
}

interface ToastItemProps {
  record: ToastRecord;
  defaultDuration: number;
  documentHidden: boolean;
  dismissLabel: string;
  onClose: (id: string) => void;
}

function ToastItem({ record, defaultDuration, documentHidden, dismissLabel, onClose }: ToastItemProps) {
  const { id, title, description, variant, action, dismissible = TOAST_DEFAULTS.dismissible, closing } = record;
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  // WCAG 2.2.1: a toast with an action is sticky unless the caller sets `duration` explicitly,
  // so keyboard / screen-reader users are never raced to reach the action before it times out.
  const remaining = useRef<number>(record.duration ?? (action ? Infinity : defaultDuration));
  const paused = hovered || focusWithin || documentHidden || closing;

  useEffect(() => {
    if (paused || !Number.isFinite(remaining.current)) return undefined;
    const startedAt = Date.now();
    const timer = setTimeout(() => onClose(id), Math.max(0, remaining.current));
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - startedAt;
    };
  }, [paused, id, onClose]);

  const close = useCallback(() => onClose(id), [id, onClose]);

  return (
    <Toast
      title={title}
      description={description}
      variant={variant}
      dismissible={dismissible}
      dismissLabel={dismissLabel}
      onDismiss={close}
      action={action ? { label: action.label, onClick: () => { action.onClick(); close(); } } : undefined}
      tabIndex={0}
      data-toast-id={id}
      data-state={closing ? "closed" : "open"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && dismissible) {
          e.stopPropagation();
          close();
        }
      }}
    />
  );
}

/**
 * ToastProvider — owns the toast queue and renders the notifications region through a portal
 * to `document.body` (after mount, so it is SSR-safe). Toasts never take focus; press F8 to
 * move focus to the region, Tab between toasts, Escape to dismiss the focused one.
 */
export function ToastProvider({
  children,
  position = TOAST_DEFAULTS.position,
  max = TOAST_DEFAULTS.max,
  duration = TOAST_DEFAULTS.duration,
  label = TOAST_DEFAULTS.label,
  dismissLabel = TOAST_DEFAULTS.dismissLabel,
}: ToastProviderProps) {
  const [records, setRecords] = useState<ToastRecord[]>([]);
  const [mounted, setMounted] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const regionRef = useRef<HTMLElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const exitTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    setMounted(true);
    setDocumentHidden(isDocumentHidden());
    const onVisibility = () => setDocumentHidden(isDocumentHidden());
    document.addEventListener("visibilitychange", onVisibility);
    const timers = exitTimers.current;
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  const remove = useCallback((id: string) => {
    exitTimers.current.delete(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  /**
   * If focus is inside the closing toast, hand it to the next (or previous) toast; when the stack is
   * now empty, return it to the element focused before entering the region (F8 or Tab); else the
   * region itself (tabIndex -1). Focus never falls to <body>.
   */
  const moveFocusFrom = useCallback((id: string) => {
    const region = regionRef.current;
    if (!region || typeof document === "undefined") return;
    const items = Array.from(region.querySelectorAll<HTMLElement>("[data-toast-id]")).filter(
      (el) => el.dataset.state !== "closed" || el.dataset.toastId === id,
    );
    const index = items.findIndex((el) => el.dataset.toastId === id);
    const el = items[index];
    if (!el || !el.contains(document.activeElement)) return;
    const next = items[index + 1] ?? items[index - 1];
    if (next) {
      next.focus();
      return;
    }
    const restore = restoreFocusRef.current;
    if (restore && restore !== document.body && document.contains(restore)) {
      restore.focus();
      if (document.activeElement === restore) return;
    }
    region.focus();
  }, []);

  const close = useCallback(
    (id: string) => {
      moveFocusFrom(id);
      setRecords((prev) => prev.map((r) => (r.id === id && !r.closing ? { ...r, closing: true } : r)));
      if (exitTimers.current.has(id)) return;
      if (prefersReducedMotion()) {
        remove(id);
      } else {
        exitTimers.current.set(id, setTimeout(() => remove(id), TOAST_EXIT_MS));
      }
    },
    [moveFocusFrom, remove],
  );

  const toast = useCallback((options: ToastOptions) => {
    const id = options.id ?? nextToastId();
    const pending = exitTimers.current.get(id);
    if (pending) {
      clearTimeout(pending);
      exitTimers.current.delete(id);
    }
    setRecords((prev) => {
      const existing = prev.find((r) => r.id === id);
      if (existing) {
        return prev.map((r) => (r.id === id ? { ...options, id, version: r.version + 1, closing: false } : r));
      }
      return [...prev, { ...options, id, version: 0, closing: false }];
    });
    return id;
  }, []);

  const recordsRef = useRef(records);
  recordsRef.current = records;

  const dismissAll = useCallback(() => {
    recordsRef.current.forEach((r) => {
      if (!r.closing) close(r.id);
    });
  }, [close]);

  const value = useMemo<ToastContextValue>(() => ({ toast, dismiss: close, dismissAll }), [toast, close, dismissAll]);

  const hasToasts = records.length > 0;
  useEffect(() => {
    if (!hasToasts) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== TOAST_HOTKEY || !regionRef.current) return;
      e.preventDefault();
      const active = document.activeElement as HTMLElement | null;
      if (active && !regionRef.current.contains(active)) restoreFocusRef.current = active;
      regionRef.current.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [hasToasts]);

  const visible = records.slice(0, Math.max(1, max));

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted
        ? createPortal(
            <section
              ref={regionRef}
              className="ds-toast-region"
              aria-label={label}
              aria-live="polite"
              aria-relevant="additions"
              // Opt-in for modal overlays (Drawer focus guard): F8 / Tab may reach toasts while a drawer is open.
              data-overlay-allow=""
              tabIndex={-1}
              onFocus={(e) => {
                const from = e.relatedTarget as HTMLElement | null;
                if (from && !e.currentTarget.contains(from)) restoreFocusRef.current = from;
              }}
              data-position={position}
              data-empty={hasToasts ? undefined : "true"}
            >
              {visible.map((record) => (
                <ToastItem
                  key={`${record.id}-${record.version}`}
                  record={record}
                  defaultDuration={duration}
                  documentHidden={documentHidden}
                  dismissLabel={dismissLabel}
                  onClose={close}
                />
              ))}
            </section>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
}

ToastProvider.displayName = "ToastProvider";

export default Toast;
export type {
  ToastProps,
  ToastOptions,
  ToastAction,
  ToastPosition,
  ToastVariant,
  ToastProviderProps,
  ToastContextValue,
} from "./Toast.types";
