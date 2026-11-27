/* ucs:component-css */
import "./styles/components/molecules/Modal/Modal.css";
import {
  runGuardedClose
} from "./chunk-V2S4I5H5.mjs";
import {
  acquireBodyScrollLock,
  releaseBodyScrollLock
} from "./chunk-63D2ARDU.mjs";
import {
  OverlayLayerContext,
  isTopLayer,
  popLayer,
  pushLayer
} from "./chunk-FPB2PMES.mjs";
import {
  close_default
} from "./chunk-4PQA5JTI.mjs";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";
import {
  Icon_default
} from "./chunk-6JJMOGWW.mjs";

// src/components/molecules/Modal/index.tsx
import { useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

// src/components/molecules/Modal/Modal.config.ts
var defaultModalOptions = {
  size: "md",
  animation: "fade",
  /** Matches DESIGN_SYSTEM §18 `--duration-normal` (modals/dropdowns) */
  animationDuration: 300,
  closeAfterTransition: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  showCancel: true,
  /** Body scrolls; header + footer fixed (the original behaviour) */
  scrollBehavior: "inside",
  /** Matches `tokens.css` `--z-modal` */
  zIndex: 400
};
var modalSizeMap = {
  sm: "modal-sm",
  md: "",
  lg: "modal-lg",
  xl: "modal-xl",
  xxl: "modal-xxl",
  fullscreen: "modal-fullscreen"
};
var modalSizeWidths = {
  sm: "400px",
  md: "480px",
  lg: "560px",
  xl: "800px",
  xxl: "min(1140px, 90vw)",
  fullscreen: "100%"
};

// src/components/molecules/Modal/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function createAutoFocusEvent(type) {
  return new Event(type, { cancelable: true });
}
function Modal({
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
}) {
  var _a, _b;
  const [isExiting, setIsExiting] = useState(false);
  const exitTimeoutRef = useRef(null);
  const dialogRef = useRef(null);
  const layerId = useId();
  const parentLayerId = useContext(OverlayLayerContext);
  const initialFocusRefRef = useRef(initialFocusRef);
  initialFocusRefRef.current = initialFocusRef;
  const onOpenAutoFocusRef = useRef(onOpenAutoFocus);
  onOpenAutoFocusRef.current = onOpenAutoFocus;
  const onCloseAutoFocusRef = useRef(onCloseAutoFocus);
  onCloseAutoFocusRef.current = onCloseAutoFocus;
  const effectiveAnimation = animate ? animation : "none";
  const isFullscreen = size === "fullscreen";
  const sizeClass = (_a = modalSizeMap[size]) != null ? _a : "";
  const animClass = effectiveAnimation !== "none" ? `modal-dialog--${effectiveAnimation}` : "";
  const onBeforeCloseRef = useRef(onBeforeClose);
  onBeforeCloseRef.current = onBeforeClose;
  const guardPendingRef = useRef(false);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;
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
  useEffect(() => {
    if (!isOpen)
      return void 0;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [isOpen, layerId, parentLayerId]);
  const performClose = useCallback(() => {
    if (exitTimeoutRef.current)
      return;
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
  const handleClose = useCallback(() => {
    if (exitTimeoutRef.current)
      return;
    runGuardedClose(onBeforeCloseRef.current, performClose, guardPendingRef, () => isOpenRef.current);
  }, [performClose]);
  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current)
        clearTimeout(exitTimeoutRef.current);
    };
  }, []);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== "Escape" || !isOpen || e.defaultPrevented || !isTopLayer(layerId))
        return;
      e.preventDefault();
      e.stopPropagation();
      if (closeOnEscape)
        handleClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose, closeOnEscape, layerId]);
  useEffect(() => {
    if (!isOpen)
      return;
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(dialog.querySelectorAll(focusableSelector)).filter(
      (el) => el.getAttribute("aria-hidden") !== "true" && el.offsetParent !== null
    );
    const previouslyFocused = document.activeElement;
    const focusInitial = () => {
      var _a2, _b2;
      const openEvent = createAutoFocusEvent("modal.openAutoFocus");
      (_a2 = onOpenAutoFocusRef.current) == null ? void 0 : _a2.call(onOpenAutoFocusRef, openEvent);
      if (openEvent.defaultPrevented)
        return;
      const preferred = (_b2 = initialFocusRefRef.current) == null ? void 0 : _b2.current;
      if (preferred) {
        preferred.focus();
        return;
      }
      const focusable = getFocusable();
      const first = focusable[0];
      if (first)
        first.focus();
      else
        dialog.focus();
    };
    const frame = requestAnimationFrame(focusInitial);
    const handleKeyDown = (e) => {
      if (e.key !== "Tab")
        return;
      const focusable = getFocusable();
      if (focusable.length === 0)
        return;
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
      var _a2;
      cancelAnimationFrame(frame);
      dialog.removeEventListener("keydown", handleKeyDown);
      const closeEvent = createAutoFocusEvent("modal.closeAutoFocus");
      (_a2 = onCloseAutoFocusRef.current) == null ? void 0 : _a2.call(onCloseAutoFocusRef, closeEvent);
      if (!closeEvent.defaultPrevented && previouslyFocused && previouslyFocused !== document.body && previouslyFocused.isConnected && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [isOpen]);
  if (!isOpen)
    return null;
  const backdropZIndex = isStackedBackground ? zIndex - 2 : zIndex;
  const dialogZIndex = isStackedBackground ? zIndex - 1 : zIndex + 1;
  const handleBackdropClick = closeOnBackdropClick ? () => {
    if (isTopLayer(layerId))
      handleClose();
  } : void 0;
  const scrollOutside = scrollBehavior === "outside";
  const hasDescription = !hideHeader && description != null && description !== false;
  const descriptionId = `${id}Description`;
  const handleConfirm = () => {
    if (confirmLoading || confirmDisabled)
      return;
    onConfirm == null ? void 0 : onConfirm();
  };
  const rootClassName = [
    "modal",
    scrollOutside ? "modal--scroll-outside" : "",
    fullscreenOnMobile ? "modal--fullscreen-mobile" : "",
    isFullscreen ? "modal--fullscreen" : ""
  ].filter(Boolean).join(" ");
  const directDataAttrs = {};
  for (const [key, value] of Object.entries(restProps)) {
    if (key.startsWith("data-"))
      directDataAttrs[key] = value;
  }
  const { className: rootExtraClassName, ...rootRest } = rootProps != null ? rootProps : {};
  const labelledById = !hideHeader && !ariaLabel ? `${id}Label` : void 0;
  const modalContent = /* @__PURE__ */ jsx(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs(
    "div",
    {
      ...directDataAttrs,
      ...rootRest,
      className: ["modal-root", rootExtraClassName].filter(Boolean).join(" "),
      children: [
        !isStackedBackground && /* @__PURE__ */ jsx(
          "div",
          {
            className: `modal-backdrop ${isExiting ? "modal-backdrop--exiting" : "modal-backdrop--entering"}`,
            style: {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "var(--color-bg-overlay, rgba(0, 0, 0, 0.5))",
              zIndex: backdropZIndex,
              pointerEvents: "auto"
            },
            onClick: handleBackdropClick,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: dialogRef,
            className: rootClassName,
            id,
            tabIndex: -1,
            "aria-labelledby": labelledById,
            "aria-label": ariaLabel || void 0,
            "aria-describedby": hasDescription ? descriptionId : void 0,
            "data-scroll-behavior": scrollBehavior,
            "aria-modal": "true",
            role: "dialog",
            style: {
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
              pointerEvents: "auto"
            },
            onClick: !isStackedBackground ? handleBackdropClick : void 0,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: [
                  "modal-dialog",
                  sizeClass,
                  animClass,
                  animate ? "" : "modal-dialog--static",
                  isExiting ? "modal-dialog--exiting" : "modal-dialog--entering"
                ].filter(Boolean).join(" "),
                style: {
                  boxSizing: "border-box",
                  margin: scrollOutside ? "auto" : 0,
                  maxHeight: isFullscreen ? "100dvh" : scrollOutside ? "none" : "calc(100dvh - 2rem)",
                  ...isFullscreen ? { height: scrollOutside ? void 0 : "100dvh", minHeight: "100dvh" } : null,
                  width: "100%",
                  maxWidth: (_b = modalSizeWidths[size]) != null ? _b : "480px",
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  pointerEvents: "auto",
                  animationDuration: `${animationDuration}ms`
                },
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `modal-content ${className}`.trim(),
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 1 auto",
                      minHeight: 0,
                      maxHeight: scrollOutside ? "none" : "100%",
                      overflow: "hidden",
                      background: "var(--color-bg-surface)",
                      borderRadius: isFullscreen ? 0 : "var(--radius-lg, 8px)",
                      boxShadow: isFullscreen ? "none" : "var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.12))"
                    },
                    children: [
                      !hideHeader && /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "modal-header",
                          style: {
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "1rem",
                            flexShrink: 0,
                            padding: "1rem 1.25rem",
                            borderBottom: "1px solid var(--color-border-subtle, var(--color-mist-60))"
                          },
                          children: [
                            /* @__PURE__ */ jsxs("div", { className: "modal-heading", style: { flex: 1, minWidth: 0 }, children: [
                              /* @__PURE__ */ jsxs(
                                "span",
                                {
                                  id: `${id}Label`,
                                  className: "modal-title fw-semibold",
                                  style: { display: "block", fontSize: "1.125rem", color: "var(--color-text-primary)" },
                                  children: [
                                    titleIcon && /* @__PURE__ */ jsx(
                                      Icon_default,
                                      {
                                        src: titleIcon,
                                        width: titleIconSize != null ? titleIconSize : 24,
                                        height: titleIconSize != null ? titleIconSize : 24,
                                        className: "me-2",
                                        preserveColors: true
                                      }
                                    ),
                                    title
                                  ]
                                }
                              ),
                              hasDescription && /* @__PURE__ */ jsx("div", { id: descriptionId, className: "modal-description", children: description })
                            ] }),
                            headerActions != null && headerActions !== false && /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "modal-header-actions",
                                style: { display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 },
                                children: headerActions
                              }
                            ),
                            showCloseButton && /* @__PURE__ */ jsx(
                              Button_default,
                              {
                                variant: "link",
                                onClick: handleClose,
                                icon: close_default,
                                size: "sm",
                                style: { flexShrink: 0, marginTop: "-0.25rem" },
                                "aria-label": "Close dialog"
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: ["modal-body", bodyScroll ? "" : "modal-body--fixed", bodyClassName].filter(Boolean).join(" "),
                          "data-body-scroll": bodyScroll ? void 0 : "false",
                          style: {
                            overflowY: !bodyScroll ? "hidden" : scrollOutside ? "visible" : "auto",
                            overflowX: "hidden",
                            flex: 1,
                            minHeight: 0,
                            padding: "1rem 1.25rem",
                            ...bodyScroll ? null : { display: "flex", flexDirection: "column" }
                          },
                          children
                        }
                      ),
                      !hideFooter && (footer != null || onConfirm) && /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "modal-footer",
                          style: {
                            flexShrink: 0,
                            display: "flex",
                            gap: "0.75rem",
                            justifyContent: "flex-end",
                            flexWrap: "wrap",
                            padding: "1rem 1.25rem",
                            borderTop: "1px solid var(--color-border-subtle, var(--color-mist-60))"
                          },
                          children: footer != null ? footer : /* @__PURE__ */ jsxs(Fragment, { children: [
                            showCancel && /* @__PURE__ */ jsx(
                              Button_default,
                              {
                                variant: cancelButtonVariant,
                                size: "md",
                                onClick: handleClose,
                                textColor: cancelButtonColor,
                                backgroundColor: cancelButtonBackground,
                                borderColor: cancelButtonBorder,
                                children: cancelText
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              Button_default,
                              {
                                variant: confirmButtonVariant,
                                size: confirmButtonVariant === "primary" ? "lg" : "md",
                                onClick: handleConfirm,
                                disabled: confirmDisabled,
                                loading: confirmLoading,
                                "aria-busy": confirmLoading || void 0,
                                textColor: confirmButtonColor,
                                backgroundColor: confirmButtonBackground,
                                borderColor: confirmButtonBorder,
                                children: confirmText
                              }
                            )
                          ] })
                        }
                      )
                    ]
                  }
                )
              }
            )
          }
        )
      ]
    }
  ) });
  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}

export {
  Modal
};
//# sourceMappingURL=chunk-O6W7CP52.mjs.map