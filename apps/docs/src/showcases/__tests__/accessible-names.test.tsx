import {act} from "react";
import {createRoot} from "react-dom/client";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";
import {showcases, type ControlValue, type Example} from "../registry";

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  // The sidebar reads the viewport size through matchMedia, which jsdom lacks.
  vi.stubGlobal("matchMedia", (query: string) => ({matches: false, media: query, addEventListener() {}, removeEventListener() {}}));
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function defaultState(example: Example) {
  const state: Record<string, ControlValue> = {};
  for (const control of example.controls ?? []) {
    if (control.defaultValue !== undefined) state[control.name] = control.defaultValue;
  }
  return state;
}

/** The docs are the library's reference usage, so none of them may trigger a missing-name warning. */
describe("docs examples name what the library will not", () => {
  const cases = showcases.flatMap((showcase) => [
    {name: `${showcase.path} (preview)`, render: () => <showcase.Showcase />},
    ...showcase.examples.map((example) => ({
      name: `${showcase.path}/${example.id}`,
      render: () => <example.render state={defaultState(example)} />,
    })),
  ]);

  it.each(cases)("$name renders without a [Rixl ...] warning", async ({render}) => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    await act(async () => root.render(render()));
    const missing = warn.mock.calls.map(([message]) => String(message)).filter((message) => message.startsWith("[Rixl "));
    expect(missing).toEqual([]);
  });
});
