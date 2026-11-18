import {describe, it, expect, afterEach} from "vitest";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Alert, AlertDescription, AlertTitle} from "../alert";

const LONG_TITLE = "Your subscription renewal could not be processed because the card on file was declined by the issuing bank";

function renderLongTitle() {
  return render(
    <Alert className="w-64">
      <AlertTitle>{LONG_TITLE}</AlertTitle>
    </Alert>
  );
}

describe("Alert Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("wraps a long title onto more than one line", () => {
    const {getByText} = renderLongTitle();
    const title = getByText(LONG_TITLE);

    expect(title.getBoundingClientRect().height).toBeGreaterThan(parseFloat(getComputedStyle(title).lineHeight) * 1.5);
  });

  it("shows the whole title without clipping it", () => {
    const {getByText} = renderLongTitle();
    const title = getByText(LONG_TITLE);

    expect(title.scrollHeight).toBeLessThanOrEqual(title.clientHeight);
  });

  it("wraps an unbreakable title inside the alert", () => {
    const {getByText} = render(
      <Alert className="w-64">
        <AlertTitle>{"averyveryveryverylongunbrokenidentifier".repeat(3)}</AlertTitle>
      </Alert>
    );
    const title = getByText(/averyvery/);

    expect(title.scrollWidth).toBeLessThanOrEqual(title.clientWidth);
  });

  it("has no WCAG 2.2 AA violations for the default and destructive variants", async () => {
    render(
      <div className="flex flex-col gap-4 p-4">
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>You can add components to your app.</AlertDescription>
        </Alert>
        <Alert variant="destructive" role="alert">
          <AlertTitle>Upload failed</AlertTitle>
          <AlertDescription>The file is larger than 10 MB.</AlertDescription>
        </Alert>
      </div>
    );

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
