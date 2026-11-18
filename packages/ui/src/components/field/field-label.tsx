import {forwardRef} from "react";
import {Field as FieldPrimitive} from "@base-ui/react/field";
import {cn} from "../../lib/cn";

export const FieldLabel = forwardRef<HTMLElement, FieldPrimitive.Label.Props>(({className, ...props}, ref) => (
  <FieldPrimitive.Label
    ref={ref}
    data-slot="field-label"
    className={cn(
      "flex items-center gap-2 text-sm leading-none font-medium select-none",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  />
));
FieldLabel.displayName = "FieldLabel";
export type FieldLabelProps = FieldPrimitive.Label.Props;
