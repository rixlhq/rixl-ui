import {forwardRef, type ComponentProps} from "react";

export type PaginationPageSizeProps = Omit<ComponentProps<"select">, "value" | "onChange"> & {
  value: number;
  onPageSizeChange: (pageSize: number) => void;
  /** Page-size choices. Defaults to the legacy limit options. */
  options?: number[];
  /** Visible + accessible label of the selector. */
  label?: string;
};

/** Native select so the primitive ships no overlay dependency. The ref reaches the select, which also receives the remaining props. */
export const PaginationPageSize = forwardRef<HTMLSelectElement, PaginationPageSizeProps>(function PaginationPageSize(
  {value, onPageSizeChange, options = [10, 20, 50, 100], label = "Rows per page", ...props},
  ref
) {
  return (
    <label
      data-slot="pagination-page-size"
      className="flex items-center gap-2 text-sm text-rixl-fg-muted transition-colors duration-rixl-fast ease-rixl-out"
    >
      {label}
      <select
        ref={ref}
        aria-label={label}
        value={value}
        onChange={(event) => onPageSizeChange(Number(event.target.value))}
        className="h-9 cursor-pointer rounded-rixl-md border border-rixl-border bg-rixl-bg px-2 text-sm text-rixl-fg transition-[border-color,background-color,color] duration-rixl-fast ease-rixl-out outline-none focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px] motion-reduce:transition-none"
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
});
PaginationPageSize.displayName = "PaginationPageSize";
