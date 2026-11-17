import {forwardRef, type ComponentProps, type ReactElement, type ReactNode, type Ref} from "react";
import {Input as InputPrimitive} from "@base-ui/react/input";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";
import {normalizeFieldError, type FieldErrorProp, type NormalizedFieldError} from "../field/field";
import {InputField} from "./input-field";

/**
 * Rixl Input — the single-line text input primitive.
 *
 * Base UI Input styled on `--rixl-*` tokens. A bare `<Input/>` is unchanged
 * from the original port; everything below is additive and backwards-compatible:
 *
 * - `inputSize` → `sm | default | lg` (default matches the old fixed h-9).
 *   Named `inputSize`, not `size`, so it never collides with the native
 *   `<input size>` character-width attribute. `size` (`xs | sm | base | lg`)
 *   is accepted as a Kumo-style alias: `xs`/`sm` → `sm`, `base` → `default`.
 *   When both are set, `inputSize` wins.
 * - `startIcon` / `endIcon` → the icon-in-field pattern the dashboard hand-rolls
 *   everywhere (search glyph, password toggle). When either is set the input is
 *   wrapped in a `relative` group and auto-padded to clear the icon; without
 *   them a lone `<input>` is rendered exactly as before, so existing call sites
 *   that bring their own `relative`/`ps-9` wrapper are untouched.
 * - `label` / `description` / `error` → the Kumo built-in Field pattern. When
 *   any of them is present the input renders inside `FieldRoot` with
 *   `FieldLabel`/`FieldDescription`/`FieldError`, so the control is wired with
 *   `aria-labelledby`/`aria-describedby` automatically. A string `error`
 *   always shows its message; an `{message, match}` object shows it only
 *   while the native validity matches (e.g. `match: "tooShort"`).
 * - `required={false}` renders a muted `(optional)` marker after the label.
 * - `variant="error"` is deprecated (Kumo keeps it for compat): error styling
 *   now applies automatically whenever `error` is truthy.
 * - `passwordManagerIgnore` marks non-credential fields so password-manager
 *   extensions (1Password, Bitwarden, LastPass, Keeper) leave them alone.
 * - `onValueChange` is the Base UI convenience handler with the value directly.
 *
 * States covered: hover (border strengthens), focus-visible (3px primary ring),
 * disabled (dimmed, no pointer; the label dims with it via field state),
 * read-only (muted surface, no hover shift), and `aria-invalid` (3px danger
 * ring + faint danger tint, held on hover). Icons pick up focus via
 * `group-focus-within`.
 *
 * Motion follows the shared language — `duration-rixl-fast ease-rixl-out` on the
 * token-driven properties only, so nothing moves under reduced motion.
 */
const inputVariants = cva(
  cn(
    "file:text-rixl-fg placeholder:text-rixl-fg-muted selection:bg-rixl-primary selection:text-rixl-primary-fg",
    "border-rixl-border flex w-full min-w-0 rounded-rixl-md border bg-transparent py-1 shadow-rixl-xs outline-none",
    "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "transition-[color,box-shadow,border-color] duration-rixl-fast ease-rixl-out",
    "hover:border-rixl-border-strong",
    "read-only:bg-rixl-surface-muted read-only:cursor-default read-only:hover:border-rixl-border",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:border-rixl-danger aria-invalid:ring-rixl-danger/20 aria-invalid:ring-[3px]",
    "aria-invalid:bg-rixl-danger/10 aria-invalid:hover:border-rixl-danger"
  ),
  {
    variants: {
      inputSize: {
        sm: "h-8 px-2.5 text-base sm:text-xs",
        default: "h-9 px-3 text-base sm:text-sm",
        lg: "h-10 px-3.5 text-base",
      },
    },
    defaultVariants: {inputSize: "default"},
  }
);

type InputSize = NonNullable<VariantProps<typeof inputVariants>["inputSize"]>;

/** Kumo-style size aliases resolved onto the `inputSize` scale. */
const sizeAliases = {xs: "sm", sm: "sm", base: "default", lg: "lg"} as const;
export type SizeAlias = keyof typeof sizeAliases;

export function resolveInputSize(inputSize: InputSize | null | undefined, size: SizeAlias | undefined): InputSize {
  return inputSize ?? (size ? sizeAliases[size] : undefined) ?? "default";
}

function resolveVariant(variantProp: "default" | "error" | undefined, error: NormalizedFieldError | undefined): "default" | "error" {
  return variantProp ?? (error ? "error" : "default");
}

function warnInputProps(named: {
  label: ReactNode;
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
  variant: "default" | "error" | undefined;
}): void {
  if (process.env.NODE_ENV === "production") return;
  if (!named.label && !named.ariaLabel && !named.ariaLabelledBy) {
    console.warn(
      "[Rixl Input]: Input must have an accessible name. Provide either:\n" +
        "  - label prop: <Input label='Email' />\n" +
        "  - aria-label: <Input aria-label='Email address' />\n" +
        "  - aria-labelledby for custom label association"
    );
  }
  if (named.variant === "error") {
    console.warn(
      '[Rixl Input]: variant="error" is deprecated. Error styling is now automatically applied when the `error` prop is truthy.'
    );
  }
}

/** Extra padding so text clears an icon, and the icon inset, kept in step per size. */
const startPad: Record<InputSize, string> = {sm: "ps-8", default: "ps-9", lg: "ps-10"};
const endPad: Record<InputSize, string> = {sm: "pe-8", default: "pe-9", lg: "pe-10"};
const startInset: Record<InputSize, string> = {sm: "start-2.5", default: "start-3", lg: "start-3.5"};
const endInset: Record<InputSize, string> = {sm: "end-2.5", default: "end-3", lg: "end-3.5"};

const iconBase = cn(
  "absolute top-1/2 flex -translate-y-1/2 items-center text-rixl-fg-muted",
  "transition-colors duration-rixl-fast ease-rixl-out group-focus-within:text-rixl-fg",
  "[&_svg]:size-4 [&_svg]:shrink-0"
);

/** Password-manager opt-outs for non-credential fields (Kumo's `keeper-ignore` contract). */
const passwordManagerAttributes = {
  "data-1p-ignore": "true",
  "data-bwignore": "true",
  "data-form-type": "other",
  "data-lpignore": "true",
} as const;

type InputControlProps = {
  type: ComponentProps<"input">["type"];
  required: boolean | undefined;
  onValueChange: ComponentProps<typeof InputPrimitive>["onValueChange"];
  invalid: boolean | undefined;
  resolvedSize: InputSize;
  paddedStart: boolean;
  paddedEnd: boolean;
  passwordManagerIgnore: boolean | undefined;
  className: string | undefined;
  rest: ComponentProps<"input">;
};

/** The bare `<input>` itself; ref always lands here, with or without the Field. */
const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  ({type, required, onValueChange, invalid, resolvedSize, paddedStart, paddedEnd, passwordManagerIgnore, className, rest}, ref) => (
    <InputPrimitive
      ref={ref}
      type={type}
      data-slot="input"
      required={required}
      onValueChange={onValueChange}
      aria-invalid={invalid}
      className={cn(
        inputVariants({inputSize: resolvedSize}),
        paddedStart && startPad[resolvedSize],
        paddedEnd && endPad[resolvedSize],
        passwordManagerIgnore && "keeper-ignore",
        className
      )}
      {...(passwordManagerIgnore ? passwordManagerAttributes : null)}
      {...rest}
    />
  )
);
InputControl.displayName = "InputControl";

type InputIconGroupProps = {
  startIcon: ReactNode;
  endIcon: ReactNode;
  wrapperClassName: string | undefined;
  resolvedSize: InputSize;
  children: ReactElement;
};

/** The icon-in-field group; renders the control untouched when no icon is set. */
function InputIconGroup({startIcon, endIcon, wrapperClassName, resolvedSize, children}: InputIconGroupProps) {
  if (!startIcon && !endIcon) return children;
  return (
    <div data-slot="input-wrapper" className={cn("group relative w-full", wrapperClassName)}>
      {/* Decorative by default: clicks fall through to the field. */}
      {startIcon ? (
        <span data-slot="input-start-icon" className={cn(iconBase, "pointer-events-none", startInset[resolvedSize])}>
          {startIcon}
        </span>
      ) : null}
      {children}
      {/* Interactive by default so a toggle/clear button inside it works. */}
      {endIcon ? (
        <span data-slot="input-end-icon" className={cn(iconBase, endInset[resolvedSize])}>
          {endIcon}
        </span>
      ) : null}
    </div>
  );
}

export type InputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    /** Decorative or interactive node pinned to the leading edge (e.g. a search glyph). */
    startIcon?: ReactNode;
    /** Node pinned to the trailing edge (e.g. a password-visibility toggle). */
    endIcon?: ReactNode;
    /** className for the wrapper rendered when `startIcon`/`endIcon` are present. */
    wrapperClassName?: string;
    /** Label content (enables the built-in Field wrapper); a string or any React node. */
    label?: ReactNode;
    /** Tooltip content shown next to the label via an info icon. */
    labelTooltip?: ReactNode;
    /** Help text below the input (hidden while `error` is present). */
    description?: ReactNode;
    /** Error message, or `{message, match}` shown while the native validity matches. */
    error?: FieldErrorProp;
    /** Kumo-style size alias; `inputSize` wins when both are set. */
    size?: SizeAlias;
    /** @deprecated Error styling now applies automatically when `error` is truthy. */
    variant?: "default" | "error";
    /** Opts non-credential fields out of password-manager overlays. */
    passwordManagerIgnore?: boolean;
    /** Base UI convenience handler receiving the value directly. */
    onValueChange?: ComponentProps<typeof InputPrimitive>["onValueChange"];
  };

/** Props flowing into the icon-grouped control: everything except the Field-level customs. */
type InputContentProps = Omit<InputProps, "label" | "labelTooltip" | "description" | "error"> & {
  controlRef: Ref<HTMLInputElement>;
  normalizedError: NormalizedFieldError | undefined;
};

/** The input with its icon group, before the Field wrapper decides bare vs labelled. */
function InputContent({
  controlRef,
  normalizedError,
  inputSize,
  size,
  variant: variantProp,
  startIcon,
  endIcon,
  wrapperClassName,
  passwordManagerIgnore,
  type,
  required,
  onValueChange,
  className,
  ...rest
}: InputContentProps) {
  const resolvedSize = resolveInputSize(inputSize, size);
  const invalid = resolveVariant(variantProp, normalizedError) === "error" ? true : undefined;
  return (
    <InputIconGroup startIcon={startIcon} endIcon={endIcon} wrapperClassName={wrapperClassName} resolvedSize={resolvedSize}>
      <InputControl
        ref={controlRef}
        type={type}
        required={required}
        onValueChange={onValueChange}
        invalid={invalid}
        resolvedSize={resolvedSize}
        paddedStart={Boolean(startIcon)}
        paddedEnd={Boolean(endIcon)}
        passwordManagerIgnore={passwordManagerIgnore}
        className={className}
        rest={rest}
      />
    </InputIconGroup>
  );
}

const Input = forwardRef<HTMLInputElement, InputProps>(({label, labelTooltip, description, error, ...props}, ref) => {
  const normalizedError = normalizeFieldError(error);
  warnInputProps({label, ariaLabel: props["aria-label"], ariaLabelledBy: props["aria-labelledby"], variant: props.variant});
  return (
    <InputField
      label={label}
      required={props.required}
      labelTooltip={labelTooltip}
      error={normalizedError}
      description={description}
      disabled={props.disabled}
    >
      <InputContent controlRef={ref} normalizedError={normalizedError} {...props} />
    </InputField>
  );
});
Input.displayName = "Input";

export {Input, inputVariants};
