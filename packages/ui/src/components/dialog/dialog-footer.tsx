import {forwardRef, type ComponentProps} from "react";
import {cn} from "cn";
export type DialogFooterProps = ComponentProps<"div">;
export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(({className, ...props}, ref) => (
  <div ref={ref} data-slot="dialog-footer" className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
));
DialogFooter.displayName = "DialogFooter";
