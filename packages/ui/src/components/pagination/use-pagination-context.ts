import {useContext} from "react";
import {PaginationContext} from "./pagination-context";

export function usePaginationContext() {
  return useContext(PaginationContext);
}
