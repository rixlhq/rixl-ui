import {createRef} from "react";
import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {Empty} from "../../empty";
import {Button} from "../../button";

describe("Empty", () => {
  it("accepts caller-owned actions without injecting a creation icon", () => {
    render(<Empty title="No results" description="Try another search." action={<Button>Clear filters</Button>} />);
    expect(screen.getByRole("button", {name: "Clear filters"})).toBeInTheDocument();
    expect(screen.getByRole("button").querySelector("svg")).toBeNull();
  });

  it("keeps presentation independent of action presence and forwards its ref", () => {
    const ref = createRef<HTMLDivElement>();
    const {rerender} = render(<Empty ref={ref} title="No results" description="Try again" />);
    const classes = ref.current?.className;
    rerender(<Empty ref={ref} title="No results" description="Try again" action={<Button>Retry</Button>} />);
    expect(ref.current?.className).toBe(classes);
  });
});
