import { Button } from "@rixl/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rixl/ui/card";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "card";
export const title = "Card";
export const group = "Content";
export const description =
  "Surface container for grouping related content. Header, title, description, action, content, and footer slots.";

export function Showcase() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-rixl-fg">Card content.</p>
      </CardContent>
    </Card>
  );
}

function BasicExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Basic">
      <Card className="max-w-md">
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
    </Group>
  );
}

function WithActionExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="With action">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Configure your workspace.</CardDescription>
          <CardAction>
            <Button variant="ghost" size="icon" aria-label="Edit">
              <PencilIcon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-rixl-fg">Card action is laid out to the right of the title.</p>
        </CardContent>
      </Card>
    </Group>
  );
}

export const examples: Example[] = [
  { id: "basic", title: "Basic", render: BasicExample },
  { id: "action", title: "With action", render: WithActionExample },
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
