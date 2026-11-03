"use client";

import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import InputSearch from "../../atoms/TextInputSearch";
import Select from "../../atoms/Select";
import Checkbox from "../../atoms/Checkbox";
import Badge from "../../atoms/Badge";
import Button from "../../atoms/Button";
import Combobox from "../Combobox";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { FILTER_BAR_COLLAPSE_QUERY, FILTER_BAR_DEFAULTS, FILTER_BAR_LABELS } from "./FilterBar.config";
import type { FilterBarFilter, FilterBarFilterValue, FilterBarLabels, FilterBarProps } from "./FilterBar.types";
import {
  countActiveFilters,
  getActiveChips,
  hasActiveFilterValue,
  removeFilterValue,
  setFilterValue,
  toValueList,
} from "./FilterBar.utils";
import "./FilterBar.css";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** Local media-query hook (no `ui-common-hooks` dependency). Starts `false` so SSR and first paint agree. */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia(query);
    const update = () => setMatches(Boolean(mql.matches));
    update();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    mql.addListener?.(update);
    return () => mql.removeListener?.(update);
  }, [query]);
  return matches;
}

function FilterIcon() {
  return (
    <svg className="ds-filter-bar__more-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path d="M3 5h14M6 10h8M8.5 15h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * FilterBar — search + filter controls + active-filter chips for list and table pages.
 * Fully controlled (`value` / `onChange`); search is debounced locally.
 */
export const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(function FilterBar(
  {
    value,
    onChange,
    filters = [],
    searchable = FILTER_BAR_DEFAULTS.searchable,
    searchPlaceholder = FILTER_BAR_DEFAULTS.searchPlaceholder,
    searchDebounceMs = FILTER_BAR_DEFAULTS.searchDebounceMs,
    resultCount,
    extra,
    maxInlineFilters = FILTER_BAR_DEFAULTS.maxInlineFilters,
    moreFilters = FILTER_BAR_DEFAULTS.moreFilters,
    showLabels = FILTER_BAR_DEFAULTS.showLabels,
    labels: labelsProp,
    className,
    ...rest
  },
  ref,
) {
  const labels: FilterBarLabels = { ...FILTER_BAR_LABELS, ...labelsProp };
  const base = useId().replace(/:/g, "");
  const searchId = `ds-filter-bar-search-${base}`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chipsRef = useRef<HTMLUListElement | null>(null);
  const narrow = useMediaQuery(FILTER_BAR_COLLAPSE_QUERY);
  const [moreOpen, setMoreOpen] = useState(false);

  // Latest props for timers / callbacks without re-creating them.
  const valueRef = useRef(value);
  valueRef.current = value;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // ---- Debounced search -------------------------------------------------------------------
  const [draft, setDraft] = useState(value.search ?? "");
  const lastCommitted = useRef(value.search ?? "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  // Sync external search changes (e.g. parent reset) into the draft.
  useEffect(() => {
    const external = value.search ?? "";
    if (external !== lastCommitted.current) {
      lastCommitted.current = external;
      clearTimer();
      setDraft(external);
    }
  }, [value.search, clearTimer]);

  const commitSearch = useCallback(
    (text: string) => {
      clearTimer();
      lastCommitted.current = text;
      if (text === (valueRef.current.search ?? "")) return;
      onChangeRef.current({ ...valueRef.current, search: text });
    },
    [clearTimer],
  );

  const handleDraft = (text: string) => {
    setDraft(text);
    clearTimer();
    if (text === "" || searchDebounceMs <= 0) {
      commitSearch(text);
      return;
    }
    timerRef.current = setTimeout(() => commitSearch(text), searchDebounceMs);
  };

  // ---- Filters ------------------------------------------------------------------------------
  const setFilter = (id: string, next: FilterBarFilterValue) => {
    const current = valueRef.current;
    onChangeRef.current({ ...current, filters: setFilterValue(current.filters ?? {}, id, next) });
  };

  const chips = getActiveChips(filters, value);
  const anyActive = hasActiveFilterValue({ ...value, search: draft });

  // Focus management after a chip disappears: next chip → previous chip → search → root.
  const [pendingChipFocus, setPendingChipFocus] = useState<number | null>(null);
  useLayoutEffect(() => {
    if (pendingChipFocus === null) return;
    const buttons = chipsRef.current?.querySelectorAll<HTMLButtonElement>(".ds-badge__dismiss");
    const target =
      (buttons && buttons.length > 0 ? buttons[Math.min(pendingChipFocus, buttons.length - 1)] : null) ??
      (document.getElementById(searchId) as HTMLElement | null) ??
      rootRef.current;
    target?.focus();
    setPendingChipFocus(null);
  }, [pendingChipFocus, searchId]);

  const dismissChip = (index: number) => {
    const chip = chips[index];
    const filter = filters.find((f) => f.id === chip.filterId);
    if (!filter) return;
    const current = valueRef.current;
    onChangeRef.current({ ...current, filters: removeFilterValue(current.filters ?? {}, filter, chip.value) });
    setPendingChipFocus(index);
  };

  const clearAll = () => {
    clearTimer();
    setDraft("");
    lastCommitted.current = "";
    onChangeRef.current({ ...valueRef.current, search: searchable ? "" : valueRef.current.search, filters: {} });
    // "Clear all" unmounts itself — move focus somewhere stable.
    setPendingChipFocus(0);
  };

  const setRootRef = (el: HTMLDivElement | null) => {
    rootRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  // ---- Focus across the 768px collapse --------------------------------------------------------
  // Crossing the breakpoint unmounts inline filters (collapse) or the "Filters" trigger (expand).
  // Remember where focus was inside the bar and move it to the equivalent control afterwards.
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const lastFocus = useRef<{ kind: "filter"; id: string } | { kind: "trigger" } | null>(null);
  const restoreFilterId = useRef<string | null>(null);

  const trackFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (triggerRef.current && triggerRef.current.contains(target)) {
      lastFocus.current = { kind: "trigger" };
      return;
    }
    const id = target.closest<HTMLElement>("[data-filter-id]")?.dataset.filterId;
    lastFocus.current = id ? { kind: "filter", id } : null;
    if (id) restoreFilterId.current = null;
  };

  const trackBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Only forget when focus really moved elsewhere (unmounting the focused node gives no relatedTarget).
    const next = e.relatedTarget as Node | null;
    if (next && !rootRef.current?.contains(next)) lastFocus.current = null;
  };

  const prevNarrow = useRef(narrow);
  useLayoutEffect(() => {
    if (prevNarrow.current === narrow) return;
    prevNarrow.current = narrow;
    const root = rootRef.current;
    const active = document.activeElement;
    const focusLost = !active || active === document.body || !root?.contains(active);
    const last = lastFocus.current;
    if (narrow && last?.kind === "filter" && focusLost) {
      restoreFilterId.current = last.id;
      triggerRef.current?.focus();
    } else if (!narrow && last?.kind === "trigger" && (focusLost || active === triggerRef.current)) {
      const id = restoreFilterId.current;
      const scopes = Array.from(root?.querySelectorAll<HTMLElement>("[data-filter-id]") ?? []);
      const scope = scopes.find((el) => el.dataset.filterId === id) ?? scopes[0];
      const control = scope?.querySelector<HTMLElement>("select, button, input");
      if (control) {
        control.focus();
        restoreFilterId.current = null;
      }
    }
  }, [narrow]);

  // ---- Layout: inline vs. overflow ----------------------------------------------------------
  const maxInline = Math.max(0, Math.floor(maxInlineFilters));
  const inlineFilters = !moreFilters ? filters : narrow ? [] : filters.slice(0, maxInline);
  const overflowFilters = !moreFilters ? [] : narrow ? filters : filters.slice(maxInline);
  const overflowActive = countActiveFilters(overflowFilters, value);
  const triggerText = inlineFilters.length === 0 ? labels.filters : labels.moreFilters;

  const renderSelect = (f: FilterBarFilter, visibleLabel: boolean) => (
    <Select
      id={`ds-filter-bar-${base}-${f.id}`}
      label={visibleLabel ? f.label : undefined}
      aria-label={visibleLabel ? undefined : f.label}
      size="md"
      fullWidth
      animatedChevron={false}
      placeholder={f.placeholder ?? `${f.label}: All`}
      allowPlaceholderSelection
      options={f.options}
      value={toValueList(value.filters[f.id])[0] ?? ""}
      onValueChange={(v) => setFilter(f.id, v)}
    />
  );

  const renderInline = (f: FilterBarFilter) => (
    <div key={f.id} className="ds-filter-bar__control" data-type={f.type} data-filter-id={f.id}>
      {f.type === "multi" ? (
        <Combobox
          multiple
          size="md"
          // Always labelled (accessible name = label, not the placeholder); the label is visually
          // hidden by FilterBar.css unless `showLabels`.
          label={f.label}
          placeholder={f.placeholder ?? `${f.label}: All`}
          searchable={f.searchable}
          options={f.options}
          value={toValueList(value.filters[f.id])}
          onValueChange={(v) => setFilter(f.id, Array.isArray(v) ? v : [v])}
        />
      ) : (
        renderSelect(f, showLabels)
      )}
    </div>
  );

  // Inside the popover multi filters are checkbox groups: a nested Combobox popover would portal
  // outside this panel, and the outer Popover's outside-click handler would close the panel.
  const renderOverflow = (f: FilterBarFilter) =>
    f.type === "multi" ? (
      <fieldset key={f.id} className="ds-filter-bar__fieldset">
        <legend className="ds-filter-bar__legend">{f.label}</legend>
        <div className="ds-filter-bar__checks">
          {f.options.map((o) => {
            const selected = toValueList(value.filters[f.id]);
            const checked = selected.includes(o.value);
            return (
              <Checkbox
                key={o.value}
                id={`ds-filter-bar-${base}-${f.id}-${o.value}`}
                name={`ds-filter-bar-${base}-${f.id}`}
                value={o.value}
                label={o.label}
                checked={checked}
                disabled={o.disabled}
                onChange={() =>
                  setFilter(f.id, checked ? selected.filter((v) => v !== o.value) : [...selected, o.value])
                }
              />
            );
          })}
        </div>
      </fieldset>
    ) : (
      <div key={f.id} className="ds-filter-bar__panel-field">
        {renderSelect(f, true)}
      </div>
    );

  return (
    <div
      ref={setRootRef}
      role="group"
      aria-label={labels.group}
      tabIndex={-1}
      className={cls("ds-filter-bar", className)}
      data-narrow={narrow ? "true" : "false"}
      data-show-labels={showLabels ? "true" : "false"}
      onFocus={trackFocus}
      onBlur={trackBlur}
      {...rest}
    >
      <div className="ds-filter-bar__row">
        {searchable ? (
          <div className="ds-filter-bar__search">
            <InputSearch
              id={searchId}
              ariaLabel={labels.search}
              placeholder={searchPlaceholder}
              value={draft}
              onChange={handleDraft}
              onSearch={(text) => commitSearch(text)}
              showClearButton
              size="md"
              fullWidth
            />
          </div>
        ) : null}

        {inlineFilters.length > 0 || overflowFilters.length > 0 ? (
          <div className="ds-filter-bar__filters">
            {inlineFilters.map(renderInline)}
            {overflowFilters.length > 0 ? (
              <Popover open={moreOpen} onOpenChange={setMoreOpen} placement="bottom-end">
                <PopoverTrigger ref={triggerRef} className="ds-filter-bar__more" data-active={overflowActive > 0 ? "true" : undefined}>
                  <FilterIcon />
                  <span>{triggerText}</span>
                  {overflowActive > 0 ? (
                    <span className="ds-filter-bar__more-count" aria-hidden="true">
                      {overflowActive}
                    </span>
                  ) : null}
                  <span className="visually-hidden">{labels.activeInOverflow(overflowActive)}</span>
                </PopoverTrigger>
                <PopoverContent showPointer={false} className="ds-filter-bar__panel">
                  <div className="ds-filter-bar__panel-body">{overflowFilters.map(renderOverflow)}</div>
                  <div className="ds-filter-bar__panel-footer">
                    <Button type="button" variant="outlineSecondary" size="md" onClick={() => setMoreOpen(false)}>
                      {labels.done}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}
          </div>
        ) : null}

        {extra ? <div className="ds-filter-bar__extra">{extra}</div> : null}
      </div>

      {chips.length > 0 || anyActive ? (
        <div className="ds-filter-bar__summary">
          {chips.length > 0 ? (
            <ul ref={chipsRef} className="ds-filter-bar__chips" aria-label={labels.activeFilters}>
              {chips.map((chip, i) => (
                <li key={`${chip.filterId}-${chip.value}`} className="ds-filter-bar__chip">
                  <Badge
                    shape="pill"
                    size="md"
                    variant="neutral"
                    tone="soft"
                    onDismiss={() => dismissChip(i)}
                    dismissLabel={labels.removeFilter(chip.filterLabel, chip.optionLabel)}
                  >
                    {chip.filterLabel}: {chip.optionLabel}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}
          {anyActive ? (
            <Button type="button" variant="ghost" size="md" className="ds-filter-bar__clear" onClick={clearAll}>
              {labels.clearAll}
            </Button>
          ) : null}
        </div>
      ) : null}

      {/* Always mounted so assistive tech hears changes, not the initial value. */}
      <p className="ds-filter-bar__count" aria-live="polite" aria-atomic="true">
        {typeof resultCount === "number" ? labels.resultCount(resultCount) : ""}
      </p>
    </div>
  );
});

FilterBar.displayName = "FilterBar";

export default FilterBar;
export type {
  FilterBarProps,
  FilterBarFilter,
  FilterBarFilterType,
  FilterBarFilterValue,
  FilterBarOption,
  FilterBarValue,
  FilterBarLabels,
} from "./FilterBar.types";
export { hasActiveFilterValue, getActiveChips } from "./FilterBar.utils";
