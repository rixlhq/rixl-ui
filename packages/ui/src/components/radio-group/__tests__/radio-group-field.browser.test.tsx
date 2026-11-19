import {afterEach, describe, expect, it} from "vitest";
import {cleanup, render} from "@testing-library/react";
import {page, userEvent} from "vitest/browser";
import {axeViolations} from "../../../../test/a11y";
import {RadioGroup, RadioGroupItem} from "../radio-group";

afterEach(cleanup);

const plans = (props: Parameters<typeof RadioGroup>[0] = {}) => (
  <RadioGroup legend="Plan" defaultValue="free" {...props}>
    <RadioGroupItem value="free" label="Free" />
    <RadioGroupItem value="pro" label="Pro" />
    <RadioGroupItem value="team" label="Team" disabled />
  </RadioGroup>
);

describe("RadioGroup chrome in a browser", () => {
  it("has no axe violations with a legend, description and error, vertical and horizontal", async () => {
    render(
      <main>
        {plans({description: "Billed monthly", error: "Pick a plan"})}
        {plans({legend: "Size", orientation: "horizontal"})}
        <RadioGroup aria-label="Colour">
          <RadioGroupItem value="a" label="Red" variant="error" controlFirst={false} />
        </RadioGroup>
      </main>
    );
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("selects a radio when its label text is clicked", async () => {
    render(plans());
    await userEvent.click(page.getByText("Pro"));
    expect(page.getByRole("radio", {name: "Pro"}).element()).toBeChecked();
  });

  it("moves between radios with the arrow keys", async () => {
    render(plans());
    page.getByRole("radio", {name: "Free"}).element().focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(page.getByRole("radio", {name: "Pro"}).element()).toBeChecked();
  });

  it("lays horizontal items out in one row and vertical items in one column", () => {
    const {rerender} = render(plans({orientation: "horizontal"}));
    const tops = () =>
      [...document.querySelectorAll('[data-slot="radio-group-item"]')].map((el) => Math.round(el.getBoundingClientRect().top));
    const lefts = () =>
      [...document.querySelectorAll('[data-slot="radio-group-item"]')].map((el) => Math.round(el.getBoundingClientRect().left));
    expect(new Set(tops()).size).toBe(1);
    rerender(plans());
    expect(new Set(lefts()).size).toBe(1);
  });
});
