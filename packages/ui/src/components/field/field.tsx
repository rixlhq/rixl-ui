import {forwardRef, type ReactNode} from "react";
import {Field as FieldPrimitive} from "@base-ui/react/field";
import {cn} from "cn";

/**
 * Rixl Field — the accessible form-field wrapper.
 *
 * Base UI Field on `--rixl-*` tokens. The Root owns the field state; Label,
 * Description and Error read it from context, so the control (Rixl `Input`,
 * `Textarea`, `Select` — all Base UI based) is wired with `aria-labelledby`
 * and `aria-describedby` automatically, no `id`/`htmlFor` bookkeeping needed.
 *
 * The Error only renders while the field is invalid (drive it with `invalid`,
 * `validate`, or native constraint validation). Nothing here animates layout:
 * the message appears and disappears without motion.
 */
const FieldRoot = forwardRef<HTMLDivElement, FieldPrimitive.Root.Props>(({className, ...props}, ref) => (
  <FieldPrimitive.Root ref={ref} data-slot="field" className={cn("flex w-full flex-col gap-1.5", className)} {...props} />
));
FieldRoot.displayName = "FieldRoot";

/**
 * The field's label. Inherits the Rixl label type (text-sm, medium) and
 * dims with the field via Base UI's `data-disabled` state. Association with
 * the control is automatic through field context.
 */
const FieldLabel = forwardRef<HTMLElement, FieldPrimitive.Label.Props>(({className, ...props}, ref) => (
  <FieldPrimitive.Label
    ref={ref}
    data-slot="field-label"
    className={cn(
      "flex items-center gap-2 text-sm leading-none font-medium select-none",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  />
));
FieldLabel.displayName = "FieldLabel";

/**
 * Help text for the field. Always referenced by the control's
 * `aria-describedby` while mounted.
 */
const FieldDescription = forwardRef<HTMLParagraphElement, FieldPrimitive.Description.Props>(({className, ...props}, ref) => (
  <FieldPrimitive.Description
    ref={ref}
    data-slot="field-description"
    className={cn("text-sm leading-normal text-rixl-fg-muted", className)}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";

/**
 * The validation message. Rendered only while the field is invalid, then
 * appended to the control's `aria-describedby`. The text comes from field
 * validation (`validate`, or native constraint validation) — Base UI renders
 * that message here, so this takes no children. Danger token holds 4.5:1 on
 * both light and dark surfaces, so it stays legible as small text.
 */
const FieldError = forwardRef<HTMLDivElement, FieldPrimitive.Error.Props>(({className, ...props}, ref) => (
  <FieldPrimitive.Error ref={ref} data-slot="field-error" className={cn("text-sm leading-normal text-rixl-danger", className)} {...props} />
));
FieldError.displayName = "FieldError";

export {FieldRoot, FieldLabel, FieldDescription, FieldError};
export type FieldRootProps = FieldPrimitive.Root.Props;
export type FieldRootActions = FieldPrimitive.Root.Actions;
export type FieldLabelProps = FieldPrimitive.Label.Props;
export type FieldDescriptionProps = FieldPrimitive.Description.Props;
export type FieldErrorProps = FieldPrimitive.Error.Props;

/**
 * Match type for a structured field error. `true` always shows the message
 * (server-side validation); otherwise a `ValidityState` key shows it only
 * while the control's native validity matches (e.g. `"tooShort"`).
 */
export type FieldErrorMatch = boolean | keyof ValidityState;

/** A structured error: the message to show and when to show it. */
export type NormalizedFieldError = {message: ReactNode; match: FieldErrorMatch};

/** The `error` prop accepted by `Input` and `InputGroup`. */
export type FieldErrorProp = string | {message: ReactNode; match: FieldErrorMatch};

/**
 * Normalizes the `error` prop accepted by `Input` and `InputGroup` into the
 * `{message, match}` shape `FieldError` needs. A string always shows
 * (`match: true`); an object passes through; falsy input means no error.
 */
export function normalizeFieldError(error: FieldErrorProp | undefined): NormalizedFieldError | undefined {
  if (!error) return undefined;
  if (typeof error === "string") return {message: error, match: true};
  return error;
}
