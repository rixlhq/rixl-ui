import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {ButtonGroup} from "../button-group";
import {Button} from "../../button/button";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "../../dropdown-menu/dropdown-menu";

function CaretIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function TestSplitButton() {
  return (
    <div className="p-8">
      <ButtonGroup aria-label="Deploy">
        <Button variant="primary">Deploy</Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            data-testid="split-trigger"
            render={
              <Button variant="primary" shape="square" aria-label="More deploy options">
                <CaretIcon />
              </Button>
            }
          />
          <DropdownMenuContent data-testid="split-content">
            <DropdownMenuItem>Deploy to staging</DropdownMenuItem>
            <DropdownMenuItem>Deploy and tail logs</DropdownMenuItem>
            <DropdownMenuItem>Schedule deploy…</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  );
}

describe("ButtonGroup Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the primary action and the caret trigger as one group", async () => {
    render(<TestSplitButton />);

    const group = page.getByRole("group", {name: "Deploy"});
    await expect.element(group).toBeVisible();
    await expect.element(group).toHaveAttribute("data-slot", "button-group");

    await expect.element(page.getByRole("button", {name: "Deploy"})).toBeVisible();
    await expect.element(page.getByRole("button", {name: "More deploy options"})).toBeVisible();
  });

  it("opens the secondary actions on caret click", async () => {
    render(<TestSplitButton />);

    await userEvent.click(page.getByRole("button", {name: "More deploy options"}));

    const content = page.getByTestId("split-content");
    await expect.element(content).toBeVisible();
    await expect.element(page.getByText("Deploy to staging")).toBeVisible();
  });

  it("has no WCAG 2.2 AA violations when open", async () => {
    render(<TestSplitButton />);
    await userEvent.click(page.getByRole("button", {name: "More deploy options"}));
    await expect.element(page.getByTestId("split-content")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
