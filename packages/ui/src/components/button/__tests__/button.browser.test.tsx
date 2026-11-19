import {afterEach, describe, expect, it} from "vitest";
import {page, userEvent} from "vitest/browser";
import {cleanup, render} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Button} from "../button";

const SearchIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="11" cy="11" r="7" />
  </svg>
);

function TitledButtons() {
  return (
    <div className="flex gap-4 p-12">
      <Button shape="square" icon={SearchIcon} title="Search" data-testid="icon-only" />
      <Button title="Create a project" data-testid="text">
        Create
      </Button>
    </div>
  );
}

describe("Button title in the browser", () => {
  afterEach(() => {
    cleanup();
  });

  it("opens the tooltip on pointer hover and keeps the button's name", async () => {
    render(<TitledButtons />);
    await userEvent.hover(page.getByTestId("icon-only"));
    await expect.element(page.getByText("Search")).toBeVisible();
    await expect.element(page.getByRole("button", {name: "Search"})).toBeVisible();
  });

  it("opens the tooltip of a disabled button through its wrapper", async () => {
    render(
      <div className="p-12">
        <Button title="Not available yet" disabled>
          Deploy
        </Button>
      </div>
    );
    // The button takes no pointer events, so hover the wrapper the tooltip hangs off.
    await userEvent.hover(page.getByRole("button", {name: "Deploy"}).element().parentElement as HTMLElement);
    await expect.element(page.getByText("Not available yet")).toBeVisible();
  });

  it("has no WCAG 2.2 AA violations with the tooltip open", async () => {
    render(<TitledButtons />);
    await userEvent.hover(page.getByTestId("text"));
    await expect.element(page.getByText("Create a project")).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
