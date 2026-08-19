import { Button, type ButtonProps } from "@rixl/ui/button";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "button";
export const title = "Button";
export const group = "Actions";
export const description =
  "Primary action primitive. Supports six variants, four sizes, disabled states, and polymorphic rendering.";

export function Showcase() {
  // Legacy single-preview fallback. The detail view uses `examples`.
  return <Button>Button</Button>;
}

function VariantsExample({ state }: { state: Record<string, ControlValue> }) {
  const variant = state.variant as ButtonProps["variant"];
  const size = state.size as ButtonProps["size"];
  const disabled = state.disabled as boolean;

  return (
    <Group label="Live preview">
      <Button variant={variant} size={size} disabled={disabled}>
        {disabled ? "Disabled" : "Button"}
      </Button>
    </Group>
  );
}

function SizesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Sizes">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Search">
        <SearchIcon />
      </Button>
    </Group>
  );
}

function StatesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="States">
      <Button disabled>Disabled</Button>
      <Button variant="destructive" disabled>
        Delete
      </Button>
    </Group>
  );
}

function PolymorphicExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Polymorphic (render={<a/>})">
      <Button render={<a href="https://rixl.co" target="_blank" rel="noreferrer" />} variant="link">
        Open rixl.co
      </Button>
      <Button
        render={<a href="https://rixl.co" target="_blank" rel="noreferrer" />}
        variant="outline"
      >
        <PlusIcon /> Anchor styled as button
      </Button>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "variants",
    title: "Variants",
    description: "Cycle through the six button looks and sizes live.",
    render: VariantsExample,
    controls: [
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: [
          { value: "default", label: "Default" },
          { value: "secondary", label: "Secondary" },
          { value: "outline", label: "Outline" },
          { value: "ghost", label: "Ghost" },
          { value: "destructive", label: "Destructive" },
          { value: "link", label: "Link" },
        ],
        defaultValue: "default",
      },
      {
        name: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "Small" },
          { value: "default", label: "Default" },
          { value: "lg", label: "Large" },
        ],
        defaultValue: "default",
      },
      { name: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
    ],
    code: `<Button variant="default" size="default">
  Button
</Button>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "All four supported sizes side-by-side.",
    render: SizesExample,
    code: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Search">
  <SearchIcon />
</Button>`,
  },
  {
    id: "states",
    title: "States",
    render: StatesExample,
    code: `<Button disabled>Disabled</Button>
<Button variant="destructive" disabled>
  Delete
</Button>`,
  },
  {
    id: "polymorphic",
    title: "Polymorphic",
    description: "Render as a different element while keeping button styling.",
    render: PolymorphicExample,
    code: `<Button render={<a href="https://rixl.co" />} variant="link">
  Open rixl.co
</Button>`,
  },
];

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
