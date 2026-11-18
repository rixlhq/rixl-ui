import {describe, expect, it, vi} from "vitest";
import fc from "fast-check";
import {fireEvent, render, screen} from "@testing-library/react";
import {Pagination} from "../pagination";
import {PaginationInfo} from "../pagination-info";
import {PaginationPageSize} from "../pagination-page-size";
import {PaginationSeparator} from "../pagination-separator";

const noop = () => {};

describe("Pagination", () => {
  it("renders a nav landmark with data-slot", () => {
    render(<Pagination page={1} setPage={noop} perPage={10} totalCount={50} />);
    const nav = screen.getByRole("navigation", {name: "Pagination"});
    expect(nav).toHaveAttribute("data-slot", "pagination");
  });

  it("announces the range with a live region", () => {
    render(<Pagination page={2} setPage={noop} perPage={10} totalCount={50} />);
    expect(screen.getByText("Showing 11–20 of 50")).toHaveAttribute("aria-live", "polite");
  });

  it("derives the page count from totalCount and perPage", () => {
    render(<Pagination page={3} setPage={noop} perPage={10} totalCount={25} />);
    expect(screen.getByText("Showing 21–25 of 25")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Go to next page"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "Go to last page"})).toBeDisabled();
  });

  it("defaults the page to 1", () => {
    render(<Pagination setPage={noop} perPage={10} totalCount={50} />);
    expect(screen.getByRole("button", {name: "Go to previous page"})).toBeDisabled();
    expect(screen.getByRole("textbox", {name: "Page number"})).toHaveValue("1");
  });

  it("disables first and previous on the first page", () => {
    render(<Pagination page={1} setPage={noop} perPage={10} totalCount={50} />);
    expect(screen.getByRole("button", {name: "Go to first page"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "Go to previous page"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "Go to next page"})).not.toBeDisabled();
    expect(screen.getByRole("button", {name: "Go to last page"})).not.toBeDisabled();
  });

  it("disables next and last on the last page", () => {
    render(<Pagination page={5} setPage={noop} perPage={10} totalCount={50} />);
    expect(screen.getByRole("button", {name: "Go to next page"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "Go to last page"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "Go to first page"})).not.toBeDisabled();
    expect(screen.getByRole("button", {name: "Go to previous page"})).not.toBeDisabled();
  });

  it("navigates to first, previous, next and last through setPage", () => {
    const setPage = vi.fn();
    render(<Pagination page={3} setPage={setPage} perPage={10} totalCount={50} />);
    screen.getByRole("button", {name: "Go to first page"}).click();
    expect(setPage).toHaveBeenLastCalledWith(1);
    screen.getByRole("button", {name: "Go to previous page"}).click();
    expect(setPage).toHaveBeenLastCalledWith(2);
    screen.getByRole("button", {name: "Go to next page"}).click();
    expect(setPage).toHaveBeenLastCalledWith(4);
    screen.getByRole("button", {name: "Go to last page"}).click();
    expect(setPage).toHaveBeenLastCalledWith(5);
  });

  it("renders first, previous, a page input, next and last for full controls", () => {
    render(<Pagination page={2} setPage={noop} perPage={10} totalCount={50} controls="full" />);
    expect(screen.getAllByRole("button")).toHaveLength(4);
    expect(screen.getByRole("textbox", {name: "Page number"})).toHaveValue("2");
  });

  it("renders previous and next only for simple controls", () => {
    render(<Pagination page={2} setPage={noop} perPage={10} totalCount={50} controls="simple" />);
    expect(screen.getAllByRole("button").map((button) => button.getAttribute("aria-label"))).toEqual([
      "Go to previous page",
      "Go to next page",
    ]);
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  it("flips chevrons in RTL via logical mirroring", () => {
    render(<Pagination page={3} setPage={noop} perPage={10} totalCount={50} />);
    const icons = document.querySelectorAll("[data-slot='pagination'] [data-slot='button'] svg");
    expect(icons.length).toBe(4);
    for (const icon of icons) {
      expect(icon.getAttribute("class")).toContain("rtl:-scale-x-100");
    }
  });

  it("forwards className without dropping the layout", () => {
    render(<Pagination page={1} setPage={noop} perPage={10} totalCount={50} className="max-w-md" />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("max-w-md");
    expect(nav.className).toContain("justify-end");
  });

  it("forwards extra props to the nav element", () => {
    render(<Pagination page={1} setPage={noop} perPage={10} totalCount={50} data-testid="pager" aria-describedby="hint" />);
    expect(screen.getByTestId("pager")).toHaveAttribute("aria-describedby", "hint");
  });

  it("rejects the removed names at compile time", () => {
    // The render is skipped: only the compiler is under test.
    const typecheckOnly = () => (
      <>
        {/* @ts-expect-error -- `currentPage` is gone; `page` is the only name */}
        <Pagination currentPage={1} setPage={noop} perPage={10} totalCount={50} />
        {/* @ts-expect-error -- `totalPages` is gone; the count is derived from `totalCount` and `perPage` */}
        <Pagination page={1} setPage={noop} totalPages={5} />
        {/* @ts-expect-error -- `onPageChange` is gone; `setPage` is the only name */}
        <Pagination page={1} onPageChange={noop} perPage={10} totalCount={50} />
        {/* @ts-expect-error -- `limit` and `setLimit` are gone; use `PaginationPageSize` */}
        <Pagination page={1} setPage={noop} perPage={10} totalCount={50} limit={10} setLimit={noop} />
        {/* @ts-expect-error -- `getPageLabel` is gone; use `text` */}
        <Pagination page={1} setPage={noop} perPage={10} totalCount={50} getPageLabel={() => ""} />
        {/* @ts-expect-error -- a known total needs `perPage` */}
        <Pagination page={1} setPage={noop} totalCount={50} />
      </>
    );
    expect(typecheckOnly).toBeTypeOf("function");
  });
});

describe("Pagination unknown totals", () => {
  it("renders previous and next only, with the page as info", () => {
    render(<Pagination page={2} setPage={noop} hasNextPage />);
    expect(screen.getAllByRole("button").map((button) => button.getAttribute("aria-label"))).toEqual([
      "Go to previous page",
      "Go to next page",
    ]);
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.getByText("Page 2")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Go to next page"})).not.toBeDisabled();
  });

  it("disables next while hasNextPage is false", () => {
    render(<Pagination page={2} setPage={noop} hasNextPage={false} />);
    expect(screen.getByRole("button", {name: "Go to next page"})).toBeDisabled();
  });

  it("steps one page at a time", () => {
    const setPage = vi.fn();
    render(<Pagination page={2} setPage={setPage} hasNextPage />);
    screen.getByRole("button", {name: "Go to next page"}).click();
    expect(setPage).toHaveBeenLastCalledWith(3);
    screen.getByRole("button", {name: "Go to previous page"}).click();
    expect(setPage).toHaveBeenLastCalledWith(1);
  });

  it("ignores hasNextPage when totalCount is given", () => {
    render(<Pagination page={5} setPage={noop} perPage={10} totalCount={50} hasNextPage />);
    expect(screen.getByRole("button", {name: "Go to next page"})).toBeDisabled();
  });
});

describe("Pagination labels", () => {
  it("names the landmark and every control from labels", () => {
    render(
      <Pagination
        page={2}
        setPage={noop}
        perPage={10}
        totalCount={50}
        labels={{
          navigation: "Seiten",
          firstPage: "Erste",
          previousPage: "Zurück",
          nextPage: "Weiter",
          lastPage: "Letzte",
          pageNumber: "Seite",
        }}
      />
    );
    expect(screen.getByRole("navigation", {name: "Seiten"})).toBeInTheDocument();
    for (const name of ["Erste", "Zurück", "Weiter", "Letzte"]) {
      expect(screen.getByRole("button", {name})).toBeInTheDocument();
    }
    expect(screen.getByRole("textbox", {name: "Seite"})).toBeInTheDocument();
  });

  it("keeps the English default for a label that is not passed", () => {
    render(<Pagination page={2} setPage={noop} perPage={10} totalCount={50} labels={{nextPage: "Weiter"}} />);
    expect(screen.getByRole("button", {name: "Go to previous page"})).toBeInTheDocument();
  });
});

describe("Pagination info", () => {
  it("shows a custom text from the text prop", () => {
    render(
      <Pagination
        page={2}
        setPage={noop}
        perPage={10}
        totalCount={50}
        text={({page, pageShowingRange}) => `p${page}: ${pageShowingRange}`}
      />
    );
    expect(screen.getByText("p2: 11–20")).toHaveAttribute("aria-live", "polite");
  });

  it("passes perPage and totalCount to the text function", () => {
    render(
      <Pagination page={1} setPage={noop} perPage={25} totalCount={100} text={({perPage, totalCount}) => `${perPage} of ${totalCount}`} />
    );
    expect(screen.getByText("25 of 100")).toBeInTheDocument();
  });

  it("takes a render function as PaginationInfo children", () => {
    render(
      <Pagination page={2} setPage={noop} perPage={10} totalCount={50}>
        <PaginationInfo>{({page, totalPages}) => `Seite ${page} von ${totalPages}`}</PaginationInfo>
      </Pagination>
    );
    expect(screen.getByText("Seite 2 von 5")).toBeInTheDocument();
  });

  it("takes plain children as PaginationInfo text", () => {
    render(
      <Pagination page={2} setPage={noop} perPage={10} totalCount={50}>
        <PaginationInfo>Results</PaginationInfo>
      </Pagination>
    );
    expect(screen.getByText("Results")).toBeInTheDocument();
  });
});

describe("Pagination parts", () => {
  it("renders the page size as a labelled Select, not a native select", () => {
    const {container} = render(
      <Pagination page={1} setPage={noop} perPage={25} totalCount={100}>
        <PaginationPageSize value={25} onChange={noop} />
      </Pagination>
    );
    const trigger = screen.getByRole("combobox", {name: "Rows per page"});
    expect(trigger).toHaveTextContent("25");
    expect(trigger).toHaveAttribute("data-slot", "select-trigger");
    expect(screen.getByText("Rows per page")).toBeVisible();
    expect(container.querySelector("select")).toBeNull();
  });

  it("names the page size from labels.pageSize and lets label override it", () => {
    render(
      <Pagination page={1} setPage={noop} perPage={25} totalCount={100} labels={{pageSize: "Pro Seite"}}>
        <PaginationPageSize value={25} onChange={noop} />
        <PaginationPageSize value={25} onChange={noop} label="Per page" />
      </Pagination>
    );
    expect(screen.getByRole("combobox", {name: "Pro Seite"})).toBeInTheDocument();
    expect(screen.getByRole("combobox", {name: "Per page"})).toBeInTheDocument();
  });

  it("renders a vertical separator", () => {
    render(
      <Pagination page={1} setPage={noop} perPage={10} totalCount={50}>
        <PaginationSeparator />
      </Pagination>
    );
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("throws when a part is rendered outside Pagination", () => {
    const error = vi.spyOn(console, "error").mockImplementation(noop);
    expect(() => render(<PaginationInfo />)).toThrow(/inside <Pagination>/);
    error.mockRestore();
  });

  it("restores the current page when the page input is given a number out of range", () => {
    const setPage = vi.fn();
    render(<Pagination page={2} setPage={setPage} perPage={10} totalCount={50} />);
    const input = screen.getByRole("textbox", {name: "Page number"});
    fireEvent.change(input, {target: {value: "0"}});
    fireEvent.keyDown(input, {key: "Enter"});
    expect(setPage).toHaveBeenLastCalledWith(1);
  });
});

describe("[property] Pagination navigation", () => {
  const pages = fc
    .integer({min: 3, max: 50})
    .chain((totalPages) => fc.integer({min: 2, max: totalPages - 1}).map((page) => [totalPages, page] as const));

  it("first goes to 1 and last goes to the last page from any middle page", {timeout: 10000}, () => {
    fc.assert(
      fc.property(pages, ([totalPages, page]) => {
        const setPage = vi.fn();
        const {unmount} = render(<Pagination page={page} setPage={setPage} perPage={10} totalCount={totalPages * 10} />);
        screen.getByRole("button", {name: "Go to first page"}).click();
        expect(setPage).toHaveBeenLastCalledWith(1);
        screen.getByRole("button", {name: "Go to last page"}).click();
        expect(setPage).toHaveBeenLastCalledWith(totalPages);
        unmount();
      }),
      {numRuns: 20}
    );
  });

  it("previous and next step exactly one page within bounds", {timeout: 10000}, () => {
    fc.assert(
      fc.property(pages, ([totalPages, page]) => {
        const setPage = vi.fn();
        const {unmount} = render(<Pagination page={page} setPage={setPage} perPage={10} totalCount={totalPages * 10} />);
        screen.getByRole("button", {name: "Go to previous page"}).click();
        expect(setPage).toHaveBeenLastCalledWith(page - 1);
        screen.getByRole("button", {name: "Go to next page"}).click();
        expect(setPage).toHaveBeenLastCalledWith(page + 1);
        unmount();
      }),
      {numRuns: 20}
    );
  });
});
