import {forwardRef} from "react";
import {DialogTrigger, type DialogTriggerProps} from "../dialog/dialog-trigger";

export type AlertDialogTriggerProps = DialogTriggerProps;
/** @deprecated Use DialogTrigger. */
export const AlertDialogTrigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(({...props}, ref) => (
  <DialogTrigger ref={ref} data-slot="alert-dialog-trigger" {...props} />
));
AlertDialogTrigger.displayName = "AlertDialogTrigger";
