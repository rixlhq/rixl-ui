import {forwardRef} from "react";
import {DialogContent, type DialogContentProps} from "../dialog/dialog-content";
export type AlertDialogContentProps = Omit<DialogContentProps, "side">;
/** @deprecated Use DialogContent. */
export const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>((props, ref) => (
  <DialogContent
    ref={ref}
    data-slot="alert-dialog-content"
    showCloseButton={false}
    overlayProps={
      {
        "data-slot": "alert-dialog-overlay",
      } as NonNullable<DialogContentProps["overlayProps"]>
    }
    {...props}
  />
));
AlertDialogContent.displayName = "AlertDialogContent";
