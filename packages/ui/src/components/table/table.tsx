import * as React from "react";

import {cn} from "../../lib/cn";

/**
 * Rixl Table — plain HTML table styled as a data grid.
 * Ported verbatim from dashboard; token-mapped to rixl tokens.
 */
function Table({className, ...props}: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full">
      <table data-slot="table" className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

function TableHeader({className, ...props}: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("[&_tr]:border-b sticky top-12 bg-rixl-bg z-10", className)} {...props} />;
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

export type TableProps = React.ComponentProps<"table">;
export type TableHeaderProps = React.ComponentProps<"thead">;
export type TableBodyProps = React.ComponentProps<"tbody">;
export type TableFooterProps = React.ComponentProps<"tfoot">;
export type TableRowProps = React.ComponentProps<"tr">;
export type TableHeadProps = React.ComponentProps<"th">;
export type TableCellProps = React.ComponentProps<"td">;
export type TableCaptionProps = React.ComponentProps<"caption">;

export {Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption};
