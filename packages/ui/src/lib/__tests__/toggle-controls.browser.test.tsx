import {afterEach, describe, expect, it} from "vitest";
import {cleanup, render} from "@testing-library/react";
import {userEvent} from "vitest/browser";
import {Checkbox} from "../../components/checkbox";
import {RadioGroup, RadioGroupItem} from "../../components/radio-group";
import {Switch} from "../../components/switch";

/** Base UI renders these three roots as a `<span>`, so `:enabled` and `:disabled` never match them; the styling reads `data-disabled`. */
const controls = [
  ["Checkbox", "checkbox", (disabled: boolean) => <Checkbox aria-label="Accept" disabled={disabled} />],
  ["Switch", "switch", (disabled: boolean) => <Switch aria-label="Notify" disabled={disabled} />],
  [
    "RadioGroupItem",
    "radio-group-item",
    (disabled: boolean) => (
      <RadioGroup aria-label="Plan">
        <RadioGroupItem value="a" aria-label="Plan A" disabled={disabled} />
      </RadioGroup>
    ),
  ],
] as const;

afterEach(cleanup);

describe.each(controls)("%s states in a browser", (_name, slot, field) => {
  const root = () => document.querySelector<HTMLElement>(`[data-slot="${slot}"]`)!;

  it("dims to half opacity and shows the not-allowed cursor when disabled", () => {
    render(field(true));
    const style = getComputedStyle(root());
    expect({opacity: style.opacity, cursor: style.cursor}).toEqual({opacity: "0.5", cursor: "not-allowed"});
  });

  it("stays at full opacity with the default cursor when enabled", () => {
    render(field(false));
    const style = getComputedStyle(root());
    expect({opacity: style.opacity, cursor: style.cursor}).toEqual({opacity: "1", cursor: "auto"});
  });

  it("strengthens the unchecked border or track on hover only while enabled", async () => {
    render(
      <div>
        <div data-testid="on">{field(false)}</div>
        <div data-testid="off">{field(true)}</div>
      </div>
    );
    const [enabled, disabled] = document.querySelectorAll<HTMLElement>(`[data-slot="${slot}"]`);
    const look = (el: HTMLElement) => `${getComputedStyle(el).borderColor} ${getComputedStyle(el).backgroundColor}`;
    const rest = look(enabled!);
    await userEvent.hover(enabled!);
    await expect.poll(() => look(enabled!)).not.toBe(rest);
    await userEvent.hover(disabled!);
    await new Promise((resolve) => setTimeout(resolve, 250));
    expect(look(disabled!)).toBe(rest);
  });
});
