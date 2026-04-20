import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../atoms/Button";
import CloseIcon from "../../../assets/close.svg";
import Icon from "../../atoms/Icon";
import { ModalProps } from "./Modal.types";
import { defaultModalOptions, modalSizeMap, modalSizeWidths } from "./Modal.config";
import { acquireBodyScrollLock, releaseBodyScrollLock } from "./bodyScrollLock";
import "./Modal.css";

export type { ModalProps } from "./Modal.types";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirm",
  confirmDisabled = false,
  cancelText = "Cancel",
  showCancel = true,
  hideFooter = false,
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
  confirmButtonVariant = "primary",
  confirmButtonColor,
  confirmButtonBackground,
  confirmButtonBorder,
  cancelButtonVariant = "outlineSecondary",
  cancelButtonColor,
  cancelButtonBackground,
  cancelButtonBorder,
}: ModalProps) {
  const [isExiting, setIsExiting] = useState(false);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const sizeClass = modalSizeMap[size] ?? "";
  const animClass = animation !== "none" ? `modal-dialog--${animation}` : "";

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

  const handleClose = useCallback(() => {
    if (closeAfterTransition && animation !== "none") {
      setIsExiting(true);
      exitTimeoutRef.current = setTimeout(() => {
        onClose();
        exitTimeoutRef.current = null;
      }, animationDuration);
    } else {
      onClose();
    }
  }, [closeAfterTransition, animation, animationDuration, onClose]);

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && showCloseButton && closeOnEscape) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose, showCloseButton, closeOnEscape]);

  // Focus trap when open
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

    dialog.focus();

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
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Portal and backdrop unmount as soon as `isOpen` is false — no stale `isExiting`-only render.
  if (!isOpen) return null;

  const backdropZIndex = isStackedBackground ? zIndex - 2 : zIndex;
  const dialogZIndex = isStackedBackground ? zIndex - 1 : zIndex + 1;

  const handleBackdropClick = closeOnBackdropClick && showCloseButton ? handleClose : undefined;

  const modalContent = (
    <div className="modal-root">
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
        className="modal"
        id={id}
        tabIndex={-1}
        aria-labelledby={!hideHeader ? `${id}Label` : undefined}
        aria-modal="true"
        role="dialog"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: dialogZIndex,
          padding: "1rem",
          overflow: "hidden",
          pointerEvents: "auto",
        }}
        onClick={!isStackedBackground ? handleBackdropClick : undefined}
      >
        <div
          className={`modal-dialog ${sizeClass} ${animClass} ${isExiting ? "modal-dialog--exiting" : "modal-dialog--entering"}`}
          style={{
            margin: 0,
            maxHeight: "calc(100vh - 2rem)",
            width: "100%",
            maxWidth: modalSizeWidths[size] ?? "480px",
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
              maxHeight: "100%",
              overflow: "hidden",
              background: "var(--color-bg-surface, #fff)",
              borderRadius: "var(--radius-lg, 8px)",
              boxShadow: "var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.12))",
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
                <span
                  id={`${id}Label`}
                  className="modal-title fw-semibold"
                  style={{ flex: 1, fontSize: "1.125rem", color: "var(--color-text-primary, #333)" }}
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
              className="modal-body"
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                flex: 1,
                minHeight: 0,
                padding: "1rem 1.25rem",
              }}
            >
              {children}
            </div>

            {!hideFooter && onConfirm && (
              <div
                className="modal-footer"
                style={{
                  flexShrink: 0,
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "flex-end",
                  padding: "1rem 1.25rem",
                  borderTop: "1px solid var(--color-border-subtle, var(--color-mist-60))",
                }}
              >
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
                  onClick={onConfirm}
                  disabled={confirmDisabled}
                  textColor={confirmButtonColor}
                  backgroundColor={confirmButtonBackground}
                  borderColor={confirmButtonBorder}
                >
                  {confirmText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}
