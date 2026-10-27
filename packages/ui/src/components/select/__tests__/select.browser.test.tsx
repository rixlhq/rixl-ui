import {describe, it, expect, afterEach, vi} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
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
        <SelectTrigger data-testid="select-trigger" className="w-48">
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
});
