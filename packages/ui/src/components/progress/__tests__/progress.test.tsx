import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Progress} from "../progress";

describe("Progress", () => {
  it("renders with role='progressbar'", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets data-slot='progress' on the root", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-slot", "progress");
  });

  it("reflects aria-valuenow from `value`", () => {
    render(<Progress value={72} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "72");
  });

  it("defaults value to 0 when omitted", () => {
    render(<Progress />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("applies base classes to the root", () => {
    render(<Progress value={30} data-testid="p" />);
    const cls = screen.getByTestId("p").className;
    expect(cls).toContain("bg-rixl-primary/20");
    expect(cls).toContain("rounded-full");
    expect(cls).toContain("h-2");
  });

  it("forwards additional className without dropping base classes", () => {
    render(<Progress value={30} className="h-4" data-testid="p" />);
    const cls = screen.getByTestId("p").className;
    expect(cls).toContain("h-4");
    expect(cls).toContain("bg-rixl-primary/20");
  });

  it("renders the indicator with data-slot='progress-indicator' and tokenized motion", () => {
    const {container} = render(<Progress value={50} />);
    const indicator = container.querySelector("[data-slot='progress-indicator']");
    expect(indicator).not.toBeNull();
    expect(indicator!.className).toContain("bg-rixl-primary");
    expect(indicator!.className).toContain("duration-(--rixl-motion-base)");
    expect(indicator!.className).toContain("ease-out");
    expect(indicator!.className).toContain("motion-reduce:transition-none");
  });

  it("treats null value as indeterminate", () => {
    render(<Progress value={null} />);
    // Base UI omits aria-valuenow for indeterminate progress
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
  });

  it("narrows and animates the indicator only while indeterminate", () => {
    const {container} = render(<Progress value={null} />);
    const cls = container.querySelector("[data-slot='progress-indicator']")!.className;
    expect(cls).toContain("data-indeterminate:w-1/3");
    expect(cls).toContain("motion-safe:data-indeterminate:animate-rixl-progress-indeterminate");
  });

  it("stops the indeterminate animation under reduced motion and centres the band", () => {
    const {container} = render(<Progress value={null} />);
    const cls = container.querySelector("[data-slot='progress-indicator']")!.className;
    expect(cls).toContain("motion-reduce:data-indeterminate:mx-auto");
    expect(cls).not.toMatch(/(^|\s)animate-rixl-progress-indeterminate/);
  });

  it("marks the indicator indeterminate for a null value", () => {
    const {container} = render(<Progress value={null} />);
    expect(container.querySelector("[data-slot='progress-indicator']")).toHaveAttribute("data-indeterminate");
  });
});
