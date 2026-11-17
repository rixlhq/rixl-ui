import {forwardRef} from "react";
import {normalizeFieldError} from "../field/field";
import {useFieldContext} from "../field/use-field-context";
import {useInputGroup} from "../input-group/use-input-group";
import {InputField} from "./input-field";
import {InputContent} from "./input-content";
import {warnInputProps} from "./warn-input-props";
import type {InputProps} from "./input.types";

const Input = forwardRef<HTMLInputElement, InputProps>(({label, labelTooltip, description, error, ...props}, ref) => {
  const group = useInputGroup();
  const inField = useFieldContext();
  props = {...props, required: props.required ?? group.required, disabled: props.disabled ?? group.disabled};
  const normalizedError = normalizeFieldError(error);
  warnInputProps({
    label: label || (inField ? true : undefined),
    ariaLabel: props["aria-label"],
    ariaLabelledBy: props["aria-labelledby"],
    variant: props.variant,
  });
  return (
    <InputField
      label={label}
      required={props.required}
      labelTooltip={labelTooltip}
      error={normalizedError}
      description={description}
      disabled={props.disabled}
    >
      <InputContent controlRef={ref} normalizedError={normalizedError} {...props} />
    </InputField>
  );
});
Input.displayName = "Input";

export {Input};
export {inputVariants} from "./input-variants";
export {resolveInputSize, type SizeAlias} from "./resolve-input-size";
export type {InputProps} from "./input.types";
