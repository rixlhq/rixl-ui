import {describe, it, expect, afterEach} from "vitest";
import {userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Button} from "../../button";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../breadcrumb";

/** The spread ring among a box-shadow's layers, e.g. "oklab(…) 0px 0px 0px 3px". */
function spreadRing(boxShadow: string) {
  return boxShadow.match(/[a-z]+\([^)]*\) 0px 0px 0px (?!0px)[\d.]+px/)?.[0];
}

async function focusedRing(element: HTMLElement) {
  await userEvent.tab();
  expect(element).toHaveFocus();
  // The ring transitions in; measure it once it has settled.
  await Promise.all(element.getAnimations().map((animation) => animation.finished));
  return spreadRing(getComputedStyle(element).boxShadow);
}

function renderTrail() {
  return render(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe("Breadcrumb Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows the same focus ring on a link as on a focused Button", async () => {
    const {getByText, unmount} = render(<Button>Save</Button>);
    const buttonRing = await focusedRing(getByText("Save"));
    unmount();

    const {getByText: getLink} = renderTrail();

    expect(buttonRing).toBeDefined();
    expect(await focusedRing(getLink("Home"))).toBe(buttonRing);
  });

  it("draws no outline around a focused link", async () => {
    const {getByText} = renderTrail();
    await userEvent.tab();

    expect(getComputedStyle(getByText("Home")).outlineStyle).toBe("none");
  });

  it("has no WCAG 2.2 AA violations", async () => {
    renderTrail();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
