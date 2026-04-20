import React, { useState, ChangeEvent, useId, useEffect, useRef } from "react";
import Icon from "../Icon";
import ErrorIcon from "../../../assets/error.svg";
import "./OtpBox.css";

export type OtpBoxVariant = "outlined" | "filled" | "underlined" | "boxes";
export type OtpBoxSize = "sm" | "md" | "lg";

export interface OtpBoxProps {
  length?: number;
  mask?: boolean;
  value?: string;
  type?: "numeric" | "alphanumeric" | "alphabet";
  variant?: OtpBoxVariant;
  size?: OtpBoxSize;
  onChange?: (value: string) => void;
  className?: string;
  containerClass?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  showValidation?: boolean;
}

const OtpBox: React.FC<OtpBoxProps> = ({
  length = 6,
  mask = false,
  value = "",
  type = "numeric",
  variant = "boxes",
  size = "md",
  onChange,
  className = "",
  containerClass = "",
  disabled = false,
  label,
  error = "",
  showValidation = true,
}) => {
  const [otpValue, setOtpValue] = useState<string>(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const inputId = useId();

  useEffect(() => {
    if (value !== otpValue) {
      setOtpValue(value);
    }
  }, [value]);

  const filterInput = (val: string): string => {
    switch (type) {
      case "numeric":
        return val.replace(/\D/g, "");
      case "alphabet":
        return val.replace(/[^a-zA-Z]/g, "");
      case "alphanumeric":
        return val.replace(/[^a-zA-Z0-9]/g, "");
      default:
        return val;
    }
  };

  const updateValue = (newVal: string) => {
    const limited = newVal.slice(0, length);
    setOtpValue(limited);
    onChange?.(limited);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cursorPos = e.target.selectionStart || 0;

    if (mask) {
      const prevLength = otpValue.length;
      const newLength = inputValue.length;
      let newValue = otpValue;

      if (newLength > prevLength) {
        const addedChars = inputValue.slice(cursorPos - (newLength - prevLength), cursorPos);
        const filteredChars = filterInput(addedChars);
        const beforeCursor = otpValue.slice(0, cursorPos - (newLength - prevLength));
        const afterCursor = otpValue.slice(cursorPos - (newLength - prevLength));
        newValue = beforeCursor + filteredChars + afterCursor;
      } else if (newLength < prevLength) {
        const deleteCount = prevLength - newLength;
        const beforeCursor = otpValue.slice(0, cursorPos);
        const afterCursor = otpValue.slice(cursorPos + deleteCount);
        newValue = beforeCursor + afterCursor;
      }

      newValue = newValue.slice(0, length);
      updateValue(newValue);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(cursorPos, cursorPos);
        }
      }, 0);
    } else {
      const val = filterInput(inputValue);
      updateValue(val.slice(0, length));
    }
  };

  const handleBoxChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const val = filterInput(e.target.value);
    if (val.length > 1) {
      const pasted = val.slice(0, length);
      updateValue(pasted);
      const nextIdx = Math.min(index + pasted.length, length - 1);
      boxRefs.current[nextIdx]?.focus();
      return;
    }
    const char = val.slice(-1);
    if (char) {
      const arr = [...otpValue.split(""), ""];
      arr[index] = char;
      const newVal = arr.join("").slice(0, length);
      updateValue(newVal);
      if (index < length - 1) boxRefs.current[index + 1]?.focus();
    } else {
      const arr = otpValue.split("");
      arr[index] = "";
      updateValue(arr.join(""));
    }
  };

  const handleBoxKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      e.preventDefault();
      const arr = otpValue.split("");
      arr[index - 1] = "";
      updateValue(arr.join(""));
      boxRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      boxRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      boxRefs.current[index + 1]?.focus();
    }
  };

  const handleBoxPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = filterInput(e.clipboardData.getData("text")).slice(0, length);
    updateValue(pasted);
    const nextIndex = Math.min(pasted.length, length - 1);
    boxRefs.current[nextIndex]?.focus();
  };

  const isIncomplete = otpValue.length > 0 && otpValue.length < length;
  const lengthError = showValidation && isIncomplete ? "Please enter correct OTP" : "";
  const displayError = error || lengthError;
  const showError = !!displayError;

  const getInputMode = () => {
    switch (type) {
      case "numeric":
        return "numeric";
      default:
        return "text";
    }
  };

  const getPattern = () => {
    switch (type) {
      case "numeric":
        return "\\d*";
      case "alphabet":
        return "[a-zA-Z]*";
      case "alphanumeric":
        return "[a-zA-Z0-9]*";
      default:
        return undefined;
    }
  };

  const displayValue = mask ? "•".repeat(otpValue.length) : otpValue;

  const boxSize = size === "sm" ? 36 : size === "lg" ? 48 : 40;
  const boxFont = size === "sm" ? 18 : size === "lg" ? 26 : 22;
  const boxGap = size === "sm" ? 8 : size === "lg" ? 12 : 10;

  const rootClasses = [
    "otp-box-root",
    `otp-box--${variant}`,
    size !== "md" && `otp-box--${size}`,
    showError && "otp-box--error",
    disabled && "otp-box--disabled",
    containerClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (variant === "boxes") {
    return (
      <div className={rootClasses} data-disabled={disabled || undefined}>
        <div className="otp-box-wrapper">
          {label && (
            <label htmlFor={inputId} className="otp-box-label">
              {label}
            </label>
          )}
          <div
            className="otp-box-cells"
            style={{
              display: "flex",
              gap: `${boxGap}px`,
              flexWrap: "nowrap",
              width: "fit-content",
            }}
          >
            {Array.from({ length }).map((_, i) => (
              <input
                key={i}
                ref={(el) => {
                  boxRefs.current[i] = el;
                }}
                type="text"
                inputMode={getInputMode()}
                maxLength={1}
                value={mask ? (otpValue[i] ? "•" : "") : otpValue[i] ?? ""}
                onChange={(e) => handleBoxChange(i, e)}
                onKeyDown={(e) => handleBoxKeyDown(i, e)}
                onPaste={handleBoxPaste}
                disabled={disabled}
                placeholder=""
                aria-label={`Digit ${i + 1} of ${length}`}
                aria-invalid={showError}
                aria-describedby={showError ? `error-${inputId}` : undefined}
                autoComplete="one-time-code"
                spellCheck={false}
                className="otp-box-cell"
                style={{
                  width: boxSize,
                  height: boxSize,
                  minWidth: boxSize,
                  minHeight: boxSize,
                  maxWidth: boxSize,
                  maxHeight: boxSize,
                  padding: 0,
                  margin: 0,
                  textAlign: "center",
                  lineHeight: `${boxSize - 4}px`,
                  fontSize: boxFont,
                  fontWeight: 700,
                  boxSizing: "border-box",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
          {showError && (
            <div id={`error-${inputId}`} className="otp-box-error" role="alert">
              <Icon src={ErrorIcon} width={14} height={14} color="var(--color-state-error)" />
              {displayError}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={rootClasses} data-disabled={disabled || undefined}>
      <div className="otp-box-wrapper">
        {label && (
          <label htmlFor={inputId} className="otp-box-label">
            {label}
          </label>
        )}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          maxLength={length}
          value={displayValue}
          onChange={handleChange}
          disabled={disabled}
          inputMode={getInputMode()}
          pattern={getPattern()}
          aria-invalid={showError}
          aria-describedby={showError ? `error-${inputId}` : undefined}
          autoComplete="one-time-code"
          placeholder={Array(length).fill("·").join(" ")}
          spellCheck={false}
          className="otp-box-input"
        />
        {showError && (
          <div id={`error-${inputId}`} className="otp-box-error" role="alert">
            <Icon src={ErrorIcon} width={14} height={14} color="var(--color-state-error)" />
            {displayError}
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpBox;
