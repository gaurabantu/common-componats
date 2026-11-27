import { OTP_BOX_REJECT } from "./OtpBox.config";
import type { OtpBoxType } from "./OtpBox.types";

/** Strip characters the `type` does not accept (also strips the mask bullet). */
export function filterOtp(type: OtpBoxType, raw: string): string {
  return raw.replace(OTP_BOX_REJECT[type], "");
}

/** Split a string into exactly `length` cells ("" for empty). */
export function toCells(value: string, length: number): string[] {
  return Array.from({ length }, (_, i) => value.charAt(i));
}

/** Default per-cell label: "Digit 2 of 6" / "Character 2 of 6". */
export function defaultCellLabel(type: OtpBoxType, index: number, length: number): string {
  return `${type === "numeric" ? "Digit" : "Character"} ${index + 1} of ${length}`;
}
