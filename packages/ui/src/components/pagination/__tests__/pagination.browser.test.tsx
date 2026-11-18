import {describe, expect, it, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Pagination} from "../index";

describe("Pagination Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("moves pages with the step buttons", async () => {
    let current = 2;
    const seen: number[] = [];
    render(
      <Pagination
        currentPage={current}
        totalPages={5}
        onPageChange={(next) => {
          seen.push(next);
          current = next;
        }}
        firstLabel="First"
        prevLabel="Prev"
        nextLabel="Next"
        lastLabel="Last"
      />
    );

    await userEvent.click(page.getByRole("button", {name: "Next"}));
    expect(seen).toEqual([3]);
    expect(current).toBe(3);
  });

  it("changes the page size through the limit selector", async () => {
    let limit = 20;
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
        limit={limit}
        setLimit={(next) => {
          limit = next;
        }}
        firstLabel="First"
        prevLabel="Prev"
        nextLabel="Next"
        lastLabel="Last"
      />
    );

    await userEvent.click(page.getByRole("combobox", {name: "Rows per page"}));
    await userEvent.click(page.getByRole("option", {name: "50"}));
    expect(limit).toBe(50);
  });

  it("has no WCAG 2.2 AA violations with the page-size popup open", async () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={() => {}}
        limit={20}
        setLimit={() => {}}
        firstLabel="First"
        prevLabel="Prev"
        nextLabel="Next"
        lastLabel="Last"
      />
    );
    await userEvent.click(page.getByRole("combobox", {name: "Rows per page"}));
    await expect.element(page.getByRole("option", {name: "50"})).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("has no WCAG 2.2 AA violations", async () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={() => {}}
        limit={20}
        setLimit={() => {}}
        firstLabel="First"
        prevLabel="Prev"
        nextLabel="Next"
        lastLabel="Last"
      />
    );
    await expect.element(page.getByRole("navigation", {name: "Pagination"})).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
