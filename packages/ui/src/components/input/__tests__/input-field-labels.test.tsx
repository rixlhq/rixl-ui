import type {ReactElement} from "react";
import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {InputGroup, InputGroupInput} from "../../input-group";
import {RixlLocaleProvider} from "../../locale";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../select";
import type {LabelLabels} from "../../label";
import {Input} from "../input";
import {InputArea} from "../input-area";

type FieldProps = {required?: boolean; labels?: Partial<LabelLabels>};

const fields: [string, (props: FieldProps) => ReactElement][] = [
  ["Input", (props) => <Input label="Name" {...props} />],
  ["InputArea", (props) => <InputArea label="Name" {...props} />],
  [
    "InputGroup",
    (props) => (
      <InputGroup label="Name" {...props}>
        <InputGroupInput />
      </InputGroup>
    ),
  ],
  [
    "Select",
    (props) => (
      <Select label="Name" {...props}>
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

describe.each(fields)("%s optional marker", (_name, field) => {
  it("shows (optional) when required is explicitly false", () => {
    render(field({required: false}));
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  it("shows nothing when required is true", () => {
    render(field({required: true}));
    expect(screen.queryByText("(optional)")).not.toBeInTheDocument();
  });

  it("shows nothing when required is undefined", () => {
    render(field({}));
    expect(screen.queryByText("(optional)")).not.toBeInTheDocument();
  });

  it("takes the provider's string", () => {
    render(<RixlLocaleProvider translations={{label: {optional: "(optionnel)"}}}>{field({required: false})}</RixlLocaleProvider>);
    expect(screen.getByText("(optionnel)")).toBeInTheDocument();
  });

  it("lets labels beat the provider", () => {
    render(
      <RixlLocaleProvider translations={{label: {optional: "(optionnel)"}}}>
        {field({required: false, labels: {optional: "(facultatif)"}})}
      </RixlLocaleProvider>
    );
    expect(screen.getByText("(facultatif)")).toBeInTheDocument();
  });
});
