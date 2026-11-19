import {describe, it, expect} from "vitest";
import {createRef, type RefObject} from "react";
import {render, screen} from "@testing-library/react";
import {inputVariants} from "../../input/input-variants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
} from "../select";

function Basic({defaultValue, disabled, size}: {defaultValue?: string; disabled?: boolean; size?: "xs" | "sm" | "base" | "lg"} = {}) {
  return (
    <Select defaultValue={defaultValue} disabled={disabled}>
      <SelectTrigger size={size} data-testid="trigger">
        <SelectValue>{(v) => (v ? String(v) : "Pick one")}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel data-testid="label">Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectSeparator data-testid="sep" />
          <SelectItem value="cherry" disabled>
            Cherry
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("renders the trigger as a real button with data-slot", () => {
    render(<Basic />);
    const trigger = screen.getByTestId("trigger");
    expect(trigger).toHaveAttribute("data-slot", "select-trigger");
    expect(trigger.tagName).toBe("BUTTON");
  });

  it("applies base classes to the trigger", () => {
    render(<Basic />);
    const cls = screen.getByTestId("trigger").className;
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("rounded-md");
    expect(cls).toContain("shadow-xs");
    expect(cls).toContain("focus-visible:border-rixl-ring");
  });

  it("applies hover, press, and open-state affordances to the trigger", () => {
    render(<Basic />);
    const cls = screen.getByTestId("trigger").className;
    expect(cls).toContain("not-data-disabled:active:scale-[var(--rixl-press-scale)]");
    expect(cls).toContain("motion-reduce:active:scale-100");
    expect(cls).toContain("data-[popup-open]:border-rixl-border-strong");
  });

  it("rotates the chevron when the popup is open", () => {
    render(<Basic />);
    const chevron = screen.getByTestId("trigger").querySelector("svg");
    expect(chevron?.getAttribute("class")).toContain("[[data-popup-open]_&]:rotate-180");
    expect(chevron?.getAttribute("class")).toContain("transition-transform");
  });

  it("applies each size's height to the trigger", () => {
    const heights = {xs: "h-7", sm: "h-8", base: "h-9", lg: "h-10"} as const;
    for (const [size, height] of Object.entries(heights)) {
      expect(selectTriggerVariants({size: size as keyof typeof heights})).toContain(height);
    }
  });

  it("has the same height as Input at every size", () => {
    for (const size of ["xs", "sm", "base", "lg"] as const) {
      const height = /(?<![:\w-])h-\d+\b/.exec(inputVariants({size}))?.[0];
      expect(selectTriggerVariants({size}), size).toContain(height);
    }
  });

  it("reflects the size prop via data-size", () => {
    render(<Basic size="sm" />);
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-size", "sm");
  });

  it("defaults size to 'base' (h-9)", () => {
    render(<Basic />);
    const trigger = screen.getByTestId("trigger");
    expect(trigger).toHaveAttribute("data-size", "base");
    expect(trigger.className).toContain("h-9");
  });

  it("shares Input's control surface: hover, invalid and disabled states", () => {
    render(<Basic />);
    const cls = screen.getByTestId("trigger").className;
    expect(cls).toContain("hover:border-rixl-border-strong");
    expect(cls).toContain("aria-invalid:border-rixl-danger");
    expect(cls).toContain("aria-invalid:bg-rixl-danger/10");
    expect(cls).toContain("disabled:opacity-50");
  });

  it("does not take the text fields' read-only look", () => {
    render(<Basic />);
    expect(screen.getByTestId("trigger").className).not.toContain("read-only:");
  });

  it("lets a consumer's width replace the surface's full width", () => {
    render(
      <Select>
        <SelectTrigger data-testid="trigger" className="w-48" />
      </Select>
    );
    const cls = screen.getByTestId("trigger").className;
    expect(cls).toContain("w-48");
    expect(cls).not.toContain("w-full");
  });

  it("renders SelectValue with data-slot", () => {
    render(<Basic />);
    // SelectValue is inside the trigger and gets its data-slot from the primitive
    const val = screen.getByTestId("trigger").querySelector("[data-slot='select-value']");
    expect(val).not.toBeNull();
  });

  it("renders the placeholder text when no value is selected", () => {
    render(<Basic />);
    // With Base UI, placeholder is rendered via the SelectValue children render function.
    expect(screen.getByText("Pick one")).toBeInTheDocument();
    const val = screen.getByTestId("trigger").querySelector("[data-slot='select-value']");
    expect(val).toHaveAttribute("data-placeholder");
  });

  it("shows the raw value in the render function when defaultValue is set", () => {
    render(<Basic defaultValue="banana" />);
    // With the render-function pattern, SelectValue receives the raw value.
    // Callers who want the label can look it up in their own items map.
    expect(screen.getByText("banana")).toBeInTheDocument();
  });

  it("respects the disabled prop on the root", () => {
    render(<Basic disabled />);
    const trigger = screen.getByTestId("trigger");
    expect(trigger).toBeDisabled();
  });

  it("SelectLabel sets data-slot='select-label' with muted text", () => {
    // Label only renders when the popup is open (portal). We verify by rendering it as a standalone piece.
    render(<SelectLabel data-testid="lbl">Fruits</SelectLabel>);
    const el = screen.getByTestId("lbl");
    expect(el).toHaveAttribute("data-slot", "select-label");
    expect(el.className).toContain("text-rixl-fg-muted");
  });
});

function OpenSelect({refs}: {refs: Record<string, React.Ref<HTMLElement>>}) {
  return (
    <Select defaultOpen defaultValue="apple">
      <SelectTrigger ref={refs.trigger as React.Ref<HTMLButtonElement>} aria-label="Fruit">
        <SelectValue ref={refs.value as React.Ref<HTMLSpanElement>} />
      </SelectTrigger>
      <SelectContent ref={refs.content as React.Ref<HTMLDivElement>}>
        <SelectGroup ref={refs.group as React.Ref<HTMLDivElement>}>
          <SelectLabel ref={refs.label as React.Ref<HTMLDivElement>}>Fruits</SelectLabel>
          <SelectItem ref={refs.item as React.Ref<HTMLDivElement>} value="apple">
            Apple
          </SelectItem>
          <SelectSeparator ref={refs.separator as React.Ref<HTMLDivElement>} />
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

describe("Select open popup", () => {
  it("scales and fades the check from the item's selected state over the fast motion token", () => {
    render(<OpenSelect refs={{}} />);
    const indicator = screen.getByRole("option", {name: "Apple"}).querySelector("svg")!.parentElement!;
    expect(indicator).toHaveClass(
      "scale-50",
      "opacity-0",
      "in-data-selected:scale-100",
      "in-data-selected:opacity-100",
      "transition-[scale,opacity]",
      "duration-(--rixl-motion-fast)",
      "ease-out",
      "motion-reduce:transition-none"
    );
  });

  it("keeps the check mounted on unselected items so selecting one can transition", () => {
    render(<OpenSelect refs={{}} />);
    expect(screen.getByRole("option", {name: "Banana"}).querySelector("svg")).not.toBeNull();
  });

  it("uses the default cursor on options, as menu items do", () => {
    render(<OpenSelect refs={{}} />);
    const option = screen.getByRole("option", {name: "Apple"});
    expect(option).toHaveClass("cursor-default");
    expect(option).not.toHaveClass("cursor-pointer");
  });

  it("forwards refs to the element carrying each part's data-slot", () => {
    const refs = Object.fromEntries(
      ["trigger", "value", "content", "group", "label", "item", "separator"].map((name) => [name, createRef<HTMLElement>()])
    );
    render(<OpenSelect refs={refs as Record<string, React.Ref<HTMLElement>>} />);
    const slots = {
      trigger: "select-trigger",
      value: "select-value",
      content: "select-content",
      group: "select-group",
      label: "select-label",
      item: "select-item",
      separator: "select-separator",
    };
    for (const [name, slot] of Object.entries(slots)) {
      expect((refs[name] as RefObject<HTMLElement>).current, name).toHaveAttribute("data-slot", slot);
    }
  });

  it("names every forwarding part for React DevTools", () => {
    const parts = {
      SelectTrigger,
      SelectValue,
      SelectContent,
      SelectGroup,
      SelectLabel,
      SelectItem,
      SelectSeparator,
      SelectScrollUpButton,
      SelectScrollDownButton,
    };
    for (const [name, part] of Object.entries(parts)) {
      expect((part as {displayName?: string}).displayName, name).toBe(name);
    }
  });
});
