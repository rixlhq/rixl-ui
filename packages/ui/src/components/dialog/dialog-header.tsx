import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";
export type DialogHeaderProps = ComponentProps<"div">;
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(({className, ...props}, ref) => (
  <div ref={ref} data-slot="dialog-header" className={cn("flex min-w-0 flex-col gap-2 text-center sm:text-start", className)} {...props} />
));
DialogHeader.displayName = "DialogHeader";
