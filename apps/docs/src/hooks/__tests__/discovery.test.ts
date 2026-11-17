import {describe, expect, it} from "vite-plus/test";
import {matchesShowcase} from "../use-hash-route";

const button = {path: "button", title: "Button", description: "Trigger an action", Showcase: () => null};
describe("component discovery", () => {
  it("ignores surrounding whitespace in search", () => {
    expect(matchesShowcase(button, "  BUTTON  ")).toBe(true);
  });
});
