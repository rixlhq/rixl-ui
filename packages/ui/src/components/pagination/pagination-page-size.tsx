import {forwardRef, useId} from "react";
import {cn} from "../../lib/cn";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue, type SelectTriggerProps} from "../select";

export type PaginationPageSizeProps = Omit<SelectTriggerProps, "children"> & {
  value: number;
  onPageSizeChange: (pageSize: number) => void;
  /** Page-size choices. Defaults to the legacy limit options. */
  options?: number[];
  /** Visible + accessible label of the selector. */
  label?: string;
};

/** A labelled Select of page sizes. The ref reaches the trigger button, which also receives the remaining props. */
export const PaginationPageSize = forwardRef<HTMLButtonElement, PaginationPageSizeProps>(function PaginationPageSize(
  {value, onPageSizeChange, options = [10, 20, 50, 100], label = "Rows per page", className, ...props},
  ref
) {
  const triggerId = useId();
  return (
    <div data-slot="pagination-page-size" className="flex items-center gap-2 text-sm text-rixl-fg-muted">
      <label htmlFor={triggerId}>{label}</label>
      {/* Base UI keys items by string, so the number crosses the Select as text. */}
      <Select value={String(value)} onValueChange={(next) => onPageSizeChange(Number(next))}>
        <SelectTrigger ref={ref} id={triggerId} className={cn("w-20", className)} {...props}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
PaginationPageSize.displayName = "PaginationPageSize";
