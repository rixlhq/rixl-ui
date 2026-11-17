import {forwardRef} from "react";
import {DialogTitle, type DialogTitleProps} from "../dialog/dialog-title";

export type AlertDialogTitleProps = DialogTitleProps;
/** @deprecated Use DialogTitle. */
export const AlertDialogTitle = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(({...props}, ref) => (
  <DialogTitle ref={ref} data-slot="alert-dialog-title" {...props} />
));
AlertDialogTitle.displayName = "AlertDialogTitle";
