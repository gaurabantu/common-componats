import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, RefObject } from "react";
import type { PopoverPlacement } from "./popoverPosition";

export interface PopoverContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  triggerId: string;
  contentId: string;
  triggerRef: RefObject<HTMLElement | null>;
  /** Positioning anchor (PopoverAnchor / `anchorRef`); falls back to the trigger. */
  anchorRef: RefObject<HTMLElement | null>;
  placement: PopoverPlacement;
}

export interface PopoverProps {
  children: ReactNode;
  /** Controlled open state */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PopoverPlacement;
  /**
   * Position the panel against this external element instead of the trigger (e.g. a grid cell
   * or a toolbar). A `PopoverTrigger` becomes optional — drive `open` yourself.
   * Clicks on the anchor do not count as "outside".
   */
  anchorRef?: RefObject<HTMLElement | null>;
}

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Maps to `aria-haspopup` (menus, dialogs, listbox, etc.). */
  hasPopup?: "dialog" | "menu" | "true" | "listbox";
  /**
   * Render the single child element as the trigger instead of a wrapping `<button>` (Radix-style).
   * Use it with a library `Button` (or any focusable element) to avoid nested buttons. Trigger
   * props, aria attributes, ref and `onClick` are merged onto the child; a child `onClick` that
   * calls `preventDefault()` cancels the toggle.
   * @default false
   */
  asChild?: boolean;
}

export interface PopoverAnchorProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Use the single child element as the anchor instead of a wrapping `<div>`. @default false */
  asChild?: boolean;
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Override default role (dialog for generic popover) */
  role?: "dialog" | "region" | "menu" | "none";
  /**
   * Show a small pointer toward the trigger so the panel reads as anchored to the button/icon.
   * @default true — plain box: pass `showPointer={false}`.
   * `DropdownMenuContent` defaults to `false`.
   */
  showPointer?: boolean;
  /**
   * Stacking order of the portalled panel. Number or any CSS value (e.g. `"var(--app-z-menu)"`).
   * Default: `var(--z-popover, 450)` — above the library Modal (`--z-modal` 400) and Drawer —
   * automatically lifted to one above the highest z-index among the anchor's ancestors, so a menu
   * opened inside a host dialog at z 10000 renders at 10001.
   */
  zIndex?: number | string;
}

export interface DropdownMenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  children: ReactNode;
  /** Called when item is chosen; menu closes after (unless `closeOnSelect` is false) */
  onSelect?: () => void;
  /** Destructive action styling */
  variant?: "default" | "danger";
  disabled?: boolean;
  /** Press ripple; off when disabled. @default true */
  ripple?: boolean;
  /** Leading icon / adornment (decorative — keep the label as text). */
  icon?: ReactNode;
  /** Secondary text under the label (included in the accessible name). */
  description?: ReactNode;
  /** Trailing hint such as a keyboard shortcut (`⌘C`). Rendered `aria-hidden`. */
  shortcut?: ReactNode;
  /** Indentation level (0 = none); each level adds one spacing step. @default 0 */
  indent?: number;
  /** Close the menu after selection. @default true */
  closeOnSelect?: boolean;
}

export interface DropdownMenuCheckboxItemProps extends Omit<DropdownMenuItemProps, "variant"> {
  /** Controlled checked state. */
  checked?: boolean;
  /** Uncontrolled initial state. @default false */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** @default false — toggles keep the menu open */
  closeOnSelect?: boolean;
}

export interface DropdownMenuRadioGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Visible group label (also names the group). */
  label?: ReactNode;
}

export interface DropdownMenuRadioItemProps extends Omit<DropdownMenuItemProps, "variant"> {
  value: string;
  /** @default false — choosing keeps the menu open */
  closeOnSelect?: boolean;
}

export interface DropdownMenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Visible group label; also becomes the group's accessible name. */
  label?: ReactNode;
}

export interface DropdownMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Indentation level to line up with indented / icon rows. @default 0 */
  indent?: number;
}

export type DropdownMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

export interface ListboxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Allow multiple selection (`aria-multiselectable`). @default false */
  multiple?: boolean;
}

export interface ListboxOptionProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect" | "role"> {
  children: ReactNode;
  /** `aria-selected` + selected styling. @default false */
  selected?: boolean;
  /** `aria-disabled`, skipped by keyboard navigation. @default false */
  disabled?: boolean;
  /** Secondary text under the label. */
  description?: ReactNode;
  /** Leading icon / adornment. */
  icon?: ReactNode;
  /** Trailing adornment (count, shortcut, badge). */
  trailing?: ReactNode;
  /** Indentation level (tree-like lists). @default 0 */
  indent?: number;
  /** Click, Enter or Space. */
  onSelect?: () => void;
  /** Row role. Use "menuitem" inside a custom role="menu". @default "option" */
  role?: "option" | "menuitem" | "treeitem";
}
