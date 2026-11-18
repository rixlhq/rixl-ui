import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Toaster, toast} from "../toaster";

const THEMES = ["light", "dark"] as const;

function renderToaster(theme: (typeof THEMES)[number], props: Parameters<typeof Toaster>[0] = {}) {
  const view = render(
    <div data-theme={theme} data-testid="theme-root" className="bg-rixl-bg h-96">
      <Toaster closeButton duration={Infinity} {...props} />
    </div>
  );
  return view;
}

// Sonner leaves data-type off a plain toast.
function findToast(type: string) {
  const selector = type === "default" ? "[data-sonner-toast]:not([data-type])" : `[data-sonner-toast][data-type="${type}"]`;
  return document.querySelector<HTMLElement>(selector);
}

/** Resolves a token the way the browser serialises a computed colour, so tests compare like with like. */
function findToastOrThrow(type: string) {
  const element = findToast(type);
  if (!element) throw new Error(`no ${type} toast is open`);
  return element;
}

function resolveColor(token: string, property: "backgroundColor" | "color" | "borderTopColor" = "backgroundColor") {
  const probe = document.createElement("div");
  probe.style[property] = `var(${token})`;
  document.querySelector("[data-testid=theme-root]")!.append(probe);
  const value = getComputedStyle(probe)[property];
  probe.remove();
  return value;
}

function resolveRadius(token: string) {
  const probe = document.createElement("div");
  probe.style.borderTopLeftRadius = `var(${token})`;
  document.querySelector("[data-testid=theme-root]")!.append(probe);
  const value = getComputedStyle(probe).borderTopLeftRadius;
  probe.remove();
  return value;
}

async function openToast(type: "default" | "success" | "error" | "warning" | "info") {
  if (type === "default") toast("Default message");
  else toast[type](`${type} message`);
  await expect.poll(() => findToast(type)).not.toBeNull();
  return findToast(type)!;
}

describe("Toaster Browser Mode", () => {
  afterEach(() => {
    toast.dismiss();
    cleanup();
  });

  for (const theme of THEMES) {
    describe(`in the ${theme} theme`, () => {
      it("colours a default toast from the surface, text and border tokens", async () => {
        renderToaster(theme);
        const style = getComputedStyle(await openToast("default"));
        expect(style.backgroundColor).toBe(resolveColor("--rixl-surface"));
        expect(style.color).toBe(resolveColor("--rixl-fg", "color"));
        expect(style.borderTopColor).toBe(resolveColor("--rixl-border", "borderTopColor"));
      });

      it("gives success, error and warning toasts distinct non-default backgrounds", async () => {
        renderToaster(theme);
        const backgrounds = new Set<string>();
        for (const type of ["default", "success", "error", "warning"] as const) {
          backgrounds.add(getComputedStyle(await openToast(type)).backgroundColor);
        }
        expect(backgrounds.size).toBe(4);
      });

      it("tints success toward green and error toward red", async () => {
        renderToaster(theme);
        // oklab(L a b): a < 0 is green, a > 0 is red. oklch mixing once dragged every hue toward the surface's.
        const redGreenAxis = (type: string) =>
          Number(/oklab\(\S+ (\S+) /.exec(getComputedStyle(findToastOrThrow(type)).backgroundColor)?.[1]);
        await openToast("success");
        await openToast("error");
        expect(redGreenAxis("success")).toBeLessThan(0);
        expect(redGreenAxis("error")).toBeGreaterThan(0);
      });

      it("has no WCAG 2.2 AA violations with a toast of each type open", async () => {
        renderToaster(theme);
        for (const type of ["default", "success", "error", "warning", "info"] as const) {
          await openToast(type);
        }
        toast("With action", {action: {label: "Undo", onClick: () => undefined}, cancel: {label: "Cancel", onClick: () => undefined}});
        await expect.element(page.getByText("Undo")).toBeVisible();
        expect(await axeViolations(document.body)).toEqual([]);
      });
    });
  }

  it("follows a data-theme change without remounting", async () => {
    renderToaster("light");
    const element = await openToast("default");
    const light = getComputedStyle(element).backgroundColor;
    document.querySelector("[data-testid=theme-root]")!.setAttribute("data-theme", "dark");
    expect(getComputedStyle(element).backgroundColor).not.toBe(light);
  });

  it("turns rich colours off when asked", async () => {
    renderToaster("light", {richColors: false});
    const success = getComputedStyle(await openToast("success")).backgroundColor;
    expect(success).toBe(resolveColor("--rixl-surface"));
  });

  it("styles the action button like a small Button", async () => {
    renderToaster("light");
    toast("Archived", {action: {label: "Undo", onClick: () => undefined}});
    await expect.poll(() => document.querySelector("[data-button]")).not.toBeNull();
    const style = getComputedStyle(document.querySelector("[data-button]")!);
    expect(style.height).toBe("32px");
    expect(style.borderTopLeftRadius).toBe(resolveRadius("--rixl-radius-md"));
    expect(style.backgroundColor).toBe(resolveColor("--rixl-primary"));
    expect(style.color).toBe(resolveColor("--rixl-primary-fg", "color"));
  });

  it("styles the cancel button from the secondary tokens", async () => {
    renderToaster("light");
    toast("Archived", {cancel: {label: "Dismiss", onClick: () => undefined}});
    await expect.poll(() => document.querySelector("[data-cancel]")).not.toBeNull();
    const style = getComputedStyle(document.querySelector("[data-cancel]")!);
    expect(style.backgroundColor).toBe(resolveColor("--rixl-secondary"));
  });

  it("shows a focus ring on the keyboard-focused close button and action button", async () => {
    renderToaster("light");
    toast("Archived", {action: {label: "Undo", onClick: () => undefined}});
    await expect.poll(() => document.querySelector("[data-close-button]")).not.toBeNull();
    const close = document.querySelector<HTMLElement>("[data-close-button]")!;
    const action = document.querySelector<HTMLElement>("[data-button]")!;
    await userEvent.tab();
    for (const element of [close, action]) {
      element.focus({focusVisible: true} as FocusOptions);
      expect(element.matches(":focus-visible")).toBe(true);
      // Sonner transitions box-shadow, so wait for it to settle.
      await expect.poll(() => getComputedStyle(element).boxShadow).toContain("0px 0px 0px 3px");
    }
  });
});
