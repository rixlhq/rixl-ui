import type {ReactElement, ReactNode} from "react";
import {FieldRoot} from "./field-root";
import {FieldLabelRow} from "./field-label-row";
import {FieldMessage} from "./field-message";
import {useFieldContext} from "./use-field-context";
import type {NormalizedFieldError} from "./field.types";

export type FieldLayoutProps = {
  label?: ReactNode;
  required?: boolean;
  labelTooltip?: ReactNode;
  error?: NormalizedFieldError;
  description?: ReactNode;
  disabled?: boolean;
  children: ReactElement;
};

type FieldChrome = Pick<FieldLayoutProps, "label" | "labelTooltip" | "description" | "error" | "disabled">;

function hasFieldChrome({label, labelTooltip, description, error, disabled}: FieldChrome) {
  return Boolean(label || labelTooltip || description || error || disabled);
}

function needsLabelRow({label, labelTooltip, required}: Pick<FieldLayoutProps, "label" | "labelTooltip" | "required">) {
  return Boolean(label || labelTooltip || required === false);
}

export function FieldLayout({label, required, labelTooltip, error, description, disabled, children}: FieldLayoutProps) {
  const inField = useFieldContext();
  if (!hasFieldChrome({label, labelTooltip, description, error, disabled})) return children;
  const content = (
    <>
      {needsLabelRow({label, labelTooltip, required}) ? (
        <FieldLabelRow label={label} required={required} labelTooltip={labelTooltip} />
      ) : null}
      {children}
      <FieldMessage error={error} description={description} />
    </>
  );
  if (inField) return content;
  return (
    <FieldRoot invalid={error?.match === true ? true : undefined} disabled={disabled}>
      {content}
    </FieldRoot>
  );
}
