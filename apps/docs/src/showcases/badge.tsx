import { Badge, type BadgeProps } from "@rixl/ui/badge";
import type { ControlValue, Example } from "./registry";
import { Group } from "../components/showcase-layout";

export const path = "badge";
export const title = "Badge";
export const group = "Feedback";
export const description =
  "Compact status and count label. Six variants (default, secondary, success, warning, destructive, outline); polymorphic via Base UI useRender.";

export function Showcase() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="success">Live</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="secondary">v2.3</Badge>
    </div>
  );
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const variant = state.variant as BadgeProps["variant"];
  return (
    <Group label="Live preview">
      <Badge variant={variant}>{variant} badge</Badge>
    </Group>
  );
}

function AllVariantsExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="All six variants">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">
        <CheckIcon /> Healthy
      </Badge>
      <Badge variant="warning">
        <DotIcon /> Degraded
      </Badge>
      <Badge variant="destructive">
        <XIcon /> Failed
      </Badge>
      <Badge variant="outline">Outline</Badge>
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

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Cycle through the six badge variants.",
    render: LiveExample,
    controls: [
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: [
          { value: "default", label: "Default" },
          { value: "secondary", label: "Secondary" },
          { value: "success", label: "Success" },
          { value: "warning", label: "Warning" },
          { value: "destructive", label: "Destructive" },
          { value: "outline", label: "Outline" },
        ],
        defaultValue: "default",
      },
    ],
    code: `<Badge variant="success">Healthy</Badge>`,
  },
  { id: "variants", title: "All variants & icons", render: AllVariantsExample },
  { id: "link", title: "As a link", render: AsLinkExample },
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
