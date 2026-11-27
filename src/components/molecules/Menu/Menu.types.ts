import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, SyntheticEvent } from "react";
import type { PopoverPlacement } from "../Popover/popoverPosition";

export type MenuPlacement = PopoverPlacement;

/** Row tone. `danger` = destructive action (red text, still ≥ 4.5:1). */
export type MenuItemVariant = "default" | "danger";

/** Which item receives focus when a menu opens. */
export type MenuFocusIntent = "first" | "last" | "none";

export interface MenuProps {
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface MenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /**
   * Merge the trigger behaviour onto the single child (e.g. a library `Button`) instead of rendering
   * a wrapping `<button>` — avoids nested buttons.
   * @default false
   */
  asChild?: boolean;
}

export interface MenuContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Preferred side / alignment; flips vertically and clamps horizontally to stay in the viewport. @default "bottom-start" */
  placement?: MenuPlacement;
  /** ArrowUp / ArrowDown wrap at the ends. @default true */
  loop?: boolean;
  /**
   * Stacking order. Default `var(--z-popover, 450)`, lifted above the anchor's highest stacked
   * ancestor (menus inside host dialogs stay on top).
   */
  zIndex?: number | string;
}

/** Event passed to `onSelect`; call `preventDefault()` to keep the menu open. */
export type MenuSelectEvent = SyntheticEvent<HTMLElement>;

export interface MenuItemProps extends Omit<HTMLAttributes<HTMLElement>, "onSelect"> {
  children: ReactNode;
  /** Click / Enter / Space. Closes the whole menu unless `closeOnSelect` is false or the event is default-prevented. */
  onSelect?: (event: MenuSelectEvent) => void;
  variant?: MenuItemVariant;
  /** `aria-disabled`; skipped by arrow keys and typeahead; never fires `onSelect`. */
  disabled?: boolean;
  /** Leading icon (decorative). */
  icon?: ReactNode;
  /** Secondary line under the label (part of the accessible name). */
  description?: ReactNode;
  /**
   * Shortcut hint. A key array (`["mod", "k"]`) renders `Kbd` and sets `aria-keyshortcuts`;
   * any other node is drawn as-is. Display only — wire the actual key handler yourself.
   */
  shortcut?: string[] | ReactNode;
  /** Text used by typeahead when the label is not plain text. */
  textValue?: string;
  /** Render as a link (`<a role="menuitem">`). Unsafe schemes (`javascript:` …) are dropped. */
  href?: string;
  target?: string;
  rel?: string;
  /** @default true for plain items, false for checkbox / radio items */
  closeOnSelect?: boolean;
}

export interface MenuCheckboxItemProps extends Omit<MenuItemProps, "variant" | "href" | "target" | "rel"> {
  checked?: boolean;
  /** @default false */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export interface MenuRadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Visible label that also names the group. */
  label?: ReactNode;
}

export interface MenuRadioItemProps extends Omit<MenuItemProps, "variant" | "href" | "target" | "rel"> {
  value: string;
}

export interface MenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Visible label that also names the group (`role="group"` + `aria-labelledby`). */
  label?: ReactNode;
}

export type MenuLabelProps = HTMLAttributes<HTMLDivElement>;

export type MenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

export interface MenuSubProps {
  children: ReactNode;
}

export interface MenuSubTriggerProps
  extends Omit<MenuItemProps, "onSelect" | "closeOnSelect" | "href" | "target" | "rel" | "variant" | "shortcut"> {}

export type MenuSubContentProps = Omit<MenuContentProps, "placement">;
