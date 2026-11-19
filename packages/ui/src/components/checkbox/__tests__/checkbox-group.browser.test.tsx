import {afterEach, describe, expect, it} from "vitest";
import {cleanup, render} from "@testing-library/react";
import {page, userEvent} from "vitest/browser";
import {axeViolations} from "../../../../test/a11y";
import {Checkbox} from "../checkbox";
import {CheckboxGroup} from "../checkbox-group";

afterEach(cleanup);

const preferences = (props: Parameters<typeof CheckboxGroup>[0] = {}) => (
  <CheckboxGroup legend="Preferences" defaultValue={["email"]} {...props}>
    <Checkbox value="email" label="Email" />
    <Checkbox value="sms" label="SMS" />
    <Checkbox value="push" label="Push" labelTooltip="Needs the app" labelTooltipAriaLabel="About push" required={false} />
    <Checkbox value="fax" label="Fax" disabled />
  </CheckboxGroup>
);

describe("CheckboxGroup in a browser", () => {
  it("has no axe violations with a legend, description and error, vertical and horizontal", async () => {
    render(
      <main>
        {preferences({description: "Pick any", error: "Choose at least one"})}
        {preferences({legend: "More", orientation: "horizontal"})}
      </main>
    );
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("checks an item when its label text is clicked", async () => {
    render(preferences());
    await userEvent.click(page.getByText("SMS"));
    expect(page.getByRole("checkbox", {name: "SMS"}).element()).toBeChecked();
    expect(page.getByRole("checkbox", {name: "Email"}).element()).toBeChecked();
  });

  it("toggles the focused item with the space bar", async () => {
    render(preferences());
    page.getByRole("checkbox", {name: "SMS"}).element().focus();
    await userEvent.keyboard(" ");
    expect(page.getByRole("checkbox", {name: "SMS"}).element()).toBeChecked();
  });
});
