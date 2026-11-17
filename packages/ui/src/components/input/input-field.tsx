import type {ReactElement, ReactNode} from "react";
import {InfoIcon} from "lucide-react";
import {FieldDescription, FieldError, FieldLabel, FieldRoot, type NormalizedFieldError} from "../field/field";
import {Tooltip, TooltipContent, TooltipTrigger} from "../tooltip";

/**
 * The Field integration shared by `Input` and `InputGroup` (the Kumo
 * built-in Field pattern). Internal to the package: `Input` renders its
 * control here, `InputGroup` renders its group chrome here, and the label
 * row, help text and error message behave identically for both.
 */

/** The Field wrapper appears when any of the Kumo field props is present. */
function shouldWrapField(label: ReactNode, description: ReactNode, error: NormalizedFieldError | undefined): boolean {
  return Boolean(label || error || description);
}

/** The label row appears for label content, the tooltip, or the `(optional)` marker. */
function shouldShowLabel(label: ReactNode, labelTooltip: ReactNode, required: boolean | undefined): boolean {
  return Boolean(label || labelTooltip) || required === false;
}

/**
 * The label row inside the built-in Field: label content, the `(optional)`
 * marker when `required` is explicitly false, and the info tooltip.
 */
function InputFieldLabel({label, required, labelTooltip}: {label: ReactNode; required: boolean | undefined; labelTooltip: ReactNode}) {
  return (
    <FieldLabel>
      <span className="inline-flex items-center gap-1.5">
        {label}
        {required === false ? <span className="font-normal text-rixl-fg-muted">(optional)</span> : null}
        {labelTooltip ? (
          <Tooltip>
            <TooltipTrigger
              aria-label="More information"
              className="inline-flex items-center text-rixl-fg-muted transition-colors duration-rixl-fast ease-rixl-out hover:text-rixl-fg [&_svg]:size-3.5"
            >
              <InfoIcon aria-hidden="true" />
            </TooltipTrigger>
            <TooltipContent>{labelTooltip}</TooltipContent>
          </Tooltip>
        ) : null}
      </span>
    </FieldLabel>
  );
}

/** Error wins over help text (Kumo): the message, or the description below the control. */
function InputFieldMessage({error, description}: {error: NormalizedFieldError | undefined; description: ReactNode}) {
  if (error) return <FieldError match={error.match}>{error.message}</FieldError>;
  if (description) return <FieldDescription>{description}</FieldDescription>;
  return null;
}

export type InputFieldProps = {
  label: ReactNode;
  required: boolean | undefined;
  labelTooltip: ReactNode;
  error: NormalizedFieldError | undefined;
  description: ReactNode;
  disabled: boolean | undefined;
  children: ReactElement;
};

/**
 * Renders `children` bare, or stacked in a `FieldRoot` with label and
 * message when any field prop is present. A string error forces the invalid
 * state; a `{message, match}` object shows while the native validity matches.
 */
function InputField({label, required, labelTooltip, error, description, disabled, children}: InputFieldProps) {
  if (!shouldWrapField(label, description, error)) return children;
  return (
    <FieldRoot invalid={error?.match === true ? true : undefined} disabled={disabled}>
      {shouldShowLabel(label, labelTooltip, required) ? (
        <InputFieldLabel label={label} required={required} labelTooltip={labelTooltip} />
      ) : null}
      {children}
      <InputFieldMessage error={error} description={description} />
    </FieldRoot>
  );
}

export {InputField};
