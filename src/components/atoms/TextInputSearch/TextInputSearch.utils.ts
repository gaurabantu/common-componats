import type { ButtonSize } from "../Button/Button.config";

/** Compact Button tier embedded in `headerSearch` rail — avoids 44×44 icon tiles stretching the shell. */
export function railButtonSize(inputSize: string): ButtonSize {
  switch (inputSize) {
    case "lg":
      return "sm";
    case "md":
      return "xs";
    default:
      return "xxs";
  }
}
