import {describe, expect, it, vi} from "vitest";
import fc from "fast-check";
import {render, screen} from "@testing-library/react";
import {Pagination} from "../pagination";

function labels() {
  return {
    firstLabel: "First",
    prevLabel: "Prev",
    nextLabel: "Next",
    lastLabel: "Last",
  };
}

describe("Pagination", () => {
  it("renders a nav landmark with data-slot", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} {...labels()} />);
    const nav = screen.getByRole("navigation", {name: "Pagination"});
    expect(nav).toHaveAttribute("data-slot", "pagination");
  });

  it("announces the current page with a live region", () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={() => {}} {...labels()} />);
    const status = screen.getByText("Page 2 of 5");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("shows 0 of 0 when there are no pages", () => {
    render(<Pagination currentPage={1} totalPages={0} onPageChange={() => {}} {...labels()} />);
    expect(screen.getByText("Page 0 of 0")).toBeInTheDocument();
  });

  it("supports a custom page label", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={() => {}}
        getPageLabel={(current, total) => `Seite ${current} von ${total}`}
        {...labels()}
      />
    );
    expect(screen.getByText("Seite 2 von 5")).toBeInTheDocument();
  });

  it("disables first and prev on the first page", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} {...labels()} />);
    expect(screen.getByRole("button", {name: "First"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "Prev"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "Next"})).not.toBeDisabled();
    expect(screen.getByRole("button", {name: "Last"})).not.toBeDisabled();
  });

  it("disables next and last on the last page", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} {...labels()} />);
    expect(screen.getByRole("button", {name: "Next"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "Last"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "First"})).not.toBeDisabled();
    expect(screen.getByRole("button", {name: "Prev"})).not.toBeDisabled();
  });

  it("disables next and last when there are no pages", () => {
    render(<Pagination currentPage={1} totalPages={0} onPageChange={() => {}} {...labels()} />);
    expect(screen.getByRole("button", {name: "Next"})).toBeDisabled();
    expect(screen.getByRole("button", {name: "Last"})).toBeDisabled();
  });

  it("navigates to first, prev, next, and last", () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} {...labels()} />);
    screen.getByRole("button", {name: "First"}).click();
    expect(onPageChange).toHaveBeenLastCalledWith(1);
    screen.getByRole("button", {name: "Prev"}).click();
    expect(onPageChange).toHaveBeenLastCalledWith(2);
    screen.getByRole("button", {name: "Next"}).click();
    expect(onPageChange).toHaveBeenLastCalledWith(4);
    screen.getByRole("button", {name: "Last"}).click();
    expect(onPageChange).toHaveBeenLastCalledWith(5);
  });

  it("hides the limit selector unless limit and setLimit are both provided", () => {
    const {unmount} = render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} {...labels()} />);
    expect(screen.queryByLabelText("Rows per page")).toBeNull();
    unmount();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} limit={20} {...labels()} />);
    expect(screen.queryByLabelText("Rows per page")).toBeNull();
  });

  it("renders limit options and reports selection", () => {
    const setLimit = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} limit={20} setLimit={setLimit} {...labels()} />);
    const select = screen.getByLabelText("Rows per page");
    expect(select).toHaveValue("20");
    expect(screen.getByRole("option", {name: "10"})).toBeInTheDocument();
    (select as HTMLSelectElement).value = "50";
    select.dispatchEvent(new Event("change", {bubbles: true}));
    expect(setLimit).toHaveBeenCalledWith(50);
  });

  it("opts out of the limit selector and renders a custom slot instead", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
        limit={20}
        setLimit={() => {}}
        showLimitSelector={false}
        renderLimitSelector={<div data-testid="custom-limit">custom</div>}
        {...labels()}
      />
    );
    expect(screen.queryByLabelText("Rows per page")).toBeNull();
    expect(screen.getByTestId("custom-limit")).toBeInTheDocument();
  });

  it("flips chevrons in RTL via logical mirroring", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={() => {}} {...labels()} />);
    const icons = document.querySelectorAll("[data-slot='pagination'] svg");
    expect(icons.length).toBe(4);
    for (const icon of icons) {
      expect(icon.className.baseVal ?? icon.getAttribute("class")).toContain("rtl:-scale-x-100");
    }
  });

  it("forwards className without dropping the layout and keeps control spacing", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} className="max-w-md" {...labels()} />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("max-w-md");
    expect(nav.className).toContain("justify-end");
  });

  it("forwards extra props to the nav element", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} data-testid="pager" aria-describedby="hint" {...labels()} />);
    const nav = screen.getByTestId("pager");
    expect(nav).toHaveAttribute("aria-describedby", "hint");
  });
});

describe("[property] Pagination navigation", () => {
  it("first goes to 1 and last goes to totalPages from any middle page", {timeout: 10000}, () => {
    fc.assert(
      fc.property(
        fc
          .integer({min: 3, max: 50})
          .chain((totalPages) => fc.integer({min: 2, max: totalPages - 1}).map((currentPage) => [totalPages, currentPage] as const)),
        ([totalPages, currentPage]) => {
          const onPageChange = vi.fn();
          const {unmount} = render(
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              firstLabel="First"
              prevLabel="Prev"
              nextLabel="Next"
              lastLabel="Last"
            />
          );
          screen.getByRole("button", {name: "First"}).click();
          expect(onPageChange).toHaveBeenLastCalledWith(1);
          screen.getByRole("button", {name: "Last"}).click();
          expect(onPageChange).toHaveBeenLastCalledWith(totalPages);
          unmount();
        }
      ),
      {numRuns: 20}
    );
  });

  it("prev/next step exactly one page within bounds", {timeout: 10000}, () => {
    fc.assert(
      fc.property(
        fc
          .integer({min: 3, max: 50})
          .chain((totalPages) => fc.integer({min: 2, max: totalPages - 1}).map((currentPage) => [totalPages, currentPage] as const)),
        ([totalPages, currentPage]) => {
          const onPageChange = vi.fn();
          const {unmount} = render(
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              firstLabel="First"
              prevLabel="Prev"
              nextLabel="Next"
              lastLabel="Last"
            />
          );
          screen.getByRole("button", {name: "Prev"}).click();
          expect(onPageChange).toHaveBeenLastCalledWith(currentPage - 1);
          screen.getByRole("button", {name: "Next"}).click();
          expect(onPageChange).toHaveBeenLastCalledWith(currentPage + 1);
          unmount();
        }
      ),
      {numRuns: 20}
    );
  });
});
