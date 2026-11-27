/**
 * Backward-compatible import path — `src/index.tsx` and `src/entries/shell.ts` import
 * `./components/molecules/DashboardShell/DashboardShell`. The implementation lives in `./index.tsx`.
 */
export { default, AppShell } from "./index";
export type {
  DashboardShellProps,
  AppShellProps,
  DashboardShellContentElement,
  DashboardShellSidebarProps,
} from "./index";
