"use client";
import React, {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { TextInputProps } from "./TextInput.types";
import Icon from "../Icon";
import {
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
  isEntityName
} from "../../../utils/uiPanValidators";
import { Masker } from "../../../utils/uiPanValidators";
import { roundedToCssCorner } from "./TextInput.utils";
import { HEADER_SEARCH_LAYOUT } from "./TextInput.config";
import VisibilityOnIcon from '../../../assets/visibility_on.svg';
import VisibilityOffIcon from '../../../assets/visibility_off.svg';
import ErrorIcon from "../../../assets/error.svg";
import VerifiedIcon from "../../../assets/success.svg";
import CloseIcon from "../../../assets/close.svg";
import SearchIcon from "../../../assets/search.svg";

const pxToRem = (px: number) => `${px / 16}rem`;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  id: idProp,
  label = "",
  type = "text",
  placeholder,
  validation = "none",
  required = false,
  value = "",
  onChange,
  onErrorChange,
  onVerifiedChange,
  errorMessage = "",
  maxLength,
  fullWidth = true,
  disabled = false,
  borderColorClass = "",
  className = "",
  rounded = "3",
  ariaLabel,
  pattern,
  showVerifiedStatus = false,
  isVerified = false,
  mask = false,
  maskOptions = {},
  showToggleIcon = false,
  disableClipboard = false,
  toggleIcon = VisibilityOnIcon,
  toggleOffIcon = VisibilityOffIcon,
  errorIcon = ErrorIcon,
  verifiedIcon = VerifiedIcon,
  toggleIconSize = 18,
  statusIconSize = 16,
  isdCode = '+91',
  allowClear = false,
  onClear,
  prefix,
  suffix,
  showCount = false,
  onPressEnter,
  status: statusProp,
  variant = "outlined",
  trailingRail = "default",
  size = "md",
  autoCorrection = false,
  spellCheck: spellCheckProp,
  autoCorrect: autoCorrectProp,
  autoCapitalize: autoCapitalizeProp,
  ...rest
}, ref) => {
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(isVerified);
  const [showValue, setShowValue] = useState(false);
  const [displayValue, setDisplayValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);
  const actualValueRef = useRef(value || "");
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

  const validationFunctions = {
    name: isAlphabetic,
    email: isValidEmail,
    mobile: (val: string) => isMobile(val, isdCode),
    businessPID: isPanNumber,
    businessAID: isAadhaar,
    businessTAN: (val: string) => isTAN(val.toUpperCase()),
    acknowledgementNumber: (val: string) => isAcknowledgementNumber(val.toUpperCase()),
    businessPassport: isIndianPassport,
    businessTIN: isIndianTIN,
    stdCode: isValidSTDCode,
    landline: isValidLandlineNumber,
    alphanumeric: isAlphanumeric,
    numeric: isNumeric,
    pincode: isPincode,
    entityName: isEntityName,
  };

  const reactId = useId();
  const inputId: string = idProp?.trim() ? idProp : `text-input-${reactId}`;

  useEffect(() => {
    actualValueRef.current = value || "";
    updateDisplayValue(value || "");
  }, [value]);

  useEffect(() => {
    setVerified(isVerified);
  }, [isVerified]);

  useEffect(() => {
    if (errorMessage && actualValueRef.current) {
      setError(errorMessage);
    } else if (!errorMessage) {
      setError(null);
    }
  }, [errorMessage]);

  // ✅ Update maxLength to include new validations
  const resolvedMaxLength = useMemo(() => {
    if (maxLength !== undefined) return maxLength;

    switch (validation) {
      case "name": return 50;
      case "email": return 100;
      case "mobile": {
        if (isdCode === '+91') {
          return 10;
        }
        return 15;
      }
      case "businessPID": return 10;
      case "businessAID": return 12;
      case "businessTAN": return 10;
      case "businessPassport": return 8;
      case "businessTIN": return 20;
      case "acknowledgementNumber": return 20;
      case "stdCode": return 8;
      case "landline": return 15;
      case "numeric": return 200;
      case "alphanumeric": return 500;
      case "pincode": return 6;
      case "headerSearch": return 200;
      default: return 255;
    }
  }, [maxLength, validation, isdCode]);

  const maskValue = (val: string): string => {
    if (!mask || !val) return val;
    try {
      const masker = new Masker(4, {
        maskChar: "*",
        maskFrom: "start",
        maskPattern: [1, 1],
        ...maskOptions,
      });
      const maskedString = masker.maskString(val);

      if (validation === "businessAID") {
        return formatAadhaarDisplay(maskedString);
      }
      return maskedString;
    } catch (error) {
      console.warn("Masking failed, showing plain text");
      return val;
    }
  };

  const normalizeSpaces = (value: string): string => {
    return value.replace(/\s{2,}/g, " ");
  };

  const updateDisplayValue = (val: string) => {
    if (mask && !showValue && val) {
      setDisplayValue(maskValue(val));
    } else {
      setDisplayValue(formatDisplayValue(val));
    }
  };

  const removeAllSpaces = (input: string): string => {
    return input.replace(/\s/g, '');
  };

  const trimSpaces = (input: string): string => {
    return input.trim();
  };

  const formatAadhaarDisplay = (val: string): string => {
    const cleaned = removeAllSpaces(val);
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 8) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)}`;
  };

  const formatDisplayValue = (val: string): string => {
    if (validation === "custom") {
      return val;
    }
    if (validation === "headerSearch") {
      return val;
    }

    const cleaned = removeAllSpaces(val);

    if (validation === "mobile") {
      return cleaned.toUpperCase();
    }

    if (validation === "businessAID") {
      return formatAadhaarDisplay(cleaned);
    }

    if (validation === "businessPID") {
      return cleaned.toUpperCase();
    }

    if (validation === "businessTIN") {
      return cleaned.toUpperCase();
    }

    if (validation === "businessTAN") {
      return cleaned.toUpperCase();
    }

    if (validation === "acknowledgementNumber") {
      return cleaned.toUpperCase();
    }

    // ✅ Add formatting for STD code and landline (numeric only)
    if (validation === "stdCode" || validation === "landline") {
      return cleaned;
    }

    if (validation === "pincode") {
      return cleaned;
    }

    if (validation === "numeric") {
      return cleaned;
    }

    if (validation === "email") {
      return trimSpaces(val);
    }

    if (validation === "name") {
      return normalizeSpaces(val);
    }

    if (validation === "alphanumeric") {
      return normalizeSpaces(val);
    }

    if (validation === "entityName") {
      return val;
    }

    return trimSpaces(val);
  };

  const resolvePattern = (pattern2: RegExp | string) => {
    if (!pattern2) return null;
    if (pattern2 instanceof RegExp) return pattern2;
    try {
      return new RegExp(pattern2);
    } catch (e) {
      console.warn("Invalid regex pattern:", pattern2);
      return null;
    }
  };

  // ✅ Update validation to include new types
  const validateInput = (val: string): string | null => {
    if (validation === "none" || validation === "headerSearch") return null;

    let cleanedVal = val;
    if (validation === "custom") {
      cleanedVal = trimSpaces(val);
    } else {
      cleanedVal = removeAllSpaces(val);
    }

    if (cleanedVal === "") return null;

    let isValid = false;
    const validatorFn = validationFunctions[validation as keyof typeof validationFunctions];

    if (validatorFn) {
      if (validation === "entityName") {
        isValid = validatorFn(val);
      } else {
        isValid = validatorFn(cleanedVal);
      }

      if (!isValid) {
        if (validation === "mobile") {
          if (isdCode === '+91') {
            return errorMessage || "Invalid mobile number";
          } else {
            return errorMessage || "Invalid mobile number";
          }
        }
        if (validation === "businessAID") return errorMessage || "Invalid Aadhaar format";
        if (validation === "businessPID") return errorMessage || "Invalid PAN format";
        if (validation === "businessTAN") return errorMessage || "Invalid TAN format";
        if (validation === "businessPassport") return errorMessage || "Invalid Passport format";
        if (validation === "businessTIN") return errorMessage || "Invalid TIN format";
        if (validation === "acknowledgementNumber") return errorMessage || "Invalid Acknowledgement Number format";
        if (validation === "stdCode") return errorMessage || "Invalid STD code";
        if (validation === "landline") return errorMessage || "Invalid landline number";
        if (validation === "entityName") return errorMessage || "Invalid Entity Name";



        return errorMessage || `Invalid ${validation} format`;
      }
    } else if (validation === "custom" && pattern) {
      const regex = resolvePattern(pattern);
      if (!regex) return "Invalid pattern";
      isValid = regex.test(cleanedVal);
      if (!isValid) return errorMessage || "Invalid format";
    } else {
      return null;
    }

    if (showVerifiedStatus && isValid && cleanedVal !== "") {
      setVerified(true);
      onVerifiedChange?.(true);
    } else if (showVerifiedStatus && !isValid) {
      setVerified(false);
      onVerifiedChange?.(false);
    }

    return null;
  };

  const handleClipboardEvents = (e: React.ClipboardEvent) => {
    if (disableClipboard) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (disableClipboard) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onPressEnter?.(e);
    }
    if (disableClipboard) {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed) {
        const key = e.key.toLowerCase();
        if (key === 'c' || key === 'x' || key === 'v') {
          e.preventDefault();
        }
      }
      if (e.key === 'F10' || (e.shiftKey && e.key === 'F10')) {
        e.preventDefault();
      }
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    actualValueRef.current = "";
    setDisplayValue("");
    setError(null);
    setShowValue(false);
    onChange?.("");
    onErrorChange?.(null);
    onClear?.();
    inputRef.current?.focus();
  };

  // ✅ Update handleChange to include new validations
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    let inputValue = e.target.value;

    if (mask && !showValue) {
      const currentActual = actualValueRef.current;
      const currentDisplay = displayValue;

      const inputWithoutSpaces = removeAllSpaces(inputValue);
      const currentWithoutSpaces = removeAllSpaces(currentDisplay);

      if (inputWithoutSpaces.length < currentWithoutSpaces.length) {
        const newActual = currentActual.slice(0, inputWithoutSpaces.length);
        actualValueRef.current = newActual;
        updateDisplayValue(newActual);
        onChange?.(newActual);
      } else if (inputWithoutSpaces.length > currentWithoutSpaces.length) {
        const newChars = inputWithoutSpaces.slice(currentWithoutSpaces.length);

        // ✅ Add stdCode and landline to numeric-only validations
        if ((validation === "mobile" || validation === "businessAID" || validation === "pincode" || validation === "numeric" || validation === "stdCode" || validation === "landline") && !/^\d+$/.test(newChars)) {
          return;
        }

        const newActual = (currentActual + newChars).slice(0, resolvedMaxLength);
        actualValueRef.current = newActual;
        updateDisplayValue(newActual);
        onChange?.(newActual);
      }
    } else {
      let cleanedInput = inputValue;

      if (validation === "name") {
        cleanedInput = normalizeSpaces(cleanedInput);
      } else if (validation === "alphanumeric" || validation === "none") {
        cleanedInput = normalizeSpaces(cleanedInput);
      } else if (validation === "headerSearch") {
        cleanedInput = inputValue;
      } else if (validation === "custom") {
        cleanedInput = inputValue;
      } else {
        cleanedInput = removeAllSpaces(cleanedInput);
      }

      if (validation === "headerSearch" && pattern) {
        const charRe = resolvePattern(pattern);
        if (charRe && cleanedInput) {
          cleanedInput = Array.from(cleanedInput).filter((ch) => charRe.test(ch)).join("");
        }
      }

      // ✅ Add stdCode and landline to numeric-only validations
      if ((validation === "businessAID" || validation === "pincode" || validation === "numeric" || validation === "stdCode" || validation === "landline") && cleanedInput && !/^\d+$/.test(cleanedInput)) {
        return;
      }

      if (validation === "businessTIN") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput)) return;
        cleanedInput = cleanedInput.toUpperCase();
      }

      if (validation === "businessTAN") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput)) return;
        cleanedInput = cleanedInput.toUpperCase();
      }

      if (validation === "acknowledgementNumber") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput)) return;
        cleanedInput = cleanedInput.toUpperCase();
      }

      if (validation === "alphanumeric" && cleanedInput && !isAlphanumeric(cleanedInput)) {
        return;
      }

      if (validation === "entityName") {
        cleanedInput = inputValue;
      }


      const actualValue = cleanedInput.slice(0, resolvedMaxLength);
      const formattedDisplayValue = formatDisplayValue(actualValue);

      actualValueRef.current = actualValue;
      setDisplayValue(formattedDisplayValue);
      onChange?.(actualValue);
    }

    if (showVerifiedStatus && verified) {
      setVerified(false);
      onVerifiedChange?.(false);
    }

    const err = validateInput(actualValueRef.current);
    setError(err);
    onErrorChange?.(err);
  };

  const handleToggleVisibility = () => {
    const newShowValue = !showValue;
    setShowValue(newShowValue);

    if (newShowValue) {
      const formattedValue = formatDisplayValue(actualValueRef.current);
      setDisplayValue(formattedValue);
    } else {
      setDisplayValue(maskValue(actualValueRef.current));
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    let actualValue = actualValueRef.current;

    if (validation === "name") {
      const normalized = normalizeSpaces(actualValueRef.current).trim();
      actualValueRef.current = normalized;
      setDisplayValue(normalized);
      actualValue = normalized;
      onChange?.(normalized);
    }

    if (validation === "custom") {
      const trimmed = actualValueRef.current.trim();
      actualValueRef.current = trimmed;
      setDisplayValue(trimmed);
      actualValue = trimmed;
      onChange?.(trimmed);
    }

    const err = validateInput(actualValue);
    setError(err);
    onErrorChange?.(err);

    if (mask && !showValue) {
      setDisplayValue(maskValue(actualValue));
    } else {
      setDisplayValue(formatDisplayValue(actualValue));
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const roundedStyle = roundedToCssCorner(rounded);

  const getInputType = () => {
    if (showValue) return "text";
    if (type === "password" && showToggleIcon) return "password";
    return type;
  };

  const hasValue = (displayValue?.trim() ?? "") !== "";
  const resolvedStatus = statusProp ?? (error ? "error" : verified ? "success" : undefined);
  const baseSizeTokens = {
    sm: {
      minHeight: "2rem",
      horizontalPadding: "0.625rem",
      addonPadding: "0.5rem",
      fontSize: "var(--text-small-size)",
    },
    md: {
      minHeight: "2.5rem",
      horizontalPadding: "0.75rem",
      addonPadding: "0.625rem",
      fontSize: "var(--text-body-size)",
    },
    lg: {
      minHeight: "3rem",
      horizontalPadding: "0.875rem",
      addonPadding: "0.75rem",
      fontSize: "var(--text-body-size)",
    },
  } as const;

  const isHeaderSearchRail = validation === "headerSearch";
  const isIntegratedRail =
    trailingRail === "integrated" && isHeaderSearchRail;
  const hdr = isHeaderSearchRail ? HEADER_SEARCH_LAYOUT[size] : undefined;
  type FieldRailMetrics = {
    minHeight: number | string;
    horizontalPadding: number | string;
    addonPadding: number | string;
    fontSize: string;
    inputLineHeight: number;
    suffixPadLeft: number | string;
    suffixPadRight: number | string;
    prefixPadLR: number | string;
    clearIconPx: number | string;
    clearPadX: number | string;
    decorativeTrailingPx: number | string;
  };
  const fieldMetrics: FieldRailMetrics = hdr
    ? {
        minHeight: pxToRem(hdr.shellMinHeight),
        horizontalPadding: pxToRem(hdr.horizontalPadding),
        addonPadding: baseSizeTokens[size].addonPadding,
        fontSize: baseSizeTokens[size].fontSize,
        inputLineHeight: hdr.inputLineHeight,
        suffixPadLeft: pxToRem(hdr.suffixPadLeft),
        suffixPadRight: pxToRem(hdr.suffixPadRight),
        prefixPadLR: pxToRem(hdr.prefixAddonPadding),
        clearIconPx: pxToRem(hdr.clearIconSize),
        clearPadX: pxToRem(hdr.clearHitPaddingX),
        decorativeTrailingPx: pxToRem(hdr.decorativeTrailingSearchIcon),
      }
    : {
        minHeight: baseSizeTokens[size].minHeight,
        horizontalPadding: baseSizeTokens[size].horizontalPadding,
        addonPadding: baseSizeTokens[size].addonPadding,
        fontSize: baseSizeTokens[size].fontSize,
        inputLineHeight: 1.5,
        suffixPadLeft: baseSizeTokens[size].addonPadding,
        suffixPadRight: baseSizeTokens[size].addonPadding,
        prefixPadLR: baseSizeTokens[size].addonPadding,
        clearIconPx: 14,
        clearPadX: baseSizeTokens[size].addonPadding,
        decorativeTrailingPx: 16,
      };

  const shouldShowToggle = showToggleIcon && type === "password";
  const colors = {
    textPrimary: "var(--color-text-primary, #0D0D0D)",
    textSecondary: "var(--color-text-secondary, #757575)",
    bgSurface: "var(--color-bg-surface, #FFFFFF)",
    bgPage: "var(--color-bg-page, #F3F4F6)",
    borderDefault: "var(--color-border-default, #999999)",
    stateError: "var(--color-state-error, #DC3545)",
    stateWarning: "var(--color-state-warning, #FFC107)",
    stateSuccess: "var(--color-state-success, #28A745)",
  } as const;
  const resolvedBorderColor =
    resolvedStatus === "error"
      ? colors.stateError
      : resolvedStatus === "warning"
        ? colors.stateWarning
        : resolvedStatus === "success"
          ? colors.stateSuccess
          : isFocused
            ? "var(--button-primary-focus-ring, #3B82F6)"
          : colors.borderDefault;

  const wrapperStyle: React.CSSProperties =
    variant === "filled"
      ? {
          minHeight: fieldMetrics.minHeight,
          borderRadius: roundedStyle,
          boxSizing: "border-box",
          backgroundColor: colors.bgPage,
          border: `1.5px solid ${resolvedBorderColor}`,
        }
      : variant === "borderless"
        ? {
            minHeight: fieldMetrics.minHeight,
            borderRadius: roundedStyle,
            boxSizing: "border-box",
            backgroundColor: "transparent",
            border: "1px solid transparent",
          }
        : variant === "underlined"
          ? {
              minHeight: fieldMetrics.minHeight,
              borderRadius: 0,
              boxSizing: "border-box",
              backgroundColor: "transparent",
              border: "0 solid transparent",
              borderBottomWidth: 1.5,
              borderBottomColor: resolvedBorderColor,
            }
          : {
              minHeight: fieldMetrics.minHeight,
              borderRadius: roundedStyle,
              boxSizing: "border-box",
              backgroundColor: colors.bgSurface,
              border: `1.5px solid ${resolvedBorderColor}`,
            };

  // Explicit `suffix={null}` suppresses the default trailing search icon (e.g. when the caller uses prefix-only).
  const resolvedSuffix =
    suffix !== undefined
      ? suffix
      : type === "search"
        ? (
            <Icon
              src={SearchIcon}
              alt=""
              width={fieldMetrics.decorativeTrailingPx}
              height={fieldMetrics.decorativeTrailingPx}
            />
          )
        : null;
  const hasRightAddons = Boolean(resolvedSuffix || (allowClear && hasValue && !disabled) || shouldShowToggle);
  const charCount = displayValue?.length ?? 0;
  const countMax = validation === "businessAID" ? resolvedMaxLength + 2 : resolvedMaxLength;
  // The wrapper owns the visible border/background so variants stay consistent.
  const fieldWrapperStyle: React.CSSProperties = {
    ...wrapperStyle,
    ...(isHeaderSearchRail ? { maxHeight: fieldMetrics.minHeight } : {}),
    display: "grid",
    alignItems: "stretch",
    overflow: "hidden",
    width: fullWidth ? "100%" : "auto",
    gridTemplateColumns: `${prefix ? "auto " : ""}minmax(0, 1fr)${hasRightAddons ? " auto" : ""}`,
    transition: "border-color 150ms, box-shadow 150ms, background-color 150ms",
    ...(isIntegratedRail ? { gap: 0 } : {}),
    ...(isIntegratedRail
      ? ({
          "--ucs-textfield-outer-radius":
            roundedStyle === 0 ? "0" : roundedStyle,
        } as React.CSSProperties)
      : {}),
  };

  const suffixPadLeft = isIntegratedRail ? 0 : fieldMetrics.suffixPadLeft;
  const suffixPadRight = isIntegratedRail ? 0 : fieldMetrics.suffixPadRight;

  // Keep the native input visually flat; the field shell renders the border.
  const inputElementStyle: React.CSSProperties = {
    height: fieldMetrics.minHeight,
    fontSize: fieldMetrics.fontSize,
    lineHeight: fieldMetrics.inputLineHeight,
    boxSizing: "border-box",
    display: "block",
    width: "100%",
    minWidth: 0,
    margin: 0,
    border: "none",
    outline: "none",
    boxShadow: "none",
    borderRadius: 0,
    background: "transparent",
    appearance: "none",
    WebkitAppearance: "none",
    color: colors.textPrimary,
    caretColor: colors.textPrimary,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: prefix ? 0 : fieldMetrics.horizontalPadding,
    paddingRight: hasRightAddons ? 0 : fieldMetrics.horizontalPadding,
  };

  return (
    <div className={`${fullWidth ? "w-full" : "inline-block"} ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[length:var(--text-secondary-size)] font-medium text-[var(--color-text-primary)] mb-2"
          style={{
            color: disabled ? colors.textSecondary : colors.textPrimary,
            cursor: disabled ? "not-allowed" : undefined,
          }}
        >
          {label}
          {required && <span className="text-[var(--color-state-error)] ml-0.5">*</span>}
        </label>
      )}
  
      {/* Single field wrapper keeps icons, borders and variants aligned */}
      <div
        className={[
          disabled ? "opacity-50 cursor-not-allowed" : "",
          borderColorClass,
          isIntegratedRail ? "ucs-text-input-field--integrated-rail" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={fieldWrapperStyle}
      >
        {/* PREFIX */}
        {prefix && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "stretch",
              flexShrink: 0,
              color: colors.textSecondary,
              paddingLeft: fieldMetrics.prefixPadLR,
              paddingRight: fieldMetrics.prefixPadLR,
            }}
          >
            {prefix}
          </div>
        )}
  
        {/* INPUT */}
        <input
          ref={inputRef}
          id={inputId}
          type={getInputType()}
          disabled={disabled}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onCopy={handleClipboardEvents}
          onCut={handleClipboardEvents}
          onPaste={handleClipboardEvents}
          onContextMenu={handleContextMenu}
          onKeyDown={handleKeyDown}
          maxLength={validation === "businessAID" ? resolvedMaxLength + 2 : resolvedMaxLength}
          aria-label={ariaLabel || label}
          aria-invalid={resolvedStatus === "error"}
          aria-required={required}
          placeholder={placeholder}
          className={[
            "disabled:cursor-not-allowed",
            getInputType() === "search" ? "ucs-text-input--search" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={inputElementStyle}
          {...rest}
          spellCheck={spellCheckProp ?? (autoCorrection ? true : false)}
          autoCorrect={(autoCorrectProp ?? (autoCorrection ? "on" : "off")) as React.HTMLAttributes<HTMLInputElement>["autoCorrect"]}
          autoCapitalize={
            autoCapitalizeProp ??
            (autoCorrection ? undefined : ("none" as React.HTMLAttributes<HTMLInputElement>["autoCapitalize"]))
          }
        />
  
        {/* SUFFIX / CLEAR / TOGGLE — order: integrated rail puts clear immediately before trailing suffix (Material-style search bar). */}
        {hasRightAddons && (
          <div
            style={{
              display: "flex",
              alignItems: isIntegratedRail ? "stretch" : "center",
              alignSelf: "stretch",
              flexShrink: 0,
              height: "100%",
              ...(isIntegratedRail ? { minHeight: fieldMetrics.minHeight } : {}),
            }}
          >
            {(() => {
              const suffixJsx = resolvedSuffix ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "stretch",
                  flexShrink: 0,
                  color: colors.textSecondary,
                  paddingLeft: suffixPadLeft,
                  paddingRight: suffixPadRight,
                }}
              >
                {resolvedSuffix}
              </div>
              ) : null;

              const clearJsx =
                allowClear && hasValue && !disabled ? (
              <button
                type="button"
                onClick={handleClear}
                className="shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                style={{
                  all: "unset",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minWidth: isHeaderSearchRail ? pxToRem(isIntegratedRail ? 28 : 26) : fieldMetrics.minHeight,
                  paddingLeft: fieldMetrics.clearPadX,
                  paddingRight: fieldMetrics.clearPadX,
                  boxSizing: "border-box",
                  cursor: "pointer",
                  color: "inherit",
                  flexShrink: 0,
                }}
                aria-label="Clear"
              >
                <Icon src={CloseIcon} alt="" height={fieldMetrics.clearIconPx} width={fieldMetrics.clearIconPx} aria-hidden />
              </button>
                ) : null;

              const toggleJsx = shouldShowToggle ? (
              <button
                type="button"
                onClick={handleToggleVisibility}
                className="shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                style={{
                  all: "unset",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minWidth: fieldMetrics.minHeight,
                  paddingLeft: fieldMetrics.addonPadding,
                  paddingRight: fieldMetrics.addonPadding,
                  boxSizing: "border-box",
                  cursor: "pointer",
                  color: "inherit",
                  flexShrink: 0,
                }}
                aria-label={showValue ? "Hide value" : "Show value"}
                tabIndex={disabled ? -1 : 0}
                disabled={disabled}
              >
                <Icon
                  src={showValue ? toggleOffIcon : toggleIcon}
                  alt={showValue ? "Hide" : "Show"}
                  height={toggleIconSize}
                  width={toggleIconSize}
                />
              </button>
              ) : null;

              if (isIntegratedRail) {
                return (
                  <>
                    {clearJsx}
                    {suffixJsx}
                    {toggleJsx}
                  </>
                );
              }
              return (
                <>
                  {suffixJsx}
                  {clearJsx}
                  {toggleJsx}
                </>
              );
            })()}
          </div>
        )}
      </div>
  
      {/* FOOTER: right-aligned status and count */}
      {(showCount || showVerifiedStatus || error) && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 12,
            marginTop: 6,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              minWidth: 0,
            }}
          >
            {showVerifiedStatus && verified && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "var(--text-small-size, 12px)",
                  color: colors.stateSuccess,
                }}
              >
                <Icon src={verifiedIcon} alt="" height={statusIconSize} width={statusIconSize} aria-hidden />
                <span>Verified</span>
              </div>
            )}
            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "var(--text-small-size, 12px)",
                  color: colors.stateError,
                }}
              >
                <Icon src={errorIcon} alt="" height={statusIconSize} width={statusIconSize} aria-hidden />
                <span>{error}</span>
              </div>
            )}
          </div>
          {showCount && (
            <span
              style={{
                fontSize: "var(--text-small-size, 12px)",
                color: colors.textSecondary,
                flexShrink: 0,
              }}
            >
              {charCount} / {countMax}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

export default TextInput;