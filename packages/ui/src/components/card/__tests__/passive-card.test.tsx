import {createRef} from "react";
import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {Card} from "../card";
import {Button} from "../../button";

describe("passive Card", () => {
  it("leaves actions to children", () => {
    render(
      <Card data-testid="surface">
        <Button>Open settings</Button>
      </Card>
    );
    const surface = screen.getByTestId("surface");
    expect(surface.className).not.toMatch(/cursor-pointer|active:scale|hover:shadow|focus-visible:ring/);
    expect(screen.getByRole("button", {name: "Open settings"})).toBeInTheDocument();
  });

  it("keeps the surface ref and arbitrary content", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Card ref={ref}>
        <input aria-label="Card content" />
      </Card>
    );
    expect(ref.current).toContainElement(screen.getByRole("textbox"));
  });
});
