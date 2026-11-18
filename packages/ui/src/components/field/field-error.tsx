import {forwardRef} from "react";
import {Field as FieldPrimitive} from "@base-ui/react/field";
import {cn} from "../../lib/cn";

export const FieldError = forwardRef<HTMLDivElement, FieldPrimitive.Error.Props>(({className, ...props}, ref) => (
  <FieldPrimitive.Error ref={ref} data-slot="field-error" className={cn("text-sm leading-normal text-rixl-danger", className)} {...props} />
));
FieldError.displayName = "FieldError";
export type FieldErrorProps = FieldPrimitive.Error.Props;
