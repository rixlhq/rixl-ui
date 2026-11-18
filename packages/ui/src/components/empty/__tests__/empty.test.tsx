import {createRef} from "react";
import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {Empty} from "../empty";
import {Button} from "../../button";

describe("Empty", () => {
  it("renders the title as a heading", () => {
    render(<Empty title="No results" />);
    expect(screen.getByRole("heading", {name: "No results"})).toBeInTheDocument();
  });

  it("renders the description in muted text", () => {
    render(<Empty title="No results" description="Try another search." />);
    expect(screen.getByText("Try another search.").className).toContain("text-rixl-fg-muted");
  });

  it("renders no description element when none is given", () => {
    const {container} = render(<Empty title="No results" />);
    expect(container.querySelector("p")).toBeNull();
  });

  it("accepts caller-owned actions without injecting a creation icon", () => {
    render(<Empty title="No results" description="Try another search." action={<Button>Clear filters</Button>} />);
    expect(screen.getByRole("button", {name: "Clear filters"})).toBeInTheDocument();
    expect(screen.getByRole("button").querySelector("svg")).toBeNull();
  });

  it("renders children", () => {
    render(
      <Empty title="No results">
        <a href="/docs">Read the docs</a>
      </Empty>
    );
    expect(screen.getByRole("link", {name: "Read the docs"})).toBeInTheDocument();
  });

  it("keeps presentation independent of action presence and forwards its ref", () => {
    const ref = createRef<HTMLDivElement>();
    const {rerender} = render(<Empty ref={ref} title="No results" description="Try again" />);
    const classes = ref.current?.className;
    rerender(<Empty ref={ref} title="No results" description="Try again" action={<Button>Retry</Button>} />);
    expect(ref.current?.className).toBe(classes);
  });

  it("lets a consumer class win over the default border style", () => {
    render(<Empty title="No results" className="border-solid" data-testid="root" />);
    const root = screen.getByTestId("root");
    expect(root.className).toContain("border-solid");
    expect(root.className).not.toContain("border-dashed");
  });

  it("spreads remaining props onto the root", () => {
    render(<Empty title="No results" data-testid="root" aria-label="Search results" />);
    expect(screen.getByTestId("root")).toHaveAttribute("aria-label", "Search results");
  });
});
