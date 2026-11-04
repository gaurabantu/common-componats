export type ModalAnimation = "none" | "fade" | "slide" | "scale";

/** `"fullscreen"` fills the whole viewport (no margin, no radius) — for full-page editors / workspaces. */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "xxl" | "fullscreen";

/**
 * Attributes passed through to the Modal's outermost root element (`.modal-root`, which wraps the
 * backdrop and the dialog). Use for `data-*` hooks (e.g. `data-anchored-popover`), test ids, etc.
 */
export type ModalRootProps = React.HTMLAttributes<HTMLDivElement> & {
  [dataAttr: `data-${string}`]: string | number | boolean | undefined;
};

/**
 * - `"inside"` (default): the dialog is capped to the viewport and only the body scrolls; header and footer stay fixed.
 * - `"outside"`: the dialog grows with its content and the whole dialog scrolls inside the viewport.
 */
export type ModalScrollBehavior = "inside" | "outside";

/**
 * Cancelable event passed to `onOpenAutoFocus` / `onCloseAutoFocus`.
 * Call `event.preventDefault()` to stop the Modal's built-in focus move.
 */
export type ModalAutoFocusEvent = Event;

/**
 * Focus behaviour: on open, focus moves to `initialFocusRef`, else the first focusable element,
 * else the dialog. Tab is trapped inside. **On close, focus returns to the element that was focused
 * when the modal opened** (added in Sprint 1; earlier versions left focus on `<body>`). Opt out per
 * instance with `onCloseAutoFocus={(e) => e.preventDefault()}`.
 *
 * Stacking: Modal and Drawer share an overlay stack (`overlayStack.ts`). Only the top-most layer
 * handles Escape and backdrop clicks, so one Escape closes one layer.
 */
export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Called when modal should close (backdrop click, escape, close button) */
  onClose: () => void;
  /**
   * Modal title — the dialog's accessible name (`aria-labelledby`). A string or any ReactNode
   * (e.g. a code badge + text). When it is not plain text, pass `ariaLabel` for a clean accessible name.
   */
  title: React.ReactNode;
  /**
   * Explicit accessible name. When set it is used as `aria-label` instead of `aria-labelledby` → title.
   * Also names the dialog when `hideHeader` is set.
   */
  ariaLabel?: string;
  /**
   * Supporting content rendered under the title (in a block `<div>`, so paragraphs / lists are fine)
   * and wired to the dialog's `aria-describedby`. Not rendered when `hideHeader` is set.
   */
  description?: React.ReactNode;
  /** Extra controls rendered in the title bar, before the close (X) button (e.g. Export, Copy). */
  headerActions?: React.ReactNode;
  /**
   * Guard run before any user-initiated close (Escape, backdrop, close button, Cancel). Return `false`
   * (or a promise resolving to `false`) to keep the modal open — e.g. an unsaved-changes check.
   * Repeat close requests are ignored while a returned promise is pending.
   */
  onBeforeClose?: () => boolean | Promise<boolean>;
  /**
   * `false` makes the body a fixed, non-scrolling flex column (`overflow: hidden`) so children own
   * their scroll — for multi-pane dialogs. @default true
   */
  bodyScroll?: boolean;
  /** Extra class on the body element. */
  bodyClassName?: string;
  /**
   * `false` disables all open/close animation and transforms on the dialog (no `transform` is ever
   * applied), and closes immediately. Use when the modal hosts dnd-kit `DragOverlay` or other
   * `position: fixed` content that a transformed ancestor would shift. @default true
   */
  animate?: boolean;
  /** Attributes spread onto the outermost root (`.modal-root`), e.g. `{ "data-anchored-popover": "" }`. */
  rootProps?: ModalRootProps;
  /** Modal body content */
  children: React.ReactNode;
  /** Called when confirm button is clicked */
  onConfirm?: () => void;
  /** Confirm button text */
  confirmText?: string;
  /** Disable confirm button */
  confirmDisabled?: boolean;
  /**
   * Show the confirm Button's loading state (spinner, `aria-busy`) and ignore further confirm clicks
   * until it is cleared — set it while `onConfirm`'s async work runs. @default false
   */
  confirmLoading?: boolean;
  /** Cancel button text */
  cancelText?: string;
  /** Show cancel button */
  showCancel?: boolean;
  /** Hide footer */
  hideFooter?: boolean;
  /** Custom footer content (fixed below the scrolling body); replaces the Cancel/Confirm pair */
  footer?: React.ReactNode;
  /** Modal size */
  size?: ModalSize;
  /** DOM id for accessibility */
  id?: string;
  /** Show close (X) button in header */
  showCloseButton?: boolean;
  /** Stacked modals: separate backdrop for nested modals */
  isStackedBackground?: boolean;
  /** z-index for the modal layer (backdrop; the dialog sits at `zIndex + 1`). @default 400 (`--z-modal`) */
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
  /** Element to focus when the modal opens. Defaults to the first focusable element, then the dialog. */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Where overflow scrolls — see `ModalScrollBehavior`. @default "inside" */
  scrollBehavior?: ModalScrollBehavior;
  /** Fill the whole viewport (no margin, no radius) at ≤ 480px. @default false */
  fullscreenOnMobile?: boolean;
  /**
   * Called when the modal is about to move focus inside on open. `event.preventDefault()` skips the move
   * (you then own focus placement).
   */
  onOpenAutoFocus?: (event: ModalAutoFocusEvent) => void;
  /**
   * Called when the modal closes, before focus returns to the element that was focused when it opened.
   * Returning focus is the default since Sprint 1 (previously focus was dropped to `<body>`);
   * call `event.preventDefault()` to opt out (e.g. to focus something else, or keep the old behaviour).
   */
  onCloseAutoFocus?: (event: ModalAutoFocusEvent) => void;
  /** Confirm button variant: primary, link, ghost, outlinePrimary, danger, etc. */
  confirmButtonVariant?: "primary" | "link" | "ghost" | "outlinePrimary" | "outlineSecondary" | "danger";
  /**
   * Confirm button text color.
   * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `confirmButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
   */
  confirmButtonColor?: string;
  /**
   * Confirm button background (use "transparent" for no background).
   * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `confirmButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
   */
  confirmButtonBackground?: string;
  /**
   * Confirm button border color.
   * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `confirmButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
   */
  confirmButtonBorder?: string;
  /** Cancel button variant */
  cancelButtonVariant?: "primary" | "link" | "ghost" | "outlinePrimary" | "outlineSecondary";
  /**
   * Cancel button text color.
   * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `cancelButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
   */
  cancelButtonColor?: string;
  /**
   * Cancel button background.
   * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `cancelButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
   */
  cancelButtonBackground?: string;
  /**
   * Cancel button border color.
   * @deprecated Raw colour overrides bypass theme tokens and break dark / mist themes. Use `cancelButtonVariant`, or pass your own buttons through the `footer` slot. Still applied for backward compatibility.
   */
  cancelButtonBorder?: string;
  /** Any `data-*` attribute passed directly on `<Modal>` is forwarded to the root (same as `rootProps`). */
  [dataAttr: `data-${string}`]: string | number | boolean | undefined;
}
