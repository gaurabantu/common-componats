"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Accordion: () => Accordion,
  AccordionContent: () => AccordionContent,
  AccordionItem: () => AccordionItem,
  AccordionTrigger: () => AccordionTrigger,
  AlertDialog: () => AlertDialog,
  AppShell: () => AppShell,
  AppSidebar: () => AppSidebar,
  AppTopbar: () => AppTopbar_default,
  AreaChart: () => AreaChart_default,
  Avtar: () => Avatar_default,
  Badge: () => Badge_default,
  BarChart: () => BarChart_default,
  Breadcrumb: () => Breadcrumb,
  BreadcrumbItem: () => BreadcrumbItem,
  Button: () => Button_default,
  ButtonGroup: () => ButtonGroup,
  ButtonGroupSeparator: () => ButtonGroupSeparator,
  ButtonGroupText: () => ButtonGroupText,
  Calendar: () => Calendar_default,
  Card: () => Card_default,
  CardAction: () => CardAction,
  CardContent: () => CardContent,
  CardDescription: () => CardDescription,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardTitle: () => CardTitle,
  ChartTooltip: () => ChartTooltip,
  CheckBox: () => Checkbox_default,
  Chip: () => Chip,
  Combobox: () => Combobox,
  DashboardShell: () => DashboardShell_default,
  DatePicker: () => DatePicker_default,
  Divider: () => Divider_default,
  DropdownMenu: () => DropdownMenu,
  DropdownMenuContent: () => DropdownMenuContent,
  DropdownMenuItem: () => DropdownMenuItem,
  DropdownMenuTrigger: () => DropdownMenuTrigger,
  Dropzone: () => Dropzone,
  FileUpload: () => FileUpload_default,
  Form: () => Form,
  GradientText: () => GradientText_default,
  Grid: () => Grid,
  GridItem: () => GridItem,
  Hyperlink: () => Hyperlink_default,
  Icon: () => Icon_default,
  Input: () => TextInput_default,
  InputSearch: () => TextInputSearch_default,
  LineChart: () => LineChart_default,
  Modal: () => Modal,
  OtpBox: () => OtpBox_default,
  PieChart: () => PieChart_default,
  Popover: () => Popover,
  PopoverContent: () => PopoverContent,
  PopoverTrigger: () => PopoverTrigger,
  ProgressBar: () => ProgressBar_default,
  RadioGroup: () => RadioGroup_default,
  Select: () => Select_default,
  Stepper: () => Stepper,
  StepperStep: () => StepperStep,
  Switch: () => Switch_default,
  Table: () => Table_default,
  TableBody: () => TableBody,
  TableCaption: () => TableCaption,
  TableCell: () => TableCell2,
  TableFooter: () => TableFooter,
  TableHead: () => TableHead,
  TableHeader: () => TableHeader2,
  TableRoot: () => TableRoot,
  TableRow: () => TableRow2,
  Tabs: () => Tabs,
  TabsContent: () => TabsContent,
  TabsList: () => TabsList,
  TabsTrigger: () => TabsTrigger,
  Tag: () => Tag,
  TextArea: () => TextArea_default,
  TextView: () => TextView_default,
  ToolTip: () => ToolTip_default,
  detectFileKindFromBuffer: () => detectFileKindFromBuffer,
  mergeSidebarTokensStyle: () => mergeSidebarTokensStyle,
  mergeTopbarTokensStyle: () => mergeTopbarTokensStyle,
  parseAcceptString: () => parseAcceptString,
  readAppSidebarPersist: () => readAppSidebarPersist,
  validateFileSecurity: () => validateFileSecurity,
  validateFilename: () => validateFilename,
  validateFilesSecurity: () => validateFilesSecurity,
  writeAppSidebarPersist: () => writeAppSidebarPersist
});
module.exports = __toCommonJS(src_exports);

// src/components/atoms/Button/index.tsx
var import_react2 = __toESM(require("react"));

// src/components/atoms/Button/Button.config.ts
var variantClasses = {
  default: "btn-primary",
  primary: "btn-primary",
  secondary: "btn-secondary",
  outlinePrimary: "btn-outline-primary",
  outlineSecondary: "btn-outline-secondary",
  success: "btn-success",
  danger: "btn-danger",
  warning: "btn-warning",
  link: "btn-link",
  ghost: "btn-ghost"
};
var sizeClasses = {
  xxs: "btn-size-xxs",
  xs: "btn-size-xs",
  sm: "btn-size-sm",
  md: "btn-size-md",
  lg: "btn-size-lg"
};
var iconOnlySizeClasses = {
  xxs: "btn-icon-only-xxs",
  xs: "btn-icon-only-xs",
  sm: "btn-icon-only-sm",
  md: "btn-icon-only-md",
  lg: "btn-icon-only-lg"
};
var radiusClass = "btn-rounded-md";
var defaultIconConfig = {
  width: 20,
  height: 20,
  color: "currentColor"
};

// src/components/atoms/Icon/index.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
function resolveSrc(src) {
  if (typeof src === "string")
    return src;
  if (import_react.default.isValidElement(src))
    return null;
  if (typeof src === "object" && src !== null) {
    if ("src" in src && typeof src.src === "string")
      return src.src;
    if ("default" in src && typeof src.default === "string")
      return src.default;
  }
  return null;
}
function isSvgSource(url) {
  const u = url.toLowerCase();
  return u.includes(".svg") || url.startsWith("data:image/svg+xml");
}
function cssUrl(href) {
  return `url(${JSON.stringify(href)})`;
}
var Icon = import_react.default.memo(function Icon2({
  src,
  alt = "",
  color = "currentColor",
  width = 16,
  height = 16,
  className = "",
  style = {},
  preserveColors = false,
  decorative,
  title,
  ...rest
}) {
  const resolvedSrc = resolveSrc(src);
  const isDecorative = decorative != null ? decorative : !alt;
  const wrapperStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: typeof width === "number" ? width : width,
    height: typeof height === "number" ? height : height,
    verticalAlign: "middle",
    lineHeight: 0,
    flexShrink: 0,
    ...style
  };
  const wrapperProps = {
    className,
    style: wrapperStyle,
    role: isDecorative ? void 0 : "img",
    "aria-hidden": isDecorative ? true : void 0,
    "aria-label": isDecorative ? void 0 : alt,
    title: typeof title === "string" ? title : alt || void 0,
    ...rest
  };
  if (import_react.default.isValidElement(src)) {
    const size = typeof width === "number" ? width : 16;
    const childProps = src.props;
    const childStyle = (childProps == null ? void 0 : childProps.style) || {};
    const mergedStyle = {
      width: size,
      height: size,
      color: !preserveColors ? color : void 0,
      ...childStyle
    };
    const child = import_react.default.cloneElement(src, {
      width: size,
      height: size,
      style: mergedStyle
    });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...wrapperProps, children: child });
  }
  if (!resolvedSrc) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...wrapperProps });
  }
  const isSvg = isSvgSource(resolvedSrc);
  if (isSvg && !preserveColors) {
    const maskRef = cssUrl(resolvedSrc);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        ...wrapperProps,
        style: {
          ...wrapperStyle,
          display: "inline-block",
          backgroundColor: color,
          WebkitMaskImage: maskRef,
          maskImage: maskRef,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain"
        }
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ...wrapperProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "img",
    {
      src: resolvedSrc,
      alt: isDecorative ? "" : alt,
      width: typeof width === "number" ? width : void 0,
      height: typeof height === "number" ? height : void 0,
      style: { width, height, objectFit: "contain", display: "block" },
      loading: "lazy",
      decoding: "async"
    }
  ) });
});
var Icon_default = Icon;

// src/components/atoms/Button/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var VALID_VARIANTS = [
  "default",
  "primary",
  "secondary",
  "outlinePrimary",
  "outlineSecondary",
  "success",
  "danger",
  "warning",
  "link",
  "ghost"
];
function getVariantClass(v) {
  if (v === void 0 || v === null || v === "")
    return variantClasses.primary;
  if (VALID_VARIANTS.includes(v))
    return variantClasses[v];
  return variantClasses.primary;
}
var Button = import_react2.default.memo(function Button2({
  children,
  variant = "primary",
  variantClass,
  size = "lg",
  width,
  height,
  rounded,
  classOverrides = {},
  borderColor,
  backgroundColor,
  textColor,
  gradient,
  gradientHover,
  gradientActive,
  textSize,
  icon,
  iconPosition = "left",
  iconWidth,
  iconHeight,
  iconColor,
  iconGap = 8,
  fullWidth = false,
  block = false,
  loading = false,
  className = "",
  ariaLabel,
  preserveIconColor = false,
  href,
  ...rest
}) {
  var _a, _b, _c;
  const hasText = !!children && (typeof children === "string" ? children.trim().length > 0 : import_react2.default.Children.count(children) > 0);
  const isIconOnly = !!icon && !hasText;
  const variantClassNames = getVariantClass(variant);
  const resolvedVariant = variant == null || variant === "" ? "primary" : variant;
  const dsVariant = VALID_VARIANTS.includes(resolvedVariant) ? resolvedVariant : "primary";
  const sizeKey = (size != null ? size : "lg") in sizeClasses ? size : "lg";
  const sizeClassNames = isIconOnly ? (_a = iconOnlySizeClasses[sizeKey]) != null ? _a : iconOnlySizeClasses.lg : (_b = sizeClasses[sizeKey]) != null ? _b : sizeClasses.lg;
  const computedAriaLabel = ariaLabel != null ? ariaLabel : isIconOnly ? "Button" : void 0;
  const styleOverrides = {};
  if (backgroundColor)
    styleOverrides.backgroundColor = backgroundColor;
  if (borderColor)
    styleOverrides.borderColor = borderColor;
  if (textColor)
    styleOverrides.color = textColor;
  if (width !== void 0)
    styleOverrides.width = typeof width === "number" ? `${width}px` : width;
  if (height !== void 0)
    styleOverrides.height = typeof height === "number" ? `${height}px` : height;
  if (gradient) {
    styleOverrides["--button-gradient-bg"] = gradient;
    styleOverrides["--button-gradient-hover-bg"] = gradientHover || gradient;
    styleOverrides["--button-gradient-active-bg"] = gradientActive || gradientHover || gradient;
  }
  const hasOverrides = Object.keys(styleOverrides).length > 0;
  const baseClass = [
    "btn-base",
    variantClassNames,
    sizeClassNames,
    loading ? "btn-loading" : "",
    gradient ? "btn-gradient" : "",
    variantClass != null ? variantClass : "",
    (_c = classOverrides.variant) != null ? _c : "",
    rounded !== void 0 ? `btn-rounded-${rounded}` : radiusClass,
    fullWidth || block ? "btn-full-width" : "",
    className
  ].filter(Boolean).join(" ");
  const finalIconWidth = iconWidth != null ? iconWidth : defaultIconConfig.width;
  const finalIconHeight = iconHeight != null ? iconHeight : defaultIconConfig.height;
  const gapPx = Math.min(16, Math.max(0, iconGap));
  const gapSnap = [0, 4, 8, 12, 16].reduce((a, b) => Math.abs(b - gapPx) < Math.abs(a - gapPx) ? b : a);
  const iconGapClass = !hasText || gapSnap === 8 ? "" : iconPosition === "left" ? `btn-icon-gap-right-${gapSnap}` : `btn-icon-gap-left-${gapSnap}`;
  const renderIcon = () => {
    if (!icon)
      return null;
    const wrapperClass = [
      hasText && iconPosition === "left" && "btn-icon-left",
      hasText && iconPosition === "right" && "btn-icon-right",
      iconGapClass
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: wrapperClass || void 0, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      Icon_default,
      {
        src: icon,
        width: finalIconWidth,
        height: finalIconHeight,
        preserveColors: preserveIconColor,
        color: iconColor || "currentColor",
        className: "btn-icon-inner"
      }
    ) });
  };
  const { style: restStyle, ...restWithoutStyle } = rest;
  const mergedStyle = hasOverrides ? { ...restStyle, ...styleOverrides } : restStyle;
  const content = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    loading && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "btn-spinner", "aria-hidden": "true" }),
    icon && iconPosition === "left" && renderIcon(),
    children,
    icon && iconPosition === "right" && renderIcon()
  ] });
  const isDisabled = Boolean(rest.disabled) || loading;
  if (href) {
    const { onClick, ...linkRest } = restWithoutStyle;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "a",
      {
        ...linkRest,
        href: isDisabled ? void 0 : href,
        className: baseClass,
        style: mergedStyle,
        "aria-label": computedAriaLabel != null ? computedAriaLabel : void 0,
        "aria-disabled": isDisabled || void 0,
        "data-variant": dsVariant,
        "data-raw-variant": variant,
        onClick: (e) => {
          if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick == null ? void 0 : onClick(e);
        },
        children: content
      }
    );
  }
  const buttonRest = restWithoutStyle;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "button",
    {
      ...buttonRest,
      className: baseClass,
      style: mergedStyle,
      disabled: isDisabled,
      "aria-label": computedAriaLabel != null ? computedAriaLabel : void 0,
      "data-variant": dsVariant,
      "data-raw-variant": variant,
      children: content
    }
  );
});
var Button_default = Button;

// src/components/atoms/TextView/index.tsx
var import_react3 = __toESM(require("react"));

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
var TextView = import_react3.default.memo(function TextView2({
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
  return import_react3.default.createElement(
    Component,
    { className: finalClassName, style: finalStyle, ...restProps },
    children
  );
});
var TextView_default = TextView;

// src/components/atoms/TextInput/TextInput.tsx
var import_react4 = require("react");

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

// src/assets/visibility_on.svg
var visibility_on_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_2141_81048" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_2141_81048)">%0A<path d="M9.0022 11.5577C9.85208 11.5577 10.5739 11.2603 11.1676 10.6654C11.7614 10.0706 12.0583 9.34819 12.0583 8.49831C12.0583 7.64844 11.7608 6.92662 11.166 6.33287C10.5711 5.73912 9.8487 5.44225 8.99883 5.44225C8.14895 5.44225 7.42714 5.73969 6.83339 6.33456C6.23964 6.92944 5.94277 7.65181 5.94277 8.50169C5.94277 9.35156 6.2402 10.0734 6.83508 10.6671C7.42995 11.2609 8.15233 11.5577 9.0022 11.5577ZM9.00052 10.525C8.43802 10.525 7.95989 10.3281 7.56614 9.93438C7.17239 9.54063 6.97552 9.0625 6.97552 8.5C6.97552 7.9375 7.17239 7.45938 7.56614 7.06563C7.95989 6.67188 8.43802 6.475 9.00052 6.475C9.56302 6.475 10.0411 6.67188 10.4349 7.06563C10.8286 7.45938 11.0255 7.9375 11.0255 8.5C11.0255 9.0625 10.8286 9.54063 10.4349 9.93438C10.0411 10.3281 9.56302 10.525 9.00052 10.525ZM9.00052 13.75C7.42164 13.75 5.97764 13.3288 4.66852 12.4864C3.35939 11.6442 2.31445 10.5361 1.5337 9.16206C1.4712 9.05431 1.42552 8.94575 1.39664 8.83638C1.36789 8.727 1.35352 8.61475 1.35352 8.49963C1.35352 8.3845 1.36789 8.27237 1.39664 8.16325C1.42552 8.05412 1.4712 7.94569 1.5337 7.83794C2.31445 6.46394 3.35939 5.35581 4.66852 4.51356C5.97764 3.67119 7.42164 3.25 9.00052 3.25C10.5794 3.25 12.0234 3.67119 13.3325 4.51356C14.6416 5.35581 15.6866 6.46394 16.4673 7.83794C16.5298 7.94569 16.5755 8.05425 16.6044 8.16362C16.6331 8.273 16.6475 8.38525 16.6475 8.50037C16.6475 8.6155 16.6331 8.72762 16.6044 8.83675C16.5755 8.94587 16.5298 9.05431 16.4673 9.16206C15.6866 10.5361 14.6416 11.6442 13.3325 12.4864C12.0234 13.3288 10.5794 13.75 9.00052 13.75ZM9.00052 12.625C10.413 12.625 11.7099 12.2531 12.8911 11.5094C14.0724 10.7656 14.9755 9.7625 15.6005 8.5C14.9755 7.2375 14.0724 6.23438 12.8911 5.49062C11.7099 4.74687 10.413 4.375 9.00052 4.375C7.58802 4.375 6.29114 4.74687 5.10989 5.49062C3.92864 6.23438 3.02552 7.2375 2.40052 8.5C3.02552 9.7625 3.92864 10.7656 5.10989 11.5094C6.29114 12.2531 7.58802 12.625 9.00052 12.625Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/assets/visibility_off.svg
var visibility_off_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_8283_202257" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_8283_202257)">%0A<path d="M11.1601 6.46375C11.4649 6.76862 11.7004 7.13906 11.8668 7.57506C12.0332 8.01119 12.0961 8.44894 12.0556 8.88831C12.0556 9.03256 12.0037 9.15469 11.9 9.25469C11.7961 9.35469 11.6721 9.40469 11.5278 9.40469C11.3836 9.40469 11.2614 9.35469 11.1614 9.25469C11.0614 9.15469 11.0114 9.03256 11.0114 8.88831C11.0596 8.55856 11.0324 8.24606 10.9301 7.95081C10.8277 7.65569 10.6702 7.40187 10.4577 7.18937C10.2452 6.97687 9.989 6.81556 9.689 6.70544C9.389 6.59531 9.07262 6.56669 8.73987 6.61956C8.59562 6.62444 8.47112 6.57612 8.36637 6.47462C8.2615 6.37325 8.20669 6.25044 8.20194 6.10619C8.19706 5.96194 8.24344 5.83737 8.34106 5.7325C8.43869 5.62775 8.55962 5.573 8.70387 5.56825C9.14037 5.51825 9.57906 5.57519 10.0199 5.73906C10.4608 5.90306 10.8409 6.14462 11.1601 6.46375ZM9.00238 4.4965C8.736 4.4965 8.47469 4.5095 8.21844 4.5355C7.96219 4.56137 7.70712 4.60412 7.45325 4.66375C7.29362 4.6965 7.14988 4.67369 7.022 4.59531C6.89412 4.51694 6.80619 4.40419 6.75819 4.25706C6.71006 4.10519 6.72594 3.96075 6.80581 3.82375C6.88556 3.68675 7.00137 3.60187 7.15325 3.56912C7.45525 3.497 7.76031 3.44606 8.06844 3.41631C8.37669 3.38644 8.688 3.3715 9.00238 3.3715C10.6139 3.3715 12.0942 3.79025 13.4433 4.62775C14.7923 5.46525 15.8298 6.59844 16.5556 8.02731C16.6056 8.12244 16.6419 8.21831 16.6646 8.31494C16.6872 8.41156 16.6985 8.51375 16.6985 8.6215C16.6985 8.72925 16.6891 8.83144 16.6704 8.92806C16.6516 9.02469 16.6173 9.12056 16.5673 9.21569C16.3375 9.69644 16.0582 10.1447 15.7293 10.5606C15.4004 10.9765 15.0384 11.3585 14.6431 11.7066C14.5269 11.8105 14.394 11.8535 14.2445 11.8356C14.0949 11.8179 13.972 11.7431 13.8759 11.6114C13.7798 11.4796 13.7399 11.3383 13.7563 11.1874C13.7726 11.0364 13.8389 10.909 13.9552 10.8051C14.2937 10.4984 14.6024 10.1631 14.8813 9.79919C15.1601 9.43519 15.4005 9.04262 15.6024 8.6215C14.9774 7.359 14.0743 6.35587 12.893 5.61212C11.7118 4.86837 10.4149 4.4965 9.00238 4.4965ZM9.00238 13.8715C7.4235 13.8715 5.97638 13.4496 4.661 12.6059C3.34563 11.7621 2.3 10.6508 1.52413 9.27194C1.46163 9.17681 1.41594 9.07344 1.38706 8.96181C1.35819 8.85031 1.34375 8.73687 1.34375 8.6215C1.34375 8.50612 1.35625 8.39456 1.38125 8.28681C1.40625 8.17919 1.45 8.07394 1.5125 7.97106C1.79138 7.46144 2.10725 6.97606 2.46012 6.51494C2.813 6.05394 3.21875 5.64075 3.67738 5.27537L1.98406 3.57044C1.88031 3.45894 1.82912 3.3265 1.8305 3.17312C1.832 3.01975 1.88706 2.88875 1.99569 2.78013C2.10431 2.6715 2.23606 2.61719 2.39094 2.61719C2.54569 2.61719 2.67738 2.6715 2.786 2.78013L15.2188 15.2129C15.3226 15.3167 15.3777 15.4453 15.3839 15.5986C15.3902 15.7519 15.3351 15.8868 15.2188 16.0032C15.1101 16.1118 14.9784 16.1661 14.8235 16.1661C14.6688 16.1661 14.5371 16.1118 14.4284 16.0032L11.789 13.3868C11.3466 13.5579 10.892 13.6815 10.4251 13.7575C9.95837 13.8335 9.48413 13.8715 9.00238 13.8715ZM4.46788 6.06569C4.02838 6.40519 3.63338 6.78906 3.28288 7.21731C2.93238 7.64569 2.63888 8.11375 2.40237 8.6215C3.02737 9.884 3.9305 10.8871 5.11175 11.6309C6.293 12.3746 7.58988 12.7465 9.00238 12.7465C9.3245 12.7465 9.64156 12.7249 9.95356 12.6816C10.2656 12.6384 10.5754 12.5716 10.8832 12.4812L9.93406 11.509C9.78219 11.5754 9.6305 11.6203 9.479 11.6438C9.32763 11.6674 9.16875 11.6792 9.00238 11.6792C8.15138 11.6792 7.429 11.3824 6.83525 10.7886C6.2415 10.1949 5.94462 9.4725 5.94462 8.6215C5.94462 8.45512 5.95762 8.29625 5.98362 8.14487C6.00962 7.99337 6.05337 7.84169 6.11487 7.68981L4.46788 6.06569Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/assets/error.svg
var error_default = 'data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_992_11734" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">%0A<rect width="16" height="16" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_992_11734)">%0A<path d="M8.00065 11.334C8.18954 11.334 8.34798 11.27 8.47598 11.142C8.60354 11.0144 8.66732 10.8562 8.66732 10.6673C8.66732 10.4784 8.60354 10.32 8.47598 10.192C8.34798 10.0644 8.18954 10.0007 8.00065 10.0007C7.81176 10.0007 7.65354 10.0644 7.52598 10.192C7.39798 10.32 7.33398 10.4784 7.33398 10.6673C7.33398 10.8562 7.39798 11.0144 7.52598 11.142C7.65354 11.27 7.81176 11.334 8.00065 11.334ZM7.33398 8.66732H8.66732V4.66732H7.33398V8.66732ZM8.00065 14.6673C7.07843 14.6673 6.21176 14.4922 5.40065 14.142C4.58954 13.7922 3.88398 13.3173 3.28398 12.7173C2.68398 12.1173 2.2091 11.4118 1.85932 10.6006C1.5091 9.78954 1.33398 8.92287 1.33398 8.00065C1.33398 7.07843 1.5091 6.21176 1.85932 5.40065C2.2091 4.58954 2.68398 3.88398 3.28398 3.28398C3.88398 2.68398 4.58954 2.20887 5.40065 1.85865C6.21176 1.50887 7.07843 1.33398 8.00065 1.33398C8.92287 1.33398 9.78954 1.50887 10.6006 1.85865C11.4118 2.20887 12.1173 2.68398 12.7173 3.28398C13.3173 3.88398 13.7922 4.58954 14.142 5.40065C14.4922 6.21176 14.6673 7.07843 14.6673 8.00065C14.6673 8.92287 14.4922 9.78954 14.142 10.6006C13.7922 11.4118 13.3173 12.1173 12.7173 12.7173C12.1173 13.3173 11.4118 13.7922 10.6006 14.142C9.78954 14.4922 8.92287 14.6673 8.00065 14.6673ZM8.00065 13.334C9.48954 13.334 10.7507 12.8173 11.784 11.784C12.8173 10.7507 13.334 9.48954 13.334 8.00065C13.334 6.51176 12.8173 5.25065 11.784 4.21732C10.7507 3.18398 9.48954 2.66732 8.00065 2.66732C6.51176 2.66732 5.25065 3.18398 4.21732 4.21732C3.18398 5.25065 2.66732 6.51176 2.66732 8.00065C2.66732 9.48954 3.18398 10.7507 4.21732 11.784C5.25065 12.8173 6.51176 13.334 8.00065 13.334Z" fill="%23D4362E"/>%0A</g>%0A</svg>%0A';

// src/assets/success.svg
var success_default = 'data:image/svg+xml,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M6.66667 13.3333C5.74444 13.3333 4.87778 13.1582 4.06667 12.808C3.25556 12.4582 2.55 11.9833 1.95 11.3833C1.35 10.7833 0.875111 10.0778 0.525333 9.26667C0.175111 8.45555 0 7.58889 0 6.66667C0 5.74444 0.175111 4.87778 0.525333 4.06667C0.875111 3.25556 1.35 2.55 1.95 1.95C2.55 1.35 3.25556 0.874889 4.06667 0.524667C4.87778 0.174889 5.74444 0 6.66667 0C7.38889 0 8.07222 0.105555 8.71667 0.316667C9.36111 0.527778 9.95555 0.822222 10.5 1.2L9.53333 2.18333C9.11111 1.91667 8.66111 1.70822 8.18333 1.558C7.70555 1.40822 7.2 1.33333 6.66667 1.33333C5.18889 1.33333 3.93067 1.85267 2.892 2.89133C1.85289 3.93044 1.33333 5.18889 1.33333 6.66667C1.33333 8.14444 1.85289 9.40289 2.892 10.442C3.93067 11.4807 5.18889 12 6.66667 12C8.14444 12 9.40289 11.4807 10.442 10.442C11.4807 9.40289 12 8.14444 12 6.66667C12 6.46667 11.9889 6.26667 11.9667 6.06667C11.9444 5.86667 11.9111 5.67222 11.8667 5.48333L12.95 4.4C13.0722 4.75556 13.1667 5.12222 13.2333 5.5C13.3 5.87778 13.3333 6.26667 13.3333 6.66667C13.3333 7.58889 13.1582 8.45555 12.808 9.26667C12.4582 10.0778 11.9833 10.7833 11.3833 11.3833C10.7833 11.9833 10.0778 12.4582 9.26667 12.808C8.45555 13.1582 7.58889 13.3333 6.66667 13.3333ZM5.73333 9.73333L2.9 6.9L3.83333 5.96667L5.73333 7.86667L12.4 1.18333L13.3333 2.11667L5.73333 9.73333Z" fill="%233C9718"/>%0A</svg>%0A';

// src/assets/close.svg
var close_default = 'data:image/svg+xml,<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M6.34425 7.398L1.27125 12.4713C1.13275 12.6096 0.958667 12.6804 0.749 12.6838C0.5395 12.6869 0.36225 12.6161 0.21725 12.4713C0.0724167 12.3263 0 12.1506 0 11.9443C0 11.7379 0.0724167 11.5623 0.21725 11.4173L5.2905 6.34425L0.21725 1.27125C0.0789167 1.13275 0.00808339 0.958667 0.00475006 0.749001C0.00158339 0.539501 0.0724167 0.36225 0.21725 0.21725C0.36225 0.0724167 0.537917 0 0.74425 0C0.950583 0 1.12625 0.0724167 1.27125 0.21725L6.34425 5.2905L11.4173 0.21725C11.5558 0.0789167 11.7298 0.00808339 11.9395 0.00475006C12.149 0.00158339 12.3263 0.0724167 12.4713 0.21725C12.6161 0.36225 12.6885 0.537917 12.6885 0.74425C12.6885 0.950584 12.6161 1.12625 12.4713 1.27125L7.398 6.34425L12.4713 11.4173C12.6096 11.5558 12.6804 11.7298 12.6838 11.9395C12.6869 12.149 12.6161 12.3263 12.4713 12.4713C12.3263 12.6161 12.1506 12.6885 11.9443 12.6885C11.7379 12.6885 11.5623 12.6161 11.4173 12.4713L6.34425 7.398Z" fill="%23212121"/>%0A</svg>%0A';

// src/assets/search.svg
var search_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_7433_74974" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_7433_74974)">%0A<path d="M7.14894 11.7119C5.86819 11.7119 4.78356 11.2677 3.89506 10.3794C3.00669 9.49087 2.5625 8.40625 2.5625 7.1255C2.5625 5.84475 3.00669 4.76012 3.89506 3.87162C4.78356 2.98325 5.86819 2.53906 7.14894 2.53906C8.42969 2.53906 9.51431 2.98325 10.4028 3.87162C11.2912 4.76012 11.7354 5.84475 11.7354 7.1255C11.7354 7.66112 11.6455 8.17269 11.4657 8.66019C11.2859 9.14769 11.0459 9.57169 10.7459 9.93219L15.0614 14.2477C15.1653 14.3514 15.2184 14.4819 15.2208 14.6392C15.2232 14.7964 15.1701 14.9294 15.0614 15.038C14.9528 15.1466 14.8211 15.2009 14.6662 15.2009C14.5114 15.2009 14.3797 15.1466 14.2711 15.038L9.95563 10.7225C9.58063 11.0321 9.14937 11.2744 8.66187 11.4494C8.17437 11.6244 7.67006 11.7119 7.14894 11.7119ZM7.14894 10.5871C8.11531 10.5871 8.93381 10.2517 9.60444 9.581C10.2752 8.91037 10.6106 8.09187 10.6106 7.1255C10.6106 6.15912 10.2752 5.34062 9.60444 4.67C8.93381 3.99925 8.11531 3.66387 7.14894 3.66387C6.18256 3.66387 5.36406 3.99925 4.69344 4.67C4.02269 5.34062 3.68731 6.15912 3.68731 7.1255C3.68731 8.09187 4.02269 8.91037 4.69344 9.581C5.36406 10.2517 6.18256 10.5871 7.14894 10.5871Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/components/atoms/TextInput/TextInput.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var TextInput = (0, import_react4.forwardRef)(({
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
  toggleIcon = visibility_on_default,
  toggleOffIcon = visibility_off_default,
  errorIcon = error_default,
  verifiedIcon = success_default,
  toggleIconSize = 18,
  statusIconSize = 16,
  isdCode = "+91",
  allowClear = false,
  onClear,
  prefix,
  suffix,
  showCount = false,
  onPressEnter,
  status: statusProp,
  variant = "outlined",
  size = "md",
  ...rest
}, ref) => {
  var _a, _b;
  const [error, setError] = (0, import_react4.useState)(null);
  const [verified, setVerified] = (0, import_react4.useState)(isVerified);
  const [showValue, setShowValue] = (0, import_react4.useState)(false);
  const [displayValue, setDisplayValue] = (0, import_react4.useState)(value || "");
  const [isFocused, setIsFocused] = (0, import_react4.useState)(false);
  const actualValueRef = (0, import_react4.useRef)(value || "");
  const inputRef = (0, import_react4.useRef)(null);
  (0, import_react4.useImperativeHandle)(ref, () => inputRef.current, []);
  const validationFunctions = {
    name: isAlphabetic,
    email: isValidEmail,
    mobile: (val) => isMobile(val, isdCode),
    businessPID: isPanNumber,
    businessAID: isAadhaar,
    businessTAN: (val) => isTAN(val.toUpperCase()),
    acknowledgementNumber: (val) => isAcknowledgementNumber(val.toUpperCase()),
    businessPassport: isIndianPassport,
    businessTIN: isIndianTIN,
    stdCode: isValidSTDCode,
    landline: isValidLandlineNumber,
    alphanumeric: isAlphanumeric,
    numeric: isNumeric,
    pincode: isPincode,
    entityName: isEntityName
  };
  const reactId = (0, import_react4.useId)();
  const inputId = (idProp == null ? void 0 : idProp.trim()) ? idProp : `text-input-${reactId}`;
  (0, import_react4.useEffect)(() => {
    actualValueRef.current = value || "";
    updateDisplayValue(value || "");
  }, [value]);
  (0, import_react4.useEffect)(() => {
    setVerified(isVerified);
  }, [isVerified]);
  (0, import_react4.useEffect)(() => {
    if (errorMessage && actualValueRef.current) {
      setError(errorMessage);
    } else if (!errorMessage) {
      setError(null);
    }
  }, [errorMessage]);
  const resolvedMaxLength = (0, import_react4.useMemo)(() => {
    if (maxLength !== void 0)
      return maxLength;
    switch (validation) {
      case "name":
        return 50;
      case "email":
        return 100;
      case "mobile": {
        if (isdCode === "+91") {
          return 10;
        }
        return 15;
      }
      case "businessPID":
        return 10;
      case "businessAID":
        return 12;
      case "businessTAN":
        return 10;
      case "businessPassport":
        return 8;
      case "businessTIN":
        return 20;
      case "acknowledgementNumber":
        return 20;
      case "stdCode":
        return 8;
      case "landline":
        return 15;
      case "numeric":
        return 200;
      case "alphanumeric":
        return 500;
      case "pincode":
        return 6;
      case "headerSearch":
        return 200;
      default:
        return 255;
    }
  }, [maxLength, validation, isdCode]);
  const maskValue = (val) => {
    if (!mask || !val)
      return val;
    try {
      const masker = new Masker(4, {
        maskChar: "*",
        maskFrom: "start",
        maskPattern: [1, 1],
        ...maskOptions
      });
      const maskedString = masker.maskString(val);
      if (validation === "businessAID") {
        return formatAadhaarDisplay(maskedString);
      }
      return maskedString;
    } catch (error2) {
      console.warn("Masking failed, showing plain text");
      return val;
    }
  };
  const normalizeSpaces = (value2) => {
    return value2.replace(/\s{2,}/g, " ");
  };
  const updateDisplayValue = (val) => {
    if (mask && !showValue && val) {
      setDisplayValue(maskValue(val));
    } else {
      setDisplayValue(formatDisplayValue(val));
    }
  };
  const removeAllSpaces = (input) => {
    return input.replace(/\s/g, "");
  };
  const trimSpaces = (input) => {
    return input.trim();
  };
  const formatAadhaarDisplay = (val) => {
    const cleaned = removeAllSpaces(val);
    if (cleaned.length <= 4)
      return cleaned;
    if (cleaned.length <= 8)
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)}`;
  };
  const formatDisplayValue = (val) => {
    if (validation === "custom") {
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
  const resolvePattern = (pattern2) => {
    if (!pattern2)
      return null;
    if (pattern2 instanceof RegExp)
      return pattern2;
    try {
      return new RegExp(pattern2);
    } catch (e) {
      console.warn("Invalid regex pattern:", pattern2);
      return null;
    }
  };
  const validateInput = (val) => {
    if (validation === "none" || validation === "headerSearch")
      return null;
    let cleanedVal = val;
    if (validation === "custom") {
      cleanedVal = trimSpaces(val);
    } else {
      cleanedVal = removeAllSpaces(val);
    }
    if (cleanedVal === "")
      return null;
    let isValid = false;
    const validatorFn = validationFunctions[validation];
    if (validatorFn) {
      if (validation === "entityName") {
        isValid = validatorFn(val);
      } else {
        isValid = validatorFn(cleanedVal);
      }
      if (!isValid) {
        if (validation === "mobile") {
          if (isdCode === "+91") {
            return errorMessage || "Invalid mobile number";
          } else {
            return errorMessage || "Invalid mobile number";
          }
        }
        if (validation === "businessAID")
          return errorMessage || "Invalid Aadhaar format";
        if (validation === "businessPID")
          return errorMessage || "Invalid PAN format";
        if (validation === "businessTAN")
          return errorMessage || "Invalid TAN format";
        if (validation === "businessPassport")
          return errorMessage || "Invalid Passport format";
        if (validation === "businessTIN")
          return errorMessage || "Invalid TIN format";
        if (validation === "acknowledgementNumber")
          return errorMessage || "Invalid Acknowledgement Number format";
        if (validation === "stdCode")
          return errorMessage || "Invalid STD code";
        if (validation === "landline")
          return errorMessage || "Invalid landline number";
        if (validation === "entityName")
          return errorMessage || "Invalid Entity Name";
        return errorMessage || `Invalid ${validation} format`;
      }
    } else if (validation === "custom" && pattern) {
      const regex = resolvePattern(pattern);
      if (!regex)
        return "Invalid pattern";
      isValid = regex.test(cleanedVal);
      if (!isValid)
        return errorMessage || "Invalid format";
    } else {
      return null;
    }
    if (showVerifiedStatus && isValid && cleanedVal !== "") {
      setVerified(true);
      onVerifiedChange == null ? void 0 : onVerifiedChange(true);
    } else if (showVerifiedStatus && !isValid) {
      setVerified(false);
      onVerifiedChange == null ? void 0 : onVerifiedChange(false);
    }
    return null;
  };
  const handleClipboardEvents = (e) => {
    if (disableClipboard) {
      e.preventDefault();
      return false;
    }
    return true;
  };
  const handleContextMenu = (e) => {
    if (disableClipboard) {
      e.preventDefault();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onPressEnter == null ? void 0 : onPressEnter(e);
    }
    if (disableClipboard) {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (isCtrlPressed) {
        const key = e.key.toLowerCase();
        if (key === "c" || key === "x" || key === "v") {
          e.preventDefault();
        }
      }
      if (e.key === "F10" || e.shiftKey && e.key === "F10") {
        e.preventDefault();
      }
    }
  };
  const handleClear = (e) => {
    var _a2;
    e.preventDefault();
    e.stopPropagation();
    if (disabled)
      return;
    actualValueRef.current = "";
    setDisplayValue("");
    setError(null);
    setShowValue(false);
    onChange == null ? void 0 : onChange("");
    onErrorChange == null ? void 0 : onErrorChange(null);
    onClear == null ? void 0 : onClear();
    (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
  };
  const handleChange = (e) => {
    if (disabled)
      return;
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
        onChange == null ? void 0 : onChange(newActual);
      } else if (inputWithoutSpaces.length > currentWithoutSpaces.length) {
        const newChars = inputWithoutSpaces.slice(currentWithoutSpaces.length);
        if ((validation === "mobile" || validation === "businessAID" || validation === "pincode" || validation === "numeric" || validation === "stdCode" || validation === "landline") && !/^\d+$/.test(newChars)) {
          return;
        }
        const newActual = (currentActual + newChars).slice(0, resolvedMaxLength);
        actualValueRef.current = newActual;
        updateDisplayValue(newActual);
        onChange == null ? void 0 : onChange(newActual);
      }
    } else {
      let cleanedInput = inputValue;
      if (validation === "name") {
        cleanedInput = normalizeSpaces(cleanedInput);
      } else if (validation === "alphanumeric" || validation === "none") {
        cleanedInput = normalizeSpaces(cleanedInput);
      } else if (validation === "custom") {
        cleanedInput = inputValue;
      } else {
        cleanedInput = removeAllSpaces(cleanedInput);
      }
      if ((validation === "businessAID" || validation === "pincode" || validation === "numeric" || validation === "stdCode" || validation === "landline") && cleanedInput && !/^\d+$/.test(cleanedInput)) {
        return;
      }
      if (validation === "businessTIN") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput))
          return;
        cleanedInput = cleanedInput.toUpperCase();
      }
      if (validation === "businessTAN") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput))
          return;
        cleanedInput = cleanedInput.toUpperCase();
      }
      if (validation === "acknowledgementNumber") {
        if (cleanedInput && !/^[a-zA-Z0-9]*$/.test(cleanedInput))
          return;
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
      onChange == null ? void 0 : onChange(actualValue);
    }
    if (showVerifiedStatus && verified) {
      setVerified(false);
      onVerifiedChange == null ? void 0 : onVerifiedChange(false);
    }
    const err = validateInput(actualValueRef.current);
    setError(err);
    onErrorChange == null ? void 0 : onErrorChange(err);
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
      onChange == null ? void 0 : onChange(normalized);
    }
    if (validation === "custom") {
      const trimmed = actualValueRef.current.trim();
      actualValueRef.current = trimmed;
      setDisplayValue(trimmed);
      actualValue = trimmed;
      onChange == null ? void 0 : onChange(trimmed);
    }
    const err = validateInput(actualValue);
    setError(err);
    onErrorChange == null ? void 0 : onErrorChange(err);
    if (mask && !showValue) {
      setDisplayValue(maskValue(actualValue));
    } else {
      setDisplayValue(formatDisplayValue(actualValue));
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const roundedStyle = rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px";
  const getInputType = () => {
    if (showValue)
      return "text";
    if (type === "password" && showToggleIcon)
      return "password";
    return type;
  };
  const hasValue = ((_a = displayValue == null ? void 0 : displayValue.trim()) != null ? _a : "") !== "";
  const resolvedStatus = statusProp != null ? statusProp : error ? "error" : verified ? "success" : void 0;
  const sizeConfig = {
    sm: {
      minHeight: 32,
      horizontalPadding: 10,
      addonPadding: 8,
      fontSize: "var(--text-small-size)"
    },
    md: {
      minHeight: 40,
      horizontalPadding: 12,
      addonPadding: 10,
      fontSize: "var(--text-body-size)"
    },
    lg: {
      minHeight: 48,
      horizontalPadding: 14,
      addonPadding: 12,
      fontSize: "var(--text-body-size)"
    }
  };
  const currentSize = sizeConfig[size];
  const shouldShowToggle = showToggleIcon && type === "password";
  const colors = {
    textPrimary: "var(--color-text-primary, #0D0D0D)",
    textSecondary: "var(--color-text-secondary, #757575)",
    bgSurface: "var(--color-bg-surface, #FFFFFF)",
    bgPage: "var(--color-bg-page, #F3F4F6)",
    borderDefault: "var(--color-border-default, #999999)",
    stateError: "var(--color-state-error, #DC3545)",
    stateWarning: "var(--color-state-warning, #FFC107)",
    stateSuccess: "var(--color-state-success, #28A745)"
  };
  const resolvedBorderColor = resolvedStatus === "error" ? colors.stateError : resolvedStatus === "warning" ? colors.stateWarning : resolvedStatus === "success" ? colors.stateSuccess : isFocused ? "var(--button-primary-focus-ring, #3B82F6)" : colors.borderDefault;
  const wrapperStyle = variant === "filled" ? {
    minHeight: currentSize.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: colors.bgPage,
    border: `1.5px solid ${resolvedBorderColor}`
  } : variant === "borderless" ? {
    minHeight: currentSize.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: "transparent",
    border: "1px solid transparent"
  } : variant === "underlined" ? {
    minHeight: currentSize.minHeight,
    borderRadius: 0,
    boxSizing: "border-box",
    backgroundColor: "transparent",
    border: "0 solid transparent",
    borderBottomWidth: 1.5,
    borderBottomColor: resolvedBorderColor
  } : {
    minHeight: currentSize.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: colors.bgSurface,
    border: `1.5px solid ${resolvedBorderColor}`
  };
  const resolvedSuffix = suffix !== void 0 ? suffix : type === "search" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon_default, { src: search_default, alt: "", width: 16, height: 16 }) : null;
  const hasRightAddons = Boolean(resolvedSuffix || allowClear && hasValue && !disabled || shouldShowToggle);
  const charCount = (_b = displayValue == null ? void 0 : displayValue.length) != null ? _b : 0;
  const countMax = validation === "businessAID" ? resolvedMaxLength + 2 : resolvedMaxLength;
  const fieldWrapperStyle = {
    ...wrapperStyle,
    display: "grid",
    alignItems: "center",
    overflow: "hidden",
    width: fullWidth ? "100%" : "auto",
    gridTemplateColumns: `${prefix ? "auto " : ""}minmax(0, 1fr)${hasRightAddons ? " auto" : ""}`,
    transition: "border-color 150ms, box-shadow 150ms, background-color 150ms"
  };
  const inputElementStyle = {
    height: currentSize.minHeight,
    fontSize: currentSize.fontSize,
    lineHeight: 1.5,
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
    paddingLeft: prefix ? 0 : currentSize.horizontalPadding,
    paddingRight: hasRightAddons ? 0 : currentSize.horizontalPadding
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `${fullWidth ? "w-full" : "inline-block"} ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "label",
      {
        htmlFor: inputId,
        className: "block text-[length:var(--text-secondary-size)] font-medium text-[var(--color-text-primary)] mb-2",
        style: {
          color: disabled ? colors.textSecondary : colors.textPrimary,
          cursor: disabled ? "not-allowed" : void 0
        },
        children: [
          label,
          required && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-[var(--color-state-error)] ml-0.5", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: [
          disabled ? "opacity-50 cursor-not-allowed" : "",
          borderColorClass
        ].join(" "),
        style: fieldWrapperStyle,
        children: [
          prefix && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "stretch",
                flexShrink: 0,
                color: colors.textSecondary,
                paddingLeft: currentSize.addonPadding,
                paddingRight: currentSize.addonPadding
              },
              children: prefix
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "input",
            {
              ref: inputRef,
              id: inputId,
              type: getInputType(),
              disabled,
              value: displayValue,
              onChange: handleChange,
              onFocus: handleFocus,
              onBlur: handleBlur,
              onCopy: handleClipboardEvents,
              onCut: handleClipboardEvents,
              onPaste: handleClipboardEvents,
              onContextMenu: handleContextMenu,
              onKeyDown: handleKeyDown,
              maxLength: validation === "businessAID" ? resolvedMaxLength + 2 : resolvedMaxLength,
              "aria-label": ariaLabel || label,
              "aria-invalid": resolvedStatus === "error",
              "aria-required": required,
              placeholder,
              className: "disabled:cursor-not-allowed",
              style: inputElementStyle,
              ...rest
            }
          ),
          hasRightAddons && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                alignSelf: "stretch",
                flexShrink: 0,
                height: "100%"
              },
              children: [
                resolvedSuffix && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "stretch",
                      flexShrink: 0,
                      color: colors.textSecondary,
                      paddingLeft: currentSize.addonPadding,
                      paddingRight: currentSize.addonPadding
                    },
                    children: resolvedSuffix
                  }
                ),
                allowClear && hasValue && !disabled && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: handleClear,
                    className: "shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                    style: {
                      all: "unset",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      minWidth: currentSize.minHeight,
                      paddingLeft: currentSize.addonPadding,
                      paddingRight: currentSize.addonPadding,
                      boxSizing: "border-box",
                      cursor: "pointer",
                      color: "inherit",
                      flexShrink: 0
                    },
                    "aria-label": "Clear",
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon_default, { src: close_default, alt: "", height: 14, width: 14, "aria-hidden": true })
                  }
                ),
                shouldShowToggle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: handleToggleVisibility,
                    className: "shrink-0 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                    style: {
                      all: "unset",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      minWidth: currentSize.minHeight,
                      paddingLeft: currentSize.addonPadding,
                      paddingRight: currentSize.addonPadding,
                      boxSizing: "border-box",
                      cursor: "pointer",
                      color: "inherit",
                      flexShrink: 0
                    },
                    "aria-label": showValue ? "Hide value" : "Show value",
                    tabIndex: disabled ? -1 : 0,
                    disabled,
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      Icon_default,
                      {
                        src: showValue ? toggleOffIcon : toggleIcon,
                        alt: showValue ? "Hide" : "Show",
                        height: toggleIconSize,
                        width: toggleIconSize
                      }
                    )
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    (showCount || showVerifiedStatus || error) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 12,
          marginTop: 6,
          flexWrap: "wrap"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                minWidth: 0
              },
              children: [
                showVerifiedStatus && verified && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "var(--text-small-size, 12px)",
                      color: colors.stateSuccess
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon_default, { src: verifiedIcon, alt: "", height: statusIconSize, width: statusIconSize, "aria-hidden": true }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Verified" })
                    ]
                  }
                ),
                error && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "var(--text-small-size, 12px)",
                      color: colors.stateError
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon_default, { src: errorIcon, alt: "", height: statusIconSize, width: statusIconSize, "aria-hidden": true }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: error })
                    ]
                  }
                )
              ]
            }
          ),
          showCount && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "span",
            {
              style: {
                fontSize: "var(--text-small-size, 12px)",
                color: colors.textSecondary,
                flexShrink: 0
              },
              children: [
                charCount,
                " / ",
                countMax
              ]
            }
          )
        ]
      }
    )
  ] });
});
var TextInput_default = TextInput;

// src/components/atoms/Checkbox/index.tsx
var import_react5 = __toESM(require("react"));

// src/components/atoms/Checkbox/Checkbox.config.ts
var defaultCheckboxColorClass = "w-5 h-5 rounded-base border-[1.5px] border-[var(--color-border-default)] checked:bg-[var(--color-brand-primary)] checked:border-[var(--color-brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--button-primary-focus-ring)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
var defaultLabelColorClass = "text-body text-text-primary cursor-pointer";
var defaultCheckboxInputLabelSpacing = "mr-2";

// src/components/atoms/Checkbox/Checkbox.utils.ts
function cls2(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/atoms/Checkbox/index.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var Checkbox = import_react5.default.memo(function Checkbox2({
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "label",
    {
      htmlFor: checkboxId,
      className: cls2(className),
      style: wrapperStyle,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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

// src/components/atoms/Switch/index.tsx
var import_react6 = __toESM(require("react"));
var import_jsx_runtime5 = require("react/jsx-runtime");
function cls3(...parts) {
  return parts.filter(Boolean).join(" ");
}
var COLORS = {
  trackOff: "var(--color-mist-80, #e0e0e0)",
  trackOn: "var(--color-theme-primary, var(--color-brand-primary, #0d0d0d))",
  thumb: "var(--color-bg-surface, #ffffff)",
  border: "var(--color-border-default, #999999)",
  text: "var(--color-text-primary, #0d0d0d)",
  textMuted: "var(--color-text-secondary, #757575)"
};
var SIZE_STYLES = {
  sm: {
    track: { width: 40, height: 22, padding: 2, thumb: 18 },
    hitPadding: 8
  },
  md: {
    track: { width: 48, height: 28, padding: 3, thumb: 22 },
    hitPadding: 8
  }
};
var Switch = import_react6.default.memo(function Switch2({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  id: idProp,
  name,
  value = "on",
  uncheckedValue = "off",
  label,
  labelPosition = "end",
  "aria-label": ariaLabel,
  className,
  switchClassName,
  size = "md"
}) {
  const reactId = (0, import_react6.useId)();
  const switchId = idProp != null ? idProp : `switch-${reactId.replace(/:/g, "")}`;
  const labelId = `${switchId}-label`;
  const isControlled = checkedProp !== void 0;
  const [internalChecked, setInternalChecked] = (0, import_react6.useState)(defaultChecked);
  const checked = isControlled ? Boolean(checkedProp) : internalChecked;
  const setChecked = (0, import_react6.useCallback)(
    (next) => {
      if (!isControlled) {
        setInternalChecked(next);
      }
      onCheckedChange == null ? void 0 : onCheckedChange(next);
    },
    [isControlled, onCheckedChange]
  );
  const toggle = (0, import_react6.useCallback)(() => {
    if (disabled)
      return;
    setChecked(!checked);
  }, [checked, disabled, setChecked]);
  const s = SIZE_STYLES[size];
  const { width: tw, height: th, padding: pad, thumb: thumbSize } = s.track;
  const thumbTravel = tw - thumbSize - pad * 2;
  const thumbX = checked ? thumbTravel : 0;
  const hasVisibleLabel = label != null && label !== false;
  const trackStyle = (0, import_react6.useMemo)(
    () => ({
      position: "relative",
      width: tw,
      height: th,
      borderRadius: 9999,
      backgroundColor: checked ? COLORS.trackOn : COLORS.trackOff,
      border: `1px solid ${checked ? "transparent" : COLORS.border}`,
      transition: "background-color 160ms ease, border-color 160ms ease",
      flexShrink: 0
    }),
    [checked, th, tw]
  );
  const thumbStyle = (0, import_react6.useMemo)(
    () => ({
      position: "absolute",
      left: pad,
      top: pad,
      width: thumbSize,
      height: thumbSize,
      borderRadius: "50%",
      backgroundColor: COLORS.thumb,
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      transform: `translateX(${thumbX}px)`,
      transition: "transform 160ms ease"
    }),
    [pad, thumbSize, thumbX]
  );
  const buttonStyle = (0, import_react6.useMemo)(
    () => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: s.hitPadding,
      margin: 0,
      minWidth: tw + s.hitPadding * 2,
      minHeight: th + s.hitPadding * 2,
      border: "none",
      background: "transparent",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      borderRadius: "var(--radius-lg, 8px)",
      boxSizing: "border-box"
    }),
    [disabled, s.hitPadding, th, tw]
  );
  const labelStyle = {
    color: disabled ? COLORS.textMuted : COLORS.text,
    fontSize: "var(--text-body-size, 16px)",
    lineHeight: 1.5,
    userSelect: "none",
    cursor: disabled ? "not-allowed" : "pointer"
  };
  const switchEl = /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "button",
    {
      type: "button",
      id: switchId,
      role: "switch",
      "aria-checked": checked,
      "aria-disabled": disabled,
      disabled,
      "aria-label": hasVisibleLabel ? void 0 : ariaLabel != null ? ariaLabel : "Toggle",
      className: cls3("ucs-switch__control", switchClassName),
      style: buttonStyle,
      onClick: toggle,
      "data-state": checked ? "checked" : "unchecked",
      "data-disabled": disabled ? "" : void 0,
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { "aria-hidden": true, style: trackStyle, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { style: thumbStyle }) })
    }
  );
  const labelEl = hasVisibleLabel ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { id: labelId, htmlFor: switchId, style: labelStyle, children: label }) : null;
  const rowStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-2, 8px)",
    maxWidth: "100%"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: cls3("ucs-switch", className), style: rowStyle, children: [
    name ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "hidden", name, value: checked ? value : uncheckedValue, readOnly: true, "aria-hidden": true }) : null,
    hasVisibleLabel && labelPosition === "start" ? labelEl : null,
    switchEl,
    hasVisibleLabel && labelPosition === "end" ? labelEl : null
  ] });
});
Switch.displayName = "Switch";
var Switch_default = Switch;

// src/components/atoms/Badge/index.tsx
var import_react7 = __toESM(require("react"));
var import_jsx_runtime6 = require("react/jsx-runtime");
function cls4(...parts) {
  return parts.filter(Boolean).join(" ");
}
function DismissIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "svg",
    {
      className: "ds-badge__dismiss-icon",
      viewBox: "0 0 16 16",
      width: 16,
      height: 16,
      "aria-hidden": true,
      focusable: "false",
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "path",
        {
          fill: "currentColor",
          d: "M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 1 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06Z"
        }
      )
    }
  );
}
var Badge = import_react7.default.memo(function Badge2({
  children,
  variant = "neutral",
  tone = "soft",
  shape = "rounded",
  size = "sm",
  elevated = false,
  dot = false,
  icon,
  onDismiss,
  dismissLabel = "Remove",
  className,
  onClick,
  ...rest
}) {
  const handleDismiss = (0, import_react7.useCallback)(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDismiss == null ? void 0 : onDismiss();
    },
    [onDismiss]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "span",
    {
      className: cls4("ds-badge", className),
      "data-variant": variant,
      "data-tone": tone,
      "data-shape": shape,
      "data-size": size,
      "data-elevated": elevated ? "true" : void 0,
      onClick,
      ...rest,
      children: [
        dot ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "ds-badge__dot", "aria-hidden": true }) : null,
        icon ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "ds-badge__icon", children: icon }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "ds-badge__label", children }),
        onDismiss ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "button",
          {
            type: "button",
            className: "ds-badge__dismiss",
            "aria-label": dismissLabel,
            onClick: handleDismiss,
            children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(DismissIcon, {})
          }
        ) : null
      ]
    }
  );
});
var Badge_default = Badge;
var Chip = Badge;
var Tag = Badge;

// src/components/atoms/RadioGroup/RadioGroup.config.ts
var defaultRadioColorClass = "accent-primary";
var defaultLabelColorClass2 = "title-2";

// src/components/atoms/RadioGroup/RadioGroup.utils.ts
function cls5(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/atoms/RadioGroup/index.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var RadioButton = ({
  label,
  subLabel,
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
  radioColorClass = defaultRadioColorClass,
  labelColorClass = defaultLabelColorClass2,
  itemMarginClass,
  tabIndex,
  shape = "default",
  rounded = "3",
  withShadow = false
}) => {
  const isBox = shape === "box";
  const id = `${name}-${value}`;
  const colors = {
    brand: "var(--color-brand-primary, #0D0D0D)",
    textPrimary: "var(--color-text-primary, #0D0D0D)",
    textSecondary: "var(--color-text-secondary, #757575)",
    bgSurface: "var(--color-bg-surface, #FFFFFF)",
    borderDefault: "var(--color-border-default, #999999)",
    accentLavender: "var(--color-accent-lavender-10, #EEE7FF)",
    shadow: "var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08))"
  };
  const roundedStyle = rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : rounded === "5" ? "var(--radius-lg, 8px)" : "9999px";
  const wrapperStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    width: isBox ? "100%" : void 0,
    minWidth: isBox ? "160px" : void 0,
    padding: isBox ? "12px" : 0,
    border: isBox ? `1.5px solid ${checked ? colors.brand : colors.borderDefault}` : "none",
    borderRadius: isBox ? roundedStyle : void 0,
    backgroundColor: isBox ? checked ? colors.accentLavender : colors.bgSurface : "transparent",
    boxShadow: isBox && withShadow && !disabled ? colors.shadow : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? "none" : "auto"
  };
  const inputStyle = {
    flexShrink: 0,
    width: 16,
    height: 16,
    margin: "2px 0 0 0",
    accentColor: colors.brand,
    cursor: disabled ? "not-allowed" : "pointer"
  };
  const labelStyle = {
    color: disabled ? colors.textSecondary : colors.textPrimary,
    lineHeight: 1.5,
    whiteSpace: "normal",
    wordBreak: "break-word"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "label",
    {
      htmlFor: id,
      className: cls5(itemMarginClass),
      style: wrapperStyle,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "input",
          {
            id,
            className: cls5(radioColorClass),
            type: "radio",
            name,
            value,
            checked,
            disabled,
            onChange,
            tabIndex,
            style: inputStyle
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { style: { display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "span",
            {
              className: cls5(labelColorClass),
              style: labelStyle,
              children: label
            }
          ),
          subLabel && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            TextView_default,
            {
              as: "small",
              style: {
                marginTop: 4,
                color: colors.textSecondary,
                fontStyle: "italic"
              },
              children: subLabel
            }
          )
        ] })
      ]
    }
  );
};
var RadioGroup = ({
  options,
  name,
  selectedValue,
  onChange,
  layout = "vertical",
  columns = 3,
  minWidth = "160px",
  gap = "12px",
  radioColorClass,
  labelColorClass,
  ariaLabelledBy
}) => {
  const labelledById = ariaLabelledBy != null ? ariaLabelledBy : `${name}-label`;
  const fixedGridStyle = layout === "grid" ? {
    display: "grid",
    gap,
    gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`
  } : {};
  const autoGridStyle = layout === "grid-auto" ? {
    display: "grid",
    gap,
    gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`
  } : {};
  const finalStyle = {
    display: layout === "vertical" ? "flex" : layout === "horizontal" ? "flex" : void 0,
    flexDirection: layout === "vertical" ? "column" : layout === "horizontal" ? "row" : void 0,
    alignItems: layout === "horizontal" ? "flex-start" : void 0,
    gap: layout === "horizontal" ? gap : void 0,
    ...fixedGridStyle,
    ...autoGridStyle
  };
  const itemMarginClass = "";
  const hasCheckedValue = options.some((opt) => opt.value === selectedValue);
  const firstEnabledIndex = options.findIndex((opt) => !opt.disabled);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "fieldset",
    {
      className: "",
      style: finalStyle,
      "aria-labelledby": labelledById,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("legend", { id: labelledById, className: "visually-hidden", children: name }),
        options.map((opt, index) => {
          var _a;
          const isChecked = selectedValue === opt.value;
          let tabIndex = -1;
          if (isChecked) {
            tabIndex = 0;
          } else if (!hasCheckedValue && index === firstEnabledIndex) {
            tabIndex = 0;
          }
          return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            RadioButton,
            {
              name,
              label: opt.label,
              subLabel: opt.subLabel,
              value: opt.value,
              checked: isChecked,
              onChange: () => onChange(opt.value),
              radioColorClass,
              labelColorClass,
              itemMarginClass,
              shape: opt.shape,
              rounded: opt.rounded,
              withShadow: opt.withShadow,
              disabled: (_a = opt.disabled) != null ? _a : false,
              tabIndex
            },
            opt.value
          );
        })
      ]
    }
  );
};
var RadioGroup_default = RadioGroup;

// src/components/molecules/Form/index.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function cx(...values) {
  return values.filter(Boolean).join(" ");
}
function Form({
  badge,
  title,
  description,
  children,
  actions,
  footer,
  layout = "stacked",
  columns = 2,
  gap = 18,
  maxWidth = 520,
  shellClassName = "",
  cardClassName = "",
  contentClassName = "",
  fieldsClassName = "",
  shellStyle,
  cardStyle,
  contentStyle,
  fieldsStyle,
  className = "",
  style,
  ...rest
}) {
  const resolvedShellStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--space-4) var(--space-2)",
    boxSizing: "border-box",
    ...shellStyle
  };
  const resolvedCardStyle = {
    width: "100%",
    maxWidth,
    borderRadius: "var(--radius-card)",
    border: "1px solid var(--color-border-default)",
    background: "var(--color-bg-surface, #FFFFFF)",
    boxShadow: "var(--shadow-lg)",
    padding: "var(--space-4)",
    boxSizing: "border-box",
    ...cardStyle,
    ...style
  };
  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "var(--space-1) var(--space-2)",
    borderRadius: 9999,
    background: "var(--color-accent-lavender-10, #EEE7FF)",
    color: "var(--color-brand-link, #002475)",
    fontSize: "var(--text-small-size)",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase"
  };
  const titleStyle = {
    margin: "var(--space-3) 0 var(--space-1)",
    color: "var(--color-text-primary, #0D0D0D)",
    fontSize: "clamp(var(--text-h2-size), 4vw, var(--text-h1-size))",
    lineHeight: "var(--text-h1-line-height)",
    fontWeight: 800
  };
  const descriptionStyle = {
    margin: 0,
    color: "var(--color-text-secondary, #757575)",
    fontSize: "var(--text-body-size)",
    lineHeight: "var(--text-body-line-height)"
  };
  const resolvedContentStyle = {
    marginTop: "var(--space-4)",
    display: "flex",
    flexDirection: "column",
    gap,
    ...contentStyle
  };
  const resolvedFieldsStyle = layout === "grid" ? {
    display: "grid",
    gridTemplateColumns: `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
    gap,
    alignItems: "start",
    ...fieldsStyle
  } : {
    display: "flex",
    flexDirection: "column",
    gap,
    ...fieldsStyle
  };
  const resolvedActionsStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-2)"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("section", { className: cx(shellClassName), style: resolvedShellStyle, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "div",
    {
      className: cx(cardClassName),
      style: resolvedCardStyle,
      children: [
        (badge || title || description) && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("header", { children: [
          badge && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { style: badgeStyle, children: badge }),
          title && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h1", { style: titleStyle, children: title }),
          description && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { style: descriptionStyle, children: description })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "form",
          {
            ...rest,
            className: cx(contentClassName, className),
            style: resolvedContentStyle,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: cx(fieldsClassName), style: resolvedFieldsStyle, children }),
              (actions || footer) && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { style: resolvedActionsStyle, children: [
                actions,
                footer
              ] })
            ]
          }
        )
      ]
    }
  ) });
}

// src/components/molecules/Grid/index.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function toCssSize(value, fallback) {
  if (value === void 0)
    return fallback;
  return typeof value === "number" ? `${value}px` : value;
}
function GridItem({
  span = 1,
  rowSpan = 1,
  style,
  children,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "div",
    {
      ...rest,
      style: {
        minWidth: 0,
        gridColumn: `span ${Math.max(1, span)} / span ${Math.max(1, span)}`,
        gridRow: `span ${Math.max(1, rowSpan)} / span ${Math.max(1, rowSpan)}`,
        ...style
      },
      children
    }
  );
}
function Grid({
  columns = 2,
  gap = 16,
  minItemWidth = 240,
  alignItems = "stretch",
  justifyItems = "stretch",
  autoFit = false,
  fullWidth = true,
  style,
  children,
  ...rest
}) {
  const gapValue = toCssSize(gap, "16px");
  const minWidthValue = toCssSize(minItemWidth, "240px");
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "div",
    {
      ...rest,
      style: {
        display: "grid",
        width: fullWidth ? "100%" : "auto",
        minWidth: 0,
        gap: gapValue,
        alignItems,
        justifyItems,
        gridTemplateColumns: autoFit ? `repeat(auto-fit, minmax(${minWidthValue}, 1fr))` : `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
        ...style
      },
      children
    }
  );
}

// src/components/molecules/Breadcrumb/index.tsx
var import_react8 = __toESM(require("react"));
var import_jsx_runtime10 = require("react/jsx-runtime");
function cls6(...parts) {
  return parts.filter(Boolean).join(" ");
}
var Breadcrumb = import_react8.default.memo(function Breadcrumb2({
  ariaLabel = "Breadcrumb",
  separator = "slash",
  size = "sm",
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "nav",
    {
      "aria-label": ariaLabel,
      className: cls6("ds-breadcrumb", className),
      "data-separator": separator,
      "data-size": size,
      ...rest,
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ol", { className: "ds-breadcrumb__list", children })
    }
  );
});
var BreadcrumbItem = import_react8.default.memo(function BreadcrumbItem2({
  href,
  current = false,
  children,
  className,
  linkProps,
  ...liRest
}) {
  const hasHref = typeof href === "string" && href.length > 0;
  const isNavigable = hasHref && !current;
  if (isNavigable) {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("li", { className: cls6("ds-breadcrumb__item", className), ...liRest, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { href, className: "ds-breadcrumb__link", ...linkProps, children }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "li",
    {
      className: cls6("ds-breadcrumb__item", "ds-breadcrumb__item--current", className),
      "aria-current": "page",
      ...liRest,
      children: hasHref ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "a",
        {
          href,
          className: "ds-breadcrumb__link ds-breadcrumb__link--current",
          "aria-current": "page",
          ...linkProps,
          children
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "ds-breadcrumb__text", children })
    }
  );
});

// src/components/molecules/Tabs/index.tsx
var import_react9 = __toESM(require("react"));
var import_jsx_runtime11 = require("react/jsx-runtime");
function cls7(...parts) {
  return parts.filter(Boolean).join(" ");
}
function toCssLength(v) {
  if (v === void 0)
    return void 0;
  return typeof v === "number" ? `${v}px` : v;
}
var TabsContext = (0, import_react9.createContext)(null);
function useTabsContext(component) {
  const ctx = (0, import_react9.useContext)(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Tabs>`);
  }
  return ctx;
}
var Tabs = import_react9.default.memo(function Tabs2({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  orientation = "horizontal",
  variant = "line",
  size = "md",
  listLayout = "wrap",
  activationMode = "automatic",
  contentAnimation = "fade",
  dividerColor,
  dividerWidth,
  indicatorColor,
  indicatorWidth,
  inactiveTextColor,
  activeTextColor,
  tabFontSize,
  triggerLayout = "inline",
  triggerAlign = "center",
  id: idProp,
  className,
  children,
  style,
  ...rest
}) {
  const reactId = (0, import_react9.useId)();
  const baseId = idProp != null ? idProp : `tabs-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = (0, import_react9.useState)(defaultValue);
  const value = isControlled ? valueProp : inner;
  const setValue = (0, import_react9.useCallback)(
    (next) => {
      if (!isControlled) {
        setInner(next);
      }
      onValueChange == null ? void 0 : onValueChange(next);
    },
    [isControlled, onValueChange]
  );
  const cssVars = (0, import_react9.useMemo)(() => {
    const dw = toCssLength(dividerWidth);
    const iw = toCssLength(indicatorWidth);
    const tf = toCssLength(tabFontSize);
    return {
      ...dividerColor != null && { "--tabs-divider-color": dividerColor },
      ...dw != null && { "--tabs-divider-width": dw },
      ...indicatorColor != null && { "--tabs-indicator-color": indicatorColor },
      ...iw != null && { "--tabs-indicator-width": iw },
      ...inactiveTextColor != null && { "--tabs-text-inactive": inactiveTextColor },
      ...activeTextColor != null && { "--tabs-text-active": activeTextColor },
      ...tf != null && { "--tabs-font-size": tf }
    };
  }, [
    dividerColor,
    dividerWidth,
    indicatorColor,
    indicatorWidth,
    inactiveTextColor,
    activeTextColor,
    tabFontSize
  ]);
  const ctx = (0, import_react9.useMemo)(
    () => ({
      value,
      setValue,
      baseId,
      orientation,
      variant,
      size,
      listLayout,
      activationMode,
      triggerLayout,
      triggerAlign
    }),
    [
      value,
      setValue,
      baseId,
      orientation,
      variant,
      size,
      listLayout,
      activationMode,
      triggerLayout,
      triggerAlign
    ]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(TabsContext.Provider, { value: ctx, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "div",
    {
      className: cls7("ds-tabs", className),
      "data-orientation": orientation,
      "data-variant": variant,
      "data-size": size,
      "data-list-layout": listLayout,
      "data-content-animation": contentAnimation,
      "data-activation-mode": activationMode,
      "data-trigger-layout": triggerLayout,
      "data-trigger-align": triggerAlign,
      style: { ...cssVars, ...style },
      ...rest,
      children
    }
  ) });
});
function getAllTabButtons(listEl) {
  if (!listEl)
    return [];
  return Array.from(listEl.querySelectorAll('[role="tab"]'));
}
var TabsList = import_react9.default.memo(function TabsList2({
  ariaLabel,
  className,
  children,
  onKeyDown,
  ...rest
}) {
  const ctx = useTabsContext("TabsList");
  const listRef = (0, import_react9.useRef)(null);
  const [segmentPill, setSegmentPill] = (0, import_react9.useState)({ left: 0, top: 0, width: 0, height: 0, visible: false });
  const updateSegmentPill = (0, import_react9.useCallback)(() => {
    const list = listRef.current;
    if (!list || ctx.variant !== "segmented")
      return;
    const active = list.querySelector('[role="tab"][aria-selected="true"]');
    if (!active || active.getAttribute("data-disabled") === "true") {
      setSegmentPill((p) => ({ ...p, visible: false }));
      return;
    }
    const lr = list.getBoundingClientRect();
    const tr = active.getBoundingClientRect();
    setSegmentPill({
      left: tr.left - lr.left,
      top: tr.top - lr.top,
      width: tr.width,
      height: tr.height,
      visible: true
    });
  }, [ctx.variant]);
  (0, import_react9.useLayoutEffect)(() => {
    updateSegmentPill();
  }, [updateSegmentPill, ctx.value, children]);
  (0, import_react9.useLayoutEffect)(() => {
    if (ctx.variant !== "segmented" || !listRef.current)
      return;
    const list = listRef.current;
    const ro = new ResizeObserver(() => updateSegmentPill());
    ro.observe(list);
    const onScrollOrResize = () => updateSegmentPill();
    list.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      ro.disconnect();
      list.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [ctx.variant, updateSegmentPill]);
  const handleKeyDown = (0, import_react9.useCallback)(
    (e) => {
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      const tabs = getAllTabButtons(listRef.current);
      if (tabs.length === 0)
        return;
      const n = tabs.length;
      const active = document.activeElement;
      let idx = tabs.indexOf(active);
      if (idx < 0) {
        idx = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      }
      if (idx < 0)
        idx = 0;
      const horizontal = ctx.orientation === "horizontal";
      const forwardKey = horizontal ? "ArrowRight" : "ArrowDown";
      const backKey = horizontal ? "ArrowLeft" : "ArrowUp";
      const focusAt = (i) => {
        const t = tabs[i];
        if (!t || t.disabled)
          return;
        t.focus();
        const v = t.dataset.tabValue;
        if (v && ctx.activationMode === "automatic")
          ctx.setValue(v);
      };
      const step = (delta) => {
        if (n === 0)
          return;
        let i = idx;
        for (let k = 0; k < n; k++) {
          i = (i + delta + n) % n;
          if (!tabs[i].disabled) {
            focusAt(i);
            return;
          }
        }
      };
      if (e.key === forwardKey) {
        e.preventDefault();
        step(1);
        return;
      }
      if (e.key === backKey) {
        e.preventDefault();
        step(-1);
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        for (let i = 0; i < n; i++) {
          if (!tabs[i].disabled) {
            focusAt(i);
            return;
          }
        }
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        for (let i = n - 1; i >= 0; i--) {
          if (!tabs[i].disabled) {
            focusAt(i);
            return;
          }
        }
      }
    },
    [ctx, onKeyDown]
  );
  const showSegmentPill = ctx.variant === "segmented";
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    "div",
    {
      ref: listRef,
      role: "tablist",
      "aria-label": ariaLabel,
      "aria-orientation": ctx.orientation,
      "data-list-layout": ctx.listLayout,
      className: cls7("ds-tabs__list", showSegmentPill && "ds-tabs__list--segmented", className),
      onKeyDown: handleKeyDown,
      ...rest,
      children: [
        showSegmentPill ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          "span",
          {
            className: "ds-tabs__segment-pill",
            "aria-hidden": "true",
            style: {
              left: segmentPill.left,
              top: segmentPill.top,
              width: segmentPill.width,
              height: segmentPill.height,
              opacity: segmentPill.visible ? 1 : 0
            }
          }
        ) : null,
        children
      ]
    }
  );
});
var TabsTrigger = import_react9.default.memo(function TabsTrigger2({
  value,
  children,
  icon,
  className,
  disabled = false,
  type = "button",
  triggerLayout: triggerLayoutProp,
  triggerAlign: triggerAlignProp,
  onClick,
  onKeyDown,
  ...rest
}) {
  const ctx = useTabsContext("TabsTrigger");
  const selected = ctx.value === value;
  const tabId = `${ctx.baseId}-tab-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;
  const triggerLayout = triggerLayoutProp != null ? triggerLayoutProp : ctx.triggerLayout;
  const triggerAlign = triggerAlignProp != null ? triggerAlignProp : ctx.triggerAlign;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    "button",
    {
      ...rest,
      type,
      role: "tab",
      id: tabId,
      className: cls7("ds-tabs__trigger", icon != null ? "ds-tabs__trigger--with-icon" : void 0, className),
      "data-trigger-layout": triggerLayout,
      "data-trigger-align": triggerAlign,
      "aria-selected": selected,
      "aria-controls": panelId,
      tabIndex: selected ? 0 : -1,
      "data-state": selected ? "active" : "inactive",
      "data-tab-value": value,
      "data-disabled": disabled ? "true" : void 0,
      disabled,
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.defaultPrevented || disabled)
          return;
        if (ctx.activationMode === "manual" && (e.key === "Enter" || e.key === " " || e.code === "Space")) {
          e.preventDefault();
          ctx.setValue(value);
        }
      },
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        if (!disabled)
          ctx.setValue(value);
      },
      children: [
        icon != null ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "ds-tabs__trigger-icon", "aria-hidden": true, children: icon }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "ds-tabs__trigger-text", children })
      ]
    }
  );
});
var TabsContent = import_react9.default.memo(function TabsContent2({
  value,
  children,
  className,
  forceMount = false,
  ...rest
}) {
  const ctx = useTabsContext("TabsContent");
  const selected = ctx.value === value;
  if (!forceMount && !selected) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "div",
    {
      ...rest,
      role: "tabpanel",
      id: `${ctx.baseId}-panel-${value}`,
      "aria-labelledby": `${ctx.baseId}-tab-${value}`,
      className: cls7("ds-tabs__panel", className),
      "data-state": selected ? "active" : "inactive",
      "data-value": value,
      hidden: !selected,
      tabIndex: selected ? 0 : -1,
      children
    }
  );
});

// src/components/molecules/Accordion/index.tsx
var import_react10 = __toESM(require("react"));
var import_jsx_runtime12 = require("react/jsx-runtime");
function cls8(...parts) {
  return parts.filter(Boolean).join(" ");
}
var AccordionContext = (0, import_react10.createContext)(null);
function useAccordionContext(component) {
  const ctx = (0, import_react10.useContext)(AccordionContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Accordion>`);
  }
  return ctx;
}
var AccordionItemContext = (0, import_react10.createContext)(null);
function useAccordionItemContext(component) {
  const ctx = (0, import_react10.useContext)(AccordionItemContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <AccordionItem>`);
  }
  return ctx;
}
function normalizeSingleValue(v) {
  if (v === void 0)
    return void 0;
  if (Array.isArray(v))
    return v[0];
  return v;
}
function normalizeMultipleValue(v) {
  if (v === void 0)
    return [];
  if (Array.isArray(v))
    return v;
  return [v];
}
var Accordion = import_react10.default.memo(function Accordion2({
  children,
  type = "single",
  collapsible = true,
  value: valueProp,
  defaultValue,
  onValueChange,
  variant = "default",
  motion = "default",
  className,
  ...rest
}) {
  const reactId = (0, import_react10.useId)();
  const baseId = `accordion-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = (0, import_react10.useState)(() => {
    if (defaultValue !== void 0)
      return defaultValue;
    if (type === "multiple")
      return [];
    return void 0;
  });
  const value = isControlled ? valueProp : inner;
  const valueRef = (0, import_react10.useRef)(value);
  valueRef.current = value;
  const setValue = (0, import_react10.useCallback)(
    (next) => {
      if (!isControlled) {
        setInner(next);
      }
      onValueChange == null ? void 0 : onValueChange(next);
    },
    [isControlled, onValueChange]
  );
  const isOpen = (0, import_react10.useCallback)(
    (itemValue) => {
      if (type === "single") {
        return normalizeSingleValue(value) === itemValue;
      }
      return normalizeMultipleValue(value).includes(itemValue);
    },
    [type, value]
  );
  const toggle = (0, import_react10.useCallback)(
    (itemValue) => {
      const v = valueRef.current;
      if (type === "single") {
        const current = normalizeSingleValue(v);
        if (current === itemValue) {
          if (collapsible)
            setValue(void 0);
        } else {
          setValue(itemValue);
        }
      } else {
        const arr = normalizeMultipleValue(v);
        const i = arr.indexOf(itemValue);
        if (i >= 0) {
          arr.splice(i, 1);
        } else {
          arr.push(itemValue);
        }
        setValue([...arr]);
      }
    },
    [type, collapsible, setValue]
  );
  const ctx = (0, import_react10.useMemo)(
    () => ({
      type,
      collapsible,
      isOpen,
      toggle,
      baseId,
      variant,
      motion
    }),
    [type, collapsible, isOpen, toggle, baseId, variant, motion]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(AccordionContext.Provider, { value: ctx, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "div",
    {
      className: cls8("ds-accordion", className),
      "data-variant": variant,
      "data-motion": motion,
      "data-orientation": "vertical",
      ...rest,
      children
    }
  ) });
});
var AccordionItem = import_react10.default.memo(function AccordionItem2({
  value,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const acc = useAccordionContext("AccordionItem");
  const reactId = (0, import_react10.useId)();
  const safe = String(value).replace(/[^a-zA-Z0-9_-]/g, "-");
  const suffix = `${acc.baseId}-${safe}-${reactId.replace(/:/g, "")}`;
  const itemCtx = (0, import_react10.useMemo)(
    () => ({
      value,
      disabled,
      triggerId: `${suffix}-trigger`,
      contentId: `${suffix}-content`
    }),
    [value, disabled, suffix]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(AccordionItemContext.Provider, { value: itemCtx, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "div",
    {
      className: cls8("ds-accordion__item", className),
      "data-disabled": disabled ? "true" : void 0,
      "data-state": acc.isOpen(value) ? "open" : "closed",
      ...rest,
      children
    }
  ) });
});
function ChevronIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("svg", { className: "ds-accordion__chevron", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "path",
    {
      d: "M6 9l6 6 6-6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
var AccordionTrigger = import_react10.default.memo(function AccordionTrigger2({
  children,
  className,
  onClick,
  ...rest
}) {
  const acc = useAccordionContext("AccordionTrigger");
  const item = useAccordionItemContext("AccordionTrigger");
  const open = acc.isOpen(item.value) && !item.disabled;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    "button",
    {
      ...rest,
      type: "button",
      id: item.triggerId,
      className: cls8("ds-accordion__trigger", className),
      "aria-expanded": open,
      "aria-controls": item.contentId,
      "data-state": open ? "open" : "closed",
      "data-disabled": item.disabled ? "true" : void 0,
      disabled: item.disabled,
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        if (e.defaultPrevented || item.disabled)
          return;
        acc.toggle(item.value);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "ds-accordion__trigger-label", children }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(ChevronIcon, {})
      ]
    }
  );
});
var AccordionContent = import_react10.default.memo(function AccordionContent2({
  children,
  className,
  forceMount = false,
  ...rest
}) {
  const acc = useAccordionContext("AccordionContent");
  const item = useAccordionItemContext("AccordionContent");
  const open = acc.isOpen(item.value);
  const animated = acc.motion === "default";
  const keepMounted = animated || forceMount || open;
  if (!keepMounted) {
    return null;
  }
  const hidden = !open;
  const useInertWhenClosed = hidden && animated;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "div",
    {
      ...rest,
      className: cls8("ds-accordion__content-outer", className),
      "data-state": open ? "open" : "closed",
      "data-animated": animated ? "true" : void 0,
      id: item.contentId,
      role: "region",
      "aria-labelledby": item.triggerId,
      "aria-hidden": hidden ? true : void 0,
      hidden: hidden && !forceMount && !animated ? true : void 0,
      inert: useInertWhenClosed ? true : void 0,
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "ds-accordion__content-inner", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        "div",
        {
          className: "ds-accordion__content-body",
          "data-force-hidden": forceMount && hidden && !animated ? "true" : void 0,
          children
        }
      ) })
    }
  );
});

// src/components/molecules/ButtonGroup/index.tsx
var import_react11 = __toESM(require("react"));
var import_jsx_runtime13 = require("react/jsx-runtime");
var ButtonGroupContext = (0, import_react11.createContext)(null);
function useButtonGroup(component) {
  const ctx = (0, import_react11.useContext)(ButtonGroupContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <ButtonGroup>`);
  }
  return ctx;
}
function cls9(...parts) {
  return parts.filter(Boolean).join(" ");
}
function augmentChildren(children) {
  return import_react11.Children.map(import_react11.Children.toArray(children), (child) => {
    if (!(0, import_react11.isValidElement)(child))
      return child;
    if (child.type === Button_default) {
      const el = child;
      return (0, import_react11.cloneElement)(el, {
        className: cls9("ds-button-group__segment", el.props.className)
      });
    }
    return child;
  });
}
var ButtonGroup = import_react11.default.memo(function ButtonGroup2({
  children,
  orientation = "horizontal",
  className,
  ...rest
}) {
  const ctx = (0, import_react11.useMemo)(() => ({ orientation }), [orientation]);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ButtonGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "div",
    {
      role: "group",
      className: cls9("ds-button-group", className),
      "data-orientation": orientation,
      ...rest,
      children: augmentChildren(children)
    }
  ) });
});
var ButtonGroupSeparator = import_react11.default.memo(function ButtonGroupSeparator2({
  orientation: orientationProp,
  className,
  ...rest
}) {
  const { orientation: parentOrientation } = useButtonGroup("ButtonGroupSeparator");
  const orientation = orientationProp != null ? orientationProp : parentOrientation === "horizontal" ? "vertical" : "horizontal";
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "div",
    {
      role: "separator",
      "aria-orientation": orientation === "vertical" ? "vertical" : "horizontal",
      className: cls9("ds-button-group__separator", className),
      "data-orientation": orientation,
      ...rest
    }
  );
});
var ButtonGroupText = import_react11.default.memo(function ButtonGroupText2({
  children,
  className,
  asChild = false,
  ...rest
}) {
  if (asChild && (0, import_react11.isValidElement)(children)) {
    const ch = children;
    const childProps = ch.props;
    return (0, import_react11.cloneElement)(ch, {
      ...rest,
      ...childProps,
      className: cls9("ds-button-group__text", childProps.className, className)
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: cls9("ds-button-group__text", className), ...rest, children });
});

// src/components/molecules/Stepper/index.tsx
var import_react12 = __toESM(require("react"));
var import_jsx_runtime14 = require("react/jsx-runtime");
function cls10(...parts) {
  return parts.filter(Boolean).join(" ");
}
function clampPct(n) {
  if (Number.isNaN(n))
    return 0;
  return Math.min(100, Math.max(0, n));
}
function defaultProgressPercent(activeIndex, stepCount) {
  if (stepCount <= 1)
    return 100;
  return clampPct(activeIndex / (stepCount - 1) * 100);
}
var StepperContext = (0, import_react12.createContext)(null);
function useStepperContext(component) {
  const ctx = (0, import_react12.useContext)(StepperContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Stepper>`);
  }
  return ctx;
}
function isStepperStep(el) {
  return import_react12.default.isValidElement(el) && el.type.displayName === "StepperStep";
}
var Stepper = import_react12.default.memo(function Stepper2({
  children,
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  linear = false,
  ariaLabel = "Steps",
  size = "md",
  scrollable = false,
  trackMode = "continuous",
  progressValue: progressValueProp,
  appearance = "default",
  className,
  ...rest
}) {
  const reactId = (0, import_react12.useId)();
  const baseId = `stepper-${reactId.replace(/:/g, "")}`;
  const isControlled = valueProp !== void 0;
  const [inner, setInner] = (0, import_react12.useState)(defaultValue);
  const activeIndex = isControlled ? valueProp : inner;
  const steps = (0, import_react12.useMemo)(
    () => import_react12.default.Children.toArray(children).filter(isStepperStep),
    [children]
  );
  const stepCount = steps.length;
  const setActiveIndex = (0, import_react12.useCallback)(
    (next) => {
      if (stepCount === 0)
        return;
      const clamped = Math.max(0, Math.min(stepCount - 1, next));
      if (!isControlled) {
        setInner(clamped);
      }
      onValueChange == null ? void 0 : onValueChange(clamped);
    },
    [isControlled, onValueChange, stepCount]
  );
  const safeIndex = stepCount > 0 ? Math.min(Math.max(activeIndex, 0), stepCount - 1) : 0;
  const progressPct = (0, import_react12.useMemo)(() => {
    if (progressValueProp !== void 0) {
      return clampPct(progressValueProp);
    }
    return defaultProgressPercent(safeIndex, stepCount);
  }, [progressValueProp, safeIndex, stepCount]);
  const ctx = (0, import_react12.useMemo)(
    () => ({
      activeIndex,
      setActiveIndex,
      stepCount,
      linear,
      baseId,
      size,
      trackMode,
      appearance
    }),
    [activeIndex, setActiveIndex, stepCount, linear, baseId, size, trackMode, appearance]
  );
  const showContinuousTrack = trackMode === "continuous";
  const showSegmentTint = trackMode === "segments";
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(StepperContext.Provider, { value: ctx, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    "nav",
    {
      className: cls10("ds-stepper", scrollable && "ds-stepper--scroll", className),
      "aria-label": ariaLabel,
      "data-size": size,
      "data-track-mode": trackMode,
      "data-appearance": appearance,
      style: {
        "--stepper-progress-pct": `${progressPct}%`,
        "--stepper-count": String(stepCount),
        /* Grid column count (markers + gaps): line runs between 1st & last marker centers */
        "--stepper-total-cols": String(Math.max(1, stepCount * 2 - 1))
      },
      ...rest,
      children: stepCount === 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
        "div",
        {
          className: "ds-stepper__grid",
          style: { gridTemplateColumns: `repeat(${stepCount * 2 - 1}, minmax(0, 1fr))` },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "ds-stepper__track-shell", style: { gridColumn: "1 / -1", gridRow: 1 }, children: showContinuousTrack ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "ds-stepper__track-inset", "aria-hidden": "true", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "ds-stepper__track-line ds-stepper__track-line--bg" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "ds-stepper__track-line ds-stepper__track-line--fill" })
            ] }) : null }),
            steps.map((step, index) => {
              const colMarker = index * 2 + 1;
              const colGap = index * 2 + 2;
              const isLast = index === stepCount - 1;
              return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_react12.default.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "ds-stepper__cell ds-stepper__cell--marker", style: { gridColumn: colMarker, gridRow: 1 }, children: import_react12.default.cloneElement(step, {
                  stepIndex: index,
                  stepPart: "marker",
                  "aria-posinset": index + 1,
                  "aria-setsize": stepCount
                }) }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "ds-stepper__cell ds-stepper__cell--label", style: { gridColumn: colMarker, gridRow: 2 }, children: import_react12.default.cloneElement(step, {
                  stepIndex: index,
                  stepPart: "text"
                }) }),
                !isLast ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "div",
                  {
                    className: cls10(
                      "ds-stepper__gap",
                      showSegmentTint && index < safeIndex && "ds-stepper__gap--complete"
                    ),
                    style: { gridColumn: colGap, gridRow: 1 },
                    "aria-hidden": "true"
                  }
                ) : null
              ] }, `${baseId}-s-${index}`);
            })
          ]
        }
      )
    }
  ) });
});
var StepperStep = import_react12.default.memo(function StepperStep2({
  label,
  description,
  disabled = false,
  className,
  stepIndex: stepIndexProp,
  stepPart = "marker",
  icon,
  markerText,
  showCheckWhenComplete = true,
  onClick,
  ...rest
}) {
  const ctx = useStepperContext("StepperStep");
  const index = stepIndexProp != null ? stepIndexProp : 0;
  const labelId = `${ctx.baseId}-step-${index}-heading`;
  const state = index < ctx.activeIndex ? "complete" : index === ctx.activeIndex ? "current" : "upcoming";
  const blockedByLinear = ctx.linear && index > ctx.activeIndex;
  const isDisabled = Boolean(disabled || blockedByLinear);
  const handleMarkerClick = (e) => {
    onClick == null ? void 0 : onClick(e);
    if (e.defaultPrevented || isDisabled)
      return;
    ctx.setActiveIndex(index);
  };
  const handleLabelClick = (e) => {
    const ev = e;
    onClick == null ? void 0 : onClick(ev);
    if (e.defaultPrevented || isDisabled)
      return;
    ctx.setActiveIndex(index);
  };
  const showCheck = state === "complete" && showCheckWhenComplete;
  const markerContent = showCheck ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("svg", { className: "ds-stepper__check", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    "path",
    {
      d: "M13.5 4.5L6.5 11.5L3 8",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }) : icon != null ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "ds-stepper__marker-icon-wrap", children: icon }) : markerText != null ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "ds-stepper__marker-inner", children: markerText }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "ds-stepper__marker-inner", children: index + 1 });
  if (stepPart === "text") {
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      "div",
      {
        id: labelId,
        className: cls10("ds-stepper__label-block", className),
        "data-state": state,
        "data-interactive": !isDisabled ? "true" : void 0,
        onClick: handleLabelClick,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "ds-stepper__label", children: label }),
          description != null && description !== false ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "ds-stepper__description", children: description }) : null
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    "button",
    {
      ...rest,
      type: "button",
      "aria-labelledby": labelId,
      disabled: isDisabled,
      className: cls10("ds-stepper__marker-btn", className),
      "data-state": state,
      "aria-current": state === "current" ? "step" : void 0,
      onClick: handleMarkerClick,
      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "ds-stepper__marker", "aria-hidden": "true", children: markerContent })
    }
  );
});
StepperStep.displayName = "StepperStep";

// src/components/molecules/FileUpload/index.tsx
var import_react13 = __toESM(require("react"));

// src/components/molecules/FileUpload/fileUploadSecurity.ts
var DEFAULT_SCAN_BYTES = 256 * 1024;
var SQL_INJECTION_LIKE = [
  /\bUNION\s+(ALL\s+)?SELECT\b/i,
  /\bDROP\s+TABLE\b/i,
  /\bOR\s+['"]?\d+['"]?\s*=\s*['"]?\d+/i,
  /\bEXEC(\s+|\()\s*(xp_|sp_)/i,
  /;\s*--/,
  /('|"|`)\s*;\s*(DROP|DELETE|TRUNCATE|ALTER|EXEC)\b/i
];
var SCRIPT_LIKE = [/<script\b/i, /javascript\s*:/i, /on\w+\s*=\s*["'][^"']*["']/i];
function normalizeExt(ext) {
  const t = ext.trim().toLowerCase();
  return t.startsWith(".") ? t : `.${t}`;
}
function parseAcceptString(accept) {
  if (!accept || !accept.trim())
    return { extensions: [], mimes: [] };
  const extensions = [];
  const mimes = [];
  for (const raw of accept.split(",")) {
    const p = raw.trim().toLowerCase();
    if (!p)
      continue;
    if (p.startsWith("."))
      extensions.push(normalizeExt(p));
    else if (p.includes("/"))
      mimes.push(p);
  }
  return { extensions, mimes };
}
function validateFilename(name) {
  if (!name || !name.trim())
    return "Invalid file name.";
  const base = name.replace(/^.*[/\\]/, "");
  if (base !== name)
    return "File name cannot contain path segments.";
  if (/[\0\x00-\x08\x0b\x0c\x0e-\x1f]/.test(name))
    return "File name contains invalid characters.";
  if (name.includes(".."))
    return "Invalid file name.";
  if (name.length > 240)
    return "File name is too long.";
  return null;
}
function getExtension(filename) {
  const base = filename.replace(/^.*[/\\]/, "");
  const i = base.lastIndexOf(".");
  if (i <= 0)
    return "";
  return normalizeExt(base.slice(i));
}
function detectFileKindFromBuffer(buffer) {
  const u = new Uint8Array(buffer.slice(0, Math.min(32, buffer.byteLength)));
  if (u.length < 4)
    return "unknown";
  if (u[0] === 37 && u[1] === 80 && u[2] === 68 && u[3] === 70)
    return "pdf";
  if (u.length >= 8 && u[0] === 137 && u[1] === 80 && u[2] === 78 && u[3] === 71 && u[4] === 13 && u[5] === 10 && u[6] === 26 && u[7] === 10) {
    return "png";
  }
  if (u[0] === 255 && u[1] === 216 && u[2] === 255)
    return "jpeg";
  if (u.length >= 6 && u[0] === 71 && u[1] === 73 && u[2] === 70 && u[3] === 56)
    return "gif";
  if (u.length >= 12 && u[0] === 82 && u[1] === 73 && u[2] === 70 && u[3] === 70 && u[8] === 87 && u[9] === 69 && u[10] === 66 && u[11] === 80) {
    return "webp";
  }
  if (u[0] === 80 && u[1] === 75 && (u[2] === 3 || u[2] === 5 || u[2] === 7))
    return "zip";
  const head = new TextDecoder("utf-8", { fatal: false }).decode(u.slice(0, Math.min(256, u.length)));
  const trimmed = head.trimStart().toLowerCase();
  const lower = head.toLowerCase();
  if (trimmed.startsWith("<svg") || trimmed.startsWith("<?xml") && lower.includes("<svg"))
    return "svg";
  return "unknown";
}
var KIND_TO_MIMES = {
  pdf: ["application/pdf"],
  png: ["image/png"],
  jpeg: ["image/jpeg", "image/jpg"],
  gif: ["image/gif"],
  webp: ["image/webp"],
  svg: ["image/svg+xml"],
  zip: [
    "application/zip",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ],
  unknown: []
};
var EXT_TO_KIND = {
  ".pdf": "pdf",
  ".png": "png",
  ".jpg": "jpeg",
  ".jpeg": "jpeg",
  ".gif": "gif",
  ".webp": "webp",
  ".svg": "svg",
  ".zip": "zip",
  ".docx": "zip",
  ".xlsx": "zip"
};
function mimeMatchesDeclared(mime, declared) {
  const d = declared.toLowerCase().trim();
  const m = mime.toLowerCase().trim();
  if (!d || !m)
    return true;
  if (d === "*/*")
    return true;
  if (d.endsWith("/*")) {
    const prefix = d.slice(0, -1);
    return m.startsWith(prefix);
  }
  return m === d;
}
function extensionAllowed(ext, allowed) {
  if (allowed.length === 0)
    return true;
  const e = normalizeExt(ext);
  return allowed.some((a) => normalizeExt(a) === e);
}
function mimeInAllowlist(mime, allowed) {
  if (allowed.length === 0)
    return true;
  const m = mime.toLowerCase().trim();
  return allowed.some((a) => mimeMatchesDeclared(m, a));
}
function kindMatchesMimeAllowlist(kind, allowedMimeTypes) {
  if (allowedMimeTypes.length === 0)
    return true;
  if (kind === "unknown")
    return false;
  const expectedMimes = KIND_TO_MIMES[kind];
  return expectedMimes.some((m) => mimeInAllowlist(m, allowedMimeTypes));
}
function scanBufferForSuspiciousPatterns(buf, includeScript) {
  const slice = buf.byteLength > DEFAULT_SCAN_BYTES ? buf.slice(0, DEFAULT_SCAN_BYTES) : buf;
  const text = new TextDecoder("utf-8", { fatal: false }).decode(slice);
  for (const re of SQL_INJECTION_LIKE) {
    if (re.test(text))
      return "File content matched a blocked SQL-like pattern.";
  }
  if (includeScript) {
    for (const re of SCRIPT_LIKE) {
      if (re.test(text))
        return "File content matched a blocked script-like pattern.";
    }
  }
  return null;
}
async function validateFileSecurity(file, options) {
  var _a, _b, _c;
  const fnErr = validateFilename(file.name);
  if (fnErr)
    return fnErr;
  const fromAccept = parseAcceptString(options.accept);
  const allowedExtensions = ((_a = options.allowedExtensions) == null ? void 0 : _a.length) ? options.allowedExtensions.map(normalizeExt) : fromAccept.extensions;
  const allowedMimeTypes = ((_b = options.allowedMimeTypes) == null ? void 0 : _b.length) ? options.allowedMimeTypes.map((m) => m.toLowerCase().trim()) : fromAccept.mimes;
  const hasRestriction = allowedExtensions.length > 0 || allowedMimeTypes.length > 0;
  const verifyMagic = options.verifyMagicBytes !== false && (hasRestriction || options.verifyMagicBytes === true);
  const scanContent = options.scanPdfForSqlInjection === true;
  const ext = getExtension(file.name);
  if (hasRestriction) {
    if (allowedExtensions.length > 0 && !extensionAllowed(ext, allowedExtensions)) {
      return `\u201C${file.name}\u201D has a type that is not allowed.`;
    }
    if (file.type && allowedMimeTypes.length > 0 && !mimeInAllowlist(file.type, allowedMimeTypes)) {
      return `\u201C${file.name}\u201D does not match an allowed file type.`;
    }
  }
  if (!(verifyMagic && hasRestriction || scanContent)) {
    return null;
  }
  const maxScan = Math.min((_c = options.maxScanBytes) != null ? _c : DEFAULT_SCAN_BYTES, DEFAULT_SCAN_BYTES * 4);
  const head = await file.slice(0, maxScan).arrayBuffer();
  if (head.byteLength === 0)
    return "File is empty.";
  const kind = detectFileKindFromBuffer(head);
  if (verifyMagic && hasRestriction) {
    if (kind === "unknown") {
      return `\u201C${file.name}\u201D could not be verified as a supported file format.`;
    }
    if (allowedExtensions.length > 0 && ext) {
      const expectedKind = EXT_TO_KIND[ext];
      if (expectedKind && expectedKind !== kind) {
        return `\u201C${file.name}\u201D content does not match its extension (possible spoofing).`;
      }
    }
    if (allowedMimeTypes.length > 0 && !kindMatchesMimeAllowlist(kind, allowedMimeTypes)) {
      return `\u201C${file.name}\u201D content does not match an allowed type (MIME / magic bytes).`;
    }
  }
  if (scanContent && kind === "pdf") {
    const sqlErr = scanBufferForSuspiciousPatterns(head, false);
    if (sqlErr)
      return `\u201C${file.name}\u201D: ${sqlErr}`;
  }
  if (scanContent && kind === "svg") {
    const xssErr = scanBufferForSuspiciousPatterns(head, true);
    if (xssErr)
      return `\u201C${file.name}\u201D: ${xssErr}`;
  }
  return null;
}
async function validateFilesSecurity(files, options) {
  for (const f of files) {
    const err = await validateFileSecurity(f, options);
    if (err)
      return err;
  }
  return null;
}

// src/components/molecules/FileUpload/index.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function cls11(...parts) {
  return parts.filter(Boolean).join(" ");
}
function fileListToArray(list) {
  if (!list || list.length === 0)
    return [];
  return Array.from(list);
}
function DefaultUploadIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("svg", { width: 40, height: 40, viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    "path",
    {
      fill: "currentColor",
      d: "M18 15v3H6v-3H4v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3h-2ZM7 9l5-5.5L17 9h-4v4H7V9Z"
    }
  ) });
}
var FileUpload = import_react13.default.memo(function FileUpload2({
  label,
  description,
  errorMessage,
  name,
  accept,
  multiple = false,
  disabled = false,
  required = false,
  maxFiles,
  maxSizeBytes,
  allowedExtensions,
  allowedMimeTypes,
  verifyMagicBytes,
  scanPdfForSqlInjection = false,
  maxScanBytes,
  capture,
  onFilesChange,
  onError,
  clearInputAfterSelect = true,
  size = "md",
  icon,
  id: idProp,
  className,
  ...rest
}) {
  var _a, _b, _c;
  const reactId = (0, import_react13.useId)();
  const inputId = idProp != null ? idProp : `file-upload-${reactId.replace(/:/g, "")}`;
  const descId = `${inputId}-desc`;
  const errId = `${inputId}-err`;
  const inputRef = (0, import_react13.useRef)(null);
  const dragDepth = (0, import_react13.useRef)(0);
  const [dragging, setDragging] = (0, import_react13.useState)(false);
  const [internalError, setInternalError] = (0, import_react13.useState)(null);
  const showError = (_a = errorMessage != null ? errorMessage : internalError) != null ? _a : void 0;
  const describedBy = cls11(description && descId, showError && errId) || void 0;
  const parsedAccept = (0, import_react13.useMemo)(() => parseAcceptString(accept), [accept]);
  const hasAllowlist = ((_b = allowedExtensions == null ? void 0 : allowedExtensions.length) != null ? _b : 0) > 0 || ((_c = allowedMimeTypes == null ? void 0 : allowedMimeTypes.length) != null ? _c : 0) > 0 || parsedAccept.extensions.length > 0 || parsedAccept.mimes.length > 0;
  const securityOptions = (0, import_react13.useMemo)(
    () => ({
      accept,
      allowedExtensions,
      allowedMimeTypes,
      verifyMagicBytes: verifyMagicBytes !== void 0 ? verifyMagicBytes : hasAllowlist ? true : false,
      scanPdfForSqlInjection,
      maxScanBytes
    }),
    [
      accept,
      allowedExtensions,
      allowedMimeTypes,
      verifyMagicBytes,
      hasAllowlist,
      scanPdfForSqlInjection,
      maxScanBytes
    ]
  );
  const validateSync = (0, import_react13.useCallback)(
    (files) => {
      if (files.length === 0)
        return null;
      if (multiple && maxFiles != null && files.length > maxFiles) {
        return `You can upload at most ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`;
      }
      if (!multiple && files.length > 1) {
        return "Only one file is allowed.";
      }
      if (maxSizeBytes != null) {
        for (const f of files) {
          if (f.size > maxSizeBytes) {
            const limit = maxSizeBytes >= 1024 * 1024 ? `${(maxSizeBytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(maxSizeBytes / 1024))} KB`;
            return `\u201C${f.name}\u201D is larger than ${limit}.`;
          }
        }
      }
      return null;
    },
    [maxFiles, maxSizeBytes, multiple]
  );
  const commitFiles = (0, import_react13.useCallback)(
    async (files) => {
      const syncErr = validateSync(files);
      if (syncErr) {
        setInternalError(syncErr);
        onError == null ? void 0 : onError(syncErr);
        return;
      }
      const secErr = await validateFilesSecurity(files, securityOptions);
      if (secErr) {
        setInternalError(secErr);
        onError == null ? void 0 : onError(secErr);
        return;
      }
      setInternalError(null);
      onFilesChange == null ? void 0 : onFilesChange(files);
      if (clearInputAfterSelect && inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [clearInputAfterSelect, onError, onFilesChange, securityOptions, validateSync]
  );
  const handleInputChange = (0, import_react13.useCallback)(
    (e) => {
      const files = fileListToArray(e.target.files);
      void commitFiles(files);
    },
    [commitFiles]
  );
  const onDragEnter = (0, import_react13.useCallback)((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled)
      return;
    dragDepth.current += 1;
    setDragging(true);
  }, [disabled]);
  const onDragLeave = (0, import_react13.useCallback)((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled)
      return;
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setDragging(false);
    }
  }, [disabled]);
  const onDragOver = (0, import_react13.useCallback)((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      e.dataTransfer.dropEffect = "copy";
    }
  }, [disabled]);
  const onDrop = (0, import_react13.useCallback)(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragDepth.current = 0;
      setDragging(false);
      if (disabled)
        return;
      const files = fileListToArray(e.dataTransfer.files);
      void commitFiles(files);
    },
    [commitFiles, disabled]
  );
  const captureProp = capture === true ? { capture: "user" } : capture === false ? {} : capture != null ? { capture } : {};
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    "div",
    {
      className: cls11("ds-file-upload", className),
      "data-size": size,
      "data-dragging": dragging ? "true" : void 0,
      "data-error": showError ? "true" : void 0,
      "data-disabled": disabled ? "true" : void 0,
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "input",
          {
            ref: inputRef,
            id: inputId,
            name,
            type: "file",
            className: "ds-file-upload__input",
            accept,
            multiple,
            disabled,
            required,
            "aria-invalid": showError ? true : void 0,
            "aria-describedby": describedBy,
            "aria-required": required || void 0,
            onChange: handleInputChange,
            ...captureProp
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "div",
          {
            className: "ds-file-upload__zone",
            "data-disabled": disabled ? "true" : void 0,
            onDragEnter,
            onDragLeave,
            onDragOver,
            onDrop,
            children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("label", { htmlFor: inputId, className: "ds-file-upload__label", children: [
              icon !== null ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "ds-file-upload__icon", children: icon === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(DefaultUploadIcon, {}) : icon }) : null,
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { children: label }),
              description ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { id: descId, className: "ds-file-upload__description", children: description }) : null
            ] })
          }
        ),
        showError ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { id: errId, className: "ds-file-upload__error", role: "alert", children: showError }) : null
      ]
    }
  );
});
var FileUpload_default = FileUpload;
var Dropzone = FileUpload;

// src/components/molecules/Popover/index.tsx
var import_react14 = __toESM(require("react"));
var import_react_dom = require("react-dom");

// src/components/molecules/Popover/popoverPosition.ts
var GAP = 8;
var VIEWPORT = 8;
function computePopoverPosition(triggerRect, contentWidth, contentHeight, placement) {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;
  const cw = Math.min(contentWidth, vw - VIEWPORT * 2);
  const ch = Math.min(contentHeight, vh - VIEWPORT * 2);
  let top;
  let left;
  const placeBottom = placement.startsWith("bottom");
  const alignEnd = placement.endsWith("end");
  if (placeBottom) {
    top = triggerRect.bottom + GAP;
    if (top + ch > vh - VIEWPORT) {
      const above = triggerRect.top - GAP - ch;
      if (above >= VIEWPORT) {
        top = above;
      } else {
        top = Math.max(VIEWPORT, vh - VIEWPORT - ch);
      }
    }
  } else {
    top = triggerRect.top - GAP - ch;
    if (top < VIEWPORT) {
      const below = triggerRect.bottom + GAP;
      if (below + ch <= vh - VIEWPORT) {
        top = below;
      } else {
        top = VIEWPORT;
      }
    }
  }
  if (alignEnd) {
    left = triggerRect.right - cw;
  } else {
    left = triggerRect.left;
  }
  left = Math.min(Math.max(left, VIEWPORT), vw - VIEWPORT - cw);
  return {
    top,
    left,
    width: cw,
    maxHeight: Math.min(ch, vh - VIEWPORT * 2)
  };
}

// src/components/molecules/Popover/index.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
function cls12(...parts) {
  return parts.filter(Boolean).join(" ");
}
var PopoverContext = (0, import_react14.createContext)(null);
function usePopoverContext(component) {
  const ctx = (0, import_react14.useContext)(PopoverContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Popover> or <DropdownMenu>`);
  }
  return ctx;
}
var Popover = import_react14.default.memo(function Popover2({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start"
}) {
  const reactId = (0, import_react14.useId)();
  const base = reactId.replace(/:/g, "");
  const triggerId = `popover-trigger-${base}`;
  const contentId = `popover-content-${base}`;
  const triggerRef = (0, import_react14.useRef)(null);
  const isControlled = openProp !== void 0;
  const [innerOpen, setInnerOpen] = (0, import_react14.useState)(defaultOpen);
  const open = isControlled ? Boolean(openProp) : innerOpen;
  const prevOpenRef = (0, import_react14.useRef)(false);
  const setOpen = (0, import_react14.useCallback)(
    (next) => {
      if (!isControlled) {
        setInnerOpen(next);
      }
      onOpenChange == null ? void 0 : onOpenChange(next);
    },
    [isControlled, onOpenChange]
  );
  (0, import_react14.useEffect)(() => {
    if (prevOpenRef.current && !open && triggerRef.current) {
      requestAnimationFrame(() => {
        var _a;
        return (_a = triggerRef.current) == null ? void 0 : _a.focus();
      });
    }
    prevOpenRef.current = open;
  }, [open]);
  const ctx = (0, import_react14.useMemo)(
    () => ({
      open,
      setOpen,
      triggerId,
      contentId,
      triggerRef,
      placement
    }),
    [open, setOpen, triggerId, contentId, placement]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(PopoverContext.Provider, { value: ctx, children });
});
var PopoverTrigger = (0, import_react14.forwardRef)(function PopoverTrigger2({ children, className, hasPopup = "dialog", type = "button", onClick, ...rest }, ref) {
  const ctx = usePopoverContext("PopoverTrigger");
  const open = ctx.open;
  const setRefs = (0, import_react14.useCallback)(
    (el) => {
      ctx.triggerRef.current = el;
      if (typeof ref === "function")
        ref(el);
      else if (ref)
        ref.current = el;
    },
    [ctx.triggerRef, ref]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "button",
    {
      ...rest,
      ref: setRefs,
      type,
      id: ctx.triggerId,
      className: cls12(className),
      "aria-expanded": open,
      "aria-controls": ctx.contentId,
      "aria-haspopup": hasPopup,
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        ctx.setOpen(!open);
      },
      children
    }
  );
});
var ARROW_EDGE_PAD = 12;
var PopoverContent = import_react14.default.memo(function PopoverContent2({
  children,
  className,
  role: roleProp,
  onKeyDown,
  style,
  showPointer = false,
  ...rest
}) {
  const ctx = usePopoverContext("PopoverContent");
  const contentRef = (0, import_react14.useRef)(null);
  const [pos, setPos] = (0, import_react14.useState)({
    top: 0,
    left: 0
  });
  const updatePosition = (0, import_react14.useCallback)(() => {
    var _a;
    const trigger = ctx.triggerRef.current;
    const panel = contentRef.current;
    if (!trigger || !panel || typeof window === "undefined")
      return;
    const tr = trigger.getBoundingClientRect();
    const cw = Math.max(panel.offsetWidth || 200, 200);
    const ch = Math.max(panel.offsetHeight || 80, 80);
    const result = computePopoverPosition(tr, cw, ch, ctx.placement);
    if (!showPointer) {
      setPos(result);
      return;
    }
    const below = result.top >= tr.bottom - 4;
    const triggerCx = tr.left + tr.width / 2;
    const panelW = (_a = result.width) != null ? _a : cw;
    const arrowX = Math.min(
      Math.max(triggerCx - result.left, ARROW_EDGE_PAD),
      panelW - ARROW_EDGE_PAD
    );
    setPos({
      ...result,
      arrowEdge: below ? "top" : "bottom",
      arrowX
    });
  }, [ctx.placement, ctx.triggerRef, showPointer]);
  (0, import_react14.useLayoutEffect)(() => {
    if (!ctx.open)
      return;
    updatePosition();
    const id = requestAnimationFrame(() => updatePosition());
    return () => cancelAnimationFrame(id);
  }, [ctx.open, updatePosition]);
  (0, import_react14.useEffect)(() => {
    if (!ctx.open)
      return;
    const onResize = () => updatePosition();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [ctx.open, updatePosition]);
  (0, import_react14.useEffect)(() => {
    if (!ctx.open)
      return;
    const onDocMouse = (e) => {
      var _a, _b;
      const t = e.target;
      if (((_a = ctx.triggerRef.current) == null ? void 0 : _a.contains(t)) || ((_b = contentRef.current) == null ? void 0 : _b.contains(t)))
        return;
      ctx.setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape")
        ctx.setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouse);
      document.removeEventListener("keydown", onKey);
    };
  }, [ctx]);
  (0, import_react14.useEffect)(() => {
    if (!ctx.open || !contentRef.current)
      return;
    const el = contentRef.current.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    el == null ? void 0 : el.focus();
  }, [ctx.open]);
  const role = roleProp != null ? roleProp : "dialog";
  if (!ctx.open)
    return null;
  const pointerStyle = showPointer && pos.arrowX != null ? { ["--popover-arrow-x"]: `${pos.arrowX}px` } : void 0;
  const content = /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "div",
    {
      ...rest,
      ref: contentRef,
      id: ctx.contentId,
      role: role === "none" ? void 0 : role,
      "aria-modal": role === "dialog" ? false : void 0,
      "aria-labelledby": ctx.triggerId,
      className: cls12(
        "ds-popover__content",
        showPointer && "ds-popover__content--with-pointer",
        className
      ),
      "data-arrow-edge": showPointer ? pos.arrowEdge : void 0,
      tabIndex: -1,
      style: {
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        maxHeight: showPointer ? void 0 : pos.maxHeight,
        overflow: showPointer ? "visible" : "auto",
        zIndex: "var(--z-dropdown, 100)",
        ...pointerStyle,
        ...style
      },
      onKeyDown: (e) => {
        onKeyDown == null ? void 0 : onKeyDown(e);
        if (e.key === "Escape")
          ctx.setOpen(false);
      },
      children: showPointer ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "ds-popover__content-scroll", style: { maxHeight: pos.maxHeight }, children }) : children
    }
  );
  if (typeof document === "undefined")
    return null;
  return (0, import_react_dom.createPortal)(content, document.body);
});
var DropdownMenu = Popover;
var DropdownMenuTrigger = (0, import_react14.forwardRef)(
  function DropdownMenuTrigger2(props, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(PopoverTrigger, { ...props, ref, hasPopup: "menu" });
  }
);
var DropdownMenuContent = import_react14.default.memo(function DropdownMenuContent2({
  children,
  className,
  onKeyDown,
  ...rest
}) {
  const handleMenuKeyDown = (0, import_react14.useCallback)(
    (e) => {
      var _a;
      onKeyDown == null ? void 0 : onKeyDown(e);
      if (e.defaultPrevented)
        return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End")
        return;
      const root = e.currentTarget;
      const items = Array.from(root.querySelectorAll('[role="menuitem"]:not([disabled])'));
      if (items.length === 0)
        return;
      const i = items.indexOf(document.activeElement);
      let next = i;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        next = i < 0 ? 0 : (i + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        next = i < 0 ? items.length - 1 : (i - 1 + items.length) % items.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = items.length - 1;
      }
      (_a = items[next]) == null ? void 0 : _a.focus();
    },
    [onKeyDown]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    PopoverContent,
    {
      ...rest,
      role: "menu",
      "aria-orientation": "vertical",
      className,
      onKeyDown: handleMenuKeyDown,
      children
    }
  );
});
var DropdownMenuItem = import_react14.default.memo(function DropdownMenuItem2({
  children,
  className,
  onSelect,
  variant = "default",
  disabled = false,
  onClick,
  type = "button",
  ...rest
}) {
  const ctx = usePopoverContext("DropdownMenuItem");
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    "button",
    {
      ...rest,
      type,
      role: "menuitem",
      disabled,
      className: cls12(
        "ds-dropdown-menu__item",
        variant === "danger" && "ds-dropdown-menu__item--danger",
        className
      ),
      onClick: (e) => {
        onClick == null ? void 0 : onClick(e);
        if (disabled)
          return;
        onSelect == null ? void 0 : onSelect();
        ctx.setOpen(false);
      },
      children
    }
  );
});

// src/components/atoms/TextArea/index.tsx
var import_react15 = require("react");

// src/components/atoms/TextArea/TextArea.config.ts
var defaultConfig = {
  defaultRows: 3,
  defaultMaxLength: 500,
  defaultRemoveChars: "/<>@#",
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
var import_jsx_runtime17 = require("react/jsx-runtime");
var TextArea = ({
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
  ...props
}) => {
  var _a;
  const textareaId = (0, import_react15.useId)();
  const [internalValue, setInternalValue] = (0, import_react15.useState)((_a = value != null ? value : defaultValue) != null ? _a : "");
  (0, import_react15.useEffect)(() => {
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
  const footerMessageColor = resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : resolvedStatus === "warning" ? "var(--color-state-warning, #FFC107)" : resolvedStatus === "success" ? "var(--color-state-success, #28A745)" : "var(--color-text-secondary, #757575)";
  const minHeight = size === "lg" ? 128 : size === "sm" ? 96 : 112;
  const paddingX = size === "lg" ? 16 : size === "sm" ? 12 : 14;
  const paddingY = size === "lg" ? 12 : size === "sm" ? 8 : 10;
  const fontSize = size === "sm" ? "var(--text-small-size, 12px)" : "var(--text-body-size, 16px)";
  const resizeValue = resize === "horizontal" ? "horizontal" : resize === "both" ? "both" : resize === "none" ? "none" : "vertical";
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : resolvedStatus === "warning" ? "var(--color-state-warning, #FFC107)" : resolvedStatus === "success" ? "var(--color-state-success, #28A745)" : "var(--color-border-default, #999999)";
  const wrapperStyle = {
    width: fullWidth ? "100%" : "auto",
    display: fullWidth ? "block" : "inline-block"
  };
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: "var(--color-text-primary, #0D0D0D)",
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
    background: disabled ? "var(--color-bg-page, #F3F4F6)" : "var(--color-bg-surface, #FFFFFF)",
    color: disabled ? "var(--color-text-secondary, #757575)" : "var(--color-text-primary, #0D0D0D)",
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
    color: "var(--color-text-secondary, #757575)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: containerClass, style: wrapperStyle, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("label", { htmlFor: textareaId, style: labelStyle, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      "textarea",
      {
        id: textareaId,
        className,
        style: textareaStyle,
        value: internalValue,
        rows,
        maxLength,
        onChange: handleChange,
        "aria-invalid": resolvedStatus === "error",
        "aria-label": label ? void 0 : ariaLabel,
        ...props
      }
    ),
    (footerMessage || showCount) && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { style: footerRowStyle, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { style: footerTextStyle, children: footerMessage }),
      showCount && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { style: countStyle, children: [
        currentLength,
        " / ",
        maxLength
      ] })
    ] })
  ] });
};
var TextArea_default = TextArea;

// src/components/atoms/ProgressBar/index.tsx
var import_react16 = __toESM(require("react"));

// src/components/atoms/ProgressBar/ProgressBar.config.ts
var DEFAULT_COLOR = "var(--color-brand-primary)";
var DEFAULT_HEIGHT = "1rem";
var DEFAULT_WIDTH = "100%";
var DEFAULT_ARIA_LABEL = "Progress";
var DEFAULT_TYPE = "line";
var DEFAULT_SIZE = "lg";
var SIZE_DIMENSIONS = {
  xs: 32,
  sm: 45,
  md: 70,
  lg: 90
};

// src/components/atoms/ProgressBar/ProgressBar.utils.ts
var computePercentage = ({
  value,
  stepCount,
  formCount
}) => {
  if (formCount && stepCount) {
    return Math.min(100, stepCount / formCount * 100);
  }
  return value;
};
var clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
var calculateCircumference = (radius) => 2 * Math.PI * radius;

// src/components/atoms/ProgressBar/index.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
var ProgressBar = ({
  value,
  type = DEFAULT_TYPE,
  customColor = DEFAULT_COLOR,
  gradient,
  trackColor,
  striped = false,
  animated = false,
  animation = "smooth",
  showLabel = true,
  label,
  size = DEFAULT_SIZE,
  className = "",
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
  ariaLabel = DEFAULT_ARIA_LABEL,
  stepCount,
  formCount,
  showValue = true,
  strokeWidth,
  rounded = true
}) => {
  const computedPct = computePercentage({ value, stepCount, formCount });
  const pct = clamp(computedPct);
  const visualFill = gradient || customColor;
  const trackFill = trackColor || "var(--color-bg-page, #F3F4F6)";
  const resolvedAnimation = animation !== "smooth" ? animation : animated ? "pulse" : "smooth";
  const [animatedWidth, setAnimatedWidth] = import_react16.default.useState(0);
  import_react16.default.useEffect(() => {
    if (type === "line") {
      const timer = setTimeout(() => setAnimatedWidth(pct), 50);
      return () => clearTimeout(timer);
    }
  }, [pct, type]);
  if (type === "line") {
    const lineTrackStyle = {
      height,
      background: trackFill,
      borderRadius: rounded ? 9999 : 6
    };
    const lineFillStyle = {
      width: `${animatedWidth}%`,
      height: "100%",
      background: visualFill,
      borderRadius: rounded ? 9999 : 6,
      transition: resolvedAnimation === "none" ? "none" : "width 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease",
      position: "relative",
      overflow: "hidden"
    };
    const showStripeOverlay = striped || resolvedAnimation === "stripes-flow";
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
      "div",
      {
        className: `progress-bar-reduce-motion ${className}`.trim(),
        style: { width },
        role: "progressbar",
        "aria-valuenow": Math.round(pct),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": ariaLabel,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: showLabel || showValue ? 8 : 0
              },
              children: [
                showLabel && label ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                  "span",
                  {
                    style: {
                      color: "var(--color-text-primary, #0D0D0D)",
                      fontSize: "var(--text-small-size, 12px)",
                      fontWeight: 600,
                      lineHeight: 1.5
                    },
                    children: label
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", {}),
                showValue && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
                  "span",
                  {
                    style: {
                      color: "var(--color-text-secondary, #757575)",
                      fontSize: "var(--text-small-size, 12px)",
                      lineHeight: 1.5
                    },
                    children: [
                      Math.round(pct),
                      "%"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            "div",
            {
              style: {
                ...lineTrackStyle,
                position: "relative",
                overflow: "hidden",
                width: "100%"
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                "div",
                {
                  className: "progress-bar-fill",
                  style: {
                    ...lineFillStyle,
                    opacity: resolvedAnimation === "pulse" ? 0.92 : 1,
                    animation: resolvedAnimation === "pulse" ? "progress-pulse 1.4s ease-in-out infinite" : void 0
                  },
                  children: showStripeOverlay && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                    "span",
                    {
                      className: "progress-bar-stripes",
                      style: {
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, rgba(255,255,255,0.28) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.28) 75%, transparent 75%, transparent)",
                        backgroundSize: "16px 16px",
                        animation: resolvedAnimation === "stripes-flow" ? "progress-stripes 0.8s linear infinite" : void 0
                      }
                    }
                  )
                }
              )
            }
          )
        ]
      }
    );
  }
  const dims = SIZE_DIMENSIONS[size] || 50;
  const effectiveStrokeWidth = strokeWidth != null ? strokeWidth : Math.max(4, Math.round(dims * 0.1));
  const radius = (dims - effectiveStrokeWidth - 4) / 2;
  const circumference = calculateCircumference(radius);
  const [animatedOffset, setAnimatedOffset] = import_react16.default.useState(circumference);
  import_react16.default.useEffect(() => {
    const newOffset = circumference * (1 - pct / 100);
    const timer = setTimeout(() => setAnimatedOffset(newOffset), 50);
    return () => clearTimeout(timer);
  }, [pct, circumference]);
  const getFontSize = () => {
    if (size === "xs")
      return "14px";
    if (size === "sm")
      return "16px";
    if (size === "md")
      return "20px";
    if (size === "lg")
      return "24px";
    return void 0;
  };
  const fontSize = getFontSize();
  const circleId = import_react16.default.useId();
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    "div",
    {
      className: `progress-bar-reduce-motion ${className}`.trim(),
      style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
      role: "progressbar",
      "aria-valuenow": Math.round(pct),
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": ariaLabel,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
          "div",
          {
            style: { position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: dims, height: dims },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("svg", { width: dims, height: dims, className: "block", children: [
                gradient && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("linearGradient", { id: `progress-gradient-${circleId}`, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("stop", { offset: "0%", stopColor: "#60A5FA" }),
                  /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("stop", { offset: "100%", stopColor: "#8B5CF6" })
                ] }) }),
                /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                  "circle",
                  {
                    cx: dims / 2,
                    cy: dims / 2,
                    r: radius,
                    strokeWidth: effectiveStrokeWidth,
                    style: { stroke: trackFill, fill: "none" }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                  "circle",
                  {
                    className: "progress-bar-circle-stroke",
                    cx: dims / 2,
                    cy: dims / 2,
                    r: radius,
                    strokeWidth: effectiveStrokeWidth,
                    style: {
                      stroke: gradient ? `url(#progress-gradient-${circleId})` : customColor,
                      strokeDasharray: circumference,
                      strokeDashoffset: animatedOffset,
                      strokeLinecap: rounded ? "round" : "butt",
                      fill: "none",
                      transition: resolvedAnimation === "none" ? "none" : "stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: "rotate(-90deg)",
                      transformOrigin: "center",
                      filter: resolvedAnimation === "pulse" ? "drop-shadow(0 0 6px rgba(59,130,246,0.35))" : void 0
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
                "div",
                {
                  style: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "var(--color-text-primary, #0D0D0D)",
                    fontWeight: 700,
                    lineHeight: 1,
                    fontSize: fontSize || 16
                  },
                  children: showValue ? `${Math.round(pct)}%` : stepCount !== void 0 ? stepCount : Math.round(pct)
                }
              )
            ]
          }
        ),
        showLabel && label && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          "div",
          {
            style: {
              color: "var(--color-text-secondary, #757575)",
              fontSize: "var(--text-small-size, 12px)",
              textAlign: "center",
              lineHeight: 1.5
            },
            children: label
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("style", { children: `
        @keyframes progress-pulse {
          0%, 100% { opacity: 0.86; }
          50% { opacity: 1; }
        }
        @keyframes progress-stripes {
          from { background-position: 0 0; }
          to { background-position: 16px 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .progress-bar-reduce-motion .progress-bar-fill,
          .progress-bar-reduce-motion .progress-bar-stripes,
          .progress-bar-reduce-motion .progress-bar-circle-stroke {
            animation: none !important;
            transition: none !important;
          }
        }
      ` })
      ]
    }
  );
};
var ProgressBar_default = ProgressBar;

// src/components/atoms/GradientText/index.tsx
var import_react17 = __toESM(require("react"));
var import_jsx_runtime19 = require("react/jsx-runtime");
var defaultGradient = "linear-gradient(135deg, var(--color-brand-primary, #0d0d0d) 0%, var(--color-brand-secondary, #10b981) 100%)";
var GradientText = import_react17.default.memo(function GradientText2({
  children,
  as: Component = "span",
  gradient = defaultGradient,
  fallbackColor = "var(--color-brand-primary, #0d0d0d)",
  className = "",
  style
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    Component,
    {
      className,
      style: {
        display: "inline-block",
        color: fallbackColor,
        backgroundImage: gradient,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style
      },
      children
    }
  );
});
var GradientText_default = GradientText;

// src/components/atoms/ToolTip/index.tsx
var import_react18 = __toESM(require("react"));

// src/components/atoms/ToolTip/TooltipIcon.config.ts
var defaultTooltipOptions = {
  placement: "top",
  delay: 60,
  size: 16,
  color: "currentColor"
};

// src/assets/tooltip-icon.svg
var tooltip_icon_default = 'data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M7.2 12H8.8V7.2H7.2V12ZM8 5.6C8.22667 5.6 8.4168 5.5232 8.5704 5.3696C8.72347 5.21653 8.8 5.02667 8.8 4.8C8.8 4.57333 8.72347 4.3832 8.5704 4.2296C8.4168 4.07653 8.22667 4 8 4C7.77333 4 7.58347 4.07653 7.4304 4.2296C7.2768 4.3832 7.2 4.57333 7.2 4.8C7.2 5.02667 7.2768 5.21653 7.4304 5.3696C7.58347 5.5232 7.77333 5.6 8 5.6ZM8 16C6.89333 16 5.85333 15.7899 4.88 15.3696C3.90667 14.9499 3.06 14.38 2.34 13.66C1.62 12.94 1.05013 12.0933 0.6304 11.12C0.210133 10.1467 0 9.10667 0 8C0 6.89333 0.210133 5.85333 0.6304 4.88C1.05013 3.90667 1.62 3.06 2.34 2.34C3.06 1.62 3.90667 1.04987 4.88 0.6296C5.85333 0.209867 6.89333 0 8 0C9.10667 0 10.1467 0.209867 11.12 0.6296C12.0933 1.04987 12.94 1.62 13.66 2.34C14.38 3.06 14.9499 3.90667 15.3696 4.88C15.7899 5.85333 16 6.89333 16 8C16 9.10667 15.7899 10.1467 15.3696 11.12C14.9499 12.0933 14.38 12.94 13.66 13.66C12.94 14.38 12.0933 14.9499 11.12 15.3696C10.1467 15.7899 9.10667 16 8 16ZM8 14.4C9.78667 14.4 11.3 13.78 12.54 12.54C13.78 11.3 14.4 9.78667 14.4 8C14.4 6.21333 13.78 4.7 12.54 3.46C11.3 2.22 9.78667 1.6 8 1.6C6.21333 1.6 4.7 2.22 3.46 3.46C2.22 4.7 1.6 6.21333 1.6 8C1.6 9.78667 2.22 11.3 3.46 12.54C4.7 13.78 6.21333 14.4 8 14.4Z" fill="%23666666"/>%0A</svg>%0A';

// src/components/atoms/ToolTip/index.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var TooltipIcon = ({
  tooltipText,
  content,
  children,
  tooltipContentIcon,
  placement = defaultTooltipOptions.placement,
  delay = defaultTooltipOptions.delay,
  closeDelay = 80,
  size = 16,
  color = defaultTooltipOptions.color,
  iconToolTip = tooltip_icon_default,
  className = "",
  maxWidth = 240,
  variant = "dark",
  ...rest
}) => {
  const tooltipId = (0, import_react18.useId)();
  const triggerRef = (0, import_react18.useRef)(null);
  const openTimerRef = (0, import_react18.useRef)(null);
  const closeTimerRef = (0, import_react18.useRef)(null);
  const [isOpen, setIsOpen] = (0, import_react18.useState)(false);
  const clearTimers = () => {
    if (openTimerRef.current)
      clearTimeout(openTimerRef.current);
    if (closeTimerRef.current)
      clearTimeout(closeTimerRef.current);
    openTimerRef.current = null;
    closeTimerRef.current = null;
  };
  (0, import_react18.useEffect)(() => {
    return () => {
      clearTimers();
    };
  }, []);
  const showTooltip = () => {
    clearTimers();
    openTimerRef.current = setTimeout(() => setIsOpen(true), delay);
  };
  const hideTooltip = () => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => setIsOpen(false), closeDelay);
  };
  const placementStyleMap = {
    top: {
      bottom: `calc(100% + 10px)`,
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: `calc(100% + 10px)`,
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: `calc(100% + 10px)`,
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: `calc(100% + 10px)`,
      top: "50%",
      transform: "translateY(-50%)"
    }
  };
  const arrowStyleMap = {
    top: {
      left: "50%",
      top: "100%",
      transform: "translateX(-50%)",
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent",
      borderTop: "6px solid currentColor"
    },
    bottom: {
      left: "50%",
      bottom: "100%",
      transform: "translateX(-50%)",
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent",
      borderBottom: "6px solid currentColor"
    },
    left: {
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderTop: "6px solid transparent",
      borderBottom: "6px solid transparent",
      borderLeft: "6px solid currentColor"
    },
    right: {
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      borderTop: "6px solid transparent",
      borderBottom: "6px solid transparent",
      borderRight: "6px solid currentColor"
    }
  };
  const tooltipBackground = variant === "light" ? "var(--color-bg-surface, #FFFFFF)" : "var(--color-text-primary, #0D0D0D)";
  const tooltipForeground = variant === "light" ? "var(--color-text-primary, #0D0D0D)" : "var(--color-bg-surface, #FFFFFF)";
  const tooltipBorder = variant === "light" ? "1px solid rgba(153, 153, 153, 0.3)" : "1px solid transparent";
  const renderTooltipMedia = () => {
    if (!tooltipContentIcon)
      return null;
    if (import_react18.default.isValidElement(tooltipContentIcon)) {
      return tooltipContentIcon;
    }
    if (typeof tooltipContentIcon !== "string" && !(typeof tooltipContentIcon === "object" && tooltipContentIcon !== null && ("src" in tooltipContentIcon || "default" in tooltipContentIcon))) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      Icon_default,
      {
        src: tooltipContentIcon,
        width: 16,
        height: 16,
        decorative: true,
        preserveColors: true
      }
    );
  };
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    "span",
    {
      ref: triggerRef,
      className,
      style: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
        color
      },
      "aria-label": tooltipText,
      "aria-describedby": isOpen ? `tooltip-${tooltipId}` : void 0,
      tabIndex: 0,
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
      onFocus: showTooltip,
      onBlur: hideTooltip,
      ...rest,
      children: [
        children || /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          Icon_default,
          {
            src: iconToolTip,
            width: size,
            height: size,
            decorative: true
          }
        ),
        isOpen && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
          "span",
          {
            id: `tooltip-${tooltipId}`,
            role: "tooltip",
            style: {
              position: "absolute",
              zIndex: 50,
              maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
              minWidth: 120,
              padding: "10px 12px",
              borderRadius: 8,
              background: tooltipBackground,
              color: tooltipForeground,
              border: tooltipBorder,
              boxShadow: "var(--shadow-md, 0 4px 16px rgba(0, 0, 0, 0.10))",
              fontSize: "var(--text-small-size, 12px)",
              lineHeight: 1.5,
              ...placementStyleMap[placement]
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
                "span",
                {
                  style: {
                    position: "absolute",
                    width: 0,
                    height: 0,
                    color: tooltipBackground,
                    ...arrowStyleMap[placement]
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
                "span",
                {
                  style: {
                    display: "flex",
                    alignItems: "flex-start",
                    gap: tooltipContentIcon ? 8 : 0
                  },
                  children: [
                    renderTooltipMedia(),
                    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { children: content != null ? content : tooltipText })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
};
var ToolTip_default = TooltipIcon;

// src/components/molecules/Card/index.tsx
var import_react19 = __toESM(require("react"));
var import_jsx_runtime21 = require("react/jsx-runtime");
var CardContext = (0, import_react19.createContext)(null);
function useCardContext(component) {
  const ctx = (0, import_react19.useContext)(CardContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Card>`);
  }
  return ctx;
}
function cls13(...parts) {
  return parts.filter(Boolean).join(" ");
}
function getDisplayName(type) {
  if (typeof type === "function") {
    const fn = type;
    return fn.displayName || fn.name;
  }
  if (typeof type === "object" && type !== null && "displayName" in type) {
    return String(type.displayName);
  }
  return void 0;
}
function hasCompoundStructure(children) {
  return import_react19.default.Children.toArray(children).some((child) => {
    if (!import_react19.default.isValidElement(child))
      return false;
    const name = getDisplayName(child.type);
    return name === "CardHeader" || name === "CardContent" || name === "CardFooter";
  });
}
function toCssSize2(value, fallback) {
  if (value === void 0)
    return fallback;
  return typeof value === "number" ? `${value}px` : value;
}
function normalizeVariant(v) {
  if (v === "outlined" || v === "filled")
    return "bordered";
  if (v === "elevated")
    return "elevated";
  if (v === "withIndicator")
    return "withIndicator";
  return "bordered";
}
function getShadow(elevation, hover, hoverable) {
  const tier = elevation != null ? elevation : "md";
  if (tier === "none")
    return "none";
  if (hoverable && hover) {
    return tier === "sm" ? "var(--shadow-md)" : "var(--shadow-lg)";
  }
  switch (tier) {
    case "sm":
      return "var(--shadow-sm)";
    case "lg":
      return "var(--shadow-lg)";
    case "md":
    default:
      return "var(--shadow-md)";
  }
}
var CardRoot = (0, import_react19.forwardRef)(function Card({
  title,
  subtitle,
  extra,
  cover,
  actions,
  actionsAlign = "left",
  footer,
  bordered: _legacyBordered = true,
  hoverable = false,
  variant = "outlined",
  elevation,
  selected = false,
  padding: paddingProp,
  radius = "var(--radius-lg)",
  size = "default",
  style,
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  ...rest
}, ref) {
  const [isHovered, setIsHovered] = import_react19.default.useState(false);
  const resolvedVariant = normalizeVariant(variant);
  const isIndicatorCard = resolvedVariant === "withIndicator";
  const isElevated = resolvedVariant === "elevated" || isIndicatorCard;
  const paddingVar = paddingProp !== void 0 ? toCssSize2(paddingProp, "24px") : size === "sm" ? "var(--space-2)" : "var(--space-3)";
  const resolvedRadius = toCssSize2(radius, "8px");
  const resolvedElevation = elevation != null ? elevation : isElevated ? "sm" : "none";
  const showBorder = resolvedVariant === "bordered";
  const boxShadowResolved = showBorder ? "var(--shadow-none)" : isElevated ? getShadow(resolvedElevation, isHovered, Boolean(hoverable) && isElevated) : "var(--shadow-none)";
  const borderSpec = showBorder ? "1px solid var(--color-border-default)" : "1px solid transparent";
  const compound = hasCompoundStructure(children);
  const ctxValue = (0, import_react19.useMemo)(
    () => ({
      size,
      paddingCss: paddingVar
    }),
    [size, paddingVar]
  );
  const outerStyle = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box",
    overflow: "hidden",
    borderRadius: resolvedRadius,
    border: borderSpec,
    background: "var(--color-bg-surface)",
    boxShadow: boxShadowResolved,
    transition: "box-shadow 180ms ease, transform 180ms ease",
    transform: hoverable && isHovered && isElevated ? "translateY(-1px)" : "translateY(0)",
    ...compound ? { "--card-padding": paddingVar } : {},
    ...style
  };
  const showIndicator = isIndicatorCard && selected;
  const bodyPaddingStyle = {
    padding: paddingVar,
    flex: 1,
    minWidth: 0
  };
  const actionsStyle = {
    padding: paddingVar,
    paddingTop: "var(--space-2)",
    borderTop: "1px solid var(--color-border-subtle, var(--color-mist-60))",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "var(--space-2)",
    justifyContent: actionsAlign === "right" ? "flex-end" : actionsAlign === "center" ? "center" : actionsAlign === "between" ? "space-between" : "flex-start"
  };
  const mainColumn = /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0
      },
      children: [
        cover && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { children: cover }),
        (title || subtitle || extra) && /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
          "div",
          {
            style: {
              ...bodyPaddingStyle,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "var(--space-2)",
              paddingBottom: children || actions || footer ? "var(--space-2)" : paddingVar
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { style: { minWidth: 0 }, children: [
                title && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                  "div",
                  {
                    style: {
                      color: "var(--color-text-primary)",
                      fontSize: "var(--text-h4-size)",
                      fontWeight: "var(--text-h4-weight)",
                      lineHeight: 1.4
                    },
                    children: title
                  }
                ),
                subtitle && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
                  "div",
                  {
                    style: {
                      marginTop: "var(--space-0)",
                      color: "var(--color-text-secondary)",
                      fontSize: "var(--text-secondary-size)",
                      lineHeight: 1.5
                    },
                    children: subtitle
                  }
                )
              ] }),
              extra && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: { flexShrink: 0 }, children: extra })
            ]
          }
        ),
        children && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          "div",
          {
            style: {
              ...bodyPaddingStyle,
              paddingTop: title || subtitle || extra ? 0 : paddingVar,
              color: "var(--color-text-primary)"
            },
            children
          }
        ),
        actions && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { style: actionsStyle, children: actions }),
        footer && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          "div",
          {
            style: {
              padding: paddingVar,
              paddingTop: actions ? 0 : "var(--space-2)",
              color: "var(--color-text-secondary)"
            },
            children: footer
          }
        )
      ]
    }
  );
  const inner = compound ? /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(CardContext.Provider, { value: ctxValue, children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "card-inner--compound", children }) }) : mainColumn;
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
    "div",
    {
      ref,
      ...rest,
      style: outerStyle,
      className: cls13(
        compound && "card-root",
        compound && size === "sm" && "card-root--sm",
        className
      ),
      "data-card-variant": resolvedVariant,
      "data-card-size": compound ? size : void 0,
      "data-selected": showIndicator ? "true" : void 0,
      onMouseEnter: (event) => {
        setIsHovered(true);
        onMouseEnter == null ? void 0 : onMouseEnter(event);
      },
      onMouseLeave: (event) => {
        setIsHovered(false);
        onMouseLeave == null ? void 0 : onMouseLeave(event);
      },
      children: [
        showIndicator && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          "div",
          {
            "aria-hidden": true,
            style: {
              width: "var(--size-indicator-bar, 4px)",
              flexShrink: 0,
              alignSelf: "stretch",
              background: "var(--color-accent-lavender-40)",
              borderRadius: "var(--radius-xs) 0 0 var(--radius-xs)"
            }
          }
        ),
        inner
      ]
    }
  );
});
var CardHeader = (0, import_react19.forwardRef)(function CardHeader2({ className, ...rest }, ref) {
  useCardContext("CardHeader");
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { ref, className: cls13("card-header", className), ...rest });
});
CardHeader.displayName = "CardHeader";
var CardTitle = (0, import_react19.forwardRef)(function CardTitle2({ as: Comp = "h3", className, ...rest }, ref) {
  useCardContext("CardTitle");
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Comp, { ref, className: cls13("card-title", className), ...rest });
});
CardTitle.displayName = "CardTitle";
var CardDescription = (0, import_react19.forwardRef)(
  function CardDescription2({ as: Comp = "p", className, ...rest }, ref) {
    useCardContext("CardDescription");
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Comp, { ref, className: cls13("card-description", className), ...rest });
  }
);
CardDescription.displayName = "CardDescription";
var CardAction = (0, import_react19.forwardRef)(function CardAction2({ className, ...rest }, ref) {
  useCardContext("CardAction");
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { ref, className: cls13("card-action", className), ...rest });
});
CardAction.displayName = "CardAction";
var CardContent = (0, import_react19.forwardRef)(function CardContent2({ className, noPadding, ...rest }, ref) {
  useCardContext("CardContent");
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    "div",
    {
      ref,
      className: cls13(
        "card-content",
        noPadding && "card-content--no-padding",
        className
      ),
      ...rest
    }
  );
});
CardContent.displayName = "CardContent";
var CardFooter = (0, import_react19.forwardRef)(function CardFooter2({ className, borderTop = true, ...rest }, ref) {
  useCardContext("CardFooter");
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    "div",
    {
      ref,
      className: cls13(
        "card-footer",
        borderTop ? "card-footer--border" : "card-footer--no-border",
        className
      ),
      ...rest
    }
  );
});
CardFooter.displayName = "CardFooter";
var Card2 = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Content: CardContent,
  Footer: CardFooter
});
var Card_default = Card2;

// src/components/atoms/Avatar/index.tsx
var import_react20 = __toESM(require("react"));

// src/components/atoms/Avatar/Avatar.config.ts
var defaultAvatarSize = 40;
var defaultStatusPosition = "bottom-right";
var defaultBackgroundColor = "var(--color-accent-lavender-10)";
var defaultIconColor = "var(--color-text-on-accent)";

// src/components/atoms/Avatar/index.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
var Avatar = ({
  src,
  alt = "",
  name,
  initials,
  icon,
  fallback,
  size = defaultAvatarSize,
  shape = "circle",
  rounded = "4",
  status = "online",
  statusColor,
  statusPosition = defaultStatusPosition,
  color,
  backgroundColor = defaultBackgroundColor,
  textColor = "var(--color-text-primary, #0D0D0D)",
  iconColor = defaultIconColor,
  iconSize: iconSize2,
  preserveColors = false,
  bordered = false,
  borderColor = "rgba(153, 153, 153, 0.35)",
  className = "",
  style
}) => {
  const statusSize = size / 5;
  const offset = statusSize / 6;
  const calculatedIconSize = iconSize2 || size / 2;
  const resolvedInitials = initials || (name == null ? void 0 : name.split(" ").filter(Boolean).slice(0, 2).map((part) => {
    var _a, _b;
    return (_b = (_a = part[0]) == null ? void 0 : _a.toUpperCase()) != null ? _b : "";
  }).join("")) || "";
  const resolvedBackgroundColor = color || backgroundColor;
  const getStatusStyle = () => {
    const baseStyle = {
      width: statusSize,
      height: statusSize,
      position: "absolute",
      borderRadius: "9999px",
      border: "2px solid var(--color-bg-surface, #FFFFFF)",
      backgroundColor: statusColor || (status === "online" ? "var(--color-state-success, #28A745)" : status === "busy" ? "var(--color-state-error, #DC3545)" : status === "away" ? "var(--color-state-warning, #FFC107)" : status === "offline" ? "var(--color-text-secondary, #757575)" : "transparent")
    };
    switch (statusPosition) {
      case "top-left":
        return { ...baseStyle, top: offset, left: offset };
      case "top-right":
        return { ...baseStyle, top: offset, right: offset };
      case "bottom-left":
        return { ...baseStyle, bottom: offset, left: offset };
      case "bottom-right":
      default:
        return { ...baseStyle, bottom: offset, right: offset };
    }
  };
  const renderContent = () => {
    var _a, _b, _c, _d, _e;
    if (fallback)
      return fallback;
    if (resolvedInitials) {
      return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        "span",
        {
          style: {
            fontSize: `${Math.max(12, size / 2.6)}px`,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "0.02em"
          },
          children: resolvedInitials
        }
      );
    }
    if (!icon)
      return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { style: { fontSize: `${size / 2.5}px`, fontWeight: 600 }, children: "?" });
    if (typeof icon === "string") {
      return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        Icon_default,
        {
          src: icon,
          color: iconColor,
          width: calculatedIconSize,
          height: calculatedIconSize,
          preserveColors
        }
      );
    }
    if (import_react20.default.isValidElement(icon)) {
      return import_react20.default.cloneElement(icon, {
        color: iconColor,
        width: ((_a = icon.props) == null ? void 0 : _a.width) || calculatedIconSize,
        height: ((_b = icon.props) == null ? void 0 : _b.height) || calculatedIconSize,
        size: calculatedIconSize,
        preserveColors: (_d = (_c = icon.props) == null ? void 0 : _c.preserveColors) != null ? _d : preserveColors,
        style: { color: iconColor, ...((_e = icon.props) == null ? void 0 : _e.style) || {} }
      });
    }
    return icon;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    "div",
    {
      className,
      style: {
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        ...style
      },
      children: [
        src ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "img",
          {
            src,
            alt: alt || name || "avatar",
            width: size,
            height: size,
            style: {
              width: size,
              height: size,
              objectFit: "cover",
              display: "block",
              borderRadius: shape === "circle" ? "50%" : shape === "square" ? 0 : rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : "var(--radius-lg, 8px)",
              border: bordered ? `1.5px solid ${borderColor}` : void 0,
              boxSizing: "border-box",
              background: "var(--color-bg-surface, #FFFFFF)"
            }
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "div",
          {
            style: {
              width: size,
              height: size,
              backgroundColor: resolvedBackgroundColor,
              color: icon ? iconColor : textColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: shape === "circle" ? "50%" : shape === "square" ? 0 : rounded === "0" ? 0 : rounded === "1" ? "var(--radius-xs, 2px)" : rounded === "2" ? "var(--radius-sm, 3px)" : rounded === "3" ? "var(--radius-base, 4px)" : rounded === "4" ? "var(--radius-md, 6px)" : "var(--radius-lg, 8px)",
              border: bordered ? `1.5px solid ${borderColor}` : void 0,
              boxSizing: "border-box"
            },
            children: renderContent()
          }
        ),
        status !== "none" && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { style: getStatusStyle() })
      ]
    }
  );
};
var Avatar_default = Avatar;

// src/components/atoms/DatePicker/index.tsx
var import_react22 = require("react");
var import_react_dom2 = require("react-dom");

// src/components/atoms/DatePicker/DatePicker.config.ts
var defaultDatePickerOptions = {
  /** Default format for display and onChange output. Input accepts YYYY-MM-DD, DD/MM/YYYY, MMDDYYYY, etc. */
  dateFormat: "DD-MM-YYYY",
  placeholder: "Select date",
  startPlaceholder: "Start date",
  endPlaceholder: "End date",
  size: "md",
  variant: "outlined",
  rounded: "4",
  rangeSeparator: "to"
};

// src/components/atoms/DatePicker/DatePicker.utils.ts
var isValidDate = (dateStr, format = "MM/DD/YYYY") => {
  if (!dateStr || dateStr.trim() === "") {
    return false;
  }
  const cleanStr = dateStr.replace(/[^\d/\-.]/g, "").trim();
  const separators = ["/", "-", "."];
  let parts = [];
  let foundSeparator = "";
  for (const sep of separators) {
    if (cleanStr.includes(sep)) {
      parts = cleanStr.split(sep);
      foundSeparator = sep;
      break;
    }
  }
  if (!foundSeparator && cleanStr.length >= 6) {
    const formatUpper2 = format.toUpperCase();
    if ((formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM-DD-YYYY" || formatUpper2 === "MM.DD.YYYY") && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 2),
        // month
        cleanStr.substring(2, 4),
        // day
        cleanStr.substring(4, 8)
        // year
      ];
    } else if ((formatUpper2 === "DD/MM/YYYY" || formatUpper2 === "DD-MM-YYYY" || formatUpper2 === "DD.MM.YYYY") && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 2),
        // day
        cleanStr.substring(2, 4),
        // month
        cleanStr.substring(4, 8)
        // year
      ];
    } else if ((formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM-DD-YYYY" || formatUpper2 === "MM.DD.YYYY") && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 2),
        // month
        cleanStr.substring(2, 4),
        // day
        cleanStr.substring(4, 8)
        // year
      ];
    } else if (formatUpper2 === "YYYY-MM-DD" && cleanStr.length === 8) {
      parts = [
        cleanStr.substring(0, 4),
        // year
        cleanStr.substring(4, 6),
        // month
        cleanStr.substring(6, 8)
        // day
      ];
    } else if (cleanStr.length === 6) {
      if (formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM/DD/YY") {
        parts = [
          cleanStr.substring(0, 2),
          // month
          cleanStr.substring(2, 4),
          // day
          cleanStr.substring(4, 6)
          // year (2-digit)
        ];
      } else if (formatUpper2 === "DD/MM/YYYY" || formatUpper2 === "DD/MM/YY") {
        parts = [
          cleanStr.substring(0, 2),
          // day
          cleanStr.substring(2, 4),
          // month
          cleanStr.substring(4, 6)
          // year (2-digit)
        ];
      }
    }
  }
  if (parts.length !== 3) {
    return false;
  }
  const formatUpper = format.toUpperCase();
  let month, day, year;
  try {
    if (formatUpper === "MM/DD/YYYY" || formatUpper === "MM-DD-YYYY" || formatUpper === "MM.DD.YYYY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "DD/MM/YYYY" || formatUpper === "DD-MM-YYYY" || formatUpper === "DD.MM.YYYY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "YYYY/MM/DD" || formatUpper === "YYYY-MM-DD" || formatUpper === "YYYY.MM.DD") {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else if (formatUpper === "MM/DD/YY" || formatUpper === "MM-DD-YY" || formatUpper === "MM.DD.YY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else if (formatUpper === "DD/MM/YY" || formatUpper === "DD-MM-YY" || formatUpper === "DD.MM.YY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      const isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      daysInMonth[1] = isLeapYear ? 29 : 28;
    }
    if (day < 1 || day > daysInMonth[month - 1]) {
      return false;
    }
    if (formatUpper.includes("YYYY")) {
      if (year < 1e3 || year > 9999) {
        return false;
      }
      const yearStr = parts[2];
      if (yearStr.length !== 4) {
        return false;
      }
    } else if (formatUpper.includes("YY")) {
      if (year < 1900 || year > 2099) {
        return false;
      }
    }
    const date = new Date(year, month - 1, day);
    const isValid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    return isValid;
  } catch (error) {
    return false;
  }
};
var formatDateString = (dateStr, fromFormat = "MM/DD/YYYY", toFormat = "DD-MM-YYYY") => {
  if (!dateStr || !isValidDate(dateStr, fromFormat)) {
    return dateStr;
  }
  try {
    const cleanStr = dateStr.replace(/[^\d/\-.]/g, "").trim();
    const separators = ["/", "-", "."];
    let parts = [];
    for (const sep of separators) {
      if (cleanStr.includes(sep)) {
        parts = cleanStr.split(sep);
        break;
      }
    }
    if (parts.length === 1 && cleanStr.length === 8) {
      const fromUpper2 = fromFormat.toUpperCase();
      if (fromUpper2 === "MM/DD/YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (fromUpper2 === "DD/MM/YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (fromUpper2 === "YYYY-MM-DD") {
        parts = [cleanStr.substring(0, 4), cleanStr.substring(4, 6), cleanStr.substring(6, 8)];
      }
    }
    if (parts.length !== 3) {
      return dateStr;
    }
    let month, day, year;
    const fromUpper = fromFormat.toUpperCase();
    if (fromUpper === "MM/DD/YYYY" || fromUpper === "MM-DD-YYYY" || fromUpper === "MM.DD.YYYY") {
      month = parts[0];
      day = parts[1];
      year = parts[2];
    } else if (fromUpper === "DD/MM/YYYY" || fromUpper === "DD-MM-YYYY" || fromUpper === "DD.MM.YYYY") {
      day = parts[0];
      month = parts[1];
      year = parts[2];
    } else if (fromUpper === "YYYY/MM/DD" || fromUpper === "YYYY-MM-DD" || fromUpper === "YYYY.MM.DD") {
      year = parts[0];
      month = parts[1];
      day = parts[2];
    } else if (fromUpper === "MM/DD/YY" || fromUpper === "MM-DD-YY" || fromUpper === "MM.DD.YY") {
      month = parts[0];
      day = parts[1];
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? `20${parts[2].padStart(2, "0")}` : `19${parts[2].padStart(2, "0")}`;
    } else if (fromUpper === "DD/MM/YY" || fromUpper === "DD-MM-YY" || fromUpper === "DD.MM.YY") {
      day = parts[0];
      month = parts[1];
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? `20${parts[2].padStart(2, "0")}` : `19${parts[2].padStart(2, "0")}`;
    } else {
      month = parts[0];
      day = parts[1];
      year = parts[2];
    }
    month = month.padStart(2, "0");
    day = day.padStart(2, "0");
    if (year.length === 2) {
      const shortYear = parseInt(year, 10);
      year = shortYear < 50 ? `20${year}` : `19${year}`;
    }
    const toUpper = (toFormat || "DD-MM-YYYY").trim().toUpperCase();
    if (toUpper === "MM/DD/YYYY") {
      return `${month}/${day}/${year}`;
    } else if (toUpper === "DD/MM/YYYY") {
      return `${day}/${month}/${year}`;
    } else if (toUpper === "YYYY-MM-DD") {
      return `${year}-${month}-${day}`;
    } else if (toUpper === "MM-DD-YYYY") {
      return `${month}-${day}-${year}`;
    } else if (toUpper === "DD-MM-YYYY") {
      return `${day}-${month}-${year}`;
    } else if (toUpper === "DD.MM.YYYY") {
      return `${day}.${month}.${year}`;
    } else if (toUpper === "MM.DD.YYYY") {
      return `${month}.${day}.${year}`;
    } else if (toUpper === "YYYY/MM/DD") {
      return `${year}/${month}/${day}`;
    } else if (toUpper === "MMMM DD, YYYY") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${monthName} ${parseInt(day, 10)}, ${year}`;
    } else if (toUpper === "DD MMMM YYYY") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${parseInt(day, 10)} ${monthName} ${year}`;
    } else if (toUpper === "DD MMM YYYY") {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      const monthName = monthNames[parseInt(month, 10) - 1];
      return `${parseInt(day, 10)} ${monthName} ${year}`;
    } else if (toUpper === "MM/DD/YY") {
      const shortYear = year.substring(2);
      return `${month}/${day}/${shortYear}`;
    } else if (toUpper === "DD/MM/YY") {
      const shortYear = year.substring(2);
      return `${day}/${month}/${shortYear}`;
    } else if (toUpper === "DD-MM-YY") {
      const shortYear = year.substring(2);
      return `${day}-${month}-${shortYear}`;
    } else if (toUpper === "MM-DD-YY") {
      const shortYear = year.substring(2);
      return `${month}-${day}-${shortYear}`;
    }
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateStr;
  }
};
var parseFlexible8DigitDate = (digits, preferredFormat = "MM/DD/YYYY") => {
  if (!digits || digits.replace(/\D/g, "").length !== 8)
    return null;
  const d = digits.replace(/\D/g, "");
  const yyyyFirst = d.substring(0, 4);
  const dd = d.substring(0, 2);
  const mm = d.substring(2, 4);
  const yyyy = d.substring(4, 8);
  const yearFirst = parseInt(yyyyFirst, 10);
  const isLikelyYYYYMMDD = yearFirst >= 1900 && yearFirst <= 2100;
  if (isLikelyYYYYMMDD) {
    const asYYYYMMDD = `${yyyyFirst}-${d.substring(4, 6)}-${d.substring(6, 8)}`;
    if (isValidDate(asYYYYMMDD, "YYYY-MM-DD")) {
      return parseDate(asYYYYMMDD, "YYYY-MM-DD");
    }
  }
  const asDDMM = `${dd}/${mm}/${yyyy}`;
  const asMMDD = `${mm}/${dd}/${yyyy}`;
  const validDDMM = isValidDate(asDDMM, "DD/MM/YYYY");
  const validMMDD = isValidDate(asMMDD, "MM/DD/YYYY");
  const pref = preferredFormat.toUpperCase();
  if (pref.includes("DD") && pref.indexOf("DD") < pref.indexOf("MM")) {
    if (validDDMM)
      return parseDate(asDDMM, "DD/MM/YYYY");
    if (validMMDD)
      return parseDate(asMMDD, "MM/DD/YYYY");
  } else {
    if (validMMDD)
      return parseDate(asMMDD, "MM/DD/YYYY");
    if (validDDMM)
      return parseDate(asDDMM, "DD/MM/YYYY");
  }
  return null;
};
var parseFlexible6DigitDate = (digits, preferredFormat = "MM/DD/YYYY") => {
  if (!digits || digits.replace(/\D/g, "").length !== 6)
    return null;
  const d = digits.replace(/\D/g, "");
  const p1 = d.substring(0, 2);
  const p2 = d.substring(2, 4);
  const yy = d.substring(4, 6);
  const str = `${p1}/${p2}/${yy}`;
  const validDDMM = isValidDate(str, "DD/MM/YY");
  const validMMDD = isValidDate(str, "MM/DD/YY");
  const pref = preferredFormat.toUpperCase();
  if (pref.includes("DD") && pref.indexOf("DD") < pref.indexOf("MM")) {
    if (validDDMM)
      return parseDate(str, "DD/MM/YY");
    if (validMMDD)
      return parseDate(str, "MM/DD/YY");
  } else {
    if (validMMDD)
      return parseDate(str, "MM/DD/YY");
    if (validDDMM)
      return parseDate(str, "DD/MM/YY");
  }
  return null;
};
var parseFlexibleDate = (input, preferredFormat = "MM/DD/YYYY") => {
  const trimmed = input.trim().replace(/[^\d/\-.]/g, "");
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length === 8) {
    const r = parseFlexible8DigitDate(trimmed, preferredFormat);
    if (r)
      return r;
  }
  if (digitsOnly.length === 6) {
    const r = parseFlexible6DigitDate(trimmed, preferredFormat);
    if (r)
      return r;
  }
  if (isValidDate(trimmed, preferredFormat)) {
    return parseDate(trimmed, preferredFormat);
  }
  if (isValidDate(trimmed, "YYYY-MM-DD")) {
    return parseDate(trimmed, "YYYY-MM-DD");
  }
  if (isValidDate(trimmed, "DD/MM/YYYY")) {
    return parseDate(trimmed, "DD/MM/YYYY");
  }
  if (isValidDate(trimmed, "MM/DD/YYYY")) {
    return parseDate(trimmed, "MM/DD/YYYY");
  }
  return null;
};
var parseDate = (dateStr, format = "MM/DD/YYYY") => {
  if (!isValidDate(dateStr, format)) {
    return null;
  }
  try {
    const cleanStr = dateStr.replace(/[^\d/\-.]/g, "").trim();
    const separators = ["/", "-", "."];
    let parts = [];
    for (const sep of separators) {
      if (cleanStr.includes(sep)) {
        parts = cleanStr.split(sep);
        break;
      }
    }
    if (parts.length === 1 && cleanStr.length === 8) {
      const formatUpper2 = format.toUpperCase();
      if (formatUpper2 === "MM/DD/YYYY" || formatUpper2 === "MM-DD-YYYY" || formatUpper2 === "MM.DD.YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (formatUpper2 === "DD/MM/YYYY" || formatUpper2 === "DD-MM-YYYY" || formatUpper2 === "DD.MM.YYYY") {
        parts = [cleanStr.substring(0, 2), cleanStr.substring(2, 4), cleanStr.substring(4, 8)];
      } else if (formatUpper2 === "YYYY-MM-DD") {
        parts = [cleanStr.substring(0, 4), cleanStr.substring(4, 6), cleanStr.substring(6, 8)];
      }
    }
    if (parts.length !== 3) {
      return null;
    }
    let month, day, year;
    const formatUpper = format.toUpperCase();
    if (formatUpper === "MM/DD/YYYY" || formatUpper === "MM-DD-YYYY" || formatUpper === "MM.DD.YYYY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "DD/MM/YYYY" || formatUpper === "DD-MM-YYYY" || formatUpper === "DD.MM.YYYY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (formatUpper === "YYYY/MM/DD" || formatUpper === "YYYY-MM-DD" || formatUpper === "YYYY.MM.DD") {
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else if (formatUpper === "MM/DD/YY" || formatUpper === "MM-DD-YY" || formatUpper === "MM.DD.YY") {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else if (formatUpper === "DD/MM/YY" || formatUpper === "DD-MM-YY" || formatUpper === "DD.MM.YY") {
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      const shortYear = parseInt(parts[2], 10);
      year = shortYear < 50 ? 2e3 + shortYear : 1900 + shortYear;
    } else {
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
    return new Date(year, month - 1, day);
  } catch (error) {
    return null;
  }
};
var isDateInRange = (dateStr, minDate, maxDate, format = "MM/DD/YYYY") => {
  const date = parseDate(dateStr, format);
  if (!date)
    return false;
  if (minDate) {
    const min = parseDate(minDate, format);
    if (min && date < min)
      return false;
  }
  if (maxDate) {
    const max = parseDate(maxDate, format);
    if (max && date > max)
      return false;
  }
  return true;
};
var normalizeDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
var isSameDay = (a, b) => {
  if (!a || !b)
    return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};
var isBeforeDay = (a, b) => {
  if (!a || !b)
    return false;
  return normalizeDate(a).getTime() < normalizeDate(b).getTime();
};
var isAfterDay = (a, b) => {
  if (!a || !b)
    return false;
  return normalizeDate(a).getTime() > normalizeDate(b).getTime();
};
var isBetweenDays = (target, start, end) => {
  if (!target || !start || !end)
    return false;
  const time = normalizeDate(target).getTime();
  const startTime = normalizeDate(start).getTime();
  const endTime = normalizeDate(end).getTime();
  return time > startTime && time < endTime;
};
var addMonths = (date, months) => {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
};
var startOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
var MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var getMonthOptions = () => {
  return MONTH_NAMES.map((name, index) => ({ value: index, label: name }));
};
var getYearOptions = (centerYear, range = 50) => {
  const start = centerYear - range;
  const end = centerYear + range;
  const years = [];
  for (let y = start; y <= end; y++) {
    years.push({ value: y, label: String(y) });
  }
  return years;
};
var formatDateForDisplay = (date, format = "DD-MM-YYYY") => {
  if (!date)
    return "";
  const resolvedFormat = (format || "DD-MM-YYYY").trim() || "DD-MM-YYYY";
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");
  return formatDateString(`${yyyy}-${mm}-${dd}`, "YYYY-MM-DD", resolvedFormat);
};
var getCalendarDays = (month) => {
  const firstOfMonth = startOfMonth(month);
  const firstWeekday = firstOfMonth.getDay();
  const days = [];
  for (let index = 0; index < 42; index += 1) {
    const dayOffset = index - firstWeekday;
    const date = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), 1 + dayOffset);
    days.push({
      date,
      inCurrentMonth: date.getMonth() === firstOfMonth.getMonth()
    });
  }
  return days;
};

// src/components/molecules/Calendar/index.tsx
var import_react21 = require("react");

// src/components/molecules/Calendar/Calendar.config.ts
var defaultCalendarOptions = {
  firstDayOfWeek: 0,
  // Sunday
  fullWidth: true,
  showWeekNumbers: false,
  mode: "single",
  animation: "slide",
  cellHoverAnimation: true,
  /** shadcn-like: bordered card, no heavy shadow */
  variant: "outlined",
  elevation: "none",
  bordered: true,
  hoverable: false,
  size: "md"
};
var getElevationShadow = (elevation) => {
  switch (elevation) {
    case "none":
      return "none";
    case "sm":
      return "var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.08))";
    case "lg":
      return "var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.12))";
    case "md":
    default:
      return "var(--shadow-md, 0 4px 16px rgba(0, 0, 0, 0.10))";
  }
};
var resolveElevation = (elevation, variant) => {
  if (elevation !== void 0)
    return elevation;
  switch (variant) {
    case "elevated":
      return "md";
    case "filled":
      return "sm";
    case "outlined":
    default:
      return "none";
  }
};
var defaultTheme = {
  primary: "var(--button-primary-default-bg, #2563EB)",
  primaryHover: "rgba(37, 99, 235, 0.08)",
  primaryText: "#FFFFFF",
  rangeBackground: "var(--color-accent-sky-10, #E6F2FF)",
  todayBackground: "var(--color-accent-amber-10, #FFF6DD)",
  todayRing: "rgba(245, 158, 11, 0.5)",
  text: "var(--color-text-primary, #0D0D0D)",
  textSecondary: "var(--color-text-secondary, #6B7280)",
  textDisabled: "#B0B0B0",
  background: "var(--color-bg-surface, #FFFFFF)",
  border: "var(--color-border-default, #e5e7eb)",
  selectBorder: "var(--color-border-default, #e5e7eb)",
  focusRing: "rgba(37, 99, 235, 0.25)",
  padding: 12,
  gap: 2,
  cellSize: 36,
  borderRadius: 8,
  cellRadius: 6,
  navButtonSize: 28,
  cellFontSize: 14,
  weekdayFontSize: 11,
  fontFamily: 'var(--font-family, "Inter"), system-ui, sans-serif',
  maxWidth: 320
};
var sizeOverrides = {
  sm: {
    padding: 12,
    gap: 4,
    cellSize: 32,
    borderRadius: 12,
    cellRadius: 8,
    navButtonSize: 28,
    cellFontSize: 12,
    weekdayFontSize: 10,
    maxWidth: 280
  },
  md: {},
  lg: {
    padding: 24,
    gap: 8,
    cellSize: 48,
    borderRadius: 20,
    cellRadius: 12,
    navButtonSize: 44,
    cellFontSize: 16,
    weekdayFontSize: 12,
    maxWidth: 380
  }
};
var getResolvedTheme = (theme, size) => {
  const sizeTheme = size ? sizeOverrides[size] : {};
  return {
    ...defaultTheme,
    ...sizeTheme,
    ...theme
  };
};
var toCssValue = (v) => {
  if (v === void 0)
    return void 0;
  return typeof v === "number" ? `${v}px` : String(v);
};
var themeToCssVars = (theme) => {
  const vars = {};
  if (theme.primary)
    vars["--cal-primary"] = theme.primary;
  if (theme.primaryHover)
    vars["--cal-primary-hover"] = theme.primaryHover;
  if (theme.primaryText)
    vars["--cal-primary-text"] = theme.primaryText;
  if (theme.rangeBackground)
    vars["--cal-range-bg"] = theme.rangeBackground;
  if (theme.todayBackground)
    vars["--cal-today-bg"] = theme.todayBackground;
  if (theme.todayRing)
    vars["--cal-today-ring"] = theme.todayRing;
  if (theme.text)
    vars["--cal-text"] = theme.text;
  if (theme.textSecondary)
    vars["--cal-text-secondary"] = theme.textSecondary;
  if (theme.textDisabled)
    vars["--cal-text-disabled"] = theme.textDisabled;
  if (theme.background)
    vars["--cal-bg"] = theme.background;
  if (theme.border)
    vars["--cal-border"] = theme.border;
  if (theme.selectBorder)
    vars["--cal-select-border"] = theme.selectBorder;
  if (theme.focusRing)
    vars["--cal-focus-ring"] = theme.focusRing;
  if (theme.padding !== void 0)
    vars["--cal-padding"] = toCssValue(theme.padding);
  if (theme.gap !== void 0)
    vars["--cal-gap"] = toCssValue(theme.gap);
  if (theme.cellSize !== void 0) {
    const cs = toCssValue(theme.cellSize);
    vars["--cal-cell-size"] = cs;
    vars["--cell-size"] = cs;
  }
  if (theme.borderRadius !== void 0)
    vars["--cal-radius"] = toCssValue(theme.borderRadius);
  if (theme.cellRadius !== void 0)
    vars["--cal-cell-radius"] = toCssValue(theme.cellRadius);
  if (theme.navButtonSize !== void 0)
    vars["--cal-nav-size"] = toCssValue(theme.navButtonSize);
  if (theme.cellFontSize !== void 0)
    vars["--cal-cell-font"] = toCssValue(theme.cellFontSize);
  if (theme.weekdayFontSize !== void 0)
    vars["--cal-weekday-font"] = toCssValue(theme.weekdayFontSize);
  if (theme.fontFamily)
    vars["--cal-font"] = theme.fontFamily;
  if (theme.maxWidth !== void 0)
    vars["--cal-max-width"] = toCssValue(theme.maxWidth);
  if (theme.boxShadow)
    vars["--cal-shadow"] = theme.boxShadow;
  return vars;
};

// src/components/molecules/Calendar/Calendar.utils.ts
var WEEKDAY_LABELS_SUNDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var WEEKDAY_LABELS_MONDAY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var getWeekdayLabels = (firstDayOfWeek) => {
  return firstDayOfWeek === 1 ? WEEKDAY_LABELS_MONDAY : WEEKDAY_LABELS_SUNDAY;
};
var getCalendarDaysWithFirstDay = (month, firstDayOfWeek) => {
  if (firstDayOfWeek === 0)
    return getCalendarDays(month);
  const firstOfMonth = startOfMonth(month);
  const firstWeekday = firstOfMonth.getDay();
  const startOffset = (firstWeekday - 1 + 7) % 7;
  const result = [];
  for (let i = 0; i < 42; i++) {
    const dayOffset = i - startOffset;
    const date = new Date(
      firstOfMonth.getFullYear(),
      firstOfMonth.getMonth(),
      1 + dayOffset
    );
    result.push({
      date,
      inCurrentMonth: date.getMonth() === firstOfMonth.getMonth()
    });
  }
  return result;
};
var getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 864e5 + 1) / 7);
};

// src/components/molecules/Calendar/index.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
function ChevronLeft({ size = 16 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    "path",
    {
      d: "M15 18l-6-6 6-6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function ChevronRight({ size = 16 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    "path",
    {
      d: "M9 18l6-6-6-6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
var Calendar = ({
  month: monthProp,
  hideNavigation = false,
  captionLayout = "dropdown",
  value,
  onChange,
  defaultValue,
  minDate,
  maxDate,
  disabled = false,
  readOnly = false,
  showWeekNumbers = defaultCalendarOptions.showWeekNumbers,
  fullWidth = defaultCalendarOptions.fullWidth,
  className = "",
  dateCellRender,
  onMonthChange,
  onYearChange,
  firstDayOfWeek = defaultCalendarOptions.firstDayOfWeek,
  mode = defaultCalendarOptions.mode,
  rangeValue,
  onRangeChange,
  disabledDate,
  animation = defaultCalendarOptions.animation,
  cellHoverAnimation = defaultCalendarOptions.cellHoverAnimation,
  variant = defaultCalendarOptions.variant,
  elevation: elevationProp,
  bordered = defaultCalendarOptions.bordered,
  hoverable = defaultCalendarOptions.hoverable,
  radius,
  size = defaultCalendarOptions.size,
  theme: themeProp,
  style: styleProp,
  styles: stylesProp
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
  const [isHovered, setIsHovered] = (0, import_react21.useState)(false);
  const resolvedElevation = resolveElevation(elevationProp, variant);
  const boxShadow = (_a = themeProp == null ? void 0 : themeProp.boxShadow) != null ? _a : hoverable && isHovered ? getElevationShadow("lg") : getElevationShadow(resolvedElevation);
  const theme = (0, import_react21.useMemo)(
    () => getResolvedTheme(themeProp, size),
    [themeProp, size]
  );
  const cssVars = (0, import_react21.useMemo)(() => themeToCssVars(theme), [theme]);
  const isControlled = value !== void 0;
  const isRangeControlled = rangeValue !== void 0;
  const minParsed = (0, import_react21.useMemo)(() => {
    var _a2;
    if (!minDate)
      return null;
    if (minDate instanceof Date)
      return minDate;
    return (_a2 = parseDate(minDate, "YYYY-MM-DD")) != null ? _a2 : parseDate(minDate, "MM/DD/YYYY");
  }, [minDate]);
  const maxParsed = (0, import_react21.useMemo)(() => {
    var _a2;
    if (!maxDate)
      return null;
    if (maxDate instanceof Date)
      return maxDate;
    return (_a2 = parseDate(maxDate, "YYYY-MM-DD")) != null ? _a2 : parseDate(maxDate, "MM/DD/YYYY");
  }, [maxDate]);
  const [internalValue, setInternalValue] = (0, import_react21.useState)(
    defaultValue != null ? defaultValue : null
  );
  const [internalRange, setInternalRange] = (0, import_react21.useState)([null, null]);
  const selectedDate = isControlled ? value : internalValue;
  const selectedRange = isRangeControlled ? rangeValue : internalRange;
  const isMonthControlled = monthProp !== void 0;
  const [internalMonth, setInternalMonth] = (0, import_react21.useState)(
    () => startOfMonth(
      monthProp || selectedDate || selectedRange[0] || selectedRange[1] || /* @__PURE__ */ new Date()
    )
  );
  const visibleMonth = isMonthControlled ? startOfMonth(monthProp) : internalMonth;
  const goToMonth = (next) => {
    const m = startOfMonth(next);
    if (!isMonthControlled) {
      setInternalMonth(m);
    }
    onMonthChange == null ? void 0 : onMonthChange(m);
  };
  (0, import_react21.useEffect)(() => {
    if (isMonthControlled)
      return;
    const anchor = selectedDate || selectedRange[0] || selectedRange[1] || /* @__PURE__ */ new Date();
    setInternalMonth(startOfMonth(anchor));
  }, [isMonthControlled, selectedDate, selectedRange[0], selectedRange[1]]);
  const calendarDays = (0, import_react21.useMemo)(
    () => getCalendarDaysWithFirstDay(visibleMonth, firstDayOfWeek),
    [visibleMonth, firstDayOfWeek]
  );
  const weekdayLabels = (0, import_react21.useMemo)(
    () => getWeekdayLabels(firstDayOfWeek),
    [firstDayOfWeek]
  );
  const monthOptions = getMonthOptions();
  const centerYear = visibleMonth.getFullYear();
  const yearOptions = getYearOptions(centerYear);
  const isDisabledDate = (date) => {
    if (disabled || readOnly)
      return false;
    if (minParsed && isBeforeDay(date, minParsed))
      return true;
    if (maxParsed && isAfterDay(date, maxParsed))
      return true;
    if (disabledDate == null ? void 0 : disabledDate(date))
      return true;
    return false;
  };
  const handleDateSelect = (date) => {
    if (isDisabledDate(date))
      return;
    if (readOnly || disabled)
      return;
    if (mode === "single") {
      const next = date;
      if (!isControlled)
        setInternalValue(next);
      onChange == null ? void 0 : onChange(next);
      return;
    }
    const [start, end] = selectedRange;
    if (!start || start && end) {
      const next = [date, null];
      if (!isRangeControlled)
        setInternalRange(next);
      onRangeChange == null ? void 0 : onRangeChange(next);
    } else if (isBeforeDay(date, start)) {
      const next = [date, start];
      if (!isRangeControlled)
        setInternalRange(next);
      onRangeChange == null ? void 0 : onRangeChange(next);
    } else {
      const next = [start, date];
      if (!isRangeControlled)
        setInternalRange(next);
      onRangeChange == null ? void 0 : onRangeChange(next);
    }
  };
  const handleMonthChange = (monthIndex) => {
    isInitialMountRef.current = false;
    const next = new Date(visibleMonth.getFullYear(), monthIndex, 1);
    slideDirectionRef.current = next.getTime() > visibleMonth.getTime() ? "next" : "prev";
    goToMonth(next);
  };
  const handleYearChange = (year) => {
    isInitialMountRef.current = false;
    const next = new Date(year, visibleMonth.getMonth(), 1);
    slideDirectionRef.current = next.getTime() > visibleMonth.getTime() ? "next" : "prev";
    goToMonth(next);
    onYearChange == null ? void 0 : onYearChange(next);
  };
  const slideDirectionRef = (0, import_react21.useRef)("next");
  const isInitialMountRef = (0, import_react21.useRef)(true);
  const handlePrevMonth = () => {
    isInitialMountRef.current = false;
    slideDirectionRef.current = "prev";
    goToMonth(addMonths(visibleMonth, -1));
  };
  const handleNextMonth = () => {
    isInitialMountRef.current = false;
    slideDirectionRef.current = "next";
    goToMonth(addMonths(visibleMonth, 1));
  };
  const today = /* @__PURE__ */ new Date();
  const [rangeStart, rangeEnd] = selectedRange;
  const animClass = animation === "none" || isInitialMountRef.current ? "" : animation === "slide" ? slideDirectionRef.current === "prev" ? "calendar-anim-slide-prev" : "calendar-anim-slide-next" : animation === "fade" ? "calendar-anim-fade" : animation === "scale" ? "calendar-anim-scale" : "";
  const resolvedRadius = radius !== void 0 ? typeof radius === "number" ? `${radius}px` : radius : (_b = theme.borderRadius) != null ? _b : 16;
  const resolvedBackground = variant === "filled" ? "var(--color-bg-page, #F3F4F6)" : (_c = theme.background) != null ? _c : "var(--color-bg-surface, #FFFFFF)";
  const containerStyle = {
    ...cssVars,
    width: fullWidth ? "100%" : "auto",
    maxWidth: (_d = theme.maxWidth) != null ? _d : 336,
    padding: (_e = theme.padding) != null ? _e : 20,
    borderRadius: resolvedRadius,
    border: bordered ? `1px solid ${(_f = theme.border) != null ? _f : "rgba(153, 153, 153, 0.3)"}` : "1px solid transparent",
    background: resolvedBackground,
    boxShadow: (_g = theme.boxShadow) != null ? _g : boxShadow,
    fontFamily: theme.fontFamily,
    overflow: "hidden",
    transition: "box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease",
    transform: hoverable && isHovered ? "translateY(-2px)" : "translateY(0)",
    ...stylesProp == null ? void 0 : stylesProp.root,
    ...styleProp
  };
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 8,
    ...stylesProp == null ? void 0 : stylesProp.header
  };
  const navButtonStyle = {
    width: (_h = theme.navButtonSize) != null ? _h : 36,
    height: (_i = theme.navButtonSize) != null ? _i : 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: (_j = theme.cellRadius) != null ? _j : 10,
    background: "transparent",
    color: (_k = theme.text) != null ? _k : "var(--color-text-primary, #0D0D0D)",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 20,
    fontWeight: 500,
    ...stylesProp == null ? void 0 : stylesProp.navButton
  };
  const selectStyle = {
    flex: 1,
    padding: "8px 12px",
    border: `1px solid ${(_l = theme.selectBorder) != null ? _l : "rgba(0,0,0,0.1)"}`,
    borderRadius: (_m = theme.cellRadius) != null ? _m : 10,
    fontSize: (_n = theme.cellFontSize) != null ? _n : 14,
    fontWeight: 600,
    color: (_o = theme.text) != null ? _o : "var(--color-text-primary, #0D0D0D)",
    backgroundColor: (_p = theme.background) != null ? _p : "var(--color-bg-surface, #FFFFFF)",
    cursor: disabled ? "not-allowed" : "pointer",
    ...stylesProp == null ? void 0 : stylesProp.select
  };
  const gridGap = (_q = theme.gap) != null ? _q : 6;
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: showWeekNumbers ? "28px repeat(7, minmax(0, 1fr))" : "repeat(7, minmax(0, 1fr))",
    gap: gridGap
  };
  const weekdayGridStyle = {
    display: "grid",
    gridTemplateColumns: showWeekNumbers ? "28px repeat(7, minmax(0, 1fr))" : "repeat(7, minmax(0, 1fr))",
    gap: gridGap
  };
  const weekdayHeaderStyle = {
    textAlign: "center",
    fontSize: (_r = theme.weekdayFontSize) != null ? _r : 11,
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    color: (_s = theme.textSecondary) != null ? _s : "var(--color-text-secondary, #6B7280)",
    padding: "10px 0",
    ...stylesProp == null ? void 0 : stylesProp.weekday
  };
  const cellBaseStyle = {
    minHeight: "var(--cell-size, 2.25rem)",
    width: "var(--cell-size, 2.25rem)",
    minWidth: "var(--cell-size, 2.25rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: (_t = theme.cellRadius) != null ? _t : 10,
    fontSize: (_u = theme.cellFontSize) != null ? _u : 14,
    cursor: "default",
    ...stylesProp == null ? void 0 : stylesProp.cell
  };
  const captionLabel = visibleMonth.toLocaleDateString(void 0, {
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
    "div",
    {
      className: `calendar-root calendar-root--variant-${variant} ${captionLayout === "label" ? "calendar-root--caption-label" : ""} ${className}`.trim(),
      style: containerStyle,
      onMouseEnter: () => hoverable && setIsHovered(true),
      onMouseLeave: () => hoverable && setIsHovered(false),
      children: [
        !hideNavigation && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { style: headerStyle, children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            "button",
            {
              type: "button",
              onClick: handlePrevMonth,
              disabled,
              style: navButtonStyle,
              className: "calendar-nav-btn",
              "aria-label": "Previous month",
              children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ChevronLeft, {})
            }
          ),
          captionLayout === "label" ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            "div",
            {
              className: "calendar-caption-label",
              style: {
                flex: 1,
                minWidth: 0,
                textAlign: "center",
                fontSize: (_v = theme.cellFontSize) != null ? _v : 14,
                fontWeight: 600,
                color: (_w = theme.text) != null ? _w : "var(--color-text-primary, #0D0D0D)"
              },
              children: captionLabel
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { style: { display: "flex", gap: 8, flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              "select",
              {
                value: visibleMonth.getMonth(),
                onChange: (e) => handleMonthChange(parseInt(e.target.value, 10)),
                disabled,
                style: selectStyle,
                className: "calendar-select",
                "aria-label": "Select month",
                children: monthOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("option", { value: opt.value, children: opt.label }, opt.value))
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              "select",
              {
                value: visibleMonth.getFullYear(),
                onChange: (e) => handleYearChange(parseInt(e.target.value, 10)),
                disabled,
                style: selectStyle,
                className: "calendar-select",
                "aria-label": "Select year",
                children: yearOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("option", { value: opt.value, children: opt.label }, opt.value))
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            "button",
            {
              type: "button",
              onClick: handleNextMonth,
              disabled,
              style: navButtonStyle,
              className: "calendar-nav-btn",
              "aria-label": "Next month",
              children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(ChevronRight, {})
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { style: weekdayGridStyle, children: [
          showWeekNumbers && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { style: weekdayHeaderStyle, "aria-hidden": "true", children: "#" }),
          weekdayLabels.map((label) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { style: weekdayHeaderStyle, children: label }, label))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          "div",
          {
            className: animClass,
            children: Array.from({ length: 6 }, (_, rowIdx) => {
              var _a2, _b2;
              const rowDays = calendarDays.slice(rowIdx * 7, (rowIdx + 1) * 7);
              const firstDayOfRow = rowDays[0];
              const weekNum = firstDayOfRow ? getWeekNumber(firstDayOfRow.date) : null;
              return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { style: gridStyle, children: [
                showWeekNumbers && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                  "div",
                  {
                    style: {
                      ...cellBaseStyle,
                      fontSize: (_a2 = theme.weekdayFontSize) != null ? _a2 : 11,
                      color: (_b2 = theme.textSecondary) != null ? _b2 : "var(--color-text-secondary, #757575)"
                    },
                    children: weekNum
                  }
                ),
                rowDays.map((day) => {
                  var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2;
                  const isSelected = mode === "single" ? isSameDay(day.date, selectedDate) : isSameDay(day.date, rangeStart) || isSameDay(day.date, rangeEnd);
                  const isInRange = mode === "range" && rangeStart && rangeEnd && isBetweenDays(day.date, rangeStart, rangeEnd);
                  const isToday = isSameDay(day.date, today);
                  const isDisabled = isDisabledDate(day.date);
                  const isSelectable = !disabled && !readOnly && !isDisabled;
                  const cellStyle = {
                    ...cellBaseStyle,
                    cursor: isSelectable ? "pointer" : "default",
                    color: isDisabled ? (_a3 = theme.textDisabled) != null ? _a3 : "#B0B0B0" : !day.inCurrentMonth ? (_b3 = theme.textSecondary) != null ? _b3 : "#9CA3AF" : isSelected ? (_c2 = theme.primaryText) != null ? _c2 : "#FFFFFF" : (_d2 = theme.text) != null ? _d2 : "var(--color-text-primary, #0D0D0D)",
                    background: isSelected ? (_e2 = theme.primary) != null ? _e2 : "var(--button-primary-default-bg, #2563EB)" : isInRange ? (_f2 = theme.rangeBackground) != null ? _f2 : "var(--color-accent-sky-10, #E6F2FF)" : isToday ? (_g2 = theme.todayBackground) != null ? _g2 : "var(--color-accent-amber-10, #FFF6DD)" : "transparent",
                    fontWeight: isSelected ? 700 : isToday ? 600 : 500,
                    boxShadow: isToday && !isSelected ? `inset 0 0 0 2px ${(_h2 = theme.todayRing) != null ? _h2 : "rgba(245, 158, 11, 0.5)"}` : void 0
                  };
                  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleDateSelect(day.date),
                      disabled: isDisabled,
                      style: cellStyle,
                      className: `calendar-cell ${!day.inCurrentMonth ? "calendar-cell--outside" : ""} ${isSelectable && cellHoverAnimation ? "calendar-cell--hoverable" : ""}`,
                      "aria-label": day.date.toLocaleDateString(),
                      "aria-selected": isSelected,
                      "data-outside": !day.inCurrentMonth ? "true" : void 0,
                      children: dateCellRender ? dateCellRender(day.date) : day.date.getDate()
                    },
                    day.date.toISOString()
                  );
                })
              ] }, rowIdx);
            })
          },
          visibleMonth.getFullYear() + "-" + visibleMonth.getMonth()
        )
      ]
    }
  );
};
var Calendar_default = Calendar;

// src/components/atoms/DatePicker/index.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
function splitRangeValue(value) {
  const parts = value.split(/\s+(?:-|to)\s+/i);
  return [parts[0] || "", parts[1] || ""];
}
function resolveRadius(rounded) {
  switch (rounded) {
    case "0":
      return 0;
    case "1":
      return "var(--radius-xs, 2px)";
    case "2":
      return "var(--radius-sm, 3px)";
    case "3":
      return "var(--radius-base, 4px)";
    case "4":
      return "var(--radius-md, 6px)";
    case "5":
      return "var(--radius-lg, 8px)";
    default:
      return 9999;
  }
}
var DatePicker = ({
  value = "",
  onChange,
  label,
  placeholder = defaultDatePickerOptions.placeholder,
  startPlaceholder = defaultDatePickerOptions.startPlaceholder,
  endPlaceholder = defaultDatePickerOptions.endPlaceholder,
  range = false,
  className = "",
  helperText,
  disabled = false,
  dateFormat: dateFormatProp = defaultDatePickerOptions.dateFormat,
  minDate,
  maxDate,
  validate,
  onValidate,
  error,
  required = false,
  fullWidth = true,
  size = defaultDatePickerOptions.size,
  rounded = defaultDatePickerOptions.rounded,
  variant = defaultDatePickerOptions.variant,
  status,
  rangeSeparator = defaultDatePickerOptions.rangeSeparator
}) => {
  const dateFormat = (dateFormatProp || defaultDatePickerOptions.dateFormat).trim() || defaultDatePickerOptions.dateFormat;
  const inputId = (0, import_react22.useId)();
  const wrapperRef = (0, import_react22.useRef)(null);
  const popoverRef = (0, import_react22.useRef)(null);
  const [internalError, setInternalError] = (0, import_react22.useState)("");
  const [isOpen, setIsOpen] = (0, import_react22.useState)(false);
  const [isPortalReady, setIsPortalReady] = (0, import_react22.useState)(false);
  const [isDesktopRangeLayout, setIsDesktopRangeLayout] = (0, import_react22.useState)(false);
  const [popoverStyle, setPopoverStyle] = (0, import_react22.useState)({});
  const initialRangeValues = (0, import_react22.useMemo)(() => splitRangeValue(value), [value]);
  const initialParsedSingle = (0, import_react22.useMemo)(() => parseFlexibleDate(value, dateFormat), [value, dateFormat]);
  const initialParsedStart = (0, import_react22.useMemo)(() => parseFlexibleDate(initialRangeValues[0], dateFormat), [initialRangeValues[0], dateFormat]);
  const initialParsedEnd = (0, import_react22.useMemo)(() => parseFlexibleDate(initialRangeValues[1], dateFormat), [initialRangeValues[1], dateFormat]);
  const [startDate, setStartDate] = (0, import_react22.useState)(() => initialParsedStart);
  const [endDate, setEndDate] = (0, import_react22.useState)(() => initialParsedEnd);
  const [singleDate, setSingleDate] = (0, import_react22.useState)(() => initialParsedSingle);
  const [visibleMonth, setVisibleMonth] = (0, import_react22.useState)(
    () => startOfMonth(initialParsedStart || initialParsedEnd || initialParsedSingle || /* @__PURE__ */ new Date())
  );
  const [inputText, setInputText] = (0, import_react22.useState)(
    () => range ? "" : initialParsedSingle ? formatDateForDisplay(initialParsedSingle, dateFormat) : value || ""
  );
  const [rangeStartInput, setRangeStartInput] = (0, import_react22.useState)(
    () => range ? initialParsedStart ? formatDateForDisplay(initialParsedStart, dateFormat) : initialRangeValues[0] || "" : ""
  );
  const [rangeEndInput, setRangeEndInput] = (0, import_react22.useState)(
    () => range ? initialParsedEnd ? formatDateForDisplay(initialParsedEnd, dateFormat) : initialRangeValues[1] || "" : ""
  );
  (0, import_react22.useEffect)(() => {
    if (range) {
      const [nextStart, nextEnd] = splitRangeValue(value);
      const parsedStart = parseFlexibleDate(nextStart, dateFormat);
      const parsedEnd = parseFlexibleDate(nextEnd, dateFormat);
      setStartDate(parsedStart);
      setEndDate(parsedEnd);
      setVisibleMonth(startOfMonth(parsedStart || parsedEnd || /* @__PURE__ */ new Date()));
      setRangeStartInput(parsedStart ? formatDateForDisplay(parsedStart, dateFormat) : nextStart || "");
      setRangeEndInput(parsedEnd ? formatDateForDisplay(parsedEnd, dateFormat) : nextEnd || "");
    } else {
      const parsedSingle = parseFlexibleDate(value, dateFormat);
      setSingleDate(parsedSingle);
      setVisibleMonth(startOfMonth(parsedSingle || /* @__PURE__ */ new Date()));
      setInputText(parsedSingle ? formatDateForDisplay(parsedSingle, dateFormat) : value || "");
    }
  }, [dateFormat, range, value]);
  (0, import_react22.useEffect)(() => {
    setIsPortalReady(true);
  }, []);
  const updatePopoverPosition = (0, import_react22.useCallback)(() => {
    const anchorEl = wrapperRef.current;
    if (!anchorEl || typeof window === "undefined")
      return;
    const rect = anchorEl.getBoundingClientRect();
    const viewportPadding = 8;
    const gap = 8;
    const desktop = window.innerWidth >= 920;
    setIsDesktopRangeLayout(desktop);
    const estimatedWidth = range ? desktop ? 620 : Math.min(360, window.innerWidth - viewportPadding * 2) : Math.min(340, window.innerWidth - viewportPadding * 2);
    const width = Math.min(estimatedWidth, window.innerWidth - viewportPadding * 2);
    const estimatedHeight = range ? desktop ? 430 : 760 : 430;
    const left = Math.min(
      Math.max(viewportPadding, rect.left),
      window.innerWidth - width - viewportPadding
    );
    const placeAbove = rect.bottom + gap + estimatedHeight > window.innerHeight - viewportPadding && rect.top - gap - estimatedHeight > viewportPadding;
    const top = placeAbove ? Math.max(viewportPadding, rect.top - estimatedHeight - gap) : rect.bottom + gap;
    setPopoverStyle({
      position: "fixed",
      top,
      left,
      width,
      maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
      maxHeight: `calc(100vh - ${viewportPadding * 2}px)`,
      overflow: "auto",
      zIndex: 1400
    });
  }, [range]);
  (0, import_react22.useEffect)(() => {
    if (!isOpen)
      return;
    updatePopoverPosition();
    const handleWindowChange = () => updatePopoverPosition();
    const handleOutsidePress = (event) => {
      var _a, _b;
      const target = event.target;
      const isInTrigger = (_a = wrapperRef.current) == null ? void 0 : _a.contains(target);
      const isInPopover = (_b = popoverRef.current) == null ? void 0 : _b.contains(target);
      if (!isInTrigger && !isInPopover)
        setIsOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key === "Escape")
        setIsOpen(false);
    };
    window.addEventListener("resize", handleWindowChange);
    window.addEventListener("scroll", handleWindowChange, true);
    document.addEventListener("mousedown", handleOutsidePress);
    document.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("resize", handleWindowChange);
      window.removeEventListener("scroll", handleWindowChange, true);
      document.removeEventListener("mousedown", handleOutsidePress);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, updatePopoverPosition]);
  const currentSize = {
    sm: { minHeight: 36, paddingX: 12, fontSize: "var(--text-small-size, 12px)" },
    md: { minHeight: 44, paddingX: 14, fontSize: "var(--text-body-size, 16px)" },
    lg: { minHeight: 48, paddingX: 16, fontSize: "var(--text-body-size, 16px)" }
  }[size];
  const resolvedStatus = status != null ? status : error ? "error" : void 0;
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : resolvedStatus === "warning" ? "var(--color-state-warning, #FFC107)" : resolvedStatus === "success" ? "var(--color-state-success, #28A745)" : "var(--color-border-default, #999999)";
  const shellStyle = {
    width: fullWidth ? "100%" : "auto",
    display: fullWidth ? "block" : "inline-block"
  };
  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: disabled ? "var(--color-text-secondary, #757575)" : "var(--color-text-primary, #0D0D0D)",
    fontSize: "var(--text-secondary-size, 14px)",
    fontWeight: 500,
    lineHeight: 1.5
  };
  const fieldBaseStyle = variant === "filled" ? {
    minHeight: currentSize.minHeight,
    backgroundColor: "var(--color-bg-page, #F3F4F6)",
    border: `1.5px solid ${borderColor}`,
    borderRadius: resolveRadius(rounded)
  } : variant === "underlined" ? {
    minHeight: currentSize.minHeight,
    backgroundColor: "transparent",
    border: "0 solid transparent",
    borderBottom: `1.5px solid ${borderColor}`,
    borderRadius: 0
  } : {
    minHeight: currentSize.minHeight,
    backgroundColor: "var(--color-bg-surface, #FFFFFF)",
    border: `1.5px solid ${borderColor}`,
    borderRadius: resolveRadius(rounded)
  };
  const inputStyle = {
    width: "100%",
    minWidth: 0,
    height: currentSize.minHeight,
    padding: `0 ${currentSize.paddingX}px`,
    border: "none",
    outline: "none",
    background: "transparent",
    color: disabled ? "var(--color-text-secondary, #757575)" : "var(--color-text-primary, #0D0D0D)",
    fontSize: currentSize.fontSize,
    lineHeight: 1.5,
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none"
  };
  const helperMessage = error || internalError || helperText;
  const helperStyle = {
    marginTop: 8,
    marginBottom: 0,
    color: resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : "var(--color-text-secondary, #757575)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5
  };
  const emitValue = (nextStart, nextEnd) => {
    const formattedStart = formatDateForDisplay(nextStart, dateFormat);
    const formattedEnd = formatDateForDisplay(nextEnd, dateFormat);
    const result = range ? [formattedStart, formattedEnd].filter(Boolean).join(` ${rangeSeparator} `) : formattedStart;
    let nextError = "";
    let isValid = true;
    if (required && !result) {
      nextError = "Date is required";
      isValid = false;
    } else if (result) {
      if (range) {
        const [rawStart, rawEnd] = splitRangeValue(result);
        if (rawStart && !parseFlexibleDate(rawStart, dateFormat)) {
          nextError = "Invalid start date";
          isValid = false;
        } else if (rawEnd && !parseFlexibleDate(rawEnd, dateFormat)) {
          nextError = "Invalid end date";
          isValid = false;
        } else if (rawStart && rawEnd && isAfterDay(parseDate(rawStart, dateFormat), parseDate(rawEnd, dateFormat))) {
          nextError = "End date should be after start date";
          isValid = false;
        }
      } else if (!parseFlexibleDate(result, dateFormat)) {
        nextError = "Invalid date";
        isValid = false;
      }
      if (isValid && minDate && !isDateInRange(result.split(` ${rangeSeparator} `)[0], minDate, void 0, dateFormat)) {
        nextError = "Selected date is before the minimum date";
        isValid = false;
      }
      if (isValid && maxDate && !isDateInRange(result.split(` ${rangeSeparator} `)[0], void 0, maxDate, dateFormat)) {
        nextError = "Selected date is after the maximum date";
        isValid = false;
      }
      if (isValid && validate && !validate(result)) {
        nextError = "Invalid date";
        isValid = false;
      }
    }
    setInternalError(nextError);
    onValidate == null ? void 0 : onValidate(isValid);
    if (isValid) {
      onChange == null ? void 0 : onChange(result);
    } else if (!result) {
      onChange == null ? void 0 : onChange("");
    }
  };
  const minParsedDate = parseDate(minDate || "", dateFormat);
  const maxParsedDate = parseDate(maxDate || "", dateFormat);
  const isDisabledDate = (date) => {
    if (minParsedDate && isBeforeDay(date, minParsedDate))
      return true;
    if (maxParsedDate && isAfterDay(date, maxParsedDate))
      return true;
    return false;
  };
  const applyTypedDate = (text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      setSingleDate(null);
      setInputText("");
      emitValue(null);
      return;
    }
    const parsed = parseFlexibleDate(trimmed, dateFormat);
    if (parsed) {
      setSingleDate(parsed);
      setInputText(formatDateForDisplay(parsed, dateFormat));
      setVisibleMonth(startOfMonth(parsed));
      emitValue(parsed);
    }
  };
  const handleSingleInputChange = (e) => {
    const newVal = e.target.value;
    setInputText(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    const digitCount = trimmed.replace(/[/\-.]/g, "").length;
    const fmtUpper = dateFormat.toUpperCase();
    const isCompleteLength = fmtUpper.includes("YYYY") && digitCount >= 8 || fmtUpper.includes("YY") && !fmtUpper.includes("YYYY") && digitCount >= 6;
    if (isCompleteLength) {
      const parsed = parseFlexibleDate(trimmed, dateFormat);
      if (parsed)
        applyTypedDate(trimmed);
    }
  };
  const applyTypedRange = (startText, endText) => {
    const startTrimmed = startText.trim();
    const endTrimmed = endText.trim();
    if (!startTrimmed && !endTrimmed) {
      setStartDate(null);
      setEndDate(null);
      setRangeStartInput("");
      setRangeEndInput("");
      emitValue(null, null);
      return;
    }
    const parsedStart = startTrimmed ? parseFlexibleDate(startTrimmed, dateFormat) : null;
    const parsedEnd = endTrimmed ? parseFlexibleDate(endTrimmed, dateFormat) : null;
    if (parsedStart) {
      setStartDate(parsedStart);
      setRangeStartInput(formatDateForDisplay(parsedStart, dateFormat));
      setVisibleMonth(startOfMonth(parsedStart));
    }
    if (parsedEnd) {
      setEndDate(parsedEnd);
      setRangeEndInput(formatDateForDisplay(parsedEnd, dateFormat));
    }
    emitValue(parsedStart, parsedEnd);
  };
  const getDigitCount = (str) => str.replace(/[^\d]/g, "").length;
  const formatUpper = dateFormat.toUpperCase();
  const completeLength = formatUpper.includes("YYYY") ? 8 : 6;
  const handleRangeStartChange = (e) => {
    const newVal = e.target.value;
    setRangeStartInput(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    if (getDigitCount(trimmed) >= completeLength && parseFlexibleDate(trimmed, dateFormat)) {
      applyTypedRange(trimmed, rangeEndInput.trim());
    }
  };
  const handleRangeEndChange = (e) => {
    const newVal = e.target.value;
    setRangeEndInput(newVal);
    const trimmed = newVal.trim().replace(/[^\d/\-.]/g, "");
    if (getDigitCount(trimmed) >= completeLength && parseFlexibleDate(trimmed, dateFormat)) {
      applyTypedRange(rangeStartInput.trim(), trimmed);
    }
  };
  const handleCalendarRangeChange = (next) => {
    const [a, b] = next;
    setStartDate(a);
    setEndDate(b);
    if (a)
      setRangeStartInput(formatDateForDisplay(a, dateFormat));
    if (b)
      setRangeEndInput(formatDateForDisplay(b, dateFormat));
    else
      setRangeEndInput("");
    emitValue(a != null ? a : null, b != null ? b : null);
    if (a && b) {
      setIsOpen(false);
    }
  };
  const navButtonStyle = {
    width: 28,
    height: 28,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "var(--radius-sm, 6px)",
    background: "transparent",
    color: "var(--color-text-primary, #0D0D0D)",
    cursor: disabled ? "not-allowed" : "pointer",
    flexShrink: 0
  };
  const triggerShellStyle = {
    ...fieldBaseStyle,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    cursor: disabled ? "not-allowed" : "text",
    padding: `0 ${currentSize.paddingX}px`,
    boxSizing: "border-box"
  };
  const popoverPanelStyle = {
    ...popoverStyle,
    padding: 0,
    borderRadius: "var(--radius-md, 8px)",
    border: "1px solid var(--color-border-default, #e5e7eb)",
    background: "var(--color-bg-surface, #FFFFFF)",
    boxShadow: "0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 10px 24px -4px rgba(15, 23, 42, 0.1)",
    transformOrigin: "top left",
    opacity: 1,
    transition: "opacity 150ms ease-out, transform 150ms ease-out"
  };
  const rangeCalendarsStyle = {
    display: "grid",
    gridTemplateColumns: isDesktopRangeLayout ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)",
    gap: 16,
    alignItems: "start"
  };
  if (range) {
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className, style: shellStyle, ref: wrapperRef, children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("label", { style: labelStyle, children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: triggerShellStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          "input",
          {
            type: "text",
            value: rangeStartInput,
            onChange: handleRangeStartChange,
            onFocus: () => {
              if (!disabled)
                setIsOpen(true);
            },
            onBlur: () => applyTypedRange(rangeStartInput, rangeEndInput),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                applyTypedRange(rangeStartInput, rangeEndInput);
                e.target.blur();
              }
            },
            placeholder: startPlaceholder,
            disabled,
            readOnly: disabled,
            style: {
              ...inputStyle,
              flex: 1,
              minWidth: 0,
              border: "none",
              background: "transparent",
              cursor: disabled ? "not-allowed" : "text"
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { style: { color: "var(--color-text-secondary, #757575)", fontSize: 14, flexShrink: 0 }, children: rangeSeparator }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          "input",
          {
            type: "text",
            value: rangeEndInput,
            onChange: handleRangeEndChange,
            onFocus: () => {
              if (!disabled)
                setIsOpen(true);
            },
            onBlur: () => applyTypedRange(rangeStartInput, rangeEndInput),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                applyTypedRange(rangeStartInput, rangeEndInput);
                e.target.blur();
              }
            },
            placeholder: endPlaceholder,
            disabled,
            readOnly: disabled,
            style: {
              ...inputStyle,
              flex: 1,
              minWidth: 0,
              border: "none",
              background: "transparent",
              cursor: disabled ? "not-allowed" : "text"
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          "button",
          {
            type: "button",
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              flexShrink: 0,
              padding: 0,
              border: "none",
              borderRadius: "var(--radius-sm, 6px)",
              background: "transparent",
              color: "var(--color-text-secondary, #757575)",
              cursor: disabled ? "not-allowed" : "pointer"
            },
            onClick: () => !disabled && setIsOpen((prev) => !prev),
            onMouseDown: (e) => e.preventDefault(),
            "aria-label": "Open calendar",
            disabled,
            children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M3 10h18", stroke: "currentColor", strokeWidth: "1.5" }),
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M8 3v4M16 3v4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
            ] })
          }
        )
      ] }),
      isPortalReady && isOpen && (0, import_react_dom2.createPortal)(
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          "div",
          {
            ref: popoverRef,
            role: "dialog",
            "aria-label": "Choose date range",
            "aria-modal": "false",
            style: popoverPanelStyle,
            children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: { padding: 12 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    gap: 8
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                      "button",
                      {
                        type: "button",
                        style: navButtonStyle,
                        className: "calendar-nav-btn",
                        onClick: () => setVisibleMonth(addMonths(visibleMonth, -1)),
                        disabled,
                        "aria-label": "Previous month",
                        children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M15 18l-6-6 6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
                      "span",
                      {
                        style: {
                          flex: 1,
                          textAlign: "center",
                          fontSize: "var(--text-secondary-size, 14px)",
                          fontWeight: 600,
                          color: "var(--color-text-primary, #0D0D0D)"
                        },
                        children: [
                          visibleMonth.toLocaleDateString(void 0, { month: "long", year: "numeric" }),
                          " \u2013 ",
                          addMonths(visibleMonth, 1).toLocaleDateString(void 0, { month: "long", year: "numeric" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                      "button",
                      {
                        type: "button",
                        style: navButtonStyle,
                        className: "calendar-nav-btn",
                        onClick: () => setVisibleMonth(addMonths(visibleMonth, 1)),
                        disabled,
                        "aria-label": "Next month",
                        children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M9 18l6-6-6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: rangeCalendarsStyle, children: [
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                  Calendar_default,
                  {
                    mode: "range",
                    rangeValue: [startDate, endDate],
                    onRangeChange: handleCalendarRangeChange,
                    month: visibleMonth,
                    onMonthChange: setVisibleMonth,
                    hideNavigation: true,
                    captionLayout: "label",
                    minDate,
                    maxDate,
                    disabledDate: isDisabledDate,
                    disabled,
                    variant: "outlined",
                    elevation: "none",
                    bordered: false,
                    animation: "none",
                    fullWidth: true,
                    styles: { root: { padding: 8 } }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                  Calendar_default,
                  {
                    mode: "range",
                    rangeValue: [startDate, endDate],
                    onRangeChange: handleCalendarRangeChange,
                    month: addMonths(visibleMonth, 1),
                    onMonthChange: (d) => setVisibleMonth(addMonths(d, -1)),
                    hideNavigation: true,
                    captionLayout: "label",
                    minDate,
                    maxDate,
                    disabledDate: isDisabledDate,
                    disabled,
                    variant: "outlined",
                    elevation: "none",
                    bordered: false,
                    animation: "none",
                    fullWidth: true,
                    styles: { root: { padding: 8 } }
                  }
                )
              ] })
            ] })
          }
        ),
        document.body
      ),
      helperMessage && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { style: helperStyle, children: helperMessage })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className, style: shellStyle, ref: wrapperRef, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("label", { htmlFor: inputId, style: labelStyle, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { style: triggerShellStyle, children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        "input",
        {
          id: inputId,
          type: "text",
          value: inputText,
          onChange: handleSingleInputChange,
          onFocus: () => !disabled && setIsOpen(true),
          onBlur: () => applyTypedDate(inputText),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              applyTypedDate(inputText);
              e.target.blur();
            }
          },
          placeholder,
          disabled,
          readOnly: disabled,
          "aria-label": placeholder,
          style: {
            ...inputStyle,
            flex: 1,
            minWidth: 0,
            border: "none",
            background: "transparent",
            cursor: disabled ? "not-allowed" : "text"
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        "button",
        {
          type: "button",
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            flexShrink: 0,
            padding: 0,
            border: "none",
            borderRadius: "var(--radius-sm, 6px)",
            background: "transparent",
            color: "var(--color-text-secondary, #757575)",
            cursor: disabled ? "not-allowed" : "pointer"
          },
          onClick: () => !disabled && setIsOpen((prev) => !prev),
          onMouseDown: (e) => e.preventDefault(),
          "aria-label": "Open calendar",
          disabled,
          children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M3 10h18", stroke: "currentColor", strokeWidth: "1.5" }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("path", { d: "M8 3v4M16 3v4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
          ] })
        }
      )
    ] }),
    isPortalReady && isOpen && (0, import_react_dom2.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        "div",
        {
          ref: popoverRef,
          role: "dialog",
          "aria-label": "Choose date",
          "aria-modal": "false",
          style: popoverPanelStyle,
          children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
            Calendar_default,
            {
              value: singleDate,
              onChange: (d) => {
                if (!d)
                  return;
                setSingleDate(d);
                setInputText(formatDateForDisplay(d, dateFormat));
                emitValue(d);
                setIsOpen(false);
              },
              month: visibleMonth,
              onMonthChange: setVisibleMonth,
              captionLayout: "label",
              minDate,
              maxDate,
              disabledDate: isDisabledDate,
              disabled,
              variant: "outlined",
              elevation: "none",
              bordered: false,
              animation: "none",
              fullWidth: true,
              styles: { root: { padding: 12 } }
            }
          )
        }
      ),
      document.body
    ),
    helperMessage && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { style: helperStyle, children: helperMessage })
  ] });
};
var DatePicker_default = DatePicker;

// src/components/atoms/OtpBox/index.tsx
var import_react23 = require("react");
var import_jsx_runtime25 = require("react/jsx-runtime");
var OtpBox = ({
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
  showValidation = true
}) => {
  const [otpValue, setOtpValue] = (0, import_react23.useState)(value);
  const inputRef = (0, import_react23.useRef)(null);
  const boxRefs = (0, import_react23.useRef)([]);
  const inputId = (0, import_react23.useId)();
  (0, import_react23.useEffect)(() => {
    if (value !== otpValue) {
      setOtpValue(value);
    }
  }, [value]);
  const filterInput = (val) => {
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
  const updateValue = (newVal) => {
    const limited = newVal.slice(0, length);
    setOtpValue(limited);
    onChange == null ? void 0 : onChange(limited);
  };
  const handleChange = (e) => {
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
  const handleBoxChange = (index, e) => {
    var _a, _b;
    const val = filterInput(e.target.value);
    if (val.length > 1) {
      const pasted = val.slice(0, length);
      updateValue(pasted);
      const nextIdx = Math.min(index + pasted.length, length - 1);
      (_a = boxRefs.current[nextIdx]) == null ? void 0 : _a.focus();
      return;
    }
    const char = val.slice(-1);
    if (char) {
      const arr = [...otpValue.split(""), ""];
      arr[index] = char;
      const newVal = arr.join("").slice(0, length);
      updateValue(newVal);
      if (index < length - 1)
        (_b = boxRefs.current[index + 1]) == null ? void 0 : _b.focus();
    } else {
      const arr = otpValue.split("");
      arr[index] = "";
      updateValue(arr.join(""));
    }
  };
  const handleBoxKeyDown = (index, e) => {
    var _a, _b, _c;
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      e.preventDefault();
      const arr = otpValue.split("");
      arr[index - 1] = "";
      updateValue(arr.join(""));
      (_a = boxRefs.current[index - 1]) == null ? void 0 : _a.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      (_b = boxRefs.current[index - 1]) == null ? void 0 : _b.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      (_c = boxRefs.current[index + 1]) == null ? void 0 : _c.focus();
    }
  };
  const handleBoxPaste = (e) => {
    var _a;
    e.preventDefault();
    const pasted = filterInput(e.clipboardData.getData("text")).slice(0, length);
    updateValue(pasted);
    const nextIndex = Math.min(pasted.length, length - 1);
    (_a = boxRefs.current[nextIndex]) == null ? void 0 : _a.focus();
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
        return void 0;
    }
  };
  const displayValue = mask ? "\u2022".repeat(otpValue.length) : otpValue;
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
    className
  ].filter(Boolean).join(" ");
  if (variant === "boxes") {
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: rootClasses, "data-disabled": disabled || void 0, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "otp-box-wrapper", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("label", { htmlFor: inputId, className: "otp-box-label", children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
        "div",
        {
          className: "otp-box-cells",
          style: {
            display: "flex",
            gap: `${boxGap}px`,
            flexWrap: "nowrap",
            width: "fit-content"
          },
          children: Array.from({ length }).map((_, i) => {
            var _a;
            return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              "input",
              {
                ref: (el) => {
                  boxRefs.current[i] = el;
                },
                type: "text",
                inputMode: getInputMode(),
                maxLength: 1,
                value: mask ? otpValue[i] ? "\u2022" : "" : (_a = otpValue[i]) != null ? _a : "",
                onChange: (e) => handleBoxChange(i, e),
                onKeyDown: (e) => handleBoxKeyDown(i, e),
                onPaste: handleBoxPaste,
                disabled,
                placeholder: "",
                "aria-label": `Digit ${i + 1} of ${length}`,
                "aria-invalid": showError,
                "aria-describedby": showError ? `error-${inputId}` : void 0,
                autoComplete: "one-time-code",
                spellCheck: false,
                className: "otp-box-cell",
                style: {
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
                  flexShrink: 0
                }
              },
              i
            );
          })
        }
      ),
      showError && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { id: `error-${inputId}`, className: "otp-box-error", role: "alert", children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Icon_default, { src: error_default, width: 14, height: 14, color: "var(--color-state-error)" }),
        displayError
      ] })
    ] }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: rootClasses, "data-disabled": disabled || void 0, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "otp-box-wrapper", children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("label", { htmlFor: inputId, className: "otp-box-label", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      "input",
      {
        ref: inputRef,
        id: inputId,
        type: "text",
        maxLength: length,
        value: displayValue,
        onChange: handleChange,
        disabled,
        inputMode: getInputMode(),
        pattern: getPattern(),
        "aria-invalid": showError,
        "aria-describedby": showError ? `error-${inputId}` : void 0,
        autoComplete: "one-time-code",
        placeholder: Array(length).fill("\xB7").join(" "),
        spellCheck: false,
        className: "otp-box-input"
      }
    ),
    showError && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { id: `error-${inputId}`, className: "otp-box-error", role: "alert", children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Icon_default, { src: error_default, width: 14, height: 14, color: "var(--color-state-error)" }),
      displayError
    ] })
  ] }) });
};
var OtpBox_default = OtpBox;

// src/components/atoms/Divider/index.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
var Divider = ({
  className = "",
  orientation = "horizontal",
  length,
  thickness = "1px",
  color = "var(--color-border-subtle, var(--color-mist-60, #ededed))",
  variant = "solid",
  align = "center",
  textPosition = "center",
  margin = "12px 0",
  inset = 0,
  style: customStyle,
  children
}) => {
  const resolvedOrientation = orientation === "row" || orientation === "column" ? orientation === "row" ? "horizontal" : "vertical" : orientation;
  const isVertical = resolvedOrientation === "vertical";
  const resolvedThickness = typeof thickness === "number" ? `${thickness}px` : thickness;
  const resolvedInset = typeof inset === "number" ? `${inset}px` : inset;
  if (isVertical) {
    const verticalStyle = {
      display: "inline-block",
      width: resolvedThickness,
      minWidth: resolvedThickness,
      alignSelf: "stretch",
      height: length || "100%",
      backgroundColor: color,
      margin,
      borderRadius: 9999,
      ...customStyle
    };
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      "div",
      {
        role: "separator",
        "aria-orientation": "vertical",
        className,
        style: verticalStyle
      }
    );
  }
  const borderStyle = variant === "dashed" ? "dashed" : variant === "dotted" ? "dotted" : "solid";
  const lineStyle = {
    borderTop: `${resolvedThickness} ${borderStyle} ${color}`,
    borderBottom: "none",
    minWidth: 0,
    flex: 1
  };
  if (!children) {
    const finalStyle = {
      width: length || "100%",
      borderTop: `${resolvedThickness} ${borderStyle} ${color}`,
      margin,
      marginLeft: resolvedInset,
      marginRight: resolvedInset,
      boxSizing: "border-box",
      ...customStyle
    };
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      "div",
      {
        role: "separator",
        "aria-orientation": "horizontal",
        className,
        style: finalStyle
      }
    );
  }
  const startFlex = align === "start" ? 0.2 : align === "end" ? 0.8 : 1;
  const endFlex = align === "start" ? 0.8 : align === "end" ? 0.2 : 1;
  const contentStyle = {
    flexShrink: 0,
    color: "var(--color-text-secondary, #757575)",
    fontSize: "var(--text-small-size, 12px)",
    lineHeight: 1.5,
    whiteSpace: "nowrap"
  };
  const lineBorder = `${resolvedThickness} ${borderStyle} ${color}`;
  if (textPosition === "above") {
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
      "div",
      {
        role: "separator",
        "aria-orientation": "horizontal",
        className,
        style: {
          display: "flex",
          flexDirection: "column",
          width: length || "100%",
          margin,
          marginLeft: resolvedInset,
          marginRight: resolvedInset,
          boxSizing: "border-box",
          ...customStyle
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { style: { width: "100%", borderTop: lineBorder } }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { style: { ...contentStyle, marginTop: 8 }, children })
        ]
      }
    );
  }
  if (textPosition === "below") {
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
      "div",
      {
        role: "separator",
        "aria-orientation": "horizontal",
        className,
        style: {
          display: "flex",
          flexDirection: "column",
          width: length || "100%",
          margin,
          marginLeft: resolvedInset,
          marginRight: resolvedInset,
          boxSizing: "border-box",
          ...customStyle
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { style: { ...contentStyle, marginBottom: 8 }, children }),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { style: { width: "100%", borderTop: lineBorder } })
        ]
      }
    );
  }
  const contentWrapperStyle = {
    display: "flex",
    alignItems: "center",
    width: length || "100%",
    minWidth: 0,
    gap: 12,
    margin,
    marginLeft: resolvedInset,
    marginRight: resolvedInset,
    boxSizing: "border-box",
    ...customStyle
  };
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
    "div",
    {
      role: "separator",
      "aria-orientation": "horizontal",
      className,
      style: contentWrapperStyle,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { style: { ...lineStyle, flex: startFlex } }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { style: contentStyle, children }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { style: { ...lineStyle, flex: endFlex } })
      ]
    }
  );
};
var Divider_default = Divider;

// src/components/atoms/Select/index.tsx
var import_react24 = require("react");

// src/components/atoms/Select/Select.config.ts
var defaultSelectOptions = {
  placeholder: "Select an option",
  liveSearch: false,
  customClass: "",
  showIcons: true
  // NEW: default to show icons
};

// src/components/atoms/Select/index.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
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
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_jsx_runtime27.Fragment, { children: [
      option.label,
      " ",
      iconElement
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_jsx_runtime27.Fragment, { children: [
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
var Select = (0, import_react24.forwardRef)((props, ref) => {
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
  const generatedId = (0, import_react24.useId)();
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
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: customClass, style: wrapperStyle, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("label", { htmlFor: selectId, style: labelStyle, children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
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
          placeholder && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("option", { value: "", disabled: !allowPlaceholderSelection, children: placeholder }),
          useGroups ? groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("optgroup", { label: group.label, children: group.options.map((opt, index) => {
            var _a;
            const dataAttributes = getOptionDataAttributes(opt);
            return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
            return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
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
    helperMessage && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("p", { style: helperStyle, children: helperMessage })
  ] });
});
Select.displayName = "Select";
var Select_default = Select;

// src/components/molecules/Combobox/index.tsx
var import_react25 = __toESM(require("react"));
var import_jsx_runtime28 = require("react/jsx-runtime");
function cls14(...parts) {
  return parts.filter(Boolean).join(" ");
}
function flattenOptions(options, groups) {
  if (groups == null ? void 0 : groups.length)
    return groups.flatMap((g) => g.options);
  return options != null ? options : [];
}
function ChevronDown() {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("svg", { className: "ds-combobox__chevron", viewBox: "0 0 20 20", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("path", { d: "M5 7.5L10 12.5L15 7.5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
var Combobox = import_react25.default.memo(function Combobox2({
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
  ...rest
}) {
  const reactId = (0, import_react25.useId)();
  const base = reactId.replace(/:/g, "");
  const listboxId = `ds-combobox-lb-${base}`;
  const searchId = `ds-combobox-search-${base}`;
  const labelId = `ds-combobox-lbl-${base}`;
  const isControlled = valueProp !== void 0;
  const [open, setOpen] = (0, import_react25.useState)(false);
  const [search, setSearch] = (0, import_react25.useState)("");
  (0, import_react25.useEffect)(() => {
    if (!open)
      setSearch("");
  }, [open]);
  const [innerValue, setInnerValue] = (0, import_react25.useState)(() => {
    if (defaultValue !== void 0)
      return defaultValue;
    return multiple ? [] : "";
  });
  const selected = isControlled ? valueProp : innerValue;
  const allOptions = (0, import_react25.useMemo)(() => flattenOptions(options, groups), [options, groups]);
  const useGroups = Boolean(groups == null ? void 0 : groups.length);
  const filteredFlat = (0, import_react25.useMemo)(() => {
    const base2 = options != null ? options : [];
    const q = search.trim().toLowerCase();
    if (!searchable || !q)
      return base2;
    return base2.filter(
      (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, search, searchable]);
  const filteredGroups = (0, import_react25.useMemo)(() => {
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
  const setValue = (0, import_react25.useCallback)(
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
  const displayTrigger = (0, import_react25.useMemo)(() => {
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
  const sizeStyles = (0, import_react25.useMemo)(() => {
    const map = {
      sm: { minH: 36, font: "var(--text-small-size, 12px)" },
      md: { minH: 44, font: "var(--text-body-size, 16px)" },
      lg: { minH: 48, font: "var(--text-body-size, 16px)" }
    };
    return map[size];
  }, [size]);
  const borderColor = resolvedStatus === "error" ? "var(--color-state-error, #DC3545)" : "var(--color-border-default, #999999)";
  const renderOptionRow = (opt) => {
    const sel = isSelected(opt.value);
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
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
          opt.icon ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: "ds-combobox__option-icon", children: opt.icon }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: "ds-combobox__option-label", children: opt.label }),
          multiple && sel ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("svg", { className: "ds-combobox__check", viewBox: "0 0 16 16", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
    "div",
    {
      ...rest,
      id: idProp,
      className: cls14("ds-combobox", className),
      style: {
        width: fullWidth ? "100%" : "auto",
        display: fullWidth ? "block" : "inline-block",
        ...style
      },
      "data-open": open ? "true" : "false",
      "data-disabled": disabled ? "true" : "false",
      "data-status": resolvedStatus,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(Popover, { open, onOpenChange: setOpen, placement: "bottom-start", children: [
          label ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { id: labelId, className: "ds-combobox__label", children: label }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
            PopoverTrigger,
            {
              type: "button",
              role: "combobox",
              disabled,
              className: "ds-combobox__trigger",
              "aria-labelledby": label ? labelId : void 0,
              "aria-label": label ? void 0 : placeholder != null ? placeholder : "Select option",
              hasPopup: "listbox",
              "aria-expanded": open,
              "aria-controls": listboxId,
              style: {
                "--combobox-min-h": `${sizeStyles.minH}px`,
                "--combobox-font-size": sizeStyles.font,
                "--combobox-border": borderColor
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("span", { className: "ds-combobox__trigger-inner", children: [
                  displayTrigger.icon ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: "ds-combobox__trigger-icon", children: displayTrigger.icon }) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                    "span",
                    {
                      className: cls14(
                        "ds-combobox__trigger-label",
                        displayTrigger.placeholder && "ds-combobox__trigger-label--placeholder"
                      ),
                      children: displayTrigger.text
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ChevronDown, {})
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
            PopoverContent,
            {
              role: "none",
              className: "ds-combobox__popover",
              style: listMinWidth != null ? { minWidth: listMinWidth } : void 0,
              children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "ds-combobox__panel", children: [
                searchable ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
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
                !hasList ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "ds-combobox__empty", role: "status", children: "No results" }) : useGroups && filteredGroups ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
                  "div",
                  {
                    id: listboxId,
                    className: "ds-combobox__listbox",
                    role: "listbox",
                    "aria-multiselectable": multiple,
                    "aria-label": label != null ? label : "Options",
                    children: filteredGroups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(import_react25.default.Fragment, { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "ds-combobox__group-label", role: "presentation", children: g.label }),
                      g.options.map((opt) => renderOptionRow(opt))
                    ] }, g.label))
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
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
        helperMessage ? /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("p", { className: "ds-combobox__helper", role: error ? "alert" : void 0, children: helperMessage }) : null
      ]
    }
  );
});
Combobox.displayName = "Combobox";

// src/components/molecules/Modal/index.tsx
var import_react26 = require("react");
var import_react_dom3 = require("react-dom");

// src/components/molecules/Modal/Modal.config.ts
var defaultModalOptions = {
  size: "md",
  animation: "fade",
  animationDuration: 225,
  closeAfterTransition: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  showCancel: true,
  /** Matches `tokens.css` `--z-modal` */
  zIndex: 400
};
var modalSizeMap = {
  sm: "modal-sm",
  md: "",
  lg: "modal-lg",
  xl: "modal-xl",
  xxl: "modal-xxl"
};
var modalSizeWidths = {
  sm: "400px",
  md: "480px",
  lg: "560px",
  xl: "800px",
  xxl: "min(1140px, 90vw)"
};

// src/components/molecules/Modal/bodyScrollLock.ts
var depth = 0;
var scrollY = 0;
function acquireBodyScrollLock() {
  if (depth === 0) {
    scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  depth += 1;
}
function releaseBodyScrollLock() {
  depth = Math.max(0, depth - 1);
  if (depth === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    window.scrollTo(0, scrollY);
  }
}

// src/components/molecules/Modal/index.tsx
var import_jsx_runtime29 = require("react/jsx-runtime");
function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirm",
  confirmDisabled = false,
  cancelText = "Cancel",
  showCancel = true,
  hideFooter = false,
  size = defaultModalOptions.size,
  id = "dynamicModal",
  showCloseButton = defaultModalOptions.showCloseButton,
  isStackedBackground = false,
  zIndex = defaultModalOptions.zIndex,
  titleIcon,
  titleIconSize,
  animation = defaultModalOptions.animation,
  animationDuration = defaultModalOptions.animationDuration,
  closeAfterTransition = defaultModalOptions.closeAfterTransition,
  closeOnBackdropClick = defaultModalOptions.closeOnBackdropClick,
  closeOnEscape = defaultModalOptions.closeOnEscape,
  className = "",
  hideHeader = false,
  confirmButtonVariant = "primary",
  confirmButtonColor,
  confirmButtonBackground,
  confirmButtonBorder,
  cancelButtonVariant = "outlineSecondary",
  cancelButtonColor,
  cancelButtonBackground,
  cancelButtonBorder
}) {
  var _a, _b;
  const [isExiting, setIsExiting] = (0, import_react26.useState)(false);
  const exitTimeoutRef = (0, import_react26.useRef)(null);
  const dialogRef = (0, import_react26.useRef)(null);
  const sizeClass = (_a = modalSizeMap[size]) != null ? _a : "";
  const animClass = animation !== "none" ? `modal-dialog--${animation}` : "";
  (0, import_react26.useEffect)(() => {
    if (isOpen) {
      setIsExiting(false);
    } else {
      setIsExiting(false);
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
    }
  }, [isOpen]);
  (0, import_react26.useEffect)(() => {
    if (!isOpen)
      return void 0;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [isOpen]);
  const handleClose = (0, import_react26.useCallback)(() => {
    if (closeAfterTransition && animation !== "none") {
      setIsExiting(true);
      exitTimeoutRef.current = setTimeout(() => {
        onClose();
        exitTimeoutRef.current = null;
      }, animationDuration);
    } else {
      onClose();
    }
  }, [closeAfterTransition, animation, animationDuration, onClose]);
  (0, import_react26.useEffect)(() => {
    return () => {
      if (exitTimeoutRef.current)
        clearTimeout(exitTimeoutRef.current);
    };
  }, []);
  (0, import_react26.useEffect)(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && showCloseButton && closeOnEscape) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose, showCloseButton, closeOnEscape]);
  (0, import_react26.useEffect)(() => {
    if (!isOpen)
      return;
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(dialog.querySelectorAll(focusableSelector)).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
    dialog.focus();
    const handleKeyDown = (e) => {
      if (e.key !== "Tab")
        return;
      const focusable = getFocusable();
      if (focusable.length === 0)
        return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);
  if (!isOpen)
    return null;
  const backdropZIndex = isStackedBackground ? zIndex - 2 : zIndex;
  const dialogZIndex = isStackedBackground ? zIndex - 1 : zIndex + 1;
  const handleBackdropClick = closeOnBackdropClick && showCloseButton ? handleClose : void 0;
  const modalContent = /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "modal-root", children: [
    !isStackedBackground && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      "div",
      {
        className: `modal-backdrop ${isExiting ? "modal-backdrop--exiting" : "modal-backdrop--entering"}`,
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "var(--color-bg-overlay, rgba(0, 0, 0, 0.5))",
          zIndex: backdropZIndex,
          pointerEvents: "auto"
        },
        onClick: handleBackdropClick,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      "div",
      {
        ref: dialogRef,
        className: "modal",
        id,
        tabIndex: -1,
        "aria-labelledby": !hideHeader ? `${id}Label` : void 0,
        "aria-modal": "true",
        role: "dialog",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: dialogZIndex,
          padding: "1rem",
          overflow: "hidden",
          pointerEvents: "auto"
        },
        onClick: !isStackedBackground ? handleBackdropClick : void 0,
        children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          "div",
          {
            className: `modal-dialog ${sizeClass} ${animClass} ${isExiting ? "modal-dialog--exiting" : "modal-dialog--entering"}`,
            style: {
              margin: 0,
              maxHeight: "calc(100vh - 2rem)",
              width: "100%",
              maxWidth: (_b = modalSizeWidths[size]) != null ? _b : "480px",
              display: "flex",
              flexDirection: "column",
              pointerEvents: "auto",
              animationDuration: `${animationDuration}ms`
            },
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
              "div",
              {
                className: `modal-content ${className}`.trim(),
                style: {
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "100%",
                  overflow: "hidden",
                  background: "var(--color-bg-surface, #fff)",
                  borderRadius: "var(--radius-lg, 8px)",
                  boxShadow: "var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.12))"
                },
                children: [
                  !hideHeader && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
                    "div",
                    {
                      className: "modal-header",
                      style: {
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "1rem",
                        flexShrink: 0,
                        padding: "1rem 1.25rem",
                        borderBottom: "1px solid var(--color-border-subtle, var(--color-mist-60))"
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
                          "span",
                          {
                            id: `${id}Label`,
                            className: "modal-title fw-semibold",
                            style: { flex: 1, fontSize: "1.125rem", color: "var(--color-text-primary, #333)" },
                            children: [
                              titleIcon && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                                Icon_default,
                                {
                                  src: titleIcon,
                                  width: titleIconSize != null ? titleIconSize : 24,
                                  height: titleIconSize != null ? titleIconSize : 24,
                                  className: "me-2",
                                  preserveColors: true
                                }
                              ),
                              title
                            ]
                          }
                        ),
                        showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                          Button_default,
                          {
                            variant: "link",
                            onClick: handleClose,
                            icon: close_default,
                            size: "sm",
                            style: { flexShrink: 0, marginTop: "-0.25rem" },
                            "aria-label": "Close dialog"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                    "div",
                    {
                      className: "modal-body",
                      style: {
                        overflowY: "auto",
                        overflowX: "hidden",
                        flex: 1,
                        minHeight: 0,
                        padding: "1rem 1.25rem"
                      },
                      children
                    }
                  ),
                  !hideFooter && onConfirm && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
                    "div",
                    {
                      className: "modal-footer",
                      style: {
                        flexShrink: 0,
                        display: "flex",
                        gap: "0.75rem",
                        justifyContent: "flex-end",
                        padding: "1rem 1.25rem",
                        borderTop: "1px solid var(--color-border-subtle, var(--color-mist-60))"
                      },
                      children: [
                        showCancel && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                          Button_default,
                          {
                            variant: cancelButtonVariant,
                            size: "md",
                            onClick: handleClose,
                            textColor: cancelButtonColor,
                            backgroundColor: cancelButtonBackground,
                            borderColor: cancelButtonBorder,
                            children: cancelText
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                          Button_default,
                          {
                            variant: confirmButtonVariant,
                            size: confirmButtonVariant === "primary" ? "lg" : "md",
                            onClick: onConfirm,
                            disabled: confirmDisabled,
                            textColor: confirmButtonColor,
                            backgroundColor: confirmButtonBackground,
                            borderColor: confirmButtonBorder,
                            children: confirmText
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            )
          }
        )
      }
    )
  ] });
  return typeof document !== "undefined" ? (0, import_react_dom3.createPortal)(modalContent, document.body) : null;
}

// src/components/molecules/AlertDialog/AlertDialog.config.ts
var alertDialogVariantConfig = {
  info: {
    icon: "\u2139",
    iconColor: "#0ea5e9",
    bgColor: "rgba(14, 165, 233, 0.1)"
  },
  success: {
    icon: "\u2713",
    iconColor: "#22c55e",
    bgColor: "rgba(34, 197, 94, 0.1)"
  },
  warning: {
    icon: "\u26A0",
    iconColor: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)"
  },
  error: {
    icon: "\u2715",
    iconColor: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)"
  }
};

// src/components/molecules/AlertDialog/AlertDialogIcons.tsx
var import_jsx_runtime30 = require("react/jsx-runtime");
var iconSize = 56;
function SuccessIconSvg({ animated, color = "#22c55e" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--success" : "",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("circle", { cx: "28", cy: "28", r: "26", fill: `${color}20` }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          "path",
          {
            className: animated ? "alert-dialog-checkmark" : "",
            d: "M16 28l8 8 16-16",
            stroke: color,
            strokeWidth: "3",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none"
          }
        )
      ]
    }
  );
}
function ErrorIconSvg({ animated, color = "#ef4444" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--error" : "",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("circle", { cx: "28", cy: "28", r: "26", fill: `${color}20` }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("path", { d: "M28 18v14", stroke: color, strokeWidth: "3", strokeLinecap: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("circle", { cx: "28", cy: "38", r: "2.5", fill: color })
      ]
    }
  );
}
function WarningIconSvg({ animated, color = "#f59e0b" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 56 56",
      fill: "none",
      className: animated ? "alert-dialog-svg--warning" : "",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
          "path",
          {
            d: "M28 12L44 42H12L28 12z",
            fill: `${color}20`,
            stroke: color,
            strokeWidth: "2",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("path", { d: "M28 22v10", stroke: color, strokeWidth: "2.5", strokeLinecap: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("circle", { cx: "28", cy: "38", r: "2", fill: color })
      ]
    }
  );
}

// src/components/molecules/AlertDialog/index.tsx
var import_jsx_runtime31 = require("react/jsx-runtime");
function VariantIcon({
  variant,
  animated
}) {
  const config = alertDialogVariantConfig[variant];
  const color = config.iconColor;
  if (variant === "success") {
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(SuccessIconSvg, { animated, color });
  }
  if (variant === "error") {
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(ErrorIconSvg, { animated, color });
  }
  if (variant === "warning") {
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(WarningIconSvg, { animated, color });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    "span",
    {
      className: animated ? "alert-dialog-icon--animated" : "",
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: config.bgColor,
        color: config.iconColor,
        fontSize: 24
      },
      children: config.icon
    }
  );
}
function AlertDialog({
  isOpen,
  onClose,
  title,
  description,
  variant = "info",
  iconAnimated = true,
  icon: customIcon,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  showCancel = false,
  destructive = false,
  confirmDisabled = false,
  size = "md",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  zIndex = 400,
  confirmButtonVariant,
  confirmButtonColor,
  confirmButtonBackground,
  confirmButtonBorder,
  cancelButtonVariant = "outlineSecondary",
  cancelButtonColor,
  cancelButtonBackground,
  cancelButtonBorder
}) {
  const sizeMap = { sm: "sm", md: "md", lg: "lg" };
  const handleConfirm = () => {
    onConfirm == null ? void 0 : onConfirm();
    onClose();
  };
  const handleCancel = () => {
    onCancel == null ? void 0 : onCancel();
    onClose();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
    Modal,
    {
      isOpen,
      onClose,
      title: "",
      size: sizeMap[size],
      hideFooter: true,
      hideHeader: true,
      showCloseButton: false,
      closeOnBackdropClick,
      closeOnEscape,
      zIndex,
      animation: "scale",
      children: /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
        "div",
        {
          role: "alertdialog",
          "aria-labelledby": "alert-dialog-title",
          "aria-describedby": "alert-dialog-desc",
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0.5rem 0"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { style: { marginBottom: "1.25rem", display: "flex", justifyContent: "center" }, children: customIcon != null ? customIcon : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(VariantIcon, { variant, animated: iconAnimated }) }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              "h2",
              {
                id: "alert-dialog-title",
                style: {
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary, #333)"
                },
                children: title
              }
            ),
            description && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              "p",
              {
                id: "alert-dialog-desc",
                style: {
                  margin: "0.5rem 0 1.25rem",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-secondary, #666)",
                  lineHeight: 1.5
                },
                children: description
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "center",
                  flexWrap: "wrap"
                },
                children: [
                  showCancel && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                    Button_default,
                    {
                      variant: cancelButtonVariant,
                      size: "md",
                      onClick: handleCancel,
                      textColor: cancelButtonColor,
                      backgroundColor: cancelButtonBackground,
                      borderColor: cancelButtonBorder,
                      children: cancelText
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                    Button_default,
                    {
                      variant: confirmButtonVariant != null ? confirmButtonVariant : destructive ? "outlinePrimary" : "primary",
                      size: destructive ? "md" : "lg",
                      onClick: handleConfirm,
                      disabled: confirmDisabled,
                      textColor: confirmButtonColor,
                      backgroundColor: confirmButtonBackground,
                      borderColor: confirmButtonBorder,
                      children: confirmText
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}

// src/components/molecules/Table/Table.tsx
var import_react28 = require("react");

// src/components/atoms/TextInputSearch/index.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
var TextInputSearch = ({
  id = "search",
  leftIcon = search_default,
  leftIconHeight = 18,
  leftIconWidth = 18,
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
  showClearButton = false,
  showSearchButton = false,
  searchButtonLabel = "Search",
  suffix
}) => {
  const errorId = `${id}-error`;
  const labelId = `${id}-label`;
  const resolvedSize = size || "sm";
  const handleSearch = () => {
    if (disabled)
      return;
    onSearch == null ? void 0 : onSearch(value);
  };
  const searchEnterButton = resolvedSize === "lg" ? { fontSize: "var(--text-body-size)", paddingX: 12 } : resolvedSize === "md" ? { fontSize: "var(--text-body-size)", paddingX: 10 } : { fontSize: "var(--text-small-size)", paddingX: 8 };
  const suffixForInput = suffix !== void 0 ? suffix : showSearchButton ? /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    "button",
    {
      type: "button",
      onClick: handleSearch,
      disabled,
      className: "shrink-0 font-medium text-[var(--color-brand-primary)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary-focus-ring,var(--color-brand-primary))]",
      style: {
        all: "unset",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        boxSizing: "border-box",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: searchEnterButton.fontSize,
        lineHeight: 1.2,
        paddingLeft: searchEnterButton.paddingX,
        paddingRight: searchEnterButton.paddingX,
        whiteSpace: "nowrap"
      },
      children: searchButtonLabel
    }
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
    "div",
    {
      className: containerClassName.trim(),
      style: {
        width: fullWidth ? "100%" : "auto",
        ...containerStyle
      },
      role: "search",
      "aria-labelledby": labelId,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("label", { id: labelId, htmlFor: id, className: "visually-hidden", children: ariaLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          TextInput_default,
          {
            id,
            type: "search",
            placeholder,
            validation: "headerSearch",
            value,
            onChange,
            errorMessage,
            size: resolvedSize,
            fullWidth,
            disabled,
            variant: "outlined",
            rounded: "3",
            allowClear: showClearButton,
            prefix: leftIcon ? /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
              Icon_default,
              {
                src: leftIcon,
                height: leftIconHeight,
                width: leftIconWidth,
                color: leftIconColor,
                "aria-hidden": "true"
              }
            ) : void 0,
            suffix: suffixForInput,
            onPressEnter: handleSearch,
            ariaLabel,
            "aria-invalid": !!errorMessage,
            "aria-describedby": errorMessage ? errorId : void 0,
            className
          }
        ),
        errorMessage && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { id: errorId, role: "alert", className: "visually-hidden", children: errorMessage })
      ]
    }
  );
};
var TextInputSearch_default = TextInputSearch;

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

// src/components/molecules/Table/Table.utils.ts
var cls15 = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// src/components/molecules/Table/parts/TableHeader.tsx
var import_jsx_runtime33 = require("react/jsx-runtime");
function TableHeader({
  expandable,
  selectionMode,
  allSelected,
  visibleColumns,
  sortState,
  onSort,
  onSelectAll,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("thead", { className, children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("tr", { children: [
    expandable && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("th", { scope: "col", style: { width: 40 }, "aria-label": "Expand" }),
    selectionMode === "multiple" && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("th", { scope: "col", style: { width: 48 }, "aria-label": "Select all", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
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
    selectionMode === "single" && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("th", { scope: "col", style: { width: 48 }, "aria-label": "Select" }),
    visibleColumns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
      "th",
      {
        scope: "col",
        className: cls15(
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
          col.sortable && sortState.key === col.key && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "table-sort-icon", "aria-hidden": true, children: sortState.dir === "asc" ? " \u25B2" : sortState.dir === "desc" ? " \u25BC" : "" })
        ]
      },
      col.key
    ))
  ] }) });
}

// src/components/molecules/Table/parts/TableRow.tsx
var import_react27 = __toESM(require("react"));

// src/components/molecules/Table/parts/TableCell.tsx
var import_jsx_runtime34 = require("react/jsx-runtime");
function TableCell({ align = "left", children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
    "td",
    {
      className: cls15(
        align === "center" && "text-center",
        align === "right" && "text-end"
      ),
      children
    }
  );
}

// src/components/molecules/Table/parts/TableRow.tsx
var import_jsx_runtime35 = require("react/jsx-runtime");
function TableRow({
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
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(import_react27.default.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)(
      "tr",
      {
        className: cls15(selected && "table-row-selected"),
        onClick: () => {
          onRowClick == null ? void 0 : onRowClick(row, rowIndex);
          if (selectionMode === "single")
            onToggleSelect(rowKeyValue, row);
        },
        style: { cursor: hover || onRowClick ? "pointer" : void 0 },
        children: [
          expandable && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("td", { style: { width: 40 }, children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            "button",
            {
              type: "button",
              className: cls15("table-expand-btn", isExpanded && "table-expand-btn-expanded"),
              "aria-expanded": isExpanded,
              "aria-label": isExpanded ? "Collapse row details" : "Expand row details",
              onClick: (e) => {
                e.stopPropagation();
                onToggleExpand(rowKeyValue);
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("span", { className: "table-expand-btn-icon", "aria-hidden": true, children: "\u25B6" })
            }
          ) }),
          selectionMode === "multiple" && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("td", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
          selectionMode === "single" && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("td", { className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
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
          visibleColumns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(TableCell, { align: col.align, children: renderCell(col, row, rowIndex) }, col.key))
        ]
      }
    ),
    expandable && isExpanded && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("tr", { className: "table-expanded-row", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
      "td",
      {
        colSpan: visibleColumns.length + (selectionMode !== "none" ? 1 : 0) + (expandable ? 1 : 0),
        children: expandable.expandedRowRender(row, rowIndex)
      }
    ) })
  ] });
}

// src/components/molecules/Table/Table.tsx
var import_jsx_runtime36 = require("react/jsx-runtime");
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
  const [searchValue, setSearchValue] = (0, import_react28.useState)("");
  const [sortState, setSortState] = (0, import_react28.useState)({ key: "", dir: null });
  const [currentPage, setCurrentPage] = (0, import_react28.useState)(1);
  const paginationConfig = typeof pagination === "object" ? pagination : {};
  const pageSizeOptions = (_a = paginationConfig.pageSizeOptions) != null ? _a : [5, 10, 15, 25, 50];
  const [itemsPerPage, setItemsPerPage] = (0, import_react28.useState)((_b = paginationConfig.pageSize) != null ? _b : 10);
  const selectedSet = (0, import_react28.useMemo)(() => {
    const keys = selectedRowKeys != null ? selectedRowKeys : selectedRow;
    if (!keys)
      return /* @__PURE__ */ new Set();
    const arr = Array.isArray(keys) ? keys : [keys];
    return new Set(arr);
  }, [selectedRowKeys, selectedRow]);
  const expandedSet = (0, import_react28.useMemo)(() => {
    if (!(expandable == null ? void 0 : expandable.expandedRowKeys))
      return /* @__PURE__ */ new Set();
    return new Set(expandable.expandedRowKeys);
  }, [expandable == null ? void 0 : expandable.expandedRowKeys]);
  const visibleColumns = (0, import_react28.useMemo)(() => columns.filter((c) => !c.hidden), [columns]);
  const filteredData = (0, import_react28.useMemo)(() => {
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
  const sortedData = (0, import_react28.useMemo)(() => {
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
  (0, import_react28.useEffect)(() => {
    setCurrentPage((p) => p > totalPages ? totalPages : p < 1 ? 1 : p);
  }, [totalPages]);
  const handleSort = (0, import_react28.useCallback)(
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
  const handleSelectRow = (0, import_react28.useCallback)(
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
  const handleSelectAll = (0, import_react28.useCallback)(
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
  const handleExpand = (0, import_react28.useCallback)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(TextView_default, { as: "span", children: val != null ? String(val) : "" });
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
  const tableContent = /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
    "table",
    {
      className: cls15(
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
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
          TableHeader,
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
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("tbody", { className: "table-tbody", children: shouldUseSkeleton ? Array.from({ length: Math.max(1, loadingRows) }).map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("tr", { className: "table-skeleton-row", "aria-hidden": "true", children: Array.from({ length: visibleColumns.length + extraColumnsCount }).map((__, cellIdx) => /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { className: "table-skeleton-line" }) }, `table-skeleton-cell-${idx}-${cellIdx}`)) }, `table-skeleton-row-${idx}`)) : paginatedData.map((row, idx) => {
          const rk = getRowKey(row, startIndex + idx, rowKey);
          return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
            TableRow,
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
        footer && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("tr", { children: footer }) })
      ]
    }
  );
  const showSearchBar = searchable && showSearch !== false;
  const showPagination = Boolean(pagination) && totalItems > 0;
  const searchMaxWidth = (_c = searchProps == null ? void 0 : searchProps.maxWidth) != null ? _c : 280;
  const searchSize = (_d = searchProps == null ? void 0 : searchProps.size) != null ? _d : "sm";
  const searchBar = showSearchBar && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { style: { marginBottom: 0, maxWidth: typeof searchMaxWidth === "number" ? `${searchMaxWidth}px` : searchMaxWidth, flex: toolbarRight ? "0 1 auto" : "1 1 auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
  const toolbarContent = toolbar != null ? toolbar : hasToolbar ? /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { className: "table-toolbar", children: [
    leftContent && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { className: "table-toolbar-left", children: leftContent }),
    toolbarRight && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { className: "table-toolbar-right", children: toolbarRight })
  ] }) : null;
  const wrapperClass = cls15("table-wrapper", theme === "dark" && "table-theme-dark");
  const scrollWrapperStyle = (scroll == null ? void 0 : scroll.y) ? {
    maxHeight: typeof scroll.y === "number" ? `${scroll.y}px` : scroll.y,
    overflowY: "auto",
    overflowX: "auto"
  } : { overflowX: "auto" };
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { className: wrapperClass, style: { position: "relative" }, "aria-busy": loading, children: [
    toolbarContent,
    showLoadingOverlay && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
      "div",
      {
        className: "table-loading-overlay",
        role: "status",
        "aria-live": "polite",
        "aria-busy": "true",
        children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(TextView_default, { children: "Loading..." })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
      "div",
      {
        className: cls15(stickyHeader && "table-scroll-body", "table-scroll-wrapper"),
        style: scrollWrapperStyle,
        role: "region",
        "aria-label": "Data table",
        children: sortedData.length === 0 && !loading ? emptyComponent != null ? emptyComponent : /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { className: "table-empty", children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(TextView_default, { as: "p", children: emptyText }) }) : tableContent
      }
    ),
    showPagination && totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { className: "table-pagination", children: [
      /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { className: "table-pagination-nav", children: [
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
          (page, i) => page === "..." ? /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("span", { className: "table-pagination-ellipsis", children: "\u2026" }, `ellipsis-${i}`) : /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
            "button",
            {
              type: "button",
              className: cls15(
                "table-pagination-page",
                currentPage === page && "active"
              ),
              onClick: () => setCurrentPage(page),
              children: page
            },
            page
          )
        ),
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(TextView_default, { as: "small", style: { color: "var(--color-text-secondary, #666)" }, children: "Show" }),
        /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("div", { style: { minWidth: 70 }, children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(TextView_default, { as: "small", style: { color: "var(--color-text-secondary, #666)" }, children: [
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
  return /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(TableInner, { ...props });
}

// src/components/molecules/Table/TablePrimitives.tsx
var import_react29 = require("react");
var import_jsx_runtime37 = require("react/jsx-runtime");
var TableRoot = (0, import_react29.forwardRef)(function TableRoot2({ className, containerClassName, children, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: cls15("table-ui-wrap", containerClassName), children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("table", { ref, className: cls15("table-ui", className), ...rest, children }) });
});
TableRoot.displayName = "TableRoot";
var TableCaption = (0, import_react29.forwardRef)(
  function TableCaption2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("caption", { ref, className: cls15("table-ui-caption", className), ...rest });
  }
);
TableCaption.displayName = "TableCaption";
var TableHeader2 = (0, import_react29.forwardRef)(
  function TableHeader3({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("thead", { ref, className: cls15("table-ui-thead", className), ...rest });
  }
);
TableHeader2.displayName = "TableHeader";
var TableBody = (0, import_react29.forwardRef)(function TableBody2({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("tbody", { ref, className: cls15("table-ui-tbody", className), ...rest });
});
TableBody.displayName = "TableBody";
var TableFooter = (0, import_react29.forwardRef)(
  function TableFooter2({ className, ...rest }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("tfoot", { ref, className: cls15("table-ui-tfoot", className), ...rest });
  }
);
TableFooter.displayName = "TableFooter";
var TableRow2 = (0, import_react29.forwardRef)(function TableRow3({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("tr", { ref, className: cls15("table-ui-tr", className), ...rest });
});
TableRow2.displayName = "TableRow";
var TableHead = (0, import_react29.forwardRef)(function TableHead2({ className, scope = "col", ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("th", { ref, className: cls15("table-ui-th", className), scope, ...rest });
});
TableHead.displayName = "TableHead";
var TableCell2 = (0, import_react29.forwardRef)(function TableCell3({ className, ...rest }, ref) {
  return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("td", { ref, className: cls15("table-ui-td", className), ...rest });
});
TableCell2.displayName = "TableCell";

// src/components/molecules/Table/index.tsx
var Table2 = Object.assign(Table, {
  Root: TableRoot,
  Caption: TableCaption,
  Header: TableHeader2,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow2,
  Head: TableHead,
  Cell: TableCell2
});
var Table_default = Table2;

// src/components/molecules/AppSidebar/index.tsx
var import_react33 = __toESM(require("react"));
var import_react_dom5 = require("react-dom");

// src/components/molecules/AppSidebar/AppSidebar.chrome.ts
var TOKENS_CSS_VARS = {
  noir0: "--noir-0",
  noir1: "--noir-1",
  noir2: "--noir-2",
  noir3: "--noir-3",
  sidebarText: "--sidebar-text",
  sidebarTextMuted: "--sidebar-text-muted",
  sidebarHover: "--sidebar-hover",
  sidebarActiveBg: "--sidebar-active-bg",
  sidebarActiveTint: "--sidebar-active-tint",
  sidebarFocus: "--sidebar-focus",
  sidebarBorder: "--sidebar-border",
  sidebarBorderStrong: "--sidebar-border-strong",
  sidebarNavIcon: "--sidebar-nav-icon",
  sidebarNavIconActive: "--sidebar-nav-icon-active",
  sidebarUtilityIcon: "--sidebar-utility-icon",
  sidebarCreateDash: "--sidebar-create-dash"
};
function mergeSidebarTokensStyle(tokens, base) {
  if (!tokens || Object.keys(tokens).length === 0) {
    return base != null ? base : {};
  }
  const vars = {};
  Object.entries(tokens).forEach(([key, val]) => {
    if (val === void 0 || val === "")
      return;
    const cssVar = TOKENS_CSS_VARS[key];
    if (cssVar)
      vars[cssVar] = val;
  });
  return { ...vars, ...base };
}

// src/components/molecules/AppSidebar/AppSidebar.utils.tsx
var import_react30 = __toESM(require("react"));
var import_jsx_runtime38 = require("react/jsx-runtime");
function cls16(...parts) {
  return parts.filter(Boolean).join(" ");
}
var lockSvg = /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: [
  /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("rect", { x: "5", y: "11", width: "14", height: "10", rx: "2", ry: "2" }),
  /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("path", { d: "M8 11V7a4 4 0 0 1 8 0v4" })
] });
var checkSvg = /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("path", { d: "M20 6L9 17l-5-5" }) });
function renderTrailingIcon(trailing, size) {
  if (trailing == null || trailing === "none")
    return null;
  if (trailing === "lock") {
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Icon_default, { src: lockSvg, decorative: true, width: size, height: size, color: "currentColor", className: "app-sidebar__trailing-icon" });
  }
  if (trailing === "check") {
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Icon_default, { src: checkSvg, decorative: true, width: size, height: size, color: "currentColor", className: "app-sidebar__trailing-icon" });
  }
  if (import_react30.default.isValidElement(trailing)) {
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "app-sidebar__trailing-custom", children: trailing });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(Icon_default, { src: trailing, decorative: true, width: size, height: size, className: "app-sidebar__trailing-icon" });
}

// src/components/molecules/AppSidebar/AppSidebar.tree.ts
function normalizeSections(sections, items) {
  if (sections && sections.length > 0)
    return sections;
  if (items && items.length > 0) {
    return [
      {
        id: "_flat-primary",
        tier: "primary",
        grouping: "spacing",
        items
      }
    ];
  }
  return [];
}
function findParentsInItems(items, targetId, chain) {
  var _a;
  for (const it of items) {
    if (it.id === targetId)
      return chain;
    if ((_a = it.children) == null ? void 0 : _a.length) {
      const hit = findParentsInItems(it.children, targetId, [...chain, it.id]);
      if (hit)
        return hit;
    }
  }
  return null;
}
function findParentIdsForActiveItem(sections, targetId) {
  for (const s of sections) {
    const p = findParentsInItems(s.items, targetId, []);
    if (p)
      return p;
  }
  return [];
}
function collectDefaultExpandedIds(items, out) {
  var _a, _b;
  for (const it of items) {
    if (((_a = it.children) == null ? void 0 : _a.length) && it.defaultExpanded)
      out.add(it.id);
    if ((_b = it.children) == null ? void 0 : _b.length)
      collectDefaultExpandedIds(it.children, out);
  }
}
function getInitialExpandedSet(sections) {
  const s = /* @__PURE__ */ new Set();
  for (const sec of sections)
    collectDefaultExpandedIds(sec.items, s);
  return s;
}

// src/components/molecules/AppSidebar/AppSidebarTooltipHost.tsx
var import_react31 = __toESM(require("react"));
var import_react_dom4 = require("react-dom");
var import_jsx_runtime39 = require("react/jsx-runtime");
function AppSidebarTooltipHost({ collapsed, label, children }) {
  const tipId = (0, import_react31.useId)();
  const [visible, setVisible] = (0, import_react31.useState)(false);
  const [coords, setCoords] = (0, import_react31.useState)({ top: 0, left: 0 });
  const hostRef = (0, import_react31.useRef)(null);
  const position = (0, import_react31.useCallback)(() => {
    const el = hostRef.current;
    if (!el)
      return;
    const r = el.getBoundingClientRect();
    const top = r.top + r.height / 2;
    const left = r.right + 8;
    setCoords((prev) => {
      if (Math.abs(prev.top - top) < 0.5 && Math.abs(prev.left - left) < 0.5)
        return prev;
      return { top, left };
    });
  }, []);
  (0, import_react31.useLayoutEffect)(() => {
    if (!visible || !collapsed)
      return;
    position();
    const onScroll = () => position();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", position);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", position);
    };
  }, [visible, collapsed, position]);
  if (!collapsed) {
    return children;
  }
  const child = import_react31.default.cloneElement(children, {
    "aria-describedby": visible ? tipId : void 0
  });
  const tooltip = visible && typeof document !== "undefined" ? (0, import_react_dom4.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime39.jsx)(
      "span",
      {
        id: tipId,
        role: "tooltip",
        className: "app-sidebar__floating-tip",
        style: {
          position: "fixed",
          top: coords.top,
          left: coords.left,
          transform: "translateY(-50%)",
          zIndex: 99999
        },
        children: label
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
    "span",
    {
      ref: hostRef,
      className: "app-sidebar__tip-host",
      onMouseEnter: () => setVisible(true),
      onMouseLeave: () => setVisible(false),
      onFocusCapture: () => setVisible(true),
      onBlurCapture: () => setVisible(false),
      children: [
        child,
        tooltip
      ]
    }
  );
}

// src/components/molecules/AppSidebar/AppSidebar.persist.ts
function readAppSidebarPersist(key) {
  if (!key || typeof window === "undefined")
    return null;
  try {
    return JSON.parse(window.localStorage.getItem(key) || "null");
  } catch (e) {
    return null;
  }
}
function writeAppSidebarPersist(key, collapsed, expanded) {
  try {
    window.localStorage.setItem(key, JSON.stringify({ collapsed, expanded }));
  } catch (e) {
  }
}

// src/components/molecules/AppSidebar/AppSidebar.responsive.ts
var import_react32 = require("react");
function useBelowWidth(collapseBelowWidth, enabled) {
  const q = `(max-width: ${Math.max(0, collapseBelowWidth - 1)}px)`;
  return (0, import_react32.useSyncExternalStore)(
    (onStoreChange) => {
      if (typeof window === "undefined" || !enabled) {
        return () => {
        };
      }
      const mq = window.matchMedia(q);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => {
      if (!enabled || typeof window === "undefined")
        return false;
      return window.matchMedia(q).matches;
    },
    () => false
  );
}

// src/components/molecules/AppSidebar/index.tsx
var import_jsx_runtime40 = require("react/jsx-runtime");
var NAV_ICON = 24;
var TRAIL_ICON = 24;
var FOOTER_ACTION_ICON = 18;
var chevronRailLeft = /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("path", { d: "M15 6l-6 6 6 6" }) });
var chevronRailRight = /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("path", { d: "M9 6l6 6-6 6" }) });
var chevronNested = /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("path", { d: "M9 6l6 6-6 6" }) });
function renderItemIcon(icon) {
  if (icon == null)
    return null;
  if (import_react33.default.isValidElement(icon)) {
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "app-sidebar__item-icon", children: icon });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "app-sidebar__item-icon", children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(Icon_default, { src: icon, decorative: true, width: NAV_ICON, height: NAV_ICON, color: "currentColor" }) });
}
function AppSidebar({
  sections: sectionsProp,
  items: itemsProp,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  showCollapseToggle = true,
  collapseToggleLabel = "Toggle sidebar",
  widthExpanded = 320,
  widthCollapsed = 64,
  fixed = false,
  responsive = true,
  collapseBelowWidth = 1024,
  drawerOverlayBelowWidth = 768,
  publishLayoutOffsetVar = true,
  closeOnNavigateWhenNarrow = true,
  backdropCloseLabel = "Close navigation",
  lockBodyScrollWhenDrawer = true,
  header,
  activeItemId: activeItemIdProp,
  defaultActiveItemId = null,
  onItemSelect,
  navLabel = "Main navigation",
  user,
  footerActions,
  maxFooterActions,
  footerLayout = "profileFirst",
  footerSlot,
  tokens,
  classNames,
  persistenceKey,
  expandedIds: expandedIdsProp,
  defaultExpandedIds,
  onExpandedChange,
  className,
  style,
  ...rest
}) {
  var _a, _b, _c;
  const baseId = (0, import_react33.useId)().replace(/:/g, "");
  const panelId = `app-sidebar-panel-${baseId}`;
  const navRef = (0, import_react33.useRef)(null);
  const drawerFocusSentinel = (0, import_react33.useRef)(false);
  const prevNarrowRef = (0, import_react33.useRef)(null);
  const isNarrow = useBelowWidth(collapseBelowWidth, responsive);
  const isMobileDrawerViewport = useBelowWidth(drawerOverlayBelowWidth, responsive);
  const sections = (0, import_react33.useMemo)(
    () => normalizeSections(sectionsProp, itemsProp),
    [sectionsProp, itemsProp]
  );
  const visibleFooterActions = (0, import_react33.useMemo)(() => {
    if (!(footerActions == null ? void 0 : footerActions.length))
      return [];
    if (maxFooterActions == null)
      return footerActions;
    return footerActions.slice(0, Math.max(0, maxFooterActions));
  }, [footerActions, maxFooterActions]);
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = (0, import_react33.useState)(() => {
    const pr = readAppSidebarPersist(persistenceKey);
    if ((pr == null ? void 0 : pr.collapsed) !== void 0)
      return pr.collapsed;
    return defaultCollapsed;
  });
  const collapsed = collapsedProp !== void 0 ? collapsedProp : uncontrolledCollapsed;
  const showDrawerOverlay = Boolean(
    fixed && responsive && isNarrow && !collapsed && isMobileDrawerViewport
  );
  const useViewportFixedChrome = Boolean(fixed);
  const sidebarWidthPx = collapsed ? widthCollapsed : widthExpanded;
  (0, import_react33.useLayoutEffect)(() => {
    if (typeof document === "undefined")
      return;
    const root = document.documentElement;
    if (!publishLayoutOffsetVar) {
      root.style.removeProperty("--app-sidebar-offset");
      return;
    }
    let offsetPx = 0;
    if (fixed) {
      if (!isNarrow) {
        offsetPx = sidebarWidthPx;
      } else if (isMobileDrawerViewport) {
        offsetPx = collapsed ? widthCollapsed : 0;
      } else {
        offsetPx = sidebarWidthPx;
      }
    }
    root.style.setProperty("--app-sidebar-offset", `${offsetPx}px`);
    return () => {
      root.style.removeProperty("--app-sidebar-offset");
    };
  }, [
    publishLayoutOffsetVar,
    fixed,
    isNarrow,
    isMobileDrawerViewport,
    collapsed,
    sidebarWidthPx,
    widthCollapsed
  ]);
  (0, import_react33.useLayoutEffect)(() => {
    if (!responsive || collapsedProp !== void 0)
      return;
    if (prevNarrowRef.current === null) {
      prevNarrowRef.current = isNarrow;
      if (isNarrow) {
        const pr = readAppSidebarPersist(persistenceKey);
        if ((pr == null ? void 0 : pr.collapsed) === void 0)
          setUncontrolledCollapsed(true);
      }
      return;
    }
    if (isNarrow && !prevNarrowRef.current) {
      setUncontrolledCollapsed(true);
    }
    prevNarrowRef.current = isNarrow;
  }, [isNarrow, responsive, collapsedProp, persistenceKey]);
  const [uncontrolledActive, setUncontrolledActive] = (0, import_react33.useState)(defaultActiveItemId);
  const activeItemId = activeItemIdProp !== void 0 ? activeItemIdProp : uncontrolledActive;
  const [internalExpanded, setInternalExpanded] = (0, import_react33.useState)(() => {
    var _a2, _b2;
    const s = new Set(getInitialExpandedSet(sections));
    defaultExpandedIds == null ? void 0 : defaultExpandedIds.forEach((id) => s.add(id));
    (_b2 = (_a2 = readAppSidebarPersist(persistenceKey)) == null ? void 0 : _a2.expanded) == null ? void 0 : _b2.forEach((id) => s.add(id));
    return s;
  });
  const expandedSet = (0, import_react33.useMemo)(() => {
    if (expandedIdsProp != null)
      return new Set(expandedIdsProp);
    return internalExpanded;
  }, [expandedIdsProp, internalExpanded]);
  (0, import_react33.useEffect)(() => {
    if (!activeItemId)
      return;
    const parents = findParentIdsForActiveItem(sections, activeItemId);
    if (parents.length === 0)
      return;
    if (expandedIdsProp != null) {
      const next = new Set(expandedIdsProp);
      let changed = false;
      parents.forEach((id) => {
        if (!next.has(id)) {
          next.add(id);
          changed = true;
        }
      });
      if (changed)
        onExpandedChange == null ? void 0 : onExpandedChange([...next]);
      return;
    }
    setInternalExpanded((prev) => {
      const n = new Set(prev);
      let changed = false;
      parents.forEach((id) => {
        if (!n.has(id)) {
          n.add(id);
          changed = true;
        }
      });
      return changed ? n : prev;
    });
  }, [activeItemId, sections, expandedIdsProp, onExpandedChange]);
  (0, import_react33.useEffect)(() => {
    if (!persistenceKey)
      return;
    if (typeof window === "undefined")
      return;
    const coll = collapsedProp !== void 0 ? collapsedProp : uncontrolledCollapsed;
    const ex = expandedIdsProp != null ? expandedIdsProp : [...internalExpanded];
    writeAppSidebarPersist(persistenceKey, coll, ex);
  }, [
    persistenceKey,
    collapsedProp,
    uncontrolledCollapsed,
    expandedIdsProp,
    internalExpanded
  ]);
  const setCollapsed = (0, import_react33.useCallback)(
    (next) => {
      if (collapsedProp === void 0)
        setUncontrolledCollapsed(next);
      onCollapsedChange == null ? void 0 : onCollapsedChange(next);
    },
    [collapsedProp, onCollapsedChange]
  );
  (0, import_react33.useEffect)(() => {
    if (!showDrawerOverlay || !lockBodyScrollWhenDrawer || typeof document === "undefined")
      return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showDrawerOverlay, lockBodyScrollWhenDrawer]);
  (0, import_react33.useEffect)(() => {
    if (!showDrawerOverlay || typeof document === "undefined")
      return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setCollapsed(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showDrawerOverlay, setCollapsed]);
  (0, import_react33.useLayoutEffect)(() => {
    if (!showDrawerOverlay) {
      drawerFocusSentinel.current = false;
      return;
    }
    if (drawerFocusSentinel.current)
      return;
    drawerFocusSentinel.current = true;
    const id = window.requestAnimationFrame(() => {
      var _a2;
      const panel = (_a2 = navRef.current) == null ? void 0 : _a2.closest(".app-sidebar");
      if (!panel)
        return;
      const first = panel.querySelector(
        "a.app-sidebar__link, button.app-sidebar__link, button.app-sidebar__parent, button.app-sidebar__create"
      );
      first == null ? void 0 : first.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [showDrawerOverlay]);
  const toggleExpand = (0, import_react33.useCallback)(
    (id) => {
      if (expandedIdsProp != null) {
        const n = new Set(expandedIdsProp);
        if (n.has(id))
          n.delete(id);
        else
          n.add(id);
        onExpandedChange == null ? void 0 : onExpandedChange([...n]);
        return;
      }
      setInternalExpanded((prev) => {
        const n = new Set(prev);
        if (n.has(id))
          n.delete(id);
        else
          n.add(id);
        return n;
      });
    },
    [expandedIdsProp, onExpandedChange]
  );
  const handleSelect = (0, import_react33.useCallback)(
    (item) => {
      var _a2;
      if (item.disabled)
        return;
      if (activeItemIdProp === void 0)
        setUncontrolledActive(item.id);
      onItemSelect == null ? void 0 : onItemSelect(item.id, item);
      (_a2 = item.onClick) == null ? void 0 : _a2.call(item, item.id, item);
      if (closeOnNavigateWhenNarrow && showDrawerOverlay) {
        setCollapsed(true);
      }
    },
    [activeItemIdProp, onItemSelect, closeOnNavigateWhenNarrow, showDrawerOverlay, setCollapsed]
  );
  const width = sidebarWidthPx;
  const renderLeaf = (item, level, opts) => {
    const isActive = activeItemId === item.id;
    const trailing = renderTrailingIcon(item.trailing, TRAIL_ICON);
    const inactiveCls = cls16(
      "app-sidebar__link",
      opts.nested && "app-sidebar__link--nested",
      isActive && "app-sidebar__link--active"
    );
    const inner = /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_jsx_runtime40.Fragment, { children: [
      renderItemIcon(item.icon),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "app-sidebar__item-label", children: item.label }),
      trailing ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        "span",
        {
          className: "app-sidebar__trailing-wrap",
          ...item.trailingLabel ? { role: "img", "aria-label": item.trailingLabel } : { "aria-hidden": true },
          children: trailing
        }
      ) : null
    ] });
    const control = item.href && !item.disabled ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      "a",
      {
        href: item.href,
        className: inactiveCls,
        "aria-current": isActive ? "page" : void 0,
        onClick: (e) => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          handleSelect(item);
        },
        children: inner
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      "button",
      {
        type: "button",
        className: inactiveCls,
        disabled: item.disabled,
        "aria-current": isActive ? "page" : void 0,
        onClick: () => handleSelect(item),
        children: inner
      }
    );
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(AppSidebarTooltipHost, { collapsed, label: item.label, children: control });
  };
  const renderBranch = (item, level) => {
    const hasChildren = !!(item.children && item.children.length > 0);
    const submenuId = `sb-${baseId}-sub-${item.id}`;
    const isOpen = expandedSet.has(item.id);
    const isActive = activeItemId === item.id;
    if (!hasChildren) {
      return renderLeaf(item, level, { nested: level > 0 });
    }
    const trailing = renderTrailingIcon(item.trailing, TRAIL_ICON);
    const parentInner = /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_jsx_runtime40.Fragment, { children: [
      renderItemIcon(item.icon),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "app-sidebar__item-label", children: item.label }),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        "span",
        {
          className: cls16("app-sidebar__chevron", isOpen && "app-sidebar__chevron--open"),
          "aria-hidden": true,
          children: chevronNested
        }
      ),
      trailing ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
        "span",
        {
          className: "app-sidebar__trailing-wrap",
          ...item.trailingLabel ? { role: "img", "aria-label": item.trailingLabel } : { "aria-hidden": true },
          children: trailing
        }
      ) : null
    ] });
    const parentBtn = /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      "button",
      {
        type: "button",
        className: cls16(
          "app-sidebar__parent",
          level > 0 && "app-sidebar__link--nested",
          isActive && "app-sidebar__parent--active"
        ),
        "aria-expanded": isOpen,
        "aria-controls": submenuId,
        disabled: item.disabled,
        onClick: () => {
          if (item.disabled)
            return;
          toggleExpand(item.id);
        },
        children: parentInner
      }
    );
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_jsx_runtime40.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(AppSidebarTooltipHost, { collapsed, label: item.label, children: parentBtn }),
      isOpen && !collapsed ? /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("ul", { id: submenuId, className: "app-sidebar__list app-sidebar__list--nested", role: "list", children: [
        item.children.map((child) => {
          var _a2;
          return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("li", { className: "app-sidebar__item", children: !((_a2 = child.children) == null ? void 0 : _a2.length) ? renderLeaf(child, level + 1, { nested: true }) : renderBranch(child, level + 1) }, child.id);
        }),
        item.createAction ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("li", { className: "app-sidebar__item", children: /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
          "button",
          {
            type: "button",
            className: "app-sidebar__create",
            onClick: item.createAction.onClick,
            children: [
              item.createAction.icon ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "app-sidebar__item-icon", children: import_react33.default.isValidElement(item.createAction.icon) ? item.createAction.icon : /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
                Icon_default,
                {
                  src: item.createAction.icon,
                  decorative: true,
                  width: 20,
                  height: 20,
                  color: "currentColor"
                }
              ) }) : /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { "aria-hidden": true, className: "app-sidebar__item-label", style: { flex: "none", width: 24 }, children: "+" }),
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { children: item.createAction.label })
            ]
          }
        ) }) : null
      ] }) : null
    ] });
  };
  const renderSection = (section, idx) => /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "app-sidebar__section", "data-tier": section.tier, "data-grouping": section.grouping, children: [
    idx > 0 && section.grouping === "divider" ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { role: "separator", className: "app-sidebar__section-divider" }) : null,
    section.grouping === "label" && section.label ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: "app-sidebar__section-label", children: section.label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("ul", { className: "app-sidebar__list", role: "list", children: section.items.map((item) => {
      var _a2;
      return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("li", { className: "app-sidebar__item", children: !((_a2 = item.children) == null ? void 0 : _a2.length) ? renderLeaf(item, 0, {}) : renderBranch(item, 0) }, item.id);
    }) })
  ] }, section.id);
  const roleLine = (_a = user == null ? void 0 : user.role) != null ? _a : user == null ? void 0 : user.description;
  const profileTip = user && collapsed ? [user.name, roleLine].filter(Boolean).join(" \xB7 ") : "";
  let profileWrapped = null;
  if (user) {
    const body = /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_jsx_runtime40.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: "app-sidebar__profile-avatar", children: user.avatar ? user.avatar : /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(Avatar_default, { size: 34, shape: "circle", name: user.name, ...user.avatarProps }) }),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "app-sidebar__profile-text", children: [
        /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("p", { className: "app-sidebar__profile-name", children: user.name }),
        roleLine ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("p", { className: "app-sidebar__profile-role", children: roleLine }) : null
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "app-sidebar__profile-arrow", "aria-hidden": true, children: chevronNested })
    ] });
    const control = user.onClick ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      "button",
      {
        type: "button",
        className: "app-sidebar__profile",
        onClick: user.onClick,
        "aria-label": (_b = user.profileRowLabel) != null ? _b : `${user.name}, open account menu`,
        children: body
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      "div",
      {
        className: "app-sidebar__profile app-sidebar__profile--static",
        role: "group",
        "aria-label": (_c = user.profileRowLabel) != null ? _c : user.name,
        children: body
      }
    );
    profileWrapped = collapsed && profileTip ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(AppSidebarTooltipHost, { collapsed: true, label: profileTip, children: control }) : control;
  }
  const rootStyle = mergeSidebarTokensStyle(tokens, {
    width,
    minWidth: width,
    maxWidth: width,
    ...style
  });
  const backdrop = showDrawerOverlay && typeof document !== "undefined" ? (0, import_react_dom5.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
      "button",
      {
        type: "button",
        className: "app-sidebar__backdrop",
        "aria-label": backdropCloseLabel,
        onClick: () => setCollapsed(true)
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_jsx_runtime40.Fragment, { children: [
    backdrop,
    /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
      "aside",
      {
        ...rest,
        id: panelId,
        className: cls16(
          "app-sidebar",
          useViewportFixedChrome && "app-sidebar--fixed",
          collapsed && "app-sidebar--collapsed",
          responsive && isNarrow && "app-sidebar--narrow",
          showDrawerOverlay && "app-sidebar--drawer-open",
          classNames == null ? void 0 : classNames.root,
          className
        ),
        style: rootStyle,
        children: [
          header ? /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: cls16("app-sidebar__header", classNames == null ? void 0 : classNames.header), children: [
            showCollapseToggle ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
              "button",
              {
                type: "button",
                className: "app-sidebar__collapse",
                "aria-label": collapseToggleLabel,
                "aria-expanded": !collapsed,
                "aria-controls": isNarrow ? panelId : void 0,
                onClick: () => setCollapsed(!collapsed),
                children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(Icon_default, { src: collapsed ? chevronRailRight : chevronRailLeft, decorative: true, width: 22, height: 22 })
              }
            ) : null,
            /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "app-sidebar__header-body", children: [
              /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "app-sidebar__header-main", children: [
                header.icon ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: "app-sidebar__header-icon", children: header.icon }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "app-sidebar__header-text", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("p", { className: "app-sidebar__title", children: header.title }),
                  header.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("p", { className: "app-sidebar__subtitle", children: header.subtitle }) : null
                ] })
              ] }),
              header.trailing ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: cls16("app-sidebar__header-trailing", classNames == null ? void 0 : classNames.headerTrailing), children: header.trailing }) : null
            ] })
          ] }) : showCollapseToggle ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: cls16("app-sidebar__header", classNames == null ? void 0 : classNames.header), children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
            "button",
            {
              type: "button",
              className: "app-sidebar__collapse",
              "aria-label": collapseToggleLabel,
              "aria-expanded": !collapsed,
              "aria-controls": isNarrow ? panelId : void 0,
              onClick: () => setCollapsed(!collapsed),
              children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(Icon_default, { src: collapsed ? chevronRailRight : chevronRailLeft, decorative: true, width: 22, height: 22 })
            }
          ) }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
            "nav",
            {
              ref: navRef,
              className: cls16("app-sidebar__nav", classNames == null ? void 0 : classNames.nav),
              "aria-label": navLabel,
              children: sections.map((s, i) => renderSection(s, i))
            }
          ),
          footerSlot ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: cls16("app-sidebar__footer", classNames == null ? void 0 : classNames.footer), children: footerSlot }) : user || visibleFooterActions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: cls16("app-sidebar__footer", classNames == null ? void 0 : classNames.footer), children: /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
            "div",
            {
              className: cls16(
                "app-sidebar__footer-row",
                footerLayout === "utilitiesFirst" && "app-sidebar__footer-row--utilities-first",
                classNames == null ? void 0 : classNames.footerRow
              ),
              children: [
                profileWrapped ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: cls16("app-sidebar__footer-profile", classNames == null ? void 0 : classNames.footerProfile), children: profileWrapped }) : null,
                visibleFooterActions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
                  "div",
                  {
                    className: cls16("app-sidebar__footer-utilities", classNames == null ? void 0 : classNames.footerUtilities),
                    role: "group",
                    "aria-label": "Utility actions",
                    children: visibleFooterActions.map((action) => {
                      const iconNode = import_react33.default.isValidElement(action.icon) ? action.icon : /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
                        Icon_default,
                        {
                          src: action.icon,
                          decorative: true,
                          width: FOOTER_ACTION_ICON,
                          height: FOOTER_ACTION_ICON,
                          color: "currentColor"
                        }
                      );
                      const node = action.href ? /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
                        "a",
                        {
                          href: action.href,
                          className: "app-sidebar__action",
                          "aria-label": action.label,
                          onClick: action.onClick,
                          children: iconNode
                        }
                      ) : /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
                        "button",
                        {
                          type: "button",
                          className: "app-sidebar__action",
                          "aria-label": action.label,
                          onClick: action.onClick,
                          children: iconNode
                        }
                      );
                      return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(AppSidebarTooltipHost, { collapsed, label: action.label, children: node }, action.id);
                    })
                  }
                ) : null
              ]
            }
          ) }) : null
        ]
      }
    )
  ] });
}

// src/components/molecules/DashboardShell/DashboardShell.tsx
var import_react36 = __toESM(require("react"));

// src/components/molecules/AppTopbar/index.tsx
var import_react35 = require("react");

// src/components/molecules/AppTopbar/AppTopbar.chrome.ts
var TOKENS_CSS_VARS2 = {
  bg: "--app-topbar-bg",
  bgElevated: "--app-topbar-bg-elevated",
  text: "--app-topbar-text",
  textMuted: "--app-topbar-text-muted",
  border: "--app-topbar-border",
  hover: "--app-topbar-hover",
  activeBg: "--app-topbar-active-bg",
  focusRing: "--app-topbar-focus-ring",
  shadow: "--app-topbar-shadow"
};
function mergeTopbarTokensStyle(tokens, base) {
  if (!tokens || Object.keys(tokens).length === 0) {
    return base != null ? base : {};
  }
  const vars = {};
  Object.entries(tokens).forEach(([key, val]) => {
    if (val === void 0 || val === "")
      return;
    const cssVar = TOKENS_CSS_VARS2[key];
    if (cssVar)
      vars[cssVar] = val;
  });
  return { ...vars, ...base };
}

// src/components/molecules/AppTopbar/AppTopbarMenu.tsx
var import_react34 = __toESM(require("react"));
var import_react_dom6 = require("react-dom");
var import_jsx_runtime41 = require("react/jsx-runtime");
function cls17(...parts) {
  return parts.filter(Boolean).join(" ");
}
function AppTopbarMenu({ id, open, onClose, triggerRef, items, theme }) {
  const menuRef = (0, import_react34.useRef)(null);
  const positionMenu = () => {
    const el = triggerRef.current;
    const menu = menuRef.current;
    if (!el || !menu)
      return;
    const rect = el.getBoundingClientRect();
    const mw = menu.offsetWidth || 220;
    let left = rect.left;
    if (left + mw > window.innerWidth - 16) {
      left = Math.max(16, window.innerWidth - 16 - mw);
    }
    if (left < 16)
      left = 16;
    const top = rect.bottom + 8;
    const maxH = window.innerHeight - top - 16;
    menu.style.position = "fixed";
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
    menu.style.zIndex = "70";
    menu.style.maxHeight = `${Math.max(120, maxH)}px`;
  };
  (0, import_react34.useLayoutEffect)(() => {
    if (!open)
      return;
    positionMenu();
  }, [open]);
  (0, import_react34.useEffect)(() => {
    if (!open)
      return;
    const onScrollResize = () => positionMenu();
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);
    return () => {
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [open]);
  (0, import_react34.useEffect)(() => {
    if (!open)
      return;
    const onDoc = (e) => {
      var _a, _b;
      const t = e.target;
      if ((_a = menuRef.current) == null ? void 0 : _a.contains(t))
        return;
      if ((_b = triggerRef.current) == null ? void 0 : _b.contains(t))
        return;
      onClose();
    };
    const onKey = (e) => {
      if (e.key === "Escape")
        onClose();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, triggerRef]);
  (0, import_react34.useEffect)(() => {
    if (!open || !menuRef.current)
      return;
    const first = menuRef.current.querySelector(
      'button[role="menuitem"]:not([disabled]), a[role="menuitem"]'
    );
    first == null ? void 0 : first.focus();
  }, [open]);
  if (!open || typeof document === "undefined")
    return null;
  return (0, import_react_dom6.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
      "div",
      {
        ref: menuRef,
        id,
        role: "menu",
        "aria-orientation": "vertical",
        className: cls17("app-topbar-menu", theme === "dark" && "app-topbar-menu--dark"),
        children: items.map((item) => {
          const content = /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(import_jsx_runtime41.Fragment, { children: [
            item.icon ? /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { className: "app-topbar-menu__icon", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(Icon_default, { src: item.icon, width: 18, height: 18, color: "currentColor", decorative: true }) }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { className: "app-topbar-menu__label", children: item.label })
          ] });
          const className = cls17(
            "app-topbar-menu__item",
            item.destructive && "app-topbar-menu__item--destructive",
            item.disabled && "app-topbar-menu__item--disabled"
          );
          const common = {
            role: "menuitem",
            className,
            tabIndex: item.disabled ? -1 : void 0
          };
          const node = item.href && !item.disabled ? /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
            "a",
            {
              ...common,
              href: item.href,
              onClick: () => {
                onClose();
              },
              children: content
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(
            "button",
            {
              ...common,
              type: "button",
              disabled: item.disabled,
              onClick: () => {
                var _a;
                if (item.disabled)
                  return;
                (_a = item.onClick) == null ? void 0 : _a.call(item);
                onClose();
              },
              children: content
            }
          );
          return /* @__PURE__ */ (0, import_jsx_runtime41.jsx)(import_react34.default.Fragment, { children: node }, item.id);
        })
      }
    ),
    document.body
  );
}

// src/components/molecules/AppTopbar/index.tsx
var import_jsx_runtime42 = require("react/jsx-runtime");
var TOPBAR_SEARCH_ICON = /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", "aria-hidden": true, children: [
  /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("circle", { cx: "11", cy: "11", r: "7", stroke: "currentColor", strokeWidth: "2" }),
  /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("path", { d: "M20 20l-4.3-4.3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
] });
var MENU_ICON = /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("svg", { viewBox: "0 0 20 20", width: 20, height: 20, fill: "none", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("path", { d: "M3 5h14M3 10h14M3 15h14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
function cls18(...parts) {
  return parts.filter(Boolean).join(" ");
}
function actionAriaLabel(action) {
  const { label, badgeDot, badgeCount } = action;
  if (badgeDot && (badgeCount == null || badgeCount <= 0)) {
    return `${label}, unread`;
  }
  if (badgeCount != null && badgeCount > 0) {
    return `${label}, ${badgeCount} unread`;
  }
  return label;
}
var AppTopbar = ({
  theme = "light",
  title,
  titleAs = "h1",
  search,
  centerSlot,
  actions,
  profile,
  onMobileMenuClick,
  mobileMenuLabel = "Open menu",
  mobileMenuItems,
  mobileSearchTriggerLabel = "Search",
  leftSlot,
  rightSlot,
  sticky = true,
  zIndex = 50,
  collapseCenterBelowWidth = 1024,
  responsive = true,
  tokens,
  className,
  classNames
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const rootId = (0, import_react35.useId)();
  const baseId = rootId.replace(/[^a-zA-Z0-9_-]/g, "");
  const searchInputId = (_a = search == null ? void 0 : search.inputId) != null ? _a : `app-topbar-search-${baseId}`;
  const menuDomId = (0, import_react35.useMemo)(() => `app-topbar-menu-root-${baseId}`, [baseId]);
  const isNarrow = useBelowWidth(collapseCenterBelowWidth, responsive);
  const hasMenuItems = Boolean(mobileMenuItems && mobileMenuItems.length > 0);
  const showHamburger = isNarrow && (hasMenuItems || Boolean(onMobileMenuClick));
  const hasCenterContent = centerSlot != null || search != null;
  const hideCenterColumn = isNarrow && search != null && centerSlot == null;
  const showCenterCell = hasCenterContent && !hideCenterColumn;
  const [mobileSearchOpen, setMobileSearchOpen] = (0, import_react35.useState)(false);
  const [menuOpen, setMenuOpen] = (0, import_react35.useState)(false);
  const menuTriggerWrapRef = (0, import_react35.useRef)(null);
  (0, import_react35.useEffect)(() => {
    if (!isNarrow) {
      setMobileSearchOpen(false);
      setMenuOpen(false);
    }
  }, [isNarrow]);
  (0, import_react35.useEffect)(() => {
    if (!mobileSearchOpen)
      return;
    const onKey = (e) => {
      if (e.key === "Escape")
        setMobileSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileSearchOpen]);
  (0, import_react35.useEffect)(() => {
    if (!mobileSearchOpen || !hideCenterColumn)
      return;
    const id = requestAnimationFrame(() => {
      var _a2;
      (_a2 = document.getElementById(searchInputId)) == null ? void 0 : _a2.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [mobileSearchOpen, hideCenterColumn, searchInputId]);
  (0, import_react35.useEffect)(() => {
    if (!search)
      return;
    const onKey = (e) => {
      if (e.defaultPrevented)
        return;
      const t = e.target;
      if (!t)
        return;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
        return;
      const focusSearch = () => {
        var _a2;
        return (_a2 = document.getElementById(searchInputId)) == null ? void 0 : _a2.focus();
      };
      if (hideCenterColumn && !mobileSearchOpen) {
        if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          setMobileSearchOpen(true);
          return;
        }
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          setMobileSearchOpen(true);
          return;
        }
        return;
      }
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        focusSearch();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        focusSearch();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [search, hideCenterColumn, mobileSearchOpen, searchInputId]);
  const TitleTag = titleAs;
  const rootStyle = mergeTopbarTokensStyle(tokens, {
    ...sticky ? { zIndex } : {}
  });
  const searchField = search ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
    TextInputSearch_default,
    {
      id: searchInputId,
      value: (_b = search.value) != null ? _b : "",
      onChange: search.onChange,
      onSearch: search.onSearch,
      placeholder: (_c = search.placeholder) != null ? _c : "Search...",
      ariaLabel: (_d = search.ariaLabel) != null ? _d : "Search",
      disabled: search.disabled,
      size: "sm",
      fullWidth: true,
      leftIcon: TOPBAR_SEARCH_ICON,
      leftIconHeight: 18,
      leftIconWidth: 18,
      leftIconColor: "var(--app-topbar-text-muted)",
      showClearButton: (_e = search.showClearButton) != null ? _e : hideCenterColumn,
      containerClassName: "text-input-search-wrapper app-topbar__search"
    }
  ) : null;
  const handleHamburgerClick = () => {
    setMobileSearchOpen(false);
    if (hasMenuItems) {
      setMenuOpen((o) => !o);
      return;
    }
    onMobileMenuClick == null ? void 0 : onMobileMenuClick();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(import_jsx_runtime42.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
      "header",
      {
        className: cls18(
          "app-topbar",
          theme === "dark" && "app-topbar--dark",
          sticky && "app-topbar--sticky",
          !showCenterCell && "app-topbar--no-center",
          hideCenterColumn && "app-topbar--narrow-search",
          mobileSearchOpen && hideCenterColumn && "app-topbar--mobile-search-open",
          classNames == null ? void 0 : classNames.root,
          className
        ),
        style: rootStyle,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", { className: cls18("app-topbar__inner", classNames == null ? void 0 : classNames.inner), children: [
            /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", { className: cls18("app-topbar__left", classNames == null ? void 0 : classNames.left), children: [
              showHamburger ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("div", { ref: menuTriggerWrapRef, className: "app-topbar__menu", children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
                Button_default,
                {
                  type: "button",
                  variant: "ghost",
                  size: "md",
                  icon: MENU_ICON,
                  iconWidth: 20,
                  iconHeight: 20,
                  ariaLabel: mobileMenuLabel,
                  "aria-haspopup": hasMenuItems ? "menu" : void 0,
                  "aria-expanded": hasMenuItems ? menuOpen : void 0,
                  "aria-controls": hasMenuItems ? menuDomId : void 0,
                  onClick: handleHamburgerClick
                }
              ) }) : null,
              leftSlot,
              /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("div", { className: "app-topbar__context", children: /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(TitleTag, { className: cls18("app-topbar__title", classNames == null ? void 0 : classNames.title), children: title }) })
            ] }),
            showCenterCell ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
              "div",
              {
                className: cls18(
                  "app-topbar__center",
                  search && !centerSlot && "app-topbar__center--expands",
                  classNames == null ? void 0 : classNames.center
                ),
                children: centerSlot != null ? centerSlot : searchField
              }
            ) : null,
            /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("div", { className: cls18("app-topbar__right", classNames == null ? void 0 : classNames.right), children: [
              hideCenterColumn && search ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
                Button_default,
                {
                  type: "button",
                  variant: "ghost",
                  size: "md",
                  icon: TOPBAR_SEARCH_ICON,
                  iconWidth: 20,
                  iconHeight: 20,
                  ariaLabel: mobileSearchTriggerLabel,
                  "aria-expanded": mobileSearchOpen,
                  "aria-controls": mobileSearchOpen ? `${searchInputId}-panel` : void 0,
                  onClick: () => setMobileSearchOpen((s) => !s)
                }
              ) : null,
              actions == null ? void 0 : actions.map((action) => {
                var _a2;
                const variant = (_a2 = action.variant) != null ? _a2 : "ghost";
                const showDot = action.badgeDot;
                const count = action.badgeCount;
                const hasBadge = showDot || count != null && count > 0;
                const showCountChip = hasBadge && !showDot && count != null && count > 0;
                return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)("span", { className: "app-topbar__action-wrap", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
                    Button_default,
                    {
                      type: "button",
                      variant,
                      size: "md",
                      icon: action.icon,
                      iconWidth: 20,
                      iconHeight: 20,
                      ariaLabel: actionAriaLabel(action),
                      disabled: action.disabled,
                      href: action.href,
                      onClick: action.onClick
                    }
                  ),
                  hasBadge ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
                    "span",
                    {
                      className: cls18("app-topbar__badge", showCountChip && "app-topbar__badge--count"),
                      "aria-hidden": true,
                      children: showCountChip ? count > 99 ? "99+" : count : null
                    }
                  ) : null
                ] }, action.id);
              }),
              profile ? profile.onClick ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
                "button",
                {
                  type: "button",
                  className: "app-topbar__profile",
                  "aria-label": (_f = profile.menuLabel) != null ? _f : profile.name ? `Account menu for ${profile.name}` : "Account menu",
                  onClick: profile.onClick,
                  children: (_h = profile.avatar) != null ? _h : /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(Avatar_default, { size: 32, shape: "circle", name: (_g = profile.name) != null ? _g : "User", ...profile.avatarProps })
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
                "span",
                {
                  className: "app-topbar__profile app-topbar__profile--static",
                  "aria-label": (_j = (_i = profile.menuLabel) != null ? _i : profile.name) != null ? _j : "Profile",
                  children: (_l = profile.avatar) != null ? _l : /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(Avatar_default, { size: 32, shape: "circle", name: (_k = profile.name) != null ? _k : "User", ...profile.avatarProps })
                }
              ) : null,
              rightSlot
            ] })
          ] }),
          hideCenterColumn && mobileSearchOpen && search ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("div", { id: `${searchInputId}-panel`, className: "app-topbar__mobile-search", children: searchField }) : null
        ]
      }
    ),
    hasMenuItems ? /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
      AppTopbarMenu,
      {
        id: menuDomId,
        open: menuOpen,
        onClose: () => setMenuOpen(false),
        triggerRef: menuTriggerWrapRef,
        items: mobileMenuItems,
        theme
      }
    ) : null
  ] });
};
AppTopbar.displayName = "AppTopbar";
var AppTopbar_default = AppTopbar;

// src/components/molecules/DashboardShell/DashboardShell.tsx
var import_jsx_runtime43 = require("react/jsx-runtime");
function cls19(...parts) {
  return parts.filter(Boolean).join(" ");
}
function isAppTopbarElement(node) {
  const t = node.type;
  return t === AppTopbar_default || (t == null ? void 0 : t.displayName) === "AppTopbar" || (t == null ? void 0 : t.name) === "AppTopbar";
}
function prepareTopbar(topbar, pinTopbar) {
  if (!pinTopbar || !import_react36.default.isValidElement(topbar) || !isAppTopbarElement(topbar)) {
    return topbar;
  }
  return import_react36.default.cloneElement(topbar, { sticky: false });
}
var DEFAULT_ROOT_CLASSNAME = "flex flex-nowrap h-[100dvh] max-h-[100dvh] min-h-0 w-full min-w-0 max-w-[100vw] items-stretch overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-primary)]";
var DEFAULT_INSET_CLASSNAME = "isolate flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden";
var DEFAULT_TOPBAR_WRAPPER_CLASSNAME = "relative z-10 min-w-0 shrink-0";
var DEFAULT_CONTENT_CLASSNAME = "min-w-0 w-full min-h-0 flex-1 basis-0 overflow-y-auto overscroll-y-contain";
function DashboardShell({
  sidebar,
  topbar,
  children,
  className,
  insetClassName,
  insetStyle,
  topbarClassName,
  topbarStyle,
  contentClassName,
  contentStyle,
  pinTopbar = true
}) {
  const { fixed: fixedProp, className: sidebarClassName, classNames: sidebarClassNames, ...restSidebar } = sidebar;
  const fixed = fixedProp !== false;
  const topbarNode = prepareTopbar(topbar, pinTopbar);
  const renderInset = (style) => /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: cls19(DEFAULT_INSET_CLASSNAME, insetClassName), style, children: [
    topbar ? /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: cls19(DEFAULT_TOPBAR_WRAPPER_CLASSNAME, topbarClassName), style: topbarStyle, children: topbarNode }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { className: cls19(DEFAULT_CONTENT_CLASSNAME, contentClassName), style: contentStyle, children })
  ] });
  if (!fixed) {
    return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: cls19(DEFAULT_ROOT_CLASSNAME, className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
        AppSidebar,
        {
          ...restSidebar,
          fixed: false,
          className: sidebarClassName,
          classNames: sidebarClassNames
        }
      ),
      renderInset({
        flex: "1 1 0%",
        maxHeight: "100%",
        minHeight: 0,
        alignSelf: "stretch",
        ...insetStyle
      })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime43.jsxs)("div", { className: cls19(DEFAULT_ROOT_CLASSNAME, className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      AppSidebar,
      {
        ...restSidebar,
        fixed: true,
        className: sidebarClassName,
        classNames: sidebarClassNames
      }
    ),
    renderInset({
      marginInlineStart: "var(--app-sidebar-offset, 0px)",
      transition: "margin-inline-start 200ms ease",
      minHeight: 0,
      flex: "1 1 0%",
      maxHeight: "100%",
      alignSelf: "stretch",
      ...insetStyle
    })
  ] });
}
var DashboardShell_default = DashboardShell;
var AppShell = DashboardShell;

// src/components/atoms/Hyperlink/Hyperlink.config.ts
var defaultLinkColor = "var(--color-brand-link)";
var hyperlinkBaseClass = "font-sans text-body text-[var(--color-brand-link)] no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary-focus-ring)] cursor-pointer";

// src/components/atoms/Hyperlink/Hyperlink.utils.ts
var cls20 = (...classes) => classes.filter(Boolean).join(" ");

// src/components/atoms/Hyperlink/index.tsx
var import_jsx_runtime44 = require("react/jsx-runtime");
var Hyperlink = ({
  children,
  href = "#",
  disabled = false,
  className = "",
  openInNewTab = false
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
    "a",
    {
      href: disabled ? void 0 : href,
      className: cls20(
        hyperlinkBaseClass,
        disabled && "disabled",
        className
      ),
      style: { color: defaultLinkColor },
      target: openInNewTab ? "_blank" : "_self",
      rel: openInNewTab ? "noopener noreferrer" : "",
      onClick: (e) => disabled && e.preventDefault(),
      children
    }
  );
};
var Hyperlink_default = Hyperlink;

// src/components/charts/LineChart.tsx
var import_react38 = __toESM(require("react"));

// src/components/charts/Chart.types.ts
var CHART_THEME_COLORS = {
  light: {
    tooltipBg: "var(--color-bg-surface, #fff)",
    tooltipBorder: "var(--color-border-default, #e5e7eb)",
    tooltipText: "var(--color-text-primary, #0d0d0d)",
    legendText: "var(--color-text-secondary, #757575)",
    axisText: "var(--color-text-secondary, #757575)",
    gridColor: "var(--color-border-default, #e5e7eb)"
  },
  dark: {
    tooltipBg: "var(--chart-tooltip-bg, #141b2d)",
    tooltipBorder: "var(--chart-tooltip-border, #2a3548)",
    tooltipText: "var(--chart-tooltip-text, #e8edf5)",
    legendText: "var(--chart-legend-text, #8b9bb4)",
    axisText: "var(--chart-axis-text, #8b9bb4)",
    gridColor: "var(--chart-grid-color, #2a3548)"
  }
};

// src/components/charts/ChartTooltip.tsx
var import_react37 = __toESM(require("react"));
var import_jsx_runtime45 = require("react/jsx-runtime");
function cls21(...parts) {
  return parts.filter(Boolean).join(" ");
}
var ChartTooltip = import_react37.default.memo(function ChartTooltip2({
  theme,
  open,
  pointerX,
  pointerY,
  containerWidth,
  containerHeight,
  label,
  items,
  animation = true,
  followPointer = true
}) {
  const themeColors = CHART_THEME_COLORS[theme];
  const ref = (0, import_react37.useRef)(null);
  const [pos, setPos] = (0, import_react37.useState)({ left: 0, top: 0 });
  const [enter, setEnter] = (0, import_react37.useState)(false);
  (0, import_react37.useLayoutEffect)(() => {
    if (!open || !ref.current)
      return;
    const el = ref.current;
    const tw = el.offsetWidth;
    const th = el.offsetHeight;
    const pad = 8;
    const gap = 12;
    let left = pointerX + gap;
    let top = pointerY + gap;
    if (followPointer) {
      if (left + tw > containerWidth - pad) {
        left = pointerX - tw - gap;
      }
      if (top + th > containerHeight - pad) {
        top = pointerY - th - gap;
      }
      if (left < pad)
        left = pad;
      if (top < pad)
        top = pad;
    }
    left = Math.max(pad, Math.min(left, Math.max(pad, containerWidth - tw - pad)));
    top = Math.max(pad, Math.min(top, Math.max(pad, containerHeight - th - pad)));
    setPos({ left, top });
  }, [
    open,
    pointerX,
    pointerY,
    containerWidth,
    containerHeight,
    followPointer,
    label,
    items.length
  ]);
  import_react37.default.useEffect(() => {
    if (!open) {
      setEnter(false);
      return;
    }
    setEnter(false);
    const id = requestAnimationFrame(() => setEnter(true));
    return () => cancelAnimationFrame(id);
  }, [open]);
  if (!open)
    return null;
  return /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
    "div",
    {
      ref,
      role: "tooltip",
      "data-chart-theme": theme,
      className: cls21(
        "ds-chart-tooltip",
        animation && "ds-chart-tooltip--motion",
        animation && enter && "ds-chart-tooltip--enter"
      ),
      style: {
        left: pos.left,
        top: pos.top,
        background: themeColors.tooltipBg,
        border: `1px solid ${themeColors.tooltipBorder}`,
        color: themeColors.tooltipText
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)(
          "div",
          {
            className: "ds-chart-tooltip__label",
            style: {
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
              borderBottomColor: themeColors.tooltipBorder
            },
            children: label
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "ds-chart-tooltip__rows", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "ds-chart-tooltip__row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { className: "ds-chart-tooltip__dot", style: { background: item.color }, "aria-hidden": true }),
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { className: "ds-chart-tooltip__name", style: { color: themeColors.legendText }, children: item.name }),
          /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { className: "ds-chart-tooltip__value", children: item.value })
        ] }, item.name)) })
      ]
    }
  );
});

// src/components/charts/utils.ts
function getValueExtent(data, series, stacked = false) {
  let min = Infinity;
  let max = -Infinity;
  if (stacked) {
    min = 0;
    for (const row of data) {
      let sum = 0;
      for (const s of series) {
        const v = row[s.dataKey];
        sum += typeof v === "number" ? v : 0;
      }
      if (sum > max)
        max = sum;
    }
  } else {
    for (const row of data) {
      for (const s of series) {
        const v = row[s.dataKey];
        if (typeof v === "number") {
          const n = v;
          if (n < min)
            min = n;
          if (n > max)
            max = n;
        }
      }
    }
  }
  if (min === Infinity)
    min = 0;
  if (max === -Infinity)
    max = 100;
  if (min === max)
    max = min + 1;
  return [min, max];
}
function scaleLinear(domain, range) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const k = (r1 - r0) / (d1 - d0);
  return (v) => r0 + (v - d0) * k;
}
function linePath(points, curve) {
  if (points.length === 0)
    return "";
  if (points.length === 1)
    return `M ${points[0].x} ${points[0].y}`;
  if (curve === "linear") {
    return points.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`).join(" ");
  }
  if (curve === "step" || curve === "stepBefore" || curve === "stepAfter") {
    const parts = [`M ${points[0].x} ${points[0].y}`];
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      if (curve === "step") {
        const midX = (prev.x + curr.x) / 2;
        parts.push(`L ${midX} ${prev.y}`);
        parts.push(`L ${midX} ${curr.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      } else if (curve === "stepBefore") {
        parts.push(`L ${curr.x} ${prev.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      } else {
        parts.push(`L ${prev.x} ${curr.y}`);
        parts.push(`L ${curr.x} ${curr.y}`);
      }
    }
    return parts.join(" ");
  }
  const d = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 1; i < points.length; i++) {
    const p0 = points[Math.max(0, i - 2)];
    const p1 = points[i - 1];
    const p2 = points[i];
    const p3 = points[Math.min(points.length - 1, i + 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`);
  }
  return d.join(" ");
}
function areaPath(points, baseY, curve) {
  if (points.length === 0)
    return "";
  const line = linePath(points, curve);
  const close = `L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;
  return line + " " + close;
}
function degToRad(deg) {
  return deg * Math.PI / 180;
}
function polarToCartesian(cx2, cy, r, angleDeg) {
  const rad = degToRad(angleDeg - 90);
  return { x: cx2 + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arcPath(cx2, cy, r, startAngleDeg, endAngleDeg, innerRadius = 0) {
  const span = endAngleDeg - startAngleDeg;
  if (span <= 0)
    return "";
  const start = polarToCartesian(cx2, cy, r, startAngleDeg);
  const end = polarToCartesian(cx2, cy, r, endAngleDeg);
  const largeArc = span >= 180 ? 1 : 0;
  const sweep = 1;
  if (innerRadius <= 0) {
    return `M ${cx2} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y} Z`;
  }
  const innerStart = polarToCartesian(cx2, cy, innerRadius, startAngleDeg);
  const innerEnd = polarToCartesian(cx2, cy, innerRadius, endAngleDeg);
  const innerLargeArc = span >= 180 ? 1 : 0;
  return `M ${innerStart.x} ${innerStart.y} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${end.x} ${end.y} L ${innerEnd.x} ${innerEnd.y} A ${innerRadius} ${innerRadius} 0 ${innerLargeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
}

// src/components/charts/LineChart.tsx
var import_jsx_runtime46 = require("react/jsx-runtime");
var DEFAULT_COLORS = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)"
];
var LineChartComponent = ({
  data,
  xAxisKey = "name",
  series,
  colors = DEFAULT_COLORS,
  curve = "monotone",
  dotSize = 4,
  showDots = true,
  strokeWidth = 2,
  width = "100%",
  height = 300,
  margin = { top: 10, right: 20, left: 40, bottom: 30 },
  showGrid = true,
  gridColor,
  showTooltip = true,
  showLegend = true,
  legendPosition = "bottom",
  theme = "light",
  tooltipFollowPointer = true,
  tooltipAnimation = true,
  showCrosshair = true,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d;
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const [tooltip, setTooltip] = (0, import_react38.useState)(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const xLabels = (0, import_react38.useMemo)(() => data.map((d) => {
    var _a2;
    return String((_a2 = d[xAxisKey]) != null ? _a2 : "");
  }), [data, xAxisKey]);
  const [yMin, yMax] = (0, import_react38.useMemo)(() => getValueExtent(data, series), [data, series]);
  const xScale = (0, import_react38.useMemo)(
    () => scaleLinear([0, Math.max(1, data.length - 1)], [0, innerW]),
    [data.length, innerW]
  );
  const yScale = (0, import_react38.useMemo)(
    () => scaleLinear([yMin, yMax], [innerH, 0]),
    [yMin, yMax, innerH]
  );
  const paths = (0, import_react38.useMemo)(() => {
    return series.map((s, si) => {
      var _a2, _b2;
      const points = data.map((d, i) => {
        const v = d[s.dataKey];
        const num = typeof v === "number" ? v : 0;
        return { x: m.left + xScale(i), y: m.top + yScale(num) };
      }).filter((p) => !Number.isNaN(p.y));
      return { path: linePath(points, curve), points, color: (_a2 = s.color) != null ? _a2 : colors[si % colors.length], name: (_b2 = s.name) != null ? _b2 : s.dataKey };
    });
  }, [data, series, colors, curve, xScale, yScale, m]);
  const handleMouseMove = (0, import_react38.useCallback)(
    (e) => {
      var _a2;
      if (!showTooltip)
        return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - m.left;
      const idx = Math.round(x / innerW * (data.length - 1));
      const clamped = Math.max(0, Math.min(idx, data.length - 1));
      const row = data[clamped];
      const label = String((_a2 = row[xAxisKey]) != null ? _a2 : "");
      const items = series.map((s, i) => {
        var _a3, _b2, _c2;
        return {
          name: (_a3 = s.name) != null ? _a3 : s.dataKey,
          value: (_b2 = Number(row[s.dataKey])) != null ? _b2 : 0,
          color: (_c2 = s.color) != null ? _c2 : colors[i % colors.length]
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label,
        items,
        activeIndex: clamped
      });
    },
    [showTooltip, data, series, xAxisKey, colors, innerW, m.left]
  );
  const handleMouseLeave = (0, import_react38.useCallback)(() => setTooltip(null), []);
  return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(
    "div",
    {
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: [
                [0.25, 0.5, 0.75].map((t) => /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
                  "line",
                  {
                    x1: m.left,
                    y1: m.top + innerH * t,
                    x2: m.left + innerW,
                    y2: m.top + innerH * t
                  },
                  t
                )),
                xLabels.slice(0, 6).map((_, i) => {
                  const idx = Math.floor(i / 5 * (data.length - 1));
                  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
                    "line",
                    {
                      x1: m.left + xScale(idx),
                      y1: m.top,
                      x2: m.left + xScale(idx),
                      y2: m.top + innerH
                    },
                    i
                  );
                })
              ] }),
              paths.map(({ path, points, color, name }) => /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("g", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
                  "path",
                  {
                    d: path,
                    fill: "none",
                    stroke: color,
                    strokeWidth,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                showDots && points.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
                  "circle",
                  {
                    cx: p.x,
                    cy: p.y,
                    r: dotSize,
                    fill: color,
                    stroke: themeColors.tooltipBg,
                    strokeWidth: 1
                  },
                  i
                ))
              ] }, name)),
              showTooltip && showCrosshair && tooltip !== null && data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("g", { className: "ds-chart-crosshair", pointerEvents: "none", children: [
                /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
                  "line",
                  {
                    x1: m.left + xScale(tooltip.activeIndex),
                    y1: m.top,
                    x2: m.left + xScale(tooltip.activeIndex),
                    y2: m.top + innerH,
                    stroke: themeColors.gridColor,
                    strokeWidth: 1,
                    strokeDasharray: "4 6",
                    opacity: 0.85
                  }
                ),
                series.map((s, si) => {
                  var _a2, _b2;
                  const row = data[tooltip.activeIndex];
                  const num = (_a2 = Number(row[s.dataKey])) != null ? _a2 : 0;
                  const cx2 = m.left + xScale(tooltip.activeIndex);
                  const cy = m.top + yScale(num);
                  const color = (_b2 = s.color) != null ? _b2 : colors[si % colors.length];
                  return /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
                    "circle",
                    {
                      cx: cx2,
                      cy,
                      r: dotSize + 3,
                      fill: color,
                      stroke: themeColors.tooltipBg,
                      strokeWidth: 2,
                      opacity: 0.95
                    },
                    `hit-${s.dataKey}`
                  );
                })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("g", { fill: themeColors.axisText, fontSize: 11, textAnchor: "middle", children: xLabels.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
                "text",
                {
                  x: m.left + xScale(i),
                  y: m.top + innerH + 16,
                  children: label
                },
                i
              )) })
            ]
          }
        ),
        showTooltip && tooltip && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: legendPosition === "left" ? "flex-start" : legendPosition === "right" ? "flex-end" : "center",
              marginTop: legendPosition === "top" ? 0 : 8,
              marginBottom: legendPosition === "bottom" ? 0 : 8,
              fontSize: 12
            },
            children: series.map((s, i) => {
              var _a2, _b2;
              return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
                  "span",
                  {
                    style: {
                      width: 12,
                      height: 3,
                      borderRadius: 2,
                      background: (_a2 = s.color) != null ? _a2 : colors[i % colors.length]
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("span", { style: { color: themeColors.legendText }, children: (_b2 = s.name) != null ? _b2 : s.dataKey })
              ] }, s.dataKey);
            })
          }
        )
      ]
    }
  );
};
var LineChart_default = import_react38.default.memo(LineChartComponent);

// src/components/charts/BarChart.tsx
var import_react39 = __toESM(require("react"));
var import_jsx_runtime47 = require("react/jsx-runtime");
var DEFAULT_COLORS2 = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)"
];
var BarChartComponent = ({
  data,
  xAxisKey = "name",
  series,
  colors = DEFAULT_COLORS2,
  layout = "vertical",
  barSize = 24,
  barGap = 4,
  barCategoryGap = "10%",
  radius = 4,
  width = "100%",
  height = 300,
  margin = { top: 10, right: 20, left: 40, bottom: 30 },
  showGrid = true,
  gridColor,
  showTooltip = true,
  showLegend = true,
  legendPosition = "bottom",
  theme = "light",
  tooltipFollowPointer = true,
  tooltipAnimation = true,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d;
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const containerRef = (0, import_react39.useRef)(null);
  const [tooltip, setTooltip] = (0, import_react39.useState)(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const catGap = typeof barCategoryGap === "string" && barCategoryGap.endsWith("%") ? innerW / Math.max(1, data.length) * (parseFloat(barCategoryGap) / 100) : typeof barCategoryGap === "number" ? barCategoryGap : 8;
  const groupWidth = innerW / Math.max(1, data.length) - catGap;
  const barCount = series.length;
  const totalBarWidth = barCount * barSize + (barCount - 1) * barGap;
  const barWidth = Math.min(
    barSize,
    Math.max(2, (groupWidth - (barCount - 1) * barGap) / barCount)
  );
  const groupOffset = Math.max(0, (groupWidth - totalBarWidth) / 2);
  const [yMin, yMax] = (0, import_react39.useMemo)(() => getValueExtent(data, series), [data, series]);
  const yScale = (0, import_react39.useMemo)(
    () => scaleLinear([yMin, yMax], [innerH, 0]),
    [yMin, yMax, innerH]
  );
  const handleMouseMove = (0, import_react39.useCallback)(
    (e, idx) => {
      var _a2;
      if (!showTooltip || !containerRef.current)
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const row = data[idx];
      const label = String((_a2 = row[xAxisKey]) != null ? _a2 : "");
      const items = series.map((s, i) => {
        var _a3, _b2, _c2;
        return {
          name: (_a3 = s.name) != null ? _a3 : s.dataKey,
          value: (_b2 = Number(row[s.dataKey])) != null ? _b2 : 0,
          color: (_c2 = s.color) != null ? _c2 : colors[i % colors.length]
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label,
        items
      });
    },
    [showTooltip, data, series, xAxisKey, colors]
  );
  const handleMouseLeave = (0, import_react39.useCallback)(() => setTooltip(null), []);
  const r = Array.isArray(radius) ? radius[0] : radius;
  return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(
    "div",
    {
      ref: containerRef,
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: [0.25, 0.5, 0.75].map((t) => /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
                "line",
                {
                  x1: m.left,
                  y1: m.top + innerH * t,
                  x2: m.left + innerW,
                  y2: m.top + innerH * t
                },
                t
              )) }),
              layout === "vertical" && data.map((row, idx) => {
                const groupX = m.left + idx / Math.max(1, data.length) * innerW + catGap / 2 + groupOffset;
                return series.map((s, si) => {
                  var _a2, _b2;
                  const v = (_a2 = Number(row[s.dataKey])) != null ? _a2 : 0;
                  const barH = innerH - yScale(v);
                  const x = groupX + si * (barWidth + barGap);
                  const y = m.top + yScale(v);
                  return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
                    "rect",
                    {
                      x,
                      y,
                      width: barWidth,
                      height: Math.max(0, barH),
                      fill: (_b2 = s.color) != null ? _b2 : colors[si % colors.length],
                      rx: r,
                      ry: r,
                      onMouseMove: (e) => handleMouseMove(e, idx)
                    }
                  ) }, `${idx}-${s.dataKey}`);
                });
              }),
              layout === "horizontal" && data.map((row, idx) => {
                const groupY = m.top + (idx + 0.5) / data.length * innerH;
                const maxVal = Math.max(...series.map((s) => {
                  var _a2;
                  return (_a2 = Number(row[s.dataKey])) != null ? _a2 : 0;
                }));
                const barLen = Number(maxVal) / (yMax - yMin || 1) * innerW;
                return series.map((s, si) => {
                  var _a2, _b2;
                  const v = (_a2 = Number(row[s.dataKey])) != null ? _a2 : 0;
                  const len = v / (yMax - yMin || 1) * innerW;
                  const x = m.left;
                  const y = groupY - barCount * barWidth / 2 + si * (barWidth + barGap);
                  return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
                    "rect",
                    {
                      x,
                      y,
                      width: len,
                      height: barWidth,
                      fill: (_b2 = s.color) != null ? _b2 : colors[si % colors.length],
                      rx: r,
                      ry: r,
                      onMouseMove: (e) => handleMouseMove(e, idx)
                    },
                    `${idx}-${s.dataKey}`
                  );
                });
              }),
              /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("g", { fill: themeColors.axisText, fontSize: 11, textAnchor: "middle", children: data.map((row, i) => {
                var _a2;
                return /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
                  "text",
                  {
                    x: m.left + (i + 0.5) / Math.max(1, data.length) * innerW,
                    y: m.top + innerH + 16,
                    children: String((_a2 = row[xAxisKey]) != null ? _a2 : "")
                  },
                  i
                );
              }) })
            ]
          }
        ),
        showTooltip && tooltip && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: legendPosition === "left" ? "flex-start" : legendPosition === "right" ? "flex-end" : "center",
              marginTop: legendPosition === "top" ? 0 : 8,
              marginBottom: legendPosition === "bottom" ? 0 : 8,
              fontSize: 12
            },
            children: series.map((s, i) => {
              var _a2, _b2;
              return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
                  "span",
                  {
                    style: {
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      background: (_a2 = s.color) != null ? _a2 : colors[i % colors.length]
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", { style: { color: themeColors.legendText }, children: (_b2 = s.name) != null ? _b2 : s.dataKey })
              ] }, s.dataKey);
            })
          }
        )
      ]
    }
  );
};
var BarChart_default = import_react39.default.memo(BarChartComponent);

// src/components/charts/PieChart.tsx
var import_react40 = __toESM(require("react"));
var import_jsx_runtime48 = require("react/jsx-runtime");
var DEFAULT_COLORS3 = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)",
  "var(--color-accent-sky-10, #E6F2FF)",
  "var(--color-accent-mint-10, #E9FFF4)",
  "var(--color-accent-amber-10, #FFF6DD)"
];
var PieChartComponent = ({
  data,
  innerRadius = 0,
  outerRadius = "80%",
  colors = DEFAULT_COLORS3,
  showLabels = false,
  showLabelLine = true,
  paddingAngle = 0,
  width = "100%",
  height = 300,
  margin = { top: 10, right: 10, left: 10, bottom: 10 },
  showTooltip = true,
  showLegend = true,
  legendPosition = "right",
  theme = "light",
  tooltipFollowPointer = true,
  tooltipAnimation = true,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d;
  const themeColors = CHART_THEME_COLORS[theme];
  const containerRef = (0, import_react40.useRef)(null);
  const [hovered, setHovered] = (0, import_react40.useState)(null);
  const [tooltip, setTooltip] = (0, import_react40.useState)(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const chartW = Math.max(200, typeof width === "number" ? width : 400);
  const chartH = Math.max(200, typeof height === "number" ? height : 300);
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : 10,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 10,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 10
  };
  const size = Math.min(chartW - m.left - m.right, chartH - m.top - m.bottom);
  const cx2 = chartW / 2;
  const cy = chartH / 2;
  const or = typeof outerRadius === "string" && outerRadius.endsWith("%") ? size / 2 * (parseFloat(outerRadius) / 100) : typeof outerRadius === "number" ? outerRadius : size / 2;
  const ir = typeof innerRadius === "string" && innerRadius.endsWith("%") ? size / 2 * (parseFloat(innerRadius) / 100) : typeof innerRadius === "number" ? innerRadius : 0;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const n = data.length;
  const totalPaddingDeg = paddingAngle * Math.max(0, n - 1);
  const totalSliceDeg = 360 - totalPaddingDeg;
  const startAngleOffset = 0;
  let currentDeg = startAngleOffset;
  const slices = data.map((d, i) => {
    const pct = d.value / total;
    const spanDeg = Math.max(0.5, pct * totalSliceDeg);
    const startDeg = currentDeg;
    currentDeg += spanDeg + (i < n - 1 ? paddingAngle : 0);
    return {
      ...d,
      startDeg,
      endDeg: startDeg + spanDeg,
      color: colors[i % colors.length]
    };
  });
  const handleSlicePointer = (0, import_react40.useCallback)(
    (e, i) => {
      setHovered(i);
      if (!showTooltip || !containerRef.current)
        return;
      const rect = containerRef.current.getBoundingClientRect();
      const slice = data[i];
      const pct = slice.value / total * 100;
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label: `${slice.name} (${pct.toFixed(1)}%)`,
        items: [
          {
            name: "Value",
            value: slice.value,
            color: colors[i % colors.length]
          }
        ]
      });
    },
    [showTooltip, data, colors, total]
  );
  const handleMouseLeave = (0, import_react40.useCallback)(() => {
    setHovered(null);
    setTooltip(null);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(
    "div",
    {
      ref: containerRef,
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        minWidth: 280,
        minHeight: 280,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: legendPosition === "left" || legendPosition === "right" ? "stretch" : "center",
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { style: { display: "flex", alignItems: "center", flex: 1, minHeight: 260 }, children: /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${chartW} ${chartH}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseLeave: handleMouseLeave,
            children: [
              slices.map((slice, i) => /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                "path",
                {
                  d: arcPath(cx2, cy, or, slice.startDeg, slice.endDeg, ir),
                  fill: slice.color,
                  stroke: themeColors.tooltipBg,
                  strokeWidth: 2,
                  opacity: hovered !== null && hovered !== i ? 0.5 : 1,
                  onMouseEnter: (e) => handleSlicePointer(e, i),
                  onMouseMove: (e) => handleSlicePointer(e, i),
                  style: { cursor: "pointer" },
                  children: !showTooltip && /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("title", { children: [
                    slice.name,
                    ": ",
                    slice.value,
                    " (",
                    (slice.value / total * 100).toFixed(1),
                    "%)"
                  ] })
                },
                i
              )),
              showLabels && slices.map((slice, i) => {
                const midDeg = (slice.startDeg + slice.endDeg) / 2;
                const labelR = ir + (or - ir) * 0.5;
                const { x: lx, y: ly } = polarToCartesian(cx2, cy, labelR, midDeg);
                return /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(
                  "text",
                  {
                    x: lx,
                    y: ly,
                    textAnchor: "middle",
                    dominantBaseline: "middle",
                    fontSize: 11,
                    fill: themeColors.tooltipText,
                    style: { pointerEvents: "none" },
                    children: [
                      (slice.value / total * 100).toFixed(0),
                      "%"
                    ]
                  },
                  i
                );
              })
            ]
          }
        ) }),
        showTooltip && tooltip && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: legendPosition === "left" ? "flex-start" : legendPosition === "right" ? "flex-end" : "center",
              marginTop: 8,
              fontSize: 12
            },
            children: data.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                "span",
                {
                  style: {
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    background: colors[i % colors.length]
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("span", { style: { color: themeColors.legendText }, children: [
                d.name,
                ": ",
                d.value
              ] })
            ] }, d.name))
          }
        )
      ]
    }
  );
};
var PieChart_default = import_react40.default.memo(PieChartComponent);

// src/components/charts/AreaChart.tsx
var import_react41 = __toESM(require("react"));
var import_jsx_runtime49 = require("react/jsx-runtime");
var DEFAULT_COLORS4 = [
  "var(--button-primary-default-bg, #2563EB)",
  "var(--color-state-success, #28A745)",
  "var(--color-state-warning, #FFC107)",
  "var(--color-state-error, #DC3545)",
  "var(--color-accent-lavender-40, #B9A7FF)"
];
var AreaChartComponent = ({
  data,
  xAxisKey = "name",
  series,
  colors = DEFAULT_COLORS4,
  stacked = false,
  curve = "monotone",
  strokeWidth = 2,
  width = "100%",
  height = 300,
  margin = { top: 10, right: 20, left: 40, bottom: 30 },
  showGrid = true,
  gridColor,
  showTooltip = true,
  showLegend = true,
  legendPosition = "bottom",
  theme = "light",
  tooltipFollowPointer = true,
  tooltipAnimation = true,
  showCrosshair = true,
  className = "",
  style = {}
}) => {
  var _a, _b, _c, _d;
  const themeColors = CHART_THEME_COLORS[theme];
  const gridStroke = gridColor != null ? gridColor : themeColors.gridColor;
  const [tooltip, setTooltip] = (0, import_react41.useState)(null);
  const w = typeof width === "number" ? width : 400;
  const h = typeof height === "number" ? height : 300;
  const m = {
    top: (_a = margin == null ? void 0 : margin.top) != null ? _a : 10,
    right: (_b = margin == null ? void 0 : margin.right) != null ? _b : 20,
    bottom: (_c = margin == null ? void 0 : margin.bottom) != null ? _c : 30,
    left: (_d = margin == null ? void 0 : margin.left) != null ? _d : 40
  };
  const innerW = w - m.left - m.right;
  const innerH = h - m.top - m.bottom;
  const [yMin, yMax] = (0, import_react41.useMemo)(
    () => getValueExtent(data, series, stacked),
    [data, series, stacked]
  );
  const xScale = (0, import_react41.useMemo)(
    () => scaleLinear([0, Math.max(1, data.length - 1)], [0, innerW]),
    [data.length, innerW]
  );
  const yScale = (0, import_react41.useMemo)(
    () => scaleLinear([yMin, yMax], [innerH, 0]),
    [yMin, yMax, innerH]
  );
  const finalPaths = (0, import_react41.useMemo)(() => {
    if (stacked) {
      const cum = new Array(data.length).fill(0);
      return series.map((s, si) => {
        var _a2, _b2;
        const basePoints = data.map((_, i) => ({
          x: m.left + xScale(i),
          y: si === 0 ? m.top + innerH : m.top + yScale(cum[i])
        }));
        const topPoints = data.map((row, i) => {
          var _a3;
          const v = (_a3 = Number(row[s.dataKey])) != null ? _a3 : 0;
          cum[i] += v;
          return { x: m.left + xScale(i), y: m.top + yScale(cum[i]) };
        });
        const areaD = "M " + topPoints.map((p) => `${p.x} ${p.y}`).join(" L ") + " L " + [...basePoints].reverse().map((p) => `${p.x} ${p.y}`).join(" L ") + " Z";
        return {
          areaPath: areaD,
          linePath: linePath(topPoints, curve),
          points: topPoints,
          color: (_a2 = s.color) != null ? _a2 : colors[si % colors.length],
          name: (_b2 = s.name) != null ? _b2 : s.dataKey
        };
      });
    }
    return series.map((s, si) => {
      var _a2, _b2;
      const points = data.map((d, i) => {
        const v = d[s.dataKey];
        const num = typeof v === "number" ? v : 0;
        return { x: m.left + xScale(i), y: m.top + yScale(num) };
      }).filter((p) => !Number.isNaN(p.y));
      const baseY = m.top + innerH;
      return {
        areaPath: areaPath(points, baseY, curve),
        linePath: linePath(points, curve),
        points,
        color: (_a2 = s.color) != null ? _a2 : colors[si % colors.length],
        name: (_b2 = s.name) != null ? _b2 : s.dataKey
      };
    });
  }, [data, series, colors, stacked, curve, xScale, yScale, m, innerH]);
  const handleMouseMove = (0, import_react41.useCallback)(
    (e) => {
      var _a2;
      if (!showTooltip)
        return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - m.left;
      const idx = Math.round(x / innerW * (data.length - 1));
      const clamped = Math.max(0, Math.min(idx, data.length - 1));
      const row = data[clamped];
      const label = String((_a2 = row[xAxisKey]) != null ? _a2 : "");
      const items = series.map((s, i) => {
        var _a3, _b2, _c2;
        return {
          name: (_a3 = s.name) != null ? _a3 : s.dataKey,
          value: (_b2 = Number(row[s.dataKey])) != null ? _b2 : 0,
          color: (_c2 = s.color) != null ? _c2 : colors[i % colors.length]
        };
      });
      setTooltip({
        pointerX: e.clientX - rect.left,
        pointerY: e.clientY - rect.top,
        cw: rect.width,
        ch: rect.height,
        label,
        items,
        activeIndex: clamped
      });
    },
    [showTooltip, data, series, xAxisKey, colors, innerW, m.left]
  );
  const handleMouseLeave = (0, import_react41.useCallback)(() => setTooltip(null), []);
  return /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
    "div",
    {
      className,
      style: {
        width: typeof width === "string" ? width : w,
        height: typeof height === "string" ? height : h,
        position: "relative",
        ...style
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
          "svg",
          {
            width: "100%",
            height: "100%",
            viewBox: `0 0 ${w} ${h}`,
            preserveAspectRatio: "xMidYMid meet",
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            children: [
              showGrid && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("g", { stroke: gridStroke, strokeDasharray: "3 3", strokeOpacity: 0.6, children: [0.25, 0.5, 0.75].map((t) => /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
                "line",
                {
                  x1: m.left,
                  y1: m.top + innerH * t,
                  x2: m.left + innerW,
                  y2: m.top + innerH * t
                },
                t
              )) }),
              finalPaths.map(({ areaPath: ap, linePath: lp, color, name }) => /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("g", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
                  "path",
                  {
                    d: ap,
                    fill: color,
                    fillOpacity: stacked ? 0.8 : 0.3,
                    stroke: "none"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
                  "path",
                  {
                    d: lp,
                    fill: "none",
                    stroke: color,
                    strokeWidth,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              ] }, name)),
              showTooltip && showCrosshair && tooltip !== null && data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("g", { className: "ds-chart-crosshair", pointerEvents: "none", children: [
                /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
                  "line",
                  {
                    x1: m.left + xScale(tooltip.activeIndex),
                    y1: m.top,
                    x2: m.left + xScale(tooltip.activeIndex),
                    y2: m.top + innerH,
                    stroke: themeColors.gridColor,
                    strokeWidth: 1,
                    strokeDasharray: "4 6",
                    opacity: 0.85
                  }
                ),
                stacked ? finalPaths.map(({ points, color, name }) => {
                  const p = points[tooltip.activeIndex];
                  if (!p)
                    return null;
                  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
                    "circle",
                    {
                      cx: p.x,
                      cy: p.y,
                      r: 6,
                      fill: color,
                      stroke: themeColors.tooltipBg,
                      strokeWidth: 2,
                      opacity: 0.95
                    },
                    `hit-${name}`
                  );
                }) : series.map((s, si) => {
                  var _a2, _b2;
                  const row = data[tooltip.activeIndex];
                  const num = (_a2 = Number(row[s.dataKey])) != null ? _a2 : 0;
                  const cx2 = m.left + xScale(tooltip.activeIndex);
                  const cy = m.top + yScale(num);
                  const color = (_b2 = s.color) != null ? _b2 : colors[si % colors.length];
                  return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
                    "circle",
                    {
                      cx: cx2,
                      cy,
                      r: 6,
                      fill: color,
                      stroke: themeColors.tooltipBg,
                      strokeWidth: 2,
                      opacity: 0.95
                    },
                    `hit-${s.dataKey}`
                  );
                })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("g", { fill: themeColors.axisText, fontSize: 11, textAnchor: "middle", children: data.map((row, i) => {
                var _a2;
                return /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("text", { x: m.left + xScale(i), y: m.top + innerH + 16, children: String((_a2 = row[xAxisKey]) != null ? _a2 : "") }, i);
              }) })
            ]
          }
        ),
        showTooltip && tooltip && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
          ChartTooltip,
          {
            theme,
            open: true,
            pointerX: tooltip.pointerX,
            pointerY: tooltip.pointerY,
            containerWidth: tooltip.cw,
            containerHeight: tooltip.ch,
            label: tooltip.label,
            items: tooltip.items,
            animation: tooltipAnimation,
            followPointer: tooltipFollowPointer
          }
        ),
        showLegend && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: legendPosition === "left" ? "flex-start" : legendPosition === "right" ? "flex-end" : "center",
              marginTop: legendPosition === "top" ? 0 : 8,
              marginBottom: legendPosition === "bottom" ? 0 : 8,
              fontSize: 12
            },
            children: series.map((s, i) => {
              var _a2, _b2;
              return /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
                  "span",
                  {
                    style: {
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      background: (_a2 = s.color) != null ? _a2 : colors[i % colors.length]
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("span", { style: { color: themeColors.legendText }, children: (_b2 = s.name) != null ? _b2 : s.dataKey })
              ] }, s.dataKey);
            })
          }
        )
      ]
    }
  );
};
var AreaChart_default = import_react41.default.memo(AreaChartComponent);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AppShell,
  AppSidebar,
  AppTopbar,
  AreaChart,
  Avtar,
  Badge,
  BarChart,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Calendar,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartTooltip,
  CheckBox,
  Chip,
  Combobox,
  DashboardShell,
  DatePicker,
  Divider,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Dropzone,
  FileUpload,
  Form,
  GradientText,
  Grid,
  GridItem,
  Hyperlink,
  Icon,
  Input,
  InputSearch,
  LineChart,
  Modal,
  OtpBox,
  PieChart,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProgressBar,
  RadioGroup,
  Select,
  Stepper,
  StepperStep,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  TextArea,
  TextView,
  ToolTip,
  detectFileKindFromBuffer,
  mergeSidebarTokensStyle,
  mergeTopbarTokensStyle,
  parseAcceptString,
  readAppSidebarPersist,
  validateFileSecurity,
  validateFilename,
  validateFilesSecurity,
  writeAppSidebarPersist
});
//# sourceMappingURL=index.js.map