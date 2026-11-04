// packages/ui-components/src/components/TextArea/TextArea.types.ts

import React, { ChangeEvent, TextareaHTMLAttributes } from 'react';

/**
 * TextAreaProps
 * - Omit attributes that we manage differently (size, onChange signature).
 * - onChange returns (value, event) for simpler integration.
 */
export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onChange' | 'rows' | 'maxLength'> {
  /** Visible label. Accepts any node (rendered inside the `<label>`). */
  label?: React.ReactNode;
  /**
   * size: matches UX4G / Bootstrap form-control sizes
   * '' means default
   */
  size?: 'sm' | 'md' | 'lg' | '';
  containerClass?: string;
  rows?: number; // default 3
  /**
   * Native `maxLength`. **No limit when omitted** (since 0.0.4; previously defaulted to 500 and
   * silently truncated longer text). With `showCount`, the counter shows `n / max` or just `n`.
   */
  maxLength?: number;
  fullWidth?: boolean;
  helperText?: string;
  errorMessage?: string;
  showCount?: boolean;
  status?: 'error' | 'warning' | 'success';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  rounded?: '0' | '1' | '2' | '3' | '4' | '5' | 'pill';

  // sanitization and normalization options
  /**
   * Run the sanitizer on every change. Off by default. When on, `removeChars` (default `/<>@#`),
   * `removeEmojis` (default `true`) and `normalizeAccents` (default `true`) apply — so typed text
   * IS altered. Pass `removeEmojis={false}` etc. to opt out of individual steps.
   */
  sanitize?: boolean;
  removeChars?: string;
  removeEmojis?: boolean;
  normalizeAccents?: boolean;
  toCase?: 'U' | 'L' | 'C' | '';

  /**
   * onChange callback signature:
   *  (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void
   * allows easy consumption without reading event.target.value externally
   */
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;

  // Controlled / uncontrolled
  value?: string;
  defaultValue?: string;

  // additional UI props
  className?: string;
  ariaLabel?: string;
}
