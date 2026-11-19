import {afterEach, describe, it, expect, vi} from "vitest";
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

  it("applies base classes to the track", () => {
    const {container} = render(<Progress value={30} aria-label="Upload" />);
    const cls = container.querySelector("[data-slot='progress-track']")!.className;
    expect(cls).toContain("bg-rixl-primary/20");
    expect(cls).toContain("rounded-full");
    expect(cls).toContain("h-2");
  });

  it("merges className onto the root without dropping base classes", () => {
    render(<Progress value={30} className="w-48" data-testid="p" />);
    const cls = screen.getByTestId("p").className;
    expect(cls).toContain("w-48");
    expect(cls).toContain("flex-col");
  });

  it("lets trackClassName win over the track's own height", () => {
    const {container} = render(<Progress value={30} trackClassName="h-4" />);
    const cls = container.querySelector("[data-slot='progress-track']")!.className;
    expect(cls).toContain("h-4");
    expect(cls).not.toContain("h-2");
  });

  it("merges indicatorClassName onto the indicator", () => {
    const {container} = render(<Progress value={30} indicatorClassName="bg-rixl-danger" />);
    const cls = container.querySelector("[data-slot='progress-indicator']")!.className;
    expect(cls).toContain("bg-rixl-danger");
    expect(cls).not.toContain("bg-rixl-primary ");
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

  describe("label and value", () => {
    it("names the progressbar after its label", () => {
      render(<Progress label="Storage" value={65} />);
      expect(screen.getByRole("progressbar", {name: "Storage"})).toBeInTheDocument();
    });

    it("shows the value next to a label by default", () => {
      render(<Progress label="Storage" value={65} />);
      expect(screen.getByText("65%")).toBeInTheDocument();
    });

    it("hides the value with showValue={false}", () => {
      render(<Progress label="Storage" value={65} showValue={false} />);
      expect(screen.queryByText("65%")).not.toBeInTheDocument();
    });

    it("shows the value of an unlabelled bar when showValue is set", () => {
      render(<Progress aria-label="Upload" value={40} showValue />);
      expect(screen.getByText("40%")).toBeInTheDocument();
    });

    it("shows no value text on an unlabelled bar by default", () => {
      render(<Progress aria-label="Upload" value={40} />);
      expect(screen.queryByText("40%")).not.toBeInTheDocument();
    });

    it("replaces the value with customValue", () => {
      render(<Progress label="API" value={75} customValue="750 / 1,000" />);
      expect(screen.getByText("750 / 1,000")).toBeInTheDocument();
      expect(screen.queryByText("75%")).not.toBeInTheDocument();
    });

    it("shows customValue even when showValue is false", () => {
      render(<Progress label="API" value={75} showValue={false} customValue="750 / 1,000" />);
      expect(screen.getByText("750 / 1,000")).toBeInTheDocument();
    });

    it("tags the label and the value with their slots", () => {
      const {container} = render(<Progress label="Storage" value={65} />);
      expect(container.querySelector("[data-slot='progress-label']")).toHaveTextContent("Storage");
      expect(container.querySelector("[data-slot='progress-value']")).toHaveTextContent("65%");
    });

    it("tags a custom value with the value slot too", () => {
      const {container} = render(<Progress label="API" value={75} customValue="750 / 1,000" />);
      expect(container.querySelector("[data-slot='progress-value']")).toHaveTextContent("750 / 1,000");
    });
  });

  describe("accessible name", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    function warned(element: React.ReactElement) {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(element);
      return warn.mock.calls.some(([message]) => String(message).includes("[Rixl Progress]"));
    }

    it("warns when there is no label, aria-label or aria-labelledby", () => {
      expect(warned(<Progress value={10} />)).toBe(true);
    });

    it.each([
      ["a label", <Progress key="l" label="Storage" value={10} />],
      ["an aria-label", <Progress key="a" aria-label="Storage" value={10} />],
      ["an aria-labelledby", <Progress key="b" aria-labelledby="x" value={10} />],
    ])("stays quiet with %s", (_name, element) => {
      expect(warned(element)).toBe(false);
    });
  });
});
