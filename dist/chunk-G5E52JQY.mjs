// src/utils/uiPanValidators.ts
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
var PAN_REGEX = /^[A-Z]{5}\d{4}[A-Z]$/;
var AADHAAR_REGEX = /^\d{12}$/;
var TAN_REGEX = /^[A-Z]{4}\d{5}[A-Z]$/;
var PASSPORT_REGEX = /^[A-Z][1-9]\d{6}$/i;
var PINCODE_REGEX = /^\d{6}$/;
var ENTITY_NAME_REGEX = /^[A-Za-z0-9 .,&()'/-]{2,100}$/;
function toDigits(value) {
  return (value != null ? value : "").replace(/\D/g, "");
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function isValidEmail(value) {
  return EMAIL_REGEX.test((value != null ? value : "").trim());
}
function isMobile(value, isdCode = "+91") {
  const digits = toDigits(value);
  if (isdCode === "+91") {
    return /^[6-9]\d{9}$/.test(digits);
  }
  return /^\d{6,15}$/.test(digits);
}
function isPanNumber(value) {
  return PAN_REGEX.test((value != null ? value : "").trim().toUpperCase());
}
function isAadhaar(value) {
  return AADHAAR_REGEX.test(toDigits(value));
}
function isAlphanumeric(value) {
  return /^[A-Za-z0-9 ]+$/.test((value != null ? value : "").trim());
}
function isNumeric(value) {
  return /^\d+$/.test((value != null ? value : "").trim());
}
function isPincode(value) {
  return PINCODE_REGEX.test(toDigits(value));
}
function isAlphabetic(value) {
  return /^[A-Za-z ]+$/.test((value != null ? value : "").trim());
}
function isAcknowledgementNumber(value) {
  return /^[A-Z0-9]{8,20}$/.test((value != null ? value : "").trim().toUpperCase());
}
function isTAN(value) {
  return TAN_REGEX.test((value != null ? value : "").trim().toUpperCase());
}
function isIndianPassport(value) {
  return PASSPORT_REGEX.test((value != null ? value : "").trim().toUpperCase());
}
function isIndianTIN(value) {
  return /^[A-Z0-9]{8,20}$/.test((value != null ? value : "").trim().toUpperCase());
}
function isValidSTDCode(value) {
  return /^0?\d{2,5}$/.test(toDigits(value));
}
function isValidLandlineNumber(value) {
  return /^\d{6,11}$/.test(toDigits(value));
}
function isEntityName(value) {
  return ENTITY_NAME_REGEX.test((value != null ? value : "").trim());
}
function getSanitizeText(value, removeChars = "", removeEmojis = false, normalizeAccents = false) {
  let output = value != null ? value : "";
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
var Masker = class {
  constructor(visibleCount = 4, options = {}) {
    var _a, _b;
    this.visibleCount = Math.max(0, visibleCount);
    this.options = {
      maskChar: (_a = options.maskChar) != null ? _a : "*",
      maskFrom: (_b = options.maskFrom) != null ? _b : "start",
      maskPattern: options.maskPattern
    };
  }
  maskString(value) {
    const input = value != null ? value : "";
    if (!input)
      return "";
    if (input.length <= this.visibleCount)
      return input;
    const maskLength = input.length - this.visibleCount;
    const masked = this.options.maskChar.repeat(maskLength);
    if (this.options.maskFrom === "end") {
      return `${input.slice(0, this.visibleCount)}${masked}`;
    }
    return `${masked}${input.slice(-this.visibleCount)}`;
  }
};

export {
  isValidEmail,
  isMobile,
  isPanNumber,
  isAadhaar,
  isAlphanumeric,
  isNumeric,
  isPincode,
  isAlphabetic,
  isAcknowledgementNumber,
  isTAN,
  isIndianPassport,
  isIndianTIN,
  isValidSTDCode,
  isValidLandlineNumber,
  isEntityName,
  getSanitizeText,
  Masker
};
//# sourceMappingURL=chunk-G5E52JQY.mjs.map