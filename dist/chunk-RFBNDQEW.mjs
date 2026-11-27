/* ucs:component-css */
import "./styles/components/molecules/TagInput/TagInput.css";
import {
  Badge_default
} from "./chunk-NPBIA77B.mjs";
import {
  FORM_FIELD_CONSUMER_KEY,
  useFormField
} from "./chunk-GJBU4OKB.mjs";

// src/components/molecules/TagInput/index.tsx
import React, { useCallback, useId, useMemo, useRef, useState } from "react";

// src/components/molecules/TagInput/TagInput.config.ts
var TAG_INPUT_DEFAULTS = {
  size: "md",
  allowDuplicates: false,
  addOnBlur: false,
  delimiters: [","]
};
var TAG_INPUT_CHIP_SIZE = {
  sm: "sm",
  md: "sm",
  lg: "md"
};
var TAG_INPUT_LABELS = {
  remove: (tag) => `Remove ${tag}`,
  added: (tag) => `Added ${tag}`,
  removed: (tag) => `Removed ${tag}`,
  duplicate: (tag) => `"${tag}" is already added`,
  maxReached: (max) => `You can add up to ${max} tags`,
  list: "Selected tags",
  suggestions: "Suggestions"
};
var TAG_INPUT_PASTE_SEPARATORS = ["\n", "\r", "	"];

// src/components/molecules/TagInput/TagInput.utils.ts
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&");
}
function splitTags(text, separators) {
  const seps = separators.filter((s) => s.length > 0);
  if (seps.length === 0)
    return text.trim() ? [text.trim()] : [];
  const re = new RegExp(seps.map(escapeRegExp).join("|"), "g");
  return text.split(re).map((p) => p.trim()).filter(Boolean);
}
function containsSeparator(text, separators) {
  return separators.some((s) => s.length > 0 && text.includes(s));
}
function filterSuggestions(suggestions, query, tags, allowDuplicates) {
  const q = query.trim().toLowerCase();
  if (!q)
    return [];
  return suggestions.filter(
    (s) => s.toLowerCase().includes(q) && (allowDuplicates || !tags.includes(s))
  );
}
function splitPending(text, separators) {
  var _a;
  const seps = separators.filter((s) => s.length > 0);
  if (seps.length === 0)
    return { complete: [], tail: text };
  const pieces = text.split(new RegExp(seps.map(escapeRegExp).join("|"), "g"));
  const tail = ((_a = pieces.pop()) != null ? _a : "").trimStart();
  return { complete: pieces.map((p) => p.trim()).filter(Boolean), tail };
}

// src/components/molecules/TagInput/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function hasContent(node) {
  return node !== void 0 && node !== null && node !== false && node !== true && node !== "";
}
var TagInput = React.forwardRef(function TagInput2({
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
}, ref) {
  var _a;
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
  const inputId = (_a = idProp != null ? idProp : field == null ? void 0 : field.id) != null ? _a : `ds-tag-input-${reactId}`;
  const labelId = `ds-tag-input-${reactId}-label`;
  const messageId = `ds-tag-input-${reactId}-message`;
  const listboxId = `ds-tag-input-${reactId}-listbox`;
  const optionId = (i) => `ds-tag-input-${reactId}-option-${i}`;
  const isControlled = valueProp !== void 0;
  const [innerTags, setInnerTags] = useState(() => defaultValue != null ? defaultValue : []);
  const tags = isControlled ? valueProp : innerTags;
  const tagsRef = useRef(tags);
  tagsRef.current = tags;
  const [text, setText] = useState("");
  const [message, setMessage] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const interactive = !disabled && !readOnly;
  const atLimit = maxTags !== void 0 && tags.length >= maxTags;
  const hasSuggestions = suggestions !== void 0;
  const filtered = useMemo(
    () => hasSuggestions ? filterSuggestions(suggestions != null ? suggestions : [], text, tags, allowDuplicates) : [],
    [hasSuggestions, suggestions, text, tags, allowDuplicates]
  );
  const showList = hasSuggestions && listOpen && interactive && filtered.length > 0;
  const announce = useCallback((msg) => setAnnouncement(msg), []);
  const commit = useCallback(
    (next) => {
      if (!isControlled)
        setInnerTags(next);
      tagsRef.current = next;
      onChange == null ? void 0 : onChange(next);
    },
    [isControlled, onChange]
  );
  const addTags = useCallback(
    (candidates) => {
      let next = [...tagsRef.current];
      const rejected = [];
      const added = [];
      let firstError = null;
      for (const raw of candidates) {
        const tag = raw.trim();
        if (!tag)
          continue;
        let reason = null;
        if (maxTags !== void 0 && next.length >= maxTags)
          reason = labels.maxReached(maxTags);
        else if (!allowDuplicates && next.includes(tag))
          reason = labels.duplicate(tag);
        else if (validate) {
          const result = validate(tag, next);
          if (result !== true)
            reason = result;
        }
        if (reason !== null) {
          rejected.push(tag);
          if (firstError === null)
            firstError = reason;
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
    [allowDuplicates, announce, commit, labels, maxTags, validate]
  );
  const removeAt = useCallback(
    (index) => {
      const current = tagsRef.current;
      const tag = current[index];
      if (tag === void 0)
        return;
      commit(current.filter((_, i) => i !== index));
      setMessage(null);
      announce(labels.removed(tag));
    },
    [announce, commit, labels]
  );
  const updateText = (next) => {
    setText(next);
    onInputChange == null ? void 0 : onInputChange(next);
  };
  const commitText = (raw) => {
    const parts = splitTags(raw, [...delimiters, ...TAG_INPUT_PASTE_SEPARATORS]);
    if (parts.length === 0) {
      updateText("");
      return;
    }
    const { rejected } = addTags(parts);
    updateText(rejected.join(delimiters[0] ? `${delimiters[0]} ` : " "));
  };
  const focusChip = (index) => {
    var _a2, _b;
    const items = (_a2 = listRef.current) == null ? void 0 : _a2.querySelectorAll("[data-tag-index]");
    const target = (_b = items == null ? void 0 : items[index]) == null ? void 0 : _b.querySelector("button");
    target == null ? void 0 : target.focus();
  };
  const handleChange = (e) => {
    const next = e.target.value;
    if (containsSeparator(next, delimiters)) {
      const { complete, tail } = splitPending(next, delimiters);
      const { rejected } = addTags(complete);
      const remaining = [...rejected, tail.trimStart()].filter(Boolean);
      updateText(remaining.join(delimiters[0] ? `${delimiters[0]} ` : " "));
    } else {
      updateText(next);
      if (message)
        setMessage(null);
    }
    setListOpen(true);
    setActiveIndex(-1);
  };
  const handlePaste = (e) => {
    var _a2, _b;
    const pasted = e.clipboardData.getData("text");
    if (!containsSeparator(pasted, [...delimiters, ...TAG_INPUT_PASTE_SEPARATORS]))
      return;
    e.preventDefault();
    const el = e.currentTarget;
    const start = (_a2 = el.selectionStart) != null ? _a2 : text.length;
    const end = (_b = el.selectionEnd) != null ? _b : text.length;
    commitText(text.slice(0, start) + pasted + text.slice(end));
    setListOpen(false);
  };
  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing)
      return;
    const el = e.currentTarget;
    switch (e.key) {
      case "ArrowDown":
        if (!hasSuggestions)
          return;
        e.preventDefault();
        setListOpen(true);
        if (filtered.length > 0)
          setActiveIndex((i) => (i + 1) % filtered.length);
        return;
      case "ArrowUp":
        if (!showList)
          return;
        e.preventDefault();
        setActiveIndex((i) => i <= 0 ? filtered.length - 1 : i - 1);
        return;
      case "Enter": {
        if (showList && activeIndex >= 0 && filtered[activeIndex] !== void 0) {
          e.preventDefault();
          const { rejected } = addTags([filtered[activeIndex]]);
          if (rejected.length === 0)
            updateText("");
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
    if (addOnBlur && interactive && text.trim())
      commitText(text);
  };
  const handleChipKeyDown = (index) => (e) => {
    var _a2, _b;
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        focusChip(Math.max(0, index - 1));
        return;
      case "ArrowRight":
        e.preventDefault();
        if (index >= tags.length - 1)
          (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
        else
          focusChip(index + 1);
        return;
      case "Home":
        e.preventDefault();
        focusChip(0);
        return;
      case "End":
        e.preventDefault();
        (_b = inputRef.current) == null ? void 0 : _b.focus();
        return;
      case "Backspace":
      case "Delete": {
        if (!interactive)
          return;
        e.preventDefault();
        const remaining = tags.length - 1;
        removeAt(index);
        requestAnimationFrame(() => {
          var _a3;
          if (remaining === 0)
            (_a3 = inputRef.current) == null ? void 0 : _a3.focus();
          else if (e.key === "Backspace" && index > 0)
            focusChip(index - 1);
          else if (index < remaining)
            focusChip(index);
          else
            focusChip(remaining - 1);
        });
        return;
      }
      default:
    }
  };
  const handleRemoveClick = (index) => {
    removeAt(index);
    requestAnimationFrame(() => {
      var _a2;
      return (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    });
  };
  const pickSuggestion = (s) => {
    var _a2;
    const { rejected } = addTags([s]);
    if (rejected.length === 0)
      updateText("");
    setListOpen(false);
    setActiveIndex(-1);
    (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
  };
  const ownMessage = message != null ? message : !field && hasContent(error) && error !== true ? error : null;
  const describedBy = ariaDescribedByProp != null ? ariaDescribedByProp : [field == null ? void 0 : field.describedBy, ownMessage ? messageId : void 0].filter(Boolean).join(" ") || void 0;
  const invalid = ariaInvalidProp != null ? ariaInvalidProp : (field == null ? void 0 : field.invalid) || message !== null || error === true || hasContent(error) ? true : void 0;
  const required = ariaRequiredProp != null ? ariaRequiredProp : requiredProp || (field == null ? void 0 : field.required) ? true : void 0;
  const showOwnLabel = !field && hasContent(label);
  const inputLabelledBy = ariaLabelledByProp != null ? ariaLabelledByProp : showOwnLabel ? labelId : void 0;
  const chipSize = TAG_INPUT_CHIP_SIZE[size];
  const activeOptionId = showList && activeIndex >= 0 ? optionId(activeIndex) : void 0;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: ["ds-tag-input", className].filter(Boolean).join(" "),
      "data-size": size,
      "data-disabled": disabled ? "true" : void 0,
      "data-readonly": readOnly ? "true" : void 0,
      "data-invalid": invalid ? "true" : void 0,
      ...rootRest,
      children: [
        showOwnLabel ? /* @__PURE__ */ jsxs("label", { id: labelId, htmlFor: inputId, className: "ds-tag-input__label", children: [
          label,
          requiredProp ? /* @__PURE__ */ jsx("span", { className: "ds-tag-input__required", "aria-hidden": "true", children: " *" }) : null
        ] }) : null,
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "ds-tag-input__field",
            onMouseDown: (e) => {
              var _a2;
              if (e.target === e.currentTarget && !disabled) {
                e.preventDefault();
                (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
              }
            },
            children: [
              tags.length > 0 ? /* @__PURE__ */ jsx("ul", { ref: listRef, className: "ds-tag-input__chips", "aria-label": labels.list, children: tags.map((tag, index) => /* @__PURE__ */ jsx(
                "li",
                {
                  className: "ds-tag-input__chip",
                  "data-tag-index": index,
                  onKeyDown: handleChipKeyDown(index),
                  children: /* @__PURE__ */ jsx(
                    Badge_default,
                    {
                      variant: "neutral",
                      tone: "soft",
                      shape: "pill",
                      size: chipSize,
                      onDismiss: interactive ? () => handleRemoveClick(index) : void 0,
                      dismissLabel: labels.remove(tag),
                      children: tag
                    }
                  )
                },
                `${tag}-${index}`
              )) }) : null,
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  id: inputId,
                  type: "text",
                  className: "ds-tag-input__input",
                  value: text,
                  placeholder: atLimit ? void 0 : placeholder,
                  disabled,
                  readOnly,
                  autoComplete: "off",
                  enterKeyHint: "enter",
                  "aria-label": ariaLabelProp,
                  "aria-labelledby": inputLabelledBy,
                  "aria-describedby": describedBy,
                  "aria-invalid": invalid,
                  "aria-required": required,
                  role: hasSuggestions ? "combobox" : void 0,
                  "aria-autocomplete": hasSuggestions ? "list" : void 0,
                  "aria-expanded": hasSuggestions ? showList : void 0,
                  "aria-controls": hasSuggestions ? listboxId : void 0,
                  "aria-activedescendant": activeOptionId,
                  onChange: handleChange,
                  onPaste: handlePaste,
                  onKeyDown: handleKeyDown,
                  onBlur: handleBlur,
                  onFocus: () => setListOpen(true)
                }
              ),
              hasSuggestions ? /* @__PURE__ */ jsx(
                "ul",
                {
                  id: listboxId,
                  role: "listbox",
                  "aria-label": labels.suggestions,
                  className: "ds-tag-input__listbox",
                  hidden: !showList,
                  children: showList ? filtered.map((s, i) => /* @__PURE__ */ jsx(
                    "li",
                    {
                      id: optionId(i),
                      role: "option",
                      "aria-selected": i === activeIndex,
                      className: "ds-tag-input__option",
                      "data-active": i === activeIndex ? "true" : void 0,
                      onMouseDown: (e) => e.preventDefault(),
                      onMouseEnter: () => setActiveIndex(i),
                      onClick: () => pickSuggestion(s),
                      children: s
                    },
                    s
                  )) : null
                }
              ) : null
            ]
          }
        ),
        name !== void 0 ? /* @__PURE__ */ jsx("input", { type: "hidden", name, value: tags.join(",") }) : null,
        ownMessage ? /* @__PURE__ */ jsx(
          "p",
          {
            id: messageId,
            className: "ds-tag-input__error",
            role: message ? "alert" : void 0,
            children: ownMessage
          }
        ) : null,
        /* @__PURE__ */ jsx("span", { className: "ds-tag-input__sr", role: "status", "aria-live": "polite", "aria-atomic": "true", children: announcement })
      ]
    }
  );
});
TagInput.displayName = "TagInput";
TagInput[FORM_FIELD_CONSUMER_KEY] = true;
var TagInput_default = TagInput;

export {
  TagInput,
  TagInput_default
};
//# sourceMappingURL=chunk-RFBNDQEW.mjs.map