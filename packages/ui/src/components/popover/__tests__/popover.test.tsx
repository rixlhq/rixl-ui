import {describe, it, expect} from "vitest";
import {useState} from "react";
import {act, render, screen} from "@testing-library/react";
import {Popover, PopoverContent, PopoverTrigger} from "../popover";

function Basic({defaultOpen}: {defaultOpen?: boolean} = {}) {
  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger data-testid="trigger" render={<button type="button">Open</button>} />
      <PopoverContent data-testid="content">Panel</PopoverContent>
    </Popover>
  );
}

function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger data-testid="trigger" render={<button type="button">Toggle</button>} />
      <PopoverContent data-testid="content">Panel</PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("sets data-slot='popover-trigger' on the trigger", () => {
    render(<Basic />);
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-slot", "popover-trigger");
  });

  it("does not render content while closed", () => {
    render(<Basic />);
    expect(screen.queryByText("Panel")).not.toBeInTheDocument();
  });

  it("renders content when default open", async () => {
    render(<Basic defaultOpen />);
    await act(async () => {});
    expect(screen.getByText("Panel")).toBeInTheDocument();
  });

  it("sets data-slot='popover-content' on the popup", async () => {
    render(<Basic defaultOpen />);
    await act(async () => {});
    expect(screen.getByTestId("content")).toHaveAttribute("data-slot", "popover-content");
  });

  it("applies base classes to the popup", async () => {
    render(<Basic defaultOpen />);
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("bg-rixl-surface");
    expect(cls).toContain("text-rixl-fg");
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("rounded-rixl-md");
    expect(cls).toContain("shadow-rixl-md");
    expect(cls).toContain("w-72");
  });

  it("forwards additional className without dropping base classes", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger render={<button type="button">Open</button>} />
        <PopoverContent data-testid="content" className="max-w-xs">
          Panel
        </PopoverContent>
      </Popover>
    );
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("max-w-xs");
    expect(cls).toContain("bg-rixl-surface");
  });

  it("closes when controlled and Escape is pressed", async () => {
    render(<Controlled />);
    const trigger = screen.getByTestId("trigger");
    act(() => trigger.click());
    await act(async () => {});
    expect(screen.getByTestId("content")).toBeInTheDocument();
    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape", bubbles: true}));
    });
    await act(async () => {});
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });
});
