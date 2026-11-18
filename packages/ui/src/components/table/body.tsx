import type {ComponentProps} from "react";
import {cn} from "../../lib/cn";

export type TableBodyProps = ComponentProps<"tbody">;
export type TableFooterProps = ComponentProps<"tfoot">;
export type TableCaptionProps = ComponentProps<"caption">;

export function TableBody({className, ...props}: TableBodyProps) {
  return <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

export function TableFooter({className, ...props}: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-rixl-surface-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
}

export function TableCaption({className, ...props}: TableCaptionProps) {
  return <caption data-slot="table-caption" className={cn("text-rixl-fg-muted mt-4 text-sm", className)} {...props} />;
}
