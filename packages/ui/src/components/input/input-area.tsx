import {forwardRef, type ComponentProps, type ReactNode} from "react";
import {Field} from "@base-ui/react/field";
import {cn} from "../../lib/cn";
import {InputField} from "./input-field";
import {normalizeInputError, type InputErrorProp} from "./input-field-error";
import {inputAreaVariants} from "./input-variants";
import {resolveInputSize, type SizeAlias} from "./resolve-input-size";
import {warnInputProps} from "./warn-input-props";

export type InputAreaProps = Omit<ComponentProps<"textarea">, "size"> & {
  /** Label content (enables the built-in field); a string or any React node. */
  label?: ReactNode;
  /** Tooltip content shown next to the label via an info icon. */
  labelTooltip?: ReactNode;
  /** Help text below the textarea (hidden while `error` is present). */
  description?: ReactNode;
  /** Error message, or `{message, match}` shown while the native validity matches. */
  error?: InputErrorProp;
  /** Size scale shared with `Input`. */
  size?: SizeAlias;
  /** Base UI convenience handler receiving the value directly. */
  onValueChange?: ComponentProps<typeof Field.Control>["onValueChange"];
};

export const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  ({label, labelTooltip, description, error, size, className, onValueChange, ...props}, ref) => {
    warnInputProps({component: "InputArea", label, ariaLabel: props["aria-label"], ariaLabelledBy: props["aria-labelledby"]});
    return (
      <InputField
        label={label}
        labelTooltip={labelTooltip}
        description={description}
        error={normalizeInputError(error)}
        required={props.required}
        disabled={props.disabled}
      >
        <Field.Control
          render={<textarea {...props} />}
          ref={ref}
          data-slot="input-area"
          onValueChange={onValueChange}
          className={cn(inputAreaVariants({inputSize: resolveInputSize(undefined, size)}), className)}
        />
      </InputField>
    );
  }
);
InputArea.displayName = "InputArea";
