import {flushSync} from "react-dom";
import {createRoot} from "react-dom/client";
import {afterEach, beforeEach, describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import axe from "axe-core";
import {App} from "../../App";
import "../../styles.css";

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
beforeEach(() => {
  window.location.hash = "/button";
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  flushSync(() => root.render(<App />));
});
afterEach(() => {
  flushSync(() => root.unmount());
  container.remove();
});

describe("showcase navigation", () => {
  it("keeps overview tiles square without overflowing previews", async () => {
    window.location.hash = "/";
    await expect.element(page.getByRole("heading", {name: "Components", exact: true})).toBeVisible();
    for (const width of [1440, 768, 390]) {
      await page.viewport(width, 900);
      const cells = [...document.querySelectorAll<HTMLElement>(".docs-demo-cell")];
      expect(cells).toHaveLength(33);
      for (const cell of cells) {
        const bounds = cell.getBoundingClientRect();
        expect(Math.abs(bounds.width - bounds.height), `${width}px: ${cell.querySelector("a")?.textContent}`).toBeLessThanOrEqual(1);
        const preview = cell.querySelector<HTMLElement>(".docs-demo-preview")!;
        expect(preview.scrollWidth).toBeLessThanOrEqual(preview.clientWidth);
        expect(preview.scrollHeight).toBeLessThanOrEqual(preview.clientHeight);
      }
    }
  });
  it("searches without replacing the current demo and restores focus on Escape", async () => {
    const trigger = page.getByRole("button", {name: "Search components", exact: true});
    await trigger.click();
    const input = page.getByRole("textbox", {name: "Search components", exact: true});
    await expect.element(input).toHaveFocus();
    await userEvent.type(input, "switch");
    await expect.element(page.getByRole("heading", {name: "Button", exact: true})).toBeVisible();
    const popup = page.getByRole("dialog", {name: "Component search"});
    await expect.element(popup.getByRole("link", {name: "Switch", exact: true})).toBeVisible();
    expect(await axeViolations(popup.element())).toEqual([]);
    await userEvent.keyboard("{Escape}");
    await expect.element(trigger).toHaveFocus();
    await expect.element(popup).not.toBeInTheDocument();
  });
  it("navigates to the result with the keyboard", async () => {
    await userEvent.keyboard("{Control>}k{/Control}");
    const input = page.getByRole("textbox", {name: "Search components", exact: true});
    await userEvent.type(input, "  switch  ");
    await userEvent.keyboard("{Enter}");
    await expect.element(page.getByRole("heading", {name: "Switch", exact: true})).toBeVisible();
    await expect.element(page.getByRole("dialog", {name: "Component search"})).not.toBeInTheDocument();
  });
  it("shows an empty result without changing the page and dismisses on outside press", async () => {
    await page.getByRole("button", {name: "Search components", exact: true}).click();
    await userEvent.type(page.getByRole("textbox", {name: "Search components", exact: true}), "not-a-component");
    await expect.element(page.getByRole("status")).toHaveTextContent("No components found. Try a shorter search.");
    await page.getByRole("heading", {name: "Variants", exact: true}).click();
    await expect.element(page.getByRole("dialog", {name: "Component search"})).not.toBeInTheDocument();
    await expect.element(page.getByRole("heading", {name: "Button", exact: true})).toBeVisible();
  });
  it("jumps to an example from the compact selector", async () => {
    await page.viewport(768, 900);
    const selector = page.getByRole("combobox", {name: "Jump to example"});
    await selector.click();
    const popup = page.getByRole("listbox");
    expect(await axeViolations(popup.element())).toEqual([]);
    await page.getByRole("option", {name: "Sizes", exact: true}).click();
    await expect.element(page.getByRole("heading", {name: "Sizes", exact: true})).toBeInViewport();
    await expect.poll(() => page.getByRole("region", {name: "Sizes", exact: true}).element().contains(document.activeElement)).toBe(true);
  });
});

async function axeViolations(element: Element) {
  await Promise.all(element.getAnimations({subtree: true}).map((animation) => animation.finished.catch(() => undefined)));
  const {violations} = await axe.run(element, {runOnly: {type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]}});
  return violations.map((violation) => violation.id);
}
