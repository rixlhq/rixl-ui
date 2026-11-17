import {createRef} from "react";
import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {ButtonGroup} from "../button-group";
import {Button} from "../../button/button";

describe("ButtonGroup", () => {
  it("renders a grouping <div> with role='group'", () => {
    render(
      <ButtonGroup data-testid="group" aria-label="Deploy">
        <Button>Deploy</Button>
        <Button aria-label="More deploy options">▾</Button>
      </ButtonGroup>
    );
    const group = screen.getByTestId("group");
    expect(group.tagName).toBe("DIV");
    expect(group).toHaveAttribute("role", "group");
  });

  it("sets data-slot='button-group' for slot targeting", () => {
    render(
      <ButtonGroup data-testid="group" aria-label="Deploy">
        <Button>Deploy</Button>
      </ButtonGroup>
    );
    expect(screen.getByTestId("group")).toHaveAttribute("data-slot", "button-group");
  });

  it("lays children out in one shrink-wrapped row", () => {
    render(
      <ButtonGroup data-testid="group" aria-label="Deploy">
        <Button>Deploy</Button>
      </ButtonGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("inline-flex");
    expect(cls).toContain("w-max");
  });

  it("joins the seam: overlaps borders and flattens inner corners", () => {
    render(
      <ButtonGroup data-testid="group" aria-label="Deploy">
        <Button>Deploy</Button>
      </ButtonGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("[&>*:not(:first-child)]:-ms-px");
    expect(cls).toContain("rounded-s-none");
    expect(cls).toContain("rounded-e-none");
  });

  it("drops per-button shadows so the group reads as one control", () => {
    render(
      <ButtonGroup data-testid="group" aria-label="Deploy">
        <Button>Deploy</Button>
      </ButtonGroup>
    );
    expect(screen.getByTestId("group").className).toContain("shadow-none");
  });

  it("lifts a keyboard-focused child above the seam", () => {
    render(
      <ButtonGroup data-testid="group" aria-label="Deploy">
        <Button>Deploy</Button>
      </ButtonGroup>
    );
    expect(screen.getByTestId("group").className).toContain("[&>*:focus-visible]:z-10");
  });

  it("holds children at full scale while pressed so the seam never splits", () => {
    render(
      <ButtonGroup data-testid="group" aria-label="Deploy">
        <Button>Deploy</Button>
      </ButtonGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("[&>:is(button,a)]:active:scale-100");
    expect(cls).toContain("[&>*>:is(button,a)]:active:scale-100");
  });

  it("merges className without dropping the group layout", () => {
    render(
      <ButtonGroup data-testid="group" aria-label="Deploy" className="max-w-sm">
        <Button>Deploy</Button>
      </ButtonGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("max-w-sm");
    expect(cls).toContain("inline-flex");
  });

  it("forwards the ref to the group <div>", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <ButtonGroup ref={ref} aria-label="Deploy">
        <Button>Deploy</Button>
      </ButtonGroup>
    );
    expect(ref.current?.tagName).toBe("DIV");
  });
});
