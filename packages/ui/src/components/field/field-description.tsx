import {forwardRef} from "react";
import {Field as FieldPrimitive} from "@base-ui/react/field";
import {cn} from "cn";

export const FieldDescription = forwardRef<HTMLParagraphElement, FieldPrimitive.Description.Props>(({className, ...props}, ref) => (
  <FieldPrimitive.Description
    ref={ref}
    data-slot="field-description"
    className={cn("text-sm leading-normal text-rixl-fg-muted", className)}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";
export type FieldDescriptionProps = FieldPrimitive.Description.Props;
