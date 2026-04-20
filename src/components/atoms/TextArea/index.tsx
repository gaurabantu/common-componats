// packages/ui-components/src/components/TextArea/index.tsx
"use client";

import React, { useId, useState, ChangeEvent, useEffect } from 'react';
import defaultConfig from './TextArea.config';
import { sanitizeValue } from './TextArea.utils';
import type { TextAreaProps } from './TextArea.types';

/**
 * UX4G TextArea component
 *
 * - Controlled or uncontrolled usage supported
 * - Optional sanitization via text-validator
 * - Uses size classes consistent with UX4G/Bootstrap
 */
const TextArea: React.FC<TextAreaProps> = ({
  label,
  size = '',
  className = '',
  containerClass = '',
  rows = defaultConfig.defaultRows,
  maxLength = defaultConfig.defaultMaxLength,
  fullWidth = true,
  helperText,
  errorMessage,
  showCount = false,
  status,
  resize = 'vertical',
  rounded = '4',
  sanitize = false,
  removeChars = defaultConfig.defaultRemoveChars,
  removeEmojis = defaultConfig.defaultRemoveEmojis,
  normalizeAccents = defaultConfig.defaultNormalizeAccents,
  toCase = defaultConfig.defaultToCase,
  value,
  defaultValue,
  onChange,
  ariaLabel,
  disabled = false,
  ...props
}) => {
  const textareaId = useId();
  const [internalValue, setInternalValue] = useState<string>(value ?? defaultValue ?? '');

  // Keep internalValue in sync when used as a controlled component
  useEffect(() => {
    if (typeof value === 'string' && value !== internalValue) {
      setInternalValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let val = e.target.value ?? '';

    if (sanitize) {
      val = sanitizeValue(val, {
        removeChars,
        removeEmojis,
        normalizeAccents,
        toCase,
      });
    } else if (toCase) {
      // apply casing even without sanitize if requested
      if (toCase === 'U') val = val.toUpperCase();
      else if (toCase === 'L') val = val.toLowerCase();
      else if (toCase === 'C') val = val.charAt(0).toUpperCase() + val.slice(1);
    }

    setInternalValue(val);
    onChange?.(val, e);
  };

  const resolvedStatus = status ?? (errorMessage ? 'error' : undefined);

  const currentLength = internalValue.length;
  const footerMessage = errorMessage ?? helperText;
  const footerMessageColor =
    resolvedStatus === 'error'
      ? 'var(--color-state-error, #DC3545)'
      : resolvedStatus === 'warning'
        ? 'var(--color-state-warning, #FFC107)'
        : resolvedStatus === 'success'
          ? 'var(--color-state-success, #28A745)'
          : 'var(--color-text-secondary, #757575)';

  const minHeight =
    size === 'lg'
      ? 128
      : size === 'sm'
        ? 96
        : 112;

  const paddingX =
    size === 'lg'
      ? 16
      : size === 'sm'
        ? 12
        : 14;

  const paddingY =
    size === 'lg'
      ? 12
      : size === 'sm'
        ? 8
        : 10;

  const fontSize =
    size === 'sm'
      ? 'var(--text-small-size, 12px)'
      : 'var(--text-body-size, 16px)';

  const resizeValue: React.CSSProperties['resize'] =
    resize === 'horizontal'
      ? 'horizontal'
      : resize === 'both'
        ? 'both'
        : resize === 'none'
          ? 'none'
          : 'vertical';

  const borderColor =
    resolvedStatus === 'error'
      ? 'var(--color-state-error, #DC3545)'
      : resolvedStatus === 'warning'
        ? 'var(--color-state-warning, #FFC107)'
        : resolvedStatus === 'success'
          ? 'var(--color-state-success, #28A745)'
          : 'var(--color-border-default, #999999)';

  const wrapperStyle: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    display: fullWidth ? 'block' : 'inline-block',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 8,
    color: 'var(--color-text-primary, #0D0D0D)',
    fontSize: 'var(--text-secondary-size, 14px)',
    fontWeight: 500,
    lineHeight: 1.5,
  };

  const textareaStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    minWidth: 0,
    minHeight,
    padding: `${paddingY}px ${paddingX}px`,
    boxSizing: 'border-box',
    resize: resizeValue,
    borderRadius:
      rounded === '0'
        ? 0
        : rounded === '1'
          ? 'var(--radius-xs, 2px)'
          : rounded === '2'
            ? 'var(--radius-sm, 3px)'
            : rounded === '3'
              ? 'var(--radius-base, 4px)'
              : rounded === '4'
                ? 'var(--radius-md, 6px)'
                : rounded === '5'
                  ? 'var(--radius-lg, 8px)'
                  : '9999px',
    border: `1.5px solid ${borderColor}`,
    background: disabled
      ? 'var(--color-bg-page, #F3F4F6)'
      : 'var(--color-bg-surface, #FFFFFF)',
    color: disabled
      ? 'var(--color-text-secondary, #757575)'
      : 'var(--color-text-primary, #0D0D0D)',
    outline: 'none',
    fontSize,
    lineHeight: 1.5,
    transition: 'border-color 150ms, background-color 150ms',
  };

  const footerRowStyle: React.CSSProperties = {
    marginTop: 8,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  };

  const footerTextStyle: React.CSSProperties = {
    margin: 0,
    color: footerMessageColor,
    fontSize: 'var(--text-small-size, 12px)',
    lineHeight: 1.5,
  };

  const countStyle: React.CSSProperties = {
    margin: 0,
    flexShrink: 0,
    color: 'var(--color-text-secondary, #757575)',
    fontSize: 'var(--text-small-size, 12px)',
    lineHeight: 1.5,
  };

  return (
    <div className={containerClass} style={wrapperStyle}>
      {label && (
        <label htmlFor={textareaId} style={labelStyle}>
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        className={className}
        style={textareaStyle}
        value={internalValue}
        rows={rows}
        maxLength={maxLength}
        onChange={handleChange}
        aria-invalid={resolvedStatus === 'error'}
        aria-label={label ? undefined : ariaLabel}
        {...props}
      />

      {(footerMessage || showCount) && (
        <div style={footerRowStyle}>
          <span style={footerTextStyle}>
            {footerMessage}
          </span>
          {showCount && (
            <span style={countStyle}>
              {currentLength} / {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TextArea;
