/**
 * Sidebar persistence — shared by AppSidebar and DashboardShell for aligned init state.
 */

export type AppSidebarPersistPayload = {
  collapsed?: boolean;
  expanded?: string[];
};

export function readAppSidebarPersist(key: string | undefined): AppSidebarPersistPayload | null {
  if (!key || typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

export function writeAppSidebarPersist(key: string, collapsed: boolean, expanded: string[]): void {
  try {
    window.localStorage.setItem(key, JSON.stringify({ collapsed, expanded }));
  } catch {
    /* ignore */
  }
}
