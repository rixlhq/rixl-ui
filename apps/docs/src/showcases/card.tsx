import {Button} from "@rixl/ui/button";
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@rixl/ui/card";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "card";
export const title = "Card";
export const description = "Group related content and actions in a single surface.";
export const notes =
  "Surface container for grouping related content. Header/title/description/action/content/footer slots, three variants (default, outline, ghost), plus interactive and selected states.";

export function Showcase() {
  return (
    <Card className="w-full max-w-64 gap-4 py-4 shadow-rixl-sm">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">Production</CardTitle>
        <CardDescription className="text-xs">Your latest deployment is live.</CardDescription>
      </CardHeader>
      <CardFooter className="justify-between px-4">
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
          <Button variant="ghost" size="icon-sm" aria-label="Edit">
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
        {(["default", "outline", "ghost"] as const).map((variant) => (
          <Card key={variant} variant={variant}>
            <CardHeader>
              <CardTitle className="capitalize">{variant}</CardTitle>
              <CardDescription>{variant} surface</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Group>
  );
}

function InteractiveExample() {
  return (
    <Group label="Interactive & selected">
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <Card interactive tabIndex={0} className="max-w-md">
          <CardHeader>
            <CardTitle>Clickable</CardTitle>
            <CardDescription>Hover to emphasize, press to depress, tab to focus.</CardDescription>
          </CardHeader>
        </Card>
        <Card interactive selected tabIndex={0} className="max-w-md">
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
    id: "interactive",
    title: "Interactive & selected",
    render: InteractiveExample,
    code: `<Card interactive>Clickable</Card>
<Card interactive selected>Selected</Card>`,
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
