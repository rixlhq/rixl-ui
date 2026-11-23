import {afterEach, describe, expect, it} from "vitest";
import {cleanup, render} from "@testing-library/react";
import {page, userEvent} from "vitest/browser";
import {axeViolations} from "../../../../test/a11y";
import {Switch} from "../switch";

afterEach(cleanup);

describe("labelled Switch in a browser", () => {
  it("has no axe violations in each arrangement", async () => {
    render(
      <main>
        <Switch label="Notifications" />
        <Switch label="Dark mode" controlFirst={false} defaultChecked />
        <Switch label="Digest" required={false} labelTooltip="Once a week" labelTooltipAriaLabel="About the digest" />
        <Switch label="Locked" disabled />
      </main>
    );
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("toggles when the label text is clicked", async () => {
    render(<Switch label="Notifications" />);
    await userEvent.click(page.getByText("Notifications"));
    expect(page.getByRole("switch", {name: "Notifications"}).element()).toBeChecked();
  });

  it("centres the track on the label text", () => {
    render(<Switch label="Notifications" />);
    const track = document.querySelector('[data-slot="switch"]')!.getBoundingClientRect();
    const text = page.getByText("Notifications").element().getBoundingClientRect();
    expect(Math.abs(track.top + track.height / 2 - (text.top + text.height / 2))).toBeLessThanOrEqual(1);
  });
});
