import type {ComponentProps} from "react";
import {cn} from "cn";

export type TableHeaderProps = ComponentProps<"thead"> & {sticky?: boolean};
export type TableHeadProps = ComponentProps<"th">;

/**
 * `sticky` pins the header to the top of the scroll context. The top offset is
 * `0` by default — pass `className="top-N"` when it sits under a fixed toolbar.
 * A sticky header needs the page (or the container via `containerClassName`
 * `overflow-y`) to be the vertical scroller.
 */
export function TableHeader({className, sticky, ...props}: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", sticky && "sticky top-0 z-10 bg-rixl-bg/90 backdrop-blur-sm", className)}
      {...props}
    />
  );
}

export function TableHead({className, ...props}: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-rixl-fg-muted h-10 px-2 text-start align-middle font-medium [&:has([role=checkbox])]:pe-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}
