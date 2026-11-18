import {createRef} from "react";
import {act, render, screen} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
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

  it("renders no icon container without an icon", () => {
    const {container} = render(<Empty title="No results" />);
    expect(container.querySelector("[aria-hidden]")).toBeNull();
  });

  it("renders a supplied icon inside a container hidden from assistive technology", () => {
    render(<Empty title="No results" icon={<svg data-testid="icon" />} />);
    expect(screen.getByTestId("icon").closest("[aria-hidden='true']")).not.toBeNull();
  });

  it("renders the title at the requested heading level", () => {
    render(<Empty title="No results" headingLevel={2} />);
    expect(screen.getByRole("heading", {level: 2, name: "No results"})).toBeInTheDocument();
  });

  it("renders the title as an h3 by default", () => {
    render(<Empty title="No results" />);
    expect(screen.getByRole("heading", {level: 3})).toBeInTheDocument();
  });

  it("applies distinct spacing per size", () => {
    const classes = (size?: "sm" | "default" | "lg") => {
      const {unmount} = render(<Empty title="x" size={size} data-testid="root" />);
      const value = screen.getByTestId("root").className;
      unmount();
      return value;
    };
    expect(new Set([classes("sm"), classes("default"), classes("lg")]).size).toBe(3);
  });

  it("uses the default size when none is given", () => {
    const {rerender} = render(<Empty title="x" data-testid="root" />);
    const implicit = screen.getByTestId("root").className;
    rerender(<Empty title="x" size="default" data-testid="root" />);
    expect(screen.getByTestId("root").className).toBe(implicit);
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

  it("renders the command line", () => {
    render(<Empty title="No apps" commandLine="npm create rixl" commandTitle="Install command" />);
    expect(screen.getByText("npm create rixl")).toBeInTheDocument();
  });

  it("titles the command block, and names its copy button, from commandTitle", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Empty title="No apps" commandLine="npm create rixl" commandTitle="Install command" />);
    expect(screen.getByText("Install command:")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Copy Install command"})).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("warns, naming commandTitle, when commandLine has no commandTitle", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    // @ts-expect-error -- commandLine requires commandTitle; the omission is the case under test.
    render(<Empty title="No apps" commandLine="npm create rixl" />);
    expect(warn).toHaveBeenCalledExactlyOnceWith(expect.stringMatching(/\[Rixl Empty\].*must have an accessible name.*commandTitle/));
    warn.mockRestore();
  });

  it("does not warn without a command line", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Empty title="No apps" />);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("renders no copy button without a command line", () => {
    render(<Empty title="No apps" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("copies exactly the command line", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {...navigator, clipboard: {writeText}});
    render(<Empty title="No apps" commandLine="npm create rixl" commandTitle="Install command" />);
    await act(async () => {
      screen.getByRole("button", {name: /copy/i}).click();
    });
    expect(writeText).toHaveBeenCalledWith("npm create rixl");
    vi.unstubAllGlobals();
  });
});
