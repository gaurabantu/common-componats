import { defaultMaxLength } from "./TextInput.config";
import { TextInputProps, ValidationType } from "./TextInput.types";

export function getDefaultMaxLength(validation: ValidationType): number {
  return defaultMaxLength[validation] ?? 255;
}

/** Same resolver as field shell — use so trailing rails (e.g. search action) match `TextInput rounded`. */
export function roundedToCssCorner(
  rounded: TextInputProps["rounded"] | undefined,
): string | 0 {
  const r = rounded ?? "3";
  if (r === "0") return 0;
  if (r === "1") return "var(--radius-xs, 2px)";
  if (r === "2") return "var(--radius-sm, 3px)";
  if (r === "3") return "var(--radius-base, 4px)";
  if (r === "4") return "var(--radius-md, 6px)";
  if (r === "5") return "var(--radius-lg, 8px)";
  return "9999px";
}