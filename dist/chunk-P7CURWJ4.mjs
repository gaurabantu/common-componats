import {
  error_default
} from "./chunk-7Q43KPIX.mjs";
import {
  Masker,
  isAadhaar,
  isAcknowledgementNumber,
  isAlphabetic,
  isAlphanumeric,
  isEntityName,
  isIndianPassport,
  isIndianTIN,
  isMobile,
  isNumeric,
  isPanNumber,
  isPincode,
  isTAN,
  isValidEmail,
  isValidLandlineNumber,
  isValidSTDCode
} from "./chunk-G5E52JQY.mjs";
import {
  close_default
} from "./chunk-4PQA5JTI.mjs";
import {
  Icon_default
} from "./chunk-6JJMOGWW.mjs";

// src/components/atoms/TextInput/TextInput.config.ts
var HEADER_SEARCH_LAYOUT = {
  /**
   * Tier heights mirror `Select` sm/md/lg `minHeight` (--button-height-sm / --button-height-lg / 3rem) so filter rows align in Storybook
   * and apps without ad-hoc pixel tweaks.
   */
  sm: {
    shellMinHeight: 32,
    shellMinHeightToken: "var(--button-height-sm)",
    horizontalPadding: 9,
    prefixAddonPadding: 7,
    suffixPadLeft: 7,
    suffixPadRight: 3,
    inputLineHeight: 1.35,
    decorativeTrailingSearchIcon: 14,
    clearIconSize: 11,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 24,
    integratedIconPadX: 9
  },
  md: {
    shellMinHeight: 40,
    shellMinHeightToken: "var(--button-height-lg)",
    horizontalPadding: 12,
    prefixAddonPadding: 9,
    suffixPadLeft: 10,
    suffixPadRight: 4,
    inputLineHeight: 1.35,
    decorativeTrailingSearchIcon: 16,
    clearIconSize: 12,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 32,
    integratedIconPadX: 11
  },
  lg: {
    shellMinHeight: 48,
    shellMinHeightToken: "3rem",
    horizontalPadding: 12,
    prefixAddonPadding: 9,
    suffixPadLeft: 10,
    suffixPadRight: 4,
    inputLineHeight: 1.38,
    decorativeTrailingSearchIcon: 17,
    clearIconSize: 12,
    clearHitPaddingX: 4,
    searchActionInsetHeight: 40,
    integratedIconPadX: 12
  }
};

// src/components/atoms/TextInput/TextInput.utils.ts
function roundedToCssCorner(rounded) {
  const r = rounded != null ? rounded : "3";
  if (r === "0")
    return 0;
  if (r === "1")
    return "var(--radius-xs, 2px)";
  if (r === "2")
    return "var(--radius-sm, 3px)";
  if (r === "3")
    return "var(--radius-base, 4px)";
  if (r === "4")
    return "var(--radius-md, 6px)";
  if (r === "5")
    return "var(--radius-lg, 8px)";
  return "9999px";
}

// src/assets/search.svg
var search_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_7433_74974" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_7433_74974)">%0A<path d="M7.14894 11.7119C5.86819 11.7119 4.78356 11.2677 3.89506 10.3794C3.00669 9.49087 2.5625 8.40625 2.5625 7.1255C2.5625 5.84475 3.00669 4.76012 3.89506 3.87162C4.78356 2.98325 5.86819 2.53906 7.14894 2.53906C8.42969 2.53906 9.51431 2.98325 10.4028 3.87162C11.2912 4.76012 11.7354 5.84475 11.7354 7.1255C11.7354 7.66112 11.6455 8.17269 11.4657 8.66019C11.2859 9.14769 11.0459 9.57169 10.7459 9.93219L15.0614 14.2477C15.1653 14.3514 15.2184 14.4819 15.2208 14.6392C15.2232 14.7964 15.1701 14.9294 15.0614 15.038C14.9528 15.1466 14.8211 15.2009 14.6662 15.2009C14.5114 15.2009 14.3797 15.1466 14.2711 15.038L9.95563 10.7225C9.58063 11.0321 9.14937 11.2744 8.66187 11.4494C8.17437 11.6244 7.67006 11.7119 7.14894 11.7119ZM7.14894 10.5871C8.11531 10.5871 8.93381 10.2517 9.60444 9.581C10.2752 8.91037 10.6106 8.09187 10.6106 7.1255C10.6106 6.15912 10.2752 5.34062 9.60444 4.67C8.93381 3.99925 8.11531 3.66387 7.14894 3.66387C6.18256 3.66387 5.36406 3.99925 4.69344 4.67C4.02269 5.34062 3.68731 6.15912 3.68731 7.1255C3.68731 8.09187 4.02269 8.91037 4.69344 9.581C5.36406 10.2517 6.18256 10.5871 7.14894 10.5871Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/components/atoms/TextInput/TextInput.tsx
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";

// src/assets/visibility_on.svg
var visibility_on_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_2141_81048" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_2141_81048)">%0A<path d="M9.0022 11.5577C9.85208 11.5577 10.5739 11.2603 11.1676 10.6654C11.7614 10.0706 12.0583 9.34819 12.0583 8.49831C12.0583 7.64844 11.7608 6.92662 11.166 6.33287C10.5711 5.73912 9.8487 5.44225 8.99883 5.44225C8.14895 5.44225 7.42714 5.73969 6.83339 6.33456C6.23964 6.92944 5.94277 7.65181 5.94277 8.50169C5.94277 9.35156 6.2402 10.0734 6.83508 10.6671C7.42995 11.2609 8.15233 11.5577 9.0022 11.5577ZM9.00052 10.525C8.43802 10.525 7.95989 10.3281 7.56614 9.93438C7.17239 9.54063 6.97552 9.0625 6.97552 8.5C6.97552 7.9375 7.17239 7.45938 7.56614 7.06563C7.95989 6.67188 8.43802 6.475 9.00052 6.475C9.56302 6.475 10.0411 6.67188 10.4349 7.06563C10.8286 7.45938 11.0255 7.9375 11.0255 8.5C11.0255 9.0625 10.8286 9.54063 10.4349 9.93438C10.0411 10.3281 9.56302 10.525 9.00052 10.525ZM9.00052 13.75C7.42164 13.75 5.97764 13.3288 4.66852 12.4864C3.35939 11.6442 2.31445 10.5361 1.5337 9.16206C1.4712 9.05431 1.42552 8.94575 1.39664 8.83638C1.36789 8.727 1.35352 8.61475 1.35352 8.49963C1.35352 8.3845 1.36789 8.27237 1.39664 8.16325C1.42552 8.05412 1.4712 7.94569 1.5337 7.83794C2.31445 6.46394 3.35939 5.35581 4.66852 4.51356C5.97764 3.67119 7.42164 3.25 9.00052 3.25C10.5794 3.25 12.0234 3.67119 13.3325 4.51356C14.6416 5.35581 15.6866 6.46394 16.4673 7.83794C16.5298 7.94569 16.5755 8.05425 16.6044 8.16362C16.6331 8.273 16.6475 8.38525 16.6475 8.50037C16.6475 8.6155 16.6331 8.72762 16.6044 8.83675C16.5755 8.94587 16.5298 9.05431 16.4673 9.16206C15.6866 10.5361 14.6416 11.6442 13.3325 12.4864C12.0234 13.3288 10.5794 13.75 9.00052 13.75ZM9.00052 12.625C10.413 12.625 11.7099 12.2531 12.8911 11.5094C14.0724 10.7656 14.9755 9.7625 15.6005 8.5C14.9755 7.2375 14.0724 6.23438 12.8911 5.49062C11.7099 4.74687 10.413 4.375 9.00052 4.375C7.58802 4.375 6.29114 4.74687 5.10989 5.49062C3.92864 6.23438 3.02552 7.2375 2.40052 8.5C3.02552 9.7625 3.92864 10.7656 5.10989 11.5094C6.29114 12.2531 7.58802 12.625 9.00052 12.625Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/assets/visibility_off.svg
var visibility_off_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<mask id="mask0_8283_202257" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">%0A<rect width="18" height="18" fill="%23D9D9D9"/>%0A</mask>%0A<g mask="url(%23mask0_8283_202257)">%0A<path d="M11.1601 6.46375C11.4649 6.76862 11.7004 7.13906 11.8668 7.57506C12.0332 8.01119 12.0961 8.44894 12.0556 8.88831C12.0556 9.03256 12.0037 9.15469 11.9 9.25469C11.7961 9.35469 11.6721 9.40469 11.5278 9.40469C11.3836 9.40469 11.2614 9.35469 11.1614 9.25469C11.0614 9.15469 11.0114 9.03256 11.0114 8.88831C11.0596 8.55856 11.0324 8.24606 10.9301 7.95081C10.8277 7.65569 10.6702 7.40187 10.4577 7.18937C10.2452 6.97687 9.989 6.81556 9.689 6.70544C9.389 6.59531 9.07262 6.56669 8.73987 6.61956C8.59562 6.62444 8.47112 6.57612 8.36637 6.47462C8.2615 6.37325 8.20669 6.25044 8.20194 6.10619C8.19706 5.96194 8.24344 5.83737 8.34106 5.7325C8.43869 5.62775 8.55962 5.573 8.70387 5.56825C9.14037 5.51825 9.57906 5.57519 10.0199 5.73906C10.4608 5.90306 10.8409 6.14462 11.1601 6.46375ZM9.00238 4.4965C8.736 4.4965 8.47469 4.5095 8.21844 4.5355C7.96219 4.56137 7.70712 4.60412 7.45325 4.66375C7.29362 4.6965 7.14988 4.67369 7.022 4.59531C6.89412 4.51694 6.80619 4.40419 6.75819 4.25706C6.71006 4.10519 6.72594 3.96075 6.80581 3.82375C6.88556 3.68675 7.00137 3.60187 7.15325 3.56912C7.45525 3.497 7.76031 3.44606 8.06844 3.41631C8.37669 3.38644 8.688 3.3715 9.00238 3.3715C10.6139 3.3715 12.0942 3.79025 13.4433 4.62775C14.7923 5.46525 15.8298 6.59844 16.5556 8.02731C16.6056 8.12244 16.6419 8.21831 16.6646 8.31494C16.6872 8.41156 16.6985 8.51375 16.6985 8.6215C16.6985 8.72925 16.6891 8.83144 16.6704 8.92806C16.6516 9.02469 16.6173 9.12056 16.5673 9.21569C16.3375 9.69644 16.0582 10.1447 15.7293 10.5606C15.4004 10.9765 15.0384 11.3585 14.6431 11.7066C14.5269 11.8105 14.394 11.8535 14.2445 11.8356C14.0949 11.8179 13.972 11.7431 13.8759 11.6114C13.7798 11.4796 13.7399 11.3383 13.7563 11.1874C13.7726 11.0364 13.8389 10.909 13.9552 10.8051C14.2937 10.4984 14.6024 10.1631 14.8813 9.79919C15.1601 9.43519 15.4005 9.04262 15.6024 8.6215C14.9774 7.359 14.0743 6.35587 12.893 5.61212C11.7118 4.86837 10.4149 4.4965 9.00238 4.4965ZM9.00238 13.8715C7.4235 13.8715 5.97638 13.4496 4.661 12.6059C3.34563 11.7621 2.3 10.6508 1.52413 9.27194C1.46163 9.17681 1.41594 9.07344 1.38706 8.96181C1.35819 8.85031 1.34375 8.73687 1.34375 8.6215C1.34375 8.50612 1.35625 8.39456 1.38125 8.28681C1.40625 8.17919 1.45 8.07394 1.5125 7.97106C1.79138 7.46144 2.10725 6.97606 2.46012 6.51494C2.813 6.05394 3.21875 5.64075 3.67738 5.27537L1.98406 3.57044C1.88031 3.45894 1.82912 3.3265 1.8305 3.17312C1.832 3.01975 1.88706 2.88875 1.99569 2.78013C2.10431 2.6715 2.23606 2.61719 2.39094 2.61719C2.54569 2.61719 2.67738 2.6715 2.786 2.78013L15.2188 15.2129C15.3226 15.3167 15.3777 15.4453 15.3839 15.5986C15.3902 15.7519 15.3351 15.8868 15.2188 16.0032C15.1101 16.1118 14.9784 16.1661 14.8235 16.1661C14.6688 16.1661 14.5371 16.1118 14.4284 16.0032L11.789 13.3868C11.3466 13.5579 10.892 13.6815 10.4251 13.7575C9.95837 13.8335 9.48413 13.8715 9.00238 13.8715ZM4.46788 6.06569C4.02838 6.40519 3.63338 6.78906 3.28288 7.21731C2.93238 7.64569 2.63888 8.11375 2.40237 8.6215C3.02737 9.884 3.9305 10.8871 5.11175 11.6309C6.293 12.3746 7.58988 12.7465 9.00238 12.7465C9.3245 12.7465 9.64156 12.7249 9.95356 12.6816C10.2656 12.6384 10.5754 12.5716 10.8832 12.4812L9.93406 11.509C9.78219 11.5754 9.6305 11.6203 9.479 11.6438C9.32763 11.6674 9.16875 11.6792 9.00238 11.6792C8.15138 11.6792 7.429 11.3824 6.83525 10.7886C6.2415 10.1949 5.94462 9.4725 5.94462 8.6215C5.94462 8.45512 5.95762 8.29625 5.98362 8.14487C6.00962 7.99337 6.05337 7.84169 6.11487 7.68981L4.46788 6.06569Z" fill="%23212121"/>%0A</g>%0A</svg>%0A';

// src/assets/success.svg
var success_default = 'data:image/svg+xml,<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M6.66667 13.3333C5.74444 13.3333 4.87778 13.1582 4.06667 12.808C3.25556 12.4582 2.55 11.9833 1.95 11.3833C1.35 10.7833 0.875111 10.0778 0.525333 9.26667C0.175111 8.45555 0 7.58889 0 6.66667C0 5.74444 0.175111 4.87778 0.525333 4.06667C0.875111 3.25556 1.35 2.55 1.95 1.95C2.55 1.35 3.25556 0.874889 4.06667 0.524667C4.87778 0.174889 5.74444 0 6.66667 0C7.38889 0 8.07222 0.105555 8.71667 0.316667C9.36111 0.527778 9.95555 0.822222 10.5 1.2L9.53333 2.18333C9.11111 1.91667 8.66111 1.70822 8.18333 1.558C7.70555 1.40822 7.2 1.33333 6.66667 1.33333C5.18889 1.33333 3.93067 1.85267 2.892 2.89133C1.85289 3.93044 1.33333 5.18889 1.33333 6.66667C1.33333 8.14444 1.85289 9.40289 2.892 10.442C3.93067 11.4807 5.18889 12 6.66667 12C8.14444 12 9.40289 11.4807 10.442 10.442C11.4807 9.40289 12 8.14444 12 6.66667C12 6.46667 11.9889 6.26667 11.9667 6.06667C11.9444 5.86667 11.9111 5.67222 11.8667 5.48333L12.95 4.4C13.0722 4.75556 13.1667 5.12222 13.2333 5.5C13.3 5.87778 13.3333 6.26667 13.3333 6.66667C13.3333 7.58889 13.1582 8.45555 12.808 9.26667C12.4582 10.0778 11.9833 10.7833 11.3833 11.3833C10.7833 11.9833 10.0778 12.4582 9.26667 12.808C8.45555 13.1582 7.58889 13.3333 6.66667 13.3333ZM5.73333 9.73333L2.9 6.9L3.83333 5.96667L5.73333 7.86667L12.4 1.18333L13.3333 2.11667L5.73333 9.73333Z" fill="%233C9718"/>%0A</svg>%0A';

// src/components/atoms/TextInput/TextInput.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var pxToRem = (px) => `${px / 16}rem`;
var TextInput = forwardRef(({
  id: idProp,
  label = "",
  type = "text",
  placeholder,
  validation = "none",
  required = false,
  value,
  defaultValue,
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
  trailingRail = "default",
  size = "md",
  autoCorrection = false,
  spellCheck: spellCheckProp,
  autoCorrect: autoCorrectProp,
  autoCapitalize: autoCapitalizeProp,
  inputClassName,
  inputStyle,
  style: styleProp,
  ...rest
}, ref) => {
  var _a, _b, _c;
  const isControlled = value !== void 0;
  const initialValue = (_a = isControlled ? value : defaultValue) != null ? _a : "";
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(isVerified);
  const [showValue, setShowValue] = useState(false);
  const [displayValue, setDisplayValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const actualValueRef = useRef(initialValue);
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current, []);
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
  const reactId = useId();
  const inputId = (idProp == null ? void 0 : idProp.trim()) ? idProp : `text-input-${reactId}`;
  useEffect(() => {
    const next = (isControlled ? value : actualValueRef.current) || "";
    actualValueRef.current = next;
    updateDisplayValue(next);
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
  const resolvedMaxLength = useMemo(() => {
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
  const roundedStyle = roundedToCssCorner(rounded);
  const getInputType = () => {
    if (showValue)
      return "text";
    if (type === "password" && showToggleIcon)
      return "password";
    return type;
  };
  const hasValue = ((_b = displayValue == null ? void 0 : displayValue.trim()) != null ? _b : "") !== "";
  const resolvedStatus = statusProp != null ? statusProp : error ? "error" : verified ? "success" : void 0;
  const baseSizeTokens = {
    sm: {
      minHeight: "var(--button-height-sm)",
      horizontalPadding: "0.625rem",
      addonPadding: "0.5rem",
      fontSize: "var(--text-small-size)"
    },
    md: {
      minHeight: "var(--button-height-lg)",
      horizontalPadding: "0.75rem",
      addonPadding: "0.625rem",
      fontSize: "var(--text-body-size)"
    },
    lg: {
      minHeight: "3rem",
      horizontalPadding: "0.875rem",
      addonPadding: "0.75rem",
      fontSize: "var(--text-body-size)"
    }
  };
  const isHeaderSearchRail = validation === "headerSearch";
  const isIntegratedRail = trailingRail === "integrated" && isHeaderSearchRail;
  const hdr = isHeaderSearchRail ? HEADER_SEARCH_LAYOUT[size] : void 0;
  const fieldMetrics = hdr ? {
    minHeight: hdr.shellMinHeightToken,
    horizontalPadding: pxToRem(hdr.horizontalPadding),
    addonPadding: baseSizeTokens[size].addonPadding,
    fontSize: baseSizeTokens[size].fontSize,
    inputLineHeight: hdr.inputLineHeight,
    suffixPadLeft: pxToRem(hdr.suffixPadLeft),
    suffixPadRight: pxToRem(hdr.suffixPadRight),
    prefixPadLR: pxToRem(hdr.prefixAddonPadding),
    clearIconPx: pxToRem(hdr.clearIconSize),
    clearPadX: pxToRem(hdr.clearHitPaddingX),
    decorativeTrailingPx: pxToRem(hdr.decorativeTrailingSearchIcon)
  } : {
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
    decorativeTrailingPx: 16
  };
  const shouldShowToggle = showToggleIcon && type === "password";
  const colors = {
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    bgSurface: "var(--color-bg-surface)",
    bgPage: "var(--color-bg-page)",
    borderDefault: "var(--color-border-default)",
    stateError: "var(--color-state-error)",
    stateWarning: "var(--color-state-warning)",
    stateSuccess: "var(--color-state-success)"
  };
  const resolvedBorderColor = resolvedStatus === "error" ? colors.stateError : resolvedStatus === "warning" ? colors.stateWarning : resolvedStatus === "success" ? colors.stateSuccess : isFocused ? "var(--button-primary-focus-ring)" : colors.borderDefault;
  const wrapperStyle = variant === "filled" ? {
    minHeight: fieldMetrics.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: colors.bgPage,
    border: `1.5px solid ${resolvedBorderColor}`
  } : variant === "borderless" ? {
    minHeight: fieldMetrics.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: "transparent",
    border: "1px solid transparent"
  } : variant === "underlined" ? {
    minHeight: fieldMetrics.minHeight,
    borderRadius: 0,
    boxSizing: "border-box",
    backgroundColor: "transparent",
    border: "0 solid transparent",
    borderBottomWidth: 1.5,
    borderBottomColor: resolvedBorderColor
  } : {
    minHeight: fieldMetrics.minHeight,
    borderRadius: roundedStyle,
    boxSizing: "border-box",
    backgroundColor: colors.bgSurface,
    border: `1.5px solid ${resolvedBorderColor}`
  };
  const resolvedSuffix = suffix !== void 0 ? suffix : type === "search" ? /* @__PURE__ */ jsx(
    Icon_default,
    {
      src: search_default,
      alt: "",
      width: fieldMetrics.decorativeTrailingPx,
      height: fieldMetrics.decorativeTrailingPx
    }
  ) : null;
  const hasRightAddons = Boolean(resolvedSuffix || allowClear && hasValue && !disabled || shouldShowToggle);
  const charCount = (_c = displayValue == null ? void 0 : displayValue.length) != null ? _c : 0;
  const countMax = validation === "businessAID" ? resolvedMaxLength + 2 : resolvedMaxLength;
  const fieldWrapperStyle = {
    ...wrapperStyle,
    ...isHeaderSearchRail ? { maxHeight: fieldMetrics.minHeight } : {},
    display: "grid",
    alignItems: "stretch",
    overflow: "hidden",
    width: fullWidth ? "100%" : "auto",
    gridTemplateColumns: `${prefix ? "auto " : ""}minmax(0, 1fr)${hasRightAddons ? " auto" : ""}`,
    transition: "border-color 150ms, box-shadow 150ms, background-color 150ms",
    ...isIntegratedRail ? { gap: 0 } : {},
    ...isIntegratedRail ? {
      "--ucs-textfield-outer-radius": roundedStyle === 0 ? "0" : roundedStyle
    } : {}
  };
  const suffixPadLeft = isIntegratedRail ? 0 : fieldMetrics.suffixPadLeft;
  const suffixPadRight = isIntegratedRail ? 0 : fieldMetrics.suffixPadRight;
  const inputElementStyle = {
    // Fill the shell's grid row instead of repeating its min-height: the shell is border-box with a
    // 1.5px border, so a full-height input made every TextInput 3px taller than a Select of the
    // same size (33 vs 30px at sm) and fields in one form row did not line up.
    height: "auto",
    alignSelf: "stretch",
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
    paddingRight: hasRightAddons ? 0 : fieldMetrics.horizontalPadding
  };
  return /* @__PURE__ */ jsxs("div", { className: `${fullWidth ? "w-full" : "inline-block"} ${className}`, children: [
    label && /* @__PURE__ */ jsxs(
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
          required && /* @__PURE__ */ jsx("span", { className: "text-[var(--color-state-error)] ml-0.5", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: [
          disabled ? "opacity-50 cursor-not-allowed" : "",
          borderColorClass,
          isIntegratedRail ? "ucs-text-input-field--integrated-rail" : ""
        ].filter(Boolean).join(" "),
        style: fieldWrapperStyle,
        children: [
          prefix && /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "stretch",
                flexShrink: 0,
                color: colors.textSecondary,
                paddingLeft: fieldMetrics.prefixPadLR,
                paddingRight: fieldMetrics.prefixPadLR
              },
              children: prefix
            }
          ),
          /* @__PURE__ */ jsx(
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
              className: [
                "disabled:cursor-not-allowed",
                getInputType() === "search" ? "ucs-text-input--search" : "",
                inputClassName
              ].filter(Boolean).join(" "),
              ...rest,
              style: styleProp || inputStyle ? { ...inputElementStyle, ...styleProp, ...inputStyle } : inputElementStyle,
              spellCheck: spellCheckProp != null ? spellCheckProp : autoCorrection ? true : false,
              autoCorrect: autoCorrectProp != null ? autoCorrectProp : autoCorrection ? "on" : "off",
              autoCapitalize: autoCapitalizeProp != null ? autoCapitalizeProp : autoCorrection ? void 0 : "none"
            }
          ),
          hasRightAddons && /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                display: "flex",
                alignItems: isIntegratedRail ? "stretch" : "center",
                alignSelf: "stretch",
                flexShrink: 0,
                height: "100%",
                ...isIntegratedRail ? { minHeight: fieldMetrics.minHeight } : {}
              },
              children: (() => {
                const suffixJsx = resolvedSuffix ? /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "stretch",
                      flexShrink: 0,
                      color: colors.textSecondary,
                      paddingLeft: suffixPadLeft,
                      paddingRight: suffixPadRight
                    },
                    children: resolvedSuffix
                  }
                ) : null;
                const clearJsx = allowClear && hasValue && !disabled ? /* @__PURE__ */ jsx(
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
                      minWidth: isHeaderSearchRail ? pxToRem(isIntegratedRail ? 28 : 26) : fieldMetrics.minHeight,
                      paddingLeft: fieldMetrics.clearPadX,
                      paddingRight: fieldMetrics.clearPadX,
                      boxSizing: "border-box",
                      cursor: "pointer",
                      color: "inherit",
                      flexShrink: 0
                    },
                    "aria-label": "Clear",
                    children: /* @__PURE__ */ jsx(Icon_default, { src: close_default, alt: "", height: fieldMetrics.clearIconPx, width: fieldMetrics.clearIconPx, "aria-hidden": true })
                  }
                ) : null;
                const toggleJsx = shouldShowToggle ? /* @__PURE__ */ jsx(
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
                      minWidth: fieldMetrics.minHeight,
                      paddingLeft: fieldMetrics.addonPadding,
                      paddingRight: fieldMetrics.addonPadding,
                      boxSizing: "border-box",
                      cursor: "pointer",
                      color: "inherit",
                      flexShrink: 0
                    },
                    "aria-label": showValue ? "Hide value" : "Show value",
                    tabIndex: disabled ? -1 : 0,
                    disabled,
                    children: /* @__PURE__ */ jsx(
                      Icon_default,
                      {
                        src: showValue ? toggleOffIcon : toggleIcon,
                        alt: showValue ? "Hide" : "Show",
                        height: toggleIconSize,
                        width: toggleIconSize
                      }
                    )
                  }
                ) : null;
                if (isIntegratedRail) {
                  return /* @__PURE__ */ jsxs(Fragment, { children: [
                    clearJsx,
                    suffixJsx,
                    toggleJsx
                  ] });
                }
                return /* @__PURE__ */ jsxs(Fragment, { children: [
                  suffixJsx,
                  clearJsx,
                  toggleJsx
                ] });
              })()
            }
          )
        ]
      }
    ),
    (showCount || showVerifiedStatus || error) && /* @__PURE__ */ jsxs(
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
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                minWidth: 0
              },
              children: [
                showVerifiedStatus && verified && /* @__PURE__ */ jsxs(
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
                      /* @__PURE__ */ jsx(Icon_default, { src: verifiedIcon, alt: "", height: statusIconSize, width: statusIconSize, "aria-hidden": true }),
                      /* @__PURE__ */ jsx("span", { children: "Verified" })
                    ]
                  }
                ),
                error && /* @__PURE__ */ jsxs(
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
                      /* @__PURE__ */ jsx(Icon_default, { src: errorIcon, alt: "", height: statusIconSize, width: statusIconSize, "aria-hidden": true }),
                      /* @__PURE__ */ jsx("span", { children: error })
                    ]
                  }
                )
              ]
            }
          ),
          showCount && /* @__PURE__ */ jsxs(
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

export {
  HEADER_SEARCH_LAYOUT,
  roundedToCssCorner,
  search_default,
  TextInput_default
};
//# sourceMappingURL=chunk-P7CURWJ4.mjs.map