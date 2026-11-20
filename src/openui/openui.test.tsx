import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Renderer } from "@openuidev/react-lang";

import { designSystemLibrary } from "../entries/openui";

// A typical agent answer, in OpenUI Lang (what the model writes after reading designSystemLibrary.prompt()).
const ANSWER = [
  "root = Stack([kpis, warn, tbl, more])",
  'kpis = Grid(2, [nci, cta])',
  'nci = StatCard("NCI", "12,400,000", "AED", "+4.2%", "up", "vs Q2")',
  'cta = StatCard("CTA", "-310,500", "AED")',
  'warn = Alert("warning", "2 entities are not translated for Q3.", "Translation pending")',
  'tbl = DataTable("NCI by entity", [{key: "entity", header: "Entity"}, {key: "nci", header: "NCI", align: "right"}], [{entity: "E100", nci: "8,100,000"}, {entity: "E200", nci: "4,300,000"}])',
  'more = ActionButton("Drill into E100", "Show NCI movements for entity E100 in Q3")',
].join("\n");

describe("designSystemLibrary (OpenUI)", () => {
  it("generates a system prompt that lists every design-system component", () => {
    const prompt = designSystemLibrary.prompt();
    for (const name of ["Stack", "Grid", "Card", "StatCard", "DataTable", "BarChart", "LineChart", "PieChart", "Alert", "Badge", "ActionButton"]) {
      expect(prompt).toContain(`${name}(`);
    }
  });

  it("renders an agent answer with the library components", () => {
    render(<Renderer library={designSystemLibrary} response={ANSWER} />);
    expect(screen.getAllByText("NCI")).toHaveLength(2); // KPI label + table header
    expect(screen.getByText("12,400,000")).toBeTruthy();
    expect(screen.getByText("+4.2%")).toBeTruthy();
    expect(screen.getByText("2 entities are not translated for Q3.")).toBeTruthy();
    expect(screen.getByText("Translation pending")).toBeTruthy();
    expect(screen.getByText("E200")).toBeTruthy();
    expect(screen.getByText("8,100,000")).toBeTruthy();
  });

  it("sends an ActionButton's message back as the next user request", () => {
    const onAction = vi.fn();
    render(<Renderer library={designSystemLibrary} response={ANSWER} onAction={onAction} />);
    fireEvent.click(screen.getByRole("button", { name: "Drill into E100" }));
    expect(onAction).toHaveBeenCalled();
    expect(JSON.stringify(onAction.mock.calls[0][0])).toContain("Show NCI movements for entity E100 in Q3");
  });

  it("accepts quoted object keys and escaped strings (as a server-side generator writes them)", () => {
    const answer = [
      "root = Stack([t])",
      't = DataTable("Rates \\"spot\\"", [{"key": "pair", "header": "Pair"}, {"key": "rate", "header": "Rate", "align": "right"}], [{"pair": "USD/AED", "rate": "3.6725"}])',
    ].join("\n");
    render(<Renderer library={designSystemLibrary} response={answer} />);
    expect(screen.getByText("USD/AED")).toBeTruthy();
    expect(screen.getByText("3.6725")).toBeTruthy();
    expect(screen.getByText('Rates "spot"')).toBeTruthy();
  });

  it("renders a partial answer while it is still streaming", () => {
    const partial = ANSWER.split("\n").slice(0, 3).join("\n");
    render(<Renderer library={designSystemLibrary} response={partial} isStreaming />);
    expect(screen.getByText("12,400,000")).toBeTruthy();
  });
});
