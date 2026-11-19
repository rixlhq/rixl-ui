import {Badge} from "@rixl/ui/badge";
import {Button} from "@rixl/ui/button";
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
import {Input} from "@rixl/ui/input";
import type {ControlValue, Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "dialog";
export const title = "Dialog";
export const description = "Open a focused task above the current page.";
export const notes =
  'Fullscreen below 640px; centered with four size variants on larger screens. Long content scrolls within the dialog. Use Table for horizontally scrollable data and include an explicit close action after long content. `role="alertdialog"` gives a confirmation that ignores outside clicks. DialogContent draws no close button: render DialogClose yourself, and name an icon-only one with aria-label. Accessible names: the app supplies them (aria-label, aria-labelledby or a visible label) and the library warns in development when one is missing, the way Kumo asks for a label on every Input.';

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
          <DialogDescription>Make changes to your profile here. Click save when you are done.</DialogDescription>
        </DialogHeader>
        <Input label="Name" defaultValue="Alex Morgan" />
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BasicExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Edit profile</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you are done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <Input label="Display name" defaultValue="Alex Morgan" />
          <Input label="Username" defaultValue="@alex" />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CloseButtonExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Close button</Button>} />
      <DialogContent>
        <DialogHeader className="flex-row items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <DialogTitle>Custom close</DialogTitle>
            <DialogDescription>An icon-only close action needs a name from the app.</DialogDescription>
          </div>
          <DialogClose
            aria-label="Close"
            render={
              <Button variant="ghost" size="icon">
                <span aria-hidden="true">×</span>
              </Button>
            }
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function CustomContentExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Notifications</Button>} />
      <DialogContent size="sm">
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
            <div key={n.title} className="flex items-start justify-between gap-3 rounded-md border border-rixl-border bg-rixl-surface p-3">
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

function SizesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const labels = {sm: "Sm", base: "Base", lg: "Lg", xl: "Xl"} as const;
  return (
    <Group label="Sizes">
      {(["sm", "base", "lg", "xl"] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger render={<Button variant="outline">{labels[size]}</Button>} />
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{labels[size]} dialog</DialogTitle>
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

function AlertDialogExample() {
  return (
    <Group label="Alert (role=alertdialog) — destructive confirm, explicit close only">
      <Dialog role="alertdialog">
        <DialogTrigger render={<Button variant="destructive">Delete account</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <DialogClose render={<Button variant="destructive">Continue</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Group>
  );
}

function LongContentExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Review activity</Button>} />
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Workspace activity</DialogTitle>
          <DialogDescription>Scroll through the activity and close the review when you are done.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {Array.from({length: 20}, (_, index) => (
            <div key={index} className="rounded-md border border-rixl-border p-4">
              <p className="text-sm font-medium">Activity {index + 1}</p>
              <p className="text-sm text-rixl-fg-muted">
                A workspace member updated the project settings. Review the changes with your team before the next release.
              </p>
              <p className="mt-2 text-xs text-rixl-fg-muted">Reference: workspace_activity_2026_project_settings_revision_{index + 1}</p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button>Finish review</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const examples: Example[] = [
  {id: "basic", title: "Basic", render: BasicExample},
  {
    id: "alert-dialog",
    title: "Alert dialog",
    description: "A confirmation that ignores outside clicks. Escape and the explicit buttons close it.",
    render: AlertDialogExample,
    code: `<Dialog role="alertdialog">
  <DialogTrigger render={<Button variant="destructive">Delete account</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline">Cancel</Button>} />
      <DialogClose render={<Button variant="destructive">Continue</Button>} />
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  {id: "long-content", title: "Long content on mobile", render: LongContentExample},
  {id: "sizes", title: "Sizes", render: SizesExample},
  {
    id: "close-button",
    title: "Close button",
    description: "DialogContent has no automatic close button. Render DialogClose and name it.",
    render: CloseButtonExample,
    code: `<DialogClose
  aria-label="Close"
  render={
    <Button variant="ghost" size="icon">
      <XIcon aria-hidden="true" />
    </Button>
  }
/>`,
  },
  {id: "custom", title: "Custom content", render: CustomContentExample},
];
