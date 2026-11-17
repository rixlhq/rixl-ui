import {Badge} from "@rixl/ui/badge";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "badge";
export const title = "Badge";
export const description = "Label an item with a short status or count.";
export const notes =
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

function AllVariantsExample() {
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

function AsLinkExample() {
  return (
    <Group label="As a link (render={<a/>})">
      <Badge render={<a href="https://rixl.com" target="_blank" rel="noreferrer" aria-label="Docs" />}>Docs →</Badge>
      <Badge render={<a href="https://rixl.com" target="_blank" rel="noreferrer" aria-label="Changelog" />} variant="outline">
        Changelog
      </Badge>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "variants",
    title: "Variants",
    description: "All six variants with icon slots.",
    render: AllVariantsExample,
    code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Healthy</Badge>
<Badge variant="warning">Degraded</Badge>
<Badge variant="destructive">Failed</Badge>
<Badge variant="outline">Outline</Badge>`,
  },
  {
    id: "link",
    title: "As a link",
    render: AsLinkExample,
    code: `<Badge render={<a href="https://rixl.com" />}>Docs →</Badge>`,
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
