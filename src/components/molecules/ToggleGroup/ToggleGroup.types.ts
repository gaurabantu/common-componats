import type React from "react";
import type { ToggleButtonSize, ToggleButtonVariant } from "../../atoms/ToggleButton/ToggleButton.types";

export interface ToggleGroupItem {
  value: string;
  /** Visible text. Omit for icon-only items (then `ariaLabel` is required). */
  label?: React.ReactNode;
  icon?: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  /** Native tooltip text. */
  title?: string;
}

interface ToggleGroupBaseProps {
  /** Items to render. Alternatively pass `<ToggleButton value="…">` children. */
  items?: ToggleGroupItem[];
  children?: React.ReactNode;
  /** Accessible name of the group (e.g. "Text formatting"). */
  ariaLabel?: string;
  "aria-labelledby"?: string;
  /** @default "sm" — same tiers as Button */
  size?: ToggleButtonSize;
  /** @default "ghost" */
  variant?: ToggleButtonVariant;
  disabled?: boolean;
  /** Arrow-key direction. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /**
   * Roving tabindex: the group is one Tab stop and arrow keys / Home / End move between items.
   * @default true
   */
  rovingFocus?: boolean;
  className?: string;
  id?: string;
}

export interface ToggleGroupSingleProps extends ToggleGroupBaseProps {
  /** At most one item pressed (alignment: left / centre / right). */
  type: "single";
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Clicking the pressed item un-presses it (value → null). @default true */
  allowDeselect?: boolean;
}

export interface ToggleGroupMultipleProps extends ToggleGroupBaseProps {
  /** Any number of items pressed (Bold / Italic / Underline). */
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;
