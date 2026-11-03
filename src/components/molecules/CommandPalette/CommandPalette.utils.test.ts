import {
  flattenOptions,
  isEditableTarget,
  listGroups,
  matchesHotkey,
  normalizeText,
  rankGroups,
  scoreItem,
  toDomId,
  tokenize,
} from "./CommandPalette.utils";
import type { CommandGroup, CommandItem } from "./CommandPalette.types";

const noop = () => {};
const item = (id: string, label: string, extra: Partial<CommandItem> = {}): CommandItem => ({
  id,
  label,
  onSelect: noop,
  ...extra,
});

describe("normalizeText / tokenize", () => {
  it("lower-cases, strips diacritics and collapses whitespace", () => {
    expect(normalizeText("  Créer   Facture ")).toBe("creer facture");
    expect(tokenize("  open   Settings ")).toEqual(["open", "settings"]);
    expect(tokenize("   ")).toEqual([]);
  });
});

describe("scoreItem tiers", () => {
  it("prefix > word-start > substring on the label", () => {
    const prefix = scoreItem(item("a", "Settings"), "set");
    const wordStart = scoreItem(item("b", "Open settings"), "set");
    const substring = scoreItem(item("c", "Reset password"), "set");
    expect(prefix).toBeGreaterThan(wordStart);
    expect(wordStart).toBeGreaterThan(substring);
    expect(substring).toBeGreaterThan(0);
  });

  it("returns 0 when nothing matches and 1 for an empty query", () => {
    expect(scoreItem(item("a", "Settings"), "zzz")).toBe(0);
    expect(scoreItem(item("a", "Settings"), "")).toBe(1);
  });

  it("keywords count, below a label prefix", () => {
    const viaKeyword = scoreItem(item("a", "Preferences", { keywords: ["settings"] }), "settings");
    const viaLabel = scoreItem(item("b", "Settings"), "settings");
    expect(viaKeyword).toBeGreaterThan(0);
    expect(viaLabel).toBeGreaterThan(viaKeyword);
  });

  it("an exact keyword beats a label substring", () => {
    const keyword = scoreItem(item("a", "Billing", { keywords: ["invoice"] }), "invoice");
    const substring = scoreItem(item("b", "Reinvoiced items"), "invoice");
    expect(keyword).toBeGreaterThan(substring);
  });

  it("description matches with the lowest weight", () => {
    const desc = scoreItem(item("a", "Team", { description: "Invite members" }), "invite");
    expect(desc).toBeGreaterThan(0);
    expect(desc).toBeLessThan(scoreItem(item("b", "Invite"), "invite"));
  });

  it("every token must match somewhere", () => {
    expect(scoreItem(item("a", "Create invoice"), "create inv")).toBeGreaterThan(0);
    expect(scoreItem(item("a", "Create invoice"), "create zzz")).toBe(0);
  });

  it("exact label gets a bonus and matching is diacritic-insensitive", () => {
    expect(scoreItem(item("a", "Open"), "open")).toBeGreaterThan(scoreItem(item("b", "Open file"), "open"));
    expect(scoreItem(item("a", "Créer"), "creer")).toBeGreaterThan(0);
  });

  it("word start after punctuation counts", () => {
    expect(scoreItem(item("a", "Go to: Dashboard"), "dash")).toBe(
      scoreItem(item("b", "Open dashboard"), "dash"),
    );
  });
});

describe("rankGroups", () => {
  const groups: CommandGroup[] = [
    { id: "nav", label: "Navigation", items: [item("1", "Reset filters"), item("2", "Go to settings")] },
    { id: "act", label: "Actions", items: [item("3", "Settings"), item("4", "Delete")] },
    { id: "empty", label: "Empty", items: [] },
  ];

  it("empty query keeps everything in source order and drops empty groups", () => {
    const ranked = rankGroups(groups, "");
    expect(ranked.map((g) => g.group.id)).toEqual(["nav", "act"]);
    expect(flattenOptions(ranked).map((o) => o.item.id)).toEqual(["1", "2", "3", "4"]);
  });

  it("filters, sorts items by score and groups by best score", () => {
    const ranked = rankGroups(groups, "set");
    expect(ranked.map((g) => g.group.id)).toEqual(["act", "nav"]);
    expect(ranked[1].options.map((o) => o.item.id)).toEqual(["2", "1"]);
    expect(flattenOptions(ranked).map((o) => o.item.id)).toEqual(["3", "2", "1"]);
  });

  it("ties keep source order", () => {
    const g: CommandGroup[] = [{ id: "g", label: "G", items: [item("a", "Alpha one"), item("b", "Alpha two")] }];
    expect(flattenOptions(rankGroups(g, "alpha")).map((o) => o.item.id)).toEqual(["a", "b"]);
  });

  it("listGroups namespaces keys with a prefix", () => {
    const keys = flattenOptions(listGroups(groups, "remote:")).map((o) => o.key);
    expect(keys[0]).toBe("remote:nav::1");
  });
});

describe("toDomId", () => {
  it("produces id-safe strings and stays unique for different inputs", () => {
    expect(toDomId("nav::1")).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(toDomId("a b")).not.toBe(toDomId("a_b"));
  });
});

describe("isEditableTarget", () => {
  it("detects text fields, textarea, select and contenteditable", () => {
    const input = document.createElement("input");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const textarea = document.createElement("textarea");
    const select = document.createElement("select");
    const editable = document.createElement("div");
    editable.setAttribute("contenteditable", "true");
    const child = document.createElement("span");
    editable.appendChild(child);
    const button = document.createElement("button");
    expect(isEditableTarget(input)).toBe(true);
    expect(isEditableTarget(checkbox)).toBe(false);
    expect(isEditableTarget(textarea)).toBe(true);
    expect(isEditableTarget(select)).toBe(true);
    expect(isEditableTarget(child)).toBe(true);
    expect(isEditableTarget(button)).toBe(false);
    expect(isEditableTarget(null)).toBe(false);
  });
});

describe("matchesHotkey", () => {
  const ev = (init: KeyboardEventInit) => new KeyboardEvent("keydown", init);

  it("mod = Meta on mac, Control elsewhere", () => {
    expect(matchesHotkey(ev({ key: "k", metaKey: true }), ["mod", "k"], true)).toBe(true);
    expect(matchesHotkey(ev({ key: "k", ctrlKey: true }), ["mod", "k"], true)).toBe(false);
    expect(matchesHotkey(ev({ key: "k", ctrlKey: true }), ["mod", "k"], false)).toBe(true);
    expect(matchesHotkey(ev({ key: "k", metaKey: true }), ["mod", "k"], false)).toBe(false);
  });

  it("rejects extra modifiers and other keys; case-insensitive key", () => {
    expect(matchesHotkey(ev({ key: "K", ctrlKey: true, shiftKey: true }), ["mod", "k"], false)).toBe(false);
    expect(matchesHotkey(ev({ key: "K", ctrlKey: true, shiftKey: true }), ["mod", "shift", "k"], false)).toBe(true);
    expect(matchesHotkey(ev({ key: "j", ctrlKey: true }), ["mod", "k"], false)).toBe(false);
    expect(matchesHotkey(ev({ key: "k" }), ["mod", "k"], false)).toBe(false);
  });

  it("falls back to event.code for Option-altered characters", () => {
    expect(matchesHotkey(ev({ key: "˚", code: "KeyK", altKey: true, metaKey: true }), ["mod", "alt", "k"], true)).toBe(true);
  });

  it("a hotkey without a non-modifier key never matches", () => {
    expect(matchesHotkey(ev({ key: "Control", ctrlKey: true }), ["mod"], false)).toBe(false);
  });
});
