import {act, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {CopyBlock} from "../copy-block";

describe("CopyBlock outcomes", () => {
  it("waits for clipboard confirmation", async () => {
    let finish: (() => void) | undefined;
    const pending = new Promise<void>((resolve) => {
      finish = resolve;
    });
    vi.stubGlobal("navigator", {...navigator, clipboard: {writeText: () => pending}});
    render(<CopyBlock title="Code" text="abc" />);
    act(() => screen.getByRole("button").click());
    expect(document.querySelector('[data-copied="true"]')).toBeNull();
    await act(async () => {
      finish?.();
      await pending;
    });
    expect(document.querySelector('[data-copied="true"]')).toBeInTheDocument();
  });

  it("shows no success and announces nothing when the copy fails", async () => {
    vi.stubGlobal("navigator", {...navigator, clipboard: {writeText: vi.fn().mockRejectedValue(new Error("Denied"))}});
    render(<CopyBlock title="Code" text="abc" />);
    await act(async () => screen.getByRole("button").click());
    expect(document.querySelector('[data-copied="true"]')).toBeNull();
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("lets the button try again after a failed copy", async () => {
    vi.stubGlobal("navigator", {...navigator, clipboard: {writeText: vi.fn().mockRejectedValue(new Error("Denied"))}});
    render(<CopyBlock title="Code" text="abc" />);
    await act(async () => screen.getByRole("button").click());
    expect(screen.getByRole("button")).toBeEnabled();
  });
});
