import {afterEach, describe, expect, it} from "vitest";
import {page} from "vitest/browser";
import {cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {Pagination, PaginationControls} from "../index";

afterEach(() => {
  cleanup();
  resetDirection();
});

function renderPagination() {
  renderRtl(
    <Pagination page={2} setPage={() => {}} perPage={25} totalCount={500}>
      <PaginationControls />
    </Pagination>
  );
}

const button = (name: string) => page.getByRole("button", {name}).element();
const icon = (name: string) => button(name).querySelector("svg")!;

describe("Pagination in RTL", () => {
  it("places next to the left of previous", async () => {
    renderPagination();
    await expect.element(page.getByRole("button", {name: "Go to next page"})).toBeVisible();
    expect(button("Go to next page").getBoundingClientRect().left).toBeLessThan(button("Go to previous page").getBoundingClientRect().left);
  });

  it.each(["Go to first page", "Go to previous page", "Go to next page", "Go to last page"])("mirrors the icon of %s", async (name) => {
    renderPagination();
    await expect.element(page.getByRole("button", {name})).toBeVisible();
    expect(getComputedStyle(icon(name)).scale).toBe("-1 1");
  });

  it("has no axe violations", async () => {
    renderPagination();
    await expect.element(page.getByRole("button", {name: "Go to next page"})).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
