import type { ButtonGroupOrientation } from "./ButtonGroup.types";

export const BUTTON_GROUP_DEFAULTS: {
  orientation: ButtonGroupOrientation;
  attached: boolean;
  disabled: boolean;
  fullWidth: boolean;
} = {
  orientation: "horizontal",
  // Joined segments were the only layout before `attached` existed — keep it the default.
  attached: true,
  disabled: false,
  fullWidth: false,
};

export const BUTTON_GROUP_ORIENTATIONS: readonly ButtonGroupOrientation[] = [
  "horizontal",
  "vertical",
] as const;
