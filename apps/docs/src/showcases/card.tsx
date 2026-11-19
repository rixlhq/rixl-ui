import {Button} from "@rixl/ui/button";
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@rixl/ui/card";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "card";
export const title = "Card";
export const description = "Group related content and actions in a single surface.";
export const notes =
  "Surface container for grouping related content. Header/title/description/action/content/footer slots, three variants (default, outline, ghost), plus a selected state. Cards are passive: put actions on children.";

export function Showcase() {
  return (
    <Card className="w-full max-w-64">
      <CardHeader>
        <CardTitle>Production</CardTitle>
        <CardDescription>Your latest deployment is live.</CardDescription>
      </CardHeader>
      <CardFooter className="justify-between">
        <code className="text-xs text-rixl-fg-muted">main · 8f2a1c</code>
        <span className="text-xs font-medium text-rixl-success">Ready</span>
      </CardFooter>
    </Card>
  );
}

function BasicExample() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-rixl-fg">Card content.</p>
      </CardContent>
      <CardFooter className="justify-between">
        <p className="text-sm text-rixl-fg-muted">Card footer</p>
        <Button size="sm">Deploy</Button>
      </CardFooter>
    </Card>
  );
}

function WithActionExample() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure your workspace.</CardDescription>
        <CardAction>
          <Button variant="ghost" shape="square" size="sm" aria-label="Edit">
            <PencilIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-rixl-fg">Card action is laid out to the right of the title.</p>
      </CardContent>
    </Card>
  );
}

function VariantsExample() {
  return (
    <Group label="Variants">
      <div className="grid w-full gap-4 sm:grid-cols-3">
        {(
          [
            {variant: "default", label: "Default"},
            {variant: "outline", label: "Outline"},
            {variant: "ghost", label: "Ghost"},
          ] as const
        ).map(({variant, label}) => (
          <Card key={variant} variant={variant}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
              <CardDescription>{label} surface</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Group>
  );
}

function SelectedExample() {
  return (
    <Group label="Selected">
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Default</CardTitle>
            <CardDescription>A passive surface; actions belong to its children.</CardDescription>
          </CardHeader>
        </Card>
        <Card selected className="max-w-md">
          <CardHeader>
            <CardTitle>Selected</CardTitle>
            <CardDescription>Ring highlight for the chosen item.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </Group>
  );
}

export const examples: Example[] = [
  {id: "basic", title: "Basic", render: BasicExample},
  {
    id: "variants",
    title: "Variants",
    render: VariantsExample,
    code: `<Card>Default</Card>
<Card variant="outline">Outline</Card>
<Card variant="ghost">Ghost</Card>`,
  },
  {
    id: "selected",
    title: "Selected",
    render: SelectedExample,
    code: `<Card>Default</Card>
<Card selected>Selected</Card>`,
  },
  {id: "action", title: "With action", render: WithActionExample},
];

function PencilIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}
