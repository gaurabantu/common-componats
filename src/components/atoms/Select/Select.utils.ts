

export const initUX4GSelect = (element: HTMLElement | null) => {
  if (!element) return;

  const u = (window as any).UX4G || (window as any).ux4g || (window as any).bootstrap;
  if (!u) {
    console.warn("❌ UX4G not found in window — select will remain native");
    return;
  }

  try {
    u.init?.();
  } catch (e) {
    console.warn("UX4G global init() failed:", e);
  }

  const SelectCtor = u.Select || u.select || (u.forms && u.forms.Select);
  if (SelectCtor) {
    try {
      (element as any).__ux4g_select_instance?.dispose?.();
      const instance = new SelectCtor(element);
      (element as any).__ux4g_select_instance = instance;
      // console.log("✅ UX4G Select initialized", instance);
    } catch (err) {
      console.warn("Failed to initialize UX4G Select:", err);
    }
  } else {
    u.init?.();
  }
};

