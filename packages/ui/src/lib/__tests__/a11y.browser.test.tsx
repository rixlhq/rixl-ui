import {describe, it, expect, afterEach} from "vitest";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../test/a11y";

const HANG_MS = 1500;

describe("axeViolations", () => {
  afterEach(() => {
    cleanup();
  });

  it("checks an element that has an infinite animation running", async () => {
    const {container} = render(<button type="button">Save</button>);
    container.querySelector("button")!.animate({transform: ["rotate(0deg)", "rotate(360deg)"]}, {duration: 400, iterations: Infinity});

    const outcome = await Promise.race([
      axeViolations(container),
      new Promise<string>((resolve) => setTimeout(() => resolve("hung"), HANG_MS)),
    ]);

    expect(outcome).toEqual([]);
  });

  it("reports a violation on an element that has an infinite animation running", async () => {
    const {container} = render(<img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" />);
    container.querySelector("img")!.animate({transform: ["rotate(0deg)", "rotate(360deg)"]}, {duration: 400, iterations: Infinity});

    expect(await axeViolations(container)).toEqual([expect.stringContaining("image-alt")]);
  });

  it("waits for a finite animation to end before checking", async () => {
    const {container} = render(<button type="button">Save</button>);
    const animation = container.querySelector("button")!.animate({opacity: [0, 1]}, {duration: 200});
    let finishedBeforeResult = false;
    void animation.finished.then(() => {
      finishedBeforeResult = true;
    });

    await axeViolations(container);

    expect(finishedBeforeResult).toBe(true);
  });
});
