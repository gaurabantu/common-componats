/* ucs:component-css */
import "./styles/components/molecules/AppTopbar/AppTopbar.css";
import {
  useBelowWidth
} from "./chunk-ML7OBPNX.mjs";
import {
  Avatar_default
} from "./chunk-JKDK3NKC.mjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./chunk-UP5YH5MZ.mjs";
import {
  TextInputSearch_default
} from "./chunk-ZSF56B3K.mjs";
import {
  Button_default
} from "./chunk-XIOFTDBU.mjs";
import {
  Icon_default
} from "./chunk-6JJMOGWW.mjs";

// src/components/molecules/AppTopbar/index.tsx
import { useEffect as useEffect2, useId, useMemo, useRef as useRef2, useState } from "react";

// src/components/molecules/AppTopbar/AppTopbar.chrome.ts
var TOKENS_CSS_VARS = {
  bg: "--app-topbar-bg",
  bgElevated: "--app-topbar-bg-elevated",
  text: "--app-topbar-text",
  textMuted: "--app-topbar-text-muted",
  border: "--app-topbar-border",
  hover: "--app-topbar-hover",
  activeBg: "--app-topbar-active-bg",
  focusRing: "--app-topbar-focus-ring",
  shadow: "--app-topbar-shadow"
};
function mergeTopbarTokensStyle(tokens, base) {
  if (!tokens || Object.keys(tokens).length === 0) {
    return base != null ? base : {};
  }
  const vars = {};
  Object.entries(tokens).forEach(([key, val]) => {
    if (val === void 0 || val === "")
      return;
    const cssVar = TOKENS_CSS_VARS[key];
    if (cssVar)
      vars[cssVar] = val;
  });
  return { ...vars, ...base };
}

// src/components/molecules/AppTopbar/AppTopbarMenu.tsx
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}
function AppTopbarMenu({ id, open, onClose, triggerRef, items, theme }) {
  const menuRef = useRef(null);
  const positionMenu = () => {
    const el = triggerRef.current;
    const menu = menuRef.current;
    if (!el || !menu)
      return;
    const rect = el.getBoundingClientRect();
    const mw = menu.offsetWidth || 220;
    let left = rect.left;
    if (left + mw > window.innerWidth - 16) {
      left = Math.max(16, window.innerWidth - 16 - mw);
    }
    if (left < 16)
      left = 16;
    const top = rect.bottom + 8;
    const maxH = window.innerHeight - top - 16;
    menu.style.position = "fixed";
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
    menu.style.zIndex = "70";
    menu.style.maxHeight = `${Math.max(120, maxH)}px`;
  };
  useLayoutEffect(() => {
    if (!open)
      return;
    positionMenu();
  }, [open]);
  useEffect(() => {
    if (!open)
      return;
    const onScrollResize = () => positionMenu();
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);
    return () => {
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [open]);
  useEffect(() => {
    if (!open)
      return;
    const onDoc = (e) => {
      var _a, _b;
      const t = e.target;
      if ((_a = menuRef.current) == null ? void 0 : _a.contains(t))
        return;
      if ((_b = triggerRef.current) == null ? void 0 : _b.contains(t))
        return;
      onClose();
    };
    const onKey = (e) => {
      if (e.key === "Escape")
        onClose();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, triggerRef]);
  useEffect(() => {
    if (!open || !menuRef.current)
      return;
    const first = menuRef.current.querySelector(
      'button[role="menuitem"]:not([disabled]), a[role="menuitem"]'
    );
    first == null ? void 0 : first.focus();
  }, [open]);
  if (!open || typeof document === "undefined")
    return null;
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: menuRef,
        id,
        role: "menu",
        "aria-orientation": "vertical",
        className: cls("app-topbar-menu", theme === "dark" && "app-topbar-menu--dark"),
        children: items.map((item) => {
          const content = /* @__PURE__ */ jsxs(Fragment, { children: [
            item.icon ? /* @__PURE__ */ jsx("span", { className: "app-topbar-menu__icon", "aria-hidden": true, children: /* @__PURE__ */ jsx(Icon_default, { src: item.icon, width: 18, height: 18, color: "currentColor", decorative: true }) }) : null,
            /* @__PURE__ */ jsx("span", { className: "app-topbar-menu__label", children: item.label })
          ] });
          const className = cls(
            "app-topbar-menu__item",
            item.destructive && "app-topbar-menu__item--destructive",
            item.disabled && "app-topbar-menu__item--disabled"
          );
          const common = {
            role: "menuitem",
            className,
            tabIndex: item.disabled ? -1 : void 0
          };
          const node = item.href && !item.disabled ? /* @__PURE__ */ jsx(
            "a",
            {
              ...common,
              href: item.href,
              onClick: () => {
                onClose();
              },
              children: content
            }
          ) : /* @__PURE__ */ jsx(
            "button",
            {
              ...common,
              type: "button",
              disabled: item.disabled,
              onClick: () => {
                var _a;
                if (item.disabled)
                  return;
                (_a = item.onClick) == null ? void 0 : _a.call(item);
                onClose();
              },
              children: content
            }
          );
          return /* @__PURE__ */ jsx(React.Fragment, { children: node }, item.id);
        })
      }
    ),
    document.body
  );
}

// src/components/molecules/AppTopbar/index.tsx
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var TOPBAR_SEARCH_ICON = /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", "aria-hidden": true, children: [
  /* @__PURE__ */ jsx2("circle", { cx: "11", cy: "11", r: "7", stroke: "currentColor", strokeWidth: "2" }),
  /* @__PURE__ */ jsx2("path", { d: "M20 20l-4.3-4.3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
] });
var MENU_ICON = /* @__PURE__ */ jsx2("svg", { viewBox: "0 0 20 20", width: 20, height: 20, fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx2("path", { d: "M3 5h14M3 10h14M3 15h14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
function cls2(...parts) {
  return parts.filter(Boolean).join(" ");
}
function actionAriaLabel(action) {
  const { label, badgeDot, badgeCount } = action;
  if (badgeDot && (badgeCount == null || badgeCount <= 0)) {
    return `${label}, unread`;
  }
  if (badgeCount != null && badgeCount > 0) {
    return `${label}, ${badgeCount} unread`;
  }
  return label;
}
var AppTopbar = ({
  theme = "light",
  title,
  titleAs = "h1",
  search,
  centerSlot,
  actions,
  profile,
  onMobileMenuClick,
  mobileMenuLabel = "Open menu",
  mobileMenuItems,
  mobileSearchTriggerLabel = "Search",
  leftSlot,
  rightSlot,
  sticky = true,
  zIndex = 50,
  collapseCenterBelowWidth = 1024,
  responsive = true,
  tokens,
  className,
  classNames
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const rootId = useId();
  const baseId = rootId.replace(/[^a-zA-Z0-9_-]/g, "");
  const searchInputId = (_a = search == null ? void 0 : search.inputId) != null ? _a : `app-topbar-search-${baseId}`;
  const menuDomId = useMemo(() => `app-topbar-menu-root-${baseId}`, [baseId]);
  const isNarrow = useBelowWidth(collapseCenterBelowWidth, responsive);
  const hasMenuItems = Boolean(mobileMenuItems && mobileMenuItems.length > 0);
  const showHamburger = isNarrow && (hasMenuItems || Boolean(onMobileMenuClick));
  const hasCenterContent = centerSlot != null || search != null;
  const hideCenterColumn = isNarrow && search != null && centerSlot == null;
  const showCenterCell = hasCenterContent && !hideCenterColumn;
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerWrapRef = useRef2(null);
  const hasProfileMenu = Boolean((profile == null ? void 0 : profile.menuItems) && profile.menuItems.length > 0);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  useEffect2(() => {
    if (!isNarrow) {
      setMobileSearchOpen(false);
      setMenuOpen(false);
    }
  }, [isNarrow]);
  useEffect2(() => {
    if (!mobileSearchOpen)
      return;
    const onKey = (e) => {
      if (e.key === "Escape")
        setMobileSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileSearchOpen]);
  useEffect2(() => {
    if (!mobileSearchOpen || !hideCenterColumn)
      return;
    const id = requestAnimationFrame(() => {
      var _a2;
      (_a2 = document.getElementById(searchInputId)) == null ? void 0 : _a2.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [mobileSearchOpen, hideCenterColumn, searchInputId]);
  useEffect2(() => {
    if (!search)
      return;
    const onKey = (e) => {
      if (e.defaultPrevented)
        return;
      const t = e.target;
      if (!t)
        return;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
        return;
      const focusSearch = () => {
        var _a2;
        return (_a2 = document.getElementById(searchInputId)) == null ? void 0 : _a2.focus();
      };
      if (hideCenterColumn && !mobileSearchOpen) {
        if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          setMobileSearchOpen(true);
          return;
        }
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          setMobileSearchOpen(true);
          return;
        }
        return;
      }
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        focusSearch();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        focusSearch();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [search, hideCenterColumn, mobileSearchOpen, searchInputId]);
  const TitleTag = titleAs;
  const rootStyle = mergeTopbarTokensStyle(tokens, {
    ...sticky ? { zIndex } : {}
  });
  const searchField = search ? /* @__PURE__ */ jsx2(
    TextInputSearch_default,
    {
      id: searchInputId,
      value: (_b = search.value) != null ? _b : "",
      onChange: search.onChange,
      onSearch: search.onSearch,
      placeholder: (_c = search.placeholder) != null ? _c : "Search...",
      ariaLabel: (_d = search.ariaLabel) != null ? _d : "Search",
      disabled: search.disabled,
      size: (_e = search.size) != null ? _e : "sm",
      fullWidth: true,
      leftIcon: TOPBAR_SEARCH_ICON,
      leftIconHeight: 18,
      leftIconWidth: 18,
      leftIconColor: "var(--app-topbar-text-muted)",
      showClearButton: (_f = search.showClearButton) != null ? _f : hideCenterColumn,
      containerClassName: "text-input-search-wrapper app-topbar__search"
    }
  ) : null;
  const handleHamburgerClick = () => {
    setMobileSearchOpen(false);
    setProfileMenuOpen(false);
    if (hasMenuItems) {
      setMenuOpen((o) => !o);
      return;
    }
    onMobileMenuClick == null ? void 0 : onMobileMenuClick();
  };
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsxs2(
      "header",
      {
        className: cls2(
          "app-topbar",
          theme === "dark" && "app-topbar--dark",
          sticky && "app-topbar--sticky",
          !showCenterCell && "app-topbar--no-center",
          hideCenterColumn && "app-topbar--narrow-search",
          mobileSearchOpen && hideCenterColumn && "app-topbar--mobile-search-open",
          classNames == null ? void 0 : classNames.root,
          className
        ),
        style: rootStyle,
        children: [
          /* @__PURE__ */ jsxs2("div", { className: cls2("app-topbar__inner", classNames == null ? void 0 : classNames.inner), children: [
            /* @__PURE__ */ jsxs2("div", { className: cls2("app-topbar__left", classNames == null ? void 0 : classNames.left), children: [
              showHamburger ? /* @__PURE__ */ jsx2("div", { ref: menuTriggerWrapRef, className: "app-topbar__menu", children: /* @__PURE__ */ jsx2(
                Button_default,
                {
                  type: "button",
                  variant: "ghost",
                  size: "md",
                  icon: MENU_ICON,
                  iconWidth: 20,
                  iconHeight: 20,
                  ariaLabel: mobileMenuLabel,
                  "aria-haspopup": hasMenuItems ? "menu" : void 0,
                  "aria-expanded": hasMenuItems ? menuOpen : void 0,
                  "aria-controls": hasMenuItems ? menuDomId : void 0,
                  onClick: handleHamburgerClick
                }
              ) }) : null,
              leftSlot,
              /* @__PURE__ */ jsx2("div", { className: "app-topbar__context", children: /* @__PURE__ */ jsx2(TitleTag, { className: cls2("app-topbar__title", classNames == null ? void 0 : classNames.title), children: title }) })
            ] }),
            showCenterCell ? /* @__PURE__ */ jsx2(
              "div",
              {
                className: cls2(
                  "app-topbar__center",
                  search && !centerSlot && "app-topbar__center--expands",
                  classNames == null ? void 0 : classNames.center
                ),
                children: centerSlot != null ? centerSlot : searchField
              }
            ) : null,
            /* @__PURE__ */ jsxs2("div", { className: cls2("app-topbar__right", classNames == null ? void 0 : classNames.right), children: [
              hideCenterColumn && search ? /* @__PURE__ */ jsx2(
                Button_default,
                {
                  type: "button",
                  variant: "ghost",
                  size: "md",
                  icon: TOPBAR_SEARCH_ICON,
                  iconWidth: 20,
                  iconHeight: 20,
                  ariaLabel: mobileSearchTriggerLabel,
                  "aria-expanded": mobileSearchOpen,
                  "aria-controls": mobileSearchOpen ? `${searchInputId}-panel` : void 0,
                  onClick: () => setMobileSearchOpen((s) => !s)
                }
              ) : null,
              actions == null ? void 0 : actions.map((action) => {
                var _a2;
                const variant = (_a2 = action.variant) != null ? _a2 : "ghost";
                const showDot = action.badgeDot;
                const count = action.badgeCount;
                const hasBadge = showDot || count != null && count > 0;
                const showCountChip = hasBadge && !showDot && count != null && count > 0;
                return /* @__PURE__ */ jsxs2("span", { className: "app-topbar__action-wrap", children: [
                  /* @__PURE__ */ jsx2(
                    Button_default,
                    {
                      type: "button",
                      variant,
                      size: "md",
                      icon: action.icon,
                      iconWidth: 20,
                      iconHeight: 20,
                      ariaLabel: actionAriaLabel(action),
                      disabled: action.disabled,
                      href: action.href,
                      onClick: action.onClick
                    }
                  ),
                  hasBadge ? /* @__PURE__ */ jsx2(
                    "span",
                    {
                      className: cls2("app-topbar__badge", showCountChip && "app-topbar__badge--count"),
                      "aria-hidden": true,
                      children: showCountChip ? count > 99 ? "99+" : count : null
                    }
                  ) : null
                ] }, action.id);
              }),
              profile && hasProfileMenu ? /* @__PURE__ */ jsxs2(DropdownMenu, { open: profileMenuOpen, onOpenChange: setProfileMenuOpen, placement: "bottom-end", children: [
                /* @__PURE__ */ jsx2(
                  DropdownMenuTrigger,
                  {
                    className: "app-topbar__profile",
                    "aria-label": (_g = profile.menuLabel) != null ? _g : profile.name ? `Account menu for ${profile.name}` : "Account menu",
                    onClick: () => setMenuOpen(false),
                    children: (_i = profile.avatar) != null ? _i : /* @__PURE__ */ jsx2(Avatar_default, { size: 32, shape: "circle", name: (_h = profile.name) != null ? _h : "User", ...profile.avatarProps })
                  }
                ),
                /* @__PURE__ */ jsx2(DropdownMenuContent, { showPointer: true, className: "app-topbar__profile-menu", children: profile.menuItems.map((item) => /* @__PURE__ */ jsxs2(
                  DropdownMenuItem,
                  {
                    variant: item.destructive ? "danger" : "default",
                    disabled: item.disabled,
                    onSelect: () => {
                      var _a2;
                      if (item.href && typeof window !== "undefined")
                        window.location.assign(item.href);
                      else
                        (_a2 = item.onClick) == null ? void 0 : _a2.call(item);
                    },
                    children: [
                      item.icon ? /* @__PURE__ */ jsx2("span", { className: "ds-dropdown-menu__icon", "aria-hidden": true, children: /* @__PURE__ */ jsx2(Icon_default, { src: item.icon, width: 16, height: 16, color: "currentColor", decorative: true }) }) : null,
                      item.label
                    ]
                  },
                  item.id
                )) })
              ] }) : profile ? profile.onClick ? /* @__PURE__ */ jsx2(
                "button",
                {
                  type: "button",
                  className: "app-topbar__profile",
                  "aria-label": (_j = profile.menuLabel) != null ? _j : profile.name ? `Account menu for ${profile.name}` : "Account menu",
                  onClick: profile.onClick,
                  children: (_l = profile.avatar) != null ? _l : /* @__PURE__ */ jsx2(Avatar_default, { size: 32, shape: "circle", name: (_k = profile.name) != null ? _k : "User", ...profile.avatarProps })
                }
              ) : /* @__PURE__ */ jsx2(
                "span",
                {
                  className: "app-topbar__profile app-topbar__profile--static",
                  "aria-label": (_n = (_m = profile.menuLabel) != null ? _m : profile.name) != null ? _n : "Profile",
                  children: (_p = profile.avatar) != null ? _p : /* @__PURE__ */ jsx2(Avatar_default, { size: 32, shape: "circle", name: (_o = profile.name) != null ? _o : "User", ...profile.avatarProps })
                }
              ) : null,
              rightSlot
            ] })
          ] }),
          hideCenterColumn && mobileSearchOpen && search ? /* @__PURE__ */ jsx2("div", { id: `${searchInputId}-panel`, className: "app-topbar__mobile-search", children: searchField }) : null
        ]
      }
    ),
    hasMenuItems ? /* @__PURE__ */ jsx2(
      AppTopbarMenu,
      {
        id: menuDomId,
        open: menuOpen,
        onClose: () => setMenuOpen(false),
        triggerRef: menuTriggerWrapRef,
        items: mobileMenuItems,
        theme
      }
    ) : null
  ] });
};
AppTopbar.displayName = "AppTopbar";
var AppTopbar_default = AppTopbar;

export {
  mergeTopbarTokensStyle,
  AppTopbar_default
};
//# sourceMappingURL=chunk-N3RCO3KW.mjs.map