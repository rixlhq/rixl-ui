import {Input} from "@rixl/ui/input";
import {InputGroup, InputGroupAddon, InputGroupButton} from "@rixl/ui/input-group";
import type {ControlValue, Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "input-group";
export const title = "Input Group";
export const group = "Forms";
export const description =
  "Adorned input: static addons and action buttons adjoined to a Rixl Input. The group wears the input chrome — border, shadow, 3px focus ring — while the Input inside renders borderless.";

export function Showcase() {
  return (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <Input placeholder="example.com" aria-label="Website address" />
        <InputGroupButton>Go</InputGroupButton>
      </InputGroup>
    </div>
  );
}

function AddonsExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Text addons">
      <div className="grid w-full max-w-sm grid-cols-1 gap-3">
        <InputGroup>
          <InputGroupAddon>https://</InputGroupAddon>
          <Input placeholder="example.com" aria-label="Website address" />
        </InputGroup>
        <InputGroup>
          <Input placeholder="0.00" aria-label="Amount" />
          <InputGroupAddon>USD</InputGroupAddon>
        </InputGroup>
      </div>
    </Group>
  );
}

function ButtonExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="With action">
      <div className="grid w-full max-w-sm grid-cols-1 gap-3">
        <InputGroup>
          <Input placeholder="Search components" aria-label="Search components" />
          <InputGroupButton variant="secondary">Search</InputGroupButton>
        </InputGroup>
        <InputGroup>
          <Input placeholder="Copy this value" aria-label="Copy this value" defaultValue="rixl-ui" readOnly />
          <InputGroupButton variant="ghost" size="icon-xs" aria-label="Copy value">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect width="14" height="14" x="8" y="8" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </InputGroupButton>
        </InputGroup>
      </div>
    </Group>
  );
}

function SizesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Sizes">
      <div className="grid w-full max-w-sm grid-cols-1 gap-3">
        <InputGroup inputSize="sm">
          <InputGroupAddon>@</InputGroupAddon>
          <Input placeholder="Small" aria-label="Small" />
        </InputGroup>
        <InputGroup inputSize="default">
          <InputGroupAddon>@</InputGroupAddon>
          <Input placeholder="Default" aria-label="Default" />
        </InputGroup>
        <InputGroup inputSize="lg">
          <InputGroupAddon>@</InputGroupAddon>
          <Input placeholder="Large" aria-label="Large" />
        </InputGroup>
      </div>
    </Group>
  );
}

function InvalidExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Invalid">
      <div className="w-full max-w-sm">
        <InputGroup>
          <InputGroupAddon>https://</InputGroupAddon>
          <Input placeholder="example.com" aria-label="Website address" aria-invalid="true" />
        </InputGroup>
      </div>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "addons",
    title: "Text addons",
    render: AddonsExample,
    code: `<InputGroup>
  <InputGroupAddon>https://</InputGroupAddon>
  <Input placeholder="example.com" />
</InputGroup>`,
  },
  {
    id: "button",
    title: "With action",
    description: "The button addon is a Rixl Button with shared press feedback and focus ring.",
    render: ButtonExample,
    code: `<InputGroup>
  <Input placeholder="Search" />
  <InputGroupButton variant="secondary">Search</InputGroupButton>
</InputGroup>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    render: SizesExample,
    code: `<InputGroup inputSize="sm">
  <InputGroupAddon>@</InputGroupAddon>
  <Input placeholder="Small" />
</InputGroup>`,
  },
  {
    id: "invalid",
    title: "Invalid",
    description: "An aria-invalid input turns the whole group chrome danger.",
    render: InvalidExample,
    code: `<InputGroup>
  <InputGroupAddon>https://</InputGroupAddon>
  <Input placeholder="example.com" aria-invalid="true" />
</InputGroup>`,
  },
];
