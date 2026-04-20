import { defaultMaxLength } from "./TextInput.config";
import { ValidationType } from "./TextInput.types";

export function getDefaultMaxLength(validation: ValidationType): number {
  return defaultMaxLength[validation] ?? 255;
}