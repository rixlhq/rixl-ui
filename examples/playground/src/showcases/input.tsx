import { Input } from "@rixl/ui/input";
import { Label } from "@rixl/ui/label";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "input";
export const title = "Input";
export const group = "Forms";
export const description =
  "Single-line text input. Base UI Input on rixl tokens, with three sizes, leading/trailing icon slots, and hover/focus/disabled/read-only/invalid states.";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function Showcase() {
  return <Input placeholder="Text" className="max-w-sm" />;
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const type = state.type as React.HTMLInputTypeAttribute;
  const inputSize = state.inputSize as "sm" | "default" | "lg";
  const disabled = state.disabled as boolean;
  const readOnly = state.readOnly as boolean;
  const invalid = state.invalid as boolean;
  const withIcon = state.withIcon as boolean;

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="live-input">{type === "email" ? "Email" : "Label"}</Label>
      <Input
        id="live-input"
        type={type}
        inputSize={inputSize}
        placeholder={`${type} placeholder`}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={invalid}
        defaultValue={readOnly ? "read-only value" : undefined}
        startIcon={withIcon ? <SearchIcon /> : undefined}
      />
      {invalid ? <p className="text-xs text-rixl-danger">Please correct the value.</p> : null}
    </div>
  );
}

function SizesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Sizes">
      <div className="grid w-full max-w-sm grid-cols-1 gap-3">
        <Input inputSize="sm" placeholder="Small" />
        <Input inputSize="default" placeholder="Default" />
        <Input inputSize="lg" placeholder="Large" />
      </div>
    </Group>
  );
}

function IconsExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="With icons">
      <div className="grid w-full max-w-sm grid-cols-1 gap-3">
        <Input placeholder="Search" startIcon={<SearchIcon />} />
        <Input type="password" placeholder="Password" endIcon={<EyeIcon />} />
        <Input placeholder="Both" startIcon={<SearchIcon />} endIcon={<EyeIcon />} />
      </div>
    </Group>
  );
}

function StatesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="States">
      <div className="grid w-full max-w-sm grid-cols-1 gap-3">
        <Input placeholder="Default" />
        <Input placeholder="Disabled" disabled />
        <Input readOnly defaultValue="Read-only" />
        <Input aria-invalid placeholder="Invalid" defaultValue="not-an-email" />
      </div>
    </Group>
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
    description: "Tweak size, type, and state live.",
    render: LiveExample,
    controls: [
      {
        name: "inputSize",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "Small" },
          { value: "default", label: "Default" },
          { value: "lg", label: "Large" },
        ],
        defaultValue: "default",
      },
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
      { name: "withIcon", label: "Start icon", type: "boolean", defaultValue: false },
      { name: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
      { name: "readOnly", label: "Read-only", type: "boolean", defaultValue: false },
      { name: "invalid", label: "Invalid", type: "boolean", defaultValue: false },
    ],
    code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
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
