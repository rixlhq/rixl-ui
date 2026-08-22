import { Button } from "@rixl/ui/button";
import { Toaster, toast } from "@rixl/ui/toaster";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "toaster";
export const title = "Toaster";
export const group = "Feedback";
export const description =
  "Sonner-based toast notifications. Place <Toaster /> at app root; call toast() anywhere to trigger notifications.";

export function Showcase() {
  return (
    <>
      <Toaster />
      <Button onClick={() => toast("Hello!")}>Show toast</Button>
    </>
  );
}

function BasicExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Basic">
      <Button onClick={() => toast("Hello!")}>Show toast</Button>
    </Group>
  );
}

function WithActionExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="With action">
      <Button
        onClick={() =>
          toast("Undo?", {
            action: { label: "Undo", onClick: () => console.log("undone") },
          })
        }
      >
        Show with action
      </Button>
    </Group>
  );
}

function PromiseExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Promise">
      <Button
        onClick={() =>
          toast.promise(
            fetch("/api/delay").then((r) => r.json()),
            {
              loading: "Loading...",
              success: "Done!",
              error: (err: Error) => `Failed: ${err.message}`,
            },
          )
        }
      >
        Show promise toast
      </Button>
    </Group>
  );
}

export const examples: Example[] = [
  { id: "basic", title: "Basic", render: BasicExample },
  { id: "action", title: "With action", render: WithActionExample },
  { id: "promise", title: "Promise", render: PromiseExample },
];
