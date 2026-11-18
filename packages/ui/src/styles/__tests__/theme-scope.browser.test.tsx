import {describe, it, expect, afterEach} from "vitest";
import {render, cleanup} from "@testing-library/react";
import {Button} from "../../components/button";
import {Card, CardContent} from "../../components/card";

type Theme = "light" | "dark";

/** The token-driven properties of a Button and a selected Card, which between them use bg, text, border, ring and shadow utilities. */
function paint() {
  const button = getComputedStyle(document.querySelector<HTMLElement>("[data-testid=button]")!);
  const card = getComputedStyle(document.querySelector<HTMLElement>("[data-testid=card]")!);
  return {
    buttonBackground: button.backgroundColor,
    buttonText: button.color,
    cardBackground: card.backgroundColor,
    cardText: card.color,
    cardBorder: card.borderTopColor,
    cardShadow: card.boxShadow,
  };
}

function Subject() {
  return (
    <>
      <Button data-testid="button">Save</Button>
      <Card data-testid="card" selected>
        <CardContent>Body</CardContent>
      </Card>
    </>
  );
}

/** How the subject paints under a theme set on <html>, the baseline a nested scope must match. */
function paintUnderRoot(theme: Theme | null) {
  if (theme) document.documentElement.setAttribute("data-theme", theme);
  const {unmount} = render(<Subject />);
  const painted = paint();
  unmount();
  document.documentElement.removeAttribute("data-theme");
  return painted;
}

describe("Theme scope Browser Mode", () => {
  afterEach(() => {
    cleanup();
    document.documentElement.removeAttribute("data-theme");
  });

  it("paints the dark values on a data-theme=dark ancestor inside a light page", () => {
    const dark = paintUnderRoot("dark");
    const light = paintUnderRoot(null);
    render(
      <div data-theme="dark">
        <Subject />
      </div>
    );

    expect(paint()).toEqual(dark);
    expect(dark).not.toEqual(light);
  });

  it("paints the light values on a data-theme=light ancestor inside a dark page", () => {
    const light = paintUnderRoot(null);
    document.documentElement.setAttribute("data-theme", "dark");
    render(
      <div data-theme="light">
        <Subject />
      </div>
    );

    expect(paint()).toEqual(light);
  });

  it("paints the element that carries data-theme with its own values", () => {
    const surface = (theme: Theme | null) => {
      if (theme) document.documentElement.setAttribute("data-theme", theme);
      const {unmount, getByTestId} = render(<div data-testid="surface" className="bg-rixl-surface" />);
      const colour = getComputedStyle(getByTestId("surface")).backgroundColor;
      unmount();
      document.documentElement.removeAttribute("data-theme");
      return colour;
    };
    const dark = surface("dark");
    const light = surface(null);
    document.documentElement.setAttribute("data-theme", "dark");
    const {getByTestId} = render(<div data-testid="surface" data-theme="light" className="bg-rixl-surface" />);

    expect(getComputedStyle(getByTestId("surface")).backgroundColor).toBe(light);
    expect(dark).not.toBe(light);
  });
});
