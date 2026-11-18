import {describe, it, expect, vi} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import * as fc from "fast-check";
import {Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb} from "../slider";

function Basic({defaultValue = 50, ...props}: {defaultValue?: number | readonly number[]} & Record<string, unknown> = {}) {
  const {onValueChange, ...rest} = props as {onValueChange?: (value: number) => void};
  return (
    <Slider defaultValue={defaultValue} onValueChange={onValueChange as never} {...(rest as object)}>
      <SliderControl data-testid="control">
        <SliderTrack data-testid="track">
          <SliderIndicator data-testid="indicator" />
        </SliderTrack>
        <SliderThumb data-testid="thumb" aria-label="Volume" />
      </SliderControl>
    </Slider>
  );
}

describe("Slider", () => {
  it("exposes a slider role seeded with the default value", () => {
    render(<Basic defaultValue={30} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-label", "Volume");
    expect(slider).toHaveAttribute("aria-valuenow", "30");
  });

  it("sets data-slot='slider' on the root", () => {
    const {container} = render(<Basic />);
    expect(container.firstElementChild).toHaveAttribute("data-slot", "slider");
  });

  it("applies token classes to track, indicator and thumb", () => {
    render(<Basic />);
    expect(screen.getByTestId("track").className).toContain("bg-rixl-secondary");
    expect(screen.getByTestId("indicator").className).toContain("bg-rixl-primary");
    expect(screen.getByTestId("thumb").className).toContain("bg-rixl-surface");
  });

  it("tracks the pointer 1:1 — no transform transition on thumb or indicator", () => {
    render(<Basic />);
    for (const testId of ["thumb", "indicator"]) {
      const cls = screen.getByTestId(testId).className;
      // `transition-[border-color,box-shadow]` is fine; anything touching transform would lag the drag.
      expect(cls).not.toContain("transform");
      expect(cls).not.toContain("transition-all");
    }
  });

  it("transitions the border colour that hover and drag change, not the text colour", () => {
    render(<Basic />);
    const cls = screen.getByTestId("thumb").className;
    expect(cls).toContain("transition-[border-color,box-shadow]");
    expect(cls).toContain("hover:border-rixl-border-strong");
  });

  it("forwards a consumer className without dropping base classes", () => {
    const {container} = render(<Basic className="mt-4" />);
    const cls = container.firstElementChild?.className ?? "";
    expect(cls).toContain("mt-4");
    expect(cls).toContain("touch-none");
  });

  it("fires onValueChange on ArrowRight", () => {
    const onValueChange = vi.fn();
    render(<Basic defaultValue={30} onValueChange={onValueChange} />);
    fireEvent.keyDown(screen.getByRole("slider"), {key: "ArrowRight"});
    expect(onValueChange).toHaveBeenCalledWith(31, expect.anything());
  });

  it("dims the root when disabled", () => {
    const {container} = render(
      <Slider defaultValue={50} disabled>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb aria-label="Volume" />
        </SliderControl>
      </Slider>
    );
    expect(container.firstElementChild?.className).toContain("data-disabled:opacity-50");
  });

  it("[property] renders one slider per value in a range", () => {
    fc.assert(
      fc.property(fc.array(fc.integer({min: 0, max: 100}), {minLength: 1, maxLength: 3}), (values) => {
        const sorted = [...values].sort((a, b) => a - b);
        const {unmount} = render(
          <Slider defaultValue={sorted.length === 1 ? sorted[0] : sorted}>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
              </SliderTrack>
              {sorted.map((_, index) => (
                <SliderThumb key={index} aria-label={`Thumb ${index}`} />
              ))}
            </SliderControl>
          </Slider>
        );
        expect(screen.getAllByRole("slider")).toHaveLength(sorted.length);
        unmount();
      })
    );
  });
});
