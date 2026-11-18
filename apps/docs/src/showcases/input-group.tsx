import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@rixl/ui/input-group";
import type {ControlValue, Example} from "./registry";
import {EyeIcon, SearchIcon} from "../components/icons";
import {Group} from "../components/showcase-layout";

export const path = "input-group";
export const title = "Input Group";
export const description = "Combine a text input with a prefix, suffix, or action.";
export const notes =
  "The only place for icons, text addons and buttons around an input. The group wears the input chrome — border, shadow, 3px focus ring — while InputGroupInput renders borderless. Pass label, description, error and required to the group for the same built-in field as Input; InputGroupAddon align puts an addon before or after the input.";

export function Showcase() {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupInput placeholder="example.com" aria-label="Website address" />
      <InputGroupButton>Go</InputGroupButton>
    </InputGroup>
  );
}

function AddonsExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Text addons">
      <InputGroup className="w-full max-w-sm">
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput placeholder="example.com" aria-label="Website address" />
      </InputGroup>
      <InputGroup className="w-full max-w-sm">
        <InputGroupInput placeholder="0.00" aria-label="Amount" />
        <InputGroupAddon>USD</InputGroupAddon>
      </InputGroup>
    </Group>
  );
}

function ButtonExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="With action">
      <InputGroup className="w-full max-w-sm">
        <InputGroupInput placeholder="Search components" aria-label="Search components" />
        <InputGroupButton variant="secondary">Search</InputGroupButton>
      </InputGroup>
      <InputGroup className="w-full max-w-sm">
        <InputGroupInput placeholder="Copy this value" aria-label="Copy this value" defaultValue="rixl-ui" readOnly />
        <InputGroupButton variant="ghost" size="icon-xs" aria-label="Copy value">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect width="14" height="14" x="8" y="8" rx="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </InputGroupButton>
      </InputGroup>
    </Group>
  );
}

function SizesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Sizes">
      <InputGroup size="xs" className="w-full max-w-sm">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Extra small" aria-label="Extra small" />
      </InputGroup>
      <InputGroup size="sm" className="w-full max-w-sm">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Small" aria-label="Small" />
      </InputGroup>
      <InputGroup size="base" className="w-full max-w-sm">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Base" aria-label="Base" />
      </InputGroup>
      <InputGroup size="lg" className="w-full max-w-sm">
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="Large" aria-label="Large" />
      </InputGroup>
    </Group>
  );
}

function InvalidExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Invalid">
      <InputGroup className="w-full max-w-sm">
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput placeholder="example.com" aria-label="Website address" aria-invalid="true" />
      </InputGroup>
    </Group>
  );
}

function IconExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Icons">
      <InputGroup className="w-full max-w-sm">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search" aria-label="Search" />
      </InputGroup>
      <InputGroup className="w-full max-w-sm">
        <InputGroupInput type="password" placeholder="Password" aria-label="Password" />
        <InputGroupAddon align="end">
          <EyeIcon />
        </InputGroupAddon>
      </InputGroup>
    </Group>
  );
}

function FieldExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Built-in field">
      <InputGroup label="Website" description="Your public site address." className="w-full max-w-sm">
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
      <InputGroup label="Website" error="Enter a valid hostname." className="w-full max-w-sm">
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput defaultValue="not a host" />
      </InputGroup>
      <InputGroup label="Coupon" required={false} className="w-full max-w-sm">
        <InputGroupInput placeholder="SAVE10" />
      </InputGroup>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "icons",
    title: "Icons",
    description: 'Icons live in an InputGroupAddon; align="end" puts one after the input.',
    render: IconExample,
    code: `<InputGroup>
  <InputGroupAddon><SearchIcon /></InputGroupAddon>
  <InputGroupInput placeholder="Search" aria-label="Search" />
</InputGroup>
<InputGroup>
  <InputGroupInput type="password" aria-label="Password" />
  <InputGroupAddon align="end"><EyeIcon /></InputGroupAddon>
</InputGroup>`,
  },
  {
    id: "field",
    title: "Built-in field",
    description: "label, description, error and required wire through the group like they do on Input.",
    render: FieldExample,
    code: `<InputGroup label="Website" description="Your public site address.">
  <InputGroupAddon>https://</InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>
<InputGroup label="Website" error="Enter a valid hostname.">…</InputGroup>
<InputGroup label="Coupon" required={false}>…</InputGroup>`,
  },
  {
    id: "addons",
    title: "Text addons",
    render: AddonsExample,
    code: `<InputGroup>
  <InputGroupAddon>https://</InputGroupAddon>
  <InputGroupInput placeholder="example.com" />
</InputGroup>`,
  },
  {
    id: "button",
    title: "With action",
    description: "The button addon is a Rixl Button with shared press feedback and focus ring.",
    render: ButtonExample,
    code: `<InputGroup>
  <InputGroupInput placeholder="Search" />
  <InputGroupButton variant="secondary">Search</InputGroupButton>
</InputGroup>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    render: SizesExample,
    code: `<InputGroup size="sm">
  <InputGroupAddon>@</InputGroupAddon>
  <InputGroupInput placeholder="Small" />
</InputGroup>`,
  },
  {
    id: "invalid",
    title: "Invalid",
    description: "An aria-invalid input turns the whole group chrome danger.",
    render: InvalidExample,
    code: `<InputGroup>
  <InputGroupAddon>https://</InputGroupAddon>
  <InputGroupInput placeholder="example.com" aria-invalid="true" />
</InputGroup>`,
  },
];
