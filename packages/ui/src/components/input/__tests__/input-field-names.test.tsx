import type {ReactElement} from "react";
import {render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";
import {InputGroup, InputGroupInput} from "../../input-group";
import {RixlLocaleProvider} from "../../locale";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../select";
import {Input} from "../input";
import {InputArea} from "../input-area";

type Chrome = {required: false; labelTooltip: string; label: string};
const chrome: Chrome = {required: false, labelTooltip: "Help", label: "Name"};

const fields: [string, (tooltipName?: string, labelTooltip?: string) => ReactElement][] = [
  ["Input", (name, tip = chrome.labelTooltip) => <Input {...chrome} labelTooltip={tip} labelTooltipAriaLabel={name} />],
  ["InputArea", (name, tip = chrome.labelTooltip) => <InputArea {...chrome} labelTooltip={tip} labelTooltipAriaLabel={name} />],
  [
    "InputGroup",
    (name, tip = chrome.labelTooltip) => (
      <InputGroup {...chrome} labelTooltip={tip} labelTooltipAriaLabel={name}>
        <InputGroupInput />
      </InputGroup>
    ),
  ],
  [
    "Select",
    (name, tip = chrome.labelTooltip) => (
      <Select {...chrome} labelTooltip={tip} labelTooltipAriaLabel={name}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    ),
  ],
];

afterEach(() => vi.restoreAllMocks());

describe.each(fields)("%s field chrome", (name, field) => {
  it("names the tooltip trigger from labelTooltipAriaLabel", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(field("About this field"));
    expect(screen.getByRole("button", {name: "About this field"})).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it("warns, naming the prop, when labelTooltip has no labelTooltipAriaLabel", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(field());
    expect(warn).toHaveBeenCalledExactlyOnceWith(
      expect.stringMatching(/\[Rixl .+\]: .+ must have an accessible name\..*labelTooltipAriaLabel/)
    );
  });

  it("does not invent a name for the trigger", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    render(field());
    expect(screen.getByRole("button")).not.toHaveAccessibleName();
  });

  it("does not warn when there is no tooltip", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(field(undefined, ""));
    expect(warn).not.toHaveBeenCalled();
  });

  it("shows (optional) in English by default", () => {
    render(field("About"));
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  it("takes the provider's (optional)", () => {
    render(<RixlLocaleProvider translations={{input: {optional: "(optionnel)"}}}>{field("About")}</RixlLocaleProvider>);
    expect(screen.getByText("(optionnel)")).toBeInTheDocument();
  });

  it("names the component in the warning", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(field());
    expect(warn.mock.calls[0]?.[0]).toContain(`[Rixl ${name}]`);
  });
});
