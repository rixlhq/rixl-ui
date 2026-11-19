import {forwardRef, type ComponentProps, type ReactNode} from "react";
import type {VariantProps} from "class-variance-authority";
import {Field} from "@base-ui/react/field";
import {cn} from "../../lib/cn";
import {InputField} from "./input-field";
import type {InputFieldLabels} from "./input-field-labels";
import {normalizeInputError, type InputErrorProp} from "./input-field-error";
import {inputAreaVariants} from "./input-variants";
import {useWarnUnnamedInput} from "./use-warn-unnamed-input";

export type InputAreaProps = Omit<ComponentProps<"textarea">, "size"> &
  VariantProps<typeof inputAreaVariants> & {
    /** Label content (enables the built-in field); a string or any React node. */
    label?: ReactNode;
    /** Tooltip content shown next to the label via an info icon. */
    labelTooltip?: ReactNode;
    /** Help text below the textarea (hidden while `error` is present). */
    description?: ReactNode;
    /** Error message, or `{message, match}` shown while the native validity matches. */
    error?: InputErrorProp;
    /** Names the `labelTooltip` trigger, which is an icon-only button. The app supplies it; setting `labelTooltip` without it warns in development. */
    labelTooltipAriaLabel?: string;
    /** Overrides the field chrome copy (`optional`); each key falls back to `RixlLocaleProvider`, then English. */
    labels?: Partial<InputFieldLabels>;
    /** Base UI convenience handler receiving the value directly. */
    onValueChange?: ComponentProps<typeof Field.Control>["onValueChange"];
  };

export const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  ({label, labelTooltip, description, error, labelTooltipAriaLabel, labels, size, className, onValueChange, ...props}, ref) => {
    useWarnUnnamedInput({component: "InputArea", label, ariaLabel: props["aria-label"], ariaLabelledBy: props["aria-labelledby"]});
    return (
      <InputField
        component="InputArea"
        label={label}
        labelTooltip={labelTooltip}
        description={description}
        error={normalizeInputError(error)}
        required={props.required}
        disabled={props.disabled}
        labelTooltipAriaLabel={labelTooltipAriaLabel}
        labels={labels}
      >
        <Field.Control
          render={<textarea {...props} />}
          ref={ref}
          data-slot="input-area"
          onValueChange={onValueChange}
          className={cn(inputAreaVariants({size}), className)}
        />
      </InputField>
    );
  }
);
InputArea.displayName = "InputArea";
