import {
  getSanitizeText
} from "./chunk-G5E52JQY.mjs";

// src/components/atoms/TextArea/index.tsx
import { useId, useState, useEffect, forwardRef } from "react";

// src/components/atoms/TextArea/TextArea.config.ts
var defaultConfig = {
  defaultRows: 3,
  /** No limit by default — pass `maxLength` to cap input (0.0.4: was 500, which silently truncated). */
  defaultMaxLength: void 0,
  defaultRemoveChars: "/<>@#",
  /** Only applies when `sanitize` is true (sanitize is off by default, so text is never altered implicitly). */
  defaultRemoveEmojis: true,
  defaultNormalizeAccents: true,
  defaultToCase: ""
};
var TextArea_config_default = defaultConfig;

// src/components/atoms/TextArea/TextArea.utils.ts
function sanitizeValue(value, opts) {
  if (!opts)
    return value;
  const { removeChars, removeEmojis, normalizeAccents, toCase } = opts;
  let out = value != null ? value : "";
  try {
    out = getSanitizeText(out, removeChars != null ? removeChars : "", !!removeEmojis, !!normalizeAccents);
  } catch (err) {
    out = value;
  }
  if (toCase === "U")
    out = out.toUpperCase();
  else if (toCase === "L")
    out = out.toLowerCase();
  else if (toCase === "C")
    out = out.charAt(0).toUpperCase() + out.slice(1);
  return out;
}

// src/components/atoms/TextArea/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var TextArea = forwardRef(function TextArea2({
  label,
  size = "",
  className = "",
  containerClass = "",
  rows = TextArea_config_default.defaultRows,
  maxLength = TextArea_config_default.defaultMaxLength,
  fullWidth = true,
  helperText,
  errorMessage,
  showCount = false,
  status,
  resize = "vertical",
  rounded = "4",
  sanitize = false,
  removeChars = TextArea_config_default.defaultRemoveChars,
  removeEmojis = TextArea_config_default.defaultRemoveEmojis,
  normalizeAccents = TextArea_config_default.defaultNormalizeAccents,
  toCase = TextArea_config_default.defaultToCase,
  value,
  defaultValue,
  onChange,
  ariaLabel,
  disabled = false,
  id: idProp,
  ...props
}, ref) {
  var _a;
  const generatedId = useId();
  const textareaId = idProp != null ? idProp : generatedId;
  const [internalValue, setInternalValue] = useState((_a = value != null ? value : defaultValue) != null ? _a : "");
  useEffect(() => {
    if (typeof value === "string" && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);
  const handleChange = (e) => {
    var _a2;
    let val = (_a2 = e.target.value) != null ? _a2 : "";
    if (sanitize) {
      val = sanitizeValue(val, {
        removeChars,
        removeEmojis,
        normalizeAccents,
        toCase
      });
    } else if (toCase) {
      if (toCase === "U")
        val = val.toUpperCase();
      else if (toCase === "L")
        val = val.toLowerCase();
      else if (toCase === "C")
        val = val.charAt(0).toUpperCase() + val.slice(1);
    }
    setInternalValue(val);
    onChange == null ? void 0 : onChange(val, e);
  };
  const resolvedStatus = status != null ? status : errorMessage ? "error" : void 0;
  const currentLength = internalValue.length;
  const footerMessage = errorMessage != null ? errorMessage : helperText;
  const footerMessageColor = resolvedStatus === "error" ? "var(--color-state-error)" : resolvedStatus === "warning" ? "var(--color-state-warning)" : resolvedStatus === "success" ? "var(--color-state-success)" : "var(--color-text-secondary)";
  const minHeight = size === "lg" ? 128 : size === "sm" ? 96 : 112;
  const paddingX = size === "lg" ? 16 : size === "sm" ? 12 : 14;
  const paddingY = size === "lg" ? 12 : size === "sm" ? 8 : 10;
  const fontSize = size === "sm" ? "var(--text-small-size, 12px)" : "var(--text-body-size, 16px)";
  const resizeValue = resize === "horizontal" ? "horizontal" : resize === "both" ? "both" : resize === "none" ? "none" : "vertical";
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error)" : resolvedStatus === "warning" ? "var(--color-state-warning)" : resolvedStatus === "success" ? "var(--color-state-success)" : "var(--color-border-default)";
  const wrapperStyle = {
    width: fullWidth ? "100%" : "auto",
    display: fullWidth ? "block" : "inline-block"
  };
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: "var(--color-text-primary)",
    fontSize: "var(--text-secondary-size, 14px)",
    fontWeight: 500,
    lineHeight: 1.5
  };
  const textareaStyle = {
    display: "block",
    width: "100%",
    minWidth: 0,
    minHeight,
    padding: `${paddingY}px ${paddingX}px`,
    boxSizing: "border-box",
    resize: resizeValue,
    borderRadius: rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px",
    border: `1.5px solid ${borderColor}`,
    background: disabled ? "var(--color-bg-page)" : "var(--color-bg-surface)",
    color: disabled ? "var(--color-text-secondary)" : "var(--color-text-primary)",
    outline: "none",
    fontSize,
    lineHeight: 1.5,
    transition: "border-color 150ms, background-color 150ms"
  };
  const footerRowStyle = {
    marginTop: 8,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12
  };
  const footerTextStyle = {
    margin: 0,
    color: footerMessageColor,
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  const countStyle = {
    margin: 0,
    flexShrink: 0,
    color: "var(--color-text-secondary)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  return /* @__PURE__ */ jsxs("div", { className: containerClass, style: wrapperStyle, children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: textareaId, style: labelStyle, children: label }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        ref,
        id: textareaId,
        className,
        style: textareaStyle,
        value: internalValue,
        rows,
        maxLength,
        onChange: handleChange,
        "aria-invalid": resolvedStatus === "error",
        "aria-label": label ? void 0 : ariaLabel,
        disabled,
        ...props
      }
    ),
    (footerMessage || showCount) && /* @__PURE__ */ jsxs("div", { style: footerRowStyle, children: [
      /* @__PURE__ */ jsx("span", { style: footerTextStyle, children: footerMessage }),
      showCount && /* @__PURE__ */ jsx("span", { style: countStyle, children: maxLength != null ? `${currentLength} / ${maxLength}` : currentLength })
    ] })
  ] });
});
TextArea.displayName = "TextArea";
var TextArea_default = TextArea;

export {
  TextArea_default
};
//# sourceMappingURL=chunk-EYD5OJ7L.mjs.map