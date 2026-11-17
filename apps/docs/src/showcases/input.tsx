import {Input} from "@rixl/ui/input";
import type {ControlValue, Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "input";
export const title = "Input";
export const description = "Enter a single line of text.";
export const notes =
  "Single-line text input. Base UI Input on rixl tokens, with three sizes, leading/trailing icon slots, hover/focus/disabled/read-only/invalid states, and built-in Field props (label, description, error).";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function Showcase() {
  return (
    <div className="grid gap-3">
      <Input placeholder="Search anything…" aria-label="Demo search" startIcon={<SearchIcon />} />
      <Input placeholder="you@example.com" aria-label="Demo email" type="email" />
    </div>
  );
}

function LiveExample({state}: {state: Record<string, ControlValue>}) {
  const type = state.type as React.HTMLInputTypeAttribute;
  const inputSize = state.inputSize as "sm" | "default" | "lg";
  const disabled = state.disabled as boolean;
  const readOnly = state.readOnly as boolean;
  const invalid = state.invalid as boolean;
  const withIcon = state.withIcon as boolean;

  return (
    <Input
      label={type === "email" ? "Email" : "Label"}
      type={type}
      inputSize={inputSize}
      placeholder={`${type} placeholder`}
      disabled={disabled}
      readOnly={readOnly}
      error={invalid ? "Please correct the value." : undefined}
      defaultValue={readOnly ? "read-only value" : undefined}
      startIcon={withIcon ? <SearchIcon /> : undefined}
      className="w-full max-w-sm"
      wrapperClassName="w-full max-w-sm"
    />
  );
}

function SizesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Sizes">
      <Input inputSize="sm" placeholder="Small" className="w-full max-w-sm" />
      <Input inputSize="default" placeholder="Default" className="w-full max-w-sm" />
      <Input inputSize="lg" placeholder="Large" className="w-full max-w-sm" />
    </Group>
  );
}

function IconsExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="With icons">
      <Input placeholder="Search" startIcon={<SearchIcon />} className="w-full max-w-sm" wrapperClassName="w-full max-w-sm" />
      <Input type="password" placeholder="Password" endIcon={<EyeIcon />} className="w-full max-w-sm" wrapperClassName="w-full max-w-sm" />
      <Input
        placeholder="Both"
        startIcon={<SearchIcon />}
        endIcon={<EyeIcon />}
        className="w-full max-w-sm"
        wrapperClassName="w-full max-w-sm"
      />
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
      <Input placeholder="Default" className="w-full max-w-sm" />
      <Input placeholder="Disabled" disabled className="w-full max-w-sm" />
      <Input readOnly defaultValue="Read-only" className="w-full max-w-sm" />
      <Input aria-invalid placeholder="Invalid" defaultValue="not-an-email" className="w-full max-w-sm" />
    </Group>
  );
}

function TypesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Types">
      <Input placeholder="Text" className="w-full max-w-sm" />
      <Input type="email" placeholder="Email" className="w-full max-w-sm" />
      <Input type="password" placeholder="Password" className="w-full max-w-sm" />
      <Input type="number" placeholder="Number" className="w-full max-w-sm" />
      <Input type="tel" placeholder="Phone" className="w-full max-w-sm" />
      <Input type="url" placeholder="URL" className="w-full max-w-sm" />
      <Input type="file" className="w-full max-w-sm" />
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
        name: "inputSize",
        label: "Size",
        type: "select",
        options: [
          {value: "sm", label: "Small"},
          {value: "default", label: "Default"},
          {value: "lg", label: "Large"},
        ],
        defaultValue: "default",
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
      {name: "withIcon", label: "Start icon", type: "boolean", defaultValue: false},
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
    code: `<Input inputSize="sm" placeholder="Small" />
<Input inputSize="default" placeholder="Default" />
<Input inputSize="lg" placeholder="Large" />`,
  },
  {
    id: "icons",
    title: "With icons",
    description: "startIcon / endIcon wrap the field and auto-pad to clear the glyph.",
    render: IconsExample,
    code: `<Input placeholder="Search" startIcon={<SearchIcon />} />
<Input type="password" placeholder="Password" endIcon={<EyeIcon />} />`,
  },
  {
    id: "field",
    title: "Built-in field",
    description: "label, description and required wire through the Field wrapper; required={false} shows (optional).",
    render: FieldExample,
    code: `<Input label="Email" placeholder="you@example.com" description="We'll never share your address." />
<Input label="Phone" required={false} placeholder="+1 (555) 000-0000" />`,
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
    code: `<Input placeholder="Default" />
<Input placeholder="Disabled" disabled />
<Input readOnly defaultValue="Read-only" />
<Input aria-invalid defaultValue="not-an-email" />`,
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
