import {forwardRef} from "react";
import {DialogFooter, type DialogFooterProps} from "../dialog/dialog-footer";

export type AlertDialogFooterProps = DialogFooterProps;
/** @deprecated Use DialogFooter. */
export const AlertDialogFooter = forwardRef<HTMLDivElement, AlertDialogFooterProps>(({...props}, ref) => (
  <DialogFooter ref={ref} data-slot="alert-dialog-footer" {...props} />
));
AlertDialogFooter.displayName = "AlertDialogFooter";
