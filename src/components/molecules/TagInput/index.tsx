"use client";

import React, { useCallback, useId, useMemo, useRef, useState } from "react";
import Badge from "../../atoms/Badge";
import { useFormField } from "../FormField";
import { FORM_FIELD_CONSUMER_KEY } from "../FormField/FormField.config";
import {
  TAG_INPUT_CHIP_SIZE,
  TAG_INPUT_DEFAULTS,
  TAG_INPUT_LABELS,
  TAG_INPUT_PASTE_SEPARATORS,
} from "./TagInput.config";
import { containsSeparator, filterSuggestions, splitPending, splitTags } from "./TagInput.utils";
import type { TagInputProps } from "./TagInput.types";
import "./TagInput.css";

function hasContent(node: React.ReactNode): boolean {
  return node !== undefined && node !== null && node !== false && node !== true && node !== "";
}

/**
 * TagInput — chips plus a text box. Enter, a delimiter (default `,`) or pasting a list creates tags;
 * Backspace in an empty box removes the last tag (announced); ArrowLeft / ArrowRight move between the
 * chips' remove buttons. Optional `suggestions` turn the box into an APG combobox with a listbox
 * (`aria-activedescendant`). Inside a `FormField` it reads the field id, description and state.
 */
const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(function TagInput(
  {
    value: valueProp,
    defaultValue,
    onChange,
    onInputChange,
    maxTags,
    allowDuplicates = TAG_INPUT_DEFAULTS.allowDuplicates,
    validate,
    suggestions,
    delimiters = TAG_INPUT_DEFAULTS.delimiters,
    addOnBlur = TAG_INPUT_DEFAULTS.addOnBlur,
    placeholder,
    disabled = false,
    readOnly = false,
    size = TAG_INPUT_DEFAULTS.size,
    label,
    error,
    required: requiredProp,
    name,
    id: idProp,
    labels: labelsProp,
    className,
    ...rest
  },
  ref,
) {
  const {
    "aria-describedby": ariaDescribedByProp,
    "aria-invalid": ariaInvalidProp,
    "aria-required": ariaRequiredProp,
    "aria-label": ariaLabelProp,
    "aria-labelledby": ariaLabelledByProp,
    ...rootRest
  } = rest;

  const labels = useMemo(() => ({ ...TAG_INPUT_LABELS, ...labelsProp }), [labelsProp]);
  const field = useFormField();
  const reactId = useId().replace(/:/g, "");
  const inputId = idProp ?? field?.id ?? `ds-tag-input-${reactId}`;
  const labelId = `ds-tag-input-${reactId}-label`;
  const messageId = `ds-tag-input-${reactId}-message`;
  const listboxId = `ds-tag-input-${reactId}-listbox`;
  const optionId = (i: number) => `ds-tag-input-${reactId}-option-${i}`;

  const isControlled = valueProp !== undefined;
  const [innerTags, setInnerTags] = useState<string[]>(() => defaultValue ?? []);
  const tags = isControlled ? valueProp : innerTags;
  const tagsRef = useRef(tags);
  tagsRef.current = tags;

  const [text, setText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const interactive = !disabled && !readOnly;
  const atLimit = maxTags !== undefined && tags.length >= maxTags;
  const hasSuggestions = suggestions !== undefined;
  const filtered = useMemo(
    () => (hasSuggestions ? filterSuggestions(suggestions ?? [], text, tags, allowDuplicates) : []),
    [hasSuggestions, suggestions, text, tags, allowDuplicates],
  );
  const showList = hasSuggestions && listOpen && interactive && filtered.length > 0;

  const announce = useCallback((msg: string) => setAnnouncement(msg), []);

  const commit = useCallback(
    (next: string[]) => {
      if (!isControlled) setInnerTags(next);
      tagsRef.current = next;
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  /** Try to add each candidate; returns the rejected candidates and the first rejection message. */
  const addTags = useCallback(
    (candidates: string[]): { rejected: string[]; error: string | null } => {
      let next = [...tagsRef.current];
      const rejected: string[] = [];
      const added: string[] = [];
      let firstError: string | null = null;
      for (const raw of candidates) {
        const tag = raw.trim();
        if (!tag) continue;
        let reason: string | null = null;
        if (maxTags !== undefined && next.length >= maxTags) reason = labels.maxReached(maxTags);
        else if (!allowDuplicates && next.includes(tag)) reason = labels.duplicate(tag);
        else if (validate) {
          const result = validate(tag, next);
          if (result !== true) reason = result;
        }
        if (reason !== null) {
          rejected.push(tag);
          if (firstError === null) firstError = reason;
        } else {
          next = [...next, tag];
          added.push(tag);
        }
      }
      if (added.length > 0) {
        commit(next);
        announce(added.map(labels.added).join(", "));
      }
      setMessage(firstError);
      return { rejected, error: firstError };
    },
    [allowDuplicates, announce, commit, labels, maxTags, validate],
  );

  const removeAt = useCallback(
    (index: number) => {
      const current = tagsRef.current;
      const tag = current[index];
      if (tag === undefined) return;
      commit(current.filter((_, i) => i !== index));
      setMessage(null);
      announce(labels.removed(tag));
    },
    [announce, commit, labels],
  );

  const updateText = (next: string) => {
    setText(next);
    onInputChange?.(next);
  };

  /** Commit the pending text; on rejection the rejected parts stay in the box. */
  const commitText = (raw: string) => {
    const parts = splitTags(raw, [...delimiters, ...TAG_INPUT_PASTE_SEPARATORS]);
    if (parts.length === 0) {
      updateText("");
      return;
    }
    const { rejected } = addTags(parts);
    updateText(rejected.join(delimiters[0] ? `${delimiters[0]} ` : " "));
  };

  const focusChip = (index: number) => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-tag-index]");
    const target = items?.[index]?.querySelector<HTMLElement>("button");
    target?.focus();
  };

  // ── Text box handlers ─────────────────────────────────────────────────────

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    // Typed (or mobile-keyboard / IME inserted) delimiters: everything before the last one is committed.
    if (containsSeparator(next, delimiters)) {
      const { complete, tail } = splitPending(next, delimiters);
      const { rejected } = addTags(complete);
      const remaining = [...rejected, tail.trimStart()].filter(Boolean);
      updateText(remaining.join(delimiters[0] ? `${delimiters[0]} ` : " "));
    } else {
      updateText(next);
      if (message) setMessage(null);
    }
    setListOpen(true);
    setActiveIndex(-1);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text");
    if (!containsSeparator(pasted, [...delimiters, ...TAG_INPUT_PASTE_SEPARATORS])) return;
    e.preventDefault();
    const el = e.currentTarget;
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;
    commitText(text.slice(0, start) + pasted + text.slice(end));
    setListOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    const el = e.currentTarget;
    switch (e.key) {
      case "ArrowDown":
        if (!hasSuggestions) return;
        e.preventDefault();
        setListOpen(true);
        if (filtered.length > 0) setActiveIndex((i) => (i + 1) % filtered.length);
        return;
      case "ArrowUp":
        if (!showList) return;
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
        return;
      case "Enter": {
        if (showList && activeIndex >= 0 && filtered[activeIndex] !== undefined) {
          e.preventDefault();
          const { rejected } = addTags([filtered[activeIndex]]);
          if (rejected.length === 0) updateText("");
          setActiveIndex(-1);
          setListOpen(false);
          return;
        }
        if (text.trim()) {
          e.preventDefault();
          commitText(text);
          setListOpen(false);
        }
        return;
      }
      case "Escape":
        if (showList) {
          // Handled here so an enclosing Drawer / Modal does not also close.
          e.preventDefault();
          e.stopPropagation();
          setListOpen(false);
          setActiveIndex(-1);
        }
        return;
      case "Backspace":
        if (text === "" && tags.length > 0 && interactive) {
          e.preventDefault();
          removeAt(tags.length - 1);
        }
        return;
      case "ArrowLeft":
        if (el.selectionStart === 0 && el.selectionEnd === 0 && tags.length > 0 && !disabled) {
          e.preventDefault();
          focusChip(tags.length - 1);
        }
        return;
      default:
    }
  };

  const handleBlur = () => {
    setListOpen(false);
    setActiveIndex(-1);
    if (addOnBlur && interactive && text.trim()) commitText(text);
  };

  // ── Chip handlers (event delegated from each <li>) ────────────────────────

  const handleChipKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLLIElement>) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        focusChip(Math.max(0, index - 1));
        return;
      case "ArrowRight":
        e.preventDefault();
        if (index >= tags.length - 1) inputRef.current?.focus();
        else focusChip(index + 1);
        return;
      case "Home":
        e.preventDefault();
        focusChip(0);
        return;
      case "End":
        e.preventDefault();
        inputRef.current?.focus();
        return;
      case "Backspace":
      case "Delete": {
        if (!interactive) return;
        e.preventDefault();
        const remaining = tags.length - 1;
        removeAt(index);
        // Keep focus in the widget: previous chip, else the new chip at this index, else the box.
        requestAnimationFrame(() => {
          if (remaining === 0) inputRef.current?.focus();
          else if (e.key === "Backspace" && index > 0) focusChip(index - 1);
          else if (index < remaining) focusChip(index);
          else focusChip(remaining - 1);
        });
        return;
      }
      default:
    }
  };

  const handleRemoveClick = (index: number) => {
    removeAt(index);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const pickSuggestion = (s: string) => {
    const { rejected } = addTags([s]);
    if (rejected.length === 0) updateText("");
    setListOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  // ── ARIA wiring ───────────────────────────────────────────────────────────

  const ownMessage = message ?? (!field && hasContent(error) && error !== true ? error : null);
  const describedBy =
    ariaDescribedByProp ??
    ([field?.describedBy, ownMessage ? messageId : undefined].filter(Boolean).join(" ") || undefined);
  const invalid =
    ariaInvalidProp ?? (field?.invalid || message !== null || error === true || hasContent(error) ? true : undefined);
  const required = ariaRequiredProp ?? (requiredProp || field?.required ? true : undefined);
  const showOwnLabel = !field && hasContent(label);
  const inputLabelledBy = ariaLabelledByProp ?? (showOwnLabel ? labelId : undefined);

  const chipSize = TAG_INPUT_CHIP_SIZE[size];
  const activeOptionId = showList && activeIndex >= 0 ? optionId(activeIndex) : undefined;

  return (
    <div
      ref={ref}
      className={["ds-tag-input", className].filter(Boolean).join(" ")}
      data-size={size}
      data-disabled={disabled ? "true" : undefined}
      data-readonly={readOnly ? "true" : undefined}
      data-invalid={invalid ? "true" : undefined}
      {...rootRest}
    >
      {showOwnLabel ? (
        <label id={labelId} htmlFor={inputId} className="ds-tag-input__label">
          {label}
          {requiredProp ? (
            <span className="ds-tag-input__required" aria-hidden="true">
              {" *"}
            </span>
          ) : null}
        </label>
      ) : null}
      <div
        className="ds-tag-input__field"
        onMouseDown={(e) => {
          // Clicking empty field space focuses the box (chips and buttons keep their own behaviour).
          if (e.target === e.currentTarget && !disabled) {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
      >
        {tags.length > 0 ? (
          <ul ref={listRef} className="ds-tag-input__chips" aria-label={labels.list}>
            {tags.map((tag, index) => (
              <li
                // Tags may repeat with allowDuplicates, so the index is part of the key.
                key={`${tag}-${index}`}
                className="ds-tag-input__chip"
                data-tag-index={index}
                onKeyDown={handleChipKeyDown(index)}
              >
                <Badge
                  variant="neutral"
                  tone="soft"
                  shape="pill"
                  size={chipSize}
                  onDismiss={interactive ? () => handleRemoveClick(index) : undefined}
                  dismissLabel={labels.remove(tag)}
                >
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        ) : null}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          className="ds-tag-input__input"
          value={text}
          placeholder={atLimit ? undefined : placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete="off"
          enterKeyHint="enter"
          aria-label={ariaLabelProp}
          aria-labelledby={inputLabelledBy}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          aria-required={required}
          role={hasSuggestions ? "combobox" : undefined}
          aria-autocomplete={hasSuggestions ? "list" : undefined}
          aria-expanded={hasSuggestions ? showList : undefined}
          aria-controls={hasSuggestions ? listboxId : undefined}
          aria-activedescendant={activeOptionId}
          onChange={handleChange}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => setListOpen(true)}
        />
        {hasSuggestions ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-label={labels.suggestions}
            className="ds-tag-input__listbox"
            hidden={!showList}
          >
            {showList
              ? filtered.map((s, i) => (
                  <li
                    key={s}
                    id={optionId(i)}
                    role="option"
                    aria-selected={i === activeIndex}
                    className="ds-tag-input__option"
                    data-active={i === activeIndex ? "true" : undefined}
                    // mousedown would blur the box (closing the list) before click lands.
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => pickSuggestion(s)}
                  >
                    {s}
                  </li>
                ))
              : null}
          </ul>
        ) : null}
      </div>
      {name !== undefined ? <input type="hidden" name={name} value={tags.join(",")} /> : null}
      {ownMessage ? (
        <p
          id={messageId}
          className="ds-tag-input__error"
          // Validation feedback is new information → assertive; a static `error` prop is just described.
          role={message ? "alert" : undefined}
        >
          {ownMessage}
        </p>
      ) : null}
      <span className="ds-tag-input__sr" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </div>
  );
});

TagInput.displayName = "TagInput";

/** Tells FormField this control wires itself via `useFormField()` (no cloneElement injection). */
(TagInput as unknown as Record<string, unknown>)[FORM_FIELD_CONSUMER_KEY] = true;

export { TagInput };
export default TagInput;
export type { TagInputProps, TagInputSize, TagInputLabels, TagInputValidateResult } from "./TagInput.types";
