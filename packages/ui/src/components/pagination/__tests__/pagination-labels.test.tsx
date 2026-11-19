import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {RixlLocaleProvider} from "../../locale";
import {Pagination, type PaginationProps} from "../pagination";

const noop = () => {};
const spanish = {
  pagination: {
    navigation: "Paginación",
    nextPage: "Ir a la página siguiente",
    page: (page: number) => `Página ${page}`,
    showing: (range: string, total: number) => `${range} de ${total}`,
  },
};

function renderPagination(props: Partial<PaginationProps> = {}, translations: object = {}) {
  render(
    <RixlLocaleProvider translations={translations}>
      <Pagination page={3} setPage={noop} perPage={10} totalCount={50} {...props} />
    </RixlLocaleProvider>
  );
}

describe("Pagination strings from the locale provider", () => {
  it("are English without overrides, including the info text", () => {
    renderPagination();
    expect(screen.getByRole("navigation", {name: "Pagination"})).toBeInTheDocument();
    expect(screen.getByText("Showing 21–30 of 50")).toBeInTheDocument();
  });

  it("take the provider's strings for the landmark, a control and the info text", () => {
    renderPagination({}, spanish);
    expect(screen.getByRole("navigation", {name: "Paginación"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Ir a la página siguiente"})).toBeInTheDocument();
    expect(screen.getByText("21–30 de 50")).toBeInTheDocument();
  });

  it("keeps English for the keys the provider leaves out", () => {
    renderPagination({}, spanish);
    expect(screen.getByRole("button", {name: "Go to last page"})).toBeInTheDocument();
  });

  it("use the provider's page text when the total is unknown", () => {
    renderPagination({totalCount: undefined, perPage: undefined, hasNextPage: true} as Partial<PaginationProps>, spanish);
    expect(screen.getByText("Página 3")).toBeInTheDocument();
  });

  it("let the labels prop beat the provider", () => {
    renderPagination({labels: {nextPage: "Weiter", showing: (range, total) => `${range} von ${total}`}}, spanish);
    expect(screen.getByRole("button", {name: "Weiter"})).toBeInTheDocument();
    expect(screen.getByText("21–30 von 50")).toBeInTheDocument();
  });

  it("let the text prop beat labels.showing", () => {
    renderPagination({text: () => "Custom"}, spanish);
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });
});
