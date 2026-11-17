import {forwardRef} from "react";
import {DialogDescription, type DialogDescriptionProps} from "../dialog/dialog-description";

export type SheetDescriptionProps = DialogDescriptionProps;
/** @deprecated Use DialogDescription. */
export const SheetDescription = forwardRef<HTMLParagraphElement, SheetDescriptionProps>(({...props}, ref) => (
  <DialogDescription ref={ref} data-slot="sheet-description" {...props} />
));
SheetDescription.displayName = "SheetDescription";
