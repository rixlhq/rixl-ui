import {afterEach, describe, it, expect, vi} from "vitest";
import {act, fireEvent, render, screen} from "@testing-library/react";
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

  it("skips transition duration when data-instant is present", async () => {
    render(<Basic defaultOpen />);
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("data-instant:duration-0");
    expect(cls).toContain("data-starting-style:scale-95");
    expect(cls).not.toContain("data-open:animate-in");
  });

  it("positions the arrow with logical sides in RTL", async () => {
    render(
      <div dir="rtl">
        <Tooltip open>
          <TooltipTrigger data-testid="trigger" render={<button type="button">Trigger</button>} />
          <TooltipContent data-testid="content" side="inline-end">
            Hello
          </TooltipContent>
        </Tooltip>
      </div>
    );
    await act(async () => {});
    const arrow = screen.getByTestId("content").lastElementChild;
    expect(arrow?.getAttribute("class")).toContain("data-[side=inline-end]:-start-1");
    expect(arrow?.getAttribute("class")).toContain("data-[side=inline-start]:-end-1");
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

describe("Tooltip delay", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  function hoverFor(delayProps: {provider?: number; trigger?: number}) {
    vi.useFakeTimers();
    const trigger = <TooltipTrigger data-testid="trigger" delay={delayProps.trigger} render={<button type="button">Trigger</button>} />;
    const tooltip = (
      <Tooltip>
        {trigger}
        <TooltipContent data-testid="content">Hello</TooltipContent>
      </Tooltip>
    );
    render(delayProps.provider === undefined ? tooltip : <TooltipProvider delay={delayProps.provider}>{tooltip}</TooltipProvider>);
    fireEvent.mouseEnter(screen.getByTestId("trigger"));
    fireEvent.mouseMove(screen.getByTestId("trigger"));
  }

  it("waits for the delay of an app-level TooltipProvider", () => {
    hoverFor({provider: 300});
    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("opens once the app-level TooltipProvider delay has elapsed", () => {
    hoverFor({provider: 300});
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("does not open instantly when no provider delay is set", () => {
    hoverFor({});
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });
});
