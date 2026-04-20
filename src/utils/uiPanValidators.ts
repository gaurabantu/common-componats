type MaskFrom = "start" | "end";

interface MaskerOptions {
  maskChar?: string;
  maskFrom?: MaskFrom;
  maskPattern?: number[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PAN_REGEX = /^[A-Z]{5}\d{4}[A-Z]$/;
const AADHAAR_REGEX = /^\d{12}$/;
const TAN_REGEX = /^[A-Z]{4}\d{5}[A-Z]$/;
const PASSPORT_REGEX = /^[A-Z][1-9]\d{6}$/i;
const PINCODE_REGEX = /^\d{6}$/;
const OTP_REGEX = /^[A-Za-z0-9]{4,8}$/;
const ENTITY_NAME_REGEX = /^[A-Za-z0-9 .,&()'/-]{2,100}$/;

function toDigits(value: string): string {
  return (value ?? "").replace(/\D/g, "");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test((value ?? "").trim());
}

export function isMobile(value: string, isdCode = "+91"): boolean {
  const digits = toDigits(value);
  if (isdCode === "+91") {
    return /^[6-9]\d{9}$/.test(digits);
  }
  return /^\d{6,15}$/.test(digits);
}

export function isPanNumber(value: string): boolean {
  return PAN_REGEX.test((value ?? "").trim().toUpperCase());
}

export function isAadhaar(value: string): boolean {
  return AADHAAR_REGEX.test(toDigits(value));
}

export function isAlphanumeric(value: string): boolean {
  return /^[A-Za-z0-9 ]+$/.test((value ?? "").trim());
}

export function isNumeric(value: string): boolean {
  return /^\d+$/.test((value ?? "").trim());
}

export function isPincode(value: string): boolean {
  return PINCODE_REGEX.test(toDigits(value));
}

export function isAlphabetic(value: string): boolean {
  return /^[A-Za-z ]+$/.test((value ?? "").trim());
}

export function isAcknowledgementNumber(value: string): boolean {
  return /^[A-Z0-9]{8,20}$/.test((value ?? "").trim().toUpperCase());
}

export function isTAN(value: string): boolean {
  return TAN_REGEX.test((value ?? "").trim().toUpperCase());
}

export function isIndianPassport(value: string): boolean {
  return PASSPORT_REGEX.test((value ?? "").trim().toUpperCase());
}

export function isIndianTIN(value: string): boolean {
  return /^[A-Z0-9]{8,20}$/.test((value ?? "").trim().toUpperCase());
}

export function isValidSTDCode(value: string): boolean {
  return /^0?\d{2,5}$/.test(toDigits(value));
}

export function isValidLandlineNumber(value: string): boolean {
  return /^\d{6,11}$/.test(toDigits(value));
}

export function isEntityName(value: string): boolean {
  return ENTITY_NAME_REGEX.test((value ?? "").trim());
}

export function isValidOTP(value: string): boolean {
  return OTP_REGEX.test((value ?? "").trim());
}

export function getSanitizeText(
  value: string,
  removeChars = "",
  removeEmojis = false,
  normalizeAccents = false
): string {
  let output = value ?? "";

  if (normalizeAccents) {
    output = output.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  if (removeEmojis) {
    output = output.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "");
  }

  if (removeChars) {
    output = output.replace(new RegExp(`[${escapeRegExp(removeChars)}]`, "g"), "");
  }

  return output;
}

export class Masker {
  private visibleCount: number;

  private options: Required<Pick<MaskerOptions, "maskChar" | "maskFrom">> &
    Pick<MaskerOptions, "maskPattern">;

  constructor(visibleCount = 4, options: MaskerOptions = {}) {
    this.visibleCount = Math.max(0, visibleCount);
    this.options = {
      maskChar: options.maskChar ?? "*",
      maskFrom: options.maskFrom ?? "start",
      maskPattern: options.maskPattern,
    };
  }

  maskString(value: string): string {
    const input = value ?? "";
    if (!input) return "";
    if (input.length <= this.visibleCount) return input;

    const maskLength = input.length - this.visibleCount;
    const masked = this.options.maskChar.repeat(maskLength);

    if (this.options.maskFrom === "end") {
      return `${input.slice(0, this.visibleCount)}${masked}`;
    }

    return `${masked}${input.slice(-this.visibleCount)}`;
  }
}
