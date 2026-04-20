import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, RefObject } from "react";
import type { PopoverPlacement } from "./popoverPosition";

export interface PopoverContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  triggerId: string;
  contentId: string;
  triggerRef: RefObject<HTMLElement | null>;
  placement: PopoverPlacement;
}

export interface PopoverProps {
  children: ReactNode;
  /** Controlled open state */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PopoverPlacement;
}

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Maps to `aria-haspopup` (menus, dialogs, listbox, etc.). */
  hasPopup?: "dialog" | "menu" | "true" | "listbox";
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Override default role (dialog for generic popover) */
  role?: "dialog" | "region" | "menu" | "none";
  /**
   * Show a small pointer toward the trigger so the panel reads as anchored to the button/icon.
   * Default is off (plain box).
   */
  showPointer?: boolean;
}

export interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Called when item is chosen; menu closes after */
  onSelect?: () => void;
  /** Destructive action styling */
  variant?: "default" | "danger";
  disabled?: boolean;
}
