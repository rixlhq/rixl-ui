import type {ReactElement, ReactNode} from "react";
import {Field} from "@base-ui/react/field";
import {InfoIcon} from "lucide-react";
import {cn} from "../../lib/cn";
import {Tooltip, TooltipContent, TooltipTrigger} from "../tooltip";
import type {NormalizedInputError} from "./input-field-error";

export type InputFieldProps = {
  label?: ReactNode;
  required?: boolean;
  labelTooltip?: ReactNode;
  error?: NormalizedInputError;
  description?: ReactNode;
  disabled?: boolean;
  children: ReactElement;
};

type InputFieldChrome = Pick<InputFieldProps, "label" | "labelTooltip" | "description" | "error">;

function hasChrome({label, labelTooltip, description, error}: InputFieldChrome) {
  return Boolean(label || labelTooltip || description || error);
}

function needsLabelRow({label, labelTooltip, required}: Pick<InputFieldProps, "label" | "labelTooltip" | "required">) {
  return Boolean(label || labelTooltip || required === false);
}

function InputLabelRow({label, required, labelTooltip}: Pick<InputFieldProps, "label" | "required" | "labelTooltip">) {
  return (
    <Field.Label
      data-slot="input-label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        "data-disabled:pointer-events-none data-disabled:opacity-50"
      )}
    >
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
    </Field.Label>
  );
}

/** The error wins over the description; a validity-keyed error shows only while that validity matches. */
function InputFieldMessage({error, description}: Pick<InputFieldProps, "error" | "description">) {
  return (
    <Field.Validity>
      {({validity}) => {
        const active = error && (error.match === true || (typeof error.match === "string" && Boolean(validity[error.match])));
        if (active) {
          return (
            <Field.Error data-slot="input-error" match={error.match} className="text-sm leading-normal text-rixl-danger">
              {error.message}
            </Field.Error>
          );
        }
        return description ? (
          <Field.Description data-slot="input-description" className="text-sm leading-normal text-rixl-fg-muted">
            {description}
          </Field.Description>
        ) : null;
      }}
    </Field.Validity>
  );
}

/** Wraps a control in a Base UI Field with label, description and error; returns the control untouched when none is set. */
export function InputField({label, required, labelTooltip, error, description, disabled, children}: InputFieldProps) {
  if (!hasChrome({label, labelTooltip, description, error})) return children;
  return (
    <Field.Root
      data-slot="input-field"
      invalid={error?.match === true ? true : undefined}
      disabled={disabled}
      className="flex w-full flex-col gap-1.5"
    >
      {needsLabelRow({label, labelTooltip, required}) ? (
        <InputLabelRow label={label} required={required} labelTooltip={labelTooltip} />
      ) : null}
      {children}
      <InputFieldMessage error={error} description={description} />
    </Field.Root>
  );
}
