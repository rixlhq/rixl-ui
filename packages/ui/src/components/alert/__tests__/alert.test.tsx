import {createRef} from "react";
import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Alert, AlertDescription, AlertTitle, alertVariants} from "../alert";

const getAlert = () => document.querySelector<HTMLElement>("[data-slot=alert]")!;

describe("Alert", () => {
  it("has no implicit role, so a static banner is not announced", () => {
    render(<Alert>Saved</Alert>);
    expect(getAlert()).not.toHaveAttribute("role");
  });

  it("takes a role from the consumer", () => {
    render(<Alert role="alert">Upload failed</Alert>);
    expect(screen.getByRole("alert")).toBe(getAlert());
  });

  it("takes the polite status role from the consumer", () => {
    render(<Alert role="status">Saved</Alert>);
    expect(screen.getByRole("status")).toBe(getAlert());
  });

  it("sets data-slot='alert' on the root", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
      </Alert>
    );
    expect(getAlert()).toHaveAttribute("data-slot", "alert");
  });

  it("applies the default variant classes", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
      </Alert>
    );
    const cls = getAlert().className;
    expect(cls).toContain("bg-rixl-bg");
    expect(cls).toContain("text-rixl-fg");
  });

  it("respects the destructive variant", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Broken</AlertTitle>
      </Alert>
    );
    expect(getAlert().className).toContain("text-rixl-danger");
  });

  it("respects the success and warning variants", () => {
    const {rerender} = render(
      <Alert variant="success">
        <AlertTitle>Saved</AlertTitle>
      </Alert>
    );
    expect(getAlert().className).toContain("text-rixl-success");
    rerender(
      <Alert variant="warning">
        <AlertTitle>Caution</AlertTitle>
      </Alert>
    );
    expect(getAlert().className).toContain("text-rixl-warning");
  });

  it("forwards additional className without dropping base classes", () => {
    render(
      <Alert className="mt-4">
        <AlertTitle>Heads up</AlertTitle>
      </Alert>
    );
    const cls = getAlert().className;
    expect(cls).toContain("mt-4");
    expect(cls).toContain("rounded-lg");
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
    expect(t.className).not.toContain("line-clamp");
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

  it("forwards a ref from each part to its element", () => {
    const alertRef = createRef<HTMLDivElement>();
    const titleRef = createRef<HTMLDivElement>();
    const descriptionRef = createRef<HTMLDivElement>();
    render(
      <Alert ref={alertRef}>
        <AlertTitle ref={titleRef}>Heads up</AlertTitle>
        <AlertDescription ref={descriptionRef}>Details go here.</AlertDescription>
      </Alert>
    );
    expect([alertRef.current, titleRef.current, descriptionRef.current]).toEqual([
      getAlert(),
      document.querySelector("[data-slot=alert-title]"),
      document.querySelector("[data-slot=alert-description]"),
    ]);
  });

  it("names every part for devtools", () => {
    expect([Alert, AlertTitle, AlertDescription].map((part) => part.displayName)).toEqual(["Alert", "AlertTitle", "AlertDescription"]);
  });
});
