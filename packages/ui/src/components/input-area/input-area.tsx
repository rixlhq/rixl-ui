import {forwardRef, type ComponentProps, type ReactNode} from "react";
import {FieldLayout} from "../field/field-layout";
import {normalizeFieldError, type FieldErrorProp} from "../field/field";
import {InputAreaControl} from "./input-area-control";

export type InputAreaProps = ComponentProps<"textarea"> & {
  label?: ReactNode;
  labelTooltip?: ReactNode;
  description?: ReactNode;
  error?: FieldErrorProp;
};
export const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(({label, labelTooltip, description, error, ...props}, ref) => (
  <FieldLayout
    label={label}
    labelTooltip={labelTooltip}
    description={description}
    error={normalizeFieldError(error)}
    required={props.required}
    disabled={props.disabled}
  >
    <InputAreaControl {...props} ref={ref} />
  </FieldLayout>
));
InputArea.displayName = "InputArea";
