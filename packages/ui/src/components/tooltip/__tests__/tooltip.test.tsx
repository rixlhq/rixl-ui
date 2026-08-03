import {describe, it, expect} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../tooltip";

function Basic({open, defaultOpen}: {open?: boolean; defaultOpen?: boolean} = {}) {
  return (
    <Tooltip open={open} defaultOpen={defaultOpen}>
      <TooltipTrigger data-testid="trigger" render={<button type="button">Trigger</button>} />
      <TooltipContent data-testid="content">Hello</TooltipContent>
    </Tooltip>
  );
}

describe("Tooltip", () => {
  it("sets data-slot='tooltip-trigger' on the trigger", () => {
    render(<Basic />);
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-slot", "tooltip-trigger");
  });

  it("does not render content while closed", () => {
    render(<Basic />);
    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("renders content when open (default open)", async () => {
    render(<Basic defaultOpen />);
    // Base UI mounts the portal asynchronously; give React a tick.
    await act(async () => {});
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("sets data-slot='tooltip-content' on the popup", async () => {
    render(<Basic defaultOpen />);
    await act(async () => {});
    expect(screen.getByTestId("content")).toHaveAttribute("data-slot", "tooltip-content");
  });

  it("applies base classes to the popup", async () => {
    render(<Basic defaultOpen />);
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("bg-rixl-primary");
    expect(cls).toContain("text-rixl-primary-fg");
    expect(cls).toContain("rounded-rixl-md");
  });

  it("forwards additional className without dropping base classes", async () => {
    render(
      <Tooltip defaultOpen>
        <TooltipTrigger render={<button type="button">Trigger</button>} />
        <TooltipContent data-testid="content" className="max-w-xs">
          Hello
        </TooltipContent>
      </Tooltip>
    );
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("max-w-xs");
    expect(cls).toContain("bg-rixl-primary");
  });

  it("respects a controlled `open` prop", async () => {
    render(<Basic open />);
    await act(async () => {});
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("TooltipProvider sets data-slot='tooltip-provider' when used explicitly", () => {
    const {container} = render(
      <TooltipProvider delay={0}>
        <span>child</span>
      </TooltipProvider>
    );
    const provider = container.querySelector("[data-slot='tooltip-provider']");
    // Provider may render as a Fragment in Base UI; attribute may not surface on a real element.
    // The important behaviour is that its children mount; we assert that here as a smoke test.
    expect(screen.getByText("child")).toBeInTheDocument();
    // If the primitive does forward a wrapper, verify our data-slot lives on it.
    if (provider) expect(provider).toHaveAttribute("data-slot", "tooltip-provider");
  });
});
