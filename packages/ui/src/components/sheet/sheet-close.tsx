import {forwardRef} from "react";
import {DialogClose, type DialogCloseProps} from "../dialog/dialog-close";

export type SheetCloseProps = DialogCloseProps;
/** @deprecated Use DialogClose. */
export const SheetClose = forwardRef<HTMLButtonElement, SheetCloseProps>(({...props}, ref) => (
  <DialogClose ref={ref} data-slot="sheet-close" {...props} />
));
SheetClose.displayName = "SheetClose";
