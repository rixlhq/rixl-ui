import {useContext} from "react";
import {PaginationContext} from "./pagination-context";

export function usePaginationContext() {
  const pagination = useContext(PaginationContext);
  if (!pagination) throw new Error("Pagination parts must be rendered inside <Pagination>.");
  return pagination;
}
