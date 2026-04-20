"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Icon from "../../atoms/Icon";
import type { AppTopbarMenuItem, AppTopbarTheme } from "./AppTopbar.types";

function cls(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

export interface AppTopbarMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  items: AppTopbarMenuItem[];
  theme: AppTopbarTheme;
}

export function AppTopbarMenu({ id, open, onClose, triggerRef, items, theme }: AppTopbarMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const positionMenu = () => {
    const el = triggerRef.current;
    const menu = menuRef.current;
    if (!el || !menu) return;
    const rect = el.getBoundingClientRect();
    const mw = menu.offsetWidth || 220;
    let left = rect.left;
    if (left + mw > window.innerWidth - 16) {
      left = Math.max(16, window.innerWidth - 16 - mw);
    }
    if (left < 16) left = 16;
    const top = rect.bottom + 8;
    const maxH = window.innerHeight - top - 16;
    menu.style.position = "fixed";
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
    menu.style.zIndex = "70";
    menu.style.maxHeight = `${Math.max(120, maxH)}px`;
  };

  useLayoutEffect(() => {
    if (!open) return;
    positionMenu();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onScrollResize = () => positionMenu();
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);
    return () => {
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, triggerRef]);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    const first = menuRef.current.querySelector<HTMLElement>(
      'button[role="menuitem"]:not([disabled]), a[role="menuitem"]'
    );
    first?.focus();
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={menuRef}
      id={id}
      role="menu"
      aria-orientation="vertical"
      className={cls("app-topbar-menu", theme === "dark" && "app-topbar-menu--dark")}
    >
      {items.map((item) => {
        const content = (
          <>
            {item.icon ? (
              <span className="app-topbar-menu__icon" aria-hidden>
                <Icon src={item.icon} width={18} height={18} color="currentColor" decorative />
              </span>
            ) : null}
            <span className="app-topbar-menu__label">{item.label}</span>
          </>
        );

        const className = cls(
          "app-topbar-menu__item",
          item.destructive && "app-topbar-menu__item--destructive",
          item.disabled && "app-topbar-menu__item--disabled"
        );

        const common = {
          role: "menuitem" as const,
          className,
          tabIndex: item.disabled ? -1 : undefined,
        };

        const node = item.href && !item.disabled ? (
          <a
            {...common}
            href={item.href}
            onClick={() => {
              onClose();
            }}
          >
            {content}
          </a>
        ) : (
          <button
            {...common}
            type="button"
            disabled={item.disabled}
            onClick={() => {
              if (item.disabled) return;
              item.onClick?.();
              onClose();
            }}
          >
            {content}
          </button>
        );

        return <React.Fragment key={item.id}>{node}</React.Fragment>;
      })}
    </div>,
    document.body
  );
}
