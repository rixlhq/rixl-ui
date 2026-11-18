import type {Ref} from "react";
import type {NormalizedInputError} from "./input-field-error";
import type {InputProps} from "./input.types";
import {resolveInputSize} from "./resolve-input-size";
import {InputControl} from "./input-control";
import {InputIconGroup} from "./input-icon-group";

type InputContentProps = Omit<InputProps, "label" | "labelTooltip" | "description" | "error"> & {
  controlRef: Ref<HTMLInputElement>;
  normalizedError: NormalizedInputError | undefined;
};

/** The input with its icon group, before the Field wrapper decides bare vs labelled. */
export function InputContent({
  controlRef,
  normalizedError,
  inputSize,
  size,
  variant: variantProp,
  startIcon,
  endIcon,
  wrapperClassName,
  passwordManagerIgnore,
  type,
  required,
  onValueChange,
  className,
  ...rest
}: InputContentProps) {
  const resolvedSize = resolveInputSize(inputSize, size);
  const invalid = variantProp === "error" || normalizedError?.match === true ? true : undefined;
  return (
    <InputIconGroup startIcon={startIcon} endIcon={endIcon} wrapperClassName={wrapperClassName} resolvedSize={resolvedSize}>
      <InputControl
        ref={controlRef}
        type={type}
        required={required}
        onValueChange={onValueChange}
        invalid={invalid}
        resolvedSize={resolvedSize}
        paddedStart={Boolean(startIcon)}
        paddedEnd={Boolean(endIcon)}
        passwordManagerIgnore={passwordManagerIgnore}
        className={className}
        rest={rest}
      />
    </InputIconGroup>
  );
}
