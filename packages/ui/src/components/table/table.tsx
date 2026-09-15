import * as React from "react";

import {cn} from "cn";

/**
 * Rixl Table — plain HTML table styled as a data grid.
 *
 * `containerClassName` targets the wrapper `<div>`, so consumers can opt into
 * horizontal scroll (`overflow-x-auto`) or a self-scrolling body
 * (`overflow-auto max-h-…`) without the primitive forcing a layout that would
 * fight a page-level sticky header.
 */
function Table({className, containerClassName, ...props}: React.ComponentProps<"table"> & {containerClassName?: string}) {
  return (
    <div data-slot="table-container" className={cn("relative w-full", containerClassName)}>
      <table data-slot="table" className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

/**
 * `sticky` pins the header to the top of the scroll context. The top offset is
 * `0` by default — pass `className="top-N"` when it sits under a fixed toolbar.
 * A sticky header needs the page (or the container via `containerClassName`
 * `overflow-y`) to be the vertical scroller.
 */
function TableHeader({className, sticky, ...props}: React.ComponentProps<"thead"> & {sticky?: boolean}) {
  return (
    <thead data-slot="table-header" className={cn("[&_tr]:border-b", sticky && "sticky top-0 z-10 bg-rixl-bg", className)} {...props} />
  );
}

function TableBody({className, ...props}: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableFooter({className, ...props}: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-rixl-surface-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
}

function TableRow({className, ...props}: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("hover:bg-rixl-surface-muted/50 data-[state=selected]:bg-rixl-surface-muted border-b transition-colors", className)}
      {...props}
    />
  );
}

function TableHead({className, ...props}: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-rixl-fg-muted h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCell({className, ...props}: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
      {...props}
    />
  );
}

function TableCaption({className, ...props}: React.ComponentProps<"caption">) {
  return <caption data-slot="table-caption" className={cn("text-rixl-fg-muted mt-4 text-sm", className)} {...props} />;
}

export type TableProps = React.ComponentProps<"table"> & {containerClassName?: string};
export type TableHeaderProps = React.ComponentProps<"thead"> & {sticky?: boolean};
export type TableBodyProps = React.ComponentProps<"tbody">;
export type TableFooterProps = React.ComponentProps<"tfoot">;
export type TableRowProps = React.ComponentProps<"tr">;
export type TableHeadProps = React.ComponentProps<"th">;
export type TableCellProps = React.ComponentProps<"td">;
export type TableCaptionProps = React.ComponentProps<"caption">;

export {Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption};
