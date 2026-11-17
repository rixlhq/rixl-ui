import {forwardRef} from "react";
import {DialogOverlay, type DialogOverlayProps} from "../dialog/dialog-overlay";

export type AlertDialogOverlayProps = DialogOverlayProps;
/** @deprecated Use DialogOverlay. */
export const AlertDialogOverlay = forwardRef<HTMLDivElement, AlertDialogOverlayProps>(({...props}, ref) => (
  <DialogOverlay ref={ref} data-slot="alert-dialog-overlay" {...props} />
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";
