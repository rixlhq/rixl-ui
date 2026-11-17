import {describe, it, expect} from "vitest";
import {useState} from "react";
import {act, render, screen} from "@testing-library/react";
import {Collapsible, CollapsibleTrigger, CollapsibleContent, CollapsibleDefaultTrigger, CollapsibleDefaultPanel} from "../collapsible";

function Basic({defaultOpen}: {defaultOpen?: boolean} = {}) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger data-testid="trigger">Toggle</CollapsibleTrigger>
      <CollapsibleContent data-testid="content">Panel body</CollapsibleContent>
    </Collapsible>
  );
}

describe("Collapsible", () => {
  it("sets data-slot markers on all three parts", () => {
    render(<Basic defaultOpen />);
    expect(document.querySelector("[data-slot='collapsible']")).toHaveAttribute("data-slot", "collapsible");
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-slot", "collapsible-trigger");
    expect(screen.getByTestId("content")).toHaveAttribute("data-slot", "collapsible-content");
  });

  it("renders a real button trigger with native props passthrough", () => {
    render(<Basic />);
    const trigger = screen.getByTestId("trigger");
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger).toHaveAttribute("type", "button");
  });

  it("reflects open state via aria-expanded on the trigger", () => {
    render(<Basic defaultOpen />);
    expect(screen.getByTestId("trigger")).toHaveAttribute("aria-expanded", "true");
  });

  it("renders content with data-open when default open", () => {
    render(<Basic defaultOpen />);
    expect(screen.getByTestId("content")).toHaveAttribute("data-open");
  });

  it("collapses on trigger click", () => {
    render(<Basic defaultOpen />);
    const trigger = screen.getByTestId("trigger");
    act(() => trigger.click());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("animates panel height and opacity on expand/collapse, reduced-motion safe", () => {
    render(<Basic defaultOpen />);
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("h-[var(--collapsible-panel-height)]");
    expect(cls).toContain("transition-[height,opacity]");
    expect(cls).toContain("duration-rixl-base");
    expect(cls).toContain("data-starting-style:h-0");
    expect(cls).toContain("data-ending-style:h-0");
    expect(cls).toContain("motion-reduce:transition-none");
  });
});

describe("CollapsibleDefaultTrigger", () => {
  it("marks its slot and renders the label with an animated caret", () => {
    render(
      <Collapsible>
        <CollapsibleDefaultTrigger data-testid="trigger">Details</CollapsibleDefaultTrigger>
        <CollapsibleContent>body</CollapsibleContent>
      </Collapsible>
    );
    const trigger = screen.getByTestId("trigger");
    expect(trigger).toHaveAttribute("data-slot", "collapsible-default-trigger");
    const caret = trigger.querySelector("svg");
    expect(caret).not.toBeNull();
    const caretClass = caret?.getAttribute("class") ?? "";
    expect(caretClass).toContain("transition-transform");
    expect(caretClass).toContain("duration-rixl-base");
    expect(caretClass).toContain("ease-rixl-out");
    expect(caretClass).toContain("group-data-[panel-open]:rotate-180");
    expect(caretClass).toContain("motion-reduce:transition-none");
  });

  it("keeps a visible focus ring and lets a consumer className win", () => {
    render(
      <Collapsible>
        <CollapsibleDefaultTrigger data-testid="trigger" className="px-9">
          Details
        </CollapsibleDefaultTrigger>
        <CollapsibleContent>body</CollapsibleContent>
      </Collapsible>
    );
    const cls = screen.getByTestId("trigger").className;
    expect(cls).toContain("focus-visible:ring-rixl-ring/50");
    expect(cls).toContain("px-9");
  });
});

describe("CollapsibleDefaultPanel", () => {
  it("marks its slot with a border-s accent and the height/opacity animation", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>toggle</CollapsibleTrigger>
        <CollapsibleDefaultPanel data-testid="panel">Panel body</CollapsibleDefaultPanel>
      </Collapsible>
    );
    const panel = screen.getByTestId("panel");
    expect(panel).toHaveAttribute("data-slot", "collapsible-default-panel");
    expect(panel.className).toContain("transition-[height,opacity]");
    expect(panel.className).toContain("duration-rixl-base");
    const accent = panel.querySelector("[data-slot='collapsible-default-panel-accent']");
    expect(accent).not.toBeNull();
    expect(accent?.className ?? "").toContain("border-s-2");
    expect(accent?.className ?? "").toContain("border-rixl-border");
  });

  it("keeps content mounted when keepMounted while closed", () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>toggle</CollapsibleTrigger>
        <CollapsibleDefaultPanel keepMounted>Hidden body</CollapsibleDefaultPanel>
      </Collapsible>
    );
    expect(screen.getByText("Hidden body")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "toggle"})).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Collapsible multiple items and accordion pattern", () => {
  it("toggles independent items without affecting each other", () => {
    render(
      <div>
        <Collapsible defaultOpen>
          <CollapsibleDefaultTrigger data-testid="t1">One</CollapsibleDefaultTrigger>
          <CollapsibleDefaultPanel>Body one</CollapsibleDefaultPanel>
        </Collapsible>
        <Collapsible>
          <CollapsibleDefaultTrigger data-testid="t2">Two</CollapsibleDefaultTrigger>
          <CollapsibleDefaultPanel>Body two</CollapsibleDefaultPanel>
        </Collapsible>
      </div>
    );
    act(() => screen.getByTestId("t1").click());
    expect(screen.getByTestId("t1")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("t2")).toHaveAttribute("aria-expanded", "false");
  });

  it("supports single-open accordion via controlled open and onOpenChange", () => {
    function Accordion() {
      const [activeIndex, setActiveIndex] = useState<number | null>(0);
      return (
        <div>
          {[0, 1].map((index) => (
            <Collapsible key={index} open={activeIndex === index} onOpenChange={(open: boolean) => setActiveIndex(open ? index : null)}>
              <CollapsibleDefaultTrigger data-testid={`a-t${index}`}>Item {index}</CollapsibleDefaultTrigger>
              <CollapsibleDefaultPanel>Body {index}</CollapsibleDefaultPanel>
            </Collapsible>
          ))}
        </div>
      );
    }
    render(<Accordion />);
    expect(screen.getByTestId("a-t0")).toHaveAttribute("aria-expanded", "true");
    act(() => screen.getByTestId("a-t1").click());
    expect(screen.getByTestId("a-t1")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("a-t0")).toHaveAttribute("aria-expanded", "false");
  });
});
