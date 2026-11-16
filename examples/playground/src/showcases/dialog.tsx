import { Badge } from "@rixl/ui/badge";
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
import { Input } from "@rixl/ui/input";
import { Label } from "@rixl/ui/label";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "dialog";
export const title = "Dialog";
export const group = "Overlays";
export const description =
  "Modal surface over a blurred backdrop. Base UI Dialog; modal (focus-trapped), closes on Escape / backdrop / scroll. Interruptible scale-and-fade entrance and four size variants.";

export function Showcase() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            Edit profile
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="dialog-name-preview">Name</Label>
            <Input id="dialog-name-preview" defaultValue="Alex Morgan" />
          </div>
        </div>
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
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Edit profile</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="dialog-name">Display name</Label>
            <Input id="dialog-name" defaultValue="Alex Morgan" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="dialog-handle">Username</Label>
            <Input id="dialog-handle" defaultValue="@alex" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function NoCloseExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">No X button</Button>} />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Custom close</DialogTitle>
          <DialogDescription>Only the explicit buttons below close this dialog.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Got it</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CustomContentExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Notifications</Button>} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>You have 3 unread notifications.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2.5">
          {[
            {
              title: "Deployment failed",
              body: "Production deploy #4121 failed at the build step.",
              badge: "destructive" as const,
              tag: "Error",
            },
            {
              title: "Deployment succeeded",
              body: "Staging deploy #4122 is live across all edge nodes.",
              badge: "success" as const,
              tag: "Live",
            },
            {
              title: "Storage at 90%",
              body: "Your media bucket is nearly full.",
              badge: "warning" as const,
              tag: "Quota",
            },
          ].map((n) => (
            <div
              key={n.title}
              className="flex items-start justify-between gap-3 rounded-rixl-md border border-rixl-border bg-rixl-surface p-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="truncate text-xs text-rixl-fg-muted">{n.body}</p>
              </div>
              <Badge variant={n.badge}>{n.tag}</Badge>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button className="w-full">Dismiss all</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SizesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Sizes">
      {(["sm", "default", "lg", "xl"] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger
            render={
              <Button variant="outline" className="capitalize">
                {size}
              </Button>
            }
          />
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle className="capitalize">{size} dialog</DialogTitle>
              <DialogDescription>This dialog uses the “{size}” size variant.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Close</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </Group>
  );
}

export const examples: Example[] = [
  { id: "basic", title: "Basic", render: BasicExample },
  { id: "sizes", title: "Sizes", render: SizesExample },
  { id: "no-close", title: "Without close button", render: NoCloseExample },
  { id: "custom", title: "Custom content", render: CustomContentExample },
];
