import type {ReactElement, ReactNode} from "react";
import {Field} from "@base-ui/react/field";
import {cn} from "../../lib/cn";
import {fieldLabel} from "../../lib/classes";
import {FieldLabelContent} from "../label/field-label-content";
import type {LabelLabels} from "../label/label-labels";
import type {NormalizedInputError} from "./input-field-error";

type InputFieldProps = {
  /** The component the app rendered, named in the missing-name warning. */
  component: string;
  label?: ReactNode;
  required?: boolean;
  labelTooltip?: ReactNode;
  error?: NormalizedInputError;
  description?: ReactNode;
  disabled?: boolean;
  labelTooltipAriaLabel?: string;
  labels?: Partial<LabelLabels>;
  children: ReactElement;
};

type InputFieldChrome = Pick<InputFieldProps, "label" | "labelTooltip" | "description" | "error">;

function hasChrome({label, labelTooltip, description, error}: InputFieldChrome) {
  return Boolean(label || labelTooltip || description || error);
}

function needsLabelRow({label, labelTooltip, required}: Pick<InputFieldProps, "label" | "labelTooltip" | "required">) {
  return Boolean(label || labelTooltip || required === false);
}

function InputLabelRow({
  component,
  label,
  required,
  labelTooltip,
  labelTooltipAriaLabel,
  labels,
}: Pick<InputFieldProps, "component" | "label" | "required" | "labelTooltip" | "labelTooltipAriaLabel" | "labels">) {
  return (
    <Field.Label data-slot="input-label" className={cn(fieldLabel, "data-disabled:pointer-events-none data-disabled:opacity-50")}>
      <FieldLabelContent
        component={component}
        required={required}
        labelTooltip={labelTooltip}
        labelTooltipAriaLabel={labelTooltipAriaLabel}
        labels={labels}
      >
        {label}
      </FieldLabelContent>
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
export function InputField({
  component,
  label,
  required,
  labelTooltip,
  error,
  description,
  disabled,
  labelTooltipAriaLabel,
  labels,
  children,
}: InputFieldProps) {
  if (!hasChrome({label, labelTooltip, description, error})) return children;
  return (
    <Field.Root
      data-slot="input-field"
      invalid={error?.match === true ? true : undefined}
      disabled={disabled}
      className="flex w-full flex-col gap-1.5"
    >
      {needsLabelRow({label, labelTooltip, required}) ? (
        <InputLabelRow
          component={component}
          label={label}
          required={required}
          labelTooltip={labelTooltip}
          labelTooltipAriaLabel={labelTooltipAriaLabel}
          labels={labels}
        />
      ) : null}
      {children}
      <InputFieldMessage error={error} description={description} />
    </Field.Root>
  );
}
