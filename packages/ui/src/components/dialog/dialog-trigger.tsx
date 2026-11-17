import {forwardRef} from "react";
import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";

export type DialogTriggerProps = DialogPrimitive.Trigger.Props;
export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(({...props}, ref) => (
  <DialogPrimitive.Trigger ref={ref} data-slot="dialog-trigger" {...props} />
));
DialogTrigger.displayName = "DialogTrigger";
