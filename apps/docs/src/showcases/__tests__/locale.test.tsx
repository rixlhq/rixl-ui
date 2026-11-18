import {act} from "react";
import {createRoot} from "react-dom/client";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";
import {examples} from "../locale";

const SwitchExample = examples[0].render;
let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

async function renderLocale(locale: string) {
  await act(async () => root.render(<SwitchExample state={{locale}} />));
}

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe("locale showcase", () => {
  it("shows the chosen locale's strings and the English default", async () => {
    await renderLocale("fr");
    expect(container.textContent).toContain("(facultatif)");
    await renderLocale("en");
    expect(container.textContent).toContain("(optional)");
  });

  it("names the breadcrumb landmark in the chosen locale", async () => {
    await renderLocale("fr");
    expect(container.querySelector('nav[aria-label="fil d\'Ariane"]')).not.toBeNull();
  });

  it("leaves unset keys in English", async () => {
    await renderLocale("de");
    expect(container.querySelector('[aria-label="Go to last page"]')).not.toBeNull();
  });
});
