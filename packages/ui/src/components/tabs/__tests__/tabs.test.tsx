import {describe, it, expect} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps} from "../tabs";

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

    // Translate is composited; animating left/top would lay out every frame.
    it("transitions translate and size, not layout properties", () => {
      render(<Basic />);
      const cls = indicator()!.className;
      expect(cls).toContain("transition-[translate,width,height]");
      expect(cls).toContain("motion-reduce:transition-none");
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
    it("defaults triggers to the md size", () => {
      render(<Basic />);
      expect(screen.getByTestId("tab-account").className).toContain("h-8");
    });

    it("applies the sm size to triggers", () => {
      render(<Basic size="sm" />);
      expect(screen.getByTestId("tab-account").className).toContain("h-7");
    });

    it("sizes triggers to their content by default", () => {
      render(<Basic />);
      expect(screen.getByTestId("tab-account").className).not.toContain("flex-1");
      expect(list().className).toContain("w-fit");
    });

    it("distributes triggers evenly when fullWidth is set", () => {
      render(<Basic fullWidth />);
      expect(screen.getByTestId("tab-account").className).toContain("flex-1");
      expect(list().className).toContain("w-full");
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
    it("presses with the scale token shared with Button", () => {
      render(<Basic />);
      const cls = screen.getByTestId("tab-account").className;
      expect(cls).toContain("active:scale-[var(--rixl-press-scale)]");
      expect(cls).toContain("motion-reduce:active:scale-100");
    });

    // A text-colour change alone was too weak to notice; inactive tabs also
    // take a foreground wash, suppressed on the active tab which has the pill.
    it("washes inactive triggers on hover, not only their text", () => {
      render(<Basic />);
      const cls = screen.getByTestId("tab-password").className;
      expect(cls).toContain("hover:bg-rixl-fg/5");
      expect(cls).toContain("hover:text-rixl-fg");
      expect(cls).toContain("data-active:bg-transparent");
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
