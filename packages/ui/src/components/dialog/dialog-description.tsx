import {forwardRef} from "react";
import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import {cn} from "cn";
export type DialogDescriptionProps = DialogPrimitive.Description.Props;
export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(({className, ...props}, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn("text-rixl-fg-muted text-sm", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";
