import type {ReactNode} from "react";
import {Field} from "@base-ui/react/field";
import {cn} from "../../lib/cn";
import {fieldLabel} from "../../lib/classes";
import {FieldLabelContent} from "./field-label-content";

type ControlFieldProps = {
  /** The component the app rendered, named in the missing-name warning. */
  component: string;
  label: ReactNode;
  required?: boolean;
  labelTooltip?: ReactNode;
  labelTooltipAriaLabel?: string;
  /** `true` (default) puts the control before the label text, `false` after it. */
  controlFirst?: boolean;
  disabled?: boolean;
  /** The control; the `Field.Label` encloses it, so a click on the text reaches it. */
  children: ReactNode;
};

/** A toggle control (Checkbox, Switch, RadioGroupItem) with its label, as Base UI's `Field` documents: the label encloses the control. */
export function ControlField({
  component,
  label,
  required,
  labelTooltip,
  labelTooltipAriaLabel,
  controlFirst = true,
  disabled,
  children,
}: ControlFieldProps) {
  const text = (
    <FieldLabelContent
      component={component}
      required={required}
      labelTooltip={labelTooltip}
      labelTooltipAriaLabel={labelTooltipAriaLabel}
      className="group-data-disabled:opacity-50"
    >
      {label}
    </FieldLabelContent>
  );
  return (
    <Field.Root data-slot="control-field" disabled={disabled} className="inline-flex">
      <Field.Label className={cn(fieldLabel, "group cursor-pointer data-disabled:cursor-not-allowed")}>
        {controlFirst ? children : text}
        {controlFirst ? text : children}
      </Field.Label>
    </Field.Root>
  );
}
