import {createRef} from "react";
import {afterEach, describe, expect, it, vi} from "vitest";
import {act, fireEvent, render, screen} from "@testing-library/react";
import {Button} from "../button";

afterEach(() => {
  vi.useRealTimers();
});

const SearchIcon = () => <svg data-testid="icon" />;

async function hover(element: HTMLElement) {
  fireEvent.mouseEnter(element);
  fireEvent.mouseMove(element);
  await act(async () => {
    vi.advanceTimersByTime(700);
  });
}

describe("Button title", () => {
  it("shows the title as a tooltip on hover", async () => {
    vi.useFakeTimers();
    render(<Button title="Search everything">Search</Button>);
    await hover(screen.getByRole("button"));
    expect(screen.getByText("Search everything", {selector: "[data-slot='tooltip-content']"})).toBeInTheDocument();
  });

  it("shows no tooltip without a title", async () => {
    vi.useFakeTimers();
    render(<Button>Search</Button>);
    await hover(screen.getByRole("button"));
    expect(document.querySelector("[data-slot='tooltip-content']")).toBeNull();
  });

  it("accepts a node as the title", async () => {
    vi.useFakeTimers();
    render(<Button title={<kbd>⌘K</kbd>}>Search</Button>);
    await hover(screen.getByRole("button"));
    expect(screen.getByText("⌘K")).toBeInTheDocument();
  });

  it("does not leave a native title attribute on the button", () => {
    render(<Button title="Search">Go</Button>);
    expect(screen.getByRole("button")).not.toHaveAttribute("title");
  });

  it("names an icon-only button with a string title", () => {
    render(<Button shape="square" icon={SearchIcon} title="Search" />);
    expect(screen.getByRole("button", {name: "Search"})).toBeInTheDocument();
  });

  it("names an icon-only button with a numeric title", () => {
    render(<Button shape="square" icon={SearchIcon} title={3} />);
    expect(screen.getByRole("button", {name: "3"})).toBeInTheDocument();
  });

  it("lets an explicit aria-label win over the title", () => {
    render(<Button shape="square" icon={SearchIcon} title="Search" aria-label="Find" />);
    expect(screen.getByRole("button", {name: "Find"})).toBeInTheDocument();
  });

  it("lets aria-labelledby name the button instead of the title", () => {
    render(
      <>
        <span id="name">Find</span>
        <Button shape="square" icon={SearchIcon} title="Search" aria-labelledby="name" />
      </>
    );
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-label");
    expect(screen.getByRole("button", {name: "Find"})).toBeInTheDocument();
  });

  it("keeps the text as the name when there are children", () => {
    render(<Button title="Run the search">Search</Button>);
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-label");
  });

  it("does not derive a name from a node title", () => {
    render(<Button shape="square" icon={SearchIcon} title={<kbd>⌘K</kbd>} />);
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-label");
  });

  it("keeps the button's own slot and forwards its ref", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button ref={ref} title="Search">
        Go
      </Button>
    );
    expect(ref.current).toBe(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
  });

  it("keeps the classes and click handler of the button", () => {
    const onClick = vi.fn();
    render(
      <Button title="Search" variant="outline" onClick={onClick}>
        Go
      </Button>
    );
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("border-rixl-border");
    btn.click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("wraps a disabled button so the tooltip can still open", async () => {
    vi.useFakeTimers();
    render(
      <Button title="Not allowed" disabled>
        Go
      </Button>
    );
    const wrapper = screen.getByRole("button").parentElement as HTMLElement;
    expect(wrapper.tagName).toBe("SPAN");
    await hover(wrapper);
    expect(screen.getByText("Not allowed", {selector: "[data-slot='tooltip-content']"})).toBeInTheDocument();
  });

  it("wraps a loading button so the tooltip can still open", () => {
    render(
      <Button title="Saving" loading>
        Go
      </Button>
    );
    expect(screen.getByRole("button").parentElement?.tagName).toBe("SPAN");
  });

  it("does not wrap an enabled button", () => {
    render(<Button title="Go">Go</Button>);
    expect(screen.getByRole("button").parentElement).toBe(document.body.firstElementChild);
  });
});
