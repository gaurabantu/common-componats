"use client";

import React, { useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { acquireBodyScrollLock, releaseBodyScrollLock } from "../Modal/bodyScrollLock";
import { OverlayLayerContext, isTopLayer, popLayer, pushLayer } from "../Modal/overlayStack";
import { trapTabKey } from "../Drawer/Drawer.utils";
import Kbd from "../../atoms/Kbd";
import { detectIsMac, toAriaKeyShortcuts, useIsMac } from "../../atoms/Kbd/Kbd.utils";
import Spinner from "../../atoms/Spinner";
import { COMMAND_PALETTE_DEFAULTS as D, defaultResultsLabel } from "./CommandPalette.config";
import {
  flattenOptions,
  isEditableTarget,
  listGroups,
  matchesHotkey,
  rankGroups,
  toDomId,
} from "./CommandPalette.utils";
import type { CommandGroup, CommandItem, CommandOption, CommandPaletteProps } from "./CommandPalette.types";
import "./CommandPalette.css";

function SearchGlyph() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden focusable="false">
      <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path d="M13.2 13.2 17 17" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden focusable="false">
      <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

const NO_GROUPS: CommandGroup[] = [];

/**
 * CommandPalette — modal command menu (⌘K / Ctrl+K). Combobox pattern: DOM focus stays in the
 * search input (`role="combobox"`), the highlighted option is exposed via `aria-activedescendant`,
 * and the result count is announced through a debounced polite live region. Portal, shared overlay
 * stack (one Escape closes one layer), ownership-based focus guard, Tab trap, shared body scroll
 * lock, focus restored to the opener on close. Full-screen at ≤ 480px.
 */
const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(function CommandPalette(
  {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    groups,
    recent,
    placeholder = D.placeholder,
    emptyState = D.emptyState,
    onSearch,
    searchDebounceMs = D.searchDebounceMs,
    loading = false,
    shouldFilter = D.shouldFilter,
    hotkey = D.hotkey,
    enableHotkey = D.enableHotkey,
    allowInInputs = D.allowInInputs,
    closeOnSelect = D.closeOnSelect,
    returnFocus = D.returnFocus,
    ariaLabel = D.ariaLabel,
    inputLabel = D.inputLabel,
    listLabel = D.listLabel,
    closeLabel = D.closeLabel,
    loadingLabel = D.loadingLabel,
    resultsLabel = defaultResultsLabel,
    announceDelayMs = D.announceDelayMs,
    showFooter = D.showFooter,
    className,
    id,
  },
  forwardedRef,
) {
  const autoId = useId();
  const layerId = `command-palette-${autoId}`;
  const parentLayerId = useContext(OverlayLayerContext);
  const baseId = id ?? `ds-command-palette-${autoId.replace(/[^A-Za-z0-9_-]/g, "")}`;
  const inputId = `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;
  const isMac = useIsMac();

  // ── open state (controlled / uncontrolled) ───────────────────────────────
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? !!openProp : internalOpen;
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;
  const onOpenChangeRef = useRef(onOpenChange);
  onOpenChangeRef.current = onOpenChange;
  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChangeRef.current?.(next);
    },
    [isControlled],
  );
  const setOpenRef = useRef(setOpen);
  setOpenRef.current = setOpen;

  // ── refs ─────────────────────────────────────────────────────────────────
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listboxRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  /** Target of the focus event currently passing through this palette's React tree (onFocusCapture). */
  const ownedFocusTargetRef = useRef<EventTarget | null>(null);
  const returnFocusRef = useRef(returnFocus);
  returnFocusRef.current = returnFocus;
  const hotkeyRef = useRef(hotkey);
  hotkeyRef.current = hotkey;
  const allowInInputsRef = useRef(allowInInputs);
  allowInInputsRef.current = allowInInputs;
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;
  /** Item chosen with closeOnSelect — its onSelect runs after the close commit (focus already restored). */
  const pendingSelectRef = useRef<CommandItem | null>(null);
  const [selectTick, setSelectTick] = useState(0);

  const setPanelRef = useCallback(
    (node: HTMLDivElement | null) => {
      panelRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  // ── query + remote search ────────────────────────────────────────────────
  const [query, setQuery] = useState("");
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [remoteGroups, setRemoteGroups] = useState<CommandGroup[]>(NO_GROUPS);
  const [searching, setSearching] = useState(false);
  const hasOnSearch = typeof onSearch === "function";

  // Reset when closed so the next open starts clean.
  useEffect(() => {
    if (isOpen) return;
    setQuery("");
    setActiveKey(null);
    setRemoteGroups(NO_GROUPS);
    setSearching(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !hasOnSearch) return undefined;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      const search = onSearchRef.current;
      if (!search) return;
      let result: ReturnType<NonNullable<CommandPaletteProps["onSearch"]>>;
      try {
        result = search(query, { signal: controller.signal });
      } catch {
        setRemoteGroups(NO_GROUPS);
        setSearching(false);
        return;
      }
      if (result && typeof (result as Promise<unknown>).then === "function") {
        setSearching(true);
        (result as Promise<void | CommandGroup[]>).then(
          (value) => {
            if (controller.signal.aborted) return;
            setRemoteGroups(Array.isArray(value) ? value : NO_GROUPS);
            setSearching(false);
          },
          () => {
            if (controller.signal.aborted) return;
            setRemoteGroups(NO_GROUPS);
            setSearching(false);
          },
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

  // ── results ──────────────────────────────────────────────────────────────
  const rankedGroups = useMemo(() => {
    const showRecent = !hasQuery && recent && recent.items.length > 0;
    const local = shouldFilter ? rankGroups(groups, query) : listGroups(groups);
    return [
      ...(showRecent && recent ? listGroups([recent], "recent:") : []),
      ...local,
      ...listGroups(remoteGroups, "remote:"),
    ];
  }, [groups, recent, query, hasQuery, shouldFilter, remoteGroups]);

  const options = useMemo(() => flattenOptions(rankedGroups), [rankedGroups]);
  const enabledOptions = useMemo(() => options.filter((o) => !o.item.disabled), [options]);
  // Derived, so aria-activedescendant always names a mounted, enabled option (or is absent).
  const activeOption: CommandOption | undefined =
    enabledOptions.find((o) => o.key === activeKey) ?? enabledOptions[0];
  const optionDomId = (key: string) => `${baseId}-option-${toDomId(key)}`;
  const activeDomId = activeOption ? optionDomId(activeOption.key) : undefined;

  // Keep the highlighted option visible.
  useEffect(() => {
    if (!isOpen || !activeDomId) return;
    const el = typeof document !== "undefined" ? document.getElementById(activeDomId) : null;
    if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeDomId]);

  // ── debounced polite announcement ────────────────────────────────────────
  const resultsLabelRef = useRef(resultsLabel);
  resultsLabelRef.current = resultsLabel;
  const pendingMessage = !isOpen
    ? ""
    : isLoading
      ? loadingLabel
      : hasQuery
        ? resultsLabelRef.current(options.length)
        : "";
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    if (!isOpen) {
      setAnnouncement("");
      return undefined;
    }
    // Restarted on every keystroke (query in deps) so only the settled count is announced.
    const timer = setTimeout(() => setAnnouncement(pendingMessage), announceDelayMs);
    return () => clearTimeout(timer);
  }, [isOpen, pendingMessage, query, announceDelayMs]);

  // ── global hotkey (SSR-safe: listener only in an effect) ─────────────────
  useEffect(() => {
    if (!enableHotkey || typeof document === "undefined") return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing || e.repeat) return;
      if (!matchesHotkey(e, hotkeyRef.current, detectIsMac())) return;
      const target = (typeof e.composedPath === "function" ? e.composedPath()[0] : null) ?? e.target;
      const insidePalette = target instanceof Node && !!panelRef.current?.contains(target);
      if (!insidePalette && !allowInInputsRef.current && isEditableTarget(target)) return;
      if (isOpenRef.current) {
        // Only close when the palette is the top layer (not while a dialog it opened sits above it).
        if (!isTopLayer(layerId)) return;
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

  // ── overlay stack (declared before return-focus: cleanups run in order) ──
  useEffect(() => {
    if (!isOpen) return undefined;
    pushLayer(layerId, parentLayerId);
    return () => popLayer(layerId);
  }, [isOpen, layerId, parentLayerId]);

  // Focus guard — ownership, not DOM order (same approach as Drawer): focus landing outside the
  // panel is pulled back unless it came through this palette's React tree (onFocusCapture marks it),
  // the palette is not the top layer, or the target opts in via [data-overlay-allow].
  useEffect(() => {
    if (!isOpen) return undefined;
    const onFocusIn = (e: FocusEvent) => {
      const panel = panelRef.current;
      const target = e.target;
      if (!panel || !(target instanceof Node)) return;
      if (panel.contains(target)) {
        ownedFocusTargetRef.current = null;
        lastFocusedRef.current = target as HTMLElement;
        return;
      }
      const owned = ownedFocusTargetRef.current === target;
      ownedFocusTargetRef.current = null;
      if (owned) return;
      if (!isTopLayer(layerId)) return;
      const allowed = target instanceof Element ? target : target.parentElement;
      if (allowed?.closest("[data-overlay-allow]")) return;
      const fallback =
        lastFocusedRef.current && panel.contains(lastFocusedRef.current)
          ? lastFocusedRef.current
          : inputRef.current ?? panel;
      fallback.focus({ preventScroll: true });
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [isOpen, layerId]);

  // Initial focus → input; on close → previously focused element (unless focus already moved on).
  useEffect(() => {
    if (!isOpen) return undefined;
    const previous =
      typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null;
    const panel = panelRef.current;
    (inputRef.current ?? panel)?.focus({ preventScroll: true });
    return () => {
      if (!returnFocusRef.current || !previous || previous === document.body) return;
      if (!previous.isConnected || typeof previous.focus !== "function") return;
      const active = document.activeElement;
      const focusLost = !active || active === document.body || (panel != null && panel.contains(active));
      if (focusLost) previous.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    acquireBodyScrollLock();
    return () => releaseBodyScrollLock();
  }, [isOpen]);

  // Escape closes — top layer only, so one press closes one layer.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented || e.isComposing) return;
      if (!isTopLayer(layerId)) return;
      e.preventDefault();
      e.stopPropagation();
      setOpenRef.current(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, layerId]);

  // Deferred onSelect: runs after the commit that closed the palette (after focus restore + layer pop).
  useEffect(() => {
    const item = pendingSelectRef.current;
    if (!item) return;
    pendingSelectRef.current = null;
    item.onSelect(item);
  }, [selectTick]);

  // ── handlers ─────────────────────────────────────────────────────────────
  const selectOption = (option: CommandOption | undefined) => {
    if (!option || option.item.disabled) return;
    if (closeOnSelect) {
      pendingSelectRef.current = option.item;
      setSelectTick((n) => n + 1);
      setOpen(false);
    } else {
      option.item.onSelect(option.item);
    }
  };

  const moveActive = (to: "next" | "prev" | "first" | "last") => {
    const count = enabledOptions.length;
    if (count === 0) return;
    const current = activeOption ? enabledOptions.indexOf(activeOption) : -1;
    let index = 0;
    if (to === "first") index = 0;
    else if (to === "last") index = count - 1;
    else if (to === "next") index = current < 0 ? 0 : (current + 1) % count;
    else index = current < 0 ? count - 1 : (current - 1 + count) % count;
    setActiveKey(enabledOptions[index].key);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
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
        if (!plain || enabledOptions.length === 0) return;
        e.preventDefault();
        moveActive("first");
        break;
      case "End":
        if (!plain || enabledOptions.length === 0) return;
        e.preventDefault();
        moveActive("last");
        break;
      case "Enter":
        if (!activeOption) return;
        e.preventDefault();
        selectOption(activeOption);
        break;
      default:
        break;
    }
  };

  if (!isOpen || typeof document === "undefined") return null;

  const hasOptions = options.length > 0;
  const showEmpty = !hasOptions && !isLoading;

  return createPortal(
    <OverlayLayerContext.Provider value={layerId}>
      <div
        className="ds-command-palette-root"
        onFocusCapture={(e) => {
          ownedFocusTargetRef.current = e.target;
        }}
      >
        <div
          className="ds-command-palette__backdrop"
          aria-hidden="true"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            if (isTopLayer(layerId)) setOpen(false);
          }}
        />
        <div
          ref={setPanelRef}
          id={baseId}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          tabIndex={-1}
          className={["ds-command-palette", className].filter(Boolean).join(" ")}
          onKeyDown={(e) => {
            if (panelRef.current) trapTabKey(e.nativeEvent, panelRef.current);
          }}
        >
          <div className="ds-command-palette__search">
            <span className="ds-command-palette__search-icon">
              <SearchGlyph />
            </span>
            <input
              ref={inputRef}
              id={inputId}
              className="ds-command-palette__input"
              type="text"
              role="combobox"
              aria-label={inputLabel}
              aria-expanded={hasOptions}
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={activeDomId}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="go"
              placeholder={placeholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveKey(null);
              }}
              onKeyDown={handleInputKeyDown}
            />
            <button
              type="button"
              className="ds-command-palette__close"
              aria-label={closeLabel}
              onClick={() => setOpen(false)}
            >
              <CloseGlyph />
            </button>
          </div>

          <div className="ds-command-palette__body">
            <div
              ref={listboxRef}
              id={listboxId}
              role="listbox"
              aria-label={listLabel}
              aria-busy={isLoading || undefined}
              className="ds-command-palette__list"
              hidden={!hasOptions}
            >
              {rankedGroups.map(({ group, options: groupOptions }, groupIndex) => {
                const headingId = `${baseId}-group-${groupIndex}-${toDomId(group.id)}`;
                return (
                  <div
                    key={`${groupIndex}-${group.id}`}
                    role="group"
                    aria-labelledby={headingId}
                    className="ds-command-palette__group"
                  >
                    <div role="presentation" id={headingId} className="ds-command-palette__group-label">
                      {group.label}
                    </div>
                    {groupOptions.map((option) => {
                      const { item } = option;
                      const active = activeOption?.key === option.key;
                      return (
                        <div
                          key={option.key}
                          id={optionDomId(option.key)}
                          role="option"
                          aria-selected={active}
                          aria-disabled={item.disabled ? true : undefined}
                          aria-keyshortcuts={
                            item.shortcut && item.shortcut.length > 0
                              ? toAriaKeyShortcuts(item.shortcut, isMac)
                              : undefined
                          }
                          data-active={active ? "true" : undefined}
                          className="ds-command-palette__option"
                          onMouseDown={(e) => e.preventDefault()}
                          onMouseMove={() => {
                            if (!item.disabled && !active) setActiveKey(option.key);
                          }}
                          onClick={() => selectOption(option)}
                        >
                          {item.icon != null ? (
                            <span className="ds-command-palette__option-icon" aria-hidden="true">
                              {item.icon}
                            </span>
                          ) : null}
                          <span className="ds-command-palette__option-text">
                            <span className="ds-command-palette__option-label">{item.label}</span>
                            {item.description ? (
                              <span className="ds-command-palette__option-description">
                                {item.description}
                              </span>
                            ) : null}
                          </span>
                          {item.shortcut && item.shortcut.length > 0 ? (
                            <Kbd keys={item.shortcut} className="ds-command-palette__option-kbd" aria-hidden="true" />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {isLoading ? (
              <div className="ds-command-palette__loading" aria-hidden="true">
                <Spinner size="xs" tone="muted" decorative />
                <span>{loadingLabel}</span>
              </div>
            ) : null}

            {showEmpty ? <div className="ds-command-palette__empty">{emptyState}</div> : null}
          </div>

          {showFooter ? (
            <div className="ds-command-palette__footer" aria-hidden="true">
              <span className="ds-command-palette__hint">
                <Kbd keys={["up"]} />
                <Kbd keys={["down"]} />
                <span>to navigate</span>
              </span>
              <span className="ds-command-palette__hint">
                <Kbd keys={["enter"]} />
                <span>to select</span>
              </span>
              <span className="ds-command-palette__hint">
                <Kbd keys={["esc"]} />
                <span>to close</span>
              </span>
            </div>
          ) : null}

          <div className="ds-command-palette__sr" role="status" aria-live="polite" aria-atomic="true">
            {announcement}
          </div>
        </div>
      </div>
    </OverlayLayerContext.Provider>,
    document.body,
  );
});

CommandPalette.displayName = "CommandPalette";

export default CommandPalette;
export { CommandPalette };
export {
  scoreItem,
  rankGroups,
  normalizeText,
  matchesHotkey,
  isEditableTarget,
} from "./CommandPalette.utils";
export type {
  CommandPaletteProps,
  CommandGroup,
  CommandItem,
  CommandOption,
  CommandSearchContext,
  RankedGroup,
} from "./CommandPalette.types";
