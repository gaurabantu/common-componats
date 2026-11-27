/* ucs:component-css */
import "./styles/components/molecules/FilterBar/FilterBar.css";
import {
  Combobox_default
} from "./chunk-WQFF77HQ.mjs";
import {
  Badge_default
} from "./chunk-NPBIA77B.mjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "./chunk-UP5YH5MZ.mjs";
import {
  Checkbox_default
} from "./chunk-3P5PIN4K.mjs";
import {
  Select_default
} from "./chunk-EZBNIZ3O.mjs";
import {
  TextInputSearch_default
} from "./chunk-ZSF56B3K.mjs";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";

// src/components/molecules/FilterBar/index.tsx
import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

// src/components/molecules/FilterBar/FilterBar.config.ts
var FILTER_BAR_DEFAULTS = {
  searchable: true,
  searchPlaceholder: "Search\u2026",
  searchDebounceMs: 250,
  maxInlineFilters: 3,
  moreFilters: true,
  showLabels: false
};
var FILTER_BAR_COLLAPSE_QUERY = "(max-width: 768px)";
var FILTER_BAR_LABELS = {
  group: "Filters",
  search: "Search",
  clearAll: "Clear all",
  moreFilters: "More filters",
  filters: "Filters",
  activeInOverflow: (count) => count > 0 ? `, ${count} active` : "",
  activeFilters: "Active filters",
  removeFilter: (filterLabel, optionLabel) => `Remove filter ${filterLabel}: ${optionLabel}`,
  resultCount: (count) => count === 1 ? "1 result" : `${count} results`,
  done: "Done"
};

// src/components/molecules/FilterBar/FilterBar.utils.ts
function toValueList(value) {
  if (Array.isArray(value))
    return value.filter((v) => v !== "");
  return value ? [value] : [];
}
function isFilterActive(value) {
  return toValueList(value).length > 0;
}
function countActiveFilters(filters, value) {
  return filters.reduce((n, f) => n + (isFilterActive(value.filters[f.id]) ? 1 : 0), 0);
}
function hasActiveFilterValue(value) {
  var _a, _b;
  if (!value)
    return false;
  if (((_a = value.search) != null ? _a : "").trim() !== "")
    return true;
  return Object.values((_b = value.filters) != null ? _b : {}).some(isFilterActive);
}
function getActiveChips(filters, value) {
  return filters.flatMap(
    (f) => toValueList(value.filters[f.id]).map((v) => {
      var _a, _b;
      return {
        filterId: f.id,
        filterLabel: f.label,
        value: v,
        optionLabel: (_b = (_a = f.options.find((o) => o.value === v)) == null ? void 0 : _a.label) != null ? _b : v
      };
    })
  );
}
function setFilterValue(filters, id, next) {
  const out = { ...filters };
  if (isFilterActive(next))
    out[id] = next;
  else
    delete out[id];
  return out;
}
function removeFilterValue(filters, filter, value) {
  if (filter.type === "multi") {
    return setFilterValue(filters, filter.id, toValueList(filters[filter.id]).filter((v) => v !== value));
  }
  return setFilterValue(filters, filter.id, "");
}

// src/components/molecules/FilterBar/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    var _a;
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return;
    const mql = window.matchMedia(query);
    const update = () => setMatches(Boolean(mql.matches));
    update();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    (_a = mql.addListener) == null ? void 0 : _a.call(mql, update);
    return () => {
      var _a2;
      return (_a2 = mql.removeListener) == null ? void 0 : _a2.call(mql, update);
    };
  }, [query]);
  return matches;
}
function FilterIcon() {
  return /* @__PURE__ */ jsx("svg", { className: "ds-filter-bar__more-icon", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ jsx("path", { d: "M3 5h14M6 10h8M8.5 15h3", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }) });
}
var FilterBar = React.forwardRef(function FilterBar2({
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
}, ref) {
  var _a, _b;
  const labels = { ...FILTER_BAR_LABELS, ...labelsProp };
  const base = useId().replace(/:/g, "");
  const searchId = `ds-filter-bar-search-${base}`;
  const rootRef = useRef(null);
  const chipsRef = useRef(null);
  const narrow = useMediaQuery(FILTER_BAR_COLLAPSE_QUERY);
  const [moreOpen, setMoreOpen] = useState(false);
  const valueRef = useRef(value);
  valueRef.current = value;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const [draft, setDraft] = useState((_a = value.search) != null ? _a : "");
  const lastCommitted = useRef((_b = value.search) != null ? _b : "");
  const timerRef = useRef(null);
  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);
  useEffect(() => clearTimer, [clearTimer]);
  useEffect(() => {
    var _a2;
    const external = (_a2 = value.search) != null ? _a2 : "";
    if (external !== lastCommitted.current) {
      lastCommitted.current = external;
      clearTimer();
      setDraft(external);
    }
  }, [value.search, clearTimer]);
  const commitSearch = useCallback(
    (text) => {
      var _a2;
      clearTimer();
      lastCommitted.current = text;
      if (text === ((_a2 = valueRef.current.search) != null ? _a2 : ""))
        return;
      onChangeRef.current({ ...valueRef.current, search: text });
    },
    [clearTimer]
  );
  const handleDraft = (text) => {
    setDraft(text);
    clearTimer();
    if (text === "" || searchDebounceMs <= 0) {
      commitSearch(text);
      return;
    }
    timerRef.current = setTimeout(() => commitSearch(text), searchDebounceMs);
  };
  const setFilter = (id, next) => {
    var _a2;
    const current = valueRef.current;
    onChangeRef.current({ ...current, filters: setFilterValue((_a2 = current.filters) != null ? _a2 : {}, id, next) });
  };
  const chips = getActiveChips(filters, value);
  const anyActive = hasActiveFilterValue({ ...value, search: draft });
  const [pendingChipFocus, setPendingChipFocus] = useState(null);
  useLayoutEffect(() => {
    var _a2, _b2, _c;
    if (pendingChipFocus === null)
      return;
    const buttons = (_a2 = chipsRef.current) == null ? void 0 : _a2.querySelectorAll(".ds-badge__dismiss");
    const target = (_c = (_b2 = buttons && buttons.length > 0 ? buttons[Math.min(pendingChipFocus, buttons.length - 1)] : null) != null ? _b2 : document.getElementById(searchId)) != null ? _c : rootRef.current;
    target == null ? void 0 : target.focus();
    setPendingChipFocus(null);
  }, [pendingChipFocus, searchId]);
  const dismissChip = (index) => {
    var _a2;
    const chip = chips[index];
    const filter = filters.find((f) => f.id === chip.filterId);
    if (!filter)
      return;
    const current = valueRef.current;
    onChangeRef.current({ ...current, filters: removeFilterValue((_a2 = current.filters) != null ? _a2 : {}, filter, chip.value) });
    setPendingChipFocus(index);
  };
  const clearAll = () => {
    clearTimer();
    setDraft("");
    lastCommitted.current = "";
    onChangeRef.current({ ...valueRef.current, search: searchable ? "" : valueRef.current.search, filters: {} });
    setPendingChipFocus(0);
  };
  const setRootRef = (el) => {
    rootRef.current = el;
    if (typeof ref === "function")
      ref(el);
    else if (ref)
      ref.current = el;
  };
  const triggerRef = useRef(null);
  const lastFocus = useRef(null);
  const restoreFilterId = useRef(null);
  const trackFocus = (e) => {
    var _a2;
    const target = e.target;
    if (triggerRef.current && triggerRef.current.contains(target)) {
      lastFocus.current = { kind: "trigger" };
      return;
    }
    const id = (_a2 = target.closest("[data-filter-id]")) == null ? void 0 : _a2.dataset.filterId;
    lastFocus.current = id ? { kind: "filter", id } : null;
    if (id)
      restoreFilterId.current = null;
  };
  const trackBlur = (e) => {
    var _a2;
    const next = e.relatedTarget;
    if (next && !((_a2 = rootRef.current) == null ? void 0 : _a2.contains(next)))
      lastFocus.current = null;
  };
  const prevNarrow = useRef(narrow);
  useLayoutEffect(() => {
    var _a2, _b2, _c;
    if (prevNarrow.current === narrow)
      return;
    prevNarrow.current = narrow;
    const root = rootRef.current;
    const active = document.activeElement;
    const focusLost = !active || active === document.body || !(root == null ? void 0 : root.contains(active));
    const last = lastFocus.current;
    if (narrow && (last == null ? void 0 : last.kind) === "filter" && focusLost) {
      restoreFilterId.current = last.id;
      (_a2 = triggerRef.current) == null ? void 0 : _a2.focus();
    } else if (!narrow && (last == null ? void 0 : last.kind) === "trigger" && (focusLost || active === triggerRef.current)) {
      const id = restoreFilterId.current;
      const scopes = Array.from((_b2 = root == null ? void 0 : root.querySelectorAll("[data-filter-id]")) != null ? _b2 : []);
      const scope = (_c = scopes.find((el) => el.dataset.filterId === id)) != null ? _c : scopes[0];
      const control = scope == null ? void 0 : scope.querySelector("select, button, input");
      if (control) {
        control.focus();
        restoreFilterId.current = null;
      }
    }
  }, [narrow]);
  const maxInline = Math.max(0, Math.floor(maxInlineFilters));
  const inlineFilters = !moreFilters ? filters : narrow ? [] : filters.slice(0, maxInline);
  const overflowFilters = !moreFilters ? [] : narrow ? filters : filters.slice(maxInline);
  const overflowActive = countActiveFilters(overflowFilters, value);
  const triggerText = inlineFilters.length === 0 ? labels.filters : labels.moreFilters;
  const renderSelect = (f, visibleLabel) => {
    var _a2, _b2;
    return /* @__PURE__ */ jsx(
      Select_default,
      {
        id: `ds-filter-bar-${base}-${f.id}`,
        label: visibleLabel ? f.label : void 0,
        "aria-label": visibleLabel ? void 0 : f.label,
        size: "md",
        fullWidth: true,
        animatedChevron: false,
        placeholder: (_a2 = f.placeholder) != null ? _a2 : `${f.label}: All`,
        allowPlaceholderSelection: true,
        options: f.options,
        value: (_b2 = toValueList(value.filters[f.id])[0]) != null ? _b2 : "",
        onValueChange: (v) => setFilter(f.id, v)
      }
    );
  };
  const renderInline = (f) => {
    var _a2;
    return /* @__PURE__ */ jsx("div", { className: "ds-filter-bar__control", "data-type": f.type, "data-filter-id": f.id, children: f.type === "multi" ? /* @__PURE__ */ jsx(
      Combobox_default,
      {
        multiple: true,
        size: "md",
        label: f.label,
        placeholder: (_a2 = f.placeholder) != null ? _a2 : `${f.label}: All`,
        searchable: f.searchable,
        options: f.options,
        value: toValueList(value.filters[f.id]),
        onValueChange: (v) => setFilter(f.id, Array.isArray(v) ? v : [v])
      }
    ) : renderSelect(f, showLabels) }, f.id);
  };
  const renderOverflow = (f) => f.type === "multi" ? /* @__PURE__ */ jsxs("fieldset", { className: "ds-filter-bar__fieldset", children: [
    /* @__PURE__ */ jsx("legend", { className: "ds-filter-bar__legend", children: f.label }),
    /* @__PURE__ */ jsx("div", { className: "ds-filter-bar__checks", children: f.options.map((o) => {
      const selected = toValueList(value.filters[f.id]);
      const checked = selected.includes(o.value);
      return /* @__PURE__ */ jsx(
        Checkbox_default,
        {
          id: `ds-filter-bar-${base}-${f.id}-${o.value}`,
          name: `ds-filter-bar-${base}-${f.id}`,
          value: o.value,
          label: o.label,
          checked,
          disabled: o.disabled,
          onChange: () => setFilter(f.id, checked ? selected.filter((v) => v !== o.value) : [...selected, o.value])
        },
        o.value
      );
    }) })
  ] }, f.id) : /* @__PURE__ */ jsx("div", { className: "ds-filter-bar__panel-field", children: renderSelect(f, true) }, f.id);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setRootRef,
      role: "group",
      "aria-label": labels.group,
      tabIndex: -1,
      className: cls("ds-filter-bar", className),
      "data-narrow": narrow ? "true" : "false",
      "data-show-labels": showLabels ? "true" : "false",
      onFocus: trackFocus,
      onBlur: trackBlur,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "ds-filter-bar__row", children: [
          searchable ? /* @__PURE__ */ jsx("div", { className: "ds-filter-bar__search", children: /* @__PURE__ */ jsx(
            TextInputSearch_default,
            {
              id: searchId,
              ariaLabel: labels.search,
              placeholder: searchPlaceholder,
              value: draft,
              onChange: handleDraft,
              onSearch: (text) => commitSearch(text),
              showClearButton: true,
              size: "md",
              fullWidth: true
            }
          ) }) : null,
          inlineFilters.length > 0 || overflowFilters.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "ds-filter-bar__filters", children: [
            inlineFilters.map(renderInline),
            overflowFilters.length > 0 ? /* @__PURE__ */ jsxs(Popover, { open: moreOpen, onOpenChange: setMoreOpen, placement: "bottom-end", children: [
              /* @__PURE__ */ jsxs(PopoverTrigger, { ref: triggerRef, className: "ds-filter-bar__more", "data-active": overflowActive > 0 ? "true" : void 0, children: [
                /* @__PURE__ */ jsx(FilterIcon, {}),
                /* @__PURE__ */ jsx("span", { children: triggerText }),
                overflowActive > 0 ? /* @__PURE__ */ jsx("span", { className: "ds-filter-bar__more-count", "aria-hidden": "true", children: overflowActive }) : null,
                /* @__PURE__ */ jsx("span", { className: "visually-hidden", children: labels.activeInOverflow(overflowActive) })
              ] }),
              /* @__PURE__ */ jsxs(PopoverContent, { showPointer: false, className: "ds-filter-bar__panel", children: [
                /* @__PURE__ */ jsx("div", { className: "ds-filter-bar__panel-body", children: overflowFilters.map(renderOverflow) }),
                /* @__PURE__ */ jsx("div", { className: "ds-filter-bar__panel-footer", children: /* @__PURE__ */ jsx(Button_default, { type: "button", variant: "outlineSecondary", size: "md", onClick: () => setMoreOpen(false), children: labels.done }) })
              ] })
            ] }) : null
          ] }) : null,
          extra ? /* @__PURE__ */ jsx("div", { className: "ds-filter-bar__extra", children: extra }) : null
        ] }),
        chips.length > 0 || anyActive ? /* @__PURE__ */ jsxs("div", { className: "ds-filter-bar__summary", children: [
          chips.length > 0 ? /* @__PURE__ */ jsx("ul", { ref: chipsRef, className: "ds-filter-bar__chips", "aria-label": labels.activeFilters, children: chips.map((chip, i) => /* @__PURE__ */ jsx("li", { className: "ds-filter-bar__chip", children: /* @__PURE__ */ jsxs(
            Badge_default,
            {
              shape: "pill",
              size: "md",
              variant: "neutral",
              tone: "soft",
              onDismiss: () => dismissChip(i),
              dismissLabel: labels.removeFilter(chip.filterLabel, chip.optionLabel),
              children: [
                chip.filterLabel,
                ": ",
                chip.optionLabel
              ]
            }
          ) }, `${chip.filterId}-${chip.value}`)) }) : null,
          anyActive ? /* @__PURE__ */ jsx(Button_default, { type: "button", variant: "ghost", size: "md", className: "ds-filter-bar__clear", onClick: clearAll, children: labels.clearAll }) : null
        ] }) : null,
        /* @__PURE__ */ jsx("p", { className: "ds-filter-bar__count", "aria-live": "polite", "aria-atomic": "true", children: typeof resultCount === "number" ? labels.resultCount(resultCount) : "" })
      ]
    }
  );
});
FilterBar.displayName = "FilterBar";
var FilterBar_default = FilterBar;

export {
  toValueList,
  hasActiveFilterValue,
  getActiveChips,
  FilterBar,
  FilterBar_default
};
//# sourceMappingURL=chunk-2UEEGNXO.mjs.map