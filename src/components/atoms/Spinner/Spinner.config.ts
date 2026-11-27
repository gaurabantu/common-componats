import type {
  SpinnerSize,
  SpinnerSpeed,
  SpinnerThickness,
  SpinnerTone,
  SpinnerVariant,
} from "./Spinner.types";

export const SPINNER_DEFAULTS: {
  size: SpinnerSize;
  tone: SpinnerTone;
  variant: SpinnerVariant;
  speed: SpinnerSpeed;
  delay: number;
  label: string;
  decorative: boolean;
} = {
  size: "md",
  tone: "current",
  variant: "ring",
  speed: "normal",
  delay: 0,
  label: "Loading",
  decorative: false,
};

export const SPINNER_SIZES: readonly SpinnerSize[] = ["xs", "sm", "md", "lg", "xl"] as const;

export const SPINNER_TONES: readonly SpinnerTone[] = ["current", "primary", "muted", "inverse"] as const;

export const SPINNER_VARIANTS: readonly SpinnerVariant[] = ["ring", "dots", "bars"] as const;

export const SPINNER_THICKNESSES: readonly SpinnerThickness[] = ["thin", "regular", "thick"] as const;

export const SPINNER_SPEEDS: readonly SpinnerSpeed[] = ["slow", "normal", "fast"] as const;

/** Number of child elements rendered for the `dots` / `bars` variants. */
export const SPINNER_SEGMENTS = 3;
