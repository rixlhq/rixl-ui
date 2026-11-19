import {forwardRef} from "react";
import {cn} from "../../lib/cn";
import {Separator, type SeparatorProps} from "../separator";

export type PaginationSeparatorProps = Omit<SeparatorProps, "orientation">;

/** A vertical rule between the parts of a custom `Pagination` layout. */
export const PaginationSeparator = forwardRef<HTMLDivElement, PaginationSeparatorProps>(function PaginationSeparator(
  {className, ...props},
  ref
) {
  return (
    <Separator
      ref={ref}
      data-slot="pagination-separator"
      orientation="vertical"
      className={cn("data-[orientation=vertical]:h-5", className)}
      {...props}
    />
  );
});
PaginationSeparator.displayName = "PaginationSeparator";
