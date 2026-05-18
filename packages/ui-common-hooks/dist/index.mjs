// src/useLatest.ts
import { useLayoutEffect, useRef } from "react";
function useLatest(value) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

// src/useDebounceClick.ts
import { useCallback, useRef as useRef2, useState } from "react";
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value && typeof value.then === "function";
}
function useDebounceClick(handler, options) {
  var _a;
  const handlerRef = useLatest(handler);
  const cooldownRef = useLatest((_a = options == null ? void 0 : options.syncCooldownMs) != null ? _a : 0);
  const mutexRef = useRef2(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const run = useCallback((...args) => {
    if (mutexRef.current)
      return;
    mutexRef.current = true;
    setIsProcessing(true);
    const releaseSoon = () => {
      mutexRef.current = false;
      setIsProcessing(false);
    };
    const releaseAfterCooldown = () => {
      const ms = cooldownRef.current;
      if (typeof ms === "number" && ms > 0) {
        window.setTimeout(releaseSoon, ms);
      } else {
        releaseSoon();
      }
    };
    try {
      const result = handlerRef.current(...args);
      if (isPromiseLike(result)) {
        void result.then(() => releaseSoon()).catch(() => releaseSoon());
        return;
      }
      releaseAfterCooldown();
    } catch (e) {
      releaseSoon();
    }
  }, [handlerRef, cooldownRef]);
  return [run, isProcessing];
}

// src/useAsyncData.ts
import { useEffect, useState as useState2 } from "react";
function isAbortError(err) {
  if (err instanceof DOMException && err.name === "AbortError")
    return true;
  if (typeof err === "object" && err !== null && "name" in err && err.name === "AbortError")
    return true;
  return false;
}
function useAsyncData(key, fetcher, options) {
  var _a;
  const enabled = (_a = options == null ? void 0 : options.enabled) != null ? _a : true;
  const [data, setData] = useState2();
  const [loading, setLoading] = useState2(false);
  const [error, setError] = useState2();
  const fetcherRef = useLatest(fetcher);
  useEffect(() => {
    if (!enabled || key === null || key === void 0) {
      setLoading(false);
      return;
    }
    const abort = new AbortController();
    setLoading(true);
    setError(void 0);
    fetcherRef.current(abort.signal).then((result) => {
      if (abort.signal.aborted)
        return;
      setData(result);
      setError(void 0);
    }).catch((err) => {
      if (abort.signal.aborted)
        return;
      if (isAbortError(err))
        return;
      setError(err instanceof Error ? err : new Error(String(err)));
    }).finally(() => {
      if (!abort.signal.aborted)
        setLoading(false);
    });
    return () => abort.abort();
  }, [key, enabled, fetcherRef]);
  return { data, loading, error };
}

// src/useLongPress.ts
import { useMemo, useRef as useRef3 } from "react";
var initialPressState = () => ({
  timerId: null,
  startX: 0,
  startY: 0,
  activePointerId: null
});
function useLongPress(options) {
  const { ms = 500, moveThreshold = 10 } = options;
  const onLongPressRef = useLatest(options.onLongPress);
  const state = useRef3(initialPressState());
  const clearTimer = () => {
    const id = state.current.timerId;
    if (id != null)
      clearTimeout(id);
    state.current.timerId = null;
  };
  return useMemo(() => {
    const onPointerDown = (event) => {
      var _a, _b;
      if (event.button !== void 0 && event.button !== 0)
        return;
      clearTimer();
      state.current.startX = event.clientX;
      state.current.startY = event.clientY;
      state.current.activePointerId = event.pointerId;
      try {
        (_b = (_a = event.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a, event.pointerId);
      } catch (e) {
      }
      state.current.timerId = setTimeout(() => {
        state.current.timerId = null;
        try {
          onLongPressRef.current(event);
        } catch (e) {
        }
      }, ms);
    };
    const cancelIfActivePointer = (pointerId) => {
      if (state.current.activePointerId !== pointerId)
        return;
      clearTimer();
      state.current.activePointerId = null;
    };
    const onPointerMove = (event) => {
      if (state.current.timerId === null || state.current.activePointerId !== event.pointerId)
        return;
      const dx = event.clientX - state.current.startX;
      const dy = event.clientY - state.current.startY;
      const distance = Math.hypot(dx, dy);
      if (distance > moveThreshold)
        cancelIfActivePointer(event.pointerId);
    };
    const onPointerEnd = (event) => {
      var _a, _b;
      cancelIfActivePointer(event.pointerId);
      try {
        if ((_b = (_a = event.currentTarget).hasPointerCapture) == null ? void 0 : _b.call(_a, event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch (e) {
      }
    };
    return {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerLeave: onPointerEnd,
      onPointerCancel: onPointerEnd
    };
  }, [ms, moveThreshold, onLongPressRef]);
}

// src/useSwipe.ts
import { useMemo as useMemo2, useRef as useRef4 } from "react";
var initialTrack = () => ({
  activePointerId: null,
  startX: 0,
  startY: 0,
  startTimestamp: 0
});
function useSwipe(options) {
  const { threshold = 40, timeoutMs = 600 } = options;
  const leftRef = useLatest(options.onSwipeLeft);
  const rightRef = useLatest(options.onSwipeRight);
  const upRef = useLatest(options.onSwipeUp);
  const downRef = useLatest(options.onSwipeDown);
  const trackRef = useRef4(initialTrack());
  return useMemo2(() => {
    const onPointerDown = (event) => {
      var _a, _b;
      if (event.button !== void 0 && event.button !== 0)
        return;
      trackRef.current = {
        activePointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startTimestamp: performance.now()
      };
      try {
        (_b = (_a = event.currentTarget).setPointerCapture) == null ? void 0 : _b.call(_a, event.pointerId);
      } catch (e) {
      }
    };
    const onPointerMove = () => {
    };
    const finalize = (event) => {
      var _a, _b, _c, _d, _e, _f;
      if (trackRef.current.activePointerId !== event.pointerId)
        return;
      try {
        if ((_b = (_a = event.currentTarget).hasPointerCapture) == null ? void 0 : _b.call(_a, event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch (e) {
      }
      trackRef.current.activePointerId = null;
      const elapsed = performance.now() - trackRef.current.startTimestamp;
      if (elapsed > timeoutMs)
        return;
      const dx = event.clientX - trackRef.current.startX;
      const dy = event.clientY - trackRef.current.startY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const dominantHorizontal = absX >= absY;
      if (dominantHorizontal) {
        if (absX < threshold)
          return;
        if (dx < 0)
          (_c = leftRef.current) == null ? void 0 : _c.call(leftRef, event);
        else
          (_d = rightRef.current) == null ? void 0 : _d.call(rightRef, event);
      } else {
        if (absY < threshold)
          return;
        if (dy < 0)
          (_e = upRef.current) == null ? void 0 : _e.call(upRef, event);
        else
          (_f = downRef.current) == null ? void 0 : _f.call(downRef, event);
      }
    };
    return {
      onPointerDown,
      onPointerMove,
      onPointerUp: finalize,
      onPointerCancel: (event) => {
        var _a, _b;
        if (trackRef.current.activePointerId === event.pointerId)
          trackRef.current = initialTrack();
        try {
          if ((_b = (_a = event.currentTarget).hasPointerCapture) == null ? void 0 : _b.call(_a, event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        } catch (e) {
        }
      }
    };
  }, [downRef, leftRef, rightRef, threshold, timeoutMs, upRef]);
}

// src/useTouchHandler.ts
import { useMemo as useMemo3, useRef as useRef5 } from "react";
function useTouchHandler(options) {
  var _a, _b, _c;
  const maxMove = (_a = options.maxMove) != null ? _a : 12;
  const maxDurationMs = (_b = options.maxDurationMs) != null ? _b : 450;
  const pointerTypes = (_c = options.pointerTypes) != null ? _c : ["touch", "pen"];
  const onTapRef = useLatest(options.onTap);
  const gesture = useRef5(null);
  return useMemo3(() => {
    const allowsPointerType = (pt) => pointerTypes.includes(pt);
    const onPointerDown = (event) => {
      if (!allowsPointerType(event.pointerType))
        return;
      if (event.pointerType === "mouse" && event.button !== 0)
        return;
      gesture.current = {
        activePointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startTs: performance.now(),
        pointerType: event.pointerType
      };
    };
    const onPointerMove = (event) => {
      if (!gesture.current || gesture.current.activePointerId !== event.pointerId)
        return;
      if (!allowsPointerType(event.pointerType))
        return;
      const dx = event.clientX - gesture.current.startX;
      const dy = event.clientY - gesture.current.startY;
      if (Math.hypot(dx, dy) > maxMove)
        gesture.current = null;
    };
    const onPointerUp = (event) => {
      if (!gesture.current || gesture.current.activePointerId !== event.pointerId)
        return;
      if (!allowsPointerType(event.pointerType)) {
        gesture.current = null;
        return;
      }
      const elapsed = performance.now() - gesture.current.startTs;
      const dx = event.clientX - gesture.current.startX;
      const dy = event.clientY - gesture.current.startY;
      const distance = Math.hypot(dx, dy);
      const isTapGesture = elapsed <= maxDurationMs && distance <= maxMove;
      gesture.current = null;
      if (isTapGesture) {
        try {
          onTapRef.current(event);
        } catch (e) {
        }
      }
    };
    const onPointerCancel = (event) => {
      var _a2;
      if (((_a2 = gesture.current) == null ? void 0 : _a2.activePointerId) === event.pointerId)
        gesture.current = null;
    };
    return {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel
    };
  }, [maxDurationMs, maxMove, onTapRef, pointerTypes]);
}

// src/useControllableState.ts
import { useCallback as useCallback2, useState as useState3 } from "react";
function useControllableState(options) {
  const { value, defaultValue, onChange } = options;
  const onChangeLatest = useLatest(onChange != null ? onChange : () => void 0);
  const isControlled = value !== void 0;
  const [internalValue, setInternalValue] = useState3(
    () => typeof defaultValue === "function" ? defaultValue() : defaultValue
  );
  const state = isControlled ? value : internalValue;
  const setValue = useCallback2(
    (nextValue, ...payload) => {
      var _a;
      const lookup = typeof nextValue === "function" ? nextValue(state) : nextValue;
      if (!isControlled) {
        setInternalValue(lookup);
      }
      (_a = onChangeLatest.current) == null ? void 0 : _a.call(onChangeLatest, lookup, ...payload);
    },
    [isControlled, onChangeLatest, state]
  );
  return [state, setValue];
}

// src/useFocusTrap.ts
import { useEffect as useEffect2, useLayoutEffect as useLayoutEffect2, useRef as useRef6 } from "react";
var FOCUS_SELECTOR = [
  "a[href]",
  'input:not([disabled]):not([type="hidden"])',
  "textarea:not([disabled])",
  "button:not([disabled])",
  "select:not([disabled])",
  "[contenteditable]",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
function isVisible(element) {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}
function visibleFocusChildren(root) {
  const nodes = Array.from(root.querySelectorAll(FOCUS_SELECTOR)).filter(
    (candidate) => candidate instanceof HTMLElement && !candidate.closest("[data-focus-trap-skip]") && isVisible(candidate)
  );
  return nodes;
}
function trapTabbing(event, container) {
  var _a, _b, _c;
  if (event.key !== "Tab")
    return;
  const doc = container.ownerDocument;
  const focusables = visibleFocusChildren(container);
  const active = doc.activeElement;
  if (!focusables.length) {
    if (!container.hasAttribute("tabindex"))
      container.setAttribute("tabindex", "-1");
    event.preventDefault();
    container.focus();
    return;
  }
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const index = active ? focusables.indexOf(active) : -1;
  if (!active || container === active || index === -1) {
    event.preventDefault();
    const target = event.shiftKey ? last : first;
    (_a = target.focus) == null ? void 0 : _a.call(target);
    return;
  }
  if (event.shiftKey && active === first) {
    event.preventDefault();
    (_b = last.focus) == null ? void 0 : _b.call(last);
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    (_c = first.focus) == null ? void 0 : _c.call(first);
  }
}
function useFocusTrap(options) {
  const { active, containerRef, autoFocusFirst = true, restoreFocus = true } = options;
  const previousActive = useRef6(null);
  useEffect2(() => {
    if (active && typeof document !== "undefined") {
      previousActive.current = document.activeElement;
    }
  }, [active]);
  useLayoutEffect2(() => {
    var _a;
    if (!active)
      return void 0;
    const container = containerRef.current;
    if (!(container instanceof HTMLElement))
      return void 0;
    const doc = (_a = container.ownerDocument) != null ? _a : document;
    const root = container;
    function onKeyDown(event) {
      trapTabbing(event, root);
    }
    doc.addEventListener("keydown", onKeyDown, false);
    if (autoFocusFirst)
      queueMicrotask(() => {
        var _a2, _b, _c;
        const picks = visibleFocusChildren(container);
        (_c = (_b = (_a2 = picks[0]) != null ? _a2 : container).focus) == null ? void 0 : _c.call(_b);
      });
    return () => {
      doc.removeEventListener("keydown", onKeyDown, false);
      const previous = previousActive.current;
      const shouldRestore = restoreFocus && !!(previous == null ? void 0 : previous.focus) && previous.isConnected && typeof doc !== "undefined";
      queueMicrotask(() => {
        var _a2;
        if (shouldRestore)
          (_a2 = previous == null ? void 0 : previous.focus) == null ? void 0 : _a2.call(previous);
      });
    };
  }, [active, autoFocusFirst, containerRef, restoreFocus]);
}

// src/useDismissableLayer.ts
import { useEffect as useEffect3 } from "react";
function useDismissableLayer(options) {
  const {
    referenceRef,
    enabled,
    onDismiss,
    dismissOnEscape = true,
    dismissOnPointerDownOutside = true
  } = options;
  const dismissLatest = useLatest(onDismiss);
  useEffect3(() => {
    if (!enabled || typeof document === "undefined")
      return void 0;
    const handlePointerDown = (event) => {
      if (!dismissOnPointerDownOutside)
        return;
      const node = referenceRef.current;
      const target = event.target;
      if (!(target instanceof Element) || !(node instanceof Element))
        return;
      if (!node.contains(target)) {
        dismissLatest.current();
      }
    };
    const handleKeyDown = (event) => {
      if (!dismissOnEscape)
        return;
      if (event.defaultPrevented)
        return;
      if (event.key !== "Escape")
        return;
      dismissLatest.current();
      event.preventDefault();
    };
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [dismissLatest, dismissOnEscape, dismissOnPointerDownOutside, enabled, referenceRef]);
}

// src/useMergedRefs.ts
import { useMemo as useMemo4 } from "react";
function mergeRefs(...refs) {
  return (value) => refs.forEach((ref) => {
    if (!ref)
      return;
    assignRef(ref, value);
  });
}
function assignRef(instance, value) {
  if (!instance)
    return;
  if (typeof instance === "function") {
    instance(value);
    return;
  }
  instance.current = value;
}
function useMergedRefs(...refs) {
  return useMemo4(() => mergeRefs(...refs), refs);
}

// src/useMediaQuery.ts
import { useState as useState4 } from "react";

// src/useIsomorphicLayoutEffect.ts
import { useEffect as useEffect4, useLayoutEffect as useLayoutEffect3 } from "react";
var useIsomorphicLayoutEffect = typeof document !== "undefined" ? useLayoutEffect3 : useEffect4;

// src/useMediaQuery.ts
function useMediaQuery(query, defaultState = false) {
  const [matches, setMatches] = useState4(defaultState);
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function")
      return void 0;
    const media = window.matchMedia(query);
    const listener = () => {
      setMatches(media.matches);
    };
    listener();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
}

// src/usePrefersReducedMotion.ts
function usePrefersReducedMotion(defaultState = false) {
  return useMediaQuery("(prefers-reduced-motion: reduce)", defaultState);
}

// src/usePagination.ts
import { useCallback as useCallback3, useEffect as useEffect5, useMemo as useMemo5, useState as useState5 } from "react";
function clamp(page, totalPages) {
  if (!Number.isFinite(page))
    return 1;
  return Math.min(Math.max(1, Math.floor(page)), totalPages);
}
function sanitizePageSize(value) {
  if (!Number.isFinite(value))
    return null;
  const floored = Math.floor(value);
  if (floored < 1)
    return null;
  return floored;
}
function totalsFor(totalItems, pageSize) {
  return Math.max(1, Math.ceil(Math.max(totalItems, 0) / Math.max(pageSize, 1)));
}
function usePagination(args) {
  var _a, _b;
  const initialPageSize = (_b = sanitizePageSize((_a = args.initialPageSize) != null ? _a : 10)) != null ? _b : 10;
  const [pageSize, setPageSizeState] = useState5(initialPageSize);
  const [page, setPageState] = useState5(
    () => {
      var _a2;
      return clamp((_a2 = args.initialPage) != null ? _a2 : 1, totalsFor(args.totalItems, initialPageSize));
    }
  );
  const totalPages = totalsFor(args.totalItems, pageSize);
  const setPageSize = useCallback3((value) => {
    setPageSizeState((previous) => {
      var _a2;
      const computed = (_a2 = sanitizePageSize(typeof value === "function" ? value(previous) : value)) != null ? _a2 : previous;
      setPageState(() => clamp(1, totalsFor(args.totalItems, computed)));
      return computed;
    });
  }, [args.totalItems]);
  const setPage = useCallback3((value) => {
    setPageState(
      (prev) => clamp(typeof value === "function" ? value(prev) : value, totalPages)
    );
  }, [totalPages]);
  useEffect5(() => {
    setPageState((prev) => clamp(prev, totalPages));
  }, [totalPages]);
  const offset = Math.max(page - 1, 0) * pageSize;
  const slicePage = useCallback3(
    (items) => items.slice(offset, offset + pageSize),
    [offset, pageSize]
  );
  return useMemo5(
    () => ({
      page,
      setPage,
      pageSize,
      setPageSize,
      totalPages,
      slicePage,
      offset,
      limit: pageSize
    }),
    [offset, page, pageSize, setPage, setPageSize, slicePage, totalPages]
  );
}

// src/useSelection.ts
import { useCallback as useCallback4, useMemo as useMemo6, useState as useState6 } from "react";
function coerceKeys(mode, keys) {
  const unique = Array.from(new Set(keys));
  return mode === "single" ? unique.slice(0, 1) : unique;
}
function useSelection(options) {
  var _a;
  const notifier = useLatest((_a = options.onSelectionChange) != null ? _a : () => void 0);
  const controlled = options.selectedKeys !== void 0;
  const [uncontrolledKeys, setUncontrolledKeys] = useState6(
    () => {
      var _a2;
      return coerceKeys(options.mode, (_a2 = options.defaultSelectedKeys) != null ? _a2 : []);
    }
  );
  const selectedKeys = useMemo6(() => {
    var _a2;
    if (controlled)
      return coerceKeys(options.mode, (_a2 = options.selectedKeys) != null ? _a2 : []);
    return coerceKeys(options.mode, uncontrolledKeys);
  }, [controlled, options.mode, options.selectedKeys, uncontrolledKeys]);
  const selectedSet = useMemo6(() => new Set(selectedKeys), [selectedKeys]);
  const commit = useCallback4(
    (next) => {
      const normalized = coerceKeys(options.mode, next);
      if (!controlled)
        setUncontrolledKeys(normalized);
      notifier.current(normalized);
    },
    [controlled, notifier, options.mode]
  );
  const setSelectedKeys = useCallback4(
    (incoming) => {
      const resolved = typeof incoming === "function" ? incoming(selectedKeys) : incoming;
      commit(resolved);
    },
    [commit, selectedKeys]
  );
  const toggleKey = useCallback4(
    (key) => {
      if (options.mode === "single") {
        commit(selectedKeys.includes(key) ? [] : [key]);
        return;
      }
      const mutable = new Set(selectedKeys);
      if (mutable.has(key))
        mutable.delete(key);
      else
        mutable.add(key);
      commit(Array.from(mutable));
    },
    [commit, options.mode, selectedKeys]
  );
  const reset = useCallback4(() => commit([]), [commit]);
  return {
    selectedKeys,
    selectedSet,
    setSelectedKeys,
    toggleKey,
    reset
  };
}

// src/useOnlineStatus.ts
import { useEffect as useEffect6, useState as useState7 } from "react";
function useOnlineStatus(defaultOnline = true) {
  const [online, setOnline] = useState7(defaultOnline);
  useEffect6(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined")
      return void 0;
    function handleOnline() {
      setOnline(true);
    }
    function handleOffline() {
      setOnline(false);
    }
    setOnline(navigator.onLine);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return { online };
}

// src/useAsyncContentPhase.ts
import { useMemo as useMemo7 } from "react";
function useAsyncContentPhase(options) {
  const { items, loading = false, error, requireNetwork = false } = options;
  const { online } = useOnlineStatus();
  return useMemo7(() => {
    const list = Array.isArray(items) ? items : [];
    const isEmptyPayload = loading === true ? false : items === void 0 || items === null || list.length === 0;
    const hasErr = error !== void 0 && error !== null;
    let phase;
    if (loading)
      phase = "loading";
    else if (requireNetwork && !online)
      phase = "offline";
    else if (hasErr)
      phase = "error";
    else if (isEmptyPayload)
      phase = "empty";
    else
      phase = "ready";
    return {
      phase,
      online,
      isEmpty: isEmptyPayload && !loading,
      hasError: hasErr
    };
  }, [error, items, loading, online, requireNetwork]);
}

// src/useClientTableState.ts
import { useCallback as useCallback5, useMemo as useMemo8, useState as useState8 } from "react";
function isNumericLike(value) {
  if (typeof value === "number")
    return Number.isFinite(value);
  if (typeof value !== "string")
    return false;
  const trimmed = value.trim();
  if (!trimmed)
    return false;
  return Number.isFinite(Number(trimmed));
}
function toNumber(value) {
  return typeof value === "number" ? value : Number(String(value).trim());
}
function localeSortCells(a, b, sortType) {
  if (a == null && b == null)
    return 0;
  if (a == null)
    return 1;
  if (b == null)
    return -1;
  const numeric = sortType === "number" || sortType === "auto" && isNumericLike(a) && isNumericLike(b);
  return numeric ? toNumber(a) - toNumber(b) : String(a).localeCompare(String(b));
}
function useClientTableState(options) {
  const { data, searchColumns, pageSize = 10 } = options;
  const [search, setSearch] = useState8("");
  const [sortState, setSortState] = useState8(
    () => {
      var _a;
      return (_a = options.initialSort) != null ? _a : { key: "", dir: null };
    }
  );
  const searchableKeys = useMemo8(() => {
    var _a;
    if (searchColumns == null ? void 0 : searchColumns.length)
      return searchColumns.slice();
    if (!data.length)
      return [];
    return Array.from(
      new Set(
        Object.keys((_a = data[0]) != null ? _a : {}).filter(
          (key) => typeof key === "string" && !(key.startsWith("__") || key.startsWith("$"))
        )
      )
    );
  }, [data, searchColumns]);
  const filteredRows = useMemo8(() => {
    var _a;
    const needle = search.trim().toLowerCase();
    if (!needle)
      return data;
    const keys = searchableKeys.length ? searchableKeys : Object.keys((_a = data[0]) != null ? _a : {});
    return data.filter(
      (row) => keys.some((columnKey) => {
        const value = row[columnKey];
        return String(value != null ? value : "").toLowerCase().includes(needle);
      })
    );
  }, [data, searchableKeys, search]);
  const sortedRows = useMemo8(() => {
    if (!sortState.key || !sortState.dir)
      return filteredRows;
    const key = sortState.key;
    const direction = sortState.dir === "asc" ? 1 : -1;
    const next = [...filteredRows].sort((left, right) => {
      const leftValue = left[key];
      const rightValue = right[key];
      return localeSortCells(leftValue, rightValue, "auto") * direction;
    });
    return next;
  }, [filteredRows, sortState.dir, sortState.key]);
  const pagination = usePagination({
    totalItems: sortedRows.length,
    initialPage: 1,
    initialPageSize: pageSize
  });
  const pageRows = useMemo8(
    () => pagination.slicePage(sortedRows),
    [pagination, sortedRows]
  );
  const toggleSort = useCallback5((columnKey) => {
    setSortState((previous) => {
      if (previous.key !== columnKey)
        return { key: columnKey, dir: "asc" };
      if (previous.dir === "asc")
        return { key: columnKey, dir: "desc" };
      if (previous.dir === "desc")
        return { key: "", dir: null };
      return { key: columnKey, dir: "asc" };
    });
  }, []);
  return {
    search,
    setSearch,
    sortState,
    setSortState,
    toggleSort,
    filteredRows,
    sortedRows,
    pageRows,
    pagination
  };
}

// src/useDebounce.ts
import { useEffect as useEffect7, useRef as useRef8, useState as useState9 } from "react";
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState9(value);
  useEffect7(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
function useDebouncedCallback(callback, delay, options = {}) {
  const { leading = false } = options;
  const callbackRef = useRef8(callback);
  const timerRef = useRef8(null);
  const calledLeadingRef = useRef8(false);
  useEffect7(() => {
    callbackRef.current = callback;
  });
  const debounced = useRef8((...args) => {
    if (timerRef.current !== null)
      clearTimeout(timerRef.current);
    if (leading && !calledLeadingRef.current) {
      calledLeadingRef.current = true;
      callbackRef.current(...args);
    }
    timerRef.current = setTimeout(() => {
      calledLeadingRef.current = false;
      if (!leading)
        callbackRef.current(...args);
    }, delay);
  });
  return debounced.current;
}

// src/useToggle.ts
import { useCallback as useCallback6, useState as useState10 } from "react";
function useToggle(initialValue = false) {
  const [value, setValue] = useState10(initialValue);
  const toggle = useCallback6(() => setValue((v) => !v), []);
  const setTrue = useCallback6(() => setValue(true), []);
  const setFalse = useCallback6(() => setValue(false), []);
  const set = useCallback6((next) => setValue(next), []);
  return { value, toggle, setTrue, setFalse, set };
}

// src/useEventListener.ts
import { useEffect as useEffect8, useRef as useRef9 } from "react";
function useEventListener(eventName, handler, elementRef, options) {
  const handlerRef = useRef9(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  useEffect8(() => {
    const target = elementRef == null ? typeof window !== "undefined" ? window : null : "current" in elementRef ? elementRef.current : elementRef;
    if (!target)
      return;
    const listener = (event) => handlerRef.current(event);
    target.addEventListener(eventName, listener, options);
    return () => target.removeEventListener(eventName, listener, options);
  }, [eventName, elementRef, options]);
}

// src/usePrevious.ts
import { useEffect as useEffect9, useRef as useRef10 } from "react";
function usePrevious(value) {
  const ref = useRef10(void 0);
  useEffect9(() => {
    ref.current = value;
  });
  return ref.current;
}

// src/useMount.ts
import { useEffect as useEffect10, useRef as useRef11 } from "react";
function useMount(callback) {
  const called = useRef11(false);
  useEffect10(() => {
    if (called.current)
      return;
    called.current = true;
    callback();
  }, []);
}
function useUnmount(callback) {
  const callbackRef = useRef11(callback);
  useEffect10(() => {
    callbackRef.current = callback;
  });
  useEffect10(() => () => callbackRef.current(), []);
}

// src/useLocalStorage.ts
import { useCallback as useCallback7, useEffect as useEffect11, useState as useState11 } from "react";
function defaultSerialize(value) {
  return JSON.stringify(value);
}
function defaultDeserialize(raw) {
  return JSON.parse(raw);
}
function useLocalStorage(key, initialValue, options = {}) {
  const { serialize = defaultSerialize, deserialize = defaultDeserialize } = options;
  const readValue = useCallback7(() => {
    if (typeof window === "undefined")
      return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? deserialize(raw) : initialValue;
    } catch (e) {
      return initialValue;
    }
  }, [key, initialValue, deserialize]);
  const [storedValue, setStoredValue] = useState11(readValue);
  const setValue = useCallback7(
    (valueOrUpdater) => {
      setStoredValue((prev) => {
        const next = typeof valueOrUpdater === "function" ? valueOrUpdater(prev) : valueOrUpdater;
        try {
          window.localStorage.setItem(key, serialize(next));
          window.dispatchEvent(new StorageEvent("storage", { key, newValue: serialize(next) }));
        } catch (e) {
        }
        return next;
      });
    },
    [key, serialize]
  );
  const remove = useCallback7(() => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
    }
    setStoredValue(initialValue);
  }, [key, initialValue]);
  useEffect11(() => {
    function onStorage(e) {
      if (e.key !== key)
        return;
      setStoredValue(e.newValue !== null ? deserialize(e.newValue) : initialValue);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, initialValue, deserialize]);
  return [storedValue, setValue, remove];
}
export {
  assignRef,
  mergeRefs,
  totalsFor,
  useAsyncContentPhase,
  useAsyncData,
  useClientTableState,
  useControllableState,
  useDebounce,
  useDebounceClick,
  useDebouncedCallback,
  useDismissableLayer,
  useEventListener,
  useFocusTrap,
  useIsomorphicLayoutEffect,
  useLatest,
  useLocalStorage,
  useLongPress,
  useMediaQuery,
  useMergedRefs,
  useMount,
  useOnlineStatus,
  usePagination,
  usePrefersReducedMotion,
  usePrevious,
  useSelection,
  useSwipe,
  useToggle,
  useTouchHandler,
  useUnmount
};
//# sourceMappingURL=index.mjs.map