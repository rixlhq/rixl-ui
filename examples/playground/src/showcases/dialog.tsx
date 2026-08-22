import { Button } from "@rixl/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@rixl/ui/dialog";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "dialog";
export const title = "Dialog";
export const group = "Overlays";
export const description =
  "Modal surface layered over a backdrop. Base UI Dialog; modal (focus-trapped), closes on Escape / backdrop / scroll.";

export function Showcase() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Edit profile</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-rixl-fg-muted">Profile fields would live here.</p>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BasicExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Basic">
      <Dialog>
        <DialogTrigger render={<Button variant="outline">Edit profile</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-rixl-fg-muted">Profile fields would live here.</p>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Group>
  );
}

function NoCloseExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Without close button (showCloseButton=false)">
      <Dialog>
        <DialogTrigger render={<Button variant="outline">No X</Button>} />
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Custom close</DialogTitle>
            <DialogDescription>
              Only the explicit buttons below close this dialog.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Got it</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Group>
  );
}

function CustomContentExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Custom content (notifications list)">
      <Dialog>
        <DialogTrigger render={<Button variant="outline">Notifications</Button>} />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>You have 3 unread notifications.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {[
              {
                title: "Deployment failed",
                body: "Production deploy #4121 failed at the build step.",
                icon: "!",
              },
              { title: "New comment", body: "Alex commented on your pull request.", icon: "?" },
              { title: "Storage at 90%", body: "Your media bucket is nearly full.", icon: "i" },
            ].map((n) => (
              <div
                key={n.title}
                className="flex items-start gap-3 rounded-rixl-md border border-rixl-border bg-rixl-surface p-3"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rixl-primary/10 text-xs font-bold text-rixl-primary">
                  {n.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="truncate text-sm text-rixl-fg-muted">{n.body}</p>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose render={<Button className="w-full">Dismiss all</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Group>
  );
}

export const examples: Example[] = [
  { id: "basic", title: "Basic", render: BasicExample },
  { id: "no-close", title: "Without close button", render: NoCloseExample },
  { id: "custom", title: "Custom content", render: CustomContentExample },
];
