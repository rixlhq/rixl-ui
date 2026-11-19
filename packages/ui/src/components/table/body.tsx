import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";

export type TableBodyProps = ComponentProps<"tbody">;
export type TableFooterProps = ComponentProps<"tfoot">;
export type TableCaptionProps = ComponentProps<"caption">;

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(({className, ...props}, ref) => (
  <tbody ref={ref} data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(({className, ...props}, ref) => (
  <tfoot
    ref={ref}
    data-slot="table-footer"
    className={cn("bg-rixl-surface-muted/50 border-t border-rixl-border font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(({className, ...props}, ref) => (
  <caption ref={ref} data-slot="table-caption" className={cn("text-rixl-fg-muted mt-4 text-sm", className)} {...props} />
));
TableCaption.displayName = "TableCaption";
