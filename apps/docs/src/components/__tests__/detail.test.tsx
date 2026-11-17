import {act} from "react";
import {createRoot} from "react-dom/client";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";
import {Detail} from "../detail";
import type {Showcase} from "../../showcases/registry";

function Demo() {
  return <input aria-label="Example value" defaultValue="Initial" />;
}
const showcase: Showcase = {
  path: "button",
  title: "Button",
  Showcase: Demo,
  examples: [
    {id: "first", title: "First", render: Demo, controls: [{type: "boolean", name: "disabled", label: "Disabled"}]},
    {id: "second", title: "Second", render: Demo, controls: [{type: "boolean", name: "disabled", label: "Disabled"}]},
  ],
};
let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
beforeEach(async () => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root.render(<Detail showcase={showcase} />));
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});
describe("example playground", () => {
  it("does not add reset actions to the demo toolbar", () => {
    expect(container.querySelector('button[aria-label^="Reset"]')).toBeNull();
  });
  it("offers an example selector alongside the full example list", () => {
    expect(container.querySelector('button[aria-label="Jump to example"]')).not.toBeNull();
  });
  it("gives controls unique label targets across examples", () => {
    const labels = [...container.querySelectorAll("label")];
    const targets = labels.map((label) => label.htmlFor);
    expect(targets.length).toBe(2);
    expect(new Set(targets).size).toBe(2);
    expect(targets.every((id) => document.getElementById(id))).toBe(true);
  });
});
