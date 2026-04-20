import {
  TextInputSearch_default,
  search_default
} from "./chunk-2PE7SU3L.mjs";

// src/components/atoms/TextView/index.tsx
import React from "react";

// src/components/atoms/TextView/TextView.config.ts
var variantClassMap = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  body: "text-body",
  secondary: "text-secondary",
  small: "text-small",
  micro: "text-micro"
};
var fontSizeClassMap = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  body: "text-body",
  secondary: "text-secondary",
  small: "text-small",
  micro: "text-micro"
};
var fontWeightClassMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold"
};
var lineHeightClassMap = {
  none: "leading-none",
  tight: "leading-tight",
  snug: "leading-snug",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose"
};
var letterSpacingClassMap = {
  tighter: "tracking-tighter",
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest"
};
var defaultTagByVariant = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "span",
  secondary: "span",
  small: "small",
  micro: "small"
};
var colorClassMap = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  hint: "text-text-secondary",
  disabled: "text-text-secondary",
  success: "text-state-success",
  warning: "text-state-warning",
  error: "text-state-error",
  inherit: ""
};
var alignClassMap = {
  left: "text-start",
  center: "text-center",
  right: "text-end",
  justify: "text-justify"
};
var transformClassMap = {
  none: "normal-case",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize"
};
var decorationClassMap = {
  none: "no-underline",
  underline: "underline",
  "line-through": "line-through"
};

// src/components/atoms/TextView/TextView.utils.ts
var cls = (...classes) => classes.filter(Boolean).join(" ");

// src/components/atoms/TextView/index.tsx
var SEMANTIC_COLORS = [
  "primary",
  "secondary",
  "hint",
  "disabled",
  "success",
  "warning",
  "error",
  "inherit"
];
function isSemanticColor(color) {
  return SEMANTIC_COLORS.includes(color);
}
function isTokenFontSize(v) {
  return typeof v === "string" && v in fontSizeClassMap;
}
function isTokenFontWeight(v) {
  return typeof v === "string" && v in fontWeightClassMap;
}
var TextView = React.memo(function TextView2({
  as,
  children,
  variant = "body",
  color = "primary",
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  align = "left",
  transform = "none",
  decoration = "none",
  className = "",
  truncate = false,
  style,
  ...restProps
}) {
  const resolvedVariant = variant;
  const fallbackTag = defaultTagByVariant[resolvedVariant] || "span";
  const Component = as || fallbackTag;
  const useFontSizeStyle = typeof fontSize === "string" && fontSize.length > 0 && !isTokenFontSize(fontSize);
  const sizeClass = isTokenFontSize(fontSize) ? fontSizeClassMap[fontSize] : variantClassMap[resolvedVariant];
  const useFontWeightStyle = typeof fontWeight === "number" || typeof fontWeight === "string" && fontWeight.length > 0 && !isTokenFontWeight(fontWeight);
  const weightClass = isTokenFontWeight(fontWeight) ? fontWeightClassMap[fontWeight] : "";
  const useColorStyle = typeof color === "string" && color.length > 0 && !isSemanticColor(color);
  const colorClass = !useColorStyle && color ? colorClassMap[color] : "";
  const finalClassName = cls(
    "font-sans",
    sizeClass,
    weightClass,
    lineHeight && lineHeightClassMap[lineHeight],
    letterSpacing && letterSpacingClassMap[letterSpacing],
    colorClass,
    alignClassMap[align],
    transformClassMap[transform],
    decorationClassMap[decoration],
    truncate && "truncate",
    className
  );
  const finalStyle = useColorStyle || useFontSizeStyle || useFontWeightStyle ? {
    ...style,
    ...useColorStyle ? { color } : null,
    ...useFontSizeStyle ? { fontSize } : null,
    ...useFontWeightStyle ? { fontWeight } : null
  } : style;
  return React.createElement(
    Component,
    { className: finalClassName, style: finalStyle, ...restProps },
    children
  );
});
var TextView_default = TextView;

// src/components/atoms/Checkbox/index.tsx
import React2 from "react";

// src/components/atoms/Checkbox/Checkbox.config.ts
var defaultCheckboxColorClass = "w-5 h-5 rounded-base border-[1.5px] border-[var(--color-border-default)] checked:bg-[var(--color-brand-primary)] checked:border-[var(--color-brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--button-primary-focus-ring)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
var defaultLabelColorClass = "text-body text-text-primary cursor-pointer";
var defaultCheckboxInputLabelSpacing = "mr-2";

// src/components/atoms/Checkbox/Checkbox.utils.ts
function cls2(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/atoms/Checkbox/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Checkbox = React2.memo(function Checkbox2({
  label,
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
  checkboxColorClass = defaultCheckboxColorClass,
  labelColorClass = defaultLabelColorClass,
  inputLabelSpacingClass = defaultCheckboxInputLabelSpacing,
  className = "",
  shape = "default",
  rounded = "3",
  withShadow = false,
  ariaLabel,
  ariaLabelledBy
}) {
  const checkboxId = `${name}-${value}`;
  const hasVisibleLabel = label.trim().length > 0;
  const colors = {
    brand: "var(--color-brand-primary, #0D0D0D)",
    textPrimary: "var(--color-text-primary, #0D0D0D)",
    textSecondary: "var(--color-text-secondary, #757575)",
    bgSurface: "var(--color-bg-surface, #FFFFFF)",
    borderDefault: "var(--color-border-default, #999999)",
    accentLavender: "var(--color-accent-lavender-10, #EEE7FF)",
    focusRing: "var(--button-primary-focus-ring, #3B82F6)",
    shadow: "var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08))"
  };
  const roundedStyle = rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px";
  const wrapperStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    width: shape === "box" ? "100%" : "auto",
    padding: shape === "box" ? "12px" : 0,
    border: shape === "box" ? `1.5px solid ${checked ? colors.brand : colors.borderDefault}` : "none",
    borderRadius: shape === "box" ? roundedStyle : void 0,
    backgroundColor: shape === "box" ? checked ? colors.accentLavender : colors.bgSurface : "transparent",
    boxShadow: shape === "box" && withShadow && !disabled ? colors.shadow : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    userSelect: "none",
    pointerEvents: disabled ? "none" : "auto"
  };
  const inputStyle = {
    width: 18,
    height: 18,
    margin: "2px 0 0 0",
    flexShrink: 0,
    accentColor: colors.brand,
    cursor: disabled ? "not-allowed" : "pointer"
  };
  const labelStyle = {
    color: disabled ? colors.textSecondary : colors.textPrimary,
    lineHeight: 1.5,
    cursor: disabled ? "not-allowed" : "pointer"
  };
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: checkboxId,
      className: cls2(className),
      style: wrapperStyle,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            id: checkboxId,
            name,
            value,
            checked,
            disabled,
            onChange,
            "aria-label": !hasVisibleLabel && ariaLabel ? ariaLabel : void 0,
            "aria-labelledby": hasVisibleLabel ? `${checkboxId}-label` : !ariaLabel && ariaLabelledBy ? ariaLabelledBy : void 0,
            className: cls2(shape === "default" ? checkboxColorClass : "", inputLabelSpacingClass),
            style: inputStyle
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            id: `${checkboxId}-label`,
            className: cls2(labelColorClass),
            style: labelStyle,
            "aria-hidden": !hasVisibleLabel ? true : void 0,
            children: label
          }
        )
      ]
    }
  );
});
var Checkbox_default = Checkbox;

// src/components/atoms/Select/index.tsx
import { forwardRef, useId } from "react";

// src/components/atoms/Select/Select.config.ts
var defaultSelectOptions = {
  placeholder: "Select an option",
  liveSearch: false,
  customClass: "",
  showIcons: true
  // NEW: default to show icons
};

// src/components/atoms/Select/index.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var getOptionDataAttributes = (option) => {
  const dataAttrs = {};
  if (option.icon) {
    dataAttrs["data-icon"] = typeof option.icon === "string" ? option.icon : "custom-icon";
  }
  if (option.iconPosition) {
    dataAttrs["data-icon-position"] = option.iconPosition;
  }
  return dataAttrs;
};
var renderOptionContent = (option, showIcons = true) => {
  if (!showIcons || !option.icon) {
    return option.label;
  }
  const iconElement = typeof option.icon === "string" ? option.icon + " " : option.icon;
  if (option.iconPosition === "right") {
    return /* @__PURE__ */ jsxs2(Fragment, { children: [
      option.label,
      " ",
      iconElement
    ] });
  }
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    iconElement,
    " ",
    option.label
  ] });
};
function findOptionInSelect(value, options, groups) {
  if (groups == null ? void 0 : groups.length) {
    for (const g of groups) {
      const o = g.options.find((opt) => opt.value === value);
      if (o)
        return o;
    }
    return void 0;
  }
  return options == null ? void 0 : options.find((opt) => opt.value === value);
}
var Select = forwardRef((props, ref) => {
  const {
    label,
    options = [],
    groups,
    placeholder = defaultSelectOptions.placeholder,
    customClass = defaultSelectOptions.customClass,
    className = "",
    error,
    helperText,
    id,
    showIcons = defaultSelectOptions.showIcons,
    onValueChange,
    onChange,
    value,
    fullWidth = true,
    size = "md",
    rounded = "4",
    status,
    allowPlaceholderSelection = true,
    ...rest
  } = props;
  const generatedId = useId();
  const selectId = id || generatedId;
  const useGroups = Boolean(groups && groups.length > 0);
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = findOptionInSelect(selectedValue, options, groups);
    onChange == null ? void 0 : onChange(event);
    onValueChange == null ? void 0 : onValueChange(selectedValue, selectedOption);
  };
  const isDisabled = rest.disabled;
  const resolvedStatus = status != null ? status : error ? "error" : void 0;
  const helperMessage = error || helperText;
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : resolvedStatus === "warning" ? "var(--color-state-warning, #FFC107)" : resolvedStatus === "success" ? "var(--color-state-success, #28A745)" : "var(--color-border-default, #999999)";
  const footerColor = resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : resolvedStatus === "warning" ? "var(--color-state-warning, #FFC107)" : resolvedStatus === "success" ? "var(--color-state-success, #28A745)" : "var(--color-text-secondary, #757575)";
  const sizeConfig = {
    sm: { minHeight: 36, paddingX: 12, fontSize: "var(--text-small-size, 12px)" },
    md: { minHeight: 44, paddingX: 14, fontSize: "var(--text-body-size, 16px)" },
    lg: { minHeight: 48, paddingX: 16, fontSize: "var(--text-body-size, 16px)" }
  };
  const currentSize = sizeConfig[size];
  const radiusValue = rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px";
  const wrapperStyle = {
    width: fullWidth ? "100%" : "auto",
    display: fullWidth ? "block" : "inline-block"
  };
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: isDisabled ? "var(--color-text-secondary, #757575)" : "var(--color-text-primary, #0D0D0D)",
    fontSize: "var(--text-secondary-size, 14px)",
    fontWeight: 500,
    lineHeight: 1.5,
    cursor: isDisabled ? "not-allowed" : "default"
  };
  const selectStyle = {
    display: "block",
    width: "100%",
    minWidth: 0,
    minHeight: currentSize.minHeight,
    padding: `0 ${currentSize.paddingX + 18}px 0 ${currentSize.paddingX}px`,
    boxSizing: "border-box",
    borderRadius: radiusValue,
    border: `1.5px solid ${borderColor}`,
    backgroundColor: isDisabled ? "var(--color-bg-page, #F3F4F6)" : "var(--color-bg-surface, #FFFFFF)",
    color: isDisabled ? "var(--color-text-secondary, #757575)" : "var(--color-text-primary, #0D0D0D)",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    fontSize: currentSize.fontSize,
    lineHeight: 1.5,
    cursor: isDisabled ? "not-allowed" : "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%23757575' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${currentSize.paddingX}px center`,
    transition: "border-color 150ms, background-color 150ms"
  };
  const helperStyle = {
    marginTop: 8,
    marginBottom: 0,
    color: footerColor,
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  return /* @__PURE__ */ jsxs2("div", { className: customClass, style: wrapperStyle, children: [
    label && /* @__PURE__ */ jsx2("label", { htmlFor: selectId, style: labelStyle, children: label }),
    /* @__PURE__ */ jsxs2(
      "select",
      {
        ref,
        id: selectId,
        className,
        style: selectStyle,
        "aria-invalid": !!error || resolvedStatus === "error",
        value,
        onChange: handleChange,
        ...rest,
        children: [
          placeholder && /* @__PURE__ */ jsx2("option", { value: "", disabled: !allowPlaceholderSelection, children: placeholder }),
          useGroups ? groups.map((group) => /* @__PURE__ */ jsx2("optgroup", { label: group.label, children: group.options.map((opt, index) => {
            var _a;
            const dataAttributes = getOptionDataAttributes(opt);
            return /* @__PURE__ */ jsx2(
              "option",
              {
                value: opt.value,
                disabled: opt.disabled,
                ...dataAttributes,
                children: renderOptionContent(opt, showIcons)
              },
              `${group.label}-${(_a = opt.value) != null ? _a : "no-value"}-${opt.label}-${index}`
            );
          }) }, group.label)) : options.map((opt, index) => {
            var _a;
            const dataAttributes = getOptionDataAttributes(opt);
            return /* @__PURE__ */ jsx2(
              "option",
              {
                value: opt.value,
                disabled: opt.disabled,
                ...dataAttributes,
                children: renderOptionContent(opt, showIcons)
              },
              `${(_a = opt.value) != null ? _a : "no-value"}-${opt.label}-${index}`
            );
          })
        ]
      }
    ),
    helperMessage && /* @__PURE__ */ jsx2("p", { style: helperStyle, children: helperMessage })
  ] });
});
Select.displayName = "Select";
var Select_default = Select;

// src/components/molecules/Table/TablePrimitives.tsx
import { forwardRef as forwardRef2 } from "react";

// src/components/molecules/Table/Table.utils.ts
var cls3 = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// src/components/molecules/Table/TablePrimitives.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var TableRoot = forwardRef2(function TableRoot2({ className, containerClassName, children, ...rest }, ref) {
  return /* @__PURE__ */ jsx3("div", { className: cls3("table-ui-wrap", containerClassName), children: /* @__PURE__ */ jsx3("table", { ref, className: cls3("table-ui", className), ...rest, children }) });
});
TableRoot.displayName = "TableRoot";
var TableCaption = forwardRef2(
  function TableCaption2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx3("caption", { ref, className: cls3("table-ui-caption", className), ...rest });
  }
);
TableCaption.displayName = "TableCaption";
var TableHeader = forwardRef2(
  function TableHeader2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx3("thead", { ref, className: cls3("table-ui-thead", className), ...rest });
  }
);
TableHeader.displayName = "TableHeader";
var TableBody = forwardRef2(function TableBody2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx3("tbody", { ref, className: cls3("table-ui-tbody", className), ...rest });
});
TableBody.displayName = "TableBody";
var TableFooter = forwardRef2(
  function TableFooter2({ className, ...rest }, ref) {
    return /* @__PURE__ */ jsx3("tfoot", { ref, className: cls3("table-ui-tfoot", className), ...rest });
  }
);
TableFooter.displayName = "TableFooter";
var TableRow = forwardRef2(function TableRow2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx3("tr", { ref, className: cls3("table-ui-tr", className), ...rest });
});
TableRow.displayName = "TableRow";
var TableHead = forwardRef2(function TableHead2({ className, scope = "col", ...rest }, ref) {
  return /* @__PURE__ */ jsx3("th", { ref, className: cls3("table-ui-th", className), scope, ...rest });
});
TableHead.displayName = "TableHead";
var TableCell = forwardRef2(function TableCell2({ className, ...rest }, ref) {
  return /* @__PURE__ */ jsx3("td", { ref, className: cls3("table-ui-td", className), ...rest });
});
TableCell.displayName = "TableCell";

// src/components/molecules/Table/Table.tsx
import { useMemo, useState, useCallback, useEffect } from "react";

// src/components/molecules/Table/Table.config.ts
var tableConfig = {
  default: {
    table: "table-base table-layout-auto",
    thead: {
      primary: "table-thead table-thead-theme-primary",
      secondary: "table-thead table-thead-theme-primary",
      light: "table-thead table-thead-theme-light",
      dark: "table-thead table-thead-theme-dark",
      success: "table-thead table-thead-theme-primary",
      warning: "table-thead table-thead-theme-light",
      danger: "table-thead table-thead-theme-primary",
      info: "table-thead table-thead-theme-light"
    },
    th: "",
    td: "",
    striped: "table-striped",
    hover: "table-hover",
    compact: {
      th: "table-compact",
      td: "table-compact"
    }
  }
};

// src/components/molecules/Table/parts/TableHeader.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function TableHeader3({
  expandable,
  selectionMode,
  allSelected,
  visibleColumns,
  sortState,
  onSort,
  onSelectAll,
  className
}) {
  return /* @__PURE__ */ jsx4("thead", { className, children: /* @__PURE__ */ jsxs3("tr", { children: [
    expandable && /* @__PURE__ */ jsx4("th", { scope: "col", style: { width: 40 }, "aria-label": "Expand" }),
    selectionMode === "multiple" && /* @__PURE__ */ jsx4("th", { scope: "col", style: { width: 48 }, "aria-label": "Select all", children: /* @__PURE__ */ jsx4(
      Checkbox_default,
      {
        name: "table-select-all",
        value: "all",
        label: "",
        ariaLabel: "Select all rows",
        checked: allSelected,
        onChange: (e) => onSelectAll(e.target.checked)
      }
    ) }),
    selectionMode === "single" && /* @__PURE__ */ jsx4("th", { scope: "col", style: { width: 48 }, "aria-label": "Select" }),
    visibleColumns.map((col) => /* @__PURE__ */ jsxs3(
      "th",
      {
        scope: "col",
        className: cls3(
          col.align === "center" && "text-center",
          col.align === "right" && "text-end",
          col.sortable && "table-sortable"
        ),
        style: {
          width: typeof col.width === "number" ? `${col.width}px` : col.width,
          minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
        },
        tabIndex: col.sortable ? 0 : void 0,
        onClick: () => col.sortable && onSort(col.key),
        onKeyDown: (e) => {
          if (!col.sortable)
            return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSort(col.key);
          }
        },
        "aria-sort": col.sortable && sortState.key === col.key ? sortState.dir === "asc" ? "ascending" : sortState.dir === "desc" ? "descending" : "none" : void 0,
        children: [
          col.headerRender ? col.headerRender(col) : col.header,
          col.sortable && sortState.key === col.key && /* @__PURE__ */ jsx4("span", { className: "table-sort-icon", "aria-hidden": true, children: sortState.dir === "asc" ? " \u25B2" : sortState.dir === "desc" ? " \u25BC" : "" })
        ]
      },
      col.key
    ))
  ] }) });
}

// src/components/molecules/Table/parts/TableRow.tsx
import React4 from "react";

// src/components/molecules/Table/parts/TableCell.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function TableCell3({ align = "left", children }) {
  return /* @__PURE__ */ jsx5(
    "td",
    {
      className: cls3(
        align === "center" && "text-center",
        align === "right" && "text-end"
      ),
      children
    }
  );
}

// src/components/molecules/Table/parts/TableRow.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
function TableRow3({
  row,
  rowIndex,
  rowKeyValue,
  selectionMode,
  selected,
  expandable,
  isExpanded,
  visibleColumns,
  onRowClick,
  onToggleSelect,
  onToggleExpand,
  hover = true,
  renderCell
}) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ jsxs4(React4.Fragment, { children: [
    /* @__PURE__ */ jsxs4(
      "tr",
      {
        className: cls3(selected && "table-row-selected"),
        onClick: () => {
          onRowClick == null ? void 0 : onRowClick(row, rowIndex);
          if (selectionMode === "single")
            onToggleSelect(rowKeyValue, row);
        },
        style: { cursor: hover || onRowClick ? "pointer" : void 0 },
        children: [
          expandable && /* @__PURE__ */ jsx6("td", { style: { width: 40 }, children: /* @__PURE__ */ jsx6(
            "button",
            {
              type: "button",
              className: cls3("table-expand-btn", isExpanded && "table-expand-btn-expanded"),
              "aria-expanded": isExpanded,
              "aria-label": isExpanded ? "Collapse row details" : "Expand row details",
              onClick: (e) => {
                e.stopPropagation();
                onToggleExpand(rowKeyValue);
              },
              children: /* @__PURE__ */ jsx6("span", { className: "table-expand-btn-icon", "aria-hidden": true, children: "\u25B6" })
            }
          ) }),
          selectionMode === "multiple" && /* @__PURE__ */ jsx6("td", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx6(
            Checkbox_default,
            {
              name: "table-row",
              value: rowKeyValue,
              label: "",
              ariaLabel: `Select row ${String((_b = row[(_a = visibleColumns[0]) == null ? void 0 : _a.key]) != null ? _b : rowKeyValue)}`,
              checked: selected,
              onChange: () => onToggleSelect(rowKeyValue, row)
            }
          ) }),
          selectionMode === "single" && /* @__PURE__ */ jsx6("td", { className: "text-center", children: /* @__PURE__ */ jsx6(
            "input",
            {
              type: "radio",
              name: "table-row-select",
              checked: selected,
              onChange: () => onToggleSelect(rowKeyValue, row),
              onClick: (e) => e.stopPropagation(),
              "aria-label": `Select row ${String((_d = row[(_c = visibleColumns[0]) == null ? void 0 : _c.key]) != null ? _d : rowKeyValue)}`
            }
          ) }),
          visibleColumns.map((col) => /* @__PURE__ */ jsx6(TableCell3, { align: col.align, children: renderCell(col, row, rowIndex) }, col.key))
        ]
      }
    ),
    expandable && isExpanded && /* @__PURE__ */ jsx6("tr", { className: "table-expanded-row", children: /* @__PURE__ */ jsx6(
      "td",
      {
        colSpan: visibleColumns.length + (selectionMode !== "none" ? 1 : 0) + (expandable ? 1 : 0),
        children: expandable.expandedRowRender(row, rowIndex)
      }
    ) })
  ] });
}

// src/components/molecules/Table/Table.tsx
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
function getRowKey(row, index, rowKey) {
  var _a, _b;
  if (typeof rowKey === "function")
    return rowKey(row, index);
  if (rowKey && row && typeof row === "object" && rowKey in row) {
    const v = row[rowKey];
    return String(v != null ? v : index);
  }
  const r = row;
  return String((_b = (_a = r == null ? void 0 : r.id) != null ? _a : r == null ? void 0 : r.key) != null ? _b : index);
}
function defaultSorter(a, b) {
  if (a == null && b == null)
    return 0;
  if (a == null)
    return 1;
  if (b == null)
    return -1;
  if (typeof a === "number" && typeof b === "number")
    return a - b;
  return String(a).localeCompare(String(b));
}
function TableInner({
  columns,
  data,
  rowKey = "id",
  selectionMode = "none",
  selectedRowKeys,
  selectedRow,
  onSelectionChange,
  onRowSelect,
  onRowClick,
  expandable,
  searchable = true,
  searchPlaceholder = "Search...",
  searchProps,
  searchColumns,
  toolbar,
  toolbarLeft,
  toolbarRight,
  pagination = true,
  loading = false,
  loadingVariant = "overlay",
  loadingRows = 6,
  emptyText = "No data",
  emptyComponent,
  striped = true,
  bordered = false,
  hover = true,
  compact = false,
  headerColor = "light",
  customHeaderClass,
  stickyHeader = false,
  scroll,
  className = "",
  footer,
  showSearch,
  size = "md",
  tableLayout = "auto",
  variant = "default",
  theme = "light"
}) {
  var _a, _b, _c, _d;
  const config = tableConfig.default;
  const [searchValue, setSearchValue] = useState("");
  const [sortState, setSortState] = useState({ key: "", dir: null });
  const [currentPage, setCurrentPage] = useState(1);
  const paginationConfig = typeof pagination === "object" ? pagination : {};
  const pageSizeOptions = (_a = paginationConfig.pageSizeOptions) != null ? _a : [5, 10, 15, 25, 50];
  const [itemsPerPage, setItemsPerPage] = useState((_b = paginationConfig.pageSize) != null ? _b : 10);
  const selectedSet = useMemo(() => {
    const keys = selectedRowKeys != null ? selectedRowKeys : selectedRow;
    if (!keys)
      return /* @__PURE__ */ new Set();
    const arr = Array.isArray(keys) ? keys : [keys];
    return new Set(arr);
  }, [selectedRowKeys, selectedRow]);
  const expandedSet = useMemo(() => {
    if (!(expandable == null ? void 0 : expandable.expandedRowKeys))
      return /* @__PURE__ */ new Set();
    return new Set(expandable.expandedRowKeys);
  }, [expandable == null ? void 0 : expandable.expandedRowKeys]);
  const visibleColumns = useMemo(() => columns.filter((c) => !c.hidden), [columns]);
  const filteredData = useMemo(() => {
    if (!searchValue.trim())
      return data;
    const lower = searchValue.toLowerCase();
    const keysToSearch = (searchColumns == null ? void 0 : searchColumns.length) ? searchColumns : visibleColumns.map((c) => c.key);
    return data.filter(
      (row) => keysToSearch.some((k) => {
        const v = row[k];
        return String(v != null ? v : "").toLowerCase().includes(lower);
      })
    );
  }, [data, searchValue, searchColumns, visibleColumns]);
  const sortedData = useMemo(() => {
    var _a2;
    if (!sortState.key || !sortState.dir)
      return filteredData;
    const col = visibleColumns.find((c) => c.key === sortState.key);
    if (!(col == null ? void 0 : col.sortable))
      return filteredData;
    const sorter = (_a2 = col.sorter) != null ? _a2 : (a, b) => defaultSorter(a[col.key], b[col.key]);
    const sorted = [...filteredData].sort((a, b) => {
      const v = sorter(a, b, col.key);
      return sortState.dir === "asc" ? v : -v;
    });
    return sorted;
  }, [filteredData, sortState, visibleColumns]);
  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination ? sortedData.slice(startIndex, startIndex + itemsPerPage) : sortedData;
  useEffect(() => {
    setCurrentPage((p) => p > totalPages ? totalPages : p < 1 ? 1 : p);
  }, [totalPages]);
  const handleSort = useCallback(
    (key) => {
      const col = visibleColumns.find((c) => c.key === key);
      if (!(col == null ? void 0 : col.sortable))
        return;
      setSortState((prev) => ({
        key,
        dir: prev.key !== key ? "asc" : prev.dir === "asc" ? "desc" : prev.dir === "desc" ? null : "asc"
      }));
    },
    [visibleColumns]
  );
  const handleSelectRow = useCallback(
    (key, row) => {
      if (selectionMode === "single") {
        const keys = [key];
        onSelectionChange == null ? void 0 : onSelectionChange(keys, [row]);
        onRowSelect == null ? void 0 : onRowSelect(key);
      } else if (selectionMode === "multiple") {
        const newSet = new Set(selectedSet);
        if (newSet.has(key))
          newSet.delete(key);
        else
          newSet.add(key);
        const keys = Array.from(newSet);
        const rows = data.filter((r) => keys.includes(getRowKey(r, data.indexOf(r), rowKey)));
        onSelectionChange == null ? void 0 : onSelectionChange(keys, rows);
      }
    },
    [selectionMode, selectedSet, data, rowKey, onSelectionChange, onRowSelect]
  );
  const handleSelectAll = useCallback(
    (checked) => {
      if (selectionMode !== "multiple")
        return;
      const keys = checked ? paginatedData.map((r, i) => getRowKey(r, startIndex + i, rowKey)) : [];
      const rows = checked ? paginatedData : [];
      onSelectionChange == null ? void 0 : onSelectionChange(keys, rows);
    },
    [selectionMode, paginatedData, startIndex, rowKey, onSelectionChange]
  );
  const allSelected = selectionMode === "multiple" && paginatedData.length > 0 && paginatedData.every((r, i) => selectedSet.has(getRowKey(r, startIndex + i, rowKey)));
  const handleExpand = useCallback(
    (key) => {
      if (!(expandable == null ? void 0 : expandable.onExpandedRowsChange))
        return;
      const newSet = new Set(expandedSet);
      if (newSet.has(key))
        newSet.delete(key);
      else
        newSet.add(key);
      expandable.onExpandedRowsChange(Array.from(newSet));
    },
    [expandable, expandedSet]
  );
  const getHeaderClass = () => customHeaderClass || config.thead[headerColor] || config.thead.light;
  const renderCell = (column, row, rowIndex) => {
    if (column.render) {
      const val2 = row[column.key];
      return column.render(val2, row, rowIndex);
    }
    const val = row[column.key];
    return /* @__PURE__ */ jsx7(TextView_default, { as: "span", children: val != null ? String(val) : "" });
  };
  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++)
        pages.push(i);
    } else {
      pages.push(1);
      if (currentPage <= 4) {
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++)
          pages.push(i);
        pages.push("...");
      } else if (currentPage >= totalPages - 3) {
        pages.push("...");
        for (let i = Math.max(2, totalPages - 4); i <= totalPages; i++)
          pages.push(i);
      } else {
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pages.push(i);
        pages.push("...");
      }
      if (totalPages > 1 && !pages.includes(totalPages))
        pages.push(totalPages);
    }
    return pages;
  };
  const shouldUseSkeleton = loading && loadingVariant === "skeleton";
  const showLoadingOverlay = loading && loadingVariant !== "skeleton";
  const extraColumnsCount = (expandable ? 1 : 0) + (selectionMode !== "none" ? 1 : 0);
  const tableInlineStyle = (scroll == null ? void 0 : scroll.x) ? { minWidth: typeof scroll.x === "number" ? `${scroll.x}px` : scroll.x } : void 0;
  const tableContent = /* @__PURE__ */ jsxs5(
    "table",
    {
      className: cls3(
        config.table,
        tableLayout === "fixed" && "table-layout-fixed",
        variant === "minimal" && "table-variant-minimal",
        (bordered || variant === "bordered") && "table-bordered",
        stickyHeader && "table-sticky-header",
        striped && config.striped,
        hover && config.hover,
        compact && "table-compact",
        size === "sm" && "table-size-sm",
        size === "lg" && "table-size-lg",
        className
      ),
      style: tableInlineStyle,
      children: [
        /* @__PURE__ */ jsx7(
          TableHeader3,
          {
            expandable: Boolean(expandable),
            selectionMode,
            allSelected,
            visibleColumns,
            sortState,
            onSort: handleSort,
            onSelectAll: handleSelectAll,
            className: getHeaderClass()
          }
        ),
        /* @__PURE__ */ jsx7("tbody", { className: "table-tbody", children: shouldUseSkeleton ? Array.from({ length: Math.max(1, loadingRows) }).map((_, idx) => /* @__PURE__ */ jsx7("tr", { className: "table-skeleton-row", "aria-hidden": "true", children: Array.from({ length: visibleColumns.length + extraColumnsCount }).map((__, cellIdx) => /* @__PURE__ */ jsx7("td", { children: /* @__PURE__ */ jsx7("div", { className: "table-skeleton-line" }) }, `table-skeleton-cell-${idx}-${cellIdx}`)) }, `table-skeleton-row-${idx}`)) : paginatedData.map((row, idx) => {
          const rk = getRowKey(row, startIndex + idx, rowKey);
          return /* @__PURE__ */ jsx7(
            TableRow3,
            {
              row,
              rowIndex: startIndex + idx,
              rowKeyValue: rk,
              selectionMode,
              selected: selectedSet.has(rk),
              expandable,
              isExpanded: expandedSet.has(rk),
              visibleColumns,
              onRowClick,
              onToggleSelect: handleSelectRow,
              onToggleExpand: handleExpand,
              hover,
              renderCell
            },
            rk
          );
        }) }),
        footer && /* @__PURE__ */ jsx7("tfoot", { children: /* @__PURE__ */ jsx7("tr", { children: footer }) })
      ]
    }
  );
  const showSearchBar = searchable && showSearch !== false;
  const showPagination = Boolean(pagination) && totalItems > 0;
  const searchMaxWidth = (_c = searchProps == null ? void 0 : searchProps.maxWidth) != null ? _c : 280;
  const searchSize = (_d = searchProps == null ? void 0 : searchProps.size) != null ? _d : "sm";
  const searchBar = showSearchBar && /* @__PURE__ */ jsx7("div", { style: { marginBottom: 0, maxWidth: typeof searchMaxWidth === "number" ? `${searchMaxWidth}px` : searchMaxWidth, flex: toolbarRight ? "0 1 auto" : "1 1 auto" }, children: /* @__PURE__ */ jsx7(
    TextInputSearch_default,
    {
      leftIcon: search_default,
      leftIconHeight: 18,
      leftIconWidth: 18,
      placeholder: searchPlaceholder,
      value: searchValue,
      onChange: setSearchValue,
      size: searchSize,
      fullWidth: true,
      showClearButton: searchProps == null ? void 0 : searchProps.showClearButton,
      showSearchButton: searchProps == null ? void 0 : searchProps.showSearchButton
    }
  ) });
  const leftContent = toolbarLeft != null ? toolbarLeft : showSearchBar ? searchBar : null;
  const hasToolbar = toolbar || leftContent || toolbarRight;
  const toolbarContent = toolbar != null ? toolbar : hasToolbar ? /* @__PURE__ */ jsxs5("div", { className: "table-toolbar", children: [
    leftContent && /* @__PURE__ */ jsx7("div", { className: "table-toolbar-left", children: leftContent }),
    toolbarRight && /* @__PURE__ */ jsx7("div", { className: "table-toolbar-right", children: toolbarRight })
  ] }) : null;
  const wrapperClass = cls3("table-wrapper", theme === "dark" && "table-theme-dark");
  const scrollWrapperStyle = (scroll == null ? void 0 : scroll.y) ? {
    maxHeight: typeof scroll.y === "number" ? `${scroll.y}px` : scroll.y,
    overflowY: "auto",
    overflowX: "auto"
  } : { overflowX: "auto" };
  return /* @__PURE__ */ jsxs5("div", { className: wrapperClass, style: { position: "relative" }, "aria-busy": loading, children: [
    toolbarContent,
    showLoadingOverlay && /* @__PURE__ */ jsx7(
      "div",
      {
        className: "table-loading-overlay",
        role: "status",
        "aria-live": "polite",
        "aria-busy": "true",
        children: /* @__PURE__ */ jsx7(TextView_default, { children: "Loading..." })
      }
    ),
    /* @__PURE__ */ jsx7(
      "div",
      {
        className: cls3(stickyHeader && "table-scroll-body", "table-scroll-wrapper"),
        style: scrollWrapperStyle,
        role: "region",
        "aria-label": "Data table",
        children: sortedData.length === 0 && !loading ? emptyComponent != null ? emptyComponent : /* @__PURE__ */ jsx7("div", { className: "table-empty", children: /* @__PURE__ */ jsx7(TextView_default, { as: "p", children: emptyText }) }) : tableContent
      }
    ),
    showPagination && totalPages > 1 && /* @__PURE__ */ jsxs5("div", { className: "table-pagination", children: [
      /* @__PURE__ */ jsxs5("div", { className: "table-pagination-nav", children: [
        /* @__PURE__ */ jsx7(
          "button",
          {
            type: "button",
            className: "table-pagination-btn",
            onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
            disabled: currentPage === 1,
            "aria-label": "Previous page",
            children: "\u2039"
          }
        ),
        renderPageNumbers().map(
          (page, i) => page === "..." ? /* @__PURE__ */ jsx7("span", { className: "table-pagination-ellipsis", children: "\u2026" }, `ellipsis-${i}`) : /* @__PURE__ */ jsx7(
            "button",
            {
              type: "button",
              className: cls3(
                "table-pagination-page",
                currentPage === page && "active"
              ),
              onClick: () => setCurrentPage(page),
              children: page
            },
            page
          )
        ),
        /* @__PURE__ */ jsx7(
          "button",
          {
            type: "button",
            className: "table-pagination-btn",
            onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
            disabled: currentPage === totalPages,
            "aria-label": "Next page",
            children: "\u203A"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsx7(TextView_default, { as: "small", style: { color: "var(--color-text-secondary, #666)" }, children: "Show" }),
        /* @__PURE__ */ jsx7("div", { style: { minWidth: 70 }, children: /* @__PURE__ */ jsx7(
          Select_default,
          {
            options: pageSizeOptions.map((n) => ({ label: String(n), value: String(n) })),
            value: String(itemsPerPage),
            onValueChange: (v) => {
              setItemsPerPage(Number(v));
              setCurrentPage(1);
            }
          }
        ) }),
        /* @__PURE__ */ jsxs5(TextView_default, { as: "small", style: { color: "var(--color-text-secondary, #666)" }, children: [
          "of ",
          totalItems,
          " ",
          totalItems === 1 ? "item" : "items"
        ] })
      ] })
    ] })
  ] });
}
function Table(props) {
  return /* @__PURE__ */ jsx7(TableInner, { ...props });
}

// src/components/molecules/Table/index.tsx
var Table2 = Object.assign(Table, {
  Root: TableRoot,
  Caption: TableCaption,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell
});
var Table_default = Table2;

export {
  TextView_default,
  Checkbox_default,
  Select_default,
  TableRoot,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  Table_default
};
//# sourceMappingURL=chunk-NTBSW3TQ.mjs.map