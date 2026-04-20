import React from "react";
import Icon, { type IconSource } from "../Icon";
import TextInput from "../TextInput/TextInput";
import SearchIcon from "../../../assets/search.svg";

/** Market-standard search input: left icon only by default. No right-side search/clear unless opted in. */
export interface TextInputSearchProps {
  id?: string;
  /** Left icon (default: search magnifier). Set to null to hide. */
  leftIcon?: IconSource | null;
  leftIconHeight?: number;
  leftIconWidth?: number;
  /** Icon color. Default: var(--color-text-primary) for visibility in light/dark themes. */
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
  /** Show clear (X) button when value exists. Default: false (market standard). Alias: Ant Design `allowClear`. */
  showClearButton?: boolean;
  /**
   * Show Ant-style enter button on the right (text label, not a second search icon).
   * Default: false (prefix icon + Enter only, like common MUI patterns).
   */
  showSearchButton?: boolean;
  /** Label for the optional right search button. Default: "Search". */
  searchButtonLabel?: string;
  /** Custom right action (overrides showSearchButton when provided). */
  suffix?: React.ReactNode;
}

const TextInputSearch: React.FC<TextInputSearchProps> = ({
  id = "search",
  leftIcon = SearchIcon,
  leftIconHeight = 18,
  leftIconWidth = 18,
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
  showClearButton = false,
  showSearchButton = false,
  searchButtonLabel = "Search",
  suffix,
}) => {
  const errorId = `${id}-error`;
  const labelId = `${id}-label`;
  const resolvedSize = size || "sm";
  const handleSearch = () => {
    if (disabled) return;
    onSearch?.(value);
  };

  const searchEnterButton =
    resolvedSize === "lg" ? { fontSize: "var(--text-body-size)", paddingX: 12 as const }
      : resolvedSize === "md" ? { fontSize: "var(--text-body-size)", paddingX: 10 as const }
        : { fontSize: "var(--text-small-size)", paddingX: 8 as const };

  /** Suppress TextInput’s default trailing search icon when we only use the leading icon (Ant/MUI-style). */
  const suffixForInput =
    suffix !== undefined
      ? suffix
      : showSearchButton
        ? (
          <button
            type="button"
            onClick={handleSearch}
            disabled={disabled}
            className="shrink-0 font-medium text-[var(--color-brand-primary)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--button-primary-focus-ring,var(--color-brand-primary))]"
            style={{
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
              whiteSpace: "nowrap",
            }}
          >
            {searchButtonLabel}
          </button>
        )
        : null;

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
        rounded="3"
        allowClear={showClearButton}
        prefix={
          leftIcon ? (
            <Icon
              src={leftIcon}
              height={leftIconHeight}
              width={leftIconWidth}
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
