import {forwardRef} from "react";
import {DialogHeader, type DialogHeaderProps} from "../dialog/dialog-header";

export type AlertDialogHeaderProps = DialogHeaderProps;
/** @deprecated Use DialogHeader. */
export const AlertDialogHeader = forwardRef<HTMLDivElement, AlertDialogHeaderProps>(({...props}, ref) => (
  <DialogHeader ref={ref} data-slot="alert-dialog-header" {...props} />
));
AlertDialogHeader.displayName = "AlertDialogHeader";
