import {forwardRef} from "react";
import {DialogContent, type DialogContentProps} from "../dialog/dialog-content";
export type SheetContentProps = DialogContentProps;
/** @deprecated Use DialogContent. */
export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(({side = "right", ...props}, ref) => (
  <DialogContent
    ref={ref}
    data-slot="sheet-content"
    side={side}
    overlayProps={
      {
        "data-slot": "sheet-overlay",
      } as NonNullable<DialogContentProps["overlayProps"]>
    }
    closeButtonProps={
      {
        "data-slot": "sheet-close",
      } as NonNullable<DialogContentProps["closeButtonProps"]>
    }
    {...props}
  />
));
SheetContent.displayName = "SheetContent";
