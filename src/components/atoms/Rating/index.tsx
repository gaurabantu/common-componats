"use client";

import React, { useId, useState } from "react";
import {
  RATING_DEFAULTS,
  defaultRatingLabel,
  iconFill,
  readOnlyRatingLabel,
  roundRating,
} from "./Rating.config";
import type { RatingProps } from "./Rating.types";
import "./Rating.css";

function cls(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

const StarShape = (
  <svg viewBox="0 0 24 24" focusable="false" className="ds-rating__shape">
    <path
      d="M12 2.8l2.83 5.74 6.33.92-4.58 4.46 1.08 6.3L12 17.25l-5.66 2.97 1.08-6.3-4.58-4.46 6.33-.92L12 2.8z"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Rating — star rating built on native radios (APG radio-group semantics for free: one Tab stop,
 * arrow keys move + select, form submission via `name`). `precision={0.5}` adds half-star options;
 * `readOnly` renders a single `role="img"` ("4 out of 5 stars").
 */
const Rating = React.forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    value: valueProp,
    defaultValue,
    onChange,
    max = RATING_DEFAULTS.max,
    precision = RATING_DEFAULTS.precision,
    readOnly = false,
    disabled = false,
    size = RATING_DEFAULTS.size,
    icon,
    emptyIcon,
    name: nameProp,
    getLabelText = defaultRatingLabel,
    label,
    required = false,
    className,
    onMouseLeave,
    ...rest
  },
  ref,
) {
  const autoName = `ds-rating-${useId().replace(/:/g, "")}`;
  const name = nameProp ?? autoName;
  const count = Math.max(1, Math.floor(max));
  const isControlled = valueProp !== undefined;
  const [inner, setInner] = useState<number>(defaultValue ?? 0);
  const value = isControlled ? (valueProp ?? 0) : inner;
  const [hover, setHover] = useState<number | null>(null);
  const shown = roundRating(readOnly || disabled ? value : (hover ?? value), precision, count);

  const filledIcon = icon ?? StarShape;
  const outlineIcon = emptyIcon ?? icon ?? StarShape;

  const renderIcon = (index: number) => {
    const fill = iconFill(index, shown);
    return (
      <span className="ds-rating__icon" data-fill={fill} aria-hidden="true">
        <span className="ds-rating__layer ds-rating__layer--empty">{outlineIcon}</span>
        <span className="ds-rating__layer ds-rating__layer--filled">{filledIcon}</span>
      </span>
    );
  };

  const indices = Array.from({ length: count }, (_, i) => i + 1);
  const rootClass = cls("ds-rating", className);

  if (readOnly) {
    return (
      <div
        {...rest}
        ref={ref}
        role="img"
        aria-label={rest["aria-label"] ?? readOnlyRatingLabel(shown, count)}
        className={rootClass}
        data-size={size}
        data-readonly="true"
        onMouseLeave={onMouseLeave}
      >
        {indices.map((i) => (
          <span key={i} className="ds-rating__item">
            {renderIcon(i)}
          </span>
        ))}
      </div>
    );
  }

  const steps = (i: number) => (precision === 0.5 ? [i - 0.5, i] : [i]);
  const stepId = (step: number) => `${name}-${String(step).replace(".", "_")}`;
  /** Half precision: the inline-start half of star `i` means `i - 0.5` (mirrored in RTL). */
  const stepFromPointer = (e: React.MouseEvent<HTMLElement>, i: number): number => {
    if (precision !== 0.5) return i;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width) return i;
    const rtl = typeof window !== "undefined" && window.getComputedStyle(e.currentTarget).direction === "rtl";
    const x = (e.clientX - rect.left) / rect.width;
    const startHalf = rtl ? x > 0.5 : x < 0.5;
    return startHalf ? i - 0.5 : i;
  };

  return (
    <div
      {...rest}
      ref={ref}
      role="radiogroup"
      aria-label={rest["aria-labelledby"] ? rest["aria-label"] : (rest["aria-label"] ?? label ?? RATING_DEFAULTS.label)}
      aria-disabled={disabled || undefined}
      aria-required={required || undefined}
      className={rootClass}
      data-size={size}
      data-disabled={disabled ? "true" : undefined}
      onMouseLeave={(e) => {
        setHover(null);
        onMouseLeave?.(e);
      }}
    >
      {indices.map((i) => (
        <span key={i} className="ds-rating__item" data-precision={precision}>
          {renderIcon(i)}
          {steps(i).map((step) => (
            <input
              key={step}
              id={stepId(step)}
              className="ds-rating__input"
              type="radio"
              name={name}
              value={step}
              checked={value === step}
              disabled={disabled}
              required={required}
              aria-label={getLabelText(step)}
              onChange={(e) => {
                if (!isControlled) setInner(step);
                onChange?.(step, e);
              }}
            />
          ))}
          {/* One full-star pointer target per star (WCAG 2.5.8); the half is picked from the pointer
              position. Pointer-only: keyboard / AT use the radios above. */}
          <span
            className="ds-rating__hit"
            aria-hidden="true"
            onPointerMove={(e) => {
              if (!disabled && e.pointerType !== "touch") setHover(stepFromPointer(e, i));
            }}
            onMouseEnter={(e) => {
              if (!disabled) setHover(stepFromPointer(e, i));
            }}
            onClick={(e) => {
              if (disabled) return;
              const input = document.getElementById(stepId(stepFromPointer(e, i))) as HTMLInputElement | null;
              if (!input) return;
              input.focus({ preventScroll: true });
              // Native click → real change event → onChange(value, ChangeEvent) like a label click.
              input.click();
            }}
          />
        </span>
      ))}
    </div>
  );
});

Rating.displayName = "Rating";

export default Rating;
export { Rating };
export type { RatingProps, RatingSize, RatingPrecision } from "./Rating.types";
