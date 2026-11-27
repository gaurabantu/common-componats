/* ucs:component-css */
import "./styles/components/atoms/TextInputSearch/TextInputSearch.css";
import {
  HEADER_SEARCH_LAYOUT,
  TextInput_default,
  roundedToCssCorner,
  search_default
} from "./chunk-P7CURWJ4.mjs";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";
import {
  Icon_default
} from "./chunk-6JJMOGWW.mjs";

// src/components/atoms/TextInputSearch/index.tsx
import React from "react";

// src/components/atoms/TextInputSearch/TextInputSearch.utils.ts
function railButtonSize(inputSize) {
  switch (inputSize) {
    case "lg":
      return "sm";
    case "md":
      return "xs";
    default:
      return "xxs";
  }
}

// src/components/atoms/TextInputSearch/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var pxToRem = (px) => `${px / 16}rem`;
function railKey(inputSize) {
  if (inputSize === "lg")
    return "lg";
  if (inputSize === "md")
    return "md";
  return "sm";
}
var SEARCH_SHELL_ROUNDED = "3";
var TextInputSearch = React.forwardRef(function TextInputSearch2({
  id = "search",
  leftIcon = search_default,
  leftIconHeight,
  leftIconWidth,
  leftIconColor = "var(--color-text-primary)",
  placeholder = "Search...",
  value = "",
  onChange = () => {
  },
  onSearch,
  errorMessage = "",
  size = "sm",
  fullWidth = true,
  disabled = false,
  className = "",
  containerClassName = "text-input-search-wrapper",
  containerStyle = {},
  ariaLabel = "Search input",
  showClearButton,
  showSearchButton = false,
  searchButtonDisplay = "icon",
  searchButtonIcon,
  searchButtonIconWidth,
  searchButtonIconHeight,
  searchButtonAriaLabel,
  searchButtonLabel = "Search",
  searchActionButtonProps,
  suffix,
  trailingRail: trailingRailProp,
  pattern,
  autoCorrection = false,
  autoComplete = "off"
}, ref) {
  var _a, _b, _c, _d, _e;
  const errorId = `${id}-error`;
  const labelId = `${id}-label`;
  const resolvedSize = size || "sm";
  const hdr = HEADER_SEARCH_LAYOUT[railKey(resolvedSize)];
  const allowClearResolved = showClearButton !== void 0 ? showClearButton : !showSearchButton;
  const handleSearch = () => {
    if (disabled)
      return;
    onSearch == null ? void 0 : onSearch(value);
  };
  const {
    variant = "primary",
    size: actionSizeProp,
    rounded,
    icon: btnIconPass,
    iconWidth: btnIconWidthProp,
    iconHeight: btnIconHeightProp,
    iconColor: btnIconColorProp,
    ariaLabel: btnAriaPass,
    className: actionClassName,
    children: btnChildren,
    ripple = true,
    style: userSearchActionStyles,
    ...restSearchActionBtn
  } = searchActionButtonProps != null ? searchActionButtonProps : {};
  const mergedRounded = rounded != null ? rounded : "3";
  const trailingRailResolved = trailingRailProp != null ? trailingRailProp : showSearchButton && suffix === void 0 ? "integrated" : "default";
  const useIntegratedRail = trailingRailResolved === "integrated";
  const displayIconSrc = searchButtonDisplay === "icon" ? (_a = btnIconPass != null ? btnIconPass : searchButtonIcon) != null ? _a : search_default : btnIconPass;
  const iconInset = Math.round(hdr.searchActionInsetHeight * 0.48);
  const iw = (_b = btnIconWidthProp != null ? btnIconWidthProp : searchButtonIconWidth) != null ? _b : pxToRem(iconInset);
  const ih = (_c = btnIconHeightProp != null ? btnIconHeightProp : searchButtonIconHeight) != null ? _c : iw;
  const prefixIconSize = leftIconHeight != null ? leftIconHeight : pxToRem(Math.round(hdr.shellMinHeight * 0.42));
  const prefixIconWidth = leftIconWidth != null ? leftIconWidth : prefixIconSize;
  const iconOnlyName = searchButtonDisplay === "icon" ? (_d = btnAriaPass != null ? btnAriaPass : searchButtonAriaLabel) != null ? _d : searchButtonLabel : void 0;
  const trailingCorner = roundedToCssCorner(SEARCH_SHELL_ROUNDED);
  const mergedActionStyle = useIntegratedRail ? {
    ...userSearchActionStyles && typeof userSearchActionStyles === "object" ? userSearchActionStyles : {},
    alignSelf: "stretch",
    height: "100%",
    minHeight: hdr.shellMinHeightToken,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: trailingCorner,
    borderBottomRightRadius: trailingCorner,
    boxSizing: "border-box",
    ...searchButtonDisplay === "icon" ? {
      paddingLeft: pxToRem(hdr.integratedIconPadX),
      paddingRight: pxToRem(hdr.integratedIconPadX)
    } : {}
  } : {
    ...userSearchActionStyles && typeof userSearchActionStyles === "object" ? userSearchActionStyles : {},
    height: pxToRem(hdr.searchActionInsetHeight),
    minHeight: 0,
    alignSelf: "center",
    boxSizing: "border-box"
  };
  if (searchButtonDisplay === "icon") {
    mergedActionStyle.minWidth = 0;
  }
  const suffixForInput = suffix !== void 0 ? suffix : showSearchButton ? /* @__PURE__ */ jsx(
    "span",
    {
      className: useIntegratedRail ? "ucs-search-input__integrated-action-slot inline-flex h-full min-h-0 shrink-0 items-stretch self-stretch" : "ucs-search-input__integrated-action-slot inline-flex shrink-0 items-center",
      children: /* @__PURE__ */ jsx(
        Button_default,
        {
          ...restSearchActionBtn,
          type: "button",
          variant,
          size: actionSizeProp != null ? actionSizeProp : railButtonSize(resolvedSize),
          rounded: useIntegratedRail ? "0" : mergedRounded,
          disabled,
          ripple,
          onClick: handleSearch,
          style: mergedActionStyle,
          className: ["ucs-search-input__inline-action shrink-0", actionClassName].filter(Boolean).join(" "),
          icon: (searchButtonDisplay === "icon" || btnIconPass) && displayIconSrc ? displayIconSrc : void 0,
          iconWidth: (searchButtonDisplay === "icon" || btnIconPass) && displayIconSrc ? iw : void 0,
          iconHeight: (searchButtonDisplay === "icon" || btnIconPass) && displayIconSrc ? ih : void 0,
          iconColor: btnIconColorProp,
          ariaLabel: searchButtonDisplay === "icon" ? iconOnlyName : (_e = btnAriaPass != null ? btnAriaPass : searchButtonAriaLabel) != null ? _e : void 0,
          children: searchButtonDisplay === "text" ? btnChildren != null ? btnChildren : searchButtonLabel : void 0
        }
      )
    }
  ) : null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [containerClassName.trim(), fullWidth ? "ds-input-search--full" : ""].filter(Boolean).join(" "),
      style: {
        ...fullWidth ? null : { width: "auto" },
        ...containerStyle
      },
      role: "search",
      "aria-labelledby": labelId,
      children: [
        /* @__PURE__ */ jsx("label", { id: labelId, htmlFor: id, className: "visually-hidden", children: ariaLabel }),
        /* @__PURE__ */ jsx(
          TextInput_default,
          {
            ref,
            id,
            type: "search",
            placeholder,
            validation: "headerSearch",
            pattern,
            autoCorrection,
            autoComplete,
            value,
            onChange,
            errorMessage,
            size: resolvedSize,
            fullWidth,
            disabled,
            variant: "outlined",
            rounded: SEARCH_SHELL_ROUNDED,
            allowClear: allowClearResolved,
            prefix: leftIcon ? /* @__PURE__ */ jsx(
              Icon_default,
              {
                src: leftIcon,
                height: prefixIconSize,
                width: prefixIconWidth,
                color: leftIconColor,
                "aria-hidden": "true"
              }
            ) : void 0,
            suffix: suffixForInput,
            onPressEnter: handleSearch,
            ariaLabel,
            "aria-invalid": !!errorMessage,
            "aria-describedby": errorMessage ? errorId : void 0,
            className,
            trailingRail: trailingRailResolved
          }
        ),
        errorMessage && /* @__PURE__ */ jsx("span", { id: errorId, role: "alert", className: "visually-hidden", children: errorMessage })
      ]
    }
  );
});
TextInputSearch.displayName = "TextInputSearch";
var TextInputSearch_default = TextInputSearch;

export {
  TextInputSearch_default
};
//# sourceMappingURL=chunk-ZSF56B3K.mjs.map