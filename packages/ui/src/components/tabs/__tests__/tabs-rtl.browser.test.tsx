import {afterEach, describe, expect, it} from "vitest";
import {page, userEvent} from "vitest/browser";
import {cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {Tabs, TabsList, TabsTrigger} from "../index";

afterEach(() => {
  cleanup();
  resetDirection();
});

function renderTabs(variant?: "segmented" | "underline" | "ghost") {
  renderRtl(
    <div className="p-8">
      <Tabs defaultValue="b">
        <TabsList variant={variant}>
          <TabsTrigger value="a">Overview</TabsTrigger>
          <TabsTrigger value="b">Metrics</TabsTrigger>
          <TabsTrigger value="c">Settings</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

const rect = (element: Element) => element.getBoundingClientRect();
const indicator = () => document.querySelector("[data-slot='tabs-indicator']")!;
const tab = (name: string) => page.getByRole("tab", {name}).element();

describe("Tabs in RTL", () => {
  it("lays the first tab out on the right", async () => {
    renderTabs();
    await expect.element(page.getByRole("tab", {name: "Overview"})).toBeVisible();
    expect(rect(tab("Overview")).left).toBeGreaterThan(rect(tab("Settings")).left);
  });

  it.each(["segmented", "underline", "ghost"] as const)("keeps the %s indicator on the active tab", async (variant) => {
    renderTabs(variant);
    await expect.element(page.getByRole("tab", {name: "Metrics"})).toBeVisible();
    await expect
      .poll(() => {
        const mark = rect(indicator());
        const active = rect(tab("Metrics"));
        return [Math.abs(Math.round(mark.left - active.left)), Math.abs(Math.round(mark.right - active.right))];
      })
      .toEqual([0, 0]);
  });

  it("follows the active tab when it changes", async () => {
    renderTabs();
    await userEvent.click(page.getByRole("tab", {name: "Overview"}));
    await expect.poll(() => Math.round(rect(indicator()).left - rect(tab("Overview")).left)).toBe(0);
  });

  it("moves focus to the next tab with ArrowLeft", async () => {
    renderTabs();
    tab("Metrics").focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(tab("Settings")).toHaveFocus();
  });

  it("has no axe violations", async () => {
    renderTabs();
    await expect.element(page.getByRole("tab", {name: "Metrics"})).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
