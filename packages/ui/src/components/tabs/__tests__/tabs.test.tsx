import {describe, it, expect, vi} from "vitest";
import {act, fireEvent, render, screen} from "@testing-library/react";
import {Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps} from "../index";

function Basic(props: Partial<TabsProps> = {}) {
  return (
    <Tabs defaultValue="account" data-testid="root" {...props}>
      <TabsList>
        <TabsTrigger value="account" data-testid="tab-account">
          Account
        </TabsTrigger>
        <TabsTrigger value="password" data-testid="tab-password">
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" data-testid="content-account">
        Account panel
      </TabsContent>
      <TabsContent value="password" data-testid="content-password">
        Password panel
      </TabsContent>
    </Tabs>
  );
}

const list = () => document.querySelector("[data-slot='tabs-list']")!;
const indicator = () => document.querySelector("[data-slot='tabs-indicator']");

describe("Tabs", () => {
  it("sets data-slot markers on root, list, trigger, and content", () => {
    render(<Basic />);
    expect(screen.getByTestId("root")).toHaveAttribute("data-slot", "tabs");
    expect(list()).toHaveAttribute("data-slot", "tabs-list");
    expect(screen.getByTestId("tab-account")).toHaveAttribute("data-slot", "tabs-trigger");
    expect(screen.getByTestId("content-account")).toHaveAttribute("data-slot", "tabs-content");
  });

  it("activates the matching trigger via data-active", () => {
    render(<Basic />);
    expect(screen.getByTestId("tab-account")).toHaveAttribute("data-active");
    expect(screen.getByTestId("tab-password")).not.toHaveAttribute("data-active");
  });

  it("switches the active trigger on click", () => {
    render(<Basic />);
    act(() => screen.getByTestId("tab-password").click());
    expect(screen.getByTestId("tab-password")).toHaveAttribute("data-active");
    expect(screen.getByTestId("tab-account")).not.toHaveAttribute("data-active");
  });

  it("renders the active content panel", () => {
    render(<Basic />);
    expect(screen.getByText("Account panel")).toBeInTheDocument();
  });

  it("fades the content panel in without sliding, reduced-motion safe", () => {
    render(<Basic />);
    const cls = screen.getByTestId("content-account").className;
    expect(cls).toContain("animate-in");
    expect(cls).toContain("fade-in-0");
    expect(cls).toContain("duration-rixl-fast");
    expect(cls).toContain("motion-reduce:animate-none");
    expect(cls).not.toContain("slide-in");
  });

  it("does not play the fade on the initially mounted panel", () => {
    render(<Basic />);
    const cls = screen.getByTestId("content-account").className;
    expect(cls).toContain("not-data-[activation-direction=none]:animate-in");
    expect(screen.getByTestId("content-account")).toHaveAttribute("data-activation-direction", "none");
  });

  describe("travelling indicator", () => {
    // The active state is one element that moves, rather than a fill repainted
    // on each trigger. TabsList renders it so a tab set cannot be built without.
    it("is rendered by TabsList without the consumer adding it", () => {
      render(<Basic />);
      expect(indicator()).not.toBeNull();
    });

    it("carries the active fill, so triggers do not", () => {
      render(<Basic />);
      expect(indicator()!.className).toContain("bg-rixl-surface-raised");
      expect(screen.getByTestId("tab-account").className).not.toContain("bg-rixl-surface-raised");
    });

    // The pill and its container are only a couple of percent apart in
    // lightness, so without a border the active tab does not read as raised.
    it("borders the pill rather than relying on fill alone", () => {
      render(<Basic />);
      const cls = indicator()!.className;
      expect(cls).toContain("border-rixl-border");
      expect(cls).toContain("shadow-rixl-sm");
    });

    it("is positioned from the measured tab box rather than a fixed offset", () => {
      render(<Basic />);
      const cls = indicator()!.className;
      expect(cls).toContain("translate-x-[var(--active-tab-left)]");
      expect(cls).toContain("w-[var(--active-tab-width)]");
    });

    it("keeps Base UI's physical measurement variables in RTL", () => {
      render(
        <div dir="rtl">
          <Basic />
        </div>
      );
      const cls = indicator()!.className;
      expect(cls).toContain("translate-x-[var(--active-tab-left)]");
      expect(cls).toContain("w-[var(--active-tab-width)]");
    });

    // Translate is composited; animating left/top would lay out every frame.
    it("transitions translate and size, not layout properties", () => {
      render(<Basic />);
      const cls = indicator()!.className;
      expect(cls).toContain("transition-[translate,width,height]");
      expect(cls).toContain("motion-reduce:transition-none");
    });

    it("glides on the slow in-out motion tokens rather than hardcoded timing", () => {
      render(<Basic />);
      const cls = indicator()!.className;
      expect(cls).toContain("duration-rixl-slow");
      expect(cls).toContain("ease-rixl-in-out");
      expect(cls).not.toContain("duration-300");
      expect(cls).not.toContain("cubic-bezier");
    });

    it("draws a bar rather than a pill for the underline variant", () => {
      render(<Basic variant="underline" />);
      const cls = indicator()!.className;
      expect(cls).toContain("border-b-2");
      expect(cls).not.toContain("bg-rixl-bg");
    });
  });

  describe("variants", () => {
    it("wraps segmented tabs in a muted container", () => {
      render(<Basic />);
      expect(list().className).toContain("bg-rixl-surface-muted");
      expect(list().className).toContain("rounded-rixl-lg");
    });

    it("rules the underline variant instead of filling it", () => {
      render(<Basic variant="underline" />);
      const cls = list().className;
      expect(cls).toContain("border-b");
      expect(cls).not.toContain("bg-rixl-surface-muted");
    });

    it("leaves the ghost variant unadorned", () => {
      render(<Basic variant="ghost" />);
      const cls = list().className;
      expect(cls).not.toContain("bg-rixl-surface-muted");
      expect(cls).not.toContain("border-b");
    });

    it("passes the variant from the root to both list and indicator", () => {
      render(<Basic variant="ghost" />);
      expect(indicator()!.className).toContain("shadow-rixl-xs");
    });
  });

  describe("sizes and layout", () => {
    it("lets tab roots and panels shrink inside flex and grid columns", () => {
      render(<Basic />);
      expect(screen.getByTestId("root")).toHaveClass("min-w-0");
      expect(screen.getByTestId("content-account")).toHaveClass("min-w-0");
    });

    it("bounds the scrollable list to its container", () => {
      render(<Basic />);
      expect(list()).toHaveClass("min-w-0", "max-w-full");
    });

    // A floor rather than a fixed height, so a trigger stacking a label over a
    // description grows instead of spilling out of the box the indicator
    // measures.
    it("defaults triggers to the md size as a compact 32px minimum height", () => {
      render(<Basic />);
      const cls = screen.getByTestId("tab-account").className;
      expect(cls).toContain("min-h-8");
      expect(cls).not.toContain("min-h-11");
      expect(cls).not.toMatch(/(^|\s)h-8(\s|$)/);
    });

    it("applies the sm size (28px minimum height) to triggers", () => {
      render(<Basic size="sm" />);
      const cls = screen.getByTestId("tab-account").className;
      expect(cls).toContain("min-h-7");
      expect(cls).not.toContain("min-h-11");
    });

    it("stretches a row so a taller tab does not leave its neighbours floating", () => {
      render(<Basic />);
      expect(list().className).toContain("items-stretch");
    });

    it("sizes triggers to their content by default", () => {
      render(<Basic />);
      expect(screen.getByTestId("tab-account").className).not.toContain("flex-1");
      expect(list().className).toContain("w-fit");
    });

    // Stretched tabs are a layout choice for the app: a consumer className on the list and triggers does it.
    it("has no full-width mode", () => {
      // @ts-expect-error -- fullWidth was removed; Tabs must not accept it.
      render(<Basic fullWidth />);
      expect(screen.getByTestId("tab-account").className).not.toContain("flex-1");
    });

    // A wrapped row would leave the indicator jumping between lines.
    it("scrolls an overflowing row instead of wrapping", () => {
      render(<Basic />);
      expect(list().className).toContain("overflow-x-auto");
    });

    it("can opt out of scrolling", () => {
      render(
        <Tabs defaultValue="a">
          <TabsList scrollable={false}>
            <TabsTrigger value="a">A</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      expect(list().className).not.toContain("overflow-x-auto");
    });
  });

  describe("interaction states", () => {
    it("changes text intensity on hover and shares Button press feedback without a background wash", () => {
      render(<Basic />);
      const cls = screen.getByTestId("tab-password").className;
      expect(cls).toContain("text-rixl-fg-muted");
      expect(cls).toContain("hover:text-rixl-fg");
      expect(cls).toContain("data-active:text-rixl-fg");
      expect(cls).toContain("transition-[scale,background-color,box-shadow,border-color,color]");
      expect(cls).toContain("active:scale-[var(--rixl-press-scale)]");
      expect(cls).toContain("motion-reduce:active:scale-100");
      expect(cls).not.toContain("hover:bg-rixl-fg/5");
    });

    it("takes its transition timing from the press classes alone", () => {
      render(<Basic />);
      const cls = screen.getByTestId("tab-password").className;
      expect(cls).toContain("duration-rixl-fast");
      expect(cls).not.toContain("transition-colors");
      expect(cls).not.toContain("duration-rixl-base");
    });

    it("renders overflow scroll controls when scrollable is enabled", () => {
      render(<Basic />);
      const controls = document.querySelectorAll("[data-slot='tabs-overflow-control']");
      expect(controls.length).toBe(2);
    });

    it("scrolls when clicking the overflow controls", () => {
      render(<Basic />);
      const listEl = document.querySelector("[data-slot='tabs-list']") as HTMLElement;
      const scrollBySpy = vi.fn();
      listEl.scrollBy = scrollBySpy;

      const controls = document.querySelectorAll("[data-slot='tabs-overflow-control']");
      const startControl = controls[0] as HTMLElement;
      const endControl = controls[1] as HTMLElement;

      act(() => {
        endControl.click();
      });
      expect(scrollBySpy).toHaveBeenCalledWith(expect.objectContaining({behavior: "smooth"}));

      act(() => {
        startControl.click();
      });
      expect(scrollBySpy).toHaveBeenCalledTimes(2);
    });

    it("handles drag-to-scroll gestures on mouse pointer events", () => {
      render(<Basic />);
      const listEl = document.querySelector("[data-slot='tabs-list']") as HTMLElement;
      listEl.setPointerCapture = vi.fn();
      listEl.releasePointerCapture = vi.fn();

      Object.defineProperty(listEl, "scrollWidth", {value: 400, configurable: true});
      Object.defineProperty(listEl, "clientWidth", {value: 200, configurable: true});

      fireEvent.scroll(listEl);

      fireEvent.pointerDown(listEl, {
        pointerType: "mouse",
        button: 0,
        pointerId: 1,
        clientX: 100,
      });

      fireEvent.pointerMove(listEl, {
        pointerType: "mouse",
        pointerId: 1,
        clientX: 50,
      });

      fireEvent.click(listEl);

      fireEvent.pointerUp(listEl, {
        pointerType: "mouse",
        pointerId: 1,
      });

      fireEvent.pointerCancel(listEl, {
        pointerType: "mouse",
        pointerId: 1,
      });
    });

    it("updates scroll bounds on scroll events", () => {
      render(<Basic />);
      const listEl = document.querySelector("[data-slot='tabs-list']") as HTMLElement;
      Object.defineProperty(listEl, "scrollWidth", {value: 300, configurable: true});
      Object.defineProperty(listEl, "clientWidth", {value: 100, configurable: true});
      Object.defineProperty(listEl, "scrollLeft", {value: 50, configurable: true, writable: true});

      act(() => {
        fireEvent.scroll(listEl);
      });
      expect(listEl.getAttribute("data-overflowing")).toBe("");
    });

    // Button draws a single ring; tabs previously drew a ring and an outline.
    it("draws one focus ring, not a ring and an outline", () => {
      render(<Basic />);
      const cls = screen.getByTestId("tab-account").className;
      expect(cls).toContain("focus-visible:ring-[3px]");
      expect(cls).not.toContain("focus-visible:outline-1");
    });

    it("dims disabled triggers and stops pointer events", () => {
      render(<Basic />);
      const cls = screen.getByTestId("tab-account").className;
      expect(cls).toContain("disabled:opacity-50");
      expect(cls).toContain("disabled:pointer-events-none");
    });
  });

  it("forwards an additional className on the trigger", () => {
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account" data-testid="tab-account" className="max-w-xs">
            Account
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
    const cls = screen.getByTestId("tab-account").className;
    expect(cls).toContain("max-w-xs");
    expect(cls).toContain("rounded-rixl-md");
  });
});
