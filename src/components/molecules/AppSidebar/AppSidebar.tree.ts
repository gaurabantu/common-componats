import type { AppSidebarNavItem, AppSidebarSection } from "./AppSidebar.types";

export function normalizeSections(
  sections: AppSidebarSection[] | undefined,
  items: AppSidebarNavItem[] | undefined
): AppSidebarSection[] {
  if (sections && sections.length > 0) return sections;
  if (items && items.length > 0) {
    return [
      {
        id: "_flat-primary",
        tier: "primary",
        grouping: "spacing",
        items,
      },
    ];
  }
  return [];
}

function findParentsInItems(
  items: AppSidebarNavItem[],
  targetId: string,
  chain: string[]
): string[] | null {
  for (const it of items) {
    if (it.id === targetId) return chain;
    if (it.children?.length) {
      const hit = findParentsInItems(it.children, targetId, [...chain, it.id]);
      if (hit) return hit;
    }
  }
  return null;
}

/** Parent group ids that must stay expanded for `targetId` to be visible. */
export function findParentIdsForActiveItem(sections: AppSidebarSection[], targetId: string): string[] {
  for (const s of sections) {
    const p = findParentsInItems(s.items, targetId, []);
    if (p) return p;
  }
  return [];
}

function collectDefaultExpandedIds(items: AppSidebarNavItem[], out: Set<string>): void {
  for (const it of items) {
    if (it.children?.length && it.defaultExpanded) out.add(it.id);
    if (it.children?.length) collectDefaultExpandedIds(it.children, out);
  }
}

export function getInitialExpandedSet(sections: AppSidebarSection[]): Set<string> {
  const s = new Set<string>();
  for (const sec of sections) collectDefaultExpandedIds(sec.items, s);
  return s;
}
