import {afterEach, describe, expect, it} from "vitest";
import {page, userEvent} from "vitest/browser";
import {cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {Switch} from "../index";

afterEach(() => {
  cleanup();
  resetDirection();
});

const thumb = () => document.querySelector("[data-slot='switch-thumb']")!;
const track = () => page.getByRole("switch", {name: "Notifications"}).element();

describe("Switch in RTL", () => {
  it("starts on the right and travels to the left when checked", async () => {
    renderRtl(<Switch aria-label="Notifications" />);
    await expect.element(page.getByRole("switch", {name: "Notifications"})).toBeVisible();
    const offset = () => track().getBoundingClientRect().right - thumb().getBoundingClientRect().right;
    const unchecked = offset();
    await userEvent.click(page.getByRole("switch", {name: "Notifications"}));
    await expect.poll(offset).toBeGreaterThan(unchecked + 8);
  });

  it("has no axe violations", async () => {
    renderRtl(<Switch aria-label="Notifications" defaultChecked />);
    await expect.element(page.getByRole("switch", {name: "Notifications"})).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
