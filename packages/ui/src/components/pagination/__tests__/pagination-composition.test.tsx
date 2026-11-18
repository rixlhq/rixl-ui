import {createRef} from "react";
import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {Pagination, PaginationControls, PaginationInfo, PaginationPageInput, PaginationPageSize} from "../index";

describe("Pagination composition", () => {
  it("bounds legacy display and navigation after results shrink", () => {
    const change = vi.fn();
    render(<Pagination currentPage={9} totalPages={5} onPageChange={change} />);
    expect(screen.getByText("Page 5 of 5")).toBeInTheDocument();
    screen.getByRole("button", {name: "Go to previous page"}).click();
    expect(change).toHaveBeenCalledWith(4);
  });

  it("composes record info, page-size and simple controls with DOM refs", () => {
    const ref = createRef<HTMLSpanElement>();
    const sizeChange = vi.fn();
    render(
      <Pagination page={2} pageSize={10} totalCount={25} onPageChange={() => {}}>
        <PaginationInfo ref={ref} />
        <PaginationPageSize value={10} onPageSizeChange={sizeChange} />
        <PaginationControls mode="simple" />
      </Pagination>
    );
    expect(ref.current).toHaveTextContent("Showing 11–20 of 25");
    expect(screen.getAllByRole("button")).toHaveLength(2);
    fireEvent.change(screen.getByLabelText("Rows per page"), {target: {value: "50"}});
    expect(sizeChange).toHaveBeenCalledWith(50);
  });

  it("commits whole page drafts, clamps bounds and restores invalid or escaped drafts", () => {
    const change = vi.fn();
    const ref = createRef<HTMLInputElement>();
    render(
      <Pagination page={2} pageSize={10} totalCount={50} onPageChange={change}>
        <PaginationPageInput ref={ref} aria-label="Go to page" />
      </Pagination>
    );
    const input = screen.getByRole("textbox", {name: "Go to page"});
    expect(ref.current).toBe(input);
    fireEvent.change(input, {target: {value: "99"}});
    fireEvent.keyDown(input, {key: "Enter"});
    expect(change).toHaveBeenLastCalledWith(5);
    change.mockClear();
    for (const value of ["2.5", "1e1", "abc", ""]) {
      fireEvent.change(input, {target: {value}});
      fireEvent.blur(input);
      expect(input).toHaveValue("2");
    }
    fireEvent.change(input, {target: {value: "4"}});
    fireEvent.keyDown(input, {key: "Escape"});
    expect(input).toHaveValue("2");
    expect(change).not.toHaveBeenCalled();
  });

  it("renders the page input as an Input with its surface, slot and a default width a consumer can replace", () => {
    render(
      <Pagination page={2} pageSize={10} totalCount={50} onPageChange={() => {}}>
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
      <Pagination page={2} pageSize={10} totalCount={50} onPageChange={() => {}}>
        <PaginationPageInput label="Go to page" />
      </Pagination>
    );
    expect(screen.getByRole("textbox", {name: "Go to page"})).toBeInTheDocument();
  });

  it("disables every action on empty results and never requests page zero", () => {
    const change = vi.fn();
    render(<Pagination page={9} pageSize={10} totalCount={0} onPageChange={change} />);
    for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled();
    expect(screen.getByText("Showing 0–0 of 0")).toBeInTheDocument();
    expect(change).not.toHaveBeenCalled();
  });
});
