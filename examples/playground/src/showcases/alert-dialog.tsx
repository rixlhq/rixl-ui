import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@rixl/ui/alert-dialog";
import {Button} from "@rixl/ui/button";
import {Group, Section} from "./_layout";

export const path = "alert-dialog";
export const title = "AlertDialog";
export const group = "Overlays";

export function Showcase() {
  return (
    <Section
      title="AlertDialog"
      description="Modal confirmation surface. Base UI AlertDialog; action/cancel use the Button component (primary / outline)."
    >
      <Group label="Basic">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive">Delete account</Button>} />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-rixl-danger text-rixl-danger-fg hover:bg-rixl-danger">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Group>

      <Group label="Custom actions (neutral confirm)">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline">Leave project</Button>} />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Leave this project?</AlertDialogTitle>
              <AlertDialogDescription>You'll lose access to its private channels and settings.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay</AlertDialogCancel>
              <AlertDialogAction>Leave</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Group>

      <Group label="Destructive with custom button copy">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="ghost">Remove teammate</Button>} />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Alex?</AlertDialogTitle>
              <AlertDialogDescription>
                Alex will lose access to this workspace immediately. You can re-invite them anytime.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Alex</AlertDialogCancel>
              <AlertDialogAction className="bg-rixl-danger text-rixl-danger-fg hover:bg-rixl-danger">Remove</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Group>
    </Section>
  );
}
