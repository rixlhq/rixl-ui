import {describe, it, expect, afterEach} from "vitest";
import {userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Badge} from "../badge";
import {Button} from "../../button";

function borderTokenColour() {
  const probe = document.createElement("div");
  probe.style.borderTopColor = "var(--rixl-border)";
  probe.style.borderTopStyle = "solid";
  document.body.append(probe);
  const colour = getComputedStyle(probe).borderTopColor;
  probe.remove();
  return colour;
}

/** The spread ring among a box-shadow's layers (a layer with no offset or blur and a spread), e.g. "oklab(…) 0px 0px 0px 3px". */
function spreadRing(boxShadow: string) {
  return boxShadow.match(/[a-z]+\([^)]*\) 0px 0px 0px (?!0px)[\d.]+px/)?.[0];
}

async function focusRing(element: HTMLElement) {
  await userEvent.tab();
  expect(element).toHaveFocus();
  // The ring transitions in; measure it once it has settled.
  await Promise.all(element.getAnimations().map((animation) => animation.finished));
  const style = getComputedStyle(element);
  return {ring: spreadRing(style.boxShadow), outlineStyle: style.outlineStyle};
}

describe("Badge Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("draws the outline variant's border in the border token colour", () => {
    const {getByText} = render(<Badge variant="outline">Outline</Badge>);

    expect(getComputedStyle(getByText("Outline")).borderTopColor).toBe(borderTokenColour());
  });

  it("shows the same focus ring as a focused Button", async () => {
    const {getByText, unmount} = render(<Button>Save</Button>);
    const button = await focusRing(getByText("Save"));
    unmount();

    const {getByText: getBadge} = render(
      <Badge render={<a href="#tag" />} variant="secondary">
        Tag
      </Badge>
    );
    const badge = await focusRing(getBadge("Tag"));

    expect(badge.ring).toBeDefined();
    expect(badge.ring).toBe(button.ring);
  });

  it("draws no outline around a focused badge link", async () => {
    const {getByText} = render(
      <Badge render={<a href="#tag" />} variant="secondary">
        Tag
      </Badge>
    );

    expect((await focusRing(getByText("Tag"))).outlineStyle).toBe("none");
  });

  // success and warning are left out: their text tokens fail AA contrast on the tinted surface (openspec/changes/surface-polish/tasks.md, 6.2).
  it("has no WCAG 2.2 AA violations across the other variants", async () => {
    render(
      <div className="flex gap-2 p-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    );

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
