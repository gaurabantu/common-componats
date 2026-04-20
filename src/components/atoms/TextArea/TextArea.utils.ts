// packages/ui-components/src/components/TextArea/TextArea.utils.ts

import { getSanitizeText } from "../../../utils/uiPanValidators";

/**
 * Utility wrapper around the sanitizer so the component file stays clean.
 * Returns sanitized value if sanitize flag is true, otherwise returns original.
 */
export function sanitizeValue(
  value: string,
  opts?: {
    removeChars?: string;
    removeEmojis?: boolean;
    normalizeAccents?: boolean;
    toCase?: '' | 'U' | 'L' | 'C';
  }
) {
  if (!opts) return value;

  const { removeChars, removeEmojis, normalizeAccents, toCase } = opts;

  let out = value ?? '';

  // Use your text-validator implementation (assumed signature)
  try {
    out = getSanitizeText(out, removeChars ?? '', !!removeEmojis, !!normalizeAccents);
  } catch (err) {
    // If sanitizer fails for any reason, fallback to raw value
    // but don't throw, keep library resilient.
    // console.warn('sanitizeValue: sanitizer failed', err);
    out = value;
  }

  if (toCase === 'U') out = out.toUpperCase();
  else if (toCase === 'L') out = out.toLowerCase();
  else if (toCase === 'C') out = out.charAt(0).toUpperCase() + out.slice(1);

  return out;
}
