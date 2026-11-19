import {afterEach, describe, expect, it, vi} from "vitest";
import {render} from "@testing-library/react";
import {useWarnMissingName} from "../warn-missing-name";

const warning = {component: "Widget", subject: "The widget", fix: "Set aria-label on <Widget />."};

function Probe({missing}: {missing: boolean}) {
  useWarnMissingName(missing, warning);
  return null;
}

describe("useWarnMissingName", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("warns with the component and the fix when the name is missing", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Probe missing />);
    expect(warn).toHaveBeenCalledExactlyOnceWith("[Rixl Widget]: The widget must have an accessible name. Set aria-label on <Widget />.");
  });

  it("stays quiet when the name is present", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Probe missing={false} />);
    expect(warn).not.toHaveBeenCalled();
  });

  it("warns once per instance, not on every re-render", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const {rerender} = render(<Probe missing />);
    rerender(<Probe missing />);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it("warns for each instance", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <>
        <Probe missing />
        <Probe missing />
      </>
    );
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it("warns when a name is removed later", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const {rerender} = render(<Probe missing={false} />);
    rerender(<Probe missing />);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it("is silent in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Probe missing />);
    expect(warn).not.toHaveBeenCalled();
  });
});
