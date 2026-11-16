import type {ComponentProps} from "react";
import {cn} from "cn";

export type TableRowProps = ComponentProps<"tr">;
export type TableCellProps = ComponentProps<"td">;

export function TableRow({className, ...props}: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-rixl-surface-muted/50 data-[state=selected]:bg-rixl-surface-muted border-b transition-colors duration-rixl-fast ease-rixl-out",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({className, ...props}: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
      {...props}
    />
  );
}
