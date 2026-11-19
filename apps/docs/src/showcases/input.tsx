import {Input} from "@rixl/ui/input";
import type {ControlValue, Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "input";
export const title = "Input";
export const description = "Enter a single line of text.";
export const notes =
  "Single-line text input. Base UI Input on rixl tokens, with sizes, hover/focus/disabled/read-only/invalid states, and a built-in field: label, labelTooltip, description, error and required wire the label, aria-describedby and aria-invalid for you. For icons, text addons or buttons around the input use InputGroup. The info-icon button is icon-only, so name it with labelTooltipAriaLabel; setting labelTooltip without it warns in development. (optional) shows after the label only when required is explicitly false (nothing for true or undefined, as in Kumo). Translate it with labels={{optional}} on the field, or app-wide with RixlLocaleProvider (input.optional); labels wins.";

export function Showcase() {
  return (
    <div className="grid gap-3">
      <Input placeholder="Search anything…" aria-label="Demo search" />
      <Input placeholder="you@example.com" aria-label="Demo email" type="email" />
    </div>
  );
}

function LiveExample({state}: {state: Record<string, ControlValue>}) {
  const type = state.type as React.HTMLInputTypeAttribute;
  const size = state.size as "xs" | "sm" | "base" | "lg";
  const disabled = state.disabled as boolean;
  const readOnly = state.readOnly as boolean;
  const invalid = state.invalid as boolean;

  return (
    <Input
      label={type === "email" ? "Email" : "Label"}
      type={type}
      size={size}
      placeholder={`${type} placeholder`}
      disabled={disabled}
      readOnly={readOnly}
      error={invalid ? "Please correct the value." : undefined}
      defaultValue={readOnly ? "read-only value" : undefined}
      className="w-full max-w-sm"
    />
  );
}

function SizesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Sizes">
      <Input size="xs" placeholder="Extra small" aria-label="Extra small" className="w-full max-w-sm" />
      <Input size="sm" placeholder="Small" aria-label="Small" className="w-full max-w-sm" />
      <Input size="base" placeholder="Base" aria-label="Base" className="w-full max-w-sm" />
      <Input size="lg" placeholder="Large" aria-label="Large" className="w-full max-w-sm" />
    </Group>
  );
}

function FieldExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Built-in field">
      <Input label="Email" placeholder="you@example.com" description="We'll never share your address." className="w-full max-w-sm" />
      <Input label="Phone" required={false} placeholder="+1 (555) 000-0000" className="w-full max-w-sm" />
    </Group>
  );
}

function AccessibleNamesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Accessible names">
      <Input
        label="Email"
        placeholder="you@example.com"
        labelTooltip="We only use it for receipts."
        labelTooltipAriaLabel="About email"
        className="w-full max-w-sm"
      />
      <Input placeholder="Search..." aria-label="Search products" className="w-full max-w-sm" />
    </Group>
  );
}

function ErrorExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Error">
      <Input
        label="Email"
        placeholder="you@example.com"
        defaultValue="not-an-email"
        error="Enter a valid email."
        className="w-full max-w-sm"
      />
    </Group>
  );
}

function StatesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="States">
      <Input placeholder="Default" aria-label="Default" className="w-full max-w-sm" />
      <Input placeholder="Disabled" aria-label="Disabled" disabled className="w-full max-w-sm" />
      <Input readOnly defaultValue="Read-only" aria-label="Read-only" className="w-full max-w-sm" />
      <Input aria-invalid aria-label="Invalid" placeholder="Invalid" defaultValue="not-an-email" className="w-full max-w-sm" />
    </Group>
  );
}

function TypesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Types">
      <Input placeholder="Text" aria-label="Text" className="w-full max-w-sm" />
      <Input type="email" placeholder="Email" aria-label="Email" className="w-full max-w-sm" />
      <Input type="password" placeholder="Password" aria-label="Password" className="w-full max-w-sm" />
      <Input type="number" placeholder="Number" aria-label="Number" className="w-full max-w-sm" />
      <Input type="tel" placeholder="Phone" aria-label="Phone" className="w-full max-w-sm" />
      <Input type="url" placeholder="URL" aria-label="URL" className="w-full max-w-sm" />
      <Input type="file" aria-label="File" className="w-full max-w-sm" />
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Tweak size, type, and state live.",
    render: LiveExample,
    controls: [
      {
        name: "size",
        label: "Size",
        type: "select",
        options: [
          {value: "xs", label: "Extra small"},
          {value: "sm", label: "Small"},
          {value: "base", label: "Base"},
          {value: "lg", label: "Large"},
        ],
        defaultValue: "base",
      },
      {
        name: "type",
        label: "Type",
        type: "select",
        options: [
          {value: "text", label: "Text"},
          {value: "email", label: "Email"},
          {value: "password", label: "Password"},
          {value: "number", label: "Number"},
          {value: "tel", label: "Phone"},
          {value: "url", label: "URL"},
        ],
        defaultValue: "text",
      },
      {name: "disabled", label: "Disabled", type: "boolean", defaultValue: false},
      {name: "readOnly", label: "Read-only", type: "boolean", defaultValue: false},
      {name: "invalid", label: "Invalid", type: "boolean", defaultValue: false},
    ],
    code: `<Input label="Email" id="email" type="email" placeholder="you@example.com" />`,
  },
  {
    id: "sizes",
    title: "Sizes",
    render: SizesExample,
    code: `<Input size="xs" placeholder="Extra small" aria-label="Extra small" />
<Input size="sm" placeholder="Small" aria-label="Small" />
<Input size="base" placeholder="Base" aria-label="Base" />
<Input size="lg" placeholder="Large" aria-label="Large" />`,
  },
  {
    id: "field",
    title: "Built-in field",
    description: "label, description and required are props of Input; required={false} shows (optional).",
    render: FieldExample,
    code: `<Input label="Email" placeholder="you@example.com" description="We'll never share your address." />
<Input label="Phone" required={false} placeholder="+1 (555) 000-0000" />`,
  },
  {
    id: "accessible-names",
    title: "Accessible names",
    description:
      "Every input needs a name: a label prop, an aria-label or aria-labelledby. The icon-only tooltip button needs labelTooltipAriaLabel. The library supplies no hidden text and warns in development when a name is missing.",
    render: AccessibleNamesExample,
    code: `<Input label="Email" labelTooltip="We only use it for receipts." labelTooltipAriaLabel="About email" />
<Input placeholder="Search..." aria-label="Search products" />`,
  },
  {
    id: "error",
    title: "Error",
    description: "A string error always shows; an object shows while the native validity matches.",
    render: ErrorExample,
    code: `<Input label="Email" placeholder="you@example.com" defaultValue="not-an-email" error="Enter a valid email." />`,
  },
  {
    id: "states",
    title: "States",
    render: StatesExample,
    code: `<Input placeholder="Default" aria-label="Default" />
<Input placeholder="Disabled" aria-label="Disabled" disabled />
<Input readOnly defaultValue="Read-only" aria-label="Read-only" />
<Input aria-invalid defaultValue="not-an-email" aria-label="Email" />`,
  },
  {
    id: "types",
    title: "Types",
    render: TypesExample,
    code: `<Input placeholder="Text" aria-label="Text" />
<Input type="email" placeholder="Email" aria-label="Email" />
<Input type="password" placeholder="Password" aria-label="Password" />`,
  },
];
