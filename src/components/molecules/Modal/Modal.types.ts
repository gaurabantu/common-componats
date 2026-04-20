export type ModalAnimation = "none" | "fade" | "slide" | "scale";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "xxl";

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Called when modal should close (backdrop click, escape, close button) */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Modal body content */
  children: React.ReactNode;
  /** Called when confirm button is clicked */
  onConfirm?: () => void;
  /** Confirm button text */
  confirmText?: string;
  /** Disable confirm button */
  confirmDisabled?: boolean;
  /** Cancel button text */
  cancelText?: string;
  /** Show cancel button */
  showCancel?: boolean;
  /** Hide footer */
  hideFooter?: boolean;
  /** Modal size */
  size?: ModalSize;
  /** DOM id for accessibility */
  id?: string;
  /** Show close (X) button in header */
  showCloseButton?: boolean;
  /** Stacked modals: separate backdrop for nested modals */
  isStackedBackground?: boolean;
  /** z-index for modal layer */
  zIndex?: number;
  /** Icon for title: URL, import, or inline React element */
  titleIcon?: React.ReactNode | string | { src: string } | { default: string };
  /** Title icon size */
  titleIconSize?: number;
  /** Animation: none, fade, slide, scale */
  animation?: ModalAnimation;
  /** Duration in ms for enter/exit */
  animationDuration?: number;
  /** Wait for exit animation before unmounting */
  closeAfterTransition?: boolean;
  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape closes modal */
  closeOnEscape?: boolean;
  /** Custom class for modal content */
  className?: string;
  /** Hide header (title + close button) - for custom layouts like AlertDialog */
  hideHeader?: boolean;
  /** Confirm button variant: primary, link, ghost, outlinePrimary, danger, etc. */
  confirmButtonVariant?: "primary" | "link" | "ghost" | "outlinePrimary" | "outlineSecondary" | "danger";
  /** Confirm button text color */
  confirmButtonColor?: string;
  /** Confirm button background (use "transparent" for no background) */
  confirmButtonBackground?: string;
  /** Confirm button border color */
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
