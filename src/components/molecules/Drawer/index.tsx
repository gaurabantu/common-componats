"use client";

import React, { useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { acquireBodyScrollLock, releaseBodyScrollLock } from "../Modal/bodyScrollLock";
import { OverlayLayerContext, isTopLayer, popLayer, pushLayer } from "../Modal/overlayStack";
import { runGuardedClose } from "../Modal/closeGuard";
import {
  DRAWER_DEFAULTS,
  DRAWER_EXIT_FALLBACK_MS,
  DRAWER_HEIGHTS,
  DRAWER_WIDTHS,
} from "./Drawer.config";
import { getFocusable, trapTabKey } from "./Drawer.utils";
import type { DrawerProps } from "./Drawer.types";
import "./Drawer.css";

function CloseGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden focusable="false">
      <path
        d="M4 4l8 8M12 4l-8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Drawer (alias `Sheet`) — a dialog panel attached to a viewport edge. Modal by default
 * (backdrop, scroll lock, focus trap); `modal={false}` gives a non-blocking side panel.
 * Header and sticky footer stay fixed while the body scrolls.
 */
const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    open,
    onOpenChange,
    side = DRAWER_DEFAULTS.side,
    size = DRAWER_DEFAULTS.size,
    title,
    description,
    headerActions,
    onBeforeClose,
    bodyScroll = true,
    bodyClassName,
    children,
    footer,
    showCloseButton = DRAWER_DEFAULTS.showCloseButton,
    closeLabel = DRAWER_DEFAULTS.closeLabel,
    closeOnBackdropClick = DRAWER_DEFAULTS.closeOnBackdropClick,
    closeOnEscape = DRAWER_DEFAULTS.closeOnEscape,
    modal = DRAWER_DEFAULTS.modal,
    initialFocusRef,
    returnFocus = DRAWER_DEFAULTS.returnFocus,
    className,
    id,
  },
  forwardedRef,
) {
  const autoId = useId();
  const layerId = `drawer-${autoId}`;
  const parentLayerId = useContext(OverlayLayerContext);
  const baseId = id ?? `ds-drawer-${autoId.replace(/:/g, "")}`;
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;

  const panelRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  /** Target of the focus event currently passing through this drawer's React tree (set by onFocusCapture). */
  const ownedFocusTargetRef = useRef<EventTarget | null>(null);
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  const returnFocusRef = useRef(returnFocus);
  returnFocusRef.current = returnFocus;
  const initialFocusRefRef = useRef(initialFocusRef);
  initialFocusRefRef.current = initialFocusRef;

  // Stay mounted through the exit animation; mount synchronously on open.
  const [present, setPresent] = useState(open);
  if (open && !present) setPresent(true);

  const [bodyScrollable, setBodyScrollable] = useState(false);

  const setPanelRef = useCallback(
    (node: HTMLDivElement | null) => {
      panelRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  const onBeforeCloseRef = useRef(onBeforeClose);
  onBeforeCloseRef.current = onBeforeClose;
  const guardPendingRef = useRef(false);
  const openRef = useRef(open);
  openRef.current = open;

  // User-initiated close: `onBeforeClose` may veto (false / rejected promise keeps the drawer open).
  const requestClose = useCallback(() => {
    runGuardedClose(
      onBeforeCloseRef.current,
      () => onOpenChangeRef.current(false),
      guardPendingRef,
      () => openRef.current,
    );
  }, []);

  // Exit: unmount once the slide-out finishes (immediately when there is no animation, e.g. reduced motion).
  useEffect(() => {
    if (open || !present) return undefined;
    const panel = panelRef.current;
    const animationName =
      panel && typeof window !== "undefined" ? window.getComputedStyle(panel).animationName : "";
    if (!animationName || animationName === "none") {
      setPresent(false);
      return undefined;
    }
    const timer = setTimeout(() => setPresent(false), DRAWER_EXIT_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [open, present]);

  // Overlay stack + focus guard. Declared BEFORE the return-focus effect: React runs cleanups in
  // declaration order, so on close the layer is popped and the guard removed before focus returns.
  useEffect(() => {
    if (!open) return undefined;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [open, layerId, parentLayerId]);

  // Modal + top layer: pull focus back into the panel if it lands on content the drawer doesn't own.
  // Ownership, not DOM order: React focus events bubble through portals, so focus inside a Popover /
  // DatePicker / nested Modal rendered from the drawer's tree passes the root's onFocusCapture first
  // (React's capture listener on the portal container runs before this document bubble listener).
  // Explicit opt-in: an ancestor with [data-overlay-allow] (e.g. the toast region for F8).
  useEffect(() => {
    if (!open || !modal) return undefined;
    const onFocusIn = (e: FocusEvent) => {
      const panel = panelRef.current;
      const target = e.target;
      if (!panel || !(target instanceof Node)) return;
      if (panel.contains(target)) {
        ownedFocusTargetRef.current = null;
        lastFocusedRef.current = target as HTMLElement;
        return;
      }
      const owned = ownedFocusTargetRef.current === target;
      ownedFocusTargetRef.current = null;
      if (owned) return;
      if (!isTopLayer(layerId)) return;
      const allowed = target instanceof Element ? target : target.parentElement;
      if (allowed?.closest("[data-overlay-allow]")) return;
      const fallback =
        lastFocusedRef.current && panel.contains(lastFocusedRef.current)
          ? lastFocusedRef.current
          : getFocusable(panel)[0] ?? panel;
      fallback.focus({ preventScroll: true });
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [open, modal, layerId]);

  // Initial focus on open; return focus to the trigger on close.
  useEffect(() => {
    if (!open) return undefined;
    const previous =
      typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null;
    const panel = panelRef.current;
    if (panel) {
      const target =
        initialFocusRefRef.current?.current ?? getFocusable(panel)[0] ?? panel;
      target.focus({ preventScroll: true });
    }
    return () => {
      if (
        returnFocusRef.current &&
        previous &&
        previous !== document.body &&
        previous.isConnected &&
        typeof previous.focus === "function"
      ) {
        previous.focus({ preventScroll: true });
      }
    };
  }, [open]);

  // Body scroll lock (modal only) — shared depth counter with Modal.
  useEffect(() => {
    if (!open || !modal) return undefined;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [open, modal]);

  // Escape closes (modal and non-modal). Skips events a child already handled.
  useEffect(() => {
    if (!open || !closeOnEscape) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing) return;
      // Only the top overlay layer handles Escape — one press closes one layer.
      if (!isTopLayer(layerId)) return;
      e.preventDefault();
      e.stopPropagation();
      requestClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeOnEscape, requestClose, layerId]);

  // Make the body keyboard-scrollable only when it actually overflows.
  useEffect(() => {
    const body = bodyRef.current;
    if (!present || !body) return undefined;
    const measure = () => setBodyScrollable(body.scrollHeight > body.clientHeight + 1);
    measure();
    if (typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(body);
    Array.from(body.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [present, children]);

  if (!present || typeof document === "undefined") return null;

  const state = open ? "open" : "closed";
  const extent = side === "left" || side === "right" ? DRAWER_WIDTHS[size] : DRAWER_HEIGHTS[size];

  const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (modal && panelRef.current) trapTabKey(e.nativeEvent, panelRef.current);
  };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (!open && e.target === e.currentTarget) setPresent(false);
  };

  return createPortal(
    <OverlayLayerContext.Provider value={layerId}>
      <div
        className="ds-drawer-root"
        data-modal={modal ? "true" : "false"}
        onFocusCapture={(e) => {
          ownedFocusTargetRef.current = e.target;
        }}
      >
        {modal ? (
          <div
            className="ds-drawer__backdrop"
            data-state={state}
            aria-hidden="true"
            // preventDefault on mousedown keeps focus inside the panel (trap can't be escaped by clicking out).
            onMouseDown={(e) => e.preventDefault()}
            onClick={
              closeOnBackdropClick && open
                ? () => {
                    if (isTopLayer(layerId)) requestClose();
                  }
                : undefined
            }
          />
        ) : null}
        <div
          ref={setPanelRef}
          id={baseId}
          role="dialog"
          aria-modal={modal ? true : undefined}
          aria-labelledby={titleId}
          aria-describedby={description != null ? descriptionId : undefined}
          tabIndex={-1}
          className={["ds-drawer", className].filter(Boolean).join(" ")}
          data-side={side}
          data-size={size}
          data-state={state}
          style={{ "--ds-drawer-extent": extent } as React.CSSProperties}
          onKeyDown={handlePanelKeyDown}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="ds-drawer__header">
            <div className="ds-drawer__heading">
              <h2 id={titleId} className="ds-drawer__title">
                {title}
              </h2>
              {description != null ? (
                <div id={descriptionId} className="ds-drawer__description">
                  {description}
                </div>
              ) : null}
            </div>
            {headerActions != null && headerActions !== false ? (
              <div className="ds-drawer__header-actions">{headerActions}</div>
            ) : null}
            {showCloseButton ? (
              <button
                type="button"
                className="ds-drawer__close"
                aria-label={closeLabel}
                onClick={requestClose}
              >
                <CloseGlyph />
              </button>
            ) : null}
          </div>
          <div
            ref={bodyRef}
            className={["ds-drawer__body", bodyClassName].filter(Boolean).join(" ")}
            tabIndex={bodyScroll && bodyScrollable ? 0 : undefined}
            data-scrollable={bodyScroll && bodyScrollable ? "true" : undefined}
            data-body-scroll={bodyScroll ? undefined : "false"}
          >
            {children}
          </div>
          {footer != null ? <div className="ds-drawer__footer">{footer}</div> : null}
        </div>
      </div>
    </OverlayLayerContext.Provider>,
    document.body,
  );
});

Drawer.displayName = "Drawer";

/** Alias of `Drawer` — same component, for teams that call this pattern a "sheet". */
export const Sheet = Drawer;

export default Drawer;
export type { DrawerProps, DrawerSide, DrawerSize, SheetProps } from "./Drawer.types";
