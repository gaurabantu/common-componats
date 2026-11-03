import type { HTMLAttributes, ReactNode } from "react";

/** Control height tier. `sm` = 36px segments, `md` = 40px segments (44px on coarse pointers). */
export type SegmentedControlSize = "sm" | "md";

export interface SegmentedControlOption {
  /** Unique value reported by `onValueChange`. */
  value: string;
  /**
   * Visible label — the radio's accessible name when it is a string / number.
   * For icon-only options pass the icon here (or `null` with `icon`) and set `ariaLabel`.
   */
  label: ReactNode;
  /**
   * Accessible name of the radio. **Required** when `label` is not a string or number
   * (icon-only option); a development warning fires when it is missing. Overrides the label when set.
   */
  ariaLabel?: string;
  /** Optional leading icon — rendered decoratively (`aria-hidden`). */
  icon?: ReactNode;
  /** Skipped by arrow keys and not selectable. */
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue" | "role" | "aria-label"> {
  /** The choices, in visual order. */
  options: SegmentedControlOption[];
  /** Selected value (controlled). */
  value?: string;
  /** Initial value when uncontrolled. When omitted nothing is selected until the user picks. */
  defaultValue?: string;
  /** Fires with the newly selected value (never for a re-click on the current value). */
  onValueChange?: (value: string) => void;
  /** @default "md" */
  size?: SegmentedControlSize;
  /** Stretch to the container width; every segment gets an equal share. */
  fullWidth?: boolean;
  /** Accessible name of the radiogroup — required (there is no visible group label). */
  ariaLabel: string;
  /** Disable the whole control. */
  disabled?: boolean;
}
