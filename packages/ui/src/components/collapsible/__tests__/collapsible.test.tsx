import {describe, it, expect} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "../collapsible";

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
});
