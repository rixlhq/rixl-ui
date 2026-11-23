import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {InputArea} from "../input-area";

describe("InputArea Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("focuses the textarea when its built-in label is clicked", async () => {
    render(
      <div className="p-8">
        <InputArea label="Notes" placeholder="Add notes" />
      </div>
    );

    await userEvent.click(page.getByText("Notes"));
    await expect.element(page.getByPlaceholder("Add notes")).toHaveFocus();
  });

  it("references the error from the textarea", async () => {
    render(
      <div className="p-8">
        <InputArea label="Notes" placeholder="Add notes" defaultValue="Hi" error="Write at least 10 characters." />
      </div>
    );

    await expect.element(page.getByText("Write at least 10 characters.")).toBeVisible();
    const area = document.querySelector("textarea");
    const error = document.querySelector('[data-slot="input-error"]');
    expect(area?.getAttribute("aria-describedby")?.split(" ")).toContain(error?.getAttribute("id"));
    expect(area).toHaveAttribute("aria-invalid", "true");
  });

  it("has no WCAG 2.2 AA violations in the labelled, required, error and bare states", async () => {
    render(
      <div className="flex flex-col gap-4 p-8">
        <InputArea label="Notes" description="Visible to reviewers." placeholder="Add notes" />
        <InputArea label="Bio" required={false} placeholder="About you" />
        <InputArea label="Feedback" defaultValue="Bad" error="Write at least 20 characters." />
        <InputArea aria-label="Scratchpad" placeholder="Scratchpad" />
      </div>
    );

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
