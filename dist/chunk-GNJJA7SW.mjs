/* ucs:component-css */
import "./styles/components/molecules/ColorPicker/ColorPicker.css";
// src/components/molecules/ColorPicker/index.tsx
import { useEffect, useId, useMemo, useRef, useState } from "react";

// src/components/molecules/ColorPicker/colorUtils.ts
function normalizeHex(input) {
  if (typeof input !== "string")
    return null;
  const s = input.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(s))
    return `#${s[0]}${s[0]}${s[1]}${s[1]}${s[2]}${s[2]}`;
  if (/^[0-9a-f]{6}$/.test(s))
    return `#${s}`;
  return null;
}
function cssColorToHex(css) {
  const hex = normalizeHex(css);
  if (hex)
    return hex;
  const m = css.trim().match(/^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/i);
  if (!m)
    return null;
  return `#${[m[1], m[2], m[3]].map((c) => Math.min(255, Number(c)).toString(16).padStart(2, "0")).join("")}`;
}
function resolveTokenHex(token, el = typeof document !== "undefined" ? document.documentElement : null) {
  if (!el || typeof getComputedStyle === "undefined")
    return null;
  const raw = getComputedStyle(el).getPropertyValue(token);
  return raw ? cssColorToHex(raw) : null;
}
var DEFAULT_COLOR_PICKER_PALETTE = [
  { value: "#0d0d0d", label: "Black", token: "--color-brand-primary" },
  { value: "#5e5e5e", label: "Dark grey", token: "--color-text-secondary" },
  { value: "#8a8a8a", label: "Grey", token: "--color-border-default" },
  { value: "#e0e0e0", label: "Light grey", token: "--color-mist-80" },
  { value: "#ffffff", label: "White", token: "--color-bg-surface" },
  { value: "#ff4d00", label: "Brand orange", token: "--color-brand-secondary" },
  { value: "#002475", label: "Navy", token: "--color-brand-link" },
  { value: "#28a745", label: "Success green", token: "--color-state-success" },
  { value: "#ffc107", label: "Warning yellow", token: "--color-state-warning" },
  { value: "#dc3545", label: "Error red", token: "--color-state-error" },
  { value: "#5b36a3", label: "Lavender", token: "--color-accent-lavender-fg" },
  { value: "#1a6bb5", label: "Sky", token: "--color-accent-sky-fg" },
  { value: "#1a7a4f", label: "Mint", token: "--color-accent-mint-fg" },
  { value: "#8a6d00", label: "Amber", token: "--color-accent-amber-fg" },
  { value: "#a3293d", label: "Rose", token: "--color-accent-rose-fg" },
  { value: "#b9a7ff", label: "Lavender medium", token: "--color-accent-lavender-40" },
  { value: "#a0d2ff", label: "Sky medium", token: "--color-accent-sky-40" },
  { value: "#a0e7c4", label: "Mint medium", token: "--color-accent-mint-40" },
  { value: "#ffd966", label: "Amber medium", token: "--color-accent-amber-40" },
  { value: "#ffb3bd", label: "Rose medium", token: "--color-accent-rose-40" },
  { value: "#eee7ff", label: "Lavender light", token: "--color-accent-lavender-10" },
  { value: "#e6f2ff", label: "Sky light", token: "--color-accent-sky-10" },
  { value: "#e9fff4", label: "Mint light", token: "--color-accent-mint-10" },
  { value: "#fff6dd", label: "Amber light", token: "--color-accent-amber-10" },
  { value: "#ffe9ec", label: "Rose light", token: "--color-accent-rose-10" }
];

// src/components/molecules/ColorPicker/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function inkFor(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16 & 255, n >> 8 & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.4 ? "#0d0d0d" : "#ffffff";
}
function ColorPicker({
  value: valueProp,
  defaultValue,
  onChange,
  onValueChange,
  palette,
  columns,
  showHexInput = true,
  showNativePicker = false,
  resolveTokens = false,
  label,
  ariaLabel = "Colour",
  swatchSize = "md",
  disabled = false,
  id: idProp,
  name,
  className
}) {
  const reactId = useId().replace(/:/g, "");
  const baseId = idProp != null ? idProp : `color-picker-${reactId}`;
  const labelId = `${baseId}-label`;
  const hexId = `${baseId}-hex`;
  const errId = `${baseId}-hex-error`;
  const [internal, setInternal] = useState(() => normalizeHex(defaultValue));
  const value = valueProp !== void 0 ? normalizeHex(valueProp) : internal;
  const baseSwatches = useMemo(
    () => (palette != null ? palette : DEFAULT_COLOR_PICKER_PALETTE).map((p) => typeof p === "string" ? { value: p } : p).map((p) => {
      var _a;
      return { ...p, value: (_a = normalizeHex(p.value)) != null ? _a : p.value };
    }).filter((p) => normalizeHex(p.value) !== null),
    [palette]
  );
  const [resolved, setResolved] = useState(null);
  useEffect(() => {
    if (!resolveTokens) {
      setResolved(null);
      return;
    }
    setResolved(baseSwatches.map((s) => {
      var _a;
      return s.token ? { ...s, value: (_a = resolveTokenHex(s.token)) != null ? _a : s.value } : s;
    }));
  }, [baseSwatches, resolveTokens]);
  const swatches = resolveTokens && resolved || baseSwatches;
  const cols = Math.max(1, columns != null ? columns : palette ? 8 : 5);
  const emit = (hex) => {
    if (valueProp === void 0)
      setInternal(hex);
    onChange == null ? void 0 : onChange(hex);
    onValueChange == null ? void 0 : onValueChange(hex);
  };
  const selectedIdx = swatches.findIndex((s) => s.value === value);
  const [focusIdx, setFocusIdx] = useState(null);
  const tabIdx = focusIdx != null ? focusIdx : selectedIdx >= 0 ? selectedIdx : 0;
  const btnRefs = useRef([]);
  const move = (to) => {
    var _a;
    const i = Math.max(0, Math.min(swatches.length - 1, to));
    setFocusIdx(i);
    (_a = btnRefs.current[i]) == null ? void 0 : _a.focus();
    emit(swatches[i].value);
  };
  const onSwatchKey = (e, i) => {
    let to = null;
    switch (e.key) {
      case "ArrowRight":
        to = (i + 1) % swatches.length;
        break;
      case "ArrowLeft":
        to = (i - 1 + swatches.length) % swatches.length;
        break;
      case "ArrowDown":
        to = i + cols < swatches.length ? i + cols : i;
        break;
      case "ArrowUp":
        to = i - cols >= 0 ? i - cols : i;
        break;
      case "Home":
        to = 0;
        break;
      case "End":
        to = swatches.length - 1;
        break;
      case " ":
      case "Enter":
        e.preventDefault();
        emit(swatches[i].value);
        return;
      default:
        return;
    }
    e.preventDefault();
    move(to);
  };
  const [draft, setDraft] = useState(value != null ? value : "");
  const [invalid, setInvalid] = useState(false);
  const editing = useRef(false);
  useEffect(() => {
    if (!editing.current) {
      setDraft(value != null ? value : "");
      setInvalid(false);
    }
  }, [value]);
  const commitDraft = () => {
    const hex = normalizeHex(draft);
    if (hex) {
      setInvalid(false);
      setDraft(hex);
      if (hex !== value)
        emit(hex);
    } else if (draft.trim() === "") {
      setInvalid(false);
      setDraft(value != null ? value : "");
    } else {
      setInvalid(true);
    }
  };
  const hasLabel = label != null && label !== false;
  return /* @__PURE__ */ jsxs("div", { className: cls("ucs-color-picker", `ucs-color-picker--${swatchSize}`, className), id: baseId, children: [
    hasLabel && /* @__PURE__ */ jsx("span", { id: labelId, className: "ucs-color-picker__label", children: label }),
    name ? /* @__PURE__ */ jsx("input", { type: "hidden", name, value: value != null ? value : "" }) : null,
    /* @__PURE__ */ jsx(
      "div",
      {
        role: "radiogroup",
        "aria-labelledby": hasLabel ? labelId : void 0,
        "aria-label": hasLabel ? void 0 : ariaLabel,
        "aria-disabled": disabled || void 0,
        className: "ucs-color-picker__grid",
        style: { ["--ucs-cols"]: cols },
        children: swatches.map((s, i) => {
          var _a;
          const checked = i === selectedIdx;
          const swatchName = (_a = s.label) != null ? _a : s.value;
          return /* @__PURE__ */ jsx(
            "button",
            {
              ref: (el) => {
                btnRefs.current[i] = el;
              },
              type: "button",
              role: "radio",
              "aria-checked": checked,
              "aria-label": swatchName,
              title: s.label ? `${s.label} (${s.value})` : s.value,
              tabIndex: i === tabIdx ? 0 : -1,
              disabled,
              className: "ucs-color-picker__swatch",
              style: { backgroundColor: s.value },
              "data-value": s.value,
              onClick: () => {
                setFocusIdx(i);
                emit(s.value);
              },
              onFocus: () => setFocusIdx(i),
              onKeyDown: (e) => onSwatchKey(e, i),
              children: checked && /* @__PURE__ */ jsx("svg", { className: "ucs-color-picker__check", viewBox: "0 0 16 16", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M3 8.5l3 3 7-7", fill: "none", stroke: inkFor(s.value), strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) })
            },
            `${s.value}-${i}`
          );
        })
      }
    ),
    (showHexInput || showNativePicker) && /* @__PURE__ */ jsxs("div", { className: "ucs-color-picker__row", children: [
      /* @__PURE__ */ jsx("span", { className: "ucs-color-picker__preview", "aria-hidden": "true", style: { backgroundColor: value != null ? value : "transparent" } }),
      showHexInput && /* @__PURE__ */ jsx(
        "input",
        {
          id: hexId,
          type: "text",
          className: "ucs-color-picker__hex",
          inputMode: "text",
          autoComplete: "off",
          spellCheck: false,
          maxLength: 7,
          placeholder: "#rrggbb",
          "aria-label": hasLabel ? void 0 : `${ariaLabel} hex value`,
          "aria-labelledby": hasLabel ? `${labelId} ${hexId}-name` : void 0,
          "aria-invalid": invalid || void 0,
          "aria-describedby": invalid ? errId : void 0,
          disabled,
          value: draft,
          onFocus: () => {
            editing.current = true;
          },
          onChange: (e) => {
            const next = e.target.value;
            setDraft(next);
            const s = next.trim().replace(/^#/, "");
            if (/^[0-9a-fA-F]{6}$/.test(s)) {
              setInvalid(false);
              const hex = `#${s.toLowerCase()}`;
              if (hex !== value)
                emit(hex);
            }
          },
          onBlur: () => {
            editing.current = false;
            commitDraft();
          },
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitDraft();
            } else if (e.key === "Escape") {
              setDraft(value != null ? value : "");
              setInvalid(false);
            }
          }
        }
      ),
      hasLabel && showHexInput && /* @__PURE__ */ jsx("span", { id: `${hexId}-name`, hidden: true, children: "hex value" }),
      showNativePicker && /* @__PURE__ */ jsx(
        "input",
        {
          type: "color",
          className: "ucs-color-picker__native",
          "aria-label": `${typeof label === "string" ? label : ariaLabel} custom colour`,
          disabled,
          value: value != null ? value : "#000000",
          onChange: (e) => {
            const hex = normalizeHex(e.target.value);
            if (hex)
              emit(hex);
          }
        }
      )
    ] }),
    invalid && /* @__PURE__ */ jsx("span", { id: errId, className: "ucs-color-picker__error", role: "alert", children: "Enter a hex colour like #1a6bb5" })
  ] });
}
ColorPicker.displayName = "ColorPicker";
var ColorPicker_default = ColorPicker;

export {
  normalizeHex,
  DEFAULT_COLOR_PICKER_PALETTE,
  ColorPicker_default
};
//# sourceMappingURL=chunk-GNJJA7SW.mjs.map