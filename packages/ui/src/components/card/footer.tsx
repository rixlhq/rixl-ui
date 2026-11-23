import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";

export type CardFooterProps = ComponentProps<"div">;

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({className, ...props}, ref) => (
  <div ref={ref} data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} />
));
CardFooter.displayName = "CardFooter";
