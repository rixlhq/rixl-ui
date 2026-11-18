import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {RixlLocaleProvider} from "../../locale";
import {Breadcrumb, BreadcrumbEllipsis, BreadcrumbList} from "../breadcrumb";

const french = {breadcrumb: {label: "fil d'Ariane", more: "Plus"}};

describe("Breadcrumb landmark name", () => {
  it("is breadcrumb in English by default", () => {
    render(<Breadcrumb />);
    expect(screen.getByRole("navigation", {name: "breadcrumb"})).toBeInTheDocument();
  });

  it("takes the provider's string", () => {
    render(
      <RixlLocaleProvider translations={french}>
        <Breadcrumb />
      </RixlLocaleProvider>
    );
    expect(screen.getByRole("navigation", {name: "fil d'Ariane"})).toBeInTheDocument();
  });

  it("lets the aria-label prop beat the provider", () => {
    render(
      <RixlLocaleProvider translations={french}>
        <Breadcrumb aria-label="Trail" />
      </RixlLocaleProvider>
    );
    expect(screen.getByRole("navigation", {name: "Trail"})).toBeInTheDocument();
  });
});

describe("BreadcrumbEllipsis text", () => {
  const ellipsis = (labels?: {more?: string}) => (
    <BreadcrumbList>
      <BreadcrumbEllipsis labels={labels} />
    </BreadcrumbList>
  );

  it("is More in English by default", () => {
    render(ellipsis());
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("takes the provider's string", () => {
    render(<RixlLocaleProvider translations={french}>{ellipsis()}</RixlLocaleProvider>);
    expect(screen.getByText("Plus")).toBeInTheDocument();
  });

  it("lets labels beat the provider", () => {
    render(<RixlLocaleProvider translations={french}>{ellipsis({more: "Autres"})}</RixlLocaleProvider>);
    expect(screen.getByText("Autres")).toBeInTheDocument();
  });
});
