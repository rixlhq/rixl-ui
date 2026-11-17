import {forwardRef, type ComponentProps, type ReactNode} from "react";
import type {VariantProps} from "class-variance-authority";
import {inputVariants} from "../input/input";
import {normalizeFieldError, type FieldErrorProp} from "../field/field";
import {InputField} from "../input/input-field";
import {InputGroupContext} from "./input-group-context";
import {inputGroupClassName} from "./input-group-class-name";

export type InputGroupProps = ComponentProps<"div"> &
  VariantProps<typeof inputVariants> & {
    /** Kumo-style size alias; `inputSize` wins when both are set. */
    size?: "xs" | "sm" | "base" | "lg";
    /** Label content (enables the built-in Field wrapper); a string or any React node. */
    label?: ReactNode;
    /** Tooltip content shown next to the label via an info icon. */
    labelTooltip?: ReactNode;
    /** Help text below the group (hidden while `error` is present). */
    description?: ReactNode;
    /** Error message, or `{message, match}` shown while the native validity matches. */
    error?: FieldErrorProp;
    /**
     * Whether the field is required. Passed to the inner control through
     * field state; `false` renders a muted `(optional)` marker after the label.
     */
    required?: boolean;
    /**
     * Disables the field: the label dims and the inner control is disabled
     * through field state, dimming the group chrome with it.
     */
    disabled?: boolean;
  };

const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({className, inputSize, size, label, labelTooltip, description, error, required, disabled, ...props}, ref) => {
    const normalizedError = normalizeFieldError(error);
    const group = <div ref={ref} data-slot="input-group" className={inputGroupClassName(inputSize, size, className)} {...props} />;
    return (
      <InputGroupContext.Provider value={{required, disabled}}>
        <InputField
          label={label}
          required={required}
          labelTooltip={labelTooltip}
          error={normalizedError}
          description={description}
          disabled={disabled}
        >
          {group}
        </InputField>
      </InputGroupContext.Provider>
    );
  }
);
InputGroup.displayName = "InputGroup";

export {InputGroup};
export {InputGroupAddon, type InputGroupAddonProps} from "./input-group-addon";
export {InputGroupButton, type InputGroupButtonProps} from "./input-group-button";
