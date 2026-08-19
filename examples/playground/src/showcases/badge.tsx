import { Badge, type BadgeProps } from "@rixl/ui/badge";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "badge";
export const title = "Badge";
export const group = "Feedback";
export const description =
  "Compact status / count label. Four variants; polymorphic via Base UI useRender.";

export function Showcase() {
  return <Badge>Badge</Badge>;
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const variant = state.variant as BadgeProps["variant"];
  return (
    <Group label="Live preview">
      <Badge variant={variant}>{variant} badge</Badge>
    </Group>
  );
}

function WithIconsExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="With a leading icon">
      <Badge>
        <CheckIcon /> Active
      </Badge>
      <Badge variant="destructive">
        <XIcon /> Failed
      </Badge>
      <Badge variant="outline">
        <DotIcon /> Draft
      </Badge>
    </Group>
  );
}

function AsLinkExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="As a link (render={<a/>})">
      <Badge render={<a href="https://rixl.co" target="_blank" rel="noreferrer" />}>Docs →</Badge>
      <Badge
        render={<a href="https://rixl.co" target="_blank" rel="noreferrer" />}
        variant="outline"
      >
        Changelog
      </Badge>
    </Group>
  );
}

function CustomClassExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Custom className (pill)">
      <Badge className="rounded-full px-3">Pill</Badge>
      <Badge variant="secondary" className="rounded-full px-3">
        Rounded
      </Badge>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Cycle through the four badge variants.",
    render: LiveExample,
    controls: [
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: [
          { value: "default", label: "Default" },
          { value: "secondary", label: "Secondary" },
          { value: "destructive", label: "Destructive" },
          { value: "outline", label: "Outline" },
        ],
        defaultValue: "default",
      },
    ],
    code: `<Badge variant="default">Badge</Badge>`,
  },
  { id: "icons", title: "With icons", render: WithIconsExample },
  { id: "link", title: "As a link", render: AsLinkExample },
  { id: "pill", title: "Custom className", render: CustomClassExample },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}
