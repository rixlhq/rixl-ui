import {forwardRef, type ComponentProps, type ReactNode} from "react";
import type {VariantProps} from "class-variance-authority";
import type {inputVariants} from "../input/input-variants";
import {InputField} from "../input/input-field";
import type {LabelLabels} from "../label/label-labels";
import {normalizeInputError, type InputErrorProp} from "../input/input-field-error";
import {InputGroupContext} from "./input-group-context";
import {inputGroupClassName} from "./input-group-class-name";

export type InputGroupProps = ComponentProps<"div"> &
  VariantProps<typeof inputVariants> & {
    /** Label content (enables the built-in Field wrapper); a string or any React node. */
    label?: ReactNode;
    /** Tooltip content shown next to the label via an info icon. */
    labelTooltip?: ReactNode;
    /** Help text below the group (hidden while `error` is present). */
    description?: ReactNode;
    /** Error message, or `{message, match}` shown while the native validity matches. */
    error?: InputErrorProp;
    /** Names the `labelTooltip` trigger, which is an icon-only button. The app supplies it; setting `labelTooltip` without it warns in development. */
    labelTooltipAriaLabel?: string;
    /** Overrides the field chrome copy (`optional`); each key falls back to `RixlLocaleProvider`, then English. */
    labels?: Partial<LabelLabels>;
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
  ({className, size, label, labelTooltip, description, error, labelTooltipAriaLabel, labels, required, disabled, ...props}, ref) => {
    const normalizedError = normalizeInputError(error);
    const group = (
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- a <fieldset> adds legend and min-width defaults to a single-row control
      <div ref={ref} role="group" data-slot="input-group" className={inputGroupClassName(size, className)} {...props} />
    );
    return (
      <InputGroupContext.Provider value={{required, disabled, labelled: Boolean(label), size}}>
        <InputField
          component="InputGroup"
          label={label}
          required={required}
          labelTooltip={labelTooltip}
          error={normalizedError}
          description={description}
          disabled={disabled}
          labelTooltipAriaLabel={labelTooltipAriaLabel}
          labels={labels}
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
export {InputGroupInput, type InputGroupInputProps} from "./input-group-input";
export {InputGroupButton, type InputGroupButtonProps} from "./input-group-button";
