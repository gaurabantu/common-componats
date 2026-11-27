"use client";

import React, { useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { acquireBodyScrollLock, releaseBodyScrollLock } from "../Modal/bodyScrollLock";
import { OverlayLayerContext, isTopLayer, popLayer, pushLayer } from "../Modal/overlayStack";
import { runGuardedClose } from "../Modal/closeGuard";
import {
  BOTTOM_SHEET_DEFAULTS,
  DRAWER_DEFAULTS,
  DRAWER_EXIT_FALLBACK_MS,
  DRAWER_HEIGHTS,
  DRAWER_WIDTHS,
  SHEET_DISMISS_DISTANCE_RATIO,
  SHEET_DISMISS_VELOCITY,
  SHEET_DRAG_SLOP_PX,
  SHEET_FLICK_MIN_PX,
} from "./Drawer.config";
import { getFocusable, nearestSnapIndex, resolveSnapPx, trapTabKey } from "./Drawer.utils";
import type { BottomSheetProps, DrawerProps } from "./Drawer.types";
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
    handle = false,
    handleLabel = BOTTOM_SHEET_DEFAULTS.handleLabel,
    swipeToDismiss,
    snapPoints,
    defaultSnap = BOTTOM_SHEET_DEFAULTS.defaultSnap,
    snap: snapProp,
    onSnapChange,
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

  // ── Bottom sheet: handle, snap points, swipe-to-dismiss (side="bottom" only) ──
  const isSheet = side === "bottom";
  const snapList = isSheet && snapPoints && snapPoints.length > 0 ? snapPoints : null;
  const showHandle = isSheet && handle;
  const canSwipe = showHandle && (swipeToDismiss ?? handle);
  const clampSnap = (i: number) => (snapList ? Math.min(Math.max(0, Math.round(i)), snapList.length - 1) : 0);
  const [innerSnap, setInnerSnap] = useState(() => clampSnap(defaultSnap));
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    // Uncontrolled sheets start at `defaultSnap` every time they open.
    if (open) setInnerSnap(clampSnap(defaultSnap));
  }
  const snapIndex = clampSnap(snapProp ?? innerSnap);
  const [snapAnnouncement, setSnapAnnouncement] = useState("");
  const dragRef = useRef<{
    pointerId: number;
    startY: number;
    startTime: number;
    startHeight: number;
    startSnap: number;
    moved: boolean;
  } | null>(null);
  const suppressHandleClickRef = useRef(false);

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
      panel.style.translate = "";
      // The bottom-sheet handle is reachable by Tab but is not the initial focus target.
      const target =
        initialFocusRefRef.current?.current ??
        getFocusable(panel).find((el) => !el.hasAttribute("data-drawer-handle")) ??
        panel;
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
  const extent = snapList
    ? snapList[snapIndex]
    : side === "left" || side === "right"
      ? DRAWER_WIDTHS[size]
      : DRAWER_HEIGHTS[size];

  const changeSnap = (next: number) => {
    if (!snapList) return;
    const target = clampSnap(next);
    // Drag may have left an inline px extent; always restore the CSS length for the target snap.
    panelRef.current?.style.setProperty("--ds-drawer-extent", snapList[target]);
    if (target === snapIndex) return;
    if (snapProp === undefined) setInnerSnap(target);
    setSnapAnnouncement(`${handleLabel}: ${snapList[target]}`);
    onSnapChange?.(target, snapList[target]);
  };

  const resetDragOffset = () => {
    const panel = panelRef.current;
    if (panel) panel.style.translate = "";
  };

  const swipeDismiss = () => {
    requestClose();
    // Vetoed by onBeforeClose (or the parent kept it open): slide back into place.
    setTimeout(() => {
      if (openRef.current) resetDragOffset();
    }, DRAWER_EXIT_FALLBACK_MS);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (!open || (!canSwipe && !snapList)) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const panel = panelRef.current;
    if (!panel) return;
    dragRef.current = {
      pointerId: e.pointerId,
      startY: e.clientY,
      startTime: typeof performance !== "undefined" ? performance.now() : Date.now(),
      startHeight: panel.getBoundingClientRect().height,
      startSnap: snapIndex,
      moved: false,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const panel = panelRef.current;
    if (!drag || !panel || e.pointerId !== drag.pointerId) return;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.abs(dy) < SHEET_DRAG_SLOP_PX) return;
    drag.moved = true;
    panel.dataset.dragging = "true";
    if (snapList) {
      const vh = window.innerHeight;
      const px = snapList.map((p) => resolveSnapPx(p, vh)).filter((n) => !Number.isNaN(n));
      const minPx = px.length ? Math.min(...px) : drag.startHeight;
      const maxPx = px.length ? Math.max(...px) : drag.startHeight;
      const wanted = drag.startHeight - dy;
      const height = Math.min(Math.max(wanted, minPx), maxPx);
      panel.style.setProperty("--ds-drawer-extent", `${height}px`);
      panel.style.translate = canSwipe && wanted < minPx ? `0 ${minPx - wanted}px` : "";
    } else {
      panel.style.translate = `0 ${Math.max(0, dy)}px`;
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLElement>, cancelled: boolean) => {
    const drag = dragRef.current;
    const panel = panelRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (!panel || !drag.moved) return;
    delete panel.dataset.dragging;
    suppressHandleClickRef.current = true;
    const dy = cancelled ? 0 : e.clientY - drag.startY;
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const velocity = dy / Math.max(1, now - drag.startTime);
    const flickDown = dy >= SHEET_FLICK_MIN_PX && velocity > SHEET_DISMISS_VELOCITY;
    const flickUp = -dy >= SHEET_FLICK_MIN_PX && -velocity > SHEET_DISMISS_VELOCITY;

    if (snapList) {
      const vh = window.innerHeight;
      const px = snapList.map((p) => resolveSnapPx(p, vh));
      const valid = px.filter((n) => !Number.isNaN(n));
      const minPx = valid.length ? Math.min(...valid) : drag.startHeight;
      const wanted = drag.startHeight - dy;
      const overshoot = minPx - wanted;
      if (canSwipe && overshoot > 0 && (overshoot > minPx * SHEET_DISMISS_DISTANCE_RATIO || flickDown)) {
        swipeDismiss();
        return;
      }
      let target = nearestSnapIndex(wanted, px);
      if (target === drag.startSnap && flickDown) target = drag.startSnap - 1;
      if (target === drag.startSnap && flickUp) target = drag.startSnap + 1;
      resetDragOffset();
      changeSnap(target);
      return;
    }
    if (canSwipe && (dy > drag.startHeight * SHEET_DISMISS_DISTANCE_RATIO || flickDown)) {
      swipeDismiss();
      return;
    }
    resetDragOffset();
  };

  const handleHandleClick = () => {
    if (suppressHandleClickRef.current) {
      suppressHandleClickRef.current = false;
      return;
    }
    if (snapList) changeSnap((snapIndex + 1) % snapList.length);
  };

  const handleHandleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!snapList) return;
    const last = snapList.length - 1;
    const next =
      e.key === "ArrowUp" || e.key === "ArrowRight"
        ? Math.min(last, snapIndex + 1)
        : e.key === "ArrowDown" || e.key === "ArrowLeft"
          ? Math.max(0, snapIndex - 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    changeSnap(next);
  };

  const gestureHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: (e: React.PointerEvent<HTMLElement>) => endDrag(e, false),
    onPointerCancel: (e: React.PointerEvent<HTMLElement>) => endDrag(e, true),
  };

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
          data-handle={showHandle ? "true" : undefined}
          data-snap={snapList ? snapIndex : undefined}
          style={{ "--ds-drawer-extent": extent } as React.CSSProperties}
          onKeyDown={handlePanelKeyDown}
          onAnimationEnd={handleAnimationEnd}
        >
          {showHandle && snapList ? (
            <button
              type="button"
              className="ds-drawer__handle"
              data-drawer-handle=""
              aria-label={handleLabel}
              aria-keyshortcuts="ArrowUp ArrowDown Home End"
              onClick={handleHandleClick}
              onKeyDown={handleHandleKeyDown}
              {...gestureHandlers}
            >
              <span className="ds-drawer__handle-bar" aria-hidden="true" />
            </button>
          ) : showHandle ? (
            // Pointer-only grip (swipe-to-dismiss); keyboard users close with the X button or Escape.
            <div className="ds-drawer__handle" data-drawer-handle="" aria-hidden="true" {...gestureHandlers}>
              <span className="ds-drawer__handle-bar" />
            </div>
          ) : null}
          {showHandle && snapList ? (
            <span className="ds-drawer__sr" role="status" aria-live="polite" aria-atomic="true">
              {snapAnnouncement}
            </span>
          ) : null}
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

/**
 * BottomSheet — `Drawer` preset with `side="bottom"` and a drag `handle` (swipe down to dismiss).
 * Add `snapPoints` (e.g. `["40%", "90%"]`) for resizable detents; the handle then becomes a
 * "Resize sheet" button (click / ArrowUp / ArrowDown / Home / End).
 */
export const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(function BottomSheet(
  { handle = true, ...props },
  ref,
) {
  return <Drawer {...props} handle={handle} side="bottom" ref={ref} />;
});

BottomSheet.displayName = "BottomSheet";

export default Drawer;
export type { DrawerProps, DrawerSide, DrawerSize, SheetProps, BottomSheetProps } from "./Drawer.types";
