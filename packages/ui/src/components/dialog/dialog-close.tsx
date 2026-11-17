import {forwardRef} from "react";
import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";

export type DialogCloseProps = DialogPrimitive.Close.Props;
export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(({...props}, ref) => (
  <DialogPrimitive.Close ref={ref} data-slot="dialog-close" {...props} />
));
DialogClose.displayName = "DialogClose";
