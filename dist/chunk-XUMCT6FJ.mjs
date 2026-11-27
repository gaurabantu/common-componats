/* ucs:component-css */
import "./styles/components/atoms/OtpBox/OtpBox.css";
import {
  error_default
} from "./chunk-7Q43KPIX.mjs";
import {
  Icon_default
} from "./chunk-6JJMOGWW.mjs";

// src/components/atoms/OtpBox/index.tsx
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState
} from "react";

// src/components/atoms/OtpBox/OtpBox.config.ts
var OTP_BOX_DEFAULTS = {
  length: 6,
  type: "numeric",
  variant: "boxes",
  size: "md",
  mask: false,
  showValidation: true,
  incompleteMessage: "Please enter correct OTP",
  ariaLabel: "One-time code",
  maskChar: "\u2022"
};
var OTP_BOX_REJECT = {
  numeric: /\D/g,
  alphabet: /[^a-zA-Z]/g,
  alphanumeric: /[^a-zA-Z0-9]/g
};
var OTP_BOX_INPUT_MODE = {
  numeric: "numeric",
  alphabet: "text",
  alphanumeric: "text"
};
var OTP_BOX_PATTERN = {
  numeric: "\\d*",
  alphabet: "[a-zA-Z]*",
  alphanumeric: "[a-zA-Z0-9]*"
};

// src/components/atoms/OtpBox/OtpBox.utils.ts
function filterOtp(type, raw) {
  return raw.replace(OTP_BOX_REJECT[type], "");
}
function toCells(value, length) {
  return Array.from({ length }, (_, i) => value.charAt(i));
}
function defaultCellLabel(type, index, length) {
  return `${type === "numeric" ? "Digit" : "Character"} ${index + 1} of ${length}`;
}

// src/components/atoms/OtpBox/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var OtpBox = forwardRef(function OtpBox2({
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
  containerClass = ""
}, ref) {
  const generatedId = useId();
  const baseId = id != null ? id : `otp-${generatedId}`;
  const labelId = `${baseId}-label`;
  const errorId = `${baseId}-error`;
  const cellId = (i) => `${baseId}-${i}`;
  const [cells, setCells] = useState(
    () => {
      var _a;
      return toCells(filterOtp(type, (_a = value != null ? value : defaultValue) != null ? _a : ""), length);
    }
  );
  const cellsRef = useRef(cells);
  cellsRef.current = cells;
  const [focusWithin, setFocusWithin] = useState(false);
  const [touched, setTouched] = useState(false);
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const boxRefs = useRef([]);
  const joined = cells.join("");
  useEffect(() => {
    const current = cellsRef.current;
    const source = value !== void 0 ? filterOtp(type, value) : current.join("");
    if (current.length !== length || source !== current.join("")) {
      const next = toCells(source, length);
      cellsRef.current = next;
      setCells(next);
    }
  }, [value, length, type]);
  const commit = useCallback(
    (next) => {
      const prevValue = cellsRef.current.join("");
      cellsRef.current = next;
      setCells(next);
      const nextValue = next.join("");
      if (nextValue === prevValue)
        return;
      onChange == null ? void 0 : onChange(nextValue);
      if (nextValue.length === length && next.every(Boolean))
        onComplete == null ? void 0 : onComplete(nextValue);
    },
    [length, onChange, onComplete]
  );
  const focusCell = (index) => {
    const target = boxRefs.current[Math.max(0, Math.min(index, length - 1))];
    target == null ? void 0 : target.focus();
  };
  const isBoxes = variant === "boxes";
  useImperativeHandle(
    ref,
    () => ({
      focus: (index) => {
        var _a;
        if (!isBoxes) {
          (_a = inputRef.current) == null ? void 0 : _a.focus();
          return;
        }
        const firstEmpty = cellsRef.current.findIndex((c) => !c);
        focusCell(index != null ? index : firstEmpty === -1 ? length - 1 : firstEmpty);
      },
      clear: () => {
        var _a;
        commit(toCells("", length));
        if (isBoxes)
          focusCell(0);
        else
          (_a = inputRef.current) == null ? void 0 : _a.focus();
      },
      getValue: () => cellsRef.current.join("")
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isBoxes, length, commit]
  );
  const distribute = (start, chars) => {
    if (!chars)
      return;
    const from = chars.length >= length ? 0 : start;
    const next = cellsRef.current.slice();
    for (let k = 0; k < chars.length && from + k < length; k += 1)
      next[from + k] = chars.charAt(k);
    commit(next);
    focusCell(Math.min(from + chars.length, length - 1));
  };
  const isIncomplete = joined.length > 0 && joined.length < length;
  const lengthError = showValidation && isIncomplete && touched && !focusWithin ? incompleteMessage : "";
  const displayError = error || lengthError;
  const showError = !!displayError;
  const handleFocus = () => setFocusWithin(true);
  const handleBlur = (e) => {
    var _a;
    const next = e.relatedTarget;
    if (next && ((_a = rootRef.current) == null ? void 0 : _a.contains(next)))
      return;
    setFocusWithin(false);
    setTouched(true);
  };
  const handleBoxChange = (index, e) => {
    const prev = cellsRef.current[index];
    const filtered = filterOtp(type, e.target.value);
    if (filtered.length === 0) {
      const next2 = cellsRef.current.slice();
      next2[index] = "";
      commit(next2);
      return;
    }
    let char = null;
    if (filtered.length === 1)
      char = filtered;
    else if (filtered.length === 2 && prev && filtered.indexOf(prev) !== -1) {
      char = filtered.charAt(0) === prev ? filtered.charAt(1) : filtered.charAt(0);
    }
    if (char === null) {
      distribute(index, filtered);
      return;
    }
    const next = cellsRef.current.slice();
    next[index] = char;
    commit(next);
    if (index < length - 1)
      focusCell(index + 1);
  };
  const handleBoxKeyDown = (index, e) => {
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
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && current[index] === e.key && filterOtp(type, e.key) === e.key) {
          e.preventDefault();
          if (index < length - 1)
            focusCell(index + 1);
        }
    }
  };
  const handleBoxPaste = (index, e) => {
    e.preventDefault();
    distribute(index, filterOtp(type, e.clipboardData.getData("text")));
  };
  const handleSingleChange = (e) => {
    var _a;
    const inputValue = e.target.value;
    const otpValue = cellsRef.current.join("");
    const cursorPos = (_a = e.target.selectionStart) != null ? _a : inputValue.length;
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
      setTimeout(() => {
        var _a2;
        return (_a2 = inputRef.current) == null ? void 0 : _a2.setSelectionRange(cursorPos, cursorPos);
      }, 0);
    } else {
      newValue = filterOtp(type, inputValue);
    }
    commit(toCells(newValue.slice(0, length), length));
  };
  const handleSinglePaste = (e) => {
    e.preventDefault();
    const pasted = filterOtp(type, e.clipboardData.getData("text"));
    if (pasted)
      commit(toCells(pasted.slice(0, length), length));
  };
  const rootClasses = [
    "otp-box-root",
    `otp-box--${variant}`,
    size !== "md" && `otp-box--${size}`,
    showError && "otp-box--error",
    disabled && "otp-box--disabled",
    containerClass,
    className
  ].filter(Boolean).join(" ");
  const inputMode = OTP_BOX_INPUT_MODE[type];
  const pattern = mask ? void 0 : OTP_BOX_PATTERN[type];
  const describedBy = showError ? errorId : void 0;
  const errorNode = showError ? /* @__PURE__ */ jsxs("div", { id: errorId, className: "otp-box-error", role: "alert", children: [
    /* @__PURE__ */ jsx(Icon_default, { src: error_default, width: 14, height: 14, color: "var(--color-danger-strong)", decorative: true }),
    /* @__PURE__ */ jsx("span", { children: displayError })
  ] }) : null;
  const hiddenInput = name ? /* @__PURE__ */ jsx("input", { type: "hidden", name, value: joined, disabled }) : null;
  if (isBoxes) {
    return /* @__PURE__ */ jsx("div", { ref: rootRef, className: rootClasses, "data-disabled": disabled || void 0, children: /* @__PURE__ */ jsxs("div", { className: "otp-box-wrapper", children: [
      label && /* @__PURE__ */ jsx("label", { id: labelId, htmlFor: cellId(0), className: "otp-box-label", children: label }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "otp-box-cells",
          role: "group",
          "aria-labelledby": label ? labelId : void 0,
          "aria-label": label ? void 0 : ariaLabel,
          "aria-describedby": describedBy,
          onFocus: handleFocus,
          onBlur: handleBlur,
          children: cells.map((char, i) => /* @__PURE__ */ jsx(
            "input",
            {
              ref: (el) => {
                boxRefs.current[i] = el;
              },
              id: cellId(i),
              type: "text",
              inputMode,
              pattern,
              value: mask && char ? OTP_BOX_DEFAULTS.maskChar : char,
              onChange: (e) => handleBoxChange(i, e),
              onKeyDown: (e) => handleBoxKeyDown(i, e),
              onPaste: (e) => handleBoxPaste(i, e),
              onFocus: (e) => e.currentTarget.select(),
              disabled,
              autoFocus: autoFocus && i === 0,
              "aria-label": getCellLabel ? getCellLabel(i, length) : defaultCellLabel(type, i, length),
              "aria-invalid": showError || void 0,
              "aria-required": required || void 0,
              "aria-describedby": describedBy,
              autoComplete: i === 0 ? "one-time-code" : "off",
              autoCorrect: "off",
              autoCapitalize: "off",
              spellCheck: false,
              className: "otp-box-cell"
            },
            i
          ))
        }
      ),
      hiddenInput,
      errorNode
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { ref: rootRef, className: rootClasses, "data-disabled": disabled || void 0, children: /* @__PURE__ */ jsxs("div", { className: "otp-box-wrapper", children: [
    label && /* @__PURE__ */ jsx("label", { id: labelId, htmlFor: baseId, className: "otp-box-label", children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: inputRef,
        id: baseId,
        type: "text",
        maxLength: length,
        value: mask ? OTP_BOX_DEFAULTS.maskChar.repeat(joined.length) : joined,
        onChange: handleSingleChange,
        onPaste: handleSinglePaste,
        onFocus: handleFocus,
        onBlur: handleBlur,
        disabled,
        autoFocus,
        inputMode,
        pattern,
        "aria-label": label ? void 0 : ariaLabel,
        "aria-invalid": showError || void 0,
        "aria-required": required || void 0,
        "aria-describedby": describedBy,
        autoComplete: "one-time-code",
        autoCorrect: "off",
        autoCapitalize: "off",
        placeholder: Array(length).fill("\xB7").join(" "),
        spellCheck: false,
        className: "otp-box-input"
      }
    ),
    hiddenInput,
    errorNode
  ] }) });
});
OtpBox.displayName = "OtpBox";
var OtpBox_default = OtpBox;

export {
  OtpBox_default
};
//# sourceMappingURL=chunk-XUMCT6FJ.mjs.map