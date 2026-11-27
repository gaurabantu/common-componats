"use client";

import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Icon from "../Icon";
import ErrorIcon from "../../../assets/error.svg";
import { OTP_BOX_DEFAULTS, OTP_BOX_INPUT_MODE, OTP_BOX_PATTERN } from "./OtpBox.config";
import type { OtpBoxHandle, OtpBoxProps } from "./OtpBox.types";
import { defaultCellLabel, filterOtp, toCells } from "./OtpBox.utils";
import "./OtpBox.css";

/**
 * OtpBox — one-time-code entry. `variant="boxes"` (default) renders one input per character inside a
 * labelled `role="group"`; the other variants render a single input. Supports SMS autofill
 * (`autocomplete="one-time-code"`), full-code paste, arrow/Home/End/Backspace navigation,
 * `onComplete`, form submission via `name`, and an imperative `focus()` / `clear()` handle.
 */
const OtpBox = forwardRef<OtpBoxHandle, OtpBoxProps>(function OtpBox(
  {
    length = OTP_BOX_DEFAULTS.length,
    mask = OTP_BOX_DEFAULTS.mask,
    value,
    defaultValue,
    type = OTP_BOX_DEFAULTS.type,
    variant = OTP_BOX_DEFAULTS.variant,
    size = OTP_BOX_DEFAULTS.size,
    onChange,
    onComplete,
    autoFocus = false,
    name,
    id,
    label,
    ariaLabel = OTP_BOX_DEFAULTS.ariaLabel,
    getCellLabel,
    error = "",
    showValidation = OTP_BOX_DEFAULTS.showValidation,
    incompleteMessage = OTP_BOX_DEFAULTS.incompleteMessage,
    required = false,
    disabled = false,
    className = "",
    containerClass = "",
  },
  ref,
) {
  const generatedId = useId();
  const baseId = id ?? `otp-${generatedId}`;
  const labelId = `${baseId}-label`;
  const errorId = `${baseId}-error`;
  const cellId = (i: number) => `${baseId}-${i}`;

  const [cells, setCells] = useState<string[]>(() =>
    toCells(filterOtp(type, value ?? defaultValue ?? ""), length),
  );
  const cellsRef = useRef(cells);
  cellsRef.current = cells;

  const [focusWithin, setFocusWithin] = useState(false);
  const [touched, setTouched] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRefs = useRef<(HTMLInputElement | null)[]>([]);

  const joined = cells.join("");

  // Re-sync from the `value` prop (controlled use) and when `length` changes.
  useEffect(() => {
    const current = cellsRef.current;
    const source = value !== undefined ? filterOtp(type, value) : current.join("");
    if (current.length !== length || source !== current.join("")) {
      const next = toCells(source, length);
      cellsRef.current = next;
      setCells(next);
    }
  }, [value, length, type]);

  const commit = useCallback(
    (next: string[]) => {
      const prevValue = cellsRef.current.join("");
      cellsRef.current = next;
      setCells(next);
      const nextValue = next.join("");
      if (nextValue === prevValue) return;
      onChange?.(nextValue);
      if (nextValue.length === length && next.every(Boolean)) onComplete?.(nextValue);
    },
    [length, onChange, onComplete],
  );

  const focusCell = (index: number) => {
    const target = boxRefs.current[Math.max(0, Math.min(index, length - 1))];
    target?.focus();
  };

  const isBoxes = variant === "boxes";

  useImperativeHandle(
    ref,
    () => ({
      focus: (index?: number) => {
        if (!isBoxes) {
          inputRef.current?.focus();
          return;
        }
        const firstEmpty = cellsRef.current.findIndex((c) => !c);
        focusCell(index ?? (firstEmpty === -1 ? length - 1 : firstEmpty));
      },
      clear: () => {
        commit(toCells("", length));
        if (isBoxes) focusCell(0);
        else inputRef.current?.focus();
      },
      getValue: () => cellsRef.current.join(""),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isBoxes, length, commit],
  );

  /** Write `chars` starting at `start`; a full-length code always fills from the first cell. */
  const distribute = (start: number, chars: string) => {
    if (!chars) return;
    const from = chars.length >= length ? 0 : start;
    const next = cellsRef.current.slice();
    for (let k = 0; k < chars.length && from + k < length; k += 1) next[from + k] = chars.charAt(k);
    commit(next);
    focusCell(Math.min(from + chars.length, length - 1));
  };

  // ---------- validation ----------
  const isIncomplete = joined.length > 0 && joined.length < length;
  const lengthError =
    showValidation && isIncomplete && touched && !focusWithin ? incompleteMessage : "";
  const displayError = error || lengthError;
  const showError = !!displayError;

  const handleFocus = () => setFocusWithin(true);
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && rootRef.current?.contains(next)) return;
    setFocusWithin(false);
    setTouched(true);
  };

  // ---------- boxes handlers ----------
  const handleBoxChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const prev = cellsRef.current[index];
    const filtered = filterOtp(type, e.target.value);

    if (filtered.length === 0) {
      const next = cellsRef.current.slice();
      next[index] = "";
      commit(next);
      return;
    }

    let char: string | null = null;
    if (filtered.length === 1) char = filtered;
    else if (filtered.length === 2 && prev && filtered.indexOf(prev) !== -1) {
      // Typed next to an existing character (caret not over a selection): keep the new one.
      char = filtered.charAt(0) === prev ? filtered.charAt(1) : filtered.charAt(0);
    }

    if (char === null) {
      // Several characters at once: SMS autofill or an IME / drag-drop insert.
      distribute(index, filtered);
      return;
    }

    const next = cellsRef.current.slice();
    next[index] = char;
    commit(next);
    if (index < length - 1) focusCell(index + 1);
  };

  const handleBoxKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const current = cellsRef.current;
    switch (e.key) {
      case "Backspace": {
        e.preventDefault();
        const next = current.slice();
        if (current[index]) {
          next[index] = "";
          commit(next);
        } else if (index > 0) {
          next[index - 1] = "";
          commit(next);
          focusCell(index - 1);
        }
        return;
      }
      case "Delete": {
        e.preventDefault();
        if (current[index]) {
          const next = current.slice();
          next[index] = "";
          commit(next);
        }
        return;
      }
      case "ArrowLeft":
        e.preventDefault();
        focusCell(index - 1);
        return;
      case "ArrowRight":
        e.preventDefault();
        focusCell(index + 1);
        return;
      case "Home":
        e.preventDefault();
        focusCell(0);
        return;
      case "End":
        e.preventDefault();
        focusCell(length - 1);
        return;
      default:
        // Re-typing the same character produces no change event — still advance.
        if (
          e.key.length === 1 &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.altKey &&
          current[index] === e.key &&
          filterOtp(type, e.key) === e.key
        ) {
          e.preventDefault();
          if (index < length - 1) focusCell(index + 1);
        }
    }
  };

  const handleBoxPaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    distribute(index, filterOtp(type, e.clipboardData.getData("text")));
  };

  // ---------- single-input handlers ----------
  const handleSingleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const otpValue = cellsRef.current.join("");
    const cursorPos = e.target.selectionStart ?? inputValue.length;
    let newValue = otpValue;

    if (mask) {
      const prevLength = otpValue.length;
      const newLength = inputValue.length;
      if (newLength > prevLength) {
        const addedStart = cursorPos - (newLength - prevLength);
        const added = filterOtp(type, inputValue.slice(addedStart, cursorPos));
        newValue = otpValue.slice(0, addedStart) + added + otpValue.slice(addedStart);
      } else if (newLength < prevLength) {
        const deleteCount = prevLength - newLength;
        newValue = otpValue.slice(0, cursorPos) + otpValue.slice(cursorPos + deleteCount);
      }
      setTimeout(() => inputRef.current?.setSelectionRange(cursorPos, cursorPos), 0);
    } else {
      newValue = filterOtp(type, inputValue);
    }
    commit(toCells(newValue.slice(0, length), length));
  };

  const handleSinglePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = filterOtp(type, e.clipboardData.getData("text"));
    if (pasted) commit(toCells(pasted.slice(0, length), length));
  };

  // ---------- render ----------
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

  const inputMode = OTP_BOX_INPUT_MODE[type];
  // A masked value ("•") would fail `pattern` and block native form submission, so drop it when masking.
  const pattern = mask ? undefined : OTP_BOX_PATTERN[type];
  const describedBy = showError ? errorId : undefined;

  const errorNode = showError ? (
    <div id={errorId} className="otp-box-error" role="alert">
      <Icon src={ErrorIcon} width={14} height={14} color="var(--color-danger-strong)" decorative />
      <span>{displayError}</span>
    </div>
  ) : null;

  const hiddenInput = name ? (
    <input type="hidden" name={name} value={joined} disabled={disabled} />
  ) : null;

  if (isBoxes) {
    return (
      <div ref={rootRef} className={rootClasses} data-disabled={disabled || undefined}>
        <div className="otp-box-wrapper">
          {label && (
            <label id={labelId} htmlFor={cellId(0)} className="otp-box-label">
              {label}
            </label>
          )}
          <div
            className="otp-box-cells"
            role="group"
            aria-labelledby={label ? labelId : undefined}
            aria-label={label ? undefined : ariaLabel}
            aria-describedby={describedBy}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {cells.map((char, i) => (
              <input
                key={i}
                ref={(el) => {
                  boxRefs.current[i] = el;
                }}
                id={cellId(i)}
                type="text"
                inputMode={inputMode}
                pattern={pattern}
                value={mask && char ? OTP_BOX_DEFAULTS.maskChar : char}
                onChange={(e) => handleBoxChange(i, e)}
                onKeyDown={(e) => handleBoxKeyDown(i, e)}
                onPaste={(e) => handleBoxPaste(i, e)}
                onFocus={(e) => e.currentTarget.select()}
                disabled={disabled}
                autoFocus={autoFocus && i === 0}
                aria-label={getCellLabel ? getCellLabel(i, length) : defaultCellLabel(type, i, length)}
                aria-invalid={showError || undefined}
                aria-required={required || undefined}
                aria-describedby={describedBy}
                autoComplete={i === 0 ? "one-time-code" : "off"}
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="otp-box-cell"
              />
            ))}
          </div>
          {hiddenInput}
          {errorNode}
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={rootClasses} data-disabled={disabled || undefined}>
      <div className="otp-box-wrapper">
        {label && (
          <label id={labelId} htmlFor={baseId} className="otp-box-label">
            {label}
          </label>
        )}
        <input
          ref={inputRef}
          id={baseId}
          type="text"
          maxLength={length}
          value={mask ? OTP_BOX_DEFAULTS.maskChar.repeat(joined.length) : joined}
          onChange={handleSingleChange}
          onPaste={handleSinglePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          autoFocus={autoFocus}
          inputMode={inputMode}
          pattern={pattern}
          aria-label={label ? undefined : ariaLabel}
          aria-invalid={showError || undefined}
          aria-required={required || undefined}
          aria-describedby={describedBy}
          autoComplete="one-time-code"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={Array(length).fill("·").join(" ")}
          spellCheck={false}
          className="otp-box-input"
        />
        {hiddenInput}
        {errorNode}
      </div>
    </div>
  );
});

OtpBox.displayName = "OtpBox";

export default OtpBox;
export type { OtpBoxProps, OtpBoxVariant, OtpBoxSize, OtpBoxType, OtpBoxHandle } from "./OtpBox.types";
