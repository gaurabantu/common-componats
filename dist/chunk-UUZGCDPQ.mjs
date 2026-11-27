/* ucs:component-css */
import "./styles/components/molecules/Alert/Alert.css";
import "./styles/components/molecules/Toast/Toast.css";
import {
  ALERT_SR_PREFIX,
  getAlertIcon,
  getCloseIcon,
  getToneStyle
} from "./chunk-E3YWTVAO.mjs";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";

// src/components/molecules/Toast/index.tsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

// src/components/molecules/Toast/Toast.config.ts
var TOAST_DEFAULTS = {
  position: "bottom-right",
  max: 3,
  duration: 5e3,
  dismissible: true,
  variant: "info",
  label: "Notifications",
  dismissLabel: "Dismiss"
};
var TOAST_HOTKEY = "F8";
var TOAST_EXIT_MS = 200;

// src/components/molecules/Toast/Toast.utils.ts
function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function")
    return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function isDocumentHidden() {
  return typeof document !== "undefined" && document.visibilityState === "hidden";
}
var counter = 0;
function nextToastId() {
  counter += 1;
  return `toast-${counter}`;
}

// src/components/molecules/Toast/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Toast = React.forwardRef(function Toast2({
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
}, ref) {
  const live = variant === "danger" ? { role: "alert", "aria-atomic": "true" } : {};
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: ["ds-toast", className].filter(Boolean).join(" "),
      "data-variant": variant,
      style: { ...getToneStyle(variant), ...style },
      ...live,
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: "ds-toast__icon", "aria-hidden": "true", children: getAlertIcon(variant) }),
        /* @__PURE__ */ jsxs("div", { className: "ds-toast__body", children: [
          /* @__PURE__ */ jsxs("p", { className: "ds-toast__title", children: [
            srPrefix ? /* @__PURE__ */ jsxs("span", { className: "ds-alert__sr", children: [
              ALERT_SR_PREFIX[variant],
              " "
            ] }) : null,
            title
          ] }),
          description ? /* @__PURE__ */ jsx("div", { className: "ds-toast__description", children: description }) : null,
          action ? /* @__PURE__ */ jsx("div", { className: "ds-toast__action", children: /* @__PURE__ */ jsx(Button_default, { size: "sm", variant: "outlineSecondary", onClick: action.onClick, children: action.label }) }) : null
        ] }),
        dismissible && onDismiss ? /* @__PURE__ */ jsx("button", { type: "button", className: "ds-toast__dismiss", "aria-label": dismissLabel, onClick: onDismiss, children: getCloseIcon() }) : null
      ]
    }
  );
});
Toast.displayName = "Toast";
var ToastContext = createContext(null);
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useToast must be used within a <ToastProvider>.");
  return ctx;
}
function ToastItem({ record, defaultDuration, documentHidden, dismissLabel, onClose }) {
  var _a;
  const { id, title, description, variant, action, dismissible = TOAST_DEFAULTS.dismissible, closing } = record;
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const remaining = useRef((_a = record.duration) != null ? _a : action ? Infinity : defaultDuration);
  const paused = hovered || focusWithin || documentHidden || closing;
  useEffect(() => {
    if (paused || !Number.isFinite(remaining.current))
      return void 0;
    const startedAt = Date.now();
    const timer = setTimeout(() => onClose(id), Math.max(0, remaining.current));
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - startedAt;
    };
  }, [paused, id, onClose]);
  const close = useCallback(() => onClose(id), [id, onClose]);
  return /* @__PURE__ */ jsx(
    Toast,
    {
      title,
      description,
      variant,
      dismissible,
      dismissLabel,
      onDismiss: close,
      action: action ? { label: action.label, onClick: () => {
        action.onClick();
        close();
      } } : void 0,
      tabIndex: 0,
      "data-toast-id": id,
      "data-state": closing ? "closed" : "open",
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocusWithin(true),
      onBlur: (e) => {
        if (!e.currentTarget.contains(e.relatedTarget))
          setFocusWithin(false);
      },
      onKeyDown: (e) => {
        if (e.key === "Escape" && dismissible) {
          e.stopPropagation();
          close();
        }
      }
    }
  );
}
function ToastProvider({
  children,
  position = TOAST_DEFAULTS.position,
  max = TOAST_DEFAULTS.max,
  duration = TOAST_DEFAULTS.duration,
  label = TOAST_DEFAULTS.label,
  dismissLabel = TOAST_DEFAULTS.dismissLabel
}) {
  const [records, setRecords] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const regionRef = useRef(null);
  const restoreFocusRef = useRef(null);
  const exitTimers = useRef(/* @__PURE__ */ new Map());
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
  const remove = useCallback((id) => {
    exitTimers.current.delete(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);
  const moveFocusFrom = useCallback((id) => {
    var _a;
    const region = regionRef.current;
    if (!region || typeof document === "undefined")
      return;
    const items = Array.from(region.querySelectorAll("[data-toast-id]")).filter(
      (el2) => el2.dataset.state !== "closed" || el2.dataset.toastId === id
    );
    const index = items.findIndex((el2) => el2.dataset.toastId === id);
    const el = items[index];
    if (!el || !el.contains(document.activeElement))
      return;
    const next = (_a = items[index + 1]) != null ? _a : items[index - 1];
    if (next) {
      next.focus();
      return;
    }
    const restore = restoreFocusRef.current;
    if (restore && restore !== document.body && document.contains(restore)) {
      restore.focus();
      if (document.activeElement === restore)
        return;
    }
    region.focus();
  }, []);
  const close = useCallback(
    (id) => {
      moveFocusFrom(id);
      setRecords((prev) => prev.map((r) => r.id === id && !r.closing ? { ...r, closing: true } : r));
      if (exitTimers.current.has(id))
        return;
      if (prefersReducedMotion()) {
        remove(id);
      } else {
        exitTimers.current.set(id, setTimeout(() => remove(id), TOAST_EXIT_MS));
      }
    },
    [moveFocusFrom, remove]
  );
  const toast = useCallback((options) => {
    var _a;
    const id = (_a = options.id) != null ? _a : nextToastId();
    const pending = exitTimers.current.get(id);
    if (pending) {
      clearTimeout(pending);
      exitTimers.current.delete(id);
    }
    setRecords((prev) => {
      const existing = prev.find((r) => r.id === id);
      if (existing) {
        return prev.map((r) => r.id === id ? { ...options, id, version: r.version + 1, closing: false } : r);
      }
      return [...prev, { ...options, id, version: 0, closing: false }];
    });
    return id;
  }, []);
  const recordsRef = useRef(records);
  recordsRef.current = records;
  const dismissAll = useCallback(() => {
    recordsRef.current.forEach((r) => {
      if (!r.closing)
        close(r.id);
    });
  }, [close]);
  const value = useMemo(() => ({ toast, dismiss: close, dismissAll }), [toast, close, dismissAll]);
  const hasToasts = records.length > 0;
  useEffect(() => {
    if (!hasToasts)
      return void 0;
    const onKeyDown = (e) => {
      if (e.key !== TOAST_HOTKEY || !regionRef.current)
        return;
      e.preventDefault();
      const active = document.activeElement;
      if (active && !regionRef.current.contains(active))
        restoreFocusRef.current = active;
      regionRef.current.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [hasToasts]);
  const visible = records.slice(0, Math.max(1, max));
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value, children: [
    children,
    mounted ? createPortal(
      /* @__PURE__ */ jsx(
        "section",
        {
          ref: regionRef,
          className: "ds-toast-region",
          "aria-label": label,
          "aria-live": "polite",
          "aria-relevant": "additions",
          "data-overlay-allow": "",
          tabIndex: -1,
          onFocus: (e) => {
            const from = e.relatedTarget;
            if (from && !e.currentTarget.contains(from))
              restoreFocusRef.current = from;
          },
          "data-position": position,
          "data-empty": hasToasts ? void 0 : "true",
          children: visible.map((record) => /* @__PURE__ */ jsx(
            ToastItem,
            {
              record,
              defaultDuration: duration,
              documentHidden,
              dismissLabel,
              onClose: close
            },
            `${record.id}-${record.version}`
          ))
        }
      ),
      document.body
    ) : null
  ] });
}
ToastProvider.displayName = "ToastProvider";
var Toast_default = Toast;

export {
  Toast,
  useToast,
  ToastProvider,
  Toast_default
};
//# sourceMappingURL=chunk-UUZGCDPQ.mjs.map