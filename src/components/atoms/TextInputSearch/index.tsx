import React from "react";
import Icon, { type IconSource } from "../Icon";
import TextInput from "../TextInput/TextInput";
import Button from "../Button";
import SearchIcon from "../../../assets/search.svg";
import type { ButtonProps } from "../Button/Button.types";
import { HEADER_SEARCH_LAYOUT } from "../TextInput/TextInput.config";
import { roundedToCssCorner } from "../TextInput/TextInput.utils";
import { railButtonSize } from "./TextInputSearch.utils";
import "./TextInputSearch.css";

const pxToRem = (px: number) => `${px / 16}rem`;

/** Right-side action (`showSearchButton`) — icon-filled vs text label. */
export type SearchButtonDisplay = "icon" | "text";

/** Passed to trailing `Button` (always rendered as `<button type="button">`, not `<a>`). */
export type SearchActionButtonProps = Omit<
  Partial<Extract<ButtonProps, { href?: undefined }>>,
  "onClick" | "disabled" | "loading" | "href" | "type"
>;

/** Search field with optional trailing action powered by `Button` (colors, variants, icon/text). */
export interface TextInputSearchProps {
  id?: string;
  /** Left icon (default: magnifier). Set to `null` to hide. */
  leftIcon?: IconSource | null;
  leftIconHeight?: number | string;
  leftIconWidth?: number | string;
  leftIconColor?: string;
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  onSearch?: (val: string) => void;
  errorMessage?: string;
  size?: "sm" | "md" | "lg" | "";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  ariaLabel?: string;
  /**
   * Clear control when text exists.
   * When omitted with `showSearchButton`, defaults to `false`. Pass `true` to show both clear and action.
   */
  showClearButton?: boolean;
  /** Show `Button` action on the right (`onSearch` / Enter). */
  showSearchButton?: boolean;
  /**
   * Action content: `icon` — compact icon-only; `text` — label from `searchButtonLabel`.
   * @default "icon"
   */
  searchButtonDisplay?: SearchButtonDisplay;
  searchButtonIcon?: IconSource;
  searchButtonIconWidth?: number | string;
  searchButtonIconHeight?: number | string;
  searchButtonAriaLabel?: string;
  /** @default "Search" */
  searchButtonLabel?: string;
  searchActionButtonProps?: SearchActionButtonProps;
  /** Custom right slot (overrides `showSearchButton`). */
  suffix?: React.ReactNode;
  /**
   * Overrides join between field and trailing action. Omit to use **`integrated`** when the built-in
   * search button is shown (single Material-style bar).
   */
  trailingRail?: "default" | "integrated";
}

function railKey(inputSize: string): keyof typeof HEADER_SEARCH_LAYOUT {
  if (inputSize === "lg") return "lg";
  if (inputSize === "md") return "md";
  return "sm";
}

/** Corner token for the search shell — trailing action right edge uses the same value (see `roundedToCssCorner`). */
const SEARCH_SHELL_ROUNDED = "3" as const;

const TextInputSearch: React.FC<TextInputSearchProps> = ({
  id = "search",
  leftIcon = SearchIcon,
  leftIconHeight,
  leftIconWidth,
  leftIconColor = "var(--color-text-primary)",
  placeholder = "Search...",
  value = "",
  onChange = () => {},
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
}) => {
  const errorId = `${id}-error`;
  const labelId = `${id}-label`;
  const resolvedSize = size || "sm";
  const hdr = HEADER_SEARCH_LAYOUT[railKey(resolvedSize)];
  /** With a trailing search action, hide clear by default to avoid duplicate right-side chrome; opt in with showClearButton. */
  const allowClearResolved =
    showClearButton !== undefined ? showClearButton : !showSearchButton;

  const handleSearch = () => {
    if (disabled) return;
    onSearch?.(value);
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
  } = searchActionButtonProps ?? {};

  const mergedRounded = rounded ?? "3";
  const trailingRailResolved: "default" | "integrated" =
    trailingRailProp ??
    (showSearchButton && suffix === undefined ? "integrated" : "default");
  const useIntegratedRail = trailingRailResolved === "integrated";

  const displayIconSrc =
    searchButtonDisplay === "icon"
      ? (btnIconPass ?? searchButtonIcon ?? SearchIcon)
      : btnIconPass;

  const iconInset = Math.round(hdr.searchActionInsetHeight * 0.48);
  const iw =
    btnIconWidthProp
    ?? searchButtonIconWidth
    ?? pxToRem(iconInset);
  const ih = btnIconHeightProp ?? searchButtonIconHeight ?? iw;

  const prefixIconSize =
    leftIconHeight != null ? leftIconHeight : pxToRem(Math.round(hdr.shellMinHeight * 0.42));
  const prefixIconWidth = leftIconWidth ?? prefixIconSize;

  const iconOnlyName =
    searchButtonDisplay === "icon"
      ? (btnAriaPass ?? searchButtonAriaLabel ?? searchButtonLabel)
      : undefined;

  const trailingCorner = roundedToCssCorner(SEARCH_SHELL_ROUNDED);

  const mergedActionStyle: React.CSSProperties = useIntegratedRail
    ? {
        ...(userSearchActionStyles && typeof userSearchActionStyles === "object"
          ? userSearchActionStyles
          : {}),
        alignSelf: "stretch",
        height: "100%",
        minHeight: pxToRem(hdr.shellMinHeight),
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: trailingCorner,
        borderBottomRightRadius: trailingCorner,
        boxSizing: "border-box",
        ...(searchButtonDisplay === "icon"
          ? {
              paddingLeft: pxToRem(hdr.integratedIconPadX),
              paddingRight: pxToRem(hdr.integratedIconPadX),
            }
          : {}),
      }
    : {
        ...(userSearchActionStyles && typeof userSearchActionStyles === "object"
          ? userSearchActionStyles
          : {}),
        height: pxToRem(hdr.searchActionInsetHeight),
        minHeight: 0,
        alignSelf: "center",
        boxSizing: "border-box",
      };
  if (searchButtonDisplay === "icon") {
    mergedActionStyle.minWidth = 0;
  }

  const suffixForInput =
    suffix !== undefined ? (
      suffix
    ) : showSearchButton ? (
      <span
        className={
          useIntegratedRail
            ? "ucs-search-input__integrated-action-slot inline-flex h-full min-h-0 shrink-0 items-stretch self-stretch"
            : "ucs-search-input__integrated-action-slot inline-flex shrink-0 items-center"
        }
      >
        <Button
          {...restSearchActionBtn}
          type="button"
          variant={variant}
          size={actionSizeProp ?? railButtonSize(resolvedSize)}
          rounded={useIntegratedRail ? "0" : mergedRounded}
          disabled={disabled}
          ripple={ripple}
          onClick={handleSearch}
          style={mergedActionStyle}
          className={["ucs-search-input__inline-action shrink-0", actionClassName]
            .filter(Boolean)
            .join(" ")}
          icon={(searchButtonDisplay === "icon" || btnIconPass) && displayIconSrc ? displayIconSrc : undefined}
          iconWidth={(searchButtonDisplay === "icon" || btnIconPass) && displayIconSrc ? iw : undefined}
          iconHeight={(searchButtonDisplay === "icon" || btnIconPass) && displayIconSrc ? ih : undefined}
          iconColor={btnIconColorProp}
          ariaLabel={
            searchButtonDisplay === "icon"
              ? iconOnlyName
              : (btnAriaPass ?? searchButtonAriaLabel ?? undefined)
          }
        >
          {searchButtonDisplay === "text" ? btnChildren ?? searchButtonLabel : undefined}
        </Button>
      </span>
    ) : null;

  return (
    <div
      className={containerClassName.trim()}
      style={{
        width: fullWidth ? "100%" : "auto",
        ...containerStyle,
      }}
      role="search"
      aria-labelledby={labelId}
    >
      <label id={labelId} htmlFor={id} className="visually-hidden">
        {ariaLabel}
      </label>

      <TextInput
        id={id}
        type="search"
        placeholder={placeholder}
        validation="headerSearch"
        value={value}
        onChange={onChange}
        errorMessage={errorMessage}
        size={resolvedSize}
        fullWidth={fullWidth}
        disabled={disabled}
        variant="outlined"
        rounded={SEARCH_SHELL_ROUNDED}
        allowClear={allowClearResolved}
        prefix={
          leftIcon ? (
            <Icon
              src={leftIcon}
              height={prefixIconSize}
              width={prefixIconWidth}
              color={leftIconColor}
              aria-hidden="true"
            />
          ) : undefined
        }
        suffix={suffixForInput}
        onPressEnter={handleSearch}
        ariaLabel={ariaLabel}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? errorId : undefined}
        className={className}
        trailingRail={trailingRailResolved}
      />

      {errorMessage && (
        <span id={errorId} role="alert" className="visually-hidden">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default TextInputSearch;
