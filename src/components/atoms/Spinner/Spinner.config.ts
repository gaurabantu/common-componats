import type { SpinnerSize, SpinnerTone } from "./Spinner.types";

export const SPINNER_DEFAULTS: {
  size: SpinnerSize;
  tone: SpinnerTone;
  label: string;
  decorative: boolean;
} = {
  size: "md",
  tone: "current",
  label: "Loading",
  decorative: false,
};

export const SPINNER_SIZES: readonly SpinnerSize[] = ["xs", "sm", "md", "lg"] as const;

export const SPINNER_TONES: readonly SpinnerTone[] = ["current", "primary", "muted", "inverse"] as const;
