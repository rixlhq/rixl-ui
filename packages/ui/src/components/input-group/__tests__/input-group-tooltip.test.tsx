import {describe, it, expect} from "vitest";
import {act, fireEvent, render, screen} from "@testing-library/react";
import {TooltipProvider} from "../../tooltip";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, type InputGroupButtonProps} from "../input-group";

function Help(props: InputGroupButtonProps) {
  return (
    <TooltipProvider delay={0}>
      <InputGroup>
        <InputGroupInput aria-label="Query" />
        <InputGroupAddon align="end">
          <InputGroupButton shape="square" {...props}>
            <svg aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </TooltipProvider>
  );
}

async function hoverButton() {
  const button = screen.getByRole("button");
  fireEvent.mouseEnter(button);
  fireEvent.mouseMove(button);
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 20));
  });
}

const popup = () => document.querySelector("[data-slot=tooltip-content]");

describe("InputGroupButton tooltip", () => {
  it("names an icon-only button after a string tooltip", () => {
    render(<Help tooltip="Query help" />);
    expect(screen.getByRole("button", {name: "Query help"})).toBeInTheDocument();
  });

  it("keeps an explicit aria-label over the tooltip text", () => {
    render(<Help tooltip="Query help" aria-label="Help" />);
    expect(screen.getByRole("button", {name: "Help"})).toBeInTheDocument();
  });

  it("wraps nothing without the prop", () => {
    render(<Help aria-label="Help" />);
    expect(document.querySelector("[data-slot=tooltip-trigger]")).not.toBeInTheDocument();
  });

  it("shows the tooltip on hover", async () => {
    render(<Help tooltip="Query help" />);
    await hoverButton();
    expect(popup()).toHaveTextContent("Query help");
  });

  it("opens below the button by default", async () => {
    render(<Help tooltip="Query help" />);
    await hoverButton();
    expect(popup()).toHaveAttribute("data-side", "bottom");
  });

  it("opens on the requested side", async () => {
    render(<Help tooltip="Query help" tooltipSide="top" />);
    await hoverButton();
    expect(popup()).toHaveAttribute("data-side", "top");
  });

  it("does not leak tooltip props to the DOM", () => {
    render(<Help tooltip="Query help" tooltipSide="top" />);
    expect(screen.getByRole("button")).not.toHaveAttribute("tooltipside");
  });

  it("keeps the input-group slot on the button", () => {
    render(<Help tooltip="Query help" />);
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "input-group-button");
  });
});
