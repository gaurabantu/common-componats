export const defaultModalOptions = {
  size: "md" as const,
  animation: "fade" as const,
  animationDuration: 225,
  closeAfterTransition: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  showCancel: true,
  /** Matches `tokens.css` `--z-modal` */
  zIndex: 400,
};

export const modalSizeMap: Record<string, string> = {
  sm: "modal-sm",
  md: "",
  lg: "modal-lg",
  xl: "modal-xl",
  xxl: "modal-xxl",
};

/** §27 canonical widths; xl/xxl = legacy wide modals */
export const modalSizeWidths: Record<string, string> = {
  sm: "400px",
  md: "480px",
  lg: "560px",
  xl: "800px",
  xxl: "min(1140px, 90vw)",
};
