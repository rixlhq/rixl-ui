import {createRef} from "react";
import {render, screen} from "@testing-library/react";
import {expect, it} from "vitest";
import {Collapsible, CollapsibleTrigger, CollapsibleDefaultPanel} from "../index";

it("composes styled panels from the raw panel with React 18 refs", () => {
  const root = createRef<HTMLDivElement>();
  const trigger = createRef<HTMLButtonElement>();
  const panel = createRef<HTMLDivElement>();
  render(
    <Collapsible ref={root} defaultOpen>
      <CollapsibleTrigger ref={trigger}>Details</CollapsibleTrigger>
      <CollapsibleDefaultPanel ref={panel} keepMounted>
        Details content
      </CollapsibleDefaultPanel>
    </Collapsible>
  );
  expect(root.current).toHaveAttribute("data-slot", "collapsible");
  expect(trigger.current).toBe(screen.getByRole("button"));
  expect(panel.current).toHaveAttribute("data-slot", "collapsible-default-panel");
});
