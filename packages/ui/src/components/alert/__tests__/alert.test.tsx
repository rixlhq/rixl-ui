import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Alert, AlertDescription, AlertTitle, alertVariants} from "../alert";

describe("Alert", () => {
  it("renders with role='alert'", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
      </Alert>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("sets data-slot='alert' on the root", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
      </Alert>
    );
    expect(screen.getByRole("alert")).toHaveAttribute("data-slot", "alert");
  });

  it("applies the default variant classes", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
      </Alert>
    );
    const cls = screen.getByRole("alert").className;
    expect(cls).toContain("bg-rixl-bg");
    expect(cls).toContain("text-rixl-fg");
  });

  it("respects the destructive variant", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Broken</AlertTitle>
      </Alert>
    );
    expect(screen.getByRole("alert").className).toContain("text-rixl-danger");
  });

  it("forwards additional className without dropping base classes", () => {
    render(
      <Alert className="mt-4">
        <AlertTitle>Heads up</AlertTitle>
      </Alert>
    );
    const cls = screen.getByRole("alert").className;
    expect(cls).toContain("mt-4");
    expect(cls).toContain("rounded-rixl-lg");
  });

  it("renders AlertTitle with data-slot='alert-title' and base classes", () => {
    render(
      <Alert>
        <AlertTitle data-testid="t">Heads up</AlertTitle>
      </Alert>
    );
    const t = screen.getByTestId("t");
    expect(t).toHaveAttribute("data-slot", "alert-title");
    expect(t.className).toContain("font-medium");
    expect(t.className).toContain("line-clamp-1");
  });

  it("renders AlertDescription with data-slot='alert-description' and base classes", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription data-testid="d">Details go here.</AlertDescription>
      </Alert>
    );
    const d = screen.getByTestId("d");
    expect(d).toHaveAttribute("data-slot", "alert-description");
    expect(d.className).toContain("text-rixl-fg-muted");
  });

  it("forwards className on AlertTitle and AlertDescription", () => {
    render(
      <Alert>
        <AlertTitle data-testid="t" className="text-lg">
          Heads up
        </AlertTitle>
        <AlertDescription data-testid="d" className="italic">
          Details go here.
        </AlertDescription>
      </Alert>
    );
    expect(screen.getByTestId("t").className).toContain("text-lg");
    expect(screen.getByTestId("d").className).toContain("italic");
  });

  it("exports an alertVariants helper that returns a class string", () => {
    expect(typeof alertVariants({variant: "destructive"})).toBe("string");
  });
});
