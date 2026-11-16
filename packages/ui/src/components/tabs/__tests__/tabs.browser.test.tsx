import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "../tabs";

function TestTabs() {
  return (
    <div className="p-8">
      <Tabs defaultValue="overview" data-testid="tabs-root">
        <TabsList data-testid="tabs-list">
          <TabsTrigger value="overview" data-testid="tab-overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="metrics" data-testid="tab-metrics">
            Metrics
          </TabsTrigger>
          <TabsTrigger value="settings" data-testid="tab-settings">
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" data-testid="panel-overview">
          Overview content
        </TabsContent>
        <TabsContent value="metrics" data-testid="panel-metrics">
          Metrics content
        </TabsContent>
        <TabsContent value="settings" data-testid="panel-settings">
          Settings content
        </TabsContent>
      </Tabs>
    </div>
  );
}

describe("Tabs Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("measures the active tab geometry and positions the travelling indicator", async () => {
    render(<TestTabs />);

    const overviewTab = page.getByTestId("tab-overview");
    await expect.element(overviewTab).toBeVisible();

    const indicator = document.querySelector<HTMLElement>("[data-slot='tabs-indicator']")!;
    expect(indicator).not.toBeNull();
    const initialLeft = indicator.style.getPropertyValue("--active-tab-left");
    const initialWidth = indicator.style.getPropertyValue("--active-tab-width");
    expect(parseFloat(initialWidth)).toBeGreaterThan(0);

    await userEvent.click(page.getByTestId("tab-metrics"));

    await expect.element(page.getByTestId("panel-metrics")).toBeVisible();
    await expect.element(page.getByTestId("panel-metrics")).toHaveAttribute("data-activation-direction", "right");

    const nextLeft = indicator.style.getPropertyValue("--active-tab-left");
    expect(parseFloat(nextLeft)).toBeGreaterThan(parseFloat(initialLeft));
  });

  it("navigates tabs with ArrowRight and ArrowLeft keys", async () => {
    render(<TestTabs />);

    const overviewTab = page.getByTestId("tab-overview");
    (overviewTab.element() as HTMLElement).focus();

    await userEvent.keyboard("{ArrowRight}");
    await expect.element(page.getByTestId("tab-metrics")).toHaveFocus();

    await userEvent.keyboard("{ArrowLeft}");
    await expect.element(page.getByTestId("tab-overview")).toHaveFocus();
  });

  it("has no WCAG 2.2 AA violations", async () => {
    render(<TestTabs />);
    await expect.element(page.getByTestId("panel-overview")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
