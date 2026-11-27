/* ucs:component-css */
import "./styles/components/molecules/Combobox/Combobox.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "./chunk-UP5YH5MZ.mjs";
import {
  FORM_FIELD_CONSUMER_KEY,
  useFormField
} from "./chunk-GJBU4OKB.mjs";

// src/components/molecules/Combobox/index.tsx
import React, { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function flattenOptions(options, groups) {
  if (groups == null ? void 0 : groups.length)
    return groups.flatMap((g) => g.options);
  return options != null ? options : [];
}
function ChevronDown() {
  return /* @__PURE__ */ jsx("svg", { className: "ds-combobox__chevron", viewBox: "0 0 20 20", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M5 7.5L10 12.5L15 7.5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
var Combobox = React.memo(function Combobox2({
  label,
  options,
  groups,
  searchable = false,
  searchPlaceholder = "Search\u2026",
  multiple = false,
  placeholder = "Select\u2026",
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled = false,
  error,
  helperText,
  fullWidth = true,
  size = "md",
  className,
  id: idProp,
  listMinWidth,
  style,
  ...restProps
}) {
  const field = useFormField();
  const {
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    "aria-required": ariaRequiredProp,
    ...restWithoutAria
  } = restProps;
  const rest = field ? restWithoutAria : restProps;
  const triggerRef = useRef(null);
  const fieldControlId = field == null ? void 0 : field.id;
  useLayoutEffect(() => {
    const el = triggerRef.current;
    if (!el || !fieldControlId)
      return;
    const original = el.id;
    el.id = fieldControlId;
    return () => {
      el.id = original;
    };
  }, [fieldControlId]);
  const reactId = useId();
  const base = reactId.replace(/:/g, "");
  const listboxId = `ds-combobox-lb-${base}`;
  const searchId = `ds-combobox-search-${base}`;
  const labelId = `ds-combobox-lbl-${base}`;
  const isControlled = valueProp !== void 0;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (!open)
      setSearch("");
  }, [open]);
  const [innerValue, setInnerValue] = useState(() => {
    if (defaultValue !== void 0)
      return defaultValue;
    return multiple ? [] : "";
  });
  const selected = isControlled ? valueProp : innerValue;
  const allOptions = useMemo(() => flattenOptions(options, groups), [options, groups]);
  const useGroups = Boolean(groups == null ? void 0 : groups.length);
  const filteredFlat = useMemo(() => {
    const base2 = options != null ? options : [];
    const q = search.trim().toLowerCase();
    if (!searchable || !q)
      return base2;
    return base2.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, search, searchable]);
  const filteredGroups = useMemo(() => {
    if (!(groups == null ? void 0 : groups.length))
      return null;
    const q = search.trim().toLowerCase();
    if (!searchable || !q)
      return groups;
    return groups.map((g) => ({
      ...g,
      options: g.options.filter(
        (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
      )
    })).filter((g) => g.options.length > 0);
  }, [groups, search, searchable]);
  const setValue = useCallback(
    (next) => {
      if (!isControlled) {
        setInnerValue(next);
      }
      const opts = flattenOptions(options, groups);
      if (multiple && Array.isArray(next)) {
        const picked = next.map((v) => opts.find((o) => o.value === v)).filter(Boolean);
        onValueChange == null ? void 0 : onValueChange(next, picked);
      } else if (!multiple && typeof next === "string") {
        const one = opts.find((o) => o.value === next);
        onValueChange == null ? void 0 : onValueChange(next, one);
      }
    },
    [isControlled, multiple, onValueChange, options, groups]
  );
  const toggleMulti = (opt) => {
    if (opt.disabled || disabled)
      return;
    const cur = Array.isArray(selected) ? [...selected] : [];
    const i = cur.indexOf(opt.value);
    if (i >= 0)
      cur.splice(i, 1);
    else
      cur.push(opt.value);
    setValue(cur);
  };
  const pickSingle = (opt) => {
    if (opt.disabled || disabled)
      return;
    setValue(opt.value);
    setOpen(false);
    setSearch("");
  };
  const isSelected = (v) => {
    if (multiple && Array.isArray(selected))
      return selected.includes(v);
    if (!multiple && typeof selected === "string")
      return selected === v;
    return false;
  };
  const displayTrigger = useMemo(() => {
    var _a, _b, _c;
    if (multiple && Array.isArray(selected)) {
      if (selected.length === 0)
        return { text: placeholder, placeholder: true, icon: null };
      const labels = selected.map((v) => {
        var _a2, _b2;
        return (_b2 = (_a2 = allOptions.find((o) => o.value === v)) == null ? void 0 : _a2.label) != null ? _b2 : v;
      });
      const firstIcon = (_a = allOptions.find((o) => o.value === selected[0])) == null ? void 0 : _a.icon;
      return {
        text: labels.join(", "),
        placeholder: false,
        icon: selected.length === 1 ? firstIcon : null
      };
    }
    const s = typeof selected === "string" ? selected : "";
    if (!s)
      return { text: placeholder, placeholder: true, icon: null };
    const opt = allOptions.find((o) => o.value === s);
    return { text: (_b = opt == null ? void 0 : opt.label) != null ? _b : s, placeholder: false, icon: (_c = opt == null ? void 0 : opt.icon) != null ? _c : null };
  }, [allOptions, multiple, placeholder, selected]);
  const hasList = useGroups && filteredGroups ? filteredGroups.some((g) => g.options.length > 0) : filteredFlat.length > 0;
  const resolvedStatus = error ? "error" : void 0;
  const helperMessage = error != null ? error : helperText;
  const sizeStyles = useMemo(() => {
    const map = {
      // padX mirrors Select's paddingX (10 / 12 / 16) so a Combobox and a Select in the same form
      // start their text at the same x.
      sm: { minH: "var(--button-height-sm)", font: "var(--text-small-size, 12px)", padX: "10px" },
      md: { minH: "var(--button-height-lg)", font: "var(--text-body-size, 16px)", padX: "12px" },
      lg: { minH: "3rem", font: "var(--text-body-size, 16px)", padX: "var(--space-2, 16px)" }
    };
    return map[size];
  }, [size]);
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error)" : "var(--color-border-default)";
  const renderOptionRow = (opt) => {
    const sel = isSelected(opt.value);
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        role: "option",
        id: `${listboxId}-opt-${opt.value}`,
        "aria-selected": sel,
        "data-selected": sel ? "true" : "false",
        disabled: disabled || opt.disabled,
        className: "ds-combobox__option",
        onClick: () => multiple ? toggleMulti(opt) : pickSingle(opt),
        children: [
          opt.icon ? /* @__PURE__ */ jsx("span", { className: "ds-combobox__option-icon", children: opt.icon }) : null,
          /* @__PURE__ */ jsx("span", { className: "ds-combobox__option-label", children: opt.label }),
          multiple && sel ? /* @__PURE__ */ jsx("svg", { className: "ds-combobox__check", viewBox: "0 0 16 16", "aria-hidden": true, children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M13.5 4.5L6.5 11.5L3 8",
              stroke: "currentColor",
              strokeWidth: "2",
              fill: "none",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) }) : null
        ]
      },
      opt.value
    );
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...rest,
      id: field && idProp === field.id ? void 0 : idProp,
      className: cls("ds-combobox", className),
      style: {
        width: fullWidth ? "100%" : "auto",
        display: fullWidth ? "block" : "inline-block",
        ...style
      },
      "data-open": open ? "true" : "false",
      "data-disabled": disabled ? "true" : "false",
      "data-status": resolvedStatus,
      children: [
        /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, placement: "bottom-start", children: [
          label ? /* @__PURE__ */ jsx("div", { id: labelId, className: "ds-combobox__label", children: label }) : null,
          /* @__PURE__ */ jsxs(
            PopoverTrigger,
            {
              type: "button",
              role: "combobox",
              disabled,
              className: "ds-combobox__trigger",
              ref: triggerRef,
              "aria-labelledby": label ? labelId : field == null ? void 0 : field.labelId,
              "aria-label": label || field ? void 0 : placeholder != null ? placeholder : "Select option",
              ...field ? {
                "aria-describedby": ariaDescribedByProp != null ? ariaDescribedByProp : field.describedBy,
                "aria-invalid": ariaInvalidProp != null ? ariaInvalidProp : field.invalid || error ? true : void 0,
                "aria-required": ariaRequiredProp != null ? ariaRequiredProp : field.required || void 0
              } : {},
              hasPopup: "listbox",
              "aria-expanded": open,
              "aria-controls": listboxId,
              style: {
                "--combobox-min-h": sizeStyles.minH,
                "--combobox-font-size": sizeStyles.font,
                "--combobox-pad-x": sizeStyles.padX,
                "--combobox-border": borderColor
              },
              children: [
                /* @__PURE__ */ jsxs("span", { className: "ds-combobox__trigger-inner", children: [
                  displayTrigger.icon ? /* @__PURE__ */ jsx("span", { className: "ds-combobox__trigger-icon", children: displayTrigger.icon }) : null,
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: cls(
                        "ds-combobox__trigger-label",
                        displayTrigger.placeholder && "ds-combobox__trigger-label--placeholder"
                      ),
                      children: displayTrigger.text
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(ChevronDown, {})
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            PopoverContent,
            {
              role: "none",
              showPointer: false,
              className: "ds-combobox__popover",
              style: listMinWidth != null ? { minWidth: listMinWidth } : void 0,
              children: /* @__PURE__ */ jsxs("div", { className: "ds-combobox__panel", children: [
                searchable ? /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: searchId,
                    type: "search",
                    className: "ds-combobox__search",
                    placeholder: searchPlaceholder,
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    onKeyDown: (e) => e.stopPropagation(),
                    "aria-label": searchPlaceholder,
                    "aria-controls": listboxId,
                    autoComplete: "off"
                  }
                ) : null,
                !hasList ? /* @__PURE__ */ jsx("div", { className: "ds-combobox__empty", role: "status", children: "No results" }) : useGroups && filteredGroups ? /* @__PURE__ */ jsx(
                  "div",
                  {
                    id: listboxId,
                    className: "ds-combobox__listbox",
                    role: "listbox",
                    "aria-multiselectable": multiple,
                    "aria-label": label != null ? label : "Options",
                    children: filteredGroups.map((g) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
                      /* @__PURE__ */ jsx("div", { className: "ds-combobox__group-label", role: "presentation", children: g.label }),
                      g.options.map((opt) => renderOptionRow(opt))
                    ] }, g.label))
                  }
                ) : /* @__PURE__ */ jsx(
                  "div",
                  {
                    id: listboxId,
                    className: "ds-combobox__listbox",
                    role: "listbox",
                    "aria-multiselectable": multiple,
                    "aria-label": label != null ? label : "Options",
                    children: filteredFlat.map((opt) => renderOptionRow(opt))
                  }
                )
              ] })
            }
          )
        ] }),
        helperMessage ? /* @__PURE__ */ jsx("p", { className: "ds-combobox__helper", role: error ? "alert" : void 0, children: helperMessage }) : null
      ]
    }
  );
});
Combobox.displayName = "Combobox";
Combobox[FORM_FIELD_CONSUMER_KEY] = true;
var Combobox_default = Combobox;

export {
  Combobox,
  Combobox_default
};
//# sourceMappingURL=chunk-WQFF77HQ.mjs.map