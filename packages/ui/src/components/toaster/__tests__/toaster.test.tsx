import {describe, it, expect, afterEach} from "vitest";
import {render, screen, act, cleanup} from "@testing-library/react";
import {Toaster, toast} from "../toaster";

afterEach(() => {
  act(() => {
    toast.dismiss();
  });
  cleanup();
});

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

  it("enables rich colours by default", async () => {
    render(<Toaster />);
    act(() => {
      toast.success("Saved");
    });
    expect((await screen.findByText("Saved")).closest("[data-sonner-toast]")).toHaveAttribute("data-rich-colors", "true");
  });

  it("lets a consumer turn rich colours off", async () => {
    render(<Toaster richColors={false} />);
    act(() => {
      toast.success("Saved");
    });
    expect((await screen.findByText("Saved")).closest("[data-sonner-toast]")).toHaveAttribute("data-rich-colors", "false");
  });

  it("keeps the default classes of other parts when a consumer styles one part", async () => {
    render(<Toaster toastOptions={{classNames: {actionButton: "consumer-action"}}} />);
    act(() => {
      toast("Archived", {action: {label: "Undo", onClick: () => undefined}, cancel: {label: "Keep", onClick: () => undefined}});
    });
    expect(await screen.findByText("Undo")).toHaveClass("consumer-action");
    expect(screen.getByText("Keep")).toHaveClass("bg-rixl-secondary!");
  });

  it("lets a consumer class win over a conflicting default on the same part", async () => {
    render(<Toaster toastOptions={{classNames: {actionButton: "bg-rixl-danger!"}}} />);
    act(() => {
      toast("Archived", {action: {label: "Undo", onClick: () => undefined}});
    });
    const action = await screen.findByText("Undo");
    expect(action).toHaveClass("bg-rixl-danger!");
    expect(action).not.toHaveClass("bg-rixl-primary!");
  });
});
