import {afterEach, describe, expect, it} from "vitest";
import {page} from "vitest/browser";
import {cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "../index";

afterEach(() => {
  cleanup();
  resetDirection();
});

function renderTrail() {
  renderRtl(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe("Breadcrumb in RTL", () => {
  it("lists the first crumb on the right", async () => {
    renderTrail();
    await expect.element(page.getByText("Current")).toBeVisible();
    expect(page.getByText("Home").element().getBoundingClientRect().left).toBeGreaterThan(
      page.getByText("Current").element().getBoundingClientRect().left
    );
  });

  it("mirrors the separator so it points along the reading direction", async () => {
    renderTrail();
    await expect.element(page.getByText("Current")).toBeVisible();
    expect(getComputedStyle(document.querySelector("[data-slot='breadcrumb-separator'] svg")!).scale).toBe("-1 1");
  });

  it("has no axe violations", async () => {
    renderTrail();
    await expect.element(page.getByText("Current")).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
