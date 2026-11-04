"use client";

import React, { useCallback, useContext, useState } from "react";
import type { ToggleButtonProps } from "./ToggleButton.types";
import { ToggleGroupContext } from "./ToggleGroupContext";
import "./ToggleButton.css";

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Two-state toggle button (Bold / Italic / alignment, filter chips…).
 *
 * Follows the [ARIA button pattern (toggle)](https://www.w3.org/WAI/ARIA/apg/patterns/button/):
 * native `<button>` with `aria-pressed`. Icon-only toggles need `ariaLabel`.
 * Inside a `ToggleGroup`, `value` identifies the item and the group owns the state.
 */
const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(function ToggleButton(
  {
    pressed: pressedProp,
    defaultPressed = false,
    onPressedChange,
    size: sizeProp,
    variant: variantProp,
    icon,
    ariaLabel,
    "aria-label": ariaLabelAttr,
    value,
    children,
    className,
    disabled: disabledProp,
    onClick,
    onFocus,
    tabIndex,
    ...rest
  },
  ref,
) {
  const group = useContext(ToggleGroupContext);
  const inGroup = group !== null && value !== undefined;

  const [internal, setInternal] = useState(defaultPressed);
  const pressed = inGroup ? group.isPressed(value) : pressedProp !== undefined ? pressedProp : internal;

  const size = sizeProp ?? group?.size ?? "sm";
  const variant = variantProp ?? group?.variant ?? "ghost";
  const disabled = Boolean(disabledProp || group?.disabled);
  const iconOnly = children === undefined || children === null || children === false;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || disabled) return;
      if (inGroup) {
        group.toggle(value);
        return;
      }
      const next = !pressed;
      if (pressedProp === undefined) setInternal(next);
      onPressedChange?.(next);
    },
    [onClick, disabled, inGroup, group, value, pressed, pressedProp, onPressedChange],
  );

  const roving = inGroup && group.tabStop !== null;

  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      aria-pressed={pressed}
      aria-label={ariaLabel ?? ariaLabelAttr}
      disabled={disabled}
      data-state={pressed ? "on" : "off"}
      data-value={value}
      data-ucs-toggle-item={inGroup ? "" : undefined}
      tabIndex={roving ? (group.tabStop === value ? 0 : -1) : tabIndex}
      onFocus={(e) => {
        if (inGroup) group.setTabStop(value);
        onFocus?.(e);
      }}
      onClick={handleClick}
      className={cls(
        "btn-base ucs-toggle",
        `ucs-toggle--${variant}`,
        iconOnly ? `btn-icon-only-${size}` : `btn-size-${size}`,
        className,
      )}
    >
      {icon ? (
        <span className="ucs-toggle__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {iconOnly ? null : <span className="ucs-toggle__label">{children}</span>}
    </button>
  );
});

ToggleButton.displayName = "ToggleButton";

export default ToggleButton;
export type { ToggleButtonProps, ToggleButtonSize, ToggleButtonVariant } from "./ToggleButton.types";
