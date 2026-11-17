import {forwardRef} from "react";
import {DialogFooter, type DialogFooterProps} from "../dialog/dialog-footer";
import {cn} from "cn";
export type SheetFooterProps = DialogFooterProps;
/** @deprecated Use DialogFooter. */
export const SheetFooter = forwardRef<HTMLDivElement, SheetFooterProps>(({className, ...props}, ref) => (
  <DialogFooter ref={ref} data-slot="sheet-footer" className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
));
SheetFooter.displayName = "SheetFooter";
