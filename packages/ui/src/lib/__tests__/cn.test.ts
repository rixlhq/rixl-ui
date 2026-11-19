import {describe, expect, it} from "vitest";
import {cn} from "../cn";

describe("cn", () => {
  it("lets a later standard Tailwind class replace an earlier conflicting one", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("joins conditional class values and drops falsy ones", () => {
    expect(cn("flex", false && "hidden", undefined, ["gap-2", {"items-center": true, "justify-end": false}])).toBe(
      "flex gap-2 items-center"
    );
  });
});
