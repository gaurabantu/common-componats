import React, { useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../atoms/Button";
import CloseIcon from "../../../assets/close.svg";
import Icon from "../../atoms/Icon";
import { ModalProps } from "./Modal.types";
import { defaultModalOptions, modalSizeMap, modalSizeWidths } from "./Modal.config";
import { acquireBodyScrollLock, releaseBodyScrollLock } from "./bodyScrollLock";
import { OverlayLayerContext, isTopLayer, popLayer, pushLayer } from "./overlayStack";
import { runGuardedClose } from "./closeGuard";
import "./Modal.css";

export type {
  ModalProps,
  ModalSize,
  ModalAnimation,
  ModalScrollBehavior,
  ModalAutoFocusEvent,
  ModalRootProps,
} from "./Modal.types";
export type { BeforeCloseGuard } from "./closeGuard";

function createAutoFocusEvent(type: string): Event {
  return new Event(type, { cancelable: true });
}

export default function Modal({
  isOpen,
  onClose,
  title,
  ariaLabel,
  description,
  headerActions,
  onBeforeClose,
  bodyScroll = true,
  bodyClassName,
  animate = true,
  rootProps,
  children,
  onConfirm,
  confirmText = "Confirm",
  confirmDisabled = false,
  confirmLoading = false,
  cancelText = "Cancel",
  showCancel = true,
  hideFooter = false,
  footer,
  size = defaultModalOptions.size,
  id = "dynamicModal",
  showCloseButton = defaultModalOptions.showCloseButton,
  isStackedBackground = false,
  zIndex = defaultModalOptions.zIndex,
  titleIcon,
  titleIconSize,
  animation = defaultModalOptions.animation,
  animationDuration = defaultModalOptions.animationDuration,
  closeAfterTransition = defaultModalOptions.closeAfterTransition,
  closeOnBackdropClick = defaultModalOptions.closeOnBackdropClick,
  closeOnEscape = defaultModalOptions.closeOnEscape,
  className = "",
  hideHeader = false,
  initialFocusRef,
  scrollBehavior = defaultModalOptions.scrollBehavior,
  fullscreenOnMobile = false,
  onOpenAutoFocus,
  onCloseAutoFocus,
  confirmButtonVariant = "primary",
  confirmButtonColor,
  confirmButtonBackground,
  confirmButtonBorder,
  cancelButtonVariant = "outlineSecondary",
  cancelButtonColor,
  cancelButtonBackground,
  cancelButtonBorder,
  ...restProps
}: ModalProps) {
  const [isExiting, setIsExiting] = useState(false);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  // Shared overlay stack: only the top layer handles Escape / backdrop dismissal.
  const layerId = useId();
  const parentLayerId = useContext(OverlayLayerContext);
  // Latest-value refs so the focus effect only re-runs on open/close.
  const initialFocusRefRef = useRef(initialFocusRef);
  initialFocusRefRef.current = initialFocusRef;
  const onOpenAutoFocusRef = useRef(onOpenAutoFocus);
  onOpenAutoFocusRef.current = onOpenAutoFocus;
  const onCloseAutoFocusRef = useRef(onCloseAutoFocus);
  onCloseAutoFocusRef.current = onCloseAutoFocus;

  // `animate={false}` overrides `animation`: no keyframes, no transform, immediate close.
  const effectiveAnimation = animate ? animation : "none";
  const isFullscreen = size === "fullscreen";
  const sizeClass = modalSizeMap[size] ?? "";
  const animClass = effectiveAnimation !== "none" ? `modal-dialog--${effectiveAnimation}` : "";
  const onBeforeCloseRef = useRef(onBeforeClose);
  onBeforeCloseRef.current = onBeforeClose;
  const guardPendingRef = useRef(false);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  // When parent closes or opens, sync exit state and cancel pending close animation.
  useEffect(() => {
    if (isOpen) {
      setIsExiting(false);
    } else {
      setIsExiting(false);
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
    }
  }, [isOpen]);

  // Body scroll: shared global depth (stacked modals + Strict Mode safe via paired acquire/release per open session).
  useEffect(() => {
    if (!isOpen) return undefined;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [isOpen]);

  // Register in the overlay stack while open. Declared before the focus effect so the layer is
  // popped before focus returns on close.
  useEffect(() => {
    if (!isOpen) return undefined;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [isOpen, layerId, parentLayerId]);

  const performClose = useCallback(() => {
    // Ignore repeat requests while the exit animation is pending (no double onClose).
    if (exitTimeoutRef.current) return;
    if (closeAfterTransition && effectiveAnimation !== "none") {
      setIsExiting(true);
      exitTimeoutRef.current = setTimeout(() => {
        onClose();
        exitTimeoutRef.current = null;
      }, animationDuration);
    } else {
      onClose();
    }
  }, [closeAfterTransition, effectiveAnimation, animationDuration, onClose]);

  // User-initiated close: runs `onBeforeClose` first; a false / rejected result keeps the modal open.
  const handleClose = useCallback(() => {
    if (exitTimeoutRef.current) return;
    runGuardedClose(onBeforeCloseRef.current, performClose, guardPendingRef, () => isOpenRef.current);
  }, [performClose]);

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !isOpen || e.defaultPrevented || !isTopLayer(layerId)) return;
      // Top layer consumes Escape (even with closeOnEscape=false) so layers below never see it.
      e.preventDefault();
      e.stopPropagation();
      if (closeOnEscape) handleClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose, closeOnEscape, layerId]);

  // Focus trap + initial focus on first focusable control (AlertDialog has no title bar close)
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (el) => el.getAttribute("aria-hidden") !== "true" && el.offsetParent !== null,
      );

    // Element focused before opening — focus returns here on close (unless onCloseAutoFocus prevents it).
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusInitial = () => {
      const openEvent = createAutoFocusEvent("modal.openAutoFocus");
      onOpenAutoFocusRef.current?.(openEvent);
      if (openEvent.defaultPrevented) return;
      const preferred = initialFocusRefRef.current?.current;
      if (preferred) {
        preferred.focus();
        return;
      }
      const focusable = getFocusable();
      const first = focusable[0];
      if (first) first.focus();
      else dialog.focus();
    };
    const frame = requestAnimationFrame(focusInitial);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      dialog.removeEventListener("keydown", handleKeyDown);
      const closeEvent = createAutoFocusEvent("modal.closeAutoFocus");
      onCloseAutoFocusRef.current?.(closeEvent);
      if (
        !closeEvent.defaultPrevented &&
        previouslyFocused &&
        previouslyFocused !== document.body &&
        previouslyFocused.isConnected &&
        typeof previouslyFocused.focus === "function"
      ) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen]);

  // Portal and backdrop unmount as soon as `isOpen` is false — no stale `isExiting`-only render.
  if (!isOpen) return null;

  const backdropZIndex = isStackedBackground ? zIndex - 2 : zIndex;
  const dialogZIndex = isStackedBackground ? zIndex - 1 : zIndex + 1;

  const handleBackdropClick = closeOnBackdropClick
    ? () => {
        if (isTopLayer(layerId)) handleClose();
      }
    : undefined;

  const scrollOutside = scrollBehavior === "outside";
  const hasDescription = !hideHeader && description != null && description !== false;
  const descriptionId = `${id}Description`;

  // Confirm is ignored while loading or disabled — blocks double submits.
  const handleConfirm = () => {
    if (confirmLoading || confirmDisabled) return;
    onConfirm?.();
  };

  const rootClassName = [
    "modal",
    scrollOutside ? "modal--scroll-outside" : "",
    fullscreenOnMobile ? "modal--fullscreen-mobile" : "",
    isFullscreen ? "modal--fullscreen" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Root pass-through: `rootProps` plus any `data-*` passed directly on <Modal>.
  const directDataAttrs: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(restProps)) {
    if (key.startsWith("data-")) directDataAttrs[key] = value;
  }
  const { className: rootExtraClassName, ...rootRest } = rootProps ?? {};
  const labelledById = !hideHeader && !ariaLabel ? `${id}Label` : undefined;

  const modalContent = (
    <OverlayLayerContext.Provider value={layerId}>
      <div
        {...directDataAttrs}
        {...rootRest}
        className={["modal-root", rootExtraClassName].filter(Boolean).join(" ")}
      >
        {!isStackedBackground && (
          <div
            className={`modal-backdrop ${isExiting ? "modal-backdrop--exiting" : "modal-backdrop--entering"}`}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "var(--color-bg-overlay, rgba(0, 0, 0, 0.5))",
              zIndex: backdropZIndex,
              pointerEvents: "auto",
            }}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}

        <div
          ref={dialogRef}
          className={rootClassName}
          id={id}
          tabIndex={-1}
          aria-labelledby={labelledById}
          aria-label={ariaLabel || undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          data-scroll-behavior={scrollBehavior}
          aria-modal="true"
          role="dialog"
          style={{
            boxSizing: "border-box",
            display: "flex",
            // "outside": top-align + auto margins so tall dialogs scroll from their top edge instead of clipping.
            alignItems: scrollOutside ? "flex-start" : "center",
            justifyContent: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100dvw",
            height: "100dvh",
            zIndex: dialogZIndex,
            padding: isFullscreen ? 0 : "1rem",
            overflowX: "hidden",
            overflowY: scrollOutside ? "auto" : "hidden",
            pointerEvents: "auto",
          }}
          onClick={!isStackedBackground ? handleBackdropClick : undefined}
        >
          <div
            className={[
              "modal-dialog",
              sizeClass,
              animClass,
              animate ? "" : "modal-dialog--static",
              isExiting ? "modal-dialog--exiting" : "modal-dialog--entering",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              boxSizing: "border-box",
              margin: scrollOutside ? "auto" : 0,
              maxHeight: isFullscreen ? "100dvh" : scrollOutside ? "none" : "calc(100dvh - 2rem)",
              ...(isFullscreen ? { height: scrollOutside ? undefined : "100dvh", minHeight: "100dvh" } : null),
              width: "100%",
              maxWidth: modalSizeWidths[size] ?? "480px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              pointerEvents: "auto",
              animationDuration: `${animationDuration}ms`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`modal-content ${className}`.trim()}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1 1 auto",
                minHeight: 0,
                maxHeight: scrollOutside ? "none" : "100%",
                overflow: "hidden",
                background: "var(--color-bg-surface)",
                borderRadius: isFullscreen ? 0 : "var(--radius-lg, 8px)",
                boxShadow: isFullscreen ? "none" : "var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.12))",
              }}
            >
              {!hideHeader && (
                <div
                  className="modal-header"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    flexShrink: 0,
                    padding: "1rem 1.25rem",
                    borderBottom: "1px solid var(--color-border-subtle, var(--color-mist-60))",
                  }}
                >
                  <div className="modal-heading" style={{ flex: 1, minWidth: 0 }}>
                    <span
                      id={`${id}Label`}
                      className="modal-title fw-semibold"
                      style={{ display: "block", fontSize: "1.125rem", color: "var(--color-text-primary)" }}
                    >
                      {titleIcon && (
                        <Icon
                          src={titleIcon}
                          width={titleIconSize ?? 24}
                          height={titleIconSize ?? 24}
                          className="me-2"
                          preserveColors
                        />
                      )}
                      {title}
                    </span>
                    {hasDescription && (
                      <div id={descriptionId} className="modal-description">
                        {description}
                      </div>
                    )}
                  </div>
                  {headerActions != null && headerActions !== false && (
                    <div
                      className="modal-header-actions"
                      style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}
                    >
                      {headerActions}
                    </div>
                  )}
                  {showCloseButton && (
                    <Button
                      variant="link"
                      onClick={handleClose}
                      icon={CloseIcon}
                      size="sm"
                      style={{ flexShrink: 0, marginTop: "-0.25rem" }}
                      aria-label="Close dialog"
                    />
                  )}
                </div>
              )}

              <div
                className={["modal-body", bodyScroll ? "" : "modal-body--fixed", bodyClassName]
                  .filter(Boolean)
                  .join(" ")}
                data-body-scroll={bodyScroll ? undefined : "false"}
                style={{
                  overflowY: !bodyScroll ? "hidden" : scrollOutside ? "visible" : "auto",
                  overflowX: "hidden",
                  flex: 1,
                  minHeight: 0,
                  padding: "1rem 1.25rem",
                  ...(bodyScroll ? null : { display: "flex", flexDirection: "column" as const }),
                }}
              >
                {children}
              </div>

              {!hideFooter && (footer != null || onConfirm) && (
                <div
                  className="modal-footer"
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    gap: "0.75rem",
                    justifyContent: "flex-end",
                    flexWrap: "wrap",
                    padding: "1rem 1.25rem",
                    borderTop: "1px solid var(--color-border-subtle, var(--color-mist-60))",
                  }}
                >
                  {footer != null ? (
                    footer
                  ) : (
                    <>
                      {showCancel && (
                        <Button
                          variant={cancelButtonVariant}
                          size="md"
                          onClick={handleClose}
                          textColor={cancelButtonColor}
                          backgroundColor={cancelButtonBackground}
                          borderColor={cancelButtonBorder}
                        >
                          {cancelText}
                        </Button>
                      )}
                      <Button
                        variant={confirmButtonVariant}
                        size={confirmButtonVariant === "primary" ? "lg" : "md"}
                        onClick={handleConfirm}
                        disabled={confirmDisabled}
                        loading={confirmLoading}
                        aria-busy={confirmLoading || undefined}
                        textColor={confirmButtonColor}
                        backgroundColor={confirmButtonBackground}
                        borderColor={confirmButtonBorder}
                      >
                        {confirmText}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </OverlayLayerContext.Provider>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}
