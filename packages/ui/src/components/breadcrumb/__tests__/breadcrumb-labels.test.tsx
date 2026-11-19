import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {RixlLocaleProvider} from "../../locale";
import {Breadcrumb} from "../breadcrumb";

const french = {breadcrumb: {label: "fil d'Ariane"}};

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
