import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";

import {TableHead, TableHeader, type TableHeadProps, type TableHeaderProps} from "./header";
import {TableCell, TableRow, type TableCellProps, type TableRowProps} from "./row";
import {TableBody, TableCaption, TableFooter, type TableBodyProps, type TableCaptionProps, type TableFooterProps} from "./body";

export type TableProps = ComponentProps<"table"> & {containerClassName?: string};

/**
 * Rixl Table — plain HTML table styled as a data grid.
 *
 * The `ref` is the `<table>`. `containerClassName` targets the wrapper `<div>`, so consumers can opt into
 * horizontal scroll (`overflow-x-auto`) or a self-scrolling body
 * (`overflow-auto max-h-…`) without the primitive forcing a layout that would
 * fight a page-level sticky header.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(({className, containerClassName, ...props}, ref) => (
  <div data-slot="table-container" className={cn("relative w-full overflow-x-auto", containerClassName)}>
    <table ref={ref} data-slot="table" className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
));
Table.displayName = "Table";

export {
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TableCaption,
  type TableHeaderProps,
  type TableHeadProps,
  type TableRowProps,
  type TableCellProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableCaptionProps,
};
