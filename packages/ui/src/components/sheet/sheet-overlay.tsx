import {forwardRef} from "react";
import {DialogOverlay, type DialogOverlayProps} from "../dialog/dialog-overlay";

export type SheetOverlayProps = DialogOverlayProps;
/** @deprecated Use DialogOverlay. */
export const SheetOverlay = forwardRef<HTMLDivElement, SheetOverlayProps>(({...props}, ref) => (
  <DialogOverlay ref={ref} data-slot="sheet-overlay" {...props} />
));
SheetOverlay.displayName = "SheetOverlay";
