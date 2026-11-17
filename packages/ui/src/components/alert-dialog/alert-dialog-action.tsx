import {forwardRef} from "react";
import {Button, type ButtonProps} from "../button";
export type AlertDialogActionProps = ButtonProps;
/** @deprecated Use Button. Confirmation does not automatically dismiss. */
export const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>((props, ref) => (
  <Button ref={ref} data-slot="alert-dialog-action" {...props} />
));
AlertDialogAction.displayName = "AlertDialogAction";
