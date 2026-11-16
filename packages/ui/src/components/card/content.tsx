import {forwardRef, type ComponentProps} from "react";
import {cn} from "cn";

export type CardContentProps = ComponentProps<"div">;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({className, ...props}, ref) => (
  <div ref={ref} data-slot="card-content" className={cn("px-6", className)} {...props} />
));
CardContent.displayName = "CardContent";
