import {Toaster, toast} from "@rixl/ui/toaster";
import {Button} from "@rixl/ui/button";
import {Group, Section} from "./_layout";

export const path = "toaster";
export const title = "Toaster";
export const group = "Feedback";

export function Showcase() {
  return (
    <Section
      title="Toaster"
      description="Sonner-based toast notifications. Place <Toaster /> at app root; call toast() anywhere to trigger notifications."
    >
      <Toaster />
      <Group label="Basic">
        <Button onClick={() => toast("Hello!")}>Show toast</Button>
      </Group>
      <Group label="With action">
        <Button
          onClick={() =>
            toast("Undo?", {
              action: {label: "Undo", onClick: () => console.log("undone")},
            })
          }
        >
          Show with action
        </Button>
      </Group>
      <Group label="Promise">
        <Button
          onClick={() =>
            toast.promise(fetch("/api/delay").then((r) => r.json()), {
              loading: "Loading...",
              success: "Done!",
              error: (err) => `Failed: ${err.message}`,
            })
          }
        >
          Show promise toast
        </Button>
      </Group>
    </Section>
  );
}