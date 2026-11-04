import type React from "react";

export type SliderSize = "sm" | "md";

interface SliderBaseProps {
  /** @default 0 */
  min?: number;
  /** @default 100 */
  max?: number;
  /** @default 1 */
  step?: number;
  disabled?: boolean;
  /** Visible label above the track (wired with `<label for>` / `aria-labelledby`). */
  label?: React.ReactNode;
  /** Accessible name when there is no visible `label`. */
  ariaLabel?: string;
  "aria-labelledby"?: string;
  /** Show the current value (formatted) next to the label. @default false */
  showValue?: boolean;
  /** Formats the value label and `aria-valuetext` (e.g. `v => \`${v}%\``). */
  valueFormatter?: (value: number) => string;
  /** Show min / max under the track. @default false */
  showMinMax?: boolean;
  /** @default "md" */
  size?: SliderSize;
  id?: string;
  /** Form field name. Range sliders submit `name` twice (low, high). */
  name?: string;
  className?: string;
}

export interface SliderSingleProps extends SliderBaseProps {
  range?: false;
  value?: number;
  /** @default min */
  defaultValue?: number;
  /** Fires on every change (drag / key). */
  onValueChange?: (value: number) => void;
  /** Alias of `onValueChange`. */
  onChange?: (value: number) => void;
  /** Fires when the user releases the pointer or finishes a key press. */
  onValueCommit?: (value: number) => void;
}

export interface SliderRangeProps extends SliderBaseProps {
  /** Two thumbs: `[low, high]`. */
  range: true;
  value?: [number, number];
  /** @default [min, max] */
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  /** Alias of `onValueChange`. */
  onChange?: (value: [number, number]) => void;
  onValueCommit?: (value: [number, number]) => void;
  /** Accessible names for the two thumbs. @default ["Minimum", "Maximum"] (prefixed by `ariaLabel`) */
  thumbLabels?: [string, string];
}

export type SliderProps = SliderSingleProps | SliderRangeProps;
