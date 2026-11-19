import {afterEach, describe, it, expect, vi} from "vitest";
import {act, fireEvent, render, screen} from "@testing-library/react";
import {Tooltip, TooltipProvider} from "../tooltip";

function content() {
  return document.querySelector<HTMLElement>("[data-slot=tooltip-content]");
}

function Basic(props: Partial<React.ComponentProps<typeof Tooltip>> = {}) {
  return (
    <Tooltip content="Hello" render={<button type="button" data-testid="trigger" />} {...props}>
      Trigger
    </Tooltip>
  );
}

async function renderOpen(props: Partial<React.ComponentProps<typeof Tooltip>> = {}) {
  render(<Basic defaultOpen {...props} />);
  await act(async () => {});
}

describe("Tooltip", () => {
  it("renders its children inside the trigger element", () => {
    render(<Basic />);
    expect(screen.getByTestId("trigger")).toHaveTextContent("Trigger");
  });

  it("sets data-slot='tooltip-trigger' on the trigger", () => {
    render(<Basic />);
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-slot", "tooltip-trigger");
  });

  it("falls back to a button trigger when no render element is given", () => {
    render(<Tooltip content="Hello">Trigger</Tooltip>);
    expect(screen.getByRole("button", {name: "Trigger"})).toBeInTheDocument();
  });

  it("does not render content while closed", () => {
    render(<Basic />);
    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("renders the content when open", async () => {
    await renderOpen();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("sets data-slot='tooltip-content' on the popup", async () => {
    await renderOpen();
    expect(content()).toHaveTextContent("Hello");
  });

  it("applies base classes to the popup", async () => {
    await renderOpen();
    const cls = content()!.className;
    expect(cls).toContain("bg-rixl-primary");
    expect(cls).toContain("text-rixl-primary-fg");
    expect(cls).toContain("rounded-md");
  });

  it("skips transition duration when data-instant is present", async () => {
    await renderOpen();
    const cls = content()!.className;
    expect(cls).toContain("data-instant:duration-0");
    expect(cls).toContain("data-starting-style:scale-[0.97]");
    expect(cls).not.toContain("data-open:animate-in");
  });

  it("enters and exits at a barely-there scale", async () => {
    await renderOpen();
    const cls = content()!.className;
    expect(cls).toContain("data-ending-style:scale-[0.97]");
    expect(cls).not.toContain("scale-95");
  });

  it("places the popup on the requested side", async () => {
    await renderOpen({side: "bottom"});
    expect(content()).toHaveAttribute("data-side", "bottom");
  });

  it("aligns the popup to the requested edge", async () => {
    await renderOpen({align: "end"});
    expect(content()).toHaveAttribute("data-align", "end");
  });

  it("positions the arrow with logical sides in RTL", async () => {
    render(
      <div dir="rtl">
        <Basic open side="inline-end" />
      </div>
    );
    await act(async () => {});
    const arrow = content()?.lastElementChild;
    expect(arrow?.getAttribute("class")).toContain("data-[side=inline-end]:-start-1");
    expect(arrow?.getAttribute("class")).toContain("data-[side=inline-start]:-end-1");
  });

  it("merges className onto the trigger, not the popup", async () => {
    await renderOpen({className: "text-red-500"});
    expect(screen.getByTestId("trigger")).toHaveClass("text-red-500");
  });

  it("respects a controlled `open` prop", async () => {
    render(<Basic open />);
    await act(async () => {});
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("never opens while disabled", async () => {
    render(<Basic open disabled />);
    await act(async () => {});
    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("reports open changes to onOpenChange", () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    render(<Basic onOpenChange={onOpenChange} delay={0} />);
    fireEvent.focus(screen.getByTestId("trigger"));
    act(() => {
      vi.runAllTimers();
    });
    vi.useRealTimers();
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("TooltipProvider renders no element of its own", () => {
    const {container} = render(
      <TooltipProvider delay={0}>
        <span>child</span>
      </TooltipProvider>
    );
    expect(container.firstElementChild?.tagName).toBe("SPAN");
  });
});

describe("Tooltip delay", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  function hoverFor(delayProps: {provider?: number; trigger?: number}) {
    vi.useFakeTimers();
    const tooltip = <Basic delay={delayProps.trigger} />;
    render(delayProps.provider === undefined ? tooltip : <TooltipProvider delay={delayProps.provider}>{tooltip}</TooltipProvider>);
    fireEvent.mouseEnter(screen.getByTestId("trigger"));
    fireEvent.mouseMove(screen.getByTestId("trigger"));
  }

  it("waits for the delay of an app-level TooltipProvider", () => {
    hoverFor({provider: 300});
    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("opens once the app-level TooltipProvider delay has elapsed", () => {
    hoverFor({provider: 300});
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("lets the tooltip's own delay override the provider's", () => {
    hoverFor({provider: 300, trigger: 50});
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("does not open instantly when no provider delay is set", () => {
    hoverFor({});
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });
});
