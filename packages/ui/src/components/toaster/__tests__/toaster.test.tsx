import {describe, it, expect} from "vitest";
import {render} from "@testing-library/react";
import {Toaster, toast} from "../toaster";

describe("Toaster", () => {
  it("renders the sonner Toaster without error", () => {
    render(<Toaster />);
    // Sonner Toaster only renders visible content when toasts are present;
    // we just verify it mounts without throwing.
  });

  it("toast() returns a toast id", () => {
    const id = toast("Hello");
    expect(typeof id).toMatch(/string|number/);
  });
});
