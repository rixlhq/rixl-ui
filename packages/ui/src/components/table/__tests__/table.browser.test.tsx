import {describe, it, expect, afterEach} from "vitest";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Checkbox} from "../../checkbox";
import {Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "../table";

/** The colour `--rixl-border` resolves to, serialised the way getComputedStyle serialises a border colour. */
function borderTokenColour() {
  const probe = document.createElement("div");
  probe.style.borderTopColor = "var(--rixl-border)";
  probe.style.borderTopStyle = "solid";
  document.body.append(probe);
  const colour = getComputedStyle(probe).borderTopColor;
  probe.remove();
  return colour;
}

function renderTable(rowProps: {"aria-selected"?: boolean; "data-state"?: string} = {}) {
  return render(
    <Table>
      <TableCaption>Team roster</TableCaption>
      <TableHeader>
        <TableRow data-testid="head-row">
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-testid="body-row" {...rowProps}>
          <TableCell>Alice</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

describe("Table Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("draws a header row's bottom border in the border token colour", () => {
    const {getByTestId} = renderTable();

    expect(getComputedStyle(getByTestId("head-row")).borderBottomColor).toBe(borderTokenColour());
  });

  it("draws a body row's bottom border in the border token colour", () => {
    const {getByTestId} = renderTable();

    expect(getComputedStyle(getByTestId("body-row")).borderBottomColor).toBe(borderTokenColour());
  });

  it("draws the footer's top border in the border token colour", () => {
    const {container} = renderTable();

    expect(getComputedStyle(container.querySelector("tfoot")!).borderTopColor).toBe(borderTokenColour());
  });

  it("gives a row with aria-selected the selected background", () => {
    const {getByTestId} = renderTable({"aria-selected": true});
    const selected = getComputedStyle(getByTestId("body-row")).backgroundColor;

    cleanup();
    const {getByTestId: getPlain} = renderTable();

    expect(selected).not.toBe(getComputedStyle(getPlain("body-row")).backgroundColor);
  });

  it("gives a row with data-state=selected the same background as aria-selected", () => {
    const {getByTestId} = renderTable({"aria-selected": true});
    const ariaSelected = getComputedStyle(getByTestId("body-row")).backgroundColor;

    cleanup();
    const {getByTestId: getByState} = renderTable({"data-state": "selected"});

    expect(getComputedStyle(getByState("body-row")).backgroundColor).toBe(ariaSelected);
  });

  it.each([
    ["head", TableHead, "th"],
    ["cell", TableCell, "td"],
  ] as const)("centres a 16px checkbox vertically in a table %s", (_name, Part, tag) => {
    const {container} = render(
      <Table>
        <TableBody>
          <TableRow>
            <Part>
              {/* Checkbox renders an unsized inline span, so the box is given a display for the 16px size to apply. */}
              <Checkbox aria-label="Select row" className="inline-flex" />
            </Part>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const part = container.querySelector(tag)!.getBoundingClientRect();
    const box = container.querySelector("[role=checkbox]")!.getBoundingClientRect();

    expect(Math.abs(box.top + box.height / 2 - (part.top + part.height / 2))).toBeLessThanOrEqual(0.5);
    expect(Math.abs(box.top + box.height / 2 - (part.top + part.height / 2))).toBeLessThanOrEqual(0.5);
  });

  it("has no WCAG 2.2 AA violations", async () => {
    renderTable({"aria-selected": true});

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
