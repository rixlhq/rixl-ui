import {afterEach, describe, it, expect, vi} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import * as fc from "fast-check";
import {Slider} from "../slider";

// 100 generated renders take about 3s alone, and the default 5s limit fails when the unit and browser projects run together.
const PROPERTY_TEST_TIMEOUT_MS = 20_000;

const part = (slot: string) => document.querySelector<HTMLElement>(`[data-slot='slider-${slot}']`)!;

describe("Slider", () => {
  it("renders one named thumb from a label, seeded with the default value", () => {
    render(<Slider label="Volume" defaultValue={30} />);
    const slider = screen.getByRole("slider", {name: "Volume"});
    expect(slider).toHaveAttribute("aria-valuenow", "30");
  });

  it("sets data-slot='slider' on the root", () => {
    const {container} = render(<Slider label="Volume" />);
    expect(container.firstElementChild).toHaveAttribute("data-slot", "slider");
  });

  it("renders the visible label", () => {
    render(<Slider label="Volume" />);
    expect(part("label")).toHaveTextContent("Volume");
  });

  it("renders no label element without a label", () => {
    render(<Slider getAriaLabel={() => "Volume"} />);
    expect(document.querySelector("[data-slot='slider-label']")).toBeNull();
  });

  it("renders the control, track, indicator and thumb", () => {
    render(<Slider label="Volume" />);
    for (const slot of ["control", "track", "indicator", "thumb"]) expect(part(slot)).toBeInTheDocument();
  });

  it("names each thumb of a range with getAriaLabel", () => {
    render(<Slider label="Price" defaultValue={[25, 75]} getAriaLabel={(index) => (index === 0 ? "Minimum" : "Maximum")} />);
    expect(screen.getByRole("slider", {name: "Minimum"})).toHaveAttribute("aria-valuenow", "25");
    expect(screen.getByRole("slider", {name: "Maximum"})).toHaveAttribute("aria-valuenow", "75");
  });

  it("names a slider with no visible label through getAriaLabel", () => {
    render(<Slider defaultValue={50} getAriaLabel={() => "Brightness"} />);
    expect(screen.getByRole("slider", {name: "Brightness"})).toBeInTheDocument();
  });

  it("takes its thumb count from a controlled value", () => {
    render(<Slider label="Price" value={[10, 20, 30]} onValueChange={() => {}} />);
    expect(screen.getAllByRole("slider")).toHaveLength(3);
  });

  it("applies token classes to track, indicator and thumb", () => {
    render(<Slider label="Volume" />);
    expect(part("track").className).toContain("bg-rixl-secondary");
    expect(part("indicator").className).toContain("bg-rixl-primary");
    expect(part("thumb").className).toContain("bg-rixl-surface");
  });

  it("defaults to the base size", () => {
    render(<Slider label="Volume" />);
    expect(part("track").className).toContain("data-[orientation=horizontal]:h-1.5");
    expect(part("thumb").className).toContain("size-4");
  });

  it("shrinks the track and thumb at size sm", () => {
    render(<Slider label="Volume" size="sm" />);
    expect(part("track").className).toContain("data-[orientation=horizontal]:h-1");
    expect(part("track").className).not.toContain("h-1.5");
    expect(part("thumb").className).toContain("size-3");
  });

  it("tracks the pointer 1:1 — no transform transition on thumb or indicator", () => {
    render(<Slider label="Volume" />);
    for (const slot of ["thumb", "indicator"]) {
      const cls = part(slot).className;
      // `transition-[border-color,box-shadow]` is fine; anything touching transform would lag the drag.
      expect(cls).not.toContain("transform");
      expect(cls).not.toContain("transition-all");
    }
  });

  it("transitions the border colour that hover and drag change, not the text colour", () => {
    render(<Slider label="Volume" />);
    const cls = part("thumb").className;
    expect(cls).toContain("transition-[border-color,box-shadow,scale]");
    expect(cls).toContain("hover:border-rixl-border-strong");
  });

  it("presses the thumb in while dragging, except under reduced motion", () => {
    render(<Slider label="Volume" />);
    const cls = part("thumb").className;
    expect(cls).toContain("data-dragging:scale-[var(--rixl-press-scale)]");
    expect(cls).toContain("motion-reduce:data-dragging:scale-100");
  });

  it("forwards a consumer className without dropping base classes", () => {
    const {container} = render(<Slider label="Volume" className="mt-4" />);
    const cls = container.firstElementChild?.className ?? "";
    expect(cls).toContain("mt-4");
    expect(cls).toContain("touch-none");
  });

  it("lets a consumer class win over the root's own layout", () => {
    const {container} = render(<Slider label="Volume" className="gap-4" />);
    const cls = container.firstElementChild?.className ?? "";
    expect(cls).toContain("gap-4");
    expect(cls).not.toContain("gap-2");
  });

  it("fires onValueChange on ArrowRight", () => {
    const onValueChange = vi.fn();
    render(<Slider label="Volume" defaultValue={30} onValueChange={onValueChange} />);
    fireEvent.keyDown(screen.getByRole("slider"), {key: "ArrowRight"});
    expect(onValueChange).toHaveBeenCalledWith(31, expect.anything());
  });

  it("dims the root when disabled", () => {
    const {container} = render(<Slider label="Volume" disabled />);
    expect(container.firstElementChild?.className).toContain("data-disabled:opacity-50");
  });

  it("passes orientation to the root", () => {
    const {container} = render(<Slider label="Volume" orientation="vertical" />);
    expect(container.firstElementChild).toHaveAttribute("data-orientation", "vertical");
  });

  it(
    "[property] renders one slider per value in a range",
    () => {
      fc.assert(
        fc.property(fc.array(fc.integer({min: 0, max: 100}), {minLength: 1, maxLength: 3}), (values) => {
          const sorted = [...values].sort((a, b) => a - b);
          const {unmount} = render(<Slider label="Thumbs" defaultValue={sorted.length === 1 ? sorted[0] : sorted} />);
          expect(screen.getAllByRole("slider")).toHaveLength(sorted.length);
          unmount();
        })
      );
    },
    PROPERTY_TEST_TIMEOUT_MS
  );

  describe("accessible name", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    function warned(element: React.ReactElement) {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(element);
      return warn.mock.calls.some(([message]) => String(message).includes("[Rixl Slider]"));
    }

    it("warns when there is no label, getAriaLabel or aria-labelledby", () => {
      expect(warned(<Slider />)).toBe(true);
    });

    it.each([
      ["a label", <Slider key="l" label="Volume" />],
      ["getAriaLabel", <Slider key="g" getAriaLabel={() => "Volume"} />],
      ["an aria-labelledby", <Slider key="b" aria-labelledby="x" />],
    ])("stays quiet with %s", (_name, element) => {
      expect(warned(element)).toBe(false);
    });
  });
});
