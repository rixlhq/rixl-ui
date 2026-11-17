import {useState} from "react";
import {Pagination} from "@rixl/ui/pagination";
import type {ControlValue, Example} from "./registry";

export const path = "pagination";
export const title = "Pagination";
export const description =
  "First/prev/next/last pager with an optional page-size selector. Unstyled by locale: every string arrives via props, so consumers wire their own message layer.";

export function Showcase() {
  const [page, setPage] = useState(2);
  return (
    <div className="w-full">
      <Pagination
        currentPage={page}
        totalPages={8}
        onPageChange={setPage}
        firstLabel="Go to first page"
        prevLabel="Go to previous page"
        nextLabel="Go to next page"
        lastLabel="Go to last page"
      />
    </div>
  );
}

function BasicExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [page, setPage] = useState(2);
  const [limit, setLimit] = useState(20);
  return (
    <div className="w-full">
      <Pagination
        currentPage={page}
        totalPages={8}
        onPageChange={setPage}
        limit={limit}
        setLimit={setLimit}
        firstLabel="Go to first page"
        prevLabel="Go to previous page"
        nextLabel="Go to next page"
        lastLabel="Go to last page"
      />
    </div>
  );
}

function MinimalExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [page, setPage] = useState(1);
  return (
    <div className="w-full">
      <Pagination
        currentPage={page}
        totalPages={4}
        onPageChange={setPage}
        firstLabel="Go to first page"
        prevLabel="Go to previous page"
        nextLabel="Go to next page"
        lastLabel="Go to last page"
      />
    </div>
  );
}

export const examples: Example[] = [
  {id: "basic", title: "Pager with page-size selector", render: BasicExample},
  {id: "minimal", title: "Pager without page-size selector", render: MinimalExample},
];
