import {forwardRef} from "react";
import {DialogTitle, type DialogTitleProps} from "../dialog/dialog-title";

export type SheetTitleProps = DialogTitleProps;
/** @deprecated Use DialogTitle. */
export const SheetTitle = forwardRef<HTMLHeadingElement, SheetTitleProps>(({...props}, ref) => (
  <DialogTitle ref={ref} data-slot="sheet-title" {...props} />
));
SheetTitle.displayName = "SheetTitle";
