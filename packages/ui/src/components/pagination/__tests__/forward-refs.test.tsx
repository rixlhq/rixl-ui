import {ChevronRight} from "lucide-react";
import {describeForwardRefs} from "../../../../test/forward-ref";
import {
  Pagination,
  PaginationControls,
  PaginationInfo,
  PaginationNavButton,
  PaginationPageInput,
  PaginationPageSize,
  PaginationSeparator,
} from "../index";

const noop = () => {};

describeForwardRefs([
  {
    name: "Pagination",
    component: Pagination,
    element: (ref) => <Pagination ref={ref} page={1} setPage={noop} perPage={10} totalCount={30} />,
    slot: "pagination",
  },
  {
    name: "PaginationInfo",
    component: PaginationInfo,
    element: (ref) => (
      <Pagination page={1} setPage={noop} perPage={10} totalCount={30}>
        <PaginationInfo ref={ref} />
      </Pagination>
    ),
    slot: "pagination-info",
  },
  {
    name: "PaginationControls",
    component: PaginationControls,
    element: (ref) => (
      <Pagination page={1} setPage={noop} perPage={10} totalCount={30}>
        <PaginationControls ref={ref} />
      </Pagination>
    ),
    slot: "pagination-controls",
  },
  {
    name: "PaginationNavButton",
    component: PaginationNavButton,
    element: (ref) => <PaginationNavButton ref={ref} target={2} setPage={noop} Icon={ChevronRight} aria-label="Next" />,
    slot: "button",
  },
  {
    name: "PaginationPageInput",
    component: PaginationPageInput,
    element: (ref) => (
      <Pagination page={1} setPage={noop} perPage={10} totalCount={30}>
        <PaginationPageInput ref={ref} aria-label="Go to page" />
      </Pagination>
    ),
    slot: "pagination-page-input",
  },
  {
    name: "PaginationPageSize",
    component: PaginationPageSize,
    element: (ref) => (
      <Pagination page={1} setPage={noop} perPage={10} totalCount={30}>
        <PaginationPageSize ref={ref} value={25} onChange={noop} />
      </Pagination>
    ),
    slot: "select-trigger",
    selector: '[data-slot="pagination-page-size"] [data-slot="select-trigger"]',
  },
  {
    name: "PaginationSeparator",
    component: PaginationSeparator,
    element: (ref) => (
      <Pagination page={1} setPage={noop} perPage={10} totalCount={30}>
        <PaginationSeparator ref={ref} />
      </Pagination>
    ),
    slot: "pagination-separator",
  },
]);
