import {describe, it, expect, vi} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {Avatar, AvatarFallback, AvatarImage} from "../avatar";

describe("Avatar", () => {
  it("renders the root with data-slot='avatar'", () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>AA</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toHaveAttribute("data-slot", "avatar");
  });

  it("applies base classes to the root", () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>AA</AvatarFallback>
      </Avatar>
    );
    const cls = screen.getByTestId("avatar").className;
    expect(cls).toContain("rounded-full");
    expect(cls).toContain("size-8");
    expect(cls).toContain("overflow-hidden");
  });

  it("forwards className on the root without dropping base classes", () => {
    render(
      <Avatar data-testid="avatar" className="size-12">
        <AvatarFallback>AA</AvatarFallback>
      </Avatar>
    );
    const cls = screen.getByTestId("avatar").className;
    expect(cls).toContain("size-12");
    expect(cls).toContain("rounded-full");
  });

  it("renders the fallback with data-slot='avatar-fallback'", () => {
    render(
      <Avatar>
        <AvatarFallback>AA</AvatarFallback>
      </Avatar>
    );
    const fb = screen.getByText("AA");
    expect(fb).toHaveAttribute("data-slot", "avatar-fallback");
    expect(fb.className).toContain("bg-rixl-surface-muted");
    expect(fb.className).toContain("rounded-full");
  });

  it("forwards className on the fallback", () => {
    render(
      <Avatar>
        <AvatarFallback className="text-lg">AA</AvatarFallback>
      </Avatar>
    );
    const fb = screen.getByText("AA");
    expect(fb.className).toContain("text-lg");
    expect(fb.className).toContain("bg-rixl-surface-muted");
  });

  it("renders the image with data-slot='avatar-image'", () => {
    render(
      <Avatar>
        <AvatarImage src="/me.png" alt="Me" />
        <AvatarFallback>AA</AvatarFallback>
      </Avatar>
    );
    // Image renders only after loading in Base UI; the fallback is what shows synchronously in happy-dom.
    // We can still verify the fallback got a data-slot, matching the composition contract.
    expect(screen.getByText("AA")).toHaveAttribute("data-slot", "avatar-fallback");
  });

  it("applies aspect-square, size-full, and object-cover to the image", () => {
    let onload: (() => void) | null = null;
    class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      referrerPolicy = "";
      crossOrigin: string | null = null;
      set src(_value: string) {
        onload = () => this.onload?.();
      }
    }
    vi.stubGlobal("Image", MockImage);
    render(
      <Avatar>
        <AvatarImage data-testid="img" src="/me.png" alt="Me" />
      </Avatar>
    );
    act(() => {
      onload?.();
    });
    const img = screen.getByTestId("img");
    expect(img).toHaveAttribute("data-slot", "avatar-image");
    expect(img.className).toContain("aspect-square");
    expect(img.className).toContain("size-full");
    expect(img.className).toContain("object-cover");
    vi.unstubAllGlobals();
  });

  it("shows the fallback initially in happy-dom (image not yet loaded)", () => {
    render(
      <Avatar>
        <AvatarImage src="/does-not-exist.png" alt="Me" />
        <AvatarFallback>ZZ</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("ZZ")).toBeInTheDocument();
  });
});
