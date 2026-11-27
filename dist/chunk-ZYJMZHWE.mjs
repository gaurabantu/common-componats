/* ucs:component-css */
import "./styles/components/molecules/Modal/Modal.css";
import "./styles/components/molecules/AlertDialog/AlertDialog.css";
import {
  Modal
} from "./chunk-O6W7CP52.mjs";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";

// src/components/molecules/AlertDialog/AlertDialog.config.ts
var alertDialogVariantConfig = {
  info: {
    icon: "\u2139",
    iconColor: "var(--color-state-info)",
    bgColor: "color-mix(in srgb, var(--color-state-info) 10%, transparent)"
  },
  success: {
    icon: "\u2713",
    iconColor: "var(--color-state-success)",
    bgColor: "color-mix(in srgb, var(--color-state-success) 10%, transparent)"
  },
  warning: {
    icon: "\u26A0",
    iconColor: "var(--color-state-warning)",
    bgColor: "color-mix(in srgb, var(--color-state-warning) 10%, transparent)"
  },
  error: {
    icon: "\u2715",
    iconColor: "var(--color-state-error)",
    bgColor: "color-mix(in srgb, var(--color-state-error) 10%, transparent)"
  }
};

// src/components/molecules/AlertDialog/AlertDialogIcons.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var iconSize = 56;
function SuccessIconSvg({
  animated,
  color = "var(--color-state-success)",
  bgColor = "color-mix(in srgb, var(--color-state-success) 10%, transparent)"
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--success" : "",
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "28", cy: "28", r: "26", fill: bgColor }),
        /* @__PURE__ */ jsx(
          "path",
          {
            className: animated ? "alert-dialog-checkmark" : "",
            d: "M16 28l8 8 16-16",
            stroke: color,
            strokeWidth: "3",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none"
          }
        )
      ]
    }
  );
}
function ErrorIconSvg({
  animated,
  color = "var(--color-state-error)",
  bgColor = "color-mix(in srgb, var(--color-state-error) 10%, transparent)"
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--error" : "",
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "28", cy: "28", r: "26", fill: bgColor }),
        /* @__PURE__ */ jsx("path", { d: "M28 18v14", stroke: color, strokeWidth: "3", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("circle", { cx: "28", cy: "38", r: "2.5", fill: color })
      ]
    }
  );
}
function WarningIconSvg({
  animated,
  color = "var(--color-state-warning)",
  bgColor = "color-mix(in srgb, var(--color-state-warning) 10%, transparent)"
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--warning" : "",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M28 12L44 42H12L28 12z",
            fill: bgColor,
            stroke: color,
            strokeWidth: "2",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M28 22v10", stroke: color, strokeWidth: "2.5", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("circle", { cx: "28", cy: "38", r: "2", fill: color })
      ]
    }
  );
}

// src/components/molecules/AlertDialog/index.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function VariantIcon({
  variant,
  animated
}) {
  const config = alertDialogVariantConfig[variant];
  const color = config.iconColor;
  const bgColor = config.bgColor;
  if (variant === "success") {
    return /* @__PURE__ */ jsx2(SuccessIconSvg, { animated, color, bgColor });
  }
  if (variant === "error") {
    return /* @__PURE__ */ jsx2(ErrorIconSvg, { animated, color, bgColor });
  }
  if (variant === "warning") {
    return /* @__PURE__ */ jsx2(WarningIconSvg, { animated, color, bgColor });
  }
  return /* @__PURE__ */ jsx2(
    "span",
    {
      className: animated ? "alert-dialog-icon--animated" : "",
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: config.bgColor,
        color: config.iconColor,
        fontSize: 24
      },
      children: config.icon
    }
  );
}
function AlertDialog({
  isOpen,
  onClose,
  title,
  description,
  variant = "info",
  iconAnimated = true,
  icon: customIcon,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  showCancel = false,
  destructive = false,
  confirmDisabled = false,
  size = "md",
  closeOnBackdropClick,
  closeOnEscape = true,
  zIndex = 400,
  confirmButtonVariant,
  confirmButtonColor,
  confirmButtonBackground,
  confirmButtonBorder,
  cancelButtonVariant = "outlineSecondary",
  cancelButtonColor,
  cancelButtonBackground,
  cancelButtonBorder
}) {
  const allowBackdropDismiss = closeOnBackdropClick != null ? closeOnBackdropClick : !destructive;
  const sizeMap = { sm: "sm", md: "md", lg: "lg" };
  const handleConfirm = () => {
    onConfirm == null ? void 0 : onConfirm();
    onClose();
  };
  const handleCancel = () => {
    onCancel == null ? void 0 : onCancel();
    onClose();
  };
  return /* @__PURE__ */ jsx2(
    Modal,
    {
      isOpen,
      onClose,
      title: "",
      size: sizeMap[size],
      hideFooter: true,
      hideHeader: true,
      showCloseButton: false,
      closeOnBackdropClick: allowBackdropDismiss,
      closeOnEscape,
      zIndex,
      animation: "scale",
      children: /* @__PURE__ */ jsxs2(
        "div",
        {
          className: "alert-dialog-content",
          role: "alertdialog",
          "aria-labelledby": "alert-dialog-title",
          "aria-describedby": "alert-dialog-desc",
          children: [
            /* @__PURE__ */ jsx2("div", { style: { marginBottom: "1.25rem", display: "flex", justifyContent: "center" }, children: customIcon != null ? customIcon : /* @__PURE__ */ jsx2(VariantIcon, { variant, animated: iconAnimated }) }),
            /* @__PURE__ */ jsx2(
              "h2",
              {
                id: "alert-dialog-title",
                style: {
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary)"
                },
                children: title
              }
            ),
            description && /* @__PURE__ */ jsx2(
              "p",
              {
                id: "alert-dialog-desc",
                style: {
                  margin: "0.5rem 0 1.25rem",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.5
                },
                children: description
              }
            ),
            /* @__PURE__ */ jsxs2("div", { className: "alert-dialog-actions", children: [
              showCancel && /* @__PURE__ */ jsx2(
                Button_default,
                {
                  variant: cancelButtonVariant,
                  size: "md",
                  onClick: handleCancel,
                  textColor: cancelButtonColor,
                  backgroundColor: cancelButtonBackground,
                  borderColor: cancelButtonBorder,
                  children: cancelText
                }
              ),
              /* @__PURE__ */ jsx2(
                Button_default,
                {
                  variant: confirmButtonVariant != null ? confirmButtonVariant : destructive ? "outlinePrimary" : "primary",
                  size: destructive ? "md" : "lg",
                  onClick: handleConfirm,
                  disabled: confirmDisabled,
                  textColor: confirmButtonColor,
                  backgroundColor: confirmButtonBackground,
                  borderColor: confirmButtonBorder,
                  children: confirmText
                }
              )
            ] })
          ]
        }
      )
    }
  );
}

export {
  AlertDialog
};
//# sourceMappingURL=chunk-ZYJMZHWE.mjs.map