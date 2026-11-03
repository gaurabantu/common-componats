import type { NumberInputSize } from "./NumberInput.types";

export const NUMBER_INPUT_DEFAULTS: {
  step: number;
  size: NumberInputSize;
  showSteppers: boolean;
  allowNegative: boolean;
  clampOnBlur: boolean;
  incrementLabel: string;
  decrementLabel: string;
} = {
  step: 1,
  size: "md",
  showSteppers: true,
  allowNegative: true,
  clampOnBlur: true,
  incrementLabel: "Increase",
  decrementLabel: "Decrease",
};

export const NUMBER_INPUT_SIZES: readonly NumberInputSize[] = ["sm", "md", "lg"] as const;

/** Multiplier for Shift+Arrow and PageUp / PageDown. */
export const NUMBER_INPUT_LARGE_STEP = 10;

/** Press-and-hold: delay before repeating, then the repeat interval (ms). */
export const NUMBER_INPUT_REPEAT_DELAY_MS = 400;
export const NUMBER_INPUT_REPEAT_INTERVAL_MS = 60;
