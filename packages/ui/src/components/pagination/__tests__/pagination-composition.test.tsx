import {createRef} from "react";
import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {Pagination, PaginationControls, PaginationInfo, PaginationPageInput, PaginationPageSize} from "../index";

describe("Pagination composition", () => {
  it("bounds the page and navigation after results shrink", () => {
    const setPage = vi.fn();
    render(<Pagination page={9} setPage={setPage} perPage={10} totalCount={50} />);
    expect(screen.getByRole("textbox", {name: "Page number"})).toHaveValue("5");
    expect(screen.getByRole("button", {name: "Go to next page"})).toBeDisabled();
    screen.getByRole("button", {name: "Go to previous page"}).click();
    expect(setPage).toHaveBeenCalledWith(4);
  });

  it("composes info, page size and simple controls with DOM refs", () => {
    const ref = createRef<HTMLSpanElement>();
    const onChange = vi.fn();
    render(
      <Pagination page={2} setPage={() => {}} perPage={10} totalCount={25}>
        <PaginationInfo ref={ref} />
        <PaginationPageSize value={10} onChange={onChange} options={[10, 20]} />
        <PaginationControls controls="simple" />
      </Pagination>
    );
    expect(ref.current).toHaveTextContent("Showing 11–20 of 25");
    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByRole("combobox", {name: "Rows per page"})).toHaveTextContent("10");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("commits whole page drafts, clamps bounds and restores invalid or escaped drafts", () => {
    const setPage = vi.fn();
    const ref = createRef<HTMLInputElement>();
    render(
      <Pagination page={2} setPage={setPage} perPage={10} totalCount={50}>
        <PaginationPageInput ref={ref} aria-label="Go to page" />
      </Pagination>
    );
    const input = screen.getByRole("textbox", {name: "Go to page"});
    expect(ref.current).toBe(input);
    fireEvent.change(input, {target: {value: "99"}});
    fireEvent.keyDown(input, {key: "Enter"});
    expect(setPage).toHaveBeenLastCalledWith(5);
    setPage.mockClear();
    for (const value of ["2.5", "1e1", "abc", ""]) {
      fireEvent.change(input, {target: {value}});
      fireEvent.blur(input);
      expect(input).toHaveValue("2");
    }
    fireEvent.change(input, {target: {value: "4"}});
    fireEvent.keyDown(input, {key: "Escape"});
    expect(input).toHaveValue("2");
    expect(setPage).not.toHaveBeenCalled();
  });

  it("commits a page draft on blur", () => {
    const setPage = vi.fn();
    render(
      <Pagination page={2} setPage={setPage} perPage={10} totalCount={50}>
        <PaginationPageInput aria-label="Go to page" />
      </Pagination>
    );
    const input = screen.getByRole("textbox", {name: "Go to page"});
    fireEvent.change(input, {target: {value: "4"}});
    fireEvent.blur(input);
    expect(setPage).toHaveBeenCalledWith(4);
  });

  it("renders the page input as an Input with its surface, slot and a default width a consumer can replace", () => {
    render(
      <Pagination page={2} setPage={() => {}} perPage={10} totalCount={50}>
        <PaginationPageInput aria-label="Go to page" />
        <PaginationPageInput aria-label="Wide" className="w-40" />
      </Pagination>
    );
    const input = screen.getByRole("textbox", {name: "Go to page"});
    expect(input).toHaveAttribute("data-slot", "pagination-page-input");
    expect(input).toHaveClass("border-rixl-border", "hover:border-rixl-border-strong", "h-9", "w-16");
    expect(screen.getByRole("textbox", {name: "Wide"})).toHaveClass("w-40");
    expect(screen.getByRole("textbox", {name: "Wide"})).not.toHaveClass("w-16");
  });

  it("takes Input's label prop", () => {
    render(
      <Pagination page={2} setPage={() => {}} perPage={10} totalCount={50}>
        <PaginationPageInput label="Go to page" />
      </Pagination>
    );
    expect(screen.getByRole("textbox", {name: "Go to page"})).toBeInTheDocument();
  });

  it("renders empty results as one empty page and never requests page zero", () => {
    const setPage = vi.fn();
    render(<Pagination page={9} setPage={setPage} perPage={10} totalCount={0} />);
    for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled();
    expect(screen.getByText("Showing 0–0 of 0")).toBeInTheDocument();
    const input = screen.getByRole("textbox", {name: "Page number"});
    expect(input).toHaveValue("1");
    fireEvent.change(input, {target: {value: "3"}});
    fireEvent.keyDown(input, {key: "Enter"});
    expect(setPage).not.toHaveBeenCalledWith(0);
  });
});
