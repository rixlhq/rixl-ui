import {forwardRef} from "react";
import {DialogDescription, type DialogDescriptionProps} from "../dialog/dialog-description";

export type AlertDialogDescriptionProps = DialogDescriptionProps;
/** @deprecated Use DialogDescription. */
export const AlertDialogDescription = forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(({...props}, ref) => (
  <DialogDescription ref={ref} data-slot="alert-dialog-description" {...props} />
));
AlertDialogDescription.displayName = "AlertDialogDescription";
