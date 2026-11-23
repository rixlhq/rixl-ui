import {createRef} from "react";
import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption} from "../table";

function Basic() {
  return (
    <Table data-testid="table">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>Engineer</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
        </TableRow>
      </TableFooter>
      <TableCaption>Team roster</TableCaption>
    </Table>
  );
}

describe("Table", () => {
  it("sets data-slot markers on all parts", () => {
    render(<Basic />);
    expect(screen.getByTestId("table")).toHaveAttribute("data-slot", "table");
    expect(document.querySelector("[data-slot='table-header']")).toHaveAttribute("data-slot", "table-header");
    expect(document.querySelector("[data-slot='table-body']")).toHaveAttribute("data-slot", "table-body");
    expect(document.querySelector("[data-slot='table-footer']")).toHaveAttribute("data-slot", "table-footer");
    expect(document.querySelector("[data-slot='table-row']")).toHaveAttribute("data-slot", "table-row");
    expect(document.querySelector("[data-slot='table-head']")).toHaveAttribute("data-slot", "table-head");
    expect(document.querySelector("[data-slot='table-cell']")).toHaveAttribute("data-slot", "table-cell");
    expect(document.querySelector("[data-slot='table-caption']")).toHaveAttribute("data-slot", "table-caption");
  });

  it("renders rows and cells", () => {
    render(<Basic />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Engineer")).toBeInTheDocument();
    expect(screen.getByText("Team roster")).toBeInTheDocument();
  });

  it("applies rixl tokens to head", () => {
    render(<Basic />);
    const head = document.querySelector("[data-slot='table-head']");
    expect(head?.className).toContain("text-rixl-fg-muted");
  });

  it("applies row hover token", () => {
    render(<Basic />);
    const row = document.querySelectorAll("[data-slot='table-row']")[1];
    expect(row.className).toContain("hover:bg-rixl-surface-muted/50");
  });

  it("forwards an additional className on the table", () => {
    render(
      <Table data-testid="table" className="max-w-md">
        <TableBody>
          <TableRow>
            <TableCell>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId("table").className).toContain("max-w-md");
  });

  it("header is not sticky by default", () => {
    render(<Basic />);
    const header = document.querySelector("[data-slot='table-header']");
    expect(header!.className).not.toContain("sticky");
  });

  it("header opts into sticky positioning", () => {
    render(
      <Table>
        <TableHeader sticky>
          <TableRow>
            <TableHead>H</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    const header = document.querySelector("[data-slot='table-header']");
    expect(header!.className).toContain("sticky");
    expect(header!.className).toContain("top-0");
    expect(header!.className).toContain("bg-rixl-bg");
  });

  it("forwards containerClassName to the wrapper for opt-in scroll", () => {
    render(
      <Table containerClassName="overflow-x-auto">
        <TableBody>
          <TableRow>
            <TableCell>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const container = document.querySelector("[data-slot='table-container']");
    expect(container!.className).toContain("overflow-x-auto");
  });

  it("styles a row with aria-selected as selected", () => {
    render(
      <Table>
        <TableBody>
          <TableRow aria-selected="true" data-testid="row">
            <TableCell>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId("row").className).toContain("aria-selected:bg-rixl-surface-muted");
  });

  it("forwards a ref from each part to its element", () => {
    const refs = {
      table: createRef<HTMLTableElement>(),
      header: createRef<HTMLTableSectionElement>(),
      body: createRef<HTMLTableSectionElement>(),
      footer: createRef<HTMLTableSectionElement>(),
      row: createRef<HTMLTableRowElement>(),
      head: createRef<HTMLTableCellElement>(),
      cell: createRef<HTMLTableCellElement>(),
      caption: createRef<HTMLTableCaptionElement>(),
    };
    render(
      <Table ref={refs.table}>
        <TableCaption ref={refs.caption}>Roster</TableCaption>
        <TableHeader ref={refs.header}>
          <TableRow ref={refs.row}>
            <TableHead ref={refs.head}>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody ref={refs.body}>
          <TableRow>
            <TableCell ref={refs.cell}>Alice</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter ref={refs.footer}>
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    const tags = Object.fromEntries(Object.entries(refs).map(([name, ref]) => [name, ref.current?.tagName]));
    expect(tags).toEqual({
      table: "TABLE",
      header: "THEAD",
      body: "TBODY",
      footer: "TFOOT",
      row: "TR",
      head: "TH",
      cell: "TD",
      caption: "CAPTION",
    });
  });

  it("names every part for devtools", () => {
    const names = [Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption].map(
      (part) => part.displayName
    );
    expect(names).toEqual(["Table", "TableHeader", "TableBody", "TableFooter", "TableRow", "TableHead", "TableCell", "TableCaption"]);
  });
});
