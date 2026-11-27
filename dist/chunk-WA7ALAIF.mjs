/* ucs:component-css */
import "./styles/components/molecules/CommandPalette/CommandPalette.css";
import {
  trapTabKey
} from "./chunk-R3MWLFBP.mjs";
import {
  acquireBodyScrollLock,
  releaseBodyScrollLock
} from "./chunk-63D2ARDU.mjs";
import {
  OverlayLayerContext,
  isTopLayer,
  popLayer,
  pushLayer
} from "./chunk-FPB2PMES.mjs";
import {
  Kbd_default,
  detectIsMac,
  toAriaKeyShortcuts,
  useIsMac
} from "./chunk-CATLDOA2.mjs";
import {
  Spinner_default
} from "./chunk-5YRQQZSX.mjs";

// src/components/molecules/CommandPalette/index.tsx
import React, { useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

// src/components/molecules/CommandPalette/CommandPalette.config.ts
var COMMAND_PALETTE_DEFAULTS = {
  placeholder: "Type a command or search\u2026",
  emptyState: "No results found.",
  searchDebounceMs: 200,
  shouldFilter: true,
  hotkey: ["mod", "k"],
  enableHotkey: true,
  allowInInputs: false,
  closeOnSelect: true,
  returnFocus: true,
  ariaLabel: "Command palette",
  inputLabel: "Search commands",
  listLabel: "Commands",
  closeLabel: "Close",
  loadingLabel: "Loading results\u2026",
  announceDelayMs: 500,
  showFooter: true
};
function defaultResultsLabel(count) {
  if (count === 0)
    return "No results";
  return count === 1 ? "1 result" : `${count} results`;
}
var COMMAND_SCORES = {
  labelExact: 120,
  labelPrefix: 100,
  labelWordStart: 70,
  labelSubstring: 40,
  keywordExact: 60,
  keywordPrefix: 50,
  keywordSubstring: 20,
  descriptionWordStart: 15,
  descriptionSubstring: 8
};

// src/components/molecules/CommandPalette/CommandPalette.utils.ts
function normalizeText(value) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}
function tokenize(query) {
  const normalized = normalizeText(query);
  return normalized ? normalized.split(" ") : [];
}
function matchesWordStart(text, token) {
  let from = text.indexOf(token, 1);
  while (from > 0) {
    if (/[\s\-_/.:,()[\]]/.test(text[from - 1]))
      return true;
    from = text.indexOf(token, from + 1);
  }
  return false;
}
function scoreLabel(label, token) {
  if (label.startsWith(token))
    return COMMAND_SCORES.labelPrefix;
  if (matchesWordStart(label, token))
    return COMMAND_SCORES.labelWordStart;
  if (label.includes(token))
    return COMMAND_SCORES.labelSubstring;
  return 0;
}
function scoreKeyword(keyword, token) {
  if (keyword === token)
    return COMMAND_SCORES.keywordExact;
  if (keyword.startsWith(token))
    return COMMAND_SCORES.keywordPrefix;
  if (keyword.includes(token))
    return COMMAND_SCORES.keywordSubstring;
  return 0;
}
function scoreDescription(description, token) {
  if (description.startsWith(token) || matchesWordStart(description, token))
    return COMMAND_SCORES.descriptionWordStart;
  if (description.includes(token))
    return COMMAND_SCORES.descriptionSubstring;
  return 0;
}
function scoreItem(item, query) {
  var _a;
  const tokens = tokenize(query);
  if (tokens.length === 0)
    return 1;
  const label = normalizeText(item.label);
  const keywords = ((_a = item.keywords) != null ? _a : []).map(normalizeText).filter(Boolean);
  const description = item.description ? normalizeText(item.description) : "";
  let total = 0;
  for (const token of tokens) {
    let best = scoreLabel(label, token);
    for (const keyword of keywords)
      best = Math.max(best, scoreKeyword(keyword, token));
    if (description)
      best = Math.max(best, scoreDescription(description, token));
    if (best === 0)
      return 0;
    total += best;
  }
  if (label === tokens.join(" "))
    total += COMMAND_SCORES.labelExact;
  return total;
}
function optionKey(groupId, itemId) {
  return `${groupId}::${itemId}`;
}
function listGroups(groups, keyPrefix = "") {
  return groups.filter((group) => group.items.length > 0).map((group) => ({
    group,
    options: group.items.map((item) => ({
      key: keyPrefix + optionKey(group.id, item.id),
      groupId: group.id,
      item,
      score: 0
    }))
  }));
}
function rankGroups(groups, query) {
  if (tokenize(query).length === 0)
    return listGroups(groups);
  const ranked = [];
  groups.forEach((group, index) => {
    const options = [];
    group.items.forEach((item, order) => {
      const score = scoreItem(item, query);
      if (score > 0)
        options.push({ key: optionKey(group.id, item.id), groupId: group.id, item, score, order });
    });
    if (options.length === 0)
      return;
    options.sort((a, b) => b.score - a.score || a.order - b.order);
    ranked.push({
      group,
      options: options.map(({ order: _order, ...rest }) => rest),
      best: options[0].score,
      index
    });
  });
  ranked.sort((a, b) => b.best - a.best || a.index - b.index);
  return ranked.map(({ group, options }) => ({ group, options }));
}
function flattenOptions(groups) {
  return groups.flatMap((g) => g.options);
}
function toDomId(value) {
  return value.replace(/[^A-Za-z0-9_-]/g, (ch) => `_${ch.charCodeAt(0).toString(16)}`);
}
function isEditableTarget(target) {
  if (!target || typeof target.closest !== "function")
    return false;
  const el = target;
  if (el.isContentEditable)
    return true;
  if (el.closest("[contenteditable]:not([contenteditable='false'])"))
    return true;
  const tag = el.tagName;
  if (tag === "TEXTAREA" || tag === "SELECT")
    return true;
  if (tag === "INPUT") {
    const type = (el.type || "text").toLowerCase();
    return !["button", "submit", "reset", "checkbox", "radio", "range", "color", "file", "image"].includes(type);
  }
  return false;
}
var MODIFIERS = /* @__PURE__ */ new Set(["mod", "ctrl", "control", "meta", "cmd", "alt", "option", "shift"]);
function matchesHotkey(event, hotkey, isMac) {
  const parts = hotkey.map((k) => k.trim().toLowerCase()).filter(Boolean);
  const key = parts.find((p) => !MODIFIERS.has(p));
  if (!key)
    return false;
  let ctrl = false;
  let meta = false;
  let alt = false;
  let shift = false;
  for (const p of parts) {
    if (p === "mod") {
      if (isMac)
        meta = true;
      else
        ctrl = true;
    } else if (p === "ctrl" || p === "control")
      ctrl = true;
    else if (p === "meta" || p === "cmd")
      meta = true;
    else if (p === "alt" || p === "option")
      alt = true;
    else if (p === "shift")
      shift = true;
  }
  if (event.ctrlKey !== ctrl || event.metaKey !== meta || event.altKey !== alt || event.shiftKey !== shift) {
    return false;
  }
  const eventKey = (event.key || "").toLowerCase();
  if (eventKey === key)
    return true;
  const code = event.code || "";
  if (key.length === 1 && /[a-z]/.test(key))
    return code === `Key${key.toUpperCase()}`;
  if (key.length === 1 && /[0-9]/.test(key))
    return code === `Digit${key}`;
  return false;
}

// src/components/molecules/CommandPalette/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function SearchGlyph() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 20 20", width: "18", height: "18", "aria-hidden": true, focusable: "false", children: [
    /* @__PURE__ */ jsx("circle", { cx: "9", cy: "9", r: "5.5", fill: "none", stroke: "currentColor", strokeWidth: "1.75" }),
    /* @__PURE__ */ jsx("path", { d: "M13.2 13.2 17 17", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" })
  ] });
}
function CloseGlyph() {
  return /* @__PURE__ */ jsx("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": true, focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
}
var NO_GROUPS = [];
var CommandPalette = React.forwardRef(function CommandPalette2({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  groups,
  recent,
  placeholder = COMMAND_PALETTE_DEFAULTS.placeholder,
  emptyState = COMMAND_PALETTE_DEFAULTS.emptyState,
  onSearch,
  searchDebounceMs = COMMAND_PALETTE_DEFAULTS.searchDebounceMs,
  loading = false,
  shouldFilter = COMMAND_PALETTE_DEFAULTS.shouldFilter,
  hotkey = COMMAND_PALETTE_DEFAULTS.hotkey,
  enableHotkey = COMMAND_PALETTE_DEFAULTS.enableHotkey,
  allowInInputs = COMMAND_PALETTE_DEFAULTS.allowInInputs,
  closeOnSelect = COMMAND_PALETTE_DEFAULTS.closeOnSelect,
  returnFocus = COMMAND_PALETTE_DEFAULTS.returnFocus,
  ariaLabel = COMMAND_PALETTE_DEFAULTS.ariaLabel,
  inputLabel = COMMAND_PALETTE_DEFAULTS.inputLabel,
  listLabel = COMMAND_PALETTE_DEFAULTS.listLabel,
  closeLabel = COMMAND_PALETTE_DEFAULTS.closeLabel,
  loadingLabel = COMMAND_PALETTE_DEFAULTS.loadingLabel,
  resultsLabel = defaultResultsLabel,
  announceDelayMs = COMMAND_PALETTE_DEFAULTS.announceDelayMs,
  showFooter = COMMAND_PALETTE_DEFAULTS.showFooter,
  className,
  id
}, forwardedRef) {
  var _a;
  const autoId = useId();
  const layerId = `command-palette-${autoId}`;
  const parentLayerId = useContext(OverlayLayerContext);
  const baseId = id != null ? id : `ds-command-palette-${autoId.replace(/[^A-Za-z0-9_-]/g, "")}`;
  const inputId = `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;
  const isMac = useIsMac();
  const isControlled = openProp !== void 0;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? !!openProp : internalOpen;
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  const setOpen = useCallback(
    (next) => {
      var _a2;
      if (!isControlled)
        setInternalOpen(next);
      (_a2 = onOpenChangeRef.current) == null ? void 0 : _a2.call(onOpenChangeRef, next);
    },
    [isControlled]
  );
  const setOpenRef = useRef(setOpen);
  setOpenRef.current = setOpen;
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const listboxRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const ownedFocusTargetRef = useRef(null);
  const returnFocusRef = useRef(returnFocus);
  returnFocusRef.current = returnFocus;
  const hotkeyRef = useRef(hotkey);
  hotkeyRef.current = hotkey;
  const allowInInputsRef = useRef(allowInInputs);
  allowInInputsRef.current = allowInInputs;
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;
  const pendingSelectRef = useRef(null);
  const [selectTick, setSelectTick] = useState(0);
  const setPanelRef = useCallback(
    (node) => {
      panelRef.current = node;
      if (typeof forwardedRef === "function")
        forwardedRef(node);
      else if (forwardedRef)
        forwardedRef.current = node;
    },
    [forwardedRef]
  );
  const [query, setQuery] = useState("");
  const [activeKey, setActiveKey] = useState(null);
  const [remoteGroups, setRemoteGroups] = useState(NO_GROUPS);
  const [searching, setSearching] = useState(false);
  const hasOnSearch = typeof onSearch === "function";
  useEffect(() => {
    if (isOpen)
      return;
    setQuery("");
    setActiveKey(null);
    setRemoteGroups(NO_GROUPS);
    setSearching(false);
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen || !hasOnSearch)
      return void 0;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      const search = onSearchRef.current;
      if (!search)
        return;
      let result;
      try {
        result = search(query, { signal: controller.signal });
      } catch (e) {
        setRemoteGroups(NO_GROUPS);
        setSearching(false);
        return;
      }
      if (result && typeof result.then === "function") {
        setSearching(true);
        result.then(
          (value) => {
            if (controller.signal.aborted)
              return;
            setRemoteGroups(Array.isArray(value) ? value : NO_GROUPS);
            setSearching(false);
          },
          () => {
            if (controller.signal.aborted)
              return;
            setRemoteGroups(NO_GROUPS);
            setSearching(false);
          }
        );
      } else {
        setRemoteGroups(Array.isArray(result) ? result : NO_GROUPS);
        setSearching(false);
      }
    }, searchDebounceMs);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [isOpen, hasOnSearch, query, searchDebounceMs]);
  const isLoading = loading || searching;
  const hasQuery = query.trim().length > 0;
  const rankedGroups = useMemo(() => {
    const showRecent = !hasQuery && recent && recent.items.length > 0;
    const local = shouldFilter ? rankGroups(groups, query) : listGroups(groups);
    return [
      ...showRecent && recent ? listGroups([recent], "recent:") : [],
      ...local,
      ...listGroups(remoteGroups, "remote:")
    ];
  }, [groups, recent, query, hasQuery, shouldFilter, remoteGroups]);
  const options = useMemo(() => flattenOptions(rankedGroups), [rankedGroups]);
  const enabledOptions = useMemo(() => options.filter((o) => !o.item.disabled), [options]);
  const activeOption = (_a = enabledOptions.find((o) => o.key === activeKey)) != null ? _a : enabledOptions[0];
  const optionDomId = (key) => `${baseId}-option-${toDomId(key)}`;
  const activeDomId = activeOption ? optionDomId(activeOption.key) : void 0;
  useEffect(() => {
    if (!isOpen || !activeDomId)
      return;
    const el = typeof document !== "undefined" ? document.getElementById(activeDomId) : null;
    if (el && typeof el.scrollIntoView === "function")
      el.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeDomId]);
  const resultsLabelRef = useRef(resultsLabel);
  resultsLabelRef.current = resultsLabel;
  const pendingMessage = !isOpen ? "" : isLoading ? loadingLabel : hasQuery ? resultsLabelRef.current(options.length) : "";
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    if (!isOpen) {
      setAnnouncement("");
      return void 0;
    }
    const timer = setTimeout(() => setAnnouncement(pendingMessage), announceDelayMs);
    return () => clearTimeout(timer);
  }, [isOpen, pendingMessage, query, announceDelayMs]);
  useEffect(() => {
    if (!enableHotkey || typeof document === "undefined")
      return void 0;
    const onKeyDown = (e) => {
      var _a2, _b;
      if (e.defaultPrevented || e.isComposing || e.repeat)
        return;
      if (!matchesHotkey(e, hotkeyRef.current, detectIsMac()))
        return;
      const target = (_a2 = typeof e.composedPath === "function" ? e.composedPath()[0] : null) != null ? _a2 : e.target;
      const insidePalette = target instanceof Node && !!((_b = panelRef.current) == null ? void 0 : _b.contains(target));
      if (!insidePalette && !allowInInputsRef.current && isEditableTarget(target))
        return;
      if (isOpenRef.current) {
        if (!isTopLayer(layerId))
          return;
        e.preventDefault();
        setOpenRef.current(false);
      } else {
        e.preventDefault();
        setOpenRef.current(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [enableHotkey, layerId]);
  useEffect(() => {
    if (!isOpen)
      return void 0;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [isOpen, layerId, parentLayerId]);
  useEffect(() => {
    if (!isOpen)
      return void 0;
    const onFocusIn = (e) => {
      var _a2;
      const panel = panelRef.current;
      const target = e.target;
      if (!panel || !(target instanceof Node))
        return;
      if (panel.contains(target)) {
        ownedFocusTargetRef.current = null;
        lastFocusedRef.current = target;
        return;
      }
      const owned = ownedFocusTargetRef.current === target;
      ownedFocusTargetRef.current = null;
      if (owned)
        return;
      if (!isTopLayer(layerId))
        return;
      const allowed = target instanceof Element ? target : target.parentElement;
      if (allowed == null ? void 0 : allowed.closest("[data-overlay-allow]"))
        return;
      const fallback = lastFocusedRef.current && panel.contains(lastFocusedRef.current) ? lastFocusedRef.current : (_a2 = inputRef.current) != null ? _a2 : panel;
      fallback.focus({ preventScroll: true });
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [isOpen, layerId]);
  useEffect(() => {
    var _a2, _b;
    if (!isOpen)
      return void 0;
    const previous = typeof document !== "undefined" ? document.activeElement : null;
    const panel = panelRef.current;
    (_b = (_a2 = inputRef.current) != null ? _a2 : panel) == null ? void 0 : _b.focus({ preventScroll: true });
    return () => {
      if (!returnFocusRef.current || !previous || previous === document.body)
        return;
      if (!previous.isConnected || typeof previous.focus !== "function")
        return;
      const active = document.activeElement;
      const focusLost = !active || active === document.body || panel != null && panel.contains(active);
      if (focusLost)
        previous.focus({ preventScroll: true });
    };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen)
      return void 0;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen)
      return void 0;
    const onKeyDown = (e) => {
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing)
        return;
      if (!isTopLayer(layerId))
        return;
      e.preventDefault();
      e.stopPropagation();
      setOpenRef.current(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, layerId]);
  useEffect(() => {
    const item = pendingSelectRef.current;
    if (!item)
      return;
    pendingSelectRef.current = null;
    item.onSelect(item);
  }, [selectTick]);
  const selectOption = (option) => {
    if (!option || option.item.disabled)
      return;
    if (closeOnSelect) {
      pendingSelectRef.current = option.item;
      setSelectTick((n) => n + 1);
      setOpen(false);
    } else {
      option.item.onSelect(option.item);
    }
  };
  const moveActive = (to) => {
    const count = enabledOptions.length;
    if (count === 0)
      return;
    const current = activeOption ? enabledOptions.indexOf(activeOption) : -1;
    let index = 0;
    if (to === "first")
      index = 0;
    else if (to === "last")
      index = count - 1;
    else if (to === "next")
      index = current < 0 ? 0 : (current + 1) % count;
    else
      index = current < 0 ? count - 1 : (current - 1 + count) % count;
    setActiveKey(enabledOptions[index].key);
  };
  const handleInputKeyDown = (e) => {
    if (e.nativeEvent.isComposing)
      return;
    const plain = !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveActive("next");
        break;
      case "ArrowUp":
        e.preventDefault();
        moveActive("prev");
        break;
      case "Home":
        if (!plain || enabledOptions.length === 0)
          return;
        e.preventDefault();
        moveActive("first");
        break;
      case "End":
        if (!plain || enabledOptions.length === 0)
          return;
        e.preventDefault();
        moveActive("last");
        break;
      case "Enter":
        if (!activeOption)
          return;
        e.preventDefault();
        selectOption(activeOption);
        break;
      default:
        break;
    }
  };
  if (!isOpen || typeof document === "undefined")
    return null;
  const hasOptions = options.length > 0;
  const showEmpty = !hasOptions && !isLoading;
  return createPortal(
    /* @__PURE__ */ jsx(OverlayLayerContext.Provider, { value: layerId, children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: "ds-command-palette-root",
        onFocusCapture: (e) => {
          ownedFocusTargetRef.current = e.target;
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "ds-command-palette__backdrop",
              "aria-hidden": "true",
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => {
                if (isTopLayer(layerId))
                  setOpen(false);
              }
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: setPanelRef,
              id: baseId,
              role: "dialog",
              "aria-modal": "true",
              "aria-label": ariaLabel,
              tabIndex: -1,
              className: ["ds-command-palette", className].filter(Boolean).join(" "),
              onKeyDown: (e) => {
                if (panelRef.current)
                  trapTabKey(e.nativeEvent, panelRef.current);
              },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "ds-command-palette__search", children: [
                  /* @__PURE__ */ jsx("span", { className: "ds-command-palette__search-icon", children: /* @__PURE__ */ jsx(SearchGlyph, {}) }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      ref: inputRef,
                      id: inputId,
                      className: "ds-command-palette__input",
                      type: "text",
                      role: "combobox",
                      "aria-label": inputLabel,
                      "aria-expanded": hasOptions,
                      "aria-controls": listboxId,
                      "aria-autocomplete": "list",
                      "aria-activedescendant": activeDomId,
                      autoComplete: "off",
                      autoCorrect: "off",
                      autoCapitalize: "off",
                      spellCheck: false,
                      enterKeyHint: "go",
                      placeholder,
                      value: query,
                      onChange: (e) => {
                        setQuery(e.target.value);
                        setActiveKey(null);
                      },
                      onKeyDown: handleInputKeyDown
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "ds-command-palette__close",
                      "aria-label": closeLabel,
                      onClick: () => setOpen(false),
                      children: /* @__PURE__ */ jsx(CloseGlyph, {})
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "ds-command-palette__body", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      ref: listboxRef,
                      id: listboxId,
                      role: "listbox",
                      "aria-label": listLabel,
                      "aria-busy": isLoading || void 0,
                      className: "ds-command-palette__list",
                      hidden: !hasOptions,
                      children: rankedGroups.map(({ group, options: groupOptions }, groupIndex) => {
                        const headingId = `${baseId}-group-${groupIndex}-${toDomId(group.id)}`;
                        return /* @__PURE__ */ jsxs(
                          "div",
                          {
                            role: "group",
                            "aria-labelledby": headingId,
                            className: "ds-command-palette__group",
                            children: [
                              /* @__PURE__ */ jsx("div", { role: "presentation", id: headingId, className: "ds-command-palette__group-label", children: group.label }),
                              groupOptions.map((option) => {
                                const { item } = option;
                                const active = (activeOption == null ? void 0 : activeOption.key) === option.key;
                                return /* @__PURE__ */ jsxs(
                                  "div",
                                  {
                                    id: optionDomId(option.key),
                                    role: "option",
                                    "aria-selected": active,
                                    "aria-disabled": item.disabled ? true : void 0,
                                    "aria-keyshortcuts": item.shortcut && item.shortcut.length > 0 ? toAriaKeyShortcuts(item.shortcut, isMac) : void 0,
                                    "data-active": active ? "true" : void 0,
                                    className: "ds-command-palette__option",
                                    onMouseDown: (e) => e.preventDefault(),
                                    onMouseMove: () => {
                                      if (!item.disabled && !active)
                                        setActiveKey(option.key);
                                    },
                                    onClick: () => selectOption(option),
                                    children: [
                                      item.icon != null ? /* @__PURE__ */ jsx("span", { className: "ds-command-palette__option-icon", "aria-hidden": "true", children: item.icon }) : null,
                                      /* @__PURE__ */ jsxs("span", { className: "ds-command-palette__option-text", children: [
                                        /* @__PURE__ */ jsx("span", { className: "ds-command-palette__option-label", children: item.label }),
                                        item.description ? /* @__PURE__ */ jsx("span", { className: "ds-command-palette__option-description", children: item.description }) : null
                                      ] }),
                                      item.shortcut && item.shortcut.length > 0 ? /* @__PURE__ */ jsx(Kbd_default, { keys: item.shortcut, className: "ds-command-palette__option-kbd", "aria-hidden": "true" }) : null
                                    ]
                                  },
                                  option.key
                                );
                              })
                            ]
                          },
                          `${groupIndex}-${group.id}`
                        );
                      })
                    }
                  ),
                  isLoading ? /* @__PURE__ */ jsxs("div", { className: "ds-command-palette__loading", "aria-hidden": "true", children: [
                    /* @__PURE__ */ jsx(Spinner_default, { size: "xs", tone: "muted", decorative: true }),
                    /* @__PURE__ */ jsx("span", { children: loadingLabel })
                  ] }) : null,
                  showEmpty ? /* @__PURE__ */ jsx("div", { className: "ds-command-palette__empty", children: emptyState }) : null
                ] }),
                showFooter ? /* @__PURE__ */ jsxs("div", { className: "ds-command-palette__footer", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsxs("span", { className: "ds-command-palette__hint", children: [
                    /* @__PURE__ */ jsx(Kbd_default, { keys: ["up"] }),
                    /* @__PURE__ */ jsx(Kbd_default, { keys: ["down"] }),
                    /* @__PURE__ */ jsx("span", { children: "to navigate" })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "ds-command-palette__hint", children: [
                    /* @__PURE__ */ jsx(Kbd_default, { keys: ["enter"] }),
                    /* @__PURE__ */ jsx("span", { children: "to select" })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "ds-command-palette__hint", children: [
                    /* @__PURE__ */ jsx(Kbd_default, { keys: ["esc"] }),
                    /* @__PURE__ */ jsx("span", { children: "to close" })
                  ] })
                ] }) : null,
                /* @__PURE__ */ jsx("div", { className: "ds-command-palette__sr", role: "status", "aria-live": "polite", "aria-atomic": "true", children: announcement })
              ]
            }
          )
        ]
      }
    ) }),
    document.body
  );
});
CommandPalette.displayName = "CommandPalette";
var CommandPalette_default = CommandPalette;

export {
  normalizeText,
  scoreItem,
  rankGroups,
  isEditableTarget,
  matchesHotkey,
  CommandPalette,
  CommandPalette_default
};
//# sourceMappingURL=chunk-WA7ALAIF.mjs.map