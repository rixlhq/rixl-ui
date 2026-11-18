import {forwardRef} from "react";
import {DialogHeader, type DialogHeaderProps} from "../dialog/dialog-header";
import {cn} from "../../lib/cn";
export type SheetHeaderProps = DialogHeaderProps;
/** @deprecated Use DialogHeader. */
export const SheetHeader = forwardRef<HTMLDivElement, SheetHeaderProps>(({className, ...props}, ref) => (
  <DialogHeader ref={ref} data-slot="sheet-header" className={cn("flex min-w-0 flex-col gap-1.5 p-4 pe-16", className)} {...props} />
));
SheetHeader.displayName = "SheetHeader";
