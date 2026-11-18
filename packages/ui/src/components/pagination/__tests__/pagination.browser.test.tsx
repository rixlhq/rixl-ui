import {useState} from "react";
import {describe, expect, it, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Pagination, PaginationControls, PaginationInfo, PaginationPageSize, PaginationSeparator} from "../index";

function Demo({
  onPage,
  onSize,
  pageSelector,
}: {
  onPage?: (page: number) => void;
  onSize?: (size: number) => void;
  pageSelector?: "input" | "dropdown";
}) {
  const [current, setCurrent] = useState(2);
  const [perPage, setPerPage] = useState(25);
  return (
    <Pagination
      page={current}
      setPage={(next) => {
        onPage?.(next);
        setCurrent(next);
      }}
      perPage={perPage}
      totalCount={500}
    >
      <PaginationInfo />
      <PaginationSeparator />
      <PaginationPageSize
        value={perPage}
        onChange={(size) => {
          onSize?.(size);
          setPerPage(size);
        }}
      />
      <PaginationControls pageSelector={pageSelector} />
    </Pagination>
  );
}

describe("Pagination Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("moves pages with the step buttons", async () => {
    const seen: number[] = [];
    render(<Demo onPage={(next) => seen.push(next)} />);

    await userEvent.click(page.getByRole("button", {name: "Go to next page"}));
    expect(seen).toEqual([3]);
    await expect.element(page.getByRole("textbox", {name: "Page number"})).toHaveValue("3");
  });

  it("changes the page size through the Select", async () => {
    const sizes: number[] = [];
    render(<Demo onSize={(size) => sizes.push(size)} />);

    await userEvent.click(page.getByRole("combobox", {name: "Rows per page"}));
    await userEvent.click(page.getByRole("option", {name: "50"}));
    expect(sizes).toEqual([50]);
  });

  it("goes to a page picked from the dropdown selector", async () => {
    const seen: number[] = [];
    render(<Demo pageSelector="dropdown" onPage={(next) => seen.push(next)} />);

    expect(document.querySelector('input[inputmode="numeric"]')).toBeNull();
    await userEvent.click(page.getByRole("combobox", {name: "Page number"}));
    await userEvent.click(page.getByRole("option", {name: "4"}));
    expect(seen).toEqual([4]);
  });

  it("has no WCAG 2.2 AA violations with the page-size popup open", async () => {
    render(<Demo />);
    await userEvent.click(page.getByRole("combobox", {name: "Rows per page"}));
    await expect.element(page.getByRole("option", {name: "50"})).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("has no WCAG 2.2 AA violations with the page dropdown open", async () => {
    render(<Demo pageSelector="dropdown" />);
    await userEvent.click(page.getByRole("combobox", {name: "Page number"}));
    await expect.element(page.getByRole("option", {name: "4"})).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("has no WCAG 2.2 AA violations", async () => {
    render(<Demo />);
    await expect.element(page.getByRole("navigation", {name: "Pagination"})).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
