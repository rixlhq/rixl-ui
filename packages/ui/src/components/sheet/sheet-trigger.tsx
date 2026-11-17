import {forwardRef} from "react";
import {DialogTrigger, type DialogTriggerProps} from "../dialog/dialog-trigger";

export type SheetTriggerProps = DialogTriggerProps;
/** @deprecated Use DialogTrigger. */
export const SheetTrigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(({...props}, ref) => (
  <DialogTrigger ref={ref} data-slot="sheet-trigger" {...props} />
));
SheetTrigger.displayName = "SheetTrigger";
