import {ChevronRight} from "lucide-react";
import {describeForwardRefs} from "../../../../test/forward-ref";
import {Pagination, PaginationControls, PaginationInfo, PaginationNavButton, PaginationPageInput, PaginationPageSize} from "../index";

const noop = () => {};

describeForwardRefs([
  {
    name: "Pagination",
    component: Pagination,
    element: (ref) => <Pagination ref={ref} page={1} totalPages={3} onPageChange={noop} />,
    slot: "pagination",
  },
  {
    name: "PaginationInfo",
    component: PaginationInfo,
    element: (ref) => (
      <Pagination page={1} totalPages={3} onPageChange={noop}>
        <PaginationInfo ref={ref} />
      </Pagination>
    ),
    slot: "pagination-info",
  },
  {
    name: "PaginationControls",
    component: PaginationControls,
    element: (ref) => (
      <Pagination page={1} totalPages={3} onPageChange={noop}>
        <PaginationControls ref={ref} />
      </Pagination>
    ),
    slot: "pagination-controls",
  },
  {
    name: "PaginationNavButton",
    component: PaginationNavButton,
    element: (ref) => <PaginationNavButton ref={ref} target={2} onPageChange={noop} Icon={ChevronRight} aria-label="Next" />,
    slot: "button",
  },
  {
    name: "PaginationPageInput",
    component: PaginationPageInput,
    element: (ref) => (
      <Pagination page={1} totalPages={3} onPageChange={noop}>
        <PaginationPageInput ref={ref} aria-label="Go to page" />
      </Pagination>
    ),
    slot: "pagination-page-input",
  },
  {
    name: "PaginationPageSize",
    component: PaginationPageSize,
    element: (ref) => <PaginationPageSize ref={ref} value={10} onPageSizeChange={noop} />,
    slot: "select-trigger",
    selector: '[data-slot="pagination-page-size"] [data-slot="select-trigger"]',
  },
]);
