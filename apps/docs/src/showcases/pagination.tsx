import {useState} from "react";
import {Pagination, PaginationControls, PaginationInfo, PaginationPageInput} from "@rixl/ui/pagination";
import type {ControlValue, Example} from "./registry";

export const path = "pagination";
export const title = "Pagination";
export const description = "Move between pages of a longer list.";
export const notes =
  "First/prev/next/last pager with an optional page-size selector, which is a Select with a visible label, and a page input, which is an Input. Unstyled by locale: every string arrives via props, so consumers wire their own message layer.";

export function Showcase() {
  const [page, setPage] = useState(2);
  return (
    <Pagination
      currentPage={page}
      totalPages={8}
      onPageChange={setPage}
      firstLabel="Go to first page"
      prevLabel="Go to previous page"
      nextLabel="Go to next page"
      lastLabel="Go to last page"
    />
  );
}

function BasicExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [page, setPage] = useState(2);
  const [limit, setLimit] = useState(20);
  return (
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
  );
}

function MinimalExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [page, setPage] = useState(1);
  return (
    <Pagination
      currentPage={page}
      totalPages={4}
      onPageChange={setPage}
      firstLabel="Go to first page"
      prevLabel="Go to previous page"
      nextLabel="Go to next page"
      lastLabel="Go to last page"
    />
  );
}

function PageInputExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [page, setPage] = useState(3);
  return (
    <Pagination page={page} totalPages={8} onPageChange={setPage}>
      <PaginationInfo />
      <PaginationPageInput aria-label="Go to page" />
      <PaginationControls />
    </Pagination>
  );
}

export const examples: Example[] = [
  {id: "basic", title: "Pager with page-size selector", render: BasicExample},
  {
    id: "page-input",
    title: "Pager with a page input",
    description: "Type a page and press Enter or leave the field; out-of-range pages clamp, invalid text restores the current page.",
    render: PageInputExample,
  },
  {id: "minimal", title: "Pager without page-size selector", render: MinimalExample},
];
