import type {ReactElement} from "react";
import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {InputGroup, InputGroupInput} from "../../input-group";
import {RixlLocaleProvider} from "../../locale";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../select";
import {Input} from "../input";
import {InputArea} from "../input-area";

type Chrome = {required: false; labelTooltip: string; label: string};
const chrome: Chrome = {required: false, labelTooltip: "Help", label: "Name"};

const fields: [string, (labels?: {optional?: string; moreInformation?: string}) => ReactElement][] = [
  ["Input", (labels) => <Input {...chrome} labels={labels} />],
  ["InputArea", (labels) => <InputArea {...chrome} labels={labels} />],
  [
    "InputGroup",
    (labels) => (
      <InputGroup {...chrome} labels={labels}>
        <InputGroupInput />
      </InputGroup>
    ),
  ],
  [
    "Select",
    (labels) => (
      <Select {...chrome} labels={labels}>
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

describe.each(fields)("%s field chrome labels", (_name, field) => {
  it("shows English by default", () => {
    render(field());
    expect(screen.getByText("(optional)")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "More information"})).toBeInTheDocument();
  });

  it("takes the provider's strings", () => {
    render(
      <RixlLocaleProvider translations={{input: {optional: "(optionnel)", moreInformation: "Plus d'infos"}}}>{field()}</RixlLocaleProvider>
    );
    expect(screen.getByText("(optionnel)")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Plus d'infos"})).toBeInTheDocument();
  });

  it("lets labels beat the provider", () => {
    render(
      <RixlLocaleProvider translations={{input: {optional: "(optionnel)", moreInformation: "Plus d'infos"}}}>
        {field({optional: "(opcional)"})}
      </RixlLocaleProvider>
    );
    expect(screen.getByText("(opcional)")).toBeInTheDocument();
  });

  it("keeps the provider's other string when labels sets one key", () => {
    render(
      <RixlLocaleProvider translations={{input: {moreInformation: "Plus d'infos"}}}>{field({optional: "(opcional)"})}</RixlLocaleProvider>
    );
    expect(screen.getByRole("button", {name: "Plus d'infos"})).toBeInTheDocument();
  });
});
