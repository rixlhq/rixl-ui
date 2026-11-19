import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "../index";

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

  it("fades a newly activated panel in with no slide, and leaves the first panel still", async () => {
    render(<TestTabs />);
    const initial = getComputedStyle(page.getByTestId("panel-overview").element());
    expect(initial.animationName).toBe("none");

    await userEvent.click(page.getByTestId("tab-metrics"));
    const style = getComputedStyle(page.getByTestId("panel-metrics").element());
    expect(style.animationName).toBe("rixl-enter");
    expect(style.animationDuration).toBe("0.12s");
    expect(style.getPropertyValue("--rixl-enter-opacity")).toBe("0");
    expect(style.getPropertyValue("--rixl-enter-translate-x")).toBe("");
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

  // There is no full-width mode: an app that wants stretched tabs says so with classNames.
  it("stretches the row across the root when the app passes w-full and flex-1", async () => {
    render(
      <div className="w-[480px]">
        <Tabs defaultValue="a" data-testid="stretch-root">
          <TabsList className="w-full">
            <TabsTrigger value="a" className="flex-1">
              A
            </TabsTrigger>
            <TabsTrigger value="b" className="flex-1" data-testid="stretch-last">
              B
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    );
    await expect.element(page.getByTestId("stretch-last")).toBeVisible();
    const root = document.querySelector<HTMLElement>("[data-testid='stretch-root']")!.getBoundingClientRect();
    const list = document.querySelector<HTMLElement>("[data-slot='tabs-list']")!.getBoundingClientRect();
    expect(list.width).toBeCloseTo(root.width, 0);
  });

  it("has no WCAG 2.2 AA violations", async () => {
    render(<TestTabs />);
    await expect.element(page.getByTestId("panel-overview")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
