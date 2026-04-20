import React from "react";
import Modal from "../Modal";
import Button from "../../atoms/Button";
import { AlertDialogProps, AlertDialogVariant } from "./AlertDialog.types";
import { alertDialogVariantConfig } from "./AlertDialog.config";
import { SuccessIconSvg, ErrorIconSvg, WarningIconSvg } from "./AlertDialogIcons";
import "../Modal/Modal.css";

export type { AlertDialogProps, AlertDialogVariant } from "./AlertDialog.types";

function VariantIcon({
  variant,
  animated,
}: {
  variant: AlertDialogVariant;
  animated?: boolean;
}) {
  const config = alertDialogVariantConfig[variant];
  const color = config.iconColor;

  if (variant === "success") {
    return <SuccessIconSvg animated={animated} color={color} />;
  }
  if (variant === "error") {
    return <ErrorIconSvg animated={animated} color={color} />;
  }
  if (variant === "warning") {
    return <WarningIconSvg animated={animated} color={color} />;
  }
  return (
    <span
      className={animated ? "alert-dialog-icon--animated" : ""}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: config.bgColor,
        color: config.iconColor,
        fontSize: 24,
      }}
    >
      {config.icon}
    </span>
  );
}

export default function AlertDialog({
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
  closeOnBackdropClick = true,
  closeOnEscape = true,
  zIndex = 400,
  confirmButtonVariant,
  confirmButtonColor,
  confirmButtonBackground,
  confirmButtonBorder,
  cancelButtonVariant = "outlineSecondary",
  cancelButtonColor,
  cancelButtonBackground,
  cancelButtonBorder,
}: AlertDialogProps) {
  const sizeMap = { sm: "sm" as const, md: "md" as const, lg: "lg" as const };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size={sizeMap[size]}
      hideFooter={true}
      hideHeader={true}
      showCloseButton={false}
      closeOnBackdropClick={closeOnBackdropClick}
      closeOnEscape={closeOnEscape}
      zIndex={zIndex}
      animation="scale"
    >
      <div
        role="alertdialog"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-desc"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0.5rem 0",
        }}
      >
        <div style={{ marginBottom: "1.25rem", display: "flex", justifyContent: "center" }}>
          {customIcon ?? <VariantIcon variant={variant} animated={iconAnimated} />}
        </div>
        <h2
          id="alert-dialog-title"
          style={{
            margin: 0,
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--color-text-primary, #333)",
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            id="alert-dialog-desc"
            style={{
              margin: "0.5rem 0 1.25rem",
              fontSize: "0.9375rem",
              color: "var(--color-text-secondary, #666)",
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        )}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {showCancel && (
            <Button
              variant={cancelButtonVariant}
              size="md"
              onClick={handleCancel}
              textColor={cancelButtonColor}
              backgroundColor={cancelButtonBackground}
              borderColor={cancelButtonBorder}
            >
              {cancelText}
            </Button>
          )}
          <Button
            variant={
              confirmButtonVariant ??
              (destructive ? "outlinePrimary" : "primary")
            }
            size={destructive ? "md" : "lg"}
            onClick={handleConfirm}
            disabled={confirmDisabled}
            textColor={confirmButtonColor}
            backgroundColor={confirmButtonBackground}
            borderColor={confirmButtonBorder}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
