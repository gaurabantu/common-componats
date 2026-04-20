export type AlertDialogVariant = "info" | "success" | "warning" | "error";

export interface AlertDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Called when dialog closes */
  onClose: () => void;
  /** Dialog title */
  title: string;
  /** Dialog description/body */
  description?: React.ReactNode;
  /** Variant: info, success, warning, error (affects icon and colors) */
  variant?: AlertDialogVariant;
  /** Show animated icon */
  iconAnimated?: boolean;
  /** Custom icon (overrides variant icon) */
  icon?: React.ReactNode;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Called when confirm is clicked */
  onConfirm?: () => void;
  /** Called when cancel is clicked */
  onCancel?: () => void;
  /** Show cancel button */
  showCancel?: boolean;
  /** Destructive confirm — §27 uses outlined primary (no red fill); override with `confirmButtonVariant` */
  destructive?: boolean;
  /** Disable confirm button */
  confirmDisabled?: boolean;
  /** Size: sm, md, lg */
  size?: "sm" | "md" | "lg";
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Close on Escape */
  closeOnEscape?: boolean;
  /** z-index */
  zIndex?: number;
  /** OK/Confirm button variant: primary, link, ghost, outlinePrimary, danger, etc. */
  confirmButtonVariant?: "primary" | "link" | "ghost" | "outlinePrimary" | "outlineSecondary" | "danger";
  /** OK button text color */
  confirmButtonColor?: string;
  /** OK button background (use "transparent" for no background) */
  confirmButtonBackground?: string;
  /** OK button border color */
  confirmButtonBorder?: string;
  /** Cancel button variant */
  cancelButtonVariant?: "primary" | "link" | "ghost" | "outlinePrimary" | "outlineSecondary";
  /** Cancel button text color */
  cancelButtonColor?: string;
  /** Cancel button background */
  cancelButtonBackground?: string;
  /** Cancel button border color */
  cancelButtonBorder?: string;
}
