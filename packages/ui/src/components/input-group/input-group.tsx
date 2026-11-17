import {forwardRef, type ComponentProps, type ReactNode} from "react";
import type {VariantProps} from "class-variance-authority";
import {cn} from "cn";
import {Button, type ButtonProps} from "../button/button";
import {inputVariants, resolveInputSize} from "../input/input";
import {normalizeFieldError, type FieldErrorProp} from "../field/field";
import {InputField} from "../input/input-field";

/**
 * Rixl InputGroup — the adorned input pattern.
 *
 * A flex row that wears the Input chrome (border, shadow, 3px focus ring)
 * while the Rixl `Input` inside renders borderless and stretches to fill it.
 * The `Input` is styled into place with descendant selectors — its
 * implementation is never touched, so `inputSize`, icons, states and future
 * Input changes keep working untouched:
 *
 *   <InputGroup>
 *     <InputGroupAddon>https://</InputGroupAddon>
 *     <Input placeholder="example.com" />
 *     <InputGroupButton>Go</InputGroupButton>
 *   </InputGroup>
 *
 * Sizing reuses `inputVariants`: `inputSize` sets the same `h-8/h-9/h-10`
 * heights as a bare Input (`size` is the Kumo-style alias; `inputSize` wins).
 * `label` / `description` / `error` wrap the group in the same built-in Field
 * as `Input`, so the inner control is labelled and described automatically;
 * the group chrome mirrors the field's invalid state. State mirrors the
 * Input language — the ring appears only for keyboard focus on the input
 * (`:focus-visible`, never plain `focus-within`, so mouse clicks stay quiet),
 * and an `aria-invalid` input turns the whole group chrome danger
 * automatically. Inside a group prefer `InputGroupAddon` over the Input's own
 * `startIcon`/`endIcon` (the group zeroes the input's inline padding).
 * No layout animation anywhere; press feedback lives on the button addon.
 */
function inputGroupClassName(
  inputSize: VariantProps<typeof inputVariants>["inputSize"],
  size: "xs" | "sm" | "base" | "lg" | undefined,
  className: string | undefined
) {
  return cn(
    inputVariants({inputSize: resolveInputSize(inputSize, size)}),
    "items-center gap-1.5 px-2.5 py-0",
    "has-[[data-slot=input]:focus-visible]:border-rixl-ring",
    "has-[[data-slot=input]:focus-visible]:ring-rixl-ring/50",
    "has-[[data-slot=input]:focus-visible]:ring-[3px]",
    "has-[[data-slot=input][aria-invalid=true]]:border-rixl-danger",
    "has-[[data-slot=input][aria-invalid=true]]:bg-rixl-danger/10",
    "has-[[data-slot=input][aria-invalid=true]]:ring-rixl-danger/20",
    "has-[[data-slot=input][aria-invalid=true]]:ring-[3px]",
    "has-[[data-slot=input][aria-invalid=true]]:hover:border-rixl-danger",
    "has-[[data-slot=input]:disabled]:opacity-50",
    "[&_[data-slot=input]]:h-full",
    "[&_[data-slot=input]]:flex-1",
    "[&_[data-slot=input]]:rounded-none",
    "[&_[data-slot=input]]:border-0",
    "[&_[data-slot=input]]:bg-transparent",
    "[&_[data-slot=input]]:px-0",
    "[&_[data-slot=input]]:shadow-none",
    "[&_[data-slot=input]]:focus-visible:ring-0",
    "[&_[data-slot=input-wrapper]]:h-full",
    "[&_[data-slot=input-wrapper]]:flex-1",
    className
  );
}

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
    );
  }
);
InputGroup.displayName = "InputGroup";

/**
 * Static text or glyph pinned to the input's edge (a `https://` prefix, a
 * `.com` suffix, a unit). Muted, never shrinks, icons render at size-4.
 * Inherits the group's text size so it tracks `inputSize`.
 */
const InputGroupAddon = forwardRef<HTMLSpanElement, ComponentProps<"span">>(({className, ...props}, ref) => (
  <span
    ref={ref}
    data-slot="input-group-addon"
    className={cn("flex shrink-0 items-center gap-1.5 text-rixl-fg-muted select-none [&_svg]:size-4 [&_svg]:shrink-0", className)}
    {...props}
  />
));
InputGroupAddon.displayName = "InputGroupAddon";

/**
 * An action pinned inside the group (search submit, clear, copy). A Rixl
 * Button, so press feedback (`active:scale`, motion-reduce safe) and the
 * 3px focus-visible ring come along unchanged. Defaults to `type="button"`
 * so it never submits a surrounding form, and to `size="sm"` so it sits
 * inside the row without stretching it.
 */
const InputGroupButton = forwardRef<HTMLButtonElement, ButtonProps>(({className, type = "button", size = "sm", ...props}, ref) => (
  <Button ref={ref} data-slot="input-group-button" type={type} size={size} className={cn("shrink-0", className)} {...props} />
));
InputGroupButton.displayName = "InputGroupButton";

export {InputGroup, InputGroupAddon, InputGroupButton};
export type InputGroupAddonProps = ComponentProps<"span">;
export type InputGroupButtonProps = ButtonProps;
