import {forwardRef} from "react";
import {InputField} from "./input-field";
import {InputControl} from "./input-control";
import {normalizeInputError} from "./input-field-error";
import {useWarnUnnamedInput} from "./use-warn-unnamed-input";
import type {InputProps} from "./input.types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({label, labelTooltip, description, error, labelTooltipAriaLabel, labels, ...props}, ref) => {
    const normalizedError = normalizeInputError(error);
    useWarnUnnamedInput({component: "Input", label, ariaLabel: props["aria-label"], ariaLabelledBy: props["aria-labelledby"]});
    const invalid = normalizedError?.match === true ? true : undefined;
    return (
      <InputField
        component="Input"
        label={label}
        required={props.required}
        labelTooltip={labelTooltip}
        error={normalizedError}
        description={description}
        disabled={props.disabled}
        labelTooltipAriaLabel={labelTooltipAriaLabel}
        labels={labels}
      >
        <InputControl ref={ref} aria-invalid={invalid} {...props} />
      </InputField>
    );
  }
);
Input.displayName = "Input";

export {Input};
export {inputVariants} from "./input-variants";
export type {InputProps} from "./input.types";
export {InputArea, type InputAreaProps} from "./input-area";
