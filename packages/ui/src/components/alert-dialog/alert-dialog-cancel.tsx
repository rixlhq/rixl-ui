import {forwardRef} from "react";
import {Button} from "../button";
import {DialogClose, type DialogCloseProps} from "../dialog/dialog-close";
import type {ButtonProps} from "../button";
export type AlertDialogCancelProps = DialogCloseProps & Pick<ButtonProps, "variant" | "size">;
/** @deprecated Use DialogClose rendered as Button. */
export const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(({variant = "outline", size, ...props}, ref) => (
  <DialogClose ref={ref} data-slot="alert-dialog-cancel" render={<Button variant={variant} size={size} />} {...props} />
));
AlertDialogCancel.displayName = "AlertDialogCancel";
