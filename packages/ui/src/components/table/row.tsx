import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";

export type TableRowProps = ComponentProps<"tr">;
export type TableCellProps = ComponentProps<"td">;

/** A row reads as selected from `aria-selected="true"`, the accessible attribute on a selectable grid row. */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({className, ...props}, ref) => (
  <tr
    ref={ref}
    data-slot="table-row"
    className={cn(
      "hover:bg-rixl-surface-muted/50 aria-selected:bg-rixl-surface-muted border-b border-rixl-border transition-colors duration-(--rixl-motion-fast) ease-out",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({className, ...props}, ref) => (
  <td
    ref={ref}
    data-slot="table-cell"
    className={cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";
