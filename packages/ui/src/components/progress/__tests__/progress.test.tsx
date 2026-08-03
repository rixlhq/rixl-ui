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

  it("renders the indicator with data-slot='progress-indicator'", () => {
    const {container} = render(<Progress value={50} />);
    const indicator = container.querySelector("[data-slot='progress-indicator']");
    expect(indicator).not.toBeNull();
    expect(indicator!.className).toContain("bg-rixl-primary");
  });

  it("treats null value as indeterminate", () => {
    render(<Progress value={null} />);
    // Base UI omits aria-valuenow for indeterminate progress
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
  });
});
