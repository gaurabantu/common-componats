import {
  fireEvent,
  render,
  screen,
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import type { JSX } from "react";
import { createRef } from "react";

import { useAsyncData } from "./useAsyncData";
import { useAsyncContentPhase } from "./useAsyncContentPhase";
import { useClientTableState } from "./useClientTableState";
import { useControllableState } from "./useControllableState";
import { useDebounceClick } from "./useDebounceClick";
import { useLatest } from "./useLatest";
import { useLongPress } from "./useLongPress";
import { useMergedRefs } from "./useMergedRefs";
import { usePagination } from "./usePagination";
import { useMediaQuery } from "./useMediaQuery";
import { useOnlineStatus } from "./useOnlineStatus";
import { useSelection } from "./useSelection";
import { useSwipe } from "./useSwipe";
import { useTouchHandler } from "./useTouchHandler";

describe("useLatest", () => {
  it("mirrors newest render value onto ref.current", () => {
    const { result, rerender } = renderHook(({ val }: { val: number }) => useLatest(val), {
      initialProps: { val: 0 },
    });

    expect(result.current.current).toBe(0);

    rerender({ val: 42 });
    expect(result.current.current).toBe(42);
  });
});

describe("useDebounceClick", () => {
  it("ignores overlapping invokes while pending", async () => {
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });

    const handler = vi.fn(() => gate);

    const { result } = renderHook(() => useDebounceClick(handler));

    await act(async () => {
      result.current[0]();
      result.current[0]();
    });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(result.current[1]).toBe(true);

    await act(async () => {
      release();
      await gate;
    });

    await waitFor(() => expect(result.current[1]).toBe(false));

    await act(async () => {
      result.current[0]();
    });

    expect(handler).toHaveBeenCalledTimes(2);
  });

  it("supports sync cooldown locking", () => {
    const handler = vi.fn();
    vi.useFakeTimers();

    try {
      const { result } = renderHook(() =>
        useDebounceClick(handler, { syncCooldownMs: 100 })
      );

      act(() => {
        result.current[0]();
        result.current[0]();
      });

      expect(handler).toHaveBeenCalledTimes(1);

      act(() => vi.advanceTimersByTime(101));
      act(() => result.current[0]());
      expect(handler).toHaveBeenCalledTimes(2);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("useAsyncData", () => {
  it("drops stale settles after key changes via abort semantics", async () => {
    let resolveStale!: (value: string) => void;

    const stalePromise = new Promise<string>((resolve) => {
      resolveStale = resolve;
    });

    const fetcher = vi
      .fn()
      .mockImplementationOnce(() => stalePromise)
      .mockImplementation(() => Promise.resolve("fresh"));

    const { result, rerender } = renderHook(({ key }: { key: string }) =>
      useAsyncData(key, fetcher)
    , {
      initialProps: { key: "alpha" },
    });

    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      rerender({ key: "beta" });
      await Promise.resolve();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      resolveStale("ignored");
      await Promise.resolve();
    });

    await waitFor(() => expect(result.current.data).toBe("fresh"));

    expect(fetcher.mock.calls.length).toBeGreaterThanOrEqual(2);
    expect(fetcher).toHaveBeenCalled();
  });

  it("skips fetch until enabled toggles truthy", async () => {
    const fetcher = vi.fn((_signal: AbortSignal) =>
      Promise.resolve("payload")
    );

    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) =>
        useAsyncData("steady", fetcher, { enabled }),
      {
        initialProps: { enabled: false },
      }
    );

    expect(fetcher).not.toHaveBeenCalled();

    rerender({ enabled: true });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBe("payload");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});

describe("gesture helpers", () => {
  beforeEach(() => {
    HTMLElement.prototype.hasPointerCapture = vi.fn(() => false);
    HTMLElement.prototype.setPointerCapture = vi.fn();
    HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fires useLongPress after delay when pointer stays steady", () => {
    vi.useFakeTimers();

    const LongPressHarness = (props: { onLongPress: () => void }): JSX.Element => {
      const bindings = useLongPress({ ms: 180, onLongPress: props.onLongPress });
      return <div data-testid="long-press-target" {...bindings} />;
    };

    const spy = vi.fn();

    try {
      render(<LongPressHarness onLongPress={spy} />);

      const target = screen.getByTestId("long-press-target");

      fireEvent.pointerDown(target, {
        pointerId: 5,
        clientX: 10,
        clientY: 12,
      });

      act(() => vi.advanceTimersByTime(179));
      expect(spy).not.toHaveBeenCalled();

      act(() => vi.advanceTimersByTime(5));
      expect(spy).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it("useSwipe notifies dominant horizontal swipe", async () => {
    const onSwipeRight = vi.fn();

    const SwipeHarness = (): JSX.Element => {
      const bindings = useSwipe({
        threshold: 30,
        timeoutMs: 500,
        onSwipeRight,
      });
      return <div data-testid="swipe-target" {...bindings} />;
    };

    render(<SwipeHarness />);

    const surface = screen.getByTestId("swipe-target");

    await act(async () => {
      fireEvent.pointerDown(surface, {
        pointerId: 9,
        clientX: 0,
        clientY: 0,
      });
      fireEvent.pointerUp(surface, {
        pointerId: 9,
        clientX: 90,
        clientY: 2,
      });
    });

    expect(onSwipeRight).toHaveBeenCalledTimes(1);
  });

  it("useTouchHandler invokes tap inside tolerance windows", async () => {
    const tapSpy = vi.fn();
    let now = 0;

    vi.spyOn(performance, "now").mockImplementation(() => now);

    const TouchHarness = (): JSX.Element => {
      const bindings = useTouchHandler({
        onTap: tapSpy,
        pointerTypes: ["touch"],
        maxMove: 20,
      });
      return <button type="button" data-testid="touch-target" {...bindings} />;
    };

    render(<TouchHarness />);
    const target = screen.getByTestId("touch-target");

    await act(async () => {
      now = 10;
      fireEvent.pointerDown(target, {
        pointerType: "touch",
        pointerId: 51,
        clientX: 4,
        clientY: 4,
      });

      fireEvent.pointerMove(target, {
        pointerType: "touch",
        pointerId: 51,
        clientX: 10,
        clientY: 6,
      });

      now = 150;
      fireEvent.pointerUp(target, {
        pointerType: "touch",
        pointerId: 51,
        clientX: 12,
        clientY: 8,
      });
    });

    expect(tapSpy).toHaveBeenCalledTimes(1);
  });
});

describe("useControllableState", () => {
  it("runs uncontrolled branch then notifies when state changes", () => {
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useControllableState({ defaultValue: false, onChange })
    );

    expect(result.current[0]).toBe(false);
    act(() => result.current[1](true));

    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(result.current[0]).toBe(true);
  });
});

describe("usePagination", () => {
  it("clamps navigation to available pages", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 25,
        initialPage: 1,
        initialPageSize: 10,
      })
    );

    expect(result.current.totalPages).toBe(3);
    expect(result.current.slicePage(Array.from({ length: 25 }, (_, index) => index))).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    act(() => result.current.setPage(999));
    expect(result.current.page).toBe(3);
  });
});

describe("useMergedRefs", () => {
  it("forwards the same node to multiple refs", () => {
    const a = createRef<HTMLDivElement | null>();
    const b = createRef<HTMLDivElement | null>();

    const { result } = renderHook(() => useMergedRefs<HTMLDivElement | null>(a, b));
    const element = document.createElement("div");

    act(() => {
      result.current(element);
    });

    expect(a.current).toBe(element);
    expect(b.current).toBe(element);
  });
});

describe("useSelection", () => {
  it("toggles multiple keys", () => {
    const { result } = renderHook(() => useSelection({ mode: "multiple" }));

    act(() => result.current.toggleKey("alpha"));
    expect(result.current.selectedKeys).toContain("alpha");

    act(() => result.current.toggleKey("alpha"));
    expect(result.current.selectedKeys).not.toContain("alpha");
  });
});

describe("useClientTableState", () => {
  it("applies search filtering and pagination slicing", () => {
    const dataset = Array.from({ length: 15 }, (_, idx) => ({
      id: String(idx),
      name: `widget-${idx}`,
    }));

    const { result } = renderHook(() =>
      useClientTableState({
        data: dataset,
        searchColumns: ["name"],
        pageSize: 5,
      })
    );

    expect(result.current.pageRows).toHaveLength(5);

    act(() => result.current.setSearch("widget-14"));
    expect(result.current.filteredRows).toHaveLength(1);
    expect(result.current.pagination.totalPages).toBe(1);
    expect(result.current.pageRows[0]?.id).toBe("14");
  });
});

describe("useMediaQuery", () => {
  it("subscribes via matchMedia when available", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: true,
        media: "",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 600px)"));

    expect(result.current).toBe(true);
  });
});

describe("useOnlineStatus", () => {
  afterEach(() => {
    Object.defineProperty(window.navigator, "onLine", {
      configurable: true,
      value: true,
    });
  });

  it("mirrors navigator.onLine after subscription", async () => {
    Object.defineProperty(window.navigator, "onLine", {
      writable: true,
      configurable: true,
      value: false,
    });

    const { result } = renderHook(() => useOnlineStatus(true));

    await waitFor(() => expect(result.current.online).toBe(false));
  });
});

describe("useAsyncContentPhase", () => {
  afterEach(() => {
    Object.defineProperty(window.navigator, "onLine", {
      configurable: true,
      value: true,
    });
  });

  it("returns empty when idle with no rows", () => {
    const { result } = renderHook(() =>
      useAsyncContentPhase<number>({
        items: [],
        loading: false,
      })
    );
    expect(result.current.phase).toBe("empty");
  });

  it("prefers offline when required network lost", async () => {
    Object.defineProperty(window.navigator, "onLine", {
      writable: true,
      configurable: true,
      value: false,
    });

    const { result } = renderHook(() =>
      useAsyncContentPhase<number>({
        items: [1],
        loading: false,
        requireNetwork: true,
      })
    );

    await waitFor(() => expect(result.current.phase).toBe("offline"));
  });

  it("shows error phase when provided", () => {
    const { result } = renderHook(() =>
      useAsyncContentPhase<number>({
        items: [1],
        loading: false,
        error: new Error("boom"),
      })
    );
    expect(result.current.phase).toBe("error");
  });
});
