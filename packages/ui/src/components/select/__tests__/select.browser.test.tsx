import {describe, it, expect, afterEach, vi} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Select as SelectPrimitive} from "@base-ui/react/select";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "../select";

function TestSelect({
  onValueChange = vi.fn(),
  defaultValue,
}: {
  onValueChange?: (val: string) => void;
  defaultValue?: string;
} = {}) {
  return (
    <div className="p-8">
      <Select defaultValue={defaultValue} onValueChange={onValueChange}>
        {/* A combobox takes no name from its text, so the placeholder doesn't label it; consumers must. */}
        <SelectTrigger data-testid="select-trigger" aria-label="Fruit" className="w-48">
          <SelectValue placeholder="Choose an option" />
        </SelectTrigger>
        <SelectContent data-testid="select-content">
          <SelectItem value="apple" data-testid="option-apple">
            Apple
          </SelectItem>
          <SelectItem value="banana" data-testid="option-banana">
            Banana
          </SelectItem>
          <SelectItem value="cherry" data-testid="option-cherry">
            Cherry
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

describe("Select Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders trigger with placeholder initially", async () => {
    render(<TestSelect />);

    const trigger = page.getByTestId("select-trigger");
    await expect.element(trigger).toBeVisible();
    await expect.element(trigger).toHaveTextContent("Choose an option");

    const content = page.getByTestId("select-content");
    await expect.element(content).not.toBeInTheDocument();
  });

  it("opens option list on trigger click", async () => {
    render(<TestSelect />);

    const trigger = page.getByTestId("select-trigger");
    await userEvent.click(trigger);

    const content = page.getByTestId("select-content");
    await expect.element(content).toBeVisible();

    const appleOption = page.getByTestId("option-apple");
    await expect.element(appleOption).toBeVisible();
    await expect.element(appleOption).toHaveTextContent("Apple");
  });

  it("selects an item and updates trigger text", async () => {
    const handleChange = vi.fn();
    render(<TestSelect onValueChange={handleChange} />);

    const trigger = page.getByTestId("select-trigger");
    await userEvent.click(trigger);

    const bananaOption = page.getByTestId("option-banana");
    await userEvent.click(bananaOption);

    expect(handleChange).toHaveBeenCalledWith("banana", expect.anything());
    await expect.element(trigger).toHaveTextContent("Banana");

    const content = page.getByTestId("select-content");
    await expect.element(content).not.toBeVisible();
  });

  it("closes listbox on Escape and retains focus on trigger", async () => {
    render(<TestSelect />);

    const trigger = page.getByTestId("select-trigger");
    await userEvent.click(trigger);

    const content = page.getByTestId("select-content");
    await expect.element(content).toBeVisible();

    await userEvent.keyboard("{Escape}");

    await expect.element(content).not.toBeVisible();
    await expect.element(trigger).toHaveFocus();
  });

  it("uses the default cursor on options", async () => {
    render(<TestSelect />);
    await userEvent.click(page.getByTestId("select-trigger"));
    expect(getComputedStyle(document.querySelector<HTMLElement>("[data-testid=option-banana]")!).cursor).toBe("default");
  });

  it("shows the check only on the selected option", async () => {
    render(<TestSelect defaultValue="banana" />);
    await userEvent.click(page.getByTestId("select-trigger"));
    const opacityOf = (testId: string) =>
      getComputedStyle(document.querySelector(`[data-testid=${testId}]`)!.querySelector("svg")!.parentElement!).opacity;
    expect(opacityOf("option-banana")).toBe("1");
    expect(opacityOf("option-apple")).toBe("0");
  });

  it("transitions the check in over the fast motion token when an option becomes selected", async () => {
    render(
      <div className="p-8">
        {/* The wrapper types a single value, so reach multiple selection through Base UI's root. */}
        <SelectPrimitive.Root multiple defaultValue={[]}>
          <SelectTrigger data-testid="select-trigger" aria-label="Fruit">
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple" data-testid="option-apple">
              Apple
            </SelectItem>
          </SelectContent>
        </SelectPrimitive.Root>
      </div>
    );
    await userEvent.click(page.getByTestId("select-trigger"));
    const option = document.querySelector<HTMLElement>("[data-testid=option-apple]")!;
    const indicator = option.querySelector("svg")!.parentElement!;
    expect(getComputedStyle(indicator).transitionDuration).toBe("0.12s");
    await userEvent.click(page.getByTestId("option-apple"));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const transitions = indicator.getAnimations().filter((animation) => animation instanceof CSSTransition);
    expect(transitions.map((transition) => (transition as CSSTransition).transitionProperty).sort()).toEqual(["opacity", "scale"]);
  });

  it("has no WCAG 2.2 AA violations when open", async () => {
    render(<TestSelect />);
    await userEvent.click(page.getByTestId("select-trigger"));
    await expect.element(page.getByTestId("select-content")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
