import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../select";
import {usePaginationContext} from "./use-pagination-context";

/** A Select of every page, for `PaginationControls pageSelector="dropdown"`. */
export function PaginationPageSelect({totalPages}: {totalPages: number}) {
  const {page, setPage, labels} = usePaginationContext();
  return (
    // Base UI keys items by string, so the page number crosses the Select as text.
    <Select value={String(page)} onValueChange={(next) => setPage(Number(next))}>
      <SelectTrigger data-slot="pagination-page-select" aria-label={labels.pageNumber} className="w-20">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Array.from({length: totalPages}, (_, index) => (
          <SelectItem key={index + 1} value={String(index + 1)}>
            {index + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
