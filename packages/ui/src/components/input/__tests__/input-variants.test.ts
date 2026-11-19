import {describe, expect, it} from "vitest";
import {controlRadius, controlSizes, controlSurface, inputAreaVariants, inputVariants} from "../input-variants";

const classSet = (classes: string) => new Set(classes.split(/\s+/).filter(Boolean));

describe("controlSurface", () => {
  it("carries the border, hover, focus, disabled and invalid states", () => {
    const surface = classSet(controlSurface);
    for (const cls of [
      "border-rixl-border",
      "hover:border-rixl-border-strong",
      "focus-visible:border-rixl-ring",
      "focus-visible:ring-[3px]",
      "disabled:opacity-50",
      "aria-invalid:border-rixl-danger",
      "aria-invalid:bg-rixl-danger/10",
    ]) {
      expect(surface, cls).toContain(cls);
    }
  });

  it("has no read-only look, since :read-only matches every non-editable element such as a button", () => {
    expect(controlSurface).not.toContain("read-only:");
  });

  it("sets no radius, so a part that shapes its own corners adds none to undo", () => {
    expect(controlSurface).not.toMatch(/(?<![:\w-])rounded-/);
  });
});

describe("controlSizes", () => {
  it("steps the height xs, sm, base, lg", () => {
    expect(Object.keys(controlSizes)).toEqual(["xs", "sm", "base", "lg"]);
    expect(Object.values(controlSizes).map((size) => /(?<![:\w-])h-\d+\b/.exec(size)?.[0])).toEqual(["h-7", "h-8", "h-9", "h-10"]);
  });
});

describe("text field variants", () => {
  it("keep the read-only look that the shared surface leaves out", () => {
    for (const variants of [inputVariants(), inputAreaVariants()]) {
      const classes = classSet(variants);
      expect(classes).toContain("read-only:bg-rixl-surface-muted");
      expect(classes).toContain("read-only:cursor-default");
      expect(classes).toContain("read-only:hover:border-rixl-border");
    }
  });

  it("render the same class set as before the surface was split", () => {
    const before = classSet(
      [
        "placeholder:text-rixl-fg-muted selection:bg-rixl-primary selection:text-rixl-primary-fg",
        "border-rixl-border flex w-full min-w-0 rounded-rixl-md border bg-transparent shadow-rixl-xs outline-none",
        "transition-[color,box-shadow,border-color] duration-rixl-fast ease-rixl-out",
        "hover:border-rixl-border-strong",
        "read-only:bg-rixl-surface-muted read-only:cursor-default read-only:hover:border-rixl-border",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:border-rixl-danger aria-invalid:ring-rixl-danger/20 aria-invalid:ring-[3px]",
        "aria-invalid:bg-rixl-danger/10 aria-invalid:hover:border-rixl-danger",
        "file:text-rixl-fg py-1 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "h-9 px-3 text-base sm:text-sm",
      ].join(" ")
    );
    expect(classSet(inputVariants())).toEqual(before);
  });
});

describe("inputVariants surface", () => {
  it("raised is the default: border, radius and shadow", () => {
    const classes = classSet(inputVariants());
    expect(classes).toContain(controlRadius);
    expect(classes).toContain("shadow-rixl-xs");
  });

  it("flat keeps the border and radius but draws no shadow", () => {
    const classes = classSet(inputVariants({surface: "flat"}));
    expect(classes).toContain(controlRadius);
    expect(classes).not.toContain("shadow-rixl-xs");
  });

  it("bare draws no border, radius, shadow or invalid and focus chrome", () => {
    const classes = [...classSet(inputVariants({surface: "bare"}))];
    expect(classes.filter((cls) => /^(border|rounded|shadow)-|^border$|^(hover|focus-visible|aria-invalid):/.test(cls))).toEqual([]);
  });
});
