import {flushSync} from "react-dom";
import {createRoot} from "react-dom/client";
import {afterEach, beforeEach, describe, expect, it} from "vite-plus/test";
import {page, userEvent} from "vite-plus/test/browser";
import axe from "axe-core";
import {App} from "../../App";
import {showcases} from "../../showcases/registry";
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
  document.documentElement.removeAttribute("dir");
  localStorage.removeItem("rixl-ui-playground-direction");
});

describe("showcase navigation", () => {
  it("keeps overview tiles square without overflowing previews", async () => {
    window.location.hash = "/";
    await expect.element(page.getByRole("heading", {name: "Components", exact: true})).toBeVisible();
    for (const width of [1440, 768, 390]) {
      await page.viewport(width, 900);
      const cells = [...document.querySelectorAll<HTMLElement>(".docs-demo-cell")];
      expect(cells).toHaveLength(showcases.length);
      for (const cell of cells) {
        const bounds = cell.getBoundingClientRect();
        expect(Math.abs(bounds.width - bounds.height), `${width}px: ${cell.querySelector("a")?.textContent}`).toBeLessThanOrEqual(1);
        const content = cell.querySelector<HTMLElement>(".docs-demo-content")!.getBoundingClientRect();
        expect(Math.abs(content.y + content.height / 2 - bounds.y - bounds.height / 2), "preview center").toBeLessThanOrEqual(1);
        const preview = cell.querySelector<HTMLElement>(".docs-demo-preview")!;
        expect(preview.scrollWidth).toBeLessThanOrEqual(preview.clientWidth);
        expect(preview.scrollHeight).toBeLessThanOrEqual(preview.clientHeight);
      }
    }
  });
  it("moves focus to the component heading after sidebar navigation", async () => {
    await page.viewport(1440, 900);
    await page.getByRole("link", {name: "Checkbox", exact: true}).click();
    await expect.element(page.getByRole("heading", {name: "Checkbox", exact: true})).toHaveFocus();
    await page.getByRole("link", {name: "Overview", exact: true}).click();
    await expect.element(page.getByRole("heading", {name: "Components", exact: true})).toHaveFocus();
  });
  it("focuses the new page after the mobile sidebar closes", async () => {
    await page.viewport(390, 900);
    await page.getByRole("button", {name: "Toggle sidebar", exact: true}).click();
    await page.getByRole("link", {name: "Checkbox", exact: true}).click();
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
    await expect.element(page.getByRole("heading", {name: "Checkbox", exact: true})).toHaveFocus();
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
  it("names the search trigger from its visible text", async () => {
    await page.viewport(1440, 900);
    const trigger = page.getByRole("button", {name: "Search components", exact: true});
    // The rule is experimental, so the WCAG tag set skips it unless it is turned on by id.
    const {violations} = await axe.run(trigger.element(), {
      rules: {"label-content-name-mismatch": {enabled: true}},
      runOnly: ["label-content-name-mismatch"],
    });
    expect(violations.map((violation) => violation.id)).toEqual([]);
  });
  it("navigates to the result with the keyboard", async () => {
    await userEvent.keyboard("{Control>}k{/Control}");
    const input = page.getByRole("textbox", {name: "Search components", exact: true});
    await userEvent.type(input, "  switch  ");
    await userEvent.keyboard("{Enter}");
    await expect.element(page.getByRole("heading", {name: "Switch", exact: true})).toBeVisible();
    await expect.element(page.getByRole("dialog", {name: "Component search"})).not.toBeInTheDocument();
    await expect.element(page.getByRole("heading", {name: "Switch", exact: true})).toHaveFocus();
    await userEvent.keyboard("{Control>}k{/Control}");
    await expect.element(input).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    await expect.element(page.getByRole("button", {name: "Search components", exact: true})).toHaveFocus();
  });
  it("shows an empty result without changing the page and dismisses on outside press", async () => {
    await page.getByRole("button", {name: "Search components", exact: true}).click();
    await userEvent.type(page.getByRole("textbox", {name: "Search components", exact: true}), "not-a-component");
    await expect.element(page.getByRole("status")).toHaveTextContent("No components found. Try a shorter search.");
    await page.getByRole("heading", {name: "Variants", exact: true}).click();
    await expect.element(page.getByRole("dialog", {name: "Component search"})).not.toBeInTheDocument();
    await expect.element(page.getByRole("heading", {name: "Button", exact: true})).toBeVisible();
  });
  it("mirrors the whole page when the direction toggle is set to RTL", async () => {
    await page.viewport(1440, 900);
    const toggle = page.getByRole("button", {name: "RTL layout", exact: true});
    await expect.element(toggle).toHaveAttribute("aria-pressed", "false");
    await toggle.click();
    await expect.element(toggle).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.dir).toBe("rtl");
    const sidebar = document.querySelector("[data-slot='sidebar-container']")!.getBoundingClientRect();
    expect(Math.round(sidebar.right)).toBe(window.innerWidth);
    // axe on the whole page takes over 10 s.
    expect(await axeViolations(toggle.element())).toEqual([]);
    expect(await axeViolations(document.querySelector("[data-slot='sidebar-container']")!)).toEqual([]);
    await toggle.click();
    expect(document.documentElement.dir).toBe("ltr");
  });
  it("keeps the header inside a phone viewport with the direction toggle", async () => {
    await page.viewport(390, 900);
    await expect.element(page.getByRole("button", {name: "RTL layout", exact: true})).toBeVisible();
    expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
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
  it("lists the providers in their own sidebar group, apart from the components", async () => {
    await page.viewport(1280, 900);
    const groupLinks = (label: string) => {
      const group = [...document.querySelectorAll("[data-slot='sidebar-group']")].find((el) => el.firstElementChild?.textContent === label);
      return [...(group?.querySelectorAll("a") ?? [])].map((a) => a.textContent);
    };
    await expect.poll(() => groupLinks("Components").length).toBeGreaterThan(0);
    expect(groupLinks("Providers")).toEqual(["Direction", "Locale"]);
    expect(groupLinks("Components")).not.toContain("Direction");
    expect(groupLinks("Components")).not.toContain("Locale");
  });
});

async function axeViolations(element: Element) {
  await Promise.all(element.getAnimations({subtree: true}).map((animation) => animation.finished.catch(() => undefined)));
  const {violations} = await axe.run(element, {runOnly: {type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]}});
  return violations.map((violation) => violation.id);
}
