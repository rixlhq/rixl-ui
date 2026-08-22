import { Input } from "@rixl/ui/input";
import { Label } from "@rixl/ui/label";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "input";
export const title = "Input";
export const group = "Forms";
export const description =
  "Single-line text input. Base UI Input primitive with rixl-token styling for focus and invalid states.";

export function Showcase() {
  return <Input placeholder="Text" className="max-w-sm" />;
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const type = state.type as React.HTMLInputTypeAttribute;
  const disabled = state.disabled as boolean;
  const invalid = state.invalid as boolean;

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="live-input">{type === "email" ? "Email" : "Label"}</Label>
      <Input
        id="live-input"
        type={type}
        placeholder={`${type} placeholder`}
        disabled={disabled}
        aria-invalid={invalid}
      />
      {invalid ? <p className="text-xs text-rixl-danger">Please correct the value.</p> : null}
    </div>
  );
}

function TypesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Types">
      <div className="grid w-full max-w-sm grid-cols-1 gap-3">
        <Input placeholder="Text" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="number" placeholder="Number" />
        <Input type="tel" placeholder="Phone" />
        <Input type="url" placeholder="URL" />
        <Input type="file" />
      </div>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Tweak type, disabled, and invalid states live.",
    render: LiveExample,
    controls: [
      {
        name: "type",
        label: "Type",
        type: "select",
        options: [
          { value: "text", label: "Text" },
          { value: "email", label: "Email" },
          { value: "password", label: "Password" },
          { value: "number", label: "Number" },
          { value: "tel", label: "Phone" },
          { value: "url", label: "URL" },
        ],
        defaultValue: "text",
      },
      { name: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
      { name: "invalid", label: "Invalid", type: "boolean", defaultValue: false },
    ],
    code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
  },
  {
    id: "types",
    title: "Types",
    render: TypesExample,
    code: `<Input placeholder="Text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />`,
  },
];
