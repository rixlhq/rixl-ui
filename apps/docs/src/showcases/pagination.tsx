import {useState} from "react";
import {Pagination, PaginationControls, PaginationInfo, PaginationPageSize, PaginationSeparator} from "@rixl/ui/pagination";
import type {Example} from "./registry";

export const path = "pagination";
export const title = "Pagination";
export const description = "Move between pages of a longer list.";
export const notes =
  "Kumo's props: page and setPage, plus totalCount with perPage, or hasNextPage when the total is unknown. The default layout is info and controls; compose PaginationInfo, PaginationPageSize (a labelled Select), PaginationSeparator and PaginationControls (a page input, or a Select with pageSelector) in any order. Every string arrives through labels or a render function, so consumers wire their own message layer. labels also takes page(page) and showing(range, total), the default info text. Strings you leave out come from RixlLocaleProvider (@rixl/ui/locale), then English.";

export function Showcase() {
  const [page, setPage] = useState(2);
  return <Pagination page={page} setPage={setPage} perPage={10} totalCount={80} />;
}

function FullExample() {
  const [page, setPage] = useState(2);
  return <Pagination page={page} setPage={setPage} perPage={10} totalCount={100} controls="full" />;
}

function SimpleExample() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} setPage={setPage} perPage={10} totalCount={100} controls="simple" />;
}

function UnknownTotalExample() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} setPage={setPage} hasNextPage={page < 3} text={() => `Page ${page}`} />;
}

function EmptyExample() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} setPage={setPage} perPage={10} totalCount={0} />;
}

function PageSizeExample() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  return (
    <Pagination page={page} setPage={setPage} perPage={perPage} totalCount={500}>
      <PaginationInfo />
      <PaginationSeparator />
      <PaginationPageSize
        value={perPage}
        onChange={(size) => {
          setPerPage(size);
          setPage(1);
        }}
      />
      <PaginationControls />
    </Pagination>
  );
}

function DropdownExample() {
  const [page, setPage] = useState(3);
  return (
    <Pagination page={page} setPage={setPage} perPage={25} totalCount={500}>
      <PaginationInfo />
      <PaginationControls pageSelector="dropdown" />
    </Pagination>
  );
}

function LabelsExample() {
  const [page, setPage] = useState(2);
  return (
    <Pagination
      page={page}
      setPage={setPage}
      perPage={10}
      totalCount={100}
      labels={{
        navigation: "Pagination",
        firstPage: "Première page",
        previousPage: "Page précédente",
        nextPage: "Page suivante",
        lastPage: "Dernière page",
        pageNumber: "Numéro de page",
      }}
      text={({pageShowingRange, totalCount}) => `Affichage de ${pageShowingRange} sur ${totalCount}`}
    />
  );
}

export const examples: Example[] = [
  {
    id: "full",
    title: "Full controls",
    description: "First, previous, a page input, next and last. Press Enter or leave the field to go to the page.",
    render: FullExample,
  },
  {id: "simple", title: "Simple controls", render: SimpleExample},
  {
    id: "unknown-total",
    title: "Unknown total",
    description: "hasNextPage replaces totalCount; first, last and the page input are hidden.",
    render: UnknownTotalExample,
  },
  {id: "empty", title: "Empty results", description: "One empty page with every button disabled.", render: EmptyExample},
  {id: "page-size", title: "Page-size selector", render: PageSizeExample},
  {id: "dropdown", title: "Page dropdown", render: DropdownExample},
  {id: "labels", title: "Labels and text", description: "labels names the controls; text sets the info.", render: LabelsExample},
];
