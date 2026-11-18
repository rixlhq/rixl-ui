import {Button} from "@rixl/ui/button";
import {toast} from "@rixl/ui/toaster";
import type {ControlValue, Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "toaster";
export const title = "Toaster";
export const description = "Give brief feedback after an action.";

export function Showcase() {
  return (
    <Button size="sm" variant="outline" onClick={() => toast("Event has been created")}>
      Trigger toast
    </Button>
  );
}

function BasicExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Toast types">
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Deployment completed successfully")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Failed to save workspace settings")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Storage is almost full")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.info("A new version is available")}>
        Info
      </Button>
    </Group>
  );
}

function WithActionExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Project archived", {
          description: "Moved to trash. You can restore it within 30 days.",
          action: {label: "Undo", onClick: () => toast("Project restored")},
          cancel: {label: "Dismiss", onClick: () => undefined},
        })
      }
    >
      Show with action
    </Button>
  );
}

function PromiseExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1200)), {
          loading: "Deploying to edge…",
          success: "Deployment live across 34 regions",
          error: "Deployment failed",
        })
      }
    >
      Show promise toast
    </Button>
  );
}

export const examples: Example[] = [
  {id: "basic", title: "Variants", render: BasicExample},
  {id: "action", title: "With actions", render: WithActionExample},
  {id: "promise", title: "Promise", render: PromiseExample},
];
